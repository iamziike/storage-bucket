import { Provider } from 'react-redux';
import { ArrayOf, ElementType } from '../helpers/types';

import store from './store';

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

StoreProvider.propTypes = {
  children: ArrayOf(ElementType),
};

export default StoreProvider;
