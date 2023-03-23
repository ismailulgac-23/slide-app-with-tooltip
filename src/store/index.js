import { createStore } from "vuex";
import storyModule from "./story";

export default createStore({
  modules: {
    story: storyModule,
  },
});
