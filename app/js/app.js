/* ============ NAVIGATION ============ */
function show(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('active',s.id===id));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.go===id));
  window.scrollTo({top:0});
  if(window.innerWidth<=768)toggleNav(false);
}
document.addEventListener('click',function(e){
  var g=e.target.closest('[data-go]');
  if(g){e.preventDefault();show(g.dataset.go);}
});
function toggleNav(open){
  document.getElementById('sidebar').classList.toggle('open',open);
  document.getElementById('ov').classList.toggle('show',open);
}

/* ============ THEME ============ */
function toggleTheme(){
  var h=document.documentElement;
  var dark=h.getAttribute('data-theme')==='dark';
  h.setAttribute('data-theme',dark?'light':'dark');
  document.getElementById('themeBtn').textContent=dark?'Dark':'Light';
}

/* ============ PRICING ============ */
var plans=[
  {nm:'Basic',pop:false,desc:'For beginners testing the waters with their first sales.',mo:9,yr:90,store:'10 GB storage included',
   feats:[['50 photo uploads / month',1],['Sell on the marketplace',1],['Keep ~87% of every sale',1],['USD payout to Stripe card',1],['Contest entry',0],['Brand campaigns',0],['Featured placement',0]]},
  {nm:'Pro',pop:true,desc:'For serious creators who sell, compete and collaborate.',mo:29,yr:290,store:'100 GB storage included',
   feats:[['500 photo uploads / month',1],['Everything in Basic',1],['Enter all contests',1],['Apply to brand campaigns',1],['Featured in search',1],['$50 payout threshold',1],['Priority review',1]]},
  {nm:'Advance',pop:false,desc:'For professionals running a full photo business.',mo:79,yr:790,store:'1 TB storage included',
   feats:[['Unlimited uploads',1],['Everything in Pro',1],['Top featured placement',1],['Early campaign access',1],['Advanced analytics',1],['Dedicated manager',1],['24/7 priority support',1]]}
];
var billing='mo';
function renderPlans(){
  document.getElementById('planGrid').innerHTML=plans.map(function(p){
    return '<div class="plan-col '+(p.pop?'pop':'')+'">'
      +'<div class="plan-name"><span class="nm">'+p.nm+'</span>'+(p.pop?'<span class="rec">→ Recommended</span>':'')+'</div>'
      +'<div class="plan-desc">'+p.desc+'</div>'
      +'<div class="plan-price"><span class="amt">$'+(billing==='mo'?p.mo:Math.round(p.yr/12))+'</span><span class="per">/mo'+(billing==='yr'?' · billed yearly':'')+'</span></div>'
      +'<div class="plan-store">'+p.store+'</div>'
      +'<ul class="plan-feats">'+p.feats.map(function(f){return '<li class="'+(f[1]?'':'off')+'"><span class="mk">'+(f[1]?'✓':'—')+'</span>'+f[0]+'</li>';}).join('')+'</ul>'
      +'<button class="'+(p.pop?'btn-solid':'btn-line')+'">'+(p.nm==='Basic'?'Start free trial':'Choose '+p.nm)+'</button>'
      +'</div>';
  }).join('');
}
function setBilling(b,el){billing=b;document.querySelectorAll('#billSeg button').forEach(function(x){x.classList.remove('on');});el.classList.add('on');renderPlans();}

/* ============ HELPERS ============ */
var cats=['travel','street','food','nature','portrait','urban','aerial'];
function pic(seed,w,h){return 'https://picsum.photos/seed/'+seed+'/'+w+'/'+h;}
function archItem(seed,w,h,title,price){
  return '<figure class="arch-item"><div class="ai-img"><img loading="lazy" src="'+pic(seed,w,h)+'" alt=""></div>'
    +'<figcaption class="cap"><span class="ct">'+title+'</span><span class="cp">$'+price+'</span></figcaption></figure>';
}

/* ============ MARKETPLACE ============ */
var mkTitles=['Neon Alley','Misty Hills','Harbor Dawn','Old Town','Market Noon','Rooftop Dusk','Pier 7','Tea Garden','Night Bus','Backstreet','Coastline','Stairwell'];
document.getElementById('mkGrid').innerHTML=mkTitles.map(function(t,i){
  return archItem('mk'+i,500,620,t,[5,8,12,15,9,18][i%6]);
}).join('');

