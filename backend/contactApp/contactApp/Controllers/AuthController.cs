using Azure.Identity;
using contactApp.Data;
using contactApp.Model.Dto;
using contactApp.Model.Entities;
using contactApp.Services;
using contactApp.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace contactApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService authService;
        private readonly ContactsContext dbContext;
        public AuthController(AuthService authService, ContactsContext dbContext)
        {
            this.authService = authService;
            this.dbContext = dbContext;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterUserDto registerUser)
        {
           if(dbContext.Users.Any(u => u.Username == registerUser.Username))
            {
                return BadRequest("User with this username already exists.");
            }

            var newUser = new User
            {
                Username = registerUser.Username,
                Password = PasswordHasher.HashPassword(registerUser.Password)
            };

            dbContext.Users.Add(newUser);
            dbContext.SaveChanges();

            return Ok(new { message = "Rejestracja zakończona sukcesem!" });
        }

        [HttpPost("login")]
        public IActionResult Login(LoginUserDto loginUser)
        {
            var user = dbContext.Users.FirstOrDefault(u => u.Username == loginUser.Username);
            if (user == null || !PasswordHasher.VerifyPassword(loginUser.Password, user.Password)) // password verifying via hashing
            {
                return Unauthorized("Invalid username or password.");
            }

            var token = authService.GenerateJwtToken(user.Username);
            return Ok(new { Token = token });
        }



    }
}
