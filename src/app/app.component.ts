import { connectRouter } from '@angular-architects/module-federation-tools';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
