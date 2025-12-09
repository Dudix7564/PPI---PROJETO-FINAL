import { Routes } from '@angular/router';

import { Home } from './components/home/home'; //ok
import { Login } from './components/login/login'; 
import { CadastroUsuario } from './components/cadastro-usuario/cadastro-usuario';
import { ListarItens } from './components/listar-itens/listar-itens'; //ok
import { CadastrarItem } from './components/cadastrar-item/cadastrar-item';
import { EditarItem } from './components/editar-item/editar-item';
import { EntradaSaida } from './components/entrada-saida/entrada-saida';
import { ReservarItem } from './components/reservar-item/reservar-item';
import { PaginaRestrita } from './components/pagina-restrita/pagina-restrita';
import { DetalhesItem } from './components/detalhes-item/detalhes-item'; //ok



export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'cadastro-usuario', component: CadastroUsuario },


  // Área do funcionário
  { path: 'cadastrar-item', component: CadastrarItem },
  { path: 'editar-item/:id', component: EditarItem },
  { path: 'entrada-saida', component: EntradaSaida },

  // Área da comunidade
  { path: 'reservar-item/:id', component: ReservarItem },
  { path: 'detalhes-item/:id', component: DetalhesItem},
  { path: 'listar-itens', component: ListarItens},


  // Página restrita
  { path: 'pagina-restrita', component: PaginaRestrita }
];
