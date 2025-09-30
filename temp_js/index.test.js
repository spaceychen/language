import { expect, test } from '@rstest/core';
import { sayHi } from './index';

describe.only('index.test.js', () => {
    test.only('should sayHi correctly', () => {
        expect(sayHi()).toBe('hi');
    });
});
