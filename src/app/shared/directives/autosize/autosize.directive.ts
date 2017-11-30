import { Directive, ElementRef } from '@angular/core';
import '../../../../../node_modules/autosize/dist/autosize.js';

declare var autosize: any;

@Directive ({
    selector: '[Autosize]'
})

export class AutosizeDirective {
    constructor (private el: ElementRef) { }

    ngOnInit() {
        let initAutosize = $(this.el.nativeElement);

        autosize(initAutosize);
    }
}
