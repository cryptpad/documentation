document.addEventListener('DOMContentLoaded', function () {
    var config = JSON.parse(document.getElementById('lucide-theme-config').textContent);
    var admonitionIcons = config.admonitions || {};

    var tag = function (name) {
        return '<i data-lucide="' + name + '" aria-hidden="true"></i>';
    };

    var hasLucide = function (el) {
        return el.querySelector('svg.lucide, [data-lucide]');
    };

    var createIcons = function () {
        if (window.lucide) {
            lucide.createIcons({ attrs: { width: '1em', height: '1em' } });
        }
    };

    function applyAdmonitionIcons() {
        document.querySelectorAll('.rst-content .admonition > .admonition-title').forEach(function (title) {
            if (hasLucide(title)) return;
            var admon = title.closest('.admonition');
            var name = admonitionIcons.note || 'info';
            if (admon) {
                for (var i = 0; i < admon.classList.length; i++) {
                    if (admonitionIcons[admon.classList[i]]) {
                        name = admonitionIcons[admon.classList[i]];
                        break;
                    }
                }
            }
            title.insertAdjacentHTML('afterbegin', tag(name) + ' ');
        });
    }

    function applyPermalinkIcons() {
        if (!config.permalinks) return;
        var icon = config.permalinks.icon || 'link';
        document.querySelectorAll('.rst-content a.headerlink').forEach(function (link) {
            if (hasLucide(link)) return;
            link.classList.add('lucide-permalink');
            link.innerHTML = tag(icon);
        });
    }

    function applySidebarIcons() {
        if (!config.toctree) return false;
        var icon = config.toctree.icon || 'chevron-right';
        var added = false;
        document.querySelectorAll('.wy-menu-vertical span.toctree-expand').forEach(function (span) {
            if (hasLucide(span)) return;
            span.classList.add('lucide-toctree-expand');
            span.innerHTML = tag(icon);
            added = true;
        });
        return added;
    }

    function watchSidebarIcons() {
        if (!config.toctree) return;
        var menu = document.querySelector('.wy-nav-side') || document.body;
        var observer = new MutationObserver(function () {
            if (applySidebarIcons(menu)) {
                createIcons();
                observer.disconnect();
            }
        });
        observer.observe(menu, { childList: true, subtree: true });
    }

    applyAdmonitionIcons();
    applyPermalinkIcons();
    applySidebarIcons();
    createIcons();

    watchSidebarIcons();
});
