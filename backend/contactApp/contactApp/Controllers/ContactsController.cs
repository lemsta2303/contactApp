using contactApp.Data;
using contactApp.Model;
using contactApp.Model.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using contactApp.Services;
using contactApp.Model.Dto;
using Microsoft.AspNetCore.Authorization;


namespace contactApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly ContactsContext dbContext;
        private readonly ContactService contactService;

        public ContactsController(ContactsContext dbContext, ContactService contactService)
        {
            this.dbContext = dbContext;
            this.contactService = contactService;
        }

        [HttpGet]
        public IActionResult GetAllContacts()
        {
            var contactsSummary = dbContext.Contacts.Select(c => new ContactSummaryDto
            {
                Id = c.Id,
                FirstName = c.FirsName,
                LastName = c.LastName,
                PhoneNumber = c.PhoneNumber
            }).ToList();

            return Ok(contactsSummary);
        }

        [HttpGet("{id:guid}")]
        public IActionResult GetContact(Guid id)
        {
            var contact = dbContext.Contacts.Find(id);
            if (contact == null)
            {
                return NotFound();
            }
            return Ok(contact);
        }

        [Authorize]
        [HttpPost]
        public IActionResult AddContact(AddUpdateContactDto contact)
        {

            //subcategory validation
            if (!contactService.IsSubcategoryValid(contact.Category, contact.SubCategory))
            {
                return BadRequest("Invalid subcategory for the selected category.");
            }

            //email validation
            if (!contactService.isEmailUnique(contact.Email))
            {
                return BadRequest("Email already exists.");
            }

            var contactEntity = new Contact()
            {
                FirsName = contact.FirsName,
                LastName = contact.LastName,
                Email = contact.Email,
                Password = contact.Password,
                Category = contact.Category,
                SubCategory = contact.SubCategory,
                PhoneNumber = contact.PhoneNumber,
                BirthDate = contact.BirthDate
            };

            dbContext.Contacts.Add(contactEntity);
            dbContext.SaveChanges();
            return Ok(contactEntity);
        }

        [Authorize]
        [HttpPut("{id:guid}")]
        public IActionResult UpdateContact(Guid id, AddUpdateContactDto updatedContact)
        {
            var contact = dbContext.Contacts.Find(id);

            if (contact == null)
            {
                return NotFound();
            }
            

            // subcategory validation
            if (!contactService.IsSubcategoryValid(updatedContact.Category, updatedContact.SubCategory))
            {
                return BadRequest("Invalid subcategory for the selected category.");
            }

            // email validation
            if (contact.Email != updatedContact.Email && !contactService.isEmailUnique(updatedContact.Email))
            {
                return BadRequest("Email already exists.");
            }

            contact.FirsName = updatedContact.FirsName;
            contact.LastName = updatedContact.LastName;
            contact.Email = updatedContact.Email;
            contact.Password = updatedContact.Password;
            contact.Category = updatedContact.Category;
            contact.SubCategory = updatedContact.SubCategory;
            contact.PhoneNumber = updatedContact.PhoneNumber;
            contact.BirthDate = updatedContact.BirthDate;
            dbContext.SaveChanges();
            return Ok(contact);

        }

        [Authorize]
        [HttpDelete("{id:guid}")]
        public IActionResult DeleteContact(Guid id)
        {
            var contact = dbContext.Contacts.Find(id);
            if (contact == null)
            {
                return NotFound();
            }
            dbContext.Contacts.Remove(contact);
            dbContext.SaveChanges();
            return Ok();
        }


    }
}
