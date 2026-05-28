import { Injectable, signal } from '@angular/core';
import { TasksInterfaceINI } from '../interface/tasks';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceTask {
  private signalTasks= signal<TasksInterfaceINI[]>([]);
  private MisTareas: TasksInterfaceINI[] = [
    {
      id:'1',
      titulo: 'lectura de correo',
      idUsu: 20223,
      nameUsu: 'Gema Manjon',
      description: 'tienen que mandarnos del dpto de sistemas solución al estado del pc',
      fechacreacion: '12/05/2026',
      completed: false
  },
  {
      id:'2',
      titulo: 'LLamar a sistemas despues de id:1',
      idUsu: 20223,
      nameUsu: 'Gema Manjon',
      description: 'Asistencia telefonica con dpto de sistemas',
      fechacreacion: '12/05/2026',
      completed: false
  },
{
      id:'3',
      titulo: 'reunion directivos 12:30',
      idUsu: 20223,
      nameUsu: 'Gema Manjon',
      description: 'Acomodar sala de reuniones y ágape ',
      fechacreacion: '12/05/2026',
      completed: false
  },

];

constructor() {
  // <!-- no seria necesario porque ya está inicializada al llegar a este punto
  this.signalTasks.set(this.MisTareas);
  }

   getAllTasks(): Observable<TasksInterfaceINI[]> {
    return of(this.signalTasks()).pipe(delay(500));
  }

  // getTaskById(id: string): Observable<TasksInterface | null> {
  //   // sera porque no tenemos inicializada la propiedad signaltasks??const product = this.products().find((p) => p.id === id) || null;
  //   const Seltask = this.signalTasks().find((p) => p.id === id) || null;
  //   return of(Seltask).pipe(delay(300));
  // }
 
  // getProductsByDate(fecha: string)
  // : Observable<TasksInterface[] | null> {
  //   const filtered = this.signalTasks().filter((p) => p.fechacreacion === fecha);
  //   return of(filtered).pipe(delay(400));
  // }
};