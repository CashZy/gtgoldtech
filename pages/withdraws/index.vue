<template>
  <div class="flex flex-col h-full">
    <PageHeader
      title="Withdraws"
      right-text="Records"
      right-route="/withdraws/record"
    />
    <div class="grow overflow-y-auto px-3">
      <div class="my-3 flex items-center space-x-2">
        <h3 class="font-semibold">Balance: {{ totalEarning }}</h3>
        <van-button
          class="!bg-[#ee0a24] !text-white !px-3 !py-1 !border-[#ee0a24] !h-6 !text-xs"
          >All</van-button
        >
      </div>
      <h3 class="font-semibold mb-1">Bank Account</h3>

      <van-cell-group inset class="!mx-0">
        <van-cell
          v-for="(b, i) in bank"
          :key="i"
          :title="b.title"
          :value="b.value"
        ></van-cell>
      </van-cell-group>

      <h3 class="font-semibold my-2">Amount</h3>
      <van-field
        class="!bg-transparent !border !border-white !rounded-lg placeholder:!text-red-500 mb-4 withdraws-amount-field"
        v-model="amount"
        placeholder="Please Enter the amount"
      />

      <h3 class="font-semibold my-2">Password</h3>
      <van-field
        class="!bg-transparent !border !border-white !rounded-lg placeholder:!text-red-500 mb-4 withdraws-amount-field"
        v-model="password"
        placeholder="Please Enter Password"
      />

      <div class="mx-5 my-5">
        <van-button
          class="!bg-secondary !text-white !border-secondary !rounded-full !h-12 !w-full !text-lg"
          @click="handleSubmit(totalEarning, user?.id)"
          >Submit</van-button
        >
      </div>
    </div>
  </div>
  <WithdrawsModal />
</template>

<script>
import { ref, onMounted, reactive } from "vue";
import WithdrawsModal from "~/components/pages/withdraws/WithdrawsModal.vue";
import PageHeader from "~/components/pages/PageHeader.vue";
import useAuth from "../../composables/auth/useAuth";
import "sweetalert2/dist/sweetalert2.min.css";
import Swal from "sweetalert2";
import Axios from "~/utils/axios";

export default {
  components: {
    WithdrawsModal,
    PageHeader,
  },
  setup() {
    const { user } = useAuth();
    const router = useRouter();
    const amount = ref("");
    const password = ref("");
    const bankdetails = ref([]);
    const bank = ref([]);
    const earningToday = ref("0.00");
    const team = ref([]);
    const totalEarning = ref("0.00");

    const summaryAmount = computed(() => {
      return team.value.reduce((total, item) => total + item.amount, 0);
    });

    const rechargeWallet = computed(() => {
      return parseFloat(earningToday.value) + parseFloat(summaryAmount.value);
    });

    const handleSubmit = async (balance, userId) => {
      if (amount.value && password.value && bank.value && bank.value.length > 0) {
        const enteredAmount = parseFloat(amount.value);

        if (enteredAmount > balance) {
          Swal.fire("Error!", "Insufficient balance for withdrawal..", "error");
          return;
        }

        if (enteredAmount < 110) {
          Swal.fire("Error!", "Entered amount should be greater than 110", "error");
          return;
        }

        try {
          const formData = new FormData();
          formData.append("amount", amount.value);
          formData.append("password", password.value);
          formData.append("username", userId); // Assuming user.username is available
          formData.append("walletId", bank.value[2].value);
          formData.append("paymentChannel", bank.value[0].value);
          formData.append("status", false);

          await Axios.post("/api/withdrew", formData);

          Swal.fire(
            "Pending!",
            "Your withdrawal will be completed within 24 hours.",
            "success"
          );
          setTimeout(() => {
            router.push("/")
          }, 2000);
        } catch (error) {
          // Handle errors
          console.error(error);
        }
      } else {
        if (!bank.value || bank.value.length === 0) {
      Swal.fire("Error!", "Bank details not found.", "error");
    } else {
      Swal.fire("Warning!", "Please fill in all the fields", "error");
    }
      }
    };

    onMounted(async () => {
      try {
        const resp = await Axios.get("/api/getdailyearning/");
        // console.log("Response:", response.data);
        earningToday.value = resp.data;

        const res = await Axios.get("/api/team/");
        team.value = res.data;
        // console.log("team Response:", team);

        const respons = await Axios.get("/api/totalearning/");
        totalEarning.value = respons.data.amount;

        const response = await Axios.get("/api/bank/");
        bankdetails.value = response.data;
        

        bank.value = [
          { title: "Bank", value: bankdetails.value.data.bank },
          { title: "Realname", value: bankdetails.value.data.name },
          { title: "Account", value: bankdetails.value.data.account },
          { title: "IFSC", value: bankdetails.value.data.ifsc },
        ];
        console.log("Bank Details:", bankdetails.value);
      } catch (error) {
        console.error("Error fetching bank details:", error);
      }
    });

    return {
      user,
      amount,
      password,
      bankdetails,
      handleSubmit,
      bank,
      earningToday,
      team,
      summaryAmount,
      rechargeWallet,
      totalEarning
    };
  },
};
</script>

<style>
.withdraws-amount-field .van-field__control {
  @apply placeholder:!text-gray-600 !text-white;
}
</style>
