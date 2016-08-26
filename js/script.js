var links = $(document).find("a");
var leftSidebar = $(".left-sidebar").children();
var leftSidebarItem = leftSidebar.children();
var userBlock = $(".left-sidebar__user-block");
var loginBtns = $(".left-sidebar__enter-btns").children();
var popupOuter = $(".popup-outer");
var btnClass;
$(document).ready(function() {



	// left sidebar popup mode function
	function popupMode(element) {
		// btnClass = $(element).attr("class").slice(0, ($(element).attr("class").indexOf(" ") + 1));
		btnClass = $(element).attr("class");

		if(leftSidebar.parent().hasClass("left-sidebar--popup") == false) {
			leftSidebar.parent().addClass("left-sidebar--popup");
		};

		$(element).addClass(btnClass + "--active");

		popupOuter.removeClass("popup-outer--exit").addClass("popup-outer--visible");

		if(btnClass  == "left-sidebar__login-btn") {
			$(".left-sidebar__sign-btn").removeClass("left-sidebar__sign-btn--active")
			$(".popup--registration").removeClass("popup--current").addClass("popup--exit");
			$(".popup--login").removeClass("popup--exit").addClass("popup--current");

			console.log("allGood");
		} else {
			$(".left-sidebar__login-btn").removeClass("left-sidebar__login-btn--active");
			$(".popup--login").removeClass("popup--current").addClass("popup--exit");
			$(".popup--registration").removeClass("popup--exit").addClass("popup--current");

			console.log("allGood");
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
	};


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

	$(".popup__close-btn").on("click", function(e) {
		e == e || event;
		e.preventDefault;

		leftSidebar.parent().removeClass("left-sidebar--popup");
		popupOuter.removeClass("popup-outer--visible").addClass("popup-outer--exit");

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
			console.log(className);
			$(leftSidebarItem[i]).removeClass(className);
		};
	});

});
