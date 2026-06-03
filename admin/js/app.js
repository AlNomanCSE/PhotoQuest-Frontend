/* ============ NAV / THEME (shared) ============ */
function show(id){
  document.querySelectorAll('.screen').forEach(function(s){s.classList.toggle('active',s.id===id);});
  document.querySelectorAll('.nav-item').forEach(function(n){n.classList.toggle('active',n.dataset.go===id);});
  window.scrollTo({top:0});
  if(window.innerWidth<=768)toggleNav(false);
  history.replaceState(null,'','#'+id);
}
document.addEventListener('click',function(e){var g=e.target.closest('[data-go]');if(g){e.preventDefault();show(g.dataset.go);}});
function toggleNav(open){document.getElementById('sidebar').classList.toggle('open',open);document.getElementById('ov').classList.toggle('show',open);}
function toggleTheme(){var h=document.documentElement;var dark=h.getAttribute('data-theme')==='dark';h.setAttribute('data-theme',dark?'light':'dark');document.getElementById('themeBtn').textContent=dark?'Dark':'Light';}

function pic(seed,w,h){return 'https://picsum.photos/seed/'+seed+'/'+w+'/'+h;}

/* ============ OVERVIEW ============ */
var kpiTop=[
  ['Total members','38,204','+312 this week'],
  ['Paying subscribers','9,860','25.8% conversion'],
  ['Monthly recurring','$214,500','+6.2% MoM'],
  ['Platform revenue (13%)','$48,200','this month'],
  ['Pending moderation','14','needs review'],
  ['Open campaigns','7','42 submissions']
];
document.getElementById('kpiTop').innerHTML=kpiTop.map(function(k){
  return '<div class="stat"><span class="st-label">'+k[0]+'</span><span class="st-val sm">'+k[1]+'</span><span class="st-sub">'+k[2]+'</span></div>';
}).join('');

var planDist=[['Basic',5210,53],['Pro',3490,35],['Advance',1160,12]];
document.getElementById('planDist').innerHTML=planDist.map(function(p){
  return '<div class="ebar"><div class="et"><span>'+p[0]+'</span><span class="ev">'+p[1].toLocaleString()+' · '+p[2]+'%</span></div><div class="ebar-track"><div class="ebar-fill" style="width:'+p[2]+'%"></div></div></div>';
}).join('');

var attention=[
  ['14 photos awaiting moderation','Marketplace queue','a-market'],
  ['Urban Nights — pick a winner','Contest in judging','a-contests'],
  ['12 campaign submissions to review','Voyagé · Wanderlust','a-campaigns'],
  ['8 payout requests pending','$2,140 total','a-payouts']
];
document.getElementById('attention').innerHTML=attention.map(function(a){
  return '<a class="row-item" data-go="'+a[2]+'" style="cursor:pointer"><div><div class="rt">'+a[0]+'</div><div class="rs">'+a[1]+'</div></div><span class="rv red">Review →</span></a>';
}).join('');

var adminAct=[
  ['New Pro subscriber','rafi.h · $29/mo','aa1'],
  ['Photo reported','“Night Bus” · copyright','aa2'],
  ['Campaign created','Linnex · Everyday Tech','aa3'],
  ['Payout approved','nadia.k · $120 → Stripe','aa4']
];
document.getElementById('adminActivity').innerHTML=adminAct.map(function(a){
  return '<div class="row-item"><img src="'+pic(a[2],80,80)+'" alt=""><div><div class="rt">'+a[0]+'</div><div class="rs">'+a[1]+'</div></div></div>';
}).join('');

/* ============ MEMBERS ============ */
document.getElementById('memberKpi').innerHTML=[
  ['Total members','38,204'],['Paying','9,860'],['New this month','1,204'],['Suspended / banned','37']
].map(function(k){return '<div class="stat"><span class="st-label">'+k[0]+'</span><span class="st-val sm">'+k[1]+'</span></div>';}).join('');

