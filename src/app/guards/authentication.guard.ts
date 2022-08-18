import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { DataApiService } from '../services/data-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //Si está loggeado muestra la ruta
    //Caso contrario lo redijire a una página 404
    return this.getUserAuth() as unknown as Observable<boolean | UrlTree>
      
  }

  async getUserAuth(): Promise<Boolean>{
    const isAuth:any = await this.userService.getCurrentUser()
    console.log('Estado de usuario desde guard',isAuth)
    if(isAuth){
      return true
    }
    this.router.navigate(['/error-404/NoAuth'])
    return false
  }

  
}
