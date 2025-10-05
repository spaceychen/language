import { describe,test,expect } from "@rstest/core";
const {
  preventExtensions, seal, freeze,
  isExtensible, isSealed, isFrozen,
  getOwnPropertyDescriptor,
} = Object;

/**
 * 实验目标
 * - 检测实例状态的方法
 * 实验结论
 * - 状态`extensible`: isExtensible 为 true，其他为 false
 * - 状态`non-ext`: 均为 false
 * - 状态`sealed`: isExtensible 为 false，isSealed 为 true，isFrozen 为 false
 * - 状态`frozen`: isExtensible 为 false，isSealed 和 isFrozen 为 true
 */

describe("实例状态的检测方法", () => {
  
  test("state:extensible", () => {
    const object = { k: "v" };
    expect(isExtensible(object)).toBeTruthy();
    expect(isSealed(object)).not.toBeTruthy();
    expect(isFrozen(object)).not.toBeTruthy();
  });
  
  test("state:non-ext", () => {
    const object = { k: "v" };
    preventExtensions(object);
    expect(isExtensible(object)).not.toBeTruthy();
    expect(isSealed(object)).not.toBeTruthy();
    expect(isFrozen(object)).not.toBeTruthy();
  });
  
  test("state:sealed", () => {
    const object = { k: "v" };
    seal(object);
    expect(isExtensible(object)).not.toBeTruthy();
    expect(isSealed(object)).toBeTruthy();
    expect(isFrozen(object)).not.toBeTruthy();
  });
  
  test("state:frozen", () => {
    const object = { k: "v" };
    freeze(object);
    expect(isExtensible(object)).not.toBeTruthy();
    expect(isSealed(object)).toBeTruthy();
    expect(isFrozen(object)).toBeTruthy();
  });
});

/**
 * 实验目标
 * - 了解每种实例状态的特性
 * 实验结论
 * - 状态`extensible`: 默认态，允许在实例上添加新属性
 * - 状态`non-ext`: 阻止在实例上添加新属性，不改变存量属性们的属性描述符
 * - 状态`sealed`: 阻止在实例上添加新属性，修改存量属性们的 configurable 为 false，
 * - 状态`frozen`: 阻止在实例上添加新属性,修改存量属性们的 configurable 和 writable 为 false，
 */
describe("实例状态的属性标识符", () => {
  
  test("state:extensible", () => {
    const object = { k: "v" };
    const propDescriptor = getOwnPropertyDescriptor(object, "k");
    expect(propDescriptor).toMatchObject({configurable: true, writable: true,});
  });
  
  test("state:non-ext", () => {
    const object = { k: "v" };
    preventExtensions(object);
    const propDescriptor = getOwnPropertyDescriptor(object, "k");
    expect(propDescriptor).toMatchObject({configurable: true, writable: true,});
  });
  
  test("state:sealed", () => {
    const object = { k: "v" };
    seal(object);
    const propDescriptor = getOwnPropertyDescriptor(object, "k");
    expect(propDescriptor).toMatchObject({configurable: false, writable: true,});
  });
  
  test("state:frozen", () => {
    const object = { k: "v" };
    freeze(object);
    const propDescriptor = getOwnPropertyDescriptor(object, "k");
    expect(propDescriptor).toMatchObject({configurable: false, writable: false,});
  });
});