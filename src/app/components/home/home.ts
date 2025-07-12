import { Component, ChangeDetectorRef } from '@angular/core';
import { Footer } from '../../utils/footer/footer';
import { Navbar } from '../../utils/navbar/navbar';
import { CustomerService } from '../../services/http/customer-service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import sweetAlert from 'sweetalert2';
import { documentValidator } from 'do-validator';

@Component({
  selector: 'app-home',
  imports: [Footer, Navbar, ReactiveFormsModule, DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  form: FormGroup;
  isLoading: boolean = false;
  userData: any = null;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      documentNumber: ['', Validators.required],
    });
  }

  searchDocument() {
    if (this.form.invalid) {
      sweetAlert.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor completa todos los campos requeridos.',
      });
      return;
    }

    const documentNumber = this.removeHyphens(this.form.value.documentNumber);

    if (!documentValidator(documentNumber)) {
      sweetAlert.fire({
        icon: 'error',
        title: 'Error',
        text: 'El número de documento ingresado no parece una cedula dominicana válida.',
      });
      return;
    }

    if (documentNumber.trim() === '') {
      alert('Por favor ingresa un número de documento.');
      return;
    }

    this.userData = null;
    this.isLoading = true;

    this.cdr.detectChanges();

    this.customerService.getCustomerByDocument(documentNumber).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.userData = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching customer data:', error);
        sweetAlert.fire({
          icon: 'info',
          title: 'Usuario no encontrado',
          text: 'No se pudo encontrar el cliente con el número de documento proporcionado.',
        });
        this.userData = null;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  removeHyphens(documentNumber: string): string {
    return documentNumber.replace(/-/g, '');
  }
}
