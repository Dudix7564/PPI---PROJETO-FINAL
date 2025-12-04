export interface User {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  tipo: 'comunidade' | 'funcionario';
}
