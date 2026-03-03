(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const jf="modulepreload",Xf=function(s){return"/"+s},Oc={},ii=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){let o=function(c){return Promise.all(c.map(h=>Promise.resolve(h).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));i=o(t.map(c=>{if(c=Xf(c),c in Oc)return;Oc[c]=!0;const h=c.endsWith(".css"),u=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${u}`))return;const d=document.createElement("link");if(d.rel=h?"stylesheet":jf,h||(d.as="script"),d.crossOrigin="",d.href=c,l&&d.setAttribute("nonce",l),document.head.appendChild(d),h)return new Promise((f,g)=>{d.addEventListener("load",f),d.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})};/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Vl="164",ds={ROTATE:0,DOLLY:1,PAN:2},fs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},qf=0,Fc=1,$f=2,vd=1,xd=2,ni=3,Hn=0,ln=1,yn=2,Ti=0,Bs=1,kc=2,Bc=3,zc=4,Yf=5,Xi=100,Kf=101,Zf=102,Jf=103,Qf=104,ep=200,tp=201,np=202,ip=203,xl=204,bl=205,sp=206,rp=207,op=208,ap=209,lp=210,cp=211,hp=212,up=213,dp=214,fp=0,pp=1,mp=2,Ho=3,gp=4,_p=5,yp=6,vp=7,Zo=0,xp=1,bp=2,wi=0,Mp=1,Sp=2,Ep=3,Tp=4,wp=5,Ap=6,Cp=7,Hc="attached",Rp="detached",bd=300,Gs=301,Ws=302,Ml=303,Sl=304,Jo=306,kn=1e3,vn=1001,Vo=1002,sn=1003,Md=1004,_r=1005,Jt=1006,Fo=1007,Rn=1008,Ri=1009,Lp=1010,Pp=1011,Sd=1012,Ed=1013,js=1014,Bn=1015,Qo=1016,Td=1017,wd=1018,Br=1020,Np=35902,Ip=1021,Dp=1022,Ln=1023,Up=1024,Op=1025,zs=1026,Cr=1027,Ad=1028,Cd=1029,Fp=1030,Rd=1031,Ld=1033,xa=33776,ba=33777,Ma=33778,Sa=33779,Vc=35840,Gc=35841,Wc=35842,jc=35843,Xc=36196,qc=37492,$c=37496,Yc=37808,Kc=37809,Zc=37810,Jc=37811,Qc=37812,eh=37813,th=37814,nh=37815,ih=37816,sh=37817,rh=37818,oh=37819,ah=37820,lh=37821,Ea=36492,ch=36494,hh=36495,kp=36283,uh=36284,dh=36285,fh=36286,Rr=2300,Xs=2301,Ta=2302,ph=2400,mh=2401,gh=2402,Bp=2500,zp=0,Pd=1,El=2,Hp=3200,Vp=3201,ea=0,Gp=1,Mi="",Ot="srgb",Yt="srgb-linear",Gl="display-p3",ta="display-p3-linear",Go="linear",Rt="srgb",Wo="rec709",jo="p3",ps=7680,_h=519,Wp=512,jp=513,Xp=514,Nd=515,qp=516,$p=517,Yp=518,Kp=519,Tl=35044,yh="300 es",oi=2e3,Xo=2001;class os{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}}const Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let vh=1234567;const vr=Math.PI/180,qs=180/Math.PI;function xn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Kt[s&255]+Kt[s>>8&255]+Kt[s>>16&255]+Kt[s>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[t&63|128]+Kt[t>>8&255]+"-"+Kt[t>>16&255]+Kt[t>>24&255]+Kt[n&255]+Kt[n>>8&255]+Kt[n>>16&255]+Kt[n>>24&255]).toLowerCase()}function zt(s,e,t){return Math.max(e,Math.min(t,s))}function Wl(s,e){return(s%e+e)%e}function Zp(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Jp(s,e,t){return s!==e?(t-s)/(e-s):0}function xr(s,e,t){return(1-t)*s+t*e}function Qp(s,e,t,n){return xr(s,e,1-Math.exp(-t*n))}function em(s,e=1){return e-Math.abs(Wl(s,e*2)-e)}function tm(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function nm(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function im(s,e){return s+Math.floor(Math.random()*(e-s+1))}function sm(s,e){return s+Math.random()*(e-s)}function rm(s){return s*(.5-Math.random())}function om(s){s!==void 0&&(vh=s);let e=vh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function am(s){return s*vr}function lm(s){return s*qs}function cm(s){return(s&s-1)===0&&s!==0}function hm(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function um(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function dm(s,e,t,n,i){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":s.set(a*h,l*u,l*d,a*c);break;case"YZY":s.set(l*d,a*h,l*u,a*c);break;case"ZXZ":s.set(l*u,l*d,a*h,a*c);break;case"XZX":s.set(a*h,l*g,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*g,a*c);break;case"ZYZ":s.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Cn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Mt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const qi={DEG2RAD:vr,RAD2DEG:qs,generateUUID:xn,clamp:zt,euclideanModulo:Wl,mapLinear:Zp,inverseLerp:Jp,lerp:xr,damp:Qp,pingpong:em,smoothstep:tm,smootherstep:nm,randInt:im,randFloat:sm,randFloatSpread:rm,seededRandom:om,degToRad:am,radToDeg:lm,isPowerOfTwo:cm,ceilPowerOfTwo:hm,floorPowerOfTwo:um,setQuaternionFromProperEuler:dm,normalize:Mt,denormalize:Cn};class _e{constructor(e=0,t=0){_e.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(zt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ut{constructor(e,t,n,i,r,o,a,l,c){ut.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=i[0],p=i[3],m=i[6],T=i[1],x=i[4],E=i[7],I=i[2],N=i[5],C=i[8];return r[0]=o*_+a*T+l*I,r[3]=o*p+a*x+l*N,r[6]=o*m+a*E+l*C,r[1]=c*_+h*T+u*I,r[4]=c*p+h*x+u*N,r[7]=c*m+h*E+u*C,r[2]=d*_+f*T+g*I,r[5]=d*p+f*x+g*N,r[8]=d*m+f*E+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,g=t*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(i*c-h*n)*_,e[2]=(a*n-i*o)*_,e[3]=d*_,e[4]=(h*t-i*l)*_,e[5]=(i*r-a*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(wa.makeScale(e,t)),this}rotate(e){return this.premultiply(wa.makeRotation(-e)),this}translate(e,t){return this.premultiply(wa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const wa=new ut;function Id(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Lr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function fm(){const s=Lr("canvas");return s.style.display="block",s}const xh={};function Dd(s){s in xh||(xh[s]=!0,console.warn(s))}const bh=new ut().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Mh=new ut().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Zr={[Yt]:{transfer:Go,primaries:Wo,toReference:s=>s,fromReference:s=>s},[Ot]:{transfer:Rt,primaries:Wo,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[ta]:{transfer:Go,primaries:jo,toReference:s=>s.applyMatrix3(Mh),fromReference:s=>s.applyMatrix3(bh)},[Gl]:{transfer:Rt,primaries:jo,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Mh),fromReference:s=>s.applyMatrix3(bh).convertLinearToSRGB()}},pm=new Set([Yt,ta]),xt={enabled:!0,_workingColorSpace:Yt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!pm.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const n=Zr[e].toReference,i=Zr[t].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return Zr[s].primaries},getTransfer:function(s){return s===Mi?Go:Zr[s].transfer}};function Hs(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Aa(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ms;class mm{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ms===void 0&&(ms=Lr("canvas")),ms.width=e.width,ms.height=e.height;const n=ms.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ms}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Lr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Hs(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Hs(t[n]/255)*255):t[n]=Hs(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let gm=0;class Ud{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:gm++}),this.uuid=xn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Ca(i[o].image)):r.push(Ca(i[o]))}else r=Ca(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function Ca(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?mm.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let _m=0;class Ht extends os{constructor(e=Ht.DEFAULT_IMAGE,t=Ht.DEFAULT_MAPPING,n=vn,i=vn,r=Jt,o=Rn,a=Ln,l=Ri,c=Ht.DEFAULT_ANISOTROPY,h=Mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_m++}),this.uuid=xn(),this.name="",this.source=new Ud(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new _e(0,0),this.repeat=new _e(1,1),this.center=new _e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==bd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case kn:e.x=e.x-Math.floor(e.x);break;case vn:e.x=e.x<0?0:1;break;case Vo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case kn:e.y=e.y-Math.floor(e.y);break;case vn:e.y=e.y<0?0:1;break;case Vo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ht.DEFAULT_IMAGE=null;Ht.DEFAULT_MAPPING=bd;Ht.DEFAULT_ANISOTROPY=1;class wt{constructor(e=0,t=0,n=0,i=1){wt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],_=l[2],p=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,E=(f+1)/2,I=(m+1)/2,N=(h+d)/4,C=(u+_)/4,U=(g+p)/4;return x>E&&x>I?x<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(x),i=N/n,r=C/n):E>I?E<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(E),n=N/i,r=U/i):I<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(I),n=C/r,i=U/r),this.set(n,i,r,t),this}let T=Math.sqrt((p-g)*(p-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(T)<.001&&(T=1),this.x=(p-g)/T,this.y=(u-_)/T,this.z=(d-h)/T,this.w=Math.acos((c+f+m-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ym extends os{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new wt(0,0,e,t),this.scissorTest=!1,this.viewport=new wt(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Jt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ht(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Ud(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ts extends ym{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Od extends Ht{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=sn,this.minFilter=sn,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class vm extends Ht{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=sn,this.minFilter=sn,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class dn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=r[o+0],f=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==d||c!==f||h!==g){let p=1-a;const m=l*d+c*f+h*g+u*_,T=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const I=Math.sqrt(x),N=Math.atan2(I,m*T);p=Math.sin(p*N)/I,a=Math.sin(a*N)/I}const E=a*T;if(l=l*p+d*E,c=c*p+f*E,h=h*p+g*E,u=u*p+_*E,p===1-a){const I=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=I,c*=I,h*=I,u*=I}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-a*f,e[t+2]=c*g+h*f+a*d-l*u,e[t+3]=h*g-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),d=l(n/2),f=l(i/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(zt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(e=0,t=0,n=0){F.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Sh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Sh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),h=2*(a*t-r*i),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ra.copy(this).projectOnVector(e),this.sub(Ra)}reflect(e){return this.sub(Ra.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(zt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ra=new F,Sh=new dn;class Wn{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Sn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Sn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Sn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Sn):Sn.fromBufferAttribute(r,o),Sn.applyMatrix4(e.matrixWorld),this.expandByPoint(Sn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Jr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Jr.copy(n.boundingBox)),Jr.applyMatrix4(e.matrixWorld),this.union(Jr)}const i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Sn),Sn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(rr),Qr.subVectors(this.max,rr),gs.subVectors(e.a,rr),_s.subVectors(e.b,rr),ys.subVectors(e.c,rr),fi.subVectors(_s,gs),pi.subVectors(ys,_s),Oi.subVectors(gs,ys);let t=[0,-fi.z,fi.y,0,-pi.z,pi.y,0,-Oi.z,Oi.y,fi.z,0,-fi.x,pi.z,0,-pi.x,Oi.z,0,-Oi.x,-fi.y,fi.x,0,-pi.y,pi.x,0,-Oi.y,Oi.x,0];return!La(t,gs,_s,ys,Qr)||(t=[1,0,0,0,1,0,0,0,1],!La(t,gs,_s,ys,Qr))?!1:(eo.crossVectors(fi,pi),t=[eo.x,eo.y,eo.z],La(t,gs,_s,ys,Qr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Sn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Sn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Kn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Kn=[new F,new F,new F,new F,new F,new F,new F,new F],Sn=new F,Jr=new Wn,gs=new F,_s=new F,ys=new F,fi=new F,pi=new F,Oi=new F,rr=new F,Qr=new F,eo=new F,Fi=new F;function La(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){Fi.fromArray(s,r);const a=i.x*Math.abs(Fi.x)+i.y*Math.abs(Fi.y)+i.z*Math.abs(Fi.z),l=e.dot(Fi),c=t.dot(Fi),h=n.dot(Fi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const xm=new Wn,or=new F,Pa=new F;class Pn{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):xm.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;or.subVectors(e,this.center);const t=or.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(or,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Pa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(or.copy(e.center).add(Pa)),this.expandByPoint(or.copy(e.center).sub(Pa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Zn=new F,Na=new F,to=new F,mi=new F,Ia=new F,no=new F,Da=new F;class Ks{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Zn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Zn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Zn.copy(this.origin).addScaledVector(this.direction,t),Zn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Na.copy(e).add(t).multiplyScalar(.5),to.copy(t).sub(e).normalize(),mi.copy(this.origin).sub(Na);const r=e.distanceTo(t)*.5,o=-this.direction.dot(to),a=mi.dot(this.direction),l=-mi.dot(to),c=mi.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Na).addScaledVector(to,d),f}intersectSphere(e,t){Zn.subVectors(e.center,this.origin);const n=Zn.dot(this.direction),i=Zn.dot(Zn)-n*n,r=e.radius*e.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Zn)!==null}intersectTriangle(e,t,n,i,r){Ia.subVectors(t,e),no.subVectors(n,e),Da.crossVectors(Ia,no);let o=this.direction.dot(Da),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;mi.subVectors(this.origin,e);const l=a*this.direction.dot(no.crossVectors(mi,no));if(l<0)return null;const c=a*this.direction.dot(Ia.cross(mi));if(c<0||l+c>o)return null;const h=-a*mi.dot(Da);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class $e{constructor(e,t,n,i,r,o,a,l,c,h,u,d,f,g,_,p){$e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,h,u,d,f,g,_,p)}set(e,t,n,i,r,o,a,l,c,h,u,d,f,g,_,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new $e().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/vs.setFromMatrixColumn(e,0).length(),r=1/vs.setFromMatrixColumn(e,1).length(),o=1/vs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=o*h,f=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-_*c,t[9]=-a*l,t[2]=_-d*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d+_*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=_+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d-_*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*h,f=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,f=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=o*l,f=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(bm,e,Mm)}lookAt(e,t,n){const i=this.elements;return cn.subVectors(e,t),cn.lengthSq()===0&&(cn.z=1),cn.normalize(),gi.crossVectors(n,cn),gi.lengthSq()===0&&(Math.abs(n.z)===1?cn.x+=1e-4:cn.z+=1e-4,cn.normalize(),gi.crossVectors(n,cn)),gi.normalize(),io.crossVectors(cn,gi),i[0]=gi.x,i[4]=io.x,i[8]=cn.x,i[1]=gi.y,i[5]=io.y,i[9]=cn.y,i[2]=gi.z,i[6]=io.z,i[10]=cn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],p=n[10],m=n[14],T=n[3],x=n[7],E=n[11],I=n[15],N=i[0],C=i[4],U=i[8],M=i[12],y=i[1],D=i[5],H=i[9],k=i[13],z=i[2],$=i[6],B=i[10],ne=i[14],G=i[3],se=i[7],ae=i[11],pe=i[15];return r[0]=o*N+a*y+l*z+c*G,r[4]=o*C+a*D+l*$+c*se,r[8]=o*U+a*H+l*B+c*ae,r[12]=o*M+a*k+l*ne+c*pe,r[1]=h*N+u*y+d*z+f*G,r[5]=h*C+u*D+d*$+f*se,r[9]=h*U+u*H+d*B+f*ae,r[13]=h*M+u*k+d*ne+f*pe,r[2]=g*N+_*y+p*z+m*G,r[6]=g*C+_*D+p*$+m*se,r[10]=g*U+_*H+p*B+m*ae,r[14]=g*M+_*k+p*ne+m*pe,r[3]=T*N+x*y+E*z+I*G,r[7]=T*C+x*D+E*$+I*se,r[11]=T*U+x*H+E*B+I*ae,r[15]=T*M+x*k+E*ne+I*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],p=e[11],m=e[15];return g*(+r*l*u-i*c*u-r*a*d+n*c*d+i*a*f-n*l*f)+_*(+t*l*f-t*c*d+r*o*d-i*o*f+i*c*h-r*l*h)+p*(+t*c*u-t*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+m*(-i*a*h-t*l*u+t*a*d+i*o*u-n*o*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],p=e[14],m=e[15],T=u*p*c-_*d*c+_*l*f-a*p*f-u*l*m+a*d*m,x=g*d*c-h*p*c-g*l*f+o*p*f+h*l*m-o*d*m,E=h*_*c-g*u*c+g*a*f-o*_*f-h*a*m+o*u*m,I=g*u*l-h*_*l-g*a*d+o*_*d+h*a*p-o*u*p,N=t*T+n*x+i*E+r*I;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/N;return e[0]=T*C,e[1]=(_*d*r-u*p*r-_*i*f+n*p*f+u*i*m-n*d*m)*C,e[2]=(a*p*r-_*l*r+_*i*c-n*p*c-a*i*m+n*l*m)*C,e[3]=(u*l*r-a*d*r-u*i*c+n*d*c+a*i*f-n*l*f)*C,e[4]=x*C,e[5]=(h*p*r-g*d*r+g*i*f-t*p*f-h*i*m+t*d*m)*C,e[6]=(g*l*r-o*p*r-g*i*c+t*p*c+o*i*m-t*l*m)*C,e[7]=(o*d*r-h*l*r+h*i*c-t*d*c-o*i*f+t*l*f)*C,e[8]=E*C,e[9]=(g*u*r-h*_*r-g*n*f+t*_*f+h*n*m-t*u*m)*C,e[10]=(o*_*r-g*a*r+g*n*c-t*_*c-o*n*m+t*a*m)*C,e[11]=(h*a*r-o*u*r-h*n*c+t*u*c+o*n*f-t*a*f)*C,e[12]=I*C,e[13]=(h*_*i-g*u*i+g*n*d-t*_*d-h*n*p+t*u*p)*C,e[14]=(g*a*i-o*_*i-g*n*l+t*_*l+o*n*p-t*a*p)*C,e[15]=(o*u*i-h*a*i+h*n*l-t*u*l-o*n*d+t*a*d)*C,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,g=r*u,_=o*h,p=o*u,m=a*u,T=l*c,x=l*h,E=l*u,I=n.x,N=n.y,C=n.z;return i[0]=(1-(_+m))*I,i[1]=(f+E)*I,i[2]=(g-x)*I,i[3]=0,i[4]=(f-E)*N,i[5]=(1-(d+m))*N,i[6]=(p+T)*N,i[7]=0,i[8]=(g+x)*C,i[9]=(p-T)*C,i[10]=(1-(d+_))*C,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=vs.set(i[0],i[1],i[2]).length();const o=vs.set(i[4],i[5],i[6]).length(),a=vs.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],En.copy(this);const c=1/r,h=1/o,u=1/a;return En.elements[0]*=c,En.elements[1]*=c,En.elements[2]*=c,En.elements[4]*=h,En.elements[5]*=h,En.elements[6]*=h,En.elements[8]*=u,En.elements[9]*=u,En.elements[10]*=u,t.setFromRotationMatrix(En),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=oi){const l=this.elements,c=2*r/(t-e),h=2*r/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i);let f,g;if(a===oi)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Xo)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=oi){const l=this.elements,c=1/(t-e),h=1/(n-i),u=1/(o-r),d=(t+e)*c,f=(n+i)*h;let g,_;if(a===oi)g=(o+r)*u,_=-2*u;else if(a===Xo)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const vs=new F,En=new $e,bm=new F(0,0,0),Mm=new F(1,1,1),gi=new F,io=new F,cn=new F,Eh=new $e,Th=new dn;class rn{constructor(e=0,t=0,n=0,i=rn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-zt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(zt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-zt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(zt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Eh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Eh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Th.setFromEuler(this),this.setFromQuaternion(Th,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}rn.DEFAULT_ORDER="XYZ";class jl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Sm=0;const wh=new F,xs=new dn,Jn=new $e,so=new F,ar=new F,Em=new F,Tm=new dn,Ah=new F(1,0,0),Ch=new F(0,1,0),Rh=new F(0,0,1),Lh={type:"added"},wm={type:"removed"},bs={type:"childadded",child:null},Ua={type:"childremoved",child:null};class At extends os{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Sm++}),this.uuid=xn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=At.DEFAULT_UP.clone();const e=new F,t=new rn,n=new dn,i=new F(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new $e},normalMatrix:{value:new ut}}),this.matrix=new $e,this.matrixWorld=new $e,this.matrixAutoUpdate=At.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return xs.setFromAxisAngle(e,t),this.quaternion.multiply(xs),this}rotateOnWorldAxis(e,t){return xs.setFromAxisAngle(e,t),this.quaternion.premultiply(xs),this}rotateX(e){return this.rotateOnAxis(Ah,e)}rotateY(e){return this.rotateOnAxis(Ch,e)}rotateZ(e){return this.rotateOnAxis(Rh,e)}translateOnAxis(e,t){return wh.copy(e).applyQuaternion(this.quaternion),this.position.add(wh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ah,e)}translateY(e){return this.translateOnAxis(Ch,e)}translateZ(e){return this.translateOnAxis(Rh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Jn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?so.copy(e):so.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ar.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Jn.lookAt(ar,so,this.up):Jn.lookAt(so,ar,this.up),this.quaternion.setFromRotationMatrix(Jn),i&&(Jn.extractRotation(i.matrixWorld),xs.setFromRotationMatrix(Jn),this.quaternion.premultiply(xs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Lh),bs.child=e,this.dispatchEvent(bs),bs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(wm),Ua.child=e,this.dispatchEvent(Ua),Ua.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Jn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Jn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Jn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Lh),bs.child=e,this.dispatchEvent(bs),bs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ar,e,Em),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ar,Tm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++){const a=i[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}At.DEFAULT_UP=new F(0,1,0);At.DEFAULT_MATRIX_AUTO_UPDATE=!0;At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Tn=new F,Qn=new F,Oa=new F,ei=new F,Ms=new F,Ss=new F,Ph=new F,Fa=new F,ka=new F,Ba=new F;class Fn{constructor(e=new F,t=new F,n=new F){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Tn.subVectors(e,t),i.cross(Tn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Tn.subVectors(i,t),Qn.subVectors(n,t),Oa.subVectors(e,t);const o=Tn.dot(Tn),a=Tn.dot(Qn),l=Tn.dot(Oa),c=Qn.dot(Qn),h=Qn.dot(Oa),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ei)===null?!1:ei.x>=0&&ei.y>=0&&ei.x+ei.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,ei)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ei.x),l.addScaledVector(o,ei.y),l.addScaledVector(a,ei.z),l)}static isFrontFacing(e,t,n,i){return Tn.subVectors(n,t),Qn.subVectors(e,t),Tn.cross(Qn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Tn.subVectors(this.c,this.b),Qn.subVectors(this.a,this.b),Tn.cross(Qn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Fn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Fn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return Fn.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return Fn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Fn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let o,a;Ms.subVectors(i,n),Ss.subVectors(r,n),Fa.subVectors(e,n);const l=Ms.dot(Fa),c=Ss.dot(Fa);if(l<=0&&c<=0)return t.copy(n);ka.subVectors(e,i);const h=Ms.dot(ka),u=Ss.dot(ka);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(Ms,o);Ba.subVectors(e,r);const f=Ms.dot(Ba),g=Ss.dot(Ba);if(g>=0&&f<=g)return t.copy(r);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(Ss,a);const p=h*g-f*u;if(p<=0&&u-h>=0&&f-g>=0)return Ph.subVectors(r,i),a=(u-h)/(u-h+(f-g)),t.copy(i).addScaledVector(Ph,a);const m=1/(p+_+d);return o=_*m,a=d*m,t.copy(n).addScaledVector(Ms,o).addScaledVector(Ss,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Fd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_i={h:0,s:0,l:0},ro={h:0,s:0,l:0};function za(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Xe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ot){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,xt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=xt.workingColorSpace){return this.r=e,this.g=t,this.b=n,xt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=xt.workingColorSpace){if(e=Wl(e,1),t=zt(t,0,1),n=zt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=za(o,r,e+1/3),this.g=za(o,r,e),this.b=za(o,r,e-1/3)}return xt.toWorkingColorSpace(this,i),this}setStyle(e,t=Ot){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ot){const n=Fd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Hs(e.r),this.g=Hs(e.g),this.b=Hs(e.b),this}copyLinearToSRGB(e){return this.r=Aa(e.r),this.g=Aa(e.g),this.b=Aa(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ot){return xt.fromWorkingColorSpace(Zt.copy(this),e),Math.round(zt(Zt.r*255,0,255))*65536+Math.round(zt(Zt.g*255,0,255))*256+Math.round(zt(Zt.b*255,0,255))}getHexString(e=Ot){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=xt.workingColorSpace){xt.fromWorkingColorSpace(Zt.copy(this),t);const n=Zt.r,i=Zt.g,r=Zt.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=xt.workingColorSpace){return xt.fromWorkingColorSpace(Zt.copy(this),t),e.r=Zt.r,e.g=Zt.g,e.b=Zt.b,e}getStyle(e=Ot){xt.fromWorkingColorSpace(Zt.copy(this),e);const t=Zt.r,n=Zt.g,i=Zt.b;return e!==Ot?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(_i),this.setHSL(_i.h+e,_i.s+t,_i.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(_i),e.getHSL(ro);const n=xr(_i.h,ro.h,t),i=xr(_i.s,ro.s,t),r=xr(_i.l,ro.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Zt=new Xe;Xe.NAMES=Fd;let Am=0;class un extends os{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Am++}),this.uuid=xn(),this.name="",this.type="Material",this.blending=Bs,this.side=Hn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xl,this.blendDst=bl,this.blendEquation=Xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xe(0,0,0),this.blendAlpha=0,this.depthFunc=Ho,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_h,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ps,this.stencilZFail=ps,this.stencilZPass=ps,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Bs&&(n.blending=this.blending),this.side!==Hn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==xl&&(n.blendSrc=this.blendSrc),this.blendDst!==bl&&(n.blendDst=this.blendDst),this.blendEquation!==Xi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ho&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==_h&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ps&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ps&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ps&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class zn extends un{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.combine=Zo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ft=new F,oo=new _e;class It{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Tl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Bn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Dd("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)oo.fromBufferAttribute(this,t),oo.applyMatrix3(e),this.setXY(t,oo.x,oo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix3(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Cn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Mt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Cn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Cn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Cn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Cn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),i=Mt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),i=Mt(i,this.array),r=Mt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Tl&&(e.usage=this.usage),e}}class kd extends It{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Bd extends It{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Tt extends It{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Cm=0;const fn=new $e,Ha=new At,Es=new F,hn=new Wn,lr=new Wn,jt=new F;class Xt extends os{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Cm++}),this.uuid=xn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Id(e)?Bd:kd)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ut().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return fn.makeRotationFromQuaternion(e),this.applyMatrix4(fn),this}rotateX(e){return fn.makeRotationX(e),this.applyMatrix4(fn),this}rotateY(e){return fn.makeRotationY(e),this.applyMatrix4(fn),this}rotateZ(e){return fn.makeRotationZ(e),this.applyMatrix4(fn),this}translate(e,t,n){return fn.makeTranslation(e,t,n),this.applyMatrix4(fn),this}scale(e,t,n){return fn.makeScale(e,t,n),this.applyMatrix4(fn),this}lookAt(e){return Ha.lookAt(e),Ha.updateMatrix(),this.applyMatrix4(Ha.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Es).negate(),this.translate(Es.x,Es.y,Es.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Tt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];hn.setFromBufferAttribute(r),this.morphTargetsRelative?(jt.addVectors(this.boundingBox.min,hn.min),this.boundingBox.expandByPoint(jt),jt.addVectors(this.boundingBox.max,hn.max),this.boundingBox.expandByPoint(jt)):(this.boundingBox.expandByPoint(hn.min),this.boundingBox.expandByPoint(hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Pn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const n=this.boundingSphere.center;if(hn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];lr.setFromBufferAttribute(a),this.morphTargetsRelative?(jt.addVectors(hn.min,lr.min),hn.expandByPoint(jt),jt.addVectors(hn.max,lr.max),hn.expandByPoint(jt)):(hn.expandByPoint(lr.min),hn.expandByPoint(lr.max))}hn.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)jt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(jt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)jt.fromBufferAttribute(a,c),l&&(Es.fromBufferAttribute(e,c),jt.add(Es)),i=Math.max(i,n.distanceToSquared(jt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new It(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let U=0;U<n.count;U++)a[U]=new F,l[U]=new F;const c=new F,h=new F,u=new F,d=new _e,f=new _e,g=new _e,_=new F,p=new F;function m(U,M,y){c.fromBufferAttribute(n,U),h.fromBufferAttribute(n,M),u.fromBufferAttribute(n,y),d.fromBufferAttribute(r,U),f.fromBufferAttribute(r,M),g.fromBufferAttribute(r,y),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const D=1/(f.x*g.y-g.x*f.y);isFinite(D)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(D),p.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(D),a[U].add(_),a[M].add(_),a[y].add(_),l[U].add(p),l[M].add(p),l[y].add(p))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let U=0,M=T.length;U<M;++U){const y=T[U],D=y.start,H=y.count;for(let k=D,z=D+H;k<z;k+=3)m(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const x=new F,E=new F,I=new F,N=new F;function C(U){I.fromBufferAttribute(i,U),N.copy(I);const M=a[U];x.copy(M),x.sub(I.multiplyScalar(I.dot(M))).normalize(),E.crossVectors(N,M);const D=E.dot(l[U])<0?-1:1;o.setXYZW(U,x.x,x.y,x.z,D)}for(let U=0,M=T.length;U<M;++U){const y=T[U],D=y.start,H=y.count;for(let k=D,z=D+H;k<z;k+=3)C(e.getX(k+0)),C(e.getX(k+1)),C(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new It(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new F,r=new F,o=new F,a=new F,l=new F,c=new F,h=new F,u=new F;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),p=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,p),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)jt.fromBufferAttribute(e,t),jt.normalize(),e.setXYZ(t,jt.x,jt.y,jt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let _=0,p=l.length;_<p;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let m=0;m<h;m++)d[g++]=c[f++]}return new It(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Xt,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Nh=new $e,ki=new Ks,ao=new Pn,Ih=new F,Ts=new F,ws=new F,As=new F,Va=new F,lo=new F,co=new _e,ho=new _e,uo=new _e,Dh=new F,Uh=new F,Oh=new F,fo=new F,po=new F;class kt extends At{constructor(e=new Xt,t=new zn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(r&&a){lo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(Va.fromBufferAttribute(u,e),o?lo.addScaledVector(Va,h):lo.addScaledVector(Va.sub(t),h))}t.add(lo)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ao.copy(n.boundingSphere),ao.applyMatrix4(r),ki.copy(e.ray).recast(e.near),!(ao.containsPoint(ki.origin)===!1&&(ki.intersectSphere(ao,Ih)===null||ki.origin.distanceToSquared(Ih)>(e.far-e.near)**2))&&(Nh.copy(r).invert(),ki.copy(e.ray).applyMatrix4(Nh),!(n.boundingBox!==null&&ki.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ki)))}_computeIntersections(e,t,n){let i;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const p=d[g],m=o[p.materialIndex],T=Math.max(p.start,f.start),x=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let E=T,I=x;E<I;E+=3){const N=a.getX(E),C=a.getX(E+1),U=a.getX(E+2);i=mo(this,m,e,n,c,h,u,N,C,U),i&&(i.faceIndex=Math.floor(E/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const T=a.getX(p),x=a.getX(p+1),E=a.getX(p+2);i=mo(this,o,e,n,c,h,u,T,x,E),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const p=d[g],m=o[p.materialIndex],T=Math.max(p.start,f.start),x=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let E=T,I=x;E<I;E+=3){const N=E,C=E+1,U=E+2;i=mo(this,m,e,n,c,h,u,N,C,U),i&&(i.faceIndex=Math.floor(E/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const T=p,x=p+1,E=p+2;i=mo(this,o,e,n,c,h,u,T,x,E),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}}function Rm(s,e,t,n,i,r,o,a){let l;if(e.side===ln?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===Hn,a),l===null)return null;po.copy(a),po.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(po);return c<t.near||c>t.far?null:{distance:c,point:po.clone(),object:s}}function mo(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,Ts),s.getVertexPosition(l,ws),s.getVertexPosition(c,As);const h=Rm(s,e,t,n,Ts,ws,As,fo);if(h){i&&(co.fromBufferAttribute(i,a),ho.fromBufferAttribute(i,l),uo.fromBufferAttribute(i,c),h.uv=Fn.getInterpolation(fo,Ts,ws,As,co,ho,uo,new _e)),r&&(co.fromBufferAttribute(r,a),ho.fromBufferAttribute(r,l),uo.fromBufferAttribute(r,c),h.uv1=Fn.getInterpolation(fo,Ts,ws,As,co,ho,uo,new _e)),o&&(Dh.fromBufferAttribute(o,a),Uh.fromBufferAttribute(o,l),Oh.fromBufferAttribute(o,c),h.normal=Fn.getInterpolation(fo,Ts,ws,As,Dh,Uh,Oh,new F),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new F,materialIndex:0};Fn.getNormal(Ts,ws,As,u.normal),h.face=u}return h}class Zs extends Xt{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Tt(c,3)),this.setAttribute("normal",new Tt(h,3)),this.setAttribute("uv",new Tt(u,2));function g(_,p,m,T,x,E,I,N,C,U,M){const y=E/C,D=I/U,H=E/2,k=I/2,z=N/2,$=C+1,B=U+1;let ne=0,G=0;const se=new F;for(let ae=0;ae<B;ae++){const pe=ae*D-k;for(let Le=0;Le<$;Le++){const Ae=Le*y-H;se[_]=Ae*T,se[p]=pe*x,se[m]=z,c.push(se.x,se.y,se.z),se[_]=0,se[p]=0,se[m]=N>0?1:-1,h.push(se.x,se.y,se.z),u.push(Le/C),u.push(1-ae/U),ne+=1}}for(let ae=0;ae<U;ae++)for(let pe=0;pe<C;pe++){const Le=d+pe+$*ae,Ae=d+pe+$*(ae+1),W=d+(pe+1)+$*(ae+1),ee=d+(pe+1)+$*ae;l.push(Le,Ae,ee),l.push(Ae,W,ee),G+=6}a.addGroup(f,G,M),f+=G,d+=ne}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function $s(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function nn(s){const e={};for(let t=0;t<s.length;t++){const n=$s(s[t]);for(const i in n)e[i]=n[i]}return e}function Lm(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function zd(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:xt.workingColorSpace}const Pm={clone:$s,merge:nn};var Nm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Im=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Li extends un{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Nm,this.fragmentShader=Im,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$s(e.uniforms),this.uniformsGroups=Lm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Hd extends At{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new $e,this.projectionMatrix=new $e,this.projectionMatrixInverse=new $e,this.coordinateSystem=oi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const yi=new F,Fh=new _e,kh=new _e;class $t extends Hd{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=qs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(vr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return qs*2*Math.atan(Math.tan(vr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(yi.x,yi.y).multiplyScalar(-e/yi.z),yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(yi.x,yi.y).multiplyScalar(-e/yi.z)}getViewSize(e,t){return this.getViewBounds(e,Fh,kh),t.subVectors(kh,Fh)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(vr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Cs=-90,Rs=1;class Dm extends At{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new $t(Cs,Rs,e,t);i.layers=this.layers,this.add(i);const r=new $t(Cs,Rs,e,t);r.layers=this.layers,this.add(r);const o=new $t(Cs,Rs,e,t);o.layers=this.layers,this.add(o);const a=new $t(Cs,Rs,e,t);a.layers=this.layers,this.add(a);const l=new $t(Cs,Rs,e,t);l.layers=this.layers,this.add(l);const c=new $t(Cs,Rs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===oi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Xo)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Vd extends Ht{constructor(e,t,n,i,r,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Gs,super(e,t,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Um extends ts{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Vd(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Jt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Zs(5,5,5),r=new Li({name:"CubemapFromEquirect",uniforms:$s(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ln,blending:Ti});r.uniforms.tEquirect.value=t;const o=new kt(i,r),a=t.minFilter;return t.minFilter===Rn&&(t.minFilter=Jt),new Dm(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}}const Ga=new F,Om=new F,Fm=new ut;class wn{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Ga.subVectors(n,t).cross(Om.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ga),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Fm.getNormalMatrix(e),i=this.coplanarPoint(Ga).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Bi=new Pn,go=new F;class Xl{constructor(e=new wn,t=new wn,n=new wn,i=new wn,r=new wn,o=new wn){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=oi){const n=this.planes,i=e.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],g=i[9],_=i[10],p=i[11],m=i[12],T=i[13],x=i[14],E=i[15];if(n[0].setComponents(l-r,d-c,p-f,E-m).normalize(),n[1].setComponents(l+r,d+c,p+f,E+m).normalize(),n[2].setComponents(l+o,d+h,p+g,E+T).normalize(),n[3].setComponents(l-o,d-h,p-g,E-T).normalize(),n[4].setComponents(l-a,d-u,p-_,E-x).normalize(),t===oi)n[5].setComponents(l+a,d+u,p+_,E+x).normalize();else if(t===Xo)n[5].setComponents(a,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Bi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Bi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Bi)}intersectsSprite(e){return Bi.center.set(0,0,0),Bi.radius=.7071067811865476,Bi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Bi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(go.x=i.normal.x>0?e.max.x:e.min.x,go.y=i.normal.y>0?e.max.y:e.min.y,go.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(go)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Gd(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function km(s){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l._updateRange,d=l.updateRanges;if(s.bindBuffer(c,a),u.count===-1&&d.length===0&&s.bufferSubData(c,0,h),d.length!==0){for(let f=0,g=d.length;f<g;f++){const _=d[f];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}u.count!==-1&&(s.bufferSubData(c,u.offset*h.BYTES_PER_ELEMENT,h,u.offset,u.count),u.count=-1),l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}class zr extends Xt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,d=t/l,f=[],g=[],_=[],p=[];for(let m=0;m<h;m++){const T=m*d-o;for(let x=0;x<c;x++){const E=x*u-r;g.push(E,-T,0),_.push(0,0,1),p.push(x/a),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let T=0;T<a;T++){const x=T+c*m,E=T+c*(m+1),I=T+1+c*(m+1),N=T+1+c*m;f.push(x,E,N),f.push(E,I,N)}this.setIndex(f),this.setAttribute("position",new Tt(g,3)),this.setAttribute("normal",new Tt(_,3)),this.setAttribute("uv",new Tt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zr(e.width,e.height,e.widthSegments,e.heightSegments)}}var Bm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Hm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Vm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Wm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,jm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Xm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qm=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,$m=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Ym=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Km=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Jm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Qm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,eg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,tg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ng=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ig=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,sg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,rg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,og=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,ag=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,lg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,hg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ug=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,dg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,fg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,pg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,mg="gl_FragColor = linearToOutputTexel( gl_FragColor );",gg=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,_g=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,yg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,vg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,xg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,bg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Mg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Sg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Eg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Tg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,wg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ag=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Cg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Rg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Lg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Pg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ng=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ig=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Dg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ug=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Og=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Fg=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,kg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Bg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,zg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Hg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Vg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,jg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Xg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,qg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,$g=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Kg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Zg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Jg=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Qg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,e_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
	#endif
	#ifdef MORPHTARGETS_TEXTURE
		#ifndef USE_INSTANCING_MORPH
			uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		#endif
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,t_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,n_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,i_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,s_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,r_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,o_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,a_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,l_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,c_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,h_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,u_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,d_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,f_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,p_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,m_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,g_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,__=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,y_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,v_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,x_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,b_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,M_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,S_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,E_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,T_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,w_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,A_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,C_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,R_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,L_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,P_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,N_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,I_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,D_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,U_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,O_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,F_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const k_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,B_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,z_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,H_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,V_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,G_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,W_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,j_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,X_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,q_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,$_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Y_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,K_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Z_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,J_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Q_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,e0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,t0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,n0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,i0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,s0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,r0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,o0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,a0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,l0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,c0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,h0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,u0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,d0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,f0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,p0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,m0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,g0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,_0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ht={alphahash_fragment:Bm,alphahash_pars_fragment:zm,alphamap_fragment:Hm,alphamap_pars_fragment:Vm,alphatest_fragment:Gm,alphatest_pars_fragment:Wm,aomap_fragment:jm,aomap_pars_fragment:Xm,batching_pars_vertex:qm,batching_vertex:$m,begin_vertex:Ym,beginnormal_vertex:Km,bsdfs:Zm,iridescence_fragment:Jm,bumpmap_pars_fragment:Qm,clipping_planes_fragment:eg,clipping_planes_pars_fragment:tg,clipping_planes_pars_vertex:ng,clipping_planes_vertex:ig,color_fragment:sg,color_pars_fragment:rg,color_pars_vertex:og,color_vertex:ag,common:lg,cube_uv_reflection_fragment:cg,defaultnormal_vertex:hg,displacementmap_pars_vertex:ug,displacementmap_vertex:dg,emissivemap_fragment:fg,emissivemap_pars_fragment:pg,colorspace_fragment:mg,colorspace_pars_fragment:gg,envmap_fragment:_g,envmap_common_pars_fragment:yg,envmap_pars_fragment:vg,envmap_pars_vertex:xg,envmap_physical_pars_fragment:Pg,envmap_vertex:bg,fog_vertex:Mg,fog_pars_vertex:Sg,fog_fragment:Eg,fog_pars_fragment:Tg,gradientmap_pars_fragment:wg,lightmap_pars_fragment:Ag,lights_lambert_fragment:Cg,lights_lambert_pars_fragment:Rg,lights_pars_begin:Lg,lights_toon_fragment:Ng,lights_toon_pars_fragment:Ig,lights_phong_fragment:Dg,lights_phong_pars_fragment:Ug,lights_physical_fragment:Og,lights_physical_pars_fragment:Fg,lights_fragment_begin:kg,lights_fragment_maps:Bg,lights_fragment_end:zg,logdepthbuf_fragment:Hg,logdepthbuf_pars_fragment:Vg,logdepthbuf_pars_vertex:Gg,logdepthbuf_vertex:Wg,map_fragment:jg,map_pars_fragment:Xg,map_particle_fragment:qg,map_particle_pars_fragment:$g,metalnessmap_fragment:Yg,metalnessmap_pars_fragment:Kg,morphinstance_vertex:Zg,morphcolor_vertex:Jg,morphnormal_vertex:Qg,morphtarget_pars_vertex:e_,morphtarget_vertex:t_,normal_fragment_begin:n_,normal_fragment_maps:i_,normal_pars_fragment:s_,normal_pars_vertex:r_,normal_vertex:o_,normalmap_pars_fragment:a_,clearcoat_normal_fragment_begin:l_,clearcoat_normal_fragment_maps:c_,clearcoat_pars_fragment:h_,iridescence_pars_fragment:u_,opaque_fragment:d_,packing:f_,premultiplied_alpha_fragment:p_,project_vertex:m_,dithering_fragment:g_,dithering_pars_fragment:__,roughnessmap_fragment:y_,roughnessmap_pars_fragment:v_,shadowmap_pars_fragment:x_,shadowmap_pars_vertex:b_,shadowmap_vertex:M_,shadowmask_pars_fragment:S_,skinbase_vertex:E_,skinning_pars_vertex:T_,skinning_vertex:w_,skinnormal_vertex:A_,specularmap_fragment:C_,specularmap_pars_fragment:R_,tonemapping_fragment:L_,tonemapping_pars_fragment:P_,transmission_fragment:N_,transmission_pars_fragment:I_,uv_pars_fragment:D_,uv_pars_vertex:U_,uv_vertex:O_,worldpos_vertex:F_,background_vert:k_,background_frag:B_,backgroundCube_vert:z_,backgroundCube_frag:H_,cube_vert:V_,cube_frag:G_,depth_vert:W_,depth_frag:j_,distanceRGBA_vert:X_,distanceRGBA_frag:q_,equirect_vert:$_,equirect_frag:Y_,linedashed_vert:K_,linedashed_frag:Z_,meshbasic_vert:J_,meshbasic_frag:Q_,meshlambert_vert:e0,meshlambert_frag:t0,meshmatcap_vert:n0,meshmatcap_frag:i0,meshnormal_vert:s0,meshnormal_frag:r0,meshphong_vert:o0,meshphong_frag:a0,meshphysical_vert:l0,meshphysical_frag:c0,meshtoon_vert:h0,meshtoon_frag:u0,points_vert:d0,points_frag:f0,shadow_vert:p0,shadow_frag:m0,sprite_vert:g0,sprite_frag:_0},we={common:{diffuse:{value:new Xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ut},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ut}},envmap:{envMap:{value:null},envMapRotation:{value:new ut},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ut},normalScale:{value:new _e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0},uvTransform:{value:new ut}},sprite:{diffuse:{value:new Xe(16777215)},opacity:{value:1},center:{value:new _e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ut},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0}}},Un={basic:{uniforms:nn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:nn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new Xe(0)}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:nn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new Xe(0)},specular:{value:new Xe(1118481)},shininess:{value:30}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:nn([we.common,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.roughnessmap,we.metalnessmap,we.fog,we.lights,{emissive:{value:new Xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:nn([we.common,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.gradientmap,we.fog,we.lights,{emissive:{value:new Xe(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:nn([we.common,we.bumpmap,we.normalmap,we.displacementmap,we.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:nn([we.points,we.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:nn([we.common,we.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:nn([we.common,we.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:nn([we.common,we.bumpmap,we.normalmap,we.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:nn([we.sprite,we.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ut}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distanceRGBA:{uniforms:nn([we.common,we.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distanceRGBA_vert,fragmentShader:ht.distanceRGBA_frag},shadow:{uniforms:nn([we.lights,we.fog,{color:{value:new Xe(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};Un.physical={uniforms:nn([Un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ut},clearcoatNormalScale:{value:new _e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ut},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ut},sheen:{value:0},sheenColor:{value:new Xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ut},transmissionSamplerSize:{value:new _e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ut},attenuationDistance:{value:0},attenuationColor:{value:new Xe(0)},specularColor:{value:new Xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ut},anisotropyVector:{value:new _e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ut}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};const _o={r:0,b:0,g:0},zi=new rn,y0=new $e;function v0(s,e,t,n,i,r,o){const a=new Xe(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(T){let x=T.isScene===!0?T.background:null;return x&&x.isTexture&&(x=(T.backgroundBlurriness>0?t:e).get(x)),x}function _(T){let x=!1;const E=g(T);E===null?m(a,l):E&&E.isColor&&(m(E,1),x=!0);const I=s.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,o):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||x)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil)}function p(T,x){const E=g(x);E&&(E.isCubeTexture||E.mapping===Jo)?(h===void 0&&(h=new kt(new Zs(1,1,1),new Li({name:"BackgroundCubeMaterial",uniforms:$s(Un.backgroundCube.uniforms),vertexShader:Un.backgroundCube.vertexShader,fragmentShader:Un.backgroundCube.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(I,N,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),zi.copy(x.backgroundRotation),zi.x*=-1,zi.y*=-1,zi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(zi.y*=-1,zi.z*=-1),h.material.uniforms.envMap.value=E,h.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(y0.makeRotationFromEuler(zi)),h.material.toneMapped=xt.getTransfer(E.colorSpace)!==Rt,(u!==E||d!==E.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=E,d=E.version,f=s.toneMapping),h.layers.enableAll(),T.unshift(h,h.geometry,h.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new kt(new zr(2,2),new Li({name:"BackgroundMaterial",uniforms:$s(Un.background.uniforms),vertexShader:Un.background.vertexShader,fragmentShader:Un.background.fragmentShader,side:Hn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=xt.getTransfer(E.colorSpace)!==Rt,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||d!==E.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=E,d=E.version,f=s.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function m(T,x){T.getRGB(_o,zd(s)),n.buffers.color.setClear(_o.r,_o.g,_o.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(T,x=1){a.set(T),l=x,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(T){l=T,m(a,l)},render:_,addToRenderList:p}}function x0(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,o=!1;function a(y,D,H,k,z){let $=!1;const B=u(k,H,D);r!==B&&(r=B,c(r.object)),$=f(y,k,H,z),$&&g(y,k,H,z),z!==null&&e.update(z,s.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,E(y,D,H,k),z!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return s.createVertexArray()}function c(y){return s.bindVertexArray(y)}function h(y){return s.deleteVertexArray(y)}function u(y,D,H){const k=H.wireframe===!0;let z=n[y.id];z===void 0&&(z={},n[y.id]=z);let $=z[D.id];$===void 0&&($={},z[D.id]=$);let B=$[k];return B===void 0&&(B=d(l()),$[k]=B),B}function d(y){const D=[],H=[],k=[];for(let z=0;z<t;z++)D[z]=0,H[z]=0,k[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:H,attributeDivisors:k,object:y,attributes:{},index:null}}function f(y,D,H,k){const z=r.attributes,$=D.attributes;let B=0;const ne=H.getAttributes();for(const G in ne)if(ne[G].location>=0){const ae=z[G];let pe=$[G];if(pe===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(pe=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(pe=y.instanceColor)),ae===void 0||ae.attribute!==pe||pe&&ae.data!==pe.data)return!0;B++}return r.attributesNum!==B||r.index!==k}function g(y,D,H,k){const z={},$=D.attributes;let B=0;const ne=H.getAttributes();for(const G in ne)if(ne[G].location>=0){let ae=$[G];ae===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(ae=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(ae=y.instanceColor));const pe={};pe.attribute=ae,ae&&ae.data&&(pe.data=ae.data),z[G]=pe,B++}r.attributes=z,r.attributesNum=B,r.index=k}function _(){const y=r.newAttributes;for(let D=0,H=y.length;D<H;D++)y[D]=0}function p(y){m(y,0)}function m(y,D){const H=r.newAttributes,k=r.enabledAttributes,z=r.attributeDivisors;H[y]=1,k[y]===0&&(s.enableVertexAttribArray(y),k[y]=1),z[y]!==D&&(s.vertexAttribDivisor(y,D),z[y]=D)}function T(){const y=r.newAttributes,D=r.enabledAttributes;for(let H=0,k=D.length;H<k;H++)D[H]!==y[H]&&(s.disableVertexAttribArray(H),D[H]=0)}function x(y,D,H,k,z,$,B){B===!0?s.vertexAttribIPointer(y,D,H,z,$):s.vertexAttribPointer(y,D,H,k,z,$)}function E(y,D,H,k){_();const z=k.attributes,$=H.getAttributes(),B=D.defaultAttributeValues;for(const ne in $){const G=$[ne];if(G.location>=0){let se=z[ne];if(se===void 0&&(ne==="instanceMatrix"&&y.instanceMatrix&&(se=y.instanceMatrix),ne==="instanceColor"&&y.instanceColor&&(se=y.instanceColor)),se!==void 0){const ae=se.normalized,pe=se.itemSize,Le=e.get(se);if(Le===void 0)continue;const Ae=Le.buffer,W=Le.type,ee=Le.bytesPerElement,ie=W===s.INT||W===s.UNSIGNED_INT||se.gpuType===Ed;if(se.isInterleavedBufferAttribute){const te=se.data,Ne=te.stride,qe=se.offset;if(te.isInstancedInterleavedBuffer){for(let V=0;V<G.locationSize;V++)m(G.location+V,te.meshPerAttribute);y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let V=0;V<G.locationSize;V++)p(G.location+V);s.bindBuffer(s.ARRAY_BUFFER,Ae);for(let V=0;V<G.locationSize;V++)x(G.location+V,pe/G.locationSize,W,ae,Ne*ee,(qe+pe/G.locationSize*V)*ee,ie)}else{if(se.isInstancedBufferAttribute){for(let te=0;te<G.locationSize;te++)m(G.location+te,se.meshPerAttribute);y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let te=0;te<G.locationSize;te++)p(G.location+te);s.bindBuffer(s.ARRAY_BUFFER,Ae);for(let te=0;te<G.locationSize;te++)x(G.location+te,pe/G.locationSize,W,ae,pe*ee,pe/G.locationSize*te*ee,ie)}}else if(B!==void 0){const ae=B[ne];if(ae!==void 0)switch(ae.length){case 2:s.vertexAttrib2fv(G.location,ae);break;case 3:s.vertexAttrib3fv(G.location,ae);break;case 4:s.vertexAttrib4fv(G.location,ae);break;default:s.vertexAttrib1fv(G.location,ae)}}}}T()}function I(){U();for(const y in n){const D=n[y];for(const H in D){const k=D[H];for(const z in k)h(k[z].object),delete k[z];delete D[H]}delete n[y]}}function N(y){if(n[y.id]===void 0)return;const D=n[y.id];for(const H in D){const k=D[H];for(const z in k)h(k[z].object),delete k[z];delete D[H]}delete n[y.id]}function C(y){for(const D in n){const H=n[D];if(H[y.id]===void 0)continue;const k=H[y.id];for(const z in k)h(k[z].object),delete k[z];delete H[y.id]}}function U(){M(),o=!0,r!==i&&(r=i,c(r.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:U,resetDefaultState:M,dispose:I,releaseStatesOfGeometry:N,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:p,disableUnusedAttributes:T}}function b0(s,e,t){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let f=0;f<u;f++)this.render(c[f],h[f]);else{d.multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,n,1)}}function l(c,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_];for(let _=0;_<d.length;_++)t.update(g,n,d[_])}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function M0(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const N=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(N){return!(N!==Ln&&n.convert(N)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(N){const C=N===Qo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(N!==Ri&&n.convert(N)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&N!==Bn&&!C)}function l(N){if(N==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_TEXTURE_SIZE),_=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),T=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),E=f>0,I=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:f,maxTextureSize:g,maxCubemapSize:_,maxAttributes:p,maxVertexUniforms:m,maxVaryings:T,maxFragmentUniforms:x,vertexTextures:E,maxSamples:I}}function S0(s){const e=this;let t=null,n=0,i=!1,r=!1;const o=new wn,a=new ut,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,m=s.get(u);if(!i||g===null||g.length===0||r&&!p)r?h(null):c();else{const T=r?0:n,x=T*4;let E=m.clippingState||null;l.value=E,E=h(g,d,x,f);for(let I=0;I!==x;++I)E[I]=t[I];m.clippingState=E,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const m=f+_*4,T=d.matrixWorldInverse;a.getNormalMatrix(T),(p===null||p.length<m)&&(p=new Float32Array(m));for(let x=0,E=f;x!==_;++x,E+=4)o.copy(u[x]).applyMatrix4(T,a),o.normal.toArray(p,E),p[E+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function E0(s){let e=new WeakMap;function t(o,a){return a===Ml?o.mapping=Gs:a===Sl&&(o.mapping=Ws),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ml||a===Sl)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Um(l.height);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class na extends Hd{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ns=4,Bh=[.125,.215,.35,.446,.526,.582],$i=20,Wa=new na,zh=new Xe;let ja=null,Xa=0,qa=0,$a=!1;const Wi=(1+Math.sqrt(5))/2,Ls=1/Wi,Hh=[new F(-Wi,Ls,0),new F(Wi,Ls,0),new F(-Ls,0,Wi),new F(Ls,0,Wi),new F(0,Wi,-Ls),new F(0,Wi,Ls),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)];class Vh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){ja=this._renderer.getRenderTarget(),Xa=this._renderer.getActiveCubeFace(),qa=this._renderer.getActiveMipmapLevel(),$a=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=jh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ja,Xa,qa),this._renderer.xr.enabled=$a,e.scissorTest=!1,yo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Gs||e.mapping===Ws?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ja=this._renderer.getRenderTarget(),Xa=this._renderer.getActiveCubeFace(),qa=this._renderer.getActiveMipmapLevel(),$a=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Jt,minFilter:Jt,generateMipmaps:!1,type:Qo,format:Ln,colorSpace:Yt,depthBuffer:!1},i=Gh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gh(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=T0(r)),this._blurMaterial=w0(r,e,t)}return i}_compileMaterial(e){const t=new kt(this._lodPlanes[0],e);this._renderer.compile(t,Wa)}_sceneToCubeUV(e,t,n,i){const a=new $t(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(zh),h.toneMapping=wi,h.autoClear=!1;const f=new zn({name:"PMREM.Background",side:ln,depthWrite:!1,depthTest:!1}),g=new kt(new Zs,f);let _=!1;const p=e.background;p?p.isColor&&(f.color.copy(p),e.background=null,_=!0):(f.color.copy(zh),_=!0);for(let m=0;m<6;m++){const T=m%3;T===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):T===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));const x=this._cubeSize;yo(i,T*x,m>2?x:0,x,x),h.setRenderTarget(i),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Gs||e.mapping===Ws;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=jh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wh());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new kt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;yo(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Wa)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Hh[(i-r-1)%Hh.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new kt(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*$i-1),_=r/g,p=isFinite(r)?1+Math.floor(h*_):$i;p>$i&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${$i}`);const m=[];let T=0;for(let C=0;C<$i;++C){const U=C/_,M=Math.exp(-U*U/2);m.push(M),C===0?T+=M:C<p&&(T+=2*M)}for(let C=0;C<m.length;C++)m[C]=m[C]/T;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=m,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=g,d.mipInt.value=x-n;const E=this._sizeLods[i],I=3*E*(i>x-Ns?i-x+Ns:0),N=4*(this._cubeSize-E);yo(t,I,N,3*E,2*E),l.setRenderTarget(t),l.render(u,Wa)}}function T0(s){const e=[],t=[],n=[];let i=s;const r=s-Ns+1+Bh.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>s-Ns?l=Bh[o-s+Ns-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,p=2,m=1,T=new Float32Array(_*g*f),x=new Float32Array(p*g*f),E=new Float32Array(m*g*f);for(let N=0;N<f;N++){const C=N%3*2/3-1,U=N>2?0:-1,M=[C,U,0,C+2/3,U,0,C+2/3,U+1,0,C,U,0,C+2/3,U+1,0,C,U+1,0];T.set(M,_*g*N),x.set(d,p*g*N);const y=[N,N,N,N,N,N];E.set(y,m*g*N)}const I=new Xt;I.setAttribute("position",new It(T,_)),I.setAttribute("uv",new It(x,p)),I.setAttribute("faceIndex",new It(E,m)),e.push(I),i>Ns&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Gh(s,e,t){const n=new ts(s,e,t);return n.texture.mapping=Jo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function yo(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function w0(s,e,t){const n=new Float32Array($i),i=new F(0,1,0);return new Li({name:"SphericalGaussianBlur",defines:{n:$i,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ql(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ti,depthTest:!1,depthWrite:!1})}function Wh(){return new Li({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ql(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ti,depthTest:!1,depthWrite:!1})}function jh(){return new Li({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ql(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ti,depthTest:!1,depthWrite:!1})}function ql(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function A0(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ml||l===Sl,h=l===Gs||l===Ws;if(c||h){let u=e.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Vh(s)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new Vh(s)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function C0(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function R0(s,e,t,n){const i={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)e.remove(_[p])}d.removeEventListener("dispose",o),delete i[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)e.update(d[g],s.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const _=f[g];for(let p=0,m=_.length;p<m;p++)e.update(_[p],s.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const T=f.array;_=f.version;for(let x=0,E=T.length;x<E;x+=3){const I=T[x+0],N=T[x+1],C=T[x+2];d.push(I,N,N,C,C,I)}}else if(g!==void 0){const T=g.array;_=g.version;for(let x=0,E=T.length/3-1;x<E;x+=3){const I=x+0,N=x+1,C=x+2;d.push(I,N,N,C,C,I)}}else return;const p=new(Id(d)?Bd:kd)(d,1);p.version=_;const m=r.get(u);m&&e.remove(m),r.set(u,p)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function L0(s,e,t){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*o),t.update(f,n,1)}function c(d,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,d*o,g),t.update(f,n,g))}function h(d,f,g){if(g===0)return;const _=e.get("WEBGL_multi_draw");if(_===null)for(let p=0;p<g;p++)this.render(d[p]/o,f[p]);else{_.multiDrawElementsWEBGL(n,f,0,r,d,0,g);let p=0;for(let m=0;m<g;m++)p+=f[m];t.update(p,n,1)}}function u(d,f,g,_){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<d.length;m++)c(d[m]/o,f[m],_[m]);else{p.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let m=0;for(let T=0;T<g;T++)m+=f[T];for(let T=0;T<_.length;T++)t.update(m,n,_[T])}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function P0(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function N0(s,e,t){const n=new WeakMap,i=new wt;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let M=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",M)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],T=a.morphAttributes.color||[];let x=0;f===!0&&(x=1),g===!0&&(x=2),_===!0&&(x=3);let E=a.attributes.position.count*x,I=1;E>e.maxTextureSize&&(I=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const N=new Float32Array(E*I*4*u),C=new Od(N,E,I,u);C.type=Bn,C.needsUpdate=!0;const U=x*4;for(let y=0;y<u;y++){const D=p[y],H=m[y],k=T[y],z=E*I*4*y;for(let $=0;$<D.count;$++){const B=$*U;f===!0&&(i.fromBufferAttribute(D,$),N[z+B+0]=i.x,N[z+B+1]=i.y,N[z+B+2]=i.z,N[z+B+3]=0),g===!0&&(i.fromBufferAttribute(H,$),N[z+B+4]=i.x,N[z+B+5]=i.y,N[z+B+6]=i.z,N[z+B+7]=0),_===!0&&(i.fromBufferAttribute(k,$),N[z+B+8]=i.x,N[z+B+9]=i.y,N[z+B+10]=i.z,N[z+B+11]=k.itemSize===4?i.w:1)}}d={count:u,texture:C,size:new _e(E,I)},n.set(a,d),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function I0(s,e,t,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class Wd extends Ht{constructor(e,t,n,i,r,o,a,l,c,h){if(h=h!==void 0?h:zs,h!==zs&&h!==Cr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===zs&&(n=js),n===void 0&&h===Cr&&(n=Br),super(null,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:sn,this.minFilter=l!==void 0?l:sn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const jd=new Ht,Xd=new Wd(1,1);Xd.compareFunction=Nd;const qd=new Od,$d=new vm,Yd=new Vd,Xh=[],qh=[],$h=new Float32Array(16),Yh=new Float32Array(9),Kh=new Float32Array(4);function Js(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=Xh[i];if(r===void 0&&(r=new Float32Array(i),Xh[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function Vt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Gt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function ia(s,e){let t=qh[e];t===void 0&&(t=new Int32Array(e),qh[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function D0(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function U0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;s.uniform2fv(this.addr,e),Gt(t,e)}}function O0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Vt(t,e))return;s.uniform3fv(this.addr,e),Gt(t,e)}}function F0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;s.uniform4fv(this.addr,e),Gt(t,e)}}function k0(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,n))return;Kh.set(n),s.uniformMatrix2fv(this.addr,!1,Kh),Gt(t,n)}}function B0(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,n))return;Yh.set(n),s.uniformMatrix3fv(this.addr,!1,Yh),Gt(t,n)}}function z0(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,n))return;$h.set(n),s.uniformMatrix4fv(this.addr,!1,$h),Gt(t,n)}}function H0(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function V0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;s.uniform2iv(this.addr,e),Gt(t,e)}}function G0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;s.uniform3iv(this.addr,e),Gt(t,e)}}function W0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;s.uniform4iv(this.addr,e),Gt(t,e)}}function j0(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function X0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;s.uniform2uiv(this.addr,e),Gt(t,e)}}function q0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;s.uniform3uiv(this.addr,e),Gt(t,e)}}function $0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;s.uniform4uiv(this.addr,e),Gt(t,e)}}function Y0(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);const r=this.type===s.SAMPLER_2D_SHADOW?Xd:jd;t.setTexture2D(e||r,i)}function K0(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||$d,i)}function Z0(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Yd,i)}function J0(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||qd,i)}function Q0(s){switch(s){case 5126:return D0;case 35664:return U0;case 35665:return O0;case 35666:return F0;case 35674:return k0;case 35675:return B0;case 35676:return z0;case 5124:case 35670:return H0;case 35667:case 35671:return V0;case 35668:case 35672:return G0;case 35669:case 35673:return W0;case 5125:return j0;case 36294:return X0;case 36295:return q0;case 36296:return $0;case 35678:case 36198:case 36298:case 36306:case 35682:return Y0;case 35679:case 36299:case 36307:return K0;case 35680:case 36300:case 36308:case 36293:return Z0;case 36289:case 36303:case 36311:case 36292:return J0}}function ey(s,e){s.uniform1fv(this.addr,e)}function ty(s,e){const t=Js(e,this.size,2);s.uniform2fv(this.addr,t)}function ny(s,e){const t=Js(e,this.size,3);s.uniform3fv(this.addr,t)}function iy(s,e){const t=Js(e,this.size,4);s.uniform4fv(this.addr,t)}function sy(s,e){const t=Js(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function ry(s,e){const t=Js(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function oy(s,e){const t=Js(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function ay(s,e){s.uniform1iv(this.addr,e)}function ly(s,e){s.uniform2iv(this.addr,e)}function cy(s,e){s.uniform3iv(this.addr,e)}function hy(s,e){s.uniform4iv(this.addr,e)}function uy(s,e){s.uniform1uiv(this.addr,e)}function dy(s,e){s.uniform2uiv(this.addr,e)}function fy(s,e){s.uniform3uiv(this.addr,e)}function py(s,e){s.uniform4uiv(this.addr,e)}function my(s,e,t){const n=this.cache,i=e.length,r=ia(t,i);Vt(n,r)||(s.uniform1iv(this.addr,r),Gt(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||jd,r[o])}function gy(s,e,t){const n=this.cache,i=e.length,r=ia(t,i);Vt(n,r)||(s.uniform1iv(this.addr,r),Gt(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||$d,r[o])}function _y(s,e,t){const n=this.cache,i=e.length,r=ia(t,i);Vt(n,r)||(s.uniform1iv(this.addr,r),Gt(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Yd,r[o])}function yy(s,e,t){const n=this.cache,i=e.length,r=ia(t,i);Vt(n,r)||(s.uniform1iv(this.addr,r),Gt(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||qd,r[o])}function vy(s){switch(s){case 5126:return ey;case 35664:return ty;case 35665:return ny;case 35666:return iy;case 35674:return sy;case 35675:return ry;case 35676:return oy;case 5124:case 35670:return ay;case 35667:case 35671:return ly;case 35668:case 35672:return cy;case 35669:case 35673:return hy;case 5125:return uy;case 36294:return dy;case 36295:return fy;case 36296:return py;case 35678:case 36198:case 36298:case 36306:case 35682:return my;case 35679:case 36299:case 36307:return gy;case 35680:case 36300:case 36308:case 36293:return _y;case 36289:case 36303:case 36311:case 36292:return yy}}class xy{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Q0(t.type)}}class by{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=vy(t.type)}}class My{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(e,t[a.id],n)}}}const Ya=/(\w+)(\])?(\[|\.)?/g;function Zh(s,e){s.seq.push(e),s.map[e.id]=e}function Sy(s,e,t){const n=s.name,i=n.length;for(Ya.lastIndex=0;;){const r=Ya.exec(n),o=Ya.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Zh(t,c===void 0?new xy(a,s,e):new by(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new My(a),Zh(t,u)),t=u}}}class ko{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);Sy(r,o,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Jh(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const Ey=37297;let Ty=0;function wy(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function Ay(s){const e=xt.getPrimaries(xt.workingColorSpace),t=xt.getPrimaries(s);let n;switch(e===t?n="":e===jo&&t===Wo?n="LinearDisplayP3ToLinearSRGB":e===Wo&&t===jo&&(n="LinearSRGBToLinearDisplayP3"),s){case Yt:case ta:return[n,"LinearTransferOETF"];case Ot:case Gl:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function Qh(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+wy(s.getShaderSource(e),o)}else return i}function Cy(s,e){const t=Ay(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Ry(s,e){let t;switch(e){case Mp:t="Linear";break;case Sp:t="Reinhard";break;case Ep:t="OptimizedCineon";break;case Tp:t="ACESFilmic";break;case Ap:t="AgX";break;case Cp:t="Neutral";break;case wp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Ly(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(yr).join(`
`)}function Py(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ny(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function yr(s){return s!==""}function eu(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function tu(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Iy=/^[ \t]*#include +<([\w\d./]+)>/gm;function wl(s){return s.replace(Iy,Uy)}const Dy=new Map;function Uy(s,e){let t=ht[e];if(t===void 0){const n=Dy.get(e);if(n!==void 0)t=ht[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return wl(t)}const Oy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function nu(s){return s.replace(Oy,Fy)}function Fy(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function iu(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function ky(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===vd?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===xd?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===ni&&(e="SHADOWMAP_TYPE_VSM"),e}function By(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Gs:case Ws:e="ENVMAP_TYPE_CUBE";break;case Jo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function zy(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Ws:e="ENVMAP_MODE_REFRACTION";break}return e}function Hy(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Zo:e="ENVMAP_BLENDING_MULTIPLY";break;case xp:e="ENVMAP_BLENDING_MIX";break;case bp:e="ENVMAP_BLENDING_ADD";break}return e}function Vy(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Gy(s,e,t,n){const i=s.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=ky(t),c=By(t),h=zy(t),u=Hy(t),d=Vy(t),f=Ly(t),g=Py(r),_=i.createProgram();let p,m,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(yr).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(yr).join(`
`),m.length>0&&(m+=`
`)):(p=[iu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(yr).join(`
`),m=[iu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==wi?"#define TONE_MAPPING":"",t.toneMapping!==wi?ht.tonemapping_pars_fragment:"",t.toneMapping!==wi?Ry("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,Cy("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(yr).join(`
`)),o=wl(o),o=eu(o,t),o=tu(o,t),a=wl(a),a=eu(a,t),a=tu(a,t),o=nu(o),a=nu(a),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===yh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===yh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=T+p+o,E=T+m+a,I=Jh(i,i.VERTEX_SHADER,x),N=Jh(i,i.FRAGMENT_SHADER,E);i.attachShader(_,I),i.attachShader(_,N),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function C(D){if(s.debug.checkShaderErrors){const H=i.getProgramInfoLog(_).trim(),k=i.getShaderInfoLog(I).trim(),z=i.getShaderInfoLog(N).trim();let $=!0,B=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if($=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,I,N);else{const ne=Qh(i,I,"vertex"),G=Qh(i,N,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+H+`
`+ne+`
`+G)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(k===""||z==="")&&(B=!1);B&&(D.diagnostics={runnable:$,programLog:H,vertexShader:{log:k,prefix:p},fragmentShader:{log:z,prefix:m}})}i.deleteShader(I),i.deleteShader(N),U=new ko(i,_),M=Ny(i,_)}let U;this.getUniforms=function(){return U===void 0&&C(this),U};let M;this.getAttributes=function(){return M===void 0&&C(this),M};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(_,Ey)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ty++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=I,this.fragmentShader=N,this}let Wy=0;class jy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Xy(e),t.set(e,n)),n}}class Xy{constructor(e){this.id=Wy++,this.code=e,this.usedTimes=0}}function qy(s,e,t,n,i,r,o){const a=new jl,l=new jy,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return c.add(M),M===0?"uv":`uv${M}`}function p(M,y,D,H,k){const z=H.fog,$=k.geometry,B=M.isMeshStandardMaterial?H.environment:null,ne=(M.isMeshStandardMaterial?t:e).get(M.envMap||B),G=ne&&ne.mapping===Jo?ne.image.height:null,se=g[M.type];M.precision!==null&&(f=i.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const ae=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,pe=ae!==void 0?ae.length:0;let Le=0;$.morphAttributes.position!==void 0&&(Le=1),$.morphAttributes.normal!==void 0&&(Le=2),$.morphAttributes.color!==void 0&&(Le=3);let Ae,W,ee,ie;if(se){const ft=Un[se];Ae=ft.vertexShader,W=ft.fragmentShader}else Ae=M.vertexShader,W=M.fragmentShader,l.update(M),ee=l.getVertexShaderID(M),ie=l.getFragmentShaderID(M);const te=s.getRenderTarget(),Ne=k.isInstancedMesh===!0,qe=k.isBatchedMesh===!0,V=!!M.map,at=!!M.matcap,re=!!ne,ge=!!M.aoMap,ce=!!M.lightMap,ve=!!M.bumpMap,fe=!!M.normalMap,Pe=!!M.displacementMap,We=!!M.emissiveMap,O=!!M.metalnessMap,A=!!M.roughnessMap,q=M.anisotropy>0,le=M.clearcoat>0,ue=M.dispersion>0,he=M.iridescence>0,He=M.sheen>0,Ee=M.transmission>0,Me=q&&!!M.anisotropyMap,Qe=le&&!!M.clearcoatMap,ye=le&&!!M.clearcoatNormalMap,Be=le&&!!M.clearcoatRoughnessMap,rt=he&&!!M.iridescenceMap,Ye=he&&!!M.iridescenceThicknessMap,Ie=He&&!!M.sheenColorMap,nt=He&&!!M.sheenRoughnessMap,lt=!!M.specularMap,vt=!!M.specularColorMap,st=!!M.specularIntensityMap,S=Ee&&!!M.transmissionMap,j=Ee&&!!M.thicknessMap,Y=!!M.gradientMap,de=!!M.alphaMap,xe=M.alphaTest>0,it=!!M.alphaHash,ct=!!M.extensions;let Ct=wi;M.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Ct=s.toneMapping);const Ut={shaderID:se,shaderType:M.type,shaderName:M.name,vertexShader:Ae,fragmentShader:W,defines:M.defines,customVertexShaderID:ee,customFragmentShaderID:ie,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:qe,instancing:Ne,instancingColor:Ne&&k.instanceColor!==null,instancingMorph:Ne&&k.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:te===null?s.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:Yt,alphaToCoverage:!!M.alphaToCoverage,map:V,matcap:at,envMap:re,envMapMode:re&&ne.mapping,envMapCubeUVHeight:G,aoMap:ge,lightMap:ce,bumpMap:ve,normalMap:fe,displacementMap:d&&Pe,emissiveMap:We,normalMapObjectSpace:fe&&M.normalMapType===Gp,normalMapTangentSpace:fe&&M.normalMapType===ea,metalnessMap:O,roughnessMap:A,anisotropy:q,anisotropyMap:Me,clearcoat:le,clearcoatMap:Qe,clearcoatNormalMap:ye,clearcoatRoughnessMap:Be,dispersion:ue,iridescence:he,iridescenceMap:rt,iridescenceThicknessMap:Ye,sheen:He,sheenColorMap:Ie,sheenRoughnessMap:nt,specularMap:lt,specularColorMap:vt,specularIntensityMap:st,transmission:Ee,transmissionMap:S,thicknessMap:j,gradientMap:Y,opaque:M.transparent===!1&&M.blending===Bs&&M.alphaToCoverage===!1,alphaMap:de,alphaTest:xe,alphaHash:it,combine:M.combine,mapUv:V&&_(M.map.channel),aoMapUv:ge&&_(M.aoMap.channel),lightMapUv:ce&&_(M.lightMap.channel),bumpMapUv:ve&&_(M.bumpMap.channel),normalMapUv:fe&&_(M.normalMap.channel),displacementMapUv:Pe&&_(M.displacementMap.channel),emissiveMapUv:We&&_(M.emissiveMap.channel),metalnessMapUv:O&&_(M.metalnessMap.channel),roughnessMapUv:A&&_(M.roughnessMap.channel),anisotropyMapUv:Me&&_(M.anisotropyMap.channel),clearcoatMapUv:Qe&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:ye&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Be&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:rt&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:Ye&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:Ie&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:nt&&_(M.sheenRoughnessMap.channel),specularMapUv:lt&&_(M.specularMap.channel),specularColorMapUv:vt&&_(M.specularColorMap.channel),specularIntensityMapUv:st&&_(M.specularIntensityMap.channel),transmissionMapUv:S&&_(M.transmissionMap.channel),thicknessMapUv:j&&_(M.thicknessMap.channel),alphaMapUv:de&&_(M.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(fe||q),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!$.attributes.uv&&(V||de),fog:!!z,useFog:M.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:k.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:pe,morphTextureStride:Le,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&D.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ct,useLegacyLights:s._useLegacyLights,decodeVideoTexture:V&&M.map.isVideoTexture===!0&&xt.getTransfer(M.map.colorSpace)===Rt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===yn,flipSided:M.side===ln,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:ct&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:ct&&M.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Ut.vertexUv1s=c.has(1),Ut.vertexUv2s=c.has(2),Ut.vertexUv3s=c.has(3),c.clear(),Ut}function m(M){const y=[];if(M.shaderID?y.push(M.shaderID):(y.push(M.customVertexShaderID),y.push(M.customFragmentShaderID)),M.defines!==void 0)for(const D in M.defines)y.push(D),y.push(M.defines[D]);return M.isRawShaderMaterial===!1&&(T(y,M),x(y,M),y.push(s.outputColorSpace)),y.push(M.customProgramCacheKey),y.join()}function T(M,y){M.push(y.precision),M.push(y.outputColorSpace),M.push(y.envMapMode),M.push(y.envMapCubeUVHeight),M.push(y.mapUv),M.push(y.alphaMapUv),M.push(y.lightMapUv),M.push(y.aoMapUv),M.push(y.bumpMapUv),M.push(y.normalMapUv),M.push(y.displacementMapUv),M.push(y.emissiveMapUv),M.push(y.metalnessMapUv),M.push(y.roughnessMapUv),M.push(y.anisotropyMapUv),M.push(y.clearcoatMapUv),M.push(y.clearcoatNormalMapUv),M.push(y.clearcoatRoughnessMapUv),M.push(y.iridescenceMapUv),M.push(y.iridescenceThicknessMapUv),M.push(y.sheenColorMapUv),M.push(y.sheenRoughnessMapUv),M.push(y.specularMapUv),M.push(y.specularColorMapUv),M.push(y.specularIntensityMapUv),M.push(y.transmissionMapUv),M.push(y.thicknessMapUv),M.push(y.combine),M.push(y.fogExp2),M.push(y.sizeAttenuation),M.push(y.morphTargetsCount),M.push(y.morphAttributeCount),M.push(y.numDirLights),M.push(y.numPointLights),M.push(y.numSpotLights),M.push(y.numSpotLightMaps),M.push(y.numHemiLights),M.push(y.numRectAreaLights),M.push(y.numDirLightShadows),M.push(y.numPointLightShadows),M.push(y.numSpotLightShadows),M.push(y.numSpotLightShadowsWithMaps),M.push(y.numLightProbes),M.push(y.shadowMapType),M.push(y.toneMapping),M.push(y.numClippingPlanes),M.push(y.numClipIntersection),M.push(y.depthPacking)}function x(M,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),M.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.skinning&&a.enable(4),y.morphTargets&&a.enable(5),y.morphNormals&&a.enable(6),y.morphColors&&a.enable(7),y.premultipliedAlpha&&a.enable(8),y.shadowMapEnabled&&a.enable(9),y.useLegacyLights&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.alphaToCoverage&&a.enable(20),M.push(a.mask)}function E(M){const y=g[M.type];let D;if(y){const H=Un[y];D=Pm.clone(H.uniforms)}else D=M.uniforms;return D}function I(M,y){let D;for(let H=0,k=h.length;H<k;H++){const z=h[H];if(z.cacheKey===y){D=z,++D.usedTimes;break}}return D===void 0&&(D=new Gy(s,y,M,r),h.push(D)),D}function N(M){if(--M.usedTimes===0){const y=h.indexOf(M);h[y]=h[h.length-1],h.pop(),M.destroy()}}function C(M){l.remove(M)}function U(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:E,acquireProgram:I,releaseProgram:N,releaseShaderCache:C,programs:h,dispose:U}}function $y(){let s=new WeakMap;function e(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function t(r){s.delete(r)}function n(r,o,a){s.get(r)[o]=a}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function Yy(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function su(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function ru(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,f,g,_,p){let m=s[e];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:p},s[e]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=g,m.renderOrder=u.renderOrder,m.z=_,m.group=p),e++,m}function a(u,d,f,g,_,p){const m=o(u,d,f,g,_,p);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):t.push(m)}function l(u,d,f,g,_,p){const m=o(u,d,f,g,_,p);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):t.unshift(m)}function c(u,d){t.length>1&&t.sort(u||Yy),n.length>1&&n.sort(d||su),i.length>1&&i.sort(d||su)}function h(){for(let u=e,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function Ky(){let s=new WeakMap;function e(n,i){const r=s.get(n);let o;return r===void 0?(o=new ru,s.set(n,[o])):i>=r.length?(o=new ru,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function Zy(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new Xe};break;case"SpotLight":t={position:new F,direction:new F,color:new Xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new Xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new Xe,groundColor:new Xe};break;case"RectAreaLight":t={color:new Xe,position:new F,halfWidth:new F,halfHeight:new F};break}return s[e.id]=t,t}}}function Jy(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _e};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _e};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _e,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Qy=0;function ev(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function tv(s){const e=new Zy,t=Jy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new F);const i=new F,r=new $e,o=new $e;function a(c,h){let u=0,d=0,f=0;for(let D=0;D<9;D++)n.probe[D].set(0,0,0);let g=0,_=0,p=0,m=0,T=0,x=0,E=0,I=0,N=0,C=0,U=0;c.sort(ev);const M=h===!0?Math.PI:1;for(let D=0,H=c.length;D<H;D++){const k=c[D],z=k.color,$=k.intensity,B=k.distance,ne=k.shadow&&k.shadow.map?k.shadow.map.texture:null;if(k.isAmbientLight)u+=z.r*$*M,d+=z.g*$*M,f+=z.b*$*M;else if(k.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(k.sh.coefficients[G],$);U++}else if(k.isDirectionalLight){const G=e.get(k);if(G.color.copy(k.color).multiplyScalar(k.intensity*M),k.castShadow){const se=k.shadow,ae=t.get(k);ae.shadowBias=se.bias,ae.shadowNormalBias=se.normalBias,ae.shadowRadius=se.radius,ae.shadowMapSize=se.mapSize,n.directionalShadow[g]=ae,n.directionalShadowMap[g]=ne,n.directionalShadowMatrix[g]=k.shadow.matrix,x++}n.directional[g]=G,g++}else if(k.isSpotLight){const G=e.get(k);G.position.setFromMatrixPosition(k.matrixWorld),G.color.copy(z).multiplyScalar($*M),G.distance=B,G.coneCos=Math.cos(k.angle),G.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),G.decay=k.decay,n.spot[p]=G;const se=k.shadow;if(k.map&&(n.spotLightMap[N]=k.map,N++,se.updateMatrices(k),k.castShadow&&C++),n.spotLightMatrix[p]=se.matrix,k.castShadow){const ae=t.get(k);ae.shadowBias=se.bias,ae.shadowNormalBias=se.normalBias,ae.shadowRadius=se.radius,ae.shadowMapSize=se.mapSize,n.spotShadow[p]=ae,n.spotShadowMap[p]=ne,I++}p++}else if(k.isRectAreaLight){const G=e.get(k);G.color.copy(z).multiplyScalar($),G.halfWidth.set(k.width*.5,0,0),G.halfHeight.set(0,k.height*.5,0),n.rectArea[m]=G,m++}else if(k.isPointLight){const G=e.get(k);if(G.color.copy(k.color).multiplyScalar(k.intensity*M),G.distance=k.distance,G.decay=k.decay,k.castShadow){const se=k.shadow,ae=t.get(k);ae.shadowBias=se.bias,ae.shadowNormalBias=se.normalBias,ae.shadowRadius=se.radius,ae.shadowMapSize=se.mapSize,ae.shadowCameraNear=se.camera.near,ae.shadowCameraFar=se.camera.far,n.pointShadow[_]=ae,n.pointShadowMap[_]=ne,n.pointShadowMatrix[_]=k.shadow.matrix,E++}n.point[_]=G,_++}else if(k.isHemisphereLight){const G=e.get(k);G.skyColor.copy(k.color).multiplyScalar($*M),G.groundColor.copy(k.groundColor).multiplyScalar($*M),n.hemi[T]=G,T++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=we.LTC_FLOAT_1,n.rectAreaLTC2=we.LTC_FLOAT_2):(n.rectAreaLTC1=we.LTC_HALF_1,n.rectAreaLTC2=we.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const y=n.hash;(y.directionalLength!==g||y.pointLength!==_||y.spotLength!==p||y.rectAreaLength!==m||y.hemiLength!==T||y.numDirectionalShadows!==x||y.numPointShadows!==E||y.numSpotShadows!==I||y.numSpotMaps!==N||y.numLightProbes!==U)&&(n.directional.length=g,n.spot.length=p,n.rectArea.length=m,n.point.length=_,n.hemi.length=T,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=I,n.spotShadowMap.length=I,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=I+N-C,n.spotLightMap.length=N,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=U,y.directionalLength=g,y.pointLength=_,y.spotLength=p,y.rectAreaLength=m,y.hemiLength=T,y.numDirectionalShadows=x,y.numPointShadows=E,y.numSpotShadows=I,y.numSpotMaps=N,y.numLightProbes=U,n.version=Qy++)}function l(c,h){let u=0,d=0,f=0,g=0,_=0;const p=h.matrixWorldInverse;for(let m=0,T=c.length;m<T;m++){const x=c[m];if(x.isDirectionalLight){const E=n.directional[u];E.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),E.direction.sub(i),E.direction.transformDirection(p),u++}else if(x.isSpotLight){const E=n.spot[f];E.position.setFromMatrixPosition(x.matrixWorld),E.position.applyMatrix4(p),E.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),E.direction.sub(i),E.direction.transformDirection(p),f++}else if(x.isRectAreaLight){const E=n.rectArea[g];E.position.setFromMatrixPosition(x.matrixWorld),E.position.applyMatrix4(p),o.identity(),r.copy(x.matrixWorld),r.premultiply(p),o.extractRotation(r),E.halfWidth.set(x.width*.5,0,0),E.halfHeight.set(0,x.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){const E=n.point[d];E.position.setFromMatrixPosition(x.matrixWorld),E.position.applyMatrix4(p),d++}else if(x.isHemisphereLight){const E=n.hemi[_];E.direction.setFromMatrixPosition(x.matrixWorld),E.direction.transformDirection(p),_++}}}return{setup:a,setupView:l,state:n}}function ou(s){const e=new tv(s),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(h){e.setup(t,h)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function nv(s){let e=new WeakMap;function t(i,r=0){const o=e.get(i);let a;return o===void 0?(a=new ou(s),e.set(i,[a])):r>=o.length?(a=new ou(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class iv extends un{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Hp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class sv extends un{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const rv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ov=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function av(s,e,t){let n=new Xl;const i=new _e,r=new _e,o=new wt,a=new iv({depthPacking:Vp}),l=new sv,c={},h=t.maxTextureSize,u={[Hn]:ln,[ln]:Hn,[yn]:yn},d=new Li({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new _e},radius:{value:4}},vertexShader:rv,fragmentShader:ov}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Xt;g.setAttribute("position",new It(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new kt(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vd;let m=this.type;this.render=function(N,C,U){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||N.length===0)return;const M=s.getRenderTarget(),y=s.getActiveCubeFace(),D=s.getActiveMipmapLevel(),H=s.state;H.setBlending(Ti),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const k=m!==ni&&this.type===ni,z=m===ni&&this.type!==ni;for(let $=0,B=N.length;$<B;$++){const ne=N[$],G=ne.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const se=G.getFrameExtents();if(i.multiply(se),r.copy(G.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/se.x),i.x=r.x*se.x,G.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/se.y),i.y=r.y*se.y,G.mapSize.y=r.y)),G.map===null||k===!0||z===!0){const pe=this.type!==ni?{minFilter:sn,magFilter:sn}:{};G.map!==null&&G.map.dispose(),G.map=new ts(i.x,i.y,pe),G.map.texture.name=ne.name+".shadowMap",G.camera.updateProjectionMatrix()}s.setRenderTarget(G.map),s.clear();const ae=G.getViewportCount();for(let pe=0;pe<ae;pe++){const Le=G.getViewport(pe);o.set(r.x*Le.x,r.y*Le.y,r.x*Le.z,r.y*Le.w),H.viewport(o),G.updateMatrices(ne,pe),n=G.getFrustum(),E(C,U,G.camera,ne,this.type)}G.isPointLightShadow!==!0&&this.type===ni&&T(G,U),G.needsUpdate=!1}m=this.type,p.needsUpdate=!1,s.setRenderTarget(M,y,D)};function T(N,C){const U=e.update(_);d.defines.VSM_SAMPLES!==N.blurSamples&&(d.defines.VSM_SAMPLES=N.blurSamples,f.defines.VSM_SAMPLES=N.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),N.mapPass===null&&(N.mapPass=new ts(i.x,i.y)),d.uniforms.shadow_pass.value=N.map.texture,d.uniforms.resolution.value=N.mapSize,d.uniforms.radius.value=N.radius,s.setRenderTarget(N.mapPass),s.clear(),s.renderBufferDirect(C,null,U,d,_,null),f.uniforms.shadow_pass.value=N.mapPass.texture,f.uniforms.resolution.value=N.mapSize,f.uniforms.radius.value=N.radius,s.setRenderTarget(N.map),s.clear(),s.renderBufferDirect(C,null,U,f,_,null)}function x(N,C,U,M){let y=null;const D=U.isPointLight===!0?N.customDistanceMaterial:N.customDepthMaterial;if(D!==void 0)y=D;else if(y=U.isPointLight===!0?l:a,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const H=y.uuid,k=C.uuid;let z=c[H];z===void 0&&(z={},c[H]=z);let $=z[k];$===void 0&&($=y.clone(),z[k]=$,C.addEventListener("dispose",I)),y=$}if(y.visible=C.visible,y.wireframe=C.wireframe,M===ni?y.side=C.shadowSide!==null?C.shadowSide:C.side:y.side=C.shadowSide!==null?C.shadowSide:u[C.side],y.alphaMap=C.alphaMap,y.alphaTest=C.alphaTest,y.map=C.map,y.clipShadows=C.clipShadows,y.clippingPlanes=C.clippingPlanes,y.clipIntersection=C.clipIntersection,y.displacementMap=C.displacementMap,y.displacementScale=C.displacementScale,y.displacementBias=C.displacementBias,y.wireframeLinewidth=C.wireframeLinewidth,y.linewidth=C.linewidth,U.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const H=s.properties.get(y);H.light=U}return y}function E(N,C,U,M,y){if(N.visible===!1)return;if(N.layers.test(C.layers)&&(N.isMesh||N.isLine||N.isPoints)&&(N.castShadow||N.receiveShadow&&y===ni)&&(!N.frustumCulled||n.intersectsObject(N))){N.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,N.matrixWorld);const k=e.update(N),z=N.material;if(Array.isArray(z)){const $=k.groups;for(let B=0,ne=$.length;B<ne;B++){const G=$[B],se=z[G.materialIndex];if(se&&se.visible){const ae=x(N,se,M,y);N.onBeforeShadow(s,N,C,U,k,ae,G),s.renderBufferDirect(U,null,k,ae,N,G),N.onAfterShadow(s,N,C,U,k,ae,G)}}}else if(z.visible){const $=x(N,z,M,y);N.onBeforeShadow(s,N,C,U,k,$,null),s.renderBufferDirect(U,null,k,$,N,null),N.onAfterShadow(s,N,C,U,k,$,null)}}const H=N.children;for(let k=0,z=H.length;k<z;k++)E(H[k],C,U,M,y)}function I(N){N.target.removeEventListener("dispose",I);for(const U in c){const M=c[U],y=N.target.uuid;y in M&&(M[y].dispose(),delete M[y])}}}function lv(s){function e(){let S=!1;const j=new wt;let Y=null;const de=new wt(0,0,0,0);return{setMask:function(xe){Y!==xe&&!S&&(s.colorMask(xe,xe,xe,xe),Y=xe)},setLocked:function(xe){S=xe},setClear:function(xe,it,ct,Ct,Ut){Ut===!0&&(xe*=Ct,it*=Ct,ct*=Ct),j.set(xe,it,ct,Ct),de.equals(j)===!1&&(s.clearColor(xe,it,ct,Ct),de.copy(j))},reset:function(){S=!1,Y=null,de.set(-1,0,0,0)}}}function t(){let S=!1,j=null,Y=null,de=null;return{setTest:function(xe){xe?ie(s.DEPTH_TEST):te(s.DEPTH_TEST)},setMask:function(xe){j!==xe&&!S&&(s.depthMask(xe),j=xe)},setFunc:function(xe){if(Y!==xe){switch(xe){case fp:s.depthFunc(s.NEVER);break;case pp:s.depthFunc(s.ALWAYS);break;case mp:s.depthFunc(s.LESS);break;case Ho:s.depthFunc(s.LEQUAL);break;case gp:s.depthFunc(s.EQUAL);break;case _p:s.depthFunc(s.GEQUAL);break;case yp:s.depthFunc(s.GREATER);break;case vp:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Y=xe}},setLocked:function(xe){S=xe},setClear:function(xe){de!==xe&&(s.clearDepth(xe),de=xe)},reset:function(){S=!1,j=null,Y=null,de=null}}}function n(){let S=!1,j=null,Y=null,de=null,xe=null,it=null,ct=null,Ct=null,Ut=null;return{setTest:function(ft){S||(ft?ie(s.STENCIL_TEST):te(s.STENCIL_TEST))},setMask:function(ft){j!==ft&&!S&&(s.stencilMask(ft),j=ft)},setFunc:function(ft,pt,Et){(Y!==ft||de!==pt||xe!==Et)&&(s.stencilFunc(ft,pt,Et),Y=ft,de=pt,xe=Et)},setOp:function(ft,pt,Et){(it!==ft||ct!==pt||Ct!==Et)&&(s.stencilOp(ft,pt,Et),it=ft,ct=pt,Ct=Et)},setLocked:function(ft){S=ft},setClear:function(ft){Ut!==ft&&(s.clearStencil(ft),Ut=ft)},reset:function(){S=!1,j=null,Y=null,de=null,xe=null,it=null,ct=null,Ct=null,Ut=null}}}const i=new e,r=new t,o=new n,a=new WeakMap,l=new WeakMap;let c={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,p=null,m=null,T=null,x=null,E=null,I=null,N=new Xe(0,0,0),C=0,U=!1,M=null,y=null,D=null,H=null,k=null;const z=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,B=0;const ne=s.getParameter(s.VERSION);ne.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(ne)[1]),$=B>=1):ne.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),$=B>=2);let G=null,se={};const ae=s.getParameter(s.SCISSOR_BOX),pe=s.getParameter(s.VIEWPORT),Le=new wt().fromArray(ae),Ae=new wt().fromArray(pe);function W(S,j,Y,de){const xe=new Uint8Array(4),it=s.createTexture();s.bindTexture(S,it),s.texParameteri(S,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(S,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ct=0;ct<Y;ct++)S===s.TEXTURE_3D||S===s.TEXTURE_2D_ARRAY?s.texImage3D(j,0,s.RGBA,1,1,de,0,s.RGBA,s.UNSIGNED_BYTE,xe):s.texImage2D(j+ct,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,xe);return it}const ee={};ee[s.TEXTURE_2D]=W(s.TEXTURE_2D,s.TEXTURE_2D,1),ee[s.TEXTURE_CUBE_MAP]=W(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),ee[s.TEXTURE_2D_ARRAY]=W(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ee[s.TEXTURE_3D]=W(s.TEXTURE_3D,s.TEXTURE_3D,1,1),i.setClear(0,0,0,1),r.setClear(1),o.setClear(0),ie(s.DEPTH_TEST),r.setFunc(Ho),ve(!1),fe(Fc),ie(s.CULL_FACE),ge(Ti);function ie(S){c[S]!==!0&&(s.enable(S),c[S]=!0)}function te(S){c[S]!==!1&&(s.disable(S),c[S]=!1)}function Ne(S,j){return h[S]!==j?(s.bindFramebuffer(S,j),h[S]=j,S===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=j),S===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=j),!0):!1}function qe(S,j){let Y=d,de=!1;if(S){Y=u.get(j),Y===void 0&&(Y=[],u.set(j,Y));const xe=S.textures;if(Y.length!==xe.length||Y[0]!==s.COLOR_ATTACHMENT0){for(let it=0,ct=xe.length;it<ct;it++)Y[it]=s.COLOR_ATTACHMENT0+it;Y.length=xe.length,de=!0}}else Y[0]!==s.BACK&&(Y[0]=s.BACK,de=!0);de&&s.drawBuffers(Y)}function V(S){return f!==S?(s.useProgram(S),f=S,!0):!1}const at={[Xi]:s.FUNC_ADD,[Kf]:s.FUNC_SUBTRACT,[Zf]:s.FUNC_REVERSE_SUBTRACT};at[Jf]=s.MIN,at[Qf]=s.MAX;const re={[ep]:s.ZERO,[tp]:s.ONE,[np]:s.SRC_COLOR,[xl]:s.SRC_ALPHA,[lp]:s.SRC_ALPHA_SATURATE,[op]:s.DST_COLOR,[sp]:s.DST_ALPHA,[ip]:s.ONE_MINUS_SRC_COLOR,[bl]:s.ONE_MINUS_SRC_ALPHA,[ap]:s.ONE_MINUS_DST_COLOR,[rp]:s.ONE_MINUS_DST_ALPHA,[cp]:s.CONSTANT_COLOR,[hp]:s.ONE_MINUS_CONSTANT_COLOR,[up]:s.CONSTANT_ALPHA,[dp]:s.ONE_MINUS_CONSTANT_ALPHA};function ge(S,j,Y,de,xe,it,ct,Ct,Ut,ft){if(S===Ti){g===!0&&(te(s.BLEND),g=!1);return}if(g===!1&&(ie(s.BLEND),g=!0),S!==Yf){if(S!==_||ft!==U){if((p!==Xi||x!==Xi)&&(s.blendEquation(s.FUNC_ADD),p=Xi,x=Xi),ft)switch(S){case Bs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case kc:s.blendFunc(s.ONE,s.ONE);break;case Bc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case zc:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",S);break}else switch(S){case Bs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case kc:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Bc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case zc:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",S);break}m=null,T=null,E=null,I=null,N.set(0,0,0),C=0,_=S,U=ft}return}xe=xe||j,it=it||Y,ct=ct||de,(j!==p||xe!==x)&&(s.blendEquationSeparate(at[j],at[xe]),p=j,x=xe),(Y!==m||de!==T||it!==E||ct!==I)&&(s.blendFuncSeparate(re[Y],re[de],re[it],re[ct]),m=Y,T=de,E=it,I=ct),(Ct.equals(N)===!1||Ut!==C)&&(s.blendColor(Ct.r,Ct.g,Ct.b,Ut),N.copy(Ct),C=Ut),_=S,U=!1}function ce(S,j){S.side===yn?te(s.CULL_FACE):ie(s.CULL_FACE);let Y=S.side===ln;j&&(Y=!Y),ve(Y),S.blending===Bs&&S.transparent===!1?ge(Ti):ge(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),r.setFunc(S.depthFunc),r.setTest(S.depthTest),r.setMask(S.depthWrite),i.setMask(S.colorWrite);const de=S.stencilWrite;o.setTest(de),de&&(o.setMask(S.stencilWriteMask),o.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),o.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass)),We(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?ie(s.SAMPLE_ALPHA_TO_COVERAGE):te(s.SAMPLE_ALPHA_TO_COVERAGE)}function ve(S){M!==S&&(S?s.frontFace(s.CW):s.frontFace(s.CCW),M=S)}function fe(S){S!==qf?(ie(s.CULL_FACE),S!==y&&(S===Fc?s.cullFace(s.BACK):S===$f?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):te(s.CULL_FACE),y=S}function Pe(S){S!==D&&($&&s.lineWidth(S),D=S)}function We(S,j,Y){S?(ie(s.POLYGON_OFFSET_FILL),(H!==j||k!==Y)&&(s.polygonOffset(j,Y),H=j,k=Y)):te(s.POLYGON_OFFSET_FILL)}function O(S){S?ie(s.SCISSOR_TEST):te(s.SCISSOR_TEST)}function A(S){S===void 0&&(S=s.TEXTURE0+z-1),G!==S&&(s.activeTexture(S),G=S)}function q(S,j,Y){Y===void 0&&(G===null?Y=s.TEXTURE0+z-1:Y=G);let de=se[Y];de===void 0&&(de={type:void 0,texture:void 0},se[Y]=de),(de.type!==S||de.texture!==j)&&(G!==Y&&(s.activeTexture(Y),G=Y),s.bindTexture(S,j||ee[S]),de.type=S,de.texture=j)}function le(){const S=se[G];S!==void 0&&S.type!==void 0&&(s.bindTexture(S.type,null),S.type=void 0,S.texture=void 0)}function ue(){try{s.compressedTexImage2D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function he(){try{s.compressedTexImage3D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function He(){try{s.texSubImage2D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Ee(){try{s.texSubImage3D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Me(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Qe(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function ye(){try{s.texStorage2D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Be(){try{s.texStorage3D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function rt(){try{s.texImage2D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Ye(){try{s.texImage3D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Ie(S){Le.equals(S)===!1&&(s.scissor(S.x,S.y,S.z,S.w),Le.copy(S))}function nt(S){Ae.equals(S)===!1&&(s.viewport(S.x,S.y,S.z,S.w),Ae.copy(S))}function lt(S,j){let Y=l.get(j);Y===void 0&&(Y=new WeakMap,l.set(j,Y));let de=Y.get(S);de===void 0&&(de=s.getUniformBlockIndex(j,S.name),Y.set(S,de))}function vt(S,j){const de=l.get(j).get(S);a.get(j)!==de&&(s.uniformBlockBinding(j,de,S.__bindingPointIndex),a.set(j,de))}function st(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),c={},G=null,se={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,p=null,m=null,T=null,x=null,E=null,I=null,N=new Xe(0,0,0),C=0,U=!1,M=null,y=null,D=null,H=null,k=null,Le.set(0,0,s.canvas.width,s.canvas.height),Ae.set(0,0,s.canvas.width,s.canvas.height),i.reset(),r.reset(),o.reset()}return{buffers:{color:i,depth:r,stencil:o},enable:ie,disable:te,bindFramebuffer:Ne,drawBuffers:qe,useProgram:V,setBlending:ge,setMaterial:ce,setFlipSided:ve,setCullFace:fe,setLineWidth:Pe,setPolygonOffset:We,setScissorTest:O,activeTexture:A,bindTexture:q,unbindTexture:le,compressedTexImage2D:ue,compressedTexImage3D:he,texImage2D:rt,texImage3D:Ye,updateUBOMapping:lt,uniformBlockBinding:vt,texStorage2D:ye,texStorage3D:Be,texSubImage2D:He,texSubImage3D:Ee,compressedTexSubImage2D:Me,compressedTexSubImage3D:Qe,scissor:Ie,viewport:nt,reset:st}}function cv(s,e,t,n,i,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new _e,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(O,A){return f?new OffscreenCanvas(O,A):Lr("canvas")}function _(O,A,q){let le=1;const ue=We(O);if((ue.width>q||ue.height>q)&&(le=q/Math.max(ue.width,ue.height)),le<1)if(typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&O instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&O instanceof ImageBitmap||typeof VideoFrame<"u"&&O instanceof VideoFrame){const he=Math.floor(le*ue.width),He=Math.floor(le*ue.height);u===void 0&&(u=g(he,He));const Ee=A?g(he,He):u;return Ee.width=he,Ee.height=He,Ee.getContext("2d").drawImage(O,0,0,he,He),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ue.width+"x"+ue.height+") to ("+he+"x"+He+")."),Ee}else return"data"in O&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ue.width+"x"+ue.height+")."),O;return O}function p(O){return O.generateMipmaps&&O.minFilter!==sn&&O.minFilter!==Jt}function m(O){s.generateMipmap(O)}function T(O,A,q,le,ue=!1){if(O!==null){if(s[O]!==void 0)return s[O];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+O+"'")}let he=A;if(A===s.RED&&(q===s.FLOAT&&(he=s.R32F),q===s.HALF_FLOAT&&(he=s.R16F),q===s.UNSIGNED_BYTE&&(he=s.R8)),A===s.RED_INTEGER&&(q===s.UNSIGNED_BYTE&&(he=s.R8UI),q===s.UNSIGNED_SHORT&&(he=s.R16UI),q===s.UNSIGNED_INT&&(he=s.R32UI),q===s.BYTE&&(he=s.R8I),q===s.SHORT&&(he=s.R16I),q===s.INT&&(he=s.R32I)),A===s.RG&&(q===s.FLOAT&&(he=s.RG32F),q===s.HALF_FLOAT&&(he=s.RG16F),q===s.UNSIGNED_BYTE&&(he=s.RG8)),A===s.RG_INTEGER&&(q===s.UNSIGNED_BYTE&&(he=s.RG8UI),q===s.UNSIGNED_SHORT&&(he=s.RG16UI),q===s.UNSIGNED_INT&&(he=s.RG32UI),q===s.BYTE&&(he=s.RG8I),q===s.SHORT&&(he=s.RG16I),q===s.INT&&(he=s.RG32I)),A===s.RGB&&q===s.UNSIGNED_INT_5_9_9_9_REV&&(he=s.RGB9_E5),A===s.RGBA){const He=ue?Go:xt.getTransfer(le);q===s.FLOAT&&(he=s.RGBA32F),q===s.HALF_FLOAT&&(he=s.RGBA16F),q===s.UNSIGNED_BYTE&&(he=He===Rt?s.SRGB8_ALPHA8:s.RGBA8),q===s.UNSIGNED_SHORT_4_4_4_4&&(he=s.RGBA4),q===s.UNSIGNED_SHORT_5_5_5_1&&(he=s.RGB5_A1)}return(he===s.R16F||he===s.R32F||he===s.RG16F||he===s.RG32F||he===s.RGBA16F||he===s.RGBA32F)&&e.get("EXT_color_buffer_float"),he}function x(O,A){return p(O)===!0||O.isFramebufferTexture&&O.minFilter!==sn&&O.minFilter!==Jt?Math.log2(Math.max(A.width,A.height))+1:O.mipmaps!==void 0&&O.mipmaps.length>0?O.mipmaps.length:O.isCompressedTexture&&Array.isArray(O.image)?A.mipmaps.length:1}function E(O){const A=O.target;A.removeEventListener("dispose",E),N(A),A.isVideoTexture&&h.delete(A)}function I(O){const A=O.target;A.removeEventListener("dispose",I),U(A)}function N(O){const A=n.get(O);if(A.__webglInit===void 0)return;const q=O.source,le=d.get(q);if(le){const ue=le[A.__cacheKey];ue.usedTimes--,ue.usedTimes===0&&C(O),Object.keys(le).length===0&&d.delete(q)}n.remove(O)}function C(O){const A=n.get(O);s.deleteTexture(A.__webglTexture);const q=O.source,le=d.get(q);delete le[A.__cacheKey],o.memory.textures--}function U(O){const A=n.get(O);if(O.depthTexture&&O.depthTexture.dispose(),O.isWebGLCubeRenderTarget)for(let le=0;le<6;le++){if(Array.isArray(A.__webglFramebuffer[le]))for(let ue=0;ue<A.__webglFramebuffer[le].length;ue++)s.deleteFramebuffer(A.__webglFramebuffer[le][ue]);else s.deleteFramebuffer(A.__webglFramebuffer[le]);A.__webglDepthbuffer&&s.deleteRenderbuffer(A.__webglDepthbuffer[le])}else{if(Array.isArray(A.__webglFramebuffer))for(let le=0;le<A.__webglFramebuffer.length;le++)s.deleteFramebuffer(A.__webglFramebuffer[le]);else s.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&s.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&s.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let le=0;le<A.__webglColorRenderbuffer.length;le++)A.__webglColorRenderbuffer[le]&&s.deleteRenderbuffer(A.__webglColorRenderbuffer[le]);A.__webglDepthRenderbuffer&&s.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const q=O.textures;for(let le=0,ue=q.length;le<ue;le++){const he=n.get(q[le]);he.__webglTexture&&(s.deleteTexture(he.__webglTexture),o.memory.textures--),n.remove(q[le])}n.remove(O)}let M=0;function y(){M=0}function D(){const O=M;return O>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+O+" texture units while this GPU supports only "+i.maxTextures),M+=1,O}function H(O){const A=[];return A.push(O.wrapS),A.push(O.wrapT),A.push(O.wrapR||0),A.push(O.magFilter),A.push(O.minFilter),A.push(O.anisotropy),A.push(O.internalFormat),A.push(O.format),A.push(O.type),A.push(O.generateMipmaps),A.push(O.premultiplyAlpha),A.push(O.flipY),A.push(O.unpackAlignment),A.push(O.colorSpace),A.join()}function k(O,A){const q=n.get(O);if(O.isVideoTexture&&fe(O),O.isRenderTargetTexture===!1&&O.version>0&&q.__version!==O.version){const le=O.image;if(le===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(le.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Le(q,O,A);return}}t.bindTexture(s.TEXTURE_2D,q.__webglTexture,s.TEXTURE0+A)}function z(O,A){const q=n.get(O);if(O.version>0&&q.__version!==O.version){Le(q,O,A);return}t.bindTexture(s.TEXTURE_2D_ARRAY,q.__webglTexture,s.TEXTURE0+A)}function $(O,A){const q=n.get(O);if(O.version>0&&q.__version!==O.version){Le(q,O,A);return}t.bindTexture(s.TEXTURE_3D,q.__webglTexture,s.TEXTURE0+A)}function B(O,A){const q=n.get(O);if(O.version>0&&q.__version!==O.version){Ae(q,O,A);return}t.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture,s.TEXTURE0+A)}const ne={[kn]:s.REPEAT,[vn]:s.CLAMP_TO_EDGE,[Vo]:s.MIRRORED_REPEAT},G={[sn]:s.NEAREST,[Md]:s.NEAREST_MIPMAP_NEAREST,[_r]:s.NEAREST_MIPMAP_LINEAR,[Jt]:s.LINEAR,[Fo]:s.LINEAR_MIPMAP_NEAREST,[Rn]:s.LINEAR_MIPMAP_LINEAR},se={[Wp]:s.NEVER,[Kp]:s.ALWAYS,[jp]:s.LESS,[Nd]:s.LEQUAL,[Xp]:s.EQUAL,[Yp]:s.GEQUAL,[qp]:s.GREATER,[$p]:s.NOTEQUAL};function ae(O,A){if(A.type===Bn&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===Jt||A.magFilter===Fo||A.magFilter===_r||A.magFilter===Rn||A.minFilter===Jt||A.minFilter===Fo||A.minFilter===_r||A.minFilter===Rn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(O,s.TEXTURE_WRAP_S,ne[A.wrapS]),s.texParameteri(O,s.TEXTURE_WRAP_T,ne[A.wrapT]),(O===s.TEXTURE_3D||O===s.TEXTURE_2D_ARRAY)&&s.texParameteri(O,s.TEXTURE_WRAP_R,ne[A.wrapR]),s.texParameteri(O,s.TEXTURE_MAG_FILTER,G[A.magFilter]),s.texParameteri(O,s.TEXTURE_MIN_FILTER,G[A.minFilter]),A.compareFunction&&(s.texParameteri(O,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(O,s.TEXTURE_COMPARE_FUNC,se[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===sn||A.minFilter!==_r&&A.minFilter!==Rn||A.type===Bn&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){const q=e.get("EXT_texture_filter_anisotropic");s.texParameterf(O,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,i.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function pe(O,A){let q=!1;O.__webglInit===void 0&&(O.__webglInit=!0,A.addEventListener("dispose",E));const le=A.source;let ue=d.get(le);ue===void 0&&(ue={},d.set(le,ue));const he=H(A);if(he!==O.__cacheKey){ue[he]===void 0&&(ue[he]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,q=!0),ue[he].usedTimes++;const He=ue[O.__cacheKey];He!==void 0&&(ue[O.__cacheKey].usedTimes--,He.usedTimes===0&&C(A)),O.__cacheKey=he,O.__webglTexture=ue[he].texture}return q}function Le(O,A,q){let le=s.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(le=s.TEXTURE_2D_ARRAY),A.isData3DTexture&&(le=s.TEXTURE_3D);const ue=pe(O,A),he=A.source;t.bindTexture(le,O.__webglTexture,s.TEXTURE0+q);const He=n.get(he);if(he.version!==He.__version||ue===!0){t.activeTexture(s.TEXTURE0+q);const Ee=xt.getPrimaries(xt.workingColorSpace),Me=A.colorSpace===Mi?null:xt.getPrimaries(A.colorSpace),Qe=A.colorSpace===Mi||Ee===Me?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qe);let ye=_(A.image,!1,i.maxTextureSize);ye=Pe(A,ye);const Be=r.convert(A.format,A.colorSpace),rt=r.convert(A.type);let Ye=T(A.internalFormat,Be,rt,A.colorSpace,A.isVideoTexture);ae(le,A);let Ie;const nt=A.mipmaps,lt=A.isVideoTexture!==!0,vt=He.__version===void 0||ue===!0,st=he.dataReady,S=x(A,ye);if(A.isDepthTexture)Ye=s.DEPTH_COMPONENT16,A.type===Bn?Ye=s.DEPTH_COMPONENT32F:A.type===js?Ye=s.DEPTH_COMPONENT24:A.type===Br&&(Ye=s.DEPTH24_STENCIL8),vt&&(lt?t.texStorage2D(s.TEXTURE_2D,1,Ye,ye.width,ye.height):t.texImage2D(s.TEXTURE_2D,0,Ye,ye.width,ye.height,0,Be,rt,null));else if(A.isDataTexture)if(nt.length>0){lt&&vt&&t.texStorage2D(s.TEXTURE_2D,S,Ye,nt[0].width,nt[0].height);for(let j=0,Y=nt.length;j<Y;j++)Ie=nt[j],lt?st&&t.texSubImage2D(s.TEXTURE_2D,j,0,0,Ie.width,Ie.height,Be,rt,Ie.data):t.texImage2D(s.TEXTURE_2D,j,Ye,Ie.width,Ie.height,0,Be,rt,Ie.data);A.generateMipmaps=!1}else lt?(vt&&t.texStorage2D(s.TEXTURE_2D,S,Ye,ye.width,ye.height),st&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ye.width,ye.height,Be,rt,ye.data)):t.texImage2D(s.TEXTURE_2D,0,Ye,ye.width,ye.height,0,Be,rt,ye.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){lt&&vt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,S,Ye,nt[0].width,nt[0].height,ye.depth);for(let j=0,Y=nt.length;j<Y;j++)Ie=nt[j],A.format!==Ln?Be!==null?lt?st&&t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,j,0,0,0,Ie.width,Ie.height,ye.depth,Be,Ie.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,j,Ye,Ie.width,Ie.height,ye.depth,0,Ie.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):lt?st&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,j,0,0,0,Ie.width,Ie.height,ye.depth,Be,rt,Ie.data):t.texImage3D(s.TEXTURE_2D_ARRAY,j,Ye,Ie.width,Ie.height,ye.depth,0,Be,rt,Ie.data)}else{lt&&vt&&t.texStorage2D(s.TEXTURE_2D,S,Ye,nt[0].width,nt[0].height);for(let j=0,Y=nt.length;j<Y;j++)Ie=nt[j],A.format!==Ln?Be!==null?lt?st&&t.compressedTexSubImage2D(s.TEXTURE_2D,j,0,0,Ie.width,Ie.height,Be,Ie.data):t.compressedTexImage2D(s.TEXTURE_2D,j,Ye,Ie.width,Ie.height,0,Ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):lt?st&&t.texSubImage2D(s.TEXTURE_2D,j,0,0,Ie.width,Ie.height,Be,rt,Ie.data):t.texImage2D(s.TEXTURE_2D,j,Ye,Ie.width,Ie.height,0,Be,rt,Ie.data)}else if(A.isDataArrayTexture)lt?(vt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,S,Ye,ye.width,ye.height,ye.depth),st&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ye.width,ye.height,ye.depth,Be,rt,ye.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,Ye,ye.width,ye.height,ye.depth,0,Be,rt,ye.data);else if(A.isData3DTexture)lt?(vt&&t.texStorage3D(s.TEXTURE_3D,S,Ye,ye.width,ye.height,ye.depth),st&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ye.width,ye.height,ye.depth,Be,rt,ye.data)):t.texImage3D(s.TEXTURE_3D,0,Ye,ye.width,ye.height,ye.depth,0,Be,rt,ye.data);else if(A.isFramebufferTexture){if(vt)if(lt)t.texStorage2D(s.TEXTURE_2D,S,Ye,ye.width,ye.height);else{let j=ye.width,Y=ye.height;for(let de=0;de<S;de++)t.texImage2D(s.TEXTURE_2D,de,Ye,j,Y,0,Be,rt,null),j>>=1,Y>>=1}}else if(nt.length>0){if(lt&&vt){const j=We(nt[0]);t.texStorage2D(s.TEXTURE_2D,S,Ye,j.width,j.height)}for(let j=0,Y=nt.length;j<Y;j++)Ie=nt[j],lt?st&&t.texSubImage2D(s.TEXTURE_2D,j,0,0,Be,rt,Ie):t.texImage2D(s.TEXTURE_2D,j,Ye,Be,rt,Ie);A.generateMipmaps=!1}else if(lt){if(vt){const j=We(ye);t.texStorage2D(s.TEXTURE_2D,S,Ye,j.width,j.height)}st&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Be,rt,ye)}else t.texImage2D(s.TEXTURE_2D,0,Ye,Be,rt,ye);p(A)&&m(le),He.__version=he.version,A.onUpdate&&A.onUpdate(A)}O.__version=A.version}function Ae(O,A,q){if(A.image.length!==6)return;const le=pe(O,A),ue=A.source;t.bindTexture(s.TEXTURE_CUBE_MAP,O.__webglTexture,s.TEXTURE0+q);const he=n.get(ue);if(ue.version!==he.__version||le===!0){t.activeTexture(s.TEXTURE0+q);const He=xt.getPrimaries(xt.workingColorSpace),Ee=A.colorSpace===Mi?null:xt.getPrimaries(A.colorSpace),Me=A.colorSpace===Mi||He===Ee?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);const Qe=A.isCompressedTexture||A.image[0].isCompressedTexture,ye=A.image[0]&&A.image[0].isDataTexture,Be=[];for(let Y=0;Y<6;Y++)!Qe&&!ye?Be[Y]=_(A.image[Y],!0,i.maxCubemapSize):Be[Y]=ye?A.image[Y].image:A.image[Y],Be[Y]=Pe(A,Be[Y]);const rt=Be[0],Ye=r.convert(A.format,A.colorSpace),Ie=r.convert(A.type),nt=T(A.internalFormat,Ye,Ie,A.colorSpace),lt=A.isVideoTexture!==!0,vt=he.__version===void 0||le===!0,st=ue.dataReady;let S=x(A,rt);ae(s.TEXTURE_CUBE_MAP,A);let j;if(Qe){lt&&vt&&t.texStorage2D(s.TEXTURE_CUBE_MAP,S,nt,rt.width,rt.height);for(let Y=0;Y<6;Y++){j=Be[Y].mipmaps;for(let de=0;de<j.length;de++){const xe=j[de];A.format!==Ln?Ye!==null?lt?st&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,de,0,0,xe.width,xe.height,Ye,xe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,de,nt,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):lt?st&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,de,0,0,xe.width,xe.height,Ye,Ie,xe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,de,nt,xe.width,xe.height,0,Ye,Ie,xe.data)}}}else{if(j=A.mipmaps,lt&&vt){j.length>0&&S++;const Y=We(Be[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,S,nt,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(ye){lt?st&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Be[Y].width,Be[Y].height,Ye,Ie,Be[Y].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,nt,Be[Y].width,Be[Y].height,0,Ye,Ie,Be[Y].data);for(let de=0;de<j.length;de++){const it=j[de].image[Y].image;lt?st&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,de+1,0,0,it.width,it.height,Ye,Ie,it.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,de+1,nt,it.width,it.height,0,Ye,Ie,it.data)}}else{lt?st&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Ye,Ie,Be[Y]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,nt,Ye,Ie,Be[Y]);for(let de=0;de<j.length;de++){const xe=j[de];lt?st&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,de+1,0,0,Ye,Ie,xe.image[Y]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,de+1,nt,Ye,Ie,xe.image[Y])}}}p(A)&&m(s.TEXTURE_CUBE_MAP),he.__version=ue.version,A.onUpdate&&A.onUpdate(A)}O.__version=A.version}function W(O,A,q,le,ue,he){const He=r.convert(q.format,q.colorSpace),Ee=r.convert(q.type),Me=T(q.internalFormat,He,Ee,q.colorSpace);if(!n.get(A).__hasExternalTextures){const ye=Math.max(1,A.width>>he),Be=Math.max(1,A.height>>he);ue===s.TEXTURE_3D||ue===s.TEXTURE_2D_ARRAY?t.texImage3D(ue,he,Me,ye,Be,A.depth,0,He,Ee,null):t.texImage2D(ue,he,Me,ye,Be,0,He,Ee,null)}t.bindFramebuffer(s.FRAMEBUFFER,O),ve(A)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,le,ue,n.get(q).__webglTexture,0,ce(A)):(ue===s.TEXTURE_2D||ue>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ue<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,le,ue,n.get(q).__webglTexture,he),t.bindFramebuffer(s.FRAMEBUFFER,null)}function ee(O,A,q){if(s.bindRenderbuffer(s.RENDERBUFFER,O),A.depthBuffer&&!A.stencilBuffer){let le=s.DEPTH_COMPONENT24;if(q||ve(A)){const ue=A.depthTexture;ue&&ue.isDepthTexture&&(ue.type===Bn?le=s.DEPTH_COMPONENT32F:ue.type===js&&(le=s.DEPTH_COMPONENT24));const he=ce(A);ve(A)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,he,le,A.width,A.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,he,le,A.width,A.height)}else s.renderbufferStorage(s.RENDERBUFFER,le,A.width,A.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,O)}else if(A.depthBuffer&&A.stencilBuffer){const le=ce(A);q&&ve(A)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,le,s.DEPTH24_STENCIL8,A.width,A.height):ve(A)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,le,s.DEPTH24_STENCIL8,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,O)}else{const le=A.textures;for(let ue=0;ue<le.length;ue++){const he=le[ue],He=r.convert(he.format,he.colorSpace),Ee=r.convert(he.type),Me=T(he.internalFormat,He,Ee,he.colorSpace),Qe=ce(A);q&&ve(A)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Qe,Me,A.width,A.height):ve(A)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Qe,Me,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,Me,A.width,A.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ie(O,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,O),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),k(A.depthTexture,0);const le=n.get(A.depthTexture).__webglTexture,ue=ce(A);if(A.depthTexture.format===zs)ve(A)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,le,0,ue):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,le,0);else if(A.depthTexture.format===Cr)ve(A)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,le,0,ue):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,le,0);else throw new Error("Unknown depthTexture format")}function te(O){const A=n.get(O),q=O.isWebGLCubeRenderTarget===!0;if(O.depthTexture&&!A.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");ie(A.__webglFramebuffer,O)}else if(q){A.__webglDepthbuffer=[];for(let le=0;le<6;le++)t.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer[le]),A.__webglDepthbuffer[le]=s.createRenderbuffer(),ee(A.__webglDepthbuffer[le],O,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer=s.createRenderbuffer(),ee(A.__webglDepthbuffer,O,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ne(O,A,q){const le=n.get(O);A!==void 0&&W(le.__webglFramebuffer,O,O.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),q!==void 0&&te(O)}function qe(O){const A=O.texture,q=n.get(O),le=n.get(A);O.addEventListener("dispose",I);const ue=O.textures,he=O.isWebGLCubeRenderTarget===!0,He=ue.length>1;if(He||(le.__webglTexture===void 0&&(le.__webglTexture=s.createTexture()),le.__version=A.version,o.memory.textures++),he){q.__webglFramebuffer=[];for(let Ee=0;Ee<6;Ee++)if(A.mipmaps&&A.mipmaps.length>0){q.__webglFramebuffer[Ee]=[];for(let Me=0;Me<A.mipmaps.length;Me++)q.__webglFramebuffer[Ee][Me]=s.createFramebuffer()}else q.__webglFramebuffer[Ee]=s.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){q.__webglFramebuffer=[];for(let Ee=0;Ee<A.mipmaps.length;Ee++)q.__webglFramebuffer[Ee]=s.createFramebuffer()}else q.__webglFramebuffer=s.createFramebuffer();if(He)for(let Ee=0,Me=ue.length;Ee<Me;Ee++){const Qe=n.get(ue[Ee]);Qe.__webglTexture===void 0&&(Qe.__webglTexture=s.createTexture(),o.memory.textures++)}if(O.samples>0&&ve(O)===!1){q.__webglMultisampledFramebuffer=s.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let Ee=0;Ee<ue.length;Ee++){const Me=ue[Ee];q.__webglColorRenderbuffer[Ee]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,q.__webglColorRenderbuffer[Ee]);const Qe=r.convert(Me.format,Me.colorSpace),ye=r.convert(Me.type),Be=T(Me.internalFormat,Qe,ye,Me.colorSpace,O.isXRRenderTarget===!0),rt=ce(O);s.renderbufferStorageMultisample(s.RENDERBUFFER,rt,Be,O.width,O.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ee,s.RENDERBUFFER,q.__webglColorRenderbuffer[Ee])}s.bindRenderbuffer(s.RENDERBUFFER,null),O.depthBuffer&&(q.__webglDepthRenderbuffer=s.createRenderbuffer(),ee(q.__webglDepthRenderbuffer,O,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(he){t.bindTexture(s.TEXTURE_CUBE_MAP,le.__webglTexture),ae(s.TEXTURE_CUBE_MAP,A);for(let Ee=0;Ee<6;Ee++)if(A.mipmaps&&A.mipmaps.length>0)for(let Me=0;Me<A.mipmaps.length;Me++)W(q.__webglFramebuffer[Ee][Me],O,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,Me);else W(q.__webglFramebuffer[Ee],O,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0);p(A)&&m(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(He){for(let Ee=0,Me=ue.length;Ee<Me;Ee++){const Qe=ue[Ee],ye=n.get(Qe);t.bindTexture(s.TEXTURE_2D,ye.__webglTexture),ae(s.TEXTURE_2D,Qe),W(q.__webglFramebuffer,O,Qe,s.COLOR_ATTACHMENT0+Ee,s.TEXTURE_2D,0),p(Qe)&&m(s.TEXTURE_2D)}t.unbindTexture()}else{let Ee=s.TEXTURE_2D;if((O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(Ee=O.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Ee,le.__webglTexture),ae(Ee,A),A.mipmaps&&A.mipmaps.length>0)for(let Me=0;Me<A.mipmaps.length;Me++)W(q.__webglFramebuffer[Me],O,A,s.COLOR_ATTACHMENT0,Ee,Me);else W(q.__webglFramebuffer,O,A,s.COLOR_ATTACHMENT0,Ee,0);p(A)&&m(Ee),t.unbindTexture()}O.depthBuffer&&te(O)}function V(O){const A=O.textures;for(let q=0,le=A.length;q<le;q++){const ue=A[q];if(p(ue)){const he=O.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,He=n.get(ue).__webglTexture;t.bindTexture(he,He),m(he),t.unbindTexture()}}}const at=[],re=[];function ge(O){if(O.samples>0){if(ve(O)===!1){const A=O.textures,q=O.width,le=O.height;let ue=s.COLOR_BUFFER_BIT;const he=O.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,He=n.get(O),Ee=A.length>1;if(Ee)for(let Me=0;Me<A.length;Me++)t.bindFramebuffer(s.FRAMEBUFFER,He.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Me,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,He.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Me,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,He.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,He.__webglFramebuffer);for(let Me=0;Me<A.length;Me++){if(O.resolveDepthBuffer&&(O.depthBuffer&&(ue|=s.DEPTH_BUFFER_BIT),O.stencilBuffer&&O.resolveStencilBuffer&&(ue|=s.STENCIL_BUFFER_BIT)),Ee){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,He.__webglColorRenderbuffer[Me]);const Qe=n.get(A[Me]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Qe,0)}s.blitFramebuffer(0,0,q,le,0,0,q,le,ue,s.NEAREST),l===!0&&(at.length=0,re.length=0,at.push(s.COLOR_ATTACHMENT0+Me),O.depthBuffer&&O.resolveDepthBuffer===!1&&(at.push(he),re.push(he),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,re)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,at))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Ee)for(let Me=0;Me<A.length;Me++){t.bindFramebuffer(s.FRAMEBUFFER,He.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Me,s.RENDERBUFFER,He.__webglColorRenderbuffer[Me]);const Qe=n.get(A[Me]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,He.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Me,s.TEXTURE_2D,Qe,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,He.__webglMultisampledFramebuffer)}else if(O.depthBuffer&&O.resolveDepthBuffer===!1&&l){const A=O.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[A])}}}function ce(O){return Math.min(i.maxSamples,O.samples)}function ve(O){const A=n.get(O);return O.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function fe(O){const A=o.render.frame;h.get(O)!==A&&(h.set(O,A),O.update())}function Pe(O,A){const q=O.colorSpace,le=O.format,ue=O.type;return O.isCompressedTexture===!0||O.isVideoTexture===!0||q!==Yt&&q!==Mi&&(xt.getTransfer(q)===Rt?(le!==Ln||ue!==Ri)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),A}function We(O){return typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement?(c.width=O.naturalWidth||O.width,c.height=O.naturalHeight||O.height):typeof VideoFrame<"u"&&O instanceof VideoFrame?(c.width=O.displayWidth,c.height=O.displayHeight):(c.width=O.width,c.height=O.height),c}this.allocateTextureUnit=D,this.resetTextureUnits=y,this.setTexture2D=k,this.setTexture2DArray=z,this.setTexture3D=$,this.setTextureCube=B,this.rebindTextures=Ne,this.setupRenderTarget=qe,this.updateRenderTargetMipmap=V,this.updateMultisampleRenderTarget=ge,this.setupDepthRenderbuffer=te,this.setupFrameBufferTexture=W,this.useMultisampledRTT=ve}function hv(s,e){function t(n,i=Mi){let r;const o=xt.getTransfer(i);if(n===Ri)return s.UNSIGNED_BYTE;if(n===Td)return s.UNSIGNED_SHORT_4_4_4_4;if(n===wd)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Np)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Lp)return s.BYTE;if(n===Pp)return s.SHORT;if(n===Sd)return s.UNSIGNED_SHORT;if(n===Ed)return s.INT;if(n===js)return s.UNSIGNED_INT;if(n===Bn)return s.FLOAT;if(n===Qo)return s.HALF_FLOAT;if(n===Ip)return s.ALPHA;if(n===Dp)return s.RGB;if(n===Ln)return s.RGBA;if(n===Up)return s.LUMINANCE;if(n===Op)return s.LUMINANCE_ALPHA;if(n===zs)return s.DEPTH_COMPONENT;if(n===Cr)return s.DEPTH_STENCIL;if(n===Ad)return s.RED;if(n===Cd)return s.RED_INTEGER;if(n===Fp)return s.RG;if(n===Rd)return s.RG_INTEGER;if(n===Ld)return s.RGBA_INTEGER;if(n===xa||n===ba||n===Ma||n===Sa)if(o===Rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===xa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ba)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===xa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ba)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ma)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Sa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Vc||n===Gc||n===Wc||n===jc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Vc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Gc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Wc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===jc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Xc||n===qc||n===$c)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Xc||n===qc)return o===Rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===$c)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Yc||n===Kc||n===Zc||n===Jc||n===Qc||n===eh||n===th||n===nh||n===ih||n===sh||n===rh||n===oh||n===ah||n===lh)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Yc)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Kc)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Zc)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Jc)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Qc)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===eh)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===th)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===nh)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ih)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===sh)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===rh)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===oh)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ah)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===lh)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ea||n===ch||n===hh)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ea)return o===Rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ch)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===hh)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===kp||n===uh||n===dh||n===fh)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ea)return r.COMPRESSED_RED_RGTC1_EXT;if(n===uh)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===dh)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===fh)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Br?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}class uv extends $t{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class ai extends At{constructor(){super(),this.isGroup=!0,this.type="Group"}}const dv={type:"move"};class Ka{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ai,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ai,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ai,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),m=this._getHandJoint(c,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(dv)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ai;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const fv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,pv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class mv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new Ht,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}render(e,t){if(this.texture!==null){if(this.mesh===null){const n=t.cameras[0].viewport,i=new Li({vertexShader:fv,fragmentShader:pv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new kt(new zr(20,20),i)}e.render(this.mesh,t)}}reset(){this.texture=null,this.mesh=null}}class gv extends os{constructor(e,t){super();const n=this;let i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const _=new mv,p=t.getContextAttributes();let m=null,T=null;const x=[],E=[],I=new _e;let N=null;const C=new $t;C.layers.enable(1),C.viewport=new wt;const U=new $t;U.layers.enable(2),U.viewport=new wt;const M=[C,U],y=new uv;y.layers.enable(1),y.layers.enable(2);let D=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let ee=x[W];return ee===void 0&&(ee=new Ka,x[W]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(W){let ee=x[W];return ee===void 0&&(ee=new Ka,x[W]=ee),ee.getGripSpace()},this.getHand=function(W){let ee=x[W];return ee===void 0&&(ee=new Ka,x[W]=ee),ee.getHandSpace()};function k(W){const ee=E.indexOf(W.inputSource);if(ee===-1)return;const ie=x[ee];ie!==void 0&&(ie.update(W.inputSource,W.frame,c||o),ie.dispatchEvent({type:W.type,data:W.inputSource}))}function z(){i.removeEventListener("select",k),i.removeEventListener("selectstart",k),i.removeEventListener("selectend",k),i.removeEventListener("squeeze",k),i.removeEventListener("squeezestart",k),i.removeEventListener("squeezeend",k),i.removeEventListener("end",z),i.removeEventListener("inputsourceschange",$);for(let W=0;W<x.length;W++){const ee=E[W];ee!==null&&(E[W]=null,x[W].disconnect(ee))}D=null,H=null,_.reset(),e.setRenderTarget(m),f=null,d=null,u=null,i=null,T=null,Ae.stop(),n.isPresenting=!1,e.setPixelRatio(N),e.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(W){if(i=W,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",k),i.addEventListener("selectstart",k),i.addEventListener("selectend",k),i.addEventListener("squeeze",k),i.addEventListener("squeezestart",k),i.addEventListener("squeezeend",k),i.addEventListener("end",z),i.addEventListener("inputsourceschange",$),p.xrCompatible!==!0&&await t.makeXRCompatible(),N=e.getPixelRatio(),e.getSize(I),i.renderState.layers===void 0){const ee={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,ee),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),T=new ts(f.framebufferWidth,f.framebufferHeight,{format:Ln,type:Ri,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let ee=null,ie=null,te=null;p.depth&&(te=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=p.stencil?Cr:zs,ie=p.stencil?Br:js);const Ne={colorFormat:t.RGBA8,depthFormat:te,scaleFactor:r};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(Ne),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),T=new ts(d.textureWidth,d.textureHeight,{format:Ln,type:Ri,depthTexture:new Wd(d.textureWidth,d.textureHeight,ie,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Ae.setContext(i),Ae.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function $(W){for(let ee=0;ee<W.removed.length;ee++){const ie=W.removed[ee],te=E.indexOf(ie);te>=0&&(E[te]=null,x[te].disconnect(ie))}for(let ee=0;ee<W.added.length;ee++){const ie=W.added[ee];let te=E.indexOf(ie);if(te===-1){for(let qe=0;qe<x.length;qe++)if(qe>=E.length){E.push(ie),te=qe;break}else if(E[qe]===null){E[qe]=ie,te=qe;break}if(te===-1)break}const Ne=x[te];Ne&&Ne.connect(ie)}}const B=new F,ne=new F;function G(W,ee,ie){B.setFromMatrixPosition(ee.matrixWorld),ne.setFromMatrixPosition(ie.matrixWorld);const te=B.distanceTo(ne),Ne=ee.projectionMatrix.elements,qe=ie.projectionMatrix.elements,V=Ne[14]/(Ne[10]-1),at=Ne[14]/(Ne[10]+1),re=(Ne[9]+1)/Ne[5],ge=(Ne[9]-1)/Ne[5],ce=(Ne[8]-1)/Ne[0],ve=(qe[8]+1)/qe[0],fe=V*ce,Pe=V*ve,We=te/(-ce+ve),O=We*-ce;ee.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(O),W.translateZ(We),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert();const A=V+We,q=at+We,le=fe-O,ue=Pe+(te-O),he=re*at/q*A,He=ge*at/q*A;W.projectionMatrix.makePerspective(le,ue,he,He,A,q),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}function se(W,ee){ee===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(ee.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(i===null)return;_.texture!==null&&(W.near=_.depthNear,W.far=_.depthFar),y.near=U.near=C.near=W.near,y.far=U.far=C.far=W.far,(D!==y.near||H!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),D=y.near,H=y.far,C.near=D,C.far=H,U.near=D,U.far=H,C.updateProjectionMatrix(),U.updateProjectionMatrix(),W.updateProjectionMatrix());const ee=W.parent,ie=y.cameras;se(y,ee);for(let te=0;te<ie.length;te++)se(ie[te],ee);ie.length===2?G(y,C,U):y.projectionMatrix.copy(C.projectionMatrix),ae(W,y,ee)};function ae(W,ee,ie){ie===null?W.matrix.copy(ee.matrixWorld):(W.matrix.copy(ie.matrixWorld),W.matrix.invert(),W.matrix.multiply(ee.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(ee.projectionMatrix),W.projectionMatrixInverse.copy(ee.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=qs*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(W){l=W,d!==null&&(d.fixedFoveation=W),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=W)},this.hasDepthSensing=function(){return _.texture!==null};let pe=null;function Le(W,ee){if(h=ee.getViewerPose(c||o),g=ee,h!==null){const ie=h.views;f!==null&&(e.setRenderTargetFramebuffer(T,f.framebuffer),e.setRenderTarget(T));let te=!1;ie.length!==y.cameras.length&&(y.cameras.length=0,te=!0);for(let qe=0;qe<ie.length;qe++){const V=ie[qe];let at=null;if(f!==null)at=f.getViewport(V);else{const ge=u.getViewSubImage(d,V);at=ge.viewport,qe===0&&(e.setRenderTargetTextures(T,ge.colorTexture,d.ignoreDepthValues?void 0:ge.depthStencilTexture),e.setRenderTarget(T))}let re=M[qe];re===void 0&&(re=new $t,re.layers.enable(qe),re.viewport=new wt,M[qe]=re),re.matrix.fromArray(V.transform.matrix),re.matrix.decompose(re.position,re.quaternion,re.scale),re.projectionMatrix.fromArray(V.projectionMatrix),re.projectionMatrixInverse.copy(re.projectionMatrix).invert(),re.viewport.set(at.x,at.y,at.width,at.height),qe===0&&(y.matrix.copy(re.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),te===!0&&y.cameras.push(re)}const Ne=i.enabledFeatures;if(Ne&&Ne.includes("depth-sensing")){const qe=u.getDepthInformation(ie[0]);qe&&qe.isValid&&qe.texture&&_.init(e,qe,i.renderState)}}for(let ie=0;ie<x.length;ie++){const te=E[ie],Ne=x[ie];te!==null&&Ne!==void 0&&Ne.update(te,ee,c||o)}_.render(e,y),pe&&pe(W,ee),ee.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ee}),g=null}const Ae=new Gd;Ae.setAnimationLoop(Le),this.setAnimationLoop=function(W){pe=W},this.dispose=function(){}}}const Hi=new rn,_v=new $e;function yv(s,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,zd(s)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,T,x,E){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),u(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m)):m.isMeshStandardMaterial?(r(p,m),d(p,m),m.isMeshPhysicalMaterial&&f(p,m,E)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),_(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?l(p,m,T,x):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===ln&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===ln&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const T=e.get(m),x=T.envMap,E=T.envMapRotation;if(x&&(p.envMap.value=x,Hi.copy(E),Hi.x*=-1,Hi.y*=-1,Hi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Hi.y*=-1,Hi.z*=-1),p.envMapRotation.value.setFromMatrix4(_v.makeRotationFromEuler(Hi)),p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap){p.lightMap.value=m.lightMap;const I=s._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=m.lightMapIntensity*I,t(m.lightMap,p.lightMapTransform)}m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,T,x){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*T,p.scale.value=x*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,T){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===ln&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=T.texture,p.transmissionSamplerSize.value.set(T.width,T.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const T=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(T.matrixWorld),p.nearDistance.value=T.shadow.camera.near,p.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function vv(s,e,t,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,x){const E=x.program;n.uniformBlockBinding(T,E)}function c(T,x){let E=i[T.id];E===void 0&&(g(T),E=h(T),i[T.id]=E,T.addEventListener("dispose",p));const I=x.program;n.updateUBOMapping(T,I);const N=e.render.frame;r[T.id]!==N&&(d(T),r[T.id]=N)}function h(T){const x=u();T.__bindingPointIndex=x;const E=s.createBuffer(),I=T.__size,N=T.usage;return s.bindBuffer(s.UNIFORM_BUFFER,E),s.bufferData(s.UNIFORM_BUFFER,I,N),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,x,E),E}function u(){for(let T=0;T<a;T++)if(o.indexOf(T)===-1)return o.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(T){const x=i[T.id],E=T.uniforms,I=T.__cache;s.bindBuffer(s.UNIFORM_BUFFER,x);for(let N=0,C=E.length;N<C;N++){const U=Array.isArray(E[N])?E[N]:[E[N]];for(let M=0,y=U.length;M<y;M++){const D=U[M];if(f(D,N,M,I)===!0){const H=D.__offset,k=Array.isArray(D.value)?D.value:[D.value];let z=0;for(let $=0;$<k.length;$++){const B=k[$],ne=_(B);typeof B=="number"||typeof B=="boolean"?(D.__data[0]=B,s.bufferSubData(s.UNIFORM_BUFFER,H+z,D.__data)):B.isMatrix3?(D.__data[0]=B.elements[0],D.__data[1]=B.elements[1],D.__data[2]=B.elements[2],D.__data[3]=0,D.__data[4]=B.elements[3],D.__data[5]=B.elements[4],D.__data[6]=B.elements[5],D.__data[7]=0,D.__data[8]=B.elements[6],D.__data[9]=B.elements[7],D.__data[10]=B.elements[8],D.__data[11]=0):(B.toArray(D.__data,z),z+=ne.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,H,D.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(T,x,E,I){const N=T.value,C=x+"_"+E;if(I[C]===void 0)return typeof N=="number"||typeof N=="boolean"?I[C]=N:I[C]=N.clone(),!0;{const U=I[C];if(typeof N=="number"||typeof N=="boolean"){if(U!==N)return I[C]=N,!0}else if(U.equals(N)===!1)return U.copy(N),!0}return!1}function g(T){const x=T.uniforms;let E=0;const I=16;for(let C=0,U=x.length;C<U;C++){const M=Array.isArray(x[C])?x[C]:[x[C]];for(let y=0,D=M.length;y<D;y++){const H=M[y],k=Array.isArray(H.value)?H.value:[H.value];for(let z=0,$=k.length;z<$;z++){const B=k[z],ne=_(B),G=E%I;G!==0&&I-G<ne.boundary&&(E+=I-G),H.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=E,E+=ne.storage}}}const N=E%I;return N>0&&(E+=I-N),T.__size=E,T.__cache={},this}function _(T){const x={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(x.boundary=4,x.storage=4):T.isVector2?(x.boundary=8,x.storage=8):T.isVector3||T.isColor?(x.boundary=16,x.storage=12):T.isVector4?(x.boundary=16,x.storage=16):T.isMatrix3?(x.boundary=48,x.storage=48):T.isMatrix4?(x.boundary=64,x.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),x}function p(T){const x=T.target;x.removeEventListener("dispose",p);const E=o.indexOf(x.__bindingPointIndex);o.splice(E,1),s.deleteBuffer(i[x.id]),delete i[x.id],delete r[x.id]}function m(){for(const T in i)s.deleteBuffer(i[T]);o=[],i={},r={}}return{bind:l,update:c,dispose:m}}class xv{constructor(e={}){const{canvas:t=fm(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const m=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ot,this._useLegacyLights=!1,this.toneMapping=wi,this.toneMappingExposure=1;const x=this;let E=!1,I=0,N=0,C=null,U=-1,M=null;const y=new wt,D=new wt;let H=null;const k=new Xe(0);let z=0,$=t.width,B=t.height,ne=1,G=null,se=null;const ae=new wt(0,0,$,B),pe=new wt(0,0,$,B);let Le=!1;const Ae=new Xl;let W=!1,ee=!1;const ie=new $e,te=new F,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function qe(){return C===null?ne:1}let V=n;function at(P,X){return t.getContext(P,X)}try{const P={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Vl}`),t.addEventListener("webglcontextlost",S,!1),t.addEventListener("webglcontextrestored",j,!1),t.addEventListener("webglcontextcreationerror",Y,!1),V===null){const X="webgl2";if(V=at(X,P),V===null)throw at(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let re,ge,ce,ve,fe,Pe,We,O,A,q,le,ue,he,He,Ee,Me,Qe,ye,Be,rt,Ye,Ie,nt,lt;function vt(){re=new C0(V),re.init(),Ie=new hv(V,re),ge=new M0(V,re,e,Ie),ce=new lv(V),ve=new P0(V),fe=new $y,Pe=new cv(V,re,ce,fe,ge,Ie,ve),We=new E0(x),O=new A0(x),A=new km(V),nt=new x0(V,A),q=new R0(V,A,ve,nt),le=new I0(V,q,A,ve),Be=new N0(V,ge,Pe),Me=new S0(fe),ue=new qy(x,We,O,re,ge,nt,Me),he=new yv(x,fe),He=new Ky,Ee=new nv(re),ye=new v0(x,We,O,ce,le,d,l),Qe=new av(x,le,ge),lt=new vv(V,ve,ge,ce),rt=new b0(V,re,ve),Ye=new L0(V,re,ve),ve.programs=ue.programs,x.capabilities=ge,x.extensions=re,x.properties=fe,x.renderLists=He,x.shadowMap=Qe,x.state=ce,x.info=ve}vt();const st=new gv(x,V);this.xr=st,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){const P=re.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){const P=re.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(P){P!==void 0&&(ne=P,this.setSize($,B,!1))},this.getSize=function(P){return P.set($,B)},this.setSize=function(P,X,Q=!0){if(st.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=P,B=X,t.width=Math.floor(P*ne),t.height=Math.floor(X*ne),Q===!0&&(t.style.width=P+"px",t.style.height=X+"px"),this.setViewport(0,0,P,X)},this.getDrawingBufferSize=function(P){return P.set($*ne,B*ne).floor()},this.setDrawingBufferSize=function(P,X,Q){$=P,B=X,ne=Q,t.width=Math.floor(P*Q),t.height=Math.floor(X*Q),this.setViewport(0,0,P,X)},this.getCurrentViewport=function(P){return P.copy(y)},this.getViewport=function(P){return P.copy(ae)},this.setViewport=function(P,X,Q,K){P.isVector4?ae.set(P.x,P.y,P.z,P.w):ae.set(P,X,Q,K),ce.viewport(y.copy(ae).multiplyScalar(ne).round())},this.getScissor=function(P){return P.copy(pe)},this.setScissor=function(P,X,Q,K){P.isVector4?pe.set(P.x,P.y,P.z,P.w):pe.set(P,X,Q,K),ce.scissor(D.copy(pe).multiplyScalar(ne).round())},this.getScissorTest=function(){return Le},this.setScissorTest=function(P){ce.setScissorTest(Le=P)},this.setOpaqueSort=function(P){G=P},this.setTransparentSort=function(P){se=P},this.getClearColor=function(P){return P.copy(ye.getClearColor())},this.setClearColor=function(){ye.setClearColor.apply(ye,arguments)},this.getClearAlpha=function(){return ye.getClearAlpha()},this.setClearAlpha=function(){ye.setClearAlpha.apply(ye,arguments)},this.clear=function(P=!0,X=!0,Q=!0){let K=0;if(P){let Z=!1;if(C!==null){const Ce=C.texture.format;Z=Ce===Ld||Ce===Rd||Ce===Cd}if(Z){const Ce=C.texture.type,ke=Ce===Ri||Ce===js||Ce===Sd||Ce===Br||Ce===Td||Ce===wd,Ve=ye.getClearColor(),Oe=ye.getClearAlpha(),Ze=Ve.r,tt=Ve.g,ot=Ve.b;ke?(f[0]=Ze,f[1]=tt,f[2]=ot,f[3]=Oe,V.clearBufferuiv(V.COLOR,0,f)):(g[0]=Ze,g[1]=tt,g[2]=ot,g[3]=Oe,V.clearBufferiv(V.COLOR,0,g))}else K|=V.COLOR_BUFFER_BIT}X&&(K|=V.DEPTH_BUFFER_BIT),Q&&(K|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",S,!1),t.removeEventListener("webglcontextrestored",j,!1),t.removeEventListener("webglcontextcreationerror",Y,!1),He.dispose(),Ee.dispose(),fe.dispose(),We.dispose(),O.dispose(),le.dispose(),nt.dispose(),lt.dispose(),ue.dispose(),st.dispose(),st.removeEventListener("sessionstart",ft),st.removeEventListener("sessionend",pt),Et.stop()};function S(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function j(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const P=ve.autoReset,X=Qe.enabled,Q=Qe.autoUpdate,K=Qe.needsUpdate,Z=Qe.type;vt(),ve.autoReset=P,Qe.enabled=X,Qe.autoUpdate=Q,Qe.needsUpdate=K,Qe.type=Z}function Y(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function de(P){const X=P.target;X.removeEventListener("dispose",de),xe(X)}function xe(P){it(P),fe.remove(P)}function it(P){const X=fe.get(P).programs;X!==void 0&&(X.forEach(function(Q){ue.releaseProgram(Q)}),P.isShaderMaterial&&ue.releaseShaderCache(P))}this.renderBufferDirect=function(P,X,Q,K,Z,Ce){X===null&&(X=Ne);const ke=Z.isMesh&&Z.matrixWorld.determinant()<0,Ve=Xr(P,X,Q,K,Z);ce.setMaterial(K,ke);let Oe=Q.index,Ze=1;if(K.wireframe===!0){if(Oe=q.getWireframeAttribute(Q),Oe===void 0)return;Ze=2}const tt=Q.drawRange,ot=Q.attributes.position;let Dt=tt.start*Ze,Bt=(tt.start+tt.count)*Ze;Ce!==null&&(Dt=Math.max(Dt,Ce.start*Ze),Bt=Math.min(Bt,(Ce.start+Ce.count)*Ze)),Oe!==null?(Dt=Math.max(Dt,0),Bt=Math.min(Bt,Oe.count)):ot!=null&&(Dt=Math.max(Dt,0),Bt=Math.min(Bt,ot.count));const Qt=Bt-Dt;if(Qt<0||Qt===1/0)return;nt.setup(Z,K,Ve,Q,Oe);let Mn,mt=rt;if(Oe!==null&&(Mn=A.get(Oe),mt=Ye,mt.setIndex(Mn)),Z.isMesh)K.wireframe===!0?(ce.setLineWidth(K.wireframeLinewidth*qe()),mt.setMode(V.LINES)):mt.setMode(V.TRIANGLES);else if(Z.isLine){let et=K.linewidth;et===void 0&&(et=1),ce.setLineWidth(et*qe()),Z.isLineSegments?mt.setMode(V.LINES):Z.isLineLoop?mt.setMode(V.LINE_LOOP):mt.setMode(V.LINE_STRIP)}else Z.isPoints?mt.setMode(V.POINTS):Z.isSprite&&mt.setMode(V.TRIANGLES);if(Z.isBatchedMesh)Z._multiDrawInstances!==null?mt.renderMultiDrawInstances(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount,Z._multiDrawInstances):mt.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else if(Z.isInstancedMesh)mt.renderInstances(Dt,Qt,Z.count);else if(Q.isInstancedBufferGeometry){const et=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,di=Math.min(Q.instanceCount,et);mt.renderInstances(Dt,Qt,di)}else mt.render(Dt,Qt)};function ct(P,X,Q){P.transparent===!0&&P.side===yn&&P.forceSinglePass===!1?(P.side=ln,P.needsUpdate=!0,cs(P,X,Q),P.side=Hn,P.needsUpdate=!0,cs(P,X,Q),P.side=yn):cs(P,X,Q)}this.compile=function(P,X,Q=null){Q===null&&(Q=P),p=Ee.get(Q),p.init(X),T.push(p),Q.traverseVisible(function(Z){Z.isLight&&Z.layers.test(X.layers)&&(p.pushLight(Z),Z.castShadow&&p.pushShadow(Z))}),P!==Q&&P.traverseVisible(function(Z){Z.isLight&&Z.layers.test(X.layers)&&(p.pushLight(Z),Z.castShadow&&p.pushShadow(Z))}),p.setupLights(x._useLegacyLights);const K=new Set;return P.traverse(function(Z){const Ce=Z.material;if(Ce)if(Array.isArray(Ce))for(let ke=0;ke<Ce.length;ke++){const Ve=Ce[ke];ct(Ve,Q,Z),K.add(Ve)}else ct(Ce,Q,Z),K.add(Ce)}),T.pop(),p=null,K},this.compileAsync=function(P,X,Q=null){const K=this.compile(P,X,Q);return new Promise(Z=>{function Ce(){if(K.forEach(function(ke){fe.get(ke).currentProgram.isReady()&&K.delete(ke)}),K.size===0){Z(P);return}setTimeout(Ce,10)}re.get("KHR_parallel_shader_compile")!==null?Ce():setTimeout(Ce,10)})};let Ct=null;function Ut(P){Ct&&Ct(P)}function ft(){Et.stop()}function pt(){Et.start()}const Et=new Gd;Et.setAnimationLoop(Ut),typeof self<"u"&&Et.setContext(self),this.setAnimationLoop=function(P){Ct=P,st.setAnimationLoop(P),P===null?Et.stop():Et.start()},st.addEventListener("sessionstart",ft),st.addEventListener("sessionend",pt),this.render=function(P,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(st.cameraAutoUpdate===!0&&st.updateCamera(X),X=st.getCamera()),P.isScene===!0&&P.onBeforeRender(x,P,X,C),p=Ee.get(P,T.length),p.init(X),T.push(p),ie.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),Ae.setFromProjectionMatrix(ie),ee=this.localClippingEnabled,W=Me.init(this.clippingPlanes,ee),_=He.get(P,m.length),_.init(),m.push(_),Nn(P,X,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(G,se);const Q=st.enabled===!1||st.isPresenting===!1||st.hasDepthSensing()===!1;Q&&ye.addToRenderList(_,P),this.info.render.frame++,W===!0&&Me.beginShadows();const K=p.state.shadowsArray;Qe.render(K,P,X),W===!0&&Me.endShadows(),this.info.autoReset===!0&&this.info.reset();const Z=_.opaque,Ce=_.transmissive;if(p.setupLights(x._useLegacyLights),X.isArrayCamera){const ke=X.cameras;if(Ce.length>0)for(let Ve=0,Oe=ke.length;Ve<Oe;Ve++){const Ze=ke[Ve];In(Z,Ce,P,Ze)}Q&&ye.render(P);for(let Ve=0,Oe=ke.length;Ve<Oe;Ve++){const Ze=ke[Ve];on(_,P,Ze,Ze.viewport)}}else Ce.length>0&&In(Z,Ce,P,X),Q&&ye.render(P),on(_,P,X);C!==null&&(Pe.updateMultisampleRenderTarget(C),Pe.updateRenderTargetMipmap(C)),P.isScene===!0&&P.onAfterRender(x,P,X),nt.resetDefaultState(),U=-1,M=null,T.pop(),T.length>0?(p=T[T.length-1],W===!0&&Me.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function Nn(P,X,Q,K){if(P.visible===!1)return;if(P.layers.test(X.layers)){if(P.isGroup)Q=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(X);else if(P.isLight)p.pushLight(P),P.castShadow&&p.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||Ae.intersectsSprite(P)){K&&te.setFromMatrixPosition(P.matrixWorld).applyMatrix4(ie);const ke=le.update(P),Ve=P.material;Ve.visible&&_.push(P,ke,Ve,Q,te.z,null)}}else if((P.isMesh||P.isLine||P.isPoints)&&(!P.frustumCulled||Ae.intersectsObject(P))){const ke=le.update(P),Ve=P.material;if(K&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),te.copy(P.boundingSphere.center)):(ke.boundingSphere===null&&ke.computeBoundingSphere(),te.copy(ke.boundingSphere.center)),te.applyMatrix4(P.matrixWorld).applyMatrix4(ie)),Array.isArray(Ve)){const Oe=ke.groups;for(let Ze=0,tt=Oe.length;Ze<tt;Ze++){const ot=Oe[Ze],Dt=Ve[ot.materialIndex];Dt&&Dt.visible&&_.push(P,ke,Dt,Q,te.z,ot)}}else Ve.visible&&_.push(P,ke,Ve,Q,te.z,null)}}const Ce=P.children;for(let ke=0,Ve=Ce.length;ke<Ve;ke++)Nn(Ce[ke],X,Q,K)}function on(P,X,Q,K){const Z=P.opaque,Ce=P.transmissive,ke=P.transparent;p.setupLightsView(Q),W===!0&&Me.setGlobalState(x.clippingPlanes,Q),K&&ce.viewport(y.copy(K)),Z.length>0&&bn(Z,X,Q),Ce.length>0&&bn(Ce,X,Q),ke.length>0&&bn(ke,X,Q),ce.buffers.depth.setTest(!0),ce.buffers.depth.setMask(!0),ce.buffers.color.setMask(!0),ce.setPolygonOffset(!1)}function In(P,X,Q,K){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[K.id]===void 0&&(p.state.transmissionRenderTarget[K.id]=new ts(1,1,{generateMipmaps:!0,type:re.has("EXT_color_buffer_half_float")||re.has("EXT_color_buffer_float")?Qo:Ri,minFilter:Rn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1}));const Ce=p.state.transmissionRenderTarget[K.id],ke=K.viewport||y;Ce.setSize(ke.z,ke.w);const Ve=x.getRenderTarget();x.setRenderTarget(Ce),x.getClearColor(k),z=x.getClearAlpha(),z<1&&x.setClearColor(16777215,.5),x.clear();const Oe=x.toneMapping;x.toneMapping=wi;const Ze=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),p.setupLightsView(K),W===!0&&Me.setGlobalState(x.clippingPlanes,K),bn(P,Q,K),Pe.updateMultisampleRenderTarget(Ce),Pe.updateRenderTargetMipmap(Ce),re.has("WEBGL_multisampled_render_to_texture")===!1){let tt=!1;for(let ot=0,Dt=X.length;ot<Dt;ot++){const Bt=X[ot],Qt=Bt.object,Mn=Bt.geometry,mt=Bt.material,et=Bt.group;if(mt.side===yn&&Qt.layers.test(K.layers)){const di=mt.side;mt.side=ln,mt.needsUpdate=!0,Di(Qt,Q,K,Mn,mt,et),mt.side=di,mt.needsUpdate=!0,tt=!0}}tt===!0&&(Pe.updateMultisampleRenderTarget(Ce),Pe.updateRenderTargetMipmap(Ce))}x.setRenderTarget(Ve),x.setClearColor(k,z),Ze!==void 0&&(K.viewport=Ze),x.toneMapping=Oe}function bn(P,X,Q){const K=X.isScene===!0?X.overrideMaterial:null;for(let Z=0,Ce=P.length;Z<Ce;Z++){const ke=P[Z],Ve=ke.object,Oe=ke.geometry,Ze=K===null?ke.material:K,tt=ke.group;Ve.layers.test(Q.layers)&&Di(Ve,X,Q,Oe,Ze,tt)}}function Di(P,X,Q,K,Z,Ce){P.onBeforeRender(x,X,Q,K,Z,Ce),P.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),Z.onBeforeRender(x,X,Q,K,P,Ce),Z.transparent===!0&&Z.side===yn&&Z.forceSinglePass===!1?(Z.side=ln,Z.needsUpdate=!0,x.renderBufferDirect(Q,X,K,Z,P,Ce),Z.side=Hn,Z.needsUpdate=!0,x.renderBufferDirect(Q,X,K,Z,P,Ce),Z.side=yn):x.renderBufferDirect(Q,X,K,Z,P,Ce),P.onAfterRender(x,X,Q,K,Z,Ce)}function cs(P,X,Q){X.isScene!==!0&&(X=Ne);const K=fe.get(P),Z=p.state.lights,Ce=p.state.shadowsArray,ke=Z.state.version,Ve=ue.getParameters(P,Z.state,Ce,X,Q),Oe=ue.getProgramCacheKey(Ve);let Ze=K.programs;K.environment=P.isMeshStandardMaterial?X.environment:null,K.fog=X.fog,K.envMap=(P.isMeshStandardMaterial?O:We).get(P.envMap||K.environment),K.envMapRotation=K.environment!==null&&P.envMap===null?X.environmentRotation:P.envMapRotation,Ze===void 0&&(P.addEventListener("dispose",de),Ze=new Map,K.programs=Ze);let tt=Ze.get(Oe);if(tt!==void 0){if(K.currentProgram===tt&&K.lightsStateVersion===ke)return jr(P,Ve),tt}else Ve.uniforms=ue.getUniforms(P),P.onBuild(Q,Ve,x),P.onBeforeCompile(Ve,x),tt=ue.acquireProgram(Ve,Oe),Ze.set(Oe,tt),K.uniforms=Ve.uniforms;const ot=K.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(ot.clippingPlanes=Me.uniform),jr(P,Ve),K.needsLights=ya(P),K.lightsStateVersion=ke,K.needsLights&&(ot.ambientLightColor.value=Z.state.ambient,ot.lightProbe.value=Z.state.probe,ot.directionalLights.value=Z.state.directional,ot.directionalLightShadows.value=Z.state.directionalShadow,ot.spotLights.value=Z.state.spot,ot.spotLightShadows.value=Z.state.spotShadow,ot.rectAreaLights.value=Z.state.rectArea,ot.ltc_1.value=Z.state.rectAreaLTC1,ot.ltc_2.value=Z.state.rectAreaLTC2,ot.pointLights.value=Z.state.point,ot.pointLightShadows.value=Z.state.pointShadow,ot.hemisphereLights.value=Z.state.hemi,ot.directionalShadowMap.value=Z.state.directionalShadowMap,ot.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,ot.spotShadowMap.value=Z.state.spotShadowMap,ot.spotLightMatrix.value=Z.state.spotLightMatrix,ot.spotLightMap.value=Z.state.spotLightMap,ot.pointShadowMap.value=Z.state.pointShadowMap,ot.pointShadowMatrix.value=Z.state.pointShadowMatrix),K.currentProgram=tt,K.uniformsList=null,tt}function tr(P){if(P.uniformsList===null){const X=P.currentProgram.getUniforms();P.uniformsList=ko.seqWithValue(X.seq,P.uniforms)}return P.uniformsList}function jr(P,X){const Q=fe.get(P);Q.outputColorSpace=X.outputColorSpace,Q.batching=X.batching,Q.instancing=X.instancing,Q.instancingColor=X.instancingColor,Q.instancingMorph=X.instancingMorph,Q.skinning=X.skinning,Q.morphTargets=X.morphTargets,Q.morphNormals=X.morphNormals,Q.morphColors=X.morphColors,Q.morphTargetsCount=X.morphTargetsCount,Q.numClippingPlanes=X.numClippingPlanes,Q.numIntersection=X.numClipIntersection,Q.vertexAlphas=X.vertexAlphas,Q.vertexTangents=X.vertexTangents,Q.toneMapping=X.toneMapping}function Xr(P,X,Q,K,Z){X.isScene!==!0&&(X=Ne),Pe.resetTextureUnits();const Ce=X.fog,ke=K.isMeshStandardMaterial?X.environment:null,Ve=C===null?x.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Yt,Oe=(K.isMeshStandardMaterial?O:We).get(K.envMap||ke),Ze=K.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,tt=!!Q.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),ot=!!Q.morphAttributes.position,Dt=!!Q.morphAttributes.normal,Bt=!!Q.morphAttributes.color;let Qt=wi;K.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Qt=x.toneMapping);const Mn=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,mt=Mn!==void 0?Mn.length:0,et=fe.get(K),di=p.state.lights;if(W===!0&&(ee===!0||P!==M)){const en=P===M&&K.id===U;Me.setState(K,P,en)}let yt=!1;K.version===et.__version?(et.needsLights&&et.lightsStateVersion!==di.state.version||et.outputColorSpace!==Ve||Z.isBatchedMesh&&et.batching===!1||!Z.isBatchedMesh&&et.batching===!0||Z.isInstancedMesh&&et.instancing===!1||!Z.isInstancedMesh&&et.instancing===!0||Z.isSkinnedMesh&&et.skinning===!1||!Z.isSkinnedMesh&&et.skinning===!0||Z.isInstancedMesh&&et.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&et.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&et.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&et.instancingMorph===!1&&Z.morphTexture!==null||et.envMap!==Oe||K.fog===!0&&et.fog!==Ce||et.numClippingPlanes!==void 0&&(et.numClippingPlanes!==Me.numPlanes||et.numIntersection!==Me.numIntersection)||et.vertexAlphas!==Ze||et.vertexTangents!==tt||et.morphTargets!==ot||et.morphNormals!==Dt||et.morphColors!==Bt||et.toneMapping!==Qt||et.morphTargetsCount!==mt)&&(yt=!0):(yt=!0,et.__version=K.version);let $n=et.currentProgram;yt===!0&&($n=cs(K,X,Z));let nr=!1,Ui=!1,hs=!1;const Wt=$n.getUniforms(),Dn=et.uniforms;if(ce.useProgram($n.program)&&(nr=!0,Ui=!0,hs=!0),K.id!==U&&(U=K.id,Ui=!0),nr||M!==P){Wt.setValue(V,"projectionMatrix",P.projectionMatrix),Wt.setValue(V,"viewMatrix",P.matrixWorldInverse);const en=Wt.map.cameraPosition;en!==void 0&&en.setValue(V,te.setFromMatrixPosition(P.matrixWorld)),ge.logarithmicDepthBuffer&&Wt.setValue(V,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&Wt.setValue(V,"isOrthographic",P.isOrthographicCamera===!0),M!==P&&(M=P,Ui=!0,hs=!0)}if(Z.isSkinnedMesh){Wt.setOptional(V,Z,"bindMatrix"),Wt.setOptional(V,Z,"bindMatrixInverse");const en=Z.skeleton;en&&(en.boneTexture===null&&en.computeBoneTexture(),Wt.setValue(V,"boneTexture",en.boneTexture,Pe))}Z.isBatchedMesh&&(Wt.setOptional(V,Z,"batchingTexture"),Wt.setValue(V,"batchingTexture",Z._matricesTexture,Pe));const ir=Q.morphAttributes;if((ir.position!==void 0||ir.normal!==void 0||ir.color!==void 0)&&Be.update(Z,Q,$n),(Ui||et.receiveShadow!==Z.receiveShadow)&&(et.receiveShadow=Z.receiveShadow,Wt.setValue(V,"receiveShadow",Z.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(Dn.envMap.value=Oe,Dn.flipEnvMap.value=Oe.isCubeTexture&&Oe.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&X.environment!==null&&(Dn.envMapIntensity.value=X.environmentIntensity),Ui&&(Wt.setValue(V,"toneMappingExposure",x.toneMappingExposure),et.needsLights&&_a(Dn,hs),Ce&&K.fog===!0&&he.refreshFogUniforms(Dn,Ce),he.refreshMaterialUniforms(Dn,K,ne,B,p.state.transmissionRenderTarget[P.id]),ko.upload(V,tr(et),Dn,Pe)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(ko.upload(V,tr(et),Dn,Pe),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&Wt.setValue(V,"center",Z.center),Wt.setValue(V,"modelViewMatrix",Z.modelViewMatrix),Wt.setValue(V,"normalMatrix",Z.normalMatrix),Wt.setValue(V,"modelMatrix",Z.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const en=K.uniformsGroups;for(let Lt=0,sr=en.length;Lt<sr;Lt++){const qr=en[Lt];lt.update(qr,$n),lt.bind(qr,$n)}}return $n}function _a(P,X){P.ambientLightColor.needsUpdate=X,P.lightProbe.needsUpdate=X,P.directionalLights.needsUpdate=X,P.directionalLightShadows.needsUpdate=X,P.pointLights.needsUpdate=X,P.pointLightShadows.needsUpdate=X,P.spotLights.needsUpdate=X,P.spotLightShadows.needsUpdate=X,P.rectAreaLights.needsUpdate=X,P.hemisphereLights.needsUpdate=X}function ya(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(P,X,Q){fe.get(P.texture).__webglTexture=X,fe.get(P.depthTexture).__webglTexture=Q;const K=fe.get(P);K.__hasExternalTextures=!0,K.__autoAllocateDepthBuffer=Q===void 0,K.__autoAllocateDepthBuffer||re.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),K.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(P,X){const Q=fe.get(P);Q.__webglFramebuffer=X,Q.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(P,X=0,Q=0){C=P,I=X,N=Q;let K=!0,Z=null,Ce=!1,ke=!1;if(P){const Oe=fe.get(P);Oe.__useDefaultFramebuffer!==void 0?(ce.bindFramebuffer(V.FRAMEBUFFER,null),K=!1):Oe.__webglFramebuffer===void 0?Pe.setupRenderTarget(P):Oe.__hasExternalTextures&&Pe.rebindTextures(P,fe.get(P.texture).__webglTexture,fe.get(P.depthTexture).__webglTexture);const Ze=P.texture;(Ze.isData3DTexture||Ze.isDataArrayTexture||Ze.isCompressedArrayTexture)&&(ke=!0);const tt=fe.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(tt[X])?Z=tt[X][Q]:Z=tt[X],Ce=!0):P.samples>0&&Pe.useMultisampledRTT(P)===!1?Z=fe.get(P).__webglMultisampledFramebuffer:Array.isArray(tt)?Z=tt[Q]:Z=tt,y.copy(P.viewport),D.copy(P.scissor),H=P.scissorTest}else y.copy(ae).multiplyScalar(ne).floor(),D.copy(pe).multiplyScalar(ne).floor(),H=Le;if(ce.bindFramebuffer(V.FRAMEBUFFER,Z)&&K&&ce.drawBuffers(P,Z),ce.viewport(y),ce.scissor(D),ce.setScissorTest(H),Ce){const Oe=fe.get(P.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+X,Oe.__webglTexture,Q)}else if(ke){const Oe=fe.get(P.texture),Ze=X||0;V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,Oe.__webglTexture,Q||0,Ze)}U=-1},this.readRenderTargetPixels=function(P,X,Q,K,Z,Ce,ke){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ve=fe.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&ke!==void 0&&(Ve=Ve[ke]),Ve){ce.bindFramebuffer(V.FRAMEBUFFER,Ve);try{const Oe=P.texture,Ze=Oe.format,tt=Oe.type;if(!ge.textureFormatReadable(Ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ge.textureTypeReadable(tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=P.width-K&&Q>=0&&Q<=P.height-Z&&V.readPixels(X,Q,K,Z,Ie.convert(Ze),Ie.convert(tt),Ce)}finally{const Oe=C!==null?fe.get(C).__webglFramebuffer:null;ce.bindFramebuffer(V.FRAMEBUFFER,Oe)}}},this.copyFramebufferToTexture=function(P,X,Q=0){const K=Math.pow(2,-Q),Z=Math.floor(X.image.width*K),Ce=Math.floor(X.image.height*K);Pe.setTexture2D(X,0),V.copyTexSubImage2D(V.TEXTURE_2D,Q,0,0,P.x,P.y,Z,Ce),ce.unbindTexture()},this.copyTextureToTexture=function(P,X,Q,K=0){const Z=X.image.width,Ce=X.image.height,ke=Ie.convert(Q.format),Ve=Ie.convert(Q.type);Pe.setTexture2D(Q,0),V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,Q.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,Q.unpackAlignment),X.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,K,P.x,P.y,Z,Ce,ke,Ve,X.image.data):X.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,K,P.x,P.y,X.mipmaps[0].width,X.mipmaps[0].height,ke,X.mipmaps[0].data):V.texSubImage2D(V.TEXTURE_2D,K,P.x,P.y,ke,Ve,X.image),K===0&&Q.generateMipmaps&&V.generateMipmap(V.TEXTURE_2D),ce.unbindTexture()},this.copyTextureToTexture3D=function(P,X,Q,K,Z=0){const Ce=P.max.x-P.min.x,ke=P.max.y-P.min.y,Ve=P.max.z-P.min.z,Oe=Ie.convert(K.format),Ze=Ie.convert(K.type);let tt;if(K.isData3DTexture)Pe.setTexture3D(K,0),tt=V.TEXTURE_3D;else if(K.isDataArrayTexture||K.isCompressedArrayTexture)Pe.setTexture2DArray(K,0),tt=V.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,K.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,K.unpackAlignment);const ot=V.getParameter(V.UNPACK_ROW_LENGTH),Dt=V.getParameter(V.UNPACK_IMAGE_HEIGHT),Bt=V.getParameter(V.UNPACK_SKIP_PIXELS),Qt=V.getParameter(V.UNPACK_SKIP_ROWS),Mn=V.getParameter(V.UNPACK_SKIP_IMAGES),mt=Q.isCompressedTexture?Q.mipmaps[Z]:Q.image;V.pixelStorei(V.UNPACK_ROW_LENGTH,mt.width),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,mt.height),V.pixelStorei(V.UNPACK_SKIP_PIXELS,P.min.x),V.pixelStorei(V.UNPACK_SKIP_ROWS,P.min.y),V.pixelStorei(V.UNPACK_SKIP_IMAGES,P.min.z),Q.isDataTexture||Q.isData3DTexture?V.texSubImage3D(tt,Z,X.x,X.y,X.z,Ce,ke,Ve,Oe,Ze,mt.data):K.isCompressedArrayTexture?V.compressedTexSubImage3D(tt,Z,X.x,X.y,X.z,Ce,ke,Ve,Oe,mt.data):V.texSubImage3D(tt,Z,X.x,X.y,X.z,Ce,ke,Ve,Oe,Ze,mt),V.pixelStorei(V.UNPACK_ROW_LENGTH,ot),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,Dt),V.pixelStorei(V.UNPACK_SKIP_PIXELS,Bt),V.pixelStorei(V.UNPACK_SKIP_ROWS,Qt),V.pixelStorei(V.UNPACK_SKIP_IMAGES,Mn),Z===0&&K.generateMipmaps&&V.generateMipmap(tt),ce.unbindTexture()},this.initTexture=function(P){P.isCubeTexture?Pe.setTextureCube(P,0):P.isData3DTexture?Pe.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?Pe.setTexture2DArray(P,0):Pe.setTexture2D(P,0),ce.unbindTexture()},this.resetState=function(){I=0,N=0,C=null,ce.reset(),nt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Gl?"display-p3":"srgb",t.unpackColorSpace=xt.workingColorSpace===ta?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Kd extends At{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new rn,this.environmentIntensity=1,this.environmentRotation=new rn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class bv{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Tl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=xn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Dd("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const tn=new F;class $l{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyMatrix4(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyNormalMatrix(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.transformDirection(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Cn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Mt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Cn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Cn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Cn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Cn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),i=Mt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),i=Mt(i,this.array),r=Mt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new It(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new $l(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const au=new F,lu=new wt,cu=new wt,Mv=new F,hu=new $e,vo=new F,Za=new Pn,uu=new $e,Ja=new Ks;class Zd extends kt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Hc,this.bindMatrix=new $e,this.bindMatrixInverse=new $e,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Wn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,vo),this.boundingBox.expandByPoint(vo)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Pn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,vo),this.boundingSphere.expandByPoint(vo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Za.copy(this.boundingSphere),Za.applyMatrix4(i),e.ray.intersectsSphere(Za)!==!1&&(uu.copy(i).invert(),Ja.copy(e.ray).applyMatrix4(uu),!(this.boundingBox!==null&&Ja.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ja)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new wt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Hc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Rp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;lu.fromBufferAttribute(i.attributes.skinIndex,e),cu.fromBufferAttribute(i.attributes.skinWeight,e),au.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=cu.getComponent(r);if(o!==0){const a=lu.getComponent(r);hu.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Mv.copy(au).applyMatrix4(hu),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Yl extends At{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Kl extends Ht{constructor(e=null,t=1,n=1,i,r,o,a,l,c=sn,h=sn,u,d){super(null,o,a,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const du=new $e,Sv=new $e;class sa{constructor(e=[],t=[]){this.uuid=xn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new $e)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new $e;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:Sv;du.multiplyMatrices(a,t[r]),du.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new sa(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Kl(t,e,e,Ln,Bn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Yl),this.bones.push(o),this.boneInverses.push(new $e().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class Al extends It{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ps=new $e,fu=new $e,xo=[],pu=new Wn,Ev=new $e,cr=new kt,hr=new Pn;class Tv extends kt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Al(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Ev)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Wn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ps),pu.copy(e.boundingBox).applyMatrix4(Ps),this.boundingBox.union(pu)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Pn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ps),hr.copy(e.boundingSphere).applyMatrix4(Ps),this.boundingSphere.union(hr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(cr.geometry=this.geometry,cr.material=this.material,cr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),hr.copy(this.boundingSphere),hr.applyMatrix4(n),e.ray.intersectsSphere(hr)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Ps),fu.multiplyMatrices(n,Ps),cr.matrixWorld=fu,cr.raycast(e,xo);for(let o=0,a=xo.length;o<a;o++){const l=xo[o];l.instanceId=r,l.object=this,t.push(l)}xo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Al(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Kl(new Float32Array(i*this.count),i,this.count,Ad,Bn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Pr extends un{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Xe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const qo=new F,$o=new F,mu=new $e,ur=new Ks,bo=new Pn,Qa=new F,gu=new F;class ra extends At{constructor(e=new Xt,t=new Pr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)qo.fromBufferAttribute(t,i-1),$o.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=qo.distanceTo($o);e.setAttribute("lineDistance",new Tt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),bo.copy(n.boundingSphere),bo.applyMatrix4(i),bo.radius+=r,e.ray.intersectsSphere(bo)===!1)return;mu.copy(i).invert(),ur.copy(e.ray).applyMatrix4(mu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=f,p=g-1;_<p;_+=c){const m=h.getX(_),T=h.getX(_+1),x=Mo(this,e,ur,l,m,T);x&&t.push(x)}if(this.isLineLoop){const _=h.getX(g-1),p=h.getX(f),m=Mo(this,e,ur,l,_,p);m&&t.push(m)}}else{const f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let _=f,p=g-1;_<p;_+=c){const m=Mo(this,e,ur,l,_,_+1);m&&t.push(m)}if(this.isLineLoop){const _=Mo(this,e,ur,l,g-1,f);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Mo(s,e,t,n,i,r){const o=s.geometry.attributes.position;if(qo.fromBufferAttribute(o,i),$o.fromBufferAttribute(o,r),t.distanceSqToSegment(qo,$o,Qa,gu)>n)return;Qa.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(Qa);if(!(l<e.near||l>e.far))return{distance:l,point:gu.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,object:s}}const _u=new F,yu=new F;class Zl extends ra{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)_u.fromBufferAttribute(t,i),yu.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+_u.distanceTo(yu);e.setAttribute("lineDistance",new Tt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class wv extends ra{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Jd extends un{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const vu=new $e,Cl=new Ks,So=new Pn,Eo=new F;class Av extends At{constructor(e=new Xt,t=new Jd){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),So.copy(n.boundingSphere),So.applyMatrix4(i),So.radius+=r,e.ray.intersectsSphere(So)===!1)return;vu.copy(i).invert(),Cl.copy(e.ray).applyMatrix4(vu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,_=f;g<_;g++){const p=c.getX(g);Eo.fromBufferAttribute(u,p),xu(Eo,p,l,i,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,_=f;g<_;g++)Eo.fromBufferAttribute(u,g),xu(Eo,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function xu(s,e,t,n,i,r,o){const a=Cl.distanceSqToPoint(s);if(a<t){const l=new F;Cl.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class jn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);const h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),l=t||(o.isVector2?new _e:new F);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new F,i=[],r=[],o=[],a=new F,l=new $e;for(let f=0;f<=e;f++){const g=f/e;i[f]=this.getTangentAt(g,new F)}r[0]=new F,o[0]=new F;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(zt(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(zt(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Jl extends jn{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new _e){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Cv extends Jl{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Ql(){let s=0,e=0,t=0,n=0;function i(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return s+e*r+t*o+n*a}}}const To=new F,el=new Ql,tl=new Ql,nl=new Ql;class Rv extends jn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new F){const n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(To.subVectors(i[0],i[1]).add(i[0]),c=To);const u=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(To.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=To),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),p=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),p<1e-4&&(p=_),el.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,_,p),tl.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,_,p),nl.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,_,p)}else this.curveType==="catmullrom"&&(el.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),tl.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),nl.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(el.calc(l),tl.calc(l),nl.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new F().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function bu(s,e,t,n,i){const r=(n-e)*.5,o=(i-t)*.5,a=s*s,l=s*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*s+t}function Lv(s,e){const t=1-s;return t*t*e}function Pv(s,e){return 2*(1-s)*s*e}function Nv(s,e){return s*s*e}function br(s,e,t,n){return Lv(s,e)+Pv(s,t)+Nv(s,n)}function Iv(s,e){const t=1-s;return t*t*t*e}function Dv(s,e){const t=1-s;return 3*t*t*s*e}function Uv(s,e){return 3*(1-s)*s*s*e}function Ov(s,e){return s*s*s*e}function Mr(s,e,t,n,i){return Iv(s,e)+Dv(s,t)+Uv(s,n)+Ov(s,i)}class Qd extends jn{constructor(e=new _e,t=new _e,n=new _e,i=new _e){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new _e){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Mr(e,i.x,r.x,o.x,a.x),Mr(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Fv extends jn{constructor(e=new F,t=new F,n=new F,i=new F){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new F){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Mr(e,i.x,r.x,o.x,a.x),Mr(e,i.y,r.y,o.y,a.y),Mr(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class ef extends jn{constructor(e=new _e,t=new _e){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new _e){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new _e){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class kv extends jn{constructor(e=new F,t=new F){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new F){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new F){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class tf extends jn{constructor(e=new _e,t=new _e,n=new _e){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new _e){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(br(e,i.x,r.x,o.x),br(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Bv extends jn{constructor(e=new F,t=new F,n=new F){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new F){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(br(e,i.x,r.x,o.x),br(e,i.y,r.y,o.y),br(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class nf extends jn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new _e){const n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(bu(a,l.x,c.x,h.x,u.x),bu(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new _e().fromArray(i))}return this}}var Rl=Object.freeze({__proto__:null,ArcCurve:Cv,CatmullRomCurve3:Rv,CubicBezierCurve:Qd,CubicBezierCurve3:Fv,EllipseCurve:Jl,LineCurve:ef,LineCurve3:kv,QuadraticBezierCurve:tf,QuadraticBezierCurve3:Bv,SplineCurve:nf});class zv extends jn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Rl[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Rl[i.type]().fromJSON(i))}return this}}class Sr extends zv{constructor(e){super(),this.type="Path",this.currentPoint=new _e,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new ef(this.currentPoint.clone(),new _e(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const r=new tf(this.currentPoint.clone(),new _e(e,t),new _e(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){const a=new Qd(this.currentPoint.clone(),new _e(e,t),new _e(n,i),new _e(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new nf(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,o,a,l),this}absellipse(e,t,n,i,r,o,a,l){const c=new Jl(e,t,n,i,r,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class ec extends Xt{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const _=[],p=n/2;let m=0;T(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new Tt(u,3)),this.setAttribute("normal",new Tt(d,3)),this.setAttribute("uv",new Tt(f,2));function T(){const E=new F,I=new F;let N=0;const C=(t-e)/n;for(let U=0;U<=r;U++){const M=[],y=U/r,D=y*(t-e)+e;for(let H=0;H<=i;H++){const k=H/i,z=k*l+a,$=Math.sin(z),B=Math.cos(z);I.x=D*$,I.y=-y*n+p,I.z=D*B,u.push(I.x,I.y,I.z),E.set($,C,B).normalize(),d.push(E.x,E.y,E.z),f.push(k,1-y),M.push(g++)}_.push(M)}for(let U=0;U<i;U++)for(let M=0;M<r;M++){const y=_[M][U],D=_[M+1][U],H=_[M+1][U+1],k=_[M][U+1];h.push(y,D,k),h.push(D,H,k),N+=6}c.addGroup(m,N,0),m+=N}function x(E){const I=g,N=new _e,C=new F;let U=0;const M=E===!0?e:t,y=E===!0?1:-1;for(let H=1;H<=i;H++)u.push(0,p*y,0),d.push(0,y,0),f.push(.5,.5),g++;const D=g;for(let H=0;H<=i;H++){const z=H/i*l+a,$=Math.cos(z),B=Math.sin(z);C.x=M*B,C.y=p*y,C.z=M*$,u.push(C.x,C.y,C.z),d.push(0,y,0),N.x=$*.5+.5,N.y=B*.5*y+.5,f.push(N.x,N.y),g++}for(let H=0;H<i;H++){const k=I+H,z=D+H;E===!0?h.push(z,z+1,k):h.push(z+1,z,k),U+=3}c.addGroup(m,U,E===!0?1:2),m+=U}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ec(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class sf extends Sr{constructor(e){super(e),this.uuid=xn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new Sr().fromJSON(i))}return this}}const Hv={triangulate:function(s,e,t=2){const n=e&&e.length,i=n?e[0]*t:s.length;let r=rf(s,0,i,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c,h,u,d,f;if(n&&(r=Xv(s,e,r,t)),s.length>80*t){a=c=s[0],l=h=s[1];for(let g=t;g<i;g+=t)u=s[g],d=s[g+1],u<a&&(a=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-a,h-l),f=f!==0?32767/f:0}return Nr(r,o,t,a,l,f,0),o}};function rf(s,e,t,n,i){let r,o;if(i===ix(s,e,t,n)>0)for(r=e;r<t;r+=n)o=Mu(r,s[r],s[r+1],o);else for(r=t-n;r>=e;r-=n)o=Mu(r,s[r],s[r+1],o);return o&&oa(o,o.next)&&(Dr(o),o=o.next),o}function ns(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(oa(t,t.next)||Nt(t.prev,t,t.next)===0)){if(Dr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Nr(s,e,t,n,i,r,o){if(!s)return;!o&&r&&Zv(s,n,i,r);let a=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?Gv(s,n,i,r):Vv(s)){e.push(l.i/t|0),e.push(s.i/t|0),e.push(c.i/t|0),Dr(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=Wv(ns(s),e,t),Nr(s,e,t,n,i,r,2)):o===2&&jv(s,e,t,n,i,r):Nr(ns(s),e,t,n,i,r,1);break}}}function Vv(s){const e=s.prev,t=s,n=s.next;if(Nt(e,t,n)>=0)return!1;const i=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,h=i<r?i<o?i:o:r<o?r:o,u=a<l?a<c?a:c:l<c?l:c,d=i>r?i>o?i:o:r>o?r:o,f=a>l?a>c?a:c:l>c?l:c;let g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&Is(i,a,r,l,o,c,g.x,g.y)&&Nt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Gv(s,e,t,n){const i=s.prev,r=s,o=s.next;if(Nt(i,r,o)>=0)return!1;const a=i.x,l=r.x,c=o.x,h=i.y,u=r.y,d=o.y,f=a<l?a<c?a:c:l<c?l:c,g=h<u?h<d?h:d:u<d?u:d,_=a>l?a>c?a:c:l>c?l:c,p=h>u?h>d?h:d:u>d?u:d,m=Ll(f,g,e,t,n),T=Ll(_,p,e,t,n);let x=s.prevZ,E=s.nextZ;for(;x&&x.z>=m&&E&&E.z<=T;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=p&&x!==i&&x!==o&&Is(a,h,l,u,c,d,x.x,x.y)&&Nt(x.prev,x,x.next)>=0||(x=x.prevZ,E.x>=f&&E.x<=_&&E.y>=g&&E.y<=p&&E!==i&&E!==o&&Is(a,h,l,u,c,d,E.x,E.y)&&Nt(E.prev,E,E.next)>=0))return!1;E=E.nextZ}for(;x&&x.z>=m;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=p&&x!==i&&x!==o&&Is(a,h,l,u,c,d,x.x,x.y)&&Nt(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;E&&E.z<=T;){if(E.x>=f&&E.x<=_&&E.y>=g&&E.y<=p&&E!==i&&E!==o&&Is(a,h,l,u,c,d,E.x,E.y)&&Nt(E.prev,E,E.next)>=0)return!1;E=E.nextZ}return!0}function Wv(s,e,t){let n=s;do{const i=n.prev,r=n.next.next;!oa(i,r)&&of(i,n,n.next,r)&&Ir(i,r)&&Ir(r,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),Dr(n),Dr(n.next),n=s=r),n=n.next}while(n!==s);return ns(n)}function jv(s,e,t,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&ex(o,a)){let l=af(o,a);o=ns(o,o.next),l=ns(l,l.next),Nr(o,e,t,n,i,r,0),Nr(l,e,t,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function Xv(s,e,t,n){const i=[];let r,o,a,l,c;for(r=0,o=e.length;r<o;r++)a=e[r]*n,l=r<o-1?e[r+1]*n:s.length,c=rf(s,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(Qv(c));for(i.sort(qv),r=0;r<i.length;r++)t=$v(i[r],t);return t}function qv(s,e){return s.x-e.x}function $v(s,e){const t=Yv(s,e);if(!t)return e;const n=af(t,s);return ns(n,n.next),ns(t,t.next)}function Yv(s,e){let t=e,n=-1/0,i;const r=s.x,o=s.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const d=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=r&&d>n&&(n=d,i=t.x<t.next.x?t:t.next,d===r))return i}t=t.next}while(t!==e);if(!i)return null;const a=i,l=i.x,c=i.y;let h=1/0,u;t=i;do r>=t.x&&t.x>=l&&r!==t.x&&Is(o<c?r:n,o,l,c,o<c?n:r,o,t.x,t.y)&&(u=Math.abs(o-t.y)/(r-t.x),Ir(t,s)&&(u<h||u===h&&(t.x>i.x||t.x===i.x&&Kv(i,t)))&&(i=t,h=u)),t=t.next;while(t!==a);return i}function Kv(s,e){return Nt(s.prev,s,e.prev)<0&&Nt(e.next,s,s.next)<0}function Zv(s,e,t,n){let i=s;do i.z===0&&(i.z=Ll(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Jv(i)}function Jv(s){let e,t,n,i,r,o,a,l,c=1;do{for(t=s,s=null,r=null,o=0;t;){for(o++,n=t,a=0,e=0;e<c&&(a++,n=n.nextZ,!!n);e++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,a--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;t=n}r.nextZ=null,c*=2}while(o>1);return s}function Ll(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function Qv(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function Is(s,e,t,n,i,r,o,a){return(i-o)*(e-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(i-o)*(n-a)}function ex(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!tx(s,e)&&(Ir(s,e)&&Ir(e,s)&&nx(s,e)&&(Nt(s.prev,s,e.prev)||Nt(s,e.prev,e))||oa(s,e)&&Nt(s.prev,s,s.next)>0&&Nt(e.prev,e,e.next)>0)}function Nt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function oa(s,e){return s.x===e.x&&s.y===e.y}function of(s,e,t,n){const i=Ao(Nt(s,e,t)),r=Ao(Nt(s,e,n)),o=Ao(Nt(t,n,s)),a=Ao(Nt(t,n,e));return!!(i!==r&&o!==a||i===0&&wo(s,t,e)||r===0&&wo(s,n,e)||o===0&&wo(t,s,n)||a===0&&wo(t,e,n))}function wo(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function Ao(s){return s>0?1:s<0?-1:0}function tx(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&of(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function Ir(s,e){return Nt(s.prev,s,s.next)<0?Nt(s,e,s.next)>=0&&Nt(s,s.prev,e)>=0:Nt(s,e,s.prev)<0||Nt(s,s.next,e)<0}function nx(s,e){let t=s,n=!1;const i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function af(s,e){const t=new Pl(s.i,s.x,s.y),n=new Pl(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Mu(s,e,t,n){const i=new Pl(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Dr(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Pl(s,e,t){this.i=s,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function ix(s,e,t,n){let i=0;for(let r=e,o=t-n;r<t;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}class Er{static area(e){const t=e.length;let n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return Er.area(e)<0}static triangulateShape(e,t){const n=[],i=[],r=[];Su(e),Eu(n,e);let o=e.length;t.forEach(Su);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,Eu(n,t[l]);const a=Hv.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function Su(s){const e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function Eu(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}class tc extends Xt{constructor(e=new sf([new _e(.5,.5),new _e(-.5,.5),new _e(-.5,-.5),new _e(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],r=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new Tt(i,3)),this.setAttribute("uv",new Tt(r,2)),this.computeVertexNormals();function o(a){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,p=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,T=t.UVGenerator!==void 0?t.UVGenerator:sx;let x,E=!1,I,N,C,U;m&&(x=m.getSpacedPoints(h),E=!0,d=!1,I=m.computeFrenetFrames(h,!1),N=new F,C=new F,U=new F),d||(p=0,f=0,g=0,_=0);const M=a.extractPoints(c);let y=M.shape;const D=M.holes;if(!Er.isClockWise(y)){y=y.reverse();for(let re=0,ge=D.length;re<ge;re++){const ce=D[re];Er.isClockWise(ce)&&(D[re]=ce.reverse())}}const k=Er.triangulateShape(y,D),z=y;for(let re=0,ge=D.length;re<ge;re++){const ce=D[re];y=y.concat(ce)}function $(re,ge,ce){return ge||console.error("THREE.ExtrudeGeometry: vec does not exist"),re.clone().addScaledVector(ge,ce)}const B=y.length,ne=k.length;function G(re,ge,ce){let ve,fe,Pe;const We=re.x-ge.x,O=re.y-ge.y,A=ce.x-re.x,q=ce.y-re.y,le=We*We+O*O,ue=We*q-O*A;if(Math.abs(ue)>Number.EPSILON){const he=Math.sqrt(le),He=Math.sqrt(A*A+q*q),Ee=ge.x-O/he,Me=ge.y+We/he,Qe=ce.x-q/He,ye=ce.y+A/He,Be=((Qe-Ee)*q-(ye-Me)*A)/(We*q-O*A);ve=Ee+We*Be-re.x,fe=Me+O*Be-re.y;const rt=ve*ve+fe*fe;if(rt<=2)return new _e(ve,fe);Pe=Math.sqrt(rt/2)}else{let he=!1;We>Number.EPSILON?A>Number.EPSILON&&(he=!0):We<-Number.EPSILON?A<-Number.EPSILON&&(he=!0):Math.sign(O)===Math.sign(q)&&(he=!0),he?(ve=-O,fe=We,Pe=Math.sqrt(le)):(ve=We,fe=O,Pe=Math.sqrt(le/2))}return new _e(ve/Pe,fe/Pe)}const se=[];for(let re=0,ge=z.length,ce=ge-1,ve=re+1;re<ge;re++,ce++,ve++)ce===ge&&(ce=0),ve===ge&&(ve=0),se[re]=G(z[re],z[ce],z[ve]);const ae=[];let pe,Le=se.concat();for(let re=0,ge=D.length;re<ge;re++){const ce=D[re];pe=[];for(let ve=0,fe=ce.length,Pe=fe-1,We=ve+1;ve<fe;ve++,Pe++,We++)Pe===fe&&(Pe=0),We===fe&&(We=0),pe[ve]=G(ce[ve],ce[Pe],ce[We]);ae.push(pe),Le=Le.concat(pe)}for(let re=0;re<p;re++){const ge=re/p,ce=f*Math.cos(ge*Math.PI/2),ve=g*Math.sin(ge*Math.PI/2)+_;for(let fe=0,Pe=z.length;fe<Pe;fe++){const We=$(z[fe],se[fe],ve);te(We.x,We.y,-ce)}for(let fe=0,Pe=D.length;fe<Pe;fe++){const We=D[fe];pe=ae[fe];for(let O=0,A=We.length;O<A;O++){const q=$(We[O],pe[O],ve);te(q.x,q.y,-ce)}}}const Ae=g+_;for(let re=0;re<B;re++){const ge=d?$(y[re],Le[re],Ae):y[re];E?(C.copy(I.normals[0]).multiplyScalar(ge.x),N.copy(I.binormals[0]).multiplyScalar(ge.y),U.copy(x[0]).add(C).add(N),te(U.x,U.y,U.z)):te(ge.x,ge.y,0)}for(let re=1;re<=h;re++)for(let ge=0;ge<B;ge++){const ce=d?$(y[ge],Le[ge],Ae):y[ge];E?(C.copy(I.normals[re]).multiplyScalar(ce.x),N.copy(I.binormals[re]).multiplyScalar(ce.y),U.copy(x[re]).add(C).add(N),te(U.x,U.y,U.z)):te(ce.x,ce.y,u/h*re)}for(let re=p-1;re>=0;re--){const ge=re/p,ce=f*Math.cos(ge*Math.PI/2),ve=g*Math.sin(ge*Math.PI/2)+_;for(let fe=0,Pe=z.length;fe<Pe;fe++){const We=$(z[fe],se[fe],ve);te(We.x,We.y,u+ce)}for(let fe=0,Pe=D.length;fe<Pe;fe++){const We=D[fe];pe=ae[fe];for(let O=0,A=We.length;O<A;O++){const q=$(We[O],pe[O],ve);E?te(q.x,q.y+x[h-1].y,x[h-1].x+ce):te(q.x,q.y,u+ce)}}}W(),ee();function W(){const re=i.length/3;if(d){let ge=0,ce=B*ge;for(let ve=0;ve<ne;ve++){const fe=k[ve];Ne(fe[2]+ce,fe[1]+ce,fe[0]+ce)}ge=h+p*2,ce=B*ge;for(let ve=0;ve<ne;ve++){const fe=k[ve];Ne(fe[0]+ce,fe[1]+ce,fe[2]+ce)}}else{for(let ge=0;ge<ne;ge++){const ce=k[ge];Ne(ce[2],ce[1],ce[0])}for(let ge=0;ge<ne;ge++){const ce=k[ge];Ne(ce[0]+B*h,ce[1]+B*h,ce[2]+B*h)}}n.addGroup(re,i.length/3-re,0)}function ee(){const re=i.length/3;let ge=0;ie(z,ge),ge+=z.length;for(let ce=0,ve=D.length;ce<ve;ce++){const fe=D[ce];ie(fe,ge),ge+=fe.length}n.addGroup(re,i.length/3-re,1)}function ie(re,ge){let ce=re.length;for(;--ce>=0;){const ve=ce;let fe=ce-1;fe<0&&(fe=re.length-1);for(let Pe=0,We=h+p*2;Pe<We;Pe++){const O=B*Pe,A=B*(Pe+1),q=ge+ve+O,le=ge+fe+O,ue=ge+fe+A,he=ge+ve+A;qe(q,le,ue,he)}}}function te(re,ge,ce){l.push(re),l.push(ge),l.push(ce)}function Ne(re,ge,ce){V(re),V(ge),V(ce);const ve=i.length/3,fe=T.generateTopUV(n,i,ve-3,ve-2,ve-1);at(fe[0]),at(fe[1]),at(fe[2])}function qe(re,ge,ce,ve){V(re),V(ge),V(ve),V(ge),V(ce),V(ve);const fe=i.length/3,Pe=T.generateSideWallUV(n,i,fe-6,fe-3,fe-2,fe-1);at(Pe[0]),at(Pe[1]),at(Pe[3]),at(Pe[1]),at(Pe[2]),at(Pe[3])}function V(re){i.push(l[re*3+0]),i.push(l[re*3+1]),i.push(l[re*3+2])}function at(re){r.push(re.x),r.push(re.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return rx(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,o=e.shapes.length;r<o;r++){const a=t[e.shapes[r]];n.push(a)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Rl[i.type]().fromJSON(i)),new tc(n,e.options)}}const sx={generateTopUV:function(s,e,t,n,i){const r=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[i*3],h=e[i*3+1];return[new _e(r,o),new _e(a,l),new _e(c,h)]},generateSideWallUV:function(s,e,t,n,i,r){const o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[i*3],f=e[i*3+1],g=e[i*3+2],_=e[r*3],p=e[r*3+1],m=e[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new _e(o,1-l),new _e(c,1-u),new _e(d,1-g),new _e(_,1-m)]:[new _e(a,1-l),new _e(h,1-u),new _e(f,1-g),new _e(p,1-m)]}};function rx(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class nc extends Xt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new F,d=new F,f=[],g=[],_=[],p=[];for(let m=0;m<=n;m++){const T=[],x=m/n;let E=0;m===0&&o===0?E=.5/t:m===n&&l===Math.PI&&(E=-.5/t);for(let I=0;I<=t;I++){const N=I/t;u.x=-e*Math.cos(i+N*r)*Math.sin(o+x*a),u.y=e*Math.cos(o+x*a),u.z=e*Math.sin(i+N*r)*Math.sin(o+x*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),p.push(N+E,1-x),T.push(c++)}h.push(T)}for(let m=0;m<n;m++)for(let T=0;T<t;T++){const x=h[m][T+1],E=h[m][T],I=h[m+1][T],N=h[m+1][T+1];(m!==0||o>0)&&f.push(x,E,N),(m!==n-1||l<Math.PI)&&f.push(E,I,N)}this.setIndex(f),this.setAttribute("position",new Tt(g,3)),this.setAttribute("normal",new Tt(_,3)),this.setAttribute("uv",new Tt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new nc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ox extends un{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Xe(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class ic extends un{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Xe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ea,this.normalScale=new _e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Xn extends ic{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new _e(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return zt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Xe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Xe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Xe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Ai extends un{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Xe(16777215),this.specular=new Xe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ea,this.normalScale=new _e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.combine=Zo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ax extends un{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ea,this.normalScale=new _e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.combine=Zo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function Co(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function lx(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function cx(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Tu(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let l=0;l!==e;++l)i[o++]=s[a+l]}return i}function lf(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}class Hr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class hx extends Hr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ph,endingEnd:ph}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case mh:r=e,a=2*t-n;break;case gh:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case mh:o=e,l=2*n-t;break;case gh:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),_=g*g,p=_*g,m=-d*p+2*d*_-d*g,T=(1+d)*p+(-1.5-2*d)*_+(-.5+d)*g+1,x=(-1-f)*p+(1.5+f)*_+.5*g,E=f*p-f*_;for(let I=0;I!==a;++I)r[I]=m*o[h+I]+T*o[c+I]+x*o[l+I]+E*o[u+I];return r}}class ux extends Hr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}}class dx extends Hr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class qn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Co(t,this.TimeBufferType),this.values=Co(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Co(e.times,Array),values:Co(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new dx(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ux(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new hx(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Rr:t=this.InterpolantFactoryMethodDiscrete;break;case Xs:t=this.InterpolantFactoryMethodLinear;break;case Ta:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Rr;case this.InterpolantFactoryMethodLinear:return Xs;case this.InterpolantFactoryMethodSmooth:return Ta}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&lx(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Ta,r=e.length-1;let o=1;for(let a=1;a<r;++a){let l=!1;const c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{const u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){const _=t[u+g];if(_!==t[d+g]||_!==t[f+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}qn.prototype.TimeBufferType=Float32Array;qn.prototype.ValueBufferType=Float32Array;qn.prototype.DefaultInterpolation=Xs;class Qs extends qn{}Qs.prototype.ValueTypeName="bool";Qs.prototype.ValueBufferType=Array;Qs.prototype.DefaultInterpolation=Rr;Qs.prototype.InterpolantFactoryMethodLinear=void 0;Qs.prototype.InterpolantFactoryMethodSmooth=void 0;class cf extends qn{}cf.prototype.ValueTypeName="color";class Ys extends qn{}Ys.prototype.ValueTypeName="number";class fx extends Hr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let h=c+a;c!==h;c+=4)dn.slerpFlat(r,0,o,c-a,o,c,l);return r}}class Pi extends qn{InterpolantFactoryMethodLinear(e){return new fx(this.times,this.values,this.getValueSize(),e)}}Pi.prototype.ValueTypeName="quaternion";Pi.prototype.DefaultInterpolation=Xs;Pi.prototype.InterpolantFactoryMethodSmooth=void 0;class er extends qn{}er.prototype.ValueTypeName="string";er.prototype.ValueBufferType=Array;er.prototype.DefaultInterpolation=Rr;er.prototype.InterpolantFactoryMethodLinear=void 0;er.prototype.InterpolantFactoryMethodSmooth=void 0;class Ni extends qn{}Ni.prototype.ValueTypeName="vector";class Nl{constructor(e="",t=-1,n=[],i=Bp){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=xn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(mx(n[o]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(qn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const h=cx(l);l=Tu(l,1,h),c=Tu(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Ys(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,g,_){if(f.length!==0){const p=[],m=[];lf(f,p,m,g),p.length!==0&&_.push(new u(d,p,m))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)f[d[g].morphTargets[_]]=-1;for(const _ in f){const p=[],m=[];for(let T=0;T!==d[g].morphTargets.length;++T){const x=d[g];p.push(x.time),m.push(x.morphTarget===_?1:0)}i.push(new Ys(".morphTargetInfluence["+_+"]",p,m))}l=f.length*o}else{const f=".bones["+t[u].name+"]";n(Ni,f+".position",d,"pos",i),n(Pi,f+".quaternion",d,"rot",i),n(Ni,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function px(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ys;case"vector":case"vector2":case"vector3":case"vector4":return Ni;case"color":return cf;case"quaternion":return Pi;case"bool":case"boolean":return Qs;case"string":return er}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function mx(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=px(s.type);if(s.times===void 0){const t=[],n=[];lf(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const Si={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class hf{constructor(e,t,n){const i=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const gx=new hf;class Vn{constructor(e){this.manager=e!==void 0?e:gx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Vn.DEFAULT_MATERIAL_NAME="__DEFAULT";const ti={};class _x extends Error{constructor(e,t){super(e),this.response=t}}class Vr extends Vn{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Si.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(ti[e]!==void 0){ti[e].push({onLoad:t,onProgress:n,onError:i});return}ti[e]=[],ti[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=ti[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let _=0;const p=new ReadableStream({start(m){T();function T(){u.read().then(({done:x,value:E})=>{if(x)m.close();else{_+=E.byteLength;const I=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let N=0,C=h.length;N<C;N++){const U=h[N];U.onProgress&&U.onProgress(I)}m.enqueue(E),T()}})}}});return new Response(p)}else throw new _x(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{Si.add(e,c);const h=ti[e];delete ti[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=ti[e];if(h===void 0)throw this.manager.itemError(e),c;delete ti[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class yx extends Vn{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Si.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=Lr("img");function l(){h(),Si.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(u){h(),i&&i(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class vx extends Vn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=new Kl,a=new Vr(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(e,function(l){let c;try{c=r.parse(l)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}c.image!==void 0?o.image=c.image:c.data!==void 0&&(o.image.width=c.width,o.image.height=c.height,o.image.data=c.data),o.wrapS=c.wrapS!==void 0?c.wrapS:vn,o.wrapT=c.wrapT!==void 0?c.wrapT:vn,o.magFilter=c.magFilter!==void 0?c.magFilter:Jt,o.minFilter=c.minFilter!==void 0?c.minFilter:Jt,o.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(o.colorSpace=c.colorSpace),c.flipY!==void 0&&(o.flipY=c.flipY),c.format!==void 0&&(o.format=c.format),c.type!==void 0&&(o.type=c.type),c.mipmaps!==void 0&&(o.mipmaps=c.mipmaps,o.minFilter=Rn),c.mipmapCount===1&&(o.minFilter=Jt),c.generateMipmaps!==void 0&&(o.generateMipmaps=c.generateMipmaps),o.needsUpdate=!0,t&&t(o,c)},n,i),o}}class sc extends Vn{constructor(e){super(e)}load(e,t,n,i){const r=new Ht,o=new yx(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class Gr extends At{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Xe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class xx extends Gr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Xe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const il=new $e,wu=new F,Au=new F;class rc{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new _e(512,512),this.map=null,this.mapPass=null,this.matrix=new $e,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xl,this._frameExtents=new _e(1,1),this._viewportCount=1,this._viewports=[new wt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;wu.setFromMatrixPosition(e.matrixWorld),t.position.copy(wu),Au.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Au),t.updateMatrixWorld(),il.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(il),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(il)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class bx extends rc{constructor(){super(new $t(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=qs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class uf extends Gr{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.target=new At,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new bx}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Cu=new $e,dr=new F,sl=new F;class Mx extends rc{constructor(){super(new $t(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new _e(4,2),this._viewportCount=6,this._viewports=[new wt(2,1,1,1),new wt(0,1,1,1),new wt(3,1,1,1),new wt(1,1,1,1),new wt(3,0,1,1),new wt(1,0,1,1)],this._cubeDirections=[new F(1,0,0),new F(-1,0,0),new F(0,0,1),new F(0,0,-1),new F(0,1,0),new F(0,-1,0)],this._cubeUps=[new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,0,1),new F(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),dr.setFromMatrixPosition(e.matrixWorld),n.position.copy(dr),sl.copy(n.position),sl.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(sl),n.updateMatrixWorld(),i.makeTranslation(-dr.x,-dr.y,-dr.z),Cu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Cu)}}class df extends Gr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Mx}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Sx extends rc{constructor(){super(new na(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class oc extends Gr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.target=new At,this.shadow=new Sx}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Ex extends Gr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Ji{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Tx extends Vn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Si.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return Si.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Si.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Si.add(e,l),r.manager.itemStart(e)}}const ac="\\[\\]\\.:\\/",wx=new RegExp("["+ac+"]","g"),lc="[^"+ac+"]",Ax="[^"+ac.replace("\\.","")+"]",Cx=/((?:WC+[\/:])*)/.source.replace("WC",lc),Rx=/(WCOD+)?/.source.replace("WCOD",Ax),Lx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",lc),Px=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",lc),Nx=new RegExp("^"+Cx+Rx+Lx+Px+"$"),Ix=["material","materials","bones","map"];class Dx{constructor(e,t,n){const i=n||St.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class St{constructor(e,t,n){this.path=t,this.parsedPath=n||St.parseTrackName(t),this.node=St.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new St.Composite(e,t,n):new St(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(wx,"")}static parseTrackName(e){const t=Nx.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);Ix.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=St.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}St.Composite=Dx;St.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};St.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};St.prototype.GetterByBindingType=[St.prototype._getValue_direct,St.prototype._getValue_array,St.prototype._getValue_arrayElement,St.prototype._getValue_toArray];St.prototype.SetterByBindingTypeAndVersioning=[[St.prototype._setValue_direct,St.prototype._setValue_direct_setNeedsUpdate,St.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[St.prototype._setValue_array,St.prototype._setValue_array_setNeedsUpdate,St.prototype._setValue_array_setMatrixWorldNeedsUpdate],[St.prototype._setValue_arrayElement,St.prototype._setValue_arrayElement_setNeedsUpdate,St.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[St.prototype._setValue_fromArray,St.prototype._setValue_fromArray_setNeedsUpdate,St.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const Ru=new $e;class cc{constructor(e,t,n=0,i=1/0){this.ray=new Ks(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new jl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ru.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ru),this}intersectObject(e,t=!0,n=[]){return Il(e,this,n,t),n.sort(Lu),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)Il(e[i],this,n,t);return n.sort(Lu),n}}function Lu(s,e){return s.distance-e.distance}function Il(s,e,t,n){if(s.layers.test(e.layers)&&s.raycast(e,t),n===!0){const i=s.children;for(let r=0,o=i.length;r<o;r++)Il(i[r],e,t,!0)}}class Pu{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(zt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Ux extends Zl{constructor(e=10,t=10,n=4473924,i=8947848){n=new Xe(n),i=new Xe(i);const r=t/2,o=e/t,a=e/2,l=[],c=[];for(let d=0,f=0,g=-a;d<=t;d++,g+=o){l.push(-a,0,g,a,0,g),l.push(g,0,-a,g,0,a);const _=d===r?n:i;_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3}const h=new Xt;h.setAttribute("position",new Tt(l,3)),h.setAttribute("color",new Tt(c,3));const u=new Pr({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Vl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Vl);const Nu=new F,Ox=new rn,Ro=new $e,vi=new $e,Lo=new dn,Po=new F,No=new F(1,1,1);class aa extends At{constructor(){super(...arguments),this.urdfNode=null,this.urdfName=""}copy(e,t){return super.copy(e,t),this.urdfNode=e.urdfNode,this.urdfName=e.urdfName,this}}class Fx extends aa{constructor(){super(...arguments),this.isURDFCollider=!0,this.type="URDFCollider"}}class kx extends aa{constructor(){super(...arguments),this.isURDFVisual=!0,this.type="URDFVisual"}}class ff extends aa{constructor(){super(...arguments),this.isURDFLink=!0,this.type="URDFLink"}}class pf extends aa{constructor(){super(...arguments),this.isURDFJoint=!0,this.type="URDFJoint",this.jointValue=[],this.axis=new F(1,0,0),this.limit={lower:0,upper:0},this.ignoreLimits=!1,this.mimicJoints=[],this.origPosition=null,this.origQuaternion=null,this._jointType="fixed"}get jointType(){return this._jointType}set jointType(e){if(this._jointType!==e)switch(this._jointType=e,this.matrixWorldNeedsUpdate=!0,e){case"fixed":this.jointValue=[];break;case"continuous":case"revolute":case"prismatic":this.jointValue=[0];break;case"planar":this.jointValue=[0,0,0],this.axis=new F(0,0,1);break;case"floating":this.jointValue=[0,0,0,0,0,0];break}}get angle(){return this.jointValue[0]??0}copy(e,t){var n,i;return super.copy(e,t),this.jointType=e.jointType,this.axis=e.axis.clone(),this.limit={...e.limit},this.ignoreLimits=!1,this.jointValue=[...e.jointValue],this.origPosition=((n=e.origPosition)==null?void 0:n.clone())??null,this.origQuaternion=((i=e.origQuaternion)==null?void 0:i.clone())??null,this.mimicJoints=[...e.mimicJoints],this}setJointValue(...e){const t=e.map(i=>i===null?null:Number(i));(!this.origPosition||!this.origQuaternion)&&(this.origPosition=this.position.clone(),this.origQuaternion=this.quaternion.clone());let n=!1;for(const i of this.mimicJoints)n=i.updateFromMimicked(...t)||n;switch(this.jointType){case"fixed":return n;case"continuous":case"revolute":{let i=t[0];return i===null||(!this.ignoreLimits&&this.jointType==="revolute"&&(i=Math.min(this.limit.upper,Math.max(this.limit.lower,i))),i===this.jointValue[0])?n:(this.quaternion.setFromAxisAngle(this.axis,i).premultiply(this.origQuaternion),this.jointValue[0]=i,this.matrixWorldNeedsUpdate=!0,!0)}case"prismatic":{let i=t[0];return i===null||(this.ignoreLimits||(i=Math.min(this.limit.upper,Math.max(this.limit.lower,i))),i===this.jointValue[0])?n:(this.position.copy(this.origPosition),Nu.copy(this.axis).applyEuler(this.rotation),this.position.addScaledVector(Nu,i),this.jointValue[0]=i,this.matrixWorldNeedsUpdate=!0,!0)}case"floating":{if(this.jointValue.every((r,o)=>t[o]===r||t[o]===null))return n;for(let r=0;r<6;r++)t[r]!==null&&(this.jointValue[r]=t[r]);return vi.compose(this.origPosition,this.origQuaternion,No),Lo.setFromEuler(Ox.set(this.jointValue[3],this.jointValue[4],this.jointValue[5],"XYZ")),Po.set(this.jointValue[0],this.jointValue[1],this.jointValue[2]),Ro.compose(Po,Lo,No),vi.premultiply(Ro),this.position.setFromMatrixPosition(vi),this.rotation.setFromRotationMatrix(vi),this.matrixWorldNeedsUpdate=!0,!0}case"planar":{if(this.jointValue.every((r,o)=>t[o]===r||t[o]===null))return n;for(let r=0;r<3;r++)t[r]!==null&&(this.jointValue[r]=t[r]);return vi.compose(this.origPosition,this.origQuaternion,No),Lo.setFromAxisAngle(this.axis,this.jointValue[2]),Po.set(this.jointValue[0],this.jointValue[1],0),Ro.compose(Po,Lo,No),vi.premultiply(Ro),this.position.setFromMatrixPosition(vi),this.rotation.setFromRotationMatrix(vi),this.matrixWorldNeedsUpdate=!0,!0}}return n}}class rl extends pf{constructor(){super(...arguments),this.type="URDFMimicJoint",this.mimicJoint="",this.multiplier=1,this.offset=0}updateFromMimicked(...e){return super.setJointValue(...e.map(t=>t===null?null:t*this.multiplier+this.offset))}copy(e,t){return super.copy(e,t),this.mimicJoint=e.mimicJoint,this.multiplier=e.multiplier,this.offset=e.offset,this}}class Iu extends ff{constructor(){super(...arguments),this.isURDFRobot=!0,this.type="URDFRobot",this.robotName="",this.urdfRobotNode=null,this.links={},this.joints={},this.colliders={},this.visual={},this.frames={}}copy(e,t){super.copy(e,t),this.robotName=e.robotName,this.urdfRobotNode=e.urdfRobotNode,this.links={},this.joints={},this.colliders={},this.visual={},this.traverse(n=>{const i=n;i.isURDFJoint&&i.urdfName in e.joints&&(this.joints[i.urdfName]=i),i.isURDFLink&&i.urdfName in e.links&&(this.links[i.urdfName]=i),i.isURDFCollider&&i.urdfName in e.colliders&&(this.colliders[i.urdfName]=i),i.isURDFVisual&&i.urdfName in e.visual&&(this.visual[i.urdfName]=i)});for(const n of Object.values(this.joints))n.mimicJoints=n.mimicJoints.map(i=>this.joints[i.name]);return this.frames={...this.colliders,...this.visual,...this.links,...this.joints},this}setJointValue(e,...t){var n;return((n=this.joints[e])==null?void 0:n.setJointValue(...t))??!1}}class Du extends vx{constructor(e){super(e)}parse(e){function t(B){switch(B.image_type){case d:case _:if(B.colormap_length>256||B.colormap_size!==24||B.colormap_type!==1)throw new Error("THREE.TGALoader: Invalid type colormap data for indexed type.");break;case f:case g:case p:case m:if(B.colormap_type)throw new Error("THREE.TGALoader: Invalid type colormap data for colormap type.");break;case u:throw new Error("THREE.TGALoader: No data.");default:throw new Error("THREE.TGALoader: Invalid type "+B.image_type)}if(B.width<=0||B.height<=0)throw new Error("THREE.TGALoader: Invalid image size.");if(B.pixel_size!==8&&B.pixel_size!==16&&B.pixel_size!==24&&B.pixel_size!==32)throw new Error("THREE.TGALoader: Invalid pixel size "+B.pixel_size)}function n(B,ne,G,se,ae){let pe,Le;const Ae=G.pixel_size>>3,W=G.width*G.height*Ae;if(ne&&(Le=ae.subarray(se,se+=G.colormap_length*(G.colormap_size>>3))),B){pe=new Uint8Array(W);let ee,ie,te,Ne=0;const qe=new Uint8Array(Ae);for(;Ne<W;)if(ee=ae[se++],ie=(ee&127)+1,ee&128){for(te=0;te<Ae;++te)qe[te]=ae[se++];for(te=0;te<ie;++te)pe.set(qe,Ne+te*Ae);Ne+=Ae*ie}else{for(ie*=Ae,te=0;te<ie;++te)pe[Ne+te]=ae[se++];Ne+=ie}}else pe=ae.subarray(se,se+=ne?G.width*G.height:W);return{pixel_data:pe,palettes:Le}}function i(B,ne,G,se,ae,pe,Le,Ae,W){const ee=W;let ie,te=0,Ne,qe;const V=y.width;for(qe=ne;qe!==se;qe+=G)for(Ne=ae;Ne!==Le;Ne+=pe,te++)ie=Ae[te],B[(Ne+V*qe)*4+3]=255,B[(Ne+V*qe)*4+2]=ee[ie*3+0],B[(Ne+V*qe)*4+1]=ee[ie*3+1],B[(Ne+V*qe)*4+0]=ee[ie*3+2];return B}function r(B,ne,G,se,ae,pe,Le,Ae){let W,ee=0,ie,te;const Ne=y.width;for(te=ne;te!==se;te+=G)for(ie=ae;ie!==Le;ie+=pe,ee+=2)W=Ae[ee+0]+(Ae[ee+1]<<8),B[(ie+Ne*te)*4+0]=(W&31744)>>7,B[(ie+Ne*te)*4+1]=(W&992)>>2,B[(ie+Ne*te)*4+2]=(W&31)<<3,B[(ie+Ne*te)*4+3]=W&32768?0:255;return B}function o(B,ne,G,se,ae,pe,Le,Ae){let W=0,ee,ie;const te=y.width;for(ie=ne;ie!==se;ie+=G)for(ee=ae;ee!==Le;ee+=pe,W+=3)B[(ee+te*ie)*4+3]=255,B[(ee+te*ie)*4+2]=Ae[W+0],B[(ee+te*ie)*4+1]=Ae[W+1],B[(ee+te*ie)*4+0]=Ae[W+2];return B}function a(B,ne,G,se,ae,pe,Le,Ae){let W=0,ee,ie;const te=y.width;for(ie=ne;ie!==se;ie+=G)for(ee=ae;ee!==Le;ee+=pe,W+=4)B[(ee+te*ie)*4+2]=Ae[W+0],B[(ee+te*ie)*4+1]=Ae[W+1],B[(ee+te*ie)*4+0]=Ae[W+2],B[(ee+te*ie)*4+3]=Ae[W+3];return B}function l(B,ne,G,se,ae,pe,Le,Ae){let W,ee=0,ie,te;const Ne=y.width;for(te=ne;te!==se;te+=G)for(ie=ae;ie!==Le;ie+=pe,ee++)W=Ae[ee],B[(ie+Ne*te)*4+0]=W,B[(ie+Ne*te)*4+1]=W,B[(ie+Ne*te)*4+2]=W,B[(ie+Ne*te)*4+3]=255;return B}function c(B,ne,G,se,ae,pe,Le,Ae){let W=0,ee,ie;const te=y.width;for(ie=ne;ie!==se;ie+=G)for(ee=ae;ee!==Le;ee+=pe,W+=2)B[(ee+te*ie)*4+0]=Ae[W+0],B[(ee+te*ie)*4+1]=Ae[W+0],B[(ee+te*ie)*4+2]=Ae[W+0],B[(ee+te*ie)*4+3]=Ae[W+1];return B}function h(B,ne,G,se,ae){let pe,Le,Ae,W,ee,ie;switch((y.flags&T)>>x){default:case N:pe=0,Ae=1,ee=ne,Le=0,W=1,ie=G;break;case E:pe=0,Ae=1,ee=ne,Le=G-1,W=-1,ie=-1;break;case C:pe=ne-1,Ae=-1,ee=-1,Le=0,W=1,ie=G;break;case I:pe=ne-1,Ae=-1,ee=-1,Le=G-1,W=-1,ie=-1;break}if(k)switch(y.pixel_size){case 8:l(B,Le,W,ie,pe,Ae,ee,se);break;case 16:c(B,Le,W,ie,pe,Ae,ee,se);break;default:throw new Error("THREE.TGALoader: Format not supported.")}else switch(y.pixel_size){case 8:i(B,Le,W,ie,pe,Ae,ee,se,ae);break;case 16:r(B,Le,W,ie,pe,Ae,ee,se);break;case 24:o(B,Le,W,ie,pe,Ae,ee,se);break;case 32:a(B,Le,W,ie,pe,Ae,ee,se);break;default:throw new Error("THREE.TGALoader: Format not supported.")}return B}const u=0,d=1,f=2,g=3,_=9,p=10,m=11,T=48,x=4,E=0,I=1,N=2,C=3;if(e.length<19)throw new Error("THREE.TGALoader: Not enough data to contain header.");let U=0;const M=new Uint8Array(e),y={id_length:M[U++],colormap_type:M[U++],image_type:M[U++],colormap_index:M[U++]|M[U++]<<8,colormap_length:M[U++]|M[U++]<<8,colormap_size:M[U++],origin:[M[U++]|M[U++]<<8,M[U++]|M[U++]<<8],width:M[U++]|M[U++]<<8,height:M[U++]|M[U++]<<8,pixel_size:M[U++],flags:M[U++]};if(t(y),y.id_length+U>e.length)throw new Error("THREE.TGALoader: No data.");U+=y.id_length;let D=!1,H=!1,k=!1;switch(y.image_type){case _:D=!0,H=!0;break;case d:H=!0;break;case p:D=!0;break;case f:break;case m:D=!0,k=!0;break;case g:k=!0;break}const z=new Uint8Array(y.width*y.height*4),$=n(D,H,y,U,M);return h(z,y.width,y.height,$.pixel_data,$.palettes),{data:z,width:y.width,height:y.height,flipY:!0,generateMipmaps:!0,minFilter:Rn}}}class Bx extends Vn{load(e,t,n,i){const r=this,o=r.path===""?Ji.extractUrlBase(e):r.path,a=new Vr(r.manager);a.setPath(r.path),a.setRequestHeader(r.requestHeader),a.setWithCredentials(r.withCredentials),a.load(e,function(l){try{t(r.parse(l,o))}catch(c){i?i(c):console.error(c),r.manager.itemError(e)}},n,i)}parse(e,t){function n(b,v){const R=[],w=b.childNodes;for(let L=0,J=w.length;L<J;L++){const oe=w[L];oe.nodeName===v&&R.push(oe)}return R}function i(b){if(b.length===0)return[];const v=b.trim().split(/\s+/),R=new Array(v.length);for(let w=0,L=v.length;w<L;w++)R[w]=v[w];return R}function r(b){if(b.length===0)return[];const v=b.trim().split(/\s+/),R=new Array(v.length);for(let w=0,L=v.length;w<L;w++)R[w]=parseFloat(v[w]);return R}function o(b){if(b.length===0)return[];const v=b.trim().split(/\s+/),R=new Array(v.length);for(let w=0,L=v.length;w<L;w++)R[w]=parseInt(v[w]);return R}function a(b){return b.substring(1)}function l(){return"three_default_"+Gf++}function c(b){return Object.keys(b).length===0}function h(b){return{unit:u(n(b,"unit")[0]),upAxis:d(n(b,"up_axis")[0])}}function u(b){return b!==void 0&&b.hasAttribute("meter")===!0?parseFloat(b.getAttribute("meter")):1}function d(b){return b!==void 0?b.textContent:"Y_UP"}function f(b,v,R,w){const L=n(b,v)[0];if(L!==void 0){const J=n(L,R);for(let oe=0;oe<J.length;oe++)w(J[oe])}}function g(b,v){for(const R in b){const w=b[R];w.build=v(b[R])}}function _(b,v){return b.build!==void 0||(b.build=v(b)),b.build}function p(b){const v={sources:{},samplers:{},channels:{}};let R=!1;for(let w=0,L=b.childNodes.length;w<L;w++){const J=b.childNodes[w];if(J.nodeType!==1)continue;let oe;switch(J.nodeName){case"source":oe=J.getAttribute("id"),v.sources[oe]=de(J);break;case"sampler":oe=J.getAttribute("id"),v.samplers[oe]=m(J);break;case"channel":oe=J.getAttribute("target"),v.channels[oe]=T(J);break;case"animation":p(J),R=!0;break;default:console.log(J)}}R===!1&&(Je.animations[b.getAttribute("id")||qi.generateUUID()]=v)}function m(b){const v={inputs:{}};for(let R=0,w=b.childNodes.length;R<w;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"input":const J=a(L.getAttribute("source")),oe=L.getAttribute("semantic");v.inputs[oe]=J;break}}return v}function T(b){const v={};let w=b.getAttribute("target").split("/");const L=w.shift();let J=w.shift();const oe=J.indexOf("(")!==-1,De=J.indexOf(".")!==-1;if(De)w=J.split("."),J=w.shift(),v.member=w.shift();else if(oe){const Se=J.split("(");J=Se.shift();for(let Re=0;Re<Se.length;Re++)Se[Re]=parseInt(Se[Re].replace(/\)/,""));v.indices=Se}return v.id=L,v.sid=J,v.arraySyntax=oe,v.memberSyntax=De,v.sampler=a(b.getAttribute("source")),v}function x(b){const v=[],R=b.channels,w=b.samplers,L=b.sources;for(const J in R)if(R.hasOwnProperty(J)){const oe=R[J],De=w[oe.sampler],Se=De.inputs.INPUT,Re=De.inputs.OUTPUT,Ge=L[Se],me=L[Re],ze=I(oe,Ge,me);y(ze,v)}return v}function E(b){return _(Je.animations[b],x)}function I(b,v,R){const w=Je.nodes[b.id],L=yt(w.id),J=w.transforms[b.sid],oe=w.matrix.clone().transpose();let De,Se,Re,Ge,me,ze;const Ue={};switch(J){case"matrix":for(Re=0,Ge=v.array.length;Re<Ge;Re++)if(De=v.array[Re],Se=Re*R.stride,Ue[De]===void 0&&(Ue[De]={}),b.arraySyntax===!0){const Pt=R.array[Se],bt=b.indices[0]+4*b.indices[1];Ue[De][bt]=Pt}else for(me=0,ze=R.stride;me<ze;me++)Ue[De][me]=R.array[Se+me];break;case"translate":console.warn('THREE.ColladaLoader: Animation transform type "%s" not yet implemented.',J);break;case"rotate":console.warn('THREE.ColladaLoader: Animation transform type "%s" not yet implemented.',J);break;case"scale":console.warn('THREE.ColladaLoader: Animation transform type "%s" not yet implemented.',J);break}const Ke=N(Ue,oe);return{name:L.uuid,keyframes:Ke}}function N(b,v){const R=[];for(const L in b)R.push({time:parseFloat(L),value:b[L]});R.sort(w);for(let L=0;L<16;L++)D(R,L,v.elements[L]);return R;function w(L,J){return L.time-J.time}}const C=new F,U=new F,M=new dn;function y(b,v){const R=b.keyframes,w=b.name,L=[],J=[],oe=[],De=[];for(let Se=0,Re=R.length;Se<Re;Se++){const Ge=R[Se],me=Ge.time,ze=Ge.value;Oe.fromArray(ze).transpose(),Oe.decompose(C,M,U),L.push(me),J.push(C.x,C.y,C.z),oe.push(M.x,M.y,M.z,M.w),De.push(U.x,U.y,U.z)}return J.length>0&&v.push(new Ni(w+".position",L,J)),oe.length>0&&v.push(new Pi(w+".quaternion",L,oe)),De.length>0&&v.push(new Ni(w+".scale",L,De)),v}function D(b,v,R){let w,L=!0,J,oe;for(J=0,oe=b.length;J<oe;J++)w=b[J],w.value[v]===void 0?w.value[v]=null:L=!1;if(L===!0)for(J=0,oe=b.length;J<oe;J++)w=b[J],w.value[v]=R;else H(b,v)}function H(b,v){let R,w;for(let L=0,J=b.length;L<J;L++){const oe=b[L];if(oe.value[v]===null){if(R=k(b,L,v),w=z(b,L,v),R===null){oe.value[v]=w.value[v];continue}if(w===null){oe.value[v]=R.value[v];continue}$(oe,R,w,v)}}}function k(b,v,R){for(;v>=0;){const w=b[v];if(w.value[R]!==null)return w;v--}return null}function z(b,v,R){for(;v<b.length;){const w=b[v];if(w.value[R]!==null)return w;v++}return null}function $(b,v,R,w){if(R.time-v.time===0){b.value[w]=v.value[w];return}b.value[w]=(b.time-v.time)*(R.value[w]-v.value[w])/(R.time-v.time)+v.value[w]}function B(b){const v={name:b.getAttribute("id")||"default",start:parseFloat(b.getAttribute("start")||0),end:parseFloat(b.getAttribute("end")||0),animations:[]};for(let R=0,w=b.childNodes.length;R<w;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"instance_animation":v.animations.push(a(L.getAttribute("url")));break}}Je.clips[b.getAttribute("id")]=v}function ne(b){const v=[],R=b.name,w=b.end-b.start||-1,L=b.animations;for(let J=0,oe=L.length;J<oe;J++){const De=E(L[J]);for(let Se=0,Re=De.length;Se<Re;Se++)v.push(De[Se])}return new Nl(R,w,v)}function G(b){return _(Je.clips[b],ne)}function se(b){const v={};for(let R=0,w=b.childNodes.length;R<w;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"skin":v.id=a(L.getAttribute("source")),v.skin=ae(L);break;case"morph":v.id=a(L.getAttribute("source")),console.warn("THREE.ColladaLoader: Morph target animation not supported yet.");break}}Je.controllers[b.getAttribute("id")]=v}function ae(b){const v={sources:{}};for(let R=0,w=b.childNodes.length;R<w;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"bind_shape_matrix":v.bindShapeMatrix=r(L.textContent);break;case"source":const J=L.getAttribute("id");v.sources[J]=de(L);break;case"joints":v.joints=pe(L);break;case"vertex_weights":v.vertexWeights=Le(L);break}}return v}function pe(b){const v={inputs:{}};for(let R=0,w=b.childNodes.length;R<w;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"input":const J=L.getAttribute("semantic"),oe=a(L.getAttribute("source"));v.inputs[J]=oe;break}}return v}function Le(b){const v={inputs:{}};for(let R=0,w=b.childNodes.length;R<w;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"input":const J=L.getAttribute("semantic"),oe=a(L.getAttribute("source")),De=parseInt(L.getAttribute("offset"));v.inputs[J]={id:oe,offset:De};break;case"vcount":v.vcount=o(L.textContent);break;case"v":v.v=o(L.textContent);break}}return v}function Ae(b){const v={id:b.id},R=Je.geometries[v.id];return b.skin!==void 0&&(v.skin=W(b.skin),R.sources.skinIndices=v.skin.indices,R.sources.skinWeights=v.skin.weights),v}function W(b){const R={joints:[],indices:{array:[],stride:4},weights:{array:[],stride:4}},w=b.sources,L=b.vertexWeights,J=L.vcount,oe=L.v,De=L.inputs.JOINT.offset,Se=L.inputs.WEIGHT.offset,Re=b.sources[b.joints.inputs.JOINT],Ge=b.sources[b.joints.inputs.INV_BIND_MATRIX],me=w[L.inputs.WEIGHT.id].array;let ze=0,Ue,Ke,je;for(Ue=0,je=J.length;Ue<je;Ue++){const bt=J[Ue],gt=[];for(Ke=0;Ke<bt;Ke++){const _t=oe[ze+De],Yn=oe[ze+Se],an=me[Yn];gt.push({index:_t,weight:an}),ze+=2}for(gt.sort(Pt),Ke=0;Ke<4;Ke++){const _t=gt[Ke];_t!==void 0?(R.indices.array.push(_t.index),R.weights.array.push(_t.weight)):(R.indices.array.push(0),R.weights.array.push(0))}}for(b.bindShapeMatrix?R.bindMatrix=new $e().fromArray(b.bindShapeMatrix).transpose():R.bindMatrix=new $e().identity(),Ue=0,je=Re.array.length;Ue<je;Ue++){const bt=Re.array[Ue],gt=new $e().fromArray(Ge.array,Ue*Ge.stride).transpose();R.joints.push({name:bt,boneInverse:gt})}return R;function Pt(bt,gt){return gt.weight-bt.weight}}function ee(b){return _(Je.controllers[b],Ae)}function ie(b){const v={init_from:n(b,"init_from")[0].textContent};Je.images[b.getAttribute("id")]=v}function te(b){return b.build!==void 0?b.build:b.init_from}function Ne(b){const v=Je.images[b];return v!==void 0?_(v,te):(console.warn("THREE.ColladaLoader: Couldn't find image with ID:",b),null)}function qe(b){const v={};for(let R=0,w=b.childNodes.length;R<w;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"profile_COMMON":v.profile=V(L);break}}Je.effects[b.getAttribute("id")]=v}function V(b){const v={surfaces:{},samplers:{}};for(let R=0,w=b.childNodes.length;R<w;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"newparam":at(L,v);break;case"technique":v.technique=ce(L);break;case"extra":v.extra=A(L);break}}return v}function at(b,v){const R=b.getAttribute("sid");for(let w=0,L=b.childNodes.length;w<L;w++){const J=b.childNodes[w];if(J.nodeType===1)switch(J.nodeName){case"surface":v.surfaces[R]=re(J);break;case"sampler2D":v.samplers[R]=ge(J);break}}}function re(b){const v={};for(let R=0,w=b.childNodes.length;R<w;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"init_from":v.init_from=L.textContent;break}}return v}function ge(b){const v={};for(let R=0,w=b.childNodes.length;R<w;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"source":v.source=L.textContent;break}}return v}function ce(b){const v={};for(let R=0,w=b.childNodes.length;R<w;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"constant":case"lambert":case"blinn":case"phong":v.type=L.nodeName,v.parameters=ve(L);break;case"extra":v.extra=A(L);break}}return v}function ve(b){const v={};for(let R=0,w=b.childNodes.length;R<w;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"emission":case"diffuse":case"specular":case"bump":case"ambient":case"shininess":case"transparency":v[L.nodeName]=fe(L);break;case"transparent":v[L.nodeName]={opaque:L.hasAttribute("opaque")?L.getAttribute("opaque"):"A_ONE",data:fe(L)};break}}return v}function fe(b){const v={};for(let R=0,w=b.childNodes.length;R<w;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"color":v[L.nodeName]=r(L.textContent);break;case"float":v[L.nodeName]=parseFloat(L.textContent);break;case"texture":v[L.nodeName]={id:L.getAttribute("texture"),extra:Pe(L)};break}}return v}function Pe(b){const v={technique:{}};for(let R=0,w=b.childNodes.length;R<w;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"extra":We(L,v);break}}return v}function We(b,v){for(let R=0,w=b.childNodes.length;R<w;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"technique":O(L,v);break}}}function O(b,v){for(let R=0,w=b.childNodes.length;R<w;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"repeatU":case"repeatV":case"offsetU":case"offsetV":v.technique[L.nodeName]=parseFloat(L.textContent);break;case"wrapU":case"wrapV":L.textContent.toUpperCase()==="TRUE"?v.technique[L.nodeName]=1:L.textContent.toUpperCase()==="FALSE"?v.technique[L.nodeName]=0:v.technique[L.nodeName]=parseInt(L.textContent);break;case"bump":v[L.nodeName]=le(L);break}}}function A(b){const v={};for(let R=0,w=b.childNodes.length;R<w;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"technique":v.technique=q(L);break}}return v}function q(b){const v={};for(let R=0,w=b.childNodes.length;R<w;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"double_sided":v[L.nodeName]=parseInt(L.textContent);break;case"bump":v[L.nodeName]=le(L);break}}return v}function le(b){const v={};for(let R=0,w=b.childNodes.length;R<w;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"texture":v[L.nodeName]={id:L.getAttribute("texture"),texcoord:L.getAttribute("texcoord"),extra:Pe(L)};break}}return v}function ue(b){return b}function he(b){return _(Je.effects[b],ue)}function He(b){const v={name:b.getAttribute("name")};for(let R=0,w=b.childNodes.length;R<w;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"instance_effect":v.url=a(L.getAttribute("url"));break}}Je.materials[b.getAttribute("id")]=v}function Ee(b){let v,R=b.slice((b.lastIndexOf(".")-1>>>0)+2);switch(R=R.toLowerCase(),R){case"tga":v=va;break;default:v=Ic}return v}function Me(b){const v=he(b.url),R=v.profile.technique;let w;switch(R.type){case"phong":case"blinn":w=new Ai;break;case"lambert":w=new ax;break;default:w=new zn;break}w.name=b.name||"";function L(Se,Re=null){const Ge=v.profile.samplers[Se.id];let me=null;if(Ge!==void 0){const ze=v.profile.surfaces[Ge.source];me=Ne(ze.init_from)}else console.warn("THREE.ColladaLoader: Undefined sampler. Access image directly (see #12530)."),me=Ne(Se.id);if(me!==null){const ze=Ee(me);if(ze!==void 0){const Ue=ze.load(me),Ke=Se.extra;if(Ke!==void 0&&Ke.technique!==void 0&&c(Ke.technique)===!1){const je=Ke.technique;Ue.wrapS=je.wrapU?kn:vn,Ue.wrapT=je.wrapV?kn:vn,Ue.offset.set(je.offsetU||0,je.offsetV||0),Ue.repeat.set(je.repeatU||1,je.repeatV||1)}else Ue.wrapS=kn,Ue.wrapT=kn;return Re!==null&&(Ue.colorSpace=Re),Ue}else return console.warn("THREE.ColladaLoader: Loader for texture %s not found.",me),null}else return console.warn("THREE.ColladaLoader: Couldn't create texture with ID:",Se.id),null}const J=R.parameters;for(const Se in J){const Re=J[Se];switch(Se){case"diffuse":Re.color&&w.color.fromArray(Re.color),Re.texture&&(w.map=L(Re.texture,Ot));break;case"specular":Re.color&&w.specular&&w.specular.fromArray(Re.color),Re.texture&&(w.specularMap=L(Re.texture));break;case"bump":Re.texture&&(w.normalMap=L(Re.texture));break;case"ambient":Re.texture&&(w.lightMap=L(Re.texture,Ot));break;case"shininess":Re.float&&w.shininess&&(w.shininess=Re.float);break;case"emission":Re.color&&w.emissive&&w.emissive.fromArray(Re.color),Re.texture&&(w.emissiveMap=L(Re.texture,Ot));break}}w.color.convertSRGBToLinear(),w.specular&&w.specular.convertSRGBToLinear(),w.emissive&&w.emissive.convertSRGBToLinear();let oe=J.transparent,De=J.transparency;if(De===void 0&&oe&&(De={float:1}),oe===void 0&&De&&(oe={opaque:"A_ONE",data:{color:[1,1,1,1]}}),oe&&De)if(oe.data.texture)w.transparent=!0;else{const Se=oe.data.color;switch(oe.opaque){case"A_ONE":w.opacity=Se[3]*De.float;break;case"RGB_ZERO":w.opacity=1-Se[0]*De.float;break;case"A_ZERO":w.opacity=1-Se[3]*De.float;break;case"RGB_ONE":w.opacity=Se[0]*De.float;break;default:console.warn('THREE.ColladaLoader: Invalid opaque type "%s" of transparent tag.',oe.opaque)}w.opacity<1&&(w.transparent=!0)}if(R.extra!==void 0&&R.extra.technique!==void 0){const Se=R.extra.technique;for(const Re in Se){const Ge=Se[Re];switch(Re){case"double_sided":w.side=Ge===1?yn:Hn;break;case"bump":w.normalMap=L(Ge.texture),w.normalScale=new _e(1,1);break}}}return w}function Qe(b){return _(Je.materials[b],Me)}function ye(b){const v={name:b.getAttribute("name")};for(let R=0,w=b.childNodes.length;R<w;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"optics":v.optics=Be(L);break}}Je.cameras[b.getAttribute("id")]=v}function Be(b){for(let v=0;v<b.childNodes.length;v++){const R=b.childNodes[v];switch(R.nodeName){case"technique_common":return rt(R)}}return{}}function rt(b){const v={};for(let R=0;R<b.childNodes.length;R++){const w=b.childNodes[R];switch(w.nodeName){case"perspective":case"orthographic":v.technique=w.nodeName,v.parameters=Ye(w);break}}return v}function Ye(b){const v={};for(let R=0;R<b.childNodes.length;R++){const w=b.childNodes[R];switch(w.nodeName){case"xfov":case"yfov":case"xmag":case"ymag":case"znear":case"zfar":case"aspect_ratio":v[w.nodeName]=parseFloat(w.textContent);break}}return v}function Ie(b){let v;switch(b.optics.technique){case"perspective":v=new $t(b.optics.parameters.yfov,b.optics.parameters.aspect_ratio,b.optics.parameters.znear,b.optics.parameters.zfar);break;case"orthographic":let R=b.optics.parameters.ymag,w=b.optics.parameters.xmag;const L=b.optics.parameters.aspect_ratio;w=w===void 0?R*L:w,R=R===void 0?w/L:R,w*=.5,R*=.5,v=new na(-w,w,R,-R,b.optics.parameters.znear,b.optics.parameters.zfar);break;default:v=new $t;break}return v.name=b.name||"",v}function nt(b){const v=Je.cameras[b];return v!==void 0?_(v,Ie):(console.warn("THREE.ColladaLoader: Couldn't find camera with ID:",b),null)}function lt(b){let v={};for(let R=0,w=b.childNodes.length;R<w;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"technique_common":v=vt(L);break}}Je.lights[b.getAttribute("id")]=v}function vt(b){const v={};for(let R=0,w=b.childNodes.length;R<w;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"directional":case"point":case"spot":case"ambient":v.technique=L.nodeName,v.parameters=st(L)}}return v}function st(b){const v={};for(let R=0,w=b.childNodes.length;R<w;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"color":const J=r(L.textContent);v.color=new Xe().fromArray(J).convertSRGBToLinear();break;case"falloff_angle":v.falloffAngle=parseFloat(L.textContent);break;case"quadratic_attenuation":const oe=parseFloat(L.textContent);v.distance=oe?Math.sqrt(1/oe):0;break}}return v}function S(b){let v;switch(b.technique){case"directional":v=new oc;break;case"point":v=new df;break;case"spot":v=new uf;break;case"ambient":v=new Ex;break}return b.parameters.color&&v.color.copy(b.parameters.color),b.parameters.distance&&(v.distance=b.parameters.distance),v}function j(b){const v=Je.lights[b];return v!==void 0?_(v,S):(console.warn("THREE.ColladaLoader: Couldn't find light with ID:",b),null)}function Y(b){const v={name:b.getAttribute("name"),sources:{},vertices:{},primitives:[]},R=n(b,"mesh")[0];if(R!==void 0){for(let w=0;w<R.childNodes.length;w++){const L=R.childNodes[w];if(L.nodeType!==1)continue;const J=L.getAttribute("id");switch(L.nodeName){case"source":v.sources[J]=de(L);break;case"vertices":v.vertices=xe(L);break;case"polygons":console.warn("THREE.ColladaLoader: Unsupported primitive type: ",L.nodeName);break;case"lines":case"linestrips":case"polylist":case"triangles":v.primitives.push(it(L));break;default:console.log(L)}}Je.geometries[b.getAttribute("id")]=v}}function de(b){const v={array:[],stride:3};for(let R=0;R<b.childNodes.length;R++){const w=b.childNodes[R];if(w.nodeType===1)switch(w.nodeName){case"float_array":v.array=r(w.textContent);break;case"Name_array":v.array=i(w.textContent);break;case"technique_common":const L=n(w,"accessor")[0];L!==void 0&&(v.stride=parseInt(L.getAttribute("stride")));break}}return v}function xe(b){const v={};for(let R=0;R<b.childNodes.length;R++){const w=b.childNodes[R];w.nodeType===1&&(v[w.getAttribute("semantic")]=a(w.getAttribute("source")))}return v}function it(b){const v={type:b.nodeName,material:b.getAttribute("material"),count:parseInt(b.getAttribute("count")),inputs:{},stride:0,hasUV:!1};for(let R=0,w=b.childNodes.length;R<w;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"input":const J=a(L.getAttribute("source")),oe=L.getAttribute("semantic"),De=parseInt(L.getAttribute("offset")),Se=parseInt(L.getAttribute("set")),Re=Se>0?oe+Se:oe;v.inputs[Re]={id:J,offset:De},v.stride=Math.max(v.stride,De+1),oe==="TEXCOORD"&&(v.hasUV=!0);break;case"vcount":v.vcount=o(L.textContent);break;case"p":v.p=o(L.textContent);break}}return v}function ct(b){const v={};for(let R=0;R<b.length;R++){const w=b[R];v[w.type]===void 0&&(v[w.type]=[]),v[w.type].push(w)}return v}function Ct(b){let v=0;for(let R=0,w=b.length;R<w;R++)b[R].hasUV===!0&&v++;v>0&&v<b.length&&(b.uvsNeedsFix=!0)}function Ut(b){const v={},R=b.sources,w=b.vertices,L=b.primitives;if(L.length===0)return{};const J=ct(L);for(const oe in J){const De=J[oe];Ct(De),v[oe]=ft(De,R,w)}return v}function ft(b,v,R){const w={},L={array:[],stride:0},J={array:[],stride:0},oe={array:[],stride:0},De={array:[],stride:0},Se={array:[],stride:0},Re={array:[],stride:4},Ge={array:[],stride:4},me=new Xt,ze=[];let Ue=0;for(let Ke=0;Ke<b.length;Ke++){const je=b[Ke],Pt=je.inputs;let bt=0;switch(je.type){case"lines":case"linestrips":bt=je.count*2;break;case"triangles":bt=je.count*3;break;case"polylist":for(let gt=0;gt<je.count;gt++){const _t=je.vcount[gt];switch(_t){case 3:bt+=3;break;case 4:bt+=6;break;default:bt+=(_t-2)*3;break}}break;default:console.warn("THREE.ColladaLoader: Unknow primitive type:",je.type)}me.addGroup(Ue,bt,Ke),Ue+=bt,je.material&&ze.push(je.material);for(const gt in Pt){const _t=Pt[gt];switch(gt){case"VERTEX":for(const Yn in R){const an=R[Yn];switch(Yn){case"POSITION":const us=L.array.length;if(pt(je,v[an],_t.offset,L.array),L.stride=v[an].stride,v.skinWeights&&v.skinIndices&&(pt(je,v.skinIndices,_t.offset,Re.array),pt(je,v.skinWeights,_t.offset,Ge.array)),je.hasUV===!1&&b.uvsNeedsFix===!0){const Wf=(L.array.length-us)/L.stride;for(let Uc=0;Uc<Wf;Uc++)oe.array.push(0,0)}break;case"NORMAL":pt(je,v[an],_t.offset,J.array),J.stride=v[an].stride;break;case"COLOR":pt(je,v[an],_t.offset,Se.array),Se.stride=v[an].stride;break;case"TEXCOORD":pt(je,v[an],_t.offset,oe.array),oe.stride=v[an].stride;break;case"TEXCOORD1":pt(je,v[an],_t.offset,De.array),oe.stride=v[an].stride;break;default:console.warn('THREE.ColladaLoader: Semantic "%s" not handled in geometry build process.',Yn)}}break;case"NORMAL":pt(je,v[_t.id],_t.offset,J.array),J.stride=v[_t.id].stride;break;case"COLOR":pt(je,v[_t.id],_t.offset,Se.array,!0),Se.stride=v[_t.id].stride;break;case"TEXCOORD":pt(je,v[_t.id],_t.offset,oe.array),oe.stride=v[_t.id].stride;break;case"TEXCOORD1":pt(je,v[_t.id],_t.offset,De.array),De.stride=v[_t.id].stride;break}}}return L.array.length>0&&me.setAttribute("position",new Tt(L.array,L.stride)),J.array.length>0&&me.setAttribute("normal",new Tt(J.array,J.stride)),Se.array.length>0&&me.setAttribute("color",new Tt(Se.array,Se.stride)),oe.array.length>0&&me.setAttribute("uv",new Tt(oe.array,oe.stride)),De.array.length>0&&me.setAttribute("uv1",new Tt(De.array,De.stride)),Re.array.length>0&&me.setAttribute("skinIndex",new Tt(Re.array,Re.stride)),Ge.array.length>0&&me.setAttribute("skinWeight",new Tt(Ge.array,Ge.stride)),w.data=me,w.type=b[0].type,w.materialKeys=ze,w}function pt(b,v,R,w,L=!1){const J=b.p,oe=b.stride,De=b.vcount;function Se(me){let ze=J[me+R]*Ge;const Ue=ze+Ge;for(;ze<Ue;ze++)w.push(Re[ze]);if(L){const Ke=w.length-Ge-1;$r.setRGB(w[Ke+0],w[Ke+1],w[Ke+2]).convertSRGBToLinear(),w[Ke+0]=$r.r,w[Ke+1]=$r.g,w[Ke+2]=$r.b}}const Re=v.array,Ge=v.stride;if(b.vcount!==void 0){let me=0;for(let ze=0,Ue=De.length;ze<Ue;ze++){const Ke=De[ze];if(Ke===4){const je=me+oe*0,Pt=me+oe*1,bt=me+oe*2,gt=me+oe*3;Se(je),Se(Pt),Se(gt),Se(Pt),Se(bt),Se(gt)}else if(Ke===3){const je=me+oe*0,Pt=me+oe*1,bt=me+oe*2;Se(je),Se(Pt),Se(bt)}else if(Ke>4)for(let je=1,Pt=Ke-2;je<=Pt;je++){const bt=me+oe*0,gt=me+oe*je,_t=me+oe*(je+1);Se(bt),Se(gt),Se(_t)}me+=oe*Ke}}else for(let me=0,ze=J.length;me<ze;me+=oe)Se(me)}function Et(b){return _(Je.geometries[b],Ut)}function Nn(b){const v={name:b.getAttribute("name")||"",joints:{},links:[]};for(let R=0;R<b.childNodes.length;R++){const w=b.childNodes[R];if(w.nodeType===1)switch(w.nodeName){case"technique_common":bn(w,v);break}}Je.kinematicsModels[b.getAttribute("id")]=v}function on(b){return b.build!==void 0?b.build:b}function In(b){return _(Je.kinematicsModels[b],on)}function bn(b,v){for(let R=0;R<b.childNodes.length;R++){const w=b.childNodes[R];if(w.nodeType===1)switch(w.nodeName){case"joint":v.joints[w.getAttribute("sid")]=Di(w);break;case"link":v.links.push(tr(w));break}}}function Di(b){let v;for(let R=0;R<b.childNodes.length;R++){const w=b.childNodes[R];if(w.nodeType===1)switch(w.nodeName){case"prismatic":case"revolute":v=cs(w);break}}return v}function cs(b){const v={sid:b.getAttribute("sid"),name:b.getAttribute("name")||"",axis:new F,limits:{min:0,max:0},type:b.nodeName,static:!1,zeroPosition:0,middlePosition:0};for(let R=0;R<b.childNodes.length;R++){const w=b.childNodes[R];if(w.nodeType===1)switch(w.nodeName){case"axis":const L=r(w.textContent);v.axis.fromArray(L);break;case"limits":const J=w.getElementsByTagName("max")[0],oe=w.getElementsByTagName("min")[0];v.limits.max=parseFloat(J.textContent),v.limits.min=parseFloat(oe.textContent);break}}return v.limits.min>=v.limits.max&&(v.static=!0),v.middlePosition=(v.limits.min+v.limits.max)/2,v}function tr(b){const v={sid:b.getAttribute("sid"),name:b.getAttribute("name")||"",attachments:[],transforms:[]};for(let R=0;R<b.childNodes.length;R++){const w=b.childNodes[R];if(w.nodeType===1)switch(w.nodeName){case"attachment_full":v.attachments.push(jr(w));break;case"matrix":case"translate":case"rotate":v.transforms.push(Xr(w));break}}return v}function jr(b){const v={joint:b.getAttribute("joint").split("/").pop(),transforms:[],links:[]};for(let R=0;R<b.childNodes.length;R++){const w=b.childNodes[R];if(w.nodeType===1)switch(w.nodeName){case"link":v.links.push(tr(w));break;case"matrix":case"translate":case"rotate":v.transforms.push(Xr(w));break}}return v}function Xr(b){const v={type:b.nodeName},R=r(b.textContent);switch(v.type){case"matrix":v.obj=new $e,v.obj.fromArray(R).transpose();break;case"translate":v.obj=new F,v.obj.fromArray(R);break;case"rotate":v.obj=new F,v.obj.fromArray(R),v.angle=qi.degToRad(R[3]);break}return v}function _a(b){const v={name:b.getAttribute("name")||"",rigidBodies:{}};for(let R=0;R<b.childNodes.length;R++){const w=b.childNodes[R];if(w.nodeType===1)switch(w.nodeName){case"rigid_body":v.rigidBodies[w.getAttribute("name")]={},ya(w,v.rigidBodies[w.getAttribute("name")]);break}}Je.physicsModels[b.getAttribute("id")]=v}function ya(b,v){for(let R=0;R<b.childNodes.length;R++){const w=b.childNodes[R];if(w.nodeType===1)switch(w.nodeName){case"technique_common":P(w,v);break}}}function P(b,v){for(let R=0;R<b.childNodes.length;R++){const w=b.childNodes[R];if(w.nodeType===1)switch(w.nodeName){case"inertia":v.inertia=r(w.textContent);break;case"mass":v.mass=r(w.textContent)[0];break}}}function X(b){const v={bindJointAxis:[]};for(let R=0;R<b.childNodes.length;R++){const w=b.childNodes[R];if(w.nodeType===1)switch(w.nodeName){case"bind_joint_axis":v.bindJointAxis.push(Q(w));break}}Je.kinematicsScenes[a(b.getAttribute("url"))]=v}function Q(b){const v={target:b.getAttribute("target").split("/").pop()};for(let R=0;R<b.childNodes.length;R++){const w=b.childNodes[R];if(w.nodeType===1)switch(w.nodeName){case"axis":const L=w.getElementsByTagName("param")[0];v.axis=L.textContent;const J=v.axis.split("inst_").pop().split("axis")[0];v.jointIndex=J.substring(0,J.length-1);break}}return v}function K(b){return b.build!==void 0?b.build:b}function Z(b){return _(Je.kinematicsScenes[b],K)}function Ce(){const b=Object.keys(Je.kinematicsModels)[0],v=Object.keys(Je.kinematicsScenes)[0],R=Object.keys(Je.visualScenes)[0];if(b===void 0||v===void 0)return;const w=In(b),L=Z(v),J=hs(R),oe=L.bindJointAxis,De={};for(let Ge=0,me=oe.length;Ge<me;Ge++){const ze=oe[Ge],Ue=Lt.querySelector('[sid="'+ze.target+'"]');if(Ue){const Ke=Ue.parentElement;Se(ze.jointIndex,Ke)}}function Se(Ge,me){const ze=me.getAttribute("name"),Ue=w.joints[Ge];J.traverse(function(Ke){Ke.name===ze&&(De[Ge]={object:Ke,transforms:ke(me),joint:Ue,position:Ue.zeroPosition})})}const Re=new $e;Dc={joints:w&&w.joints,getJointValue:function(Ge){const me=De[Ge];if(me)return me.position;console.warn("THREE.ColladaLoader: Joint "+Ge+" doesn't exist.")},setJointValue:function(Ge,me){const ze=De[Ge];if(ze){const Ue=ze.joint;if(me>Ue.limits.max||me<Ue.limits.min)console.warn("THREE.ColladaLoader: Joint "+Ge+" value "+me+" outside of limits (min: "+Ue.limits.min+", max: "+Ue.limits.max+").");else if(Ue.static)console.warn("THREE.ColladaLoader: Joint "+Ge+" is static.");else{const Ke=ze.object,je=Ue.axis,Pt=ze.transforms;Oe.identity();for(let bt=0;bt<Pt.length;bt++){const gt=Pt[bt];if(gt.sid&&gt.sid.indexOf(Ge)!==-1)switch(Ue.type){case"revolute":Oe.multiply(Re.makeRotationAxis(je,qi.degToRad(me)));break;case"prismatic":Oe.multiply(Re.makeTranslation(je.x*me,je.y*me,je.z*me));break;default:console.warn("THREE.ColladaLoader: Unknown joint type: "+Ue.type);break}else switch(gt.type){case"matrix":Oe.multiply(gt.obj);break;case"translate":Oe.multiply(Re.makeTranslation(gt.obj.x,gt.obj.y,gt.obj.z));break;case"scale":Oe.scale(gt.obj);break;case"rotate":Oe.multiply(Re.makeRotationAxis(gt.obj,gt.angle));break}}Ke.matrix.copy(Oe),Ke.matrix.decompose(Ke.position,Ke.quaternion,Ke.scale),De[Ge].position=me}}else console.log("THREE.ColladaLoader: "+Ge+" does not exist.")}}}function ke(b){const v=[],R=Lt.querySelector('[id="'+b.id+'"]');for(let w=0;w<R.childNodes.length;w++){const L=R.childNodes[w];if(L.nodeType!==1)continue;let J,oe;switch(L.nodeName){case"matrix":J=r(L.textContent);const De=new $e().fromArray(J).transpose();v.push({sid:L.getAttribute("sid"),type:L.nodeName,obj:De});break;case"translate":case"scale":J=r(L.textContent),oe=new F().fromArray(J),v.push({sid:L.getAttribute("sid"),type:L.nodeName,obj:oe});break;case"rotate":J=r(L.textContent),oe=new F().fromArray(J);const Se=qi.degToRad(J[3]);v.push({sid:L.getAttribute("sid"),type:L.nodeName,obj:oe,angle:Se});break}}return v}function Ve(b){const v=b.getElementsByTagName("node");for(let R=0;R<v.length;R++){const w=v[R];w.hasAttribute("id")===!1&&w.setAttribute("id",l())}}const Oe=new $e,Ze=new F;function tt(b){const v={name:b.getAttribute("name")||"",type:b.getAttribute("type"),id:b.getAttribute("id"),sid:b.getAttribute("sid"),matrix:new $e,nodes:[],instanceCameras:[],instanceControllers:[],instanceLights:[],instanceGeometries:[],instanceNodes:[],transforms:{}};for(let R=0;R<b.childNodes.length;R++){const w=b.childNodes[R];if(w.nodeType!==1)continue;let L;switch(w.nodeName){case"node":v.nodes.push(w.getAttribute("id")),tt(w);break;case"instance_camera":v.instanceCameras.push(a(w.getAttribute("url")));break;case"instance_controller":v.instanceControllers.push(ot(w));break;case"instance_light":v.instanceLights.push(a(w.getAttribute("url")));break;case"instance_geometry":v.instanceGeometries.push(ot(w));break;case"instance_node":v.instanceNodes.push(a(w.getAttribute("url")));break;case"matrix":L=r(w.textContent),v.matrix.multiply(Oe.fromArray(L).transpose()),v.transforms[w.getAttribute("sid")]=w.nodeName;break;case"translate":L=r(w.textContent),Ze.fromArray(L),v.matrix.multiply(Oe.makeTranslation(Ze.x,Ze.y,Ze.z)),v.transforms[w.getAttribute("sid")]=w.nodeName;break;case"rotate":L=r(w.textContent);const J=qi.degToRad(L[3]);v.matrix.multiply(Oe.makeRotationAxis(Ze.fromArray(L),J)),v.transforms[w.getAttribute("sid")]=w.nodeName;break;case"scale":L=r(w.textContent),v.matrix.scale(Ze.fromArray(L)),v.transforms[w.getAttribute("sid")]=w.nodeName;break;case"extra":break;default:console.log(w)}}return di(v.id)?console.warn("THREE.ColladaLoader: There is already a node with ID %s. Exclude current node from further processing.",v.id):Je.nodes[v.id]=v,v}function ot(b){const v={id:a(b.getAttribute("url")),materials:{},skeletons:[]};for(let R=0;R<b.childNodes.length;R++){const w=b.childNodes[R];switch(w.nodeName){case"bind_material":const L=w.getElementsByTagName("instance_material");for(let J=0;J<L.length;J++){const oe=L[J],De=oe.getAttribute("symbol"),Se=oe.getAttribute("target");v.materials[De]=a(Se)}break;case"skeleton":v.skeletons.push(a(w.textContent));break}}return v}function Dt(b,v){const R=[],w=[];let L,J,oe;for(L=0;L<b.length;L++){const Re=b[L];let Ge;if(di(Re))Ge=yt(Re),Bt(Ge,v,R);else if(Ui(Re)){const ze=Je.visualScenes[Re].children;for(let Ue=0;Ue<ze.length;Ue++){const Ke=ze[Ue];if(Ke.type==="JOINT"){const je=yt(Ke.id);Bt(je,v,R)}}}else console.error("THREE.ColladaLoader: Unable to find root bone of skeleton with ID:",Re)}for(L=0;L<v.length;L++)for(J=0;J<R.length;J++)if(oe=R[J],oe.bone.name===v[L].name){w[L]=oe,oe.processed=!0;break}for(L=0;L<R.length;L++)oe=R[L],oe.processed===!1&&(w.push(oe),oe.processed=!0);const De=[],Se=[];for(L=0;L<w.length;L++)oe=w[L],De.push(oe.bone),Se.push(oe.boneInverse);return new sa(De,Se)}function Bt(b,v,R){b.traverse(function(w){if(w.isBone===!0){let L;for(let J=0;J<v.length;J++){const oe=v[J];if(oe.name===w.name){L=oe.boneInverse;break}}L===void 0&&(L=new $e),R.push({bone:w,boneInverse:L,processed:!1})}})}function Qt(b){const v=[],R=b.matrix,w=b.nodes,L=b.type,J=b.instanceCameras,oe=b.instanceControllers,De=b.instanceLights,Se=b.instanceGeometries,Re=b.instanceNodes;for(let me=0,ze=w.length;me<ze;me++)v.push(yt(w[me]));for(let me=0,ze=J.length;me<ze;me++){const Ue=nt(J[me]);Ue!==null&&v.push(Ue.clone())}for(let me=0,ze=oe.length;me<ze;me++){const Ue=oe[me],Ke=ee(Ue.id),je=Et(Ke.id),Pt=et(je,Ue.materials),bt=Ue.skeletons,gt=Ke.skin.joints,_t=Dt(bt,gt);for(let Yn=0,an=Pt.length;Yn<an;Yn++){const us=Pt[Yn];us.isSkinnedMesh&&(us.bind(_t,Ke.skin.bindMatrix),us.normalizeSkinWeights()),v.push(us)}}for(let me=0,ze=De.length;me<ze;me++){const Ue=j(De[me]);Ue!==null&&v.push(Ue.clone())}for(let me=0,ze=Se.length;me<ze;me++){const Ue=Se[me],Ke=Et(Ue.id),je=et(Ke,Ue.materials);for(let Pt=0,bt=je.length;Pt<bt;Pt++)v.push(je[Pt])}for(let me=0,ze=Re.length;me<ze;me++)v.push(yt(Re[me]).clone());let Ge;if(w.length===0&&v.length===1)Ge=v[0];else{Ge=L==="JOINT"?new Yl:new ai;for(let me=0;me<v.length;me++)Ge.add(v[me])}return Ge.name=L==="JOINT"?b.sid:b.name,Ge.matrix.copy(R),Ge.matrix.decompose(Ge.position,Ge.quaternion,Ge.scale),Ge}const Mn=new zn({name:Vn.DEFAULT_MATERIAL_NAME,color:16711935});function mt(b,v){const R=[];for(let w=0,L=b.length;w<L;w++){const J=v[b[w]];J===void 0?(console.warn("THREE.ColladaLoader: Material with key %s not found. Apply fallback material.",b[w]),R.push(Mn)):R.push(Qe(J))}return R}function et(b,v){const R=[];for(const w in b){const L=b[w],J=mt(L.materialKeys,v);if(J.length===0&&(w==="lines"||w==="linestrips"?J.push(new Pr):J.push(new Ai)),w==="lines"||w==="linestrips")for(let Re=0,Ge=J.length;Re<Ge;Re++){const me=J[Re];if(me.isMeshPhongMaterial===!0||me.isMeshLambertMaterial===!0){const ze=new Pr;ze.color.copy(me.color),ze.opacity=me.opacity,ze.transparent=me.transparent,J[Re]=ze}}const oe=L.data.attributes.skinIndex!==void 0,De=J.length===1?J[0]:J;let Se;switch(w){case"lines":Se=new Zl(L.data,De);break;case"linestrips":Se=new ra(L.data,De);break;case"triangles":case"polylist":oe?Se=new Zd(L.data,De):Se=new kt(L.data,De);break}R.push(Se)}return R}function di(b){return Je.nodes[b]!==void 0}function yt(b){return _(Je.nodes[b],Qt)}function $n(b){const v={name:b.getAttribute("name"),children:[]};Ve(b);const R=n(b,"node");for(let w=0;w<R.length;w++)v.children.push(tt(R[w]));Je.visualScenes[b.getAttribute("id")]=v}function nr(b){const v=new ai;v.name=b.name;const R=b.children;for(let w=0;w<R.length;w++){const L=R[w];v.add(yt(L.id))}return v}function Ui(b){return Je.visualScenes[b]!==void 0}function hs(b){return _(Je.visualScenes[b],nr)}function Wt(b){const v=n(b,"instance_visual_scene")[0];return hs(a(v.getAttribute("url")))}function Dn(){const b=Je.clips;if(c(b)===!0){if(c(Je.animations)===!1){const v=[];for(const R in Je.animations){const w=E(R);for(let L=0,J=w.length;L<J;L++)v.push(w[L])}Yr.push(new Nl("default",-1,v))}}else for(const v in b)Yr.push(G(v))}function ir(b){let v="";const R=[b];for(;R.length;){const w=R.shift();w.nodeType===Node.TEXT_NODE?v+=w.textContent:(v+=`
`,R.push.apply(R,w.childNodes))}return v.trim()}if(e.length===0)return{scene:new Kd};const en=new DOMParser().parseFromString(e,"application/xml"),Lt=n(en,"COLLADA")[0],sr=en.getElementsByTagName("parsererror")[0];if(sr!==void 0){const b=n(sr,"div")[0];let v;return b?v=b.textContent:v=ir(sr),console.error(`THREE.ColladaLoader: Failed to parse collada file.
`,v),null}const qr=Lt.getAttribute("version");console.debug("THREE.ColladaLoader: File version",qr);const Nc=h(n(Lt,"asset")[0]),Ic=new sc(this.manager);Ic.setPath(this.resourcePath||t).setCrossOrigin(this.crossOrigin);let va;Du&&(va=new Du(this.manager),va.setPath(this.resourcePath||t));const $r=new Xe,Yr=[];let Dc={},Gf=0;const Je={animations:{},clips:{},controllers:{},images:{},effects:{},materials:{},cameras:{},lights:{},geometries:{},nodes:{},visualScenes:{},kinematicsModels:{},physicsModels:{},kinematicsScenes:{}};f(Lt,"library_animations","animation",p),f(Lt,"library_animation_clips","animation_clip",B),f(Lt,"library_controllers","controller",se),f(Lt,"library_images","image",ie),f(Lt,"library_effects","effect",qe),f(Lt,"library_materials","material",He),f(Lt,"library_cameras","camera",ye),f(Lt,"library_lights","light",lt),f(Lt,"library_geometries","geometry",Y),f(Lt,"library_nodes","node",tt),f(Lt,"library_visual_scenes","visual_scene",$n),f(Lt,"library_kinematics_models","kinematics_model",Nn),f(Lt,"library_physics_models","physics_model",_a),f(Lt,"scene","instance_kinematics_scene",X),g(Je.animations,x),g(Je.clips,ne),g(Je.controllers,Ae),g(Je.images,te),g(Je.effects,ue),g(Je.materials,Me),g(Je.cameras,Ie),g(Je.lights,S),g(Je.geometries,Ut),g(Je.visualScenes,nr),Dn(),Ce();const Kr=Wt(n(Lt,"scene")[0]);return Kr.animations=Yr,Nc.upAxis==="Z_UP"&&(console.warn("THREE.ColladaLoader: You are loading an asset with a Z-UP coordinate system. The loader just rotates the asset to transform it into Y-UP. The vertex data are not converted, see #24289."),Kr.rotation.set(-Math.PI/2,0,0)),Kr.scale.multiplyScalar(Nc.unit),{get animations(){return console.warn("THREE.ColladaLoader: Please access animations over scene.animations now."),Yr},kinematics:Dc,library:Je,scene:Kr}}}function AM(s,e=!1){const t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},o={},a=s[0].morphTargetsRelative,l=new Xt;let c=0;for(let h=0;h<s.length;++h){const u=s[h];let d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(e){let f;if(t)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0;const u=[];for(let d=0;d<s.length;++d){const f=s[d].index;for(let g=0;g<f.count;++g)u.push(f.getX(g)+h);h+=s[d].attributes.position.count}l.setIndex(u)}for(const h in r){const u=Uu(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let _=0;_<o[h].length;++_)f.push(o[h][_][d]);const g=Uu(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function Uu(s){let e,t,n,i=-1,r=0;for(let c=0;c<s.length;++c){const h=s[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}const o=new e(r),a=new It(o,t,n);let l=0;for(let c=0;c<s.length;++c){const h=s[c];if(h.isInterleavedBufferAttribute){const u=l/t;for(let d=0,f=h.count;d<f;d++)for(let g=0;g<t;g++){const _=h.getComponent(d,g);a.setComponent(d+u,g,_)}}else o.set(h.array,l);l+=h.count*t}return i!==void 0&&(a.gpuType=i),a}function zx(s,e=1e-4){e=Math.max(e,Number.EPSILON);const t={},n=s.getIndex(),i=s.getAttribute("position"),r=n?n.count:i.count;let o=0;const a=Object.keys(s.attributes),l={},c={},h=[],u=["getX","getY","getZ","getW"],d=["setX","setY","setZ","setW"];for(let T=0,x=a.length;T<x;T++){const E=a[T],I=s.attributes[E];l[E]=new It(new I.array.constructor(I.count*I.itemSize),I.itemSize,I.normalized);const N=s.morphAttributes[E];N&&(c[E]=new It(new N.array.constructor(N.count*N.itemSize),N.itemSize,N.normalized))}const f=e*.5,g=Math.log10(1/e),_=Math.pow(10,g),p=f*_;for(let T=0;T<r;T++){const x=n?n.getX(T):T;let E="";for(let I=0,N=a.length;I<N;I++){const C=a[I],U=s.getAttribute(C),M=U.itemSize;for(let y=0;y<M;y++)E+=`${~~(U[u[y]](x)*_+p)},`}if(E in t)h.push(t[E]);else{for(let I=0,N=a.length;I<N;I++){const C=a[I],U=s.getAttribute(C),M=s.morphAttributes[C],y=U.itemSize,D=l[C],H=c[C];for(let k=0;k<y;k++){const z=u[k],$=d[k];if(D[$](o,U[z](x)),M)for(let B=0,ne=M.length;B<ne;B++)H[B][$](o,M[B][z](x))}}t[E]=o,h.push(o),o++}}const m=s.clone();for(const T in s.attributes){const x=l[T];if(m.setAttribute(T,new It(x.array.slice(0,o*x.itemSize),x.itemSize,x.normalized)),T in c)for(let E=0;E<c[T].length;E++){const I=c[T][E];m.morphAttributes[T][E]=new It(I.array.slice(0,o*I.itemSize),I.itemSize,I.normalized)}}return m.setIndex(h),m}function Ou(s,e){if(e===zp)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===El||e===Pd){let t=s.getIndex();if(t===null){const o=[],a=s.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===El)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}class Hx extends Vn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Xx(t)}),this.register(function(t){return new qx(t)}),this.register(function(t){return new nb(t)}),this.register(function(t){return new ib(t)}),this.register(function(t){return new sb(t)}),this.register(function(t){return new Yx(t)}),this.register(function(t){return new Kx(t)}),this.register(function(t){return new Zx(t)}),this.register(function(t){return new Jx(t)}),this.register(function(t){return new jx(t)}),this.register(function(t){return new Qx(t)}),this.register(function(t){return new $x(t)}),this.register(function(t){return new tb(t)}),this.register(function(t){return new eb(t)}),this.register(function(t){return new Gx(t)}),this.register(function(t){return new rb(t)}),this.register(function(t){return new ob(t)})}load(e,t,n,i){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=Ji.extractUrlBase(e);o=Ji.resolveURL(c,this.path)}else o=Ji.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Vr(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===mf){try{o[dt.KHR_BINARY_GLTF]=new ab(e)}catch(u){i&&i(u);return}r=JSON.parse(o[dt.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new xb(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case dt.KHR_MATERIALS_UNLIT:o[u]=new Wx;break;case dt.KHR_DRACO_MESH_COMPRESSION:o[u]=new lb(r,this.dracoLoader);break;case dt.KHR_TEXTURE_TRANSFORM:o[u]=new cb;break;case dt.KHR_MESH_QUANTIZATION:o[u]=new hb;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function Vx(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const dt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Gx{constructor(e){this.parser=e,this.name=dt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new Xe(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Yt);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new oc(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new df(h),c.distance=u;break;case"spot":c=new uf(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,bi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class Wx{constructor(){this.name=dt.KHR_MATERIALS_UNLIT}getMaterialType(){return zn}extendParams(e,t,n){const i=[];e.color=new Xe(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Yt),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Ot))}return Promise.all(i)}}class jx{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class Xx{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Xn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new _e(a,a)}return Promise.all(r)}}class qx{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Xn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class $x{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Xn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class Yx{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Xn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new Xe(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Yt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Ot)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class Kx{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Xn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class Zx{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Xn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Xe().setRGB(a[0],a[1],a[2],Yt),Promise.all(r)}}class Jx{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Xn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class Qx{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Xn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new Xe().setRGB(a[0],a[1],a[2],Yt),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Ot)),Promise.all(r)}}class eb{constructor(e){this.parser=e,this.name=dt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Xn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class tb{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Xn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class nb{constructor(e){this.parser=e,this.name=dt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class ib{constructor(e){this.parser=e,this.name=dt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class sb{constructor(e){this.parser=e,this.name=dt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class rb{constructor(e){this.name=dt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class ob{constructor(e){this.name=dt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==mn.TRIANGLES&&c.mode!==mn.TRIANGLE_STRIP&&c.mode!==mn.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const g of u){const _=new $e,p=new F,m=new dn,T=new F(1,1,1),x=new Tv(g.geometry,g.material,d);for(let E=0;E<d;E++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,E),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,E),l.SCALE&&T.fromBufferAttribute(l.SCALE,E),x.setMatrixAt(E,_.compose(p,m,T));for(const E in l)if(E==="_COLOR_0"){const I=l[E];x.instanceColor=new Al(I.array,I.itemSize,I.normalized)}else E!=="TRANSLATION"&&E!=="ROTATION"&&E!=="SCALE"&&g.geometry.setAttribute(E,l[E]);At.prototype.copy.call(x,g),this.parser.assignFinalMaterial(x),f.push(x)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const mf="glTF",fr=12,Fu={JSON:1313821514,BIN:5130562};class ab{constructor(e){this.name=dt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,fr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==mf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-fr,r=new DataView(e,fr);let o=0;for(;o<i;){const a=r.getUint32(o,!0);o+=4;const l=r.getUint32(o,!0);if(o+=4,l===Fu.JSON){const c=new Uint8Array(e,fr+o,a);this.content=n.decode(c)}else if(l===Fu.BIN){const c=fr+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class lb{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=dt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const h in o){const u=Dl[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=Dl[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],f=Vs[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const g in f.attributes){const _=f.attributes[g],p=l[g];p!==void 0&&(_.normalized=p)}u(f)},a,c,Yt,d)})})}}class cb{constructor(){this.name=dt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class hb{constructor(){this.name=dt.KHR_MESH_QUANTIZATION}}class gf extends Hr{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,g=e*c,_=g-c,p=-2*f+3*d,m=f-d,T=1-p,x=m-d+u;for(let E=0;E!==a;E++){const I=o[_+E+a],N=o[_+E+l]*h,C=o[g+E+a],U=o[g+E]*h;r[E]=T*I+x*N+p*C+m*U}return r}}const ub=new dn;class db extends gf{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return ub.fromArray(r).normalize().toArray(r),r}}const mn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Vs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ku={9728:sn,9729:Jt,9984:Md,9985:Fo,9986:_r,9987:Rn},Bu={33071:vn,33648:Vo,10497:kn},ol={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Dl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},xi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},fb={CUBICSPLINE:void 0,LINEAR:Xs,STEP:Rr},al={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function pb(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new ic({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Hn})),s.DefaultMaterial}function Vi(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function bi(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function mb(s,e,t){let n=!1,i=!1,r=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const o=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;o.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;a.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function gb(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function _b(s){let e;const t=s.extensions&&s.extensions[dt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ll(t.attributes):e=s.indices+":"+ll(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+ll(s.targets[n]);return e}function ll(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Ul(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function yb(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const vb=new $e;class xb{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Vx,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,r=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,r=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&r<98?this.textureLoader=new sc(this.options.manager):this.textureLoader=new Tx(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Vr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Vi(r,a,i),bi(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,h]of o.children.entries())r(h,a.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[dt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,o){n.load(Ji.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=ol[i.type],a=Vs[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new It(c,o,l))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],l=ol[i.type],c=Vs[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,p;if(f&&f!==u){const m=Math.floor(d/f),T="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count;let x=t.cache.get(T);x||(_=new c(a,m*f,i.count*f/h),x=new bv(_,f/h),t.cache.add(T,x)),p=new $l(x,l,d%f/h,g)}else a===null?_=new c(i.count*l):_=new c(a,d,i.count*l),p=new It(_,l,g);if(i.sparse!==void 0){const m=ol.SCALAR,T=Vs[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,E=i.sparse.values.byteOffset||0,I=new T(o[1],x,i.sparse.count*m),N=new c(o[2],E,i.sparse.count*l);a!==null&&(p=new It(p.array.slice(),p.itemSize,p.normalized));for(let C=0,U=I.length;C<U;C++){const M=I[C];if(p.setX(M,N[C*l]),l>=2&&p.setY(M,N[C*l+1]),l>=3&&p.setZ(M,N[C*l+2]),l>=4&&p.setW(M,N[C*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return p})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const i=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(r.samplers||{})[o.sampler]||{};return h.magFilter=ku[d.magFilter]||Jt,h.minFilter=ku[d.minFilter]||Rn,h.wrapS=Bu[d.wrapS]||kn,h.wrapT=Bu[d.wrapT]||kn,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const p=new Ht(_);p.needsUpdate=!0,d(p)}),t.load(Ji.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),u.userData.mimeType=o.mimeType||yb(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[dt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[dt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=r.associations.get(o);o=r.extensions[dt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Jd,un.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Pr,un.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return ic}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let o;const a={},l=r.extensions||{},c=[];if(l[dt.KHR_MATERIALS_UNLIT]){const u=i[dt.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,r,t))}else{const u=r.pbrMetallicRoughness||{};if(a.color=new Xe(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Yt),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture,Ot)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=yn);const h=r.alphaMode||al.OPAQUE;if(h===al.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===al.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==zn&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new _e(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==zn&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==zn){const u=r.emissiveFactor;a.emissive=new Xe().setRGB(u[0],u[1],u[2],Yt)}return r.emissiveTexture!==void 0&&o!==zn&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Ot)),Promise.all(c).then(function(){const u=new o(a);return r.name&&(u.name=r.name),bi(u,r),t.associations.set(u,{materials:e}),r.extensions&&Vi(i,u,r),u})}createUniqueName(e){const t=St.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[dt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return zu(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],h=_b(c),u=i[h];if(u)o.push(u.promise);else{let d;c.extensions&&c.extensions[dt.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=zu(new Xt,c,t),i[h]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const h=o[l].material===void 0?pb(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,g=h.length;f<g;f++){const _=h[f],p=o[f];let m;const T=c[f];if(p.mode===mn.TRIANGLES||p.mode===mn.TRIANGLE_STRIP||p.mode===mn.TRIANGLE_FAN||p.mode===void 0)m=r.isSkinnedMesh===!0?new Zd(_,T):new kt(_,T),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),p.mode===mn.TRIANGLE_STRIP?m.geometry=Ou(m.geometry,Pd):p.mode===mn.TRIANGLE_FAN&&(m.geometry=Ou(m.geometry,El));else if(p.mode===mn.LINES)m=new Zl(_,T);else if(p.mode===mn.LINE_STRIP)m=new ra(_,T);else if(p.mode===mn.LINE_LOOP)m=new wv(_,T);else if(p.mode===mn.POINTS)m=new Av(_,T);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(m.geometry.morphAttributes).length>0&&gb(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),bi(m,r),p.extensions&&Vi(i,m,p),t.assignFinalMaterial(m),u.push(m)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&Vi(i,u[0],r),u[0];const d=new ai;r.extensions&&Vi(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new $t(qi.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new na(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),bi(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),o=i,a=[],l=[];for(let c=0,h=o.length;c<h;c++){const u=o[c];if(u){a.push(u);const d=new $e;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new sa(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],g=i.samplers[f.sampler],_=f.target,p=_.node,m=i.parameters!==void 0?i.parameters[g.input]:g.input,T=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",p)),a.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",T)),c.push(g),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],g=u[2],_=u[3],p=u[4],m=[];for(let T=0,x=d.length;T<x;T++){const E=d[T],I=f[T],N=g[T],C=_[T],U=p[T];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();const M=n._createAnimationTracks(E,I,N,C,U);if(M)for(let y=0;y<M.length;y++)m.push(M[y])}return new Nl(r,void 0,m)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,h=a.length;c<h;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,vb)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(r.isBone===!0?h=new Yl:c.length>1?h=new ai:c.length===1?h=c[0]:h=new At,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=o),bi(h,r),r.extensions&&Vi(n,h,r),r.matrix!==void 0){const u=new $e;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new ai;n.name&&(r.name=i.createUniqueName(n.name)),bi(r,n),n.extensions&&Vi(t,r,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++)r.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof un||d instanceof Ht)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(r),r})}_createAnimationTracks(e,t,n,i,r){const o=[],a=e.name?e.name:e.uuid,l=[];xi[r.path]===xi.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(xi[r.path]){case xi.weights:c=Ys;break;case xi.rotation:c=Pi;break;case xi.position:case xi.scale:c=Ni;break;default:switch(n.itemSize){case 1:c=Ys;break;case 2:case 3:default:c=Ni;break}break}const h=i.interpolation!==void 0?fb[i.interpolation]:Xs,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const g=new c(l[d]+"."+xi[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Ul(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Pi?db:gf;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function bb(s,e,t){const n=e.attributes,i=new Wn;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new F(l[0],l[1],l[2]),new F(c[0],c[1],c[2])),a.normalized){const h=Ul(Vs[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new F,l=new F;for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const _=Ul(Vs[d.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;const o=new Pn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function zu(s,e,t){const n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){s.setAttribute(a,l)})}for(const o in n){const a=Dl[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){const o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return xt.workingColorSpace!==Yt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${xt.workingColorSpace}" not supported.`),bi(s,e),bb(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?mb(s,e.targets,t):s})}class Mb extends Vn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=new Vr(this.manager);o.setPath(this.path),o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(a){try{t(r.parse(a))}catch(l){i?i(l):console.error(l),r.manager.itemError(e)}},n,i)}parse(e){function t(c){const h=new DataView(c),u=32/8*3+32/8*3*3+16/8,d=h.getUint32(80,!0);if(80+32/8+d*u===h.byteLength)return!0;const g=[115,111,108,105,100];for(let _=0;_<5;_++)if(n(g,h,_))return!1;return!0}function n(c,h,u){for(let d=0,f=c.length;d<f;d++)if(c[d]!==h.getUint8(u+d))return!1;return!0}function i(c){const h=new DataView(c),u=h.getUint32(80,!0);let d,f,g,_=!1,p,m,T,x,E;for(let D=0;D<70;D++)h.getUint32(D,!1)==1129270351&&h.getUint8(D+4)==82&&h.getUint8(D+5)==61&&(_=!0,p=new Float32Array(u*3*3),m=h.getUint8(D+6)/255,T=h.getUint8(D+7)/255,x=h.getUint8(D+8)/255,E=h.getUint8(D+9)/255);const I=84,N=50,C=new Xt,U=new Float32Array(u*3*3),M=new Float32Array(u*3*3),y=new Xe;for(let D=0;D<u;D++){const H=I+D*N,k=h.getFloat32(H,!0),z=h.getFloat32(H+4,!0),$=h.getFloat32(H+8,!0);if(_){const B=h.getUint16(H+48,!0);(B&32768)===0?(d=(B&31)/31,f=(B>>5&31)/31,g=(B>>10&31)/31):(d=m,f=T,g=x)}for(let B=1;B<=3;B++){const ne=H+B*12,G=D*3*3+(B-1)*3;U[G]=h.getFloat32(ne,!0),U[G+1]=h.getFloat32(ne+4,!0),U[G+2]=h.getFloat32(ne+8,!0),M[G]=k,M[G+1]=z,M[G+2]=$,_&&(y.set(d,f,g).convertSRGBToLinear(),p[G]=y.r,p[G+1]=y.g,p[G+2]=y.b)}}return C.setAttribute("position",new It(U,3)),C.setAttribute("normal",new It(M,3)),_&&(C.setAttribute("color",new It(p,3)),C.hasColors=!0,C.alpha=E),C}function r(c){const h=new Xt,u=/solid([\s\S]*?)endsolid/g,d=/facet([\s\S]*?)endfacet/g,f=/solid\s(.+)/;let g=0;const _=/[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source,p=new RegExp("vertex"+_+_+_,"g"),m=new RegExp("normal"+_+_+_,"g"),T=[],x=[],E=[],I=new F;let N,C=0,U=0,M=0;for(;(N=u.exec(c))!==null;){U=M;const y=N[0],D=(N=f.exec(y))!==null?N[1]:"";for(E.push(D);(N=d.exec(y))!==null;){let z=0,$=0;const B=N[0];for(;(N=m.exec(B))!==null;)I.x=parseFloat(N[1]),I.y=parseFloat(N[2]),I.z=parseFloat(N[3]),$++;for(;(N=p.exec(B))!==null;)T.push(parseFloat(N[1]),parseFloat(N[2]),parseFloat(N[3])),x.push(I.x,I.y,I.z),z++,M++;$!==1&&console.error("THREE.STLLoader: Something isn't right with the normal of face number "+g),z!==3&&console.error("THREE.STLLoader: Something isn't right with the vertices of face number "+g),g++}const H=U,k=M-U;h.userData.groupNames=E,h.addGroup(H,k,C),C++}return h.setAttribute("position",new Tt(T,3)),h.setAttribute("normal",new Tt(x,3)),h}function o(c){return typeof c!="string"?new TextDecoder().decode(c):c}function a(c){if(typeof c=="string"){const h=new Uint8Array(c.length);for(let u=0;u<c.length;u++)h[u]=c.charCodeAt(u)&255;return h.buffer||h}else return c}const l=a(e);return t(l)?i(l):r(o(e))}}const _f=new Zs(1,1,1);_f.userData.shared=!0;const yf=new nc(1,32,32);yf.userData.shared=!0;const vf=new ec(1,1,1,32);vf.userData.shared=!0;const Hu=new dn,Vu=new rn;function Gi(s){if(!s)return[0,0,0];const e=s.trim().split(/\s+/).map(Number);return[e[0]??0,e[1]??0,e[2]??0]}function Gu(s,e){Vu.set(e[0],e[1],e[2],"ZYX"),Hu.setFromEuler(Vu).premultiply(s.quaternion),s.quaternion.copy(Hu)}class hc{constructor(){this.packages="",this.workingPath="",this.parseVisual=!0,this.parseCollision=!1,this.fetchOptions={},this.loadMesh=hc.defaultMeshLoader}async load(e,t){const n={...t},i=n.workingPath??Ji.extractUrlBase(e),r=n.fetchOptions??this.fetchOptions,o=await fetch(e,r);if(!o.ok)throw new Error(`URDFLoader: failed to fetch "${e}" (${o.status} ${o.statusText})`);const a=await o.text();return this.parse(a,{...n,workingPath:i})}parse(e,t){var N;const n=(t==null?void 0:t.packages)??this.packages,i=(t==null?void 0:t.workingPath)??this.workingPath,r=(t==null?void 0:t.parseVisual)??this.parseVisual,o=(t==null?void 0:t.parseCollision)??this.parseCollision,a=(t==null?void 0:t.loadMesh)??this.loadMesh,l=new hf,c=Sb(n,i),h={},u={},d={};let f;if(e instanceof Document?f=e.querySelector("robot"):e instanceof Element?f=e:f=new DOMParser().parseFromString(e,"text/xml").querySelector("robot"),!f)throw new Error("URDFLoader: no <robot> element found");for(const C of f.querySelectorAll(":scope > material")){const U=C.getAttribute("name")??"";h[U]=I(C)}const g={},_={};for(const C of f.querySelectorAll(":scope > link")){const U=C.getAttribute("name")??"",M=!f.querySelector(`child[link="${U}"]`);u[U]=m(C,M?new Iu:new ff)}for(const C of f.querySelectorAll(":scope > joint")){const U=C.getAttribute("name")??"";d[U]=T(C)}const p=Object.values(u).find(C=>C instanceof Iu);p.robotName=f.getAttribute("name")??"",p.urdfRobotNode=f,p.joints=d,p.links=u,p.colliders=_,p.visual=g;for(const C of Object.values(d))C instanceof rl&&((N=d[C.mimicJoint])==null||N.mimicJoints.push(C));return Eb(Object.values(d)),p.frames={..._,...g,...u,...d},p;function m(C,U){if(U.name=C.getAttribute("name")??"",U.urdfName=U.name,U.urdfNode=C,r)for(const M of C.querySelectorAll(":scope > visual")){const y=x(M,!1);U.add(y);const D=M.getAttribute("name");D&&(y.name=D,y.urdfName=D,g[D]=y)}if(o)for(const M of C.querySelectorAll(":scope > collision")){const y=x(M,!0);U.add(y);const D=M.getAttribute("name");D&&(y.name=D,y.urdfName=D,_[D]=y)}return U}function T(C){const U=C.querySelector(":scope > mimic"),M=U?new rl:new pf;M instanceof rl&&(M.mimicJoint=U.getAttribute("joint")??"",M.multiplier=parseFloat(U.getAttribute("multiplier")??"1"),M.offset=parseFloat(U.getAttribute("offset")??"0")),M.urdfNode=C,M.name=C.getAttribute("name")??"",M.urdfName=M.name,M.jointType=C.getAttribute("type")??"fixed";let y=null,D=null,H=[0,0,0],k=[0,0,0];for(const z of C.children)switch(z.nodeName.toLowerCase()){case"origin":H=Gi(z.getAttribute("xyz")),k=Gi(z.getAttribute("rpy"));break;case"parent":y=u[z.getAttribute("link")??""]??null;break;case"child":D=u[z.getAttribute("link")??""]??null;break;case"limit":M.limit.lower=parseFloat(z.getAttribute("lower")??String(M.limit.lower)),M.limit.upper=parseFloat(z.getAttribute("upper")??String(M.limit.upper));break;case"axis":{const[$,B,ne]=Gi(z.getAttribute("xyz"));M.axis.set($,B,ne).normalize();break}}if(!y||!D)throw new Error(`URDFLoader: joint "${M.name}" missing parent or child link`);return y.add(M),M.add(D),M.rotation.set(0,0,0),Gu(M,k),M.position.set(H[0],H[1],H[2]),M}function x(C,U){const M=U?new Fx:new kx;M.urdfNode=C;let y=null;const D=C.querySelector(":scope > material");if(D){const z=D.getAttribute("name")??"";y=z&&h[z]?h[z]:I(D)}const H=C.querySelector(":scope > geometry");if(H){const z=H.firstElementChild;z&&E(z,M,y??new Ai)}const k=C.querySelector(":scope > origin");if(k){const z=Gi(k.getAttribute("xyz")),$=Gi(k.getAttribute("rpy"));M.position.set(z[0],z[1],z[2]),M.rotation.set(0,0,0),Gu(M,$)}return M}function E(C,U,M){switch(C.nodeName.toLowerCase()){case"mesh":{const y=C.getAttribute("filename");if(!y)return;const D=c(y);if(!D)return;const H=C.getAttribute("scale");if(H){const[k,z,$]=Gi(H);U.scale.set(k,z,$)}l.itemStart(D),a(D,l).then(k=>{k&&(k instanceof kt&&(k.material=M),k.position.set(0,0,0),k.quaternion.identity(),U.add(k))}).catch(k=>console.error(`URDFLoader: failed to load mesh "${D}"`,k)).finally(()=>l.itemEnd(D));break}case"box":{const y=Gi(C.getAttribute("size")),D=new kt(_f,M);D.scale.set(y[0],y[1],y[2]),U.add(D);break}case"sphere":{const y=parseFloat(C.getAttribute("radius")??"0"),D=new kt(yf,M);D.scale.setScalar(y),U.add(D);break}case"cylinder":{const y=parseFloat(C.getAttribute("radius")??"0"),D=parseFloat(C.getAttribute("length")??"0"),H=new kt(vf,M);H.scale.set(y,D,y),H.rotation.set(Math.PI/2,0,0),U.add(H);break}}}function I(C){const U=new Ai;U.name=C.getAttribute("name")??"";const M=C.querySelector(":scope > color");if(M){const D=(M.getAttribute("rgba")??"1 1 1 1").trim().split(/\s+/).map(Number);U.color.setRGB(D[0]??1,D[1]??1,D[2]??1),U.opacity=D[3]??1,U.transparent=U.opacity<1,U.depthWrite=!U.transparent}const y=C.querySelector(":scope > texture");if(y){const D=y.getAttribute("filename");if(D){const H=c(D);if(H){const k=new sc(l);U.map=k.load(H),U.map.colorSpace=Ot}}}return U}}static async defaultMeshLoader(e,t){var i;switch(((i=e.split(".").pop())==null?void 0:i.toLowerCase())??""){case"stl":return new Promise((r,o)=>{new Mb(t).load(e,a=>r(new kt(a,new Ai)),void 0,o)});case"dae":return new Promise((r,o)=>{new Bx(t).load(e,a=>r(a.scene),void 0,o)});case"glb":case"gltf":return new Promise((r,o)=>{new Hx(t).load(e,a=>r(a.scene),void 0,o)});default:return console.warn(`URDFLoader: no loader for "${e}"`),null}}}function Sb(s,e){return function(n){if(!n.startsWith("package://"))return!e||n.startsWith("/")||n.startsWith("http")||n.startsWith("blob:")?n:e+n;const[i,r]=n.slice(10).split(/\/(.+)/);return typeof s=="string"?s.endsWith(i)?`${s}/${r}`:`${s}/${i}/${r}`:typeof s=="function"?`${s(i)}/${r}`:i in s?`${s[i]}/${r}`:(console.error(`URDFLoader: package "${i}" not in package map`),null)}}function Eb(s){for(const e of s){const t=new Set,n=[e];for(;n.length>0;){const i=n.pop();if(t.has(i))throw new Error("URDFLoader: infinite mimic joint loop detected");t.add(i);for(const r of i.mimicJoints)n.push(r)}}}function Wu(s,e){let t=s;for(;t;){const n=t;if(n.isURDFJoint&&(e||n.jointType!=="fixed"))return n;t=t.parent}return null}const cl=new F,hl=new F,Ds=new F,On=new F,Io=new F,Bo=new F,zo=new F,An=new wn;class Tb{constructor(e){this.enabled=!0,this.raycaster=new cc,this.initialGrabPoint=new F,this.hovered=null,this.hoveredAny=null,this.manipulating=null,this.hitDistance=-1,this.scene=e}update(){if(this.manipulating)return;const t=this.raycaster.intersectObject(this.scene,!0)[0],n=t?Wu(t.object,!1):null,i=t?Wu(t.object,!0):null;t&&(this.hitDistance=t.distance,this.initialGrabPoint.copy(t.point)),n!==this.hovered&&(this.hovered&&this.onUnhover(this.hovered),this.hovered=n,n&&this.onHover(n)),i!==this.hoveredAny&&(this.hoveredAny&&this.onUnhoverAny(this.hoveredAny),this.hoveredAny=i,i&&this.onHoverAny(i))}moveRay(e){const{raycaster:t,hitDistance:n,manipulating:i}=this;if(i){t.ray.at(n,cl),e.at(n,hl);let r=0;switch(i.jointType){case"revolute":case"continuous":r=this.getRevoluteDelta(i,cl,hl);break;case"prismatic":r=this.getPrismaticDelta(i,cl,hl);break}r&&this.updateJoint(i,i.angle+r)}t.ray.copy(e),this.update()}setGrabbed(e){if(e){if(this.manipulating!==null||this.hovered===null)return;this.manipulating=this.hovered,this.onDragStart(this.hovered)}else{if(this.manipulating===null)return;this.onDragEnd(this.manipulating),this.manipulating=null,this.update()}}getRevoluteDelta(e,t,n){return On.copy(e.axis).transformDirection(e.matrixWorld).normalize(),Ds.set(0,0,0).applyMatrix4(e.matrixWorld),An.setFromNormalAndCoplanarPoint(On,Ds),An.projectPoint(t,Bo).sub(Ds),An.projectPoint(n,zo).sub(Ds),On.crossVectors(Bo,zo),Math.sign(On.dot(An.normal))*zo.angleTo(Bo)}getPrismaticDelta(e,t,n){return On.subVectors(n,t),An.normal.copy(e.axis).transformDirection(e.parent.matrixWorld).normalize(),On.dot(An.normal)}updateJoint(e,t){e.setJointValue(t)}onDragStart(e){}onDragEnd(e){}onHover(e){}onUnhover(e){}onHoverAny(e){}onUnhoverAny(e){}}class wb extends Tb{constructor(e,t,n){super(e),this._raycaster=new cc,this._mouse=new _e,this._pendingMove=null,this._moveRaf=0,this.camera=t,this.domElement=n;const i=r=>{const o=n.getBoundingClientRect();this._mouse.x=(r.clientX-o.left)/o.width*2-1,this._mouse.y=-((r.clientY-o.top)/o.height)*2+1};this._onDown=r=>{i(r),this._raycaster.setFromCamera(this._mouse,t),this.moveRay(this._raycaster.ray),this.setGrabbed(!0)},this._onMove=r=>{this._pendingMove=r,this._moveRaf||(this._moveRaf=requestAnimationFrame(()=>{this._moveRaf=0,this._pendingMove&&(i(this._pendingMove),this._pendingMove=null,this._raycaster.setFromCamera(this._mouse,t),this.moveRay(this._raycaster.ray))}))},this._onUp=r=>{cancelAnimationFrame(this._moveRaf),this._moveRaf=0,this._pendingMove=null,i(r),this._raycaster.setFromCamera(this._mouse,t),this.moveRay(this._raycaster.ray),this.setGrabbed(!1)},n.addEventListener("pointerdown",this._onDown),n.addEventListener("pointermove",this._onMove),n.addEventListener("pointerup",this._onUp)}getRevoluteDelta(e,t,n){return On.copy(e.axis).transformDirection(e.matrixWorld).normalize(),Ds.set(0,0,0).applyMatrix4(e.matrixWorld),An.setFromNormalAndCoplanarPoint(On,Ds),Io.copy(this.camera.position).sub(this.initialGrabPoint).normalize(),Math.abs(Io.dot(An.normal))>.3?super.getRevoluteDelta(e,t,n):(An.projectPoint(t,Bo),An.projectPoint(n,zo),On.set(0,0,-1).transformDirection(this.camera.matrixWorld).cross(An.normal),Io.subVectors(n,t),On.dot(Io))}dispose(){cancelAnimationFrame(this._moveRaf),this.domElement.removeEventListener("pointerdown",this._onDown),this.domElement.removeEventListener("pointermove",this._onMove),this.domElement.removeEventListener("pointerup",this._onUp)}}const ju={type:"change"},ul={type:"start"},Xu={type:"end"},Do=new Ks,qu=new wn,Ab=Math.cos(70*qi.DEG2RAD);class Cb extends os{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new F,this.cursor=new F,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ds.ROTATE,MIDDLE:ds.DOLLY,RIGHT:ds.PAN},this.touches={ONE:fs.ROTATE,TWO:fs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(S){S.addEventListener("keydown",Qe),this._domElementKeyEvents=S},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Qe),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(ju),n.update(),r=i.NONE},this.update=(function(){const S=new F,j=new dn().setFromUnitVectors(e.up,new F(0,1,0)),Y=j.clone().invert(),de=new F,xe=new dn,it=new F,ct=2*Math.PI;return function(Ut=null){const ft=n.object.position;S.copy(ft).sub(n.target),S.applyQuaternion(j),a.setFromVector3(S),n.autoRotate&&r===i.NONE&&H(y(Ut)),n.enableDamping?(a.theta+=l.theta*n.dampingFactor,a.phi+=l.phi*n.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let pt=n.minAzimuthAngle,Et=n.maxAzimuthAngle;isFinite(pt)&&isFinite(Et)&&(pt<-Math.PI?pt+=ct:pt>Math.PI&&(pt-=ct),Et<-Math.PI?Et+=ct:Et>Math.PI&&(Et-=ct),pt<=Et?a.theta=Math.max(pt,Math.min(Et,a.theta)):a.theta=a.theta>(pt+Et)/2?Math.max(pt,a.theta):Math.min(Et,a.theta)),a.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,a.phi)),a.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let Nn=!1;if(n.zoomToCursor&&N||n.object.isOrthographicCamera)a.radius=ae(a.radius);else{const on=a.radius;a.radius=ae(a.radius*c),Nn=on!=a.radius}if(S.setFromSpherical(a),S.applyQuaternion(Y),ft.copy(n.target).add(S),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),h.set(0,0,0)),n.zoomToCursor&&N){let on=null;if(n.object.isPerspectiveCamera){const In=S.length();on=ae(In*c);const bn=In-on;n.object.position.addScaledVector(E,bn),n.object.updateMatrixWorld(),Nn=!!bn}else if(n.object.isOrthographicCamera){const In=new F(I.x,I.y,0);In.unproject(n.object);const bn=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),Nn=bn!==n.object.zoom;const Di=new F(I.x,I.y,0);Di.unproject(n.object),n.object.position.sub(Di).add(In),n.object.updateMatrixWorld(),on=S.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;on!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(on).add(n.object.position):(Do.origin.copy(n.object.position),Do.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Do.direction))<Ab?e.lookAt(n.target):(qu.setFromNormalAndCoplanarPoint(n.object.up,n.target),Do.intersectPlane(qu,n.target))))}else if(n.object.isOrthographicCamera){const on=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),on!==n.object.zoom&&(n.object.updateProjectionMatrix(),Nn=!0)}return c=1,N=!1,Nn||de.distanceToSquared(n.object.position)>o||8*(1-xe.dot(n.object.quaternion))>o||it.distanceToSquared(n.target)>o?(n.dispatchEvent(ju),de.copy(n.object.position),xe.copy(n.object.quaternion),it.copy(n.target),!0):!1}})(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",rt),n.domElement.removeEventListener("pointerdown",O),n.domElement.removeEventListener("pointercancel",q),n.domElement.removeEventListener("wheel",he),n.domElement.removeEventListener("pointermove",A),n.domElement.removeEventListener("pointerup",q),n.domElement.getRootNode().removeEventListener("keydown",Ee,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Qe),n._domElementKeyEvents=null)};const n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=i.NONE;const o=1e-6,a=new Pu,l=new Pu;let c=1;const h=new F,u=new _e,d=new _e,f=new _e,g=new _e,_=new _e,p=new _e,m=new _e,T=new _e,x=new _e,E=new F,I=new _e;let N=!1;const C=[],U={};let M=!1;function y(S){return S!==null?2*Math.PI/60*n.autoRotateSpeed*S:2*Math.PI/60/60*n.autoRotateSpeed}function D(S){const j=Math.abs(S*.01);return Math.pow(.95,n.zoomSpeed*j)}function H(S){l.theta-=S}function k(S){l.phi-=S}const z=(function(){const S=new F;return function(Y,de){S.setFromMatrixColumn(de,0),S.multiplyScalar(-Y),h.add(S)}})(),$=(function(){const S=new F;return function(Y,de){n.screenSpacePanning===!0?S.setFromMatrixColumn(de,1):(S.setFromMatrixColumn(de,0),S.crossVectors(n.object.up,S)),S.multiplyScalar(Y),h.add(S)}})(),B=(function(){const S=new F;return function(Y,de){const xe=n.domElement;if(n.object.isPerspectiveCamera){const it=n.object.position;S.copy(it).sub(n.target);let ct=S.length();ct*=Math.tan(n.object.fov/2*Math.PI/180),z(2*Y*ct/xe.clientHeight,n.object.matrix),$(2*de*ct/xe.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(z(Y*(n.object.right-n.object.left)/n.object.zoom/xe.clientWidth,n.object.matrix),$(de*(n.object.top-n.object.bottom)/n.object.zoom/xe.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}})();function ne(S){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c/=S:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function G(S){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c*=S:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function se(S,j){if(!n.zoomToCursor)return;N=!0;const Y=n.domElement.getBoundingClientRect(),de=S-Y.left,xe=j-Y.top,it=Y.width,ct=Y.height;I.x=de/it*2-1,I.y=-(xe/ct)*2+1,E.set(I.x,I.y,1).unproject(n.object).sub(n.object.position).normalize()}function ae(S){return Math.max(n.minDistance,Math.min(n.maxDistance,S))}function pe(S){u.set(S.clientX,S.clientY)}function Le(S){se(S.clientX,S.clientX),m.set(S.clientX,S.clientY)}function Ae(S){g.set(S.clientX,S.clientY)}function W(S){d.set(S.clientX,S.clientY),f.subVectors(d,u).multiplyScalar(n.rotateSpeed);const j=n.domElement;H(2*Math.PI*f.x/j.clientHeight),k(2*Math.PI*f.y/j.clientHeight),u.copy(d),n.update()}function ee(S){T.set(S.clientX,S.clientY),x.subVectors(T,m),x.y>0?ne(D(x.y)):x.y<0&&G(D(x.y)),m.copy(T),n.update()}function ie(S){_.set(S.clientX,S.clientY),p.subVectors(_,g).multiplyScalar(n.panSpeed),B(p.x,p.y),g.copy(_),n.update()}function te(S){se(S.clientX,S.clientY),S.deltaY<0?G(D(S.deltaY)):S.deltaY>0&&ne(D(S.deltaY)),n.update()}function Ne(S){let j=!1;switch(S.code){case n.keys.UP:S.ctrlKey||S.metaKey||S.shiftKey?k(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):B(0,n.keyPanSpeed),j=!0;break;case n.keys.BOTTOM:S.ctrlKey||S.metaKey||S.shiftKey?k(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):B(0,-n.keyPanSpeed),j=!0;break;case n.keys.LEFT:S.ctrlKey||S.metaKey||S.shiftKey?H(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):B(n.keyPanSpeed,0),j=!0;break;case n.keys.RIGHT:S.ctrlKey||S.metaKey||S.shiftKey?H(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):B(-n.keyPanSpeed,0),j=!0;break}j&&(S.preventDefault(),n.update())}function qe(S){if(C.length===1)u.set(S.pageX,S.pageY);else{const j=vt(S),Y=.5*(S.pageX+j.x),de=.5*(S.pageY+j.y);u.set(Y,de)}}function V(S){if(C.length===1)g.set(S.pageX,S.pageY);else{const j=vt(S),Y=.5*(S.pageX+j.x),de=.5*(S.pageY+j.y);g.set(Y,de)}}function at(S){const j=vt(S),Y=S.pageX-j.x,de=S.pageY-j.y,xe=Math.sqrt(Y*Y+de*de);m.set(0,xe)}function re(S){n.enableZoom&&at(S),n.enablePan&&V(S)}function ge(S){n.enableZoom&&at(S),n.enableRotate&&qe(S)}function ce(S){if(C.length==1)d.set(S.pageX,S.pageY);else{const Y=vt(S),de=.5*(S.pageX+Y.x),xe=.5*(S.pageY+Y.y);d.set(de,xe)}f.subVectors(d,u).multiplyScalar(n.rotateSpeed);const j=n.domElement;H(2*Math.PI*f.x/j.clientHeight),k(2*Math.PI*f.y/j.clientHeight),u.copy(d)}function ve(S){if(C.length===1)_.set(S.pageX,S.pageY);else{const j=vt(S),Y=.5*(S.pageX+j.x),de=.5*(S.pageY+j.y);_.set(Y,de)}p.subVectors(_,g).multiplyScalar(n.panSpeed),B(p.x,p.y),g.copy(_)}function fe(S){const j=vt(S),Y=S.pageX-j.x,de=S.pageY-j.y,xe=Math.sqrt(Y*Y+de*de);T.set(0,xe),x.set(0,Math.pow(T.y/m.y,n.zoomSpeed)),ne(x.y),m.copy(T);const it=(S.pageX+j.x)*.5,ct=(S.pageY+j.y)*.5;se(it,ct)}function Pe(S){n.enableZoom&&fe(S),n.enablePan&&ve(S)}function We(S){n.enableZoom&&fe(S),n.enableRotate&&ce(S)}function O(S){n.enabled!==!1&&(C.length===0&&(n.domElement.setPointerCapture(S.pointerId),n.domElement.addEventListener("pointermove",A),n.domElement.addEventListener("pointerup",q)),!nt(S)&&(Ye(S),S.pointerType==="touch"?ye(S):le(S)))}function A(S){n.enabled!==!1&&(S.pointerType==="touch"?Be(S):ue(S))}function q(S){switch(Ie(S),C.length){case 0:n.domElement.releasePointerCapture(S.pointerId),n.domElement.removeEventListener("pointermove",A),n.domElement.removeEventListener("pointerup",q),n.dispatchEvent(Xu),r=i.NONE;break;case 1:const j=C[0],Y=U[j];ye({pointerId:j,pageX:Y.x,pageY:Y.y});break}}function le(S){let j;switch(S.button){case 0:j=n.mouseButtons.LEFT;break;case 1:j=n.mouseButtons.MIDDLE;break;case 2:j=n.mouseButtons.RIGHT;break;default:j=-1}switch(j){case ds.DOLLY:if(n.enableZoom===!1)return;Le(S),r=i.DOLLY;break;case ds.ROTATE:if(S.ctrlKey||S.metaKey||S.shiftKey){if(n.enablePan===!1)return;Ae(S),r=i.PAN}else{if(n.enableRotate===!1)return;pe(S),r=i.ROTATE}break;case ds.PAN:if(S.ctrlKey||S.metaKey||S.shiftKey){if(n.enableRotate===!1)return;pe(S),r=i.ROTATE}else{if(n.enablePan===!1)return;Ae(S),r=i.PAN}break;default:r=i.NONE}r!==i.NONE&&n.dispatchEvent(ul)}function ue(S){switch(r){case i.ROTATE:if(n.enableRotate===!1)return;W(S);break;case i.DOLLY:if(n.enableZoom===!1)return;ee(S);break;case i.PAN:if(n.enablePan===!1)return;ie(S);break}}function he(S){n.enabled===!1||n.enableZoom===!1||r!==i.NONE||(S.preventDefault(),n.dispatchEvent(ul),te(He(S)),n.dispatchEvent(Xu))}function He(S){const j=S.deltaMode,Y={clientX:S.clientX,clientY:S.clientY,deltaY:S.deltaY};switch(j){case 1:Y.deltaY*=16;break;case 2:Y.deltaY*=100;break}return S.ctrlKey&&!M&&(Y.deltaY*=10),Y}function Ee(S){S.key==="Control"&&(M=!0,n.domElement.getRootNode().addEventListener("keyup",Me,{passive:!0,capture:!0}))}function Me(S){S.key==="Control"&&(M=!1,n.domElement.getRootNode().removeEventListener("keyup",Me,{passive:!0,capture:!0}))}function Qe(S){n.enabled===!1||n.enablePan===!1||Ne(S)}function ye(S){switch(lt(S),C.length){case 1:switch(n.touches.ONE){case fs.ROTATE:if(n.enableRotate===!1)return;qe(S),r=i.TOUCH_ROTATE;break;case fs.PAN:if(n.enablePan===!1)return;V(S),r=i.TOUCH_PAN;break;default:r=i.NONE}break;case 2:switch(n.touches.TWO){case fs.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;re(S),r=i.TOUCH_DOLLY_PAN;break;case fs.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;ge(S),r=i.TOUCH_DOLLY_ROTATE;break;default:r=i.NONE}break;default:r=i.NONE}r!==i.NONE&&n.dispatchEvent(ul)}function Be(S){switch(lt(S),r){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;ce(S),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;ve(S),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Pe(S),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;We(S),n.update();break;default:r=i.NONE}}function rt(S){n.enabled!==!1&&S.preventDefault()}function Ye(S){C.push(S.pointerId)}function Ie(S){delete U[S.pointerId];for(let j=0;j<C.length;j++)if(C[j]==S.pointerId){C.splice(j,1);return}}function nt(S){for(let j=0;j<C.length;j++)if(C[j]==S.pointerId)return!0;return!1}function lt(S){let j=U[S.pointerId];j===void 0&&(j=new _e,U[S.pointerId]=j),j.set(S.pageX,S.pageY)}function vt(S){const j=S.pointerId===C[0]?C[1]:C[0];return U[j]}n.domElement.addEventListener("contextmenu",rt),n.domElement.addEventListener("pointerdown",O),n.domElement.addEventListener("pointercancel",q),n.domElement.addEventListener("wheel",he,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",Ee,{passive:!0,capture:!0}),this.update()}}const Rb=`
:host {
    display: block;
    background: linear-gradient(160deg, #0f1117 0%, #1a1f2e 100%);
}
canvas { width: 100%; height: 100%; display: block; }
`,$u=()=>{},Lb=new F,Pb=new F(-1,.7,1).normalize();function Yu(s){var e;for(const t of Object.values(s))t instanceof Ht&&(((e=t.source)==null?void 0:e.data)instanceof ImageBitmap&&t.source.data.close(),t.dispose());s.dispose()}function dl(s){s.traverse(e=>{var n,i;const t=e;(n=t.geometry)!=null&&n.userData.shared||(i=t.geometry)==null||i.dispose(),Array.isArray(t.material)?t.material.forEach(Yu):t.material&&Yu(t.material)})}var _d;const pn=(_d=window.matchMedia)==null?void 0:_d.call(window,"(prefers-reduced-motion: reduce)"),Nb=new F(1,0,1).normalize(),Ib=new F(-1,0,-1).normalize();class Db extends HTMLElement{constructor(){super(),this.robot=null,this.loadMesh=null,this._rafId=0,this._dirty=!1,this._loadId=0,this._introAnim=null,this._outgoing=null,this._exitRotation=new rn,this._lastLoadKey="",this._bbox=new Wn,this._center=new F,this._sphere=new Pn,this._lightOffset=new F,this._shadow=this.attachShadow({mode:"open"});const e=document.createElement("style");e.textContent=Rb,this._shadow.appendChild(e),this.scene=new Kd,this.ambientLight=new xx("#8ea0a8","#000",.5),this.ambientLight.groundColor.lerp(this.ambientLight.color,.5*Math.PI),this.ambientLight.position.set(0,1,0),this.scene.add(this.ambientLight),this.directionalLight=new oc(16777215,Math.PI),this.directionalLight.position.set(4,10,1);const t=navigator.maxTouchPoints>0?1024:2048;this.directionalLight.shadow.mapSize.set(t,t),this.directionalLight.shadow.normalBias=.001,this.directionalLight.castShadow=!0,this.scene.add(this.directionalLight,this.directionalLight.target),this.world=new At,this.scene.add(this.world),this.shadowPlane=new kt(new zr(400,400),new ox({transparent:!0,opacity:.25,side:yn})),this.shadowPlane.rotation.x=-Math.PI/2,this.shadowPlane.receiveShadow=!0,this.shadowPlane.raycast=()=>{},this.scene.add(this.shadowPlane),this.renderer=new xv({antialias:!0,alpha:!0}),this.renderer.setClearAlpha(0),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=xd,this.renderer.outputColorSpace=Ot,this.camera=new $t(75,1,.1,1e3),this.camera.position.set(-5.5,3.5,5.5),this.controls=new Cb(this.camera,this.renderer.domElement),this.controls.rotateSpeed=2,this.controls.zoomSpeed=5,this.controls.panSpeed=2,this.controls.maxDistance=50,this.controls.minDistance=.25,this.controls.addEventListener("change",()=>this.redraw()),this.controls.enableDamping=!(pn!=null&&pn.matches),pn==null||pn.addEventListener("change",n=>{this.controls.enableDamping=!n.matches}),this._collisionMaterial=new Ai({transparent:!0,opacity:.35,color:16760376,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),this._resizeObserver=new ResizeObserver(()=>this._onResize()),this._applyUp(this.up),this._startRenderLoop()}static get observedAttributes(){return["urdf","package","up","ignore-limits","show-collision","display-shadow","ambient-color"]}get urdf(){return this.getAttribute("urdf")??""}set urdf(e){this.setAttribute("urdf",e)}get package(){return this.getAttribute("package")??""}set package(e){this.setAttribute("package",e)}get up(){return this.getAttribute("up")??"+Z"}set up(e){this.setAttribute("up",e)}get ignoreLimits(){return this.hasAttribute("ignore-limits")}set ignoreLimits(e){e?this.setAttribute("ignore-limits",""):this.removeAttribute("ignore-limits")}get showCollision(){return this.hasAttribute("show-collision")}set showCollision(e){e?this.setAttribute("show-collision",""):this.removeAttribute("show-collision")}get displayShadow(){return this.hasAttribute("display-shadow")}set displayShadow(e){e?this.setAttribute("display-shadow",""):this.removeAttribute("display-shadow")}get ambientColor(){return this.getAttribute("ambient-color")??"#8ea0a8"}set ambientColor(e){this.setAttribute("ambient-color",e)}connectedCallback(){this._shadow.appendChild(this.renderer.domElement),this._resizeObserver.observe(this),this._onResize()}disconnectedCallback(){cancelAnimationFrame(this._rafId),this._resizeObserver.disconnect()}attributeChangedCallback(e,t,n){switch(e){case"urdf":case"package":this._scheduleLoad();break;case"up":this._applyUp(this.up),this.redraw();break;case"ambient-color":this.ambientLight.color.set(this.ambientColor),this.ambientLight.groundColor.set("#000").lerp(this.ambientLight.color,.5),this.redraw();break;case"ignore-limits":this._applyIgnoreLimits(this.ignoreLimits);break;case"show-collision":this._updateCollision(),this.redraw();break;case"display-shadow":this.redraw();break}}fitCamera(){if(!this.robot||(this.world.updateMatrixWorld(),this._bbox.makeEmpty(),this.robot.traverse(n=>{n.isURDFVisual&&this._bbox.expandByObject(n)}),this._bbox.isEmpty()))return;this._bbox.getBoundingSphere(this._sphere);const e=this.camera.fov*Math.PI/180,t=this._sphere.radius/Math.sin(e/2)*1.2;this.camera.position.copy(this._sphere.center).addScaledVector(Pb,t),this.controls.target.copy(this._sphere.center),this.controls.maxDistance=t*5,this.controls.minDistance=this._sphere.radius*.1,this.controls.update(),this.redraw()}redraw(){this._dirty=!0}setJointValue(e,...t){this.robot&&this.robot.setJointValue(e,...t)&&(this.redraw(),this.dispatchEvent(new CustomEvent("angle-change",{bubbles:!0,detail:e})))}_startRenderLoop(){const e=()=>{this._rafId=requestAnimationFrame(e);const t=this._introAnim;if(t){const i=Math.min((performance.now()-t.t0)/t.dur,1),r=1-Math.pow(1-i,4);this.world.position.lerpVectors(t.start,Lb,r),this._dirty=!0,i>=1&&(this._introAnim=null,this.world.position.setScalar(0))}const n=this._outgoing;if(n){const i=Math.min((performance.now()-n.t0)/n.dur,1),r=i*i*i;n.obj.position.lerpVectors(n.from,n.to,r),this._dirty=!0,i>=1&&(this.scene.remove(n.obj),dl(n.obj),this._outgoing=null)}this.controls.update(),this._dirty&&(this._updateScene(),this.renderer.render(this.scene,this.camera),this._dirty=!1)};e()}_onResize(){const e=this.clientWidth||300,t=this.clientHeight||150;this.renderer.setPixelRatio(devicePixelRatio),this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.redraw()}_scheduleLoad(){const e=`${this.package}|${this.urdf}`;if(this._lastLoadKey===e||(this._lastLoadKey=e,this._introAnim=null,this._startExit(),this._disposeRobot(),this.world.position.setScalar(0),this.world.visible=!1,this.dispatchEvent(new CustomEvent("urdf-change",{bubbles:!0})),!this.urdf))return;const t=++this._loadId,n=()=>{t===this._loadId&&(this.world.visible=!0)},i=new hc;i.packages=this._resolvePackages(this.package),i.parseCollision=!0;const r=(this.loadMesh??i.loadMesh).bind(i);let o=!1;i.loadMesh=(a,l)=>(o||(o=!0,l.onLoad=()=>{t===this._loadId&&(this.fitCamera(),this._exitRotation.copy(this.world.rotation),this._startIntro(),n())}),r(a,l).then(c=>(this.redraw(),c))),i.load(this.urdf).then(a=>{if(t!==this._loadId){a.traverse(l=>{var c;return(c=l.geometry)==null?void 0:c.dispose()});return}this.robot=a,this.world.add(a),this._prepareMeshes(a),this._applyIgnoreLimits(this.ignoreLimits),this._updateCollision(),o||(this.fitCamera(),this._exitRotation.copy(this.world.rotation),this._startIntro(),n()),this.dispatchEvent(new CustomEvent("urdf-processed",{bubbles:!0}))}).catch(a=>{console.error("URDFViewer: load error",a),t===this._loadId&&(n(),this.dispatchEvent(new CustomEvent("urdf-error",{bubbles:!0,detail:String(a.message??a)})))})}_startIntro(){if(this.world.visible=!0,pn!=null&&pn.matches){this.world.position.setScalar(0);return}const e=Nb.clone().multiplyScalar(this._sphere.radius*5);this.world.position.copy(e),this._introAnim={start:e,t0:performance.now(),dur:450}}_startExit(){if(!this.robot||this._sphere.radius===0)return;if(this._outgoing&&(this.scene.remove(this._outgoing.obj),dl(this._outgoing.obj),this._outgoing=null),pn!=null&&pn.matches){this._disposeRobot();return}const e=Ib.clone().multiplyScalar(this._sphere.radius*5),t=new At;t.rotation.copy(this._exitRotation),t.position.copy(this.world.position),this.world.remove(this.robot),t.add(this.robot),this.robot=null,this.scene.add(t),this._outgoing={obj:t,from:t.position.clone(),to:e,t0:performance.now(),dur:350}}_disposeRobot(){var e;this.robot&&(dl(this.robot),(e=this.robot.parent)==null||e.remove(this.robot),this.robot=null)}_prepareMeshes(e){e.traverse(t=>{const n=t;if(n.isMesh&&(n.castShadow=!0,n.receiveShadow=!0,n.geometry&&!n.geometry.userData.shared&&(n.geometry=zx(n.geometry),n.geometry.computeVertexNormals()),n.material)){const i=Array.isArray(n.material)?n.material:[n.material];for(const r of i){if(r instanceof zn){const o=new Ai;o.copy(r),n.material=o,r.dispose()}r.map&&(r.map.colorSpace=Ot)}}})}_updateScene(){const e=this.robot;if(e&&(this.world.updateMatrixWorld(),this._bbox.makeEmpty(),e.traverse(t=>{t.isURDFVisual&&this._bbox.expandByObject(t)}),!this._bbox.isEmpty())){this._bbox.getCenter(this._center),this.controls.target.y=this._center.y,this.shadowPlane.position.y=this._bbox.min.y-.001;const t=this.directionalLight;if(t.castShadow=this.displayShadow,this.displayShadow){this._bbox.getBoundingSphere(this._sphere);const n=this._sphere.radius,i=t.shadow.camera;i.left=i.bottom=-n,i.right=i.top=n,this._lightOffset.copy(t.position).sub(t.target.position),t.target.position.copy(this._center),t.position.copy(this._center).add(this._lightOffset),i.updateProjectionMatrix()}}}_applyUp(e){const t=e.startsWith("-")?-1:1,n=e.slice(-1).toUpperCase()||"Z",i=Math.PI/2;switch(n){case"X":this.world.rotation.set(0,0,t*i);break;case"Z":this.world.rotation.set(-t*i,0,0);break;default:this.world.rotation.set(t>0?0:Math.PI,0,0);break}}_applyIgnoreLimits(e){if(this.robot){for(const t of Object.values(this.robot.joints))t.ignoreLimits=e,t.setJointValue(...t.jointValue);this.dispatchEvent(new CustomEvent("ignore-limits-change",{bubbles:!0})),this.redraw()}}_updateCollision(){const e=this.robot;if(!e)return;const t=this.showCollision,n=this._collisionMaterial;e.traverse(i=>{const r=i;r.isURDFCollider&&(r.visible=t,r.traverse(o=>{const a=o;a.isMesh&&(a.raycast!==$u&&(a.raycast=$u),a.material=n,a.castShadow=!1)}))})}_resolvePackages(e){if(!e.includes(":")||/^\s*https?:/.test(e))return e;const t={};for(const n of e.split(",")){const[i,...r]=n.split(":");i&&r.length&&(t[i.trim()]=r.join(":").trim())}return t}}class Ub extends Db{static get observedAttributes(){return["highlight-color","disable-dragging",...super.observedAttributes]}get highlightColor(){return this.getAttribute("highlight-color")??"#ffffff"}set highlightColor(e){this.setAttribute("highlight-color",e)}get disableDragging(){return this.hasAttribute("disable-dragging")}set disableDragging(e){e?this.setAttribute("disable-dragging",""):this.removeAttribute("disable-dragging")}constructor(){super(),this._highlightMaterial=new Ai({shininess:10,color:this.highlightColor,emissive:this.highlightColor,emissiveIntensity:.25}),this._dragControls=new wb(this.scene,this.camera,this.renderer.domElement),this._dragControls.updateJoint=(e,t)=>{this.setJointValue(e.name,t)},this._dragControls.onHover=e=>{this._highlightJoint(e,!1),this.redraw()},this._dragControls.onUnhover=e=>{this._highlightJoint(e,!0),this.redraw()},this._dragControls.onHoverAny=e=>{this.dispatchEvent(new CustomEvent("joint-mouseover",{bubbles:!0,detail:e.name}))},this._dragControls.onUnhoverAny=e=>{this.dispatchEvent(new CustomEvent("joint-mouseout",{bubbles:!0,detail:e.name}))},this._dragControls.onDragStart=e=>{this.controls.enabled=!1,this.dispatchEvent(new CustomEvent("manipulate-start",{bubbles:!0,detail:e.name})),this.redraw()},this._dragControls.onDragEnd=e=>{this.controls.enabled=!0,this.dispatchEvent(new CustomEvent("manipulate-end",{bubbles:!0,detail:e.name})),this.redraw()}}disconnectedCallback(){super.disconnectedCallback(),this._dragControls.dispose()}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e==="highlight-color"&&(this._highlightMaterial.color.set(this.highlightColor),this._highlightMaterial.emissive.set(this.highlightColor))}_highlightJoint(e,t){function n(o){return o.isURDFJoint&&o.jointType!=="fixed"}const i=this._highlightMaterial;function r(o){const a=o;if(a.isMesh&&(t?a.__orig!==void 0&&(a.material=a.__orig,delete a.__orig):(a.__orig=a.material,a.material=i)),!(o!==e&&n(o)))for(const l of o.children)l.isURDFCollider||r(l)}r(e)}}const Ob="http://127.0.0.1:7337/claude",Fb="claude-sonnet-4-6",kb=600,Ku=3e4,Bb={name:"update_urdf",description:"Replace the URDF code in the editor with new XML and immediately re-render the 3D model. Always send the COMPLETE URDF, not a diff.",input_schema:{type:"object",properties:{xml:{type:"string",description:"Complete URDF XML"}},required:["xml"]}},zb={name:"update_part",description:'Write or create a URDF part file (e.g. "05-motor-driver.xml"). Send the complete content of that part — link + joint elements only, no <robot> wrapper. Use a new filename like "07-lidar.xml" to add a new component.',input_schema:{type:"object",properties:{filename:{type:"string",description:'Part filename, e.g. "05-motor-driver.xml"'},xml:{type:"string",description:"Complete content of this part file"}},required:["filename","xml"]}},Zu={name:"highlight_lines",description:"Highlight 1-based line numbers in the editor. Call after every explanation.",input_schema:{type:"object",properties:{lines:{type:"array",items:{type:"number"},description:"1-based line numbers"}},required:["lines"]}},Ju={name:"scroll_to_line",description:"Scroll the editor to bring a specific line into view.",input_schema:{type:"object",properties:{line:{type:"number",description:"1-based line number"}},required:["line"]}},Hb={name:"read_part",description:"Read the full XML of any part file. Call this before placing a new component to check occupied xyz positions and avoid spatial overlaps.",input_schema:{type:"object",properties:{filename:{type:"string",description:'Part filename, e.g. "01-chassis.xml"'}},required:["filename"]}},fl=new Set(["update_urdf","update_part"]),Qu=`URDF reference:
• <link name="..."> rigid body — <visual>, <collision>, <inertial>
• <joint name="..." type="fixed|revolute|continuous|prismatic|floating|planar">
• <origin xyz="x y z" rpy="r p y"/> — position + Euler angles (radians)
• <geometry>: <box size="x y z">, <cylinder radius length>, <sphere radius>, <mesh filename="..."/>
• revolute joints need <limit lower upper effort velocity/>

Coordinate conventions:
• -X = front/bumper, +X = rear, -Y = left, +Y = right, +Z = up
• rpy = roll(X), pitch(Y), yaw(Z) in radians`;function ed(s){return typeof marked<"u"&&typeof DOMPurify<"u"?DOMPurify.sanitize(marked.parse(s),{ADD_ATTR:["style"]}):s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}const Ko=class Ko{constructor(e,t){this._sourceUrl=null,this._ownBlobUrl=null,this._renderTimer=0,this._history=[],this._abort=null,this._highlights=new Set,this._partsList=[],this._partCache=new Map,this._originalCache=new Map,this._robotName="",this._urdfFetched=!1,this._componentSpecs=null,this._brief=!1,this._viewer=e,this._panelEl=t,this._textareaEl=t.querySelector("#editor-textarea"),this._lineNumsEl=t.querySelector("#editor-line-nums"),this._chatMsgsEl=document.getElementById("chat-messages"),this._sendBtn=document.getElementById("chat-send"),this._abortBtn=document.getElementById("chat-abort"),this._briefBtn=document.getElementById("chat-brief-toggle"),this._partSelEl=t.querySelector("#part-select"),this._tabsEl=document.getElementById("editor-tabs"),this._resetBtn=t.querySelector("#part-reset"),this._resetBtn.addEventListener("click",()=>this._resetParts()),this._partSelEl.addEventListener("change",()=>void this._onPartChange()),this._actions={clear:{fn:()=>this._clearChat(),desc:"Clear chat history"},format:{fn:()=>this._formatXml(),desc:"Prettify URDF XML"}},this._textareaEl.addEventListener("input",()=>this._onEdit()),this._textareaEl.addEventListener("scroll",()=>{this._lineNumsEl.scrollTop=this._textareaEl.scrollTop})}get isOpen(){return this._panelEl.classList.contains("open")}handleExternalInput(e){if(e.startsWith("/")){const[t,...n]=e.slice(1).trim().split(/\s+/),i=this._actions[t.toLowerCase()];if(i!=null&&i.fn){i.fn(n);return}}this._abort||this._runConversation(e)}set brief(e){this._brief=e,this._briefBtn.classList.toggle("active",e),this._briefBtn.setAttribute("aria-pressed",String(e))}async jumpToJoint(e){if(!this._partsList.length||!this._sourceUrl)return;const t=`name="${e}"`;for(const n of this._partsList){const i=this._sourceUrl.replace(/[^/]+\.urdf(\?.*)?$/,`parts/${n}`);if(!(await fetch(i).then(a=>a.text())).includes(t))continue;this._partSelEl.value=n,await this._onPartChange();const o=this._textareaEl.value.indexOf(t);if(o!==-1){this._textareaEl.focus(),this._textareaEl.setSelectionRange(o,o);const a=this._textareaEl.value.slice(0,o).split(`
`).length;this._scrollEditorToLine(a)}return}}open(){this._panelEl.classList.add("open"),document.body.classList.add("editor-open"),this._sourceUrl&&(this._textareaEl.value||this._fetchAndPopulate(this._sourceUrl),this._partsList.length||this._loadPartsManifest())}close(){var e;this._panelEl.classList.remove("open"),document.body.classList.remove("editor-open"),(e=this._abort)==null||e.abort()}setSourceUrl(e){var t;(t=this._abort)==null||t.abort(),this._sourceUrl=e,this._history=[],this._partsList=[],this._partCache.clear(),this._originalCache.clear(),this._robotName="",this._urdfFetched=!1,this._componentSpecs=null,this._textareaEl.value="",this._rebuildPartOptions(),this._partSelEl.hidden=!0,this._loadPersistedHistory(),setTimeout(()=>this._maybeResume(),0),this.isOpen&&(this._fetchAndPopulate(e),this._loadPartsManifest())}async _fetchAndPopulate(e){try{const t=await fetch(e).then(n=>n.text());this._textareaEl.value=t,this._urdfFetched=!0,this._updateLineNums()}catch{}}_onEdit(){this._updateLineNums(),clearTimeout(this._renderTimer);const e=this._partSelEl.value;e&&(this._partCache.set(this._partUrl(e),this._textareaEl.value),this._saveOverrides()),this._renderTimer=window.setTimeout(()=>e?this._applyPartsRender():this._applyRender(),kb)}_applyRender(){const e=this._textareaEl.value;this._ownBlobUrl&&URL.revokeObjectURL(this._ownBlobUrl),this._ownBlobUrl=URL.createObjectURL(new Blob([e],{type:"application/xml"})),this._viewer.urdf=this._ownBlobUrl}_updateLineNums(){const e=this._textareaEl.value.split(`
`);this._lineNumsEl.innerHTML=e.map((t,n)=>`<div class="lnum${this._highlights.has(n+1)?" hl":""}">${n+1}</div>`).join("")}_scrollEditorToLine(e){const t=parseFloat(getComputedStyle(this._textareaEl).lineHeight)||19,n=(e-1)*t-this._textareaEl.clientHeight/2;this._textareaEl.scrollTop=Math.max(0,n),this._lineNumsEl.scrollTop=this._textareaEl.scrollTop}_highlightLines(e){this._highlights=new Set(e),this._updateLineNums(),e.length&&this._scrollEditorToLine(e[0])}_clearChat(){this._history=[],this._chatMsgsEl.innerHTML="";const e=this._historyKey();if(e)try{localStorage.removeItem(e)}catch{}}_formatXml(){const e=this._textareaEl.value.trim();if(e)try{const t=new DOMParser().parseFromString(e,"application/xml");if(t.querySelector("parsererror"))return;const n=Vb(new XMLSerializer().serializeToString(t));this._textareaEl.value=n,this._updateLineNums()}catch{}}_rebuildPartOptions(){this._partSelEl.innerHTML='<option value="">Full URDF</option>'+this._partsList.map(e=>`<option value="${e}">${e}</option>`).join("")}_partUrl(e){return this._sourceUrl.replace(/[^/]+\.urdf(\?.*)?$/,`parts/${e}`)}_overridesKey(){return this._sourceUrl&&this._partsList.length>0?`urdf-parts:${this._sourceUrl}`:null}get _isDirty(){return this._partsList.some(e=>{const t=this._partUrl(e);return this._partCache.get(t)!==this._originalCache.get(t)})}_updateResetBtn(){const e=this._partsList.length>0;this._resetBtn.hidden=!e,this._resetBtn.disabled=!this._isDirty}_saveOverrides(){const e=this._overridesKey();if(!e)return;const t={};for(const n of this._partsList){const i=this._partUrl(n),r=this._partCache.get(i),o=this._originalCache.get(i);r!==void 0&&r!==o&&(t[n]=r)}try{Object.keys(t).length===0?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(t))}catch{}this._updateResetBtn()}_resetParts(){if(!this._isDirty||!confirm("Reset all parts to their original version?"))return;const e=this._overridesKey();if(e)try{localStorage.removeItem(e)}catch{}for(const n of this._partsList){const i=this._partUrl(n),r=this._originalCache.get(i);r!==void 0&&this._partCache.set(i,r)}const t=this._partSelEl.value;this._setEditorContent(t?this._partCache.get(this._partUrl(t))??"":this._assembleFromCache()),this._applyPartsRender(),this._updateResetBtn()}_assembleFromCache(){const e=this._partsList.map(i=>[i,this._partCache.get(this._partUrl(i))??""]).sort(([i],[r])=>i.localeCompare(r)),t=e.filter(([i])=>i.startsWith("00")).map(([,i])=>i.trimEnd()).join(`
`),n=e.filter(([i])=>!i.startsWith("00")).map(([,i])=>i.trimEnd()).join(`

`);return`<?xml version="1.0"?>
${t}
<robot name="${this._robotName}">

${n}

</robot>
`}_applyPartsRender(){const e=this._sourceUrl.replace(/\/[^/]+\.urdf(\?.*)?$/,""),t=this._assembleFromCache().replace(/filename="([^/"]+)"/g,`filename="${e}/$1"`);this._ownBlobUrl&&URL.revokeObjectURL(this._ownBlobUrl),this._ownBlobUrl=URL.createObjectURL(new Blob([t],{type:"application/xml"})),this._viewer.urdf=this._ownBlobUrl}async _loadPartsManifest(){if(!this._sourceUrl)return;const e=this._sourceUrl.replace(/\.urdf(\?.*)?$/,".parts.json");try{const t=await fetch(e).then(r=>r.json());this._robotName=t.robot,this._partsList=t.parts,await Promise.all(t.parts.map(async r=>{const o=this._partUrl(r),a=await fetch(o).then(l=>l.text());this._originalCache.set(o,a),this._partCache.set(o,a)}));let n=!1;const i=this._overridesKey();if(i)try{const r=localStorage.getItem(i);if(r){const o=JSON.parse(r);for(const[a,l]of Object.entries(o))this._partsList.includes(a)||(this._partsList=[...this._partsList,a].sort()),this._partCache.set(this._partUrl(a),l),n=!0}}catch{}this._urdfFetched=!0,this._partSelEl.value||(this._textareaEl.value=this._assembleFromCache(),this._updateLineNums()),n&&this._applyPartsRender(),this._rebuildPartOptions(),this._partSelEl.hidden=!1,this._renderTabs(),this._updateResetBtn()}catch{}if(this._sourceUrl){const t=this._sourceUrl.replace(/\.urdf(\?.*)?$/,".components.json");try{const n=await fetch(t).then(r=>r.json()),i=[];if(n.chassis){const[r,o,a]=n.chassis.size_mm;i.push(`chassis: ${r}×${o}×${a} mm${n.chassis.note?" — "+n.chassis.note:""}`)}for(const[r,o]of Object.entries(n.components??{})){const[a,l,c]=o.size_mm;i.push(`${r}: ${a}×${l}×${c} mm${o.note?" — "+o.note:""}`)}this._componentSpecs=i.join(`
`)}catch{}}}async _onPartChange(){const e=this._partSelEl.value;if(e){const t=this._partUrl(e);try{const n=this._partCache.get(t),i=n!==void 0?n:await fetch(t).then(r=>r.text());this._partCache.set(t,i),this._setEditorContent(i)}catch{}}else this._partsList.length>0?this._setEditorContent(this._assembleFromCache()):this._sourceUrl&&(this._highlights.clear(),await this._fetchAndPopulate(this._sourceUrl));this._updateActiveTab()}_renderTabs(){this._tabsEl.innerHTML="",this._appendTab("all","");for(const e of this._partsList)this._appendTab(e.replace(/^\d+-/,"").replace(/\.xml$/,""),e);this._updateActiveTab()}_appendTab(e,t){const n=document.createElement("button");n.className="editor-tab",n.textContent=e,n.dataset.part=t,n.addEventListener("click",()=>this._selectTab(t)),this._tabsEl.appendChild(n)}_selectTab(e){this._partSelEl.value=e,this._onPartChange()}_updateActiveTab(){for(const e of this._tabsEl.querySelectorAll(".editor-tab"))e.classList.toggle("active",(e.dataset.part??"")===this._partSelEl.value)}_historyKey(){return this._sourceUrl?`urdf-chat:${this._sourceUrl}`:null}_saveHistory(){const e=this._historyKey();if(e)try{localStorage.setItem(e,JSON.stringify(this._history))}catch{}}_loadPersistedHistory(){this._chatMsgsEl.innerHTML="";const e=this._historyKey();if(e)try{const t=localStorage.getItem(e);if(!t)return;this._history=JSON.parse(t);for(const n of this._history)if(n.role==="user"&&typeof n.content=="string")this._appendUserBubble(n.content);else if(n.role==="assistant")for(const i of n.content)i.type==="text"&&i.text?this._appendAssistantBubble(i.text):i.type==="tool_use"&&fl.has(i.name)&&this._appendToolCard(i.name).setResult(!0)}catch{this._history=[]}}_sanitizeHistory(){for(;this._history.length>0;){const e=this._history[this._history.length-1];if(e.role!=="assistant"||!e.content.some(t=>t.type==="tool_use"))return;this._history.pop()}}async _executeTools(e,t){let n=!1;const i=[];for(const r of e){const o=(t==null?void 0:t.get(r.id))??(fl.has(r.name)?this._appendToolCard(r.name):null),a=await this._executeTool(r.name,r.input),l=!a.error;o==null||o.setResult(l),l&&Ko._WRITE_TOOLS.has(r.name)&&(n=!0),i.push({type:"tool_result",tool_use_id:r.id,content:JSON.stringify(a)})}return this._history.push({role:"user",content:i}),this._saveHistory(),{noFollowUp:n}}async _runLoop(){for(;;){const e=this._appendSpinner(),t=await this._callAPI(),{content:n,toolCalls:i,toolCards:r}=await this._processStream(t,e);if(this._history.push({role:"assistant",content:n}),this._saveHistory(),!i.length)break;const{noFollowUp:o}=await this._executeTools(i,r);if(o)break}}async _withSession(e){if(!this._abort){this._abort=new AbortController,this._sendBtn.disabled=!0,this._abortBtn.hidden=!1;try{await e()}catch(t){const n=t;n.name!=="AbortError"&&(this._sanitizeHistory(),this._saveHistory(),this._appendAssistantBubble(`⚠ ${n.message||"Request failed"}`))}finally{this._abort=null,this._sendBtn.disabled=!1,this._abortBtn.hidden=!0}}}_maybeResume(){const e=this._history[this._history.length-1];if(!e||e.role!=="assistant")return;const t=e.content.filter(n=>n.type==="tool_use"&&Object.keys(n.input).length>0);t.length&&this._withSession(async()=>{await this._executeTools(t),await this._runLoop()})}async _runConversation(e){this._sanitizeHistory(),this._appendUserBubble(e),this._history.push({role:"user",content:e}),this._saveHistory(),!this._urdfFetched&&this._sourceUrl&&(await this._fetchAndPopulate(this._sourceUrl),await this._loadPartsManifest()),await this._withSession(()=>this._runLoop())}get _displayRobotName(){var t;if(this._robotName)return this._robotName;const e=(t=this._sourceUrl)==null?void 0:t.match(/([^/]+)\.urdf/i);return(e==null?void 0:e[1])??""}_summarizePart(e){try{const t=new DOMParser().parseFromString(`<root>${e}</root>`,"application/xml"),n=[...t.querySelectorAll("link")].map(r=>r.getAttribute("name")??"?"),i=[...t.querySelectorAll("joint")].map(r=>{var c;const o=r.getAttribute("name")??"?",a=r.getAttribute("type")??"fixed",l=((c=r.querySelector("origin"))==null?void 0:c.getAttribute("xyz"))??"";return l?`${o}(${a} xyz=${l})`:`${o}(${a})`});return[n.length?`links=[${n.join(", ")}]`:"",i.length?`joints=[${i.join(", ")}]`:""].filter(Boolean).join(", ")}catch{return""}}_buildSystem(){const e=this._textareaEl.value,t=e.split(`
`).length,n=e.length>Ku?e.slice(0,Ku)+`
<!-- ... truncated ... -->`:e,i=this._displayRobotName,r=i?`ROBOT: ${i}

`:"",o=this._brief?`
BRIEF MODE: Answer in fewer than 4 lines. No preamble, no postamble, no elaboration. Minimize tokens. Direct answers only.`:"",a=this._partSelEl.value,l=this._componentSpecs?`
HARDWARE SPECS (real dimensions for sizing new components, in mm):
${this._componentSpecs}
`:"";if(a&&this._partsList.length){const c=this._partsList.map(h=>{const u=this._summarizePart(this._partCache.get(this._partUrl(h))??""),d=h===a?" ← editing":"";return u?`  ${h}: ${u}${d}`:`  ${h}${d}`}).join(`
`);return`You are an expert URDF robot description assistant embedded in a live 3D robot viewer.
The robot URDF is split into part files. You are editing one part at a time.

${r}PARTS (auto-summarised with joint xyz positions — use this to understand the complete robot topology and occupied space):
${c}
${l}
CURRENTLY EDITING: ${a} (${t} lines)
Part files contain <link> and <joint> elements only — no <?xml?> declaration, no <robot> wrapper.
\`\`\`xml
${n}
\`\`\`

${Qu}

Tool rules:
• update_part — write the COMPLETE content of a part file; assembler rebuilds + viewer re-renders
• update_part with a new filename (e.g. "07-lidar.xml") to add a new component
• read_part — read the full XML of any part file before placing a new component nearby
• highlight_lines / scroll_to_line — editor navigation

Be concise. Use tools proactively. Before adding a new component, check the part summaries for occupied xyz positions to avoid overlaps; use read_part for full details if needed.${o}`}return`You are an expert URDF robot description assistant embedded in a live 3D robot viewer.
The viewer re-renders in real time when you call update_urdf. The user sees the 3D result instantly.

${r}CURRENT URDF (${t} lines):
\`\`\`xml
${n}
\`\`\`

${Qu}

Tool rules:
• update_urdf — COMPLETE XML only; viewer re-renders immediately
• highlight_lines — call after every explanation with the relevant line numbers
• scroll_to_line — navigate editor to a specific line

Be concise. Use tools proactively.${o}`}_buildTools(){const e=this._partsList.length>0,t=e?zb:Bb;return e?[t,Hb,Zu,Ju]:[t,Zu,Ju]}async _callAPI(){const e=await fetch(Ob,{method:"POST",headers:{"Content-Type":"application/json"},signal:this._abort.signal,body:JSON.stringify({model:Fb,max_tokens:4096,system:this._buildSystem(),messages:this._history,tools:this._buildTools(),stream:!0})});if(!e.ok){const t=await e.text().catch(()=>e.statusText);throw new Error(`API ${e.status}: ${t.slice(0,200)}`)}return e.body}async _processStream(e,t){const n=[],i=[],r=new Map;let o=null,a="",l=null,c="",h=!1,u=!1;function d(){u||(u=!0,t.remove())}for await(const{event:f,data:g}of this._parseSSE(e)){const _=g;if(f==="content_block_start"){d();const p=_.content_block;(p==null?void 0:p.type)==="text"?(o=this._appendAssistantBubble(""),a="",n.push({type:"text",text:""})):(p==null?void 0:p.type)==="tool_use"&&(l={id:p.id,name:p.name,idx:n.length},c="",n.push({type:"tool_use",id:p.id,name:p.name,input:{}}),fl.has(p.name)&&r.set(p.id,this._appendToolCard(p.name)))}else if(f==="content_block_delta"){const p=_.delta;if((p==null?void 0:p.type)==="text_delta"){a+=p.text??"";const m=n[n.length-1];(m==null?void 0:m.type)==="text"&&(m.text=a),o&&!h&&(h=!0,requestAnimationFrame(()=>{h=!1,o&&(o.innerHTML=ed(a),this._chatMsgsEl.scrollTop=this._chatMsgsEl.scrollHeight)}))}else(p==null?void 0:p.type)==="input_json_delta"&&(c+=p.partial_json??"")}else if(f==="content_block_stop"&&l){let p={};try{p=JSON.parse(c)}catch{}n[l.idx].input=p,i.push({type:"tool_use",id:l.id,name:l.name,input:p}),l=null}}return d(),{content:n,toolCalls:i,toolCards:r}}async*_parseSSE(e){const t=e.getReader(),n=new TextDecoder;let i="",r=null;for(;;){const{done:o,value:a}=await t.read();if(o)break;i+=n.decode(a,{stream:!0});const l=i.split(`
`);i=l.pop();for(const c of l)if(c.startsWith("event: "))r=c.slice(7).trim();else if(c.startsWith("data: ")&&r){const h=c.slice(6);if(h==="[DONE]")return;try{yield{event:r,data:JSON.parse(h)}}catch{}r=null}}}_setEditorContent(e){this._textareaEl.value=e,this._highlights.clear(),this._updateLineNums()}async _executeTool(e,t){switch(e){case"update_part":{const{filename:n,xml:i}=t;return/^[\w-]+\.xml$/.test(n)?(this._partCache.set(this._partUrl(n),i),this._saveOverrides(),this._partsList.includes(n)||(this._partsList=[...this._partsList,n].sort(),this._rebuildPartOptions(),this._renderTabs()),this._setEditorContent(i),this._partSelEl.value=n,this._updateActiveTab(),this._applyPartsRender(),{ok:!0,lines:i.split(`
`).length}):{error:"invalid filename"}}case"update_urdf":{const n=t.xml;return this._setEditorContent(n),this._applyRender(),{ok:!0,lines:n.split(`
`).length}}case"highlight_lines":return this._highlightLines(t.lines),{ok:!0};case"scroll_to_line":return this._scrollEditorToLine(t.line),{ok:!0};case"read_part":{const{filename:n}=t;if(!/^[\w-]+\.xml$/.test(n))return{error:"invalid filename"};const i=this._partCache.get(this._partUrl(n));if(i!==void 0)return{ok:!0,xml:i};try{return{ok:!0,xml:await fetch(this._partUrl(n)).then(o=>o.text())}}catch{return{error:`could not read ${n}`}}}default:return{error:`unknown tool: ${e}`}}}_appendChat(e){this._chatMsgsEl.appendChild(e),this._chatMsgsEl.scrollTop=this._chatMsgsEl.scrollHeight}_appendUserBubble(e){const t=document.createElement("div");t.className="chat-msg-user",t.textContent=e,this._appendChat(t)}_appendAssistantBubble(e){const t=document.createElement("div");return t.className="chat-msg-assistant",t.innerHTML=ed(e),this._appendChat(t),t}_appendSpinner(){const e=document.createElement("div");return e.className="chat-spinner",e.innerHTML="<span></span><span></span><span></span>",this._appendChat(e),e}_appendToolCard(e){const t=document.createElement("div");t.className="chat-tool-card";const n=document.createElement("span");n.className="chat-tool-card-name",n.textContent=e;const i=document.createElement("span");return i.className="chat-tool-card-status",t.append(n,i),this._appendChat(t),{setResult(r){i.textContent=r?"✓":"✕",i.classList.add(r?"ok":"err")}}}};Ko._WRITE_TOOLS=new Set(["update_urdf","update_part"]);let Ol=Ko;function Vb(s){const e=s.trim().replace(/>\s*</g,`>
<`).split(`
`),t=[];let n=0;for(const i of e){const r=i.trim();r&&(r.startsWith("</")&&(n=Math.max(0,n-1)),t.push("  ".repeat(n)+r),r.startsWith("<")&&!r.startsWith("</")&&!r.endsWith("/>")&&!r.startsWith("<!--")&&!r.startsWith("<?")&&n++)}return t.join(`
`)}function Gb(s){const e=s.getAttribute("position"),t=s.getIndex(),n=[];for(let l=0;l<e.count;l++)n.push([e.getX(l),e.getY(l),e.getZ(l)]);const i=[];if(t)for(let l=0;l<t.count;l+=3)i.push([t.getX(l),t.getX(l+1),t.getX(l+2)]);else for(let l=0;l<e.count;l+=3)i.push([l,l+1,l+2]);const r=new ArrayBuffer(84+i.length*50),o=new DataView(r);o.setUint32(80,i.length,!0);let a=84;for(const[l,c,h]of i){const u=n[l],d=n[c],f=n[h],g=d[0]-u[0],_=d[1]-u[1],p=d[2]-u[2],m=f[0]-u[0],T=f[1]-u[1],x=f[2]-u[2],E=_*x-p*T,I=p*m-g*x,N=g*T-_*m,C=Math.sqrt(E*E+I*I+N*N)||1;o.setFloat32(a,E/C,!0),a+=4,o.setFloat32(a,I/C,!0),a+=4,o.setFloat32(a,N/C,!0),a+=4;for(const U of[u,d,f])o.setFloat32(a,U[0],!0),a+=4,o.setFloat32(a,U[1],!0),a+=4,o.setFloat32(a,U[2],!0),a+=4;o.setUint16(a,0,!0),a+=2}return r}const Ki={thickness:.003,bodyHalfWidth:.062,rearHalfWidth:.095};function pl(s){const e=Math.max(.001,Math.min(.01,s.thickness)),t=Math.max(.04,Math.min(.09,s.bodyHalfWidth)),n=Math.max(t+.01,Math.min(.13,s.rearHalfWidth)),i=.115,r=.01,o=.08,a=-.145,l=t;function c(T,x,E,I,N=8e-4){const C=new Sr;return C.moveTo(T-E/2+N,x-I/2),C.lineTo(T+E/2-N,x-I/2),C.quadraticCurveTo(T+E/2,x-I/2,T+E/2,x-I/2+N),C.lineTo(T+E/2,x+I/2-N),C.quadraticCurveTo(T+E/2,x+I/2,T+E/2-N,x+I/2),C.lineTo(T-E/2+N,x+I/2),C.quadraticCurveTo(T-E/2,x+I/2,T-E/2,x+I/2-N),C.lineTo(T-E/2,x-I/2+N),C.quadraticCurveTo(T-E/2,x-I/2,T-E/2+N,x-I/2),C}function h(T,x,E){const I=new Sr;return I.absarc(T,x,E,0,Math.PI*2,!1),I}const u=new sf;u.moveTo(-n+r,i),u.lineTo(n-r,i),u.quadraticCurveTo(n,i,n,i-r),u.lineTo(n,o),u.lineTo(t,o),u.lineTo(t,a+l),u.absarc(0,a+l,t,0,-Math.PI,!0),u.lineTo(-t,o),u.lineTo(-n,o),u.lineTo(-n,i-r),u.quadraticCurveTo(-n,i,-n+r,i);const d=n-.02;u.holes.push(c(-d,.093,.012,.014,.001)),u.holes.push(c(d,.093,.012,.014,.001));const f=new Sr,g=0,_=.05;f.moveTo(g-.025,_-.035),f.lineTo(g-.025,_-.018),f.lineTo(g-.033,_-.018),f.lineTo(g-.033,_+.002),f.lineTo(g-.025,_+.002),f.lineTo(g-.025,_+.018),f.lineTo(g-.015,_+.028),f.lineTo(g+.015,_+.028),f.lineTo(g+.025,_+.018),f.lineTo(g+.025,_+.002),f.lineTo(g+.033,_+.002),f.lineTo(g+.033,_-.018),f.lineTo(g+.025,_-.018),f.lineTo(g+.025,_-.035),f.lineTo(g-.025,_-.035),u.holes.push(f),u.holes.push(c(-.025,.098,.018,.006,.001)),u.holes.push(c(.025,.098,.018,.006,.001)),u.holes.push(c(0,.09,.014,.004,.001)),u.holes.push(c(-.025,-.085,.018,.004,.001)),u.holes.push(c(.025,-.085,.018,.004,.001)),u.holes.push(h(0,-.098,.006));const p=.002;u.holes.push(h(-.08,.105,p)),u.holes.push(h(.08,.105,p)),u.holes.push(h(-.08,.083,p)),u.holes.push(h(.08,.083,p)),u.holes.push(h(-.02,.108,p)),u.holes.push(h(.02,.108,p)),u.holes.push(h(-.048,.01,p)),u.holes.push(h(.048,.01,p)),u.holes.push(h(-.048,-.03,p)),u.holes.push(h(.048,-.03,p)),u.holes.push(h(0,-.02,p)),u.holes.push(h(-.014,-.065,p)),u.holes.push(h(.014,-.065,p)),u.holes.push(h(-.014,-.052,p)),u.holes.push(h(.014,-.052,p)),u.holes.push(h(-.04,-.062,p)),u.holes.push(h(.04,-.062,p));const m=new tc(u,{depth:e,bevelEnabled:!1,curveSegments:48});return m.rotateZ(-Math.PI/2),Gb(m)}const Yi={radius:.0325,width:.026};function ml(s){const e=Math.max(.02,Math.min(.05,s.radius)),t=e*(31/32.5),n=Math.max(.008,Math.min(.03,s.width)),i=64,r=16,o=4,a=.58,l=.62,c=[],h=(T,x,E)=>c.push(...T,...x,...E),u=(T,x,E,I)=>{h(T,x,E),h(T,E,I)};for(let T=0;T<i;T++){const x=2*Math.PI*T/i,E=2*Math.PI*(T+1)/i,I=Math.cos(x),N=Math.sin(x),C=Math.cos(E),U=Math.sin(E),M=[t*I,t*N,-n/2],y=[t*C,t*U,-n/2],D=[t*I,t*N,n/2],H=[t*C,t*U,n/2];u(M,y,H,D),h([0,0,-n/2],y,M),h([0,0,n/2],D,H)}const d=2*Math.PI/r,f=n/o;for(let T=0;T<r;T++){const x=d*(T+.5),E=x-d*a/2,I=x+d*a/2;for(let N=0;N<o;N++){const C=-n/2+f*(N+.5),U=C-f*l/2,M=C+f*l/2,[y,D,H,k]=[Math.cos(E),Math.sin(E),Math.cos(I),Math.sin(I)],z=[t*y,t*D,U],$=[t*H,t*k,U],B=[t*y,t*D,M],ne=[t*H,t*k,M],G=[e*y,e*D,U],se=[e*H,e*k,U],ae=[e*y,e*D,M],pe=[e*H,e*k,M];u(G,se,pe,ae),u(z,G,ae,B),u($,ne,pe,se),u(z,$,se,G),u(ae,pe,ne,B)}}const g=c.length/9,_=new ArrayBuffer(84+g*50),p=new DataView(_);p.setUint32(80,g,!0);let m=84;for(let T=0;T<g;T++){const x=T*9,E=c[x+3]-c[x],I=c[x+4]-c[x+1],N=c[x+5]-c[x+2],C=c[x+6]-c[x],U=c[x+7]-c[x+1],M=c[x+8]-c[x+2],y=I*M-N*U,D=N*C-E*M,H=E*U-I*C,k=Math.sqrt(y*y+D*D+H*H)||1;p.setFloat32(m,y/k,!0),m+=4,p.setFloat32(m,D/k,!0),m+=4,p.setFloat32(m,H/k,!0),m+=4;for(let z=0;z<9;z++)p.setFloat32(m,c[x+z],!0),m+=4;p.setUint16(m,0,!0),m+=2}return _}const Ei=[{id:"hcsr04",label:"HC-SR04",category:"Sensor",description:"Ultrasonic distance sensor",defaultDims:[.045,.02,.015],cssColor:"#3373e5",urdfRgba:"0.20 0.45 0.90 1.00",defaultZ:.015,factory:()=>ii(()=>import("./generators-S1QaTisw.js"),[]).then(s=>({generate:s.generateHcsr04}))},{id:"l298n",label:"L298N",category:"Actuator",description:"Dual H-bridge motor driver",defaultDims:[.043,.043,.02],cssColor:"#c01f1f",urdfRgba:"0.75 0.12 0.12 1.00",defaultZ:.005,factory:()=>ii(()=>import("./generators-S1QaTisw.js"),[]).then(s=>({generate:s.generateL298n}))},{id:"esp32cam_lib",label:"ESP32-CAM",category:"MCU",description:"ESP32 camera module",defaultDims:[.0405,.027,.013],cssColor:"#1a7a3c",urdfRgba:"0.00 0.45 0.20 1.00",defaultZ:.005,factory:()=>ii(()=>import("./generators-S1QaTisw.js"),[]).then(s=>({generate:s.generateEsp32Cam}))},{id:"tt_motor",label:"TT Motor",category:"Actuator",description:"TT gear motor with DC can",defaultDims:[.036,.018,.022],cssColor:"#c89a14",urdfRgba:"0.83 0.63 0.09 1.00",defaultZ:.011,factory:()=>ii(()=>import("./generators-S1QaTisw.js"),[]).then(s=>({generate:s.generateTtMotor}))},{id:"sg90",label:"SG90",category:"Actuator",description:"Micro servo motor",defaultDims:[.022,.0115,.023],cssColor:"#e07810",urdfRgba:"0.90 0.50 0.15 1.00",defaultZ:.012,factory:()=>ii(()=>import("./generators-S1QaTisw.js"),[]).then(s=>({generate:s.generateSg90}))},{id:"arduino_nano",label:"Arduino Nano",category:"MCU",description:"Arduino Nano microcontroller",defaultDims:[.043,.018,.01],cssColor:"#006e33",urdfRgba:"0.00 0.50 0.30 1.00",defaultZ:.005,factory:()=>ii(()=>import("./generators-S1QaTisw.js"),[]).then(s=>({generate:s.generateArduinoNano}))},{id:"mpu6050",label:"MPU-6050",category:"Sensor",description:"6-axis IMU (accelerometer + gyroscope)",defaultDims:[.02,.02,.0025],cssColor:"#7a52cc",urdfRgba:"0.55 0.35 0.80 1.00",defaultZ:.005,factory:()=>ii(()=>import("./generators-S1QaTisw.js"),[]).then(s=>({generate:s.generateMpu6050}))}],Wb=Object.fromEntries(Ei.map(s=>[s.id,{label:s.label,color:s.urdfRgba,defaultZ:s.defaultZ,geomType:"mesh",defaultDims:[...s.defaultDims],category:s.category,cssColor:s.cssColor}])),ci={ultrasonic:{label:"Ultrasonic",color:"0.20 0.45 0.90 1.00",defaultZ:.015,geomType:"box",defaultDims:[.045,.02,.015],hidden:!0},camera:{label:"Camera",color:"0.90 0.20 0.25 1.00",defaultZ:.01,geomType:"box",defaultDims:[.025,.024,.009]},lidar:{label:"LIDAR",color:"0.20 0.80 0.45 1.00",defaultZ:.035,geomType:"cylinder",defaultDims:[.035,.04]},imu:{label:"IMU",color:"0.55 0.35 0.80 1.00",defaultZ:.008,geomType:"box",defaultDims:[.02,.02,.008],hidden:!0},servo:{label:"Servo",color:"0.90 0.50 0.15 1.00",defaultZ:.02,geomType:"box",defaultDims:[.022,.012,.03],hidden:!0},arduino:{label:"Arduino",color:"0.00 0.45 0.20 1.00",defaultZ:.008,geomType:"box",defaultDims:[.044,.018,.008],hidden:!0},raspberry_pi:{label:"Raspberry Pi",color:"0.70 0.10 0.20 1.00",defaultZ:.017,geomType:"box",defaultDims:[.086,.056,.017]},gps:{label:"GPS",color:"0.20 0.70 0.35 1.00",defaultZ:.01,geomType:"box",defaultDims:[.025,.025,.01]},buck_converter:{label:"Buck Conv.",color:"0.85 0.60 0.00 1.00",defaultZ:.011,geomType:"box",defaultDims:[.023,.017,.011]},box:{label:"Box",color:"0.65 0.65 0.65 1.00",defaultZ:.02,geomType:"box",defaultDims:[.04,.04,.02]},...Wb},jb=new Set(["robot-car"]);function td(s,e){const t=[...e.entries()].sort(([r],[o])=>r.localeCompare(o)),n=t.filter(([r])=>r.startsWith("00")).map(([,r])=>r.trimEnd()).join(`
`),i=t.filter(([r])=>!r.startsWith("00")).map(([,r])=>r.trimEnd()).join(`

`);return`<?xml version="1.0"?>
${n}
<robot name="${s}">

${i}

</robot>
`}class la{constructor(e,t){this._robotName="",this._dir="",this._partMap=new Map,this._stlBlobs=new Map,this._jointZPatches=new Map,this._wheelGroundZ=0,this._blobUrl=null,this._components=new Map,this._compCounters=new Map,this._meshBlobs=new Map,this._isCustom=!1,this._casterRadius=.0146,this._casterWidth=.0145,this._batteryBox={l:.0806,w:.0442,h:.022},this._chassisParams={...Ki},this._wheelParams={...Yi},this._powerbank={radius:.0115,length:.1199},this._undoStack=[],this._redoStack=[],this._maxUndo=50,this.onDOMRebuild=null,this.onHistoryChange=null,this._viewer=e,this.noticeEl=t}get isActive(){return document.body.classList.contains("build-open")}get isSupported(){return jb.has(this._robotName)}get isCatalogActive(){return this.isSupported||this._isCustom}init(e,t,n){this._robotName=e,this._dir=t,this._partMap=new Map(n),this._isCustom=!1,document.body.classList.remove("build-custom");for(const r of this._stlBlobs.values())URL.revokeObjectURL(r.split("#")[0]);this._stlBlobs.clear();for(const r of this._meshBlobs.values())URL.revokeObjectURL(r.split("#")[0]);this._meshBlobs.clear(),this._jointZPatches.clear(),this._components.clear(),this._compCounters.clear(),this._casterRadius=.0146,this._casterWidth=.0145,this._batteryBox={l:.0806,w:.0442,h:.022},this._powerbank={radius:.0115,length:.1199},this._chassisParams={...Ki},this._wheelParams={...Yi},this._undoStack.length=0,this._redoStack.length=0;const i=this._parseJointZ("wheel_left_joint")??-.0325;this._wheelGroundZ=i-Yi.radius,this.noticeEl.hidden=this.isSupported}initFromScratch(e){this._robotName=e.trim()||"custom-robot",this._dir="",this._isCustom=!0,document.body.classList.add("build-custom");for(const t of this._stlBlobs.values())URL.revokeObjectURL(t.split("#")[0]);this._stlBlobs.clear();for(const t of this._meshBlobs.values())URL.revokeObjectURL(t.split("#")[0]);this._meshBlobs.clear(),this._jointZPatches.clear(),this._components.clear(),this._compCounters.clear(),this._chassisParams={...Ki},this._wheelParams={...Yi},this._casterRadius=.0146,this._casterWidth=.0145,this._batteryBox={l:.0806,w:.0442,h:.022},this._powerbank={radius:.0115,length:.1199},this._wheelGroundZ=-.0325,this._undoStack.length=0,this._redoStack.length=0,this._partMap=new Map([["01-base.xml",'  <link name="base_link"/>']]),this.noticeEl.hidden=!0,this._reload()}open(){document.body.classList.add("build-open")}close(){document.body.classList.remove("build-open")}updateChassis(e){this._pushUndo(),this._chassisParams={...e},this._setSTL("chassis.stl",pl(e))}updateWheel(e){this._pushUndo(),this._wheelParams={...e};const t=e.radius+this._wheelGroundZ;this._jointZPatches.set("wheel_left_joint",t),this._jointZPatches.set("wheel_right_joint",t),this._setSTL("wheel.stl",ml(e))}updateCaster(e,t){this._pushUndo(),this._casterRadius=e,this._casterWidth=t,this._reload()}updateBatteryBox(e,t,n){this._pushUndo(),this._batteryBox={l:e,w:t,h:n},this._reload()}addComponent(e){this._pushUndo();const t=(this._compCounters.get(e)??0)+1;this._compCounters.set(e,t);const n=`${e}_${t}`,i=ci[e];return this._components.set(n,{type:e,x:0,y:0,z:(i==null?void 0:i.defaultZ)??.02,rx:0,ry:0,rz:0,dims:[...(i==null?void 0:i.defaultDims)??[.04,.04,.02]],jointType:"fixed",axis:[0,0,1],limitLower:-1.5708,limitUpper:1.5708,parent:"base_link"}),this._reload(),n}addMeshComponent(e,t){this._pushUndo();const n=(this._compCounters.get(e)??0)+1;this._compCounters.set(e,n);const i=`${e}_${n}`,r=URL.createObjectURL(new Blob([t],{type:"application/octet-stream"}));this._meshBlobs.set(i,`${r}#${i}.stl`);const o=ci[e];return this._components.set(i,{type:e,x:0,y:0,z:(o==null?void 0:o.defaultZ)??.02,rx:0,ry:0,rz:0,dims:[...(o==null?void 0:o.defaultDims)??[.04,.04,.02]],jointType:"fixed",axis:[0,0,1],limitLower:-1.5708,limitUpper:1.5708,parent:"base_link"}),this._reload(),i}restoreMeshBlob(e,t){if(!this._components.has(e))return;const n=this._meshBlobs.get(e);n&&URL.revokeObjectURL(n.split("#")[0]);const i=URL.createObjectURL(new Blob([t],{type:"application/octet-stream"}));this._meshBlobs.set(e,`${i}#${e}.stl`),this._reload()}removeComponent(e){this._pushUndo();const t=this._meshBlobs.get(e);t&&(URL.revokeObjectURL(t.split("#")[0]),this._meshBlobs.delete(e)),this._components.delete(e),this._reload()}updateComponent(e,t){this._components.has(e)&&(this._pushUndo(),this._updateComponentDirect(e,t))}_updateComponentDirect(e,t){const n=this._components.get(e);n&&(Object.assign(n,t),this._reload())}get chassisParams(){return{...this._chassisParams}}get wheelParams(){return{...this._wheelParams}}get casterRadius(){return this._casterRadius}get casterWidth(){return this._casterWidth}get batteryBox(){return{...this._batteryBox}}get powerbank(){return{...this._powerbank}}get canUndo(){return this._undoStack.length>0}get canRedo(){return this._redoStack.length>0}get componentIds(){return new Set(this._components.keys())}isFixedComponent(e){var t;return((t=this._components.get(e))==null?void 0:t.jointType)==="fixed"}getComponentXYZ(e){const t=this._components.get(e);return t?{x:t.x,y:t.y,z:t.z}:null}startComponentDrag(e){this._pushUndo()}finishComponentDrag(e,t,n,i){this._updateComponentDirect(e,{x:t,y:n,z:i})}updatePowerbank(e,t){this._pushUndo(),this._powerbank={radius:e,length:t},this._reload()}getComponentEntries(){return[...this._components.keys()].map(e=>({id:e,type:this._components.get(e).type}))}getComponentData(e){const t=this._components.get(e);return t?{...t,axis:[...t.axis]}:null}duplicateComponent(e){const t=this._components.get(e);if(!t)return null;this._pushUndo();const n=(this._compCounters.get(t.type)??0)+1;this._compCounters.set(t.type,n);const i=`${t.type}_${n}`;return this._components.set(i,{...t,axis:[...t.axis],x:t.x+.02}),this._reload(),i}getURDFXML(){return this._buildXML()}resetToDefaults(){var e;this._pushUndo(),this._chassisParams={...Ki},this._wheelParams={...Yi},this._casterRadius=.0146,this._casterWidth=.0145,this._batteryBox={l:.0806,w:.0442,h:.022},this._powerbank={radius:.0115,length:.1199},this._jointZPatches.clear(),this._components.clear(),this._compCounters.clear();for(const t of this._stlBlobs.values())URL.revokeObjectURL(t.split("#")[0]);this._stlBlobs.clear();for(const t of this._meshBlobs.values())URL.revokeObjectURL(t.split("#")[0]);this._meshBlobs.clear();try{localStorage.removeItem(`urdf-build-${this._robotName}`)}catch{}this._reload(),(e=this.onDOMRebuild)==null||e.call(this)}undo(){var e;this.canUndo&&(this._redoStack.push(this._snapshot()),this._applySnapshot(this._undoStack.pop()),(e=this.onHistoryChange)==null||e.call(this))}redo(){var e;this.canRedo&&(this._undoStack.push(this._snapshot()),this._applySnapshot(this._redoStack.pop()),(e=this.onHistoryChange)==null||e.call(this))}restore(){const e=localStorage.getItem(`urdf-build-${this._robotName}`);if(!e)return[];let t;try{t=JSON.parse(e)}catch{return[]}if(t.version!==1)return[];this._casterRadius=t.caster.radius,this._casterWidth=t.caster.width,this._batteryBox={...t.battery},this._powerbank=t.powerbank??{radius:.0115,length:.1199},this._components=new Map(t.components),this._compCounters=new Map(t.counters),this._chassisParams={...t.chassis},this._storeSTLBlob("chassis.stl",pl(t.chassis)),this._wheelParams={...t.wheel};const n=t.wheel.radius+this._wheelGroundZ;return this._jointZPatches.set("wheel_left_joint",n),this._jointZPatches.set("wheel_right_joint",n),this._storeSTLBlob("wheel.stl",ml(t.wheel)),this._reload(),[...this._components.keys()].map(i=>({id:i,type:this._components.get(i).type}))}getAvailableLinks(){const e=new Set,t=[];for(const n of this._partMap.values())for(const i of n.matchAll(/<link\s[^>]*name="([^"]+)"/g))e.has(i[1])||(e.add(i[1]),t.push(i[1]));for(const n of this._components.keys())e.has(n)||t.push(n);return t}async exportZip(e){const t=e.textContent;e.textContent="Exporting…",e.disabled=!0;try{let n=this._buildXML();for(const[,l]of this._meshBlobs){const c=l.split("#")[1];c&&(n=n.replaceAll(l,c))}const i=new Set([...n.matchAll(/filename="([^/"]+\.stl)"/g)].map(l=>l[1]));for(const[,l]of this._meshBlobs){const c=l.split("#")[1];c&&i.add(c)}const r={};for(const l of i){let c;if(this._stlBlobs.has(l))c=this._stlBlobs.get(l).split("#")[0];else{const h=[...this._meshBlobs.values()].find(u=>u.endsWith(`#${l}`));c=h?h.split("#")[0]:`${this._dir}/${l}`}r[l]=new Uint8Array(await fetch(c).then(h=>h.arrayBuffer()))}r[`${this._robotName}.urdf`]=new TextEncoder().encode(n);const{zipSync:o}=await ii(async()=>{const{zipSync:l}=await import("./browser-CXh1ITwj.js");return{zipSync:l}},[]),a=Object.assign(document.createElement("a"),{href:URL.createObjectURL(new Blob([o(r)],{type:"application/zip"})),download:`${this._robotName}.zip`});a.click(),URL.revokeObjectURL(a.href)}finally{e.textContent=t,e.disabled=!1}}_buildXML(){return this._insertComponents(this._applyGeometryPatches(this._applyJointPatches(td(this._robotName,this._partMap))))}_applyJointPatches(e){for(const[t,n]of this._jointZPatches)e=e.replace(new RegExp(`(<joint\\b[^>]*?\\bname="${t}"[\\s\\S]*?<origin\\b[^>]*?\\bxyz=")([^"]+)(")`),(i,r,o,a)=>{const l=o.trim().split(/\s+/);return l[2]=n.toFixed(4),`${r}${l.join(" ")}${a}`});return e}_applyGeometryPatches(e){const t=this._casterRadius,n=this._casterWidth;e=e.replace(/(<link\s[^>]*name="caster_wheel"[\s\S]*?<cylinder\s+)radius="[^"]*"\s+length="[^"]*"/,`$1radius="${t.toFixed(4)}" length="${n.toFixed(4)}"`),e=e.replace(new RegExp('(<joint\\b[^>]*?\\bname="caster_wheel_joint"[\\s\\S]*?<origin\\b[^>]*?\\bxyz=")([^"]+)(")'),(c,h,u,d)=>{const f=u.trim().split(/\s+/);return f[2]=(this._wheelGroundZ+t).toFixed(4),`${h}${f.join(" ")}${d}`});const{l:i,w:r,h:o}=this._batteryBox;e=e.replace(/(<link\s[^>]*name="battery_box"[\s\S]*?<box\s+)size="[^"]*"/,`$1size="${i.toFixed(4)} ${r.toFixed(4)} ${o.toFixed(4)}"`),e=e.replace(new RegExp('(<joint\\b[^>]*?\\bname="battery_box_joint"[\\s\\S]*?<origin\\b[^>]*?\\bxyz=")([^"]+)(")'),(c,h,u,d)=>{const f=u.trim().split(/\s+/);return f[2]=(-.0015-o/2).toFixed(4),`${h}${f.join(" ")}${d}`});const{radius:a,length:l}=this._powerbank;return e=e.replace(/(<link\s[^>]*name="powerbank"[\s\S]*?<cylinder\s+)radius="[^"]*"\s+length="[^"]*"/,`$1radius="${a.toFixed(4)}" length="${l.toFixed(4)}"`),e=e.replace(new RegExp('(<joint\\b[^>]*?\\bname="powerbank_joint"[\\s\\S]*?<origin\\b[^>]*?\\bxyz=")([^"]+)(")'),(c,h,u,d)=>{const f=u.trim().split(/\s+/);return f[2]=(-.0015-a).toFixed(4),`${h}${f.join(" ")}${d}`}),e}_insertComponents(e){if(this._components.size===0)return e;const t=[];for(const[n,i]of this._components){const r=ci[i.type];let o;if((r==null?void 0:r.geomType)==="mesh"){const c=this._meshBlobs.get(n);if(!c)continue;o=`<mesh filename="${c}"/>`}else(r==null?void 0:r.geomType)==="cylinder"?o=`<cylinder radius="${i.dims[0].toFixed(4)}" length="${i.dims[1].toFixed(4)}"/>`:o=`<box size="${i.dims[0].toFixed(4)} ${i.dims[1].toFixed(4)} ${i.dims[2].toFixed(4)}"/>`;const a=i.jointType!=="fixed"?`
    <axis xyz="${i.axis[0]} ${i.axis[1]} ${i.axis[2]}"/>`:"",l=i.jointType==="revolute"||i.jointType==="prismatic"?`
    <limit lower="${i.limitLower.toFixed(4)}" upper="${i.limitUpper.toFixed(4)}" effort="1" velocity="1"/>`:"";t.push(`
  <link name="${n}">
    <visual>
      <geometry>${o}</geometry>
      <material name="${n}_mat"><color rgba="${(r==null?void 0:r.color)??"0.65 0.65 0.65 1.00"}"/></material>
    </visual>
  </link>
  <joint name="${n}_joint" type="${i.jointType}">
    <parent link="${i.parent}"/>
    <child link="${n}"/>
    <origin xyz="${i.x.toFixed(4)} ${i.y.toFixed(4)} ${i.z.toFixed(4)}" rpy="${i.rx.toFixed(4)} ${i.ry.toFixed(4)} ${i.rz.toFixed(4)}"/>${a}${l}
  </joint>`)}return t.length===0?e:e.replace("</robot>",`${t.join(`
`)}
</robot>`)}_parseJointZ(e){for(const t of this._partMap.values()){const n=t.match(new RegExp(`<joint[^>]*name="${e}"[\\s\\S]*?<origin[^>]*\\bxyz="([^"]+)"`));if(n)return parseFloat(n[1].trim().split(/\s+/)[2])}return null}_snapshot(){return{chassisParams:{...this._chassisParams},wheelParams:{...this._wheelParams},casterRadius:this._casterRadius,casterWidth:this._casterWidth,batteryBox:{...this._batteryBox},powerbank:{...this._powerbank},components:[...this._components.entries()].map(([e,t])=>[e,{...t,axis:[...t.axis]}]),counters:[...this._compCounters.entries()]}}_pushUndo(){var e;this._undoStack.push(this._snapshot()),this._undoStack.length>this._maxUndo&&this._undoStack.shift(),this._redoStack.length=0,(e=this.onHistoryChange)==null||e.call(this)}_applySnapshot(e){var n;this._chassisParams={...e.chassisParams},this._wheelParams={...e.wheelParams},this._casterRadius=e.casterRadius,this._casterWidth=e.casterWidth,this._batteryBox={...e.batteryBox},this._powerbank={...e.powerbank},this._components=new Map(e.components.map(([i,r])=>[i,{...r,axis:[...r.axis]}])),this._compCounters=new Map(e.counters);const t=e.wheelParams.radius+this._wheelGroundZ;this._jointZPatches.set("wheel_left_joint",t),this._jointZPatches.set("wheel_right_joint",t);for(const i of this._stlBlobs.values())URL.revokeObjectURL(i.split("#")[0]);this._stlBlobs.clear();for(const i of this._meshBlobs.values())URL.revokeObjectURL(i.split("#")[0]);this._meshBlobs.clear(),this._storeSTLBlob("chassis.stl",pl(this._chassisParams)),this._storeSTLBlob("wheel.stl",ml(this._wheelParams)),this._reload(),(n=this.onDOMRebuild)==null||n.call(this)}_storeSTLBlob(e,t){const n=this._stlBlobs.get(e);n&&URL.revokeObjectURL(n.split("#")[0]);const i=URL.createObjectURL(new Blob([t],{type:"application/octet-stream"}));this._stlBlobs.set(e,`${i}#${e}`)}_setSTL(e,t){this._storeSTLBlob(e,t),this._reload()}_saveState(){if(!(!this._robotName||!this.isCatalogActive))try{if(localStorage.setItem(`urdf-build-${this._robotName}`,JSON.stringify({version:1,chassis:{...this._chassisParams},wheel:{...this._wheelParams},caster:{radius:this._casterRadius,width:this._casterWidth},battery:{...this._batteryBox},powerbank:{...this._powerbank},components:[...this._components.entries()],counters:[...this._compCounters.entries()]})),this._isCustom){localStorage.setItem("urdf-build-last-custom",this._robotName);const e=localStorage.getItem("urdf-build-custom-list"),t=e?JSON.parse(e):[];t.includes(this._robotName)||(t.push(this._robotName),localStorage.setItem("urdf-build-custom-list",JSON.stringify(t)))}}catch{}}get robotName(){return this._robotName}clearCustom(){try{const e=localStorage.getItem("urdf-build-last-custom");e?this.deleteCustom(e):localStorage.removeItem("urdf-build-last-custom")}catch{}}deleteCustom(e){try{const t=localStorage.getItem("urdf-build-custom-list"),i=(t?JSON.parse(t):[]).filter(r=>r!==e);i.length>0?localStorage.setItem("urdf-build-custom-list",JSON.stringify(i)):localStorage.removeItem("urdf-build-custom-list"),localStorage.removeItem(`urdf-build-${e}`),localStorage.getItem("urdf-build-last-custom")===e&&localStorage.removeItem("urdf-build-last-custom")}catch{}}static lastCustomName(){try{const e=localStorage.getItem("urdf-build-last-custom");return e&&localStorage.getItem(`urdf-build-${e}`)?e:null}catch{return null}}static savedCustomNames(){try{const e=localStorage.getItem("urdf-build-custom-list"),t=e?JSON.parse(e):[],n=localStorage.getItem("urdf-build-last-custom");return n&&!t.includes(n)&&localStorage.getItem(`urdf-build-${n}`)&&t.unshift(n),t.filter(i=>!!localStorage.getItem(`urdf-build-${i}`))}catch{return[]}}restoreCustom(){const e=la.lastCustomName();return e?this.restoreCustomByName(e):[]}restoreCustomByName(e){return this.initFromScratch(e),this.restore()}_reload(){if(!this._robotName)return;let e=this._insertComponents(this._applyGeometryPatches(this._applyJointPatches(td(this._robotName,this._partMap))));for(const[t,n]of this._stlBlobs)e=e.replaceAll(`filename="${t}"`,`filename="${n}"`);e=e.replace(/filename="([^/"]+)"/g,`filename="${this._dir}/$1"`),this._blobUrl&&URL.revokeObjectURL(this._blobUrl),this._blobUrl=URL.createObjectURL(new Blob([e],{type:"application/xml"})),this._viewer.urdf=this._blobUrl,this._saveState()}}const Xb="http://127.0.0.1:7337/claude",qb="claude-sonnet-4-6";function nd(s){return typeof marked<"u"&&typeof DOMPurify<"u"?DOMPurify.sanitize(marked.parse(s),{ADD_ATTR:["style"]}):s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}const $b={clear:{desc:"Clear chat history"},format:{desc:"Prettify URDF XML"}},Yb={add:{desc:"Add a component from the library",arg:"type"},remove:{desc:"Remove a component by id",arg:"id"},move:{desc:"Move a component (x=… y=… z=…)",arg:"id"},chassis:{desc:"Update chassis params (key=val …)"},wheels:{desc:"Update wheel params (key=val …)"},undo:{desc:"Undo last action"},redo:{desc:"Redo last undone action"},reset:{desc:"Reset robot to defaults"},export:{desc:"Export URDF + STL ZIP"}};class Kb{constructor(e,t){this._history=[],this._abortCtrl=null,this._brief=!1,this._cmdAcIdx=-1,this._buildCtrl=e,this._cb=t}init(){this._messagesEl=document.getElementById("chat-messages"),this._inputEl=document.getElementById("chat-input"),this._sendBtn=document.getElementById("chat-send"),this._abortBtn=document.getElementById("chat-abort"),this._briefBtn=document.getElementById("chat-brief-toggle"),this._toolCountBtn=document.getElementById("chat-tool-count"),this._cmdAcEl=document.getElementById("cmd-ac"),this._inputEl.addEventListener("input",()=>{this._inputEl.style.height="auto",this._inputEl.style.height=`${Math.min(this._inputEl.scrollHeight,120)}px`;const t=this._inputEl.value;/^\/[a-z]*$/.test(t)?this._showCmdAc(t.slice(1)):this._hideCmdAc()}),this._inputEl.addEventListener("keydown",t=>{if(!this._cmdAcEl.hidden){const n=this._cmdAcEl.querySelectorAll(".cmd-ac-item");if(t.key==="ArrowDown"){t.preventDefault(),this._cmdAcIdx=(this._cmdAcIdx+1)%n.length,this._updateCmdAcSelection(n);return}if(t.key==="ArrowUp"){t.preventDefault(),this._cmdAcIdx=(this._cmdAcIdx-1+n.length)%n.length,this._updateCmdAcSelection(n);return}if(t.key==="Tab"||t.key==="Enter"&&this._cmdAcIdx>=0){const i=n[this._cmdAcIdx];if(i){t.preventDefault(),this._applyCmd(i.dataset.cmd);return}}if(t.key==="Escape"){this._hideCmdAc();return}}t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),this._handleSend())}),this._sendBtn.addEventListener("click",()=>this._handleSend()),this._abortBtn.addEventListener("click",()=>{var t;return(t=this._abortCtrl)==null?void 0:t.abort()}),this._briefBtn.addEventListener("click",()=>{this._brief=!this._brief,this._briefBtn.classList.toggle("active",this._brief),this._briefBtn.setAttribute("aria-pressed",String(this._brief)),this._cb.onBriefToggle(this._brief)});let e=0;document.addEventListener("keydown",t=>{const n=this._messagesEl.closest("aside");if(!(n!=null&&n.classList.contains("open"))||document.body.classList.contains("editor-open"))return;const i=document.activeElement;if(t.key==="Escape"){const r=Date.now();if(r-e<400){confirm("Clear chat history?")&&this._clearChat(),e=0;return}e=r;return}i&&/^(INPUT|TEXTAREA|SELECT)$/.test(i.tagName)||i!=null&&i.isContentEditable||t.key.length!==1||t.metaKey||t.ctrlKey||t.altKey||this._inputEl.focus()}),this.syncToolCount()}syncToolCount(){this._toolCountBtn&&(this._toolCountBtn.textContent=`${this._buildTools().length} tools`)}_activeCmds(){return this._cb.isEditorTabActive()?$b:Yb}_showCmdAc(e){const t=this._activeCmds(),n=Object.entries(t).filter(([i])=>i.startsWith(e));if(!n.length){this._hideCmdAc();return}this._cmdAcIdx=0,this._cmdAcEl.innerHTML=n.map(([i,r],o)=>`
            <div class="cmd-ac-item${o===0?" selected":""}" role="option" data-cmd="${i}" aria-selected="${o===0}">
                <span class="cmd-ac-name">/${i}</span>
                ${r.arg?`<span class="cmd-ac-arg">&lt;${r.arg}&gt;</span>`:""}
                <span class="cmd-ac-desc">${r.desc}</span>
            </div>`).join("");for(const i of this._cmdAcEl.querySelectorAll(".cmd-ac-item"))i.addEventListener("mousedown",r=>{r.preventDefault(),this._applyCmd(i.dataset.cmd)});this._cmdAcEl.hidden=!1}_hideCmdAc(){this._cmdAcEl.hidden=!0,this._cmdAcIdx=-1}_updateCmdAcSelection(e){e.forEach((t,n)=>{const i=n===this._cmdAcIdx;t.setAttribute("aria-selected",String(i)),t.classList.toggle("selected",i)})}_applyCmd(e){const n=this._activeCmds()[e];n&&(this._hideCmdAc(),n.arg?(this._inputEl.value=`/${e} `,this._inputEl.focus()):(this._clearInput(),this._handleSendText(`/${e}`)))}_clearInput(){this._inputEl.value="",this._inputEl.style.height=""}_handleSend(){this._hideCmdAc();const e=this._inputEl.value.trim();e&&(this._clearInput(),this._handleSendText(e))}_handleSendText(e){if(this._cb.isEditorTabActive()){this._cb.handleEditorInput(e);return}if(e.startsWith("/")){this._executeSlashCommand(e);return}this._runConversation(e)}async _executeSlashCommand(e){var r;const t=e.trim().split(/\s+/),n=t[0].slice(1).toLowerCase(),i=t.slice(1);switch(n){case"add":{const o=(r=i[0])==null?void 0:r.toLowerCase();if(!o){this._appendSystemMsg("Usage: /add <type>");return}const a=Ei.find(l=>l.id.toLowerCase()===o||l.label.toLowerCase()===o);if(!a){this._appendSystemMsg(`Unknown library type: ${o}`);return}if(!this._buildCtrl.isCatalogActive){this._appendSystemMsg("No robot loaded — use the Build tab first.");return}try{const{generate:l}=await a.factory(),c=l(),h=this._buildCtrl.addMeshComponent(a.id,c);this._cb.onComponentAdded(h,a.id),this._cb.syncSlidersFromController(),this._cb.refreshPaletteCounts(),this._cb.switchToBuildTab(),this._appendSystemMsg(`Added ${a.label} as ${h}`)}catch(l){this._appendSystemMsg(`Failed to add ${o}: ${l.message}`)}return}case"remove":{const o=i[0];if(!o){this._appendSystemMsg("Usage: /remove <id>");return}this._buildCtrl.removeComponent(o),this._cb.onComponentRemoved(o),this._cb.refreshPaletteCounts(),this._appendSystemMsg(`Removed ${o}`);return}case"move":{const o=i[0];if(!o){this._appendSystemMsg("Usage: /move <id> x=… y=… z=…");return}const a=this._parseKV(i.slice(1)),l={};a.x!==void 0&&(l.x=parseFloat(a.x)),a.y!==void 0&&(l.y=parseFloat(a.y)),a.z!==void 0&&(l.z=parseFloat(a.z)),this._buildCtrl.updateComponent(o,l),this._cb.syncSlidersFromController(),this._appendSystemMsg(`Moved ${o}`);return}case"chassis":{const o=this._parseKV(i),a={};o.thickness&&(a.thickness=parseFloat(o.thickness)/1e3),o.bodyHalfWidth&&(a.bodyHalfWidth=parseFloat(o.bodyHalfWidth)/1e3),o.rearHalfWidth&&(a.rearHalfWidth=parseFloat(o.rearHalfWidth)/1e3),this._buildCtrl.updateChassis(a),this._cb.syncSlidersFromController(),this._appendSystemMsg("Chassis updated");return}case"wheels":{const o=this._parseKV(i),a={};o.radius&&(a.radius=parseFloat(o.radius)/1e3),o.width&&(a.width=parseFloat(o.width)/1e3),this._buildCtrl.updateWheel(a),this._cb.syncSlidersFromController(),this._appendSystemMsg("Wheels updated");return}case"undo":this._buildCtrl.undo(),this._cb.syncSlidersFromController(),this._appendSystemMsg("Undone");return;case"redo":this._buildCtrl.redo(),this._cb.syncSlidersFromController(),this._appendSystemMsg("Redone");return;case"reset":this._buildCtrl.resetToDefaults(),this._cb.syncSlidersFromController(),this._appendSystemMsg("Reset to defaults");return;case"export":this._buildCtrl.exportZip(document.getElementById("build-export"));return;default:this._appendSystemMsg(`Unknown command: /${n}`)}}_parseKV(e){const t={};for(const n of e){const[i,r]=n.split("=");i&&r!==void 0&&(t[i]=r)}return t}_buildTools(){if(!this._buildCtrl.isCatalogActive)return[];const e=Object.keys(this._buildCtrl._catalog??{}),t=Ei.map(n=>n.id);return[...new Set([...e,...t])],[{name:"get_robot_state",description:"Returns current chassis dimensions, wheel params, and all added components.",input_schema:{type:"object",properties:{}}},{name:"add_component",description:"Add a component to the robot. Use library types for 3D mesh components.",input_schema:{type:"object",properties:{type:{type:"string",description:`Component type. Library types: ${t.join(", ")}`},parent:{type:"string",description:"Parent link name (default: base_link)"}},required:["type"]}},{name:"remove_component",description:"Remove a component by id.",input_schema:{type:"object",properties:{id:{type:"string",description:"Component id, e.g. hcsr04_1"}},required:["id"]}},{name:"duplicate_component",description:"Duplicate an existing component.",input_schema:{type:"object",properties:{id:{type:"string"}},required:["id"]}},{name:"update_component",description:"Update position, rotation, size, or joint of a component. Positions in metres, angles in radians.",input_schema:{type:"object",properties:{id:{type:"string",description:"Component id"},x:{type:"number",description:"URDF X position (m). −X = front"},y:{type:"number",description:"URDF Y position (m). +Y = right"},z:{type:"number",description:"URDF Z position (m). +Z = up"},rx:{type:"number",description:"Roll (rad)"},ry:{type:"number",description:"Pitch (rad)"},rz:{type:"number",description:"Yaw (rad)"},jointType:{type:"string",enum:["fixed","continuous","revolute","prismatic"]},parent:{type:"string"}},required:["id"]}},{name:"undo",description:"Undo the last build action.",input_schema:{type:"object",properties:{}}},{name:"redo",description:"Redo the last undone build action.",input_schema:{type:"object",properties:{}}},{name:"update_chassis",description:"Update chassis dimensions. All values in metres.",input_schema:{type:"object",properties:{thickness:{type:"number",description:"Plate thickness (m)"},bodyHalfWidth:{type:"number",description:"Half-width of the main body (m)"},rearHalfWidth:{type:"number",description:"Half-width of the rear section (m)"}}}},{name:"update_wheels",description:"Update drive-wheel dimensions. All values in metres.",input_schema:{type:"object",properties:{radius:{type:"number",description:"Wheel radius (m)"},width:{type:"number",description:"Wheel width (m)"}}}},{name:"update_caster",description:"Update caster wheel dimensions. All values in metres.",input_schema:{type:"object",properties:{radius:{type:"number",description:"Caster sphere radius (m)"},width:{type:"number",description:"Caster width (m)"}}}},{name:"update_battery_box",description:"Update battery box dimensions (length, width, height in metres).",input_schema:{type:"object",properties:{l:{type:"number",description:"Length (m)"},w:{type:"number",description:"Width (m)"},h:{type:"number",description:"Height (m)"}}}},{name:"update_powerbank",description:"Update powerbank cylinder dimensions (radius and length in metres).",input_schema:{type:"object",properties:{radius:{type:"number",description:"Cylinder radius (m)"},length:{type:"number",description:"Cylinder length (m)"}}}}]}async _executeTool(e,t){switch(e){case"get_robot_state":{const n=this._buildCtrl.chassisParams,i=this._buildCtrl.wheelParams,r=this._buildCtrl.getComponentEntries().map(({id:o,type:a})=>({id:o,type:a,...this._buildCtrl.getComponentData(o)}));return{chassis:n,wheels:i,casterRadius:this._buildCtrl.casterRadius,casterWidth:this._buildCtrl.casterWidth,batteryBox:this._buildCtrl.batteryBox,powerbank:this._buildCtrl.powerbank,components:r}}case"add_component":{const n=t.type;if(!this._buildCtrl.isCatalogActive)return{error:"No robot loaded"};const i=Ei.find(o=>o.id===n);if(i){const{generate:o}=await i.factory(),a=this._buildCtrl.addMeshComponent(i.id,o());return this._cb.onComponentAdded(a,i.id),this._cb.syncSlidersFromController(),this._cb.refreshPaletteCounts(),{ok:!0,id:a}}const r=this._buildCtrl.addComponent(n);return r?(this._cb.onComponentAdded(r,n),this._cb.syncSlidersFromController(),this._cb.refreshPaletteCounts(),{ok:!0,id:r}):{error:`Unknown component type: ${n}`}}case"remove_component":{const n=t.id;return this._buildCtrl.removeComponent(n),this._cb.onComponentRemoved(n),this._cb.refreshPaletteCounts(),{ok:!0}}case"duplicate_component":{const n=t.id,i=this._buildCtrl.duplicateComponent(n);if(!i)return{error:"Could not duplicate"};const r=this._buildCtrl.getComponentData(i);return this._cb.onComponentAdded(i,(r==null?void 0:r.type)??""),this._cb.refreshPaletteCounts(),{ok:!0,id:i}}case"update_component":{const{id:n,...i}=t;return this._buildCtrl.updateComponent(n,i),this._cb.syncSlidersFromController(),{ok:!0}}case"undo":return this._buildCtrl.undo(),this._cb.syncSlidersFromController(),{ok:!0};case"redo":return this._buildCtrl.redo(),this._cb.syncSlidersFromController(),{ok:!0};case"update_chassis":return this._buildCtrl.updateChassis(t),this._cb.syncSlidersFromController(),{ok:!0};case"update_wheels":return this._buildCtrl.updateWheel(t),this._cb.syncSlidersFromController(),{ok:!0};case"update_caster":{const{radius:n,width:i}=t,r={radius:this._buildCtrl.casterRadius,width:this._buildCtrl.casterWidth};return this._buildCtrl.updateCaster(n??r.radius,i??r.width),this._cb.syncSlidersFromController(),{ok:!0}}case"update_battery_box":{const{l:n,w:i,h:r}=t,o=this._buildCtrl.batteryBox;return this._buildCtrl.updateBatteryBox(n??o.l,i??o.w,r??o.h),this._cb.syncSlidersFromController(),{ok:!0}}case"update_powerbank":{const{radius:n,length:i}=t,r=this._buildCtrl.powerbank;return this._buildCtrl.updatePowerbank(n??r.radius,i??r.length),this._cb.syncSlidersFromController(),{ok:!0}}default:return{error:`Unknown tool: ${e}`}}}_buildSystem(){const e=this._buildCtrl.getComponentEntries(),t=e.length?e.map(o=>{const a=this._buildCtrl.getComponentData(o.id);return`  - ${o.id} (${o.type}) @ x=${(a==null?void 0:a.x)??0} y=${(a==null?void 0:a.y)??0} z=${(a==null?void 0:a.z)??0}`}).join(`
`):"  (none)",n=this._buildCtrl.chassisParams,i=this._buildCtrl.wheelParams,r=this._brief?`
BRIEF MODE: Answer in fewer than 4 lines. No preamble. Direct answers only.`:"";return`You are a robot builder assistant embedded in a live 3D URDF viewer.
The robot-car uses: −X = front, +X = rear, −Y = left, +Y = right, +Z = up.

Current chassis: thickness=${(n.thickness*1e3).toFixed(1)}mm  bodyHW=${(n.bodyHalfWidth*1e3).toFixed(1)}mm  rearHW=${(n.rearHalfWidth*1e3).toFixed(1)}mm
Current wheels: radius=${(i.radius*1e3).toFixed(1)}mm  width=${(i.width*1e3).toFixed(1)}mm
Current components:
${t}

Available library components: ${Ei.map(o=>o.id).join(", ")}

Use tools to modify the robot. Prefer direct tool calls over lengthy explanations.${r}`}_sanitizeHistory(){for(;this._history.length>0;){const e=this._history[this._history.length-1];if(e.role!=="assistant"||!e.content.some(t=>t.type==="tool_use"))return;this._history.pop()}}async _executeTools(e,t){const n=[];for(const i of e){const r=(t==null?void 0:t.get(i.id))??this._appendToolCard(i.name),o=await this._executeTool(i.name,i.input),a=!o.error;r.setResult(a),n.push({type:"tool_result",tool_use_id:i.id,content:JSON.stringify(o)})}this._history.push({role:"user",content:n})}async _runLoop(){for(;;){const e=this._appendSpinner(),t=await this._callAPI(),{content:n,toolCalls:i,toolCards:r}=await this._processStream(t,e);if(this._history.push({role:"assistant",content:n}),!i.length)break;await this._executeTools(i,r)}}async _withSession(e){if(!this._abortCtrl){this._abortCtrl=new AbortController,this._sendBtn.disabled=!0,this._abortBtn.hidden=!1;try{await e()}catch(t){const n=t;n.name!=="AbortError"&&(this._sanitizeHistory(),this._appendAssistantBubble(`⚠ ${n.message||"Request failed"}`))}finally{this._abortCtrl=null,this._sendBtn.disabled=!1,this._abortBtn.hidden=!0}}}async _runConversation(e){this._sanitizeHistory(),this._appendUserBubble(e),this._history.push({role:"user",content:e}),await this._withSession(()=>this._runLoop())}async _callAPI(){const e={model:qb,max_tokens:4096,system:this._buildSystem(),messages:this._history,tools:this._buildTools(),stream:!0};try{const i=await fetch(Xb,{method:"POST",signal:this._abortCtrl.signal,headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(i.ok)return i.body}catch{}const t=localStorage.getItem("urdf-api-key");if(!t)throw this._showApiKeyPrompt(),new Error("no-api-key");const n=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",signal:this._abortCtrl.signal,headers:{"Content-Type":"application/json","x-api-key":t,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify(e)});if(!n.ok){const i=await n.text().catch(()=>n.statusText);throw new Error(`API ${n.status}: ${i.slice(0,200)}`)}return n.body}_showApiKeyPrompt(){const e=document.createElement("div");e.className="chat-msg-system",e.innerHTML=`
            <div style="margin-bottom:6px;font-size:0.8125rem;color:var(--text-2)">
                Enter your Anthropic API key to use the build AI:
            </div>
            <div style="display:flex;gap:6px">
                <input type="password" placeholder="sk-ant-…"
                    style="flex:1;padding:4px 8px;border-radius:6px;border:1px solid var(--border);
                           background:var(--bg);color:var(--text-1);font-size:0.8125rem"/>
                <button type="button" style="padding:4px 10px;border-radius:6px;border:none;
                    background:var(--blue);color:#fff;font-size:0.8125rem;cursor:pointer">Save</button>
            </div>`;const t=e.querySelector("input");e.querySelector("button").addEventListener("click",()=>{var r;const i=t.value.trim();i&&(localStorage.setItem("urdf-api-key",i),e.remove(),this._runConversation(((r=this._history[this._history.length-1])==null?void 0:r.role)==="user"?this._history.pop().content:""))}),this._appendChat(e)}async*_parseSSE(e){const t=e.getReader(),n=new TextDecoder;let i="",r=null;for(;;){const{done:o,value:a}=await t.read();if(o)break;i+=n.decode(a,{stream:!0});const l=i.split(`
`);i=l.pop();for(const c of l)if(c.startsWith("event: "))r=c.slice(7).trim();else if(c.startsWith("data: ")&&r){const h=c.slice(6);if(h==="[DONE]")return;try{yield{event:r,data:JSON.parse(h)}}catch{}r=null}}}async _processStream(e,t){const n=[],i=[],r=new Map;let o=null,a="",l=null,c="",h=!1,u=!1;const d=()=>{u||(u=!0,t.remove())};for await(const{event:f,data:g}of this._parseSSE(e)){const _=g;if(f==="content_block_start"){d();const p=_.content_block;(p==null?void 0:p.type)==="text"?(o=this._appendAssistantBubble(""),a="",n.push({type:"text",text:""})):(p==null?void 0:p.type)==="tool_use"&&(l={id:p.id,name:p.name,idx:n.length},c="",n.push({type:"tool_use",id:p.id,name:p.name,input:{}}),r.set(p.id,this._appendToolCard(p.name)))}else if(f==="content_block_delta"){const p=_.delta;if((p==null?void 0:p.type)==="text_delta"){a+=p.text??"";const m=n[n.length-1];(m==null?void 0:m.type)==="text"&&(m.text=a),o&&!h&&(h=!0,requestAnimationFrame(()=>{h=!1,o&&(o.innerHTML=nd(a),this._messagesEl.scrollTop=this._messagesEl.scrollHeight)}))}else(p==null?void 0:p.type)==="input_json_delta"&&(c+=p.partial_json??"")}else if(f==="content_block_stop"&&l){let p={};try{p=JSON.parse(c)}catch{}n[l.idx].input=p,i.push({type:"tool_use",id:l.id,name:l.name,input:p}),l=null}}return d(),{content:n,toolCalls:i,toolCards:r}}_clearChat(){this._history=[],this._messagesEl.innerHTML=""}_appendChat(e){this._messagesEl.appendChild(e),this._messagesEl.scrollTop=this._messagesEl.scrollHeight}_appendUserBubble(e){const t=document.createElement("div");t.className="chat-msg-user",t.textContent=e,this._appendChat(t)}_appendAssistantBubble(e){const t=document.createElement("div");return t.className="chat-msg-assistant",t.innerHTML=nd(e),this._appendChat(t),t}_appendSystemMsg(e){const t=document.createElement("div");t.className="chat-msg-system",t.textContent=e,this._appendChat(t)}_appendSpinner(){const e=document.createElement("div");return e.className="chat-spinner",e.innerHTML="<span></span><span></span><span></span>",this._appendChat(e),e}_appendToolCard(e){const t=document.createElement("div");t.className="chat-tool-card";const n=document.createElement("span");n.className="chat-tool-card-name",n.textContent=e;const i=document.createElement("span");return i.className="chat-tool-card-status",t.append(n,i),this._appendChat(t),{setResult(r){i.textContent=r?"✓":"✕",i.classList.add(r?"ok":"err")}}}}function Te(s){return document.getElementById(s)}customElements.define("urdf-viewer",Ub);const Fe=Te("viewer"),is=Te("joints"),as=Te("robots"),uc=Te("loading"),Ur=Te("part-label"),gl=Te("gesture-toggle"),Zb=Te("gesture-overlay"),Jb=Te("gesture-video"),xf=Te("gesture-section"),Or=Te("gesture-section-header"),Qb=Te("editor-panel"),eM=Te("build-notice"),hi=new Ol(Fe,Qb),be=new la(Fe,eM);let Tr;const ui=new Ux(.5,25,5592405,3355443);ui.visible=!1;ui.raycast=()=>{};requestAnimationFrame(()=>Fe.scene.add(ui));Te("tab-robot").addEventListener("click",()=>{hi.close(),be.close(),document.body.classList.remove("library-open"),ui.visible=!1});Te("tab-editor").addEventListener("click",()=>{be.close(),document.body.classList.remove("library-open"),hi.open(),ui.visible=!1});Te("tab-build").addEventListener("click",()=>{hi.close(),document.body.classList.remove("library-open"),be.open(),ui.visible=!0,ui.position.y=Fe.shadowPlane.position.y});Te("tab-library").addEventListener("click",()=>{hi.close(),be.close(),ui.visible=!1,document.body.classList.add("library-open"),Pc()});const id=Te("ignore-limits"),sd=Te("show-collision"),Fl=Te("display-shadow"),Yo=Te("up-axis");function tM(s,e){const t=[...e.entries()].sort(([r],[o])=>r.localeCompare(o)),n=t.filter(([r])=>r.startsWith("00")).map(([,r])=>r.trimEnd()).join(`
`),i=t.filter(([r])=>!r.startsWith("00")).map(([,r])=>r.trimEnd()).join(`

`);return`<?xml version="1.0"?>
${n}
<robot name="${s}">

${i}

</robot>
`}let Uo=null;async function nM(s){const e=s.parts,t=await fetch(`${e}.parts.json`).then(l=>l.json()),n=e.replace(/\/[^/]+$/,""),i=await Promise.all(t.parts.map(l=>fetch(`${n}/parts/${l}`).then(c=>c.text()))),r=new Map(t.parts.map((l,c)=>[l,i[c]]));be.init(t.robot,n,r);const o=tM(t.robot,r).replace(/filename="([^/"]+)"/g,`filename="${n}/$1"`);Uo&&URL.revokeObjectURL(Uo),Uo=URL.createObjectURL(new Blob([o],{type:"application/xml"})),Fe.urdf=Uo,pa();const a=be.restore();for(const{id:l,type:c}of a){const h=ci[c];if((h==null?void 0:h.geomType)==="mesh"){const u=Ei.find(d=>d.id===c);u&&u.factory().then(({generate:d})=>be.restoreMeshBlob(l,d())).catch(d=>console.warn("[restore] mesh regen failed for",l,d))}ls(l,c,be.getComponentData(l))}a.length>0&&Wr(),Gn(),kr()}const Qi=[{name:"Robot Car",label:"Car",parts:"/robots/robot-car/robot-car",up:"+Z"},{name:"T12",label:"T12",urdf:"/robots/T12/urdf/T12.URDF",up:"-Z"},{name:"TriATHLETE",label:"Tri",urdf:"/robots/TriATHLETE/urdf/TriATHLETE.URDF",up:"-Z"},{name:"Laikago",label:"Laikago",urdf:"/robots/laikago/urdf/laikago.urdf",up:"+Z"},{name:"Open Manipulator X",label:"OM-X",urdf:"/robots/open_manipulator_x/open_manipulator_x.urdf",package:"open_manipulator_description: /robots/open_manipulator_x",up:"+Z"},{name:"SO-ARM100",label:"SO-100",urdf:"/robots/so_arm100/so100.urdf",up:"+Z"},{name:"Simple Humanoid",label:"Humanoid",urdf:"/robots/simple_humanoid/simple_humanoid.urdf",up:"+Z"},{name:"Spryped",label:"Spryped",urdf:"/robots/spryped/urdf/spryped.urdf",package:"spryped_urdf_rev06: /robots/spryped",up:"+Z"}];let bf=0;const Us=Te("robot-track-slider");function ca(s){const e=as.getBoundingClientRect(),t=s.getBoundingClientRect();Us.style.width=`${t.width}px`,Us.style.height=`${t.height}px`,Us.style.left=`${t.left-e.left}px`,Us.style.top=`${t.top-e.top}px`}function wr(){const s=as.querySelector(".robot-btn.active");s&&ca(s)}function iM(){for(const s of as.querySelectorAll(".robot-btn"))s.classList.remove("active")}function Fr(s,e){bf=e,Fe.up=s.up,Yo.value=s.up,Fe.package=s.package??"";const t=s.parts?`${s.parts}.urdf`:s.urdf;s.parts?nM(s).catch(()=>{}):Fe.urdf=s.urdf,iM();const n=s.name?as.querySelector(`.robot-btn[data-name="${s.name}"]`):null;n&&(n.classList.add("active"),ca(n)),hi.setSourceUrl(t)}let _n=null,pr=null;for(let s=0;s<Qi.length;s++){const e=Qi[s],t=document.createElement("button");t.type="button",t.className="robot-btn",t.textContent=e.label,t.title=e.name,t.dataset.name=e.name,t.dataset.index=String(s),t.addEventListener("click",()=>Fr(e,s)),t.addEventListener("mouseenter",()=>{ca(t),_n&&clearTimeout(_n),_n=setTimeout(()=>Fr(e,s),150)}),as.appendChild(t)}as.closest(".robot-shell").addEventListener("mouseleave",()=>{_n&&(clearTimeout(_n),_n=null),wr()});new ResizeObserver(wr).observe(as);Us.style.transition="none";Fr(Qi[0],0);requestAnimationFrame(()=>requestAnimationFrame(()=>{Us.style.transition=""}));document.addEventListener("keydown",s=>{if(s.key!=="ArrowLeft"&&s.key!=="ArrowRight")return;const e=document.activeElement;if(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)return;const t=s.key==="ArrowRight"?1:-1,n=(bf+t+Qi.length)%Qi.length;Fr(Qi[n],n)});id.addEventListener("change",()=>{Fe.ignoreLimits=id.checked});sd.addEventListener("change",()=>{Fe.showCollision=sd.checked});Fl.addEventListener("change",()=>{Fe.displayShadow=Fl.checked});Yo.addEventListener("change",()=>{Fe.up=Yo.value});Fl.checked=Fe.displayShadow;Yo.value=Fe.up;function Mf(s){return s.replace(/_joint$/,"").replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}function Sf(s){return s.replace(/_joint$/,"")}const rd=Te("inspector"),sM=Te("inspector-name"),dc=Te("inspector-x"),fc=Te("inspector-y"),pc=Te("inspector-z"),ha=Te("inspector-scale-x"),ua=Te("inspector-scale-y"),da=Te("inspector-scale-z"),Ef=Te("inspector-snippet"),_l=Te("inspector-copy"),rM=Te("inspector-close");let es=null,Ar=null,si=null;function ri(s){return s.toFixed(4)}function Tf(){if(!es||!Fe.robot)return;const s=Fe.robot.joints[es];if(!s)return;const e=s.position,t=s.rotation,n=parseFloat(ha.value),i=parseFloat(ua.value),r=parseFloat(da.value),o=Math.abs(n-1)>.005||Math.abs(i-1)>.005||Math.abs(r-1)>.005,a=Math.abs(n-i)<.001&&Math.abs(i-r)<.001;let l="";o&&a?l=`
scale: ${n.toFixed(2)}×`:o&&(l=`
scale: ${n.toFixed(2)} ${i.toFixed(2)} ${r.toFixed(2)}`),Ef.textContent=`[${es}]
<origin xyz="${ri(e.x)} ${ri(e.y)} ${ri(e.z)}"
        rpy="${ri(t.x)} ${ri(t.y)} ${ri(t.z)}"/>${l}`}let od=0;function oM(){if(!es||!Fe.robot)return;const s=Fe.robot.joints[es];if(!s)return;s.position.set(parseFloat(dc.value)||0,parseFloat(fc.value)||0,parseFloat(pc.value)||0);const e=parseFloat(ha.value)||1,t=parseFloat(ua.value)||1,n=parseFloat(da.value)||1,i=Fe.robot.links[Sf(es)];i&&i.scale.set(e,t,n),Fe.redraw(),clearTimeout(od),od=window.setTimeout(Tf,150)}function mc(s){var i;es=s;const e=s?(i=Fe.robot)==null?void 0:i.joints[s]:null;if(!e){rd.style.display="none";return}rd.style.display="",sM.textContent=Mf(s);const t=e.position;dc.value=ri(t.x),fc.value=ri(t.y),pc.value=ri(t.z);const n=Fe.robot.links[Sf(s)];ha.value=String(n?n.scale.x:1),ua.value=String(n?n.scale.y:1),da.value=String(n?n.scale.z:1),Tf(),si==null||si.setSelectedJoint(s)}function wf(s,e){let t=0,n=0,i=!1;const r=parseFloat(e.step)||.001;s.addEventListener("pointerdown",o=>{t=o.clientX,n=parseFloat(e.value)||0,i=!1,s.setPointerCapture(o.pointerId)}),s.addEventListener("pointermove",o=>{if(!s.hasPointerCapture(o.pointerId))return;const a=o.clientX-t;!i&&Math.abs(a)<3||(i=!0,e.value=String(parseFloat((n+a*r).toFixed(6))),e.dispatchEvent(new Event("input",{bubbles:!0})))}),s.addEventListener("pointerup",()=>{i||e.focus(),i=!1})}var yd;for(const s of[dc,fc,pc,ha,ua,da]){s.addEventListener("input",oM);const e=(yd=s.closest(".inspector-row"))==null?void 0:yd.querySelector("label");e&&wf(e,s)}rM.addEventListener("click",()=>mc(null));_l.addEventListener("click",()=>{navigator.clipboard.writeText(Ef.textContent??""),_l.textContent="Copied!",setTimeout(()=>{_l.textContent="Copy"},1500)});Fe.addEventListener("click",()=>{Ar&&(mc(Ar),hi.isOpen&&hi.jumpToJoint(Ar))});const gc=Te("urdf-error-banner"),aM=Te("urdf-error-text"),lM=Te("urdf-error-close");Fe.addEventListener("urdf-change",()=>{uc.classList.add("visible"),is.innerHTML="",mc(null),gc.classList.remove("visible")});Fe.addEventListener("urdf-error",s=>{uc.classList.remove("visible"),aM.textContent=s.detail||"URDF load error",gc.classList.add("visible")});lM.addEventListener("click",()=>{gc.classList.remove("visible")});Fe.addEventListener("urdf-processed",()=>{uc.classList.remove("visible"),document.querySelectorAll('input[data-preview="true"]').forEach(s=>{s.value="0"}),requestAnimationFrame(()=>{ui.position.y=Fe.shadowPlane.position.y})});const ad=Math.PI/180;let mr=null;function cM(){mr==null||mr.abort(),mr=new AbortController;const{signal:s}=mr;if(is.innerHTML="",!Fe.robot)return;const e=Object.values(Fe.robot.joints).filter(t=>t.jointType!=="fixed"&&t.visible).sort((t,n)=>t.name.localeCompare(n.name));for(const t of e){const n=document.createElement("div");n.className="joint",n.dataset.joint=t.name;const i=document.createElement("div");i.className="joint-name",i.title=t.name,i.textContent=t.name;const r=document.createElement("div");r.className="joint-row";const o=document.createElement("input");o.type="range",o.step="0.001";const a=document.createElement("input");a.type="number",a.step="0.001";const l=t.jointType==="prismatic",c=l?1:1/ad;n.update=()=>{const h=t.jointType==="continuous",u=Fe.ignoreLimits||h?-6.28:t.limit.lower,d=Fe.ignoreLimits||h?6.28:t.limit.upper;o.min=String(u),o.max=String(d),o.value=String(t.angle),a.min=String(+(u*c).toFixed(3)),a.max=String(+(d*c).toFixed(3)),a.value=String(+(t.angle*c).toPrecision(4))},o.addEventListener("input",()=>{Fe.setJointValue(t.name,parseFloat(o.value))},{signal:s}),a.addEventListener("change",()=>{const h=l?1:ad;Fe.setJointValue(t.name,parseFloat(a.value)*h)},{signal:s}),r.append(o,a),n.append(i,r),is.appendChild(n),n.update()}}Fe.addEventListener("urdf-processed",cM);Fe.addEventListener("ignore-limits-change",()=>{var s;for(const e of is.querySelectorAll(".joint"))(s=e.update)==null||s.call(e)});Fe.addEventListener("angle-change",s=>{var t,n;const e=s.detail;(n=(t=is.querySelector(`[data-joint="${e}"]`))==null?void 0:t.update)==null||n.call(t)});let ld=0;Fe.addEventListener("pointermove",s=>{cancelAnimationFrame(ld),ld=requestAnimationFrame(()=>{Ur.style.left=s.clientX+14+"px",Ur.style.top=s.clientY-32+"px"})});Fe.addEventListener("joint-mouseover",s=>{var t;const e=s.detail;Ar=e,(t=is.querySelector(`[data-joint="${e}"]`))==null||t.setAttribute("data-hovered",""),Ur.textContent=Mf(e),Ur.style.display="block"});Fe.addEventListener("joint-mouseout",s=>{var t;const e=s.detail;Ar=null,(t=is.querySelector(`[data-joint="${e}"]`))==null||t.removeAttribute("data-hovered"),Ur.style.display="none"});function hM(s,e){var i;const t=(i=document.elementFromPoint(s,e))==null?void 0:i.closest(".robot-btn");if(t){t.click();return}const n={clientX:s,clientY:e,bubbles:!0,pointerId:1};Fe.dispatchEvent(new PointerEvent("pointerdown",n)),Fe.dispatchEvent(new PointerEvent("pointerup",n))}gl.addEventListener("click",async()=>{if(si){si.stop();return}const{GestureController:s}=await ii(async()=>{const{GestureController:e}=await import("./gesture-Bv1n1ORI.js");return{GestureController:e}},[]);si=new s({viewer:Fe,overlayCanvas:Zb,videoEl:Jb,onDwellSelect:hM,onPointerMove(e,t){var i;const n=(i=document.elementFromPoint(e,t))==null?void 0:i.closest(".robot-btn");if(n){if(ca(n),n!==pr){pr=n,_n&&clearTimeout(_n);const r=parseInt(n.dataset.index,10);_n=setTimeout(()=>Fr(Qi[r],r),150)}}else pr&&(pr=null,_n&&(clearTimeout(_n),_n=null)),wr()},onPointerLeave(){pr=null,wr()},onStop(){si=null,gl.classList.remove("active"),wr()}}),si.start().then(()=>{gl.classList.add("active"),xf.classList.add("open"),Or.setAttribute("aria-expanded","true")}).catch(()=>{si=null})});Or.addEventListener("click",()=>{const s=xf.classList.toggle("open");Or.setAttribute("aria-expanded",String(s))});Or.addEventListener("keydown",s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),Or.click())});function uM(s,e,t){s.addEventListener("input",()=>{e.value=s.value,t()}),e.addEventListener("change",()=>{const n=Math.max(parseFloat(e.min),Math.min(parseFloat(e.max),parseFloat(e.value)));s.value=String(n),e.value=String(n),t()})}const _c=Te("build-chassis-thickness"),yc=Te("build-chassis-body-hw"),vc=Te("build-chassis-rear-hw"),xc=Te("build-wheel-radius"),bc=Te("build-wheel-width"),Mc=Te("build-caster-radius"),Sc=Te("build-caster-width"),Ec=Te("build-battery-l"),Tc=Te("build-battery-w"),wc=Te("build-battery-h"),Ac=Te("build-powerbank-r"),Cc=Te("build-powerbank-l");function yl(){be.isSupported&&be.updateChassis({thickness:parseFloat(_c.value)/1e3,bodyHalfWidth:parseFloat(yc.value)/1e3,rearHalfWidth:parseFloat(vc.value)/1e3})}function cd(){be.isSupported&&be.updateWheel({radius:parseFloat(xc.value)/1e3,width:parseFloat(bc.value)/1e3})}function hd(){be.isSupported&&be.updateCaster(parseFloat(Mc.value)/1e3,parseFloat(Sc.value)/1e3)}function vl(){be.isSupported&&be.updateBatteryBox(parseFloat(Ec.value)/1e3,parseFloat(Tc.value)/1e3,parseFloat(wc.value)/1e3)}function ud(){be.isSupported&&be.updatePowerbank(parseFloat(Ac.value)/1e3,parseFloat(Cc.value)/1e3)}const dM=[[_c,"build-chassis-thickness-num",Ki.thickness*1e3,yl],[yc,"build-chassis-body-hw-num",Ki.bodyHalfWidth*1e3,yl],[vc,"build-chassis-rear-hw-num",Ki.rearHalfWidth*1e3,yl],[xc,"build-wheel-radius-num",Yi.radius*1e3,cd],[bc,"build-wheel-width-num",Yi.width*1e3,cd],[Mc,"build-caster-radius-num",0,hd],[Sc,"build-caster-width-num",0,hd],[Ec,"build-battery-l-num",0,vl],[Tc,"build-battery-w-num",0,vl],[wc,"build-battery-h-num",0,vl],[Ac,"build-powerbank-r-num",0,ud],[Cc,"build-powerbank-l-num",0,ud]];for(const[s,e,t,n]of dM){t>0&&(s.value=String(t));const i=Te(e);i.value=s.value,uM(s,i,n)}const dd=Te("build-export"),Oo=Te("build-copy-urdf"),Af=Te("build-undo"),Cf=Te("build-redo"),fM=Te("build-reset"),pM=Te("build-palette"),Ii=Te("build-components-list"),mM=Te("build-new-name"),gM=Te("build-new-create"),Rf=Te("build-saved-toggle"),Zi=Te("build-saved-list"),Lf=Te("build-active-header"),_M=Te("build-active-name"),Pf=Te("build-clear-custom"),yM=Te("build-shortcuts-toggle"),fd=Te("build-shortcuts"),Nf=Te("lib-search"),pd=Te("lib-pills"),md=Te("lib-grid"),vM=Te("lib-no-build"),xM=Te("lib-empty"),bM=Te("build-comp-count"),MM=Te("build-comp-empty");function Wr(){const s=be.chassisParams,e=be.wheelParams,t=be.powerbank,n=be.batteryBox,i=[[_c,"build-chassis-thickness-num",s.thickness*1e3],[yc,"build-chassis-body-hw-num",s.bodyHalfWidth*1e3],[vc,"build-chassis-rear-hw-num",s.rearHalfWidth*1e3],[xc,"build-wheel-radius-num",e.radius*1e3],[bc,"build-wheel-width-num",e.width*1e3],[Mc,"build-caster-radius-num",be.casterRadius*1e3],[Sc,"build-caster-width-num",be.casterWidth*1e3],[Ec,"build-battery-l-num",n.l*1e3],[Tc,"build-battery-w-num",n.w*1e3],[wc,"build-battery-h-num",n.h*1e3],[Ac,"build-powerbank-r-num",t.radius*1e3],[Cc,"build-powerbank-l-num",t.length*1e3]];for(const[r,o,a]of i)r.value=String(a),Te(o).value=String(a)}Af.addEventListener("click",()=>be.undo());Cf.addEventListener("click",()=>be.redo());fM.addEventListener("click",()=>{be.isCatalogActive&&(be.resetToDefaults(),Wr())});be.onHistoryChange=()=>{Af.disabled=!be.canUndo,Cf.disabled=!be.canRedo};be.onDOMRebuild=()=>{var s,e;pa();for(const{id:t,type:n}of be.getComponentEntries())ls(t,n,be.getComponentData(t)),((s=ci[n])==null?void 0:s.geomType)==="mesh"&&Vf(t,n);Wr(),Gn(),(e=be.onHistoryChange)==null||e.call(be),Tr==null||Tr.syncToolCount()};document.addEventListener("keydown",s=>{if(be.isActive){if((s.ctrlKey||s.metaKey)&&s.key==="z"&&!s.shiftKey&&(s.preventDefault(),be.undo()),(s.ctrlKey||s.metaKey)&&(s.key==="y"||s.key==="z"&&s.shiftKey)&&(s.preventDefault(),be.redo()),qt&&(s.key==="Delete"||s.key==="Backspace")&&!s.ctrlKey&&!s.metaKey){const e=document.activeElement;if(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)return;s.preventDefault();const t=Ii.querySelector(`[data-id="${qt}"]`);be.removeComponent(qt),ss.delete(qt),rs.delete(qt),Rc(qt),t==null||t.remove(),qt=null,Gn();return}if(qt&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(s.key)&&!s.ctrlKey&&!s.metaKey){s.preventDefault();const e=be.getComponentData(qt);if(!e)return;const t=.001;let{x:n,y:i,z:r}=e;s.shiftKey?(s.key==="ArrowUp"&&(r+=t),s.key==="ArrowDown"&&(r-=t)):(s.key==="ArrowLeft"&&(i+=t),s.key==="ArrowRight"&&(i-=t),s.key==="ArrowUp"&&(n-=t),s.key==="ArrowDown"&&(n+=t)),be.updateComponent(qt,{x:n,y:i,z:r});const o=ss.get(qt);o&&(o.x.value=n.toFixed(4),o.y.value=i.toFixed(4),o.z.value=r.toFixed(4))}}});dd.addEventListener("click",()=>void be.exportZip(dd));Oo.addEventListener("click",()=>{const s=be.getURDFXML();navigator.clipboard.writeText(s).then(()=>{const e=Oo.textContent;Oo.textContent="Copied!",setTimeout(()=>{Oo.textContent=e},1500)}).catch(()=>{})});gM.addEventListener("click",()=>{pa(),be.initFromScratch(mM.value),be.open(),Te("tab-build").click(),fa(),kr(),Gn()});function fa(){const s=la.savedCustomNames();if(Rf.hidden=s.length===0,s.length===0){Zi.hidden=!0;return}Zi.innerHTML="";for(const e of s){const t=document.createElement("div");t.className="build-saved-row";const n=document.createElement("span");n.className="build-saved-name",n.textContent=e;const i=document.createElement("button");i.type="button",i.className="build-export-btn build-saved-load",i.textContent="Load",i.addEventListener("click",()=>{pa();const o=be.restoreCustomByName(e);for(const{id:a,type:l}of o)ls(a,l,be.getComponentData(a));o.length>0&&Wr(),Gn(),be.open(),Te("tab-build").click(),kr(),Zi.hidden=!0});const r=document.createElement("button");r.type="button",r.className="build-remove-btn",r.textContent="×",r.title="Delete saved robot",r.addEventListener("click",()=>{be.deleteCustom(e),be.robotName===e&&kr(),fa()}),t.append(n,i,r),Zi.appendChild(t)}}function kr(){const s=be.isCatalogActive;Lf.hidden=!s,s&&(_M.textContent=be.robotName,Pf.hidden=be.isSupported)}Rf.addEventListener("click",()=>{Zi.hidden=!Zi.hidden});Pf.addEventListener("click",()=>{be.deleteCustom(be.robotName),Lf.hidden=!0,Zi.hidden=!0,fa()});yM.addEventListener("click",s=>{s.stopPropagation(),fd.hidden=!fd.hidden});fa();kr();const If=new Map;function Gn(){const s=new Map,e=be.getComponentEntries();for(const{type:n}of e)s.set(n,(s.get(n)??0)+1);for(const[n,i]of If){const r=s.get(n)??0;i.textContent=r>0?String(r):"",i.style.display=r>0?"inline":"none"}const t=e.length;bM.textContent=t>0?`${t} added`:"",MM.hidden=t>0||!be.isCatalogActive}for(const[s,e]of Object.entries(ci)){if(e.geomType==="mesh"||e.hidden)continue;const t=document.createElement("button");t.type="button",t.className="robot-btn",t.style.cssText="position: relative;",t.textContent=e.label,t.dataset.comp=s;const n=document.createElement("span");n.style.cssText="position:absolute;top:2px;right:3px;font-size:9px;line-height:1;color:var(--blue);display:none;font-weight:700;",t.appendChild(n),If.set(s,n),t.addEventListener("click",()=>{var r;if(!be.isCatalogActive)return;const i=be.addComponent(s);ma(i),ls(i,s),Gn(),(r=Ii.querySelector(`[data-id="${i}"]`))==null||r.scrollIntoView({behavior:"smooth",block:"nearest"})}),pM.appendChild(t)}const ss=new Map,rs=new Map;let qt=null;function pa(){Ii.innerHTML="",ss.clear(),rs.clear(),qt=null}function ma(s){for(const[e,t]of rs)if(e!==s&&!Array.from(t.options).some(n=>n.value===s)){const n=document.createElement("option");n.value=n.textContent=s,t.appendChild(n)}}function Rc(s){for(const e of rs.values()){const t=Array.from(e.options).find(n=>n.value===s);t&&e.removeChild(t)}}function Df(s){qt=s;for(const e of Ii.querySelectorAll(".build-component"))e.classList.toggle("selected",e.dataset.id===s)}function ls(s,e,t){var C,U;const n=ci[e],i=document.createElement("div");i.className="build-component",i.dataset.id=s;const r=document.createElement("div");r.className="build-component-header",r.setAttribute("aria-expanded","false");const o=document.createElement("span");o.textContent=`${n.label} ${s.split("_").pop()}`;const a=document.createElement("button");a.type="button",a.className="build-remove-btn",a.title="Duplicate",a.textContent="⧉",a.addEventListener("click",M=>{var D;M.stopPropagation();const y=be.duplicateComponent(s);y&&(ma(y),ls(y,e,be.getComponentData(y)),((D=ci[e])==null?void 0:D.geomType)==="mesh"&&Vf(y,e),Gn())});const l=document.createElement("button");l.type="button",l.className="build-remove-btn",l.title="Remove",l.textContent="×",l.addEventListener("click",M=>{M.stopPropagation(),be.removeComponent(s),ss.delete(s),rs.delete(s),Rc(s),qt===s&&(qt=null),i.remove(),Gn()}),r.append(o,a,l);const c=document.createElement("div");c.className="build-component-body",c.hidden=!0,r.addEventListener("click",()=>{c.hidden=!c.hidden,r.setAttribute("aria-expanded",String(!c.hidden)),Df(s)});const h={},u={};function d(){var D,H,k,z,$,B,ne;const M=n.geomType==="cylinder"?[parseFloat(h.r.value)||.001,parseFloat(h.l.value)||.001]:[parseFloat(h.w.value)||.001,parseFloat(h.d.value)||.001,parseFloat(h.h.value)||.001],y=((D=u.jt)==null?void 0:D.value)??"fixed";be.updateComponent(s,{x:parseFloat(h.x.value)||0,y:parseFloat(h.y.value)||0,z:parseFloat(h.z.value)||0,rx:parseFloat(h.rx.value)||0,ry:parseFloat(h.ry.value)||0,rz:parseFloat(h.rz.value)||0,dims:M,jointType:y,axis:[parseFloat((H=h.ax)==null?void 0:H.value)||0,parseFloat((k=h.ay)==null?void 0:k.value)||0,parseFloat((z=h.az)==null?void 0:z.value)||1],limitLower:parseFloat(($=h.limitMin)==null?void 0:$.value)||-1.5708,limitUpper:parseFloat((B=h.limitMax)==null?void 0:B.value)||1.5708,parent:((ne=u.parent)==null?void 0:ne.value)??"base_link"})}function f(M,y,D,H,k,z=c){const $=document.createElement("div");$.className="inspector-row";const B=document.createElement("label");B.className=y,B.textContent=D;const ne=document.createElement("input");ne.type="number",ne.step=String(H),ne.value=String(k),ne.addEventListener("input",d),wf(B,ne),h[M]=ne,$.append(B,ne),z.appendChild($)}function g(M,y=c){const D=document.createElement("div");D.className="build-group-label",D.textContent=M,y.appendChild(D)}function _(M,y,D,H=c){const k=document.createElement("div");k.className="inspector-row";const z=document.createElement("label");z.textContent=y;const $=document.createElement("select");$.className="build-select";for(const B of D){const ne=document.createElement("option");ne.value=ne.textContent=B,$.appendChild(ne)}$.addEventListener("change",d),u[M]=$,k.append(z,$),H.appendChild(k)}g("Position"),f("x","axis-x","X",.005,(t==null?void 0:t.x)??0),f("y","axis-y","Y",.005,(t==null?void 0:t.y)??0),f("z","axis-z","Z",.005,(t==null?void 0:t.z)??n.defaultZ),g("Rotation"),f("rx","axis-x","Rx",.01,(t==null?void 0:t.rx)??0),f("ry","axis-y","Ry",.01,(t==null?void 0:t.ry)??0),f("rz","axis-z","Rz",.01,(t==null?void 0:t.rz)??0),g("Size"),n.geomType==="cylinder"?(f("r","axis-x","R",.005,(t==null?void 0:t.dims[0])??n.defaultDims[0]),f("l","axis-z","L",.005,(t==null?void 0:t.dims[1])??n.defaultDims[1])):(f("w","axis-x","W",.005,(t==null?void 0:t.dims[0])??n.defaultDims[0]),f("d","axis-y","D",.005,(t==null?void 0:t.dims[1])??n.defaultDims[1]),f("h","axis-z","H",.005,(t==null?void 0:t.dims[2])??n.defaultDims[2])),g("Joint"),_("parent","Parent",be.getAvailableLinks().filter(M=>M!==s)),_("jt","Type",["fixed","continuous","revolute","prismatic"]),t!=null&&t.parent&&u.parent&&(u.parent.value=t.parent),t!=null&&t.jointType&&u.jt&&(u.jt.value=t.jointType);const p=(t==null?void 0:t.jointType)??"fixed",m=p==="revolute"||p==="prismatic",T=document.createElement("div");g("Axis",T),f("ax","axis-x","X",.1,(t==null?void 0:t.axis[0])??0,T),f("ay","axis-y","Y",.1,(t==null?void 0:t.axis[1])??0,T),f("az","axis-z","Z",.1,(t==null?void 0:t.axis[2])??1,T),T.hidden=p==="fixed",c.appendChild(T);const x=document.createElement("div");g("Limits",x),f("limitMin","axis-x","Min",.01,(t==null?void 0:t.limitLower)??-1.5708,x),f("limitMax","axis-z","Max",.01,(t==null?void 0:t.limitUpper)??1.5708,x),x.hidden=!m,c.appendChild(x);const E=document.createElement("div"),I=document.createElement("input");I.type="range",I.step="0.01",I.min=String((t==null?void 0:t.limitLower)??-1.5708),I.max=String((t==null?void 0:t.limitUpper)??1.5708),I.value="0",I.dataset.preview="true",I.style.cssText="width: 100%; margin-top: 2px;",I.addEventListener("input",()=>{var M;(M=Fe.robot)==null||M.setJointValue(`${s}_joint`,parseFloat(I.value))}),(C=h.limitMin)==null||C.addEventListener("input",()=>{I.min=h.limitMin.value}),(U=h.limitMax)==null||U.addEventListener("input",()=>{I.max=h.limitMax.value}),g("Preview",E);const N=document.createElement("div");N.className="build-preview-row",N.appendChild(I),E.appendChild(N),E.hidden=!m,c.appendChild(E),u.jt.addEventListener("change",()=>{var D;const M=u.jt.value,y=M==="revolute"||M==="prismatic";T.hidden=M==="fixed",x.hidden=!y,E.hidden=!y,y||(I.value="0",(D=Fe.robot)==null||D.setJointValue(`${s}_joint`,0))}),ss.set(s,h),u.parent&&rs.set(s,u.parent),i.append(r,c),Ii.appendChild(i)}function SM(s){const e=Ii.querySelector(`[data-id="${s}"]`);ss.delete(s),rs.delete(s),Rc(s),qt===s&&(qt=null),e==null||e.remove()}{const s={isEditorTabActive:()=>document.body.classList.contains("editor-open"),handleEditorInput:e=>hi.handleExternalInput(e),onComponentAdded:(e,t)=>{ma(e),ls(e,t,be.getComponentData(e))},onComponentRemoved:e=>SM(e),syncSlidersFromController:Wr,switchToBuildTab:()=>Te("tab-build").click(),onBriefToggle:e=>{hi.brief=e},refreshPaletteCounts:Gn};Tr=new Kb(be,s),Tr.init()}const li=new cc,ga=new _e,kl=new wn,Bl=new wn,zl=new F,Uf=new F,gr=new F;let Ci=null,gn=null,Of=0,Ff=0,kf=0,Os=0,Fs=0,ks=0,Bf=0,zf=0;function Lc(s){const e=Fe.renderer.domElement.getBoundingClientRect();ga.set((s.clientX-e.left)/e.width*2-1,-((s.clientY-e.top)/e.height)*2+1)}function Hf(s){const e=be.componentIds;let t=s;for(;t;){if(t.isURDFLink&&t.urdfName&&e.has(t.urdfName))return t.urdfName;t=t.parent}return null}Fe.renderer.domElement.addEventListener("pointerdown",s=>{if(!be.isCatalogActive)return;Lc(s),li.setFromCamera(ga,Fe.camera);const e=li.intersectObject(Fe.scene,!0);if(!e.length)return;const t=Hf(e[0].object);if(!t||!be.isFixedComponent(t))return;const n=be.getComponentXYZ(t);if(!n)return;kl.set(new F(0,1,0),-n.z),li.ray.intersectPlane(kl,zl);const i=new F;Fe.camera.getWorldDirection(i),i.y=0,i.normalize(),Bl.setFromNormalAndCoplanarPoint(i,new F(n.x,n.z,-n.y)),li.ray.intersectPlane(Bl,Uf),Ci=t,Of=n.x,Ff=n.y,kf=n.z,Os=n.z,Fs=n.x,ks=n.y,be.startComponentDrag(t),Fe.controls.enabled=!1,Bf=s.clientX,zf=s.clientY,gn=Ii.querySelector(`[data-id="${t}"]`),gn==null||gn.classList.add("dragging"),Fe.renderer.domElement.setPointerCapture(s.pointerId),s.stopPropagation()});Fe.renderer.domElement.addEventListener("pointermove",s=>{var i;if(!Ci)return;Lc(s),li.setFromCamera(ga,Fe.camera);const e=(i=Fe.robot)==null?void 0:i.joints[`${Ci}_joint`],t=ss.get(Ci),n=.001;if(Fe.renderer.domElement.style.cursor=s.shiftKey?"ns-resize":"grabbing",s.shiftKey){if(!li.ray.intersectPlane(Bl,gr))return;Os=Math.round((kf+(gr.y-Uf.y))/n)*n,e&&e.position.set(Fs,ks,Os),t&&(t.z.value=Os.toFixed(4))}else{if(!li.ray.intersectPlane(kl,gr))return;Fs=Math.round((Of+(gr.x-zl.x))/n)*n,ks=Math.round((Ff-(gr.z-zl.z))/n)*n,e&&e.position.set(Fs,ks,Os),t&&(t.x.value=Fs.toFixed(4),t.y.value=ks.toFixed(4))}});Fe.renderer.domElement.addEventListener("pointerup",s=>{if(!Ci)return;const e=Math.hypot(s.clientX-Bf,s.clientY-zf)>8;if(be.finishComponentDrag(Ci,Fs,ks,Os),Fe.controls.enabled=!0,Fe.renderer.domElement.style.cursor="",gn==null||gn.classList.remove("dragging"),!e&&gn){const t=gn.dataset.id;t&&Df(t);const n=gn.querySelector(".build-component-body");n&&(n.hidden=!1),gn.scrollIntoView({behavior:"smooth",block:"nearest"})}gn=null,Ci=null});const ji=Te("build-hover-tip");let gd=0;Fe.renderer.domElement.addEventListener("pointermove",s=>{if(!be.isCatalogActive||Ci){ji.style.display="none";return}cancelAnimationFrame(gd),gd=requestAnimationFrame(()=>{var n;Lc(s),li.setFromCamera(ga,Fe.camera);const e=li.intersectObject(Fe.scene,!0),t=e.length?Hf(e[0].object):null;if(t){const i=ci[((n=be.getComponentData(t))==null?void 0:n.type)??""];ji.textContent=i?`${i.label} #${t.split("_").pop()}`:t,ji.style.display="block",ji.style.left=s.clientX+12+"px",ji.style.top=s.clientY-28+"px"}else ji.style.display="none"})});Fe.renderer.domElement.addEventListener("pointerleave",()=>{ji.style.display="none"});function Vf(s,e){const t=Ei.find(n=>n.id===e);t&&t.factory().then(({generate:n})=>be.restoreMeshBlob(s,n())).catch(n=>console.warn("[regenMeshBlob] failed for",s,n))}const EM={Sensor:"📡",Actuator:"⚙️",MCU:"💾",Power:"🔋",Structural:"🧱"};let Hl="";function Pc(){const s=be.isCatalogActive,e=Nf.value.trim().toLowerCase();vM.hidden=s;const t=Ei.filter(n=>!(Hl&&n.category!==Hl||e&&!n.label.toLowerCase().includes(e)&&!n.description.toLowerCase().includes(e)));md.innerHTML="",xM.hidden=t.length>0;for(const n of t)md.appendChild(TM(n,s))}function TM(s,e){const t=document.createElement("div");t.className="lib-card";const n=document.createElement("div");n.className="lib-thumb",n.style.background=s.cssColor+"33",n.style.borderBottom=`2px solid ${s.cssColor}`,n.textContent=EM[s.category]??"📦";const i=document.createElement("div");i.className="lib-card-info";const r=document.createElement("div");r.className="lib-card-name",r.textContent=s.label,r.title=s.description;const o=document.createElement("div");o.className="lib-card-meta";const a=Object.assign(document.createElement("span"),{className:"lib-card-cat",textContent:s.category}),l=s.defaultDims.map(u=>Math.round(u*1e3)).join("×")+" mm",c=Object.assign(document.createElement("span"),{className:"lib-card-dims",textContent:l});o.append(a,c);const h=document.createElement("button");return h.type="button",h.className="lib-card-add",h.textContent="Add to Build",h.disabled=!e,h.addEventListener("click",()=>void wM(s,h)),i.append(r,o,h),t.append(n,i),t}async function wM(s,e){var n;if(!be.isCatalogActive)return;const t=e.textContent??"Add to Build";e.disabled=!0,e.textContent="Generating…";try{const{generate:i}=await s.factory(),r=i(),o=be.addMeshComponent(s.id,r);ma(o),ls(o,s.id,be.getComponentData(o)),Gn(),Te("tab-build").click(),(n=Ii.querySelector(`[data-id="${o}"]`))==null||n.scrollIntoView({behavior:"smooth",block:"nearest"})}catch(i){console.error("[Library] generate failed:",i),e.textContent="Error",setTimeout(()=>{e.textContent=t,e.disabled=!be.isCatalogActive},2e3);return}e.textContent=t,e.disabled=!1}Nf.addEventListener("input",Pc);for(const s of pd.querySelectorAll(".lib-pill"))s.addEventListener("click",()=>{for(const e of pd.querySelectorAll(".lib-pill"))e.classList.remove("lib-pill--active");s.classList.add("lib-pill--active"),Hl=s.dataset.cat??"",Pc()});export{Zs as B,ec as C,cc as R,Pu as S,F as V,_e as a,Gb as g,AM as m};
