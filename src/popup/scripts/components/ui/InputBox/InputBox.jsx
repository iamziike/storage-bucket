import classes from './InputBox.module.css';
import { NUMBER_BOX, TEXT_BOX } from '../../../helpers/constants';
import {
  ConstantTypeOf,
  NumberType,
  OneTypeOf,
  StringType,
  VoidFunctionType,
} from '../../../helpers/types';

const InputBox = ({
  type = TEXT_BOX,
  className = '',
  onChange,
  placeholder = 'Input your Value',
  value,
}) => {
  const isNumber = type === NUMBER_BOX;

  const inputChangeHandler = ({ target }) => onChange(target.value);

  return (
    <div className={`${className} ${classes.inputbox}`}>
      <input
        onChange={inputChangeHandler}
        type={isNumber ? 'number' : 'text'}
        placeholder={placeholder}
        value={value || ''}
      />
    </div>
  );
};

InputBox.propTypes = {
  type: ConstantTypeOf([NUMBER_BOX, TEXT_BOX]),
  className: StringType,
  onChange: VoidFunctionType,
  placeholder: StringType,
  value: OneTypeOf([StringType, NumberType]),
};
export default InputBox;
