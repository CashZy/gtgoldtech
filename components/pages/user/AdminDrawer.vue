<template>
  <div
    class="absolute right-12 top-5"
    @click="show = true"
    v-if="user?.isAdmin"
  >
    <van-icon name="apps-o" size="30" class="!text-white" />
  </div>

  <van-popup
    v-model:show="show"
    closeable
    position="left"
    :style="{ width: '50%', height: '100%' }"
  >
    <div class="mt-12">
      <van-cell-group inset>
        <van-cell
          v-for="(link, i) in links"
          :title="link.title"
          :key="i"
          is-link
          :to="link.route"
        />
      </van-cell-group>
    </div>
  </van-popup>
</template>
<script setup>
import useAuth from "~/composables/auth/useAuth";

const { user } = useAuth();
const show = ref(false);

const links = ref([
  { title: "News", route: "/admin/news" },
  { title: "Products", route: "/admin/products" },
  { title: "Coupons", route: "/admin/coupons" },
  { title: "Users", route: "/admin/user" },
  { title: "Deposit", route: "/admin/deposit" },
  { title: "Withdrew", route: "/admin/withdrew" },
]);
</script>
