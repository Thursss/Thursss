/**
 * 判断是否 十六进制颜色值.
 * 输入形式可为 #ffff0000 #ffff00 #ff00 #ff0
 *
 * @param   String  color   十六进制颜色值
 * @return  Boolean
 */
function isHexColor(color) {
  const reg = /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
  return reg.test(color);
}

/**
 * 判断是否 RGB颜色值.
 * 输入形式可为 RGB(123 1 1) RGB(123, 1, 1) egb(123 1 1) egb(123, 1, 1) RGBA(123 1 1 / 1) RGBA(123, 1, 1, 1) rgba(123 1 1 / 1) rgba(123, 1, 1, 1)
 *
 * @param   String  color   RGB颜色值
 * @return  Boolean
 */
function isRGBColor(color) {
  const regRGB1 =
    /^(rgb|RGB)\((\s*(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])\s*,\s*){2}\s*(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])\s*\)$/;
  const regRGB2 =
    /^(rgb|RGB)\((\s*(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])\s+){2}\s*(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])\s*\)$/;

  const regRGBA1 =
    /^(rgba|RGBA)\((\s*(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])\s*,\s*){3}\s*(0?\.\d+|1|0)\s*\)$/;
  const regRGBA2 =
    /^(rgba|RGBA)\((\s*(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])\s+){2}(\s*(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])\s*)\s*(\/\s*)(0?\.\d+|1|0)\s*\)$/;
  return (
    regRGB1.test(color) ||
    regRGB2.test(color) ||
    regRGBA1.test(color) ||
    regRGBA2.test(color)
  );
}

/**
 * 判断是否 颜色值.
 * 输入形式可为 #ffff0000 #ffff00 #ff00 #ff0 RGB(123 1 1) RGB(123, 1, 1) egb(123 1 1) egb(123, 1, 1) RGBA(123 1 1 / 1) RGBA(123, 1, 1, 1) rgba(123 1 1 / 1) rgba(123, 1, 1, 1)
 *
 * @param   String  color   RGB颜色值
 * @return  Boolean
 */

function isColor(color) {
  return isHexColor(color) || isRGBColor(color);
}

function hexToRGB(hex) {
  if (!isHexColor(hex)) throw hex + " 不是一个hex值";
  let sHex = hex.toLowerCase().slice(1);
  let sRGBArr = [];
  if (sHex.length === 3)
    sRGBArr = [sHex[0] + sHex[0], sHex[1] + sHex[1], sHex[2] + sHex[2], "ff"];
  if (sHex.length === 4)
    sRGBArr = [
      sHex[0] + sHex[0],
      sHex[1] + sHex[1],
      sHex[2] + sHex[2],
      sHex[3] + sHex[3],
    ];
  if (sHex.length === 6)
    sRGBArr = [sHex[0] + sHex[1], sHex[2] + sHex[3], sHex[4] + sHex[5], "ff"];
  if (sHex.length === 8)
    sRGBArr = [
      sHex[0] + sHex[1],
      sHex[2] + sHex[3],
      sHex[4] + sHex[5],
      sHex[6] + sHex[7],
    ];
  const sA = sRGBArr.pop();
  return `rgba(${sRGBArr.map((c) => parseInt(c, 16)).join(", ")}, ${(
    parseInt(sA, 16) / 255
  ).toFixed(4)})`;
}