var members=[
  ['Ayesha Rahman','ayesha@mail.com','Pro','active','Active','Mar 2025','$4,820','m1'],
  ['Rafi Hasan','rafi.h@mail.com','Pro','active','Active','May 2026','$120','m2'],
  ['Nadia Karim','nadia.k@mail.com','Advance','active','Active','Jan 2026','$9,140','m3'],
  ['Samiul Islam','samiul@mail.com','Basic','active','Active','May 2026','$0','m4'],
  ['T. Roy','tania.r@mail.com','Basic','susp','Suspended','Apr 2026','$60','m5'],
  ['K. Ahmed','k.ahmed@mail.com','Pro','active','Active','Feb 2026','$2,310','m6']
];
document.getElementById('memberBody').innerHTML=members.map(function(m){
  return '<tr id="mem-'+m[7]+'" class="'+(m[3]==='susp'?'suspended':'')+'">'
    +'<td><div class="u"><img src="'+pic(m[7],64,64)+'" alt=""><div><div class="un">'+m[0]+'</div><div class="ue">'+m[1]+'</div></div></div></td>'
    +'<td>'+m[2]+'</td><td><span class="tg '+(m[3]==='susp'?'susp':'active')+'">'+m[4]+'</span></td><td class="mono" style="color:var(--muted)">'+m[5]+'</td>'
    +'<td class="r mono">'+m[6]+'</td>'
    +'<td><div class="act-row"><button class="act-btn go" onclick="alert(\'Opens member profile\')">View</button>'
    +'<button class="act-btn" onclick="toggleSuspend(\''+m[7]+'\',this)">'+(m[3]==='susp'?'Restore':'Suspend')+'</button>'
    +'<button class="act-btn danger" onclick="banMember(\''+m[7]+'\')">Ban</button></div></td></tr>';
}).join('');
function toggleSuspend(id,btn){
  var tr=document.getElementById('mem-'+id);var s=tr.classList.toggle('suspended');
  var pill=tr.querySelector('.tg');pill.className='tg '+(s?'susp':'active');pill.textContent=s?'Suspended':'Active';
  btn.textContent=s?'Restore':'Suspend';
}
function banMember(id){var tr=document.getElementById('mem-'+id);tr.classList.add('banned');setTimeout(function(){tr.style.display='none';},400);}

var planData=[
  {name:'Basic',price:9,storage:'10 GB',uploads:'50/mo',contests:false,campaigns:false},
  {name:'Pro',price:29,storage:'100 GB',uploads:'500/mo',contests:true,campaigns:true},
  {name:'Advance',price:79,storage:'1 TB',uploads:'unlimited',contests:true,campaigns:true}
];
function renderPlanManage(){
  document.getElementById('planManage').innerHTML=planData.map(function(p,i){
    return '<div class="pm-row" id="pm-'+i+'"><div><div class="pm-name">'+p.name+'</div><div class="pm-meta">'+p.storage+' · '+p.uploads+'</div></div>'
      +'<div class="pm-right"><div class="pm-price">$'+p.price+'</div><button class="pm-edit" onclick="openPlanForm('+i+')">Edit</button></div></div>';
  }).join('');
}
renderPlanManage();

/* ============ MARKETPLACE / MODERATION ============ */
document.getElementById('marketKpi').innerHTML=[
  ['Total photos','2.41M'],['Sales this month','18,402'],['GMV this month','$92,300'],['Flagged / pending','14']
].map(function(k){return '<div class="stat"><span class="st-label">'+k[0]+'</span><span class="st-val sm">'+k[1]+'</span></div>';}).join('');

var modCount=14;
var queue=[
  ['Night Bus','by rafi.h','flag','Copyright flag','q1'],
  ['Rooftop Dusk','by k.ahmed','pend','Pending review','q2'],
  ['Old Town','by ayesha','pend','Pending review','q3'],
  ['Market Noon','by samiul','rep','Reported','q4'],
  ['Pier 7','by nadia.k','pend','Pending review','q5'],
  ['Backstreet','by k.ahmed','flag','Copyright flag','q6'],
  ['Stairwell','by rafi.h','pend','Pending review','q7'],
  ['Harbor Dawn','by ayesha','pend','Pending review','q8']
];
document.getElementById('modGrid').innerHTML=queue.map(function(q){
  var isFlag=(q[2]==='flag'||q[2]==='rep');
  return '<div class="mod-card" id="'+q[4]+'">'
    +'<div class="mc-img"><img src="'+pic(q[4],400,300)+'" alt=""><span class="mc-reason '+(isFlag?'flag':'')+'">'+q[3]+'</span></div>'
    +'<div class="mc-meta"><b>'+q[0]+'</b>'+q[1]+'</div>'
    +'<div class="mc-actions"><button class="mc-approve" onclick="modResolve(\''+q[4]+'\',true)">✓ Approve</button>'
    +'<button class="mc-remove" onclick="modResolve(\''+q[4]+'\',false)">✗ Remove</button></div>'
    +'<div class="mc-state ok">Approved ✓</div></div>';
}).join('');
function modResolve(id,approve){
  var card=document.getElementById(id);
  if(approve){
    card.classList.add('done');
    var st=card.querySelector('.mc-state');st.className='mc-state ok';st.textContent='Approved ✓';
  }else{
    card.classList.add('done');
    var s2=card.querySelector('.mc-state');s2.className='mc-state rm';s2.textContent='Removed ✗';
    setTimeout(function(){card.classList.add('resolved');},700);
  }
  modCount=Math.max(0,modCount-1);
  document.getElementById('modCount').textContent=modCount;
  document.getElementById('navMod').textContent=modCount;
}

var topSell=[['Neon Alley','ayesha','Street','12.4k','$4,820','ts1'],['Misty Hills','nadia.k','Nature','9.8k','$3,610','ts2'],['Harbor Dawn','k.ahmed','Travel','7.1k','$2,540','ts3'],['Old Town','rafi.h','Architecture','5.5k','$1,980','ts4']];
document.getElementById('topSellBody').innerHTML=topSell.map(function(t){
  return '<tr><td><div class="u"><img src="'+pic(t[5],64,64)+'" alt=""><div class="un">'+t[0]+'</div></div></td><td>'+t[1]+'</td><td>'+t[2]+'</td><td class="r mono">'+t[3]+'</td><td class="r mono">'+t[4]+'</td></tr>';
}).join('');