/* ============ PORTFOLIO ============ */
var pfH=[640,440,560,720,500,600,420,680,540,480,620];
document.getElementById('pfGallery').innerHTML=pfH.map(function(h,i){
  return archItem('pf'+i,500,h,['Dhaka Rickshaw','Golden Hour','Old Dhaka','Monsoon','Rooftops','Ferry'][i%6],[6,10,14,9,12,7][i%6]);
}).join('');

/* ============ LANDING FEATURES ============ */
var feats=[
  ['01','Marketplace','License royalty-free photos in USD. Buyers find your work through search and curated categories.'],
  ['02','Contests','Weekly and monthly themed quests with cash prizes and recognition.'],
  ['03','Brand Campaigns','Get matched with paid commercial briefs from travel, fashion and lifestyle brands.'],
  ['04','Optional AI Tagging','Auto-keyword and smart-sort every upload — or switch it off to keep things lean.']
];
document.getElementById('landFeatures').innerHTML=feats.map(function(f){
  return '<div class="feat"><div class="fn">'+f[0]+'</div><h3>'+f[1]+'</h3><p>'+f[2]+'</p></div>';
}).join('');

/* ============ DASHBOARD ============ */
var stats=[
  ['Total earnings','$4,820','+12.4% all-time',0],
  ['This month','$612','+8.1% vs last',0],
  ['Ready to payout','$340','above $50 minimum',0],
  ['Referral income','$180','9 referrals',0]
];
document.getElementById('statRow').innerHTML=stats.map(function(s){
  return '<div class="stat"><span class="st-label">'+s[0]+'</span><span class="st-val">'+s[1]+'</span><span class="st-delta'+(s[3]?' down':'')+'">'+s[2]+'</span></div>';
}).join('');

var topPics=[['Neon Alley','1.2K downloads','420','tp1'],['Misty Tea Hills','980 downloads','360','tp2'],['Dhaka Rickshaw','870 downloads','310','tp3'],['Coastal Sunrise','640 downloads','280','tp4']];
document.getElementById('topPhotos').innerHTML=topPics.map(function(t){
  return '<div class="row-item"><img src="'+pic(t[3],90,90)+'" alt=""><div><div class="rt">'+t[0]+'</div><div class="rs">'+t[1]+'</div></div><span class="rv">$'+t[2]+'</span></div>';
}).join('');

var act=[['License sold','“Neon Alley” · standard','+$12','tp1'],['Shortlisted','Urban Nights quest','—','pf3'],['Campaign accepted','Voyagé · Wanderlust','+$80','mk4'],['New referral','rafi.h → Pro','+$10','pquser']];
document.getElementById('activity').innerHTML=act.map(function(a){
  return '<div class="row-item"><img src="'+pic(a[3],90,90)+'" alt=""><div><div class="rt">'+a[0]+'</div><div class="rs">'+a[1]+'</div></div><span class="rv">'+a[2]+'</span></div>';
}).join('');

/* ============ CONTESTS ============ */
var conts=[['Summer Vibes','Weekly','$500','ends 2d','cn1'],['Minimal Mornings','Weekly','$350','ends 5d','cn2'],['Faces of the City','Monthly','$800','ends 11d','cn3']];
document.getElementById('contGrid').innerHTML=conts.map(function(c){
  return '<article class="quest-card"><div class="qc-img"><img src="'+pic(c[4],400,300)+'" alt=""><span class="pz">'+c[2]+'</span></div>'
    +'<div class="qc-body"><div class="qc-theme">'+c[1]+'</div><h4>'+c[0]+'</h4><div class="dl">'+c[3]+'</div></div></article>';
}).join('');

