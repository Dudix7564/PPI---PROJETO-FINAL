import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItensService } from '../../services/itens';

@Component({
  selector: 'app-cadastrar-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastrar-item.html'
})
export class CadastrarItem {

  item = {
    nome_item: '',
    descricao: '',
    modelo: '',
    tombamento: '',
    quantidade: 0,
    status: '',
    data_cadastro: ''
  };

  // 🔴 ISSO AQUI É O QUE ESTAVA FALTANDO
  constructor(private itensService: ItensService) {}

  cadastrarItem() {
    this.itensService.cadastrarItem(this.item).subscribe({
      next: () => {
        alert('Item cadastrado com sucesso!');
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao cadastrar item');
      }
    });
  }
}
