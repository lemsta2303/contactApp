using contactApp.Enums;

namespace contactApp.Model.Dto
{
    public class ContactSummaryDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }

    }
}
