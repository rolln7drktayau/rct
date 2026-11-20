const $ = id => document.getElementById(id);
function preference(key, fallback) {try{return localStorage.getItem(key)||fallback}catch{return fallback}}
function remember(key,value){try{localStorage.setItem(key,value)}catch{}}
let fr=preference('rct-language','en')==='fr';
let light=preference('rct-theme','dark')==='light';
const tr=(en,french)=>fr?french:en;
const repo='https://github.com/rolln7drktayau/';
const doi='https://doi.org/10.1016/j.swevo.2026.102575';
const archive='https://doi.org/10.5281/zenodo.23450772';
const citation='Tayo, R. C., & Yassa, S. (2026). ADARE: '+document.querySelector('.publication h3').textContent+'. Swarm and Evolutionary Computation, 111, 102575. '+doi;
const studies=[
 ['AXON-1','C11 · Hyperdimensional computing','C11 · Calcul hyperdimensionnel','I am exploring how an agent written in C11 can retrieve a memory and explain a decision on a small machine. The prototype combines hyperdimensional representations, Tsetlin-inspired rules and an asynchronous processing loop.','Je cherche comment un agent écrit en C11 peut retrouver un souvenir et expliquer une décision sur une petite machine. Le prototype associe représentations hyperdimensionnelles, règles inspirées de Tsetlin et boucle de traitement asynchrone.'],
 ['AIDGE Hardware Lab','Embedded vision · Simulation','Vision embarquée · Simulation','A browser workbench for following a synthetic image through a counting pipeline. The illustrative 3D board and the hardware profiles make it possible to discuss which observations still require a physical board.','Un banc d’essai pour suivre une image synthétique dans une chaîne de comptage. La carte 3D illustrative et les profils matériels permettent de distinguer les observations simulées de celles qui exigent une mesure sur carte.','AIDGE'],
 ['RAUCB','Embedded Linux · Remote updates','Linux embarqué · Mise à jour distante','A Raspberry Pi running a Qt client receives an update from a Flask service over TLS. A checksum lets the client check the downloaded artifact. Docker cross-compilation brings the build and the target into the same update workflow.','Un client Qt sur Raspberry Pi reçoit une mise à jour depuis un service Flask via TLS. Une somme de contrôle vérifie le fichier téléchargé. La compilation croisée sous Docker relie la construction du logiciel à son déploiement sur la cible.','RAUCB'],
 ['Thermal monitor','Yocto · Raspberry Pi 4','Yocto · Raspberry Pi 4','A custom Poky image starts a monitoring service at boot, publishes CPU readings over MQTT and stops intensive work above a thermal threshold. The interesting boundary runs between reporting a measurement and acting on it.','Une image Poky personnalisée lance un service au démarrage, publie les mesures du processeur via MQTT et arrête les tâches intensives au-delà d’un seuil thermique. La même mesure sert à observer la carte et à la protéger.','RaspBerry_Pi_4_GPIO_Yocto_Poky'],
 ['Mobile robotics','ROS 2 · C++ · Gazebo','ROS 2 · C++ · Gazebo','How does a wheeled robot follow a wall with only local measurements? C++ nodes translate laser scans into velocity commands. Gazebo provides a repeatable setting for comparing obstacle avoidance, wall following and Braitenberg behaviours.','Comment suivre un mur avec des mesures locales ? Des nœuds C++ convertissent les relevés laser en consignes de vitesse. Gazebo permet de comparer l’évitement d’obstacles, le suivi de mur et les comportements de Braitenberg dans une scène reproductible.','ROS2'],
 ['LoRa sensor station','ESP32 · Instrumentation','ESP32 · Instrumentation','A HELTEC WiFi LoRa 32 V3 gathers environmental and optical sensor readings. The same measurements can be inspected on the OLED display, transmitted by radio or served on a local web page.','Une HELTEC WiFi LoRa 32 V3 collecte les mesures de capteurs environnementaux et optiques. On peut lire ces mesures sur l’écran OLED, les transmettre par radio ou les consulter sur une page web locale.','IOT_Lab_Project'],
 ['AlgoArena','Optimisation · Simulation','Optimisation · Simulation','A simulator in development for comparing optimisation and scheduling methods. A question guiding the work is how much detail a simulation needs before one can trust the ranking of two strategies.','Un simulateur en développement pour comparer des méthodes d’optimisation et d’ordonnancement. Une question guide le travail : quel degré de détail faut-il simuler pour pouvoir se fier au classement de deux stratégies ?']
];
const positions=[
 ['2026 →','CY Tech','Teaching artificial intelligence to engineering students specialising in embedded systems.','Enseignement de l’intelligence artificielle aux élèves ingénieurs en systèmes embarqués.'],
 ['2026 →','Fujitsu / Neurones IT','Cloud and infrastructure engineering for client environments.','Ingénierie cloud et infrastructure pour des environnements clients.'],
 ['2025 – 2026','SUEZ Smart Solutions','Distributed agents on Azure, AKS and RabbitMQ, with Prometheus and Grafana for observability.','Agents distribués sur Azure, orchestration avec AKS et RabbitMQ, suivi avec Prometheus et Grafana.'],
 ['2021 – 2024','Alstom','Compute and cloud architecture apprenticeship. Provisioning Azure sandboxes with Terraform and Azure DevOps.','Apprentissage en architecture cloud. Déploiement d’environnements Azure avec Terraform et Azure DevOps.'],
 ['2016 – 2018 / 2025','3IAC / IUC → CY Tech','Preparatory studies in physics, chemistry and engineering sciences. Engineering degree from CY Tech in 2025.','Classes préparatoires en physique, chimie et sciences de l’ingénieur. Diplôme d’ingénieur de CY Tech en 2025.']
];
const labs=[
 ['Physics','Physique','Where waves meet','Là où les ondes se rencontrent','Source separation','Écart des sources',0,8,3],
 ['Embedded systems','Embarqué','A voltage becomes a number','Une tension devient un nombre','Converter resolution','Résolution du convertisseur',1,8,3],
 ['Computer science','Informatique','Who gets the next task?','À qui confier la tâche suivante ?','Available workers','Unités disponibles',1,5,2],
 ['Artificial intelligence','IA','Recognising a noisy memory','Reconnaître une mémoire bruitée','Flipped bits','Bits inversés',0,64,9],
 ['Bioinformatics','Bio-informatique','Reading a sequence diagonally','Lire une séquence en diagonale','Substitutions','Substitutions',0,12,2]
];
let active=0;
const values=labs.map(l=>l[8]);
function render(){
 document.documentElement.lang=fr?'fr':'en';document.documentElement.dataset.theme=light?'light':'dark';
 document.querySelector('meta[name="theme-color"]').content=light?'#f6f3e9':'#151815';
 $('lang').textContent=fr?'EN':'FR';$('lang').setAttribute('aria-label',tr('Passer en français','Switch to English'));
 $('theme').textContent=light?'☾':'☼';$('theme').setAttribute('aria-label',tr(light?'Use dark theme':'Use light theme',light?'Thème sombre':'Thème clair'));$('theme').title=$('theme').getAttribute('aria-label');
 $('skip').textContent=tr('Skip to projects','Aller aux projets');
 $('nav').innerHTML='<a href="#research">'+tr('Research','Recherche')+'</a><a href="#work">'+tr('Projects','Projets')+'</a><a href="#path">'+tr('Career','Parcours')+'</a>';
 $('byline').textContent=tr('Engineering & research','Ingénierie et recherche');
 $('lead').textContent=tr('I teach embedded AI at CY Tech and work on cloud infrastructure. My research asks where a computation should run, and what it costs to put it there.','J’enseigne l’IA embarquée à CY Tech et je travaille sur les infrastructures cloud. Ma recherche porte sur une question : où exécuter un calcul et à quel coût ?');
 $('see').textContent=tr('Explore my projects ↓','Découvrir mes projets ↓');
 $('subjects').setAttribute('aria-label',tr('Choose an experiment','Choisir une expérience'));
 $('subjects').replaceChildren(...labs.map((l,i)=>{const b=document.createElement('button');b.textContent=l[fr?1:0];b.setAttribute('aria-pressed',i===active);b.setAttribute('aria-controls','plot lesson');b.onclick=()=>{active=i;render();$('subjects').children[i].focus()};return b}));
 $('peer').textContent=tr('Peer-reviewed article','Article de recherche');$('paperBody').textContent=tr('A workflow can finish sooner on a faster machine and still lose time moving its inputs there. ADARE uses the state of the Pareto search to choose its next optimisation operator. The study considers four objectives and workflows of up to 3,000 tasks.','Une machine plus rapide peut faire gagner du temps sur le calcul et en perdre sur le transfert des données. ADARE utilise l’état de la recherche de Pareto pour choisir son prochain opérateur d’optimisation. L’étude porte sur quatre objectifs et des workflows allant jusqu’à 3 000 tâches.');
 $('paperLinks').innerHTML='<a href="'+doi+'">'+tr('Paper','Article')+' ↗</a><a href="'+archive+'">'+tr('Code & data','Code et données')+' ↗</a><button id="copy">'+tr('Copy citation','Copier la citation')+'</button><span id="feedback" role="status"></span>';
 $('copy').onclick=async()=>{try{await navigator.clipboard.writeText(citation);$('feedback').textContent=tr('Copied.','Copiée.')}catch{$('feedback').textContent=citation}};
 $('projectsTitle').textContent=tr('Project notes','Carnet de projets');
 const opened=[...$('projects').children].map(d=>d.open);
 $('projects').innerHTML=studies.map(([name,en,frTag,body,bodyFr,url],i)=>'<details '+(opened[i]?'open':'')+'><summary><span class="pname">'+(fr?({'Thermal monitor':'Suivi thermique','Mobile robotics':'Robotique mobile','LoRa sensor station':'Station de mesure LoRa'}[name]||name):name)+'</span><span class="kind">'+tr(en,frTag)+'</span></summary><div class="detail"><p>'+tr(body,bodyFr)+'</p>'+(url?'<a href="'+repo+url+'">'+tr('Source repository','Dépôt du projet')+' ↗</a>':'')+'</div></details>').join('');
 $('careerTitle').textContent=tr('Experience & education','Expérience et formation');$('career').innerHTML=positions.map(([date,org,en,f])=>'<div class="experience"><span class="date">'+date+'</span><div><h3>'+org+'</h3><p>'+tr(en,f)+'</p></div></div>').join('');
 const lab=labs[active];$('plate').textContent=tr('Experiment / ','Expérience / ')+lab[fr?1:0];$('instrumentTitle').textContent=lab[fr?3:2];$('parameter').textContent=lab[fr?5:4];Object.assign($('value'),{min:lab[6],max:lab[7],value:values[active]});draw();
}
$('lang').onclick=()=>{fr=!fr;remember('rct-language',fr?'fr':'en');render()};
$('theme').onclick=()=>{light=!light;remember('rct-theme',light?'light':'dark');render()};
$('value').oninput=e=>{values[active]=Number(e.target.value);draw()};

