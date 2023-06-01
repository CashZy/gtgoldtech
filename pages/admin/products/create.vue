<template>
  <div class="h-full flex flex-col">
    <PageHeader title="Products Details" back-route="/admin/products" />
    <div class="grow overflow-y-auto p-5">
      <van-cell-group inset title="Title">
        <van-field
            :error="title.$error"
            v-model="data.title"
            placeholder="Title"
        />
      </van-cell-group>
      <van-cell-group inset title="Price">
        <van-field
            :error="price.$error"
            v-model="data.price"
            placeholder="Price"
            type="number"
        />
      </van-cell-group>
      <van-cell-group inset title="Days">
        <van-field
            :error="days.$error"
            v-model="data.days"
            placeholder="Days"
            type="number"
        />
      </van-cell-group>
      <van-cell-group inset title="Daily Profit">
        <van-field
            :error="dayProfit.$error"
            v-model="data.dayProfit"
            placeholder="Daily Profit"
            type="number"
        />
      </van-cell-group>
      <van-cell-group inset title="Total Revenue">
        <van-field
            :error="totalRevenue.$error"
            v-model="data.totalRevenue"
            placeholder="Total Revenue"
            type="number"
        />
      </van-cell-group>
      <van-cell-group inset title="Daily Rate">
        <van-field
            :error="rate.$error"
            v-model="data.rate"
            placeholder="Daily Rate"
            type="number"
        />
      </van-cell-group>
      <van-cell-group inset title="Quantity">
        <van-field
            :error="quantity.$error"
            v-model="data.quantity"
            placeholder="Quantity"
            type="number"
        />
      </van-cell-group>
      <van-cell-group inset title="Featured Image" class="!bg-transparent">
        <van-field class="!bg-transparent">
          <template #input>
            <img :src="'/uploads/products/' + image" class="w-20" v-if="image" />
            <p v-else>No Image</p>
          </template>
        </van-field>
      </van-cell-group>
      <van-cell-group inset title="Update Image" class="!bg-transparent">
        <van-field class="!bg-transparent">
          <template #input>
            <van-uploader
                v-model="data.image"
                upload-icon="plus"
                :max-count="1"
            />
          </template>
        </van-field>
      </van-cell-group>
      <van-cell-group inset title="Description">
        <ClientOnly>
          <CkEditor v-model="data.content" />
        </ClientOnly>
      </van-cell-group>
      <van-cell-group inset title="Published" class="!bg-transparent">
        <van-switch v-model="data.published" />
      </van-cell-group>

      <div class="my-5">
        <van-button
            :loading="loading"
            @click="submit"
            class="!bg-secondary !text-white !w-full !border-secondary !font-semibold"
        >
          Submit
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import PageHeader from "~/components/pages/PageHeader.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Axios from "~/utils/axios";
let data = reactive({
  title: "",
  price: "",
  days: "",
  dayProfit: "",
  totalRevenue: "",
  rate: "",
  quantity: "",
  content: "",
  image: [],
  published: true,
  featured: false,
  id: "",
});

const route = useRoute();
const image = ref("");

const rules = {
  title: { required },
  price: { required },
  days: { required },
  dayProfit: { required },
  totalRevenue: { required },
  rate: { required },
  quantity: { required },
};

const v = useVuelidate(rules, data);
const { title, dayProfit, days, price, totalRevenue, rate, quantity } = v.value;

const loading = ref(false);
const router = useRouter();

const submit = async () => {
  v.value.$validate();
  if (!v.value.$error) {
    const formData = new FormData();
    for (var d in data) {
      if (d == "image") {
        for (var i in data.image) {
          formData.append("image_" + i, data.image[i].file);
        }
      } else {
        formData.append(d, data[d]);
      }
    }
    try {
      loading.value = true;
      await Axios({
        url: `/api/products/${data.id}`,
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/formdata",
        },
      });
      loading.value = false;
      showSuccessToast("Product Created");
      router.push("/admin/products");
    } catch (e) {
      loading.value = false;
      showFailToast(e.response?.data?.message || e.message || e);
    }
  } else {
    showToast("please fill required fields");
  }
};
</script>