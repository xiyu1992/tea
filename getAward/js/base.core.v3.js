var tidSet = [1, 3, 4, 5, 11, 13, 23, 36, 119, 129];
"undefined" == typeof window.console && (window.console = {
    log: function() {}
});
Array.prototype.indexOf || (Array.prototype.indexOf = function(e, d) {
    var f = this.length >>> 0;
    d = Number(d) || 0;
    d = 0 > d ? Math.ceil(d) : Math.floor(d);
    for (0 > d && (d += f); d < f; d++) {
        if (d in this && this[d] === e) {
            return d
        }
    }
    return -1
}
);
if ("function" == typeof Object.defineProperty) {
    try {
        Object.defineProperty(Array.prototype, "shuffle", {
            enumerable: !1,
            writable: !0
        })
    } catch (error$$3) {}
    Array.prototype.shuffle = function() {
        for (var e, d, f = this.length; f; e = parseInt(Math.random() * f),
        d = this[--f],
        this[f] = this[e],
        this[e] = d) {}
        return this
    }
}
var array_shuffle = function(f) {
    for (var e, h, g = f.length; g; e = parseInt(Math.random() * g),
    h = f[--g],
    f[g] = f[e],
    f[e] = h) {}
    return f
}
  , utils = {
    uncurryThis: function(b) {
        return function() {
            return b.call.apply(b, arguments)
        }
    },
    curryThis: function(b) {
        return function() {
            var a = Array.prototype.slice.call(arguments);
            a.unshift(this);
            return b.apply(null , a)
        }
    },
    bindFn: function(e, d) {
        var f = Array.prototype.slice.call(arguments, 2);
        return function() {
            return e.apply(d, f.concat(Array.prototype.slice.call(arguments)))
        }
    },
    extend: function(f, e) {
        function h() {}
        for (var g in e) {
            e.hasOwnProperty(g) && (f[g] = e[g])
        }
        h.prototype = e.prototype;
        f.prototype = new h;
        f.prototype.constructor = f;
        f.__super__ = e.prototype;
        return f
    },
    mixin: function(g) {
        for (var f = Array.prototype.slice.call(arguments, 1), j = 0; j < f.length; j++) {
            var i = f[j], h;
            for (h in i) {
                g[h] || (g[h] = i[h])
            }
        }
    },
    distinctArray: function(h) {
        for (var g = [], l = {}, k = 0, j; k < h.length; k++) {
            j = h[k];
            var i = j + ":" + typeof j;
            l[i] || (g.push(j),
            l[i] = j)
        }
        return g
    },
    browser: {
        version: function() {
            var b = navigator.userAgent;
            return {
                trident: /Trident/i.test(b),
                presto: /Presto/i.test(b),
                webKit: /AppleWebKit/i.test(b),
                gecko: /Gecko/i.test(b) && !/KHTML/i.test(b),
                mobile: /AppleWebKit.*Mobile.*/i.test(b),
                ios: /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(b),
                android: /Android/i.test(b) || /Linux/i.test(b),
                windowsphone: /Windows Phone/i.test(b),
                iPhone: /iPhone/i.test(b),
                iPad: /iPad/i.test(b),
                MicroMessenger: /MicroMessenger/i.test(b),
                webApp: !/Safari/i.test(b)
            }
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    },
    cookie: {
        get: function(f) {
            var e = "" + document.cookie
              , h = e.indexOf(f + "=");
            if (-1 == h || "" == f) {
                return ""
            }
            var g = e.indexOf(";", h);
            -1 == g && (g = e.length);
            return unescape(e.substring(h + f.length + 1, g))
        },
        set: function(f, e, h) {
            h = void 0 !== h ? h : 365;
            var g = new Date;
            g.setTime(g.getTime() + 86400000 * h);
            document.cookie = f + "=" + escape(e) + ";expires=" + g.toGMTString() + "; path=/; domain=.bilibili.com"
        },
        "delete": function(b) {
            this.set(b, "", -1)
        }
    },
    readFromLocal: function(b) {
        return this.localStorage._support ? localStorage.getItem(b) : this.cookie.get(b)
    },
    saveToLocal: function(e, d, f) {
        return this.localStorage._support ? localStorage.setItem(e, d) : this.cookie.set(e, d, f)
    },
    localStorage: {
        _support: window.localStorage && "object" == typeof window.localStorage ? !0 : !1,
        getItem: function(b) {
            return this._support ? window.localStorage.getItem(b) : null 
        },
        setItem: function(d, c) {
            this._support && window.localStorage.setItem(d, c)
        },
        removeItem: function(b) {
            this.getItem(b) && window.localStorage.removeItem(b)
        }
    },
    unhtml: function(d, c) {
        return d ? d.replace(c || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g, function(f, e) {
            return e ? f : {
                "<": "&lt;",
                "&": "&amp;",
                '"': "&quot;",
                ">": "&gt;",
                "'": "&#39;"
            }[f]
        }) : ""
    },
    html: function(b) {
        return b ? b.replace(/&((g|l|quo)t|amp|#39|nbsp);/g, function(c) {
            return {
                "&lt;": "<",
                "&amp;": "&",
                "&quot;": '"',
                "&gt;": ">",
                "&#39;": "'",
                "&nbsp;": " "
            }[c]
        }) : ""
    },
    HashManage: {
        prependHash: "!",
        _change: function(w, v) {
            var u = location.hash
              , t = {}
              , s = ""
              , r = 0;
            u && (u = u.substring(1),
            this.prependHash && (u = u.replace(RegExp("^" + this.prependHash.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")), "")));
            for (var u = u.split("&"), q = 0; q < u.length; q++) {
                var o = u[q].split("=")[0]
                  , j = u[q].split("=")[1];
                o && (t[o] = decodeURIComponent(j))
            }
            if ("object" == typeof w) {
                for (var n in w) {
                    (u = w[n]) ? t[n] = encodeURIComponent(u) : !1 === u && delete t[n]
                }
            } else {
                if (v) {
                    t[w] = encodeURIComponent(v)
                } else {
                    if (!1 === v) {
                        delete t[w]
                    } else {
                        return "undefined" == typeof w ? t : t[w] || null 
                    }
                }
            }
            for (var i in t) {
                s = 0 != r ? s + "&" : s + this.prependHash,
                s += i + "=" + t[i],
                r++
            }
            location.hash = s;
            return t
        },
        get: function(b) {
            return this._change(b, null )
        },
        set: function(d, c) {
            return this._change(d, c)
        },
        clear: function() {
            location.hash = ""
        }
    },
    getColor16: function(f) {
        function e(b) {
            b = parseInt(b).toString(16);
            return 1 == b.length ? "0" + b : b
        }
        function h(b) {
            for (var j = "#", i = 0; 3 > i; i++) {
                j += e(b[i])
            }
            return j
        }
        var g = ""
          , g = [];
        null  != f.match(/\((.*)\)/) ? (g = f.match(/\((.*)\)/)[1].split(","),
        g = h(g)) : null  != f.match(/,+/g) ? (g = f.split(","),
        g = h(g)) : g = e(f);
        return g
    },
    serializeParam: function(f) {
        var e = [], h;
        for (h in f) {
            if ("function" != (typeof f[h]).toLowerCase() && "object" != (typeof f[h]).toLowerCase()) {
                e.push(encodeURIComponent(h) + "=" + encodeURIComponent(f[h]))
            } else {
                if ($.isArray(f[h])) {
                    for (var g = 0; g < f[h].length; g++) {
                        e.push(encodeURIComponent(h) + "[]=" + encodeURIComponent(f[h][g]))
                    }
                }
            }
        }
        return e.join("&")
    },
    query2json: function(f) {
        if ($.isPlainObject(f)) {
            return f
        }
        if (void 0 === f) {
            return {}
        }
        f = f.split("&");
        for (var e = {}, h = 0; h < f.length; h++) {
            var g = f[h].split("=");
            e[g[0]] = g[1]
        }
        return e
    },
    hash2json: function() {
        return 1 < window.location.href.split("#").length ? this.query2json(window.location.href.split("#")[1].split("?")[0].replace(/#/, "")) : {}
    },
    query: {
        get: function(d) {
            var c = utils.query2json(this._getQuery());
            return d ? c[d] : c
        },
        set: function(g, f) {
            var j = utils.query2json(this._getQuery())
              , i = utils.hash2json();
            if ("object" == typeof g) {
                for (var h in g) {
                    this._set(j, h, g[h])
                }
            } else {
                this._set(j, g, f)
            }
            return utils.makeUrl("", j, i)
        },
        _set: function(e, d, f) {
            null  === f ? delete e[d] : e[d] = f;
            return e
        },
        _getQuery: function() {
            return void 0 !== window.location.search ? window.location.search.substring(1) : window.location.href.split("?")[1] ? window.location.href.split("?")[1].split("#")[0] : ""
        }
    },
    makeUrl: function(e, d, f) {
        d = this.serializeParam(d);
        f = this.serializeParam(f);
        e = d ? (e || location.pathname) + "?" + d : e || location.pathname;
        f && (e = e + "#" + f);
        return e
    },
    formatNum: function(h, g) {
        if (void 0 === h || "string" == typeof h && isNaN(parseInt(h))) {
            return "--"
        }
        var l = {
            "\u4e07": 10000
        };
        g = "string" == typeof g ? g : "\u4e07";
        l = l[g] || l["\u4e07"];
        if (!("string" == typeof h && 0 <= h.indexOf(g))) {
            if ("string" == typeof h && 0 <= h.indexOf(",")) {
                for (var k = h.split(","), j = "", i = 0; i < k.length; i++) {
                    j += k[i]
                }
                h = j
            }
            h = parseInt(h);
            h >= l && (h = (h / l).toFixed(1) + g);
            return h
        }
    },
    parseCardProps: function(g, f) {
        var j = {
            "data-gk": g.play,
            "data-sc": g.favorites,
            "data-pl": g.review,
            "data-dm": g.video_review,
            "data-up": g.author,
            "data-subtitle": g.subtitle,
            "data-lm": g.typename || "",
            "data-tg": g.create,
            "data-txt": g.description,
            "data-yb": g.coins
        }
          , i = "";
        if ("string" == f) {
            for (var h in j) {
                "" != i && (i += " "),
                i += h + '="' + j[h] + '"'
            }
            return i
        }
        return j
    },
    protocolRelative: function(b) {
        return /http:|https:/.test(b) ? b.replace(/http:|https:/, window.location.protocol) : $.browser.msie && 8 >= parseInt($.browser.version) ? window.location.protocol + b : b
    }
};
window.__GetCookie = utils.bindFn(utils.cookie.get, utils);
window.__SetCookie = utils.bindFn(utils.cookie.set, utils);
window.ChatGetSettings = utils.bindFn(utils.readFromLocal, utils);
window.ChatSaveSettings = utils.bindFn(utils.saveToLocal, utils);
window.htmlspecialchars = utils.bindFn(utils.unhtml, utils);
window.browser = utils.browser;
window.formatFriendlyNumber = utils.bindFn(utils.formatNum, utils);
var lastMessageBoxLayer = 20000;
function MessageBox(d) {
    this.params = {
        evType: "over",
        Overlap: !1,
        focusShowPos: "down",
        zIndex: null ,
        animation: "slide",
        position: null ,
        event: null ,
        bound: !0
    };
    "string" == typeof d && (d = {
        evType: d
    });
    if ("object" == typeof d) {
        for (var c in this.params) {
            d.hasOwnProperty(c) && (this.params[c] = d[c])
        }
    }
}
MessageBox.prototype = {
    timer: null ,
    msgbox: null ,
    bindobj: null ,
    incomingTimer: null ,
    position: {},
    reverseMap: {
        up: "down",
        down: "up",
        left: "right",
        right: "left"
    },
    show: function(j, i, q, p, o) {
        j = $(j);
        if (!1 != this.params.Overlap || "yes" != j.attr("hasMessageBox")) {
            j.attr("hasMessageBox", "yes");
            "undefined" == typeof q && (q = 1000);
            "undefined" == typeof p && (p = "msg");
            "button" == q && (o = p,
            p = q,
            q = 1000);
            var n = q;
            0 == q && (n = 50);
            var l = p;
            "button" == p && (l = "question");
            var k = this;
            k.leftTimer = function() {
                "button" != p && (clearTimeout(k.timer),
                k.timer = setTimeout(function() {
                    clearTimeout(k.timer);
                    k.close(k)
                }, n))
            }
            ;
            k.incomingTimer = function() {
                clearTimeout(k.timer)
            }
            ;
            this.bindobj = j;
            this.msgbox = $('<div class="m_layer"><div class="bg"><div class="content"><div class="mini"><b class="' + l + '"></b>' + i + ("button" == p ? '<div class="btnbox"><a class="b-btn ok">\u786e\u8ba4</a><a class="b-btn-cancel cancel">\u53d6\u6d88</a></div>' : "") + "</div></div></div></div>").prependTo("body");
            "over" == this.params.evType ? (j.bind("mouseleave", k.leftTimer),
            j.bind("mouseenter", k.incomingTimer),
            this.msgbox.bind("mouseenter", function() {
                clearTimeout(k.timer)
            }),
            this.msgbox.bind("mouseleave", k.leftTimer)) : j.bind("blur", k.leftTimer);
            this.setPos();
            this.msgbox.css("z-index", k.params.zIndex || lastMessageBoxLayer++);
            this.msgbox.hide();
            "button" == p && (this.msgbox.find(".ok").click(function() {
                "undefined" != typeof o && !1 == o(k) || k.close()
            }),
            this.msgbox.find(".cancel").click(function() {
                k.close()
            }));
            0 != q && k.leftTimer();
            "fade" != this.params.animation ? this.msgbox.slideDown(200) : this.moveIn(this.params.focusShowPos);
            return this.msgbox
        }
    },
    close: function() {
        var b = this;
        this.bindobj.attr("hasMessageBox", "");
        "fade" != this.params.animation ? this.msgbox.slideUp(200) : this.msgbox.fadeOut(200);
        setTimeout(function() {
            b.msgbox.remove();
            "over" == b.params.evType && b.bindobj.off("mouseenter", b.incomingTimer);
            b.bindobj.off("over" == b.params.evType ? "mouseleave" : "blur", b.leftTimer)
        }, 200)
    },
    moveIn: function(f) {
        var e = {
            opacity: 1
        }
          , h = 5
          , g = 5;
        switch (f) {
        case "up":
            e.top = "-=5";
            g = 0;
            break;
        case "down":
            e.top = "+=5";
            h = -h;
            g = 0;
            break;
        case "left":
            e.left = "-=5";
            h = 0;
            break;
        case "right":
            e.left = "+=5";
            g = -g;
            h = 0;
            break;
        default:
            e.top = "-=5",
            g = 0
        }
        this.msgbox.show().css({
            top: this.position.top + h,
            left: this.position.left + g,
            opacity: 0
        });
        this.msgbox.animate(e, 200)
    },
    setPos: function() {
        this.params.position ? (this.position = this.params.position,
        this.resetBound()) : this._pos(this.params.focusShowPos);
        this.msgbox.css("left", this.position.left + "px");
        this.msgbox.css("top", this.position.top + "px")
    },
    _pos: function(e, d) {
        var f = this.bindobj;
        this.params.focusShowPos = e;
        switch (e) {
        case "up":
            this.position.top = f.offset().top - this.msgbox.outerHeight();
            this.position.left = f.offset().left;
            break;
        case "down":
            this.position.top = f.offset().top + f.outerHeight();
            this.position.left = f.offset().left;
            break;
        case "left":
            this.position.top = f.offset().top;
            this.position.left = f.offset().left - this.msgbox.outerWidth();
            break;
        case "right":
            this.position.top = f.offset().top,
            this.position.left = f.offset().left + f.outerWidth()
        }
        if (!this.checkBound(e)) {
            if (!0 !== d) {
                return this._pos(this.reverseMap[e], !0)
            }
            this.setBound("down");
            this.setBound("left");
            this.position.top -= 10;
            this.position.left += 10
        }
        this.resetBound();
        return this.position
    },
    resetBound: function(e) {
        if (this.params.bound || !0 === e) {
            e = ["up", "down", "left", "right"];
            for (var d = 0; d < e.length; d++) {
                var f = e[d];
                this.checkBound(f) || this.setBound(f)
            }
        }
    },
    checkBound: function(b) {
        switch (b) {
        case "up":
            return this.position.top >= $(window).scrollTop();
        case "down":
            return this.position.top + this.msgbox.outerHeight() <= $(window).height() + $(window).scrollTop();
        case "left":
            return this.position.left >= $(window).scrollLeft();
        case "right":
            return this.position.left + this.msgbox.outerWidth() <= $(window).width() + $(window).scrollLeft();
        default:
            return !0
        }
    },
    setBound: function(b) {
        switch (b) {
        case "up":
            this.position.top = $(window).scrollTop();
            break;
        case "down":
            this.position.top = $(window).height() + $(window).scrollTop() - this.msgbox.outerHeight();
            break;
        case "left":
            this.position.left = $(window).scrollLeft();
            break;
        case "right":
            this.position.left = $(window).width() + $(window).scrollLeft() - this.msgbox.outerWidth()
        }
    }
};
function pagelist(w, v, u, t, s, r, q, o) {
    q = q ? q : 3;
    v = parseInt(v);
    u = parseInt(u);
    t = parseInt(t);
    if (1 >= u && 0 < t || 0 == t) {
        return !1
    }
    var j, n = 2 * q + 1;
    v >= n ? (j = v - q,
    n = v + q) : j = 1;
    n > u && (n = u);
    $(w).empty();
    null  != r ? $('<span class="result">\u5171 ' + u + " \u9875/ " + t + " \u4e2a" + r + " </span>").appendTo(w) : $('<span class="result">\u5171 ' + u + " \u9875 </span>").appendTo(w);
    1 != v && ($('<a class="b-btn indexPage" href="javascript:;" page="1">\u9996\u9875 </a>').appendTo(w).click(function() {
        s($(this).attr("page"))
    }),
    $('<a class="b-btn prevPage" href="javascript:;" page="' + (v - 1) + '">\u4e0a\u9875 </a>').appendTo(w).click(function() {
        s($(this).attr("page"))
    }));
    for (; j <= n; j++) {
        j == v ? $("<strong>" + j + "</strong>").appendTo(w) : $('<a class="p" href="javascript:;" page="' + j + '">' + j + "</a>").appendTo(w).click(function() {
            s($(this).attr("page"))
        })
    }
    v != u && 1 < u && $('<a class="b-btn nextPage" href="javascript:;" page="' + (v + 1) + '">\u4e0b\u9875</a>').appendTo(w).click(function() {
        s($(this).attr("page"))
    });
    v != u && 1 < u && $('<a class="b-btn endPage" href="javascript:;" page="' + u + '">\u672b\u9875</a>').appendTo(w).click(function() {
        s($(this).attr("page"))
    });
    if (!0 === o) {
        var i = $('<input type="text" class="custompage">').appendTo(w);
        $('<a class="button">\u786e\u5b9a</a>').appendTo(w).click(function() {
            var b = i.val();
            1 > b ? b = 1 : b > u && (b = u);
            s(b)
        })
    }
}
function pagelist_ul(i, h, o, n, l, k) {
    k = k ? k : 3;
    h = parseInt(h);
    o = parseInt(o);
    n = parseInt(n);
    if (1 >= o && 0 < n || 0 == n) {
        return !1
    }
    var j = 2 * k + 1;
    h >= j ? (n = h - k,
    j = h + k) : n = 1;
    j > o && (j = o);
    $(i).empty();
    for (1 != h && 1 != n ? $('<li page="1"><a class="indexPage" href="javascript:;">|&lt;</a></li>').appendTo(i).click(function() {
        l($(this).attr("page"))
    }) : 1 != h && $('<li page="1"><a class="indexPage" href="javascript:;">|&lt;</a></li>').appendTo(i).click(function() {
        l($(this).attr("page"))
    }); n <= j; n++) {
        n == h ? $('<li class="current">' + n + "</li>").appendTo(i) : $('<li page="' + n + '"><a href="javascript:;">' + n + "</a></li>").appendTo(i).click(function() {
            l($(this).attr("page"))
        })
    }
    h != o && 1 < o && $('<li page="' + o + '"><a class="endPage" href="javascript:;">&gt;|</a></li>').appendTo(i).click(function() {
        l($(this).attr("page"))
    })
}
window.bbFeedback = function() {
    function y(f, h, e) {
        f = "/feedback/arc-" + f + "-" + h + ".html?r=" + Math.random();
        if (f != j) {
            j = f;
            $(".comm > .loading").remove();
            $('<div class="loading"></div>').prependTo(".comm");
            var g = new Date;
            $.ajax(j, {
                success: function(b) {
                    var d = (new Date).getTime() - g.getTime();
                    500 > d ? setTimeout(function() {
                        $(".comm").html(b);
                        "undefined" != typeof e && e();
                        bindCardEvent()
                    }, 0 >= 300 - d ? 10 : 300 - d) : ($(".comm").html(b),
                    "undefined" != typeof e && e(),
                    bindCardEvent())
                }
            })
        }
    }
    function x(f, h, e) {
        f = "/feedback/topic-" + f + "-" + h + ".html?r=" + Math.random();
        if (f != j) {
            j = f;
            $(".comm > .loading").remove();
            $('<div class="loading"></div>').prependTo(".comm");
            var g = new Date;
            $.ajax(j, {
                success: function(b) {
                    var d = (new Date).getTime() - g.getTime();
                    500 > d ? setTimeout(function() {
                        $(".comm").html(b);
                        "undefined" != typeof e && e();
                        bindCardEvent()
                    }, 0 >= 300 - d ? 10 : 300 - d) : ($(".comm").html(b),
                    "undefined" != typeof e && e(),
                    bindCardEvent())
                }
            })
        }
    }
    function w(g, l, f, k) {
        var h = "";
        switch (f) {
        case "arc":
            h = "aid=" + l;
            break;
        case "news":
            h = "news_id=" + l;
            break;
        case "topic":
            h = "tp_id=" + l
        }
        $.ajax({
            type: "get",
            url: "http://interface.bilibili.com/feedback/agreement?mode=" + f + "&" + h + "&rid=" + k + "&callback=?",
            dataType: "jsonp",
            success: function(a) {
                "OK" != a ? (new MessageBox).show(g, a, 2000, "warning") : (a = $(g).children("b").html(),
                a = a.substr(2),
                a = a.substr(0, a.length - 1),
                $(g).children("b").html("(+" + (parseInt(a) + 1) + ")"),
                (new MessageBox).show(g, "\u8d5e\u540c\u6210\u529f", 500, "info"))
            },
            error: function() {
                (new MessageBox).show(g, "\u53d1\u9001\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u60a8\u7684\u7f51\u7edc\u6216\u53d1\u9001\u90ae\u4ef6\u81f3 orz#hdslb.com", 2000, "error")
            }
        });
        return !1
    }
    function v(h, p, g, n, l) {
        var k = "";
        switch (n) {
        case "arc":
            k = "aid=" + g;
            break;
        case "news":
            k = "news_id=" + g;
            break;
        case "topic":
            k = "tp_id=" + g
        }
        $.ajax({
            type: "get",
            url: "http://interface.bilibili.com/m/hideFeedback?" + k + "&drop=1&rid=" + l + "&callback=?",
            dataType: "jsonp",
            success: function(a) {
                "OK" != a ? (new MessageBox({
                    Overlap: !0,
                    position: p.position
                })).show(h, a, 2000, "warning") : ((new MessageBox({
                    Overlap: !0,
                    position: p.position
                })).show(h, "\u5220\u9664\u6210\u529f", 500, "info"),
                setTimeout(function() {
                    $(h).closest("li").slideUp(500)
                }, 500))
            },
            error: function() {
                (new MessageBox({
                    Overlap: !0,
                    position: p.position
                })).show(h, "\u53d1\u9001\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u60a8\u7684\u7f51\u7edc\u6216\u53d1\u9001\u90ae\u4ef6\u81f3 orz#hdslb.com", 2000, "error")
            }
        });
        return !1
    }
    function u(g, l, f, k) {
        "undefined" == g && (g = this);
        var h = "";
        switch (f) {
        case "arc":
            h = "aid=" + l;
            break;
        case "news":
            h = "news_id=" + l;
            break;
        case "topic":
            h = "tp_id=" + l
        }
        $.ajax({
            type: "get",
            url: "http://interface.bilibili.com/m/hideFeedback?" + h + "&rid=" + k + "&callback=?",
            dataType: "jsonp",
            success: function(a) {
                "OK" != a ? (new MessageBox).show(g, a, 2000, "warning") : ((new MessageBox).show(g, "\u9690\u85cf\u6210\u529f", 500, "info"),
                $(g).parent().find(".showfb").show(),
                $(g).hide())
            },
            error: function() {
                (new MessageBox).show(g, "\u53d1\u9001\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u60a8\u7684\u7f51\u7edc\u6216\u53d1\u9001\u90ae\u4ef6\u81f3 orz#hdslb.com", 2000, "error")
            }
        });
        return !1
    }
    function t(g, l, f, k) {
        "undefined" == g && (g = this);
        var h = "";
        switch (f) {
        case "arc":
            h = "aid=" + l;
            break;
        case "news":
            h = "news_id=" + l;
            break;
        case "topic":
            h = "tp_id=" + l
        }
        $.ajax({
            type: "get",
            url: "http://interface.bilibili.com/m/showFeedback?" + h + "&rid=" + k + "&callback=?",
            dataType: "jsonp",
            success: function(a) {
                "OK" != a ? (new MessageBox).show(g, a, 2000, "warning") : ((new MessageBox).show(g, "\u663e\u793a\u6210\u529f", 500, "info"),
                $(g).parent().find(".hidefb").show(),
                $(g).hide())
            },
            error: function() {
                (new MessageBox).show(g, "\u53d1\u9001\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u60a8\u7684\u7f51\u7edc\u6216\u53d1\u9001\u90ae\u4ef6\u81f3 orz#hdslb.com", 2000, "error")
            }
        });
        return !1
    }
    function s(E, C, D, B) {
        var A = new MessageBox
          , z = new MessageBox
          , p = A.show(E, '<h3 style="text-align:left; color: #333;font-size: 14px;">\u8bf7\u8f93\u5165\u4e3e\u62a5\u7406\u7531</h3><span class="b-btn-cancel-copy" style="color:#999;cursor:pointer;position:absolute;right:10px;top:8px;font-size:14px;font-family:Arial;">\u00d7</span><div class="reason-set"></div><textarea style="display:none;width:188px;border-radius:4px;border:1px solid #ccd0d7;height:58px;padding:5px;margin:5px 0;" name="message" placeholder="\u81ea\u5b9a\u4e49\u7406\u7531"></textarea>', "button", function() {
            var b = p.find('input[name="reason"]:checked').val()
              , d = p.find("textarea").val()
              , c = p.find(".b-btn.ok");
            if (c.hasClass("disabled")) {
                return !1
            }
            if (!b || "0" == b && !d) {
                return z.show(c, "\u8bf7\u5b8c\u5584\u4e3e\u62a5\u7406\u7531"),
                !1
            }
            z.msgbox && z.close();
            c.css({
                background: "#e5e9ef",
                color: "#b8c0cc"
            });
            $.ajax({
                url: "http://api.bilibili.com/x/reply/report?jsonp=jsonp",
                type: "post",
                data: {
                    oid: C,
                    type: "arc" == D ? 1 : 2,
                    rpid: B,
                    reason: b,
                    content: d
                },
                xhrFields: {
                    withCredentials: !0
                }
            }).done(function(e) {
                var f;
                0 == e.code ? (p.find(".mini").html('<span class="b-btn-cancel-copy" style="color:#999;cursor:pointer;position:absolute;right:10px;top:8px;font-size:14px;font-family:Arial;">\u00d7</span><div style="padding:61px 70px;width:60px;"><i style="margin:0 auto;background:transparent url(http://static.hdslb.com/images/v3images/done.png) no-repeat center;width:48px;height:48px;display:block;"></i><div style="text-align:center;font-size:13px;margin-top:15px;">\u4e3e\u62a5\u6210\u529f</div></div>'),
                p.find(".b-btn-cancel-copy").click(function() {
                    clearTimeout(f);
                    A.close()
                }),
                f = setTimeout(function() {
                    A.close()
                }, 3000)) : 12019 == e.code ? (new MessageBox).show(c, "\u4e3e\u62a5\u8fc7\u4e8e\u9891\u7e41\uff0c\u8bf7" + e.data.ttl + "\u79d2\u540e\u91cd\u8bd5") : (new MessageBox).show(c, "\u63d0\u4ea4\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5")
            }).fail(function() {
                (new MessageBox).show(c, "\u63d0\u4ea4\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5")
            }).complete(function() {
                c.css({
                    background: "",
                    color: ""
                })
            });
            return !1
        });
        if (p) {
            p.find("textarea").val("");
            E = "\u5e7f\u544a \u8272\u60c5 \u5237\u5c4f \u5f15\u6218 \u5267\u900f \u653f\u6cbb \u4eba\u8eab\u653b\u51fb \u89c6\u9891\u4e0d\u76f8\u5173 \u5176\u5b83".split(" ");
            for (var n = p.find(".reason-set").css({
                width: 200,
                "text-align": "left",
                "padding-top": "10px"
            }), l = 0; l < E.length; l++) {
                $('<label style="cursor:pointer;"><input style="vertical-align:middle; margin-top:2px; margin-right:5px;" type="radio" name="reason" value="' + (l + 1) % 9 + '"/><span style="vertical-align:middle;">' + E[l] + "</span></label>").css({
                    "vertical-align": "top",
                    width: "98px",
                    "line-height": "24px",
                    display: "inline-block"
                }).appendTo(n)
            }
            p.find('input[name="reason"]').change(function() {
                "0" == $(this).val() ? p.find("textarea").show().val("") : p.find("textarea").hide().val($(this).siblings("span").text())
            });
            p.find(".bg").css({
                padding: "0px"
            });
            p.css({
                "box-shadow": "rgba(0,0,0,0.16) 0px 2px 4px"
            });
            p.find(".question").hide();
            p.find(".b-btn-cancel").hide();
            p.find(".b-btn.ok").css({
                padding: "7px 46px",
                "font-size": "14px",
                margin: "5px 0",
                border: "none"
            });
            p.find(".b-btn-cancel-copy").click(function() {
                A.close()
            });
            return !1
        }
    }
    function r(g) {
        var l = Math.floor((new Date).getTime() / 1000)
          , f = new Date;
        f.setHours(0);
        f.setMinutes(0);
        f.setSeconds(0);
        f = Math.floor(f.getTime() / 1000);
        if (g > f && 0 <= l - g) {
            return 50 >= l - g ? (l = 10 * Math.floor((l - g) % 60 / 10),
            (10 < g ? l : 10) + "\u79d2\u524d") : 3600 > l - g ? Math.ceil((l - g) / 60) + "\u5206\u949f\u524d" : Math.ceil((l - g) / 3600) + "\u5c0f\u65f6\u524d"
        }
        l = new Date;
        l.setTime(1000 * g);
        g = l.getMonth() + 1;
        var f = l.getDate()
          , k = l.getHours()
          , h = l.getMinutes();
        10 > g && (g = "0" + g);
        10 > f && (f = "0" + f);
        10 > k && (k = "0" + k);
        10 > h && (h = "0" + h);
        return l.getFullYear() + "-" + g + "-" + f + " " + k + ":" + h
    }
    function o(g, l) {
        if (document.selection) {
            g.focus(),
            sel = document.selection.createRange(),
            sel.text = l,
            sel.select()
        } else {
            if (g.selectionStart || "0" == g.selectionStart) {
                var f = g.selectionStart
                  , k = g.selectionEnd
                  , h = g.scrollTop;
                g.value = g.value.substring(0, f) + l + g.value.substring(k, g.value.length);
                0 < h && (g.scrollTop = h);
                g.focus();
                g.selectionStart = f + l.length;
                g.selectionEnd = f + l.length
            } else {
                g.value += l,
                g.focus()
            }
        }
    }
    function q() {
        try {
            if (window.parent && window.parent.document) {
                var b = window.parent.document.getElementById("biliComment");
                b && (b.style.height = $("body").height() + "px")
            }
        } catch (d) {}
    }
    function i(e, f, d) {
        this.type = f ? f : "arc";
        this.target = $('<div class="bilibili-comment"></div>').hide().appendTo(e).addClass("pc");
        this.options = $.extend(!0, {
            allowFeed: !1,
            useIframe: !1,
            onLoad: null ,
            onReplyLoad: null ,
            onSubmit: null 
        }, d);
        this.platform = "pc";
        if (browser.version.mobile && !browser.version.iPad) {
            this.target.removeClass("pc").addClass("mobile"),
            this.platform = "mobile"
        } else {
            if (browser.version.iPad || browser.version.android) {
                this.target.removeClass("pc"),
                this.platform = "tablet"
            }
        }
        window.feedback_object = this;
        this.captcha = window.captcha_key;
        this.mids = [];
        this.hasFeedMids = [];
        this.floorObjs = {};
        $("<style>#dcmp_textarea_container .ui-autocomplete{ margin-top: 5px; margin-left: -10px; max-width: 150px; }</style>").appendTo("head");
        this.loginInfo = null ;
        this._rootQuoteID = this._quoteID = void 0;
        this.init()
    }
    var j = "";
    window.CallPlayerAction = function(a) {
        switch (a) {
        case 1:
            a = 1 <= $("#comment_container").length;
            if (0 == $("#review_comments_tips").length) {
                $('<div class="new_comm"><span id="review_comments_tips" tag="0"></span></div>').prependTo(a ? "#comment_container>ul" : ".comm > ul").on("click", function() {
                    window.feedback_object ? (window.feedback_object.orderby = "default",
                    window.feedback_object.show(window.feedback_object.id, 1)) : 0 < $("#fb_tp_id").length ? x($("#fb_tp_id").val(), 1) : 0 < $("#fb_aid").length ? y($("#fb_aid").val(), 1) : y($("#fb_news_id").val(), 1)
                })
            }
            num = parseInt($("#review_comments_tips").attr("tag")) + 1;
            $("#review_comments_tips").attr("tag", num);
            $("#review_comments_tips").html("<b>" + num + "</b> \u6761\u65b0\u8bc4\u8bba\uff0c\u70b9\u51fb\u67e5\u770b")
        }
    }
    ;
    i.prototype = {
        isAdmin: -1,
        orderby: "default",
        init: function() {
            var g = this
              , l = this.bindWindow = window
              , f = this.bindTarget = this.target;
            if (this.options.useIframe) {
                try {
                    if (window.parent && window.parent.document) {
                        var k = window.parent.document.getElementById("biliComment");
                        k && (l = this.bindWindow = window.parent,
                        f = this.bindTarget = k)
                    }
                } catch (h) {
                    throw h
                }
            }
            $(l.document).scroll(function() {
                var b = $(".comm_send", g.target)
                  , a = g.options.useIframe ? $(f).offset().top : 0;
                $(f).height() > $(l).height() && ($(f).offset().top + $(f).height() < $(l).scrollTop() + $(l).height() && b.offset().top + b.outerHeight() + a < $(l).scrollTop() ? b.appendTo(g.target).addClass("bottom") : $(f).offset().top >= $(l).scrollTop() && b.offset().top + a > $(l).scrollTop() + $(l).height() && b.prependTo(g.target).removeClass("bottom"))
            });
            onLoginInfoLoaded(function(a) {
                g.loginInfo = a;
                g.checkLogin($(".tg_send_post", g.target))
            }, !0)
        },
        checkLogin: function(b) {
            if (this.loginInfo && $(".tg_send_post", this.target).length) {
                var d = $("button[type=submit]", b).off("click.commentSubmitMsg");
                if (this.loginInfo.isLogin) {
                    if (this.loginInfo.level_info && 0 != this.loginInfo.level_info.current_level || parseInt(window.mid) == parseInt(window.uid)) {
                        return $("#comment_text", b).attr("placeholder", "\u5728\u8fd9\u91cc\u8f93\u5165\u8bc4\u8bba"),
                        $(".user_face").removeClass("no-face"),
                        $(".user_face img", b).attr("src", this.loginInfo.face).show(),
                        UserStatus.checkMoral() ? (d.removeClass("disabled"),
                        $(".jc-notice", b).remove()) : (d.addClass("disabled"),
                        $(".jc-help", b).length || $('<a class="jc-help" href="http://www.bilibili.com/html/help.html#j_4" target="_blank"><i class="b-tip jc"></i>\u5982\u4f55\u6062\u590d\u8282\u64cd\u503c\uff1f</a>').insertBefore(d),
                        $(".jc-notice").length || b.find(".ipt-txt").before('<div class="ipt-txt jc-notice">\u4f60\u7684\u8282\u64cd\u5df2\u4f4e\u4e8e60\uff0c\u5c06\u65e0\u6cd5\u53d1\u8868\u8bc4\u8bba\uff0c\u8be6\u60c5\u8bf7\u70b9\u51fb<a href="https://account.bilibili.com/site/record?type=moral" target="_blank">\u6211\u7684\u8282\u64cd\u8bb0\u5f55</a></div>')),
                        !0
                    }
                    $("#comment_text", b).attr("placeholder", "\u4f1a\u5458\u7b49\u7ea7\u4e0d\u8db3\uff0c\u65e0\u6cd5\u53d1\u8868\u8bc4\u8bba");
                    $(".user_face").removeClass("no-face");
                    $(".user_face img", b).attr("src", this.loginInfo.face).show();
                    d.on("click.commentSubmitMsg", function() {
                        (new MessageBox).show($(this), "\u4f1a\u5458\u7b49\u7ea7\u4e0d\u8db3\uff0c\u65e0\u6cd5\u53d1\u8868\u8bc4\u8bba", 1500, "warning");
                        return !1
                    });
                    return !1
                }
                $("#comment_text", b).attr("placeholder", "\u8bf7\u5148\u767b\u5f55");
                $(".user_face").addClass("no-face");
                $(".user_face img", b).hide();
                d.on("click.commentSubmitMsg", function() {
                    (new MessageBox).show($(this), '\u8bf7\u5148<a href="https://account.bilibili.com/login" target="_blank">\u767b\u5f55</a>', 1500, "warning")
                });
                return !1
            }
        },
        pushUser: function(b, d) {
            "undefined" == typeof this.floorObjs[b] && (this.floorObjs[b] = []);
            this.floorObjs[b].push(d);
            return 0 > this.mids.indexOf(b) && 0 > this.hasFeedMids.indexOf(b) ? (this.mids.push(b),
            !0) : !1
        },
        pushFeedUser: function(b) {
            return 0 > this.hasFeedMids.indexOf(b) ? (this.hasFeedMids.push(b),
            !0) : !1
        },
        checkFeed: function(b) {
            if (!0 === this.options.allowFeed) {
                var d = this;
                this.captcha || Captcha.set(function(c) {
                    d.captcha = c
                });
                $.ajax({
                    url: "http://prop.bilibili.com/api/electric/has.feed",
                    data: {
                        mids: this.mids.join(),
                        aid: b,
                        captcha: this.captcha
                    },
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: !0
                    },
                    success: function(a) {
                        if (a.code && -700 == a.code) {
                            Captcha.set(function(e) {
                                d.captcha = e;
                                d.checkFeed(b)
                            })
                        } else {
                            if (a.data && a.data.result) {
                                for (var f = 0; f < a.data.result.length; f++) {
                                    var c = a.data.result[f];
                                    c.feed_status && d.pushFeedUser(c.mid)
                                }
                            }
                            d.addFeedTag()
                        }
                    },
                    error: function() {}
                })
            }
        },
        addFeedTag: function() {
            for (var f = 0; f < this.hasFeedMids.length; f++) {
                for (var h = 0; h < this.floorObjs[this.hasFeedMids[f]].length; h++) {
                    var e = this.floorObjs[this.hasFeedMids[f]][h];
                    if (!(0 < e.find(".feedtag").length)) {
                        var g = $("<div>").addClass("feedtag");
                        0 < e.parents(".reply").length ? g.insertAfter(e.find(".name")) : e.find(".t").append(g);
                        e = $("#battery_ranking").find('[mid="' + this.hasFeedMids[f] + '"]');
                        0 < e.length && (e = parseInt(e.attr("rank")),
                        3 >= e && g.addClass("n n" + e))
                    }
                }
            }
        },
        initEmoji: function(f) {
            var h = 0
              , e = f.find(".ywz")
              , g = f.find(".biaoqing_box");
            e.click(function() {
                0 == h ? ($(this).addClass("open"),
                g.addClass("open"),
                h = 1) : ($(this).removeClass("open"),
                g.removeClass("open"),
                h = 0)
            });
            $("a", g).click(function() {
                o($(".ipt-txt", f).get(0), $(this).html());
                e.removeClass("open");
                g.removeClass("open");
                h = 0
            })
        },
        recordToObject: function(g, l) {
            function f(b) {
                return b.replace(/\n/g, "<br />").replace(k, '<a href="javascript:;" card="$1">@$1</a>').replace(h, '<a href="/video/av$1/" target="_blank" data-view="$1">av$1</a>')
            }
            var k = RegExp(/@([^\s:\uff1a@~!#$%^&*\(\)<]{2,15})/g)
              , h = RegExp(/av([0-9]+)/g);
            1 == l.ad_check ? ($('<a href="javascript:;">[\u6b64\u697c\u5c42\u5df2\u88ab\u7528\u6237\u9690\u85cf \u70b9\u51fb\u67e5\u770b]</a>').appendTo(g).click(function() {
                $(this).next().slideToggle(200)
            }),
            $('<div style="display:none" class="quote">' + f(l.msg) + "</div>").appendTo(g)) : 2 == l.ad_check ? window.uid == l.mid ? g.html(f(l.msg)) : $('<a href="javascript:;">[\u6b64\u697c\u5c42\u5df2\u88ab\u7ba1\u7406\u5458\u5220\u9664]</a>').appendTo(g) : 3 == l.ad_check ? $('<a href="javascript:;">[\u6b64\u697c\u5c42\u5df2\u88ab\u4e3e\u62a5\u5e76\u88ab\u7ba1\u7406\u5458\u5220\u9664]</a>').appendTo(g) : g.html(f(l.msg));
            bindPOCoins2(g.find("a"))
        },
        reply_render: function(e, c, g) {
            g = $('<li><a class="re_face" href="http://space.bilibili.com/' + e.mid + '" target="_blank" card="' + e.nick + '"><img src="' + e.face + '" /></a>                <div class="re_cnt">                   <div class="w"><a class="name" href="http://space.bilibili.com/' + e.mid + '" target="_blank" card="' + e.nick + '">' + e.nick + '</a><a href="http://www.bilibili.com/html/help.html#k_3" target="_blank" class="user-info-level l' + (e.level_info ? e.level_info.current_level : 0) + '"></a>: <span class="content"></span></div>                    <div class="info">                    \t<p>' + (0 <= this.isAdmin ? '      <a class="jubao">\u4e3e\u62a5</a>' : "") + "                            <span>" + e.create_at + "</span>" + (0 <= this.isAdmin ? '        <a class="zan" onclick="javascript:;"><b>(+' + e.good + ")</b></a>" : "") + (0 <= this.isAdmin ? '      <a class="re_ta" href="javascript:;;">\u56de\u590dTa</a>' : "") + "                        </p>                    </div>                </div>            </li>").attr("id", "l_id_" + e.fbid).appendTo(g);
            var f = this
              , d = g.find(".content");
            f.recordToObject(d, e);
            2 <= this.isAdmin && $('<a href="javascript:;" title="\u88ab\u79fb\u9664\u540e\uff0c\u5176\u4ed6\u7528\u6237\u4f1a\u9ed8\u8ba4\u4e0d\u663e\u793a\u8be5\u8bc4\u8bba" class="no hidefb">\u79fb\u9664\u8be5\u8bc4\u8bba</a>').prependTo(g.find(".info p")).click(function() {
                var a = this;
                (new MessageBox).show(this, "\u786e\u8ba4\u5220\u9664\u6b64\u5185\u5bb9?", "button", function(h) {
                    v(a, h, f.id, f.type, e.fbid)
                });
                return !1
            });
            if (1 <= f.isAdmin) {
                var d = $('<a href="javascript:;" title="\u88ab\u9690\u85cf\u540e\uff0c\u5176\u4ed6\u7528\u6237\u4f1a\u9ed8\u8ba4\u4e0d\u663e\u793a\u8be5\u8bc4\u8bba" class="no hidefb">' + (2 <= f.isAdmin ? "\u5220\u9664" : "\u9690\u85cf") + "\u8be5\u8bc4\u8bba</a>").prependTo(g.find(".info p")).click(function() {
                    u(this, f.id, f.type, e.fbid);
                    return !1
                })
                  , n = $('<a href="javascript:;" class="yes showfb">\u663e\u793a\u8be5\u8bc4\u8bba</a>').prependTo(g.find(".info p")).click(function() {
                    t(this, f.id, f.type, e.fbid);
                    return !1
                });
                0 == e.ad_check ? n.hide() : d.hide()
            }
            0 <= f.isAdmin && (g.find(".jubao").click(function() {
                return s(this, f.id, f.type, e.fbid)
            }),
            g.find(".zan").click(function() {
                return w(this, f.id, f.type, e.fbid)
            }));
            f.pushUser(e.mid, g);
            g.find(".re_ta").click(function() {
                f.re_send_show($(this).parents(".reply").find(".re_send"), $(this).parents(".re_cnt").find(".name").html(), e.fbid, c)
            });
            return g
        },
        loadReply: function(g, l, f, k) {
            "undefined" === typeof k && (k = 1);
            var h = this;
            $.ajax({
                dataType: "json",
                url: "http://api.bilibili.com/feedback?type=jsonp&ver=3&callback=?&mode=" + h.type + "&" + h.id_name + "=" + this.id + "&replyID=" + f + "&pagesize=10&page=" + k + "&sid=" + __GetCookie("sid"),
                success: function(b) {
                    $(l).empty();
                    $(g).empty().attr({
                        "data-page": k,
                        "data-results": b.results
                    });
                    pagelist(g, k, b.pages, b.results, function(c) {
                        h.loadReply(g, l, f, c)
                    }, "\u8bc4\u8bba", "mobile" == h.platform ? 1 : 2, !0);
                    for (var a = 0; a < b.list.length; a++) {
                        h.reply_render(b.list[a], f, l)
                    }
                    h.checkFeed(h.id);
                    "pc" == h.platform && bindCardEvent(l);
                    $(l).height() > $(window).height() ? $(document).scrollTop($(l).offset().top - 5) : $(document).scrollTop($(l).offset().top - ($(window).height() - $(l).height()) / 2);
                    h.options.useIframe && q();
                    h._trigger("onReplyLoad")
                }
            })
        },
        submitFeedback: function(k, A, h, z) {
            if ("\u8bf7\u5728\u8fd9\u91cc\u8f93\u5165\u60a8\u8981\u53d1\u8868\u7684\u8bc4\u8bba\u4fe1\u606f" == $("#comment_text", A).val()) {
                return $("#comment_text", A).focus(),
                !1
            }
            if (1000 < $("#comment_text", A).val().length || 4 > $("#comment_text", A).val().length) {
                return (new MessageBox).show(k, "\u8bc4\u8bba\u5b57\u6570\u5fc5\u987b\u57284\u52301000\u4e2a\u4e4b\u95f4\uff01", 3000, "error"),
                $("#comment_text", A).focus(),
                !1
            }
            var p = this, n, l;
            !1 !== h && (n = this._quoteID,
            l = this._rootQuoteID);
            h = {
                msg: $("#comment_text", A).val().replace(/%/g, "%25"),
                action: "send",
                quoteID: n,
                root_quoteID: l
            };
            "arc" == this.type ? h.aid = this.id : "topic" == this.type ? h.tp_id = this.id : h.news_id = this.id;
            0 < $("#fb_vcode", A).length && (h.vcode = $("#fb_vcode", A).val());
            $.ajax({
                url: "http://interface.bilibili.com/feedback/post?callback=?",
                type: "get",
                dataType: "jsonp",
                data: h,
                success: function(a) {
                    if ("OK" == a) {
                        $("#comment_text", A).val("");
                        (new MessageBox).show(k, "\u53d1\u9001\u6210\u529f", 2000);
                        1 != p.page || ("default" != p.orderby || n || "function" == typeof z) || setTimeout(function() {
                            p.show(p.id, 1)
                        }, 200);
                        if (n) {
                            a = A.parent();
                            var f = a.find(".re_ul")
                              , e = a.find(".pagelistbox")
                              , c = parseInt(e.attr("data-page"))
                              , d = parseInt(e.attr("data-results")) || f.children().length;
                            (a.find(".re_more").length || c) && c != Math.ceil(d / 10) || setTimeout(function() {
                                p.loadReply(e, f, l || n, Math.ceil((d + 1) / 10))
                            }, 200)
                        }
                        p._trigger("onSubmit")
                    } else {
                        (new MessageBox).show(k, a, 3000, "error")
                    }
                },
                error: function() {
                    (new MessageBox).show(k, "\u53d1\u9001\u5931\u8d25", 2000, "error")
                }
            })
        },
        re_send_show: function(k, A, h, z, p) {
            var n = this
              , l = k.parents(".reply");
            this.setQuoteID(h, z);
            0 == k.children().length ? ($(".reply", n.target).each(function(d, a) {
                a = $(a);
                "block" == a.css("display") && 0 == a.find(".re_ul").children().length && a[0] != k.parent()[0] ? a.hide() : a[0] == k.parent()[0] && a.show()
            }),
            $(".re_send", n.target).hide(),
            $(".re_send", n.target).children().remove(),
            l = $(".comm_send", n.target).html(),
            k.append(l),
            $("._qure .t", k).html(""),
            n.checkLogin(k),
            k.find(".ywz").removeClass("open"),
            k.find(".biaoqing_box").removeClass("open"),
            k.show(),
            this.initEmoji(k),
            k.find(".ipt-txt").val(""),
            null  != A && o($(".ipt-txt", k).get(0), "\u56de\u590d @" + A + " :")) : null  != A ? (k.show(),
            k.find(".ipt-txt").val(""),
            o($(".ipt-txt", k).get(0), "\u56de\u590d @" + A + " :")) : "" == k.find(".ipt-txt").val() || k.parent().hasClass("empty") ? (A = 0 == l.find(".re_ul").children().length ? !0 : !1,
            "none" != k.css("display") ? (k.hide(),
            A && l.hide()) : (k.show(),
            A && l.show())) : k.find(".ipt-txt").val("");
            $("button[type=submit]", k).off("click.submit").on("click.submit", function() {
                if (n.loginInfo.isLogin && UserStatus.checkMoral()) {
                    return n.submitFeedback(this, k, !0, p)
                }
            });
            k.find(".ipt-txt").focus()
        },
        show: function(e, c, d, f) {
            "undefined" === typeof c && (c = 1);
            "function" == typeof d && (f = d,
            d = null );
            this.page = c;
            this.id = e;
            var g = this
              , h = {
                page: c,
                mode: this.type,
                type: "jsonp",
                ver: 3
            }
              , k = "aid";
            switch (this.type) {
            case "topic":
                k = "tp_id";
                break;
            case "news":
                k = "news_id"
            }
            this.id_name = k;
            h[k] = e;
            this.orderby && (h.order = this.orderby);
            d && (h.jumpID = d);
            h.sid = __GetCookie("sid");
            this.tempComment = $(".comm_send #comment_text").val();
            $.ajax({
                dataType: "jsonp",
                url: "http://api.bilibili.com/feedback",
                data: h,
                success: function(E) {
                    var G = g.target.show();
                    G.parent().find("#load_comment").remove();
                    $(".common .b-head .results").html(E.results);
                    if (-503 === E.code) {
                        var K = $(G).css("position");
                        $(G).css("position", "relative");
                        $('<div style="opacity: 0.3;z-index: 1000;background-color: #ccc;width: 100%;height: 100%;display: block;position: absolute;"></div>').prependTo(G);
                        setTimeout(function() {
                            $(G).css("position", K);
                            g.show(e, c)
                        }, 2000)
                    } else {
                        if ("object" == typeof E.list) {
                            d && E.page && (g.page = c = E.page);
                            g.isAdmin = E.isAdmin;
                            $(G).empty();
                            if ("topic" != g.type) {
                                var I = $('<div class="c_order"><ul class="b-slt-tab"><li order="default"><a>\u9ed8\u8ba4\u6392\u5e8f</a></li><li order="good"><a>\u6309\u8d5e\u540c\u6570</a></li><li order="hot"><a>\u6309\u56de\u590d\u6570</a></li></ul></div>').appendTo(G);
                                $('li[order="' + g.orderby + '"]', I).addClass("on");
                                $("li", I).click(function() {
                                    var n = $(this);
                                    n.hasClass("on") || ($("li", I).removeClass("on"),
                                    n.addClass("on"),
                                    g.orderby = n.attr("order"),
                                    g.show(e, 1))
                                })
                            }
                            var l = $('<ul class="comm_list"></ul>').appendTo(G)
                              , H = $('<div class="pagelistbox"></div>').appendTo(G)
                              , F = $('<div class="pagelistbox top"></div>').insertBefore(l);
                            pagelist(H, c, E.pages, E.results, function(n) {
                                g.show(e, n);
                                g._scrollToTop()
                            }, "\u8bc4\u8bba", "mobile" == g.platform ? 1 : 4, !0);
                            pagelist(F, c, E.pages, E.results, function(n) {
                                g.show(e, n)
                            }, null , "mobile" == g.platform ? 1 : 2, !0);
                            0 == E.results && $('<div class="no_more">\u6ca1\u6709\u66f4\u591a\u4fe1\u606f</div>').appendTo(G);
                            for (var b in E.list) {
                                "object" == typeof E.list[b] && function(B) {
                                    var z = $('<li id="l_id_' + B.fbid + '"><a href="http://space.bilibili.com/' + B.mid + '" target="_blank" card="' + B.nick + '"><div class="facebox r' + B.rank + '"><img src="' + B.face + '" class="face"><div class="face_bg"><div class="sign-bg"></div></div></div></a><div class="t"><span class="lnum">#' + B.lv + '</span><a href="http://space.bilibili.com/' + B.mid + '" target="_blank" card="' + B.nick + '">' + B.nick + '</a><a href="http://www.bilibili.com/html/help.html#k_3" target="_blank" class="user-info-level l' + (B.level_info ? B.level_info.current_level : 0) + '"></a></div><div class="content"></div><div class="elinfo">' + r(B.create) + (B.device && "Web" != B.device ? '<a class="ico ' + B.device + '">' + ("WP" == B.device ? "Windows Phone" : B.device) + "</a>" : "") + '<i class="report"></i></div></li>').appendTo(l);
                                    g.pushUser(B.mid, z);
                                    var N = z.find(".content");
                                    g.recordToObject(N, B);
                                    null  != B.quote && (N = $('<div class="quote"><div class="t">#' + B.quote.lv + '<a href="http://space.bilibili.com/' + B.quote.mid + '" target="_blank" card="' + B.quote.nick + '">' + B.quote.nick + '</a></div><div class="content"></div></div>').prependTo(N).find(".content"),
                                    g.recordToObject(N, B.quote));
                                    if (null  != B.reply) {
                                        var p = $('<div class="reply"><ul class="re_ul"></ul><div class="re_box">\t<p class="j_re"><a class="re_send_s" href="javascript:;">\u53c2\u4e0e\u56de\u590d</a></p>' + (5 < B.reply_count ? '<p class="re_more"><span>\u8fd8\u6709<b> ' + (B.reply_count - 5) + ' </b>\u6761\u56de\u590d </span><a class="re_more_s">\u70b9\u51fb\u67e5\u770b</a></p>' : "") + '<div class="re_page">\t<div class="pagelistbox">\t</div></div></div><div class="re_send"></div></div>').appendTo(z);
                                        $(".re_send_s", p).click(function() {
                                            g.re_send_show($(this).parents(".reply").find(".re_send"), null , B.fbid)
                                        });
                                        for (var M = $(".re_ul", p), L = 1, N = 0; N < B.reply.length; N++) {
                                            g.reply_render(B.reply[N], B.fbid, M),
                                            d && (B.reply[N].fbid == d && E.rt_page) && (L = E.rt_page)
                                        }
                                        $(".re_more_s", p).click(function() {
                                            $(".re_more", p).remove();
                                            g.loadReply($(".pagelistbox", p), M, B.fbid, L)
                                        })
                                    }
                                    N = z.find(".report");
                                    2 <= g.isAdmin && $('<a href="javascript:;" title="\u88ab\u79fb\u9664\u540e\uff0c\u5176\u4ed6\u7528\u6237\u4f1a\u9ed8\u8ba4\u4e0d\u663e\u793a\u8be5\u8bc4\u8bba" class="no hidefb">\u79fb\u9664\u8be5\u8bc4\u8bba</a>').prependTo(N).click(function() {
                                        var n = this;
                                        (new MessageBox).show(this, "\u786e\u8ba4\u5220\u9664\u6b64\u5185\u5bb9?", "button", function(O) {
                                            v(n, O, e, g.type, B.fbid)
                                        });
                                        return !1
                                    });
                                    if (1 <= g.isAdmin) {
                                        var A = $('<a href="javascript:;" title="\u88ab\u9690\u85cf\u540e\uff0c\u5176\u4ed6\u7528\u6237\u4f1a\u9ed8\u8ba4\u4e0d\u663e\u793a\u8be5\u8bc4\u8bba" class="no hidefb">' + (2 <= g.isAdmin ? "\u5220\u9664" : "\u9690\u85cf") + "\u8be5\u8bc4\u8bba</a>").prependTo(N).click(function() {
                                            u(this, e, g.type, B.fbid);
                                            return !1
                                        })
                                          , D = $('<a href="javascript:;" class="yes showfb">\u663e\u793a\u8be5\u8bc4\u8bba</a>').prependTo(N).click(function() {
                                            t(this, e, g.type, B.fbid);
                                            return !1
                                        });
                                        0 == B.ad_check ? D.hide() : A.hide()
                                    }
                                    0 <= g.isAdmin && ($('<a class="jubao">\u4e3e\u62a5</a>').appendTo(N).click(function() {
                                        return s(this, g.id, g.type, B.fbid)
                                    }),
                                    $('<a href="javascript:;" class="zan"><b>(+' + B.good + ")</b></a>").appendTo(N).click(function() {
                                        return w(this, e, g.type, B.fbid)
                                    }));
                                    var C;
                                    $('<a href="javascript:;" class="huifu">\u56de\u590d</a>').appendTo(N).click(function() {
                                        0 == z.find(".reply").length ? (C = $('<div class="reply"><ul class="re_ul"></ul><div class="re_box"><p class="j_re"><a class="re_send_s" href="javascript:;">\u53c2\u4e0e\u56de\u590d</a></p><div class="re_page">\t<div class="pagelistbox"></div></div></div><div class="re_send"></div></div>').appendTo(z),
                                        $(".re_box", C).hide(),
                                        $(".re_send_s", C).click(function() {
                                            g.re_send_show(C.find(".re_send"), null , B.fbid)
                                        })) : C = z.find(".reply");
                                        C.find(".re_ul");
                                        g.re_send_show(C.find(".re_send"), null , B.fbid)
                                    })
                                }(E.list[b])
                            }
                            g.checkFeed(g.id);
                            var J = $('<div class="comm_send"></div>').prependTo(G);
                            if (-1 <= g.isAdmin) {
                                H = $('<div class="tg_send_post"><div class="dcmp_content"><div class="user_face"><img src="' + (g.loginInfo && g.loginInfo.isLogin ? window.biliLoginStatus.face.replace("_s", "") : "") + '"></div><div id="dcmp_textarea_container"><div class="dcmp_title"><small id="ajaxBackMsg">\u8bf7\u81ea\u89c9\u9075\u5b88\u4e92\u8054\u7f51\u76f8\u5173\u7684\u653f\u7b56\u6cd5\u89c4\uff0c\u4e25\u7981\u53d1\u5e03\u8272\u60c5\u3001\u66b4\u529b\u3001\u53cd\u52a8\u7684\u8a00\u8bba\u3002</small></div><textarea cols="80" name="msg" rows="5" id="comment_text"  placeholder="\u5728\u8fd9\u91cc\u8f93\u5165\u8bc4\u8bba" class="ipt-txt"></textarea><div class="dcmp_post"><div class="ywz-wrapper"><div class="biaoqing_box"><a>(\u2312\u25bd\u2312)</a><a>\uff08\uffe3\u25bd\uffe3\uff09</a><a>(=\u30fb\u03c9\u30fb=)</a><a>(\uff40\u30fb\u03c9\u30fb\u00b4)</a><a>(\u301c\uffe3\u25b3\uffe3)\u301c</a><a>(\uff65\u2200\uff65)</a><a>(\u00b0\u2200\u00b0)\uff89</a><a>(\uffe33\uffe3)</a><a>\u256e(\uffe3\u25bd\uffe3)\u256d</a><a>( \u00b4_\u309d\uff40)</a><a>\u2190_\u2190</a><a>\u2192_\u2192</a><a>(&lt;_&lt;)</a><a>(&gt;_&gt;)</a><a>(;\u00ac_\u00ac)</a><a>("\u2594\u25a1\u2594)/</a><a>(\uff9f\u0414\uff9f\u2261\uff9f\u0434\uff9f)!?</a><a>\u03a3(\uff9f\u0434\uff9f;)</a><a>\u03a3( \uffe3\u25a1\uffe3||)</a><a>(\u00b4\uff1b\u03c9\uff1b`)</a><a>\uff08/T\u0414T)/</a><a>(^\u30fb\u03c9\u30fb^ )</a><a>(\uff61\uff65\u03c9\uff65\uff61)</a><a>(\u25cf\uffe3(\uff74)\uffe3\u25cf)</a><a>\u03b5=\u03b5=(\u30ce\u2267\u2207\u2266)\u30ce</a><a>(\u00b4\uff65_\uff65`)</a><a>(-_-#)</a><a>\uff08\uffe3\u3078\uffe3\uff09</a><a>(\uffe3\u03b5(#\uffe3) \u03a3</a><a>\u30fd(`\u0414\u00b4)\uff89</a><a>(\u256f\u00b0\u53e3\u00b0)\u256f(\u2534\u2014\u2534</a><a>\uff08#-_-)\u252f\u2501\u252f</a><a>_(:3\u300d\u2220)_</a><a>(\u7b11)</a><a>(\u6c57)</a><a>(\u6ce3)</a><a>(\u82e6\u7b11)</a></div><a class="ywz"></a></div><div class="dcmp_userinfo"><div class="_qure"><div class="t"></div></div></div></div><div id="textarea_size_tester"></div></div></div></div>').appendTo(J);
                                g.tempComment && J.find("#comment_text").val(g.tempComment);
                                E.needCode && $('\u9a8c\u8bc1\u7801\ufe30<input type="text" id="fb_vcode" value="" size="6" /><img src="/captcha" onclick="this.src=\'/captcha?r=\'+Math.random()" />').appendTo(H.find(".dcmp_post .dcmp_userinfo"));
                                F = $('<button type="submit" class="pink b-btn">\u53d1\u8868\u8bc4\u8bba</button>').appendTo(H.find(".dcmp_post .dcmp_userinfo"));
                                g.checkLogin(H);
                                F.click(function() {
                                    g.loginInfo.isLogin && UserStatus.checkMoral() && g.submitFeedback(this, J, !1)
                                });
                                g.initEmoji(J);
                                var a = {
                                    source: function(n, p) {
                                        if (!(m = n.term.match(/@([^\s]+)$/))) {
                                            return !1
                                        }
                                        $.getJSON("http://interface.bilibili.com/m/friend_suggest?jsoncallback=?", {
                                            term: m[1].replace(/\u3000/g, ""),
                                            rnd: Math.random()
                                        }, p)
                                    },
                                    search: function() {
                                        if (!(m = this.value.match(/@([^\s]+)$/))) {
                                            return !1
                                        }
                                        var n = m[1];
                                        if (255 > n.charCodeAt(0) && 1 > n.length || 10 < n.length) {
                                            return !1
                                        }
                                    },
                                    focus: function() {
                                        return !1
                                    },
                                    select: function(n, p) {
                                        this.value = this.value.replace(/@([^\s]*)$/, "@" + p.item.value);
                                        return !1
                                    },
                                    appendTo: "#dcmp_textarea_container",
                                    position: {
                                        my: "left top",
                                        using: function() {
                                            $(this).css("top", $("#textarea_size_tester").outerHeight());
                                            $(this).css("left", $("#textarea_size_tester").outerWidth() % $("#dcmp_textarea_container").outerWidth())
                                        }
                                    }
                                };
                                0 < $(".ipt-txt", J).length && $(".ipt-txt", J).bind("keyup", function(n) {
                                    (m = this.value.match(/@([^\s]*)$/)) ? ($(".ipt-txt", J).autocomplete(a).data("autocomplete")._renderItem = function(p, z) {
                                        return $("<li></li>").data("item.autocomplete", z).append('<a style="text-align:left"><img src="' + z.face + '" style="border: none;height:20px;width: 20px;vertical-align: bottom;padding-right: 5px;}" />' + z.value + "</a>").appendTo(p)
                                    }
                                    ,
                                    $("#textarea_size_tester", J).get(0).innerText = this.value.substr(0, this.value.length - m[1].length)) : $(".ipt-txt", J).autocomplete("destroy")
                                })
                            } else {
                                $('<a style="cursor:help"><img src="http://static.hdslb.com/images/nologininfo.gif" /></a>').appendTo(J).click(function() {
                                    goTop();
                                    return !1
                                })
                            }
                            "pc" == g.platform && bindCardEvent(G);
                            "function" == typeof f && f(G);
                            g.options.useIframe && q();
                            g._trigger("onLoad")
                        }
                    }
                }
            })
        },
        setQuoteID: function(b, d) {
            this._quoteID = b || void 0;
            this._rootQuoteID = d || void 0
        },
        _scrollToTop: function() {
            $(this.bindWindow).scrollTop($(this.bindTarget).offset().top)
        },
        _trigger: function() {
            var b = Array.prototype.slice.call(arguments, 0)
              , d = b.shift();
            if (this.options[d]) {
                return this.options[d].apply(this, b)
            }
        }
    };
    return i
}();
function resetAttentionCache() {
    CacheManager.reset("AttentionList")
}
var CacheManager = {
    map: {
        biliLoginStatus: 1,
        AttentionList: 2,
        last_fav: 4,
        BangumiFavList: 5
    },
    register: function(d, c) {
        this.map[d] = c
    },
    reset: function(e) {
        if (this.getItem(e) && window.sessionStorage && window.sessionStorage.bili_login_status) {
            var d = this.map[e]
              , f = JSON.parse(window.sessionStorage.bili_login_status);
            f[d] = this.getItem(e);
            window.sessionStorage.bili_login_status = JSON.stringify(f)
        }
    },
    getItem: function(b) {
        return window[b]
    },
    removeItem: function(e, d) {
        if (this.getItem(e)) {
            var f = $.inArray(d, this.getItem(e));
            0 <= f && (this.getItem(e).splice(f, 1),
            this.reset(e))
        }
    },
    addItem: function(d, c) {
        this.getItem(d) && (this.getItem(d).unshift(c),
        this.reset(d))
    }
};
function attentionUser(e, d, f) {
    if (!UserStatus.isLogin(e)) {
        return !1
    }
    Bilibili.attentionUser(e, d, function(a) {
        0 == a.code ? (window.AttentionList.push(d),
        resetAttentionCache(),
        (new MessageBox).show(e, "\u5173\u6ce8\u6210\u529f!", 1000, "ok"),
        "undefined" != typeof f && f(a)) : (new MessageBox).show(e, a.msg, 2000, "warning")
    })
}
function unattentionUser(e, d, f) {
    if (!UserStatus.isLogin(e)) {
        return !1
    }
    Bilibili.delFriend(e, d, function(b) {
        if (0 == b.code) {
            var a = window.AttentionList.indexOf(d);
            -1 != a && (window.AttentionList.splice(a, 1),
            resetAttentionCache());
            (new MessageBox).show(e, "\u53d6\u6d88\u5173\u6ce8\u6210\u529f!", 1000, "ok");
            "undefined" != typeof f && f(b)
        } else {
            (new MessageBox).show(e, b.msg, 2000, "warning")
        }
    })
}
function showSpAdbtn(f, e, h) {
    var g;
    if ((e = void 0 !== e ? e : window.spid) || h) {
        "1" == f ? (g = $('<p class="b-btn w">\u5df2\u8ba2\u9605</p>').on("click", function() {
            void 0 !== h ? Subscribe.bangumi(this, h, !1, function() {
                showSpAdbtn("0", e, h)
            }) : Subscribe.sp(this, e, !1, function() {
                showSpAdbtn("0", e, h)
            })
        }),
        g.hover(function() {
            g.html("\u53d6\u6d88\u8ba2\u9605")
        }, function() {
            g.html("\u5df2\u8ba2\u9605")
        })) : g = $('<p class="b-btn dy">\u8ba2\u9605</p>').on("click", function() {
            void 0 !== h ? Subscribe.bangumi(this, h, !0, function() {
                showSpAdbtn("1", e, h)
            }) : Subscribe.sp(this, e, !0, function() {
                showSpAdbtn("1", e, h)
            })
        }),
        $("#sp_dingyue").empty().append(g)
    }
}
var Subscribe = {
    sp: function(f, e, h, g) {
        this._toggle("sp", f, e, h, g)
    },
    bangumi: function(f, e, h, g) {
        this._toggle("bangumi", f, e, h, g)
    },
    _toggle: function(h, g, l, k, j) {
        if (UserStatus.isLogin(g)) {
            var i = this;
            ("bangumi" == h ? $.get("/api_proxy?app=bangumi", {
                action: k ? "concern_season" : "unconcern_season",
                season_id: l
            }, function(b) {
                0 == b.code ? (k ? CacheManager.addItem("BangumiFavList", l.toString()) : CacheManager.removeItem("BangumiFavList", l.toString()),
                i._success(g, k, b, j)) : i._fail()
            }) : $.get("/spadmin", {
                action: k ? "attention" : "unfavourite",
                spid: l
            }, function(b) {
                "OK" == b ? (k ? CacheManager.addItem("AttentionList", -l) : CacheManager.removeItem("AttentionList", -l),
                i._success(g, k, b, j)) : i._fail()
            })).fail(function() {
                i._fail()
            })
        }
    },
    _success: function(f, e, h, g) {
        e ? (new MessageBox).show(f, "\u8ba2\u9605\u6210\u529f!", 1000) : (new MessageBox).show(f, "\u53d6\u6d88\u8ba2\u9605\u6210\u529f!", 1000);
        "undefined" != typeof g && g(h)
    },
    _fail: function() {
        (new MessageBox).show(btn, "\u8bf7\u6c42\u53d1\u751f\u9519\u8bef(\u00b4\u30fb\u03c9\u30fb\uff40)", 1500, "error")
    }
};
function postJSON(g) {
    new MessageBox;
    var f = g.callback || "_jsonpCallback_" + (new Date).getTime()
      , j = $('<iframe name="frm' + f + '" id="frm' + f + '" style="visibility:hidden; width:1px; height:1px"></iframe>').appendTo("body")
      , i = $('<form action="' + g.url + '" method="POST" target="frm' + f + '"></form>').appendTo("body");
    "undefined" == typeof g.data && (g.data = {});
    g.data[g.jsonpCallback || "callback"] = f;
    for (var h in g.data) {
        $('<input type="hidden" name="' + h + '" />').appendTo(i).val(g.data[h])
    }
    window[f] = function(a) {
        "function" == typeof g.success && g.success(a);
        j.remove();
        i.remove()
    }
    ;
    i.submit()
}
var Bilibili = {
    initCrossdomain: function() {
        window.location.href.match(/\.bilibili\.tv/) ? (Bilibili.interface_domain = "interface.bilibili.tv",
        document.domain = "bilibili.tv") : window.location.href.match(/\.bilibili\.com/) ? (Bilibili.interface_domain = "interface.bilibili.com",
        document.domain = "bilibili.com") : (Bilibili.interface_domain = "interface.bilibili.cn",
        document.domain = "bilibili.cn")
    },
    badlistUser: function(e, d, f) {
        Bilibili.initCrossdomain();
        "function" == typeof d ? (f = d,
        d = e,
        e = null ) : "undefined" == typeof d && (d = e,
        e = null );
        postJSON({
            url: "http://" + Bilibili.interface_domain + "/m/friend_manage.do",
            data: {
                act: "add_badlist",
                format: "json",
                uid: d
            },
            success: function(a) {
                "undefined" == typeof f ? 0 == a.code ? (new MessageBox).show(e, "\u9ed1\u540d\u5355\u6210\u529f!", 1000, "ok") : (new MessageBox).show(e, a.msg, 2000, "warning") : f(a)
            }
        })
    },
    attentionUser: function(e, d, f) {
        Bilibili.initCrossdomain();
        "function" == typeof d ? (f = d,
        d = e,
        e = null ) : "undefined" == typeof d && (d = e,
        e = null );
        postJSON({
            url: "http://" + Bilibili.interface_domain + "/m/friend_manage.do",
            data: {
                act: "add",
                attention: 1,
                format: "json",
                uid: d
            },
            success: function(a) {
                "undefined" == typeof f ? 0 == a.code ? (new MessageBox).show(e, "\u5173\u6ce8\u6210\u529f!", 1000, "ok") : (new MessageBox).show(e, a.msg, 2000, "warning") : f(a)
            }
        })
    },
    whisperUser: function(e, d, f) {
        Bilibili.initCrossdomain();
        "function" == typeof d ? (f = d,
        d = e,
        e = null ) : "undefined" == typeof d && (d = e,
        e = null );
        postJSON({
            url: "http://" + Bilibili.interface_domain + "/m/friend_manage.do",
            data: {
                act: "add",
                attention: 0,
                format: "json",
                uid: d
            },
            success: function(a) {
                "undefined" == typeof f ? 0 == a.code ? (new MessageBox).show(e, "\u5173\u6ce8\u6210\u529f!", 1000, "ok") : (new MessageBox).show(e, a.msg, 2000, "warning") : f(a)
            }
        })
    },
    delFriend: function(e, d, f) {
        Bilibili.initCrossdomain();
        "function" == typeof d ? (f = d,
        d = e,
        e = null ) : "undefined" == typeof d && (d = e,
        e = null );
        postJSON({
            url: "http://" + Bilibili.interface_domain + "/m/friend_manage.do",
            data: {
                act: "del",
                attention: 0,
                format: "json",
                uid: d
            },
            success: function(a) {
                "undefined" == typeof f ? 0 == a.code ? (new MessageBox).show(e, "\u5220\u9664\u6210\u529f!", 1000, "ok") : (new MessageBox).show(e, a.msg, 2000, "warning") : f(a)
            }
        })
    },
    delFans: function(e, d, f) {
        Bilibili.initCrossdomain();
        "function" == typeof d ? (f = d,
        d = e,
        e = null ) : "undefined" == typeof d && (d = e,
        e = null );
        postJSON({
            url: "http://" + Bilibili.interface_domain + "/m/friend_manage.do",
            data: {
                act: "delFans",
                attention: 0,
                format: "json",
                uid: d
            },
            success: function(a) {
                "undefined" == typeof f ? 0 == a.code ? (new MessageBox).show(e, "\u5220\u9664\u6210\u529f!", 1000, "ok") : (new MessageBox).show(e, a.msg, 2000, "warning") : f(a)
            }
        })
    }
};
function sendCommand(h, g, l, k, j) {
    var i = j || "\u547d\u4ee4\u6267\u884c\u6210\u529f";
    return (new MessageBox).show(h, g, "button", function(a) {
        $.ajax({
            url: l,
            data: k,
            type: "POST",
            dataType: "html",
            success: function(b) {
                (new MessageBox).show(h, "OK" == b ? i : b, "OK" == b ? 500 : 2000, "OK" == b ? "info" : "warning")
            },
            error: function() {
                (new MessageBox({
                    Overlap: !0,
                    position: a.position
                })).show(h, "\u63d0\u4ea4\u5931\u8d25\uff0c\u53ef\u80fd\u6743\u9650\u4e0d\u8db3", 2000, "error")
            }
        })
    })
}
var UserCard = function() {
    function C() {
        "top" == o.attr("direction") ? (i.css("top", o.offset().top - i.outerHeight() + 40 + "px"),
        i.find("> .arrow").addClass("arrow_t")) : i.css("top", o.offset().top + o.outerHeight() / 2 - 20 + "px");
        o.offset().left + $(".a_layer").outerWidth() + o.width() + 5 > $(window).width() ? (i.css("left", o.offset().left - 5 - $(".a_layer").outerWidth() + "px"),
        i.find("> .arrow").removeClass("arrow_l"),
        i.find("> .arrow").addClass("arrow_r")) : i.css("left", o.offset().left + o.width() + 5 + "px");
        i.mouseenter(function() {
            clearTimeout(s)
        });
        i.mouseleave(u)
    }
    function B(a) {
        clearTimeout(j);
        D && ($(".a_layer").remove(),
        i = $('<div class="a_layer"><div class="content"><div class="bg_top"></div><div class="msg">' + a + '</div></div><div class="arrow arrow_l"></div></div>').appendTo("body"),
        C())
    }
    function A(a) {
        clearTimeout(j);
        D && "undefined" == typeof a.mid ? B("\u62b1\u6b49\uff0c\u8be5\u6635\u79f0\u76ee\u524d\u4e0d\u5b58\u5728\u54e6(*^__^*)") : D ? (E[a.name] = a,
        $(".a_layer").remove(),
        i = $('<div class="a_layer"><div class="content"><div class="bg_top"></div><div class="wrp"><div class="card"><a href="http://space.bilibili.com/' + a.mid + '" target="_blank"><img src="' + a.face + '" class="face"></a><div class="info"><div class="t"><a href="http://space.bilibili.com/' + a.mid + '" target="_blank">' + a.name + '</a><a href="http://www.bilibili.com/html/help.html#k_4" target="_blank" class="user-info-level border l' + a.level_info.current_level + '"></a>' + (a.approve ? '<a href="http://www.bilibili.com/html/certified.html" target="_blank" title="\u54d4\u54e9\u54d4\u54e9\u8ba4\u8bc1" class="verified"></a>' : "") + '</div><div class="address"><i class="small_icon ' + ("\u7537" == a.sex ? "male" : "\u5973" == a.sex ? "female" : "") + '" title="' + a.sex + '" ></i><span> ' + (a.place ? a.place : "\u672a\u77e5") + '</span><a href="http://message.bilibili.com/#whisper/mid' + a.mid + '" target="_blank">\u7535\u6ce2</a></div></div><div class="W_addbtn_even"></div></div><div class="cardinfo">' + (a.approve ? '<div class="approve">\u8ba4\u8bc1\u8d44\u6599</div>' : "") + a.description + '</div><ul class="userdata"><li><p class="t"><a href="http://space.bilibili.com/' + a.mid + '/follow.html" target="_blank">\u5173\u6ce8</a></p><p class="num"><a href="http://space.bilibili.com/' + a.mid + '/follow.html" target="_blank">' + a.attention + '</a></p></li><li class="mid"><p class="t"><a href="http://space.bilibili.com/' + a.mid + '/fans.html" target="_blank">\u7c89\u4e1d</a></p><p class="num"><a href="http://space.bilibili.com/' + a.mid + '/fans.html" target="_blank">' + a.fans + '</a></p></li><li><p class="t"><a href="http://space.bilibili.com/' + a.mid + '" target="_blank">\u6295\u7a3f</a></p><p class="num"><a href="http://space.bilibili.com/' + a.mid + '" target="_blank">' + a.article + '</a></p></li></ul></div></div><div class="arrow arrow_l"></div></div>').appendTo("body"),
        i.find(".W_addbtn_even").append(z(a)),
        C()) : E[a.name] = a
    }
    function z(h) {
        var p = !1, d = !1, n, l = function() {
            i.find(".W_addbtn_even").html(z(h))
        }
        ;
        if ("undefined" != typeof window.AttentionList && "null" != typeof window.AttentionList) {
            for (var k = 0; k < window.AttentionList.length; k++) {
                if (window.AttentionList[k] == h.mid) {
                    d = !0;
                    break
                }
            }
        }
        if ("undefined" != typeof h.attentions && "null" != typeof h.attentions) {
            for (k = 0; k < h.attentions.length; k++) {
                if (h.attentions[k] == window.uid) {
                    p = !0;
                    break
                }
            }
        }
        d && p ? (n = $('<i class="icon_add addbtn_b" title="\u52a0\u5173\u6ce8"></i>\u4e92\u76f8\u5173\u6ce8<span class="line">|</span><a href="javascript:;">\u53d6\u6d88</a>'),
        n.filter("a").on("click", function() {
            unattentionUser(this, h.mid, l)
        })) : d ? p || (n = $('<i class="icon_add addbtn_c" title="\u5df2\u5173\u6ce8"></i>\u5df2\u5173\u6ce8<span class="line">|</span><a href="javascript:;">\u53d6\u6d88</a>'),
        n.filter("a").on("click", function() {
            unattentionUser(this, h.mid, l)
        })) : (n = $('<a href="javascript:;"><i class="icon_add addbtn_a" title="\u52a0\u5173\u6ce8"></i>\u5173\u6ce8</a>'),
        n.filter("a").on("click", function() {
            attentionUser(this, h.mid, l)
        }));
        return n
    }
    function y() {
        clearTimeout(j);
        B('<span class="loading">\u52a0\u8f7d\u5931\u8d25</span>')
    }
    function x(b, c) {
        o = $(b);
        clearTimeout(j);
        j = setTimeout(y, 5000);
        B('<span class="loading">\u6b63\u5728\u52a0\u8f7d\u4e2d,\u8bf7\u7a0d\u5019..</span>');
        E[c] ? A(E[c]) : $.getScript(utils.protocolRelative("//interface.bilibili.com/card/" + c + ".js")).fail(function() {
            y()
        })
    }
    function w(b, d) {
        clearTimeout(s);
        D = !0;
        s = setTimeout(function() {
            x(b, d)
        }, 300)
    }
    function u() {
        clearTimeout(s);
        D = !1;
        s = setTimeout(function() {
            $(".a_layer").remove()
        }, 100)
    }
    function q(b) {
        "undefined" != typeof b ? $(b).find("a[card]").mouseenter(function() {
            w(this, $(this).attr("card"))
        }).mouseleave(u) : $("a[card]").mouseenter(function() {
            w(this, $(this).attr("card"))
        }).mouseleave(u)
    }
    var s = null , j = null , o = null , i, E = {}, D = !1;
    window.ShowCard = A;
    window.bindCardEvent = q;
    return {
        show: A,
        bind: q
    }
}();
function bindPOCoins2(A, z) {
    function y(b, d) {
        void 0 === b.attr(d) && (d = v + d);
        return b.attr(d)
    }
    var x;
    if ("undefined" === typeof z || !1 !== z) {
        for (var w = 0; w < A.length; w++) {
            x = parseInt($(A[w]).attr("yb")),
            200 <= x && 300 > x && $(A[w]).addClass("m200"),
            300 <= x && $(A[w]).addClass("m300")
        }
    }
    var v = "data-";
    $.browser.msie && A.addClass("snti");
    var u = 0, t, q, s = function(f, h) {
        var e = f.offset().left
          , g = f.offset().top - h.outerHeight() - 5;
        e > $(window).width() - h.outerWidth() && (e = $(window).width() - h.outerWidth());
        h.css({
            left: e,
            top: g
        })
    }
    , j = function(f, h) {
        $("#video_preview_pic").remove();
        var e = $('<div class="v-preview-pic" id="video_preview_pic"></div>').appendTo("body").hide()
          , g = $("<img />").appendTo(e);
        g.on("load", function() {
            s(f, e);
            e.fadeIn(300)
        });
        g.attr("src", h);
        clearTimeout(t)
    }
    , o = function() {
        u = 0;
        clearInterval(t);
        q = setTimeout(function() {
            u || (clearTimeout(q),
            $(".ov-box, #video_preview_pic").remove())
        }, 100)
    }
    , i = function() {
        var b = $(this);
        u = 1;
        t = setTimeout(function() {
            if (b.attr("data-view") && "loaded" != b.attr("data-view")) {
                j(b, "/widget/ajaxGetVideoInfo?aid=" + b.attr("data-view"))
            } else {
                if (1 == u) {
                    $(".ov-box").remove();
                    var a = $('<div class="ov-box" style="display: none;"><div class="ov"><div class="title"></div><div class="subtitle"></div><div class="info"><i class="gk">' + formatFriendlyNumber(y(b, "gk")) + '</i><i class="sc">' + formatFriendlyNumber(y(b, "sc")) + '</i><i class="pl">' + formatFriendlyNumber(y(b, "pl")) + '</i><i class="pts">' + y(b, "yb") + '</i></div><img src=""><p class="txt"></p><p class="lm"></p><p class="tg-date"></p></div></div>').prependTo("body");
                    s(b, a);
                    a.find(".ov > .txt").html(y(b, "txt"));
                    a.find(".ov > .title").html(y(b, "title") || b.find(".t").html());
                    a.find(".ov > .subtitle").html(y(b, "subtitle"));
                    a.find(".ov > .tg-date").html(y(b, "tg"));
                    a.find(".ov > .lm").html(y(b, "up"));
                    a.find(".ov > img").attr("src", y(b, "pic") || b.find("img").attr("src"));
                    a.fadeIn(300);
                    clearTimeout(t)
                }
            }
        }, 500)
    }
    ;
    A.each(function(e, c) {
        var f = $(c);
        (y(f, "gk") || f.attr("data-view")) && f.hover(i, o)
    })
}
window.loginCallbacks = [];
function onLoginInfoLoaded(d, c) {
    "undefined" != typeof window.biliLoginStatus ? (d(window.biliLoginStatus),
    !0 === c && window.loginCallbacks.push(d)) : window.loginCallbacks.push(d)
}
var UserStatus = function() {
    return {
        callbacks: window.loginCallbacks,
        status: function() {
            return window.biliLoginStatus
        },
        isLogin: function(b) {
            if (this.status() && this.status().isLogin) {
                return !0
            }
            this.status() && "undefined" != typeof b && (new MessageBox).show(b, '\u8bf7\u5148<a href="https://account.bilibili.com/login" target="_blank">\u767b\u5f55</a>', 1500, "warning");
            return !1
        },
        checkMoral: function() {
            return null  != this.status().moral && 60 > this.status().moral ? !1 : !0
        },
        level: function() {
            return this.status().level_info ? this.status().level_info.current_level : null 
        },
        onLoaded: window.onLoginInfoLoaded
    }
}();
function loadLoginInfo(f, e) {
    window.biliLoginStatus = f;
    try {
        if (!e && window.sessionStorage) {
            var h = [(new Date).getTime() + 120000];
            h.push(f);
            h.push(window.AttentionList);
            h.push(window.uid);
            h.push(window.last_fav);
            h.push(window.BangumiFavList);
            window.sessionStorage.bili_login_status = JSON.stringify(h)
        }
    } catch (g) {}
    for (h = 0; h < loginCallbacks.length; h++) {
        loginCallbacks[h](f)
    }
}
function onLoginNavigator(e) {
    if ($(".z_top").length) {
        if (e.isLogin) {
            var d = 0, f;
            for (f in e.dynamic) {
                d += parseInt(e.dynamic[f])
            }
            e.dynTotalNum = d;
            !$("#i_menu_community_msg_btn").length && $("#i_menu_msg_btn").length && $('<li id="i_menu_community_msg_btn" guest="no" i_menu="community_msg" class="u-i">\t\t\t\t<a class="i-link" href="http://message.bilibili.com" target="_blank">\u6d88\u606f</a>\t\t\t</li>').insertAfter("#i_menu_profile_btn");
            $('li[guest="no"]').show();
            $('li[guest="yes"]').hide();
            $(".i_face").attr("src", e.face.replace("_s", "_m"));
            f = $("#i_menu_profile");
            $(".uname", f).html("<b>" + e.uname + "</b>");
            $(".uname", f).append('<a href="http://www.bilibili.com/html/help.html#k_1" target="_blank" class="user-info-level l' + (e.level_info ? e.level_info.current_level : 0) + '"></a>');
            $(".coin", f).html('<b class="b-icon"></b>' + e.money);
            profileWnd(e);
            f = $("#dynamic_num_total");
            0 < d && f.html(d).show();
            d && $("#dynamic_num").html(d).show();
            e.dynamic && parseInt(e.dynamic.r);
            initDynWnd(e);
            initMiniWnd(!0);
            initDrawyooDyn(e);
            initLiveDyn();
            RequireModule.registerScript("messageModule", "message/message.v1.min.js");
            RequireModule.getScript("messageModule", function() {
                messageModule.load()
            })
        } else {
            $('li[guest="no"]').hide(),
            $('li[guest="yes"]').show()
        }
    }
}
onLoginInfoLoaded(onLoginNavigator);
function loadLoginStatus(f) {
    var e, h = function() {
        $('<script type="text/javascript" src="' + utils.protocolRelative("//interface.bilibili.com/nav.js") + '">\x3c/script>').appendTo("body")
    }
    ;
    try {
        window.sessionStorage && (e = window.sessionStorage.bili_login_status) && (e = JSON.parse(e)) && (new Date).getTime() < e[0] && (!__GetCookie("DedeUserID") && void 0 === e[3] || parseInt(__GetCookie("DedeUserID")) == e[3]) && !0 !== f ? (window.AttentionList = e[2],
        window.uid = e[3],
        window.last_fav = e[4],
        window.BangumiFavList = e[5],
        loadLoginInfo(e[1], !0)) : h()
    } catch (g) {
        h()
    }
}
function getLoginStatusCache() {
    return window.sessionStorage && window.sessionStorage.bili_login_status ? JSON.parse(window.sessionStorage.bili_login_status) : null 
}
function setLoginStatusCache(b) {
    b && (window.sessionStorage && window.sessionStorage.bili_login_status) && (window.sessionStorage.bili_login_status = JSON.stringify(b))
}
$.fn.smoothScroll = function(e, d) {
    var f = this;
    this.step = e ? e.step || 100 : 100;
    this.f = e ? e.f || 0.1 : 0.1;
    this.interval = 10;
    this.intervalID = null ;
    this.isFF = 0 <= navigator.userAgent.toLowerCase().indexOf("firefox");
    this.upOrDown = "";
    this.init = function(b) {
        var g = this;
        g.isFF ? b.addEventListener("DOMMouseScroll", function(a) {
            g.upOrDown = 0 > a.detail ? "up" : "down";
            g.scrollHandler(b);
            a.preventDefault()
        }, !1) : b.onmousewheel = function(a) {
            a = a || window.event;
            g.upOrDown = 0 < a.wheelDelta ? "up" : "down";
            g.scrollHandler(b);
            a.preventDefault ? a.preventDefault() : a.returnValue = !1
        }
    }
    ;
    this.scrollHandler = function(h) {
        var i = this;
        clearInterval(i.intervalID);
        var g = h.scrollTop + i.step * ("up" == i.upOrDown ? -1 : 1);
        i.intervalID = setInterval(function() {
            h.scrollTop += (g - h.scrollTop) * i.f;
            g != h.scrollTop && h.scrollTop != i.lastScrollTop || clearInterval(i.intervalID);
            i.lastScrollTop = h.scrollTop
        }, i.interval)
    }
    ;
    f.each(function(g, c) {
        f.init(c)
    });
    return this
}
;
var ToolTips = function() {
    var b = function(f, i, h, g) {
        this.item = f;
        this.offset = void 0 === i || null  === i ? 10 : i;
        this.animation = !1 === h ? !1 : h || !0;
        this.className = g || "tool-tip"
    }
    ;
    b.prototype = {
        item: null ,
        tip: null ,
        visible: !1,
        show: function(t, s, r, q) {
            var p = this;
            if (!this.visible) {
                var o = this.item
                  , n = o.offset().top
                  , i = o.offset().left
                  , j = this.tip = $('<div class="' + this.className + '"><div class="tip-arrow"></div><div class="tip-text"></div></div>');
                !0 === q && (q = $("<div>").addClass("close").html("\u00d7").on("click", function() {
                    j.fadeOut(200, function() {
                        p.remove()
                    })
                }),
                j.append(q));
                "undefined" != typeof t ? $(".tip-text", j).html(t) : $(".tip-text", j).html(o.attr("tips"));
                this.visible = !0;
                j.appendTo("body");
                "undefined" != typeof r && r && $(".tip-text", j).css("max-width", r);
                s = "undefined" != typeof s ? s : o.attr("tips-pos");
                switch (s) {
                case "t":
                    t = -j.outerHeight() - this.offset;
                    o = j.outerWidth() > o.outerWidth() ? -(j.outerWidth() - o.outerWidth()) / 2 : 0;
                    j.addClass("tool-tip-t");
                    break;
                case "b":
                    t = o.outerHeight() + this.offset;
                    o = j.outerWidth() > o.outerWidth() ? -(j.outerWidth() - o.outerWidth()) / 2 : 0;
                    j.addClass("tool-tip-b");
                    break;
                case "l":
                    t = j.outerHeight() > o.outerHeight() ? -(j.outerHeight() - o.outerHeight()) / 2 : 0;
                    o = -j.outerWidth() - this.offset;
                    j.addClass("tool-tip-l");
                    break;
                case "r":
                    t = j.outerHeight() > o.outerHeight() ? -(j.outerHeight() - o.outerHeight()) / 2 : 0;
                    o = o.outerWidth() + this.offset;
                    j.addClass("tool-tip-r");
                    break;
                default:
                    t = o.outerHeight() + this.offset,
                    o = j.outerWidth() > o.outerWidth() ? -(j.outerWidth() - o.outerWidth()) / 2 : 0,
                    j.addClass("tool-tip-b")
                }
                n += t;
                i += o;
                this.animation ? this._animate(j, s, n, i) : (j.css({
                    top: n,
                    left: i,
                    opacity: 0
                }),
                j.animate({
                    opacity: 1
                }, 300))
            }
        },
        remove: function() {
            this.animation ? this.tip.fadeOut(300, function() {
                $(this).remove()
            }) : this.tip.remove();
            this.visible = !1
        },
        _animate: function(i, p, o, n) {
            var l = {
                opacity: 1
            }
              , k = "number" == typeof this.animation ? this.animation : 1
              , j = 5 * k
              , k = 5 * k;
            switch (p) {
            case "t":
                l.top = o;
                k = 0;
                break;
            case "b":
                l.top = o;
                j = -j;
                k = 0;
                break;
            case "l":
                l.left = n;
                j = 0;
                break;
            case "r":
                l.left = n;
                k = -k;
                j = 0;
                break;
            default:
                l.top = o,
                k = 0
            }
            i.css({
                top: o + j,
                left: n + k,
                opacity: 0
            });
            i.animate(l, 300)
        },
        _menterHandler: function() {},
        _mleaveHandler: function() {},
        init: function() {
            var d = this
              , e = this.item;
            e.off("mouseenter", this._menterHandler);
            e.off("mouseleave", this._mleaveHandler);
            this._menterHandler = function() {
                d.show()
            }
            ;
            this._mleaveHandler = function() {
                d.remove()
            }
            ;
            e.mouseenter(this._menterHandler);
            e.mouseleave(this._mleaveHandler)
        }
    };
    return {
        tips: [],
        bind: function(a, j, i, h) {
            var g = this;
            ("undefined" != typeof a && a ? "undefined" != typeof $(a).attr("tips") ? $(a) : $("[tips]", a) : $("[tips]")).each(function(c, e) {
                e = $(e);
                if ("undefined" == typeof e.attr("initialized")) {
                    var d = new b(e,j,i,h);
                    d.id = g.tips.length;
                    d.init();
                    e.attr("initialized", "true");
                    g.tips.push(d)
                }
            })
        },
        show: function(a, q, p, o, n) {
            for (var k = 0, j = 0; j < this.tips.length; j++) {
                var i = this.tips[j];
                i.item[0] === a[0] && (i.show(q, p, o, n),
                k++)
            }
            if (0 == k) {
                return i = new b(a),
                i.show(q, p, o, n),
                this.tips.push(i),
                i
            }
        },
        remove: function(e) {
            for (var g = 0; g < this.tips.length; g++) {
                var f = this.tips[g];
                f.item[0] === e[0] && f.remove()
            }
        }
    }
}();
function hoverDelay(g, f, j, i) {
    var h = null ;
    g.hover(function() {
        clearTimeout(h);
        h = setTimeout(function() {
            f && f()
        }, i || 300)
    }, function() {
        clearTimeout(h);
        h = setTimeout(function() {
            j && j()
        }, i || 300)
    })
}
function profileWnd(B) {
    function A(e, f, d) {
        d.find(".desc-ex").remove();
        s[f] && (f = $('<div class="desc-ex l' + f + '">' + s[f] + "</div>"),
        e.prepend(f))
    }
    var z = $("#i_menu_profile_btn")
      , y = $("#i_menu_profile")
      , x = z.find(".i_face")
      , w = y.find(".info").addClass("clearfix");
    if (z.length) {
        y.find(".member-menu .notice").parents(".member-menu").remove();
        y.find(".member-menu a").attr("target", "_blank");
        var v = $('<a class="phone" href="https://account.bilibili.com/" target="_blank"></a>').attr({
            tips: "\u524d\u53bb\u7ed1\u5b9a\u624b\u673a",
            "tips-pos": "l"
        })
          , u = $('<a class="email" href="https://account.bilibili.com/" target="_blank"></a>').attr({
            tips: "\u524d\u53bb\u7ed1\u5b9a\u90ae\u7bb1",
            "tips-pos": "l"
        });
        w.find(".phone, .email").remove();
        w.append(v).append(u);
        w.find(".coin").attr("title", "\u786c\u5e01");
        0 != B.email_verified && u.addClass("verified").attr("tips", "\u5df2\u7ed1\u5b9a");
        0 != B.mobile_verified && v.addClass("verified").attr("tips", "\u5df2\u7ed1\u5b9a");
        hoverDelay(z, function() {
            y.is(":visible") || (x.addClass("scale-in"),
            y.stop().slideDown(200))
        }, function() {
            y.stop().slideUp(200);
            x.removeClass("scale-in")
        });
        ToolTips.bind(y, 5, !1, "nav-tool-tip");
        y.find(".user-info").remove();
        var q = null 
          , z = B.moral
          , w = 0
          , v = $('<a class="help-link" href="http://www.bilibili.com/html/help.html#j_1" target="_blank">\u8282\u64cd\u503c\u662f\u4ec0\u4e48\uff1f</a>')
          , s = ["\u65e0\u6cd5\u6dfb\u52a0\u6807\u7b7e<br>\u65e0\u6cd5\u53d1\u9001\u5f39\u5e55\u3001\u79c1\u4fe1\u53ca\u53d1\u8868\u8bc4\u8bba", "\u65e0\u6cd5\u6dfb\u52a0\u6807\u7b7e<br>\u65e0\u6cd5\u53d1\u9001\u5f39\u5e55\u3001\u79c1\u4fe1\u53ca\u53d1\u8868\u8bc4\u8bba", null , null ];
        if (void 0 !== z && null  !== z) {
            z = 100 < z ? 100 : 0 > z ? 0 : z;
            90 <= z && 100 >= z ? w = 3 : 60 <= z ? w = 2 : 30 <= z ? (v.html("\u5982\u4f55\u6062\u590d\u8282\u64cd\u503c").attr("href", "http://www.bilibili.com/html/help.html#j_4"),
            w = 1) : 0 <= z && (v.html("\u5982\u4f55\u6062\u590d\u8282\u64cd\u503c").attr("href", "http://www.bilibili.com/html/help.html#j_4"),
            w = 0);
            var u = $('<div class="user-info" id="jc_info"><div class="user-info-hd"><span class="t">\u8282\u64cd</span></div><div class="points-wrp" id="points_wrp"><a href="https://account.bilibili.com/site/record?type=moral" target="_blank"><div class="points-cnt"><div class="lt"></div><div class="fill-el"></div><div class="bar"><div class="points"></div></div><div class="points-schedule"><span class="now-points">' + z + '</span><span class="next-points">/100</span></div></div></a></div></div>').addClass("l" + w).insertAfter(y.find(".info"))
              , j = u.find("#points_wrp")
              , o = $('<div class="user-info-desc"><span class="arrow-left"></span>\u6bcf\u5929\u767b\u9646\u53ef\u4ee5\u6062\u590d1\u70b9\u8282\u64cd\u503c\uff0870\u5c01\u9876\uff09<br>\u4e3e\u62a5\u8fdd\u89c4\u5f39\u5e55&\u8bc4\u8bba\u6210\u529f\u53ef\u83b7\u5f97\u8282\u64cd\u503c</div>').hide().appendTo(j);
            A(o, w, u);
            u.mouseenter(function(b) {
                clearTimeout(q);
                o.stop(!0, !0).fadeIn(200);
                C.stop(!0, !0).fadeOut(200)
            }).mouseleave(function(b) {
                q = setTimeout(function() {
                    o.stop(!0, !0).fadeOut(200)
                }, 300)
            });
            u.find(".user-info-desc").append(v);
            u.find(".points").css("width", z + "%");
            B.level_info || (B.level_info = {
                current_level: 0,
                current_min: 0,
                current_exp: 0,
                next_exp: 0
            });
            for (var i in B.level_info) {
                B.level_info[i] = parseInt(B.level_info[i]) >> 0
            }
            0 === B.level_info.next_exp >> 0 && (B.level_info.next_exp = "-");
            B = B.level_info;
            i = $('<a class="help-link" href="http://www.bilibili.com/html/help.html#k" target="_blank">\u4f1a\u5458\u7b49\u7ea7\u76f8\u5173\u8bf4\u660e ></a>');
            z = $('<div class="user-info" id="lv_info"><div class="user-info-hd"><span class="t">\u7b49\u7ea7</span></div><div class="points-wrp" id="exp_wrp"><a href="https://account.bilibili.com/site/record?type=exp" target="_blank"><div class="points-cnt"><div class="lt"></div><div class="fill-el"></div><div class="bar"><div class="points"></div></div><div class="points-schedule"><span class="now-points">' + B.current_exp + '</span><span class="next-points">/' + B.next_exp + "</span></div></div></a></div></div>").addClass("l" + B.current_level).insertAfter(y.find(".info"));
            w = z.find("#exp_wrp");
            0 == B.current_level && z.find(".points-schedule").html('<a class="lv-0" href="https://account.bilibili.com/answer/base" target="_blank">\u7b54\u9898\u8f6c\u6b63\u76f4\u5347Lv' + (B.after_answer || 2) + " ></a>");
            var C = $('<div class="user-info-desc"><span class="arrow-left"></span><div class="lv-row">\u4f5c\u4e3a<strong>LV' + B.current_level + "</strong>" + (0 == B.current_level ? "\uff0c\u4f60\u65e0\u6cd5\u4eab\u53d7\u7279\u6743" : "\uff0c\u4f60\u53ef\u4ee5\uff1a") + "</div><div>" + "\u6210\u4e3a\u6b63\u5f0f\u4f1a\u5458\uff0c\u4f60\u53ef\u4ee5\uff1a<br/>1\u3001\u53d1\u5c04\u4e2a\u6027\u5f39\u5e55<br/>2\u3001\u53c2\u4e0e\u89c6\u9891\u8bc4\u8bba<br/>3\u3001\u767b\u5f55\u83b7\u5f97\u786c\u5e01<br/>4\u3001\u6295\u7a3f\u6210\u4e3a\u5076\u50cf 1\u3001\u53d1\u5c04\u6eda\u52a8\u5f39\u5e55<br/>2\u3001\u53c2\u4e0e\u89c6\u9891\u8bc4\u8bba<br/>3\u3001\u767b\u5f55\u83b7\u5f97\u786c\u5e01\uff081\u786c\u5e01/\u5929\uff09<br/>4\u3001\u6295\u7a3f\u6210\u4e3a\u5076\u50cf 1\u3001\u53d1\u5c04\u4e2a\u6027\u5f39\u5e55\uff08\u5f69\u8272\u3001\u9ad8\u7ea7\u3001\u9876\u90e8\uff09<br/>2\u3001\u53c2\u4e0e\u89c6\u9891\u4e92\u52a8\uff08\u8bc4\u8bba\u3001\u6dfb\u52a0tag\uff09<br/>3\u3001\u767b\u5f55\u83b7\u5f97\u786c\u5e01\uff081\u786c\u5e01/\u5929\uff09<br/>4\u3001\u6295\u7a3f\u6210\u4e3a\u5076\u50cf 1\u3001\u53d1\u5c04\u4e2a\u6027\u5f39\u5e55\uff08\u5f69\u8272\u3001\u9ad8\u7ea7\u3001\u9876\u90e8\u3001\u5e95\u90e8\uff09<br/>2\u3001\u53c2\u4e0e\u89c6\u9891\u4e92\u52a8\uff08\u8bc4\u8bba\u3001\u6dfb\u52a0tag\uff09<br/>3\u3001\u767b\u5f55\u83b7\u5f97\u786c\u5e01\uff081\u786c\u5e01/\u5929\uff09<br/>4\u3001\u6295\u7a3f\u6210\u4e3a\u5076\u50cf 1\u3001\u8d2d\u4e70\u9080\u8bf7\u7801\uff081\u4e2a/\u6708\uff09<br/>2\u3001\u53d1\u5c04\u4e2a\u6027\u5f39\u5e55\uff08\u5f69\u8272\u3001\u9ad8\u7ea7\u3001\u9876\u90e8\u3001\u5e95\u90e8\uff09<br/>3\u3001\u53c2\u4e0e\u89c6\u9891\u4e92\u52a8\uff08\u8bc4\u8bba\u3001\u6dfb\u52a0tag\uff09<br/>4\u3001\u767b\u5f55\u83b7\u5f97\u786c\u5e01\uff082\u786c\u5e01/\u5929\uff09<br/>5\u3001\u6295\u7a3f\u6210\u4e3a\u5076\u50cf 1\u3001\u8d2d\u4e70\u9080\u8bf7\u7801\uff082\u4e2a/\u6708\uff09<br/>2\u3001\u53d1\u5c04\u4e2a\u6027\u5f39\u5e55\uff08\u5f69\u8272\u3001\u9ad8\u7ea7\u3001\u9876\u90e8\u3001\u5e95\u90e8\uff09<br/>3\u3001\u53c2\u4e0e\u89c6\u9891\u4e92\u52a8\uff08\u8bc4\u8bba\u3001\u6dfb\u52a0tag\uff09<br/>4\u3001\u767b\u5f55\u83b7\u5f97\u786c\u5e01\uff082\u786c\u5e01/\u5929\uff09<br/>5\u3001\u6295\u7a3f\u6210\u4e3a\u5076\u50cf 1\u3001\u8d2d\u4e70\u9080\u8bf7\u7801\uff083\u4e2a/\u6708\uff09<br/>2\u3001\u53d1\u5c04\u4e2a\u6027\u5f39\u5e55\uff08\u5f69\u8272\u3001\u9ad8\u7ea7\u3001\u9876\u90e8\u3001\u5e95\u90e8\uff09<br/>3\u3001\u53c2\u4e0e\u89c6\u9891\u4e92\u52a8\uff08\u8bc4\u8bba\u3001\u6dfb\u52a0tag\uff09<br/>4\u3001\u767b\u5f55\u83b7\u5f97\u786c\u5e01\uff082\u786c\u5e01/\u5929\uff09<br/>5\u3001\u6295\u7a3f\u6210\u4e3a\u5076\u50cf".split(" ")[B.current_level] + "</div></div>").hide().appendTo(w);
            z.mouseenter(function(b) {
                clearTimeout(q);
                C.stop(!0, !0).fadeIn(200);
                o.stop(!0, !0).fadeOut(200)
            }).mouseleave(function(b) {
                q = setTimeout(function() {
                    C.stop(!0, !0).fadeOut(200)
                }, 300)
            });
            z.find(".user-info-desc").append(i);
            6 == B.current_level ? z.find(".points").css("width", "100%") : z.find(".points").css("width", (100 * (B.current_exp / B.next_exp) >> 0) + "%")
        }
    }
}
window.dynObjects = {};
window.defaultDynObj = null ;
function initDynWnd(s) {
    var r = $('<div id="dyn_wnd"><div class="dyn_arrow"></div><div class="dyn_menu"><b>\u4fe1\u606f\u52a8\u6001</b><div class="menu"><ul><li mode="video" class="on">\u89c6\u9891<div class="num" id="video_num"></div></li><li mode="review">\u8bc4\u8bba<div class="num" id="review_num"></div></li></ul><div class="line"></div></div></div><div class="dyn_list_wrapper" mode="video"><ul class="dyn_list" mode="video"><li class="loading">loading...</li></ul></div><div class="dyn_list_wrapper" mode="review" style="display:none;"><ul class="dyn_list" mode="review"><li class="loading">loading...</li></ul></div><div class="wnd_bottom"><div class="r-l"><a class="read-more" href="http://www.bilibili.com/account/dynamic">\u67e5\u770b\u5168\u90e8</a><div class="num" id="dynamic_num"></div><div class="check-all no-select"></div></div></div></div>')
      , q = $("#i_menu_msg_btn");
    if (0 != q.length) {
        r.appendTo(q);
        var p = parseInt(r.css("border-left-width"));
        r.css({
            top: q.outerHeight(),
            left: -r.outerWidth() / 2 + q.outerWidth() / 2
        });
        var o = $(".dyn_arrow", r);
        950 >= $(window).width() && (r.css({
            left: "auto",
            right: -60
        }),
        o.css({
            left: "auto",
            right: 60 - p + q.outerWidth() / 2 - o.width() / 2
        }));
        $(".dyn_list_wrapper", r).smoothScroll();
        var p = 0, n;
        for (n in s.dynamic) {
            "r" != n && (p += parseInt(s.dynamic[n]))
        }
        s.dynamic && parseInt(s.dynamic.r);
        s = {
            type: "video",
            wnd: $("#dyn_wnd"),
            data: {
                jsonp: "jsonp",
                ps: 5,
                type: 0
            },
            target: $('.dyn_list[mode="video"]', r),
            menuItem: $('.dyn_menu li[mode="video"]', r),
            append: function(C) {
                var A = ""
                  , B = ""
                  , z = ""
                  , y = ""
                  , x = ""
                  , w = ""
                  , v = ""
                  , t = ""
                  , D = C.addition;
                switch (C.type) {
                case 1:
                    A = D.pic;
                    B = D.author;
                    v = 'card="' + D.author + '"';
                    z = "<span>\u6295\u7a3f\u4e86</span>";
                    y = D.title;
                    x = "http://space.bilibili.com/" + D.mid;
                    w = D.link;
                    break;
                case 3:
                    A = C.source.cover;
                    B = C.source.title;
                    z = "<span>\u66f4\u65b0\u4e86</span>";
                    t = '<span class="sp">\u756a\u5267</span>';
                    y = D.title;
                    x = "/bangumi/i/" + C.source.season_id + "/";
                    w = D.link;
                    break;
                case 5:
                    A = C.source.cover;
                    B = C.source.title;
                    z = "<span>\u6dfb\u52a0\u4e86</span>";
                    t = '<span class="sp">\u4e13\u9898</span>';
                    y = D.title;
                    x = "/sp/" + B;
                    w = D.link;
                    break;
                case 6:
                    A = C.source.avatar,
                    B = C.source.uname,
                    v = 'card="' + C.source.uname + '"',
                    z = "<span>\u53d1\u8868\u4e86\u8bc4\u8bba</span>",
                    y = C.content.msg,
                    x = "http://space.bilibili.com/" + C.source.mid,
                    w = D.link + C.content.flink
                }
                return $('<li class="d-data"><div class="preview' + (1 == C.type ? " v" : "") + '"><img src="' + A + '" /></div><div class="r"><div class="title">' + (t ? t : "") + '<a href="' + x + '"' + ("" != v ? v : "") + ' target="_blank">' + B + "</a>" + z + '</div><div class="info"><a href="' + w + '" target="_blank" title="' + (6 != C.type ? y : D.title) + '">' + y + "</a></div></div></li>")
            },
            onData: function(b) {
                var d = CacheManager.getItem("biliLoginStatus").dynamic;
                d && (d.all = 0,
                CacheManager.reset("biliLoginStatus"));
                return b.data.feeds
            },
            total: p,
            history: !0
        };
        n = {
            type: "review",
            wnd: s.wnd,
            data: {
                jsonp: "jsonp",
                ps: 5,
                type: 6
            },
            target: $('.dyn_list[mode="review"]', r),
            menuItem: $('.dyn_menu li[mode="review"]', r),
            append: s.append,
            history: !0
        };
        var k = new dynManage(s)
          , j = new dynManage(n);
        $.extend(window.dynObjects, {
            video: k,
            review: j
        });
        window.defaultDynObj = k;
        var i = null ;
        q.hover(function() {
            clearTimeout(i);
            if (!r.is(":visible") || 1 > parseInt(r.css("opacity"))) {
                i = setTimeout(function() {
                    var b = window.defaultDynObj;
                    b.target.attr("loaded") || (b.initMenu(),
                    b.init(),
                    b.target.attr("loaded", 1));
                    r.stop().fadeIn("fast")
                }, 300)
            }
        }, function() {
            clearTimeout(i);
            i = setTimeout(function() {
                r.stop().fadeOut("fast")
            }, 300)
        });
        r.delegate(".dyn_menu li", "click", function() {
            var b = $(this);
            if (!b.hasClass("on")) {
                $(".dyn_menu li", r).removeClass("on");
                b.addClass("on");
                var d = b.attr("mode");
                $(".dyn_list_wrapper", r).hide();
                $('.dyn_list[mode="' + d + '"]', r).parent().fadeIn("fast");
                $(".dyn_menu .line", r).animate({
                    left: b.position().left,
                    width: b.outerWidth()
                }, 200);
                switch (d) {
                case "video":
                    k.init();
                    break;
                case "review":
                    $("#review_num").html("").hide(),
                    j.init()
                }
            }
        });
        return window.dynObjects
    }
}
function MiniWnd() {
    this.wnds = []
}
MiniWnd.prototype = {
    init: function(e, d) {
        var f = this;
        e = $(e);
        e.length && ("object" != typeof d.wnd && (d.wnd = $(d.wnd)),
        d.wnd.appendTo(e),
        f.setPos(e, d.wnd),
        "undefined" == typeof d.timer && (d.timer = null ),
        e.hover(function() {
            f.show(d)
        }, function() {
            f.hide(d)
        }),
        f.wnds.push(d))
    },
    setPos: function(d, c) {
        c.css({
            left: -c.width() / 2 + d.width() / 2,
            top: d.height() - 1
        })
    },
    show: function(e, d) {
        var f = this;
        clearTimeout(e.timer);
        if (!e.wnd.is(":visible") || 1 > parseInt(e.wnd.css("opacity"))) {
            e.timer = setTimeout(function() {
                e.wnd.stop().fadeIn("fast");
                f.get(e);
                "undefined" != typeof d && d()
            }, 300)
        }
    },
    hide: function(d, c) {
        clearTimeout(d.timer);
        this.timer = setTimeout(function() {
            d.wnd.stop().fadeOut("fast", function() {
                "undefined" != typeof c && c()
            })
        }, 300)
    },
    get: function(e) {
        var d = this
          , f = e.wnd.find(".m-w-loading");
        0 == f.length && (f = $('<div class="m-w-loading">loading...</div>').appendTo(e.wnd.find(".list")));
        if ("undefined" == typeof e.loading || 1 != e.loading) {
            e.loading = 1,
            "undefined" == typeof e.data ? $.get(utils.protocolRelative(e.url), e.reqData || {}, function(a) {
                e.loading = 0;
                if (0 == a.code) {
                    f.remove(),
                    e.data = a,
                    e.render(e.wnd, a)
                } else {
                    f.html("<a>\u6570\u636e\u83b7\u53d6\u5931\u8d25,\u70b9\u51fb\u91cd\u8bd5</a>").find(">a").one("click", function() {
                        d.get(e)
                    })
                }
            }, "jsonp").error(function() {
                e.loading = 0;
                f.html("\u7f51\u7edc\u9519\u8bef")
            }) : (e.loading = 0,
            f.remove())
        }
    }
};
function initMiniWnd() {
    function h(b) {
        return {
            year: b.getFullYear(),
            month: b.getMonth() + 1,
            day: b.getDate()
        }
    }
    function g(b, d) {
        return null  == b || null  == d ? 0 : b.year == d.year && b.month == d.month && b.day == d.day ? 1 : 0
    }
    if (UserStatus.status().isLogin) {
        var l = $("#i_menu_fav_btn")
          , k = $("#i_menu_history_btn")
          , j = new MiniWnd;
        if (l.length) {
            var i = {
                wnd: $('<div class="mini-wnd"><div class="arrow-t"></div><div class="m-w-head"><b class="t left">\u6700\u8fd1\u6536\u85cf</b><a class="right" href="http://space.bilibili.com/#!/favlist" target="_blank">\u67e5\u770b\u66f4\u591a\u6536\u85cf></a></div><ul class="list"></ul></div>'),
                url: "//api.bilibili.com/x/favourite/video/newest",
                reqData: {
                    jsonp: "jsonp",
                    ps: 6,
                    sid: __GetCookie("sid")
                },
                render: function(n, q) {
                    var f = n.find(".list")
                      , p = q.data.videos;
                    f.empty();
                    for (var o in p) {
                        "object" == typeof p[o] && (null  != p[o].title ? $('<li><a href="http://www.bilibili.com/video/av' + p[o].aid + '" target="_blank" title="' + p[o].title + '">' + p[o].title + "</a></li>") : $('<li><a href="http://www.bilibili.com/mylist' + p[o].lid + '" target="_blank" title="' + p[o].description + '">' + p[o].description + "</a></li>")).appendTo(f)
                    }
                    0 == f.children().length && $('<li class="no-data">\u6ca1\u6709\u6570\u636e\u54e6\uff0c\u591a\u6536\u85cf\u70b9\u89c6\u9891\u5427</li>').appendTo(f)
                }
            };
            j.init(l, i)
        }
        k.length && (l = {
            wnd: $('<div class="mini-wnd"><div class="arrow-t"></div><div class="m-w-head"><a class="right" href="http://www.bilibili.com/account/history" target="_blank">\u67e5\u770b\u66f4\u591a\u8bb0\u5f55></a></div><ul class="list history"></ul></div>'),
            url: "//api.bilibili.com/x/history",
            reqData: {
                jsonp: "jsonp",
                pn: 1,
                ps: 6,
                sid: __GetCookie("sid")
            },
            render: function(x, w) {
                var u = x.find(".list");
                u.empty();
                var q = w.data, b = null , o = h(new Date), a;
                for (a in q) {
                    if ("object" == typeof q[a]) {
                        var z = h(new Date(1000 * q[a].view))
                          , y = h(new Date(1000 * (q[a].view + 86400)));
                        if (1 != g(z, b)) {
                            var b = z
                              , A = $('<li class="timeline"><span class="dot"></span><span class="date"></span></li>').appendTo(u);
                            1 == u.find(".timeline").length && (A.addClass("top"),
                            $('<span class="d-line"></span>').insertAfter(u.find(".dot")));
                            1 == g(z, o) ? A.find(".date").html("\u4eca\u65e5") : 1 == g(y, o) ? A.find(".date").html("\u6628\u65e5") : A.find(".date").html(q[a].view_at)
                        }
                        (null  != q[a].title ? $('<li><a href="http://www.bilibili.com/video/av' + q[a].aid + '" target="_blank" title="' + q[a].title + '">' + q[a].title + "</a></li>") : $('<li><a href="http://www.bilibili.com/mylist' + q[a].lid + '" target="_blank" title="' + q[a].description + '">' + q[a].description + "</a></li>")).appendTo(u)
                    }
                }
                0 == u.children().length && (u.addClass("empty"),
                $('<li class="no-data">\u6ca1\u6709\u6570\u636e\u54e6\uff0c\u591a\u770b\u70b9\u89c6\u9891\u5427</li>').appendTo(u))
            }
        },
        j.init(k, l))
    }
}
function initDrawyooDyn(g) {
    var f = $("#dyn_wnd")
      , j = f.find(".menu")
      , i = $('<li mode="draw">\u753b\u53cb<div class="num" id="draw_num"></div></li>').insertAfter(j.find('li[mode="video"]'));
    $('<div class="dyn_list_wrapper" mode="draw"><ul class="dyn_list" mode="draw"><li class="loading">loading...</li></ul></div>').insertAfter(f.find(".dyn_list_wrapper:eq(" + (i.index() - 1) + ")")).hide().smoothScroll();
    f = {
        type: "draw",
        wnd: f,
        data: {
            jsonp: "jsonp",
            ps: 5,
            type: 4
        },
        target: $('.dyn_list[mode="draw"]', f),
        menuItem: $('.dyn_menu li[mode="draw"]', f),
        append: function(b) {
            var d = b.addition;
            return $('<li class="d-data"><a href="' + d.link + '" target="_blank"><div class="preview p"><img src="' + d.cover + '" /></div></a><div class="r p"><div class="title"><a href="http://h.bilibili.com/member?mod=space&uid=' + b.source.mid + '&act=p_index" target="_blank">' + b.source.uname + '</a><span>\u6295\u7a3f\u4e86</span></div><div class="info"><a href="' + d.link + '" target="_blank" title="' + d.title + '">' + d.title + "</a></div></div></li>")
        },
        onData: function(b) {
            var d = CacheManager.getItem("biliLoginStatus").dynamic;
            d && (d.hua = 0,
            CacheManager.reset("biliLoginStatus"));
            i.find("#draw_num").hide();
            return b.data.feeds
        },
        history: !0
    };
    i.click(function() {
        h.init()
    });
    g.dynamic && g.dynamic.hua && i.find("#draw_num").html(g.dynamic.hua).show();
    var h = new dynManage(f);
    window.dynObjects.draw = h
}
function initLiveDyn() {
    var j = $("#dyn_wnd")
      , i = utils.protocolRelative("//live.bilibili.com/ajax/")
      , q = j.find(".menu")
      , p = $('<li mode="live">\u76f4\u64ad<div class="num" id="live_num"></div></li>').insertAfter(q.find('li[mode="video"]'))
      , o = $('<div class="dyn_list_wrapper"></div>').insertAfter(j.find(".dyn_list_wrapper:eq(" + (p.index() - 1) + ")")).attr("mode", "live").hide()
      , n = $('<ul class="dyn_list"><li class="loading">loading...</li></ul>').attr("mode", "live").appendTo(o);
    o.smoothScroll();
    n = {
        type: "live",
        wnd: j,
        apiUrl: i + "feed/list",
        data: {
            pagesize: 5
        },
        pageKey: "page",
        target: n,
        menuItem: p,
        onData: function(b) {
            return b.data.list
        },
        getResults: function(b) {
            return b.data.results
        },
        append: function(b) {
            var f = $('<li class="d-data live"><a href="' + b.link + '" target="_blank"><div class="preview"><img src="' + b.cover + '" /></div><div class="r p"><div class="title"><em class="uname">' + b.uname + '</em><span class="live">\u6b63\u5728\u76f4\u64ad</span></div><div class="info">' + b.title + "</div></div></a></li>")
              , e = $('<div class="ignore">\u5ffd\u7565</div>').appendTo(f).on("click", function() {
                $.get(i + "feedignore", {
                    roomid: b.roomid
                }, function(c) {
                    0 == c.code ? (c = parseInt($("#live_num").html() || 0) - 1,
                    $("#live_num").html(c),
                    0 >= c && $("#live_num").hide(),
                    f.slideUp(200, function() {
                        f.remove()
                    })) : (new MessageBox({
                        zIndex: 10050
                    })).show(e, c.msg)
                }, "jsonp")
            });
            return f
        }
    };
    p.click(function() {
        k.init()
    });
    q.find("li").click(function() {
        "live" == $(this).attr("mode") ? (j.find(".wnd_bottom").not(".live").hide(),
        l.show()) : (j.find(".wnd_bottom").not(".live").show(),
        l.hide())
    });
    var l = $('<div class="wnd_bottom live"><div class="r-l">\u5ffd\u7565\u5168\u90e8</div></div>').insertAfter(o).on("click", function() {
        $.post(i + "feedignoreall", {}, function(b) {
            0 == b.code ? ($("#live_num").html("").hide(),
            k.removeData()) : (new MessageBox({
                zIndex: 10050
            })).show(l, b.msg)
        }, "jsonp")
    }).hide()
      , k = new dynManage(n);
    window.dynObjects.live = k;
    "https:" == window.location.protocol ? p.hide() : $.get(i + "feed/count", function(b) {
        if (0 == b.code && b.data.count) {
            $("#live_num").show();
            var d = parseInt($("#dynamic_num_total").html() || 0)
              , d = d + b.data.count;
            $("#dynamic_num_total").html(d).show()
        }
    }, "jsonp")
}
function dynManage(b) {
    this.params = b = $.extend(!0, {
        pageKey: "pn",
        total: null 
    }, b);
    this.onData = this.params.onData || this.onData;
    this.getResults = this.params.getResults || this.getResults;
    this.wnd = b.wnd;
    this.num = this.page = 0;
    this.append = b.append;
    this.data = b.data || {};
    this.target = b.target;
    this.wrapper = b.wrapper || b.target.parent();
    this.reload = this.loading = this.finish = 0;
    this.tempList = null ;
    this.history = b.total && !b.history ? 0 : 1;
    this.historyMaxNum = b.historyMaxNum || 0;
    this.newTag = b.newTag ? !0 : !1;
    this.tryTime = 0;
    this.TRY_MAX = 3;
    this.apiUrl = utils.protocolRelative(b.apiUrl || "//api.bilibili.com/x/feed/pull");
    this.bindScroll()
}
dynManage.prototype = {
    bindScroll: function() {
        var b = this;
        b.wrapper.on("scroll", function() {
            b.scroll()
        })
    },
    init: function() {
        this.target.attr("loaded") || (0 == this.params.total && ($(".loading", this.target).remove(),
        this.noData()),
        this.load(),
        this.target.attr("loaded", 1))
    },
    load: function() {
        var b = this;
        b.finish ? b.complete() : (b.page++,
        b.data[b.params.pageKey] = b.page,
        b.setLoading(1),
        $.ajax({
            url: b.apiUrl,
            dataType: "jsonp",
            data: b.data,
            success: function(a) {
                if (0 == a.code) {
                    var j = 0, i = b.onData(a), h;
                    if (i) {
                        for (h = 0; h < i.length && "object" == typeof i[h]; h++) {
                            var g = $(b.append(i[h])).insertBefore(b.getLoading().elem);
                            b.newTag && b.num < b.params.total ? $('<div class="new">new</div>').appendTo(g) : b.num == b.params.total && ($('<li class="d-data history"><div class="history-tag">\u5386\u53f2\u52a8\u6001</div></li>').insertBefore(g),
                            g.addClass("no-border"));
                            b.renderEffect(g);
                            b.num++;
                            if (!b.history && b.num >= b.params.total) {
                                j = 1;
                                break
                            } else {
                                if (b.history && b.historyMaxNum && b.num - b.params.total >= b.historyMaxNum && b.num >= b.params.total) {
                                    j = 2;
                                    break
                                }
                            }
                        }
                    }
                    b.setLoading(0);
                    !i || !i.length || 0 != j || b.num >= b.getResults(a) ? b.complete() : b.target.is(":visible") && b.target.height() - b.getLoading().elem.height() < b.wrapper.height() && b.load()
                } else {
                    b.accessError()
                }
            },
            error: function() {
                b.accessError()
            }
        }))
    },
    accessError: function() {
        var b = this;
        b.page--;
        b.data[b.params.pageKey] = b.page;
        b.tryTime < b.TRY_MAX ? (b.getLoading().elem.addClass("error").html("(\u00b4\u30fb\u03c9\u30fb\uff40)\u7f51\u7edc\u9519\u8bef\uff0c\u6b63\u5728\u91cd\u8bd5"),
        b.load(),
        b.tryTime++) : b.getLoading().elem.addClass("error m").html("(\u00b4\u30fb\u03c9\u30fb\uff40)\u7f51\u7edc\u9519\u8bef\uff0c\u8bf7\u70b9\u51fb\u8fd9\u91cc\u91cd\u65b0\u5c1d\u8bd5").click(function() {
            $(this).removeClass("error m").html("loading...");
            b.load();
            $(this).off("click")
        })
    },
    onData: function(b) {
        return b.data.feeds
    },
    getResults: function(b) {
        return b.data.page.count
    },
    renderEffect: function(b) {
        b.css({
            "margin-left": "50px",
            opacity: "0"
        });
        b.animate({
            "margin-left": "0",
            opacity: "1"
        }, 300)
    },
    complete: function() {
        this.finish = 1;
        0 == this.num ? (this.noData(),
        this.wrapper.addClass("no-history").animate({
            height: 120
        }, 100),
        this.getLoading().elem.remove()) : this.getLoading().elem.addClass("f").html("(\u00b4\u30fb\u03c9\u30fb\uff40)\u6ca1\u6709\u66f4\u591a\u4fe1\u606f")
    },
    getNoData: function() {
        return $(".no-data", this.target)
    },
    noData: function(b) {
        b = b || "\u6682\u65f6\u6ca1\u6709\u65b0\u52a8\u6001\u4e86\u54e6\uff01";
        0 == this.getNoData().length && $('<li class="no-data">' + b + "</li>").appendTo(this.target).hide().fadeIn(200)
    },
    getLoading: function() {
        return {
            elem: $(".loading", this.target),
            state: this.loading
        }
    },
    setLoading: function(b) {
        b ? (0 == this.getLoading().elem.length && $('<li class="loading">loading...</li>').appendTo(this.target),
        this.loading = 1) : this.loading = 0
    },
    readData: function() {
        var b = this;
        $("li", b.target).fadeOut("200", function() {
            $(this).remove();
            null  != b.tempList ? (b.tempList.css({
                "margin-left": "-50px",
                opacity: "0"
            }),
            b.tempList.appendTo(b.target),
            b.tempList.animate({
                "margin-left": "0",
                opacity: "1"
            }, 300)) : b.load();
            b.reload = 0
        })
    },
    removeData: function() {
        var b = this;
        $("li", b.target).animate({
            "margin-left": "-=50px",
            opacity: "0"
        }, 300, function() {
            var a = $(this).is(":last-child");
            $(this).remove();
            a && b.noData()
        })
    },
    scroll: function() {
        $(".loading", this.target);
        this.wrapper.scrollTop() + 50 >= this.target.height() - this.wrapper.height() && (!this.loading && !this.finish && !this.reload) && this.load()
    },
    initMenu: function() {
        var h = this.wnd
          , g = h.find(".menu")
          , l = this.params.menuItem
          , k = window.defaultDynObj.params.type;
        g.find("li").removeClass("on");
        var j = g.find('li[mode="' + k + '"]').addClass("on")
          , i = 0;
        g.find("li").each(function(b, d) {
            d = $(d);
            if (d.index() < j.index()) {
                i += d.width()
            } else {
                return !1
            }
        });
        g.find(".line").css({
            left: i,
            width: l.outerWidth()
        });
        h.find(".dyn_list_wrapper").hide();
        h.find('.dyn_list_wrapper[mode="' + k + '"]').show()
    }
};
var lazyLoadContents = [];
function LazyLoad(d) {
    if ("undefined" != typeof d.render) {
        var c = {
            options: {
                url: null ,
                xhrParams: {},
                wrapper: d.wrapper || $(window),
                target: null ,
                offsetTop: 0,
                distance: 50,
                autoLoad: !0,
                showPageAfter: null ,
                pageContainer: null ,
                onInit: function() {},
                render: function(b) {},
                onScroll: function() {
                    return !1
                },
                renderCallback: function(f, e) {},
                beforeLoad: function() {},
                onComplete: function(b) {},
                onData: null ,
                state: null ,
                noDataPrompt: null ,
                onShowPage: null 
            },
            page: 0,
            num: 0,
            autoNum: 0,
            totalPage: 1,
            showPages: 1,
            totalResults: 0,
            manualLoad: !1,
            waitManualOperate: !1,
            xhrParams: function() {
                return {}
            },
            _busying: !1,
            _debug: !1,
            _destroyed: !1,
            setOption: function(f, e) {
                if ("object" == typeof f) {
                    return $.extend(!0, this.options, f)
                }
                void 0 !== this.options[f] && (this.options[f] = e)
            },
            init: function() {
                var e = this;
                if ("object" == typeof d) {
                    for (var a in this.options) {
                        d.hasOwnProperty(a) && (this.options[a] = d[a])
                    }
                    this.options._super = this;
                    this.options.onData = this.options.onData || function() {
                        return e.page < e.totalPage
                    }
                    ;
                    this.target = this.options.target = $(this.options.target);
                    this.options.wrapper = $(this.options.wrapper);
                    this.options.state = $(this.options.state);
                    this.options.state.parent().length || this.options.state.appendTo(this.options.target);
                    this._debug && console.log("lazyLoad: add lazyLoader " + this.options.xhrParams.url, "current counts: ", lazyLoadContents.length);
                    if (!1 !== this.options.autoLoad) {
                        if (this.options.wrapper.on("scroll", function() {
                            e.scroll()
                        }),
                        "number" == typeof this.options.autoLoad) {
                            this.options.state.on("click", function() {
                                e.autoNum >= e.options.autoLoad && (e.autoNum = 0);
                                e.load()
                            })
                        } else {
                            this.options.state.on("click", function() {
                                e.load()
                            })
                        }
                    } else {
                        this.waitManualOperate = !0,
                        this.options.state.on("click", function() {
                            e.load()
                        })
                    }
                    this.options.onInit.call(this)
                }
            },
            empty: function() {
                this.options.target.empty();
                this.options.state.parent().length || this.options.state.appendTo(this.options.target)
            },
            abort: function() {
                this.ajaxRequest && this.ajaxRequest.abort();
                this._busying = !1
            },
            free: function() {
                this.abort();
                this._destroyed = !0;
                for (var b = 0; b < lazyLoadContents.length; b++) {
                    if (lazyLoadContents[b] == this) {
                        lazyLoadContents.splice(b, 1);
                        break
                    }
                }
            },
            reload: function() {
                this.abort();
                this.page = 0;
                this.load()
            },
            load: function() {
                var i = this
                  , h = this.options;
                if (!this._busying && !this._destroyed) {
                    if ("undefined" != typeof h.showPageAfter && (1 < this.showPages && this.page >= h.showPageAfter || 1 === h.showPageAfter && 1 < this.totalPage) && 0 == this.page % h.showPageAfter && 0 != this.page && !this.manualLoad) {
                        this.waitManualOperate = !0,
                        h.state.hide()
                    } else {
                        this.manualLoad = !1;
                        this.waitManualOperate = !1 === h.autoLoad ? !0 : !1;
                        this._busying = !0;
                        h.beforeLoad.call(this);
                        this.page++;
                        this.num++;
                        this.autoNum++;
                        this._debug && console.log("loading page: " + this.page + " (URL: " + h.xhrParams.url + this.page + ")");
                        var l = $.extend(!0, this.xhrParams.call(this), this.options.xhrParams);
                        if (l) {
                            var k = l.success
                              , j = l.error;
                            l.success = function(a) {
                                i._busying = !1;
                                k && k.call(i, a);
                                "number" == typeof h.autoLoad && i.autoNum >= h.autoLoad && (i.waitManualOperate = !0);
                                h.onComplete.call(i, a)
                            }
                            ;
                            l.error = function(a, e) {
                                j && j.call(i, a, e)
                            }
                        }
                        this.ajaxRequest = $.ajax(l)
                    }
                }
            },
            render: function(h) {
                var g = this.options, j;
                for (j in h) {
                    if ("object" == typeof h[j] && j.match(/^[0-9]+$/)) {
                        var i = $(g.render(h[j]));
                        g.target[0] == g.state.parent()[0] ? i.insertBefore(g.state) : i.appendTo(g.target);
                        "undefined" != typeof g.renderCallback && g.renderCallback(i, h[j])
                    }
                }
            },
            scroll: function() {
                if (this.waitManualOperate) {
                    return !1
                }
                var b;
                b = "function" == typeof this.options.offsetTop ? this.options.offsetTop.call(this) : this.options.offsetTop;
                "none" != this.options.target.css("display") && this.options.wrapper.scrollTop() + this.options.distance >= b + this.options.target.height() - this.options.wrapper.height() && !this._busying && !this.finish && this.options.onScroll.call(this) && this.options.onData.call(this) && this.load()
            },
            showPage: function() {
                var g = this
                  , f = this.options
                  , h = Math.ceil(this.page / f.showPageAfter);
                this._debug && console.log("Current show page: " + h + "  data page: " + this.page);
                this._trigger("onShowPage", $(f.pageContainer), h, Math.ceil(this.totalPage / f.showPageAfter), this.totalResults, function(a) {
                    g.num = 0;
                    g.autoNum = 0;
                    g.manualLoad = !0;
                    g.page = (a - 1) * f.showPageAfter;
                    g.empty();
                    g.load()
                })
            },
            _trigger: function() {
                var f = Array.prototype.slice.call(arguments, 0)
                  , e = f.shift();
                if (this.options[e]) {
                    return this.options[e].apply(this, f)
                }
            }
        };
        lazyLoadContents.push(c);
        return c
    }
}
function lazyLoadContent(e) {
    var d = {
        beforeLoad: function() {
            var b = this.options;
            b.state && (b.state.show(),
            b.state.find("> b").html("\u6b63\u5728\u8f7d\u5165\u4e2d..."))
        }
    }
      , f = e.onComplete;
    d.onComplete = function(b) {
        f && f.call(this, b);
        0 == this.target.children().length && 0 == $(".nomore", this.target).length && $('<div class="nomore"></div>').appendTo(this.target)
    }
    ;
    d.offsetTop = function() {
        return this.options.target.offset().top
    }
    ;
    d.onInit = function() {
        var b = this;
        this.options.state && (this.options.state.empty(),
        $('<span class="loading-spinner"></span><b>\u521d\u59cb\u5316\u4e2d...</b>').appendTo(this.options.state).find("b").click(function() {
            b.load()
        }),
        this.options.state.css("cursor", "pointer"))
    }
    ;
    d.onShowPage = function(j, n, i, l, k) {
        pagelist_ul(j, n, i, l, k, 5)
    }
    ;
    d = $.extend(!0, d, e);
    e = $.extend(!0, LazyLoad(d), {
        xhrParams: function() {
            var b = this
              , g = b.options;
            return {
                url: g.url + b.page,
                data: g.xhrParams.data,
                dataType: "json",
                success: function(a) {
                    b.render(a);
                    b.totalPage = a.numPages;
                    b.totalResults = a.numResults;
                    b.showPages = "undefined" != typeof g.showPageAfter ? Math.ceil(b.totalPage / g.showPageAfter) : !1;
                    b._debug && console.log("loaded page: " + b.page + " Total: " + a.numPages + " (URL: " + g.url + b.page + ")");
                    b.page >= a.numPages ? (g.state.find("> .loading-spinner").hide(),
                    g.noDataPrompt ? g.state.find("> b").html(g.noDataPrompt) : g.state.hide()) : (g.state.show(),
                    g.state.find("> .loading-spinner").show(),
                    g.state.find("> b").html("\u67e5\u770b\u66f4\u591a..."),
                    setTimeout(function() {
                        0 != $(g.target).height() && b.scroll()
                    }, 0));
                    0 != b.page % g.showPageAfter && 1 !== g.showPageAfter || b.manualLoad ? $(g.pageContainer).hide() : (b.waitManualOperate = !0,
                    g.state.hide());
                    (0 == b.page % g.showPageAfter || b.page >= a.numPages || 1 === g.showPageAfter) && 1 < b.showPages && ($(g.pageContainer).show(),
                    b.showPage())
                }
            }
        }
    });
    e.init();
    return e
}
function biliShowFloatAds(F, E, D, C, B, A, z, y) {
    try {
        var w = (new Date).getSeconds() % D.length
          , x = D[w];
        if ("banner" == F) {
            if (0 < $(".header .logo").length) {
                var o = $(".header .logo")
                  , u = $('<div class="bili_live_pmt" b-stat="float-pmt-banner" b-stat-v="' + x[1] + '"><a href="' + x[1] + '" target="_blank"></a></div>').css({
                    width: B || 150,
                    height: A || 80,
                    "margin-top": -20,
                    background: "url(" + x[0] + ") no-repeat",
                    left: o.position().left + o.outerWidth() + 30
                }).appendTo(".header .h-center");
                z && u.css("left", z);
                y && u.css("top", y);
                u.fadeIn(500);
                setTimeout(function() {
                    u.fadeOut(1000, function() {
                        u.remove()
                    })
                }, 10000)
            }
            return u
        }
        var i = ChatGetSettings("bili-float-ads-close");
        if (!($("#a_ds_" + E).length || i && parseInt(i.split(",")[0]) == E && i.split(",")[1] && (new Date).getTime() < parseInt(i.split(",")[1]))) {
            F = B || 150;
            var H = A || 80
              , G = $(".z");
            if (G.length) {
                var I = $("<a>").addClass("float-pmt").attr({
                    id: "a_ds_" + E,
                    href: x[1],
                    target: "_blank",
                    "b-stat": "float-pmt",
                    "b-stat-v": x[1]
                }).css({
                    position: "absolute",
                    right: -F,
                    top: $(window).scrollTop() + $(window).height() - G.offset().top - H - 220,
                    height: H,
                    width: F,
                    "z-index": 10050
                });
                $("<img />").attr("src", x[0]).css({
                    width: "100%",
                    height: "100%",
                    display: "block"
                }).appendTo(I);
                $("<div>\u00d7</div>").css({
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 20,
                    height: 20,
                    "line-height": "20px",
                    "font-size": 20,
                    "text-align": "center",
                    cursor: "pointer",
                    "background-color": "#ddd",
                    "border-radius": "4px",
                    color: "#222"
                }).appendTo(I).on("click", function(b) {
                    b.preventDefault();
                    b.stopPropagation();
                    I.remove();
                    C = C || 0;
                    ChatSaveSettings("bili-float-ads-close", E + "," + ((new Date).getTime() + 3600000 * C))
                });
                I.appendTo(G);
                $(window).on("scroll.bili-float-ads", function() {
                    I.css("top", $(window).scrollTop() + $(window).height() - G.offset().top - H - 220)
                });
                return I
            }
        }
    } catch (j) {}
}
function biliShowAds(s, r, q, p, o) {
    var n = {
        index: {
            thin: {
                ".ad-b1": {
                    width: 720,
                    height: 60
                },
                ".ad-b2": {
                    width: 720,
                    height: 60
                },
                ".ad-b3": {
                    width: 970,
                    height: 60
                },
                ".ad-b4": {
                    width: 720,
                    height: 60
                },
                ".ad-b5": {
                    width: 720,
                    height: 60
                },
                ".ad-c1": {
                    width: 230,
                    height: 70
                },
                ".ad-c2": {
                    width: 230,
                    height: 70
                },
                ".ad-c2-2": {
                    width: 230,
                    height: 70
                },
                ".ad-c3": {
                    width: 230,
                    height: 70
                },
                ".ad-c4": {
                    width: 230,
                    height: 70
                }
            },
            wide: {
                ".ad-b1": {
                    width: 885,
                    height: 65
                },
                ".ad-b2": {
                    width: 885,
                    height: 65
                },
                ".ad-b3": {
                    width: 1170,
                    height: 70
                },
                ".ad-b4": {
                    width: 885,
                    height: 65
                },
                ".ad-b5": {
                    width: 885,
                    height: 65
                },
                ".ad-c1": {
                    width: 250,
                    height: 80
                },
                ".ad-c2": {
                    width: 250,
                    height: 80
                },
                ".ad-c2-2": {
                    width: 250,
                    height: 80
                },
                ".ad-c3": {
                    width: 250,
                    height: 80
                }
            }
        },
        list: {
            thin: {
                ".ad-b1": {
                    width: 720,
                    height: 60
                },
                ".ad-b2": {
                    width: 720,
                    height: 60
                },
                ".ad-b3": {
                    width: 720,
                    height: 60
                },
                ".ad-b4": {
                    width: 720,
                    height: 60
                },
                ".ad-b5": {
                    width: 720,
                    height: 60
                },
                ".ad-c1": {
                    width: 230,
                    height: 70
                },
                ".ad-c2": {
                    width: 230,
                    height: 70
                },
                ".ad-c3": {
                    width: 230,
                    height: 70
                },
                ".ad-c4": {
                    width: 230,
                    height: 70
                }
            },
            wide: {
                ".ad-b1": {
                    width: 885,
                    height: 65
                },
                ".ad-b2": {
                    width: 885,
                    height: 65
                },
                ".ad-b3": {
                    width: 885,
                    height: 65
                },
                ".ad-b4": {
                    width: 885,
                    height: 65
                },
                ".ad-b5": {
                    width: 885,
                    height: 65
                },
                ".ad-c1": {
                    width: 250,
                    height: 80
                },
                ".ad-c2": {
                    width: 250,
                    height: 80
                },
                ".ad-c3": {
                    width: 250,
                    height: 80
                }
            }
        },
        arc: {
            thin: {
                ".ad-e1": {
                    width: 980,
                    height: 100
                },
                ".ad-f": {
                    width: 468,
                    height: 60
                },
                ".ad-fl": {
                    width: 468,
                    height: 60
                },
                ".ad-fr": {
                    width: 468,
                    height: 60
                }
            },
            wide: {
                ".ad-e1": {
                    width: 1160,
                    height: 100
                },
                ".ad-f": {
                    width: 468,
                    height: 60
                },
                ".ad-fl": {
                    width: 468,
                    height: 60
                },
                ".ad-fr": {
                    width: 468,
                    height: 60
                }
            }
        }
    };
    try {
        var k = (new Date).getSeconds() % o.length
          , j = o[k];
        o = "";
        void 0 !== n[s][q ? "wide" : "thin"][p] && (o = ' width="' + n[s][q ? "wide" : "thin"][p].width + '" height="' + n[s][q ? "wide" : "thin"][p].height + '"');
        $(p + " #a_ds_" + r).remove();
        $(p).attr({
            "b-stat": s + p,
            "b-stat-v": j[3]
        });
        "i" == j[0] ? $('<a id="a_ds_' + r + '" href="' + j[3] + '" target="_blank"><img src="' + (q ? j[2] : j[1]) + '"' + o + ' border="0" /></a>').appendTo(p) : $('<embed id="a_ds_' + r + '" wmode="opaque" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" allowscriptaccess="none" rel="noreferrer" src="' + (q ? j[2] : j[1]) + '"' + o + ' type="application/x-shockwave-flash" allowfullscreen="true" quality="high">').appendTo(p);
        $(p).show()
    } catch (i) {}
}
var LazyJSONLoader = function() {}
;
LazyJSONLoader.prototype = {
    cache: {},
    queue: {},
    getJSON: function(f, e, h) {
        var g = this;
        if ("undefined" != typeof this.cache[f]) {
            e(this.cache[f])
        } else {
            "undefined" == typeof g.queue[f] && (g.queue[f] = []);
            g.queue[f].push(e);
            if (1 < g.queue[f].length) {
                return !1
            }
            $.getJSON(f, function(d) {
                g.cache[f] = d;
                for (var a; a = g.queue[f].shift(); ) {
                    a(d)
                }
            }).error(function() {
                g.queue[f] = [];
                "undefined" != typeof h && h()
            })
        }
    }
};
var Responsive = {
    _callbacks: [],
    lastPageWidth: null ,
    screenWidthArr: [0, 1400],
    pageWidthArr: [960, 1160],
    pageCss: [],
    init: function(e) {
        var d;
        this.pageCss = [];
        for (var f = 0; f < this.screenWidthArr.length; f++) {
            this.pageCss.push("b-page-" + this.pageWidthArr[f]),
            $(document).width() >= this.screenWidthArr[f] && (d = this.pageWidthArr[f])
        }
        if (null  === this.lastPageWidth || this.lastPageWidth != d || "boolean" == typeof e && e) {
            this.lastPageWidth = d,
            this.onChange(d),
            this.reset(d)
        }
    },
    onChange: function(d) {
        1160 == d ? $("body").addClass("widescreen") : $("body").removeClass("widescreen");
        d = 1160 == d;
        if (void 0 !== window.ads) {
            for (var c in window.ads) {
                window.ads[c](d)
            }
        }
    },
    add: function(b) {
        this._callbacks.push(b)
    },
    reset: function(d) {
        void 0 === d && (d = this.lastPageWidth);
        for (var c = 0, c = 0; c < this._callbacks.length; c++) {
            this._callbacks[c](d)
        }
    }
};
window.biliAdjust = utils.bindFn(Responsive.init, Responsive);
function _bili_crossdomain(i, h) {
    var o = {}, n = !1, l;
    for (l in i) {
        var k = "crossdomain_flag" == l ? "1" : __GetCookie(l);
        "" == k && !1 === i[l] || (k == i[l] || encodeURIComponent(k) == i[l]) || (o[l] = k,
        n = !0)
    }
    if (n) {
        var n = "http://interface.bilibili.com/crossdomain_cookie.do?callback=?", j;
        for (j in o) {
            n += "&" + j + "=" + encodeURIComponent(o[j])
        }
        $.getJSON(n, h)
    }
}
function biliCachedJSON(i, h, o, n, l) {
    i = {
        url: i,
        type: "GET",
        dataType: "json",
        success: n
    };
    var k;
    if (window.sessionStorage) {
        try {
            i.success = function(b) {
                k = [(new Date).getTime() + 1000 * o, b];
                window.sessionStorage[h] = JSON.stringify(k);
                "function" == typeof n && n(b)
            }
            ,
            void 0 === (k = window.sessionStorage[h]) ? $.ajax(i) : (k = JSON.parse(k),
            2 != k.length ? $.ajax(i) : (new Date).getTime() < k[0] && ("function" != typeof l || l(k[1])) ? n(k[1]) : $.ajax(i))
        } catch (j) {
            $.ajax(i)
        }
    } else {
        $.ajax(i)
    }
}
var SelectModule = function() {
    function d(b, e) {
        this.params = {};
        this._isMobile = browser.version.mobile || browser.version.ios || browser.version.android || browser.version.windowsphone;
        if ("undefined" != typeof b && ("string" == typeof b || b instanceof $ ? (this.obj = $(b),
        this.params = e || {}) : (this.params = b,
        this.obj = $(this.params.item)),
        this.obj.length)) {
            this.obj.hasClass("b-slt") || (this.obj = this.obj.find(".b-slt"));
            this._active = !1;
            if ("undefined" != typeof this.params.onInit) {
                this.params.onInit(this.obj)
            }
            if (0 == this.obj.children().length || this.params.selectorData) {
                this.obj = this.createMenu(this.obj)
            }
            this.list = this.obj.find(".list");
            this.init();
            c.push(this)
        }
    }
    var c = [];
    window.bindSlt = d.bind = function(e, a) {
        return new d(e,a)
    }
    ;
    d.create = function(n) {
        var i = $('<div class="b-slt"></div>');
        $("<span>").addClass("txt").appendTo(i);
        $("<div>").addClass("b-slt-arrow").appendTo(i);
        var s = $("<ul>").addClass("list").appendTo(i);
        n.wrapper && i.wrap(n.wrapper);
        for (var r = n.items || [], q = 0; q < r.length; q++) {
            var p = r[q]
              , j = $("<li></li>").text(p.name).appendTo(s);
            p.selected && j.attr("selected", "selected");
            if (p.attributes) {
                for (var o in p.attributes) {
                    j.attr(o, p.attributes[o])
                }
            }
        }
        n.wrapper && (i = i.parent());
        return i
    }
    ;
    d.prototype.init = function() {
        var g = this.obj
          , f = this
          , h = this.list.find("[selected]");
        0 == h.length && (h = this.list.find("li").eq(0).attr("selected", "selected"));
        g.find(".txt").html(h.html());
        g.off("mouseenter.selectMenu");
        g.off("mouseleave.selectMenu");
        g.off("click.selectMenu");
        g.on("click.selectMenu", function(b) {
            f._tap(b)
        });
        this._isMobile || !1 === this.params.hover || (g.on("mouseenter.selectMenu", function(b) {
            f._mover(b)
        }),
        g.on("mouseleave.selectMenu", function(b) {
            f._mout(b)
        }));
        this.list.find("li").off("click.selectMenu");
        this.list.on("click", "li", function(b) {
            b.stopPropagation();
            f.select(b, $(this))
        });
        g.data("select-menu", this)
    }
    ;
    d.prototype._mover = function(b) {
        b.stopPropagation();
        for (var g = 0; g < c.length; g++) {
            c[g]._mout(b)
        }
        if (!this.obj.attr("disabled") && this.list.length) {
            var f = this;
            this.obj.addClass("on");
            this.list.show();
            this._active = !0;
            this.setPos(this.list);
            if (this._isMobile || !1 === this.params.hover) {
                $(document).off("click.selectMenu"),
                $(document).one("click.selectMenu", function(e) {
                    f._mout(e)
                })
            }
        }
    }
    ;
    d.prototype._mout = function(b) {
        this.obj.removeClass("on");
        this.list.hide();
        this._active = !1;
        (this._isMobile || !1 === this.params.hover) && $(document).off("click.selectMenu")
    }
    ;
    d.prototype._tap = function(b) {
        this._active ? this._mout(b) : this._mover(b)
    }
    ;
    d.prototype.select = function(f, e) {
        this._mout(f);
        if (!e || this._change(e)) {
            "undefined" == typeof e && (e = this.value()),
            this.change(e, f)
        }
    }
    ;
    d.prototype.change = function(f, e) {
        f = f || this.value();
        "function" == typeof this.params.onChange && this.params.onChange.call(this, f, e)
    }
    ;
    d.prototype._change = function(b) {
        if (b.attr("selected") || b.attr("disabled")) {
            return !1
        }
        $("li", this.list).removeAttr("selected");
        b.attr("selected", "selected");
        $(".txt", this.obj).html(b.html());
        return !0
    }
    ;
    d.prototype.value = function(g, f) {
        if (f) {
            var h = this.list.find("[" + g + '="' + f + '"]');
            h.length && this._change(h);
            return h
        }
        return g ? this.getSelected().attr(g) : this.getSelected()
    }
    ;
    d.prototype.getSelected = function() {
        return this.list.find('[selected="selected"]')
    }
    ;
    d.prototype.createMenu = function(g) {
        $("<span>").addClass("txt").appendTo(g);
        $("<div>").addClass("b-slt-arrow").appendTo(g);
        var f = this.params;
        this.list = $("<ul>").addClass("list").appendTo(g);
        "undefined" != typeof f.createList && f.createList(this.list);
        if ("undefined" != typeof f.selectorData) {
            for (var h in f.selectorData) {
                this.add(f.selectorData[h].name, f.selectorData[h].attributes)
            }
        }
        return g
    }
    ;
    d.prototype.add = function(h, g) {
        var j = $("<li>").html(h).appendTo(this.list);
        if ("undefined" != typeof g) {
            for (var i in g) {
                j.attr(i, g[i])
            }
        }
        return j
    }
    ;
    d.prototype.setPos = function(b) {
        b.offset().left + b.width() - 10 > $(".z").width() ? b.css({
            left: "auto",
            right: "-1px"
        }) : b.css({
            left: "-1px",
            right: "auto"
        })
    }
    ;
    d.prototype.close = function(b) {
        null  != b && (b.originalEvent ? $(".b-slt").each(function(f, e) {
            var g = $(e);
            $(".list", g).hide()
        }) : $(".list", b).hide())
    }
    ;
    d.prototype.getList = function() {
        return this.obj.find(".list")
    }
    ;
    d.prototype.reset = function() {
        var b = this.list.children().first();
        $("li", this.list).removeAttr("selected");
        b.attr("selected", "selected");
        $(".txt", this.obj).html(b.html());
        b.attr("disabled") || this.change(b)
    }
    ;
    d.prototype.disable = function() {
        this.obj.addClass("disabled");
        this.obj.off("mouseenter.selectMenu");
        this.obj.off("mouseleave.selectMenu");
        this.obj.off("click.selectMenu");
        this.list.find("li").off("click.selectMenu")
    }
    ;
    d.prototype.enable = function() {
        this.obj.removeClass("disabled");
        this.init()
    }
    ;
    return d
}()
  , TabModule = function() {
    function b(e, g) {
        if ("undefined" != typeof e && ("string" == typeof e || e instanceof $ ? (this.obj = $(e),
        this.params = g || {}) : (this.params = e,
        this.obj = $(this.params.item)),
        this.obj.length)) {
            var f = this;
            this.obj.find(".on").length || this.change(this.obj.children().first());
            this.obj.on("click", "li, .tab-i", function(d) {
                var c = $(this);
                f.change(c) && "undefined" != typeof f.params.onChange && f.params.onChange.call(f, c, d)
            });
            this.obj.data("tab-menu", this)
        }
    }
    window.bindTab = b.bind = function(a, d) {
        return new b(a,d)
    }
    ;
    b.create = function(i) {
        var p = $('<ul class="b-slt-tab"></ul>');
        i.wrapper && p.wrap(i.wrapper);
        for (var o = i.items || [], n = 0; n < o.length; n++) {
            var l = o[n]
              , k = $("<li></li>").text(l.name).appendTo(p);
            l.selected && k.addClass("on");
            if (l.attributes) {
                for (var j in l.attributes) {
                    k.attr(j, l.attributes[j])
                }
            }
        }
        i.wrapper && (p = p.parent());
        return p
    }
    ;
    b.prototype.change = function(c) {
        if (c.hasClass("on") || c.attr("disabled")) {
            return !1
        }
        $(".on", this.obj).removeClass("on");
        c.addClass("on");
        return !0
    }
    ;
    b.prototype.value = function(e, g) {
        if (g) {
            var f = this.obj.find("[" + e + '="' + g + '"]');
            this.change(f);
            return f
        }
        return this.obj.find(".on")
    }
    ;
    return b
}();
function IndexNavigator(b) {
    this.config = {
        container: "",
        sortable: !1,
        nav: {},
        block: null 
    };
    this._isIndex = "undefined" != typeof indexBlock ? !0 : !1;
    this.config.block = this._isIndex ? indexBlock : null ;
    this.mergeConfig(b);
    $.isArray(this.config.nav) || (this.config.nav = $.map(this.config.nav, function(d, e) {
        "string" === typeof e && (d.id = e);
        return d
    }));
    this.config.block && this.config.block.live && this.config.nav.unshift({
        id: "live",
        name: "\u76f4\u64ad",
        target: "#b_live"
    });
    this.originNav = this.config.nav.slice();
    this.nav = $('<div class="index-nav" id="index_nav"><div class="border"></div></div>').appendTo("body").css("opacity", 0);
    this.navItems = [];
    this.mask = $("<div>").addClass("wnd-mask");
    this.pointer = $('<div class="pointer-block"></div>').appendTo(this.nav);
    this.navList = $('<div class="nav-list"></div>').appendTo(this.nav);
    this.seq = [];
    this.isMobile = browser.version.mobile || browser.version.android;
    this.init()
}
IndexNavigator.prototype = {
    scrolling: 0,
    customizing: 0,
    apiUrl: "/widget/ajaxIndexSettings",
    localDataName: "index_user_setting",
    Cantor: {
        create: function() {
            var d, c = [1];
            for (d = 1; 12 > d; d++) {
                c[d] = c[d - 1] * d
            }
            return c
        },
        encode: function(h) {
            var g, l, k = h.length, j = this.create(), i = [];
            for (g = 0; g < k; g++) {
                for (l = i[g] = 0; l < g; l++) {
                    h[l] > h[g] && i[l]++
                }
            }
            for (g = h = 0; g < k; g++) {
                h += i[g] * j[k - g - 1]
            }
            return h
        },
        decode: function(j, i) {
            var q, p, o = [], n = [], l = [], k = this.create();
            q = j - 1;
            for (p = 0; 0 <= q; q--,
            p++) {
                o[p] = i / k[q],
                0 != i && (i %= k[q]),
                n[q] = 1
            }
            for (q = 0; q < j; q++) {
                for (p = k = 0; p < j; p++) {
                    if (k += n[p],
                    k > o[q]) {
                        l[q] = p;
                        n[p] = 0;
                        break
                    }
                }
            }
            return l
        }
    },
    init: function() {
        var e, d;
        this.configMap = [];
        this.nameMap = {};
        for (e = 0; e < this.config.nav.length; e++) {
            d = this.config.nav[e].id,
            this.config.block[d] && (this.nameMap[d] = this.configMap.length,
            this.configMap.push(d),
            this.seq.push(d))
        }
        if (this.config.sortable && null  != ChatGetSettings(this.localDataName)) {
            try {
                this.userSettings = JSON.parse(ChatGetSettings(this.localDataName)),
                this.setNavConfig(this.userSettings)
            } catch (f) {}
        }
        this.createNavigator()
    },
    mergeConfig: function(d) {
        if ("object" == typeof d) {
            for (var c in this.config) {
                d.hasOwnProperty(c) && (this.config[c] = d[c])
            }
        }
    },
    createNavigator: function() {
        this.renderNavItem();
        this.config.sortable && this.initCustomize();
        var g = $('<div class="n-i gotop"><div class="btn_gotop" title="\u8fd4\u56de\u9876\u90e8"></div></div>').appendTo(this.navList);
        if (0 == this.navItems.length) {
            var f = g;
            g.addClass("sub").append("<div>\u8fd4\u56de\u9876\u90e8</div>")
        } else {
            f = this.navItems[0].item,
            this.pointer.css({
                top: f.find(".name").position().top,
                left: f.find(".name").position().left
            })
        }
        if (this._isIndex) {
            var j = $('<div class="n-i n-i-mlink"><a href="http://app.bilibili.com/?channel=home_recommend" target="_blank"><div class="mlink-dl-msg"></div><div class="n-i-mlink-bg"></div></a></div>').appendTo(this.navList), i = new Animator({
                element: j.find(".n-i-mlink-bg"),
                frameSource: "http://i0.hdslb.com/u_user/nav_float/tv_animate.png",
                frameWidth: 80,
                frameHeight: 80,
                totalFrame: 16
            }), h;
            j.mouseenter(function() {
                i.start(10);
                h = setTimeout(function() {
                    j.find(".mlink-dl-msg").stop(!0, !0).fadeIn(200)
                }, 500)
            }).mouseleave(function() {
                clearInterval(h);
                i.back();
                j.find(".mlink-dl-msg").stop(!0, !0).fadeOut(200)
            })
        }
        0 < this.navItems.length && this.config.sortable && this._show();
        this.bindScroll();
        this.bindClick(g, "body")
    },
    renderNavItem: function() {
        this.navItems = [];
        this.nav.find(".n-i.sortable").remove();
        for (var f = null , e = 0; e < this.config.nav.length; e++) {
            var h = this.config.nav[e].id;
            if (this.config.block[h]) {
                var g = $('<div class="n-i sortable"><div class="name">' + this.config.nav[e].name + "</div></div>");
                null  == f ? g.prependTo(this.navList) : g.insertAfter(f);
                f = g;
                g.data("data", {
                    key: h,
                    name: this.config.nav[e].name,
                    target: this.config.nav[e].target
                });
                this.bindClick(g, this.config.nav[e].target);
                this.navItems.push({
                    item: g,
                    target: this.config.nav[e].target
                })
            }
        }
    },
    setPosition: function() {
        function f(b) {
            return 0 < $(b).length && g + $(window).scrollTop() < $(b).offset().top + $(b).height() ? $(b).offset().top + $(b).height() : !1
        }
        var e, h = $("body").hasClass("widescreen") ? 20 : 5;
        e = this.config.container ? this.config.container : 0 < $(".main-inner").length ? $(".main-inner") : $(".z_header");
        e = e.offset().left + e.width() + h;
        var g = $(window).height() - this.nav.height() - 50;
        0 > g && (g = 0);
        f(".header") ? g = f(".header") : 0 == $(".header").length && f(".z_top") && (g = f(".z_top"));
        e + this.nav.width() <= $(window).width() ? (e = {
            top: g,
            left: e,
            right: "auto"
        },
        this.nav.removeClass("side")) : (e = {
            top: g,
            left: "auto",
            right: 0
        },
        this.nav.addClass("side"));
        this.nav.css(e)
    },
    setNavConfig: function(h) {
        var g = this.originNav;
        if ("undefined" != typeof h.sort) {
            var l = []
              , k = $.extend({}, this.configMap)
              , j = this.Cantor.decode(this.configMap.length, parseInt(h.sort, 32));
            this.sort(j, function(b) {
                delete k[j[b]];
                l.push(g[j[b]])
            });
            for (var i in k) {
                "function" !== typeof k[i] && l.push(g[i])
            }
            this.config.nav = l
        } else {
            this.config.nav = g.slice()
        }
    },
    sort: function(e, d) {
        this.seq = [];
        for (var f = 0; f < e.length; f++) {
            void 0 !== e[f] && (this.seq.push(this.configMap[e[f]]),
            d && d(f))
        }
    },
    showTip: function() {
        function h(b) {
            b.stopPropagation();
            k.fadeOut(200, function() {
                k.remove();
                g.nav.removeClass("focus")
            });
            l.fadeOut(200, function() {
                l.remove()
            })
        }
        var g = this
          , l = g.tipWnd = $("<div>").addClass("nav-tip")
          , k = g.mask
          , j = $("<div>").addClass("close").appendTo(l)
          , i = $("<div>").addClass("ok").appendTo(l);
        k.appendTo("body").fadeIn();
        l.appendTo("body").fadeIn();
        g.nav.addClass("focus");
        j.on("click", h);
        i.on("click", h)
    },
    loadSetting: function(d) {
        var c = this;
        onLoginInfoLoaded(function(a) {
            window.biliLoginStatus.isLogin && ("undefined" == typeof c.userSettings || c.userSettings.expires && c.userSettings.expires < (new Date).getTime()) && $.ajax({
                url: c.apiUrl,
                type: "post",
                dataType: "json",
                success: function(h) {
                    try {
                        var g = JSON.parse(h.settings);
                        !1 === g && (g = {
                            sort: 0
                        },
                        c.uploadSetting(g),
                        c.showTip());
                        c.saveSetting(g);
                        c.setNavConfig(g);
                        ModuleManage.sort(d || ModuleManage.pageModules[0], c.seq);
                        ModuleManage.lazy()
                    } catch (b) {
                        g = {},
                        c.saveSetting(g)
                    }
                    c.renderNavItem();
                    c.follow()
                }
            })
        })
    },
    uploadSetting: function(b) {
        window.biliLoginStatus && window.biliLoginStatus.isLogin && $.post(this.apiUrl, {
            act: "set",
            settings: JSON.stringify(b)
        })
    },
    saveSetting: function(b) {
        b.expires = (new Date).getTime() + 600000;
        ChatSaveSettings(this.localDataName, JSON.stringify(b));
        this.userSettings = $.extend(!0, {}, b)
    },
    bindClick: function(e, d) {
        var f = this;
        e.click(function() {
            var b = $(d);
            f.customizing && f.isMobile || !b.length || (f.scrolling = 1,
            $("html,body").animate({
                scrollTop: b.offset().top
            }, 200, function() {
                f.scrolling = 0
            }))
        })
    },
    bindScroll: function() {
        var b = this;
        $(window).resize(function() {
            b.setPosition()
        });
        $(window).scroll(function() {
            300 < $(this).scrollTop() || b.config.sortable ? b._show() : b._hide();
            b.customizing || b.follow()
        })
    },
    _show: function() {
        this.nav.show();
        this.setPosition();
        this.nav.stop().animate({
            opacity: 1
        }, 200)
    },
    _hide: function() {
        var b = this;
        b.nav.stop().animate({
            opacity: 0
        }, 200, function() {
            b.nav.hide()
        })
    },
    follow: function() {
        for (var g = $(window), f = -1, j = 0; j < this.navItems.length; j++) {
            var i = this.navItems[j].item
              , h = $(this.navItems[j].target);
            if (h.length && (g.scrollTop() + g.height() / 2 > h.offset().top && g.scrollTop() < h.offset().top + 2 * h.height() / 3) && (this.nav.find(".n-i").removeClass("on"),
            this.pointer.show().css({
                top: i.find(".name").position().top,
                left: i.find(".name").position().left
            }),
            i.addClass("on"),
            f = i.index(),
            g.scrollTop() + g.height() != $(document).height())) {
                break
            }
        }
        -1 == f && (this.nav.find(".n-i").removeClass("on"),
        this.pointer.fadeOut(100))
    },
    initCustomize: function() {
        function j() {
            q.nav.removeClass("customizing");
            q.nav.find(".sort-btn-wrp").remove();
            k.css({
                "background-color": "",
                position: ""
            });
            o.stop().fadeOut(300, function() {
                n.remove();
                p.remove();
                o.remove()
            });
            q.nav.sortable("disable");
            q.follow();
            q.customizing = 0;
            $("body").off("click", j);
            "undefined" == typeof l.sort || "undefined" != typeof q.userSettings.sort && l.sort == q.userSettings.sort || (q.uploadSetting(l),
            q.saveSetting(l))
        }
        function i(f, c) {
            var h = $(c.data("data").target);
            c.prev().hasClass("n-i") ? h.insertAfter(c.prev().data("data").target) : h.insertBefore(c.next().data("data").target);
            ModuleManage.lazy();
            null  == l && (l = {
                sort: 0
            });
            var g = [];
            q.navItems = [];
            q.nav.find(".sortable").each(function(r, e) {
                var s = $(e).data("data");
                q.navItems.push({
                    item: $(e),
                    target: s.target
                });
                g.push(q.nameMap[s.key])
            });
            q.sort(g);
            l.sort = q.Cantor.encode(g).toString(32)
        }
        var q = this;
        q.customContainer = $('<div class="n-i customize" title="\u81ea\u5b9a\u4e49">\u6392\u5e8f</div>').appendTo(q.navList);
        var p = $('<div class="tip"></div>').css("z-index", 10)
          , o = q.mask
          , n = $('<div class="custom-bg"></div>')
          , l = $.extend(!0, {}, q.userSettings);
        delete l.expires;
        var k = this.navList.find(".sortable");
        if (this.isMobile) {
            k.on("click", function() {
                if (q.customizing) {
                    var b = $(this);
                    q.nav.find(".sort-btn-wrp").remove();
                    k.css({
                        "background-color": "",
                        position: ""
                    });
                    var c = $('<div class="sort-btn-wrp"><div class="sort-btn prev">\u4e0a\u79fb</div><div class="sort-btn next">\u4e0b\u79fb</div></div>').css({
                        position: "absolute",
                        left: -53,
                        top: -14,
                        width: 50,
                        zIndex: 30,
                        lineHeight: "30px",
                        fontSize: "16px",
                        backgroundColor: "#ddd",
                        borderRadius: "4px 0 0 4px"
                    }).appendTo(b);
                    b.css({
                        "background-color": "#ddd",
                        position: "relative"
                    });
                    c.find(".prev").on("click", function(e) {
                        e.stopPropagation();
                        var a = b.prev();
                        a.length && a.hasClass("sortable") && (b.insertBefore(b.prev()),
                        i(e, b))
                    });
                    c.find(".next").on("click", function(e) {
                        e.stopPropagation();
                        var a = b.next();
                        a.length && a.hasClass("sortable") && (b.insertAfter(b.next()),
                        i(e, b))
                    })
                }
            })
        }
        q.nav.on("click", function(b) {
            b.stopPropagation()
        });
        q.customContainer.click(function(a) {
            a.stopPropagation();
            q.customizing ? j() : (q.pointer.hide(),
            o.is(":visible") || o.appendTo("body").stop().hide().fadeIn(),
            "undefined" != typeof q.tipWnd && q.tipWnd.fadeOut(200, function() {
                q.tipWnd.remove()
            }),
            n.prependTo(q.nav).show(),
            p.prependTo(q.nav).show(),
            q.nav.removeClass("focus").addClass("customizing"),
            q.nav.find(".on").removeClass("on"),
            q.customModuleInitialized ? q.nav.sortable("enable") : (q.nav.sortable({
                items: ".sortable",
                cancel: ".gotop,.customize",
                update: function(b, d) {
                    i(b, d.item)
                }
            }),
            q.customModuleInitialized = !0),
            q.customizing = 1,
            $("body").on("click", j))
        })
    }
};
window.Captcha = {
    value: null ,
    _tryTime: 0,
    _maxTryTime: 5,
    _query: [],
    _xhr: null ,
    async: !1,
    set: function(d, c) {
        this._query.push([d, c]);
        1 < this._query.length || this._load()
    },
    _load: function() {
        var d = this;
        this._tryTime++;
        if (this._tryTime > d._maxTryTime) {
            for (var c = this._tryTime = 0; c < d._query.length; c++) {
                if (d._query[c] && d._query[c][1]) {
                    d._query[c][1]()
                }
            }
            d._query = []
        } else {
            this._xhr = $.ajax({
                url: utils.protocolRelative("//www.bilibili.com/plus/widget/ajaxGetCaptchaKey.php"),
                dataType: "json",
                async: this.async,
                success: function(a) {
                    window.captcha_key = d.value = a;
                    for (var e = d._tryTime = 0; e < d._query.length; e++) {
                        if (d._query[e] && d._query[e][0]) {
                            d._query[e][0](a)
                        }
                    }
                    d._query = []
                },
                error: function() {
                    setTimeout(function() {
                        d._load()
                    }, 500)
                }
            })
        }
    }
};
var LazyImage = function() {
    function b(d) {
        this.config = {
            distance: 200,
            defaultImg: "http://static.hdslb.com/images/v3images/img_loading.png",
            mode: "wrap"
        };
        for (var e in this.config) {
            d && d.hasOwnProperty(e) && (this.config[e] = d[e])
        }
        this.covers = [];
        this._selector = "[data-img]";
        this.wrapper = '<div class="img-loading"></div>';
        this.init()
    }
    b.prototype.lazy = function(e, g) {
        var f = this;
        $(e).find(this._selector).each(function(d, c) {
            var h = $(c);
            "undefined" != typeof h.attr("loaded") && null  != h.attr("loaded") || f.covers.push({
                element: h,
                callback: g
            })
        });
        this.show()
    }
    ;
    b.prototype.init = function() {
        var c = this;
        $(window).on("scroll.lazyimage", function() {
            c.show()
        })
    }
    ;
    b.prototype.show = function() {
        for (var e = 0; e < this.covers.length; e++) {
            var g = this.covers[e]
              , f = g.element
              , g = g.callback;
            f.attr("loaded") || ("wrap" != this.config.mode || f.parent(".img-loading").length ? "wrap" != this.config.mode && f.attr("src", this.config.defaultImg) : f.wrap(this.wrapper).parent().css({
                background: "#f5f5f5 url(http://static.hdslb.com/images/v3images/img_loading.png) center center no-repeat",
                height: "100%"
            }),
            this._inViewRange(f) && (this.load(f, g),
            this.covers.splice(e, 1),
            e--))
        }
    }
    ;
    b.prototype.load = function(i, p) {
        var o = this
          , n = $("<img />")
          , l = i.attr("data-img")
          , k = new Date
          , j = 0;
        n.on("load", function() {
            var a = 200 > new Date - k ? 0 : 200;
            o.unwrap(i);
            i.attr({
                src: l,
                "data-img": ""
            });
            i.attr("data-alt") && (i.attr("alt", i.attr("data-alt")),
            i.removeAttr("data-alt"));
            p && "function" == typeof p && p(i);
            i.css("opacity", 0).animate({
                opacity: 1
            }, a)
        });
        n.attr("src", l);
        i.attr("alt") && (i.attr("data-alt", i.attr("alt")),
        i.removeAttr("alt"));
        i.attr("loaded", "loaded");
        n.error(function() {
            j++;
            2 >= j ? n.attr("src", l) : o.unwrap(i)
        })
    }
    ;
    b.prototype.unwrap = function(c) {
        "wrap" == this.config.mode && c.parent(".img-loading").length && c.unwrap(this.wrapper)
    }
    ;
    b.prototype._inViewRange = function(c) {
        return c.offset().top + c.outerHeight(!0) > $(window).scrollTop() - this.config.distance && c.offset().top < $(window).scrollTop() + $(window).height() + this.config.distance && c.offset().left + c.outerWidth(!0) >= $(window).scrollLeft() - this.config.distance && c.offset().left <= $(window).scrollLeft() + $(window).width() + this.config.distance
    }
    ;
    return b
}()
  , SliderController = function(b) {
    this.params = $.extend(!0, {
        mode: "click"
    }, b);
    this._mouseIn = !1
}
;
SliderController.prototype = {
    pointer: 0,
    length: 0,
    timer: null ,
    init: function() {
        var d = this
          , c = this.params;
        0 < $(c.parent).find(".p-loading").length ? this.loading = $(c.parent).find(".p-loading") : this.loading = $('<div class="p-loading"></div>');
        this.wrapper = $(c.wrapper).appendTo($(c.parent));
        this.container = $(c.container).prependTo(this.wrapper);
        this.bar = $(c.bar);
        c.barContainer ? this.bar.appendTo(this.wrapper.find(c.barContainer)) : this.bar.appendTo(this.wrapper);
        c.dataSrc && (0 == $(c.parent).find(".p-loading").length && this.loading.appendTo(this.wrapper),
        "string" == typeof c.dataSrc ? $.getJSON(c.dataSrc, function(a) {
            d.loading.remove();
            d.load(a)
        }) : "object" == typeof c.dataSrc && (this.loading.remove(),
        this.load(c.dataSrc)))
    },
    load: function(f) {
        var e = this.params, h;
        if (h = e.onLoad ? e.onLoad(f) : f.list) {
            for (var g in h) {
                "object" == typeof h[g] && (e.onData && !1 !== e.onData(h[g]) || !e.onData) && this.add(h[g])
            }
        }
        0 == this.length && ($('<li class="no-data">\u6ca1\u6709\u6570\u636e</li>').appendTo(this.container),
        this.bar.hide());
        $("[bar]:eq(0)", this.bar).addClass("on");
        this.setTimer();
        e.initCallback && e.initCallback(this.wrapper, f)
    },
    add: function(i, h) {
        var o = this.params
          , n = 100 * this.length
          , l = $(o.barItem);
        l.appendTo(this.bar).attr("bar", "bar");
        var k = this.length;
        0 == this.length && l.addClass("on");
        o.barRenderCallback && o.barRenderCallback(l, i, k);
        var j;
        "function" == typeof o.item ? j = o.item(i, k) : (j = $(o.item),
        $("img", j).attr("src", i.img),
        $("a", j).attr("href", i.link));
        j.attr("preview", "preview");
        j.appendTo(this.container);
        o.renderCallback && o.renderCallback(this.wrapper, i, k, j);
        this.bindBarEvent(l);
        this.bindPreviewEvent(j);
        this.length++;
        this.container.width(n + 100 + "%");
        "undefined" != typeof h && h(this.wrapper, i)
    },
    bind: function() {
        var d = this.params;
        this.wrapper = $(d.wrapper);
        this.container = this.wrapper.find("ul").eq(0);
        this.bar = null ;
        var c = this.container.children();
        this.length = c.length;
        this.container.width(100 * this.length + "%");
        this.bindPreviewEvent(c);
        this.setTimer();
        d.initCallback && d.initCallback(this.wrapper)
    },
    bindBarEvent: function(d) {
        var c = this;
        void 0 !== browser && (browser.version.mobile || browser.version.ios || browser.version.android || browser.version.windowsphone) || d.hover(function() {
            c._mouseIn = !0;
            clearInterval(c.timer);
            "hover" == c.params.mode && c.slide($(this).index())
        }, function() {
            c._mouseIn = !1;
            c.setTimer()
        });
        d.click(function() {
            c.slide($(this).index())
        })
    },
    barHandler: function(b) {
        b = this.bar.find("[bar]").eq(b);
        b.hasClass("on") || (this.bar.find("[bar]").removeClass("on"),
        b.addClass("on"))
    },
    bindPreviewEvent: function(d) {
        var c = this;
        d.hover(function() {
            clearInterval(c.timer)
        }, function() {
            c.setTimer()
        })
    },
    slide: function(d) {
        var c = this.params;
        this.pointer = d;
        this._mouseIn || this.setTimer();
        this.container.stop(!0, !0).animate({
            "margin-left": 100 * -d + "%"
        }, 200);
        this.barHandler(d);
        c.slideCallback && c.slideCallback(this.wrapper, d)
    },
    setTimer: function() {
        var d = this
          , c = this.params;
        clearInterval(this.timer);
        0 != c.timeout && 1 != this.length && (this.timer = setInterval(function() {
            d.next();
            d.bar && ($("[bar]", d.bar).removeClass("on"),
            $("[bar]:eq(" + d.pointer + ")", d.bar).addClass("on"))
        }, c.timeout || 5000))
    },
    next: function() {
        this.pointer = this.pointer < this.length - 1 ? this.pointer + 1 : 0;
        this.slide(this.pointer)
    },
    prev: function() {
        this.pointer = 0 < this.pointer ? this.pointer - 1 : this.length - 1;
        this.slide(this.pointer)
    },
    destroy: function() {
        clearInterval(this.timer);
        this.wrapper.remove()
    }
};
(function(e) {
    function d(a) {
        this.options = {
            appendTo: "body",
            target: null ,
            container: '<ul class="bilibili-suggest"></ul>',
            css: {},
            position: null ,
            positionOffset: {
                top: 0,
                left: 0
            },
            minLength: 1,
            delay: 300,
            disabled: !1,
            menuItem: "menuItem",
            useBuffer: !0,
            source: null ,
            defaultSource: null ,
            renderMenu: this.renderMenu,
            renderItem: this.renderItem,
            create: function() {},
            select: function() {},
            change: function() {},
            search: function() {},
            response: function() {},
            open: function() {},
            close: function() {},
            focus: function() {}
        };
        this.merge(a);
        this.options._super = this;
        this.namespace = "bilibiliSuggest";
        this.$container = e(this.options.container);
        this.$target = e(this.options.target);
        this.elements = this._getMenuItem();
        this.source = {};
        this.value = this._value();
        this.selectedItem = null ;
        this.tempValue = this.value;
        this.delayTimer = null ;
        this.dataBuffer = {};
        this.enterLock = 0;
        this.cancelSearch = !1;
        this.loading = 0
    }
    var f = 0;
    d.prototype = {
        escapeRegex: function(b) {
            return b.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        },
        filter: function(a, h) {
            var g = RegExp(this.escapeRegex(h), "i");
            return e.grep(a, function(b) {
                return g.test(b.label || b.value || b)
            })
        },
        init: function() {
            var g = this;
            this._create();
            this._initSource("source");
            this._initSource("defaultSource");
            var c = this.namespace;
            this.$target.data(c, this);
            this.options.target.off("." + c);
            this.options.target.on("keydown." + c, function(a) {
                switch (a.keyCode) {
                case 38:
                    g._move(a, "up");
                    break;
                case 40:
                    g._move(a, "down");
                    break;
                case 9:
                    g._isActive() && g._select(a);
                    break;
                case 13:
                    g._isActive() && (a.preventDefault(),
                    g._select(a));
                    break;
                case 27:
                    g.$container.is(":visible") && (g._value(g.value),
                    g.close(a),
                    a.preventDefault())
                }
            }).on("input." + c, function(a) {
                g._change(a)
            }).on("focusout." + c, function(a) {
                g.cancelBlur ? delete g.cancelBlur : (clearTimeout(g.delayTimer),
                g.close(a))
            }).on("focus." + c, function(a) {
                g._change(a)
            });
            return this
        },
        _change: function(b) {
            this.options.disabled || (this.value = this._value(),
            this.tempValue == this.value && "focus" != b.type) || (this.tempValue = this.value,
            b.stopPropagation(),
            this.search(b),
            this._trigger("change", b, {
                item: this.selectedItem
            }))
        },
        _move: function(j, i) {
            if (this.$container.is(":visible")) {
                this.enterLock = 0;
                var n, l;
                this.selectedItem = null ;
                "up" == i ? (n = "last",
                l = -1) : (n = "first",
                l = 1);
                if (0 == this._getMenuItemFocused().length) {
                    this.selectedItem = this.elements[n]().addClass("focus")
                } else {
                    n = this._getMenuItemFocused().index("[role=" + this.options.menuItem + "]");
                    this.elements.removeClass("focus");
                    var k = n + l;
                    0 <= k && k < this.elements.length && (this.selectedItem = this.elements.filter(":eq(" + (n + l) + ")").addClass("focus"))
                }
                null  != this.selectedItem ? (this.selectedItem.position().top + this.selectedItem.outerHeight() >= this.$container.height() ? this.$container.scrollTop(this.$container.scrollTop() + (this.selectedItem.position().top + this.selectedItem.outerHeight() - this.$container.height())) : 0 > this.selectedItem.position().top && this.$container.scrollTop(this.$container.scrollTop() + this.selectedItem.position().top),
                this._focus(j)) : this._value(this.value);
                j.preventDefault()
            }
        },
        _isActive: function() {
            return this.$container.is(":visible") && this.selectedItem
        },
        _getMenuItem: function() {
            return this.$container.find("[role=" + this.options.menuItem + "]")
        },
        _getMenuItemFocused: function() {
            return this._getMenuItem().filter(".focus")
        },
        merge: function(g) {
            if ("object" == typeof g) {
                for (var c in this.options) {
                    g.hasOwnProperty(c) && (this.options[c] = g[c])
                }
            }
        },
        _trigger: function() {
            var g = Array.prototype.slice.call(arguments, 0)
              , c = g.shift();
            if (this.options[c]) {
                return this.options[c].apply(this, g)
            }
        },
        _create: function() {
            this._setPos();
            this.$container.appendTo(this.options.appendTo).hide();
            "object" == typeof this.options.css && this.$container.css(this.options.css);
            this._trigger("create")
        },
        enable: function() {
            this.options.disabled = !1
        },
        disable: function() {
            clearTimeout(this.delayTimer);
            this.options.disabled = !0
        },
        destroy: function() {
            clearTimeout(this.delayTimer);
            this.$target.removeData(this.namespace);
            this.$target.off("." + this.namespace);
            this.$container.remove()
        },
        _setPos: function() {
            var b = this.options.position || {};
            this.options.position || (b.top = this.$target.offset().top + this.$target.outerHeight(),
            b.left = this.$target.offset().left);
            this.$container.css({
                top: b.top + this.options.positionOffset.top,
                left: b.left + this.options.positionOffset.left
            })
        },
        _open: function(b) {
            this._setPos();
            this.$container.show();
            this._trigger("open", this.$container, b)
        },
        close: function() {
            this.cancelSearch = !0;
            this._close()
        },
        _close: function(b) {
            this.$container.hide();
            this._trigger("close", this.$container, b)
        },
        _initSource: function(a) {
            var j, i, h = this;
            e.isArray(this.options[a]) ? (j = this.options[a],
            this.source[a] = function(g, c) {
                c(h.filter(j, g.term))
            }
            ) : "string" === typeof this.options[a] ? (i = this.options[a],
            this.source[a] = function(g, k) {
                h.xhr && h.xhr.abort();
                h.xhr = e.ajax({
                    url: i,
                    data: g,
                    dataType: "json",
                    success: function(b) {
                        k(b)
                    },
                    error: function() {
                        k([])
                    }
                })
            }
            ) : this.source[a] = this.options[a]
        },
        search: function(g) {
            var c = this;
            clearTimeout(this.delayTimer);
            this.delayTimer = setTimeout(function() {
                c.selectedItem = null ;
                c._search(null , g)
            }, this.options.delay)
        },
        _search: function(a, h) {
            a = null  != a ? a : this._value();
            this.value = this._value();
            var g = "source";
            this.cancelSearch = !1;
            if (!this._value()) {
                g = "defaultSource"
            } else {
                if (this._value().length < this.options.minLength) {
                    this.close(h);
                    return
                }
            }
            if (!1 === this._trigger("search", h)) {
                this.close(h)
            } else {
                if (this.options.useBuffer && "undefined" != typeof this.dataBuffer[a] && !e.isArray(this.source[g])) {
                    this._response(this.dataBuffer[a])
                } else {
                    if (this.source[g] && (this.loading++,
                    this.$container.addClass("loading"),
                    "function" == typeof this.source[g])) {
                        this.source[g]({
                            term: a
                        }, this.response(a))
                    }
                }
            }
        },
        response: function(g) {
            var c = this
              , h = ++f;
            return function() {
                g && (c.dataBuffer[g] = arguments[0]);
                h === f && c._response.apply(c, arguments);
                c.loading--;
                c.loading || c.$container.removeClass("loading")
            }
        },
        _response: function(b) {
            b = this._normalize(b);
            this.render(b)
        },
        render: function(a) {
            this.$container.empty();
            var g = this;
            this.options.disabled || !a || e.isArray(a) && !a.length || this.cancelSearch || !1 === this._trigger("response", a) ? this._close() : (this._open(),
            this._renderMenu(this.$container, a),
            /AppleWebKit.*Mobile.*/i.test(navigator.userAgent) || e("<iframe></iframe>").css({
                position: "absolute",
                left: "0px",
                top: "0px",
                width: "100%",
                height: "100%",
                border: "none",
                zIndex: -1
            }).attr({
                border: 0,
                frameborder: "no"
            }).appendTo(this.$container),
            this.elements = this._getMenuItem(),
            this.elements.on("mousedown", function(b) {
                b.preventDefault();
                g.cancelBlur = !0;
                g._delay(function() {
                    delete g.cancelBlur
                })
            }).on("click", function(b) {
                g._select(b)
            }).on("mouseenter", function(c) {
                var h = e(this);
                g.enterLock = 1;
                g._getMenuItem().removeClass("focus");
                h.addClass("focus");
                g.selectedItem = h;
                g._focus(c)
            }).on("mouseleave", function(c) {
                c = e(this);
                g.enterLock = 0;
                c.removeClass("focus");
                g.selectedItem = null 
            }))
        },
        _renderMenu: function(g, c) {
            this._trigger("renderMenu", g, c)
        },
        renderMenu: function(a, h) {
            var g = this;
            e.each(h, function(b, i) {
                g._renderItem(a, i)
            })
        },
        _renderItem: function(g, c) {
            this._trigger("renderItem", g, c).attr("role", this.options.menuItem).data("item", c)
        },
        renderItem: function(a, g) {
            return e("<li>").addClass("suggest-item").attr({
                "data-value": g.value
            }).append(e("<div>").text(g.value)).appendTo(a)
        },
        _normalize: function(a) {
            return !e.isArray(a) || a.length && a[0].label && a[0].value ? a : e.map(a, function(c) {
                return "string" === typeof c ? {
                    label: c,
                    value: c
                } : e.extend({
                    label: c.label || c.value,
                    value: c.value || c.label
                }, c)
            })
        },
        _select: function(g) {
            var c = this.selectedItem.data("item");
            if (!this.enterLock || g.originalEvent && !/^key/.test(g.originalEvent.type)) {
                this.value = this.tempValue = this._value(c.value)
            }
            this._trigger("select", g, {
                item: c
            });
            this.close()
        },
        _focus: function(g) {
            var c = this.selectedItem.data("item");
            !0 === this._trigger("focus", g, {
                item: c
            }) && (g.originalEvent && /^key/.test(g.originalEvent.type)) && this._value(c.value)
        },
        _value: function(b) {
            b && this.$target.val(b);
            return this.$target.val()
        },
        _delay: function(b) {
            setTimeout(b, 0)
        }
    };
    e.fn.bilibiliSuggestion = function(b) {
        b.target = this;
        return (new d(b)).init()
    }
})(jQuery);
var SearchHistory = {
    history: [],
    suggestions: [],
    maxCount: 10,
    syncCallbacks: [],
    init: function(d, c) {
        d && (this.suggestions.push(d),
        this.read(),
        this.sync());
        this.config = c || {};
        this.config.syncCallback && this.syncCallbacks.push(this.config.syncCallback)
    },
    read: function() {
        ChatGetSettings("search_history") && "undefined" != typeof JSON && (this.history = JSON.parse(ChatGetSettings("search_history")) || [],
        $.isArray(this.history) || (this.history = []));
        return this.history
    },
    save: function(h) {
        var g = this.history, l;
        l = "object" == typeof h ? h : {
            value: h
        };
        if ($.trim(l.value) && encodeURIComponent(l.value)) {
            h = {
                value: $.trim(l.value),
                isHistory: 1,
                timestamp: Date.parse(new Date)
            };
            l.url && (h.url = l.url);
            l = g.length;
            for (var k = !1, j = 0; j < l; j++) {
                if (g[j].value == h.value) {
                    g[j] = h;
                    k = !0;
                    break
                }
            }
            k || (l < this.maxCount ? g.push(h) : g[l - 1] = h);
            g = g.sort(function(d, c) {
                return d.timestamp > c.timestamp ? -1 : d.timestamp < c.timestamp ? 1 : 0
            });
            try {
                ChatSaveSettings("search_history", JSON.stringify(g))
            } catch (i) {}
            this.sync()
        }
    },
    remove: function(e) {
        for (var d = 0; d < this.history.length; d++) {
            if (this.history[d].value == e) {
                this.history.splice(d, 1);
                try {
                    ChatSaveSettings("search_history", JSON.stringify(this.history))
                } catch (f) {}
                this.sync();
                break
            }
        }
    },
    sync: function() {
        for (var g = this.history, f = this.suggestions, j = 0; j < f.length; j++) {
            var i = f[j].options.defaultSource;
            if (i.length != g.length || g.length && i.length && i[0] != g[0]) {
                i.splice(0, i.length);
                for (var h = 0; h < g.length; h++) {
                    i.push(g[h])
                }
            }
        }
        for (g = 0; g < this.syncCallbacks.length; g++) {
            this.syncCallbacks[g](this.history)
        }
    },
    clear: function(b) {
        this.history = [];
        ChatSaveSettings("search_history", null );
        this.sync();
        b && b()
    }
};
function FakeDanmu(d) {
    this.messages = [];
    this.elems = [];
    this.config = {
        delay: 1,
        rows: 2,
        lifeTime: 5,
        width: 300,
        height: 200,
        parent: null ,
        messages: null ,
        aid: null ,
        cssProfix: "fake_danmu_gen",
        textStyle: 'color: #fff;font-size: 12px;font-family: "Microsoft Yahei", simhei, "\u9ed1\u4f53";display: inline;position: absolute;white-space: pre;pointer-events: none;opacity: 0.95;text-shadow: 1px 1px 2px #001;visibility: hidden'.split(";")
    };
    this.setConfig(d);
    this.duration = this.config.lifeTime;
    this.delayTimer = this.loopTimer = 0;
    this.loadState = FakeDanmu.READY;
    this.paused = !0;
    this.id = FakeDanmu._id++;
    null  == FakeDanmu.styleElement && (FakeDanmu.styleElement = document.createElement("style"),
    (document.head || document.getElementsByTagName("head")[0]).appendChild(FakeDanmu.styleElement));
    try {
        FakeDanmu.styleElement.innerHTML = "." + this.config.cssProfix + "_shared{\r\n" + this.config.textStyle.join(";\r\n") + ";\r\n}\r\n"
    } catch (c) {
        FakeDanmu.enabled = !1,
        this.loadState = FakeDanmu.COMPLETE
    }
}
FakeDanmu._id = 0;
FakeDanmu.enabled = !0;
FakeDanmu.READY = 0;
FakeDanmu.LOADING = 1;
FakeDanmu.COMPLETE = 2;
FakeDanmu.prototype = {
    constructor: FakeDanmu,
    init: function(b) {
        this.messages = b;
        this.render()
    },
    setConfig: function(d) {
        if ("object" == typeof d) {
            for (var c in this.config) {
                d.hasOwnProperty(c) && (this.config[c] = d[c])
            }
        }
    },
    render: function() {
        this.elems = [];
        this.duration = this.config.lifeTime;
        var d;
        for (d = 0; d < this.messages.length; d++) {
            var c = this.renderText(this.messages[d]);
            this.insertText(c)
        }
        this.restoreStyle()
    },
    restoreStyle: function() {
        var e = [], d;
        e.push("." + this.config.cssProfix + "_shared{\r\n" + this.config.textStyle.join(";\r\n") + ";\r\n}\r\n");
        for (d = 0; d < this.elems.length; d++) {
            var f = this.elems[d];
            e.push("." + f.cssClass + "{\r\n" + f.cssText + "\r\n}\r\n")
        }
        FakeDanmu.styleElement.innerHTML = e.join("")
    },
    renderText: function(d) {
        var c = document.createElement("div");
        c.appendChild(document.createTextNode(d));
        c.className = this.config.cssProfix + "_shared";
        this.config.parent.appendChild(c);
        return {
            elem: c,
            width: c.offsetWidth,
            height: c.offsetHeight
        }
    },
    insertText: function(i) {
        var h = this.elems.length
          , o = h * this.config.lifeTime / this.config.rows / this.config.rows
          , n = i.height * (h % this.config.rows)
          , l = this.config.lifeTime
          , k = i.elem;
        this.duration = o + l;
        var j = [];
        j.push("visibility: visible");
        j.push("top: " + n + "px");
        j.push("left: " + this.config.width + "px");
        j.push("transform: translateX(-" + (this.config.width + i.width) + "px)");
        j.push("transition: transform " + l + "s linear " + o + "s");
        this.elems.push({
            elem: k,
            cssClass: this.config.cssProfix + "_" + h,
            cssText: j.join(";\r\n") + ";"
        })
    },
    pause: function() {
        this.paused = !0;
        if (0 < this.config.delay && 0 != this.delayTimer) {
            clearTimeout(this.delayTimer),
            this.delayTimer = 0
        } else {
            if (this.loadState == FakeDanmu.COMPLETE) {
                var b;
                for (b = 0; b < this.elems.length; b++) {
                    this.elems[b].elem.className = this.config.cssProfix + "_shared"
                }
                this.loopTimer && clearTimeout(this.loopTimer);
                this.loopTimer = 0
            }
        }
    },
    play: function() {
        var b = this;
        this.paused = !1;
        0 < this.config.delay ? (0 != this.delayTimer && clearTimeout(this.delayTimer),
        this.delayTimer = setTimeout(function() {
            b.delayHandler()
        }, 1000 * this.config.delay)) : this._play()
    },
    _play: function() {
        if (this.loadState != FakeDanmu.COMPLETE) {
            this.delayHandler()
        } else {
            var e = this, d;
            for (d = 0; d < this.elems.length; d++) {
                var f = this.elems[d];
                f.elem.className = this.config.cssProfix + "_shared " + f.cssClass
            }
            this.loopTimer && clearTimeout(this.loopTimer);
            this.loopTimer = setTimeout(function() {
                e.restartHandler()
            }, 1000 * this.duration)
        }
    },
    restartHandler: function() {
        this.loopTimer = 0;
        this.pause();
        var b = this;
        this.loopTimer = setTimeout(function() {
            b._play()
        }, 100)
    },
    load: function(d) {
        if (this.loadState == FakeDanmu.READY) {
            this.loadState = FakeDanmu.LOADING;
            var c = this;
            $.getJSON("/widget/ajaxGetComment?aid=" + d, function(b) {
                c.loadState = b ? FakeDanmu.COMPLETE : FakeDanmu.READY;
                b && (c.init(b),
                c.paused || c._play())
            })
        }
    },
    delayHandler: function() {
        clearTimeout(this.delayTimer);
        this.delayTimer = 0;
        this.loadState == FakeDanmu.COMPLETE ? this._play() : this.loadState == FakeDanmu.READY && (this.config.aid ? this.load(this.config.aid) : this.config.messages && (this.loadState = FakeDanmu.COMPLETE,
        this.init(this.config.messages),
        this._play()))
    }
};
FakeDanmu.play = function(d) {
    if (FakeDanmu.enabled) {
        var c = d.parent;
        c.fakeDanmu ? c.fakeDanmu.restoreStyle() : c.fakeDanmu = new FakeDanmu(d);
        c.fakeDanmu.play();
        return c.fakeDanmu
    }
}
;
FakeDanmu.pause = function(d) {
    if (FakeDanmu.enabled) {
        var c = d.parent;
        c.fakeDanmu || (c.fakeDanmu = new FakeDanmu(d));
        c.fakeDanmu.pause();
        return c.fakeDanmu
    }
}
;
Date.prototype.format = function(e) {
    var d = {
        "M+": this.getMonth() + 1,
        "d+|D+": this.getDate(),
        "h+|H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    /(y+|Y+)/.test(e) && (e = e.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (var f in d) {
        RegExp("(" + f + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? d[f] : ("00" + d[f]).substr(("" + d[f]).length)))
    }
    return e
}
;
function addReturnToMobile() {
    if (browser.version.mobile && !browser.version.iPad) {
        $('<div class="goto-mobile"><div class="bg"></div></div>').appendTo("body").on("click", function() {
            __SetCookie("nmr", 0);
            window.location.reload()
        })
    }
}
function bbChannel(b) {
    this._channel_id = b;
    this._notifyHandlers = [];
    this._notifyHandlers[101] = this._emitRefreshFunctions.bind(this);
    this._pushRefreshFunctions = [];
    this._heartbeatTimer = 0;
    this._init()
}
bbChannel._debug = !1;
bbChannel.prototype = {
    constructor: bbChannel,
    _init: function() {
        window.WebSocket ? this._connect() : this._log("no websocket!")
    },
    _connect: function() {
        this._conn = new WebSocket("ws://notification.bilibili.com:88/" + this._channel_id,"binary");
        this._conn.onopen = this._onOpen.bind(this);
        this._conn.onmessage = this._onMessage.bind(this);
        this._conn.onerror = this._onError.bind(this);
        this._conn.onclose = this._onClose.bind(this)
    },
    _onOpen: function(b) {
        this._heartbeatTimer = setInterval(this._onHeartbeatHandler.bind(this), 30000)
    },
    _onHeartbeatHandler: function() {
        this._conn.readyState == WebSocket.OPEN && this._conn.send("0102")
    },
    _onMessage: function(e) {
        if (7 == parseInt("0x" + e.data.substr(0, 4))) {
            try {
                var d = JSON.parse(e.data.substr(4));
                this._notifyHandlers[d.index] && (this._log("call func:", d),
                this._notifyHandlers[d.index](d.index, d.payload))
            } catch (f) {}
        }
    },
    _onError: function(b) {},
    _onClose: function(b) {
        clearInterval(this._heartbeatTimer);
        this._heartbeatTimer = 0;
        setTimeout(this._reConnect.bind(this), 1000 + Math.floor(1000 * Math.random()))
    },
    _reConnect: function() {
        this._log("_reConnect ...");
        this._connect()
    },
    _emitRefreshFunctions: function(e, d) {
        for (var f = 0; f < this._pushRefreshFunctions.length; f++) {
            this._pushRefreshFunctions[f].call(null , d)
        }
    },
    _log: function(b) {
        this.constructor._debug && console.log(b)
    },
    setPacketHandler: function(d, c) {
        this._log("set handler for:", d);
        this._notifyHandlers[d] = c
    },
    addRefreshHandler: function(b) {
        this._pushRefreshFunctions.push(b)
    },
    removeRefreshHandler: function(b) {
        b = this._pushRefreshFunctions.indexOf(b);
        -1 != b && this._pushRefreshFunctions.splice(b, 1)
    }
};
var RequireModule = function() {
    function f(i, c) {
        if ($.isPlainObject(i)) {
            for (var j in i) {
                register(j, i[j])
            }
        } else {
            h[i] = c
        }
        return c
    }
    var e = {}
      , h = {}
      , g = "https:" === window.location.protocol ? "https://static-s.bilibili.com/" : "http://static.hdslb.com/";
    return {
        registerScript: f,
        getScript: function(c, b, a) {
            2 == arguments.length && "function" === typeof b ? (a = b,
            b = g + (h[c] || f(c, c))) : 1 == arguments.length && (b = g + (h[c] || f(c, c)));
            window[c] ? a && a(window[c]) : e[c] || (e[c] = e[c] || [],
            a && e[c].push(a),
            $.ajax({
                url: b,
                dataType: "script",
                cache: !0,
                success: function(d) {
                    for (; d = e[c].shift(); ) {
                        d(window[c])
                    }
                    delete e[c]
                }
            }))
        }
    }
}()
  , Animator = function(d) {
    function c(a) {
        this.frameTimer = null ;
        this.framePos = 0;
        this.reverse = !1;
        a = this.options = d.extend({
            element: "",
            frameSource: "",
            frameWidth: 16,
            frameHeight: 16,
            totalFrame: 0,
            fps: 16,
            frameTimer: null ,
            animationList: {},
            orientationLandscape: !0
        }, a);
        if (!a.element) {
            return !1
        }
        a.element.css({
            display: "block",
            backgroundImage: "url(" + a.frameSource + ")",
            width: a.frameWidth,
            height: a.frameHeight,
            backgroundPosition: "0px 0px"
        })
    }
    c.prototype.loadAnimation = function(f) {
        var e = this.options;
        if (e.animationList && e.animationList[f]) {
            this.move(e.animationList[f].endFrame, e.animationList[f].loopFrame)
        } else {
            return !1
        }
    }
    ;
    c.prototype.move = function(h, g) {
        var j = this
          , i = this.options;
        clearInterval(j.frameTimer);
        this.reverse = !1;
        j.frameTimer = setInterval(function() {
            j._animate(h, g)
        }, 1000 / i.fps)
    }
    ;
    c.prototype._animate = function(f, e) {
        if ("undefined" !== typeof e) {
            e = parseInt(e - 1) >> 0,
            this.framePos == f ? (this.framePos > e ? this.framePos-- : this.framePos++,
            this.reverse = !0) : this.reverse ? this.framePos == e ? (this.reverse = !1,
            this.framePos > f ? this.framePos-- : this.framePos++) : this.framePos > e ? this.framePos-- : this.framePos++ : this.framePos > f ? this.framePos-- : this.framePos++
        } else {
            if (this.framePos == f) {
                return clearInterval(this.frameTimer),
                !0
            }
            this.framePos > f ? this.framePos-- : this.framePos++
        }
        this._setPosition(this.framePos)
    }
    ;
    c.prototype._setPosition = function(h, g) {
        var j = this.options;
        if (!j.element) {
            return !1
        }
        var i = h ? h : this.framePos;
        j.element.css("backgroundPosition", -(j.orientationLandscape ? j.frameWidth * i : j.frameWidth) + "px " + -(j.orientationLandscape ? j.frameHeight : j.frameHeight * i) + "px")
    }
    ;
    c.prototype.start = function(b) {
        this.move(this.options.totalFrame - 1, b)
    }
    ;
    c.prototype.back = function(b) {
        this.move(0, b)
    }
    ;
    return c
}(jQuery);
$(function() {
    $("body").on("mouseover", ".v .preview", function() {
        var b = $(this).closest(".v").find("a").attr("href").match(/av(\d+)/);
        b && FakeDanmu.play({
            width: 180,
            height: 110,
            parent: this,
            aid: b[1]
        })
    }).on("mouseout", ".v .preview", function() {
        var b = $(this).closest(".v").find("a").attr("href").match(/av(\d+)/);
        b && FakeDanmu.pause({
            width: 180,
            height: 110,
            parent: this,
            aid: b[1]
        })
    });
    0 == $("#index_container").length && 0 < $(".header .num").length && new IndexNavigator;
    $("#search-keyword").focus(function() {
        $(this).closest(".search").addClass("focus")
    });
    $("#search-keyword").focusout(function() {
        $(this).closest(".search").removeClass("focus")
    });
    if ("undefined" != typeof countInfo) {
        for (var e, d = 0; d < tidSet.length; d++) {
            e = tidSet[d],
            "undefined" != typeof countInfo["c" + e] && countInfo["c" + e] && 0 != countInfo["c" + e] && ($(".addnew_" + e).html(countInfo["c" + e]),
            $(".addnew_" + e).fadeIn(500))
        }
    }
    var f = window.suggestionOpt = {
        suggestType: "accurate",
        subType: "tag",
        historyLen: 5,
        form: $("#searchform"),
        submitTarget: "_blank",
        css: {
            minWidth: 240,
            maxWidth: 360
        },
        positionOffset: {
            top: 4,
            left: -14
        },
        source: function(g, c) {
            var h = $.trim(g.term);
            $.getJSON("http://s.search.bilibili.com/main/suggest?jsoncallback=?", {
                func: "suggest",
                suggest_type: f.suggestType,
                sub_type: f.subType,
                main_ver: "v1",
                highlight: "",
                userid: window.uid || 0,
                bangumi_acc_num: 1,
                special_acc_num: 1,
                topic_acc_num: 1,
                upuser_acc_num: 3,
                tag_num: 10,
                special_num: 10,
                bangumi_num: 10,
                upuser_num: 3,
                term: h,
                rnd: Math.random()
            }, function(b) {
                b.result ? c(b.result) : c(null )
            })
        },
        defaultSource: SearchHistory.read(),
        search: function() {
            var b = $.trim(this.value);
            if (this.value && !b || 255 > b.charCodeAt(0) && 1 > b.length || 40 < b.length) {
                return !1
            }
        },
        open: function(g, c) {
            360 > $(window).width() - g.offset().left ? g.css("max-width", $(window).width() - g.offset().left - 2) : g.css("max-width", 360)
        },
        focus: function(g, c) {
            return !1
        },
        select: function(g, c) {
            c.item && SearchHistory.save(c.item);
            if (c.item.url) {
                return "click" != g.type && window.open(c.item.url, f.submitTarget || "_blank"),
                !1
            }
            var h = "";
            c.item.isHistory && f.form.find("[name=type]").length && (h = f.form.find("[name=type]").val(),
            f.form.find("[name=type]").val("comprehensive"));
            f.form.submit();
            c.item.isHistory && f.form.find("[name=type]").length && f.form.find("[name=type]").val(h);
            return !1
        },
        renderMenu: function(w, v) {
            var u = this;
            if ($.isArray(v)) {
                $.each(v, function(a, g) {
                    if (!g.isHistory) {
                        delete g.url
                    } else {
                        if (f.historyLen && a >= f.historyLen) {
                            return
                        }
                    }
                    u._renderItem(w, g)
                })
            } else {
                var t = 0;
                if (v.accurate) {
                    var s = $('<li class="acc"></li>').appendTo(w), o;
                    for (o in v.accurate) {
                        if ("tag" != o) {
                            if ("upuser" == o) {
                                var q = $('<li class="up"><a href="/search?keyword=' + this.value + '&type=up" target="_blank"><div class="b-line"><p><span>UP\u4e3b</span></p></div></a></li>').appendTo(w);
                                $.each(v.accurate[o], function(h, g) {
                                    g.TYPE = "upuser";
                                    u._renderItem(q, g);
                                    t++
                                })
                            } else {
                                $.each(v.accurate[o], function(h, g) {
                                    g.TYPE = "accurate";
                                    g.STYPE = o;
                                    u._renderItem(s, g);
                                    t++
                                })
                            }
                        }
                    }
                }
                var i = f.subType
                  , j = v[i];
                "video" == i && (j = v.tag);
                if (j && j.length) {
                    var i = f.form.find("[name=type]").length ? f.form.find("[name=type]").val() || "comprehensive" : "comprehensive"
                      , c = $('<li class="kw"><a href="/search?keyword=' + this.value + "&type=" + i + '" target="_blank"><div class="b-line"><p><span>\u5173\u952e\u8bcd</span></p></div></a></li>').appendTo(w);
                    $.each(j, function(h, g) {
                        delete g.url;
                        g.TYPE = "tag";
                        u._renderItem(c, g);
                        t++
                    })
                }
                w.find(".b-line").on("mousedown", function(b) {
                    b.preventDefault()
                });
                0 == t && this.close()
            }
        },
        renderItem: function(i, c) {
            var l, k = this;
            if (c.isHistory) {
                i.find(".history-t").length || $('<div class="b-line history-t"><p><span>\u5386\u53f2\u641c\u7d22</span></p></div>').appendTo(i);
                var j = $("<div class='cancel'></div>").click(function(b) {
                    b.stopPropagation();
                    b.preventDefault();
                    $(this).parent().remove();
                    k._getMenuItem().length || k.close();
                    SearchHistory.remove(c.value)
                });
                l = c.isHistory && c.url ? $('<a href="' + c.url + '"></a>').attr("target", f.submitTarget || "_blank") : $("<li>");
                l.addClass("suggest-item").attr("data-value", c.value).append($("<a>").text(c.value)).append(j).appendTo(i);
                return l
            }
            switch (c.TYPE) {
            case "tag":
                l = $("<li>").append("<a>" + c.name + "</a>");
                break;
            case "accurate":
                l = $('<a href="' + c.url + '" target="_blank"><div class="r-item"><div class="preview"><img src="' + (c.s_pic || c.tp_pic) + '" /></div><div class="info"><div class="t"><span class="type"></span>' + c.name + '</div><div class="v-info"><span class="sub">\u8ba2\u9605\uff1a' + formatFriendlyNumber(c.favourite) + '</span><span class="view">\u6d4f\u89c8\uff1a' + formatFriendlyNumber(c.click) + "</span></div></div></div></a>");
                switch (c.STYPE) {
                case "bangumi":
                    l.addClass("bangumi").prependTo(i).find(".type").html("\u756a\u5267");
                    $('<div class="bgm-info">\u66f4\u65b0\u81f3\uff1a' + (c.isbangumi_end ? "<span>\u5df2\u5b8c\u7ed3</span> / \u5171" + c.bgmcount + "\u8bdd</div>" : "<span>\u7b2c" + c.bgmcount + "\u8bdd</span>") + "</div>").insertAfter(l.find(".t"));
                    break;
                case "special":
                    l.addClass("special").find(".type").html("\u4e13\u9898");
                    break;
                case "topic":
                    l.addClass("topic").find(".type").html("\u8bdd\u9898"),
                    l.find(".sub").html("\u53d1\u5e03\uff1a" + c.writer),
                    $('<div class="pubdate">\u65f6\u95f4\uff1a' + (new Date(1000 * c.pubdate)).format("yyyy-MM-dd") + "</div>").insertAfter(l.find(".t"))
                }
                break;
            case "upuser":
                l = $('<a href="' + c.url + '" target="_blank">' + c.name + "</a>");
                break;
            default:
                l = $("<li>").append("<a>" + c.name + "</a>")
            }
            c.url && l.attr("target", f.submitTarget || "_blank");
            l.addClass("suggest-item").attr("data-value", c.value).appendTo(i);
            return l
        }
    };
    0 < $(".search-keyword").length && (e = $("#search-keyword").bilibiliSuggestion(f),
    SearchHistory.init(e),
    $("#searchform").append('<input type="hidden" name="type" value="comprehensive">'),
    $("#searchform").on("submit", function() {
        var b = $("#search-keyword");
        "" == b.val() && b.attr("data-recommend") && b.val(b.attr("data-recommend"));
        SearchHistory.save($("#search-keyword").val())
    }),
    $.getJSON("/widget/getSearchDefaultWords", function(b) {
        b && b.length && (b = b[Math.floor(Math.random() * b.length)],
        $("#search-keyword").attr({
            placeholder: b.show,
            "data-recommend": b.word
        }))
    }));
    $.support.opacity || ($('input[placeholder!=""][type=text]').blur(function() {
        var b = $(this).attr("placeholder");
        b && "" === this.value && (this.value = b,
        this.style.color = "graytext")
    }),
    $('input[placeholder!=""][type=text]').focus(function() {
        var b = $(this).attr("placeholder");
        b && (this.value === b && (this.value = ""),
        this.style.color = "")
    }),
    $('input[placeholder!=""][type=text]').val(function(h, g) {
        var i = $(this).attr("placeholder");
        return i ? "" === g ? (this.style.color = "graytext",
        i) : g : this.value
    }));
    bindCardEvent();
    bindPOCoins2($(".v"));
    setTimeout(function() {
        $(".v .i .i1, .v .i .i2, #dianji, .w_info .gk, .w_info .sc, .w_info .dm, .rlist .i .c1, .rlist .i .c2").html(function() {
            return formatFriendlyNumber($(this).html())
        })
    }, 500)
});
var last_sug_user_start = 0;
function createSuggestUserList(i) {
    var h, o = 0, n = 0;
    $("#rup_user").empty();
    i + 5 > suggest_user.length && (i = 0);
    for (h in suggest_user) {
        if (o++,
        !("undefined" != typeof i && o <= i)) {
            var l = suggest_user[h]
              , k = !1;
            if ("undefined" != typeof window.AttentionList && "null" != typeof window.AttentionList) {
                for (var j = 0; j < window.AttentionList.length; j++) {
                    if (window.AttentionList[j] == l[0]) {
                        k = !0;
                        break
                    }
                }
            }
            if (!k && (k = $('<li><a href="http://space.bilibili.com/' + l[0] + '" target="_blank" card="' + l[1] + '"><img src="' + l[2] + '"><div class="name">' + l[1] + '</div></a><p class="i"><a class="gz">\u5173\u6ce8</a></p><div class="info">' + l[3] + "</div></li>").appendTo("#rup_user").find(".gz"),
            function(d, c) {
                c.click(function() {
                    1 == c.attr("attention") ? unattentionUser(c, d, function() {
                        c.html("\u5173\u6ce8").attr("attention", 0)
                    }) : attentionUser(c, d, function() {
                        c.html("\u53d6\u6d88\u5173\u6ce8").attr("attention", 1)
                    })
                })
            }(parseInt(l[0]), k),
            last_sug_user_start = o,
            5 <= ++n)) {
                break
            }
        }
    }
    bindCardEvent()
}
function createSuggestSpList(g) {
    var f, j = 0, i = 0;
    $("#rup_sp").empty();
    if (0 == suggest_sp.length) {
        $('<div class="no_more">\u6ca1\u6709\u66f4\u591a\u4fe1\u606f</div>').appendTo("#rup_sp")
    } else {
        for (f in g + 5 > suggest_sp.length && (g = 0),
        suggest_sp) {
            if (j++,
            !("undefined" != typeof g && j <= g)) {
                var h = suggest_sp[f];
                if ("undefined" != typeof h && "undefined" != typeof h[0] && ($('<li><a href="/sp/' + h[0] + '"><img src="' + h[1] + '" title="' + h[0] + '"><div class="name">' + h[0] + '</div></a><div class="info">' + (h[2] ? "\u540c\u4e49\u8bcd: <i>" + h[2] + "</i>" : "") + "<p>\u5171<b>" + h[3] + "</b>\u4e2a\u89c6\u9891</p></div></li>").appendTo("#rup_sp"),
                5 <= ++i)) {
                    break
                }
            }
        }
    }
}
$(document).ready(function() {
    $("#sp_order_alpha").click(function() {
        $(".s-alpha").slideDown(300)
    });
    $(".float_window .close").click(function() {
        $(".float_window").fadeOut(300)
    })
});
function alertCharNums(b) {
    1000 < b.value.length && (b.value = b.value.substring(0, 1000));
    $("#ajaxBackMsg").html("\u5b57\u7b26\u7edf\u8ba1:" + b.value.length + "/1000")
}
function showGlobalAlert(b) {
    tips_str = '<div class="ui-widget" id="announce_alerts" style="margin: 0px; position: fixed; top: 0px; width: 980px; z-index: 100;">\t<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"> \t\t<p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;margin-top:.1em;"></span>' + b + "</p>\t</div></div>";
    fc = $(".z:first-child");
    fc.before(tips_str)
}
function showGlobalTips(b) {
    tips_str = '<div class="ui-widget" id="announce_tips" style="margin: 0px; position: fixed; top: 0px; width: 980px; z-index: 100;">\t<div class="ui-state-highlight ui-corner-all" style="padding: 3px .7em;"> \t\t<p><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>' + b + "</p>\t</div></div>";
    fc = $(".z:first-child");
    fc.before(tips_str)
}
function insertFlash(f, e, h, g) {
    document.getElementById(f) && (e = '<embed height="' + g + '" width="' + h + '" id="' + f + '_flash" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" allowscriptaccess="always" style="visibility:hidden"  src="' + e + '" type="application/x-shockwave-flash" allowfullscreen="true" quality="high">',
    document.getElementById(f).innerHTML = e)
}
var cb_controler;
function cb_initOnlineInfo() {}
function cb_packet(d, c) {}
function cb_getOnline(b) {
    $("#wait_online").html(b)
}
function cb_chatlog(e, d, f) {}
function cb_onconnect(d, c) {
    "undefined" != typeof window.connect_cid && setInterval(function() {
        cb_controler.getChatRoom()
    }, 30000)
}
function cb_initok() {
    cb_controler.setConnectParam(window.connect_cid ? window.connect_cid : 1, __GetCookie("DedeUserID") ? __GetCookie("DedeUserID") : 0, "")
}
var scrollActivate = !0;
function goTop(s, r, q) {
    if (scrollActivate) {
        s = s || 0.1;
        r = r || 16;
        var p = 0
          , o = 0
          , n = 0
          , k = 0
          , j = 0
          , i = 0;
        document.documentElement && (p = document.documentElement.scrollLeft || 0,
        o = document.documentElement.scrollTop || 0);
        document.body && (n = document.body.scrollLeft || 0,
        k = document.body.scrollTop || 0);
        j = window.scrollX || 0;
        i = window.scrollY || 0;
        p = Math.max(p, Math.max(n, j));
        o = Math.max(o, Math.max(k, i));
        k = 1 + s;
        window.scrollTo(Math.floor(p / k), Math.floor(o / k));
        0 < p || 0 < o ? window.setTimeout("goTop(" + s + ", " + r + ")", r) : "undefined" != typeof q && q()
    } else {
        scrollActivate = !0
    }
}
function loadNotify() {
    "http:" == document.location.protocol && ($('<div id="cb_controler"></div>').appendTo("body"),
    insertFlash("cb_controler", "http://static.hdslb.com/images/bili_notify.swf", 0, 0),
    cb_controler = $("#cb_controler_flash").get(0))
}
var searchKW = ""
  , lastPage = "";
function searchAT() {
    searchKW = $("#search_key").val();
    loadAT(1)
}
function loadAT(d) {
    d = "/account/at/at-" + d + "?search=" + searchKW + "&att=" + ($(".ms-btn.addinfo").hasClass("on") ? 1 : 0) + "&r=" + Math.random();
    if (d != lastPage) {
        lastPage = d;
        $("#atme.atlist > .loading").remove();
        $('<div class="loading"></div>').prependTo("#atme.atlist");
        var c = new Date;
        $.ajax(lastPage, {
            success: function(b) {
                var e = (new Date).getTime() - c.getTime();
                500 > e ? setTimeout(function() {
                    $("#atme.atlist").html(b);
                    bindCardEvent()
                }, 0 >= 300 - e ? 10 : 300 - e) : ($("#atme.atlist").html(b),
                bindCardEvent())
            }
        })
    }
}
function searchDyn() {
    searchKW = $("#search_key").val();
    loadDyn(1)
}
function loadDyn(d) {
    d = "/account/dynamic/dyn-" + d + "?search=" + searchKW + "&fb=" + ($("#track_comment").hasClass("on") ? 1 : 0) + "&r=" + Math.random();
    if (d != lastPage) {
        lastPage = d;
        $("#dynlist.atlist > .loading").remove();
        $('<div class="loading"></div>').prependTo("#dynlist.atlist");
        var c = new Date;
        $.ajax(lastPage, {
            success: function(b) {
                var e = (new Date).getTime() - c.getTime();
                500 > e ? setTimeout(function() {
                    $("#dynlist.atlist").html(b);
                    bindCardEvent()
                }, 0 >= 300 - e ? 10 : 300 - e) : ($("#dynlist.atlist").html(b),
                bindCardEvent())
            }
        })
    }
}
;