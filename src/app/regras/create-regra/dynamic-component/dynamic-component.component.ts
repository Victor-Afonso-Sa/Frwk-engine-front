import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ConfirmService } from 'src/app/modals/modal-confirm/confirm.service';
import { NewVarService } from 'src/app/modals/modal-new-var/new-var.service';

import { OptionService } from 'src/app/modals/modal-regra-option/option.service';
import { ModalsServicesService } from 'src/app/modals/modals-services.service';
import { RegrasService } from '../../regras.service';
import { EscopoClassComponent } from '../EscopoClass.component';
@Component({
  selector: 'dynamic-app',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['../styleEscopo.css', './dynamic-component.component.scss'],
})
export class DynamicComponentComponent
  extends EscopoClassComponent
  implements OnInit, AfterViewInit {

}
