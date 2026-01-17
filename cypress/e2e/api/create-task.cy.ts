
describe('API - /tasks', () => {
  it('should create a new task', () => {
    const task = {
      description: 'Nova Tarefa via API',
      status: 'PENDING',
    };

    cy.request('POST', '/tasks', task)
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
        expect(response.body.description).to.eq(task.description);
        expect(response.body.status).to.eq(task.status);
      });
  });

  it('should return 400 for invalid description', () => {
    const task = {
      description: ' ', // Descrição inválida
      status: 'PENDING',
    };

    cy.request({ method: 'POST', url: '/tasks', body: task, failOnStatusCode: false })
      .then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq('Task description cannot be empty');
      });
  });

  it('should return 400 for invalid status', () => {
    const task = {
      description: 'Tarefa com status inválido',
      status: 'INVALID_STATUS',
    };

    cy.request({ method: 'POST', url: '/tasks', body: task, failOnStatusCode: false })
      .then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq('Invalid task status: INVALID_STATUS');
      });
  });
});
