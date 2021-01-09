/**
 * scratchblocks v3.4.0
 * https://scratchblocks.github.io/
 * Render scratchblocks code to SVG images.
 *
 * Copyright 2013–2020, Tim Radvan
 * @license MIT
 */
var scratchblocks = (function () {
  "use strict";
  var O = Math.min,
    v = Math.max;
  function e(e, t) {
    return (t = { exports: {} }), e(t, t.exports), t.exports;
  }
  function t() {
    return (
      (t =
        Object.assign ||
        function (e) {
          for (var t, s = 1; s < arguments.length; s++)
            for (var o in ((t = arguments[s]), t))
              Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
          return e;
        }),
      t.apply(this, arguments)
    );
  }
  function s(e, t) {
    if (e) {
      if ("string" == typeof e) return i(e, t);
      var s = Object.prototype.toString.call(e).slice(8, -1);
      return (
        "Object" === s && e.constructor && (s = e.constructor.name),
        "Map" === s || "Set" === s
          ? Array.from(e)
          : "Arguments" === s ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s)
          ? i(e, t)
          : void 0
      );
    }
  }
  function i(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var s = 0, o = Array(t); s < t; s++) o[s] = e[s];
    return o;
  }
  function a(e, t) {
    var a;
    if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
      if (
        Array.isArray(e) ||
        (a = s(e)) ||
        (t && e && "number" == typeof e.length)
      ) {
        a && (e = a);
        var n = 0,
          r = function () {};
        return {
          s: r,
          n: function () {
            return n >= e.length ? { done: !0 } : { done: !1, value: e[n++] };
          },
          e: function (t) {
            throw t;
          },
          f: r,
        };
      }
      throw new TypeError(
        "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      );
    }
    var c,
      l = !0,
      p = !1;
    return {
      s: function () {
        a = e[Symbol.iterator]();
      },
      n: function () {
        var e = a.next();
        return (l = e.done), e;
      },
      e: function (t) {
        (p = !0), (c = t);
      },
      f: function () {
        try {
          l || null == a.return || a.return();
        } finally {
          if (p) throw c;
        }
      },
    };
  }
  function n(e) {
    return r(e.replace(C, " _ "));
  }
  function r(e) {
    return e
      .replace(/_/g, " _ ")
      .replace(/ +/g, " ")
      .replace(/[,%?:]/g, "")
      .replace(/ß/g, "ss")
      .replace(/ä/g, "a")
      .replace(/ö/g, "o")
      .replace(/ü/g, "u")
      .replace(". . .", "...")
      .replace(/^…$/, "...")
      .trim()
      .toLowerCase();
  }
  function c(e, t) {
    var s = (t.blocksByHash = {});
    Object.keys(t.commands).forEach(function (e) {
      var o = t.commands[e],
        i = D[e],
        a = n(o);
      s[a] = i;
      var r = T.exec(e);
      if (r) {
        var c = r[0],
          l = a.replace(n(c), x[c]);
        s[l] = i;
      }
    }),
      (t.nativeAliases = {}),
      Object.keys(t.aliases).forEach(function (e) {
        var o = t.aliases[e],
          i = D[o];
        if (i === void 0) throw new Error("Invalid alias '" + o + "'");
        var a = n(e);
        (s[a] = i), (t.nativeAliases[o] = e);
      }),
      Object.keys(t.renamedBlocks || {}).forEach(function (e) {
        var s = t.renamedBlocks[e];
        if (!P[s]) throw new Error("Unknown ID: " + s);
        var o = P[s],
          i = n(e);
        H.blocksByHash[i] = o;
      }),
      (t.nativeDropdowns = {}),
      Object.keys(t.dropdowns).forEach(function (e) {
        var s = t.dropdowns[e];
        t.nativeDropdowns[s] = e;
      }),
      (t.code = e),
      (F[e] = t);
  }
  function l(e) {
    Object.keys(e).forEach(function (t) {
      c(t, e[t]);
    });
  }
  function p(e, t) {
    if (!P[e]) throw new Error("Unknown ID: " + e);
    P[e].specialCase = t;
  }
  function h(e, t, s) {
    var o = function (o, i, a) {
      return P[s(i, a) ? e : t];
    };
    p(e, o), p(t, o);
  }
  function d(e, t) {
    if (!e) throw "Assertion failed! " + (t || "");
  }
  function u(e) {
    return e
      .split("\n")
      .map(function (e) {
        return "  " + e;
      })
      .join("\n");
  }
  function g(e) {
    return e && e.constructor === Array;
  }
  function m(e, t) {
    if (!e) throw "Assertion failed! " + (t || "");
  }
  function y(e, t, s) {
    var a = [];
    g(t[t.length - 1]) && (a = t.pop());
    for (var n, r = [], c = 0; c < t.length; c++)
      (n = t[c]),
        n.isLabel
          ? r.push(n.value)
          : n.isIcon
          ? r.push("@" + n.name)
          : r.push("_");
    var l = r.join(" "),
      p = (e.hash = ge(l)),
      h = fe(p, e, t, s);
    if (h) {
      var o = h.lang,
        d = h.type;
      (e.language = o),
        (e.isRTL = -1 < be.indexOf(o.code)),
        ("ring" === d.shape ? "reporter" === e.shape : "stack" === e.shape) &&
          (e.shape = d.shape),
        (e.category = d.category),
        (e.categoryIsDefault = !0),
        d.selector && (e.selector = d.selector),
        d.id && (e.id = d.id),
        (e.hasLoopArrow = d.hasLoopArrow),
        ". . ." === d.spec && (t = [new oe(". . .")]);
    }
    ye(e, a), e.hasLoopArrow && t.push(new ie("loopArrow"));
    var u = new ne(e, t);
    return (d && ke.test(d.spec) && u.translate(o, !0), "+" === e.diff)
      ? new ce(u)
      : ((u.diff = e.diff), u);
  }
  function b(e, t) {
    function o() {
      v = e[++E];
    }
    function a() {
      return e[E + 1];
    }
    function n() {
      for (var t = E + 1; t < e.length; t++) if (" " !== e[t]) return e[t];
    }
    function r(e) {
      return -1 < R.indexOf(e);
    }
    function c(e, s) {
      var o = !!s.filter(function (e) {
          return !e.isLabel;
        }).length,
        i = {
          shape: e,
          category:
            "define-hat" === e
              ? "custom"
              : "reporter" !== e || o
              ? "obsolete"
              : "variables",
          categoryIsDefault: !0,
          hasLoopArrow: !1,
        };
      return y(i, s, t);
    }
    function l(e, s) {
      var o = de(s, t) || s;
      return new ae(e, s, o);
    }
    function p(e) {
      for (var t, s = []; v && "\n" !== v; ) {
        if ("<" === v || (">" === v && ">" === e)) {
          var i = s[s.length - 1],
            l = n();
          if (
            i &&
            !i.isLabel &&
            ("[" === l || "(" === l || "<" === l || "{" === l)
          ) {
            (t = null), s.push(new oe(v)), o();
            continue;
          }
        }
        if (v === e) break;
        if ("/" === v && "/" === a() && !e) break;
        switch (v) {
          case "[":
            (t = null), s.push(h());
            break;
          case "(":
            (t = null), s.push(u());
            break;
          case "<":
            (t = null), s.push(g());
            break;
          case "{":
            (t = null), s.push(f());
            break;
          case " ":
          case "\t":
            if ((o(), t && r(t.value))) return s.push(S()), s;
            t = null;
            break;
          case "\u25C2":
          case "\u25B8":
            s.push(b()), (t = null);
            break;
          case "@":
            o();
            for (var c = ""; v && /[a-zA-Z]/.test(v); ) (c += v), o();
            "cloud" === c
              ? s.push(new oe("\u2601"))
              : s.push(
                  ie.icons.hasOwnProperty(c) ? new ie(c) : new oe("@" + c)
                ),
              (t = null);
            break;
          case "\\":
            o();
          case ":":
            if (":" === v && ":" === a()) return s.push(w(e)), s;
          default:
            t || s.push((t = new oe(""))), (t.value += v), o();
        }
      }
      return s;
    }
    function h() {
      o();
      for (var e = "", t = !1; v && "]" !== v && "\n" !== v; ) {
        if ("\\" !== v) t = !1;
        else if ((o(), "v" === v && (t = !0), !v)) break;
        (e += v), o();
      }
      return (
        "]" === v && o(),
        ue.test(e)
          ? new ae("color", e)
          : !t && / v$/.test(e)
          ? l("dropdown", e.slice(0, e.length - 2))
          : new ae("string", e)
      );
    }
    function d(e) {
      var t = p(e);
      if ((v && "\n" === v && ((O = !0), o()), 0 !== t.length)) {
        var s = t[0];
        if (s && s.isLabel && r(s.value))
          return 2 > t.length && t.push(c("outline", [])), c("define-hat", t);
        if (1 === t.length) {
          var i = t[0];
          if (i.isBlock && (i.isReporter || i.isBoolean || i.isRing)) return i;
        }
        return c("stack", t);
      }
    }
    function u() {
      if ((o(), " " === v && (o(), "v" === v && ")" === a())))
        return o(), o(), new ae("number-dropdown", "");
      var e = p(")");
      if ((v && ")" === v && o(), 0 === e.length)) return new ae("number", "");
      if (1 === e.length && e[0].isLabel) {
        var t = e[0].value;
        if (/^[0-9e.-]*$/.test(t)) return new ae("number", t);
        if (ue.test(t)) return new ae("color", t);
      }
      for (var s = 0; s < e.length && !!e[s].isLabel; s++);
      if (s === e.length) {
        var n = e[s - 1];
        if (1 < s && "v" === n.value) {
          e.pop();
          var t = e
            .map(function (e) {
              return e.value;
            })
            .join(" ");
          return l("number-dropdown", t);
        }
      }
      var r = c("reporter", e);
      if (r.info && "ring" === r.info.shape) {
        var h = r.children[0];
        h && h.isInput && "number" === h.shape && "" === h.value
          ? (r.children[0] = new ae("reporter"))
          : ((h && h.isScript && h.isEmpty) ||
              (h && h.isBlock && !h.children.length)) &&
            (r.children[0] = new ae("stack"));
      }
      return r;
    }
    function g() {
      o();
      var e = p(">");
      return (
        v && ">" === v && o(),
        0 === e.length ? new ae("boolean") : c("boolean", e)
      );
    }
    function f() {
      o(), (O = !1);
      var e = function () {
          for (; v && "}" !== v; ) {
            var e = d("}");
            if (e) return e;
          }
        },
        t = k(e),
        s = [];
      return (
        t.forEach(function (e) {
          s = s.concat(e.blocks);
        }),
        "}" === v && o(),
        O ? new le(s) : (m(1 >= s.length), s.length ? s[0] : c("stack", []))
      );
    }
    function b() {
      var e = v;
      return (
        o(),
        "\u25B8" === e
          ? new ie("addInput")
          : "\u25C2" === e
          ? new ie("delInput")
          : void 0
      );
    }
    function w(e) {
      o(), o();
      for (var t = [], s = ""; v && "\n" !== v && v !== e; ) {
        if (" " === v) s && (t.push(s), (s = ""));
        else if ("/" === v && "/" === a()) break;
        else s += v;
        o();
      }
      return s && t.push(s), t;
    }
    function A(e) {
      o(), o();
      for (var t = ""; v && "\n" !== v && v !== e; ) (t += v), o();
      return v && "\n" === v && o(), new re(t, !0);
    }
    function S() {
      function e(e, a) {
        (s = null), o();
        var n = p(a);
        v === a && o(),
          i.push(
            y(
              {
                shape: "boolean" === e ? "boolean" : "reporter",
                argument: e,
                category: "custom-arg",
              },
              n,
              t
            )
          );
      }
      for (var s, i = []; v && "\n" !== v && ("/" !== v || "/" !== a()); )
        switch (v) {
          case "(":
            e("number", ")");
            break;
          case "[":
            e("string", "]");
            break;
          case "<":
            e("boolean", ">");
            break;
          case " ":
            o(), (s = null);
            break;
          case "\\":
            o();
          case ":":
            if (":" === v && ":" === a()) {
              i.push(w());
              break;
            }
          default:
            s || i.push((s = new oe(""))), (s.value += v), o();
        }
      return c("outline", i);
    }
    function L() {
      var e;
      ("+" === v || "-" === v) && ((e = v), o());
      var t = d();
      if ("/" === v && "/" === a()) {
        var s = A();
        if (((s.hasBlock = t && t.children.length), !s.hasBlock)) return s;
        t.comment = s;
      }
      return t && (t.diff = e), t;
    }
    var O,
      v = e[0],
      E = 0,
      R = [];
    return (
      t.map(function (e) {
        R = R.concat(e.define);
      }),
      function () {
        if (v) {
          var e = L();
          return e || "NL";
        }
      }
    );
  }
  function k(e) {
    function s() {
      n = e();
    }
    function o() {
      for (; "NL" === n; ) s();
      for (var e = []; n; ) {
        for (var o = []; n && "NL" !== n; ) {
          var a = i(),
            r = "+" === a.diff;
          if (
            (r && (a.diff = null),
            (a.isElse || a.isEnd) &&
              (a = new ne(t({}, a.info, { shape: "stack" }), a.children)),
            r)
          ) {
            var c = o[o.length - 1],
              l = [];
            if (c && c.isGlow) {
              o.pop();
              var l = c.child.isScript ? c.child.blocks : [c.child];
            }
            l.push(a), o.push(new ce(new le(l)));
          } else if (a.isHat) o.length && e.push(new le(o)), (o = [a]);
          else if (a.isFinal) {
            o.push(a);
            break;
          } else if (a.isCommand) o.push(a);
          else {
            o.length && e.push(new le(o)), e.push(new le([a])), (o = []);
            break;
          }
        }
        for (o.length && e.push(new le(o)); "NL" === n; ) s();
      }
      return e;
    }
    function i() {
      var e = n;
      if ((s(), e.hasScript))
        for (;;) {
          var t = a();
          if ((e.children.push(new le(t)), n && n.isElse)) {
            for (var o = 0; o < n.children.length; o++)
              e.children.push(n.children[o]);
            s();
            continue;
          }
          n && n.isEnd && s();
          break;
        }
      return e;
    }
    function a() {
      for (var e = []; n; ) {
        if ("NL" === n) {
          s();
          continue;
        }
        if (!n.isCommand) return e;
        var t = i(),
          o = "+" === t.diff;
        if ((o && (t.diff = null), o)) {
          var a = e[e.length - 1],
            r = [];
          if (a && a.isGlow) {
            e.pop();
            var r = a.child.isScript ? a.child.blocks : [a.child];
          }
          r.push(t), e.push(new ce(new le(r)));
        } else e.push(t);
      }
      return e;
    }
    var n = e();
    return o();
  }
  function w(e, t) {
    e.isScript
      ? (e.blocks = e.blocks.map(function (e) {
          return w(e, t), t(e) || e;
        }))
      : e.isBlock
      ? (e.children = e.children.map(function (e) {
          return w(e, t), t(e) || e;
        }))
      : e.isGlow && w(e.child, t);
  }
  function A(e) {
    var t = Object.create(null),
      s = Object.create(null),
      o = Object.create(null);
    e.forEach(function (e) {
      var o = Object.create(null);
      w(e, function (e) {
        if (e.isBlock)
          if ("define-hat" === e.info.shape) {
            var a = e.children[1];
            if (!a) return;
            for (var n, r = [], c = [], l = 0; l < a.children.length; l++)
              if (((n = a.children[l]), n.isLabel)) c.push(n.value);
              else if (n.isBlock) {
                if (!n.info.argument) return;
                c.push(
                  { number: "%n", string: "%s", boolean: "%b" }[n.info.argument]
                );
                var p = we(n);
                r.push(p), (o[p] = !0);
              }
            var h = c.join(" "),
              d = me(h),
              u = (t[d] = { spec: h, names: r });
            (e.info.id = "PROCEDURES_DEFINITION"),
              (e.info.selector = "procDef"),
              (e.info.call = u.spec),
              (e.info.names = u.names),
              (e.info.category = "custom");
          } else if (
            e.info.categoryIsDefault &&
            (e.isReporter || e.isBoolean)
          ) {
            var p = we(e);
            o[p] &&
              ((e.info.category = "custom-arg"),
              (e.info.categoryIsDefault = !1),
              (e.info.selector = "getParam"));
          } else if (Ae.hasOwnProperty(e.info.selector)) {
            var g = Ae[e.info.selector],
              f = e.children.filter(function (e) {
                return !e.isLabel;
              }),
              m = f[g];
            m && m.isInput && (s[m.value] = !0);
          }
      });
    }),
      e.forEach(function (e) {
        w(e, function (e) {
          if (
            e.info &&
            e.info.categoryIsDefault &&
            "obsolete" === e.info.category
          ) {
            var i = t[e.info.hash];
            return void (
              i &&
              ((e.info.selector = "call"),
              (e.info.call = i.spec),
              (e.info.names = i.names),
              (e.info.category = "custom"))
            );
          }
          var a, i;
          if (
            (e.isReporter &&
              "variables" === e.info.category &&
              e.info.categoryIsDefault &&
              ((e.info.selector = "readVariable"), (a = we(e)), (i = e.info)),
            !!a)
          )
            if (s[a])
              (i.category = "list"),
                (i.categoryIsDefault = !1),
                (i.selector = "contentsOfList:");
            else if (o[a])
              (i.category = "variables"),
                (i.categoryIsDefault = !1),
                (i.selector = "readVariable");
            else return;
        });
      });
  }
  function S(e, s) {
    var s = t({ inline: !1, languages: ["en"] }, s);
    if (s.dialect) throw new Error("Option 'dialect' no longer supported");
    (e = e.replace(/&lt;/g, "<")),
      (e = e.replace(/&gt;/g, ">")),
      s.inline && (e = e.replace(/\n/g, " "));
    var o = s.languages.map(function (e) {
        var t = he[e];
        if (!t) throw new Error("Unknown language: '" + e + "'");
        return t;
      }),
      i = b(e, o),
      a = k(i);
    return A(a), new pe(a);
  }
  function L(e, s) {
    return t({}, e, s);
  }
  var E = [
      "motion",
      "looks",
      "sound",
      "pen",
      "variables",
      "list",
      "events",
      "control",
      "sensing",
      "operators",
      "custom",
      "custom-arg",
      "extension",
      "grey",
      "obsolete",
      "music",
      "video",
      "tts",
      "translate",
      "wedo",
      "ev3",
      "microbit",
      "makeymakey",
    ],
    R = ["hat", "cap", "stack", "boolean", "reporter", "ring"],
    I = /(%[a-zA-Z0-9](?:\.[a-zA-Z0-9]+)?)/,
    C = new RegExp(I.source, "g"),
    T = /(@[a-zA-Z]+)/,
    N = new RegExp([I.source, "|", T.source, "| +"].join(""), "g"),
    M = /^#(?:[0-9a-fA-F]{3}){1,2}?$/,
    P = {},
    D = {},
    B = [
      {
        id: "MOTION_MOVESTEPS",
        selector: "forward:",
        spec: "move %1 steps",
        inputs: ["%n"],
        shape: "stack",
        category: "motion",
      },
      {
        id: "MOTION_TURNRIGHT",
        selector: "turnRight:",
        spec: "turn @turnRight %1 degrees",
        inputs: ["%n"],
        shape: "stack",
        category: "motion",
      },
      {
        id: "MOTION_TURNLEFT",
        selector: "turnLeft:",
        spec: "turn @turnLeft %1 degrees",
        inputs: ["%n"],
        shape: "stack",
        category: "motion",
      },
      {
        id: "MOTION_POINTINDIRECTION",
        selector: "heading:",
        spec: "point in direction %1",
        inputs: ["%d.direction"],
        shape: "stack",
        category: "motion",
      },
      {
        id: "MOTION_POINTTOWARDS",
        selector: "pointTowards:",
        spec: "point towards %1",
        inputs: ["%m.spriteOrMouse"],
        shape: "stack",
        category: "motion",
      },
      {
        id: "MOTION_GOTOXY",
        selector: "gotoX:y:",
        spec: "go to x:%1 y:%2",
        inputs: ["%n", "%n"],
        shape: "stack",
        category: "motion",
      },
      {
        id: "MOTION_GOTO",
        selector: "gotoSpriteOrMouse:",
        spec: "go to %1",
        inputs: ["%m.location"],
        shape: "stack",
        category: "motion",
      },
      {
        id: "MOTION_GLIDESECSTOXY",
        selector: "glideSecs:toX:y:elapsed:from:",
        spec: "glide %1 secs to x:%2 y:%3",
        inputs: ["%n", "%n", "%n"],
        shape: "stack",
        category: "motion",
      },
      {
        id: "MOTION_GLIDETO",
        spec: "glide %1 secs to %2",
        inputs: ["%n", "%m.location"],
        shape: "stack",
        category: "motion",
      },
      {
        id: "MOTION_CHANGEXBY",
        selector: "changeXposBy:",
        spec: "change x by %1",
        inputs: ["%n"],
        shape: "stack",
        category: "motion",
      },
      {
        id: "MOTION_SETX",
        selector: "xpos:",
        spec: "set x to %1",
        inputs: ["%n"],
        shape: "stack",
        category: "motion",
      },
      {
        id: "MOTION_CHANGEYBY",
        selector: "changeYposBy:",
        spec: "change y by %1",
        inputs: ["%n"],
        shape: "stack",
        category: "motion",
      },
      {
        id: "MOTION_SETY",
        selector: "ypos:",
        spec: "set y to %1",
        inputs: ["%n"],
        shape: "stack",
        category: "motion",
      },
      {
        id: "MOTION_SETROTATIONSTYLE",
        selector: "setRotationStyle",
        spec: "set rotation style %1",
        inputs: ["%m.rotationStyle"],
        shape: "stack",
        category: "motion",
      },
      {
        id: "LOOKS_SAYFORSECS",
        selector: "say:duration:elapsed:from:",
        spec: "say %1 for %2 seconds",
        inputs: ["%s", "%n"],
        shape: "stack",
        category: "looks",
      },
      {
        id: "LOOKS_SAY",
        selector: "say:",
        spec: "say %1",
        inputs: ["%s"],
        shape: "stack",
        category: "looks",
      },
      {
        id: "LOOKS_THINKFORSECS",
        selector: "think:duration:elapsed:from:",
        spec: "think %1 for %2 seconds",
        inputs: ["%s", "%n"],
        shape: "stack",
        category: "looks",
      },
      {
        id: "LOOKS_THINK",
        selector: "think:",
        spec: "think %1",
        inputs: ["%s"],
        shape: "stack",
        category: "looks",
      },
      {
        id: "LOOKS_SHOW",
        selector: "show",
        spec: "show",
        inputs: [],
        shape: "stack",
        category: "looks",
      },
      {
        id: "LOOKS_HIDE",
        selector: "hide",
        spec: "hide",
        inputs: [],
        shape: "stack",
        category: "looks",
      },
      {
        id: "LOOKS_SWITCHCOSTUMETO",
        selector: "lookLike:",
        spec: "switch costume to %1",
        inputs: ["%m.costume"],
        shape: "stack",
        category: "looks",
      },
      {
        id: "LOOKS_NEXTCOSTUME",
        selector: "nextCostume",
        spec: "next costume",
        inputs: [],
        shape: "stack",
        category: "looks",
      },
      {
        id: "LOOKS_NEXTBACKDROP_BLOCK",
        selector: "nextScene",
        spec: "next backdrop",
        inputs: [],
        shape: "stack",
        category: "looks",
      },
      {
        id: "LOOKS_SWITCHBACKDROPTO",
        selector: "startScene",
        spec: "switch backdrop to %1",
        inputs: ["%m.backdrop"],
        shape: "stack",
        category: "looks",
      },
      {
        id: "LOOKS_SWITCHBACKDROPTOANDWAIT",
        selector: "startSceneAndWait",
        spec: "switch backdrop to %1 and wait",
        inputs: ["%m.backdrop"],
        shape: "stack",
        category: "looks",
      },
      {
        id: "LOOKS_CHANGEEFFECTBY",
        selector: "changeGraphicEffect:by:",
        spec: "change %1 effect by %2",
        inputs: ["%m.effect", "%n"],
        shape: "stack",
        category: "looks",
      },
      {
        id: "LOOKS_SETEFFECTTO",
        selector: "setGraphicEffect:to:",
        spec: "set %1 effect to %2",
        inputs: ["%m.effect", "%n"],
        shape: "stack",
        category: "looks",
      },
      {
        id: "LOOKS_CLEARGRAPHICEFFECTS",
        selector: "filterReset",
        spec: "clear graphic effects",
        inputs: [],
        shape: "stack",
        category: "looks",
      },
      {
        id: "LOOKS_CHANGESIZEBY",
        selector: "changeSizeBy:",
        spec: "change size by %1",
        inputs: ["%n"],
        shape: "stack",
        category: "looks",
      },
      {
        id: "LOOKS_SETSIZETO",
        selector: "setSizeTo:",
        spec: "set size to %1%",
        inputs: ["%n"],
        shape: "stack",
        category: "looks",
      },
      {
        selector: "comeToFront",
        spec: "go to front",
        inputs: [],
        shape: "stack",
        category: "looks",
      },
      {
        id: "LOOKS_GOTOFRONTBACK",
        spec: "go to %1 layer",
        inputs: ["%m"],
        shape: "stack",
        category: "looks",
      },
      {
        selector: "goBackByLayers:",
        spec: "go back %1 layers",
        inputs: ["%n"],
        shape: "stack",
        category: "looks",
      },
      {
        id: "LOOKS_GOFORWARDBACKWARDLAYERS",
        spec: "go %1 %2 layers",
        inputs: ["%m", "%n"],
        shape: "stack",
        category: "looks",
      },
      {
        id: "SOUND_PLAY",
        selector: "playSound:",
        spec: "start sound %1",
        inputs: ["%m.sound"],
        shape: "stack",
        category: "sound",
      },
      {
        id: "SOUND_CHANGEEFFECTBY",
        spec: "change %1 effect by %2",
        inputs: ["%m", "%n"],
        shape: "stack",
        category: "sound",
      },
      {
        id: "SOUND_SETEFFECTO",
        spec: "set %1 effect to %2",
        inputs: ["%m", "%n"],
        shape: "stack",
        category: "sound",
      },
      {
        id: "SOUND_CLEAREFFECTS",
        spec: "clear sound effects",
        inputs: [],
        shape: "stack",
        category: "sound",
      },
      {
        id: "SOUND_PLAYUNTILDONE",
        selector: "doPlaySoundAndWait",
        spec: "play sound %1 until done",
        inputs: ["%m.sound"],
        shape: "stack",
        category: "sound",
      },
      {
        id: "SOUND_STOPALLSOUNDS",
        selector: "stopAllSounds",
        spec: "stop all sounds",
        inputs: [],
        shape: "stack",
        category: "sound",
      },
      {
        id: "music.playDrumForBeats",
        selector: "playDrum",
        spec: "play drum %1 for %2 beats",
        inputs: ["%d.drum", "%n"],
        shape: "stack",
        category: "music",
      },
      {
        id: "music.restForBeats",
        selector: "rest:elapsed:from:",
        spec: "rest for %1 beats",
        inputs: ["%n"],
        shape: "stack",
        category: "music",
      },
      {
        id: "music.playNoteForBeats",
        selector: "noteOn:duration:elapsed:from:",
        spec: "play note %1 for %2 beats",
        inputs: ["%d.note", "%n"],
        shape: "stack",
        category: "music",
      },
      {
        id: "music.setInstrument",
        selector: "instrument:",
        spec: "set instrument to %1",
        inputs: ["%d.instrument"],
        shape: "stack",
        category: "music",
      },
      {
        id: "SOUND_CHANGEVOLUMEBY",
        selector: "changeVolumeBy:",
        spec: "change volume by %1",
        inputs: ["%n"],
        shape: "stack",
        category: "sound",
      },
      {
        id: "SOUND_SETVOLUMETO",
        selector: "setVolumeTo:",
        spec: "set volume to %1%",
        inputs: ["%n"],
        shape: "stack",
        category: "sound",
      },
      {
        id: "music.changeTempo",
        selector: "changeTempoBy:",
        spec: "change tempo by %1",
        inputs: ["%n"],
        shape: "stack",
        category: "music",
      },
      {
        selector: "setTempoTo:",
        spec: "set tempo to %1 bpm",
        inputs: ["%n"],
        shape: "stack",
        category: "sound",
      },
      {
        id: "music.setTempo",
        selector: "setTempoTo:",
        spec: "set tempo to %1",
        inputs: ["%n"],
        shape: "stack",
        category: "music",
      },
      {
        id: "pen.clear",
        selector: "clearPenTrails",
        spec: "erase all",
        inputs: [],
        shape: "stack",
        category: "pen",
      },
      {
        id: "pen.stamp",
        selector: "stampCostume",
        spec: "stamp",
        inputs: [],
        shape: "stack",
        category: "pen",
      },
      {
        id: "pen.penDown",
        selector: "putPenDown",
        spec: "pen down",
        inputs: [],
        shape: "stack",
        category: "pen",
      },
      {
        id: "pen.penUp",
        selector: "putPenUp",
        spec: "pen up",
        inputs: [],
        shape: "stack",
        category: "pen",
      },
      {
        id: "pen.setColor",
        selector: "penColor:",
        spec: "set pen color to %1",
        inputs: ["%c"],
        shape: "stack",
        category: "pen",
      },
      {
        id: "pen.changeHue",
        selector: "changePenHueBy:",
        spec: "change pen color by %1",
        inputs: ["%n"],
        shape: "stack",
        category: "pen",
      },
      {
        id: "pen.setColorParam",
        spec: "set pen %1 to %2",
        inputs: ["%m.color", "%c"],
        shape: "stack",
        category: "pen",
      },
      {
        id: "pen.changeColorParam",
        spec: "change pen %1 by %2",
        inputs: ["%m.color", "%n"],
        shape: "stack",
        category: "pen",
      },
      {
        id: "pen.setHue",
        selector: "setPenHueTo:",
        spec: "set pen color to %1",
        inputs: ["%n"],
        shape: "stack",
        category: "pen",
      },
      {
        id: "pen.changeShade",
        selector: "changePenShadeBy:",
        spec: "change pen shade by %1",
        inputs: ["%n"],
        shape: "stack",
        category: "pen",
      },
      {
        id: "pen.setShade",
        selector: "setPenShadeTo:",
        spec: "set pen shade to %1",
        inputs: ["%n"],
        shape: "stack",
        category: "pen",
      },
      {
        id: "pen.changeSize",
        selector: "changePenSizeBy:",
        spec: "change pen size by %1",
        inputs: ["%n"],
        shape: "stack",
        category: "pen",
      },
      {
        id: "pen.setSize",
        selector: "penSize:",
        spec: "set pen size to %1",
        inputs: ["%n"],
        shape: "stack",
        category: "pen",
      },
      {
        id: "EVENT_WHENFLAGCLICKED",
        selector: "whenGreenFlag",
        spec: "when @greenFlag clicked",
        inputs: [],
        shape: "hat",
        category: "events",
      },
      {
        id: "EVENT_WHENKEYPRESSED",
        selector: "whenKeyPressed",
        spec: "when %1 key pressed",
        inputs: ["%m.key"],
        shape: "hat",
        category: "events",
      },
      {
        id: "EVENT_WHENTHISSPRITECLICKED",
        selector: "whenClicked",
        spec: "when this sprite clicked",
        inputs: [],
        shape: "hat",
        category: "events",
      },
      {
        id: "EVENT_WHENSTAGECLICKED",
        spec: "when stage clicked",
        inputs: [],
        shape: "hat",
        category: "events",
      },
      {
        id: "EVENT_WHENBACKDROPSWITCHESTO",
        selector: "whenSceneStarts",
        spec: "when backdrop switches to %1",
        inputs: ["%m.backdrop"],
        shape: "hat",
        category: "events",
      },
      {
        id: "EVENT_WHENGREATERTHAN",
        selector: "whenSensorGreaterThan",
        spec: "when %1 > %2",
        inputs: ["%m.triggerSensor", "%n"],
        shape: "hat",
        category: "events",
      },
      {
        id: "EVENT_WHENBROADCASTRECEIVED",
        selector: "whenIReceive",
        spec: "when I receive %1",
        inputs: ["%m.broadcast"],
        shape: "hat",
        category: "events",
      },
      {
        id: "EVENT_BROADCAST",
        selector: "broadcast:",
        spec: "broadcast %1",
        inputs: ["%m.broadcast"],
        shape: "stack",
        category: "events",
      },
      {
        id: "EVENT_BROADCASTANDWAIT",
        selector: "doBroadcastAndWait",
        spec: "broadcast %1 and wait",
        inputs: ["%m.broadcast"],
        shape: "stack",
        category: "events",
      },
      {
        id: "CONTROL_WAIT",
        selector: "wait:elapsed:from:",
        spec: "wait %1 seconds",
        inputs: ["%n"],
        shape: "stack",
        category: "control",
      },
      {
        id: "CONTROL_REPEAT",
        selector: "doRepeat",
        spec: "repeat %1",
        inputs: ["%n"],
        shape: "c-block",
        category: "control",
        hasLoopArrow: !0,
      },
      {
        id: "CONTROL_FOREVER",
        selector: "doForever",
        spec: "forever",
        inputs: [],
        shape: "c-block cap",
        category: "control",
        hasLoopArrow: !0,
      },
      {
        id: "CONTROL_IF",
        selector: "doIf",
        spec: "if %1 then",
        inputs: ["%b"],
        shape: "c-block",
        category: "control",
      },
      {
        id: "CONTROL_WAITUNTIL",
        selector: "doWaitUntil",
        spec: "wait until %1",
        inputs: ["%b"],
        shape: "stack",
        category: "control",
      },
      {
        id: "CONTROL_REPEATUNTIL",
        selector: "doUntil",
        spec: "repeat until %1",
        inputs: ["%b"],
        shape: "c-block",
        category: "control",
        hasLoopArrow: !0,
      },
      {
        id: "CONTROL_STOP",
        selector: "stopScripts",
        spec: "stop %1",
        inputs: ["%m.stop"],
        shape: "cap",
        category: "control",
      },
      {
        id: "CONTROL_STARTASCLONE",
        selector: "whenCloned",
        spec: "when I start as a clone",
        inputs: [],
        shape: "hat",
        category: "control",
      },
      {
        id: "CONTROL_CREATECLONEOF",
        selector: "createCloneOf",
        spec: "create clone of %1",
        inputs: ["%m.spriteOnly"],
        shape: "stack",
        category: "control",
      },
      {
        id: "CONTROL_DELETETHISCLONE",
        selector: "deleteClone",
        spec: "delete this clone",
        inputs: [],
        shape: "cap",
        category: "control",
      },
      {
        id: "SENSING_ASKANDWAIT",
        selector: "doAsk",
        spec: "ask %1 and wait",
        inputs: ["%s"],
        shape: "stack",
        category: "sensing",
      },
      {
        id: "videoSensing.videoToggle",
        selector: "setVideoState",
        spec: "turn video %1",
        inputs: ["%m.videoState"],
        shape: "stack",
        category: "video",
      },
      {
        id: "videoSensing.setVideoTransparency",
        selector: "setVideoTransparency",
        spec: "set video transparency to %1%",
        inputs: ["%n"],
        shape: "stack",
        category: "video",
      },
      {
        id: "videoSensing.whenMotionGreaterThan",
        spec: "when video motion > %1",
        inputs: ["%n"],
        shape: "hat",
        category: "video",
      },
      {
        id: "SENSING_RESETTIMER",
        selector: "timerReset",
        spec: "reset timer",
        inputs: [],
        shape: "stack",
        category: "sensing",
      },
      {
        id: "DATA_SETVARIABLETO",
        selector: "setVar:to:",
        spec: "set %1 to %2",
        inputs: ["%m.var", "%s"],
        shape: "stack",
        category: "variables",
      },
      {
        id: "DATA_CHANGEVARIABLEBY",
        selector: "changeVar:by:",
        spec: "change %1 by %2",
        inputs: ["%m.var", "%n"],
        shape: "stack",
        category: "variables",
      },
      {
        id: "DATA_SHOWVARIABLE",
        selector: "showVariable:",
        spec: "show variable %1",
        inputs: ["%m.var"],
        shape: "stack",
        category: "variables",
      },
      {
        id: "DATA_HIDEVARIABLE",
        selector: "hideVariable:",
        spec: "hide variable %1",
        inputs: ["%m.var"],
        shape: "stack",
        category: "variables",
      },
      {
        id: "DATA_ADDTOLIST",
        selector: "append:toList:",
        spec: "add %1 to %2",
        inputs: ["%s", "%m.list"],
        shape: "stack",
        category: "list",
      },
      {
        id: "DATA_DELETEOFLIST",
        selector: "deleteLine:ofList:",
        spec: "delete %1 of %2",
        inputs: ["%d.listDeleteItem", "%m.list"],
        shape: "stack",
        category: "list",
      },
      {
        id: "DATA_DELETEALLOFLIST",
        spec: "delete all of %1",
        inputs: ["%m.list"],
        shape: "stack",
        category: "list",
      },
      {
        id: "MOTION_IFONEDGEBOUNCE",
        selector: "bounceOffEdge",
        spec: "if on edge, bounce",
        inputs: [],
        shape: "stack",
        category: "motion",
      },
      {
        id: "DATA_INSERTATLIST",
        selector: "insert:at:ofList:",
        spec: "insert %1 at %2 of %3",
        inputs: ["%s", "%d.listItem", "%m.list"],
        shape: "stack",
        category: "list",
      },
      {
        id: "DATA_REPLACEITEMOFLIST",
        selector: "setLine:ofList:to:",
        spec: "replace item %1 of %2 with %3",
        inputs: ["%d.listItem", "%m.list", "%s"],
        shape: "stack",
        category: "list",
      },
      {
        id: "DATA_SHOWLIST",
        selector: "showList:",
        spec: "show list %1",
        inputs: ["%m.list"],
        shape: "stack",
        category: "list",
      },
      {
        id: "DATA_HIDELIST",
        selector: "hideList:",
        spec: "hide list %1",
        inputs: ["%m.list"],
        shape: "stack",
        category: "list",
      },
      {
        id: "SENSING_OF_XPOSITION",
        selector: "xpos",
        spec: "x position",
        inputs: [],
        shape: "reporter",
        category: "motion",
      },
      {
        id: "SENSING_OF_YPOSITION",
        selector: "ypos",
        spec: "y position",
        inputs: [],
        shape: "reporter",
        category: "motion",
      },
      {
        id: "SENSING_OF_DIRECTION",
        selector: "heading",
        spec: "direction",
        inputs: [],
        shape: "reporter",
        category: "motion",
      },
      {
        id: "SENSING_OF_COSTUMENUMBER",
        selector: "costumeIndex",
        spec: "costume #",
        inputs: [],
        shape: "reporter",
        category: "looks",
      },
      {
        id: "LOOKS_COSTUMENUMBERNAME",
        selector: "LOOKS_COSTUMENUMBERNAME",
        spec: "costume %1",
        inputs: ["%m"],
        shape: "reporter",
        category: "looks",
      },
      {
        id: "SENSING_OF_SIZE",
        selector: "scale",
        spec: "size",
        inputs: [],
        shape: "reporter",
        category: "looks",
      },
      {
        id: "SENSING_OF_BACKDROPNAME",
        selector: "sceneName",
        spec: "backdrop name",
        inputs: [],
        shape: "reporter",
        category: "looks",
      },
      {
        id: "LOOKS_BACKDROPNUMBERNAME",
        spec: "backdrop %1",
        inputs: ["%m"],
        shape: "reporter",
        category: "looks",
      },
      {
        id: "SENSING_OF_BACKDROPNUMBER",
        selector: "backgroundIndex",
        spec: "backdrop #",
        inputs: [],
        shape: "reporter",
        category: "looks",
      },
      {
        id: "SOUND_VOLUME",
        selector: "volume",
        spec: "volume",
        inputs: [],
        shape: "reporter",
        category: "sound",
      },
      {
        id: "music.getTempo",
        selector: "tempo",
        spec: "tempo",
        inputs: [],
        shape: "reporter",
        category: "music",
      },
      {
        id: "SENSING_TOUCHINGOBJECT",
        selector: "touching:",
        spec: "touching %1?",
        inputs: ["%m.touching"],
        shape: "boolean",
        category: "sensing",
      },
      {
        id: "SENSING_TOUCHINGCOLOR",
        selector: "touchingColor:",
        spec: "touching color %1?",
        inputs: ["%c"],
        shape: "boolean",
        category: "sensing",
      },
      {
        id: "SENSING_COLORISTOUCHINGCOLOR",
        selector: "color:sees:",
        spec: "color %1 is touching %2?",
        inputs: ["%c", "%c"],
        shape: "boolean",
        category: "sensing",
      },
      {
        id: "SENSING_DISTANCETO",
        selector: "distanceTo:",
        spec: "distance to %1",
        inputs: ["%m.spriteOrMouse"],
        shape: "reporter",
        category: "sensing",
      },
      {
        id: "SENSING_ANSWER",
        selector: "answer",
        spec: "answer",
        inputs: [],
        shape: "reporter",
        category: "sensing",
      },
      {
        id: "SENSING_KEYPRESSED",
        selector: "keyPressed:",
        spec: "key %1 pressed?",
        inputs: ["%m.key"],
        shape: "boolean",
        category: "sensing",
      },
      {
        id: "SENSING_MOUSEDOWN",
        selector: "mousePressed",
        spec: "mouse down?",
        inputs: [],
        shape: "boolean",
        category: "sensing",
      },
      {
        id: "SENSING_MOUSEX",
        selector: "mouseX",
        spec: "mouse x",
        inputs: [],
        shape: "reporter",
        category: "sensing",
      },
      {
        id: "SENSING_MOUSEY",
        selector: "mouseY",
        spec: "mouse y",
        inputs: [],
        shape: "reporter",
        category: "sensing",
      },
      {
        id: "SENSING_SETDRAGMODE",
        spec: "set drag mode %1",
        inputs: ["%m"],
        shape: "stack",
        category: "sensing",
      },
      {
        id: "SENSING_LOUDNESS",
        selector: "soundLevel",
        spec: "loudness",
        inputs: [],
        shape: "reporter",
        category: "sensing",
      },
      {
        id: "videoSensing.videoOn",
        selector: "senseVideoMotion",
        spec: "video %1 on %2",
        inputs: ["%m.videoMotionType", "%m.stageOrThis"],
        shape: "reporter",
        category: "video",
      },
      {
        id: "SENSING_TIMER",
        selector: "timer",
        spec: "timer",
        inputs: [],
        shape: "reporter",
        category: "sensing",
      },
      {
        id: "SENSING_OF",
        selector: "getAttribute:of:",
        spec: "%1 of %2",
        inputs: ["%m.attribute", "%m.spriteOrStage"],
        shape: "reporter",
        category: "sensing",
      },
      {
        id: "SENSING_CURRENT",
        selector: "timeAndDate",
        spec: "current %1",
        inputs: ["%m.timeAndDate"],
        shape: "reporter",
        category: "sensing",
      },
      {
        id: "SENSING_DAYSSINCE2000",
        selector: "timestamp",
        spec: "days since 2000",
        inputs: [],
        shape: "reporter",
        category: "sensing",
      },
      {
        id: "SENSING_USERNAME",
        selector: "getUserName",
        spec: "username",
        inputs: [],
        shape: "reporter",
        category: "sensing",
      },
      {
        id: "OPERATORS_ADD",
        selector: "+",
        spec: "%1 + %2",
        inputs: ["%n", "%n"],
        shape: "reporter",
        category: "operators",
      },
      {
        id: "OPERATORS_SUBTRACT",
        selector: "-",
        spec: "%1 - %2",
        inputs: ["%n", "%n"],
        shape: "reporter",
        category: "operators",
      },
      {
        id: "OPERATORS_MULTIPLY",
        selector: "*",
        spec: "%1 * %2",
        inputs: ["%n", "%n"],
        shape: "reporter",
        category: "operators",
      },
      {
        id: "OPERATORS_DIVIDE",
        selector: "/",
        spec: "%1 / %2",
        inputs: ["%n", "%n"],
        shape: "reporter",
        category: "operators",
      },
      {
        id: "OPERATORS_RANDOM",
        selector: "randomFrom:to:",
        spec: "pick random %1 to %2",
        inputs: ["%n", "%n"],
        shape: "reporter",
        category: "operators",
      },
      {
        id: "OPERATORS_LT",
        selector: "<",
        spec: "%1 < %2",
        inputs: ["%s", "%s"],
        shape: "boolean",
        category: "operators",
      },
      {
        id: "OPERATORS_EQUALS",
        selector: "=",
        spec: "%1 = %2",
        inputs: ["%s", "%s"],
        shape: "boolean",
        category: "operators",
      },
      {
        id: "OPERATORS_GT",
        selector: ">",
        spec: "%1 > %2",
        inputs: ["%s", "%s"],
        shape: "boolean",
        category: "operators",
      },
      {
        id: "OPERATORS_AND",
        selector: "&",
        spec: "%1 and %2",
        inputs: ["%b", "%b"],
        shape: "boolean",
        category: "operators",
      },
      {
        id: "OPERATORS_OR",
        selector: "|",
        spec: "%1 or %2",
        inputs: ["%b", "%b"],
        shape: "boolean",
        category: "operators",
      },
      {
        id: "OPERATORS_NOT",
        selector: "not",
        spec: "not %1",
        inputs: ["%b"],
        shape: "boolean",
        category: "operators",
      },
      {
        id: "OPERATORS_JOIN",
        selector: "concatenate:with:",
        spec: "join %1 %2",
        inputs: ["%s", "%s"],
        shape: "reporter",
        category: "operators",
      },
      {
        id: "OPERATORS_LETTEROF",
        selector: "letter:of:",
        spec: "letter %1 of %2",
        inputs: ["%n", "%s"],
        shape: "reporter",
        category: "operators",
      },
      {
        id: "OPERATORS_LENGTH",
        selector: "stringLength:",
        spec: "length of %1",
        inputs: ["%s"],
        shape: "reporter",
        category: "operators",
      },
      {
        id: "OPERATORS_MOD",
        selector: "%",
        spec: "%1 mod %2",
        inputs: ["%n", "%n"],
        shape: "reporter",
        category: "operators",
      },
      {
        id: "OPERATORS_ROUND",
        selector: "rounded",
        spec: "round %1",
        inputs: ["%n"],
        shape: "reporter",
        category: "operators",
      },
      {
        id: "OPERATORS_MATHOP",
        selector: "computeFunction:of:",
        spec: "%1 of %2",
        inputs: ["%m.mathOp", "%n"],
        shape: "reporter",
        category: "operators",
      },
      {
        id: "OPERATORS_CONTAINS",
        spec: "%1 contains %2?",
        inputs: ["%s", "%s"],
        shape: "boolean",
        category: "operators",
      },
      {
        id: "DATA_ITEMOFLIST",
        selector: "getLine:ofList:",
        spec: "item %1 of %2",
        inputs: ["%d.listItem", "%m.list"],
        shape: "reporter",
        category: "list",
      },
      {
        id: "DATA_ITEMNUMOFLIST",
        spec: "item # of %1 in %2",
        inputs: ["%s", "%m.list"],
        shape: "reporter",
        category: "list",
      },
      {
        id: "DATA_LENGTHOFLIST",
        selector: "lineCountOfList:",
        spec: "length of %1",
        inputs: ["%m.list"],
        shape: "reporter",
        category: "list",
      },
      {
        id: "DATA_LISTCONTAINSITEM",
        selector: "list:contains:",
        spec: "%1 contains %2?",
        inputs: ["%m.list", "%s"],
        shape: "boolean",
        category: "list",
      },
      {
        id: "wedo2.motorOn",
        spec: "turn %1 on",
        inputs: ["%m.motor"],
        shape: "stack",
        category: "extension",
      },
      {
        id: "wedo2.motorOff",
        spec: "turn %1 off",
        inputs: ["%m.motor"],
        shape: "stack",
        category: "extension",
      },
      {
        id: "wedo2.startMotorPower",
        spec: "set %1 power to %2",
        inputs: ["%m.motor", "%n"],
        shape: "stack",
        category: "extension",
      },
      {
        id: "wedo2.setMotorDirection",
        spec: "set %1 direction to %2",
        inputs: ["%m.motor2", "%m.motorDirection"],
        shape: "stack",
        category: "extension",
      },
      {
        id: "wedo2.whenDistance",
        spec: "when distance %1 %2",
        inputs: ["%m.lessMore", "%n"],
        shape: "hat",
        category: "extension",
      },
      {
        id: "wedo2.getDistance",
        spec: "distance",
        inputs: [],
        shape: "reporter",
        category: "extension",
      },
      {
        id: "wedo2.motorOnFor",
        spec: "turn %1 on for %2 seconds",
        inputs: ["%m.motor", "%n"],
        shape: "stack",
        category: "extension",
      },
      {
        id: "wedo2.setLightHue",
        spec: "set light color to %1",
        inputs: ["%n"],
        shape: "stack",
        category: "extension",
      },
      {
        id: "wedo2.playNoteFor",
        spec: "play note %1 for %2 seconds",
        inputs: ["%n", "%n"],
        shape: "stack",
        category: "extension",
      },
      {
        id: "wedo2.whenTilted",
        spec: "when tilted %1",
        inputs: ["%m.xxx"],
        shape: "hat",
        category: "extension",
      },
      {
        id: "wedo2.getTiltAngle",
        spec: "tilt angle %1",
        inputs: ["%m.xxx"],
        shape: "reporter",
        category: "extension",
      },
      {
        id: "CONTROL_ELSE",
        spec: "else",
        inputs: [],
        shape: "celse",
        category: "control",
      },
      {
        id: "scratchblocks:end",
        spec: "end",
        inputs: [],
        shape: "cend",
        category: "control",
      },
      {
        id: "scratchblocks:ellipsis",
        spec: ". . .",
        inputs: [],
        shape: "stack",
        category: "grey",
      },
      {
        id: "scratchblocks:addInput",
        spec: "%1 @addInput",
        inputs: ["%n"],
        shape: "ring",
        category: "grey",
      },
      {
        id: "SENSING_USERID",
        spec: "user id",
        inputs: [],
        shape: "reporter",
        category: "obsolete",
      },
      {
        selector: "doIf",
        spec: "if %1",
        inputs: ["%b"],
        shape: "c-block",
        category: "obsolete",
      },
      {
        selector: "doForeverIf",
        spec: "forever if %1",
        inputs: ["%b"],
        shape: "c-block cap",
        category: "obsolete",
      },
      {
        selector: "doReturn",
        spec: "stop script",
        inputs: [],
        shape: "cap",
        category: "obsolete",
      },
      {
        selector: "stopAll",
        spec: "stop all",
        inputs: [],
        shape: "cap",
        category: "obsolete",
      },
      {
        selector: "lookLike:",
        spec: "switch to costume %1",
        inputs: ["%m.costume"],
        shape: "stack",
        category: "obsolete",
      },
      {
        selector: "nextScene",
        spec: "next background",
        inputs: [],
        shape: "stack",
        category: "obsolete",
      },
      {
        selector: "startScene",
        spec: "switch to background %1",
        inputs: ["%m.backdrop"],
        shape: "stack",
        category: "obsolete",
      },
      {
        selector: "backgroundIndex",
        spec: "background #",
        inputs: [],
        shape: "reporter",
        category: "obsolete",
      },
      {
        id: "SENSING_LOUD",
        selector: "isLoud",
        spec: "loud?",
        inputs: [],
        shape: "boolean",
        category: "obsolete",
      },
    ].map(function (e) {
      var t = e.spec;
      if (!e.id) {
        if (!e.selector) throw new Error("Missing ID: " + e.spec);
        e.id = "sb2:" + e.selector;
      }
      if (!e.spec) throw new Error("Missing spec: " + e.id);
      var s = {
        id: e.id,
        spec: e.spec,
        parts: e.spec.split(N).filter(function (e) {
          return !!e;
        }),
        selector: e.selector || "sb3:" + e.id,
        inputs: e.inputs,
        shape: e.shape,
        category: e.category,
        hasLoopArrow: !!e.hasLoopArrow,
      };
      if (P[s.id]) throw new Error("Duplicate ID: " + s.id);
      return (P[s.id] = s), (D[t] = s);
    }),
    x = {
      "@greenFlag": "\u2691",
      "@turnRight": "\u21BB",
      "@turnLeft": "\u21BA",
      "@addInput": "\u25B8",
      "@delInput": "\u25C2",
    },
    F = {},
    H = {
      aliases: {
        "turn left %1 degrees": "turn @turnLeft %1 degrees",
        "turn ccw %1 degrees": "turn @turnLeft %1 degrees",
        "turn right %1 degrees": "turn @turnRight %1 degrees",
        "turn cw %1 degrees": "turn @turnRight %1 degrees",
        "when gf clicked": "when @greenFlag clicked",
        "when flag clicked": "when @greenFlag clicked",
        "when green flag clicked": "when @greenFlag clicked",
      },
      renamedBlocks: {
        "say %1 for %2 secs": "LOOKS_SAYFORSECS",
        "think %1 for %2 secs": "LOOKS_THINKFORSECS",
        "play sound %1": "SOUND_PLAY",
        "wait %1 secs": "CONTROL_WAIT",
        clear: "pen.clear",
      },
      define: ["define"],
      ignorelt: ["when distance"],
      math: [
        "abs",
        "floor",
        "ceiling",
        "sqrt",
        "sin",
        "cos",
        "tan",
        "asin",
        "acos",
        "atan",
        "ln",
        "log",
        "e ^",
        "10 ^",
      ],
      soundEffects: ["pitch", "pan left/right"],
      osis: ["other scripts in sprite", "other scripts in stage"],
      dropdowns: {},
      commands: {},
    };
  B.forEach(function (e) {
    H.commands[e.spec] = e.spec;
  }),
    l({ en: H }),
    h("OPERATORS_MATHOP", "SENSING_OF", function (e, t) {
      var s = e[0];
      if (s.isInput) {
        var o = s.value;
        return -1 < t.math.indexOf(o);
      }
    }),
    h("SOUND_CHANGEEFFECTBY", "LOOKS_CHANGEEFFECTBY", function (e, t) {
      for (var s, o = 0; o < e.length; o++)
        if (((s = e[o]), "dropdown" === s.shape)) {
          var n,
            c = s.value,
            l = a(t.soundEffects);
          try {
            for (l.s(); !(n = l.n()).done; ) {
              var p = n.value;
              if (r(p) === r(c)) return !0;
            }
          } catch (e) {
            l.e(e);
          } finally {
            l.f();
          }
        }
      return !1;
    }),
    h("SOUND_SETEFFECTO", "LOOKS_SETEFFECTTO", function (e, t) {
      for (var s, o = 0; o < e.length; o++)
        if (((s = e[o]), "dropdown" === s.shape)) {
          var n,
            c = s.value,
            l = a(t.soundEffects);
          try {
            for (l.s(); !(n = l.n()).done; ) {
              var p = n.value;
              if (r(p) === r(c)) return !0;
            }
          } catch (e) {
            l.e(e);
          } finally {
            l.f();
          }
        }
      return !1;
    }),
    h("DATA_LENGTHOFLIST", "OPERATORS_LENGTH", function (e) {
      var t = e[e.length - 1];
      return t.isInput ? "dropdown" === t.shape : void 0;
    }),
    h("DATA_LISTCONTAINSITEM", "OPERATORS_CONTAINS", function (e) {
      var t = e[0];
      return t.isInput ? "dropdown" === t.shape : void 0;
    }),
    h("pen.setColor", "pen.setHue", function (e) {
      var t = e[e.length - 1];
      return (t.isInput && t.isColor) || t.isBlock;
    }),
    p("CONTROL_STOP", function (e, s, o) {
      var i = s[s.length - 1];
      if (i.isInput) {
        var a = i.value;
        if (-1 < o.osis.indexOf(a))
          return t({}, P.CONTROL_STOP, { shape: "stack" });
      }
    });
  var z = {
      loadLanguages: l,
      blockName: function (e) {
        for (var t, s = [], o = 0; o < e.children.length; o++) {
          if (((t = e.children[o]), !t.isLabel)) return;
          s.push(t.value);
        }
        return s.join(" ");
      },
      allLanguages: F,
      lookupDropdown: function (e, t) {
        for (var s, o = 0; o < t.length; o++)
          if (((s = t[o]), s.nativeDropdowns.hasOwnProperty(e))) {
            var a = s.nativeDropdowns[e];
            return a;
          }
      },
      hexColorPat: M,
      minifyHash: r,
      lookupHash: function (e, t, s, o) {
        for (var a, n = 0; n < o.length; n++)
          if (((a = o[n]), a.blocksByHash.hasOwnProperty(e))) {
            var r = a.blocksByHash[e];
            if ("reporter" === t.shape && "reporter" !== r.shape) continue;
            if ("boolean" === t.shape && "boolean" !== r.shape) continue;
            return (
              r.specialCase && (r = r.specialCase(t, s, a) || r),
              { type: r, lang: a }
            );
          }
      },
      applyOverrides: function (e, t) {
        for (var s, o = 0; o < t.length; o++)
          (s = t[o]),
            M.test(s)
              ? ((e.color = s), (e.category = ""), (e.categoryIsDefault = !1))
              : -1 < E.indexOf(s)
              ? ((e.category = s), (e.categoryIsDefault = !1))
              : -1 < R.indexOf(s)
              ? (e.shape = s)
              : "loop" === s
              ? (e.hasLoopArrow = !0)
              : ("+" === s || "-" === s) && (e.diff = s);
      },
      rtlLanguages: ["ar", "ckb", "fa", "he"],
      iconPat: T,
      hashSpec: n,
      parseSpec: function (e) {
        var t = e.split(N).filter(function (e) {
            return !!e;
          }),
          s = t.filter(function (e) {
            return I.test(e);
          });
        return { spec: e, parts: t, inputs: s, hash: n(e) };
      },
      parseInputNumber: function (e) {
        var t = /\%([0-9]+)/.exec(e);
        return t ? +t[1] : 0;
      },
      inputPat: I,
      unicodeIcons: x,
      english: H,
      blocksById: P,
    },
    G = z.blocksById,
    V = z.parseSpec,
    _ = z.inputPat,
    j = z.parseInputNumber,
    U = z.iconPat,
    Y = z.rtlLanguages,
    K = z.unicodeIcons,
    W = z.english,
    X = function (e, t) {
      (this.value = e),
        (this.cls = t || ""),
        (this.el = null),
        (this.height = 12),
        (this.metrics = null),
        (this.x = 0);
    };
  (X.prototype.isLabel = !0),
    (X.prototype.stringify = function () {
      return "<" === this.value || ">" === this.value
        ? this.value
        : this.value.replace(/([<>[\](){}])/g, "\\$1");
    });
  var q = function e(t) {
    (this.name = t),
      (this.isArrow = "loopArrow" === t),
      d(e.icons[t], "no info for icon " + t);
  };
  (q.prototype.isIcon = !0),
    (q.icons = {
      greenFlag: !0,
      turnLeft: !0,
      turnRight: !0,
      loopArrow: !0,
      addInput: !0,
      delInput: !0,
    }),
    (q.prototype.stringify = function () {
      return K["@" + this.name] || "";
    });
  var Z = function (e, t, s) {
    (this.shape = e),
      (this.value = t),
      (this.menu = s || null),
      (this.isRound = "number" === e || "number-dropdown" === e),
      (this.isBoolean = "boolean" === e),
      (this.isStack = "stack" === e),
      (this.isInset = "boolean" === e || "stack" === e || "reporter" === e),
      (this.isColor = "color" === e),
      (this.hasArrow = "dropdown" === e || "number-dropdown" === e),
      (this.isDarker = "boolean" === e || "stack" === e || "dropdown" === e),
      (this.isSquare = "string" === e || "color" === e || "dropdown" === e),
      (this.hasLabel = !(this.isColor || this.isInset)),
      (this.label = this.hasLabel ? new X(t, "literal-" + this.shape) : null),
      (this.x = 0);
  };
  (Z.prototype.isInput = !0),
    (Z.prototype.stringify = function () {
      if (this.isColor) return d("#" === this.value[0]), "[" + this.value + "]";
      var e = (this.value ? "" + this.value : "")
        .replace(/ v$/, " \\v")
        .replace(/([\]\\])/g, "\\$1");
      return (
        this.hasArrow && (e += " v"),
        this.isRound
          ? "(" + e + ")"
          : this.isSquare
          ? "[" + e + "]"
          : this.isBoolean
          ? "<>"
          : this.isStack
          ? "{}"
          : e
      );
    }),
    (Z.prototype.translate = function () {
      if (this.hasArrow) {
        var e = this.menu || this.value;
        (this.value = e),
          (this.label = new X(this.value, "literal-" + this.shape));
      }
    });
  var Q = function (e, s, o) {
    d(e),
      (this.info = t({}, e)),
      (this.children = s),
      (this.comment = o || null),
      (this.diff = null);
    var i = this.info.shape;
    (this.isHat = "hat" === i || "define-hat" === i),
      (this.hasPuzzle = "stack" === i || "hat" === i),
      (this.isFinal = /cap/.test(i)),
      (this.isCommand = "stack" === i || "cap" === i || /block/.test(i)),
      (this.isOutline = "outline" === i),
      (this.isReporter = "reporter" === i),
      (this.isBoolean = "boolean" === i),
      (this.isRing = "ring" === i),
      (this.hasScript = /block/.test(i)),
      (this.isElse = "celse" === i),
      (this.isEnd = "cend" === i);
  };
  (Q.prototype.isBlock = !0),
    (Q.prototype.stringify = function (e) {
      var t = null,
        s = !1,
        o = this.children
          .map(function (e) {
            return (
              e.isIcon && (s = !0),
              t || e.isLabel || e.isIcon || (t = e),
              e.isScript
                ? "\n" + u(e.stringify()) + "\n"
                : e.stringify().trim() + " "
            );
          })
          .join("")
          .trim(),
        i = this.info.language;
      if (s && i && this.info.selector) {
        var a = G[this.info.id],
          n = a.spec,
          r = i.nativeAliases[a.spec];
        if (r) return _.test(r) && t && (r = r.replace(_, t.stringify())), r;
      }
      var c = e || "";
      return (
        (!1 === this.info.categoryIsDefault ||
          ("custom-arg" === this.info.category &&
            (this.isReporter || this.isBoolean)) ||
          ("custom" === this.info.category && "stack" === this.info.shape)) &&
          (c && (c += " "), (c += this.info.category)),
        c && (o += " :: " + c),
        this.hasScript
          ? o + "\nend"
          : "reporter" === this.info.shape
          ? "(" + o + ")"
          : "boolean" === this.info.shape
          ? "<" + o + ">"
          : o
      );
    }),
    (Q.prototype.translate = function (e, t) {
      var s = this;
      if (!e) throw new Error("Missing language");
      var o = this.info.id;
      if (o) {
        if ("PROCEDURES_DEFINITION" === o)
          return (
            d(this.children[0].isLabel),
            void (this.children[0] = new X(e.define[0] || W.define[0]))
          );
        var i = G[o],
          a = this.info.language.commands[i.spec],
          n = e.commands[i.spec];
        if (n) {
          var r = V(n),
            c = this.children.filter(function (e) {
              return !e.isLabel && !e.isIcon;
            });
          t ||
            c.forEach(function (t) {
              t.translate(e);
            });
          var l = V(a).parts,
            p = l
              .map(function (e) {
                return j(e);
              })
              .filter(function (e) {
                return !!e;
              }),
            h = 0,
            u = p.map(function (e) {
              return (h = v(h, e)), c[e - 1];
            }),
            g = c.slice(h);
          (this.children = r.parts
            .map(function (e) {
              var e = e.trim();
              if (e) {
                var t = j(e);
                return t ? u[t - 1] : U.test(e) ? new q(e.slice(1)) : new X(e);
              }
            })
            .filter(function (e) {
              return !!e;
            })),
            g.forEach(function (t, o) {
              1 === o &&
                "CONTROL_IF" === s.info.id &&
                s.children.push(new X(e.commands["else"])),
                s.children.push(t);
            }),
            (this.info.language = e),
            (this.info.isRTL = -1 < Y.indexOf(e.code)),
            (this.info.categoryIsDefault = !0);
        }
      }
    });
  var J = function (e, t) {
    (this.label = new X(e, "comment-label")),
      (this.width = null),
      (this.hasBlock = t);
  };
  (J.prototype.isComment = !0),
    (J.prototype.stringify = function () {
      return "// " + this.label.value;
    });
  var $ = function (e) {
    d(e),
      (this.child = e),
      e.isBlock
        ? ((this.shape = e.info.shape), (this.info = e.info))
        : (this.shape = "stack");
  };
  ($.prototype.isGlow = !0),
    ($.prototype.stringify = function () {
      if (this.child.isBlock) return this.child.stringify("+");
      var e = this.child.stringify().split("\n");
      return e
        .map(function (e) {
          return "+ " + e;
        })
        .join("\n");
    }),
    ($.prototype.translate = function (e) {
      this.child.translate(e);
    });
  var ee = function (e) {
    (this.blocks = e),
      (this.isEmpty = !e.length),
      (this.isFinal = !this.isEmpty && e[e.length - 1].isFinal);
  };
  (ee.prototype.isScript = !0),
    (ee.prototype.stringify = function () {
      return this.blocks
        .map(function (e) {
          var t = e.stringify();
          return e.comment && (t += " " + e.comment.stringify()), t;
        })
        .join("\n");
    }),
    (ee.prototype.translate = function (e) {
      this.blocks.forEach(function (t) {
        t.translate(e);
      });
    });
  var te = function (e) {
    this.scripts = e;
  };
  (te.prototype.stringify = function () {
    return this.scripts
      .map(function (e) {
        return e.stringify();
      })
      .join("\n\n");
  }),
    (te.prototype.translate = function (e) {
      this.scripts.forEach(function (t) {
        t.translate(e);
      });
    });
  var se = {
      Label: X,
      Icon: q,
      Input: Z,
      Block: Q,
      Comment: J,
      Glow: $,
      Script: ee,
      Document: te,
    },
    oe = se.Label,
    ie = se.Icon,
    ae = se.Input,
    ne = se.Block,
    re = se.Comment,
    ce = se.Glow,
    le = se.Script,
    pe = se.Document,
    he = z.allLanguages,
    de = z.lookupDropdown,
    ue = z.hexColorPat,
    ge = z.minifyHash,
    fe = z.lookupHash,
    me = z.hashSpec,
    ye = z.applyOverrides,
    be = z.rtlLanguages,
    ke = z.iconPat,
    we = z.blockName,
    Ae = {
      "append:toList:": 1,
      "deleteLine:ofList:": 1,
      "insert:at:ofList:": 2,
      "setLine:ofList:to:": 1,
      "showList:": 0,
      "hideList:": 0,
    },
    Se = { parse: S }.parse,
    Le = se.Label,
    Oe = se.Icon,
    ve = se.Input,
    Ee = se.Block,
    Re = se.Comment,
    Ie = se.Glow,
    Ce = se.Script,
    Te = se.Document,
    Ne = z.allLanguages,
    Me = z.loadLanguages,
    Pe = {
      allLanguages: Ne,
      loadLanguages: Me,
      parse: Se,
      Label: Le,
      Icon: Oe,
      Input: ve,
      Block: Ee,
      Comment: Re,
      Glow: Ie,
      Script: Ce,
      Document: Te,
    },
    De = e(function (e) {
      function s(e, s) {
        return t({}, e, s);
      }
      function o(e, t) {
        if (!e) throw "Assertion failed! " + (t || "");
      }
      var i,
        a,
        n = { textContent: !0 },
        c = (e.exports = {
          init: function (e) {
            i = e.document;
            var t = e.DOMParser;
            (a = new t().parseFromString("<xml></xml>", "application/xml")),
              (c.XMLSerializer = e.XMLSerializer);
          },
          makeCanvas: function () {
            return i.createElement("canvas");
          },
          cdata: function (e) {
            return a.createCDATASection(e);
          },
          el: function e(t, s) {
            var e = i.createElementNS("http://www.w3.org/2000/svg", t);
            return c.setProps(e, s);
          },
          setProps: function (e, t) {
            for (var s in t) {
              var o = "" + t[s];
              n[s]
                ? (e[s] = o)
                : /^xlink:/.test(s)
                ? e.setAttributeNS(
                    "http://www.w3.org/1999/xlink",
                    s.slice(6),
                    o
                  )
                : null !== t[s] &&
                  t.hasOwnProperty(s) &&
                  e.setAttributeNS(null, s, o);
            }
            return e;
          },
          withChildren: function (e, t) {
            for (var s = 0; s < t.length; s++) e.appendChild(t[s]);
            return e;
          },
          group: function (e) {
            return c.withChildren(c.el("g"), e);
          },
          newSVG: function (e, t) {
            return c.el("svg", { version: "1.1", width: e, height: t });
          },
          polygon: function (e) {
            return c.el("polygon", s(e, { points: e.points.join(" ") }));
          },
          path: function (e) {
            return c.el("path", s(e, { path: null, d: e.path.join(" ") }));
          },
          text: function e(t, o, i, a) {
            var e = c.el("text", s(a, { x: t, y: o, textContent: i }));
            return e;
          },
          symbol: function (e) {
            return c.el("use", { "xlink:href": e });
          },
          move: function (e, t, s) {
            return (
              c.setProps(s, {
                transform: ["translate(", e, " ", t, ")"].join(""),
              }),
              s
            );
          },
          translatePath: function (e, t, s) {
            for (
              var a, n = !0, r = s.split(" "), c = [], l = 0;
              l < r.length;
              l++
            ) {
              if (((a = r[l]), "A" === a)) {
                var p = l + 5;
                for (c.push("A"); l < p; ) c.push(r[++l]);
                continue;
              } else
                /[A-Za-z]/.test(a)
                  ? o(n)
                  : ((a = +a), (a += n ? e : t), (n = !n));
              c.push(a);
            }
            return c.join(" ");
          },
          rect: function (e, t, o) {
            return c.el("rect", s(o, { x: 0, y: 0, width: e, height: t }));
          },
          ellipse: function (e, t, o) {
            return c.el(
              "ellipse",
              s(o, { cx: e / 2, cy: t / 2, rx: e / 2, ry: t / 2 })
            );
          },
          arc: function (e, t, s, o, i, a) {
            return ["L", e, t, "A", i, a, 0, 0, 1, s, o].join(" ");
          },
          arcw: function (e, t, s, o, i, a) {
            return ["L", e, t, "A", i, a, 0, 0, 0, s, o].join(" ");
          },
          roundedPath: function (e, t) {
            var s = t / 2;
            return [
              "M",
              s,
              0,
              c.arc(e - s, 0, e - s, t, s, s),
              c.arc(s, t, s, 0, s, s),
              "Z",
            ];
          },
          roundedRect: function (e, t, o) {
            return c.path(s(o, { path: c.roundedPath(e, t) }));
          },
          pointedPath: function (e, t) {
            var s = t / 2;
            return [
              "M",
              s,
              0,
              "L",
              e - s,
              0,
              e,
              s,
              "L",
              e,
              s,
              e - s,
              t,
              "L",
              s,
              t,
              0,
              s,
              "L",
              0,
              s,
              s,
              0,
              "Z",
            ];
          },
          pointedRect: function (e, t, o) {
            return c.path(s(o, { path: c.pointedPath(e, t) }));
          },
          getTop: function (e) {
            return [
              "M",
              0,
              3,
              "L",
              3,
              0,
              "L",
              13,
              0,
              "L",
              16,
              3,
              "L",
              24,
              3,
              "L",
              27,
              0,
              "L",
              e - 3,
              0,
              "L",
              e,
              3,
            ].join(" ");
          },
          getRingTop: function (e) {
            return [
              "M",
              0,
              3,
              "L",
              3,
              0,
              "L",
              7,
              0,
              "L",
              10,
              3,
              "L",
              16,
              3,
              "L",
              19,
              0,
              "L",
              e - 3,
              0,
              "L",
              e,
              3,
            ].join(" ");
          },
          getRightAndBottom: function (e, t, s, o) {
            "undefined" == typeof o && (o = 0);
            var i = ["L", e, t - 3, "L", e - 3, t];
            return (
              s &&
                (i = i.concat([
                  "L",
                  o + 27,
                  t,
                  "L",
                  o + 24,
                  t + 3,
                  "L",
                  o + 16,
                  t + 3,
                  "L",
                  o + 13,
                  t,
                ])),
              (i =
                0 < o
                  ? i.concat(["L", o + 2, t, "L", o, t + 2])
                  : i.concat(["L", o + 3, t, "L", 0, t - 3])),
              i.join(" ")
            );
          },
          getArm: function (e, t) {
            return [
              "L",
              15,
              t - 2,
              "L",
              17,
              t,
              "L",
              e - 3,
              t,
              "L",
              e,
              t + 3,
            ].join(" ");
          },
          stackRect: function (e, t, o) {
            return c.path(
              s(o, {
                path: [c.getTop(e), c.getRightAndBottom(e, t, !0, 0), "Z"],
              })
            );
          },
          capPath: function (e, t) {
            return [c.getTop(e), c.getRightAndBottom(e, t, !1, 0), "Z"];
          },
          ringCapPath: function (e, t) {
            return [c.getRingTop(e), c.getRightAndBottom(e, t, !1, 0), "Z"];
          },
          capRect: function (e, t, o) {
            return c.path(s(o, { path: c.capPath(e, t) }));
          },
          hatRect: function (e, t, o) {
            return c.path(
              s(o, {
                path: [
                  "M",
                  0,
                  12,
                  c.arc(0, 12, 80, 10, 80, 80),
                  "L",
                  e - 3,
                  10,
                  "L",
                  e,
                  13,
                  c.getRightAndBottom(e, t, !0),
                  "Z",
                ],
              })
            );
          },
          curve: function (e, t, s, o, i) {
            var a = Math.round,
              i = i || 0.42,
              n = a((e + s) / 2 + i * (o - t)),
              r = a((t + o) / 2 - i * (s - e));
            return [n, r, s, o].join(" ");
          },
          procHatBase: function (e, t, o, i) {
            var o = O(0.2, 35 / e);
            return c.path(
              s(i, {
                path: [
                  "M",
                  0,
                  15,
                  "Q",
                  c.curve(0, 15, e, 15, o),
                  c.getRightAndBottom(e, t, !0),
                  "M",
                  -1,
                  13,
                  "Q",
                  c.curve(-1, 13, e + 1, 13, o),
                  "Q",
                  c.curve(e + 1, 13, e, 16, 0.6),
                  "Q",
                  c.curve(e, 16, 0, 16, -o),
                  "Q",
                  c.curve(0, 16, -1, 13, 0.6),
                  "Z",
                ],
              })
            );
          },
          procHatCap: function (e, t, s) {
            return c.path({
              path: [
                "M",
                -1,
                13,
                "Q",
                c.curve(-1, 13, e + 1, 13, s),
                "Q",
                c.curve(e + 1, 13, e, 16, 0.6),
                "Q",
                c.curve(e, 16, 0, 16, -s),
                "Q",
                c.curve(0, 16, -1, 13, 0.6),
                "Z",
              ],
              class: "sb-define-hat-cap",
            });
          },
          procHatRect: function (e, t, s) {
            var o = O(0.2, 35 / e);
            return c.move(
              0,
              t - 52,
              c.group([c.procHatBase(e, 52, o, s), c.procHatCap(e, 52, o)])
            );
          },
          mouthRect: function (e, t, o, a, n) {
            for (
              var r,
                l = a[0].height,
                h = [c.getTop(e), c.getRightAndBottom(e, l, !0, 15)],
                p = 1;
              p < a.length;
              p += 2
            ) {
              (r = p + 2 === a.length),
                (l += a[p].height - 3),
                h.push(c.getArm(e, l));
              var d = !(r && o),
                u = r ? 0 : 15;
              (l += a[p + 1].height + 3),
                h.push(c.getRightAndBottom(e, l, d, u));
            }
            return c.path(s(n, { path: h }));
          },
          ringRect: function (e, t, o, i, a, n, r) {
            var l =
              "reporter" === n
                ? c.roundedPath
                : "boolean" === n
                ? c.pointedPath
                : 40 > i
                ? c.ringCapPath
                : c.capPath;
            return c.path(
              s(r, {
                path: [
                  "M",
                  8,
                  0,
                  c.arcw(8, 0, 0, 8, 8, 8),
                  c.arcw(0, t - 8, 8, t, 8, 8),
                  c.arcw(e - 8, t, e, t - 8, 8, 8),
                  c.arcw(e, 8, e - 8, 0, 8, 8),
                  "Z",
                  c.translatePath(4, o || 4, l(i, a).join(" ")),
                ],
                "fill-rule": "even-odd",
              })
            );
          },
          commentRect: function (e, t, o) {
            return c.path(
              s(o, {
                class: "sb-comment",
                path: [
                  "M",
                  6,
                  0,
                  c.arc(e - 6, 0, e, 6, 6, 6),
                  c.arc(e, t - 6, e - 6, t, 6, 6),
                  c.arc(6, t, 0, t - 6, 6, 6),
                  c.arc(0, 6, 6, 0, 6, 6),
                  "Z",
                ],
              })
            );
          },
          commentLine: function (e, t) {
            return c.move(
              -e,
              9,
              c.rect(e, 2, s(t, { class: "sb-comment-line" }))
            );
          },
          strikethroughLine: function (e, t) {
            return c.path(
              s(t, {
                path: ["M", 0, 0, "L", e, 0],
                class: "sb-diff sb-diff-del",
              })
            );
          },
        });
    }),
    Be = De.init,
    xe = De.makeCanvas,
    Fe = De.cdata,
    He = De.el,
    ze = De.setProps,
    Ge = De.withChildren,
    Ve = De.group,
    _e = De.newSVG,
    je = De.polygon,
    Ue = De.path,
    Ye = De.text,
    Ke = De.symbol,
    We = De.move,
    Xe = De.translatePath,
    qe = De.rect,
    Ze = De.ellipse,
    Qe = De.arc,
    Je = De.arcw,
    $e = De.roundedPath,
    et = De.roundedRect,
    tt = De.pointedPath,
    st = De.pointedRect,
    ot = De.getTop,
    it = De.getRingTop,
    at = De.getRightAndBottom,
    nt = De.getArm,
    rt = De.stackRect,
    ct = De.capPath,
    lt = De.ringCapPath,
    pt = De.capRect,
    ht = De.hatRect,
    dt = De.curve,
    ut = De.procHatBase,
    gt = De.procHatCap,
    ft = De.procHatRect,
    mt = De.mouthRect,
    yt = De.ringRect,
    bt = De.commentRect,
    kt = De.commentLine,
    wt = De.strikethroughLine,
    At = function (e, t) {
      (this.el = De.el(
        "filter",
        L(t, { id: e, x0: "-50%", y0: "-50%", width: "200%", height: "200%" })
      )),
        (this.highestId = 0);
    };
  (At.prototype.fe = function (e, t, s) {
    var o = e.toLowerCase().replace(/gaussian|osite/, ""),
      i = [o, "-", ++this.highestId].join("");
    return (
      this.el.appendChild(
        De.withChildren(De.el("fe" + e, L(t, { result: i })), s || [])
      ),
      i
    );
  }),
    (At.prototype.comp = function (e, t, s, o) {
      return this.fe("Composite", L(o, { operator: e, in: t, in2: s }));
    }),
    (At.prototype.subtract = function (e, t) {
      return this.comp("arithmetic", e, t, { k2: 1, k3: -1 });
    }),
    (At.prototype.offset = function (e, t, s) {
      return this.fe("Offset", { in: s, dx: e, dy: t });
    }),
    (At.prototype.flood = function (e, t, s) {
      return this.fe("Flood", { in: s, "flood-color": e, "flood-opacity": t });
    }),
    (At.prototype.blur = function (e, t) {
      return this.fe("GaussianBlur", { in: t, stdDeviation: [e, e].join(" ") });
    }),
    (At.prototype.colorMatrix = function (e, t) {
      return this.fe("ColorMatrix", {
        in: e,
        type: "matrix",
        values: t.join(" "),
      });
    }),
    (At.prototype.merge = function (e) {
      this.fe(
        "Merge",
        {},
        e.map(function (e) {
          return De.el("feMergeNode", { in: e });
        })
      );
    });
  var St = At,
    Lt = e(function (e) {
      var t = (e.exports = {
        cssContent: "\n    .sb-label {\n      font-family: Consolas, 'Microsoft YaHei';\n      font-weight: bold;\n      fill: #fff;\n      font-size: 10px;\n      word-spacing: +1px;\n    }\n\n    .sb-obsolete { fill: #d42828; }\n    .sb-motion { fill: #4a6cd4; }\n    .sb-looks { fill: #8a55d7; }\n    .sb-sound { fill: #bb42c3; }\n    .sb-pen { fill: #0e9a6c;  }\n    .sb-events { fill: #c88330; }\n    .sb-control { fill: #e1a91a; }\n    .sb-sensing { fill: #2ca5e2; }\n    .sb-operators { fill: #5cb712; }\n    .sb-variables { fill: #ee7d16; }\n    .sb-list { fill: #cc5b22 }\n    .sb-custom { fill: #632d99; }\n    .sb-custom-arg { fill: #5947b1; }\n    .sb-extension { fill: #4b4a60; }\n    .sb-grey { fill: #969696; }\n\n    .sb-bevel {\n      filter: url(#bevelFilter);\n    }\n\n    .sb-input {\n      filter: url(#inputBevelFilter);\n    }\n    .sb-input-number,\n    .sb-input-string,\n    .sb-input-number-dropdown {\n      fill: #fff;\n    }\n    .sb-literal-number,\n    .sb-literal-string,\n    .sb-literal-number-dropdown,\n    .sb-literal-dropdown {\n      font-weight: normal;\n      font-size: 9px;\n      word-spacing: 0;\n    }\n    .sb-literal-number,\n    .sb-literal-string,\n    .sb-literal-number-dropdown {\n      fill: #000;\n    }\n\n    .sb-darker {\n      filter: url(#inputDarkFilter);\n    }\n\n    .sb-outline {\n      stroke: #fff;\n      stroke-opacity: 0.2;\n      stroke-width: 2;\n      fill: none;\n    }\n\n    .sb-define-hat-cap {\n      stroke: #632d99;\n      stroke-width: 1;\n      fill: #8e2ec2;\n    }\n\n    .sb-comment {\n      fill: #ffffa5;\n      stroke: #d0d1d2;\n      stroke-width: 1;\n    }\n    .sb-comment-line {\n      fill: #ffff80;\n    }\n    .sb-comment-label {\n      font-family: Consolas, 'Microsoft YaHei';\n      font-weight: bold;\n      fill: #5c5d5f;\n      word-spacing: 0;\n      font-size: 12px;\n    }\n\n    .sb-diff {\n      fill: none;\n      stroke: #000;\n    }\n    .sb-diff-ins {\n      stroke-width: 2px;\n    }\n    .sb-diff-del {\n      stroke-width: 3px;\n    }\n  ".replace(
          /[ \n]+/,
          " "
        ),
        makeIcons: function () {
          return [
            De.el("path", {
              d:
                "M1.504 21L0 19.493 4.567 0h1.948l-.5 2.418s1.002-.502 3.006 0c2.006.503 3.008 2.01 6.517 2.01 3.508 0 4.463-.545 4.463-.545l-.823 9.892s-2.137 1.005-5.144.696c-3.007-.307-3.007-2.007-6.014-2.51-3.008-.502-4.512.503-4.512.503L1.504 21z",
              fill: "#3f8d15",
              id: "greenFlag",
            }),
            De.el("path", {
              d:
                "M6.724 0C3.01 0 0 2.91 0 6.5c0 2.316 1.253 4.35 3.14 5.5H5.17v-1.256C3.364 10.126 2.07 8.46 2.07 6.5 2.07 4.015 4.152 2 6.723 2c1.14 0 2.184.396 2.993 1.053L8.31 4.13c-.45.344-.398.826.11 1.08L15 8.5 13.858.992c-.083-.547-.514-.714-.963-.37l-1.532 1.172A6.825 6.825 0 0 0 6.723 0z",
              fill: "#fff",
              id: "turnRight",
            }),
            De.el("path", {
              d:
                "M3.637 1.794A6.825 6.825 0 0 1 8.277 0C11.99 0 15 2.91 15 6.5c0 2.316-1.253 4.35-3.14 5.5H9.83v-1.256c1.808-.618 3.103-2.285 3.103-4.244 0-2.485-2.083-4.5-4.654-4.5-1.14 0-2.184.396-2.993 1.053L6.69 4.13c.45.344.398.826-.11 1.08L0 8.5 1.142.992c.083-.547.514-.714.963-.37l1.532 1.172z",
              fill: "#fff",
              id: "turnLeft",
            }),
            De.el("path", { d: "M0 0L4 4L0 8Z", fill: "#111", id: "addInput" }),
            De.el("path", { d: "M4 0L4 8L0 4Z", fill: "#111", id: "delInput" }),
            De.setProps(
              De.group([
                De.el("path", {
                  d: "M8 0l2 -2l0 -3l3 0l-4 -5l-4 5l3 0l0 3l-8 0l0 2",
                  fill: "#000",
                  opacity: "0.3",
                }),
                De.move(
                  -1,
                  -1,
                  De.el("path", {
                    d: "M8 0l2 -2l0 -3l3 0l-4 -5l-4 5l3 0l0 3l-8 0l0 2",
                    fill: "#fff",
                    opacity: "0.9",
                  })
                ),
              ]),
              { id: "loopArrow" }
            ),
          ];
        },
        makeStyle: function () {
          var e = De.el("style");
          return e.appendChild(De.cdata(t.cssContent)), e;
        },
        bevelFilter: function (e, t) {
          var o = new St(e),
            i = "SourceAlpha",
            a = t ? -1 : 1,
            s = o.blur(1, i);
          return (
            o.merge([
              "SourceGraphic",
              o.comp(
                "in",
                o.flood("#fff", 0.15),
                o.subtract(i, o.offset(+a, +a, s))
              ),
              o.comp(
                "in",
                o.flood("#000", 0.7),
                o.subtract(i, o.offset(-a, -a, s))
              ),
            ]),
            o.el
          );
        },
        darkFilter: function (e) {
          var t = new St(e);
          return (
            t.merge([
              "SourceGraphic",
              t.comp("in", t.flood("#000", 0.2), "SourceAlpha"),
            ]),
            t.el
          );
        },
        darkRect: function (e, t, s, o) {
          return De.setProps(
            De.group([
              De.setProps(o, { class: ["sb-" + s, "sb-darker"].join(" ") }),
            ]),
            { width: e, height: t }
          );
        },
        defaultFontFamily: "Consolas, 'Microsoft YaHei'",
      });
    }),
    Ot = Lt.cssContent,
    vt = Lt.makeIcons,
    Et = Lt.makeStyle,
    Rt = Lt.bevelFilter,
    It = Lt.darkFilter,
    Ct = Lt.darkRect,
    Tt = Lt.defaultFontFamily,
    Nt = Pe.Label,
    Mt = Pe.Icon,
    Pt = Pe.Input,
    Dt = Pe.Block,
    Bt = Pe.Comment,
    xt = Pe.Glow,
    Ft = Pe.Script,
    Ht = Pe.Document,
    zt = Lt.defaultFontFamily,
    Gt = Lt.makeStyle,
    Vt = Lt.makeIcons,
    _t = Lt.darkRect,
    jt = Lt.bevelFilter,
    Ut = Lt.darkFilter,
    Yt = function (e) {
      t(this, e),
        (this.el = null),
        (this.height = 12),
        (this.metrics = null),
        (this.x = 0);
    };
  (Yt.prototype.isLabel = !0),
    (Yt.prototype.draw = function () {
      return this.el;
    }),
    Object.defineProperty(Yt.prototype, "width", {
      get: function () {
        return this.metrics.width;
      },
    }),
    (Yt.metricsCache = {}),
    (Yt.toMeasure = []),
    (Yt.prototype.measure = function () {
      var e = this.value,
        t = "sb-" + this.cls;
      this.el = De.text(0, 10, e, { class: "sb-label " + t });
      var s = Yt.metricsCache[t];
      if (
        (s || (s = Yt.metricsCache[t] = Object.create(null)),
        Object.hasOwnProperty.call(s, e))
      )
        this.metrics = s[e];
      else {
        var o = /comment-label/.test(this.cls)
          ? "bold 12px Helevetica, Arial, DejaVu Sans, sans-serif"
          : /literal/.test(this.cls)
          ? "normal 9px " + zt
          : "bold 10px " + zt;
        this.metrics = s[e] = Yt.measure(e, o);
      }
    }),
    (Yt.measure = function (e, t) {
      var s = Yt.measuring;
      s.font = t;
      var o = s.measureText(e),
        i = 0 | (o.width + 0.5);
      return { width: i };
    });
  var Kt = function e(s) {
    t(this, s);
    var o = e.icons[this.name];
    if (!o) throw new Error("no info for icon: " + this.name);
    t(this, o);
  };
  (Kt.prototype.isIcon = !0),
    (Kt.prototype.draw = function () {
      return De.symbol("#" + this.name, {
        width: this.width,
        height: this.height,
      });
    }),
    (Kt.icons = {
      greenFlag: { width: 20, height: 21, dy: -2 },
      turnLeft: { width: 15, height: 12, dy: 1 },
      turnRight: { width: 15, height: 12, dy: 1 },
      loopArrow: { width: 14, height: 11 },
      addInput: { width: 4, height: 8 },
      delInput: { width: 4, height: 8 },
    });
  var Wt = function (e) {
    t(this, e), e.label && (this.label = es(e.label)), (this.x = 0);
  };
  (Wt.prototype.measure = function () {
    this.hasLabel && this.label.measure();
  }),
    (Wt.shapes = {
      string: De.rect,
      number: De.roundedRect,
      "number-dropdown": De.roundedRect,
      color: De.rect,
      dropdown: De.rect,
      boolean: De.pointedRect,
      stack: De.stackRect,
      reporter: De.roundedRect,
    }),
    (Wt.prototype.draw = function (e) {
      if (this.hasLabel)
        var t = this.label.draw(),
          s = v(
            14,
            this.label.width +
              ("string" === this.shape || "number-dropdown" === this.shape
                ? 6
                : 9)
          );
      else var s = this.isInset ? 30 : this.isColor ? 13 : null;
      this.hasArrow && (s += 10), (this.width = s);
      var o = (this.height = this.isRound || this.isColor ? 13 : 14),
        i = Wt.shapes[this.shape](s, o);
      this.isColor
        ? De.setProps(i, { fill: this.value })
        : this.isDarker &&
          ((i = _t(s, o, e.info.category, i)),
          e.info.color && De.setProps(i, { fill: e.info.color }));
      var a = De.group([
        De.setProps(i, {
          class: ["sb-input", "sb-input-" + this.shape].join(" "),
        }),
      ]);
      if (this.hasLabel) {
        var n = this.isRound ? 5 : 4;
        a.appendChild(De.move(n, 0, t));
      }
      if (this.hasArrow) {
        var r = "dropdown" === this.shape ? 5 : 4;
        a.appendChild(
          De.move(
            s - 10,
            r,
            De.polygon({
              points: [7, 0, 3.5, 4, 0, 0],
              fill: "#000",
              opacity: "0.6",
            })
          )
        );
      }
      return a;
    });
  var Xt = function (e) {
    switch (
      (t(this, e),
      (this.children = e.children.map(es)),
      (this.comment = this.comment ? es(this.comment) : null),
      this.info.category)
    ) {
      case "music":
        this.info.category = "sound";
        break;
      case "video":
        this.info.category = "sensing";
        break;
      case "tts":
      case "translate":
      case "wedo":
      case "ev3":
      case "microbit":
      case "makeymakey":
        this.info.category = "extension";
    }
    (this.x = 0),
      (this.width = null),
      (this.height = null),
      (this.firstLine = null),
      (this.innerWidth = null);
  };
  (Xt.prototype.isBlock = !0),
    (Xt.prototype.measure = function () {
      for (var e, t = 0; t < this.children.length; t++)
        (e = this.children[t]), e.measure && e.measure();
      this.comment && this.comment.measure();
    }),
    (Xt.shapes = {
      stack: De.stackRect,
      "c-block": De.stackRect,
      "if-block": De.stackRect,
      celse: De.stackRect,
      cend: De.stackRect,
      cap: De.capRect,
      reporter: De.roundedRect,
      boolean: De.pointedRect,
      hat: De.hatRect,
      "define-hat": De.procHatRect,
      ring: De.roundedRect,
    }),
    (Xt.prototype.drawSelf = function (e, t, s) {
      if (1 < s.length)
        return De.mouthRect(e, t, this.isFinal, s, {
          class: ["sb-" + this.info.category, "sb-bevel"].join(" "),
        });
      if ("outline" === this.info.shape)
        return De.setProps(De.stackRect(e, t), { class: "sb-outline" });
      if (this.isRing) {
        var o = this.children[0];
        if (o && (o.isInput || o.isBlock || o.isScript)) {
          var i = o.isScript ? "stack" : o.isInput ? o.shape : o.info.shape;
          return De.ringRect(e, t, o.y, o.width, o.height, i, {
            class: ["sb-" + this.info.category, "sb-bevel"].join(" "),
          });
        }
      }
      var a = Xt.shapes[this.info.shape];
      if (!a) throw new Error("no shape func: " + this.info.shape);
      return a(e, t, {
        class: ["sb-" + this.info.category, "sb-bevel"].join(" "),
      });
    }),
    (Xt.prototype.minDistance = function (e) {
      return this.isBoolean
        ? e.isReporter
          ? 0 | (4 + e.height / 4)
          : e.isLabel
          ? 0 | (5 + e.height / 2)
          : e.isBoolean || "boolean" === e.shape
          ? 5
          : 0 | (2 + e.height / 2)
        : this.isReporter
        ? (e.isInput && e.isRound) ||
          ((e.isReporter || e.isBoolean) && !e.hasScript)
          ? 0
          : e.isLabel
          ? 0 | (2 + e.height / 2)
          : 0 | (-2 + e.height / 2)
        : 0;
    }),
    (Xt.padding = {
      hat: [15, 6, 2],
      "define-hat": [21, 8, 9],
      reporter: [3, 4, 1],
      boolean: [3, 4, 2],
      cap: [6, 6, 2],
      "c-block": [3, 6, 2],
      "if-block": [3, 6, 2],
      ring: [4, 4, 2],
      null: [4, 6, 2],
    }),
    (Xt.prototype.draw = function () {
      function e(e) {
        0 === w.length
          ? (g.height += a + r)
          : ((g.height += e ? 0 : 2), (g.y -= 1)),
          (c += g.height),
          w.push(g);
      }
      var t = "define-hat" === this.info.shape,
        s = this.children,
        o = Xt.padding[this.info.shape] || Xt.padding[null],
        a = o[0],
        n = o[1],
        r = o[2],
        c = 0,
        l = function (e) {
          (this.y = e),
            (this.width = 0),
            (this.height = e ? 13 : 16),
            (this.children = []);
        },
        d = 0,
        u = 0,
        g = new l(c);
      if (this.info.isRTL) {
        for (
          var f = 0,
            m = function () {
              s = s
                .slice(0, f)
                .concat(s.slice(f, b).reverse())
                .concat(s.slice(b));
            }.bind(this),
            b = 0;
          b < s.length;
          b++
        )
          s[b].isScript && (m(), (f = b + 1));
        f < b && m();
      }
      for (var k, w = [], b = 0; b < s.length; b++)
        if (((k = s[b]), (k.el = k.draw(this)), k.isScript && this.isCommand))
          (this.hasScript = !0),
            e(),
            (k.y = c),
            w.push(k),
            (u = v(u, v(1, k.width))),
            (k.height = v(12, k.height) + 3),
            (c += k.height),
            (g = new l(c));
        else if (k.isArrow) g.children.push(k);
        else {
          var A = 0 < b ? 30 : 0,
            S = this.isCommand ? 0 : this.minDistance(k),
            L = this.isCommand ? (k.isBlock || k.isInput ? A : 0) : S;
          L && !w.length && g.width < L - n && (g.width = L - n),
            (k.x = g.width),
            (g.width += k.width),
            (d = v(d, g.width + v(0, S - n))),
            (g.width += 4),
            k.isLabel || (g.height = v(g.height, k.height)),
            g.children.push(k);
        }
      if (
        (e(!0),
        (d = v(
          d + 2 * n,
          this.isHat || this.hasScript
            ? 83
            : this.isCommand || this.isOutline || this.isRing
            ? 39
            : 20
        )),
        (this.height = c),
        (this.width = u ? v(d, 15 + u) : d),
        t)
      ) {
        var E = O(26, 0 | (3.5 + 0.13 * d)) - 18;
        (this.height += E), (a += 2 * E);
      }
      (this.firstLine = w[0]), (this.innerWidth = d);
      for (var g, p = [], b = 0; b < w.length; b++) {
        if (((g = w[b]), g.isScript)) {
          p.push(De.move(15, g.y, g.el));
          continue;
        }
        for (var k, R = g.height, h = 0; h < g.children.length; h++) {
          if (((k = g.children[h]), k.isArrow)) {
            p.push(De.move(d - 15, this.height - 3, k.el));
            continue;
          }
          var c = a + (R - k.height - a - r) / 2 - 1;
          if (
            (t && k.isLabel ? (c += 3) : k.isIcon && (c += 0 | k.dy),
            !(this.isRing && ((k.y = 0 | (g.y + c)), k.isInset))) &&
            (p.push(De.move(n + k.x, 0 | (g.y + c), k.el)), "+" === k.diff)
          ) {
            var I = De.insEllipse(k.width, k.height);
            p.push(De.move(n + k.x, 0 | (g.y + c), I));
          }
        }
      }
      var C = this.drawSelf(d, this.height, w);
      return (
        p.splice(0, 0, C),
        this.info.color && De.setProps(C, { fill: this.info.color }),
        De.group(p)
      );
    });
  var qt = function (e) {
    t(this, e), (this.label = es(e.label)), (this.width = null);
  };
  (qt.prototype.isComment = !0),
    (qt.lineLength = 12),
    (qt.prototype.height = 20),
    (qt.prototype.measure = function () {
      this.label.measure();
    }),
    (qt.prototype.draw = function () {
      var e = this.label.draw();
      return (
        (this.width = this.label.width + 16),
        De.group([
          De.commentLine(this.hasBlock ? qt.lineLength : 0, 6),
          De.commentRect(this.width, this.height, { class: "sb-comment" }),
          De.move(8, 4, e),
        ])
      );
    });
  var Zt = function (e) {
    t(this, e),
      (this.child = es(e.child)),
      (this.width = null),
      (this.height = null),
      (this.y = 0);
  };
  (Zt.prototype.isGlow = !0),
    (Zt.prototype.measure = function () {
      this.child.measure();
    }),
    (Zt.prototype.drawSelf = function () {
      var e,
        t = this.child,
        s = this.width,
        o = this.height - 1;
      if (t.isScript)
        e =
          !t.isEmpty && t.blocks[0].isHat
            ? De.hatRect(s, o)
            : t.isFinal
            ? De.capRect(s, o)
            : De.stackRect(s, o);
      else var e = t.drawSelf(s, o, []);
      return De.setProps(e, { class: "sb-diff sb-diff-ins" });
    }),
    (Zt.prototype.draw = function () {
      var e = this.child,
        t = e.isScript ? e.draw(!0) : e.draw();
      return (
        (this.width = e.width),
        (this.height = (e.isBlock && e.firstLine.height) || e.height),
        De.group([t, this.drawSelf()])
      );
    });
  var Qt = function (e) {
    t(this, e), (this.blocks = e.blocks.map(es)), (this.y = 0);
  };
  (Qt.prototype.isScript = !0),
    (Qt.prototype.measure = function () {
      for (var e = 0; e < this.blocks.length; e++) this.blocks[e].measure();
    }),
    (Qt.prototype.draw = function (e) {
      var t = [],
        s = 0;
      this.width = 0;
      for (var o = 0; o < this.blocks.length; o++) {
        var a = this.blocks[o],
          n = e ? 0 : 2,
          r = a.draw();
        t.push(De.move(n, s, r)), (this.width = v(this.width, a.width));
        var c = a.diff;
        if ("-" === c) {
          var l = a.width,
            p = a.firstLine.height || a.height;
          t.push(De.move(n, s + p / 2 + 1, De.strikethroughLine(l))),
            (this.width = v(this.width, a.width));
        }
        s += a.height;
        var h = a.comment;
        if (h) {
          var d = a.firstLine,
            u = a.innerWidth + 2 + qt.lineLength,
            g = s - a.height + d.height / 2,
            f = h.draw();
          t.push(De.move(u, g - h.height / 2, f)),
            (this.width = v(this.width, u + h.width));
        }
      }
      return (
        (this.height = s),
        e || this.isFinal || (this.height += 3),
        !e && a.isGlow && (this.height += 2),
        De.group(t)
      );
    });
  var Jt = function (e) {
    t(this, e),
      (this.scripts = e.scripts.map(es)),
      (this.width = null),
      (this.height = null),
      (this.el = null),
      (this.defs = null);
  };
  (Jt.prototype.measure = function () {
    this.scripts.forEach(function (e) {
      e.measure();
    });
  }),
    (Jt.prototype.render = function () {
      if ("function" == typeof ocbptions)
        throw new Error("render() no longer takes a callback");
      this.measure();
      for (var e, t = 0, s = 0, o = [], a = 0; a < this.scripts.length; a++)
        (e = this.scripts[a]),
          s && (s += 10),
          (e.y = s),
          o.push(De.move(0, s, e.draw())),
          (s += e.height),
          (t = v(t, e.width + 4));
      (this.width = t), (this.height = s);
      var n = De.newSVG(t, s);
      return (
        n.appendChild(
          (this.defs = De.withChildren(
            De.el("defs"),
            [
              jt("bevelFilter", !1),
              jt("inputBevelFilter", !0),
              Ut("inputDarkFilter"),
            ].concat(Vt())
          ))
        ),
        n.appendChild(De.group(o)),
        (this.el = n),
        n
      );
    }),
    (Jt.prototype.exportSVGString = function () {
      if (null == this.el) throw new Error("call draw() first");
      var e = Gt();
      this.defs.appendChild(e);
      var t = new De.XMLSerializer().serializeToString(this.el);
      return this.defs.removeChild(e), t;
    }),
    (Jt.prototype.exportSVG = function () {
      var e = this.exportSVGString();
      return "data:image/svg+xml;utf8," + e.replace(/[#]/g, encodeURIComponent);
    }),
    (Jt.prototype.toCanvas = function (e, t) {
      t = t || 1;
      var s = De.makeCanvas();
      (s.width = this.width * t), (s.height = this.height * t);
      var o = s.getContext("2d"),
        i = new Image();
      (i.src = this.exportSVG()),
        (i.onload = function () {
          o.save(), o.scale(t, t), o.drawImage(i, 0, 0), o.restore(), e(s);
        });
    }),
    (Jt.prototype.exportPNG = function (e, t) {
      this.toCanvas(function (t) {
        if (URL && URL.createObjectURL && Blob && t.toBlob)
          t.toBlob(function (t) {
            e(URL.createObjectURL(t));
          }, "image/png");
        else e(t.toDataURL("image/png"));
      }, t);
    });
  var $t = function (e) {
      switch (e.constructor) {
        case Nt:
          return Yt;
        case Mt:
          return Kt;
        case Pt:
          return Wt;
        case Dt:
          return Xt;
        case Bt:
          return qt;
        case xt:
          return Zt;
        case Ft:
          return Qt;
        case Ht:
          return Jt;
        default:
          throw new Error("no view for " + e.constructor.name);
      }
    },
    es = function (e) {
      return new ($t(e))(e);
    },
    ts = { newView: es, LabelView: Yt },
    ss = {
      init: function (e) {
        De.init(e),
          (ts.LabelView.measuring = (function () {
            var e = De.makeCanvas();
            return e.getContext("2d");
          })());
      },
      newView: ts.newView,
      makeStyle: Lt.makeStyle,
    },
    os = e(function (e) {
      function s(e, s) {
        return t({}, e, s);
      }
      var o,
        i,
        a = { textContent: !0 },
        n = (e.exports = {
          init: function (e) {
            o = e.document;
            var t = e.DOMParser;
            (i = new t().parseFromString("<xml></xml>", "application/xml")),
              (n.XMLSerializer = e.XMLSerializer);
          },
          makeCanvas: function () {
            return o.createElement("canvas");
          },
          cdata: function (e) {
            return i.createCDATASection(e);
          },
          el: function e(t, s) {
            var e = o.createElementNS("http://www.w3.org/2000/svg", t);
            return n.setProps(e, s);
          },
          setProps: function (e, t) {
            for (var s in t) {
              var o = "" + t[s];
              a[s]
                ? (e[s] = o)
                : /^xlink:/.test(s)
                ? e.setAttributeNS(
                    "http://www.w3.org/1999/xlink",
                    s.slice(6),
                    o
                  )
                : null !== t[s] &&
                  t.hasOwnProperty(s) &&
                  e.setAttributeNS(null, s, o);
            }
            return e;
          },
          withChildren: function (e, t) {
            for (var s = 0; s < t.length; s++) e.appendChild(t[s]);
            return e;
          },
          group: function (e) {
            return n.withChildren(n.el("g"), e);
          },
          newSVG: function (e, t) {
            return n.el("svg", { version: "1.1", width: e, height: t });
          },
          polygon: function (e) {
            return n.el("polygon", s(e, { points: e.points.join(" ") }));
          },
          path: function (e) {
            return n.el("path", s(e, { path: null, d: e.path.join(" ") }));
          },
          text: function e(t, o, i, a) {
            var e = n.el("text", s(a, { x: t, y: o, textContent: i }));
            return e;
          },
          symbol: function (e) {
            return n.el("use", { "xlink:href": e });
          },
          move: function (e, t, s) {
            return (
              n.setProps(s, {
                transform: ["translate(", e, " ", t, ")"].join(""),
              }),
              s
            );
          },
          rect: function (e, t, o) {
            return n.el("rect", s(o, { x: 0, y: 0, width: e, height: t }));
          },
          roundRect: function (e, t, o) {
            return n.rect(e, t, s(o, { rx: 4, ry: 4 }));
          },
          pillRect: function (e, t, o) {
            var i = t / 2;
            return n.rect(e, t, s(o, { rx: i, ry: i }));
          },
          pointedPath: function (e, t) {
            var s = t / 2;
            return [
              ["M", s, 0].join(" "),
              ["L", e - s, 0, e, s].join(" "),
              ["L", e, s, e - s, t].join(" "),
              ["L", s, t, 0, s].join(" "),
              ["L", 0, s, s, 0].join(" "),
              "Z",
            ];
          },
          pointedRect: function (e, t, o) {
            return n.path(s(o, { path: n.pointedPath(e, t) }));
          },
          topNotch: function (e, t) {
            return [
              "c 2 0 3 1 4 2",
              "l 4 4",
              "c 1 1 2 2 4 2",
              "h 12",
              "c 2 0 3 -1 4 -2",
              "l 4 -4",
              "c 1 -1 2 -2 4 -2",
              ["L", e - 4, t].join(" "),
              "a 4 4 0 0 1 4 4",
            ].join(" ");
          },
          getTop: function (e) {
            return ["M 0 4", "A 4 4 0 0 1 4 0", "H 12", n.topNotch(e, 0)].join(
              " "
            );
          },
          getRingTop: function (e) {
            return [
              "M",
              0,
              3,
              "L",
              3,
              0,
              "L",
              7,
              0,
              "L",
              10,
              3,
              "L",
              16,
              3,
              "L",
              19,
              0,
              "L",
              e - 3,
              0,
              "L",
              e,
              3,
            ].join(" ");
          },
          getRightAndBottom: function (e, t, s, o) {
            "undefined" == typeof o && (o = 0);
            var i = [["L", e, t - 4].join(" "), "a 4 4 0 0 1 -4 4"];
            return (
              s &&
                (i = i.concat([
                  ["L", o + 48, t].join(" "),
                  "c -2 0 -3 1 -4 2",
                  "l -4 4",
                  "c -1 1 -2 2 -4 2",
                  "h -12",
                  "c -2 0 -3 -1 -4 -2",
                  "l -4 -4",
                  "c -1 -1 -2 -2 -4 -2",
                ])),
              0 === o
                ? (i.push("L", o + 4, t), i.push("a 4 4 0 0 1 -4 -4"))
                : (i.push("L", o + 4, t), i.push("a 4 4 0 0 0 -4 4")),
              i.join(" ")
            );
          },
          getArm: function (e, t) {
            return [
              ["L", 16, t - 4].join(" "),
              "a 4 4 0 0 0 4 4",
              ["L", 28, t].join(" "),
              n.topNotch(e, t),
            ].join(" ");
          },
          getArmNoNotch: function (e, t) {
            return [
              ["L", 16, t - 4].join(" "),
              "a 4 4 0 0 0 4 4",
              ["L", 28, t].join(" "),
              ["L", e - 4, t].join(" "),
              "a 4 4 0 0 1 4 4",
            ].join(" ");
          },
          stackRect: function (e, t, o) {
            return n.path(
              s(o, {
                path: [n.getTop(e), n.getRightAndBottom(e, t, !0, 0), "Z"],
              })
            );
          },
          capPath: function (e, t) {
            return [n.getTop(e), n.getRightAndBottom(e, t, !1, 0), "Z"];
          },
          ringCapPath: function (e, t) {
            return [n.getRingTop(e), n.getRightAndBottom(e, t, !1, 0), "Z"];
          },
          capRect: function (e, t, o) {
            return n.path(s(o, { path: n.capPath(e, t) }));
          },
          getHatTop: function (e) {
            return [
              "M 0 16",
              "c 25,-22 71,-22 96,0",
              ["L", e - 4, 16].join(" "),
              "a 4 4 0 0 1 4 4",
            ].join(" ");
          },
          hatRect: function (e, t, o) {
            return n.path(
              s(o, {
                path: [n.getHatTop(e), n.getRightAndBottom(e, t, !0, 0), "Z"],
              })
            );
          },
          getProcHatTop: function (e) {
            return [
              "M 0 20",
              "a 20 20 0 0 1 20 -20",
              ["L", e - 20, 0].join(" "),
              "a 20,20 0 0,1 20,20",
            ].join(" ");
          },
          procHatRect: function (e, t, o) {
            return n.path(
              s(o, {
                path: [
                  n.getProcHatTop(e),
                  n.getRightAndBottom(e, t, !0, 0),
                  "Z",
                ],
              })
            );
          },
          mouthRect: function (e, t, o, a, r) {
            for (
              var c = a[0].height,
                l = [n.getTop(e), n.getRightAndBottom(e, c, !0, 16)],
                p = 1;
              p < a.length;
              p += 2
            ) {
              var h = p + 2 === a.length,
                d = a[p];
              (c += d.height - 3),
                d.isFinal
                  ? l.push(n.getArmNoNotch(e, c))
                  : l.push(n.getArm(e, c));
              var u = h ? 0 : 16;
              (c += a[p + 1].height + 3),
                l.push(n.getRightAndBottom(e, c, !(h && o), u));
            }
            return l.push("Z"), n.path(s(r, { path: l }));
          },
          commentRect: function (e, t, o) {
            return n.roundRect(e, t, s(o, { class: "sb3-comment" }));
          },
          commentLine: function (e, t) {
            return n.move(
              -e,
              9,
              n.rect(e, 2, s(t, { class: "sb3-comment-line" }))
            );
          },
          strikethroughLine: function (e, t) {
            return n.path(
              s(t, {
                path: ["M", 0, 0, "L", e, 0],
                class: "sb3-diff sb3-diff-del",
              })
            );
          },
        });
    }),
    is = os.init,
    as = os.makeCanvas,
    ns = os.cdata,
    rs = os.el,
    cs = os.setProps,
    ls = os.withChildren,
    ps = os.group,
    hs = os.newSVG,
    ds = os.polygon,
    us = os.path,
    gs = os.text,
    fs = os.symbol,
    ms = os.move,
    ys = os.rect,
    bs = os.roundRect,
    ks = os.pillRect,
    ws = os.pointedPath,
    As = os.pointedRect,
    Ss = os.topNotch,
    Ls = os.getTop,
    Os = os.getRingTop,
    vs = os.getRightAndBottom,
    Es = os.getArm,
    Rs = os.getArmNoNotch,
    Is = os.stackRect,
    Cs = os.capPath,
    Ts = os.ringCapPath,
    Ns = os.capRect,
    Ms = os.getHatTop,
    Ps = os.hatRect,
    Ds = os.getProcHatTop,
    Bs = os.procHatRect,
    xs = os.mouthRect,
    Fs = os.commentRect,
    Hs = os.commentLine,
    zs = os.strikethroughLine,
    Gs = e(function (e) {
      var t = (e.exports = {
        cssContent: "\n    .sb3-label {\n      font: 500 12pt Consolas, 'Microsoft YaHei';\n      fill: #fff;\n      word-spacing: +1pt;\n    }\n\n    .sb3-motion { fill: #4c97ff; stroke: #3373cc; }\n    .sb3-motion-alt { fill: #4280d7; }\n    .sb3-motion-dark { fill: #4c97ff; }\n    .sb3-looks { fill: #9966ff; stroke: #774dcb; }\n    .sb3-looks-alt { fill: #855cd6; }\n    .sb3-looks-dark { fill: #bd42bd; }\n    .sb3-sound { fill: #cf63cf; stroke: #bd42bd; }\n    .sb3-sound-alt { fill: #c94fc9; }\n    .sb3-sound-dark { fill: #bd42bd; }\n    .sb3-control { fill: #ffab19; stroke: #cf8b17; }\n    .sb3-control-alt { fill: #ec9c13; }\n    .sb3-control-dark { fill: #cf8b17; }\n    .sb3-events { fill: #ffbf00; stroke: #cc9900; }\n    .sb3-events-alt { fill: #e6ac00; }\n    .sb3-events-dark { fill: #cc9900; }\n    .sb3-sensing { fill: #5cb1d6; stroke: #2e8eb8; }\n    .sb3-sensing-alt { fill: #47a8d1; }\n    .sb3-sensing-dark { fill: #2e8eb8; }\n    .sb3-operators { fill: #59c059; stroke: #389438; }\n    .sb3-operators-alt { fill: #46b946; }\n    .sb3-operators-dark { fill: #389438; }\n    .sb3-variables { fill: #ff8c1a; stroke: #db6e00; }\n    .sb3-variables-alt { fill: #ff8000; }\n    .sb3-variables-dark { fill: #db6e00; }\n    .sb3-list { fill: #ff661a; stroke: #e64d00; }\n    .sb3-list-alt { fill: #ff5500; }\n    .sb3-list-dark { fill: #e64d00; }\n    .sb3-custom { fill: #ff6680; stroke: #ff3355; }\n    .sb3-custom-alt { fill: #ff4d6a; }\n    .sb3-custom-dark { fill: #ff3355; }\n    .sb3-custom-arg { fill: #ff6680; stroke: #ff3355; }\n\n    /* extension blocks, e.g. pen */\n    .sb3-extension { fill: #0fbd8c; stroke: #0b8e69; }\n    .sb3-extension-alt { fill: #0da57a; }\n    .sb3-extension-line { stroke: #0da57a; }\n    .sb3-extension-dark { fill: #0b8e69; }\n\n    /* obsolete colors: chosen by hand, indicates invalid blocks */ \n    .sb3-obsolete { fill: #ed4242; stroke: #ca2b2b; }\n    .sb3-obsolete-alt { fill: #db3333; }\n    .sb3-obsolete-dark { fill: #ca2b2b; }\n\n    /* grey: special color from the Scratch 3.0 design mockups */\n    .sb3-grey { fill: #bfbfbf; stroke: #909090; }\n    .sb3-grey-alt { fill: #b2b2b2; }\n    .sb3-grey-dark { fill: #909090; }\n\n    .sb3-input-color {\n      stroke: #fff;\n    }\n\n    .sb3-input-number,\n    .sb3-input-string {\n      fill: #fff;\n    }\n    .sb3-literal-number,\n    .sb3-literal-string,\n    .sb3-literal-number-dropdown,\n    .sb3-literal-dropdown {\n      word-spacing: 0;\n    }\n    .sb3-literal-number,\n    .sb3-literal-string {\n      fill: #575e75;\n    }\n\n    .sb3-comment {\n      fill: #ffffa5;\n      stroke: #d0d1d2;\n      stroke-width: 1;\n    }\n    .sb3-comment-line {\n      fill: #ffff80;\n    }\n    .sb3-comment-label {\n      font: 400 12pt Consolas, 'Microsoft YaHei';\n      fill: #000;\n      word-spacing: 0;\n    }\n\n    .sb3-diff {\n      fill: none;\n      stroke: #000;\n    }\n    .sb3-diff-ins {\n      stroke-width: 2px;\n    }\n    .sb3-diff-del {\n      stroke-width: 3px;\n    }\n  ".replace(
          /[ \n]+/,
          " "
        ),
        makeIcons: function () {
          return [
            os.setProps(
              os.group([
                os.el("path", {
                  d:
                    "M20.8 3.7c-.4-.2-.9-.1-1.2.2-2 1.6-4.8 1.6-6.8 0-2.3-1.9-5.6-2.3-8.3-1v-.4c0-.6-.5-1-1-1s-1 .4-1 1v18.8c0 .5.5 1 1 1h.1c.5 0 1-.5 1-1v-6.4c1-.7 2.1-1.2 3.4-1.3 1.2 0 2.4.4 3.4 1.2 2.9 2.3 7 2.3 9.8 0 .3-.2.4-.5.4-.9V4.7c0-.5-.3-.9-.8-1zm-.3 10.2C18 16 14.4 16 11.9 14c-1.1-.9-2.5-1.4-4-1.4-1.2.1-2.3.5-3.4 1.1V4c2.5-1.4 5.5-1.1 7.7.6 2.4 1.9 5.7 1.9 8.1 0h.2l.1.1-.1 9.2z",
                  fill: "#45993d",
                }),
                os.el("path", {
                  d:
                    "M20.6 4.8l-.1 9.1v.1c-2.5 2-6.1 2-8.6 0-1.1-.9-2.5-1.4-4-1.4-1.2.1-2.3.5-3.4 1.1V4c2.5-1.4 5.5-1.1 7.7.6 2.4 1.9 5.7 1.9 8.1 0h.2c0 .1.1.1.1.2z",
                  fill: "#4cbf56",
                }),
              ]),
              { id: "sb3-greenFlag" }
            ),
            os.setProps(
              os.group([
                os.el("path", {
                  d:
                    "M12.71 2.44A2.41 2.41 0 0 1 12 4.16L8.08 8.08a2.45 2.45 0 0 1-3.45 0L.72 4.16A2.42 2.42 0 0 1 0 2.44 2.48 2.48 0 0 1 .71.71C1 .47 1.43 0 6.36 0s5.39.46 5.64.71a2.44 2.44 0 0 1 .71 1.73z",
                  fill: "#231f20",
                  opacity: ".1",
                }),
                os.el("path", {
                  d:
                    "M6.36 7.79a1.43 1.43 0 0 1-1-.42L1.42 3.45a1.44 1.44 0 0 1 0-2c.56-.56 9.31-.56 9.87 0a1.44 1.44 0 0 1 0 2L7.37 7.37a1.43 1.43 0 0 1-1.01.42z",
                  fill: "#fff",
                }),
              ]),
              { id: "sb3-dropdownArrow", transform: "scale(0.944)" }
            ),
            os.setProps(
              os.group([
                os.el("path", {
                  d:
                    "M22.68 12.2a1.6 1.6 0 0 1-1.27.63h-7.69a1.59 1.59 0 0 1-1.16-2.58l1.12-1.41a4.82 4.82 0 0 0-3.14-.77 4.31 4.31 0 0 0-2 .8A4.25 4.25 0 0 0 7.2 10.6a5.06 5.06 0 0 0 .54 4.62A5.58 5.58 0 0 0 12 17.74a2.26 2.26 0 0 1-.16 4.52A10.25 10.25 0 0 1 3.74 18a10.14 10.14 0 0 1-1.49-9.22 9.7 9.7 0 0 1 2.83-4.14A9.92 9.92 0 0 1 9.66 2.5a10.66 10.66 0 0 1 7.72 1.68l1.08-1.35a1.57 1.57 0 0 1 1.24-.6 1.6 1.6 0 0 1 1.54 1.21l1.7 7.37a1.57 1.57 0 0 1-.26 1.39z",
                  fill: "#3d79cc",
                }),
                os.el("path", {
                  d:
                    "M21.38 11.83h-7.61a.59.59 0 0 1-.43-1l1.75-2.19a5.9 5.9 0 0 0-4.7-1.58 5.07 5.07 0 0 0-4.11 3.17A6 6 0 0 0 7 15.77a6.51 6.51 0 0 0 5 2.92 1.31 1.31 0 0 1-.08 2.62 9.3 9.3 0 0 1-7.35-3.82 9.16 9.16 0 0 1-1.4-8.37A8.51 8.51 0 0 1 5.71 5.4a8.76 8.76 0 0 1 4.11-1.92 9.71 9.71 0 0 1 7.75 2.07l1.67-2.1a.59.59 0 0 1 1 .21L22 11.08a.59.59 0 0 1-.62.75z",
                  fill: "#fff",
                }),
              ]),
              { id: "sb3-turnRight" }
            ),
            os.setProps(
              os.group([
                os.el("path", {
                  d:
                    "M20.34 18.21a10.24 10.24 0 0 1-8.1 4.22 2.26 2.26 0 0 1-.16-4.52 5.58 5.58 0 0 0 4.25-2.53 5.06 5.06 0 0 0 .54-4.62A4.25 4.25 0 0 0 15.55 9a4.31 4.31 0 0 0-2-.8 4.82 4.82 0 0 0-3.15.8l1.12 1.41A1.59 1.59 0 0 1 10.36 13H2.67a1.56 1.56 0 0 1-1.26-.63A1.54 1.54 0 0 1 1.13 11l1.72-7.43A1.59 1.59 0 0 1 4.38 2.4a1.57 1.57 0 0 1 1.24.6L6.7 4.35a10.66 10.66 0 0 1 7.72-1.68A9.88 9.88 0 0 1 19 4.81 9.61 9.61 0 0 1 21.83 9a10.08 10.08 0 0 1-1.49 9.21z",
                  fill: "#3d79cc",
                }),
                os.el("path", {
                  d:
                    "M19.56 17.65a9.29 9.29 0 0 1-7.35 3.83 1.31 1.31 0 0 1-.08-2.62 6.53 6.53 0 0 0 5-2.92 6.05 6.05 0 0 0 .67-5.51 5.32 5.32 0 0 0-1.64-2.16 5.21 5.21 0 0 0-2.48-1A5.86 5.86 0 0 0 9 8.84L10.74 11a.59.59 0 0 1-.43 1H2.7a.6.6 0 0 1-.6-.75l1.71-7.42a.59.59 0 0 1 1-.21l1.67 2.1a9.71 9.71 0 0 1 7.75-2.07 8.84 8.84 0 0 1 4.12 1.92 8.68 8.68 0 0 1 2.54 3.72 9.14 9.14 0 0 1-1.33 8.36z",
                  fill: "#fff",
                }),
              ]),
              { id: "sb3-turnLeft" }
            ),
            os.el("path", {
              d: "M0 0L4 4L0 8Z",
              fill: "#111",
              id: "sb3-addInput",
            }),
            os.el("path", {
              d: "M4 0L4 8L0 4Z",
              fill: "#111",
              id: "sb3-delInput",
            }),
            os.setProps(
              os.group([
                os.el("path", {
                  d:
                    "M23.3 11c-.3.6-.9 1-1.5 1h-1.6c-.1 1.3-.5 2.5-1.1 3.6-.9 1.7-2.3 3.2-4.1 4.1-1.7.9-3.6 1.2-5.5.9-1.8-.3-3.5-1.1-4.9-2.3-.7-.7-.7-1.9 0-2.6.6-.6 1.6-.7 2.3-.2H7c.9.6 1.9.9 2.9.9s1.9-.3 2.7-.9c1.1-.8 1.8-2.1 1.8-3.5h-1.5c-.9 0-1.7-.7-1.7-1.7 0-.4.2-.9.5-1.2l4.4-4.4c.7-.6 1.7-.6 2.4 0L23 9.2c.5.5.6 1.2.3 1.8z",
                  fill: "#cf8b17",
                }),
                os.el("path", {
                  d:
                    "M21.8 11h-2.6c0 1.5-.3 2.9-1 4.2-.8 1.6-2.1 2.8-3.7 3.6-1.5.8-3.3 1.1-4.9.8-1.6-.2-3.2-1-4.4-2.1-.4-.3-.4-.9-.1-1.2.3-.4.9-.4 1.2-.1 1 .7 2.2 1.1 3.4 1.1s2.3-.3 3.3-1c.9-.6 1.6-1.5 2-2.6.3-.9.4-1.8.2-2.8h-2.4c-.4 0-.7-.3-.7-.7 0-.2.1-.3.2-.4l4.4-4.4c.3-.3.7-.3.9 0L22 9.8c.3.3.4.6.3.9s-.3.3-.5.3z",
                  fill: "#fff",
                }),
              ]),
              { id: "sb3-loopArrow" }
            ),
            os.setProps(
              os.group([
                os.el("path", {
                  d:
                    "M28.456 21.675c-.009-.312-.087-.825-.256-1.702-.096-.495-.612-3.022-.753-3.73-.395-1.98-.76-3.92-1.142-6.113-.732-4.223-.693-6.05.344-6.527.502-.23 1.06-.081 1.842.35.413.227 2.181 1.365 2.07 1.296 1.993 1.243 3.463 1.775 4.928 1.549 1.527-.237 2.505-.06 2.877.618.348.635.015 1.416-.729 2.18-1.473 1.516-3.976 2.514-5.849 2.023-.822-.218-1.238-.464-2.38-1.266a9.737 9.737 0 0 0-.095-.066c.047.593.264 1.74.717 3.803.294 1.336 2.079 9.187 2.637 11.674l.002.012c.529 2.637-1.872 4.724-5.235 4.724-3.29 0-6.363-1.988-6.862-4.528-.53-2.64 1.873-4.734 5.233-4.734a8.411 8.411 0 0 1 2.65.437zM11.46 27.666c-.01-.319-.091-.84-.266-1.738-.09-.46-.595-2.937-.753-3.727-.39-1.96-.752-3.892-1.131-6.07-.732-4.224-.692-6.052.344-6.527.502-.23 1.06-.082 1.841.349.414.228 2.181 1.365 2.07 1.296 1.992 1.243 3.461 1.775 4.925 1.549 1.525-.24 2.504-.064 2.876.614.348.635.015 1.415-.728 2.18-1.474 1.517-3.977 2.513-5.847 2.017-.822-.218-1.237-.463-2.38-1.266a9.729 9.729 0 0 0-.094-.065c.047.593.264 1.74.717 3.802.294 1.337 2.078 9.19 2.636 11.675l.003.013c.517 2.638-1.884 4.732-5.234 4.732-3.286 0-6.359-1.993-6.87-4.54-.518-2.639 1.885-4.73 5.242-4.73.904 0 1.802.15 2.65.436z",
                  stroke: "#000",
                  "stroke-opacity": ".1",
                }),
                os.el("path", {
                  d:
                    "M32.18 25.874C32.636 28.157 30.512 30 27.433 30c-3.07 0-5.923-1.843-6.372-4.126-.458-2.285 1.665-4.136 4.743-4.136.647 0 1.283.084 1.89.234a7 7 0 0 1 .938.302c.87-.02-.104-2.294-1.835-12.229-2.134-12.303 3.06-1.87 8.768-2.753 5.708-.885.076 4.82-3.65 3.844-3.724-.987-4.65-7.153.263 14.738zm-16.998 5.99C15.63 34.148 13.507 36 10.439 36c-3.068 0-5.92-1.852-6.379-4.136-.448-2.284 1.674-4.135 4.751-4.135 1.002 0 1.974.197 2.854.544.822-.055-.15-2.377-1.862-12.228-2.133-12.303 3.059-1.87 8.764-2.753 5.706-.894.076 4.821-3.648 3.834-3.723-.987-4.648-7.152.263 14.738z",
                  fill: "#FFF",
                }),
              ]),
              { id: "sb3-musicBlock", fill: "none" }
            ),
            os.setProps(
              os.group([
                os.el("path", {
                  d:
                    "M8.753 34.602l-4.251 1.779 1.784-4.236c1.218-2.892 2.907-5.423 5.03-7.538L31.066 4.93c.846-.842 2.65-.41 4.032.967 1.38 1.375 1.816 3.173.97 4.015L16.318 29.59c-2.123 2.116-4.664 3.799-7.565 5.012",
                  fill: "#FFF",
                }),
                os.el("path", {
                  d:
                    "M29.41 6.111s-4.45-2.379-8.202 5.771c-1.734 3.766-4.35 1.546-4.35 1.546",
                }),
                os.el("path", {
                  d:
                    "M36.42 8.825c0 .463-.14.873-.432 1.164l-9.335 9.301c.282-.29.41-.668.41-1.12 0-.874-.507-1.963-1.406-2.868-1.362-1.358-3.147-1.8-4.002-.99L30.99 5.01c.844-.84 2.65-.41 4.035.96.898.904 1.396 1.982 1.396 2.855M10.515 33.774a23.74 23.74 0 0 1-1.764.83L4.5 36.382l1.786-4.235c.258-.604.529-1.186.833-1.757.69.183 1.449.625 2.109 1.282.659.658 1.102 1.412 1.287 2.102",
                  fill: "#4C97FF",
                }),
                os.el("path", {
                  d:
                    "M36.498 8.748c0 .464-.141.874-.433 1.165l-19.742 19.68c-2.131 2.111-4.673 3.793-7.572 5.01L4.5 36.381l.974-2.317 1.925-.808c2.899-1.218 5.441-2.899 7.572-5.01l19.742-19.68c.292-.292.432-.702.432-1.165 0-.647-.27-1.4-.779-2.123.249.172.498.377.736.614.898.905 1.396 1.983 1.396 2.856",
                  fill: "#575E75",
                  opacity: ".15",
                }),
                os.el("path", {
                  d:
                    "M18.45 12.831a.904.904 0 1 1-1.807 0 .904.904 0 0 1 1.807 0z",
                  fill: "#575E75",
                }),
              ]),
              {
                id: "sb3-penBlock",
                stroke: "#575E75",
                fill: "none",
                "stroke-linejoin": "round",
              }
            ),
            os.setProps(
              os.group([
                os.el("circle", { opacity: 0.25, cx: 32, cy: 16, r: 4.5 }),
                os.el("circle", { opacity: 0.5, cx: 32, cy: 12, r: 4.5 }),
                os.el("circle", { opacity: 0.75, cx: 32, cy: 8, r: 4.5 }),
                os.el("circle", { cx: 32, cy: 4, r: 4.5 }),
                os.el("path", {
                  d:
                    "M22.672 4.42l-6.172 4V6.1c0-2.01-1.563-3.6-3.5-3.6H4.1C2.076 2.5.5 4.076.5 6.1V14c0 1.927 1.584 3.512 3.6 3.6H13c1.902 0 3.5-1.653 3.5-3.6v-2.283l6.257 3.754.097.075c.02.02.098.054.146.054.267 0 .5-.217.5-.5V4.8c0 .037-.056-.094-.129-.243-.145-.242-.43-.299-.7-.137z",
                  fill: "#4D4D4D",
                  "stroke-linejoin": "round",
                }),
              ]),
              {
                id: "sb3-videoBlock",
                stroke: "#000",
                fill: "#FFF",
                "stroke-opacity": 0.15,
              }
            ),
            os.setProps(
              os.group([
                os.el("path", {
                  d:
                    "M25.644 20.5c-1.667 1.937-4.539 3.429-5.977 3.429a1.25 1.25 0 0 1-.557-.137c-.372-.186-.61-.542-.61-1.03 0-.105.017-.207.05-.308.076-.236.624-.986.727-1.173.27-.484.462-1.075.566-1.865A8.5 8.5 0 0 1 24 3.5h4a8.5 8.5 0 1 1 0 17h-2.356z",
                  fill: "#FFF",
                }),
                os.el("path", {
                  d:
                    "M15.5 21.67c0-1.016-1.494-1.586-2.387-.782l-2.7 2.163A5.958 5.958 0 0 1 6.7 24.33h-.4c-1.035 0-1.8.69-1.8 1.573v4.235c0 .883.765 1.572 1.8 1.572h.4c1.458 0 2.754.423 3.82 1.287l2.598 2.161c.908.75 2.382.188 2.382-.876V21.67z",
                  fill: "#4D4D4D",
                }),
              ]),
              { id: "sb3-ttsBlock", stroke: "#000", "stroke-opacity": 0.15 }
            ),
            os.el("image", {
              id: "sb3-translateBlock",
              width: "40px",
              height: "40px",
              href:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAABTVBMVEX///8AAAAAAAAAAAAAAABqamoAAAAAAAAAAAAAAACurq7Ly8vV1dXZ2dnS0tLDw8MAAAAAAAAAAAAAAADb29vq6urz8/P6+vr////9/f319fXx8fHl5eXPz89HR0e2trbu7u7X19ekpKTe3t74+Pjn5+fg4ODi4uIAAACEhISWlpa9vb0AAAAAAADH3v/0+P8AAADHx8e41f9Rmf9WnP/p8v+Pvv9Nl/9Ynf/S5f9ho/9Smv+82P9PmP9Ml/+Rv/9uqv9mpf9coP+MvP9an/9zrf9Qmf+rzf+Dtv9op/+10/+bxP/d6/96sf9jpP+5ubkAAABrqf92r/9/tP9GieeOrtnW19mgx/96otnZ4u5Znv/q6+5XXnXV19ygpLGWmqhhZ3309fbKzNTAwsuLkKBtbW3s7OxMTEy1uMJ2fI5rcobf4eVFRUWBhperrrqQI7PpAAAAbXRSTlMADBUdJkERBQIfeLzl/9ehGA4aJP///////////8kyhf/yav//////E09ckwcK//8hrv///////////////////////////////////////0b//////////////////////////z//L/////80bccdAQAABJxJREFUeAHtmOd/qkoTgDELVhZLiKwRseuRA5Y00uT03nvvvf7/H++CmVzNsvvD+74f85ie8DCzO2EGpFOiOSWxgmRFRiiZ+r/o0plsTsUULa8UhMp0sbQqc1ktFdNSQCmnr5UNUlmvmrimJPm+pFXXsACtboVHy7hBjjDMZqvA8xVazXajQ7h0Gu3Z0TLukmMaOFvg+LJwYh5wdCGPe/1+wyAhVZw9E5lvC1dFLji6lZTSaGC3zmpw/mpTidiZtNVskBg0mhbdGcd1i6jVPMq8X4tIulhvk1i060U4ZNCc5WRgJeGcFJa0iACHo4gQtZIU4ozt/FEQ5sS2x4lF4Spm93djc2ub3Wu8KgWkLI1uzWxjyv0eVgfuglDGhGHH290jDFieFUVOn8+prKul/02IcJnMY2CLJxzte8ABfLE/YoWLVVbGMk94OPUZpodMypN2Zc5X6dX4KZ87f/6C5108H3Lgb144f/4Sk3La0nqVOZ9mOaI1HHn+ZfjiIHINJQeMkT5mU674V8MNuTb1rkcKwcjxMcK9q96NIMBd/+o2RwhG8ImFZN+7epOQW1PvfHTZgNFgfBzh3tQ/2L7t+d52pBCMOdzHNfCJC/sOrb4Df3orurDBOFbqyhh8YiFdPlrRdwlHCLiuKwFiITn0fEiYIwTiCa9d9egKHgyDbayaOgbu3ed0Q7Hw9oOrPl1Dz58+3G6ATdQNxcK9R1ep6vpodHfqe4+fPI3XDbnCm/tTqtsdEsqzzcfP43ZDnnC4STdj89aIhLx4Ersb8lrA8ODqy2tw/avoOH435DWp7dvzp166G4rbqBkrQOiGMRq9jvn7y3bDGKMIxiQmWOYPS2Lhq9eUNwIhO86JhW8D4TuOkB0458LsBv+5rPB9IHz/QSyEkRgp2Dj2NQeyfJ8Rfnwd8imGMOy2JlS02RwUo65Cn2l4NMjPsYSuDVXSaWtfqI8VfggW8B398CqOMKOtzcL7ivPfHClK+J26PgZpf48jlHEn1OmqXUpLkcIfr1//DDfmZxzheGKul7u6moXxkRH+orG9JSTI+VcMYfK3htVJa1zkXsnfzkwfoRR5QqBYQmjFEbQGmivwPoYQuiJX+AlsUIoiIfTtjCDCz9TzJ+Q1lKJI6Fg13Mc5y4kSwnXhBwn5CaXIFcI0ZcDsEyH8/m/9vYUvuUJ2OmOEEBbUz0+hkJ0fWeHfv3+/z339ly/kTrirS7cAxgfGNNMNl2pSpdrMB8b2pPBfbyphrconRgG0/G3vPBY2TtwYoaVvzBdAqj4fYkPPFZZ9dLCIO1Bxrz9zGv0e1qzU0g83FkmMbRsaSjtvjx3h45fuXHDMwAk4CWh5VdqfhA+IBs1jo4EVxIzEQKHWhw7aQkXXdSQOxUHThCozaYHxSCnNKiSinbXtAUrzjF+0NvRHbLtc45ks1IjR6NOtyXNP7nzL46+zINe0jBQJWyNdwT1JumSreqjs8P4KasQ0QNgQ/mlinFX1bnndnIwlAUmlhs3qeoUY5TU9V5JEFMetiYq130lJRKqg5MOyU3PZTFoS46wgVIIezlcmEZIHMlrh/OUpp/wDfCaVjn0YjrEAAAAASUVORK5CYII=",
            }),
            os.el("image", {
              id: "sb3-microbitBlock",
              width: "40px",
              height: "40px",
              href:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAKQElEQVR4AeybBVAcSxeF4+4OwcND4hV3fB1NFuLu7i5IXLCHS9wV97cQd3d3d/e9/9wh6YI/AwOT2dqF2q46leb07e7b3/RMr2RLaIu2aIu2aIu2aIu2aIu2aIu2aIu2aIv6SuSG1I3ha5NOb9ihOJt58MyV/5di/5mr4RtSTkZtTL0Wvi59bJFZGACUbN68eWUzM7M6TY2N6zcxMmqgCvkGbVakpe+HjMxDkLn3CKPSFQchLeMALF21doWq8sA1WlhY1LY2sq7ACzwcTDA5Lkqy/MEnWehPpSwUoGBSgnDijjzbhRP+bJMsvga2soFgI/RQm2yFHh9thO77O9pIhaamptX+CqC5uXlVwbSkraywGOA5DA8DW5fRecHDZNUMjwWkyONLZyupDQWxPGeAuJ2lAW9+cIGHSRCADPBQGgqPyFogj2nWrFlNzrdvl74+1lzhEYDM8FAaDI/oBj77OQPsOsBPyhUeAcgMD6XZ8FAC9wfULVxXNQBZ4BGAzPBQf8KTDQLBiAgQjN3IoE1gP9gfbEQ9iwVAFngEIIHHJju38SBZ8RCkfq9BNP84iOcezC3PMyAL+gLiBSfAVtK/uAAk8P5aIs9TIPV9DjaOQ8FG3PfPiyHpA3Yes3BO3I3FASB/8FBSv5cgmr3vV/017l7ShvOIZmVhnYYsmnOwqAPkFx5K4n2OgvMCbJ2G5b0De82h5xeM316UAfIPD2UnnwoSahdK/d+CmLqdRfOP5pLY5wLIgr6CZOFlPGyKEEDVwyOydR4BgnFbQTglDoSTY3MJPcHI1bgTi+opTOAVG9n38QSJ1zkQe1PyOY+i63buU/kDWFzhoRyGBILr7FRw8TySvUmCPoOQPF95A0jgFUuAzkuugvOK+wQePiJ4A9it33KJKuD1GzwBho2eDiKnfsTr2X8s7Tm6DSJejz6jaM/FfSjxsE552EY87IMejlFIgLjzmOHxAbBdZ4c2qrjyp89egEePn8CUGT7Ey9x3iPaW+4YSLzY+lfai124hHtYpD9uIh33QwzEKC1D6LwM8TQd46MhxesGjxs8mXkJyGu15+awi3qYtu2gvICiSeFinPGwjHvZBD8co1CHSbxEIJu4m8FQO0FrgDlb2bmBlx6xu9t0xhjXxLtaO0MlKClYOPYjX1cY526PGIJ6tC3rUuG7EwzrlYRvxsA96OEbe8zLkL6A95vx5BogfLoJH37GwYHEoeC0NY9Qc7zAQyPpq2mHBPX8+AXazc4Ulvuvg/oNHcP8hs67duAuTZizFnaVJhwj3/HkFaOsKq4I20s8a1M1btyEtIwsUmfvh3v0H2d7tezB19gqwJgDVf4hwyl/VAK9evQ4jxs4EsXN/cJEPBe/FfvDg4SN2gOo5RLjnzwdAqetAuHTlOqzwDSYJ7IlJAntJbyC3Wq+RcOjwMXaAajxEEGBB8w8MjqLXLHMd+PCvAcqpZ83Xr99g+44YksCumEQqgV4kAfe+o1kAql8IsKD5xyek0Wvu2W/0I15uYdyFORO4efMW9fzyBrHzAHDuPhh8FrHcwuo/RAqbP65ZtYfI1es3yEP4/oOHmnuIcM+f/5cxS/3W4suAPHXtxh2YMtsXrDTrEOGeP/8vpMfBgsXh4L00jFGzvYJA6NhPw96JcM9f9W/lRH3Y38qpX1zeiqr+wwRb2WAQLziO3+dq9MdZHKR6gAhPNHsvSAI/4JdBmv9xlgYBJPDwk2ppwDsEqPEfZ6kfIAM856XX2AGq/xDRGID4oSOBhx+Du02PAadFlwhADZf6ATqMigLJwosg9j6fLa+z1N8X8Ltc7SFSjL4TKdYAtYcIR2kPkWIi9QMc1EcIkZ5NH0V5Nb20eGr7r7ai/N+22YnlsHmJ5bcz6+s+PbGm3rt54zqTNrZ+GxY3+XEgUuexIkTvWUH7oQJmt1KeWFvvxaEonWe+M1sr2XJ0dnGB/4INPp1aW/dJ6r+GHwb0FqsGYH9q4ORAg6M4YEujljX8ppv3ifZu+iW/5OJ8G31d5204GOOFXevonFxT99qMUd1YIcT7N/oRMe+fqfgTA/xf8on+hskF6RcyrwUkB+itb9KkSS3U1iWmwcFzW+YZ7yDpAafX1n23YoxR+5ZGRjUWjarX/Oz6Oq+cnF34B7h9mRlMHWHREX1sb21iUn1feMMb9mI5Y3J45Y9G17/5+9c+np6epYJnGDumBRnmCwH7nV1X5yUC+J1H++YN9RIDTL6zAEQYH3MuGOuKEIN3ecVPGmZNbQr9mI4dO1b8FV8+ZqVhpNfEjvwDVITow6rJZh7W1tZlsA0XeH5jned4CzAlJ5J1h/Mbaj/DOIxv3bp1Wf8Zlv2PRTfIFwL2u7Oz6ifcedhPLpeXHjPIstWR6AZKNoC3dlT7bk3BxouFsjQ01Dm3ofa3vOLnj+8M6UH6mVSOVXDNVI6V9qw03uo/u5VqAF7ZUvON1xgzO9wRu1ca74CsEsr8AGJ7zEqjLd2a6urPHW0quLq15tuCAITMEpAapL9X2sXAZFJ/s3an1tV9zNYP9SS2EuyP0Lkk6mxu3q2l5T/JgYZn0MsP4MfUMspoT7OZ+Kus4Dlmo5/HV/jBK0APuQz2rDSFa1tr4MJoKTNLKH/Xz66vDVmhenBsdX04EtUADkbqwFGqfiBChzH+ZUJ5OI6x0Q2oGF28zWFfuC7dnzpoICusYe5+Wdl9X1H9MGY/3acBNUY9+qKeXlcXzqyvQ9e/ppci/X7+mvML5eF8CipH6kJgPMbS3vVt1chcv+NRCf7GGMMPwCH9hHhlKVXMTk5REj6nlcN6Lr1NLkvqb5Jyt3/PKJPr7/cpzLEfUnPG4eLLwY//SgOJTSyXYwwSCwSCIvvfj6kV8pzvh4LMReb4llEWPqWVh1eJVeBDSkU4HN0A21QD8PQGE9gf1aRQAFNCWnECeGajCZzfZFhogNtWdYUD0Y3hWXx1VoDpYS0hNqA9hPqIIWKhEDJCW/IDEEvT1q0bUQCVBCC94Mpwc4dOYQBSfWtyAnh5qx5CKDTAsxuN4fp2XapekhXgje06cHGzAf0vbo5LW/QJQCuB/Cz+XpozQOw8ZrDdyZwAiQoOEMUJIFHhAOYWC0AGEYDU15sr8TfTnAFSx3u50QNaCKgH7uf/tXPWCBFDURSdEnd3Ghxa1kiPu7trh7tHx911DbybLTAV3BNPniX5kh9L/rMDqK1W54a6hzpxOWT7Dfh3AC4J7mYaLpSVakf0oDiRPinIYpo6Kcgoq9WOm6mmr4/FGrvUvvrTTIP6vlBrv5+u/87I9sxpQTZ2WJTENHNWkPVsl4c+IbtQpz9MN6gfIns33aC8z9ean0s19uvJps+syGGIix58pY4LMv6dkgh83M80KK/zdQZkryaaP5XlGsf3crUT85JL0ogpcVyYgm8swzf8XYndb0u2xpKFLWO9wgtZ+JBpOnlcmEmeFKR2RtrHhgfq6nHNa8sHOAu4WscF518f8IMNtEisFhchhBBCCCGEEEJIPvkBF5B61BH0sY4AAAAASUVORK5CYII=",
            }),
            os.setProps(
              os.group([
                os.el("path", {
                  d:
                    "M23.513 11.17h-.73c-.319 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479",
                  fill: "#7C87A5",
                }),
                os.el("path", {
                  d:
                    "M24.91 11.17h-.73c-.319 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479z",
                }),
                os.el("path", {
                  d:
                    "M9.54 11.17h-.728c-.32 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.257-.479-.577-.479",
                  fill: "#7C87A5",
                }),
                os.el("path", {
                  d:
                    "M10.938 11.17h-.729c-.32 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.257-.479-.577-.479z",
                }),
                os.el("path", {
                  d:
                    "M26.305 11.17h-.73c-.318 0-.574.213-.574.478v1.08h1.882v-1.08c0-.265-.26-.479-.578-.479",
                  fill: "#7C87A5",
                }),
                os.el("path", {
                  d:
                    "M27.702 11.17h-.73c-.318 0-.574.213-.574.478v1.08h1.882v-1.08c0-.265-.26-.479-.578-.479z",
                }),
                os.el("path", {
                  d:
                    "M29.101 11.17h-.73c-.318 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479",
                  fill: "#7C87A5",
                }),
                os.el("path", {
                  d:
                    "M30.498 11.17h-.73c-.318 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479z",
                }),
                os.el("path", {
                  d:
                    "M17.925 11.17h-.73c-.319 0-.577.213-.577.478v1.08h1.883v-1.08c0-.265-.258-.479-.576-.479",
                  fill: "#7C87A5",
                }),
                os.el("path", {
                  d:
                    "M19.322 11.17h-.73c-.319 0-.577.213-.577.478v1.08h1.883v-1.08c0-.265-.258-.479-.576-.479z",
                }),
                os.el("path", {
                  d:
                    "M20.717 11.17h-.73c-.319 0-.575.213-.575.478v1.08h1.883v-1.08c0-.265-.26-.479-.578-.479",
                  fill: "#7C87A5",
                }),
                os.el("path", {
                  d:
                    "M22.114 11.17h-.73c-.319 0-.575.213-.575.478v1.08h1.883v-1.08c0-.265-.26-.479-.578-.479z",
                }),
                os.el("path", {
                  d:
                    "M15.129 11.17H14.4c-.32 0-.576.213-.576.478v1.08h1.883v-1.08c0-.265-.258-.479-.578-.479",
                  fill: "#7C87A5",
                }),
                os.el("path", {
                  d:
                    "M16.526 11.17h-.729c-.32 0-.576.213-.576.478v1.08h1.883v-1.08c0-.265-.258-.479-.578-.479z",
                }),
                os.el("path", {
                  d:
                    "M12.335 11.17h-.73c-.319 0-.575.213-.575.478v1.08h1.882v-1.08c0-.265-.26-.479-.577-.479",
                  fill: "#7C87A5",
                }),
                os.el("path", {
                  d:
                    "M13.732 11.17h-.73c-.319 0-.575.213-.575.478v1.08h1.883v-1.08c0-.265-.26-.479-.578-.479z",
                }),
                os.el("path", {
                  d:
                    "M31.893 11.17h-.73c-.318 0-.574.213-.574.478v1.08h1.882v-1.08c0-.265-.26-.479-.578-.479",
                  fill: "#7C87A5",
                }),
                os.el("path", {
                  d:
                    "M33.29 11.17h-.73c-.318 0-.574.213-.574.478v1.08h1.882v-1.08c0-.265-.26-.479-.578-.479z",
                }),
                os.el("path", {
                  d:
                    "M33.647 28.407H15.765V12.533h17.882c.52 0 .941.445.941.992v13.89c0 .547-.421.992-.94.992",
                  fill: "#FFF",
                }),
                os.el("path", {
                  d:
                    "M33.647 28.407H15.765V12.533h17.882c.52 0 .941.445.941.992v13.89c0 .547-.421.992-.94.992z",
                  stroke: "#7C87A5",
                  "stroke-width": ".893",
                }),
                os.el("path", {
                  d:
                    "M15.765 28.407H5.412c-.52 0-.941-.445-.941-.993V16.502c0-2.19 1.686-3.969 3.764-3.969h15.06-3.766c-2.078 0-3.764 1.778-3.764 3.969v11.905z",
                  fill: "#FFF",
                }),
                os.el("path", {
                  d:
                    "M15.765 28.407H5.412c-.52 0-.941-.445-.941-.993V16.502c0-2.19 1.686-3.969 3.764-3.969h15.06-3.766c-2.078 0-3.764 1.778-3.764 3.969v11.905z",
                  stroke: "#7C87A5",
                  "stroke-width": ".893",
                }),
                os.el("path", {
                  d:
                    "M12.941 12.533H11.06c-1.559 0-2.824 1.334-2.824 2.977v1.986c0 .547.422.992.941.992H12c.52 0 .941-.445.941-.992V15.51c0-1.643 1.265-2.977 2.824-2.977h.94-3.764z",
                  fill: "#4C97FF",
                }),
                os.el("path", {
                  d:
                    "M12.941 12.533H11.06c-1.559 0-2.824 1.334-2.824 2.977v1.986c0 .547.422.992.941.992H12c.52 0 .941-.445.941-.992V15.51c0-1.643 1.265-2.977 2.824-2.977h.94-3.764z",
                  stroke: "#3D79CC",
                  "stroke-width": ".893",
                }),
                os.el("path", {
                  stroke: "#7C87A5",
                  "stroke-width": ".893",
                  d: "M4.47 20.474h27.961l2.157 2.974",
                }),
                os.el("path", {
                  d:
                    "M15.765 28.407H5.412c-.52 0-.941-.445-.941-.993V16.502c0-2.19 1.686-3.969 3.764-3.969h15.06-3.766c-2.078 0-3.764 1.778-3.764 3.969v11.905z",
                  stroke: "#7C87A5",
                  "stroke-width": ".893",
                }),
                os.el("path", {
                  d:
                    "M21.307 18.964h-.73c-.319 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479",
                  fill: "#7C87A5",
                }),
                os.el("path", {
                  d:
                    "M21.307 18.964h-.73c-.319 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479z",
                }),
                os.el("path", {
                  d:
                    "M24.178 18.964h-.728c-.32 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.258-.479-.578-.479",
                  fill: "#7C87A5",
                }),
                os.el("path", {
                  d:
                    "M24.178 18.964h-.728c-.32 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.258-.479-.578-.479z",
                }),
                os.el("path", {
                  d:
                    "M27.051 18.964h-.73c-.318 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.257-.479-.576-.479",
                  fill: "#7C87A5",
                }),
                os.el("path", {
                  d:
                    "M27.051 18.964h-.73c-.318 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.257-.479-.576-.479z",
                }),
                os.el("path", {
                  d:
                    "M29.923 18.964h-.729c-.32 0-.576.214-.576.479v1.08h1.883v-1.08c0-.265-.258-.479-.578-.479",
                  fill: "#7C87A5",
                }),
                os.el("path", {
                  d:
                    "M29.923 18.964h-.729c-.32 0-.576.214-.576.479v1.08h1.883v-1.08c0-.265-.258-.479-.578-.479z",
                }),
                os.el("path", {
                  d:
                    "M33.647 28.407H15.765V20.47H32.43l2.157 2.978v3.966c0 .548-.421.993-.94.993",
                  fill: "#E6E7E8",
                }),
                os.el("path", {
                  d:
                    "M33.647 28.407H15.765V20.47H32.43l2.157 2.978v3.966c0 .548-.421.993-.94.993z",
                  stroke: "#7C87A5",
                  "stroke-width": ".893",
                }),
                os.el("path", {
                  d:
                    "M15.765 28.407H5.412c-.52 0-.941-.445-.941-.993V20.47h11.294v7.937z",
                  fill: "#E6E7E8",
                }),
                os.el("path", {
                  d:
                    "M15.765 28.407H5.412c-.52 0-.941-.445-.941-.993V20.47h11.294v7.937z",
                  stroke: "#7C87A5",
                  "stroke-width": ".893",
                }),
                os.el("path", {
                  fill: "#E6E7E8",
                  d: "M19.53 24.438h11.294V20.47H19.529z",
                }),
                os.el("path", {
                  stroke: "#7C87A5",
                  "stroke-width": ".893",
                  d:
                    "M19.53 24.438h11.294V20.47H19.529zm12.902-3.964l2.157-2.794",
                }),
              ]),
              { id: "sb3-wedoBlock", fill: "none" }
            ),
            os.setProps(
              os.group([
                os.el("rect", {
                  stroke: "#7C87A5",
                  fill: "#FFF",
                  x: ".5",
                  y: "3.59",
                  width: "28",
                  height: "25.81",
                  rx: "1",
                }),
                os.el("rect", {
                  stroke: "#7C87A5",
                  fill: "#E6E7E8",
                  x: "2.5",
                  y: ".5",
                  width: "24",
                  height: "32",
                  rx: "1",
                }),
                os.el("path", {
                  stroke: "#7C87A5",
                  fill: "#FFF",
                  d: "M2.5 14.5h24v13h-24z",
                }),
                os.el("path", {
                  d: "M14.5 10.5v4",
                  stroke: "#7C87A5",
                  fill: "#E6E7E8",
                }),
                os.el("rect", {
                  fill: "#414757",
                  x: "4.5",
                  y: "2.5",
                  width: "20",
                  height: "10",
                  rx: "1",
                }),
                os.el("rect", {
                  fill: "#7C87A5",
                  opacity: ".5",
                  x: "13.5",
                  y: "20.13",
                  width: "2",
                  height: "2",
                  rx: ".5",
                }),
                os.el("path", {
                  d:
                    "M9.06 20.13h1.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1.5a1 1 0 0 1 0-2zM19.93 22.13h-1.51a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1.5a1 1 0 0 1 .01 2zM8.23 17.5H5a.5.5 0 0 1-.5-.5v-2.5h6l-1.85 2.78a.51.51 0 0 1-.42.22zM18.15 18.85l-.5.5a.49.49 0 0 0-.15.36V20a.5.5 0 0 1-.5.5h-.5a.5.5 0 0 1-.5-.5.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5H12a.5.5 0 0 1-.5-.5v-.29a.49.49 0 0 0-.15-.36l-.5-.5a.51.51 0 0 1 0-.71l1.51-1.49a.47.47 0 0 1 .35-.15h3.58a.47.47 0 0 1 .35.15l1.51 1.49a.51.51 0 0 1 0 .71zM10.85 23.45l.5-.5a.49.49 0 0 0 .15-.36v-.29a.5.5 0 0 1 .5-.5h.5a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h.5a.5.5 0 0 1 .5.5v.29a.49.49 0 0 0 .15.36l.5.5a.5.5 0 0 1 0 .7l-1.51 1.5a.47.47 0 0 1-.35.15h-3.58a.47.47 0 0 1-.35-.15l-1.51-1.5a.5.5 0 0 1 0-.7z",
                  fill: "#7C87A5",
                  opacity: ".5",
                }),
                os.el("path", {
                  d: "M21.5 27.5h5v4a1 1 0 0 1-1 1h-4v-5z",
                  stroke: "#CC4C23",
                  fill: "#F15A29",
                }),
              ]),
              { transform: "translate(5.5 3.5)", id: "sb3-ev3Block" }
            ),
            os.setProps(
              os.group([
                os.el("path", {
                  d:
                    "M35 28H5a1 1 0 0 1-1-1V12c0-.6.4-1 1-1h30c.5 0 1 .4 1 1v15c0 .5-.5 1-1 1z",
                  fill: "#fff",
                }),
                os.el("path", {
                  fill: "red",
                  d:
                    "M4 25h32v2.7H4zm9-1h-2.2a1 1 0 0 1-1-1v-9.7c0-.6.4-1 1-1H13c.6 0 1 .4 1 1V23c0 .6-.5 1-1 1z",
                }),
                os.el("path", {
                  fill: "red",
                  d:
                    "M6.1 19.3v-2.2c0-.5.4-1 1-1h9.7c.5 0 1 .5 1 1v2.2c0 .5-.5 1-1 1H7.1a1 1 0 0 1-1-1z",
                }),
                os.el("circle", {
                  fill: "red",
                  cx: "22.8",
                  cy: "18.2",
                  r: "3.4",
                }),
                os.el("circle", {
                  fill: "red",
                  cx: "30.6",
                  cy: "18.2",
                  r: "3.4",
                }),
                os.el("path", { fill: "red", d: "M4.2 27h31.9v.7H4.2z" }),
                os.el("circle", {
                  fill: "#e0e0e0",
                  cx: "22.8",
                  cy: "18.2",
                  r: "2.3",
                }),
                os.el("circle", {
                  fill: "#e0e0e0",
                  cx: "30.6",
                  cy: "18.2",
                  r: "2.3",
                }),
                os.el("path", {
                  fill: "#e0e0e0",
                  d:
                    "M12.5 22.9h-1.2c-.3 0-.5-.2-.5-.5V14c0-.3.2-.5.5-.5h1.2c.3 0 .5.2.5.5v8.4c0 .3-.2.5-.5.5z",
                }),
                os.el("path", {
                  fill: "#e0e0e0",
                  d:
                    "M7.2 18.7v-1.2c0-.3.2-.5.5-.5h8.4c.3 0 .5.2.5.5v1.2c0 .3-.2.5-.5.5H7.7c-.3 0-.5-.2-.5-.5zM4 26h32v2H4z",
                }),
                os.el("path", {
                  stroke: "#666",
                  "stroke-width": ".5",
                  d:
                    "M35.2 27.9H4.8a1 1 0 0 1-1-1V12.1c0-.6.5-1 1-1h30.5c.5 0 1 .4 1 1V27a1 1 0 0 1-1.1.9z",
                }),
                os.el("path", {
                  stroke: "#666",
                  "stroke-width": ".5",
                  d:
                    "M35.2 27.9H4.8a1 1 0 0 1-1-1V12.1c0-.6.5-1 1-1h30.5c.5 0 1 .4 1 1V27a1 1 0 0 1-1.1.9z",
                }),
              ]),
              { id: "sb3-makeymakeyBlock", fill: "none" }
            ),
          ];
        },
        makeStyle: function () {
          var e = os.el("style");
          return e.appendChild(os.cdata(t.cssContent)), e;
        },
        defaultFont: "500 12pt Consolas, 'Microsoft YaHei'",
        commentFont: "400 12pt Consolas, 'Microsoft YaHei'",
      });
    }),
    Vs = Gs.cssContent,
    _s = Gs.makeIcons,
    js = Gs.makeStyle,
    Us = Gs.defaultFont,
    Ys = Gs.commentFont,
    Ks = Pe.Label,
    Ws = Pe.Icon,
    Xs = Pe.Input,
    qs = Pe.Block,
    Zs = Pe.Comment,
    Qs = Pe.Glow,
    Js = Pe.Script,
    $s = Pe.Document,
    eo = Gs.defaultFont,
    to = Gs.commentFont,
    so = Gs.makeStyle,
    oo = Gs.makeIcons,
    io = function (e) {
      t(this, e),
        (this.el = null),
        (this.height = 12),
        (this.metrics = null),
        (this.x = 0);
    };
  (io.prototype.isLabel = !0),
    (io.prototype.draw = function () {
      return this.el;
    }),
    Object.defineProperty(io.prototype, "width", {
      get: function () {
        return this.metrics.width;
      },
    }),
    (io.metricsCache = {}),
    (io.toMeasure = []),
    (io.prototype.measure = function () {
      var e = this.value,
        t = "sb3-" + this.cls;
      this.el = os.text(0, 13, e, { class: "sb3-label " + t });
      var s = io.metricsCache[t];
      if (
        (s || (s = io.metricsCache[t] = Object.create(null)),
        Object.hasOwnProperty.call(s, e))
      )
        this.metrics = s[e];
      else {
        var o = /comment-label/.test(this.cls) ? to : eo;
        this.metrics = s[e] = io.measure(e, o);
      }
    }),
    (io.measure = function (e, t) {
      var s = io.measuring;
      s.font = t;
      var o = s.measureText(e),
        i = 0 | (o.width + 0.5);
      return { width: i };
    });
  var ao = function e(s) {
    t(this, s);
    var o = e.icons[this.name];
    if (!o) throw new Error("no info for icon: " + this.name);
    t(this, o);
  };
  (ao.prototype.isIcon = !0),
    (ao.prototype.draw = function () {
      return os.symbol("#sb3-" + this.name, {
        width: this.width,
        height: this.height,
      });
    }),
    (ao.icons = {
      greenFlag: { width: 20, height: 21, dy: -2 },
      turnLeft: { width: 24, height: 24 },
      turnRight: { width: 24, height: 24 },
      loopArrow: { width: 24, height: 24 },
      addInput: { width: 4, height: 8 },
      delInput: { width: 4, height: 8 },
      musicBlock: { width: 40, height: 40 },
      penBlock: { width: 40, height: 40 },
      videoBlock: { width: 40, height: 40, dy: 10 },
      ttsBlock: { width: 40, height: 40 },
      translateBlock: { width: 40, height: 40 },
      wedoBlock: { width: 40, height: 40 },
      ev3Block: { width: 40, height: 40 },
      microbitBlock: { width: 40, height: 40 },
      makeymakeyBlock: { width: 40, height: 40 },
    });
  var no = function () {
    (this.width = 1), (this.height = 40), (this.x = 0);
  };
  (no.prototype.isLine = !0),
    (no.prototype.measure = function () {}),
    (no.prototype.draw = function (e) {
      var t = e.info.category;
      return os.el("line", {
        class: "sb3-" + t + "-line",
        "stroke-linecap": "round",
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 40,
      });
    });
  var ro = function (e) {
    t(this, e),
      e.label && (this.label = fo(e.label)),
      (this.isBoolean = "boolean" === this.shape),
      (this.isDropdown = "dropdown" === this.shape),
      (this.isRound = !(this.isBoolean || this.isDropdown)),
      (this.x = 0);
  };
  (ro.prototype.isInput = !0),
    (ro.prototype.measure = function () {
      this.hasLabel && this.label.measure();
    }),
    (ro.shapes = {
      string: os.pillRect,
      number: os.pillRect,
      "number-dropdown": os.pillRect,
      color: os.pillRect,
      dropdown: os.roundRect,
      boolean: os.pointedRect,
      stack: os.stackRect,
      reporter: os.pillRect,
    }),
    (ro.prototype.draw = function (e) {
      if (this.isBoolean) var t = 48;
      else if (this.isColor) var t = 40;
      else if (this.hasLabel) {
        var s = this.label.draw(),
          o = 18 <= this.label.width ? 11 : (40 - this.label.width) / 2,
          t = this.label.width + 2 * o;
        s = os.move(o, 9, s);
      } else var t = this.isInset ? 30 : null;
      this.hasArrow && (t += 20), (this.width = t);
      var i = (this.height = 32),
        a = ro.shapes[this.shape](t, i);
      os.setProps(a, {
        class: [
          this.isColor ? "" : "sb3-" + e.info.category,
          "sb3-input",
          "sb3-input-" + this.shape,
        ].join(" "),
      }),
        this.isColor
          ? os.setProps(a, { fill: this.value })
          : "dropdown" === this.shape
          ? e.info.color &&
            os.setProps(a, { fill: e.info.color, stroke: "rgba(0, 0, 0, 0.2)" })
          : "number-dropdown" === this.shape
          ? (a.classList.add("sb3-" + e.info.category + "-alt"),
            e.info.color &&
              os.setProps(a, {
                fill: "rgba(0, 0, 0, 0.1)",
                stroke: "rgba(0, 0, 0, 0.15)",
              }))
          : "boolean" === this.shape &&
            (a.classList.remove("sb3-" + e.info.category),
            a.classList.add("sb3-" + e.info.category + "-dark"),
            e.info.color && os.setProps(a, { fill: "rgba(0, 0, 0, 0.15)" }));
      var n = os.group([a]);
      return (
        this.hasLabel && n.appendChild(s),
        this.hasArrow &&
          n.appendChild(
            os.move(t - 24, 13, os.symbol("#sb3-dropdownArrow", {}))
          ),
        n
      );
    });
  var co = function (e) {
    switch (
      (t(this, e),
      (this.children = e.children.map(fo)),
      (this.comment = this.comment ? fo(this.comment) : null),
      (this.isRound = this.isReporter),
      (this.info = t({}, e.info)),
      this.info.category)
    ) {
      case "music":
        this.children.unshift(new no()),
          this.children.unshift(new ao({ name: "musicBlock" })),
          (this.info.category = "extension");
        break;
      case "pen":
        this.children.unshift(new no()),
          this.children.unshift(new ao({ name: "penBlock" })),
          (this.info.category = "extension");
        break;
      case "video":
        this.children.unshift(new no()),
          this.children.unshift(new ao({ name: "videoBlock" })),
          (this.info.category = "extension");
        break;
      case "tts":
      case "translate":
      case "wedo":
      case "ev3":
      case "microbit":
      case "makeymakey":
        this.children.unshift(new no()),
          this.children.unshift(new ao({ name: this.info.category + "Block" })),
          (this.info.category = "extension");
    }
    (this.x = 0),
      (this.width = null),
      (this.height = null),
      (this.firstLine = null),
      (this.innerWidth = null);
  };
  (co.prototype.isBlock = !0),
    (co.prototype.measure = function () {
      for (var e, t = 0; t < this.children.length; t++)
        (e = this.children[t]), e.measure && e.measure();
      this.comment && this.comment.measure();
    }),
    (co.shapes = {
      stack: os.stackRect,
      "c-block": os.stackRect,
      "if-block": os.stackRect,
      celse: os.stackRect,
      cend: os.stackRect,
      cap: os.capRect,
      reporter: os.pillRect,
      boolean: os.pointedRect,
      hat: os.hatRect,
      "define-hat": os.procHatRect,
      ring: os.pillRect,
    }),
    (co.prototype.drawSelf = function (e, t, s) {
      if (1 < s.length)
        return os.mouthRect(e, t, this.isFinal, s, {
          class: ["sb3-" + this.info.category].join(" "),
        });
      if ("outline" === this.info.shape)
        return os.setProps(os.stackRect(e, t), {
          class: [
            "sb3-" + this.info.category,
            "sb3-" + this.info.category + "-alt",
          ].join(" "),
        });
      if (this.isRing) {
        var o = this.children[0];
        if (o && (o.isInput || o.isBlock || o.isScript)) {
          o.isScript ? "stack" : o.isInput ? o.shape : o.info.shape;
          return os.roundRect(e, t, {
            class: ["sb3-" + this.info.category].join(" "),
          });
        }
      }
      var i = co.shapes[this.info.shape];
      if (!i) throw new Error("no shape func: " + this.info.shape);
      return i(e, t, { class: ["sb3-" + this.info.category].join(" ") });
    }),
    (co.padding = { hat: [24, 8], "define-hat": [20, 16], null: [4, 4] }),
    (co.prototype.horizontalPadding = function (e) {
      if (this.isRound) {
        if (e.isIcon) return 16;
        if (e.isLabel) return 12;
        if (e.isDropdown) return 12;
        if (e.isBoolean) return 12;
        if (e.isRound) return 4;
      } else if (this.isBoolean) {
        if (e.isIcon) return 24;
        if (e.isLabel) return 20;
        if (e.isDropdown) return 20;
        if (e.isRound && e.isBlock) return 24;
        if (e.isRound) return 20;
        if (e.isBoolean) return 8;
      }
      return 8;
    }),
    (co.prototype.marginBetween = function (e, t) {
      return e.isLabel && t.isLabel ? 5 : 8;
    }),
    (co.prototype.draw = function () {
      function e() {
        0 === A.length ? (u.height += n + r) : ((u.height -= 11), (u.y -= 2)),
          (c += u.height),
          A.push(u);
      }
      var t = "define-hat" === this.info.shape,
        s = this.children,
        o = this.isCommand,
        a = co.padding[this.info.shape] || co.padding[null],
        n = a[0],
        r = a[1],
        c = 0,
        l = function (e) {
          (this.y = e),
            (this.width = 0),
            (this.height = o ? 40 : 32),
            (this.children = []);
        },
        p = 0,
        d = 0,
        u = new l(c);
      if (this.info.isRTL) {
        for (
          var g = 0,
            f = function () {
              s = s
                .slice(0, g)
                .concat(s.slice(g, m).reverse())
                .concat(s.slice(m));
            }.bind(this),
            m = 0;
          m < s.length;
          m++
        )
          s[m].isScript && (f(), (g = m + 1));
        g < m && f();
      }
      for (var b, k, w, A = [], m = 0; m < s.length; m++)
        if (((w = s[m]), (w.el = w.draw(this)), w.isScript && this.isCommand))
          (this.hasScript = !0),
            e(),
            (w.y = c - 1),
            A.push(w),
            (d = v(d, v(1, w.width))),
            (w.height = v(29, w.height + 3) - 2),
            (c += w.height),
            (u = new l(c)),
            (b = null);
        else if (w.isArrow) u.children.push(w), (b = w);
        else {
          A.length || (k = w), b && (u.width += this.marginBetween(b, w));
          var S = 48 - this.horizontalPadding(s[0]);
          (this.isCommand || this.isOutline) &&
            !w.isLabel &&
            !w.isIcon &&
            u.width < S &&
            (u.width = S),
            w.isIcon &&
              0 === m &&
              this.isCommand &&
              (u.height = v(u.height, w.height + 8)),
            (w.x = u.width),
            (u.width += w.width),
            (p = v(p, u.width)),
            w.isLabel || (u.height = v(u.height, w.height)),
            u.children.push(w),
            (b = w);
        }
      e();
      var L = s.length ? this.horizontalPadding(s[0]) : 0,
        O = s.length ? this.horizontalPadding(k) : 0;
      p += L + O;
      var E = p;
      (p = v(
        this.hasScript
          ? 160
          : this.isHat
          ? 108
          : this.isCommand || this.isOutline
          ? 64
          : this.isReporter
          ? 48
          : 0,
        p
      )),
        (L += (p - E) / 2),
        (this.height = c),
        (this.width = d ? v(p, 15 + d) : p),
        (this.firstLine = A[0]),
        (this.innerWidth = p);
      for (var u, R = [], m = 0; m < A.length; m++) {
        if (((u = A[m]), u.isScript)) {
          R.push(os.move(16, u.y, u.el));
          continue;
        }
        for (var w, I = u.height, h = 0; h < u.children.length; h++) {
          if (((w = u.children[h]), w.isArrow)) {
            R.push(os.move(p - 32, this.height - 28, w.el));
            continue;
          }
          var c = n + (I - w.height - n - r) / 2;
          w.isLabel && 0 === m
            ? (c -= 1)
            : t && w.isLabel
            ? (c += 3)
            : w.isIcon &&
              ((c += 0 | w.dy),
              this.isCommand && 0 === m && 0 === h && (c += 4));
          var C = L + w.x;
          w.dx && (C += w.dx), R.push(os.move(C, 0 | (u.y + c), w.el));
        }
      }
      var T = this.drawSelf(p, this.height, A);
      return (
        R.splice(0, 0, T),
        this.info.color &&
          os.setProps(T, {
            fill: this.info.color,
            stroke: "rgba(0, 0, 0, 0.2)",
          }),
        os.group(R)
      );
    });
  var lo = function (e) {
    t(this, e), (this.label = fo(e.label)), (this.width = null);
  };
  (lo.prototype.isComment = !0),
    (lo.lineLength = 12),
    (lo.prototype.height = 20),
    (lo.prototype.measure = function () {
      this.label.measure();
    }),
    (lo.prototype.draw = function () {
      var e = this.label.draw();
      return (
        (this.width = this.label.width + 16),
        os.group([
          os.commentLine(this.hasBlock ? lo.lineLength : 0, 6),
          os.commentRect(this.width, this.height, { class: "sb3-comment" }),
          os.move(8, 4, e),
        ])
      );
    });
  var po = function (e) {
    t(this, e),
      (this.child = fo(e.child)),
      (this.width = null),
      (this.height = null),
      (this.y = 0);
  };
  (po.prototype.isGlow = !0),
    (po.prototype.measure = function () {
      this.child.measure();
    }),
    (po.prototype.drawSelf = function () {
      var e,
        t = this.child,
        s = this.width,
        o = this.height - 1;
      if (t.isScript)
        e =
          !t.isEmpty && t.blocks[0].isHat
            ? os.hatRect(s, o)
            : t.isFinal
            ? os.capRect(s, o)
            : os.stackRect(s, o);
      else var e = t.drawSelf(s, o, []);
      return os.setProps(e, { class: "sb3-diff sb3-diff-ins" });
    }),
    (po.prototype.draw = function () {
      var e = this.child,
        t = e.isScript ? e.draw(!0) : e.draw();
      return (
        (this.width = e.width),
        (this.height = (e.isBlock && e.firstLine.height) || e.height),
        os.group([t, this.drawSelf()])
      );
    });
  var ho = function (e) {
    t(this, e), (this.blocks = e.blocks.map(fo)), (this.y = 0);
  };
  (ho.prototype.isScript = !0),
    (ho.prototype.measure = function () {
      for (var e = 0; e < this.blocks.length; e++) this.blocks[e].measure();
    }),
    (ho.prototype.draw = function (e) {
      var t = [],
        s = 1;
      this.width = 0;
      for (var o = 0; o < this.blocks.length; o++) {
        var a = this.blocks[o],
          n = e ? 0 : 2,
          r = a.draw();
        t.push(os.move(n, s, r)), (this.width = v(this.width, a.width));
        var c = a.diff;
        if ("-" === c) {
          var l = a.width,
            p = a.firstLine.height || a.height;
          t.push(os.move(n, s + p / 2 + 1, os.strikethroughLine(l))),
            (this.width = v(this.width, a.width));
        }
        s += a.height;
        var h = a.comment;
        if (h) {
          var d = a.firstLine,
            u = a.innerWidth + 2 + lo.lineLength,
            g = s - a.height + d.height / 2,
            f = h.draw();
          t.push(os.move(u, g - h.height / 2, f)),
            (this.width = v(this.width, u + h.width));
        }
      }
      return (
        (this.height = s + 1),
        e || this.isFinal || (this.height += a.hasPuzzle ? 44 : 36),
        !e && a.isGlow && (this.height += 2),
        os.group(t)
      );
    });
  var uo = function (e) {
    t(this, e),
      (this.scripts = e.scripts.map(fo)),
      (this.width = null),
      (this.height = null),
      (this.el = null),
      (this.defs = null);
  };
  (uo.prototype.measure = function () {
    this.scripts.forEach(function (e) {
      e.measure();
    });
  }),
    (uo.prototype.render = function () {
      if ("function" == typeof ocbptions)
        throw new Error("render() no longer takes a callback");
      this.measure();
      for (var e, t = 0, s = 0, o = [], a = 0; a < this.scripts.length; a++)
        (e = this.scripts[a]),
          s && (s += 10),
          (e.y = s),
          o.push(os.move(0, s, e.draw())),
          (s += e.height),
          (t = v(t, e.width + 4));
      (this.width = t), (this.height = s);
      var n = os.newSVG(t, s);
      return (
        n.appendChild((this.defs = os.withChildren(os.el("defs"), oo()))),
        n.appendChild(os.group(o)),
        (this.el = n),
        n
      );
    }),
    (uo.prototype.exportSVGString = function () {
      if (null == this.el) throw new Error("call draw() first");
      var e = so();
      this.defs.appendChild(e);
      var t = new os.XMLSerializer().serializeToString(this.el);
      return this.defs.removeChild(e), t;
    }),
    (uo.prototype.exportSVG = function () {
      var e = this.exportSVGString();
      return "data:image/svg+xml;utf8," + e.replace(/[#]/g, encodeURIComponent);
    }),
    (uo.prototype.toCanvas = function (e, t) {
      t = t || 1;
      var s = os.makeCanvas();
      (s.width = this.width * t), (s.height = this.height * t);
      var o = s.getContext("2d"),
        i = new Image();
      (i.src = this.exportSVG()),
        (i.onload = function () {
          o.save(), o.scale(t, t), o.drawImage(i, 0, 0), o.restore(), e(s);
        });
    }),
    (uo.prototype.exportPNG = function (e, t) {
      this.toCanvas(function (t) {
        if (URL && URL.createObjectURL && Blob && t.toBlob)
          t.toBlob(function (t) {
            e(URL.createObjectURL(t));
          }, "image/png");
        else e(t.toDataURL("image/png"));
      }, t);
    });
  var go = function (e) {
      switch (e.constructor) {
        case Ks:
          return io;
        case Ws:
          return ao;
        case Xs:
          return ro;
        case qs:
          return co;
        case Zs:
          return lo;
        case Qs:
          return po;
        case Js:
          return ho;
        case $s:
          return uo;
        default:
          throw new Error("no view for " + e.constructor.name);
      }
    },
    fo = function (e) {
      return new (go(e))(e);
    },
    mo = { newView: fo, LabelView: io },
    yo = {
      init: function (e) {
        os.init(e),
          (mo.LabelView.measuring = (function () {
            var e = os.makeCanvas();
            return e.getContext("2d");
          })());
      },
      newView: mo.newView,
      makeStyle: Gs.makeStyle,
    },
    bo = function (e) {
      function s(e, t) {
        return c.parse(e, t);
      }
      function o(e, s) {
        var s = t({ style: "scratch2" }, s);
        switch (s.style) {
          case "scratch2":
            return b.newView(e);
          case "scratch3":
            return k.newView(e);
          default:
            throw new Error("Unknown style: " + s.style);
        }
      }
      function i(e, t) {
        if ("function" == typeof t)
          throw new Error("render() no longer takes a callback");
        var s = o(e, t),
          i = s.render();
        return i;
      }
      function a(e, s) {
        var s = t({ inline: !1 }, s),
          o = e.innerHTML.replace(/<br>\s?|\n|\r\n|\r/gi, "\n"),
          i = r.createElement("pre");
        i.innerHTML = o;
        var a = i.textContent;
        return s.inline && (a = a.replace("\n", "")), a;
      }
      function n(e, t, s, o) {
        if (o.inline) {
          var i = r.createElement("span"),
            a = "scratchblocks scratchblocks-inline";
          s.scripts[0] &&
            !s.scripts[0].isEmpty &&
            (a += " scratchblocks-inline-" + s.scripts[0].blocks[0].shape),
            (i.className = a),
            (i.style.display = "inline-block"),
            (i.style.verticalAlign = "middle");
        } else {
          var i = r.createElement("div");
          i.className = "scratchblocks";
        }
        i.appendChild(t), (e.innerHTML = ""), e.appendChild(i);
      }
      var r = e.document,
        c = Pe,
        l = c.allLanguages,
        p = c.loadLanguages,
        h = c.Label,
        d = c.Icon,
        u = c.Input,
        g = c.Block,
        f = c.Comment,
        m = c.Script,
        y = c.Document,
        b = ss;
      b.init(e);
      var k = yo;
      k.init(e);
      var w = function (e, o) {
        var e = e || "pre.blocks",
          o = t(
            {
              style: "scratch2",
              inline: !1,
              languages: ["en"],
              read: a,
              parse: s,
              render: i,
              replace: n,
            },
            o
          ),
          c = [].slice.apply(r.querySelectorAll(e));
        c.forEach(function (e) {
          var t = o.read(e, o),
            s = o.parse(t, o),
            i = o.render(s, o);
          o.replace(e, i, s, o);
        });
      };
      return {
        allLanguages: l,
        loadLanguages: p,
        stringify: function (e) {
          return e.stringify();
        },
        Label: h,
        Icon: d,
        Input: u,
        Block: g,
        Comment: f,
        Script: m,
        Document: y,
        newView: o,
        read: a,
        parse: s,
        replace: n,
        render: i,
        renderMatching: w,
        appendStyles: function () {
          r.head.appendChild(b.makeStyle()), r.head.appendChild(k.makeStyle());
        },
      };
    },
    ko = e(function (e) {
      var t = (window.scratchblocks = e.exports = bo(window));
      t.appendStyles();
    });
  return ko;
})();
