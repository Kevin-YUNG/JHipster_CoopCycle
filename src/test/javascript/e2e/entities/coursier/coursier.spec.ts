import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CoursierComponentsPage, CoursierDeleteDialog, CoursierUpdatePage } from './coursier.page-object';

const expect = chai.expect;

describe('Coursier e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let coursierComponentsPage: CoursierComponentsPage;
  let coursierUpdatePage: CoursierUpdatePage;
  let coursierDeleteDialog: CoursierDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Coursiers', async () => {
    await navBarPage.goToEntity('coursier');
    coursierComponentsPage = new CoursierComponentsPage();
    await browser.wait(ec.visibilityOf(coursierComponentsPage.title), 5000);
    expect(await coursierComponentsPage.getTitle()).to.eq('jHipsterApp.coursier.home.title');
    await browser.wait(ec.or(ec.visibilityOf(coursierComponentsPage.entities), ec.visibilityOf(coursierComponentsPage.noResult)), 1000);
  });

  it('should load create Coursier page', async () => {
    await coursierComponentsPage.clickOnCreateButton();
    coursierUpdatePage = new CoursierUpdatePage();
    expect(await coursierUpdatePage.getPageTitle()).to.eq('jHipsterApp.coursier.home.createOrEditLabel');
    await coursierUpdatePage.cancel();
  });

  it('should create and save Coursiers', async () => {
    const nbButtonsBeforeCreate = await coursierComponentsPage.countDeleteButtons();

    await coursierComponentsPage.clickOnCreateButton();

    await promise.all([
      coursierUpdatePage.setFirstnameInput('firstname'),
      coursierUpdatePage.setLastnameInput('lastname'),
      coursierUpdatePage.setMailInput('mail'),
      coursierUpdatePage.setPhoneInput('phone'),
      coursierUpdatePage.setReviewsInput('5'),
    ]);

    expect(await coursierUpdatePage.getFirstnameInput()).to.eq('firstname', 'Expected Firstname value to be equals to firstname');
    expect(await coursierUpdatePage.getLastnameInput()).to.eq('lastname', 'Expected Lastname value to be equals to lastname');
    expect(await coursierUpdatePage.getMailInput()).to.eq('mail', 'Expected Mail value to be equals to mail');
    expect(await coursierUpdatePage.getPhoneInput()).to.eq('phone', 'Expected Phone value to be equals to phone');
    expect(await coursierUpdatePage.getReviewsInput()).to.eq('5', 'Expected reviews value to be equals to 5');

    await coursierUpdatePage.save();
    expect(await coursierUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await coursierComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Coursier', async () => {
    const nbButtonsBeforeDelete = await coursierComponentsPage.countDeleteButtons();
    await coursierComponentsPage.clickOnLastDeleteButton();

    coursierDeleteDialog = new CoursierDeleteDialog();
    expect(await coursierDeleteDialog.getDialogTitle()).to.eq('jHipsterApp.coursier.delete.question');
    await coursierDeleteDialog.clickOnConfirmButton();

    expect(await coursierComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
