import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { URL_SERVICES } from '../../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';

@Injectable()
export class UserService {

  user: User;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _uploadFileService: UploadFileService) {
      this.loadFromLocalStorage();
  }

  checkUserLogin() {
    return ( this.token.length > 5 ) ? true : false;
  }

  loadFromLocalStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.user = null;
    }

  }

  storeInLocalStorage( id: string, token: string, user: User ) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(user) );

    this.user = user;
    this.token = token;
  }

  logout() {
    this.user = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  login(user: User, rememberme: boolean = false ) {

    if (rememberme) {
      localStorage.setItem('email', user.email);

    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICES +  '/login';
    return this.http.post( url, user )
    .map( (resp: any) => {

      this.storeInLocalStorage( resp.id, resp.token, resp.usuario );

      return true;
    });
  }

  createUser(user: User) {

    const url = URL_SERVICES +  '/usuario';

    console.log ('Name ' + user.nombre);
    console.log ('Email ' + user.email);
    console.log ('Pass ' + user.password);

    return this.http.post( url, user )
      .map( (resp: any) => {

        swal('User created', user.email, 'success' );
        return resp.user;

    });

   }

   updateUser( user: User ) {

    let url = URL_SERVICES + '/usuario/' + user._id;
    url += '?token=' + this.token;

    return this.http.put( url, user )
                .map( (resp: any) => {

                  // this.usuario = resp.usuario;
                  const userDB: User = resp.usuario;

                  this.storeInLocalStorage( userDB._id, this.token, userDB );
                  swal('User updated', user.nombre, 'success' );

                  return true;
                });

  }


  changeImage( file: File, id: string ) {

    this._uploadFileService.uploadFile( file, 'usuarios', id )
          .then( (resp: any) => {

            this.user.img = resp.usuario.img;
            swal( 'Updated Image', this.user.nombre, 'success' );
            this.storeInLocalStorage( id, this.token, this.user );

          })
          .catch( resp => {
            console.log( resp );
          }) ;

  }

}

