import { defineStore } from "pinia";
import { getHuntTheme } from "../api";
import { ThemeCfg } from "./interfaces";

export const useTheme = defineStore("theme", {
  state: () => ({
    themes: {} as ThemeCfg,
  }),
  actions: {
    async update(hunt: string) {
      if (hunt in this.themes) {
        getHuntTheme(hunt).then((data) => {
          console.debug(data);
          if(data) this.themes[hunt] = data;
        })
      } else {
        let data = await getHuntTheme(hunt);
        console.debug(data);
        if(data) this.themes[hunt] = data;
        else console.error("empty theme!");
      }
    }
  },
  persist: {
    storage: localStorage,
  },
});
