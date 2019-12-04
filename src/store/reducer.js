import { combineReducers } from 'redux';
import { reducer as adminReducer } from '../components/Admins/store';

const reducer = combineReducers({
    admin: adminReducer,

});

export default reducer;