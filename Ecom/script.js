// Sample product data
const products = [
    {
        id: 1,
        name: "Smartphone X",
        price: 699.99,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        description: "Experience the future with our latest Smartphone X. Features a stunning 6.5-inch AMOLED display, 48MP triple camera system, and all-day battery life. Perfect for photography enthusiasts and power users alike.",
        category: "electronics"
    },
    {
        id: 2,
        name: "Laptop Pro",
        price: 1299.99,
        image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        description: "The ultimate professional laptop with 11th Gen Intel Core i7 processor and 16GB RAM. Features a brilliant 15.6-inch 4K display, backlit keyboard, and ultra-fast SSD storage. Ideal for creative professionals and business users.",
        category: "electronics"
    },
    {
        id: 3,
        name: "Wireless Headphones",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        description: "Premium wireless headphones with active noise cancellation and 30-hour battery life. Features crystal-clear sound quality, comfortable over-ear design, and intuitive touch controls. Perfect for music lovers and frequent travelers.",
        category: "electronics"
    },
    {
        id: 4,
        name: "Men's Casual Shirt",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        description: "Classic men's casual shirt made from premium cotton blend. Features a comfortable fit, button-down collar, and versatile design. Perfect for both casual outings and semi-formal occasions. Available in multiple colors.",
        category: "clothing"
    },
    {
        id: 5,
        name: "Women's Dress",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        description: "Elegant women's dress crafted from high-quality fabric with a flattering A-line silhouette. Features a V-neck design, mid-length cut, and comfortable stretch material. Perfect for parties, dates, or special occasions.",
        category: "clothing"
    },
    {
        id: 6,
        name: "Leather Wallet",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        description: "Premium genuine leather wallet with multiple card slots and a secure coin pocket. Features RFID protection, smooth zipper closure, and durable construction. Perfect for everyday use and makes an excellent gift.",
        category: "accessories"
    }
];

// Cart and Favorites
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Display Products
function displayProducts(productsArray, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = productsArray.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p>${product.description}</p>
                <div class="product-actions">
                    <button onclick="addToCart(${product.id})" class="btn btn-primary">
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                    <button onclick="toggleFavorite(${product.id})" class="btn btn-favorite ${favorites.includes(product.id) ? 'active' : ''}">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert('Product added to cart!');
    }
}

// Toggle Favorite
function toggleFavorite(productId) {
    const index = favorites.indexOf(productId);
    if (index === -1) {
        favorites.push(productId);
    } else {
        favorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayProducts(products, 'featuredProducts');
}

// Update Cart Count
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products, 'featuredProducts');
    updateCartCount();
});

// Form Handling
function handleAddProduct(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newProduct = {
        id: products.length + 1,
        name: formData.get('name'),
        price: parseFloat(formData.get('price')),
        image: formData.get('image'),
        description: formData.get('description'),
        category: formData.get('category') || 'electronics'
    };
    products.push(newProduct);
    displayProducts(products, 'featuredProducts');
    event.target.reset();
}

// Update Product
function handleUpdateProduct(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productId = parseInt(formData.get('id'));
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex !== -1) {
        products[productIndex] = {
            ...products[productIndex],
            name: formData.get('name'),
            price: parseFloat(formData.get('price')),
            image: formData.get('image'),
            description: formData.get('description'),
            category: formData.get('category') || 'electronics'
        };
        displayProducts(products, 'featuredProducts');
        event.target.reset();
    }
}

// Checkout
function handleCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0) * 1.1 + 5; // Subtotal + tax + shipping
    alert(`Order placed successfully! Total: $${total.toFixed(2)}`);
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
} 