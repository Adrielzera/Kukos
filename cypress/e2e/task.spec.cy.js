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
    cy.contains('A Fazer')
    .closest('div') 
    .within(() => {
      cy.contains('Adicionar Tarefa').click();
      cy.get('input[type="text"]').type('Implementar login');
      cy.contains('Enviar').click();
    });
  });

      
  it('should not create a new task without title', () => {
    cy.contains('A Fazer')
    .closest('div') 
    .within(() => {
      cy.contains('Adicionar Tarefa').click();
      cy.contains('Enviar').click();
    });
    cy.assertEmptyCards('A Fazer');
  });

  it('should cancel creating a new task', () => {
    cy.contains('A Fazer')
    .closest('div') 
    .within(() => {
      cy.contains('Adicionar Tarefa').click();
      cy.get('.closeIcon').click();
    });
    cy.assertEmptyCards('A Fazer');
  });

  it('succesfully edit an existing task', () => {
    cy.createTask('A Fazer', 'Implementar login');
    cy.contains('Implementar login').click();
    cy.get('.custom-input').contains('Implementar login').click();
    cy.get('input[type="text"]').type('Implementar autenticação');
    cy.contains('Editar Nome da task').click();
    cy.reload();
    cy.contains('Implementar autenticação').should('be.visible');
  });

  it('sucessfully delet an existing task', () => {
    cy.createTask('A Fazer', 'Refatorar Código');
    cy.contains('Refatorar Código').parent().find('.trash').click({ force: true });
    cy.assertEmptyCards('A Fazer')
  })

  it.only('should drag and drop an task succesfully', () => {
    cy.createTask('A Fazer', 'Criar testes unitários');
    cy.createTask('Em andamento', 'teste');
    cy.get(':nth-child(1) > .board-cards > .sc-gKXOVf').closest('div').dragTo(':nth-child(2) > .board-cards > .sc-gKXOVf');
    cy.reload()
  })
});
  