
import { Component,OnInit, ChangeDetectionStrategy, inject  } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Servicetask } from  '../../service/servicetask';  
import{ TasksInterface } from '../../interface/tasks';


@Component({
 selector:'app-edit-task',
 standalone:true,
 changeDetection: ChangeDetectionStrategy.OnPush,
 imports:[CommonModule,FormsModule],
 templateUrl:'./edit-task.html'
})
export class EditTaskComponent implements OnInit{

 task?:TasksInterface;

 private readonly route = inject(ActivatedRoute);
 private readonly router = inject(Router);
 private readonly taskService = inject(Servicetask);

 ngOnInit(){

  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.task = this.taskService.getTask(id);

 }

 save(){

  if(this.task){
    this.taskService.updateTask(this.task);
    this.router.navigate(['/tasks']);
  }

 }
}