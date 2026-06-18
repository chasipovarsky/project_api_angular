using Confluent.Kafka;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace ChineseSale.Services
{
    public class KafkaProducerService : IKafkaProducerService
    {
        private readonly IProducer<string, string> _producer;
        private readonly string _topic;

        public KafkaProducerService(IConfiguration configuration)
        {
            var bootstrapServers = configuration["Kafka:BootstrapServers"]
                ?? throw new InvalidOperationException("Kafka BootstrapServers configuration is missing.");

            _topic = configuration["Kafka:Topic"]
                ?? throw new InvalidOperationException("Kafka Topic configuration is missing.");

            var config = new ProducerConfig
            {
                BootstrapServers = bootstrapServers
            };

            _producer = new ProducerBuilder<string, string>(config).Build();
        }

        public async Task SendMessageAsync(string key, string message)
        {
            var kafkaMessage = new Message<string, string>
            {
                Key = key,
                Value = message
            };

            await _producer.ProduceAsync(_topic, kafkaMessage);
        }
    }
}
