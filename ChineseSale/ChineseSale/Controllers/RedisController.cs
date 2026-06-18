using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;

namespace ChineseSale.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RedisController : ControllerBase
    {
        private readonly IDatabase _redis;

        public RedisController(IConnectionMultiplexer redis)
        {
            _redis = redis.GetDatabase();
        }

        [HttpPost("set")]
        public async Task<IActionResult> SetValue(string key, string value)
        {
            await _redis.StringSetAsync(key, value);
            return Ok($"Saved: {key} = {value}");
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetValue(string key)
        {
            var value = await _redis.StringGetAsync(key);
            if (value.IsNullOrEmpty)
                return NotFound($"Key '{key}' not found");
            return Ok($"{key} = {value}");
        }

        [HttpGet("keys")]
        public IActionResult GetAllKeys()
        {
            var server = _redis.Multiplexer.GetServer("localhost", 6379);
            var keys = server.Keys().Select(k => k.ToString()).ToList();
            return Ok(keys);
        }
    }
}