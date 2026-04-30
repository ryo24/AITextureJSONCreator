const SIZE = 16;
const NAME_PATTERN = /^[a-z0-9_]+$/;
const COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;
const TRANSPARENT = "transparent";

const sampleTexture = {
  schema_version: "1.0",
  texture_name: "grass_sample",
  texture_type: "block",
  resolution: {
    width: 16,
    height: 16
  },
  pixel_data: [
    ["#4F8F35", "#5FA33D", "#4F8F35", "#6AAF43", "#568F38", "#7BBC4D", "#4F8F35", "#6AAF43", "#5FA33D", "#4F8F35", "#75B748", "#568F38", "#6AAF43", "#4F8F35", "#5FA33D", "#6AAF43"],
    ["#5FA33D", "#6AAF43", "#75B748", "#4F8F35", "#5FA33D", "#568F38", "#6AAF43", "#7BBC4D", "#4F8F35", "#5FA33D", "#568F38", "#75B748", "#4F8F35", "#6AAF43", "#7BBC4D", "#568F38"],
    ["#6AAF43", "#4F8F35", "#5FA33D", "#568F38", "#75B748", "#6AAF43", "#4F8F35", "#5FA33D", "#7BBC4D", "#568F38", "#6AAF43", "#4F8F35", "#5FA33D", "#75B748", "#568F38", "#4F8F35"],
    ["#4F8F35", "#75B748", "#568F38", "#6AAF43", "#4F8F35", "#5FA33D", "#7BBC4D", "#568F38", "#6AAF43", "#4F8F35", "#75B748", "#5FA33D", "#568F38", "#6AAF43", "#4F8F35", "#75B748"],
    ["#3D7132", "#4B7D37", "#3D7132", "#5A8E40", "#4B7D37", "#3D7132", "#5A8E40", "#4B7D37", "#3D7132", "#5A8E40", "#4B7D37", "#3D7132", "#5A8E40", "#4B7D37", "#3D7132", "#5A8E40"],
    ["#6B4C2E", "#765638", "#5F4229", "#6B4C2E", "#85623F", "#765638", "#5F4229", "#6B4C2E", "#765638", "#5F4229", "#85623F", "#6B4C2E", "#765638", "#5F4229", "#6B4C2E", "#765638"],
    ["#765638", "#5F4229", "#6B4C2E", "#85623F", "#765638", "#6B4C2E", "#5F4229", "#765638", "#6B4C2E", "#85623F", "#5F4229", "#765638", "#6B4C2E", "#85623F", "#765638", "#5F4229"],
    ["#5F4229", "#6B4C2E", "#765638", "#5F4229", "#6B4C2E", "#85623F", "#765638", "#5F4229", "#6B4C2E", "#765638", "#5F4229", "#6B4C2E", "#85623F", "#765638", "#5F4229", "#6B4C2E"],
    ["#6B4C2E", "#85623F", "#5F4229", "#765638", "#6B4C2E", "#5F4229", "#765638", "#85623F", "#5F4229", "#6B4C2E", "#765638", "#5F4229", "#6B4C2E", "#765638", "#85623F", "#5F4229"],
    ["#765638", "#6B4C2E", "#85623F", "#5F4229", "#765638", "#6B4C2E", "#5F4229", "#765638", "#85623F", "#6B4C2E", "#5F4229", "#765638", "#6B4C2E", "#5F4229", "#765638", "#85623F"],
    ["#5F4229", "#765638", "#6B4C2E", "#85623F", "#5F4229", "#765638", "#6B4C2E", "#5F4229", "#765638", "#85623F", "#6B4C2E", "#5F4229", "#765638", "#6B4C2E", "#5F4229", "#765638"],
    ["#85623F", "#5F4229", "#765638", "#6B4C2E", "#5F4229", "#85623F", "#765638", "#6B4C2E", "#5F4229", "#765638", "#6B4C2E", "#85623F", "#5F4229", "#765638", "#6B4C2E", "#5F4229"],
    ["#6B4C2E", "#765638", "#5F4229", "#6B4C2E", "#765638", "#5F4229", "#85623F", "#6B4C2E", "#765638", "#5F4229", "#6B4C2E", "#765638", "#5F4229", "#85623F", "#6B4C2E", "#765638"],
    ["#765638", "#5F4229", "#6B4C2E", "#85623F", "#5F4229", "#765638", "#6B4C2E", "#5F4229", "#85623F", "#765638", "#6B4C2E", "#5F4229", "#765638", "#6B4C2E", "#85623F", "#5F4229"],
    ["#5F4229", "#6B4C2E", "#765638", "#5F4229", "#6B4C2E", "#85623F", "#765638", "#5F4229", "#6B4C2E", "#765638", "#5F4229", "#6B4C2E", "#85623F", "#765638", "#5F4229", "#6B4C2E"],
    ["#4F3622", "#5F4229", "#4F3622", "#6B4C2E", "#5F4229", "#4F3622", "#6B4C2E", "#5F4229", "#4F3622", "#6B4C2E", "#5F4229", "#4F3622", "#6B4C2E", "#5F4229", "#4F3622", "#6B4C2E"]
  ]
};

