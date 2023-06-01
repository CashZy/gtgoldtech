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
      v-model="formData.code"
      :error="code.$error"
      type="text"
      placeholder="Graphic Verification Code"
    >
      <template #left-icon>
        <van-image :src="shield_icon" class="-mb-2.5" width="40px" />
      </template>
      <template #button>
        <van-loading v-if="validCodeLoading" />
        <div @click="refresh" v-else v-html="codeImage" width="90px" />
      </template>
    </van-field>

    <div class="px-5 my-3">
      <van-button
        @click="handleSubmit"
        :pending="loading"
        class="!bg-secondary !border-secondary !text-white !text-lg !font-medium !w-full"
      >
        Sign In
      </van-button>
    </div>

    <div
      class="flex items-center justify-around text-xs text-[#666] mt-5 mb-3 px-5"
    >
      <NuxtLink to="/forget"> Forgot Password ? </NuxtLink>
      <NuxtLink to="/register"> Register Now </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import phone_icon from "~/assets/images/auth/phone-icon.png";
import lock_icon from "~/assets/images/auth/lock-icon.png";
import shield_icon from "~/assets/images/auth/shield-icon.png";
import useLogin from "~/composables/auth/useLogin";
import useValidcode from "~/composables/auth/useValidcode";

const {
  loading: validCodeLoading,
  sessionId,
  refresh,
  codeImage,
} = useValidcode();

import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Axios from "~/utils/axios";

const formData = reactive({
  phone: "",
  password: "",
  code: "",
});

const rules = {
  phone: { required },
  code: { required },
  password: { required },
};

const v = useVuelidate(rules, formData);
const { phone, password, code } = v.value;

const { loading, login } = useLogin();

definePageMeta({
  layout: "auth",
  middleware: "loggedout",
});

const handleSubmit = async () => {
  v.value.$validate();
  if (!v.value.$error) {
    await login({
      phone: "91" + formData.phone,
      password: formData.password,
      sessionId: sessionId.value,
      code: formData.code,
    });
    try {
      const dataa = await Axios({
        url: `/api/getdailyearning/`,
        method: "GET",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(">>>>>>>>", dataa.data);
    } catch (error) {
      console.error("Error during request:", error);
    }
  } else {
    showToast("please fill form");
  }
};
</script>

<style>
.auth-form .van-cell {
  @apply !pb-0;
}
</style>
