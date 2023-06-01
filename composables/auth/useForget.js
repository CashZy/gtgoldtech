import Axios from "~/utils/axios";

const useReset = () => {
  const router = useRouter();
  const loading = ref(false);
  const error = ref(null);
  const reset = async (body) => {
    try {
      loading.value = true;
      error.value = null;
      const res = await Axios.post("/api/auth/reset", {
        body,
      });
      loading.value = false;
      error.value = null;
      showSuccessToast("password reset successfull");
      router.push("/login");
    } catch (e) {
      const data = e?.response?.data;
      loading.value = false;
      error.value = data?.message || e.message;
      showFailToast(data?.message || e.message);
    }
  };

  return { loading, error, reset };
};

export default useReset;
