import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ImageaiService {
  constructor(
    private http: HttpClient
  ) {}

  sendPrompt(prompt: string) {
    return this.http.post(environment.baseUrl + environment.imageai, { prompt })
  }
}
