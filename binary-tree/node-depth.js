import { getDefinedTree } from '../mocks/generate-tree';

const treeStructure = getDefinedTree();

export const findNodeDepth = (node) => {
    // If node doesn't exists, return -1 as a flag 
    if (!node) return -1;

    // No more parent levels
    if (!node.parent) return 0;

    // Get recursively how deep is the node
    return findNodeDepth(node.parent) + 1;
}

console.log(findNodeDepth(treeStructure.R1R1R2R3));