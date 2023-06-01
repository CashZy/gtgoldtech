<template>
  <div class="bg-white rounded-lg py-3 auth-form">
    <form>
      <van-field
        v-model="formData.phone"
        :error="phone?.$error"
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
        :error="sms?.$error"
        type="text"
        placeholder="Send SMS"
      >
        <template #left-icon>
          <van-image :src="shield_icon" class="-mb-2.5" width="40px" />
        </template>

        <template #button>
          <van-button
            :loading="optLoading"
            @click="handleOptp"
            class="!bg-primary !text-white !border-primary !h-8"
          >
            {{ counter > 0 ? counter + "s" : count == 0 ? "Send" : "Resend" }}
          </van-button>
        </template>
      </van-field>

      <van-field
        v-model="formData.password"
        :error="password?.$error"
        type="password"
        placeholder="Please Type Your Password"
      >
        <template #left-icon>
          <van-image :src="lock_icon" class="-mb-2.5" width="40px" />
        </template>
      </van-field>

      <van-field
        v-model="formData.invitation"
        :error="invitation?.$error"
        type="text"
        placeholder="Please enter the invitation code"
      >
        <template #left-icon>
          <van-image :src="invitation_icon" class="-mb-2.5" width="40px" />
        </template>
      </van-field>

      <div class="px-5 my-3">
        <van-button
          @click="submit"
          type="submit"
          :loading="loading"
          class="!bg-secondary !border-secondary !text-white !text-lg !font-medium !w-full"
        >
          Sign Up
        </van-button>
      </div>

      <div
        class="flex items-center justify-center text-xs text-[#666] mt-5 mb-3 px-5"
      >
        <NuxtLink to="/login"> Have an account ? Return to sign in </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import phone_icon from "~/assets/images/auth/phone-icon.png";
import lock_icon from "~/assets/images/auth/lock-icon.png";
import shield_icon from "~/assets/images/auth/shield-icon.png";
import invitation_icon from "~/assets/images/auth/invitation-icon.png";
import useRegister from "~/composables/auth/useRegister";
import useOtp from "~/composables/auth/useOtp";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const formData = reactive({
  phone: "",
  sms: "",
  password: "",
  invitation: "",
  balance: 0.00
});

const rules = {
  phone: { required },
  sms: { required },
  password: { required },
  invitation: { required },
};

const v = useVuelidate(rules, formData);
const { phone, password, sms, invitation } = v.value;

definePageMeta({
  layout: "auth",
  middleware: "loggedout",
});

const { loading, register } = useRegister();
const {
  loading: optLoading,
  sendOtp,
  count,
  counter,
  sessionId,
  stopCounter,
} = useOtp();

const submit = async () => {
  v.value.$validate();
  if (!v.value.$error) {
    stopCounter();
    await register({
      phone: "91" + formData.phone,
      password: formData.password,
      otp: formData.sms,
      sessionId: sessionId.value,
      invitation: formData.invitation,
      balance: 0.00
    });
  } else {
    showToast("please fill form");
  }
};

const handleOptp = () => {
  phone?.$touch();

  if (formData.phone) {
    if (counter.value == 0) {
      sendOtp({ phone: "91" + formData.phone });
    }
  } else {
    showToast("missing mobile number");
  }
};
</script>

<style>
.auth-form .van-cell {
  @apply !pb-0;
}
</style>
