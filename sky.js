
async function main() {
  const colors = generateColorRange('#00008B', '#D5FFFF', 22);
  for (let j = 1; j < colors.length; j++) {    
    console.log(colors[j]);
    document.body.style.backgroundColor = colors[j];
    await pause(500);
  }
}

function pause (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
