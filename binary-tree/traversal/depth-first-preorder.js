import { getDefinedTree } from "../../mocks/generate-tree";

 const { ROOT } = getDefinedTree();

 /**
 *  Reads traversally the items of a tree in 
 *  Preorder (<root><left><right>)
 */
const traversalPreorder = (root) => {
    if (!root) return;
    console.log(root.value);
    traversalPreorder(root.left);
    traversalPreorder(root.right);
}

console.log('TRAVERSAL PREORDERING');
traversalPreorder(ROOT)

