const filePathR = "CSS\\Images\\EmptyTemplateLicRusNum.jpg";
const filePathB = "CSS\\Images\\EmptyTemplateLicBelNum.jpg";
const filePathK = "CSS\\Images\\EmptyTemplateLicKazNum.jpg";
const lettersRus = ["A", "B", "C", "E", "H", "K", "P", "M", "Y", "O", "T", "X"];
const lettersBel = ["A", "B", "E", "I", "K", "M", "H", "O", "P", "C", "T", "X"];
const lettersKaz = ["A","B","C","D","E","F","G","H","I","K","L","M","N","O","P","R","S","T","U","V","W","X","Y","Z"];

const regBel = [1, 2, 3, 4, 5, 6, 7];
const regKaz = ["01","02","03","04","05","06","07","08","09",10,11,12,13,14,15,16,17];
const regRus = ['01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 
    11, 12, 13, 14, 15, 16, 17, 18, 19, 
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
    71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
    82, 83, 86, 87, 89, 90, 91,
    92, 93, 94, 95, 96, 97, 98, 99,
    102, 113, 116, 121, 124, 125, 126, 134,
    136, 138, 142, 147, 150, 152, 154, 156,
    159, 161, 163, 164, 173, 174, 177, 178,
    186, 190, 193, 196, 197, 198, 199, 702,
    716, 750, 761, 763, 774, 777, 790, 797,
    799
  ];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

let numberPlateImage;

function clearParent() {
    var parent = document.querySelector('.panelForSelect');
    parent.innerHTML = '';
}

function addSelect(array, index) {
  var parent = document.querySelector('.panelForSelect');
  var select = document.createElement('select');
  select.className = 'custom-select custom-select_' + index;

  array.forEach(function(option) {
      var optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;
      select.appendChild(optionElement);
  });

  parent.appendChild(select);
}