const elements = {
  canvas: document.querySelector("#textureCanvas"),
  jsonInput: document.querySelector("#jsonInput"),
  jsonOutput: document.querySelector("#jsonOutput"),
  textureNameInput: document.querySelector("#textureNameInput"),
  colorPicker: document.querySelector("#colorPicker"),
  statusPill: document.querySelector("#statusPill"),
  resourcePath: document.querySelector("#resourcePath"),
  errorBox: document.querySelector("#errorBox"),
  errorMessage: document.querySelector("#errorMessage"),
  repairPrompt: document.querySelector("#repairPrompt"),
  blockTypeButton: document.querySelector("#blockTypeButton"),
  itemTypeButton: document.querySelector("#itemTypeButton"),
  paintToolButton: document.querySelector("#paintToolButton"),
  eraseToolButton: document.querySelector("#eraseToolButton")
};

const ctx = elements.canvas.getContext("2d", { alpha: true });
ctx.imageSmoothingEnabled = false;

const state = {
  textureName: sampleTexture.texture_name,
  textureType: sampleTexture.texture_type,
  pixels: clonePixels(sampleTexture.pixel_data),
  tool: "paint",
  isPointerDown: false
};

function clonePixels(pixels) {
  return pixels.map((row) => row.slice());
}

function normalizeColor(value) {
  return value.toUpperCase();
}

function getCurrentTexture() {
  return {
    schema_version: "1.0",
    texture_name: state.textureName,
    texture_type: state.textureType,
    resolution: {
      width: SIZE,
      height: SIZE
    },
    pixel_data: clonePixels(state.pixels)
  };
}

function stringifyTexture(texture) {
  return JSON.stringify(texture, null, 2);
}

function stripCodeFence(text) {
  const trimmed = text.trim();
  const match = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  return match ? match[1].trim() : trimmed;
}

function validateTexture(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("JSONのルートは1つのオブジェクトにしてください。");
  }
  if (data.schema_version !== "1.0") {
    throw new Error('schema_version は "1.0" にしてください。');
  }
  if (typeof data.texture_name !== "string" || !data.texture_name) {
    throw new Error("texture_name は空でない文字列にしてください。");
  }
  if (!NAME_PATTERN.test(data.texture_name)) {
    throw new Error("texture_name は英小文字、数字、アンダースコアのみ使えます。");
  }
  if (data.texture_type !== "block" && data.texture_type !== "item") {
    throw new Error('texture_type は "block" または "item" にしてください。');
  }
  if (!data.resolution || data.resolution.width !== SIZE || data.resolution.height !== SIZE) {
    throw new Error('resolution は { "width": 16, "height": 16 } にしてください。');
  }
  if (!Array.isArray(data.pixel_data)) {
    throw new Error("pixel_data は配列にしてください。");
  }
  if (data.pixel_data.length !== SIZE) {
    throw new Error(`pixel_data の行数が${data.pixel_data.length}行です。必ず16行にしてください。`);
  }
  data.pixel_data.forEach((row, y) => {
    if (!Array.isArray(row)) {
      throw new Error(`pixel_data の${y + 1}行目は配列にしてください。`);
    }
    if (row.length !== SIZE) {
      throw new Error(`pixel_data の${y + 1}行目が${row.length}列です。必ず16列にしてください。`);
    }
    row.forEach((pixel, x) => {
      if (pixel !== TRANSPARENT && (typeof pixel !== "string" || !COLOR_PATTERN.test(pixel))) {
        throw new Error(`${y + 1}行${x + 1}列のピクセル値は "#RRGGBB" または "transparent" にしてください。`);
      }
    });
  });
}

