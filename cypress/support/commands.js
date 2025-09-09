import '@4tw/cypress-drag-drop';

Cypress.Commands.add('assertEmptyBoard', () => {
  cy.window().then((win) => {
    const board = JSON.parse(win.localStorage.getItem('kanban-boards'));
    expect(board).to.have.length(0);
  });
});

Cypress.Commands.add('assertCards', (card, num) => {
    cy.window()
    .its('localStorage.kanban-boards')
    .then(JSON.parse)
    .then((boards) => boards.find((b) => b.title === card))
    .its('cards')
    .should('have.length', num);
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

Cypress.Commands.add("dragAndDrop", { prevSubject: "element" }, (subject, targetSelector) => {
    cy.wrap(subject).then($el => {
      const text = $el.find("p").text(); // pega o nome da task
      const dataTransfer = new DataTransfer();
      dataTransfer.setData("text/plain", text);
  
      cy.wrap($el)
        .trigger("dragstart", { dataTransfer });
  
      cy.get(targetSelector)
        .trigger("dragenter", { dataTransfer })
        .trigger("dragover", { dataTransfer })
        .trigger("drop", { dataTransfer });
  
      cy.wrap($el).trigger("dragend", { dataTransfer });
    });
  });