/* ============ CONTESTS ============ */
document.getElementById('contestKpi').innerHTML=[
  ['Active contests','3'],['In judging','1'],['Total entries','1,204'],['Prize pool committed','$4,150']
].map(function(k){return '<div class="stat"><span class="st-label">'+k[0]+'</span><span class="st-val sm">'+k[1]+'</span></div>';}).join('');

var contests=[
  ['Urban Nights','Monthly','3 Jun','412','judging','Judging','$1,500'],
  ['Summer Vibes','Weekly','5 Jun','318','live','Live','$500'],
  ['Minimal Mornings','Weekly','8 Jun','206','live','Live','$350'],
  ['Faces of the City','Monthly','14 Jun','268','live','Live','$800'],
  ['Winter Light','Monthly','—','0','draft','Draft','$1,000']
];
document.getElementById('contestBody').innerHTML=contests.map(function(c){
  return '<tr><td style="font-weight:600">'+c[0]+'</td><td>'+c[1]+'</td><td class="mono" style="color:var(--muted)">'+c[2]+'</td>'
    +'<td class="r mono">'+c[3]+'</td><td><span class="tg '+c[4]+'">'+c[5]+'</span></td><td class="r mono">'+c[6]+'</td>'
    +'<td><div class="act-row"><button class="act-btn go" onclick="show(\'a-contests\')">'+(c[4]==='judging'?'Review':'Manage')+'</button></div></td></tr>';
}).join('');

var entries=Array.from({length:12},function(_,i){return 'en'+i;});
document.getElementById('entryGrid').innerHTML=entries.map(function(e){
  return '<div class="entry" id="'+e+'" onclick="cycleEntry(\''+e+'\')"><img src="'+pic(e,200,200)+'" alt=""><div class="badge"></div></div>';
}).join('');
function cycleEntry(id){
  var el=document.getElementById(id);
  if(el.classList.contains('winner')){el.classList.remove('winner');setWinnerLabel();return;}
  if(el.classList.contains('short')){
    document.querySelectorAll('.entry.winner').forEach(function(w){w.classList.remove('winner');});
    el.classList.remove('short');el.classList.add('winner');
  }else{el.classList.add('short');}
  setWinnerLabel();
}
function setWinnerLabel(){
  var w=document.querySelector('.entry.winner');
  document.getElementById('winnerLabel').textContent=w?('Entry '+(entries.indexOf(w.id)+1)+' — by creator'):'— none yet —';
}
function assignPrize(){
  var w=document.querySelector('.entry.winner');
  alert(w?'Prize of $1,500 assigned to the selected winner. Payout queued to their Stripe card.':'Pick a winner first — click an entry twice to mark it.');
}

/* ============ CAMPAIGNS ============ */
document.getElementById('campKpi').innerHTML=[
  ['Open campaigns','7'],['Submissions to review','42'],['Payout committed','$3,800'],['Brands onboarded','19']
].map(function(k){return '<div class="stat"><span class="st-label">'+k[0]+'</span><span class="st-val sm">'+k[1]+'</span></div>';}).join('');

var campaigns=[
  ['Voyagé Travel','Wanderlust 2026','$80 / photo','12','open','Open'],
  ['Linnex','Everyday Tech','$150 / photo','9','open','Open'],
  ['Maison Café','Morning Ritual','$500 fixed','7','review','Reviewing'],
  ['Skyline Realty','City Living','$120 / photo','14','open','Open'],
  ['Atlas & Co','Field Notes','$200 / photo','0','draft','Draft']
];
document.getElementById('campBody').innerHTML=campaigns.map(function(c){
  return '<tr><td style="font-weight:600">'+c[0]+'</td><td style="color:var(--ink-2)">'+c[1]+'</td><td class="mono">'+c[2]+'</td>'
    +'<td class="r mono">'+c[3]+'</td><td><span class="tg '+c[4]+'">'+c[5]+'</span></td>'
    +'<td><div class="act-row"><button class="act-btn go" onclick="show(\'a-campaigns\')">Review</button></div></td></tr>';
}).join('');

var accCount=0,accTotal=0;
var subs=Array.from({length:8},function(_,i){return 'sub'+i;});
document.getElementById('subGrid').innerHTML=subs.map(function(s,i){
  return '<div class="mod-card" id="'+s+'">'
    +'<div class="mc-img"><img src="'+pic(s,400,300)+'" alt=""><span class="mc-reason">by '+['ayesha','rafi.h','nadia.k','k.ahmed'][i%4]+'</span></div>'
    +'<div class="mc-meta"><b>Submission '+(i+1)+'</b>$80 if accepted</div>'
    +'<div class="mc-actions"><button class="mc-approve" onclick="subResolve(\''+s+'\',true)">✓ Accept</button>'
    +'<button class="mc-remove" onclick="subResolve(\''+s+'\',false)">✗ Reject</button></div>'
    +'<div class="mc-state ok">Accepted ✓ · $80</div></div>';
}).join('');
function subResolve(id,accept){
  var card=document.getElementById(id);card.classList.add('done');
  var st=card.querySelector('.mc-state');
  if(accept){st.className='mc-state ok';st.textContent='Accepted ✓ · $80';accCount++;accTotal+=80;
    document.getElementById('accCount').textContent=accCount;document.getElementById('accTotal').textContent='$'+accTotal;
  }else{st.className='mc-state rm';st.textContent='Rejected ✗';setTimeout(function(){card.classList.add('resolved');},700);}
}

