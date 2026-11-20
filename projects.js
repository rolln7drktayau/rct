// Each small diagram explains one operation using illustrative inputs.
const projectNotes = [
 {name:'ax7L', field:['Executable representations · Selective access','Représentations exécutables · Accès sélectif'],
 text:['Which information is worth keeping close to the computation? One ax7L experiment compares compact codes for different query patterns. In this illustration the short path answers a familiar query; the longer path retrieves an exact answer from storage. The research measures a modelled cost on synthetic traces.','Quelles informations garder près du calcul ? Une expérience d’ax7L compare des codes compacts pour différents motifs de requêtes. Ici, le chemin court répond à une requête familière ; le chemin long récupère une réponse exacte en mémoire. La recherche mesure un coût modélisé sur des traces synthétiques.'],
 steps:[['Query the hot code','Read the cold store','Return the exact value'],['Interroger le code en cache','Lire la mémoire de repli','Renvoyer la valeur exacte']],
 draw(g,t){
  const path=t<1/3?[[20,60],[86,60],[139,33],[244,60]]:[[20,60],[86,60],[139,91],[201,91],[244,60]];
  g.line([[20,60],[86,60],[139,33],[244,60]]);g.line([[86,60],[139,91],[201,91],[244,60]]);
  g.label(tr('hot code','cache'),99,23);g.label(tr('exact store','mémoire exacte'),103,111);
  g.travel(path,t<1/3?t*3:(t-1/3)*1.5);
 }},
 {name:'ENACT',field:['Neuro-symbolic reasoning · CPU','Raisonnement neuro-symbolique · CPU'],
 text:['ENACT studies how a CPU-based agent can turn a sentence into an inspectable graph of roles. One experimental policy runs two decoders: when their readings disagree, it abstains. Follow the two readings of the same input as they converge on a decision.','ENACT étudie comment un agent sur CPU peut transformer une phrase en un graphe de rôles inspectable. Une politique expérimentale compare deux décodages : en cas de désaccord, elle s’abstient. Suivez les deux lectures d’une même entrée jusqu’à la décision.'],
 steps:[['One sentence','Two candidate readings','Disagreement → abstain'],['Une phrase','Deux lectures candidates','Désaccord → abstention']],
 draw(g,t){
  const upper=[[18,58],[64,58],[108,31],[165,31],[211,58],[253,58]];
  const lower=[[18,58],[64,58],[108,85],[165,85],[211,58],[253,58]];
  g.line(upper);g.line(lower);g.label('A → B',104,23);g.label('B → A',104,107);
  g.travel(upper,t);g.travel(lower,t);g.label('?',243,45);
 }},
 {name:'AIDGE Hardware Lab',field:['Embedded vision · ASYGN','Vision embarquée · ASYGN'],url:'AIDGE',
 text:['The hardware lab follows a synthetic camera feed through tracking and counting. Watch the centre of the box: a track increments the counter once when it crosses the line. Hardware measurements are a separate stage of the project.','Le banc d’essai suit une scène synthétique, de la caméra au comptage. Observez le centre du cadre : le passage de la ligne incrémente une fois le compteur pour cette trajectoire. Les mesures sur carte constituent une autre étape du projet.'],
 steps:[['Acquire a track','Approach the line','Crossing counted'],['Acquisition de la cible','Approche de la ligne','Franchissement compté']],
 draw(g,t){const x=32+207*t;g.line([[170,15],[170,104]]);g.rect(x-13,39,26,41);g.dot(x,56,4);g.label('Σ '+Number(x>=170),210,24);}},
 {name:'AlgoArena',field:['Optimisation · Edge / Fog / Cloud','Optimisation · Edge / Fog / Cloud'],
 text:['Built by AST and RCT, this studio compares scheduling and optimisation methods. In this miniature, a candidate is discarded when another uses less time and less energy. The remaining points show why several answers can be worth keeping.','Développé par AST et RCT, ce studio compare des méthodes d’optimisation et d’ordonnancement. Ici, une solution est écartée si une autre prend moins de temps et consomme moins d’énergie. Plusieurs compromis peuvent ainsi subsister.'],
 steps:[['Compare candidates','Mark dominated points','Keep the Pareto front'],['Comparer les solutions','Repérer les points dominés','Garder le front de Pareto']],
 draw(g,t,s){g.line([[32,13],[32,94],[253,94]]);g.label('E',12,22);g.label('t',254,100);const front=[[64,29],[110,55],[189,78]];g.travel(front,t);
  const keep=Math.max(0,1-t*1.5);
  front.forEach(([x,y])=>g.dot(x,y,5));
  [[150,30],[214,48]].forEach(([x,y])=>{if(keep>0)g.dot(x,y,5*keep)});
  const segment=t*2,k=Math.min(1,Math.floor(segment)),f=segment-k;
  g.line([...front.slice(0,k+1),front[k].map((n,j)=>n+(front[k+1][j]-n)*f)]);
 }},
 {name:'AXON-1 / ATTN-11',field:['Native attention · Memory','Attention native · Mémoire'],
 text:['The current experiments test whether a native attention network can compose two memory lookups. Start at address A, read B, then use B as the next address. Success on one lookup alone leaves the second step untested.','Les expériences actuelles testent la capacité d’un réseau d’attention natif à enchaîner deux lectures mémoire. Partez de l’adresse A, lisez B, puis utilisez B comme adresse suivante. Réussir une seule lecture laisse cette seconde étape à vérifier.'],
 steps:[['Query address A','Read B, query B','Read the final value'],['Interroger A','Lire B, interroger B','Lire la valeur finale']],
 draw(g,t,s){['A','B','7'].forEach((v,i)=>{const x=32+i*93;g.rect(x,37,36,36);g.label(v,x+12,61);if(i<2)g.line([[x+36,55],[x+87,55],[x+82,50]]);});g.travel([[50,88],[143,88],[236,88]],t)}}
];
function paintProject(canvas,note,t){
 const ctx=canvas.getContext('2d'),style=getComputedStyle(canvas);
 const color=k=>style.getPropertyValue('--'+k).trim();
 ctx.setTransform(2,0,0,2,0,0);ctx.clearRect(0,0,280,116);ctx.lineWidth=1.5;ctx.font='16px monospace';
 const g={
 travel(points,t){
  const lengths=points.slice(1).map(([x,y],i)=>Math.hypot(x-points[i][0],y-points[i][1]));
  let distance=t*lengths.reduce((sum,x)=>sum+x,0);
  for(let i=0;i<lengths.length;i++){
   if(distance<=lengths[i]||i===lengths.length-1){
    const f=distance/lengths[i];this.dot(...points[i].map((v,j)=>v+(points[i+1][j]-v)*f),5);break;
   }
   distance-=lengths[i];
  }
 },
 line(points){ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.strokeStyle=color('trace');ctx.stroke()},
 dot(x,y,r){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=color('accent');ctx.fill()},
 rect(x,y,w,h){ctx.strokeStyle=color('trace');ctx.strokeRect(x,y,w,h)},
 label(v,x,y){ctx.fillStyle=color('ink');ctx.fillText(v,x,y)}
 };
 const stage=Math.min(2,Math.floor(t*3));
 note.draw(g,t,stage);
 // Dissolve the completed diagram into its starting pose at the loop boundary.
 if(t>0.92){
  const f=(t-0.92)/0.08;
  ctx.save();ctx.globalAlpha=f*f*(3-2*f);ctx.fillStyle=color('plate');
  ctx.fillRect(0,0,280,116);note.draw(g,0,0);ctx.restore();
 }
 return note.steps[fr?1:0][stage];
}
// A clock belongs to its control: other figures can play concurrently.
function animationClock(period,paint){
 let elapsed=0,last=null,frame=null,running=false;
 function tick(now){
  if(last!==null)elapsed=(elapsed+now-last)%period;
  last=now;paint(elapsed/period);frame=requestAnimationFrame(tick);
 }
 function suspend(){cancelAnimationFrame(frame);frame=null;last=null}
 function start(){if(!document.hidden&&frame===null)frame=requestAnimationFrame(tick)}
 document.addEventListener('visibilitychange',()=>{if(document.hidden)suspend();else if(running)start()});
 return {get playing(){return running},get phase(){return elapsed/period},
 toggle(){running=!running;if(running)start();else suspend()},
 reset(){running=false;suspend();elapsed=0}};
}
const projectClocks=projectNotes.map((_,i)=>animationClock(5800,()=>updateProject(i)));
function renderProjects(){
 const container=$('projects');container.replaceChildren();
 projectNotes.forEach((note,i)=>{
  const row=document.createElement('article');row.className='project-note';
  row.innerHTML='<div><span class="kind"></span><h3></h3><p></p></div><figure><canvas width="560" height="232" role="img"></canvas><figcaption><span></span><button type="button"></button></figcaption></figure>';
  row.querySelector('.kind').textContent=note.field[fr?1:0];row.querySelector('h3').textContent=note.name;row.querySelector('p').textContent=note.text[fr?1:0];
  if(note.url){const a=document.createElement('a');a.href=repo+note.url;a.textContent=tr('Source repository ↗','Dépôt du projet ↗');row.firstElementChild.append(a)}
  const btn=row.querySelector('button');btn.onclick=()=>{
   projectClocks[i].toggle();updateProject(i);
  };
  container.append(row);updateProject(i);
 });
}
function updateProject(i){
 const row=$('projects').children[i],active=projectClocks[i].playing,canvas=row.querySelector('canvas'),btn=row.querySelector('button');
 const caption=paintProject(canvas,projectNotes[i],projectClocks[i].phase);
 if(row.querySelector('figcaption span').textContent===caption && btn.getAttribute('aria-pressed')===String(active))return;
 row.querySelector('figcaption span').textContent=caption;canvas.setAttribute('aria-label',projectNotes[i].name+' · '+caption);
 btn.textContent=active?tr('Ⅱ Pause','Ⅱ Pause'):tr('▷ Loop','▷ Boucle');
 btn.setAttribute('aria-label',btn.textContent+' · '+projectNotes[i].name);btn.setAttribute('aria-pressed',active);
}
