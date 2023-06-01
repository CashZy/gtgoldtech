<template>
  <div>
    <PageHeader title="Bind Bank Account" />

    <div class="px-4 py-2 space-y-5">
      <div class="bg-white rounded-lg py-2 text-sm">
        <van-cell-group inset>
          <van-field
            v-model="data.name"
            :error="name.$error"
            label="Realname"
            type="text"
            label-class="!text-right"
          />
          <van-field
            type="text"
            label="Bank"
            label-class="!text-right"
            right-icon="arrow"
            readonly
            v-model="data.bank"
            :error="bank.$error"
            @click="() => (showPicker = true)"
          >
          </van-field>
          <van-field
            v-model="data.account"
            type="number"
            label="Account"
            :error="account.$error"
            label-class="!text-right"
          >
          </van-field>
          <van-field
            v-model="data.ifsc"
            :error="ifsc.$error"
            type="text"
            label="IFSC"
            label-class="!text-right"
          />
        </van-cell-group>
      </div>

      <van-button
        :loading="loading"
        @click="handleSubmit"
        class="!w-full !text-white !text-lg !font-medium !rounded-lg !bg-secondary !border-secondary"
      >
        Submit
      </van-button>
    </div>

    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker
        title="Bank"
        cancel-button-text="Cancel"
        confirm-button-text="Confirm"
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script setup>
import PageHeader from "~/components/pages/PageHeader.vue";
import Axios from "~/utils/axios";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const data = reactive({
  name: "",
  account: "",
  ifsc: "",
  bank: "",
});

const c = ref(null);

const rules = {
  name: { required },
  account: { required },
  ifsc: { required },
  bank: { required },
};

const v = useVuelidate(rules, data);
const { name, account, ifsc, bank } = v.value;

const showPicker = ref(false);
const columns = [
  { text: "HDFC Bank", value: "HDFC Bank" },
  { text: "Federal Bank", value: "Federal Bank" },
  { text: "Indian Bank", value: "Indian Bank" },
  { text: "DCB Bank", value: "DCB Bank" },
  { text: "Punjab Bank", value: "Punjab Bank" },
];
const onConfirm = ({ selectedOptions }) => {
  showPicker.value = false;
  data.bank = selectedOptions[0].text;
};

onMounted(() => {
  getBank();
});

const getBank = async () => {
  try {
    const res = await Axios({ url: "/api/bank" });
    const { card } = res?.data || null;
    c.value = card;
    data.name = card?.name || "";
    data.account = card?.account || "";
    data.ifsc = card?.ifsc || "";
    data.bank = card?.bank || "HDFC Bank";
  } catch (e) {}
};

const setBank = async () => {
  try {
    loading.value = true;
    const res = await Axios({
      url: "/api/bank",
      method: "POST",
      data: {
        name: data.name,
        account: data.account,
        bank: data.bank,
        ifsc: data.ifsc,
      },
    });
    showSuccessToast(
      c ? "Bank Account updated successfully" : "Bank Account add successfully"
    );
    loading.value = false;
    getBank();
  } catch (e) {
    showFailToast(e.response?.data?.message || e.message || e);
    loading.value = false;
  }
};

const loading = ref(false);

const handleSubmit = async () => {
  v.value.$validate();
  if (!v.value.$error) {
    await setBank();
  } else {
    showToast("please fill form");
  }
};
</script>
