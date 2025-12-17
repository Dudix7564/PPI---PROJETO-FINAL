import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReservaService } from '../../services/services/reservas';
import { AuthService } from '../../services/services/auth'; // Verifique se este caminho está certo no seu projeto

@Component({
  selector: 'app-lista-reservas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-reservas.html'
})
export class ListaReservas implements OnInit {
  reservas: any[] = [];

  // O 'public' é obrigatório para o HTML conseguir enxergar o authService
  constructor(
    private http: HttpClient, 
    private reservaService: ReservaService,
    public authService: AuthService 
  ) {}

  ngOnInit(): void {
    this.carregarReservas();
  }

  // Criado o método que estava faltando e que o finalizar() tenta chamar
  carregarReservas(): void {
    this.reservaService.listarTodasReservas().subscribe({
      next: (data) => {
        this.reservas = data;
        console.log('Reservas carregadas:', data);
      },
      error: (err) => console.error('Erro ao carregar reservas', err)
    });
  }

  atualizarStatusReserva(reserva: any, novoStatus: 'aprovado' | 'negado') {
    if (novoStatus === 'aprovado') {
      // id_item conforme sua tabela
      this.http.get(`http://localhost:3000/itens/${reserva.id_item}`).subscribe({
        next: (item: any) => {
          if (item && item.quantidade > 0) {
            const novaQtd = item.quantidade - 1;
            this.http.put(`http://localhost:3000/itens/${reserva.id_item}`, { ...item, quantidade: novaQtd }).subscribe({
              next: () => this.finalizar(reserva.id_reserva, 'aprovado'),
              error: () => {
                console.warn("Falha ao atualizar estoque, mas aprovando reserva.");
                this.finalizar(reserva.id_reserva, 'aprovado');
              }
            });
          } else {
            alert("Estoque insuficiente no banco!");
          }
        },
        error: () => this.finalizar(reserva.id_reserva, 'aprovado')
      });
    } else {
      this.finalizar(reserva.id_reserva, 'negado');
    }
  }

  private finalizar(id: number, status: string) {
    this.reservaService.atualizarStatusReserva(id, status as any).subscribe({
      next: () => {
        this.carregarReservas();
        alert(`Solicitação ${status} com sucesso!`);
      }
    });
  }

  statusClasse(status: string) {
    return {
      'badge bg-warning text-dark': status === 'pendente',
      'badge bg-success': status === 'aprovado',
      'badge bg-danger': status === 'negado'
    };
  }
}