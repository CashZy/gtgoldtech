import Axios from "~/utils/axios";
import useAuth from "./useAuth";

const useLogin = () => {
  const { setToken, setUser } = useAuth();
  const router = useRouter();
  const loading = ref(false);
  const error = ref(null);
  const login = async (body) => {
    console.log(body);
    try {
      loading.value = true;
      error.value = null;
      const res = await Axios.post("/api/auth/login", {
        body,
      });
      setToken(res.data.token);
      // console.log("usernew:" , res.data.user)
      setUser(res.data.user);
      const token = useCookie("token");
      token.value = res.data.token;
      Axios.defaults.headers.common.Authorization = res.data.token;
      loading.value = false;
      error.value = null;
      showSuccessToast("Login Successfull");
      router.push("/");
    } catch (e) {
      const data = e?.response?.data;
      loading.value = false;
      error.value = data?.message || e.message;
      showFailToast(data?.message || e.message);
    }
  };

  return { loading, error, login };
};

export default useLogin;
