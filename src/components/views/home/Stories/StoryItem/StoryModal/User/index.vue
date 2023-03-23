<template>
  <div class="z-50 absolute top-4 left-0 w-full px-2 py-2.5">
    <div class="flex items-center justify-between w-full">
      <div class="flex items-center justify-center gap-3">
        <img
          :src="getCurrentStoryInfo.image"
          class="w-[35px] h-[35px] rounded-full object-cover"
        />
        <h1 class="font-medium text-white text-sm">
          {{ getCurrentStoryInfo.title }}
        </h1>
      </div>
      <div @click="onCloseModal">
        <CloseIcon />
      </div>
    </div>
  </div>
</template>
<script>
import CloseIcon from "../../../../../../shared/icons/CloseIcon.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters({
      getCurrentStoryInfo: "story/getCurrentStoryInfo",
    }),
  },
  methods: {
    ...mapMutations({
      setCurrentStoryIndex: "story/setCurrentStoryIndex",
    }),
    onCloseModal() {
      this.setCurrentStoryIndex({ payload: null, type: null });
    },
  },
  components: {
    CloseIcon,
  },
};
</script>
