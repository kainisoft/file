import {Component, ViewEncapsulation} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'classy-layout',
  templateUrl: 'classy.component.html',
  styleUrls: ['classy.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [RouterOutlet]
})
export class ClassyLayoutComponent {

}
