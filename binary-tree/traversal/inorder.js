import { getDefinedTree } from "../../mocks/generate-tree";

const { ROOT } = getDefinedTree();

/**
 *  Reads traversally the items of a tree in 
 *  InOrder (<left><root><right>)
 */
const traversalInorder = (root) => {
    if (!root) return;
    traversalInorder(root.left);
    console.log(root.value);
    traversalInorder(root.right);
}

console.log('TRAVERSAL INORDER');
traversalInorder(ROOT)

