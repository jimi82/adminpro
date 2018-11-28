import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  uploadFile( file: File, type: string, id: string ) {

    return new Promise( (resolve, reject ) => { // Para notificar a las otras pantallas esto ha finalizado

      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append( 'imagen', file, file.name );

      xhr.onreadystatechange = function() {

        if ( xhr.readyState === 4 ) {

          if ( xhr.status === 200 ) {
            console.log( 'Image uploaded success' );
            resolve( JSON.parse( xhr.response ) );
          } else {
            console.log( 'Error uploading image' );
            reject( xhr.response );
          }

        }
      };

      const url = URL_SERVICES + '/upload/' + type + '/' + id;

      xhr.open('PUT', url, true );
      xhr.send( formData );

    });




  }

}
