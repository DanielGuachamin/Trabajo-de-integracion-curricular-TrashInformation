import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataApiService } from '../services/data-api.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminVerificationGuard implements CanActivate {

  constructor(private userService: UserService, private userControl: DataApiService, private router: Router) {}


  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //Si es admin muestra la ruta
    //Caso contrario lo redijire a una página 404
    return this.verifiedUserRol() as unknown as Observable<boolean | UrlTree>;
  }

  async verifiedUserRol(): Promise<Boolean>{
    const isAuth:any = await this.userService.getCurrentUser()
    const rol = await this.userControl.searchUserRol(isAuth.email)
    console.log('Desde guardian', rol)
    if(rol === 'admin'){
      return true
    }else{
      this.router.navigate(['/error-404/NoAdmin'])
      return false
    }
  }
  
}
