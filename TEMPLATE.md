# How to write one chapter of "ULTIMATUM"

Output: /home/qb/ultimatum-book/chapters/chNN.html  (NN = zero-padded chapter number).
It is an HTML FRAGMENT-style page for the Claude Artifact system: do NOT write <!doctype>, <html>, <head>, <body> tags. Start the file with:

<title>ULTIMATUM · NN TITLE</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;800&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;600&display=swap">
<link rel="stylesheet" href="../book.css">
<script src="../book.js"></script>

Then (exact structure; body attribute goes on a wrapper div since there is no body tag — instead set it via script):
<script>document.addEventListener('DOMContentLoaded',function(){document.body.setAttribute('data-chapter','NN')});</script>
<header class="topbar"><div class="in">
 <a class="brand" href="../index.html">ULTI<b>MATUM</b></a>
 <nav><a class="btn" href="../index.html">Contents</a><button class="btn" data-theme-toggle>Theme</button></nav>
 <div class="progressbar"></div></div></header>
<div class="wrap">
 <aside class="toc"><div class="label">In this chapter</div><ol></ol></aside>
 <main class="main">
  <div class="chap-head">
   <div class="num">NN</div><h1>TITLE</h1><p class="lede">LEDE</p>
   <div class="meta"><span class="chip">K topics</span><span class="chip">needs: chapters ...</span><span class="chip">feeds: chapters ...</span></div>
  </div>
  ... one <section class="topic" id="slug"> per topic ...
  <section class="topic" id="capstone"> capstone problems </section>
  <section class="topic" id="lab"> coding lab </section>
  <section class="topic" id="sources" class="sources"> sources </section>
  <div class="pager"> prev/next links to chNN.html </div>
 </main>
</div>

The TOC <ol> fills itself from book.js — leave it empty. book.js also auto-numbers each topic h2 and adds a mastery checkbox — do not add those yourself.

## Per topic section (cover EVERY topic in your list, merging only true duplicates into one section with both named)
<section class="topic" id="kebab-slug">
 <h2>Topic name</h2>
 <p>2–5 sentences of intuition: what it IS, in a picture the reader can hold.</p>
 <div class="box def"><span class="label">Definition</span> precise statement, LaTeX math with $...$ / $$...$$.</div>
 (optional) <div class="box thm"><span class="label">Theorem</span>...</div>
 <div class="box ex"><span class="label">Worked example</span> one fully worked, concrete example with numbers.</div>
 (~1 in 3 topics) <div class="box think"><span class="label">Think first</span> a question to attempt before reading on, with <details class="sol"><summary>Reveal</summary><div>...</div></details></div>
 (where a mistake is common) <div class="box pit"><span class="label">Pitfall</span>...</div>
 (where it connects forward) <div class="box link"><span class="label">Where this goes</span> name the later chapter/topic that uses it (e.g. "KL divergence → the loss in Ch 23").</div>
 <div class="drill"><span class="label">Drill</span><ol>
   3–4 exercises. Each: <li><span class="lvl e">EASY</span> question ... <details class="sol"><summary>Solution</summary><div>full worked solution</div></details></li>
   Use lvl classes e/m/h. At least one EASY, one MED, one HARD per topic.
 </ol></div>
 (~1 in 5 topics) a quiz:
 <div class="quiz" data-answer="INDEX"><div class="q">question</div><button class="opt">A</button><button class="opt">B</button><button class="opt">C</button><div class="why" hidden>explanation</div></div>
</section>

## Interactive explorers — REQUIRED: 3 to 6 per chapter
Pick the 3–6 topics in the chapter that benefit most from manipulation, and inside those sections add:
<div class="box explore"><span class="label">Explore</span>
 <p>one line telling the reader what to try.</p>
 <canvas id="cv-uniqueid"></canvas>
 <div class="ctl"> <label>param <input type="range" id="..." min=".." max=".." step=".." value=".."></label> ... </div>
 <div class="out" id="..."></div>
</div>
and at the END of the file one <script> that wires all explorers. Use the global helpers from book.js:
  var c=document.getElementById('cv-x'); function draw(){var s=setupCanvas(c,280); var g=s.g; ... use cssVar('--cobalt') etc for colors ...}
  redraw on 'input' events and on window 'resize'. Guard everything: if(!c) return. Draw axes, use cssVar('--ink-2') for axis text, 13px JetBrains Mono. Everything must be drawn to scale.
Good explorer ideas: drag/slide a parameter and watch a curve, vector, distribution, loss surface, sampler, or algorithm animate (requestAnimationFrame ok; provide a Run/Reset button as <button class="btn">).

## Capstone section
<section class="topic" id="capstone"><h2>Capstone</h2> 3 multi-topic problems (MED/HARD/HARD) each with details.sol full solutions.</section>

## Coding lab
<section class="topic" id="lab"><h2>Coding lab</h2> 2–3 tasks implementing the chapter's core ideas in Python/NumPy (PyTorch where natural). Each: statement, then <details class="sol"><summary>Reference solution</summary><div><pre><code>python code</code></pre></div></details>. Code must be correct and runnable.</section>

## Sources
<section class="topic sources" id="sources"><h2>Sources</h2><ul> 4–8 links to the best FREE canonical sources for this chapter (MIT OCW, Khan Academy, 3Blue1Brown, openstax, Strang, Boyd & Vandenberghe, Wasserman, Cover & Thomas, Sutton & Barto, Goodfellow et al., Kevin Murphy, d2l.ai, distill.pub, arXiv papers, Anthropic/OpenAI/DeepMind papers as appropriate). Real URLs only. One line each on what to read there.</ul></section>

## Writing rules
- Math in LaTeX via MathJax ($ and $$). Never put $ math inside <pre>/<code>.
- Plain, direct sentences. Teach like Feynman: picture first, formality second, example third.
- Everything self-contained: a motivated reader with only the previous chapters should follow.
- Correctness is paramount: every formula, worked example and solution must be right. Double-check arithmetic.
- Escape < and & in code samples (&lt; &amp;).
- File will be large; that is fine. Target roughly 60–140 KB depending on topic count. Do not pad; do not truncate the topic list. EVERY topic listed for the chapter must get its own section (merge only true duplicates like "JEPA" into "Joint Embedding Predictive Architecture", noting the merge in the h2).
- ids: kebab-case of the topic name, unique in file.
- Pager: chapter NN links prev ch(NN-1).html and next ch(NN+1).html (ch01 has only next, ch36 only prev; label with chapter titles from syllabus.json).
