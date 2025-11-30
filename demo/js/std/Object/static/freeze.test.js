import { describe,test,expect } from "@rstest/core";
const {
  preventExtensions, seal, freeze,
  isExtensible, isSealed, isFrozen,
  getOwnPropertyDescriptor,
} = Object;

/**
 * 实验目标
 * - 实例的内部属性的检测
 * 实验结论
 * - 状态`[[extensible]] === true`: isExtensible 为 true
 * - 状态`[[sealed]] === true`: isExtensible 为 false，isSealed 为 true，isFrozen 为 false
 * - 状态`[[frozen]] === true`: isExtensible 为 false，isSealed 和 isFrozen 为 true
 */

describe("实例状态的检测方法", () => {
  
  test("[[extensible]] === true", () => {
    const object = { k: "v" };
    expect(isExtensible(object)).toBeTruthy();
    expect(isSealed(object)).not.toBeTruthy();
    expect(isFrozen(object)).not.toBeTruthy();
  });
  
  test("[[extensible]] === false", () => {
    const object = { k: "v" };
    preventExtensions(object);
    expect(isExtensible(object)).not.toBeTruthy();
    expect(isSealed(object)).not.toBeTruthy();
    expect(isFrozen(object)).not.toBeTruthy();
  });
  
  test("[[sealed]] === true", () => {
    const object = { k: "v" };
    seal(object);
    expect(isExtensible(object)).not.toBeTruthy();
    expect(isSealed(object)).toBeTruthy();
    expect(isFrozen(object)).not.toBeTruthy();
  });
  
  test("[[frozen]] === true", () => {
    const object = { k: "v" };
    freeze(object);
    expect(isExtensible(object)).not.toBeTruthy();
    expect(isSealed(object)).toBeTruthy();
    expect(isFrozen(object)).toBeTruthy();
  });
});

/**
 * 实验目标
 * - 实例内部属性决定了属性描述符
 * 实验结论
 * - 状态`[[extensible]] === true`: 默认态，允许在实例上添加新属性
 * - 状态`[[extensible]] === false`: 阻止在实例上添加新属性，不改变存量属性们的属性描述符
 * - 状态`[[sealed]] === true`: 阻止在实例上添加新属性，修改存量属性们的 configurable 为 false，
 * - 状态`[[frozen]] === true`: 阻止在实例上添加新属性,修改存量属性们的 configurable 和 writable 为 false，
 */
describe("实例状态的属性标识符", () => {
  
  test("[[extensible]] === true", () => {
    const object = { k: "v" };
    const propDescriptor = getOwnPropertyDescriptor(object, "k");
    const assert = {configurable: true, writable: true,};
    expect(propDescriptor).toMatchObject(assert);
  });
  
  test("[[extensible]] === false", () => {
    const object = { k: "v" };
    preventExtensions(object);
    const propDescriptor = getOwnPropertyDescriptor(object, "k");
    const assert = {configurable: true, writable: true,};
    expect(propDescriptor).toMatchObject(assert);
  });
  
  test("[[sealed]] === true", () => {
    const object = { k: "v" };
    seal(object);
    const propDescriptor = getOwnPropertyDescriptor(object, "k");
    const assert = {configurable: false, writable: true,};
    expect(propDescriptor).toMatchObject(assert);
  });
  
  test("[[frozen]] === true", () => {
    const object = { k: "v" };
    freeze(object);
    const propDescriptor = getOwnPropertyDescriptor(object, "k");
    const assert = {configurable: false, writable: false,};
    expect(propDescriptor).toMatchObject(assert);
  });
});