import Axios from "~/utils/axios";
const user = ref(null);
const token = ref(null);
const useAuth = () => {
  const loading = ref(true);
  const error = ref(false);

  const setToken = (t) => {
    token.value = t;
  };

  const setUser = (u) => {
    
    user.value = u;
    // console.log("1222222:" , u)
   
  };

  const getUser = async () => {
    const tokenCookie = useCookie("token");
    token.value = tokenCookie.value;
    try {
      if (token.value) {
        Axios.defaults.headers.common.Authorization = token.value;
        error.value = false;
        const res = await Axios.post("/api/auth/user", {
          body: { token: token.value },
        });
        user.value = res.data.user;
        loading.value = false;
      }

      loading.value = false;
    } catch (e) {
      error.value = e.response?.data?.message || e.message;
      loading.value = false;
      token.value = null;
      tokenCookie.value = null;
      user.value = null;
    }
  };

  return { loading, error, user, token, setToken, setUser, getUser };
};

export default useAuth;
