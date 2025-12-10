import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ItensService } from '../../services/itens';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-itens',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './listar-itens.html',
  styleUrls: ['./listar-itens.css']
})
export class ListarItens implements OnInit {

  itens: any[] = [];

  constructor(
    private itensService: ItensService,
    private router: Router  // ⬅️ necessário para navegar
  ) {}

  ngOnInit() {
    this.itensService.listarItens().subscribe({
      next: (dados) => {
        console.log("RESPOSTA DA API → ", dados);
        this.itens = dados;
      },
      error: (err) => console.error('Erro ao carregar itens:', err)
    });
  }

  // 🔥 MÉTODO PARA ABRIR DETALHES DO ITEM
  abrirDetalhes(id: number) {
  console.log("clicou", id);
  this.router.navigate(['/detalhes-item', id]);
}

}
