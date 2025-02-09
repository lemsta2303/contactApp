using contactApp.Enums;

namespace contactApp.Model.Entities
{
    public class Contact
    {
        public Guid Id { get; set; }
        public string FirsName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public ContactCategory Category { get; set; }
        public string? SubCategory { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime BirthDate { get; set; }
    }
}
