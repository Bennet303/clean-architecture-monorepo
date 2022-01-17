describe('The Home page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('', '');
  });

  it('should load correctly', function () {
    cy.getBySel('home-title').should('be.visible').and('contain', 'Home Page');
    cy.get('clean-architecture-monorepo-user-card')
      .should('be.visible')
      .and('contain', 'unknown');
    cy.getBySel('create-user').should('exist');
    cy.getBySel('delete-user').should('exist');
    cy.getBySel('get-user').should('exist');
  });
  it('should allow users to create users', function () {
    cy.getBySel('create-user').click();
    cy.get('clean-architecture-monorepo-user-card')
      .should('be.visible')
      .and('contain', '1');
  });
  it('should allow users to delete users after creation', function () {
    cy.getBySel('create-user').click();
    cy.get('clean-architecture-monorepo-user-card')
      .should('be.visible')
      .and('contain', '1');
    cy.getBySel('delete-user').click();
    cy.get('clean-architecture-monorepo-user-card')
      .should('be.visible')
      .and('contain', 'unknown');
  });
  it('should allow users to get already created users', function () {
    cy.getBySel('get-user').click();
    cy.get('clean-architecture-monorepo-user-card')
      .should('be.visible')
      .and('contain', '1');
  });
});
