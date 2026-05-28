import { Component,OnInit, inject,signal,computed } from '@angular/core';
import { Servicetask } from  '../../service/servicetask';  
import{ TasksInterface } from '../../interface/tasks';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.scss'],
})
export class TaskList implements OnInit  {
  private Tarea = inject(Servicetask);
  private route = inject(ActivatedRoute);
  loading = signal(false);
  tasks = signal<TasksInterface[]>([]);
  selectedId: string | null = null;
  filterTitle = signal('');
  editBuffer = signal('');
  filterDateValue = signal('');

  filteredTasks = computed(() => {
    const title = this.filterTitle().trim().toLowerCase();
    const date = this.filterDateValue().trim();
    const formattedDate = date ? this.formatDateFromDateInput(date) : '';

    return this.tasks().filter((task) => {
      const matchesTitle = !title ||
        task.title.toString().includes(title) ||
        task.title.toString() === title;
      // const matchesDate = !formattedDate || task.fechacreacion === formattedDate;
      return matchesTitle; //&& matchesDate;
    });
  });

  formatDateFromDateInput(value: string): string {
    const parts = value.split('-');
    if (parts.length !== 3) {
      return '';
    }
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  }

  getTodayDateForInput(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
  //  this.filterDateValue.set(this.getTodayDateForInput());
   this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.selectedId = id;
      this.loadTasks();
    });
  }

  private loadTasks(): void {
    this.loading.set(true);
    const request = this.Tarea.loadTasks();

    request.subscribe({
      next: (tasks: TasksInterface[]) => {
        this.tasks.set(tasks);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading.set(false);
      },
    });
  }

deleteTask(taskId: string): void {
  const id = Number(taskId);
  this.tasks.update((arr: TasksInterface[]) => arr.filter(task => task.id !== id));
}

editTask(taskId: string): void {
  this.selectedId = taskId;
  const id = Number(taskId);
  const task = this.tasks().find(t => t.id === id);
  this.editBuffer.set(task ? (task.title || '') : '');
}

saveEdit(id: number): void {
  this.tasks.update((arr: TasksInterface[]) =>
    arr.map(t => (t.id === id ? { ...t, title: this.editBuffer() } : t))
  );
  this.selectedId = null;
  this.editBuffer.set('');
}

cancelEdit(): void {
  this.selectedId = null;
  this.editBuffer.set('');
}

NuevaTarea(): void {
  const newTask: TasksInterface = {
    id: this.tasks().length + 1,
    title: this.filterTitle() + ' Iniciar proceso de organizacion diaria ',
    userId: 98787,
    completed: false
  };
  this.tasks.update((arr: TasksInterface[]) => [...arr, newTask]);
}

clearFilters(): void{
  this.filterTitle.set('');
  this.filterDateValue.set('');
}
toggleTaskCompletion(taskId: string): void {
  const id = Number(taskId);
  this.tasks.update((arr: TasksInterface[]) =>
    arr.map(task => (task.id === id ? { ...task, completed: !task.completed } : task))
  );
}

  select(id: string): void {
    this.selectedId = id;
     console.log('Tarea seleccionada:', id);
  }

  isVisible(id: string): boolean {
    return this.selectedId === id;
  }

}