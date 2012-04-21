// I saw this game as a queue in my head, over engineering FTW!
var Queue = function () {
  this.list = [];
};

Queue.prototype.queue = function (item) {
  this.list.push(item);
  return null;
};

Queue.prototype.dequeue = function () {
  return this.list.shift();
};
