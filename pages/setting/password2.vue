<template>
  <div>
    <PageHeader title="Retrieve Password" back-route="/setting" />

    <div class="px-4 py-2 space-y-5">
      <div class="bg-white rounded-lg py-2 text-sm">
        <van-cell-group inset>
          <van-field
            v-model="formData.phone"
            label="Phone"
            :error="phone.$error"
            type="text"
            readonly
            label-class="!text-right"
          />
          <van-field
            v-model="formData.sms"
            type="text"
            label="SMS"
            :error="sms.$error"
            label-class="!text-right"
            placeholder="Send Verification Code"
          >
            <template #button>
              <van-button
                :loading="otpLoading"
                @click="handleOptp"
                class="!bg-secondary !text-white !border-secondary !text-[10px] !h-5"
                >{{
                  counter > 0 ? counter + "s" : count == 0 ? "Send" : "Resend"
                }}</van-button
              >
            </template>
          </van-field>
          <van-field
            v-model="formData.password"
            type="password"
            :error="password.$error"
            label="Password"
            placeholder="Enter New Password"
            label-class="!text-right"
          />

          <van-field
            v-model="formData.confirmPassword"
            type="password"
            :error="confirmPassword.$error"
            label="Confirm"
            label-class="!text-right"
            placeholder="Confirm Password"
          />
        </van-cell-group>
      </div>

      <van-button
        @click="handleSubmit"
        :loading="loading"
        class="!w-full !text-white !text-lg !font-medium !rounded-lg !bg-secondary !border-secondary"
      >
        Submit
      </van-button>

      <p class="text-center text-sm text-[#e10202]">
        The initial payment password is the same as the login password
      </p>
    </div>
  </div>
</template>

<script setup>
import PageHeader from "~/components/pages/PageHeader.vue";
import useAuth from "~/composables/auth/useAuth";
import useUpdatePassword from "~/composables/auth/useUpdatePassword";
import useOtp from "~/composables/auth/useOtp";
import { useVuelidate } from "@vuelidate/core";
import { required, sameAs } from "@vuelidate/validators";
const { user } = useAuth();

const formData = reactive({
  phone: user?.value?.phone,
  sms: "",
  password: "",
  confirmPassword: "",
});

watch(user, (value) => {
  if (value?.phone) {
    formData.phone = value?.phone;
  }
});

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

const { loading, updatePassword } = useUpdatePassword();

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
    await updatePassword({
      phone: formData.phone,
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
</script>
