import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { SharingService } from 'src/app/services/sharing.service';
import { UserDTO } from '../../models/user.dto';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: UserDTO;

  email: FormControl;
  password: FormControl;

  loginForm: FormGroup;
  isValidForm: boolean | null;
  showResponse: boolean;
  errorMessage: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private sharingService: SharingService
  ) {
    this.loginUser = new UserDTO('', '', '');

    this.isValidForm = null;
    this.showResponse = false;
    this.errorMessage = null;

    this.email = new FormControl(this.loginUser.email, [
      Validators.required,
    ]);

    this.password = new FormControl(this.loginUser.password, [
      Validators.required,
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  ngOnInit(): void {
  }

  login(){
    if (this.loginForm.invalid) {
      return;
    }

    this.loginUser = this.loginForm.value;
    this.userService.login(this.loginUser).subscribe(
      response => {
        this.loginUser.access_token = response.access_token;
        this.loginUser.id = response.id;
        sessionStorage.setItem('access_token', (this.loginUser.access_token as string));
        sessionStorage.setItem('userId', (this.loginUser.id as string));
        console.log(response)
        this.errorMessage = "Inicio de sesión correcto";
        from(this.error(true, 4000)).subscribe(
          ()=>{
            this.isValidForm = null;
            this.errorMessage = null;
            this.showResponse = false;
            this.sharingService.setLoged({isLoged: true});
            this.router.navigateByUrl('');
          }
        )
      },
      error => {
        console.log(error);
        if(error.error.message.includes('details')) this.errorMessage = 'Error en el email o contraseña';
        else this.errorMessage = 'Se ha producido un error en el servidor';
        from(this.error(false, 4000)).subscribe(
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
