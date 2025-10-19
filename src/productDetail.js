/** @format */

import { getProductById } from './productData.js';
import { toast } from './toast.js';

export function initProductDetail(productId) {
  const product = getProductById(productId);
  if (!product) return null;

  setupThumbnailGallery();
  setupProductButtons(product);
  
  return product;
}

function setupThumbnailGallery() {
  const thumbnails = document.querySelectorAll('.thumbnail-btn');
  const featuredImage = document.getElementById('featured-image');

  if (!thumbnails.length || !featuredImage) return;

  thumbnails.forEach((btn) => {
    btn.addEventListener('click', () => {
      const img = btn.querySelector('img');
      if (!img || !img.src) return;

      featuredImage.src = img.src;

      thumbnails.forEach((t) => {
        t.classList.remove('ring-2', 'ring-[#57B660]');
      });
      btn.classList.add('ring-2', 'ring-[#57B660]');
    });
  });
}

function setupProductButtons(product) {
  const wishlistBtn = document.getElementById('add-to-wishlist');
  const cartBtn = document.getElementById('add-to-cart');

  if (wishlistBtn) {
    const newWishlistBtn = wishlistBtn.cloneNode(true);
    wishlistBtn.parentNode.replaceChild(newWishlistBtn, wishlistBtn);
    
    newWishlistBtn.addEventListener('click', () => {
      handleAddToWishlist(product);
    });
  }

  if (cartBtn) {
    const newCartBtn = cartBtn.cloneNode(true);
    cartBtn.parentNode.replaceChild(newCartBtn, cartBtn);
    
    newCartBtn.addEventListener('click', () => {
      handleAddToCart(product);
    });
  }
}

function handleAddToWishlist(product) {
  // TODO: Implement localStorage wishlist
  console.log('Added to wishlist:', product.title);
  toast.success(`${product.title} added to wishlist!`);
}

function handleAddToCart(product) {
  // TODO: Implement localStorage cart
  console.log('Added to cart:', product.title);
  toast.success(`${product.title} added to cart!`);
}

export function getProduct(productId) {
  return getProductById(productId);
}
