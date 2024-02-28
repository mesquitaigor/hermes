import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import Card from './model/Card';

@Injectable({
  providedIn: 'root',
})
export default class CardService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Object> {
    return this.httpClient.get('http://localhost:3000/tasks').pipe(
      map(() => {
        return [
          new Card(1, 'Card 1', 1),
          new Card(2, 'Card 2', 2),
          new Card(3, 'Card 3', 3),
        ];
      })
    );
  }

  create(name: string): Observable<Object> {
    return this.httpClient.post('http://localhost:3000/tasks', { name });
  }
}
