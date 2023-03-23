<template>
  <Modal
    class="select-none"
    v-touch:swipe.left="nextStorySlide"
    v-touch:swipe.right="prevStorySlide"
  >
    <Timeline />
    <User />
    <Navigation />
    <template v-for="(item, idx) in getCurrentStoryItems" :key="idx">
      <div :class="getContainerClasses">
        <SlideItem
          v-if="getCurrentSlideIndex === idx"
          :item="item"
          :idx="idx"
        />
      </div>
    </template>
  </Modal>
</template>
<script>
import Modal from "../../../../../shared/Modal.vue";
import Navigation from "./Navigation.vue";
import User from "./User/index.vue";
import Timeline from "./Timeline/index.vue";
import SlideItem from "./SlideItem.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      getCurrentSlideIndex: "story/getCurrentSlideIndex",
      getCurrentStoryItems: "story/getCurrentStoryItems",
    }),
    getContainerClasses() {
      return [
        "transition-all duration-100",
        {
          "w-full h-full": getCurrentSlideIndex === idx,
          "w-0 h-0": getCurrentSlideIndex !== idx,
        },
      ];
    },
  },
  methods: {
    ...mapActions({
      nextStorySlide: "story/nextStorySlide",
      prevStorySlide: "story/prevStorySlide",
    }),
  },
  components: {
    Modal,
    Navigation,
    User,
    Timeline,
    SlideItem,
  },
};
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
