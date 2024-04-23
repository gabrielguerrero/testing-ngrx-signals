import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import './app/services/mock-backend';
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
