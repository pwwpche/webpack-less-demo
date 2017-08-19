import 'core-js/shim';
import 'zone.js/dist/zone';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import "./bot.less";
platformBrowserDynamic().bootstrapModule(AppModule);
