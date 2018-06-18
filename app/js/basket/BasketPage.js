class BasketPage {
  constructor(basket) {
    this.linkBasket = basket;
    this.settings = basket.settings.basketPageSettings;
    this.objectRunBasket = basket.settings.objectRunBasket;
    this.objectRunBasket = basket.settings.objectRunBasket;
    this.$wrapCart = null;
    // this.wrapContent = null;
    this.$subTotal = null;
    this.$grandTotal = null;
  }

  init() {
    this.$wrapCart = $(`.${this.settings.classWrapCart}`);
    // this.wrapContent = $(`.${this.settings.classWrapContent}`);
    this.$subTotal = $(`#${this.settings.idSpanForSubTotal}`);
    this.$grandTotal = $(`#${this.settings.idSpanForGrandTotal}`);
    $(`.${this.settings.classWrapContent}`)
      .on('click', 'button', event => this.btnClickHandler(event));
    this.$wrapCart
      .on('change', 'input', event => this.inputChangeHandler(event));
    this.refresh();
  }

  btnClickHandler(event) {
    this.objectRunBasket.btnClickHandler(event);
  }

  inputChangeHandler(event){
    this.objectRunBasket.btnClickHandler(event);
  }

  refresh() {
    this.$subTotal.text('$' + this.linkBasket.amount);
    this.$grandTotal.text('$' + this.linkBasket.amount);
    if (this.linkBasket.basketItems.length === 0) {
      this.$wrapCart.empty()
        .addClass(this.settings.classWrapCart + '_empty')
        .text('Товаров в карзине нет!');
    } else {
      this.$wrapCart.empty();
      for (let item of this.linkBasket.basketItems) {
        this.$wrapCart.append(
          new Good(item.id_product, item.title, item.price, item.src, item.quantity).renderForPage()
        );
      }
    }
  }
}