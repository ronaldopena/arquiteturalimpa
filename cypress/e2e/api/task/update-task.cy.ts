describe('API - /tasks/:id (PUT)', () => {
  let taskIdToUpdate: number;

  beforeEach(() => {
    // Cria uma tarefa nova antes de cada teste para garantir isolamento
    cy.request('POST', '/tasks', {
      description: 'Tarefa Original',
      status: 'PENDING'
    }).then((response) => {
      taskIdToUpdate = response.body.id;
    });
  });

  it('should update a task successfully', () => {
    const updates = {
      description: 'Tarefa Atualizada',
      status: 'COMPLETED'
    };

    cy.request('PUT', `/tasks/${taskIdToUpdate}`, updates)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(taskIdToUpdate);
        expect(response.body.description).to.eq(updates.description);
        expect(response.body.status).to.eq(updates.status);
      });

    // Verifica se persistiu
    cy.request('GET', `/tasks/${taskIdToUpdate}`)
      .then((response) => {
        expect(response.body.description).to.eq(updates.description);
        expect(response.body.status).to.eq(updates.status);
      });
  });

  it('should return 404 when updating non-existent task', () => {
    const nonExistentId = 999999;
    cy.request({
      method: 'PUT',
      url: `/tasks/${nonExistentId}`,
      body: { description: 'Update Fail' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property('error');
    });
  });

  it('should return 400 for invalid status update', () => {
    cy.request({
      method: 'PUT',
      url: `/tasks/${taskIdToUpdate}`,
      body: { 
        description: 'Descrição válida',
        status: 'INVALID_STATUS' 
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.contain('Invalid task status');
    });
  });

  it('should return 400 for invalid description update', () => {
    cy.request({
      method: 'PUT',
      url: `/tasks/${taskIdToUpdate}`,
      body: { 
        description: '',
        status: 'PENDING' 
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.contain('Task description cannot be empty');
    });
  });
});
