using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RentCarApp.Models
{
    [Table("MsCar")]
    public class MsCar
    {
        // 1. WAJIB ISI (NOT NULL)
        // Kita kasih nilai awal "= string.Empty;" supaya komputer tidak protes.

        [Key]
        [Column("car_id")]
        public string CarId { get; set; } = string.Empty;

        [Required]
        [Column("name")]
        public string Name { get; set; } = string.Empty;

        // 2. BOLEH KOSONG (NULLABLE)
        // Kita kasih tanda tanya "?" (string?) artinya boleh tidak diisi.

        [Column("model")]
        public string? Model { get; set; }

        [Column("year")]
        public int? Year { get; set; }

        [Column("license_plate")]
        public string? LicensePlate { get; set; }

        [Column("number_of_car_seats")]
        public int? NumberOfCarSeats { get; set; }

        [Column("transmission")]
        public string? Transmission { get; set; }

        [Column("price_per_day")]
        public decimal? PricePerDay { get; set; }

        [Column("status")]
        public int? Status { get; set; }

        [Column("image_link")]
        public string? ImageLink { get; set; }
    }
}