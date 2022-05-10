import classes from './PrimaryHeader.module.css';
import BackArrow from '../../ui/BackArrow/BackArrow';
import { HOME_PATH } from '../../../helpers/constants';
import { AnyElementOrComponentType, StringType } from '../../../helpers/types';

const PrimaryHeader = ({ className = '', children, title = '' }) => {
  return (
    <header className={`${className} ${classes.header}`}>
      <BackArrow to={HOME_PATH} />
      {title ? <h1>{title}</h1> : children}
    </header>
  );
};

PrimaryHeader.propTypes = {
  className: StringType,
  title: StringType,
  children: AnyElementOrComponentType,
};

export default PrimaryHeader;
