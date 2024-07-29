export const convertColorFormat = (color) => {
  if (color.startsWith('rgb')) {
    const content = color.slice(color.indexOf('(') + 1, color.indexOf(')'));
    const values = content.split(',').map((value) => value.trim());

    const [r, g, b, a] = values;

    if (values.length === 4) {
      return `rgb(${r} ${g} ${b} / ${a})`;
    }
    return `rgb(${r} ${g} ${b})`;
  }

  return color;
};

export const formatRgba = (rgba) => {
  if (rgba.a === 1) {
    return `rgb(${Math.trunc(rgba.r)}, ${Math.trunc(rgba.g)}, ${Math.trunc(rgba.b)})`;
  }
  return `rgba(${Math.trunc(rgba.r)}, ${Math.trunc(rgba.g)}, ${Math.trunc(rgba.b)}, ${Math.trunc(rgba.a)})`;
};

export const cleanFontFamily = (fontFamily) =>
  fontFamily.split(',')[0].replace(/['"]/g, '').trim();

export const camelToKebabCase = (string) => {
  let result = '';
  for (let i = 0; i < string.length; i += 1) {
    const char = string[i];
    if (char === char.toUpperCase()) {
      result += `-${char.toLowerCase()}`;
    } else {
      result += char;
    }
  }
  return result;
};

export const getNumericValue = (inputValue) => {
  const parsed = parseFloat(inputValue);
  return Number.isNaN(parsed) ? 0 : parsed;
};

export const getUnit = (inputValue) => {
  let unit = '';
  for (let i = inputValue.length - 1; i >= 0; i -= 1) {
    const char = inputValue[i];
    if (Number.isNaN(Number(char)) && char !== ' ') {
      unit = char + unit;
    } else {
      break;
    }
  }
  return unit || 'px';
};
