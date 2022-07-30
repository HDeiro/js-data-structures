import { getRandomInt } from '../utils/number-utils';
import TreeNode from '../types/tree-node';

export const generateSymmetricRandomTree = (depth = getRandomInt(1, 10), root = null, options = null) => {
    // After the leafs
    if (!depth) return null;

    // Get Node unique values
    let nodeValue = getRandomInt(1, 10000);    
    if (options && options.uniqueValues) {
        if (!options.values) options.values = {};

        while (options.values[nodeValue]) {
            nodeValue = getRandomInt(1, 10000);
        }

        options.values[nodeValue] = true;
    }

    // Build a node (in first iteration is the root of whole tree)
    const node = new TreeNode(nodeValue, root);

    // Assign recursively the left and right branches
    node.left = generateSymmetricRandomTree(depth - 1, node, options);
    node.right = generateSymmetricRandomTree(depth - 1, node, options);
    
    return node;
}

/**
 * Defines a tree structure similar to:
 * 
 *                              ROOT
 *              L1 ------------------------------ R1
 *       [L1L1]                     R1L1 -------------------- R1R1
 *                        [R1L1L2] ------ [R1L1R2]                  R1R1R2
 *                                                      [R1R1R2L3] -------- [R1R1R2R3]
 */
export const getDefinedTree = () => {
    // ROOT
    const ROOT = new TreeNode('ROOT');

    // ROOT = L1
    const L1 = new TreeNode('L1', ROOT);
    ROOT.left = L1;
    L1.parent = ROOT;

    // ROOT => R1
    const R1 = new TreeNode('R1', ROOT);
    ROOT.right = R1;
    R1.PARENT = ROOT;

    // ROOT => L1 => L1L1
    const L1L1 = new TreeNode('L1L1', L1); // Leaf
    L1.left = L1L1;
    L1L1.parent = L1;

    // ROOT => R1 => R1L1
    const R1L1 = new TreeNode('R1L1', R1);
    R1.left = R1L1;
    R1L1.parent = R1;

    // ROOT => R1 => R1L1 => R1L1L2
    const R1L1L2 = new TreeNode('R1L1L2', R1L1); // Leaf
    R1L1.left = R1L1L2;
    R1L1L2.parent = R1L1;

    // ROOT => R1 => R1L1 => R1L1R2
    const R1L1R2 = new TreeNode('R1L1R2', R1L1); // Leaf
    R1L1.right = R1L1R2;
    R1L1R2.parent = R1L1;

    // ROOT => R1 => R1R1
    const R1R1 = new TreeNode('R1R1', R1);
    R1.right = R1R1;
    R1R1.parent = R1;

    // ROOT => R1 => R1R1 => R1R1R2
    const R1R1R2 = new TreeNode('R1R1R2', R1R1);
    R1R1.right = R1R1R2;
    R1R1R2.parent = R1R1;

    // ROOT => R1 => R1R1 => R1R1R2 => R1R1R2L3
    const R1R1R2L3 = new TreeNode('R1R1R2L3', R1R1R2); // Leaf
    R1R1R2.left = R1R1R2L3;
    R1R1R2L3.parent = R1R1R2;

    // ROOT => R1 => R1R1 => R1R1R2 => R1R1R2R3
    const R1R1R2R3 = new TreeNode('R1R1R2R3', R1R1R2); // Leaf
    R1R1R2.right = R1R1R2R3;
    R1R1R2R3.parent = R1R1R2;

    return {
        ROOT,
        L1,
        R1,
        L1L1,
        R1L1,
        R1L1L2,
        R1L1R2,
        R1R1,
        R1R1R2,
        R1R1R2L3,
        R1R1R2R3,
    }
}