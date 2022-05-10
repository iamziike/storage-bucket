import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';

import './RangeCalender.css';
import {
  ArrayOf,
  descendantOf,
  VoidFunctionType,
} from '../../../helpers/types';

const RangeCalender = ({
  onChange = () => {},
  onCalendarClose = () => {},
  value = [new Date(), new Date()],
}) => {
  return (
    <DateTimeRangePicker
      defaultActiveStartDate={new Date()}
      onChange={onChange}
      value={value}
      onCalendarClose={onCalendarClose}
    />
  );
};

export default RangeCalender;

RangeCalender.propTypes = {
  onChange: VoidFunctionType,
  onCalendarClose: VoidFunctionType,
  value: ArrayOf(descendantOf(Date)),
};
