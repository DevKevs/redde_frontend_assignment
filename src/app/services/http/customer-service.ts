import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../configuration/config';
import { Observable } from 'rxjs';
import { Customer } from '../../utils/interfaces/customer.interface';
import { ApiResponse } from '../../utils/interfaces/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  public getCustomers(): Observable<Customer[]> {
    const url = `${this.configService.apiUrl}Customer`;
    return this.http.get<Customer[]>(url);
  }

  public getCustomerByDocument(document: string): Observable<Customer> {
    const url = `${this.configService.apiUrl}Customer/get-by-document/${document}`;
    return this.http.get<Customer>(url);
  }

  public createCustomer(customer: Customer): Observable<Customer> {
    const url = `${this.configService.apiUrl}Customer`;
    return this.http.post<Customer>(url, customer);
  }

  public updateCustomer(customer: Customer): Observable<ApiResponse> {
    const url = `${this.configService.apiUrl}Customer`;
    return this.http.put<ApiResponse>(url, customer);
  }

  public deleteCustomer(customerId: string): Observable<ApiResponse> {
    const url = `${this.configService.apiUrl}Customer/${customerId}`;
    return this.http.delete<ApiResponse>(url);
  }

}
