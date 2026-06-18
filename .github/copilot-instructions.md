# GitHub Copilot Instructions

## Project Overview
This repository contains a full-stack application called `ChineseSale`. It is a marketplace-style system for managing gifts, packages, donations, orders, baskets, users, and prizes. The application exposes an ASP.NET Core Web API backend with entity management endpoints and authentication, and includes an Angular client under the `angular/` folder.

## Tech Stack
- ASP.NET Core 7+ Web API
- Angular frontend
- SQL Server via Entity Framework Core
- Redis caching and key/value utilities via StackExchange.Redis
- JWT authentication for user login and protected endpoints
- Docker support via `Dockerfile` and `docker-compose.yml`
- Serilog for logging
- Rate limiting using ASP.NET Core built-in rate limiter

## Project Structure
- `ChineseSale/ChineseSale/Program.cs`: app startup, DI registration, JWT auth, Redis, rate limiting, Swagger.
- `ChineseSale/ChineseSale/Data/ChineseSaleContextDB.cs`: EF Core DbContext and DbSet properties.
- `ChineseSale/ChineseSale/Models/`: entity model classes.
- `ChineseSale/ChineseSale/Controllers/`: API controllers exposing endpoints.
- `ChineseSale/ChineseSale/Repositories/`: repository interfaces and implementations.
- `ChineseSale/ChineseSale/Services/`: business logic services and interfaces.
- `ChineseSale/ChineseSale/Dtos/`: DTOs for API requests and responses.
- `ChineseSale/ChineseSale/Middleware/`: request logging middleware.
- `ChineseSale/ChineseSale/Properties/`: project metadata.
- `ChineseSale/ChineseSale/Migrations/`: EF migrations.
- `angular/`: Angular frontend application code.

## Entities and Relationships

### Users
- Primary fields: `Id`, `UserName`, `Password`, `Name`, `Phone`, `Address`, `Email`, `Role`.
- Relationships:
  - One-to-many with `Orders` via `UserId`
  - One-to-many with `Baskets` via `UserId`
  - One-to-many with `Prizes` via `UserId`

### Gifts
- Primary fields: `Id`, `Name`, `Description`, `Image`, `Value`, `SumCustomers`.
- Relationships:
  - Many-to-one to `Category` via `CategoryId`
  - Many-to-one to `Donor` via `DonorId`
  - Used by `Orders` through `GiftsId` list
  - Used by `Baskets` through `GiftsId` list
  - Used by `Prizes` via `GiftId`

### Categories
- Primary fields: `Id`, `Name`
- Relationships:
  - One-to-many with `Gifts`

### Donors
- Primary fields: `Id`, `Name`, `Email`, `Phone`
- Relationships:
  - One-to-many with `Gifts`

### Packages
- Primary fields: `Id`, `Name`, `Price`, `Description`, `CountCard`
- Relationships:
  - Used by `Orders` through `PackagesId` list
  - Used by `Baskets` through `PackagesId` list

### Orders
- Primary fields: `Id`, `OrderDate`, `UserId`, `GiftsId`, `PackagesId`, `Sum`
- Relationships:
  - Many-to-one to `Users`
  - References `Gifts` by ID list
  - References `Packages` by ID list

### Baskets
- Primary fields: `Id`, `UserId`, `GiftsId`, `PackagesId`, `Sum`
- Relationships:
  - Many-to-one to `Users`
  - References selected `Gifts` and `Packages` by ID lists

### Prizes
- Primary fields: `Id`, `UserId`, `GiftId`
- Relationships:
  - Many-to-one to `Users`
  - Many-to-one to `Gifts`

## Controllers and High-Level Responsibilities
- `UserController`: registration, login, user management, profile update and delete.
- `GiftController`: gift catalog read operations, create/update/delete gift management, search/sort support.
- `CategoryController`: category listing, lookup, create/update/delete.
- `DonorController`: donor listing, lookup, create/update/delete, search by name/email/gift.
- `PackageController`: package listing, lookup, create/update/delete.
- `OrderController`: order listing, lookup, user-specific orders, create order, buyer lookup, sum export.
- `BasketController`: basket listing, lookup, create basket, add/remove gifts/packages, clear basket items.
- `PrizeController`: prize listing, lookup, export, random prize selection.
- `ImageController`: image upload endpoint.
- `RedisController`: Redis key set/get and keys listing endpoints.

