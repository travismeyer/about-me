/* ============================================================
   macOS-style desktop behavior:
   - live menu-bar clock
   - functional (non-navigating) menu-bar dropdowns per active app
   - draggable windows with working traffic-light buttons
   - genie-style minimize to dock, click-to-restore
   - real fullscreen toggle
   - dock hover magnification (responsive to base icon size)
   - Finder / Downloads / Trash all open one multi-location Finder window
   - About page presented inside a Safari-style window
   ============================================================ */
(function () {
  'use strict';

  /* ---------------- Clock ---------------- */
  var clockEl = document.getElementById('clock');
  function updateClock() {
    var now = new Date();
    var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var h = now.getHours();
    var ampm = h >= 12 ? 'PM' : 'AM';
    var h12 = h % 12; if (h12 === 0) h12 = 12;
    var m = String(now.getMinutes()).padStart(2, '0');
    var label = days[now.getDay()] + ' ' + months[now.getMonth()] + ' ' + now.getDate() + '  ' + h12 + ':' + m + ' ' + ampm;
    if (clockEl) clockEl.textContent = label;
  }
  updateClock();
  setInterval(updateClock, 1000 * 15);

  /* ---------------- Active app + menu bar ---------------- */
  var currentApp = 'Safari';
  var appNameEl = document.getElementById('menu-app-name');
  var goLabelEl = document.getElementById('menu-go-label');

  function setActiveApp(appName) {
    if (!appName || appName === currentApp) return;
    currentApp = appName;
    if (appNameEl) appNameEl.textContent = appName;
    if (goLabelEl) goLabelEl.textContent = appName === 'Finder' ? 'Go' : 'History';
  }

  function getMenuItems(key, app) {
    var isFinder = app === 'Finder';
    switch (key) {
      case 'apple':
        return [
          { label: 'About This Mac' },
          { divider: true },
          { label: 'System Settings…' },
          { label: 'App Store…' },
          { divider: true },
          { label: 'Recent Items' },
          { divider: true },
          { label: 'Force Quit…', shortcut: '⌥⌘⎋' },
          { divider: true },
          { label: 'Sleep' },
          { label: 'Restart…' },
          { label: 'Shut Down…' },
          { divider: true },
          { label: 'Lock Screen', shortcut: '⌃⌘Q' },
          { label: 'Log Out Travis Meyer…', shortcut: '⇧⌘Q' }
        ];
      case 'app':
        return [
          { label: 'About ' + app },
          { divider: true },
          { label: 'Settings…', shortcut: '⌘,' },
          { divider: true },
          { label: 'Services' },
          { divider: true },
          { label: 'Hide ' + app, shortcut: '⌘H' },
          { label: 'Hide Others', shortcut: '⌥⌘H' },
          { label: 'Show All' },
          { divider: true },
          { label: 'Quit ' + app, shortcut: '⌘Q' }
        ];
      case 'file':
        return isFinder ? [
          { label: 'New Finder Window', shortcut: '⌘N' },
          { label: 'New Folder', shortcut: '⇧⌘N' },
          { label: 'New Tab', shortcut: '⌘T' },
          { divider: true },
          { label: 'Open', shortcut: '⌘O' },
          { divider: true },
          { label: 'Close Window', shortcut: '⌘W' },
          { label: 'Get Info', shortcut: '⌘I' },
          { divider: true },
          { label: 'Move to Trash', shortcut: '⌘⌫' }
        ] : [
          { label: 'New Window', shortcut: '⌘N' },
          { label: 'New Tab', shortcut: '⌘T' },
          { label: 'Open Location…', shortcut: '⌘L' },
          { divider: true },
          { label: 'Close Tab', shortcut: '⌘W' },
          { label: 'Close Window', shortcut: '⇧⌘W' },
          { divider: true },
          { label: 'Save As…', shortcut: '⌘S' },
          { label: 'Print…', shortcut: '⌘P' }
        ];
      case 'edit':
        return [
          { label: 'Undo', shortcut: '⌘Z' },
          { label: 'Redo', shortcut: '⇧⌘Z' },
          { divider: true },
          { label: 'Cut', shortcut: '⌘X' },
          { label: 'Copy', shortcut: '⌘C' },
          { label: 'Paste', shortcut: '⌘V' },
          { label: 'Select All', shortcut: '⌘A' },
          { divider: true },
          { label: 'Find', shortcut: '⌘F' }
        ];
      case 'view':
        return isFinder ? [
          { label: 'as Icons', shortcut: '⌘1' },
          { label: 'as List', shortcut: '⌘2' },
          { label: 'as Columns', shortcut: '⌘3' },
          { label: 'as Gallery', shortcut: '⌘4' },
          { divider: true },
          { label: 'Show Path Bar' },
          { label: 'Show Status Bar', shortcut: '⌘/' },
          { divider: true },
          { label: 'Enter Full Screen', shortcut: '⌃⌘F' }
        ] : [
          { label: 'Show Tab Bar', shortcut: '⇧⌘T' },
          { label: 'Show Favorites Bar', shortcut: '⇧⌘B' },
          { divider: true },
          { label: 'Zoom In', shortcut: '⌘+' },
          { label: 'Zoom Out', shortcut: '⌘-' },
          { label: 'Actual Size', shortcut: '⌘0' },
          { divider: true },
          { label: 'Enter Full Screen', shortcut: '⌃⌘F' }
        ];
      case 'go':
        return isFinder ? [
          { label: 'Back', shortcut: '⌘[' },
          { label: 'Forward', shortcut: '⌘]' },
          { label: 'Enclosing Folder', shortcut: '⌘↑' },
          { divider: true },
          { label: 'Recents', shortcut: '⇧⌘F' },
          { label: 'Documents', shortcut: '⇧⌘O' },
          { label: 'Downloads', shortcut: '⌥⌘L' },
          { label: 'Home', shortcut: '⇧⌘H' },
          { divider: true },
          { label: 'Applications', shortcut: '⇧⌘A' }
        ] : [
          { label: 'Back', shortcut: '⌘[' },
          { label: 'Forward', shortcut: '⌘]' },
          { divider: true },
          { label: 'Home' },
          { label: 'Show All History', shortcut: '⌘Y' },
          { divider: true },
          { label: 'Clear History…' }
        ];
      case 'window':
        return [
          { label: 'Minimize', shortcut: '⌘M' },
          { label: 'Zoom' },
          { divider: true },
          { label: 'Bring All to Front' },
          { divider: true },
          { label: isFinder ? 'Finder' : 'Travis Meyer — About' }
        ];
      case 'help':
        return [
          { label: app + ' Help', shortcut: '⌘?' }
        ];
      default:
        return [];
    }
  }

  function renderDropdown(container, items) {
    container.innerHTML = items.map(function (it) {
      if (it.divider) return '<div class="menu-sep"></div>';
      var shortcut = it.shortcut ? '<span class="menu-shortcut">' + it.shortcut + '</span>' : '';
      return '<div class="menu-row"><span>' + it.label + '</span>' + shortcut + '</div>';
    }).join('');
  }

  var menuWraps = Array.prototype.slice.call(document.querySelectorAll('.menubar-menu'));

  function closeAllMenus() {
    menuWraps.forEach(function (w) {
      w.classList.remove('open');
      var t = w.querySelector('.menubar-trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  }

  menuWraps.forEach(function (wrap) {
    var trigger = wrap.querySelector('.menubar-trigger');
    var dropdown = wrap.querySelector('.menubar-dropdown');
    var key = wrap.getAttribute('data-menu');
    if (!trigger || !dropdown) return;

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var wasOpen = wrap.classList.contains('open');
      closeAllMenus();
      if (!wasOpen) {
        renderDropdown(dropdown, getMenuItems(key, currentApp));
        wrap.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', closeAllMenus);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAllMenus();
  });

  /* ---------------- Window manager ---------------- */
  function WindowController(winEl, dockIconEl, appName, onReopen) {
    this.win = winEl;
    this.dockIcon = dockIconEl;
    this.appName = appName;
    this.onReopen = onReopen;
    this.isFullscreen = false;
    this.isMinimized = false;
    this.wasClosed = false;
    this.bindTrafficLights();
    this.bindDrag();
    this.bindResize();
    if (this.dockIcon) {
      this.dockIcon.addEventListener('click', this.restore.bind(this));
    }
  }

  WindowController.prototype.bindTrafficLights = function () {
    var self = this;
    var closeBtn = this.win.querySelector('.tl.red');
    var minBtn = this.win.querySelector('.tl.yellow');
    var fullBtn = this.win.querySelector('.tl.green');

    if (closeBtn) closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      self.close();
    });
    if (minBtn) minBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      self.minimize();
    });
    if (fullBtn) fullBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      self.toggleFullscreen();
    });
  };

  WindowController.prototype.close = function () {
    this.win.classList.add('closing');
    if (this.dockIcon) this.dockIcon.classList.remove('running');
    // reset to the default centered position/size so reopening looks fresh,
    // exactly like relaunching an app that was moved or resized beforehand
    this.win.style.left = '';
    this.win.style.top = '';
    this.win.style.width = '';
    this.win.style.height = '';
    this.win.style.transform = '';
    this.baseTransform = undefined;
    this.isFullscreen = false;
    this.win.classList.remove('fullscreen');
    this.wasClosed = true;
  };

  WindowController.prototype.minimize = function () {
    var self = this;
    if (!this.dockIcon) { this.close(); return; }
    var winRect = this.win.getBoundingClientRect();
    var dockRect = this.dockIcon.getBoundingClientRect();
    var dx = (dockRect.left + dockRect.width / 2) - (winRect.left + winRect.width / 2);
    var dy = (dockRect.top + dockRect.height / 2) - (winRect.top + winRect.height / 2);
    var scale = Math.max(0.04, dockRect.width / winRect.width);

    this.win.classList.add('minimizing');
    this.win.style.transformOrigin = 'center center';
    void this.win.offsetWidth; // force reflow so the transition applies
    this.win.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + scale + ')';
    this.win.style.opacity = '0.15';
    this.isMinimized = true;

    setTimeout(function () {
      self.win.style.visibility = 'hidden';
    }, 380);
  };

  WindowController.prototype.restore = function () {
    var reopening = this.win.classList.contains('closing') || this.wasClosed;
    this.win.classList.remove('hidden');
    if (this.win.classList.contains('closing')) {
      this.win.classList.remove('closing');
    }
    if (this.isMinimized) {
      this.win.style.visibility = 'visible';
      this.win.style.transform = this.isFullscreen ? 'none' : (this.baseTransform || '');
      this.win.style.opacity = '1';
      this.isMinimized = false;
      setTimeout(function (w) { return function () { w.classList.remove('minimizing'); }; }(this.win), 400);
    }
    if (this.dockIcon) this.dockIcon.classList.add('running');
    this.bringToFront();
    if (reopening && typeof this.onReopen === 'function') {
      this.onReopen();
    }
    this.wasClosed = false;
  };

  WindowController.prototype.toggleFullscreen = function () {
    this.isFullscreen = !this.isFullscreen;
    this.win.classList.toggle('fullscreen', this.isFullscreen);
    if (this.isFullscreen) {
      this.win.style.transform = 'none';
    } else {
      this.win.style.transform = this.baseTransform || '';
    }
  };

  var zTop = 100;
  WindowController.prototype.bringToFront = function () {
    zTop += 1;
    this.win.style.zIndex = zTop;
    setActiveApp(this.appName);
  };

  WindowController.prototype.bindDrag = function () {
    var self = this;
    var titlebar = this.win.querySelector('.titlebar');
    if (!titlebar) return;
    var dragging = false;
    var startX, startY, startLeft, startTop;

    titlebar.addEventListener('mousedown', function (e) {
      if (e.target.closest('.tl, .safari-nav-btn, .safari-address-bar, .safari-icon-btn')) return;
      if (self.isFullscreen) return;
      dragging = true;
      titlebar.classList.add('dragging');
      var rect = self.win.getBoundingClientRect();
      startX = e.clientX; startY = e.clientY;
      startLeft = rect.left; startTop = rect.top;
      self.win.style.left = startLeft + 'px';
      self.win.style.top = startTop + 'px';
      self.win.style.transform = 'none';
      self.baseTransform = 'none';
      self.bringToFront();
      e.preventDefault();
    });

    window.addEventListener('mousemove', function (e) {
      if (!dragging) return;
      var dx = e.clientX - startX;
      var dy = e.clientY - startY;
      var menubarH = 26;
      var newTop = Math.max(menubarH, startTop + dy);
      self.win.style.left = (startLeft + dx) + 'px';
      self.win.style.top = newTop + 'px';
    });

    window.addEventListener('mouseup', function () {
      if (dragging) {
        dragging = false;
        titlebar.classList.remove('dragging');
      }
    });

    // click anywhere on window raises it and marks its app active
    this.win.addEventListener('mousedown', function () { self.bringToFront(); });
  };

  WindowController.prototype.bindResize = function () {
    var self = this;
    var MIN_W = 360, MIN_H = 240;
    var MENUBAR_H = 26;
    var handles = Array.prototype.slice.call(this.win.querySelectorAll('.resize-handle'));

    handles.forEach(function (handle) {
      var m = handle.className.match(/rh-([a-z]+)/);
      var dir = m ? m[1] : '';

      handle.addEventListener('mousedown', function (e) {
        if (self.isFullscreen) return;
        e.preventDefault();
        e.stopPropagation();

        var rect = self.win.getBoundingClientRect();
        var startX = e.clientX, startY = e.clientY;
        var startLeft = rect.left, startTop = rect.top;
        var startW = rect.width, startH = rect.height;

        self.win.style.left = startLeft + 'px';
        self.win.style.top = startTop + 'px';
        self.win.style.width = startW + 'px';
        self.win.style.height = startH + 'px';
        self.win.style.transform = 'none';
        self.baseTransform = 'none';
        self.bringToFront();

        function onMove(ev) {
          var dx = ev.clientX - startX;
          var dy = ev.clientY - startY;
          var newLeft = startLeft, newTop = startTop;
          var newW = startW, newH = startH;

          if (dir.indexOf('e') !== -1) newW = Math.max(MIN_W, startW + dx);
          if (dir.indexOf('s') !== -1) newH = Math.max(MIN_H, startH + dy);
          if (dir.indexOf('w') !== -1) {
            newW = Math.max(MIN_W, startW - dx);
            newLeft = startLeft + (startW - newW);
          }
          if (dir.indexOf('n') !== -1) {
            newH = Math.max(MIN_H, startH - dy);
            newTop = Math.max(MENUBAR_H, startTop + (startH - newH));
          }

          self.win.style.left = newLeft + 'px';
          self.win.style.top = newTop + 'px';
          self.win.style.width = newW + 'px';
          self.win.style.height = newH + 'px';
        }

        function onUp() {
          window.removeEventListener('mousemove', onMove);
          window.removeEventListener('mouseup', onUp);
        }

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
      });
    });
  };

  /* ---------------- Reveal animation (reusable for load + reload + tab switch) ---------------- */
  function playReveal(scopeEl, baseDelay) {
    if (!scopeEl) return;
    var els = Array.prototype.slice.call(scopeEl.querySelectorAll('.reveal'));
    els.forEach(function (el, i) {
      el.style.transition = 'none';
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
      void el.offsetWidth; // force reflow
      setTimeout(function () {
        el.style.transition = 'opacity .5s ease, transform .5s cubic-bezier(.2,.8,.3,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, baseDelay + i * 55);
    });
  }

  /* ---------------- Instantiate windows ---------------- */
  var appWindow = document.getElementById('app-window');
  var finderWindow = document.getElementById('finder-window');
  var finderIcon = document.getElementById('dock-finder');
  var safariIcon = document.getElementById('dock-safari');
  var downloadsIcon = document.getElementById('dock-downloads');
  var trashIcon = document.getElementById('dock-trash');
  var progressBar = document.getElementById('safari-progress');
  var reloadBtn = document.getElementById('safari-reload-btn');

  function playPageLoad() {
    if (progressBar) {
      progressBar.style.transition = 'none';
      progressBar.style.opacity = '1';
      progressBar.style.width = '0%';
      void progressBar.offsetWidth; // force reflow
      progressBar.style.transition = 'width .6s cubic-bezier(.3,.7,.2,1)';
      progressBar.style.width = '100%';
      setTimeout(function () {
        progressBar.style.transition = 'opacity .35s ease';
        progressBar.style.opacity = '0';
      }, 600);
    }
    var activePage = appWindow ? appWindow.querySelector('.safari-page.active') : null;
    playReveal(activePage, 140);
  }

  var appCtrl = appWindow ? new WindowController(appWindow, safariIcon, 'Safari', playPageLoad) : null;
  var finderCtrl = finderWindow ? new WindowController(finderWindow, finderIcon, 'Finder') : null;

  if (appCtrl) {
    appCtrl.bringToFront();
    if (safariIcon) safariIcon.classList.add('running');
  }

  if (reloadBtn) {
    reloadBtn.addEventListener('click', function () {
      reloadBtn.classList.remove('spinning');
      void reloadBtn.offsetWidth; // force reflow so the spin can replay
      reloadBtn.classList.add('spinning');
      playPageLoad();
    });
  }

  /* ---------------- Safari tabs (About page / New Tab) ---------------- */
  var safariTabsEl = document.getElementById('safari-tabs');
  var addressTextEl = appWindow ? appWindow.querySelector('.address-text') : null;
  var newTabBtns = appWindow ? Array.prototype.slice.call(appWindow.querySelectorAll('#safari-newtab-btn, #safari-tab-add')) : [];
  var newTabCounter = 0;

  var tabs = [
    { id: 'about', title: 'Travis Meyer — About', page: 'about', favicon: '🌐', closable: false, url: 'travismeyer.github.io/about-me' }
  ];
  var activeTabId = 'about';

  function renderTabs() {
    if (!safariTabsEl) return;
    safariTabsEl.innerHTML = tabs.map(function (t) {
      var closeBtn = t.closable
        ? '<button class="safari-tab-close" data-close-tab="' + t.id + '" aria-label="Close Tab">' +
          '<svg viewBox="0 0 8 8" fill="none"><path d="M1.3 1.3l5.4 5.4M6.7 1.3L1.3 6.7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></button>'
        : '';
      return '<div class="safari-tab' + (t.id === activeTabId ? ' active' : '') + '" data-tab-id="' + t.id + '">' +
        '<span class="safari-tab-favicon" aria-hidden="true">' + t.favicon + '</span>' +
        '<span class="safari-tab-title">' + t.title + '</span>' + closeBtn +
        '</div>';
    }).join('');

    Array.prototype.slice.call(safariTabsEl.querySelectorAll('.safari-tab')).forEach(function (tabEl) {
      tabEl.addEventListener('click', function (e) {
        if (e.target.closest('[data-close-tab]')) return;
        activateTab(tabEl.getAttribute('data-tab-id'));
      });
    });
    Array.prototype.slice.call(safariTabsEl.querySelectorAll('[data-close-tab]')).forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeTab(btn.getAttribute('data-close-tab'));
      });
    });
  }

  function activateTab(id) {
    var tab = tabs.filter(function (t) { return t.id === id; })[0];
    if (!tab) return;
    activeTabId = id;
    renderTabs();
    if (appWindow) {
      Array.prototype.slice.call(appWindow.querySelectorAll('.safari-page')).forEach(function (pageEl) {
        pageEl.classList.toggle('active', pageEl.getAttribute('data-page') === tab.page);
      });
    }
    if (addressTextEl) addressTextEl.textContent = tab.url || '';
    playPageLoad();
  }

  function closeTab(id) {
    var idx = tabs.map(function (t) { return t.id; }).indexOf(id);
    if (idx === -1) return;
    var wasActive = activeTabId === id;
    tabs.splice(idx, 1);
    if (wasActive) {
      var next = tabs[idx - 1] || tabs[0];
      activateTab(next.id);
    } else {
      renderTabs();
    }
  }

  function openNewTab() {
    newTabCounter += 1;
    var id = 'newtab-' + newTabCounter;
    tabs.push({ id: id, title: 'New Tab', page: 'newtab', favicon: '✦', closable: true, url: '' });
    activateTab(id);
  }

  newTabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () { openNewTab(); });
  });

  var newTabFav = appWindow ? appWindow.querySelector('.newtab-fav[data-goto="about"]') : null;
  if (newTabFav) {
    newTabFav.addEventListener('click', function () { activateTab('about'); });
  }

  renderTabs();

  /* ---------------- Finder multi-location content ---------------- */
  var FINDER_META = {
    recents:      { panel: 'recents',   title: 'Recents',      count: '5 items' },
    downloads:    { panel: 'downloads', title: 'Downloads',    count: '4 items' },
    trash:        { panel: 'trash',     title: 'Trash',        count: '0 items' },
    airdrop:      { panel: 'generic',   title: 'AirDrop',      count: '0 items' },
    applications: { panel: 'generic',   title: 'Applications', count: '0 items' },
    desktop:      { panel: 'generic',   title: 'Desktop',      count: '0 items' },
    documents:    { panel: 'generic',   title: 'Documents',    count: '0 items' }
  };

  var finderPathEl = document.getElementById('finder-path');
  var finderTitleEl = document.getElementById('finder-window-title');
  var finderStatusEl = document.getElementById('finder-statusline');
  var finderRows = finderWindow ? Array.prototype.slice.call(finderWindow.querySelectorAll('.finder-row')) : [];
  var finderPanels = finderWindow ? Array.prototype.slice.call(finderWindow.querySelectorAll('.finder-panel')) : [];

  function setFinderLocation(loc) {
    var meta = FINDER_META[loc] || FINDER_META.recents;
    finderRows.forEach(function (row) {
      row.classList.toggle('active', row.getAttribute('data-location') === loc);
    });
    finderPanels.forEach(function (panel) {
      panel.classList.toggle('active', panel.getAttribute('data-panel') === meta.panel);
    });
    if (finderPathEl) finderPathEl.textContent = meta.title;
    if (finderTitleEl) finderTitleEl.textContent = meta.title;
    if (finderStatusEl) finderStatusEl.textContent = meta.count;
  }

  function openFinderAt(loc) {
    if (!finderCtrl) return;
    finderCtrl.restore();
    setFinderLocation(loc);
  }

  finderRows.forEach(function (row) {
    row.addEventListener('click', function () {
      setFinderLocation(row.getAttribute('data-location'));
    });
  });

  if (finderIcon) finderIcon.addEventListener('click', function () { openFinderAt('recents'); });
  if (downloadsIcon) downloadsIcon.addEventListener('click', function () { openFinderAt('downloads'); });
  if (trashIcon) trashIcon.addEventListener('click', function () { openFinderAt('trash'); });

  setFinderLocation('recents');

  /* generic dock "bounce" feedback for purely decorative icons */
  document.querySelectorAll('.dock-item[data-decorative]').forEach(function (el) {
    el.addEventListener('click', function () {
      el.animate(
        [
          { transform: 'translateY(0)' },
          { transform: 'translateY(-16px)' },
          { transform: 'translateY(0)' }
        ],
        { duration: 380, easing: 'cubic-bezier(.3,1.6,.5,1)' }
      );
    });
  });

  /* ---------------- Dock magnification ---------------- */
  var dock = document.getElementById('dock');
  if (dock) {
    var items = Array.prototype.slice.call(dock.querySelectorAll('.dock-item'));
    var MAX_SCALE = 1.7;
    var RANGE = 110; // px influence radius
    var baseSize = items.length ? items[0].getBoundingClientRect().width : 48;

    function applyMagnify(mouseX) {
      items.forEach(function (item) {
        var rect = item.getBoundingClientRect();
        var center = rect.left + rect.width / 2;
        var dist = Math.abs(mouseX - center);
        var scale = 1;
        if (dist < RANGE) {
          scale = 1 + (MAX_SCALE - 1) * (1 - dist / RANGE);
        }
        var size = baseSize * scale;
        item.style.width = size + 'px';
        item.style.height = size + 'px';
      });
    }

    function resetMagnify() {
      items.forEach(function (item) {
        item.style.width = '';
        item.style.height = '';
      });
    }

    dock.addEventListener('mousemove', function (e) {
      applyMagnify(e.clientX);
    });
    dock.addEventListener('mouseleave', resetMagnify);
    window.addEventListener('resize', function () {
      resetMagnify();
      baseSize = items.length ? items[0].getBoundingClientRect().width : 48;
    }, { passive: true });
  }

  /* ---------------- Animated network background (About page) ---------------- */
  function initAboutNetBackground() {
    var canvas = document.getElementById('about-net-bg');
    if (!canvas || !canvas.parentElement) return;
    var ctx = canvas.getContext('2d');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var width, height, nodes, pulses;
    var mouse = { x: -9999, y: -9999 };
    var LINK_DIST = 130, MOUSE_RADIUS = 150;
    var NODE_COLOR = '68, 214, 232';
    var LINE_COLOR = '47, 111, 237';

    function nodeCount() {
      var area = width * height;
      return Math.max(16, Math.min(46, Math.round(area / 34000)));
    }

    function seed() {
      var count = nodeCount();
      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.16 * DPR,
          vy: (Math.random() - 0.5) * 0.16 * DPR,
          r: (Math.random() * 1.1 + 0.8) * DPR
        });
      }
      pulses = [];
    }

    function resize() {
      var rect = canvas.parentElement.getBoundingClientRect();
      var w = Math.max(1, Math.round(rect.width));
      var h = Math.max(1, Math.round(rect.height));
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      width = canvas.width = w * DPR;
      height = canvas.height = h * DPR;
      seed();
    }

    function maybeSpawnPulse() {
      if (Math.random() > 0.99 && nodes.length > 4) {
        var a = nodes[Math.floor(Math.random() * nodes.length)];
        var best = null, bestDist = Infinity;
        for (var i = 0; i < nodes.length; i++) {
          var b = nodes[i];
          if (b === a) continue;
          var dx = b.x - a.x, dy = b.y - a.y;
          var d = dx * dx + dy * dy;
          var maxD = (LINK_DIST * DPR) * (LINK_DIST * DPR);
          if (d < maxD && d < bestDist) { bestDist = d; best = b; }
        }
        if (best) pulses.push({ a: a, b: best, t: 0 });
      }
    }

    function step() {
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        var dx = n.x - mouse.x, dy = n.y - mouse.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var mr = MOUSE_RADIUS * DPR;
        if (dist < mr) {
          var f = (1 - dist / mr) * 0.025;
          n.x += dx * f;
          n.y += dy * f;
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      var linkDist = LINK_DIST * DPR;

      for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          var a = nodes[i], b = nodes[j];
          var dx = a.x - b.x, dy = a.y - b.y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < linkDist) {
            var alpha = (1 - d / linkDist) * 0.18;
            ctx.strokeStyle = 'rgba(' + LINE_COLOR + ',' + alpha + ')';
            ctx.lineWidth = 1 * DPR;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (var k = 0; k < nodes.length; k++) {
        var n = nodes[k];
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + NODE_COLOR + ',0.5)';
        ctx.fill();
      }

      for (var p = pulses.length - 1; p >= 0; p--) {
        var pu = pulses[p];
        pu.t += 0.02;
        if (pu.t >= 1) { pulses.splice(p, 1); continue; }
        var px = pu.a.x + (pu.b.x - pu.a.x) * pu.t;
        var py = pu.a.y + (pu.b.y - pu.a.y) * pu.t;
        var glowAlpha = Math.sin(pu.t * Math.PI);
        ctx.beginPath();
        ctx.arc(px, py, 2.2 * DPR, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + NODE_COLOR + ',' + (0.75 * glowAlpha) + ')';
        ctx.shadowBlur = 7 * DPR;
        ctx.shadowColor = 'rgba(' + NODE_COLOR + ',0.9)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function loop() {
      if (canvas.offsetParent !== null) {
        step();
        maybeSpawnPulse();
        draw();
      }
      requestAnimationFrame(loop);
    }

    canvas.parentElement.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * DPR;
      mouse.y = (e.clientY - rect.top) * DPR;
    }, { passive: true });
    canvas.parentElement.addEventListener('mouseleave', function () {
      mouse.x = -9999; mouse.y = -9999;
    });

    if (window.ResizeObserver) {
      var ro = new ResizeObserver(function () { resize(); });
      ro.observe(canvas.parentElement);
    } else {
      window.addEventListener('resize', resize, { passive: true });
    }

    resize();
    if (reduceMotion) {
      draw();
    } else {
      loop();
    }
  }
  initAboutNetBackground();

  /* ---------------- Initial page load ---------------- */
  if (appWindow) {
    playPageLoad();
  } else {
    playReveal(document, 80);
  }
})();
