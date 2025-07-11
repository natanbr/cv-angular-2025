import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ChatbotService } from '../services/ai-agent.service';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('messageList') private messageListRef!: ElementRef;
  messages: Message[] = [];
  newMessage: string = '';

  constructor(
    private chatbotService: ChatbotService,
    public dialogRef: MatDialogRef<ChatComponent>
  ) { }

  ngOnInit(): void {
    this.messages.push({ text: "Hi, I'm Nathan's AI agent.", sender: 'bot' });
    this.messages.push({ text: "I'm here to help you learn more about Nathan's experience and expertise. Feel free to ask me any questions.", sender: 'bot' });
  }

  sendMessage(): void {
    if (this.newMessage.trim() === '') {
      return;
    }

    this.messages.push({ text: this.newMessage, sender: 'user' });

    this.chatbotService.sendMessage(this.newMessage).subscribe({
      next: (response) => {
        const botReply = response.answer || 'Sorry, I could not understand that.';
        this.messages.push({ text: botReply, sender: 'bot' });
      },
      error: (error) => {
        console.error('Error sending message to bot:', error);
        this.messages.push({ text: 'Error: Could not connect to the bot.', sender: 'bot' });
      }
    });

    this.newMessage = '';
  }

  closeChat(): void {
    this.dialogRef.close();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      const element = this.messageListRef.nativeElement;
      element.scrollTop = element.scrollHeight;
    } catch (err) {
    }
  }
}
