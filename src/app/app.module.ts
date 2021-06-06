import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { endsWith } from '@angular-architects/module-federation-tools';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';


@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { matcher: endsWith('a'), component: AComponent},
      { matcher: endsWith('b'), component: BComponent},
    ])
  ],
  declarations: [
    AComponent,
    BComponent,
    AppComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { 
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const ce = createCustomElement(AppComponent, {injector: this.injector});
    customElements.define('angular3-element', ce);

    customElements.define('angular3-a-element', createCustomElement(AComponent, {injector: this.injector}));
    customElements.define('angular3-b-element', createCustomElement(BComponent, {injector: this.injector}));
  }

}
