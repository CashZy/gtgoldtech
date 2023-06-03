<template>
  <div class="h-full flex flex-col">
    <PageHeader title="Recharge Records" />

    <div class="p-5 grow overflow-y-auto">
      <table class="w-full my-3">
        <thead>
          <tr>
            <td class="text-center">Time</td>
            <td class="text-center">Amount</td>
            <td class="text-center">Status</td>
            <td class="text-center">Details</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(deposit, index) in deposits" :key="index">
            <td
              class="text-center py-3 border-b border-secondary border-opacity-70 text-sm"
            >
              {{ moment(deposit.createdAt).format("YYYY-MM-DD hh:mm:ss A") }}
            </td>
            <td
              class="text-center py-3 border-b border-secondary border-opacity-70 text-sm"
            >
              {{ deposit.balance }}
            </td>
            <td
              class="text-center py-3 border-b border-secondary border-opacity-70 text-sm"
            >
              {{ deposit.status ? "Completed" : "Waiting Payment" }}
            </td>
            <td
              class="text-center py-3 border-b border-secondary border-opacity-70 text-sm"
            >
              <van-button
                is-link
                :to="`/payinfo/${deposit.id}`"
                class="!bg-secondary !border-secondary !text-white !text-xs !h-6 !w-10"
              >
                View
              </van-button>
            </td>
          </tr>
        </tbody>
      </table>
      <p
        v-if="deposits.length === 0"
        class="my-3 text-sm text-white text-center"
      >
        No More
      </p>
    </div>
  </div>
</template>

<script setup>
import PageHeader from "~/components/pages/PageHeader.vue";
import { ref, onMounted } from "vue";
import Axios from "~/utils/axios";
import moment from "moment";
import useAuth from "~/composables/auth/useAuth";

const { user } = useAuth();
const deposits = ref([]);
const loading = ref(false);

const getDeposits = async () => {
  try {
    loading.value = true;
    const res = await Axios({ url: `/api/deposit/${user.value.id}` });
    deposits.value = res.data;
    loading.value = false;
    console.log("|||||||||||||", user.value.id);
  } catch (e) {
    loading.value = false;
  }
};

onMounted(() => {
  getDeposits();
});
</script>
