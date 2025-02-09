import {Component, inject, OnInit} from '@angular/core';
import {ContactSummaryDto} from "../../models/ContactSummaryDto";
import {ContactsService} from "../../services/contacts.service";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss'
})
export class ContactsListComponent implements OnInit{

  contacts: ContactSummaryDto[] = [];

  contactsService = inject(ContactsService);
  authService = inject(AuthService);

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.contactsService.getAllContacts().subscribe(contacts => {
      this.contacts = contacts;
      console.log(this.contacts);
    })
  }

  deleteContact(id: string): void {

    this.contactsService.deleteContact(id).subscribe(() => {
      this.loadContacts();
    });
  }

}
