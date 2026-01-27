import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Httpclient } from './httpclient';
import { User } from './user.model';
import { Comment } from './comment.model';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  users: User[] = [];
  comments: Comment[] = [];

  constructor(private httpclient: Httpclient) {}

  ngOnInit(): void {
    this.httpclient.getUsers().subscribe(data => {
      this.users = data.slice(0, 10);
    });


    this.httpclient.getComments().subscribe(data => {
      this.comments = data.slice(0, 5);
    });
  }
}
