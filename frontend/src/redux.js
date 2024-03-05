import createRootReducer from './stores/reducers/rootReducer';
import { createBrowserHistory } from 'history';
import { createStore } from 'redux';
import { persistStore } from 'redux-persist';


export const history = createBrowserHistory({ basename: process.env.REACT_APP_ROUTER_BASE_NAME });

const rootReducer = createRootReducer(history);
const reduxStore = createStore(rootReducer);
export const dispatch = reduxStore.dispatch;
export const persistor = persistStore(reduxStore);
export default reduxStore;