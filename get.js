import handler from './libs/handler-lib';
import { getSnidbit } from './libs/access-patterns-lib';

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const { userName, snidbitId } = data;

  const result = await getSnidbit(userName, snidbitId);
  if (!result.Item) {
    throw new Error('Item not found.');
  }

  return result.Item;
});
