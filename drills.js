const Queue = require('./Queue');

function binarySearch(array, value, start, end) {
  start === undefined ? 0 : start;
  end === undefined ? array.length : end;

  if (start > end) {
    return -1;
  }

  const index = Math.floor((start + end) / 2);
  const item = array[index];

  console.log(start, end);
  if (item === value) {
    return index;
  }
  else if (item < value) {
    return binarySearch(array, value, index + 1, end);
  }
  else if (item > value) {
    return binarySearch(array, value, start, index - 1);
  }
}
// 1. How many searches?
// Given a sorted list 3, 5, 6, 8, 11, 12, 14, 15, 17, 18 and using the recursive 
// binary search algorithm, identify the sequence of numbers that each recursive 
// call will search to try and find 8.
// 3, 5, 6, 8, 11, 12, 14, 15, 17, 18
// 3,5,6,8
// 6,8
// 8

// Given a sorted list 3, 5, 6, 8, 11, 12, 14, 15, 17, 18 and using the recursive 
// binary search algorithm, identify the sequence of numbers that each recursive 
// call will search to try and find 16.
// 3, 5, 6, 8, 11, 12, 14, 15, 17, 18
// 12, 14, 15, 17, 18
// 17, 18
// -1

// 3. Find a book
// Imagine you are looking for a book in a library with a Dewey Decimal index. 
// How would you go about it? Can you express this process as a search algorithm? 
// Implement your algorithm to find a book whose Dewey and book title is provided.

// function bookFind(dewey, book){
//   goTo(800); //walk straight to this section
//   goTo(10); //walk straight to this section
//   goTo(3); //search for the fiction section
//   goTo(6); //look for where the newer books along the aisle
//   searchFor('Harry Potter'); //look for specific book amongst titles
// }
// bookFind(813.6, 'Harry Potter');

// 4. Searching in a BST ** No coding is needed for these drills**. Once you 
// have answered it, you can then code the tree and implement the traversal 
// to see if your answer is correct.

// 1) Given a binary search tree whose in-order and pre-order traversals are 
// respectively 14 15 19 25 27 35 79 89 90 91 and 35 25 15 14 19 27 89 79 91 90. 
// What would be its postorder traversal?
//             /35\
//         /25\      /89\
//     /15\    27   79   /91
//   14   19            90
// 14 19 15 27 25 79 90 91 89 35

// 2) The post order traversal of a binary search tree is 5 7 6 9 11 10 8. 
// What is its pre-order traversal?
//                 /8\
//             /6\       /10\
//            5   7     9    11
// 8 6 5 7 10 9 11

// 5. Implement different tree traversals
// Using your BinarySearchTree class from your previous lesson, create a binary 
// search tree with the following dataset: 25 15 50 10 24 35 70 4 12 18 31 44 66 90 22. 
// Then implement inOrder(), preOrder(), and postOrder() functions. 
// Test your functions with the following datasets.

// A pre-order traversal should give you the following order: 
// 25, 15, 10, 4, 12, 24, 18, 22, 50, 35, 31, 44, 70, 66, 90

// In-order: 4, 10, 12, 15, 18, 22, 24, 25, 31, 35, 44, 50, 66, 70, 90

// Post-order: 4, 12, 10, 22, 18, 24, 15, 31, 44, 35, 66, 90, 70, 50, 25
function inOrder(tree, res = []){
  if(!tree){
    return res;
  }
  res.push(tree.key);
  inOrder(tree.left, res);
  inOrder(tree.right, res);
  return res.sort((a,b) => a-b);
}
function preOrder(tree, res = []){
  if(!tree){
    return res;
  }
  res.push(tree.key);
  preOrder(tree.left, res);
  preOrder(tree.right, res);
  return res;
}
function postOrder(tree, res = []){
  if(!tree){
    return res;
  }
  res.push(tree.key);
  postOrder(tree.right, res);
  postOrder(tree.left, res);
  let result = [];
  for(let i=res.length-1; i>=0; i--){
    result.push(res[i]);
  }
  return result;
}

// 6. Find the next commanding officer
// Suppose you have a tree representing a command structure of the Starship USS Enterprise.

//                Captain Picard
//              /                \
//     Commander Riker       Commander Data
//       /         \               \
//  Lt. Cmdr.   Lt. Cmdr.          Lt. Cmdr.
//  Worf        LaForge            Crusher
//    /                           /
// Lieutenant                  Lieutenant
// security-officer            Selar
// 
// This tree is meant to represent who is in charge of lower-ranking officers. 
// For example, Commander Riker is directly responsible for Worf and LaForge. 
// People of the same rank are at the same level in the tree. However, to 
// distinguish between people of the same rank, those with more experience 
// are on the left and those with less on the right (i.e., experience decreases 
// from left to right). Suppose a fierce battle with an enemy ensues. 
// Write a program that will take this tree of commanding officers and 
// outlines the ranking officers in their ranking order so that if officers 
// start dropping like flies, we know who is the next person to take over command.
function redShirt(tree, values = []){
  const queue = new Queue();
  const node = tree.root;
  queue.enqueue(node); 
  while (queue.length) {
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

// 7. Max profit
// The share price for a company over a week's trading is as follows: 
// [128, 97, 121, 123, 98, 97, 105]. If you had to buy shares in the company 
// on a particular day, and sell the shares on a following day, write an 
// algorithm to work out what the maximum profit you could make would be.
function maxProfit(arr){
  let max = arr[0];
  let min = arr[0];
  let dif = 0;
  for(let i=0; i<arr.length; i++){
    if(arr[i] > max){
      max = arr[i];
      min = 0;
    }
    if(arr[i] < min){
      min = arr[i];
    }
    if((max - min) > dif){
      dif = max - min;
    }
  }
  return dif;
}
// console.log(maxProfit([128, 97, 121, 123, 98, 97, 105]));

function postToBST(arr, end = arr.length-1, bst = new BST(arr[end])){
  if(arr.length === 0){
    return bst;
  }
  bst.insert(arr[end]);
  return postToBST(arr, end-1, bst);
}

class BST{
  constructor(){}
}