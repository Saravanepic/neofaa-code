window._manageDiscountTiredBar = function(cart) {
  var existingBar = document.querySelector('.cart__message__progress');
  if (existingBar == null) {
    const mobileProgressBarContainer = document.querySelector('.cart__message__progress__holder');
    const mobileProgressBarHTML = `<progress class="cart__message__progress is-hidden" data-cart-message-progress="" value="0" max="100" style="--progress-width: 0;"></progress>`;
    if (mobileProgressBarContainer) {
      mobileProgressBarContainer.insertAdjacentHTML('afterBegin', mobileProgressBarHTML);
    }
  }
};

window._manageDiscountTiered = function(cart) {
  let discountObj = {
    '0': {
      amount: 0,
      discount: 0
    },
    '1': {
      amount: 2500,
      discount: 10
    },
    '2': {
      amount: 5000,
      discount: 20
    },
    '3': {
      amount: 10000,
      discount: 25
    }
    // Add more tiers if needed
  };

  let upcomingTier = 0;

  let freeShippingBar = document.querySelector('.cart__message__progress');

  let cartTotal = 0;
  cart.items.forEach((item) => {
    if (item.product_type !== "bundle") {
      cartTotal += item.original_line_price;
    }
  });

  if (freeShippingBar) {
    document.querySelectorAll('[data-discount-tier]').forEach((ele) => {
      let amount = ele.getAttribute('data-discount-tier');
      amount = amount ? parseInt(amount) : 0;
      ele.closest('li').classList.remove('visited-step');
      if (cartTotal > 0 && amount <= cartTotal) {
        if (upcomingTier < 4) {
          upcomingTier++;
        }
        ele.closest('li').classList.add('visited-step');
      }
    });
  }

  let targetTier = upcomingTier > 0 ? discountObj[upcomingTier] : discountObj[1];
  let remainingAmount = targetTier.amount - cartTotal;
  let receivedDiscount = discountObj[upcomingTier - 1] || discountObj[0];

  const remainingAmountEle = document.querySelector('[data-remaining-amount]');
  const remainingAmountEleWrapper = document.querySelector('[data-remaining-wrapper]');
  if (remainingAmountEle) {
    remainingAmount = remainingAmount < 0 ? 0 : remainingAmount;
    if (remainingAmount > 0) {
      remainingAmountEle.innerHTML = `${Shopify.formatMoney(remainingAmount)} away`;
      remainingAmountEleWrapper.classList.remove('d-none');
    } else {
      remainingAmountEleWrapper.classList.add('d-none');
    }
  }

  const remainingPercentage = document.querySelector('[data-upcoming-percentage]');
  if (remainingPercentage) {
    remainingPercentage.innerHTML = `${targetTier.discount}%`;
  }

  let maxTierAmount = discountObj[Object.keys(discountObj).length - 1].amount;
  let progressBar = (cartTotal * 100) / maxTierAmount;
  progressBar = progressBar >= 100 ? 100 : progressBar;

  if (document.querySelector('[data-cart-message-progress]')) {
    document.querySelector('[data-cart-message-progress]').value = progressBar;
    document.querySelector('[data-cart-message-progress]').style.setProperty('--progress-width', `${progressBar}%`);
  }

  const receivedAmountEle = document.querySelector('[data-received-discount]');
  if (receivedAmountEle) {
    receivedAmountEle.innerHTML = `${progressBar >= 100 ? targetTier.discount : receivedDiscount.discount}%!`;
  }
};
