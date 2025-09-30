import { describe,test,expect } from "@rstest/core";
const {
  getOwnPropertyDescriptor, getOwnPropertyDescriptors,
} = Object;

describe("属性描述符的查询方法", () => {
    const object = { k: "v" };
    const descriptor = {
        value: "v",
        configurable: true,
        writable: true,
        enumerable: true,
    };

    test("getOwnPropertyDescriptor", () => {
        expect(getOwnPropertyDescriptor(object, "k")).toMatchObject(descriptor);
    });
    test("getOwnPropertyDescriptors", () => {
        expect(getOwnPropertyDescriptors(object)).toMatchObject({ k: descriptor });
    });

});