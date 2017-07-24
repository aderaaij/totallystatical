module.exports = function repeatString(pattern, number) {
    let string = '';
    while (number > 0) {
        number--;
        string += pattern;
    }
    return string;
};
