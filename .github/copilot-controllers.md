# Controller Reference for GitHub Copilot

## UserController
Base route: `api/User`
Rate limit: `sliding`

Endpoints:
- `POST api/User/register`
  - Registers a new user.
  - No authorization required.
  - Creates a JWT cookie and returns `GetUserDto`.
- `POST api/User/login`
  - Authenticates a user.
  - No authorization required.
  - Sets JWT cookie and returns `Ok`.
- `GET api/User`
  - Returns all users.
  - Requires `Manager` role.
- `GET api/User/{id}`
  - Returns a single user by id.
  - No authorization attribute currently active.
- `POST api/User/Update`
  - Updates the current authenticated user.
  - Requires authentication.
  - Ensures the authenticated user matches the update target.
- `DELETE api/User/{id}`
  - Deletes the current authenticated user.
  - Requires authentication.
  - Ensures the authenticated user matches the delete target.

## GiftController
Base route: `api/Gift`
Rate limit: `sliding`

Endpoints:
- `GET api/Gift`
  - Returns all gifts.
- `GET api/Gift/{Id}`
  - Returns a single gift by id.
- `POST api/Gift/Add`
  - Creates a new gift.
  - Requires `Manager` role.
- `POST api/Gift/Update`
  - Updates an existing gift.
  - Requires `Manager` role.
- `DELETE api/Gift/{Id}`
  - Deletes a gift by id.
  - Requires `Manager` role.
- `GET api/Gift/Exists/{Name}`
  - Searches gifts by name substring.
- `GET api/Gift/SortByPrice`
  - Sorts gifts by value descending.
- `GET api/Gift/SortByBuyer`
  - Sorts gifts by buyer count descending.
- `GET api/Gift/ExistsDonorName/{donor}`
  - Searches gifts by donor name substring.
- `GET api/Gift/existsSum/{sum}`
  - Searches gifts by exact `SumCustomers` value.

## OrderController
Base route: `api/Order`
Rate limit: `sliding`

Endpoints:
- `GET api/Order`
  - Returns all orders.
- `GET api/Order/{Id}`
  - Returns order by id.
  - Enforces that only managers or the matching user can retrieve the order.
- `GET api/Order/user/{UserId}`
  - Returns a user’s order by `UserId`.
  - Enforces that only managers or the matching user can retrieve the order.
- `POST api/Order/Add`
  - Creates a new order.
  - Requires authentication and matching `UserId`.
- `GET api/Order/gift/{giftId}/buyers`
  - Returns buyers who purchased a gift.
- `GET api/Order/sum`
  - Returns the total order sum over all orders.
- `GET api/Order/export`
  - Exports the total sum as a CSV file.

## BasketController
Base route: `api/Basket`
Rate limit: `sliding`

Endpoints:
- `GET api/Basket`
  - Returns all baskets.
- `GET api/Basket/{Id}`
  - Returns a basket by id.
  - Requires authentication.
- `GET api/Basket/ByUserId/{UserId}`
  - Returns the basket for a specific user.
- `POST api/Basket/Add`
  - Creates a new basket for a user.
  - Requires authentication.
- `DELETE api/Basket/Delete?Id={Id}`
  - Deletes a basket by id.
- `POST api/Basket/AddGiftToBasket`
  - Adds a gift to a basket.
  - Requires authentication.
- `POST api/Basket/RemoveGiftFromBasket`
  - Removes a gift from a basket.
  - Requires authentication.
- `POST api/Basket/AddPackageToBasket`
  - Adds a package to a basket.
  - Requires authentication.
- `POST api/Basket/RemovePackageFromBasket`
  - Removes a package from a basket.
  - Requires authentication.
- `POST api/Basket/RemoveAllPackageFromBasket`
  - Removes all instances of a package from a basket.
  - Requires authentication.
- `POST api/Basket/RemoveAllGiftFromBasket`
  - Removes all instances of a gift from a basket.
  - Requires authentication.

## CategoryController
Base route: `api/Category`
Rate limit: `sliding`

Endpoints:
- `GET api/Category`
  - Returns all categories.
- `GET api/Category/{Id}`
  - Returns category details by id.
- `POST api/Category/Add`
  - Creates a category.
  - Requires `Manager` role.
- `POST api/Category/Update`
  - Updates a category.
  - Requires `Manager` role.
- `DELETE api/Category/Delete?Id={Id}`
  - Deletes a category.
  - Requires `Manager` role.

## DonorController
Base route: `api/Donor`
Rate limit: `sliding`

Endpoints:
- `GET api/Donor`
  - Returns all donors.
- `GET api/Donor/{Id}`
  - Returns donor by id.
- `POST api/Donor/Add`
  - Creates a donor.
  - Requires `Manager` role.
- `POST api/Donor/Update`
  - Updates a donor.
  - Requires `Manager` role.
- `DELETE api/Donor/Delete?Id={Id}`
  - Deletes a donor.
  - Requires `Manager` role.
- `GET api/Donor/SearchByName?str={str}`
  - Searches donors by name substring.
- `GET api/Donor/SearchByEmail?str={str}`
  - Searches donors by email substring.
- `GET api/Donor/SearchByGift?str={str}`
  - Searches donors by gifts they provide.

## PackageController
Base route: `api/Package`
Rate limit: `sliding`

Endpoints:
- `GET api/Package`
  - Returns all packages.
- `GET api/Package/{Id}`
  - Returns a package by id.
- `POST api/Package/Add`
  - Creates a package.
  - Requires `Manager` role.
- `POST api/Package/Update`
  - Updates a package.
  - Requires `Manager` role.
- `DELETE api/Package/{Id}`
  - Deletes a package.
  - Requires `Manager` role.

## PrizeController
Base route: `api/Prize`
Rate limit: `sliding`

Endpoints:
- `GET api/Prize`
  - Returns all prizes.
- `GET api/Prize/export`
  - Exports prizes as CSV.
- `GET api/Prize/{Id}`
  - Returns a prize by id.
- `GET api/Prize/user/{UserId}`
  - Returns a prize for a specific user.
- `POST api/Prize/SelectRandomPrize/{giftId}`
  - Selects a random prize winner among users who bought a gift.
  - Requires `Manager` role.

## ImageController
Base route: `api/Image`
Rate limit: `sliding`

Endpoints:
- `POST api/Image/upload`
  - Uploads an image to `wwwroot/uploads`.
  - Returns a generated `fileUrl`.

## RedisController
Base route: `api/Redis`

Endpoints:
- `POST api/Redis/set?key={key}&value={value}`
  - Sets a string key/value pair in Redis.
- `GET api/Redis/get?key={key}`
  - Retrieves a string value by key.
- `GET api/Redis/keys`
  - Lists all keys from the Redis server.

## Authorization Summary
- `Manager` role is required for: category create/update/delete, donor create/update/delete, package create/update/delete, gift create/update/delete, prize random selection, user listing.
- Authentication is required for: basket retrieval by id, basket creation, gift/package modifications in baskets, user update/delete, order creation.
- Some endpoints are missing active `[Authorize]` attributes even though they have authorization logic in code. The documented behavior is based on the current code with comments and token checks.
