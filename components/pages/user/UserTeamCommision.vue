<template>
  <div class="bg-white rounded-lg py-3 px-8 space-y-3">
    <div class="flex items-center justify-between text-lg text-[#333]">
      <div class="flex flex-col space-y-0.5 items-center justify-center">
        <p>10%</p>
        <p>B({{ getLevelUserCount("B") }})</p>
      </div>
      <div class="flex flex-col space-y-0.5 items-center justify-center">
        <p>5%</p>
        <p>C({{ getLevelUserCount("C") }})</p>
      </div>
      <div class="flex flex-col space-y-0.5 items-center justify-center">
        <p>2%</p>
        <p>D({{ getLevelUserCount("D") }})</p>
      </div>
    </div>

    <NuxtLink
      to="/rebate"
      class="bg-[#ff976a] text-white py-2 flex items-center justify-center rounded-full w-full"
    >
      Team Commission
    </NuxtLink>
  </div>
</template>

<script setup>
import Axios from "~/utils/axios";
import { ref } from "vue";

const filteredOrders = ref([]);

// Function to get the count of users under a specific level
const getLevelUserCount = (level) => {
  const userIds = new Set();
  for (const order of filteredOrders.value) {
    if (order.level === level) {
      userIds.add(order.fromId);
    }
  }
  return userIds.size;
};

onMounted(async () => {
  try {
    const response = await Axios.get("/api/myteam/");
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

    console.log("Filtered orders:", filteredOrders);
  } catch (error) {
    console.error("Error during request:", error);
  }
});
</script>
