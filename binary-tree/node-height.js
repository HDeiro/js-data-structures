import { getDefinedTree } from '../mocks/generate-tree';

const treeStructure = getDefinedTree();

export const findNodeHeight = (node) => {
    // When doesn't exists it's trying to fetch from node that doesn't exists (like a child of a leaf)
    if (!node) return -1; // It's -1 due to the addition of 1 in main return statement

    // Check the height for right/left
    const maxHeight = Math.max(
        findNodeHeight(node.left),
        findNodeHeight(node.right)
    );

    return maxHeight + 1;
}

console.log(findNodeHeight(treeStructure.ROOT));