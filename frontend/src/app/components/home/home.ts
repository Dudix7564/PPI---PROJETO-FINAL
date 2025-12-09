import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';   // 👈 IMPORTANTE!

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],                        // 👈 AQUI ESTÁ O ERRO
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {

}
