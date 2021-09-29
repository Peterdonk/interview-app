import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RegisterModel } from 'src/app/model/auth.model';
import { StorageService } from 'src/app/services/storage.service';
import { ConfirmPasswordValidator } from 'src/app/validators/confirm-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  // login model for sign
  registerModel = {} as RegisterModel;
  reg = new RegExp('^[0-9]+$');

  // login form group
  registerForm: FormGroup | any;
  submitted = false;

  /**
   * constructor for component all dependencies injected here
   */
  constructor(
    private formBuilder: FormBuilder,
    private storage: StorageService,
    private router: Router
  ) {
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, '', window.location.href);
    };
  }

  /**
   * Init life cycle hook
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */
  ngOnInit(): void {
    this.buildForm();
  }

  /**
   * form build for sign for
   */
  buildForm(): void {
    this.registerForm = this.formBuilder.group(
      {
        email: [
          this.registerModel.email,
          Validators.compose([Validators.required, Validators.email]),
        ],
        password: [
          this.registerModel.password,
          Validators.compose([Validators.required, Validators.minLength(8)]),
        ],
        fullName: [
          this.registerModel.fullName,
          Validators.compose([Validators.required]),
        ],

        phoneNumber: [
          this.registerModel.phoneNumber,
          Validators.compose([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern(this.reg),
          ]),
        ],
        confirmPassword: [this.registerModel.confirmPassword],
      },
      {
        validator: ConfirmPasswordValidator('password', 'confirmPassword'),
      }
    );
  }

  /**
   * On submit form to get data
   */
  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    console.log('this.', this.registerForm.value);
    this.storage.setUser('user', this.registerForm.value);
    this.router.navigate(['/profile']);
  }

  /**
   * form control method
   *  @returns Sign In form controls
   */
  get formControl(): any {
    return this.registerForm.controls;
  }
}
