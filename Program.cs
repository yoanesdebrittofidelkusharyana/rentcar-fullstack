using Microsoft.EntityFrameworkCore;
using RentCarApp.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. DAFTARKAN DATABASE (Jembatan ke SQL)
builder.Services.AddDbContext<RentCarDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string not found.")));

// 2. DAFTARKAN CONTROLLERS (Agar API jalan)
builder.Services.AddControllers();

// 3. SETTING CORS (PENTING! Agar React bisa baca data)
builder.Services.AddCors(options =>
{
    options.AddPolicy("BolehkanReact",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") // Alamat React Anda
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// 4. AKTIFKAN CORS (PENTING!)
app.UseCors("BolehkanReact");

app.UseAuthorization();

app.MapControllers(); // Ini yang menjalankan CarController tadi

app.Run();