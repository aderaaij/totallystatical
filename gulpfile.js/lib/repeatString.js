const repeatString = (pattern, number) => {
    let string = '';
    while (number > 0) {
        number--;
        string += pattern;
    }
    return string;
};

module.exports = repeatString;
