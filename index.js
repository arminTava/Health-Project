const {deterministicPartitionKey} = require("./dpk");
const event = { partitionKey: "c".repeat(300)};

console.log(deterministicPartitionKey(event));