export interface TasksInterfaceINI {
    id: string;
    titulo: string;
    idUsu: number;
    nameUsu: string;
    description: string;
    fechacreacion: string;
    completed: boolean;
}
export interface TasksInterface {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}