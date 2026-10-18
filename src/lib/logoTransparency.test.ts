import { describe, expect, it } from 'vitest';
import { clearLogoBackground } from './logoTransparency';

const pixels = (rows: number[][]) => new Uint8ClampedArray(rows.flatMap(row => row.flatMap(value => [value, value, value, 255])));
describe('logo transparency', () => {
  it('clears the edge background and preserves enclosed white logo details', () => {
    const data = pixels([[255,255,255,255,255],[255,0,0,0,255],[255,0,255,0,255],[255,0,0,0,255],[255,255,255,255,255]]);
    expect(clearLogoBackground(data, 5, 5)).toBe(true);
    expect(data[3]).toBe(0);
    expect(data[(2 * 5 + 2) * 4 + 3]).toBe(255);
    expect(data[(1 * 5 + 1) * 4 + 3]).toBe(255);
  });
  it('leaves an already transparent logo unchanged', () => {
    const data = pixels([[255,255],[255,0]]);
    data[3] = 0;
    const original = data.slice();
    expect(clearLogoBackground(data, 2, 2)).toBe(false);
    expect(data).toEqual(original);
  });
  it('does not erase dark artwork or nonuniform corner backgrounds', () => {
    const data = pixels([[0,255],[255,255]]);
    const original = data.slice();
    expect(clearLogoBackground(data, 2, 2)).toBe(false);
    expect(data).toEqual(original);
  });
});
