import { SIGNUP, SIGNIN, SIGNUP_FAIL } from "../actions/authActions";

export default function authReducer(state = {}, action) {
    switch (action.type) {
        case SIGNUP:
            return { ...state, user: action.payload, error: null };
        case SIGNUP_FAIL:
            return { ...state, user: null, error: action.payload };
        case SIGNIN:
            return { ...state, signIn: action.payload };
        default:
            return state;
    }
}
