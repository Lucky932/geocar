// Создаем карту Leaflet и добавляем ее на страницу
var map = L.map("map").setView([54, 27.55], 4); // Устанавливаем центр карты и начальный масштаб

// Добавляем слой OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
  minZoom: 6,
}).addTo(map);

//Ограничиваем перемещение карты, чтобы она не заходила за пределы страны
var bounds = [
  [55.0, 25.5],
  [53, 33.0],
  [51, 23],
  [56.2, 32],
]; // Примерные границы Беларуси
map.setMaxBounds(bounds);
map.on("drag", function () {
  map.panInsideBounds(bounds, { animate: false });
});

var regions = [
  { name: "Брестская область", coords: [52.1, 24] },
  { name: "Витебская область", coords: [55, 28] },
  { name: "Гомельская область", coords: [52.5, 30.5] },
  { name: "Гродненская область", coords: [53.5, 24.5] },
  { name: "Минская область", coords: [53.39838920514813, 27.34320059495868] },
  { name: "Могилевская область", coords: [53.5, 31] },
  { name: "Минск", coords: [53.9, 27.6] },
];

const filePath = "CSS\\Images\\EmptyTemplateLicBelNum.jpg";
const reg = [1, 2, 3, 4, 5, 6, 7];

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
  textElement.style.color = "#ad8fea";

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

  let num1 = GenerateNum();
  let num2 = GenerateNum();
  let num3 = GenerateNum();
  let num4 = num1 === 0 && num2 === 0 && num3 === 0
  ? Math.floor(Math.random() * 9 + 1)
  : Math.floor(Math.random() * 10);

  let let1 = GenerateLetter();
  let let2 = GenerateLetter();
  const regi = reg[index];

  if ((num1 === 0 && num2 === 0 && num3 === 0) || (num1 === num2 && num1 === num3 && num1 === num4)) {
    console.log(reg[index])
  }

  const startPosNum = 24;
  const numSpace = 14;
  const spaceBtwNumLet = 2;
  const letSpace = 19;
  const yPos = 30.8;
  const fontSize = 30;
  const scaleY = 2.6;
  const scaleX = 3.5;
  const scaleYLet = 2.6;
  const scaleXLet = 3.5; const yPosL = 30.5;

  addTextToImage(ctx, num1.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize, "black", startPosNum, yPos, scaleY, scaleX);
  addTextToImage(ctx,num2.toString(),"Fonts/altedin1451mittelschrift.ttf",fontSize,"black", startPosNum + numSpace, yPos, scaleY, scaleX);
  addTextToImage(ctx, num3.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize, "black", startPosNum + numSpace * 2, yPos, scaleY, scaleX);
  addTextToImage(ctx, num4.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize, "black", startPosNum + numSpace * 3, yPos, scaleY, scaleX);
  addTextToImage(ctx, let1.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize, "black", startPosNum + numSpace * 4 + spaceBtwNumLet, yPosL, scaleYLet, scaleXLet );
  addTextToImage(ctx, let2.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize, "black", startPosNum + numSpace * 4 + spaceBtwNumLet + letSpace, yPosL, scaleYLet, scaleXLet);
  addTextToImage(ctx, "-", "Fonts/altedin1451mittelschrift.ttf", fontSize, "black", startPosNum + numSpace * 4 + spaceBtwNumLet + letSpace + 20, 28, 3.5, scaleX);
  addTextToImage(ctx, regi.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize, "black", startPosNum + numSpace * 4 + spaceBtwNumLet + letSpace * 2 + spaceBtwNumLet + 10, yPos, scaleY, scaleX);
}

// Функция для добавления текста на изображение
function addTextToImage(ctx, text, font, size, color, x, y, scaleX, scaleY) {
  ctx.save(); // Сохранить состояние контекста
  ctx.font = `${size}px ${font}`;
  ctx.fillStyle = color;
  ctx.translate(x, y); // Перемещаем контекст в нужную позицию
  ctx.scale(scaleX, scaleY); // Масштабируем по горизонтали и вертикали
  ctx.fillText(text, 0, 0); // Рисуем текст

  ctx.restore(); // Восстановить состояние контекста
}

function GenerateLetter() {
  const letters = ["A", "B", "E", "I", "K", "M", "H", "O", "P", "C", "T", "X"];
  return letters[Math.floor(Math.random() * letters.length)];
}

function GenerateNum() {
  return Math.floor(Math.random() * 10);
}
