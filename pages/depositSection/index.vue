<template>
  <div class="flex flex-col h-full">
    <div class="grow overflow-y-auto px-3">
      <h3 class="font-semibold mb-1">Bank Account</h3>

      <van-cell-group inset class="!mx-0">
        <van-cell
          v-for="(b, i) in bank"
          :key="i"
          :title="b.title"
          :value="b.value"
        ></van-cell>
      </van-cell-group>

      <van-field
        class="!bg-transparent !border !border-white !rounded-lg placeholder:!text-red-500 mb-4 recharge-amount-field"
        v-model="transactionId"
        placeholder="Please Enter the Transaction ID"
      />

      <div class="mx-8 my-5">
        <van-button
          class="!bg-secondary !text-white !font-semibold !border-secondary !rounded-lg !w-full !text-xl !h-16"
          @click="submitTransaction(transactionId, balance, paymentChannel)"
        >
          Submit
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, reactive } from 'vue';
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2';
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Axios from "~/utils/axios";
const router = useRouter()
const bank = ref([
  { title: "Bank", value: "HDFC Bank" },
  { title: "Realname", value: "Akash" },
  { title: "Account", value: "9897875565" },
  { title: "IFSC", value: "FDRL0005" },
]);

const data = reactive({
  balance: "",
  transactionId: "",
  paymentChannel: "",
  status: false,
  id: "",
});

const props = defineProps({
  balance: String,
  paymentChannel: String
});

onMounted(() => {
  data.balance = props.balance;
  data.paymentChannel = props.paymentChannel;
});

const rules = {
  balance: { required },
  paymentChannel: { required },
};

const v = useVuelidate(rules, data);
const { balance, transactionId, paymentChannel } = v.value;

const submitTransaction = async (transactionId, balance, paymentChannel) => {
  v.value.$validate();
  if (!v.value.$error) {
    try {
      const formData = new FormData();
      formData.append('transactionId', transactionId);
      formData.append('balance', data.balance); // Use data.balance instead of balance
      formData.append('paymentChannel', data.paymentChannel); // Use 
      formData.append('status', false);

      await Axios({
        url: `/api/deposit/${data.id}`,
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire('Pending!', 'Your Deposit will be Completed within 24 hours.', 'success');
      router.push("/");
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  }
};
</script>

<style>
.recharge-amount-field .van-field__control {
  @apply placeholder:!text-gray-600 !text-white;
}
</style>
