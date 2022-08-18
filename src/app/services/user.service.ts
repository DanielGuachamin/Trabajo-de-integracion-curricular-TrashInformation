import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  getAuth} from '@angular/fire/auth';
@Injectable({
  providedIn: 'root',
})
export class UserService {

 
  constructor(private auth: Auth) {  }

  //Promesa que obtiene estado de autenticación de usuario
  getCurrentUser(){
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(this.auth,
        user => {
          //Si cierra sesión anula la suscripción y se elimina estado de usuario
          unsubscribe();
          console.log('estado de usuario desde servicio', user)
          resolve(user);
          
        },
        () => {
          reject();
        }
      );
    });
  }

  //Realiza registro de usuario y paso por argumento el correo y contraseña
  register(email: any, password: any) {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(this.auth, email, password)
        .then((userData) => {
          resolve(userData);
        })
        .catch((err) => console.log(reject(err)));
    });
  }

  //Crea una instancia del estado de autenticación del usuario
  isAuth() {
    const userAuth = getAuth();
    const userLooged = userAuth.currentUser;
    return userLooged != null;
  }

  //Verifica el correo del usuario actual
  seeEmailUserAuth() {
    const userAuth = getAuth();
    const userLooged = userAuth.currentUser;
    const emailUserLooged = userLooged?.email;
    return emailUserLooged;
  }

  //Iniciar sesión y paso como argumento correo y contraseña
  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  //Cierra sesión
  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.log(error);
    }
  }

  //Recupera contraseña y pasa como argumento el correo
  recoverPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email)
      .then((success) => {
        console.log(success)
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
