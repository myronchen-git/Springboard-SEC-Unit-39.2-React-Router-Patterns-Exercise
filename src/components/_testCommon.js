const colors = {
  blue: '#0000FF',
  green: '#008000',
  red: '#FF0000',
};

function hexToRgb(hex) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  return `rgb(${r}, ${g}, ${b})`;
}

// ==================================================

export { colors, hexToRgb };
