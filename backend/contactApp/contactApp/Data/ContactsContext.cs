using contactApp.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace contactApp.Data
{
    public class ContactsContext : DbContext
    {
        public ContactsContext(DbContextOptions<ContactsContext> options)
            : base(options)
        {
        }

        public DbSet<Contact> Contacts { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
