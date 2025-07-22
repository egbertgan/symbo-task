"use strict";
import { GridSelection, SimpleBox } from "./components.js";
export default {
  "/": {
    H1: { text: "Hello Symbols" },
    extend: GridSelection,
    // P: { text: "Lorem ipsum dolor sit amet" },
  },
  "/about": {
    H3: { text: "This is Symbols starter-kit" },
    P: { text: "Lorem ipsum dolor sit amet" },
  },
};
