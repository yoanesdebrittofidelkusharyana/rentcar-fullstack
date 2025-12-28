using Microsoft.EntityFrameworkCore;
using RentCarApp.Models;

namespace RentCarApp.Data
{
    public class RentCarDbContext : DbContext
    {
        public RentCarDbContext(DbContextOptions<RentCarDbContext> options) : base(options)
        {
        }

        public DbSet<MsCar> MsCars { get; set; }
        public DbSet<MsCustomer> MsCustomers { get; set; }

        // TAMBAHKAN INI:
        public DbSet<TrRental> TrRentals { get; set; }
    }
}