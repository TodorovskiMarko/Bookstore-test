export function getImage(Book) {
    cy.visit('https://duckduckgo.com/')
    cy.get('[aria-label="Search with DuckDuckGo"]').type(Book)
        .type('{enter}')
    cy.get('[class="content-wrap"').contains('Wikipedia').click()
    cy.get('[class="mw-file-element"]')
        .invoke('attr', 'src').then((src) => {
            cy.writeFile('cypress/fixtures/test.txt', src)
        })

    cy.visit('http://localhost:3000/')
    cy.get("div[class='book-create'] h3").should('contain', 'Book')
}