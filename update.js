import handler from './libs/handler-lib';
import { updateSnidBit } from './libs/access-patterns-lib';

export const main = handler(async (event, context) => {
  const userId = event.requestContext.identity.cognitoIdentityId;
  const data = JSON.parse(event.body);
  const { userName, title, content, snidbitId } = data;

  await updateSnidBit(userName, userId, snidbitId, title, content);

  return { status: true };
});
