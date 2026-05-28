import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    // {path:'home', loadComponent: () => import('./home/home').then(m => m.Home),
    //     title: 'Bienvenida'
    // },
    {path: 'task', loadComponent:() => import('./task/task').then(m => m.Task),
        title: 'Cooking Tasks'
    },
    {
    path: 'task-list/:id',
    loadComponent: () =>
      import('./features/task-list/task-list').then((m) => m.TaskList),
    title: 'Task List',
  },
     {
    path: 'task-list',
    loadComponent: () =>
      import('./features/task-list/task-list').then((m) => m.TaskList),
    title: 'Task List',
  },
 
  {
    path: 'edit-task',
    loadComponent: () =>
      import('./features/edit-task/edit-task').then((m) => m.EditTaskComponent),
    title: 'Edit Task',
  },
 
];
