/* ============ NAVIGATION ============ */
var PUBLIC_SCREENS=['landing','pricing','marketplace','photo-detail','checkout','contests','campaigns'];
function show(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('active',s.id===id));
  document.querySelectorAll('.nav-item,.tdn-item').forEach(n=>n.classList.toggle('active',n.dataset.go===id));
  var isPublic=PUBLIC_SCREENS.indexOf(id)>=0;
  document.querySelector('.app').classList.toggle('zone-public',isPublic);
  document.querySelector('.app').classList.toggle('zone-dash',!isPublic);
  window.scrollTo({top:0});
  if(window.innerWidth<=768)toggleNav(false);
  history.replaceState(null,'','#'+id);
}
document.addEventListener('click',function(e){
  var g=e.target.closest('[data-go]');
  if(g){e.preventDefault();show(g.dataset.go);}
});
function toggleNav(open){
  var sidebar=document.getElementById('sidebar');
  var isDesktop=window.innerWidth>768;
  if(open===undefined){
    // desktop toggle: collapsed class
    if(isDesktop){
      var collapsed=sidebar.classList.toggle('collapsed');
      document.getElementById('sidebarToggle').classList.toggle('is-open',!collapsed);
      document.querySelector('.app').classList.toggle('sidebar-collapsed',collapsed);
      return;
    }
    open=true;
  }
  sidebar.classList.toggle('open',open);
  document.getElementById('ov').classList.toggle('show',open&&!isDesktop);
  if(isDesktop)document.getElementById('sidebarToggle').classList.toggle('is-open',open);
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

/* ============ MARKETPLACE DATA ============ */
var mkPhotos=[
  {idx:0,seed:'mk0',title:'Neon Alley',cat:'Street',price:5,creator:'Ayesha Rahman',cseed:'pquser',tags:['neon','night','street','urban','city']},
  {idx:1,seed:'mk1',title:'Misty Hills',cat:'Nature',price:8,creator:'Nadia Karim',cseed:'m2',tags:['nature','hills','mist','landscape','green']},
  {idx:2,seed:'mk2',title:'Harbor Dawn',cat:'Travel',price:12,creator:'K. Ahmed',cseed:'m6',tags:['harbor','dawn','travel','water','boats']},
  {idx:3,seed:'mk3',title:'Old Town',cat:'Architecture',price:15,creator:'Rafi Hasan',cseed:'m1',tags:['architecture','old','town','heritage','streets']},
  {idx:4,seed:'mk4',title:'Market Noon',cat:'Street',price:9,creator:'Samiul Islam',cseed:'m4',tags:['market','street','people','culture','food']},
  {idx:5,seed:'mk5',title:'Rooftop Dusk',cat:'Urban',price:18,creator:'Ayesha Rahman',cseed:'pquser',tags:['rooftop','dusk','urban','skyline','sunset']},
  {idx:6,seed:'mk6',title:'Pier 7',cat:'Travel',price:7,creator:'Nadia Karim',cseed:'m2',tags:['pier','travel','ocean','evening','light']},
  {idx:7,seed:'mk7',title:'Tea Garden',cat:'Nature',price:14,creator:'K. Ahmed',cseed:'m6',tags:['tea','garden','nature','green','peaceful']},
  {idx:8,seed:'mk8',title:'Night Bus',cat:'Street',price:10,creator:'Rafi Hasan',cseed:'m1',tags:['bus','night','street','motion','city']},
  {idx:9,seed:'mk9',title:'Backstreet',cat:'Urban',price:6,creator:'Samiul Islam',cseed:'m4',tags:['backstreet','alley','urban','shadow','texture']},
  {idx:10,seed:'mk10',title:'Coastline',cat:'Nature',price:20,creator:'Ayesha Rahman',cseed:'pquser',tags:['coast','ocean','nature','aerial','blue']},
  {idx:11,seed:'mk11',title:'Stairwell',cat:'Architecture',price:11,creator:'Nadia Karim',cseed:'m2',tags:['stairs','architecture','minimal','light','interior']}
];

function mkPhotoItem(p){
  return '<figure class="arch-item mk-photo" onclick="openPhoto(mkPhotos['+p.idx+'])">'
    +'<div class="ai-img"><img loading="lazy" src="'+pic(p.seed,500,620)+'" alt="'+p.title+'"></div>'
    +'<figcaption class="cap"><span class="ct">'+p.title+'</span><span class="cp">$'+p.price+'</span></figcaption>'
    +'</figure>';
}

function mkRender(photos){
  document.getElementById('mkGrid').innerHTML=photos.length
    ?photos.map(mkPhotoItem).join('')
    :'<p style="padding:40px 0;color:var(--muted);font-family:var(--mono);font-size:13px">No photos match — try a different search or filter.</p>';
}
mkRender(mkPhotos);

/* ---- category filter ---- */
function mkCat(cat,el){
  document.querySelectorAll('.mk-cats .fl').forEach(function(a){a.classList.remove('on');});
  el.classList.add('on');
  var filtered=cat==='All'?mkPhotos:mkPhotos.filter(function(p){return p.cat===cat;});
  document.getElementById('mkResultCount').textContent=(filtered.length*201014).toLocaleString()+' results';
  mkRender(filtered);
}

/* ---- search ---- */
function mkSearch(){
  var q=(document.getElementById('mkSearchInput').value||'').toLowerCase().trim();
  if(!q){mkRender(mkPhotos);document.getElementById('mkResultCount').textContent='2,412,304 results';return;}
  var res=mkPhotos.filter(function(p){
    return p.title.toLowerCase().includes(q)||p.cat.toLowerCase().includes(q)||p.tags.some(function(t){return t.includes(q);});
  });
  document.getElementById('mkResultCount').textContent=res.length+' result'+(res.length!==1?'s':'');
  mkRender(res);
}
function mkLiveSearch(q){
  if(!q){mkRender(mkPhotos);document.getElementById('mkResultCount').textContent='2,412,304 results';return;}
  mkSearch();
}

/* ---- sort ---- */
function mkSortChange(v){
  var sorted=mkPhotos.slice();
  if(v==='price-asc')sorted.sort(function(a,b){return a.price-b.price;});
  else if(v==='price-desc')sorted.sort(function(a,b){return b.price-a.price;});
  else if(v==='newest')sorted=sorted.reverse();
  mkRender(sorted);
}

/* ---- filter panel ---- */
function toggleFilters(btn){
  var panel=document.getElementById('filterPanel');
  var open=panel.classList.toggle('open');
  btn.classList.toggle('open',open);
  btn.textContent=open?'Filter ▴':'Filter ▾';
}
function fpSelect(group,el){
  var container=document.getElementById('fp-'+group);
  container.querySelectorAll('.fp-opt').forEach(function(o){o.classList.remove('on');});
  el.classList.add('on');
}
function fpClear(){
  ['license','price','orientation','creator'].forEach(function(g){
    var c=document.getElementById('fp-'+g);
    if(c){c.querySelectorAll('.fp-opt').forEach(function(o){o.classList.remove('on');});c.querySelectorAll('.fp-opt')[0].classList.add('on');}
  });
}
function mkLoadMore(btn){
  btn.textContent='Loading…';
  setTimeout(function(){btn.textContent='Load more photos';},900);
}

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

/* ============ PHOTO DETAIL ============ */
var currentPhoto=null;
var selectedLicense={type:'standard',price:12,name:'Standard License'};

function openPhoto(p){
  currentPhoto=p;
  /* update standard card price to match this photo */
  var stdCard=document.querySelector('.lic-card[data-lic="standard"]');
  stdCard.querySelector('.lic-price').textContent='$'+p.price;
  /* reset selection to standard */
  document.querySelectorAll('.lic-card').forEach(function(c){c.classList.remove('sel');});
  stdCard.classList.add('sel');
  selectedLicense={type:'standard',price:p.price,name:'Standard License'};
  /* fill detail */
  document.getElementById('pdPhoto').src=pic(p.seed,900,600);
  document.getElementById('pdTitle').textContent=p.title;
  document.getElementById('pdCat').textContent=p.cat;
  document.getElementById('pdCreatorName').textContent=p.creator;
  document.getElementById('pdCreatorAvatar').src=pic(p.cseed,80,80);
  document.getElementById('pdTags').innerHTML=p.tags.map(function(t){return '<span class="chipm">'+t+'</span>';}).join('');
  updateBuyBtn();
  /* similar photos */
  var similar=mkPhotos.filter(function(x){return x.idx!==p.idx;}).slice(0,4);
  document.getElementById('similarGrid').innerHTML=similar.map(mkPhotoItem).join('');
  show('photo-detail');
}

function selectLicense(el){
  document.querySelectorAll('.lic-card').forEach(function(c){c.classList.remove('sel');});
  el.classList.add('sel');
  var prices={standard:currentPhoto?currentPhoto.price:12, extended:49, enterprise:199};
  var names={standard:'Standard License', extended:'Extended License', enterprise:'Enterprise License'};
  var t=el.dataset.lic;
  selectedLicense={type:t, price:prices[t], name:names[t]};
  updateBuyBtn();
}

function updateBuyBtn(){
  var btn=document.getElementById('pdBuyBtn');
  if(btn)btn.textContent='Buy '+selectedLicense.name+' — $'+selectedLicense.price;
}

/* ============ CHECKOUT ============ */
var licFeats={
  standard:['✓ Digital & web use','✓ Social media & presentations','✓ Editorial & advertising','✓ Print up to 500,000 copies','✗ Unlimited print runs','✗ Resale or sub-licensing'],
  extended:['✓ Everything in Standard','✓ Unlimited print runs','✓ Resale & merchandise','✓ TV, film & broadcast','✓ OEM & product packaging','✗ White-label redistribution'],
  enterprise:['✓ Everything in Extended','✓ White-label redistribution','✓ Multi-seat usage','✓ Certificate of authenticity','✓ Source RAW file included','✓ Priority support']
};
var licScopes={
  standard:'personal and commercial use — web, social, print up to 500k copies',
  extended:'unlimited commercial use including resale, merchandise and broadcast',
  enterprise:'full enterprise use including white-label redistribution and multi-seat'
};

function goCheckout(){
  if(!currentPhoto)return;
  document.getElementById('coForm').style.display='block';
  document.getElementById('coSuccess').style.display='none';
  document.getElementById('coPhoto').src=pic(currentPhoto.seed,160,160);
  document.getElementById('coTitle').textContent=currentPhoto.title;
  document.getElementById('coLicName').textContent=selectedLicense.name;
  document.getElementById('coCreator').textContent='by '+currentPhoto.creator;
  document.getElementById('coPrice').textContent='$'+selectedLicense.price;
  document.getElementById('coSubtotal').textContent='$'+selectedLicense.price+'.00';
  document.getElementById('coPlatformFee').textContent='$'+Math.round(selectedLicense.price*.13)+'.00 (included)';
  document.getElementById('coTotal').textContent='$'+selectedLicense.price+'.00';
  document.getElementById('coPlaceBtn').textContent='Place order — $'+selectedLicense.price+'.00';
  document.getElementById('coLicScope').textContent=licScopes[selectedLicense.type];
  var feats=licFeats[selectedLicense.type];
  document.getElementById('coLicFeats').innerHTML=feats.map(function(f){
    return '<li'+(f.startsWith('✗')?' class="off"':'')+'>'+f+'</li>';
  }).join('');
  show('checkout');
}

function completePurchase(){
  document.getElementById('coForm').style.display='none';
  document.getElementById('coSuccess').style.display='block';
  document.getElementById('dlPhoto').src=pic(currentPhoto.seed,160,160);
  document.getElementById('dlTitle').textContent=currentPhoto.title;
  document.getElementById('dlLicName').textContent=selectedLicense.name;
  addOrder(currentPhoto,selectedLicense);
  window.scrollTo({top:0});
}

function simulateDownload(btn){
  btn.textContent='Preparing…';
  setTimeout(function(){btn.textContent='⬇ Download full resolution';},1400);
}

/* ============ ORDERS ============ */
var ordersData=[
  {id:'ord1',photo:{seed:'mk0',title:'Neon Alley',creator:'Ayesha Rahman'},lic:'Standard License',licType:'standard',date:'Jun 02, 2026',price:5},
  {id:'ord2',photo:{seed:'mk5',title:'Rooftop Dusk',creator:'Ayesha Rahman'},lic:'Extended License',licType:'extended',date:'May 28, 2026',price:49},
  {id:'ord3',photo:{seed:'mk2',title:'Harbor Dawn',creator:'K. Ahmed'},lic:'Standard License',licType:'standard',date:'May 15, 2026',price:12},
  {id:'ord4',photo:{seed:'mk10',title:'Coastline',creator:'Ayesha Rahman'},lic:'Enterprise License',licType:'enterprise',date:'Apr 30, 2026',price:199}
];

function addOrder(photo,license){
  ordersData.unshift({id:'ord-new-'+Date.now(),photo:{seed:photo.seed,title:photo.title,creator:photo.creator},lic:license.name,licType:license.type,date:'Jun 03, 2026',price:license.price});
  renderOrders(ordersData);
}

function ordersFilter(type,el){
  document.querySelectorAll('#orders .seg button').forEach(function(b){b.classList.remove('on');});
  el.classList.add('on');
  renderOrders(type==='all'?ordersData:ordersData.filter(function(o){return o.licType===type;}));
}

function renderOrders(data){
  var spent=data.reduce(function(s,o){return s+o.price;},0);
  document.getElementById('ordersStats').innerHTML=[
    ['Total orders',data.length,'all licenses'],
    ['Photos licensed',data.length,'unique works'],
    ['Total spent','$'+spent,data.length+' transactions'],
    ['Re-downloads','Unlimited','royalty-free forever']
  ].map(function(s){return '<div class="stat"><span class="st-label">'+s[0]+'</span><span class="st-val">'+s[1]+'</span><span class="st-delta">'+s[2]+'</span></div>';}).join('');
  document.getElementById('ordersList').innerHTML=data.length
    ?data.map(function(o){
        return '<div class="order-item">'
          +'<img class="oi-thumb" src="'+pic(o.photo.seed,160,160)+'" alt="">'
          +'<div><div class="oi-title">'+o.photo.title+'</div>'
          +'<span class="oi-lic">'+o.lic+'</span>'
          +'<div class="oi-date">by '+o.photo.creator+' · '+o.date+'</div></div>'
          +'<div class="oi-actions">'
          +'<span class="oi-price">$'+o.price+'.00</span>'
          +'<button class="oi-dl-btn" onclick="simulateDownload(this)">⬇ Download</button>'
          +'<span class="tg" style="font-size:9px">Licensed ✓</span>'
          +'</div></div>';
      }).join('')
    :'<p style="padding:32px 20px;color:var(--muted);font-size:14px">No orders yet. <a data-go="marketplace" style="color:var(--red);font-weight:600;cursor:pointer">Browse the marketplace →</a></p>';
}
renderOrders(ordersData);

/* ============ LEARNING CENTER ============ */
var learningContent=[
  {id:'lrn1',title:'Getting Started with PhotoQuest',cat:'Getting Started',type:'video',duration:'8 min',required:true,desc:'An introduction to the platform — set up your profile, upload your first photo, and configure your payout method.',seed:'lc1'},
  {id:'lrn2',title:'How to License Your Photos',cat:'Marketplace',type:'video',duration:'12 min',required:true,desc:'Walk through the licensing workflow — standard vs extended vs enterprise, pricing strategy, and how buyers find your work.',seed:'lc2'},
  {id:'lrn3',title:'Copyright & IP Compliance',cat:'Compliance',type:'article',duration:'5 min read',required:true,desc:'Understand your rights and responsibilities as a content creator — what you can and cannot upload, model releases, and property rights.',seed:'lc3'},
  {id:'lrn4',title:'Entering Contests — Rules & Strategy',cat:'Contests',type:'guide',duration:'6 min',required:false,desc:'How the weekly and monthly quests work, what judges look for, and how prize distribution works across tiers.',seed:'lc4'},
  {id:'lrn5',title:'Brand Campaign Guidelines',cat:'Brand Campaigns',type:'video',duration:'15 min',required:true,desc:'Everything about applying to brand campaigns — brief interpretation, style expectations, submission requirements and payment timelines.',seed:'lc5'},
  {id:'lrn6',title:'Tax & Payout Information',cat:'Compliance',type:'article',duration:'7 min read',required:true,desc:'Platform tax policy, USD earnings reporting, Stripe KYC requirements, and how to set up your virtual card for withdrawals.',seed:'lc6'},
  {id:'lrn7',title:'Optimising Your Portfolio',cat:'Marketplace',type:'guide',duration:'10 min',required:false,desc:'Tips for keyword strategy, folder organisation, pricing your work, and increasing discoverability in search results.',seed:'lc7'},
  {id:'lrn8',title:'AI Tagging Best Practices',cat:'Getting Started',type:'video',duration:'4 min',required:false,desc:'How to get the best results from smart auto-tagging — when to use it, how to edit suggestions, and managing AI-generated metadata.',seed:'lc8'}
];
var completedLearning=new Set(['lrn1','lrn3']);
var lrnCurrentTab='all';
var lrnCurrentCat='All';

function lrnUpdateProgress(){
  var total=learningContent.length;
  var done=completedLearning.size;
  var required=learningContent.filter(function(i){return i.required;});
  var reqDone=required.filter(function(i){return completedLearning.has(i.id);}).length;
  var pct=Math.round(done/total*100);
  document.getElementById('lrnProgFrac').textContent=done+' of '+total+' completed';
  document.getElementById('lrnProgPct').textContent=pct+'%';
  document.getElementById('lrnProgBar').style.width=pct+'%';
  var allReqDone=reqDone===required.length;
  var statusEl=document.getElementById('lrnReqStatus');
  statusEl.textContent=allReqDone
    ?'✓ All '+required.length+' required items completed — all features unlocked'
    :'⚠ '+reqDone+' of '+required.length+' required items completed — some features are gated';
  statusEl.className=allReqDone?'lrn-ok':'lrn-warn';
  /* required strip */
  document.getElementById('lrnReqStrip').innerHTML=
    '<div class="lrn-req-head"><span class="mono" style="font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)">Required to unlock all features</span></div>'
    +'<div class="lrn-req-items">'+required.map(function(item){
      var d=completedLearning.has(item.id);
      return '<div class="lrn-req-item'+(d?' done':'')+'" onclick="lrnOpen(\''+item.id+'\')">'
        +'<span class="lrn-ri-check">'+(d?'✓':'○')+'</span>'
        +'<span class="lrn-ri-title">'+item.title+'</span>'
        +'</div>';
    }).join('')+'</div>';
}

function lrnRender(items){
  document.getElementById('lrnCount').textContent=items.length+' item'+(items.length!==1?'s':'');
  var icons={video:'▶',article:'✦',guide:'◈'};
  document.getElementById('lrnGrid').innerHTML=items.length
    ?items.map(function(item){
        var done=completedLearning.has(item.id);
        return '<div class="lrn-card'+(done?' lrn-done':'')+'" onclick="lrnOpen(\''+item.id+'\')">'
          +'<div class="lrn-thumb">'
          +'<img src="'+pic(item.seed,600,340)+'" alt="">'
          +'<span class="lrn-type-badge">'+(icons[item.type]||'')+ ' '+item.type.toUpperCase()+'</span>'
          +(item.required?'<span class="lrn-req-badge">Required</span>':'')
          +(done?'<div class="lrn-done-overlay">✓</div>':'')
          +'</div>'
          +'<div class="lrn-body">'
          +'<span class="lrn-cat">'+item.cat+'</span>'
          +'<h3 class="lrn-title">'+item.title+'</h3>'
          +'<p class="lrn-desc">'+item.desc+'</p>'
          +'<div class="lrn-foot"><span class="mono">'+item.duration+'</span>'
          +'<button class="'+(done?'btn-line':'btn-solid')+' lrn-btn">'+(done?'Review ↗':'Start →')+'</button>'
          +'</div></div></div>';
      }).join('')
    :'<p style="padding:40px 0;color:var(--muted);font-family:var(--mono);font-size:13px">No items match this filter.</p>';
}

function lrnGetFiltered(){
  return learningContent.filter(function(item){
    var tabOk=lrnCurrentTab==='all'
      ||(lrnCurrentTab==='required'&&item.required)
      ||(lrnCurrentTab==='completed'&&completedLearning.has(item.id))
      ||(lrnCurrentTab==='todo'&&!completedLearning.has(item.id));
    var catOk=lrnCurrentCat==='All'||item.cat===lrnCurrentCat;
    return tabOk&&catOk;
  });
}

function lrnTab(tab,el){
  lrnCurrentTab=tab;
  document.querySelectorAll('#learning .seg button').forEach(function(b){b.classList.remove('on');});
  el.classList.add('on');
  lrnRender(lrnGetFiltered());
}
function lrnCat(cat,el){
  lrnCurrentCat=cat;
  document.querySelectorAll('.lrn-cats .fl').forEach(function(a){a.classList.remove('on');});
  el.classList.add('on');
  lrnRender(lrnGetFiltered());
}

function lrnOpen(id){
  var item=learningContent.find(function(i){return i.id===id;});
  if(!item)return;
  var done=completedLearning.has(id);
  document.getElementById('lrnViewerThumb').src=pic(item.seed,900,506);
  document.getElementById('lrnViewerTitle').textContent=item.title;
  document.getElementById('lrnViewerCat').textContent=item.cat+' · '+item.type+' · '+item.duration;
  document.getElementById('lrnViewerDesc').textContent=item.desc;
  document.getElementById('lrnViewerRequired').style.display=item.required?'inline-block':'none';
  var btn=document.getElementById('lrnViewerComplete');
  btn.textContent=done?'✓ Completed — mark incomplete':(item.type==='video'?'Mark as watched':'Mark as read');
  btn.className=(done?'btn-line':'btn-solid')+' full';
  btn.onclick=function(){lrnToggleComplete(id);};
  document.getElementById('lrnViewer').classList.add('open');
  document.body.style.overflow='hidden';
}

function lrnToggleComplete(id){
  if(completedLearning.has(id))completedLearning.delete(id);
  else completedLearning.add(id);
  lrnUpdateProgress();
  lrnRender(lrnGetFiltered());
  /* update open viewer */
  var done=completedLearning.has(id);
  var item=learningContent.find(function(i){return i.id===id;});
  var btn=document.getElementById('lrnViewerComplete');
  btn.textContent=done?'✓ Completed — mark incomplete':(item.type==='video'?'Mark as watched':'Mark as read');
  btn.className=(done?'btn-line':'btn-solid')+' full';
  /* update nav flag */
  var req=learningContent.filter(function(i){return i.required;});
  var reqLeft=req.filter(function(i){return !completedLearning.has(i.id);}).length;
  var flag=document.querySelector('[data-go="learning"] .ni-flag');
  if(flag)flag.textContent=reqLeft>0?reqLeft+' req':'✓';
}

function lrnViewerClose(){
  document.getElementById('lrnViewer').classList.remove('open');
  document.body.style.overflow='';
}

/* init */
lrnUpdateProgress();
lrnRender(learningContent);

/* ============ INIT ============ */
renderPlans();
(function(){
  var h=location.hash.slice(1);
  var sc=['landing','pricing','marketplace','contests','campaigns','dashboard','upload','portfolio','earnings','referral','orders','learning','photo-detail','checkout'];
  if(h==='photo-detail'||h==='checkout')h='marketplace';
  show(sc.indexOf(h)>=0?h:'landing');
}());
