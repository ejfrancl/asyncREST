import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }      from './login/login.component';
import { DocumentComponent }      from './document/document.component';
import { ProfileComponent }      from './profile/profile.component';
import { AuthGuardService} from './authguard.service'

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'document', component: DocumentComponent, canActivate: [AuthGuardService]  },
  { path: 'login', component: LoginComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}