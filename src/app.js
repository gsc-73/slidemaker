
(function(){
var $=function(s){return document.querySelector(s)},stage=$('#stage'),last=null,deck=[],cur=0;
function mk(){return '<div class="slide" data-lay="list" data-hdr="glow" data-ost="plain" data-stim="0">'
+'<div class="hdr"><div class="logo"><span class="cube"></span><div class="lt"><b>MAZHAR’S</b><i>EDUVERSE</i></div></div><div class="htitle" contenteditable="true">পদার্থবিজ্ঞান ১ম পত্র</div></div>'
+'<div class="stim"><div class="sh"><span class="chk">✔</span><span contenteditable="true">উদ্দীপকের আলোকে ৩নং এবং ৪নং প্রশ্নের উত্তর দাও :</span></div><div class="sb" contenteditable="true">পৌর মোড় এবং স্টেশন মোড়ে যথাক্রমে 16m এবং 25m ব্যাসার্ধের বাঁকের রাস্তার প্রত্যেকটির ব্যাংকিং কোণ 3° এবং উভয় রাস্তার প্রস্থ 4m ।</div></div>'
+'<div class="qrow"><div class="num" contenteditable="true">MCQ 01.</div><div class="q" contenteditable="true">নিচের কোনটি ভরবেগের ভ্রামক?</div></div>'
+'<div class="opts">'+['জড়তার ভ্রামক','দ্বন্দ্বের ভ্রামক','ভর ভ্রামক','কৌণিক ভরবেগ'].map(function(t,i){return '<div class="opt"><span class="lab">'+'ABCD'[i]+'</span><div class="txt" contenteditable="true">'+t+'</div></div>'}).join('')+'</div>'
+'<div class="ans" contenteditable="true">উত্তর এখানে লিখো…</div></div>'}
function S(){return stage.firstElementChild}
function sv(k,v){S().style.setProperty(k,v)}
function save(){deck[cur]=stage.innerHTML}
function sync(){var d=S().dataset;$('#lay').value=d.lay;$('#hdr').value=d.hdr;$('#ost').value=d.ost;$('#stim').checked=d.stim==='1';$('#cnt').textContent=(cur+1)+' / '+deck.length;last=null}
function show(i){cur=i;stage.innerHTML=deck[i];sync()}
deck[0]=mk();show(0);

[['bg','--bg'],['text','--text'],['lab','--lab'],['numc','--numc'],['glow','--glow'],['box','--box']].forEach(function(p){
 $('#c-'+p[0]).addEventListener('input',function(e){sv(p[1],e.target.value)})});
$('#shape').onchange=function(e){sv('--radius',e.target.value)};
$('#lshape').onchange=function(e){sv('--lrad',e.target.value)};
$('#lw').onchange=function(e){var a=e.target.value.split('|');sv('--lw',a[0]);sv('--lfam',a[1])};
[['lay','lay'],['hdr','hdr'],['ost','ost']].forEach(function(p){$('#'+p[0]).onchange=function(e){S().dataset[p[1]]=e.target.value}});
$('#stim').onchange=function(e){S().dataset.stim=e.target.checked?'1':'0'};

var T={m:{bg:'#000000',text:'#ffffff',lab:'#ffee00',numc:'#ffe600',glow:'#ffffff'},
 u:{bg:'#0a1522',text:'#ffffff',lab:'#ffc400',numc:'#ffc400',glow:'#1c8fc0'},
 n:{bg:'#0b0614',text:'#ffffff',lab:'#ffc400',numc:'#ffc400',glow:'#a855f7'}};
document.querySelectorAll('[data-t]').forEach(function(b){b.onclick=function(){
 var t=T[b.dataset.t];for(var k in t){sv('--'+k,t[k]);$('#c-'+k).value=t[k]}
 S().dataset.hdr=b.dataset.t==='m'?'glow':b.dataset.t==='u'?'tech':'neon';sync()}});

stage.addEventListener('focusin',function(e){if(e.target.isContentEditable)last=e.target});
stage.addEventListener('paste',function(e){if(e.target.isContentEditable){e.preventDefault();document.execCommand('insertText',false,(e.clipboardData||window.clipboardData).getData('text/plain'))}});
stage.addEventListener('click',function(){if(document.fullscreenElement){go(1)}});

var syms=['°','²','³','⁻¹','π','√','∑','∫','∞','±','×','÷','≤','≥','≠','≈','α','β','θ','λ','μ','Ω','Δ','→','∧','∨','¬','⊕','⇒','∴','₀','₁','₂'];
syms.forEach(function(s){var b=document.createElement('button');b.textContent=s;
 b.addEventListener('mousedown',function(e){e.preventDefault()});
 b.onclick=function(){if(!last)last=S().querySelector('.txt');last.focus();document.execCommand('insertText',false,s)};$('#sym').appendChild(b)});

$('#imgbtn').onclick=function(){$('#file').click()};
$('#file').onchange=function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();
 r.onload=function(){var t=last&&last.classList.contains('txt')?last:S().querySelector('.txt');var im=document.createElement('img');im.src=r.result;t.appendChild(im)};
 r.readAsDataURL(f);e.target.value=''};
$('#logobtn').onclick=function(){$('#logofile').click()};
$('#logofile').onchange=function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();
 r.onload=function(){S().querySelector('.logo').innerHTML='<img src="'+r.result+'" alt="logo">'};r.readAsDataURL(f);e.target.value=''};

