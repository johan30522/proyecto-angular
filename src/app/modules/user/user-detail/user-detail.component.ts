import { Component, OnInit } from '@angular/core';

import { UserProfile } from '../../../shared/models/user.profile.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';
import { PermissionsService } from '../../../core/services/permissions/permissions.service';
import { User } from '../../../shared/models/user';
import { UserProfileService } from '../../../core/data-services/users/user-profile.service';
import { faDoorOpen, faArrowCircleLeft, faCalendar, faDownload } from '@fortawesome/free-solid-svg-icons';
import { AbstractForm } from '../../../shared/components/abstract/abstract-form';
import { Location } from '@angular/common';
import { UploadFileService } from '../../../core/data-services/upload-file/upload-file.service';
import { CONFIG } from 'src/app/config';

@Component({
  selector: 'reclutamiento-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent extends AbstractForm implements OnInit {
  public userProfile: UserProfile;
  public currentUser: User;
  public isEdiMode: boolean;
  public active = 1;
  public isEditUser: boolean;
  faDorOpen = faDoorOpen;
  faarrow = faArrowCircleLeft;
  faCalendar = faCalendar;
  faDownload=faDownload;
  public form: FormGroup;
  public apiPath = `${CONFIG.apiUploadFile}/imagen/usuario`;
  public urlFile:string;


  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly userProfileService: UserProfileService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private readonly router: Router,
    public permissionsService: PermissionsService,
    private authenticationService: AuthenticationService,
    private location: Location,
    private uploadFileService: UploadFileService

  ) {
    super(formBuilder);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
  protected initForm(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      birthDate: [null, [Validators.required]],
      telephone: [null, [Validators.required]],
      file: [null],
      fileSource: [null],
    });
    this.form.patchValue({
      file: ''
    });
    this.isEdiMode = false;
    this.getUserProfile();
    this.currentUser = this.authenticationService.getLoggedUser();
    

  }

  private getUserProfile(): void {
    //this.user = this.authenticationService.getLoggedUser();
    const userId: number = +this.activatedRoute.snapshot.params['userId'];
    console.log(`el id de usuario logueado es ${userId}`);
    this.userProfileService.getUserProfile(userId).subscribe((result) => {
      this.userProfile = result;
      this.patchValueForm();
      this.isEdiMode = true;
      //verifica si el usuario actual es el mismo duenno del profile
      this.isEditUser = this.currentUser.id == this.userProfile.idUser ? true : false;
      //arma la url de descarga del archivo
      this.urlFile=`${this.apiPath}/${this.userProfile.fileName}/?${this.authenticationService.getToken()}`;
      console.log(this.urlFile);
      console.log(this.isEditUser);
    },

      (error) => {

        if (error.status == 404) {
          this.isEdiMode = false
          console.log(error);
        } else {
          console.log(error);
          this.toastr.error(error);
        }
      }
    )
  }

  onFileChange(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource: file
      });
    }
  }
  private patchValueForm(): void {
    this.form.patchValue(this.userProfile);
  }
  public goback(): void {
    this.location.back();
  }

  public save(): void {

    this.submitAttempt = true;
    if (!this.form.valid) {
      console.log('no pasa validaciones');
      return;
    }
    const formData = new FormData();
    formData.append('archivo', this.form.get('fileSource').value);

    this.uploadFileService.uploadUserCV(formData, this.currentUser.id).subscribe((result) => {
      let userProf: UserProfile = this.form.value;
      userProf.idUser = this.currentUser.id;
      delete userProf.file;
       userProf.fileName=result.usuario.img;
       console.log(result);
      const action = this.isEdiMode
      ? this.userProfileService.editUser({ ...userProf, id: this.userProfile.id })
      : this.userProfileService.createUserProfile(userProf);
    action.subscribe(() => {
      const message = this.isEdiMode ? 'Profile Edited Successfully' : 'Profile Created Successfully'
      this.toastr.success(message); 
    });
    });

  }

}
