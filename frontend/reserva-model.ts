export interface Reserva {
  id?: number;
  idItem: number;
  usuario: string;
  dataReserva: string;
  status: 'ativa' | 'finalizada';
}
