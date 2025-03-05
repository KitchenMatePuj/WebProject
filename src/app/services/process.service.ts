import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {
  private processes: any[] = [];

  constructor() {}

  addProcess(name: string) {
    this.processes.push({ name, status: 'iniciado' });
  }

  getProcesses() {
    return this.processes;
  }
}
