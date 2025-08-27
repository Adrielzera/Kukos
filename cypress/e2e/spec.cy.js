describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://kanban-dusky-five.vercel.app/');
    cy.contains('Quadro Kanban').should('be.visible');
  })
})