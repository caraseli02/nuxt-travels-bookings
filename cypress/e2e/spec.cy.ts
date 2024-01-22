describe("Navigation Test", () => {
  it("should navigate through the app", () => {
    // Visit the home page
    cy.visit("http://localhost:3000/");

    // Check if the home page has loaded correctly
    cy.contains("Travels and Bookings management system");

    // Navigate to the travels page (adjust the selector as per your app)
    cy.get("nav").contains("Travels").click();

    // Check if the travels page has loaded
    cy.url().should("include", "/travels");
    cy.contains("Travel Management");

    // Navigate to the bookings page (adjust the selector as per your app)
    cy.get("nav").contains("Bookings").click();

    // Check if the bookings page has loaded
    cy.url().should("include", "/bookings");
    cy.contains("Booking Management");
  });
});
