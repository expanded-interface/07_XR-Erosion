import{o as at,c as Ut,bm as Dt,j as Rt,m as Bt,l as Lt,k as zt,a0 as tt}from"./ModelLoader-09mCi1LK.js";import{S as jt,a as Gt}from"./Simulator-B85c3-4J.js";import"./preload-helper-PPVm8Dsz.js";import"./BufferGeometryUtils-DuT1hZL_.js";import"./three.core-B-Pr_CDQ.js";import"./three.module-BMaigMmh.js";import"./Pass-AfgOL6hz.js";const z=globalThis,et=z.ShadowRoot&&(z.ShadyCSS===void 0||z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,st=Symbol(),lt=new WeakMap;let At=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==st)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(et&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=lt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&lt.set(e,t))}return t}toString(){return this.cssText}};const Ft=i=>new At(typeof i=="string"?i:i+"",void 0,st),C=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((s,n,o)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[o+1],i[0]);return new At(e,i,st)},Wt=(i,t)=>{if(et)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),n=z.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}},ct=et?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return Ft(e)})(i):i;const{is:Vt,defineProperty:qt,getOwnPropertyDescriptor:Yt,getOwnPropertyNames:Jt,getOwnPropertySymbols:Xt,getPrototypeOf:Qt}=Object,q=globalThis,ht=q.trustedTypes,Kt=ht?ht.emptyScript:"",Zt=q.reactiveElementPolyfillSupport,T=(i,t)=>i,j={toAttribute(i,t){switch(t){case Boolean:i=i?Kt:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},it=(i,t)=>!Vt(i,t),dt={attribute:!0,type:String,converter:j,reflect:!1,useDefault:!1,hasChanged:it};Symbol.metadata??=Symbol("metadata"),q.litPropertyMetadata??=new WeakMap;let P=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=dt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),n=this.getPropertyDescriptor(t,s,e);n!==void 0&&qt(this.prototype,t,n)}}static getPropertyDescriptor(t,e,s){const{get:n,set:o}=Yt(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:n,set(r){const h=n?.call(this);o?.call(this,r),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??dt}static _$Ei(){if(this.hasOwnProperty(T("elementProperties")))return;const t=Qt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(T("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(T("properties"))){const e=this.properties,s=[...Jt(e),...Xt(e)];for(const n of s)this.createProperty(n,e[n])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,n]of e)this.elementProperties.set(s,n)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const n=this._$Eu(e,s);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const n of s)e.unshift(ct(n))}else t!==void 0&&e.push(ct(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Wt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,s);if(n!==void 0&&s.reflect===!0){const o=(s.converter?.toAttribute!==void 0?s.converter:j).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,n=s._$Eh.get(t);if(n!==void 0&&this._$Em!==n){const o=s.getPropertyOptions(n),r=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:j;this._$Em=n;const h=r.fromAttribute(e,o.type);this[n]=h??this._$Ej?.get(n)??h,this._$Em=null}}requestUpdate(t,e,s,n=!1,o){if(t!==void 0){const r=this.constructor;if(n===!1&&(o=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??it)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:n,wrapped:o},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),o!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),n===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[n,o]of s){const{wrapped:r}=o,h=this[n];r!==!0||this._$AL.has(n)||h===void 0||this.C(n,void 0,o,h)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};P.elementStyles=[],P.shadowRootOptions={mode:"open"},P[T("elementProperties")]=new Map,P[T("finalized")]=new Map,Zt?.({ReactiveElement:P}),(q.reactiveElementVersions??=[]).push("2.1.2");const nt=globalThis,ut=i=>i,G=nt.trustedTypes,pt=G?G.createPolicy("lit-html",{createHTML:i=>i}):void 0,xt="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,St="?"+$,te=`<${St}>`,S=document,H=()=>S.createComment(""),O=i=>i===null||typeof i!="object"&&typeof i!="function",ot=Array.isArray,ee=i=>ot(i)||typeof i?.[Symbol.iterator]=="function",X=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,mt=/-->/g,ft=/>/g,A=RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),gt=/'/g,bt=/"/g,wt=/^(?:script|style|textarea|title)$/i,se=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),l=se(1),w=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),vt=new WeakMap,x=S.createTreeWalker(S,129);function kt(i,t){if(!ot(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return pt!==void 0?pt.createHTML(t):t}const ie=(i,t)=>{const e=i.length-1,s=[];let n,o=t===2?"<svg>":t===3?"<math>":"",r=M;for(let h=0;h<e;h++){const a=i[h];let m,f,d=-1,y=0;for(;y<a.length&&(r.lastIndex=y,f=r.exec(a),f!==null);)y=r.lastIndex,r===M?f[1]==="!--"?r=mt:f[1]!==void 0?r=ft:f[2]!==void 0?(wt.test(f[2])&&(n=RegExp("</"+f[2],"g")),r=A):f[3]!==void 0&&(r=A):r===A?f[0]===">"?(r=n??M,d=-1):f[1]===void 0?d=-2:(d=r.lastIndex-f[2].length,m=f[1],r=f[3]===void 0?A:f[3]==='"'?bt:gt):r===bt||r===gt?r=A:r===mt||r===ft?r=M:(r=A,n=void 0);const _=r===A&&i[h+1].startsWith("/>")?" ":"";o+=r===M?a+te:d>=0?(s.push(m),a.slice(0,d)+xt+a.slice(d)+$+_):a+$+(d===-2?h:_)}return[kt(i,o+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class U{constructor({strings:t,_$litType$:e},s){let n;this.parts=[];let o=0,r=0;const h=t.length-1,a=this.parts,[m,f]=ie(t,e);if(this.el=U.createElement(m,s),x.currentNode=this.el.content,e===2||e===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(n=x.nextNode())!==null&&a.length<h;){if(n.nodeType===1){if(n.hasAttributes())for(const d of n.getAttributeNames())if(d.endsWith(xt)){const y=f[r++],_=n.getAttribute(d).split($),L=/([.?@])?(.*)/.exec(y);a.push({type:1,index:o,name:L[2],strings:_,ctor:L[1]==="."?oe:L[1]==="?"?re:L[1]==="@"?ae:Y}),n.removeAttribute(d)}else d.startsWith($)&&(a.push({type:6,index:o}),n.removeAttribute(d));if(wt.test(n.tagName)){const d=n.textContent.split($),y=d.length-1;if(y>0){n.textContent=G?G.emptyScript:"";for(let _=0;_<y;_++)n.append(d[_],H()),x.nextNode(),a.push({type:2,index:++o});n.append(d[y],H())}}}else if(n.nodeType===8)if(n.data===St)a.push({type:2,index:o});else{let d=-1;for(;(d=n.data.indexOf($,d+1))!==-1;)a.push({type:7,index:o}),d+=$.length-1}o++}}static createElement(t,e){const s=S.createElement("template");return s.innerHTML=t,s}}function I(i,t,e=i,s){if(t===w)return t;let n=s!==void 0?e._$Co?.[s]:e._$Cl;const o=O(t)?void 0:t._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),o===void 0?n=void 0:(n=new o(i),n._$AT(i,e,s)),s!==void 0?(e._$Co??=[])[s]=n:e._$Cl=n),n!==void 0&&(t=I(i,n._$AS(i,t.values),n,s)),t}class ne{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,n=(t?.creationScope??S).importNode(e,!0);x.currentNode=n;let o=x.nextNode(),r=0,h=0,a=s[0];for(;a!==void 0;){if(r===a.index){let m;a.type===2?m=new B(o,o.nextSibling,this,t):a.type===1?m=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(m=new le(o,this,t)),this._$AV.push(m),a=s[++h]}r!==a?.index&&(o=x.nextNode(),r++)}return x.currentNode=S,n}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class B{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,n){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=I(this,t,e),O(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==w&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ee(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(S.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,n=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=U.createElement(kt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===n)this._$AH.p(e);else{const o=new ne(n,this),r=o.u(this.options);o.p(e),this.T(r),this._$AH=o}}_$AC(t){let e=vt.get(t.strings);return e===void 0&&vt.set(t.strings,e=new U(t)),e}k(t){ot(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,n=0;for(const o of t)n===e.length?e.push(s=new B(this.O(H()),this.O(H()),this,this.options)):s=e[n],s._$AI(o),n++;n<e.length&&(this._$AR(s&&s._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const s=ut(t).nextSibling;ut(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,n,o){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}_$AI(t,e=this,s,n){const o=this.strings;let r=!1;if(o===void 0)t=I(this,t,e,0),r=!O(t)||t!==this._$AH&&t!==w,r&&(this._$AH=t);else{const h=t;let a,m;for(t=o[0],a=0;a<o.length-1;a++)m=I(this,h[s+a],e,a),m===w&&(m=this._$AH[a]),r||=!O(m)||m!==this._$AH[a],m===p?t=p:t!==p&&(t+=(m??"")+o[a+1]),this._$AH[a]=m}r&&!n&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class oe extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}}class re extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}}class ae extends Y{constructor(t,e,s,n,o){super(t,e,s,n,o),this.type=5}_$AI(t,e=this){if((t=I(this,t,e,0)??p)===w)return;const s=this._$AH,n=t===p&&s!==p||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==p&&(s===p||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class le{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){I(this,t)}}const ce=nt.litHtmlPolyfillSupport;ce?.(U,B),(nt.litHtmlVersions??=[]).push("3.3.3");const he=(i,t,e)=>{const s=e?.renderBefore??t;let n=s._$litPart$;if(n===void 0){const o=e?.renderBefore??null;s._$litPart$=n=new B(t.insertBefore(H(),o),o,void 0,e??{})}return n._$AI(i),n};const rt=globalThis;let b=class extends P{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=he(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}};b._$litElement$=!0,b.finalized=!0,rt.litElementHydrateSupport?.({LitElement:b});const de=rt.litElementPolyfillSupport;de?.({LitElement:b});(rt.litElementVersions??=[]).push("4.2.2");const v=i=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(i,t)}):customElements.define(i,t)};const ue={attribute:!0,type:String,converter:j,reflect:!1,hasChanged:it},pe=(i=ue,t,e)=>{const{kind:s,metadata:n}=e;let o=globalThis.litPropertyMetadata.get(n);if(o===void 0&&globalThis.litPropertyMetadata.set(n,o=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),o.set(e.name,i),s==="accessor"){const{name:r}=e;return{set(h){const a=t.get.call(this);t.set.call(this,h),this.requestUpdate(r,a,i,!0,h)},init(h){return h!==void 0&&this.C(r,void 0,i,h),h}}}if(s==="setter"){const{name:r}=e;return function(h){const a=this[r];t.call(this,h),this.requestUpdate(r,a,i,!0,h)}}throw Error("Unsupported decorator location: "+s)};function u(i){return(t,e)=>typeof e=="object"?pe(i,t,e):((s,n,o)=>{const r=n.hasOwnProperty(o);return n.constructor.createProperty(o,s),r?Object.getOwnPropertyDescriptor(n,o):void 0})(i,t,e)}function J(i){return u({...i,state:!0,attribute:!1})}const Et={ATTRIBUTE:1,CHILD:2},Ct=i=>(...t)=>({_$litDirective$:i,values:t});class Pt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const me=Ct(class extends Pt{constructor(i){if(super(i),i.type!==Et.ATTRIBUTE||i.name!=="class"||i.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter(t=>i[t]).join(" ")+" "}update(i,[t]){if(this.st===void 0){this.st=new Set,i.strings!==void 0&&(this.nt=new Set(i.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(const s in t)t[s]&&!this.nt?.has(s)&&this.st.add(s);return this.render(t)}const e=i.element.classList;for(const s of this.st)s in t||(e.remove(s),this.st.delete(s));for(const s in t){const n=!!t[s];n===this.st.has(s)||this.nt?.has(s)||(n?(e.add(s),this.st.add(s)):(e.remove(s),this.st.delete(s)))}return w}});const fe=i=>i.strings===void 0;const N=(i,t)=>{const e=i._$AN;if(e===void 0)return!1;for(const s of e)s._$AO?.(t,!1),N(s,t);return!0},F=i=>{let t,e;do{if((t=i._$AM)===void 0)break;e=t._$AN,e.delete(i),i=t}while(e?.size===0)},It=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),ve(t)}};function ge(i){this._$AN!==void 0?(F(this),this._$AM=i,It(this)):this._$AM=i}function be(i,t=!1,e=0){const s=this._$AH,n=this._$AN;if(n!==void 0&&n.size!==0)if(t)if(Array.isArray(s))for(let o=e;o<s.length;o++)N(s[o],!1),F(s[o]);else s!=null&&(N(s,!1),F(s));else N(this,i)}const ve=i=>{i.type==Et.CHILD&&(i._$AP??=be,i._$AQ??=ge)};class ye extends Pt{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),It(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(N(this,t),F(this))}setValue(t){if(fe(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}const _e=()=>new $e;class $e{}const Q=new WeakMap,Ae=Ct(class extends ye{render(i){return p}update(i,[t]){const e=t!==this.G;return e&&this.rt(void 0),(e||this.lt!==this.ct)&&(this.G=t,this.ht=i.options?.host,this.rt(this.ct=i.element)),p}rt(i){if(this.G!==void 0)if(this.isConnected||(i=void 0),typeof this.G=="function"){const t=this.ht??globalThis;let e=Q.get(t);e===void 0&&(e=new WeakMap,Q.set(t,e)),e.get(this.G)!==void 0&&this.G.call(this.ht,void 0),e.set(this.G,i),i!==void 0&&this.G.call(this.ht,i)}else this.G.value=i}get lt(){return typeof this.G=="function"?Q.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var Mt=class Tt extends Event{static{this.type="simulatorInstructionsNextEvent"}constructor(){super(Tt.type,{bubbles:!0,composed:!0})}},Nt=class Ht extends Event{static{this.type="simulatorInstructionsCloseEvent"}constructor(){super(Ht.type,{bubbles:!0,composed:!0})}};function c(i,t,e,s){var n=arguments.length,o=n<3?t:s,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(i,t,e,s);else for(var h=i.length-1;h>=0;h--)(r=i[h])&&(o=(n<3?r(o):n>3?r(t,e,o):r(t,e))||o);return n>3&&o&&Object.defineProperty(t,e,o),o}let k=class extends b{constructor(...t){super(...t),this.continueButtonText="Continue"}static{this.styles=C`
    :host {
      position: relative;
      box-sizing: border-box;
      background: #ffffff;
      display: flex;
      /* Fixed popup size shared by every instruction card, sized to fit the
         tallest card's content without a scrollbar; scrolling remains only
         as a fallback for very short windows. */
      height: 36rem;
      width: 30rem;
      max-height: 100%;
      overflow-y: auto;
      overflow-wrap: break-word;
      border-radius: 1.6rem;
      color: #000000;
      font-family:
        system-ui,
        -apple-system,
        sans-serif;
      font-size: 0.875rem;
      line-height: 1.35;
      padding: 1.25rem;
      flex-direction: column;
    }

    h1 {
      margin-top: 0px;
      font-size: 1.25rem;
    }

    h2 {
      margin-top: 0px;
      margin-bottom: 0px;
      font-size: 1rem;
    }

    ul {
      margin-top: 0.2rem;
      margin-bottom: 0px;
      padding-left: 1.25rem;
    }

    .image-div {
      margin-top: 0.4rem;
      margin-bottom: 0.4rem;
    }

    .description-div {
      flex-grow: 1;
    }

    .close-button {
      position: absolute;
      right: 1.3rem;
      top: 1.3rem;
    }

    button {
      font-family: inherit;
      align-self: flex-end;
      width: min-content;
      height: min-content;
      font-size: 0.75rem;
      background: rgb(48, 40, 34);
      color: white;
      border-radius: 1rem;
      padding: 0.5rem 0.7rem;
      border: none;
    }

    video {
      display: block;
      /* Fixed demo-video size shared by every instruction card. */
      width: 20.25rem;
      height: auto;
      margin: 0 auto;
      max-width: 100%;
      aspect-ratio: 16/9;
    }

    p {
      margin-top: 0px;
      margin-bottom: 0px;
    }
  `}continueButtonClicked(){this.dispatchEvent(new Mt)}closeButtonClicked(){this.dispatchEvent(new Nt)}getHeaderContents(){return l` <h1>Welcome to XR Blocks!</h1> `}getImageContents(){return l``}getDescriptionContents(){return l``}render(){return l`
      <button class="close-button" @click=${this.closeButtonClicked}>X</button>
      <div class="header-div">${this.getHeaderContents()}</div>
      <div class="image-div">${this.getImageContents()}</div>
      <div class="description-div">${this.getDescriptionContents()}</div>
      <button type="button" @click=${this.continueButtonClicked}>
        ${this.continueButtonText}
      </button>
    `}};c([u({type:String})],k.prototype,"continueButtonText",void 0);k=c([v("xrblocks-simulator-instructions-card")],k);let Z=class extends k{getHeaderContents(){return l`<h1>${this.customInstruction.header}</h1>`}getImageContents(){return this.customInstruction.videoSrc?l`
          <video playsinline autoplay muted loop>
            <source src=${this.customInstruction.videoSrc} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        `:l``}getDescriptionContents(){return l`<p>${this.customInstruction.description}</p>`}render(){return super.render()}};c([u()],Z.prototype,"customInstruction",void 0);Z=c([v("xrblocks-simulator-custom-instruction")],Z);const xe=tt+"simulator/instructions/xr_blocks_simulator_hands.webm";let yt=class extends k{getImageContents(){return l`
      <video playsinline autoplay muted loop>
        <source src="${xe}" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    `}getDescriptionContents(){return l`
      <h2>Hands Mode</h2>
      <p>
        Hands Mode allows for precise manipulation of virtual hands while
        navigating the environment.
      </p>
      <ul>
        <li>
          <strong>Move Around:</strong> Hold Left Shift and use the W, A, S, D
          keys to navigate.
        </li>
        <li><strong>Look Around:</strong> Right-click and drag the mouse.</li>
        <li><strong>Rotate Hand:</strong> Left-click and drag the mouse.</li>
        <li><strong>Move Hand:</strong> Use the W, A, S, D keys.</li>
        <li>
          <strong>Elevate Hand:</strong> Use the Q (up) and E (down) keys.
        </li>
        <li>
          <strong>Switch Active Hand:</strong> Press the T key to toggle between
          hands.
        </li>
        <li><strong>Simulate Pinch:</strong> Press the Spacebar.</li>
      </ul>
    `}};yt=c([v("xrblocks-simulator-hands-instructions")],yt);const Se=tt+"simulator/instructions/xr_blocks_simulator_navigation.webm";let _t=class extends k{getImageContents(){return l`
      <video playsinline autoplay muted loop>
        <source src=${Se} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    `}getDescriptionContents(){return l`
      <h2>Navigation Mode</h2>
      <p>
        Press <strong>Left Shift</strong> to toggle Navigation Mode. In this
        mode, virtual hands appear and the mouse controls the camera view.
      </p>
      <ul>
        <li>
          <strong>Move Forward/Backward/Sideways:</strong> Use the W, A, S, D
          keys.
        </li>
        <li><strong>Move Up/Down:</strong> Use the Q and E keys.</li>
        <li><strong>Rotate Camera:</strong> Click and drag the mouse.</li>
      </ul>
    `}};_t=c([v("xrblocks-simulator-navigation-instructions")],_t);const we=tt+"simulator/instructions/xr_blocks_simulator_user.webm";let $t=class extends k{getImageContents(){return l`
      <video playsinline autoplay muted loop>
        <source src=${we} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    `}getDescriptionContents(){return l`
      <h2>User Mode</h2>
      <p>
        The simulator starts in <strong>User Mode</strong> by default. This mode
        is for moving the camera and interacting directly with scene objects.
      </p>
      <ul>
        <li>
          <strong>Move Forward/Backward/Sideways:</strong> Use the W, A, S, D
          keys.
        </li>
        <li><strong>Move Up/Down:</strong> Use the Q and E keys.</li>
        <li>
          <strong>Rotate Camera:</strong> Hold the right mouse button and drag.
        </li>
        <li>
          <strong>Scale a ModelViewer:</strong> Point at it and use the mouse
          wheel.
        </li>
        <li><strong>Select Object:</strong> Left-click the mouse.</li>
      </ul>
    `}};$t=c([v("xrblocks-simulator-user-instructions")],$t);let D=class extends b{static{this.styles=C`
    :host {
      background: #000000aa;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      height: 100%;
      width: 100%;
      justify-content: center;
      align-items: center;
    }
  `}getSteps(){const t=this.customInstructions.length===0?"Close":"Continue";if(this.simulatorMode)switch(this.simulatorMode){case"User":case"Editor":case"PointerLock":return[l`<xrblocks-simulator-user-instructions
              .continueButtonText=${t}
            />`];case"Navigation":return[l`<xrblocks-simulator-navigation-instructions
              .continueButtonText=${t}
            />`];case"Hands":return[l`<xrblocks-simulator-hands-instructions
              .continueButtonText=${t}
            />`]}return[l`<xrblocks-simulator-user-instructions />`,l`<xrblocks-simulator-navigation-instructions />`,l`<xrblocks-simulator-hands-instructions
        .continueButtonText=${t}
      />`]}constructor(){super(),this.customInstructions=[],this.step=0,this.addEventListener(Mt.type,this.continueButtonClicked.bind(this)),this.addEventListener(Nt.type,this.closeInstructions.bind(this))}closeInstructions(){this.remove()}continueButtonClicked(){const t=this.getSteps();if(this.step+1>=t.length+this.customInstructions.length){this.closeInstructions();return}this.step++}render(){const t=this.getSteps();return this.step<t.length?t[this.step]:l`<xrblocks-simulator-custom-instruction
          .customInstruction=${this.customInstructions[this.step-t.length]}
        />`}};c([u()],D.prototype,"simulatorMode",void 0);c([u()],D.prototype,"customInstructions",void 0);c([u()],D.prototype,"step",void 0);D=c([v("xrblocks-simulator-instructions")],D);function ke(i){switch(i){case"Navigation":return[[{keys:["W","A","S","D"],label:"Move"}],[{keys:["Mouse"],label:"Click and drag to look around"}]];case"PointerLock":return[[{keys:["W","A","S","D"],label:"Move"}],[{keys:["Mouse"],label:"Click the screen, then move the mouse to look around"}]];case"Hands":return[[{keys:["W","A","S","D"],label:"Move hand"},{keys:["Shift","W","A","S","D"],label:"Move"}],[{keys:["Right Click"],label:"Look"},{keys:["Left Click"],label:"Rotate hand"}],[{keys:["Space"],label:"Pinch"},{keys:["T"],label:"Switch hand"}]];default:return[[{keys:["W","A","S","D"],label:"Move"}],[{keys:["Right Click"],label:"Drag to look around"},{keys:["Left Click"],label:"Select"}]]}}let W=class extends b{constructor(...t){super(...t),this.simulatorMode="User",this.visible=!1}static{this.styles=C`
    :host {
      position: fixed;
      bottom: 4.75rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      pointer-events: none;
      user-select: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.65rem;
      font-family:
        system-ui,
        -apple-system,
        sans-serif;
      opacity: 0;
      transition: opacity 0.5s ease;
    }

    :host([visible]) {
      opacity: 1;
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1.25rem;
    }

    .group {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .keys {
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }

    .key {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      min-width: 2rem;
      height: 2rem;
      padding: 0 0.55rem;
      border-radius: 0.45rem;
      border: 1.5px solid rgba(255, 255, 255, 0.85);
      background: rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(4px);
      color: #fff;
      font-size: 0.85rem;
      font-weight: 600;
      line-height: 1;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    }

    .label {
      color: #fff;
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 0.01em;
      text-shadow: 0 1px 4px rgba(0, 0, 0, 0.85);
      white-space: nowrap;
    }
  `}renderGroup(t){return l`
      <div class="group">
        <div class="keys">
          ${t.keys.map(e=>l`<kbd class="key">${e}</kbd>`)}
        </div>
        <span class="label">${t.label}</span>
      </div>
    `}render(){const t=ke(this.simulatorMode);return l`
      ${t.map(e=>l`<div class="row">
            ${e.map(s=>this.renderGroup(s))}
          </div>`)}
    `}};c([u({type:String})],W.prototype,"simulatorMode",void 0);c([u({type:Boolean,reflect:!0})],W.prototype,"visible",void 0);W=c([v("xrblocks-simulator-overlay-instructions")],W);const Ee={0:"A",1:"B",2:"X",3:"Y",4:"LB",5:"RB",6:"LT",7:"RT",8:"Back",9:"Start",10:"L3",11:"R3",12:"D-Up",13:"D-Down",14:"D-Left",15:"D-Right"};function Ce(i){return Ee[i]??`Btn ${i}`}let R=class extends b{constructor(...t){super(...t),this.visible=!1,this._timer=null,this.controls={},this._flashMessage=""}static{this.styles=C`
    :host {
      position: fixed;
      top: 1.5rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10000;
      pointer-events: none;
    }

    .toast {
      background: rgba(0, 0, 0, 0.85);
      color: #fff;
      border-radius: 1rem;
      padding: 1rem 1.5rem;
      font-family: system-ui, sans-serif;
      font-size: 0.9rem;
      backdrop-filter: blur(8px);
      opacity: 1;
      transition: opacity 0.4s ease-out;
      pointer-events: auto;
      cursor: pointer;
      max-width: 28rem;
    }

    .toast.hidden {
      opacity: 0;
    }

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1rem;
      font-weight: 600;
    }

    .controls {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 0.2rem 0.8rem;
    }

    .key {
      font-weight: 600;
      color: #8cf;
      text-align: right;
    }

    .action {
      color: #ccc;
    }
  `}show(t,e=5e3){this.controls=t,this._flashMessage="",this.visible=!0,this._timer&&clearTimeout(this._timer),this._timer=setTimeout(()=>this.dismiss(),e)}flash(t,e=1500){this._flashMessage=t,this.controls={},this.visible=!0,this._timer&&clearTimeout(this._timer),this._timer=setTimeout(()=>this.dismiss(),e)}dismiss(){this.visible=!1,this._timer&&(clearTimeout(this._timer),this._timer=null)}render(){return this._flashMessage?l`
        <div
          class="toast ${this.visible?"":"hidden"}"
          @click=${this.dismiss}
        >
          <span class="action">${this._flashMessage}</span>
        </div>
      `:l`
      <div class="toast ${this.visible?"":"hidden"}" @click=${this.dismiss}>
        <h3>🎮 Gamepad Connected</h3>
        <div class="controls">
          ${Object.entries(this.controls).map(([t,e])=>l`
              <span class="key">${t}</span>
              <span class="action">${e}</span>
            `)}
        </div>
      </div>
    `}};c([u({type:Boolean})],R.prototype,"visible",void 0);c([u({type:Object})],R.prototype,"controls",void 0);c([u({type:String})],R.prototype,"_flashMessage",void 0);R=c([v("xrblocks-gamepad-toast")],R);const Ot={select:"Select / Interact",cycleHandPoseLeft:"Previous Hand Pose",cycleHandPoseRight:"Next Hand Pose",cycleSimulatorMode:"Cycle Simulator Mode",toggleUI:"Toggle UI",toggleHand:"Swap Active Hand",moveUp:"Move Up",moveDown:"Move Down",openSettings:"Open Settings"},K=Object.keys(Ot).filter(i=>i!=="openSettings");let E=class extends b{constructor(...t){super(...t),this._listeningAction=null,this._bindingSnapshot={},this._focusedIndex=0,this._rafId=null,this._prevStickY=0,this._navPrevButtons=[]}static{this.styles=C`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10001;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }

    :host([hidden]) {
      display: none;
    }

    .backdrop {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      pointer-events: auto;
    }

    .panel {
      position: relative;
      background: rgba(20, 20, 30, 0.95);
      color: #fff;
      border-radius: 1rem;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
      min-width: 20rem;
      max-width: 28rem;
      backdrop-filter: blur(12px);
      pointer-events: auto;
      z-index: 1;
    }

    h2 {
      margin: 0 0 1rem;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .binding-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .binding-row:last-of-type {
      border-bottom: none;
    }

    .action-label {
      color: #ccc;
      font-size: 0.9rem;
    }

    .bind-btn {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #8cf;
      border-radius: 0.5rem;
      padding: 0.3rem 0.8rem;
      font-size: 0.85rem;
      cursor: pointer;
      min-width: 4rem;
      text-align: center;
      font-family: inherit;
    }

    .bind-btn:hover,
    .bind-btn.focused {
      background: rgba(255, 255, 255, 0.2);
      outline: 2px solid #8cf;
      outline-offset: 2px;
    }

    .bind-btn.listening {
      color: #fc4;
      border-color: #fc4;
      animation: pulse 1s infinite alternate;
    }

    @keyframes pulse {
      from {
        opacity: 0.6;
      }
      to {
        opacity: 1;
      }
    }

    .footer {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
      gap: 0.5rem;
    }

    .footer button {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      border-radius: 0.5rem;
      padding: 0.4rem 1rem;
      cursor: pointer;
      font-size: 0.85rem;
      font-family: inherit;
    }

    .footer button:hover,
    .footer button.focused {
      background: rgba(255, 255, 255, 0.2);
      outline: 2px solid #8cf;
      outline-offset: 2px;
    }

    .hint {
      margin-top: 0.75rem;
      font-size: 0.75rem;
      color: #888;
      text-align: center;
    }
  `}_navJustPressed(t,e){const s=t.activeGamepad?.buttons[e]?.pressed??!1,n=this._navPrevButtons[e]??!1;return s&&!n}_navUpdatePrev(t){const e=t.activeGamepad?.buttons;if(e)for(let s=0;s<e.length;s++)this._navPrevButtons[s]=e[s]?.pressed??!1}get _totalItems(){return K.length+2}show(){this.hidden=!1,this._refreshSnapshot(),this._focusedIndex=0,this._prevStickY=0,this._navPrevButtons=[],this.gamepadController&&(this.gamepadController.menuActive=!0,this._navUpdatePrev(this.gamepadController)),this._startNavLoop()}hide(){this.hidden=!0,this._listeningAction&&(this.gamepadController?.cancelCapture(),this._listeningAction=null),this.gamepadController&&(this.gamepadController.menuActive=!1),this._stopNavLoop()}disconnectedCallback(){super.disconnectedCallback(),this._stopNavLoop(),this.gamepadController&&(this.gamepadController.menuActive=!1)}_startNavLoop(){if(this._rafId!==null)return;const t=()=>{this._rafId=requestAnimationFrame(t),this._pollNavigation()};this._rafId=requestAnimationFrame(t)}_stopNavLoop(){this._rafId!==null&&(cancelAnimationFrame(this._rafId),this._rafId=null)}_pollNavigation(){const t=this.gamepadController;if(!t||!t.userData.connected)return;if(this._listeningAction!==null){this._navUpdatePrev(t);return}const[,e]=t.getAxes(),s=.5;e<-.5&&this._prevStickY>=-.5?this._moveFocus(-1):e>s&&this._prevStickY<=s&&this._moveFocus(1),this._prevStickY=e,this._navJustPressed(t,12)&&this._moveFocus(-1),this._navJustPressed(t,13)&&this._moveFocus(1),this._navJustPressed(t,6)&&this._moveFocus(-1),this._navJustPressed(t,7)&&this._moveFocus(1),this._navJustPressed(t,0)&&this._activateFocused(),this._navJustPressed(t,1)&&this.hide();const n=this.bindings?.getBinding("openSettings")??-1;n>=0&&n!==0&&n!==1&&this._navJustPressed(t,n)&&this.hide(),this._navUpdatePrev(t)}_moveFocus(t){const e=this._totalItems-1;this._focusedIndex=Math.max(0,Math.min(e,this._focusedIndex+t))}_activateFocused(){const t=K;this._focusedIndex<t.length?this._startListening(t[this._focusedIndex]):this._focusedIndex===t.length?this._resetDefaults():this.hide()}_refreshSnapshot(){this.bindings&&(this._bindingSnapshot={...this.bindings.getAllBindings()})}_startListening(t){this._listeningAction=t,this.gamepadController?.captureNextButtonPress(e=>{this.bindings?.setBinding(t,e),this._listeningAction=null,this._refreshSnapshot(),this.gamepadController&&this._navUpdatePrev(this.gamepadController)})}_resetDefaults(){this.bindings?.resetDefaults(),this._refreshSnapshot()}render(){const t=K,e=t.length,s=t.length+1;return l`
      <div class="backdrop" @click=${this.hide}></div>
      <div class="panel">
        <h2>🎮 Gamepad Settings</h2>
        ${t.map((n,o)=>{const r=this._bindingSnapshot[n]??-1,h=this._listeningAction===n,a=this._focusedIndex===o;return l`
            <div class="binding-row">
              <span class="action-label">${Ot[n]}</span>
              <button
                class="bind-btn ${h?"listening":""} ${a?"focused":""}"
                @click=${()=>h?null:this._startListening(n)}
              >
                ${h?"Press button...":r>=0?Ce(r):"Unbound"}
              </button>
            </div>
          `})}
        <div class="footer">
          <button
            class=${this._focusedIndex===e?"focused":""}
            @click=${this._resetDefaults}
          >
            Reset Defaults
          </button>
          <button
            class=${this._focusedIndex===s?"focused":""}
            @click=${this.hide}
          >
            Close
          </button>
        </div>
        <div class="hint">
          Stick / D-pad / LT-RT: Navigate · A: Select · B: Close
        </div>
      </div>
    `}};c([u({type:Object})],E.prototype,"bindings",void 0);c([u({type:Object})],E.prototype,"gamepadController",void 0);c([J()],E.prototype,"_listeningAction",void 0);c([J()],E.prototype,"_bindingSnapshot",void 0);c([J()],E.prototype,"_focusedIndex",void 0);E=c([v("xrblocks-gamepad-settings")],E);let V=class extends b{constructor(...t){super(...t),this.posePanelRef=_e(),this.handPose=Object.values(at)[0],this.visible=!1}static{this.styles=C`
    :host {
      position: absolute;
      bottom: 0;
      left: 50%;
      font-family:
        system-ui,
        -apple-system,
        sans-serif;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      max-width: calc(100% - 24rem);
      width: fit-content;
    }

    .hand-pose-panel {
      box-sizing: border-box;
      border: none;
      margin: 1rem 0px;
      border-radius: 5rem;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      max-width: 100%;
      width: fit-content;
      height: 3rem;
      text-align: center;
      vertical-align: middle;
      padding-left: 1rem;
      padding-right: 1rem;
      white-space: nowrap;
      overflow-y: hidden;
      overflow-x: scroll;
    }

    .hand-pose-panel::-webkit-scrollbar {
      display: none;
    }

    .hand-pose-button {
      font-family: inherit;
      color: #ffffff44;
      font-size: 1.2em;
      line-height: 3rem;
      background: transparent;
      text-align: center;
      vertical-align: middle;
      border: none;
    }

    .hand-pose-button.selected {
      color: #ffffffff;
    }
  `}update(t){t.has("handPose")&&this.onHandPoseChanged(),super.update(t)}sendHandPoseRequest(t){this.dispatchEvent(new Ut(t))}getHandPoseButtons(){const t=[];for(const e of Object.values(at)){const s=Dt[e],n={"hand-pose-button":!0,selected:this.handPose===e},o=()=>this.sendHandPoseRequest(e);t.push(l`
        <button
          class=${me(n)}
          @click=${o}
          data-pose=${e}
        >
          ${s}
        </button>
      `)}return t}onHandPoseChanged(){this.scrollToCurrentHandPose()}scrollToCurrentHandPose(){const t=this.posePanelRef.value;if(!t)return;const e=t.querySelector(`.hand-pose-button[data-pose=${this.handPose}]`);e&&e.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})}render(){if(!this.visible)return l``;const t=this.getHandPoseButtons();return l`
      <div class="hand-pose-panel" ${Ae(this.posePanelRef)}>
        ${t}
      </div>
    `}};c([u({type:String})],V.prototype,"handPose",void 0);c([u({type:Boolean})],V.prototype,"visible",void 0);V=c([v("xrblocks-simulator-hand-pose-panel")],V);let g=class extends b{constructor(...t){super(...t),this.environments=[],this.activeEnvironmentIndex=0,this.simulatorMode="User",this.instructionsEnabled=!1,this.handPhysicsAvailable=!1,this.handPhysicsEnabled=!1,this.dayNightAvailable=!1,this.dayNightEnabled=!1,this.timeOfDay=0,this._isOpen=!1}static{this.styles=C`
    :host {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 10000;
      font-family:
        system-ui,
        -apple-system,
        sans-serif;
    }

    button,
    select {
      font-family: inherit;
    }

    .settings-btn {
      border: none;
      margin: 1rem;
      width: 3rem;
      height: 3rem;
      border-radius: 5rem;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .settings-btn:hover {
      background: rgba(0, 0, 0, 0.7);
    }

    .settings-btn svg {
      width: 1.5rem;
      height: 1.5rem;
      fill: currentColor;
      transition: transform 0.3s ease;
    }

    .settings-btn.open svg {
      transform: rotate(45deg);
    }

    .panel {
      position: absolute;
      bottom: 4.5rem;
      left: 1rem;
      background: rgba(0, 0, 0, 0.7);
      border: none;
      border-radius: 1.5rem;
      padding: 1.5rem;
      min-width: 16rem;
      color: #fff;
      opacity: 0;
      pointer-events: none;
      transform: translateY(10px);
      transition: all 0.3s ease;
      backdrop-filter: blur(8px);
    }

    .panel.open {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }

    h3 {
      margin: 0 0 1rem;
      font-size: 1.1rem;
      font-weight: 500;
      color: #fff;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 0.5rem;
    }

    .form-group {
      margin-bottom: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .form-group:last-of-type {
      margin-bottom: 0;
    }

    label {
      font-size: 0.85rem;
      color: #ccc;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      cursor: pointer;
    }

    .checkbox-label:has(input:disabled) {
      cursor: not-allowed;
      opacity: 0.5;
    }

    input[type='checkbox'] {
      width: 1rem;
      height: 1rem;
      margin: 0;
      accent-color: #8ab4f8;
      cursor: inherit;
    }

    input[type='range'] {
      width: 100%;
      margin: 0;
      accent-color: #8ab4f8;
      cursor: pointer;
    }

    .time-labels {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      color: #999;
    }

    select {
      appearance: none;
      -webkit-appearance: none;
      background: rgba(0, 0, 0, 0.5)
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")
        no-repeat right 0.5rem center;
      background-size: 1rem;
      border: none;
      color: #fff;
      padding: 0.5rem 2.2rem 0.5rem 1.2rem;
      border-radius: 5rem;
      font-size: 0.9rem;
      outline: none;
      cursor: pointer;
    }

    select:hover,
    select:focus {
      background-color: rgba(0, 0, 0, 0.8);
    }

    option {
      background: #222;
      color: #fff;
    }

    .instructions-btn {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      padding: 0.6rem 1.2rem;
      border-radius: 5rem;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition:
        background-color 0.2s ease,
        border-color 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .instructions-btn:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.4);
    }

    .instructions-btn:active {
      background: rgba(255, 255, 255, 0.15);
    }
  `}_togglePanel(){this._isOpen=!this._isOpen}_onEnvironmentChange(t){const e=t.target,s=parseInt(e.value,10);this.activeEnvironmentIndex=s,this.dispatchEvent(new Rt(s))}_onModeChange(t){const e=t.target.value;this.simulatorMode=e,this.dispatchEvent(new Bt(e))}_onHandPhysicsChange(t){const e=t.target;this.handPhysicsEnabled=e.checked,this.dispatchEvent(new Lt(this.handPhysicsEnabled))}_onDayNightChange(t){const e=t.target;this.dayNightEnabled=e.checked,e.checked||(this.timeOfDay=0),this.dispatchEvent(new jt(this.dayNightEnabled))}_onTimeOfDayChange(t){const e=t.target;this.timeOfDay=parseFloat(e.value),this.dispatchEvent(new Gt(this.timeOfDay))}_onShowInstructions(){this._isOpen=!1,this.dispatchEvent(new zt(this.simulatorMode))}render(){return l`
      <button
        class="settings-btn ${this._isOpen?"open":""}"
        @click=${this._togglePanel}
        title="Simulator Settings"
      >
        <svg viewBox="0 0 24 24">
          <path
            d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"
          />
        </svg>
      </button>

      <div class="panel ${this._isOpen?"open":""}">
        <h3>Simulator Settings</h3>

        <div class="form-group">
          <label>AR Simulation Environment</label>
          <select @change=${this._onEnvironmentChange}>
            ${this.environments.map((t,e)=>l`
                <option
                  value=${e}
                  ?selected=${e===this.activeEnvironmentIndex}
                >
                  ${t.name??t.manifestPath.split("/").pop()}
                </option>
              `)}
          </select>
        </div>

        <div class="form-group">
          <label>Interaction Mode</label>
          <select @change=${this._onModeChange}>
            ${[{label:"User",value:"User"},{label:"Navigation",value:"Navigation"},{label:"Hands",value:"Hands"},{label:"Pointer Lock",value:"PointerLock"},{label:"Editor",value:"Editor"}].map(t=>l`
                <option
                  value=${t.value}
                  ?selected=${t.value===this.simulatorMode}
                >
                  ${t.label}
                </option>
              `)}
          </select>
        </div>

        ${this.dayNightAvailable?l`
              <div class="form-group">
                <label class="checkbox-label">
                  <span>Day / Night Lighting</span>
                  <input
                    type="checkbox"
                    .checked=${this.dayNightEnabled}
                    @change=${this._onDayNightChange}
                  />
                </label>
              </div>
              <div class="form-group">
                <label>Time of Day</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  .value=${String(this.timeOfDay)}
                  ?disabled=${!this.dayNightEnabled}
                  @input=${this._onTimeOfDayChange}
                />
                <div class="time-labels">
                  <span>Day</span>
                  <span>Night</span>
                </div>
              </div>
            `:""}

        <div class="form-group">
          <label class="checkbox-label">
            <span>Hand Physics</span>
            <input
              type="checkbox"
              .checked=${this.handPhysicsEnabled}
              ?disabled=${!this.handPhysicsAvailable}
              @change=${this._onHandPhysicsChange}
            />
          </label>
        </div>

        ${this.instructionsEnabled?l`
              <div class="form-group">
                <button
                  class="instructions-btn"
                  @click=${this._onShowInstructions}
                >
                  View Simulator Instructions
                </button>
              </div>
            `:""}
      </div>
    `}};c([u({type:Array})],g.prototype,"environments",void 0);c([u({type:Number})],g.prototype,"activeEnvironmentIndex",void 0);c([u({type:String})],g.prototype,"simulatorMode",void 0);c([u({type:Boolean})],g.prototype,"instructionsEnabled",void 0);c([u({type:Boolean})],g.prototype,"handPhysicsAvailable",void 0);c([u({type:Boolean})],g.prototype,"handPhysicsEnabled",void 0);c([u({type:Boolean})],g.prototype,"dayNightAvailable",void 0);c([u({type:Boolean})],g.prototype,"dayNightEnabled",void 0);c([u({type:Number})],g.prototype,"timeOfDay",void 0);c([J()],g.prototype,"_isOpen",void 0);g=c([v("xrblocks-simulator-settings")],g);
