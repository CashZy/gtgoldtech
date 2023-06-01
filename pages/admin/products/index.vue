<template>
  <div class="h-full flex flex-col">
    <PageHeader title="Products" back-route="/user" />
    <div class="grow overflow-y-auto py-5">
      <div class="px-4 mb-2">
        <van-button icon="plus" is-link to="/admin/products/create"
        >Create</van-button
        >
      </div>
      <div class="flex items-center justify-center h-20" v-if="loading">
        <van-loading />
      </div>
      <van-cell-group inset v-else>
        <van-cell v-for="(n, i) in products" :key="i" :title="n.title">
          <template #extra>
            <div class="flex items-center justify-center space-x-2">
              <van-icon
                  name="edit"
                  @click="$router.push('/admin/products/' + n.id)"
              />
              <van-loading v-if="deleting && delId == n.id" color="#000000" />
              <van-icon name="delete-o" @click="deleteProducts(n.id)" v-else />
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script setup>
import PageHeader from "~/components/pages/PageHeader.vue";
import Axios from "~/utils/axios";
const products = ref([]);
const loading = ref(false);
const getProducts = async () => {
  try {
    loading.value = true;
    const res = await Axios({ url: "/api/products" });
    products.value = res.data;
 
    loading.value = false;
  } catch (e) {
    loading.value = false;
  }
};

onMounted(() => {
  getProducts();
});

const delId = ref(null);
const deleting = ref(false);
const deleteProducts = async (id) => {
  try {
    delId.value = id;
    deleting.value = true;
    await Axios({ url: `/api/products/${id}`, method: "DELETE" });
    deleting.value = false;
    showSuccessToast("Products Deleted");
    getProducts();
  } catch (e) {
    console.log(e);
    deleting.value = false;
    showFailToast(e.response?.data?.message || e.message || e);
  }
};
</script>
