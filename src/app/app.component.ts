import { Component, OnInit } from '@angular/core';
import { StatusService } from './services/status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sharedlist';
  constructor(
    private status: StatusService) {
  }

  ngOnInit(): void {
  }
}
