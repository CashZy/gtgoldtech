<template>
  <div class="bg-white rounded-lg py-3 auth-form">
    <van-field
      v-model="formData.phone"
      :error="phone.$error"
      type="number"
      placeholder="Please Type Phone Number"
    >
      <template #left-icon>
        <div class="flex items-start">
          <van-image :src="phone_icon" width="40px" />
          <p class="mx-2">+ 91</p>
          <div class="w-[2px] mt-1 h-4 bg-light mr-2"></div>
        </div>
      </template>
    </van-field>

    <van-field
      v-model="formData.sms"
      :error="sms.$error"
      type="text"
      placeholder="Send SMS"
    >
      <template #left-icon>
        <van-image :src="shield_icon" class="-mb-2.5" width="40px" />
      </template>

      <template #button>
        <van-button
          :loading="otpLoading"
          @click="handleOptp"
          class="!bg-primary !text-white !border-primary !h-8"
          >{{
            counter > 0 ? counter + "s" : count == 0 ? "Send" : "Resend"
          }}</van-button
        >
      </template>
    </van-field>

    <van-field
      v-model="formData.password"
      :error="password.$error"
      type="password"
      placeholder="Please Type Your Password"
    >
      <template #left-icon>
        <van-image :src="lock_icon" class="-mb-2.5" width="40px" />
      </template>
    </van-field>

    <van-field
      v-model="formData.confirmPassword"
      :error="confirmPassword.$error"
      type="password"
      placeholder="Please Confirm Password"
    >
      <template #left-icon>
        <van-image :src="lock_icon" class="-mb-2.5" width="40px" />
      </template>
    </van-field>

    <div class="px-5 my-3">
      <van-button
        @click="handleSubmit"
        :loading="loading"
        class="!bg-secondary !border-secondary !text-white !text-lg !font-medium !w-full"
      >
        Retrieve Password
      </van-button>
    </div>

    <div
      class="flex items-center justify-center text-xs text-[#666] mt-5 mb-3 px-5"
    >
      <NuxtLink to="/login"> Return to sign in </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import phone_icon from "~/assets/images/auth/phone-icon.png";
import lock_icon from "~/assets/images/auth/lock-icon.png";
import shield_icon from "~/assets/images/auth/shield-icon.png";
import useReset from "~/composables/auth/useForget";
import useOtp from "~/composables/auth/useOtp";
import { useVuelidate } from "@vuelidate/core";
import { required, sameAs } from "@vuelidate/validators";

const formData = reactive({
  phone: "",
  sms: "",
  password: "",
  confirmPassword: "",
});

const p = ref("");

const rules = computed(() => {
  return {
    phone: { required },
    sms: { required },
    password: { required },
    confirmPassword: { required, sameAs: sameAs(formData.password) },
  };
});

const v = useVuelidate(rules, formData);
const { phone, password, sms, confirmPassword } = v.value;

const { loading, reset } = useReset();
const {
  loading: otpLoading,
  sendOtp,
  count,
  counter,
  sessionId,
  stopCounter,
} = useOtp();

const handleSubmit = async () => {
  v.value.$validate();
  if (!v.value.$error) {
    stopCounter();
    await reset({
      phone: "+91" + formData.phone,
      password: formData.password,
      otp: formData.sms,
      sessionId: sessionId.value,
    });
  } else {
    showToast("please fill form");
  }
};

const handleOptp = () => {
  phone?.$touch();

  if (formData.phone) {
    if (counter.value == 0) {
      sendOtp({ phone: formData.phone });
    }
  } else {
    showToast("missing mobile number");
  }
};
definePageMeta({
  layout: "auth",
  middleware: "loggedout",
});
</script>

<style>
.auth-form .van-cell {
  @apply !pb-0;
}
</style>
