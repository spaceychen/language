import { describe,test,expect } from "@rstest/core";
const {
    defineProperty, defineProperties,
    getOwnPropertyDescriptor, getOwnPropertyDescriptors,
} = Object;

describe("属性描述符的定义方法", () => {
    const object = {};
    const descriptor = {
        value: "v",
        configurable: true,
        writable: true,
        enumerable: true,
    };

    test("defineProperty", () => {
        defineProperty(object, "k", descriptor);
        expect(getOwnPropertyDescriptor(object, "k")).toMatchObject(descriptor);
    });

    test("defineProperties", () => {
        defineProperties(object, { k: descriptor });
        expect(getOwnPropertyDescriptors(object, "k")).toMatchObject(descriptor);
    });
});