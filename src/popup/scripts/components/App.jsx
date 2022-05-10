import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import '../../styles/popup.css';
import Home from './pages/Home/Home';
import Creator from './pages/Creator/Creator';
import BookmarksListing from './pages/BookmarksListing/BookmarksListing';
import { HOME_PATH, CREATOR_PATH, BOOKMARK_PATH } from '../helpers/constants';
import StoreProvider from '../store/StoreProvider';
import LocalStorage from './utils/LocalStorage/LocalStorage';

const App = () => {
  return (
    <StoreProvider>
      <LocalStorage />
      <Router>
        <Routes>
          <Route path={HOME_PATH} element={<Home />} />
          <Route path={CREATOR_PATH} element={<Creator />} />
          <Route path={BOOKMARK_PATH} element={<BookmarksListing />} />
        </Routes>
      </Router>
    </StoreProvider>
  );
};

export default App;
