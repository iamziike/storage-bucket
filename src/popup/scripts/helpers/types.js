import PropTypes, { any } from 'prop-types';
import { DATE_CREATED, KEYWORDS, TITLE, URL_LOCALE } from './constants';

// inbuilt

// any type
export const AnyType = any;

// primitives
export const StringType = PropTypes.string;
export const NumberType = PropTypes.number;
export const BooleanType = PropTypes.bool;
export const PrimitiveType = PropTypes.oneOfType([
  StringType,
  NumberType,
  BooleanType,
]);

//
export const UnknownObjectType = PropTypes.object;

// functions
export const FunctionType = PropTypes.func;
export const VoidFunctionType = () => {};

// constantType
export const ConstantTypeOf = PropTypes.oneOf;

// multipleType
export const OneTypeOf = PropTypes.oneOfType;

// element
export const ElementType = PropTypes.element;

// component
export const ComponentType = PropTypes.elementType;

// element & component
export const AnyElementOrComponentType = OneTypeOf([
  ElementType,
  ComponentType,
]);

// arrays
export const ArrayOf = PropTypes.arrayOf;

// basic object
export const UnknownObject = PropTypes.object;

// others
export const descendantOf = PropTypes.instanceOf;
export const exactType = PropTypes.exact;

// custom
export const CustomObjectOfType = PropTypes.shape;

export const SortConstraintType = CustomObjectOfType({
  by: StringType,
  direction: StringType,
});

export const FilterConstraintType = CustomObjectOfType({
  selected: StringType,
  responses: CustomObjectOfType({
    [URL_LOCALE]: StringType,
    [TITLE]: StringType,
    [DATE_CREATED]: ArrayOf(descendantOf(Date)),
    [KEYWORDS]: ArrayOf(StringType),
  }),
});
