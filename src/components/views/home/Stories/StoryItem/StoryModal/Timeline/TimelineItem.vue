<template>
  <div class="flex-1 rounded-full bg-[#ffffff80] h-1">
    <div :class="getTimelineClasses" :style="getTimelineStyles" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    isFinished: false,
    timeout: null,
  }),
  props: {
    duration: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      getCurrentSlideIndex: "story/getCurrentSlideIndex",
    }),
    getIsFinished() {
      return this.isFinished;
    },
    getTimelineStyles() {
      return `animation-duration: ${this.duration}ms`;
    },
    getTimelineClasses() {
      return [
        "transition-all duration-1000 h-full bg-white",
        {
          "with-anim": !this.getIsFinished,
        },
      ];
    },
  },
  methods: {
    ...mapActions({
      nextStorySlide: "story/nextStorySlide",
    }),
    watchStory() {
      this.timeout = setTimeout(() => {
        this.nextStorySlide();
        this.isFinished = true;
      }, this.duration);
    },
  },
  mounted() {
    this.watchStory();
  },
  beforeUnmount() {
    clearTimeout(this.timeout);
  },
};
</script>
<style scoped>
.with-anim {
  animation: with-anim linear 1;
}
@keyframes with-anim {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
</style>
