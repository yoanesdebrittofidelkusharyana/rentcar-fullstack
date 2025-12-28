using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RentCarApp.Models;

[Table("TrRental")]
public partial class TrRental
{
    [Key]
    [Column("rental_id")]
    public string RentalId { get; set; } = null!;

    [Column("rental_date")]
    public DateTime RentalDate { get; set; }

    [Column("return_date")]
    public DateTime ReturnDate { get; set; }

    [Column("total_price")]
    public decimal TotalPrice { get; set; }

    [Column("payment_status")]
    public string PaymentStatus { get; set; } = null!;

    [Column("customer_id")]
    public string CustomerId { get; set; } = null!;

    [Column("car_id")]
    public string CarId { get; set; } = null!;

    // Relasi ke tabel induk (Biarkan ini, ini AMAN)
    public virtual MsCar? Car { get; set; }
    public virtual MsCustomer? Customer { get; set; }


}

// Class Amplop (DTO) tetap ada di bawah sini
public class RentalRequestModel
{
    public string CarId { get; set; } = string.Empty;
    public string CustomerEmail { get; set; } = string.Empty;
    public DateTime RentalDate { get; set; }
    public DateTime ReturnDate { get; set; }
    public decimal PricePerDay { get; set; }
}