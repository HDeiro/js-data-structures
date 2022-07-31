import { getDefinedTree } from "../../mocks/generate-tree";

const { ROOT } = getDefinedTree();

/**
 * Reads a tree in breadth-first strategy (level order)
 */
const levelOrder = (root) => {
    if (!root) return;

    const queue = [root];
    
    while(queue.length) {
        const current = queue.shift();
        console.log(current.value);
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
    }
}

levelOrder(ROOT);