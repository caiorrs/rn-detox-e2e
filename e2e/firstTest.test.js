import {device, element, by, waitFor} from 'detox';
import {e2eTestIds} from './testIDs';

const wait = async seconds => {
  return await new Promise((resolve, reject) =>
    setTimeout(() => resolve('done'), seconds * 1000),
  );
};

describe('First Test', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {});

  it('should tap the show button and show a text', async () => {
    await wait(5);
    await element(by.id(e2eTestIds.homeButton)).tap();
    await wait(5);
    await waitFor(element(by.id(e2eTestIds.hiddenText)))
      .toBeVisible()
      .withTimeout(2000);
    await wait(5);
    await element(by.id(e2eTestIds.homeButton)).tap();
    await wait(5);
    await waitFor(element(by.id(e2eTestIds.hiddenText)))
      .not.toBeVisible()
      .withTimeout(2000);
    await wait(5);
  });
});
