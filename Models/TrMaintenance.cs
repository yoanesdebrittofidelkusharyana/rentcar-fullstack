using System;
using System.Collections.Generic;

namespace RentCarApp.Models;

public partial class TrMaintenance
{
    public string MaintenanceId { get; set; } = null!;

    public DateTime? MaintenanceDate { get; set; }

    public string? Description { get; set; }

    public decimal? Cost { get; set; }

    public string? CarId { get; set; }

    public string? EmployeeId { get; set; }

    public virtual MsCar? Car { get; set; }

    public virtual MsEmployee? Employee { get; set; }
}
