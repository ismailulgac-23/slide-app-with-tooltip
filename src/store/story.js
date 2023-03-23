import { parseStoryModels } from "../constants/helpers";
import { storiesData } from "../constants/data";
const state = () => ({
  currentSlideIndex: 0,
  currentStoryIndex: null,
  stories: parseStoryModels(storiesData),
});
const getters = {
  getStories(state) {
    return state.stories;
  },
  getCurrentStoryIndex(state) {
    return state.currentStoryIndex;
  },
  getCurrentSlideIndex(state) {
    return state.currentSlideIndex;
  },
  getCurrentStoryInfo(state) {
    const { image, title } = state.stories[state.currentStoryIndex];
    return {
      image,
      title,
    };
  },
  getCurrentStoryItems(state) {
    return state.stories[state.currentStoryIndex].items;
  },
};
const mutations = {
  setCurrentSlideIndex(state, payload) {
    state.currentSlideIndex = payload;
  },
  setStories: (state, payload) => {
    state.stories = payload;
  },
  setCurrentStoryItems(state, { items, currentStoryIndex }) {
    state.stories[currentStoryIndex].items = items;
  },
  setCurrentStoryIndex(state, { payload = null, type = null }) {
    if (payload == null) {
      document.querySelector("body").classList.remove("overflow-hidden");
    } else {
      document.querySelector("body").classList.add("overflow-hidden");
    }

    if (type == "inc") {
      state.currentStoryIndex = state.currentStoryIndex + 1;
      return;
    }
    if (type == "dec") {
      state.currentStoryIndex = state.currentStoryIndex - 1;
      return;
    }
    state.currentStoryIndex = payload;
  },
};
const actions = {
  nextStorySlide: ({ state, getters, commit }) => {
    const { getCurrentStoryItems, getCurrentSlideIndex } = getters;
    if (getCurrentSlideIndex < getCurrentStoryItems.length - 1) {
      var idx = getCurrentSlideIndex + 1;
      commit("setCurrentSlideIndex", idx);
      return;
    }
    commit("setCurrentSlideIndex", 0);
    commit("setCurrentStoryIndex", { payload: null, type: "inc" });
  },
  prevStorySlide: ({ getters, commit }) => {
    const { getCurrentSlideIndex } = getters;
    if (getCurrentSlideIndex != 0) {
      commit("setCurrentSlideIndex", getCurrentSlideIndex - 1);
      return;
    }
    commit("setCurrentStoryIndex", { payload: null, type: "dec" });
  },
  seeStorySlide({ state, getters, commit }, index) {
    const { getCurrentStoryIndex } = getters;
    const newStoryItems = state.stories[getCurrentStoryIndex].items.map(
      (slide, idx) => {
        if (index === idx) {
          return {
            ...slide,
            isSeen: true,
          };
        }

        return { ...slide };
      }
    );
    commit("setCurrentStoryItems", {
      items: newStoryItems,
      currentStoryIndex: getCurrentStoryIndex,
    });
  },
  fetchCurrentSlideWithoutSeen({ commit, getters }) {
    const { getCurrentStoryItems } = getters;
    for (let i = 0; i < getCurrentStoryItems.length; i++) {
      const { isSeen } = getCurrentStoryItems[i];
      if (isSeen === false) {
        commit("setCurrentSlideIndex", i);
        break;
      }
      continue;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
