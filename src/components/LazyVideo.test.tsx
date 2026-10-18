import { act, cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import LazyVideo from './LazyVideo';

describe('video loading and playback', () => {
  let observers: { callback: IntersectionObserverCallback; options?: IntersectionObserverInit }[];
  beforeEach(() => {
    observers = [];
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) { observers.push({ callback, options }); }
      observe() {}
      disconnect() {}
    });
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
  });
  afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });
  const intersect = (index: number, visible: boolean) => act(() => {
    observers[index].callback([{ isIntersecting: visible } as IntersectionObserverEntry], {} as IntersectionObserver);
  });
  it('fetches near the viewport but plays only on screen, then pauses off screen', () => {
    const { container } = render(<LazyVideo src="/recording.mp4" />);
    const video = container.querySelector('video')!;
    expect(video).not.toHaveAttribute('src');
    expect(video.autoplay).toBe(false);
    intersect(0, true);
    expect(video).toHaveAttribute('src', '/recording.mp4');
    expect(video.play).not.toHaveBeenCalled();
    intersect(1, true);
    expect(video.play).toHaveBeenCalledTimes(1);
    intersect(1, false);
    expect(video.pause).toHaveBeenCalled();
  });
  it('pauses when the browser tab becomes hidden and resumes when visible', () => {
    const { container } = render(<LazyVideo src="/recording.mp4" />);
    const video = container.querySelector('video')!;
    intersect(0, true);
    intersect(1, true);
    const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
    act(() => document.dispatchEvent(new Event('visibilitychange')));
    expect(video.pause).toHaveBeenCalled();
    hidden.mockReturnValue(false);
    act(() => document.dispatchEvent(new Event('visibilitychange')));
    expect(video.play).toHaveBeenCalledTimes(2);
  });
});
