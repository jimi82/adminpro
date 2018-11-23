import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {

    this.counterThree().then(
      mensaje => {console.log('End ', mensaje); })
      .catch(
        error => {console.error('Promise error', error); }
      );
  }

  ngOnInit() {
  }

  counterThree(): Promise<boolean> {

    const promise: Promise<boolean> = new Promise ( (resolve, reject) => {

      let counter = 0;

      const interval = setInterval( ( ) => {
        counter += 1;
        console.log(counter);
        if (counter === 3) {
          resolve(true);
          clearInterval(interval);
        }
      }, 1000 );
    });

    return promise;
  }
}
