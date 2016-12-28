import { MartianRobotsPage } from './app.po';

describe('martian-robots App', function() {
  let page: MartianRobotsPage;

  beforeEach(() => {
    page = new MartianRobotsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
