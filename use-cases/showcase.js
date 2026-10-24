/* Chakra | immersive standalone use-case gallery (c) Chakra Intelligent Systems 2026.
   Original carousel behavior; no borrowed project artwork or source scripts.
   All examples adapt the October 2026 draft ROSA investor presentation. */
(function () {
 "use strict";
 var root=document.getElementById("experience"), rail=document.getElementById("card-rail"), modal=document.getElementById("case-dialog");
 if(!root||!rail||!modal)return;
 var cases=[
  {name:"Healthcare",tag:"PATIENT SAFETY",short:"A missing drug allergy changes the risk of a medical decision.",question:"Is the patient information complete, accurate, and current enough for a prescribing decision?",scenario:"A physician relies on AI-enabled patient information that omits a severe drug allergy to make a prescribing decision, placing the patient at great risk of a severe allergic reaction or death.",photo:"photo-1576091160399-112ba8d25d1d",focal:"48% 50%"},
  {name:"Banking",tag:"CONSUMER LENDING",short:"Incorrect income data shapes a consequential mortgage decision.",question:"Has the source income information been validated before the lending decision relies on it?",scenario:"A bank relies on incorrectly entered income information to make a lending decision, denying a qualified applicant a mortgage while approving an unqualified applicant.",photo:"photo-1563013544-824ae1b704d3",focal:"55% 50%"},
  {name:"Aviation",tag:"FLIGHT SAFETY",short:"Incorrect air-traffic information affects flight operations.",question:"Has critical air-traffic information been verified and established as suitable for the intended operational use?",scenario:"A flight crew relies on incorrect air traffic control information to make an operational decision, placing passengers, pilots, and crew at great risk of a midair collision.",photo:"photo-1436491865332-7a61a109cc05",focal:"48% 50%"},
  {name:"Public Safety",tag:"HEALTH RESPONSE",short:"Insufficient outbreak data delays identifying a contaminated source.",question:"Is the outbreak information sufficiently complete and traceable to support the intended public-health response?",scenario:"Officials rely on insufficient outbreak-tracking information to make a public health decision as a nationwide Cyclospora outbreak spreads, delaying identification of the contaminated food source and placing more people at risk.",photo:"photo-1584036561566-baf8f5f1b144",focal:"54% 50%"},
  {name:"Agentic AI",tag:"AUTONOMOUS ACTION",short:"An autonomous payment action relies on an inaccurate amount due.",question:"Which validation and escalation steps are needed before automated systems act on this payment information?",scenario:"A customer service chatbot relies on inaccurate amount-due information to make a payment decision, triggering incorrect collections, widespread gas shutoffs, and life-threatening loss of heat during winter.",photo:"photo-1677442136019-21780ecad995",focal:"50% 50%"},
  {name:"Insurance",tag:"HEALTHCARE DECISIONS",short:"Outdated patient records influence an insurance coverage decision.",question:"Does the source record reflect the patient's current condition for this coverage determination?",scenario:"An insurer relies on historical patient information that no longer reflects the patient's current condition to make a coverage decision, denying medically necessary care and putting the patient's life at risk.",photo:"photo-1551601651-2a8555f1a136",focal:"50% 50%"}
 ];
 var n=cases.length, selected=0, lastActivity=0, pauseAuto=false, hovering=false, focusInside=false, canSee=true;
 var phase=0, targetPhase=null, dragging=false, pressing=false, lastRenderedSelection=-1, lastFrame=0;
 var reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 var cards=cases.map(function(c,i){
  var btn=document.createElement("button");
  btn.type="button";btn.className="case-tile";
  btn.setAttribute("aria-label","Open "+c.name+" use case details");
  btn.dataset.case=String(i);btn.dataset.selected="false";
  var inner=document.createElement("span");inner.className="tile-inner";
  var fallback=document.createElement("span");fallback.className="tile-fallback";fallback.setAttribute("aria-hidden","true");
  var image=document.createElement("img");image.className="case-photo";image.alt="";image.decoding="async";image.loading="eager";image.draggable=false;
  image.addEventListener("dragstart",function(e){e.preventDefault()});
  image.src="https://images.unsplash.com/"+c.photo+"?auto=format&fit=crop&w=620&h=840&q=79";
  image.style.objectPosition=c.focal;
  image.addEventListener("error",function(){image.classList.add("tile-photo-error")});
  var mark=document.createElement("span");mark.className="tile-mark";mark.textContent="CHAKRA / "+String(i+1).padStart(2,"0");
  var label=document.createElement("span");label.className="tile-category";
  var title=document.createElement("strong");title.textContent=c.name;
  var subtitle=document.createElement("small");subtitle.textContent=c.tag;
  label.appendChild(title);label.appendChild(subtitle);
  inner.appendChild(fallback);inner.appendChild(image);inner.appendChild(mark);inner.appendChild(label);btn.appendChild(inner);rail.appendChild(btn);
  return btn;
 });
 var progress=document.getElementById("index-track");
 var dots=cases.map(function(c,i){
   var b=document.createElement("button");b.type="button";b.setAttribute("aria-label","Select "+c.name);b.setAttribute("aria-current","false");
   b.addEventListener("click",function(){select(i,true)});
   progress.appendChild(b);return b;
 });
 var number=document.getElementById("active-number"),title=document.getElementById("active-title");
 var description=document.getElementById("active-description"),filter=document.getElementById("filter-btn");
 var menu=document.getElementById("filter-panel"),pause=document.getElementById("pause-btn"),music=document.getElementById("music-btn");
 var casesMenu=cases.map(function(c,i){
   var b=document.createElement("button");b.type="button";b.className="filter-option";b.setAttribute("role","option");
   b.textContent=String(i+1).padStart(2,"0")+" / "+c.name;
   b.addEventListener("click",function(){select(i,true);hideMenu()});
   menu.appendChild(b);return b;
 });
 /* A continuous cover-flow track. Card distance is fractional, so each face
    travels smoothly around a shallow 3D curve rather than jumping between
    fixed positions. Far edge cards fade out before wrapping around. */
 function wrapDistance(i){
   return ((i-phase+n*1.5)%n+n)%n-n/2;
 }
 function updateReadout(){
   var nearest=((Math.round(phase)%n)+n)%n;
   if(nearest===lastRenderedSelection)return;
   selected=nearest;
   lastRenderedSelection=nearest;
   dots.forEach(function(b,i){b.setAttribute("aria-current",String(i===selected))});
   casesMenu.forEach(function(b,i){b.setAttribute("aria-selected",String(i===selected))});
   number.textContent=String(selected+1).padStart(2,"0");
   document.getElementById("selected-counter").textContent=String(selected+1).padStart(2,"0");
   title.textContent=cases[selected].name;
   description.textContent=cases[selected].short;
 }
 function positions(){
   var w=window.innerWidth, mobile=w<740;
   var unit=mobile?Math.min(158,w*.46):w<1060?190:Math.min(258,w*.15);
   cards.forEach(function(card,i){
     var d=wrapDistance(i),depth=Math.abs(d),sign=d<0?-1:1;
     var px=sign*(depth<=1?depth*unit:unit*(1+(depth-1)*.83));
     var py=depth*depth*(mobile?7.5:10),pz=-depth*depth*(mobile?28:43);
     var angle=-d*(mobile?14:19);
     var scale=1-depth*(mobile?.035:.038);
     var opacity=Math.max(0,Math.min(1,1-.09*depth-.083*depth*depth));
     card.style.transform="translate3d(calc(-50% + "+px.toFixed(2)+"px),"+py.toFixed(2)+"px,"+pz.toFixed(2)+"px) rotateY("+angle.toFixed(2)+"deg) scale("+scale.toFixed(3)+")";
     card.style.opacity=opacity.toFixed(3);
     card.style.zIndex=String(100-Math.round(depth*20));
     var invisible=opacity<.025||(mobile&&depth>2.1);
     card.style.visibility=invisible?"hidden":"visible";
     card.tabIndex=invisible?-1:0;
     card.setAttribute("aria-hidden",String(invisible));
     card.dataset.selected=String(depth<.5);
   });
   updateReadout();
 }
 /* Filter, keyboard and pagination gently rotate to the chosen case,
    picking the shortest route around the six-card loop. */
 function select(i,manual){
   var index=((i%n)+n)%n;
   var delta=((index-phase+n*1.5)%n+n)%n-n/2;
   targetPhase=phase+delta;
   if(manual)lastActivity=Date.now();
   if(reduced){
     phase=targetPhase;
     targetPhase=null;
   }
   positions();
 }
 /* Native click remains available for keyboard and assistive-technology use.
    Real pointer taps are handled on pointerup, locking the case chosen at
    pointerdown even while the carousel moves underneath. */
 cards.forEach(function(card,i){
   /* Desktop browsers can retarget click/pointerup when a continuously moving
      3D card changes position between pressing and releasing. Open the selected
      case on the first *pointerdown* instead. This cannot be lost to a moving
      hitbox, browser image-drag behavior, or click retargeting.
      Touch/pen still use pointerup so swiping never opens an unwanted dialog. */
   card.addEventListener("pointerdown",function(e){
     if(e.pointerType!=="mouse"||e.button!==0||modal.open)return;
     blockedClickUntil=Date.now()+750;
     gestureStart=null;
     pressing=false;
     dragging=false;
     e.preventDefault();
     e.stopPropagation();
     openModal(i);
   });
   /* Keyboard activation (detail === 0) and fallback for older browsers. */
   card.addEventListener("click",function(e){
     if(Date.now()<blockedClickUntil&&e.detail!==0)return;
     if(!modal.open)openModal(i);
   });
   /* A hovering mouse freezes the card so its image doesn't flee the pointer
      before the initial press. Automatic movement returns after pointer leave. */
   card.addEventListener("pointerenter",function(e){
     if(e.pointerType==="mouse")hovering=true;
   });
   card.addEventListener("pointerleave",function(e){
     if(e.pointerType==="mouse")hovering=false;
   });
 });
 document.getElementById("case-details-btn").addEventListener("click",function(){openModal(selected)});
 function openModal(i){
   var c=cases[i];select(i,true);phase=targetPhase===null?phase:targetPhase;targetPhase=null;positions();hideMenu();
   document.getElementById("dialog-tag").textContent=String(i+1).padStart(2,"0")+" / "+c.tag;
   document.getElementById("dialog-title").textContent=c.name;
   document.getElementById("dialog-sub").textContent=c.short;
   document.getElementById("dialog-scenario").textContent=c.scenario;
   document.getElementById("dialog-question").textContent=c.question;
   if(!modal.open)modal.showModal();
   document.getElementById("dialog-close").focus();
 }
 function closeModal(){if(modal.open)modal.close()}
 document.getElementById("dialog-close").addEventListener("click",closeModal);
 modal.addEventListener("click",function(e){
   if(e.target!==modal)return;
   var r=modal.getBoundingClientRect();
   if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeModal();
 });
 modal.addEventListener("close",function(){
   /* A closed dialog must not inherit the five-second manual-navigation hold.
      Native dialog focus restoration may leave the source card focused, too. */
   focusInside=false;
   hovering=false;
   pressing=false;
   dragging=false;
   gestureStart=null;
   lastActivity=Date.now()-6000;
 });
 function hideMenu(){menu.hidden=true;filter.setAttribute("aria-expanded","false")}
 filter.addEventListener("click",function(e){e.stopPropagation();menu.hidden=!menu.hidden;filter.setAttribute("aria-expanded",String(!menu.hidden))});
 document.addEventListener("pointerdown",function(e){if(!menu.hidden&&!menu.contains(e.target)&&e.target!==filter)hideMenu()});
 root.addEventListener("keydown",function(e){
   if(modal.open)return;
   if(e.key==="Escape")hideMenu();
   if(e.key==="ArrowRight"||e.key==="ArrowLeft"){
     e.preventDefault();select(selected+(e.key==="ArrowRight"?1:-1),true);
   }
 });
 /* Mouse/touch drag moves the row throughout the gesture, then snaps to a
    scenario. Vertical touch scrolling is left to the browser. */
 var gallery=document.getElementById("gallery"), gestureStart=null,blockedClickUntil=0,wheelLast=0;
 gallery.addEventListener("pointerdown",function(e){
   if(e.button!==undefined&&e.button!==0)return;
   var tile=e.target.closest?e.target.closest(".case-tile"):null;
   /* Mouse card presses open directly in the card listener above, rather
      than starting a gesture. Dragging from the empty stage remains available. */
   if(e.pointerType==="mouse"&&tile)return;
   if(!tile&&e.target!==rail&&e.target!==gallery)return;
   /* Freeze for the duration of a press, so the intended target cannot slip
      out from under the pointer before the browser finishes dispatching click. */
   gestureStart={
     id:e.pointerId,x:e.clientX,y:e.clientY,phase:phase,
     type:e.pointerType||"mouse",
     index:tile?Number(tile.dataset.case):null,
     capture:tile||null
   };
   /* Capturing on the card keeps pointerup routed to the original card even
      when its 3D transform or another card's stacking order changes. */
   if(tile&&typeof tile.setPointerCapture==="function"){
     try{tile.setPointerCapture(e.pointerId)}catch(_){}
   }
   pressing=true;
   dragging=false;
 });
 window.addEventListener("pointermove",function(e){
   if(!gestureStart||gestureStart.id!==e.pointerId)return;
   var dx=e.clientX-gestureStart.x,dy=e.clientY-gestureStart.y;
   var dragThreshold=gestureStart.type==="touch"?30:25;
   if(!dragging&&Math.abs(dx)>dragThreshold&&Math.abs(dx)>Math.abs(dy)*1.25){
     dragging=true;
     targetPhase=null;
   }
   if(dragging){
     var width=window.innerWidth<740?175:245;
     phase=gestureStart.phase-dx/width;
     positions();
     if(e.cancelable)e.preventDefault();
   }
 },{passive:false});
 window.addEventListener("pointerup",function(e){
   if(!gestureStart||gestureStart.id!==e.pointerId)return;
   var press=gestureStart;
   var dx=e.clientX-press.x,dy=e.clientY-press.y;
   var wasDragging=dragging;
   gestureStart=null;
   dragging=false;
   pressing=false;
   if(press.capture&&typeof press.capture.releasePointerCapture==="function"){
     try{
       if(typeof press.capture.hasPointerCapture!=="function"||press.capture.hasPointerCapture(e.pointerId)){
         press.capture.releasePointerCapture(e.pointerId);
       }
     }catch(_){}
   }
   if(wasDragging){
     var suggested=Math.round(phase);
     if(Math.abs(dx)>43&&suggested===Math.round(press.phase))
       suggested=Math.round(press.phase)+(dx<0?1:-1);
     targetPhase=suggested;
     blockedClickUntil=Date.now()+350;
     lastActivity=Date.now();
   }else if(press.index!==null&&Math.abs(dx)<26&&Math.abs(dy)<26){
     /* One deliberate press = one detail panel, even when elements overlap. */
     blockedClickUntil=Date.now()+350;
     openModal(press.index);
   }else if(press.index!==null){
     /* Do not accidentally open a panel after a vertical touch scroll. */
     blockedClickUntil=Date.now()+350;
   }
 });
 window.addEventListener("pointercancel",function(e){
   if(gestureStart&&e.pointerId===gestureStart.id){
     gestureStart=null;
     pressing=false;
     if(dragging){
       dragging=false;
       targetPhase=Math.round(phase);
       lastActivity=Date.now();
     }
   }
 });
 gallery.addEventListener("wheel",function(e){
   if(Math.abs(e.deltaX)<14||Math.abs(e.deltaX)<=Math.abs(e.deltaY))return;
   if(Date.now()-wheelLast<420)return;
   wheelLast=Date.now();
   e.preventDefault();
   select(selected+(e.deltaX>0?1:-1),true);
 },{passive:false});
 /* Keyboard users can hold the selected case still while navigating. A
    pointer-based selection does not permanently stop autoplay. */
 root.addEventListener("focusin",function(e){
   focusInside=!!(e.target.matches&&e.target.matches(":focus-visible"));
 });
 root.addEventListener("focusout",function(){
   window.requestAnimationFrame(function(){
     focusInside=!!(root.contains(document.activeElement)&&document.activeElement.matches(":focus-visible"));
   });
 });
 /* Only the individual photographic card—not the full-screen gallery—
      pauses on hover. Other parts of the scene continue cycling. */
 var motionButtonLabel=document.getElementById("pause-label");
 function updatePause(){
   pause.setAttribute("aria-pressed",String(pauseAuto));
   motionButtonLabel.textContent=reduced?"MOTION REDUCED":pauseAuto?"▶":"Ⅱ";
   pause.setAttribute("aria-label",pauseAuto?"Resume rotating carousel":"Pause rotating carousel");
   root.classList.toggle("motion-paused",pauseAuto);
 }
 if(reduced){pauseAuto=true;pause.disabled=true}
 pause.addEventListener("click",function(){
   if(reduced)return;
   pauseAuto=!pauseAuto;
   lastActivity=Date.now()-6000; // resume immediately after user presses Play
   updatePause();
 });
 updatePause();
 if("IntersectionObserver" in window)new IntersectionObserver(function(entries){
   canSee=entries[0].isIntersecting;
   if(!canSee&&audioActive)stopSound();
 },{threshold:.12}).observe(root);

 /* About one card every six seconds, with continuous sub-pixel movement.
    Pause when offscreen, hidden, in a dialog, dragging, or when the visitor
    requests reduced motion. After manual navigation allow time to read. */
 function animate(now){
   if(!lastFrame)lastFrame=now;
   var dt=Math.max(0,Math.min(64,now-lastFrame));
   lastFrame=now;
   var before=phase;
   if(targetPhase!==null){
     var alpha=1-Math.exp(-dt*.0105);
     phase+=(targetPhase-phase)*alpha;
     if(Math.abs(targetPhase-phase)<.003){
       phase=targetPhase;
       targetPhase=null;
     }
   } else if(!reduced&&!pauseAuto&&!pressing&&!dragging&&!hovering&&!modal.open&&!document.hidden&&canSee&&Date.now()-lastActivity>5000){
     phase+=dt*.000185;
   }
   if(phase!==before)positions();
   window.requestAnimationFrame(animate);
 }
 window.requestAnimationFrame(animate);
 /* Voluntarily started original synthesized atmospheric chord sequence.
    Never auto-plays and does not download/store audio or contact third parties. */
 var audioContext=null,master=null,timer=null,audioActive=false,beat=0;
 var chords=[
  [146.83,174.61,220.00,293.66],
  [130.81,164.81,196.00,261.63],
  [174.61,220.00,261.63,349.23],
  [164.81,196.00,246.94,329.63]
 ];
 function note(freq,start,length,volume,type){
   var osc=audioContext.createOscillator(),gain=audioContext.createGain();
   osc.type=type||"sine";osc.frequency.setValueAtTime(freq,start);
   gain.gain.setValueAtTime(.0001,start);
   gain.gain.linearRampToValueAtTime(volume,start+Math.min(.24,length*.25));
   gain.gain.setTargetAtTime(.0001,start+length*.65,.22);
   osc.connect(gain);gain.connect(master);osc.start(start);osc.stop(start+length+.5);
 }
 function playBar(){
   if(!audioActive||!audioContext||audioContext.state!=="running")return;
   var now=audioContext.currentTime+.07,chord=chords[beat%chords.length];
   for(var i=0;i<chord.length;i++)note(chord[i],now,4.1,.026);
   for(var j=0;j<4;j++)note(chord[(j*3+beat)%4]*2,now+.3+j*.87,.47,.013,"triangle");
   beat++;
 }
 function soundText(){music.setAttribute("aria-pressed",String(audioActive));music.setAttribute("aria-label",audioActive?"Sound on. Click to mute":"Sound off. Click to play ambient music");document.getElementById("music-label").textContent=audioActive?"♪":"♪̸"}
 async function startSound(){
   try{
     var Audio=window.AudioContext||window.webkitAudioContext;
     if(!Audio){music.title="Audio is not supported by this browser";return}
     if(!audioContext||audioContext.state==="closed"){audioContext=new Audio();master=audioContext.createGain();master.gain.value=0;master.connect(audioContext.destination)}
     await audioContext.resume();master.gain.setTargetAtTime(.92,audioContext.currentTime,.3);
     audioActive=true;soundText();playBar();timer=window.setInterval(playBar,3950);
   }catch(e){audioActive=false;soundText();music.title="Browser could not start sound"}
 }
 function stopSound(){
   if(timer!==null){clearInterval(timer);timer=null}
   if(master&&audioContext){master.gain.cancelScheduledValues(audioContext.currentTime);master.gain.setTargetAtTime(.0001,audioContext.currentTime,.10)}
   audioActive=false;soundText()
 }
 music.addEventListener("click",function(){if(audioActive)stopSound();else startSound()});
 document.addEventListener("visibilitychange",function(){
   if(!audioActive||!audioContext)return;
   if(document.hidden)audioContext.suspend().catch(function(){});
   else audioContext.resume().catch(function(){});
 });
 window.addEventListener("pagehide",stopSound);
 soundText();
 window.addEventListener("resize",positions,{passive:true});
 positions();
})();
