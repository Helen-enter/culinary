import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CulinaryRoutingModule } from './culinary-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {CulinaryComponent} from "./culinary.component";
import {AuthorizationComponent} from "../auth/authorization/authorization.component";
import {RegistrationComponent} from "../auth/registration/registration.component";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CulinaryComponent,
    AuthorizationComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    CulinaryRoutingModule,
    FormsModule,
    InputTextModule,
  ]
})
export class CulinaryModule { }
