<template>
  <div class="h-full flex flex-col">
    <PageHeader title="Create News" back-route="/admin/news" />
    <div class="grow overflow-y-auto p-5">
      <van-cell-group inset title="Title">
        <van-field
          :error="title.$error"
          v-model="data.title"
          placeholder="Title"
        />
      </van-cell-group>
      <van-cell-group inset title="Slug">
        <van-field v-model="slug" placeholder="Slug" readonly />
      </van-cell-group>
      <van-cell-group inset title="Featured Image" class="!bg-transparent">
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
          <CkEditor v-model="data.body" />
        </ClientOnly>
      </van-cell-group>
      <van-cell-group inset title="Featured" class="!bg-transparent">
        <van-switch v-model="data.featured" />
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
import CkEditor from "~/components/CkEditor.vue";
import Axios from "~/utils/axios";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const data = reactive({
  title: "",
  body: "",
  image: [],
  featured: false,
});

const slug = computed(() => data.title.replaceAll(" ", "-"));

const rules = {
  title: { required },
};

const v = useVuelidate(rules, data);
const { title } = v.value;

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
    formData.append("slug", slug.value);
    try {
      loading.value = true;
      const res = await Axios({
        url: "/api/news",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/formdata",
        },
      });
      loading.value = false;
      showSuccessToast("News Created");
      router.push("/admin/news");
    } catch (e) {
      loading.value = false;
      showFailToast(e.response?.data?.message || e.message || e);
    }
  } else {
    showToast("please fill required fields");
  }
};
</script>
