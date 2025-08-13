import { expect, test } from '@rstest/core';
import { sayHi } from './js/sayHi.js';

test('should sayHi correctly', () => {
  expect(sayHi()).toBe('hi');
});