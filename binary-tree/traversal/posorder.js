import { getDefinedTree } from "../../mocks/generate-tree";

const { ROOT } = getDefinedTree();

/**
*  Reads traversally the items of a tree in 
*  PosOrder (<left><right><root>)
*/
const traversalPosorder = (root) => {
    if (!root) return;
    traversalPosorder(root.left);
    traversalPosorder(root.right);
    console.log(root.value);
}

console.log('TRAVERSAL POSORDER');
traversalPosorder(ROOT)

