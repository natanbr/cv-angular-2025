import { Directive, ElementRef, NgZone, Input, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ScrollAnimationService, ScrollAnimationOptions } from '../services/scroll-animation.service';

@Directive({
  selector: '[staggerChildren]',
  standalone: true
})
export class StaggerChildrenDirective implements OnInit, OnDestroy, AfterViewInit {
  @Input() childSelector: string = '.experience-card';
  @Input() animationClass: string = 'stagger-fade-in';
  @Input() threshold: number = 0.15;
  @Input() rootMargin: string = '0px 0px -50px 0px';
  @Input() once: boolean = true;

  private childElements: Element[] = [];

  constructor(
    private elementRef: ElementRef,
    private scrollAnimationService: ScrollAnimationService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    // Find all child elements matching the selector
    this.childElements = Array.from(
      this.elementRef.nativeElement.querySelectorAll(this.childSelector)
    );

    // Add the animation class to each child element
    this.childElements.forEach(element => {
      element.classList.add(this.animationClass);
    });
  }

  ngAfterViewInit(): void {
    // Observe each child element for scroll animation
    this.observeElements();
  }

  ngOnDestroy(): void {
    // Clean up by unobserving all child elements
    this.childElements.forEach(element => {
      this.scrollAnimationService.unobserve(element);
    });
  }

  private observeElements(): void {
    const options: ScrollAnimationOptions = {
      threshold: this.threshold,
      rootMargin: this.rootMargin,
      once: this.once
    };

    this.childElements.forEach(element => {
      this.scrollAnimationService.observe(
        element,
        (entry) => {
          if (entry.isIntersecting) {
            this.ngZone.run(() => {
              element.classList.add('visible');
            });
          }
        },
        options
      );
    });
  }
}
