import $ from 'jquery';

class MobileMenu {
  constructor() {
      this.siteHeader = $(".site-header");
      this.menuIcon = $(".site-header__menu-icon");
      this.content = $(".site-header__content");
      this.name = $(".intro__name");
      this.profession = $(".intro__profession");
      this.events();
    }

    events() {
      this.menuIcon.click(this.toggleTheMenu.bind(this));
    }

    toggleTheMenu() {
      this.content.toggleClass("site-header__content--visible");
      this.siteHeader.toggleClass("site-header--expanded");
      this.name.toggleClass("intro__name--hidden-text");
      this.profession.toggleClass("intro__profession--hidden-text");
      this.menuIcon.toggleClass("site-header__menu-icon--close-x");
    }

  }

export default MobileMenu;
