import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WorkspaceDto } from './WorkspaceDto';

@Injectable({
  providedIn: 'root',
})
export default class WorkspaceApiService {
  constructor(private httpClient: HttpClient) {}
  load(userId: number): Observable<Array<WorkspaceDto.WorkspaceLoadResponse>> {
    return this.httpClient.get<Array<WorkspaceDto.WorkspaceLoadResponse>>(
      `/users/${userId}/workspaces`
    );
  }
}
