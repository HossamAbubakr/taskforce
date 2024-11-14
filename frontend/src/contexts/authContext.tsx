import { createContext, ReactNode, useReducer } from "react";
import { signIn as signInAPI, signUp as signUpAPI } from "@services/authApi";
import { AuthContextType } from "@customTypes/contextTypes";
import { AuthUser, NewUser } from "@customTypes/apiTypes";
import { authReducer, AuthState } from "@reducers/authReducer";
import { handleAuthError } from "@utils/errorHandler";
import toast from "react-hot-toast";

const initialAuthState: AuthState = {
  user: null,
  isAuthed: true,
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const signIn = async (email: string, password: string) => {
    const credentials: AuthUser = { email, password };
    try {
      const user = await signInAPI(credentials);
      dispatch({ type: "SIGN_IN", payload: user });
      toast.success("Successfully signed in!");
      return {
        status: "success",
      };
    } catch (err) {
      const authError = handleAuthError(err);
      if (authError.type === "auth") {
        signOut();
      }
      toast.error(authError.message);
    }
  };

  const signUp = async (newUser: NewUser) => {
    try {
      const user = await signUpAPI(newUser);
      dispatch({ type: "SIGN_UP", payload: user });
      toast.success("Successfully signed up!");
      return {
        status: "success",
      };
    } catch (err) {
      const authError = handleAuthError(err);
      toast.error(authError.message);
    }
  };

  const signOut = () => {
    dispatch({ type: "SIGN_OUT" });
    toast("You have been logged out.", { icon: "👋" });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthed: state.isAuthed,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
