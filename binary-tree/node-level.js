import { getDefinedTree } from '../mocks/generate-tree';

const treeStructure = getDefinedTree();

/**
 * The level of a node is the number of connections between the given node and the root.
 * 
 * The level can be defined as the depth + 1 (because it considers the node itself a valid entity for the level)
 */
export const findNodeLevel = (node) => {
    // If node doesn't exists, return -1 as a flag 
    if (!node) return -1;

    // No more parent levels (It's root)
    if (!node.parent) return 1;

    // Recursively try to find the level of upper path
    return findNodeLevel(node.parent) + 1;
}

console.log('Level of L1L1:', findNodeLevel(treeStructure.L1L1));
console.log('Level of ROOT:', findNodeLevel(treeStructure.ROOT));