import { Component, OnInit } from '@angular/core';
import { AppService } from './state/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly appService: AppService) {
  }
  
  ngOnInit(): void {
    this.appService.loadSystemInfoAndPort().subscribe();
  }
}
