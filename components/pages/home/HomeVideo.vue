<template>
  <div class="rounded-lg mb-2 overflow-hidden">
    <div class="video-container">
      <video
        class="fit-video"
        controls
        autoplay
        muted
        loop
        poster="https://github.com/CashZy/gtgold/blob/main/assets/images/common/banner.png"
      >
        <source :src="home_video" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<style>
.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio (change this value according to your aspect ratio) */
  overflow: hidden;
}

.fit-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>

<script setup>
import home_video from "~/assets/videos/1.mp4";
</script>
