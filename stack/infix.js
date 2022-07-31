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
    if (['+', '-'].includes(operation)) 
        return 1;

    if (['*', '/'].includes(operation)) 
        return 2;

    if (isExpressionOpening(operation) || isExpressionClosing(operation)) 
        return 3;

    return -1;
}

function hasHigherPrecedence(operatorInStack, operatorInLoop) {
    const loopWeight = getOperationWeight(operatorInLoop);
    const inStackWeight = getOperationWeight(operatorInStack);
    return loopWeight < inStackWeight; 
}

function isExpressionOpening(char) {
    return ['(', '[', '{'].includes(char);
}

function isExpressionClosing(char) {
    return [')', ']', '}'].includes(char);
}

function getItemsToBeProcessed(expression, separator) {
    return expression
        .replace(/\(/g, '( ')
        .replace(/\)/g, ' )')
        .replace(/\[/g, '[ ')
        .replace(/\]/g, ' ]')
        .replace(/\{/g, '{ ')
        .replace(/\}/g, ' }')
        .trim()
        .split(separator);
}

function convertInfixToPostfix(expression, separator = ' ') {
    const itemsToBeProcessed = getItemsToBeProcessed(expression, separator);
    const operatorsStack = [];
    const postfix = [];

    function addPostfix(value) {
        if (isExpressionOpening(value)) return;
        postfix.push(value);
    }

    for (let index = 0; index < itemsToBeProcessed.length; index++) {
        const item = itemsToBeProcessed[index];
        const isOpening = isExpressionOpening(item);
        const isClosing = isExpressionClosing(item);
        const isOperator = VALID_OPERATIONS.test(item);

        if (isOperator) {
            while (
                operatorsStack.length && 
                !isOpening &&
                hasHigherPrecedence(operatorsStack[operatorsStack.length - 1], item)
            ) {
                const operation = operatorsStack.pop();
                addPostfix(operation);
            }
            operatorsStack.push(item);
        } else if (isClosing) {
            while (
                operatorsStack.length &&
                isClosing
            ) {
                const operation = operatorsStack.pop();
                addPostfix(operation);
            }
            // Remove opening
            operatorsStack.pop(); 
        } else {
            addPostfix(item); 
        }
    }

    while (operatorsStack.length) {
        const operation = operatorsStack.pop();
        addPostfix(operation);
    }

    return postfix.join(' ');
}

[
    'a + b + c',
    'a + b * c',
    '(a + b) * c',
    '[(a + b) * c] + d',
].forEach(exp => console.log(`
    INFIX = ${exp}
    POSTFIX = ${convertInfixToPostfix(exp)}
`));