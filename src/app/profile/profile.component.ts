import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { AuthGuardService } from '../authguard.service'

import { Result } from '../result';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private dataService:DataService) {

    }
  
    myresult1: Result;
    myresult2: Result;
    myresult3: Result;

    ngOnInit() {
      this.myresult1 = this.dataService.getMyLookupData();
      this.getUserSettings();
      this.getUserData();
    }
  
    getUserData() {
      this.dataService.getUserData()
      .then(myresult3 => this.process((myresult3)));
     }

    getUserSettings() {
       this.dataService.getUserSettings()
      .subscribe(myresult2 => this.myresult2 = myresult2);
    }
     
     process(res: any) {
      this.myresult3 = new Result();

      this.myresult3 = this.dataService.results3;
      return this.myresult3;
    }
 }
  