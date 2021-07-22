import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {User} from '../user';
import {AppService} from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model = new User('1', '', '', '');
  password = '';
  email = '';
  loginUserData = {};

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
  }


  login = () => {
    this.appService.loginUser(this.email, this.password);
  }
}