function draw(){
 const canvas=$('plot'),ctx=canvas.getContext('2d'),css=getComputedStyle(document.documentElement);
 const color=k=>css.getPropertyValue('--'+k).trim();
 const ink=color('ink'),accent=color('accent'),trace=color('trace'),muted=color('muted'),grid=color('line');
 ctx.clearRect(0,0,800,360);ctx.font='19px Consolas, monospace';ctx.lineJoin='round';
 function line(points,c,width=1){ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.strokeStyle=c;ctx.lineWidth=width;ctx.stroke()}
 function label(t,x,y,c=muted){ctx.fillStyle=c;ctx.fillText(t,x,y)}
 function box(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(x,y,w,h)}
 const v=values[active];let lesson='',reading=String(v);
 if(active===0){
  const height=(x,y)=>[-v/2,v/2].reduce((a,s)=>{const r=Math.hypot(x-s,y);return a+Math.cos(Math.PI*r)/(1+.17*r)},0);
  const point=(x,y)=>[400+33*x+16*y,189+7*y-4*x-height(x,y)*48];
  for(let j=-40;j<=40;j++){const y=j/5;const pts=[];for(let i=-100;i<=100;i++)pts.push(point(i/12,y));line(pts,j%5===0?accent:trace,j%5===0?1.6:.85)}
  reading='d = '+(v/2)+' λ';
  lesson=tr('Two in-phase point sources emit the same wave. Move them apart and follow the ridges. Where a crest meets a trough, the displacement cancels.','Deux sources en phase émettent la même onde. Éloignez-les et suivez les crêtes. Là où une crête rencontre un creux, les déplacements se compensent.');
 }else if(active===1){
  const n=2**v;const wave=x=>.5+.41*Math.sin(x*Math.PI*3.3);const p=(x,y)=>[58+690*x,300-y*240];
  for(let k=0;k<=4;k++)line([p(0,k/4),p(1,k/4)],grid);
  line(Array.from({length:301},(_,i)=>p(i/300,wave(i/300))),trace,3);
  const pts=[];for(let i=0;i<45;i++){const q=Math.round(wave(i/45)*(n-1))/(n-1);pts.push(p(i/45,q),p((i+1)/45,q))}line(pts,accent,3);
  label('3.3 V',4,54);label('0 V',4,306);label(tr('time →','temps →'),640,340);
  reading=v+' bits';lesson=tr('The green input is sampled 45 times. The orange output has '+n+' possible levels. More bits reduce the vertical rounding error; the sampling interval stays fixed.','Le signal vert est échantillonné 45 fois. La sortie orange dispose de '+n+' niveaux. Ajouter des bits réduit l’erreur d’arrondi en tension ; l’intervalle de mesure reste fixe.');
 }else if(active===2){
  const loads=Array(v).fill(0),times=[5,3,6,2,4,3];
  const scale=670/23;for(let i=0;i<v;i++){label('W'+(i+1),12,80+i*49);line([[66,86+i*49],[748,86+i*49]],grid)}
  times.forEach((duration,i)=>{const worker=loads.indexOf(Math.min(...loads));const x=68+loads[worker]*scale,y=55+worker*49;box(x,y,duration*scale-3,33,i%2?trace:accent);label(String.fromCharCode(65+i),x+10,y+23,color('bg'));loads[worker]+=duration});
  label(tr('time →','temps →'),600,334);const end=Math.max(...loads);lesson=tr('Six independent tasks go to the first free worker in letter order. Completion time is '+end+' ticks. Try four workers, then five. Which task sets the lower bound?','Six tâches indépendantes vont à la première unité libre, par ordre alphabétique. Durée totale : '+end+' unités de temps. Essayez quatre unités de calcul puis cinq. Quelle tâche fixe la borne inférieure ?');
 }else if(active===3){
  for(let i=0;i<64;i++){const bit=((i*53+11)%67)%2,flip=(i*37)%64<v,x=60+i%16*43,y=34+Math.floor(i/16)*71;
   box(x,y,34,22,bit?ink:grid);box(x,y+25,34,22,(bit^flip)?ink:grid);if(flip)box(x,y+49,34,3,accent)}
  label(tr('stored / recalled','stocké / rappelé'),60,340);reading=v+' / 64';lesson=tr('Each pair shows one stored bit above its noisy copy. Orange marks a mismatch. Hamming distance counts '+v+' differences; '+(64-v)+' bits still agree. Binary hypervectors use this comparison at much larger scales.','Chaque paire montre un bit mémorisé au-dessus de sa copie bruitée. L’orange signale un écart. La distance de Hamming compte '+v+' différences ; '+(64-v)+' bits concordent. Les hypervecteurs binaires exploitent cette comparaison à plus grande échelle.');
 }else{
  const sequence='AGCTTACGACGT';const other=[...sequence].map((c,i)=>(i*5)%12<v?'ACGT'[('ACGT'.indexOf(c)+1)%4]:c);
  const step=21,left=281,top=58;for(let i=0;i<12;i++){
   label(sequence[i],left+i*step-5,top-18);label(other[i],left-28,top+i*step+6);
   for(let j=0;j<12;j++){const x=left+j*step,y=top+i*step;box(x-3,y-3,6,6,grid);if(sequence[j]===other[i])box(x-6,y-6,12,12,i===j?accent:trace)}
  }
  reading=v+' / 12';lesson=tr('A dot joins matching letters in two short teaching sequences. Read the orange diagonal: '+(12-v)+' aligned bases match. Green dots reveal repeated letters at other positions.','Un point relie deux lettres identiques dans ces courtes séquences pédagogiques. La diagonale orange compte '+(12-v)+' bases alignées identiques. Les points verts révèlent des répétitions à d’autres positions.');
 }
 $('reading').textContent=reading;$('lesson').textContent=lesson;canvas.setAttribute('aria-label',$('instrumentTitle').textContent+'. '+lesson);$('value').setAttribute('aria-valuetext',reading);
}
render();
