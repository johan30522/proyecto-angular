import { Directive, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Directive()
export abstract class AbstractForm implements OnInit {
  public form: FormGroup;
  public submitAttempt: boolean;
  public errorMsg: string;
  public loading: boolean;

  constructor(protected readonly formbuilder: FormBuilder) {}

  ngOnInit(){
    this.initForm();
  }

  protected abstract initForm(): void;

  public isFieldValid(field: string): boolean {
    return this.form.controls[field].valid || !this.submitAttempt;
  }

  public isGroupFieldValid(field: string, group: string): boolean{
    const formGroup = this.form.controls[group] as FormGroup;
    return formGroup.controls[field].valid || !this.submitAttempt;
  }
}
