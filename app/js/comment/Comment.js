/**
 * Класс реализует блок комментария и вывод его на страницу.
 */
class Comment {

  /**
   * Конструктор класса.
   * @param {int} commentId id комментария в бызе данных.
   * @param {string} name имя пользователя, оставившего комментарий.
   * @param {string} message текст комментария.
   */
  constructor(commentId, name, message) {
    // this.id_user = userId;
    this.text = message;
    this.id_comment = commentId;
    this.name = name;
    this.classContainer = 'comment-item';
    this.className = 'comment-item_name';
    this.classMessage = 'comment-item_message';
    this.classDelBtn = 'comment-item_del-btn';
    this.classApprovelBtn = 'comment-item_approve-btn';
  }

  /**
   * Собирает блок с комментарием и выводит его на страницу.
   * @param {jQuery} $jQueryElement элемент-обертка в которую выводим комментарии.
   */
  render($jQueryElement) {
    const $containerComment = $('<div />', {
      class: this.classContainer,
      'data-id': this.id_comment,
      'data-approved': false,
    });
    const $nameComment = $('<p />', {
      class: this.className,
      text: this.name,
    });
    const $messageComment = $('<p />', {
      class: this.classMessage,
      text: this.text,
    });
    const $delBtnComment = $('<button />', {
      class: this.classDelBtn,
      'data-id': this.id_comment,
      'data-type': 'del',
      text: 'Удалить',
    });
    const $approveBtnComment = $('<button />', {
      class: this.classApprovelBtn,
      'data-id': this.id_comment,
      'data-type': 'app',
      text: 'Одобрить',
    });
    $containerComment
      .append($nameComment)
      .append($messageComment)
      .append($delBtnComment)
      .append($approveBtnComment)
      .appendTo($jQueryElement);
  }
}