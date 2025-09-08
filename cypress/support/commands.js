Cypress.Commands.add('assertEmptyBoard', () => {
  cy.window().then((win) => {
    const board = JSON.parse(win.localStorage.getItem('kanban-boards'));
    expect(board).to.have.length(0);
  });
});

Cypress.Commands.add('assertEmptyCards', (card) => {
    cy.window()
    .its('localStorage.kanban-boards')
    .then(JSON.parse)
    .then((boards) => boards.find((b) => b.title === card))
    .its('cards')
    .should('have.length', 0);
});

Cypress.Commands.add('createTask', (list, task) => {
    cy.contains(list)
    .closest('div') 
    .within(() => {
      cy.contains('Adicionar Tarefa').click();
      cy.get('input[type="text"]').type(task);
      cy.contains('Enviar').click();
    });
});

Cypress.Commands.add('dragTo', {prevSubject: "element"}, (subject, targetEl) => {
    const dataTransfer = new DataTransfer();
    cy.get(subject).trigger('dragstart', {
        dataTransfer
    });
    cy.get(targetEl).trigger('drop',{
        dataTransfer
    });
});