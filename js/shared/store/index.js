import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from 'app/reducers';

const middleware = process.env.NODE_ENV === 'production' ? [thunk] : [thunk, createLogger()];

export default createStore(
	reducers,
	applyMiddleware(...middleware),
);
