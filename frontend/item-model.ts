export interface Item {
  id?: number;
  nome: string;
  modelo: string;
  quantidade: number;
  tombamento?: string;
  reservadoPor?: string | null;
  statusReserva?: boolean;
}
