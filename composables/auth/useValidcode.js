import Axios from "~/utils/axios";

const useValidCode = () => {
  const codeImage = ref(null);
  const error = ref(null);
  const loading = ref(false);
  const sessionId = ref(null);
  const getCodeImage = async () => {
    try {
      error.value = null;
      sessionId.value = null;
      loading.value = true;
      codeImage.value = null;
      const res = await Axios.get("/api/auth/validcode");
      const { code, sessionId: session } = res.data;
      codeImage.value = code;
      sessionId.value = session;
      loading.value = false;
    } catch (e) {
      error.value = e?.message || e;
      loading.value = false;
    }
  };

  onMounted(() => {
    getCodeImage();
  });

  return { codeImage, error, refresh: getCodeImage, loading, sessionId };
};

export default useValidCode;
