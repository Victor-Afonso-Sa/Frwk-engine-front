import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DeactivateIt } from './DeactivateIt';
@Injectable({
  providedIn: 'root'
})
export class ChangeGuard implements CanDeactivate<DeactivateIt> {
  canDeactivate(
    component: DeactivateIt,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.podeDesativar();
  }

}
