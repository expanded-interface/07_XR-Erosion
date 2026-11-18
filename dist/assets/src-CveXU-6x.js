import{B as Y,e as q,o as xt,b as M,ee as at,aJ as Ri,a as X,eQ as Z,aa as Ci,D as rs,x as de,eC as pe,F as wn,M as he,z as _t,cG as Ni,Y as cs,d3 as as,Z as ls,u as us,ei as Li,eh as Hi,ed as Ui,es as ki,dE as fs,H as ae,bx as Ue,i as le,g as An,N as qt,U as On,b6 as ds,bv as qn,bw as ps,R as qe,h as Bn,s as Oi,b5 as hs,aP as ms,E as ys,d as xs,V as Rn}from"./three.core-B-Pr_CDQ.js";import"./three.module-BMaigMmh.js";const qi=0,gs=1,vs=2,et=0,gt=1,Wn=2,Oo=3,ke=1.25,Tn=1,G=32,N=G/4,Cn=65535,bs=Cn<<16,Oe=Math.pow(2,-24),fe=Symbol("SKIP_GENERATION"),Wi={strategy:qi,maxDepth:40,targetLeafSize:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null,[fe]:!1};function R(s,t,e){return e.min.x=t[s],e.min.y=t[s+1],e.min.z=t[s+2],e.max.x=t[s+3],e.max.y=t[s+4],e.max.z=t[s+5],e}function Pn(s){let t=-1,e=-1/0;for(let n=0;n<3;n++){const i=s[n+3]-s[n];i>e&&(e=i,t=n)}return t}function $n(s,t,e){for(let n=0;n<3;n++){const i=t[s+2*n],r=t[s+2*n+1],o=i-r,l=i+r;o<e[n]&&(e[n]=o),l>e[n+3]&&(e[n+3]=l)}}function tn(s){const t=s[3]-s[0],e=s[4]-s[1],n=s[5]-s[2];return 2*(t*e+e*n+n*t)}function C(s,t){return t[s+15]===Cn}function H(s,t){return t[s+6]}function $(s,t){return t[s+14]}function U(s){return s+N}function k(s,t){const e=t[s+6];return s+e*N}function $e(s,t){return t[s+7]}function en(s,t,e,n,i){let r=1/0,o=1/0,l=1/0,c=-1/0,u=-1/0,f=-1/0,a=1/0,d=1/0,p=1/0,m=-1/0,g=-1/0,v=-1/0;const b=s.offset||0;for(let h=(t-b)*6,y=(t+e-b)*6;h<y;h+=6){const x=s[h+0],w=s[h+1],S=x-w,A=x+w;S<r&&(r=S),A>c&&(c=A),x<a&&(a=x),x>m&&(m=x);const P=s[h+2],_=s[h+3],T=P-_,I=P+_;T<o&&(o=T),I>u&&(u=I),P<d&&(d=P),P>g&&(g=P);const B=s[h+4],D=s[h+5],z=B-D,E=B+D;z<l&&(l=z),E>f&&(f=E),B<p&&(p=B),B>v&&(v=B)}n[0]=r,n[1]=o,n[2]=l,n[3]=c,n[4]=u,n[5]=f,i[0]=a,i[1]=d,i[2]=p,i[3]=m,i[4]=g,i[5]=v}const ct=8,Nn=8,nn=new Int32Array(ct),rt=new Float32Array(ct*6),Dt=new Float32Array(ct*6),st=new Float32Array(6),ye=new Float32Array(6),ht=new Int32Array(Nn),Xn=new Float32Array(Nn*6);function ws(s,t,e,n){for(let i=0;i<3;i++){const r=t[s+2*i],o=t[s+2*i+1],l=r-o,c=r+o;l<e[n+i]&&(e[n+i]=l),c>e[n+i+3]&&(e[n+i+3]=c)}}function Yn(s,t){const e=s[t+3]-s[t],n=s[t+4]-s[t+1],i=s[t+5]-s[t+2];return 2*(e*n+n*i+i*e)}function As(s,t,e,n,i,r){let o=-1,l=0;if(r===qi)o=Pn(t),o!==-1&&(l=(t[o]+t[o+3])/2);else if(r===gs)o=Pn(s),o!==-1&&(l=Bs(e,n,i,o));else if(r===vs){const c=tn(s);let u=ke*i;const f=e.offset||0,a=(n-f)*6,d=(n+i-f)*6;for(let p=0;p<3;p++){const m=t[p],b=(t[p+3]-m)/ct;if(i<Nn){for(let h=0;h<i;h++){const y=a+h*6,x=e[y+2*p];let w=h;for(;w>0&&e[ht[w-1]+2*p]>x;)ht[w]=ht[w-1],w--;ht[w]=y}for(let h=0;h<3;h++)st[h]=1/0,st[h+3]=-1/0,ye[h]=1/0,ye[h+3]=-1/0;for(let h=i-1;h>=0;h--)$n(ht[h],e,ye),Xn.set(ye,h*6);for(let h=0;h<i-1;h++){$n(ht[h],e,st);const y=e[ht[h+1]+2*p];if(e[ht[h]+2*p]===y)continue;const x=h+1,w=i-x,S=tn(st)/c,A=Yn(Xn,x*6)/c,P=Tn+ke*(S*x+A*w);P<u&&(o=p,u=P,l=y)}}else{for(let x=0;x<ct;x++){nn[x]=0;for(let w=0;w<3;w++)rt[x*6+w]=1/0,rt[x*6+w+3]=-1/0}for(let x=a;x<d;x+=6){let A=~~((e[x+2*p]-m)/b);A>=ct&&(A=ct-1),nn[A]++,ws(x,e,rt,A*6)}const h=(ct-1)*6;for(let x=0;x<6;x++)Dt[h+x]=rt[h+x];for(let x=ct-2;x>=0;x--){const w=x*6,S=w+6;for(let A=0;A<3;A++)Dt[w+A]=Math.min(rt[w+A],Dt[S+A]),Dt[w+A+3]=Math.max(rt[w+A+3],Dt[S+A+3])}let y=0;for(let x=0;x<ct-1;x++){const w=x*6,S=nn[x];if(S!==0)for(let I=0;I<3;I++)y===0?(st[I]=rt[w+I],st[I+3]=rt[w+I+3]):(st[I]=Math.min(st[I],rt[w+I]),st[I+3]=Math.max(st[I+3],rt[w+I+3]));y+=S;let A=0,P=0;y!==0&&(A=tn(st)/c);const _=i-y;_!==0&&(P=Yn(Dt,w+6)/c);const T=Tn+ke*(A*y+P*_);T<u&&(o=p,u=T,l=m+b+x*b)}}}}else console.warn(`BVH: Invalid build strategy value ${r} used.`);return{axis:o,pos:l}}function Bs(s,t,e,n){let i=0;const r=s.offset;for(let o=t,l=t+e;o<l;o++)i+=s[(o-r)*6+n*2];return i/e}function Ts(s,t,e,n,i,r){let o=n,l=n+i-1;const c=r.pos,u=r.axis*2,f=e.offset||0;for(;;){for(;o<=l&&e[(o-f)*6+u]<c;)o++;for(;o<=l&&e[(l-f)*6+u]>=c;)l--;if(o<l){for(let a=0;a<t;a++){let d=s[o*t+a];s[o*t+a]=s[l*t+a],s[l*t+a]=d}for(let a=0;a<6;a++){const d=o-f,p=l-f,m=e[d*6+a];e[d*6+a]=e[p*6+a],e[p*6+a]=m}o++,l--}else return o}}const Ps=Math.pow(2,32),zt=new Float32Array(6),xe=new Float32Array(6);function Ss(s,t,e,n,i,r){const{maxDepth:o,verbose:l,targetLeafSize:c,_strictLeafSize:u=1/0,strategy:f,onProgress:a,useSharedArrayBuffer:d=!1}=i,p=s.primitiveBuffer,m=s.primitiveBufferStride,g=d?SharedArrayBuffer:ArrayBuffer,v=new g(G*Math.max(1,2*Math.ceil(n)-1)),b=new Float32Array(v),h=new Uint32Array(v),y=new Uint16Array(v);let x=0,w=!1;return en(t,e,n,zt,xe),P(e,n,0),v.slice(0,x*G);function S(_){a&&a((_-r.offset)/r.count)}function A(_,T,I){const B=_*2;h[_+6]=T,y[B+14]=I,y[B+15]=Cn,S(T+I)}function P(_,T,I){const B=x++,D=B*N;b.set(zt,D),!w&&I>=o&&(w=!0,l&&console.warn(`BVH: Max depth of ${o} reached when generating BVH. Consider increasing maxDepth.`));const z=T>u;if(T<=c&&!z||I>=o){A(D,_,T);return}const E=As(zt,xe,t,_,T,f);let F=E.axis===-1?-1:Ts(p,m,t,_,T,E);if(E.axis===-1||F===_||F===_+T){if(!z){A(D,_,T);return}E.axis=Math.max(0,Pn(zt)),F=_+Math.max(1,Math.floor(T/2))}h[D+7]=E.axis;const pt=F-_;en(t,_,pt,zt,xe),P(_,pt,I+1);const $t=x-B;if($t>Ps)throw new Error("MeshBVH: Cannot store relative child node offset greater than 32 bits.");h[D+6]=$t;const Xt=T-pt;en(t,F,Xt,zt,xe),P(F,Xt,I+1)}}function _s(s,t){const e=s.getRootRanges(t.range),n=e[0],i=e[e.length-1],r={offset:n.offset,count:i.offset+i.count-n.offset},o=new Float32Array(6*r.count);o.offset=r.offset,s.computePrimitiveBounds(r.offset,r.count,o),s._roots=e.map(l=>Ss(s,o,l.offset,l.count,t,r))}class me{constructor(t){this._getNewPrimitive=t,this._primitives=[]}getPrimitive(){const t=this._primitives;return t.length===0?this._getNewPrimitive():t.pop()}releasePrimitive(t){this._primitives.push(t)}}class Is{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;const t=[];let e=null;this.setBuffer=n=>{e&&t.push(e),e=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{e=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,t.length!==0&&this.setBuffer(t.pop())}}}const V=new Is;let yt,Wt;const Et=[],ge=new me(()=>new Y);function Ms(s,t,e,n,i,r){yt=ge.getPrimitive(),Wt=ge.getPrimitive(),Et.push(yt,Wt),V.setBuffer(s._roots[t]);const o=Sn(0,s.geometry,e,n,i,r);V.clearBuffer(),ge.releasePrimitive(yt),ge.releasePrimitive(Wt),Et.pop(),Et.pop();const l=Et.length;return l>0&&(Wt=Et[l-1],yt=Et[l-2]),o}function Sn(s,t,e,n,i=null,r=0,o=0){const{float32Array:l,uint16Array:c,uint32Array:u}=V;let f=s*2;if(C(f,c)){const d=H(s,u),p=$(f,c);return R(s,l,yt),n(d,p,!1,o,r+s/N,yt)}else{let T=function(B){const{uint16Array:D,uint32Array:z}=V;let E=B*2;for(;!C(E,D);)B=U(B),E=B*2;return H(B,z)},I=function(B){const{uint16Array:D,uint32Array:z}=V;let E=B*2;for(;!C(E,D);)B=k(B,z),E=B*2;return H(B,z)+$(E,D)};const d=U(s),p=k(s,u);let m=d,g=p,v,b,h,y;if(i&&(h=yt,y=Wt,R(m,l,h),R(g,l,y),v=i(h),b=i(y),b<v)){m=p,g=d;const B=v;v=b,b=B,h=y}h||(h=yt,R(m,l,h));const x=C(m*2,c),w=e(h,x,v,o+1,r+m/N);let S;if(w===Wn){const B=T(m),z=I(m)-B;S=n(B,z,!0,o+1,r+m/N,h)}else S=w&&Sn(m,t,e,n,i,r,o+1);if(S)return!0;y=Wt,R(g,l,y);const A=C(g*2,c),P=e(y,A,b,o+1,r+g/N);let _;if(P===Wn){const B=T(g),z=I(g)-B;_=n(B,z,!0,o+1,r+g/N,y)}else _=P&&Sn(g,t,e,n,i,r,o+1);return!!_}}const ue=new V.constructor,We=new V.constructor,mt=new me(()=>new Y),Vt=new Y,Ft=new Y,sn=new Y,on=new Y;let rn=!1;function Ds(s,t,e,n){if(rn)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");rn=!0;const i=s._roots,r=t._roots;let o,l=0,c=0;const u=new q().copy(e).invert();for(let f=0,a=i.length;f<a;f++){ue.setBuffer(i[f]),c=0;const d=mt.getPrimitive();R(0,ue.float32Array,d),d.applyMatrix4(u);for(let p=0,m=r.length;p<m&&(We.setBuffer(r[p]),o=ot(0,0,e,u,n,l,c,0,0,d),We.clearBuffer(),c+=r[p].byteLength/G,!o);p++);if(mt.releasePrimitive(d),ue.clearBuffer(),l+=i[f].byteLength/G,o)break}return rn=!1,o}function ot(s,t,e,n,i,r=0,o=0,l=0,c=0,u=null,f=!1){let a,d;f?(a=We,d=ue):(a=ue,d=We);const p=a.float32Array,m=a.uint32Array,g=a.uint16Array,v=d.float32Array,b=d.uint32Array,h=d.uint16Array,y=s*2,x=t*2,w=C(y,g),S=C(x,h);let A=!1;if(S&&w)f?A=i(H(t,b),$(t*2,h),H(s,m),$(s*2,g),c,o+t/N,l,r+s/N):A=i(H(s,m),$(s*2,g),H(t,b),$(t*2,h),l,r+s/N,c,o+t/N);else if(S){const P=mt.getPrimitive();R(t,v,P),P.applyMatrix4(e);const _=U(s),T=k(s,m);R(_,p,Vt),R(T,p,Ft);const I=P.intersectsBox(Vt),B=P.intersectsBox(Ft);A=I&&ot(t,_,n,e,i,o,r,c,l+1,P,!f)||B&&ot(t,T,n,e,i,o,r,c,l+1,P,!f),mt.releasePrimitive(P)}else{const P=U(t),_=k(t,b);R(P,v,sn),R(_,v,on);const T=u.intersectsBox(sn),I=u.intersectsBox(on);if(T&&I)A=ot(s,P,e,n,i,r,o,l,c+1,u,f)||ot(s,_,e,n,i,r,o,l,c+1,u,f);else if(T)if(w)A=ot(s,P,e,n,i,r,o,l,c+1,u,f);else{const B=mt.getPrimitive();B.copy(sn).applyMatrix4(e);const D=U(s),z=k(s,m);R(D,p,Vt),R(z,p,Ft);const E=B.intersectsBox(Vt),F=B.intersectsBox(Ft);A=E&&ot(P,D,n,e,i,o,r,c,l+1,B,!f)||F&&ot(P,z,n,e,i,o,r,c,l+1,B,!f),mt.releasePrimitive(B)}else if(I)if(w)A=ot(s,_,e,n,i,r,o,l,c+1,u,f);else{const B=mt.getPrimitive();B.copy(on).applyMatrix4(e);const D=U(s),z=k(s,m);R(D,p,Vt),R(z,p,Ft);const E=B.intersectsBox(Vt),F=B.intersectsBox(Ft);A=E&&ot(_,D,n,e,i,o,r,c,l+1,B,!f)||F&&ot(_,z,n,e,i,o,r,c,l+1,B,!f),mt.releasePrimitive(B)}}return A}const cn=new class{constructor(){let s=null,t=null,e=null,n=!1;this.root=null,this.buffer=null,this.uint32Array=null,this.uint16Array=null,this.setBVH=(r,o)=>{if(n)throw new Error("BVHTraversalHelper: cannot call setBVH during an active traversal.");this.root=o,this.buffer=s=r._roots[o],this.uint16Array=e=new Uint16Array(s),this.uint32Array=t=new Uint32Array(s)},this.reset=()=>{this.root=null,this.buffer=s=null,this.uint16Array=e=null,this.uint32Array=t=null},this.getRangeStart=r=>{let o=r*2;for(;!C(o,e);)r=U(r),o=r*2;return H(r,t)},this.getRangeEnd=r=>{let o=r*2;for(;!C(o,e);)r=k(r,t),o=r*2;return H(r,t)+$(o,e)};const i=(r,o,l)=>{const c=o*2,u=C(c,e);if(!r(l,u,o)&&!u){const a=U(o),d=k(o,t);i(r,a,l+1),i(r,d,l+1)}};this.traverseBuffer=r=>{if(n)throw new Error("BVHTraversalHelper: cannot start a traversal during an active traversal.");n=!0;try{i(r,0,0)}finally{n=!1}},this.traverse=r=>{this.traverseBuffer((o,l,c)=>{if(l){const u=c*2,f=t[c+6],a=e[u+14];return r(o,l,new Float32Array(s,c*4,6),f,a)}else{const u=$e(c,t);return r(o,l,new Float32Array(s,c*4,6),u)}})}}},Zn=new Y,Rt=new Float32Array(6);class $i{constructor(){this._roots=null,this.primitiveBuffer=null,this.primitiveBufferStride=null}init(t){t={...Wi,...t},"maxLeafSize"in t&&(console.warn('BVH: "maxLeafSize" option has been deprecated. Use "targetLeafSize", instead.'),t={...t,targetLeafSize:t.maxLeafSize}),_s(this,t)}getRootRanges(){throw new Error("BVH: getRootRanges() not implemented")}writePrimitiveBounds(){throw new Error("BVH: writePrimitiveBounds() not implemented")}writePrimitiveRangeBounds(t,e,n,i){let r=1/0,o=1/0,l=1/0,c=-1/0,u=-1/0,f=-1/0;for(let a=t,d=t+e;a<d;a++){this.writePrimitiveBounds(a,Rt,0);const[p,m,g,v,b,h]=Rt;p<r&&(r=p),v>c&&(c=v),m<o&&(o=m),b>u&&(u=b),g<l&&(l=g),h>f&&(f=h)}return n[i+0]=r,n[i+1]=o,n[i+2]=l,n[i+3]=c,n[i+4]=u,n[i+5]=f,n}computePrimitiveBounds(t,e,n){const i=n.offset||0;for(let r=t,o=t+e;r<o;r++){this.writePrimitiveBounds(r,Rt,0);const[l,c,u,f,a,d]=Rt,p=(l+f)/2,m=(c+a)/2,g=(u+d)/2,v=(f-l)/2,b=(a-c)/2,h=(d-u)/2,y=(r-i)*6;n[y+0]=p,n[y+1]=v+(Math.abs(p)+v)*Oe,n[y+2]=m,n[y+3]=b+(Math.abs(m)+b)*Oe,n[y+4]=g,n[y+5]=h+(Math.abs(g)+h)*Oe}return n}shiftPrimitiveOffsets(t){const e=this._indirectBuffer;if(e)for(let n=0,i=e.length;n<i;n++)e[n]+=t;else{const n=this._roots;for(let i=0;i<n.length;i++){const r=n[i],o=new Uint32Array(r),l=new Uint16Array(r),c=r.byteLength/G;for(let u=0;u<c;u++){const f=N*u,a=2*f;C(a,l)&&(o[f+6]+=t)}}}}traverse(t,e=0){cn.setBVH(this,e),cn.traverse(t),cn.reset()}refit(){const t=this._roots;for(let e=0,n=t.length;e<n;e++){const i=t[e],r=new Uint32Array(i),o=new Uint16Array(i),l=new Float32Array(i),c=i.byteLength/G;for(let u=c-1;u>=0;u--){const f=u*N,a=f*2;if(C(a,o)){const p=H(f,r),m=$(a,o);this.writePrimitiveRangeBounds(p,m,Rt,0),l.set(Rt,f)}else{const p=U(f),m=k(f,r);for(let g=0;g<3;g++){const v=l[p+g],b=l[p+g+3],h=l[m+g],y=l[m+g+3];l[f+g]=v<h?v:h,l[f+g+3]=b>y?b:y}}}}}getBoundingBox(t){return t.makeEmpty(),this._roots.forEach(n=>{R(0,new Float32Array(n),Zn),t.union(Zn)}),t}shapecast(t){let{boundsTraverseOrder:e,intersectsBounds:n,intersectsRange:i,intersectsPrimitive:r,scratchPrimitive:o,iterate:l}=t;if(i&&r){const a=i;i=(d,p,m,g,v)=>a(d,p,m,g,v)?!0:l(d,p,this,r,m,g,o)}else i||(r?i=(a,d,p,m)=>l(a,d,this,r,p,m,o):i=(a,d,p)=>p);let c=!1,u=0;const f=this._roots;for(let a=0,d=f.length;a<d;a++){const p=f[a];if(c=Ms(this,a,n,i,e,u),c)break;u+=p.byteLength/G}return c}bvhcast(t,e,n){let{intersectsRanges:i}=n;return Ds(this,t,e,i)}}function Xi(){return typeof SharedArrayBuffer<"u"}function Xe(s){return s.index?s.index.count:s.attributes.position.count}function Ye(s){return Xe(s)/3}function Yi(s,t=ArrayBuffer){return s>65535?new Uint32Array(new t(4*s)):new Uint16Array(new t(2*s))}function zs(s,t){if(!s.index){const e=s.attributes.position.count,n=t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,i=Yi(e,n);s.setIndex(new xt(i,1));for(let r=0;r<e;r++)i[r]=r}}function Es(s,t,e){const n=Xe(s)/e,i=t||s.drawRange,r=i.start/e,o=(i.start+i.count)/e,l=Math.max(0,r),c=Math.min(n,o)-l;return{offset:Math.floor(l),count:Math.floor(c)}}function Vs(s,t){return s.groups.map(e=>({offset:e.start/t,count:e.count/t}))}function Gn(s,t,e){const n=Es(s,t,e),i=Vs(s,e);if(!i.length)return[n];const r=[],o=n.offset,l=n.offset+n.count,c=Xe(s)/e,u=[];for(const d of i){const{offset:p,count:m}=d,g=p,v=isFinite(m)?m:c-p,b=p+v;g<l&&b>o&&(u.push({pos:Math.max(o,g),isStart:!0}),u.push({pos:Math.min(l,b),isStart:!1}))}u.sort((d,p)=>d.pos!==p.pos?d.pos-p.pos:d.type==="end"?-1:1);let f=0,a=null;for(const d of u){const p=d.pos;f!==0&&p!==a&&r.push({offset:a,count:p-a}),f+=d.isStart?1:-1,a=p}return r}function Fs(s,t){const e=s[s.length-1],n=e.offset+e.count>2**16,i=s.reduce((u,f)=>u+f.count,0),r=n?4:2,o=t?new SharedArrayBuffer(i*r):new ArrayBuffer(i*r),l=n?new Uint32Array(o):new Uint16Array(o);let c=0;for(let u=0;u<s.length;u++){const{offset:f,count:a}=s[u];for(let d=0;d<a;d++)l[c+d]=f+d;c+=a}return l}class Ze extends $i{get indirect(){return!!this._indirectBuffer}get primitiveStride(){return null}get primitiveBufferStride(){return this.indirect?1:this.primitiveStride}set primitiveBufferStride(t){}get primitiveBuffer(){return this.indirect?this._indirectBuffer:this.geometry.index.array}set primitiveBuffer(t){}constructor(t,e={}){if(t.isBufferGeometry){if(t.index&&t.index.isInterleavedBufferAttribute)throw new Error("BVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("BVH: Only BufferGeometries are supported.");if(e.useSharedArrayBuffer&&!Xi())throw new Error("BVH: SharedArrayBuffer is not available.");super(),this.geometry=t,this.resolvePrimitiveIndex=e.indirect?n=>this._indirectBuffer[n]:n=>n,this.primitiveBuffer=null,this.primitiveBufferStride=null,this._indirectBuffer=null,e={...Wi,...e},e[fe]||this.init(e)}init(t){const{geometry:e,primitiveStride:n}=this;if(t.indirect){const i=Gn(e,t.range,n),r=Fs(i,t.useSharedArrayBuffer);this._indirectBuffer=r}else zs(e,t);super.init(t),!e.boundingBox&&t.setBoundingBox&&(e.boundingBox=this.getBoundingBox(new Y))}getRootRanges(t){return this.indirect?[{offset:0,count:this._indirectBuffer.length}]:Gn(this.geometry,t,this.primitiveStride)}raycastObject3D(){throw new Error("BVH: raycastObject3D() not implemented")}}class dt{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(t,e){let n=1/0,i=-1/0;for(let r=0,o=t.length;r<o;r++){const c=t[r][e];n=c<n?c:n,i=c>i?c:i}this.min=n,this.max=i}setFromPoints(t,e){let n=1/0,i=-1/0;for(let r=0,o=e.length;r<o;r++){const l=e[r],c=t.dot(l);n=c<n?c:n,i=c>i?c:i}this.min=n,this.max=i}isSeparated(t){return this.min>t.max||t.min>this.max}}dt.prototype.setFromBox=(function(){const s=new M;return function(e,n){const i=n.min,r=n.max;let o=1/0,l=-1/0;for(let c=0;c<=1;c++)for(let u=0;u<=1;u++)for(let f=0;f<=1;f++){s.x=i.x*c+r.x*(1-c),s.y=i.y*u+r.y*(1-u),s.z=i.z*f+r.z*(1-f);const a=e.dot(s);o=Math.min(a,o),l=Math.max(a,l)}this.min=o,this.max=l}})();const Rs=(function(){const s=new M,t=new M,e=new M;return function(i,r,o){const l=i.start,c=s,u=r.start,f=t;e.subVectors(l,u),s.subVectors(i.end,i.start),t.subVectors(r.end,r.start);const a=e.dot(f),d=f.dot(c),p=f.dot(f),m=e.dot(c),v=c.dot(c)*p-d*d;let b,h;v!==0?b=(a*d-m*p)/v:b=0,h=(a+b*d)/p,o.x=b,o.y=h}})(),Ln=(function(){const s=new X,t=new M,e=new M;return function(i,r,o,l){Rs(i,r,s);let c=s.x,u=s.y;if(c>=0&&c<=1&&u>=0&&u<=1){i.at(c,o),r.at(u,l);return}else if(c>=0&&c<=1){u<0?r.at(0,l):r.at(1,l),i.closestPointToPoint(l,!0,o);return}else if(u>=0&&u<=1){c<0?i.at(0,o):i.at(1,o),r.closestPointToPoint(o,!0,l);return}else{let f;c<0?f=i.start:f=i.end;let a;u<0?a=r.start:a=r.end;const d=t,p=e;if(i.closestPointToPoint(a,!0,t),r.closestPointToPoint(f,!0,e),d.distanceToSquared(a)<=p.distanceToSquared(f)){o.copy(d),l.copy(a);return}else{o.copy(f),l.copy(p);return}}}})(),Cs=(function(){const s=new M,t=new M,e=new Ri,n=new at;return function(r,o){const{radius:l,center:c}=r,{a:u,b:f,c:a}=o;if(n.start=u,n.end=f,n.closestPointToPoint(c,!0,s).distanceTo(c)<=l||(n.start=u,n.end=a,n.closestPointToPoint(c,!0,s).distanceTo(c)<=l)||(n.start=f,n.end=a,n.closestPointToPoint(c,!0,s).distanceTo(c)<=l))return!0;const g=o.getPlane(e);if(Math.abs(g.distanceToPoint(c))<=l){const b=g.projectPoint(c,t);if(o.containsPoint(b))return!0}return!1}})(),Ns=["x","y","z"],ut=1e-15,Kn=ut*ut;function j(s){return Math.abs(s)<ut}class nt extends Z{constructor(...t){super(...t),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new M),this.satBounds=new Array(4).fill().map(()=>new dt),this.points=[this.a,this.b,this.c],this.plane=new Ri,this.isDegenerateIntoSegment=!1,this.isDegenerateIntoPoint=!1,this.degenerateSegment=new at,this.needsUpdate=!0}intersectsSphere(t){return Cs(t,this)}update(){const t=this.a,e=this.b,n=this.c,i=this.points,r=this.satAxes,o=this.satBounds,l=r[0],c=o[0];this.getNormal(l),c.setFromPoints(l,i);const u=r[1],f=o[1];u.subVectors(t,e),f.setFromPoints(u,i);const a=r[2],d=o[2];a.subVectors(e,n),d.setFromPoints(a,i);const p=r[3],m=o[3];p.subVectors(n,t),m.setFromPoints(p,i);const g=u.length(),v=a.length(),b=p.length();this.isDegenerateIntoPoint=!1,this.isDegenerateIntoSegment=!1,g<ut?v<ut||b<ut?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(t),this.degenerateSegment.end.copy(n)):v<ut?b<ut?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(e),this.degenerateSegment.end.copy(t)):b<ut&&(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(n),this.degenerateSegment.end.copy(e)),this.plane.setFromNormalAndCoplanarPoint(l,t),this.needsUpdate=!1}}nt.prototype.closestPointToSegment=(function(){const s=new M,t=new M,e=new at;return function(i,r=null,o=null){this.needsUpdate&&this.update();const{start:l,end:c}=i,u=this.points;let f,a=1/0;const d=this.plane.distanceToPoint(l),p=this.plane.distanceToPoint(c);if(d*p<0&&this.plane.intersectLine(i,s)!==null&&this.containsPoint(s))return r&&r.copy(s),o&&o.copy(s),0;for(let m=0;m<3;m++){const g=(m+1)%3;e.start.copy(u[m]),e.end.copy(u[g]),Ln(e,i,s,t),f=s.distanceToSquared(t),f<a&&(a=f,r&&r.copy(s),o&&o.copy(t))}return this.closestPointToPoint(l,s),f=l.distanceToSquared(s),f<a&&(a=f,r&&r.copy(s),o&&o.copy(l)),this.closestPointToPoint(c,s),f=c.distanceToSquared(s),f<a&&(a=f,r&&r.copy(s),o&&o.copy(c)),Math.sqrt(a)}})();nt.prototype.intersectsTriangle=(function(){const s=new nt,t=new dt,e=new dt,n=new M,i=new M,r=new M,o=new M,l=new at,c=new at,u=new M,f=new X,a=new X;function d(y,x,w,S){const A=n;!y.isDegenerateIntoPoint&&!y.isDegenerateIntoSegment?A.copy(y.plane.normal):A.copy(x.plane.normal);const P=y.satBounds,_=y.satAxes;for(let B=1;B<4;B++){const D=P[B],z=_[B];if(t.setFromPoints(z,x.points),D.isSeparated(t)||(o.copy(A).cross(z),t.setFromPoints(o,y.points),e.setFromPoints(o,x.points),t.isSeparated(e)))return!1}const T=x.satBounds,I=x.satAxes;for(let B=1;B<4;B++){const D=T[B],z=I[B];if(t.setFromPoints(z,y.points),D.isSeparated(t)||(o.crossVectors(A,z),t.setFromPoints(o,y.points),e.setFromPoints(o,x.points),t.isSeparated(e)))return!1}return w&&(S||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),w.start.set(0,0,0),w.end.set(0,0,0)),!0}function p(y,x,w,S,A,P,_,T,I,B,D){let z=_/(_-T);B.x=S+(A-S)*z,D.start.subVectors(x,y).multiplyScalar(z).add(y),z=_/(_-I),B.y=S+(P-S)*z,D.end.subVectors(w,y).multiplyScalar(z).add(y)}function m(y,x,w,S,A,P,_,T,I,B,D){if(A>0)p(y.c,y.a,y.b,S,x,w,I,_,T,B,D);else if(P>0)p(y.b,y.a,y.c,w,x,S,T,_,I,B,D);else if(T*I>0||_!=0)p(y.a,y.b,y.c,x,w,S,_,T,I,B,D);else if(T!=0)p(y.b,y.a,y.c,w,x,S,T,_,I,B,D);else if(I!=0)p(y.c,y.a,y.b,S,x,w,I,_,T,B,D);else return!0;return!1}function g(y,x,w,S){const A=x.degenerateSegment,P=y.plane.distanceToPoint(A.start),_=y.plane.distanceToPoint(A.end);return j(P)?j(_)?d(y,x,w,S):(w&&(w.start.copy(A.start),w.end.copy(A.start)),y.containsPoint(A.start)):j(_)?(w&&(w.start.copy(A.end),w.end.copy(A.end)),y.containsPoint(A.end)):y.plane.intersectLine(A,n)!=null?(w&&(w.start.copy(n),w.end.copy(n)),y.containsPoint(n)):!1}function v(y,x,w){const S=x.a;return j(y.plane.distanceToPoint(S))&&y.containsPoint(S)?(w&&(w.start.copy(S),w.end.copy(S)),!0):!1}function b(y,x,w){const S=y.degenerateSegment,A=x.a;return S.closestPointToPoint(A,!0,n),A.distanceToSquared(n)<Kn?(w&&(w.start.copy(A),w.end.copy(A)),!0):!1}function h(y,x,w,S){if(y.isDegenerateIntoSegment)if(x.isDegenerateIntoSegment){const A=y.degenerateSegment,P=x.degenerateSegment,_=i,T=r;A.delta(_),P.delta(T);const I=n.subVectors(P.start,A.start),B=_.x*T.y-_.y*T.x;if(j(B))return!1;const D=(I.x*T.y-I.y*T.x)/B,z=-(_.x*I.y-_.y*I.x)/B;if(D<0||D>1||z<0||z>1)return!1;const E=A.start.z+_.z*D,F=P.start.z+T.z*z;return j(E-F)?(w&&(w.start.copy(A.start).addScaledVector(_,D),w.end.copy(A.start).addScaledVector(_,D)),!0):!1}else return x.isDegenerateIntoPoint?b(y,x,w):g(x,y,w,S);else{if(y.isDegenerateIntoPoint)return x.isDegenerateIntoPoint?x.a.distanceToSquared(y.a)<Kn?(w&&(w.start.copy(y.a),w.end.copy(y.a)),!0):!1:x.isDegenerateIntoSegment?b(x,y,w):v(x,y,w);if(x.isDegenerateIntoPoint)return v(y,x,w);if(x.isDegenerateIntoSegment)return g(y,x,w,S)}}return function(x,w=null,S=!1){this.needsUpdate&&this.update(),x.isExtendedTriangle?x.needsUpdate&&x.update():(s.copy(x),s.update(),x=s);const A=h(this,x,w,S);if(A!==void 0)return A;const P=this.plane,_=x.plane;let T=_.distanceToPoint(this.a),I=_.distanceToPoint(this.b),B=_.distanceToPoint(this.c);j(T)&&(T=0),j(I)&&(I=0),j(B)&&(B=0);const D=T*I,z=T*B;if(D>0&&z>0)return!1;let E=P.distanceToPoint(x.a),F=P.distanceToPoint(x.b),pt=P.distanceToPoint(x.c);j(E)&&(E=0),j(F)&&(F=0),j(pt)&&(pt=0);const $t=E*F,Xt=E*pt;if($t>0&&Xt>0)return!1;i.copy(P.normal),r.copy(_.normal);const Ke=i.cross(r);let je=0,Je=Math.abs(Ke.x);const kn=Math.abs(Ke.y);kn>Je&&(Je=kn,je=1),Math.abs(Ke.z)>Je&&(je=2);const Mt=Ns[je],ts=this.a[Mt],es=this.b[Mt],ns=this.c[Mt],is=x.a[Mt],ss=x.b[Mt],os=x.c[Mt];if(m(this,ts,es,ns,D,z,T,I,B,f,l))return d(this,x,w,S);if(m(x,is,ss,os,$t,Xt,E,F,pt,a,c))return d(this,x,w,S);if(f.y<f.x){const Qe=f.y;f.y=f.x,f.x=Qe,u.copy(l.start),l.start.copy(l.end),l.end.copy(u)}if(a.y<a.x){const Qe=a.y;a.y=a.x,a.x=Qe,u.copy(c.start),c.start.copy(c.end),c.end.copy(u)}return f.y<a.x||a.y<f.x?!1:(w&&(a.x>f.x?w.start.copy(c.start):w.start.copy(l.start),a.y<f.y?w.end.copy(c.end):w.end.copy(l.end)),!0)}})();nt.prototype.distanceToPoint=(function(){const s=new M;return function(e){return this.closestPointToPoint(e,s),e.distanceTo(s)}})();nt.prototype.distanceToTriangle=(function(){const s=new M,t=new M,e=["a","b","c"],n=new at,i=new at;return function(o,l=null,c=null){const u=l||c?n:null;if(this.intersectsTriangle(o,u,!0))return(l||c)&&(l&&u.getCenter(l),c&&u.getCenter(c)),0;let f=1/0;for(let a=0;a<3;a++){let d;const p=e[a],m=o[p];this.closestPointToPoint(m,s),d=m.distanceToSquared(s),d<f&&(f=d,l&&l.copy(s),c&&c.copy(m));const g=this[p];o.closestPointToPoint(g,s),d=g.distanceToSquared(s),d<f&&(f=d,l&&l.copy(g),c&&c.copy(s))}for(let a=0;a<3;a++){const d=e[a],p=e[(a+1)%3];n.set(this[d],this[p]);for(let m=0;m<3;m++){const g=e[m],v=e[(m+1)%3];i.set(o[g],o[v]),Ln(n,i,s,t);const b=s.distanceToSquared(t);b<f&&(f=b,l&&l.copy(s),c&&c.copy(t))}}return Math.sqrt(f)}})();class K{constructor(t,e,n){this.isOrientedBox=!0,this.min=new M,this.max=new M,this.matrix=new q,this.invMatrix=new q,this.points=new Array(8).fill().map(()=>new M),this.satAxes=new Array(3).fill().map(()=>new M),this.satBounds=new Array(3).fill().map(()=>new dt),this.alignedSatBounds=new Array(3).fill().map(()=>new dt),this.needsUpdate=!1,t&&this.min.copy(t),e&&this.max.copy(e),n&&this.matrix.copy(n)}set(t,e,n){this.min.copy(t),this.max.copy(e),this.matrix.copy(n),this.needsUpdate=!0}copy(t){this.min.copy(t.min),this.max.copy(t.max),this.matrix.copy(t.matrix),this.needsUpdate=!0}}K.prototype.update=(function(){return function(){const t=this.matrix,e=this.min,n=this.max,i=this.points;for(let u=0;u<=1;u++)for(let f=0;f<=1;f++)for(let a=0;a<=1;a++){const d=1*u|2*f|4*a,p=i[d];p.x=u?n.x:e.x,p.y=f?n.y:e.y,p.z=a?n.z:e.z,p.applyMatrix4(t)}const r=this.satBounds,o=this.satAxes,l=i[0];for(let u=0;u<3;u++){const f=o[u],a=r[u],d=1<<u,p=i[d];f.subVectors(l,p),a.setFromPoints(f,i)}const c=this.alignedSatBounds;c[0].setFromPointsField(i,"x"),c[1].setFromPointsField(i,"y"),c[2].setFromPointsField(i,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})();K.prototype.intersectsBox=(function(){const s=new dt;return function(e){this.needsUpdate&&this.update();const n=e.min,i=e.max,r=this.satBounds,o=this.satAxes,l=this.alignedSatBounds;if(s.min=n.x,s.max=i.x,l[0].isSeparated(s)||(s.min=n.y,s.max=i.y,l[1].isSeparated(s))||(s.min=n.z,s.max=i.z,l[2].isSeparated(s)))return!1;for(let c=0;c<3;c++){const u=o[c],f=r[c];if(s.setFromBox(u,e),f.isSeparated(s))return!1}return!0}})();K.prototype.intersectsTriangle=(function(){const s=new nt,t=new Array(3),e=new dt,n=new dt,i=new M;return function(o){this.needsUpdate&&this.update(),o.isExtendedTriangle?o.needsUpdate&&o.update():(s.copy(o),s.update(),o=s);const l=this.satBounds,c=this.satAxes;t[0]=o.a,t[1]=o.b,t[2]=o.c;for(let d=0;d<3;d++){const p=l[d],m=c[d];if(e.setFromPoints(m,t),p.isSeparated(e))return!1}const u=o.satBounds,f=o.satAxes,a=this.points;for(let d=0;d<3;d++){const p=u[d],m=f[d];if(e.setFromPoints(m,a),p.isSeparated(e))return!1}for(let d=0;d<3;d++){const p=c[d];for(let m=0;m<4;m++){const g=f[m];if(i.crossVectors(p,g),e.setFromPoints(i,t),n.setFromPoints(i,a),e.isSeparated(n))return!1}}return!0}})();K.prototype.closestPointToPoint=(function(){return function(t,e){return this.needsUpdate&&this.update(),e.copy(t).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),e}})();K.prototype.distanceToPoint=(function(){const s=new M;return function(e){return this.closestPointToPoint(e,s),e.distanceTo(s)}})();K.prototype.distanceToBox=(function(){const s=["x","y","z"],t=new Array(12).fill().map(()=>new at),e=new Array(12).fill().map(()=>new at),n=new M,i=new M;return function(o,l=0,c=null,u=null){if(this.needsUpdate&&this.update(),this.intersectsBox(o))return(c||u)&&(o.getCenter(i),this.closestPointToPoint(i,n),o.closestPointToPoint(n,i),c&&c.copy(n),u&&u.copy(i)),0;const f=l*l,a=o.min,d=o.max,p=this.points;let m=1/0;for(let v=0;v<8;v++){const b=p[v];i.copy(b).clamp(a,d);const h=b.distanceToSquared(i);if(h<m&&(m=h,c&&c.copy(b),u&&u.copy(i),h<f))return Math.sqrt(h)}let g=0;for(let v=0;v<3;v++)for(let b=0;b<=1;b++)for(let h=0;h<=1;h++){const y=(v+1)%3,x=(v+2)%3,w=b<<y|h<<x,S=1<<v|b<<y|h<<x,A=p[w],P=p[S];t[g].set(A,P);const T=s[v],I=s[y],B=s[x],D=e[g],z=D.start,E=D.end;z[T]=a[T],z[I]=b?a[I]:d[I],z[B]=h?a[B]:d[B],E[T]=d[T],E[I]=b?a[I]:d[I],E[B]=h?a[B]:d[B],g++}for(let v=0;v<=1;v++)for(let b=0;b<=1;b++)for(let h=0;h<=1;h++){i.x=v?d.x:a.x,i.y=b?d.y:a.y,i.z=h?d.z:a.z,this.closestPointToPoint(i,n);const y=i.distanceToSquared(n);if(y<m&&(m=y,c&&c.copy(n),u&&u.copy(i),y<f))return Math.sqrt(y)}for(let v=0;v<12;v++){const b=t[v];for(let h=0;h<12;h++){const y=e[h];Ln(b,y,n,i);const x=n.distanceToSquared(i);if(x<m&&(m=x,c&&c.copy(n),u&&u.copy(i),x<f))return Math.sqrt(x)}}return Math.sqrt(m)}})();class Ls extends me{constructor(){super(()=>new nt)}}const tt=new Ls,Yt=new M,an=new M;function Hs(s,t,e={},n=0,i=1/0){const r=n*n,o=i*i;let l=1/0,c=null;if(s.shapecast({boundsTraverseOrder:f=>(Yt.copy(t).clamp(f.min,f.max),Yt.distanceToSquared(t)),intersectsBounds:(f,a,d)=>d<l&&d<o,intersectsTriangle:(f,a)=>{f.closestPointToPoint(t,Yt);const d=t.distanceToSquared(Yt);return d<l&&(an.copy(Yt),l=d,c=a),d<r}}),l===1/0)return null;const u=Math.sqrt(l);return e.point?e.point.copy(an):e.point=an.clone(),e.distance=u,e.faceIndex=c,e}const ve=parseInt(de)>=169,Us=parseInt(de)<=161,vt=new M,bt=new M,wt=new M,be=new X,we=new X,Ae=new X,jn=new M,Jn=new M,Qn=new M,Zt=new M;function ks(s,t,e,n,i,r,o,l){let c;if(r===Ci?c=s.intersectTriangle(n,e,t,!0,i):c=s.intersectTriangle(t,e,n,r!==rs,i),c===null)return null;const u=s.origin.distanceTo(i);return u<o||u>l?null:{distance:u,point:i.clone()}}function ti(s,t,e,n,i,r,o,l,c,u,f){vt.fromBufferAttribute(t,r),bt.fromBufferAttribute(t,o),wt.fromBufferAttribute(t,l);const a=ks(s,vt,bt,wt,Zt,c,u,f);if(a){if(n){be.fromBufferAttribute(n,r),we.fromBufferAttribute(n,o),Ae.fromBufferAttribute(n,l),a.uv=new X;const p=Z.getInterpolation(Zt,vt,bt,wt,be,we,Ae,a.uv);ve||(a.uv=p)}if(i){be.fromBufferAttribute(i,r),we.fromBufferAttribute(i,o),Ae.fromBufferAttribute(i,l),a.uv1=new X;const p=Z.getInterpolation(Zt,vt,bt,wt,be,we,Ae,a.uv1);ve||(a.uv1=p),Us&&(a.uv2=a.uv1)}if(e){jn.fromBufferAttribute(e,r),Jn.fromBufferAttribute(e,o),Qn.fromBufferAttribute(e,l),a.normal=new M;const p=Z.getInterpolation(Zt,vt,bt,wt,jn,Jn,Qn,a.normal);a.normal.dot(s.direction)>0&&a.normal.multiplyScalar(-1),ve||(a.normal=p)}const d={a:r,b:o,c:l,normal:new M,materialIndex:0};if(Z.getNormal(vt,bt,wt,d.normal),a.face=d,a.faceIndex=r,ve){const p=new M;Z.getBarycoord(Zt,vt,bt,wt,p),a.barycoord=p}}return a}function ei(s){return s&&s.isMaterial?s.side:s}function Ge(s,t,e,n,i,r,o){const l=n*3;let c=l+0,u=l+1,f=l+2;const{index:a,groups:d}=s;s.index&&(c=a.getX(c),u=a.getX(u),f=a.getX(f));const{position:p,normal:m,uv:g,uv1:v}=s.attributes;if(Array.isArray(t)){const b=n*3;for(let h=0,y=d.length;h<y;h++){const{start:x,count:w,materialIndex:S}=d[h];if(b>=x&&b<x+w){const A=ei(t[S]),P=ti(e,p,m,g,v,c,u,f,A,r,o);if(P)if(P.faceIndex=n,P.face.materialIndex=S,i)i.push(P);else return P}}}else{const b=ei(t),h=ti(e,p,m,g,v,c,u,f,b,r,o);if(h)if(h.faceIndex=n,h.face.materialIndex=0,i)i.push(h);else return h}return null}function L(s,t,e,n){const i=s.a,r=s.b,o=s.c;let l=t,c=t+1,u=t+2;e&&(l=e.getX(l),c=e.getX(c),u=e.getX(u)),i.x=n.getX(l),i.y=n.getY(l),i.z=n.getZ(l),r.x=n.getX(c),r.y=n.getY(c),r.z=n.getZ(c),o.x=n.getX(u),o.y=n.getY(u),o.z=n.getZ(u)}const Gt=new M,Kt=new M,jt=new M,ni=new X,ii=new X,si=new X;function qo(s,t,e,n){const i=t.getIndex().array,r=t.getAttribute("position"),o=t.getAttribute("uv"),l=i[e*3],c=i[e*3+1],u=i[e*3+2];Gt.fromBufferAttribute(r,l),Kt.fromBufferAttribute(r,c),jt.fromBufferAttribute(r,u);let f=0;const a=t.groups,d=e*3;for(let g=0,v=a.length;g<v;g++){const b=a[g],{start:h,count:y}=b;if(d>=h&&d<h+y){f=b.materialIndex;break}}const p=n&&n.barycoord?n.barycoord:new M;Z.getBarycoord(s,Gt,Kt,jt,p);let m=null;return o&&(ni.fromBufferAttribute(o,l),ii.fromBufferAttribute(o,c),si.fromBufferAttribute(o,u),n&&n.uv?m=n.uv:m=new X,Z.getInterpolation(s,Gt,Kt,jt,ni,ii,si,m)),n?(n.face||(n.face={}),n.face.a=l,n.face.b=c,n.face.c=u,n.face.materialIndex=f,n.face.normal||(n.face.normal=new M),Z.getNormal(Gt,Kt,jt,n.face.normal),m&&(n.uv=m),n.barycoord=p,n):{face:{a:l,b:c,c:u,materialIndex:f,normal:Z.getNormal(Gt,Kt,jt,new M)},uv:m,barycoord:p}}function Os(s,t,e,n,i,r,o,l){const{geometry:c,_indirectBuffer:u}=s;for(let f=n,a=n+i;f<a;f++)Ge(c,t,e,f,r,o,l)}function qs(s,t,e,n,i,r,o){const{geometry:l,_indirectBuffer:c}=s;let u=1/0,f=null;for(let a=n,d=n+i;a<d;a++){let p;p=Ge(l,t,e,a,null,r,o),p&&p.distance<u&&(f=p,u=p.distance)}return f}function Ws(s,t,e,n,i,r,o){const{geometry:l}=e,{index:c}=l,u=l.attributes.position;for(let f=s,a=t+s;f<a;f++){let d;if(d=f,L(o,d*3,c,u),o.needsUpdate=!0,n(o,d,i,r))return!0}return!1}function $s(s,t=null){t&&Array.isArray(t)&&(t=new Set(t));const e=s.geometry,n=e.index?e.index.array:null,i=e.attributes.position;let r,o,l,c,u=0;const f=s._roots;for(let d=0,p=f.length;d<p;d++)r=f[d],o=new Uint32Array(r),l=new Uint16Array(r),c=new Float32Array(r),a(0,u),u+=r.byteLength;function a(d,p,m=!1){const g=d*2;if(C(g,l)){const v=H(d,o),b=$(g,l);let h=1/0,y=1/0,x=1/0,w=-1/0,S=-1/0,A=-1/0;for(let P=3*v,_=3*(v+b);P<_;P++){let T=n[P];const I=i.getX(T),B=i.getY(T),D=i.getZ(T);I<h&&(h=I),I>w&&(w=I),B<y&&(y=B),B>S&&(S=B),D<x&&(x=D),D>A&&(A=D)}return c[d+0]!==h||c[d+1]!==y||c[d+2]!==x||c[d+3]!==w||c[d+4]!==S||c[d+5]!==A?(c[d+0]=h,c[d+1]=y,c[d+2]=x,c[d+3]=w,c[d+4]=S,c[d+5]=A,!0):!1}else{const v=U(d),b=k(d,o);let h=m,y=!1,x=!1;if(t){if(!h){const T=v/N+p/G,I=b/N+p/G;y=t.has(T),x=t.has(I),h=!y&&!x}}else y=!0,x=!0;const w=h||y,S=h||x;let A=!1;w&&(A=a(v,p,h));let P=!1;S&&(P=a(b,p,h));const _=A||P;if(_)for(let T=0;T<3;T++){const I=v+T,B=b+T,D=c[I],z=c[I+3],E=c[B],F=c[B+3];c[d+T]=D<E?D:E,c[d+T+3]=z>F?z:F}return _}}}function it(s,t,e,n,i){let r,o,l,c,u,f;const a=1/e.direction.x,d=1/e.direction.y,p=1/e.direction.z,m=e.origin.x,g=e.origin.y,v=e.origin.z;let b=t[s],h=t[s+3],y=t[s+1],x=t[s+3+1],w=t[s+2],S=t[s+3+2];return a>=0?(r=(b-m)*a,o=(h-m)*a):(r=(h-m)*a,o=(b-m)*a),d>=0?(l=(y-g)*d,c=(x-g)*d):(l=(x-g)*d,c=(y-g)*d),r>c||l>o||((l>r||isNaN(r))&&(r=l),(c<o||isNaN(o))&&(o=c),p>=0?(u=(w-v)*p,f=(S-v)*p):(u=(S-v)*p,f=(w-v)*p),r>f||u>o)?!1:((u>r||r!==r)&&(r=u),(f<o||o!==o)&&(o=f),r<=i&&o>=n)}function Xs(s,t,e,n,i,r,o,l){const{geometry:c,_indirectBuffer:u}=s;for(let f=n,a=n+i;f<a;f++){let d=u?u[f]:f;Ge(c,t,e,d,r,o,l)}}function Ys(s,t,e,n,i,r,o){const{geometry:l,_indirectBuffer:c}=s;let u=1/0,f=null;for(let a=n,d=n+i;a<d;a++){let p;p=Ge(l,t,e,c?c[a]:a,null,r,o),p&&p.distance<u&&(f=p,u=p.distance)}return f}function Zs(s,t,e,n,i,r,o){const{geometry:l}=e,{index:c}=l,u=l.attributes.position;for(let f=s,a=t+s;f<a;f++){let d;if(d=e.resolveTriangleIndex(f),L(o,d*3,c,u),o.needsUpdate=!0,n(o,d,i,r))return!0}return!1}function Gs(s,t,e,n,i,r,o){V.setBuffer(s._roots[t]),it(0,V.float32Array,n,r,o)&&_n(0,s,e,n,i,r,o),V.clearBuffer()}function _n(s,t,e,n,i,r,o){const{float32Array:l,uint16Array:c,uint32Array:u}=V,f=s*2;if(C(f,c)){const d=H(s,u),p=$(f,c);Os(t,e,n,d,p,i,r,o)}else{const d=U(s);it(d,l,n,r,o)&&_n(d,t,e,n,i,r,o);const p=k(s,u);it(p,l,n,r,o)&&_n(p,t,e,n,i,r,o)}}const Ks=["x","y","z"];function js(s,t,e,n,i,r){V.setBuffer(s._roots[t]);let o=null;return it(0,V.float32Array,n,i,r)&&(o=In(0,s,e,n,i,r)),V.clearBuffer(),o}function In(s,t,e,n,i,r){const{float32Array:o,uint16Array:l,uint32Array:c}=V;let u=s*2;if(C(u,l)){const a=H(s,c),d=$(u,l);return qs(t,e,n,a,d,i,r)}else{const a=$e(s,c),d=Ks[a],m=n.direction[d]>=0;let g,v;m?(g=U(s),v=k(s,c)):(g=k(s,c),v=U(s));const h=it(g,o,n,i,r)?In(g,t,e,n,i,r):null;if(h){const w=h.point[d];if(m?w<=o[v+a]:w>=o[v+a+3])return h}const x=it(v,o,n,i,r)?In(v,t,e,n,i,r):null;return h&&x?h.distance<=x.distance?h:x:h||x||null}}const Be=new Y,Ct=new nt,Nt=new nt,Jt=new q,oi=new K,Te=new K;function Js(s,t,e,n){V.setBuffer(s._roots[t]);const i=Mn(0,s,e,n);return V.clearBuffer(),i}function Mn(s,t,e,n,i=null){const{float32Array:r,uint16Array:o,uint32Array:l}=V;let c=s*2;if(i===null&&(e.boundingBox||e.computeBoundingBox(),oi.set(e.boundingBox.min,e.boundingBox.max,n),i=oi),C(c,o)){const f=t.geometry,a=f.index,d=f.attributes.position,p=e.index,m=e.attributes.position,g=H(s,l),v=$(c,o);if(Jt.copy(n).invert(),e.boundsTree)return R(s,r,Te),Te.matrix.copy(Jt),Te.needsUpdate=!0,e.boundsTree.shapecast({intersectsBounds:h=>Te.intersectsBox(h),intersectsTriangle:h=>{h.a.applyMatrix4(n),h.b.applyMatrix4(n),h.c.applyMatrix4(n),h.needsUpdate=!0;for(let y=g*3,x=(v+g)*3;y<x;y+=3)if(L(Nt,y,a,d),Nt.needsUpdate=!0,h.intersectsTriangle(Nt))return!0;return!1}});{const b=Ye(e);for(let h=g*3,y=(v+g)*3;h<y;h+=3){L(Ct,h,a,d),Ct.a.applyMatrix4(Jt),Ct.b.applyMatrix4(Jt),Ct.c.applyMatrix4(Jt),Ct.needsUpdate=!0;for(let x=0,w=b*3;x<w;x+=3)if(L(Nt,x,p,m),Nt.needsUpdate=!0,Ct.intersectsTriangle(Nt))return!0}}}else{const f=U(s),a=k(s,l);return R(f,r,Be),!!(i.intersectsBox(Be)&&Mn(f,t,e,n,i)||(R(a,r,Be),i.intersectsBox(Be)&&Mn(a,t,e,n,i)))}}const Pe=new q,ln=new K,Qt=new K,Qs=new M,to=new M,eo=new M,no=new M;function io(s,t,e,n={},i={},r=0,o=1/0){t.boundingBox||t.computeBoundingBox(),ln.set(t.boundingBox.min,t.boundingBox.max,e),ln.needsUpdate=!0;const l=s.geometry,c=l.attributes.position,u=l.index,f=t.attributes.position,a=t.index,d=tt.getPrimitive(),p=tt.getPrimitive();let m=Qs,g=to,v=null,b=null;i&&(v=eo,b=no);let h=1/0,y=null,x=null;return Pe.copy(e).invert(),Qt.matrix.copy(Pe),s.shapecast({boundsTraverseOrder:w=>ln.distanceToBox(w),intersectsBounds:(w,S,A)=>A<h&&A<o?(S&&(Qt.min.copy(w.min),Qt.max.copy(w.max),Qt.needsUpdate=!0),!0):!1,intersectsRange:(w,S)=>{if(t.boundsTree)return t.boundsTree.shapecast({boundsTraverseOrder:P=>Qt.distanceToBox(P),intersectsBounds:(P,_,T)=>T<h&&T<o,intersectsRange:(P,_)=>{for(let T=P,I=P+_;T<I;T++){L(p,3*T,a,f),p.a.applyMatrix4(e),p.b.applyMatrix4(e),p.c.applyMatrix4(e),p.needsUpdate=!0;for(let B=w,D=w+S;B<D;B++){L(d,3*B,u,c),d.needsUpdate=!0;const z=d.distanceToTriangle(p,m,v);if(z<h&&(g.copy(m),b&&b.copy(v),h=z,y=B,x=T),z<r)return!0}}}});{const A=Ye(t);for(let P=0,_=A;P<_;P++){L(p,3*P,a,f),p.a.applyMatrix4(e),p.b.applyMatrix4(e),p.c.applyMatrix4(e),p.needsUpdate=!0;for(let T=w,I=w+S;T<I;T++){L(d,3*T,u,c),d.needsUpdate=!0;const B=d.distanceToTriangle(p,m,v);if(B<h&&(g.copy(m),b&&b.copy(v),h=B,y=T,x=P),B<r)return!0}}}}}),tt.releasePrimitive(d),tt.releasePrimitive(p),h===1/0?null:(n.point?n.point.copy(g):n.point=g.clone(),n.distance=h,n.faceIndex=y,i&&(i.point?i.point.copy(b):i.point=b.clone(),i.point.applyMatrix4(Pe),g.applyMatrix4(Pe),i.distance=g.sub(i.point).length(),i.faceIndex=x),n)}function so(s,t=null){t&&Array.isArray(t)&&(t=new Set(t));const e=s.geometry,n=e.index?e.index.array:null,i=e.attributes.position;let r,o,l,c,u=0;const f=s._roots;for(let d=0,p=f.length;d<p;d++)r=f[d],o=new Uint32Array(r),l=new Uint16Array(r),c=new Float32Array(r),a(0,u),u+=r.byteLength;function a(d,p,m=!1){const g=d*2;if(C(g,l)){const v=H(d,o),b=$(g,l);let h=1/0,y=1/0,x=1/0,w=-1/0,S=-1/0,A=-1/0;for(let P=v,_=v+b;P<_;P++){const T=3*s.resolveTriangleIndex(P);for(let I=0;I<3;I++){let B=T+I;B=n?n[B]:B;const D=i.getX(B),z=i.getY(B),E=i.getZ(B);D<h&&(h=D),D>w&&(w=D),z<y&&(y=z),z>S&&(S=z),E<x&&(x=E),E>A&&(A=E)}}return c[d+0]!==h||c[d+1]!==y||c[d+2]!==x||c[d+3]!==w||c[d+4]!==S||c[d+5]!==A?(c[d+0]=h,c[d+1]=y,c[d+2]=x,c[d+3]=w,c[d+4]=S,c[d+5]=A,!0):!1}else{const v=U(d),b=k(d,o);let h=m,y=!1,x=!1;if(t){if(!h){const T=v/N+p/G,I=b/N+p/G;y=t.has(T),x=t.has(I),h=!y&&!x}}else y=!0,x=!0;const w=h||y,S=h||x;let A=!1;w&&(A=a(v,p,h));let P=!1;S&&(P=a(b,p,h));const _=A||P;if(_)for(let T=0;T<3;T++){const I=v+T,B=b+T,D=c[I],z=c[I+3],E=c[B],F=c[B+3];c[d+T]=D<E?D:E,c[d+T+3]=z>F?z:F}return _}}}function oo(s,t,e,n,i,r,o){V.setBuffer(s._roots[t]),it(0,V.float32Array,n,r,o)&&Dn(0,s,e,n,i,r,o),V.clearBuffer()}function Dn(s,t,e,n,i,r,o){const{float32Array:l,uint16Array:c,uint32Array:u}=V,f=s*2;if(C(f,c)){const d=H(s,u),p=$(f,c);Xs(t,e,n,d,p,i,r,o)}else{const d=U(s);it(d,l,n,r,o)&&Dn(d,t,e,n,i,r,o);const p=k(s,u);it(p,l,n,r,o)&&Dn(p,t,e,n,i,r,o)}}const ro=["x","y","z"];function co(s,t,e,n,i,r){V.setBuffer(s._roots[t]);let o=null;return it(0,V.float32Array,n,i,r)&&(o=zn(0,s,e,n,i,r)),V.clearBuffer(),o}function zn(s,t,e,n,i,r){const{float32Array:o,uint16Array:l,uint32Array:c}=V;let u=s*2;if(C(u,l)){const a=H(s,c),d=$(u,l);return Ys(t,e,n,a,d,i,r)}else{const a=$e(s,c),d=ro[a],m=n.direction[d]>=0;let g,v;m?(g=U(s),v=k(s,c)):(g=k(s,c),v=U(s));const h=it(g,o,n,i,r)?zn(g,t,e,n,i,r):null;if(h){const w=h.point[d];if(m?w<=o[v+a]:w>=o[v+a+3])return h}const x=it(v,o,n,i,r)?zn(v,t,e,n,i,r):null;return h&&x?h.distance<=x.distance?h:x:h||x||null}}const Se=new Y,Lt=new nt,Ht=new nt,te=new q,ri=new K,_e=new K;function ao(s,t,e,n){V.setBuffer(s._roots[t]);const i=En(0,s,e,n);return V.clearBuffer(),i}function En(s,t,e,n,i=null){const{float32Array:r,uint16Array:o,uint32Array:l}=V;let c=s*2;if(i===null&&(e.boundingBox||e.computeBoundingBox(),ri.set(e.boundingBox.min,e.boundingBox.max,n),i=ri),C(c,o)){const f=t.geometry,a=f.index,d=f.attributes.position,p=e.index,m=e.attributes.position,g=H(s,l),v=$(c,o);if(te.copy(n).invert(),e.boundsTree)return R(s,r,_e),_e.matrix.copy(te),_e.needsUpdate=!0,e.boundsTree.shapecast({intersectsBounds:h=>_e.intersectsBox(h),intersectsTriangle:h=>{h.a.applyMatrix4(n),h.b.applyMatrix4(n),h.c.applyMatrix4(n),h.needsUpdate=!0;for(let y=g,x=v+g;y<x;y++)if(L(Ht,3*t.resolveTriangleIndex(y),a,d),Ht.needsUpdate=!0,h.intersectsTriangle(Ht))return!0;return!1}});{const b=Ye(e);for(let h=g,y=v+g;h<y;h++){const x=t.resolveTriangleIndex(h);L(Lt,3*x,a,d),Lt.a.applyMatrix4(te),Lt.b.applyMatrix4(te),Lt.c.applyMatrix4(te),Lt.needsUpdate=!0;for(let w=0,S=b*3;w<S;w+=3)if(L(Ht,w,p,m),Ht.needsUpdate=!0,Lt.intersectsTriangle(Ht))return!0}}}else{const f=U(s),a=k(s,l);return R(f,r,Se),!!(i.intersectsBox(Se)&&En(f,t,e,n,i)||(R(a,r,Se),i.intersectsBox(Se)&&En(a,t,e,n,i)))}}const Ie=new q,un=new K,ee=new K,lo=new M,uo=new M,fo=new M,po=new M;function ho(s,t,e,n={},i={},r=0,o=1/0){t.boundingBox||t.computeBoundingBox(),un.set(t.boundingBox.min,t.boundingBox.max,e),un.needsUpdate=!0;const l=s.geometry,c=l.attributes.position,u=l.index,f=t.attributes.position,a=t.index,d=tt.getPrimitive(),p=tt.getPrimitive();let m=lo,g=uo,v=null,b=null;i&&(v=fo,b=po);let h=1/0,y=null,x=null;return Ie.copy(e).invert(),ee.matrix.copy(Ie),s.shapecast({boundsTraverseOrder:w=>un.distanceToBox(w),intersectsBounds:(w,S,A)=>A<h&&A<o?(S&&(ee.min.copy(w.min),ee.max.copy(w.max),ee.needsUpdate=!0),!0):!1,intersectsRange:(w,S)=>{if(t.boundsTree){const A=t.boundsTree;return A.shapecast({boundsTraverseOrder:P=>ee.distanceToBox(P),intersectsBounds:(P,_,T)=>T<h&&T<o,intersectsRange:(P,_)=>{for(let T=P,I=P+_;T<I;T++){const B=A.resolveTriangleIndex(T);L(p,3*B,a,f),p.a.applyMatrix4(e),p.b.applyMatrix4(e),p.c.applyMatrix4(e),p.needsUpdate=!0;for(let D=w,z=w+S;D<z;D++){const E=s.resolveTriangleIndex(D);L(d,3*E,u,c),d.needsUpdate=!0;const F=d.distanceToTriangle(p,m,v);if(F<h&&(g.copy(m),b&&b.copy(v),h=F,y=D,x=T),F<r)return!0}}}})}else{const A=Ye(t);for(let P=0,_=A;P<_;P++){L(p,3*P,a,f),p.a.applyMatrix4(e),p.b.applyMatrix4(e),p.c.applyMatrix4(e),p.needsUpdate=!0;for(let T=w,I=w+S;T<I;T++){const B=s.resolveTriangleIndex(T);L(d,3*B,u,c),d.needsUpdate=!0;const D=d.distanceToTriangle(p,m,v);if(D<h&&(g.copy(m),b&&b.copy(v),h=D,y=T,x=P),D<r)return!0}}}}}),tt.releasePrimitive(d),tt.releasePrimitive(p),h===1/0?null:(n.point?n.point.copy(g):n.point=g.clone(),n.distance=h,n.faceIndex=y,i&&(i.point?i.point.copy(b):i.point=b.clone(),i.point.applyMatrix4(Ie),g.applyMatrix4(Ie),i.distance=g.sub(i.point).length(),i.faceIndex=x),n)}function ci(s,t,e){return s===null?null:(s.point.applyMatrix4(t.matrixWorld),s.distance=s.point.distanceTo(e.ray.origin),s.object=t,s)}const Me=new K,De=new pe,ai=new M,li=new q,ui=new M,fn=["getX","getY","getZ"];class It extends Ze{static serialize(t,e={}){e={cloneBuffers:!0,...e};const n=t.geometry,i=t._roots,r=t._indirectBuffer,o=n.getIndex(),l={version:1,roots:null,index:null,indirectBuffer:null};return e.cloneBuffers?(l.roots=i.map(c=>c.slice()),l.index=o?o.array.slice():null,l.indirectBuffer=r?r.slice():null):(l.roots=i,l.index=o?o.array:null,l.indirectBuffer=r),l}static deserialize(t,e,n={}){n={setIndex:!0,indirect:!!t.indirectBuffer,...n};const{index:i,roots:r,indirectBuffer:o}=t;t.version||(console.warn("MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data."),c(r));const l=new It(e,{...n,[fe]:!0});if(l._roots=r,l._indirectBuffer=o||null,n.setIndex){const u=e.getIndex();if(u===null){const f=new xt(t.index,1,!1);e.setIndex(f)}else u.array!==i&&(u.array.set(i),u.needsUpdate=!0)}return l;function c(u){for(let f=0;f<u.length;f++){const a=u[f],d=new Uint32Array(a),p=new Uint16Array(a);for(let m=0,g=a.byteLength/G;m<g;m++){const v=N*m,b=2*v;C(b,p)||(d[v+6]=d[v+6]/N-m)}}}}get primitiveStride(){return 3}get resolveTriangleIndex(){return this.resolvePrimitiveIndex}constructor(t,e={}){e.maxLeafTris&&(console.warn('MeshBVH: "maxLeafTris" option has been deprecated. Use "targetLeafSize", instead.'),e={...e,targetLeafSize:e.maxLeafTris}),super(t,e)}shiftTriangleOffsets(t){return super.shiftPrimitiveOffsets(t)}writePrimitiveBounds(t,e,n){const i=this.geometry,r=this._indirectBuffer,o=i.attributes.position,l=i.index?i.index.array:null,u=(r?r[t]:t)*3;let f=u+0,a=u+1,d=u+2;l&&(f=l[f],a=l[a],d=l[d]);for(let p=0;p<3;p++){const m=o[fn[p]](f),g=o[fn[p]](a),v=o[fn[p]](d);let b=m;g<b&&(b=g),v<b&&(b=v);let h=m;g>h&&(h=g),v>h&&(h=v),e[n+p]=b,e[n+p+3]=h}return e}computePrimitiveBounds(t,e,n){const i=this.geometry,r=this._indirectBuffer,o=i.attributes.position,l=i.index?i.index.array:null,c=o.normalized;if(t<0||e+t-n.offset>n.length/6)throw new Error("MeshBVH: compute triangle bounds range is invalid.");const u=o.array,f=o.offset||0;let a=3;o.isInterleavedBufferAttribute&&(a=o.data.stride);const d=["getX","getY","getZ"],p=n.offset;for(let m=t,g=t+e;m<g;m++){const b=(r?r[m]:m)*3,h=(m-p)*6;let y=b+0,x=b+1,w=b+2;l&&(y=l[y],x=l[x],w=l[w]),c||(y=y*a+f,x=x*a+f,w=w*a+f);for(let S=0;S<3;S++){let A,P,_;c?(A=o[d[S]](y),P=o[d[S]](x),_=o[d[S]](w)):(A=u[y+S],P=u[x+S],_=u[w+S]);let T=A;P<T&&(T=P),_<T&&(T=_);let I=A;P>I&&(I=P),_>I&&(I=_);const B=(I-T)/2,D=S*2;n[h+D+0]=T+B,n[h+D+1]=B+(Math.abs(T)+B)*Oe}}return n}raycastObject3D(t,e,n=[]){const{material:i}=t;if(i===void 0)return;li.copy(t.matrixWorld).invert(),De.copy(e.ray).applyMatrix4(li),ui.setFromMatrixScale(t.matrixWorld),ai.copy(De.direction).multiply(ui);const r=ai.length(),o=e.near/r,l=e.far/r;if(e.firstHitOnly===!0){let c=this.raycastFirst(De,i,o,l);c=ci(c,t,e),c&&n.push(c)}else{const c=this.raycast(De,i,o,l);for(let u=0,f=c.length;u<f;u++){const a=ci(c[u],t,e);a&&n.push(a)}}return n}refit(t=null){return(this.indirect?so:$s)(this,t)}raycast(t,e=wn,n=0,i=1/0){const r=this._roots,o=[],l=this.indirect?oo:Gs;for(let c=0,u=r.length;c<u;c++)l(this,c,e,t,o,n,i);return o}raycastFirst(t,e=wn,n=0,i=1/0){const r=this._roots;let o=null;const l=this.indirect?co:js;for(let c=0,u=r.length;c<u;c++){const f=l(this,c,e,t,n,i);f!=null&&(o==null||f.distance<o.distance)&&(o=f)}return o}intersectsGeometry(t,e){let n=!1;const i=this._roots,r=this.indirect?ao:Js;for(let o=0,l=i.length;o<l&&(n=r(this,o,t,e),!n);o++);return n}shapecast(t){const e=tt.getPrimitive(),n=super.shapecast({...t,intersectsPrimitive:t.intersectsTriangle,scratchPrimitive:e,iterate:this.indirect?Zs:Ws});return tt.releasePrimitive(e),n}bvhcast(t,e,n){let{intersectsRanges:i,intersectsTriangles:r}=n;const o=tt.getPrimitive(),l=this.geometry.index,c=this.geometry.attributes.position,u=this.indirect?m=>{const g=this.resolveTriangleIndex(m);L(o,g*3,l,c)}:m=>{L(o,m*3,l,c)},f=tt.getPrimitive(),a=t.geometry.index,d=t.geometry.attributes.position,p=t.indirect?m=>{const g=t.resolveTriangleIndex(m);L(f,g*3,a,d)}:m=>{L(f,m*3,a,d)};if(r){if(!(t instanceof It))throw new Error('MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.');const m=(g,v,b,h,y,x,w,S)=>{for(let A=b,P=b+h;A<P;A++){p(A),f.a.applyMatrix4(e),f.b.applyMatrix4(e),f.c.applyMatrix4(e),f.needsUpdate=!0;for(let _=g,T=g+v;_<T;_++)if(u(_),o.needsUpdate=!0,r(o,f,_,A,y,x,w,S))return!0}return!1};if(i){const g=i;i=function(v,b,h,y,x,w,S,A){return g(v,b,h,y,x,w,S,A)?!0:m(v,b,h,y,x,w,S,A)}}else i=m}return super.bvhcast(t,e,{intersectsRanges:i})}intersectsBox(t,e){return Me.set(t.min,t.max,e),Me.needsUpdate=!0,this.shapecast({intersectsBounds:n=>Me.intersectsBox(n),intersectsTriangle:n=>Me.intersectsTriangle(n)})}intersectsSphere(t){return this.shapecast({intersectsBounds:e=>t.intersectsBox(e),intersectsTriangle:e=>e.intersectsSphere(t)})}closestPointToGeometry(t,e,n={},i={},r=0,o=1/0){return(this.indirect?ho:io)(this,t,e,n,i,r,o)}closestPointToPoint(t,e={},n=0,i=1/0){return Hs(this,t,e,n,i)}}const fi=new q,Ut=new pe,di=new me(()=>new at),dn=new M,pi=new M,ze=new Y,pn=new M,hi=["getX","getY","getZ"];class mo extends Ze{get primitiveStride(){return 2}writePrimitiveBounds(t,e,n){const i=this._indirectBuffer,{geometry:r,primitiveStride:o}=this,l=r.attributes.position,c=r.index,u=c?c.count:l.count;let a=(i?i[t]:t)*o,d=(a+1)%u;c&&(a=c.getX(a),d=c.getX(d));for(let p=0;p<3;p++){const m=l[hi[p]](a),g=l[hi[p]](d),v=m<g?m:g,b=m>g?m:g;e[n+p]=v,e[n+p+3]=b}return e}shapecast(t){const e=di.getPrimitive(),n=super.shapecast({...t,intersectsPrimitive:t.intersectsLine,scratchPrimitive:e,iterate:xo});return di.releasePrimitive(e),n}raycastObject3D(t,e,n=[]){const{matrixWorld:i}=t,{firstHitOnly:r}=e;fi.copy(i).invert(),Ut.copy(e.ray).applyMatrix4(fi);const l=e.params.Line.threshold/((t.scale.x+t.scale.y+t.scale.z)/3),c=l*l;let u=null,f=1/0;return this.shapecast({boundsTraverseOrder:a=>a.distanceToPoint(Ut.origin),intersectsBounds:a=>{if(ze.copy(a).expandByScalar(l),r){if(!Ut.intersectBox(ze,pn))return et;let d;return ze.containsPoint(Ut.origin)?d=0:(pn.applyMatrix4(i),d=e.ray.origin.distanceTo(pn)),d<f?gt:et}else return Ut.intersectsBox(ze)?gt:et},intersectsLine:(a,d)=>{if(Ut.distanceSqToSegment(a.start,a.end,dn,pi)>c)return;dn.applyMatrix4(t.matrixWorld);const m=e.ray.origin.distanceTo(dn);m<e.near||m>e.far||r&&m>=f||(f=m,d=this.resolvePrimitiveIndex(d),u={distance:m,point:pi.clone().applyMatrix4(i),index:d*this.primitiveStride,face:null,faceIndex:null,barycoord:null,object:t},r||n.push(u))}}),r&&u&&n.push(u),n}}class yo extends mo{get primitiveStride(){return 1}constructor(t,e={}){e={...e,indirect:!0},super(t,e)}}class Wo extends yo{getRootRanges(...t){const e=super.getRootRanges(...t);return e.forEach(n=>n.count--),e}}function xo(s,t,e,n,i,r,o){const{geometry:l,primitiveStride:c}=e,{index:u}=l,f=l.attributes.position,a=u?u.count:f.count;for(let d=s,p=t+s;d<p;d++){let g=e.resolvePrimitiveIndex(d)*c,v=(g+1)%a;if(u&&(g=u.getX(g),v=u.getX(v)),o.start.fromBufferAttribute(f,g),o.end.fromBufferAttribute(f,v),n(o,d,i,r))return!0}return!1}const mi=new q,At=new pe,yi=new me(()=>new M),Ee=new Y,hn=new M;class $o extends Ze{get primitiveStride(){return 1}writePrimitiveBounds(t,e,n){const i=this._indirectBuffer,{geometry:r}=this,o=r.attributes.position,l=r.index;let c=i?i[t]:t;l&&(c=l.getX(c));const u=o.getX(c),f=o.getY(c),a=o.getZ(c);return e[n+0]=u,e[n+1]=f,e[n+2]=a,e[n+3]=u,e[n+4]=f,e[n+5]=a,e}shapecast(t){const e=yi.getPrimitive(),n=super.shapecast({...t,intersectsPrimitive:t.intersectsPoint,scratchPrimitive:e,iterate:go});return yi.releasePrimitive(e),n}raycastObject3D(t,e,n=[]){const{geometry:i}=this,{matrixWorld:r}=t,{firstHitOnly:o}=e;mi.copy(r).invert(),At.copy(e.ray).applyMatrix4(mi);const c=e.params.Points.threshold/((t.scale.x+t.scale.y+t.scale.z)/3),u=c*c;let f=null,a=1/0;return this.shapecast({boundsTraverseOrder:d=>d.distanceToPoint(At.origin),intersectsBounds:d=>{if(Ee.copy(d).expandByScalar(c),o){if(!At.intersectBox(Ee,hn))return et;let p;return Ee.containsPoint(At.origin)?p=0:(hn.applyMatrix4(r),p=e.ray.origin.distanceTo(hn)),p<a?gt:et}else return At.intersectsBox(Ee)?gt:et},intersectsPoint:(d,p)=>{const m=At.distanceSqToPoint(d);if(m<u){const g=new M;At.closestPointToPoint(d,g),g.applyMatrix4(r);const v=e.ray.origin.distanceTo(g);if(v<e.near||v>e.far||o&&v>=a)return;a=v,p=this.resolvePrimitiveIndex(p),f={distance:v,distanceToRay:Math.sqrt(m),point:g,index:i.index?i.index.getX(p):p,face:null,faceIndex:null,barycoord:null,object:t},o||n.push(f)}}}),o&&f&&n.push(f),n}}function go(s,t,e,n,i,r,o){const{geometry:l}=e,{index:c}=l,u=l.attributes.position;for(let f=s,a=t+s;f<a;f++){const d=e.resolvePrimitiveIndex(f),p=c?c.array[d]:d;if(o.fromBufferAttribute(u,p),n(o,f,i,r))return!0}return!1}const J=new _t,O=new q,ne=new q,xi=new Y,kt=new Ni,ft=new M,ie=new pe,Q=new he,gi={};class Xo extends $i{constructor(t,e={}){e={precise:!1,includeInstances:!0,matrixWorld:Array.isArray(t)?new q:t.matrixWorld,targetLeafSize:1,...e},super();const n=new Set;Zi(t,n);const i=Array.from(n),r=Math.ceil(Math.log2(i.length)),o=(1<<r)-1;this.objects=i,this.idBits=r,this.idMask=o,this.primitiveBuffer=null,this.primitiveBufferStride=1,this.precise=e.precise,this.includeInstances=e.includeInstances,this.matrixWorld=e.matrixWorld,this.init(e)}getObjectFromId(t){const{idMask:e,objects:n}=this,i=Vn(t,e);return n[i]}getInstanceFromId(t){const{idMask:e,idBits:n}=this;return Fn(t,n,e)}init(t){const{objects:e,idBits:n,matrixWorld:i}=this;ne.copy(i).invert(),this.primitiveBuffer=new Uint32Array(this._countPrimitives(e)),this._fillPrimitiveBuffer(e,n,this.primitiveBuffer),super.init(t)}refit(...t){ne.copy(this.matrixWorld).invert(),super.refit(...t)}writePrimitiveBounds(t,e,n){const{primitiveBuffer:i}=this;this._getPrimitiveBoundingBox(i[t],ne,xi);const{min:r,max:o}=xi;e[n+0]=r.x,e[n+1]=r.y,e[n+2]=r.z,e[n+3]=o.x,e[n+4]=o.y,e[n+5]=o.z}getRootRanges(){return[{offset:0,count:this.primitiveBuffer.length}]}shapecast(t){return super.shapecast({...t,intersectsPrimitive:t.intersectsObject,scratchPrimitive:null,iterate:vo})}raycast(t,e=[]){const{matrixWorld:n,includeInstances:i}=this,{firstHitOnly:r}=t,o=[];ne.copy(n).invert(),ie.copy(t.ray).applyMatrix4(ne);let l=1/0,c=null;return this.shapecast({boundsTraverseOrder:u=>u.distanceToPoint(ie.origin),intersectsBounds:u=>{if(r){if(!ie.intersectBox(u,ft))return et;let f;return u.containsPoint(ie.origin)?f=0:(ft.applyMatrix4(n),f=t.ray.origin.distanceTo(ft)),f<l?gt:et}else return ie.intersectsBox(u)?gt:et},intersectsObject(u,f){if(u.visible){if(o.length=0,u.isInstancedMesh&&i)Q.geometry=u.geometry,Q.material=u.material,u.getMatrixAt(f,Q.matrixWorld),Q.matrixWorld.premultiply(u.matrixWorld),Q.raycast(t,o),o.forEach(a=>{a.object=u,a.instanceId=f}),Q.material=null;else if(u.isBatchedMesh&&i){if(!u.getVisibleAt(f))return;const a=u.getGeometryIdAt(f),d=u.getGeometryRangeAt(a,gi);J.index=u.geometry.index,J.attributes=u.geometry.attributes,J.setDrawRange(d.start,d.count),Q.geometry=J,Q.material=u.material,u.getMatrixAt(f,Q.matrixWorld),Q.matrixWorld.premultiply(u.matrixWorld),Q.raycast(t,o),o.forEach(p=>{p.object=u,p.batchId=f}),Q.material=null,J.index=null,J.attributes=null,J.setDrawRange(0,1/0)}else u.raycast(t,o);r?o.forEach(a=>{a.distance<l&&(l=a.distance,c=a)}):e.push(...o)}}}),r&&c&&e.push(c),e}_getPrimitiveBoundingBox(t,e,n){const{objects:i,idMask:r,idBits:o,precise:l,includeInstances:c}=this,u=Vn(t,r),f=Fn(t,o,r),a=i[u];if(!c&&(a.isInstancedMesh||a.isBatchedMesh))a.boundingBox||a.computeBoundingBox(),a.boundingSphere||a.computeBoundingSphere(),O.copy(a.matrixWorld).premultiply(e),kt.copy(a.boundingSphere).applyMatrix4(O),n.copy(a.boundingBox).applyMatrix4(O),mn(n,kt);else if(l)if(a.isInstancedMesh)a.getMatrixAt(f,O),O.premultiply(a.matrixWorld).premultiply(e),vi(a.geometry,O,n);else if(a.isBatchedMesh){const d=a.getGeometryIdAt(f),p=a.getGeometryRangeAt(d,gi);J.index=a.geometry.index,J.attributes=a.geometry.attributes,J.setDrawRange(p.start,p.count),a.getMatrixAt(f,O),O.premultiply(a.matrixWorld).premultiply(e),vi(J,O,n),J.attributes=null}else O.copy(a.matrixWorld).premultiply(e),n.setFromObject(a,!0).applyMatrix4(e);else if(a.isInstancedMesh)a.geometry.boundingBox||a.geometry.computeBoundingBox(),a.geometry.boundingSphere||a.geometry.computeBoundingSphere(),a.getMatrixAt(f,O),O.premultiply(a.matrixWorld).premultiply(e),kt.copy(a.geometry.boundingSphere).applyMatrix4(O),n.copy(a.geometry.boundingBox).applyMatrix4(O),mn(n,kt);else if(a.isBatchedMesh){const d=a.getGeometryIdAt(f);a.getMatrixAt(f,O),O.premultiply(a.matrixWorld).premultiply(e),a.getBoundingSphereAt(d,kt).applyMatrix4(O),a.getBoundingBoxAt(d,n).applyMatrix4(O),mn(n,kt)}else n.setFromObject(a,!1).applyMatrix4(e)}_countPrimitives(t){const{includeInstances:e}=this;let n=0;return t.forEach(i=>{if(i.isInstancedMesh&&e)n+=i.count;else if(i.isBatchedMesh&&e){if(!("instanceCount"in i))throw new Error("ObjectBVH: Three.js revision >= r169 is required to use BatchedMesh.");n+=i.instanceCount}else n++}),n}_fillPrimitiveBuffer(t,e,n){const{includeInstances:i}=this;let r=0;t.forEach((o,l)=>{if(o.isInstancedMesh&&i){const c=o.count;for(let u=0;u<c;u++)n[r]=u<<e|l,r++}else if(o.isBatchedMesh&&i){const{instanceCount:c,maxInstanceCount:u}=o;let f=0,a=0;for(;f<c&&a<u;){try{o.getVisibleAt(a),n[r]=a<<e|l,f++,r++}catch{}a++}}else n[r]=l,r++})}}function Vn(s,t){return s&t}function Fn(s,t,e){return(s&~e)>>>t}function Zi(s,t=new Set){Array.isArray(s)?s.forEach(e=>Zi(e,t)):s.traverse(e=>{(e.isMesh||e.isLine||e.isPoints)&&t.add(e)})}function vi(s,t,e){e.makeEmpty();const n=s.drawRange,i=s.index,r=s.attributes.position,o=n.start,l=i?i.count:r.count,c=Math.min(l-o,n.count);for(let u=o,f=o+c;u<f;u++){let a=u;i&&(a=i.getX(a)),ft.fromBufferAttribute(r,a).applyMatrix4(t),e.expandByPoint(ft)}return e}function vo(s,t,e,n,i,r){const{primitiveBuffer:o,objects:l,idMask:c,idBits:u}=e;for(let f=s,a=t+s;f<a;f++){const d=o[f],p=Vn(d,c),m=Fn(d,u,c),g=l[p];if(n(g,m,i,r))return!0}return!1}function mn(s,t){ft.copy(t.center).addScalar(-t.radius),s.min.max(ft),ft.copy(t.center).addScalar(t.radius),s.max.min(ft)}const bi=new M,wi=new M,Ai=new M,lt=new pe,Bi=new q,Bt=new M,yn=new M,bo=["x","y","z"],Ve=parseInt(de)>=169,wo=parseInt(de)<=161,Fe=new X,Re=new X,Ce=new X,Ti=new M,Pi=new M,Si=new M;class Yo extends Ze{get primitiveStride(){return 3}constructor(t,e={}){if(!t.isMesh)throw new Error("SkinnedMeshBVH: First argument must be a Mesh.");super(t.geometry,{...e,[fe]:!0}),this.mesh=t,e[fe]||this.init(e)}writePrimitiveBounds(t,e,n){const{mesh:i,geometry:r}=this,o=this._indirectBuffer,l=r.index?r.index.array:null,u=(o?o[t]:t)*3;let f=u+0,a=u+1,d=u+2;l&&(f=l[f],a=l[a],d=l[d]),i.getVertexPosition(f,bi),i.getVertexPosition(a,wi),i.getVertexPosition(d,Ai);for(let p=0;p<3;p++){const m=bo[p],g=bi[m],v=wi[m],b=Ai[m];let h=g;v<h&&(h=v),b<h&&(h=b);let y=g;v>y&&(y=v),b>y&&(y=b),e[n+p]=h,e[n+p+3]=y}return e}shapecast(t){const e=new nt;return super.shapecast({...t,intersectsPrimitive:t.intersectsTriangle,scratchPrimitive:e,iterate:Ao})}raycastObject3D(t,e,n=[]){const{material:i}=t;if(i===void 0)return;const{matrixWorld:r}=t,{firstHitOnly:o}=e;Bi.copy(r).invert(),lt.copy(e.ray).applyMatrix4(Bi);let l=null,c=1/0;return this.shapecast({boundsTraverseOrder:u=>u.distanceToPoint(lt.origin),intersectsBounds:u=>{if(o){if(!lt.intersectBox(u,yn))return et;let f;return u.containsPoint(lt.origin)?f=0:(yn.applyMatrix4(r),f=e.ray.origin.distanceTo(yn)),f<c?gt:et}else return lt.intersectsBox(u)?gt:et},intersectsTriangle:(u,f)=>{let a=null;if(i.side===wn?a=lt.intersectTriangle(u.a,u.b,u.c,!0,Bt):i.side===Ci?a=lt.intersectTriangle(u.c,u.b,u.a,!0,Bt):a=lt.intersectTriangle(u.a,u.b,u.c,!1,Bt),!a)return;a=a.clone().applyMatrix4(r);const d=e.ray.origin.distanceTo(a);if(d>=e.near&&d<=e.far){if(o&&d>=c)return;const{geometry:p}=this,{index:m}=p,g=this.resolvePrimitiveIndex(f),v=g*3;let b=v+0,h=v+1,y=v+2;m&&(b=m.array[b],h=m.array[h],y=m.array[y]);const x={distance:d,point:a.clone(),object:t,uv:null,uv1:null,normal:null,face:{a:b,b:h,c:y,normal:Z.getNormal(u.a,u.b,u.c,new M),materialIndex:0},faceIndex:g};if(Ve){const P=new M;Z.getBarycoord(Bt,u.a,u.b,u.c,P),x.barycoord=P}const w=p.attributes.uv,S=p.attributes.uv1,A=p.attributes.normal;if(w){Fe.fromBufferAttribute(w,b),Re.fromBufferAttribute(w,h),Ce.fromBufferAttribute(w,y),x.uv=new X;const P=Z.getInterpolation(Bt,u.a,u.b,u.c,Fe,Re,Ce,x.uv);Ve||(x.uv=P)}if(S){Fe.fromBufferAttribute(S,b),Re.fromBufferAttribute(S,h),Ce.fromBufferAttribute(S,y),x.uv1=new X;const P=Z.getInterpolation(Bt,u.a,u.b,u.c,Fe,Re,Ce,x.uv1);Ve||(x.uv1=P),wo&&(x.uv2=x.uv1)}if(A){Ti.fromBufferAttribute(A,b),Pi.fromBufferAttribute(A,h),Si.fromBufferAttribute(A,y),x.normal=new M;const P=Z.getInterpolation(Bt,u.a,u.b,u.c,Ti,Pi,Si,x.normal);x.normal.dot(lt.direction)>0&&x.normal.multiplyScalar(-1),Ve||(x.normal=P)}c=x.distance,l=x,o||n.push(x)}}}),o&&l&&n.push(l),n}}function Ao(s,t,e,n,i,r,o){const{mesh:l,geometry:c}=e,u=c.index?c.index.array:null;for(let f=s,a=t+s;f<a;f++){const d=e.resolvePrimitiveIndex(f);let p=3*d+0,m=3*d+1,g=3*d+2;if(u&&(p=u[p],m=u[m],g=u[g]),l.getVertexPosition(p,o.a),l.getVertexPosition(m,o.b),l.getVertexPosition(g,o.c),o.needsUpdate=!0,n(o,f,i,r))return!0}return!1}const se=new Y,_i=new q,xn=new M;class Bo extends us{get isMesh(){return!this.displayEdges}get isLineSegments(){return this.displayEdges}get isLine(){return this.displayEdges}getVertexPosition(...t){return he.prototype.getVertexPosition.call(this,...t)}constructor(t,e,n=10,i=0){super(),this.material=e,this.geometry=new _t,this.name="BVHRootHelper",this.depth=n,this.displayParents=!1,this.bvh=t,this.displayEdges=!0,this._group=i}raycast(){}intersectsFrustum(t){return t.intersectsObject(this)}update(){const t=this.bvh;this.geometry.dispose(),this.visible=!1,t&&(this.geometry=this.getGeometry(t),this.visible=!0)}getGeometry(t){const e=this._group;let n=null;if(e!==-1)n=this.getBVHBoundPositions(t,e);else{const o=t._roots.map((u,f)=>this.getBVHBoundPositions(t,f)),l=o.reduce((u,f)=>u+f.length,0);n=new Float32Array(l);let c=0;o.forEach(u=>{n.set(u,c),c+=u.length})}const i=this.getBVHBoundIndices(n),r=new _t;return r.setIndex(new xt(i,1,!1)),r.setAttribute("position",new xt(n,3,!1)),r}getBVHBoundIndices(t){const e=t.length/24;let n,i;this.displayEdges?i=new Uint8Array([0,4,1,5,2,6,3,7,0,2,1,3,4,6,5,7,0,1,2,3,4,5,6,7]):i=new Uint8Array([0,1,2,2,1,3,4,6,5,6,7,5,1,4,5,0,4,1,2,3,6,3,7,6,0,2,4,2,6,4,1,5,3,3,5,7]),t.length>65535?n=new Uint32Array(i.length*e):n=new Uint16Array(i.length*e);const r=i.length;for(let o=0;o<e;o++){const l=o*8,c=o*r;for(let u=0;u<r;u++)n[c+u]=l+i[u]}return n}getBVHBoundPositions(t,e=0,n=null){const i=this.depth-1,r=this.displayParents;let o=0;t.traverse((u,f,a)=>{if(R(0,a,se),se.isEmpty())return!0;if(u>=i||f)return o++,!0;r&&o++},e);let l=0;const c=new Float32Array(24*o);return t.traverse((u,f,a)=>{if(R(0,a,se),se.isEmpty())return!0;const d=u>=i||f;if(d||r){const{min:p,max:m}=se;for(let g=-1;g<=1;g+=2){const v=g<0?p.x:m.x;for(let b=-1;b<=1;b+=2){const h=b<0?p.y:m.y;for(let y=-1;y<=1;y+=2){const x=y<0?p.z:m.z;xn.set(v,h,x),n&&xn.applyMatrix4(n),xn.toArray(c,l),l+=3}}}return d}},e),c}}class Hn extends cs{get color(){return this.edgeMaterial.color}get opacity(){return this.edgeMaterial.opacity}set opacity(t){this.edgeMaterial.opacity=t,this.meshMaterial.opacity=t}get objectIndex(){return console.warn('BVHHelper: "objectIndex" has been renamed "instanceId".'),this.instanceId}set objectIndex(t){console.warn('BVHHelper: "objectIndex" has been renamed "instanceId".'),this.instanceId=t}constructor(t=null,e=null,n=10){t instanceof It&&(n=e||10,e=t,t=null),typeof e=="number"&&(n=e,e=null),super(),this.name="BVHHelper",this.depth=n,this.mesh=t,this.bvh=e,this.displayParents=!1,this.displayEdges=!0,this.instanceId=0,this._roots=[];const i=new as({color:65416,transparent:!0,opacity:.3,depthWrite:!1}),r=new ls({color:65416,transparent:!0,opacity:.3,depthWrite:!1});r.color=i.color,this.edgeMaterial=i,this.meshMaterial=r,this.update()}update(){const t=this.mesh,e=this.instanceId;let n=this.bvh||t.boundsTree||t.geometry&&t.geometry.boundsTree||null;if(t&&t.isBatchedMesh&&t.boundsTrees&&!n&&e>=0){const r=t._drawInfo[e];r&&(n=t.boundsTrees[r.geometryIndex]||n)}const i=n?n._roots.length:0;for(;this._roots.length>i;){const r=this._roots.pop();r.geometry.dispose(),this.remove(r)}for(let r=0;r<i;r++){const{depth:o,edgeMaterial:l,meshMaterial:c,displayParents:u,displayEdges:f}=this;if(r>=this._roots.length){const d=new Bo(n,l,o,r);this.add(d),this._roots.push(d)}const a=this._roots[r];a.bvh=n,a.depth=o,a.displayParents=u,a.displayEdges=f,a.material=f?l:c,a.update()}}updateMatrixWorld(...t){const e=this.mesh,n=this.parent,i=this.instanceId;e!==null&&(e.updateWorldMatrix(!0,!1),n?this.matrix.copy(n.matrixWorld).invert().multiply(e.matrixWorld):this.matrix.copy(e.matrixWorld),(e.isInstancedMesh||e.isBatchedMesh)&&i>=0&&(e.getMatrixAt(i,_i),this.matrix.multiply(_i)),this.matrix.decompose(this.position,this.quaternion,this.scale)),super.updateMatrixWorld(...t)}copy(t){this.depth=t.depth,this.mesh=t.mesh,this.bvh=t.bvh,this.opacity=t.opacity,this.color.copy(t.color)}clone(){return new Hn().copy(this)}dispose(){this.edgeMaterial.dispose(),this.meshMaterial.dispose();const t=this.children;for(let e=0,n=t.length;e<n;e++)t[e].geometry.dispose()}}class Zo extends Hn{constructor(...t){console.warn("MeshBVHHelper: Class has been deprecated. Use BVHHelper instead."),super(...t)}}const gn=new Y,oe=new Y;function Ii(s){switch(typeof s){case"number":return 8;case"string":return s.length*2;case"boolean":return 4;default:return 0}}function To(s){return/(Uint|Int|Float)(8|16|32)Array/.test(s.constructor.name)}function Po(s,t){const e={nodeCount:0,leafNodeCount:0,depth:{min:1/0,max:-1/0},primitives:{min:1/0,max:-1/0},splits:[0,0,0],surfaceAreaScore:0};return s.traverse((n,i,r,o,l)=>{const c=r[3]-r[0],u=r[4]-r[1],f=r[5]-r[2],a=2*(c*u+u*f+f*c);e.nodeCount++,i?(e.leafNodeCount++,e.depth.min=Math.min(n,e.depth.min),e.depth.max=Math.max(n,e.depth.max),e.primitives.min=Math.min(l,e.primitives.min),e.primitives.max=Math.max(l,e.primitives.max),e.surfaceAreaScore+=a*ke*l):(e.splits[o]++,e.surfaceAreaScore+=a*Tn)},t),e.primitives.min===1/0&&(e.primitives.min=0,e.primitives.max=0),e.depth.min===1/0&&(e.depth.min=0,e.depth.max=0),e}function Go(s){return s._roots.map((t,e)=>Po(s,e))}function Ko(s){const t=new Set,e=[s];let n=0;for(;e.length;){const i=e.pop();if(!t.has(i)){t.add(i);for(let r in i){if(!Object.hasOwn(i,r))continue;n+=Ii(r);const o=i[r];o&&(typeof o=="object"||typeof o=="function")?To(o)||Xi()&&o instanceof SharedArrayBuffer||o instanceof ArrayBuffer?n+=o.byteLength:e.push(o):n+=Ii(o)}}}return n}function jo(s){const t=[],e=new Float32Array(6);let n=!0;return s.traverse((i,r,o,l,c)=>{const u={depth:i,isLeaf:r,boundingData:o,offset:l,count:c};t[i]=u,R(0,o,gn);const f=t[i-1];if(r){s.writePrimitiveRangeBounds(l,c,e,0),oe.min.set(e[0],e[1],e[2]),oe.max.set(e[3],e[4],e[5]);const a=gn.containsBox(oe);console.assert(a,"Leaf bounds does not fully contain primitives."),n=n&&a}if(f){R(0,f.boundingData,oe);const a=oe.containsBox(gn);console.assert(a,"Parent bounds does not fully contain child."),n=n&&a}}),n}function Jo(s){const t=[];return s.traverse((e,n,i,r,o)=>{const l={bounds:R(0,i,new Y)};n?(l.count=o,l.offset=r):(l.left=null,l.right=null),t[e]=l;const c=t[e-1];c&&(c.left===null?c.left=l:c.right=l)}),t[0]}const So=parseInt(de)>=166,Ot={Mesh:he.prototype.raycast,Line:Ui.prototype.raycast,LineSegments:Li.prototype.raycast,LineLoop:Hi.prototype.raycast,Points:ki.prototype.raycast,BatchedMesh:fs.prototype.raycast},W=new he,Ne=[];function Qo(s,t){if(this.isBatchedMesh)_o.call(this,s,t);else{const{geometry:e}=this;if(e.boundsTree)e.boundsTree.raycastObject3D(this,s,t);else{let n;if(this instanceof he)n=Ot.Mesh;else if(this instanceof Li)n=Ot.LineSegments;else if(this instanceof Hi)n=Ot.LineLoop;else if(this instanceof Ui)n=Ot.Line;else if(this instanceof ki)n=Ot.Points;else throw new Error("BVH: Fallback raycast function not found.");n.call(this,s,t)}}}function _o(s,t){if(this.boundsTrees){const e=this.boundsTrees,n=this._drawInfo||this._instanceInfo,i=this._drawRanges||this._geometryInfo,r=this.matrixWorld;W.material=this.material,W.geometry=this.geometry;const o=W.geometry.boundsTree,l=W.geometry.drawRange;W.geometry.boundingSphere===null&&(W.geometry.boundingSphere=new Ni);for(let c=0,u=n.length;c<u;c++){if(!this.getVisibleAt(c))continue;const f=n[c].geometryIndex;if(W.geometry.boundsTree=e[f],this.getMatrixAt(c,W.matrixWorld).premultiply(r),!W.geometry.boundsTree){this.getBoundingBoxAt(f,W.geometry.boundingBox),this.getBoundingSphereAt(f,W.geometry.boundingSphere);const a=i[f];W.geometry.setDrawRange(a.start,a.count)}W.raycast(s,Ne);for(let a=0,d=Ne.length;a<d;a++){const p=Ne[a];p.object=this,p.batchId=c,t.push(p)}Ne.length=0}W.geometry.boundsTree=o,W.geometry.drawRange=l,W.material=null,W.geometry=null}else Ot.BatchedMesh.call(this,s,t)}function tr(s={}){const{type:t=It}=s;return this.boundsTree=new t(this,s),this.boundsTree}function er(){this.boundsTree=null}function nr(s=-1,t={}){if(!So)throw new Error("BatchedMesh: Three r166+ is required to compute bounds trees.");t={...t,range:null};const e=this._drawRanges||this._geometryInfo,n=this._geometryCount;this.boundsTrees||(this.boundsTrees=new Array(n).fill(null));const i=this.boundsTrees;for(;i.length<n;)i.push(null);if(s<0){for(let r=0;r<n;r++)t.range=e[r],i[r]=new It(this.geometry,t);return i}else return s<e.length&&(t.range=e[s],i[s]=new It(this.geometry,t)),i[s]||null}function ir(s=-1){s<0?this.boundsTrees.fill(null):s<this.boundsTrees.length&&(this.boundsTrees[s]=null)}function Io(s){switch(s){case 1:return"R";case 2:return"RG";case 3:return"RGBA";case 4:return"RGBA"}throw new Error}function Mo(s){switch(s){case 1:return ys;case 2:return ms;case 3:return qe;case 4:return qe}}function Mi(s){switch(s){case 1:return hs;case 2:return Oi;case 3:return Bn;case 4:return Bn}}class Un extends An{constructor(){super(),this.minFilter=qt,this.magFilter=qt,this.generateMipmaps=!1,this.overrideItemSize=null,this._forcedType=null}updateFrom(t){const e=this.overrideItemSize,n=t.itemSize,i=t.count;if(e!==null){if(n*i%e!==0)throw new Error("VertexAttributeTexture: overrideItemSize must divide evenly into buffer length.");t.itemSize=e,t.count=i*n/e}const r=t.itemSize,o=t.count,l=t.normalized,c=t.array.constructor,u=c.BYTES_PER_ELEMENT;let f=this._forcedType,a=r;if(f===null)switch(c){case Float32Array:f=ae;break;case Uint8Array:case Uint16Array:case Uint32Array:f=le;break;case Int8Array:case Int16Array:case Int32Array:f=Ue;break}let d,p,m,g,v=Io(r);switch(f){case ae:m=1,p=Mo(r),l&&u===1?(g=c,v+="8",c===Uint8Array?d=On:(d=qn,v+="_SNORM")):(g=Float32Array,v+="32F",d=ae);break;case Ue:v+=u*8+"I",m=l?Math.pow(2,c.BYTES_PER_ELEMENT*8-1):1,p=Mi(r),u===1?(g=Int8Array,d=qn):u===2?(g=Int16Array,d=ps):(g=Int32Array,d=Ue);break;case le:v+=u*8+"UI",m=l?Math.pow(2,c.BYTES_PER_ELEMENT*8-1):1,p=Mi(r),u===1?(g=Uint8Array,d=On):u===2?(g=Uint16Array,d=ds):(g=Uint32Array,d=le);break}a===3&&(p===qe||p===Bn)&&(a=4);const b=Math.ceil(Math.sqrt(o))||1,h=a*b*b,y=new g(h),x=t.normalized;t.normalized=!1;for(let w=0;w<o;w++){const S=a*w;y[S]=t.getX(w)/m,r>=2&&(y[S+1]=t.getY(w)/m),r>=3&&(y[S+2]=t.getZ(w)/m,a===4&&(y[S+3]=1)),r>=4&&(y[S+3]=t.getW(w)/m)}t.normalized=x,this.internalFormat=v,this.format=p,this.type=d,this.image.width=b,this.image.height=b,this.image.data=y,this.needsUpdate=!0,this.dispose(),t.itemSize=n,t.count=i}}class Do extends Un{constructor(){super(),this._forcedType=le}}class sr extends Un{constructor(){super(),this._forcedType=Ue}}class zo extends Un{constructor(){super(),this._forcedType=ae}}class or{constructor(){this.index=new Do,this.position=new zo,this.bvhBounds=new An,this.bvhContents=new An,this._cachedIndexAttr=null,this.index.overrideItemSize=3}updateFrom(t){const{geometry:e}=t;if(Vo(t,this.bvhBounds,this.bvhContents),this.position.updateFrom(e.attributes.position),t.indirect){const n=t._indirectBuffer;if(this._cachedIndexAttr===null||this._cachedIndexAttr.count!==n.length)if(e.index)this._cachedIndexAttr=e.index.clone();else{const i=Yi(Xe(e));this._cachedIndexAttr=new xt(i,1,!1)}Eo(e,n,this._cachedIndexAttr),this.index.updateFrom(this._cachedIndexAttr)}else this.index.updateFrom(e.index)}dispose(){const{index:t,position:e,bvhBounds:n,bvhContents:i}=this;t&&t.dispose(),e&&e.dispose(),n&&n.dispose(),i&&i.dispose()}}function Eo(s,t,e){const n=e.array,i=s.index?s.index.array:null;for(let r=0,o=t.length;r<o;r++){const l=3*r,c=3*t[r];for(let u=0;u<3;u++)n[l+u]=i?i[c+u]:c+u}}function Vo(s,t,e){const n=s._roots;if(n.length!==1)throw new Error("MeshBVHUniformStruct: Multi-root BVHs not supported.");const i=n[0],r=new Uint16Array(i),o=new Uint32Array(i),l=new Float32Array(i),c=i.byteLength/G,u=2*Math.ceil(Math.sqrt(c/2)),f=new Float32Array(4*u*u),a=Math.ceil(Math.sqrt(c)),d=new Uint32Array(2*a*a);for(let p=0;p<c;p++){const m=p*G/4,g=m*2,v=m;for(let b=0;b<3;b++)f[8*p+0+b]=l[v+0+b],f[8*p+4+b]=l[v+3+b];if(C(g,r)){const b=$(g,r),h=H(m,o),y=bs|b;d[p*2+0]=y,d[p*2+1]=h}else{const b=o[m+6],h=$e(m,o);d[p*2+0]=h,d[p*2+1]=b}}t.image.data=f,t.image.width=u,t.image.height=u,t.format=qe,t.type=ae,t.internalFormat="RGBA32F",t.minFilter=qt,t.magFilter=qt,t.generateMipmaps=!1,t.needsUpdate=!0,t.dispose(),e.image.data=d,e.image.width=a,e.image.height=a,e.format=Oi,e.type=le,e.internalFormat="RG32UI",e.minFilter=qt,e.magFilter=qt,e.generateMipmaps=!1,e.needsUpdate=!0,e.dispose()}const Tt=new M,Pt=new M,St=new M,Di=new Rn,Le=new M,vn=new M,zi=new Rn,Ei=new Rn,He=new q,Vi=new q;function re(s,t){if(!s&&!t)return;const e=s.count===t.count,n=s.normalized===t.normalized,i=s.array.constructor===t.array.constructor,r=s.itemSize===t.itemSize;if(!e||!n||!i||!r)throw new Error}function ce(s,t=null){const e=s.array.constructor,n=s.normalized,i=s.itemSize,r=t===null?s.count:t;return new xt(new e(i*r),i,n)}function Gi(s,t,e=0){if(s.isInterleavedBufferAttribute){const n=s.itemSize;for(let i=0,r=s.count;i<r;i++){const o=i+e;t.setX(o,s.getX(i)),n>=2&&t.setY(o,s.getY(i)),n>=3&&t.setZ(o,s.getZ(i)),n>=4&&t.setW(o,s.getW(i))}}else{const n=t.array,i=n.constructor,r=n.BYTES_PER_ELEMENT*s.itemSize*e;new i(n.buffer,r,s.array.length).set(s.array)}}function Fo(s,t,e){const n=s.elements,i=t.elements;for(let r=0,o=i.length;r<o;r++)n[r]+=i[r]*e}function Fi(s,t,e){const n=s.skeleton,i=s.geometry,r=n.bones,o=n.boneInverses;zi.fromBufferAttribute(i.attributes.skinIndex,t),Ei.fromBufferAttribute(i.attributes.skinWeight,t),He.elements.fill(0);for(let l=0;l<4;l++){const c=Ei.getComponent(l);if(c!==0){const u=zi.getComponent(l);Vi.multiplyMatrices(r[u].matrixWorld,o[u]),Fo(He,Vi,c)}}return He.multiply(s.bindMatrix).premultiply(s.bindMatrixInverse),e.transformDirection(He),e}function bn(s,t,e,n,i){Le.set(0,0,0);for(let r=0,o=s.length;r<o;r++){const l=t[r],c=s[r];l!==0&&(vn.fromBufferAttribute(c,n),e?Le.addScaledVector(vn,l):Le.addScaledVector(vn.sub(i),l))}i.add(Le)}function Ro(s,t={useGroups:!1,updateIndex:!1,skipAttributes:[]},e=new _t){const n=s[0].index!==null,{useGroups:i=!1,updateIndex:r=!1,skipAttributes:o=[]}=t,l=new Set(Object.keys(s[0].attributes)),c={};let u=0;e.clearGroups();for(let f=0;f<s.length;++f){const a=s[f];let d=0;if(n!==(a.index!==null))throw new Error("StaticGeometryGenerator: All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.");for(const p in a.attributes){if(!l.has(p))throw new Error('StaticGeometryGenerator: All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.');c[p]===void 0&&(c[p]=[]),c[p].push(a.attributes[p]),d++}if(d!==l.size)throw new Error("StaticGeometryGenerator: Make sure all geometries have the same number of attributes.");if(i){let p;if(n)p=a.index.count;else if(a.attributes.position!==void 0)p=a.attributes.position.count;else throw new Error("StaticGeometryGenerator: The geometry must have either an index or a position attribute");e.addGroup(u,p,f),u+=p}}if(n){let f=!1;if(!e.index){let a=0;for(let d=0;d<s.length;++d)a+=s[d].index.count;e.setIndex(new xt(new Uint32Array(a),1,!1)),f=!0}if(r||f){const a=e.index;let d=0,p=0;for(let m=0;m<s.length;++m){const g=s[m],v=g.index;if(o[m]!==!0)for(let b=0;b<v.count;++b)a.setX(d,v.getX(b)+p),d++;p+=g.attributes.position.count}}}for(const f in c){const a=c[f];if(!(f in e.attributes)){let m=0;for(const g in a)m+=a[g].count;e.setAttribute(f,ce(c[f][0],m))}const d=e.attributes[f];let p=0;for(let m=0,g=a.length;m<g;m++){const v=a[m];o[m]!==!0&&Gi(v,d,p),p+=v.count}}return e}function Co(s,t){if(s===null||t===null)return s===t;if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function No(s){const{index:t,attributes:e}=s;if(t)for(let n=0,i=t.count;n<i;n+=3){const r=t.getX(n),o=t.getX(n+2);t.setX(n,o),t.setX(n+2,r)}else for(const n in e){const i=e[n],r=i.itemSize;for(let o=0,l=i.count;o<l;o+=3)for(let c=0;c<r;c++){const u=i.getComponent(o,c),f=i.getComponent(o+2,c);i.setComponent(o,c,f),i.setComponent(o+2,c,u)}}return s}class Lo{constructor(t){this.matrixWorld=new q,this.geometryHash=null,this.boneMatrices=null,this.primitiveCount=-1,this.mesh=t,this.update()}update(){const t=this.mesh,e=t.geometry,n=t.skeleton,i=(e.index?e.index.count:e.attributes.position.count)/3;if(this.matrixWorld.copy(t.matrixWorld),this.geometryHash=e.attributes.position.version,this.primitiveCount=i,n){n.boneTexture||n.computeBoneTexture(),n.update();const r=n.boneMatrices;!this.boneMatrices||this.boneMatrices.length!==r.length?this.boneMatrices=r.slice():this.boneMatrices.set(r)}else this.boneMatrices=null}didChange(){const t=this.mesh,e=t.geometry,n=(e.index?e.index.count:e.attributes.position.count)/3;return!(this.matrixWorld.equals(t.matrixWorld)&&this.geometryHash===e.attributes.position.version&&Co(t.skeleton&&t.skeleton.boneMatrices||null,this.boneMatrices)&&this.primitiveCount===n)}}class rr{constructor(t){Array.isArray(t)||(t=[t]);const e=[];t.forEach(n=>{n.traverseVisible(i=>{i.isMesh&&e.push(i)})}),this.meshes=e,this.useGroups=!0,this.applyWorldTransforms=!0,this.attributes=["position","normal","color","tangent","uv","uv2"],this._intermediateGeometry=new Array(e.length).fill().map(()=>new _t),this._diffMap=new WeakMap}getMaterials(){const t=[];return this.meshes.forEach(e=>{Array.isArray(e.material)?t.push(...e.material):t.push(e.material)}),t}generate(t=new _t){let e=[];const{meshes:n,useGroups:i,_intermediateGeometry:r,_diffMap:o}=this;for(let l=0,c=n.length;l<c;l++){const u=n[l],f=r[l],a=o.get(u);!a||a.didChange(u)?(this._convertToStaticGeometry(u,f),e.push(!1),a?a.update():o.set(u,new Lo(u))):e.push(!0)}if(r.length===0){t.setIndex(null);const l=t.attributes;for(const c in l)t.deleteAttribute(c);for(const c in this.attributes)t.setAttribute(this.attributes[c],new xt(new Float32Array(0),4,!1))}else Ro(r,{useGroups:i,skipAttributes:e},t);for(const l in t.attributes)t.attributes[l].needsUpdate=!0;return t}_convertToStaticGeometry(t,e=new _t){const n=t.geometry,i=this.applyWorldTransforms,r=this.attributes.includes("normal"),o=this.attributes.includes("tangent"),l=n.attributes,c=e.attributes;!e.index&&n.index&&(e.index=n.index.clone()),c.position||e.setAttribute("position",ce(l.position)),r&&!c.normal&&l.normal&&e.setAttribute("normal",ce(l.normal)),o&&!c.tangent&&l.tangent&&e.setAttribute("tangent",ce(l.tangent)),re(n.index,e.index),re(l.position,c.position),r&&re(l.normal,c.normal),o&&re(l.tangent,c.tangent);const u=l.position,f=r?l.normal:null,a=o?l.tangent:null,d=n.morphAttributes.position,p=n.morphAttributes.normal,m=n.morphAttributes.tangent,g=n.morphTargetsRelative,v=t.morphTargetInfluences,b=new xs;b.getNormalMatrix(t.matrixWorld),n.index&&e.index.array.set(n.index.array);for(let h=0,y=l.position.count;h<y;h++)Tt.fromBufferAttribute(u,h),f&&Pt.fromBufferAttribute(f,h),a&&(Di.fromBufferAttribute(a,h),St.fromBufferAttribute(a,h)),v&&(d&&bn(d,v,g,h,Tt),p&&bn(p,v,g,h,Pt),m&&bn(m,v,g,h,St)),t.isSkinnedMesh&&(t.applyBoneTransform(h,Tt),f&&Fi(t,h,Pt),a&&Fi(t,h,St)),i&&Tt.applyMatrix4(t.matrixWorld),c.position.setXYZ(h,Tt.x,Tt.y,Tt.z),f&&(i&&Pt.applyNormalMatrix(b),c.normal.setXYZ(h,Pt.x,Pt.y,Pt.z)),a&&(i&&St.transformDirection(t.matrixWorld),c.tangent.setXYZW(h,St.x,St.y,St.z,Di.w));for(const h in this.attributes){const y=this.attributes[h];y==="position"||y==="tangent"||y==="normal"||!(y in l)||(c[y]||e.setAttribute(y,ce(l[y])),re(l[y],c[y]),Gi(l[y],c[y]))}return t.matrixWorld.determinant()<0&&No(e),e}}const Ki=`

// A stack of uint32 indices can can store the indices for
// a perfectly balanced tree with a depth up to 31. Lower stack
// depth gets higher performance.
//
// However not all trees are balanced. Best value to set this to
// is the trees max depth.
#ifndef BVH_STACK_DEPTH
#define BVH_STACK_DEPTH 60
#endif

#ifndef INFINITY
#define INFINITY 1e20
#endif

// Utilities
uvec4 uTexelFetch1D( usampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

ivec4 iTexelFetch1D( isampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 texelFetch1D( sampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 textureSampleBarycoord( sampler2D tex, vec3 barycoord, uvec3 faceIndices ) {

	return
		barycoord.x * texelFetch1D( tex, faceIndices.x ) +
		barycoord.y * texelFetch1D( tex, faceIndices.y ) +
		barycoord.z * texelFetch1D( tex, faceIndices.z );

}

void ndcToCameraRay(
	vec2 coord, mat4 cameraWorld, mat4 invProjectionMatrix,
	out vec3 rayOrigin, out vec3 rayDirection
) {

	// get camera look direction and near plane for camera clipping
	vec4 lookDirection = cameraWorld * vec4( 0.0, 0.0, - 1.0, 0.0 );
	vec4 nearVector = invProjectionMatrix * vec4( 0.0, 0.0, - 1.0, 1.0 );
	float near = abs( nearVector.z / nearVector.w );

	// get the camera direction and position from camera matrices
	vec4 origin = cameraWorld * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec4 direction = invProjectionMatrix * vec4( coord, 0.5, 1.0 );
	direction /= direction.w;
	direction = cameraWorld * direction - origin;

	// slide the origin along the ray until it sits at the near clip plane position
	origin.xyz += direction.xyz * near / dot( direction, lookDirection );

	rayOrigin = origin.xyz;
	rayDirection = direction.xyz;

}
`,ji=`

float dot2( vec3 v ) {

	return dot( v, v );

}

// implementation from https://www.shadertoy.com/view/ttfGWl, though method 2 has been removed
// and is now available at this fork: https://www.shadertoy.com/view/WlB3zW
vec3 closestPointToTriangle( vec3 p, vec3 v0, vec3 v1, vec3 v2, out vec3 barycoord ) {

    vec3 v10 = v1 - v0;
    vec3 v21 = v2 - v1;
    vec3 v02 = v0 - v2;

	vec3 p0 = p - v0;
	vec3 p1 = p - v1;
	vec3 p2 = p - v2;

    vec3 nor = cross( v10, v02 );

    // method 2, in barycentric space
    vec3  q = cross( nor, p0 );
    float d = 1.0 / dot2( nor );
    float u = d * dot( q, v02 );
    float v = d * dot( q, v10 );
    float w = 1.0 - u - v;

	if( u < 0.0 ) {

		w = clamp( dot( p2, v02 ) / dot2( v02 ), 0.0, 1.0 );
		u = 0.0;
		v = 1.0 - w;

	} else if( v < 0.0 ) {

		u = clamp( dot( p0, v10 ) / dot2( v10 ), 0.0, 1.0 );
		v = 0.0;
		w = 1.0 - u;

	} else if( w < 0.0 ) {

		v = clamp( dot( p1, v21 ) / dot2( v21 ), 0.0, 1.0 );
		w = 0.0;
		u = 1.0 - v;

	}

	// output the barycoord in v0, v1, v2 weight order
	barycoord = vec3( w, u, v );
    return u * v1 + v * v2 + w * v0;

}

float distanceToTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// point and cut off range
	vec3 point, float closestDistanceSquared,

	// outputs
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord, inout float side, inout vec3 outPoint
) {

	bool found = false;
	vec3 localBarycoord;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		// get the closest point and barycoord
		vec3 closestPoint = closestPointToTriangle( point, a, b, c, localBarycoord );
		vec3 delta = point - closestPoint;
		float sqDist = dot2( delta );
		if ( sqDist < closestDistanceSquared ) {

			// set the output results
			closestDistanceSquared = sqDist;
			faceIndices = uvec4( indices.xyz, i );
			faceNormal = normalize( cross( a - b, b - c ) );
			barycoord = localBarycoord;
			outPoint = closestPoint;
			side = sign( dot( faceNormal, delta ) );

		}

	}

	return closestDistanceSquared;

}

float distanceSqToBounds( vec3 point, vec3 boundsMin, vec3 boundsMax ) {

	vec3 clampedPoint = clamp( point, boundsMin, boundsMax );
	vec3 delta = point - clampedPoint;
	return dot( delta, delta );

}

float distanceSqToBVHNodeBoundsPoint( vec3 point, sampler2D bvhBounds, uint currNodeIndex ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return distanceSqToBounds( point, boundsMin, boundsMax );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhClosestPointToPoint(		bvh,		point, maxDistance, faceIndices, faceNormal, barycoord, side, outPoint	)	_bvhClosestPointToPoint(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		point, maxDistance, faceIndices, faceNormal, barycoord, side, outPoint	)

float _bvhClosestPointToPoint(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// point to check
	vec3 point, float maxDistance,

	// output variables
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout vec3 outPoint
 ) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int pointer = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float closestDistanceSquared = maxDistance * maxDistance;
	bool found = false;
	while ( pointer > - 1 && pointer < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ pointer ];
		pointer --;

		// check if we intersect the current bounds
		float boundsHitDistance = distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, currNodeIndex );
		if ( boundsHitDistance > closestDistanceSquared ) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );
		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;
			closestDistanceSquared = distanceToTriangles(
				bvh_position, bvh_index, offset, count, point, closestDistanceSquared,

				// outputs
				faceIndices, faceNormal, barycoord, side, outPoint
			);

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = currNodeIndex + boundsInfo.y;
			bool leftToRight = distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, leftIndex ) < distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, rightIndex );//rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			pointer ++;
			stack[ pointer ] = c2;
			pointer ++;
			stack[ pointer ] = c1;

		}

	}

	return sqrt( closestDistanceSquared );

}
`,Ji=`

#ifndef TRI_INTERSECT_EPSILON
#define TRI_INTERSECT_EPSILON 1e-5
#endif

// Raycasting
bool intersectsBounds( vec3 rayOrigin, vec3 rayDirection, vec3 boundsMin, vec3 boundsMax, out float dist ) {

	// https://www.reddit.com/r/opengl/comments/8ntzz5/fast_glsl_ray_box_intersection/
	// https://tavianator.com/2011/ray_box.html
	vec3 invDir = 1.0 / rayDirection;

	// find intersection distances for each plane
	vec3 tMinPlane = invDir * ( boundsMin - rayOrigin );
	vec3 tMaxPlane = invDir * ( boundsMax - rayOrigin );

	// get the min and max distances from each intersection
	vec3 tMinHit = min( tMaxPlane, tMinPlane );
	vec3 tMaxHit = max( tMaxPlane, tMinPlane );

	// get the furthest hit distance
	vec2 t = max( tMinHit.xx, tMinHit.yz );
	float t0 = max( t.x, t.y );

	// get the minimum hit distance
	t = min( tMaxHit.xx, tMaxHit.yz );
	float t1 = min( t.x, t.y );

	// set distance to 0.0 if the ray starts inside the box
	dist = max( t0, 0.0 );

	return t1 >= dist;

}

bool intersectsTriangle(
	vec3 rayOrigin, vec3 rayDirection, vec3 a, vec3 b, vec3 c,
	out vec3 barycoord, out vec3 norm, out float dist, out float side
) {

	// https://stackoverflow.com/questions/42740765/intersection-between-line-and-triangle-in-3d
	vec3 edge1 = b - a;
	vec3 edge2 = c - a;
	norm = cross( edge1, edge2 );

	float det = - dot( rayDirection, norm );
	float invdet = 1.0 / det;

	vec3 AO = rayOrigin - a;
	vec3 DAO = cross( AO, rayDirection );

	vec4 uvt;
	uvt.x = dot( edge2, DAO ) * invdet;
	uvt.y = - dot( edge1, DAO ) * invdet;
	uvt.z = dot( AO, norm ) * invdet;
	uvt.w = 1.0 - uvt.x - uvt.y;

	// set the hit information
	barycoord = uvt.wxy; // arranged in A, B, C order
	dist = uvt.z;
	side = sign( det );
	norm = side * normalize( norm );

	// add an epsilon to avoid misses between triangles
	uvt += vec4( TRI_INTERSECT_EPSILON );

	return all( greaterThanEqual( uvt, vec4( 0.0 ) ) );

}

bool intersectTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// outputs
	inout float minDistance, inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	bool found = false;
	vec3 localBarycoord, localNormal;
	float localDist, localSide;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		if (
			intersectsTriangle( rayOrigin, rayDirection, a, b, c, localBarycoord, localNormal, localDist, localSide )
			&& localDist < minDistance
		) {

			found = true;
			minDistance = localDist;

			faceIndices = uvec4( indices.xyz, i );
			faceNormal = localNormal;

			side = localSide;
			barycoord = localBarycoord;
			dist = localDist;

		}

	}

	return found;

}

bool intersectsBVHNodeBounds( vec3 rayOrigin, vec3 rayDirection, sampler2D bvhBounds, uint currNodeIndex, out float dist ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return intersectsBounds( rayOrigin, rayDirection, boundsMin, boundsMax, dist );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhIntersectFirstHit(		bvh,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)	_bvhIntersectFirstHit(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)

bool _bvhIntersectFirstHit(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// output variables split into separate variables due to output precision
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int pointer = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float triangleDistance = INFINITY;
	bool found = false;
	while ( pointer > - 1 && pointer < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ pointer ];
		pointer --;

		// check if we intersect the current bounds
		float boundsHitDistance;
		if (
			! intersectsBVHNodeBounds( rayOrigin, rayDirection, bvh_bvhBounds, currNodeIndex, boundsHitDistance )
			|| boundsHitDistance > triangleDistance
		) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );

		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;

			found = intersectTriangles(
				bvh_position, bvh_index, offset, count,
				rayOrigin, rayDirection, triangleDistance,
				faceIndices, faceNormal, barycoord, side, dist
			) || found;

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = currNodeIndex + boundsInfo.y;

			bool leftToRight = rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			pointer ++;
			stack[ pointer ] = c2;

			pointer ++;
			stack[ pointer ] = c1;

		}

	}

	return found;

}
`,Qi=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`,cr=Object.freeze(Object.defineProperty({__proto__:null,bvh_distance_functions:ji,bvh_ray_functions:Ji,bvh_struct_definitions:Qi,common_functions:Ki},Symbol.toStringTag,{value:"Module"})),ar=Qi,lr=ji,ur=`
	${Ki}
	${Ji}
`;export{gs as AVERAGE,$i as BVH,Hn as BVHHelper,cr as BVHShaderGLSL,qi as CENTER,Wn as CONTAINED,nt as ExtendedTriangle,zo as FloatVertexAttributeTexture,Ze as GeometryBVH,gt as INTERSECTED,sr as IntVertexAttributeTexture,Wo as LineBVH,yo as LineLoopBVH,mo as LineSegmentsBVH,It as MeshBVH,Zo as MeshBVHHelper,or as MeshBVHUniformStruct,et as NOT_INTERSECTED,Xo as ObjectBVH,K as OrientedBox,$o as PointsBVH,vs as SAH,fe as SKIP_GENERATION,Oo as STOP_TRAVERSAL,Yo as SkinnedMeshBVH,rr as StaticGeometryGenerator,Do as UIntVertexAttributeTexture,Un as VertexAttributeTexture,Qo as acceleratedRaycast,nr as computeBatchedBoundsTree,tr as computeBoundsTree,ir as disposeBatchedBoundsTree,er as disposeBoundsTree,Ko as estimateMemoryInBytes,Fs as generateIndirectBuffer,Go as getBVHExtremes,Jo as getJSONStructure,qo as getTriangleHitPointInfo,lr as shaderDistanceFunction,ur as shaderIntersectFunction,ar as shaderStructs,jo as validateBounds};
