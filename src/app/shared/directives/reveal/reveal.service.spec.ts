import { TestBed } from '@angular/core/testing';
import { RevealService } from './reveal.service';

const intersection = (target: Element, isIntersecting: boolean): IntersectionObserverEntry => ({
  target, isIntersecting,
  boundingClientRect: target.getBoundingClientRect(),
  intersectionRatio: isIntersecting ? 1 : 0,
  intersectionRect: new DOMRect(),
  rootBounds: null,
  time: 0,
});

describe('RevealService', () => {
  let originalObserver: PropertyDescriptor | undefined;
  let originalMedia: PropertyDescriptor | undefined;
  let reducedMotion: boolean;
  let preferenceChanged: () => void;
  let intersect: IntersectionObserverCallback;
  let observerCount: number;
  let observe: jasmine.Spy;
  let unobserve: jasmine.Spy;
  let disconnect: jasmine.Spy;

  beforeEach(() => {
    originalObserver = Object.getOwnPropertyDescriptor(window, 'IntersectionObserver');
    originalMedia = Object.getOwnPropertyDescriptor(window, 'matchMedia');
    reducedMotion = false;
    observerCount = 0;
    observe = jasmine.createSpy('observe');
    unobserve = jasmine.createSpy('unobserve');
    disconnect = jasmine.createSpy('disconnect');
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      value: class {
        constructor(callback: IntersectionObserverCallback) { intersect = callback; observerCount++; }
        observe = observe;
        unobserve = unobserve;
        disconnect = disconnect;
      },
    });
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: () => ({
        get matches() { return reducedMotion; },
        addEventListener: (_event: string, listener: () => void) => { preferenceChanged = listener; },
        removeEventListener: jasmine.createSpy('removeEventListener'),
      }),
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    if (originalObserver) Object.defineProperty(window, 'IntersectionObserver', originalObserver);
    if (originalMedia) Object.defineProperty(window, 'matchMedia', originalMedia);
  });

  it('shares one observer and reveals each block only on its first intersection', () => {
    const service = TestBed.inject(RevealService);
    const first = document.createElement('div');
    const second = document.createElement('img');
    const revealFirst = jasmine.createSpy('revealFirst');
    const revealSecond = jasmine.createSpy('revealSecond');
    service.watch(first, revealFirst);
    service.watch(second, revealSecond);
    expect(observerCount).toBe(1);
    intersect([intersection(first, false)], {} as IntersectionObserver);
    expect(revealFirst).not.toHaveBeenCalled();
    const entry = intersection(first, true);
    intersect([entry], {} as IntersectionObserver);
    intersect([entry], {} as IntersectionObserver);
    expect(revealFirst).toHaveBeenCalledTimes(1);
    expect(revealSecond).not.toHaveBeenCalled();
    expect(unobserve).toHaveBeenCalledWith(first);
  });

  it('leaves content unarmed when reduced motion is already enabled', () => {
    reducedMotion = true;
    const stop = TestBed.inject(RevealService).watch(document.createElement('div'), jasmine.createSpy());
    expect(stop).toBeUndefined();
    expect(observe).not.toHaveBeenCalled();
  });

  it('reveals pending blocks when reduced motion is enabled during the visit', () => {
    const service = TestBed.inject(RevealService);
    const reveal = jasmine.createSpy('reveal');
    service.watch(document.createElement('div'), reveal);
    service.watch(document.createElement('img'), reveal);
    reducedMotion = true;
    preferenceChanged();
    expect(reveal).toHaveBeenCalledTimes(2);
  });

  it('removes destroyed blocks so late intersection events cannot reveal them', () => {
    const service = TestBed.inject(RevealService);
    const element = document.createElement('div');
    const reveal = jasmine.createSpy('reveal');
    const stop = service.watch(element, reveal)!;
    stop();
    intersect([intersection(element, true)], {} as IntersectionObserver);
    expect(reveal).not.toHaveBeenCalled();
    expect(unobserve).toHaveBeenCalledWith(element);
  });

  it('can reveal a block immediately when its controls receive focus', () => {
    const service = TestBed.inject(RevealService);
    const element = document.createElement('form');
    const reveal = jasmine.createSpy('reveal');
    service.watch(element, reveal);
    service.reveal(element);
    expect(reveal).toHaveBeenCalledTimes(1);
    expect(unobserve).toHaveBeenCalledWith(element);
  });

  it('keeps content visible without IntersectionObserver support', () => {
    Object.defineProperty(window, 'IntersectionObserver', { configurable: true, value: undefined });
    expect(TestBed.inject(RevealService).watch(document.createElement('div'), jasmine.createSpy())).toBeUndefined();
  });

  it('disconnects observation when the application is destroyed', () => {
    TestBed.inject(RevealService).watch(document.createElement('div'), jasmine.createSpy());
    TestBed.resetTestingModule();
    expect(disconnect).toHaveBeenCalledTimes(1);
  });
});
