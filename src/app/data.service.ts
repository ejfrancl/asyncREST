import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/toPromise';
import { delay, share } from 'rxjs/operators';

import { Result } from './result';
import { MessageService } from './message.service'
import { AuthGuardService } from './authguard.service'

@Injectable()
export class DataService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
     ) { 
  }

  results1 = new Result();
  results2 = new Result();
  results3: Result;
  results4: Result;
  
  getMyLookupData() {
    var data = "function=get_lookups&session=" + sessionStorage.getItem('currentSession') +
                  "&token=" + sessionStorage.getItem('currentToken');
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    //this.log(data);
    this.http.post('https://dfe.wittkieffer.com/api/', 
    data, 
     {
      headers: headers,
      responseType: 'text'
      }
    )
    .pipe(
      tap(result => this.log(`get_lookups() success:` + data)),
      catchError(this.handleError('get_lookups() error', [])),
    )
    .subscribe(
      myres => {
        this.results1.val = myres.toString();
        return this.results1;
      },
      err => {
        console.log("Error occured");
        return this.results1;
      }
    );
    return this.results1;
  }

  getUserSettings(): Observable<Result> {
    var data = "function=get_user_settings&session=" + sessionStorage.getItem('currentSession') +
                  "&token=" + sessionStorage.getItem('currentToken');
    const headers = new HttpHeaders()
   .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    //this.log(data);
    this.http.post('https://dfe.wittkieffer.com/api/', 
    data, 
     {
      headers: headers,
      responseType: 'text'
      }
    )
    .pipe(
      tap(result => this.log(`get_user_settings() success:` + data)),
     // catchError(this.handleError('get_user_settings() error', [])).apply
      catchError(this.handleError('get_user_settings() error', [])),
      delay(4000)
    )
    .subscribe(
      myres => {
        this.results2.val = myres.toString();
        return of(this.results2);
      },
      err => {
        console.log("Error occured");
        return of(this.results2);
      }
    );
    return of(this.results2);
  }

  getUserData() {
    let promise = new Promise((resolve, reject) => {
      var data = "function=get_user_data&session=" + sessionStorage.getItem('currentSession') +
      "&token=" + sessionStorage.getItem('currentToken');
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    //this.log(data);
    this.http.post('https://dfe.wittkieffer.com/api/', 
    data, 
     {
      headers: headers,
      responseType: 'text'
      }
    )
    .pipe(
      tap(result => this.log(`get_user_data() success:` + data)),
      catchError(this.handleError('get_user_data() error', []))
      //delay(4000)
    )
  .toPromise()
    .then(
       myres => { // Success
        this.results3 = new Result();
        this.results3.val = myres.toString();
        resolve();
      },
      msg => { // Error
        reject(msg);
      }
  )
  .then(myres => this.process(this.results3.val))
  });
   return promise;
}

process(res: string) {
  this.results3.val = res;
  return this.results3;
}
processB(res: string) {
  this.results4.val = res;
  return this.results4;
}

login(id:string, pwd:string) {
  let promise = new Promise((resolve, reject) => {
  var data = "function=login&user=" + id + "&password=" + pwd;
  const headers = new HttpHeaders()
  .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  this.log(id + pwd);
  this.http.post('https://dfe.wittkieffer.com/api/', 
  data, 
   {
    headers: headers,
    responseType: 'text'
    }
  )
  .pipe(
    tap(result => this.log(`login() success:` + data)),
    catchError(this.handleError('login() error', []))    
//    delay(4000)
  )
.toPromise()
  .then(
     myres => { // Success
      this.results4 = new Result();
      this.results4.val = myres.toString();
      resolve();
    },
    msg => { // Error
      reject(msg);
    }
)
.then(myres => this.processB(this.results4.val))
});
 return promise;
}

    /** Log a PortalService message with the MessageService */
  private log(message: string) {
    this.messageService.add('PortalService: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
    
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
    
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}


