describe('Habr tests', () => {
  const hubMock = {
    statusCode: 200,
    body: {
      pagesCount: 1,
      hubIds: [
        'DIY',
      ],
      hubRefs: {
        DIY: {
          id: '21976',
          alias: 'DIY',
          titleHtml: 'DIY или Сделай сам',
          imageUrl: '//habrastorage.org/getpro/geektimes/hub/0ac/9b4/828/0ac9b48281cd7ba7401b4a4f5d9cd8d8.png',
          descriptionHtml: 'Для тех, у кого руки растут из от туда откуда нужно',
          relatedData: null,
          statistics: {
              subscribersCount: 425323,
              rating: 464.01,
              authorsCount: 2427,
              postsCount: 5852,
          },
          commonTags: [
              'diy',
              'arduino',
              'ruvds_статьи',
              'сделай сам',
              'diy или сделай сам',
              'esp32',
              'iot',
              'raspberry pi',
              'микроконтроллеры',
              'diy-проекты',
          ],
          isProfiled: false,
          isOfftop: false,
        },
      },
    },
  };

  beforeEach(() => {
    cy.visit('https://habr.com/ru/all/');
  });

  it('Habs', () => {
    cy.intercept('/kek/v2/hubs/?page=1', hubMock).as('request');
    cy.get('.tm-tabs a').contains('Хабы').click();
    cy.wait('@request');
    cy.get('.tm-hub__description').should('have.text', 'Для тех, у кого руки растут из от туда откуда нужно');
    cy.get('.tm-hub__title').should('have.text', 'DIY или Сделай сам');
    cy.get('[href="/ru/hub/DIY/"]').should('be.visible');
    cy.get('.tm-hubs-list__hub-rating').should('include.text', '464.01');
    cy.get('.tm-hubs-list__hub-subscribers').should('include.text', '425K');
  });

  it('Login negative', () => {
    cy.get('[data-test-id="menu-toggle-guest"]').click();
    cy.get('.tm-user-menu__auth-buttons').contains('Войти').click();
    cy.get('[id="email_field"]').type('abc');
    cy.get('[id="password_field"]').type('123');
    cy.get('button[type="submit"]').click();
    cy.get('.s-error').should('have.text', 'Введите корректный e-mail');
  });
})