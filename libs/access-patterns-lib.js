import KSUID from 'ksuid';
import dynamoDb from './dynamodb-lib';

export async function createSnidBit(username, userId, title, content) {
  const snidbitId = await KSUID.random();
  console.log('ID', snidbitId.string);
  const params = {
    TableName: process.env.tableName,
    Item: {
      PK: `USER#${username}`,
      SK: `SNIDBIT#${snidbitId.string}`,
      UID: userId,
      Title: title,
      Content: content,
      CreatedAt: new Date().toISOString(),
    },
  };

  await dynamoDb.put(params);

  return params.Item;
}

export async function updateSnidBit(
  username,
  userId,
  snidbitId,
  title,
  content
) {
  const params = {
    TableName: process.env.tableName,
    Key: {
      PK: `USER#${username}`,
      SK: `SNIDBIT#${snidbitId}`,
    },
    ConditionExpression: 'contains(#uid, :uid)',
    UpdateExpression: 'SET #title = :title, #content = :content',
    ExpressionAttributeNames: {
      '#uid': 'UID',
      '#title': 'Title',
      '#content': 'Content',
    },
    ExpressionAttributeValues: {
      ':uid': userId,
      ':title': title,
      ':content': content,
    },
    ReturnValues: 'ALL_NEW',
  };

  await dynamoDb.update(params);
}

export async function deleteSnidBit(username, userId, snidbit) {
  const params = {
    TableName: process.env.tableName,
    Key: {
      PK: `USER#${username}`,
      SK: `SNIDBIT#${snidbit}`,
    },
    ConditionExpression: 'contains(#uid, :uid)',
    ExpressionAttributeNames: {
      '#uid': 'UID',
    },
    ExpressionAttributeValues: {
      ':uid': userId,
    },
  };

  await dynamoDb.delete(params);
}

export async function getSnidbit(username, snidbit) {
  const params = {
    TableName: process.env.tableName,
    Key: {
      PK: `USER#${username}`,
      SK: `SNIDBIT#${snidbit}`,
    },
  };

  const result = await dynamoDb.get(params);
  return result;
}

export async function getSnidbits(username) {
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: '#pk = :pk AND #sk < :sk',
    ExpressionAttributeNames: {
      '#pk': 'PK',
      '#sk': 'SK',
    },
    ExpressionAttributeValues: {
      ':pk': `USER#${username}`,
      ':sk': `USER#${username}`,
    },
    ScanIndexForward: false,
  };

  const result = await dynamoDb.query(params);
  return result;
}

export async function createUser(username) {
  const params = {
    TableName: process.env.tableName,
    Item: {
      PK: `USER#${username}`,
      SK: `USER#${username}`,
      Username: username,
    },
  };

  await dynamoDb.put(params);
}

export async function deleteUser(username) {
  const params = {
    TableName: process.env.tableName,
    Key: {
      PK: `USER#${username}`,
      SK: `USER#${username}`,
    },
  };

  await dynamoDb.delete(params);
}

export async function getUser(username) {
  const params = {
    TableName: process.env.tableName,
    Key: {
      PK: `USER#${username}`,
      SK: `USER#${username}`,
    },
  };

  const result = await dynamoDb.get(params);
  return result;
}
