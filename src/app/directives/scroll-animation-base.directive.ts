import { Directive, ElementRef, OnInit, OnDestroy, AfterViewInit, Input, NgZone } from '@angular/core';
import { ScrollAnimationService, ScrollAnimationOptions } from '../services/scroll-animation.service';

@Directive()
export abstract class ScrollAnimationBaseDirective implements OnInit, OnDestroy, AfterViewInit {
  @Input() animationClass: string = '';
  @Input() threshold: number = 0.1;
  @Input() rootMargin: string = '0px';
  @Input() once: boolean = true;

  constructor(
    protected elementRef: ElementRef,
    protected scrollAnimationService: ScrollAnimationService,
    protected ngZone: NgZone
  ) {}

  ngOnInit(): void {
    // Add the animation class to the element
    if (this.animationClass) {
      this.elementRef.nativeElement.classList.add(this.animationClass);
    }
  }

  ngAfterViewInit(): void {
    // Observe the element for scroll animation
    this.observeElement();
  }

  ngOnDestroy(): void {
    // Clean up by unobserving the element
    this.scrollAnimationService.unobserve(this.elementRef.nativeElement);
  }

  protected observeElement(): void {
    const options: ScrollAnimationOptions = {
      threshold: this.threshold,
      rootMargin: this.rootMargin,
      once: this.once
    };

    this.scrollAnimationService.observe(
      this.elementRef.nativeElement,
      (entry) => {
        if (entry.isIntersecting) {
          this.ngZone.run(() => {
            this.onIntersection(entry);
          });
        }
      },
      options
    );
  }

  protected onIntersection(entry: IntersectionObserverEntry): void {
    this.elementRef.nativeElement.classList.add('visible');
  }
}
