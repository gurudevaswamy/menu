// Cart array to store selected items
let cart = [];

// Function to add item to the cart
function addToCart(itemName, itemPrice, quantityId) {
    const quantity = parseInt(document.getElementById(quantityId).value);
    if (quantity < 0 || quantity > 10) {
        alert("Please select a quantity between 1 and 10.");
        return;
    }

    // Check if the item is already in the cart
    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity += quantity;
        if (existingItem.quantity > 10) {
            existingItem.quantity = 10; // Limit to maximum of 10
            alert("You can only order up to 10 pieces of each item.");
        }
    } else {
        cart.push({ name: itemName, price: itemPrice, quantity: quantity });
    }
    
    alert(`${itemName} added to cart!`);
}

// Function to display the cart summary
function viewCart() {
    const cartSummary = document.getElementById("cart-summary");
    cartSummary.innerHTML = ""; // Clear previous contents
    cartSummary.style.display = "block";

    if (cart.length === 0) {
        cartSummary.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartSummary.innerHTML += `<p>${item.name} (x${item.quantity}) - ₹${itemTotal.toFixed(2)}</p>`;
    });

    cartSummary.innerHTML += `<hr><p><strong>Total: ₹${total.toFixed(2)}</strong></p>`;
}
