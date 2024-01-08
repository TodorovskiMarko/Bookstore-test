import { changeImage } from "../support/changeImage";
import { getImage } from "../support/getImage";

let firstBook = "1984";
let secondBook = "War and Peace";
let thirdBook = "Pride and Prejudice";

describe("Test the functionality of the page", () => {
  it("Add a book", () => {
    getImage(firstBook);
    cy.get(".input").first().type(firstBook);

    cy.readFile("cypress/fixtures/test.txt").then((image) => {
      cy.get(".input").last().type(image);
    });

    cy.get(".button").click();
    cy.get(".book-show").should("be.visible");
  });

  it("Rename a book", () => {
    getImage(secondBook);
    cy.get(".input").first().type(secondBook);

    cy.readFile("cypress/fixtures/test.txt").then((image) => {
      cy.get(".input").last().type(image);
    });

    cy.get(".button").click();
    cy.get(".book-show").last().should("be.visible");
    cy.get(".edit").last().click();
    cy.get(".book-edit .input")
      .first()
      .type("{selectall}{backspace}")
      .type("2. " + secondBook);
    cy.get(".button.is-primary").click();
    cy.get(".book-show >div h3")
      .last()
      .should("have.text", "2. " + secondBook);
  });

  it("Change image link", () => {
    getImage(thirdBook);
    cy.get(".input").first().type(thirdBook);

    cy.readFile("cypress/fixtures/test.txt").then((image) => {
      cy.get(".input").last().type(image);
    });

    cy.get(".button").click();
    cy.get(".book-show").last().should("be.visible");
    changeImage(thirdBook, 0);

    cy.get(".edit").last().click();
    cy.readFile("cypress/fixtures/test.txt").then((image) => {
      cy.get(".book-edit .input").last().clear().type(image);
      cy.get(".button.is-primary").click();
      cy.get(".book-show >img").last().should("have.attr", "src", image);
      cy.wait(2000);
    });
  });

  it.only("Delete a book", () => {
    cy.visit("http://localhost:3000/");
    cy.get("div[class='book-create'] h3").should("contain", "Book");
    cy.get(".delete").eq(1).click();
    cy.get(".book-show").should("have.length", "2");
  });
});
