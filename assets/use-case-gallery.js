/* Chakra homepage interactive industry showcase · no dependencies.
   Six illustrative cases from the 23 October 2026 draft ROSA investor deck.
   Motion is opt-out; soundtrack is opt-in and generated locally with Web Audio. */
(function () {
  "use strict";

  var stage = document.getElementById("uc-experience");
  var gallery = document.getElementById("uc-gallery");
  var section = document.getElementById("use-cases");
  var dialog = document.getElementById("uc-dialog");
  if (!stage || !gallery || !section || !dialog) return;

  var cases = [
    {
      name:"Healthcare",category:"PATIENT SAFETY",color:"#73ebf2",
      summary:"Critical patient information omits a severe drug allergy.",
      scenario:"A physician relies on AI-enabled patient information that omits a severe drug allergy to make a prescribing decision, placing the patient at great risk of a severe allergic reaction or death.",
      question:"Is this information sufficiently complete, accurate, and current for the prescribing decision?",
      icon:'<path d="M45 18h30v27h27v30H75v27H45V75H18V45h27z"/><path d="M19 62h22l9-14 13 28 9-14h29"/>'
    },
    {
      name:"Banking",category:"CONSUMER LENDING",color:"#83afff",
      summary:"An incorrect income entry changes a mortgage decision.",
      scenario:"A bank relies on incorrectly entered income information to make a lending decision, denying a qualified applicant a mortgage while approving an unqualified applicant.",
      question:"Has the income information been validated against appropriate sources before being relied upon?",
      icon:'<path d="M13 46 60 20l47 26M18 52h84M16 101h88M24 93h72"/><path d="M29 57v30m17-30v30m14-30v30m14-30v30m17-30v30"/>'
    },
    {
      name:"Aviation",category:"FLIGHT SAFETY",color:"#ffcf7b",
      summary:"Incorrect air-traffic information influences flight operations.",
      scenario:"A flight crew relies on incorrect air traffic control information to make an operational decision, placing passengers, pilots, and crew at great risk of a midair collision.",
      question:"Is the operational information verified, timely, and suitable for the flight-safety decision?",
      icon:'<path d="M60 13 72 56l36 21v11l-43-9v24l-5 5-5-5V79l-43 9V77l36-21Z"/><path d="M34 34a42 42 0 0 1 52 0M41 43a28 28 0 0 1 38 0"/>'
    },
    {
      name:"Public Safety",category:"HEALTH RESPONSE",color:"#8bf1ab",
      summary:"Insufficient outbreak tracking delays a public-health response.",
      scenario:"Officials rely on insufficient outbreak-tracking information to make a public health decision as a nationwide Cyclospora outbreak spreads, delaying identification of the contaminated food source and placing more people at risk.",
      question:"Is the outbreak information sufficiently complete, traceable, and timely to inform the response?",
      icon:'<circle cx="60" cy="60" r="43"/><circle cx="60" cy="60" r="27"/><path d="M60 17v86M17 60h86M31 31l58 58M89 31 31 89"/><circle cx="80" cy="42" r="7"/>'
    },
    {
      name:"Agentic AI",category:"AUTONOMOUS ACTION",color:"#7be8de",
      summary:"An automated payment action uses an inaccurate amount due.",
      scenario:"A customer service chatbot relies on inaccurate amount-due information to make a payment decision, triggering incorrect collections, widespread gas shutoffs, and life-threatening loss of heat during winter.",
      question:"Which information checks and human escalation points are needed before an automated system takes action?",
      icon:'<rect x="31" y="29" width="58" height="51" rx="12"/><path d="M60 15v14m-15 30h30M21 50h10m58 0h10M44 80v18m32-18v18M37 98h14m18 0h14"/><circle cx="47" cy="49" r="4"/><circle cx="73" cy="49" r="4"/><circle cx="60" cy="15" r="4"/>'
    },
    {
      name:"Insurance",category:"HEALTHCARE DECISIONS",color:"#b8e5a0",
      summary:"Outdated patient history influences a coverage decision.",
      scenario:"An insurer relies on historical patient information that no longer reflects the patient's current condition to make a coverage decision, denying medically necessary care and putting the patient's life at risk.",
      question:"Does the evidence reflect the patient's current condition and support the coverage decision?",
      icon:'<path d="M60 13 103 31v30c0 27-15 40-43 47C32 101 17 88 17 61V31Z"/><path d="M60 37v41M39 58h42"/><path d="m40 89 20 19 20-19"/>'
    }
  ];

  var slides = cases.map(function (c, i) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "uc-card";
    button.setAttribute("data-uc-index", String(i));
    button.setAttribute("aria-label", "Open " + c.name + " use case details");
    button.style.setProperty("--uc-hue", c.color);
    button.innerHTML =
      '<span class="uc-card-face">' +
        '<span class="uc-card-top"><b>' + c.category + '</b><span>' + String(i + 1).padStart(2, "0") + " / 06</span></span>" +
        '<span class="uc-card-art" aria-hidden="true"><svg viewBox="0 0 120 120">' + c.icon + "</svg></span>" +
        '<span class="uc-card-title">' + c.name + "</span>" +
        '<span class="uc-card-subtitle">' + c.summary + "</span>" +
        '<span class="uc-card-action"><span>EXPLORE SCENARIO</span><b aria-hidden="true">↗</b></span>' +
      "</span>";
    gallery.appendChild(button);
    return button;
  });

  var dots = Array.prototype.slice.call(section.querySelectorAll(".uc-pagination button"));
  var stateLabel = document.getElementById("uc-selected-name");
  var stateCount = document.getElementById("uc-selected-count");
  var pause = document.getElementById("uc-motion");
  var sound = document.getElementById("uc-sound");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var selected = 0;
  var paused = reduceMotion;
  var stageVisible = false;
  var pointerInside = false;
  var focusInside = false;
  var lastInteraction = 0;
  var touchStart = null;
  var cancelClickBefore = 0;

  function cyclicDistance(index) {
    var delta = index - selected;
    if (delta > 2) delta -= cases.length;
    if (delta < -3) delta += cases.length;
    return delta;
  }

  function positionCards() {
    var w = window.innerWidth;
    var small = w < 740;
    var compact = w < 1060;
    var spread = small ? 155 : compact ? 230 : 290;
    slides.forEach(function (card, i) {
      var delta = cyclicDistance(i);
      var depth = Math.abs(delta);
      var x = (delta < 0 ? -1 : 1) * (depth === 0 ? 0 : depth === 1 ? spread : depth === 2 ? spread * 1.85 : spread * 2.52);
      var y = depth * (small ? 11 : 18);
      var z = depth * (small ? -105 : -153);
      var rotation = -delta * (small ? 10 : 15);
      var scale = 1 - depth * (small ? .12 : .085);
      card.style.transform = "translate3d(calc(-50% + " + x + "px), " + y + "px, " + z + "px) rotateY(" + rotation + "deg) scale(" + scale + ")";
      card.style.zIndex = String(30 - depth);
      card.style.opacity = depth === 0 ? "1" : depth === 1 ? ".93" : depth === 2 ? ".76" : ".49";
      card.style.visibility = small && depth > 1 ? "hidden" : "visible";
      card.tabIndex = small && depth > 1 ? -1 : 0;
      card.setAttribute("aria-hidden", small && depth > 1 ? "true" : "false");
      card.setAttribute("data-active", String(depth === 0));
    });
    dots.forEach(function (dot, i) {
      dot.setAttribute("aria-current", String(selected === i));
    });
    if (stateLabel) stateLabel.textContent = cases[selected].name;
    if (stateCount) stateCount.textContent = String(selected + 1).padStart(2, "0") + " / 06";
  }

  function choose(index, manual) {
    selected = (index + cases.length) % cases.length;
    if (manual) lastInteraction = Date.now();
    positionCards();
  }
  slides.forEach(function (card, i) {
    card.addEventListener("click", function (event) {
      if (Date.now() < cancelClickBefore) { event.preventDefault(); return; }
      choose(i, true);
      openDetails(i);
    });
  });
  dots.forEach(function (dot, i) { dot.addEventListener("click", function () { choose(i, true); }); });
  document.getElementById("uc-prev").addEventListener("click", function () { choose(selected - 1, true); });
  document.getElementById("uc-next").addEventListener("click", function () { choose(selected + 1, true); });
  stage.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      choose(selected + (event.key === "ArrowRight" ? 1 : -1), true);
    }
  });
  stage.addEventListener("pointerenter", function (event) { if (event.pointerType === "mouse") pointerInside = true; });
  stage.addEventListener("pointerleave", function () { pointerInside = false; });
  stage.addEventListener("focusin", function () { focusInside = true; });
  stage.addEventListener("focusout", function () {
    setTimeout(function () { focusInside = stage.contains(document.activeElement); }, 0);
  });
  stage.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "touch" || e.pointerType === "mouse") touchStart = { x:e.clientX, y:e.clientY };
  });
  stage.addEventListener("pointerup", function (e) {
    if (!touchStart) return;
    var dx = e.clientX - touchStart.x;
    var dy = e.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      cancelClickBefore = Date.now() + 450;
      choose(selected + (dx < 0 ? 1 : -1), true);
    }
  });
  stage.addEventListener("pointercancel", function () { touchStart = null; });

  function syncPause() {
    pause.setAttribute("aria-pressed", String(paused));
    pause.textContent = reduceMotion ? "MOTION REDUCED" : (paused ? "▶  RESUME MOVEMENT" : "Ⅱ  PAUSE MOVEMENT");
    if (reduceMotion) { pause.disabled = true; pause.title = "Reduced motion is enabled in your device settings"; }
  }
  pause.addEventListener("click", function () {
    if (reduceMotion) return;
    paused = !paused;
    lastInteraction = Date.now();
    syncPause();
  });
  syncPause();
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      stageVisible = entries[0].isIntersecting;
      if (!stageVisible && musicOn) stopMusic();
    }, {threshold:0.18}).observe(section);
  } else stageVisible = true;

  window.setInterval(function () {
    if (reduceMotion || paused || !stageVisible || pointerInside || focusInside ||
        document.hidden || dialog.open || Date.now() - lastInteraction < 5200) return;
    choose(selected + 1, false);
  }, 3900);

  function openDetails(i) {
    var c = cases[i];
    document.getElementById("uc-dialog-category").textContent = c.category + "  /  " + String(i + 1).padStart(2, "0") + " OF 06";
    document.getElementById("uc-dialog-title").textContent = c.name;
    document.getElementById("uc-dialog-lede").textContent = c.summary;
    document.getElementById("uc-dialog-scenario").textContent = c.scenario;
    document.getElementById("uc-dialog-question").textContent = c.question;
    lastInteraction = Date.now();
    if (!dialog.open) dialog.showModal();
    document.getElementById("uc-dialog-close").focus();
  }
  document.getElementById("uc-dialog-close").addEventListener("click", function () { dialog.close(); });
  dialog.addEventListener("click", function (event) {
    if (event.target !== dialog) return;
    var r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  });
  dialog.addEventListener("close", function () { lastInteraction = Date.now(); });

  /* Small locally-generated musical soundtrack. No external music, embeds, downloads,
     cookies or third-party stream. Audible playback requires the visitor's click. */
  var musicOn = false;
  var ctx = null, master = null, loopTimer = null, beat = 0;
  var chords = [
    [146.83, 174.61, 220.00, 293.66],
    [130.81, 164.81, 196.00, 261.63],
    [174.61, 220.00, 261.63, 349.23],
    [164.81, 196.00, 246.94, 329.63]
  ];
  function tone(freq, start, duration, volume, shape) {
    var osc = ctx.createOscillator();
    var amp = ctx.createGain();
    osc.type = shape || "sine";
    osc.frequency.setValueAtTime(freq, start);
    amp.gain.setValueAtTime(0.0001, start);
    amp.gain.linearRampToValueAtTime(volume, start + Math.min(.32, duration * .24));
    amp.gain.setTargetAtTime(.0001, start + duration * .61, Math.max(.12, duration * .11));
    osc.connect(amp);
    amp.connect(master);
    osc.start(start);
    osc.stop(start + duration + .16);
  }
  function bar() {
    if (!musicOn || !ctx || ctx.state === "closed") return;
    var now = ctx.currentTime + .09;
    var chord = chords[beat % chords.length];
    for (var i = 0; i < chord.length; i++) tone(chord[i], now, 4.1, .027, "sine");
    for (var j = 0; j < 5; j++) tone(chord[(j * 3 + beat) % 4] * 2, now + .35 + j * .65, .55, .016, "triangle");
    beat++;
  }
  function setSoundText() {
    sound.setAttribute("aria-pressed", String(musicOn));
    var text = document.getElementById("uc-sound-label");
    if (text) text.textContent = musicOn ? "SOUND ON" : "SOUND OFF";
  }
  async function startMusic() {
    try {
      var Ctor = window.AudioContext || window.webkitAudioContext;
      if (!Ctor) { sound.title = "Audio playback is not supported by this browser"; return; }
      if (!ctx || ctx.state === "closed") {
        ctx = new Ctor();
        master = ctx.createGain();
        master.gain.value = 0;
        master.connect(ctx.destination);
      }
      await ctx.resume();
      var t = ctx.currentTime;
      master.gain.cancelScheduledValues(t);
      master.gain.setTargetAtTime(.85, t, .35);
      musicOn = true;
      setSoundText();
      bar();
      loopTimer = window.setInterval(bar, 3850);
    } catch (err) {
      musicOn = false;
      setSoundText();
      sound.title = "Browser audio permission is needed to play the soundtrack";
    }
  }
  function stopMusic() {
    if (loopTimer !== null) { clearInterval(loopTimer); loopTimer = null; }
    if (ctx && master) {
      var t = ctx.currentTime;
      master.gain.cancelScheduledValues(t);
      master.gain.setTargetAtTime(.0001, t, .12);
    }
    musicOn = false;
    setSoundText();
  }
  sound.addEventListener("click", function () {
    if (musicOn) stopMusic(); else startMusic();
  });
  document.addEventListener("visibilitychange", function () {
    if (!ctx || !musicOn) return;
    if (document.hidden) ctx.suspend().catch(function () {});
    else ctx.resume().catch(function () {});
  });
  window.addEventListener("pagehide", stopMusic);
  window.addEventListener("resize", positionCards, {passive:true});
  positionCards();
})();