function checkCanvas(canvas, ctx) {
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;

  var isEmpty = true;
  for (var i = 0; i < data.length; i += 4) {
    if (data[i + 3] !== 0) {
      // Проверка альфа-канала (прозрачность)
      isEmpty = false;
      break;
    }
  }

  if (!isEmpty) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function loadImg() {
  const sel = document.getElementById("country-select").value;
  const canvas = document.getElementById("olp");
  const butt = document.getElementsByClassName('bttn');
  const ctx = canvas.getContext("2d");

  clearParent();

  if (sel === "") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  if (sel === "bel") {
    checkCanvas(canvas, ctx);

    addSelect(numbers, 0);
    addSelect(numbers, 1);
    addSelect(numbers, 2);
    addSelect(numbers, 3);
    addSelect(lettersBel, 4);
    addSelect(lettersBel, 5);
    addSelect(regBel, 6);

    loadImage(filePathB, canvas, ctx);
  }

  if (sel === "rus") {
    checkCanvas(canvas, ctx);

    addSelect(lettersRus, 0);
    addSelect(numbers, 1);
    addSelect(numbers, 2);
    addSelect(numbers, 3);
    addSelect(lettersRus, 4);
    addSelect(lettersRus, 5);
    addSelect(regRus, 6);

    loadImage(filePathR, canvas, ctx);
  }

  if (sel === "kaz") {
    checkCanvas(canvas, ctx);

    addSelect(numbers, 0);
    addSelect(numbers, 1);
    addSelect(numbers, 2);
    addSelect(lettersKaz, 3);
    addSelect(lettersKaz, 4);
    addSelect(lettersKaz, 5);
    addSelect(regKaz, 6);
    
    loadImage(filePathK, canvas, ctx);
  }
}

function updateForm() {
  const sel = document.getElementById("country-select").value;
    const canvas = document.getElementById("olp");
    const ctx = canvas.getContext("2d");

    if (numberPlateImage) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистите весь canvas
        ctx.drawImage(numberPlateImage, 0, 0, canvas.width, canvas.height); // Перерисуйте фон
    }

    if (sel === "bel") {
        const num1 = document.getElementsByClassName('custom-select custom-select_0')[0].value;
        const num2 = document.getElementsByClassName('custom-select custom-select_1')[0].value;
        const num3 = document.getElementsByClassName('custom-select custom-select_2')[0].value;
        const num4 = document.getElementsByClassName('custom-select custom-select_3')[0].value;

        if (num1 === '0' && num2 === '0' && num3 === '0' && num4 === '0') {
          alert('Если вначале идут 000, то 4-е число не может быть 0. Замените 4-е число');
          return;
        }

        const let1 = document.getElementsByClassName('custom-select custom-select_4')[0].value;
        const let2 = document.getElementsByClassName('custom-select custom-select_5')[0].value;
        const reg = document.getElementsByClassName('custom-select custom-select_6')[0].value;

        const startPosNum = 45;
        const numSpace = 29;
        const spaceBtwNumLet = 10;
        const letSpace = 35;
        const yPos = 128;
        const fontSize = 110;
        const scaleY = 5.4;
        const scaleX = 14.5;
        const scaleYLet = 5;
        const scaleXLet = 13;
        const yPosL = 124;

        addTextToImage(ctx, num1.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize, "black", startPosNum, yPos, scaleY, scaleX);
        addTextToImage(ctx, num2.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize, "black", startPosNum + numSpace, yPos, scaleY, scaleX);
        addTextToImage(ctx, num3.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize, "black", startPosNum + numSpace * 2, yPos, scaleY, scaleX);
        addTextToImage(ctx, num4.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize, "black", startPosNum + numSpace * 3, yPos, scaleY, scaleX);

        addTextToImage(ctx, let1.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize, "black", startPosNum + numSpace * 4 + spaceBtwNumLet, yPosL, scaleYLet, scaleXLet);
        addTextToImage(ctx, let2.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize, "black", startPosNum + numSpace * 4 + spaceBtwNumLet + letSpace, yPosL, scaleYLet, scaleXLet);

        addTextToImage(ctx, "-", "Fonts/altedin1451mittelschrift.ttf", fontSize, "black", startPosNum + numSpace * 4 + spaceBtwNumLet + letSpace + 38, 115, 4.5, scaleX)

        addTextToImage(ctx, reg.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize, "black", startPosNum + numSpace * 4 + spaceBtwNumLet + letSpace * 2 + spaceBtwNumLet + 10, yPos, scaleY, scaleX);
        return;
    }
    if (sel === "rus") {
      const let1 = document.getElementsByClassName('custom-select custom-select_0')[0].value;
      const num1 = document.getElementsByClassName('custom-select custom-select_1')[0].value;
      const num2 = document.getElementsByClassName('custom-select custom-select_2')[0].value;
      const num3 = document.getElementsByClassName('custom-select custom-select_3')[0].value;

      if (num1 === '0' && num2 === '0' && num3 === '0') {
        alert('Если вначале идут 00, то 3-е число не может быть 0. Замените 3-е число');
        return;
      }

      const let2 = document.getElementsByClassName('custom-select custom-select_4')[0].value;
      const let3 = document.getElementsByClassName('custom-select custom-select_5')[0].value;
      const reg = document.getElementsByClassName('custom-select custom-select_6')[0].value;

      const startPosNum = 12;
      const numSpace = 39.8;
      const spaceBtwNumLet = 10;
      const letSpace = 35;
      const yPos = 128;
      const fontSize = 100;
      const scaleY = 6.4;
      const scaleX = 14.5;
      const scaleYLet = 4.5;
      const scaleXLet = 11;
      const yPosL = 124;

      addTextToImage(ctx, let1.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize - 20, "black", startPosNum + 3, yPos, scaleYLet, scaleXLet);
      
      addTextToImage(ctx, num1.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize, "black", startPosNum + numSpace - 5, yPos, scaleY, scaleX);
      addTextToImage(ctx, num2.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize, "black", startPosNum + numSpace * 1.8 - 5, yPos, scaleY, scaleX);
      addTextToImage(ctx, num3.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize, "black", startPosNum + numSpace * 2.6 - 5, yPos, scaleY, scaleX);

      addTextToImage(ctx, let2.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize - 20, "black", startPosNum + numSpace * 3.3 - 5 + spaceBtwNumLet, yPosL, scaleYLet, scaleXLet);
      addTextToImage(ctx, let3.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize - 20, "black", startPosNum + numSpace * 3.3 - 5 + spaceBtwNumLet + letSpace, yPosL, scaleYLet, scaleXLet);

      addTextToImage(ctx, reg.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize, "black", startPosNum + numSpace * 4 + spaceBtwNumLet + letSpace * 1.4, 92, 3.5, 9);
      return;
  }
  if (sel === "kaz") {
    const num1 = document.getElementsByClassName('custom-select custom-select_0')[0].value;
    const num2 = document.getElementsByClassName('custom-select custom-select_1')[0].value;
    const num3 = document.getElementsByClassName('custom-select custom-select_2')[0].value;

    if (num1 === '0' && num2 === '0' && num3 === '0') {
      alert('Если вначале идут 00, то 3-е число не может быть 0. Замените 3-е число');
      return;
    }

    const let1 = document.getElementsByClassName('custom-select custom-select_3')[0].value;
    const let2 = document.getElementsByClassName('custom-select custom-select_4')[0].value;
    const let3 = document.getElementsByClassName('custom-select custom-select_5')[0].value;
    const reg = document.getElementsByClassName('custom-select custom-select_6')[0].value;

    const startPosNum = 45;
    const numSpace = 29;
    const spaceBtwNumLet = 0;
    const letSpace = 32;
    const yPos = 128;
    const fontSize = 110;
    const scaleY = 5.4;
    const scaleX = 14.5;
    const scaleYLet = 3.3;
    const scaleXLet = 11;
    const yPosL = 130;

    addTextToImage(ctx, num1.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize, "black", startPosNum, yPos, scaleY, scaleX);
    addTextToImage(ctx, num2.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize, "black", startPosNum + numSpace, yPos, scaleY, scaleX);
    addTextToImage(ctx, num3.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize, "black", startPosNum + numSpace * 2, yPos, scaleY, scaleX);
    
    addTextToImage(ctx, let1.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize, "black", startPosNum + numSpace * 3 + spaceBtwNumLet, yPosL, scaleYLet, scaleXLet);
    addTextToImage(ctx, let2.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize, "black", startPosNum + numSpace * 3 + spaceBtwNumLet + letSpace, yPosL, scaleYLet, scaleXLet);
    addTextToImage(ctx, let3.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize, "black", startPosNum + numSpace * 3 + spaceBtwNumLet + letSpace * 2, yPosL, scaleYLet, scaleXLet);

    addTextToImage(ctx, reg.toString(), "Fonts/altedin1451mittelschrift.ttf", fontSize, "black", startPosNum + numSpace * 4 + spaceBtwNumLet + letSpace * 2 + spaceBtwNumLet + 8, yPos, scaleY, scaleX);
    return;
}
}

