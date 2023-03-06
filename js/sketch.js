const inputRows = document.getElementById("rows");
const inputColumns = document.getElementById("columns");
const styleId = "pixelStyle";
let pixelClass = document.getElementById(styleId);

function createPixels(columns, rows) {
  const sketchpad = document.getElementById("sketchpad");
  sketchpad.style.gridTemplateColumns = `repeat(${columns}, auto)`;
  sketchpad.style.gridTemplaterows = `repeat(${rows}, auto)`;

  const pixelWidth = `${500 / columns}px`;
  const pixelheight = `${500 / rows}px`;
  updatePixelStyle(500 / columns, 500 / rows);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      pixel = sketchpad.appendChild(document.createElement("div"));
      pixel.classList.add("pixel");
      pixel.addEventListener("mouseover", function () {
        this.style.backgroundColor = "#161616";
      });
    }
  }
}

function updatePixelStyle(width, height) {
  if (pixelClass === null) {
    pixelClass = document.createElement("style");
    pixelClass.id = styleId;
    document.body.appendChild(pixelClass);
  }

  let style = pixelClass.sheet;

  while (style.cssRules.length > 0) {
    style.deleteRule(0);
  }

  style.insertRule(
    `.pixel {
    border: 1px solid #edecea;
    width: ${width}px;
    height: ${height}px;
  }`,
    style.cssRules.length
  );
}

function updatePadSize(columns, rows) {
  let pixels = document.querySelectorAll(".pixel");
  pixels.forEach((x) => x.remove());
  createPixels(columns, rows);
}

function addEventListeners() {
  const updateBtn = document.getElementById("updateBtn");
  updateBtn.addEventListener("click", () => {
    updatePixelStyle(500 / inputColumns.value, 500 / inputRows.value);
    updatePadSize(inputColumns.value, inputRows.value);
  });
}

createPixels(inputColumns.value, inputRows.value);
addEventListeners();
