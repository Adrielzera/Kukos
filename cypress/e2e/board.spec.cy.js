describe('main', () => {
  context('board tests', () => {
    beforeEach(() => {
      const emptyBoard = JSON.stringify([null]);
      cy.visit('/', {
        onBeforeLoad: (win) => {
          win.localStorage.setItem('kanban-boards', emptyBoard);
          win.location.reload();
        }
      });
      cy.reload();
    })

    it('should successfully creates a new list', () => {
      cy.contains('Adicionar outra lista').click();
      cy.get('input[type="text"]').type('Lembretes');
      cy.contains('Adicionar Lista').click();
      cy.contains('Lembretes').should('be.visible');
    })
    
    it('should not create a new list without a title', () => {
      cy.contains('Adicionar outra lista').click();
      cy.contains('Adicionar Lista').click();
      cy.contains('Adicionar outra lista').should('be.visible');
      cy.assertEmptyBoard();
    })
    
    it('should cancel the creation of a new list', () => {
      cy.contains('Adicionar outra lista').click();
      cy.get('.closeIcon').click();
      cy.contains('Adicionar outra lista').should('be.visible');
      cy.assertEmptyBoard();
    })
  })
})