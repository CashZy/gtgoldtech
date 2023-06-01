<template>
  <div class="h-full flex flex-col">
    <PageHeader title="All Deposit's List" back-route="/user" />
    <div class="grow overflow-y-auto py-5">
      <div class="flex items-center justify-center h-20" v-if="loading">
        <van-loading />
      </div>

      <table v-else class="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">Username</th>
            <th class="py-2 px-4 border-b">User ID</th>
            <th class="py-2 px-4 border-b">Amount</th>
            <th class="py-2 px-4 border-b">Transaction ID</th>
            <th class="py-2 px-4 border-b">Status</th>
            <th class="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(deposit, index) in deposits" :key="index">
            <td class="py-2 px-4 border-b">{{ deposit.username }}</td>
            <td class="py-2 px-4 border-b">{{ deposit.userId }}</td>
            <td class="py-2 px-4 border-b">{{ deposit.balance }}</td>
            <td class="py-2 px-4 border-b">{{ deposit.transactionId }}</td>
            <td class="py-2 px-4 border-b">
              {{ deposit.status ? "Completed" : "Pending" }}
            </td>
            <td class="py-2 px-4 border-b">
              <div class="flex items-center justify-center space-x-2">
                <van-button
                  v-if="!isCompleted(deposit.status)"
                  type="primary"
                  size="small"
                  @click="acceptDeposit(deposit.id, deposit.userId)"
                  >Accept</van-button
                >
                <van-button
                  v-if="!isCompleted(deposit.status)"
                  type="danger"
                  size="small"
                  @click="rejectDeposit(deposit.id)"
                  >Reject</van-button
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import PageHeader from "~/components/pages/PageHeader.vue";
import "sweetalert2/dist/sweetalert2.min.css";
import Swal from "sweetalert2";
import { ref, onMounted } from "vue";
import Axios from "~/utils/axios";

const deposits = ref([]);
const loading = ref(false);

const getDeposits = async () => {
  try {
    loading.value = true;
    const res = await Axios({ url: "/api/deposit" });
    deposits.value = res.data;
    loading.value = false;
  } catch (e) {
    loading.value = false;
  }
};

onMounted(() => {
  getDeposits();
});

const acceptDeposit = async (id, userIId) => {
  // Logic to accept the deposit with the given ID and update the status to "Completed"
  const deposit = deposits.value.find((d) => d.id === id);
  if (deposit) {
    deposit.status = true;
    try {
      loading.value = true;
      await Axios({
        url: `/api/deposit/${id}`,
        method: "PUT",
        data: JSON.stringify({ status: deposit.status, userIId: userIId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      loading.value = false;
      Swal.fire("Accepted!", "Deposit Accepted.", "success");
    } catch {
      Swal.fire("Failed!", "Request Failed.", "error");
    }
  }
};

const rejectDeposit = (id) => {
  // Logic to reject the deposit with the given ID
  loading.value = false;
  console.log("Reject deposit with ID:", id);
  Swal.fire("Rejected!", "Deposit Rejected.", "error");
};

const isCompleted = (status) => {
  return status === true;
};
</script>
