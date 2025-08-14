import { Directive, ElementRef, NgZone } from '@angular/core';
import { ScrollAnimationService } from '../services/scroll-animation.service';
import { ScrollAnimationBaseDirective } from './scroll-animation-base.directive';

@Directive({
  selector: '[fadeInBottom]',
  standalone: true
})
export class FadeInBottomDirective extends ScrollAnimationBaseDirective {
  constructor(
    protected override elementRef: ElementRef,
    protected override scrollAnimationService: ScrollAnimationService,
    protected override ngZone: NgZone
  ) {
    super(elementRef, scrollAnimationService, ngZone);
    this.animationClass = 'fade-in-bottom';
    this.threshold = 0.2;
    this.rootMargin = '0px 0px -100px 0px';
  }
}
