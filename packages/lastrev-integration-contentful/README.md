# LastRev Contentful Integration

This module provides a set of useful funtions for querying data from Contentful, and adapting that data to LastRev structured websites.

## Environment variables

This module expects the following environment variables:

- `CONTENTFUL_SPACE_ID` = The spaceId from contentful
- `CONTENTFUL_ENV` - Contentful environment
- `CONTENTFUL_ACCESSTOKEN` - Contentful API access token
- `CONTENTFUL_HOST` - Contentful Host
- `CONTENTFUL_SETTINGS_ID` - The ID of the `settingsGlobal` content item to use

## usage

The module can be used one of two ways. First you can call the methods directly, which will give you the raw Contentful data:

```javascript
import { getPageBySlug } from '@last-rev/integration-contentful';

getPageBySlug(id, contentType).then((raw) => {
  console.log(raw);
  /*
  {
    sys: {
      id: '1234',
      contentType: {
        sys: {
          id: 'moduleCardGeneral'
        }
      }
    },
    fields: {
      title: 'My Title',
      image: ...
    }
  }
  */
});
```

The other way to use it is to initialise the default export with a configuration for the `@last-rev/adapter/contentful` [adapter](https://github.com/last-rev-llc/lastrev-adapter-contentful). The resulting functions will then be adapted to the shape expected by LastRev components:

```javascript
import Contentful from '@last-rev/integration-contentful';

const urlMap = {
  pageGeneral: {
    url: '/[key]',
    key: 'slug'
  },
  pageBlog: {
    url: '/[key]',
    key: 'blogId'
  }
};

const linkContentType = 'ctaLink';

const { getPageBySlug } = Contentful({ urlMap, linkContentType });

getPageBySlug(id, contentType).then((clean) => {
  console.log(clean);
  /*
  {
    id: '1234',
    contentTypeId: 'moduleCardGeneral',
    title: 'My Title',
    image: ...
  }
  */
});
```

## Documentation

Official documentation can be found [here](https://last-rev-llc.github.io/lastrev-integration-contentful/index.html).
