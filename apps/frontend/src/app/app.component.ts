import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@clean-architecture-monorepo/api-interfaces';

@Component({
  selector: 'clean-architecture-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
}
