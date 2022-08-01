// https://www.hackerrank.com/challenges/contacts/problem

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

    // Executed all steps
    if (qtyOperations === queue.length) {
        executeCommands();
        readline.close();
    }
}

function readCommand(inputCommand) {
    const [ command, ...data ] = inputCommand.split(' ');

    if (!['find', 'add'].includes(command.toLowerCase()))
        throw Error(`Invalid commnad! Only find and add command are valid.`);

    queue.push({
        command,
        data: data.join(' ')
    });

    // Request for next cycle
    requestCommand(queue.length + 1);
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