/* ============ CAMPAIGNS ============ */
var camps=[
  ['Voyagé Travel','Wanderlust 2026','Authentic, candid travel moments — local food, street life and landscapes across Asia.',['travel','candid','asia'],'$80','per photo','cm1'],
  ['Linnex','Everyday Tech','Lifestyle product shots featuring earbuds and gadgets in real settings.',['product','lifestyle','minimal'],'$150','per photo','cm2'],
  ['Maison Café','Morning Ritual','Warm, cosy coffee and café-culture imagery in natural light.',['food','coffee','indoor'],'$500','fixed','cm3']
];
document.getElementById('campList').innerHTML=camps.map(function(c){
  return '<div class="camp-row"><img class="logo" src="'+pic(c[6],120,120)+'" alt="">'
    +'<div><div class="cr-name">'+c[0]+' <span class="open">Open</span></div><div class="cr-req">'+c[2]+'</div>'
    +'<div class="cr-tags">'+c[3].map(function(t){return '<span class="chipm">'+t+'</span>';}).join('')+'</div></div>'
    +'<div class="pay"><div class="amt">'+c[4]+'</div><div class="typ">'+c[5]+'</div><button class="btn-line">Apply</button></div></div>';
}).join('');

/* ============ EARNINGS ============ */
var eb=[['Marketplace sales','$2,940',72],['Brand campaigns','$1,120',28],['Contest prizes','$580',15],['Referrals','$180',5]];
document.getElementById('earnBars').innerHTML=eb.map(function(b){
  return '<div class="ebar"><div class="et"><span>'+b[0]+'</span><span class="ev">'+b[1]+'</span></div><div class="ebar-track"><div class="ebar-fill" style="width:'+b[2]+'%"></div></div></div>';
}).join('');

var tx=[
  ['Jun 02','Marketplace','“Neon Alley” · standard license','paid','Paid','+$12.00',0],
  ['Jun 01','Campaign','Voyagé · Wanderlust','paid','Paid','+$80.00',0],
  ['May 28','Contest','Summer Vibes · 2nd place','credit','Credited','+$300.00',0],
  ['May 25','Referral','rafi.h → Pro','paid','Paid','+$10.00',0],
  ['May 22','Payout','To Stripe virtual card','draw','Withdrawn','−$250.00',1]
];
document.getElementById('txBody').innerHTML=tx.map(function(t){
  return '<tr><td class="mono" style="color:var(--muted)">'+t[0]+'</td><td>'+t[1]+'</td><td style="color:var(--ink-2)">'+t[2]+'</td>'
    +'<td><span class="tg '+t[3]+'">'+t[4]+'</span></td><td class="r '+(t[6]?'amt-neg':'amt-pos')+'">'+t[5]+'</td></tr>';
}).join('');

/* ============ REFERRAL ============ */
var refs=[['rafi.h','May 25, 2026','Pro','paid','Paid','$10',0],['nadia.k','May 18, 2026','Advance','paid','Paid','$10',0],['samiul','May 11, 2026','Basic','paid','Paid','$10',0],['tania.r','May 02, 2026','—','draw','Signed up','—',1]];
document.getElementById('refBody').innerHTML=refs.map(function(r){
  return '<tr><td style="font-weight:600">'+r[0]+'</td><td class="mono" style="color:var(--muted)">'+r[1]+'</td><td>'+r[2]+'</td>'
    +'<td><span class="tg '+r[3]+'">'+r[4]+'</span></td><td class="r '+(r[6]?'':'amt-pos')+'" style="'+(r[6]?'color:var(--muted);font-family:var(--mono)':'')+'">'+r[5]+'</td></tr>';
}).join('');

/* ============ UPLOAD AI TOGGLE ============ */
function toggleAI(el){
  var on=el.classList.toggle('on');
  document.getElementById('aiOn').style.display=on?'block':'none';
  document.getElementById('aiOff').style.display=on?'none':'block';
  var dz=document.getElementById('dzPreview');
  if(on){dz.classList.add('scanning');setTimeout(function(){dz.classList.remove('scanning');},2400);}
}

/* ============ IMAGE FALLBACK ============ */
document.addEventListener('error',function(e){
  if(e.target&&e.target.tagName==='IMG'){e.target.style.background='var(--paper-2)';e.target.removeAttribute('src');}
},true);

/* ============ INIT ============ */
renderPlans();