/* ============ PAYOUTS ============ */
document.getElementById('payKpi').innerHTML=[
  ['Payouts due','$2,140'],['Paid this month','$31,200'],['Platform revenue (13%)','$48,200'],['Pending review','8']
].map(function(k){return '<div class="stat"><span class="st-label">'+k[0]+'</span><span class="st-val sm">'+k[1]+'</span></div>';}).join('');

var payouts=[
  ['Ayesha Rahman','Stripe virtual card','Jun 02','$340','p1'],
  ['Nadia Karim','Stripe virtual card','Jun 02','$120','p2'],
  ['K. Ahmed','Stripe virtual card','Jun 01','$510','p3'],
  ['Rafi Hasan','Stripe virtual card','May 31','$60','p4']
];
document.getElementById('payBody').innerHTML=payouts.map(function(p){
  return '<tr id="pay-'+p[4]+'"><td><div class="u"><img src="'+pic(p[4],64,64)+'" alt=""><div class="un">'+p[0]+'</div></div></td>'
    +'<td class="mono" style="color:var(--muted)">'+p[1]+'</td><td class="mono" style="color:var(--muted)">'+p[2]+'</td><td class="r mono" style="font-weight:700">'+p[3]+'</td>'
    +'<td><div class="act-row"><button class="act-btn go" onclick="approvePay(\''+p[4]+'\',this)">Approve</button></div></td></tr>';
}).join('');
function approvePay(id,btn){
  var row=btn.closest('td');row.innerHTML='<span class="tg" style="color:var(--ink)">Sent ✓</span>';
}

var feeBreak=[['Taxes & compliance','~5¢'],['Insurance','~3¢'],['Stripe merchant fee','~3¢'],['Platform operations','~2¢']];
document.getElementById('feeBreak').innerHTML=feeBreak.map(function(f){
  return '<div class="row-item" style="padding:8px 0"><div class="rt" style="font-weight:500;font-size:13px">'+f[0]+'</div><span class="rv mono" style="font-weight:400;color:var(--muted)">'+f[1]+'</span></div>';
}).join('');

/* ============ IMAGE FALLBACK ============ */
document.addEventListener('error',function(e){if(e.target&&e.target.tagName==='IMG'){e.target.style.background='var(--paper-2)';e.target.removeAttribute('src');}},true);

/* ============================================================
   MODAL SYSTEM + CREATE/EDIT FORMS
   ============================================================ */
var _submit=null;
function openModal(kicker,title,bodyHTML,submitLabel,onSubmit){
  document.getElementById('modalKicker').textContent=kicker;
  document.getElementById('modalTitle').textContent=title;
  document.getElementById('modalBody').innerHTML=bodyHTML;
  var sb=document.getElementById('modalSubmit');sb.textContent=submitLabel;
  _submit=onSubmit;
  document.getElementById('modal').classList.add('open');
}
function closeModal(){document.getElementById('modal').classList.remove('open');_submit=null;}
document.getElementById('modalSubmit').addEventListener('click',function(){if(_submit)_submit();});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeModal();});
function gv(id){var el=document.getElementById(id);return el?el.value.trim():'';}
function toggleChip(el){el.classList.toggle('on');}
function chips(containerId){return [].slice.call(document.querySelectorAll('#'+containerId+' .opt-chip.on')).map(function(c){return c.dataset.v;});}
function flashRow(tr){tr.classList.add('flash');setTimeout(function(){tr.classList.remove('flash');},1400);}

