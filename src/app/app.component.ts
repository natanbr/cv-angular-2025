import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ChatButtonComponent} from './chat-button/chat-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ChatButtonComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
}
