/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

class ScrollManager {
  constructor(viewIndex) {
    this.viewIndex = viewIndex;
    this.lastKnownScrollPosition = { x: 0, y: 0 };
    this.ticking = false;
    this.isSyncing = false;

    this.handleScroll = this.debounce(() => {
      if (this.isSyncing) return;
      const scrollPos = {
        x: window.scrollX,
        y: window.scrollY / document.documentElement.scrollHeight,
      };
      this.onScroll(scrollPos);
    }, 200);

    window.addEventListener('scroll', this.handleScroll);

    window.electronAPI.receive('syncScroll', (sourceIndex, scrollPos) => {
      if (sourceIndex !== this.viewIndex) {
        this.isSyncing = true;

        window.removeEventListener('scroll', this.handleScroll);
        window.scrollTo(
          scrollPos.x,
          scrollPos.y * document.documentElement.scrollHeight,
        );
        setTimeout(() => {
          window.addEventListener('scroll', this.handleScroll);
          this.isSyncing = false;
        }, 100);
      }
    });
  }

  onScroll() {
    const scrollPos = {
      x:
        window.scrollX /
          (document.documentElement.scrollWidth - window.innerWidth) || 0,
      y:
        window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight) || 0,
    };
    this.lastKnownScrollPosition = scrollPos;
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.updateScroll(this.lastKnownScrollPosition);
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  updateScroll(scrollPos) {
    window.electronAPI.syncScroll(this.viewIndex, scrollPos);
  }

  debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
}
