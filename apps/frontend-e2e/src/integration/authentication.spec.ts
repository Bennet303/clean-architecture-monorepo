describe('User Signup and Login', () => {
  // implement logic to intercept login, when using real backend
  beforeEach(() => cy.visit('/'));

  it('should redirect unauthenticated user to login page', function () {
    cy.visit('/home');
    cy.location('pathname').should('equal', '/login');
  });
  it('should redirect to the home page after login', function () {
    cy.login('', '');
    cy.location('pathname').should('equal', '/home');
  });
  it('should allow visitors to login', function () {
    cy.getBySel('login-title')
      .should('be.visible')
      .and('contain', 'Login Page');
    cy.getBySel('login').should('be.visible');
  });
});
