import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-chat-button',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './chat-button.component.html',
  styleUrls: ['./chat-button.component.scss']
})
export class ChatButtonComponent {
  constructor(public dialog: MatDialog) {}

  openChatDialog(): void {
    this.dialog.open(ChatComponent, {
      width: '600px',
      height: '600px',
      hasBackdrop: true,
      position: {
        bottom: '20px',
        right: '20px'
      },
      panelClass: 'chat-dialog-panel'
    });
  }
}
