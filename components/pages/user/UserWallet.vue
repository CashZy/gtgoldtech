<template>
  <div class="bg-white rounded-lg p-3 grid grid-cols-3 gap-2">
    <div class="flex flex-col space-y-0.5 items-center justify-center">
      <NuxtLink to="/product/order" class="text-sm text-light">
        Invest
      </NuxtLink>
      <p class="text-primary text-lg font-medium">
        {{ totalAmount.toFixed(2) }}
      </p>
    </div>
    <div
      class="flex flex-col space-y-0.5 items-center justify-center overflow-x-auto"
    >
      <NuxtLink to="/recharge" class="text-sm text-light">
        Recharge Wallet
      </NuxtLink>

      <p class="text-primary text-lg font-medium">{{ user?.balance }}</p>
    </div>
    <div class="flex flex-col space-y-0.5 items-center justify-center">
      <NuxtLink to="/withdraws" class="text-sm text-light">
        Balance Wallet
      </NuxtLink>
      <p class="text-primary text-lg font-medium">
        {{ totalEarning + summaryAmount }}
      </p>
    </div>
    <div class="flex flex-col space-y-0.5 items-center justify-center">
      <p class="text-sm text-light">Earnings Today</p>
      <p class="text-primary text-lg font-medium">{{ earningToday }}</p>
    </div>
    <div class="flex flex-col space-y-0.5 items-center justify-center">
      <p class="text-sm text-light">Total Earning</p>
      <p class="text-primary text-lg font-medium">{{ totalEarning }}</p>
    </div>
    <div class="flex flex-col space-y-0.5 items-center justify-center">
      <p class="text-sm text-light">Team Income</p>
      <p class="text-primary text-lg font-medium">
        {{ summaryAmount.toFixed(2) }}
      </p>
    </div>
  </div>
</template>

<script>
import useAuth from "../../../composables/auth/useAuth";
import Axios from "~/utils/axios";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const { user } = useAuth();
    const earningToday = ref("0.00");
    const totalEarning = ref("0.00");

    const team = ref([]);
    const orders = ref([]);
    const summaryAmount = computed(() => {
      return team.value.reduce((total, item) => total + item.amount, 0);
    });

    onMounted(async () => {
      try {
        const response = await Axios.get("/api/getdailyearning/");
        // console.log("Response:", response.data);
        earningToday.value = response.data;

        const respons = await Axios.get("/api/totalearning/");
        console.log("Responsetotal:", respons.data);
        totalEarning.value = respons.data.amount;

        const res = await Axios.get("/api/team/");
        team.value = res.data;
        // console.log("team Response:", team);

        const resp = await Axios.get("/api/orders/");
        orders.value = resp.data;
      } catch (error) {
        console.error("Error during request:", error);
      }
    });
    const filteredOrders = computed(() => {
      return orders.value.filter((order) => order.userId === user.value.id);
    });

    const totalAmount = computed(() => {
      return filteredOrders.value.reduce(
        (total, order) => total + order.totalPrice,
        0
      );
    });

    return {
      user,
      earningToday,
      totalEarning,
      team,
      summaryAmount,
      totalAmount,
    };
  },
};
</script>
