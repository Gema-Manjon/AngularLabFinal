
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})


export class Home {

  pulsado = false;

  constructor(public router: Router) {}

  isHomeRoute(): boolean {
    const url = this.router.url || '/';
    return url === '/' || url === '/home';
  }

  @Input() appTitle = 'Avanade';
  @Input() currentUser: any = null;

  @Output() navigationClick = new EventEmitter<string>();
  @Output() loginClick = new EventEmitter<void>();
  @Output() logoutClick = new EventEmitter<void>();
  
  goToTaskListBase() {
    this.pulsado = true;
    this.router.navigate(['/task-list']);
  }
  // navigate(section: string) {
  //   this.navigationClick.emit(section);
  // }
  
}
