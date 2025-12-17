import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';  // 👈 importe suas rotas daqui

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),   // 👈 rotas são carregadas
    provideHttpClient()
    
  ]
};
