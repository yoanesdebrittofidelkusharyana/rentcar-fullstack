using System;
using System.Collections.Generic;

namespace RentCarApp.Models;

public partial class MsEmployee
{
    public string EmployeeId { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Position { get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public virtual ICollection<TrMaintenance> TrMaintenances { get; set; } = new List<TrMaintenance>();
}
