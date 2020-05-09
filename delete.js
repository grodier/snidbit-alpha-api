import handler from './libs/handler-lib';
import { deleteSnidBit } from './libs/access-patterns-lib';

export const main = handler(async (event, context) => {
  const userId = event.requestContext.identity.cognitoIdentityId;
  const data = JSON.parse(event.body);
  const { userName, snidbitId } = data;

  await deleteSnidBit(userName, userId, snidbitId);

  return { status: true };
});
