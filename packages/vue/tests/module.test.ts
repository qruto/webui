import { describe, expect, it } from 'vitest';
import { module } from '../src';

describe('module test', () => {
  it('should return `module` string', () => {
    expect(module()).toEqual('module');
  });
});
