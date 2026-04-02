/**
* Template Name: MyPage
* Template URL: https://bootstrapmade.com/mypage-bootstrap-personal-template/
* Updated: Sep 20 2025 with Bootstrap v5.3.8
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

document.addEventListener('DOMContentLoaded', () => {

  // === Accordéon compétences : déplier/replier ===
  document.querySelectorAll('.competence-card-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.competence-card');
      card.classList.toggle('is-open');
    });
  });

  // === Bouton "Voir les projets associés" : scroll fluide + filtre Isotope ===
  document.querySelectorAll('.btn-voir-projets').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const filterClass = btn.getAttribute('data-filter');
      const projetsSection = document.getElementById('projets');
      if (!projetsSection) return;

      // Calcul offset pour tenir compte de la sidebar fixe
      const scrollMarginTop = parseInt(getComputedStyle(projetsSection).scrollMarginTop) || 0;
      const targetY = projetsSection.getBoundingClientRect().top + window.scrollY - scrollMarginTop;

      // Scroll fluide natif
      window.scrollTo({ top: targetY, behavior: 'smooth' });

      // Délai calé sur la durée réelle du scroll (~600ms) puis filtre + flash
      setTimeout(() => {
        // Appliquer le filtre Isotope si renseigné
        if (filterClass) {
          const targetFilterBtn = document.querySelector(
            `.isotope-filters li[data-filter="${filterClass}"]`
          );
          if (targetFilterBtn) targetFilterBtn.click();
        }

        // Petit flash visuel sur la section pour guider l'œil
        projetsSection.classList.add('section-highlight');
        setTimeout(() => projetsSection.classList.remove('section-highlight'), 800);
      }, 650);
    });
  });

});
document.addEventListener('DOMContentLoaded', () => {
  // === Modale réflexive AC (6 blocs) ===
  const overlay  = document.getElementById('ac-modal-overlay');
  const closeBtn = document.getElementById('ac-modal-close');

  function openAcModal(trigger) {
    document.getElementById('ac-modal-title').textContent    = trigger.dataset.title      || '';
    document.getElementById('ac-txt-fait').textContent       = trigger.dataset.fait       || '';
    document.getElementById('ac-txt-pourquoi').textContent   = trigger.dataset.pourquoi   || '';
    document.getElementById('ac-txt-comment').textContent    = trigger.dataset.comment    || '';
    document.getElementById('ac-txt-difficultes').textContent= trigger.dataset.difficultes|| '';
    document.getElementById('ac-txt-appris').textContent     = trigger.dataset.appris     || '';
    document.getElementById('ac-txt-autrement').textContent  = trigger.dataset.autrement  || '';
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeAcModal() {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Délégation d'événements sur tous les ac-trigger (présents et futurs)
  document.addEventListener('click', function(e) {
    const trigger = e.target.closest('.ac-trigger');
    if (trigger) {
      e.stopPropagation();
      openAcModal(trigger);
      return;
    }
    // Fermeture si clic sur le bouton close ou sur l'overlay
    if (e.target === overlay || e.target.closest('#ac-modal-close')) {
      closeAcModal();
    }
  });

  // Fermeture avec la touche Échap
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeAcModal();
  });
});