class Good {
  constructor(id, title, price, src) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.src = src;
  }

  render($jQueryElement) {
    let $goodContainer = $(`<div id="${this.id}" class="acc__cart__product">
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
                        <span class="product__data_number">1</span> x <span class="product__data_price">$${this.price}</span>
                      </div>
                    </div>
                    <div class="acc__cart__product__del">
                      <button data-type="del" data-id="${this.id}">
                        <i class="fa fa-times" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>`);
    return $goodContainer;

/*
    let $goodTitle = $('<p />', {
      text: this.title
    });

    let $goodPrice = $(`<p>Цена: <span class="product-price">${this.price}</span> руб.</p>`);

    let $goodBuyBtn = $('<button />', {
      class: 'buygood',
      'data-id': this.id,
      text: 'Купить'
    });

    //TODO: Добавить кнопку для удаления
      let goodDelBtn = $('<button />', {
        class: 'delgood',
        'data-id': this.id,
        text: 'Удалить'
      });

    //Объединяем элементы для получения структуры
    $goodTitle.appendTo($goodContainer);
    $goodPrice.appendTo($goodContainer);
    $goodBuyBtn.appendTo($goodContainer);
    goodDelBtn.appendTo($goodContainer);
*/

    $jQueryElement.append($goodContainer);
  }
}


