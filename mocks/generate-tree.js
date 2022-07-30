import { getRandomInt } from '../utils/number-utils';
import TreeNode from '../types/tree-node';

export const generateRandomTree = (depth = getRandomInt(1, 10)) => {
    // After the leafs
    if (!depth) return null;

    // Build a node (in first iteration is the root of whole tree)
    const node = new TreeNode(getRandomInt(1, 10));

    // Assign recursively the left and right branches
    node.left = generateRandomTree(depth - 1);
    node.right = generateRandomTree(depth - 1);
    
    return node;
}