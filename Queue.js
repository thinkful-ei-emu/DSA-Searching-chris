const _Node = require('./Node');

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }
  enqueue(data) {
    const node = new _Node(data);

    if (this.first === null) {
      this.first = node;
    }

    if (this.last) {
      this.last.next = node;
    }
    //make the new node the last item on the queue
    this.last = node;
  }
  dequeue() {
    //if the queue is empty, there is nothing to return
    if (this.first === null) {
      return;
    }
    const node = this.first;
    console.log('node: ', node)
    this.first = this.first.next;
    //if this is the last item in the queue
    if (node === this.last) {
      this.last = null;
    }
    return node.data;
  }
}
module.exports = Queue;

function main() {
  const starTrekQ = new Queue();
  
  starTrekQ.enqueue('Kirk');
  starTrekQ.enqueue('Spock');
  starTrekQ.enqueue('Uhura');
  starTrekQ.enqueue('Sulu');
  starTrekQ.enqueue('Checkov');
  
  console.log(starTrekQ);
  
  console.log(isEmpty(starTrekQ));
  console.log(peek(starTrekQ));
  console.log(display(starTrekQ));

  starTrekQ.dequeue('Kirk');
  starTrekQ.dequeue('Spock');
  console.log(display(starTrekQ));
}
function peek(list){
  return list.first.data;
}
function isEmpty(list){
  if(list.first){
    return false;
  }
  return true;
}
function display(list){
  let result = [];
  let curr = list.first;
  while(curr){
    result.push(curr.data);
    curr = curr.next;
  }
  return result;
}
// main();