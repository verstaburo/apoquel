/* eslint-disable */
const $ = window.$;

export default function faq() {
  const heads = $(document).find('.faq-head');

  $(document).on('click', '.js-faq-card', function () {
    const
      card = $(this),
      number = card.data('faq-card'),
      head = $(document).find(`[data-faq-head="${number}"]`);

    $(document).find('.js-faq-card').removeClass('is-active').css({
      marginBottom: 0,
    });
    head.addClass('is-active').siblings().removeClass('is-active');
    heads.addClass('is-active');
    card.addClass('is-active').css({
      marginBottom: heads.outerHeight(true) + 12,
    });

    heads.css({
      top: card.offset().top + card.outerHeight(),
    });
  });

  // Скрываем попап при клике вне него
  $(document).mouseup(function (e) {
    const modal = $('.js-faq-card');
    if (!modal.is(e.target) && !modal.has(e.target).length) {
      modal.removeClass('is-active').css({
        marginBottom: 0,
      });
      heads.removeClass('is-active');
    }
  });

  // Открываем первую карточку на планшетах и десктопе
  if ($(window).width() >= 768) {
    $(document).find('[data-faq-card]')[0].click();
  }

  // Посмотреть все
  $(document).on('click', '.js-toggle-button', function () {
    $(document).find($(this).data('toggle-target')).addClass('is-active');
    $(this).remove();

    setTimeout(function () {
      $(document).find($(this).data('toggle-target')).css({
        maxHeight: 'none',
      });
    }, 300);
  });
};
/* eslint-enable */
