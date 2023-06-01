import Axios from "~/utils/axios";

const useOpt = () => {
  const loading = ref(false);
  const error = ref(null);
  const optp = ref(null);
  const sessionId = ref(null);
  const send = ref(false);
  const count = ref(0);
  const counter = ref(0);
  const interval = ref(null);

  watch(counter, (value) => {
    if (value == 0 && interval.value) {
      clearInterval(interval.value);
    }
  });

  const sendOtp = async (body) => {
    try {
      count.value = count.value + 1;
      send.value = false;
      loading.value = true;
      error.value = null;
      optp.value = false;
      sessionId.value = null;
      const res = await Axios.post("/api/auth/sendOtp", {
        body,
      });

      const data = res.data;
      loading.value = false;
      optp.value = data.optp;
      send.value = true;
      sessionId.value = data.sessionId;
      showSuccessToast("code sent successfully");
      counter.value = 60;
      interval.value = setInterval(() => {
        counter.value = counter.value - 1;
      }, 1000);
    } catch (e) {
      loading.value = false;
      error.value = e.message || e;
      send.value = false;
      showFailToast("send code failed");
    }
  };

  const stopCounter = () => {
    counter.value = 0;
    if (interval.value) {
      clearInterval(interval.value);
    }
  };

  return {
    loading,
    error,
    optp,
    sessionId,
    sendOtp,
    send,
    count,
    counter,
    stopCounter,
  };
};

export default useOpt;
