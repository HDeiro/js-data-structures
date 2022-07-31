/**
 * Prefix is used for expression evaluation using a strategy of
 * <operator> <operand> <operand>.
 * 
 * This is also known as "Polish Notation"
 * 
 * Examples:
 *  INFIX     | PREFIX    | DESCRIPTION
 *  --------- | --------- | ----------------------------------------------------
 *  2 + 3     | + 2 3     | 2 and 3 are operands while + is the operator
 *  A / B     | / A B     | A and B are operands while / is the operator
 *  A + B * C | + A * B C | A, B & C are operands while +, * are the operators
 * 
 * Example:
 *      2 * 3 + 5 * 4 - 9               (= 17)
 *      {(2 * 3) + (5 * 4)} - 9
 *      {(* 2 3) + (* 5 4)} - 9
 *      {+ (* 2 3) (* 5 4)} - 9
 *      - { + (* 2 3) (* 5 4)} 9
 *      - + * 2 3 * 5 4 9               (= 17)
 */

const VALID_OPERATIONS = /\+|\-|\/|\*/;

const executeOperation = (operation, operator1, operator2) => {
    if (operation === '+') 
        return operator1 + operator2;
    if (operation === '-') 
        return operator1 - operator2;
    if (operation === '*') 
        return operator1 * operator2;
    if (operation === '/') 
        return operator1 / operator2;
}

function evalNumericItem (item, variables) {
    if (!variables) throw Error('You need to provide variables');

    let numericItem = Number(item);

    // May be a variable or just wrong
    if (isNaN(numericItem)) {
        const variableValue = variables[item];

        if (!variableValue)
            throw Error(`Key ${item} doesn't exists on variables ${variables}`);
        
        numericItem = variableValue;
    }

    return numericItem;
}

function executePrefix (expression, variables = {}, separator = ' ') {
    const itemsToBeProcessed = expression.trim().split(separator);
    const stack = [];
    const startingIndex = itemsToBeProcessed.length - 1; // Read from right to left

    for (let index = startingIndex; index >= 0; index--) {
        const item = itemsToBeProcessed[index];
        
        if (VALID_OPERATIONS.exec(item)) {
            const operator1 = stack.pop();
            const operator2 = stack.pop();
            const result = executeOperation(item, operator1, operator2);
            stack.push(result);
            continue;
        }

        const numericItem = evalNumericItem(item, variables);
        stack.push(numericItem);
    }

    if (stack.length !== 1) {
        console.log(`ERROR! Stack "${stack}"`);
        return;
    }

    const result = stack.pop();
    return result;
}

console.log(executePrefix('- + * 2 3 * 5 4 9'));
console.log(executePrefix('+ * - + 2 2 5 3 N', {N: 6}));