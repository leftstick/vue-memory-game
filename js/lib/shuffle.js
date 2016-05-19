
export const shuffle = function(arr) {
    var newArr = arr.slice();
    for (let i = newArr.length; i; i -= 1) {
        let j = Math.floor(Math.random() * i);
        let x = newArr[i - 1];
        newArr[i - 1] = newArr[j];
        newArr[j] = x;
    }
    return newArr;
};
