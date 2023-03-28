"use strict";

const burger = document.querySelector(".header__burger");
const menu = document.querySelector(".header__menu");
const menuLinks = document.querySelectorAll(".header__menu menu__link");

burger.addEventListener("click", function () {

    burger.classList.toggle("burger__active");
    menu.classList.toggle("menu__active");
    document.body.classList.toggle("lock");

});
menu.onclick = () => {

    burger.classList.remove("burger__active");
    menu.classList.remove("menu__active");
    document.body.classList.remove("lock");

};

const items = document.querySelectorAll(".button a, nav a, .buy__button-link");
for (let link of items) {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const href = link.href;
        let id = href.slice(href.indexOf("#"));

        let linkHref = document.querySelector(`${id}`);
        linkHref.scrollIntoView({ block: "center", behavior: "smooth" });
    });
};

const button = document.querySelectorAll(".button > .hover-circle");

button.forEach(item => {
    item.addEventListener("mousemove", function (e) {
        const x = e.offsetX - item.offsetLeft;
        const y = e.offsetY - item.offsetTop;

        item.style.setProperty('--x', x + 'px');
        item.style.setProperty('--y', y + 'px');
    });
})


const tabsBody = document.querySelectorAll(".tabs__body");
const tabsTitle = document.querySelectorAll(".tabs__menu .tabs__title");
const tabsMenu = document.querySelector(".tabs__menu");


tabsTitle.forEach((item, index) => {

    showSlider(tabsBody[index]);

    item.addEventListener("click", function (e) {
        for (let key of tabsBody) {
            if (key.classList.contains("active")) {
                key.classList.remove("active");
            }
        }

        tabsBody[index].classList.add("active");

        let galleryIMG = tabsBody[index].querySelectorAll(".gallery__img img");
        const portfolioSlideIMG = document.querySelectorAll(".portfolio__slide img")
        const slidesPicture = document.querySelectorAll(".portfolio__slide .swiper-slide__img-bg");


        galleryIMG.forEach((img, index) => {

            portfolioSlideIMG[index].remove()

            let cloneIMG = img.cloneNode(true);

            slidesPicture[index].append(cloneIMG);
        });


        let hoverText = item.getElementsByClassName("hover__text")[0];
        let tabsTextActive = document.getElementsByClassName("tabs__text")[0];

        tabsMenu.classList.toggle("tabs__menu_active");

        tabsTextActive.textContent = `${hoverText.textContent}`;


        const portfolioIMG = document.querySelectorAll(".portfolio__img-bg img");

        for (let IMG of portfolioIMG) {
            if (IMG.classList.contains("img-active")) {
                IMG.classList.remove("img-active");
            }
        }

        portfolioIMG[index].classList.add("img-active");
    });
});

const tabsFirstTitle = document.querySelector(".tabs__title");

tabsFirstTitle.onclick = () => tabsMenu.classList.toggle("tabs__menu_active");


function showSlider(index) {
    let tabsIMG = index.querySelectorAll(".tabs__body img");

    tabsIMG.forEach((IMG) => IMG.addEventListener("click", function () {
        const slider = document.querySelector(".portfolio__slider");

        slider.classList.add("_slider-active");

        if (slider.classList.contains("_slider-active")) {
            document.body.classList.add("lock");
        }

        const leaves = document.querySelector(".leave-swiper");

        leaves.onclick = (e) => {
            slider.classList.remove("_slider-active");
            document.body.classList.remove("lock");

            history.pushState("", document.title, window.location.pathname + window.location.search);
        };
    }))

}

function onEntry(entry) {
    entry.forEach(change => {

        if (change.isIntersecting) {
            change.target.classList.add('element-show');
        }

    });
}

let observer = new IntersectionObserver(onEntry, { threshold: [0.5] });
let elements = document.querySelectorAll('.element-animation');

for (let elm of elements) {
    observer.observe(elm);
}


const menuLinksWrapper = document.querySelectorAll("[data-line-effect]");

menuLinksWrapper.length ? menuEffect() : null;

function menuEffect() {

    menuLinksWrapper.forEach(menuLinksWrapper => {
        const menuLinks = menuLinksWrapper.querySelectorAll('button, a');

        //speed
        const effectSpeed = menuLinksWrapper.dataset.lineEffect ? menuLinksWrapper.dataset.lineEffect : 200;

        menuLinks.length ? menuEffectItem(menuLinks, effectSpeed) : null;
    });

    function menuEffectItem(menuLinks, effectSpeed) {

        const effectTransition = `transition: transform ${effectSpeed}ms ease;`;
        const effectHover = `transform: translate3d(0px, 0%, 0px);`;
        const effectTop = `transform: translate3d(0px, -102%, 0px);`;
        const effectBottom = `transform: translate3d(0px, 102%, 0px);`;
        menuLinks.forEach(menuLink => {
            menuLink.insertAdjacentHTML('beforeend',
                `<span style="transform: translate3d(0px, 102%, 0px);" class="hover">
                    <span style="transform: translate3d(0px, -102%, 0px);" class="hover__text">
                         ${menuLink.textContent}
                    </span>
                </span>`
            );
            menuLink.onmouseenter = menuLink.onmouseleave = menuLinkActions;
        });

        function menuLinkActions(e) {
            const menuLink = e.target;
            const menuLinkItem = menuLink.querySelector(".hover");
            const menuLinkText = menuLink.querySelector(".hover__text");

            const menuLinkHeight = menuLink.offsetHeight / 2;

            const menuLinkPos = e.pageY - (menuLink.getBoundingClientRect().top + scrollY);


            if (e.type === 'mouseenter') {

                menuLinkItem.style.cssText = menuLinkPos > menuLinkHeight ? effectBottom : effectTop;
                menuLinkText.style.cssText = menuLinkPos > menuLinkHeight ? effectTop : effectBottom;

                setTimeout(() => {
                    menuLinkItem.style.cssText = effectHover + effectTransition;
                    menuLinkText.style.cssText = effectHover + effectTransition;
                }, 5);
            }

            if (e.type === 'mouseleave') {
                menuLinkItem.style.cssText = menuLinkPos > menuLinkHeight ? effectBottom + effectTransition : effectTop + effectTransition;
                menuLinkText.style.cssText = menuLinkPos > menuLinkHeight ? effectTop + effectTransition : effectBottom + effectTransition;
            }
        }
    }
}

const swiper = new Swiper('.swiper', {
    // Optional parameters
    // direction: '',
    // loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    hashNavigation: {

        watchState: true,
    },

    keyboard: {

        enabled: true,

        onlyInViewport: true,

        pageUpDown: true,
    },

    mousewheel: {

        sensitivity: 1,
    },

    // And if we need scrollbar
    // scrollbar: {
    //     el: '.swiper-scrollbar',
    // },

});


document.addEventListener("DOMContentLoaded", function () {

    let formReq = document.querySelectorAll('[data-req]');
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

        if (error === 0) {

            let loader = document.querySelector(".loader")
            loader.classList.add('_sending');

            let response = await fetch('sendmail.php', {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = "";
                form.reset();
                loader.classList.remove('_sending');
            }
            else {
                alert("Error");
                loader.classList.remove('_sending');
            }
        }
    }

    function formValidate(form) {
        let error = 0;

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_tel')) {
                if (numberTest(input)) {
                    formAddError(input);
                    error++;
                }
            }
            if (input.value === '') {
                formAddError(input);
                error++;
            }

        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    function numberTest(input) {
        return !/^([+]?[0-9\s-\(\)]{3,25})*$/.test(input.value);
    }

});




