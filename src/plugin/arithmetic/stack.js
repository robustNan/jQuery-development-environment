export default class {
  constructor() {
    this.stack = [];
  }

  getLength() {
    return this.stack.length;
  }

  peek() {
    const len = this.getLength();
    return len ? this.stack[len - 1] : undefined;
  }

  pop() {
    return this.stack.pop();
  }

  push(num) {
    this.stack.push(num);
    return undefined;
  }

  reset() {
    this.stack = [];
    return undefined;
  }
}
