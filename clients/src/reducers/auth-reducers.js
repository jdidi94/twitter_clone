import {
//   SET_CURRENT_USER,
//   FOLLOW,
//   UNFOLLOW,
  REGISTER,
  LOGIN,
} from "../constants";
const initialState = {
  isAuthenticated: false,
  user:"",
};
export default function  (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
      case REGISTER:
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
        };



    // case FOLLOW:
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       following: [...state.user.following, action.payload],
    //     },
    //   };
    // case UNFOLLOW:
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       following: state.user.following.filter(
    //         (item) => item !== action.payload
    //       ),
        // },
    //   };
    default:
      return state;
  }
}