/* ---- CONTEST FORM ---- */
function openContestForm(){
  var body=''
   +'<div class="frow"><label>Contest title / theme</label><input class="fld" id="c-theme" placeholder="e.g. Urban Nights"></div>'
   +'<div class="fgrid"><div class="fr"><label>Type</label><select class="fld" id="c-type"><option>Weekly</option><option>Monthly</option></select></div>'
   +'<div class="fr"><label>Deadline</label><input class="fld" id="c-deadline" type="date"></div></div>'
   +'<div class="frow" style="margin-top:16px"><label>Rules &amp; description</label><textarea class="fld" id="c-desc" placeholder="What should entrants capture? Any restrictions?"></textarea></div>'
   +'<div class="fgrid"><div class="fr"><label>Prize amount (USD)</label><div class="frow-prefix"><span class="pfx">$</span><input class="fld" id="c-prize" type="number" placeholder="1500"></div></div>'
   +'<div class="fr"><label>Number of winners</label><input class="fld" id="c-winners" type="number" placeholder="3"></div></div>'
   +'<div class="frow" style="margin-top:16px"><label>Eligible tiers</label><div class="opt-row" id="c-tiers">'
   +'<span class="opt-chip" data-v="Basic" onclick="toggleChip(this)">Basic</span>'
   +'<span class="opt-chip on" data-v="Pro" onclick="toggleChip(this)">Pro</span>'
   +'<span class="opt-chip on" data-v="Advance" onclick="toggleChip(this)">Advance</span></div>'
   +'<div class="fhint">Basic is excluded from contests by default.</div></div>';
  openModal('New contest','Create a contest',body,'Create contest',function(){
    var theme=gv('c-theme')||'Untitled contest';
    var tr=document.createElement('tr');
    tr.innerHTML='<td style="font-weight:600">'+theme+'</td><td>'+gv('c-type')+'</td>'
      +'<td class="mono" style="color:var(--muted)">'+(gv('c-deadline')||'—')+'</td>'
      +'<td class="r mono">0</td><td><span class="tg draft">Draft</span></td>'
      +'<td class="r mono">$'+(gv('c-prize')||'0')+'</td>'
      +'<td><div class="act-row"><button class="act-btn go" onclick="show(\'a-contests\')">Manage</button></div></td>';
    var b=document.getElementById('contestBody');b.insertBefore(tr,b.firstChild);flashRow(tr);
    closeModal();
  });
}

/* ---- CAMPAIGN FORM ---- */
function openCampaignForm(){
  var body=''
   +'<div class="fgrid"><div class="fr"><label>Brand name</label><input class="fld" id="m-brand" placeholder="e.g. Voyagé Travel"></div>'
   +'<div class="fr"><label>Campaign title</label><input class="fld" id="m-title" placeholder="e.g. Wanderlust 2026"></div></div>'
   +'<div class="frow" style="margin-top:16px"><label>Brief / requirements</label><textarea class="fld" id="m-brief" placeholder="Style, mood, subjects the brand is looking for…"></textarea></div>'
   +'<div class="frow"><label>Style tags</label><input class="fld" id="m-tags" placeholder="travel, candid, asia (comma separated)"></div>'
   +'<div class="fgrid"><div class="fr"><label>Payout model</label><select class="fld" id="m-model"><option>Per photo</option><option>Fixed total</option></select></div>'
   +'<div class="fr"><label>Payout amount (USD)</label><div class="frow-prefix"><span class="pfx">$</span><input class="fld" id="m-amt" type="number" placeholder="80"></div></div></div>'
   +'<div class="frow" style="margin-top:16px"><label>Deadline</label><input class="fld" id="m-deadline" type="date"></div>'
   +'<div class="frow"><div class="fhint">No platform commission on accepted campaign photos for Pro &amp; Advance creators.</div></div>';
  openModal('New campaign','Create a brand campaign',body,'Create campaign',function(){
    var brand=gv('m-brand')||'New brand';
    var payTxt='$'+(gv('m-amt')||'0')+(gv('m-model')==='Fixed total'?' fixed':' / photo');
    var tr=document.createElement('tr');
    tr.innerHTML='<td style="font-weight:600">'+brand+'</td><td style="color:var(--ink-2)">'+(gv('m-title')||'Untitled')+'</td>'
      +'<td class="mono">'+payTxt+'</td><td class="r mono">0</td><td><span class="tg draft">Draft</span></td>'
      +'<td><div class="act-row"><button class="act-btn go" onclick="show(\'a-campaigns\')">Review</button></div></td>';
    var b=document.getElementById('campBody');b.insertBefore(tr,b.firstChild);flashRow(tr);
    closeModal();
  });
}

/* ---- ADD MEMBER FORM ---- */
var _memN=0;
function openMemberForm(){
  var body=''
   +'<div class="fgrid"><div class="fr"><label>Full name</label><input class="fld" id="u-name" placeholder="Jane Doe"></div>'
   +'<div class="fr"><label>Email</label><input class="fld" id="u-email" type="email" placeholder="jane@mail.com"></div></div>'
   +'<div class="fgrid" style="margin-top:16px"><div class="fr"><label>Plan</label><select class="fld" id="u-plan"><option>Basic</option><option>Pro</option><option>Advance</option></select></div>'
   +'<div class="fr"><label>Status</label><select class="fld" id="u-status"><option>Active</option><option>Suspended</option></select></div></div>'
   +'<div class="frow" style="margin-top:16px"><div class="fhint">An invite email with sign-in instructions will be sent to the member.</div></div>';
  openModal('New member','Add / invite a member',body,'Add member',function(){
    var name=gv('u-name')||'New member';var email=gv('u-email')||'member@mail.com';
    var plan=gv('u-plan');var st=gv('u-status');var susp=(st==='Suspended');
    var id='mnew'+(_memN++);
    var tr=document.createElement('tr');tr.id='mem-'+id;if(susp)tr.className='suspended';
    tr.innerHTML='<td><div class="u"><img src="https://picsum.photos/seed/'+id+'/64/64" alt=""><div><div class="un">'+name+'</div><div class="ue">'+email+'</div></div></div></td>'
      +'<td>'+plan+'</td><td><span class="tg '+(susp?'susp':'active')+'">'+st+'</span></td>'
      +'<td class="mono" style="color:var(--muted)">Jun 2026</td><td class="r mono">$0</td>'
      +'<td><div class="act-row"><button class="act-btn go" onclick="alert(\'Opens member profile\')">View</button>'
      +'<button class="act-btn" onclick="toggleSuspend(\''+id+'\',this)">'+(susp?'Restore':'Suspend')+'</button>'
      +'<button class="act-btn danger" onclick="banMember(\''+id+'\')">Ban</button></div></td>';
    var b=document.getElementById('memberBody');b.insertBefore(tr,b.firstChild);flashRow(tr);
    closeModal();
  });
}

