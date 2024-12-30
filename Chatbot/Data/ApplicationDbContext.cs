using Chatbot.Models;
using Microsoft.EntityFrameworkCore;


namespace Chatbot.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<ChatbotModel> Chatbot { get; set; }
    }
}
