function arrayMove(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    // return arr; // for testing
}
function getTranslateY(myElement) {
    var style = window.getComputedStyle(myElement);
    var matrix = new WebKitCSSMatrix(style.transform);
    return matrix.m42;
}
function addMultipleClasses(element, classesArr) {
    classesArr.forEach(function (className) { return element.classList.add(className); });
}
function removeMultipleClasses(element, classesArr) {
    classesArr.forEach(function (className) { return element.classList.remove(className); });
}
function verifyUserInput(value, max, canBeNothing) {
    if (canBeNothing === void 0) { canBeNothing = false; }
    var string = typeof value == 'string' && value.length <= max && (canBeNothing || value.trim().length > 0);
    var number = typeof value == 'number' && value <= max && (canBeNothing ? value >= 0 : value > 0);
    return string || number;
}
export { arrayMove, getTranslateY, addMultipleClasses, removeMultipleClasses, verifyUserInput };
