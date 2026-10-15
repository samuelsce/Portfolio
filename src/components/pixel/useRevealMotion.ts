import { useEffect, type RefObject } from 'react';

/** Each below-the-fold group enters once; scrolling never updates React state. */
export default function useRevealMotion(root: RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    const container = root.current;
    if (!container || !enabled || !('IntersectionObserver' in window)) return;
    function show(element: HTMLElement) {
      element.dataset.reveal = 'visible';
      observer.unobserve(element);
    }

    function focus(event: FocusEvent) {
      if (!(event.target instanceof Element)) return;
      const group = event.target.closest<HTMLElement>('[data-reveal="pending"]');
      if (group) show(group);
    }

    const elements = Array.from(container.querySelectorAll<HTMLElement>(
      '.section-heading, .featured-project, .project-row:not(.compact-row), .section-intro, .study-lab, .study-list article, .about-layout, .contact-layout',
    ));

    // Batch geometry reads before setting any animation attributes.
    const belowFold = elements.filter(element => element.getBoundingClientRect().top >= window.innerHeight - 24);
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) show(entry.target as HTMLElement);
      }
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
    for (const element of belowFold) {
      element.dataset.reveal = 'pending';
      observer.observe(element);
    }

    container.addEventListener('focusin', focus);
    return () => {
      observer.disconnect();
      container.removeEventListener('focusin', focus);
      for (const element of elements) delete element.dataset.reveal;
    };
  }, [root, enabled]);
}
