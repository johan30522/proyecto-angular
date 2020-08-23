import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../../../core/services/calculator.service';
import { Router } from '@angular/router';
import { Credentials } from '../../../shared/models/credentials.model';
import { SecurityService } from '../../../core/data-services/security/security.service';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';
import { faUser, faSave, faSign,faDoorOpen,faUnlock } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'reclutamiento-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public credentials: Credentials = new Credentials();
  public errorMsg: string = '';
  public submitted: boolean;

  public sumResult: number;

  faCoffee = faUser;
  faSign=faSign;
  faSave=faSave;
  faDorOpen=faDoorOpen;
  faUnlock=faUnlock;

  constructor(
    private readonly test: CalculatorService,
    private readonly authenticationService: AuthenticationService, 
    private readonly router: Router,
    tpastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.sumResult = this.test.sum(9, 20);
  }

  public login(form) {
    this.submitted = true;
    this.errorMsg = '';
    if (!form.valid) {
      return;
    }

    this.authenticationService
      .login(this.credentials)
      .then(() => {
        this.router.navigateByUrl('/dashboard');
      })
      .catch((error) => {
        console.log('entra error');
        this.errorMsg = error.message;
      });
  }
}
