import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ModalsServicesService } from './modals/modals-services.service';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title;
  openModulo = false;
  pastas = [];
  modelos = [];
  @Output() stateModel = new EventEmitter();
  constructor(
    private modalService: ModalsServicesService,
    private shared: SharedService,
    private router: Router
  ) {}
  ngOnInit(): void {}
}
