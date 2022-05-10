import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './Home.module.css';
import Button from '../../ui/Button/Button';
import SettingsImage from '../../../../../assets/images/settings_FILL1_wght300_GRAD200_opsz24.svg';
import AddImage from '../../../../../assets/images/add_circle_FILL1_wght300_GRAD200_opsz24.svg';
import Logo from '../../../../../assets/images/logo.svg';
import WhyImage from '../../../../../assets/images/why.svg';
import BucketImage from '../../../../../assets/images/icon.svg';
import {
  BOOKMARK_PATH,
  CREATOR_PATH,
  SETTINGS_PATH,
} from '../../../helpers/constants';

const Home = () => {
  const bookmarkList = useSelector((state) => state);

  return (
    <>
      <header>
        <section className={classes.header__top}>
          <Button className={`${classes.header__msg} ${classes.header__btn}`}>
            Storage Bucket by Ikezi
          </Button>
          <nav className={classes.nav}>
            <Link
              to={SETTINGS_PATH}
              className={classes['header__btn--settings']}
            >
              <Button className={classes.header__btn}>
                <img src={SettingsImage} alt='settings' />
              </Button>
            </Link>
            <Link to={CREATOR_PATH}>
              <Button
                className={`${classes.header__btn} ${classes['header__btn--creator']}`}
              >
                <img src={AddImage} alt='add item' />
              </Button>
            </Link>
          </nav>
        </section>
        <section className={classes.header__bottom}>
          <div className={classes['logo-wrapper']}>
            <img src={Logo} alt='logo' />
          </div>
        </section>
      </header>
      <main className={classes.main}>
        <div>
          <Link to={BOOKMARK_PATH}>
            <Button className={classes.counter}>
              <>
                {Object.keys(bookmarkList).length}
                <span className={classes.bucket}>
                  <img src={BucketImage} alt='bucket' />
                </span>
              </>
            </Button>
          </Link>
          <span className={classes['counter-label']}>
            Bookmarks Registered 🔖
          </span>
        </div>
      </main>
      <footer className={`${classes.footer} flex-align-center`}>
        <p className={classes.why}>
          <img src={WhyImage} alt='why' />
        </p>
      </footer>
    </>
  );
};

export default Home;
