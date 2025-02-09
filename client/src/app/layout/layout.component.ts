import { Component, ViewEncapsulation } from '@angular/core';
import { ClassyLayoutComponent } from './classy/classy.component';
import { EmptyLayoutComponent } from './empty/empty.component';

@Component({
    selector: 'layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.scss'],
    imports: [EmptyLayoutComponent, ClassyLayoutComponent],
    encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent {
    layout: string = 'classy';
}
