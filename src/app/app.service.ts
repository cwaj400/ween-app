import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from './user';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  allUsers: User[] = [];

  isLoggedIn = false;

  constructor(private http: HttpClient, private firestore: AngularFirestore, private auth: AngularFireAuth,
              private router: Router) {

   const promise = auth.onAuthStateChanged(user => {
      console.log(user);
      this.isLoggedIn = true;
    });
   promise.catch(e => console.log(e.message));
  }

  deleteUser(id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('users').doc(id).delete().then(res => {
          return resolve(1);
          // console.log(resolve);
      });
    });
  }

  registerUser = (user: any) => {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('users')
        .doc(user.id)
        .set({id: user.id , name: user.name, username: user.username, email: user.email})
        .then(res => {
          console.log(res);
        }, err => reject(err));
    });
  }

  register = (user: any) => {
    return new Promise<any>((resolve, reject) => {
      this.auth.createUserWithEmailAndPassword(user.email, 'password')
        .then((userCredential: { user: any; }) => {
          // Signed in
          user = userCredential.user;
          resolve(0);
          this.sendEmailVerification();

        })
        .catch((error: { code: any; message: any; }) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          resolve(1);
          console.log(errorCode);
          console.log(errorMessage);
        });
    });
  }

  sendEmailVerification = async () => {
    return this.auth.currentUser.then((user) => {
      // @ts-ignore
      return user.sendEmailVerification();
    }).then(() => {
      this.router.navigate(['home']);
    });
  }

  signOut(): Promise<any> {
    return this.auth.signOut();
  }

  getUsers(): Observable<any> {
    return this.firestore.collection('users').valueChanges();
  }

  getUserById(inputid: string): any {
     return this.firestore.collection('/users', ref => ref.where('id', '==', inputid));
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
}
