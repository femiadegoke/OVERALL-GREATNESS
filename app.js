const menu=document.querySelector('.menu'),nav=document.querySelector('nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');nav.classList.remove('open')}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});
nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus()}});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button))});document.querySelectorAll('[data-age]').forEach(card=>card.hidden=button.dataset.filter!=='all'&&card.dataset.age!==button.dataset.filter)}));
document.querySelectorAll('[data-programme]').forEach(a=>a.addEventListener('click',()=>{document.querySelector('#programme').value=a.dataset.programme}));
const dateInput=document.querySelector('#booking-date');
const londonDate=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/London',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
dateInput.min=londonDate();
const timeInput=document.querySelector('#booking-time');
const availabilityHint=document.querySelector('#availability-hint');
function validateSession(){
 const conflict=sessionConflict(dateInput.value,timeInput.value);
 timeInput.setCustomValidity(conflict);
 availabilityHint.textContent=conflict;
 return !conflict;
}
dateInput.addEventListener('input',validateSession);
timeInput.addEventListener('input',validateSession);
dateInput.addEventListener('change',validateSession);
timeInput.addEventListener('change',validateSession);
document.querySelector('form').addEventListener('submit',e=>{
 e.preventDefault();const result=document.querySelector('#result');dateInput.min=londonDate();
 if(dateInput.value<dateInput.min){dateInput.setCustomValidity('Choose today or a future date.');dateInput.reportValidity();return;}
 dateInput.setCustomValidity('');
 if(!validateSession()){timeInput.reportValidity();return;}
 const choice=document.querySelector('#programme').value;
 const dateLabel=new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric'}).format(new Date(dateInput.value+'T12:00:00'));
 const time=document.querySelector('#booking-time').value;
 const focus=document.querySelector('[name="focus"]').value.trim();

 const summary=choice+' · '+dateLabel+' at '+time+' (UK time) · 1 hour · £25 · St Mary Cray / Orpington.';
 result.replaceChildren();
 const message=document.createElement('span');message.textContent='Your request: '+summary+' Open your email app using the link below, then press Send. We will reply to confirm availability and the exact venue. No session is reserved yet.';
 const email=document.createElement('a');email.className='button';email.textContent='Open email to send request ↗';
 const body=['Hello Overall Greatness,','I would like to request a coaching session.','Coaching: '+choice,'Preferred date: '+dateLabel,'Preferred time: '+time+' (UK time)','Duration: 1 hour','Rate: £25 per hour','Area: St Mary Cray / Orpington, Bromley','Development focus: '+(focus||'To discuss'),'Please confirm availability and the exact venue.','My name: ','Player age: '].join('\n');
 email.href='mailto:overallgreatnessacademy@gmail.com?subject='+encodeURIComponent('OG coaching request — '+choice)+'&body='+encodeURIComponent(body);
 result.append(message,email);result.focus();
});
dateInput.addEventListener('input',()=>dateInput.setCustomValidity(''));
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08});document.querySelectorAll('.section-head,.principles article').forEach(el=>{el.classList.add('reveal');observer.observe(el)})}
document.querySelector('form').addEventListener('input',()=>{document.querySelector('#result').textContent=''});
document.querySelector('form').addEventListener('change',()=>{document.querySelector('#result').textContent=''});
document.querySelectorAll('[data-programme]').forEach(a=>a.addEventListener('click',()=>{document.querySelector('#result').textContent=''}));