function go(n){save();var i=cur+n;if(i>=0&&i<deck.length)show(i)}
$('#prev').onclick=function(){go(-1)};$('#next').onclick=function(){go(1)};
$('#add').onclick=function(){save();var d=document.createElement('div');d.innerHTML=deck[cur];
 var n=d.querySelector('.num');n.textContent=n.textContent.replace(/\d+/,function(m){var v=String(+m+1);return v.length<m.length?('0'.repeat(m.length-v.length)+v):v});
 deck.splice(cur+1,0,d.innerHTML);show(cur+1)};
$('#del').onclick=function(){if(deck.length<2)return;deck.splice(cur,1);show(Math.min(cur,deck.length-1))};
$('#present').onclick=function(){save();try{(stage.requestFullscreen||stage.webkitRequestFullscreen).call(stage)}catch(e){}};
document.addEventListener('keydown',function(e){if(!document.fullscreenElement)return;if(e.key==='ArrowRight'||e.key===' ')go(1);if(e.key==='ArrowLeft')go(-1)});

var fileP=null,rng=null,eqEl=null;
function title(){document.title=(fileP?fileP.split(/[\\/]/).pop():'Untitled')+' – MCQ Slide Maker'}
async function saveDeck(as){save();var r=await window.api.save({data:JSON.stringify({v:1,slides:deck}),file:fileP,saveAs:!!as});if(r){fileP=r;title()}}
async function openDeck(){var r=await window.api.open();if(!r)return;try{var d=JSON.parse(r.data);if(!d.slides||!d.slides.length)throw 0;deck=d.slides;fileP=r.file;show(0);title()}catch(e){alert('This file could not be opened.')}}
$('#save').onclick=function(){saveDeck(false)};$('#saveas').onclick=function(){saveDeck(true)};$('#open').onclick=openDeck;
document.addEventListener('keydown',function(e){if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'){e.preventDefault();saveDeck(e.shiftKey)}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='o'){e.preventDefault();openDeck()}});
title();

document.addEventListener('selectionchange',function(){var s=getSelection();if(s.rangeCount&&s.anchorNode&&stage.contains(s.anchorNode)){var el=s.anchorNode.nodeType===1?s.anchorNode:s.anchorNode.parentElement;if(el&&el.closest('[contenteditable=true]'))rng=s.getRangeAt(0).cloneRange()}});
var ta=$('#tex'),pv=$('#prev-eq');
ta.oninput=function(){try{pv.innerHTML=katex.renderToString(ta.value,{throwOnError:false})}catch(e){pv.textContent=''}};
['\\frac{a}{b}','\\sqrt{x}','\\vec{P}','x^{2}','x_{0}','\\sin\\theta','\\cos\\theta','\\tan\\theta','\\int_{a}^{b}','\\sum','\\pi','\\infty','\\pm','^{\\circ}','\\ln\\frac{I_0}{I}','\\left(\\frac{R+h}{gR}\\right)^{3/2}','\\mathrm{L\\,mol^{-1}\\,cm^{-1}}'].forEach(function(s){var b=document.createElement('button');b.textContent=s.length>14?s.slice(0,12)+'…':s;b.title=s;
 b.onmousedown=function(e){e.preventDefault()};b.onclick=function(){ta.focus();ta.setRangeText(s,ta.selectionStart,ta.selectionEnd,'end');ta.oninput()};$('#snip').appendChild(b)});
$('#eqins').onclick=function(){var tex=ta.value.trim();if(!tex)return;var sp=document.createElement('span');sp.className='eq';sp.contentEditable='false';sp.dataset.tex=tex;sp.innerHTML=katex.renderToString(tex,{throwOnError:false});
 if(eqEl){eqEl.replaceWith(sp);eqEl=null}else if(rng){rng.deleteContents();rng.insertNode(sp);rng.setStartAfter(sp);rng.collapse(true)}else{S().querySelector('.txt').appendChild(sp)}
 ta.value='';pv.innerHTML='';$('#eqins').textContent='Insert equation'};
stage.addEventListener('click',function(e){var q=e.target.closest&&e.target.closest('.eq');if(q&&!document.fullscreenElement){eqEl=q;ta.value=q.dataset.tex;ta.oninput();$('#eqins').textContent='Update equation'}});
})();