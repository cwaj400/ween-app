import {Component, Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable()
export class AuthService {

  private registerUrl = 'http://localhost:3000/api/register';
  private loginUrl = 'http://localhost:3000/api/login';

  constructor(private firestore: AngularFirestore) {
  }


  loginUser = (user: any) => {
    return '';
  }

  error(message: string): never {
    throw new Error(message);
  }
}
