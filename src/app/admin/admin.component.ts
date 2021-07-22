import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {User} from '../user';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  today = '';
  timer: Observable<any> = new Observable();

  showMe = false;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getUsers();
    this.today = this.getDate();
  }

  getUsers(): void {
    this.appService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  getDate(): string {
    return new Date().toLocaleDateString();
  }

  tada(): void {
    setTimeout(() => {
      this.showMe = false;
    }, 2000);
  }

  deleteUser(id: string): void {

    this.appService.deleteUser(id).then(res => {
      if (res === 1) {
        this.showMe = true;
        this.tada();
      } else {
        console.log('oh');
      }
    });
    this.getUsers();
  }
}
