import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { isDevMode } from '@angular/core';
import { worker } from './app/services/mock-backend/browser';

async function prepareApp() {
  if (isDevMode()) {
    return worker.start({
      onUnhandledRequest: 'bypass',
    });
  }

  return Promise.resolve();
}
prepareApp().then(() => {
  console.log('msw started');
  bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err, environment.production),
  );
});
