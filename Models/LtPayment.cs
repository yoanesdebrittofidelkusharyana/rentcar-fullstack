using System;
using System.Collections.Generic;

namespace RentCarApp.Models;

public partial class LtPayment
{
    public string PaymentId { get; set; } = null!;

    public DateTime? PaymentDate { get; set; }

    public decimal? Amount { get; set; }

    public string? PaymentMethod { get; set; }

    public string? RentalId { get; set; }

    public virtual TrRental? Rental { get; set; }
}
