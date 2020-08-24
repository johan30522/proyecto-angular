import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from '../../../shared/models/credentials.model';
import { faSign, faDoorOpen, faUnlock,faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../../shared/models/user';
import { ToastrService } from 'ngx-toastr';
import { UserAvailableService } from './../../../core/data-services/available-new-user/available-user.service';
import { EmailAvailableService } from './../../../core/data-services/available-new-user/available-email.service';
import { UserService } from '../../../core/data-services/users/user.service';

@Component({
  selector: 'reclutamiento-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public credentials: Credentials = new Credentials();
  public errorMsg: string = '';
  public submitted: boolean;
  public user: NewUser

  faSign = faSign;
  faDorOpen = faDoorOpen;
  faUnlock = faUnlock;
  faarrow=faArrowCircleLeft;

  constructor(
    private toastr: ToastrService,
    private readonly validUserService: UserAvailableService,
    private readonly validEmailService: EmailAvailableService,
    private readonly userService: UserService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.user = {
      username: '',
      email: '',
      password: '',
      uiConfirmPassword: '',
      role:'user'
    };
  }
  public onSubmit(form) {
    console.log('intenta login');

    this.submitted = true;
    this.errorMsg = '';
    if (!form.valid) {
      return;
    }

    this.validEmailService.isValidEmail(form.value.email).subscribe(
      (result) => {
        if (result.valid === "true") {

          this.validUserService.isValidUsername(form.value.username).subscribe(
            (result) => {
              if (result.valid === "true") {
                let user:User=form.value;
                console.log(user);
                user.role='user';
                this.userService.createUser(user).subscribe(()=>{
                  this.toastr.success('User Created');
                  this.router.navigateByUrl('/');
                })
              }else{
                this.toastr.error('The user is already registered');
                return;
              }
            },
            (error) => {
              this.toastr.error(error);
              return;
            }
          )
        }else{
          this.toastr.error('The email is already registered');
          return;
        }
      },
      (error) => {
        this.toastr.error(error);
        return;
      }
    )
  }
}
export interface NewUser {
  username: string;
  email: string;
  password: string;
  uiConfirmPassword: string;
  role:string
} 
