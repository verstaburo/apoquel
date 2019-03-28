/* eslint-disable */

/**
 * REMOVE IT
 *
 * Скрипты можно писать тут, либо подключать с помощь https://github.com/coderhaoxin/gulp-file-include
 *
 * ВАЖНО: Файлы просто подключаются, без транспиляции (babel) минификации, поэтому нужно писать на ES5
 * Так же доступа к блокам, которые собираются с помощью вебпака не будет.
 */

$(function () {

  function shopPage() {

    if ($('.shops').length < 1) return;

// Получение параметров из URL
    var getUrlParameter = function getUrlParameter(sParam) {
      var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

      for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
      }
    };

// Селект
    var select = new Choices('.js-city-select', {
      searchEnabled: true,
      searchChoices: true,
      itemSelectText: '',
      shouldSort: false,
      classNames: {
        containerOuter: 'choices city-select',
      },
      noResultsText: 'Город не найден',
    });
// Показ результатов только после ввода 2-х символов
    select.passedElement.element.addEventListener('choice', function (event) {
      $('.city-select .choices__list--dropdown .choices__list').removeAttr('style');
    });

    $(document).on('keyup keydown change', '.city-select .choices__list--dropdown input', function () {
      var
        el = $(this),
        inputVal = el.val(),
        valLength = inputVal.length,
        list = el.siblings('.choices__list');

      valLength >= 2 ? list.attr('style', 'display: block !important') : list.removeAttr('style');
    });
// Показ адресов
    $(document).on('click', '.js-shop-button', function () {
      $(this).toggleClass('is-active');
      $(this).parents('.shops__item').find('.shops__adresses').slideToggle(500);
    });

// Переключение видов
    $(document).on('change', '.js-map-switch input', function () {
      $(this).parents('.search').find('.tabs__tab:not(.is-active)')[0].click();
    });

    var currentCity = "Москва";

// Карта
    window.myMap;
    ymaps.ready(init);

    function init() {
      myMap = new ymaps.Map("map", {
        center: [40.510034, 49.294752],
        zoom: 9
      });

      clusterer = new ymaps.Clusterer({

        clusterIcons: [
          {
            href: '/local/templates/main/assets/images/cluster.png',
            size: [40, 40],
            offset: [-20, -20]
          }
        ],

        groupByCoordinates: false,
        clusterDisableClickZoom: true,
        clusterHideIconOnBalloonOpen: false,
        geoObjectHideIconOnBalloonOpen: false
      });

      // Отключаем зум колесиком
      myMap.behaviors.disable('scrollZoom');

      // Получение города
      ymaps.geolocation.get({autoGeocode: true}).then(function (result) {
        if (getUrlParameter('city')) {
          currentCity = getUrlParameter('city');
        } else {
          currentCity = result.geoObjects.get(0).properties.getAll()["name"] || "Москва";
        }

        select.setChoiceByValue(currentCity);
        $(document).find('.js-city-name').text(currentCity);
        history.replaceState(currentCity, document.title, window.location.pathname + "?city=" + currentCity);

        // Загружаем объекты
        shopPageWork();
      });
    }

// Обновляем объекты
    $(document).on('change', '[name="searchRadio"], .js-city-select', function () {
      currentCity = $(document).find('.js-city-select').val();
      history.replaceState(currentCity, document.title, window.location.pathname + "?city=" + currentCity);
      $(document).find('.js-city-name').text(currentCity);
      shopPageWork();
    });
    $(document).on('change', ' .js-city-select', function () {
      var myGeocoder = ymaps.geocode(currentCity, {result: 1});
      myGeocoder.then(
        function (res) {
          var firsGeoObject = res.geoObjects.get(0);
          var coords = firsGeoObject.geometry.getCoordinates();
          myMap.setCenter(coords, 9);
        }
      );
    });
    function placemarkWithContent(coords, name, address, website, image, logo) {
      return new ymaps.Placemark(coords, {
        balloonContentHeader: '<img src="' + logo + '" style="max-width: 100px; max-height: 60px; margin-bottom: 10px;"><div style="font-family: Montserrat, Arial, sans-serif">' + name + '</div>',
        balloonContentBody: '<div style="font-family: Open Sans, Arial, sans-serif">' + address + '</div>',
        balloonContentFooter: '<a href="' + website['link'] + '" style="color: #005260; font-family: Open' +
          ' Sans,' +
          ' Arial, sans-serif">' + website['text'] + '</a>',
        hintContent: name,
      }, {
        iconLayout: 'default#imageWithContent',
        iconImageHref: image,
        iconImageSize: [30, 38],
        iconImageOffset: [-15, -38],
        iconContentOffset: [15, 15],
      });
    }

    function shopPageWork() {
      // Фильтр типов объектов
      var currentFilter = [];
      $(document).find('[name="searchRadio"]:checked').each(function (i) {
        currentFilter[i] = $(this).val();
      });
      currentCity = $(document).find('.js-city-select').val();
      // Получаем список магазинов и выводим на карту
      $.getJSON('/shops/shops.php?city=' + currentCity, function (json) {
        var objects = json;
        var objectsCount = 0;
        var shops = $(document).find('.shops__items');
        var geoObjects = [];
        var pointIndex = 0;
        // Убираем ранее загруженные магазины
        shops.html('');

        clusterer.removeAll();
        myMap.geoObjects.removeAll();

        // Выводим объекты в список и на карту
        $.each(objects, function (i) {
          var pointTypesCount = 0;

          $.each(objects[i]["type"], function (j) {
            if ($.inArray(objects[i]["type"][j].toString(), currentFilter) !== -1 && currentFilter.length > 0) {
              pointTypesCount++;
            }
          });

          if (pointTypesCount === 0) return;
          if ((objects[i]["shops"] !== undefined) && objects[i]["shops"][currentCity] === undefined) return;

          objectsCount += 1;

          var shopHTML = '';
          shopHTML += '<div class="shops__item">';
          shopHTML += '<div class="shops__row shops__row_shop">';
          shopHTML += '<div class="shops__col shops__col_logo">';
          shopHTML += '<img class="shops__logo" src="' + (objects[i]["logo"]) + '" alt="" role="presentation">';
          shopHTML += '</div>';
          shopHTML += '<div class="shops__col shops__col_name">';
          shopHTML += '<h2 class="shops__name">' + (objects[i]["name"]) + '</h2>';
          shopHTML += '<a class="shops__link shops__link_mobile" href="' + (objects[i]["website"]["link"]) + '">' + (objects[i]["website"]["text"].replace(/(^\w+:|^)\/\//, '')) + '</a>';
          shopHTML += '</div>';
          shopHTML += '<div class="shops__col shops__col_site">';
          shopHTML += '<a class="shops__link" href="' + (objects[i]["website"]["link"]) + '">' + (objects[i]["website"]["text"].replace(/(^\w+:|^)\/\//, '')) + '</a>';
          shopHTML += '</div>';
          shopHTML += '<div class="shops__col shops__col_phone"><img class="shops__phone-icon" src="assets/images/phone.svg" alt="" role="presentation">';
          shopHTML += '<div class="shops__phones">';


          shopHTML += '<a class="shops__phone" href="tel:' + (objects[i]["phone"]) + '">' + (objects[i]["phone"]) + '</a>';


          shopHTML += '</div>';
          shopHTML += '</div>';
          shopHTML += '<div class="shops__col shops__col_button">';
          shopHTML += '<button class="shops__button js-shop-button"></button>';
          shopHTML += '</div>';
          shopHTML += '</div>';
          shopHTML += '<ul class="shops__adresses">';

          // Город
          $.each(objects[i]["shops"][currentCity], function (n) {
            var address = objects[i]["shops"][currentCity][n]["address"];
            var coords = objects[i]["shops"][currentCity][n]["coordinates"];
            var image = objects[i]["mapImage"] ;
            var name = objects[i]["name"];
            var logo = objects[i]["logo"];
            var website = objects[i]["website"];
            var geoPoint = placemarkWithContent(coords, name, address, website, image, logo);
            shopHTML += '<li class="shops__adress">' + (objects[i]["shops"][currentCity][n]["address"]) + '</li>';

            geoObjects[pointIndex] = geoPoint;
            pointIndex++;
          });

          shopHTML += '</ul>';
          shopHTML += '</div>';

          shops.append(shopHTML);
        });

        clusterer.add(geoObjects);
        myMap.geoObjects.add(clusterer);
        // Показываем добавленные объекты и выставляем зум
        if (objectsCount < 1) {
          $('.shops').addClass('is-empty');
        } else {
          $('.shops').removeClass('is-empty');
        }

        if (objectsCount < 1) return;
      });
    }
  }

  shopPage();
});

// Фон хлебных крошек
$('.breadcrumbs + .section_grey').prev('.breadcrumbs').addClass('breadcrumbs_grey');

/* eslint-enable */
