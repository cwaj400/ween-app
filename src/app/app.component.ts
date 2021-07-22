import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

import { HttpClient } from '@angular/common/http';
import {AppService} from './app.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Ween App!';
  public isAuthenticated: boolean;
  users: any[] = [];
  userCount = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient, private appService: AppService) {
    this.isAuthenticated = false;
  }

  ngOnInit(): void {
  }

}
