import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor/auth-interceptor.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    HeaderComponent, 
    FooterComponent,
    ReactiveFormsModule,
    SweetAlert2Module,
    FontAwesomeModule
  ],
  providers:[
    {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptorService,
    multi:true
    }
  ]
})
export class CoreModule { }
