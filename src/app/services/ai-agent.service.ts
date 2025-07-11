import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // This service is still provided globally
})
export class ChatbotService {
  private apiUrl = 'https://api-bcbe5a.stack.tryrelevance.com/latest/studios/36210afd-92d9-4126-a93b-84746213ed02/trigger_webhook?project=db1a4796-436c-4c4d-92e5-4bb8f6740e06'; // Replace with your AI bot's API endpoint
  // private apiKey = 'YOUR_API_KEY'; // Consider environment variables for production

  constructor(private http: HttpClient) { }

  sendMessage(message: string): Observable<any> {
    const headers = new HttpHeaders({
       'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${this.apiKey}` // If your API requires an API key or token
    });

    const body = JSON.stringify({
      visitor_question: message,
      // Add any other parameters your AI bot API expects
    });

    return this.http.post(this.apiUrl, body, { headers });
  }
}
