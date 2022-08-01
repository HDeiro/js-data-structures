// https://leetcode.com/problems/swap-nodes-in-pairs/

import { LinkedListItem } from "../types/linked-list";

// Define list

const item1 = new LinkedListItem(1);
const item2 = new LinkedListItem(2);
const item3 = new LinkedListItem(3);
const item4 = new LinkedListItem(4);

item1.next = item2;
item2.next = item3;
item3.next = item4;

// Utilitaries

function printLinkedList(item) {
    let loopItem = item;
    let buffer = `${loopItem.value}`;

    while (loopItem.next) {
        loopItem = loopItem.next;
        buffer += ` -> ${loopItem.value}`;
    }

    console.log(`[ ${buffer} ]`);
}

function swapPairsOfLinkedList(headOfLinkedList) {
    // Create an item to be always a head and not lose reference while swaping positions
    const preHeadReference = new LinkedListItem(null, headOfLinkedList);
    // Utilitary is used to swap the items
    let utilitary = preHeadReference;

    while (utilitary.next && utilitary.next.next) {
        // Get Position A
        const node1 = utilitary.next;
        // Get Position B
        const node2 = utilitary.next.next;
        // Swap positions A <- B (Set B in place of A, in first iteration = new head)
        utilitary.next = node2;
        // Set C as next for A
        node1.next = node2.next;
        // Set B as next for A
        node2.next = node1;
        // Reiterates having A as new reference (going to swamp C/D next)
        utilitary = node1;
    }

    return preHeadReference.next;
}

// Main

printLinkedList(item1);
const newHead = swapPairsOfLinkedList(item1);
printLinkedList(newHead);