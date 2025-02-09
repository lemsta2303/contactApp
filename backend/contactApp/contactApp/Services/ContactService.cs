using contactApp.Data;
using contactApp.Enums;

namespace contactApp.Services
{
    public class ContactService

    {
        private readonly ContactsContext dbContext;

        public ContactService(ContactsContext dbContext)
        {
            this.dbContext = dbContext;
        }

        private readonly Dictionary<ContactCategory, List<string>> _categorySubcategories = new()
        {
            { ContactCategory.Sluzbowy, new List<string> { "szef", "klient", "pracownik" } }, // subcategories for business contacts
            { ContactCategory.Prywatny, new List<string>() }, // private numbers should not have subcategories
            { ContactCategory.Inny, new List<string>() } // other category can have any subcategory
        };

        public bool IsSubcategoryValid(ContactCategory category, string? subCategory)
        {
            if (category == ContactCategory.Prywatny && !string.IsNullOrEmpty(subCategory))
            {
                return false; 
            }

            if (category == ContactCategory.Sluzbowy)
            {
                return _categorySubcategories[category].Contains(subCategory ?? string.Empty);
            }

            return true;
        }

        public bool isEmailUnique(string email)
        {
            return !dbContext.Contacts.Any(c => c.Email == email);
        }

    }
}
