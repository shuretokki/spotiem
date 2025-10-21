/** @format */

import { getProductById } from './productData.js';
import { toast } from './toast.js';
import { COLORS } from './constants.js';

export const initProductDetail = (productId) => {
  const product = getProductById(productId);
  if (!product) return null;

  setupThumbnailGallery();
  setupProductButtons(product);

  return product;
};

const setupThumbnailGallery = () => {
  const thumbnails = document.querySelectorAll('.thumbnail-btn');
  const featuredImage = document.getElementById('featured-image');

  if (!thumbnails.length || !featuredImage) return;

  thumbnails.forEach((btn) => {
    btn.addEventListener('click', () => {
      const img = btn.querySelector('img');
      if (!img?.src) return;

      featuredImage.src = img.src;

      thumbnails.forEach((t) => {
        t.classList.remove('ring-2', `ring-[${COLORS.PRIMARY}]`);
      });
      btn.classList.add('ring-2', `ring-[${COLORS.PRIMARY}]`);
    });
  });
};

const setupProductButtons = (product) => {
  const wishlistBtn = document.getElementById('add-to-wishlist');
  const cartBtn = document.getElementById('add-to-cart');

  if (wishlistBtn) {
    const newWishlistBtn = wishlistBtn.cloneNode(true);
    wishlistBtn.replaceWith(newWishlistBtn);
    newWishlistBtn.addEventListener('click', () =>
      handleAddToWishlist(product),
    );
  }

  if (cartBtn) {
    const newCartBtn = cartBtn.cloneNode(true);
    cartBtn.replaceWith(newCartBtn);
    newCartBtn.addEventListener('click', () => handleAddToCart(product));
  }
};

const handleAddToWishlist = (product) => {
  // TODO: Implement localStorage wishlist
  toast.success(`${product.title} added to wishlist!`);
};

const handleAddToCart = (product) => {
  // TODO: Implement localStorage cart
  toast.success(`${product.title} added to cart!`);
};

export const getProduct = (productId) => getProductById(productId);
