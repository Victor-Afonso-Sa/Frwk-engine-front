import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';
import * as autosize from 'autosize';
@Directive({
  selector: '[autosize]',
})
export class AutosizeDirective implements OnInit, OnDestroy {
  @Input('autosize')
  enabled: boolean = true;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.enabled) autosize(this.el.nativeElement);
  }

  public update() {
    if (this.enabled) {
      // We need to skip a tick to make this work.
      window.setTimeout(() => {
        (<any>autosize).update(this.el.nativeElement);
      }, 0);
    }
  }

  ngOnDestroy(): void {
    (<any>autosize).destroy(this.el.nativeElement);
  }
}
