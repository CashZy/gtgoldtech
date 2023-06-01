<template>
  <div class="h-full flex flex-col">
    <PageHeader title="Coupons Details" back-route="/admin/coupons" />
    <div class="grow overflow-y-auto p-5">
      <van-cell-group inset title="Code">
        <van-field
          :error="code.$error"
          v-model="data.code"
          placeholder="Code"
        />
      </van-cell-group>
      <van-cell-group inset title="Discount">
        <van-field
          :error="discount.$error"
          v-model="data.discount"
          placeholder="Discount"
        />
      </van-cell-group>

      <div class="my-5">
        <van-button
          :loading="loading"
          @click="submit"
          class="!bg-secondary !text-white !w-full !border-secondary !font-semibold"
        >
          Submit
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import PageHeader from "~/components/pages/PageHeader.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Axios from "~/utils/axios";
let data = reactive({
  code: "",
  discount: 0,
  validUntil: new Date(),
  id: "",
});

const route = useRoute();
const image = ref("");

const rules = {
  code: { required },
  discount: { required },
  validUntil: { required },
};

const v = useVuelidate(rules, data);
const { code, discount, validUntil } = v.value;

const loading = ref(false);
const router = useRouter();

const submit = async () => {
  v.value.$validate();
  if (!v.value.$error) {
    const formData = new FormData();
    for (var d in data) {
      formData.append(d, data[d]);
    }
    try {
      loading.value = true;
      await Axios({
        url: `/api/coupon/${data.id}`,
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/formdata",
        },
      });
      loading.value = false;
      showSuccessToast("Coupon Created");
      router.push("/admin/coupons");
    } catch (e) {
      loading.value = false;
      showFailToast(e.response?.data?.message || e.message || e);
    }
  } else {
    showToast("please fill required fields");
  }
};
</script>
