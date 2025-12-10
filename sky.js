//window.onload = main();

async function main() {
  //alert("Hello World!");
  var bg_from = generateRandomBlueHex();
  var bg_to = generateRandomBlueHex();
  const colors = generateColorRange(bg_from, bg_to, 22);
  document.body.style.backgroundColor = colors[0];
  for (let j = 1; j < colors.length; j++) {    
    console.log(colors[j]);
    document.body.style.backgroundColor = colors[j];
    await pause(2500);
  }
}

function pause (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateRandomBlueHex() {
  // Generate a random value for the blue component (e.g., between 128 and 255 for a more noticeable blue)
  const blue = Math.floor(Math.random() * 128) + 128; // Ensures a dominant blue
  
  // Keep red and green components low for a blueish hue
  const red = Math.floor(Math.random() * 64); // Max value of 63
  const green = Math.floor(Math.random() * 64); // Max value of 63

  // Convert RGB values to hex and pad with leading zeros if necessary
  const rHex = red.toString(16).padStart(2, '0');
  const gHex = green.toString(16).padStart(2, '0');
  const bHex = blue.toString(16).padStart(2, '0');

  return `#${rHex}${gHex}${bHex}`;
}

function generateColorRange(startHex, endHex, steps) {
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const rgbToHex = (r, g, b) => {
    const toHex = (c) => {
      const hex = Math.round(c).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const startRgb = hexToRgb(startHex);
  const endRgb = hexToRgb(endHex);
  const colorRange = [];

  for (let i = 0; i < steps; i++) {
    const ratio = i / (steps - 1);
    const r = startRgb.r + (endRgb.r - startRgb.r) * ratio;
    const g = startRgb.g + (endRgb.g - startRgb.g) * ratio;
    const b = startRgb.b + (endRgb.b - startRgb.b) * ratio;
    colorRange.push(rgbToHex(r, g, b));
  }

  return colorRange;
}
