using System;
using System.Collections.Generic;

namespace RentCarApp.Models;

public partial class MsCarImage
{
    public string ImageCarId { get; set; } = null!;

    public string? CarId { get; set; }

    public string? ImageLink { get; set; }

    public virtual MsCar? Car { get; set; }
}
