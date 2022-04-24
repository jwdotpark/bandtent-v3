/// <reference types="cypress" />

context('main page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has navbar', () => {
    // main
    cy.get(
      '.chakra-stack > div > .bold > .chakra-button > .chakra-text'
    ).should('have.text', 'Feed')

    // search input
    cy.get('div > .bold > form > .chakra-input__group > .chakra-input').should(
      'have.attr',
      'placeholder',
      'Search'
    )

    // theme button

    cy.get('.css-1vwvp6d').should('be.visible')
  })
})
