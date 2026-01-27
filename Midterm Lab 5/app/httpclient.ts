import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators'; // Ensure map is imported
import { User } from './user.model';
import { Comment } from './comment.model';

interface DummyCommentsResponse {
  comments: Comment[];
}

@Injectable({
  providedIn: 'root'
})
export class Httpclient {

  private usersUrl = 'https://jsonplaceholder.typicode.com/users';
  private commentsUrl = 'https://dummyjson.com/comments';

  private usersStorageKey = 'users';
  private commentsStorageKey = 'dummy_comments_v1';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    const cachedData = localStorage.getItem(this.usersStorageKey);
    if (cachedData) {
      return of(JSON.parse(cachedData));
    }
    return this.http.get<User[]>(this.usersUrl).pipe(
      tap(users => localStorage.setItem(this.usersStorageKey, JSON.stringify(users)))
    );
  }

  getComments(): Observable<Comment[]> {
    const cachedData = localStorage.getItem(this.commentsStorageKey);

    if (cachedData) {
      return of(JSON.parse(cachedData));
    }

    return this.http.get<DummyCommentsResponse>(this.commentsUrl).pipe(
      map(response => response.comments),
      tap(comments => {
        localStorage.setItem(this.commentsStorageKey, JSON.stringify(comments));
      })
    );
  }
}

