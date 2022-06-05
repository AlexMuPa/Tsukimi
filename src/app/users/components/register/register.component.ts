import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { SharingService } from 'src/app/services/sharing.service';
import { UserDTO } from '../../models/user.dto';
import { UserService } from '../../services/user.service';
import { passwordMatching } from '../../validators/match-password';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerUser: UserDTO;

  userName: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;

  registerForm: FormGroup;
  isValidForm: boolean | null;
  errorMessage: string | null;
  showResponse: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private sharingService: SharingService
  ) {
    this.registerUser = new UserDTO('', '', '');

    this.isValidForm = null;
    this.errorMessage = null;
    this.showResponse = false;

    this.userName = new FormControl(this.registerUser.userName, [
      Validators.required,
      Validators.maxLength(40)
    ]);

    this.email = new FormControl(this.registerUser.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl(this.registerUser.password, [
      Validators.required,
      Validators.minLength(8),
    ]);
    this.confirmPassword = new FormControl(this.registerUser.password, [
      Validators.required
    ]);

    this.registerForm = this.formBuilder.group({
      userName: this.userName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    }, { validators: passwordMatching() });
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('userId')) this.router.navigateByUrl('');
    this.sharingService.setMenu({bars: false, user:false});
  }

  register(): void {
    if (this.registerForm.invalid) {
      return;
    }
    this.registerUser = this.registerForm.value
    this.userService.register(this.registerUser).subscribe(
      response => {
        this.errorMessage = "Registro realizado con éxito";
        from(this.error(true, 3000)).subscribe(
          ()=>{
            this.isValidForm = null;
            this.errorMessage = null;
            this.showResponse = false;
            this.router.navigateByUrl('login');
          }
        )
      },
      error => {
        if(error.error.message.includes('email')) this.errorMessage = 'Ya existe un usuario con ese email';
        else this.errorMessage = 'Ya existe un usuario con ese nombre';
        from(this.error(false, 3000)).subscribe(
          ()=>{
            this.isValidForm = null;
            this.errorMessage = null;
            this.showResponse = false;
          }
        )
      }
    )
  }

  private async error(state: boolean, ms: number): Promise<void>{
    this.showResponse = true;
    this.isValidForm = state;
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    })
  }

}

