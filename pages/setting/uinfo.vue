<template>
  <div>
    <PageHeader title="Personal Information" back-route="/setting" />

    <div class="px-4 py-2 space-y-5">
      <div class="bg-white rounded-lg py-2 text-sm">
        <van-cell-group inset>
          <van-field
            v-model="formData.id"
            label="ID"
            readonly
            label-class="!text-right"
          />
          <van-field
            v-model="formData.phone"
            type="tel"
            label="Account"
            readonly
            label-class="!text-right"
          />
          <van-field
            v-model="formData.nickname"
            type="text"
            label="Nickname"
            label-class="!text-right"
          />

          <van-field
            type="digit"
            label="Current Avatar"
            label-class="!text-right"
          >
            <template #input>
              <img
                v-if="user?.avatar"
                :style="{ width: '80px', height: '80px' }"
                :src="`/uploads/users/${user?.avatar}`"
              />
              <van-image v-else width="80px" height="80px" />
            </template>
          </van-field>

          <van-field
            type="digit"
            label="Modify Avatar"
            label-class="!text-right"
          >
            <template #input>
              <van-uploader
                upload-icon="plus"
                v-model="formData.image"
                max-count="1"
              />
            </template>
          </van-field>
        </van-cell-group>
      </div>

      <van-button
        @click="handleSubmit"
        :loading="loading"
        class="!w-full !text-white !text-lg !font-medium !rounded-lg !bg-secondary !border-secondary"
      >
        Submit
      </van-button>
    </div>
  </div>
</template>

<script setup>
import PageHeader from "~/components/pages/PageHeader.vue";
import useAuth from "~/composables/auth/useAuth";
import useUpdateUser from "~/composables/auth/useUpdateUser";

const { user } = useAuth();

const formData = reactive({
  id: user?.value?.id || "",
  phone: user?.value?.phone || "",
  nickname: user?.value?.nickName || "",
  image: [],
});

watch(user, (value) => {
  if (value) {
    formData.id = value?.id || "";
    formData.phone = value?.phone || "";
    formData.nickname = value?.nickName || "";
  }
});

const { loading, updateUser } = useUpdateUser();

const handleSubmit = async () => {
  const data = new FormData();
  data.append("nickName", formData.nickname);
  if (formData.image.length > 0) {
    data.append("avatar", formData.image[0]?.file);
  }
  await updateUser(data);
};
</script>
