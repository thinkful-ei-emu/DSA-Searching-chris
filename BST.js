const Queue = require('./Queue');

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value){
    // If the tree is empty then this key being inserted is the root node of the tree
    if(this.key === null) {
      this.key = key;
      this.value = value;
    }
    /* If the tree already exists, then start at the root, 
           and compare it to the key you want to insert.
           If the new key is less than the node's key 
           then the new node needs to live in the left-hand branch */
    else if (key < this.key){
      if(this.left === null){
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    }
    /* Similarly, if the new key is greater than the node's key 
        then you do the same thing, but on the right-hand side */
    else {
      if(this.right === null){
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key){
    // If the item is found at the root then return that value
    if(this.key === key){
      return this.value;
    }
    /* If the item you are looking for is less than the root 
           then follow the left child.
           If there is an existing left child, 
           then recursively check its left and/or right child
           until you find the item */
    else if(key < this.key && this.left){
      return this.left.find(key);
    }
    /* If the item you are looking for is greater than the root 
           then follow the right child.
           If there is an existing right child, 
           then recursively check its left and/or right child
           until you find the item */
    else if(key > this.key && this.right){
      return this.right.find(key);
    }
    // You have searched the tree and the item is not in the tree
    else {
      throw new Error('Key Error');
    }
  }

  remove(key){
    if(this.key === key){
      if(this.left && this.right){
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      /* If the node only has a left child, 
               then you replace the node with its left child */
      else if (this.left){
        this._replaceWith(this.left);
      }
      /* And similarly if the node only has a right child 
               then you replace it with its right child */
      else if(this.right){
        this._replaceWith(this.right);
      }
      /* If the node has no children then
               simply remove it and any references to it 
               by calling "this._replaceWith(null)" */
      else{
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error ('Key Error');
    }
  }

  _replaceWith(node) {
    if(this.parent) {
      if(this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }
          
      if(node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if(!this.left){
      return this;
    }
    return this.left._findMin();
  }
}
module.exports = BinarySearchTree;

function main(){
  const BST = new BinarySearchTree();
  // BST.insert(25);
  // BST.insert(15);
  // BST.insert(50);
  // BST.insert(10);
  // BST.insert(24);
  // BST.insert(35);
  // BST.insert(70);
  // BST.insert(4);
  // BST.insert(12);
  // BST.insert(18);
  // BST.insert(31);
  // BST.insert(44);
  // BST.insert(66);
  // BST.insert(90);
  // BST.insert(22);
  BST.insert(20, 'Captain Picard');
  BST.insert(22, 'Commander Data');
  BST.insert(25, 'Lt. Cmdr. Crusher');
  BST.insert(23, 'Lieutenant Selar');
  BST.insert(15, 'Commander Riker');
  BST.insert(16, 'Lt. Cmdr. Worf');
  BST.insert(11, 'Lt. Cmdr. LaForge');
  BST.insert(6, 'Lieutenant security-officer');
  // console.log(BST);
  console.log(redShirt(BST));
}
function redShirt(tree, values = []){
  const queue = new Queue();
  const node = tree;
  queue.enqueue(node);
  while (queue) {
    const node = queue.dequeue();
    values.push(node.value);
    if (node.left) {
      queue.enqueue(node.left);
    }

    if (node.right) {
      queue.enqueue(node.right);
    }
  }
  return values;
}
main();