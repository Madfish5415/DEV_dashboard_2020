import { UserActions } from "./actions";
import { UserInitialState, UserState } from "./states";
import { USER_SIGN_IN, USER_SIGN_OUT, USER_SIGN_UP } from "./types";

const initialState = new UserInitialState();

export function userReducer(
    state: UserState = initialState,
    action: UserActions
): UserState {
    switch (action.type) {
        case USER_SIGN_IN:
            return {};
        case USER_SIGN_OUT:
            return {};
        case USER_SIGN_UP:
            return {};
        default:
            return state;
    }
}
