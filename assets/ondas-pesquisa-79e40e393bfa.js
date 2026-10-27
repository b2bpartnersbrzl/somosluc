// Em telas baixas, a lista usa o espaço acima da busca quando não cabe abaixo.
window.addEventListener('DOMContentLoaded', () => {
 const publishedPositionResults=window.positionResults;
 if (typeof publishedPositionResults === 'function') {
  window.positionResults=function(){
    publishedPositionResults();
    const list=document.getElementById('results');
    if(list.hidden)return;
    const anchor=document.getElementById('search-area').getBoundingClientRect();
    const categories=document.getElementById('categories').getBoundingClientRect();
    const viewport=window.visualViewport,top=viewport?.offsetTop||0,height=viewport?.height||innerHeight;
    const footer=document.querySelector('.site-footer').getBoundingClientRect();
    const below=Math.max(anchor.bottom,categories.bottom)+8;
    const belowSpace=Math.max(0,Math.min(top+height,footer.top)-below-12);
    const aboveSpace=Math.max(0,anchor.top-top-16);
    if(belowSpace<140&&aboveSpace>belowSpace){
      list.style.maxHeight=Math.min(320,aboveSpace)+'px';
      list.style.top=Math.max(top+8,anchor.top-8-list.getBoundingClientRect().height)+'px';
    }
  };
 }
});
// A lista da versão publicada usa posição fixa e deve acompanhar a rolagem da prévia.
window.addEventListener('scroll', () => {
  if (typeof positionResults === 'function') positionResults();
}, {passive: true});
