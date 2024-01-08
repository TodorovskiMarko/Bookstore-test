export function changeImage(Book) {
    cy.visit('https://duckduckgo.com/')
    cy.get('[aria-label="Search with DuckDuckGo"]').type(Book)
        .type('{enter}')
    cy.get('[data-zci-link="images"]').click()
    cy.get('[class="tile  tile--img  has-detail"]').eq(0).click()
    cy.get('[class="detail__media__img-highres  js-detail-img  js-detail-img-high"]')
        .invoke('attr', 'src').then((src) => {
            cy.writeFile('cypress/fixtures/test.txt', src)
        })

    cy.visit('http://localhost:3000/')
    cy.get("div[class='book-create'] h3").should('contain', 'Book')
}