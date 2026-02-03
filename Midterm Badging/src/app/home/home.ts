import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../data.service';

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  latestPosts$!: Observable<Post[]>;
  currentDate = new Date();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.latestPosts$ = this.dataService.posts$.pipe(
      map(posts => posts.slice(0, 5))
    );
  }
}
