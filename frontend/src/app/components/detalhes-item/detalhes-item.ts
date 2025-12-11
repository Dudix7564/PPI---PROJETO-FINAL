import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ItensService } from '../../services/itens';

@Component({
  selector: 'app-detalhes-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhes-item.html',
  styleUrls: ['./detalhes-item.css']
})
export class DetalhesItem implements OnInit {

  item: any = null;

  constructor(
    private route: ActivatedRoute,
    private itensService: ItensService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.itensService.buscarItemPorId(id).subscribe({
      next: (dados) => {
        this.item = dados;
      },
      error: (err) => console.log(err)
    });
  }

  solicitarReserva() {
    if (!this.item) return;

    const dados = {
      id_item: this.item.id_item,
      solicitante: "admin" // coloque o usuário logado futuramente
    };

    this.itensService.solicitarReserva(dados).subscribe({
      next: () => alert("Reserva solicitada com sucesso!"),
      error: () => alert("Erro ao solicitar reserva!")
    });
  }
}
