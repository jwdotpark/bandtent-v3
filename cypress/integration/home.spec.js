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

    // log in
    cy.get(
      '.css-0 > nav > .css-p680qu > .chakra-stack > .chakra-button:nth-child(1)'
    ).should('have.text', 'Log In')

    // theme button
    cy.get(
      'nav > .css-p680qu > .chakra-stack > .chakra-button > .chakra-icon'
    ).should('be.visible')
  })
})
