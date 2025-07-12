import { Injectable } from '@angular/core';
import config from '../../../../public/config/config.json'

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any;

  async loadConfig(){
    this.config = config;
  }

  get apiUrl(): string {
    return this.config?.apiUrl;
  }

  get version(): string {
    return this.config?.version;
  }
}
