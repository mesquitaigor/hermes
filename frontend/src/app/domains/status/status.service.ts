import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import Status from './model/Status';
import Card from '../tasks/model/Card';

@Injectable({
  providedIn: 'root',
})
export default class StatusService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Status[]> {
    return this.httpClient.get('http://localhost:3000/status').pipe(
      catchError(() => {
        return of('oi');
      }),
      map(() => {
        const status = [
          new Status(1, 'To do'),
          new Status(2, 'In progress'),
          new Status(3, 'Finalized'),
        ];
        return status.map((s, index) => {
          s.cards = [
            new Card(index + 1, s.name + ' - ' + (index + 1), s.id),
            new Card(index + 2, s.name + ' - ' + (index + 2), s.id),
          ];
          return s;
        });
      })
    );
  }

  create(name: string) {
    return this.httpClient.post('http://localhost:3000/status', { name });
  }
}
