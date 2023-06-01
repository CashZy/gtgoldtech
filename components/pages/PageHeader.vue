<template>
  <van-nav-bar
    :title="title || ''"
    left-text="Back"
    :right-text="rightText || ''"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
</template>

<script setup>
const { backRoute, rightRoute } = defineProps([
  "backRoute",
  "title",
  "rightText",
  "rightRoute",
]);
const router = useRouter();

const onClickLeft = () => {
  if (backRoute) {
    router.push({ path: backRoute });
  } else {
    router.back();
  }
};

const onClickRight = () => {
  if (rightRoute) {
    router.push(rightRoute);
  }
};
</script>

<style>
.van-nav-bar,
.van-hairline--bottom,
.van-nav-bar__content {
  @apply !bg-primary !text-white !border-none !border-primary;
}

.van-nav-bar-left {
  @apply !text-white;
}

.van-icon-arrow-left,
.van-nav-bar__text,
.van-nav-bar__title {
  @apply !text-white;
}

.van-nav-bar__title {
  @apply !font-medium;
}

.var-nav-bar__right {
  @apply !font-semibold;
}
</style>