## Repositories and Methods
### `IUserRepository` / `UserRepository`
- `GetAllUsersAsync()`
- `GetUserByIdAsync(int Id)`
- `GetUserByUserNameAsync(string UserName)`
- `CreateUserAsync(User user)`
- `UpdateUserAsync(User user)`
- `DeleteUserAsync(User user)`

### `IOrderRepository` / `OrderRepository`
- `GetAllOrdersAsync()`
- `GetOrderByIdAsync(int Id)`
- `GetOrderByUserIdAsync(int UserId)`
- `CreateOrderAsync(Order order)`

### `IGiftRepository` / `GiftRepository`
- `GetAllGiftAsync()`
- `GetByIdGiftAsync(int Id)`
- `CreateGiftAsync(Gift gift)`
- `UpdateGiftAsync(Gift gift)`
- `DeleteGiftAsync(Gift gift)`
- `ExistsGiftAsync(string Name)`
- `SortGiftByPriceAsync()`
- `SortGiftByBuyerAsync()`
- `ExistsDonorAsync(string donor)`
- `ExistsSumAsync(int sumCustumer)`

### `ICategoryRepository` / `CategoryRepository`
- `GetAllCategoryAsync()`
- `GetCategoryByIdAsync(int Id)`
- `CreateCategoryAsync(Category category)`
- `UpdateCategoryAsync(Category category)`
- `DeleteCategoryAsync(Category category)`
- `AddGiftToCategory(Gift gift, Category category)`
- `DeleteGiftFromCategory(Gift gift, Category category)`

### `IDonorRepository` / `DonorRepository`
- `GetAllDonorAsync()`
- `GetDonorByIdAsync(int Id)`
- `CreateDonorAsync(Donor donor)`
- `UpdateDonorAsync(Donor donor)`
- `DeleteDonorAsync(Donor donor)`
- `AddGiftToDonor(Gift gift, Donor donor)`
- `DeleteGiftFromDonor(Gift gift, Donor donor)`
- `GetSearchByEmailDonorAsync(string str)`
- `GetSearchByNameDonorAsync(string str)`
- `GetSearchByGiftDonorAsync(string str)`

### `IPackageRepository` / `PackageRepository`
- `GetAllPackageAsync()`
- `GetPackageByIdAsync(int Id)`
- `CreatePackageAsync(Package package)`
- `UpdatePackageAsync(Package package)`
- `DeletePackageAsync(Package package)`

### `IBasketRepository` / `BasketRepository`
- `GetAllBasketAsync()`
- `GetBasketByIdAsync(int Id)`
- `GetBasketByUserIdAsync(int UserId)`
- `CreateBasketAsync(Basket basket)`
- `DeleteBasketAsync(Basket basket)`
- `AddGiftToBasket(Basket basket, Gift gift)`
- `DeleteGiftFromBasket(Basket basket, Gift gift)`
- `AddPackageToBasket(Basket basket, Package package)`
- `DeletePackageFromBasket(Basket basket, Package package)`

### `IPrizeRepository` / `PrizeRepository`
- `GetAllPrizeAsync()`
- `GetPrizeByIdAsync(int Id)`
- `GetPrizeByUserIdAsync(int UserId)`
- `CreatePrizeAsync(Prize prize)`

## Coding Conventions and Patterns
- Uses layered architecture: Controllers → Services → Repositories → DbContext/Models.
- DTOs are used for all API request/response payloads.
- Service methods convert entity models into DTOs and handle validation/business logic.
- Repository methods return entity models and perform EF Core persistence operations.
- Naming conventions:
  - Interfaces prefixed with `I` (`IUserService`, `IGiftRepository`).
  - Service/Repository implementations use PascalCase and the interface exact name without `I` prefix.
  - DTO and model class names are clear and aligned (`GetGiftDto`, `CreateGiftDto`).
- Controllers use attribute routing with `api/[controller]`.
- Authorization uses JWT and role-based `[Authorize(Roles = "Manager")]` for protected endpoints.
- Logging is present in controllers using `ILogger<T>`.
- Redis is used for caching gift catalog responses and storing simple key/value data.

## Important Notes for Copilot
- Preserve the existing layered architecture. Do not collapse controllers into services or bypass repositories.
- Keep DTO usage consistent: controllers should accept DTOs and services should return DTOs, not raw entity models.
- Maintain existing authentication and authorization patterns for protected endpoints.
- Avoid changing the app’s current domain model or entity relationships.
- Use existing naming conventions and keep service/repository method names aligned with current patterns.
- Do not remove Redis caching or the rate limiting configuration without a strong reason.
- Keep SQL Server and EF Core as the primary data access path.
