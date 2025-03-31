import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core'; // ✅ Importar proveedores manualmente
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // ✅ Importar FormsModule
import { provideHttpClient } from '@angular/common/http';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(FormsModule), provideAnimationsAsync(), // ✅ Registrar FormsModule globalmente
    provideHttpClient() 
  ]
}).catch(err => console.error(err));
