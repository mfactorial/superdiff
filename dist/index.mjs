var u={ADDED:"added",EQUAL:"equal",DELETED:"deleted",UPDATED:"updated"},d={...u,MOVED:"moved"},c={BASIC:"basic",DEEP:"deep"};function p(t,e,f={ignoreArrayOrder:!1}){return typeof t!=typeof e?!1:Array.isArray(t)?t.length!==e.length?!1:f.ignoreArrayOrder?t.every(r=>e.some(s=>JSON.stringify(s)===JSON.stringify(r))):t.every((r,s)=>JSON.stringify(r)===JSON.stringify(e[s])):typeof t=="object"?JSON.stringify(t)===JSON.stringify(e):t===e}function l(t){return !!t&&typeof t=="object"&&!Array.isArray(t)}function b(t,e={statuses:[],granularity:c.BASIC}){let{statuses:f,granularity:r}=e;return t.reduce((s,i)=>{if(r===c.DEEP&&i.subPropertiesDiff){let n=b(i.subPropertiesDiff,e);if(n.length>0)return [...s,{...i,subPropertiesDiff:n}]}if(r===c.DEEP&&i.subDiff){let n=b(i.subDiff,e);if(n.length>0)return [...s,{...i,subDiff:n}]}return f.includes(i.status)?[...s,i]:s},[])}function E(t){return t.some(e=>e.status!==u.EQUAL)?u.UPDATED:u.EQUAL}function A(t,e,f={ignoreArrayOrder:!1,showOnly:{statuses:[],granularity:c.BASIC}}){if(!t)return {type:"object",status:u.EQUAL,diff:[]};let r=[];return Object.entries(t).forEach(([s,i])=>{if(l(i)){let n=[];return Object.entries(i).forEach(([o,a])=>{n.push({property:o,previousValue:e===u.ADDED?void 0:a,currentValue:e===u.ADDED?a:void 0,status:e});}),r.push({property:s,previousValue:e===u.ADDED?void 0:t[s],currentValue:e===u.ADDED?i:void 0,status:e,subPropertiesDiff:n})}return r.push({property:s,previousValue:e===u.ADDED?void 0:t[s],currentValue:e===u.ADDED?i:void 0,status:e})}),f.showOnly&&f.showOnly.statuses.length>0?{type:"object",status:e,diff:b(r,f.showOnly)}:{type:"object",status:e,diff:r}}function m(t,e,f){if(!t)return;let r=Object.entries(t).find(([s])=>p(s,e,f));return r?r[1]:void 0}function j(t,e,f){return p(t,e,f)?u.EQUAL:u.UPDATED}function U(t){return t.some(e=>e.status!==u.EQUAL)?u.UPDATED:u.EQUAL}function L(t,e){if(!t)return;let f=Object.keys(t),r=Object.keys(e),s=f.filter(i=>!r.includes(i));if(s.length>0)return s.map(i=>({property:i,value:t[i]}))}function S(t,e,f){let r=[],s,i=L(t,e);return i&&i.forEach(n=>{r.push({property:n.property,previousValue:n.value,currentValue:void 0,status:u.DELETED});}),Object.entries(e).forEach(([n,o])=>{let a=m(t,n,f);if(!a)return r.push({property:n,previousValue:a,currentValue:o,status:!t||!(n in t)?u.ADDED:a===o?u.EQUAL:u.UPDATED});if(l(o)){let D=S(a,o,f);D&&D.length>0&&(s=D);}a&&r.push({property:n,previousValue:a,currentValue:o,status:j(a,o,f),...!!s&&{subDiff:s}});}),r}function P(t,e,f={ignoreArrayOrder:!1,showOnly:{statuses:[],granularity:c.BASIC}}){if(!t&&!e)return {type:"object",status:u.EQUAL,diff:[]};if(!t)return A(e,u.ADDED,f);if(!e)return A(t,u.DELETED,f);let r=[];Object.entries(e).forEach(([i,n])=>{let o=t[i];if(!o)return r.push({property:i,previousValue:o,currentValue:n,status:i in t?o===n?u.EQUAL:u.UPDATED:u.ADDED});if(l(n)){let a=S(o,n,f),D=U(a);return r.push({property:i,previousValue:o,currentValue:n,status:D,...D!==u.EQUAL&&{subPropertiesDiff:a}})}return r.push({property:i,previousValue:o,currentValue:n,status:j(o,n,f)})});let s=L(t,e);return s&&s.forEach(i=>{r.push({property:i.property,previousValue:i.value,currentValue:void 0,status:u.DELETED});}),f.showOnly&&f.showOnly.statuses.length>0?{type:"object",status:E(r),diff:b(r,f.showOnly)}:{type:"object",status:E(r),diff:r}}function w(t,e=[]){return t.filter(f=>e?.includes(f.status))}function g(t,e,f={showOnly:[]}){let r=t.map((s,i)=>({value:s,prevIndex:e===d.ADDED?null:i,newIndex:e===d.ADDED?i:null,indexDiff:null,status:e}));return f.showOnly&&f.showOnly.length>0?{type:"list",status:e,diff:r.filter(s=>f.showOnly?.includes(s.status))}:{type:"list",status:e,diff:r}}function h(t){return t.some(e=>e.status!==d.EQUAL)?d.UPDATED:d.EQUAL}var I=(t,e,f={showOnly:[]})=>{if(!t&&!e)return {type:"list",status:d.EQUAL,diff:[]};if(!t)return g(e,d.ADDED,f);if(!e)return g(t,d.DELETED,f);let r=[],s=[];return e.forEach((i,n)=>{let o=t.findIndex((D,T)=>p(D,i)&&!s.includes(T));o>-1&&s.push(o);let a=o===-1?null:n-o;return a===0?r.push({value:i,prevIndex:o,newIndex:n,indexDiff:a,status:d.EQUAL}):o===-1?r.push({value:i,prevIndex:null,newIndex:n,indexDiff:a,status:d.ADDED}):r.push({value:i,prevIndex:o,newIndex:n,indexDiff:a,status:d.MOVED})}),t.forEach((i,n)=>{if(!s.includes(n))return r.splice(n,0,{value:i,prevIndex:n,newIndex:null,indexDiff:null,status:d.DELETED})}),f.showOnly&&f?.showOnly?.length>0?{type:"list",status:h(r),diff:w(r,f.showOnly)}:{type:"list",status:h(r),diff:r}};

export { I as getListDiff, P as getObjectDiff, p as isEqual, l as isObject };
