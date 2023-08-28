// const hex = 'c50611';

const hexToHSB = (hexCode) => {
  // For the purpose of this, if the user uses absolte black we're going to treat it as 100% saturated, as we're 
  // utilizing the difference between a midpoint and the lower right side of the color picker
  if (hexCode === "#000000") return [0, 100, 0];
  
  let r = parseInt(hexCode.slice(1, 3), 16); // Grab the hex representation of red (chars 1-2) and convert to decimal (base 10).
  let g = parseInt(hexCode.slice(3, 5), 16);
  let b = parseInt(hexCode.slice(5, 7), 16);

  // console.log('hexCode', hexCode);
  // console.log('r:', r);
  // console.log('g:', g);
  // console.log('b:', b);

  r /= 255;
  g /= 255;
  b /= 255;

  const v = Math.max(r, g, b);
  const n = v - Math.min(r, g, b);
  const h =
    n === 0
      ? 0
      : n && v === r
      ? (g - b) / n
      : v === g
      ? 2 + (b - r) / n
      : 4 + (r - g) / n;

  const hue = Math.round(60 * (h < 0 ? h + 6 : h));
  const sat = v && (n / v) * 100;
  const bri = v * 100;

  // console.log("hue, sat, bri", [hue, sat, bri]);

  return [hue, sat, bri];
};

// console.log(hexToHSB(hex));

const threeHSBs = (hex1, hex2, hex3) => {
  return [hexToHSB(hex1), hexToHSB(hex2), hexToHSB(hex3)];
};

const HSBToSetOfNine = (HSBArray) => {
  const result = [];
  // console.log("HSBArray", HSBArray);
  const lightSat = HSBArray[0][1];
  const lightBri = HSBArray[0][2];

  const hue = HSBArray[1][0];
  const midSat = HSBArray[1][1];
  const midBri = HSBArray[1][2];

  const darkSat = HSBArray[2][1];
  const darkBri = HSBArray[2][2];

  const lightSatDiff = Math.abs(midSat - lightSat) / 4;
  const darkSatDiff = Math.abs(midSat - darkSat) / 4;

  // console.log("lightSat", lightSat);
  // console.log("midSat", midSat);
  // console.log("darkSat", darkSat);

  // console.log("lightSatDiff/4", lightSatDiff);
  // console.log("darkSatDiff/4", darkSatDiff);

  const lightBriDiff = Math.abs(midBri - lightBri) / 4;
  const darkBriDiff = Math.abs(midBri - darkBri) / 4;

  result.push([hue, lightSat, lightBri]);

  for (let i = 0; i < 4; i++) {
    result.push([
      hue,
      lightSatDiff + result[i][1],
      result[i][2] - lightBriDiff,
    ]);
  }

  for (let i = 4; i < 8; i++) {
    result.push([hue, darkSatDiff + result[i][1], (result[i][2] - darkBriDiff) < 0 ? 0 : result[i][2] - darkBriDiff])
    // result.push([hue, darkSatDiff + result[i][1], result[i][2] - darkBriDiff]);
  }

  // console.log("HSBToSetOfNine result:", result);
  return result;
};

// console.log(HSBToSetOfNine(threeHSBs('F1F9FA', '3AD4DF', '08464A')));

const HSBToRGB = ([h, s, b]) => {
  s /= 100;
  b /= 100;

  // console.log("s:", s);
  // console.log("b:", b);

  const k = (n) => (n + h / 60) % 6;
  const f = (n) => {
    return b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  };

  const r = Math.round(255 * f(5));
  const g = Math.round(255 * f(3));
  const bl = Math.round(255 * f(1));

  // console.log("r:", r);
  // console.log("g:", g);
  // console.log("b:", bl);

  // let rString = r.toString(16).toUpperCase();
  // let gString = g.toString(16).toUpperCase();
  // let blString = bl.toString(16).toUpperCase();

  let rString = (r >= 0 ? r : 0).toString(16).toUpperCase();
  let gString = (g >= 0 ? g : 0).toString(16).toUpperCase();
  let blString = (bl >= 0 ? bl : 0).toString(16).toUpperCase();

  if (rString.length === 1) {
    rString = "0" + rString;
  }

  if (gString.length === 1) {
    gString = "0" + gString;
  }

  if (blString.length === 1) {
    blString = "0" + blString;
  }

  // console.log("HSBToRGB result:", [rString, gString, blString]);

  return [rString, gString, blString];
};

const convertToHex = (HSBArrays) => {
  const result = [];

  for (const HSB of HSBArrays) {
    result.push("#" + HSBToRGB(HSB).join(""));
  }

  return result;
};

const threeHexesToGrid = (hex1, hex2, hex3) => {
  // console.log('conversion array', convertToHex(HSBToSetOfNine(threeHSBs(hex1, hex2, hex3))))
  return convertToHex(HSBToSetOfNine(threeHSBs(hex1, hex2, hex3)));
};

export default threeHexesToGrid;

// console.log(threeHexesToGrid('#F1F9FA', '#3AD4DF', '#08464A'));
