import classes from './MultipleButtons.module.css';
import {
  ArrayOf,
  BooleanType,
  exactType,
  StringType,
  VoidFunctionType,
} from '../../../helpers/types';
import Button from '../Button/Button';

const MultipleButtons = ({
  className = '',
  itemsData = [],
  areItemsInteractable = true, //applies to the entire MultipleButtons
  onChange = () => {},
}) => {
  return (
    <ul className={`${className} ${classes.buttons} no-visible-scrollbar`}>
      {itemsData.map((item) => (
        <Button
          className={classes.button}
          key={item.value}
          isClickable={
            areItemsInteractable ? item.isClickable : areItemsInteractable
          }
          value={item.value}
          isSelected={item.isSelected}
          onChange={() => onChange(item)}
        >
          {item.title || item.value}
        </Button>
      ))}
    </ul>
  );
};

MultipleButtons.propTypes = {
  className: StringType,
  itemsData: ArrayOf(
    exactType({
      value: StringType,
      title: StringType,
      isClickable: BooleanType,
      isSelected: BooleanType,
    })
  ),
  areItemsInteractable: BooleanType,
  onChange: VoidFunctionType,
};

export default MultipleButtons;
