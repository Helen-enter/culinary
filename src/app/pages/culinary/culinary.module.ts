import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CulinaryRoutingModule } from './culinary-routing.module';
import { FooterComponent } from './footer/footer.component';
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {CulinaryComponent} from "./culinary.component";
import {AuthorizationComponent} from "../auth/authorization/authorization.component";
import {RegistrationComponent} from "../auth/registration/registration.component";
import { HeaderComponent } from './header/header.component';
import {TabViewModule} from "primeng/tabview";
import { CulinaryModalComponent } from './culinary-modal/culinary-modal.component';
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {InputTextareaModule} from "primeng/inputtextarea";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CulinaryComponent,
    AuthorizationComponent,
    RegistrationComponent,
    CulinaryModalComponent,
  ],
    exports: [
        HeaderComponent,
        CulinaryModalComponent
    ],
    imports: [
        CommonModule,
        CulinaryRoutingModule,
        FormsModule,
        InputTextModule,
        TabViewModule,
        ToastModule,
        InputTextareaModule,
    ],
  providers: [
    MessageService
  ]
})
export class CulinaryModule { }
