import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Regra } from '../regras/regra';
import { RegrasService } from '../regras/regras.service';

@Injectable({ providedIn: 'root' })
export class RegrasResolver implements Resolve<Regra> {
  constructor(private service: RegrasService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const id = route.params.edit;
    return this.service.getOneRegra(id).pipe(
      map((data: Array<any>) => {
        if (data) {
          data['schemaregras'] = JSON.parse(data['schemaregras']);
          return data;
        } else {
          this.router.navigate([
            { outlets: { primary: [`regras`], dash: null } },
          ]);
          return EMPTY;
        }
      }),
      catchError(() => {
        this.router.navigate([
          { outlets: { primary: [`regras`], dash: null } },
        ]);
        return EMPTY;
      })
    );
  }
}
