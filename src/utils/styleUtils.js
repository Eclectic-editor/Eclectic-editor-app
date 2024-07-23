/* eslint-disable no-unused-vars */

function getComputedStyleProperties(computedStyle) {
  return {
    fontFamily: computedStyle.fontFamily,
    color: computedStyle.color,
    fontSize: computedStyle.fontSize,
    lineHeight: computedStyle.lineHeight,
    fontWeight: computedStyle.fontWeight,
    fontStyle: computedStyle.fontStyle,
    fontVariant: computedStyle.fontVariant,
    textDecoration: computedStyle.textDecoration,
    textAlign: computedStyle.textAlign,
    textIndent: computedStyle.textIndent,
    textTransform: computedStyle.textTransform,
    wordSpacing: computedStyle.wordSpacing,
    letterSpacing: computedStyle.letterSpacing,
    wordWrap: computedStyle.wordWrap,
    whiteSpace: computedStyle.whiteSpace,
    verticalAlign: computedStyle.verticalAlign,
    border: computedStyle.border,
    backgroundColor: computedStyle.backgroundColor,
  };
}