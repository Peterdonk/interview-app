import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterModel } from '../model/auth.model';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: StorageService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | any {
    this.store.getUser('user').subscribe((res: any) => {
      console.log(res);
      if (res && Object.keys(res).length === 0) {
        alert('Please register to see your profile');
        this.router.navigate(['auth/login']);
        return false;
      } else {
        return true;
      }
    });
    return true;
  }
}
