const basketRun = {
  settings: {
    classWrapProductItems: 'wrap-product-item',
    classProductItem: 'product-item',
    classProductTitle: 'title-item',
    classProductPrice: 'price-val',
    classProductImage: 'product-img',
    idWrapTopBasket: 'wrap-top-basket',
    basketSettings: {
      pathJsonFile: './json/basket_get.json',
      classWrapProducts: 'acc__cart__products-wrap',
      classWrapPriceTotal: 'acc__cart__price-total',
      classWrapButton: 'acc__cart__buttons',
      classTotalDescription: 'price-total_description',
      classTotalValue: 'price-total_value',
      idTotalValue: 'total-top-basket',
      classButtonCheckout: 'buttons_checkout',
      classButtonGoToCart: 'buttons_go-to-cart',
      idCountGoods: 'count-goods',
    }
  },

  $elemWrapTopBasket: null,
  $ElemDropBasket: null,
  basket: null,

  init() {
    this.$elemWrapTopBasket = $(`#${this.settings.idWrapTopBasket}`);
    this.basket = new Basket(this.settings.basketSettings);
    this.basket.render(this.$elemWrapTopBasket);
    this.$elemWrapTopBasket.on('click', 'button', event => {
      let target = $(event.currentTarget);
      if (target.attr('data-type') === 'del') {
        this.basket.remove(parseInt(target.attr('data-id')))
      }
    });
    $(`.${this.settings.classWrapProductItems}`).on('click', 'button[data-type = add]', (event) => {
      let $elem = $(event.currentTarget).parents(`.${this.settings.classProductItem}`);
      this.goodAddToBasket($elem);
      this.showDialog();
    });
    this.droppInit();
  },

  goodAddToBasket($elem) {
    let param = [
      parseInt($elem.attr('data-id')),
      $elem.find(`.${this.settings.classProductTitle}`).text(),
      parseInt($elem.find(`.${this.settings.classProductPrice}`).text()),
      $elem.find(`.${this.settings.classProductImage}`).attr('src')
    ];
    this.basket.add(...param);
  },

  droppInit() {
    this.$ElemDropBasket = $('<div />', {
      id: 'basket',
    }).appendTo($('body'))
      .append($('<div />', {
        text: 'Для добавления в корзину перетащите суда товар!',
        class: 'dropp-basket-text'
      }));

    //Добавление товара в карзину перетаскиванием
    $('.product-item').draggable({
      helper: 'clone',
      scope: 'good',
      addClasses: true,
      cursorAt: {left: 50, top: 50},
      cursor: "pointer",
      start: (event, ui) => {
        ui.helper.addClass('ui-drag-activate_good');
        this.$ElemDropBasket.addClass('basket-dropp', 500);
      },
      stop: () => {
        this.$ElemDropBasket.removeClass('basket-dropp', 500);
      }
    });

    $('#basket').droppable({
      activeClass: 'ui-drag-activate_basket',
      scope: 'good',
      tolerance: "pointer",
      drop: (event, ui) => {
        this.goodAddToBasket(ui.draggable);
        this.showDialog();
      },
    });
  },

  showDialog() {
      let $dialog = $('<div />', {
        text: 'Товар добавлен в корзину'
      }).dialog({
          appendTo: "body",
          hide: { effect: "scale", duration: 500 },
          position: { my: "center top", at: "center top+50px"}
        });
    setTimeout(() => {
      $dialog.dialog('close')
        .remove();
    }, 1000);
  },
};
$(document).ready(() => basketRun.init());