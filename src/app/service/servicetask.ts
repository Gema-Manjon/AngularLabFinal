import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TasksInterface } from '../interface/tasks';
// import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class Servicetask {

  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  private readonly http = inject(HttpClient);

  private readonly tasks = signal<TasksInterface[]>([]);

  loadTasks(): Observable<TasksInterface[]> {
    return this.http.get<TasksInterface[]>(this.apiUrl);
  }

  setTasks(newTasks: TasksInterface[]) {
    this.tasks.set(newTasks);
  }

  getTasks(): TasksInterface[] {
    return this.tasks();
  }

  getTask(id: number): TasksInterface | undefined {
    return this.tasks().find(t => t.id === id);
  }

  addTask(task: TasksInterface) {
    this.tasks.update(tasks => [
      ...tasks,
      { ...task, id: tasks.length + 1 }
    ]);
  }

  updateTask(task: TasksInterface) {
    this.tasks.update(tasks =>
      tasks.map(t => t.id === task.id ? task : t)
    );
  }

  deleteTask(id: number) {
    this.tasks.update(tasks =>
      tasks.filter(t => t.id !== id)
    );
  }
}