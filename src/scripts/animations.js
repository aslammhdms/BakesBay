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
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  window.__lenis = lenis;

  animatePreloader(() => {
    animateHero();
    animateAbout();
    animateMenuScroll();
    animateGallery();
    animateCelebrations();
    animateVisit();
    animateContact();
  });
}

function animatePreloader(onComplete) {
  const preloader = document.getElementById('preloader');
  if (!preloader) {
    onComplete?.();
    return;
  }

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

  // Logo fade in
  const logoEl = document.getElementById('preloader-logo');
  if (logoEl) {
    tl.to(logoEl, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)' });
  }

  // Tagline types in
  tl.to('#preloader-tagline', { opacity: 1, duration: 0.5, ease: 'power1.in' }, '-=0.3');

  // Fruit illustrations pop in
  const fruits = preloader.querySelectorAll('.preloader-fruit');
  tl.to(fruits, {
    opacity: 1,
    scale: 1,
    duration: 0.5,
    stagger: 0.15,
    ease: 'back.out(2)',
  }, '-=0.2');

  // Counter
  const counter = { val: 0 };
  const counterEl = document.getElementById('preloader-counter');
  tl.to(counter, {
    val: 100,
    duration: 2,
    ease: 'power1.inOut',
    onUpdate: () => {
      if (counterEl) counterEl.textContent = Math.round(counter.val) + '%';
    },
  }, 0);

  // Curtain wipe in strawberry pink
  tl.to(preloader, {
    yPercent: -100,
    duration: 0.7,
    ease: 'power3.inOut',
    delay: 0.2,
  });

  tl.add(() => {
    preloader.remove();
  });
}

function animateHero() {
  // Headline reveal with bounce
  gsap.utils.toArray('.hero-headline > div').forEach((line, i) => {
    const text = line.querySelector('h1');
    if (text) {
      gsap.from(text, {
        yPercent: 120,
        duration: 0.9,
        ease: 'back.out(1.2)',
        delay: 0.2 + i * 0.12,
      });
    }
  });

  // Hero image
  const heroImg = document.querySelector('.hero-image');
  if (heroImg) {
    gsap.from(heroImg, { opacity: 0, scale: 0.9, rotation: 5, duration: 1, ease: 'back.out(1.4)', delay: 0.5 });
    gsap.to(heroImg, {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }
}

function animateAbout() {
  const section = document.getElementById('about');
  if (!section) return;

  // Polaroid photos slide in
  gsap.from(section.querySelectorAll('.bg-white'), {
    x: -40,
    rotation: -8,
    opacity: 0,
    duration: 0.9,
    stagger: 0.2,
    ease: 'back.out(1.2)',
    scrollTrigger: { trigger: section, start: 'top 70%' },
  });

  // Text stagger
  gsap.from(section.querySelectorAll('.max-w-xl > *'), {
    y: 30,
    opacity: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power2.out',
    scrollTrigger: { trigger: section, start: 'top 60%' },
  });
}

function animateMenuScroll() {
  const menuSection = document.getElementById('menu-scroll');
  const track = document.getElementById('menu-track');
  if (!menuSection || !track) return;

  if (window.innerWidth < 768) return;

  const panels = track.querySelectorAll('.menu-panel');
  const totalWidth = panels.length * window.innerWidth;

  gsap.set(track, { width: totalWidth });

  gsap.to(track, {
    x: -(totalWidth - window.innerWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: menuSection,
      start: 'top top',
      end: `+=${totalWidth}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        const dots = document.querySelectorAll('.menu-dot');
        const activeIndex = Math.round(self.progress * (panels.length - 1));
        dots.forEach((dot, i) => {
          dot.style.backgroundColor = i === activeIndex ? '#2F4A3F' : 'rgba(47,74,63,0.2)';
          dot.style.width = i === activeIndex ? '2rem' : '0.625rem';
        });
      },
    },
  });

  panels.forEach((panel) => {
    gsap.from(panel.querySelectorAll('.menu-item'), {
      x: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.06,
      ease: 'back.out(1)',
      scrollTrigger: {
        trigger: panel,
        start: 'left 80%',
        toggleActions: 'play none none none',
      },
    });
  });
}

function animateGallery() {
  const items = document.querySelectorAll('.gallery-item');
  if (!items.length) return;

  gsap.from(items, {
    scale: 0.8,
    opacity: 0,
    rotation: (i) => (i % 2 === 0 ? -5 : 5),
    duration: 0.7,
    stagger: 0.1,
    ease: 'back.out(1.2)',
    scrollTrigger: {
      trigger: '#gallery',
      start: 'top 70%',
    },
  });
}

function animateCelebrations() {
  const section = document.getElementById('celebrations');
  if (!section) return;

  gsap.from(section.querySelectorAll('span, h2, blockquote, p, a'), {
    y: 30,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: { trigger: section, start: 'top 60%' },
  });
}

function animateVisit() {
  const section = document.getElementById('visit');
  if (!section) return;

  const children = section.querySelectorAll('.flex > *');
  gsap.from(children, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: { trigger: section, start: 'top 70%' },
  });
}

function animateContact() {
  const section = document.getElementById('contact');
  if (!section) return;

  gsap.from(section.querySelectorAll('span, h2, p, div, a'), {
    y: 30,
    opacity: 0,
    duration: 0.7,
    stagger: 0.08,
    ease: 'power2.out',
    scrollTrigger: { trigger: section, start: 'top 70%' },
  });
}
