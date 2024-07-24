export function convertColorFormat(color) {
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
}

export function cleanFontFamily(fontFamily) {
  return fontFamily.split(',')[0].replace(/['"]/g, '').trim();
}

export function toFixedTwo(value) {
  const numericValue = parseFloat(value);

  return Number.isNaN(numericValue) ? value : `${numericValue.toFixed(2)}px`;
}

export function camelToKebabCase(string) {
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
}
