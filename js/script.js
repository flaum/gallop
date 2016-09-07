$(document).ready(function() {
	var links = $(document).find("a");

	var leftSidebar = $(".left-sidebar").children();
	var leftSidebarItem = leftSidebar.children();
	var userBlock = $(".left-sidebar__user-block");
	var loginBtns = $(".left-sidebar__enter-btns").children();
	var popupOuter = $(".popup-outer");
	var inputsWrap = $(".popup__form-input-wrapper");
	var inputs = $(".popup__form-input-wrapper").find("input");

	var login = "popup--login";
	var loginPopup = $(".popup--login");
	var loginBtn = $(".left-sidebar__login-btn");
	var loginBtnClass = "left-sidebar__login-btn";
	var loginBtnActive = "left-sidebar__login-btn--active";

	var sign = "popup--registration";
	var signPopup = $(".popup--registration");
	var signBtn = $(".left-sidebar__sign-btn");
	var signBtnClass = "left-sidebar__sign-btn";
	var signBtnActive = "left-sidebar__sign-btn--active";

	var current = "popup--current";
	var exit = "popup--exit";

	// popup mode function
	function popupMode(element) {

		// проверка соответствия открытого попапа кнопе, на которую нажали
		// если не соответствует, закрываем попап и открываем нужный, если
		// соответствует, не делаем ничего.
		var btnClass = $(element).attr("class");

		for(var i = 0; i < popupOuter.children().length; i++) {
			var el = $(popupOuter.children()[i]);

			if(el.hasClass(current) == true) {
				if(el.hasClass(sign) == false || el.hasClass(login) == false) {
					el.removeClass(current).addClass(exit);

					var hasClassL = $(element).hasClass(loginBtnClass);
					var hasClassS = $(element).hasClass(signBtnClass);
					if(hasClassL == true) {
						loginPopup.addClass(current).removeClass(exit);
					} else if (hasClassS == true) {
						signPopup.addClass(current).removeClass(exit);
					}
				}
			}
		};

		if(leftSidebar.parent().hasClass("left-sidebar--popup") == false) {
			leftSidebar.parent().addClass("left-sidebar--popup");
		};

		popupOuter.removeClass("popup-outer--exit").addClass("popup-outer--visible");

		if(btnClass  == loginBtnClass) {
			$(element).addClass(loginBtnActive);
			signBtn.removeClass(signBtnActive);

			if(signPopup.hasClass(current) == true) {
				loginPopup.removeClass(current).addClass(exit);
			};

			if(loginPopup.hasClass(current)) {
				return false;
			} else {
				loginPopup.removeClass(exit).addClass(current);
			};

		} else if (btnClass  == signBtnClass) {
			$(element).addClass(signBtnActive);
			loginBtn.removeClass(loginBtnActive);

			if(loginPopup.hasClass(current) == true) {
				loginPopup.removeClass(current).addClass(exit);
			};

			if(signPopup.hasClass(current)) {
				return false;
			} else {
				signPopup.removeClass(exit).addClass(current);
			};
		};

		for(var i = 0; i < leftSidebarItem.length; i++) {
			var className;
			var sideItem = $(leftSidebarItem[i]);

			if(sideItem.attr("class").indexOf(" ") == -1) {
				className = sideItem.attr("class") + "--popup";
			} else {
				className = sideItem.attr("class").slice(0, sideItem.attr("class").indexOf(" ")) + "--popup";
			};

			if(sideItem.hasClass(className) == false) {
				sideItem.addClass(className);
			};
		};
		// return false;
	};

	// popup exit function
	function popupExit() {
		leftSidebar.parent().removeClass("left-sidebar--popup");
		popupOuter.removeClass("popup-outer--visible").addClass("popup-outer--exit");

		for(var i = 0; i < popupOuter.children().length; i++) {
			if($(popupOuter.children()[i]).hasClass(current) == true) {
				$(popupOuter.children()[i]).removeClass(current).addClass(exit);
			}
		};

		for(var i = 0; i < loginBtns.length; i++) {
			var btnClass;
			var btn = $(loginBtns[i]);

			if(btn.attr("class").indexOf(" ") == -1) {
				btnClass = btn.attr("class") + "--active";
			} else {
				btnClass = btn.attr("class").slice(0, btn.attr("class").indexOf(" ")) + "--active";
			};
			btn.removeClass(btnClass);
		};

		for(var i = 0; i < leftSidebarItem.length; i++) {
			var sideItem = $(leftSidebarItem[i]);
			var className = sideItem.attr("class").slice(0, $(leftSidebarItem[i]).attr("class").indexOf(" ")) + "--popup";
			sideItem.removeClass(className);
		};
	}

	// if link dont use prevent default event
	for(var i = 0; i < links.length; i++) {
		var href = $(links[i]).attr("href");
		if(href == "#") {
			$(links[i]).on("click", function(e) {
				e = e || event;
				e.preventDefault();
			});
		};
	};


	// Навешиваем события на кнопки входа/регистрации

	for(var i = 0; i < loginBtns.length; i++) {
		$(loginBtns[i]).on("click", function(e) {
			e == e || event;
			e.preventDefault;
			popupMode(this);
		});
	};

	// переход к форме восстановления пароля

	loginPopup.find(".popup__form-link").on("click", function(e) {
		e = e || event;
		e.preventDefault;

		loginPopup.removeClass(current).addClass(exit);
		$(".popup--reset-main").removeClass(exit).addClass(current);
	});

	// переход с формы регистрации на форму входа

	signPopup.find(".popup__form-link").on("click", function(e) {
		e = e || event;
		e.preventDefault;

		signPopup.removeClass(current).addClass(exit);
		loginPopup.removeClass(exit).addClass(current);
		loginBtn.addClass(loginBtnActive);
		signBtn.removeClass(signBtnActive);
	});

	// закрытие попапов
	$(".popup__close-btn").on("click", function(e) {
		e = e || event;
		e.preventDefault;
		popupExit();
	});

	// back to Sign-up btn event {
	$(".popup__back-btn").on("click", function(e) {
		e = e || event;
		e.preventDefault;
		$(".popup__back-btn").parent().removeClass(current).addClass(exit);
		$(".popup--sign-up").removeClass(exit).addClass(current);
	});


	// closing by ESC key
	$(this).keydown(function (e) {
		e = e || event;
		if(e.which == 27) {
			popupExit();
		}
	});
});
