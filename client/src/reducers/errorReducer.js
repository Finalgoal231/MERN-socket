import { GET_ERRORS } from "../actions/types";
const initialState = {};

export default function errorReducer(state = initialState, action) {
  // eslint-disable-next-line
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
