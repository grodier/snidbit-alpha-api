import handler from './libs/handler-lib';
import { createSnidBit } from './libs/access-patterns-lib';

export const main = handler(async (event, context) => {
  const userId = event.requestContext.identity.cognitoIdentityId;
  const data = JSON.parse(event.body);
  const { userName, title, content } = data;

  const result = await createSnidBit(userName, userId, title, content);
  return result;
});
