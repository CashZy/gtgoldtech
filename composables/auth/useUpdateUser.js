import Axios from "~/utils/axios";
import useAuth from "./useAuth";

const useUpdateUser = () => {
  const router = useRouter();
  const loading = ref(false);
  const error = ref(null);
  const { getUser } = useAuth();
  const updateUser = async (body) => {
    try {
      loading.value = true;
      error.value = null;
      const res = await Axios({
        url: "/api/auth/user",
        data: body,
        method: "PUT",
        headers: {
          "Content-Type": "multipart/formdata",
        },
      });
      loading.value = false;
      error.value = null;
      showSuccessToast("user updated successfully");
      router.push("/setting");
      getUser();
    } catch (e) {
      const data = e?.response?.data;
      loading.value = false;
      error.value = data?.message || e.message;
      showFailToast(data?.message || e.message);
    }
  };

  return { loading, error, updateUser };
};

export default useUpdateUser;
