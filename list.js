import handler from './libs/handler-lib';
import { getSnidbits } from './libs/access-patterns-lib';

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const { userName } = data;

  const result = await getSnidbits(userName);

  return result.Items;
});
