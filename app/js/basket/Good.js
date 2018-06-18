class Good {
  constructor(id, title, price, src, quantity) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.src = src;
    this.quantity = quantity;
  }

  renderForHeader() {
    return $(`<div class="acc__cart__product">
                    <div class="acc__cart__product__img">
                      <img src="${this.src}" width="72" height="85" alt="Rebox Zane">
                    </div>
                    <div class="acc__cart__product__data">
                      <span class="product__data_head">${this.title}</span>
                      <span class="product__data_quality">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star quality-white" aria-hidden="true"></i>
                      </span>
                      <div class="product__data_calculation">
                        <span class="product__data_number">${this.quantity}</span> x <span class="product__data_price">$${this.price}</span>
                      </div>
                    </div>
                    <div class="acc__cart__product__del">
                      <button data-type="del" data-id="${this.id}">
                        <i class="fa fa-times" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>`);
  }


  renderForPage() {
    return $(`<div class="shopping-cart" data-id="${this.id}">
                <div class="shopping-cart__product-details shopping-cart__column-first">
                  <a href="#">
                    <img src="${this.src}" width="100" height="115" alt="Mango People T-shirt">
                  </a>
                  <div class="product-details__description">
                    <a href="#">${this.title}</a>
                    <div>
                      <div class="option-row">
                        <span class="option-row__option">Color:</span>
                        <span class="option-row__value">Red</span>
                      </div>
                      <div class="option-row">
                        <span class="option-row__option">Size:</span>
                        <span class="option-row__value">Xll</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="shopping-cart__unite-price shopping-cart__column-center">
                  <span class="unite-price">$${this.price}</span>
                </div>
                <div class="shopping-cart__quantity shopping-cart__column-center">
                  <input title="quantity" type="text" class="quantity" data-type="quantity" value="${this.quantity}" required>
                </div>
                <div class="shopping-cart__shipping shopping-cart__column-center">
                  <span class="shipping">free</span>
                </div>
                <div class="shopping-cart__subtotal shopping-cart__column-center">
                  <span class="subtotal">$${this.quantity * this.price}</span>
                </div>
                <div class="shopping-cart__action shopping-cart__column-last">
                  <button data-id="${this.id}" data-type="delAll">
                    <i class="fa fa-times" aria-hidden="true"></i>
                  </button>
                </div>
              </div>`);
  }
}


