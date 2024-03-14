import { Injectable } from '@angular/core';
import WorkspaceApiService from './api/workspace.api.service';
import UserService from '../users/user.service';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { WorkspaceDto } from './api/WorkspaceDto';
import Workspace from './Worspace.entity';

@Injectable({
  providedIn: 'root',
})
export default class WorkspaceService {
  workspaces$ = new BehaviorSubject<Array<Workspace>>([])
  constructor(
    private readonly api: WorkspaceApiService,
    private readonly userService: UserService
  ){}
  load(): Observable<Array<Workspace>> {
    const user = this.userService.getUser();
    if(user){
      return this.api.load(user.id)
        .pipe(map((workspaces: Array<WorkspaceDto.WorkspaceLoadResponse>): Array<Workspace> => {
          return workspaces.map((workspace) => new Workspace(workspace.id, workspace.name))
        }), tap((workspaces) => {
          this.workspaces$.next(workspaces)
        }))
    }else{
      return of([])
    }
  }
}