import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError, shareReplay } from 'rxjs/operators';
import { of } from 'rxjs';

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private postsSubject = new BehaviorSubject<Post[]>([]);

  posts$: Observable<Post[]> = this.postsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadPosts();
  }

  private loadPosts(): void {
    this.http.get<Post[]>(this.apiUrl).pipe(
      tap(posts => console.log('Posts loaded:', posts.length)),
      catchError(error => {
        console.error('Error loading posts:', error);
        return of([]);
      }),
      shareReplay(1)
    ).subscribe(posts => {
      this.postsSubject.next(posts);
    });
  }

  refreshPosts(): void {
    this.loadPosts();
  }
}
