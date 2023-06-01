<template>
  <PageHeader title="My Teams" />

  <div class="p-5">
    <div class="grid grid-cols-3">
      <div
        v-for="(t, i) in tabs1"
        :key="i"
        class="flex items-center justify-center border py-1 border-secondary text-secondary text-sm"
        :class="{
          '!text-white bg-secondary': tab1 == i,
        }"
        @click="tab1 = i"
      >
        {{ t }}
      </div>
    </div>
    <p class="my-2 text-sm font-semibold text-white text-center">
      Total {{ filteredOrders.length }}
    </p>
    <div class="grid grid-cols-2">
      <div
        v-for="(t, i) in tabs2"
        :key="i"
        class="flex items-center justify-center border py-1 border-secondary text-secondary text-sm bg-white"
        :class="{
          '!text-white !bg-secondary': tab2 == i,
        }"
        @click="tab2 = i"
      >
        {{ t }}
      </div>
    </div>
    <table class="w-full my-3">
      <thead>
        <tr>
          <!-- <td class="text-center">ID</td> -->
          <td class="text-center">Account</td>
          <td class="text-center">Level</td>
          <td class="text-center">Registration Time</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredOrders" :key="index">
          <!-- <td class="text-center">{{ item.id }}</td> -->
          <td class="text-center">{{ item.fromId }}</td>
          <td class="text-center">{{ item.level }}</td>
          <td class="text-center">{{ item.createdAt }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr v-for="(t, i) in team" :key="i">
          <td
            class="text-center border-b border-secondary border-opacity-50 py-2 text-xs"
          >
            <img
              v-if="t.avatar"
              :src="`/uploads/users/${t.avatar}`"
              :style="{ width: '50px', height: '50px' }"
              alt=""
            />
            <van-image v-else width="50px" height="50px" />
          </td>
          <td
            class="text-center border-b border-secondary border-opacity-50 py-2 text-xs"
          >
            {{ t.phone }}
          </td>
          <td
            class="text-center border-b border-secondary border-opacity-50 py-2 text-xs"
          ></td>
          <td
            class="text-center border-b border-secondary border-opacity-50 py-2 text-xs"
          >
            {{ format(new Date(t.createdAt), "yyyy-MM-dd") }}
          </td>
        </tr>
      </tfoot>
    </table>
    <p class="my-3 text-sm text-white text-center">No More</p>
  </div>
</template>

<script setup>
import { format } from "date-fns";
import PageHeader from "~/components/pages/PageHeader.vue";
import Axios from "~/utils/axios";
import { ref } from "vue";

const tabs1 = ref(["B10% - (0)", "C5% - (0)", "D2% - (0)"]);
const tabs2 = ref(["Invalid Members", "Valid Members"]);

const tab1 = ref(0);
const tab2 = ref(0);

const team = ref([]);
const filteredOrders = ref([]);

function formatDate(dateString) {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
  });

  return formattedDate;
}

onMounted(async () => {
  try {
    const response = await Axios.get("/api/team/");
    const orders = response.data;

    // Filter orders to keep only one order per user
    const userIds = new Set();
    filteredOrders.value = [];

    for (const order of orders) {
      if (!userIds.has(order.fromId)) {
        userIds.add(order.fromId);
        filteredOrders.value.push(order);
      }
    }

    // Format the createdAt property
    filteredOrders.value = filteredOrders.value.map((order) => ({
      ...order,
      createdAt: formatDate(order.createdAt),
    }));

    console.log("Filtered orders:", filteredOrders);
  } catch (error) {
    console.error("Error during request:", error);
  }
});
</script>
