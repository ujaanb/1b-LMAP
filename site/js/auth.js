/* LMAP Study Hub — static access gate.
   Runs synchronously from <head> so protected markup never paints.
   Deliberately keeps no session state: every load must be unlocked again. */
(function () {
  "use strict";

  var LOCK_CLASS = "lmap-locked";
  var OVERLAY_ID = "lmap-auth-overlay";
  var STYLE_ID = "lmap-auth-style";
  var SALT = "lmap-1b-gate";
  var ROUNDS = 512;
  var EXPECT_USER = "14jtw0i";
  var EXPECT_PASS = "1nwrqt3";

  if (document.getElementById(STYLE_ID)) return;

  function fnv1a(str) {
    var x = 0x811c9dc5;
    for (var i = 0; i < str.length; i++) {
      x ^= str.charCodeAt(i);
      x = Math.imul(x, 0x01000193) >>> 0;
    }
    return x.toString(36);
  }

  function digest(value) {
    var v = SALT + "|" + value;
    for (var i = 0; i < ROUNDS; i++) {
      v = fnv1a(v) + "|" + SALT + "|" + i;
    }
    return fnv1a(v);
  }

  var root = document.documentElement;
  root.classList.add(LOCK_CLASS);

  var style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = [
    "html." + LOCK_CLASS + " { background: #eef5f0; }",
    "html." + LOCK_CLASS + " body { background: none !important; }",
    "html." + LOCK_CLASS + " body > *:not(#" + OVERLAY_ID + ") { display: none !important; }",
    "#" + OVERLAY_ID + " {",
    "  position: fixed; inset: 0; z-index: 2147483647;",
    "  display: flex; align-items: center; justify-content: center; padding: 1.5rem;",
    "  background:",
    "    radial-gradient(1100px 560px at 8% -12%, #cfe8da 0%, transparent 55%),",
    "    radial-gradient(900px 480px at 100% 0%, #e8d5c4 0%, transparent 42%),",
    "    linear-gradient(180deg, #eef5f0 0%, #f3f7f4 42%, #e7f0ea 100%);",
    "}",
    "#" + OVERLAY_ID + " .lmap-auth-card {",
    "  width: 100%; max-width: 24rem; box-sizing: border-box;",
    "  background: #ffffff; border: 1px solid #cfdcd4;",
    "  border-radius: 16px; padding: 2rem 1.8rem;",
    "  box-shadow: 0 12px 40px rgba(19, 37, 31, 0.08);",
    "  text-align: left; color: #13251f;",
    '  font-family: "Source Serif 4", Georgia, serif;',
    "}",
    "#" + OVERLAY_ID + " .lmap-auth-mark {",
    '  font-family: "DM Sans", sans-serif; font-weight: 700;',
    "  font-size: 0.78rem; letter-spacing: 0.16em; text-transform: uppercase;",
    "  color: #1f6b4a; margin: 0 0 0.6rem;",
    "}",
    "#" + OVERLAY_ID + " h1 {",
    '  font-family: "Fraunces", Georgia, serif; font-weight: 650;',
    "  font-size: 1.6rem; letter-spacing: -0.02em; line-height: 1.2;",
    "  margin: 0 0 0.4rem;",
    "}",
    "#" + OVERLAY_ID + " .lmap-auth-lead {",
    "  margin: 0 0 1.4rem; font-size: 0.95rem; color: #5f756b;",
    "}",
    "#" + OVERLAY_ID + " label {",
    '  display: block; font-family: "DM Sans", sans-serif;',
    "  font-size: 0.78rem; font-weight: 600; letter-spacing: 0.08em;",
    "  text-transform: uppercase; color: #5f756b; margin: 0 0 0.35rem;",
    "}",
    "#" + OVERLAY_ID + " input {",
    '  width: 100%; box-sizing: border-box; font-family: "DM Sans", sans-serif;',
    "  font-size: 1rem; padding: 0.7rem 0.8rem; margin: 0 0 1rem;",
    "  border: 1px solid #cfdcd4; border-radius: 8px;",
    "  background: #f3f7f4; color: #13251f;",
    "}",
    "#" + OVERLAY_ID + " input:focus {",
    "  outline: none; border-color: #1f6b4a;",
    "  box-shadow: 0 0 0 3px rgba(31, 107, 74, 0.16);",
    "}",
    "#" + OVERLAY_ID + " button {",
    '  width: 100%; font-family: "DM Sans", sans-serif;',
    "  font-size: 0.95rem; font-weight: 600; color: #ffffff;",
    "  background: #13251f; border: none; border-radius: 999px;",
    "  padding: 0.85rem 1.35rem; cursor: pointer;",
    "  transition: background 0.2s ease, transform 0.2s ease;",
    "}",
    "#" + OVERLAY_ID + " button:hover { background: #154c35; transform: translateY(-1px); }",
    "#" + OVERLAY_ID + " .lmap-auth-error {",
    '  font-family: "DM Sans", sans-serif; font-size: 0.85rem;',
    "  color: #b54a3c; margin: 0.9rem 0 0; min-height: 1.2em;",
    "}",
    "#" + OVERLAY_ID + " .lmap-auth-error:empty { margin-top: 0; }",
  ].join("\n");

  (document.head || root).appendChild(style);

  function unlock(overlay) {
    root.classList.remove(LOCK_CLASS);
    if (style.parentNode) style.parentNode.removeChild(style);
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    window.dispatchEvent(new Event("resize"));
  }

  function mount() {
    if (document.getElementById(OVERLAY_ID)) return;

    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    overlay.innerHTML =
      '<form class="lmap-auth-card" autocomplete="off" novalidate>' +
      '<p class="lmap-auth-mark">LMAP · Phase 1B</p>' +
      "<h1>Private study hub</h1>" +
      '<p class="lmap-auth-lead">Sign in to view the notes and practice questions.</p>' +
      '<label for="lmap-auth-user">Username</label>' +
      '<input id="lmap-auth-user" name="lmap-auth-user" type="text" autocapitalize="none" spellcheck="false" autocomplete="off" />' +
      '<label for="lmap-auth-pass">Password</label>' +
      '<input id="lmap-auth-pass" name="lmap-auth-pass" type="password" autocomplete="new-password" />' +
      "<button type=\"submit\">Unlock</button>" +
      '<p class="lmap-auth-error" id="lmap-auth-error" role="alert" aria-live="polite"></p>' +
      "</form>";

    document.body.appendChild(overlay);

    var form = overlay.querySelector("form");
    var userField = overlay.querySelector("#lmap-auth-user");
    var passField = overlay.querySelector("#lmap-auth-pass");
    var errorBox = overlay.querySelector("#lmap-auth-error");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var user = digest(String(userField.value).trim().toLowerCase());
      var pass = digest(String(passField.value));

      if (user === EXPECT_USER && pass === EXPECT_PASS) {
        unlock(overlay);
        return;
      }

      errorBox.textContent = "Incorrect username or password.";
      passField.value = "";
      passField.focus();
    });

    userField.focus();
  }

  if (document.body) {
    mount();
  } else {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  }

  // A page restored from the back/forward cache keeps its unlocked DOM, so force a reload.
  window.addEventListener("pageshow", function (event) {
    if (event.persisted) window.location.reload();
  });
})();
