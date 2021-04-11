import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UtilisateurComponentsPage, UtilisateurDeleteDialog, UtilisateurUpdatePage } from './utilisateur.page-object';

const expect = chai.expect;

describe('Utilisateur e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let utilisateurComponentsPage: UtilisateurComponentsPage;
  let utilisateurUpdatePage: UtilisateurUpdatePage;
  let utilisateurDeleteDialog: UtilisateurDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Utilisateurs', async () => {
    await navBarPage.goToEntity('utilisateur');
    utilisateurComponentsPage = new UtilisateurComponentsPage();
    await browser.wait(ec.visibilityOf(utilisateurComponentsPage.title), 5000);
    expect(await utilisateurComponentsPage.getTitle()).to.eq('jHipsterApp.utilisateur.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(utilisateurComponentsPage.entities), ec.visibilityOf(utilisateurComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Utilisateur page', async () => {
    await utilisateurComponentsPage.clickOnCreateButton();
    utilisateurUpdatePage = new UtilisateurUpdatePage();
    expect(await utilisateurUpdatePage.getPageTitle()).to.eq('jHipsterApp.utilisateur.home.createOrEditLabel');
    await utilisateurUpdatePage.cancel();
  });

  it('should create and save Utilisateurs', async () => {
    const nbButtonsBeforeCreate = await utilisateurComponentsPage.countDeleteButtons();

    await utilisateurComponentsPage.clickOnCreateButton();

    await promise.all([
      utilisateurUpdatePage.setNameInput('name'),
      utilisateurUpdatePage.setFirstnameInput('firstname'),
      utilisateurUpdatePage.setMailInput('mail'),
      utilisateurUpdatePage.setTelInput('tel'),
      utilisateurUpdatePage.commerceSelectLastOption(),
    ]);

    expect(await utilisateurUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await utilisateurUpdatePage.getFirstnameInput()).to.eq('firstname', 'Expected Firstname value to be equals to firstname');
    expect(await utilisateurUpdatePage.getMailInput()).to.eq('mail', 'Expected Mail value to be equals to mail');
    expect(await utilisateurUpdatePage.getTelInput()).to.eq('tel', 'Expected Tel value to be equals to tel');

    await utilisateurUpdatePage.save();
    expect(await utilisateurUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await utilisateurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Utilisateur', async () => {
    const nbButtonsBeforeDelete = await utilisateurComponentsPage.countDeleteButtons();
    await utilisateurComponentsPage.clickOnLastDeleteButton();

    utilisateurDeleteDialog = new UtilisateurDeleteDialog();
    expect(await utilisateurDeleteDialog.getDialogTitle()).to.eq('jHipsterApp.utilisateur.delete.question');
    await utilisateurDeleteDialog.clickOnConfirmButton();

    expect(await utilisateurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
