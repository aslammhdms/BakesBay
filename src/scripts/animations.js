import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Check reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initAnimations() {
  if (prefersReducedMotion) {
    // Skip all animations, show content immediately
    document.getElementById('preloader')?.remove();
    return;
  }

  // Initialize Lenis smooth scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  // Connect Lenis to GSAP ticker
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Store lenis on window for nav overlay access
  window.__lenis = lenis;

  // Run animation sequences
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

  // Check if already shown this session
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

  // Circle stroke animation
  const circleEl = preloader.querySelector('.preloader-circle');
  if (circleEl) {
    const length = circleEl.getTotalLength?.() || 346;
    gsap.set(circleEl, { strokeDasharray: length, strokeDashoffset: length });
    tl.to(circleEl, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' });
  }

  // Logo fade in
  const logoEl = document.getElementById('preloader-logo');
  if (logoEl) {
    tl.to(logoEl, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }, '-=1.2');
  }

  // Tagline fade in
  tl.to('#preloader-tagline', { opacity: 1, duration: 0.6, ease: 'power1.in' }, '-=0.4');

  // Counter animation
  const counter = { val: 0 };
  const counterEl = document.getElementById('preloader-counter');
  tl.to(counter, {
    val: 100,
    duration: 2.5,
    ease: 'power1.inOut',
    onUpdate: () => {
      if (counterEl) counterEl.textContent = Math.round(counter.val) + '%';
    },
  }, 0);

  // Curtain wipe out
  tl.to(preloader, {
    yPercent: -100,
    duration: 0.8,
    ease: 'power3.inOut',
    delay: 0.3,
  });

  tl.add(() => {
    preloader.remove();
  });
}

function animateHero() {
  // Headline reveal
  gsap.utils.toArray('.hero-headline > div').forEach((line, i) => {
    const text = line.querySelector('h1');
    const num = line.querySelector('span');
    if (text) {
      gsap.from(text, {
        yPercent: 120,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2 + i * 0.15,
      });
    }
    if (num) {
      gsap.from(num, {
        opacity: 0,
        x: -20,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.4 + i * 0.15,
      });
    }
  });

  // Hero image parallax
  const heroImg = document.querySelector('.hero-image');
  if (heroImg) {
    gsap.from(heroImg, { opacity: 0, scale: 1.05, duration: 1.2, ease: 'power2.out', delay: 0.5 });
    gsap.to(heroImg, {
      yPercent: 15,
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

  // Image slide in
  gsap.from(section.querySelector('img')?.parentElement, {
    x: -60,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: { trigger: section, start: 'top 70%' },
  });

  // Text elements stagger
  gsap.from(section.querySelectorAll('.max-w-xl > *'), {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: { trigger: section, start: 'top 60%' },
  });
}

function animateMenuScroll() {
  const menuSection = document.getElementById('menu-scroll');
  const track = document.getElementById('menu-track');
  if (!menuSection || !track) return;

  // Only horizontal scroll on desktop
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
        // Update dots
        const dots = document.querySelectorAll('.menu-dot');
        const activeIndex = Math.round(self.progress * (panels.length - 1));
        dots.forEach((dot, i) => {
          dot.style.backgroundColor = i === activeIndex ? '#F5F1E8' : 'rgba(245,241,232,0.2)';
          dot.style.width = i === activeIndex ? '2rem' : '0.5rem';
        });
      },
    },
  });

  // Staggered item reveals per panel
  panels.forEach((panel) => {
    gsap.from(panel.querySelectorAll('.menu-item'), {
      x: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: panel,
        start: 'left 80%',
        containerAnimation: gsap.getById?.('menuScroll'),
        toggleActions: 'play none none none',
      },
    });
  });
}

function animateGallery() {
  const items = document.querySelectorAll('.gallery-item');
  if (!items.length) return;

  gsap.from(items, {
    scale: 0.85,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power2.out',
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
    duration: 0.8,
    stagger: 0.12,
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

  gsap.from(section.querySelectorAll('span, h2, div, a'), {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: { trigger: section, start: 'top 70%' },
  });
}
