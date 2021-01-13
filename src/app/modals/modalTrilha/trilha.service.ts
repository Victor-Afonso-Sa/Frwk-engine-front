import { HttpClient } from '@angular/common/http';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  Injector,
} from '@angular/core';
import { map, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrilhaService {
  readonly URI = environment.BANCO + '/trilhas';
  id = 0;
  constructor(
    private http: HttpClient,
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  getTrilhaById(id) {
    return this.http.get(this.URI + `/${id}`).pipe(take(1));
  }
  getTrilhaByIdtrilha(idtrilha) {
    return this.http.get(this.URI + `/idtrilha/${idtrilha}`).pipe(take(1));
  }
  getTrilhas(idregra) {
    return this.getTrilhaById(idregra).pipe(
      map((trilha: Array<any>) => {
        for (let index = 0; index < trilha.length; index++) {
          const element = trilha[index];
          element[`jsonexecucao`] = JSON.parse(element[`jsonexecucao`]);
        }
        return trilha;
      })
    );
  }
  excluirTrilha(id) {
    const obj = { params: { idtrilha: id } };
    return this.http.delete(this.URI, obj).pipe(take(1));
  }
  excluirTrilhaByIdRegra(idregra) {
    return this.http.delete(this.URI +`/${idregra}`).pipe(take(1));
  }
  showEscopo(tipo, where, jsonexecutor) {
    let factory;
    let t = this.setComponente(tipo);
    if (t) {
      // factory = this.componentFactoryResolver.resolveComponentFactory(t);
      const dynamic = document.createElement(tipo);
      const dynamicComponentRef = factory.create(this.injector, [], dynamic);
      this.applicationRef.attachView(dynamicComponentRef.hostView);
      document.getElementById(where.toString()).appendChild(dynamic);
      this.id += 1;
    }
  }
  setComponente(tipo) {
    return 0;
  }
}
