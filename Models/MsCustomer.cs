using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RentCarApp.Models
{
    [Table("MsCustomer")]
    public class MsCustomer
    {
        [Key]
        [Column("customer_id")]
        public string CustomerId { get; set; } = string.Empty;

        [Required]
        [Column("email")]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Column("password")]
        public string Password { get; set; } = string.Empty;

        [Required]
        [Column("name")]
        public string Name { get; set; } = string.Empty;

        [Column("phone_number")]
        public string? PhoneNumber { get; set; }

        [Column("address")]
        public string? Address { get; set; }

        [Column("driver_license_number")]
        public string? DriverLicenseNumber { get; set; }
    }
}