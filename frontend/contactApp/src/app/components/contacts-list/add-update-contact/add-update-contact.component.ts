import {Component, inject} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ContactsService} from "../../../services/contacts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AddUpdateContactDto} from "../../../models/AddUpdateContactDto";
import {AuthService} from "../../../services/auth.service";



@Component({
  selector: 'app-add-update-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-update-contact.component.html',
  styleUrl: './add-update-contact.component.scss'
})
export class AddUpdateContactComponent {
  contactForm!: FormGroup;
  isEditingMode = false;
  contactId: string | null = null;

  fb = inject(FormBuilder);
  contactsService = inject(ContactsService);
  authService = inject(AuthService)
  route = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firsName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$'),
        ],
      ],
      category: ['', [Validators.required]],
      subCategory: [''],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{7,14}$/)]],
      birthDate: ['', [Validators.required]],
    });

    this.contactForm.get('category')?.valueChanges.subscribe(() => {
      this.updateSubCategoryValidators();
    });

    this.contactId = this.route.snapshot.paramMap.get('id');
    if (this.contactId) { // check if id in url, if yes then we are in editing mode
      this.isEditingMode = true;
      this.loadContact();
    }
  }

  loadContact(): void {
    if (!this.contactId) return;
    this.contactsService.getContact(this.contactId).subscribe((contact) => {

      if (contact.birthDate) { // case for date prepopulation
        contact.birthDate = this.formatDateForInput(contact.birthDate);
      }

      this.contactForm.patchValue(contact); //prepopulation
    });
  }

  formatDateForInput(date: string): string {
    const localDate = new Date(date);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0'); // adding one beacause of time zone
    const day = String(localDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }


  onSubmit(): void {
    if (this.contactForm.invalid) {
      alert('Formularz zawiera błędy.');
      return;
    }

    const contactData: AddUpdateContactDto = this.contactForm.value;

    if (this.isEditingMode && this.contactId) {
      this.contactsService.updateContact(this.contactId, contactData).subscribe(() => {
        alert('Kontakt zaktualizowany!');
        this.router.navigate(['/']);
      });
    } else {
      this.contactsService.addContact(contactData).subscribe(() => {
        alert('Kontakt dodany!');
        this.router.navigate(['/']);
      });
    }
  }

  updateSubCategoryValidators(): void {
    const category = this.contactForm.get('category')?.value;
    const subCategoryControl = this.contactForm.get('subCategory');

    if (category === 1) {   // Służbowy
      subCategoryControl?.setValidators([Validators.required, this.businessSubCategoryValidator()]);
    } else if (category === 2) { // Prywatny
      subCategoryControl?.setValidators([this.privateCategoryValidator()]);
    } else { // Inny
      subCategoryControl?.clearValidators();
    }

    subCategoryControl?.updateValueAndValidity();
  }

  businessSubCategoryValidator(): (control: AbstractControl) => { [key: string]: any } | null {
    const validSubCategories = ['szef', 'klient', 'pracownik'];
    return (control: AbstractControl) => {
      if (control.value && !validSubCategories.includes(control.value)) {
        return { invalidSubCategory: 'Subkategoria musi być jedną z: szef, klient, pracownik' };
      }
      return null;
    };
  }

  privateCategoryValidator(): (control: AbstractControl) => { [key: string]: any } | null {
    return (control: AbstractControl) => {
      if (control.value) {
        return { invalidSubCategory: 'Subkategoria nie może być ustawiona dla kategorii Prywatny' };
      }
      return null;
    };
  }




}
