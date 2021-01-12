import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trilha',
  templateUrl: './trilha.component.html',
  styleUrls: ['./trilha.component.scss'],
})
export class TrilhaComponent implements OnInit, AfterViewChecked {
  isCollapseDetailAtribuicao = true;
  @Input() jsonExecucao;

  @Input() display;
  constructor(
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {}

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }
  ngOnInit() {}

  trilhaExecutada(id) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(
        [{ outlets: { primary: [`executado`, id], dash: null } }],
        { replaceUrl: true, skipLocationChange: true }
      )
    );
    window.open(url, '_blank');
  }
}
