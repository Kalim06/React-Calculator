import Big from "big.js";
import Operator from "./Operator";
import Number from "./Number";

export default function Calculate(obj, buttonName) {
  //CLEAR
  if (buttonName === "AC") {
    return {
      total: null,
      next: null,
      operation: null
    };
  }

  //   FOR OTHER CASES
  if (Number(buttonName)) {
    if (buttonName === "0" && obj.next === "0") {
      return {};
    }

    if (obj.operation) {
      if (obj.next) {
        return { next: obj.next + buttonName };
      }
      return { next: buttonName };
    }

    if (obj.next) {
      return {
        next: obj.next + buttonName,
        total: null
      };
    }
    return {
      next: buttonName,
      total: null
    };
  }

  if (buttonName === "%") {
    if (obj.operation && obj.next) {
      const result = Operator(obj.total, obj.next, obj.operation);
      return {
        total: Big(result)
          .div(Big("100"))
          .toString(),
        next: null,
        operation: null
      };
    }
    if (obj.next) {
      return {
        next: Big(obj.next)
          .div(Big("100"))
          .toString()
      };
    }
    return {};
  }

  if (buttonName === ".") {
    if (obj.next) {
      if (obj.next.includes(".")) {
        return {};
      }
      return { next: obj.next + "." };
    }
    return { next: "0." };
  }

  if (buttonName === "=") {
    if (obj.next && obj.operation) {
      return {
        total: Operator(obj.total, obj.next, obj.operation),
        next: null,
        operation: null
      };
    } else {
      return {};
    }
  }

  if (buttonName === "+/-") {
    if (obj.next) {
      return { next: (-1 * parseFloat(obj.next)).toString() };
    }
    if (obj.total) {
      return { total: (-1 * parseFloat(obj.total)).toString() };
    }
    return {};
  }

  if (obj.operation) {
    return {
      total: Operator(obj.total, obj.next, obj.operation),
      next: null,
      operation: buttonName
    };
  }

  if (!obj.next) {
    return { operation: buttonName };
  }

  return {
    total: obj.next,
    next: null,
    operation: buttonName
  };
}
