describe('empty spec', () => {


  //assignment one
  it('Cypress assignment one', () => {

    //visit link
    cy.visit('https://www.buyrentkenya.com/about')

    //check that page contains h1 and that h1 text matches 'About us'
    cy.get('h1').invoke('text').should('include','About us', { matchCase: false })
    
    //Use xpath wrapper to check rel canonical and that it matches 'https://www.buyrentkenya.com/about'
    cy.xpath('//link[@rel="canonical"]').should('have.attr', 'href').and('include', 'https://www.buyrentkenya.com/about')

    //Use xpath wrapper to check that robots meta matches "index, follow"
    cy.xpath('//meta[@name="robots"]').should('have.attr', 'content').and('include', 'index, follow')

    //Use xpath wrapper to check that that the "og:title" property in the page head matches "Find Top Real Estate in Kenya"
    cy.xpath('//meta[@property="og:title"]').should('have.attr', 'content').and('include', 'Find Top Real Estate in Kenya')

    //check that form with name 'contact-us' exists
    cy.get('[name=contact-us]').should('exist')
    
    //Go inside iframe and verify partial label text 'not a robot', however it seems impossible to access a cross origin iframe
    cy.frameLoaded('iframe[title="reCAPTCHA"]');
    cy.iframe().find('label').then(function(txt){
      const txtframe = txt.text();
      //assertion to verify text
      expect(txtframe).to.contains('not a robot');
   })


})


//assignment two
  it('Cypress assignment two', () => {


    //visit buy rent kenya search results page
    cy.visit('https://www.buyrentkenya.com/flats-apartments-for-sale?page=2')

    //count number of listing cards making sure they are equal to 17, used an xpath wrapper
    cy.get('//div[@class="relative w-full bg-white rounded shadow-md border border-grey-300"]').should('have.length', 17)

    //Check that the URL used in the <a> element inside the div with the class "pagination-prev-nav" does not include the text "page=1"
    cy.get('.pagination-prev-nav > a').should('not.have.text','page=1');


  })
})