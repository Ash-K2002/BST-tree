import { prettyPrint } from "./functions.mjs";
import { myTree } from "./BSTclass.mjs";

let arr=[10,20,30,40,50,60,70,80,90,100];

let arr1=[1,2,3,4,5,6,7,8,9,29,37];

const tree= new myTree();
tree.root=tree.buildTree(arr);

console.log('Elements in pre order');

const printNode=(node)=>{
console.log(node.data);
};

console.log('Is the tree balanced? ',tree.isBalanced());

console.log('Tree traversal inorder: ');
tree.inorder(printNode);
console.log('Tree traversal preorder: ');
tree.preorder(printNode);
console.log('Tree traversal postorder: ');
tree.postorder(printNode);

arr1.forEach((value)=>{
    tree.insert(value);
});

console.log('Is the tree balanced now? ',tree.isBalanced());

tree.rebalance();

console.log('Is the tree balanced again? ',tree.isBalanced());

//prettyPrint(tree.root);

console.log('Tree traversal inorder: ');
tree.inorder(printNode);
console.log('Tree traversal preorder: ');
tree.preorder(printNode);
console.log('Tree traversal postorder: ');
tree.postorder(printNode);