import Axios from "~/utils/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const loading = ref(false);
  const error = ref(null);
  const { setUser, setToken } = useAuth();
  const token = useCookie("token");
  const tokenExpiration = useCookie("tokenExpiration");

  const logout = async (beforeClose = null) => {
    try {
      loading.value = true;
      error.value = null;
      await Axios.post("/api/auth/logout", {
        body: { token: token.value },
      });

      loading.value = false;
      setUser(null);
      setToken(null);
      token.value = null;
      tokenExpiration.value = null;
      showSuccessToast("logout successful");

      if (beforeClose) {
        beforeClose();
      }
    } catch (e) {
      loading.value = false;
      error.value = e.message || e;
      setUser(null);
      setToken(null);
      token.value = null;
      tokenExpiration.value = null;
      if (beforeClose) {
        beforeClose();
      }
    }
  };

  const checkTokenExpiration = () => {
    const currentTimestamp = new Date().getTime();
    const expirationTimestamp = Number(tokenExpiration.value);

    if (expirationTimestamp && currentTimestamp >= expirationTimestamp) {
      // Token has expired, perform logout
      logout();
    }
  };

  // Check token expiration on app initialization or user interaction
  checkTokenExpiration();

  return { loading, error, logout };
};

export default useLogout;
