import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActuacionService {
  private actuaciones: string[] = [];

  constructor() {}

  addActuacion(descripcion: string) {
    this.actuaciones.push(descripcion);
  }

  getActuaciones() {
    return this.actuaciones;
  }
}
