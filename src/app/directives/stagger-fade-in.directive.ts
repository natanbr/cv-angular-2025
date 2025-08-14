import { Directive, ElementRef, NgZone } from '@angular/core';
import { ScrollAnimationService } from '../services/scroll-animation.service';
import { ScrollAnimationBaseDirective } from './scroll-animation-base.directive';

@Directive({
  selector: '[staggerFadeIn]',
  standalone: true
})
export class StaggerFadeInDirective extends ScrollAnimationBaseDirective {
  constructor(
    protected override elementRef: ElementRef,
    protected override scrollAnimationService: ScrollAnimationService,
    protected override ngZone: NgZone
  ) {
    super(elementRef, scrollAnimationService, ngZone);
    this.animationClass = 'stagger-fade-in';
    this.threshold = 0.15;
    this.rootMargin = '0px 0px -50px 0px';
  }
}
