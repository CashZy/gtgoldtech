<template>
  <div class="">
    <div
      class="flex flex-col items-center justify-center space-y-1 text-white pt-5"
    >
      <img
        :src="profile"
        :style="{ width: '69px' }"
        class="rounded-full"
        alt=""
      />
      <p class="text-lg">{{ user?.phone }}</p>
      <p>ID: {{ user?.code }}</p>
    </div>
  </div>
</template>

<script setup>
import profile from "~/assets/images/common/profile.jpeg";
import useAuth from "~/composables/auth/useAuth";
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
</script>
