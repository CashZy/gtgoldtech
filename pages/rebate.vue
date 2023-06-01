<template>
  
 
  <div>
    <PageHeader title="Team Commission" />
   
    <div class="p-5 overflow-y-auto h-[80vh]">
      <p class="font-semibold text-center">
        Summary
        <span class="text-[#e10202]">₹{{ summaryAmount.toFixed(2) }}</span>
      </p>

      <table class="w-full my-3">
        <thead>
          <tr>
            <th class="text-center">Time</th>
            <th class="text-center">From</th>
            <th class="text-center">Level</th>
            <!-- <th class="text-center">Rate</th> -->
            <th class="text-center">Money</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in team" :key="index">
            <td class="text-center">{{ item.createdAt }}</td>
            <td class="text-center">{{ item.fromId }}</td>
            <td class="text-center">{{ item.level }}</td>
            <td class="text-center">{{ item.amount }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="team.length === 0" class="my-3 text-sm text-white text-center">
        No More
      </p>
    </div>
  </div>
</template>
 
<script>
import Axios from "~/utils/axios";
import { ref, onMounted } from "vue";
import PageHeader from "~/components/pages/PageHeader.vue";
export default {
  components: {
    PageHeader,
  },
  setup() {
    const team = ref([]);
    const summaryAmount = computed(() => {
      return team.value.reduce((total, item) => total + item.amount, 0);
    });

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
        team.value = response.data.map((item) => ({
          ...item,
          createdAt: formatDate(item.createdAt),
        }));
        console.log("team Response:", team);
      } catch (error) {
        console.error("Error during request:", error);
      }
    });

    return {
      team,
      summaryAmount,
    };
  },
};
</script>
