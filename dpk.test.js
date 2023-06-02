const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  const event = { partitionKey: "key1234" };
  const expectedKey = "key1234";
  it("should return the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("should return the given partitionKey if it exists", () => {
    expect(deterministicPartitionKey(event)).toBe(expectedKey);
  });
  it("should return a hash of the event if partitionKey is not given", () => {
    const eventWithoutPartitionKey = { name: "Peter" };
    const expectedHash = "0a9601c2a2829c451e3e352edbb9d61fd5d0bf346dc2a1e73cc8f0240b574e814feac9728c16b31c652cd467946ab52c9b19cf1b4bb15b549ef5ebec9673baa7";

    expect(deterministicPartitionKey(eventWithoutPartitionKey)).toBe(expectedHash);
  });
  it("should return a stringified JSON if the candidate is not a string", () => {
    const key = 5
    const event = { partitionKey: key };
    const expectedString = JSON.stringify(key);
    expect(deterministicPartitionKey(event)).toBe(expectedString);
  });
  it("should return a hash of the candidate if its length exceeds MAX_PARTITION_KEY_LENGTH", () => {
    const event = { partitionKey: "c".repeat(300)};
    const expectedHash = "b87131f8b8ab58fa37d52944885dcc098969abffa6b8d81d4b9f940fc6cbc55e299c68bc5381a5b52a73108594ebb0814a73e202c188354c615081245efa785e";
    expect(deterministicPartitionKey(event)).toBe(expectedHash);
  })

});
