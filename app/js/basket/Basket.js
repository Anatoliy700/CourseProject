/**
 *
 */
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

  /**
   *
   * @param $jQueryElement
   */
  render($jQueryElement) {
    this.$productsWrap = $('<div />', {
      class: this.settings.basketHeaderSettings.classWrapProducts,
    });

    this.$elemTotalPrice = $('<span />', {
      class: this.settings.basketHeaderSettings.classTotalValue
    });

    let $priceTotalWrap = $('<div />', {
      class: this.settings.basketHeaderSettings.classWrapPriceTotal,
    }).append($('<span />', {
      class: this.settings.basketHeaderSettings.classTotalDescription,
      text: 'total'
    })).append(this.$elemTotalPrice);

    let $buttonsWrap = $('<div />', {
      class: this.settings.basketHeaderSettings.classWrapButton,
    }).append($('<button />', {
      class: this.settings.basketHeaderSettings.classButtonCheckout,
      text: 'Checkout'
    })).append($('<button />', {
      class: this.settings.basketHeaderSettings.classButtonGoToCart,
      text: 'Go to cart',
      'data-type': 'shopping-cart'
    }));

    $jQueryElement.append(this.$productsWrap)
      .append($priceTotalWrap)
      .append($buttonsWrap);


    //Получаем уже добавленные в корзину товары
    this.getBasket();
    // $productsWrap.append(new Good().render());
  }

  /**
   *
   */
  getBasket(callback) {
    //let self = this;
    $.ajax({
      type: 'GET',
      url: this.settings.pathJsonFile,
      context: this,
      success: function (data) {

        this.amount = data.amount;

        for (let item of data.basket) {
          this.countGoods += item.quantity;
          this.basketItems.push(item);
        }
        this.refresh();
        callback();
      }
      ,
      error: function (error) {
        console.log('Произошла ошибка при получении данных', error);
      },
      dataType: 'json'
    });
  }

  /**
   *
   * @param id_product
   * @param title
   * @param price
   * @param src
   */
  add(id_product, title, price, src) {

    let basketNewItem = {
      id_product,
      price, //price: price
      title,
      src,
      quantity: 1
    };
    let ind = this.basketItems.findIndex(function (elem) {
      return (elem.id_product === id_product);
    });
    if (ind === -1) {
      this.basketItems.push(basketNewItem);
    } else {
      this.basketItems[ind].quantity++;
    }

    this.countGoods++;
    this.amount += price; //this.amount = this.amount + price;

    this.refresh(); //Перерисовываем корзину
  }

  /**
   *
   * @param idProduct
   */
  remove(idProduct) {
    for (let arrInd in this.basketItems) {
      if (this.basketItems[arrInd].id_product === idProduct) {
        this.amount -= this.basketItems[arrInd].price;
        this.countGoods--;
        if (this.basketItems[arrInd].quantity > 1) {
          this.basketItems[arrInd].quantity--;
        } else {
          this.basketItems.splice(arrInd, 1);
        }
        this.refresh();
        break;
      }
    }
  }

  /**
   *
   */
  setCounterAndTotalPrice() {
    let count = this.countGoods;
    if (count > 0) {
      this.$elemCounter.text(count)
        .addClass('active');
      // this.$elemTotalPrice.text('$' + this.amount);

    } else {
      this.$elemCounter.text('')
        .removeClass('active');
      // this.$elemTotalPrice.text('$' + this.amount);
    }
  }

  /**
   *
   */
  refresh() {
    this.setCounterAndTotalPrice();
    if(this.settings.objectBasketHeader){
      this.settings.objectBasketHeader.refresh();
    }
  }
}