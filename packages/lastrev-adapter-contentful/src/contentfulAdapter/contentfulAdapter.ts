import { map, isArray, mapValues, get, isObject, compact, includes } from 'lodash';
import { Entry, Asset } from 'contentful';
import parseLink from '../linkParser';
import parseAsset from '../assetParser';
import parseEntry from '../entryParser';
import { isEntry, isAsset, isLink, isBadContentfulObject } from '../helpers';
import { AdapterConfig, Transform, LinkFields, ParsedEntry } from '../types';

const Adapter = ({
  urlMap = {},
  linkContentType = 'elementLink',
  sameWindowActionText = 'Open in the same window',
  newWindowActionText = 'Open in a new window',
  modalActionText = 'Open in a modal',
  downloadActionText = 'Download',
  manualEntryTypeText = 'Manual text entry',
  contentRefTypeText = 'Content reference',
  assetRefTypeText = 'Asset reference',
  contentUrlLookup,
  skipContentTypes
}: AdapterConfig): Transform => (data) => {
  const parsedEntries: Record<string, ParsedEntry> = {};

  const traverse = (obj: unknown) => {
    if (isBadContentfulObject(obj)) {
      return null;
    }
    if (isArray(obj)) {
      return compact(map(obj, traverse)) as unknown[];
    }
    if (isLink(obj, linkContentType)) {
      return parseLink({
        sameWindowActionText,
        newWindowActionText,
        modalActionText,
        downloadActionText,
        manualEntryTypeText,
        contentRefTypeText,
        assetRefTypeText,
        fields: (obj as Entry<LinkFields>).fields,
        id: get(obj, 'sys.id') as string,
        contentTypeId: linkContentType,
        urlMap,
        parsedEntries,
        contentUrlLookup
      });
    }
    if (isEntry(obj)) {
      if (includes(skipContentTypes, get(obj, 'sys.contentType.sys.id'))) {
        // stop traversing, return item as is:
        return obj;
      }
      const parsed = parseEntry(obj as Entry<Record<string, unknown>>, urlMap, contentUrlLookup);
      parsedEntries[parsed._id] = parsed;
      const parsedFields: Record<string, unknown> = mapValues((obj as Entry<Record<string, unknown>>).fields, traverse);
      return {
        ...parsed,
        ...parsedFields
      };
    }
    if (isAsset(obj)) {
      return parseAsset(obj as Asset);
    }
    if (isObject(obj)) {
      return mapValues(obj, traverse);
    }
    // most likely a simple value field
    return obj;
  };

  return traverse(data) as Record<string, unknown>;
};

export default Adapter;
