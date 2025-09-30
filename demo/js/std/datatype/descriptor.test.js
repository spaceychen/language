import { describe,test,expect } from "@rstest/core";
const {
  preventExtensions, seal, freeze,
  isExtensible, isSealed, isFrozen,
  getOwnPropertyDescriptor, getOwnPropertyDescriptors,
} = Object;

/**
 * configurable - 是否可配置
 * - 重新定义属性
 * - 删除属性
 */
describe("属性描述符对属性的影响: configurable", () => {
    const object = {k: "v"}; // configurable: true, writable: true, enumerable: true,

    test("configurable:false", () => {
        Object.defineProperty(object, "k", { configurable: false });

        expect(() => {
            Object.defineProperty(object, "k", { configurable: true });
        }).toThrow();
        expect(() => {
            delete object.k;
        }).toThrow();
    });
});

/**
 * writable - 是否可写
 * - 修改属性值
 */
describe("属性描述符对属性的影响: writable", () => {
    const object = {k: "v"}; // configurable: true, writable: true, enumerable: true,
    test("writable:false", () => {
        Object.defineProperty(object, "k", { writable: false });
        expect(() => {
            object.k = "newV";
        }).toThrow();
        expect(object.k).toBe("v");
    });
});

/**
 * enumerable - 是否可枚举
 * - for...in/of 语法
 * - Object.keys()等接口
 * - Object.getOwnPropertyNames() 这是特例
 */

describe("属性描述符对属性的影响: enumerable", () => {
    const object = {k: "v"}; // configurable: true, writable: true, enumerable: true,
    test("enumerable:false", () => {
        Object.defineProperty(object, "k", { enumerable: false });
        for(const key in object) {
            // 不会遍历到 k
            expect(key).not.toBe("k");
        }
        expect(Object.keys(object)).toHaveLength(0);
        expect(Object.getOwnPropertyNames(object)).toHaveLength(1); // 无视不可枚举属性
    });
});