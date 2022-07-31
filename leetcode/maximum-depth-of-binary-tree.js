// 104. Maximum Depth of Binary Tree
// https://leetcode.com/problems/maximum-depth-of-binary-tree/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root
 * @return {number}
 */
 var maxDepth = function(root) {
    if (!root) return 0;

    const { left, right } = root;
    
    // Maximum between 
    if (left || right)
        return 1 + Math.max(maxDepth(left), maxDepth(right));
    
    // Root itself must be accounted if we're talking about depth
    return 1; 
};

// ##################################################
// Running
// ##################################################


// ##################################################
// Case 1
// Input: [3,9,20,null,null,15,7]
// ##################################################

const tree1 = {
    value: 3,
    left: {
        value: 9,
        left: null,
        right: null,
    },
    right: {
        value: 20,
        left: {
            value: 15,
            left: null,
            right: null,
        },
        right: {
            value: 7,
            left: null,
            right: null,
        }
    }
};

console.log('Assertion 1 =', maxDepth(tree1) === 3)

// ##################################################
// Case 2
// Input: [1, null, 2]
// ##################################################

const tree2 = {
    value: 1,
    left: null,
    right: {
        value: 2,
        left: null,
        right: null,
    }
};

console.log('Assertion 2 =', maxDepth(tree2) === 2)
