/* eslint-disable */
const $ = window.$;

import noUiSlider from 'nouislider';

export default function products() {
  if (!$(document).find('.products').length) return;

  // Слайдер
  const slider = document.getElementById('product-slider');

  noUiSlider.create(slider, {
    start: 1,
    range: {
      'min': 1,
      'max': 10
    }
  });

  slider.noUiSlider.on('update', function (values, handle, unencoded, tap, positions) {
    const
      value = Math.round(values[0]),
      button= $(document).find(`.products__item:eq(${value - 1})`),
      type = button.data('product-type'),
      subtype = button.data('product-subtype'),
      product = $(document).find(`.products__med[data-product-type="${type}"]`),
      tablet = product.find(`.products__tablet[data-product-subtype="${subtype}"]`),
      description = product.find(`.products__description[data-product-subtype="${subtype}"]`);

    button.addClass('is-active').siblings().removeClass('is-active');
    product.addClass('is-active').siblings().removeClass('is-active');
    tablet.addClass('is-active').siblings().removeClass('is-active');
    description.addClass('is-active').siblings().removeClass('is-active');
  });

  slider.noUiSlider.on('change', function (values, handle, unencoded, tap, positions) {
    const
      value = Math.round(values[0]);

    slider.noUiSlider.set(value);
  });

  // Клик по собаке
  $(document).on('click', '.products__item', function () {
    const
      button = $(this),
      type = button.data('product-type'),
      subtype = button.data('product-subtype'),
      product = $(document).find(`.products__med[data-product-type="${type}"]`),
      tablet = product.find(`.products__tablet[data-product-subtype="${subtype}"]`),
      description = product.find(`.products__description[data-product-subtype="${subtype}"]`);

    button.addClass('is-active').siblings().removeClass('is-active');
    product.addClass('is-active').siblings().removeClass('is-active');
    tablet.addClass('is-active').siblings().removeClass('is-active');
    description.addClass('is-active').siblings().removeClass('is-active');
    slider.noUiSlider.set(button.index() + 1);
  });

  // Селект
  $(document).on('change', '.js-product-select', function () {
    const option = $(this).find('option:selected');
    $(document).find(`.products__item:eq(${option.index()})`).click();
  });
}
/* eslint-enable */
