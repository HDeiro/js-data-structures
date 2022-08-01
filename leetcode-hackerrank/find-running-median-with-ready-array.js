function findMedianInArray(array) {
    if (!array) 
        throw Error(`You must provide a valid array to find it's median`);

    const { length } = array;
    const middle = Math.floor(length/2);
    const output = length % 2 !== 0
        ? array[middle] // Odd length === One middle element
        : (array[middle] + array[middle - 1]) / 2; // Even length === Two middle elements (so, median is the avg of them)

    // Must return a double-precision number
    return output;
}

function main() {
    const medianArray = [];
    const elements = [];

    let arr = [12, 4, 5, 3, 8, 7];
    arr.forEach(input => {
        elements.push(input);
        elements.sort((a, b) => a - b);
        // Find and unshift median
        const median = findMedianInArray(elements);
        medianArray.push(median);
    });    

    console.log(medianArray);
}

main();