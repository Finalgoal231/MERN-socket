import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../validation/is-empty";
const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function authReducer(state = initialState, action) {
  // eslint-disable-next-line
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
}
