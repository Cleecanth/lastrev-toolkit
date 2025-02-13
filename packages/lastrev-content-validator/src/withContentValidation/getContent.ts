export interface ContentValidationProps {
  _id: string;
}
export const getContent = (type: string) => {
  switch (type) {
    case 'string':
      return 'MISSING TEXT';
    case 'boolean':
      return 'MISSING TEXT';
    default:
      return 'MISSING VALUE';
  }
};
interface ParsedPropTypes {
  required: boolean;
  type: {
    name: string;
  };
}
export const fillRequiredProps = <P extends ContentValidationProps>({
  props,
  propTypes
}: {
  props: P;
  propTypes: ParsedPropTypes;
}) => {
  const newProps = { ...props };
  Object.keys(propTypes).forEach((key) => {
    if (!propTypes[key]) return;
    const {
      required,
      type: { name }
    } = propTypes[key];
    if (required) {
      newProps[key] = newProps[key] ?? getContent(name);
    }
  });
  return newProps;
};

export const checkPropTypes = <P extends ContentValidationProps>({
  props,
  propTypes
}: {
  props: P;
  propTypes: ParsedPropTypes;
}) => {
  let errors = {};
  Object.keys(propTypes).forEach((key) => {
    console.log('Check->', key, propTypes[key]);
    if (!propTypes[key]) return;
    const {
      required,
      type: { name, value }
    } = propTypes[key];
    if (required && props[key] == null) {
      console.log('Missing', key);
      errors[key] = `The prop ${key} is marked as required but its missing`;
    }
    if (name === 'shape') {
      errors = {
        ...errors,
        ...checkPropTypes({
          props: props[key],
          propTypes: value
        })
      };
    }
  });
  if (Object.keys(errors).length) return errors;
};
