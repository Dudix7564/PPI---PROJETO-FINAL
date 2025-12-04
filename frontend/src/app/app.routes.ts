import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './components/login/login';
import { CadastroUsuario } from './components/cadastro-usuario/cadastro-usuario';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
  // aqui depois você pode adicionar outras rotas
  // { path: 'inventario', component: InventarioComponent },
  // { path: 'cadastro-item', component: CadastroItemComponent },
  // { path: 'reservas', component: ReservaItemComponent },
];
