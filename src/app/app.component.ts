import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { connectRouter } from './router.utils';

declare const require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ngVersion = require('../../package.json').dependencies['@angular/core'];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    connectRouter(this.router);
  }

}
