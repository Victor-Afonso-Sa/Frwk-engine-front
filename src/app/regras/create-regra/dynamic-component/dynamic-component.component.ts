import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EscopoClassComponent } from '../EscopoClass.component';

@Component({
  selector: 'dynamic-app',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['../styleEscopo.css', './dynamic-component.component.scss'],
})
export class DynamicComponentComponent
  extends EscopoClassComponent
  implements OnInit, AfterViewInit {}
