"use strict";

/**
 * Оббъект с настройками для работы скрипта.
 * @property {string} idContainer id элемента основного контейнера
 * @property {string} idCommentBlock id элемента контейнера для вывода комментариев.
 * @property {string} classCommentApproved class присваеваемый одобренному комментарию.
 * @property {string} urlGetAllComments путь к файлу(заглушке) JSON ответа сервера при получении комментариев.
 * @property {string} urlDelComment путь к файлу(заглушке) JSON ответа сервера при удалении комментария.
 * @property {string} urlApprovalComment путь к файлу(заглушке) JSON ответа сервера при одобрении комментария.
 * @property {string} urlAddComment путь к файлу(заглушке) JSON ответа сервера при добавлении комментария.
 */
const settings = {
  idContainer: 'container',
  idCommentBlock: 'comment_wrapper',
  classCommentApproved: 'approved',
  urlGetAllComments: 'json/review.list.json',
  urlDelComment: 'json/review.delete.json',
  urlApprovalComment: 'json/review.submit.json',
  urlAddComment: 'json/review.add.json',
};

/**
 * Объект работы с комментариями.
 * @property {Object} settings подключение объекта с настройками.
 * @property {jQuery} $elCommentBlock элемент-обертка для выводимых комментариев.
 * @property {Array} arrAllComments массив для комментариев, получаемых с сервера.
 */
const commentBlock = {
  settings,
  $elCommentBlock: null,
  arrAllComments: [],

  /**
   * Инициализация блока с комментариями, запрос к серверу для получения текущих комментариев.
   * Получает комментарии с сервера и отрисовавает их.
   * Навшивает обработчик события нажатия кнопок.
   * В случае ошибки ответа от сервера, выводит сообщение об ошибке в консоль.
   */
  init() {
    this.$elCommentBlock = $(`#${this.settings.idCommentBlock}`);
    $(`#${this.settings.idContainer}`).on('click', 'button', event => this.btnClickHandler(event));
    this.ajax({
      url: this.settings.urlGetAllComments,
      data: '',
      success: data => {
        if (data.result && data.result === 0) {
          console.error(`Ошибка! Ответ от сервера: ${data.error_message}`);
          return;
        }
        this.arrAllComments = data.comments;

        this.render();
      }
    });
  },

  /**
   * Отрисовывает блоки с комментариями из массива с комментариями.
   */
  render() {
    if (this.arrAllComments.length > 0) {
      for (const obj of this.arrAllComments) {
        const comment = new Comment(obj.id_comment, obj.name, obj.text);
        comment.render(this.$elCommentBlock);
      }
    }
  },

  /**
   * Обработчик события клика по кнопке.
   * Определяет какая была нажата кнопка и в зависимости от этого запускает определенный метод.
   * @param {Event} event событие клика по кнопке.
   */
  btnClickHandler(event) {
    if (event.target.dataset.type === 'del') {
      this.remove(event.target);
    } else if (event.target.dataset.type === 'app') {
      this.approve(event.target);
    } else if (event.target.dataset.type === 'add') {
      event.preventDefault();
      this.add(event.target);
    }
  },

  /**
   * Одобрение определенного комментария. Отправляет id одобряемого комментария на сервер и вслучае удачного ответа
   * от сервера добавляет класс одобрения к текущему комментарию и удаляет кнопку одобрения у текущего комментария.
   * Если сервер вернул ошибку, то выводим сообщение об ошибке и не производим ни какие изменения с комментарием.
   * @param {HTMLElement} elem кнопки одобрения блока текущего комментария.
   */
  approve(elem) {
    this.ajax({
      url: this.settings.urlApprovalComment,
      data: {
        id_comment: elem.dataset.id
      },
      success: data => {
        (function (data, elem, obj) {
          if (data.result && data.result === 1) {
            $(elem).parent('.comment-item').addClass(obj.settings.classCommentApproved)
              .attr('data-approved', true);
            $(elem).remove()

          } else if (data.result === 0) {
            alert(`Сервер вернул ошибку: ${data.error_message}`);
          }
        }(data, elem, this))
      }
    });
  },

  /**
   * Удаление определенного комментария. Отправляет id удаляемого комментария на сервер и вслучае удачного ответа
   * от сервера удаляет блок данного комментария.
   * Если сервер вернул ошибку, то выводим сообщение об ошибке и не производим ни какие изменения с комментарием.
   * @param {HTMLElement} elem кнопки удаления блока текущего комментария.
   */
  remove(elem) {
    this.ajax({
      url: this.settings.urlDelComment,
      data: {
        id_comment: elem.dataset.id
      },
      success: data => {
        (function (data, elem) {
          if (data.result && data.result === 1) {
            $(elem).parent(`.comment-item`).remove();
          } else if (data.result === 0) {
            alert(`Сервер вернул ошибку: ${data.error_message}`);
          }
        }(data, elem))
      }
    });
  },

  /**
   * Добавление нового комментария. Если доступен скрипт для валидации формы, то заускает валидацию и при прохождении
   * валидации отправляет данные нового комментария на сервер и вслучае удачного ответа от сервера добавляет блок
   * нового комментария но страницу.
   * Если скрип валидации не доступен, то не производит процесс валидации и переходит к отправке данных.
   * Если сервер вернул ошибку, то выводим сообщение об ошибке и не производим ни какие действия с комментарием.
   * @param {HTMLElement} elem кнопки отправки данных формы.
   */
  add(elem) {
    if (validateForm) {
      if (!validateForm.startValidate($(elem).parents('form'))) {
        return;
      } else {
        $(elem).parents('form').find(`.${validateForm.classValidateInput}`).removeClass(validateForm.classValidateInput);
      }
    }
    let userNameInput = $(elem).siblings(`#nameUser`);
    let userMessageInput = $(elem).siblings(`#commentUser`);
    let userName = userNameInput.val();
    let userMessage = userMessageInput.val();
    if (userName && userMessage) {
      let userId = Math.floor(Math.random() * 100 * userName.length);
      this.ajax({
        url: this.settings.urlAddComment,
        data: {
          id_user: userId,
          name: userName,
          text: userMessage
        },
        success: data => {
          (function (data, elem, arrComments) {
            if (data.result && data.result === 1) {
              const newComment = new Comment(userId, userName, userMessage);
              newComment.render(elem);
              arrComments.push({
                "id_comment": userId,
                "name": userName,
                "text": userMessage
              });
              userNameInput.val('');
              userMessageInput.val('');
            } else if (data.result === 0) {
              alert(`Сервер вернул ошибку: ${data.error_message}`);
            }
          }(data, this.$elCommentBlock, this.arrAllComments))
        }
      });
    }
  },

  /**
   * Обертка для ajax запроса.
   * @param {Object} param параметры запроса.
   */
  ajax(param) {
    $.ajax({
      url: param.url,
      type: 'GET',
      dataType: 'json',
      data: param.data,
      success: param.success,
      error: (data, textStatus, jqXHR) => console.error(textStatus, jqXHR),
    });
  },

};