export function qualityNumberToString(quality: number): string {
  let str = "";
  if (quality === 75) {
    str = "printer";
  } else if (quality === 50) {
    str = "ebook";
  } else {
    str = "screen";
  }
  return str;
}
