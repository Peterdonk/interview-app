import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninModel } from 'src/app/model/auth.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // login model for sign
  loginModel = {} as SigninModel;

  // login form group
  signInForm: FormGroup | any;
  submitted = false;

  /**
   * constructor for component all dependencies injected here
   */
  constructor(
    private formBuilder: FormBuilder,
    private storage: StorageService,
    private router: Router
  ) {}

  /**
   * Init life cycle hook
   */
  ngOnInit(): void {
    this.buildForm();
  }

  /**
   * form build for sign for
   */
  buildForm(): void {
    this.signInForm = this.formBuilder.group({
      email: [
        this.loginModel.email,
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        this.loginModel.password,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      remember: [],
    });
  }

  /**
   * On submit form to get data
   */
  onSubmit(): void {
    this.submitted = true;
    if (this.signInForm.invalid) {
      return;
    }
    console.log('this.', this.signInForm.value);
    this.storage.setUser('auth', this.signInForm.value);
    this.router.navigate(['/profile']);
  }

  /**
   * form control method
   *  @returns Sign In form controls
   */
  get formControl(): any {
    return this.signInForm.controls;
  }
}
