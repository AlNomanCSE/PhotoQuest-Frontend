/* ============ STEP ROUTING ============ */
var subByStep={
  welcome:'Welcome', signin:'Welcome back', role:'Create your account', 'signup-creator':'Create your account',
  'signup-buyer':'Create your account','signup-brand':'Create your account',
  verify:'Confirm your email','twofa':'Secure sign-in',
  'onboard-plan':'Set up your studio','onboard-payout':'Set up your studio',
  'onboard-payment':'Set up your account','onboard-profile':'Set up your brand',
  forgot:'Account recovery',reset:'Account recovery',admin:'Internal access',success:'All set'
};
function goStep(id){
  document.querySelectorAll('.step').forEach(function(s){s.classList.toggle('active',s.id===id);});
  var sel=document.getElementById('stepNav');if(sel&&sel.value!==id)sel.value=id;
  document.querySelector('.auth-body').scrollTop=0;window.scrollTo({top:0});
  history.replaceState(null,'','#'+id);
}

/* ============ PASSWORD SHOW/HIDE ============ */
function togglePw(id,btn){
  var el=document.getElementById(id);var show=el.type==='password';
  el.type=show?'text':'password';btn.textContent=show?'hide':'show';
}

/* ============ ROLE SELECT ============ */
var currentRole='creator';
function selectRole(role,el){
  currentRole=role;
  document.querySelectorAll('.role-card').forEach(function(c){c.classList.remove('sel');});
  el.classList.add('sel');
}
function continueRole(){
  if(currentRole==='creator')goStep('signup-creator');
  else if(currentRole==='buyer')goStep('signup-buyer');
  else goStep('signup-brand');
}

/* ============ AFTER VERIFY → role-based onboarding ============ */
function afterVerify(){
  adminFlow=false;
  if(currentRole==='creator')goStep('onboard-plan');
  else if(currentRole==='buyer')goStep('onboard-payment');
  else goStep('onboard-profile');
}

/* ============ CODE INPUTS (auto-advance) ============ */
function wireCode(containerId){
  var boxes=[].slice.call(document.querySelectorAll('#'+containerId+' .code-box'));
  boxes.forEach(function(b,i){
    b.addEventListener('input',function(){
      b.value=b.value.replace(/[^0-9]/g,'').slice(0,1);
      if(b.value&&boxes[i+1])boxes[i+1].focus();
    });
    b.addEventListener('keydown',function(e){
      if(e.key==='Backspace'&&!b.value&&boxes[i-1])boxes[i-1].focus();
    });
  });
}
wireCode('verifyCode');wireCode('twofaCode');

/* ============ PLAN PICKER ============ */
var authPlans=[
  {name:'Basic',meta:'10 GB · 50 uploads/mo',mo:9,yr:90},
  {name:'Pro',meta:'100 GB · 500 uploads/mo · contests + campaigns',mo:29,yr:290},
  {name:'Advance',meta:'1 TB · unlimited · priority',mo:79,yr:790}
];
var planBill='mo',planSel=1;
function renderPlanPick(){
  document.getElementById('planPick').innerHTML=authPlans.map(function(p,i){
    var price=planBill==='mo'?p.mo:Math.round(p.yr/12);
    return '<div class="pp'+(i===planSel?' sel':'')+'" onclick="pickPlan('+i+')">'
      +'<div><div class="pp-name">'+p.name+'</div><div class="pp-meta">'+p.meta+'</div></div>'
      +'<div class="pp-price">$'+price+'<small>/mo</small></div></div>';
  }).join('');
}
function pickPlan(i){planSel=i;renderPlanPick();}
function planCycle(b,el){planBill=b;document.querySelectorAll('#onboard-plan .seg button').forEach(function(x){x.classList.remove('on');});el.classList.add('on');renderPlanPick();}

/* ============ SUCCESS COPY by role ============ */
var _goSuccess=goStep;
goStep=function(id){
  _goSuccess(id);
  if(id==='success'){
    var t=document.getElementById('successTitle'),l=document.getElementById('successLead');
    if(currentRole==='buyer'){t.textContent='Welcome aboard.';l.textContent='Your buyer account is ready — start licensing photos.';}
    else if(currentRole==='brand'){t.textContent='Submitted for review.';l.textContent='We’ll verify your company shortly. You can start drafting campaigns now.';}
    else{t.textContent='You’re in.';l.textContent='Your creator studio is ready. Upload your first photos and start earning.';}
  }
};

/* ============ INIT ============ */
renderPlanPick();
(function(){var h=location.hash.slice(1);var valid=Object.keys(subByStep);goStep(valid.indexOf(h)>=0?h:'welcome');}());


/* ============ CROSS-APP LINKS (combined frontend) ============ */
var adminFlow=false;
function adminContinue(){adminFlow=true;goStep('twofa');}
function verify2fa(){ if(adminFlow){location.href='../admin/';} else { goStep('success'); } }
function openApp(){ location.href='../app/'; }
