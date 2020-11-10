import Stack from './stack';

export default class Arithmetic {
  constructor() {
    this.operand = new Stack();
    this.operator = new Stack();
    this.tempNum = '';
    this.tempSym = '';
  }
  /**
   * @description 递归表达式，优先计算括号中的内容并进行替换
   * @param {String}
   */
  matchInBrackets(expression) {
    const regInBrackets = /\([\+|\-|\*|\/|\.|\d]+?\)/g;
    let expInBrackets = expression.match(regInBrackets);
    if (expInBrackets) {
      expInBrackets.forEach((element) => {
        const tempResualt = this.calculate(element.replace(/[\(|\)]/g, ''));
        expression = expression.replace(element, tempResualt);
      });
    }
    expInBrackets = expression.match(regInBrackets);
    return expInBrackets ? this.matchInBrackets(expression) : expression;
  }
  /**
   * @description 初步处理计算表达式，将优先级高的乘除运算和括号内的运算先计算出结果
   * @param {String}
   */
  calculate(expression) {
    // 先判断表达式中是否存在括号运算，如果有则递归计算出其中的值并替换表达式中的括号
    expression = this.matchInBrackets(expression);
    for (let i = expression.length - 1; 0 <= i; i--) {
      const numReg = /[\d|\.]/;
      let char = expression[i];
      if (numReg.test(char)) {
        this.tempNum = char + this.tempNum;
        if (0 == i) {
          if (this.tempSym) {
            this.calculateMultiOrDivis(this.tempSym);
            this.tempSym = '';
          }
          if (this.tempNum) this.operand.push(this.tempNum);
          break;
        }
      } else {
        if (0 == i) {
          if (this.tempSym) {
            this.calculateMultiOrDivis(this.tempSym);
            this.tempSym = '';
          }
          if (this.tempNum) this.operand.push(this.tempNum);
          this.operator.push(char);
          break;
        }
        if (this.tempSym) {
          this.calculateMultiOrDivis(this.tempSym);
          this.tempSym = '';
        }
        let peekSym = this.operator.peek();
        const nextChar = expression[i - 1];
        const isSymbol = /[\+|\-|\*|\/]/;
        if (peekSym) {
          if (this.tempNum) {
            if (isSymbol.test(nextChar) && '-' == char) {
              this.operand.push(char + this.tempNum);
              char = '';
            } else {
              this.operand.push(this.tempNum);
            }
            this.tempNum = '';
          }
          switch (Arithmetic.priorityCompare(peekSym, char)) {
            case 2:
              this.tempSym = this.operator.pop();
              break;
            case 1:
              this.calculateMultiOrDivis(this.operator.pop());
              break;
            default:
              break;
          }
        } else if (!peekSym && this.tempNum) {
          if (isSymbol.test(nextChar) && '-' == char) {
            this.operand.push(char + this.tempNum);
            char = '';
          } else {
            this.operand.push(this.tempNum);
          }
          this.tempNum = '';
        }
        if (char) this.operator.push(char);
      }
    }
    return this.calculateReversePoland();
  }
  /**
   * @description 计算最终的逆波兰表达式
   */
  calculateReversePoland() {
    let resualt = 0;
    while (0 < this.operand.getLength()) {
      if (this.operator.getLength() == this.operand.getLength()) {
        const symL = resualt;
        const symR = this.operand.pop();
        const cacheSym = this.operator.pop();
        resualt =
          '+' == cacheSym
            ? Arithmetic.addition(symL, symR)
            : Arithmetic.subtraction(symL, symR);
      } else {
        if (1 == this.operand.getLength()) {
          resualt = parseFloat(this.operand.pop());
          break;
        }
        const symL = this.operand.pop();
        const symR = this.operand.pop();
        const cacheSym = this.operator.pop();
        resualt = Arithmetic.selectCalculationRule(symL, symR, cacheSym);
      }
      this.operand.push(resualt);
    }
    this.operand.reset();
    this.operator.reset();
    this.tempNum = '';
    this.tempSym = '';
    return resualt;
  }
  /**
   * @description 只计算乘法或者除法
   * @param {String} sym
   */
  calculateMultiOrDivis(sym) {
    const symL = this.operand.pop();
    const symR = this.operand.pop();
    this.operand.push(Arithmetic.selectCalculationRule(symL, symR, sym));
    return undefined;
  }
  /**
   * @description 判断两个数字间的运算法则
   * @param {String || Number} symL
   * @param {String || Number} symR
   * @param {String} sym
   */
  static selectCalculationRule(symL, symR, sym) {
    switch (sym) {
      case '*':
        return Arithmetic.multiplication(symL, symR);
      case '/':
        return Arithmetic.division(symL, symR);
      case '+':
        return Arithmetic.addition(symL, symR);
      default:
        return Arithmetic.subtraction(symL, symR);
    }
  }
  /**
   * @description 加法
   * @param {String || Number}
   */
  static addition(...num) {
    const symL = parseFloat(num[0]);
    const symR = parseFloat(num[1]);
    return symL + symR;
  }
  /**
   * @description 除法
   * @param {String || Number}
   */
  static division(...num) {
    const symL = parseFloat(num[0]);
    const symR = parseFloat(num[1]);
    return symL / symR;
  }
  /**
   * @description 乘法
   * @param {String || Number}
   */
  static multiplication(...num) {
    const symL = parseFloat(num[0]);
    const symR = parseFloat(num[1]);
    return symL * symR;
  }
  /**
   * @description 减法
   * @param {String || Number}
   */
  static subtraction(...num) {
    const symL = parseFloat(num[0]);
    const symR = parseFloat(num[1]);
    return symL - symR;
  }
  /**
   * @description 判断两个运算符的优先级
   * @param {String}
   */
  static priorityCompare(symA, symB) {
    const high = /[\*\/]/;
    if (high.test(symA) && !high.test(symB)) {
      return 2;
    } else if (high.test(symA) && high.test(symB)) {
      return 1;
    } else {
      return 0;
    }
  }
}
