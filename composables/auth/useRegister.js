import Axios from "~/utils/axios";

const useRegister = () => {
  const router = useRouter();
  const loading = ref(false);
  const error = ref(null);
  const register = async (body) => {
    try {
      loading.value = true;
      error.value = null;
      const res = await Axios.post("/api/auth/register", {
        body,
      });
      loading.value = false;
      error.value = null;
      showSuccessToast("Registered Successfully");
      router.push("/login");
    } catch (e) {
      const data = e?.response?.data;
      loading.value = false;
      error.value = data?.message || e.message;
      showFailToast(data?.message || e.message);
    }
  };

  return { loading, error, register };
};

export default useRegister;
