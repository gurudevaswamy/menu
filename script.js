// Cart array to store selected items
let cart = [];

// Simulate an API call to fetch menu items
function fetchMenuItems() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { name: "Idli", price: 20, imageUrl: "images/idli.jpg" },
                { name: "Vada", price: 30, imageUrl: "images/vada.jpg" },
                { name: "Poori", price: 40, imageUrl: "images/puri.jpg" },
                { name: "Rice", price: 40, imageUrl: "images/rice.jpg" },
                { name: "Upma", price: 40, imageUrl: "images/upma.jpg" },
                { name: "Halwa", price: 40, imageUrl: "images/halwa.jpg" }
            ]);
        }, 1000); // Simulate a 1-second delay
    });
}

// Simulate an API call to submit the order
function submitOrder(orderDetails) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (orderDetails && orderDetails.length > 0) {
                resolve({ status: 'success', message: 'Order placed successfully!' });
            } else {
                reject({ status: 'error', message: 'Order failed: No items in order.' });
            }
        }, 1000); // Simulate a 1-second delay
    });
}

// Function to display menu items dynamically
function displayMenuItems() {
    const menuSection = document.getElementById("menu");
    menuSection.innerHTML = "<h2>Our Menu</h2>"; // Clear existing content

    // Fetch menu items from the simulated API
    fetchMenuItems().then(menuItems => {
        menuItems.forEach(item => {
            const foodItemHTML = `
                <div class="food-item" data-name="${item.name}" data-price="${item.price}">
                    <img src="${item.imageUrl}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>₹${item.price}</p>
                    <label for="${item.name.toLowerCase()}-quantity">Quantity:</label>
                    <input type="number" id="${item.name.toLowerCase()}-quantity" min="0" max="10" value="0">
                    <button onclick="addToCart('${item.name}', ${item.price}, '${item.name.toLowerCase()}-quantity')">Add to Cart</button>
                </div>
            `;
            menuSection.innerHTML += foodItemHTML;
        });
    });
}

// Function to add item to the cart
function addToCart(itemName, itemPrice, quantityId) {
    const quantity = parseInt(document.getElementById(quantityId).value);
    if (quantity < 0 || quantity > 10) {
        alert("Please select a quantity between 1 and 10.");
        return;
    }

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

// Function to handle order submission
function placeOrder() {
    submitOrder(cart)
        .then(response => {
            alert(response.message);
            // Clear cart after successful order
            cart = [];
            localStorage.removeItem('cart');
            viewCart();
        })
        .catch(error => {
            alert(error.message);
        });
}

// Load the menu items on page load
window.onload = displayMenuItems;
