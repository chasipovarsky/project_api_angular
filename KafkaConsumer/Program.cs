using Confluent.Kafka;

var config = new ConsumerConfig
{
    BootstrapServers = "localhost:9092",
    GroupId = "order-consumer-group",
    AutoOffsetReset = AutoOffsetReset.Earliest,
    EnableAutoCommit = true
};

using var consumer = new ConsumerBuilder<string, string>(config).Build();
consumer.Subscribe("order-events");

Console.WriteLine("Kafka consumer started. Listening to topic 'order-events'...");

while (true)
{
    try
    {
        var consumeResult = consumer.Consume();
        var timestamp = consumeResult.Message.Timestamp.UtcDateTime;
        Console.WriteLine($"[{timestamp:O}] Key: {consumeResult.Message.Key ?? "<null>"} Value: {consumeResult.Message.Value}");
    }
    catch (ConsumeException ex)
    {
        Console.WriteLine($"Consume error: {ex.Error.Reason}");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error: {ex.Message}");
    }
}
