<template>
  <div class="h-full flex flex-col">
    <PageHeader title="News" back-route="/user" />
    <div class="grow overflow-y-auto py-5">
      <div class="px-4 mb-2">
        <van-button icon="plus" is-link to="/admin/news/create"
          >Create</van-button
        >
      </div>
      <div class="flex items-center justify-center h-20" v-if="loading">
        <van-loading />
      </div>
      <van-cell-group inset v-else>
        <van-cell v-for="(n, i) in news" :key="i" :title="n.title">
          <template #extra>
            <div class="flex items-center justify-center space-x-2">
              <van-icon
                name="edit"
                @click="$router.push('/admin/news/' + n.slug)"
              />
              <van-loading v-if="deleting && delId == n.id" color="#000000" />
              <van-icon name="delete-o" @click="deleteNews(n.id)" v-else />
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
const news = ref([]);
const loading = ref(false);
const getNews = async () => {
  try {
    loading.value = true;
    const res = await Axios({ url: "/api/news" });
    news.value = res.data;
    loading.value = false;
  } catch (e) {
    loading.value = false;
  }
};

onMounted(() => {
  getNews();
});

const delId = ref(null);
const deleting = ref(false);
const deleteNews = async (id) => {
  try {
    delId.value = id;
    deleting.value = true;
    await Axios({ url: `/api/news/${id}`, method: "DELETE" });
    deleting.value = false;
    showSuccessToast("News Deleted");
    getNews();
  } catch (e) {
    console.log(e);
    deleting.value = false;
    showFailToast(e.response?.data?.message || e.message || e);
  }
};
</script>
