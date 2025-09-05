describe('Kanban', () => {
    beforeEach(() => {
      cy.fixture('kanban').then((state) => {
        cy.visit('/', {
          onBeforeLoad(win) {
            win.localStorage.setItem('kanban-boards', JSON.stringify(state));
          }
        });
      });
    });
  
    it('should successfully creates a new task', () => {
      cy.contains('A Fazer').parent().parent().within(() => {
        cy.get('.sc-ftvSup').click();
      })
      cy.get('input[type="text"]').type('Implementar login');
      cy.contains('Enviar').click();
      cy.contains('Implementar login').should('be.visible');
    });
  });
  