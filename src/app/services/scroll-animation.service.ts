import { Injectable, NgZone } from '@angular/core';

export interface ScrollAnimationOptions {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ScrollAnimationService {
  private observer: IntersectionObserver | null = null;
  private observedElements = new Map<Element, {
    callback: (entry: IntersectionObserverEntry) => void,
    options: ScrollAnimationOptions
  }>();

  constructor(private ngZone: NgZone) {}

  /**
   * Initialize the Intersection Observer
   */
  private initObserver(options: ScrollAnimationOptions = {}): void {
    if (this.observer) return;

    const observerOptions = {
      root: null, // Use the viewport as the root
      rootMargin: options.rootMargin || '0px',
      threshold: options.threshold || 0.1 // Trigger when at least 10% of the element is visible
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const elementData = this.observedElements.get(entry.target);
        if (elementData) {
          this.ngZone.run(() => {
            elementData.callback(entry);

            // If the once option is true and the element is intersecting,
            // unobserve it after the callback is executed
            if (elementData.options.once && entry.isIntersecting) {
              this.unobserve(entry.target);
            }
          });
        }
      });
    }, observerOptions);
  }

  /**
   * Observe an element and execute a callback when it enters the viewport
   * @param element The element to observe
   * @param callback The callback to execute when the element enters the viewport
   * @param options Additional options for the observer
   */
  observe(
    element: Element,
    callback: (entry: IntersectionObserverEntry) => void,
    options: ScrollAnimationOptions = { once: true }
  ): void {
    this.initObserver(options);

    if (this.observer && element) {
      this.observedElements.set(element, { callback, options });
      this.observer?.observe(element);
    }
  }

  /**
   * Stop observing an element
   * @param element The element to stop observing
   */
  unobserve(element: Element): void {
    if (this.observer && element) {
      this.observer.unobserve(element);
      this.observedElements.delete(element);
    }
  }

  /**
   * Disconnect the observer and clear all observed elements
   */
  disconnect(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observedElements.clear();
      this.observer = null;
    }
  }
}
