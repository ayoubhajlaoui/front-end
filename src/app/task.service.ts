import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITask, ITaskTypeOption, ITypePercentage } from './tasks/add/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient ) { }

  postTask(iTask: ITask): Observable <ITask> {
    return this.http.post<ITask>('http://localhost:8080/api/tasks/createTask', iTask)
    .pipe(map((d: ITask) => d));
    
  }


  getTypeOptions(): Array<ITaskTypeOption> {
    return [{ type: 'done' }, { type: 'todo' }, { type: 'pending' }];
  }

  getTypePercentage(): Observable<Array<ITypePercentage>> {
    return this.http.get<Array<ITypePercentage>>(`http://localhost:8080/api/tasks/vData/percentcounttype`);
  }


  getTaskList(): Observable<Array<ITask>> {
    return this.http.get<Array<ITask>>('http://localhost:8080/api/tasks/userTasks')
    .pipe(map((d:Array<ITask>) => d));
      
  }

  getTypePercentageByUsername(username: string): Observable<ITypePercentage[]> {
    return this.http.get<ITypePercentage[]>(`http://localhost:8080/api/tasks/vData/percentcounttype-user/${username}`);
  }


  updateTask(task: ITask, id: number): Observable<ITask> {
    return this.http.put<ITask>(`http://localhost:8080/api/tasks/${id}`, task);
     
  }
  deleteTask(id: number) {
    return this.http.delete(`http://localhost:8080/api/tasks/${id}`);
  }

  getTaskById(id: number): Observable<ITask> {
    return this.http.get<ITask>(`http://localhost:8080/api/tasks/task/${id}`);
      
  }

  getTaskByUserName(name: string): Observable<Array<ITask>>  {
    return this.http.get<Array<ITask>> (`http://localhost:8080/api/tasks/taskByUserName/${name}`);
      
  }


}