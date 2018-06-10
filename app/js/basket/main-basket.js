

  const basketRun ={
  settings:{
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

    init(){
    this.$elemWrapTopBasket = $(`#${this.settings.idWrapTopBasket}`);
    const basket = new Basket(this.settings.basketSettings);
    basket.render(this.$elemWrapTopBasket);
    this.$elemWrapTopBasket.on('click', 'button', function () {
      let target = $(this);
      if(target.attr('data-type') === 'del'){
        basket.remove(parseInt(target.attr('data-id')))
      }
    })
    },
  };






/*

  let $goods = $('.goods');

  //Создаем товары
  let good1 = new Good(123, 'Коврик для мыши', 300);
  good1.render($goods);

  let good2 = new Good(124, 'Клавиатура', 1000);
  good2.render($goods);

  let good3 = new Good(125, 'Мышь для ПК', 700);
  good3.render($goods);

  //Создаем экземпляр корзины
  let basket = new Basket('basket');
  basket.render($('#basket_wrapper'));


  //Добавление товара в карзину перетаскиванием
  $('.goods > .good').draggable({
    helper: 'clone',
    scope: 'good',
    addClasses: true,
    start: function (event, ui) {
      ui.helper.addClass('ui-drag-activate_good');
    }
  });

  $('#basket').droppable({
    activeClass: 'ui-drag-activate_basket',
    scope: 'good',
    drop: function (event, ui) {
      let idProduct = parseInt($(ui.draggable).find('button.buygood').attr('data-id'));
      let price = parseInt($(ui.draggable).find('span.product-price').text());
      basket.add(idProduct, price);
      $(this).addClass('ui-drag-drop_basket', 500,
        function () {
          $(this).removeClass("ui-drag-drop_basket", 500);
        }
      );
    },
  });
  //


  //Добавление товара в корзину
  $('button.buygood').on('click', function () {
    let idProduct = parseInt($(this).attr('data-id'));
    let price = parseInt($(this).parent().find('span.product-price').text());

    basket.add(idProduct, price);
  });

  //Удаление товара из корзины
  //TODO: ДЗ
  $('button.delgood').click(function () {
    let idProduct = parseInt($(this).attr('data-id'));

    basket.remove(idProduct);
  });

  console.log('test!!!');
*/


  $(document).ready(()=> basketRun.init());