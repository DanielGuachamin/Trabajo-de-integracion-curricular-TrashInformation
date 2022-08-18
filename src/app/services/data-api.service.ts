import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contacto } from '../modelos/contacto';
import { Noticia } from '../modelos/noticia';
import { Recomendacion } from '../modelos/recomendacion';
import { Sugerencia } from '../modelos/sugerencia';
import { User } from '../modelos/user';
import { Video } from '../modelos/video';

@Injectable({
  providedIn: 'root',
})
export class DataApiService {
  private urlUserImage$ = new BehaviorSubject<String>('')
 
  constructor(private firestore: Firestore) {}

  //-----Funciones para manejar usuarios------
  addUser(user: User, email: any) {
    return setDoc(doc(this.firestore, 'Personas', email), user);
  }

  getUser(): Observable<User[]> {
    const userRef = collection(this.firestore, 'Personas');
    return collectionData(userRef, { idField: 'email' }) as Observable<User[]>;
  }

  async getProfile(email: any) {
    const userRef = doc(this.firestore, 'Personas', email)
    const respuesta = await getDoc(userRef)
    console.log('Obteniendo perfil desde servicio: ', respuesta.data())
    return respuesta.data()
  }

  async searchUserRol(email:any) {
    const docRef = doc(this.firestore, 'Personas', email);
    const docSnap = await getDoc(docRef);
    const responseUser:any = docSnap.data()
    const rol = responseUser['rol']
    return rol
  }

  async searchUserData(email:any) {
    const docRef = doc(this.firestore, 'Personas', email);
    const docSnap = await getDoc(docRef);
    const responseUser:any = docSnap.data()
    return responseUser
  }

  //Observador para detectar cambios en imagen de perfil
  get selectedImage$(): Observable<String>{
    return this.urlUserImage$.asObservable();
  }

  //Función para obtener cambiar url de imagen de perfil
  setImage(url: String){
    this.urlUserImage$.next(url);
  }

  //------Funciones para manejar noticias----------

  addNoticia(noticia: Noticia, id: string){
    return setDoc(doc(this.firestore, 'Noticias', id), noticia);
  }

  getNoticias(): Observable<Noticia[]>{
    const noticiaRef = collection(this.firestore, 'Noticias')
    return collectionData(noticiaRef, {idField: 'id'}) as Observable<Noticia[]>
  }

  async modifiedNoticia(id: any) {
    const noticiaRef = doc(this.firestore, 'Noticias', id)
    const respuesta = await getDoc(noticiaRef)
    return respuesta.data()
  }

  //--------Funciones para manejar videos------------

  addVideo(video: Video, id: string){
    return setDoc(doc(this.firestore, 'Videos', id), video);
  }

  getVideos(): Observable<Video[]>{
    const videoRef = collection(this.firestore, 'Videos')
    return collectionData(videoRef, {idField: 'id'}) as Observable<Video[]>
  }

  async modifiedVideo(id: any) {
    const videoRef = doc(this.firestore, 'Videos', id)
    const respuesta = await getDoc(videoRef)
    return respuesta.data()
  }

  //---------Funciones para manejar recomendaciones---------------

  addRecommendation(recomen: Recomendacion, id: string){
    return setDoc(doc(this.firestore, 'Recomendaciones', id), recomen);
  }

  getRecommendations(): Observable<Recomendacion[]>{
    const recomenRef = collection(this.firestore, 'Recomendaciones')
    return collectionData(recomenRef, {idField: 'id'}) as Observable<Recomendacion[]>
  }

  async modifiedRecommendation(id: any) {
    const recomenRef = doc(this.firestore, 'Recomendaciones', id)
    const respuesta = await getDoc(recomenRef)
    return respuesta.data()
  }

  //----------Funciones para manejar contactos-----------

   addContact(contacto: Contacto, id: string){
    return setDoc(doc(this.firestore, 'Contactos', id), contacto);
  }

  getContacts(): Observable<Contacto[]>{
    const contactRef = collection(this.firestore, 'Contactos')
    return collectionData(contactRef, {idField: 'id'}) as Observable<Contacto[]>
  }

  async modifiedContact(id: any) {
    const contactRef = doc(this.firestore, 'Contactos', id)
    const respuesta = await getDoc(contactRef)
    return respuesta.data()
  }

  //--------Funciones para manejar sugerencias------------

  addSuggest(sugerencia: Sugerencia, id: string){
    return setDoc(doc(this.firestore, 'Sugerencias', id), sugerencia);
  }

  getSuggestions(): Observable<Sugerencia[]>{
    const sugestRef = collection(this.firestore, 'Sugerencias')
    return collectionData(sugestRef, {idField: 'id'}) as Observable<Sugerencia[]>
  }

  //--------Funciones generales de control de elementos------------

  deleteElement(id: String, path: String){
    const noticiaDocRef = doc(this.firestore, `${path}/${id}`);
    return deleteDoc(noticiaDocRef)
  }

  async identifiedIdElement(global: any) {
    const globalRef = doc(this.firestore, 'Configuracion', global)
    const respuesta = await getDoc(globalRef)
    return respuesta.data()
  }

  //Variable global que se actualiza al agregar elementos
  addGlobalIdElement(global: any, id: any){
    return setDoc(doc(this.firestore, 'Configuracion', global), id);
  }
}
