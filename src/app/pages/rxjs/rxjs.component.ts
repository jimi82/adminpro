import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  suscription: Subscription;

  constructor() {

  this.suscription =  this.returnObservable().subscribe (
      number => { console.log ('Subs ', number); },
      error => { console.error ('Error ', error); },
      () => { console.log ('Finish '); }
      );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

  returnObservable(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {
      let counter = 0;

      const interval = setInterval (() => {
        counter += 1;

        const output = {
          value: counter
        };

        observer.next (output);

/*         if (counter === 3) {
          clearInterval(interval);
          observer.complete();
        } */
        /* if (counter === 2) {
          // clearInterval(interval);
          observer.error('An error has ocurred');
        } */
      }, 1000);

    }).pipe(
      map(resp => resp.value),
      filter( ( value, index ) => {

        if ((value % 2) === 1) {
          return true;
        } else {
          return false;
        }

      })
    );
  }
}
