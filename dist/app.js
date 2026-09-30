(() => {
  'use strict';
  const $ = (q, el = document) => el.querySelector(q);
  const $$ = (q, el = document) => [...el.querySelectorAll(q)];
  const fmt = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 1 });
  const journeyNotes = [
    'Un reel útil, una recomendación o una búsqueda. El primer contacto debe llevar a algo más.',
    'Tu contenido y tu oferta dan contexto. La consulta encuentra una respuesta clara.',
    'Una reserva, una llamada o una propuesta: el siguiente paso depende de lo que vendes.',
    'Vemos de dónde llegan las consultas y qué oportunidades generan. Después, ajustamos.'
  ];
  $$('.journey-node').forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.journey);
    $$('.journey-node').forEach(b => { const selected = b === button; b.classList.toggle('active', selected); b.setAttribute('aria-pressed', String(selected)); });
    $('#journey-text').textContent = journeyNotes[index];
  }));
  const scenes = {
    beauty: [
      ['UN MENSAJE AL CERRAR', '«Hola, ¿cuánto cuesta una limpieza facial?»', 'La consulta llega a las 23:04. El primer paso es recogerla y orientar.'],
      ['UNA RESPUESTA CON UN SIGUIENTE PASO', '«Te contamos el servicio y puedes ver los horarios disponibles aquí.»', 'Una respuesta con el tono del negocio y acceso directo a la agenda.'],
      ['UNA RESERVA CON MENOS VUELTAS', 'Elige una hora. Recibe la confirmación.', 'La conversación tiene un siguiente paso claro. El recordatorio se acuerda contigo.']
    ],
    physio: [
      ['UNA NECESIDAD CONCRETA', '«Fisioterapia cerca de mí.»', 'Una ficha completa conecta esa búsqueda con la información de tu clínica.'],
      ['INFORMACIÓN QUE AYUDA A ELEGIR', 'Quién te atiende, qué servicios ofrece y cómo pedir cita.', 'La web resuelve las dudas habituales antes de entrar en la agenda.'],
      ['UN CAMINO CLARO A LA CITA', 'Reservar, confirmar y saber dónde acudir.', 'Una reserva visible y una confirmación sencilla. No se solicitan datos clínicos en estos ejemplos.']
    ]
  };
  $$('.example-card').forEach(card => {
    $$('.example-path button', card).forEach(button => button.addEventListener('click', () => {
      const scene = scenes[card.dataset.example][Number(button.dataset.exampleStep)];
      $$('.example-path button', card).forEach(b => { const selected = b === button; b.classList.toggle('active', selected); b.setAttribute('aria-pressed', String(selected)); });
      $('.scene-type', card).textContent = scene[0]; $('.scene-text', card).textContent = scene[1]; $('.scene-explanation', card).textContent = scene[2];
    }));
  });
  const menu = $('.menu-toggle');
  const audienceExamples = {
    personal: ['CONSULTORÍA · REEL EDUCATIVO', '«No te faltan ideas.\nTe falta una dirección.»', 'Un problema real. Tu criterio. Un siguiente paso.', 'Un contenido que responde a la duda de tu cliente ideal, no a todo el mundo.', 'Tu método, tu experiencia y una oferta que se entiende en tu perfil y en tu web.', 'Del enlace de tu bio a una consulta o llamada. Después, seguimiento y propuesta.'],
    local: ['NEGOCIO LOCAL · REEL DE SERVICIO', '«Así elegimos el tratamiento\nque tu piel necesita.»', 'Tu servicio. Una duda frecuente. Una reserva.', 'Un vídeo que explica tu servicio a personas que pueden visitar tu negocio.', 'Tu equipo, tu espacio y reseñas reales que ayudan a elegir con confianza.', 'Del perfil a WhatsApp o a tu agenda. Una respuesta clara para convertir la consulta en cita.']
  };
  const audienceTabs = $$('[data-audience]');
  function setAudience(tab) {
    audienceTabs.forEach(button => { const active = button === tab; button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1; });
    $('#audience-example').setAttribute('aria-labelledby', tab.id);
    ['#content-category', '#content-hook', '#content-format', '#flow-attract', '#flow-trust', '#flow-convert'].forEach((selector, index) => { $(selector).textContent = audienceExamples[tab.dataset.audience][index]; });
    document.dispatchEvent(new CustomEvent('ratio:example-change'));
  }
  audienceTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setAudience(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') next = 1 - index;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = 1;
      if (next !== undefined) { event.preventDefault(); setAudience(audienceTabs[next]); audienceTabs[next].focus(); }
    });
  });
  function closeMenu() { menu.setAttribute('aria-expanded', 'false'); $('#navigation').classList.remove('is-open'); menu.setAttribute('aria-label', 'Abrir menú'); }
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); $('#navigation').classList.toggle('is-open', open); menu.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú'); });
  $$('#navigation a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', e => { if (!e.target.closest('.nav')) closeMenu(); });
  const months = [
    {name:'Agosto', messages:52, appointments:13, reviews:3, weeks:[2,3,3,5], decision:'Revisar el recorrido desde la ficha de Google hasta la reserva.'},
    {name:'Septiembre', messages:60, appointments:20, reviews:5, weeks:[3,4,6,7], decision:'Hacer más visible la reserva en el móvil.'},
    {name:'Octubre', messages:64, appointments:29, reviews:7, weeks:[5,6,8,10], decision:'Facilitar la reserva a quienes escriben después de cerrar.'}
  ];
  function setMonth(index) {
    const m = months[index];
    $('#panel-citas').textContent = m.appointments; $('#panel-total').textContent = m.appointments; $('#panel-mensajes').textContent = m.messages; $('#panel-reviews').textContent = m.reviews; $('#panel-ratio').textContent = `${fmt.format(m.messages / m.appointments)} : 1`; $('#panel-decision').textContent = m.decision;
    const xs = [12,142,276,410], ys=m.weeks.map(v => 106 - v * 8.7);
    const line = xs.map((x,i) => `${i?'L':'M'}${x} ${ys[i]}`).join('');
    $('#chart-line').setAttribute('d',line); $('#chart-area').setAttribute('d',`${line}V106H12Z`); $('#chart-dot').setAttribute('cy',String(ys[3])); $('.chart').setAttribute('aria-label',`Ejemplo: citas por semana. ${m.name}: ${m.weeks.join(', ')} citas.`);
    $$('.month-tabs button').forEach(b => {const active=Number(b.dataset.month)===index;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
    document.dispatchEvent(new CustomEvent('ratio:month-change'));
  }
  $$('.month-tabs button').forEach(b => b.addEventListener('click',() => setMonth(Number(b.dataset.month))));
  setMonth(2);
  const serviceTabs = $$('.service-tab');
  function setService(index, focus=false) {
    serviceTabs.forEach((tab,i) => {const active=i===index; tab.classList.toggle('active',active);tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;$('.service-symbol',tab).textContent=active?'−':'+'; $(`#service-${i}`).hidden=!active;});
    if(focus) serviceTabs[index].focus();
    document.dispatchEvent(new CustomEvent('ratio:service-change', { detail: { index } }));
  }
  serviceTabs.forEach((tab,i) => {
    tab.addEventListener('click',()=>setService(i));
    tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowDown'||e.key==='ArrowRight')next=(i+1)%4;else if(e.key==='ArrowUp'||e.key==='ArrowLeft')next=(i+3)%4;else if(e.key==='Home')next=0;else if(e.key==='End')next=3;if(next!==undefined){e.preventDefault();setService(next,true);}});
  });
  let selectedTime = '10:00';
  $$('.time-options button').forEach(b=>b.addEventListener('click',()=>{selectedTime=b.textContent;$$('.time-options button').forEach(t=>{const chosen=t===b;t.classList.toggle('chosen',chosen);t.setAttribute('aria-pressed',String(chosen));});}));
  $('#demo-book').addEventListener('click',()=>{$('.booking-result').hidden=false;$('#booking-feedback').textContent=`Hora de ejemplo: ${selectedTime}. No se ha creado una cita real.`;$('#demo-book').hidden=true;$('.time-options').hidden=true;});
  $('#demo-reset').addEventListener('click',()=>{$('.booking-result').hidden=true;$('#demo-book').hidden=false;$('.time-options').hidden=false;$('#demo-book').focus();});
  const messages=$('#messages'),appointments=$('#appointments');
  function updateRatio(){const m=Number(messages.value);appointments.max=String(m);if(Number(appointments.value)>m)appointments.value=String(m);const a=Number(appointments.value),r=m/a;$('#messages-value').textContent=m;$('#appointments-value').textContent=a;$('#ratio-output').textContent=fmt.format(r);$('#ratio-description').textContent=`${fmt.format(r)} ${r===1?'mensaje':'mensajes'} por cada cita.`;$('#messages-bar').style.width=`${m}%`;$('#appointments-bar').style.width=`${a}%`;$('#messages-bar-value').textContent=m;$('#appointments-bar-value').textContent=a;$('.ratio-bars').setAttribute('aria-label',`Ejemplo: ${m} mensajes y ${a} citas. Ratio ${fmt.format(r)} a 1.`);[messages,appointments].forEach(input=>{const progress=(Number(input.value)-Number(input.min))/(Number(input.max)-Number(input.min)||1)*100;input.style.setProperty('--progress',`${progress}%`);});}
  [messages,appointments].forEach(input=>input.addEventListener('input',updateRatio));updateRatio();
  $$('.price-toggle button').forEach(b=>b.addEventListener('click',()=>{const founder=b.dataset.price==='founder';$$('.price-toggle button').forEach(t=>{const active=t===b;t.classList.toggle('active',active);t.setAttribute('aria-pressed',String(active));});$('#setup-price').replaceChildren(document.createTextNode(founder?'990':'1.490'));const currency=document.createElement('span');currency.textContent=' €';$('#setup-price').append(currency);$('#price-description').textContent=founder?'Para los 3 primeros proyectos, a cambio de documentar el caso con cifras reales y con tu permiso.':'El precio de montaje habitual. El mismo recorrido completo y la misma cuota mensual.';}));
  const form=$('#audit-form'),dialog=$('#request-dialog'),requestText=$('#request-text');
  const phone=String(window.RATIO_CONFIG?.whatsapp||'').replace(/\D/g,'');
  const configuredPhone=phone.length>=8&&phone.length<=15&&phone!=='34600000000';
  if(configuredPhone){$('#audit-submit').firstChild.textContent='Continuar por WhatsApp ';$('#form-note').textContent='Se abre WhatsApp con tu mensaje listo. Esta web no guarda tus datos.';}
  function showError(message){$('#form-error').textContent=message;$('#form-error').hidden=false;}
  form.addEventListener('submit',e=>{
    e.preventDefault();$('#form-error').hidden=true;if(!form.reportValidity())return;
    const data=new FormData(form),name=String(data.get('name')).trim(),business=String(data.get('business')).trim(),link=String(data.get('link')).trim();
    if(!name||!business||!link){showError('Añade tu nombre, tu negocio o marca y un enlace para preparar la auditoría.');return;}
    const message=`¡Kaixo, Nicolás! Soy ${name}, de ${business} (${data.get('sector')}). Me gustaría solicitar la auditoría gratuita.\n\nMi objetivo: ${data.get('goal')}\nMi Instagram o web: ${link}\n\nGracias.`;
    if(configuredPhone){window.location.href=`https://wa.me/${phone}?text=${encodeURIComponent(message)}`;return;}
    requestText.value=message;$('#request-status').textContent='Preparar este mensaje no envía una solicitud.';$('#copy-request').firstChild.textContent='Copiar solicitud ';dialog.showModal();
  });
  $('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))dialog.close();});
  $('#copy-request').addEventListener('click',async()=>{
    try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(requestText.value);else{requestText.focus();requestText.select();if(!document.execCommand('copy'))throw new Error('copy');}$('#request-status').textContent='Mensaje copiado. Ya puedes pegarlo y compartirlo.';$('#copy-request').firstChild.textContent='Solicitud copiada ';}catch{$('#request-status').textContent='Selecciona el texto para copiarlo o descárgalo.';requestText.focus();requestText.select();}
  });
  $('#download-request').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([requestText.value],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='solicitud-auditoria-ratio.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('#request-status').textContent='Solicitud descargada. Aún no se ha enviado.';});
})();
