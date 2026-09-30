(() => {
  'use strict';
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 1100px)' }, context => {
    if (!context.conditions.motion) return;
    const desktop = context.conditions.desktop;
    const $ = selector => document.querySelector(selector);
    const $$ = selector => [...document.querySelectorAll(selector)];
    const entrance = { duration: 0.8, ease: 'power3.out' };

    // Keep the main heading painted; movement enhances an already readable page.
    gsap.from('.hero-line', { y: 28, stagger: 0.1, ...entrance, clearProps: 'transform' });
    gsap.from('.hero-name, .hero-copy > .eyebrow, .hero-bottom', { y: 16, opacity: 0, stagger: 0.12, ...entrance, clearProps: 'transform,opacity' });
    gsap.from('.hero-stage .panel', { y: 32, opacity: 0, delay: 0.15, ...entrance, clearProps: 'transform,opacity' });

    function drawChart() {
      const line = $('#chart-line');
      const length = line.getTotalLength();
      gsap.fromTo(line, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.out', overwrite: true, clearProps: 'strokeDasharray,strokeDashoffset' });
    }
    drawChart();
    context.add('onMonthChange', drawChart);
    context.add('onExampleChange', () => {
      gsap.fromTo('.content-hook', { y: 10, opacity: 0.5 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out', overwrite: true, clearProps: 'transform,opacity' });
      ScrollTrigger.refresh();
    });
    context.add('onServiceChange', event => {
      const panel = $(`#service-${event.detail.index}`);
      gsap.fromTo(panel, { y: 12, opacity: 0.6 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out', overwrite: true, clearProps: 'transform,opacity' });
      ScrollTrigger.refresh();
    });
    document.addEventListener('ratio:month-change', context.onMonthChange);
    document.addEventListener('ratio:example-change', context.onExampleChange);
    document.addEventListener('ratio:service-change', context.onServiceChange);

    $$('.section h2, .problem-list article, .method-steps li, .example-content h3').forEach(element => {
      gsap.from(element, { y: desktop ? 32 : 18, opacity: 0, ...entrance, scrollTrigger: { trigger: element, start: 'top 92%', once: true }, clearProps: 'transform,opacity' });
    });
    gsap.from('.journey-icon', { scale: 0.7, rotation: -12, stagger: 0.1, duration: 0.7, ease: 'back.out(1.4)', scrollTrigger: { trigger: '.journey-map', start: 'top 90%', once: true }, clearProps: 'transform' });
    $$('.social-flow li').forEach(element => {
      gsap.to(element, { '--flow-progress': 1, ease: 'none', scrollTrigger: { trigger: element, start: 'top 85%', end: 'bottom 65%', scrub: 0.35 } });
    });
    if (desktop) {
      $$('.example-photo img, .local-photo > img').forEach(element => {
        gsap.fromTo(element, { scale: 1.065 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: element.parentElement, start: 'top bottom', end: 'bottom 30%', scrub: 0.6 } });
      });
      gsap.to('.hero-stage', { y: -22, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.7 } });
    }
    gsap.to('.reading-progress', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '#main', start: 'top top', end: 'bottom bottom', scrub: 0.2 } });
    const refresh = () => ScrollTrigger.refresh();
    const onFocus = event => {
      const section = event.target.closest('.section, .hero');
      if (!section) return;
      // Keyboard navigation must never arrive at a still-hidden animated section.
      ScrollTrigger.getAll().forEach(trigger => {
        if (!trigger.vars.scrub && section.contains(trigger.trigger)) trigger.animation?.progress(1);
      });
    };
    window.addEventListener('load', refresh, { once: true });
    document.addEventListener('toggle', refresh, true);
    document.addEventListener('focusin', onFocus);
    document.fonts?.ready.then(refresh);
    return () => {
      document.removeEventListener('ratio:month-change', context.onMonthChange);
      document.removeEventListener('ratio:example-change', context.onExampleChange);
      document.removeEventListener('ratio:service-change', context.onServiceChange);
      window.removeEventListener('load', refresh);
      document.removeEventListener('toggle', refresh, true);
      document.removeEventListener('focusin', onFocus);
    };
  });
})();
