context('search input in the navbar', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('accepts input and shows the result', () => {
    cy.get('.chakra-input')
      .type('test')
      .click(cy.get('.chakra-input__right-element > .chakra-button'))

    cy.get('.css-jb7eng').should('be.visible').click()
    cy.get('.css-1cq3f0e').should('be.visible')

    cy.get(
      ':nth-child(1) > .css-atoxb6 > .chakra-aspect-ratio > .chakra-image'
    ).click()
    cy.get(':nth-child(2) > .chakra-text > b').should('have.text', 'test')
  })
})
