import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { LoopBackConfig } from '../../sdk';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);

//This is your API url
LoopBackConfig.setBaseURL('https://q-a-example-loopback-api.herokuapp.com');
