import { Component, OnInit } from '@angular/core';
import {faEnvelope, faExclamation} from '@fortawesome/free-solid-svg-icons';
import {User} from '../user';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {AppService} from '../app.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  envelopeIcon = faEnvelope;
  exclamation = faExclamation;
  invalidEmail = false;
  termsAndConditions = false;
  allUsers: User[] = [];

  formSubmitted = false;
  username = '';
  error = false;
  model = new User('1', '', '', '');
  users: any[] = [];
  userCount = 0;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.appService.getUsers().subscribe(data => {
      this.allUsers = data;
    });
  }

  createUuidv4 = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  tada(): void {
    setTimeout(() => {
      this.invalidEmail = false;
    }, 5000);
  }

  register(): void {
    this.model.id = this.createUuidv4().toString();
    this.appService.register(this.model).then(res => {
      console.log(res);
      if (res === 1) {
        this.formSubmitted = false;
        this.invalidEmail = true;
        this.tada();
      }
      else {
        this.formSubmitted = true;
        this.userCount = this.userCount + 1;
      }
    });

  }
}
