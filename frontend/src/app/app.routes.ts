import { Routes } from '@angular/router';

import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { CadastroUsuario } from './components/cadastro-usuario/cadastro-usuario';

import { CadastrarItem } from './components/cadastrar-item/cadastrar-item';
import { EditarItem } from './components/editar-item/editar-item';
import { EntradaSaida } from './components/entrada-saida/entrada-saida';
import { ReservarItem } from './components/reservar-item/reservar-item';
import { ListaReservas } from './components/lista-reservas/lista-reservas';
import { PaginaRestrita } from './components/pagina-restrita/pagina-restrita';

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
  { path: 'lista-reservas', component: ListaReservas },

  // Página restrita
  { path: 'pagina-restrita', component: PaginaRestrita }
];
