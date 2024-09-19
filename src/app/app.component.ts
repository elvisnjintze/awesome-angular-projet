import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { HeaderComponent } from './core/components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  //imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    CommonModule,
    CoreModule, // Importe CoreModule pour que HeaderComponent soit reconnu
    //HeaderComponent // Si tu souhaites l'importer directement aussi
  ],
})
export class AppComponent {
  title = 'awesome-components';
}
