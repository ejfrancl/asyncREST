import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { AuthGuardService } from '../authguard.service'

import { Result } from '../result';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dataService:DataService, 
    private authGuardService: AuthGuardService
  ) {

  }

  myresult4 = new Result();
  session:string = '';
  token:string = '';

  ngOnInit() {
  //  var newWindow = window.open('some_url');
   window.open("data:application/text;base64," + 'VGhlIGNvbnRlbnRzIG9mIGEgdGVzdCBmaWxlLg==');
  }

  processB(res: any) {

    this.myresult4 = this.dataService.results4;
    this.authGuardService.isLoggedIn = false;
    if (this.myresult4.val.includes('"status":"SUCCESS"')) {
        this.authGuardService.isLoggedIn = true;
        console.log(JSON.parse(this.myresult4.val))
        this.session = JSON.parse(this.myresult4.val).result.data.session
        this.token = JSON.parse(this.myresult4.val).result.data.token
        sessionStorage.setItem('currentSession',(this.session))
        sessionStorage.setItem('currentToken',(this.token))
        console.log(sessionStorage)
    }else{
        this.authGuardService.isLoggedIn = false;
    }
    return this.myresult4;
  }

  login(id:string, pwd:string): void {
    this.dataService.login(id, pwd)
    .then(myresult4 => this.processB((myresult4)));;
  }  
}

