import {Component, inject, OnInit} from '@angular/core';
import {ContactDetailsDto} from "../../models/ContactDetailsDto";
import {ContactsService} from "../../services/contacts.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ContactCategory} from "../../models/ContactCategory";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit{

  contact?: ContactDetailsDto;
  category?: String;


  contactsService = inject(ContactsService);
  route = inject(ActivatedRoute);

  ngOnInit() {
    const contactId = this.route.snapshot.paramMap.get('id');
    if (contactId) {
      this.loadContact(contactId);
    }
  }

  loadContact(contactId: string) {
    this.contactsService.getContact(contactId).subscribe(contact => {
      console.log(contact);
      this.contact = contact;
      this.getCategoryLabel(contact.category);
    })
  }

  getCategoryLabel(category: number): void {
    this.category = ContactCategory[category] ?? 'Nieznana kategoria';
  }

}
