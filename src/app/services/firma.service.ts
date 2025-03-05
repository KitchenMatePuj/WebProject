import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirmaService {
  private firmas: string[] = [];

  constructor() {}

  signDocument(documentId: number, user: string) {
    this.firmas.push(`Documento ${documentId} firmado por ${user}`);
  }

  getFirmas() {
    return this.firmas;
  }
}