/* ---- EDIT PLAN FORM ---- */
function openPlanForm(i){
  var p=planData[i];
  var body=''
   +'<div class="fgrid"><div class="fr"><label>Plan name</label><input class="fld" id="p-name" value="'+p.name+'"></div>'
   +'<div class="fr"><label>Monthly price (USD)</label><div class="frow-prefix"><span class="pfx">$</span><input class="fld" id="p-price" type="number" value="'+p.price+'"></div></div></div>'
   +'<div class="fgrid" style="margin-top:16px"><div class="fr"><label>Storage included</label><input class="fld" id="p-storage" value="'+p.storage+'"></div>'
   +'<div class="fr"><label>Upload limit</label><input class="fld" id="p-uploads" value="'+p.uploads+'"></div></div>'
   +'<div class="frow" style="margin-top:16px"><label>Access</label><div class="opt-row">'
   +'<span class="opt-chip'+(p.contests?' on':'')+'" id="p-contests" onclick="toggleChip(this)">Contests</span>'
   +'<span class="opt-chip'+(p.campaigns?' on':'')+'" id="p-campaigns" onclick="toggleChip(this)">Brand campaigns</span></div>'
   +'<div class="fhint">Commission stays a flat ~13% across all tiers — tiers differ by storage, limits and access.</div></div>';
  openModal('Edit plan','Edit '+p.name+' tier',body,'Save changes',function(){
    p.name=gv('p-name')||p.name;
    p.price=gv('p-price')||p.price;
    p.storage=gv('p-storage')||p.storage;
    p.uploads=gv('p-uploads')||p.uploads;
    p.contests=document.getElementById('p-contests').classList.contains('on');
    p.campaigns=document.getElementById('p-campaigns').classList.contains('on');
    renderPlanManage();
    var row=document.getElementById('pm-'+i);if(row)flashRow(row);
    closeModal();
  });
}

/* ---- CREATE NEW PLAN FORM ---- */
function openNewPlanForm(){
  var body=''
   +'<div class="fgrid"><div class="fr"><label>Plan name</label><input class="fld" id="p-name" placeholder="e.g. Studio"></div>'
   +'<div class="fr"><label>Monthly price (USD)</label><div class="frow-prefix"><span class="pfx">$</span><input class="fld" id="p-price" type="number" placeholder="49"></div></div></div>'
   +'<div class="frow" style="margin-top:16px"><label>Short description</label><input class="fld" id="p-desc" placeholder="Who is this tier for?"></div>'
   +'<div class="fgrid"><div class="fr"><label>Storage included</label><input class="fld" id="p-storage" placeholder="500 GB"></div>'
   +'<div class="fr"><label>Upload limit</label><input class="fld" id="p-uploads" placeholder="1000/mo or unlimited"></div></div>'
   +'<div class="frow" style="margin-top:16px"><label>Access</label><div class="opt-row">'
   +'<span class="opt-chip on" id="p-contests" onclick="toggleChip(this)">Contests</span>'
   +'<span class="opt-chip on" id="p-campaigns" onclick="toggleChip(this)">Brand campaigns</span></div>'
   +'<div class="fhint">Commission stays a flat ~13% across all tiers — new tiers differ by storage, limits and access.</div></div>';
  openModal('New plan','Create a plan tier',body,'Create plan',function(){
    planData.push({
      name:gv('p-name')||'New plan',
      price:gv('p-price')||'0',
      storage:gv('p-storage')||'—',
      uploads:gv('p-uploads')||'—',
      contests:document.getElementById('p-contests').classList.contains('on'),
      campaigns:document.getElementById('p-campaigns').classList.contains('on')
    });
    renderPlanManage();
    var row=document.getElementById('pm-'+(planData.length-1));if(row)flashRow(row);
    closeModal();
  });
}

