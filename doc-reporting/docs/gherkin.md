# Plano de Testes

!!! info "Sobre este documento"
    Este documento contém os cenários de teste escritos em **Gherkin**, para garantir clareza e rastreabilidade.

---

## Funcionalidade: Adicionar Lista

```gherkin
Feature: Adicionar Lista
  Como um usuário do sistema
  Quero criar uma nova lista no quadro
  Para organizar minhas tarefas

  Background:
    Given que estou no quadro do Kanban
    And o quadro está vazio

  Scenario: Adicionar uma lista com um título válido
    When eu clico no botão "+ Adicionar outra lista"
    And eu preencho o título "Lembretes"
    And eu clico no botão "Adicionar Lista"
    Then a lista "Lembretes" deve aparecer no quadro

  Scenario: Adicionar uma lista sem título
    When eu clico no botão "+ Adicionar outra lista"
    And eu clico no botão "Adicionar Lista"
    Then o botão "+ Adicionar outra lista" deve voltar
    And nenhuma lista deve ser criada

  Scenario: Cancelar criação de nova lista
    When eu clico no botão "+ Adicionar outra lista"
    And eu preencho o título "Lembretes"
    And eu clico no botão "X"
    Then o botão "+ Adicionar outra lista" deve voltar
    And nenhuma lista deve ser criada 
```

---

## Funcionalidade: Gerenciar Tarefas no Kanban

```gherkin
Feature: Gerenciar Tarefas no Kanban
  Como um usuário do sistema
  Quero criar e gerenciar tarefas dentro de listas
  Para organizar melhor meu fluxo de trabalho

  Background:
    Given que estou na tela do Kanban
    And existe uma lista chamada "A Fazer"
    And existe uma lista chamada "Em andamento"

  Scenario: Criar uma tarefa com título válido
    When eu clico no botão "Adicionar tarefa" na lista "A Fazer"
    And eu informo o título "Implementar login"
    And eu clico no botão "Enviar"
    Then a tarefa "Implementar login" deve aparecer na lista "A Fazer"

  Scenario: Criar uma tarefa sem título
    When eu clico no botão "Adicionar tarefa" na lista "A Fazer"
    And eu não preencho o título
    And eu clico no botão "Enviar"
    Then a tarefa não deve ser criada

  Scenario: Cancelar a criação de uma tarefa
    When eu clico no botão "Adicionar tarefa" na lista "A Fazer"
    And eu informo o título "Implementar autenticação"
    And eu clico no botão "X"
    Then a tarefa "Implementar autenticação" não deve aparecer na lista "A Fazer"

  Scenario: Editar uma tarefa existente
    Given que existe uma tarefa "Implementar login" na lista "A Fazer"
    When eu clico na tarefa
    And eu clico no nome da Tarefa
    And eu preencho o campo para "Implementar autenticação"
    And eu clico no botão "Editar Nome da task"
    Then a tarefa deve ser exibida como "Implementar autenticação"

  Scenario: Excluir uma tarefa
    Given que existe uma tarefa "Refatorar código" na lista "A Fazer"
    When eu clico no botão "Excluir" (Lixeira) da tarefa "Refatorar código"
    Then a tarefa não deve mais aparecer na lista "A Fazer"

  Scenario: Mover tarefa entre listas
    Given que existe uma tarefa "Criar testes unitários" na lista "A Fazer"
    When eu arrasto a tarefa "Criar testes unitários" para a lista "Em andamento"
    Then a tarefa "Criar testes unitários" deve aparecer na lista "Em andamento"

```

---