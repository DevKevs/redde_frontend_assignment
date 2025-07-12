import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../configuration/config';
import { Observable } from 'rxjs';
import { Customer } from '../../utils/interfaces/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  getCustomerByDocument(document: string): Observable<Customer> {
    const url = `${this.configService.apiUrl}Customer/get-by-document/${document}`;
    return this.http.get<Customer>(url);
  }
}
