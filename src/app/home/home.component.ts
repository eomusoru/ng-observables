import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  nbObs: Subscription;
  cstmObs: Subscription;

  constructor() { }

  ngOnInit() {
    // Pass an observable to another observable through Observable operator map
    const numbersObservable = Observable.interval(1000).map(
      (data: number) => {
        return data * 2;
      }
    );

    this.nbObs = numbersObservable.subscribe(
      (number: number)=>{
        console.log(number);
      }
    );

    const myCustomObservable = Observable.create((observer: Observer<string>) => {
        setTimeout(()=>{
          observer.next('first package');
        }, 2000);

        setTimeout(()=>{
          observer.next('seecond package');
        }, 4000);

        setTimeout(()=>{
          // observer.error('error package');
          observer.complete();
        }, 5000);

      }
    );

    this.cstmObs = myCustomObservable.subscribe(
      (data: string) => { console.log(data); },
      (error: string) => { console.log(error); },
      () => { console.log('Completed'); }
    );
   }

   ngOnDestroy() {
     //Called once, before the instance is destroyed.
     //Add 'implements OnDestroy' to the class.
     this.cstmObs.unsubscribe();
     this.nbObs.unsubscribe();
   }
}
