import { NgModule } from '@angular/core';
import {CommonModule, NgIf} from '@angular/common'
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import {PhoneVerificationComponent} from './phone-verification/phone-verification.component'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    NgIf
  ],
  declarations: [LoginPage, PhoneVerificationComponent]
})
export class LoginPageModule {}
