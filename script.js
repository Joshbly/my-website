let t = 0; // time variable
let amplitude = 0; // amplitude variable
let currentColor, nextColor;
let buffer;
let textLayer;
let colors = ['#FF0000', '#000080', '#FFD700', '#FFA500', '#008000', '#800080']; // Array of specific colors
let colorIndex = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  buffer = createGraphics(windowWidth, windowHeight);
  textLayer = createGraphics(windowWidth, windowHeight);
  colorMode(RGB);
  currentColor = color(colors[colorIndex % colors.length]);
  nextColor = color(colors[(colorIndex + 1) % colors.length]);
  textLayer.fill(255);
  textLayer.textStyle(BOLD);
  textLayer.textFont('UnifrakturCook');
  resizeElements();
}
function draw() {
  let lerpAmt = (sin(t) + 1) / 2;
  let gradientColor = lerpColor(currentColor, nextColor, lerpAmt);
  background(gradientColor);
  updateColorIndex(lerpAmt);
  drawSineWave();
  drawText();
  blendMode(DIFFERENCE);
  image(textLayer, 0, 0);
  blendMode(BLEND);
  t += 0.015;
}
function updateColorIndex(lerpAmt) {
  if (lerpAmt > 0.99) {
    colorIndex++;
    currentColor = color(colors[colorIndex % colors.length]);
    nextColor = color(colors[(colorIndex + 1) % colors.length]);
  }
}
function drawSineWave() {
  buffer.beginShape();
  let startX = -width * 0.05; // Start 5% to the left of the viewport
  let endX = width * 1.05; // End 5% to the right of the viewport
  for (let x = startX; x < endX; x++) {
    amplitude = lerp(amplitude, map(mouseY, 0, height, 0, height/2), 0.00007);
    let y = height/2 + sin(t + x/(100 * (windowWidth/800))) * amplitude;
    buffer.vertex(x, y);
  }
  buffer.endShape();
  image(buffer, 0, 30);
}
function drawText() {
  textLayer.fill(0, 190);
  textLayer.rect(0, 0, textLayer.width, textLayer.height);
  let s = "The End is Never The End is Never The End is Never";
  let textWidth = s.length * 17.3;
  textLayer.fill(255);
  for (let i = 0; i < 5; i++) {
    let tx = (i * (textWidth + 50)) - (t * 100 % (textWidth + 50));
    for (let j = 0; j < s.length; j++) {
      let letterX = tx + j * 18;
      let letterY = height/2 + sin(t + letterX/(100 * (windowWidth/800))) * amplitude - 10;
      drawLetter(s[j], letterX, letterY);
    }
  }
}
function drawLetter(letter, x, y) {
  if (random(1) < 0.25) {
    let glitchAmt = random(-2.5, 2.5);
    textLayer.fill(random(255), random(255), random(255));
    textLayer.text(letter, x + glitchAmt, y + glitchAmt);
  } else {
    textLayer.text(letter, x, y);
  }
}
function mouseClicked() {
  t += 10;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  buffer.resizeCanvas(windowWidth, windowHeight);
  textLayer.resizeCanvas(windowWidth, windowHeight);
  resizeElements();
}
function resizeElements() {
  let scale = log(windowWidth / 800 + 1) / log(3);
  scale = constrain(scale, 0.5, 1);
  textLayer.textSize(36 * scale);
}
