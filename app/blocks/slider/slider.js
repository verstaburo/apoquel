/* eslint-disable */
// http://idangero.us/swiper/#.WcIu5oy0OHs
import * as Swiper from 'swiper/dist/js/swiper';

const $ = window.$;
const globalOptions = window.globalOptions;

export default function slider() {
  const
    w = $(window),
    dotsClass = '.dots';

  // Слайдер статей
  $('.js-banners-slider').each(function () {
    const slider = new Swiper($(this), {
      autoplay: {
        delay: 3000,
      },
      loop: true,
      speed: 700,
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: {
        el: $(this).find(dotsClass),
        clickable: true,
        paginationClickableClass: 'advantages-slider__dots_clickable',
        bulletClass: 'dots__dot',
        bulletActiveClass: 'is-active',
      },
      simulateTouch: false,
      roundLengths: true,
      autoHeight: true,
    });
  });

  // Слайдер преимуществ
  $('.js-advantages-slider').each(function () {
    if (w.width() >= globalOptions.sizes.sm) return;

    const slider = new Swiper($(this), {
      speed: 700,
      slidesPerView: 1,
      spaceBetween: 18,
      simulateTouch: false,
      pagination: {
        el: $(this).find(dotsClass),
        clickable: true,
        paginationClickableClass: 'advantages-slider__dots_clickable',
        bulletClass: 'dots__dot',
        bulletActiveClass: 'is-active',
      },
      roundLengths: true,
    });
  });

  // Слайдер статей
  $('.js-articles-slider').each(function () {
    if (w.width() >= globalOptions.sizes.lg) return;

    const slider = new Swiper($(this), {
      speed: 700,
      slidesPerView: 'auto',
      spaceBetween: 8,
      simulateTouch: false,
      roundLengths: true,
      breakpoints: {
        768: {
          spaceBetween: 12,
        },
      },
    });
  });

  // Слайдер что вызываед зуд
  $('.js-reason-slider').each(function () {
    if (w.width() >= globalOptions.sizes.sm) return;

    const slider = new Swiper($(this), {
      speed: 700,
      slidesPerView: 1,
      spaceBetween: 16,
      simulateTouch: false,
      roundLengths: true,
      pagination: {
        el: $(this).find(dotsClass),
        clickable: true,
        paginationClickableClass: 'advantages-slider__dots_clickable',
        bulletClass: 'dots__dot',
        bulletActiveClass: 'is-active',
      },
    });
  });

  // Слайдер вопросов и ответов
  $('.js-faq-slider').each(function () {
    if (w.width() >= globalOptions.sizes.sm) return;

    const slider = new Swiper($(this), {
      speed: 700,
      slidesPerView: 'auto',
      spaceBetween: 0,
      pagination: {
        el: $(this).find(dotsClass),
        clickable: true,
        paginationClickableClass: 'advantages-slider__dots_clickable',
        bulletClass: 'dots__dot',
        bulletActiveClass: 'is-active',
      },
      simulateTouch: false,
      roundLengths: true,
      freeMode: true,
    });
  });

  // Слайдер преимуществ
  $('.js-test-slider').each(function () {
    const el = $(this);

    const slider = new Swiper($(this), {
      speed: 700,
      slidesPerView: 1,
      spaceBetween: 0,
      simulateTouch: false,
      roundLengths: true,
      init: false,
      allowTouchMove: false,
    });

    slider.on('init slideChangeTransitionStart', function () {
      const current = slider.activeIndex + 1;
      const total = slider.slides.length;
      const progress = slider.progress;
      const parent = el.parents('.test');

      parent.find('.test__counter').text(`${current}/${total}`);
      parent.find('.test__progressbar span').css({width: `${progress * 100}%`});
    });

    slider.init();

    $('.js-test-next').on('click', function () {
      slider.slideNext();
    });
  });
}
/* eslint-enable */
