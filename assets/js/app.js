!(function () {
  function mousemove(elem, a) {

    elem.on("mousemove", function () {
      var child = this.select(a).elems;

      child.each(function (elem) {
        elem.attr("fill", "var(--color-white)");
      });
    });

    elem.on("mouseleave", function () {
      var child = this.select(a).elems;
      child.each(function (elem) {
        elem.attr("fill", "url(#gradient)");
      });
    });

  }

  mousemove($(".body__button-price"), "g");

  mousemove($(".content__view-products"), "path");

  $(".cart-button").each(function (elem) {
    mousemove(elem, "g");
  });
  
  var nav = $('.nav__list-pages');

  var $click = function(element, type) {
    $(element).on('click', function() {
      nav[type]('show-nav');
    })
  }

  $click('.buttom__item-nav', 'add');
  $click('.nav__x', 'remove');
  var upPage = $('#upPage');

  this.body().scrolling(function () {
    var headerNav = $(".header");
    var scrollTop = this.y;
    if (scrollTop >= 100) {
      headerNav.sty({
        background: "var(--body-color)",
      });
      upPage.sty({
        display: 'initial',
      })
    } else {
      headerNav.sty({
        background: "",
      });
      upPage.sty({
        display: 'none',
      })
    }
  });

  upPage.on('click', function() {
    var ELEM_A = $.elem('a', {href:'#'});
    ELEM_A.click(); 
  })
  var ini = new $.anim();

  ini.show(".container-image-one", { origin: "top", move: 100, delay: 1.5 });

  ini.show(
    ".body__data--titles h1,.body__data--titles h2,.body__title-description,.body__data-description",
    { origin: "right", move: 100, delay: [1, 1.3, 1.6, 1.9] }
  );

  ini.show(".body__button-price", { origin: "right", move: 80, delay: 2.2 });

  ini.show($(".section__item-img-social"), {
    origin: "bottom",
    move: 100,
    delay: [1, 1.3, 1.6, 1.9],
  });

  ini.show(".--info .image-item-info", { origin: "left", move: 130, delay: 1.3 });

  ini.show(".titles-info h1,.titles-info h2", {
    origin: "top",
    move: 100,
    delay: [1, 1.5],
  });

  ini.show(".subtitle-info p, .subtitle-info button", {
    origin: "bottom",
    move: 100,
    delay: [1, 1.3],
  });

  ini.show(".products__titles h1, .products__titles h2", {
    origin: "top",
    move: 100,
    delay: [1, 1.3],
  });

  ini.show($(".content__slider-products li"), {
    origin: "bottom",
    move: 100,
    delay: [1, 1.3, 1.6],
  });

  ini.show($(".products__unic li"), {
    origin: "bottom",
    move: 100,
    delay: [1, 1.3, 1.6],
  });

  ini.show($(".footer__title"), {
    origin: "left",
    move: 60,
    delay: [1, 1.3, 1.6],
  });

  ini.show($(".footer__help li:not(.footer__title)"), {
    origin: "bottom",
    move: 60,
    delay: [1, 1.3, 1.6, 1.9],
  });

  ini.show($(".footer__store li:not(.footer__title)"), {
    origin: "bottom",
    move: 60,
    delay: [1, 1.3, 1.6],
  });

  ini.show(".footer__list .footer-email", {
    origin: "bottom",
    move: 60,
    delay: [1, 1.3, 1.6, 1.9],
  });

})()