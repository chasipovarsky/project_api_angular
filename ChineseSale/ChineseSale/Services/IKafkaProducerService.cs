using System.Threading.Tasks;

namespace ChineseSale.Services
{
    public interface IKafkaProducerService
    {
        Task SendMessageAsync(string key, string message);
    }
}
