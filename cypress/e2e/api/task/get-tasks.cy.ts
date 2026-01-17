describe('API - /tasks (GET)', () => {
  let createdTaskId: number;

  before(() => {
    // Cria uma tarefa para garantir que existe algo para buscar
    cy.request('POST', '/tasks', {
      description: 'Tarefa para teste de GET',
      status: 'PENDING'
    }).then((response) => {
      createdTaskId = response.body.id;
    });
  });

  it('should list all tasks', () => {
    cy.request('GET', '/tasks')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
        
        // Verifica se a tarefa criada está na lista
        const foundTask = response.body.find((t: any) => t.id === createdTaskId);
        expect(foundTask).to.exist;
        expect(foundTask.description).to.eq('Tarefa para teste de GET');
      });
  });

  it('should get a task by id', () => {
    cy.request('GET', `/tasks/${createdTaskId}`)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', createdTaskId);
        expect(response.body.description).to.eq('Tarefa para teste de GET');
      });
  });

  it('should return 404 for non-existent task id', () => {
    const nonExistentId = 999999;
    cy.request({
      method: 'GET',
      url: `/tasks/${nonExistentId}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property('error');
    });
  });
});
