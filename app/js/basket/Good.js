class Good {
  constructor(id, title, price, src, quantity) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.src = src;
    this.quantity = quantity;
  }

  render() {
    return $(`<div id="${this.id}" class="acc__cart__product">
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
}


