const fs = require("fs");
const path = require("path");
const { program } = require("commander");

program
  .command("create")
  .option("--x <number>", "columns", "8")
  .option("--y <number>", "rows", "4")
  .description("Generate GridSelection component")
  .action(({ x, y }) => {
    const content = generateGridSelectionComponent(x, y);
    const outPath = path.join(__dirname, "src", "components.js");

    if (fs.existsSync(outPath)) {
      const existing = fs.readFileSync(outPath, "utf-8");
      if (existing.includes("// === GridSelection ===")) {
        console.log("GridSelection component already exists in components.js — skipping append.");
        return;
      }
    }

    fs.appendFileSync(outPath, "\n\n" + content);
    console.log(`GridSelection component appended to ${outPath}`);
  });

program.parse();

function generateGridSelectionComponent(x, y) {
  return `
// === GridSelection ===
const squares = [];
for (let y = 0; y < ${y}; y++) {
  for (let x = 0; x < ${x}; x++) {
    squares.push({ CoorX: x + 1, CoorY: y + 1, isSelected: false, backgroundColor: "#E8F1FF" });
  }
}

export const GridSelection = {
  extend: Flex,
  state: {
    selectedX: 0,
    selectedY: 0,
  },
  props: { flow: "column", columns: "1fr 2fr", gap: "A" },
  H2: {
    text: "Grid Selection",
    color: "white",
    font: "base",
  },
  Flex: {
    props: {
      display: "block",
      gap: "A",
      aspectRatio: "1 / 1",
    },
    Div: {
      attr: { class: "square" },
      Grid: {
        gap: "A",
        width: "100%",
        maxWidth: "100%",
        columns: \`repeat(${x}, 1fr)\`,
        children: squares,
        childrenAs: "state",
        childProps: (el, state, root) => {
          return {
            Div: {
              props: {
                background: "selected-box" ? "#3D7BD9" : "#E8F1FF",
                borderRadius: "6px",
                aspectRatio: "1 / 1",
                cursor: "pointer",
                transition: "background 0.2s ease",
                width: "32px",
              },
              attr: { "data-x": state.CoorX, "data-y": state.CoorY },
              class: {
                someClass: true,
                className: (state) => (state.isSelected ? "selected-box" : "default-box"),
              },
              on: {
                click: (event, el, state, root) => {
                  const clickedX = Number(el.attr["data-x"]);
                  const clickedY = Number(el.attr["data-y"]);

                  const allBoxes = document.querySelectorAll("[data-x][data-y]");

                  allBoxes.forEach((box) => {
                    const x = Number(box.getAttribute("data-x"));
                    const y = Number(box.getAttribute("data-y"));

                    if (x <= clickedX && y <= clickedY) {
                      box.classList.add("selected-box");
                      box.classList.remove("default-box");
                    } else {
                      box.classList.add("default-box");
                      box.classList.remove("selected-box");
                    }
                  });

                  const coordText = document.querySelector(".selected-coordinates");
                  const totalText = document.querySelector(".total-selected");

                  if (coordText) coordText.textContent = \`Selection coordinates: \${clickedX},\${clickedY}\`;
                  if (totalText) totalText.textContent = \`Total cells selected: \${clickedX * clickedY}\`;
                },
              },
            },
          };
        },
      },
      Flex: {
        props: {
          width: "100%",
          justifyContent: "space-between",
          margin: "20px 0 0 0",
        },
        childExtend: {
          extend: "Text",
        },
        selCoor: {
          attr: { class: "selected-coordinates" },
          text: "Selection coordinates: -",
        },
        totalCoor: {
          attr: { class: "total-selected" },
          text: "Total cells selected: -",
        },
      },
    },
  },
};
`;
}
