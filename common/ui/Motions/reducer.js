import handleActions from 'redux-actions/lib/handleActions';
import {
  FETCH_EVENTS
} from './action.js';

export default handleActions({
  [`${FETCH_EVENTS}_读取`](state) {
    return {...state, loading: true};
  },

  [`${FETCH_EVENTS}_成功`](state, action) {
    return {...state, loading: false, events: action.payload};
  },

  [`${FETCH_EVENTS}_失败`](state, {error}) {
    return {...state, loading: false, error};
  },
}, {loading: false, events: {}});
