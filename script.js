// List of available items
const itemList = ["Chair", "Recliner", "Table", "Umbrella"];
// Prices of items in dollars
const itemPrice = [25.5, 37.75, 49.95, 24.89];
// Array to track the quantity of each item purchased
let purchasedItemQty = [0, 0, 0, 0];
// List of all US state abbreviations
const states = [
  "AL", // Alabama
  "AK", // Alaska
  "AZ", // Arizona
  "AR", // Arkansas
  "CA", // California
  "CO", // Colorado
  "CT", // Connecticut
  "DE", // Delaware
  "FL", // Florida
  "GA", // Georgia
  "HI", // Hawaii
  "ID", // Idaho
  "IL", // Illinois
  "IN", // Indiana
  "IA", // Iowa
  "KS", // Kansas
  "KY", // Kentucky
  "LA", // Louisiana
  "ME", // Maine
  "MD", // Maryland
  "MA", // Massachusetts
  "MI", // Michigan
  "MN", // Minnesota
  "MS", // Mississippi
  "MO", // Missouri
  "MT", // Montana
  "NE", // Nebraska
  "NV", // Nevada
  "NH", // New Hampshire
  "NJ", // New Jersey
  "NM", // New Mexico
  "NY", // New York
  "NC", // North Carolina
  "ND", // North Dakota
  "OH", // Ohio
  "OK", // Oklahoma
  "OR", // Oregon
  "PA", // Pennsylvania
  "RI", // Rhode Island
  "SC", // South Carolina
  "SD", // South Dakota
  "TN", // Tennessee
  "TX", // Texas
  "UT", // Utah
  "VT", // Vermont
  "VA", // Virginia
  "WA", // Washington
  "WV", // West Virginia
  "WI", // Wisconsin
  "WY", // Wyoming
];

// Corresponding shipping zones for each state (same order as the states array)
const zoneByState = [
  3, 5, 5, 4, 5, 5, 1, 1, 3, 3, 5, 5, 4, 2, 4, 4, 2, 4, 1, 1, 1, 2, 4, 3, 4, 5,
  4, 5, 1, 1, 5, 1, 2, 5, 2, 4, 5, 1, 1, 2, 5, 2, 4, 5, 1, 2, 5, 2, 4, 5,
];
// Shipping costs for different zones
const shippingCosts = [0, 20, 30, 35, 45];
// Tax rate as a percentage
const taxRate = 15;

// Function to find the index of an item in an array (case-insensitive)
function findItem(itemsArray, item) {
  for (let i = 0; i < itemsArray.length; i++) {
    if (item.toLowerCase() === itemsArray[i].toLowerCase()) {
      // Return the index if the item is found
      return i;
    }
  }
  // Return null if the item is not found
  return null;
}

// Function to handle the purchase process
function purchase() {
  while (true) {
    // Prompt the user to select an item
    let item = prompt(
      "What item would you like to buy today: Chair, Recliner, Table or Umbrella?"
    );
    if (item === null) {
      // Exit if the user cancels the purchase
      alert("You calcelled the purchase. Thank you!");
      return;
    }
    // Find the selected item index
    const indexOfItemList = findItem(itemList, item);
    if (indexOfItemList === null) {
      // If the item is not found, prompt the user again
      alert("You should choose one of Chair, Recliner, Table or Umbrella.");
      continue;
    }

    while (true) {
      // Prompt the user to enter the quantity of the selected item
      let qty = prompt(
        `How many ${itemList[indexOfItemList]} would you like to buy?`
      );
      if (item === null) {
        // Exit if the user cancels the quantity input
        alert("You calcelled the purchase. Thank you!");
        return;
      }
      // Convert the quantity to a number
      qty = Number(qty);
      // If the quantity is invalid, prompt the user again
      if (qty < 1) {
        alert("You should enter the number more than zero.");
        continue;
      }
      // Update the purchased quantity for the selected item
      purchasedItemQty[indexOfItemList] += qty;
      break;
    }

    // Ask the user if they want to continue shopping
    let moreItem = prompt("Continue shopping? y/n");
    // If yes, loop back to select another item
    if (moreItem === "Y" || moreItem === "y") {
      continue;
    }
    // Get the state index for shipping
    let indexOfState = getShippingState();
    // Display the final invoice
    displayInvoice(indexOfState, purchasedItemQty);
    return;
  }
}

// Function to prompt the user for the shipping state and validate it
function getShippingState() {
  while (true) {
    // Prompt for state abbreviation
    let stateShipped = prompt(
      "Please enter the two letter state abbreviation."
    );
    // Validate the state abbreviation
    const indexOfState = findItem(states, stateShipped);
    // If invalid, prompt the user again
    if (indexOfState === null) {
      alert("You should enter the two letter state abbreviation.");
      continue;
    }
    // Return the valid state index
    return indexOfState;
  }
}

// Function to calculate and display the invoice
function displayInvoice(indexOfState, purchasedItemQty) {
  let items = ""; // String to store HTML table rows for the purchased items
  let itemTotal = 0; // Total cost of the purchased items
  let shippingPrice = 0; // Cost of shipping
  let subtotal = 0; // Subtotal (items + shipping)
  let tax = 0; // Tax amount
  let invoiceTotal = 0; // Final total including tax
  // Loop through purchased items and generate HTML for each item
  for (let i = 0; i < purchasedItemQty.length; i++) {
    if (purchasedItemQty[i] !== 0) {
      let price = itemPrice[i] * purchasedItemQty[i]; // Calculate total price for this item
      items += `<tr><td>${itemList[i]}</td>`;
      items += `<td class="textRight">${purchasedItemQty[i]}</td>`;
      items += `<td class="textRight">${itemPrice[i].toFixed(2)}</td>`;
      items += `<td class="textRight">${price.toFixed(2)}</td></tr>`;
      itemTotal += price; // Accumulate the total item cost
    }
  }

  if (itemTotal > 100) {
    // Free shipping for orders over $100
    shippingPrice = 0;
  } else {
    // Get the shipping zone for the state
    let zone = zoneByState[indexOfState];
    // Look up the shipping cost based on the zone
    shippingPrice = shippingCosts[zone - 1];
  }
  subtotal = itemTotal + shippingPrice; // Calculate the subtotal
  tax = (subtotal * taxRate) / 100; // Calculate the tax
  invoiceTotal = subtotal + tax; // Calculate the final invoice total

  // Hide the purchase form and show the invoice form
  document.getElementById("purchase").style.display = "none";
  document.getElementById("results").style.display = "block";

  document.getElementById("itemBody").innerHTML = items;
  document.getElementById("itemTotal").innerHTML = itemTotal.toFixed(2);
  document.getElementById(
    "shippingTo"
  ).innerHTML = `Shipping to ${states[indexOfState]}`;
  document.getElementById("shippingPrice").innerHTML =
    shippingPrice === 0 ? "Free" : shippingPrice.toFixed(2);
  document.getElementById("subtotal").innerHTML = subtotal.toFixed(2);
  document.getElementById("tax").innerHTML = tax.toFixed(2);
  document.getElementById("invoiceTotal").innerHTML = invoiceTotal.toFixed(2);
}

// Function to reset the purchase form for a new shopping session
function shopAgain() {
  // Reset the quantities to zero
  purchasedItemQty = [0, 0, 0, 0];
  // Hide the invoice form and show the purchase form
  document.getElementById("purchase").style.display = "block";
  document.getElementById("results").style.display = "none";
}
