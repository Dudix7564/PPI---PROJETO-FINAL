import { Component, OnInit } from '@angular/core';
// Importa Router e RouterModule para habilitar o redirecionamento
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { HttpClient, HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-detalhes-item',
  templateUrl: './detalhes-item.html',
  standalone: true, 
  // Adicionamos RouterModule para que o Router funcione corretamente em um componente standalone
  imports: [CommonModule, HttpClientModule, RouterModule] 
})
export class DetalhesItem implements OnInit {

  item: any;
  tipoUsuario: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router, // <-- NOVO: Injeção do Roteador
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Pega o usuário do localStorage e define o tipo
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
      try {
        const usuario = JSON.parse(usuarioString);
        this.tipoUsuario = usuario.tipo;
      } catch (e) {
        console.error('Erro ao fazer parse do usuário no localStorage:', e);
      }
    }

    // Pega o id do item da rota
    const id = this.route.snapshot.paramMap.get('id');
    
    if (!id) {
        console.error("ID do item não encontrado na rota.");
        return; 
    }

    // Requisição HTTP para buscar os detalhes do item
    this.http.get<any>(`http://localhost:3000/itens/${id}`)
      .subscribe({
        next: (dados) => {
            this.item = dados;
        },
        error: (err) => {
            console.error('Erro ao carregar os detalhes do item:', err);
            alert('Não foi possível carregar o item. Verifique se o servidor está ativo.');
        }
      });
  }

  solicitarReserva() {
    // Busca as chaves corretas que você usa para checar o login
    const idUsuario = localStorage.getItem('id_usuario');
    const tipoUsuario = localStorage.getItem('tipo_usuario');

    // 1. VERIFICA SE ESTÁ LOGADO
    if (!idUsuario) {
      alert('Você não está logado. Redirecionando para a página de login.');
      this.router.navigate(['/login']); // <-- AQUI É O REDIRECIONAMENTO!
      return;
    }

    // 2. VERIFICA SE É COMUNIDADE (Nosso foco atual)
    if (tipoUsuario !== 'comunidade') {
        alert('Apenas usuários da Comunidade podem solicitar reservas por aqui.');
        return;
    }

    if (!this.item) {
      alert('Item não carregado');
      return;
    }
    
    // 3. ENVIA A RESERVA
    this.http.post('http://localhost:3000/reservas', {
      id_item: this.item.id_item,
      id_usuario: idUsuario 
    }).subscribe({
      next: () => {
        // Reserva para a Comunidade: mensagem de aprovado (assumindo que o backend aprova automaticamente)
        alert('Reserva solicitada e APROVADA com sucesso!');
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao solicitar reserva. Verifique a disponibilidade do item.');
      }
    });
  }
}