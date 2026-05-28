import { Injectable, signal } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import {  TasksInterface } from '../interface/tasks';
  
@Injectable({
  providedIn: 'root',
})
export class Task {
  private tasks = signal<TasksInterface[]>([]);
}
