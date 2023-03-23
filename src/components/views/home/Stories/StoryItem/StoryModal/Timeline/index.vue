<template>
  <div class="w-full h-10 top-0 left-0 absolute bg-yellow">
    <div class="flex items-center justify-between p-2 gap-3">
      <template v-for="(item, idx) in getCurrentStoryItems" :key="idx">
        <TimelineItem
          v-if="getCurrentSlideIndex === idx"
          :duration="item.duration"
        />
        <TimelineDefaultItem
          v-else-if="getCurrentSlideIndex > idx"
          class="bg-white"
        />
        <TimelineDefaultItem v-else />
      </template>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import TimelineItem from "./TimelineItem.vue";
import TimelineDefaultItem from "./TimelineDefaultItem.vue";
export default {
  components: {
    TimelineItem,
    TimelineDefaultItem,
  },
  computed: mapGetters({
    getCurrentStoryItems: "story/getCurrentStoryItems",
    getCurrentSlideIndex: "story/getCurrentSlideIndex",
  }),
};
</script>
