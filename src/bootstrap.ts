import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import { bootstrap } from './bootstrap.utils';
import { environment } from './environments/environment';

// platformBrowser().bootstrapModule(AppModule)
  // .catch(err => console.error(err));

// declare const require: any;
// const ngVersion = require('../package.json').dependencies['@angular/core'];
// (window as any).plattform = (window as any).plattform || {};
// let platform = (window as any).plattform[ngVersion];
// if (!platform) {
//   platform = platformBrowser();
//   (window as any).plattform[ngVersion] = platform; 

//   if (environment.production) {
//     enableProdMode();
//   }
// }
// platform.bootstrapModule(AppModule)
//   .catch(err => console.error(err));
declare const require: any;

bootstrap(AppModule, {
  packageJson: require('../package.json'),
  production: environment.production
});