import classes from './Button.module.css';
import {
  BooleanType,
  ConstantTypeOf,
  ElementType,
  NumberType,
  OneTypeOf,
  PrimitiveType,
  StringType,
  VoidFunctionType,
} from '../../../helpers/types';

const Button = ({
  children = '',
  type = 'button',
  className = '',
  isSelected = false,
  isClickable = true,
  value = '',
  onChange = () => {},
}) => {
  const btnClassNames = `${className} ${
    isClickable ? '' : classes['btn--unclickable']
  } ${isSelected ? classes['btn--selected'] : ''}`;

  const buttonChangeHandler = () => onChange(value);

  return (
    <button
      type={type}
      unselectable={`${isClickable}`}
      className={`${btnClassNames.trim()} ${classes.btn}`}
      onClick={buttonChangeHandler}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: OneTypeOf([StringType, ElementType, NumberType]).isRequired,
  type: ConstantTypeOf(['button', 'submit']),
  className: StringType,
  value: PrimitiveType,
  isSelected: BooleanType,
  isClickable: BooleanType,
  onChange: VoidFunctionType,
};

export default Button;
