import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc, docData, query, where, DocumentReference, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private companyName: string = 'eufGfd6uJe3ELPK7gc6E';


  constructor(private firestore: Firestore) {}

  // CREATE
  addItem(item: any, collectionName: string): Promise<DocumentReference> {
    const itemsRef = collection(this.firestore, `Companies/${this.companyName}/${collectionName}`);
    return addDoc(itemsRef, item) as unknown as Promise<DocumentReference>;
  }

  addItemWithId(item: any, collectionName: string, docId: string): Promise<void> {
    const itemRef = doc(this.firestore, `Companies/${this.companyName}/${collectionName}/${docId}`);
    return setDoc(itemRef, item);
  }

  // READ
  getItems(collectionName: string): Observable<any[]> {
    const itemsRef = collection(this.firestore, `Companies/${this.companyName}/${collectionName}`);
    return collectionData(itemsRef, { idField: 'id' }) as Observable<any[]>;
  }

  getItem(id: string, collectionName: string): Observable<any> {
    const itemDocRef = doc(this.firestore, `Companies/${this.companyName}/${collectionName}/${id}`);
    return docData(itemDocRef, { idField: 'id' }) as Observable<any>;
  }

  // UPDATE
  updateItem(id: string, item: any, collectionName: string): Promise<void> {
    const itemDocRef = doc(this.firestore, `Companies/${this.companyName}/${collectionName}/${id}`);
    return updateDoc(itemDocRef, { ...item });
  }

  // DELETE
  deleteItem(id: string, collectionName: string): Promise<void> {
    const itemDocRef = doc(this.firestore, `Companies/${this.companyName}/${collectionName}/${id}`);
    return deleteDoc(itemDocRef);
  }

  searchItems(term: string, collectionName: string): Observable<any[]> {
    if (!this.companyName) {
      throw new Error('Company name is not defined');
    }
  
    // Normaliza o termo de busca
    const normalizedTerm = this.normalizeString(term);
  
    // Referência da coleção
    const itemsRef = collection(this.firestore, `Companies/${this.companyName}/${collectionName}`);
  
    // Consulta utilizando o termo normalizado
    const q = query(itemsRef, where('valueName', '>=', normalizedTerm), where('valueName', '<=', normalizedTerm + '\uf8ff'));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  searchUsersByTeam(teamId: string, collectionName: string): Observable<any[]> {
    // Referência à coleção de usuários
    const usersRef = collection(this.firestore, `Companies/${this.companyName}/${collectionName}`);
    // Consulta que verifica se o array 'teams' contém o 'teamId'
    const q = query(usersRef, where('teams', 'array-contains', teamId));
  
    // Retorna os dados dos usuários que fazem parte do time especificado
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }
  
  
  
  normalizeString(input: string): string {
    // Remove acentos e caracteres especiais
    const normalized = input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    // Remove caracteres especiais e espaços extras, e converte para minúsculas
    return normalized.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase();
  }
  
  
  
}
