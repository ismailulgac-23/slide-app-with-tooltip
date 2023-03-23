<template>
  <div @click.stop="onOpenStory" :class="getClasses">
    <div :class="getGradientClasses">
      <img :src="story.image" :class="getImageClasses" />
    </div>
    <h1 class="text-xs text-center title-text">{{ story.title }}</h1>
  </div>
  <Transition class="bg-black w-full h-full">
    <StoryModal v-if="getShowModal" />
  </Transition>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import StoryModal from "./StoryModal/index.vue";
export default {
  props: ["story", "idx", "isGrabbing"],
  methods: {
    ...mapMutations({
      setCurrentStoryIndex: "story/setCurrentStoryIndex",
    }),
    ...mapActions({
      fetchCurrentSlideWithoutSeen: "story/fetchCurrentSlideWithoutSeen",
    }),
    onOpenStory() {
      this.setCurrentStoryIndex({ payload: this.idx, type: null });
      this.fetchCurrentSlideWithoutSeen();
    },
  },
  computed: {
    ...mapGetters({
      getCurrentStoryIndex: "story/getCurrentStoryIndex",
    }),
    getTitle() {
      return story.title.length > 9
        ? story.title.slice(0, 9) + "..."
        : story.title;
    },
    getShowModal() {
      return this.getCurrentStoryIndex === this.idx;
    },
    getGradientClasses() {
      return ["rounded-full p-[3px]", { notSeen: !this.getStorySeen }];
    },
    getClasses() {
      return [
        "shrink-0 max-w-[90px] w-full select-none flex items-center justify-center flex-col gap-1",
        { "cursor-pointer": this.isGrabbing },
      ];
    },
    getStorySeen() {
      const filteredNotSeenItems = this.story.items.filter(
        (e) => e.isSeen === false
      );
      return filteredNotSeenItems.length ? false : true;
    },
    getImageClasses() {
      return [
        "object-cover rounded-full image",
        {
          "border-4 border-slate-300 w-[70px] h-[70px]": this.getStorySeen,
          "w-full h-full": !this.getStorySeen,
        },
      ];
    },
  },
  components: { StoryModal },
};
</script>
<style scoped>
.title-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}
.notSeen {
  width: 70px;
  height: 70px;
  background: radial-gradient(rgba(0, 0, 0, 0.15) 60%, transparent 0),
    radial-gradient(white 65%, transparent 0),
    linear-gradient(to top right, orange, deeppink);
}
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
