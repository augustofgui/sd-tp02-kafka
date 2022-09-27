import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "test-group" });

const run = async () => {
  // Producing
  await producer.connect();
  await producer.send({
    topic: "test-topic",
    messages: [{ value: "Hello KafkaJS user!" }],
  });

  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic", fromBeginning: false });

  await consumer.run({
    // eachBatch: async ({ batch }) => {
    //   console.log(batch);
    // },
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

run().catch(console.error);
