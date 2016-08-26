$(document).ready(function() {
	var links = $(document).find("a");
	var leftSidebar = $(".left-sidebar").children();
	var leftSidebarItem = leftSidebar.children();
	var userBlock = $(".left-sidebar__user-block");
	var loginBtns = $(".left-sidebar__enter-btns").children();
	var popupOuter = $(".popup-outer");



	// popup mode function
	function popupMode(element) {
		var btnClass = $(element).attr("class");

		for(var i = 0; i < popupOuter.children().length; i++) {
			if($(popupOuter.children()[i]).hasClass("popup--current") == true && ($(popupOuter.children()[i]).hasClass("popup--login") == false || $(popupOuter.children()[i]).hasClass("popup--registration") == false)) {
				$(popupOuter.children()[i]).removeClass("popup--current").addClass("popup--exit");
			}
		};

		if(leftSidebar.parent().hasClass("left-sidebar--popup") == false) {
			leftSidebar.parent().addClass("left-sidebar--popup");
		};

		popupOuter.removeClass("popup-outer--exit").addClass("popup-outer--visible");

		if(btnClass  == "left-sidebar__login-btn") {
			$(element).toggleClass("left-sidebar__login-btn--active");
			$(".left-sidebar__sign-btn").removeClass("left-sidebar__sign-btn--active")

			if($(".popup--registration").hasClass("popup--current") == true) {
				$(".popup--registration").removeClass("popup--current").addClass("popup--exit");
			};

			$(".popup--login").removeClass("popup--exit").addClass("popup--current");

		} else if (btnClass  == "left-sidebar__sign-btn") {
			$(element).toggleClass("left-sidebar__sign-btn--active");
			$(".left-sidebar__login-btn").removeClass("left-sidebar__login-btn--active");

			if($(".popup--login").hasClass("popup--current") == true) {
				$(".popup--login").removeClass("popup--current").addClass("popup--exit");
			};

			$(".popup--registration").removeClass("popup--exit").addClass("popup--current");
		};

		for(var i = 0; i < leftSidebarItem.length; i++) {
			var className;

			if($(leftSidebarItem[i]).attr("class").indexOf(" ") == -1) {
				className = $(leftSidebarItem[i]).attr("class") + "--popup";
			} else {
				className = $(leftSidebarItem[i]).attr("class").slice(0, $(leftSidebarItem[i]).attr("class").indexOf(" ")) + "--popup";
			};

			if($(leftSidebarItem[i]).hasClass(className) == false) {
				$(leftSidebarItem[i]).addClass(className);
			};
		};

		return false;
	};

	// popup exit function
	function popupExit() {
		leftSidebar.parent().removeClass("left-sidebar--popup");
		popupOuter.removeClass("popup-outer--visible").addClass("popup-outer--exit");

		for(var i = 0; i < popupOuter.children().length; i++) {
			if($(popupOuter.children()[i]).hasClass("popup--current") == true) {
				$(popupOuter.children()[i]).removeClass("popup--current").addClass("popup--exit");
			}
		};

		for(var i = 0; i < loginBtns.length; i++) {
			var btnClass;

			if($(loginBtns[i]).attr("class").indexOf(" ") == -1) {
				btnClass = $(loginBtns[i]).attr("class") + "--active";
			} else {
				btnClass = $(loginBtns[i]).attr("class").slice(0, $(loginBtns[i]).attr("class").indexOf(" ")) + "--active";
			};
			$(loginBtns[i]).removeClass(btnClass);
		};

		for(var i = 0; i < leftSidebarItem.length; i++) {
			// var className = $(leftSidebarItem[i]).attr("class").slice(0, $(leftSidebarItem[i]).attr("class").indexOf(" ")) + "--popup";
			var className = $(leftSidebarItem[i]).attr("class").slice(0, $(leftSidebarItem[i]).attr("class").indexOf(" ")) + "--popup";
			$(leftSidebarItem[i]).removeClass(className);
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

	$(".popup--login").find(".popup__form-link").on("click", function(e) {
		e = e || event;
		e.preventDefault;

		$(".popup--login").removeClass("popup--current").addClass("popup--exit");
		$(".popup--reset-main").removeClass("popup--exit").addClass("popup--current");
	});

	// переход с формы регистрации на форму входа

	$(".popup--registration").find(".popup__form-link").on("click", function(e) {
		e = e || event;
		e.preventDefault;

		$(".popup--registration").removeClass("popup--current").addClass("popup--exit");
		$(".popup--login").removeClass("popup--exit").addClass("popup--current");
		$(".left-sidebar__login-btn").addClass("left-sidebar__login-btn--active");
		$(".left-sidebar__sign-btn").removeClass("left-sidebar__sign-btn--active");
	});

	// закрытие попапов
	$(".popup__close-btn").on("click", function(e) {
		e = e || event;
		e.preventDefault;
		popupExit();
	});

	$(this).keydown(function (e) {
		e = e || event;
		if(e.which == 27) {
			popupExit();
		}
	});
});
