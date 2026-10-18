/** Remove only a uniform, light background connected to the image edges.
 * Enclosed white details and existing transparency are preserved.
 */
export function clearLogoBackground(data: Uint8ClampedArray, width: number, height: number) {
  const corners = [0, width - 1, (height - 1) * width, width * height - 1];
  const background = [0, 1, 2].map(channel => corners.reduce((sum, pixel) => sum + data[pixel * 4 + channel], 0) / 4);
  if (corners.some(pixel => data[pixel * 4 + 3] < 250) || Math.min(...background) < 210) return false;
  if (corners.some(pixel => background.some((value, channel) => Math.abs(data[pixel * 4 + channel] - value) > 16))) return false;
  const seen = new Uint8Array(width * height);
  const queue = new Uint32Array(width * height);
  let start = 0;
  let end = 0;
  const visit = (pixel: number) => {
    if (seen[pixel]) return;
    seen[pixel] = 1;
    if (background.some((value, channel) => Math.abs(data[pixel * 4 + channel] - value) > 32)) return;
    queue[end++] = pixel;
  };
  for (let x = 0; x < width; x++) { visit(x); visit((height - 1) * width + x); }
  for (let y = 0; y < height; y++) { visit(y * width); visit(y * width + width - 1); }
  while (start < end) {
    const pixel = queue[start++];
    data[pixel * 4 + 3] = 0;
    const x = pixel % width;
    if (x > 0) visit(pixel - 1);
    if (x < width - 1) visit(pixel + 1);
    if (pixel >= width) visit(pixel - width);
    if (pixel < width * (height - 1)) visit(pixel + width);
  }
  return end > 0;
}