/* ============ LEARNING CENTER (ADMIN) ============ */
var adminLrnData=[
  {id:'lrn1',title:'Getting Started with PhotoQuest',cat:'Getting Started',type:'video',duration:'8 min',required:true,desc:'An introduction to the platform — set up your profile, upload your first photo, and configure your payout method.',views:2840,seed:'lc1'},
  {id:'lrn2',title:'How to License Your Photos',cat:'Marketplace',type:'video',duration:'12 min',required:true,desc:'Walk through the licensing workflow — standard vs extended vs enterprise, pricing strategy, and how buyers find your work.',views:1920,seed:'lc2'},
  {id:'lrn3',title:'Copyright & IP Compliance',cat:'Compliance',type:'article',duration:'5 min read',required:true,desc:'Understand your rights and responsibilities as a content creator — what you can and cannot upload, model releases, and property rights.',views:3210,seed:'lc3'},
  {id:'lrn4',title:'Entering Contests — Rules & Strategy',cat:'Contests',type:'guide',duration:'6 min',required:false,desc:'How the weekly and monthly quests work, what judges look for, and how prize distribution works across tiers.',views:1540,seed:'lc4'},
  {id:'lrn5',title:'Brand Campaign Guidelines',cat:'Brand Campaigns',type:'video',duration:'15 min',required:true,desc:'Everything about applying to brand campaigns — brief interpretation, style expectations and payment timelines.',views:1180,seed:'lc5'},
  {id:'lrn6',title:'Tax & Payout Information',cat:'Compliance',type:'article',duration:'7 min read',required:true,desc:'Platform tax policy, USD earnings reporting, Stripe KYC requirements, and setting up your virtual card for withdrawals.',views:2670,seed:'lc6'},
  {id:'lrn7',title:'Optimising Your Portfolio',cat:'Marketplace',type:'guide',duration:'10 min',required:false,desc:'Tips for keyword strategy, folder organisation, pricing your work, and increasing discoverability in search results.',views:890,seed:'lc7'},
  {id:'lrn8',title:'AI Tagging Best Practices',cat:'Getting Started',type:'video',duration:'4 min',required:false,desc:'How to get the best results from smart auto-tagging — when to use it, how to edit suggestions, and managing AI-generated metadata.',views:740,seed:'lc8'}
];
var lrnCompRates={lrn1:78,lrn2:61,lrn3:84,lrn4:42,lrn5:38,lrn6:71,lrn7:29,lrn8:22};

function renderAdminLrn(data){
  var req=data.filter(function(i){return i.required;}).length;
  var avgComp=data.length?Math.round(data.reduce(function(s,i){return s+(lrnCompRates[i.id]||0);},0)/data.length):0;
  var nonComp=adminLrnData.filter(function(i){return i.required&&(lrnCompRates[i.id]||0)<100;}).length;
  document.getElementById('lrnAdminKpi').innerHTML=[
    ['Total content',data.length,'items in library'],
    ['Required items',req,'mandatory for creators'],
    ['Avg completion',avgComp+'%','across all creators'],
    ['Compliance issues',nonComp,'required items below 100%']
  ].map(function(k){return '<div class="stat"><span class="st-label">'+k[0]+'</span><span class="st-val sm">'+k[1]+'</span><span class="st-sub">'+k[2]+'</span></div>';}).join('');
  document.getElementById('lrnAdminCount').textContent=data.length+' item'+(data.length!==1?'s':'');
  document.getElementById('lrnAdminBody').innerHTML=data.map(function(item){
    var comp=lrnCompRates[item.id]||0;
    return '<tr>'
      +'<td style="font-weight:600">'+item.title+'</td>'
      +'<td><span class="chipm" style="font-size:10px;padding:3px 8px">'+item.cat+'</span></td>'
      +'<td class="mono" style="text-transform:uppercase;font-size:10px;color:var(--muted)">'+item.type+'</td>'
      +'<td class="mono" style="color:var(--muted)">'+item.duration+'</td>'
      +'<td>'+(item.required?'<span class="tg flag" style="font-size:9px">Required</span>':'<span class="tg" style="font-size:9px">Optional</span>')+'</td>'
      +'<td class="r mono">'+item.views.toLocaleString()+'</td>'
      +'<td class="r"><div style="display:flex;align-items:center;gap:8px;justify-content:flex-end">'
      +'<span class="mono" style="font-size:11px;color:var(--muted);width:32px">'+comp+'%</span>'
      +'<div style="width:64px;height:5px;background:var(--paper-2)"><div style="height:100%;background:var(--ink);width:'+comp+'%"></div></div>'
      +'</div></td>'
      +'<td><div class="act-row">'
      +'<button class="act-btn go" onclick="openEditLrnForm(\''+item.id+'\')">Edit</button>'
      +'<button class="act-btn lrn-req-toggle" id="lrt-'+item.id+'" onclick="toggleLrnRequired(\''+item.id+'\',this)">'+(item.required?'Make optional':'Make required')+'</button>'
      +'<button class="act-btn danger" onclick="deleteLrnItem(\''+item.id+'\')">Delete</button>'
      +'</div></td></tr>';
  }).join('');
  document.getElementById('lrnCompBars').innerHTML=data.map(function(item){
    var comp=lrnCompRates[item.id]||0;
    return '<div class="ebar"><div class="et"><span>'+item.title+(item.required?' <span style="font-family:var(--mono);font-size:9px;color:var(--red)">req</span>':'')+'</span><span class="ev">'+comp+'%</span></div>'
      +'<div class="ebar-track"><div class="ebar-fill" style="width:'+comp+'%"></div></div></div>';
  }).join('');
}

