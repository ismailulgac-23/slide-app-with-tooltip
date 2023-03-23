<template>
  <div
    @click="prevStorySlide"
    class="z-50 cursor-pointer bg-transparent absolute left-0 top-0 w-1/2 h-full flex items-center justify-center"
  />
  <div
    @click="nextStorySlide"
    class="z-40 cursor-pointer bg-transparent absolute top-0 right-0 w-1/2 h-full flex items-center justify-center"
  />
</template>
<script>
import LeftIcon from "../../../../../../components/shared/icons/LeftIcon.vue";
import RightIcon from "../../../../../../components/shared/icons/RightIcon.vue";
import { mapActions } from "vuex";
export default {
  methods: mapActions({
    nextStorySlide: "story/nextStorySlide",
    prevStorySlide: "story/prevStorySlide",
  }),
  components: {
    LeftIcon,
    RightIcon,
  },
};
</script>

<style scoped>
.next-icon-height {
  height: calc(100% - 50px);
}
</style>
