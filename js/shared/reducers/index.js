import { combineReducers } from 'redux';

// Reducers
import rate from './rate';
import wallet from './wallet';

const appReducer = combineReducers({
	rate,
	wallet,
});

export default appReducer;
