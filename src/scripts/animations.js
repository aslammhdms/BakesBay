import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initAnimations() {
  if (prefersReducedMotion) {
    document.getElementById('preloader')?.remove();
    return;
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  window.__lenis = lenis;

  animatePreloader(() => {
    animateHero();
    initHeroCarousel();
    animateAbout();
    animateCraft();
    animateMenu();
    animateGallery();
    animateCelebrations();
    animateTimeline();
    animateVisit();
    animateContact();
  });
}

function animatePreloader(onComplete) {
  const preloader = document.getElementById('preloader');
  if (!preloader) { onComplete?.(); return; }

  if (sessionStorage.getItem('preloaderShown')) {
    preloader.remove();
    onComplete?.();
    return;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      sessionStorage.setItem('preloaderShown', 'true');
      onComplete?.();
    },
  });

  tl.to('#preloader-logo', { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' });
  tl.to('#preloader-tagline', { opacity: 1, duration: 0.6, ease: 'power1.in' }, '-=0.3');

  const counter = { val: 0 };
  const counterEl = document.getElementById('preloader-counter');
  tl.to(counter, {
    val: 100, duration: 2, ease: 'power1.inOut',
    onUpdate: () => { if (counterEl) counterEl.textContent = Math.round(counter.val) + '%'; },
  }, 0);

  // Caramel curtain wipe
  tl.to(preloader, { yPercent: -100, duration: 0.8, ease: 'power3.inOut', delay: 0.3 });
  tl.add(() => preloader.remove());
}

function animateHero() {
  const kicker = document.querySelector('.hero-kicker');
  if (kicker) {
    gsap.from(kicker, { opacity: 0, y: 10, duration: 0.7, ease: 'power2.out', delay: 0.1 });
  }

  gsap.utils.toArray('.hero-headline > div').forEach((line, i) => {
    const text = line.querySelector('h1');
    if (text) {
      gsap.from(text, { yPercent: 120, duration: 1, ease: 'power3.out', delay: 0.3 + i * 0.15 });
    }
  });

  const heroImg = document.querySelector('.hero-image');
  if (heroImg) {
    gsap.from(heroImg, { opacity: 0, scale: 1.05, duration: 1.2, ease: 'power2.out', delay: 0.5 });
    gsap.to(heroImg, {
      yPercent: 12, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 },
    });
  }
}

function animateAbout() {
  const section = document.getElementById('about');
  if (!section) return;

  gsap.from(section.querySelectorAll('.bg-white'), {
    x: -40, rotation: -5, opacity: 0, duration: 1, stagger: 0.2, ease: 'power2.out',
    scrollTrigger: { trigger: section, start: 'top 70%' },
  });

  gsap.from(section.querySelectorAll('.max-w-xl > *'), {
    y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out',
    scrollTrigger: { trigger: section, start: 'top 60%' },
  });
}

function animateMenu() {
  const section = document.getElementById('menu');
  if (!section) return;

  gsap.from(section.querySelectorAll('.menu-tile'), {
    y: 30, opacity: 0, duration: 0.7, stagger: 0.06, ease: 'power2.out',
    scrollTrigger: { trigger: section, start: 'top 75%' },
  });

  section.querySelectorAll('.menu-theme').forEach((theme) => {
    const header = theme.querySelector('h3, .text-label');
    const body = theme.querySelectorAll('.menu-group, .menu-theme > div > div > div');

    gsap.from(theme.querySelectorAll('.menu-theme > div > div > *'), {
      y: 30, opacity: 0, duration: 0.7, stagger: 0.05, ease: 'power2.out',
      scrollTrigger: { trigger: theme, start: 'top 80%' },
    });

    gsap.from(theme.querySelectorAll('.menu-item'), {
      x: 10, opacity: 0, duration: 0.4, stagger: 0.03, ease: 'power2.out',
      scrollTrigger: { trigger: theme, start: 'top 70%' },
    });
  });
}

function animateGallery() {
  const items = document.querySelectorAll('.gallery-item');
  if (!items.length) return;

  gsap.from(items, {
    scale: 0.9, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out',
    scrollTrigger: { trigger: '#gallery', start: 'top 70%' },
  });
}

function animateCelebrations() {
  const section = document.getElementById('celebrations');
  if (!section) return;

  gsap.from(section.querySelectorAll('span, h2, blockquote, p, a'), {
    y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out',
    scrollTrigger: { trigger: section, start: 'top 60%' },
  });
}

function animateVisit() {
  const section = document.getElementById('visit');
  if (!section) return;

  gsap.from(section.querySelectorAll('.flex > *'), {
    y: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out',
    scrollTrigger: { trigger: section, start: 'top 70%' },
  });
}

function animateContact() {
  const section = document.getElementById('contact');
  if (!section) return;

  gsap.from(section.querySelectorAll('span, h2, div, a'), {
    y: 30, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power2.out',
    scrollTrigger: { trigger: section, start: 'top 70%' },
  });
}

function initHeroCarousel() {
  const carousel = document.getElementById('hero-carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.hero-slide');
  const dots = carousel.querySelectorAll('.hero-dot');
  const captionEl = document.getElementById('hero-caption');
  const captionsNode = document.getElementById('hero-captions');
  let captions = [];
  try { captions = JSON.parse(captionsNode?.textContent || '[]'); } catch (e) {}

  if (slides.length < 2) return;

  let current = 0;
  const advance = () => {
    const next = (current + 1) % slides.length;
    slides[current].classList.remove('is-active');
    slides[next].classList.add('is-active');
    dots.forEach((d, i) => {
      d.classList.toggle('w-6', i === next);
      d.classList.toggle('bg-cream', i === next);
      d.classList.toggle('bg-cream/40', i !== next);
    });
    if (captionEl && captions[next]) {
      captionEl.style.opacity = '0';
      setTimeout(() => {
        captionEl.textContent = captions[next];
        captionEl.style.opacity = '1';
      }, 300);
    }
    current = next;
  };

  const interval = setInterval(advance, 6000);

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const target = Number(dot.dataset.index);
      if (target === current) return;
      slides[current].classList.remove('is-active');
      slides[target].classList.add('is-active');
      dots.forEach((d, i) => {
        d.classList.toggle('w-6', i === target);
        d.classList.toggle('bg-cream', i === target);
        d.classList.toggle('bg-cream/40', i !== target);
      });
      if (captionEl && captions[target]) {
        captionEl.textContent = captions[target];
      }
      current = target;
    });
  });

  window.addEventListener('beforeunload', () => clearInterval(interval));
}

function animateCraft() {
  const section = document.getElementById('craft');
  if (!section) return;

  const header = section.querySelector('.mb-16, .mb-24') || section.firstElementChild;
  if (header) {
    gsap.from(header.children, {
      y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 75%' },
    });
  }

  gsap.from(section.querySelectorAll('.craft-card'), {
    y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
    scrollTrigger: { trigger: section, start: 'top 65%' },
  });
}

function animateTimeline() {
  const section = document.getElementById('timeline');
  if (!section) return;

  gsap.from(section.querySelectorAll('.text-label, h2, h2 + p'), {
    y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out',
    scrollTrigger: { trigger: section, start: 'top 75%' },
  });

  gsap.from(section.querySelectorAll('.timeline-node'), {
    y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
    scrollTrigger: { trigger: section, start: 'top 65%' },
  });

  const rail = section.querySelector('.timeline-rail');
  if (rail) {
    gsap.from(rail, {
      scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 70%' },
    });
  }
}
