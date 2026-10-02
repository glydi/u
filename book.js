/* Shared runtime for every chapter: math, TOC, progress, quizzes, mastery ticks, theme. */
window.MathJax={tex:{inlineMath:[['$','$'],['\\(','\\)']],displayMath:[['$$','$$'],['\\[','\\]']]},svg:{fontCache:'global'},options:{skipHtmlTags:['script','noscript','style','textarea','pre','code']}};
(function(){
  var s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-svg.min.js';s.async=true;document.head.appendChild(s);
  function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
  window.BOOK={store:store};
  var t=store('ult-theme');if(t)document.documentElement.setAttribute('data-theme',t);
  document.addEventListener('DOMContentLoaded',function(){
    var chap=document.body.getAttribute('data-chapter')||'x';
    /* theme toggle */
    document.querySelectorAll('[data-theme-toggle]').forEach(function(b){b.addEventListener('click',function(){
      var cur=document.documentElement.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
      var nx=cur==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',nx);store('ult-theme',nx);});});
    /* practice mode: hide all solutions */
    var nav=document.querySelector('.topbar nav');
    if(nav&&document.querySelector('section.topic')){
      var pb=document.createElement('button');pb.className='btn';pb.textContent='Practice mode';
      nav.insertBefore(pb,nav.firstChild);
      var on=store('ult-practice')==='1';
      function apply(){document.body.classList.toggle('practice',on);pb.textContent=on?'Show solutions':'Practice mode';}
      apply();
      pb.addEventListener('click',function(){on=!on;store('ult-practice',on?'1':'0');
        if(on)document.querySelectorAll('details.sol[open]').forEach(function(d){d.open=false});
        apply();});
    }
    /* build TOC + mastery ticks */
    var toc=document.querySelector('.toc ol');var topics=document.querySelectorAll('section.topic');
    topics.forEach(function(sec,i){
      var key='ult-m-'+chap+'-'+sec.id;
      var h=sec.querySelector('h2');
      if(h&&!h.querySelector('.tn')){var tn=document.createElement('span');tn.className='tn';tn.textContent=chap+'.'+(i+1);h.prepend(tn);}
      var m=document.createElement('label');m.className='master';
      m.innerHTML='<input type="checkbox" id="m-'+sec.id+'"> I can explain this without notes and solved the drill';
      sec.appendChild(m);var cb=m.querySelector('input');cb.checked=store(key)==='1';
      if(toc){var li=document.createElement('li');var a=document.createElement('a');a.href='#'+sec.id;
        a.innerHTML='<span>'+(h?h.textContent.replace(/^[\d.]+\s*/,''):sec.id)+'</span><span class="ck">'+(cb.checked?'✓':'')+'</span>';li.appendChild(a);toc.appendChild(li);
        cb.addEventListener('change',function(){store(key,cb.checked?'1':'0');store(key+'-t',cb.checked?String(Date.now()):'');a.querySelector('.ck').textContent=cb.checked?'✓':'';});}
    });
    /* scrollspy + progress */
    var bar=document.querySelector('.progressbar');var links=toc?toc.querySelectorAll('a'):[];
    function onScroll(){var d=document.documentElement;if(bar)bar.style.width=(100*d.scrollTop/Math.max(1,d.scrollHeight-d.clientHeight))+'%';
      var cur=-1;topics.forEach(function(s,i){if(s.getBoundingClientRect().top<120)cur=i});links.forEach(function(a,i){a.classList.toggle('on',i===cur)});}
    addEventListener('scroll',onScroll,{passive:true});onScroll();
    /* quizzes: <div class="quiz" data-answer="1"><div class="q">..</div><button class="opt">..</button>...<div class="why" hidden>..</div></div> */
    document.querySelectorAll('.quiz').forEach(function(q){var ans=+q.getAttribute('data-answer');var opts=q.querySelectorAll('.opt');
      opts.forEach(function(o,i){o.type='button';o.addEventListener('click',function(){opts.forEach(function(x,j){x.classList.remove('right','wrong');if(j===ans)x.classList.add('right')});if(i!==ans)o.classList.add('wrong');var w=q.querySelector('.why');if(w)w.hidden=false;});});});
  });
})();

document.addEventListener('keydown',function(e){
 if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.metaKey||e.ctrlKey||e.altKey)return;
 var pg=document.querySelector('.pager');if(!pg)return;
 var as=pg.querySelectorAll('a');
 if(e.key==='ArrowLeft'&&as.length&&/prev/i.test(as[0].textContent+as[0].querySelector('span').textContent))location=as[0].href;
 if(e.key==='ArrowRight'){var n=as[as.length-1];if(/next/i.test(n.querySelector('span').textContent))location=n.href;}
});
/* helper for explorers: crisp canvas sized to its CSS width */
function setupCanvas(c,h){var r=window.devicePixelRatio||1;var w=c.clientWidth||600;c.width=w*r;c.height=h*r;c.style.height=h+'px';var g=c.getContext('2d');g.setTransform(r,0,0,r,0,0);return {g:g,w:w,h:h};}
function cssVar(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim();}