function loadImage(src, canvas, ctx) {
    const image = new Image();
    image.onload = function() {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        numberPlateImage = image; // Сохраните изображение
    };
    image.src = src;
}

function drawImage(img, canvas, ctx) {
  if (!canvas) {
    console.error("Canvas element not found: canvas_" + index);
    return;
  }

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
}

function addTextToImage(ctx, text, font, size, color, x, y, scaleX, scaleY) {
  ctx.save(); // Сохранить состояние контекста
  ctx.font = `${size}px ${font}`;
  ctx.fillStyle = color;
  ctx.translate(x, y); // Перемещаем контекст в нужную позицию
  ctx.scale(scaleX, scaleY); // Масштабируем по горизонтали и вертикали
  ctx.fillText(text, 0, 0); // Рисуем текст

  /* // Если у вас есть промежутки между буквами
  if (letterSpacing) {
      let currentX = 0;
      for (let i = 0; i < text.length; i++) {
          ctx.fillText(text[i], currentX, 0);
          currentX += ctx.measureText(text[i]).width + letterSpacing;
      }
  } else {
      ctx.fillText(text, 0, 0);
  } */

  ctx.restore(); // Восстановить состояние контекста
}


function GenerateLetter() {
  const letters = ["A", "B", "C", "E", "H", "K", "P", "M", "Y", "O", "T", "X"];
  return letters[Math.floor(Math.random() * letters.length)];
}

function GenarateNum() {
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
