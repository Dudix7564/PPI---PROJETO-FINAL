import { Routes } from '@angular/router';

import { Home } from './components/home/home'; //ok
import { Login } from './components/login/login'; //ok
import { CadastroUsuario } from './components/cadastro-usuario/cadastro-usuario'; //ok
import { ListarItens } from './components/listar-itens/listar-itens'; //ok
import { CadastrarItem } from './components/cadastrar-item/cadastrar-item'; //ok
import { DetalhesItem } from './components/detalhes-item/detalhes-item'; //ok
import { ListaReservas } from './components/lista-reservas/lista-reservas'; //ok
import { AuthGuard } from './guards/guards/auth-guard'; //ok

 
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'cadastro-usuario', component: CadastroUsuario },
  { path: 'detalhes-item', component: DetalhesItem },
  { path: 'cadastrar-item', component: CadastrarItem },
  { path: 'cadastrar-item/:id',component: CadastrarItem },
  { path: 'lista-reservas', component: ListaReservas},
  { path: 'detalhes-item/:id', component: DetalhesItem},
  { path: 'listar-itens', component: ListarItens},



];
