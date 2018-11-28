import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;
  uploadImage: File;
  tempImage: string;

  constructor(public _userService: UserService) { }

  ngOnInit() {
    this.user = this._userService.user;
  }


  submit( user: User ) {

    this.user.nombre = user.nombre;
    if ( !this.user.google ) {
      this.user.email = user.email;
    }

    this._userService.updateUser( this.user )
                .subscribe();

  }

  selectImage( file: File ) {

    if ( !file ) {
      this.uploadImage = null;
      return;
    }

    if ( file.type.indexOf('image') < 0 ) {
      swal('Only images', 'The file is not an image', 'error');
      this.uploadImage = null;
      return;
    }

    this.uploadImage = file;

    const reader = new FileReader();
    const urlTempImage = reader.readAsDataURL( file );

    reader.onloadend = () => this.tempImage = reader.result.toString();

  }

  changeImage() {

    this._userService.changeImage( this.uploadImage, this.user._id );

  }
}
