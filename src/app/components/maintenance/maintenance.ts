import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Navbar } from '../../utils/navbar/navbar';
import { Footer } from '../../utils/footer/footer';
import { CustomerService } from '../../services/http/customer-service';
import { Customer } from '../../utils/interfaces/customer.interface';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import sweetAlert from 'sweetalert2';
import { documentValidator } from 'do-validator';

@Component({
  selector: 'app-maintenance',
  imports: [Navbar, Footer, ReactiveFormsModule],
  templateUrl: './maintenance.html',
  styleUrl: './maintenance.css',
})
export class Maintenance implements OnInit {
  customers: Customer[] = [];
  userForm: FormGroup;
  isLoading: boolean = false;
  selectedCustomer: Customer | null = null;
  isEditMode: boolean = false;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.userForm = this.fb.group({
      document: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  submitForm(isEdit = false): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    const documentNumber = this.removeHyphens(this.userForm.value.document);

    if (!documentValidator(documentNumber)) {
      this.closeModal();

      sweetAlert
        .fire({
          icon: 'error',
          title: 'Error',
          text: 'El número de documento ingresado no parece una cédula dominicana válida.',
          confirmButtonText: 'Aceptar',
        })
        .then(() => {
          this.openModal();
        });

      return;
    }

    this.userForm.patchValue({
      document: documentNumber,
    });

    if (isEdit) {
      this.updateCustomer();
      return;
    }

    const newCustomer: Customer = this.userForm.value;
    this.customerService.createCustomer(newCustomer).subscribe({
      next: (_) => {
        this.getCustomers();
        sweetAlert.fire({
          title: 'Usuario creado!',
          icon: 'success',
          draggable: true,
        });
        this.closeModal();
        this.userForm.reset();
      },
      error: (error) => {
        console.error('Error creating customer:', error);
      },
    });
  }

  closeModal(resetData: boolean = false, className: string = 'userModal') {
    if (resetData) {
      this.userForm.reset();
      this.isEditMode = false;
      this.selectedCustomer = null;
    }
    (document.getElementById(className) as HTMLDialogElement)?.close();
  }

  openModal(className: string = 'userModal') {
    (document.getElementById(className) as HTMLDialogElement)?.showModal();
  }

  getCustomers(): void {
    this.isLoading = true;
    this.cdr.detectChanges();
    this.customerService.getCustomers().subscribe({
      next: (customers: Customer[]) => {
        this.customers = customers;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  removeHyphens(documentNumber: string): string {
    return documentNumber.replace(/-/g, '');
  }

  selectCustomerToEdit(customer: Customer): void {
    this.selectedCustomer = customer;
    this.isEditMode = true;
    this.userForm.patchValue({
      document: customer.document,
      name: customer.name,
      lastName: customer.lastName,
      email: customer.email,
      dateOfBirth: customer.dateOfBirth.toString().substring(0, 10),
    });
    this.openModal();
  }

  selectCustomerToDelete(customer: Customer): void {
    this.selectedCustomer = customer;
    this.openModal('delete_modal');
  }

  updateCustomer(): void {
    const updatedCustomer: Customer = {
      ...this.selectedCustomer,
      ...this.userForm.value,
    };

    updatedCustomer.updatedAt = new Date();

    console.log('Updating customer:', updatedCustomer);

    this.customerService.updateCustomer(updatedCustomer).subscribe({
      next: (_) => {
        this.getCustomers();
        this.closeModal();
        this.userForm.reset();
        this.isEditMode = false;
        this.selectedCustomer = null;
      },
      error: (error) => {
        console.error('Error updating customer:', error);
      },
    });
  }

  deleteCustomer(): void {
    if (!this.selectedCustomer) return;

    this.customerService.deleteCustomer(this.selectedCustomer.id).subscribe({
      next: (_) => {
        this.getCustomers();
        this.closeModal(false, 'delete_modal');
        sweetAlert.fire({
          title: 'Usuario eliminado!',
          icon: 'success',
          draggable: true,
        });
      },
      error: (error) => {
        console.error('Error deleting customer:', error);
      },
    });
  }
}
