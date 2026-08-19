if(!document.querySelector('link[href="site-updates.css"]')){const s=document.createElement('link');s.rel='stylesheet';s.href='site-updates.css';document.head.appendChild(s)}
if(!document.querySelector('link[href="service-tune.css"]')){const s=document.createElement('link');s.rel='stylesheet';s.href='service-tune.css';document.head.appendChild(s)}
if(!document.querySelector('link[href="team-tune.css"]')){const s=document.createElement('link');s.rel='stylesheet';s.href='team-tune.css';document.head.appendChild(s)}
if(!document.querySelector('link[href="alumni-tune.css"]')){const s=document.createElement('link');s.rel='stylesheet';s.href='alumni-tune.css';document.head.appendChild(s)}
document.querySelectorAll('.w-header nav a[href="people.html"]').forEach(a=>a.textContent='Team');
document.querySelectorAll('.w-header nav a[href="showcase.html"]').forEach(link=>{const separator=link.nextElementSibling?.tagName==='I'?link.nextElementSibling:link.previousElementSibling?.tagName==='I'?link.previousElementSibling:null;separator?.remove();link.remove()});
if(/\/showcase\.html$/i.test(location.pathname)){const intro=document.querySelector('.list-head p');if(intro)intro.textContent=intro.textContent.replace('developed by','designed by')}
if(/\/people\.html$/i.test(location.pathname)){const joinText=document.querySelector('.join-highlight strong');if(joinText&&!joinText.closest('a')){const link=document.createElement('a');link.href='join.html';link.className='join-group-link';joinText.replaceWith(link);link.appendChild(joinText)}}
if(/\/publications\.html$/i.test(location.pathname)){const papers2026=document.querySelector('.year-group div');if(papers2026&&!papers2026.textContent.includes('Tactile Voice Timbre:')){const paper=document.createElement('article');paper.className='paper';paper.innerHTML='<h3>Tactile Voice Timbre: Haptic Speaker Signatures for Captioned Multi-Speaker Video</h3><p>HyeonBeom Yi, Han Shi, Seungwoo Je, Chang Hee Lee, Myung Jin Kim, Chi Yoon Jeong, Sungyong Shin</p><b>In Proceedings of UIST 2026 Posters.</b>';papers2026.prepend(paper)}}
if(/\/publications\.html$/i.test(location.pathname)){document.querySelectorAll('.paper').forEach(p=>{const title=p.querySelector('h3')?.textContent||'';const venue=p.querySelector('b');if(title.includes('The Effect of Building Typology')&&venue&&!venue.textContent.trim().endsWith('.'))venue.append('.');if(title.includes('Beyond Words')&&venue&&!venue.textContent.includes('Honorable Mention Award'))venue.append(' Honorable Mention Award')});const awardWalker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const awardNodes=[];while(awardWalker.nextNode())awardNodes.push(awardWalker.currentNode);awardNodes.forEach(n=>{if(/award(?!\s*🏆)/i.test(n.nodeValue))n.nodeValue=n.nodeValue.replace(/award(?!\s*🏆)/gi,m=>`${m} 🏆`)})}
const header=document.querySelector('.w-header');
if(header){
  const nav=header.querySelector('nav');
  const currentPage=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  nav.querySelectorAll('a').forEach(link=>{
    const target=(link.getAttribute('href')||'').split('#')[0].toLowerCase();
    if(target===currentPage){link.classList.add('is-active');link.setAttribute('aria-current','page')}
  });
  const button=document.createElement('button');
  button.className='mobile-menu-button';button.type='button';button.setAttribute('aria-label','Open menu');button.setAttribute('aria-expanded','false');button.innerHTML='<span></span><span></span><span></span>';
  header.insertBefore(button,nav);
  button.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');button.classList.toggle('is-open',open);button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Close menu':'Open menu')});
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('is-open');button.classList.remove('is-open');button.setAttribute('aria-expanded','false')}));
  const updateHeader=()=>header.classList.toggle('is-scrolled',window.scrollY>40);updateHeader();window.addEventListener('scroll',updateHeader,{passive:true});
}
