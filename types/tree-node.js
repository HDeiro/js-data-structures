export default class TreeNode {
    constructor (value = null, parent = null) {
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
}