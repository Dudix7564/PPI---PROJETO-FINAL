import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import { ItensService } from '../../services/itens'; // Importação correta

@Component({
  selector: 'app-detalhes-item',
  templateUrl: './detalhes-item.html',
  standalone: true, 
  imports: [CommonModule, HttpClientModule, RouterModule] 
})
export class DetalhesItem implements OnInit {

  item: any;
  tipoUsuario: string = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router, // MUDADO PARA PUBLIC para o HTML não dar erro
    private http: HttpClient,
    private itensService: ItensService // ADICIONADO: Faltava injetar o serviço aqui
  ) {}

  ngOnInit() {
    // Busca os dados do usuário para controle de botões
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
      try {
        const usuario = JSON.parse(usuarioString);
        this.tipoUsuario = usuario.tipo_usuario; 
      } catch (e) {
        console.error('Erro ao ler usuário:', e);
      }
    }

    if (!this.tipoUsuario) {
      this.tipoUsuario = localStorage.getItem('tipo_usuario') || '';
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Usando o serviço que você já tem para buscar por ID
      this.itensService.listarItemPorId(id).subscribe({
        next: (dados) => this.item = dados,
        error: (err) => console.error('Erro ao carregar detalhes:', err)
      });
    }
  }

  irParaEdicao() {
    if (this.item) {
      // Redireciona para o componente de cadastro em modo edição
      this.router.navigate(['/cadastrar-item', this.item.id_item]);
    }
  }

  solicitarReserva() {
    const idUsuario = localStorage.getItem('id_usuario');

    if (!idUsuario) {
      alert('Você não está logado.');
      this.router.navigate(['/login']); 
      return;
    }

    if (this.tipoUsuario !== 'comunidade') {
        alert('Apenas usuários da Comunidade podem solicitar reservas.');
        return;
    }

    this.http.post('http://localhost:3000/reservas', {
      id_item: this.item.id_item,
      id_usuario: idUsuario 
    }).subscribe({
      next: () => {
        alert('Reserva solicitada com sucesso!');
        this.router.navigate(['/lista-reservas']); //
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao solicitar reserva.');
      }
    });
  }

  excluir(id: any) {
    if (confirm('Tem certeza que deseja excluir este item permanentemente?')) {
      // Chama o método que adicionamos ao seu ItensService
      this.itensService.excluirItem(id).subscribe({
        next: () => {
          alert('Item excluído com sucesso!');
          this.router.navigate(['/listar-itens']); 
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao excluir item.');
        }
      });
    }
  }
}