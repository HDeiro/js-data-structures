// 1382. Balance a Binary Search Tree
// https://leetcode.com/problems/balance-a-binary-search-tree/

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

const balanceBST = function(root) {
    const inOrderArray = [];
    feedInOrder(root, inOrderArray);
    return buildTree(inOrderArray);
};

function feedInOrder(root, array) {
    if (!root) return;
    
    feedInOrder(root.left, array);
    array.push(root.val);
    feedInOrder(root.right, array);
}

function buildTree(array) {
    if (!array.length) return null;
    
    const middleIndex = Math.floor(array.length / 2);
    const root = new TreeNode(array[middleIndex]);
    
    const leftPart = array.slice(0, middleIndex);
    root.left = buildTree(leftPart);
    
    const rightPart = array.slice(middleIndex + 1);
    root.right = buildTree(rightPart);
    
    return root;
}

// ##################################################
// Running
// ##################################################


// ##################################################
// Case 1
// Input: [1,null,2,null,3,null,4,null,null]
// ##################################################

const tree1 = new TreeNode(
    1,
    null,
    new TreeNode(
        2,
        null,
        new TreeNode(
            3,
            null,
            new TreeNode(4)
        )
    )
)

const balancedTree1 = balanceBST(tree1);
console.log(balancedTree1); 