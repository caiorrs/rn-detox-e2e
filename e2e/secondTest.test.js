import {device, element, by, waitFor} from 'detox';
import {e2eTestIds} from './testIDs';

const wait = async seconds => {
  return await new Promise((resolve, reject) =>
    setTimeout(() => resolve('done'), seconds * 1000),
  );
};

describe('Second Test', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should tap the show button and get content from API', async () => {
    await element(by.id(e2eTestIds.getContent)).tap();
    await waitFor(element(by.id(e2eTestIds.data)))
      .toBeVisible()
      .withTimeout(10000);
    await wait(5);
  });
});
