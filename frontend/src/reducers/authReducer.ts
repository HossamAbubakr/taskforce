import { UserName } from "@utils/types";

export interface AuthState {
  user: UserName | null;
  isAuthed: boolean;
}

export type AuthAction =
  | { type: "SIGN_IN"; payload: UserName }
  | { type: "SIGN_OUT" }
  | { type: "SIGN_UP"; payload: UserName };

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "SIGN_IN":
    case "SIGN_UP":
      return {
        ...state,
        user: action.payload,
        isAuthed: true,
      };
    case "SIGN_OUT":
      return {
        ...state,
        user: null,
        isAuthed: false,
      };
    default:
      return state;
  }
};
