import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataService, Post } from '../data.service';
import { TruncatePipe } from '../pipes/truncate.pipe';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule, TruncatePipe],
  templateUrl: './services.html',
  styleUrls: ['./services.css']
})
export class Services implements OnInit {
  searchTerm$ = new BehaviorSubject<string>('');
  filteredPosts$!: Observable<Post[]>;
  isLoading$ = new BehaviorSubject<boolean>(true);
  hasError$ = new BehaviorSubject<boolean>(false);

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.filteredPosts$ = combineLatest([
      this.dataService.posts$,
      this.searchTerm$.pipe(startWith(''))
    ]).pipe(
      map(([posts, searchTerm]) => {
        this.isLoading$.next(false);

        if (!searchTerm.trim()) {
          return posts;
        }

        const term = searchTerm.toLowerCase();
        return posts.filter(post =>
          post.title.toLowerCase().includes(term) ||
          post.body.toLowerCase().includes(term)
        );
      })
    );
  }

  onSearchChange(term: string): void {
    this.searchTerm$.next(term);
  }
}
