using ChineseSale.Dtos;
using ChineseSale.Models;
using ChineseSale.Repositories;
using System.Text;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;

namespace ChineseSale.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _config;
        public UserService(IUserRepository userRepository, IConfiguration config)
        {
            _userRepository = userRepository;
            _config = config;
        }
        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            return Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(password)));
        }
        public async Task<IEnumerable<GetUserDto>> GetAllUsersAsync()
        {
            IEnumerable<User> users = await _userRepository.GetAllUsersAsync();
            List<GetUserDto> userDtos = new List<GetUserDto>();
            foreach (var user in users)
            {
                GetUserDto userDto = new GetUserDto()
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    Address = user.Address,
                    Phone = user.Phone,
                    UserName = user.UserName,
                    Role = user.Role
                };
                userDtos.Add(userDto);
            }
            return userDtos;
        }

        public async Task<GetUserDto?> GetUserByIdAsync(int Id)
        {
            User user = await _userRepository.GetUserByIdAsync(Id);
            if (user != null)
            {


                GetUserDto userDto = new GetUserDto()
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    Address = user.Address,
                    Phone = user.Phone,
                    UserName = user.UserName,
                    Role = user.Role
                };
                return userDto;
            }
            else
                throw new ArgumentException("user not found");
        }
        public async Task<GetUserDto?> GetUserByUserNameAsync(string UserName)
        {
            User user = await _userRepository.GetUserByUserNameAsync(UserName);
            if (user != null)
            {
                GetUserDto userDto = new GetUserDto()
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    Address = user.Address,
                    Phone = user.Phone,
                    UserName = user.UserName,
                    Role = user.Role
                };
                return userDto;
            }
            else
                throw new ArgumentException("user not found");
        }
        public async Task<RegisterResponseDto> CreateUserAsync(CreateUserDto userDto)
        {
            User duplicate = await _userRepository.GetUserByUserNameAsync(userDto.UserName);
            if (duplicate != null)
            {
                throw new ArgumentException("username already exists");
            }
            User user = new User()
            {
                Name = userDto.Name,
                Email = userDto.Email,
                Address = userDto.Address,
                Phone = userDto.Phone,
                UserName = userDto.UserName,
                Password = HashPassword(userDto.Password),
                Role = Role.Customer

            };

            await _userRepository.CreateUserAsync(user);
            User user1 = await _userRepository.GetUserByIdAsync(user.Id);

            var userResponse = new GetUserDto()
            {
                Id = user1.Id,
                Name = user1.Name,
                Email = user1.Email,
                Address = user1.Address,
                Phone = user1.Phone,
                UserName = user1.UserName,
                Role = user1.Role
            };

            var token = GenerateJwtToken(user1);

            return new RegisterResponseDto
            {
                User = userResponse,
                Token = token
            };
        }
        public async Task<GetUserDto?> UpdateUserAsync(UpdateUserDto userDto)
        {
            User user = await _userRepository.GetUserByIdAsync(userDto.Id);
            if (user == null)
            {
                throw new ArgumentException("not found user");
            }
            if(user.UserName != userDto.UserName) { 
                User duplicate = await _userRepository.GetUserByUserNameAsync(userDto.UserName);
                if (duplicate != null)
                {
                    throw new ArgumentException("username already exists");
                }
            }
            if(userDto.Name!=null) user.Name = userDto.Name;
            if (userDto.Email != null)  user.Email = userDto.Email;
            if (userDto.Address != null) user.Address = userDto.Address;
            if (userDto.Phone != null)  user.Phone = userDto.Phone;
            if (userDto.UserName != null)  user.UserName = userDto.UserName;
            User user1 = await _userRepository.UpdateUserAsync(user);
            return await GetUserByIdAsync(user1.Id);
        }

        public async Task<bool> DeleteUserAsync(int Id)
        {
            User user = await _userRepository.GetUserByIdAsync(Id);
            if (user == null)
                return false;
            await _userRepository.DeleteUserAsync(user);
            return true;
        }
        public async Task<string> LoginAsync(LoginDto dto)
        {
            var user = await _userRepository.GetUserByUserNameAsync(dto.UserName);
            if (user == null)
                throw new UnauthorizedAccessException("Invalid credentials");

            if (user.Password != HashPassword(dto.Password))
                throw new UnauthorizedAccessException("Invalid credentials");

            return GenerateJwtToken(user);
        }

        private string GenerateJwtToken(User user)
        {
            var key = Encoding.UTF8.GetBytes(_config["JwtSettings:SecretKey"]);
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
            new Claim("id", user.Id.ToString()),
            new Claim(ClaimTypes.Role, user.Role.ToString()),
            new Claim("username", user.UserName),
            new Claim(ClaimTypes.Name, user.Name.ToString()),
            new Claim(ClaimTypes.StreetAddress, user.Address.ToString()),
            new Claim(ClaimTypes.HomePhone, user.Phone.ToString()),
            new Claim(ClaimTypes.Email, user.Email.ToString()),
        }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
