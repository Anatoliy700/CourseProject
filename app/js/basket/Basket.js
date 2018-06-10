class Basket {
  constructor(basketSettings) {
    this.settings = basketSettings;

    this.countGoods = 0; //Общее кол-во товаров в корзине
    this.amount = 0; //Общая стоимость товаров
    this.basketItems = []; //Массив для хранения товаров
    this.$productsWrap = null;
    this.$elemCounter = $(`#${basketSettings.idCountGoods}`);
    this.$elemTotalPrice = null;

  }

  render($jQueryElement) {
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
      text: 'Go to cart'
    }));

    $jQueryElement.append(this.$productsWrap)
      .append($priceTotalWrap)
      .append($buttonsWrap);


    //Получаем уже добавленные в корзину товары
    this.getBasket();
    // $productsWrap.append(new Good().render());
  }

  getBasket() {
    //let self = this;
    $.ajax({
      type: 'GET',
      url: this.settings.pathJsonFile,
      context: this,
      success: function (data) {

        this.countGoods = data.basket.length;
        this.amount = data.amount;

        for (let item of data.basket) {
          this.basketItems.push(item);
        }
        this.refresh();
      }
      ,
      error: function (error) {
        console.log('Произошла ошибка при получении данных', error);
      },
      dataType: 'json'
    });
  }

  add(id_product, title, price, src) {
    let basketNewItem = {
      id_product,
      price, //price: price
      title,
      src,
    };

    this.basketItems.push(basketNewItem);
    this.countGoods++;
    this.amount += price; //this.amount = this.amount + price;

    this.refresh(); //Перерисовываем корзину
  }

  remove(idProduct) {
    for (let arrInd in this.basketItems) {
      if (this.basketItems[arrInd].id_product === idProduct) {
        this.amount -= this.basketItems[arrInd].price;
        this.basketItems.splice(arrInd, 1);
        this.countGoods--;
        this.refresh();
        break;
      }
    }
  }

  setCounterAndTotalPrice() {
    let count = this.countGoods;
    if (count > 0) {
      this.$elemCounter.text(count)
        .addClass('active');
      this.$elemTotalPrice.text('$'+this.amount);

    }else {
      this.$elemCounter.text('')
        .removeClass('active');
      this.$elemTotalPrice.text('$'+this.amount);
    }
  }

  refresh() {
    this.setCounterAndTotalPrice();
    this.$productsWrap.empty();
    for (let item of this.basketItems) {
      this.$productsWrap.append(new Good(item.id_product, item.title, item.price, item.src).render());
    }
  }
}