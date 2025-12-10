import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { CadastroUsuario } from './components/cadastro-usuario/cadastro-usuario';
import { ListarItens } from './components/listar-itens/listar-itens';
import { DetalhesItem } from './components/detalhes-item/detalhes-item';

export const appRoutes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'cadastro-usuario', component: CadastroUsuario },
  { path: 'listar-itens', component: ListarItens},
  { path: 'detalhes-item/:id', component: DetalhesItem},

 
];
