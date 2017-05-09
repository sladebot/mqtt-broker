function ascii (a) { return a.charCodeAt(0); }

export function getASCIIofString(string) {
  return string.split("").map(ascii).reduce((a, b) => a + b, 0)
}