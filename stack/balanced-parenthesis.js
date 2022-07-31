/**
 * Checks if a given expression is correctly balanced considering (), [], {}
 * 
 * Examples:
 *      (a + b)                 => BALANCED
 *      [(a + b)] + c           => BALANCED
 *      {[a + b] + (c + d) + e} => BALANCED
 *      )(                      => NOT BALANCED
 *      [(])                    => NOT BALANCED
 */
const OPEN_SYMBOLS = /\(|\[|\{/;
const CLOSE_SYMBOLS = /\)|\]|\}/;
const PARALLELS = {
    '(': ')',
    '[': ']',
    '{': '}',
};

const checkBalancedExpression = (expression) => {
    const stack = [];

    for (let index = 0; index <= expression.length; index++) {
        const char = expression[index];

        if (OPEN_SYMBOLS.test(char)) {
            stack.push(char);
            continue;
        }

        if (CLOSE_SYMBOLS.test(char)) {
            const lastOnStack = stack[stack.length - 1];

            if (char !== PARALLELS[lastOnStack]) {
                const stackLabel = stack.length ? stack : 'Empty';
                console.log(`"${expression}" is UNBALLANCED. Stack "${stackLabel}", Char "${char}" at ${index}`);
                return;
            }

            stack.pop();
        }
    }

    if (stack.length) {
        console.log(`"${expression}" is UNBALLANCED. There are pending items on the stack after expression were fully evaluated "${stack}"`);
        return;
    }

    console.log(`"${expression}" is BALLANCED ${stack}`);
}

// Tests
[
    '(a + b)',
    '[(a + b)] + c',
    '{[a + b] + (c + d) + e}',
    ')(',
    '()',
    '[(])',
    ')',
    '[]()[]((((())))',
    '[]()[]((((()))))',
].forEach(checkBalancedExpression);