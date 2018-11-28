import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor (
    public _userService: UserService,
    public router: Router) {}
  canActivate( ) {

    if (this._userService.checkUserLogin()) {
      console.log('In Guard');
      return true;
    } else {
      console.log('Out Guard');
      this.router.navigate(['/login']);
      return false;
    }

  }
}
