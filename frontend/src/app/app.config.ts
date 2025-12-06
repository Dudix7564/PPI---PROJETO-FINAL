import { Routes } from '@angular/router';

import { CadastrarItem } from './components/cadastrar-item/cadastrar-item';
import { EditarItem } from './components/editar-item/editar-item';
import { EntradaSaida } from './components/entrada-saida/entrada-saida';
import { ReservarItem } from './components/reservar-item/reservar-item';
import { ListaReservas } from './components/lista-reservas/lista-reservas';

export const routes: Routes = [
  { path: 'cadastrar-item', component: CadastrarItem },
  { path: 'editar-item', component: EditarItem },
  { path: 'entrada-saida', component: EntradaSaida },
  { path: 'reservar-item', component: ReservarItem },
  { path: 'lista-reservas', component: ListaReservas },
];
