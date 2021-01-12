import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { TrilhaService } from '../../trilha.service';

@Component({
  selector: 'app-AllpageTrilha',
  templateUrl: './AllpageTrilha.component.html',
  styleUrls: ['./AllpageTrilha.component.scss']
})
export class AllpageTrilhaComponent implements OnInit {

  @Input() jsonExecucao;
  idtrilha;
  display = false;
  error = true;
  constructor(private active: ActivatedRoute,private trilhaService: TrilhaService) { }

  ngOnInit() {
    this.idtrilha = this.active.snapshot.params.idtrilha;
    if(this.idtrilha){
      this.trilhaService.getTrilhaByIdtrilha(this.idtrilha)
      .pipe(map(trilha => JSON.parse(trilha['jsonexecucao'])),)
      .subscribe(
        (json)=>{ this.jsonExecucao = json;},
        (e) => {this.error = true;},
        () => this.display = true
      );
    }

  }

}
