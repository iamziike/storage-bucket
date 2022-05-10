import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from './BackArrow.module.css';
import BackArrowImage from '../../../../../assets/images/arrow_back_FILL0_wght400_GRAD0_opsz24.svg';

const BackArrow = ({ to = '', clickHandler = () => {} }) => {
  if (to)
    return (
      <Link className={classes['back-arrow']} onClick={clickHandler} to={to}>
        <img src={BackArrowImage} alt='back arrow' />
      </Link>
    );

  return (
    <span className={classes['back-arrow']} onClick={clickHandler}>
      <img src={BackArrowImage} alt='back arrow' />
    </span>
  );
};

BackArrow.propTypes = {
  to: PropTypes.string,
  clickHandler: PropTypes.func,
};

export default BackArrow;
