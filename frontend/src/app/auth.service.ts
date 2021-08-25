import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  errorsFormAuth = {
    login: '',
    password: '',
    email: '',
    api: ''
  };

  login: string;

  public loginValue = '';
  public passwordValue = '';
  public emailValue = '';

  constructor(public router: Router, private http: HttpClient) {
  }

  setType(type): void {
    this.errorsFormAuth = {
      login: '',
      password: '',
      email: '',
      api: ''
    };
    this.loginValue = '';
    this.passwordValue = '';
    this.emailValue = '';
    if (type === 'login') {
      this.router.navigate(['auth/register']);
    } else {
      this.router.navigate(['auth/login']);
    }
  }

 async auth() {
    let error = false;
    this.errorsFormAuth = {
      login: '',
      password: '',
      email: '',
      api: ''
    };
    if (this.loginValue.length === 0) {
      this.errorsFormAuth.login = 'Обязательно';
      error = true;
    }
    if (this.passwordValue.length === 0) {
      this.errorsFormAuth.password = 'Обязательно';
      error = true;
    }
    if (!error) {
      await this.http.post<any>('http://localhost:5000/api/2.0/auth/login',
        {login: this.loginValue, password: this.passwordValue},
        {headers: {'Content-Type': 'application/json; charset=utf-8'}}).subscribe((res) => {
        localStorage.setItem('token', JSON.stringify(res.token));
        localStorage.setItem('login', JSON.stringify(res.login));
        this.login = res.login;
        //this.ws.connect(res.token);
        this.router.navigate(['/']);
      }, (err: HttpErrorResponse) => {
        this.passwordValue = '';
        this.errorsFormAuth.api = err.error.message;
      });
    }
  }

  async register() {
    function validateEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }

    let error = false;
    this.errorsFormAuth = {
      login: '',
      password: '',
      email: '',
      api: ''
    };
    if (this.loginValue.length === 0) {
      this.errorsFormAuth.login = 'Обязательно';
      error = true;
    } else if (this.loginValue.length < 4) {
      this.errorsFormAuth.login = 'Не меньше 4 симоволов';
      error = true;
    }
    if (this.passwordValue.length === 0) {
      this.errorsFormAuth.password = 'Обязательно';
      error = true;
    } else if (this.passwordValue.length < 4) {
      this.errorsFormAuth.password = 'Не меньше 4 символов';
      error = true;
    }
    if (this.emailValue.length === 0) {
      this.errorsFormAuth.email = 'Обязательно';
      error = true;
    } else if (!validateEmail(this.emailValue)) {
      this.errorsFormAuth.email = 'Некорректная почта';
      error = true;
    }

    if (!error) {
      await this.http.post<any>('http://localhost:5000/api/2.0/auth/register',
        {login: this.loginValue, password: this.passwordValue, email: this.emailValue},
        {headers: {'Content-Type': 'application/json; charset=utf-8'}}).subscribe(res => {
        this.loginValue = '';
        this.passwordValue = '';
        this.emailValue = '';
        this.router.navigate(['auth/login']);
      }, (err: HttpErrorResponse) => {
        this.passwordValue = '';
        this.errorsFormAuth.api = err.error.message;
      });
    }
  }
}
