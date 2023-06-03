<template>
  <div class="h-full flex flex-col">
    <PageHeader title="Withdrawals Record" />

    <div class="p-5 grow overflow-y-auto">
      <table class="w-full my-3">
        <thead>
          <tr>
            <td class="text-center">Time</td>
            <td class="text-center">Amount</td>
            <td class="text-center">Status</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(withdrews, index) in withdrews" :key="index">
            <td
              class="text-center py-3 border-b border-secondary border-opacity-70 text-sm"
            >
              {{ moment(withdrews.createdAt).format("YYYY-MM-DD hh:mm:ss A") }}
            </td>
            <td
              class="text-center py-3 border-b border-secondary border-opacity-70 text-sm"
            >
              {{ withdrews.amount }}
            </td>
            <td
              class="text-center py-3 border-b border-secondary border-opacity-70 text-sm"
            >
              {{ withdrews.status ? "Completed" : "Waiting Payment" }}
            </td>
          </tr>
        </tbody>
      </table>
      <p class="my-3 text-sm text-white text-center">No More</p>
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
const withdrews = ref([]);
const loading = ref(false);

const getWithdrews = async () => {
  try {
    loading.value = true;
    const res = await Axios({ url: `/api/withdrew/${user.value.id}` });
    withdrews.value = res.data;

    loading.value = false;
  } catch (e) {
    loading.value = false;
  }
};

onMounted(() => {
  getWithdrews();
});
</script>