function adminLrnTab(type,el){
  document.querySelectorAll('#a-learning .seg button').forEach(function(b){b.classList.remove('on');});
  el.classList.add('on');
  var filtered=type==='all'?adminLrnData
    :type==='required'?adminLrnData.filter(function(i){return i.required;})
    :adminLrnData.filter(function(i){return i.type===type;});
  renderAdminLrn(filtered);
}

function toggleLrnRequired(id,btn){
  var item=adminLrnData.find(function(i){return i.id===id;});
  if(!item)return;
  item.required=!item.required;
  btn.textContent=item.required?'Make optional':'Make required';
  var row=btn.closest('tr');
  var cell=row.querySelector('td:nth-child(5)');
  cell.innerHTML=item.required?'<span class="tg flag" style="font-size:9px">Required</span>':'<span class="tg" style="font-size:9px">Optional</span>';
  var bar=document.querySelector('#lrnCompBars .ebar:nth-child('+( adminLrnData.indexOf(item)+1)+') .et span:first-child');
  if(bar)bar.innerHTML=item.title+(item.required?' <span style="font-family:var(--mono);font-size:9px;color:var(--red)">req</span>':'');
}

function deleteLrnItem(id){
  var idx=adminLrnData.findIndex(function(i){return i.id===id;});
  if(idx<0)return;
  var rows=document.getElementById('lrnAdminBody').querySelectorAll('tr');
  if(rows[idx]){rows[idx].style.opacity='0';rows[idx].style.transform='translateX(12px)';rows[idx].style.transition='.3s';}
  setTimeout(function(){adminLrnData.splice(idx,1);renderAdminLrn(adminLrnData);},320);
}

function lrnFormBody(item){
  var cats=['Getting Started','Marketplace','Contests','Brand Campaigns','Compliance'];
  return '<div class="frow"><label>Title</label><input class="fld" id="lf-title" value="'+(item.title||'')+'" placeholder="e.g. Copyright &amp; IP Compliance"></div>'
    +'<div class="fgrid"><div class="fr"><label>Category</label><select class="fld" id="lf-cat">'
    +cats.map(function(c){return '<option'+(item.cat===c?' selected':'')+'>'+c+'</option>';}).join('')
    +'</select></div>'
    +'<div class="fr"><label>Content type</label><select class="fld" id="lf-type">'
    +['video','article','guide'].map(function(t){return '<option'+(item.type===t?' selected':'')+'>'+t+'</option>';}).join('')
    +'</select></div></div>'
    +'<div class="frow" style="margin-top:16px"><label>Duration / read time</label><input class="fld" id="lf-dur" value="'+(item.duration||'')+'" placeholder="e.g. 8 min or 5 min read"></div>'
    +'<div class="frow"><label>Description</label><textarea class="fld" id="lf-desc" placeholder="What will creators learn from this?">'+(item.desc||'')+'</textarea></div>'
    +'<div class="frow"><label style="display:flex;align-items:center;gap:10px;cursor:pointer;text-transform:none;letter-spacing:0;font-size:13px"><input type="checkbox" id="lf-req"'+(item.required?' checked':'')+' style="width:16px;height:16px;flex-shrink:0"> Mark as required — gates features until completed</label></div>'
    +'<div class="fhint">Required items appear in the compliance strip and block certain platform actions until completed by the creator.</div>';
}

function openAddLrnForm(){
  openModal('New content','Add learning content',lrnFormBody({}),'Publish',function(){
    var newItem={id:'lrn_new_'+Date.now(),title:gv('lf-title')||'Untitled',cat:gv('lf-cat')||'Getting Started',type:gv('lf-type')||'video',duration:gv('lf-dur')||'5 min',required:document.getElementById('lf-req').checked,desc:gv('lf-desc')||'',views:0,seed:'lc'+(adminLrnData.length+1)};
    adminLrnData.unshift(newItem);
    lrnCompRates[newItem.id]=0;
    renderAdminLrn(adminLrnData);
    closeModal();
  });
}

function openEditLrnForm(id){
  var item=adminLrnData.find(function(i){return i.id===id;});
  if(!item)return;
  openModal('Edit content','Edit: '+item.title,lrnFormBody(item),'Save changes',function(){
    item.title=gv('lf-title')||item.title;
    item.cat=gv('lf-cat')||item.cat;
    item.type=gv('lf-type')||item.type;
    item.duration=gv('lf-dur')||item.duration;
    item.required=document.getElementById('lf-req').checked;
    item.desc=gv('lf-desc')||item.desc;
    renderAdminLrn(adminLrnData);
    closeModal();
  });
}

renderAdminLrn(adminLrnData);

/* ============ INIT ============ */
(function(){var h=location.hash.slice(1);var sc=['a-overview','a-members','a-market','a-contests','a-campaigns','a-payouts','a-learning'];show(sc.indexOf(h)>=0?h:'a-overview');}());
