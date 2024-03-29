/*
 * @license
 * Palo Alto Theme (c)
 *
 * The contents of this file should not be modified.
 * add any minor changes to assets/custom.js
 *
 */
!(function (t, e, i, s, o) {
    "use strict";
    function n(t, e) {
        let i;
        return function () {
            if (t) {
                const s = () => t.apply(this, arguments);
                clearTimeout(i), (i = setTimeout(s, e));
            }
        };
    }
    (window.theme = window.theme || {}),
        (window.theme.sizes = { mobile: 480, small: 768, large: 1024, widescreen: 1440 }),
        (window.theme.keyboardKeys = { TAB: "Tab", ENTER: "Enter", NUMPADENTER: "NumpadEnter", ESCAPE: "Escape", SPACE: "Space", LEFTARROW: "ArrowLeft", RIGHTARROW: "ArrowRight" }),
        (window.theme.focusable = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const r = "body",
        a = "[data-main]",
        l = "[data-site-header]",
        c = "[data-prevent-transparent-header]",
        h = "supports-transparent-header",
        d = "site-header--transparent",
        u = "is-first-section-transparent",
        p = "data-transparent",
        m = () => {
            const t = document.querySelector(r),
                e = t.querySelector(l);
            if (!e) return;
            const i = "true" === e.getAttribute(p),
                s = t.querySelector(a).children[0];
            if (!s) return;
            const o = s.querySelector(`${c}:first-of-type`);
            window.isHeaderTransparent = i && s.classList.contains(h) && !o;
            CSS.supports("(selector(:has(*)))") || (t.classList.toggle(u, window.isHeaderTransparent), e.classList.toggle(d, window.isHeaderTransparent));
        };
    let g = L();
    const v = {
            body: "body",
            main: "[data-main]",
            collectionFilters: "[data-collection-filters]",
            footer: '[data-section-type*="footer"]',
            header: "[data-header-height]",
            stickyHeader: '[data-site-header][data-position="fixed"]',
            announcementBar: "[data-announcement-bar]",
            collectionStickyBar: "[data-collection-sticky-bar]",
            logoTextLink: "[data-logo-text-link]",
        },
        y = { templateCollection: "template-collection", templateSearch: "template-search", supportsTransparentHeader: "supports-transparent-header" };
    function f() {
        document.addEventListener("theme:resize", w), b(), document.dispatchEvent(new CustomEvent("theme:vars"), { bubbles: !1 });
    }
    function b() {
        E();
    }
    function w() {
        E(!0);
    }
    function E(t = !1) {
        const e = document.querySelector(v.body),
            i = document.querySelector(v.collectionFilters),
            s = null !== document.querySelector(v.logoTextLink);
        let { windowHeight: o, headerHeight: n, headerInitialHeight: r, announcementBarHeight: a, footerHeight: l, collectionStickyBarHeight: c } = (function () {
            var t, e;
            const i = {};
            return (
                (i.windowHeight = Math.min(window.screen.height, window.innerHeight)),
                (i.footerHeight = S(v.footer)),
                (i.headerHeight = S(v.header)),
                (i.headerInitialHeight =
                    parseInt((null === (t = document.querySelector(v.header)) || void 0 === t ? void 0 : t.dataset.height) || (null === (e = document.querySelector(v.header)) || void 0 === e ? void 0 : e.offsetHeight)) || 0),
                (i.announcementBarHeight = S(v.announcementBar)),
                (i.collectionStickyBarHeight = S(v.collectionStickyBar)),
                i
            );
        })();
        s &&
            (n = (function () {
                document.documentElement.style.setProperty("--header-height", "auto"), document.documentElement.style.setProperty("--header-sticky-height", "auto");
                const t = document.querySelector(v.header).offsetHeight;
                return (
                    requestAnimationFrame(() => {
                        document.documentElement.style.setProperty("--header-height", `${t}px`), document.documentElement.style.setProperty("--header-sticky-height", `${t}px`);
                    }),
                    t
                );
            })());
        const h = window.isHeaderTransparent && document.querySelector(v.main).firstElementChild.classList.contains(y.supportsTransparentHeader) ? o - a : o - r - a;
        let d = document.querySelector(v.stickyHeader) ? o - window.stickyHeaderHeight : o;
        const u = e.classList.contains(y.templateCollection),
            p = e.classList.contains(y.templateSearch),
            m = (u && i) || (p && i);
        if (
            (document.documentElement.style.setProperty("--footer-height", `${l}px`),
            document.documentElement.style.setProperty("--content-full", `${h}px`),
            document.documentElement.style.setProperty("--content-min", o - n - l + "px"),
            document.documentElement.style.setProperty("--collection-sticky-bar-height", `${c}px`),
            m && (d = o),
            !t)
        )
            return void document.documentElement.style.setProperty("--full-height", `${d}px`);
        const f = L();
        f !== g && (document.documentElement.style.setProperty("--full-height", `${d}px`), (g = f));
    }
    function S(t) {
        const e = document.querySelector(t);
        return e ? e.clientHeight : 0;
    }
    function L() {
        return window.matchMedia("(orientation: portrait)").matches ? "portrait" : window.matchMedia("(orientation: landscape)").matches ? "landscape" : void 0;
    }
    const k = {
        overflowBackground: "[data-overflow-background]",
        overflowFrame: "[data-overflow-frame]",
        overflowContent: "[data-overflow-content]",
        overflowContainer: "[data-overflow-container]",
        overflowWrapper: "[data-overflow-wrapper]",
    };
    function A(t, e) {
        let i = 0;
        e.forEach((t) => {
            i = t.offsetHeight > i ? t.offsetHeight : i;
        });
        const s = t.querySelectorAll(k.overflowBackground);
        [t, ...s].forEach((t) => {
            t.style.setProperty("min-height", `calc(${i}px + var(--header-height))`);
        });
    }
    function q(t) {
        if (window.innerWidth < window.theme.sizes.small) {
            return void t.querySelectorAll(k.overflowFrame).forEach((t) => {
                const e = t.querySelectorAll(k.overflowContent);
                A(t, e);
            });
        }
        let e = 0;
        const i = t.querySelectorAll(k.overflowFrame);
        t.querySelectorAll(k.overflowContent).forEach((t) => {
            t.offsetHeight > e && (e = t.offsetHeight);
        });
        [...i, ...t.querySelectorAll(k.overflowBackground)].forEach((t) => {
            t.style.setProperty("min-height", `${e}px`);
        }),
            t.style.setProperty("min-height", `${e}px`);
    }
    function C(t) {
        const e = t.querySelectorAll(k.overflowContainer);
        e &&
            e.forEach((t) => {
                const e = t.querySelectorAll(k.overflowContent);
                A(t, e),
                    document.addEventListener("theme:resize", () => {
                        A(t, e);
                    });
            });
        const i = t.querySelectorAll(k.overflowWrapper);
        i &&
            i.forEach((t) => {
                q(t),
                    document.addEventListener("theme:resize", () => {
                        q(t);
                    });
            });
    }
    function T() {
        document.dispatchEvent(new CustomEvent("theme:resize", { bubbles: !0 })),
            window.lastWindowWidth !== window.innerWidth && (document.dispatchEvent(new CustomEvent("theme:resize:width", { bubbles: !0 })), (window.lastWindowWidth = window.innerWidth));
    }
    window.lastWindowWidth = window.innerWidth;
    let P = window.pageYOffset,
        F = null,
        I = null,
        D = null,
        x = null,
        H = 0;
    const M = { quickViewVisible: "js-quick-view-visible", cartDrawerOpen: "js-drawer-open-cart" };
    function _(e) {
        setTimeout(() => {
            H && clearTimeout(H), t.disablePageScroll(e.detail, { allowTouchMove: (t) => "TEXTAREA" === t.tagName }), document.documentElement.setAttribute("data-scroll-locked", "");
        });
    }
    function O(t) {
        const e = t.detail;
        e ? (H = setTimeout(B, e)) : B();
    }
    function B() {
        document.body.classList.contains(M.quickViewVisible) || document.body.classList.contains(M.cartDrawerOpen) || (t.clearQueueScrollLocks(), t.enablePageScroll(), document.documentElement.removeAttribute("data-scroll-locked"));
    }
    const z = (t, e = "", i) => {
        const s = i || document.createElement("div");
        return s.classList.add(e), s.setAttribute("data-scroll-lock-scrollable", ""), t.parentNode.insertBefore(s, t), s.appendChild(t);
    };
    function W(t) {
        t.querySelectorAll("table").forEach((t) => {
            z(t, "table-wrapper");
        });
    }
    const $ = {
            inputSearch: 'input[type="search"]',
            form: "form",
            allVisibleElements: '[role="option"]',
            ariaSelected: '[aria-selected="true"]',
            selectedOption: '[aria-selected="true"] a, button[aria-selected="true"]',
            popularSearches: "[data-popular-searches]",
            popdownBody: "[data-popdown-body]",
            predictiveSearchResults: "[data-predictive-search-results]",
            predictiveSearch: "predictive-search",
            searchForm: "search-form",
        },
        V = "is-searched";
    let R = class extends HTMLElement {
        getQuery() {
            return this.input.value.trim();
        }
        onFocus() {
            this.currentSearchTerm = this.getQuery();
        }
        onChange() {
            this.classList.toggle(V, !this.isFormCleared()), (this.searchTerm = this.getQuery());
        }
        isFormCleared() {
            return 0 === this.input.value.length;
        }
        submit() {
            this.form.submit();
        }
        reset() {
            this.input.val = "";
        }
        onFormSubmit(t) {
            (this.getQuery().length && !this.querySelector($.selectedLink)) || t.preventDefault();
        }
        onKeydown(t) {
            ("ArrowUp" !== t.code && "ArrowDown" !== t.code) || t.preventDefault();
        }
        onKeyup(t) {
            switch ((!this.getQuery().length && this.predictiveSearch && this.close(!0), t.preventDefault(), t.code)) {
                case "ArrowUp":
                    this.switchOption("up");
                    break;
                case "ArrowDown":
                    this.switchOption("down");
                    break;
                case "Enter":
                    this.selectOption();
            }
        }
        switchOption(t) {
            const e = "up" === t,
                i = this.classList.contains(V) && this.predictiveSearchResults ? this.predictiveSearchResults : this.popularSearches;
            if (!i) return;
            this.selectedElement = i.querySelector($.ariaSelected);
            const s = Array.from(i.querySelectorAll($.allVisibleElements)).filter((t) => null !== t.offsetParent);
            let o = 0;
            if (e && !this.selectedElement) return;
            let n = -1,
                r = 0;
            for (; -1 === n && r <= s.length; ) s[r] === this.selectedElement && (n = r), r++;
            !e && this.selectedElement ? (o = n === s.length - 1 ? 0 : n + 1) : e && (o = 0 === n ? s.length - 1 : n - 1), o !== n && ((this.activeElement = s[o]), this.handleFocusableDescendants());
        }
        selectOption() {
            const t = this.querySelector($.selectedOption);
            t && t.click();
        }
        handleFocusableDescendants(t = !1) {
            const e = this.selectedElement ? this.selectedElement : this.querySelector($.ariaSelected);
            var i;
            if ((e && e.setAttribute("aria-selected", !1), !this.activeElement || t))
                return (
                    (this.selectedElement = null),
                    null === (i = this.activeElement) || void 0 === i || i.setAttribute("aria-selected", !1),
                    this.input.setAttribute("aria-expanded", !1),
                    void this.input.setAttribute("aria-activedescendant", "")
                );
            this.activeElement.setAttribute("aria-selected", !0), this.input.setAttribute("aria-activedescendant", this.activeElement.id);
        }
        constructor() {
            var t;
            super(),
                (this.input = this.querySelector($.inputSearch)),
                (this.form = this.querySelector($.form)),
                (this.popdownBody = this.closest($.popdownBody)),
                (this.popularSearches = null === (t = this.popdownBody) || void 0 === t ? void 0 : t.querySelector($.popularSearches)),
                (this.predictiveSearchResults = this.querySelector($.predictiveSearchResults)),
                (this.predictiveSearch = this.matches($.predictiveSearch)),
                (this.searchForm = this.matches($.searchForm)),
                (this.selectedElement = null),
                (this.activeElement = null),
                (this.searchTerm = ""),
                (this.currentSearchTerm = ""),
                this.input.addEventListener(
                    "input",
                    n((t) => {
                        this.onChange(t);
                    }, 300).bind(this)
                ),
                this.input.addEventListener("focus", this.onFocus.bind(this)),
                this.input.form.addEventListener("submit", this.onFormSubmit.bind(this)),
                this.addEventListener("keyup", this.onKeyup.bind(this)),
                this.addEventListener("keydown", this.onKeydown.bind(this));
        }
    };
    customElements.define("search-form", R);
    const N = "predictive-search",
        U = "#shopify-section-api-predictive-search",
        j = "[data-predictive-search-results]",
        K = "[data-predictive-search-status]",
        Q = "[data-predictive-search-live-region-count-value]",
        G = "reset";
    customElements.define(
        "predictive-search",
        class extends R {
            connectedCallback() {
                this.predictiveSearchResults.addEventListener("transitionend", (t) => {
                    t.target !== this.predictiveSearchResults || this.getQuery().length || (this.classList.remove(G), requestAnimationFrame(() => this.clearResultsHTML()));
                });
            }
            onChange() {
                super.onChange(), this.classList.remove(G), this.searchTerm.length ? requestAnimationFrame(() => this.getSearchResults(this.searchTerm)) : this.classList.add(G);
            }
            onFocus() {
                super.onFocus(), this.currentSearchTerm.length && (this.searchTerm !== this.currentSearchTerm ? this.onChange() : "true" === this.getAttribute("results") ? this.open() : this.getSearchResults(this.searchTerm));
            }
            getSearchResults(t) {
                const e = t.replace(" ", "-").toLowerCase(),
                    i = parseInt(window.theme.settings.suggestionsResultsLimit);
                let s = "query";
                (s += window.theme.settings.suggestArticles ? ",article" : ""),
                    (s += window.theme.settings.suggestCollections ? ",collection" : ""),
                    (s += window.theme.settings.suggestProducts ? ",product" : ""),
                    (s += window.theme.settings.suggestPages ? ",page" : ""),
                    this.setLiveRegionLoadingState(),
                    this.cachedResults[e]
                        ? this.renderSearchResults(this.cachedResults[e])
                        : fetch(`${theme.routes.predictiveSearchUrl}?q=${encodeURIComponent(t)}&resources[type]=${s}&resources[limit]=${i}&section_id=api-predictive-search`, { signal: this.abortController.signal })
                              .then((t) => {
                                  if (!t.ok) {
                                      var e = new Error(t.status);
                                      throw (this.close(), e);
                                  }
                                  return t.text();
                              })
                              .then((t) => {
                                  const i = new DOMParser().parseFromString(t, "text/html").querySelector(U).innerHTML;
                                  this.allPredictiveSearchInstances.forEach((t) => {
                                      t.cachedResults[e] = i;
                                  }),
                                      this.renderSearchResults(i);
                              })
                              .catch((t) => {
                                  if (20 !== (null == t ? void 0 : t.code)) throw (this.close(), t);
                              });
            }
            switchOption(t) {
                super.switchOption(t), this.statusElement && (this.statusElement.textContent = "");
            }
            setLiveRegionLoadingState() {
                (this.statusElement = this.statusElement || this.querySelector(K)), (this.loadingText = this.loadingText || this.getAttribute("data-loading-text")), this.setLiveRegionText(this.loadingText), this.setAttribute("loading", !0);
            }
            setLiveRegionText(t) {
                this.statusElement.setAttribute("aria-hidden", "false"),
                    (this.statusElement.textContent = t),
                    setTimeout(() => {
                        this.statusElement.setAttribute("aria-hidden", "true");
                    }, 1e3);
            }
            renderSearchResults(t) {
                (this.predictiveSearchResults.innerHTML = t), this.setAttribute("results", !0), this.setLiveRegionResults(), this.open();
            }
            setLiveRegionResults() {
                this.removeAttribute("loading"), this.setLiveRegionText(this.querySelector(Q).textContent);
            }
            open() {
                this.setAttribute("open", !0);
            }
            close(t = !1) {
                this.closeResults(t);
            }
            closeResults(t = !1) {
                t && (this.reset(), this.removeAttribute("results"), this.classList.remove(G)), this.removeAttribute("loading"), this.removeAttribute("open");
            }
            clearResultsHTML() {
                this.predictiveSearchResults.innerHTML = "";
            }
            constructor() {
                super(), (this.abortController = new AbortController()), (this.allPredictiveSearchInstances = document.querySelectorAll(N)), (this.predictiveSearchResults = this.querySelector(j)), (this.cachedResults = {});
            }
        }
    ),
        window.addEventListener("resize", n(T, 50)),
        (function () {
            let t;
            window.addEventListener(
                "scroll",
                function () {
                    t && window.cancelAnimationFrame(t),
                        (t = window.requestAnimationFrame(function () {
                            !(function () {
                                const t = window.pageYOffset;
                                t > P ? ((I = !0), (F = !1)) : t < P ? ((I = !1), (F = !0)) : ((F = null), (I = null)),
                                    (P = t),
                                    document.dispatchEvent(new CustomEvent("theme:scroll", { detail: { up: F, down: I, position: t }, bubbles: !1 })),
                                    F && !D && document.dispatchEvent(new CustomEvent("theme:scroll:up", { detail: { position: t }, bubbles: !1 })),
                                    I && !x && document.dispatchEvent(new CustomEvent("theme:scroll:down", { detail: { position: t }, bubbles: !1 })),
                                    (x = I),
                                    (D = F);
                            })();
                        }));
                },
                { passive: !0 }
            ),
                window.addEventListener("theme:scroll:lock", _),
                window.addEventListener("theme:scroll:unlock", O);
        })(),
        "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
            ? ((document.documentElement.className = document.documentElement.className.replace("no-touch", "supports-touch")), (window.theme.touch = !0))
            : (window.theme.touch = !1);
    const X = n(() => {
        m();
    }, 300);
    window.addEventListener("load", () => {
        f(), C(document), W(document), document.documentElement.classList.remove("is-loading"), document.documentElement.classList.add("is-loaded");
    }),
        document.addEventListener("shopify:section:load", (t) => {
            const e = t.target;
            window.dispatchEvent(new Event("resize"), { bubbles: !0 }), C(e), W(e), f(), X();
        }),
        document.addEventListener("shopify:section:reorder", () => {
            X();
        }),
        document.addEventListener("shopify:section:unload", () => {
            X();
        }),
        (function () {
            function t(t) {
                var e = window.innerWidth || document.documentElement.clientWidth,
                    i = window.innerHeight || document.documentElement.clientHeight,
                    s = t.getBoundingClientRect();
                return s.top >= 0 && s.bottom <= i && s.left >= 0 && s.right <= e;
            }
            function e(t) {
                var e = window.innerWidth || document.documentElement.clientWidth,
                    i = window.innerHeight || document.documentElement.clientHeight,
                    s = t.getBoundingClientRect(),
                    o = (s.left >= 0 && s.left <= e) || (s.right >= 0 && s.right <= e),
                    n = (s.top >= 0 && s.top <= i) || (s.bottom >= 0 && s.bottom <= i);
                return o && n;
            }
            window.visibilityHelper = {
                isElementTotallyVisible: t,
                isElementPartiallyVisible: e,
                inViewportPartially: function (t, i) {
                    function s() {
                        var s = e(t);
                        s != o && ((o = s), "function" == typeof i && i(s, t));
                    }
                    var o = e(t);
                    window.addEventListener("load", s), window.addEventListener("resize", s), window.addEventListener("scroll", s);
                },
                inViewportTotally: function (e, i) {
                    function s() {
                        var s = t(e);
                        s != o && ((o = s), "function" == typeof i && i(s, e));
                    }
                    var o = t(e);
                    window.addEventListener("load", s), window.addEventListener("resize", s), window.addEventListener("scroll", s);
                },
            };
        })(),
        (window.Shopify = window.Shopify || {}),
        (window.Shopify.theme = window.Shopify.theme || {}),
        (window.Shopify.theme.sections = window.Shopify.theme.sections || {}),
        (window.Shopify.theme.sections.registered = window.Shopify.theme.sections.registered || {}),
        (window.Shopify.theme.sections.instances = window.Shopify.theme.sections.instances || []);
    const J = window.Shopify.theme.sections.registered,
        Y = window.Shopify.theme.sections.instances,
        Z = { id: "data-section-id", type: "data-section-type" };
    let tt = class {
            getStack() {
                return this.callStack;
            }
            constructor(t = null, e = []) {
                (this.type = t),
                    (this.components = (function (t) {
                        if ((void 0 !== t && "object" != typeof t) || null === t) throw new TypeError("Theme Sections: The components object provided is not a valid");
                        return t;
                    })(e)),
                    (this.callStack = { onLoad: [], onUnload: [], onSelect: [], onDeselect: [], onBlockSelect: [], onBlockDeselect: [], onReorder: [] }),
                    e.forEach((t) => {
                        for (const [e, i] of Object.entries(t)) {
                            const t = this.callStack[e];
                            Array.isArray(t) && "function" == typeof i ? t.push(i) : (console.warn(`Unregisted function: '${e}' in component: '${this.type}'`), console.warn(i));
                        }
                    });
            }
        },
        et = class {
            callFunctions(t, e = null) {
                this.callStack[t].forEach((t) => {
                    const i = { id: this.id, type: this.type, container: this.container };
                    e ? t.call(i, e) : t.call(i);
                });
            }
            onLoad() {
                this.callFunctions("onLoad");
            }
            onUnload() {
                this.callFunctions("onUnload");
            }
            onSelect(t) {
                this.callFunctions("onSelect", t);
            }
            onDeselect(t) {
                this.callFunctions("onDeselect", t);
            }
            onBlockSelect(t) {
                this.callFunctions("onBlockSelect", t);
            }
            onBlockDeselect(t) {
                this.callFunctions("onBlockDeselect", t);
            }
            onReorder(t) {
                this.callFunctions("onReorder", t);
            }
            constructor(t, e) {
                (this.container = (function (t) {
                    if (!(t instanceof Element)) throw new TypeError("Theme Sections: Attempted to load section. The section container provided is not a DOM element.");
                    if (null === t.getAttribute(Z.id)) throw new Error("Theme Sections: The section container provided does not have an id assigned to the " + Z.id + " attribute.");
                    return t;
                })(t)),
                    (this.id = t.getAttribute(Z.id)),
                    (this.type = e.type),
                    (this.callStack = e.getStack());
                try {
                    this.onLoad();
                } catch (t) {
                    console.warn(`Error in section: ${this.id}`), console.warn(this), console.warn(t);
                }
            }
        };
    function it(t, e) {
        if ("string" != typeof t) throw new TypeError("Theme Sections: The first argument for .register must be a string that specifies the type of the section being registered");
        if (void 0 !== J[t]) throw new Error('Theme Sections: A section of type "' + t + '" has already been registered. You cannot register the same section type twice');
        Array.isArray(e) || (e = [e]);
        const i = new tt(t, e);
        return (J[t] = i), J;
    }
    function st(t, e) {
        (t = rt(t)),
            void 0 === e && (e = document.querySelectorAll("[" + Z.type + "]")),
            (e = at(e)),
            t.forEach(function (t) {
                const i = J[t];
                void 0 !== i &&
                    (e = e.filter(function (e) {
                        return !(ot(e).length > 0) && null !== e.getAttribute(Z.type) && (e.getAttribute(Z.type) !== t || (Y.push(new et(e, i)), !1));
                    }));
            });
    }
    function ot(t) {
        var e = [];
        if (NodeList.prototype.isPrototypeOf(t) || Array.isArray(t)) var i = t[0];
        if (t instanceof Element || i instanceof Element)
            at(t).forEach(function (t) {
                e = e.concat(
                    Y.filter(function (e) {
                        return e.container === t;
                    })
                );
            });
        else if ("string" == typeof t || "string" == typeof i) {
            rt(t).forEach(function (t) {
                e = e.concat(
                    Y.filter(function (e) {
                        return e.type === t;
                    })
                );
            });
        }
        return e;
    }
    function nt(t) {
        for (var e, i = 0; i < Y.length; i++)
            if (Y[i].id === t) {
                e = Y[i];
                break;
            }
        return e;
    }
    function rt(t) {
        return (
            "*" === t
                ? (t = Object.keys(J))
                : "string" == typeof t
                ? (t = [t])
                : t.constructor === et
                ? (t = [t.prototype.type])
                : Array.isArray(t) &&
                  t[0].constructor === et &&
                  (t = t.map(function (t) {
                      return t.type;
                  })),
            (t = t.map(function (t) {
                return t.toLowerCase();
            }))
        );
    }
    function at(t) {
        return (
            NodeList.prototype.isPrototypeOf(t) && t.length > 0
                ? (t = Array.prototype.slice.call(t))
                : (NodeList.prototype.isPrototypeOf(t) && 0 === t.length) || null === t
                ? (t = [])
                : !Array.isArray(t) && t instanceof Element && (t = [t]),
            t
        );
    }
    window.Shopify.designMode &&
        (document.addEventListener("shopify:section:load", function (t) {
            var e = t.detail.sectionId,
                i = t.target.querySelector("[" + Z.id + '="' + e + '"]');
            null !== i && st(i.getAttribute(Z.type), i);
        }),
        document.addEventListener("shopify:section:reorder", function (t) {
            var e = t.detail.sectionId,
                i = t.target.querySelector("[" + Z.id + '="' + e + '"]');
            "object" == typeof ot(i)[0] &&
                ot(i).forEach(function (t) {
                    t.onReorder();
                });
        }),
        document.addEventListener("shopify:section:unload", function (t) {
            var e = t.detail.sectionId,
                i = t.target.querySelector("[" + Z.id + '="' + e + '"]');
            "object" == typeof ot(i)[0] &&
                ot(i).forEach(function (t) {
                    var e = Y.map(function (t) {
                        return t.id;
                    }).indexOf(t.id);
                    Y.splice(e, 1), t.onUnload();
                });
        }),
        document.addEventListener("shopify:section:select", function (t) {
            var e = nt(t.detail.sectionId);
            "object" == typeof e && e.onSelect(t);
        }),
        document.addEventListener("shopify:section:deselect", function (t) {
            var e = nt(t.detail.sectionId);
            "object" == typeof e && e.onDeselect(t);
        }),
        document.addEventListener("shopify:block:select", function (t) {
            var e = nt(t.detail.sectionId);
            "object" == typeof e && e.onBlockSelect(t);
        }),
        document.addEventListener("shopify:block:deselect", function (t) {
            var e = nt(t.detail.sectionId);
            "object" == typeof e && e.onBlockDeselect(t);
        }));
    const lt = (t, e) => {
        let i, s;
        return function o(...n) {
            const r = Date.now();
            (s = clearTimeout(s)), !i || r - i >= e ? (t.apply(null, n), (i = r)) : (s = setTimeout(o.bind(null, ...n), e - (r - i)));
        };
    };
    function ct(t) {
        (this.status = t.status || null), (this.headers = t.headers || null), (this.json = t.json || null), (this.body = t.body || null);
    }
    ct.prototype = Error.prototype;
    const ht = "[data-collapsible-single]",
        dt = "[data-collapsible-trigger]",
        ut = "[data-collapsible-content]",
        pt = "is-expanded",
        mt = "aria-expanded",
        gt = "aria-controls",
        vt = "data-collapsible-trigger-mobile",
        yt = "data-collapsible-transition-override",
        ft = 500,
        bt = {};
    let wt = class {
        init() {
            this.triggers.forEach((t) => {
                t.addEventListener("click", this.collapsibleToggleEvent), t.addEventListener("keyup", this.collapsibleToggleEvent);
            });
        }
        collapsibleToggle(t) {
            t.preventDefault();
            const e = t.target.matches(dt) ? t.target : t.target.closest(dt),
                i = e.getAttribute(gt),
                s = document.getElementById(i),
                o = e.hasAttribute(vt),
                n = e.classList.contains(pt),
                r = t.code === theme.keyboardKeys.SPACE,
                a = t.code === theme.keyboardKeys.ESCAPE,
                l = window.innerWidth < theme.sizes.small;
            (this.isTransitioning && !this.transitionOverride) ||
                ((!t.code || r || a) &&
                    ((!n && a) ||
                        (o && !l) ||
                        ((this.isTransitioning = !0),
                        (e.disabled = !0),
                        this.single &&
                            this.triggers.forEach((t) => {
                                const i = t.classList.contains(pt);
                                if (e == t || !i) return;
                                const s = t.getAttribute(gt),
                                    o = document.getElementById(s);
                                requestAnimationFrame(() => {
                                    this.closeItem(o, t);
                                });
                            }),
                        n
                            ? requestAnimationFrame(() => {
                                  this.closeItem(s, e);
                              })
                            : requestAnimationFrame(() => {
                                  this.openItem(s, e);
                              }))));
        }
        openItem(t, e) {
            let i = t.querySelector(ut).offsetHeight;
            this.setDropdownHeight(t, i, e, !0), e.classList.add(pt), e.setAttribute(mt, !0), e.dispatchEvent(new CustomEvent("theme:form:sticky", { bubbles: !0, detail: { element: "accordion" } }));
        }
      
        closeItem(t, e) {
            let i = t.querySelector(ut).offsetHeight;
            requestAnimationFrame(() => {
                (i = 0), this.setDropdownHeight(t, i, e, !1), e.classList.remove(pt);
            }),
                this.setDropdownHeight(t, i, e, !1),
                e.classList.remove(pt),
                e.setAttribute(mt, !1);
        }
        setDropdownHeight(t, e, i, s) {
            (t.style.height = `${e}px`),
                t.setAttribute(mt, s),
                t.classList.toggle(pt, s),
                this.resetHeightTimer && clearTimeout(this.resetHeightTimer),
                0 == e &&
                    (this.resetHeightTimer = setTimeout(() => {
                        t.style.height = "";
                    }, ft)),
                s
                    ? (this.resetHeightTimer = setTimeout(() => {
                          (t.style.height = "auto"), (this.isTransitioning = !1);
                      }, ft))
                    : (this.isTransitioning = !1),
                setTimeout(() => {
                    i.disabled = !1;
                }, ft);
        }
        onUnload() {
            this.triggers.forEach((t) => {
                t.removeEventListener("click", this.collapsibleToggleEvent), t.removeEventListener("keyup", this.collapsibleToggleEvent);
            });
        }
        constructor(t) {
            (this.container = t),
                (this.single = this.container.querySelector(ht)),
                (this.triggers = this.container.querySelectorAll(dt)),
                (this.resetHeightTimer = 0),
                (this.isTransitioning = !1),
                (this.transitionOverride = this.container.hasAttribute(yt)),
                (this.collapsibleToggleEvent = (t) => lt(this.collapsibleToggle(t), 1250)),
                this.init();
        }
    };
    const Et = {
            onLoad() {
                bt[this.id] = new wt(this.container);
            },
            onUnload() {
                bt[this.id].onUnload();
            },
        },
        St = "[data-quantity-holder]",
        Lt = "[data-quantity-field]",
        kt = "[data-quantity-button]",
        At = "[data-quantity-minus]",
        qt = "[data-quantity-plus]",
        Ct = "read-only",
        Tt = "is-disabled";
    let Pt = class {
        init() {
            (this.quantity = this.holder.querySelector(St)),
                this.quantity &&
                    ((this.field = this.quantity.querySelector(Lt)),
                    (this.buttons = this.quantity.querySelectorAll(kt)),
                    (this.increaseButton = this.quantity.querySelector(qt)),
                    (this.quantityValue = Number(this.field.value || 0)),
                    (this.cartItemID = this.field.getAttribute("data-id")),
                    (this.maxValue = Number(this.field.getAttribute("max")) > 0 ? Number(this.field.getAttribute("max")) : null),
                    (this.minValue = Number(this.field.getAttribute("min")) > 0 ? Number(this.field.getAttribute("min")) : 0),
                    (this.disableIncrease = this.disableIncrease.bind(this)),
                    (this.emptyField = !1),
                    (this.updateQuantity = this.updateQuantity.bind(this)),
                    (this.decrease = this.decrease.bind(this)),
                    (this.increase = this.increase.bind(this)),
                    this.disableIncrease(),
                    this.quantity.classList.contains(Ct) || (this.changeValueOnClick(), this.changeValueOnInput()));
           }

        changeValueOnClick() {
            this.buttons.forEach((t) => {
                t.addEventListener("click", (t) => {
                    t.preventDefault(), (this.quantityValue = Number(this.field.value || 0));
                    const e = t.target,
                        
                        i = e.matches(At) || e.closest(At),
                        s = e.matches(qt) || e.closest(qt);
                    i && this.decrease(), s && this.increase(), this.updateQuantity();
                    this.updateQuantity();
                  
                });
            });
        }

        changeValueOnInput() {
            this.field.addEventListener("input", () => {
                (this.quantityValue = this.field.value), this.updateQuantity();

            });
        }
        updateQuantity() {
            this.maxValue < this.quantityValue && null !== this.maxValue && (this.quantityValue = this.maxValue),
            this.minValue > this.quantityValue && (this.quantityValue = this.minValue),
            (this.field.value = this.quantityValue),
            this.disableIncrease(),
            document.dispatchEvent(new CustomEvent("theme:cart:update")),
            this.quantityUpdateCart && this.updateCart();
        }
        

        decrease() {
            this.quantityValue > this.minValue ? this.quantityValue-- : (this.quantityValue = 0);
            const totalAmount = this.quantityValue;
        }
        increase() {
            this.quantityValue++;
            const totalAmount = this.quantityValue;
        }
        disableIncrease() {
            this.increaseButton.classList.toggle(Tt, this.quantityValue >= this.maxValue && null !== this.maxValue);
        }
        updateCart() {
            if ("" === this.quantityValue) return;
            const t = new CustomEvent("theme:cart:update", { bubbles: !0, detail: { id: this.cartItemID, quantity: this.quantityValue } });
            this.holder.dispatchEvent(t);

        }
        constructor(t, e = !1) {
            (this.holder = t), (this.quantityUpdateCart = e);
        }
    };
    const Ft = {
        state: { firstFocusable: null, lastFocusable: null, trigger: null },
        trapFocus: function (t) {
            var e = Array.from(t.container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex^="-"])')).filter(function (t) {
                var e = t.offsetWidth,
                    i = t.offsetHeight;
                return 0 !== e && 0 !== i && "none" !== getComputedStyle(t).getPropertyValue("display");
            });
            (e = e.filter(function (t) {
                return !t.classList.contains("deferred-media__poster");
            })),
                (this.state.firstFocusable = e[0]),
                (this.state.lastFocusable = e[e.length - 1]),
                t.elementToFocus || (t.elementToFocus = this.state.firstFocusable || t.container),
                this._setupHandlers(),
                document.addEventListener("focusin", this._onFocusInHandler),
                document.addEventListener("focusout", this._onFocusOutHandler),
                t.container.setAttribute("tabindex", "-1"),
                t.elementToFocus.focus();
        },
        removeTrapFocus: function (t) {
            const e = !document.body.classList.contains("no-outline");
            t && t.container && t.container.removeAttribute("tabindex"), document.removeEventListener("focusin", this._onFocusInHandler), this.state.trigger && e && this.state.trigger.focus();
        },
        _manageFocus: function (t) {
            t.code === theme.keyboardKeys.TAB &&
                (t.target !== this.state.lastFocusable || t.shiftKey || (t.preventDefault(), this.state.firstFocusable.focus()),
                t.target === this.state.firstFocusable && t.shiftKey && (t.preventDefault(), this.state.lastFocusable.focus()));
        },
        _onFocusOut: function () {
            document.removeEventListener("keydown", this._manageFocusHandler);
        },
        _onFocusIn: function (t) {
            (t.target !== this.state.lastFocusable && t.target !== this.state.firstFocusable) || document.addEventListener("keydown", this._manageFocusHandler);
        },
        _setupHandlers: function () {
            this._onFocusInHandler || (this._onFocusInHandler = this._onFocusIn.bind(this)),
                this._onFocusOutHandler || (this._onFocusOutHandler = this._onFocusIn.bind(this)),
                this._manageFocusHandler || (this._manageFocusHandler = this._manageFocus.bind(this));
        },
    };
    const It = {};
    function Dt(t = {}) {
        if ((t.type || (t.type = "json"), t.url))
            return It[t.url]
                ? It[t.url]
                : (function (t, e) {
                      const i = new Promise((i, s) => {
                          "text" === e
                              ? fetch(t)
                                    .then((t) => t.text())
                                    .then((t) => {
                                        i(t);
                                    })
                                    .catch((t) => {
                                        s(t);
                                    })
                              : (function (t, e, i) {
                                    let s = document.getElementsByTagName("head")[0],
                                        o = !1,
                                        n = document.createElement("script");
                                    (n.src = t),
                                        (n.onload = n.onreadystatechange = function () {
                                            o || (this.readyState && "loaded" != this.readyState && "complete" != this.readyState) ? i() : ((o = !0), e());
                                        }),
                                        s.appendChild(n);
                                })(
                                    t,
                                    function () {
                                        i();
                                    },
                                    function () {
                                        s();
                                    }
                                );
                      });
                      return (It[t] = i), i;
                  })(t.url, t.type);
        if (t.json)
            return It[t.json]
                ? Promise.resolve(It[t.json])
                : window
                      .fetch(t.json)
                      .then((t) => t.json())
                      .then((e) => ((It[t.json] = e), e));
        if (t.name) {
            const e = "".concat(t.name, t.version);
            return It[e]
                ? It[e]
                : (function (t) {
                      const e = "".concat(t.name, t.version),
                          i = new Promise((e, i) => {
                              try {
                                  window.Shopify.loadFeatures([
                                      {
                                          name: t.name,
                                          version: t.version,
                                          onLoad: (t) => {
                                              !(function (t, e, i) {
                                                  i ? e(i) : t();
                                              })(e, i, t);
                                          },
                                      },
                                  ]);
                              } catch (t) {
                                  i(t);
                              }
                          });
                      return (It[e] = i), i;
                  })(t);
        }
        return Promise.reject();
    }
    (window.isYoutubeAPILoaded = !1), (window.isVimeoAPILoaded = !1);
    const xt = "[data-video-id]",
        Ht = "loaded",
        Mt = "data-enable-sound",
        _t = "data-enable-background",
        Ot = "data-enable-autoplay",
        Bt = "data-enable-loop",
        zt = "data-video-id",
        Wt = "data-video-type";
    const $t = { videoIframe: "[data-video-id]", videoWrapper: ".video-wrapper", youtubeWrapper: "[data-youtube-wrapper]" },
        Vt = "data-section-id",
        Rt = "data-enable-sound",
        Nt = "data-check-player-visibility",
        Ut = "data-video-id",
        jt = "data-video-type",
        Kt = "loaded",
        Qt = [];
    const Gt = "[data-notification-form]",
        Xt = "[data-notification]",
        Jt = "[data-popup-close]",
        Yt = "pswp--success",
        Zt = "notification-popup-visible";
    function te(t) {
        const i = e.data(t);
        i &&
            (i.on("dragStart", (t, e) => {
                document.ontouchmove = function (t) {
                    t.preventDefault();
                };
            }),
            i.on("dragEnd", (t, e) => {
                document.ontouchmove = function (t) {
                    return !0;
                };
            }));
    }
    const ee = "html5",
        ie = "youtube",
        se = "vimeo",
        oe = "[data-deferred-media]",
        ne = "[data-deferred-media-button]",
        re = "[data-product-single-media-wrapper]",
        ae = "[data-video]",
        le = ".media--hidden",
        ce = "media--hidden",
        he = "loaded",
        de = "data-section-id",
        ue = "data-autoplay-video",
        pe = "data-media-id";
    let me = class {
        init() {
            this.container.querySelectorAll(ae).forEach((t) => {
                const e = t.querySelector(ne);
                e && e.addEventListener("click", this.loadContent.bind(this, t)), this.autoplayVideo && this.loadContent(t);
            });
        }
        loadContent(t) {
            if (t.querySelector(oe).getAttribute(he)) return;
            const e = document.createElement("div");
            e.appendChild(t.querySelector("template").content.firstElementChild.cloneNode(!0));
            const i = t.dataset.mediaId,
                s = e.querySelector("video, iframe"),
                o = this.hostFromVideoElement(s),
                n = t.querySelector(oe);
            n.appendChild(s),
                n.setAttribute("loaded", !0),
                (this.players[i] = {
                    mediaId: i,
                    sectionId: this.id,
                    container: t,
                    element: s,
                    host: o,
                    ready: () => {
                        this.createPlayer(i);
                    },
                });
            const r = this.players[i];
            switch (r.host) {
                case ee:
                    this.loadVideo(r, ee);
                    break;
                case se:
                    window.isVimeoAPILoaded ? this.loadVideo(r, se) : Dt({ url: "https://player.vimeo.com/api/player.js" }).then(() => this.loadVideo(r, se));
                    break;
                case ie:
                    window.isYoutubeAPILoaded ? this.loadVideo(r, ie) : Dt({ url: "https://www.youtube.com/iframe_api" }).then(() => this.loadVideo(r, ie));
            }
        }
        hostFromVideoElement(t) {
            if ("VIDEO" === t.tagName) return ee;
            if ("IFRAME" === t.tagName) {
                if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(t.src)) return ie;
                if (t.src.includes("vimeo.com")) return se;
            }
            return null;
        }
        loadVideo(t, e) {
            t.host === e && t.ready();
        }
        createPlayer(t) {
            const e = this.players[t];
            switch (e.host) {
                case ee:
                    e.element.addEventListener("play", () => {
                        e.container.dispatchEvent(new CustomEvent("theme:media:play"), { bubbles: !0 });
                    }),
                        e.element.addEventListener("pause", () => {
                            e.container.dispatchEvent(new CustomEvent("theme:media:pause"), { bubbles: !0 });
                        }),
                        this.autoplayVideo && this.observeVideo(e, t);
                    break;
                case se:
                    (e.player = new Vimeo.Player(e.element)),
                        e.player.play(),
                        e.container.dispatchEvent(new CustomEvent("theme:media:play"), { bubbles: !0 }),
                        (window.isVimeoAPILoaded = !0),
                        e.player.on("play", () => {
                            e.container.dispatchEvent(new CustomEvent("theme:media:play"), { bubbles: !0 });
                        }),
                        e.player.on("pause", () => {
                            e.container.dispatchEvent(new CustomEvent("theme:media:pause"), { bubbles: !0 });
                        }),
                        this.autoplayVideo && this.observeVideo(e, t);
                    break;
                case ie:
                    if (e.host == ie && e.player) return;
                    YT.ready(() => {
                        const i = e.container.dataset.videoId;
                        (e.player = new YT.Player(e.element, {
                            videoId: i,
                            events: {
                                onReady: (t) => {
                                    t.target.playVideo(), e.container.dispatchEvent(new CustomEvent("theme:media:play"), { bubbles: !0 });
                                },
                                onStateChange: (t) => {
                                    1 == t.data && e.container.dispatchEvent(new CustomEvent("theme:media:play"), { bubbles: !0 }),
                                        2 == t.data && e.container.dispatchEvent(new CustomEvent("theme:media:pause"), { bubbles: !0 }),
                                        0 == t.data && e.container.dispatchEvent(new CustomEvent("theme:media:pause"), { bubbles: !0 });
                                },
                            },
                        })),
                            (window.isYoutubeAPILoaded = !0),
                            this.autoplayVideo && this.observeVideo(e, t);
                    });
            }
            e.container.addEventListener("theme:media:visible", (t) => this.onVisible(t)), e.container.addEventListener("theme:media:hidden", (t) => this.onHidden(t)), e.container.addEventListener("xrLaunch", (t) => this.onHidden(t));
        }
        observeVideo(t) {
            new IntersectionObserver(
                (e, i) => {
                    e.forEach((e) => {
                        const i = 0 == e.intersectionRatio,
                            s = !t.element.closest(le);
                        i ? this.pauseVideo(t) : s && this.playVideo(t);
                    });
                },
                { rootMargin: "200px", threshold: [0, 0.25, 0.75, 1] }
            ).observe(t.element);
        }
        playVideo(t) {
            t.player && t.player.playVideo ? t.player.playVideo() : t.element && t.element.play ? t.element.play() : t.player && t.player.play && t.player.play(),
                t.container.dispatchEvent(new CustomEvent("theme:media:play"), { bubbles: !0 });
        }
        pauseVideo(t) {
            if (t.player && t.player.pauseVideo) "1" == t.player.playerInfo.playerState && t.player.pauseVideo();
            else if (t.player && t.player.pause) t.player.pause();
            else if (t.element && !t.element.paused) {
                var e;
                null === (e = t.element) || void 0 === e || e.pause();
            }
        }
        onHidden(t) {
            if (void 0 !== t.target.dataset.mediaId) {
                const e = t.target.dataset.mediaId,
                    i = this.players[e];
                this.pauseVideo(i);
            }
        }
        onVisible(t) {
            if (void 0 !== t.target.dataset.mediaId) {
                const e = t.target.dataset.mediaId,
                    i = this.players[e];
                setTimeout(() => {
                    this.playVideo(i);
                }, 50),
                    this.pauseContainerMedia(e);
            }
        }
        pauseOtherMedia(t, e) {
            const i = `[${pe}="${t}"]`,
                s = e.querySelectorAll(`${re}:not(${i})`);
            s.length &&
                s.forEach((t) => {
                    t.dispatchEvent(new CustomEvent("theme:media:hidden"), { bubbles: !0 }), t.classList.add(ce);
                });
        }
        constructor(t) {
            (this.container = t),
                (this.id = this.container.getAttribute(de)),
                (this.autoplayVideo = "true" === this.container.getAttribute(ue)),
                (this.players = {}),
                (this.pauseContainerMedia = (t, e = this.container) => this.pauseOtherMedia(t, e)),
                this.init();
        }
    };
    const ge = "[data-custom-scrollbar]",
        ve = "[data-custom-scrollbar-items]",
        ye = "[data-custom-scrollbar-thumb]";
    const fe = "[data-tabs-link]",
        be = "[data-tab]",
        we = "[data-tab-ref]",
        Ee = "[data-custom-scrollbar]",
        Se = "[data-custom-scrollbar-holder]",
        Le = "[data-slider]",
        ke = "[data-tabs-contents]",
        Ae = "current",
        qe = "hide",
        Ce = "alt",
        Te = "aos-animate",
        Pe = "aos-init",
        Fe = "data-tabs-link",
        Ie = "data-tab",
        De = "data-tab-ref",
        xe = "data-start-index",
        He = {};
    let Me = class {
        init() {
            const t = this.container.querySelectorAll(fe),
                e = this.container.querySelector(`[${Fe}="${this.container.hasAttribute(xe) ? this.container.getAttribute(xe) : 0}"]`),
                i = this.container.querySelector(`[${Ie}="${this.container.hasAttribute(xe) ? this.container.getAttribute(xe) : 0}"]`);
            null == i || i.classList.add(Ae),
                null == e || e.classList.add(Ae),
                this.checkVisibleTabsLinks(),
                t.forEach((t) => {
                    this.handleTabsNavListeners(t);
                });
        }
        handleTabsNavListeners(t) {
            const e = parseInt(t.getAttribute(Fe)),
                i = this.container.querySelector(`[${Ie}="${e}"]`);
            i &&
                (t.addEventListener("click", () => {
                    this.tabChange(t, i);
                }),
                t.addEventListener("keyup", (e) => {
                    (e.code !== theme.keyboardKeys.SPACE && e.code !== theme.keyboardKeys.ENTER && e.code !== theme.keyboardKeys.NUMPADENTER) || this.tabChange(t, i);
                }));
        }
        initCustomScrollbar() {
            this.scrollable &&
                (this.customScrollbar = new (class {
                    calculateTrack(t) {
                        const e = t.clientWidth / this.scrollbarThumb.parentElement.clientWidth,
                            i = t.offsetLeft / this.scrollbarThumb.parentElement.clientWidth;
                        this.scrollbar.style.setProperty("--thumb-scale", e), this.scrollbar.style.setProperty("--thumb-position", this.trackWidth * i + "px");
                    }
                    calculateScrollbar() {
                        if (this.scrollbarItems.children.length) {
                            const t = [...this.scrollbarItems.children];
                            (this.trackWidth = 0),
                                t.forEach((t) => {
                                    this.trackWidth += t.getBoundingClientRect().width + parseInt(window.getComputedStyle(t).marginRight);
                                }),
                                this.scrollbar.style.setProperty("--track-width", `${this.trackWidth}px`);
                        }
                    }
                    onScrollbarChange(t) {
                        t && t.detail && t.detail.element && this.container.contains(t.detail.element) && this.calculateTrack(t.detail.element);
                    }
                    events() {
                        document.addEventListener("theme:resize:width", this.calcScrollbarEvent), document.addEventListener("theme:custom-scrollbar:change", this.onScrollbarChangeEvent);
                    }
                    unload() {
                        document.removeEventListener("theme:resize:width", this.calcScrollbarEvent), document.removeEventListener("theme:custom-scrollbar:change", this.onScrollbarChangeEvent);
                    }
                    constructor(t) {
                        (this.container = t),
                            (this.scrollbarItems = t.querySelector(ve)),
                            (this.scrollbar = t.querySelector(ge)),
                            (this.scrollbarThumb = t.querySelector(ye)),
                            (this.trackWidth = 0),
                            (this.calcScrollbarEvent = () => this.calculateScrollbar()),
                            (this.onScrollbarChangeEvent = (t) => this.onScrollbarChange(t)),
                            this.scrollbar && this.scrollbarItems && (this.events(), this.calculateScrollbar(), this.scrollbarItems.children.length && this.calculateTrack(this.scrollbarItems.children[0]));
                    }
                })(this.container));
        }
        tabChange(t, e) {
            var i;
            if (t.classList.contains(Ae)) return;
            const s = t.closest(Se) ? t.closest(Se) : t.parentElement,
                o = parseInt(window.getComputedStyle(s).getPropertyValue("padding-left")),
                n = this.container.querySelector(`${be}.${Ae}`),
                r = this.container.querySelector(`${fe}.${Ae}`),
                a = e.querySelector(Le);
            null === (i = this.tabRef) ||
                void 0 === i ||
                i.forEach((t) => {
                    const i = t.classList.contains(Ae),
                        s = t.getAttribute(De) === e.getAttribute(Ie);
                    t.classList.toggle(Ae, !i && s);
                }),
                n.classList.remove(Ae),
                r.classList.remove(Ae),
                t.classList.add(Ae),
                e.classList.add(Ae),
                a && a.dispatchEvent(new CustomEvent("theme:tab:change", { bubbles: !1 })),
                s.scrollTo({ top: 0, left: t.offsetLeft - s.offsetWidth / 2 + t.offsetWidth / 2 + o, behavior: "smooth" }),
                t.dispatchEvent(new CustomEvent("theme:custom-scrollbar:change", { bubbles: !0, detail: { element: t } })),
                theme.settings.animations &&
                    (this.tabsContents.querySelectorAll(`.${Pe}`).forEach((t) => {
                        t.classList.remove(Te);
                    }),
                    this.animateElementsTimer && clearTimeout(this.animateElementsTimer),
                    (this.animateElementsTimer = setTimeout(() => {
                        e.querySelectorAll(`.${Pe}`).forEach((t) => {
                            t.classList.add(Te);
                        });
                    }, 150))),
                t.classList.contains(qe) && e.classList.add(qe),
                this.checkVisibleTabsLinks();
        }
        checkVisibleTabsLinks() {
            const t = this.container.querySelectorAll(fe),
                e = this.container.querySelectorAll(`${fe}.${qe}`);
            t.length - e.length < 2 ? this.container.classList.add(Ce) : this.container.classList.remove(Ce);
        }
        onBlockSelect(t) {
            const e = t.target;
            e && (e.dispatchEvent(new Event("click")), e.parentNode.scrollTo({ top: 0, left: e.offsetLeft - e.clientWidth, behavior: "smooth" }));
        }
        onUnload() {
            this.customScrollbar && this.customScrollbar.unload();
        }
        constructor(t) {
            (this.container = t),
                (this.tabsContents = t.querySelector(ke)),
                (this.animateElementsTimer = null),
                this.container && ((this.scrollable = this.container.querySelector(Ee)), (this.tabRef = this.container.querySelectorAll(we)), this.init(), this.initCustomScrollbar());
        }
    };
    const _e = {
            onLoad() {
                He[this.id] = new Me(this.container);
            },
            onBlockSelect(t) {
                He[this.id].onBlockSelect(t);
            },
            onUnload() {
                He[this.id].onUnload();
            },
        },
        Oe = "[data-drawer]",
        Be = "[data-drawer-toggle]",
        ze = "[data-scroll]",
        We = "[data-quick-view-item]",
        $e = "is-open",
        Ve = "js-drawer-open",
        Re = "cv-h",
        Ne = "site-header",
        Ue = "aria-expanded",
        je = "aria-controls";
    let Ke = {},
        Qe = class {
            initListeners() {
                this.drawerToggleButtons.forEach((t) => {
                    t.addEventListener("click", this.drawerToggleEvent);
                }),
                    this.drawers.forEach((t) => {
                        t.addEventListener("keyup", this.keyPressCloseEvent), (this.collapsible = new wt(t)), (this.tabs = new Me(t));
                    }),
                    document.addEventListener("click", this.drawerCloseEvent),
                    document.addEventListener("theme:drawer:closing", this.drawerCloseEvent);
            }
            toggle(t) {
                t.preventDefault();
                const e = document.querySelector(`#${t.target.getAttribute(je)}`);
                if (!e) return;
                e.classList.contains($e) ? this.close() : this.open(t);
            }
            open(t) {
                const e = t.target,
                    i = document.querySelector(`#${t.target.getAttribute(je)}`);
                if (!i) return;
                const s = i.querySelector(ze) || i;
                document.dispatchEvent(new CustomEvent("theme:scroll:lock", { bubbles: !0, detail: s })),
                    document.dispatchEvent(new CustomEvent("theme:drawer:open"), { bubbles: !0 }),
                    document.body.classList.add(Ve),
                    i.classList.add($e),
                    i.classList.remove(Re),
                    e.setAttribute(Ue, !0),
                    setTimeout(() => {
                        (this.a11y.state.trigger = e), this.a11y.trapFocus({ container: i });
                    });
            }
            close() {
                if (!document.body.classList.contains(Ve)) return;
                const t = document.querySelector(`${Oe}.${$e}`);
                this.drawerToggleButtons.forEach((t) => {
                    t.setAttribute(Ue, !1);
                }),
                    this.a11y.removeTrapFocus({ container: t }),
                    t.classList.remove($e);
                const e = (i) => {
                    i.target === t &&
                        (requestAnimationFrame(() => {
                            t.classList.add(Re), document.dispatchEvent(new CustomEvent("theme:drawer:close"), { bubbles: !0 }), document.dispatchEvent(new CustomEvent("theme:scroll:unlock", { bubbles: !0 }));
                        }),
                        t.removeEventListener("transitionend", e));
                };
                t.addEventListener("transitionend", e), document.body.classList.remove(Ve);
            }
            onUnload() {
                this.close(),
                    this.drawerToggleButtons.forEach((t) => {
                        t.removeEventListener("click", this.drawerToggleEvent);
                    }),
                    this.drawers.forEach((t) => {
                        t.removeEventListener("keyup", this.keyPressCloseEvent);
                    }),
                    document.removeEventListener("click", this.drawerCloseEvent),
                    document.removeEventListener("theme:drawer:closing", this.drawerCloseEvent),
                    this.collapsible && this.collapsible.onUnload(),
                    this.tabs && this.tabs.onUnload();
            }
            constructor(t) {
                (this.container = t),
                    (this.drawers = this.container.querySelectorAll(Oe)),
                    (this.drawerToggleButtons = this.container.querySelectorAll(Be)),
                    (this.a11y = Ft),
                    (this.drawerToggleEvent = lt((t) => {
                        this.toggle(t);
                    }, 150)),
                    (this.keyPressCloseEvent = lt((t) => {
                        t.code === theme.keyboardKeys.ESCAPE && this.close(t);
                    }, 150)),
                    (this.drawerCloseEvent = (t) => {
                        const e = document.querySelector(`${Oe}.${$e}`);
                        let i = !1;
                        if (!e) return;
                        "click" === t.type && (i = t.target.matches(Be));
                        const s = !!e && e.contains(t.target),
                            o = e.closest(We),
                            n = !!o && o.contains(t.target);
                        i || s || n || this.close();
                    }),
                    this.initListeners();
            }
        };
    const Ge = {
            onLoad() {
                this.container.classList.contains(Ne) && (this.container = this.container.parentNode), (Ke[this.id] = new Qe(this.container));
            },
            onUnload() {
                Ke[this.id].onUnload();
            },
        },
        Xe = (t, e = !1, i = "block") => {
            t && (e ? t.style.removeProperty("display") : (t.style.display = i));
        },
        Je = (t) => {
            t && (t.style.display = "none");
        },
        Ye = "[data-header-sticky]",
        Ze = "[data-header-height]";
    function ti() {
        this.entries = [];
    }
    function ei(t, e) {
        ii(t);
        var i = (function (t, e) {
            ii(t),
                (function (t) {
                    if (!Array.isArray(t)) throw new TypeError(t + " is not an array.");
                    if (0 === t.length) throw new Error(t + " is empty.");
                    if (!t[0].hasOwnProperty("name")) throw new Error(t[0] + "does not contain name key.");
                    if ("string" != typeof t[0].name) throw new TypeError("Invalid value type passed for name of option " + t[0].name + ". Value should be string.");
                })(e);
            var i = [];
            return (
                e.forEach(function (e) {
                    for (var s = 0; s < t.options.length; s++) {
                        if ((t.options[s].name || t.options[s]).toLowerCase() === e.name.toLowerCase()) {
                            i[s] = e.value;
                            break;
                        }
                    }
                }),
                i
            );
        })(t, e);
        return (function (t, e) {
            ii(t),
                (function (t) {
                    if (Array.isArray(t) && "object" == typeof t[0]) throw new Error(t + "is not a valid array of options.");
                })(e);
            var i = t.variants.filter(function (t) {
                return e.every(function (e, i) {
                    return t.options[i] === e;
                });
            });
            return i[0] || null;
        })(t, i);
    }
    function ii(t) {
        if ("object" != typeof t) throw new TypeError(t + " is not an object.");
        if (0 === Object.keys(t).length && t.constructor === Object) throw new Error(t + " is empty.");
    }
    (ti.prototype.add = function (t, e, i) {
        this.entries.push({ element: t, event: e, fn: i }), t.addEventListener(e, i);
    }),
        (ti.prototype.removeAll = function () {
            this.entries = this.entries.filter(function (t) {
                return t.element.removeEventListener(t.event, t.fn), !1;
            });
        });
    var si = '[name="id"]',
        oi = '[name="selling_plan"]',
        ni = '[name^="options"]',
        ri = '[name="quantity"]',
        ai = '[name^="properties"]';
    const li = "[data-store-availability-list]",
        ci = { close: ".js-modal-close", open: ".js-modal-open-store-availability-modal", openClass: "modal--is-active", openBodyClass: "modal--is-visible", closeModalOnClick: !1, scrollIntoView: !1 };
    const hi = "body",
        di = "[data-store-availability-modal]",
        ui = "[data-store-availability-modal-open]",
        pi = "[data-store-availability-modal-close]",
        mi = "[data-store-availability-modal-product__title]",
        gi = "store-availabilities-modal--active";
    const vi = "[data-product-form]",
        yi = "[data-option-position]",
        fi = '[name^="options"], [data-popout-option]',
        bi = "sold-out",
        wi = "unavailable",
        Ei = "data-option-position",
        Si = "data-value";
    const Li = 1,
        ki = "data-notification-popup",
        Ai = { history: !1, focus: !1, mainClass: "pswp--notification pswp--not-close-btn", closeOnVerticalDrag: !1 };
    let qi = class {
        init() {
            const t = [{ html: this.notificationPopupHtml }];
            (this.a11y.state.trigger = this.button), new Kn(t, Ai, Li);
        }
        constructor(t) {
            (this.button = t), (this.a11y = Ft), (this.notificationPopupHtml = this.button.getAttribute(ki)), "" !== this.notificationPopupHtml.trim() && this.init();
        }
    };
    const Ci = "[data-product]",
        Ti = "[data-product-form]",
        Pi = "[data-add-to-cart]",
        Fi = "[data-add-to-cart-text]",
        Ii = "[data-buy-it-now]",
        Di = "[data-compare-price]",
        xi = "[data-form-wrapper]",
        Hi = "[data-site-header]",
        Mi = "[data-product-select]",
        _i = "_preorder",
        Oi = "[data-price-wrapper]",
        Bi = "[data-price-off]",
        zi = "[data-price-off-type]",
        Wi = "[data-price-off-amount]",
        $i = "[data-product-slide]",
        Vi = "[data-product-image]",
        Ri = "[data-product-single-media-slider]",
        Ni = "[data-product-json]",
        Ui = "[data-product-price]",
        ji = "[data-product-unit-price]",
        Ki = "[data-product-base]",
        Qi = "[data-product-unit]",
        Gi = "[data-subscription-watch-price]",
        Xi = "[data-subscription-selectors]",
        Ji = "[data-toggles-group]",
        Yi = "data-group-toggle",
        Zi = "[data-plan-description]",
        ts = "[data-remaining-count]",
        es = "[data-remaining-wrapper]",
        is = "[data-product-remaining-json]",
        ss = "[data-store-availability-container]",
        os = "[data-upsell-btn]",
        ns = ".shopify-section",
        rs = "[data-quick-view-item]",
        as = "[data-notification-button-text]",
        ls = "hidden",
        cs = "variant--soldout",
        hs = "variant--unavailabe",
        ds = "product__price--sale",
        us = "product__price--hidden",
        ps = "count-is-low",
        ms = "count-is-in",
        gs = "count-is-out",
        vs = "count-is-unavailable",
        ys = "data-image-id",
        fs = "data-tall-layout",
        bs = "data-enable-history-state",
        ws = "data-notification-popup";
    let Es = class {
        init() {
            let t = null;
            const e = this.container.querySelector(Ni);
            e && (t = e.innerHTML),
                t
                    ? ((this.productJSON = JSON.parse(t)),
                      this.linkForm(),
                      (this.sellout = new (class {
                          init() {
                              this.update();
                          }
                          update() {
                              this.getCurrentState(),
                                  
                                  this.optionElements.forEach((t) => {
                                      const e = t.value || t.getAttribute(Si),
                                          i = t.closest(yi);
                                      if (!i) return;
                                      const s = i.getAttribute(Ei),
                                          o = parseInt(s, 10) - 1;
                                      let n = [...this.selections];
                                      n[o] = e;
                                      const r = this.productJSON.variants.find((t) => {
                                          let e = !0;
                                          for (let i = 0; i < n.length; i++) t.options[i] !== n[i] && (e = !1);
                                          return e;
                                      });
                                      t.parentElement.classList.remove(bi, wi), void 0 === r ? t.parentElement.classList.add(wi) : !1 === (null == r ? void 0 : r.available) && t.parentElement.classList.add(bi);
                                  });
                          }
                          getCurrentState() {
                              for (var t of ((this.formData = new FormData(this.form)), (this.selections = []), this.formData.entries())) t[0].includes("options[") && this.selections.push(t[1]);
                          }
                          constructor(t, e) {
                              (this.container = t),
                                  (this.productJSON = e),
                                  (this.form = this.container.querySelector(vi)),
                                  (this.formData = new FormData(this.form)),
                                  (this.optionElements = this.container.querySelectorAll(fi)),
                                  this.productJSON && this.form && this.init();
                          }
                      })(this.container, this.productJSON)))
                    : console.error("Missing product JSON");
        }
        destroy() {
            this.productForm.destroy();
        }
        linkForm() {
            (this.productForm = new (class {
                destroy() {
                    this._listeners.removeAll();
                }
                options() {
                    return this._serializeInputValues(this.optionInputs, function (t) {
                        return (t.name = /(?:^(options\[))(.*?)(?:\])/.exec(t.name)[2]), t;
                    });
                }
                variant() {
                    const t = this.options();
                    return t.length ? ei(this.product, t) : this.product.variants[0];
                }
                plan(t) {
                    let e = { allocation: null, group: null, detail: null };
                    const i = new FormData(this.form).get("selling_plan");
                    return (
                        i &&
                            t &&
                            (e.allocation = t.selling_plan_allocations.find(function (t) {
                                return t.selling_plan_id.toString() === i.toString();
                            })),
                        e.allocation &&
                            (e.group = this.product.selling_plan_groups.find(function (t) {
                                return t.id.toString() === e.allocation.selling_plan_group_id.toString();
                            })),
                        e.group &&
                            (e.detail = e.group.selling_plans.find(function (t) {
                                return t.id.toString() === i.toString();
                            })),
                        e && e.allocation && e.detail && e.allocation ? e : null
                    );
                }
                properties() {
                    return this._serializeInputValues(this.propertyInputs, function (t) {
                        return (t.name = /(?:^(properties\[))(.*?)(?:\])/.exec(t.name)[2]), t;
                    });
                }
                quantity() {
                    return this.quantityInputs[0] ? Number.parseInt(this.quantityInputs[0].value, 10) : 1;
                }
                getFormState() {
                    const t = this.variant();
                    return { options: this.options(), variant: t, properties: this.properties(), quantity: this.quantity(), plan: this.plan(t) };
                }
                _setIdInputValue(t) {
                    t && t.id ? (this.variantElement.value = t.id.toString()) : (this.variantElement.value = ""), this.variantElement.dispatchEvent(new Event("change"));
                }
                _onSubmit(t, e) {
                    (e.dataset = this.getFormState()), t.onFormSubmit && t.onFormSubmit(e);
                }
                _onOptionChange(t) {
                    this._setIdInputValue(t.dataset.variant);
                }
                _onFormEvent(t) {
                    return void 0 === t
                        ? Function.prototype.bind()
                        : function (e) {
                              (e.dataset = this.getFormState()), this._setIdInputValue(e.dataset.variant), t(e);
                          }.bind(this);
                }
                _initInputs(t, e) {
                    return Array.prototype.slice.call(this.element.querySelectorAll(t)).map(
                        function (t) {
                            return this._listeners.add(t, "change", this._onFormEvent(e)), t;
                        }.bind(this)
                    );
                }
                _serializeInputValues(t, e) {
                    return t.reduce(function (t, i) {
                        return (i.checked || ("radio" !== i.type && "checkbox" !== i.type)) && t.push(e({ name: i.name, value: i.value })), t;
                    }, []);
                }
                _validateProductObject(t) {
                    if ("object" != typeof t) throw new TypeError(t + " is not an object.");
                    if (void 0 === t.variants[0].options) throw new TypeError("Product object is invalid. Make sure you use the product object that is output from {{ product | json }} or from the http://[your-product-url].js route");
                    return t;
                }
                constructor(t, e, i) {
                    (this.element = t),
                        (this.form = "FORM" == this.element.tagName ? this.element : this.element.querySelector("form")),
                        (this.product = this._validateProductObject(e)),
                        (this.variantElement = this.element.querySelector(si)),
                        (i = i || {}),
                        (this._listeners = new ti()),
                        this._listeners.add(this.element, "submit", this._onSubmit.bind(this, i)),
                        (this.optionInputs = this._initInputs(ni, i.onOptionChange)),
                        (this.planInputs = this._initInputs(oi, i.onPlanChange)),
                        (this.quantityInputs = this._initInputs(ri, i.onQuantityChange)),
                        (this.propertyInputs = this._initInputs(ai, i.onPropertyChange));
                }
            })(this.productForm, this.productJSON, { onOptionChange: this.onOptionChange.bind(this), onPlanChange: this.onPlanChange.bind(this) })),
                this.pushState(this.productForm.getFormState()),
                this.subsToggleListeners();
        }
        onOptionChange(t) {
            this.pushState(t.dataset), this.updateProductImage(t);
        }
        onPlanChange(t) {
            this.subPrices && this.pushState(t.dataset);
        }
        pushState(t) {
            var e;
            (this.productState = this.setProductState(t)),
                this.updateAddToCartState(t),
                this.updateProductPrices(t),
                this.updateSaleText(t),
                this.updateSubscriptionText(t),
                this.fireHookEvent(t),
                this.updateRemaining(t),
                null === (e = this.sellout) || void 0 === e || e.update(t),
                this.enableHistoryState && this.updateHistoryState(t),
                this.storeAvailability && (t.variant ? this.storeAvailability.updateContent(t.variant.id, this.productForm.product.title) : this.storeAvailability.clearContent());
        }
        updateAddToCartState(t) {
            const e = t.variant,
                i = this.container.querySelectorAll(Oi),
                s = this.container.querySelectorAll(Pi),
                o = this.container.querySelectorAll(Fi),
                n = this.container.querySelectorAll(xi),
                r = this.container.querySelector(Ii);
            let a = theme.strings.add_to_cart;
            this.productJSON.tags.includes(_i) && (a = theme.strings.preorder),
                null == i ||
                    i.forEach((t) => {
                        t.classList.toggle(us, !e);
                    }),
                null == s ||
                    s.forEach((t) => {
                        var i;
                        if (t.matches(os)) return;
                        if (((t.disabled = !0), null == r || r.classList.add(ls), !e)) return;
                        if (((t.disabled = !1), e.available && (null == r || r.classList.remove(ls)), !t.hasAttribute(ws))) return;
                        const s = t.id.replace("AddToCart", "NotificationForm"),
                            o = this.sessionStorage.getItem("notification_form_id");
                        let n = !1,
                            a = e.id,
                            l = e.title;
                        if (o) {
                            const t = o.substring(0, o.lastIndexOf("--")),
                                e = o.split("--").slice(-1)[0];
                            (n = s === t),
                                n &&
                                    ((this.latestVariantId = a),
                                    (this.latestVariantTitle = l),
                                    (a = Number(e)),
                                    this.productJSON.variants.forEach((t) => {
                                        t.id === a && (l = t.title);
                                    }));
                        }
                        let c = t.getAttribute(ws);
                        const h = null === (i = new DOMParser().parseFromString(c, "text/html").querySelector(as)) || void 0 === i ? void 0 : i.innerHTML;
                        if ("" != this.latestVariantId && "" != this.latestVariantTitle) {
                            var d;
                            (c = c.replaceAll(this.latestVariantId, a)), (c = c.replaceAll(this.latestVariantTitle, l));
                            const t = null === (d = new DOMParser().parseFromString(c, "text/html").querySelector(as)) || void 0 === d ? void 0 : d.innerHTML;
                            c = c.replace(t, h);
                        }
                        t.setAttribute(ws, c), n && (this.scrollToForm(this.product.closest(ns)), new qi(t)), (this.latestVariantId = a), (this.latestVariantTitle = l);
                    }),
                null == o ||
                    o.forEach((t) => {
                        if (e) {
                            if (e.available) t.innerHTML = a;
                            else if (((t.innerHTML = theme.strings.sold_out), t.parentNode.hasAttribute(ws))) {
                                if (t.closest(rs)) return;
                                t.innerHTML = `${theme.strings.sold_out} - ${theme.strings.newsletter_product_availability}`;
                            }
                        } else t.innerHTML = theme.strings.unavailable;
                    }),
                null == n ||
                    n.forEach((t) => {
                        if (!e) return t.classList.add(hs), void t.classList.remove(cs);
                        const i = t.querySelector(Mi);
                        if ((i && (i.value = e.id), !e.available)) return t.classList.add(cs), void t.classList.remove(hs);
                        t.classList.remove(cs, hs);
                    });
        }
        updateHistoryState(t) {
            const e = t.variant,
                i = t.plan,
                s = window.location.href;
            if (e && s.includes("/product")) {
                const t = new window.URL(s),
                    o = t.searchParams;
                o.set("variant", e.id), i && i.detail && i.detail.id && this.productState.hasPlan ? o.set("selling_plan", i.detail.id) : o.delete("selling_plan"), (t.search = o.toString());
                const n = t.toString();
                window.history.replaceState({ path: n }, "", n);
            }
        }
        updateRemaining(t) {
            const e = t.variant,
                i = [ms, gs, vs, ps];
            if (e && this.remainingWrapper && this.remainingJSON) {
                const t = this.remainingJSON[e.id];
                ("out" === t || t < 1) && (this.remainingWrapper.classList.remove(...i), this.remainingWrapper.classList.add(gs)),
                    ("in" === t || t >= this.remainingMaxInt) && (this.remainingWrapper.classList.remove(...i), this.remainingWrapper.classList.add(ms)),
                    ("low" === t || (t > 0 && t < this.remainingMaxInt)) && (this.remainingWrapper.classList.remove(...i), this.remainingWrapper.classList.add(ps), this.remainingCount && (this.remainingCount.innerHTML = t));
            } else !e && this.remainingWrapper && (this.remainingWrapper.classList.remove(...i), this.remainingWrapper.classList.add(vs));
        }
        getBaseUnit(t) {
            return 1 === t.unit_price_measurement.reference_value ? t.unit_price_measurement.reference_unit : t.unit_price_measurement.reference_value + t.unit_price_measurement.reference_unit;
        }
        subsToggleListeners() {
            this.container.querySelectorAll(Ji).forEach((t) => {
                t.addEventListener(
                    "change",
                    function (t) {
                        const e = t.target.value.toString(),
                            i = this.container.querySelector(`[${Yi}="${e}"]`),
                            s = this.container.querySelectorAll(`[${Yi}]`);
                        if (i) {
                            i.classList.remove(ls);
                            const t = i.querySelector('[name="selling_plan"]');
                            (t.checked = !0), t.dispatchEvent(new Event("change"));
                        }
                        s.forEach((t) => {
                            if (t !== i) {
                                t.classList.add(ls);
                                t.querySelectorAll('[name="selling_plan"]').forEach((t) => {
                                    (t.checked = !1), t.dispatchEvent(new Event("change"));
                                });
                            }
                        });
                    }.bind(this)
                );
            });
        }
        updateSaleText(t) {
            this.productState.planSale ? this.updateSaleTextSubscription(t) : this.productState.onSale ? this.updateSaleTextStandard(t) : this.priceOffWrap && this.priceOffWrap.classList.add(ls);
        }
        updateSaleTextStandard(t) {
            if (!this.priceOffType) return;
            this.priceOffType.innerHTML = window.theme.strings.sale_badge_text || "sale";
            const e = t.variant;
            if (window.theme.settings.savingBadgeType && "percentage" === window.theme.settings.savingBadgeType) {
                const t = (e.compare_at_price - e.price) / e.compare_at_price,
                    i = Math.floor(100 * t);
                this.priceOffAmount.innerHTML = `${i}%`;
            } else {
                const t = e.compare_at_price - e.price;
                this.priceOffAmount.innerHTML = i.formatMoney(t, theme.moneyFormat);
            }
            this.priceOffWrap.classList.remove(ls);
        }
        updateSaleTextSubscription(t) {
            const e = t.variant,
                s = this.productForm.product.selling_plan_groups.find((t) => t.id === e.selling_plan_allocations[0].selling_plan_group_id),
                o = t.plan ? t.plan.detail.price_adjustments[0] : s.selling_plans[0].price_adjustments[0],
                n = o.value || 0,
                r = "percentage" === o.value_type ? `${n}%` : i.formatMoney(e.price - n, theme.moneyFormat);
            (this.priceOffType.innerHTML = window.theme.strings.subscription || "subscripton"), (this.priceOffAmount.innerHTML = r), this.priceOffWrap.classList.remove(ls);
        }
        updateSubscriptionText(t) {
            t.plan && this.planDecription && null !== t.plan.detail.description
                ? ((this.planDecription.innerHTML = t.plan.detail.description), this.planDecription.classList.remove(ls))
                : this.planDecription && this.planDecription.classList.add(ls);
        }
        updateProductPrices(t) {
            const e = t.variant,
                s = t.plan;
            this.container.querySelectorAll(Oi).forEach((t) => {
                const o = t.querySelector(Di),
                    n = t.querySelector(Ui);
                let r = "",
                    a = "";
                if ((this.productState.available && ((r = e.compare_at_price), (a = e.price)), this.productState.hasPlan)) {
                    a = s ? s.allocation.price : e.selling_plan_allocations[0].per_delivery_price;
                }
                if (this.productState.planSale) {
                    const t = s ? s.allocation.price : e.selling_plan_allocations[0].per_delivery_price;
                    (r = s ? s.allocation.compare_at_price : e.selling_plan_allocations[0].compare_at_price), (a = t);
                }
                o &&
                    (this.productState.onSale || this.productState.planSale ? (o.classList.remove(ls), n.classList.add(ds)) : (o.classList.add(ls), n.classList.remove(ds)),
                    (o.innerHTML = theme.settings.currency_code_enable ? i.formatMoney(r, theme.moneyWithCurrencyFormat) : i.formatMoney(r, theme.moneyFormat))),
                    (n.innerHTML = 0 === a ? window.theme.strings.free : theme.settings.currency_code_enable ? i.formatMoney(a, theme.moneyWithCurrencyFormat) : i.formatMoney(a, theme.moneyFormat));
            }),
                this.hasUnitPricing && this.updateProductUnits(t);
        }
        updateProductUnits(t) {
            const e = t.variant,
                s = t.plan;
            let o = null;
            if (
                (e && e.unit_price && (o = e.unit_price),
                s && (null == s ? void 0 : s.allocation) && (null == s ? void 0 : s.allocation.unit_price) && (o = s.allocation.unit_price),
                !s && e.selling_plan_allocations && e.selling_plan_allocations.length > 0)
            ) {
                o = e.selling_plan_allocations[0].unit_price;
            }
            if (o) {
                const t = this.getBaseUnit(e),
                    s = 0 === o ? window.theme.strings.free : i.formatMoney(o, theme.moneyFormat);
                (this.container.querySelector(ji).innerHTML = s), (this.container.querySelector(Ki).innerHTML = t), Xe(this.container.querySelector(Qi));
            } else Je(this.container.querySelector(Qi));
        }
        fireHookEvent(t) {
            const e = t.variant;
            this.container.dispatchEvent(new CustomEvent("theme:variant:change", { detail: { variant: e }, bubbles: !0 }));
        }
        setProductState(t) {
            const e = t.variant,
                i = t.plan,
                s = { available: !0, soldOut: !1, onSale: !1, showUnitPrice: !1, requiresPlan: !1, hasPlan: !1, planPerDelivery: !1, planSale: !1 };
            if (e) {
                const t = e.requires_selling_plan || !1;
                e.available || (s.soldOut = !0),
                    e.compare_at_price > e.price && (s.onSale = !0),
                    e.unit_price && (s.showUnitPrice = !0),
                    this.product && this.product.requires_selling_plan && (s.requiresPlan = !0),
                    i && this.subPrices && ((s.hasPlan = !0), i.allocation.per_delivery_price !== i.allocation.price && (s.planPerDelivery = !0), e.price > i.allocation.price && (s.planSale = !0)),
                    !i && t && ((s.hasPlan = !0), e.selling_plan_allocations[0].per_delivery_price !== e.selling_plan_allocations[0].price && (s.planPerDelivery = !0), e.price > e.selling_plan_allocations[0].price && (s.planSale = !0));
            } else s.available = !1;
            return s;
        }
        updateProductImage(t) {
            const i = t.dataset.variant;
            if (!i || !(null == i ? void 0 : i.featured_media)) return;
            const s = this.container.querySelector(`${Vi}[${ys}="${i.featured_media.id}"]`),
                o = null == s ? void 0 : s.closest($i);
            if (o) {
                const t = parseInt([...o.parentElement.children].indexOf(o)),
                    n = this.container.querySelector(Ri),
                    r = e.data(n);
                if (r && r.isActive) {
                    const t = n.querySelector(`[data-id="${i.featured_media.id}"]`);
                    if (t) {
                        const e = parseInt([...t.parentNode.children].indexOf(t));
                        r.select(e);
                    }
                    return;
                }
                if (this.tallLayout) {
                    const e = s.getBoundingClientRect().top;
                    if (0 === t && e + window.scrollY > window.pageYOffset) return;
                    document.dispatchEvent(new CustomEvent("theme:tooltip:close", { bubbles: !1, detail: { hideTransition: !1 } })),
                        ((t) => {
                            const e = document.querySelector(Ye) && document.querySelector(Ze) ? document.querySelector(Ze).getBoundingClientRect().height : 0;
                            window.scrollTo({ top: t + window.scrollY - e, left: 0, behavior: "smooth" });
                        })(e);
                }
            }
        }
        scrollToForm(t) {
            var e;
            const i = null === (e = document.querySelector(Hi)) || void 0 === e ? void 0 : e.dataset.height;
            visibilityHelper.isElementPartiallyVisible(t) ||
                visibilityHelper.isElementTotallyVisible(t) ||
                setTimeout(() => {
                    const e = t.getBoundingClientRect().top - i;
                    window.scrollTo({ top: e, left: 0, behavior: "smooth" });
                }, 400);
        }
        constructor(t) {
            if (
                ((this.container = t),
                (this.product = this.container.querySelector(Ci)),
                (this.productForm = this.container.querySelector(Ti)),
                (this.tallLayout = "true" === this.container.getAttribute(fs)),
                !this.product || !this.productForm)
            ) {
                return void new Pt(this.container).init();
            }
            (this.storeAvailabilityContainer = this.container.querySelector(ss)),
                (this.enableHistoryState = "true" === this.container.getAttribute(bs)),
                (this.hasUnitPricing = this.container.querySelector(Qi)),
                (this.subSelectors = this.container.querySelector(Xi)),
                (this.subPrices = this.container.querySelector(Gi)),
                (this.priceOffWrap = this.container.querySelector(Bi)),
                (this.priceOffAmount = this.container.querySelector(Wi)),
                (this.priceOffType = this.container.querySelector(zi)),
                (this.planDecription = this.container.querySelector(Zi)),
                (this.latestVariantId = ""),
                (this.latestVariantTitle = ""),
                (this.sellout = null),
                (this.sessionStorage = window.sessionStorage),
                (this.remainingWrapper = this.container.querySelector(es)),
                this.remainingWrapper &&
                    ((this.remainingMaxInt = parseInt(this.remainingWrapper.dataset.remainingMax, 10)),
                    (this.remainingCount = this.container.querySelector(ts)),
                    (this.remainingJSONWrapper = this.container.querySelector(is)),
                    (this.remainingJSON = null),
                    this.remainingJSONWrapper && "" !== this.remainingJSONWrapper.innerHTML && (this.remainingJSON = JSON.parse(this.remainingJSONWrapper.innerHTML))),
                this.storeAvailabilityContainer &&
                    (this.storeAvailability = new (class {
                        updateContent(t, e) {
                            this._fetchStoreAvailabilities(t, e);
                        }
                        clearContent() {
                            this.container.innerHTML = "";
                        }
                        _initModal() {
                            return new (class {
                                init() {
                                    this.openElement.addEventListener("click", this.open.bind(this)), this.modal.querySelector(this.config.close).addEventListener("click", this.closeModal.bind(this));
                                }
                                open(t) {
                                    let e = !1;
                                    if ((t ? t.preventDefault() : (e = !0), this.modalIsOpen && !e)) return void this.closeModal();
                                    this.modal.classList.add(this.config.openClass),
                                        this.nodes.parents.forEach((t) => {
                                            t.classList.add(this.config.openBodyClass);
                                        }),
                                        (this.modalIsOpen = !0);
                                    const i = document.querySelector(li);
                                    document.dispatchEvent(new CustomEvent("theme:scroll:lock", { bubbles: !0, detail: i })),
                                        this.config.scrollIntoView && this.scrollIntoView(),
                                        this.bindEvents(),
                                        this.a11y.trapFocus({ container: this.modal });
                                }
                                closeModal() {
                                    if (this.modalIsOpen) {
                                        document.activeElement.blur(), this.modal.classList.remove(this.config.openClass);
                                        var t = this;
                                        this.nodes.parents.forEach(function (e) {
                                            e.classList.remove(t.config.openBodyClass);
                                        }),
                                            (this.modalIsOpen = !1),
                                            this.openElement.focus(),
                                            this.unbindEvents(),
                                            this.a11y.removeTrapFocus({ container: this.modal }),
                                            document.dispatchEvent(new CustomEvent("theme:scroll:unlock", { bubbles: !0, detail: 400 }));
                                    }
                                }
                                bindEvents() {
                                    (this.keyupHandler = this.keyupHandler.bind(this)),
                                        (this.clickHandler = this.clickHandler.bind(this)),
                                        document.body.addEventListener("keyup", this.keyupHandler),
                                        document.body.addEventListener("click", this.clickHandler);
                                }
                                unbindEvents() {
                                    document.body.removeEventListener("keyup", this.keyupHandler), document.body.removeEventListener("click", this.clickHandler);
                                }
                                keyupHandler(t) {
                                    t.code === theme.keyboardKeys.ESCAPE && this.closeModal();
                                }
                                clickHandler(t) {
                                    !this.config.closeModalOnClick || this.modal.contains(t.target) || t.target.matches(this.config.open) || this.closeModal();
                                }
                                scrollIntoView() {
                                    this.focusOnOpen.scrollIntoView({ behavior: "smooth" });
                                }
                                constructor(t, e) {
                                    if (((this.modal = document.getElementById(t)), !this.modal)) return !1;
                                    (this.nodes = { parents: [document.querySelector("html"), document.body] }),
                                        (this.config = Object.assign(ci, e)),
                                        (this.modalIsOpen = !1),
                                        (this.focusOnOpen = this.config.focusOnOpen ? document.getElementById(this.config.focusOnOpen) : this.modal),
                                        (this.openElement = document.querySelector(this.config.open)),
                                        (this.a11y = Ft),
                                        this.init();
                                }
                            })("StoreAvailabilityModal", { close: pi, open: ui, closeModalOnClick: !0, openClass: gi, scrollIntoView: !1 });
                        }
                        _fetchStoreAvailabilities(t, e) {
                            const i = "/variants/" + t + "/?section_id=store-availability";
                            this.clearContent();
                            const s = this;
                            fetch(i)
                                .then(function (t) {
                                    return t.text();
                                })
                                .then(function (t) {
                                    const i = document.querySelector(hi);
                                    let o = i.querySelector(di);
                                    o && o.remove(),
                                        (s.container.innerHTML = t),
                                        (s.container.innerHTML = s.container.firstElementChild.innerHTML),
                                        "" !== s.container.firstElementChild.innerHTML.trim()
                                            ? s.container.querySelector(ui) && ((s.modal = s._initModal()), s._updateProductTitle(e), (o = s.container.querySelector(di)), o && i.appendChild(o))
                                            : s.clearContent();
                                });
                        }
                        _updateProductTitle(t) {
                            this.container.querySelector(mi).textContent = t;
                        }
                        constructor(t) {
                            this.container = t;
                        }
                    })(this.storeAvailabilityContainer));
            new Pt(this.container).init(), this.init();
        }
    };
    const Ss = {
        onLoad() {
            this.section = new Es(this.container);
        },
    };
    function Ls(t) {
        return t.replace(/http(s)?:/, "");
    }
    const ks = { color: "ash" },
        As = "[data-swatch]",
        qs = "[data-product-block]",
        Cs = "[data-product-image-secondary]",
        Ts = "[data-product-image-hover]",
        Ps = "[data-button-quick-view]",
        Fs = "[data-grid-image]",
        Is = "[data-grid-link]",
        Ds = "[data-load-hovers]",
        xs = "product__media--featured-visible",
        Hs = "product__media__hover-img--visible",
        Ms = "swatch__link--no-image",
        _s = "no-outline",
        Os = "data-swatch",
        Bs = "data-swatch-handle",
        zs = "data-swatch-label",
        Ws = "data-swatch-image",
        $s = "data-swatch-image-id",
        Vs = "data-swatch-variant",
        Rs = "data-swatch-index",
        Ns = "data-variant-id",
        Us = "data-loaded",
        js = "data-fetched-image",
        Ks = "data-fetched-image-index",
        Qs = "data-grid-image-default",
        Gs = "data-grid-image-target",
        Xs = "data-grid-image-target-default";
    let Js = {},
        Ys = class {
            init() {
                this.setStyles(), this.variant && this.outer && (this.handleHovers(), this.handleClicks()), !this.image && this.swatchLink && this.swatchLink.classList.add(Ms);
            }
            setStyles() {
                this.colorMatch && this.colorMatch.hex && this.element.style.setProperty("--swatch", `${this.colorMatch.hex}`),
                    this.colorMatch && this.colorMatch.path && this.element.style.setProperty("background-image", `url(${this.colorMatch.path})`);
            }
            handleHovers() {
                this.swatchLink.addEventListener("mouseenter", () => {
                    var t;
                    if (((this.imageReplace = null), this.imageId)) {
                        if (!this.outer.querySelector(`[${Gs}="${this.imageId}"]`) && ((this.gridImage = this.outer.querySelector(Fs)), this.image && this.gridImage)) {
                            const t = window.devicePixelRatio || 1,
                                e = this.gridImage.offsetWidth * t,
                                i = 180 * Math.ceil(e / 180);
                            if ((this.gridImage.hasAttribute(Xs) ? this.gridImage.getAttribute(Xs) : "") === this.imageId && this.gridImage.hasAttribute(Qs)) return void (this.imageReplace = this.gridImage.getAttribute(Qs));
                            if (this.element.hasAttribute(js)) this.imageReplace = this.element.getAttribute(js);
                            else {
                                const t = (function (t, e) {
                                    if (null === e) return t;
                                    if ((null == t && (t = window.theme.assets.noImage), "master" === e)) return Ls(t);
                                    const i = t.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif|webp)(\?v=\d+)?$/i);
                                    if (i) {
                                        const s = t.split(i[0]),
                                            o = i[0];
                                        return Ls(`${s[0]}_${e}${o}`);
                                    }
                                    return null;
                                })(this.image, `${i}x`);
                                window
                                    .fetch(t)
                                    .then((t) => t.blob())
                                    .then((t) => {
                                        const e = URL.createObjectURL(t);
                                        (this.imageReplace = `url("${e}")`),
                                            this.element.setAttribute(js, this.imageReplace),
                                            this.element.hasAttribute(Rs) &&
                                                this.outer.hasAttribute(Ks) &&
                                                parseInt(this.element.getAttribute(Rs)) === parseInt(this.outer.getAttribute(Ks)) &&
                                                (this.replaceImages(), this.outer.removeAttribute(Ks));
                                    })
                                    .catch((t) => {
                                        console.log(`Error: ${t}`);
                                    });
                            }
                        }
                    }
                    if (((this.loadHovers = this.outer.querySelector(Ds)), this.loadHovers && !(null === (t = this.loadHovers) || void 0 === t ? void 0 : t.hasAttribute(Us)))) {
                        const t = document.createElement("div");
                        t.appendChild(this.loadHovers.querySelector("template").content.firstElementChild.cloneNode(!0)), this.loadHovers.appendChild(t), this.loadHovers.setAttribute(Us, !0);
                    }
                });
            }
            handleClicks() {
                this.swatchLink.addEventListener("click", (t) => {
                    !document.body.classList.contains(_s) || (t.preventDefault(), this.updateImagesAndLinksOnEvent());
                }),
                    this.swatchLink.addEventListener("keyup", (t) => {
                        const e = !document.body.classList.contains(_s);
                        (t.code !== theme.keyboardKeys.ENTER && t.code !== theme.keyboardKeys.NUMPADENTER) ||
                            e ||
                            (t.preventDefault(), this.swatchLink.dispatchEvent(new Event("mouseenter", { bubbles: !0 })), this.updateImagesAndLinksOnEvent());
                    });
            }
            updateImagesAndLinksOnEvent() {
                this.updateLinks(), this.replaceImages();
            }
            updateLinks() {
                (this.linkElements = this.outer.querySelectorAll(Is)),
                    (this.quickView = this.outer.querySelector(Ps)),
                    this.linkElements.length &&
                        this.linkElements.forEach((t) => {
                            const e = ((i = t.getAttribute("href")), (s = this.variant), /variant=/.test(i) ? i.replace(/(variant=)[^&]+/, "$1" + s) : /\?/.test(i) ? i.concat("&variant=").concat(s) : i.concat("?variant=").concat(s));
                            var i, s;
                            t.setAttribute("href", e);
                        }),
                    this.quickView && "quick_buy" === theme.settings.quickBuy && this.quickView.setAttribute(Ns, this.variant);
            }
            replaceImages() {
                if (
                    ((this.imageSecondary = this.outer.querySelector(Cs)),
                    this.outer.removeAttribute(Ks),
                    !this.imageReplace && this.element.hasAttribute(Rs) && this.outer.setAttribute(Ks, parseInt(this.element.getAttribute(Rs))),
                    this.imageReplace && this.gridImage && this.imageId)
                ) {
                    this.gridImage.setAttribute(Gs, this.imageId), this.gridImage.hasAttribute(Qs) || this.gridImage.setAttribute(Qs, window.getComputedStyle(this.gridImage).backgroundImage);
                    const t = () => {
                        requestAnimationFrame(() => {
                            this.gridImage.style.setProperty("background-image", this.imageReplace),
                                requestAnimationFrame(() => {
                                    this.imageSecondary.classList.remove(xs);
                                });
                        }),
                            this.imageSecondary.removeEventListener("animationend", t);
                    };
                    requestAnimationFrame(() => {
                        this.imageSecondary.classList.add(xs), this.imageSecondary.style.setProperty("background-image", this.imageReplace);
                    }),
                        this.imageSecondary.addEventListener("animationend", t);
                }
                "image" === theme.settings.productGridHover && (this.hoverImages = this.outer.querySelectorAll(Ts)),
                    this.hoverImages.length > 1 &&
                        this.hoverImages.forEach((t) => {
                            t.classList.remove(Hs), t.getAttribute(Ns) === this.variant ? t.classList.add(Hs) : this.hoverImages[0].classList.add(Hs);
                        });
            }
            constructor(t) {
                (this.element = t),
                    (this.swatchLink = this.element.nextElementSibling),
                    (this.colorString = t.getAttribute(Os)),
                    (this.image = this.element.getAttribute(Ws)),
                    (this.imageId = this.element.getAttribute($s)),
                    (this.variant = this.element.getAttribute(Vs)),
                    (this.outer = this.element.closest(qs)),
                    (this.gridImage = null),
                    (this.imageDefault = null),
                    (this.hoverImages = []),
                    (this.loadHovers = null);
                const e = new (class {
                    getColor() {
                        return this.match;
                    }
                    init() {
                        return Dt({ json: theme.assets.swatches })
                            .then((t) => this.matchColors(t, this.settings.color))
                            .catch((t) => {
                                console.log("failed to load swatch colors script"), console.log(t);
                            });
                    }
                    matchColors(t, e) {
                        let i = "#E5E5E5",
                            s = null;
                        const o = theme.assets.base || "/",
                            n = e.toLowerCase().replace(/\s/g, ""),
                            r = t.colors;
                        if (r) {
                            let t = null;
                            if (
                                r.filter((e, i) => {
                                    if (Object.keys(e).toString().toLowerCase().replace(/\s/g, "") === n) return (t = i), e;
                                }).length &&
                                null !== t
                            ) {
                                const e = Object.values(r[t])[0];
                                (i = e), (e.includes(".jpg") || e.includes(".jpeg") || e.includes(".png") || e.includes(".svg")) && ((s = `${o}${e}`), (i = "#888888"));
                            }
                        }
                        return { color: this.settings.color, path: s, hex: i };
                    }
                    constructor(t = {}) {
                        (this.settings = { ...ks, ...t }), (this.match = this.init());
                    }
                })({ color: this.colorString });
                e.getColor().then((t) => {
                    (this.colorMatch = t), this.init();
                });
            }
        },
        Zs = class extends HTMLElement {
            init() {
                (this.swatchElements = this.querySelectorAll(As)),
                    this.swatchElements.forEach((t) => {
                        new Ys(t);
                    });
            }
            constructor() {
                super(),
                    (this.handle = this.getAttribute(Bs)),
                    (this.label = this.getAttribute(zs).trim().toLowerCase()),
                    (function (t) {
                        const e = `${theme.routes.root}products/${t}.js`;
                        return window
                            .fetch(e)
                            .then((t) => t.json())
                            .catch((t) => {
                                console.error(t);
                            });
                    })(this.handle).then((t) => {
                        (this.product = t), (this.colorOption = t.options.find((t) => t.name.toLowerCase() === this.label || null)), this.colorOption && ((this.swatches = this.colorOption.values), this.init());
                    });
            }
        };
    const to = (t) => {
            Js = [];
            t.querySelectorAll(As).forEach((t) => {
                Js.push(new Ys(t));
            });
        },
        eo = {
            onLoad() {
                to(this.container);
            },
        },
        io = "form",
        so = "[data-popout]",
        oo = "[data-popout-list]",
        no = "[data-popout-toggle]",
        ro = "[data-popout-input]",
        ao = "[data-popout-option]",
        lo = "[data-popout-text]",
        co = "[aria-current]",
        ho = "[data-product-image]",
        uo = "[data-product-grid-item]",
        po = "select-popout__list--visible",
        mo = "select-popout--alt",
        go = "--current",
        vo = "is-visible",
        yo = "aria-current",
        fo = "aria-expanded",
        bo = "data-value",
        wo = "data-popout-prevent",
        Eo = "data-quantity-field",
        So = "data-quick-view-item";
    let Lo = {},
        ko = class {
            unload() {
                this.popoutOptions.length &&
                    this.popoutOptions.forEach((t) => {
                        t.removeEventListener("theme:popout:click", this.popupOptionsClickEvent), t.removeEventListener("click", this._connectOptionsDispatchEvent);
                    }),
                    this.popoutToggle.removeEventListener("click", this.popupToggleClickEvent),
                    this.popoutToggle.removeEventListener("focusout", this.popupToggleFocusoutEvent),
                    this.popoutList.removeEventListener("focusout", this.popupListFocusoutEvent),
                    this.popout.removeEventListener("keyup", this.popoutKeyupEvent),
                    document.removeEventListener("theme:cart:update", this.updatePopout),
                    document.body.removeEventListener("click", this.bodyClick);
            }
            popupToggleClick(t) {
                const e = "true" === t.currentTarget.getAttribute(fo);
                if (this.popoutList.closest(uo)) {
                    const t = this.popoutList.closest(uo).querySelector(ho);
                    t && t.classList.toggle(vo, !e);
                }
                t.currentTarget.setAttribute(fo, !e), this.popoutList.classList.toggle(po);
            }
            popupToggleFocusout(t) {
                if (!t.relatedTarget) return;
                const e = this.popout.contains(t.relatedTarget),
                    i = t.relatedTarget.hasAttribute(So);
                e || i || this._hideList();
            }
            popupListFocusout(t) {
                const e = t.currentTarget.contains(t.relatedTarget);
                this.popoutList.classList.contains(po) && !e && this._hideList();
            }
            popupOptionsClick(t) {
                if ("#" === t.target.closest(ao).attributes.href.value) {
                    t.preventDefault();
                    let e = "";
                    if ((t.currentTarget.getAttribute(bo) && (e = t.currentTarget.getAttribute(bo)), (this.popoutInput.value = e), this.popoutPrevent)) {
                        this.popoutInput.dispatchEvent(new Event("change")), !t.detail.preventTrigger && this.popoutInput.hasAttribute(Eo) && this.popoutInput.dispatchEvent(new Event("input"));
                        const i = this.popoutList.querySelector(`[class*="${go}"]`);
                        let s = go;
                        if (i && i.classList.length)
                            for (const t of i.classList)
                                if (t.includes(go)) {
                                    s = t;
                                    break;
                                }
                        const o = this.popoutList.querySelector(`.${s}`);
                        o && (o.classList.remove(`${s}`), t.currentTarget.parentElement.classList.add(`${s}`));
                        const n = this.popoutList.querySelector(co);
                        n && (n.removeAttribute(yo), t.currentTarget.setAttribute(yo, "true")), "" !== e && (this.popoutText.textContent = e), this.popupToggleFocusout(t), this.popupListFocusout(t);
                    } else this._submitForm(e);
                }
            }
            updatePopout() {
                const t = this.popoutList.querySelector(`[${bo}="${this.popoutInput.value}"]`);
                t ? (t.dispatchEvent(new CustomEvent("theme:popout:click", { cancelable: !0, bubbles: !0, detail: { preventTrigger: !0 } })), t.parentElement.nextSibling || this.popout.classList.add(mo)) : this.popout.classList.add(mo);
            }
            popoutKeyup(t) {
                t.code === theme.keyboardKeys.ESCAPE && (this._hideList(), this.popoutToggle.focus());
            }
            bodyClick(t) {
                const e = this.popout.contains(t.target);
                this.popoutList.classList.contains(po) && !e && this._hideList();
            }
            _connectToggle() {
                this.popoutToggle.addEventListener("click", this.popupToggleClickEvent);
            }
            _connectOptions() {
                this.popoutOptions.length &&
                    this.popoutOptions.forEach((t) => {
                        t.addEventListener("theme:popout:click", this.popupOptionsClickEvent), t.addEventListener("click", this._connectOptionsDispatchEvent);
                    });
            }
            _connectOptionsDispatch(t) {
                const e = new CustomEvent("theme:popout:click", { cancelable: !0, bubbles: !0, detail: { preventTrigger: !1 } });
                t.target.dispatchEvent(e) || t.preventDefault();
            }
            _onFocusOut() {
                this.popoutToggle.addEventListener("focusout", this.popupToggleFocusoutEvent),
                    this.popoutList.addEventListener("focusout", this.popupListFocusoutEvent),
                    this.popout.addEventListener("keyup", this.popoutKeyupEvent),
                    document.body.addEventListener("click", this.bodyClick);
            }
            _submitForm() {
                const t = this.popout.closest(io);
                t && t.submit();
            }
            _hideList() {
                this.popoutList.classList.remove(po), this.popoutToggle.setAttribute(fo, !1);
            }
            constructor(t) {
                (this.popout = t),
                    (this.popoutList = this.popout.querySelector(oo)),
                    (this.popoutToggle = this.popout.querySelector(no)),
                    (this.popoutText = this.popout.querySelector(lo)),
                    (this.popoutInput = this.popout.querySelector(ro)),
                    (this.popoutOptions = this.popout.querySelectorAll(ao)),
                    (this.popoutPrevent = "true" === this.popout.getAttribute(wo)),
                    (this.popupToggleFocusoutEvent = (t) => this.popupToggleFocusout(t)),
                    (this.popupListFocusoutEvent = (t) => this.popupListFocusout(t)),
                    (this.popupToggleClickEvent = (t) => this.popupToggleClick(t)),
                    (this.popoutKeyupEvent = (t) => this.popoutKeyup(t)),
                    (this.popupOptionsClickEvent = (t) => this.popupOptionsClick(t)),
                    (this._connectOptionsDispatchEvent = (t) => this._connectOptionsDispatch(t)),
                    (this.bodyClick = this.bodyClick.bind(this)),
                    (this.updatePopout = this.updatePopout.bind(this)),
                    this._connectOptions(),
                    this._connectToggle(),
                    this._onFocusOut(),
                    this.popoutInput && this.popoutInput.hasAttribute(Eo) && document.addEventListener("theme:cart:update", this.updatePopout);
            }
        };
    const Ao = {
            onLoad() {
                Lo[this.id] = [];
                this.container.querySelectorAll(so).forEach((t) => {
                    Lo[this.id].push(new ko(t));
                });
            },
            onUnload() {
                Lo[this.id].forEach((t) => {
                    "function" == typeof t.unload && t.unload();
                });
            },
        },
        qo = "[data-tooltip]",
        Co = "[data-tooltip-container]",
        To = "[data-tooltip-arrow]",
        Po = "[data-aos]",
        Fo = "tooltip-default",
        Io = "is-animating",
        Do = "is-visible",
        xo = "is-hiding",
        Ho = "data-tooltip",
        Mo = "data-tooltip-container",
        _o = "data-tooltip-stop-mouseenter",
        Oo = {};
    let Bo = class {
        init() {
            if (!document.querySelector(Co)) {
                const t = `<div class="${this.rootClass}__inner"><div class="${this.rootClass}__arrow" data-tooltip-arrow></div><div class="${this.rootClass}__text"></div></div>`,
                    e = document.createElement("div");
                (e.className = `${this.rootClass} ${this.isAnimatingClass}`), e.setAttribute(Mo, ""), (e.innerHTML = t), document.body.appendChild(e);
            }
            this.tooltip.addEventListener("mouseenter", this.addPinMouseEvent),
                this.tooltip.addEventListener("mouseleave", this.removePinMouseEvent),
                this.tooltip.addEventListener("theme:tooltip:init", this.addPinEvent),
                document.addEventListener("theme:tooltip:close", this.removePinEvent);
            const t = document.querySelector(Co);
            theme.settings.animations &&
                this.animatedContainer &&
                this.animatedContainer.addEventListener("transitionend", (e) => {
                    "transform" === e.propertyName && t.classList.remove(Io);
                });
        }
        addPin(t = !1) {
            const e = document.querySelector(Co),
                i = e.querySelector(To);
            if (e && ((t && !this.tooltip.hasAttribute(_o)) || !t)) {
                const t = e.querySelector(`.${this.rootClass}__inner`);
                e.querySelector(`.${this.rootClass}__text`).textContent = this.label;
                const s = t.offsetWidth,
                    o = this.tooltip.getBoundingClientRect(),
                    n = o.top,
                    r = o.width,
                    a = n + o.height + window.scrollY;
                let l = o.left - s / 2 + r / 2,
                    c = "50%";
                const h = l + s - window.innerWidth;
                h > 0 && (l -= h),
                    l < 0 && ((c = `calc(50% + ${l}px)`), (l = 0)),
                    (i.style.left = c),
                    (e.style.transform = `translate(${l}px, ${a}px)`),
                    e.classList.remove(xo),
                    e.classList.add(Do),
                    document.addEventListener("theme:scroll", this.removePinEvent);
            }
        }
        removePin(t, e = !1, i = !1) {
            const s = document.querySelector(Co),
                o = s.classList.contains(Do);
            s &&
                ((e && !this.tooltip.hasAttribute(_o)) || !e) &&
                (o &&
                    (i || t.detail.hideTransition) &&
                    (s.classList.add(xo),
                    this.hideTransitionTimeout && clearTimeout(this.hideTransitionTimeout),
                    (this.hideTransitionTimeout = setTimeout(() => {
                        s.classList.remove(xo);
                    }, this.transitionSpeed))),
                s.classList.remove(Do),
                (s.style.transform = "translate(100%, 0)"),
                document.removeEventListener("theme:scroll", this.removePinEvent));
        }
        unload() {
            this.tooltip.removeEventListener("mouseenter", this.addPinMouseEvent),
                this.tooltip.removeEventListener("mouseleave", this.removePinMouseEvent),
                this.tooltip.removeEventListener("theme:tooltip:init", this.addPinEvent),
                document.removeEventListener("theme:tooltip:close", this.removePinEvent),
                document.removeEventListener("theme:scroll", this.removePinEvent);
        }
        constructor(t) {
            (this.tooltip = t),
                this.tooltip.hasAttribute(Ho) &&
                    ((this.rootClass = Fo),
                    (this.isAnimatingClass = Io),
                    (this.label = this.tooltip.getAttribute(Ho)),
                    (this.transitionSpeed = 200),
                    (this.hideTransitionTimeout = 0),
                    (this.animatedContainer = this.tooltip.closest(Po)),
                    (this.addPinEvent = () => this.addPin()),
                    (this.addPinMouseEvent = () => this.addPin(!0)),
                    (this.removePinEvent = (t) => lt(this.removePin(t), 50)),
                    (this.removePinMouseEvent = (t) => this.removePin(t, !0, !0)),
                    this.init());
        }
    };
    const zo = {
            onLoad() {
                Oo[this.id] = [];
                this.container.querySelectorAll(qo).forEach((t) => {
                    Oo[this.id].push(new Bo(t));
                });
            },
            onUnload() {
                Oo[this.id].forEach((t) => {
                    "function" == typeof t.unload && t.unload();
                });
            },
        },
        Wo = "[data-add-to-cart]",
        $o = "[data-deferred-media]",
        Vo = "[data-deferred-media-button]",
        Ro = "[data-popup-close]",
        No = "[data-popout]",
        Uo = "[data-quick-view-inner]",
        jo = "[data-quick-view-item-holder]",
        Ko = "[data-product]",
        Qo = "[data-product-form]",
        Go = "[data-product-single-media-slider]",
        Xo = "[data-product-single-media-wrapper]",
        Jo = "[data-model]",
        Yo = "[data-product-json]",
        Zo = "[data-quick-view-foot-inner]",
        tn = "[data-shop-the-look-thumb]",
        en = "[data-tooltip]",
        sn = "[data-drawer-toggle]",
        on = "has-media-active",
        nn = "is-active",
        rn = "is-loading",
        an = "media--hidden",
        ln = "no-outline",
        cn = "notification-popup-visible",
        hn = "popup-quick-view--animate-in",
        dn = "popup-quick-view--animate-out",
        un = "popup-quick-view--animated",
        pn = "popup-quick-view",
        mn = "js-quick-view-visible",
        gn = "js-quick-view-from-cart",
        vn = "js-drawer-open",
        yn = "id",
        fn = "data-media-id",
        bn = "data-section-id",
        wn = "loaded",
        En = "tabindex",
        Sn = "data-quick-view-onboarding",
        Ln = "data-hotspot",
        kn = "data-hotspot-ref",
        An = "AddToCartForm--",
        qn = "AddToCart--";
    const Cn = 400,
        Tn = ".pswp",
        Pn = ".pswp__custom-close",
        Fn = "iframe, video",
        In = ".pswp__custom-iframe",
        Dn = ".pswp__thumbs",
        xn = ".pswp__button, .pswp__caption-close",
        Hn = "is-current",
        Mn = "pswp--custom-loader",
        _n = "pswp--custom-opening",
        On = "pswp__loader",
        Bn = "pswp--open",
        zn = "pswp__button--close",
        Wn = "pswp--notification",
        $n = "popup-quick-view",
        Vn = "js-drawer-open-cart",
        Rn = "popup-quick-view--animate-out",
        Nn = "data-pswp-option-classes",
        Un = "data-video-type",
        jn = `<div class="${On}"><div class="loader loader--image"><div class="loader__image"></div></div></div>`;
    let Kn = class {
        init() {
            document.dispatchEvent(new CustomEvent("theme:scroll:lock", { bubbles: !0 })),
                this.pswpElement.classList.add(_n),
                this.initLoader(),
                Dt({ url: window.theme.assets.photoswipe })
                    .then(() => this.loadPopup())
                    .catch((t) => console.error(t));
        }
        initLoader() {
            if (this.pswpElement.classList.contains(Mn) && "" !== this.options && this.options.mainClass) {
                this.pswpElement.setAttribute(Nn, this.options.mainClass);
                let t = document.createElement("div");
                (t.innerHTML = jn), (t = t.firstChild), this.pswpElement.appendChild(t);
            } else this.pswpElement.setAttribute(Nn, "");
        }
        loadPopup() {
            const t = window.themePhotoswipe.PhotoSwipe.default,
                e = window.themePhotoswipe.PhotoSwipeUI.default;
            this.pswpElement.classList.contains(Mn) && this.pswpElement.classList.remove(Mn),
                this.pswpElement.classList.remove(_n),
                (this.popup = new t(this.pswpElement, e, this.items, this.options)),
                this.popup.listen("afterInit", this.dispatchPopupInitEventCallback),
                this.popup.listen("imageLoadComplete", this.setCurrentThumbCallback),
                this.popup.listen("beforeChange", this.setCurrentThumbCallback),
                this.popup.listen("close", this.onCloseCallback),
                this.popup.init(),
                this.initPopupCallback();
        }
        initPopupCallback() {
            this.isVideo && this.hideUnusedButtons(),
                this.initVideo(),
                this.thumbsActions(),
                this.a11y.trapFocus({ container: this.pswpElement }),
                this.pswpElement.classList.contains($n) &&
                    new (class {
                        initTooltips() {
                            (this.tooltips = this.pswpElement.querySelectorAll(en)),
                                this.tooltips.forEach((t) => {
                                    new Bo(t);
                                });
                        }
                        initPopouts() {
                            var t;
                            (this.popoutElements = this.pswpElement.querySelectorAll(No)),
                                (this.popouts = {}),
                                null === (t = this.popoutElements) ||
                                    void 0 === t ||
                                    t.forEach((t, e) => {
                                        this.popouts[e] = new ko(t);
                                    });
                        }
                        handleDraggable(t, e) {
                            t && ((t.options.draggable = Boolean(e)), t.updateDraggable());
                        }
                        initItems(t, e) {
                            this.addFormSuffix(t), this.initProductSlider(t, e), this.initProductVideo(t), this.initProductModel(t), this.initShopifyXrLaunch(t), to(t), this.pswpElement.querySelectorAll(sn).length && new Qe(t), W(t);
                            const i = new Es(t.parentNode);
                            this.productForms.push(i), Shopify.PaymentButton && Shopify.PaymentButton.init(), t.classList.remove(rn);
                        }
                        init() {
                            document.addEventListener("submit", this.prevent3dModelSubmitEvent),
                                this.popupCloseButtons.forEach((t) => {
                                    t.addEventListener("keyup", (t) => {
                                        (t.code !== theme.keyboardKeys.ENTER && t.code !== theme.keyboardKeys.NUMPADENTER && t.code !== theme.keyboardKeys.SPACE) || this.closePopup(t);
                                    }),
                                        t.addEventListener("click", (t) => {
                                            this.closePopup(t);
                                        });
                                }),
                                this.pswpElement.addEventListener("click", this.outerCloseEvent),
                                document.dispatchEvent(new CustomEvent("theme:popup:open", { bubbles: !0 })),
                                this.popup.listen("preventDragEvent", (t, e, i) => {
                                    i.prevent = !1;
                                }),
                                this.pswpElement.addEventListener("mousedown", () => {
                                    this.popup.framework.unbind(window, "pointermove pointerup pointercancel", this.popup);
                                }),
                                this.popup.listen("initialZoomInEnd", () => {
                                    document.body.classList.add(mn), this.a11y.trapFocus({ container: this.quickViewInner });
                                }),
                                this.pswpElement.addEventListener("animationend", this.closeOnAnimationEndEvent),
                                this.popup.listen("destroy", () => {
                                    this.flkty.length > 0 &&
                                        requestAnimationFrame(() => {
                                            this.flkty.forEach((t) => t.pausePlayer());
                                        }),
                                        document.body.classList.remove(mn),
                                        document.removeEventListener("keyup", this.closeOnEscapeEvent),
                                        document.addEventListener("keyup", this.closeOnEscapeEvent),
                                        this.pswpElement.removeEventListener("click", this.outerCloseEvent),
                                        this.pswpElement.removeEventListener("animationend", this.closeOnAnimationEndEvent),
                                        document.removeEventListener("submit", this.prevent3dModelSubmitEvent),
                                        this.deferredMedias.forEach((t) => {
                                            t.removeAttribute(wn);
                                        });
                                }),
                                document.addEventListener("keyup", this.closeOnEscapeEvent),
                                document.addEventListener("theme:cart:added", () => {
                                    this.pswpElement.classList.contains(pn) && this.pswpElement.classList.add(dn);
                                }),
                                this.animateInQuickview(),
                                this.initShopTheLookListeners();
                        }
                        initShopTheLookListeners() {
                            var t;
                            null === (t = this.buttonsShopTheLookThumb) ||
                                void 0 === t ||
                                t.forEach((t) => {
                                    t.addEventListener("click", (t) => {
                                        t.preventDefault();
                                        const e = t.target.matches(tn) ? t.target : t.target.closest(tn),
                                            i = this.pswpElement.querySelector(`[${Ln}="${e.getAttribute(kn)}"]`);
                                        !e.classList.contains(nn) &&
                                            i &&
                                            (this.flkty.length > 0 &&
                                                requestAnimationFrame(() => {
                                                    this.flkty.forEach((t) => {
                                                        t.resize();
                                                        const e = this.quickViewInner.querySelectorAll(Xo);
                                                        e.length &&
                                                            e.forEach((t) => {
                                                                t.dispatchEvent(new CustomEvent("theme:media:hidden"), { bubbles: !0 }), t.classList.add(an);
                                                            });
                                                    });
                                                }),
                                            i.classList.add(nn),
                                            this.quickViewItemHolders.forEach((t) => {
                                                t !== i && t.classList.remove(nn);
                                            }));
                                    });
                                });
                        }
                        prevent3dModelSubmit(t) {
                            t.submitter.closest($o) && t.submitter.closest(Qo) && t.preventDefault();
                        }
                        closeQuickviewOnMobile() {
                            window.innerWidth < window.theme.sizes.large && document.body.classList.contains(mn) && this.popup.close();
                        }
                        animateInQuickview() {
                            this.pswpElement.classList.add(hn),
                                this.quickViewFoot.addEventListener("animationend", (t) => {
                                    this.handleAnimatedState(t);
                                }),
                                this.pswpElement.addEventListener("animationend", (t) => {
                                    this.handleAnimatedState(t, !0);
                                });
                        }
                        handleAnimatedState(t, e = !1) {
                            if ("quickViewAnimateInUp" == t.animationName) {
                                if (e && window.innerWidth >= window.theme.sizes.small) return;
                                this.pswpElement.classList.add(un), this.pswpElement.classList.remove(hn), document.body.classList.remove(gn);
                            }
                        }
                        closePopup(t) {
                            null == t || t.preventDefault(),
                                document.body.classList.contains(vn) && document.dispatchEvent(new CustomEvent("theme:drawer:closing", { bubbles: !0 })),
                                this.pswpElement.classList.add(dn),
                                this.productForms.length > 0 &&
                                    this.productForms.forEach((t) => {
                                        t.destroy();
                                    });
                        }
                        closeOnAnimationEnd(t) {
                            ("quickViewAnimateOutRight" != t.animationName && "quickViewAnimateOutDown" != t.animationName) || (this.popup.template.classList.remove(dn, un), this.popup.close());
                        }
                        closeOnEscape(t) {
                            const e = document.body.classList.contains(mn),
                                i = document.body.classList.contains(cn);
                            t.code === theme.keyboardKeys.ESCAPE && e && !i && this.closePopup(t);
                        }
                        initProductSlider(t, i) {
                            const s = t.querySelector(Go),
                                o = t.querySelectorAll(Xo);
                            if (o.length > 1) {
                                const n = new e(s, {
                                    wrapAround: !0,
                                    cellAlign: "left",
                                    pageDots: !1,
                                    prevNextButtons: !0,
                                    adaptiveHeight: !1,
                                    pauseAutoPlayOnHover: !1,
                                    selectedAttraction: 0.2,
                                    friction: 1,
                                    autoPlay: !1,
                                    on: {
                                        ready: () => {
                                            s.setAttribute(En, "-1"),
                                                requestAnimationFrame(() => {
                                                    n.resize();
                                                });
                                        },
                                        settle: () => {
                                            const e = n.selectedElement,
                                                i = e.getAttribute(fn);
                                            e.setAttribute(En, "0"),
                                                n.cells.forEach((t) => {
                                                    t.element !== e && t.element.setAttribute(En, "-1");
                                                }),
                                                this.switchMedia(t, i);
                                        },
                                    },
                                });
                                this.flkty.push(n),
                                    o.length &&
                                        o.forEach((t) => {
                                            t.addEventListener("theme:media:play", () => {
                                                this.handleDraggable(this.flkty[i], !1), t.closest(Go).classList.add(on);
                                            }),
                                                t.addEventListener("theme:media:pause", () => {
                                                    this.handleDraggable(this.flkty[i], !0), t.closest(Go).classList.remove(on);
                                                });
                                        }),
                                    te(s);
                            }
                        }
                        switchMedia(t, e) {
                            const i = this.quickViewInner.querySelectorAll(Xo),
                                s = t.querySelector(`${Xo}[${fn}="${e}"]`),
                                o = !document.body.classList.contains(ln);
                            i.length &&
                                i.forEach((t) => {
                                    t.dispatchEvent(new CustomEvent("theme:media:hidden"), { bubbles: !0 }), t.classList.add(an);
                                }),
                                o && s.focus(),
                                s.closest(Go).classList.remove(on),
                                s.classList.remove(an),
                                s.dispatchEvent(new CustomEvent("theme:media:visible"), { bubbles: !0 });
                            const n = s.querySelector($o);
                            n && "true" !== n.getAttribute(wn) && s.querySelector(Vo).dispatchEvent(new Event("click"));
                        }
                        initProductVideo(t) {
                            const e = new me(t);
                            this.videos.push(e);
                        }
                        initProductModel(t) {
                            const e = t.getAttribute(bn),
                                i = t.querySelectorAll(Jo);
                            i.length &&
                                i.forEach((t) => {
                                    theme.ProductModel.init(t, e);
                                });
                        }
                        initShopifyXrLaunch(t) {
                            document.addEventListener("shopify_xr_launch", () => {
                                t.querySelector(`${Jo}:not(.${an})`).dispatchEvent(new CustomEvent("xrLaunch"));
                            });
                        }
                        addFormSuffix(t) {
                            const e = `${t.getAttribute(bn)}-${JSON.parse(t.querySelector(Yo).innerHTML).handle}`,
                                i = t.querySelector(Qo),
                                s = t.querySelector(Wo);
                            i.setAttribute(yn, An + e), s.setAttribute(yn, qn + e);
                        }
                        constructor(t, e) {
                            (this.popup = t),
                                (this.pswpElement = e),
                                (this.quickViewFoot = this.pswpElement.querySelector(Zo)),
                                (this.quickViewInner = this.pswpElement.querySelector(Uo)),
                                (this.product = this.pswpElement.querySelectorAll(Ko)),
                                (this.flkty = []),
                                (this.videos = []),
                                (this.productForms = []),
                                (this.deferredMedias = this.pswpElement.querySelectorAll($o)),
                                (this.buttonsShopTheLookThumb = this.pswpElement.querySelectorAll(tn)),
                                (this.quickViewItemHolders = this.pswpElement.querySelectorAll(jo)),
                                (this.popupCloseButtons = this.quickViewInner.querySelectorAll(Ro)),
                                (this.a11y = Ft),
                                (this.prevent3dModelSubmitEvent = (t) => this.prevent3dModelSubmit(t)),
                                (this.closeOnAnimationEndEvent = (t) => this.closeOnAnimationEnd(t)),
                                (this.closeOnEscapeEvent = (t) => this.closeOnEscape(t)),
                                (this.outerCloseEvent = (t) => {
                                    if (!this.quickViewInner.contains(t.target)) {
                                        const e = this.quickViewInner.nextElementSibling;
                                        if (e && e.contains(t.target)) return;
                                        this.closePopup(t);
                                    }
                                }),
                                this.product.forEach((t, e) => {
                                    t.hasAttribute(Sn) || this.initItems(t, e);
                                }),
                                this.init(),
                                this.initTooltips(),
                                this.initPopouts();
                        }
                    })(this.popup, this.pswpElement),
                this.pswpElement.classList.contains(Wn) &&
                    new (class {
                        init() {
                            this.popup.listen("preventDragEvent", (t, e, i) => {
                                i.prevent = !1;
                            });
                            const t = -1 !== window.location.search.indexOf("?customer_posted=true");
                            this.notificationForm = this.pswpElement.querySelector(Gt);
                            const e = this.pswpElement.querySelector(Jt);
                            document.body.classList.add(Zt),
                                this.pswpElement.addEventListener("mousedown", () => {
                                    this.popup.framework.unbind(window, "pointermove pointerup pointercancel", this.popup);
                                }),
                                t && this.pswpElement.classList.add(Yt),
                                this.notificationForm.addEventListener("submit", (t) => this.notificationSubmitEvent(t)),
                                this.pswpElement.addEventListener("click", this.outerCloseEvent),
                                e.addEventListener("click", () => {
                                    this.popup.close();
                                }),
                                this.popup.listen("destroy", () => {
                                    this.notificationRemoveStorage(), this.pswpElement.removeEventListener("click", this.outerCloseEvent), document.body.classList.remove(Zt);
                                });
                        }
                        notificationSubmitEvent(t) {
                            this.notificationStopSubmit && (t.preventDefault(), this.notificationRemoveStorage(), this.notificationWriteStorage(), (this.notificationStopSubmit = !1), this.notificationForm.submit());
                        }
                        notificationWriteStorage() {
                            void 0 !== this.sessionStorage && this.sessionStorage.setItem("notification_form_id", this.notificationForm.id);
                        }
                        notificationRemoveStorage() {
                            this.sessionStorage.removeItem("notification_form_id");
                        }
                        constructor(t, e) {
                            (this.popup = t), (this.pswpElement = e), (this.notificationForm = null), (this.notificationStopSubmit = !0), (this.sessionStorage = window.sessionStorage);
                            const i = this.pswpElement.querySelector(Xt);
                            (this.outerCloseEvent = (t) => {
                                i.contains(t.target) || this.popup.close();
                            }),
                                this.init();
                        }
                    })(this.popup, this.pswpElement),
                (this.closePopup = () => {
                    this.pswpElement.classList.contains($n) ? this.pswpElement.classList.add(Rn) : this.popup.close();
                }),
                this.closeBtn && this.closeBtn.addEventListener("click", this.closePopup),
                document.addEventListener("theme:cart:added", this.closePopup);
        }
        dispatchPopupInitEvent() {
            this.triggerBtn && this.triggerBtn.dispatchEvent(new CustomEvent("theme:popup:init", { bubbles: !0 }));
        }
        initVideo() {
            const t = this.pswpElement.querySelector(In);
            if (t) {
                const e = t.getAttribute(Un);
                (this.isVideo = !0),
                    "youtube" == e
                        ? new (class {
                              init() {
                                  window.isYoutubeAPILoaded ? this.loadYoutubePlayer() : Dt({ url: "https://www.youtube.com/iframe_api" }).then(() => this.loadYoutubePlayer());
                              }
                              loadYoutubePlayer() {
                                  const t = {
                                      height: "720",
                                      width: "1280",
                                      playerVars: this.videoOptionsVars,
                                      events: {
                                          onReady: (t) => {
                                              const e = t.target.getIframe(),
                                                  i = e.id,
                                                  s = "true" === document.querySelector(`#${i}`).getAttribute(Rt);
                                              e.setAttribute("tabindex", "-1"),
                                                  s ? t.target.unMute() : t.target.mute(),
                                                  t.target.playVideo(),
                                                  this.checkPlayerVisibilityFlag &&
                                                      (this.checkPlayerVisibility(i),
                                                      window.addEventListener(
                                                          "scroll",
                                                          lt(() => {
                                                              this.checkPlayerVisibility(i);
                                                          }, 150)
                                                      ));
                                          },
                                          onStateChange: (t) => {
                                              0 == t.data && t.target.playVideo(), 1 == t.data && t.target.getIframe().parentElement.classList.add(Kt);
                                          },
                                      },
                                  };
                                  (t.videoId = this.videoID),
                                      this.videoID.length &&
                                          YT.ready(() => {
                                              Qt[this.playerID] = new YT.Player(this.playerID, t);
                                          }),
                                      (window.isYoutubeAPILoaded = !0);
                              }
                              checkPlayerVisibility(t) {
                                  let e;
                                  if ("string" == typeof t) e = t;
                                  else {
                                      if (null == t.data) return;
                                      e = t.data.id;
                                  }
                                  const i = document.getElementById(e + "-container");
                                  if (!i) return;
                                  const s = Qt[e],
                                      o = i.getBoundingClientRect();
                                  let n = visibilityHelper.isElementPartiallyVisible(i) || visibilityHelper.isElementTotallyVisible(i);
                                  o.top < 0 && i.clientHeight + o.top >= 0 && (n = !0), n && s && "function" == typeof s.playVideo ? s.playVideo() : !n && s && "function" == typeof s.pauseVideo && s.pauseVideo();
                              }
                              onUnload() {
                                  const t = "youtube-" + this.container.getAttribute(Vt);
                                  Qt[t] && Qt[t].destroy();
                              }
                              constructor(t) {
                                  (this.container = t),
                                      (this.player = this.container.querySelector($t.videoIframe)),
                                      this.player &&
                                          ((this.videoOptionsVars = {}),
                                          (this.videoID = this.player.getAttribute(Ut)),
                                          (this.videoType = this.player.getAttribute(jt)),
                                          "youtube" == this.videoType &&
                                              ((this.checkPlayerVisibilityFlag = "true" === this.player.getAttribute(Nt)),
                                              (this.playerID = this.player.querySelector($t.youtubeWrapper) ? this.player.querySelector($t.youtubeWrapper).id : this.player.id),
                                              this.player.hasAttribute($t.dataHideOptions) &&
                                                  (this.videoOptionsVars = { cc_load_policy: 0, iv_load_policy: 3, modestbranding: 1, playsinline: 1, autohide: 0, controls: 0, branding: 0, showinfo: 0, rel: 0, fs: 0, wmode: "opaque" }),
                                              this.init(),
                                              this.container.addEventListener(
                                                  "touchstart",
                                                  function (t) {
                                                      if (t.target.matches($t.videoWrapper) || t.target.closest($t.videoWrapper)) {
                                                          const e = t.target.querySelector($t.videoIframe).id;
                                                          Qt[e].playVideo();
                                                      }
                                                  },
                                                  { passive: !0 }
                                              )));
                              }
                          })(t.parentElement)
                        : "vimeo" == e &&
                          new (class {
                              init() {
                                  this.loadVimeoPlayer();
                              }
                              loadVimeoPlayer() {
                                  const t = "https://vimeo.com/" + this.videoID;
                                  let e = "";
                                  const i = this.player,
                                      s = { url: t, background: this.enableBackground, muted: this.disableSound, autoplay: this.enableAutoplay, loop: this.enableLoop };
                                  for (let t in s) e += encodeURIComponent(t) + "=" + encodeURIComponent(s[t]) + "&";
                                  fetch(`https://vimeo.com/api/oembed.json?${e}`)
                                      .then((t) => t.json())
                                      .then(function (t) {
                                          (i.innerHTML = t.html),
                                              setTimeout(function () {
                                                  i.parentElement.classList.add(Ht);
                                              }, 1e3);
                                      })
                                      .catch(function () {
                                          console.log("error");
                                      });
                              }
                              constructor(t) {
                                  (this.container = t),
                                      (this.player = this.container.querySelector(xt)),
                                      this.player &&
                                          ((this.videoID = this.player.getAttribute(zt)),
                                          (this.videoType = this.player.getAttribute(Wt)),
                                          (this.enableBackground = "true" === this.player.getAttribute(_t)),
                                          (this.disableSound = "false" === this.player.getAttribute(Mt)),
                                          (this.enableAutoplay = "false" !== this.player.getAttribute(Ot)),
                                          (this.enableLoop = "false" !== this.player.getAttribute(Bt)),
                                          "vimeo" == this.videoType && this.init());
                              }
                          })(t.parentElement);
            }
        }
        thumbsActions() {
            this.popupThumbsContainer &&
                this.popupThumbsContainer.firstChild &&
                (this.popupThumbsContainer.addEventListener("wheel", (t) => this.stopDisabledScroll(t)),
                this.popupThumbsContainer.addEventListener("mousewheel", (t) => this.stopDisabledScroll(t)),
                this.popupThumbsContainer.addEventListener("DOMMouseScroll", (t) => this.stopDisabledScroll(t)),
                (this.popupThumbs = this.pswpElement.querySelectorAll(`${Dn} > *`)),
                this.popupThumbs.forEach((t, e) => {
                    t.addEventListener("click", (i) => {
                        i.preventDefault(), t.parentElement.querySelector(`.${Hn}`).classList.remove(Hn), t.classList.add(Hn), this.popup.goTo(e);
                    });
                }));
        }
        hideUnusedButtons() {
            this.pswpElement.querySelectorAll(xn).forEach((t) => {
                t.classList.contains(zn) || (t.style.display = "none");
            });
        }
        stopDisabledScroll(t) {
            t.stopPropagation();
        }
        onClose() {
            const t = this.pswpElement.querySelector(Fn);
            if ((t && t.parentNode.removeChild(t), this.popupThumbsContainer && this.popupThumbsContainer.firstChild))
                for (; this.popupThumbsContainer.firstChild; ) this.popupThumbsContainer.removeChild(this.popupThumbsContainer.firstChild);
            this.pswpElement.setAttribute(Nn, "");
            const e = this.pswpElement.querySelector(`.${On}`);
            e && this.pswpElement.removeChild(e),
                document.body.classList.contains(Vn) || this.a11y.removeTrapFocus(),
                document.removeEventListener("theme:cart:added", this.closePopup),
                setTimeout(() => {
                    const t = this.recentlyOpenedPopupsCount(),
                        e = document.body.classList.contains(Vn);
                    0 !== t || e || document.dispatchEvent(new CustomEvent("theme:scroll:unlock", { bubbles: !0 }));
                }, Cn);
        }
        recentlyOpenedPopupsCount() {
            let t = 0;
            return (
                this.pswpElements.forEach((e) => {
                    e.classList.contains(Bn) && (t += 1);
                }),
                t
            );
        }
        setCurrentThumb() {
            if (this.popupThumbsContainer && this.popupThumbsContainer.firstChild) return;
            const t = this.pswpElement.querySelector(`${Dn} > .${Hn}`);
            if ((t && t.classList.remove(Hn), !this.popupThumbs)) return;
            const e = this.popupThumbs[this.popup.getCurrentIndex()];
            e.classList.add(Hn), this.scrollThumbs(e);
        }
        scrollThumbs(t) {
            const e = this.popupThumbsContainer.scrollLeft + this.popupThumbsContainer.offsetWidth,
                i = t.offsetLeft;
            if (e <= i + t.offsetWidth || e > i) {
                const e = parseInt(window.getComputedStyle(t).marginLeft);
                this.popupThumbsContainer.scrollTo({ top: 0, left: i - e, behavior: "smooth" });
            }
        }
        constructor(t, e = "", i = 0, s = null) {
            (this.items = t),
                (this.triggerBtn = s),
                (this.pswpElements = document.querySelectorAll(Tn)),
                (this.pswpElement = this.pswpElements[i]),
                (this.popup = null),
                (this.popupThumbs = null),
                (this.popupThumbsContainer = this.pswpElement.querySelector(Dn)),
                (this.closeBtn = this.pswpElement.querySelector(Pn));
            (this.options = "" !== e ? e : { history: !1, focus: !1, mainClass: "" }),
                (this.onCloseCallback = () => this.onClose()),
                (this.dispatchPopupInitEventCallback = () => this.dispatchPopupInitEvent()),
                (this.setCurrentThumbCallback = () => this.setCurrentThumb()),
                (this.a11y = Ft),
                this.init();
        }
    };
    const Qn = 0,
        Gn = "[data-button-quick-view]",
        Xn = "[data-quick-view-items-template]",
        Jn = "[data-cart-drawer]",
        Yn = "[data-shop-the-look-quick-view-button]",
        Zn = "[data-shop-the-look-thumb]",
        tr = "[data-quick-view-item-holder]",
        er = "is-loading",
        ir = "is-active",
        sr = "js-quick-view-from-cart",
        or = "popup-quick-view pswp--not-close-btn",
        nr = "popup-quick-view popup-quick-view--shop-the-look pswp--not-close-btn",
        rr = "data-handle",
        ar = "data-variant-id",
        lr = "data-shop-the-look-quick-view",
        cr = "data-hotspot",
        hr = "data-initialized",
        dr = { history: !1, focus: !1, mainClass: or, showHideOpacity: !1, closeOnVerticalDrag: !1, closeOnScroll: !1, modal: !1, escKey: !1 };
    let ur = class {
        popupInit(t) {
            var e, i;
            const s = this.loadPhotoswipe.pswpElement.querySelector(`[${cr}="${t.getAttribute(cr)}"]`),
                o = this.loadPhotoswipe.pswpElement.querySelectorAll(tr);
            s.classList.add(ir),
                o.forEach((t) => {
                    t !== s && t.classList.remove(ir);
                }),
                this.toggleQuickViewButtonsLoadingClasses(!0),
                this.toggleQuickViewThumbsLoadingClasses(!0);
            const n = (t) => {
                "quickViewAnimateInUp" === t.animationName &&
                    requestAnimationFrame(() => {
                        this.toggleQuickViewThumbsLoadingClasses(!1);
                    }),
                    "quickViewAnimateOutDown" === t.animationName && this.loadPhotoswipe.pswpElement.removeEventListener("animationend", n);
            };
            this.loadPhotoswipe.pswpElement.addEventListener("animationend", n),
                null === (e = this.loadPhotoswipe) ||
                    void 0 === e ||
                    null === (i = e.popup) ||
                    void 0 === i ||
                    i.listen("destroy", () => {
                        this.toggleQuickViewButtonsLoadingClasses(!1), this.toggleQuickViewThumbsLoadingClasses(!1);
                    });
        }
        toggleQuickViewButtonsLoadingClasses(t = !0) {
            var e, i;
            t
                ? null === (i = this.buttonsQuickView) ||
                  void 0 === i ||
                  i.forEach((t) => {
                      t.classList.add(er);
                  })
                : null === (e = this.buttonsQuickView) ||
                  void 0 === e ||
                  e.forEach((t) => {
                      t.classList.remove(er);
                  });
        }
        toggleQuickViewThumbsLoadingClasses(t = !0) {
            var e, i, s;
            ((this.buttonsShopTheLookThumb = null === (e = this.loadPhotoswipe) || void 0 === e ? void 0 : e.pswpElement.querySelectorAll(Zn)), t)
                ? null === (s = this.buttonsShopTheLookThumb) ||
                  void 0 === s ||
                  s.forEach((t) => {
                      t.classList.add(er);
                  })
                : null === (i = this.buttonsShopTheLookThumb) ||
                  void 0 === i ||
                  i.forEach((t) => {
                      t.classList.remove(er);
                  });
        }
        initPhotoswipe(t) {
            t.preventDefault();
            const e = t.target.matches(Gn) ? t.target : t.target.closest(Gn),
                i = window.innerWidth < theme.sizes.small;
            let s = "",
                o = !1;
            if (e.hasAttribute(lr)) {
                if (!i) return;
                o = !0;
            }
            (dr.mainClass = or), e.classList.add(er), e.closest(Jn) && document.body.classList.add(sr), (this.a11y.state.trigger = e), e.hasAttribute(ar) && (s = `&variant=${e.getAttribute(ar)}`);
            const n = `${theme.routes.root}products/${e.getAttribute(rr)}?section_id=api-quickview${s}`;
            if (o) {
                (dr.mainClass = nr),
                    this.buttonsQuickView.forEach((t) => {
                        t.classList.add(er);
                    });
                const t = new XMLSerializer(),
                    i = this.container.querySelector(Xn).content.firstElementChild.cloneNode(!0),
                    s = t.serializeToString(i);
                this.loadPhotoswipeWithTemplate(s, e);
            } else this.loadPhotoswipeFromFetch(n, e);
        }
        loadPhotoswipeWithTemplate(t, e) {
            const i = [{ html: t }];
            this.loadPhotoswipe = new Kn(i, dr, Qn, e);
        }
        loadPhotoswipeFromFetch(t, e) {
            fetch(t)
                .then((t) => t.text())
                .then((t) => {
                    const i = [{ html: t }];
                    this.loadPhotoswipe = new Kn(i, dr, Qn, e);
                })
                .catch((t) => console.log("error: ", t));
        }
        constructor(t) {
            var e, i;
            (this.container = t),
                (this.a11y = Ft),
                (this.buttonsQuickView = this.container.querySelectorAll(Gn)),
                (this.buttonsShopTheLookQuickView = this.container.querySelectorAll(Yn)),
                (this.popupInitCallback = (t) => this.popupInit(t)),
                null === (e = this.buttonsQuickView) ||
                    void 0 === e ||
                    e.forEach((t) => {
                        t.hasAttribute(hr) ||
                            (t.addEventListener("click", (t) => this.initPhotoswipe(t)),
                            t.addEventListener("theme:popup:init", () => {
                                t.classList.remove(er), t.hasAttribute(lr) && this.popupInitCallback(t);
                            }),
                            t.setAttribute(hr, ""));
                    }),
                null === (i = this.buttonsShopTheLookQuickView) ||
                    void 0 === i ||
                    i.forEach((t) => {
                        t.addEventListener("click", () => {
                            var t;
                            null === (t = this.buttonsQuickView[0]) || void 0 === t || t.dispatchEvent(new Event("click"));
                        });
                    });
        }
    };
    const pr = { cartDrawerEnabled: "drawer" === window.theme.settings.cartType, timers: { addProductTimeout: 1e3 }, animations: { data: "data-aos", method: "fade-up" } },
        mr = {
            outerSection: "[data-section-id]",
            aos: "[data-aos]",
            additionalCheckoutButtons: "[data-additional-checkout-button]",
            apiContent: "[data-api-content]",
            apiLineItems: "[data-api-line-items]",
            apiUpsellItems: "[data-api-upsell-items]",
            apiCartPrice: "[data-api-cart-price]",
            buttonAddToCart: "[data-add-to-cart]",
            upsellButtonByHandle: "[data-handle]",
            cartCloseError: "[data-cart-error-close]",
            cartDrawer: "[data-cart-drawer]",
            cartDrawerTemplate: "[data-cart-drawer-template]",
            cartDrawerToggle: "[data-cart-drawer-toggle]",
            cartDrawerBody: "[data-cart-drawer-body]",
            cartErrors: "[data-cart-errors]",
            cartForm: "[data-cart-form]",
            cartTermsCheckbox: "[data-cart-acceptance-checkbox]",
            cartCheckoutButtonWrapper: "[data-cart-checkout-buttons]",
            cartCheckoutButton: "[data-cart-checkout-button]",
            cartItemRemove: "[data-item-remove]",
            cartItemsQty: "[data-cart-items-qty]",
            cartTotal: "[data-cart-total]",
            cartTotalPrice: "[data-cart-total-price]",
            cartMessage: "[data-cart-message]",
            cartMessageDefault: "[data-message-default]",
            cartPage: "[data-cart-page]",
            cartProgress: "[data-cart-message-progress]",
            emptyMessage: "[data-empty-message]",
            buttonHolder: "[data-foot-holder]",
            item: "[data-cart-item]",
            itemsHolder: "[data-items-holder]",
            itemsWrapper: "[data-items-wrapper]",
            formCloseError: "[data-close-error]",
            formErrorsContainer: "[data-cart-errors-container]",
            upsellHolder: "[data-upsell-holder]",
            errorMessage: "[data-error-message]",
            termsErrorMessage: "[data-terms-error-message]",
            pairProductsHolder: "[data-pair-products-holder]",
            pairProducts: "[data-pair-products]",
            priceHolder: "[data-cart-price-holder]",
            leftToSpend: "[data-left-to-spend]",
            quickBuyForm: "[data-quickbuy-form]",
            qtyInput: "[data-quantity-field]",
            productMediaContainer: "[data-product-media-container]",
            formWrapper: "[data-form-wrapper]",
            productForm: "[data-product-form]",
            popupQuickView: ".popup-quick-view",
            popupClose: "[data-popup-close]",
            error: "[data-error]",
            quickViewOnboarding: "[data-quick-view-onboarding]",
            flickityEnabled: ".flickity-enabled",
        },
        gr = "hidden",
        vr = "is-hidden",
        yr = "js-drawer-open-cart",
        fr = "is-open",
        br = "is-visible",
        wr = "is-expanded",
        Er = "is-loading",
        Sr = "is-disabled",
        Lr = "is-success",
        kr = "cart__toggle--has-items",
        Ar = "variant--soldout",
        qr = "is-removed",
        Cr = "aos-animate",
        Tr = "is-updated",
        Pr = "no-outline",
        Fr = "product-grid-item__image--error",
        Ir = "cv-h",
        Dr = "data-limit",
        xr = "data-cart-message",
        Hr = "data-cart-total",
        Mr = "aria-expanded",
        _r = "disabled",
        Or = "value",
        Br = "data-id",
        zr = "data-item",
        Wr = "data-item-index",
        $r = "data-item-title",
        Vr = "data-atc-trigger",
        Rr = "data-notification-popup";
    let Nr = {},
        Ur = class {
            init() {
                (this.cartToggleButtons = document.querySelectorAll(mr.cartDrawerToggle)),
                    (this.cartPage = document.querySelector(mr.cartPage)),
                    (this.cartDrawer = document.querySelector(mr.cartDrawer)),
                    (this.cart = this.cartDrawer || this.cartPage),
                    (this.cartCount = this.getCartItemCount()),
                    this.assignArguments(),
                    (this.flktyUpsell = null),
                    (this.form = null),
                    (this.collapsible = null),
                    (this.a11y = Ft),
                    (this.build = this.build.bind(this)),
                    (this.addToCart = this.addToCart.bind(this)),
                    (this.updateCart = this.updateCart.bind(this)),
                    (this.openCartDrawer = this.openCartDrawer.bind(this)),
                    (this.closeCartDrawer = this.closeCartDrawer.bind(this)),
                    (this.toggleCartDrawer = this.toggleCartDrawer.bind(this)),
                    (this.formSubmitHandler = lt(this.formSubmitHandler.bind(this), 50)),
                    (this.closeCartError = () => {
                        this.cartErrorHolder.classList.remove(wr);
                    }),
                    (this.cartDrawerCloseEvent = null),
                    (this.hasItemsInCart = this.hasItemsInCart.bind(this)),
                    (this.isCartPage = Boolean(this.cart && null === this.cartDrawer)),
                    (this.showAnimations = Boolean("true" === document.body.dataset.animations)),
                    (this.toggleClassesOnContainers = this.toggleClassesOnContainers.bind(this)),
                    (this.totalItems = 0),
                    (this.isCartDrawerOpen = !1),
                    (this.isCartDrawerLoaded = !1),
                    (this.cartDiscounts = 0),
                    (this.cartDrawerEnabled = pr.cartDrawerEnabled),
                    (this.cartAnimationTimer = 0),
                    (this.cartUpdateFailed = !1),
                    this.cartEvents(),
                    this.cartAddEvent(),
                    this.cartDrawerToggleEvents(),
                    this.initQuantity(),
                    this.buttonHolder && (this.collapsible = new wt(this.buttonHolder)),
                    this.isCartPage && this.renderPairProducts(),
                    document.addEventListener("theme:popup:open", this.closeCartDrawer);
            }
            assignArguments() {
                (this.cartDrawerBody = document.querySelector(mr.cartDrawerBody)),
                    (this.emptyMessage = document.querySelector(mr.emptyMessage)),
                    (this.buttonHolder = document.querySelector(mr.buttonHolder)),
                    (this.itemsHolder = document.querySelector(mr.itemsHolder)),
                    (this.cartItemsQty = document.querySelector(mr.cartItemsQty)),
                    (this.itemsWrapper = document.querySelector(mr.itemsWrapper)),
                    (this.items = document.querySelectorAll(mr.item)),
                    (this.cartTotal = document.querySelector(mr.cartTotal)),
                    (this.cartTotalPrice = document.querySelectorAll(mr.cartTotalPrice)),
                    (this.cartMessage = document.querySelectorAll(mr.cartMessage)),
                    (this.cartOriginalTotal = document.querySelector(mr.cartOriginalTotal)),
                    (this.cartErrorHolder = document.querySelector(mr.cartErrors)),
                    (this.cartCloseErrorMessage = document.querySelector(mr.cartCloseError)),
                    (this.pairProductsHolder = document.querySelector(mr.pairProductsHolder)),
                    (this.pairProducts = document.querySelector(mr.pairProducts)),
                    (this.priceHolder = document.querySelector(mr.priceHolder)),
                    (this.upsellHolders = document.querySelectorAll(mr.upsellHolder)),
                    (this.cartTermsCheckbox = document.querySelector(mr.cartTermsCheckbox)),
                    (this.cartCheckoutButtonWrapper = document.querySelector(mr.cartCheckoutButtonWrapper)),
                    (this.cartCheckoutButton = document.querySelector(mr.cartCheckoutButton)),
                    (this.cartForm = document.querySelector(mr.cartForm)),
                    (this.cartItemCount = 0),
                    (this.subtotal = window.theme.subtotal),
                    (this.button = null),
                    this.cartMessage.length > 0 && (this.cartFreeLimitShipping = 100 * Number(this.cartMessage[0].getAttribute(Dr)) * window.Shopify.currency.rate),
                    this.updateProgress();
                    
            }

            
            initQuantity() {
                var t;
                (this.items = document.querySelectorAll(mr.item)),
                    null === (t = this.items) ||
                        void 0 === t ||
                        t.forEach((t) => {
                            new Pt(t, !0).init(), this.cartUpdateEvent(t);
                        });
            }
            cartUpdateEvent(t) {

                t.addEventListener("theme:cart:update", (e) => {
                    this.updateCart({ id: e.detail.id, quantity: e.detail.quantity }, t);
                });
            }
            cartEvents() {
                const t = document.querySelectorAll(mr.cartItemRemove);
                (this.totalItems = t.length),
                    null == t ||
                        t.forEach((t) => {
                            const e = t.closest(mr.item);
                            t.addEventListener("click", (i) => {
                                i.preventDefault(), t.classList.contains(Sr) || this.updateCart({ id: e.getAttribute(Br), quantity: 0 }, e);
                            });
                        }),
                    this.cartCloseErrorMessage && (this.cartCloseErrorMessage.removeEventListener("click", this.closeCartError), this.cartCloseErrorMessage.addEventListener("click", this.closeCartError)),
                    this.cartTermsCheckbox &&
                        (this.cartTermsCheckbox.removeEventListener("change", this.formSubmitHandler),
                        this.cartCheckoutButtonWrapper.removeEventListener("click", this.formSubmitHandler),
                        this.cartForm.removeEventListener("submit", this.formSubmitHandler),
                        this.cartTermsCheckbox.addEventListener("change", this.formSubmitHandler),
                        this.cartCheckoutButtonWrapper.addEventListener("click", this.formSubmitHandler),
                        this.cartForm.addEventListener("submit", this.formSubmitHandler));
            }
            cartAddEvent() {
                document.addEventListener("click", (t) => {
                    const e = t.target,
                        i = null == e ? void 0 : e.matches(mr.buttonAddToCart),
                        s = null == e ? void 0 : e.closest(mr.buttonAddToCart);
                    if (i || s) {
                        var o, n;
                        t.preventDefault(), (this.button = i ? e : s), (this.form = e.closest("form")), (this.formWrapper = this.button.closest(mr.formWrapper));
                        const r = null === (o = this.formWrapper) || void 0 === o ? void 0 : o.classList.contains(Ar),
                            a = this.button.hasAttribute(_r),
                            l = this.button.closest(mr.quickViewOnboarding),
                            c = this.button.hasAttribute(Vr),
                            h = this.button.hasAttribute(Rr),
                            d = null === (n = this.form) || void 0 === n ? void 0 : n.querySelector('[type="file"]');
                        if (a || d || l) return;
                        if (r && h) return void new qi(this.button);
                        c && (this.a11y.state.trigger = this.button);
                        const u = new FormData(this.form);
                        this.addToCart(u), document.dispatchEvent(new CustomEvent("theme:cart:add", { bubbles: !0, detail: { selector: e } }));
                    }
                });
            }
            getCart() {
                if (this.cartDrawer && !this.isCartDrawerLoaded) {
                    const t = !1;
                    this.renderCartDrawer(t);
                }
                fetch(theme.routes.cart_url + "?section_id=api-cart-items")
                    .then(this.handleErrors)
                    .then((t) => t.text())
                    .then((t) => {
                        const e = document.createElement("div");
                        e.innerHTML = t;
                        const i = e.querySelector(mr.apiContent);
                        this.build(i);
                    })
                    .catch((t) => console.log(t));
            }
            addToCart(t) {
                this.cartDrawerEnabled && this.button && (this.button.classList.add(Er), this.button.setAttribute(_r, !0)),
                    fetch(theme.routes.cart_add_url, { method: "POST", headers: { "X-Requested-With": "XMLHttpRequest", Accept: "application/javascript" }, body: t })
                        .then((t) => t.json())
                        .then((t) => {
                            if (((this.button.disabled = !0), this.addLoadingClass(), t.status)) return this.addToCartError(t), void this.removeLoadingClass();
                            this.cartDrawerEnabled ? this.getCart() : (window.location = theme.routes.cart_url);
                        })
                        .catch((t) => console.log(t));
            }
            updateCart(t = {}, e = null) {
                
                let i = t.quantity;
                null !== e && (i ? e.classList.add(Er) : e.classList.add(qr)), this.disableCartButtons(), this.addLoadingClass();
                const s = this.cart.querySelector(`[${zr}="${t.id}"]`) || e,
                    o = (null == s ? void 0 : s.hasAttribute(Wr)) ? parseInt(s.getAttribute(Wr)) : 0,
                    n = (null == s ? void 0 : s.hasAttribute($r)) ? s.getAttribute($r) : null;
                if (0 === o) return;
                const r = { line: o, quantity: i };
                fetch(theme.routes.cart_change_url, { method: "post", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(r) })
                    .then((t) => {
                        if (400 === t.status) {
                            const e = new Error(t.status);
                            throw (this.cartDrawerEnabled ? this.getCart() : (window.location = theme.routes.cart_url), e);
                           
                        }
                        return t.text();
                    })
                    .then((t) => {
                        if (JSON.parse(t).errors) return (this.cartUpdateFailed = !0), this.updateErrorText(n), this.toggleErrorMessage(), this.resetLineItem(e), this.enableCartButtons(), void this.removeLoadingClass();
                        this.getCart();
                    })
                    .catch((t) => {
                        console.log(t), this.enableCartButtons(), this.removeLoadingClass();
                    });
              
            }
            resetLineItem(t) {
                const e = t.querySelector(mr.qtyInput),
                    i = e.getAttribute("value");
                (e.value = i), t.classList.remove(Er);
            }
            disableCartButtons() {
                const t = this.cart.querySelectorAll("input"),
                    e = this.cart.querySelectorAll(`button, ${mr.cartItemRemove}`);
                t.length &&
                    t.forEach((t) => {
                        t.classList.add(Sr), t.blur(), (t.disabled = !0);
                    }),
                    e.length &&
                        e.forEach((t) => {
                            t.setAttribute(_r, !0);
                        });
            }
            enableCartButtons() {
                const t = this.cart.querySelectorAll("input"),
                    e = this.cart.querySelectorAll(`button, ${mr.cartItemRemove}`);
                t.length &&
                    t.forEach((t) => {
                        t.classList.remove(Sr), (t.disabled = !1);
                    }),
                    e.length &&
                        e.forEach((t) => {
                            t.removeAttribute(_r);
                        });
            }
            updateErrorText(t) {
                this.cartErrorHolder.querySelector(mr.errorMessage).innerText = t;
            }
            toggleErrorMessage() {
                this.cartErrorHolder && (this.cartErrorHolder.classList.toggle(wr, this.cartUpdateFailed), (this.cartUpdateFailed = !1));
            }
            handleErrors(t) {
                return t.ok
                    ? t
                    : t.json().then(function (e) {
                          throw new ct({ status: t.statusText, headers: t.headers, json: e });
                      });
            }
            addToCartError(t) {
                const e = this.button.closest(mr.quickBuyForm),
                    i = this.button.closest(mr.upsellHolder),
                    s = !document.body.classList.contains(Pr);
                let o = (this.button.closest(mr.productForm) ? this.button.closest(mr.productForm) : this.button.closest(mr.upsellHolder)).querySelector(mr.formErrorsContainer);
                i && (o = i.querySelector(mr.formErrorsContainer)),
                    this.cartDrawerEnabled && this.button && null !== this.button.closest(mr.cartDrawer) && !this.button.closest(mr.cartDrawer) && this.closeCartDrawer(),
                    this.button.classList.remove(Er),
                    this.button.removeAttribute(_r);
                const n = e ? "" : `\n      <button type="button" class="errors__button-close" data-close-error>\n        ${theme.icons.close}\n      </button>\n    `;
                if (((o.innerHTML = `\n      <div class="errors" data-error>\n        ${t.message}: ${t.description}\n        ${n}\n      </div>\n    `), e)) {
                    const t = o.closest(mr.productMediaContainer);
                    t.classList.add(Fr),
                        o.querySelector(mr.error).addEventListener("animationend", () => {
                            t.classList.remove(Fr), (o.innerHTML = ""), s || document.activeElement.blur();
                        });
                } else
                    o.classList.add(br),
                        o.addEventListener("transitionend", () => {
                            this.resizeSliders(o);
                        }),
                        this.handleCloseErrorMessages(o);
            }
            handleCloseErrorMessages(t) {
                t.querySelector(mr.formCloseError).addEventListener("click", (e) => {
                    const i = e.target;
                    (i.matches(mr.formCloseError) || i.closest(mr.formCloseError)) &&
                        (e.preventDefault(),
                        t.classList.remove(br),
                        t.querySelector(mr.error).addEventListener("transitionend", () => {
                            (t.innerHTML = ""), this.resizeSliders(i);
                        }));
                });
            }
            resizeSliders(t) {
                const i = t.closest(mr.flickityEnabled);
                if (!i) return;
                const s = e.data(i);
                requestAnimationFrame(() => s.resize());
            }
            renderCartDrawer(t = !0) {
                const e = document.querySelector(mr.cartDrawerTemplate);
                e &&
                    ((this.cartDrawer.innerHTML = e.innerHTML),
                    this.assignArguments(),
                    this.initQuantity(),
                    this.cartEvents(),
                    this.buttonHolder && (this.collapsible = new wt(this.buttonHolder)),
                    (this.cartDrawerToggle = this.cartDrawer.querySelector(mr.cartDrawerToggle)),
                    this.cartDrawerToggle.addEventListener("click", this.cartDrawerToggleClickEvent),
                    (this.isCartDrawerLoaded = !0),
                    this.renderPairProducts(),
                    document.dispatchEvent(new CustomEvent("theme:cart:loaded", { bubbles: !0 })),
                    t && this.openCartDrawer());
            }
            openCartDrawer() {
                this.isCartDrawerOpen ||
                    (this.isCartDrawerLoaded
                        ? (document.dispatchEvent(new CustomEvent("theme:cart:open", { bubbles: !0 })),
                          document.dispatchEvent(new CustomEvent("theme:scroll:lock", { bubbles: !0, detail: this.cartDrawer })),
                          document.dispatchEvent(new CustomEvent("theme:scroll:lock", { bubbles: !0, detail: this.cartDrawerBody })),
                          document.body.classList.add(yr),
                          this.cartDrawer.classList.add(fr),
                          this.cartDrawer.classList.remove(Ir),
                          this.cartDrawer.querySelectorAll(mr.aos).forEach((t) => {
                              requestAnimationFrame(() => {
                                  t.classList.add(Cr);
                              });
                          }),
                          this.cartToggleButtons.forEach((t) => {
                              t.setAttribute(Mr, !0);
                          }),
                          this.a11y.trapFocus({ container: this.cartDrawer }),
                          this.observeAdditionalCheckoutButtons(),
                          (this.isCartDrawerOpen = !0))
                        : this.renderCartDrawer());
            }
            closeCartDrawer() {
                if (!this.isCartDrawerOpen) return;
                document.dispatchEvent(new CustomEvent("theme:cart:close", { bubbles: !0 })),
                    this.cartAnimationTimer && clearTimeout(this.cartAnimationTimer),
                    (this.cartAnimationTimer = setTimeout(() => {
                        this.cartDrawer.querySelectorAll(mr.aos).forEach((t) => {
                            t.classList.remove(Cr);
                        });
                    }, 300)),
                    this.cartErrorHolder.classList.remove(wr),
                    this.a11y.removeTrapFocus(),
                    this.cartToggleButtons.forEach((t) => {
                        t.setAttribute(Mr, !1);
                    }),
                    document.body.classList.remove(yr),
                    this.cartDrawer.classList.remove(fr),
                    this.itemsHolder.classList.remove(Tr);
                const t = (e) => {
                    e.target === this.cartDrawer &&
                        (requestAnimationFrame(() => {
                            this.cartDrawer.classList.add(Ir);
                        }),
                        this.cartDrawer.removeEventListener("transitionend", t));
                };
                this.cartDrawer.addEventListener("transitionend", t);
                !document.body.classList.contains(Pr) ||
                    requestAnimationFrame(() => {
                        document.activeElement.blur();
                    });
                document.dispatchEvent(new CustomEvent("theme:scroll:unlock", { bubbles: !0, detail: 400 })), (this.isCartDrawerOpen = !1);
            }
            toggleCartDrawer() {
                this.isCartDrawerOpen ? this.closeCartDrawer() : this.openCartDrawer();
            }
            cartDrawerToggleEvents() {
                this.cartDrawer &&
                    (this.cartDrawer.addEventListener("keyup", (t) => {
                        t.code === theme.keyboardKeys.ESCAPE && this.closeCartDrawer();
                    }),
                    (this.cartDrawerToggleClickEvent = (t) => {
                        t.preventDefault();
                        const e = t.target;
                        "false" === e.getAttribute(Mr) && (this.a11y.state.trigger = e), this.toggleCartDrawer();
                    }),
                    (this.cartDrawerCloseEvent = (t) => {
                        const e = t.target.matches(mr.cartDrawerToggle),
                            i = document.querySelector(mr.cartDrawer).contains(t.target),
                            s = t.target.closest(mr.popupQuickView);
                        e || i || s || this.closeCartDrawer();
                    }),
                    this.cartToggleButtons.forEach((t) => {
                        t.addEventListener("click", this.cartDrawerToggleClickEvent);
                    }),
                    document.addEventListener("mousedown", this.cartDrawerCloseEvent));
            }
            toggleClassesOnContainers() {
                const t = this;
                this.emptyMessage.classList.toggle(gr, t.hasItemsInCart()),
                    this.buttonHolder.classList.toggle(gr, !t.hasItemsInCart()),
                    this.itemsHolder.classList.toggle(gr, !t.hasItemsInCart()),
                    this.cartItemsQty.classList.toggle(gr, !t.hasItemsInCart());
            }
            build(t) {
                const e = t.querySelector(mr.apiLineItems),
                    s = t.querySelector(mr.apiUpsellItems),
                    o = Boolean(null === e && null === s),
                    n = t.querySelector(mr.apiCartPrice),
                    r = t.querySelector(mr.cartTotal);
                this.priceHolder && n && (this.priceHolder.innerHTML = n.innerHTML),
                    o
                        ? ((this.itemsHolder.innerHTML = t), this.pairProductsHolder && (this.pairProductsHolder.innerHTML = ""))
                        : ((this.itemsHolder.innerHTML = e.innerHTML), this.pairProductsHolder && (this.pairProductsHolder.innerHTML = s.innerHTML), this.renderPairProducts()),
                    (this.newTotalItems = e && e.querySelectorAll(mr.item).length ? e.querySelectorAll(mr.item).length : 0),
                    (this.subtotal = r && r.hasAttribute(Hr) ? parseInt(r.getAttribute(Hr)) : 0),
                    (this.cartCount = this.getCartItemCount()),
                    this.cartMessage.length > 0 && this.updateProgress(),
                    this.cartToggleButtons.forEach((t) => {
                        t.classList.remove(kr), this.newTotalItems > 0 && t.classList.add(kr);
                    }),
                    this.toggleErrorMessage(),
                    this.updateItemsQuantity(this.cartCount),
                   // Assuming this.subtotal represents the total price
                   

                    
                    
                    this.cartTotalPrice.forEach((t) => {
                        t.innerHTML = 0 === this.subtotal ? window.theme.strings.free : i.formatMoney(this.subtotal, theme.moneyWithCurrencyFormat);
                    }),
                    this.totalItems !== this.newTotalItems && ((this.totalItems = this.newTotalItems), this.toggleClassesOnContainers()),
                    this.isCartDrawerOpen && this.itemsHolder.classList.add(Tr),
                    this.cartEvents(),
                    this.initQuantity(),
                    this.enableCartButtons(),
                    this.resetButtonClasses(),
                    this.removeLoadingClass(),
                    document.dispatchEvent(new CustomEvent("theme:cart:added", { bubbles: !0 })),
                    this.cartDrawer && this.openCartDrawer();
            }
            getCartItemCount() {
                return this.cart ? Array.from(this.cart.querySelectorAll(mr.qtyInput)).reduce((t, e) => t + parseInt(e.value), 0) : 0;
            }
            hasItemsInCart() {
                return this.totalItems > 0;

            }

          freeShippingMessageHandle(t) {
              this.cartMessage.length > 0 &&
                  document.querySelectorAll(mr.cartMessage).forEach((e) => {
                      const i = e.hasAttribute(xr) && "true" === e.getAttribute(xr) && 0 !== t,
                          s = e.querySelector(mr.cartMessageDefault);
                      e.classList.toggle(Lr, t >= this.cartFreeLimitShipping && i), e.classList.toggle(vr, 0 === t), s.classList.toggle(vr, t >= this.cartFreeLimitShipping);
                  });
                  
                
            }

        
            updateProgress() {
             // Calculate discount percentage
            let totalPriceWithoutSymbol = Shopify.formatMoney(this.subtotal);
            totalPriceWithoutSymbol = totalPriceWithoutSymbol.replace(/[₹,]/g, '');
            let discountPercentage;
            
            if (totalPriceWithoutSymbol >= 2500 && totalPriceWithoutSymbol < 5000) {
                discountPercentage = 10;
            } else if (totalPriceWithoutSymbol >= 5000 && totalPriceWithoutSymbol < 10000) {
                discountPercentage = 20;
            } else if (totalPriceWithoutSymbol >= 10000) {
                discountPercentage = 25;
            }
            
            // Update progress bar width
            var progressBar = document.querySelector('.progress-container .step');
            if (progressBar) {
                progressBar.style.width = discountPercentage + '%';
            }

          
 

              const t = (this.subtotal / this.cartFreeLimitShipping) * 100;
              const e = theme.settings.currency_code_enable ? i.formatMoney(this.cartFreeLimitShipping - this.subtotal, theme.moneyWithCurrencyFormat) : i.formatMoney(this.cartFreeLimitShipping - this.subtotal, theme.moneyFormat);
          
              this.cartMessage.length > 0 &&
                  document.querySelectorAll(mr.cartMessage).forEach((i) => {
                      const s = i.querySelectorAll(mr.cartProgress),
                          o = i.querySelector(mr.leftToSpend);
          
                      o && (o.innerHTML = e.replace(".00", "").replace(",00", ""));
          
                      s.length &&
                          s.forEach((e, i) => {
                              e.classList.toggle(vr, this.subtotal / this.cartFreeLimitShipping >= 1);
                              e.style.setProperty("--progress-width", `${t}%`);
                              0 === i && e.setAttribute(Or, t);
                          });
          
                      // Pass the correct total amount to the freeShippingMessageHandle function
                      this.freeShippingMessageHandle(this.subtotal);
                  });
                          
                  }

            renderPairProducts() {
                if (
                    ((this.flktyUpsell = null),
                    (this.pairProductsHolder = document.querySelector(mr.pairProductsHolder)),
                    (this.pairProducts = document.querySelector(mr.pairProducts)),
                    (this.upsellHolders = document.querySelectorAll(mr.upsellHolder)),
                    null === this.pairProductsHolder || void 0 === this.pairProductsHolder)
                )
                    return;
                const t = this;
                this.upsellHolders.length > 1
                    ? (this.flktyUpsell = new e(this.pairProducts, {
                          wrapAround: !0,
                          pageDots: !0,
                          adaptiveHeight: !0,
                          prevNextButtons: !1,
                          on: {
                              ready: function () {
                                  new ur(t.cart), this.reloadCells(), requestAnimationFrame(() => this.resize());
                              },
                          },
                      }))
                    : new ur(this.cart);
            }
            updateItemsQuantity(t) {

                let e = theme.strings.cart_items_one,
                    i = theme.strings.cart_items_many;
                (e = e.split("}}")[1]), (i = i.split("}}")[1]), this.cartItemsQty && (this.cartItemsQty.textContent = 1 === t ? `${t} ${e}` : `${t} ${i}`);
            }
            observeAdditionalCheckoutButtons() {
                const t = this.cart.querySelector(mr.additionalCheckoutButtons);
                if (t) {
                    const e = new MutationObserver(() => {
                        this.a11y.removeTrapFocus(), this.a11y.trapFocus({ container: this.cart }), e.disconnect();
                    });
                    e.observe(t, { subtree: !0, childList: !0 });
                }
            }
            formSubmitHandler() {
                const t = document.querySelector(mr.cartTermsCheckbox).checked,
                    e = document.querySelector(mr.termsErrorMessage);
                if (t) e.classList.remove(wr), this.cartCheckoutButton.removeAttribute(_r);
                else {
                    if (document.querySelector(mr.termsErrorMessage).length > 0) return;
                    (e.innerText = theme.strings.cart_acceptance_error), this.cartCheckoutButton.setAttribute(_r, !0), e.classList.add(wr);
                }
            }
            resetButtonClasses() {
                const t = document.querySelectorAll(mr.buttonAddToCart);
                t &&
                    t.forEach((t) => {
                        t.classList.contains(Er) &&
                            (t.classList.remove(Er),
                            t.classList.add(Lr),
                            setTimeout(() => {
                                t.removeAttribute(_r), t.classList.remove(Lr);
                            }, pr.timers.addProductTimeout));
                    });
            }
            addLoadingClass() {
                this.cartDrawer ? this.cartDrawer.classList.add(Er) : this.itemsWrapper && this.itemsWrapper.classList.add(Er);
            }
            removeLoadingClass() {
                this.cartDrawer ? this.cartDrawer.classList.remove(Er) : this.itemsWrapper && this.itemsWrapper.classList.remove(Er);
            }
            unload() {
                this.cartDrawerToggle && this.cartDrawerToggle.removeEventListener("click", this.cartDrawerToggleClickEvent),
                    this.cartToggleButtons.forEach((t) => {
                        t.removeEventListener("click", this.cartDrawerToggleClickEvent);
                    }),
                    document.removeEventListener("mousedown", this.cartDrawerCloseEvent),
                    null !== this.collapsible && this.collapsible.onUnload();
            }
            constructor() {
                "/password" !== window.location.pathname && this.init();
            }
        };
    it("cart-template", {
        onLoad() {
            Nr[this.id] = new Ur();
        },
        onUnload() {
            "function" == typeof Nr[this.id].unload && Nr[this.id].unload();
        },
    });
    const jr = "is-visible",
        Kr = document.querySelector("[data-scroll-top-button]");
    Kr &&
        (Kr.addEventListener("click", () => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }),
        document.addEventListener(
            "scroll",
            lt(() => {
                Kr.classList.toggle(jr, window.pageYOffset > window.innerHeight);
            }, 150)
        ));
    const Qr = "details",
        Gr = "[data-popdown-body]",
        Xr = "[data-popdown-close]",
        Jr = "[data-popdown-toggle]",
        Yr = "[data-search-form-inner]",
        Zr = "[data-popular-searches-link]",
        ta = "[data-site-header]",
        ea = "[data-nav]",
        ia = "[data-nav-items-compress]",
        sa = "[data-nav-icons]",
        oa = "[data-mobile-menu]",
        na = "predictive-search",
        ra = "search-form",
        aa = "data-popdown-in-header",
        la = "data-popdown-in-page",
        ca = "data-search-performed",
        ha = "search-opened",
        da = "site-header--menu-opened",
        ua = "nav--compress";
    let pa = class extends HTMLElement {
        connectedCallback() {
            this.isPopdownInHeader &&
                (this.details.addEventListener("keyup", (t) => "ESCAPE" === t.code.toUpperCase() && this.close()),
                this.popdownClose.addEventListener("click", () => this.close()),
                this.popdownToggle.addEventListener("click", (t) => this.onPopdownToggleClick(t)),
                this.popdownToggle.setAttribute("role", "button")),
                this.isPopdownInPage &&
                    (this.popdownClose.addEventListener("click", () => this.triggerPopdownClose()),
                    this.searchFormWrapper.addEventListener("focusout", () => this.onFocusOut()),
                    this.searchFormWrapper.input.addEventListener("click", (t) => this.triggerPopdownOpen(t))),
                this.searchFormInner.addEventListener("transitionend", (t) => {
                    t.target === this.searchFormInner && this.details.hasAttribute("open") && "false" == this.details.getAttribute("open") && this.onClose();
                }),
                this.popularSearchesLink.forEach((t) => {
                    t.addEventListener("click", (t) => {
                        t.preventDefault();
                        const e = t.target.textContent;
                        (this.searchFormWrapper.input.value = e), this.searchFormWrapper.submit();
                    });
                });
        }
        onPopdownToggleClick(t) {
            t.preventDefault(), t.target.closest(Qr).hasAttribute("open") ? this.close() : this.open(t);
        }
        onBodyClick(t) {
            var e;
            const i = this.contains(t.target);
            (null === (e = this.header) || void 0 === e ? void 0 : e.classList.contains(da)) || i || i || this.close();
        }
        onFocusOut() {
            this.predictiveSearch &&
                requestAnimationFrame(() => {
                    this.searchFormWrapper.contains(document.activeElement) || this.searchFormWrapper.close();
                });
        }
        triggerPopdownOpen(t) {
            const e = this.closest(`[${ca}="false"]`),
                i = matchMedia("(pointer:coarse)").matches,
                s = window.innerWidth < theme.sizes.small,
                o = i || s,
                n = null != e;
            if (this.nav && this.mobileMenu && (o || n)) {
                t.preventDefault();
                const e = this.nav.classList.contains(ua);
                let s = this.mobileMenu.querySelector(Jr);
                i || (s = e ? this.nav.querySelector(`${ia} ${Jr}`) : this.nav.querySelector(`${sa} ${Jr}`)),
                    setTimeout(() => {
                        null == s || s.dispatchEvent(new Event("click", { bubbles: !0 }));
                    }, 300);
            }
        }
        open(t) {
            (this.onBodyClickEvent = (t) => this.onBodyClick(t)),
                t.target.closest(Qr).setAttribute("open", ""),
                this.searchFormWrapper.input.setAttribute("aria-expanded", !0),
                document.body.classList.add(ha),
                document.body.addEventListener("click", this.onBodyClickEvent),
                document.addEventListener("theme:resize", this.ensureClosingOnResizeEvent),
                document.dispatchEvent(new CustomEvent("theme:scroll:lock", { bubbles: !0 })),
                (this.a11y.state.trigger = t.target),
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        t.target.closest(Qr).setAttribute("open", "true"), this.a11y.trapFocus({ container: this.searchFormInner });
                    });
                });
        }
        close() {
            this.a11y.removeTrapFocus(), this.details.setAttribute("open", "false"), this.predictiveSearch && this.searchFormWrapper.close(), this.searchFormWrapper.handleFocusableDescendants(!0);
        }
        triggerPopdownClose() {
            this.predictiveSearch && this.searchFormWrapper.close(), this.searchFormWrapper.popularSearches && requestAnimationFrame(() => document.activeElement.blur());
        }
        onClose() {
            this.details.removeAttribute("open"),
                document.dispatchEvent(new CustomEvent("theme:search:close", { bubbles: !0 })),
                document.body.classList.remove(ha),
                document.body.removeEventListener("click", this.onBodyClickEvent),
                document.removeEventListener("theme:resize", this.ensureClosingOnResizeEvent),
                document.dispatchEvent(new CustomEvent("theme:scroll:unlock", { bubbles: !0 }));
        }
        ensureClosingOnResize() {
            null === this.offsetParent && this.onClose();
        }
        constructor() {
            var t, e, i;
            super(),
                (this.isPopdownInHeader = this.hasAttribute(aa)),
                (this.isPopdownInPage = this.hasAttribute(la)),
                (this.popdownBody = this.querySelector(Gr)),
                (this.popdownClose = this.querySelector(Xr)),
                (this.searchFormInner = this.querySelector(Yr)),
                (this.popularSearchesLink = this.querySelectorAll(Zr)),
                (this.searchFormWrapper = this.querySelector(ra) ? this.querySelector(ra) : this.querySelector(na)),
                (this.predictiveSearch = this.searchFormWrapper.matches(na)),
                (this.header = document.querySelector(ta)),
                (this.headerSection = null === (t = this.header) || void 0 === t ? void 0 : t.parentNode),
                (this.nav = null === (e = this.header) || void 0 === e ? void 0 : e.querySelector(ea)),
                (this.mobileMenu = null === (i = this.headerSection) || void 0 === i ? void 0 : i.querySelector(oa)),
                (this.a11y = Ft),
                (this.ensureClosingOnResizeEvent = () => this.ensureClosingOnResize()),
                this.isPopdownInHeader && ((this.details = this.querySelector(Qr)), (this.popdownToggle = this.querySelector(Jr)));
        }
    };
    customElements.define("search-popdown", pa),
        (theme.ProductModel = (function () {
            let t = {},
                e = {},
                i = {};
            const s = {
                    productMediaWrapper: "[data-product-single-media-wrapper]",
                    mediaGroup: "[data-product-single-media-group]",
                    productXr: "[data-shopify-xr]",
                    mediaId: "data-media-id",
                    model3d: "data-shopify-model3d-id",
                    modelViewer: "model-viewer",
                    modelJson: "#ModelJson-",
                    deferredMedia: "[data-deferred-media]",
                    deferredMediaButton: "[data-deferred-media-button]",
                },
                o = { isLoading: "is-loading", mediaHidden: "media--hidden" };
            function n(t, n) {
                if (t.querySelector(s.deferredMedia).getAttribute("loaded")) return;
                t.classList.add(o.isLoading);
                const l = document.createElement("div");
                l.appendChild(t.querySelector("template").content.firstElementChild.cloneNode(!0));
                const c = l.querySelector("model-viewer"),
                    h = t.querySelector(s.deferredMedia);
                h.appendChild(c), h.setAttribute("loaded", !0);
                const d = t.dataset.mediaId,
                    u = c.dataset.modelId,
                    p = t.closest(s.mediaGroup).parentElement.querySelector(s.productXr);
                (i[n] = { element: p, defaultId: u }),
                    (e[d] = { modelId: u, mediaId: d, sectionId: n, container: t, element: c }),
                    window.ShopifyXR
                        ? a()
                        : window.Shopify.loadFeatures([
                              { name: "shopify-xr", version: "1.0", onLoad: r },
                              { name: "model-viewer-ui", version: "1.0", onLoad: a },
                          ]);
            }
            function r(e) {
                if (e) console.warn(e);
                else if (window.ShopifyXR) {
                    for (const e in t)
                        if (t.hasOwnProperty(e)) {
                            const i = t[e];
                            if (i.loaded) continue;
                            const o = document.querySelector(`${s.modelJson}${e}`);
                            o && (window.ShopifyXR.addModels(JSON.parse(o.innerHTML)), (i.loaded = !0));
                        }
                    window.ShopifyXR.setupXRElements();
                } else
                    document.addEventListener("shopify_xr_initialized", function () {
                        r();
                    });
            }
            function a(t) {
                if (t) console.warn(t);
                else
                    for (const t in e)
                        if (e.hasOwnProperty(t)) {
                            const i = e[t];
                            i.modelViewerUi || ((i.modelViewerUi = new Shopify.ModelViewerUI(i.element)), l(i));
                        }
            }
            function l(t) {
                const e = i[t.sectionId];
                t.container.addEventListener("theme:media:visible", function () {
                    e.element.setAttribute(s.model3d, t.modelId), window.theme.touch || (t.modelViewerUi.play(), t.container.dispatchEvent(new CustomEvent("theme:media:play"), { bubbles: !0 }));
                }),
                    t.container.addEventListener("theme:media:hidden", function () {
                        t.modelViewerUi.pause();
                    }),
                    t.container.addEventListener("xrLaunch", function () {
                        t.modelViewerUi.pause();
                    }),
                    t.element.addEventListener("load", () => {
                        e.element.setAttribute(s.model3d, t.modelId), t.container.classList.remove(o.isLoading), t.container.dispatchEvent(new CustomEvent("theme:media:play"), { bubbles: !0 });
                    }),
                    t.element.addEventListener("shopify_model_viewer_ui_toggle_play", function () {
                        c(t.mediaId),
                            setTimeout(() => {
                                t.container.dispatchEvent(new CustomEvent("theme:media:play"), { bubbles: !0 });
                            }, 50);
                    }),
                    t.element.addEventListener("shopify_model_viewer_ui_toggle_pause", function () {
                        t.container.dispatchEvent(new CustomEvent("theme:media:pause"), { bubbles: !0 });
                    }),
                    c(t.mediaId);
            }
            function c(t) {
                const e = `[${s.mediaId}="${t}"]`,
                    i = document.querySelectorAll(`${s.productMediaWrapper}:not(${e})`);
                i.length &&
                    i.forEach((t) => {
                        t.dispatchEvent(new CustomEvent("theme:media:hidden"), { bubbles: !0 }), t.classList.add(o.mediaHidden);
                    });
            }
            return {
                init: function (e, i) {
                    t[i] = { loaded: !1 };
                    const o = e.querySelector(s.deferredMediaButton);
                    o && o.addEventListener("click", n.bind(this, e, i));
                },
                loadContent: n,
                removeSectionModels: function (i) {
                    for (const t in e)
                        if (e.hasOwnProperty(t)) {
                            e[t].sectionId === i && delete e[t];
                        }
                    delete t[i], delete theme.mediaInstances[i];
                },
            };
        })());
    const ma = "[data-range-slider]",
        ga = "[data-range-left]",
        va = "[data-range-right]",
        ya = "[data-range-line]",
        fa = "[data-range-holder]",
        ba = "data-se-min",
        wa = "data-se-max",
        Ea = "data-se-min-value",
        Sa = "data-se-max-value",
        La = "data-se-step",
        ka = "data-range-filter-update",
        Aa = "[data-field-price-min]",
        qa = "[data-field-price-max]",
        Ca = "is-initialized";
    const Ta = "[data-slider]",
        Pa = "[data-product-media-container]",
        Fa = "[data-product-media-slideshow]",
        Ia = "[data-product-media-slideshow-slide]",
        Da = "[data-product-slideshow-progress]",
        xa = ".flickity-button",
        Ha = "[data-product]",
        Ma = "[data-popup-close]",
        _a = "fill",
        Oa = "js-quick-view-visible",
        Ba = {};
    let za = class {
        productGridSlideshow() {
            const t = this.container.querySelectorAll(Fa),
                i = this.container.querySelectorAll(Pa);
            t.length &&
                t.forEach((t) => {
                    const i = t.closest(Pa),
                        s = i.querySelector(Da),
                        o = t.querySelectorAll(Ia).length,
                        n = 2200,
                        r = !this.sliders.length;
                    let a = new e.data(t),
                        l = 0,
                        c = Ia;
                    !a.isActive &&
                        o > 1 &&
                        ((a = new e(t, {
                            draggable: r,
                            cellSelector: c,
                            contain: !0,
                            wrapAround: !0,
                            imagesLoaded: !0,
                            lazyLoad: !0,
                            pageDots: !1,
                            prevNextButtons: !1,
                            adaptiveHeight: !1,
                            pauseAutoPlayOnHover: !1,
                            selectedAttraction: 0.2,
                            friction: 1,
                            on: {
                                ready: () => {
                                    this.container.style.setProperty("--autoplay-speed", "2200ms");
                                },
                                change: () => {
                                    l && clearTimeout(l),
                                        s.classList.remove(_a),
                                        requestAnimationFrame(() => {
                                            s.classList.add(_a);
                                        }),
                                        (l = setTimeout(() => {
                                            s.classList.remove(_a);
                                        }, n));
                                },
                                dragEnd: () => {
                                    a.playPlayer();
                                },
                            },
                        })),
                        window.theme.touch ||
                            (i.addEventListener("mouseenter", () => {
                                s.classList.add(_a),
                                    l && clearTimeout(l),
                                    (l = setTimeout(() => {
                                        s.classList.remove(_a);
                                    }, n)),
                                    (a.options.autoPlay = n),
                                    a.playPlayer();
                            }),
                            i.addEventListener("mouseleave", () => {
                                a.stopPlayer(), l && clearTimeout(l), s.classList.remove(_a);
                            })));
                }),
                i.length &&
                    i.forEach((t) => {
                        t.addEventListener("click", (t) => {
                            t.target.matches(xa) && t.preventDefault();
                        });
                    });
        }
        popupClose() {
            const t = document.querySelector(Ha);
            if (t) {
                t.querySelector(Ma).dispatchEvent(new Event("click"));
            }
        }
        onBlockSelect() {
            this.body.classList.contains(Oa) && this.popupClose();
        }
        onDeselect() {
            this.body.classList.contains(Oa) && this.popupClose();
        }
        onUnload() {
            this.body.classList.contains(Oa) && this.popupClose();
        }
        constructor(t) {
            (this.container = t),
                (this.body = document.body),
                (this.sliders = this.container.querySelectorAll(Ta)),
                "slideshow" !== theme.settings.productGridHover || window.theme.touch || this.productGridSlideshow(),
                new ur(this.container);
        }
    };
    const Wa = {
            onLoad() {
                Ba[this.id] = new za(this.container);
            },
            onBlockSelect() {
                Ba[this.id].onBlockSelect();
            },
            onDeselect() {
                Ba[this.id].onDeselect();
            },
            onUnload() {
                Ba[this.id].onUnload();
            },
        },
        $a = "#AjaxinateLoop",
        Va = "#AjaxinatePagination";
    let Ra = {},
        Na = class {
            init() {
                this.loadMoreFix(), (this.endlessScroll = new s({ container: $a, pagination: Va, method: "scroll" }));
            }
            loadMoreFix() {
                s.prototype.loadMore = function () {
                    (this.request = new XMLHttpRequest()),
                        (this.request.onreadystatechange = function () {
                            if (!this.request.responseXML) return;
                            if (4 === !this.request.readyState || 200 === !this.request.status) return;
                            const t = this.request.responseXML.querySelector(this.settings.container),
                                e = this.request.responseXML.querySelector(this.settings.pagination);
                            this.containerElement.insertAdjacentHTML("beforeend", t.innerHTML),
                                null == e
                                    ? this.removePaginationElement()
                                    : ((this.paginationElement.innerHTML = e.innerHTML), this.settings.callback && "function" == typeof this.settings.callback && this.settings.callback(this.request.responseXML), this.initialize());
                        }.bind(this)),
                        this.request.open("GET", this.nextPageUrl, !0),
                        (this.request.responseType = "document"),
                        this.request.send();
                };
            }
            unload() {
                this.endlessScroll && this.endlessScroll.destroy();
            }
            constructor(t) {
                (this.container = t), (this.endlessScroll = null), theme.settings.enableInfinityScroll && this.init();
            }
        };
    const Ua = {
            onLoad() {
                Ra = new Na(this.container);
            },
            onUnload: function () {
                "function" == typeof Ra.unload && Ra.unload();
            },
        },
        ja = 300,
        Ka = "[data-toggle-filters]",
        Qa = "[data-close-filters]",
        Ga = "[data-open-filters]",
        Xa = "[data-collection-wrapper]",
        Ja = "[data-collapsible-trigger]",
        Ya = "[data-sort-toggle]",
        Za = "[data-collection-sort-options]",
        tl = "[data-input-sort]",
        el = "[data-collection-filters]",
        il = "[data-collection-filters-list]",
        sl = "[data-collection-sticky-bar]",
        ol = "[data-collection-filter]",
        nl = "[data-collection-filter-tag]",
        rl = "[data-collection-filter-tag-button]",
        al = "[data-collection-filters-form]",
        ll = "[data-filter-reset-button]",
        cl = "[data-filter-tag-reset-button]",
        hl = '[data-section-type="popups"]',
        dl = "[data-collection-products]",
        ul = "[data-products-count]",
        pl = "[data-field-price-min]",
        ml = "[data-field-price-max]",
        gl = "[data-se-min-value]",
        vl = "[data-se-max-value]",
        yl = "data-se-min-value",
        fl = "data-se-max-value",
        bl = "data-se-min",
        wl = "data-se-max",
        El = "[data-tooltip]",
        Sl = "[data-show-more]",
        Ll = "[data-show-more-actions]",
        kl = "[data-show-more-container]",
        Al = "[data-show-more-trigger]",
        ql = "is-active",
        Cl = "is-expanded",
        Tl = "is-loading",
        Pl = "popup--visible",
        Fl = "collection__filters--visible",
        Il = "collection__sort__option-wrapper--visible",
        Dl = "data-filter-active",
        xl = "data-prevent-scroll-lock",
        Hl = "data-filters-default-state",
        Ml = "tabindex",
        _l = "aria-expanded",
        Ol = {};
    const Bl = {
        onLoad() {
            Ol[this.id] = new (class {
                initFacetedFilters() {
                    "tag" != this.filterMode &&
                        "group" != this.filterMode &&
                        this.enableFilters &&
                        (this.rangeSlider = new (class {
                            init() {
                                if (((this.slider = this.container.querySelector(ma)), !this.slider)) return;
                                (this.resizeFilters = n(this.reset.bind(this), 50)),
                                    (this.onMoveEvent = (t) => this.onMove(t)),
                                    (this.onStopEvent = (t) => this.onStop(t)),
                                    (this.onStartEvent = (t) => this.onStart(t)),
                                    (this.startX = 0),
                                    (this.x = 0),
                                    (this.touchLeft = this.slider.querySelector(ga)),
                                    (this.touchRight = this.slider.querySelector(va)),
                                    (this.lineSpan = this.slider.querySelector(ya)),
                                    (this.min = parseFloat(this.slider.getAttribute(ba))),
                                    (this.max = parseFloat(this.slider.getAttribute(wa))),
                                    (this.step = 0),
                                    (this.normalizeFact = 20);
                                let t = this.min;
                                this.slider.hasAttribute(Ea) && (t = parseFloat(this.slider.getAttribute(Ea)));
                                let e = this.max;
                                this.slider.hasAttribute(Sa) && (e = parseFloat(this.slider.getAttribute(Sa))),
                                    t < this.min && (t = this.min),
                                    e > this.max && (e = this.max),
                                    t > e && (t = e),
                                    this.slider.getAttribute(La) && (this.step = Math.abs(parseFloat(this.slider.getAttribute(La)))),
                                    this.reset(),
                                    window.addEventListener("theme:resize", this.resizeFilters),
                                    (this.maxX = this.slider.offsetWidth - this.touchRight.offsetWidth),
                                    (this.selectedTouch = null),
                                    (this.initialValue = this.lineSpan.offsetWidth - this.normalizeFact),
                                    this.setMinValue(t),
                                    this.setMaxValue(e),
                                    this.touchLeft.addEventListener("mousedown", this.onStartEvent),
                                    this.touchRight.addEventListener("mousedown", this.onStartEvent),
                                    this.touchLeft.addEventListener("touchstart", this.onStartEvent, { passive: !0 }),
                                    this.touchRight.addEventListener("touchstart", this.onStartEvent, { passive: !0 }),
                                    this.slider.classList.add(Ca);
                            }
                            reset() {
                                (this.touchLeft.style.left = "0px"),
                                    (this.touchRight.style.left = this.slider.offsetWidth - this.touchLeft.offsetWidth + "px"),
                                    (this.lineSpan.style.marginLeft = "0px"),
                                    (this.lineSpan.style.width = this.slider.offsetWidth - this.touchLeft.offsetWidth + "px"),
                                    (this.startX = 0),
                                    (this.x = 0),
                                    (this.maxX = this.slider.offsetWidth - this.touchRight.offsetWidth),
                                    (this.initialValue = this.lineSpan.offsetWidth - this.normalizeFact);
                            }
                            setMinValue(t) {
                                const e = (t - this.min) / (this.max - this.min);
                                (this.touchLeft.style.left = Math.ceil(e * (this.slider.offsetWidth - (this.touchLeft.offsetWidth + this.normalizeFact))) + "px"),
                                    (this.lineSpan.style.marginLeft = this.touchLeft.offsetLeft + "px"),
                                    (this.lineSpan.style.width = this.touchRight.offsetLeft - this.touchLeft.offsetLeft + "px"),
                                    this.slider.setAttribute(Ea, t);
                            }
                            setMaxValue(t) {
                                const e = (t - this.min) / (this.max - this.min);
                                (this.touchRight.style.left = Math.ceil(e * (this.slider.offsetWidth - (this.touchLeft.offsetWidth + this.normalizeFact)) + this.normalizeFact) + "px"),
                                    (this.lineSpan.style.marginLeft = this.touchLeft.offsetLeft + "px"),
                                    (this.lineSpan.style.width = this.touchRight.offsetLeft - this.touchLeft.offsetLeft + "px"),
                                    this.slider.setAttribute(Sa, t);
                            }
                            onStart(t) {
                                t.preventDefault();
                                let e = t;
                                t.touches && (e = t.touches[0]),
                                    t.currentTarget === this.touchLeft ? (this.x = this.touchLeft.offsetLeft) : t.currentTarget === this.touchRight && (this.x = this.touchRight.offsetLeft),
                                    (this.startX = e.pageX - this.x),
                                    (this.selectedTouch = t.currentTarget),
                                    document.addEventListener("mousemove", this.onMoveEvent),
                                    document.addEventListener("mouseup", this.onStopEvent),
                                    document.addEventListener("touchmove", this.onMoveEvent, { passive: !0 }),
                                    document.addEventListener("touchend", this.onStopEvent, { passive: !0 });
                            }
                            onMove(t) {
                                let e = t;
                                t.touches && (e = t.touches[0]),
                                    (this.x = e.pageX - this.startX),
                                    this.selectedTouch === this.touchLeft
                                        ? (this.x > this.touchRight.offsetLeft - this.selectedTouch.offsetWidth + 10 ? (this.x = this.touchRight.offsetLeft - this.selectedTouch.offsetWidth + 10) : this.x < 0 && (this.x = 0),
                                          (this.selectedTouch.style.left = this.x + "px"))
                                        : this.selectedTouch === this.touchRight &&
                                          (this.x < this.touchLeft.offsetLeft + this.touchLeft.offsetWidth - 10 ? (this.x = this.touchLeft.offsetLeft + this.touchLeft.offsetWidth - 10) : this.x > this.maxX && (this.x = this.maxX),
                                          (this.selectedTouch.style.left = this.x + "px")),
                                    (this.lineSpan.style.marginLeft = this.touchLeft.offsetLeft + "px"),
                                    (this.lineSpan.style.width = this.touchRight.offsetLeft - this.touchLeft.offsetLeft + "px"),
                                    this.calculateValue(),
                                    this.slider.getAttribute("on-change") && new Function("min, max", this.slider.getAttribute("on-change"))(this.slider.getAttribute(Ea), this.slider.getAttribute(Sa)),
                                    this.onChange(this.slider.getAttribute(Ea), this.slider.getAttribute(Sa));
                            }
                            onStop(t) {
                                document.removeEventListener("mousemove", this.onMoveEvent),
                                    document.removeEventListener("mouseup", this.onStopEvent),
                                    document.removeEventListener("touchmove", this.onMoveEvent, { passive: !0 }),
                                    document.removeEventListener("touchend", this.onStopEvent, { passive: !0 }),
                                    (this.selectedTouch = null),
                                    this.calculateValue(),
                                    this.onChanged(this.slider.getAttribute(Ea), this.slider.getAttribute(Sa));
                            }
                            onChange(t, e) {
                                const i = this.slider.closest(fa);
                                if (i) {
                                    const s = i.querySelector(Aa),
                                        o = i.querySelector(qa);
                                    s && o && ((s.value = parseInt(t)), (o.value = parseInt(e)));
                                }
                            }
                            onChanged(t, e) {
                                this.slider.hasAttribute(ka) && this.slider.dispatchEvent(new CustomEvent("theme:filter:range-update", { bubbles: !0 }));
                            }
                            calculateValue() {
                                const t = (this.lineSpan.offsetWidth - this.normalizeFact) / this.initialValue;
                                let e = this.lineSpan.offsetLeft / this.initialValue,
                                    i = e + t;
                                if (((e = e * (this.max - this.min) + this.min), (i = i * (this.max - this.min) + this.min), 0 !== this.step)) {
                                    let t = Math.floor(e / this.step);
                                    (e = this.step * t), (t = Math.floor(i / this.step)), (i = this.step * t);
                                }
                                this.selectedTouch === this.touchLeft && this.slider.setAttribute(Ea, e), this.selectedTouch === this.touchRight && this.slider.setAttribute(Sa, i);
                            }
                            unload() {
                                document.removeEventListener("theme:filters:init", this.initListener), window.removeEventListener("theme:resize", this.resizeFilters);
                            }
                            constructor(t) {
                                (this.container = t), this.init(), (this.initListener = () => this.init()), document.addEventListener("theme:filters:init", this.initListener);
                            }
                        })(this.container));
                }
                initTooltips() {
                    var t, e;
                    (this.tooltips = this.container.querySelectorAll(El)),
                        window.innerWidth < theme.sizes.small && (this.tooltips = null === (e = this.productGrid) || void 0 === e ? void 0 : e.querySelectorAll(El)),
                        null === (t = this.tooltips) ||
                            void 0 === t ||
                            t.forEach((t) => {
                                new Bo(t);
                            });
                }
                updateRange() {
                    const t = this.filtersForm.querySelector(gl),
                        e = this.filtersForm.querySelector(vl),
                        i = this.filtersForm.querySelector(pl),
                        s = this.filtersForm.querySelector(ml);
                    if (t.hasAttribute(yl) && e.hasAttribute(fl)) {
                        const o = parseFloat(i.placeholder, 10),
                            n = parseFloat(s.placeholder, 10),
                            r = parseFloat(t.getAttribute(yl), 10),
                            a = parseFloat(e.getAttribute(fl), 10);
                        (o === r && n === a) || ((i.value = parseInt(r)), (s.value = parseInt(a)), this.filtersForm.dispatchEvent(new Event("input", { bubbles: !0 })));
                    }
                }
                onSubmitHandler(t) {
                    t.preventDefault();
                    const e = new FormData(this.filtersForm),
                        i = new URLSearchParams(e),
                        s = this.filtersForm.querySelector(gl),
                        o = this.filtersForm.querySelector(vl),
                        n = this.filtersForm.querySelector(pl),
                        r = this.filtersForm.querySelector(ml);
                    if (s && o && n && r && s.hasAttribute(bl) && o.hasAttribute(wl)) {
                        const t = parseFloat(s.getAttribute(bl), 10),
                            e = parseFloat(o.getAttribute(wl), 10),
                            a = n.value ? parseFloat(n.value, 10) : t,
                            l = r.value ? parseFloat(r.value, 10) : e;
                        a <= t && l >= e && (i.delete("filter.v.price.gte"), i.delete("filter.v.price.lte"));
                    }
                    this.renderSection(i.toString(), t);
                }
                onHistoryChange(t) {
                    var e;
                    if (!this.filters) return;
                    const i = (null === (e = t.state) || void 0 === e ? void 0 : e.searchParams) || "";
                    this.renderSection(i, null, !1);
                }
                renderSection(t, e, i = !0) {
                    this.startLoading();
                    const s = `${window.location.pathname}?section_id=${this.sectionId}&${t}`,
                        o = (t) => t.url === s;
                    this.filterData.some(o) ? this.renderSectionFromCache(o, e) : this.renderSectionFromFetch(s, e), i && this.updateURLHash(t);
                }
                renderSectionFromFetch(t) {
                    fetch(t)
                        .then((t) => t.text())
                        .then((e) => {
                            const i = e;
                            (this.filterData = [...this.filterData, { html: i, url: t }]),
                                (this.inputSort = this.container.querySelectorAll(tl)),
                                this.renderFilters(i),
                                this.bindFilterButtonsEvents(),
                                this.hideFiltersOnMobile(),
                                this.renderProductGrid(i),
                                this.updateProductsCount(i),
                                this.finishLoading(),
                                this.mobileFiltersScrollLock();
                        });
                }
                renderSectionFromCache(t, e) {
                    const i = this.filterData.find(t).html;
                    this.renderFilters(i, e), this.hideFiltersOnMobile(), this.renderProductGrid(i), this.updateProductsCount(i), this.finishLoading(), this.mobileFiltersScrollLock();
                }
                renderProductGrid(t) {
                    const e = new DOMParser().parseFromString(t, "text/html").querySelector(dl);
                    e && ((this.productGrid.innerHTML = e.innerHTML), this.initProductGridEvents(theme.settings.enableInfinityScroll), this.filterShowMore());
                }
                updateProductsCount(t) {
                    const e = new DOMParser().parseFromString(t, "text/html").querySelector(ul);
                    e && (this.productsCount.innerHTML = e.innerHTML);

                }
                renderFilters(t) {
                    const e = new DOMParser().parseFromString(t, "text/html").querySelector(el);
                    e &&
                        ((this.filters.innerHTML = e.innerHTML),
                        (this.filtersForm = document.querySelector(al)),
                        this.bindFilterButtonsEvents(),
                        this.bindToggleButtonsEvents(),
                        to(this.container),
                        (this.collapsible = new wt(this.container)),
                        document.dispatchEvent(new CustomEvent("theme:filters:init", { bubbles: !0 })));
                }
                updateURLHash(t) {
                    history.pushState({ searchParams: t }, "", `${window.location.pathname}${t && "?".concat(t)}`);
                }
                bindFilterButtonsEvents() {
                    this.inputSort.length > 0 &&
                        this.inputSort.forEach((t) => {
                            t.addEventListener("change", this.updateCollectionFormSortEvent);
                        }),
                        this.filtersForm && (this.filtersForm.addEventListener("input", this.debouncedSubmitEvent.bind(this)), this.filtersForm.addEventListener("theme:filter:range-update", this.updateRangeEvent)),
                        this.collectionSortOptions && this.collectionSortOptions.addEventListener("keyup", this.onTabHandlerEvent),
                        "tag" != this.filterMode &&
                            "group" != this.filterMode &&
                            this.enableFilters &&
                            this.container.querySelectorAll(ll).forEach((t) => {
                                t.addEventListener("click", this.onFilterResetClick, { once: !0 });
                            });
                }
                onFilterResetClick(t) {
                    t.preventDefault(), this.renderSection(new URL(t.currentTarget.href).searchParams.toString());
                }
                bindToggleButtonsEvents() {
                    var t;
                    this.container.querySelectorAll(Ka).forEach((t) => {
                        t.addEventListener("click", this.onFilterToggleClick);
                    }),
                        this.container.querySelectorAll(Qa).forEach((t) => {
                            t.addEventListener("click", this.hideFiltersDrawer);
                        }),
                        this.container.querySelectorAll(Ga).forEach((t) => {
                            t.addEventListener("click", this.showFiltersDrawer);
                        }),
                        null === (t = this.container.querySelector(Xa)) || void 0 === t || t.addEventListener("keyup", this.onKeyUpHandler);
                }
                onTabHandler(t) {
                    if (t.code === theme.keyboardKeys.SPACE || t.code === theme.keyboardKeys.ENTER || t.code === theme.keyboardKeys.NUMPADENTER) {
                        const e = t.target.previousElementSibling.value;
                        this.filtersForm.querySelectorAll(tl).forEach((t) => {
                            t.checked && (t.checked = !1), t.value === e && (t.checked = !0);
                        }),
                            this.filtersForm.dispatchEvent(new Event("input", { bubbles: !0 })),
                            t.target.dispatchEvent(new Event("click", { bubbles: !0 }));
                    }
                }
                onKeyUpHandler(t) {
                    t.code === theme.keyboardKeys.ESCAPE && this.hideFiltersDrawer();
                }
                onFilterToggleClick(t) {
                    t.preventDefault(), b(), this.filters.classList.contains(Fl) ? this.hideFiltersDrawer() : this.showFiltersDrawer();
                }
                sortDropdownToggle() {
                    this.collectionSortOptions && this.collectionSortOptions.classList.toggle(Il);
                }
                bodyClick(t) {
                    if (!this.collectionSortOptions) return;
                    const e = this.sortToggle.contains(t.target);
                    this.collectionSortOptions.classList.contains(Il) && !e && this.sortDropdownToggle();
                }
                updateCollectionFormSort(t) {
                    const e = t.target,
                        i = e.value,
                        s = e.closest(Za);
                    this.container.querySelectorAll(tl).forEach((t) => {
                        t.value === i && (t.checked = !0);
                    }),
                        null !== s && this.filtersForm.dispatchEvent(new Event("input", { bubbles: !0 }));
                }
                showFiltersDrawer() {
                    (this.a11y.state.trigger = document.querySelector(Ka)), this.a11y.trapFocus({ container: this.filters }), this.mobileFiltersScrollLock();
                }
                mobileFiltersScrollLock() {
                    if (window.innerWidth < theme.sizes.small) {
                        const t = document.querySelector(il);
                        this.filters.classList.contains(Fl) || this.filters.classList.add(Fl), document.dispatchEvent(new CustomEvent("theme:scroll:lock", { bubbles: !0, detail: t }));
                    }
                }
                hideFiltersOnMobile() {
                    const t = this.container.querySelectorAll(`${Ja}:not(${Al})`);
                    window.innerWidth < theme.sizes.small &&
                        requestAnimationFrame(() => {
                            t.forEach((t) => {
                                const e = "true" === t.getAttribute(Dl);
                                t.classList.contains(Cl) && !e && t.dispatchEvent(new Event("click"));
                            });
                        });
                }
                showFiltersOnDesktop() {
                    const t = this.container.querySelectorAll(`${Ja}:not(${Al})`),
                        e = this.container.getAttribute(Hl),
                        i = "first-open" === e,
                        s = "open" === e,
                        o = "closed" === e,
                        n = this.enableSorting ? 1 : 0;
                    t.forEach((t, e) => {
                        const r = t.classList.contains(Cl),
                            a = "true" === t.getAttribute(Dl),
                            l = a && !r && s;
                        (a && !l) || (((o && r) || (i && !r && e === n) || (i && r && e !== n) || (s && !r) || l) && t.dispatchEvent(new Event("click")));
                    });
                }
                hideFiltersDrawer() {
                    let t = this.filters.classList.contains(Fl),
                        e = this.container.classList.contains(Tl);
                    t && (this.filters.classList.remove(Fl), this.a11y.removeTrapFocus()), e || document.dispatchEvent(new CustomEvent("theme:scroll:unlock", { bubbles: !0, detail: ja }));
                }
                filtersResizeEvents() {
                    window.innerWidth >= theme.sizes.small ? (this.showFiltersOnDesktop(), this.hideFiltersDrawer()) : this.hideFiltersOnMobile();
                }
                filterShowMore() {
                    (this.showMore = this.container.querySelectorAll(Sl)),
                        0 !== this.showMore.length &&
                            this.showMore.forEach((t) => {
                                const e = t.querySelector(Ja),
                                    i = t.querySelector(Ll);
                                if (!i) return;
                                const s = i.querySelector(Al),
                                    o = i.querySelector(kl),
                                    n = o.querySelectorAll(window.theme.focusable);
                                "true" === o.getAttribute(_l) ||
                                    n.forEach((t) => {
                                        t.setAttribute(Ml, "-1");
                                    }),
                                    s.addEventListener("keyup", (t) => {
                                        (t.code !== theme.keyboardKeys.SPACE && t.code !== theme.keyboardKeys.ENTER && t.code !== theme.keyboardKeys.NUMPADENTER) || this.updateShowMoreFocusableElements(t, n);
                                    }),
                                    s.addEventListener("click", (t) => {
                                        this.updateShowMoreFocusableElements(t, n);
                                    }),
                                    e.addEventListener("keyup", (t) => {
                                        (t.code !== theme.keyboardKeys.SPACE && t.code !== theme.keyboardKeys.ENTER && t.code !== theme.keyboardKeys.NUMPADENTER) || this.updateCollapsedContainerFocusableElements(e, s, n);
                                    }),
                                    e.addEventListener("click", () => {
                                        this.updateCollapsedContainerFocusableElements(e, s, n);
                                    });
                            });
                }
                updateCollapsedContainerFocusableElements(t, e, i) {
                    requestAnimationFrame(() => {
                        const s = "true" === t.getAttribute(_l),
                            o = "true" === e.getAttribute(_l);
                        i.forEach((t) => {
                            !s && o && t.setAttribute(Ml, "-1"), s && o && t.removeAttribute(Ml);
                        });
                    });
                }
                updateShowMoreFocusableElements(t, e) {
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            const i = "true" === t.target.getAttribute(_l);
                            e.forEach((t, e) => {
                                if (i) return t.removeAttribute(Ml), void (0 === e && t.focus());
                                t.setAttribute(Ml, "-1");
                            });
                        });
                    });
                }
                initTagFilters() {
                    ("tag" != this.filterMode && "group" != this.filterMode) || !this.enableFilters || ((this.tags = this.container.dataset.tags.split("+").filter((t) => t)), this.bindFilterTagButtonsEvents(), this.bindSortChangeEvent());
                }
                renderTagFiltersProducts(t) {
                    this.startLoading(),
                        "object" == typeof this.endlessCollection && this.endlessCollection.unload(),
                        fetch(t)
                            .then((t) => t.text())
                            .then((e) => {
                                const i = e,
                                    s = new DOMParser().parseFromString(i, "text/html"),
                                    o = s.querySelector(dl).innerHTML,
                                    n = s.querySelector(el).innerHTML;
                                (this.productGrid.innerHTML = o),
                                    (this.filters.innerHTML = n),
                                    (this.inputSort = this.container.querySelectorAll(tl)),
                                    (this.filtersForm = document.querySelector(al)),
                                    (this.filterData = [...this.filterData, { html: i, url: t }]),
                                    (this.alreadyClicked = !1),
                                    this.bindFilterTagButtonsEvents(),
                                    this.bindFilterButtonsEvents(),
                                    this.bindSortChangeEvent(),
                                    this.bindToggleButtonsEvents(),
                                    this.initProductGridEvents(theme.settings.enableInfinityScroll),
                                    this.updateProductsCount(i),
                                    this.mobileFiltersScrollLock(),
                                    this.hideFiltersOnMobile(),
                                    to(this.container),
                                    (this.collapsible = new wt(this.container)),
                                    this.filterShowMore(),
                                    history.replaceState && window.history.pushState({ path: t }, "", t);
                            })
                            .catch((t) => {
                                this.finishLoading(), console.log(`Error: ${t}`);
                            });
                }
                bindFilterTagButtonsEvents() {
                    this.container.querySelectorAll(rl).forEach((t) => {
                        t.addEventListener("click", this.onFilterTagButtonClick.bind(this));
                    }),
                        this.container.querySelectorAll(cl).forEach((t) => {
                            t.addEventListener("click", this.onFilterTagClearClick);
                        }),
                        this.container.querySelectorAll(ll).forEach((t) => {
                            t.addEventListener("click", this.onFilterTagResetClick);
                        });
                }
                bindSortChangeEvent() {
                    this.container.querySelectorAll(tl).forEach((t) => {
                        t.addEventListener("input", this.debouncedSortEvent.bind(this));
                    });
                }
                onFilterTagButtonClick(t) {
                    if ((t.preventDefault(), this.alreadyClicked)) return;
                    this.alreadyClicked = !0;
                    const e = t.currentTarget,
                        i = e.dataset.tag;
                    if (e.parentNode.classList.contains(ql)) {
                        let t = this.tags.indexOf(i);
                        e.parentNode.classList.remove(ql), t > -1 && this.tags.splice(t, 1);
                    } else e.parentNode.classList.add(ql), this.tags.push(i);
                    let s = this.collectionHandle + "/" + this.tags.join("+") + "?sort_by=" + this.getSortValue();
                    this.container.querySelector(ol).classList.remove(Cl), this.container.querySelector(ol).setAttribute(_l, !1), this.container.setAttribute("data-tags", "[" + this.tags + "]"), this.renderTagFiltersProducts(s);
                }
                onFilterTagClearClick(t) {
                    if ((t.preventDefault(), this.alreadyClicked)) return;
                    this.alreadyClicked = !0;
                    const e = t.currentTarget.dataset.tag,
                        i = this.tags.indexOf(e);
                    i > -1 && this.tags.splice(i, 1);
                    const s = this.collectionHandle + "/" + this.tags.join("+") + "?sort_by=" + this.getSortValue();
                    this.container.setAttribute("data-tags", "[" + this.tags + "]"), this.renderTagFiltersProducts(s);
                }
                onSortChange() {
                    let t = this.collectionHandle + "/" + this.tags.join("+") + "?sort_by=" + this.getSortValue();
                    this.renderTagFiltersProducts(t);
                }
                getSortValue() {
                    let t = "";
                    return (
                        this.inputSort.forEach((e) => {
                            e.checked && (t = e.value);
                        }),
                        t
                    );
                }
                onFilterTagResetClick(t) {
                    if ((null == t || t.preventDefault(), this.alreadyClicked)) return;
                    (this.alreadyClicked = !0),
                        this.container.querySelectorAll(nl).forEach((t) => {
                            t.classList.remove(ql);
                        }),
                        this.container.querySelectorAll(ol).forEach((t) => {
                            t.classList.remove(Cl), t.setAttribute(_l, !1);
                        }),
                        (this.tags = []),
                        this.container.setAttribute("data-tags", "");
                    let e = this.collectionHandle + "/?sort_by=" + this.getSortValue();
                    this.renderTagFiltersProducts(e);
                }
                getProductsOffsetTop() {
                    return this.productGrid.getBoundingClientRect().top - document.body.getBoundingClientRect().top - this.filtersStickyBar.offsetHeight;
                }
                getStickyBarOffsetTop() {
                    return this.filtersStickyBar.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
                }
                initProductGridEvents(t) {
                    (this.productGridEvents = new za(this.container)),
                        this.initTooltips(),
                        t
                            ? this.initInfinityScroll()
                            : setTimeout(() => {
                                  this.finishLoading();
                              }, 1.5 * ja);
                }
                initInfinityScroll() {
                    "object" == typeof this.endlessCollection && this.endlessCollection.unload(),
                        (this.endlessCollection = new Na(this.container)),
                        (this.endlessCollection.endlessScroll.settings.callback = () => {
                            this.initProductGridEvents(!1);
                        });
                }
                startLoading() {
                    this.container.classList.add(Tl), window.innerWidth >= theme.sizes.small && document.dispatchEvent(new CustomEvent("theme:scroll:lock", { bubbles: !0 }));
                    let t = this.getProductsOffsetTop();
                    window.scrollTo({ top: t, left: 0, behavior: "smooth" });
                }
                finishLoading() {
                    const t = document.querySelectorAll(`${hl} .${Pl}`),
                        e = t.length > 0;
                    if ((this.container.classList.remove(Tl), e)) {
                        let e = 0;
                        [...t].forEach((t) => {
                            t.hasAttribute(xl) && (e += 1);
                        }),
                            e === t.length && document.dispatchEvent(new CustomEvent("theme:scroll:unlock", { bubbles: !0, detail: ja }));
                    } else window.innerWidth >= theme.sizes.small && document.dispatchEvent(new CustomEvent("theme:scroll:unlock", { bubbles: !0, detail: ja }));
                }
                onDeselect() {
                    this.productGridEvents && this.productGridEvents.onDeselect();
                }
                onUnload() {
                    "object" == typeof this.endlessCollection && this.endlessCollection.unload(),
                        this.productGridEvents && this.productGridEvents.onUnload(),
                        this.collapsible && this.collapsible.onUnload(),
                        this.rangeSlider && this.rangeSlider.unload(),
                        this.filters && document.removeEventListener("theme:resize:width", this.resizeEvent),
                        document.removeEventListener("click", this.bodyClickEvent),
                        this.groupTagFilters.length > 0 && this.onFilterTagResetClick();
                }
                constructor(t) {
                    var e;
                    (this.container = t),
                        (this.sectionId = t.dataset.sectionId),
                        (this.enableFilters = "true" === t.dataset.enableFilters),
                        (this.enableSorting = "true" === t.dataset.enableSorting),
                        (this.filterMode = t.dataset.filterMode),
                        (this.collectionHandle = this.container.dataset.collection),
                        (this.productGrid = this.container.querySelector(dl)),
                        (this.productsCount = this.container.querySelector(ul)),
                        (this.groupTagFilters = this.container.querySelectorAll(ol)),
                        (this.filters = this.container.querySelector(el)),
                        (this.filterTriggers = this.container.querySelectorAll(Ja)),
                        (this.filtersStickyBar = this.container.querySelector(sl)),
                        (this.filtersForm = this.container.querySelector(al)),
                        (this.inputSort = this.container.querySelectorAll(tl)),
                        (this.sortToggle = this.container.querySelector(Ya)),
                        (this.collectionSortOptions = this.container.querySelector(Za)),
                        (this.a11y = Ft),
                        (this.filterData = []),
                        (this.rangeSlider = null),
                        (this.sortDropdownEvent = () => this.sortDropdownToggle()),
                        (this.onTabHandlerEvent = (t) => this.onTabHandler(t)),
                        (this.updateCollectionFormSortEvent = (t) => this.updateCollectionFormSort(t)),
                        (this.bodyClickEvent = (t) => this.bodyClick(t)),
                        (this.onFilterResetClick = this.onFilterResetClick.bind(this)),
                        (this.onFilterTagResetClick = this.onFilterTagResetClick.bind(this)),
                        (this.onFilterTagClearClick = this.onFilterTagClearClick.bind(this)),
                        (this.onFilterToggleClick = this.onFilterToggleClick.bind(this)),
                        (this.onKeyUpHandler = this.onKeyUpHandler.bind(this)),
                        (this.updateRangeEvent = this.updateRange.bind(this)),
                        (this.debouncedSubmitEvent = n((t) => {
                            this.onSubmitHandler(t);
                        }, 500)),
                        (this.debouncedSortEvent = n((t) => {
                            this.onSortChange(t);
                        }, 500)),
                        (this.productGridEvents = {}),
                        this.filters &&
                            ((this.hideFiltersDrawer = this.hideFiltersDrawer.bind(this)),
                            (this.showFiltersDrawer = this.showFiltersDrawer.bind(this)),
                            (this.resizeEvent = n(() => {
                                this.filtersResizeEvents();
                            }, 500)),
                            this.filtersResizeEvents(),
                            document.addEventListener("theme:resize:width", this.resizeEvent)),
                        this.initTagFilters(),
                        this.initFacetedFilters(),
                        this.bindToggleButtonsEvents(),
                        this.bindFilterButtonsEvents(),
                        this.initProductGridEvents(theme.settings.enableInfinityScroll),
                        to(this.container),
                        (this.collapsible = new wt(this.container)),
                        b(),
                        window.addEventListener("popstate", this.onHistoryChange.bind(this)),
                        null === (e = this.sortToggle) || void 0 === e || e.addEventListener("click", this.sortDropdownEvent),
                        document.addEventListener("click", this.bodyClickEvent),
                        this.filterShowMore();
                }
            })(this.container);
        },
        onDeselect() {
            Ol[this.id].onDeselect();
        },
        onUnload() {
            Ol[this.id].onUnload();
        },
    };
    it("collection-template", Bl);
    const zl = ".template-customers-addresses",
        Wl = "[data-form]",
        $l = "[data-form-new]",
        Vl = "[data-button-new]",
        Rl = "[data-button-edit]",
        Nl = "[data-button-delete]",
        Ul = "[data-button-cancel]",
        jl = "data-form-edit",
        Kl = "AddressCountryNew",
        Ql = "AddressProvinceNew",
        Gl = "AddressProvinceContainerNew",
        Xl = "[data-country-option]",
        Jl = "AddressCountry",
        Yl = "AddressProvince",
        Zl = "AddressProvinceContainer",
        tc = 'input[type="text"]:not(.optional)',
        ec = "data-form-id",
        ic = "is-hidden",
        sc = "validation--showup";
    const oc = document.querySelector(zl);
    oc &&
        new (class {
            init() {
                if (this.addressNewForm) {
                    const t = this.section,
                        e = this.addressNewForm;
                    this.customerAddresses();
                    const i = t.querySelectorAll(Vl);
                    i.length &&
                        i.forEach((t) => {
                            t.addEventListener("click", function (i) {
                                i.preventDefault(), t.classList.add(ic), e.classList.remove(ic);
                            });
                        });
                    const s = t.querySelectorAll(Rl);
                    s.length &&
                        s.forEach((e) => {
                            e.addEventListener("click", function (e) {
                                e.preventDefault();
                                const i = this.getAttribute(ec);
                                t.querySelector(`[${jl}="${i}"]`).classList.toggle(ic);
                            });
                        });
                    const o = t.querySelectorAll(Nl);
                    o.length &&
                        o.forEach((t) => {
                            t.addEventListener("click", function (t) {
                                t.preventDefault();
                                const e = this.getAttribute(ec);
                                confirm(theme.strings.delete_confirm) && Shopify.postLink("/account/addresses/" + e, { parameters: { _method: "delete" } });
                            });
                        });
                    const n = t.querySelectorAll(Ul);
                    n.length &&
                        n.forEach((t) => {
                            t.addEventListener("click", function (t) {
                                t.preventDefault(), this.closest(Wl).classList.add(ic), document.querySelector(Vl).classList.remove(ic);
                            });
                        });
                }
            }
            customerAddresses() {
                Shopify.CountryProvinceSelector && new Shopify.CountryProvinceSelector(Kl, Ql, { hideElement: Gl }),
                    this.section.querySelectorAll(Xl).forEach((t) => {
                        const e = t.getAttribute(ec),
                            i = `${Jl}_${e}`,
                            s = `${Yl}_${e}`,
                            o = `${Zl}_${e}`;
                        new Shopify.CountryProvinceSelector(i, s, { hideElement: o });
                    });
            }
            validate() {
                this.accountForms.forEach((t) => {
                    const e = t.querySelector("form"),
                        i = e.querySelectorAll(tc);
                    e.addEventListener("submit", (t) => {
                        let e = !1;
                        i.forEach((t) => {
                            t.value ? t.nextElementSibling.classList.remove(sc) : (t.nextElementSibling.classList.add(sc), (e = !0));
                        }),
                            e && t.preventDefault();
                    });
                });
            }
            constructor(t) {
                (this.section = t), (this.addressNewForm = this.section.querySelector($l)), (this.accountForms = this.section.querySelectorAll(Wl)), this.init(), this.validate();
            }
        })(oc);
    const nc = "[data-account-form]",
        rc = "[data-show-reset]",
        ac = "[data-hide-reset]",
        lc = "[data-recover-password]",
        cc = "[data-login-form]",
        hc = "[data-recover-success]",
        dc = "[data-recover-success-text]",
        uc = "#recover",
        pc = "is-hidden";
    const mc = document.querySelector(nc);
    mc &&
        new (class {
            init() {
                window.location.hash == uc ? this.showRecoverPasswordForm() : this.hideRecoverPasswordForm(),
                    this.success && this.successText.classList.remove(pc),
                    this.showButton.addEventListener(
                        "click",
                        (t) => {
                            t.preventDefault(), this.showRecoverPasswordForm();
                        },
                        !1
                    ),
                    this.hideButton.addEventListener(
                        "click",
                        (t) => {
                            t.preventDefault(), this.hideRecoverPasswordForm();
                        },
                        !1
                    );
            }
            showRecoverPasswordForm() {
                return this.recover.classList.remove(pc), this.login.classList.add(pc), (window.location.hash = uc), !1;
            }
            hideRecoverPasswordForm() {
                return this.login.classList.remove(pc), this.recover.classList.add(pc), (window.location.hash = ""), !1;
            }
            constructor(t) {
                (this.form = t),
                    (this.showButton = t.querySelector(rc)),
                    (this.hideButton = t.querySelector(ac)),
                    (this.recover = t.querySelector(lc)),
                    (this.login = t.querySelector(cc)),
                    (this.success = t.querySelector(hc)),
                    (this.successText = t.querySelector(dc)),
                    this.init();
            }
        })(mc),
        it("search-template", Bl);
    const gc = "[data-ticker-scale]",
        vc = "[data-ticker-text]",
        yc = "data-clone",
        fc = "data-marquee-speed",
        bc = "ticker--animated",
        wc = "ticker--unloaded",
        Ec = "ticker__comparitor",
        Sc = 1.63,
        Lc = 100;
    const kc = "[data-bar]",
        Ac = "[data-slide]",
        qc = "[data-top-bar-slide]",
        Cc = "[data-ticker-frame]",
        Tc = "[data-slider]",
        Pc = "[data-ticker-scale]",
        Fc = "[data-ticker-text]",
        Ic = "data-slide",
        Dc = "data-slider-speed",
        xc = "data-stop",
        Hc = "style",
        Mc = "data-target-referrer",
        _c = "desktop",
        Oc = "mobile",
        Bc = "ticker--animated",
        zc = {};
    const Wc = {
        onLoad() {
            zc[this.id] = [];
            const t = this.container.querySelector(kc);
            t &&
                zc[this.id].push(
                    new (class {
                        init() {
                            this.removeAnnouncement(), this.slider && (this.initSlider(), document.addEventListener("theme:resize:width", this.initSlider.bind(this))), this.slider || (this.initTickers(!0), this.tickerAnimationPause());
                        }
                        removeAnnouncement() {
                            for (let t = 0; t < this.slides.length; t++) {
                                const e = this.slides[t];
                                e.hasAttribute(Mc) && (-1 !== this.locationPath.indexOf(e.getAttribute(Mc)) || window.Shopify.designMode || e.parentNode.removeChild(e));
                            }
                        }
                        initSlider() {
                            if (this.slider.querySelectorAll(Ac)) {
                                let t = `${Ac}`;
                                (t = window.innerWidth < theme.sizes.small ? `${Ac}:not(.${_c})` : `${Ac}:not(.${Oc})`),
                                    null != this.flkty && this.flkty.destroy(),
                                    (this.flkty = new e(this.slider, {
                                        cellSelector: t,
                                        pageDots: !1,
                                        prevNextButtons: !1,
                                        wrapAround: !0,
                                        autoPlay: parseInt(this.slider.getAttribute(Dc), 10),
                                        on: {
                                            ready: () => {
                                                setTimeout(() => {
                                                    this.slider.dispatchEvent(new CustomEvent("slider-is-loaded", { bubbles: !0, detail: { slider: this } }));
                                                }, 10);
                                            },
                                        },
                                    })),
                                    this.flkty.reposition();
                            }
                            this.slider.addEventListener("slider-is-loaded", () => {
                                this.initTickers();
                            });
                        }
                        initTickers(t = !1) {
                            this.barHolder.querySelectorAll(Cc).forEach((e) => {
                                new (class {
                                    listen() {
                                        document.addEventListener("theme:resize:width", this.resizeEvent), this.checkWidth();
                                    }
                                    checkWidth() {
                                        const t = 2 * window.getComputedStyle(this.frame).paddingLeft.replace("px", "");
                                        if (this.frame.clientWidth - t < this.comparitor.clientWidth || this.stopClone) {
                                            if ((this.text.classList.add(bc), 1 === this.scale.childElementCount)) {
                                                if (((this.clone = this.text.cloneNode(!0)), this.clone.setAttribute(yc, ""), this.scale.appendChild(this.clone), this.stopClone))
                                                    for (let t = 0; t < 10; t++) {
                                                        const t = this.text.cloneNode(!0);
                                                        t.setAttribute(yc, ""), this.scale.appendChild(t);
                                                    }
                                                let t = this.frame.getAttribute(fc);
                                                null === t && (t = 100);
                                                const e = Sc * (100 / parseInt(t, 10)),
                                                    i = (this.text.clientWidth / Lc) * e;
                                                this.scale.style.setProperty("--animation-time", `${i}s`);
                                            }
                                        } else {
                                            this.text.classList.add(bc);
                                            let t = this.scale.querySelector(`[${yc}]`);
                                            t && this.scale.removeChild(t), this.text.classList.remove(bc);
                                        }
                                    }
                                    unload() {
                                        document.removeEventListener("theme:resize:width", this.resizeEvent);
                                    }
                                    constructor(t, e = !1) {
                                        (this.frame = t),
                                            (this.stopClone = e),
                                            (this.scale = this.frame.querySelector(gc)),
                                            (this.text = this.frame.querySelector(vc)),
                                            (this.comparitor = this.text.cloneNode(!0)),
                                            this.comparitor.classList.add(Ec),
                                            this.frame.appendChild(this.comparitor),
                                            this.scale.classList.remove(wc),
                                            (this.resizeEvent = n(() => this.checkWidth(), 100)),
                                            this.listen();
                                    }
                                })(e, t);
                                const i = e.querySelectorAll(Ac);
                                if (0 !== i.length) {
                                    const t = e.querySelectorAll(`${Ac}.${Oc}`),
                                        s = e.querySelectorAll(`${Ac}.${_c}`);
                                    i.length === t.length ? e.parentNode.classList.add(Oc) : i.length === s.length && e.parentNode.classList.add(_c);
                                }
                            });
                        }
                        toggleTicker(t, e) {
                            const i = t.target.closest(Pc),
                                s = document.querySelector(`[${Ic}="${t.detail.blockId}"]`);
                            e &&
                                s &&
                                (i.setAttribute(xc, ""),
                                i.querySelectorAll(Fc).forEach((t) => {
                                    t.classList.remove(Bc), (t.style.transform = `translate3d(${-(s.offsetLeft - parseInt(getComputedStyle(s).marginLeft, 10))}px, 0, 0)`);
                                })),
                                !e &&
                                    s &&
                                    (i.querySelectorAll(Fc).forEach((t) => {
                                        t.classList.add(Bc), t.removeAttribute(Hc);
                                    }),
                                    i.removeAttribute(xc));
                        }
                        tickerAnimationPause() {
                            let t = 0,
                                e = !1;
                            const i = this.barHolder.querySelector(qc);
                            i.addEventListener("mouseenter", () => {
                                (e = !0),
                                    (t = setTimeout(() => {
                                        e &&
                                            i.querySelectorAll(Fc).forEach((t) => {
                                                t.style.animationPlayState = "paused";
                                            }),
                                            clearTimeout(t);
                                    }, 500));
                            }),
                                i.addEventListener("mouseleave", () => {
                                    (e = !1),
                                        i.querySelectorAll(Fc).forEach((t) => {
                                            t.style.animationPlayState = "running";
                                        });
                                });
                        }
                        onBlockSelect(t) {
                            const e = parseInt([...t.target.parentNode.children].indexOf(t.target));
                            this.slider && null !== this.flkty && (this.flkty.select(e), this.flkty.pausePlayer()), this.slider || this.toggleTicker(t, !0);
                        }
                        onBlockDeselect(t) {
                            this.slider && null !== this.flkty && this.flkty.unpausePlayer(), this.slider || this.toggleTicker(t, !1);
                        }
                        onUnload() {
                            document.removeEventListener("theme:resize:width", this.initSlider.bind(this));
                        }
                        constructor(t) {
                            (this.barHolder = t), (this.locationPath = location.href), (this.slides = this.barHolder.querySelectorAll(Ac)), (this.slider = this.barHolder.querySelector(Tc)), (this.flkty = null), this.init();
                        }
                    })(t)
                );
        },
        onBlockSelect(t) {
            zc[this.id].length &&
                zc[this.id].forEach((e) => {
                    "function" == typeof e.onBlockSelect && e.onBlockSelect(t);
                });
        },
        onBlockDeselect(t) {
            zc[this.id].length &&
                zc[this.id].forEach((e) => {
                    "function" == typeof e.onBlockSelect && e.onBlockDeselect(t);
                });
        },
    };
    it("announcement-bar", Wc), it("marquee", Wc);
    const $c = "[data-collapsible-trigger]",
        Vc = "is-expanded";
    it("accordions", [
        {
            onBlockSelect(t) {
                const e = t.target.querySelector($c);
                requestAnimationFrame(() => {
                    e.classList.contains(Vc) || e.dispatchEvent(new Event("click"));
                });
            },
        },
        Et,
    ]);
    const Rc = "[data-share-button]",
        Nc = "[data-share-button-tooltip]",
        Uc = "is-visible",
        jc = "is-hiding",
        Kc = {};
    const Qc = {
        onLoad() {
            Kc[this.id] = new (class {
                init() {
                    this.button &&
                        this.button.addEventListener("click", () => {
                            let t = window.location.href;
                            this.button.dataset.shareLink && (t = this.button.dataset.shareLink),
                                this.tooltip.classList.contains(Uc) ||
                                    navigator.clipboard.writeText(t).then(() => {
                                        this.tooltip.classList.add(Uc),
                                            setTimeout(() => {
                                                this.tooltip.classList.add(jc),
                                                    this.tooltip.classList.remove(Uc),
                                                    this.hideTransitionTimeout && clearTimeout(this.hideTransitionTimeout),
                                                    (this.hideTransitionTimeout = setTimeout(() => {
                                                        this.tooltip.classList.remove(jc);
                                                    }, this.transitionSpeed));
                                            }, 1500);
                                    });
                        });
                }
                constructor(t) {
                    (this.container = t), (this.button = this.container.querySelector(Rc)), (this.tooltip = this.container.querySelector(Nc)), (this.transitionSpeed = 200), (this.hideTransitionTimeout = 0), this.init();
                }
            })(this.container);
        },
    };
    it("article", [Qc]);
    const Gc = "[data-video-play]",
        Xc = "data-video-play";
    const Jc = {
            onLoad() {
                new (class {
                    init() {
                        this.videoPlay.length &&
                            this.videoPlay.forEach((t) => {
                                t.addEventListener("click", (e) => {
                                    if (t.hasAttribute(Xc) && "" !== t.getAttribute(Xc).trim()) {
                                        e.preventDefault();
                                        const i = [{ html: t.getAttribute(Xc) }];
                                        (this.a11y.state.trigger = t), new Kn(i);
                                    }
                                });
                            });
                    }
                    constructor(t) {
                        (this.container = t), (this.videoPlay = this.container.querySelectorAll(Gc)), (this.a11y = Ft), this.init();
                    }
                })(this.container);
            },
        },
        Yc = "[data-site-header]",
        Zc = "[data-main]";
    let th = {};
    const eh = {
        onLoad() {
            th[this.id] = new (class {
                init() {
                    var t;
                    if ("true" !== this.container.dataset.zoomAnimation) return;
                    const e = this.container,
                        i = document.body.querySelector(Zc).children[0],
                        s = this.container.parentNode === i,
                        o = "true" == (null === (t = this.header) || void 0 === t ? void 0 : t.dataset.transparent),
                        n = () => {
                            var t, i;
                            const n = s & o ? 0 : parseInt((null === (t = this.header) || void 0 === t ? void 0 : t.dataset.height) || (null === (i = this.header) || void 0 === i ? void 0 : i.offsetHeight)),
                                r = e.getBoundingClientRect(),
                                a = e.offsetHeight,
                                l = s ? n - r.top : n - r.top + window.innerHeight;
                            let c = 0.1;
                            s && (c *= 1.5);
                            let h = 1 + (l / a) * c;
                            (h = h > 1 ? h : 1), e.style.setProperty("--scale", h);
                        };
                    n(),
                        (this.zoomOnScrollEvent = lt(n, 5)),
                        new IntersectionObserver(
                            (t) => {
                                t[0].isIntersecting ? window.addEventListener("scroll", this.zoomOnScrollEvent) : window.removeEventListener("scroll", this.zoomOnScrollEvent);
                            },
                            { root: null, rootMargin: "0px", threshold: 0 }
                        ).observe(e);
                }
                onUnload() {
                    null !== this.zoomOnScrollEvent && window.removeEventListener("scroll", this.zoomOnScrollEvent);
                }
                constructor(t) {
                    (this.container = t), (this.header = document.querySelector(Yc)), this.init();
                }
            })(this.container);
        },
        onUnload() {
            th[this.id].onUnload();
        },
    };
    it("banner-image", [eh, Jc]);
    const ih = "[data-banner]",
        sh = "[data-slider]",
        oh = "[data-banners-media]",
        nh = "data-index",
        rh = "data-slider-single-image";
    let ah = {};
    it("banner-with-text-columns", {
        onLoad() {
            ah[this.id] = new (class {
                initSliders() {
                    if (this.slider.children.length <= 1) return;
                    let t = window.innerWidth < window.theme.sizes.small;
                    this.sliderMedia.children.length > 1 &&
                        ((this.flktyMedia = new e(this.sliderMedia, { draggable: !1, wrapAround: !1, fade: !0, prevNextButtons: !1, adaptiveHeight: !1, pageDots: !1, setGallerySize: !1 })), te(this.sliderMedia)),
                        (this.flkty = new e(this.slider, {
                            draggable: t,
                            prevNextButtons: !1,
                            pageDots: !0,
                            cellAlign: "left",
                            adaptiveHeight: !1,
                            imagesLoaded: !0,
                            lazyLoad: !0,
                            on: {
                                ready: () => {
                                    this.links.forEach((t) => {
                                        t.addEventListener("focus", () => {
                                            const e = Number(t.closest(ih).getAttribute(nh));
                                            window.innerWidth >= theme.sizes.small && this.syncContent(e);
                                        });
                                    }),
                                        this.banners.forEach((t) => {
                                            t.addEventListener("mouseenter", () => {
                                                const e = Number(t.getAttribute(nh));
                                                window.innerWidth >= theme.sizes.small && !window.theme.touch && this.syncContent(e);
                                            }),
                                                t.addEventListener("pointerup", () => {
                                                    const e = Number(t.getAttribute(nh));
                                                    window.innerWidth >= theme.sizes.small && window.theme.touch && this.syncContent(e);
                                                });
                                        });
                                },
                                change: (t) => {
                                    window.innerWidth < theme.sizes.small && !this.singleImageEnabled && this.flktyMedia.select(t);
                                },
                            },
                        })),
                        te(this.slider);
                }
                syncContent(t = 0) {
                    this.flkty.selectCell(t), this.flktyMedia && this.flktyMedia.selectCell(t);
                }
                resizeSlider() {
                    this.flkty && (this.flkty.resize(), this.toggleDraggable()), this.flktyMedia && this.flktyMedia.resize();
                }
                toggleDraggable() {
                    (this.flkty.options.draggable = window.innerWidth < window.theme.sizes.small), this.flkty.updateDraggable();
                }
                onBlockSelect(t) {
                    const e = parseInt([...t.target.parentNode.children].indexOf(t.target));
                    this.flktyMedia && this.flktyMedia.selectCell(e);
                }
                onUnload() {
                    document.removeEventListener("theme:resize:width", this.sliderResizeEvent);
                }
                constructor(t) {
                    var e;
                    (this.container = t.container),
                        (this.slider = this.container.querySelector(sh)),
                        (this.singleImageEnabled = null === (e = this.slider) || void 0 === e ? void 0 : e.hasAttribute(rh)),
                        (this.banners = this.container.querySelectorAll(ih)),
                        (this.links = this.container.querySelectorAll("a")),
                        (this.sliderMedia = this.container.querySelector(oh)),
                        (this.flkty = null),
                        (this.flktyMedia = null),
                        (this.sliderResizeEvent = () => this.resizeSlider()),
                        this.slider && (this.initSliders(), document.addEventListener("theme:resize:width", this.sliderResizeEvent));
                }
            })(this);
        },
        onBlockSelect(t) {
            ah[this.id].onBlockSelect(t);
        },
    }),
        it("blog-posts", Ua);
    const lh = "[data-slider]",
        ch = "[data-slider-item]",
        hh = "[data-media-container]",
        dh = "a, button",
        uh = ".flickity-button",
        ph = "carousel--inactive",
        mh = "tabindex",
        gh = {};
    const vh = {
        onLoad() {
            gh[this.id] = new (class {
                initSlider() {
                    this.slider.classList.remove(ph),
                        (this.flkty = new e(this.slider, {
                            pageDots: !1,
                            cellAlign: "left",
                            groupCells: !0,
                            contain: !0,
                            on: {
                                ready: () => {
                                    this.setSliderArrowsPosition(this.slider),
                                        setTimeout(() => {
                                            this.changeTabIndex();
                                        }, 0);
                                },
                                change: () => {
                                    this.changeTabIndex();
                                },
                            },
                        }));
                }
                destroySlider() {
                    this.slider.classList.add(ph), null !== this.flkty && (this.flkty.destroy(), (this.flkty = null));
                }
                checkSlidesSize() {
                    const t = this.container.querySelector(ch).currentStyle || window.getComputedStyle(this.container.querySelector(ch));
                    this.gutter = parseInt(t.marginRight);
                    const e = this.slider.offsetWidth < this.getItemsWidth();
                    window.innerWidth >= theme.sizes.small && e ? this.initSlider() : this.destroySlider();
                }
                changeTabIndex() {
                    const t = this.flkty.selectedIndex;
                    this.flkty.slides.forEach((e, i) => {
                        e.cells.forEach((e) => {
                            e.element.querySelectorAll(dh).forEach((e) => {
                                e.setAttribute(mh, t === i ? "0" : "-1");
                            });
                        });
                    });
                }
                getItemsWidth() {
                    let t = 0;
                    const e = this.slider.querySelectorAll(ch);
                    return (
                        e.length &&
                            e.forEach((e) => {
                                t += e.offsetWidth + this.gutter;
                            }),
                        t
                    );
                }
                listen() {
                    this.slider && (this.checkSlidesSize(), document.addEventListener("theme:resize:width", this.checkSlidesSizeOnResize));
                }
                setSliderArrowsPosition(t) {
                    const e = t.querySelectorAll(uh),
                        i = t.querySelector(hh);
                    e.length &&
                        i &&
                        e.forEach((t) => {
                            t.style.top = i.offsetHeight / 2 + "px";
                        });
                }
                onBlockSelect(t) {
                    if (null !== this.flkty) {
                        const e = parseInt([...t.target.parentNode.children].indexOf(t.target)),
                            i = parseInt(this.flkty.slides[0].cells.length),
                            s = Math.floor(e / i);
                        this.flkty.select(s);
                    } else {
                        const e = this.slider.currentStyle || window.getComputedStyle(this.slider),
                            i = parseInt(e.paddingLeft),
                            s = t.target.offsetLeft - i;
                        this.slider.scrollTo({ top: 0, left: s, behavior: "smooth" });
                    }
                }
                onUnload() {
                    document.removeEventListener("theme:resize:width", this.checkSlidesSizeOnResize);
                }
                constructor(t) {
                    (this.container = t.container), (this.slider = this.container.querySelector(lh)), (this.flkty = null), (this.gutter = 0), (this.checkSlidesSizeOnResize = () => this.checkSlidesSize()), this.listen();
                }
            })(this);
        },
        onUnload(t) {
            gh[this.id].onUnload(t);
        },
        onBlockSelect(t) {
            gh[this.id].onBlockSelect(t);
        },
    };
    it("columns-with-image", [vh, Jc]);
    const yh = "[data-form-message-close]",
        fh = "[data-form-message]",
        bh = "hide-down",
        wh = "notification-visible";
    let Eh = {};
    it("contact-form", {
        onLoad() {
            Eh[this.id] = new (class {
                hidePopups() {
                    document.body.classList.add(wh);
                }
                showPopups() {
                    document.body.classList.remove(wh);
                }
                closeFormMessage() {
                    this.closeButton.addEventListener("click", this.closeMessage.bind(this));
                }
                closeMessage(t) {
                    t.preventDefault(), this.messageWrapper.classList.add(bh), this.showPopups();
                }
                autoHideMessage() {
                    setTimeout(() => {
                        this.messageWrapper.classList.add(bh), this.showPopups();
                    }, 1e4);
                }
                constructor(t) {
                    (this.container = t.container),
                        (this.closeButton = this.container.querySelector(yh)),
                        (this.messageWrapper = this.container.querySelector(fh)),
                        this.messageWrapper && (this.hidePopups(), this.closeFormMessage(), this.autoHideMessage());
                }
            })(this);
        },
    });
    const Sh = "[data-video-id]",
        Lh = "[data-video-player]",
        kh = "[data-video-template]",
        Ah = "[data-video-autoplay]",
        qh = "[data-video-wrapper]",
        Ch = "is-loading",
        Th = {};
    const Ph = {
        onLoad() {
            Th[this.id] = [];
            this.container.querySelectorAll(qh).forEach((t) => {
                Th[this.id].push(
                    new (class {
                        init() {
                            this.videoId &&
                                new IntersectionObserver(
                                    (t, e) => {
                                        t.forEach((t) => {
                                            if (t.isIntersecting) {
                                                const i = this.videoTemplate.innerHTML;
                                                (this.videoPlayer.innerHTML = i), (this.video = this.container.querySelector(Ah)), this.videoPlayer.classList.remove(Ch), this.listen(), e.unobserve(t.target);
                                            }
                                        });
                                    },
                                    { root: null, rootMargin: "300px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
                                ).observe(this.videoPlayer);
                        }
                        listen() {
                            this.container.addEventListener(
                                "touchstart",
                                () => {
                                    this.video.play();
                                },
                                { passive: !0 }
                            );
                        }
                        constructor(t) {
                            (this.container = t), (this.videoId = this.container.querySelector(Sh)), (this.videoPlayer = this.container.querySelector(Lh)), (this.videoTemplate = this.container.querySelector(kh)), this.init();
                        }
                    })(t)
                );
            });
        },
    };
    let Fh = class {
        write() {
            ((-1 !== document.cookie.indexOf("; ") && !document.cookie.split("; ").find((t) => t.startsWith(this.name))) || -1 === document.cookie.indexOf("; ")) &&
                (document.cookie = `${this.name}=${this.value}; expires=${this.configuration.expires}; path=${this.configuration.path}; domain=${this.configuration.domain}; sameSite=${this.configuration.sameSite}; secure=${this.configuration.secure}`);
        }
        read() {
            if (-1 !== document.cookie.indexOf("; ") && document.cookie.split("; ").find((t) => t.startsWith(this.name))) {
                return document.cookie
                    .split("; ")
                    .find((t) => t.startsWith(this.name))
                    .split("=")[1];
            }
            return !1;
        }
        destroy() {
            document.cookie.split("; ").find((t) => t.startsWith(this.name)) &&
                (document.cookie = `${this.name}=null; expires=${this.configuration.expires}; path=${this.configuration.path}; domain=${this.configuration.domain}; sameSite=${this.configuration.sameSite}; secure=${this.configuration.secure}`);
        }
        constructor(t, e) {
            (this.configuration = { expires: null, path: "/", domain: window.location.hostname, sameSite: "none", secure: !0 }), (this.name = t), (this.value = e);
        }
    };
    const Ih = "[data-newsletter-form]",
        Dh = "[data-popup]",
        xh = "has-success",
        Hh = "has-error",
        Mh = "newsletter_form_id",
        _h = {};
    const Oh = {
            onLoad() {
                _h[this.id] = [];
                this.container.querySelectorAll(Ih).forEach((t) => {
                    _h[this.id].push(
                        new (class {
                            init() {
                                this.newsletter.addEventListener("submit", this.newsletterSubmit), this.showMessage();
                            }
                            newsletterSubmitEvent(t) {
                                this.stopSubmit && (t.preventDefault(), this.removeStorage(), this.writeStorage(), (this.stopSubmit = !1), this.newsletter.submit());
                            }
                            checkForChallengePage() {
                                this.isChallengePage = window.location.pathname === theme.routes.root + "challenge";
                            }
                            writeStorage() {
                                void 0 !== this.sessionStorage && this.sessionStorage.setItem(Mh, this.newsletter.id);
                            }
                            readStorage() {
                                this.formID = this.sessionStorage.getItem(Mh);
                            }
                            removeStorage() {
                                this.sessionStorage.removeItem(Mh);
                            }
                            showMessage() {
                                if ((this.readStorage(), this.newsletter.id === this.formID)) {
                                    const t = document.getElementById(this.formID),
                                        e = -1 !== window.location.search.indexOf("?customer_posted=true"),
                                        i = -1 !== window.location.search.indexOf("accepts_marketing");
                                    e
                                        ? (t.classList.remove(Hh), t.classList.add(xh), this.popup && ((this.cookie = new Fh(this.popup.dataset.cookieName, "user_has_closed")), this.cookie.write()))
                                        : i && (t.classList.remove(xh), t.classList.add(Hh)),
                                        (e || i) && this.scrollToForm(t);
                                }
                            }
                            scrollToForm(t) {
                                const e = t.getBoundingClientRect();
                                visibilityHelper.isElementPartiallyVisible(t) ||
                                    visibilityHelper.isElementTotallyVisible(t) ||
                                    setTimeout(() => {
                                        window.scrollTo({ top: e.top, left: 0, behavior: "smooth" });
                                    }, 400);
                            }
                            onUnload() {
                                this.newsletter.removeEventListener("submit", this.newsletterSubmit);
                            }
                            constructor(t) {
                                (this.newsletter = t),
                                    (this.sessionStorage = window.sessionStorage),
                                    (this.popup = this.newsletter.closest(Dh)),
                                    (this.stopSubmit = !0),
                                    (this.isChallengePage = !1),
                                    (this.formID = null),
                                    (this.formIdSuccess = null),
                                    this.checkForChallengePage(),
                                    (this.newsletterSubmit = (t) => this.newsletterSubmitEvent(t)),
                                    this.isChallengePage || this.init();
                            }
                        })(t)
                    );
                });
            },
            onUnload() {
                _h[this.id].forEach((t) => {
                    "function" == typeof t.onUnload && t.onUnload();
                });
            },
        },
        Bh = "[data-product]",
        zh = "[data-slider]",
        Wh = "[data-slide]",
        $h = "[data-product-media-container]",
        Vh = ".flickity-button",
        Rh = "a, button",
        Nh = "tabindex",
        Uh = {};
    const jh = {
        onLoad() {
            Uh[this.id] = new (class {
                checkSlider() {
                    window.innerWidth >= theme.sizes.small
                        ? this.productSlider.forEach((t) => {
                              this.initProductSlider(t);
                          })
                        : this.productSlider.forEach((t) => {
                              this.destroyProductSlider(t);
                          });
                }
                initProductSlider(t) {
                    const i = t.querySelectorAll(Wh).length,
                        s = t.dataset.slider;
                    i > 1 &&
                        (void 0 !== this.flkty[s] && this.flkty[s].isActive
                            ? this.setSliderArrowsPosition(t)
                            : (this.flkty[s] = new e(t, {
                                  prevNextButtons: !0,
                                  pageDots: !0,
                                  wrapAround: !0,
                                  on: {
                                      ready: () => {
                                          this.setSliderArrowsPosition(t);
                                      },
                                      change: (t) => {
                                          this.flkty[s].cells.forEach((e, i) => {
                                              e.element.querySelectorAll(Rh).forEach((e) => {
                                                  e.setAttribute(Nh, i === t ? "0" : "-1");
                                              });
                                          });
                                      },
                                  },
                              })));
                }
                destroyProductSlider(t) {
                    const e = t.dataset.slider;
                    "object" == typeof this.flkty[e] && this.flkty[e].destroy();
                }
                setSliderArrowsPosition(t) {
                    const e = t.querySelectorAll(Vh),
                        i = t.querySelector($h);
                    e.length &&
                        i &&
                        e.forEach((t) => {
                            t.style.top = i.offsetHeight / 2 + "px";
                        });
                }
                listen() {
                    this.checkSlider(), document.addEventListener("theme:resize:width", this.checkSliderOnResize);
                }
                onUnload() {
                    if (this.flkty) for (const t in this.flkty) this.flkty.hasOwnProperty(t) && this.flkty[t].destroy();
                    document.removeEventListener("theme:resize:width", this.checkSliderOnResize);
                }
                constructor(t) {
                    (this.container = t),
                        (this.product = this.container.querySelectorAll(Bh)),
                        (this.productSlider = this.container.querySelectorAll(zh)),
                        (this.checkSliderOnResize = () => this.checkSlider()),
                        (this.flkty = []),
                        (this.videoObj = []),
                        (this.quickViewObj = []),
                        this.listen();
                }
            })(this.container);
        },
        onUnload(t) {
            Uh[this.id].onUnload(t);
        },
    };
    it("custom-content", [jh, Oh, Jc, Ph, Wa]);
    const Kh = "[data-slider]",
        Qh = "[data-slide]",
        Gh = "[data-product-media-container]",
        Xh = "a, button",
        Jh = ".flickity-button",
        Yh = "[data-promo]",
        Zh = "carousel",
        td = "carousel--inactive",
        ed = "is-last-slide-visible",
        id = "featured-collection",
        sd = "collection-promo--full",
        od = "collection-promo--two-columns",
        nd = "data-slider-id",
        rd = "data-slider-show-image",
        ad = "tabindex",
        ld = {};
    let cd = class {
        initSlider(t) {
            const i = t.getAttribute(nd);
            t.classList.remove(td),
                void 0 !== this.flkty[i] && this.flkty[i].isActive
                    ? this.setSliderArrowsPosition(t)
                    : ((this.flkty[i] = new e(t, {
                          pageDots: !1,
                          cellSelector: Qh,
                          cellAlign: "left",
                          groupCells: !0,
                          contain: !0,
                          wrapAround: !1,
                          adaptiveHeight: !1,
                          on: {
                              ready: () => {
                                  this.setSliderArrowsPosition(t),
                                      setTimeout(() => {
                                          this.changeTabIndex(t);
                                      }, 0);
                              },
                              change: () => {
                                  this.changeTabIndex(t);
                              },
                          },
                      })),
                      this.handleLastSlideOverlayOnTablet(t));
        }
        destroySlider(t) {
            const e = t.getAttribute(nd);
            t.classList.contains(Zh) && t.classList.add(td), "object" == typeof this.flkty[e] && this.flkty[e].destroy();
        }
        resetSlider(t) {
            const e = t.target,
                i = e.getAttribute(nd);
            "object" == typeof this.flkty[i] ? this.flkty[i].select(0, !1, !0) : e.scrollTo({ left: 0, behavior: "instant" });
        }
        checkSlidesSize() {
            this.sliders.length &&
                this.sliders.forEach((t) => {
                    const e = this.columns,
                        i = window.innerWidth >= theme.sizes.large,
                        s = window.innerWidth >= theme.sizes.small && window.innerWidth < theme.sizes.large,
                        o = t.querySelectorAll(Qh);
                    let n = o.length;
                    const r = t.querySelectorAll(Yh);
                    let a = !1;
                    if (
                        (r.length &&
                            i &&
                            r.forEach((t) => {
                                t.classList.contains(sd) ? (n += e - 1) : t.classList.contains(od) && (n += 1);
                            }),
                        t.hasAttribute(rd) && (n += 1),
                        e)
                    )
                        a = n > e;
                    else {
                        const e = window.getComputedStyle(t, null);
                        let i = t.clientWidth;
                        (i -= parseFloat(e.paddingLeft) + parseFloat(e.paddingRight)), (a = this.getSlidesWidth(o) > i);
                    }
                    (i && a) || (s && n > 2) ? this.initSlider(t) : this.destroySlider(t);
                });
        }
        changeTabIndex(t) {
            const e = t.getAttribute(nd),
                i = this.flkty[e].selectedIndex;
            this.flkty[e].slides.forEach((t, e) => {
                t.cells.forEach((t) => {
                    t.element.querySelectorAll(Xh).forEach((t) => {
                        t.setAttribute(ad, i === e ? "0" : "-1");
                    });
                });
            });
        }
        getSlidesWidth(t) {
            let e = 0;
            return (
                t.length &&
                    t.forEach((t) => {
                        e += t.offsetWidth;
                    }),
                e
            );
        }
        setSliderArrowsPosition(t) {
            const e = t.querySelectorAll(Jh),
                i = t.querySelector(Gh);
            e.length &&
                i &&
                e.forEach((t) => {
                    t.style.top = i.offsetHeight / 2 + "px";
                });
        }
        handleLastSlideOverlayOnTablet(t) {
            const e = t.getAttribute(nd);
            this.flkty[e].on("select", () => {
                if (!(window.innerWidth >= theme.sizes.small && window.innerWidth < theme.sizes.large)) return;
                const i = this.flkty[e].selectedIndex,
                    s = this.flkty[e].slides.length - 1 === i;
                t.parentNode.classList.toggle(ed, s);
            });
        }
        handleLastSlideOverlayOnMobile() {
            this.sliders.forEach((t) => {
                t.addEventListener("scroll", (e) => {
                    if (!(window.innerWidth < theme.sizes.small)) return;
                    const i = e.target.offsetWidth,
                        s = Array.from(t.children).pop().getBoundingClientRect().left + 80 < i;
                    t.parentNode.classList.toggle(ed, s);
                });
            });
        }
        listen() {
            this.sliders.length &&
                (this.checkSlidesSize(),
                document.addEventListener("theme:resize:width", this.checkSlidesSizeOnResize),
                this.sliders.forEach((t) => {
                    t.addEventListener("theme:tab:change", this.resetSliderEvent);
                }));
        }
        onBlockSelect(t) {
            const i = t.target.closest(Kh),
                s = e.data(i) || null;
            if (!i) return;
            let o = t.target.parentNode,
                n = t.target;
            if ((this.container.classList.contains(id) && ((o = o.parentNode), (n = n.parentNode)), null !== s && s.isActive)) {
                const t = parseInt([...o.children].indexOf(n)),
                    e = parseInt(s.slides[0].cells.length),
                    i = Math.floor(t / e);
                s.select(i);
            } else {
                const t = i.currentStyle || window.getComputedStyle(i),
                    e = parseInt(t.paddingLeft),
                    s = n.offsetLeft - e;
                i.scrollTo({ top: 0, left: s, behavior: "smooth" });
            }
        }
        onUnload() {
            if (this.flkty) for (const t in this.flkty) this.flkty.hasOwnProperty(t) && this.flkty[t].destroy();
            document.removeEventListener("theme:resize:width", this.checkSlidesSizeOnResize),
                this.sliders.length &&
                    this.sliders.forEach((t) => {
                        t.removeEventListener("theme:tab:change", this.resetSliderEvent);
                    });
        }
        constructor(t) {
            (this.container = t),
                (this.columns = parseInt(this.container.dataset.columns)),
                (this.sliders = this.container.querySelectorAll(Kh)),
                (this.checkSlidesSizeOnResize = () => this.checkSlidesSize()),
                (this.resetSliderEvent = (t) => this.resetSlider(t)),
                (this.flkty = []),
                this.listen(),
                this.handleLastSlideOverlayOnMobile();
        }
    };
    const hd = {
        onLoad() {
            ld[this.id] = [];
            this.container.querySelectorAll(Kh).forEach((t) => {
                ld[this.id].push(new cd(this.container));
            });
        },
        onUnload() {
            ld[this.id].forEach((t) => {
                "function" == typeof t.onUnload && t.onUnload();
            });
        },
        onBlockSelect(t) {
            ld[this.id].forEach((e) => {
                "function" == typeof e.onBlockSelect && e.onBlockSelect(t);
            });
        },
    };
    it("featured-collection", [Wa, zo, hd]), it("featured-video", [Jc, Ph]);
    const dd = "[data-collapsible-trigger-mobile]",
        ud = "is-expanded";
    it("footer", [
        Ao,
        Oh,
        Et,
        {
            onBlockSelect(t) {
                const e = t.target.querySelector(dd);
                requestAnimationFrame(() => {
                    e && !e.classList.contains(ud) && e.dispatchEvent(new Event("click"));
                });
            },
            onBlockDeselect(t) {
                const e = t.target.querySelector(dd);
                requestAnimationFrame(() => {
                    e && e.classList.contains(ud) && e.dispatchEvent(new Event("click"));
                });
            },
        },
    ]);
    const pd = "[data-hover-disclosure]",
        md = "[data-site-header]",
        gd = "[data-top-link]",
        vd = "[data-header-background]",
        yd = "[data-nav-item]",
        fd = "is-visible",
        bd = "grandparent",
        wd = "site-header--menu-opened",
        Ed = "has-scrolled",
        Sd = "data-hover-disclosure-toggle",
        Ld = "aria-haspopup",
        kd = "aria-expanded",
        Ad = "aria-controls";
    let qd = {};
    const Cd = {
            onLoad() {
                qd[this.id] = [];
                this.container.querySelectorAll(pd).forEach((t) => {
                    qd[this.id].push(
                        new (class {
                            showDisclosure() {
                                (this.hasScrolled = document.body.classList.contains(Ed)),
                                    (this.headerHeight = this.hasScrolled ? window.stickyHeaderHeight : this.header.offsetHeight),
                                    this.grandparent ? ((this.dropdown.style.height = "auto"), (this.dropdownHeight = this.dropdown.offsetHeight)) : (this.dropdownHeight = this.headerHeight),
                                    this.background.style.setProperty("--header-background-height", `${this.dropdownHeight}px`),
                                    this.trigger.setAttribute(kd, !0),
                                    this.trigger.classList.add(fd),
                                    this.header.classList.add(wd);
                            }
                            hideDisclosure() {
                                this.background.style.removeProperty("--header-background-height"), this.trigger.classList.remove(fd), this.trigger.setAttribute(kd, !1), this.header.classList.remove(wd);
                            }
                            handleTablets() {
                                this.trigger.addEventListener("touchstart", (t) => {
                                    if (!this.trigger.classList.contains(fd)) {
                                        t.preventDefault();
                                        const e = this.header.querySelectorAll(`.${fd}${yd}`);
                                        if (e.length > 0)
                                            return void e.forEach((t) => {
                                                if (t !== this.trigger) {
                                                    t.dispatchEvent(new Event("mouseleave", { bubbles: !0 }));
                                                    const e = () => {
                                                        requestAnimationFrame(() => {
                                                            this.showDisclosure();
                                                        }),
                                                            t.removeEventListener("transitionend", e);
                                                    };
                                                    t.addEventListener("transitionend", e);
                                                }
                                            });
                                        this.showDisclosure();
                                    }
                                });
                            }
                            connectHoverToggle() {
                                this.trigger.addEventListener("mouseenter", () => this.showDisclosure()),
                                    this.link.addEventListener("focus", () => this.showDisclosure()),
                                    this.trigger.addEventListener("mouseleave", () => this.hideDisclosure()),
                                    this.trigger.addEventListener("focusout", (t) => {
                                        this.trigger.contains(t.relatedTarget) || this.hideDisclosure();
                                    }),
                                    this.disclosure.addEventListener("keyup", (t) => {
                                        t.code === theme.keyboardKeys.ESCAPE && this.hideDisclosure();
                                    });
                            }
                            onBlockSelect(t) {
                                this.disclosure.contains(t.target) && this.showDisclosure(t);
                            }
                            onBlockDeselect(t) {
                                this.disclosure.contains(t.target) && this.hideDisclosure();
                            }
                            constructor(t) {
                                (this.disclosure = t),
                                    (this.header = t.closest(md)),
                                    (this.key = this.disclosure.id),
                                    (this.trigger = document.querySelector(`[${Sd}='${this.key}']`)),
                                    (this.link = this.trigger.querySelector(gd)),
                                    (this.grandparent = this.trigger.classList.contains(bd)),
                                    (this.background = document.querySelector(vd)),
                                    this.trigger.setAttribute(Ld, !0),
                                    this.trigger.setAttribute(kd, !1),
                                    this.trigger.setAttribute(Ad, this.key),
                                    (this.dropdown = this.trigger.querySelector(pd)),
                                    this.connectHoverToggle(),
                                    this.handleTablets();
                            }
                        })(t)
                    );
                });
            },
            onBlockSelect(t) {
                qd[this.id].forEach((e) => {
                    "function" == typeof e.onBlockSelect && e.onBlockSelect(t);
                });
            },
            onBlockDeselect(t) {
                qd[this.id].forEach((e) => {
                    "function" == typeof e.onBlockDeselect && e.onBlockDeselect(t);
                });
            },
        },
        Td = "[data-site-header]",
        Pd = "[data-announcement-wrapper]",
        Fd = "[data-collection-filters]",
        Id = "[data-logo]",
        Dd = "[data-logo-text-link]",
        xd = "[data-collapsible-trigger]",
        Hd = "#nav-drawer",
        Md = "[data-drawer]",
        _d = "[data-drawer-toggle]",
        Od = "[data-popdown-toggle]",
        Bd = "[data-mobile-menu]",
        zd = "[data-nav]",
        Wd = "[data-nav-icons]",
        $d = "[data-nav-item]",
        Vd = "[data-nav-link-mobile]",
        Rd = "[data-nav-search-open]",
        Nd = "[data-wrapper]",
        Ud = "[data-header-background]",
        jd = "[data-cart-page]",
        Kd = "[data-takes-space]",
        Qd = {
            jsDrawerOpenAll: ["js-drawer-open", "js-drawer-open-cart", "js-quick-view-visible"],
            headerTransparent: "site-header--transparent",
            headerLoading: "site-header--loading",
            headerHovered: "site-header--hovered",
            headerMenuOpened: "site-header--menu-opened",
            hasScrolled: "has-scrolled",
            hideHeader: "hide-header",
            navCompress: "nav--compress",
            logoCompress: "logo--compress",
            isVisible: "is-visible",
            isOpen: "is-open",
            searchOpened: "search-opened",
            noOutline: "no-outline",
            cloneClass: "js__header__clone",
        },
        Gd = "data-nav-alignment",
        Xd = {};
    it("header", [
        {
            onLoad() {
                Xd[this.id] = new (class {
                    handleTouchstart(t) {
                        const e = this.header.contains(t.target),
                            i = this.header.querySelector(`.${Qd.isVisible}${$d}`);
                        !e && i && i.dispatchEvent(new Event("mouseleave", { bubbles: !0 }));
                    }
                    handleTextLinkLogos() {
                        if (null === this.logoTextLink) return;
                        const t = this.header.offsetHeight;
                        document.documentElement.style.setProperty("--header-height", `${t}px`), document.documentElement.style.setProperty("--header-sticky-height", `${t}px`);
                    }
                    initStickyHeader() {
                        if (((this.hasScrolled = !1), (this.hasCollectionFilters = document.querySelector(Fd)), (this.position = this.header.dataset.position), "fixed" === this.position && !this.hasCollectionFilters))
                            return this.header.classList.remove(Qd.headerLoading), this.headerState(), void document.addEventListener("theme:scroll", this.headerStateEvent);
                        document.body.classList.remove(Qd.hasScrolled), window.isHeaderTransparent && this.header.classList.add(Qd.headerTransparent), this.header.classList.remove(Qd.headerLoading);
                    }
                    headerState(t) {
                        const e = parseInt(this.header.dataset.height || this.header.offsetHeight),
                            i = document.querySelector(Pd),
                            s = e + (i ? i.offsetHeight : 0),
                            o = window.pageYOffset || document.documentElement.scrollTop,
                            n = t && t.detail && t.detail.up;
                        (this.hasScrolled = o > s), document.body.classList.toggle(Qd.hasScrolled, this.hasScrolled);
                        const r = o < s + window.stickyHeaderHeight && n;
                        if ((document.body.classList.toggle(Qd.hideHeader, r), window.isHeaderTransparent)) {
                            const t = !this.hasScrolled || r;
                            this.header.classList.toggle(Qd.headerTransparent, t);
                        }
                        if (this.header.classList.contains(Qd.headerHovered)) {
                            const t = this.hasScrolled ? window.stickyHeaderHeight : e;
                            this.background.style.setProperty("--header-background-height", `${t}px`);
                            const i = this.header.querySelector(`.${Qd.isVisible}${$d}`);
                            i && i.dispatchEvent(new Event("mouseenter", { bubbles: !0 }));
                        }
                    }
                    handleBackgroundEvents() {
                        this.headerWrapper.addEventListener("mouseenter", this.updateBackgroundHeightEvent),
                            this.headerWrapper.addEventListener("mouseleave", this.updateBackgroundHeightEvent),
                            this.header.addEventListener("focusout", this.updateBackgroundHeightEvent),
                            document.addEventListener("theme:cart:close", this.updateBackgroundHeightEvent),
                            document.addEventListener("theme:search:close", this.updateBackgroundHeightEvent);
                    }
                    updateBackgroundHeight(t) {
                        const e = matchMedia("(pointer:fine)").matches,
                            i = !document.body.classList.contains(Qd.noOutline),
                            s = e && !i;
                        if (t) {
                            if ("mouseenter" === t.type) {
                                let t = !1;
                                if (
                                    (Qd.jsDrawerOpenAll.forEach((e) => {
                                        document.body.classList.contains(e) && (t = !0);
                                    }),
                                    t)
                                )
                                    return;
                                return (
                                    (this.headerHeight = this.hasScrolled ? window.stickyHeaderHeight : this.header.offsetHeight),
                                    this.header.classList.add(Qd.headerHovered),
                                    void (this.header.classList.contains(Qd.headerMenuOpened) || this.background.style.setProperty("--header-background-height", `${this.headerHeight}px`))
                                );
                            }
                            ("focusout" !== t.type || e) &&
                                ("theme:search:close" !== t.type || s) &&
                                (this.hasScrolled ||
                                    requestAnimationFrame(() => {
                                        const e = null === document.activeElement.closest(Td);
                                        document.body.classList.contains(Qd.searchOpened) ||
                                            (("focusout" !== t.type || e) && (this.header.classList.remove(Qd.headerHovered), this.background.style.setProperty("--header-background-height", "0px"), i || document.activeElement.blur()));
                                    }));
                        }
                    }
                    listenWidth() {
                        document.addEventListener("theme:resize", this.checkWidthEvent), this.checkWidth();
                    }
                    checkWidth() {
                        window.innerWidth < this.minWidth ? (this.nav.classList.add(Qd.navCompress), this.logo.classList.add(Qd.logoCompress)) : (this.nav.classList.remove(Qd.navCompress), this.logo.classList.remove(Qd.logoCompress));
                    }
                    getMinWidth() {
                        const t = this.headerWrapper.currentStyle || window.getComputedStyle(this.headerWrapper),
                            e = 2 * parseInt(t.paddingLeft),
                            i = this.header.cloneNode(!0);
                        i.classList.add(Qd.cloneClass), document.body.appendChild(i);
                        const s = i.querySelectorAll(Kd),
                            o = (function (t, e) {
                                let i = [];
                                t.forEach((t) => {
                                    i.push(t.clientWidth);
                                });
                                let [s, o, n] = i;
                                if ("left" === e) {
                                    const t = s;
                                    (s = o), (o = t);
                                }
                                return "right" !== e && (s > n ? (n = s) : (s = n)), s + o + n;
                            })(s, this.header.getAttribute(Gd));
                        return document.body.removeChild(i), o + 20 * s.length + e;
                    }
                    initMobileNav() {
                        var t;
                        if (
                            ((this.mobileMenu = this.headerSection.querySelector(Bd)),
                            (this.navDrawer = this.headerSection.querySelector(Hd)),
                            (this.drawerToggle = this.navDrawer.querySelector(_d)),
                            (this.navSearchOpen = this.navDrawer.querySelectorAll(Rd)),
                            null === (t = this.navSearchOpen) ||
                                void 0 === t ||
                                t.forEach((t) => {
                                    t.addEventListener("click", (t) => {
                                        t.preventDefault();
                                        const e = this.drawerToggle.closest(`${Md}.${Qd.isOpen}`),
                                            i = matchMedia("(pointer:coarse)").matches ? this.mobileMenu.querySelector(Od) : this.nav.querySelector(Od);
                                        this.drawerToggle.dispatchEvent(new Event("click", { bubbles: !0 }));
                                        const s = (t) => {
                                            t.target === e && (requestAnimationFrame(() => i.dispatchEvent(new Event("click", { bubbles: !0 }))), e.removeEventListener("transitionend", s));
                                        };
                                        e.addEventListener("transitionend", s);
                                    });
                                }),
                            "link" === theme.settings.mobileMenuBehaviour)
                        )
                            return;
                        const e = this.headerSection.querySelectorAll(Vd);
                        e.length &&
                            e.forEach((t) => {
                                t.addEventListener("click", (e) => {
                                    const i = t.parentNode.querySelectorAll(xd).length,
                                        s = t.nextElementSibling;
                                    i && (e.preventDefault(), s.dispatchEvent(new Event("click"), { bubbles: !0 }));
                                });
                            });
                    }
                    onUnload() {
                        document.documentElement.style.removeProperty("--header-height"),
                            document.documentElement.style.removeProperty("--header-sticky-height"),
                            this.initStickyHeader(),
                            document.body.classList.remove(...Qd.jsDrawerOpenAll),
                            document.removeEventListener("theme:scroll", this.headerStateEvent),
                            document.removeEventListener("theme:resize", this.checkWidthEvent),
                            document.removeEventListener("theme:cart:close", this.updateBackgroundHeightEvent),
                            document.removeEventListener("theme:search:close", this.updateBackgroundHeightEvent),
                            document.body.removeEventListener("touchstart", this.handleTouchstartEvent),
                            document.dispatchEvent(new CustomEvent("theme:scroll:unlock", { bubbles: !0 })),
                            "function" == typeof window.cart.unload && window.cart.unload();
                    }
                    constructor(t) {
                        (this.container = t),
                            (this.background = document.querySelector(Ud)),
                            (this.header = t),
                            (this.headerSection = t.parentNode),
                            (this.headerWrapper = t.querySelector(Nd)),
                            (this.logo = t.querySelector(Id)),
                            (this.logoTextLink = t.querySelector(Dd)),
                            (this.nav = t.querySelector(zd)),
                            (this.navIcons = t.querySelector(Wd)),
                            (this.headerStateEvent = (t) => this.headerState(t)),
                            (this.handleTouchstartEvent = (t) => this.handleTouchstart(t)),
                            (this.updateBackgroundHeightEvent = (t) => this.updateBackgroundHeight(t)),
                            m(),
                            (this.minWidth = this.getMinWidth()),
                            (this.checkWidthEvent = () => this.checkWidth()),
                            this.listenWidth(),
                            this.initMobileNav(),
                            this.handleTextLinkLogos(),
                            this.initStickyHeader(),
                            this.handleBackgroundEvents(),
                            document.querySelector(jd) || (window.cart = new Ur()),
                            document.body.addEventListener("touchstart", this.handleTouchstartEvent, { passive: !0 });
                    }
                })(this.container);
            },
            onUnload() {
                Xd[this.id].onUnload();
            },
        },
        Cd,
        Ge,
    ]);
    const Jd = "[data-slider]";
    let Yd = {};
    it("icons-row", {
        onLoad() {
            Yd[this.id] = new (class {
                onBlockSelect(t) {
                    const e = this.slider.currentStyle || window.getComputedStyle(this.slider),
                        i = parseInt(e.paddingLeft),
                        s = t.target.offsetLeft - i;
                    this.slider.scrollTo({ top: 0, left: s, behavior: "smooth" });
                }
                constructor(t) {
                    (this.container = t.container), (this.slider = this.container.querySelector(Jd));
                }
            })(this);
        },
        onBlockSelect(t) {
            Yd[this.id].onBlockSelect(t);
        },
    });
    const Zd = "[data-accordion-item]",
        tu = "[data-accordion-button]",
        eu = "is-expanded",
        iu = {};
    it("image-accordions", {
        onLoad() {
            iu[this.id] = new (class {
                init() {
                    this.imageAccordionsItems.forEach((t) => {
                        t.addEventListener("mouseenter", this.accordionExpandEvent.bind(this, t));
                    }),
                        this.buttons.forEach((t) => {
                            t.addEventListener("focusin", this.accordionFocusEvent.bind(this, t));
                        });
                }
                accordionExpand(t) {
                    t.classList.contains(eu) ||
                        (this.imageAccordionsItems.forEach((t) => {
                            t.classList.remove(eu);
                        }),
                        t.classList.add(eu));
                }
                accordionFocus(t) {
                    t.closest(Zd).dispatchEvent(new Event("mouseenter"));
                }
                onBlockSelect(t) {
                    const e = t.target;
                    e && e.dispatchEvent(new Event("mouseenter"));
                }
                constructor(t) {
                    (this.container = t.container),
                        (this.imageAccordionsItems = this.container.querySelectorAll(Zd)),
                        (this.buttons = this.container.querySelectorAll(tu)),
                        (this.accordionExpandEvent = (t) => this.accordionExpand(t)),
                        (this.accordionFocusEvent = (t) => this.accordionFocus(t)),
                        this.init();
                }
            })(this);
        },
        onBlockSelect(t) {
            iu[this.id].onBlockSelect(t);
        },
    }),
        it("image-with-text", Jc),
        it("list-collections", hd);
    const su = {},
        ou = "[data-slider-gallery]",
        nu = "[data-slider-info]",
        ru = "[data-slide-item]";
    it("locations", {
        onLoad() {
            su[this.id] = new (class {
                initSlider() {
                    const t = this.container.querySelectorAll(ru).length;
                    let i = e.data(this.slider) || null,
                        s = e.data(this.sliderNav) || null;
                    t <= 1 ||
                        ((i = new e(this.slider, { fade: !0, wrapAround: !0, adaptiveHeight: !0, prevNextButtons: !1, pageDots: !1 })),
                        te(this.slider),
                        (s = new e(this.sliderNav, { fade: !0, wrapAround: !0, imagesLoaded: !0, lazyLoad: !0, asNavFor: this.slider, prevNextButtons: !0, pageDots: !1 })),
                        s.on("change", () => {
                            i.selectCell(s.selectedIndex);
                        }),
                        i.on("change", () => {
                            s.selectCell(i.selectedIndex);
                        }));
                }
                onBlockSelect(t) {
                    const i = e.data(this.slider) || null,
                        s = e.data(this.sliderNav) || null,
                        o = parseInt([...t.target.parentNode.children].indexOf(t.target));
                    null !== i && i.select(o), null !== s && s.select(o);
                }
                constructor(t) {
                    (this.container = t.container), (this.slider = this.container.querySelector(ou)), (this.sliderNav = this.container.querySelector(nu)), this.initSlider();
                }
            })(this);
        },
        onBlockSelect(t) {
            su[this.id].onBlockSelect(t);
        },
    });
    const au = {},
        lu = "[data-slider]",
        cu = "[data-slide-item]",
        hu = "[data-pointer]",
        du = "[data-product-media-container]",
        uu = "[data-quick-view-item-holder]",
        pu = ".flickity-button",
        mu = "a, button",
        gu = "[data-tooltip]",
        vu = "data-pointer",
        yu = "data-hotspot",
        fu = "tabindex",
        bu = "product-grid-item__image--hovered",
        wu = "pointer--selected",
        Eu = "is-selected",
        Su = "is-active",
        Lu = "pswp--open";
    const ku = {
        onLoad() {
            au[this.id] = new (class {
                listen() {
                    this.slider && (this.checkSlidesSize(), document.addEventListener("theme:resize:width", this.checkSlidesSizeOnResize)),
                        this.pointers.length > 0 &&
                            this.pointers.forEach((t) => {
                                t.addEventListener("click", this.pointersInit), t.addEventListener("mouseover", this.pointersOver), t.addEventListener("mouseleave", this.pointersOut);
                            });
                }
                checkSlidesSize() {
                    const t = window.innerWidth >= theme.sizes.small;
                    this.initTooltips(), t ? (this.slides.length > 2 ? this.initSlider() : (this.destroySlider(), this.slidesTabIndex())) : !t && this.slides.length > 1 ? this.initSlider() : this.destroySlider();
                }
                initTooltips() {
                    (this.tooltips = this.container.querySelectorAll(gu)),
                        this.tooltips.forEach((t) => {
                            new Bo(t);
                        });
                }
                initSlider() {
                    null !== this.flkty
                        ? this.setSliderArrowsPosition()
                        : (this.flkty = new e(this.slider, {
                              prevNextButtons: !0,
                              wrapAround: !0,
                              adaptiveHeight: !1,
                              cellAlign: "left",
                              groupCells: !1,
                              contain: !0,
                              on: {
                                  ready: () => {
                                      this.slidesTabIndex(), this.setSliderArrowsPosition(), this.dotPointers();
                                  },
                                  change: () => {
                                      this.slidesTabIndex(), this.dotPointers();
                                  },
                              },
                          }));
                }
                setSliderArrowsPosition() {
                    if (!(window.innerWidth >= theme.sizes.small)) return;
                    const t = this.slider.querySelectorAll(pu),
                        e = this.slider.querySelector(du);
                    t.length &&
                        e &&
                        t.forEach((t) => {
                            t.style.top = e.offsetHeight / 2 + "px";
                        });
                }
                slidesTabIndex() {
                    if (this.slides.length < 3)
                        return void this.slider.querySelectorAll(mu).forEach((t) => {
                            t.setAttribute(fu, "0");
                        });
                    const t = e.data(this.slider);
                    t.cells.forEach((t) => {
                        t.element.querySelectorAll(mu).forEach((t) => {
                            t.setAttribute(fu, "-1");
                        });
                    }),
                        t.cells.forEach((t) => {
                            t.element.classList.contains(Eu) &&
                                (t.element.querySelectorAll(mu).forEach((t) => {
                                    t.setAttribute(fu, "0");
                                }),
                                (t.element.nextSibling ? t.element.nextSibling : t.element.parentNode.firstChild).querySelectorAll(mu).forEach((t) => {
                                    t.setAttribute(fu, "0");
                                }));
                        });
                }
                destroySlider() {
                    "object" == typeof this.flkty && null !== this.flkty && (this.flkty.destroy(), (this.flkty = null));
                }
                dotPointers(t) {
                    if (0 === this.pointers.length) return;
                    if (
                        (this.pointers.forEach((t) => {
                            t.classList.remove(wu);
                        }),
                        t)
                    ) {
                        var e;
                        const i = t.target.getAttribute(vu);
                        return void (null === (e = this.flkty) || void 0 === e || e.select(i));
                    }
                    const i = null == this.flkty ? 0 : this.flkty.selectedIndex;
                    i >= 0 && this.pointers[i].classList.add(wu);
                }
                dotPointerIn(t) {
                    const e = t.target.getAttribute(vu),
                        i = this.slides[e].querySelector(du),
                        s = matchMedia("(pointer:coarse)").matches;
                    window.innerWidth < theme.sizes.small || s || this.observeImage(i),
                        this.pointers.forEach((t) => {
                            t.style.setProperty("--look-animation", "none");
                        });
                }
                dotPointerOut(t) {
                    const e = t.target.getAttribute(vu),
                        i = this.slides[e].querySelector(du);
                    i.classList.remove(bu),
                        i.dispatchEvent(new Event("mouseleave")),
                        this.observer && this.observer.disconnect(),
                        this.pointers.forEach((t) => {
                            t.style.removeProperty("--look-animation");
                        });
                }
                observeImage(t) {
                    (this.observer = new IntersectionObserver(
                        (t, e) => {
                            t.forEach((t) => {
                                const e = t.target;
                                0 == t.intersectionRatio || (e.dispatchEvent(new Event("mouseenter")), e.classList.add(bu));
                            });
                        },
                        { root: this.slider, threshold: [0.95, 1] }
                    )),
                        this.observer.observe(t);
                }
                triggerClick(t) {
                    requestAnimationFrame(() => t.dispatchEvent(new Event("click")));
                }
                destroyQuickViewPopup() {
                    var t, e;
                    const i = null === (t = this.quickViewPopup) || void 0 === t || null === (e = t.loadPhotoswipe) || void 0 === e ? void 0 : e.pswpElement;
                    i && i.classList.contains(Lu) && this.quickViewPopup.loadPhotoswipe.popup.close();
                }
                onBlockSelect(t) {
                    this.debouncedBlockSelectCallback(t);
                }
                debouncedBlockSelect(t) {
                    var e, i;
                    const s = null === (e = this.quickViewPopup) || void 0 === e || null === (i = e.loadPhotoswipe) || void 0 === i ? void 0 : i.pswpElement;
                    s
                        ? setTimeout(() => {
                              if (s.classList.contains(Lu)) {
                                  const e = this.quickViewPopup.loadPhotoswipe.pswpElement.querySelector(`[${yu}="${t.target.getAttribute(yu)}"]`),
                                      i = this.quickViewPopup.loadPhotoswipe.pswpElement.querySelectorAll(uu);
                                  e.classList.add(Su),
                                      i.forEach((t) => {
                                          t !== e && t.classList.remove(Su);
                                      });
                              } else this.triggerClick(t.target);
                          })
                        : setTimeout(() => this.triggerClick(t.target), 400);
                }
                onUnload() {
                    this.destroyQuickViewPopup(), document.removeEventListener("theme:resize:width", this.checkSlidesSizeOnResize);
                }
                onDeselect() {
                    this.destroyQuickViewPopup();
                }
                constructor(t) {
                    (this.container = t),
                        (this.slider = this.container.querySelector(lu)),
                        (this.slides = this.container.querySelectorAll(cu)),
                        (this.pointers = this.container.querySelectorAll(hu)),
                        (this.flkty = null),
                        (this.observer = null),
                        (this.checkSlidesSizeOnResize = () => this.checkSlidesSize()),
                        (this.pointersInit = (t) => this.dotPointers(t)),
                        (this.pointersOver = (t) => this.dotPointerIn(t)),
                        (this.pointersOut = (t) => this.dotPointerOut(t)),
                        (this.debouncedBlockSelectCallback = n((t) => this.debouncedBlockSelect(t), 500)),
                        (this.quickViewPopup = new ur(this.container)),
                        this.listen();
                }
            })(this.container);
        },
        onUnload() {
            au[this.id].onUnload();
        },
        onBlockSelect(t) {
            au[this.id].onBlockSelect(t);
        },
        onDeselect() {
            au[this.id].onDeselect();
        },
    };
    it("look", [ku, Wa]);
    const Au = "[data-grid]";
    it("mosaic", {
        onBlockSelect(t) {
            const e = t.target.closest(Au),
                i = e.currentStyle || window.getComputedStyle(e),
                s = parseInt(i.paddingLeft),
                o = t.target.offsetLeft - s;
            e.scrollTo({ top: 0, left: o, behavior: "smooth" });
        },
    }),
        it("newsletter", Oh),
        it("overlapping-images", Jc);
    const qu = "[data-toggle-admin]",
        Cu = "[data-toggle-newsletter]",
        Tu = "[data-form-admin]",
        Pu = "[data-form-newsletter]";
    let Fu = {};
    it("password-template", {
        onLoad() {
            Fu[this.id] = new (class {
                init() {
                    this.toggleAdmin.addEventListener("click", (t) => {
                        t.preventDefault(), this.showPasswordForm();
                    }),
                        this.toggleNewsletter.addEventListener("click", (t) => {
                            t.preventDefault(), this.hidePasswordForm();
                        }),
                        "#login" == window.location.hash || this.adminErrors ? this.showPasswordForm() : this.hidePasswordForm();
                }
                showPasswordForm() {
                    Xe(this.adminForm), Je(this.newsletterForm), (window.location.hash = "#login");
                }
                hidePasswordForm() {
                    Xe(this.newsletterForm), Je(this.adminForm), (window.location.hash = "");
                }
                constructor(t) {
                    (this.container = t.container),
                        (this.toggleAdmin = this.container.querySelector(qu)),
                        (this.toggleNewsletter = this.container.querySelector(Cu)),
                        (this.adminForm = this.container.querySelector(Tu)),
                        (this.newsletterForm = this.container.querySelector(Pu)),
                        (this.adminErrors = this.adminForm.querySelector(".errors")),
                        (this.newsletterErrors = this.newsletterForm.querySelector(".errors")),
                        this.init();
                }
            })(this);
        },
    });
    const Iu = "[data-large-promo]",
        Du = "[data-large-promo-inner]",
        xu = "[data-tracking-consent]",
        Hu = "[data-tracking-consent-inner]",
        Mu = "[data-confirm-cookies]",
        _u = "[data-popup-bar]",
        Ou = "[data-popup-bar-holder]",
        Bu = "[data-popup-bar-toggle]",
        zu = "[data-popup-body]",
        Wu = "[data-popup-close]",
        $u = "[data-popup-underlay]",
        Vu = "[data-newsletter-form]",
        Ru = "data-target-referrer",
        Nu = "data-prevent-scroll-lock",
        Uu = "has-success",
        ju = "has-error",
        Ku = "selected",
        Qu = "has-block-selected",
        Gu = "popup--expanded",
        Xu = "popup--visible",
        Ju = "mobile",
        Yu = "desktop",
        Zu = "popup--bar",
        tp = "popup-bar-is-visible";
    let ep = {},
        ip = 0,
        sp = 0,
        op = [],
        np = class {
            always() {
                this.showPopup();
            }
            delayed(t = 10) {
                setTimeout(() => {
                    this.showPopup();
                }, 1e3 * t);
            }
            bottom() {
                document.addEventListener("theme:scroll", this.showPopupOnScrollEvent);
            }
            idle() {
                if (!(!0 === this.checkPopupTarget())) return;
                let t = 0;
                const e = ["mousemove", "mousedown", "click", "touchmove", "touchstart", "touchend", "keydown", "keypress"],
                    i = ["load", "resize", "scroll"],
                    s = () => {
                        (t = setTimeout(() => {
                            (t = 0), this.showPopup();
                        }, 6e4)),
                            e.forEach((t) => {
                                document.addEventListener(t, o);
                            }),
                            i.forEach((t) => {
                                window.addEventListener(t, o);
                            });
                    },
                    o = () => {
                        t && clearTimeout(t),
                            e.forEach((t) => {
                                document.removeEventListener(t, o);
                            }),
                            i.forEach((t) => {
                                window.removeEventListener(t, o);
                            }),
                            s();
                    };
                s();
            }
            showPopup() {
                const t = { id: this.popup.id, body: this.popupBody };
                op.push(t);
                if (!0 === this.checkPopupTarget()) {
                    if (((sp += 1), this.popup.classList.add(Xu), this.popup.classList.contains(Zu) && document.body.classList.add(tp), this.a11y.trapFocus({ container: this.popupBody }), this.popup.hasAttribute(Nu))) return !1;
                    this.scrollLock();
                }
            }
            checkPopupTarget() {
                const t = this.popup.parentNode.classList.contains(Ju),
                    e = this.popup.parentNode.classList.contains(Yu);
                return !((t && window.innerWidth >= theme.sizes.small) || (e && window.innerWidth < theme.sizes.small));
            }
            scrollLock() {
                document.dispatchEvent(new CustomEvent("theme:scroll:lock", { bubbles: !0, detail: this.popupBody }));
            }
            showPopupOnScroll() {
                window.scrollY + window.innerHeight >= document.body.clientHeight && (this.showPopup(), document.removeEventListener("theme:scroll", this.showPopupOnScrollEvent));
            }
            onUnload() {
                document.removeEventListener("theme:scroll", this.showPopupOnScrollEvent);
            }
            constructor(t, e) {
                if (
                    ((this.popupContainer = t),
                    (this.popup = e),
                    (this.popupBody = e.querySelector(zu)),
                    (this.delay = t.dataset.popupDelay),
                    (this.isSubmitted = -1 !== window.location.href.indexOf("accepts_marketing") || -1 !== window.location.href.indexOf("customer_posted=true")),
                    (this.a11y = Ft),
                    (this.showPopupOnScrollEvent = () => this.showPopupOnScroll()),
                    ("always" === this.delay || this.isSubmitted) && this.always(),
                    this.delay && this.delay.includes("delayed") && !this.isSubmitted)
                ) {
                    const t = this.delay.includes("_") ? parseInt(this.delay.split("_")[1]) : 10;
                    this.delayed(t);
                }
                "bottom" !== this.delay || this.isSubmitted || this.bottom(), "idle" !== this.delay || this.isSubmitted || this.idle();
            }
        },
        rp = class {
            constructor(t) {
                if (((this.popupContainer = t), (this.locationPath = location.href), !this.popupContainer.hasAttribute(Ru))) return !1;
                -1 !== this.locationPath.indexOf(this.popupContainer.getAttribute(Ru)) || window.Shopify.designMode || this.popupContainer.parentNode.removeChild(this.popupContainer);
            }
        };
    it("popups", [
        {
            onLoad() {
                (ep[this.id] = []), window.Shopify.designMode && (sp = 0);
                const t = this.container.querySelectorAll(Iu);
                t.length &&
                    t.forEach((t) => {
                        ep[this.id].push(
                            new (class {
                                init() {
                                    (!1 !== this.cookie.read() && !window.Shopify.designMode) ||
                                        (window.Shopify.designMode ? this.showPopup() : new np(this.popupContainer, this.popup),
                                        this.form &&
                                            setTimeout(() => {
                                                this.form.classList.contains(Uu) && (this.showPopupIfNoCookie(), (sp -= 1));
                                            }),
                                        this.initClosers());
                                }
                                checkPopupTarget() {
                                    const t = this.popup.parentNode.classList.contains(Ju),
                                        e = this.popup.parentNode.classList.contains(Yu);
                                    return !((t && window.innerWidth >= theme.sizes.small) || (e && window.innerWidth < theme.sizes.small));
                                }
                                showPopupIfNoCookie() {
                                    this.showPopup();
                                }
                                initClosers() {
                                    this.close.addEventListener("click", this.closePopup.bind(this)),
                                        this.underlay.addEventListener("click", this.closePopup.bind(this)),
                                        this.popupContainer.addEventListener("keyup", (t) => {
                                            t.code === theme.keyboardKeys.ESCAPE && this.closePopup(t);
                                        });
                                }
                                closePopup(t) {
                                    t.preventDefault(), this.hidePopup(), this.cookie.write();
                                }
                                scrollLock() {
                                    this.resetScrollUnlock(), this.a11y.trapFocus({ container: this.popupBody }), document.dispatchEvent(new CustomEvent("theme:scroll:lock", { bubbles: !0, detail: this.popupBody }));
                                }
                                scrollUnlock() {
                                    this.resetScrollUnlock(),
                                        (ip = setTimeout(() => {
                                            document.dispatchEvent(new CustomEvent("theme:scroll:unlock", { bubbles: !0 }));
                                        }, 300));
                                }
                                resetScrollUnlock() {
                                    ip && clearTimeout(ip);
                                }
                                showPopup() {
                                    const t = !0 === this.checkPopupTarget(),
                                        e = { id: this.popupId, body: this.popup };
                                    op.push(e), t && ((sp += 1), this.popup.classList.add(Xu), this.scrollLock());
                                }
                                hidePopup() {
                                    this.popup.classList.remove(Xu);
                                    const t = op.findIndex((t) => t.id === this.popupId);
                                    if (((sp -= 1), op.splice(t, 1), 1 == sp && document.body.classList.contains(tp))) this.scrollUnlock();
                                    else if (sp < 1) this.scrollUnlock(), this.a11y.removeTrapFocus();
                                    else if (op.length > 0) {
                                        const t = op[op.length - 1].body;
                                        this.a11y.trapFocus({ container: t });
                                    }
                                }
                                onBlockSelect(t) {
                                    this.popupContainer.contains(t.target) && !this.popup.classList.contains(Xu) && (this.popup.classList.add(Ku), this.popupContainer.classList.add(Qu), this.showPopup());
                                }
                                onBlockDeselect(t) {
                                    this.popupContainer.contains(t.target) && (this.popup.classList.remove(Ku), this.popupContainer.classList.remove(Qu), this.hidePopup());
                                }
                                onUnload() {
                                    this.scrollUnlock();
                                }
                                onDeselect() {
                                    this.popup.classList.remove(Ku), this.popupContainer.classList.remove(Qu), this.hidePopup();
                                }
                                constructor(t) {
                                    (this.popupContainer = t),
                                        (this.popup = this.popupContainer.querySelector(Du)),
                                        (this.popupBody = this.popup.querySelector(zu)),
                                        (this.popupId = this.popup.id),
                                        (this.close = this.popup.querySelector(Wu)),
                                        (this.underlay = this.popup.querySelector($u)),
                                        (this.form = this.popup.querySelector(Vu)),
                                        (this.cookie = new Fh(this.popupContainer.dataset.cookieName, "user_has_closed")),
                                        (this.isTargeted = new rp(this.popupContainer)),
                                        (this.a11y = Ft),
                                        this.init();
                                }
                            })(t)
                        );
                    });
                const e = this.container.querySelectorAll(_u);
                e.length &&
                    e.forEach((t) => {
                        ep[this.id].push(
                            new (class {
                                init() {
                                    (!1 !== this.cookie.read() && !window.Shopify.designMode) ||
                                        (window.Shopify.designMode ? this.showPopup() : new np(this.popupContainer, this.popup),
                                        this.initPopupToggleButton(),
                                        this.initClosers(),
                                        this.form &&
                                            setTimeout(() => {
                                                this.form.classList.contains(Uu) && this.showPopupIfNoCookie(), this.form.classList.contains(ju) && this.toggle.dispatchEvent(new Event("click"));
                                            }));
                                }
                                checkPopupTarget() {
                                    const t = this.popup.parentNode.classList.contains(Ju),
                                        e = this.popup.parentNode.classList.contains(Yu);
                                    return !((t && window.innerWidth >= theme.sizes.small) || (e && window.innerWidth < theme.sizes.small));
                                }
                                showPopupIfNoCookie() {
                                    this.showPopup(), this.toggle.dispatchEvent(new Event("click"));
                                }
                                initPopupToggleButton() {
                                    this.toggle.addEventListener("click", (t) => {
                                        t.preventDefault(), this.popup.classList.toggle(Gu), this.popup.classList.contains(Gu) ? this.scrollLock() : this.scrollUnlock();
                                    });
                                }
                                showPopup() {
                                    const t = { id: this.popupId, body: this.popup };
                                    op.push(t), this.a11y.trapFocus({ container: this.popupBody }), !0 === this.checkPopupTarget() && ((sp += 1), document.body.classList.add(tp), this.popup.classList.add(Xu));
                                }
                                hidePopup() {
                                    this.popup.classList.remove(Xu), document.body.classList.remove(tp);
                                    const t = op.findIndex((t) => t.id === this.popupId);
                                    if ((op.splice(t, 1), sp >= 1 && (sp -= 1), sp < 1)) this.scrollUnlock(), this.a11y.removeTrapFocus();
                                    else if (op.length > 0) {
                                        const t = op[op.length - 1].body;
                                        this.a11y.trapFocus({ container: t });
                                    }
                                }
                                initClosers() {
                                    this.close.addEventListener("click", this.closePopup.bind(this)),
                                        this.underlay.addEventListener("click", () => this.toggle.dispatchEvent(new Event("click"))),
                                        this.popupContainer.addEventListener("keyup", (t) => {
                                            t.code === theme.keyboardKeys.ESCAPE && (this.popup.classList.remove(Gu), this.scrollUnlock());
                                        });
                                }
                                closePopup(t) {
                                    t.preventDefault(), this.cookie.write(), this.hidePopup();
                                }
                                scrollLock() {
                                    document.dispatchEvent(new CustomEvent("theme:scroll:lock", { bubbles: !0, detail: this.popupBody }));
                                }
                                scrollUnlock() {
                                    this.resetScrollUnlock(),
                                        (ip = setTimeout(() => {
                                            document.dispatchEvent(new CustomEvent("theme:scroll:unlock", { bubbles: !0 }));
                                        }, 300));
                                }
                                resetScrollUnlock() {
                                    ip && clearTimeout(ip);
                                }
                                onBlockSelect(t) {
                                    this.popupContainer.contains(t.target) &&
                                        !this.popup.classList.contains(Xu) &&
                                        (this.showPopup(), this.popup.classList.add(Gu), this.popup.classList.add(Ku), this.popup.parentNode.classList.add(Qu), this.resetScrollUnlock(), this.scrollLock());
                                }
                                onBlockDeselect(t) {
                                    this.popupContainer.contains(t.target) && (this.popup.classList.remove(Gu), this.popup.classList.remove(Ku), this.popup.parentNode.classList.remove(Qu), this.hidePopup());
                                }
                                onUnload() {
                                    this.scrollUnlock();
                                }
                                onDeselect() {
                                    this.popup.classList.remove(Gu), this.popup.classList.remove(Ku), this.popup.parentNode.classList.remove(Qu), this.hidePopup();
                                }
                                constructor(t) {
                                    (this.popupContainer = t),
                                        (this.popup = this.popupContainer.querySelector(Ou)),
                                        (this.popupBody = this.popup.querySelector(zu)),
                                        (this.popupId = this.popup.id),
                                        (this.close = this.popup.querySelector(Wu)),
                                        (this.underlay = this.popup.querySelector($u)),
                                        (this.toggle = this.popup.querySelector(Bu)),
                                        (this.cookie = new Fh(this.popupContainer.dataset.cookieName, "user_has_closed")),
                                        (this.form = this.popup.querySelector(Vu)),
                                        (this.isTargeted = new rp(this.popupContainer)),
                                        (this.a11y = Ft),
                                        this.init();
                                }
                            })(t)
                        );
                    });
                const i = this.container.querySelectorAll(xu);
                i.length &&
                    i.forEach((t) => {
                        ep[this.id].push(
                            new (class {
                                init() {
                                    this.enableTracking && this.showPopup(), this.clickEvents();
                                }
                                clickEvents() {
                                    this.close.addEventListener("click", (t) => {
                                        t.preventDefault(), window.Shopify.customerPrivacy.setTrackingConsent(!1, () => this.hidePopup());
                                    }),
                                        this.acceptButton.addEventListener("click", (t) => {
                                            t.preventDefault(), window.Shopify.customerPrivacy.setTrackingConsent(!0, () => this.hidePopup());
                                        }),
                                        document.addEventListener("trackingConsentAccepted", () => {
                                            console.log("trackingConsentAccepted event fired");
                                        });
                                }
                                showPopup() {
                                    const t = { id: this.popupId, body: this.popup };
                                    op.push(t), this.popup.classList.add(Xu), this.a11y.trapFocus({ container: this.popup });
                                }
                                hidePopup() {
                                    this.popup.classList.remove(Xu);
                                    const t = op.findIndex((t) => t.id === this.popupId);
                                    if ((op.splice(t, 1), sp < 1)) this.a11y.removeTrapFocus();
                                    else if (op.length > 0) {
                                        const t = op[op.length - 1].body;
                                        this.a11y.trapFocus({ container: t });
                                    }
                                }
                                onBlockSelect(t) {
                                    this.popupContainer.contains(t.target) && this.enableTracking && !this.popup.classList.contains(Xu) && (this.showPopup(), this.popup.classList.add(Ku), this.popup.parentNode.classList.add(Qu));
                                }
                                onBlockDeselect(t) {
                                    this.popupContainer.contains(t.target) && (this.popup.classList.remove(Ku), this.popupContainer.classList.remove(Qu), this.hidePopup());
                                }
                                onDeselect() {
                                    this.popup.classList.remove(Ku), this.popupContainer.classList.remove(Qu), this.hidePopup();
                                }
                                constructor(t) {
                                    (this.popupContainer = t),
                                        (this.popup = this.popupContainer.querySelector(Hu)),
                                        (this.popupId = this.popup.id),
                                        (this.close = this.popup.querySelector(Wu)),
                                        (this.acceptButton = this.popup.querySelector(Mu)),
                                        (this.enable = "true" === this.popupContainer.dataset.enable),
                                        (this.a11y = Ft),
                                        window.Shopify.loadFeatures([{ name: "consent-tracking-api", version: "0.1" }], (t) => {
                                            if (t) throw t;
                                            const e = window.Shopify.customerPrivacy.userCanBeTracked(),
                                                i = window.Shopify.customerPrivacy.getTrackingConsent();
                                            (this.enableTracking = !e && "no_interaction" === i && this.enable), window.Shopify.designMode && (this.enableTracking = !0), this.init();
                                        });
                                }
                            })(t)
                        );
                    });
            },
            onDeselect() {
                ep[this.id].forEach((t) => {
                    "function" == typeof t.onDeselect && t.onDeselect();
                });
            },
            onBlockSelect(t) {
                ep[this.id].forEach((e) => {
                    "function" == typeof e.onBlockSelect && e.onBlockSelect(t);
                });
            },
            onBlockDeselect(t) {
                ep[this.id].forEach((e) => {
                    "function" == typeof e.onBlockDeselect && e.onBlockDeselect(t);
                });
            },
            onUnload(t) {
                ep[this.id].forEach((e) => {
                    "function" == typeof e.onUnload && e.onUnload(t);
                });
            },
        },
        Oh,
    ]);
    const ap = "[data-press-items]",
        lp = "[data-logo-slider]",
        cp = "[data-logo-slide]",
        hp = "a, button",
        dp = "data-logo-index",
        up = "tabindex";
    let pp = {};
    const mp = {
        onLoad() {
            pp[this.id] = new (class {
                checkSlides() {
                    const t = this.container.offsetWidth,
                        i = this.container.querySelectorAll(cp),
                        s = e.data(this.sliderNav) || null;
                    null !== s &&
                        ((s.options.draggable = !1),
                        (s.options.wrapAround = !1),
                        (s.options.contain = !0),
                        this.getSlidesWidth() > t && i.length > 2 && ((s.options.draggable = !0), (s.options.wrapAround = !0), (s.options.contain = !1)),
                        s.resize(),
                        s.updateDraggable());
                }
                getSlidesWidth() {
                    const t = this.container.querySelectorAll(cp);
                    let e = 0;
                    return (
                        t.length &&
                            t.forEach((t) => {
                                e += t.offsetWidth;
                            }),
                        e
                    );
                }
                initSlider() {
                    let t = e.data(this.slider) || null,
                        i = e.data(this.sliderNav) || null;
                    (t = new e(this.slider, { fade: !0, wrapAround: !0, adaptiveHeight: !0, prevNextButtons: !1, pageDots: !1 })),
                        (i = new e(this.sliderNav, {
                            draggable: !1,
                            wrapAround: !1,
                            contain: !0,
                            imagesLoaded: !0,
                            lazyLoad: !0,
                            asNavFor: this.slider,
                            prevNextButtons: !1,
                            adaptiveHeight: !1,
                            pageDots: !1,
                            on: {
                                ready: () => {
                                    this.container.querySelectorAll(cp).forEach((e) => {
                                        e.addEventListener("keyup", (i) => {
                                            if (i.code === theme.keyboardKeys.ENTER || i.code === theme.keyboardKeys.NUMPADENTER || i.code === theme.keyboardKeys.SPACE) {
                                                const i = Number(e.getAttribute(dp));
                                                t.selectCell(i);
                                            }
                                        });
                                    });
                                },
                            },
                        })),
                        te(this.slider),
                        te(this.sliderNav),
                        i.on("change", (e) => {
                            t.selectCell(e);
                        }),
                        t.on("change", (e) => {
                            i.selectCell(e),
                                t.cells.forEach((t, i) => {
                                    t.element.querySelectorAll(hp).forEach((t) => {
                                        t.setAttribute(up, i === e ? "0" : "-1");
                                    });
                                });
                        });
                }
                resizeSlider() {
                    const t = e.data(this.slider);
                    t && t.resize();
                }
                onBlockSelect(t) {
                    const i = e.data(this.slider) || null,
                        s = e.data(this.sliderNav) || null,
                        o = parseInt([...t.target.parentNode.children].indexOf(t.target));
                    null !== i && i.select(o), null !== s && s.select(o);
                }
                onUnload() {
                    document.removeEventListener("theme:resize:width", this.sliderResizeEvent);
                }
                constructor(t) {
                    (this.container = t.container),
                        (this.slider = this.container.querySelector(ap)),
                        (this.sliderNav = this.container.querySelector(lp)),
                        (this.sliderResizeEvent = () => this.checkSlides()),
                        this.initSlider(),
                        this.checkSlides(),
                        window.addEventListener("load", this.resizeSlider.bind(this)),
                        document.addEventListener("theme:resize:width", this.sliderResizeEvent);
                }
            })(this);
        },
        onUnload(t) {
            pp[this.id].onUnload(t);
        },
        onBlockSelect(t) {
            pp[this.id].onBlockSelect(t);
        },
    };
    it("press", mp);
    const gp = "[data-product-single-media-slider]",
        vp = "[data-product-info]",
        yp = "[data-header-sticky]",
        fp = "[data-header-height]",
        bp = "is-sticky",
        wp = "data-sticky-enabled";
    window.theme.variables = { productPageSticky: !1 };
    const Ep = {};
    const Sp = {
            onLoad() {
                Ep[this.id] = new (class {
                    init() {
                        this.stickyEnabled && (this.stickyScrollCheck(), document.addEventListener("theme:resize", this.resizeEvent)), this.initSticky();
                    }
                    initSticky() {
                        theme.variables.productPageSticky &&
                            ((this.requestAnimationSticky = requestAnimationFrame(() => this.calculateStickyPosition())),
                            this.productInfo.addEventListener("theme:form:sticky", (t) => {
                                this.removeAnimationFrame(), (this.requestAnimationSticky = requestAnimationFrame(() => this.calculateStickyPosition(t)));
                            }),
                            document.addEventListener("theme:scroll", this.scrollEvent));
                    }
                    scrollEvents(t) {
                        null !== t.detail && ((this.scrollTop = t.detail.position), (this.scrollDirectionDown = t.detail.down)),
                            this.requestAnimationSticky || (this.requestAnimationSticky = requestAnimationFrame(() => this.calculateStickyPosition()));
                    }
                    resizeEvents() {
                        this.stickyScrollCheck(), document.removeEventListener("theme:scroll", this.scrollEvent), this.initSticky();
                    }
                    stickyScrollCheck() {
                        const t = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) >= window.theme.sizes.large,
                            e = this.container.querySelector(vp);
                        if (e)
                            if (t) {
                                const t = this.container.querySelector(vp),
                                    i = this.container.querySelector(gp);
                                if (!t || !i) return;
                                t.offsetHeight < i.offsetHeight ? ((theme.variables.productPageSticky = !0), e.classList.add(bp)) : ((theme.variables.productPageSticky = !1), e.classList.remove(bp));
                            } else (theme.variables.productPageSticky = !1), e.classList.remove(bp);
                    }
                    calculateStickyPosition(t = null) {
                        const e = Boolean(t && t.detail),
                            i = Boolean(e && t.detail.element && "accordion" === t.detail.element),
                            s = this.productInfo.offsetHeight,
                            o = window.innerHeight - s - this.defaultTopBottomSpacings,
                            n = Math.abs(this.scrollTop - this.scrollLastPosition);
                        this.scrollDirectionDown ? (this.stickyScrollTop -= n) : (this.stickyScrollTop += n),
                            this.stickyFormLoad &&
                                (document.querySelector(yp) && document.querySelector(fp)
                                    ? (this.stickyDefaultTop = parseInt(document.querySelector(fp).getBoundingClientRect().height))
                                    : (this.stickyDefaultTop = this.defaultTopBottomSpacings),
                                (this.stickyScrollTop = this.stickyDefaultTop)),
                            (this.stickyScrollTop = Math.min(Math.max(this.stickyScrollTop, o), this.stickyDefaultTop));
                        const r = this.stickyScrollTop - this.currentPoint;
                        (this.currentPoint = this.stickyFormLoad ? this.stickyScrollTop : this.currentPoint + 0.5 * r),
                            this.productInfo.style.setProperty("--sticky-top", `${this.currentPoint}px`),
                            (this.scrollLastPosition = this.scrollTop),
                            (this.stickyFormLoad = !1),
                            (i && this.onChangeCounter <= 10) || (i && this.stickyFormLastHeight !== s) || (this.stickyScrollTop !== this.currentPoint && this.requestAnimationSticky)
                                ? (i && (this.onChangeCounter += 1), i && this.stickyFormLastHeight !== s && (this.onChangeCounter = 11), (this.requestAnimationSticky = requestAnimationFrame(() => this.calculateStickyPosition(t))))
                                : this.requestAnimationSticky && this.removeAnimationFrame(),
                            (this.stickyFormLastHeight = s);
                    }
                    removeAnimationFrame() {
                        this.requestAnimationSticky && (cancelAnimationFrame(this.requestAnimationSticky), (this.requestAnimationSticky = null), (this.onChangeCounter = 0));
                    }
                    onUnload() {
                        this.stickyEnabled && document.removeEventListener("theme:resize", this.resizeEvent), theme.variables.productPageSticky && document.removeEventListener("theme:scroll", this.scrollEvent);
                    }
                    constructor(t) {
                        (this.container = t.container),
                            (this.stickyEnabled = "true" === this.container.getAttribute(wp)),
                            (this.productInfo = this.container.querySelector(vp)),
                            (this.stickyScrollTop = 0),
                            (this.scrollLastPosition = 0),
                            (this.stickyDefaultTop = 0),
                            (this.currentPoint = 0),
                            (this.defaultTopBottomSpacings = 30),
                            (this.scrollTop = window.scrollY),
                            (this.scrollDirectionDown = !0),
                            (this.requestAnimationSticky = null),
                            (this.stickyFormLoad = !0),
                            (this.stickyFormLastHeight = null),
                            (this.onChangeCounter = 0),
                            (this.scrollEvent = (t) => this.scrollEvents(t)),
                            (this.resizeEvent = (t) => this.resizeEvents(t)),
                            this.init();
                    }
                })(this);
            },
            onUnload() {
                Ep[this.id].onUnload();
            },
        },
        Lp = "[data-product-single-media-group]",
        kp = "[data-product-single-media-slider]",
        Ap = "[data-zoom-wrapper]",
        qp = "pswp-zoom-gallery",
        Cp = "pswp-zoom-gallery--single",
        Tp = "is-moving",
        Pp = "data-image-width",
        Fp = "data-image-height";
    const Ip = "[data-complementary-products]",
        Dp = "[data-button-quick-view]",
        xp = "data-url";
    let Hp = class extends HTMLElement {
        connectedCallback() {
            new IntersectionObserver(
                ((t, e) => {
                    t[0].isIntersecting &&
                        (e.unobserve(this),
                        this.hasAttribute(xp) &&
                            "" !== this.getAttribute(xp) &&
                            fetch(this.getAttribute(xp))
                                .then((t) => t.text())
                                .then((t) => {
                                    const e = document.createElement("div");
                                    e.innerHTML = t;
                                    const i = e.querySelector(Ip);
                                    i && i.innerHTML.trim().length && (this.innerHTML = i.innerHTML), e.querySelector(Dp) && new ur(this);
                                })
                                .catch((t) => {
                                    console.error(t);
                                }));
                }).bind(this),
                { rootMargin: "0px 0px 400px 0px" }
            ).observe(this);
        }
        constructor() {
            super();
        }
    };
    const Mp = "[data-product-single-media-slider]",
        _p = "[data-thumbnail-id]",
        Op = "[data-product-single-media-thumbs]",
        Bp = "[data-product-single-media-wrapper]",
        zp = "[data-model]",
        Wp = ".product-single__thumbnail-link",
        $p = "[data-deferred-media]",
        Vp = "[data-deferred-media-button]",
        Rp = "[data-product-rating]",
        Np = "#shopify-product-reviews",
        Up = "a, button",
        jp = "[data-upsell-holder]",
        Kp = "[data-upsell-slider]",
        Qp = "[data-slider]",
        Gp = "featured-product",
        Xp = "featured-product--onboarding",
        Jp = "has-media-active",
        Yp = "is-selected",
        Zp = "media--hidden",
        tm = "no-outline",
        em = "is-moving",
        im = "data-media-id",
        sm = "data-section-id",
        om = "data-thumbnail-id",
        nm = "data-tall-layout",
        rm = "loaded",
        am = "tabindex",
        lm = {};
    const cm = {
        onLoad() {
            lm[this.id] = new (class {
                productSlider() {
                    this.checkSlider(), document.addEventListener("theme:resize:width", this.checkSliderOnResize);
                }
                checkSlider() {
                    !this.tallLayout || window.innerWidth < theme.sizes.large ? this.initProductSlider() : this.destroyProductSlider();
                }
                resizeFlickityNav() {
                    null !== this.flktyNav && this.flktyNav.resize();
                }
                initProductSlider() {
                    const t = this.container.querySelector(Mp),
                        i = this.container.querySelector(Op),
                        s = this.container.querySelectorAll(Bp);
                    if (
                        s.length > 1 &&
                        ((this.flkty = new e(t, {
                            wrapAround: !0,
                            pageDots: !1,
                            adaptiveHeight: !0,
                            on: {
                                ready: () => {
                                    t.setAttribute(am, "-1"),
                                        s.forEach((t) => {
                                            if (!t.classList.contains(Yp)) {
                                                const e = t.querySelectorAll(Up);
                                                e.length &&
                                                    e.forEach((t) => {
                                                        t.setAttribute(am, "-1");
                                                    });
                                            }
                                        });
                                },
                                dragStart: () => {
                                    t.classList.add(em);
                                },
                                dragMove: () => {
                                    this.isFlickityDragging = !0;
                                },
                                staticClick: () => {
                                    this.isFlickityDragging = !1;
                                },
                                settle: (e) => {
                                    const i = this.flkty.selectedElement.getAttribute(im);
                                    this.flkty.cells.forEach((t, i) => {
                                        const s = t.element.querySelectorAll(Up);
                                        s.length &&
                                            s.forEach((t) => {
                                                t.setAttribute(am, i === e ? "0" : "-1");
                                            });
                                    }),
                                        this.switchMedia(i),
                                        t.classList.remove(em);
                                },
                            },
                        })),
                        s.length &&
                            s.forEach((t) => {
                                t.addEventListener("theme:media:play", () => {
                                    (this.flkty.options.draggable = !1), this.flkty.updateDraggable(), t.closest(Mp).classList.add(Jp);
                                }),
                                    t.addEventListener("theme:media:pause", () => {
                                        (this.flkty.options.draggable = !0), this.flkty.updateDraggable(), t.closest(Mp).classList.remove(Jp);
                                    });
                            }),
                        te(t),
                        null !== i)
                    ) {
                        (this.flktyNav = new e(i, {
                            asNavFor: t,
                            contain: !0,
                            pageDots: !1,
                            prevNextButtons: !1,
                            resize: !0,
                            on: {
                                ready: () => {
                                    i.setAttribute(am, "-1");
                                },
                            },
                        })),
                            null !== this.flktyNav && document.addEventListener("theme:resize:width", this.flktyNavOnResize),
                            te(i);
                        const s = this.container.querySelectorAll(Wp);
                        s.length &&
                            s.forEach((t) => {
                                t.addEventListener("click", (t) => {
                                    t.preventDefault();
                                });
                            });
                    }
                }
                destroyProductSlider() {
                    null !== this.flkty && (this.flkty.destroy(), this.flktyNav.destroy(), (this.flkty = null), (this.flktyNav = null));
                }
                initUpsellSlider() {
                    const t = this.container.querySelector(Kp);
                    if (this.container.querySelectorAll(jp).length > 1) {
                        const i = new e(t, { wrapAround: !0, pageDots: !0, adaptiveHeight: !0, prevNextButtons: !1 });
                        i.on("change", (t) => {
                            i.cells.forEach((e, i) => {
                                const s = e.element.querySelectorAll(Up);
                                s.length &&
                                    s.forEach((e) => {
                                        e.setAttribute(am, i === t ? "0" : "-1");
                                    });
                            });
                        });
                    }
                }
                initFeatureSlider() {
                    this.featureSliders.forEach((t) => {
                        Array.from(t.children).length > 1 && (this.flktyFeature = new e(t, { wrapAround: !0, pageDots: !0, adaptiveHeight: !0, prevNextButtons: !1 }));
                    });
                }
                handleMediaFocus(t) {
                    if (t.code !== theme.keyboardKeys.ENTER && t.code !== theme.keyboardKeys.TAB) return;
                    const i = t.currentTarget.getAttribute(om),
                        s = this.container.querySelector(`[${im}="${i}"]`),
                        o = parseInt([...s.parentNode.children].indexOf(s)),
                        n = this.container.querySelector(Mp),
                        r = this.container.querySelector(Op),
                        a = e.data(n) || null,
                        l = e.data(r) || null;
                    a && a.isActive && o > -1 && (t.code === theme.keyboardKeys.ENTER || t.code === theme.keyboardKeys.NUMPADENTER) && a.select(o), l && l.isActive && o > -1 && l.select(o);
                }
                switchMedia(t) {
                    const e = document.querySelectorAll(`${Bp}`),
                        i = this.container.querySelector(`${Bp}[${im}="${t}"]`),
                        s = !document.body.classList.contains(tm);
                    e.length &&
                        e.forEach((t) => {
                            t.dispatchEvent(new CustomEvent("theme:media:hidden"), { bubbles: !0 }), t.classList.add(Zp);
                        }),
                        s && i.focus(),
                        i.closest(Mp).classList.remove(Jp),
                        i.classList.remove(Zp),
                        i.dispatchEvent(new CustomEvent("theme:media:visible"), { bubbles: !0 });
                    const o = i.querySelector($p);
                    o && "true" !== o.getAttribute(rm) && i.querySelector(Vp).dispatchEvent(new Event("click"));
                }
                initMediaSwitch() {
                    const t = this.container.querySelectorAll(_p);
                    t.length &&
                        t.forEach((t) => {
                            t.addEventListener("keyup", this.handleMediaFocus.bind(this)),
                                t.addEventListener("click", (t) => {
                                    t.preventDefault();
                                });
                        });
                }
                initProductVideo() {
                    this.videos = new me(this.container);
                }
                initProductModel() {
                    const t = this.container.querySelectorAll(zp);
                    t.length &&
                        t.forEach((t) => {
                            theme.ProductModel.init(t, this.sectionId);
                        });
                }
                initShopifyXrLaunch() {
                    document.addEventListener("shopify_xr_launch", () => {
                        this.container.querySelector(`${zp}:not(.${Zp})`).dispatchEvent(new CustomEvent("xrLaunch"));
                    });
                }
                onUnload() {
                    null !== this.flktyNav && document.removeEventListener("theme:resize:width", this.flktyNavOnResize), document.removeEventListener("theme:resize:width", this.checkSliderOnResize);
                }
                scrollToReviews() {
                    const t = this.container.querySelector(Rp);
                    t &&
                        ["click", "keydown"].forEach((e) => {
                            t.addEventListener(e, (t) => {
                                if ((t.code !== theme.keyboardKeys.ENTER && t.code !== theme.keyboardKeys.NUMPADENTER) || "click" != t.type) {
                                    const t = document.querySelector(Np);
                                    if (!t) return;
                                    t.scrollIntoView({ behavior: "smooth" });
                                }
                            });
                        });
                }
                onBlockSelect(t) {
                    const i = e.data(t.target.closest(Qp)),
                        s = parseInt([...t.target.parentNode.children].indexOf(t.target));
                    i && i.select(s);
                }
                constructor(t) {
                    (this.container = t.container),
                        (this.sectionId = this.container.getAttribute(sm)),
                        (this.tallLayout = "true" === this.container.getAttribute(nm)),
                        (this.featureSliders = this.container.querySelectorAll(Qp)),
                        (this.flkty = null),
                        (this.flktyNav = null),
                        (this.isFlickityDragging = !1),
                        (this.enableHistoryState = !this.container.classList.contains(Gp)),
                        (this.checkSliderOnResize = () => this.checkSlider()),
                        (this.flktyNavOnResize = () => this.resizeFlickityNav()),
                        this.scrollToReviews(),
                        this.initUpsellSlider(),
                        this.initFeatureSlider(),
                        new ur(this.container),
                        this.container.classList.contains(Xp) ||
                            (new (class {
                                init() {
                                    this.zoomWrappers.length &&
                                        this.zoomWrappers.forEach((t, e) => {
                                            t.addEventListener("click", (i) => {
                                                i.preventDefault(), (this.slider && this.slider.classList.contains(Tp)) || ((this.a11y.state.trigger = t), this.createZoom(e));
                                            });
                                        });
                                }
                                createZoom(t) {
                                    const e = this;
                                    let i = [],
                                        s = 0;
                                    this.zoomWrappers.forEach((o) => {
                                        const n = o.getAttribute("href"),
                                            r = parseInt(o.getAttribute(Pp)),
                                            a = parseInt(o.getAttribute(Fp));
                                        if ((i.push({ src: n, w: r, h: a, msrc: n }), (s += 1), e.zoomWrappers.length === s)) {
                                            let e = `${qp}`;
                                            1 === s && (e = `${qp} ${Cp}`),
                                                new Kn(i, {
                                                    barsSize: { top: 60, bottom: 60 },
                                                    history: !1,
                                                    focus: !1,
                                                    index: t,
                                                    mainClass: e,
                                                    showHideOpacity: !0,
                                                    showAnimationDuration: 250,
                                                    hideAnimationDuration: 250,
                                                    closeOnScroll: !1,
                                                    closeOnVerticalDrag: !1,
                                                    captionEl: !1,
                                                    closeEl: !0,
                                                    closeElClasses: ["caption-close"],
                                                    tapToClose: !1,
                                                    clickToCloseNonZoomable: !1,
                                                    maxSpreadZoom: 2,
                                                    loop: !0,
                                                    spacing: 0,
                                                    allowPanToNext: !0,
                                                    pinchToClose: !1,
                                                });
                                        }
                                    });
                                }
                                constructor(t) {
                                    (this.container = t),
                                        (this.mediaContainer = this.container.querySelector(Lp)),
                                        (this.slider = this.container.querySelector(kp)),
                                        (this.zoomWrappers = this.container.querySelectorAll(Ap)),
                                        (this.zoomEnable = "true" === this.mediaContainer.dataset.gallery),
                                        (this.a11y = Ft),
                                        this.zoomEnable && this.init();
                                }
                            })(this.container),
                            this.productSlider(),
                            this.initMediaSwitch(),
                            this.initProductVideo(),
                            this.initProductModel(),
                            this.initShopifyXrLaunch());
                }
            })(this);
        },
        onUnload: function () {
            lm[this.id].onUnload();
        },
        onBlockSelect(t) {
            lm[this.id].onBlockSelect(t);
        },
    };
    it("product-template", [Ss, cm, eo, Qc, Et, zo, Ao, Ge, Sp]), it("featured-product", [Ss, cm, eo, Qc, Et, zo, Ao, Ge, Sp]), customElements.get("complementary-products") || customElements.define("complementary-products", Hp);
    const hm = "is-disabled",
        dm = "data-circle-text-parallax";
    const um = "href",
        pm = "data-media-id",
        mm = "data-deferred-media-loaded",
        gm = "[data-product-content-wrapper]",
        vm = "[data-product-single-media-wrapper]",
        ym = "[data-model]",
        fm = "[data-product-link]",
        bm = "[data-product-single-media-image]",
        wm = "[data-slider-contents]",
        Em = "[data-slider-images]",
        Sm = "[data-tab-button]",
        Lm = "[data-tab-item]",
        km = "[data-circle-text]",
        Am = { aosAnimate: "aos-animate", tabButtonActive: "products-list__nav__button--active", tabItemActive: "products-list__item--active", mediaHidden: "media--hidden", isDisabled: "is-disabled" },
        qm = {};
    it("products-list", {
        onLoad() {
            qm[this.id] = new (class {
                listen() {
                    (this.slidersImages.length > 0 || this.slidersContents.length > 0) && document.addEventListener("theme:resize", this.sliderResizeEvent);
                }
                resizeSlider() {
                    this.flktyImages.length > 0 &&
                        requestAnimationFrame(() => {
                            this.flktyImages.forEach((t) => t.resize());
                        }),
                        this.flktyContent.length > 0 &&
                            requestAnimationFrame(() => {
                                this.flktyContent.forEach((t) => t.resize());
                            });
                }
                initButtons() {
                    this.tabButtons.length &&
                        this.tabButtons.forEach((t) => {
                            t.addEventListener("click", (e) => {
                                if (t.classList.contains(Am.tabButtonActive)) return;
                                const i = t.getAttribute(um),
                                    s = this.container.querySelector(i),
                                    o = s.querySelector(vm),
                                    n = o ? o.dataset.mediaId : null,
                                    r = s.querySelector(km);
                                this.tabButtons.forEach((t) => {
                                    t.classList.remove(Am.tabButtonActive);
                                }),
                                    this.tabItems.forEach((t) => {
                                        const e = t.querySelector(km);
                                        t.classList.remove(Am.tabItemActive),
                                            null == e || e.classList.add(Am.isDisabled),
                                            theme.settings.animations &&
                                                t.querySelectorAll(`.${Am.aosAnimate}`).forEach((t) => {
                                                    t.classList.remove(Am.aosAnimate),
                                                        setTimeout(() => {
                                                            t.classList.add(Am.aosAnimate);
                                                        });
                                                });
                                    }),
                                    t.classList.add(Am.tabButtonActive),
                                    s.classList.add(Am.tabItemActive),
                                    document.dispatchEvent(new Event("theme:resize")),
                                    r && (r.classList.remove(Am.isDisabled), document.dispatchEvent(new Event("theme:scroll"))),
                                    this.handleProductVideos(s, n),
                                    e.preventDefault();
                            });
                        });
                }
                initSliders() {
                    this.slidersImages.forEach((t, i) => {
                        const s = t.closest(Lm).querySelector(wm),
                            o = new e(t, {
                                fade: !0,
                                pageDots: !1,
                                prevNextButtons: !0,
                                wrapAround: !0,
                                adaptiveHeight: !0,
                                asNavFor: s,
                                on: {
                                    change: (t) => {
                                        this.flktyContent.length > 0 && this.flktyContent[i].select(t);
                                    },
                                },
                            });
                        o.on("settle", (e) => {
                            const i = t.querySelectorAll(vm);
                            for (let t = 0; t < i.length; t++) t === e ? i[t].querySelector(bm).removeAttribute("tabindex") : i[t].querySelector(bm).setAttribute("tabindex", "-1");
                        }),
                            this.flktyImages.push(o);
                    }),
                        this.slidersContents.forEach((t) => {
                            const i = new e(t, { fade: !0, pageDots: !1, prevNextButtons: !1, wrapAround: !0, adaptiveHeight: !0 });
                            i.on("settle", (e) => {
                                const i = t.querySelectorAll(gm);
                                for (let t = 0; t < i.length; t++)
                                    t === e
                                        ? i[t].querySelectorAll(fm).forEach((t) => {
                                              t.removeAttribute("tabindex");
                                          })
                                        : i[t].querySelectorAll(fm).forEach((t) => {
                                              t.setAttribute("tabindex", "-1");
                                          });
                            }),
                                this.flktyContent.push(i);
                        });
                }
                initProductVideos() {
                    this.tabItems.forEach((t) => {
                        t.classList.contains(Am.tabItemActive) && this.handleProductVideos(t);
                    });
                }
                loadVideos(t, e = null) {
                    new IntersectionObserver(
                        (i, s) => {
                            i.forEach((i) => {
                                if (i.isIntersecting) {
                                    const o = new me(t);
                                    this.videos.push(o), t.setAttribute(mm, ""), this.playToggle(e), s.unobserve(i.target);
                                }
                            });
                        },
                        { root: null, rootMargin: "300px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
                    ).observe(t);
                }
                handleProductVideos(t, e = null) {
                    t.hasAttribute(mm) ? this.playToggle(e) : this.loadVideos(t, e);
                }
                playToggle(t) {
                    this.videos.forEach((e) => {
                        "function" == typeof e.pauseContainerMedia && t && (e.pauseContainerMedia(t, this.container), this.switchMedia(t)), t || 0 !== Object.keys(e.players).length || this.pauseContainerMedia(this.container);
                    });
                }
                switchMedia(t) {
                    const e = this.container.querySelector(`${vm}[${pm}="${t}"]`);
                    !document.body.classList.contains(Am.noOutline) && e.focus(), e.classList.remove(Am.mediaHidden), e.dispatchEvent(new CustomEvent("theme:media:visible"), { bubbles: !0 });
                }
                pauseContainerMedia(t) {
                    const e = t.querySelectorAll(vm);
                    0 !== e.length &&
                        e.forEach((t) => {
                            t.dispatchEvent(new CustomEvent("theme:media:hidden"), { bubbles: !0 }), t.classList.add(Am.mediaHidden);
                        });
                }
                initProductModel() {
                    const t = this.container.querySelectorAll(ym);
                    t.length &&
                        t.forEach((t) => {
                            theme.ProductModel.init(t, this.sectionId);
                        });
                }
                initShopifyXrLaunch() {
                    document.addEventListener("shopify_xr_launch", () => {
                        this.container.querySelector(`${ym}:not(.${Am.mediaHidden})`).dispatchEvent(new CustomEvent("xrLaunch"));
                    });
                }
                initCircleText() {
                    this.container.querySelectorAll(km).forEach((t) => {
                        new (class {
                            init() {
                                this.circleText.hasAttribute(dm) && document.addEventListener("theme:scroll", this.scrollEvent);
                            }
                            updateParallax() {
                                if (this.circleText.classList.contains(hm)) return;
                                const t = Math.round(window.innerHeight),
                                    e = Math.round(window.scrollY),
                                    i = e + t,
                                    s = Math.round(this.circleText.getBoundingClientRect().top + e),
                                    o = this.circleText.offsetHeight;
                                if (s < i && !(s + o < e)) {
                                    const e = (100 * (i - s - o / 2)) / t;
                                    let n = ((this.rotateDegree * e) / 100) * -1;
                                    e > 0 && (this.circleText.style.transform = `rotate(${this.adjustRotateDegree + n}deg)`);
                                }
                            }
                            unload() {
                                document.removeEventListener("theme:scroll", this.scrollEvent);
                            }
                            constructor(t) {
                                (this.circleText = t), (this.rotateDegree = 70), (this.adjustRotateDegree = this.rotateDegree / 2), (this.scrollEvent = () => this.updateParallax()), this.init();
                            }
                        })(t);
                    });
                }
                onBlockSelect(t) {
                    t.target.dispatchEvent(new Event("click"));
                }
                onUnload() {
                    (this.slidersImages.length > 0 || this.slidersContents.length > 0) && document.removeEventListener("theme:resize", this.sliderResizeEvent);
                }
                constructor(t) {
                    (this.container = t.container),
                        (this.sectionId = this.container.dataset.sectionId),
                        (this.tabButtons = this.container.querySelectorAll(Sm)),
                        (this.tabItems = this.container.querySelectorAll(Lm)),
                        (this.slidersImages = this.container.querySelectorAll(Em)),
                        (this.slidersContents = this.container.querySelectorAll(wm)),
                        (this.videos = []),
                        (this.flktyImages = []),
                        (this.flktyContent = []),
                        (this.sliderResizeEvent = () => this.resizeSlider()),
                        this.initButtons(),
                        this.initSliders(),
                        this.initProductVideos(),
                        this.initProductModel(),
                        this.initShopifyXrLaunch(),
                        this.initCircleText(),
                        this.listen();
                }
            })(this);
        },
        onUnload() {
            qm[this.id].onUnload();
        },
        onBlockSelect(t) {
            qm[this.id].onBlockSelect(t);
        },
    });
    const Cm = "[data-product-block]",
        Tm = "[data-related-products]",
        Pm = "data-section-id",
        Fm = "data-product-id",
        Im = "data-limit",
        Dm = {};
    it("related-products", {
        onLoad() {
            Dm[this.id] = new (class {
                init() {
                    const t = this.container.getAttribute(Pm),
                        e = this.container.getAttribute(Fm),
                        i = this.container.getAttribute(Im),
                        s = `${theme.routes.product_recommendations_url}?section_id=${t}&limit=${i}&product_id=${e}`;
                    fetch(s)
                        .then((t) => t.text())
                        .then((t) => {
                            const e = document.createElement("div");
                            e.innerHTML = t;
                            const i = e.querySelector(Tm);
                            i.querySelectorAll(Cm).length && ((this.relatedProducts.innerHTML = i.innerHTML), (this.productGrid = new za(this.container)), (this.gridSlider = new cd(this.container)));
                        });
                }
                onDeselect() {
                    this.productGrid && this.productGrid.onDeselect();
                }
                onUnload() {
                    this.productGrid && this.productGrid.onUnload(), this.gridSlider && this.gridSlider.onUnload();
                }
                constructor(t) {
                    (this.container = t), (this.relatedProducts = this.container.querySelector(Tm)), this.init();
                }
            })(this.container);
        },
        onDeselect() {
            Dm[this.id].onDeselect();
        },
        onUnload() {
            Dm[this.id].onUnload();
        },
    });
    const xm = {},
        Hm = "[data-slider]",
        Mm = "[data-item]",
        _m = "[data-button-show]",
        Om = "[data-button-hide]",
        Bm = "[data-item-products]",
        zm = "[data-item-products-slider]",
        Wm = "[data-item-product]",
        $m = "a, button",
        Vm = "blog-item--active",
        Rm = "blog-item__products--visible",
        Nm = "flickity-enabled",
        Um = "is-selected",
        jm = { slider: "data-slider", slidePosition: "data-slide-position", sectionId: "data-section-id", tabIndex: "tabindex" };
    const Km = {
        onLoad() {
            xm[this.id] = new (class {
                initSlider() {
                    (this.flkty = new e(this.slider, {
                        prevNextButtons: !0,
                        pageDots: !1,
                        cellAlign: "left",
                        wrapAround: !1,
                        groupCells: !0,
                        contain: !0,
                        on: {
                            ready: () => {
                                this.handleFocus();
                            },
                        },
                    })),
                        this.flkty.on("change", () => {
                            const t = this.container.querySelectorAll(Mm);
                            this.handleFocus(),
                                t.length &&
                                    t.forEach((t) => {
                                        const e = t.querySelector(Bm);
                                        t.classList.remove(Vm), e && t.querySelector(Bm).classList.remove(Rm);
                                    }),
                                this.flkty && !this.flkty.options.draggable && ((this.flkty.options.draggable = !0), this.flkty.updateDraggable());
                        });
                }
                destroySlider() {
                    null !== this.flkty && (this.flkty.destroy(), (this.flkty = null));
                }
                checkSlidesSize() {
                    const t = this.container.querySelector(Mm).currentStyle || window.getComputedStyle(this.container.querySelector(Mm));
                    this.gutter = parseInt(t.marginRight);
                    const e = this.slider.offsetWidth + this.gutter < this.getItemsWidth();
                    window.innerWidth >= theme.sizes.small && e ? this.initSlider() : this.destroySlider();
                }
                getItemsWidth() {
                    let t = 0;
                    const e = this.slider.querySelectorAll(Mm);
                    return (
                        e.length &&
                            e.forEach((e) => {
                                t += e.offsetWidth + this.gutter;
                            }),
                        t
                    );
                }
                bindButtons() {
                    const t = this.container.querySelectorAll(zm),
                        i = this.container.querySelectorAll(_m),
                        s = this.container.querySelectorAll(Om);
                    i.length &&
                        i.forEach((t) => {
                            t.addEventListener("click", (e) => {
                                e.preventDefault(),
                                    this.container.querySelectorAll(Mm).forEach((t) => {
                                        const e = t.querySelector(Bm);
                                        t.classList.remove(Vm), e && (e.classList.remove(Rm), this.changeTabIndex(e));
                                    });
                                const i = t.closest(Mm),
                                    s = i.querySelector(Bm);
                                if ((i.classList.add(Vm), s)) {
                                    s.classList.add(Rm), this.changeTabIndex(s, "enable");
                                    const t = s.querySelector(zm),
                                        e = t.querySelectorAll(Wm);
                                    if (t.classList.contains(Nm)) {
                                        const i = t.querySelector(`.${Um}`).getAttribute(jm.slidePosition);
                                        e.forEach((t, e) => {
                                            t.setAttribute(jm.tabIndex, e === i ? "0" : "-1");
                                        });
                                    }
                                }
                                null !== this.flkty && ((this.flkty.options.draggable = !1), this.flkty.updateDraggable()), (this.a11y.state.trigger = t);
                            });
                        }),
                        s.length &&
                            s.forEach((t) => {
                                t.addEventListener("click", (e) => {
                                    e.preventDefault();
                                    const i = t.closest(Mm),
                                        s = i.querySelector(Bm);
                                    i.classList.remove(Vm), s && (s.classList.remove(Rm), this.changeTabIndex(s)), null !== this.flkty && ((this.flkty.options.draggable = !0), this.flkty.updateDraggable()), this.a11y.state.trigger.focus();
                                });
                            }),
                        t.length &&
                            t.forEach((t) => {
                                if (t.querySelectorAll(Wm).length > 1) {
                                    const i = new e(t, {
                                        prevNextButtons: !0,
                                        contain: !0,
                                        pageDots: !1,
                                        wrapAround: !0,
                                        on: {
                                            change: (t) => {
                                                i.cells.forEach((e, i) => {
                                                    e.element.querySelectorAll($m).forEach((e) => {
                                                        e.setAttribute(jm.tabIndex, i === t ? "0" : "-1");
                                                    });
                                                });
                                            },
                                        },
                                    });
                                }
                            }),
                        this.slider.addEventListener("keyup", (t) => {
                            if (t.code === theme.keyboardKeys.ESCAPE) {
                                const e = t.target.hasAttribute(jm.slider) ? t.target.querySelectorAll(Mm) : t.target.closest(Hm).querySelectorAll(Mm);
                                e.length &&
                                    (e.forEach((t) => {
                                        const e = t.querySelector(Bm);
                                        t.classList.remove(Vm), e && (e.classList.remove(Rm), this.changeTabIndex(e));
                                    }),
                                    this.flkty && ((this.flkty.options.draggable = !0), this.flkty.updateDraggable())),
                                    this.a11y.state.trigger.focus();
                            }
                        });
                }
                handleFocus() {
                    const t = this.container.querySelectorAll(Mm);
                    t.length &&
                        t.forEach((t) => {
                            const e = t.classList.contains(Um),
                                i = t.querySelector(Bm);
                            e ? (this.changeTabIndex(t, "enable"), i && this.changeTabIndex(i)) : (this.changeTabIndex(t), i && i.classList.remove(Rm));
                        });
                }
                listen() {
                    this.slider && (this.checkSlidesSize(), document.addEventListener("theme:resize:width", this.checkSlidesSizeOnResize)), document.addEventListener("mousedown", this.clickOutsideItemEvent);
                }
                changeTabIndex(t, e = "") {
                    const i = "enable" === e ? "0" : "-1";
                    t.querySelectorAll($m).forEach((t) => {
                        t.setAttribute(jm.tabIndex, i);
                    });
                }
                onBlockSelect(t) {
                    if (null !== this.flkty) {
                        const e = parseInt([...t.target.parentNode.children].indexOf(t.target)),
                            i = parseInt(this.flkty.slides[0].cells.length),
                            s = Math.floor(e / i);
                        this.flkty.select(s);
                    } else {
                        const e = this.slider.currentStyle || window.getComputedStyle(this.slider),
                            i = parseInt(e.paddingLeft),
                            s = t.target.offsetLeft - i;
                        this.slider.scrollTo({ top: 0, left: s, behavior: "smooth" });
                    }
                }
                onUnload() {
                    document.removeEventListener("theme:resize:width", this.checkSlidesSizeOnResize), document.removeEventListener("mousedown", this.clickOutsideItemEvent);
                }
                constructor(t) {
                    (this.container = t.container),
                        (this.flkty = null),
                        (this.slider = this.container.querySelector(Hm)),
                        (this.checkSlidesSizeOnResize = () => this.checkSlidesSize()),
                        (this.isFullWidth = this.container.hasAttribute(jm.fullWidth)),
                        (this.gutter = 0),
                        (this.a11y = Ft),
                        (this.clickOutsideItemEvent = (t) => {
                            if (!t.target.matches(Mm) && !t.target.closest(Mm)) {
                                const t = this.container.querySelectorAll(Mm);
                                t.length &&
                                    t.forEach((t) => {
                                        const e = t.querySelector(Bm);
                                        e && (e.classList.remove(Rm), this.changeTabIndex(e)), t.classList.remove(Vm);
                                    });
                            }
                        }),
                        this.bindButtons(),
                        this.listen();
                }
            })(this);
        },
        onUnload(t) {
            xm[this.id].onUnload(t);
        },
        onBlockSelect(t) {
            xm[this.id].onBlockSelect(t);
        },
    };
    it("shoppable-blog", Km);
    const Qm = "[data-scroll-down]",
        Gm = "[data-site-header]",
        Xm = "[data-slide]",
        Jm = "a, button",
        Ym = "[data-slider]",
        Zm = "data-style",
        tg = "data-current-style",
        eg = "tabindex",
        ig = "data-slide-position",
        sg = "site-header--fixed",
        og = {};
    it("slider", [
        {
            onLoad() {
                og[this.id] = new (class {
                    initSlider() {
                        const t = this.container.querySelectorAll(Xm).length,
                            i = parseInt(this.container.dataset.duration),
                            s = "true" === this.container.dataset.pageDots && t > 1,
                            o = "true" === this.container.dataset.navArrows && t > 1;
                        let n = "true" === this.container.dataset.autoplay;
                        if ((n && (n = i), t > 1))
                            (this.flkty = new e(this.container, {
                                fade: !0,
                                cellSelector: Xm,
                                autoPlay: n,
                                wrapAround: !0,
                                adaptiveHeight: !0,
                                setGallerySize: !0,
                                imagesLoaded: !0,
                                pageDots: s,
                                prevNextButtons: o,
                                on: {
                                    ready: () => {
                                        const t = this.container.querySelector(`${Xm}[${ig}="1"]`).getAttribute(Zm);
                                        this.container.setAttribute(tg, t), requestAnimationFrame(this.resizeEvent), document.addEventListener("theme:vars", this.resizeEvent);
                                    },
                                    change: (t) => {
                                        const e = this.flkty.selectedElement.getAttribute(Zm);
                                        this.container.setAttribute(tg, e),
                                            this.flkty.cells.forEach((e, i) => {
                                                e.element.querySelectorAll(Jm).forEach((e) => {
                                                    e.setAttribute(eg, i === t ? "0" : "-1");
                                                });
                                            });
                                    },
                                },
                            })),
                                te(this.container);
                        else if (1 === t) {
                            const t = this.container.querySelector(Xm).getAttribute(Zm);
                            this.container.setAttribute(tg, t);
                        }
                    }
                    bindScrollButton() {
                        const t = this.container.querySelector(Qm);
                        t &&
                            t.addEventListener("click", (t) => {
                                t.preventDefault();
                                const e = this.header.classList.contains(sg) ? 60 : 0,
                                    i = parseInt(Math.ceil(this.container.offsetTop + this.container.offsetHeight - e));
                                window.scrollTo({ top: i, left: 0, behavior: "smooth" });
                            });
                    }
                    onBlockSelect(t) {
                        const e = parseInt([...t.target.parentNode.children].indexOf(t.target));
                        null !== this.flkty && (this.flkty.select(e), this.flkty.pausePlayer());
                    }
                    onBlockDeselect(t) {
                        "true" === t.target.closest(Ym).dataset.autoplay && null !== this.flkty && this.flkty.playPlayer();
                    }
                    onReorder() {
                        null !== this.flkty && this.flkty.resize();
                    }
                    onUnload() {
                        null !== this.flkty && (document.removeEventListener("theme:vars", this.resizeEvent), this.flkty.destroy(), (this.flkty = null));
                    }
                    constructor(t) {
                        (this.container = t.container),
                            (this.header = document.querySelector(Gm)),
                            (this.flkty = null),
                            (this.resizeEvent = () => {
                                this.flkty.resize();
                            }),
                            this.initSlider(),
                            this.bindScrollButton();
                    }
                })(this);
            },
            onReorder(t) {
                og[this.id].onReorder(t);
            },
            onUnload(t) {
                og[this.id].onUnload(t);
            },
            onBlockSelect(t) {
                og[this.id].onBlockSelect(t);
            },
            onBlockDeselect(t) {
                og[this.id].onBlockDeselect(t);
            },
        },
        Jc,
        eh,
    ]),
        it("subcollections", hd),
        it("tab-collections", [Wa, hd, _e]);
    const ng = {},
        rg = "[data-slider]",
        ag = "[data-item]",
        lg = "flickity-enabled",
        cg = "data-section-id";
    it("testimonials", {
        onLoad() {
            ng[this.id] = new (class {
                initSlider() {
                    const t = this.slider.querySelectorAll(ag).length;
                    let i = this.slider.classList.contains(lg);
                    (2 == t && window.innerWidth >= theme.sizes.small) || 1 == t || window.innerWidth < theme.sizes.small
                        ? i && this.flkty.destroy()
                        : ((this.flkty = new e(this.slider, { cellSelector: ag, prevNextButtons: !0, pageDots: !1, groupCells: !0, cellAlign: "left", contain: !0, adaptiveHeight: !1 })),
                          this.flkty.resize(),
                          this.flkty.slideableWidth > this.flkty.size.width || this.flkty.destroy());
                }
                onBlockSelect(t) {
                    if (null !== this.flkty) {
                        const e = parseInt([...t.target.parentNode.children].indexOf(t.target)),
                            i = parseInt(this.flkty.slides[0].cells.length),
                            s = Math.floor(e / i);
                        this.flkty.select(s);
                    } else {
                        const e = this.slider.currentStyle || window.getComputedStyle(this.slider),
                            i = parseInt(e.paddingLeft),
                            s = t.target.offsetLeft - i;
                        this.slider.scrollTo({ top: 0, left: s, behavior: "smooth" });
                    }
                }
                onUnload() {
                    document.removeEventListener("theme:resize:width", this.sliderResizeEvent);
                }
                constructor(t) {
                    (this.container = t.container),
                        (this.sectionId = this.container.getAttribute(cg)),
                        (this.slider = this.container.querySelector(rg)),
                        (this.sliderResizeEvent = () => this.initSlider()),
                        (this.flkty = null),
                        this.initSlider(),
                        document.addEventListener("theme:resize:width", this.sliderResizeEvent);
                }
            })(this);
        },
        onUnload(t) {
            ng[this.id].onUnload(t);
        },
        onBlockSelect(t) {
            ng[this.id].onBlockSelect(t);
        },
    });
    const hg = "no-outline",
        dg = "[data-skip-content]",
        ug = 'a[href="#"]';
    document.documentElement.style.setProperty(
        "--scrollbar-width",
        `${(() => {
            const t = document.createElement("div");
            (t.style.visibility = "hidden"), (t.style.overflow = "scroll"), (t.style.msOverflowStyle = "scrollbar"), document.body.appendChild(t);
            const e = document.createElement("div");
            t.appendChild(e);
            const i = t.offsetWidth - e.offsetWidth;
            return t.parentNode.removeChild(t), i;
        })()}px`
    ),
        document.addEventListener("DOMContentLoaded", function () {
            st("*");
            "true" === document.body.dataset.animations && o.init({ once: !0, offset: 50, duration: 600, startEvent: "load" }),
                new (class {
                    init() {
                        (this.body = document.body),
                            (this.inPageLink = document.querySelector(dg)),
                            (this.linkesWithOnlyHash = document.querySelectorAll(ug)),
                            (this.isFocused = !1),
                            this.focusHash(),
                            this.bindInPageLinks(),
                            this.clickEvents(),
                            this.focusEvents(),
                            this.focusEventsOff();
                    }
                    clickEvents() {
                        this.inPageLink &&
                            this.inPageLink.addEventListener("click", (t) => {
                                t.preventDefault();
                            }),
                            this.linkesWithOnlyHash &&
                                this.linkesWithOnlyHash.forEach((t) => {
                                    t.addEventListener("click", (t) => {
                                        t.preventDefault();
                                    });
                                });
                    }
                    focusEvents() {
                        document.addEventListener("keyup", (t) => {
                            t.code === theme.keyboardKeys.TAB && (this.body.classList.remove(hg), (this.isFocused = !0));
                        });
                    }
                    focusEventsOff() {
                        document.addEventListener("mousedown", () => {
                            this.body.classList.add(hg), (this.isFocused = !1);
                        });
                    }
                    forceFocus(t, e) {
                        e = e || {};
                        var i = t.tabIndex;
                        (t.tabIndex = -1),
                            (t.dataset.tabIndex = i),
                            t.focus(),
                            void 0 !== e.className && t.classList.add(e.className),
                            t.addEventListener("blur", function s(o) {
                                o.target.removeEventListener(o.type, s), (t.tabIndex = i), delete t.dataset.tabIndex, void 0 !== e.className && t.classList.remove(e.className);
                            });
                    }
                    focusHash(t) {
                        t = t || {};
                        let e = window.location.hash;
                        void 0 !== theme.settings.newHash && ((e = theme.settings.newHash), (window.location.hash = `#${e}`));
                        const i = document.getElementById(e.slice(1));
                        if (i && t.ignore && i.matches(t.ignore)) return !1;
                        e && i && this.forceFocus(i, t);
                    }
                    bindInPageLinks(t) {
                        return (
                            (t = t || {}),
                            Array.prototype.slice.call(document.querySelectorAll('a[href^="#"]')).filter((e) => {
                                if ("#" === e.hash || "" === e.hash) return !1;
                                if (t.ignore && e.matches(t.ignore)) return !1;
                                if (((i = e.hash.substr(1)), null === document.getElementById(i))) return !1;
                                var i,
                                    s = document.querySelector(e.hash);
                                return (
                                    !!s &&
                                    (e.addEventListener("click", () => {
                                        this.forceFocus(s, t);
                                    }),
                                    !0)
                                );
                            })
                        );
                    }
                    constructor() {
                        this.init();
                    }
                })(),
                !customElements.get("product-grid-item-swatch") && window.theme.settings.enableColorSwatchesCollection && customElements.define("product-grid-item-swatch", Zs);
            "scrollBehavior" in document.documentElement.style || Dt({ url: theme.assets.smoothscroll });
        });
})(themeVendor.ScrollLock, themeVendor.Flickity, themeVendor.themeCurrency, themeVendor.ajaxinate, themeVendor.AOS);

setInterval(function () {
    var customsize = document.getElementsByName("options[Size]");
    for (i = 0; i < customsize.length; i++) {
        customsize[i].addEventListener("click", customfun, false);
    }
}, 100);

var customfun = function () {
    var dataval = this.value;
    if (dataval == "Custom Size") {
        document.getElementsByClassName("custom-line-item1")[0].style.display = "block";
    } else {
        document.getElementsByClassName("custom-line-item1")[0].style.display = "none";
    }
};


Shopify.formatMoney = function(cents, format){
        if (format == null || format == undefined){
          format = window.globalVariables.money_format || "${{ amount }}";
        }
        if (typeof cents == 'string') { cents = cents.replace('.',''); }
        var value = '';
        var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
        var formatString = (format || this.money_format);
        function defaultOption(opt, def) {
          
          return (typeof opt == 'undefined' ? def : opt);
        }
        function formatWithDelimiters(number, precision, thousands, decimal) {
          precision = defaultOption(precision, 2);
          thousands = defaultOption(thousands, ',');
          decimal   = defaultOption(decimal, '.');
          if (isNaN(number) || number == null) { return 0; }
          number = (number/100.0).toFixed(precision);
          var parts   = number.split('.'),
              dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
              cents   = parts[1] ? (decimal + parts[1]) : '';
          return dollars + cents;
        }
        switch(formatString.match(placeholderRegex)[1]) {
          case 'amount':
            value = formatWithDelimiters(cents, 2);
            break;
          case 'amount_no_decimals':
            value = formatWithDelimiters(cents, 0);
            break;
          case 'amount_with_comma_separator':
            value = formatWithDelimiters(cents, 2, '.', ',');
            break;
          case 'amount_no_decimals_with_comma_separator':
            value = formatWithDelimiters(cents, 0, '.', ',');
            break;
        }
        return formatString.replace(placeholderRegex, value);
    };