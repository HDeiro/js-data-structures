/**
 * Postfix is used for expression evaluation using a strategy of
 * <operand> <operand> <operator>.
 * 
 * This is also known as "Reverse Polish Notation".
 * 
 * It was created by computer scientists because it's simpler and easier to process
 * expressions using the Postfix notation.
 * 
 * Examples:
 *  INFIX     | PREFIX    | POSTFIX   | DESCRIPTION
 *  --------- | --------- | --------- | ----------------------------------------------------
 *  2 + 3     | + 2 3     | 2 3 +     | 2 and 3 are operands while + is the operator
 *  A / B     | / A B     | A B /     | A and B are operands while / is the operator
 *  A + B * C | + A * B C | A B C * + | A, B & C are operands while +, * are the operators
 *
 * Conversion process manually
 *
 *      A * B + C * D - E
 *      {(A * B) + (C * D)} - E
 *      {(A B *) + (C D *)} - E
 *      {(A B *)(C D *) +} - E
 *      {(A B *)(C D *) +} E -
 *      A B * C D * + E -
 * 
 * Applying when:
 *      > A = 2
 *      > B = 3
 *      > C = 5
 *      > D = 4
 *      > E = 9
 *      
 *      A B * C D * + E -
 *      2 3 * 5 4 * + 9 -
 *      {(2 3 *) (5 4 *) +} 9 -
 *      {6 (5 4 *) +} 9 -
 *      {6 20 +} 9 -
 *      26 9 -
 *      17
 *      
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

function executePostfix (expression, variables = {}, separator = ' ') {
    const itemsToBeProcessed = expression.trim().split(separator);
    const stack = [];
    
    for (let index = 0; index < itemsToBeProcessed.length; index++) {
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

    return stack[0];
}

console.log(executePostfix('N 2 3 2 + - *', {N: 3}));