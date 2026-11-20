// Each small diagram explains one operation using illustrative inputs.
const projectNotes = [
 {name:'BioScape 3D', field:['Life sciences · Procedural 3D','Sciences du vivant · 3D procédurale'],
 text:['A local teaching atlas lets students explore cells, neurons and synapses in three dimensions. Follow the messenger across a synapse here: a chemical signal bridges the gap between two cells.','Cet atlas pédagogique local permet d’explorer en trois dimensions des cellules, des neurones et des synapses. Suivez ici le messager chimique qui franchit l’espace entre deux cellules.'],
 steps:[['Release','Cross the cleft','Bind to a receptor'],['Libération','Traversée de la fente','Fixation au récepteur']],
 draw(g,t){g.line([[15,25],[95,25],[115,40],[120,60],[115,80],[95,95],[15,95]]);g.line([[200,25],[200,50],[212,59],[200,68],[200,95],[262,95]]);g.dot(86+120*t,59,6);}},
 {name:'AXELLE',field:['Machine learning · Sparse rules','Apprentissage · Règles parcimonieuses'],
 text:['This CPU classifier learns weighted clauses from sparse features. Try a clause that requires A and forbids B. Changing a single input can switch its contribution to the class score on or off.','Ce classifieur sur CPU apprend des clauses pondérées à partir de caractéristiques éparses. La clause illustrée exige A et exclut B. Changer une seule entrée suffit à activer ou annuler son vote.'],
 steps:[['A absent → no vote','A alone → vote','B present → no vote'],['A absent → aucun vote','A seul → vote','B présent → aucun vote']],
 draw(g,t,s){const a=s>0,b=s===2;g.label('A = '+Number(a),12,45);g.label('B = '+Number(b),12,87);g.line([[68,40],[85,40],[103,57]]);g.line([[68,82],[85,82],[103,65]]);g.label('A ∧ ¬B',110,66);g.line([[173,60],[206,60]]);g.dot(226,60,a&&!b?13:5);}},
 {name:'AIDGE Hardware Lab',field:['Embedded vision · ASYGN','Vision embarquée · ASYGN'],url:'AIDGE',
 text:['The hardware lab follows a synthetic camera feed through tracking and counting. Watch the centre of the box: a track increments the counter once when it crosses the line. Hardware measurements are a separate stage of the project.','Le banc d’essai suit une scène synthétique, de la caméra au comptage. Observez le centre du cadre : le passage de la ligne incrémente une fois le compteur pour cette trajectoire. Les mesures sur carte constituent une autre étape du projet.'],
 steps:[['Acquire a track','Approach the line','Crossing counted'],['Acquisition de la cible','Approche de la ligne','Franchissement compté']],
 draw(g,t){const x=32+207*t;g.line([[170,15],[170,104]]);g.rect(x-13,39,26,41);g.dot(x,56,4);g.label('Σ '+Number(x>=170),210,24);}},
 {name:'Sylphe',field:['Hyperdimensional computing · C','Calcul hyperdimensionnel · C'],
 text:['Sylphe encodes patterns as binary hypervectors and combines them with a fuzzy Tsetlin model. Its bitwise operations have a useful property: XOR highlights exactly where two vectors disagree. Count the highlighted bits to measure their distance.','Sylphe code des motifs en hypervecteurs binaires et les associe à un modèle de Tsetlin flou. Le XOR révèle les positions où deux vecteurs divergent. Le nombre de bits allumés donne leur distance.'],
 steps:[['Read vector A','Compare vector B','XOR → 2 differences'],['Lire le vecteur A','Comparer le vecteur B','XOR → 2 différences']],
 draw(g,t,s){['101100','100110','001010'].slice(0,s+1).forEach((bits,i)=>{g.label(['A','B','⊕'][i],15,31+i*32);[...bits].forEach((b,j)=>{g.rect(50+j*31,15+i*32,19,19);if(b==='1')g.dot(59+j*31,24+i*32,5)})})}},
 {name:'AlgoArena',field:['Optimisation · Edge / Fog / Cloud','Optimisation · Edge / Fog / Cloud'],
 text:['Built by AST and RCT, this studio compares scheduling and optimisation methods. In this miniature, a candidate is discarded when another uses less time and less energy. The remaining points show why several answers can be worth keeping.','Développé par AST et RCT, ce studio compare des méthodes d’optimisation et d’ordonnancement. Ici, une solution est écartée si une autre prend moins de temps et consomme moins d’énergie. Plusieurs compromis peuvent ainsi subsister.'],
 steps:[['Compare candidates','Mark dominated points','Keep the Pareto front'],['Comparer les solutions','Repérer les points dominés','Garder le front de Pareto']],
 draw(g,t,s){g.line([[32,13],[32,94],[253,94]]);g.label('E',12,22);g.label('t',254,100);const front=[[64,29],[110,55],[189,78]];if(s===2)g.line(front);front.forEach(([x,y])=>g.dot(x,y,5));if(s<2)[[150,30],[214,48]].forEach(([x,y])=>s===0?g.dot(x,y,5):g.label('×',x-5,y+5));}},
 {name:'AXON-1 / ATTN-11',field:['Native attention · Memory','Attention native · Mémoire'],
 text:['The current experiments test whether a native attention network can compose two memory lookups. Start at address A, read B, then use B as the next address. Success on one lookup alone leaves the second step untested.','Les expériences actuelles testent la capacité d’un réseau d’attention natif à enchaîner deux lectures mémoire. Partez de l’adresse A, lisez B, puis utilisez B comme adresse suivante. Réussir une seule lecture laisse cette seconde étape à vérifier.'],
 steps:[['Query address A','Read B, query B','Read the final value'],['Interroger A','Lire B, interroger B','Lire la valeur finale']],
 draw(g,t,s){['A','B','7'].forEach((v,i)=>{const x=32+i*93;g.rect(x,37,36,36);g.label(v,x+12,61);if(i<2)g.line([[x+36,55],[x+87,55],[x+82,50]]);if(i===s)g.dot(x+18,88,4)})}}
];
function paintProject(canvas,note,t){
 const ctx=canvas.getContext('2d'),style=getComputedStyle(canvas);
 const color=k=>style.getPropertyValue('--'+k).trim();
 ctx.setTransform(2,0,0,2,0,0);ctx.clearRect(0,0,280,116);ctx.lineWidth=1.5;ctx.font='16px monospace';
 const g={
 line(points){ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.strokeStyle=color('trace');ctx.stroke()},
 dot(x,y,r){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=color('accent');ctx.fill()},
 rect(x,y,w,h){ctx.strokeStyle=color('trace');ctx.strokeRect(x,y,w,h)},
 label(v,x,y){ctx.fillStyle=color('ink');ctx.fillText(v,x,y)}
 };
 const stage=Math.min(2,Math.floor(t*3));note.draw(g,t,stage);return note.steps[fr?1:0][stage];
}
let playingProject=-1,projectPhase=0,projectTimer;
function stopProject(){
 clearInterval(projectTimer);playingProject=-1;
}
function renderProjects(){
 const container=$('projects');container.replaceChildren();
 projectNotes.forEach((note,i)=>{
  const row=document.createElement('article');row.className='project-note';
  row.innerHTML='<div><span class="kind"></span><h3></h3><p></p></div><figure><canvas width="560" height="232" role="img"></canvas><figcaption><span></span><button type="button"></button></figcaption></figure>';
  row.querySelector('.kind').textContent=note.field[fr?1:0];row.querySelector('h3').textContent=note.name;row.querySelector('p').textContent=note.text[fr?1:0];
  if(note.url){const a=document.createElement('a');a.href=repo+note.url;a.textContent=tr('Source repository ↗','Dépôt du projet ↗');row.firstElementChild.append(a)}
  const btn=row.querySelector('button');btn.onclick=()=>{
   const wasPlaying=playingProject===i;stopProject();
   if(!wasPlaying){playingProject=i;projectPhase=0;projectTimer=setInterval(()=>{if(!document.hidden){projectPhase=(projectPhase+1)%90;updateProject(i)}},65)}
   projectNotes.forEach((_,j)=>updateProject(j));
  };
  container.append(row);updateProject(i);
 });
}
function updateProject(i){
 const row=$('projects').children[i],active=playingProject===i,canvas=row.querySelector('canvas'),btn=row.querySelector('button');
 const caption=paintProject(canvas,projectNotes[i],active?projectPhase/89:0);
 row.querySelector('figcaption span').textContent=caption;canvas.setAttribute('aria-label',projectNotes[i].name+' · '+caption);
 btn.textContent=active?tr('■ Stop','■ Arrêter'):tr('▷ Loop','▷ Boucle');
 btn.setAttribute('aria-label',btn.textContent+' · '+projectNotes[i].name);btn.setAttribute('aria-pressed',active);
}