function parseTextureInput(text) {
  const rawJson = stripCodeFence(text);
  let data;
  try {
    data = JSON.parse(rawJson);
  } catch (error) {
    throw new Error(`JSONとして読み込めません。${error.message}`);
  }
  validateTexture(data);
  data.pixel_data = data.pixel_data.map((row) =>
    row.map((pixel) => pixel === TRANSPARENT ? TRANSPARENT : normalizeColor(pixel))
  );
  return data;
}

function buildRepairPrompt(errorMessage, sourceJson) {
  return `以下のJSONを、AIテクスチャジェネレーターで読み込める形式に修正してください。

エラー内容:
${errorMessage}

修正ルール:
- JSONは1つのオブジェクトにしてください。
- schema_version は "1.0" にしてください。
- texture_name は英小文字、数字、アンダースコアのみで作ってください。
- texture_type は "block" または "item" にしてください。
- resolution は { "width": 16, "height": 16 } にしてください。
- pixel_data は16行x16列にしてください。
- ピクセル値は "#RRGGBB" または "transparent" のみ使ってください。
- 出力はJSONのみ。Markdownコードブロック、説明文、コメント、省略記号は使わないでください。

修正対象JSON:
${sourceJson.trim() || "(ここに修正対象JSONを貼ってください)"}`;
}

function loadTexture(texture) {
  state.textureName = texture.texture_name;
  state.textureType = texture.texture_type;
  state.pixels = clonePixels(texture.pixel_data);
  elements.textureNameInput.value = state.textureName;
  updateTypeButtons();
  updateStatus("読み込み済み");
  hideError();
  render();
  exportJson();
}

