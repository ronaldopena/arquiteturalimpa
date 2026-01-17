describe('API - /tasks/:id (DELETE)', () => {
  let taskIdToDelete: number;

  beforeEach(() => {
    // Cria uma tarefa para ser deletada
    cy.request('POST', '/tasks', {
      description: 'Tarefa para Deletar',
      status: 'PENDING'
    }).then((response) => {
      taskIdToDelete = response.body.id;
    });
  });

  it('should delete a task successfully', () => {
    cy.request('DELETE', `/tasks/${taskIdToDelete}`)
      .then((response) => {
        expect(response.status).to.eq(204);
        expect(response.body).to.be.empty;
      });

    // Verifica se realmente foi deletada (deve retornar 404)
    cy.request({
      method: 'GET',
      url: `/tasks/${taskIdToDelete}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('should return 404 when deleting non-existent task', () => {
    const nonExistentId = 999999;
    cy.request({
      method: 'DELETE',
      url: `/tasks/${nonExistentId}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property('error');
    });
  });
});
