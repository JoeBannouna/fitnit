function arraySwap(arr: any[], index1: any, index2: any) {
  const b = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = b;
}

function getTranslateY(myElement: HTMLElement) {
  var style = window.getComputedStyle(myElement);
  var matrix = new WebKitCSSMatrix(style.transform);
  return matrix.m42;
}

export { arraySwap, getTranslateY };
