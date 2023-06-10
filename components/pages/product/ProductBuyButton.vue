<template>
  <div class="px-4 py-1 bg-white fixed w-full max-width mx-auto bottom-0">
    <van-button
      @click="() => (show = !show)"
      class="!bg-secondary !text-lg !text-white font-medium w-full !rounded-lg"
    >
      Buy Now
    </van-button>

    <van-popup v-model:show="show" position="bottom">
      <div class="py-2 px-3">
        <div class="flex justify-end">
          <van-icon
            name="cross"
            class="!text-xl !text-light"
            @click="() => (show = false)"
          />
        </div>
        <div class="grid grid-cols-2 bg-primary p-2 rounded-lg text-white">
          <div class="flex flex-col items-center justify-center">
            <p class="text-sm">Balance Wallet</p>
            <p class="text-xs">{{ rechargeWallet }}</p>
          </div>
          <div class="flex flex-col items-center justify-center">
            <p class="text-sm">Recharge Wallet</p>
            <p class="text-xs">{{ user?.balance }}</p>
          </div>
        </div>

        <div class="py-3">
          <van-cell title="Price">
            <p class="text-[#fa5151]">₹{{ product.price }}.00</p>
          </van-cell>
          <van-cell title="Total">
            <p class="text-[#fa5151]">₹{{ product.price }}.00</p>
          </van-cell>
          <van-cell title="Coupon">
            <select
              class="border border-[#00cdf2] text-[#00cdf2] text-xs py-1 outline-none"
            >
              <option value="">Choose an option</option>
            </select>
          </van-cell>
        </div>

        <div class="mx-5">
          <van-button
          @click.prevent="
    submit(user?.balance, rechargeWallet, product?.price, user?.id)
  "
            class="!w-full !bg-[#013d7d] !text-white !rounded-lg"
            >Confirm</van-button
          >
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Axios from "~/utils/axios";
import { ref, reactive } from "vue";
import useAuth from "../../../composables/auth/useAuth";

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { user } = useAuth();
    const show = ref(false);
    const earningToday = ref("0.00");
    const team = ref([]);
    const summaryAmount = computed(() => {
      return team.value.reduce((total, item) => total + item.amount, 0);
    });
    const rechargeWallet = computed(() => {
      return parseFloat(earningToday.value) + parseFloat(summaryAmount.value);
    });

    onMounted(async () => {
      try {
        const response = await Axios.get("/api/getdailyearning/");
        // console.log("Response:", response.data);
        earningToday.value = response.data;

        const res = await Axios.get("/api/team/");
        team.value = res.data;
        // console.log("team Response:", team);
      } catch (error) {
        console.error("Error during request:", error);
      }
    }); 

    const submit = async (balance, rechargeWallet, price, userIId) => {
      if (balance >= price || rechargeWallet >= price) {
        v.value.$validate();
        if (!v.value.$error) {
          const formData = new FormData();

          formData.append("productId", props.product.id);
          formData.append("quantity", 1);
          formData.append("totalPrice", props.product.price);
          formData.append("couponId", "");
          formData.append("userIId", userIId);

          try {
            loading.value = true;
            const response = await Axios({
              url: `/api/orders/${data.id}`,
              method: "POST",
              data: formData,
              headers: {
                "Content-Type": "multipart/formdata",
              }, 
            });
            loading.value = false;
            showSuccessToast("Order Created");
            if (response) {
              // console.log("222222222222" , response)
              try {
                await Axios({
                  url: `/api/buyproduct/${response.data.productId}`,
                  method: "PUT",
                  data: formData,
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
              } catch (error) {
                console.error("Error during request:", error);
              }
            }

            router.push({ path: "/product/order", replace: true });
          } catch (e) {
            loading.value = false;
            showFailToast(e.response?.data?.message || e.message || e);
          }
        } else {
          showToast("please fill required fields");
        }
      } else {
        showToast("Insufficient Balance");
      }
    };

    let data = reactive({
      id: "",
      productId: 0,
      quantity: 0,
      totalPrice: 0,
      couponId: 0,
    });

    const rules = {
      productId: { required },
      quantity: { required },
      totalPrice: { required },
      couponId: { required },
    };

    const v = useVuelidate(rules, data);
    const { id, productId, quantity, totalPrice, couponId } = v.value;

    const loading = ref(false);
    const router = useRouter();

    return {
      user,
      show,
      submit,
      product: props.product,
      data,
      v,
      id,
      productId,
      quantity,
      totalPrice,
      couponId,
      loading,
      router,
      earningToday,
      team,
      summaryAmount,
      rechargeWallet,
    };
  },
};
</script>
