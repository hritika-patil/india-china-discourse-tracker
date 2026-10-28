'use strict';
const DATA_URL='./data/records.json';
const CATEGORY_COLORS={'Government & CCP':'#315e68','Academia & think tanks':'#6d9088','State media':'#c4a279'};
const YEAR_DESCRIPTIONS={
 2019:['Chennai and the pre-crisis baseline','Diplomatic engagement coexisted with analytical concerns about the foundations of bilateral cooperation.'],
 2020:['Galwan and border confrontation','Border security dominated selected records; criticism of Indian decisions appeared alongside official calls for cooperation.'],
 2021:['Prolonged tensions and the Quad','Border management and India’s involvement in the Quad became salient themes in selected sources.'],
 2022:['Diplomatic contacts and autonomy','Source material discusses renewed dialogue and the limits of geopolitical alignment.'],
 2023:['BRICS and India’s international ambitions','Multilateral positioning and India’s independent strategic calculations feature in the selected sample.'],
 2024:['Kazan and bilateral re-engagement','Diplomatic rebuilding prompted positive prescriptions as well as caution about unresolved disputes.'],
 2025:['Tianjin and restoring exchanges','Official meetings were accompanied by discussion of the pace and conditions of rapprochement.'],
 2026:['New Delhi BRICS and the Global South','The pilot includes government and academic assessments; media coverage for this year has not yet been collected in the reviewed queue.']
};
const $=(id)=>document.getElementById(id);
function E(tag,className,text){const el=document.createElement(tag);if(className)el.className=className;if(text!==undefined && text!==null)el.textContent=String(text);return el;}
function safeLink(url){try{const a=new URL(url);return (a.protocol==='https:'||a.protocol==='http:')?a.href:null;}catch{return null;}}
function distinct(arr){return [...new Set(arr)].filter(x=>x!==null&&x!==undefined&&x!=='');}
function friendlyCategory(c){return c==='Government & CCP'?'Government & CCP':c==='Academia & think tanks'?'Academia & think tanks':c;}
function categoryClass(c){return c==='Government & CCP'?'government':c==='Academia & think tanks'?'academia':'media';}
function dateLabel(r){if(r.date && /^\d{4}-\d{2}-\d{2}$/.test(r.date)){
  const [y,m,d]=r.date.split('-').map(Number);return new Date(Date.UTC(y,m-1,d)).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'});
 }return r.date||String(r.year);}
function dateKey(r){return /^\d{4}-\d{2}-\d{2}$/.test(r.date||'')?r.date:`${r.year}-01-01`;}
function badge(c,label){return E('span','pill '+c,label);}
function sourceAnchor(r){const a=E('a','','View original ↗');const href=safeLink(r.sourceUrl);if(href){a.href=href;a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('aria-label',`Open original source: ${r.title}`);}else{a.removeAttribute('href');a.textContent='Source link unavailable';}return a;}
function createSourceCard(r){const card=E('article','source-card');const meta=E('div','source-meta');meta.append(badge(categoryClass(r.category),friendlyCategory(r.category)),badge('soft',String(r.year)),badge('soft',r.framing));card.append(meta);
 const title=E('h3','chinese-title',r.title);card.append(title);
 card.append(E('p','source-identity',`${r.institution} · ${r.attributedVoice} · ${dateLabel(r)}`));
 card.append(E('p','source-deck',r.interpretation));
 if(r.anchor){const original=E('div','source-anchor');original.append(E('strong','', 'Source anchor: '),document.createTextNode(r.anchor));card.append(original);}
 if(r.caveat){const caveat=E('div','source-caveat');caveat.append(E('strong','','Research note: '),document.createTextNode(r.caveat));card.append(caveat);}
 const footer=E('div','source-bottom');footer.append(E('span','',`${r.topic} · ${r.id}`),sourceAnchor(r));card.append(footer);return card;}
