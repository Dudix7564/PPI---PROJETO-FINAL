import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaService } from '../../services/services/reservas';

@Component({
  selector: 'app-lista-reservas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-reservas.html',
  styleUrls: ['./lista-reservas.css']
})
export class ListaReservas implements OnInit {

  reservas: any[] = [];
  tipoUsuario: 'funcionario' | 'comunidade' = 'funcionario';
  idUsuario = 1;

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.carregarReservas();
  }

  carregarReservas() {
    this.reservaService.listarTodasReservas().subscribe({
      next: (data) => {
        this.reservas = data;
        console.log('RESERVAS:', data);
      },
      error: (err) => console.error(err)
    });
  }

  atualizarStatusReserva(id: number, status: 'aprovado' | 'negado') {
    this.reservaService.atualizarStatusReserva(id, status).subscribe(() => {
      this.carregarReservas();
    });
  }

  statusClasse(status: string) {
    return {
      'badge bg-warning': status === 'pendente',
      'badge bg-success': status === 'aprovado',
      'badge bg-danger': status === 'negado'
    };
  }
}
