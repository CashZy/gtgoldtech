<template>
  <div>
    <PageHeader title="My Projects" />

    <div class="p-5 overflow-y-auto h-[80vh]">
      <p class="text-white text-center text-lg">
        Total: ₹{{ totalAmount.toFixed(2) }}
      </p>
      <table class="w-full my-3">
        <thead>
          <tr>
            <td class="text-center">Image</td>
            <td class="text-center">Name</td>
            <td class="text-center">Total Price</td>
            <td class="text-center">Quantity</td>
          </tr>
        </thead>
        <tfoot>
          <tr v-for="(p, i) in filteredOrders" :key="i">
            <td
              class="text-center border-b border-secondary border-opacity-50 py-2 text-xs"
            >
              <img
                v-if="p.product.image"
                :src="`/uploads/products/${p.product.image}`"
                :style="{ width: '50px', height: '50px' }"
                alt=""
              />
              <van-image v-else width="50px" height="50px" />
            </td>
            <td
              class="text-center border-b border-secondary border-opacity-50 py-2 text-xs"
            >
              {{ p.product.name }}
            </td>
            <td
              class="text-center border-b border-secondary border-opacity-50 py-2 text-xs"
            >
              {{ p.totalPrice }}
            </td>
            <td
              class="text-center border-b border-secondary border-opacity-50 py-2 text-xs"
            >
              {{ p.quantity }}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import useAuth from "~/composables/auth/useAuth";
import PageHeader from "~/components/pages/PageHeader.vue";
import Axios from "~/utils/axios";
import { ref, onMounted, computed } from "vue";

export default {
  components: {
    PageHeader,
  },
  setup() {
    const { user } = useAuth();
    const orders = ref([]);

    onMounted(async () => {
      try {
        const response = await Axios.get("/api/orders/");
        orders.value = response.data;
        // console.log("Orders:", orders.value);
      } catch (error) {
        console.error("Error fetching orders:", error);
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
      filteredOrders,
      totalAmount,
    };
  },
};
</script>

<style></style>
