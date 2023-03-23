<template>
  <div class="w-full h-full flex items-center justify-center">
    <div
      v-if="!getIsVideo"
      class="w-full h-full object-contain image"
      :style="getImage"
    />
    <video
      v-else
      :src="item.image"
      webkit-playsinline
      playsinline
      autoplay
      class="mx-auto"
    ></video>
    <div
      v-if="item.link != null"
      class="absolute bottom-5 w-full px-2 py-1 bg-[#0000009a] z-50 grid place-items-center"
    >
      <a :href="item.link.url" target="_blank" class="text-white">
        {{ item.link.title }}
      </a>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: ["item", "idx"],
  methods: {
    ...mapActions({
      seeStorySlide: "story/seeStorySlide",
    }),
  },
  mounted() {
    this.seeStorySlide(this.idx);
  },
  computed: {
    getImage() {
      return `background-image: url(${this.item.image});`;
    },
    getIsVideo() {
      return this.item.storyType === "video";
    },
  },
};
</script>

<style scoped>
.image {
  background-size: contain;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
}
</style>
