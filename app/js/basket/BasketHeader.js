/**
 *
 */
class BasketHeader {
  constructor(basket) {
    this.linkBasket = basket;
    this.settings = basket.settings.basketHeaderSettings;
    this.objectRunBasket = basket.settings.objectRunBasket;
  }

  /**
   *
   */
  init() {
    let $elemWrapHeaderBasket = $(`#${this.settings.idWrapTopBasket}`);
    this.$productsWrap = $('<div />', {
      class: this.settings.classWrapProducts,
    });

    this.$elemTotalPrice = $('<span />', {
      class: this.settings.classTotalValue
    });

    let $priceTotalWrap = $('<div />', {
      class: this.settings.classWrapPriceTotal,
    }).append($('<span />', {
      class: this.settings.classTotalDescription,
      text: 'total'
    })).append(this.$elemTotalPrice);

    let $buttonsWrap = $('<div />', {
      class: this.settings.classWrapButton,
    }).append($('<button />', {
      class: this.settings.classButtonCheckout,
      text: 'Checkout'
    })).append($('<button />', {
      class: this.settings.classButtonGoToCart,
      text: 'Go to cart',
      'data-type': 'shopping-cart'
    }));

    $elemWrapHeaderBasket.append(this.$productsWrap)
      .append($priceTotalWrap)
      .append($buttonsWrap)
      .on('click', 'button', event => this.btnClickHandler(event));
    this.refresh();
  }

  /**
   *
   * @param event
   */
  btnClickHandler(event) {
    this.objectRunBasket.btnClickHandler(event);
  }

  /**
   *
   */
  refresh() {
    this.$elemTotalPrice.text('$' + this.linkBasket.amount);
    if (this.linkBasket.basketItems.length === 0) {
      this.$productsWrap.empty()
        .text('Товаров в карзине нет!');
    } else {
      this.$productsWrap.empty();
      for (let item of this.linkBasket.basketItems) {
        this.$productsWrap.append(
          new Good(item.id_product, item.title, item.price, item.src, item.quantity).renderForHeader()
        );
      }
    }
  }
}