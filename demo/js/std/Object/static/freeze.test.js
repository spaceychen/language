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
 * - 状态`extensible`: isExtensible 返回 true，其他为 false
 * - 状态`non-ext`: isExtensible 返回 false，其他为 false
 * - 状态`seal`: isExtensible 返回 false，isSealed 返回 true，isFrozen 返回 false
 * - 状态`freeze`: isExtensible 返回 false，isSealed 和 isFrozen 都返回 true
 */

describe("实例状态的检测方法", () => {
  const object = { k: "v" };
  
  test("state:extensible", () => {
    expect(isExtensible(object)).toBeTruthy();
    expect(isSealed(object)).not.toBeTruthy();
    expect(isFrozen(object)).not.toBeTruthy();
  });

  test("state:non-ext", () => {
    preventExtensions(object);
    expect(isExtensible(object)).not.toBeTruthy();
    expect(isSealed(object)).not.toBeTruthy();
    expect(isFrozen(object)).not.toBeTruthy();
    
  });

  test("state:sealed", () => {
    seal(object);
    expect(isExtensible(object)).not.toBeTruthy();
    expect(isSealed(object)).toBeTruthy();
    expect(isFrozen(object)).not.toBeTruthy();
  });

  test("state:frozen", () => {
    freeze(object);
    expect(isExtensible(object)).not.toBeTruthy();
    expect(isSealed(object)).toBeTruthy();
    expect(isFrozen(object)).toBeTruthy();
  });
});

/**
 * 实验目标
 * - 了解每种状态的特性
 * 实验结论
 * - 状态`extensible`: 默认态，允许在实例上添加新属性
 * - 状态`non-ext`: 阻止在实例上添加新属性，不改变存量属性们的属性描述符
 * - 状态`seal`: 阻止在实例上添加新属性，修改存量属性们的 configurable 为 false，
 * - 状态`freeze`: 阻止在实例上添加新属性,修改存量属性们的 configurable 和 writable 为 false，
 */
describe("实例状态的属性标识符", () => {
  const object = { k: "v" };

  test("state:extensible", () => {
    const propDescriptor = getOwnPropertyDescriptor(object, "k");
    expect(propDescriptor).toMatchObject({configurable: true, writable: true,});
  });

  test("state:non-ext", () => {
    preventExtensions(object);
    const propDescriptor = getOwnPropertyDescriptor(object, "k");
    expect(propDescriptor).toMatchObject({configurable: true, writable: true,});
  });

  test("state:sealed", () => {
    seal(object);
    const propDescriptor = getOwnPropertyDescriptor(object, "k");
    expect(propDescriptor).toMatchObject({configurable: false, writable: true,});
  });

  test("state:frozen", () => {
    freeze(object);
    const propDescriptor = getOwnPropertyDescriptor(object, "k");
    expect(propDescriptor).toMatchObject({configurable: false, writable: false,});
  });
});