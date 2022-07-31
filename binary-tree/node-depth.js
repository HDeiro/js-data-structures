import { getDefinedTree } from '../mocks/generate-tree';

const treeStructure = getDefinedTree();

/**
 * The depth of a node is the longest upward path from the given
 * node to the root node.
 */
export const findNodeDepth = (node) => {
    // If node doesn't exists, return -1 as a flag 
    if (!node) return -1;

    // No more parent levels (It's root)
    if (!node.parent) return 0;

    // Get recursively how deep is the node
    return findNodeDepth(node.parent) + 1;
}

console.log(findNodeDepth(treeStructure.R1R1R2R3));