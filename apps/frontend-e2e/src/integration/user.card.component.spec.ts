describe('frontend', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=usercardcomponent--primary&args=userId;')
  );
  it('should render the component', () => {
    cy.get('app-user-card').should('exist');
  });
});
