import 'core-js/shim';
import 'zone.js/dist/zone';
import {platformBrowser} from '@angular/platform-browser';
import {AppModuleNgFactory} from './app/ngfactory/src/app/app.module.ngfactory';
import "./bot.less";
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
console.log("loaded");
