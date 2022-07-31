/**
 * Infix is used for expression evaluation using a strategy of
 * <operand> <operator> <operand>
 * 
 * Examples:
 *  INFIX  | DESCRIPTION
 *  -------| ---------------------------------------------
 *  2 + 3  | 2 and 3 are operands while + is the operator
 *  A / B  | A and B are operands while / is the operator
 */

const VALID_OPERATIONS = /\+|\-|\/|\*/;

function getOperationWeight(operation) {
    if (['+', '-'].includes(operation)) return 1;
    if (['*', '/'].includes(operation)) return 2;
    return -1;
}

function hasHigherPrecedence(operatorInStack, operatorInLoop) {
    const loopWeight = getOperationWeight(operatorInLoop);
    const inStackWeight = getOperationWeight(operatorInStack);
    return loopWeight < inStackWeight; 
}

function convertInfixToPostfix(expression, separator = ' ') {
    const itemsToBeProcessed = expression.trim().split(separator);
    const operatorsStack = [];
    const postfix = [];

    for (let index = 0; index < itemsToBeProcessed.length; index++) {
        const item = itemsToBeProcessed[index];

        // It's an operand
        if (!VALID_OPERATIONS.test(item)) {
            postfix.push(item); 
            continue;
        }
        
        // It's an Operator
        while (
            operatorsStack.length && 
            hasHigherPrecedence(operatorsStack[operatorsStack.length - 1], item)
        ) {
            const operation = operatorsStack.pop();
            postfix.push(operation);
        }

        operatorsStack.push(item); 
    }

    while (operatorsStack.length) {
        const operation = operatorsStack.pop();
        postfix.push(operation);
    }

    return postfix.join(' ');
}


console.log(convertInfixToPostfix('a + b * c + d * e'))