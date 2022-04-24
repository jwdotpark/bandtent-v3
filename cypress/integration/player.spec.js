context('search input in the navbar', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders player', () => {
    cy.get('.chakra-stack > .css-1ch5q6r > div > div > wave').should(
      'be.visible'
    )

    cy.get('[data-testid="setting"] > svg').click().should('be.visible')
  })

  it('shows info when music is loaded', () => {
    cy.get(
      ':nth-child(1) > .css-1lshffr > .css-1m8iww1 > .chakra-stack > .css-1m2q03x > .css-0 > div > .chakra-image'
    ).click()
    cy.get(':nth-child(2) > .chakra-text > b').should('be.visible')
  })

  // const expectPlayingAudio = () => {}

  // it('plays audio when music is loaded', () => {

  //   cy.get(
  //     ':nth-child(1) > .css-1lshffr > .css-1m8iww1 > .chakra-stack > .css-1m2q03x > .css-0 > div > .chakra-image'
  //   ).click()

  //   cy.get('audio,video').should((els) => {
  //     let audible = false
  //     els.each((i, el) => {
  //       console.log(el)
  //       console.log(el.duration, el.paused, el.muted)
  //       if (el.duration > 0 && !el.paused && !el.muted) {
  //         audible = true
  //       }
  //     })
  //     expect(audible).to.eq(true)
  //   })
  // })
})