function render() {
  ctx.clearRect(0, 0, SIZE, SIZE);
  for (let y = 0; y < SIZE; y += 1) {
    for (let x = 0; x < SIZE; x += 1) {
      const pixel = state.pixels[y][x];
      if (pixel !== TRANSPARENT) {
        ctx.fillStyle = pixel;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
  drawGrid();
  updateResourcePath();
}

function drawGrid() {
  ctx.save();
  ctx.strokeStyle = "rgba(0, 0, 0, 0.28)";
  ctx.lineWidth = 0.04;
  for (let i = 1; i < SIZE; i += 1) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, SIZE);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(SIZE, i);
    ctx.stroke();
  }
  ctx.restore();
}

function paintAtEvent(event) {
  const rect = elements.canvas.getBoundingClientRect();
  const x = Math.floor(((event.clientX - rect.left) / rect.width) * SIZE);
  const y = Math.floor(((event.clientY - rect.top) / rect.height) * SIZE);
  if (x < 0 || x >= SIZE || y < 0 || y >= SIZE) {
    return;
  }
  state.pixels[y][x] = state.tool === "erase" ? TRANSPARENT : normalizeColor(elements.colorPicker.value);
  render();
  updateStatus("編集中");
}

function exportJson() {
  const nameError = validateCurrentName();
  if (nameError) {
    showError(nameError, elements.jsonInput.value);
    return false;
  }
  elements.jsonOutput.value = stringifyTexture(getCurrentTexture());
  hideError();
  updateStatus("書き出し済み");
  return true;
}

function validateCurrentName() {
  const name = elements.textureNameInput.value.trim();
  if (!name) {
    return "texture_name は空にできません。";
  }
  if (!NAME_PATTERN.test(name)) {
    return "texture_name は英小文字、数字、アンダースコアのみ使えます。";
  }
  state.textureName = name;
  return "";
}

function updateTypeButtons() {
  elements.blockTypeButton.classList.toggle("active", state.textureType === "block");
  elements.itemTypeButton.classList.toggle("active", state.textureType === "item");
}

function updateToolButtons() {
  elements.paintToolButton.classList.toggle("active", state.tool === "paint");
  elements.eraseToolButton.classList.toggle("active", state.tool === "erase");
}

function updateResourcePath() {
  const name = elements.textureNameInput.value.trim() || state.textureName;
  elements.resourcePath.textContent = `textures/${state.textureType}/${name}.png`;
}

function updateStatus(text) {
  elements.statusPill.textContent = text;
}

function showError(message, sourceJson) {
  elements.errorMessage.textContent = message;
  elements.repairPrompt.value = buildRepairPrompt(message, sourceJson);
  elements.errorBox.classList.remove("hidden");
  updateStatus("エラー");
}

function hideError() {
  elements.errorBox.classList.add("hidden");
  elements.errorMessage.textContent = "";
  elements.repairPrompt.value = "";
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function downloadJson() {
  if (!exportJson()) {
    return;
  }
  const blob = new Blob([elements.jsonOutput.value], { type: "application/json" });
  downloadBlob(blob, `${state.textureName}.json`);
}

function downloadPng() {
  const nameError = validateCurrentName();
  if (nameError) {
    showError(nameError, elements.jsonInput.value);
    return;
  }
  const pngCanvas = document.createElement("canvas");
  pngCanvas.width = SIZE;
  pngCanvas.height = SIZE;
  const pngCtx = pngCanvas.getContext("2d", { alpha: true });
  pngCtx.clearRect(0, 0, SIZE, SIZE);
  for (let y = 0; y < SIZE; y += 1) {
    for (let x = 0; x < SIZE; x += 1) {
      const pixel = state.pixels[y][x];
      if (pixel !== TRANSPARENT) {
        pngCtx.fillStyle = pixel;
        pngCtx.fillRect(x, y, 1, 1);
      }
    }
  }
  pngCanvas.toBlob((blob) => {
    if (blob) {
      downloadBlob(blob, `${state.textureName}.png`);
    }
  }, "image/png");
}

function setTextureType(type) {
  state.textureType = type;
  updateTypeButtons();
  updateResourcePath();
  updateStatus("編集中");
}

function bindEvents() {
  document.querySelector("#sampleButton").addEventListener("click", () => {
    elements.jsonInput.value = stringifyTexture(sampleTexture);
    loadTexture(sampleTexture);
  });

  document.querySelector("#loadButton").addEventListener("click", () => {
    try {
      const texture = parseTextureInput(elements.jsonInput.value);
      loadTexture(texture);
    } catch (error) {
      showError(error.message, elements.jsonInput.value);
    }
  });

  document.querySelector("#clearButton").addEventListener("click", () => {
    elements.jsonInput.value = "";
    hideError();
    updateStatus("未読み込み");
  });

  document.querySelector("#exportButton").addEventListener("click", exportJson);
  document.querySelector("#downloadJsonButton").addEventListener("click", downloadJson);
  document.querySelector("#downloadPngButton").addEventListener("click", downloadPng);

  document.querySelector("#copyRepairButton").addEventListener("click", async () => {
    await navigator.clipboard.writeText(elements.repairPrompt.value);
    updateStatus("コピー済み");
  });

  elements.textureNameInput.addEventListener("input", () => {
    validateCurrentName();
    updateResourcePath();
    updateStatus("編集中");
  });

  elements.blockTypeButton.addEventListener("click", () => setTextureType("block"));
  elements.itemTypeButton.addEventListener("click", () => setTextureType("item"));

  elements.paintToolButton.addEventListener("click", () => {
    state.tool = "paint";
    updateToolButtons();
  });

  elements.eraseToolButton.addEventListener("click", () => {
    state.tool = "erase";
    updateToolButtons();
  });

  elements.canvas.addEventListener("pointerdown", (event) => {
    state.isPointerDown = true;
    elements.canvas.setPointerCapture(event.pointerId);
    paintAtEvent(event);
  });

  elements.canvas.addEventListener("pointermove", (event) => {
    if (state.isPointerDown) {
      paintAtEvent(event);
    }
  });

  elements.canvas.addEventListener("pointerup", (event) => {
    state.isPointerDown = false;
    elements.canvas.releasePointerCapture(event.pointerId);
  });

  elements.canvas.addEventListener("pointercancel", () => {
    state.isPointerDown = false;
  });
}

function init() {
  bindEvents();
  elements.jsonInput.value = stringifyTexture(sampleTexture);
  loadTexture(sampleTexture);
}

init();
