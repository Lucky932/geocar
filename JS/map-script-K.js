// Создаем карту Leaflet и добавляем ее на страницу
var map = L.map("map").setView([47.78122706241706, 68.00927505633176], 4); // Устанавливаем центр карты и начальный масштаб

// Добавляем слой OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
  minZoom: 4,
  continuesWorld: false,
}).addTo(map);

// Ограничиваем перемещение карты, чтобы она не заходила за пределы страны
var bounds = [
  [40.22372973989637, 46.04251311812741], // Юго-западная точка
  [55.583782409690224, 87.74386029013735], // Северо-восточная точка
]; // Примерные границы Казахстана
map.setMaxBounds(bounds);
map.on("drag", function () {
  map.panInsideBounds(bounds, { animate: false });
});

var regions = [
  { name: "Астана", coords: [51.1694, 71.4491] },
  { name: "Алматы", coords: [43.222, 76.8512] },
  { name: "Акмолинская область", coords: [53.2807, 69.3919] },
  { name: "Актюбинская область", coords: [48.0056, 66.9041] },
  { name: "Алматинская область", coords: [45.0, 79.0] },
  { name: "Атырауская область", coords: [47.1167, 51.8833] },
  { name: "Западно-Казахстанская область",coords: [51.2455, 51.3804] },
  { name: "Жамбылская область",coords: [43.7383, 71.612] },
  { name: "Карагандинская область",coords: [49.8039, 73.0778] },
  { name: "Костанайская область",coords: [53.2149, 63.6246] },
  { name: "Кызылординская область",coords: [45.785, 64.6335] },
  { name: "Мангистауская область",coords: [44.5905, 51.1694] },
  { name: "Южно-Казахстанская область",coords: [43.3333, 68.0] },
  { name: "Павлодарская область",coords: [52.2874, 76.9674] },
  { name: "Северо-Казахстанская область",coords: [54.8728, 69.1234] },
  { name: "Восточно-Казахстанская область",coords: [49.956, 82.6104] },
  { name: "Шымкент", coords: [42.3417, 69.5901] }
];

const filePath = "CSS\\Images\\EmptyTemplateLicKazNum.jpg";
const reg = [ "01", "02", "03", "04", "05", "06", "07", "08", "09", 10, 11, 12, 13, 14, 15, 16, 17 ];

regions.forEach(function (region, index) {
  const divel = document.createElement("div");
  divel.classList.add("canvas-container");

  const canvas = document.createElement("canvas");

  loadImage(filePath, canvas, index); // Передаем index в loadImage

  divel.appendChild(canvas);

  var popupContent = document.createElement("div"); // Создаем новый div элемент
  popupContent.appendChild(divel); // Добавляем divel (с canvas) как дочерний элемент

  var textElement = document.createElement("p"); // Создаем элемент для текста
  textElement.innerHTML = region.name; // Добавляем текст
  textElement.style.fontSize = "14pt";
  textElement.style.color = "#ad8fea"; // Устанавливаем цвет текста

  textElement.setAttribute("align", "center"); // Устанавливаем атрибут выравнивания
  popupContent.appendChild(textElement); // Добавляем текст как дочерний элемент

  L.marker(region.coords).addTo(map).bindPopup(popupContent);
});

function loadImage(imagePath, canvas, index) {
  const img = new Image();
  img.onload = function () {
    drawImage(img, canvas, index); // Передаем index в drawImage
  };
  img.src = imagePath;
}

function drawImage(img, canvas, index) {
  if (!canvas) {
    console.error("Canvas element not found: canvas_" + index);
    return;
  }

  const ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  const fontSizeLet = 23;

  const numSpacing = 13.9;
  const specSpacing = 43;

  const num = GenerateNum();
  const letter1 = GenerateLetter();
  const letter2 = GenerateLetter();
  const letter3 = GenerateLetter();

  const letterSpacing = 16;

  const startPosFirstNum = 23;
  const startPosFirstLet = startPosFirstNum + specSpacing;
  let nextPostLet1 = 0;
  let nextPostLet2 = 0;
  console.log('startPosFirstNum: ' + startPosFirstNum);
  console.log('startPosFirstLet: ' + startPosFirstLet)

  if (letter1 === "W" && letter2 != "W") {
    nextPostLet1 = startPosFirstLet + letterSpacing + 5;
    console.log('nextPostLet1: ' + nextPostLet1);
    nextPostLet2 = nextPostLet1 + letterSpacing;
  }
  else if (letter2 === "W" && letter1 != "W") {
    nextPostLet1 = startPosFirstLet + letterSpacing - 2;
    nextPostLet2 = nextPostLet1 + letterSpacing + 2.8;
  }
  else if (letter1 === "W" && letter2 === "W") {
    nextPostLet1 = startPosFirstLet + letterSpacing + 2.8;
    nextPostLet2 = nextPostLet1 + letterSpacing + 2.8;
  }
  else {
    nextPostLet1 = startPosFirstLet + letterSpacing;
    nextPostLet2 = nextPostLet1 + letterSpacing;
  }

  addTextToImage(ctx, num, "Fonts/altedin1451mittelschrift.ttf", 30, "black", startPosFirstNum, 28, numSpacing); // Генерируем цифры
  addTextToImage(ctx, letter1, "Fonts/altedin1451mittelschrift.ttf", fontSizeLet, "black", startPosFirstLet, 28, letterSpacing); // Генерируем буквы
  addTextToImage(ctx, letter2, "Fonts/altedin1451mittelschrift.ttf", fontSizeLet, "black", nextPostLet1, 28, letterSpacing); // Генерируем буквы
  addTextToImage(ctx, letter3, "Fonts/altedin1451mittelschrift.ttf", fontSizeLet, "black", nextPostLet2, 28, letterSpacing); // Генерируем буквы
  addTextToImage(ctx, reg[index].toString(), "Fonts/altedin1451mittelschrift.ttf", 28, "black", 122, 26, 13); // Добавляем регион
}

// Функция для добавления текста на изображение
function addTextToImage(ctx, text, fontFile, fontSize, color, x, y, letterSpacing) {
  const font = new FontFace("customFont", `url(${fontFile})`);
  font
    .load()
    .then((loadedFont) => {
      document.fonts.add(loadedFont);
      ctx.font = `${fontSize}px customFont`;
      ctx.fillStyle = color;
      for (let i = 0; i < text.length; i++) {
        ctx.fillText(text[i], x + i * letterSpacing, y);
      }
    })
    .catch((error) => console.error("Font loading failed:", error));
}

function GenerateLetter() {
  const letters = ["A","B","C","D","E","F",
    "G","H","I","K","L","M","N","O","P","R","S",
    "T","U","V","W","X","Y","Z"];
  return letters[Math.floor(Math.random() * letters.length)];
}

function GenerateNum() {
  let fullnum;

  let num1 = Math.floor(Math.random() * 10);
  let num2 = Math.floor(Math.random() * 10);
  let num3 =
    num1 === 0 && num2 === 0
      ? Math.floor(Math.random() * 9 + 1)
      : Math.floor(Math.random() * 10);

  fullnum = num1.toString() + num2.toString() + num3.toString();
  return fullnum;
}
