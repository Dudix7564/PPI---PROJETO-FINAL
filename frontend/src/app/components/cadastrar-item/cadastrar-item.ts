import { Component, OnInit } from '@angular/core'; // Adicionado OnInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItensService } from '../../services/itens';
import { ActivatedRoute, Router } from '@angular/router'; // Importado para gerenciar o ID e navegação

@Component({
  selector: 'app-cadastrar-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastrar-item.html'
})
export class CadastrarItem implements OnInit { // Implementando OnInit

  item = {
    id_item: null, // Campo importante para a edição
    nome_item: '',
    descricao: '',
    modelo: '',
    tombamento: '',
    quantidade: 0,
    status: 'disponivel', // Valor padrão
    data_cadastro: ''
  };

  modoEdicao: boolean = false;

  constructor(
    private itensService: ItensService,
    private route: ActivatedRoute, // Para ler o ID da URL
    public router: Router
  ) {}

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.modoEdicao = true;
    this.itensService.listarItemPorId(id).subscribe({
      next: (dados: any) => {
        // Resolve o erro de formato de data
        if (dados.data_cadastro && dados.data_cadastro.includes('T')) {
          dados.data_cadastro = dados.data_cadastro.split('T')[0];
        }
        this.item = dados;
      }
    });
  }
}

salvarItem() {
  // Usamos 'id_item' que é o nome da coluna no seu MySQL
  const idParaAtualizar = this.item.id_item; 

  if (this.modoEdicao && idParaAtualizar) {
    this.itensService.atualizarItem(idParaAtualizar, this.item).subscribe({
      next: () => {
        alert('Item atualizado com sucesso!');
        this.router.navigate(['/listar-itens']);
      },
      error: (err) => {
        console.error('Erro 404 detalhado:', err);
        alert('Erro ao atualizar: Verifique se a rota PUT /itens/:id existe no seu servidor.');
      }
    });
  } else {
    // Lógica do cadastrarItem (POST) que você já tem
  }
}
}