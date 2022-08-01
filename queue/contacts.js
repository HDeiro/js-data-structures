// Results: https://www.hackerrank.com/challenges/contacts/problem

const restrictions = {
    operations: {
        min: 1,
        max: Math.pow(10, 5)
    },
    name: {
        min: 1,
        max: 21
    },
    partial: {
        min: 1,
        max: 21
    }
};

let qtyOperations = -1;
const queue = [];

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function main() {
    console.clear();
    console.log(`What's the number of [find]|[add] commands you intend to execute?\n`);
    // Start getting inputs
    readline.prompt(true);
    readline.on('line', onUserInput);
}

function requestCommand() {
    const attemptNo = queue.length + 1;
    const labelCommand = `[${attemptNo}/${qtyOperations}] What you want to execute (find <person> or add <person>)? \n`;
    console.log(labelCommand);
}

function onUserInput(line) {    
    if (qtyOperations < 0) {
        qtyOperations = parseAndValidateQty(line);
        requestCommand();
        return;
    }

    readCommand(line);
}

function readCommand(inputCommand) {
    const [ commandType, ...commandData ] = inputCommand.split(' ');
    const command = commandType.toLowerCase();
    const data = commandData.join(' ');

    if(validateCommandAndData(command, data)) {
        // Add command to execution queue
        queue.push({ command, data });
    }

    // Executed all steps
    if (qtyOperations === queue.length) {
        executeCommands();
        readline.close();
        return;
    }

    // Request for next cycle
    requestCommand(queue.length + 1);
}

function validateCommandAndData(command, data) {
    const { length } = data;

    if (command === 'add') {
        const { min, max } = restrictions.name;

        if (isBetween(length, min, max))
            return true;

        throw Error(`Invalid command! Name size must be between ${min} & ${max} characters`);
    }

    if (command === 'find') {
        const { min, max } = restrictions.partial;

        if (isBetween(length, min, max))
            return true;
        
        throw Error(`Invalid command! Find query data size must be between ${min} & ${max} characters`);
    }

    throw Error(`Invalid commnad! Only find and add command are valid.`);
}

function isBetween(value, min, max) {
    return value >= min && value <= max;
}

function parseAndValidateQty(qty) {
    const parsedQty = parseInt(qty);

    if (isNaN(qty)) 
        throw Error('Invalid quantity of operations. Input must be a number');
    
    const { min, max } = restrictions.operations;
    
    if (parsedQty < min) 
        throw Error(`Invalid quantity of operations. Lower than the minimum [${min}]`);

    if (parsedQty > max) 
        throw Error(`Invalid quantity of operations. Lower than the maximum [${max}]`);

    return parsedQty;
}

function executeCommands() {
    const findResults = [];
    const addedContacts = [];

    while(queue.length) {
        const { command, data } = queue.shift();

        if (command === 'add') {
            addedContacts.push(data);
            continue;
        }

        if (command === 'find') {
            const findResult = addedContacts.filter(contact => contact.startsWith(data));
            findResults.push(findResult.length);
        }
    }

    console.log('Result of find operations are: ', findResults);
}

// Execution
main();