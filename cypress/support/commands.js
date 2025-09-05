Cypress.Commands.add('assertEmptyBoard', () => {
  cy.window().then((win) => {
    const board = JSON.parse(win.localStorage.getItem('kanban-boards'));
    expect(board).to.have.length(0);
  });
});