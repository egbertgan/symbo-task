"use strict";
import { GridSelection, SimpleBox } from "./components.js";
export default {
  "/": {
    extend: GridSelection,
    // P: { text: "Lorem ipsum dolor sit amet" },
  },
  "/about": {
    H3: { text: "This is Symbols starter-kit" },
    P: { text: "Lorem ipsum dolor sit amet" },
  },
};