function nav(){const b=document.querySelector('.menu-toggle'), links=document.querySelector('.nav-links');if(!b||!links)return;b.addEventListener('click',()=>{const opened=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',String(!opened));links.classList.toggle('open',!opened);});}
function renderOverview(records){const years=distinct(records.map(r=>r.year)),cats=distinct(records.map(r=>r.category));$('metric-sources').textContent=String(records.length);$('metric-years').textContent=String(years.length);$('metric-categories').textContent=String(cats.length);
 const yearsEl=$('year-chart');const maxCount=Math.max(1,...years.map(y=>records.filter(r=>r.year===y).length));
 years.sort((a,b)=>a-b).forEach(year=>{const items=records.filter(r=>r.year===year);const line=E('div','bar-line');line.append(E('span','bar-year',year));const bar=E('div','bar-stack');for(const category of Object.keys(CATEGORY_COLORS)){const n=items.filter(r=>r.category===category).length;const seg=E('span');seg.style.width=`${100*n/maxCount}%`;seg.style.background=CATEGORY_COLORS[category];seg.title=`${year}: ${n} ${category} records`;bar.append(seg);}line.append(bar,E('span','bar-total',items.length));yearsEl.append(line);});
 const topics=new Map();records.forEach(r=>topics.set(r.topic,(topics.get(r.topic)||0)+1));const ordered=[...topics].sort((a,b)=>b[1]-a[1]).slice(0,7);const max=Math.max(1,...ordered.map(x=>x[1]));ordered.forEach(([topic,count])=>{const row=E('div','topic-row'),label=E('div','topic-label');label.append(E('span','',topic),E('span','',count));const track=E('div','topic-track'),bar=E('span');bar.style.width=`${100*count/max}%`;track.append(bar);row.append(label,track);$('topic-chart').append(row);});
 const featured=[2019,2020,2025].map(y=>records.find(r=>r.year===y)).filter(Boolean);featured.forEach(r=>{const card=E('article','feature-card');const meta=E('div','feature-top');meta.append(E('span','',r.year),E('span','','•'),E('span','',r.category));card.append(meta,E('h3','',r.title),E('p','',r.interpretation));const bottom=E('div','feature-bottom');bottom.append(E('span','',r.topic),sourceAnchor(r));card.append(bottom);$('featured-sources').append(card);});
}
function opt(select,v){const option=E('option','',String(v));option.value=String(v);select.append(option);}
function renderExplore(records){const yr=$('filter-year'),category=$('filter-category'),topic=$('filter-topic'),frame=$('filter-frame'),search=$('search-input'),sort=$('sort-records');
 distinct(records.map(r=>r.year)).sort((a,b)=>a-b).forEach(y=>opt(yr,y));distinct(records.map(r=>r.category)).sort().forEach(c=>opt(category,c));distinct(records.map(r=>r.topic)).sort().forEach(t=>opt(topic,t));distinct(records.map(r=>r.framing)).sort().forEach(f=>opt(frame,f));
 const query=new URLSearchParams(location.search);const c=query.get('category');if(c&&[...category.options].some(o=>o.value===c))category.value=c;
 let current=[];
 function refresh(){const term=search.value.trim().toLocaleLowerCase();current=records.filter(r=>(yr.value==='all'||String(r.year)===yr.value)&&(category.value==='all'||r.category===category.value)&&(topic.value==='all'||r.topic===topic.value)&&(frame.value==='all'||r.framing===frame.value)&&(!term||[r.title,r.attributedVoice,r.institution,r.interpretation,r.anchor,r.topic,r.framing].some(s=>String(s||'').toLocaleLowerCase().includes(term))));
 current.sort((a,b)=>sort.value==='oldest'?dateKey(a).localeCompare(dateKey(b)):sort.value==='year'?(a.year-b.year||a.id.localeCompare(b.id)):dateKey(b).localeCompare(dateKey(a)));
 $('result-count').textContent=String(current.length);$('result-description').textContent=`of ${records.length} reviewed records`;
 const area=$('source-results');area.replaceChildren();if(!current.length){const empty=E('div','empty-state');empty.append(E('h3','','No records match these filters.'),E('p','','Try a different year, issue or search term.'));area.append(empty);}else current.forEach(r=>area.append(createSourceCard(r)));
 }
 [search,yr,category,topic,frame,sort].forEach(el=>el.addEventListener(el===search?'input':'change',refresh));$('reset-filters').addEventListener('click',()=>{search.value='';[yr,category,topic,frame].forEach(el=>el.value='all');sort.value='newest';history.replaceState(null,'',location.pathname);refresh();});
 $('export-csv').addEventListener('click',()=>{const keys=['id','year','date','category','institution','attributedVoice','title','topic','framing','anchor','interpretation','sourceUrl','caveat'];const quote=v=>'"'+String(v??'').replace(/"/g,'""')+'"';const csv='\uFEFF'+keys.map(quote).join(',')+'\r\n'+current.map(r=>keys.map(k=>quote(r[k])).join(',')).join('\r\n');const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob);const a=E('a');a.href=url;a.download='india-china-discourse-filtered.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);});refresh();}
function renderTimeline(records){const root=$('timeline-list');for(let year=2019;year<=2026;year++){const rr=records.filter(r=>r.year===year),[title,deck]=YEAR_DESCRIPTIONS[year]||['Historical context',''];const block=E('section','timeline-year'),top=E('div','timeline-top'),info=E('div');info.append(E('h2','',year),E('h3','',title),E('p','',deck));top.append(info,E('span','timeline-count',`${rr.length} pilot record${rr.length===1?'':'s'}`));block.append(top);const sources=E('div','timeline-sources');rr.slice(0,5).forEach(r=>{const line=E('div','timeline-source'),dot=E('i','cat-dot');dot.style.background=CATEGORY_COLORS[r.category]||'#829';line.append(dot);const a=sourceAnchor(r);a.textContent=r.title;line.append(a,E('small','',r.category));sources.append(line);});block.append(sources);const more=E('a','timeline-bottom',rr.length>5?`See all ${rr.length} records →`:'Browse with filters →');more.href=`./explore.html?year=${year}`;block.append(more);root.append(block);}}
async function start(){nav();const page=document.body.dataset.page;if(!['overview','explore','timeline'].includes(page))return;try{const response=await fetch(DATA_URL,{cache:'no-cache'});if(!response.ok)throw new Error(`HTTP ${response.status}`);const result=await response.json();if(!Array.isArray(result.records))throw new Error('Invalid data');const records=result.records.filter(r=>r&&r.id&&r.sourceUrl);if(page==='overview')renderOverview(records);if(page==='explore')renderExplore(records);if(page==='timeline')renderTimeline(records);
 // Support deep linking from the timeline, without a build system or server routing.
 if(page==='explore'){const wantedYear=new URLSearchParams(location.search).get('year');const year=$('filter-year');if(wantedYear&&[...year.options].some(o=>o.value===wantedYear)){year.value=wantedYear;year.dispatchEvent(new Event('change'));}}
}catch(error){console.error('Tracker loading failed',error);const root=page==='overview'?$('featured-sources'):page==='explore'?$('source-results'):$('timeline-list');if(root){const warning=E('div','empty-state');warning.append(E('h3','','Unable to load the research data'),E('p','','Serve the site over HTTP or HTTPS rather than opening its HTML files directly. Check that data/records.json is present.'));root.append(warning);}}}
document.addEventListener('DOMContentLoaded',start);
