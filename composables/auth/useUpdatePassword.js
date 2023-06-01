import Axios from "~/utils/axios";

const useUpdatePassword = () => {
  const loading = ref(false);
  const error = ref(null);
  const updatePassword = async (body) => {
    try {
      const router = useRouter();
      loading.value = true;
      error.value = null;
      const res = await Axios.put("/api/auth/password", {
        body,
      });
      loading.value = false;
      error.value = null;
      showSuccessToast("Password Updated Successfully");
      router.push("/setting");
    } catch (e) {
      const data = e?.response?.data;
      loading.value = false;
      error.value = data?.message || e.message;
      showFailToast(data?.message || e.message);
    }
  };

  return { loading, error, updatePassword };
};

export default useUpdatePassword;
