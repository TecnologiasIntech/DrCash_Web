import { MateralAdmin2AngularPage } from './app.po';

describe('materal-admin-2-angular App', function() {
  let page: MateralAdmin2AngularPage;

  beforeEach(() => {
    page = new MateralAdmin2AngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
