const PAD_WIDTH = 500;
const PAD_HEIGHT = (PAD_WIDTH / 4) * 3;

const inputRows = document.getElementById("rows");
const inputColumns = document.getElementById("columns");

let pixelClass = document.createElement("style");
pixelClass.id = "pixelStyle";
document.body.appendChild(pixelClass);

function createPixels(columns, rows) {
  const sketchpad = document.getElementById("sketchpad");
  sketchpad.style.gridTemplateColumns = `repeat(${columns}, auto)`;
  sketchpad.style.gridTemplaterows = `repeat(${rows}, auto)`;

  for (let i = 0; i < rows * columns; i++) {
    pixel = sketchpad.appendChild(document.createElement("div"));
    pixel.classList.add("pixel");
    pixel.addEventListener("mouseover", function () {
      this.style.backgroundColor = "#161616";
    });
  }
}

function updatePixelStyle(width, height) {
  while (pixelClass.sheet.cssRules.length > 0) {
    pixelClass.sheet.deleteRule(0);
  }

  pixelClass.sheet.insertRule(
    `.pixel {
    border: 1px solid #edecea;
    width: ${width}px;
    height: ${height}px;
  }`,
    pixelClass.sheet.cssRules.length
  );
}

function updatePadSize(columns, rows) {
  let pixels = document.querySelectorAll(".pixel");
  pixels.forEach((x) => x.remove());
  createPixels(columns, rows);
  updatePixelStyle(PAD_WIDTH / columns, PAD_HEIGHT / rows);
}

function addEventListeners() {
  const updateBtn = document.getElementById("updateBtn");
  updateBtn.addEventListener("click", () => {
    updatePixelStyle(
      PAD_WIDTH / inputColumns.value,
      PAD_HEIGHT / inputRows.value
    );
    updatePadSize(inputColumns.value, inputRows.value);
  });
}

createPixels(inputColumns.value, inputRows.value);
updatePixelStyle(PAD_WIDTH / inputColumns.value, PAD_HEIGHT / inputRows.value);
addEventListeners();
