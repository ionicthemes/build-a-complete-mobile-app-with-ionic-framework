import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LearnFeedPage } from '../pages/learn-feed/learn-feed';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make LearnFeedPage the root (or first) page
  rootPage: any = LearnFeedPage;

  pages: Array<{title: string, component: any, params: any}>;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public menu: MenuController,
    public app: App
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      {
        title: 'All',
        component: LearnFeedPage,
        params: {
          query: 'all'
        }
      },
      {
        title: 'Basic',
        component: LearnFeedPage,
        params: {
          query: 'basic'
        }
      },
      {
        title: 'Core',
        component: LearnFeedPage,
        params: {
          query: 'core'
        }
      }
    ];
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component, page.params);
  }
}
