context('search input in the navbar', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  // it('accepts input and shows the result', () => {
  //   cy.get('.chakra-input')
  //     .type('test')
  //     .click(cy.get('.chakra-input__right-element > .chakra-button'))

  //   cy.get('.css-jb7eng').should('be.visible').click({ multiple: true })
  //   cy.get('.css-1cq3f0e').should('be.visible')

  //   cy.get(
  //     ':nth-child(1) > .css-atoxb6 > .chakra-aspect-ratio > .chakra-image'
  //   ).click()
  //   cy.get(':nth-child(2) > .chakra-text > b').should('have.text', 'test')
  // })

  it('does not accept empty string and no result', () => {
    cy.get('.chakra-input')
      .invoke('val', '')
      .click(cy.get('.chakra-input__right-element > .chakra-button'))
    cy.get(':nth-child(2) > .chakra-text > b').should('not.be.visible')
  })
})
