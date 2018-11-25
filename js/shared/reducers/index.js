import { combineReducers } from 'redux';

// Reducers
import rate from './rate';
import summary from './summary';
import wallet from './wallet';

const appReducer = combineReducers({
	rate,
	summary,
	wallet,
});

export default appReducer;
