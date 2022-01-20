function arrayMove(arr: any[], old_index: any, new_index: any) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  // return arr; // for testing
}

function getTranslateY(myElement: HTMLElement) {
  var style = window.getComputedStyle(myElement);
  var matrix = new WebKitCSSMatrix(style.transform);
  return matrix.m42;
}

function addMultipleClasses(element: HTMLElement, classesArr: string[]) {
  classesArr.forEach(className => element.classList.add(className));
}

function removeMultipleClasses(element: HTMLElement, classesArr: string[]) {
  classesArr.forEach(className => element.classList.remove(className));
}

export { arrayMove, getTranslateY, addMultipleClasses, removeMultipleClasses };
