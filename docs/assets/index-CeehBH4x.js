(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const bp="modulepreload",Ep=function(s){return"/"+s},rh={},Cn=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){let o=function(c){return Promise.all(c.map(h=>Promise.resolve(h).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));i=o(t.map(c=>{if(c=Ep(c),c in rh)return;rh[c]=!0;const h=c.endsWith(".css"),u=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${u}`))return;const d=document.createElement("link");if(d.rel=h?"stylesheet":bp,h||(d.as="script"),d.crossOrigin="",d.href=c,l&&d.setAttribute("nonce",l),document.head.appendChild(d),h)return new Promise((f,g)=>{d.addEventListener("load",f),d.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})};/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const cc="164",hi={ROTATE:0,DOLLY:1,PAN:2},gs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Mp=0,oh=1,Sp=2,jd=1,Xd=2,li=3,qn=0,hn=1,vn=2,Li=0,Gs=1,ah=2,lh=3,ch=4,wp=5,Qi=100,Tp=101,Ap=102,Cp=103,Rp=104,Lp=200,Pp=201,Np=202,Ip=203,zl=204,Hl=205,Dp=206,Up=207,Op=208,Fp=209,kp=210,Bp=211,zp=212,Hp=213,Vp=214,Gp=0,Wp=1,jp=2,ta=3,Xp=4,qp=5,$p=6,Yp=7,fa=0,Kp=1,Jp=2,Pi=0,Zp=1,Qp=2,em=3,tm=4,nm=5,im=6,sm=7,hh="attached",rm="detached",qd=300,$s=301,Ys=302,Vl=303,Gl=304,pa=306,Wn=1e3,bn=1001,na=1002,rn=1003,$d=1004,wr=1005,Zt=1006,Ko=1007,In=1008,Ui=1009,om=1010,am=1011,Yd=1012,Kd=1013,Ks=1014,jn=1015,ma=1016,Jd=1017,Zd=1018,$r=1020,lm=35902,cm=1021,hm=1022,Dn=1023,um=1024,dm=1025,Ws=1026,kr=1027,Qd=1028,ef=1029,fm=1030,tf=1031,nf=1033,Ua=33776,Oa=33777,Fa=33778,ka=33779,uh=35840,dh=35841,fh=35842,ph=35843,mh=36196,gh=37492,_h=37496,yh=37808,vh=37809,xh=37810,bh=37811,Eh=37812,Mh=37813,Sh=37814,wh=37815,Th=37816,Ah=37817,Ch=37818,Rh=37819,Lh=37820,Ph=37821,Ba=36492,Nh=36494,Ih=36495,pm=36283,Dh=36284,Uh=36285,Oh=36286,Br=2300,Js=2301,za=2302,Fh=2400,kh=2401,Bh=2402,mm=2500,gm=0,sf=1,Wl=2,_m=3200,ym=3201,ga=0,vm=1,Ai="",Ot="srgb",Yt="srgb-linear",hc="display-p3",_a="display-p3-linear",ia="linear",Rt="srgb",sa="rec709",ra="p3",_s=7680,zh=519,xm=512,bm=513,Em=514,rf=515,Mm=516,Sm=517,wm=518,Tm=519,jl=35044,Hh="300 es",fi=2e3,oa=2001;class hs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}}const Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Vh=1234567;const Ar=Math.PI/180,Zs=180/Math.PI;function En(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Kt[s&255]+Kt[s>>8&255]+Kt[s>>16&255]+Kt[s>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[t&63|128]+Kt[t>>8&255]+"-"+Kt[t>>16&255]+Kt[t>>24&255]+Kt[n&255]+Kt[n>>8&255]+Kt[n>>16&255]+Kt[n>>24&255]).toLowerCase()}function Ht(s,e,t){return Math.max(e,Math.min(t,s))}function uc(s,e){return(s%e+e)%e}function Am(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Cm(s,e,t){return s!==e?(t-s)/(e-s):0}function Cr(s,e,t){return(1-t)*s+t*e}function Rm(s,e,t,n){return Cr(s,e,1-Math.exp(-t*n))}function Lm(s,e=1){return e-Math.abs(uc(s,e*2)-e)}function Pm(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Nm(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Im(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Dm(s,e){return s+Math.random()*(e-s)}function Um(s){return s*(.5-Math.random())}function Om(s){s!==void 0&&(Vh=s);let e=Vh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Fm(s){return s*Ar}function km(s){return s*Zs}function Bm(s){return(s&s-1)===0&&s!==0}function zm(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Hm(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Vm(s,e,t,n,i){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":s.set(a*h,l*u,l*d,a*c);break;case"YZY":s.set(l*d,a*h,l*u,a*c);break;case"ZXZ":s.set(l*u,l*d,a*h,a*c);break;case"XZX":s.set(a*h,l*g,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*g,a*c);break;case"ZYZ":s.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Nn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Et(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const es={DEG2RAD:Ar,RAD2DEG:Zs,generateUUID:En,clamp:Ht,euclideanModulo:uc,mapLinear:Am,inverseLerp:Cm,lerp:Cr,damp:Rm,pingpong:Lm,smoothstep:Pm,smootherstep:Nm,randInt:Im,randFloat:Dm,randFloatSpread:Um,seededRandom:Om,degToRad:Fm,radToDeg:km,isPowerOfTwo:Bm,ceilPowerOfTwo:zm,floorPowerOfTwo:Hm,setQuaternionFromProperEuler:Vm,normalize:Et,denormalize:Nn};class ye{constructor(e=0,t=0){ye.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ut{constructor(e,t,n,i,r,o,a,l,c){ut.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=i[0],p=i[3],m=i[6],w=i[1],v=i[4],S=i[7],I=i[2],P=i[5],C=i[8];return r[0]=o*_+a*w+l*I,r[3]=o*p+a*v+l*P,r[6]=o*m+a*S+l*C,r[1]=c*_+h*w+u*I,r[4]=c*p+h*v+u*P,r[7]=c*m+h*S+u*C,r[2]=d*_+f*w+g*I,r[5]=d*p+f*v+g*P,r[8]=d*m+f*S+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,g=t*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(i*c-h*n)*_,e[2]=(a*n-i*o)*_,e[3]=d*_,e[4]=(h*t-i*l)*_,e[5]=(i*r-a*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Ha.makeScale(e,t)),this}rotate(e){return this.premultiply(Ha.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ha.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ha=new ut;function of(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function zr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Gm(){const s=zr("canvas");return s.style.display="block",s}const Gh={};function af(s){s in Gh||(Gh[s]=!0,console.warn(s))}const Wh=new ut().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),jh=new ut().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),lo={[Yt]:{transfer:ia,primaries:sa,toReference:s=>s,fromReference:s=>s},[Ot]:{transfer:Rt,primaries:sa,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[_a]:{transfer:ia,primaries:ra,toReference:s=>s.applyMatrix3(jh),fromReference:s=>s.applyMatrix3(Wh)},[hc]:{transfer:Rt,primaries:ra,toReference:s=>s.convertSRGBToLinear().applyMatrix3(jh),fromReference:s=>s.applyMatrix3(Wh).convertLinearToSRGB()}},Wm=new Set([Yt,_a]),xt={enabled:!0,_workingColorSpace:Yt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Wm.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const n=lo[e].toReference,i=lo[t].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return lo[s].primaries},getTransfer:function(s){return s===Ai?ia:lo[s].transfer}};function js(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Va(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ys;class jm{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ys===void 0&&(ys=zr("canvas")),ys.width=e.width,ys.height=e.height;const n=ys.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ys}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=zr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=js(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(js(t[n]/255)*255):t[n]=js(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Xm=0;class lf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Xm++}),this.uuid=En(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Ga(i[o].image)):r.push(Ga(i[o]))}else r=Ga(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function Ga(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?jm.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let qm=0;class Vt extends hs{constructor(e=Vt.DEFAULT_IMAGE,t=Vt.DEFAULT_MAPPING,n=bn,i=bn,r=Zt,o=In,a=Dn,l=Ui,c=Vt.DEFAULT_ANISOTROPY,h=Ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qm++}),this.uuid=En(),this.name="",this.source=new lf(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ye(0,0),this.repeat=new ye(1,1),this.center=new ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==qd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Wn:e.x=e.x-Math.floor(e.x);break;case bn:e.x=e.x<0?0:1;break;case na:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Wn:e.y=e.y-Math.floor(e.y);break;case bn:e.y=e.y<0?0:1;break;case na:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Vt.DEFAULT_IMAGE=null;Vt.DEFAULT_MAPPING=qd;Vt.DEFAULT_ANISOTROPY=1;class Tt{constructor(e=0,t=0,n=0,i=1){Tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],_=l[2],p=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,S=(f+1)/2,I=(m+1)/2,P=(h+d)/4,C=(u+_)/4,D=(g+p)/4;return v>S&&v>I?v<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(v),i=P/n,r=C/n):S>I?S<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(S),n=P/i,r=D/i):I<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(I),n=C/r,i=D/r),this.set(n,i,r,t),this}let w=Math.sqrt((p-g)*(p-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(w)<.001&&(w=1),this.x=(p-g)/w,this.y=(u-_)/w,this.z=(d-h)/w,this.w=Math.acos((c+f+m-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class $m extends hs{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Zt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Vt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new lf(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class os extends $m{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class cf extends Vt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=rn,this.minFilter=rn,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ym extends Vt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=rn,this.minFilter=rn,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class pn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=r[o+0],f=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==d||c!==f||h!==g){let p=1-a;const m=l*d+c*f+h*g+u*_,w=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){const I=Math.sqrt(v),P=Math.atan2(I,m*w);p=Math.sin(p*P)/I,a=Math.sin(a*P)/I}const S=a*w;if(l=l*p+d*S,c=c*p+f*S,h=h*p+g*S,u=u*p+_*S,p===1-a){const I=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=I,c*=I,h*=I,u*=I}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-a*f,e[t+2]=c*g+h*f+a*d-l*u,e[t+3]=h*g-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),d=l(n/2),f=l(i/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ht(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class k{constructor(e=0,t=0,n=0){k.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Xh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Xh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),h=2*(a*t-r*i),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Wa.copy(this).projectOnVector(e),this.sub(Wa)}reflect(e){return this.sub(Wa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Wa=new k,Xh=new pn;class Yn{constructor(e=new k(1/0,1/0,1/0),t=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(wn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(wn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=wn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,wn):wn.fromBufferAttribute(r,o),wn.applyMatrix4(e.matrixWorld),this.expandByPoint(wn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),co.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),co.copy(n.boundingBox)),co.applyMatrix4(e.matrixWorld),this.union(co)}const i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,wn),wn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(fr),ho.subVectors(this.max,fr),vs.subVectors(e.a,fr),xs.subVectors(e.b,fr),bs.subVectors(e.c,fr),_i.subVectors(xs,vs),yi.subVectors(bs,xs),Gi.subVectors(vs,bs);let t=[0,-_i.z,_i.y,0,-yi.z,yi.y,0,-Gi.z,Gi.y,_i.z,0,-_i.x,yi.z,0,-yi.x,Gi.z,0,-Gi.x,-_i.y,_i.x,0,-yi.y,yi.x,0,-Gi.y,Gi.x,0];return!ja(t,vs,xs,bs,ho)||(t=[1,0,0,0,1,0,0,0,1],!ja(t,vs,xs,bs,ho))?!1:(uo.crossVectors(_i,yi),t=[uo.x,uo.y,uo.z],ja(t,vs,xs,bs,ho))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,wn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(wn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ni[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ni[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ni[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ni[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ni[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ni[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ni[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ni[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ni),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ni=[new k,new k,new k,new k,new k,new k,new k,new k],wn=new k,co=new Yn,vs=new k,xs=new k,bs=new k,_i=new k,yi=new k,Gi=new k,fr=new k,ho=new k,uo=new k,Wi=new k;function ja(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){Wi.fromArray(s,r);const a=i.x*Math.abs(Wi.x)+i.y*Math.abs(Wi.y)+i.z*Math.abs(Wi.z),l=e.dot(Wi),c=t.dot(Wi),h=n.dot(Wi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Km=new Yn,pr=new k,Xa=new k;class Fn{constructor(e=new k,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Km.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;pr.subVectors(e,this.center);const t=pr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(pr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Xa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(pr.copy(e.center).add(Xa)),this.expandByPoint(pr.copy(e.center).sub(Xa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ii=new k,qa=new k,fo=new k,vi=new k,$a=new k,po=new k,Ya=new k;class sr{constructor(e=new k,t=new k(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ii)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ii.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ii.copy(this.origin).addScaledVector(this.direction,t),ii.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){qa.copy(e).add(t).multiplyScalar(.5),fo.copy(t).sub(e).normalize(),vi.copy(this.origin).sub(qa);const r=e.distanceTo(t)*.5,o=-this.direction.dot(fo),a=vi.dot(this.direction),l=-vi.dot(fo),c=vi.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(qa).addScaledVector(fo,d),f}intersectSphere(e,t){ii.subVectors(e.center,this.origin);const n=ii.dot(this.direction),i=ii.dot(ii)-n*n,r=e.radius*e.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,ii)!==null}intersectTriangle(e,t,n,i,r){$a.subVectors(t,e),po.subVectors(n,e),Ya.crossVectors($a,po);let o=this.direction.dot(Ya),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;vi.subVectors(this.origin,e);const l=a*this.direction.dot(po.crossVectors(vi,po));if(l<0)return null;const c=a*this.direction.dot($a.cross(vi));if(c<0||l+c>o)return null;const h=-a*vi.dot(Ya);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class $e{constructor(e,t,n,i,r,o,a,l,c,h,u,d,f,g,_,p){$e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,h,u,d,f,g,_,p)}set(e,t,n,i,r,o,a,l,c,h,u,d,f,g,_,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new $e().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Es.setFromMatrixColumn(e,0).length(),r=1/Es.setFromMatrixColumn(e,1).length(),o=1/Es.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=o*h,f=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-_*c,t[9]=-a*l,t[2]=_-d*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d+_*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=_+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d-_*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*h,f=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,f=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=o*l,f=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Jm,e,Zm)}lookAt(e,t,n){const i=this.elements;return un.subVectors(e,t),un.lengthSq()===0&&(un.z=1),un.normalize(),xi.crossVectors(n,un),xi.lengthSq()===0&&(Math.abs(n.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),xi.crossVectors(n,un)),xi.normalize(),mo.crossVectors(un,xi),i[0]=xi.x,i[4]=mo.x,i[8]=un.x,i[1]=xi.y,i[5]=mo.y,i[9]=un.y,i[2]=xi.z,i[6]=mo.z,i[10]=un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],p=n[10],m=n[14],w=n[3],v=n[7],S=n[11],I=n[15],P=i[0],C=i[4],D=i[8],E=i[12],y=i[1],U=i[5],z=i[9],F=i[13],H=i[2],Z=i[6],B=i[10],he=i[14],G=i[3],se=i[7],ae=i[11],me=i[15];return r[0]=o*P+a*y+l*H+c*G,r[4]=o*C+a*U+l*Z+c*se,r[8]=o*D+a*z+l*B+c*ae,r[12]=o*E+a*F+l*he+c*me,r[1]=h*P+u*y+d*H+f*G,r[5]=h*C+u*U+d*Z+f*se,r[9]=h*D+u*z+d*B+f*ae,r[13]=h*E+u*F+d*he+f*me,r[2]=g*P+_*y+p*H+m*G,r[6]=g*C+_*U+p*Z+m*se,r[10]=g*D+_*z+p*B+m*ae,r[14]=g*E+_*F+p*he+m*me,r[3]=w*P+v*y+S*H+I*G,r[7]=w*C+v*U+S*Z+I*se,r[11]=w*D+v*z+S*B+I*ae,r[15]=w*E+v*F+S*he+I*me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],p=e[11],m=e[15];return g*(+r*l*u-i*c*u-r*a*d+n*c*d+i*a*f-n*l*f)+_*(+t*l*f-t*c*d+r*o*d-i*o*f+i*c*h-r*l*h)+p*(+t*c*u-t*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+m*(-i*a*h-t*l*u+t*a*d+i*o*u-n*o*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],p=e[14],m=e[15],w=u*p*c-_*d*c+_*l*f-a*p*f-u*l*m+a*d*m,v=g*d*c-h*p*c-g*l*f+o*p*f+h*l*m-o*d*m,S=h*_*c-g*u*c+g*a*f-o*_*f-h*a*m+o*u*m,I=g*u*l-h*_*l-g*a*d+o*_*d+h*a*p-o*u*p,P=t*w+n*v+i*S+r*I;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/P;return e[0]=w*C,e[1]=(_*d*r-u*p*r-_*i*f+n*p*f+u*i*m-n*d*m)*C,e[2]=(a*p*r-_*l*r+_*i*c-n*p*c-a*i*m+n*l*m)*C,e[3]=(u*l*r-a*d*r-u*i*c+n*d*c+a*i*f-n*l*f)*C,e[4]=v*C,e[5]=(h*p*r-g*d*r+g*i*f-t*p*f-h*i*m+t*d*m)*C,e[6]=(g*l*r-o*p*r-g*i*c+t*p*c+o*i*m-t*l*m)*C,e[7]=(o*d*r-h*l*r+h*i*c-t*d*c-o*i*f+t*l*f)*C,e[8]=S*C,e[9]=(g*u*r-h*_*r-g*n*f+t*_*f+h*n*m-t*u*m)*C,e[10]=(o*_*r-g*a*r+g*n*c-t*_*c-o*n*m+t*a*m)*C,e[11]=(h*a*r-o*u*r-h*n*c+t*u*c+o*n*f-t*a*f)*C,e[12]=I*C,e[13]=(h*_*i-g*u*i+g*n*d-t*_*d-h*n*p+t*u*p)*C,e[14]=(g*a*i-o*_*i-g*n*l+t*_*l+o*n*p-t*a*p)*C,e[15]=(o*u*i-h*a*i+h*n*l-t*u*l-o*n*d+t*a*d)*C,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,g=r*u,_=o*h,p=o*u,m=a*u,w=l*c,v=l*h,S=l*u,I=n.x,P=n.y,C=n.z;return i[0]=(1-(_+m))*I,i[1]=(f+S)*I,i[2]=(g-v)*I,i[3]=0,i[4]=(f-S)*P,i[5]=(1-(d+m))*P,i[6]=(p+w)*P,i[7]=0,i[8]=(g+v)*C,i[9]=(p-w)*C,i[10]=(1-(d+_))*C,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=Es.set(i[0],i[1],i[2]).length();const o=Es.set(i[4],i[5],i[6]).length(),a=Es.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],Tn.copy(this);const c=1/r,h=1/o,u=1/a;return Tn.elements[0]*=c,Tn.elements[1]*=c,Tn.elements[2]*=c,Tn.elements[4]*=h,Tn.elements[5]*=h,Tn.elements[6]*=h,Tn.elements[8]*=u,Tn.elements[9]*=u,Tn.elements[10]*=u,t.setFromRotationMatrix(Tn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=fi){const l=this.elements,c=2*r/(t-e),h=2*r/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i);let f,g;if(a===fi)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===oa)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=fi){const l=this.elements,c=1/(t-e),h=1/(n-i),u=1/(o-r),d=(t+e)*c,f=(n+i)*h;let g,_;if(a===fi)g=(o+r)*u,_=-2*u;else if(a===oa)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Es=new k,Tn=new $e,Jm=new k(0,0,0),Zm=new k(1,1,1),xi=new k,mo=new k,un=new k,qh=new $e,$h=new pn;class on{constructor(e=0,t=0,n=0,i=on.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ht(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ht(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ht(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ht(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return qh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(qh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return $h.setFromEuler(this),this.setFromQuaternion($h,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}on.DEFAULT_ORDER="XYZ";class dc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Qm=0;const Yh=new k,Ms=new pn,si=new $e,go=new k,mr=new k,eg=new k,tg=new pn,Kh=new k(1,0,0),Jh=new k(0,1,0),Zh=new k(0,0,1),Qh={type:"added"},ng={type:"removed"},Ss={type:"childadded",child:null},Ka={type:"childremoved",child:null};class At extends hs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qm++}),this.uuid=En(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=At.DEFAULT_UP.clone();const e=new k,t=new on,n=new pn,i=new k(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new $e},normalMatrix:{value:new ut}}),this.matrix=new $e,this.matrixWorld=new $e,this.matrixAutoUpdate=At.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new dc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ms.setFromAxisAngle(e,t),this.quaternion.multiply(Ms),this}rotateOnWorldAxis(e,t){return Ms.setFromAxisAngle(e,t),this.quaternion.premultiply(Ms),this}rotateX(e){return this.rotateOnAxis(Kh,e)}rotateY(e){return this.rotateOnAxis(Jh,e)}rotateZ(e){return this.rotateOnAxis(Zh,e)}translateOnAxis(e,t){return Yh.copy(e).applyQuaternion(this.quaternion),this.position.add(Yh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Kh,e)}translateY(e){return this.translateOnAxis(Jh,e)}translateZ(e){return this.translateOnAxis(Zh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(si.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?go.copy(e):go.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),mr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?si.lookAt(mr,go,this.up):si.lookAt(go,mr,this.up),this.quaternion.setFromRotationMatrix(si),i&&(si.extractRotation(i.matrixWorld),Ms.setFromRotationMatrix(si),this.quaternion.premultiply(Ms.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Qh),Ss.child=e,this.dispatchEvent(Ss),Ss.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ng),Ka.child=e,this.dispatchEvent(Ka),Ka.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),si.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),si.multiply(e.parent.matrixWorld)),e.applyMatrix4(si),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Qh),Ss.child=e,this.dispatchEvent(Ss),Ss.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mr,e,eg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mr,tg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++){const a=i[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}At.DEFAULT_UP=new k(0,1,0);At.DEFAULT_MATRIX_AUTO_UPDATE=!0;At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const An=new k,ri=new k,Ja=new k,oi=new k,ws=new k,Ts=new k,eu=new k,Za=new k,Qa=new k,el=new k;class Gn{constructor(e=new k,t=new k,n=new k){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),An.subVectors(e,t),i.cross(An);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){An.subVectors(i,t),ri.subVectors(n,t),Ja.subVectors(e,t);const o=An.dot(An),a=An.dot(ri),l=An.dot(Ja),c=ri.dot(ri),h=ri.dot(Ja),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,oi)===null?!1:oi.x>=0&&oi.y>=0&&oi.x+oi.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,oi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,oi.x),l.addScaledVector(o,oi.y),l.addScaledVector(a,oi.z),l)}static isFrontFacing(e,t,n,i){return An.subVectors(n,t),ri.subVectors(e,t),An.cross(ri).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return An.subVectors(this.c,this.b),ri.subVectors(this.a,this.b),An.cross(ri).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Gn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Gn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return Gn.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return Gn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Gn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let o,a;ws.subVectors(i,n),Ts.subVectors(r,n),Za.subVectors(e,n);const l=ws.dot(Za),c=Ts.dot(Za);if(l<=0&&c<=0)return t.copy(n);Qa.subVectors(e,i);const h=ws.dot(Qa),u=Ts.dot(Qa);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(ws,o);el.subVectors(e,r);const f=ws.dot(el),g=Ts.dot(el);if(g>=0&&f<=g)return t.copy(r);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(Ts,a);const p=h*g-f*u;if(p<=0&&u-h>=0&&f-g>=0)return eu.subVectors(r,i),a=(u-h)/(u-h+(f-g)),t.copy(i).addScaledVector(eu,a);const m=1/(p+_+d);return o=_*m,a=d*m,t.copy(n).addScaledVector(ws,o).addScaledVector(Ts,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const hf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},bi={h:0,s:0,l:0},_o={h:0,s:0,l:0};function tl(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Xe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ot){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,xt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=xt.workingColorSpace){return this.r=e,this.g=t,this.b=n,xt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=xt.workingColorSpace){if(e=uc(e,1),t=Ht(t,0,1),n=Ht(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=tl(o,r,e+1/3),this.g=tl(o,r,e),this.b=tl(o,r,e-1/3)}return xt.toWorkingColorSpace(this,i),this}setStyle(e,t=Ot){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ot){const n=hf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=js(e.r),this.g=js(e.g),this.b=js(e.b),this}copyLinearToSRGB(e){return this.r=Va(e.r),this.g=Va(e.g),this.b=Va(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ot){return xt.fromWorkingColorSpace(Jt.copy(this),e),Math.round(Ht(Jt.r*255,0,255))*65536+Math.round(Ht(Jt.g*255,0,255))*256+Math.round(Ht(Jt.b*255,0,255))}getHexString(e=Ot){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=xt.workingColorSpace){xt.fromWorkingColorSpace(Jt.copy(this),t);const n=Jt.r,i=Jt.g,r=Jt.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=xt.workingColorSpace){return xt.fromWorkingColorSpace(Jt.copy(this),t),e.r=Jt.r,e.g=Jt.g,e.b=Jt.b,e}getStyle(e=Ot){xt.fromWorkingColorSpace(Jt.copy(this),e);const t=Jt.r,n=Jt.g,i=Jt.b;return e!==Ot?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(bi),this.setHSL(bi.h+e,bi.s+t,bi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(bi),e.getHSL(_o);const n=Cr(bi.h,_o.h,t),i=Cr(bi.s,_o.s,t),r=Cr(bi.l,_o.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Jt=new Xe;Xe.NAMES=hf;let ig=0;class fn extends hs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ig++}),this.uuid=En(),this.name="",this.type="Material",this.blending=Gs,this.side=qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=zl,this.blendDst=Hl,this.blendEquation=Qi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xe(0,0,0),this.blendAlpha=0,this.depthFunc=ta,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_s,this.stencilZFail=_s,this.stencilZPass=_s,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Gs&&(n.blending=this.blending),this.side!==qn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==zl&&(n.blendSrc=this.blendSrc),this.blendDst!==Hl&&(n.blendDst=this.blendDst),this.blendEquation!==Qi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ta&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==zh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==_s&&(n.stencilFail=this.stencilFail),this.stencilZFail!==_s&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==_s&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Xn extends fn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=fa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ft=new k,yo=new ye;class It{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=jl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=jn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return af("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)yo.fromBufferAttribute(this,t),yo.applyMatrix3(e),this.setXY(t,yo.x,yo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix3(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Nn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Et(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Nn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Et(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Nn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Et(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Nn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Et(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Nn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Et(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Et(t,this.array),n=Et(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Et(t,this.array),n=Et(n,this.array),i=Et(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Et(t,this.array),n=Et(n,this.array),i=Et(i,this.array),r=Et(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==jl&&(e.usage=this.usage),e}}class uf extends It{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class df extends It{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class wt extends It{constructor(e,t,n){super(new Float32Array(e),t,n)}}let sg=0;const mn=new $e,nl=new At,As=new k,dn=new Yn,gr=new Yn,Xt=new k;class qt extends hs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sg++}),this.uuid=En(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(of(e)?df:uf)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ut().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return mn.makeRotationFromQuaternion(e),this.applyMatrix4(mn),this}rotateX(e){return mn.makeRotationX(e),this.applyMatrix4(mn),this}rotateY(e){return mn.makeRotationY(e),this.applyMatrix4(mn),this}rotateZ(e){return mn.makeRotationZ(e),this.applyMatrix4(mn),this}translate(e,t,n){return mn.makeTranslation(e,t,n),this.applyMatrix4(mn),this}scale(e,t,n){return mn.makeScale(e,t,n),this.applyMatrix4(mn),this}lookAt(e){return nl.lookAt(e),nl.updateMatrix(),this.applyMatrix4(nl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(As).negate(),this.translate(As.x,As.y,As.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new wt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];dn.setFromBufferAttribute(r),this.morphTargetsRelative?(Xt.addVectors(this.boundingBox.min,dn.min),this.boundingBox.expandByPoint(Xt),Xt.addVectors(this.boundingBox.max,dn.max),this.boundingBox.expandByPoint(Xt)):(this.boundingBox.expandByPoint(dn.min),this.boundingBox.expandByPoint(dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(e){const n=this.boundingSphere.center;if(dn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];gr.setFromBufferAttribute(a),this.morphTargetsRelative?(Xt.addVectors(dn.min,gr.min),dn.expandByPoint(Xt),Xt.addVectors(dn.max,gr.max),dn.expandByPoint(Xt)):(dn.expandByPoint(gr.min),dn.expandByPoint(gr.max))}dn.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)Xt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Xt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Xt.fromBufferAttribute(a,c),l&&(As.fromBufferAttribute(e,c),Xt.add(As)),i=Math.max(i,n.distanceToSquared(Xt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new It(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let D=0;D<n.count;D++)a[D]=new k,l[D]=new k;const c=new k,h=new k,u=new k,d=new ye,f=new ye,g=new ye,_=new k,p=new k;function m(D,E,y){c.fromBufferAttribute(n,D),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,y),d.fromBufferAttribute(r,D),f.fromBufferAttribute(r,E),g.fromBufferAttribute(r,y),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const U=1/(f.x*g.y-g.x*f.y);isFinite(U)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(U),p.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(U),a[D].add(_),a[E].add(_),a[y].add(_),l[D].add(p),l[E].add(p),l[y].add(p))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let D=0,E=w.length;D<E;++D){const y=w[D],U=y.start,z=y.count;for(let F=U,H=U+z;F<H;F+=3)m(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const v=new k,S=new k,I=new k,P=new k;function C(D){I.fromBufferAttribute(i,D),P.copy(I);const E=a[D];v.copy(E),v.sub(I.multiplyScalar(I.dot(E))).normalize(),S.crossVectors(P,E);const U=S.dot(l[D])<0?-1:1;o.setXYZW(D,v.x,v.y,v.z,U)}for(let D=0,E=w.length;D<E;++D){const y=w[D],U=y.start,z=y.count;for(let F=U,H=U+z;F<H;F+=3)C(e.getX(F+0)),C(e.getX(F+1)),C(e.getX(F+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new It(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new k,r=new k,o=new k,a=new k,l=new k,c=new k,h=new k,u=new k;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),p=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,p),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Xt.fromBufferAttribute(e,t),Xt.normalize(),e.setXYZ(t,Xt.x,Xt.y,Xt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let _=0,p=l.length;_<p;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let m=0;m<h;m++)d[g++]=c[f++]}return new It(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new qt,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const tu=new $e,ji=new sr,vo=new Fn,nu=new k,Cs=new k,Rs=new k,Ls=new k,il=new k,xo=new k,bo=new ye,Eo=new ye,Mo=new ye,iu=new k,su=new k,ru=new k,So=new k,wo=new k;class Bt extends At{constructor(e=new qt,t=new Xn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(r&&a){xo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(il.fromBufferAttribute(u,e),o?xo.addScaledVector(il,h):xo.addScaledVector(il.sub(t),h))}t.add(xo)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),vo.copy(n.boundingSphere),vo.applyMatrix4(r),ji.copy(e.ray).recast(e.near),!(vo.containsPoint(ji.origin)===!1&&(ji.intersectSphere(vo,nu)===null||ji.origin.distanceToSquared(nu)>(e.far-e.near)**2))&&(tu.copy(r).invert(),ji.copy(e.ray).applyMatrix4(tu),!(n.boundingBox!==null&&ji.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ji)))}_computeIntersections(e,t,n){let i;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const p=d[g],m=o[p.materialIndex],w=Math.max(p.start,f.start),v=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let S=w,I=v;S<I;S+=3){const P=a.getX(S),C=a.getX(S+1),D=a.getX(S+2);i=To(this,m,e,n,c,h,u,P,C,D),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const w=a.getX(p),v=a.getX(p+1),S=a.getX(p+2);i=To(this,o,e,n,c,h,u,w,v,S),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const p=d[g],m=o[p.materialIndex],w=Math.max(p.start,f.start),v=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let S=w,I=v;S<I;S+=3){const P=S,C=S+1,D=S+2;i=To(this,m,e,n,c,h,u,P,C,D),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const w=p,v=p+1,S=p+2;i=To(this,o,e,n,c,h,u,w,v,S),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}}function rg(s,e,t,n,i,r,o,a){let l;if(e.side===hn?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===qn,a),l===null)return null;wo.copy(a),wo.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(wo);return c<t.near||c>t.far?null:{distance:c,point:wo.clone(),object:s}}function To(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,Cs),s.getVertexPosition(l,Rs),s.getVertexPosition(c,Ls);const h=rg(s,e,t,n,Cs,Rs,Ls,So);if(h){i&&(bo.fromBufferAttribute(i,a),Eo.fromBufferAttribute(i,l),Mo.fromBufferAttribute(i,c),h.uv=Gn.getInterpolation(So,Cs,Rs,Ls,bo,Eo,Mo,new ye)),r&&(bo.fromBufferAttribute(r,a),Eo.fromBufferAttribute(r,l),Mo.fromBufferAttribute(r,c),h.uv1=Gn.getInterpolation(So,Cs,Rs,Ls,bo,Eo,Mo,new ye)),o&&(iu.fromBufferAttribute(o,a),su.fromBufferAttribute(o,l),ru.fromBufferAttribute(o,c),h.normal=Gn.getInterpolation(So,Cs,Rs,Ls,iu,su,ru,new k),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new k,materialIndex:0};Gn.getNormal(Cs,Rs,Ls,u.normal),h.face=u}return h}class rr extends qt{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new wt(c,3)),this.setAttribute("normal",new wt(h,3)),this.setAttribute("uv",new wt(u,2));function g(_,p,m,w,v,S,I,P,C,D,E){const y=S/C,U=I/D,z=S/2,F=I/2,H=P/2,Z=C+1,B=D+1;let he=0,G=0;const se=new k;for(let ae=0;ae<B;ae++){const me=ae*U-F;for(let Le=0;Le<Z;Le++){const Ae=Le*y-z;se[_]=Ae*w,se[p]=me*v,se[m]=H,c.push(se.x,se.y,se.z),se[_]=0,se[p]=0,se[m]=P>0?1:-1,h.push(se.x,se.y,se.z),u.push(Le/C),u.push(1-ae/D),he+=1}}for(let ae=0;ae<D;ae++)for(let me=0;me<C;me++){const Le=d+me+Z*ae,Ae=d+me+Z*(ae+1),W=d+(me+1)+Z*(ae+1),ee=d+(me+1)+Z*ae;l.push(Le,Ae,ee),l.push(Ae,W,ee),G+=6}a.addGroup(f,G,E),f+=G,d+=he}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Qs(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function nn(s){const e={};for(let t=0;t<s.length;t++){const n=Qs(s[t]);for(const i in n)e[i]=n[i]}return e}function og(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function ff(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:xt.workingColorSpace}const ag={clone:Qs,merge:nn};var lg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Oi extends fn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=lg,this.fragmentShader=cg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Qs(e.uniforms),this.uniformsGroups=og(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class pf extends At{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new $e,this.projectionMatrix=new $e,this.projectionMatrixInverse=new $e,this.coordinateSystem=fi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ei=new k,ou=new ye,au=new ye;class $t extends pf{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Zs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ar*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Zs*2*Math.atan(Math.tan(Ar*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ei.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ei.x,Ei.y).multiplyScalar(-e/Ei.z),Ei.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ei.x,Ei.y).multiplyScalar(-e/Ei.z)}getViewSize(e,t){return this.getViewBounds(e,ou,au),t.subVectors(au,ou)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ar*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ps=-90,Ns=1;class hg extends At{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new $t(Ps,Ns,e,t);i.layers=this.layers,this.add(i);const r=new $t(Ps,Ns,e,t);r.layers=this.layers,this.add(r);const o=new $t(Ps,Ns,e,t);o.layers=this.layers,this.add(o);const a=new $t(Ps,Ns,e,t);a.layers=this.layers,this.add(a);const l=new $t(Ps,Ns,e,t);l.layers=this.layers,this.add(l);const c=new $t(Ps,Ns,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===fi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===oa)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class mf extends Vt{constructor(e,t,n,i,r,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:$s,super(e,t,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ug extends os{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new mf(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Zt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new rr(5,5,5),r=new Oi({name:"CubemapFromEquirect",uniforms:Qs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:hn,blending:Li});r.uniforms.tEquirect.value=t;const o=new Bt(i,r),a=t.minFilter;return t.minFilter===In&&(t.minFilter=Zt),new hg(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}}const sl=new k,dg=new k,fg=new ut;class Ln{constructor(e=new k(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=sl.subVectors(n,t).cross(dg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(sl),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||fg.getNormalMatrix(e),i=this.coplanarPoint(sl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Xi=new Fn,Ao=new k;class fc{constructor(e=new Ln,t=new Ln,n=new Ln,i=new Ln,r=new Ln,o=new Ln){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=fi){const n=this.planes,i=e.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],g=i[9],_=i[10],p=i[11],m=i[12],w=i[13],v=i[14],S=i[15];if(n[0].setComponents(l-r,d-c,p-f,S-m).normalize(),n[1].setComponents(l+r,d+c,p+f,S+m).normalize(),n[2].setComponents(l+o,d+h,p+g,S+w).normalize(),n[3].setComponents(l-o,d-h,p-g,S-w).normalize(),n[4].setComponents(l-a,d-u,p-_,S-v).normalize(),t===fi)n[5].setComponents(l+a,d+u,p+_,S+v).normalize();else if(t===oa)n[5].setComponents(a,u,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Xi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Xi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Xi)}intersectsSprite(e){return Xi.center.set(0,0,0),Xi.radius=.7071067811865476,Xi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Xi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Ao.x=i.normal.x>0?e.max.x:e.min.x,Ao.y=i.normal.y>0?e.max.y:e.min.y,Ao.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ao)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function gf(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function pg(s){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l._updateRange,d=l.updateRanges;if(s.bindBuffer(c,a),u.count===-1&&d.length===0&&s.bufferSubData(c,0,h),d.length!==0){for(let f=0,g=d.length;f<g;f++){const _=d[f];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}u.count!==-1&&(s.bufferSubData(c,u.offset*h.BYTES_PER_ELEMENT,h,u.offset,u.count),u.count=-1),l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}class Yr extends qt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,d=t/l,f=[],g=[],_=[],p=[];for(let m=0;m<h;m++){const w=m*d-o;for(let v=0;v<c;v++){const S=v*u-r;g.push(S,-w,0),_.push(0,0,1),p.push(v/a),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let w=0;w<a;w++){const v=w+c*m,S=w+c*(m+1),I=w+1+c*(m+1),P=w+1+c*m;f.push(v,S,P),f.push(S,I,P)}this.setIndex(f),this.setAttribute("position",new wt(g,3)),this.setAttribute("normal",new wt(_,3)),this.setAttribute("uv",new wt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yr(e.width,e.height,e.widthSegments,e.heightSegments)}}var mg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gg=`#ifdef USE_ALPHAHASH
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
#endif`,_g=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,yg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,xg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,bg=`#ifdef USE_AOMAP
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
#endif`,Eg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Mg=`#ifdef USE_BATCHING
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
#endif`,Sg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,wg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Tg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ag=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Cg=`#ifdef USE_IRIDESCENCE
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
#endif`,Rg=`#ifdef USE_BUMPMAP
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
#endif`,Lg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Pg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ng=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ig=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Dg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ug=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Og=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Fg=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,kg=`#define PI 3.141592653589793
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
} // validated`,Bg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,zg=`vec3 transformedNormal = objectNormal;
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
#endif`,Hg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Vg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Gg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Wg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Xg=`
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
}`,qg=`#ifdef USE_ENVMAP
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
#endif`,$g=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Yg=`#ifdef USE_ENVMAP
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
#endif`,Kg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Jg=`#ifdef USE_ENVMAP
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
#endif`,Zg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Qg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,e_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,t_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,n_=`#ifdef USE_GRADIENTMAP
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
}`,i_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,s_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,r_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,o_=`uniform bool receiveShadow;
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
#endif`,a_=`#ifdef USE_ENVMAP
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
#endif`,l_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,c_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,h_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,u_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,d_=`PhysicalMaterial material;
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
#endif`,f_=`struct PhysicalMaterial {
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
}`,p_=`
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
#endif`,m_=`#if defined( RE_IndirectDiffuse )
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
#endif`,g_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,__=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,y_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,v_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,x_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,b_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,E_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,M_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,S_=`#if defined( USE_POINTS_UV )
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
#endif`,w_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,T_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,A_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,C_=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,R_=`#ifdef USE_MORPHNORMALS
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
#endif`,L_=`#ifdef USE_MORPHTARGETS
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
#endif`,P_=`#ifdef USE_MORPHTARGETS
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
#endif`,N_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,I_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,D_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,U_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,O_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,F_=`#ifdef USE_NORMALMAP
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
#endif`,k_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,B_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,z_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,H_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,V_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,G_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,W_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,j_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,X_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,q_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Y_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,K_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,J_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Z_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Q_=`float getShadowMask() {
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
}`,e0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,t0=`#ifdef USE_SKINNING
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
#endif`,n0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,i0=`#ifdef USE_SKINNING
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
#endif`,s0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,r0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,o0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,a0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,l0=`#ifdef USE_TRANSMISSION
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
#endif`,c0=`#ifdef USE_TRANSMISSION
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
#endif`,h0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,u0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,d0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,f0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const p0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,m0=`uniform sampler2D t2D;
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
}`,g0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,y0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,v0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,x0=`#include <common>
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
}`,b0=`#if DEPTH_PACKING == 3200
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
}`,E0=`#define DISTANCE
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
}`,M0=`#define DISTANCE
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
}`,S0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,w0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,T0=`uniform float scale;
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
}`,A0=`uniform vec3 diffuse;
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
}`,C0=`#include <common>
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
}`,R0=`uniform vec3 diffuse;
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
}`,L0=`#define LAMBERT
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
}`,P0=`#define LAMBERT
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
}`,N0=`#define MATCAP
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
}`,I0=`#define MATCAP
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
}`,D0=`#define NORMAL
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
}`,U0=`#define NORMAL
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
}`,O0=`#define PHONG
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
}`,F0=`#define PHONG
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
}`,k0=`#define STANDARD
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
}`,B0=`#define STANDARD
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
}`,z0=`#define TOON
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
}`,H0=`#define TOON
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
}`,V0=`uniform float size;
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
}`,G0=`uniform vec3 diffuse;
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
}`,W0=`#include <common>
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
}`,j0=`uniform vec3 color;
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
}`,X0=`uniform float rotation;
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
}`,q0=`uniform vec3 diffuse;
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
}`,ht={alphahash_fragment:mg,alphahash_pars_fragment:gg,alphamap_fragment:_g,alphamap_pars_fragment:yg,alphatest_fragment:vg,alphatest_pars_fragment:xg,aomap_fragment:bg,aomap_pars_fragment:Eg,batching_pars_vertex:Mg,batching_vertex:Sg,begin_vertex:wg,beginnormal_vertex:Tg,bsdfs:Ag,iridescence_fragment:Cg,bumpmap_pars_fragment:Rg,clipping_planes_fragment:Lg,clipping_planes_pars_fragment:Pg,clipping_planes_pars_vertex:Ng,clipping_planes_vertex:Ig,color_fragment:Dg,color_pars_fragment:Ug,color_pars_vertex:Og,color_vertex:Fg,common:kg,cube_uv_reflection_fragment:Bg,defaultnormal_vertex:zg,displacementmap_pars_vertex:Hg,displacementmap_vertex:Vg,emissivemap_fragment:Gg,emissivemap_pars_fragment:Wg,colorspace_fragment:jg,colorspace_pars_fragment:Xg,envmap_fragment:qg,envmap_common_pars_fragment:$g,envmap_pars_fragment:Yg,envmap_pars_vertex:Kg,envmap_physical_pars_fragment:a_,envmap_vertex:Jg,fog_vertex:Zg,fog_pars_vertex:Qg,fog_fragment:e_,fog_pars_fragment:t_,gradientmap_pars_fragment:n_,lightmap_pars_fragment:i_,lights_lambert_fragment:s_,lights_lambert_pars_fragment:r_,lights_pars_begin:o_,lights_toon_fragment:l_,lights_toon_pars_fragment:c_,lights_phong_fragment:h_,lights_phong_pars_fragment:u_,lights_physical_fragment:d_,lights_physical_pars_fragment:f_,lights_fragment_begin:p_,lights_fragment_maps:m_,lights_fragment_end:g_,logdepthbuf_fragment:__,logdepthbuf_pars_fragment:y_,logdepthbuf_pars_vertex:v_,logdepthbuf_vertex:x_,map_fragment:b_,map_pars_fragment:E_,map_particle_fragment:M_,map_particle_pars_fragment:S_,metalnessmap_fragment:w_,metalnessmap_pars_fragment:T_,morphinstance_vertex:A_,morphcolor_vertex:C_,morphnormal_vertex:R_,morphtarget_pars_vertex:L_,morphtarget_vertex:P_,normal_fragment_begin:N_,normal_fragment_maps:I_,normal_pars_fragment:D_,normal_pars_vertex:U_,normal_vertex:O_,normalmap_pars_fragment:F_,clearcoat_normal_fragment_begin:k_,clearcoat_normal_fragment_maps:B_,clearcoat_pars_fragment:z_,iridescence_pars_fragment:H_,opaque_fragment:V_,packing:G_,premultiplied_alpha_fragment:W_,project_vertex:j_,dithering_fragment:X_,dithering_pars_fragment:q_,roughnessmap_fragment:$_,roughnessmap_pars_fragment:Y_,shadowmap_pars_fragment:K_,shadowmap_pars_vertex:J_,shadowmap_vertex:Z_,shadowmask_pars_fragment:Q_,skinbase_vertex:e0,skinning_pars_vertex:t0,skinning_vertex:n0,skinnormal_vertex:i0,specularmap_fragment:s0,specularmap_pars_fragment:r0,tonemapping_fragment:o0,tonemapping_pars_fragment:a0,transmission_fragment:l0,transmission_pars_fragment:c0,uv_pars_fragment:h0,uv_pars_vertex:u0,uv_vertex:d0,worldpos_vertex:f0,background_vert:p0,background_frag:m0,backgroundCube_vert:g0,backgroundCube_frag:_0,cube_vert:y0,cube_frag:v0,depth_vert:x0,depth_frag:b0,distanceRGBA_vert:E0,distanceRGBA_frag:M0,equirect_vert:S0,equirect_frag:w0,linedashed_vert:T0,linedashed_frag:A0,meshbasic_vert:C0,meshbasic_frag:R0,meshlambert_vert:L0,meshlambert_frag:P0,meshmatcap_vert:N0,meshmatcap_frag:I0,meshnormal_vert:D0,meshnormal_frag:U0,meshphong_vert:O0,meshphong_frag:F0,meshphysical_vert:k0,meshphysical_frag:B0,meshtoon_vert:z0,meshtoon_frag:H0,points_vert:V0,points_frag:G0,shadow_vert:W0,shadow_frag:j0,sprite_vert:X0,sprite_frag:q0},Te={common:{diffuse:{value:new Xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ut},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ut}},envmap:{envMap:{value:null},envMapRotation:{value:new ut},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ut},normalScale:{value:new ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0},uvTransform:{value:new ut}},sprite:{diffuse:{value:new Xe(16777215)},opacity:{value:1},center:{value:new ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ut},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0}}},Hn={basic:{uniforms:nn([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:nn([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new Xe(0)}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:nn([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new Xe(0)},specular:{value:new Xe(1118481)},shininess:{value:30}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:nn([Te.common,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.roughnessmap,Te.metalnessmap,Te.fog,Te.lights,{emissive:{value:new Xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:nn([Te.common,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.gradientmap,Te.fog,Te.lights,{emissive:{value:new Xe(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:nn([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:nn([Te.points,Te.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:nn([Te.common,Te.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:nn([Te.common,Te.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:nn([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:nn([Te.sprite,Te.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ut}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distanceRGBA:{uniforms:nn([Te.common,Te.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distanceRGBA_vert,fragmentShader:ht.distanceRGBA_frag},shadow:{uniforms:nn([Te.lights,Te.fog,{color:{value:new Xe(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};Hn.physical={uniforms:nn([Hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ut},clearcoatNormalScale:{value:new ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ut},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ut},sheen:{value:0},sheenColor:{value:new Xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ut},transmissionSamplerSize:{value:new ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ut},attenuationDistance:{value:0},attenuationColor:{value:new Xe(0)},specularColor:{value:new Xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ut},anisotropyVector:{value:new ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ut}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};const Co={r:0,b:0,g:0},qi=new on,$0=new $e;function Y0(s,e,t,n,i,r,o){const a=new Xe(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(w){let v=w.isScene===!0?w.background:null;return v&&v.isTexture&&(v=(w.backgroundBlurriness>0?t:e).get(v)),v}function _(w){let v=!1;const S=g(w);S===null?m(a,l):S&&S.isColor&&(m(S,1),v=!0);const I=s.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,o):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||v)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil)}function p(w,v){const S=g(v);S&&(S.isCubeTexture||S.mapping===pa)?(h===void 0&&(h=new Bt(new rr(1,1,1),new Oi({name:"BackgroundCubeMaterial",uniforms:Qs(Hn.backgroundCube.uniforms),vertexShader:Hn.backgroundCube.vertexShader,fragmentShader:Hn.backgroundCube.fragmentShader,side:hn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(I,P,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),qi.copy(v.backgroundRotation),qi.x*=-1,qi.y*=-1,qi.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(qi.y*=-1,qi.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4($0.makeRotationFromEuler(qi)),h.material.toneMapped=xt.getTransfer(S.colorSpace)!==Rt,(u!==S||d!==S.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=S,d=S.version,f=s.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new Bt(new Yr(2,2),new Oi({name:"BackgroundMaterial",uniforms:Qs(Hn.background.uniforms),vertexShader:Hn.background.vertexShader,fragmentShader:Hn.background.fragmentShader,side:qn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=xt.getTransfer(S.colorSpace)!==Rt,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=S,d=S.version,f=s.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function m(w,v){w.getRGB(Co,ff(s)),n.buffers.color.setClear(Co.r,Co.g,Co.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(w,v=1){a.set(w),l=v,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,m(a,l)},render:_,addToRenderList:p}}function K0(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,o=!1;function a(y,U,z,F,H){let Z=!1;const B=u(F,z,U);r!==B&&(r=B,c(r.object)),Z=f(y,F,z,H),Z&&g(y,F,z,H),H!==null&&e.update(H,s.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,S(y,U,z,F),H!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return s.createVertexArray()}function c(y){return s.bindVertexArray(y)}function h(y){return s.deleteVertexArray(y)}function u(y,U,z){const F=z.wireframe===!0;let H=n[y.id];H===void 0&&(H={},n[y.id]=H);let Z=H[U.id];Z===void 0&&(Z={},H[U.id]=Z);let B=Z[F];return B===void 0&&(B=d(l()),Z[F]=B),B}function d(y){const U=[],z=[],F=[];for(let H=0;H<t;H++)U[H]=0,z[H]=0,F[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:z,attributeDivisors:F,object:y,attributes:{},index:null}}function f(y,U,z,F){const H=r.attributes,Z=U.attributes;let B=0;const he=z.getAttributes();for(const G in he)if(he[G].location>=0){const ae=H[G];let me=Z[G];if(me===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(me=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(me=y.instanceColor)),ae===void 0||ae.attribute!==me||me&&ae.data!==me.data)return!0;B++}return r.attributesNum!==B||r.index!==F}function g(y,U,z,F){const H={},Z=U.attributes;let B=0;const he=z.getAttributes();for(const G in he)if(he[G].location>=0){let ae=Z[G];ae===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(ae=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(ae=y.instanceColor));const me={};me.attribute=ae,ae&&ae.data&&(me.data=ae.data),H[G]=me,B++}r.attributes=H,r.attributesNum=B,r.index=F}function _(){const y=r.newAttributes;for(let U=0,z=y.length;U<z;U++)y[U]=0}function p(y){m(y,0)}function m(y,U){const z=r.newAttributes,F=r.enabledAttributes,H=r.attributeDivisors;z[y]=1,F[y]===0&&(s.enableVertexAttribArray(y),F[y]=1),H[y]!==U&&(s.vertexAttribDivisor(y,U),H[y]=U)}function w(){const y=r.newAttributes,U=r.enabledAttributes;for(let z=0,F=U.length;z<F;z++)U[z]!==y[z]&&(s.disableVertexAttribArray(z),U[z]=0)}function v(y,U,z,F,H,Z,B){B===!0?s.vertexAttribIPointer(y,U,z,H,Z):s.vertexAttribPointer(y,U,z,F,H,Z)}function S(y,U,z,F){_();const H=F.attributes,Z=z.getAttributes(),B=U.defaultAttributeValues;for(const he in Z){const G=Z[he];if(G.location>=0){let se=H[he];if(se===void 0&&(he==="instanceMatrix"&&y.instanceMatrix&&(se=y.instanceMatrix),he==="instanceColor"&&y.instanceColor&&(se=y.instanceColor)),se!==void 0){const ae=se.normalized,me=se.itemSize,Le=e.get(se);if(Le===void 0)continue;const Ae=Le.buffer,W=Le.type,ee=Le.bytesPerElement,ne=W===s.INT||W===s.UNSIGNED_INT||se.gpuType===Kd;if(se.isInterleavedBufferAttribute){const te=se.data,Ne=te.stride,qe=se.offset;if(te.isInstancedInterleavedBuffer){for(let V=0;V<G.locationSize;V++)m(G.location+V,te.meshPerAttribute);y.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let V=0;V<G.locationSize;V++)p(G.location+V);s.bindBuffer(s.ARRAY_BUFFER,Ae);for(let V=0;V<G.locationSize;V++)v(G.location+V,me/G.locationSize,W,ae,Ne*ee,(qe+me/G.locationSize*V)*ee,ne)}else{if(se.isInstancedBufferAttribute){for(let te=0;te<G.locationSize;te++)m(G.location+te,se.meshPerAttribute);y.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let te=0;te<G.locationSize;te++)p(G.location+te);s.bindBuffer(s.ARRAY_BUFFER,Ae);for(let te=0;te<G.locationSize;te++)v(G.location+te,me/G.locationSize,W,ae,me*ee,me/G.locationSize*te*ee,ne)}}else if(B!==void 0){const ae=B[he];if(ae!==void 0)switch(ae.length){case 2:s.vertexAttrib2fv(G.location,ae);break;case 3:s.vertexAttrib3fv(G.location,ae);break;case 4:s.vertexAttrib4fv(G.location,ae);break;default:s.vertexAttrib1fv(G.location,ae)}}}}w()}function I(){D();for(const y in n){const U=n[y];for(const z in U){const F=U[z];for(const H in F)h(F[H].object),delete F[H];delete U[z]}delete n[y]}}function P(y){if(n[y.id]===void 0)return;const U=n[y.id];for(const z in U){const F=U[z];for(const H in F)h(F[H].object),delete F[H];delete U[z]}delete n[y.id]}function C(y){for(const U in n){const z=n[U];if(z[y.id]===void 0)continue;const F=z[y.id];for(const H in F)h(F[H].object),delete F[H];delete z[y.id]}}function D(){E(),o=!0,r!==i&&(r=i,c(r.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:D,resetDefaultState:E,dispose:I,releaseStatesOfGeometry:P,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:p,disableUnusedAttributes:w}}function J0(s,e,t){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let f=0;f<u;f++)this.render(c[f],h[f]);else{d.multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,n,1)}}function l(c,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_];for(let _=0;_<d.length;_++)t.update(g,n,d[_])}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Z0(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(P){return!(P!==Dn&&n.convert(P)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){const C=P===ma&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Ui&&n.convert(P)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==jn&&!C)}function l(P){if(P==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_TEXTURE_SIZE),_=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),w=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),S=f>0,I=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:f,maxTextureSize:g,maxCubemapSize:_,maxAttributes:p,maxVertexUniforms:m,maxVaryings:w,maxFragmentUniforms:v,vertexTextures:S,maxSamples:I}}function Q0(s){const e=this;let t=null,n=0,i=!1,r=!1;const o=new Ln,a=new ut,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,m=s.get(u);if(!i||g===null||g.length===0||r&&!p)r?h(null):c();else{const w=r?0:n,v=w*4;let S=m.clippingState||null;l.value=S,S=h(g,d,v,f);for(let I=0;I!==v;++I)S[I]=t[I];m.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const m=f+_*4,w=d.matrixWorldInverse;a.getNormalMatrix(w),(p===null||p.length<m)&&(p=new Float32Array(m));for(let v=0,S=f;v!==_;++v,S+=4)o.copy(u[v]).applyMatrix4(w,a),o.normal.toArray(p,S),p[S+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function ey(s){let e=new WeakMap;function t(o,a){return a===Vl?o.mapping=$s:a===Gl&&(o.mapping=Ys),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Vl||a===Gl)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new ug(l.height);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class ya extends pf{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Os=4,lu=[.125,.215,.35,.446,.526,.582],ts=20,rl=new ya,cu=new Xe;let ol=null,al=0,ll=0,cl=!1;const Ji=(1+Math.sqrt(5))/2,Is=1/Ji,hu=[new k(-Ji,Is,0),new k(Ji,Is,0),new k(-Is,0,Ji),new k(Is,0,Ji),new k(0,Ji,-Is),new k(0,Ji,Is),new k(-1,1,-1),new k(1,1,-1),new k(-1,1,1),new k(1,1,1)];class uu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){ol=this._renderer.getRenderTarget(),al=this._renderer.getActiveCubeFace(),ll=this._renderer.getActiveMipmapLevel(),cl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=pu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ol,al,ll),this._renderer.xr.enabled=cl,e.scissorTest=!1,Ro(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===$s||e.mapping===Ys?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ol=this._renderer.getRenderTarget(),al=this._renderer.getActiveCubeFace(),ll=this._renderer.getActiveMipmapLevel(),cl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Zt,minFilter:Zt,generateMipmaps:!1,type:ma,format:Dn,colorSpace:Yt,depthBuffer:!1},i=du(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=du(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ty(r)),this._blurMaterial=ny(r,e,t)}return i}_compileMaterial(e){const t=new Bt(this._lodPlanes[0],e);this._renderer.compile(t,rl)}_sceneToCubeUV(e,t,n,i){const a=new $t(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(cu),h.toneMapping=Pi,h.autoClear=!1;const f=new Xn({name:"PMREM.Background",side:hn,depthWrite:!1,depthTest:!1}),g=new Bt(new rr,f);let _=!1;const p=e.background;p?p.isColor&&(f.color.copy(p),e.background=null,_=!0):(f.color.copy(cu),_=!0);for(let m=0;m<6;m++){const w=m%3;w===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):w===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));const v=this._cubeSize;Ro(i,w*v,m>2?v:0,v,v),h.setRenderTarget(i),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===$s||e.mapping===Ys;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=pu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fu());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new Bt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;Ro(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,rl)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=hu[(i-r-1)%hu.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Bt(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ts-1),_=r/g,p=isFinite(r)?1+Math.floor(h*_):ts;p>ts&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ts}`);const m=[];let w=0;for(let C=0;C<ts;++C){const D=C/_,E=Math.exp(-D*D/2);m.push(E),C===0?w+=E:C<p&&(w+=2*E)}for(let C=0;C<m.length;C++)m[C]=m[C]/w;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=m,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-n;const S=this._sizeLods[i],I=3*S*(i>v-Os?i-v+Os:0),P=4*(this._cubeSize-S);Ro(t,I,P,3*S,2*S),l.setRenderTarget(t),l.render(u,rl)}}function ty(s){const e=[],t=[],n=[];let i=s;const r=s-Os+1+lu.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>s-Os?l=lu[o-s+Os-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,p=2,m=1,w=new Float32Array(_*g*f),v=new Float32Array(p*g*f),S=new Float32Array(m*g*f);for(let P=0;P<f;P++){const C=P%3*2/3-1,D=P>2?0:-1,E=[C,D,0,C+2/3,D,0,C+2/3,D+1,0,C,D,0,C+2/3,D+1,0,C,D+1,0];w.set(E,_*g*P),v.set(d,p*g*P);const y=[P,P,P,P,P,P];S.set(y,m*g*P)}const I=new qt;I.setAttribute("position",new It(w,_)),I.setAttribute("uv",new It(v,p)),I.setAttribute("faceIndex",new It(S,m)),e.push(I),i>Os&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function du(s,e,t){const n=new os(s,e,t);return n.texture.mapping=pa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ro(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function ny(s,e,t){const n=new Float32Array(ts),i=new k(0,1,0);return new Oi({name:"SphericalGaussianBlur",defines:{n:ts,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:pc(),fragmentShader:`

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
		`,blending:Li,depthTest:!1,depthWrite:!1})}function fu(){return new Oi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:pc(),fragmentShader:`

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
		`,blending:Li,depthTest:!1,depthWrite:!1})}function pu(){return new Oi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:pc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Li,depthTest:!1,depthWrite:!1})}function pc(){return`

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
	`}function iy(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Vl||l===Gl,h=l===$s||l===Ys;if(c||h){let u=e.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new uu(s)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new uu(s)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function sy(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function ry(s,e,t,n){const i={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)e.remove(_[p])}d.removeEventListener("dispose",o),delete i[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)e.update(d[g],s.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const _=f[g];for(let p=0,m=_.length;p<m;p++)e.update(_[p],s.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const w=f.array;_=f.version;for(let v=0,S=w.length;v<S;v+=3){const I=w[v+0],P=w[v+1],C=w[v+2];d.push(I,P,P,C,C,I)}}else if(g!==void 0){const w=g.array;_=g.version;for(let v=0,S=w.length/3-1;v<S;v+=3){const I=v+0,P=v+1,C=v+2;d.push(I,P,P,C,C,I)}}else return;const p=new(of(d)?df:uf)(d,1);p.version=_;const m=r.get(u);m&&e.remove(m),r.set(u,p)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function oy(s,e,t){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*o),t.update(f,n,1)}function c(d,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,d*o,g),t.update(f,n,g))}function h(d,f,g){if(g===0)return;const _=e.get("WEBGL_multi_draw");if(_===null)for(let p=0;p<g;p++)this.render(d[p]/o,f[p]);else{_.multiDrawElementsWEBGL(n,f,0,r,d,0,g);let p=0;for(let m=0;m<g;m++)p+=f[m];t.update(p,n,1)}}function u(d,f,g,_){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<d.length;m++)c(d[m]/o,f[m],_[m]);else{p.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let m=0;for(let w=0;w<g;w++)m+=f[w];for(let w=0;w<_.length;w++)t.update(m,n,_[w])}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function ay(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function ly(s,e,t){const n=new WeakMap,i=new Tt;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let E=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",E)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],w=a.morphAttributes.color||[];let v=0;f===!0&&(v=1),g===!0&&(v=2),_===!0&&(v=3);let S=a.attributes.position.count*v,I=1;S>e.maxTextureSize&&(I=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const P=new Float32Array(S*I*4*u),C=new cf(P,S,I,u);C.type=jn,C.needsUpdate=!0;const D=v*4;for(let y=0;y<u;y++){const U=p[y],z=m[y],F=w[y],H=S*I*4*y;for(let Z=0;Z<U.count;Z++){const B=Z*D;f===!0&&(i.fromBufferAttribute(U,Z),P[H+B+0]=i.x,P[H+B+1]=i.y,P[H+B+2]=i.z,P[H+B+3]=0),g===!0&&(i.fromBufferAttribute(z,Z),P[H+B+4]=i.x,P[H+B+5]=i.y,P[H+B+6]=i.z,P[H+B+7]=0),_===!0&&(i.fromBufferAttribute(F,Z),P[H+B+8]=i.x,P[H+B+9]=i.y,P[H+B+10]=i.z,P[H+B+11]=F.itemSize===4?i.w:1)}}d={count:u,texture:C,size:new ye(S,I)},n.set(a,d),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function cy(s,e,t,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class _f extends Vt{constructor(e,t,n,i,r,o,a,l,c,h){if(h=h!==void 0?h:Ws,h!==Ws&&h!==kr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ws&&(n=Ks),n===void 0&&h===kr&&(n=$r),super(null,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:rn,this.minFilter=l!==void 0?l:rn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const yf=new Vt,vf=new _f(1,1);vf.compareFunction=rf;const xf=new cf,bf=new Ym,Ef=new mf,mu=[],gu=[],_u=new Float32Array(16),yu=new Float32Array(9),vu=new Float32Array(4);function or(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=mu[i];if(r===void 0&&(r=new Float32Array(i),mu[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function Gt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Wt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function va(s,e){let t=gu[e];t===void 0&&(t=new Int32Array(e),gu[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function hy(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function uy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;s.uniform2fv(this.addr,e),Wt(t,e)}}function dy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Gt(t,e))return;s.uniform3fv(this.addr,e),Wt(t,e)}}function fy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;s.uniform4fv(this.addr,e),Wt(t,e)}}function py(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Wt(t,e)}else{if(Gt(t,n))return;vu.set(n),s.uniformMatrix2fv(this.addr,!1,vu),Wt(t,n)}}function my(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Wt(t,e)}else{if(Gt(t,n))return;yu.set(n),s.uniformMatrix3fv(this.addr,!1,yu),Wt(t,n)}}function gy(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Wt(t,e)}else{if(Gt(t,n))return;_u.set(n),s.uniformMatrix4fv(this.addr,!1,_u),Wt(t,n)}}function _y(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function yy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;s.uniform2iv(this.addr,e),Wt(t,e)}}function vy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;s.uniform3iv(this.addr,e),Wt(t,e)}}function xy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;s.uniform4iv(this.addr,e),Wt(t,e)}}function by(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Ey(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;s.uniform2uiv(this.addr,e),Wt(t,e)}}function My(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;s.uniform3uiv(this.addr,e),Wt(t,e)}}function Sy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;s.uniform4uiv(this.addr,e),Wt(t,e)}}function wy(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);const r=this.type===s.SAMPLER_2D_SHADOW?vf:yf;t.setTexture2D(e||r,i)}function Ty(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||bf,i)}function Ay(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Ef,i)}function Cy(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||xf,i)}function Ry(s){switch(s){case 5126:return hy;case 35664:return uy;case 35665:return dy;case 35666:return fy;case 35674:return py;case 35675:return my;case 35676:return gy;case 5124:case 35670:return _y;case 35667:case 35671:return yy;case 35668:case 35672:return vy;case 35669:case 35673:return xy;case 5125:return by;case 36294:return Ey;case 36295:return My;case 36296:return Sy;case 35678:case 36198:case 36298:case 36306:case 35682:return wy;case 35679:case 36299:case 36307:return Ty;case 35680:case 36300:case 36308:case 36293:return Ay;case 36289:case 36303:case 36311:case 36292:return Cy}}function Ly(s,e){s.uniform1fv(this.addr,e)}function Py(s,e){const t=or(e,this.size,2);s.uniform2fv(this.addr,t)}function Ny(s,e){const t=or(e,this.size,3);s.uniform3fv(this.addr,t)}function Iy(s,e){const t=or(e,this.size,4);s.uniform4fv(this.addr,t)}function Dy(s,e){const t=or(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Uy(s,e){const t=or(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Oy(s,e){const t=or(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Fy(s,e){s.uniform1iv(this.addr,e)}function ky(s,e){s.uniform2iv(this.addr,e)}function By(s,e){s.uniform3iv(this.addr,e)}function zy(s,e){s.uniform4iv(this.addr,e)}function Hy(s,e){s.uniform1uiv(this.addr,e)}function Vy(s,e){s.uniform2uiv(this.addr,e)}function Gy(s,e){s.uniform3uiv(this.addr,e)}function Wy(s,e){s.uniform4uiv(this.addr,e)}function jy(s,e,t){const n=this.cache,i=e.length,r=va(t,i);Gt(n,r)||(s.uniform1iv(this.addr,r),Wt(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||yf,r[o])}function Xy(s,e,t){const n=this.cache,i=e.length,r=va(t,i);Gt(n,r)||(s.uniform1iv(this.addr,r),Wt(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||bf,r[o])}function qy(s,e,t){const n=this.cache,i=e.length,r=va(t,i);Gt(n,r)||(s.uniform1iv(this.addr,r),Wt(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Ef,r[o])}function $y(s,e,t){const n=this.cache,i=e.length,r=va(t,i);Gt(n,r)||(s.uniform1iv(this.addr,r),Wt(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||xf,r[o])}function Yy(s){switch(s){case 5126:return Ly;case 35664:return Py;case 35665:return Ny;case 35666:return Iy;case 35674:return Dy;case 35675:return Uy;case 35676:return Oy;case 5124:case 35670:return Fy;case 35667:case 35671:return ky;case 35668:case 35672:return By;case 35669:case 35673:return zy;case 5125:return Hy;case 36294:return Vy;case 36295:return Gy;case 36296:return Wy;case 35678:case 36198:case 36298:case 36306:case 35682:return jy;case 35679:case 36299:case 36307:return Xy;case 35680:case 36300:case 36308:case 36293:return qy;case 36289:case 36303:case 36311:case 36292:return $y}}class Ky{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ry(t.type)}}class Jy{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Yy(t.type)}}class Zy{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(e,t[a.id],n)}}}const hl=/(\w+)(\])?(\[|\.)?/g;function xu(s,e){s.seq.push(e),s.map[e.id]=e}function Qy(s,e,t){const n=s.name,i=n.length;for(hl.lastIndex=0;;){const r=hl.exec(n),o=hl.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){xu(t,c===void 0?new Ky(a,s,e):new Jy(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new Zy(a),xu(t,u)),t=u}}}class Jo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);Qy(r,o,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function bu(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const ev=37297;let tv=0;function nv(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function iv(s){const e=xt.getPrimaries(xt.workingColorSpace),t=xt.getPrimaries(s);let n;switch(e===t?n="":e===ra&&t===sa?n="LinearDisplayP3ToLinearSRGB":e===sa&&t===ra&&(n="LinearSRGBToLinearDisplayP3"),s){case Yt:case _a:return[n,"LinearTransferOETF"];case Ot:case hc:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function Eu(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+nv(s.getShaderSource(e),o)}else return i}function sv(s,e){const t=iv(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function rv(s,e){let t;switch(e){case Zp:t="Linear";break;case Qp:t="Reinhard";break;case em:t="OptimizedCineon";break;case tm:t="ACESFilmic";break;case im:t="AgX";break;case sm:t="Neutral";break;case nm:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function ov(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Tr).join(`
`)}function av(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function lv(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function Tr(s){return s!==""}function Mu(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Su(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const cv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xl(s){return s.replace(cv,uv)}const hv=new Map;function uv(s,e){let t=ht[e];if(t===void 0){const n=hv.get(e);if(n!==void 0)t=ht[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Xl(t)}const dv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wu(s){return s.replace(dv,fv)}function fv(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Tu(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}function pv(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===jd?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Xd?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===li&&(e="SHADOWMAP_TYPE_VSM"),e}function mv(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case $s:case Ys:e="ENVMAP_TYPE_CUBE";break;case pa:e="ENVMAP_TYPE_CUBE_UV";break}return e}function gv(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Ys:e="ENVMAP_MODE_REFRACTION";break}return e}function _v(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case fa:e="ENVMAP_BLENDING_MULTIPLY";break;case Kp:e="ENVMAP_BLENDING_MIX";break;case Jp:e="ENVMAP_BLENDING_ADD";break}return e}function yv(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function vv(s,e,t,n){const i=s.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=pv(t),c=mv(t),h=gv(t),u=_v(t),d=yv(t),f=ov(t),g=av(r),_=i.createProgram();let p,m,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Tr).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Tr).join(`
`),m.length>0&&(m+=`
`)):(p=[Tu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Tr).join(`
`),m=[Tu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pi?"#define TONE_MAPPING":"",t.toneMapping!==Pi?ht.tonemapping_pars_fragment:"",t.toneMapping!==Pi?rv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,sv("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Tr).join(`
`)),o=Xl(o),o=Mu(o,t),o=Su(o,t),a=Xl(a),a=Mu(a,t),a=Su(a,t),o=wu(o),a=wu(a),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===Hh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Hh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const v=w+p+o,S=w+m+a,I=bu(i,i.VERTEX_SHADER,v),P=bu(i,i.FRAGMENT_SHADER,S);i.attachShader(_,I),i.attachShader(_,P),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function C(U){if(s.debug.checkShaderErrors){const z=i.getProgramInfoLog(_).trim(),F=i.getShaderInfoLog(I).trim(),H=i.getShaderInfoLog(P).trim();let Z=!0,B=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(Z=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,I,P);else{const he=Eu(i,I,"vertex"),G=Eu(i,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+z+`
`+he+`
`+G)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(F===""||H==="")&&(B=!1);B&&(U.diagnostics={runnable:Z,programLog:z,vertexShader:{log:F,prefix:p},fragmentShader:{log:H,prefix:m}})}i.deleteShader(I),i.deleteShader(P),D=new Jo(i,_),E=lv(i,_)}let D;this.getUniforms=function(){return D===void 0&&C(this),D};let E;this.getAttributes=function(){return E===void 0&&C(this),E};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(_,ev)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=tv++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=I,this.fragmentShader=P,this}let xv=0;class bv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Ev(e),t.set(e,n)),n}}class Ev{constructor(e){this.id=xv++,this.code=e,this.usedTimes=0}}function Mv(s,e,t,n,i,r,o){const a=new dc,l=new bv,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return c.add(E),E===0?"uv":`uv${E}`}function p(E,y,U,z,F){const H=z.fog,Z=F.geometry,B=E.isMeshStandardMaterial?z.environment:null,he=(E.isMeshStandardMaterial?t:e).get(E.envMap||B),G=he&&he.mapping===pa?he.image.height:null,se=g[E.type];E.precision!==null&&(f=i.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const ae=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,me=ae!==void 0?ae.length:0;let Le=0;Z.morphAttributes.position!==void 0&&(Le=1),Z.morphAttributes.normal!==void 0&&(Le=2),Z.morphAttributes.color!==void 0&&(Le=3);let Ae,W,ee,ne;if(se){const ft=Hn[se];Ae=ft.vertexShader,W=ft.fragmentShader}else Ae=E.vertexShader,W=E.fragmentShader,l.update(E),ee=l.getVertexShaderID(E),ne=l.getFragmentShaderID(E);const te=s.getRenderTarget(),Ne=F.isInstancedMesh===!0,qe=F.isBatchedMesh===!0,V=!!E.map,at=!!E.matcap,re=!!he,_e=!!E.aoMap,ce=!!E.lightMap,be=!!E.bumpMap,pe=!!E.normalMap,Pe=!!E.displacementMap,We=!!E.emissiveMap,O=!!E.metalnessMap,A=!!E.roughnessMap,q=E.anisotropy>0,le=E.clearcoat>0,de=E.dispersion>0,ue=E.iridescence>0,He=E.sheen>0,we=E.transmission>0,Me=q&&!!E.anisotropyMap,Qe=le&&!!E.clearcoatMap,xe=le&&!!E.clearcoatNormalMap,Be=le&&!!E.clearcoatRoughnessMap,rt=ue&&!!E.iridescenceMap,Ye=ue&&!!E.iridescenceThicknessMap,De=He&&!!E.sheenColorMap,nt=He&&!!E.sheenRoughnessMap,lt=!!E.specularMap,vt=!!E.specularColorMap,st=!!E.specularIntensityMap,M=we&&!!E.transmissionMap,j=we&&!!E.thicknessMap,$=!!E.gradientMap,fe=!!E.alphaMap,Ee=E.alphaTest>0,it=!!E.alphaHash,ct=!!E.extensions;let Ct=Pi;E.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Ct=s.toneMapping);const Ut={shaderID:se,shaderType:E.type,shaderName:E.name,vertexShader:Ae,fragmentShader:W,defines:E.defines,customVertexShaderID:ee,customFragmentShaderID:ne,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:qe,instancing:Ne,instancingColor:Ne&&F.instanceColor!==null,instancingMorph:Ne&&F.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:te===null?s.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:Yt,alphaToCoverage:!!E.alphaToCoverage,map:V,matcap:at,envMap:re,envMapMode:re&&he.mapping,envMapCubeUVHeight:G,aoMap:_e,lightMap:ce,bumpMap:be,normalMap:pe,displacementMap:d&&Pe,emissiveMap:We,normalMapObjectSpace:pe&&E.normalMapType===vm,normalMapTangentSpace:pe&&E.normalMapType===ga,metalnessMap:O,roughnessMap:A,anisotropy:q,anisotropyMap:Me,clearcoat:le,clearcoatMap:Qe,clearcoatNormalMap:xe,clearcoatRoughnessMap:Be,dispersion:de,iridescence:ue,iridescenceMap:rt,iridescenceThicknessMap:Ye,sheen:He,sheenColorMap:De,sheenRoughnessMap:nt,specularMap:lt,specularColorMap:vt,specularIntensityMap:st,transmission:we,transmissionMap:M,thicknessMap:j,gradientMap:$,opaque:E.transparent===!1&&E.blending===Gs&&E.alphaToCoverage===!1,alphaMap:fe,alphaTest:Ee,alphaHash:it,combine:E.combine,mapUv:V&&_(E.map.channel),aoMapUv:_e&&_(E.aoMap.channel),lightMapUv:ce&&_(E.lightMap.channel),bumpMapUv:be&&_(E.bumpMap.channel),normalMapUv:pe&&_(E.normalMap.channel),displacementMapUv:Pe&&_(E.displacementMap.channel),emissiveMapUv:We&&_(E.emissiveMap.channel),metalnessMapUv:O&&_(E.metalnessMap.channel),roughnessMapUv:A&&_(E.roughnessMap.channel),anisotropyMapUv:Me&&_(E.anisotropyMap.channel),clearcoatMapUv:Qe&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:xe&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Be&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:rt&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:Ye&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:De&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:nt&&_(E.sheenRoughnessMap.channel),specularMapUv:lt&&_(E.specularMap.channel),specularColorMapUv:vt&&_(E.specularColorMap.channel),specularIntensityMapUv:st&&_(E.specularIntensityMap.channel),transmissionMapUv:M&&_(E.transmissionMap.channel),thicknessMapUv:j&&_(E.thicknessMap.channel),alphaMapUv:fe&&_(E.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(pe||q),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!Z.attributes.uv&&(V||fe),fog:!!H,useFog:E.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:F.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:me,morphTextureStride:Le,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:s.shadowMap.enabled&&U.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ct,useLegacyLights:s._useLegacyLights,decodeVideoTexture:V&&E.map.isVideoTexture===!0&&xt.getTransfer(E.map.colorSpace)===Rt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===vn,flipSided:E.side===hn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:ct&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:ct&&E.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Ut.vertexUv1s=c.has(1),Ut.vertexUv2s=c.has(2),Ut.vertexUv3s=c.has(3),c.clear(),Ut}function m(E){const y=[];if(E.shaderID?y.push(E.shaderID):(y.push(E.customVertexShaderID),y.push(E.customFragmentShaderID)),E.defines!==void 0)for(const U in E.defines)y.push(U),y.push(E.defines[U]);return E.isRawShaderMaterial===!1&&(w(y,E),v(y,E),y.push(s.outputColorSpace)),y.push(E.customProgramCacheKey),y.join()}function w(E,y){E.push(y.precision),E.push(y.outputColorSpace),E.push(y.envMapMode),E.push(y.envMapCubeUVHeight),E.push(y.mapUv),E.push(y.alphaMapUv),E.push(y.lightMapUv),E.push(y.aoMapUv),E.push(y.bumpMapUv),E.push(y.normalMapUv),E.push(y.displacementMapUv),E.push(y.emissiveMapUv),E.push(y.metalnessMapUv),E.push(y.roughnessMapUv),E.push(y.anisotropyMapUv),E.push(y.clearcoatMapUv),E.push(y.clearcoatNormalMapUv),E.push(y.clearcoatRoughnessMapUv),E.push(y.iridescenceMapUv),E.push(y.iridescenceThicknessMapUv),E.push(y.sheenColorMapUv),E.push(y.sheenRoughnessMapUv),E.push(y.specularMapUv),E.push(y.specularColorMapUv),E.push(y.specularIntensityMapUv),E.push(y.transmissionMapUv),E.push(y.thicknessMapUv),E.push(y.combine),E.push(y.fogExp2),E.push(y.sizeAttenuation),E.push(y.morphTargetsCount),E.push(y.morphAttributeCount),E.push(y.numDirLights),E.push(y.numPointLights),E.push(y.numSpotLights),E.push(y.numSpotLightMaps),E.push(y.numHemiLights),E.push(y.numRectAreaLights),E.push(y.numDirLightShadows),E.push(y.numPointLightShadows),E.push(y.numSpotLightShadows),E.push(y.numSpotLightShadowsWithMaps),E.push(y.numLightProbes),E.push(y.shadowMapType),E.push(y.toneMapping),E.push(y.numClippingPlanes),E.push(y.numClipIntersection),E.push(y.depthPacking)}function v(E,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),E.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.skinning&&a.enable(4),y.morphTargets&&a.enable(5),y.morphNormals&&a.enable(6),y.morphColors&&a.enable(7),y.premultipliedAlpha&&a.enable(8),y.shadowMapEnabled&&a.enable(9),y.useLegacyLights&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.alphaToCoverage&&a.enable(20),E.push(a.mask)}function S(E){const y=g[E.type];let U;if(y){const z=Hn[y];U=ag.clone(z.uniforms)}else U=E.uniforms;return U}function I(E,y){let U;for(let z=0,F=h.length;z<F;z++){const H=h[z];if(H.cacheKey===y){U=H,++U.usedTimes;break}}return U===void 0&&(U=new vv(s,y,E,r),h.push(U)),U}function P(E){if(--E.usedTimes===0){const y=h.indexOf(E);h[y]=h[h.length-1],h.pop(),E.destroy()}}function C(E){l.remove(E)}function D(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:S,acquireProgram:I,releaseProgram:P,releaseShaderCache:C,programs:h,dispose:D}}function Sv(){let s=new WeakMap;function e(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function t(r){s.delete(r)}function n(r,o,a){s.get(r)[o]=a}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function wv(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Au(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Cu(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,f,g,_,p){let m=s[e];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:p},s[e]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=g,m.renderOrder=u.renderOrder,m.z=_,m.group=p),e++,m}function a(u,d,f,g,_,p){const m=o(u,d,f,g,_,p);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):t.push(m)}function l(u,d,f,g,_,p){const m=o(u,d,f,g,_,p);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):t.unshift(m)}function c(u,d){t.length>1&&t.sort(u||wv),n.length>1&&n.sort(d||Au),i.length>1&&i.sort(d||Au)}function h(){for(let u=e,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function Tv(){let s=new WeakMap;function e(n,i){const r=s.get(n);let o;return r===void 0?(o=new Cu,s.set(n,[o])):i>=r.length?(o=new Cu,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function Av(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new k,color:new Xe};break;case"SpotLight":t={position:new k,direction:new k,color:new Xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new k,color:new Xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new k,skyColor:new Xe,groundColor:new Xe};break;case"RectAreaLight":t={color:new Xe,position:new k,halfWidth:new k,halfHeight:new k};break}return s[e.id]=t,t}}}function Cv(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Rv=0;function Lv(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Pv(s){const e=new Av,t=Cv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new k);const i=new k,r=new $e,o=new $e;function a(c,h){let u=0,d=0,f=0;for(let U=0;U<9;U++)n.probe[U].set(0,0,0);let g=0,_=0,p=0,m=0,w=0,v=0,S=0,I=0,P=0,C=0,D=0;c.sort(Lv);const E=h===!0?Math.PI:1;for(let U=0,z=c.length;U<z;U++){const F=c[U],H=F.color,Z=F.intensity,B=F.distance,he=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)u+=H.r*Z*E,d+=H.g*Z*E,f+=H.b*Z*E;else if(F.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(F.sh.coefficients[G],Z);D++}else if(F.isDirectionalLight){const G=e.get(F);if(G.color.copy(F.color).multiplyScalar(F.intensity*E),F.castShadow){const se=F.shadow,ae=t.get(F);ae.shadowBias=se.bias,ae.shadowNormalBias=se.normalBias,ae.shadowRadius=se.radius,ae.shadowMapSize=se.mapSize,n.directionalShadow[g]=ae,n.directionalShadowMap[g]=he,n.directionalShadowMatrix[g]=F.shadow.matrix,v++}n.directional[g]=G,g++}else if(F.isSpotLight){const G=e.get(F);G.position.setFromMatrixPosition(F.matrixWorld),G.color.copy(H).multiplyScalar(Z*E),G.distance=B,G.coneCos=Math.cos(F.angle),G.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),G.decay=F.decay,n.spot[p]=G;const se=F.shadow;if(F.map&&(n.spotLightMap[P]=F.map,P++,se.updateMatrices(F),F.castShadow&&C++),n.spotLightMatrix[p]=se.matrix,F.castShadow){const ae=t.get(F);ae.shadowBias=se.bias,ae.shadowNormalBias=se.normalBias,ae.shadowRadius=se.radius,ae.shadowMapSize=se.mapSize,n.spotShadow[p]=ae,n.spotShadowMap[p]=he,I++}p++}else if(F.isRectAreaLight){const G=e.get(F);G.color.copy(H).multiplyScalar(Z),G.halfWidth.set(F.width*.5,0,0),G.halfHeight.set(0,F.height*.5,0),n.rectArea[m]=G,m++}else if(F.isPointLight){const G=e.get(F);if(G.color.copy(F.color).multiplyScalar(F.intensity*E),G.distance=F.distance,G.decay=F.decay,F.castShadow){const se=F.shadow,ae=t.get(F);ae.shadowBias=se.bias,ae.shadowNormalBias=se.normalBias,ae.shadowRadius=se.radius,ae.shadowMapSize=se.mapSize,ae.shadowCameraNear=se.camera.near,ae.shadowCameraFar=se.camera.far,n.pointShadow[_]=ae,n.pointShadowMap[_]=he,n.pointShadowMatrix[_]=F.shadow.matrix,S++}n.point[_]=G,_++}else if(F.isHemisphereLight){const G=e.get(F);G.skyColor.copy(F.color).multiplyScalar(Z*E),G.groundColor.copy(F.groundColor).multiplyScalar(Z*E),n.hemi[w]=G,w++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Te.LTC_FLOAT_1,n.rectAreaLTC2=Te.LTC_FLOAT_2):(n.rectAreaLTC1=Te.LTC_HALF_1,n.rectAreaLTC2=Te.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const y=n.hash;(y.directionalLength!==g||y.pointLength!==_||y.spotLength!==p||y.rectAreaLength!==m||y.hemiLength!==w||y.numDirectionalShadows!==v||y.numPointShadows!==S||y.numSpotShadows!==I||y.numSpotMaps!==P||y.numLightProbes!==D)&&(n.directional.length=g,n.spot.length=p,n.rectArea.length=m,n.point.length=_,n.hemi.length=w,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=I,n.spotShadowMap.length=I,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=I+P-C,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=D,y.directionalLength=g,y.pointLength=_,y.spotLength=p,y.rectAreaLength=m,y.hemiLength=w,y.numDirectionalShadows=v,y.numPointShadows=S,y.numSpotShadows=I,y.numSpotMaps=P,y.numLightProbes=D,n.version=Rv++)}function l(c,h){let u=0,d=0,f=0,g=0,_=0;const p=h.matrixWorldInverse;for(let m=0,w=c.length;m<w;m++){const v=c[m];if(v.isDirectionalLight){const S=n.directional[u];S.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(p),u++}else if(v.isSpotLight){const S=n.spot[f];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(p),f++}else if(v.isRectAreaLight){const S=n.rectArea[g];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(p),o.identity(),r.copy(v.matrixWorld),r.premultiply(p),o.extractRotation(r),S.halfWidth.set(v.width*.5,0,0),S.halfHeight.set(0,v.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){const S=n.point[d];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(p),d++}else if(v.isHemisphereLight){const S=n.hemi[_];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(p),_++}}}return{setup:a,setupView:l,state:n}}function Ru(s){const e=new Pv(s),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(h){e.setup(t,h)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Nv(s){let e=new WeakMap;function t(i,r=0){const o=e.get(i);let a;return o===void 0?(a=new Ru(s),e.set(i,[a])):r>=o.length?(a=new Ru(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class Iv extends fn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_m,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Dv extends fn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Uv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ov=`uniform sampler2D shadow_pass;
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
}`;function Fv(s,e,t){let n=new fc;const i=new ye,r=new ye,o=new Tt,a=new Iv({depthPacking:ym}),l=new Dv,c={},h=t.maxTextureSize,u={[qn]:hn,[hn]:qn,[vn]:vn},d=new Oi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ye},radius:{value:4}},vertexShader:Uv,fragmentShader:Ov}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new qt;g.setAttribute("position",new It(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Bt(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=jd;let m=this.type;this.render=function(P,C,D){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||P.length===0)return;const E=s.getRenderTarget(),y=s.getActiveCubeFace(),U=s.getActiveMipmapLevel(),z=s.state;z.setBlending(Li),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const F=m!==li&&this.type===li,H=m===li&&this.type!==li;for(let Z=0,B=P.length;Z<B;Z++){const he=P[Z],G=he.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",he,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const se=G.getFrameExtents();if(i.multiply(se),r.copy(G.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/se.x),i.x=r.x*se.x,G.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/se.y),i.y=r.y*se.y,G.mapSize.y=r.y)),G.map===null||F===!0||H===!0){const me=this.type!==li?{minFilter:rn,magFilter:rn}:{};G.map!==null&&G.map.dispose(),G.map=new os(i.x,i.y,me),G.map.texture.name=he.name+".shadowMap",G.camera.updateProjectionMatrix()}s.setRenderTarget(G.map),s.clear();const ae=G.getViewportCount();for(let me=0;me<ae;me++){const Le=G.getViewport(me);o.set(r.x*Le.x,r.y*Le.y,r.x*Le.z,r.y*Le.w),z.viewport(o),G.updateMatrices(he,me),n=G.getFrustum(),S(C,D,G.camera,he,this.type)}G.isPointLightShadow!==!0&&this.type===li&&w(G,D),G.needsUpdate=!1}m=this.type,p.needsUpdate=!1,s.setRenderTarget(E,y,U)};function w(P,C){const D=e.update(_);d.defines.VSM_SAMPLES!==P.blurSamples&&(d.defines.VSM_SAMPLES=P.blurSamples,f.defines.VSM_SAMPLES=P.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new os(i.x,i.y)),d.uniforms.shadow_pass.value=P.map.texture,d.uniforms.resolution.value=P.mapSize,d.uniforms.radius.value=P.radius,s.setRenderTarget(P.mapPass),s.clear(),s.renderBufferDirect(C,null,D,d,_,null),f.uniforms.shadow_pass.value=P.mapPass.texture,f.uniforms.resolution.value=P.mapSize,f.uniforms.radius.value=P.radius,s.setRenderTarget(P.map),s.clear(),s.renderBufferDirect(C,null,D,f,_,null)}function v(P,C,D,E){let y=null;const U=D.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(U!==void 0)y=U;else if(y=D.isPointLight===!0?l:a,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const z=y.uuid,F=C.uuid;let H=c[z];H===void 0&&(H={},c[z]=H);let Z=H[F];Z===void 0&&(Z=y.clone(),H[F]=Z,C.addEventListener("dispose",I)),y=Z}if(y.visible=C.visible,y.wireframe=C.wireframe,E===li?y.side=C.shadowSide!==null?C.shadowSide:C.side:y.side=C.shadowSide!==null?C.shadowSide:u[C.side],y.alphaMap=C.alphaMap,y.alphaTest=C.alphaTest,y.map=C.map,y.clipShadows=C.clipShadows,y.clippingPlanes=C.clippingPlanes,y.clipIntersection=C.clipIntersection,y.displacementMap=C.displacementMap,y.displacementScale=C.displacementScale,y.displacementBias=C.displacementBias,y.wireframeLinewidth=C.wireframeLinewidth,y.linewidth=C.linewidth,D.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const z=s.properties.get(y);z.light=D}return y}function S(P,C,D,E,y){if(P.visible===!1)return;if(P.layers.test(C.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&y===li)&&(!P.frustumCulled||n.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,P.matrixWorld);const F=e.update(P),H=P.material;if(Array.isArray(H)){const Z=F.groups;for(let B=0,he=Z.length;B<he;B++){const G=Z[B],se=H[G.materialIndex];if(se&&se.visible){const ae=v(P,se,E,y);P.onBeforeShadow(s,P,C,D,F,ae,G),s.renderBufferDirect(D,null,F,ae,P,G),P.onAfterShadow(s,P,C,D,F,ae,G)}}}else if(H.visible){const Z=v(P,H,E,y);P.onBeforeShadow(s,P,C,D,F,Z,null),s.renderBufferDirect(D,null,F,Z,P,null),P.onAfterShadow(s,P,C,D,F,Z,null)}}const z=P.children;for(let F=0,H=z.length;F<H;F++)S(z[F],C,D,E,y)}function I(P){P.target.removeEventListener("dispose",I);for(const D in c){const E=c[D],y=P.target.uuid;y in E&&(E[y].dispose(),delete E[y])}}}function kv(s){function e(){let M=!1;const j=new Tt;let $=null;const fe=new Tt(0,0,0,0);return{setMask:function(Ee){$!==Ee&&!M&&(s.colorMask(Ee,Ee,Ee,Ee),$=Ee)},setLocked:function(Ee){M=Ee},setClear:function(Ee,it,ct,Ct,Ut){Ut===!0&&(Ee*=Ct,it*=Ct,ct*=Ct),j.set(Ee,it,ct,Ct),fe.equals(j)===!1&&(s.clearColor(Ee,it,ct,Ct),fe.copy(j))},reset:function(){M=!1,$=null,fe.set(-1,0,0,0)}}}function t(){let M=!1,j=null,$=null,fe=null;return{setTest:function(Ee){Ee?ne(s.DEPTH_TEST):te(s.DEPTH_TEST)},setMask:function(Ee){j!==Ee&&!M&&(s.depthMask(Ee),j=Ee)},setFunc:function(Ee){if($!==Ee){switch(Ee){case Gp:s.depthFunc(s.NEVER);break;case Wp:s.depthFunc(s.ALWAYS);break;case jp:s.depthFunc(s.LESS);break;case ta:s.depthFunc(s.LEQUAL);break;case Xp:s.depthFunc(s.EQUAL);break;case qp:s.depthFunc(s.GEQUAL);break;case $p:s.depthFunc(s.GREATER);break;case Yp:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}$=Ee}},setLocked:function(Ee){M=Ee},setClear:function(Ee){fe!==Ee&&(s.clearDepth(Ee),fe=Ee)},reset:function(){M=!1,j=null,$=null,fe=null}}}function n(){let M=!1,j=null,$=null,fe=null,Ee=null,it=null,ct=null,Ct=null,Ut=null;return{setTest:function(ft){M||(ft?ne(s.STENCIL_TEST):te(s.STENCIL_TEST))},setMask:function(ft){j!==ft&&!M&&(s.stencilMask(ft),j=ft)},setFunc:function(ft,pt,St){($!==ft||fe!==pt||Ee!==St)&&(s.stencilFunc(ft,pt,St),$=ft,fe=pt,Ee=St)},setOp:function(ft,pt,St){(it!==ft||ct!==pt||Ct!==St)&&(s.stencilOp(ft,pt,St),it=ft,ct=pt,Ct=St)},setLocked:function(ft){M=ft},setClear:function(ft){Ut!==ft&&(s.clearStencil(ft),Ut=ft)},reset:function(){M=!1,j=null,$=null,fe=null,Ee=null,it=null,ct=null,Ct=null,Ut=null}}}const i=new e,r=new t,o=new n,a=new WeakMap,l=new WeakMap;let c={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,p=null,m=null,w=null,v=null,S=null,I=null,P=new Xe(0,0,0),C=0,D=!1,E=null,y=null,U=null,z=null,F=null;const H=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,B=0;const he=s.getParameter(s.VERSION);he.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(he)[1]),Z=B>=1):he.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(he)[1]),Z=B>=2);let G=null,se={};const ae=s.getParameter(s.SCISSOR_BOX),me=s.getParameter(s.VIEWPORT),Le=new Tt().fromArray(ae),Ae=new Tt().fromArray(me);function W(M,j,$,fe){const Ee=new Uint8Array(4),it=s.createTexture();s.bindTexture(M,it),s.texParameteri(M,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(M,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ct=0;ct<$;ct++)M===s.TEXTURE_3D||M===s.TEXTURE_2D_ARRAY?s.texImage3D(j,0,s.RGBA,1,1,fe,0,s.RGBA,s.UNSIGNED_BYTE,Ee):s.texImage2D(j+ct,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ee);return it}const ee={};ee[s.TEXTURE_2D]=W(s.TEXTURE_2D,s.TEXTURE_2D,1),ee[s.TEXTURE_CUBE_MAP]=W(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),ee[s.TEXTURE_2D_ARRAY]=W(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ee[s.TEXTURE_3D]=W(s.TEXTURE_3D,s.TEXTURE_3D,1,1),i.setClear(0,0,0,1),r.setClear(1),o.setClear(0),ne(s.DEPTH_TEST),r.setFunc(ta),be(!1),pe(oh),ne(s.CULL_FACE),_e(Li);function ne(M){c[M]!==!0&&(s.enable(M),c[M]=!0)}function te(M){c[M]!==!1&&(s.disable(M),c[M]=!1)}function Ne(M,j){return h[M]!==j?(s.bindFramebuffer(M,j),h[M]=j,M===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=j),M===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=j),!0):!1}function qe(M,j){let $=d,fe=!1;if(M){$=u.get(j),$===void 0&&($=[],u.set(j,$));const Ee=M.textures;if($.length!==Ee.length||$[0]!==s.COLOR_ATTACHMENT0){for(let it=0,ct=Ee.length;it<ct;it++)$[it]=s.COLOR_ATTACHMENT0+it;$.length=Ee.length,fe=!0}}else $[0]!==s.BACK&&($[0]=s.BACK,fe=!0);fe&&s.drawBuffers($)}function V(M){return f!==M?(s.useProgram(M),f=M,!0):!1}const at={[Qi]:s.FUNC_ADD,[Tp]:s.FUNC_SUBTRACT,[Ap]:s.FUNC_REVERSE_SUBTRACT};at[Cp]=s.MIN,at[Rp]=s.MAX;const re={[Lp]:s.ZERO,[Pp]:s.ONE,[Np]:s.SRC_COLOR,[zl]:s.SRC_ALPHA,[kp]:s.SRC_ALPHA_SATURATE,[Op]:s.DST_COLOR,[Dp]:s.DST_ALPHA,[Ip]:s.ONE_MINUS_SRC_COLOR,[Hl]:s.ONE_MINUS_SRC_ALPHA,[Fp]:s.ONE_MINUS_DST_COLOR,[Up]:s.ONE_MINUS_DST_ALPHA,[Bp]:s.CONSTANT_COLOR,[zp]:s.ONE_MINUS_CONSTANT_COLOR,[Hp]:s.CONSTANT_ALPHA,[Vp]:s.ONE_MINUS_CONSTANT_ALPHA};function _e(M,j,$,fe,Ee,it,ct,Ct,Ut,ft){if(M===Li){g===!0&&(te(s.BLEND),g=!1);return}if(g===!1&&(ne(s.BLEND),g=!0),M!==wp){if(M!==_||ft!==D){if((p!==Qi||v!==Qi)&&(s.blendEquation(s.FUNC_ADD),p=Qi,v=Qi),ft)switch(M){case Gs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ah:s.blendFunc(s.ONE,s.ONE);break;case lh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case ch:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",M);break}else switch(M){case Gs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ah:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case lh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case ch:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",M);break}m=null,w=null,S=null,I=null,P.set(0,0,0),C=0,_=M,D=ft}return}Ee=Ee||j,it=it||$,ct=ct||fe,(j!==p||Ee!==v)&&(s.blendEquationSeparate(at[j],at[Ee]),p=j,v=Ee),($!==m||fe!==w||it!==S||ct!==I)&&(s.blendFuncSeparate(re[$],re[fe],re[it],re[ct]),m=$,w=fe,S=it,I=ct),(Ct.equals(P)===!1||Ut!==C)&&(s.blendColor(Ct.r,Ct.g,Ct.b,Ut),P.copy(Ct),C=Ut),_=M,D=!1}function ce(M,j){M.side===vn?te(s.CULL_FACE):ne(s.CULL_FACE);let $=M.side===hn;j&&($=!$),be($),M.blending===Gs&&M.transparent===!1?_e(Li):_e(M.blending,M.blendEquation,M.blendSrc,M.blendDst,M.blendEquationAlpha,M.blendSrcAlpha,M.blendDstAlpha,M.blendColor,M.blendAlpha,M.premultipliedAlpha),r.setFunc(M.depthFunc),r.setTest(M.depthTest),r.setMask(M.depthWrite),i.setMask(M.colorWrite);const fe=M.stencilWrite;o.setTest(fe),fe&&(o.setMask(M.stencilWriteMask),o.setFunc(M.stencilFunc,M.stencilRef,M.stencilFuncMask),o.setOp(M.stencilFail,M.stencilZFail,M.stencilZPass)),We(M.polygonOffset,M.polygonOffsetFactor,M.polygonOffsetUnits),M.alphaToCoverage===!0?ne(s.SAMPLE_ALPHA_TO_COVERAGE):te(s.SAMPLE_ALPHA_TO_COVERAGE)}function be(M){E!==M&&(M?s.frontFace(s.CW):s.frontFace(s.CCW),E=M)}function pe(M){M!==Mp?(ne(s.CULL_FACE),M!==y&&(M===oh?s.cullFace(s.BACK):M===Sp?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):te(s.CULL_FACE),y=M}function Pe(M){M!==U&&(Z&&s.lineWidth(M),U=M)}function We(M,j,$){M?(ne(s.POLYGON_OFFSET_FILL),(z!==j||F!==$)&&(s.polygonOffset(j,$),z=j,F=$)):te(s.POLYGON_OFFSET_FILL)}function O(M){M?ne(s.SCISSOR_TEST):te(s.SCISSOR_TEST)}function A(M){M===void 0&&(M=s.TEXTURE0+H-1),G!==M&&(s.activeTexture(M),G=M)}function q(M,j,$){$===void 0&&(G===null?$=s.TEXTURE0+H-1:$=G);let fe=se[$];fe===void 0&&(fe={type:void 0,texture:void 0},se[$]=fe),(fe.type!==M||fe.texture!==j)&&(G!==$&&(s.activeTexture($),G=$),s.bindTexture(M,j||ee[M]),fe.type=M,fe.texture=j)}function le(){const M=se[G];M!==void 0&&M.type!==void 0&&(s.bindTexture(M.type,null),M.type=void 0,M.texture=void 0)}function de(){try{s.compressedTexImage2D.apply(s,arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function ue(){try{s.compressedTexImage3D.apply(s,arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function He(){try{s.texSubImage2D.apply(s,arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function we(){try{s.texSubImage3D.apply(s,arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function Me(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function Qe(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function xe(){try{s.texStorage2D.apply(s,arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function Be(){try{s.texStorage3D.apply(s,arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function rt(){try{s.texImage2D.apply(s,arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function Ye(){try{s.texImage3D.apply(s,arguments)}catch(M){console.error("THREE.WebGLState:",M)}}function De(M){Le.equals(M)===!1&&(s.scissor(M.x,M.y,M.z,M.w),Le.copy(M))}function nt(M){Ae.equals(M)===!1&&(s.viewport(M.x,M.y,M.z,M.w),Ae.copy(M))}function lt(M,j){let $=l.get(j);$===void 0&&($=new WeakMap,l.set(j,$));let fe=$.get(M);fe===void 0&&(fe=s.getUniformBlockIndex(j,M.name),$.set(M,fe))}function vt(M,j){const fe=l.get(j).get(M);a.get(j)!==fe&&(s.uniformBlockBinding(j,fe,M.__bindingPointIndex),a.set(j,fe))}function st(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),c={},G=null,se={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,p=null,m=null,w=null,v=null,S=null,I=null,P=new Xe(0,0,0),C=0,D=!1,E=null,y=null,U=null,z=null,F=null,Le.set(0,0,s.canvas.width,s.canvas.height),Ae.set(0,0,s.canvas.width,s.canvas.height),i.reset(),r.reset(),o.reset()}return{buffers:{color:i,depth:r,stencil:o},enable:ne,disable:te,bindFramebuffer:Ne,drawBuffers:qe,useProgram:V,setBlending:_e,setMaterial:ce,setFlipSided:be,setCullFace:pe,setLineWidth:Pe,setPolygonOffset:We,setScissorTest:O,activeTexture:A,bindTexture:q,unbindTexture:le,compressedTexImage2D:de,compressedTexImage3D:ue,texImage2D:rt,texImage3D:Ye,updateUBOMapping:lt,uniformBlockBinding:vt,texStorage2D:xe,texStorage3D:Be,texSubImage2D:He,texSubImage3D:we,compressedTexSubImage2D:Me,compressedTexSubImage3D:Qe,scissor:De,viewport:nt,reset:st}}function Bv(s,e,t,n,i,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ye,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(O,A){return f?new OffscreenCanvas(O,A):zr("canvas")}function _(O,A,q){let le=1;const de=We(O);if((de.width>q||de.height>q)&&(le=q/Math.max(de.width,de.height)),le<1)if(typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&O instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&O instanceof ImageBitmap||typeof VideoFrame<"u"&&O instanceof VideoFrame){const ue=Math.floor(le*de.width),He=Math.floor(le*de.height);u===void 0&&(u=g(ue,He));const we=A?g(ue,He):u;return we.width=ue,we.height=He,we.getContext("2d").drawImage(O,0,0,ue,He),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+de.width+"x"+de.height+") to ("+ue+"x"+He+")."),we}else return"data"in O&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+de.width+"x"+de.height+")."),O;return O}function p(O){return O.generateMipmaps&&O.minFilter!==rn&&O.minFilter!==Zt}function m(O){s.generateMipmap(O)}function w(O,A,q,le,de=!1){if(O!==null){if(s[O]!==void 0)return s[O];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+O+"'")}let ue=A;if(A===s.RED&&(q===s.FLOAT&&(ue=s.R32F),q===s.HALF_FLOAT&&(ue=s.R16F),q===s.UNSIGNED_BYTE&&(ue=s.R8)),A===s.RED_INTEGER&&(q===s.UNSIGNED_BYTE&&(ue=s.R8UI),q===s.UNSIGNED_SHORT&&(ue=s.R16UI),q===s.UNSIGNED_INT&&(ue=s.R32UI),q===s.BYTE&&(ue=s.R8I),q===s.SHORT&&(ue=s.R16I),q===s.INT&&(ue=s.R32I)),A===s.RG&&(q===s.FLOAT&&(ue=s.RG32F),q===s.HALF_FLOAT&&(ue=s.RG16F),q===s.UNSIGNED_BYTE&&(ue=s.RG8)),A===s.RG_INTEGER&&(q===s.UNSIGNED_BYTE&&(ue=s.RG8UI),q===s.UNSIGNED_SHORT&&(ue=s.RG16UI),q===s.UNSIGNED_INT&&(ue=s.RG32UI),q===s.BYTE&&(ue=s.RG8I),q===s.SHORT&&(ue=s.RG16I),q===s.INT&&(ue=s.RG32I)),A===s.RGB&&q===s.UNSIGNED_INT_5_9_9_9_REV&&(ue=s.RGB9_E5),A===s.RGBA){const He=de?ia:xt.getTransfer(le);q===s.FLOAT&&(ue=s.RGBA32F),q===s.HALF_FLOAT&&(ue=s.RGBA16F),q===s.UNSIGNED_BYTE&&(ue=He===Rt?s.SRGB8_ALPHA8:s.RGBA8),q===s.UNSIGNED_SHORT_4_4_4_4&&(ue=s.RGBA4),q===s.UNSIGNED_SHORT_5_5_5_1&&(ue=s.RGB5_A1)}return(ue===s.R16F||ue===s.R32F||ue===s.RG16F||ue===s.RG32F||ue===s.RGBA16F||ue===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ue}function v(O,A){return p(O)===!0||O.isFramebufferTexture&&O.minFilter!==rn&&O.minFilter!==Zt?Math.log2(Math.max(A.width,A.height))+1:O.mipmaps!==void 0&&O.mipmaps.length>0?O.mipmaps.length:O.isCompressedTexture&&Array.isArray(O.image)?A.mipmaps.length:1}function S(O){const A=O.target;A.removeEventListener("dispose",S),P(A),A.isVideoTexture&&h.delete(A)}function I(O){const A=O.target;A.removeEventListener("dispose",I),D(A)}function P(O){const A=n.get(O);if(A.__webglInit===void 0)return;const q=O.source,le=d.get(q);if(le){const de=le[A.__cacheKey];de.usedTimes--,de.usedTimes===0&&C(O),Object.keys(le).length===0&&d.delete(q)}n.remove(O)}function C(O){const A=n.get(O);s.deleteTexture(A.__webglTexture);const q=O.source,le=d.get(q);delete le[A.__cacheKey],o.memory.textures--}function D(O){const A=n.get(O);if(O.depthTexture&&O.depthTexture.dispose(),O.isWebGLCubeRenderTarget)for(let le=0;le<6;le++){if(Array.isArray(A.__webglFramebuffer[le]))for(let de=0;de<A.__webglFramebuffer[le].length;de++)s.deleteFramebuffer(A.__webglFramebuffer[le][de]);else s.deleteFramebuffer(A.__webglFramebuffer[le]);A.__webglDepthbuffer&&s.deleteRenderbuffer(A.__webglDepthbuffer[le])}else{if(Array.isArray(A.__webglFramebuffer))for(let le=0;le<A.__webglFramebuffer.length;le++)s.deleteFramebuffer(A.__webglFramebuffer[le]);else s.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&s.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&s.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let le=0;le<A.__webglColorRenderbuffer.length;le++)A.__webglColorRenderbuffer[le]&&s.deleteRenderbuffer(A.__webglColorRenderbuffer[le]);A.__webglDepthRenderbuffer&&s.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const q=O.textures;for(let le=0,de=q.length;le<de;le++){const ue=n.get(q[le]);ue.__webglTexture&&(s.deleteTexture(ue.__webglTexture),o.memory.textures--),n.remove(q[le])}n.remove(O)}let E=0;function y(){E=0}function U(){const O=E;return O>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+O+" texture units while this GPU supports only "+i.maxTextures),E+=1,O}function z(O){const A=[];return A.push(O.wrapS),A.push(O.wrapT),A.push(O.wrapR||0),A.push(O.magFilter),A.push(O.minFilter),A.push(O.anisotropy),A.push(O.internalFormat),A.push(O.format),A.push(O.type),A.push(O.generateMipmaps),A.push(O.premultiplyAlpha),A.push(O.flipY),A.push(O.unpackAlignment),A.push(O.colorSpace),A.join()}function F(O,A){const q=n.get(O);if(O.isVideoTexture&&pe(O),O.isRenderTargetTexture===!1&&O.version>0&&q.__version!==O.version){const le=O.image;if(le===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(le.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Le(q,O,A);return}}t.bindTexture(s.TEXTURE_2D,q.__webglTexture,s.TEXTURE0+A)}function H(O,A){const q=n.get(O);if(O.version>0&&q.__version!==O.version){Le(q,O,A);return}t.bindTexture(s.TEXTURE_2D_ARRAY,q.__webglTexture,s.TEXTURE0+A)}function Z(O,A){const q=n.get(O);if(O.version>0&&q.__version!==O.version){Le(q,O,A);return}t.bindTexture(s.TEXTURE_3D,q.__webglTexture,s.TEXTURE0+A)}function B(O,A){const q=n.get(O);if(O.version>0&&q.__version!==O.version){Ae(q,O,A);return}t.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture,s.TEXTURE0+A)}const he={[Wn]:s.REPEAT,[bn]:s.CLAMP_TO_EDGE,[na]:s.MIRRORED_REPEAT},G={[rn]:s.NEAREST,[$d]:s.NEAREST_MIPMAP_NEAREST,[wr]:s.NEAREST_MIPMAP_LINEAR,[Zt]:s.LINEAR,[Ko]:s.LINEAR_MIPMAP_NEAREST,[In]:s.LINEAR_MIPMAP_LINEAR},se={[xm]:s.NEVER,[Tm]:s.ALWAYS,[bm]:s.LESS,[rf]:s.LEQUAL,[Em]:s.EQUAL,[wm]:s.GEQUAL,[Mm]:s.GREATER,[Sm]:s.NOTEQUAL};function ae(O,A){if(A.type===jn&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===Zt||A.magFilter===Ko||A.magFilter===wr||A.magFilter===In||A.minFilter===Zt||A.minFilter===Ko||A.minFilter===wr||A.minFilter===In)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(O,s.TEXTURE_WRAP_S,he[A.wrapS]),s.texParameteri(O,s.TEXTURE_WRAP_T,he[A.wrapT]),(O===s.TEXTURE_3D||O===s.TEXTURE_2D_ARRAY)&&s.texParameteri(O,s.TEXTURE_WRAP_R,he[A.wrapR]),s.texParameteri(O,s.TEXTURE_MAG_FILTER,G[A.magFilter]),s.texParameteri(O,s.TEXTURE_MIN_FILTER,G[A.minFilter]),A.compareFunction&&(s.texParameteri(O,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(O,s.TEXTURE_COMPARE_FUNC,se[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===rn||A.minFilter!==wr&&A.minFilter!==In||A.type===jn&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){const q=e.get("EXT_texture_filter_anisotropic");s.texParameterf(O,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,i.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function me(O,A){let q=!1;O.__webglInit===void 0&&(O.__webglInit=!0,A.addEventListener("dispose",S));const le=A.source;let de=d.get(le);de===void 0&&(de={},d.set(le,de));const ue=z(A);if(ue!==O.__cacheKey){de[ue]===void 0&&(de[ue]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,q=!0),de[ue].usedTimes++;const He=de[O.__cacheKey];He!==void 0&&(de[O.__cacheKey].usedTimes--,He.usedTimes===0&&C(A)),O.__cacheKey=ue,O.__webglTexture=de[ue].texture}return q}function Le(O,A,q){let le=s.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(le=s.TEXTURE_2D_ARRAY),A.isData3DTexture&&(le=s.TEXTURE_3D);const de=me(O,A),ue=A.source;t.bindTexture(le,O.__webglTexture,s.TEXTURE0+q);const He=n.get(ue);if(ue.version!==He.__version||de===!0){t.activeTexture(s.TEXTURE0+q);const we=xt.getPrimaries(xt.workingColorSpace),Me=A.colorSpace===Ai?null:xt.getPrimaries(A.colorSpace),Qe=A.colorSpace===Ai||we===Me?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qe);let xe=_(A.image,!1,i.maxTextureSize);xe=Pe(A,xe);const Be=r.convert(A.format,A.colorSpace),rt=r.convert(A.type);let Ye=w(A.internalFormat,Be,rt,A.colorSpace,A.isVideoTexture);ae(le,A);let De;const nt=A.mipmaps,lt=A.isVideoTexture!==!0,vt=He.__version===void 0||de===!0,st=ue.dataReady,M=v(A,xe);if(A.isDepthTexture)Ye=s.DEPTH_COMPONENT16,A.type===jn?Ye=s.DEPTH_COMPONENT32F:A.type===Ks?Ye=s.DEPTH_COMPONENT24:A.type===$r&&(Ye=s.DEPTH24_STENCIL8),vt&&(lt?t.texStorage2D(s.TEXTURE_2D,1,Ye,xe.width,xe.height):t.texImage2D(s.TEXTURE_2D,0,Ye,xe.width,xe.height,0,Be,rt,null));else if(A.isDataTexture)if(nt.length>0){lt&&vt&&t.texStorage2D(s.TEXTURE_2D,M,Ye,nt[0].width,nt[0].height);for(let j=0,$=nt.length;j<$;j++)De=nt[j],lt?st&&t.texSubImage2D(s.TEXTURE_2D,j,0,0,De.width,De.height,Be,rt,De.data):t.texImage2D(s.TEXTURE_2D,j,Ye,De.width,De.height,0,Be,rt,De.data);A.generateMipmaps=!1}else lt?(vt&&t.texStorage2D(s.TEXTURE_2D,M,Ye,xe.width,xe.height),st&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,xe.width,xe.height,Be,rt,xe.data)):t.texImage2D(s.TEXTURE_2D,0,Ye,xe.width,xe.height,0,Be,rt,xe.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){lt&&vt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,M,Ye,nt[0].width,nt[0].height,xe.depth);for(let j=0,$=nt.length;j<$;j++)De=nt[j],A.format!==Dn?Be!==null?lt?st&&t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,j,0,0,0,De.width,De.height,xe.depth,Be,De.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,j,Ye,De.width,De.height,xe.depth,0,De.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):lt?st&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,j,0,0,0,De.width,De.height,xe.depth,Be,rt,De.data):t.texImage3D(s.TEXTURE_2D_ARRAY,j,Ye,De.width,De.height,xe.depth,0,Be,rt,De.data)}else{lt&&vt&&t.texStorage2D(s.TEXTURE_2D,M,Ye,nt[0].width,nt[0].height);for(let j=0,$=nt.length;j<$;j++)De=nt[j],A.format!==Dn?Be!==null?lt?st&&t.compressedTexSubImage2D(s.TEXTURE_2D,j,0,0,De.width,De.height,Be,De.data):t.compressedTexImage2D(s.TEXTURE_2D,j,Ye,De.width,De.height,0,De.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):lt?st&&t.texSubImage2D(s.TEXTURE_2D,j,0,0,De.width,De.height,Be,rt,De.data):t.texImage2D(s.TEXTURE_2D,j,Ye,De.width,De.height,0,Be,rt,De.data)}else if(A.isDataArrayTexture)lt?(vt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,M,Ye,xe.width,xe.height,xe.depth),st&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,xe.width,xe.height,xe.depth,Be,rt,xe.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,Ye,xe.width,xe.height,xe.depth,0,Be,rt,xe.data);else if(A.isData3DTexture)lt?(vt&&t.texStorage3D(s.TEXTURE_3D,M,Ye,xe.width,xe.height,xe.depth),st&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,xe.width,xe.height,xe.depth,Be,rt,xe.data)):t.texImage3D(s.TEXTURE_3D,0,Ye,xe.width,xe.height,xe.depth,0,Be,rt,xe.data);else if(A.isFramebufferTexture){if(vt)if(lt)t.texStorage2D(s.TEXTURE_2D,M,Ye,xe.width,xe.height);else{let j=xe.width,$=xe.height;for(let fe=0;fe<M;fe++)t.texImage2D(s.TEXTURE_2D,fe,Ye,j,$,0,Be,rt,null),j>>=1,$>>=1}}else if(nt.length>0){if(lt&&vt){const j=We(nt[0]);t.texStorage2D(s.TEXTURE_2D,M,Ye,j.width,j.height)}for(let j=0,$=nt.length;j<$;j++)De=nt[j],lt?st&&t.texSubImage2D(s.TEXTURE_2D,j,0,0,Be,rt,De):t.texImage2D(s.TEXTURE_2D,j,Ye,Be,rt,De);A.generateMipmaps=!1}else if(lt){if(vt){const j=We(xe);t.texStorage2D(s.TEXTURE_2D,M,Ye,j.width,j.height)}st&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Be,rt,xe)}else t.texImage2D(s.TEXTURE_2D,0,Ye,Be,rt,xe);p(A)&&m(le),He.__version=ue.version,A.onUpdate&&A.onUpdate(A)}O.__version=A.version}function Ae(O,A,q){if(A.image.length!==6)return;const le=me(O,A),de=A.source;t.bindTexture(s.TEXTURE_CUBE_MAP,O.__webglTexture,s.TEXTURE0+q);const ue=n.get(de);if(de.version!==ue.__version||le===!0){t.activeTexture(s.TEXTURE0+q);const He=xt.getPrimaries(xt.workingColorSpace),we=A.colorSpace===Ai?null:xt.getPrimaries(A.colorSpace),Me=A.colorSpace===Ai||He===we?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);const Qe=A.isCompressedTexture||A.image[0].isCompressedTexture,xe=A.image[0]&&A.image[0].isDataTexture,Be=[];for(let $=0;$<6;$++)!Qe&&!xe?Be[$]=_(A.image[$],!0,i.maxCubemapSize):Be[$]=xe?A.image[$].image:A.image[$],Be[$]=Pe(A,Be[$]);const rt=Be[0],Ye=r.convert(A.format,A.colorSpace),De=r.convert(A.type),nt=w(A.internalFormat,Ye,De,A.colorSpace),lt=A.isVideoTexture!==!0,vt=ue.__version===void 0||le===!0,st=de.dataReady;let M=v(A,rt);ae(s.TEXTURE_CUBE_MAP,A);let j;if(Qe){lt&&vt&&t.texStorage2D(s.TEXTURE_CUBE_MAP,M,nt,rt.width,rt.height);for(let $=0;$<6;$++){j=Be[$].mipmaps;for(let fe=0;fe<j.length;fe++){const Ee=j[fe];A.format!==Dn?Ye!==null?lt?st&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,fe,0,0,Ee.width,Ee.height,Ye,Ee.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,fe,nt,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):lt?st&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,fe,0,0,Ee.width,Ee.height,Ye,De,Ee.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,fe,nt,Ee.width,Ee.height,0,Ye,De,Ee.data)}}}else{if(j=A.mipmaps,lt&&vt){j.length>0&&M++;const $=We(Be[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,M,nt,$.width,$.height)}for(let $=0;$<6;$++)if(xe){lt?st&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Be[$].width,Be[$].height,Ye,De,Be[$].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,nt,Be[$].width,Be[$].height,0,Ye,De,Be[$].data);for(let fe=0;fe<j.length;fe++){const it=j[fe].image[$].image;lt?st&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,fe+1,0,0,it.width,it.height,Ye,De,it.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,fe+1,nt,it.width,it.height,0,Ye,De,it.data)}}else{lt?st&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Ye,De,Be[$]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,nt,Ye,De,Be[$]);for(let fe=0;fe<j.length;fe++){const Ee=j[fe];lt?st&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,fe+1,0,0,Ye,De,Ee.image[$]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,fe+1,nt,Ye,De,Ee.image[$])}}}p(A)&&m(s.TEXTURE_CUBE_MAP),ue.__version=de.version,A.onUpdate&&A.onUpdate(A)}O.__version=A.version}function W(O,A,q,le,de,ue){const He=r.convert(q.format,q.colorSpace),we=r.convert(q.type),Me=w(q.internalFormat,He,we,q.colorSpace);if(!n.get(A).__hasExternalTextures){const xe=Math.max(1,A.width>>ue),Be=Math.max(1,A.height>>ue);de===s.TEXTURE_3D||de===s.TEXTURE_2D_ARRAY?t.texImage3D(de,ue,Me,xe,Be,A.depth,0,He,we,null):t.texImage2D(de,ue,Me,xe,Be,0,He,we,null)}t.bindFramebuffer(s.FRAMEBUFFER,O),be(A)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,le,de,n.get(q).__webglTexture,0,ce(A)):(de===s.TEXTURE_2D||de>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&de<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,le,de,n.get(q).__webglTexture,ue),t.bindFramebuffer(s.FRAMEBUFFER,null)}function ee(O,A,q){if(s.bindRenderbuffer(s.RENDERBUFFER,O),A.depthBuffer&&!A.stencilBuffer){let le=s.DEPTH_COMPONENT24;if(q||be(A)){const de=A.depthTexture;de&&de.isDepthTexture&&(de.type===jn?le=s.DEPTH_COMPONENT32F:de.type===Ks&&(le=s.DEPTH_COMPONENT24));const ue=ce(A);be(A)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ue,le,A.width,A.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,ue,le,A.width,A.height)}else s.renderbufferStorage(s.RENDERBUFFER,le,A.width,A.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,O)}else if(A.depthBuffer&&A.stencilBuffer){const le=ce(A);q&&be(A)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,le,s.DEPTH24_STENCIL8,A.width,A.height):be(A)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,le,s.DEPTH24_STENCIL8,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,O)}else{const le=A.textures;for(let de=0;de<le.length;de++){const ue=le[de],He=r.convert(ue.format,ue.colorSpace),we=r.convert(ue.type),Me=w(ue.internalFormat,He,we,ue.colorSpace),Qe=ce(A);q&&be(A)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Qe,Me,A.width,A.height):be(A)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Qe,Me,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,Me,A.width,A.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ne(O,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,O),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),F(A.depthTexture,0);const le=n.get(A.depthTexture).__webglTexture,de=ce(A);if(A.depthTexture.format===Ws)be(A)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,le,0,de):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,le,0);else if(A.depthTexture.format===kr)be(A)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,le,0,de):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,le,0);else throw new Error("Unknown depthTexture format")}function te(O){const A=n.get(O),q=O.isWebGLCubeRenderTarget===!0;if(O.depthTexture&&!A.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");ne(A.__webglFramebuffer,O)}else if(q){A.__webglDepthbuffer=[];for(let le=0;le<6;le++)t.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer[le]),A.__webglDepthbuffer[le]=s.createRenderbuffer(),ee(A.__webglDepthbuffer[le],O,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer=s.createRenderbuffer(),ee(A.__webglDepthbuffer,O,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ne(O,A,q){const le=n.get(O);A!==void 0&&W(le.__webglFramebuffer,O,O.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),q!==void 0&&te(O)}function qe(O){const A=O.texture,q=n.get(O),le=n.get(A);O.addEventListener("dispose",I);const de=O.textures,ue=O.isWebGLCubeRenderTarget===!0,He=de.length>1;if(He||(le.__webglTexture===void 0&&(le.__webglTexture=s.createTexture()),le.__version=A.version,o.memory.textures++),ue){q.__webglFramebuffer=[];for(let we=0;we<6;we++)if(A.mipmaps&&A.mipmaps.length>0){q.__webglFramebuffer[we]=[];for(let Me=0;Me<A.mipmaps.length;Me++)q.__webglFramebuffer[we][Me]=s.createFramebuffer()}else q.__webglFramebuffer[we]=s.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){q.__webglFramebuffer=[];for(let we=0;we<A.mipmaps.length;we++)q.__webglFramebuffer[we]=s.createFramebuffer()}else q.__webglFramebuffer=s.createFramebuffer();if(He)for(let we=0,Me=de.length;we<Me;we++){const Qe=n.get(de[we]);Qe.__webglTexture===void 0&&(Qe.__webglTexture=s.createTexture(),o.memory.textures++)}if(O.samples>0&&be(O)===!1){q.__webglMultisampledFramebuffer=s.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let we=0;we<de.length;we++){const Me=de[we];q.__webglColorRenderbuffer[we]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,q.__webglColorRenderbuffer[we]);const Qe=r.convert(Me.format,Me.colorSpace),xe=r.convert(Me.type),Be=w(Me.internalFormat,Qe,xe,Me.colorSpace,O.isXRRenderTarget===!0),rt=ce(O);s.renderbufferStorageMultisample(s.RENDERBUFFER,rt,Be,O.width,O.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+we,s.RENDERBUFFER,q.__webglColorRenderbuffer[we])}s.bindRenderbuffer(s.RENDERBUFFER,null),O.depthBuffer&&(q.__webglDepthRenderbuffer=s.createRenderbuffer(),ee(q.__webglDepthRenderbuffer,O,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ue){t.bindTexture(s.TEXTURE_CUBE_MAP,le.__webglTexture),ae(s.TEXTURE_CUBE_MAP,A);for(let we=0;we<6;we++)if(A.mipmaps&&A.mipmaps.length>0)for(let Me=0;Me<A.mipmaps.length;Me++)W(q.__webglFramebuffer[we][Me],O,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+we,Me);else W(q.__webglFramebuffer[we],O,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+we,0);p(A)&&m(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(He){for(let we=0,Me=de.length;we<Me;we++){const Qe=de[we],xe=n.get(Qe);t.bindTexture(s.TEXTURE_2D,xe.__webglTexture),ae(s.TEXTURE_2D,Qe),W(q.__webglFramebuffer,O,Qe,s.COLOR_ATTACHMENT0+we,s.TEXTURE_2D,0),p(Qe)&&m(s.TEXTURE_2D)}t.unbindTexture()}else{let we=s.TEXTURE_2D;if((O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(we=O.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(we,le.__webglTexture),ae(we,A),A.mipmaps&&A.mipmaps.length>0)for(let Me=0;Me<A.mipmaps.length;Me++)W(q.__webglFramebuffer[Me],O,A,s.COLOR_ATTACHMENT0,we,Me);else W(q.__webglFramebuffer,O,A,s.COLOR_ATTACHMENT0,we,0);p(A)&&m(we),t.unbindTexture()}O.depthBuffer&&te(O)}function V(O){const A=O.textures;for(let q=0,le=A.length;q<le;q++){const de=A[q];if(p(de)){const ue=O.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,He=n.get(de).__webglTexture;t.bindTexture(ue,He),m(ue),t.unbindTexture()}}}const at=[],re=[];function _e(O){if(O.samples>0){if(be(O)===!1){const A=O.textures,q=O.width,le=O.height;let de=s.COLOR_BUFFER_BIT;const ue=O.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,He=n.get(O),we=A.length>1;if(we)for(let Me=0;Me<A.length;Me++)t.bindFramebuffer(s.FRAMEBUFFER,He.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Me,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,He.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Me,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,He.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,He.__webglFramebuffer);for(let Me=0;Me<A.length;Me++){if(O.resolveDepthBuffer&&(O.depthBuffer&&(de|=s.DEPTH_BUFFER_BIT),O.stencilBuffer&&O.resolveStencilBuffer&&(de|=s.STENCIL_BUFFER_BIT)),we){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,He.__webglColorRenderbuffer[Me]);const Qe=n.get(A[Me]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Qe,0)}s.blitFramebuffer(0,0,q,le,0,0,q,le,de,s.NEAREST),l===!0&&(at.length=0,re.length=0,at.push(s.COLOR_ATTACHMENT0+Me),O.depthBuffer&&O.resolveDepthBuffer===!1&&(at.push(ue),re.push(ue),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,re)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,at))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),we)for(let Me=0;Me<A.length;Me++){t.bindFramebuffer(s.FRAMEBUFFER,He.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Me,s.RENDERBUFFER,He.__webglColorRenderbuffer[Me]);const Qe=n.get(A[Me]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,He.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Me,s.TEXTURE_2D,Qe,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,He.__webglMultisampledFramebuffer)}else if(O.depthBuffer&&O.resolveDepthBuffer===!1&&l){const A=O.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[A])}}}function ce(O){return Math.min(i.maxSamples,O.samples)}function be(O){const A=n.get(O);return O.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function pe(O){const A=o.render.frame;h.get(O)!==A&&(h.set(O,A),O.update())}function Pe(O,A){const q=O.colorSpace,le=O.format,de=O.type;return O.isCompressedTexture===!0||O.isVideoTexture===!0||q!==Yt&&q!==Ai&&(xt.getTransfer(q)===Rt?(le!==Dn||de!==Ui)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),A}function We(O){return typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement?(c.width=O.naturalWidth||O.width,c.height=O.naturalHeight||O.height):typeof VideoFrame<"u"&&O instanceof VideoFrame?(c.width=O.displayWidth,c.height=O.displayHeight):(c.width=O.width,c.height=O.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=y,this.setTexture2D=F,this.setTexture2DArray=H,this.setTexture3D=Z,this.setTextureCube=B,this.rebindTextures=Ne,this.setupRenderTarget=qe,this.updateRenderTargetMipmap=V,this.updateMultisampleRenderTarget=_e,this.setupDepthRenderbuffer=te,this.setupFrameBufferTexture=W,this.useMultisampledRTT=be}function zv(s,e){function t(n,i=Ai){let r;const o=xt.getTransfer(i);if(n===Ui)return s.UNSIGNED_BYTE;if(n===Jd)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Zd)return s.UNSIGNED_SHORT_5_5_5_1;if(n===lm)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===om)return s.BYTE;if(n===am)return s.SHORT;if(n===Yd)return s.UNSIGNED_SHORT;if(n===Kd)return s.INT;if(n===Ks)return s.UNSIGNED_INT;if(n===jn)return s.FLOAT;if(n===ma)return s.HALF_FLOAT;if(n===cm)return s.ALPHA;if(n===hm)return s.RGB;if(n===Dn)return s.RGBA;if(n===um)return s.LUMINANCE;if(n===dm)return s.LUMINANCE_ALPHA;if(n===Ws)return s.DEPTH_COMPONENT;if(n===kr)return s.DEPTH_STENCIL;if(n===Qd)return s.RED;if(n===ef)return s.RED_INTEGER;if(n===fm)return s.RG;if(n===tf)return s.RG_INTEGER;if(n===nf)return s.RGBA_INTEGER;if(n===Ua||n===Oa||n===Fa||n===ka)if(o===Rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ua)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Oa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Fa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ka)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ua)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Oa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Fa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ka)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===uh||n===dh||n===fh||n===ph)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===uh)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===dh)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===fh)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ph)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===mh||n===gh||n===_h)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===mh||n===gh)return o===Rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===_h)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===yh||n===vh||n===xh||n===bh||n===Eh||n===Mh||n===Sh||n===wh||n===Th||n===Ah||n===Ch||n===Rh||n===Lh||n===Ph)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===yh)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===vh)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===xh)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===bh)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Eh)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Mh)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Sh)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===wh)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Th)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ah)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ch)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Rh)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Lh)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ph)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ba||n===Nh||n===Ih)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ba)return o===Rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Nh)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ih)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===pm||n===Dh||n===Uh||n===Oh)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ba)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Dh)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Uh)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Oh)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===$r?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}class Hv extends $t{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class pi extends At{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Vv={type:"move"};class ul{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),m=this._getHandJoint(c,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Vv)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new pi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Gv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Wv=`
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

}`;class jv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new Vt,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}render(e,t){if(this.texture!==null){if(this.mesh===null){const n=t.cameras[0].viewport,i=new Oi({vertexShader:Gv,fragmentShader:Wv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Bt(new Yr(20,20),i)}e.render(this.mesh,t)}}reset(){this.texture=null,this.mesh=null}}class Xv extends hs{constructor(e,t){super();const n=this;let i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const _=new jv,p=t.getContextAttributes();let m=null,w=null;const v=[],S=[],I=new ye;let P=null;const C=new $t;C.layers.enable(1),C.viewport=new Tt;const D=new $t;D.layers.enable(2),D.viewport=new Tt;const E=[C,D],y=new Hv;y.layers.enable(1),y.layers.enable(2);let U=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let ee=v[W];return ee===void 0&&(ee=new ul,v[W]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(W){let ee=v[W];return ee===void 0&&(ee=new ul,v[W]=ee),ee.getGripSpace()},this.getHand=function(W){let ee=v[W];return ee===void 0&&(ee=new ul,v[W]=ee),ee.getHandSpace()};function F(W){const ee=S.indexOf(W.inputSource);if(ee===-1)return;const ne=v[ee];ne!==void 0&&(ne.update(W.inputSource,W.frame,c||o),ne.dispatchEvent({type:W.type,data:W.inputSource}))}function H(){i.removeEventListener("select",F),i.removeEventListener("selectstart",F),i.removeEventListener("selectend",F),i.removeEventListener("squeeze",F),i.removeEventListener("squeezestart",F),i.removeEventListener("squeezeend",F),i.removeEventListener("end",H),i.removeEventListener("inputsourceschange",Z);for(let W=0;W<v.length;W++){const ee=S[W];ee!==null&&(S[W]=null,v[W].disconnect(ee))}U=null,z=null,_.reset(),e.setRenderTarget(m),f=null,d=null,u=null,i=null,w=null,Ae.stop(),n.isPresenting=!1,e.setPixelRatio(P),e.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(W){if(i=W,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",F),i.addEventListener("selectstart",F),i.addEventListener("selectend",F),i.addEventListener("squeeze",F),i.addEventListener("squeezestart",F),i.addEventListener("squeezeend",F),i.addEventListener("end",H),i.addEventListener("inputsourceschange",Z),p.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(I),i.renderState.layers===void 0){const ee={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,ee),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),w=new os(f.framebufferWidth,f.framebufferHeight,{format:Dn,type:Ui,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let ee=null,ne=null,te=null;p.depth&&(te=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=p.stencil?kr:Ws,ne=p.stencil?$r:Ks);const Ne={colorFormat:t.RGBA8,depthFormat:te,scaleFactor:r};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(Ne),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),w=new os(d.textureWidth,d.textureHeight,{format:Dn,type:Ui,depthTexture:new _f(d.textureWidth,d.textureHeight,ne,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Ae.setContext(i),Ae.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function Z(W){for(let ee=0;ee<W.removed.length;ee++){const ne=W.removed[ee],te=S.indexOf(ne);te>=0&&(S[te]=null,v[te].disconnect(ne))}for(let ee=0;ee<W.added.length;ee++){const ne=W.added[ee];let te=S.indexOf(ne);if(te===-1){for(let qe=0;qe<v.length;qe++)if(qe>=S.length){S.push(ne),te=qe;break}else if(S[qe]===null){S[qe]=ne,te=qe;break}if(te===-1)break}const Ne=v[te];Ne&&Ne.connect(ne)}}const B=new k,he=new k;function G(W,ee,ne){B.setFromMatrixPosition(ee.matrixWorld),he.setFromMatrixPosition(ne.matrixWorld);const te=B.distanceTo(he),Ne=ee.projectionMatrix.elements,qe=ne.projectionMatrix.elements,V=Ne[14]/(Ne[10]-1),at=Ne[14]/(Ne[10]+1),re=(Ne[9]+1)/Ne[5],_e=(Ne[9]-1)/Ne[5],ce=(Ne[8]-1)/Ne[0],be=(qe[8]+1)/qe[0],pe=V*ce,Pe=V*be,We=te/(-ce+be),O=We*-ce;ee.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(O),W.translateZ(We),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert();const A=V+We,q=at+We,le=pe-O,de=Pe+(te-O),ue=re*at/q*A,He=_e*at/q*A;W.projectionMatrix.makePerspective(le,de,ue,He,A,q),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}function se(W,ee){ee===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(ee.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(i===null)return;_.texture!==null&&(W.near=_.depthNear,W.far=_.depthFar),y.near=D.near=C.near=W.near,y.far=D.far=C.far=W.far,(U!==y.near||z!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),U=y.near,z=y.far,C.near=U,C.far=z,D.near=U,D.far=z,C.updateProjectionMatrix(),D.updateProjectionMatrix(),W.updateProjectionMatrix());const ee=W.parent,ne=y.cameras;se(y,ee);for(let te=0;te<ne.length;te++)se(ne[te],ee);ne.length===2?G(y,C,D):y.projectionMatrix.copy(C.projectionMatrix),ae(W,y,ee)};function ae(W,ee,ne){ne===null?W.matrix.copy(ee.matrixWorld):(W.matrix.copy(ne.matrixWorld),W.matrix.invert(),W.matrix.multiply(ee.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(ee.projectionMatrix),W.projectionMatrixInverse.copy(ee.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Zs*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(W){l=W,d!==null&&(d.fixedFoveation=W),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=W)},this.hasDepthSensing=function(){return _.texture!==null};let me=null;function Le(W,ee){if(h=ee.getViewerPose(c||o),g=ee,h!==null){const ne=h.views;f!==null&&(e.setRenderTargetFramebuffer(w,f.framebuffer),e.setRenderTarget(w));let te=!1;ne.length!==y.cameras.length&&(y.cameras.length=0,te=!0);for(let qe=0;qe<ne.length;qe++){const V=ne[qe];let at=null;if(f!==null)at=f.getViewport(V);else{const _e=u.getViewSubImage(d,V);at=_e.viewport,qe===0&&(e.setRenderTargetTextures(w,_e.colorTexture,d.ignoreDepthValues?void 0:_e.depthStencilTexture),e.setRenderTarget(w))}let re=E[qe];re===void 0&&(re=new $t,re.layers.enable(qe),re.viewport=new Tt,E[qe]=re),re.matrix.fromArray(V.transform.matrix),re.matrix.decompose(re.position,re.quaternion,re.scale),re.projectionMatrix.fromArray(V.projectionMatrix),re.projectionMatrixInverse.copy(re.projectionMatrix).invert(),re.viewport.set(at.x,at.y,at.width,at.height),qe===0&&(y.matrix.copy(re.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),te===!0&&y.cameras.push(re)}const Ne=i.enabledFeatures;if(Ne&&Ne.includes("depth-sensing")){const qe=u.getDepthInformation(ne[0]);qe&&qe.isValid&&qe.texture&&_.init(e,qe,i.renderState)}}for(let ne=0;ne<v.length;ne++){const te=S[ne],Ne=v[ne];te!==null&&Ne!==void 0&&Ne.update(te,ee,c||o)}_.render(e,y),me&&me(W,ee),ee.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ee}),g=null}const Ae=new gf;Ae.setAnimationLoop(Le),this.setAnimationLoop=function(W){me=W},this.dispose=function(){}}}const $i=new on,qv=new $e;function $v(s,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,ff(s)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,w,v,S){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),u(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m)):m.isMeshStandardMaterial?(r(p,m),d(p,m),m.isMeshPhysicalMaterial&&f(p,m,S)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),_(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?l(p,m,w,v):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===hn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===hn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const w=e.get(m),v=w.envMap,S=w.envMapRotation;if(v&&(p.envMap.value=v,$i.copy(S),$i.x*=-1,$i.y*=-1,$i.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&($i.y*=-1,$i.z*=-1),p.envMapRotation.value.setFromMatrix4(qv.makeRotationFromEuler($i)),p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap){p.lightMap.value=m.lightMap;const I=s._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=m.lightMapIntensity*I,t(m.lightMap,p.lightMapTransform)}m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,w,v){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*w,p.scale.value=v*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,w){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===hn&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=w.texture,p.transmissionSamplerSize.value.set(w.width,w.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const w=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(w.matrixWorld),p.nearDistance.value=w.shadow.camera.near,p.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Yv(s,e,t,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,v){const S=v.program;n.uniformBlockBinding(w,S)}function c(w,v){let S=i[w.id];S===void 0&&(g(w),S=h(w),i[w.id]=S,w.addEventListener("dispose",p));const I=v.program;n.updateUBOMapping(w,I);const P=e.render.frame;r[w.id]!==P&&(d(w),r[w.id]=P)}function h(w){const v=u();w.__bindingPointIndex=v;const S=s.createBuffer(),I=w.__size,P=w.usage;return s.bindBuffer(s.UNIFORM_BUFFER,S),s.bufferData(s.UNIFORM_BUFFER,I,P),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,v,S),S}function u(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(w){const v=i[w.id],S=w.uniforms,I=w.__cache;s.bindBuffer(s.UNIFORM_BUFFER,v);for(let P=0,C=S.length;P<C;P++){const D=Array.isArray(S[P])?S[P]:[S[P]];for(let E=0,y=D.length;E<y;E++){const U=D[E];if(f(U,P,E,I)===!0){const z=U.__offset,F=Array.isArray(U.value)?U.value:[U.value];let H=0;for(let Z=0;Z<F.length;Z++){const B=F[Z],he=_(B);typeof B=="number"||typeof B=="boolean"?(U.__data[0]=B,s.bufferSubData(s.UNIFORM_BUFFER,z+H,U.__data)):B.isMatrix3?(U.__data[0]=B.elements[0],U.__data[1]=B.elements[1],U.__data[2]=B.elements[2],U.__data[3]=0,U.__data[4]=B.elements[3],U.__data[5]=B.elements[4],U.__data[6]=B.elements[5],U.__data[7]=0,U.__data[8]=B.elements[6],U.__data[9]=B.elements[7],U.__data[10]=B.elements[8],U.__data[11]=0):(B.toArray(U.__data,H),H+=he.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,z,U.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(w,v,S,I){const P=w.value,C=v+"_"+S;if(I[C]===void 0)return typeof P=="number"||typeof P=="boolean"?I[C]=P:I[C]=P.clone(),!0;{const D=I[C];if(typeof P=="number"||typeof P=="boolean"){if(D!==P)return I[C]=P,!0}else if(D.equals(P)===!1)return D.copy(P),!0}return!1}function g(w){const v=w.uniforms;let S=0;const I=16;for(let C=0,D=v.length;C<D;C++){const E=Array.isArray(v[C])?v[C]:[v[C]];for(let y=0,U=E.length;y<U;y++){const z=E[y],F=Array.isArray(z.value)?z.value:[z.value];for(let H=0,Z=F.length;H<Z;H++){const B=F[H],he=_(B),G=S%I;G!==0&&I-G<he.boundary&&(S+=I-G),z.__data=new Float32Array(he.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=S,S+=he.storage}}}const P=S%I;return P>0&&(S+=I-P),w.__size=S,w.__cache={},this}function _(w){const v={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(v.boundary=4,v.storage=4):w.isVector2?(v.boundary=8,v.storage=8):w.isVector3||w.isColor?(v.boundary=16,v.storage=12):w.isVector4?(v.boundary=16,v.storage=16):w.isMatrix3?(v.boundary=48,v.storage=48):w.isMatrix4?(v.boundary=64,v.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),v}function p(w){const v=w.target;v.removeEventListener("dispose",p);const S=o.indexOf(v.__bindingPointIndex);o.splice(S,1),s.deleteBuffer(i[v.id]),delete i[v.id],delete r[v.id]}function m(){for(const w in i)s.deleteBuffer(i[w]);o=[],i={},r={}}return{bind:l,update:c,dispose:m}}class Kv{constructor(e={}){const{canvas:t=Gm(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const m=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ot,this._useLegacyLights=!1,this.toneMapping=Pi,this.toneMappingExposure=1;const v=this;let S=!1,I=0,P=0,C=null,D=-1,E=null;const y=new Tt,U=new Tt;let z=null;const F=new Xe(0);let H=0,Z=t.width,B=t.height,he=1,G=null,se=null;const ae=new Tt(0,0,Z,B),me=new Tt(0,0,Z,B);let Le=!1;const Ae=new fc;let W=!1,ee=!1;const ne=new $e,te=new k,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function qe(){return C===null?he:1}let V=n;function at(N,X){return t.getContext(N,X)}try{const N={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${cc}`),t.addEventListener("webglcontextlost",M,!1),t.addEventListener("webglcontextrestored",j,!1),t.addEventListener("webglcontextcreationerror",$,!1),V===null){const X="webgl2";if(V=at(X,N),V===null)throw at(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(N){throw console.error("THREE.WebGLRenderer: "+N.message),N}let re,_e,ce,be,pe,Pe,We,O,A,q,le,de,ue,He,we,Me,Qe,xe,Be,rt,Ye,De,nt,lt;function vt(){re=new sy(V),re.init(),De=new zv(V,re),_e=new Z0(V,re,e,De),ce=new kv(V),be=new ay(V),pe=new Sv,Pe=new Bv(V,re,ce,pe,_e,De,be),We=new ey(v),O=new iy(v),A=new pg(V),nt=new K0(V,A),q=new ry(V,A,be,nt),le=new cy(V,q,A,be),Be=new ly(V,_e,Pe),Me=new Q0(pe),de=new Mv(v,We,O,re,_e,nt,Me),ue=new $v(v,pe),He=new Tv,we=new Nv(re),xe=new Y0(v,We,O,ce,le,d,l),Qe=new Fv(v,le,_e),lt=new Yv(V,be,_e,ce),rt=new J0(V,re,be),Ye=new oy(V,re,be),be.programs=de.programs,v.capabilities=_e,v.extensions=re,v.properties=pe,v.renderLists=He,v.shadowMap=Qe,v.state=ce,v.info=be}vt();const st=new Xv(v,V);this.xr=st,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){const N=re.get("WEBGL_lose_context");N&&N.loseContext()},this.forceContextRestore=function(){const N=re.get("WEBGL_lose_context");N&&N.restoreContext()},this.getPixelRatio=function(){return he},this.setPixelRatio=function(N){N!==void 0&&(he=N,this.setSize(Z,B,!1))},this.getSize=function(N){return N.set(Z,B)},this.setSize=function(N,X,Q=!0){if(st.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=N,B=X,t.width=Math.floor(N*he),t.height=Math.floor(X*he),Q===!0&&(t.style.width=N+"px",t.style.height=X+"px"),this.setViewport(0,0,N,X)},this.getDrawingBufferSize=function(N){return N.set(Z*he,B*he).floor()},this.setDrawingBufferSize=function(N,X,Q){Z=N,B=X,he=Q,t.width=Math.floor(N*Q),t.height=Math.floor(X*Q),this.setViewport(0,0,N,X)},this.getCurrentViewport=function(N){return N.copy(y)},this.getViewport=function(N){return N.copy(ae)},this.setViewport=function(N,X,Q,Y){N.isVector4?ae.set(N.x,N.y,N.z,N.w):ae.set(N,X,Q,Y),ce.viewport(y.copy(ae).multiplyScalar(he).round())},this.getScissor=function(N){return N.copy(me)},this.setScissor=function(N,X,Q,Y){N.isVector4?me.set(N.x,N.y,N.z,N.w):me.set(N,X,Q,Y),ce.scissor(U.copy(me).multiplyScalar(he).round())},this.getScissorTest=function(){return Le},this.setScissorTest=function(N){ce.setScissorTest(Le=N)},this.setOpaqueSort=function(N){G=N},this.setTransparentSort=function(N){se=N},this.getClearColor=function(N){return N.copy(xe.getClearColor())},this.setClearColor=function(){xe.setClearColor.apply(xe,arguments)},this.getClearAlpha=function(){return xe.getClearAlpha()},this.setClearAlpha=function(){xe.setClearAlpha.apply(xe,arguments)},this.clear=function(N=!0,X=!0,Q=!0){let Y=0;if(N){let K=!1;if(C!==null){const Ce=C.texture.format;K=Ce===nf||Ce===tf||Ce===ef}if(K){const Ce=C.texture.type,ke=Ce===Ui||Ce===Ks||Ce===Yd||Ce===$r||Ce===Jd||Ce===Zd,Ve=xe.getClearColor(),Fe=xe.getClearAlpha(),Je=Ve.r,tt=Ve.g,ot=Ve.b;ke?(f[0]=Je,f[1]=tt,f[2]=ot,f[3]=Fe,V.clearBufferuiv(V.COLOR,0,f)):(g[0]=Je,g[1]=tt,g[2]=ot,g[3]=Fe,V.clearBufferiv(V.COLOR,0,g))}else Y|=V.COLOR_BUFFER_BIT}X&&(Y|=V.DEPTH_BUFFER_BIT),Q&&(Y|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",M,!1),t.removeEventListener("webglcontextrestored",j,!1),t.removeEventListener("webglcontextcreationerror",$,!1),He.dispose(),we.dispose(),pe.dispose(),We.dispose(),O.dispose(),le.dispose(),nt.dispose(),lt.dispose(),de.dispose(),st.dispose(),st.removeEventListener("sessionstart",ft),st.removeEventListener("sessionend",pt),St.stop()};function M(N){N.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function j(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const N=be.autoReset,X=Qe.enabled,Q=Qe.autoUpdate,Y=Qe.needsUpdate,K=Qe.type;vt(),be.autoReset=N,Qe.enabled=X,Qe.autoUpdate=Q,Qe.needsUpdate=Y,Qe.type=K}function $(N){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",N.statusMessage)}function fe(N){const X=N.target;X.removeEventListener("dispose",fe),Ee(X)}function Ee(N){it(N),pe.remove(N)}function it(N){const X=pe.get(N).programs;X!==void 0&&(X.forEach(function(Q){de.releaseProgram(Q)}),N.isShaderMaterial&&de.releaseShaderCache(N))}this.renderBufferDirect=function(N,X,Q,Y,K,Ce){X===null&&(X=Ne);const ke=K.isMesh&&K.matrixWorld.determinant()<0,Ve=io(N,X,Q,Y,K);ce.setMaterial(Y,ke);let Fe=Q.index,Je=1;if(Y.wireframe===!0){if(Fe=q.getWireframeAttribute(Q),Fe===void 0)return;Je=2}const tt=Q.drawRange,ot=Q.attributes.position;let Dt=tt.start*Je,zt=(tt.start+tt.count)*Je;Ce!==null&&(Dt=Math.max(Dt,Ce.start*Je),zt=Math.min(zt,(Ce.start+Ce.count)*Je)),Fe!==null?(Dt=Math.max(Dt,0),zt=Math.min(zt,Fe.count)):ot!=null&&(Dt=Math.max(Dt,0),zt=Math.min(zt,ot.count));const Qt=zt-Dt;if(Qt<0||Qt===1/0)return;nt.setup(K,Y,Ve,Q,Fe);let Sn,mt=rt;if(Fe!==null&&(Sn=A.get(Fe),mt=Ye,mt.setIndex(Sn)),K.isMesh)Y.wireframe===!0?(ce.setLineWidth(Y.wireframeLinewidth*qe()),mt.setMode(V.LINES)):mt.setMode(V.TRIANGLES);else if(K.isLine){let et=Y.linewidth;et===void 0&&(et=1),ce.setLineWidth(et*qe()),K.isLineSegments?mt.setMode(V.LINES):K.isLineLoop?mt.setMode(V.LINE_LOOP):mt.setMode(V.LINE_STRIP)}else K.isPoints?mt.setMode(V.POINTS):K.isSprite&&mt.setMode(V.TRIANGLES);if(K.isBatchedMesh)K._multiDrawInstances!==null?mt.renderMultiDrawInstances(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount,K._multiDrawInstances):mt.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else if(K.isInstancedMesh)mt.renderInstances(Dt,Qt,K.count);else if(Q.isInstancedBufferGeometry){const et=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,gi=Math.min(Q.instanceCount,et);mt.renderInstances(Dt,Qt,gi)}else mt.render(Dt,Qt)};function ct(N,X,Q){N.transparent===!0&&N.side===vn&&N.forceSinglePass===!1?(N.side=hn,N.needsUpdate=!0,fs(N,X,Q),N.side=qn,N.needsUpdate=!0,fs(N,X,Q),N.side=vn):fs(N,X,Q)}this.compile=function(N,X,Q=null){Q===null&&(Q=N),p=we.get(Q),p.init(X),w.push(p),Q.traverseVisible(function(K){K.isLight&&K.layers.test(X.layers)&&(p.pushLight(K),K.castShadow&&p.pushShadow(K))}),N!==Q&&N.traverseVisible(function(K){K.isLight&&K.layers.test(X.layers)&&(p.pushLight(K),K.castShadow&&p.pushShadow(K))}),p.setupLights(v._useLegacyLights);const Y=new Set;return N.traverse(function(K){const Ce=K.material;if(Ce)if(Array.isArray(Ce))for(let ke=0;ke<Ce.length;ke++){const Ve=Ce[ke];ct(Ve,Q,K),Y.add(Ve)}else ct(Ce,Q,K),Y.add(Ce)}),w.pop(),p=null,Y},this.compileAsync=function(N,X,Q=null){const Y=this.compile(N,X,Q);return new Promise(K=>{function Ce(){if(Y.forEach(function(ke){pe.get(ke).currentProgram.isReady()&&Y.delete(ke)}),Y.size===0){K(N);return}setTimeout(Ce,10)}re.get("KHR_parallel_shader_compile")!==null?Ce():setTimeout(Ce,10)})};let Ct=null;function Ut(N){Ct&&Ct(N)}function ft(){St.stop()}function pt(){St.start()}const St=new gf;St.setAnimationLoop(Ut),typeof self<"u"&&St.setContext(self),this.setAnimationLoop=function(N){Ct=N,st.setAnimationLoop(N),N===null?St.stop():St.start()},st.addEventListener("sessionstart",ft),st.addEventListener("sessionend",pt),this.render=function(N,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(st.cameraAutoUpdate===!0&&st.updateCamera(X),X=st.getCamera()),N.isScene===!0&&N.onBeforeRender(v,N,X,C),p=we.get(N,w.length),p.init(X),w.push(p),ne.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),Ae.setFromProjectionMatrix(ne),ee=this.localClippingEnabled,W=Me.init(this.clippingPlanes,ee),_=He.get(N,m.length),_.init(),m.push(_),kn(N,X,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(G,se);const Q=st.enabled===!1||st.isPresenting===!1||st.hasDepthSensing()===!1;Q&&xe.addToRenderList(_,N),this.info.render.frame++,W===!0&&Me.beginShadows();const Y=p.state.shadowsArray;Qe.render(Y,N,X),W===!0&&Me.endShadows(),this.info.autoReset===!0&&this.info.reset();const K=_.opaque,Ce=_.transmissive;if(p.setupLights(v._useLegacyLights),X.isArrayCamera){const ke=X.cameras;if(Ce.length>0)for(let Ve=0,Fe=ke.length;Ve<Fe;Ve++){const Je=ke[Ve];Bn(K,Ce,N,Je)}Q&&xe.render(N);for(let Ve=0,Fe=ke.length;Ve<Fe;Ve++){const Je=ke[Ve];an(_,N,Je,Je.viewport)}}else Ce.length>0&&Bn(K,Ce,N,X),Q&&xe.render(N),an(_,N,X);C!==null&&(Pe.updateMultisampleRenderTarget(C),Pe.updateRenderTargetMipmap(C)),N.isScene===!0&&N.onAfterRender(v,N,X),nt.resetDefaultState(),D=-1,E=null,w.pop(),w.length>0?(p=w[w.length-1],W===!0&&Me.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function kn(N,X,Q,Y){if(N.visible===!1)return;if(N.layers.test(X.layers)){if(N.isGroup)Q=N.renderOrder;else if(N.isLOD)N.autoUpdate===!0&&N.update(X);else if(N.isLight)p.pushLight(N),N.castShadow&&p.pushShadow(N);else if(N.isSprite){if(!N.frustumCulled||Ae.intersectsSprite(N)){Y&&te.setFromMatrixPosition(N.matrixWorld).applyMatrix4(ne);const ke=le.update(N),Ve=N.material;Ve.visible&&_.push(N,ke,Ve,Q,te.z,null)}}else if((N.isMesh||N.isLine||N.isPoints)&&(!N.frustumCulled||Ae.intersectsObject(N))){const ke=le.update(N),Ve=N.material;if(Y&&(N.boundingSphere!==void 0?(N.boundingSphere===null&&N.computeBoundingSphere(),te.copy(N.boundingSphere.center)):(ke.boundingSphere===null&&ke.computeBoundingSphere(),te.copy(ke.boundingSphere.center)),te.applyMatrix4(N.matrixWorld).applyMatrix4(ne)),Array.isArray(Ve)){const Fe=ke.groups;for(let Je=0,tt=Fe.length;Je<tt;Je++){const ot=Fe[Je],Dt=Ve[ot.materialIndex];Dt&&Dt.visible&&_.push(N,ke,Dt,Q,te.z,ot)}}else Ve.visible&&_.push(N,ke,Ve,Q,te.z,null)}}const Ce=N.children;for(let ke=0,Ve=Ce.length;ke<Ve;ke++)kn(Ce[ke],X,Q,Y)}function an(N,X,Q,Y){const K=N.opaque,Ce=N.transmissive,ke=N.transparent;p.setupLightsView(Q),W===!0&&Me.setGlobalState(v.clippingPlanes,Q),Y&&ce.viewport(y.copy(Y)),K.length>0&&Mn(K,X,Q),Ce.length>0&&Mn(Ce,X,Q),ke.length>0&&Mn(ke,X,Q),ce.buffers.depth.setTest(!0),ce.buffers.depth.setMask(!0),ce.buffers.color.setMask(!0),ce.setPolygonOffset(!1)}function Bn(N,X,Q,Y){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Y.id]===void 0&&(p.state.transmissionRenderTarget[Y.id]=new os(1,1,{generateMipmaps:!0,type:re.has("EXT_color_buffer_half_float")||re.has("EXT_color_buffer_float")?ma:Ui,minFilter:In,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1}));const Ce=p.state.transmissionRenderTarget[Y.id],ke=Y.viewport||y;Ce.setSize(ke.z,ke.w);const Ve=v.getRenderTarget();v.setRenderTarget(Ce),v.getClearColor(F),H=v.getClearAlpha(),H<1&&v.setClearColor(16777215,.5),v.clear();const Fe=v.toneMapping;v.toneMapping=Pi;const Je=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),p.setupLightsView(Y),W===!0&&Me.setGlobalState(v.clippingPlanes,Y),Mn(N,Q,Y),Pe.updateMultisampleRenderTarget(Ce),Pe.updateRenderTargetMipmap(Ce),re.has("WEBGL_multisampled_render_to_texture")===!1){let tt=!1;for(let ot=0,Dt=X.length;ot<Dt;ot++){const zt=X[ot],Qt=zt.object,Sn=zt.geometry,mt=zt.material,et=zt.group;if(mt.side===vn&&Qt.layers.test(Y.layers)){const gi=mt.side;mt.side=hn,mt.needsUpdate=!0,Hi(Qt,Q,Y,Sn,mt,et),mt.side=gi,mt.needsUpdate=!0,tt=!0}}tt===!0&&(Pe.updateMultisampleRenderTarget(Ce),Pe.updateRenderTargetMipmap(Ce))}v.setRenderTarget(Ve),v.setClearColor(F,H),Je!==void 0&&(Y.viewport=Je),v.toneMapping=Fe}function Mn(N,X,Q){const Y=X.isScene===!0?X.overrideMaterial:null;for(let K=0,Ce=N.length;K<Ce;K++){const ke=N[K],Ve=ke.object,Fe=ke.geometry,Je=Y===null?ke.material:Y,tt=ke.group;Ve.layers.test(Q.layers)&&Hi(Ve,X,Q,Fe,Je,tt)}}function Hi(N,X,Q,Y,K,Ce){N.onBeforeRender(v,X,Q,Y,K,Ce),N.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,N.matrixWorld),N.normalMatrix.getNormalMatrix(N.modelViewMatrix),K.onBeforeRender(v,X,Q,Y,N,Ce),K.transparent===!0&&K.side===vn&&K.forceSinglePass===!1?(K.side=hn,K.needsUpdate=!0,v.renderBufferDirect(Q,X,Y,K,N,Ce),K.side=qn,K.needsUpdate=!0,v.renderBufferDirect(Q,X,Y,K,N,Ce),K.side=vn):v.renderBufferDirect(Q,X,Y,K,N,Ce),N.onAfterRender(v,X,Q,Y,K,Ce)}function fs(N,X,Q){X.isScene!==!0&&(X=Ne);const Y=pe.get(N),K=p.state.lights,Ce=p.state.shadowsArray,ke=K.state.version,Ve=de.getParameters(N,K.state,Ce,X,Q),Fe=de.getProgramCacheKey(Ve);let Je=Y.programs;Y.environment=N.isMeshStandardMaterial?X.environment:null,Y.fog=X.fog,Y.envMap=(N.isMeshStandardMaterial?O:We).get(N.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&N.envMap===null?X.environmentRotation:N.envMapRotation,Je===void 0&&(N.addEventListener("dispose",fe),Je=new Map,Y.programs=Je);let tt=Je.get(Fe);if(tt!==void 0){if(Y.currentProgram===tt&&Y.lightsStateVersion===ke)return no(N,Ve),tt}else Ve.uniforms=de.getUniforms(N),N.onBuild(Q,Ve,v),N.onBeforeCompile(Ve,v),tt=de.acquireProgram(Ve,Fe),Je.set(Fe,tt),Y.uniforms=Ve.uniforms;const ot=Y.uniforms;return(!N.isShaderMaterial&&!N.isRawShaderMaterial||N.clipping===!0)&&(ot.clippingPlanes=Me.uniform),no(N,Ve),Y.needsLights=Ia(N),Y.lightsStateVersion=ke,Y.needsLights&&(ot.ambientLightColor.value=K.state.ambient,ot.lightProbe.value=K.state.probe,ot.directionalLights.value=K.state.directional,ot.directionalLightShadows.value=K.state.directionalShadow,ot.spotLights.value=K.state.spot,ot.spotLightShadows.value=K.state.spotShadow,ot.rectAreaLights.value=K.state.rectArea,ot.ltc_1.value=K.state.rectAreaLTC1,ot.ltc_2.value=K.state.rectAreaLTC2,ot.pointLights.value=K.state.point,ot.pointLightShadows.value=K.state.pointShadow,ot.hemisphereLights.value=K.state.hemi,ot.directionalShadowMap.value=K.state.directionalShadowMap,ot.directionalShadowMatrix.value=K.state.directionalShadowMatrix,ot.spotShadowMap.value=K.state.spotShadowMap,ot.spotLightMatrix.value=K.state.spotLightMatrix,ot.spotLightMap.value=K.state.spotLightMap,ot.pointShadowMap.value=K.state.pointShadowMap,ot.pointShadowMatrix.value=K.state.pointShadowMatrix),Y.currentProgram=tt,Y.uniformsList=null,tt}function cr(N){if(N.uniformsList===null){const X=N.currentProgram.getUniforms();N.uniformsList=Jo.seqWithValue(X.seq,N.uniforms)}return N.uniformsList}function no(N,X){const Q=pe.get(N);Q.outputColorSpace=X.outputColorSpace,Q.batching=X.batching,Q.instancing=X.instancing,Q.instancingColor=X.instancingColor,Q.instancingMorph=X.instancingMorph,Q.skinning=X.skinning,Q.morphTargets=X.morphTargets,Q.morphNormals=X.morphNormals,Q.morphColors=X.morphColors,Q.morphTargetsCount=X.morphTargetsCount,Q.numClippingPlanes=X.numClippingPlanes,Q.numIntersection=X.numClipIntersection,Q.vertexAlphas=X.vertexAlphas,Q.vertexTangents=X.vertexTangents,Q.toneMapping=X.toneMapping}function io(N,X,Q,Y,K){X.isScene!==!0&&(X=Ne),Pe.resetTextureUnits();const Ce=X.fog,ke=Y.isMeshStandardMaterial?X.environment:null,Ve=C===null?v.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Yt,Fe=(Y.isMeshStandardMaterial?O:We).get(Y.envMap||ke),Je=Y.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,tt=!!Q.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),ot=!!Q.morphAttributes.position,Dt=!!Q.morphAttributes.normal,zt=!!Q.morphAttributes.color;let Qt=Pi;Y.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Qt=v.toneMapping);const Sn=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,mt=Sn!==void 0?Sn.length:0,et=pe.get(Y),gi=p.state.lights;if(W===!0&&(ee===!0||N!==E)){const en=N===E&&Y.id===D;Me.setState(Y,N,en)}let yt=!1;Y.version===et.__version?(et.needsLights&&et.lightsStateVersion!==gi.state.version||et.outputColorSpace!==Ve||K.isBatchedMesh&&et.batching===!1||!K.isBatchedMesh&&et.batching===!0||K.isInstancedMesh&&et.instancing===!1||!K.isInstancedMesh&&et.instancing===!0||K.isSkinnedMesh&&et.skinning===!1||!K.isSkinnedMesh&&et.skinning===!0||K.isInstancedMesh&&et.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&et.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&et.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&et.instancingMorph===!1&&K.morphTexture!==null||et.envMap!==Fe||Y.fog===!0&&et.fog!==Ce||et.numClippingPlanes!==void 0&&(et.numClippingPlanes!==Me.numPlanes||et.numIntersection!==Me.numIntersection)||et.vertexAlphas!==Je||et.vertexTangents!==tt||et.morphTargets!==ot||et.morphNormals!==Dt||et.morphColors!==zt||et.toneMapping!==Qt||et.morphTargetsCount!==mt)&&(yt=!0):(yt=!0,et.__version=Y.version);let ei=et.currentProgram;yt===!0&&(ei=fs(Y,X,K));let hr=!1,Vi=!1,ps=!1;const jt=ei.getUniforms(),zn=et.uniforms;if(ce.useProgram(ei.program)&&(hr=!0,Vi=!0,ps=!0),Y.id!==D&&(D=Y.id,Vi=!0),hr||E!==N){jt.setValue(V,"projectionMatrix",N.projectionMatrix),jt.setValue(V,"viewMatrix",N.matrixWorldInverse);const en=jt.map.cameraPosition;en!==void 0&&en.setValue(V,te.setFromMatrixPosition(N.matrixWorld)),_e.logarithmicDepthBuffer&&jt.setValue(V,"logDepthBufFC",2/(Math.log(N.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&jt.setValue(V,"isOrthographic",N.isOrthographicCamera===!0),E!==N&&(E=N,Vi=!0,ps=!0)}if(K.isSkinnedMesh){jt.setOptional(V,K,"bindMatrix"),jt.setOptional(V,K,"bindMatrixInverse");const en=K.skeleton;en&&(en.boneTexture===null&&en.computeBoneTexture(),jt.setValue(V,"boneTexture",en.boneTexture,Pe))}K.isBatchedMesh&&(jt.setOptional(V,K,"batchingTexture"),jt.setValue(V,"batchingTexture",K._matricesTexture,Pe));const ur=Q.morphAttributes;if((ur.position!==void 0||ur.normal!==void 0||ur.color!==void 0)&&Be.update(K,Q,ei),(Vi||et.receiveShadow!==K.receiveShadow)&&(et.receiveShadow=K.receiveShadow,jt.setValue(V,"receiveShadow",K.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(zn.envMap.value=Fe,zn.flipEnvMap.value=Fe.isCubeTexture&&Fe.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&X.environment!==null&&(zn.envMapIntensity.value=X.environmentIntensity),Vi&&(jt.setValue(V,"toneMappingExposure",v.toneMappingExposure),et.needsLights&&Na(zn,ps),Ce&&Y.fog===!0&&ue.refreshFogUniforms(zn,Ce),ue.refreshMaterialUniforms(zn,Y,he,B,p.state.transmissionRenderTarget[N.id]),Jo.upload(V,cr(et),zn,Pe)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(Jo.upload(V,cr(et),zn,Pe),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&jt.setValue(V,"center",K.center),jt.setValue(V,"modelViewMatrix",K.modelViewMatrix),jt.setValue(V,"normalMatrix",K.normalMatrix),jt.setValue(V,"modelMatrix",K.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const en=Y.uniformsGroups;for(let Lt=0,dr=en.length;Lt<dr;Lt++){const so=en[Lt];lt.update(so,ei),lt.bind(so,ei)}}return ei}function Na(N,X){N.ambientLightColor.needsUpdate=X,N.lightProbe.needsUpdate=X,N.directionalLights.needsUpdate=X,N.directionalLightShadows.needsUpdate=X,N.pointLights.needsUpdate=X,N.pointLightShadows.needsUpdate=X,N.spotLights.needsUpdate=X,N.spotLightShadows.needsUpdate=X,N.rectAreaLights.needsUpdate=X,N.hemisphereLights.needsUpdate=X}function Ia(N){return N.isMeshLambertMaterial||N.isMeshToonMaterial||N.isMeshPhongMaterial||N.isMeshStandardMaterial||N.isShadowMaterial||N.isShaderMaterial&&N.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(N,X,Q){pe.get(N.texture).__webglTexture=X,pe.get(N.depthTexture).__webglTexture=Q;const Y=pe.get(N);Y.__hasExternalTextures=!0,Y.__autoAllocateDepthBuffer=Q===void 0,Y.__autoAllocateDepthBuffer||re.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(N,X){const Q=pe.get(N);Q.__webglFramebuffer=X,Q.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(N,X=0,Q=0){C=N,I=X,P=Q;let Y=!0,K=null,Ce=!1,ke=!1;if(N){const Fe=pe.get(N);Fe.__useDefaultFramebuffer!==void 0?(ce.bindFramebuffer(V.FRAMEBUFFER,null),Y=!1):Fe.__webglFramebuffer===void 0?Pe.setupRenderTarget(N):Fe.__hasExternalTextures&&Pe.rebindTextures(N,pe.get(N.texture).__webglTexture,pe.get(N.depthTexture).__webglTexture);const Je=N.texture;(Je.isData3DTexture||Je.isDataArrayTexture||Je.isCompressedArrayTexture)&&(ke=!0);const tt=pe.get(N).__webglFramebuffer;N.isWebGLCubeRenderTarget?(Array.isArray(tt[X])?K=tt[X][Q]:K=tt[X],Ce=!0):N.samples>0&&Pe.useMultisampledRTT(N)===!1?K=pe.get(N).__webglMultisampledFramebuffer:Array.isArray(tt)?K=tt[Q]:K=tt,y.copy(N.viewport),U.copy(N.scissor),z=N.scissorTest}else y.copy(ae).multiplyScalar(he).floor(),U.copy(me).multiplyScalar(he).floor(),z=Le;if(ce.bindFramebuffer(V.FRAMEBUFFER,K)&&Y&&ce.drawBuffers(N,K),ce.viewport(y),ce.scissor(U),ce.setScissorTest(z),Ce){const Fe=pe.get(N.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+X,Fe.__webglTexture,Q)}else if(ke){const Fe=pe.get(N.texture),Je=X||0;V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,Fe.__webglTexture,Q||0,Je)}D=-1},this.readRenderTargetPixels=function(N,X,Q,Y,K,Ce,ke){if(!(N&&N.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ve=pe.get(N).__webglFramebuffer;if(N.isWebGLCubeRenderTarget&&ke!==void 0&&(Ve=Ve[ke]),Ve){ce.bindFramebuffer(V.FRAMEBUFFER,Ve);try{const Fe=N.texture,Je=Fe.format,tt=Fe.type;if(!_e.textureFormatReadable(Je)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_e.textureTypeReadable(tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=N.width-Y&&Q>=0&&Q<=N.height-K&&V.readPixels(X,Q,Y,K,De.convert(Je),De.convert(tt),Ce)}finally{const Fe=C!==null?pe.get(C).__webglFramebuffer:null;ce.bindFramebuffer(V.FRAMEBUFFER,Fe)}}},this.copyFramebufferToTexture=function(N,X,Q=0){const Y=Math.pow(2,-Q),K=Math.floor(X.image.width*Y),Ce=Math.floor(X.image.height*Y);Pe.setTexture2D(X,0),V.copyTexSubImage2D(V.TEXTURE_2D,Q,0,0,N.x,N.y,K,Ce),ce.unbindTexture()},this.copyTextureToTexture=function(N,X,Q,Y=0){const K=X.image.width,Ce=X.image.height,ke=De.convert(Q.format),Ve=De.convert(Q.type);Pe.setTexture2D(Q,0),V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,Q.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,Q.unpackAlignment),X.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,Y,N.x,N.y,K,Ce,ke,Ve,X.image.data):X.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,Y,N.x,N.y,X.mipmaps[0].width,X.mipmaps[0].height,ke,X.mipmaps[0].data):V.texSubImage2D(V.TEXTURE_2D,Y,N.x,N.y,ke,Ve,X.image),Y===0&&Q.generateMipmaps&&V.generateMipmap(V.TEXTURE_2D),ce.unbindTexture()},this.copyTextureToTexture3D=function(N,X,Q,Y,K=0){const Ce=N.max.x-N.min.x,ke=N.max.y-N.min.y,Ve=N.max.z-N.min.z,Fe=De.convert(Y.format),Je=De.convert(Y.type);let tt;if(Y.isData3DTexture)Pe.setTexture3D(Y,0),tt=V.TEXTURE_3D;else if(Y.isDataArrayTexture||Y.isCompressedArrayTexture)Pe.setTexture2DArray(Y,0),tt=V.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,Y.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,Y.unpackAlignment);const ot=V.getParameter(V.UNPACK_ROW_LENGTH),Dt=V.getParameter(V.UNPACK_IMAGE_HEIGHT),zt=V.getParameter(V.UNPACK_SKIP_PIXELS),Qt=V.getParameter(V.UNPACK_SKIP_ROWS),Sn=V.getParameter(V.UNPACK_SKIP_IMAGES),mt=Q.isCompressedTexture?Q.mipmaps[K]:Q.image;V.pixelStorei(V.UNPACK_ROW_LENGTH,mt.width),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,mt.height),V.pixelStorei(V.UNPACK_SKIP_PIXELS,N.min.x),V.pixelStorei(V.UNPACK_SKIP_ROWS,N.min.y),V.pixelStorei(V.UNPACK_SKIP_IMAGES,N.min.z),Q.isDataTexture||Q.isData3DTexture?V.texSubImage3D(tt,K,X.x,X.y,X.z,Ce,ke,Ve,Fe,Je,mt.data):Y.isCompressedArrayTexture?V.compressedTexSubImage3D(tt,K,X.x,X.y,X.z,Ce,ke,Ve,Fe,mt.data):V.texSubImage3D(tt,K,X.x,X.y,X.z,Ce,ke,Ve,Fe,Je,mt),V.pixelStorei(V.UNPACK_ROW_LENGTH,ot),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,Dt),V.pixelStorei(V.UNPACK_SKIP_PIXELS,zt),V.pixelStorei(V.UNPACK_SKIP_ROWS,Qt),V.pixelStorei(V.UNPACK_SKIP_IMAGES,Sn),K===0&&Y.generateMipmaps&&V.generateMipmap(tt),ce.unbindTexture()},this.initTexture=function(N){N.isCubeTexture?Pe.setTextureCube(N,0):N.isData3DTexture?Pe.setTexture3D(N,0):N.isDataArrayTexture||N.isCompressedArrayTexture?Pe.setTexture2DArray(N,0):Pe.setTexture2D(N,0),ce.unbindTexture()},this.resetState=function(){I=0,P=0,C=null,ce.reset(),nt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===hc?"display-p3":"srgb",t.unpackColorSpace=xt.workingColorSpace===_a?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Mf extends At{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new on,this.environmentIntensity=1,this.environmentRotation=new on,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Jv{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=jl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=En()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return af("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=En()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=En()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const tn=new k;class mc{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyMatrix4(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyNormalMatrix(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.transformDirection(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Nn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Et(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Et(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Et(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Et(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Et(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Nn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Nn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Nn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Nn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Et(t,this.array),n=Et(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Et(t,this.array),n=Et(n,this.array),i=Et(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Et(t,this.array),n=Et(n,this.array),i=Et(i,this.array),r=Et(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new It(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new mc(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Lu=new k,Pu=new Tt,Nu=new Tt,Zv=new k,Iu=new $e,Lo=new k,dl=new Fn,Du=new $e,fl=new sr;class Sf extends Bt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=hh,this.bindMatrix=new $e,this.bindMatrixInverse=new $e,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Yn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Lo),this.boundingBox.expandByPoint(Lo)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Fn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Lo),this.boundingSphere.expandByPoint(Lo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),dl.copy(this.boundingSphere),dl.applyMatrix4(i),e.ray.intersectsSphere(dl)!==!1&&(Du.copy(i).invert(),fl.copy(e.ray).applyMatrix4(Du),!(this.boundingBox!==null&&fl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,fl)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Tt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===hh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===rm?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Pu.fromBufferAttribute(i.attributes.skinIndex,e),Nu.fromBufferAttribute(i.attributes.skinWeight,e),Lu.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=Nu.getComponent(r);if(o!==0){const a=Pu.getComponent(r);Iu.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Zv.copy(Lu).applyMatrix4(Iu),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class gc extends At{constructor(){super(),this.isBone=!0,this.type="Bone"}}class _c extends Vt{constructor(e=null,t=1,n=1,i,r,o,a,l,c=rn,h=rn,u,d){super(null,o,a,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Uu=new $e,Qv=new $e;class xa{constructor(e=[],t=[]){this.uuid=En(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new $e)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new $e;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:Qv;Uu.multiplyMatrices(a,t[r]),Uu.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new xa(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new _c(t,e,e,Dn,jn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new gc),this.bones.push(o),this.boneInverses.push(new $e().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class ql extends It{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ds=new $e,Ou=new $e,Po=[],Fu=new Yn,ex=new $e,_r=new Bt,yr=new Fn;class tx extends Bt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ql(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,ex)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Yn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ds),Fu.copy(e.boundingBox).applyMatrix4(Ds),this.boundingBox.union(Fu)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Fn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ds),yr.copy(e.boundingSphere).applyMatrix4(Ds),this.boundingSphere.union(yr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(_r.geometry=this.geometry,_r.material=this.material,_r.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),yr.copy(this.boundingSphere),yr.applyMatrix4(n),e.ray.intersectsSphere(yr)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Ds),Ou.multiplyMatrices(n,Ds),_r.matrixWorld=Ou,_r.raycast(e,Po);for(let o=0,a=Po.length;o<a;o++){const l=Po[o];l.instanceId=r,l.object=this,t.push(l)}Po.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ql(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new _c(new Float32Array(i*this.count),i,this.count,Qd,jn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Hr extends fn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Xe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const aa=new k,la=new k,ku=new $e,vr=new sr,No=new Fn,pl=new k,Bu=new k;class ba extends At{constructor(e=new qt,t=new Hr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)aa.fromBufferAttribute(t,i-1),la.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=aa.distanceTo(la);e.setAttribute("lineDistance",new wt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),No.copy(n.boundingSphere),No.applyMatrix4(i),No.radius+=r,e.ray.intersectsSphere(No)===!1)return;ku.copy(i).invert(),vr.copy(e.ray).applyMatrix4(ku);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=f,p=g-1;_<p;_+=c){const m=h.getX(_),w=h.getX(_+1),v=Io(this,e,vr,l,m,w);v&&t.push(v)}if(this.isLineLoop){const _=h.getX(g-1),p=h.getX(f),m=Io(this,e,vr,l,_,p);m&&t.push(m)}}else{const f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let _=f,p=g-1;_<p;_+=c){const m=Io(this,e,vr,l,_,_+1);m&&t.push(m)}if(this.isLineLoop){const _=Io(this,e,vr,l,g-1,f);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Io(s,e,t,n,i,r){const o=s.geometry.attributes.position;if(aa.fromBufferAttribute(o,i),la.fromBufferAttribute(o,r),t.distanceSqToSegment(aa,la,pl,Bu)>n)return;pl.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(pl);if(!(l<e.near||l>e.far))return{distance:l,point:Bu.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,object:s}}const zu=new k,Hu=new k;class yc extends ba{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)zu.fromBufferAttribute(t,i),Hu.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+zu.distanceTo(Hu);e.setAttribute("lineDistance",new wt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class nx extends ba{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class wf extends fn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Vu=new $e,$l=new sr,Do=new Fn,Uo=new k;class ix extends At{constructor(e=new qt,t=new wf){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Do.copy(n.boundingSphere),Do.applyMatrix4(i),Do.radius+=r,e.ray.intersectsSphere(Do)===!1)return;Vu.copy(i).invert(),$l.copy(e.ray).applyMatrix4(Vu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,_=f;g<_;g++){const p=c.getX(g);Uo.fromBufferAttribute(u,p),Gu(Uo,p,l,i,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,_=f;g<_;g++)Uo.fromBufferAttribute(u,g),Gu(Uo,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Gu(s,e,t,n,i,r,o){const a=$l.distanceSqToPoint(s);if(a<t){const l=new k;$l.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class Kn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);const h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),l=t||(o.isVector2?new ye:new k);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new k,i=[],r=[],o=[],a=new k,l=new $e;for(let f=0;f<=e;f++){const g=f/e;i[f]=this.getTangentAt(g,new k)}r[0]=new k,o[0]=new k;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Ht(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(Ht(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class vc extends Kn{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new ye){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class sx extends vc{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function xc(){let s=0,e=0,t=0,n=0;function i(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return s+e*r+t*o+n*a}}}const Oo=new k,ml=new xc,gl=new xc,_l=new xc;class rx extends Kn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new k){const n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(Oo.subVectors(i[0],i[1]).add(i[0]),c=Oo);const u=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(Oo.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Oo),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),p=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),p<1e-4&&(p=_),ml.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,_,p),gl.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,_,p),_l.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,_,p)}else this.curveType==="catmullrom"&&(ml.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),gl.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),_l.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(ml.calc(l),gl.calc(l),_l.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new k().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Wu(s,e,t,n,i){const r=(n-e)*.5,o=(i-t)*.5,a=s*s,l=s*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*s+t}function ox(s,e){const t=1-s;return t*t*e}function ax(s,e){return 2*(1-s)*s*e}function lx(s,e){return s*s*e}function Rr(s,e,t,n){return ox(s,e)+ax(s,t)+lx(s,n)}function cx(s,e){const t=1-s;return t*t*t*e}function hx(s,e){const t=1-s;return 3*t*t*s*e}function ux(s,e){return 3*(1-s)*s*s*e}function dx(s,e){return s*s*s*e}function Lr(s,e,t,n,i){return cx(s,e)+hx(s,t)+ux(s,n)+dx(s,i)}class Tf extends Kn{constructor(e=new ye,t=new ye,n=new ye,i=new ye){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ye){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Lr(e,i.x,r.x,o.x,a.x),Lr(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class fx extends Kn{constructor(e=new k,t=new k,n=new k,i=new k){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new k){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Lr(e,i.x,r.x,o.x,a.x),Lr(e,i.y,r.y,o.y,a.y),Lr(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Af extends Kn{constructor(e=new ye,t=new ye){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ye){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ye){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class px extends Kn{constructor(e=new k,t=new k){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new k){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new k){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Cf extends Kn{constructor(e=new ye,t=new ye,n=new ye){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ye){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Rr(e,i.x,r.x,o.x),Rr(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class mx extends Kn{constructor(e=new k,t=new k,n=new k){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new k){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Rr(e,i.x,r.x,o.x),Rr(e,i.y,r.y,o.y),Rr(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Rf extends Kn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ye){const n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(Wu(a,l.x,c.x,h.x,u.x),Wu(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new ye().fromArray(i))}return this}}var Yl=Object.freeze({__proto__:null,ArcCurve:sx,CatmullRomCurve3:rx,CubicBezierCurve:Tf,CubicBezierCurve3:fx,EllipseCurve:vc,LineCurve:Af,LineCurve3:px,QuadraticBezierCurve:Cf,QuadraticBezierCurve3:mx,SplineCurve:Rf});class gx extends Kn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Yl[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Yl[i.type]().fromJSON(i))}return this}}class Pr extends gx{constructor(e){super(),this.type="Path",this.currentPoint=new ye,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Af(this.currentPoint.clone(),new ye(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const r=new Cf(this.currentPoint.clone(),new ye(e,t),new ye(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){const a=new Tf(this.currentPoint.clone(),new ye(e,t),new ye(n,i),new ye(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Rf(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,o,a,l),this}absellipse(e,t,n,i,r,o,a,l){const c=new vc(e,t,n,i,r,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class bc extends qt{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const _=[],p=n/2;let m=0;w(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new wt(u,3)),this.setAttribute("normal",new wt(d,3)),this.setAttribute("uv",new wt(f,2));function w(){const S=new k,I=new k;let P=0;const C=(t-e)/n;for(let D=0;D<=r;D++){const E=[],y=D/r,U=y*(t-e)+e;for(let z=0;z<=i;z++){const F=z/i,H=F*l+a,Z=Math.sin(H),B=Math.cos(H);I.x=U*Z,I.y=-y*n+p,I.z=U*B,u.push(I.x,I.y,I.z),S.set(Z,C,B).normalize(),d.push(S.x,S.y,S.z),f.push(F,1-y),E.push(g++)}_.push(E)}for(let D=0;D<i;D++)for(let E=0;E<r;E++){const y=_[E][D],U=_[E+1][D],z=_[E+1][D+1],F=_[E][D+1];h.push(y,U,F),h.push(U,z,F),P+=6}c.addGroup(m,P,0),m+=P}function v(S){const I=g,P=new ye,C=new k;let D=0;const E=S===!0?e:t,y=S===!0?1:-1;for(let z=1;z<=i;z++)u.push(0,p*y,0),d.push(0,y,0),f.push(.5,.5),g++;const U=g;for(let z=0;z<=i;z++){const H=z/i*l+a,Z=Math.cos(H),B=Math.sin(H);C.x=E*B,C.y=p*y,C.z=E*Z,u.push(C.x,C.y,C.z),d.push(0,y,0),P.x=Z*.5+.5,P.y=B*.5*y+.5,f.push(P.x,P.y),g++}for(let z=0;z<i;z++){const F=I+z,H=U+z;S===!0?h.push(H,H+1,F):h.push(H+1,H,F),D+=3}c.addGroup(m,D,S===!0?1:2),m+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bc(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Lf extends Pr{constructor(e){super(e),this.uuid=En(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new Pr().fromJSON(i))}return this}}const _x={triangulate:function(s,e,t=2){const n=e&&e.length,i=n?e[0]*t:s.length;let r=Pf(s,0,i,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c,h,u,d,f;if(n&&(r=Ex(s,e,r,t)),s.length>80*t){a=c=s[0],l=h=s[1];for(let g=t;g<i;g+=t)u=s[g],d=s[g+1],u<a&&(a=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-a,h-l),f=f!==0?32767/f:0}return Vr(r,o,t,a,l,f,0),o}};function Pf(s,e,t,n,i){let r,o;if(i===Ix(s,e,t,n)>0)for(r=e;r<t;r+=n)o=ju(r,s[r],s[r+1],o);else for(r=t-n;r>=e;r-=n)o=ju(r,s[r],s[r+1],o);return o&&Ea(o,o.next)&&(Wr(o),o=o.next),o}function as(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(Ea(t,t.next)||Nt(t.prev,t,t.next)===0)){if(Wr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Vr(s,e,t,n,i,r,o){if(!s)return;!o&&r&&Ax(s,n,i,r);let a=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?vx(s,n,i,r):yx(s)){e.push(l.i/t|0),e.push(s.i/t|0),e.push(c.i/t|0),Wr(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=xx(as(s),e,t),Vr(s,e,t,n,i,r,2)):o===2&&bx(s,e,t,n,i,r):Vr(as(s),e,t,n,i,r,1);break}}}function yx(s){const e=s.prev,t=s,n=s.next;if(Nt(e,t,n)>=0)return!1;const i=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,h=i<r?i<o?i:o:r<o?r:o,u=a<l?a<c?a:c:l<c?l:c,d=i>r?i>o?i:o:r>o?r:o,f=a>l?a>c?a:c:l>c?l:c;let g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&Fs(i,a,r,l,o,c,g.x,g.y)&&Nt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function vx(s,e,t,n){const i=s.prev,r=s,o=s.next;if(Nt(i,r,o)>=0)return!1;const a=i.x,l=r.x,c=o.x,h=i.y,u=r.y,d=o.y,f=a<l?a<c?a:c:l<c?l:c,g=h<u?h<d?h:d:u<d?u:d,_=a>l?a>c?a:c:l>c?l:c,p=h>u?h>d?h:d:u>d?u:d,m=Kl(f,g,e,t,n),w=Kl(_,p,e,t,n);let v=s.prevZ,S=s.nextZ;for(;v&&v.z>=m&&S&&S.z<=w;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=p&&v!==i&&v!==o&&Fs(a,h,l,u,c,d,v.x,v.y)&&Nt(v.prev,v,v.next)>=0||(v=v.prevZ,S.x>=f&&S.x<=_&&S.y>=g&&S.y<=p&&S!==i&&S!==o&&Fs(a,h,l,u,c,d,S.x,S.y)&&Nt(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;v&&v.z>=m;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=p&&v!==i&&v!==o&&Fs(a,h,l,u,c,d,v.x,v.y)&&Nt(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;S&&S.z<=w;){if(S.x>=f&&S.x<=_&&S.y>=g&&S.y<=p&&S!==i&&S!==o&&Fs(a,h,l,u,c,d,S.x,S.y)&&Nt(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function xx(s,e,t){let n=s;do{const i=n.prev,r=n.next.next;!Ea(i,r)&&Nf(i,n,n.next,r)&&Gr(i,r)&&Gr(r,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),Wr(n),Wr(n.next),n=s=r),n=n.next}while(n!==s);return as(n)}function bx(s,e,t,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Lx(o,a)){let l=If(o,a);o=as(o,o.next),l=as(l,l.next),Vr(o,e,t,n,i,r,0),Vr(l,e,t,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function Ex(s,e,t,n){const i=[];let r,o,a,l,c;for(r=0,o=e.length;r<o;r++)a=e[r]*n,l=r<o-1?e[r+1]*n:s.length,c=Pf(s,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(Rx(c));for(i.sort(Mx),r=0;r<i.length;r++)t=Sx(i[r],t);return t}function Mx(s,e){return s.x-e.x}function Sx(s,e){const t=wx(s,e);if(!t)return e;const n=If(t,s);return as(n,n.next),as(t,t.next)}function wx(s,e){let t=e,n=-1/0,i;const r=s.x,o=s.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const d=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=r&&d>n&&(n=d,i=t.x<t.next.x?t:t.next,d===r))return i}t=t.next}while(t!==e);if(!i)return null;const a=i,l=i.x,c=i.y;let h=1/0,u;t=i;do r>=t.x&&t.x>=l&&r!==t.x&&Fs(o<c?r:n,o,l,c,o<c?n:r,o,t.x,t.y)&&(u=Math.abs(o-t.y)/(r-t.x),Gr(t,s)&&(u<h||u===h&&(t.x>i.x||t.x===i.x&&Tx(i,t)))&&(i=t,h=u)),t=t.next;while(t!==a);return i}function Tx(s,e){return Nt(s.prev,s,e.prev)<0&&Nt(e.next,s,s.next)<0}function Ax(s,e,t,n){let i=s;do i.z===0&&(i.z=Kl(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Cx(i)}function Cx(s){let e,t,n,i,r,o,a,l,c=1;do{for(t=s,s=null,r=null,o=0;t;){for(o++,n=t,a=0,e=0;e<c&&(a++,n=n.nextZ,!!n);e++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,a--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;t=n}r.nextZ=null,c*=2}while(o>1);return s}function Kl(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function Rx(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function Fs(s,e,t,n,i,r,o,a){return(i-o)*(e-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(i-o)*(n-a)}function Lx(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!Px(s,e)&&(Gr(s,e)&&Gr(e,s)&&Nx(s,e)&&(Nt(s.prev,s,e.prev)||Nt(s,e.prev,e))||Ea(s,e)&&Nt(s.prev,s,s.next)>0&&Nt(e.prev,e,e.next)>0)}function Nt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function Ea(s,e){return s.x===e.x&&s.y===e.y}function Nf(s,e,t,n){const i=ko(Nt(s,e,t)),r=ko(Nt(s,e,n)),o=ko(Nt(t,n,s)),a=ko(Nt(t,n,e));return!!(i!==r&&o!==a||i===0&&Fo(s,t,e)||r===0&&Fo(s,n,e)||o===0&&Fo(t,s,n)||a===0&&Fo(t,e,n))}function Fo(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function ko(s){return s>0?1:s<0?-1:0}function Px(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&Nf(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function Gr(s,e){return Nt(s.prev,s,s.next)<0?Nt(s,e,s.next)>=0&&Nt(s,s.prev,e)>=0:Nt(s,e,s.prev)<0||Nt(s,s.next,e)<0}function Nx(s,e){let t=s,n=!1;const i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function If(s,e){const t=new Jl(s.i,s.x,s.y),n=new Jl(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function ju(s,e,t,n){const i=new Jl(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Wr(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Jl(s,e,t){this.i=s,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Ix(s,e,t,n){let i=0;for(let r=e,o=t-n;r<t;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}class Nr{static area(e){const t=e.length;let n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return Nr.area(e)<0}static triangulateShape(e,t){const n=[],i=[],r=[];Xu(e),qu(n,e);let o=e.length;t.forEach(Xu);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,qu(n,t[l]);const a=_x.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function Xu(s){const e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function qu(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}class Ec extends qt{constructor(e=new Lf([new ye(.5,.5),new ye(-.5,.5),new ye(-.5,-.5),new ye(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],r=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new wt(i,3)),this.setAttribute("uv",new wt(r,2)),this.computeVertexNormals();function o(a){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,p=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,w=t.UVGenerator!==void 0?t.UVGenerator:Dx;let v,S=!1,I,P,C,D;m&&(v=m.getSpacedPoints(h),S=!0,d=!1,I=m.computeFrenetFrames(h,!1),P=new k,C=new k,D=new k),d||(p=0,f=0,g=0,_=0);const E=a.extractPoints(c);let y=E.shape;const U=E.holes;if(!Nr.isClockWise(y)){y=y.reverse();for(let re=0,_e=U.length;re<_e;re++){const ce=U[re];Nr.isClockWise(ce)&&(U[re]=ce.reverse())}}const F=Nr.triangulateShape(y,U),H=y;for(let re=0,_e=U.length;re<_e;re++){const ce=U[re];y=y.concat(ce)}function Z(re,_e,ce){return _e||console.error("THREE.ExtrudeGeometry: vec does not exist"),re.clone().addScaledVector(_e,ce)}const B=y.length,he=F.length;function G(re,_e,ce){let be,pe,Pe;const We=re.x-_e.x,O=re.y-_e.y,A=ce.x-re.x,q=ce.y-re.y,le=We*We+O*O,de=We*q-O*A;if(Math.abs(de)>Number.EPSILON){const ue=Math.sqrt(le),He=Math.sqrt(A*A+q*q),we=_e.x-O/ue,Me=_e.y+We/ue,Qe=ce.x-q/He,xe=ce.y+A/He,Be=((Qe-we)*q-(xe-Me)*A)/(We*q-O*A);be=we+We*Be-re.x,pe=Me+O*Be-re.y;const rt=be*be+pe*pe;if(rt<=2)return new ye(be,pe);Pe=Math.sqrt(rt/2)}else{let ue=!1;We>Number.EPSILON?A>Number.EPSILON&&(ue=!0):We<-Number.EPSILON?A<-Number.EPSILON&&(ue=!0):Math.sign(O)===Math.sign(q)&&(ue=!0),ue?(be=-O,pe=We,Pe=Math.sqrt(le)):(be=We,pe=O,Pe=Math.sqrt(le/2))}return new ye(be/Pe,pe/Pe)}const se=[];for(let re=0,_e=H.length,ce=_e-1,be=re+1;re<_e;re++,ce++,be++)ce===_e&&(ce=0),be===_e&&(be=0),se[re]=G(H[re],H[ce],H[be]);const ae=[];let me,Le=se.concat();for(let re=0,_e=U.length;re<_e;re++){const ce=U[re];me=[];for(let be=0,pe=ce.length,Pe=pe-1,We=be+1;be<pe;be++,Pe++,We++)Pe===pe&&(Pe=0),We===pe&&(We=0),me[be]=G(ce[be],ce[Pe],ce[We]);ae.push(me),Le=Le.concat(me)}for(let re=0;re<p;re++){const _e=re/p,ce=f*Math.cos(_e*Math.PI/2),be=g*Math.sin(_e*Math.PI/2)+_;for(let pe=0,Pe=H.length;pe<Pe;pe++){const We=Z(H[pe],se[pe],be);te(We.x,We.y,-ce)}for(let pe=0,Pe=U.length;pe<Pe;pe++){const We=U[pe];me=ae[pe];for(let O=0,A=We.length;O<A;O++){const q=Z(We[O],me[O],be);te(q.x,q.y,-ce)}}}const Ae=g+_;for(let re=0;re<B;re++){const _e=d?Z(y[re],Le[re],Ae):y[re];S?(C.copy(I.normals[0]).multiplyScalar(_e.x),P.copy(I.binormals[0]).multiplyScalar(_e.y),D.copy(v[0]).add(C).add(P),te(D.x,D.y,D.z)):te(_e.x,_e.y,0)}for(let re=1;re<=h;re++)for(let _e=0;_e<B;_e++){const ce=d?Z(y[_e],Le[_e],Ae):y[_e];S?(C.copy(I.normals[re]).multiplyScalar(ce.x),P.copy(I.binormals[re]).multiplyScalar(ce.y),D.copy(v[re]).add(C).add(P),te(D.x,D.y,D.z)):te(ce.x,ce.y,u/h*re)}for(let re=p-1;re>=0;re--){const _e=re/p,ce=f*Math.cos(_e*Math.PI/2),be=g*Math.sin(_e*Math.PI/2)+_;for(let pe=0,Pe=H.length;pe<Pe;pe++){const We=Z(H[pe],se[pe],be);te(We.x,We.y,u+ce)}for(let pe=0,Pe=U.length;pe<Pe;pe++){const We=U[pe];me=ae[pe];for(let O=0,A=We.length;O<A;O++){const q=Z(We[O],me[O],be);S?te(q.x,q.y+v[h-1].y,v[h-1].x+ce):te(q.x,q.y,u+ce)}}}W(),ee();function W(){const re=i.length/3;if(d){let _e=0,ce=B*_e;for(let be=0;be<he;be++){const pe=F[be];Ne(pe[2]+ce,pe[1]+ce,pe[0]+ce)}_e=h+p*2,ce=B*_e;for(let be=0;be<he;be++){const pe=F[be];Ne(pe[0]+ce,pe[1]+ce,pe[2]+ce)}}else{for(let _e=0;_e<he;_e++){const ce=F[_e];Ne(ce[2],ce[1],ce[0])}for(let _e=0;_e<he;_e++){const ce=F[_e];Ne(ce[0]+B*h,ce[1]+B*h,ce[2]+B*h)}}n.addGroup(re,i.length/3-re,0)}function ee(){const re=i.length/3;let _e=0;ne(H,_e),_e+=H.length;for(let ce=0,be=U.length;ce<be;ce++){const pe=U[ce];ne(pe,_e),_e+=pe.length}n.addGroup(re,i.length/3-re,1)}function ne(re,_e){let ce=re.length;for(;--ce>=0;){const be=ce;let pe=ce-1;pe<0&&(pe=re.length-1);for(let Pe=0,We=h+p*2;Pe<We;Pe++){const O=B*Pe,A=B*(Pe+1),q=_e+be+O,le=_e+pe+O,de=_e+pe+A,ue=_e+be+A;qe(q,le,de,ue)}}}function te(re,_e,ce){l.push(re),l.push(_e),l.push(ce)}function Ne(re,_e,ce){V(re),V(_e),V(ce);const be=i.length/3,pe=w.generateTopUV(n,i,be-3,be-2,be-1);at(pe[0]),at(pe[1]),at(pe[2])}function qe(re,_e,ce,be){V(re),V(_e),V(be),V(_e),V(ce),V(be);const pe=i.length/3,Pe=w.generateSideWallUV(n,i,pe-6,pe-3,pe-2,pe-1);at(Pe[0]),at(Pe[1]),at(Pe[3]),at(Pe[1]),at(Pe[2]),at(Pe[3])}function V(re){i.push(l[re*3+0]),i.push(l[re*3+1]),i.push(l[re*3+2])}function at(re){r.push(re.x),r.push(re.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Ux(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,o=e.shapes.length;r<o;r++){const a=t[e.shapes[r]];n.push(a)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Yl[i.type]().fromJSON(i)),new Ec(n,e.options)}}const Dx={generateTopUV:function(s,e,t,n,i){const r=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[i*3],h=e[i*3+1];return[new ye(r,o),new ye(a,l),new ye(c,h)]},generateSideWallUV:function(s,e,t,n,i,r){const o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[i*3],f=e[i*3+1],g=e[i*3+2],_=e[r*3],p=e[r*3+1],m=e[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new ye(o,1-l),new ye(c,1-u),new ye(d,1-g),new ye(_,1-m)]:[new ye(a,1-l),new ye(h,1-u),new ye(f,1-g),new ye(p,1-m)]}};function Ux(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Mc extends qt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new k,d=new k,f=[],g=[],_=[],p=[];for(let m=0;m<=n;m++){const w=[],v=m/n;let S=0;m===0&&o===0?S=.5/t:m===n&&l===Math.PI&&(S=-.5/t);for(let I=0;I<=t;I++){const P=I/t;u.x=-e*Math.cos(i+P*r)*Math.sin(o+v*a),u.y=e*Math.cos(o+v*a),u.z=e*Math.sin(i+P*r)*Math.sin(o+v*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),p.push(P+S,1-v),w.push(c++)}h.push(w)}for(let m=0;m<n;m++)for(let w=0;w<t;w++){const v=h[m][w+1],S=h[m][w],I=h[m+1][w],P=h[m+1][w+1];(m!==0||o>0)&&f.push(v,S,P),(m!==n-1||l<Math.PI)&&f.push(S,I,P)}this.setIndex(f),this.setAttribute("position",new wt(g,3)),this.setAttribute("normal",new wt(_,3)),this.setAttribute("uv",new wt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ox extends fn{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Xe(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class Sc extends fn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Xe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ga,this.normalScale=new ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Jn extends Sc{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ye(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ht(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Xe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Xe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Xe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Ni extends fn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Xe(16777215),this.specular=new Xe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ga,this.normalScale=new ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=fa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Fx extends fn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ga,this.normalScale=new ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=fa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function Bo(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function kx(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Bx(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function $u(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let l=0;l!==e;++l)i[o++]=s[a+l]}return i}function Df(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}class Kr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class zx extends Kr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Fh,endingEnd:Fh}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case kh:r=e,a=2*t-n;break;case Bh:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case kh:o=e,l=2*n-t;break;case Bh:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),_=g*g,p=_*g,m=-d*p+2*d*_-d*g,w=(1+d)*p+(-1.5-2*d)*_+(-.5+d)*g+1,v=(-1-f)*p+(1.5+f)*_+.5*g,S=f*p-f*_;for(let I=0;I!==a;++I)r[I]=m*o[h+I]+w*o[c+I]+v*o[l+I]+S*o[u+I];return r}}class Hx extends Kr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}}class Vx extends Kr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Zn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Bo(t,this.TimeBufferType),this.values=Bo(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Bo(e.times,Array),values:Bo(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Vx(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Hx(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new zx(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Br:t=this.InterpolantFactoryMethodDiscrete;break;case Js:t=this.InterpolantFactoryMethodLinear;break;case za:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Br;case this.InterpolantFactoryMethodLinear:return Js;case this.InterpolantFactoryMethodSmooth:return za}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&kx(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===za,r=e.length-1;let o=1;for(let a=1;a<r;++a){let l=!1;const c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{const u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){const _=t[u+g];if(_!==t[d+g]||_!==t[f+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Zn.prototype.TimeBufferType=Float32Array;Zn.prototype.ValueBufferType=Float32Array;Zn.prototype.DefaultInterpolation=Js;class ar extends Zn{}ar.prototype.ValueTypeName="bool";ar.prototype.ValueBufferType=Array;ar.prototype.DefaultInterpolation=Br;ar.prototype.InterpolantFactoryMethodLinear=void 0;ar.prototype.InterpolantFactoryMethodSmooth=void 0;class Uf extends Zn{}Uf.prototype.ValueTypeName="color";class er extends Zn{}er.prototype.ValueTypeName="number";class Gx extends Kr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let h=c+a;c!==h;c+=4)pn.slerpFlat(r,0,o,c-a,o,c,l);return r}}class Fi extends Zn{InterpolantFactoryMethodLinear(e){return new Gx(this.times,this.values,this.getValueSize(),e)}}Fi.prototype.ValueTypeName="quaternion";Fi.prototype.DefaultInterpolation=Js;Fi.prototype.InterpolantFactoryMethodSmooth=void 0;class lr extends Zn{}lr.prototype.ValueTypeName="string";lr.prototype.ValueBufferType=Array;lr.prototype.DefaultInterpolation=Br;lr.prototype.InterpolantFactoryMethodLinear=void 0;lr.prototype.InterpolantFactoryMethodSmooth=void 0;class ki extends Zn{}ki.prototype.ValueTypeName="vector";class Zl{constructor(e="",t=-1,n=[],i=mm){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=En(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(jx(n[o]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(Zn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const h=Bx(l);l=$u(l,1,h),c=$u(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new er(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,g,_){if(f.length!==0){const p=[],m=[];Df(f,p,m,g),p.length!==0&&_.push(new u(d,p,m))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)f[d[g].morphTargets[_]]=-1;for(const _ in f){const p=[],m=[];for(let w=0;w!==d[g].morphTargets.length;++w){const v=d[g];p.push(v.time),m.push(v.morphTarget===_?1:0)}i.push(new er(".morphTargetInfluence["+_+"]",p,m))}l=f.length*o}else{const f=".bones["+t[u].name+"]";n(ki,f+".position",d,"pos",i),n(Fi,f+".quaternion",d,"rot",i),n(ki,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Wx(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return er;case"vector":case"vector2":case"vector3":case"vector4":return ki;case"color":return Uf;case"quaternion":return Fi;case"bool":case"boolean":return ar;case"string":return lr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function jx(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Wx(s.type);if(s.times===void 0){const t=[],n=[];Df(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const Ci={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class Of{constructor(e,t,n){const i=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const Xx=new Of;class $n{constructor(e){this.manager=e!==void 0?e:Xx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}$n.DEFAULT_MATERIAL_NAME="__DEFAULT";const ai={};class qx extends Error{constructor(e,t){super(e),this.response=t}}class Jr extends $n{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Ci.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(ai[e]!==void 0){ai[e].push({onLoad:t,onProgress:n,onError:i});return}ai[e]=[],ai[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=ai[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let _=0;const p=new ReadableStream({start(m){w();function w(){u.read().then(({done:v,value:S})=>{if(v)m.close();else{_+=S.byteLength;const I=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let P=0,C=h.length;P<C;P++){const D=h[P];D.onProgress&&D.onProgress(I)}m.enqueue(S),w()}})}}});return new Response(p)}else throw new qx(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{Ci.add(e,c);const h=ai[e];delete ai[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=ai[e];if(h===void 0)throw this.manager.itemError(e),c;delete ai[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class $x extends $n{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Ci.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=zr("img");function l(){h(),Ci.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(u){h(),i&&i(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class Yx extends $n{constructor(e){super(e)}load(e,t,n,i){const r=this,o=new _c,a=new Jr(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(e,function(l){let c;try{c=r.parse(l)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}c.image!==void 0?o.image=c.image:c.data!==void 0&&(o.image.width=c.width,o.image.height=c.height,o.image.data=c.data),o.wrapS=c.wrapS!==void 0?c.wrapS:bn,o.wrapT=c.wrapT!==void 0?c.wrapT:bn,o.magFilter=c.magFilter!==void 0?c.magFilter:Zt,o.minFilter=c.minFilter!==void 0?c.minFilter:Zt,o.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(o.colorSpace=c.colorSpace),c.flipY!==void 0&&(o.flipY=c.flipY),c.format!==void 0&&(o.format=c.format),c.type!==void 0&&(o.type=c.type),c.mipmaps!==void 0&&(o.mipmaps=c.mipmaps,o.minFilter=In),c.mipmapCount===1&&(o.minFilter=Zt),c.generateMipmaps!==void 0&&(o.generateMipmaps=c.generateMipmaps),o.needsUpdate=!0,t&&t(o,c)},n,i),o}}class wc extends $n{constructor(e){super(e)}load(e,t,n,i){const r=new Vt,o=new $x(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class Zr extends At{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Xe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class Kx extends Zr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Xe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const yl=new $e,Yu=new k,Ku=new k;class Tc{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ye(512,512),this.map=null,this.mapPass=null,this.matrix=new $e,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fc,this._frameExtents=new ye(1,1),this._viewportCount=1,this._viewports=[new Tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Yu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Yu),Ku.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ku),t.updateMatrixWorld(),yl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(yl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Jx extends Tc{constructor(){super(new $t(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Zs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Ff extends Zr{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.target=new At,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Jx}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Ju=new $e,xr=new k,vl=new k;class Zx extends Tc{constructor(){super(new $t(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ye(4,2),this._viewportCount=6,this._viewports=[new Tt(2,1,1,1),new Tt(0,1,1,1),new Tt(3,1,1,1),new Tt(1,1,1,1),new Tt(3,0,1,1),new Tt(1,0,1,1)],this._cubeDirections=[new k(1,0,0),new k(-1,0,0),new k(0,0,1),new k(0,0,-1),new k(0,1,0),new k(0,-1,0)],this._cubeUps=[new k(0,1,0),new k(0,1,0),new k(0,1,0),new k(0,1,0),new k(0,0,1),new k(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),xr.setFromMatrixPosition(e.matrixWorld),n.position.copy(xr),vl.copy(n.position),vl.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(vl),n.updateMatrixWorld(),i.makeTranslation(-xr.x,-xr.y,-xr.z),Ju.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ju)}}class kf extends Zr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Zx}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Qx extends Tc{constructor(){super(new ya(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ac extends Zr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.target=new At,this.shadow=new Qx}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class eb extends Zr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class ss{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class tb extends $n{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Ci.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return Ci.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Ci.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Ci.add(e,l),r.manager.itemStart(e)}}const Cc="\\[\\]\\.:\\/",nb=new RegExp("["+Cc+"]","g"),Rc="[^"+Cc+"]",ib="[^"+Cc.replace("\\.","")+"]",sb=/((?:WC+[\/:])*)/.source.replace("WC",Rc),rb=/(WCOD+)?/.source.replace("WCOD",ib),ob=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Rc),ab=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Rc),lb=new RegExp("^"+sb+rb+ob+ab+"$"),cb=["material","materials","bones","map"];class hb{constructor(e,t,n){const i=n||Mt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Mt{constructor(e,t,n){this.path=t,this.parsedPath=n||Mt.parseTrackName(t),this.node=Mt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Mt.Composite(e,t,n):new Mt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(nb,"")}static parseTrackName(e){const t=lb.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);cb.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=Mt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Mt.Composite=hb;Mt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Mt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Mt.prototype.GetterByBindingType=[Mt.prototype._getValue_direct,Mt.prototype._getValue_array,Mt.prototype._getValue_arrayElement,Mt.prototype._getValue_toArray];Mt.prototype.SetterByBindingTypeAndVersioning=[[Mt.prototype._setValue_direct,Mt.prototype._setValue_direct_setNeedsUpdate,Mt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_array,Mt.prototype._setValue_array_setNeedsUpdate,Mt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_arrayElement,Mt.prototype._setValue_arrayElement_setNeedsUpdate,Mt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_fromArray,Mt.prototype._setValue_fromArray_setNeedsUpdate,Mt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const Zu=new $e;class Lc{constructor(e,t,n=0,i=1/0){this.ray=new sr(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new dc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Zu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Zu),this}intersectObject(e,t=!0,n=[]){return Ql(e,this,n,t),n.sort(Qu),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)Ql(e[i],this,n,t);return n.sort(Qu),n}}function Qu(s,e){return s.distance-e.distance}function Ql(s,e,t,n){if(s.layers.test(e.layers)&&s.raycast(e,t),n===!0){const i=s.children;for(let r=0,o=i.length;r<o;r++)Ql(i[r],e,t,!0)}}class ed{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ht(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class ub extends yc{constructor(e=10,t=10,n=4473924,i=8947848){n=new Xe(n),i=new Xe(i);const r=t/2,o=e/t,a=e/2,l=[],c=[];for(let d=0,f=0,g=-a;d<=t;d++,g+=o){l.push(-a,0,g,a,0,g),l.push(g,0,-a,g,0,a);const _=d===r?n:i;_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3}const h=new qt;h.setAttribute("position",new wt(l,3)),h.setAttribute("color",new wt(c,3));const u=new Hr({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:cc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=cc);const td=new k,db=new on,zo=new $e,Mi=new $e,Ho=new pn,Vo=new k,Go=new k(1,1,1);class Ma extends At{constructor(){super(...arguments),this.urdfNode=null,this.urdfName=""}copy(e,t){return super.copy(e,t),this.urdfNode=e.urdfNode,this.urdfName=e.urdfName,this}}class fb extends Ma{constructor(){super(...arguments),this.isURDFCollider=!0,this.type="URDFCollider"}}class pb extends Ma{constructor(){super(...arguments),this.isURDFVisual=!0,this.type="URDFVisual"}}class Bf extends Ma{constructor(){super(...arguments),this.isURDFLink=!0,this.type="URDFLink"}}class zf extends Ma{constructor(){super(...arguments),this.isURDFJoint=!0,this.type="URDFJoint",this.jointValue=[],this.axis=new k(1,0,0),this.limit={lower:0,upper:0},this.ignoreLimits=!1,this.mimicJoints=[],this.origPosition=null,this.origQuaternion=null,this._jointType="fixed"}get jointType(){return this._jointType}set jointType(e){if(this._jointType!==e)switch(this._jointType=e,this.matrixWorldNeedsUpdate=!0,e){case"fixed":this.jointValue=[];break;case"continuous":case"revolute":case"prismatic":this.jointValue=[0];break;case"planar":this.jointValue=[0,0,0],this.axis=new k(0,0,1);break;case"floating":this.jointValue=[0,0,0,0,0,0];break}}get angle(){return this.jointValue[0]??0}copy(e,t){var n,i;return super.copy(e,t),this.jointType=e.jointType,this.axis=e.axis.clone(),this.limit={...e.limit},this.ignoreLimits=!1,this.jointValue=[...e.jointValue],this.origPosition=((n=e.origPosition)==null?void 0:n.clone())??null,this.origQuaternion=((i=e.origQuaternion)==null?void 0:i.clone())??null,this.mimicJoints=[...e.mimicJoints],this}setJointValue(...e){const t=e.map(i=>i===null?null:Number(i));(!this.origPosition||!this.origQuaternion)&&(this.origPosition=this.position.clone(),this.origQuaternion=this.quaternion.clone());let n=!1;for(const i of this.mimicJoints)n=i.updateFromMimicked(...t)||n;switch(this.jointType){case"fixed":return n;case"continuous":case"revolute":{let i=t[0];return i===null||(!this.ignoreLimits&&this.jointType==="revolute"&&(i=Math.min(this.limit.upper,Math.max(this.limit.lower,i))),i===this.jointValue[0])?n:(this.quaternion.setFromAxisAngle(this.axis,i).premultiply(this.origQuaternion),this.jointValue[0]=i,this.matrixWorldNeedsUpdate=!0,!0)}case"prismatic":{let i=t[0];return i===null||(this.ignoreLimits||(i=Math.min(this.limit.upper,Math.max(this.limit.lower,i))),i===this.jointValue[0])?n:(this.position.copy(this.origPosition),td.copy(this.axis).applyEuler(this.rotation),this.position.addScaledVector(td,i),this.jointValue[0]=i,this.matrixWorldNeedsUpdate=!0,!0)}case"floating":{if(this.jointValue.every((r,o)=>t[o]===r||t[o]===null))return n;for(let r=0;r<6;r++)t[r]!==null&&(this.jointValue[r]=t[r]);return Mi.compose(this.origPosition,this.origQuaternion,Go),Ho.setFromEuler(db.set(this.jointValue[3],this.jointValue[4],this.jointValue[5],"XYZ")),Vo.set(this.jointValue[0],this.jointValue[1],this.jointValue[2]),zo.compose(Vo,Ho,Go),Mi.premultiply(zo),this.position.setFromMatrixPosition(Mi),this.rotation.setFromRotationMatrix(Mi),this.matrixWorldNeedsUpdate=!0,!0}case"planar":{if(this.jointValue.every((r,o)=>t[o]===r||t[o]===null))return n;for(let r=0;r<3;r++)t[r]!==null&&(this.jointValue[r]=t[r]);return Mi.compose(this.origPosition,this.origQuaternion,Go),Ho.setFromAxisAngle(this.axis,this.jointValue[2]),Vo.set(this.jointValue[0],this.jointValue[1],0),zo.compose(Vo,Ho,Go),Mi.premultiply(zo),this.position.setFromMatrixPosition(Mi),this.rotation.setFromRotationMatrix(Mi),this.matrixWorldNeedsUpdate=!0,!0}}return n}}class xl extends zf{constructor(){super(...arguments),this.type="URDFMimicJoint",this.mimicJoint="",this.multiplier=1,this.offset=0}updateFromMimicked(...e){return super.setJointValue(...e.map(t=>t===null?null:t*this.multiplier+this.offset))}copy(e,t){return super.copy(e,t),this.mimicJoint=e.mimicJoint,this.multiplier=e.multiplier,this.offset=e.offset,this}}class nd extends Bf{constructor(){super(...arguments),this.isURDFRobot=!0,this.type="URDFRobot",this.robotName="",this.urdfRobotNode=null,this.links={},this.joints={},this.colliders={},this.visual={},this.frames={}}copy(e,t){super.copy(e,t),this.robotName=e.robotName,this.urdfRobotNode=e.urdfRobotNode,this.links={},this.joints={},this.colliders={},this.visual={},this.traverse(n=>{const i=n;i.isURDFJoint&&i.urdfName in e.joints&&(this.joints[i.urdfName]=i),i.isURDFLink&&i.urdfName in e.links&&(this.links[i.urdfName]=i),i.isURDFCollider&&i.urdfName in e.colliders&&(this.colliders[i.urdfName]=i),i.isURDFVisual&&i.urdfName in e.visual&&(this.visual[i.urdfName]=i)});for(const n of Object.values(this.joints))n.mimicJoints=n.mimicJoints.map(i=>this.joints[i.name]);return this.frames={...this.colliders,...this.visual,...this.links,...this.joints},this}setJointValue(e,...t){var n;return((n=this.joints[e])==null?void 0:n.setJointValue(...t))??!1}}class id extends Yx{constructor(e){super(e)}parse(e){function t(B){switch(B.image_type){case d:case _:if(B.colormap_length>256||B.colormap_size!==24||B.colormap_type!==1)throw new Error("THREE.TGALoader: Invalid type colormap data for indexed type.");break;case f:case g:case p:case m:if(B.colormap_type)throw new Error("THREE.TGALoader: Invalid type colormap data for colormap type.");break;case u:throw new Error("THREE.TGALoader: No data.");default:throw new Error("THREE.TGALoader: Invalid type "+B.image_type)}if(B.width<=0||B.height<=0)throw new Error("THREE.TGALoader: Invalid image size.");if(B.pixel_size!==8&&B.pixel_size!==16&&B.pixel_size!==24&&B.pixel_size!==32)throw new Error("THREE.TGALoader: Invalid pixel size "+B.pixel_size)}function n(B,he,G,se,ae){let me,Le;const Ae=G.pixel_size>>3,W=G.width*G.height*Ae;if(he&&(Le=ae.subarray(se,se+=G.colormap_length*(G.colormap_size>>3))),B){me=new Uint8Array(W);let ee,ne,te,Ne=0;const qe=new Uint8Array(Ae);for(;Ne<W;)if(ee=ae[se++],ne=(ee&127)+1,ee&128){for(te=0;te<Ae;++te)qe[te]=ae[se++];for(te=0;te<ne;++te)me.set(qe,Ne+te*Ae);Ne+=Ae*ne}else{for(ne*=Ae,te=0;te<ne;++te)me[Ne+te]=ae[se++];Ne+=ne}}else me=ae.subarray(se,se+=he?G.width*G.height:W);return{pixel_data:me,palettes:Le}}function i(B,he,G,se,ae,me,Le,Ae,W){const ee=W;let ne,te=0,Ne,qe;const V=y.width;for(qe=he;qe!==se;qe+=G)for(Ne=ae;Ne!==Le;Ne+=me,te++)ne=Ae[te],B[(Ne+V*qe)*4+3]=255,B[(Ne+V*qe)*4+2]=ee[ne*3+0],B[(Ne+V*qe)*4+1]=ee[ne*3+1],B[(Ne+V*qe)*4+0]=ee[ne*3+2];return B}function r(B,he,G,se,ae,me,Le,Ae){let W,ee=0,ne,te;const Ne=y.width;for(te=he;te!==se;te+=G)for(ne=ae;ne!==Le;ne+=me,ee+=2)W=Ae[ee+0]+(Ae[ee+1]<<8),B[(ne+Ne*te)*4+0]=(W&31744)>>7,B[(ne+Ne*te)*4+1]=(W&992)>>2,B[(ne+Ne*te)*4+2]=(W&31)<<3,B[(ne+Ne*te)*4+3]=W&32768?0:255;return B}function o(B,he,G,se,ae,me,Le,Ae){let W=0,ee,ne;const te=y.width;for(ne=he;ne!==se;ne+=G)for(ee=ae;ee!==Le;ee+=me,W+=3)B[(ee+te*ne)*4+3]=255,B[(ee+te*ne)*4+2]=Ae[W+0],B[(ee+te*ne)*4+1]=Ae[W+1],B[(ee+te*ne)*4+0]=Ae[W+2];return B}function a(B,he,G,se,ae,me,Le,Ae){let W=0,ee,ne;const te=y.width;for(ne=he;ne!==se;ne+=G)for(ee=ae;ee!==Le;ee+=me,W+=4)B[(ee+te*ne)*4+2]=Ae[W+0],B[(ee+te*ne)*4+1]=Ae[W+1],B[(ee+te*ne)*4+0]=Ae[W+2],B[(ee+te*ne)*4+3]=Ae[W+3];return B}function l(B,he,G,se,ae,me,Le,Ae){let W,ee=0,ne,te;const Ne=y.width;for(te=he;te!==se;te+=G)for(ne=ae;ne!==Le;ne+=me,ee++)W=Ae[ee],B[(ne+Ne*te)*4+0]=W,B[(ne+Ne*te)*4+1]=W,B[(ne+Ne*te)*4+2]=W,B[(ne+Ne*te)*4+3]=255;return B}function c(B,he,G,se,ae,me,Le,Ae){let W=0,ee,ne;const te=y.width;for(ne=he;ne!==se;ne+=G)for(ee=ae;ee!==Le;ee+=me,W+=2)B[(ee+te*ne)*4+0]=Ae[W+0],B[(ee+te*ne)*4+1]=Ae[W+0],B[(ee+te*ne)*4+2]=Ae[W+0],B[(ee+te*ne)*4+3]=Ae[W+1];return B}function h(B,he,G,se,ae){let me,Le,Ae,W,ee,ne;switch((y.flags&w)>>v){default:case P:me=0,Ae=1,ee=he,Le=0,W=1,ne=G;break;case S:me=0,Ae=1,ee=he,Le=G-1,W=-1,ne=-1;break;case C:me=he-1,Ae=-1,ee=-1,Le=0,W=1,ne=G;break;case I:me=he-1,Ae=-1,ee=-1,Le=G-1,W=-1,ne=-1;break}if(F)switch(y.pixel_size){case 8:l(B,Le,W,ne,me,Ae,ee,se);break;case 16:c(B,Le,W,ne,me,Ae,ee,se);break;default:throw new Error("THREE.TGALoader: Format not supported.")}else switch(y.pixel_size){case 8:i(B,Le,W,ne,me,Ae,ee,se,ae);break;case 16:r(B,Le,W,ne,me,Ae,ee,se);break;case 24:o(B,Le,W,ne,me,Ae,ee,se);break;case 32:a(B,Le,W,ne,me,Ae,ee,se);break;default:throw new Error("THREE.TGALoader: Format not supported.")}return B}const u=0,d=1,f=2,g=3,_=9,p=10,m=11,w=48,v=4,S=0,I=1,P=2,C=3;if(e.length<19)throw new Error("THREE.TGALoader: Not enough data to contain header.");let D=0;const E=new Uint8Array(e),y={id_length:E[D++],colormap_type:E[D++],image_type:E[D++],colormap_index:E[D++]|E[D++]<<8,colormap_length:E[D++]|E[D++]<<8,colormap_size:E[D++],origin:[E[D++]|E[D++]<<8,E[D++]|E[D++]<<8],width:E[D++]|E[D++]<<8,height:E[D++]|E[D++]<<8,pixel_size:E[D++],flags:E[D++]};if(t(y),y.id_length+D>e.length)throw new Error("THREE.TGALoader: No data.");D+=y.id_length;let U=!1,z=!1,F=!1;switch(y.image_type){case _:U=!0,z=!0;break;case d:z=!0;break;case p:U=!0;break;case f:break;case m:U=!0,F=!0;break;case g:F=!0;break}const H=new Uint8Array(y.width*y.height*4),Z=n(U,z,y,D,E);return h(H,y.width,y.height,Z.pixel_data,Z.palettes),{data:H,width:y.width,height:y.height,flipY:!0,generateMipmaps:!0,minFilter:In}}}class mb extends $n{load(e,t,n,i){const r=this,o=r.path===""?ss.extractUrlBase(e):r.path,a=new Jr(r.manager);a.setPath(r.path),a.setRequestHeader(r.requestHeader),a.setWithCredentials(r.withCredentials),a.load(e,function(l){try{t(r.parse(l,o))}catch(c){i?i(c):console.error(c),r.manager.itemError(e)}},n,i)}parse(e,t){function n(b,x){const R=[],T=b.childNodes;for(let L=0,J=T.length;L<J;L++){const oe=T[L];oe.nodeName===x&&R.push(oe)}return R}function i(b){if(b.length===0)return[];const x=b.trim().split(/\s+/),R=new Array(x.length);for(let T=0,L=x.length;T<L;T++)R[T]=x[T];return R}function r(b){if(b.length===0)return[];const x=b.trim().split(/\s+/),R=new Array(x.length);for(let T=0,L=x.length;T<L;T++)R[T]=parseFloat(x[T]);return R}function o(b){if(b.length===0)return[];const x=b.trim().split(/\s+/),R=new Array(x.length);for(let T=0,L=x.length;T<L;T++)R[T]=parseInt(x[T]);return R}function a(b){return b.substring(1)}function l(){return"three_default_"+vp++}function c(b){return Object.keys(b).length===0}function h(b){return{unit:u(n(b,"unit")[0]),upAxis:d(n(b,"up_axis")[0])}}function u(b){return b!==void 0&&b.hasAttribute("meter")===!0?parseFloat(b.getAttribute("meter")):1}function d(b){return b!==void 0?b.textContent:"Y_UP"}function f(b,x,R,T){const L=n(b,x)[0];if(L!==void 0){const J=n(L,R);for(let oe=0;oe<J.length;oe++)T(J[oe])}}function g(b,x){for(const R in b){const T=b[R];T.build=x(b[R])}}function _(b,x){return b.build!==void 0||(b.build=x(b)),b.build}function p(b){const x={sources:{},samplers:{},channels:{}};let R=!1;for(let T=0,L=b.childNodes.length;T<L;T++){const J=b.childNodes[T];if(J.nodeType!==1)continue;let oe;switch(J.nodeName){case"source":oe=J.getAttribute("id"),x.sources[oe]=fe(J);break;case"sampler":oe=J.getAttribute("id"),x.samplers[oe]=m(J);break;case"channel":oe=J.getAttribute("target"),x.channels[oe]=w(J);break;case"animation":p(J),R=!0;break;default:console.log(J)}}R===!1&&(Ze.animations[b.getAttribute("id")||es.generateUUID()]=x)}function m(b){const x={inputs:{}};for(let R=0,T=b.childNodes.length;R<T;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"input":const J=a(L.getAttribute("source")),oe=L.getAttribute("semantic");x.inputs[oe]=J;break}}return x}function w(b){const x={};let T=b.getAttribute("target").split("/");const L=T.shift();let J=T.shift();const oe=J.indexOf("(")!==-1,Ue=J.indexOf(".")!==-1;if(Ue)T=J.split("."),J=T.shift(),x.member=T.shift();else if(oe){const Se=J.split("(");J=Se.shift();for(let Re=0;Re<Se.length;Re++)Se[Re]=parseInt(Se[Re].replace(/\)/,""));x.indices=Se}return x.id=L,x.sid=J,x.arraySyntax=oe,x.memberSyntax=Ue,x.sampler=a(b.getAttribute("source")),x}function v(b){const x=[],R=b.channels,T=b.samplers,L=b.sources;for(const J in R)if(R.hasOwnProperty(J)){const oe=R[J],Ue=T[oe.sampler],Se=Ue.inputs.INPUT,Re=Ue.inputs.OUTPUT,Ge=L[Se],ge=L[Re],ze=I(oe,Ge,ge);y(ze,x)}return x}function S(b){return _(Ze.animations[b],v)}function I(b,x,R){const T=Ze.nodes[b.id],L=yt(T.id),J=T.transforms[b.sid],oe=T.matrix.clone().transpose();let Ue,Se,Re,Ge,ge,ze;const Oe={};switch(J){case"matrix":for(Re=0,Ge=x.array.length;Re<Ge;Re++)if(Ue=x.array[Re],Se=Re*R.stride,Oe[Ue]===void 0&&(Oe[Ue]={}),b.arraySyntax===!0){const Pt=R.array[Se],bt=b.indices[0]+4*b.indices[1];Oe[Ue][bt]=Pt}else for(ge=0,ze=R.stride;ge<ze;ge++)Oe[Ue][ge]=R.array[Se+ge];break;case"translate":console.warn('THREE.ColladaLoader: Animation transform type "%s" not yet implemented.',J);break;case"rotate":console.warn('THREE.ColladaLoader: Animation transform type "%s" not yet implemented.',J);break;case"scale":console.warn('THREE.ColladaLoader: Animation transform type "%s" not yet implemented.',J);break}const Ke=P(Oe,oe);return{name:L.uuid,keyframes:Ke}}function P(b,x){const R=[];for(const L in b)R.push({time:parseFloat(L),value:b[L]});R.sort(T);for(let L=0;L<16;L++)U(R,L,x.elements[L]);return R;function T(L,J){return L.time-J.time}}const C=new k,D=new k,E=new pn;function y(b,x){const R=b.keyframes,T=b.name,L=[],J=[],oe=[],Ue=[];for(let Se=0,Re=R.length;Se<Re;Se++){const Ge=R[Se],ge=Ge.time,ze=Ge.value;Fe.fromArray(ze).transpose(),Fe.decompose(C,E,D),L.push(ge),J.push(C.x,C.y,C.z),oe.push(E.x,E.y,E.z,E.w),Ue.push(D.x,D.y,D.z)}return J.length>0&&x.push(new ki(T+".position",L,J)),oe.length>0&&x.push(new Fi(T+".quaternion",L,oe)),Ue.length>0&&x.push(new ki(T+".scale",L,Ue)),x}function U(b,x,R){let T,L=!0,J,oe;for(J=0,oe=b.length;J<oe;J++)T=b[J],T.value[x]===void 0?T.value[x]=null:L=!1;if(L===!0)for(J=0,oe=b.length;J<oe;J++)T=b[J],T.value[x]=R;else z(b,x)}function z(b,x){let R,T;for(let L=0,J=b.length;L<J;L++){const oe=b[L];if(oe.value[x]===null){if(R=F(b,L,x),T=H(b,L,x),R===null){oe.value[x]=T.value[x];continue}if(T===null){oe.value[x]=R.value[x];continue}Z(oe,R,T,x)}}}function F(b,x,R){for(;x>=0;){const T=b[x];if(T.value[R]!==null)return T;x--}return null}function H(b,x,R){for(;x<b.length;){const T=b[x];if(T.value[R]!==null)return T;x++}return null}function Z(b,x,R,T){if(R.time-x.time===0){b.value[T]=x.value[T];return}b.value[T]=(b.time-x.time)*(R.value[T]-x.value[T])/(R.time-x.time)+x.value[T]}function B(b){const x={name:b.getAttribute("id")||"default",start:parseFloat(b.getAttribute("start")||0),end:parseFloat(b.getAttribute("end")||0),animations:[]};for(let R=0,T=b.childNodes.length;R<T;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"instance_animation":x.animations.push(a(L.getAttribute("url")));break}}Ze.clips[b.getAttribute("id")]=x}function he(b){const x=[],R=b.name,T=b.end-b.start||-1,L=b.animations;for(let J=0,oe=L.length;J<oe;J++){const Ue=S(L[J]);for(let Se=0,Re=Ue.length;Se<Re;Se++)x.push(Ue[Se])}return new Zl(R,T,x)}function G(b){return _(Ze.clips[b],he)}function se(b){const x={};for(let R=0,T=b.childNodes.length;R<T;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"skin":x.id=a(L.getAttribute("source")),x.skin=ae(L);break;case"morph":x.id=a(L.getAttribute("source")),console.warn("THREE.ColladaLoader: Morph target animation not supported yet.");break}}Ze.controllers[b.getAttribute("id")]=x}function ae(b){const x={sources:{}};for(let R=0,T=b.childNodes.length;R<T;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"bind_shape_matrix":x.bindShapeMatrix=r(L.textContent);break;case"source":const J=L.getAttribute("id");x.sources[J]=fe(L);break;case"joints":x.joints=me(L);break;case"vertex_weights":x.vertexWeights=Le(L);break}}return x}function me(b){const x={inputs:{}};for(let R=0,T=b.childNodes.length;R<T;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"input":const J=L.getAttribute("semantic"),oe=a(L.getAttribute("source"));x.inputs[J]=oe;break}}return x}function Le(b){const x={inputs:{}};for(let R=0,T=b.childNodes.length;R<T;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"input":const J=L.getAttribute("semantic"),oe=a(L.getAttribute("source")),Ue=parseInt(L.getAttribute("offset"));x.inputs[J]={id:oe,offset:Ue};break;case"vcount":x.vcount=o(L.textContent);break;case"v":x.v=o(L.textContent);break}}return x}function Ae(b){const x={id:b.id},R=Ze.geometries[x.id];return b.skin!==void 0&&(x.skin=W(b.skin),R.sources.skinIndices=x.skin.indices,R.sources.skinWeights=x.skin.weights),x}function W(b){const R={joints:[],indices:{array:[],stride:4},weights:{array:[],stride:4}},T=b.sources,L=b.vertexWeights,J=L.vcount,oe=L.v,Ue=L.inputs.JOINT.offset,Se=L.inputs.WEIGHT.offset,Re=b.sources[b.joints.inputs.JOINT],Ge=b.sources[b.joints.inputs.INV_BIND_MATRIX],ge=T[L.inputs.WEIGHT.id].array;let ze=0,Oe,Ke,je;for(Oe=0,je=J.length;Oe<je;Oe++){const bt=J[Oe],gt=[];for(Ke=0;Ke<bt;Ke++){const _t=oe[ze+Ue],ti=oe[ze+Se],ln=ge[ti];gt.push({index:_t,weight:ln}),ze+=2}for(gt.sort(Pt),Ke=0;Ke<4;Ke++){const _t=gt[Ke];_t!==void 0?(R.indices.array.push(_t.index),R.weights.array.push(_t.weight)):(R.indices.array.push(0),R.weights.array.push(0))}}for(b.bindShapeMatrix?R.bindMatrix=new $e().fromArray(b.bindShapeMatrix).transpose():R.bindMatrix=new $e().identity(),Oe=0,je=Re.array.length;Oe<je;Oe++){const bt=Re.array[Oe],gt=new $e().fromArray(Ge.array,Oe*Ge.stride).transpose();R.joints.push({name:bt,boneInverse:gt})}return R;function Pt(bt,gt){return gt.weight-bt.weight}}function ee(b){return _(Ze.controllers[b],Ae)}function ne(b){const x={init_from:n(b,"init_from")[0].textContent};Ze.images[b.getAttribute("id")]=x}function te(b){return b.build!==void 0?b.build:b.init_from}function Ne(b){const x=Ze.images[b];return x!==void 0?_(x,te):(console.warn("THREE.ColladaLoader: Couldn't find image with ID:",b),null)}function qe(b){const x={};for(let R=0,T=b.childNodes.length;R<T;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"profile_COMMON":x.profile=V(L);break}}Ze.effects[b.getAttribute("id")]=x}function V(b){const x={surfaces:{},samplers:{}};for(let R=0,T=b.childNodes.length;R<T;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"newparam":at(L,x);break;case"technique":x.technique=ce(L);break;case"extra":x.extra=A(L);break}}return x}function at(b,x){const R=b.getAttribute("sid");for(let T=0,L=b.childNodes.length;T<L;T++){const J=b.childNodes[T];if(J.nodeType===1)switch(J.nodeName){case"surface":x.surfaces[R]=re(J);break;case"sampler2D":x.samplers[R]=_e(J);break}}}function re(b){const x={};for(let R=0,T=b.childNodes.length;R<T;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"init_from":x.init_from=L.textContent;break}}return x}function _e(b){const x={};for(let R=0,T=b.childNodes.length;R<T;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"source":x.source=L.textContent;break}}return x}function ce(b){const x={};for(let R=0,T=b.childNodes.length;R<T;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"constant":case"lambert":case"blinn":case"phong":x.type=L.nodeName,x.parameters=be(L);break;case"extra":x.extra=A(L);break}}return x}function be(b){const x={};for(let R=0,T=b.childNodes.length;R<T;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"emission":case"diffuse":case"specular":case"bump":case"ambient":case"shininess":case"transparency":x[L.nodeName]=pe(L);break;case"transparent":x[L.nodeName]={opaque:L.hasAttribute("opaque")?L.getAttribute("opaque"):"A_ONE",data:pe(L)};break}}return x}function pe(b){const x={};for(let R=0,T=b.childNodes.length;R<T;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"color":x[L.nodeName]=r(L.textContent);break;case"float":x[L.nodeName]=parseFloat(L.textContent);break;case"texture":x[L.nodeName]={id:L.getAttribute("texture"),extra:Pe(L)};break}}return x}function Pe(b){const x={technique:{}};for(let R=0,T=b.childNodes.length;R<T;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"extra":We(L,x);break}}return x}function We(b,x){for(let R=0,T=b.childNodes.length;R<T;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"technique":O(L,x);break}}}function O(b,x){for(let R=0,T=b.childNodes.length;R<T;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"repeatU":case"repeatV":case"offsetU":case"offsetV":x.technique[L.nodeName]=parseFloat(L.textContent);break;case"wrapU":case"wrapV":L.textContent.toUpperCase()==="TRUE"?x.technique[L.nodeName]=1:L.textContent.toUpperCase()==="FALSE"?x.technique[L.nodeName]=0:x.technique[L.nodeName]=parseInt(L.textContent);break;case"bump":x[L.nodeName]=le(L);break}}}function A(b){const x={};for(let R=0,T=b.childNodes.length;R<T;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"technique":x.technique=q(L);break}}return x}function q(b){const x={};for(let R=0,T=b.childNodes.length;R<T;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"double_sided":x[L.nodeName]=parseInt(L.textContent);break;case"bump":x[L.nodeName]=le(L);break}}return x}function le(b){const x={};for(let R=0,T=b.childNodes.length;R<T;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"texture":x[L.nodeName]={id:L.getAttribute("texture"),texcoord:L.getAttribute("texcoord"),extra:Pe(L)};break}}return x}function de(b){return b}function ue(b){return _(Ze.effects[b],de)}function He(b){const x={name:b.getAttribute("name")};for(let R=0,T=b.childNodes.length;R<T;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"instance_effect":x.url=a(L.getAttribute("url"));break}}Ze.materials[b.getAttribute("id")]=x}function we(b){let x,R=b.slice((b.lastIndexOf(".")-1>>>0)+2);switch(R=R.toLowerCase(),R){case"tga":x=Da;break;default:x=nh}return x}function Me(b){const x=ue(b.url),R=x.profile.technique;let T;switch(R.type){case"phong":case"blinn":T=new Ni;break;case"lambert":T=new Fx;break;default:T=new Xn;break}T.name=b.name||"";function L(Se,Re=null){const Ge=x.profile.samplers[Se.id];let ge=null;if(Ge!==void 0){const ze=x.profile.surfaces[Ge.source];ge=Ne(ze.init_from)}else console.warn("THREE.ColladaLoader: Undefined sampler. Access image directly (see #12530)."),ge=Ne(Se.id);if(ge!==null){const ze=we(ge);if(ze!==void 0){const Oe=ze.load(ge),Ke=Se.extra;if(Ke!==void 0&&Ke.technique!==void 0&&c(Ke.technique)===!1){const je=Ke.technique;Oe.wrapS=je.wrapU?Wn:bn,Oe.wrapT=je.wrapV?Wn:bn,Oe.offset.set(je.offsetU||0,je.offsetV||0),Oe.repeat.set(je.repeatU||1,je.repeatV||1)}else Oe.wrapS=Wn,Oe.wrapT=Wn;return Re!==null&&(Oe.colorSpace=Re),Oe}else return console.warn("THREE.ColladaLoader: Loader for texture %s not found.",ge),null}else return console.warn("THREE.ColladaLoader: Couldn't create texture with ID:",Se.id),null}const J=R.parameters;for(const Se in J){const Re=J[Se];switch(Se){case"diffuse":Re.color&&T.color.fromArray(Re.color),Re.texture&&(T.map=L(Re.texture,Ot));break;case"specular":Re.color&&T.specular&&T.specular.fromArray(Re.color),Re.texture&&(T.specularMap=L(Re.texture));break;case"bump":Re.texture&&(T.normalMap=L(Re.texture));break;case"ambient":Re.texture&&(T.lightMap=L(Re.texture,Ot));break;case"shininess":Re.float&&T.shininess&&(T.shininess=Re.float);break;case"emission":Re.color&&T.emissive&&T.emissive.fromArray(Re.color),Re.texture&&(T.emissiveMap=L(Re.texture,Ot));break}}T.color.convertSRGBToLinear(),T.specular&&T.specular.convertSRGBToLinear(),T.emissive&&T.emissive.convertSRGBToLinear();let oe=J.transparent,Ue=J.transparency;if(Ue===void 0&&oe&&(Ue={float:1}),oe===void 0&&Ue&&(oe={opaque:"A_ONE",data:{color:[1,1,1,1]}}),oe&&Ue)if(oe.data.texture)T.transparent=!0;else{const Se=oe.data.color;switch(oe.opaque){case"A_ONE":T.opacity=Se[3]*Ue.float;break;case"RGB_ZERO":T.opacity=1-Se[0]*Ue.float;break;case"A_ZERO":T.opacity=1-Se[3]*Ue.float;break;case"RGB_ONE":T.opacity=Se[0]*Ue.float;break;default:console.warn('THREE.ColladaLoader: Invalid opaque type "%s" of transparent tag.',oe.opaque)}T.opacity<1&&(T.transparent=!0)}if(R.extra!==void 0&&R.extra.technique!==void 0){const Se=R.extra.technique;for(const Re in Se){const Ge=Se[Re];switch(Re){case"double_sided":T.side=Ge===1?vn:qn;break;case"bump":T.normalMap=L(Ge.texture),T.normalScale=new ye(1,1);break}}}return T}function Qe(b){return _(Ze.materials[b],Me)}function xe(b){const x={name:b.getAttribute("name")};for(let R=0,T=b.childNodes.length;R<T;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"optics":x.optics=Be(L);break}}Ze.cameras[b.getAttribute("id")]=x}function Be(b){for(let x=0;x<b.childNodes.length;x++){const R=b.childNodes[x];switch(R.nodeName){case"technique_common":return rt(R)}}return{}}function rt(b){const x={};for(let R=0;R<b.childNodes.length;R++){const T=b.childNodes[R];switch(T.nodeName){case"perspective":case"orthographic":x.technique=T.nodeName,x.parameters=Ye(T);break}}return x}function Ye(b){const x={};for(let R=0;R<b.childNodes.length;R++){const T=b.childNodes[R];switch(T.nodeName){case"xfov":case"yfov":case"xmag":case"ymag":case"znear":case"zfar":case"aspect_ratio":x[T.nodeName]=parseFloat(T.textContent);break}}return x}function De(b){let x;switch(b.optics.technique){case"perspective":x=new $t(b.optics.parameters.yfov,b.optics.parameters.aspect_ratio,b.optics.parameters.znear,b.optics.parameters.zfar);break;case"orthographic":let R=b.optics.parameters.ymag,T=b.optics.parameters.xmag;const L=b.optics.parameters.aspect_ratio;T=T===void 0?R*L:T,R=R===void 0?T/L:R,T*=.5,R*=.5,x=new ya(-T,T,R,-R,b.optics.parameters.znear,b.optics.parameters.zfar);break;default:x=new $t;break}return x.name=b.name||"",x}function nt(b){const x=Ze.cameras[b];return x!==void 0?_(x,De):(console.warn("THREE.ColladaLoader: Couldn't find camera with ID:",b),null)}function lt(b){let x={};for(let R=0,T=b.childNodes.length;R<T;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"technique_common":x=vt(L);break}}Ze.lights[b.getAttribute("id")]=x}function vt(b){const x={};for(let R=0,T=b.childNodes.length;R<T;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"directional":case"point":case"spot":case"ambient":x.technique=L.nodeName,x.parameters=st(L)}}return x}function st(b){const x={};for(let R=0,T=b.childNodes.length;R<T;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"color":const J=r(L.textContent);x.color=new Xe().fromArray(J).convertSRGBToLinear();break;case"falloff_angle":x.falloffAngle=parseFloat(L.textContent);break;case"quadratic_attenuation":const oe=parseFloat(L.textContent);x.distance=oe?Math.sqrt(1/oe):0;break}}return x}function M(b){let x;switch(b.technique){case"directional":x=new Ac;break;case"point":x=new kf;break;case"spot":x=new Ff;break;case"ambient":x=new eb;break}return b.parameters.color&&x.color.copy(b.parameters.color),b.parameters.distance&&(x.distance=b.parameters.distance),x}function j(b){const x=Ze.lights[b];return x!==void 0?_(x,M):(console.warn("THREE.ColladaLoader: Couldn't find light with ID:",b),null)}function $(b){const x={name:b.getAttribute("name"),sources:{},vertices:{},primitives:[]},R=n(b,"mesh")[0];if(R!==void 0){for(let T=0;T<R.childNodes.length;T++){const L=R.childNodes[T];if(L.nodeType!==1)continue;const J=L.getAttribute("id");switch(L.nodeName){case"source":x.sources[J]=fe(L);break;case"vertices":x.vertices=Ee(L);break;case"polygons":console.warn("THREE.ColladaLoader: Unsupported primitive type: ",L.nodeName);break;case"lines":case"linestrips":case"polylist":case"triangles":x.primitives.push(it(L));break;default:console.log(L)}}Ze.geometries[b.getAttribute("id")]=x}}function fe(b){const x={array:[],stride:3};for(let R=0;R<b.childNodes.length;R++){const T=b.childNodes[R];if(T.nodeType===1)switch(T.nodeName){case"float_array":x.array=r(T.textContent);break;case"Name_array":x.array=i(T.textContent);break;case"technique_common":const L=n(T,"accessor")[0];L!==void 0&&(x.stride=parseInt(L.getAttribute("stride")));break}}return x}function Ee(b){const x={};for(let R=0;R<b.childNodes.length;R++){const T=b.childNodes[R];T.nodeType===1&&(x[T.getAttribute("semantic")]=a(T.getAttribute("source")))}return x}function it(b){const x={type:b.nodeName,material:b.getAttribute("material"),count:parseInt(b.getAttribute("count")),inputs:{},stride:0,hasUV:!1};for(let R=0,T=b.childNodes.length;R<T;R++){const L=b.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"input":const J=a(L.getAttribute("source")),oe=L.getAttribute("semantic"),Ue=parseInt(L.getAttribute("offset")),Se=parseInt(L.getAttribute("set")),Re=Se>0?oe+Se:oe;x.inputs[Re]={id:J,offset:Ue},x.stride=Math.max(x.stride,Ue+1),oe==="TEXCOORD"&&(x.hasUV=!0);break;case"vcount":x.vcount=o(L.textContent);break;case"p":x.p=o(L.textContent);break}}return x}function ct(b){const x={};for(let R=0;R<b.length;R++){const T=b[R];x[T.type]===void 0&&(x[T.type]=[]),x[T.type].push(T)}return x}function Ct(b){let x=0;for(let R=0,T=b.length;R<T;R++)b[R].hasUV===!0&&x++;x>0&&x<b.length&&(b.uvsNeedsFix=!0)}function Ut(b){const x={},R=b.sources,T=b.vertices,L=b.primitives;if(L.length===0)return{};const J=ct(L);for(const oe in J){const Ue=J[oe];Ct(Ue),x[oe]=ft(Ue,R,T)}return x}function ft(b,x,R){const T={},L={array:[],stride:0},J={array:[],stride:0},oe={array:[],stride:0},Ue={array:[],stride:0},Se={array:[],stride:0},Re={array:[],stride:4},Ge={array:[],stride:4},ge=new qt,ze=[];let Oe=0;for(let Ke=0;Ke<b.length;Ke++){const je=b[Ke],Pt=je.inputs;let bt=0;switch(je.type){case"lines":case"linestrips":bt=je.count*2;break;case"triangles":bt=je.count*3;break;case"polylist":for(let gt=0;gt<je.count;gt++){const _t=je.vcount[gt];switch(_t){case 3:bt+=3;break;case 4:bt+=6;break;default:bt+=(_t-2)*3;break}}break;default:console.warn("THREE.ColladaLoader: Unknow primitive type:",je.type)}ge.addGroup(Oe,bt,Ke),Oe+=bt,je.material&&ze.push(je.material);for(const gt in Pt){const _t=Pt[gt];switch(gt){case"VERTEX":for(const ti in R){const ln=R[ti];switch(ti){case"POSITION":const ms=L.array.length;if(pt(je,x[ln],_t.offset,L.array),L.stride=x[ln].stride,x.skinWeights&&x.skinIndices&&(pt(je,x.skinIndices,_t.offset,Re.array),pt(je,x.skinWeights,_t.offset,Ge.array)),je.hasUV===!1&&b.uvsNeedsFix===!0){const xp=(L.array.length-ms)/L.stride;for(let sh=0;sh<xp;sh++)oe.array.push(0,0)}break;case"NORMAL":pt(je,x[ln],_t.offset,J.array),J.stride=x[ln].stride;break;case"COLOR":pt(je,x[ln],_t.offset,Se.array),Se.stride=x[ln].stride;break;case"TEXCOORD":pt(je,x[ln],_t.offset,oe.array),oe.stride=x[ln].stride;break;case"TEXCOORD1":pt(je,x[ln],_t.offset,Ue.array),oe.stride=x[ln].stride;break;default:console.warn('THREE.ColladaLoader: Semantic "%s" not handled in geometry build process.',ti)}}break;case"NORMAL":pt(je,x[_t.id],_t.offset,J.array),J.stride=x[_t.id].stride;break;case"COLOR":pt(je,x[_t.id],_t.offset,Se.array,!0),Se.stride=x[_t.id].stride;break;case"TEXCOORD":pt(je,x[_t.id],_t.offset,oe.array),oe.stride=x[_t.id].stride;break;case"TEXCOORD1":pt(je,x[_t.id],_t.offset,Ue.array),Ue.stride=x[_t.id].stride;break}}}return L.array.length>0&&ge.setAttribute("position",new wt(L.array,L.stride)),J.array.length>0&&ge.setAttribute("normal",new wt(J.array,J.stride)),Se.array.length>0&&ge.setAttribute("color",new wt(Se.array,Se.stride)),oe.array.length>0&&ge.setAttribute("uv",new wt(oe.array,oe.stride)),Ue.array.length>0&&ge.setAttribute("uv1",new wt(Ue.array,Ue.stride)),Re.array.length>0&&ge.setAttribute("skinIndex",new wt(Re.array,Re.stride)),Ge.array.length>0&&ge.setAttribute("skinWeight",new wt(Ge.array,Ge.stride)),T.data=ge,T.type=b[0].type,T.materialKeys=ze,T}function pt(b,x,R,T,L=!1){const J=b.p,oe=b.stride,Ue=b.vcount;function Se(ge){let ze=J[ge+R]*Ge;const Oe=ze+Ge;for(;ze<Oe;ze++)T.push(Re[ze]);if(L){const Ke=T.length-Ge-1;ro.setRGB(T[Ke+0],T[Ke+1],T[Ke+2]).convertSRGBToLinear(),T[Ke+0]=ro.r,T[Ke+1]=ro.g,T[Ke+2]=ro.b}}const Re=x.array,Ge=x.stride;if(b.vcount!==void 0){let ge=0;for(let ze=0,Oe=Ue.length;ze<Oe;ze++){const Ke=Ue[ze];if(Ke===4){const je=ge+oe*0,Pt=ge+oe*1,bt=ge+oe*2,gt=ge+oe*3;Se(je),Se(Pt),Se(gt),Se(Pt),Se(bt),Se(gt)}else if(Ke===3){const je=ge+oe*0,Pt=ge+oe*1,bt=ge+oe*2;Se(je),Se(Pt),Se(bt)}else if(Ke>4)for(let je=1,Pt=Ke-2;je<=Pt;je++){const bt=ge+oe*0,gt=ge+oe*je,_t=ge+oe*(je+1);Se(bt),Se(gt),Se(_t)}ge+=oe*Ke}}else for(let ge=0,ze=J.length;ge<ze;ge+=oe)Se(ge)}function St(b){return _(Ze.geometries[b],Ut)}function kn(b){const x={name:b.getAttribute("name")||"",joints:{},links:[]};for(let R=0;R<b.childNodes.length;R++){const T=b.childNodes[R];if(T.nodeType===1)switch(T.nodeName){case"technique_common":Mn(T,x);break}}Ze.kinematicsModels[b.getAttribute("id")]=x}function an(b){return b.build!==void 0?b.build:b}function Bn(b){return _(Ze.kinematicsModels[b],an)}function Mn(b,x){for(let R=0;R<b.childNodes.length;R++){const T=b.childNodes[R];if(T.nodeType===1)switch(T.nodeName){case"joint":x.joints[T.getAttribute("sid")]=Hi(T);break;case"link":x.links.push(cr(T));break}}}function Hi(b){let x;for(let R=0;R<b.childNodes.length;R++){const T=b.childNodes[R];if(T.nodeType===1)switch(T.nodeName){case"prismatic":case"revolute":x=fs(T);break}}return x}function fs(b){const x={sid:b.getAttribute("sid"),name:b.getAttribute("name")||"",axis:new k,limits:{min:0,max:0},type:b.nodeName,static:!1,zeroPosition:0,middlePosition:0};for(let R=0;R<b.childNodes.length;R++){const T=b.childNodes[R];if(T.nodeType===1)switch(T.nodeName){case"axis":const L=r(T.textContent);x.axis.fromArray(L);break;case"limits":const J=T.getElementsByTagName("max")[0],oe=T.getElementsByTagName("min")[0];x.limits.max=parseFloat(J.textContent),x.limits.min=parseFloat(oe.textContent);break}}return x.limits.min>=x.limits.max&&(x.static=!0),x.middlePosition=(x.limits.min+x.limits.max)/2,x}function cr(b){const x={sid:b.getAttribute("sid"),name:b.getAttribute("name")||"",attachments:[],transforms:[]};for(let R=0;R<b.childNodes.length;R++){const T=b.childNodes[R];if(T.nodeType===1)switch(T.nodeName){case"attachment_full":x.attachments.push(no(T));break;case"matrix":case"translate":case"rotate":x.transforms.push(io(T));break}}return x}function no(b){const x={joint:b.getAttribute("joint").split("/").pop(),transforms:[],links:[]};for(let R=0;R<b.childNodes.length;R++){const T=b.childNodes[R];if(T.nodeType===1)switch(T.nodeName){case"link":x.links.push(cr(T));break;case"matrix":case"translate":case"rotate":x.transforms.push(io(T));break}}return x}function io(b){const x={type:b.nodeName},R=r(b.textContent);switch(x.type){case"matrix":x.obj=new $e,x.obj.fromArray(R).transpose();break;case"translate":x.obj=new k,x.obj.fromArray(R);break;case"rotate":x.obj=new k,x.obj.fromArray(R),x.angle=es.degToRad(R[3]);break}return x}function Na(b){const x={name:b.getAttribute("name")||"",rigidBodies:{}};for(let R=0;R<b.childNodes.length;R++){const T=b.childNodes[R];if(T.nodeType===1)switch(T.nodeName){case"rigid_body":x.rigidBodies[T.getAttribute("name")]={},Ia(T,x.rigidBodies[T.getAttribute("name")]);break}}Ze.physicsModels[b.getAttribute("id")]=x}function Ia(b,x){for(let R=0;R<b.childNodes.length;R++){const T=b.childNodes[R];if(T.nodeType===1)switch(T.nodeName){case"technique_common":N(T,x);break}}}function N(b,x){for(let R=0;R<b.childNodes.length;R++){const T=b.childNodes[R];if(T.nodeType===1)switch(T.nodeName){case"inertia":x.inertia=r(T.textContent);break;case"mass":x.mass=r(T.textContent)[0];break}}}function X(b){const x={bindJointAxis:[]};for(let R=0;R<b.childNodes.length;R++){const T=b.childNodes[R];if(T.nodeType===1)switch(T.nodeName){case"bind_joint_axis":x.bindJointAxis.push(Q(T));break}}Ze.kinematicsScenes[a(b.getAttribute("url"))]=x}function Q(b){const x={target:b.getAttribute("target").split("/").pop()};for(let R=0;R<b.childNodes.length;R++){const T=b.childNodes[R];if(T.nodeType===1)switch(T.nodeName){case"axis":const L=T.getElementsByTagName("param")[0];x.axis=L.textContent;const J=x.axis.split("inst_").pop().split("axis")[0];x.jointIndex=J.substring(0,J.length-1);break}}return x}function Y(b){return b.build!==void 0?b.build:b}function K(b){return _(Ze.kinematicsScenes[b],Y)}function Ce(){const b=Object.keys(Ze.kinematicsModels)[0],x=Object.keys(Ze.kinematicsScenes)[0],R=Object.keys(Ze.visualScenes)[0];if(b===void 0||x===void 0)return;const T=Bn(b),L=K(x),J=ps(R),oe=L.bindJointAxis,Ue={};for(let Ge=0,ge=oe.length;Ge<ge;Ge++){const ze=oe[Ge],Oe=Lt.querySelector('[sid="'+ze.target+'"]');if(Oe){const Ke=Oe.parentElement;Se(ze.jointIndex,Ke)}}function Se(Ge,ge){const ze=ge.getAttribute("name"),Oe=T.joints[Ge];J.traverse(function(Ke){Ke.name===ze&&(Ue[Ge]={object:Ke,transforms:ke(ge),joint:Oe,position:Oe.zeroPosition})})}const Re=new $e;ih={joints:T&&T.joints,getJointValue:function(Ge){const ge=Ue[Ge];if(ge)return ge.position;console.warn("THREE.ColladaLoader: Joint "+Ge+" doesn't exist.")},setJointValue:function(Ge,ge){const ze=Ue[Ge];if(ze){const Oe=ze.joint;if(ge>Oe.limits.max||ge<Oe.limits.min)console.warn("THREE.ColladaLoader: Joint "+Ge+" value "+ge+" outside of limits (min: "+Oe.limits.min+", max: "+Oe.limits.max+").");else if(Oe.static)console.warn("THREE.ColladaLoader: Joint "+Ge+" is static.");else{const Ke=ze.object,je=Oe.axis,Pt=ze.transforms;Fe.identity();for(let bt=0;bt<Pt.length;bt++){const gt=Pt[bt];if(gt.sid&&gt.sid.indexOf(Ge)!==-1)switch(Oe.type){case"revolute":Fe.multiply(Re.makeRotationAxis(je,es.degToRad(ge)));break;case"prismatic":Fe.multiply(Re.makeTranslation(je.x*ge,je.y*ge,je.z*ge));break;default:console.warn("THREE.ColladaLoader: Unknown joint type: "+Oe.type);break}else switch(gt.type){case"matrix":Fe.multiply(gt.obj);break;case"translate":Fe.multiply(Re.makeTranslation(gt.obj.x,gt.obj.y,gt.obj.z));break;case"scale":Fe.scale(gt.obj);break;case"rotate":Fe.multiply(Re.makeRotationAxis(gt.obj,gt.angle));break}}Ke.matrix.copy(Fe),Ke.matrix.decompose(Ke.position,Ke.quaternion,Ke.scale),Ue[Ge].position=ge}}else console.log("THREE.ColladaLoader: "+Ge+" does not exist.")}}}function ke(b){const x=[],R=Lt.querySelector('[id="'+b.id+'"]');for(let T=0;T<R.childNodes.length;T++){const L=R.childNodes[T];if(L.nodeType!==1)continue;let J,oe;switch(L.nodeName){case"matrix":J=r(L.textContent);const Ue=new $e().fromArray(J).transpose();x.push({sid:L.getAttribute("sid"),type:L.nodeName,obj:Ue});break;case"translate":case"scale":J=r(L.textContent),oe=new k().fromArray(J),x.push({sid:L.getAttribute("sid"),type:L.nodeName,obj:oe});break;case"rotate":J=r(L.textContent),oe=new k().fromArray(J);const Se=es.degToRad(J[3]);x.push({sid:L.getAttribute("sid"),type:L.nodeName,obj:oe,angle:Se});break}}return x}function Ve(b){const x=b.getElementsByTagName("node");for(let R=0;R<x.length;R++){const T=x[R];T.hasAttribute("id")===!1&&T.setAttribute("id",l())}}const Fe=new $e,Je=new k;function tt(b){const x={name:b.getAttribute("name")||"",type:b.getAttribute("type"),id:b.getAttribute("id"),sid:b.getAttribute("sid"),matrix:new $e,nodes:[],instanceCameras:[],instanceControllers:[],instanceLights:[],instanceGeometries:[],instanceNodes:[],transforms:{}};for(let R=0;R<b.childNodes.length;R++){const T=b.childNodes[R];if(T.nodeType!==1)continue;let L;switch(T.nodeName){case"node":x.nodes.push(T.getAttribute("id")),tt(T);break;case"instance_camera":x.instanceCameras.push(a(T.getAttribute("url")));break;case"instance_controller":x.instanceControllers.push(ot(T));break;case"instance_light":x.instanceLights.push(a(T.getAttribute("url")));break;case"instance_geometry":x.instanceGeometries.push(ot(T));break;case"instance_node":x.instanceNodes.push(a(T.getAttribute("url")));break;case"matrix":L=r(T.textContent),x.matrix.multiply(Fe.fromArray(L).transpose()),x.transforms[T.getAttribute("sid")]=T.nodeName;break;case"translate":L=r(T.textContent),Je.fromArray(L),x.matrix.multiply(Fe.makeTranslation(Je.x,Je.y,Je.z)),x.transforms[T.getAttribute("sid")]=T.nodeName;break;case"rotate":L=r(T.textContent);const J=es.degToRad(L[3]);x.matrix.multiply(Fe.makeRotationAxis(Je.fromArray(L),J)),x.transforms[T.getAttribute("sid")]=T.nodeName;break;case"scale":L=r(T.textContent),x.matrix.scale(Je.fromArray(L)),x.transforms[T.getAttribute("sid")]=T.nodeName;break;case"extra":break;default:console.log(T)}}return gi(x.id)?console.warn("THREE.ColladaLoader: There is already a node with ID %s. Exclude current node from further processing.",x.id):Ze.nodes[x.id]=x,x}function ot(b){const x={id:a(b.getAttribute("url")),materials:{},skeletons:[]};for(let R=0;R<b.childNodes.length;R++){const T=b.childNodes[R];switch(T.nodeName){case"bind_material":const L=T.getElementsByTagName("instance_material");for(let J=0;J<L.length;J++){const oe=L[J],Ue=oe.getAttribute("symbol"),Se=oe.getAttribute("target");x.materials[Ue]=a(Se)}break;case"skeleton":x.skeletons.push(a(T.textContent));break}}return x}function Dt(b,x){const R=[],T=[];let L,J,oe;for(L=0;L<b.length;L++){const Re=b[L];let Ge;if(gi(Re))Ge=yt(Re),zt(Ge,x,R);else if(Vi(Re)){const ze=Ze.visualScenes[Re].children;for(let Oe=0;Oe<ze.length;Oe++){const Ke=ze[Oe];if(Ke.type==="JOINT"){const je=yt(Ke.id);zt(je,x,R)}}}else console.error("THREE.ColladaLoader: Unable to find root bone of skeleton with ID:",Re)}for(L=0;L<x.length;L++)for(J=0;J<R.length;J++)if(oe=R[J],oe.bone.name===x[L].name){T[L]=oe,oe.processed=!0;break}for(L=0;L<R.length;L++)oe=R[L],oe.processed===!1&&(T.push(oe),oe.processed=!0);const Ue=[],Se=[];for(L=0;L<T.length;L++)oe=T[L],Ue.push(oe.bone),Se.push(oe.boneInverse);return new xa(Ue,Se)}function zt(b,x,R){b.traverse(function(T){if(T.isBone===!0){let L;for(let J=0;J<x.length;J++){const oe=x[J];if(oe.name===T.name){L=oe.boneInverse;break}}L===void 0&&(L=new $e),R.push({bone:T,boneInverse:L,processed:!1})}})}function Qt(b){const x=[],R=b.matrix,T=b.nodes,L=b.type,J=b.instanceCameras,oe=b.instanceControllers,Ue=b.instanceLights,Se=b.instanceGeometries,Re=b.instanceNodes;for(let ge=0,ze=T.length;ge<ze;ge++)x.push(yt(T[ge]));for(let ge=0,ze=J.length;ge<ze;ge++){const Oe=nt(J[ge]);Oe!==null&&x.push(Oe.clone())}for(let ge=0,ze=oe.length;ge<ze;ge++){const Oe=oe[ge],Ke=ee(Oe.id),je=St(Ke.id),Pt=et(je,Oe.materials),bt=Oe.skeletons,gt=Ke.skin.joints,_t=Dt(bt,gt);for(let ti=0,ln=Pt.length;ti<ln;ti++){const ms=Pt[ti];ms.isSkinnedMesh&&(ms.bind(_t,Ke.skin.bindMatrix),ms.normalizeSkinWeights()),x.push(ms)}}for(let ge=0,ze=Ue.length;ge<ze;ge++){const Oe=j(Ue[ge]);Oe!==null&&x.push(Oe.clone())}for(let ge=0,ze=Se.length;ge<ze;ge++){const Oe=Se[ge],Ke=St(Oe.id),je=et(Ke,Oe.materials);for(let Pt=0,bt=je.length;Pt<bt;Pt++)x.push(je[Pt])}for(let ge=0,ze=Re.length;ge<ze;ge++)x.push(yt(Re[ge]).clone());let Ge;if(T.length===0&&x.length===1)Ge=x[0];else{Ge=L==="JOINT"?new gc:new pi;for(let ge=0;ge<x.length;ge++)Ge.add(x[ge])}return Ge.name=L==="JOINT"?b.sid:b.name,Ge.matrix.copy(R),Ge.matrix.decompose(Ge.position,Ge.quaternion,Ge.scale),Ge}const Sn=new Xn({name:$n.DEFAULT_MATERIAL_NAME,color:16711935});function mt(b,x){const R=[];for(let T=0,L=b.length;T<L;T++){const J=x[b[T]];J===void 0?(console.warn("THREE.ColladaLoader: Material with key %s not found. Apply fallback material.",b[T]),R.push(Sn)):R.push(Qe(J))}return R}function et(b,x){const R=[];for(const T in b){const L=b[T],J=mt(L.materialKeys,x);if(J.length===0&&(T==="lines"||T==="linestrips"?J.push(new Hr):J.push(new Ni)),T==="lines"||T==="linestrips")for(let Re=0,Ge=J.length;Re<Ge;Re++){const ge=J[Re];if(ge.isMeshPhongMaterial===!0||ge.isMeshLambertMaterial===!0){const ze=new Hr;ze.color.copy(ge.color),ze.opacity=ge.opacity,ze.transparent=ge.transparent,J[Re]=ze}}const oe=L.data.attributes.skinIndex!==void 0,Ue=J.length===1?J[0]:J;let Se;switch(T){case"lines":Se=new yc(L.data,Ue);break;case"linestrips":Se=new ba(L.data,Ue);break;case"triangles":case"polylist":oe?Se=new Sf(L.data,Ue):Se=new Bt(L.data,Ue);break}R.push(Se)}return R}function gi(b){return Ze.nodes[b]!==void 0}function yt(b){return _(Ze.nodes[b],Qt)}function ei(b){const x={name:b.getAttribute("name"),children:[]};Ve(b);const R=n(b,"node");for(let T=0;T<R.length;T++)x.children.push(tt(R[T]));Ze.visualScenes[b.getAttribute("id")]=x}function hr(b){const x=new pi;x.name=b.name;const R=b.children;for(let T=0;T<R.length;T++){const L=R[T];x.add(yt(L.id))}return x}function Vi(b){return Ze.visualScenes[b]!==void 0}function ps(b){return _(Ze.visualScenes[b],hr)}function jt(b){const x=n(b,"instance_visual_scene")[0];return ps(a(x.getAttribute("url")))}function zn(){const b=Ze.clips;if(c(b)===!0){if(c(Ze.animations)===!1){const x=[];for(const R in Ze.animations){const T=S(R);for(let L=0,J=T.length;L<J;L++)x.push(T[L])}oo.push(new Zl("default",-1,x))}}else for(const x in b)oo.push(G(x))}function ur(b){let x="";const R=[b];for(;R.length;){const T=R.shift();T.nodeType===Node.TEXT_NODE?x+=T.textContent:(x+=`
`,R.push.apply(R,T.childNodes))}return x.trim()}if(e.length===0)return{scene:new Mf};const en=new DOMParser().parseFromString(e,"application/xml"),Lt=n(en,"COLLADA")[0],dr=en.getElementsByTagName("parsererror")[0];if(dr!==void 0){const b=n(dr,"div")[0];let x;return b?x=b.textContent:x=ur(dr),console.error(`THREE.ColladaLoader: Failed to parse collada file.
`,x),null}const so=Lt.getAttribute("version");console.debug("THREE.ColladaLoader: File version",so);const th=h(n(Lt,"asset")[0]),nh=new wc(this.manager);nh.setPath(this.resourcePath||t).setCrossOrigin(this.crossOrigin);let Da;id&&(Da=new id(this.manager),Da.setPath(this.resourcePath||t));const ro=new Xe,oo=[];let ih={},vp=0;const Ze={animations:{},clips:{},controllers:{},images:{},effects:{},materials:{},cameras:{},lights:{},geometries:{},nodes:{},visualScenes:{},kinematicsModels:{},physicsModels:{},kinematicsScenes:{}};f(Lt,"library_animations","animation",p),f(Lt,"library_animation_clips","animation_clip",B),f(Lt,"library_controllers","controller",se),f(Lt,"library_images","image",ne),f(Lt,"library_effects","effect",qe),f(Lt,"library_materials","material",He),f(Lt,"library_cameras","camera",xe),f(Lt,"library_lights","light",lt),f(Lt,"library_geometries","geometry",$),f(Lt,"library_nodes","node",tt),f(Lt,"library_visual_scenes","visual_scene",ei),f(Lt,"library_kinematics_models","kinematics_model",kn),f(Lt,"library_physics_models","physics_model",Na),f(Lt,"scene","instance_kinematics_scene",X),g(Ze.animations,v),g(Ze.clips,he),g(Ze.controllers,Ae),g(Ze.images,te),g(Ze.effects,de),g(Ze.materials,Me),g(Ze.cameras,De),g(Ze.lights,M),g(Ze.geometries,Ut),g(Ze.visualScenes,hr),zn(),Ce();const ao=jt(n(Lt,"scene")[0]);return ao.animations=oo,th.upAxis==="Z_UP"&&(console.warn("THREE.ColladaLoader: You are loading an asset with a Z-UP coordinate system. The loader just rotates the asset to transform it into Y-UP. The vertex data are not converted, see #24289."),ao.rotation.set(-Math.PI/2,0,0)),ao.scale.multiplyScalar(th.unit),{get animations(){return console.warn("THREE.ColladaLoader: Please access animations over scene.animations now."),oo},kinematics:ih,library:Ze,scene:ao}}}function pM(s,e=!1){const t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},o={},a=s[0].morphTargetsRelative,l=new qt;let c=0;for(let h=0;h<s.length;++h){const u=s[h];let d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(e){let f;if(t)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0;const u=[];for(let d=0;d<s.length;++d){const f=s[d].index;for(let g=0;g<f.count;++g)u.push(f.getX(g)+h);h+=s[d].attributes.position.count}l.setIndex(u)}for(const h in r){const u=sd(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let _=0;_<o[h].length;++_)f.push(o[h][_][d]);const g=sd(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function sd(s){let e,t,n,i=-1,r=0;for(let c=0;c<s.length;++c){const h=s[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}const o=new e(r),a=new It(o,t,n);let l=0;for(let c=0;c<s.length;++c){const h=s[c];if(h.isInterleavedBufferAttribute){const u=l/t;for(let d=0,f=h.count;d<f;d++)for(let g=0;g<t;g++){const _=h.getComponent(d,g);a.setComponent(d+u,g,_)}}else o.set(h.array,l);l+=h.count*t}return i!==void 0&&(a.gpuType=i),a}function gb(s,e=1e-4){e=Math.max(e,Number.EPSILON);const t={},n=s.getIndex(),i=s.getAttribute("position"),r=n?n.count:i.count;let o=0;const a=Object.keys(s.attributes),l={},c={},h=[],u=["getX","getY","getZ","getW"],d=["setX","setY","setZ","setW"];for(let w=0,v=a.length;w<v;w++){const S=a[w],I=s.attributes[S];l[S]=new It(new I.array.constructor(I.count*I.itemSize),I.itemSize,I.normalized);const P=s.morphAttributes[S];P&&(c[S]=new It(new P.array.constructor(P.count*P.itemSize),P.itemSize,P.normalized))}const f=e*.5,g=Math.log10(1/e),_=Math.pow(10,g),p=f*_;for(let w=0;w<r;w++){const v=n?n.getX(w):w;let S="";for(let I=0,P=a.length;I<P;I++){const C=a[I],D=s.getAttribute(C),E=D.itemSize;for(let y=0;y<E;y++)S+=`${~~(D[u[y]](v)*_+p)},`}if(S in t)h.push(t[S]);else{for(let I=0,P=a.length;I<P;I++){const C=a[I],D=s.getAttribute(C),E=s.morphAttributes[C],y=D.itemSize,U=l[C],z=c[C];for(let F=0;F<y;F++){const H=u[F],Z=d[F];if(U[Z](o,D[H](v)),E)for(let B=0,he=E.length;B<he;B++)z[B][Z](o,E[B][H](v))}}t[S]=o,h.push(o),o++}}const m=s.clone();for(const w in s.attributes){const v=l[w];if(m.setAttribute(w,new It(v.array.slice(0,o*v.itemSize),v.itemSize,v.normalized)),w in c)for(let S=0;S<c[w].length;S++){const I=c[w][S];m.morphAttributes[w][S]=new It(I.array.slice(0,o*I.itemSize),I.itemSize,I.normalized)}}return m.setIndex(h),m}function rd(s,e){if(e===gm)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===Wl||e===sf){let t=s.getIndex();if(t===null){const o=[],a=s.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===Wl)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}class _b extends $n{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Eb(t)}),this.register(function(t){return new Mb(t)}),this.register(function(t){return new Nb(t)}),this.register(function(t){return new Ib(t)}),this.register(function(t){return new Db(t)}),this.register(function(t){return new wb(t)}),this.register(function(t){return new Tb(t)}),this.register(function(t){return new Ab(t)}),this.register(function(t){return new Cb(t)}),this.register(function(t){return new bb(t)}),this.register(function(t){return new Rb(t)}),this.register(function(t){return new Sb(t)}),this.register(function(t){return new Pb(t)}),this.register(function(t){return new Lb(t)}),this.register(function(t){return new vb(t)}),this.register(function(t){return new Ub(t)}),this.register(function(t){return new Ob(t)})}load(e,t,n,i){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=ss.extractUrlBase(e);o=ss.resolveURL(c,this.path)}else o=ss.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Jr(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Hf){try{o[dt.KHR_BINARY_GLTF]=new Fb(e)}catch(u){i&&i(u);return}r=JSON.parse(o[dt.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new Kb(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case dt.KHR_MATERIALS_UNLIT:o[u]=new xb;break;case dt.KHR_DRACO_MESH_COMPRESSION:o[u]=new kb(r,this.dracoLoader);break;case dt.KHR_TEXTURE_TRANSFORM:o[u]=new Bb;break;case dt.KHR_MESH_QUANTIZATION:o[u]=new zb;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function yb(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const dt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class vb{constructor(e){this.parser=e,this.name=dt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new Xe(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Yt);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Ac(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new kf(h),c.distance=u;break;case"spot":c=new Ff(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,wi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class xb{constructor(){this.name=dt.KHR_MATERIALS_UNLIT}getMaterialType(){return Xn}extendParams(e,t,n){const i=[];e.color=new Xe(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Yt),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Ot))}return Promise.all(i)}}class bb{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class Eb{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Jn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ye(a,a)}return Promise.all(r)}}class Mb{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Jn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class Sb{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Jn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class wb{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Jn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new Xe(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Yt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Ot)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class Tb{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Jn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class Ab{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Jn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Xe().setRGB(a[0],a[1],a[2],Yt),Promise.all(r)}}class Cb{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Jn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class Rb{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Jn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new Xe().setRGB(a[0],a[1],a[2],Yt),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Ot)),Promise.all(r)}}class Lb{constructor(e){this.parser=e,this.name=dt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Jn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class Pb{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Jn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class Nb{constructor(e){this.parser=e,this.name=dt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class Ib{constructor(e){this.parser=e,this.name=dt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Db{constructor(e){this.parser=e,this.name=dt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Ub{constructor(e){this.name=dt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class Ob{constructor(e){this.name=dt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==_n.TRIANGLES&&c.mode!==_n.TRIANGLE_STRIP&&c.mode!==_n.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const g of u){const _=new $e,p=new k,m=new pn,w=new k(1,1,1),v=new tx(g.geometry,g.material,d);for(let S=0;S<d;S++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,S),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,S),l.SCALE&&w.fromBufferAttribute(l.SCALE,S),v.setMatrixAt(S,_.compose(p,m,w));for(const S in l)if(S==="_COLOR_0"){const I=l[S];v.instanceColor=new ql(I.array,I.itemSize,I.normalized)}else S!=="TRANSLATION"&&S!=="ROTATION"&&S!=="SCALE"&&g.geometry.setAttribute(S,l[S]);At.prototype.copy.call(v,g),this.parser.assignFinalMaterial(v),f.push(v)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Hf="glTF",br=12,od={JSON:1313821514,BIN:5130562};class Fb{constructor(e){this.name=dt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,br),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Hf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-br,r=new DataView(e,br);let o=0;for(;o<i;){const a=r.getUint32(o,!0);o+=4;const l=r.getUint32(o,!0);if(o+=4,l===od.JSON){const c=new Uint8Array(e,br+o,a);this.content=n.decode(c)}else if(l===od.BIN){const c=br+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class kb{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=dt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const h in o){const u=ec[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=ec[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],f=Xs[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const g in f.attributes){const _=f.attributes[g],p=l[g];p!==void 0&&(_.normalized=p)}u(f)},a,c,Yt,d)})})}}class Bb{constructor(){this.name=dt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class zb{constructor(){this.name=dt.KHR_MESH_QUANTIZATION}}class Vf extends Kr{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,g=e*c,_=g-c,p=-2*f+3*d,m=f-d,w=1-p,v=m-d+u;for(let S=0;S!==a;S++){const I=o[_+S+a],P=o[_+S+l]*h,C=o[g+S+a],D=o[g+S]*h;r[S]=w*I+v*P+p*C+m*D}return r}}const Hb=new pn;class Vb extends Vf{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return Hb.fromArray(r).normalize().toArray(r),r}}const _n={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Xs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ad={9728:rn,9729:Zt,9984:$d,9985:Ko,9986:wr,9987:In},ld={33071:bn,33648:na,10497:Wn},bl={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ec={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Si={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Gb={CUBICSPLINE:void 0,LINEAR:Js,STEP:Br},El={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Wb(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Sc({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:qn})),s.DefaultMaterial}function Yi(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function wi(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function jb(s,e,t){let n=!1,i=!1,r=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const o=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;o.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;a.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function Xb(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function qb(s){let e;const t=s.extensions&&s.extensions[dt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Ml(t.attributes):e=s.indices+":"+Ml(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+Ml(s.targets[n]);return e}function Ml(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function tc(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function $b(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const Yb=new $e;class Kb{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new yb,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,r=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,r=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&r<98?this.textureLoader=new wc(this.options.manager):this.textureLoader=new tb(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Jr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Yi(r,a,i),wi(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,h]of o.children.entries())r(h,a.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[dt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,o){n.load(ss.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=bl[i.type],a=Xs[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new It(c,o,l))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],l=bl[i.type],c=Xs[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,p;if(f&&f!==u){const m=Math.floor(d/f),w="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count;let v=t.cache.get(w);v||(_=new c(a,m*f,i.count*f/h),v=new Jv(_,f/h),t.cache.add(w,v)),p=new mc(v,l,d%f/h,g)}else a===null?_=new c(i.count*l):_=new c(a,d,i.count*l),p=new It(_,l,g);if(i.sparse!==void 0){const m=bl.SCALAR,w=Xs[i.sparse.indices.componentType],v=i.sparse.indices.byteOffset||0,S=i.sparse.values.byteOffset||0,I=new w(o[1],v,i.sparse.count*m),P=new c(o[2],S,i.sparse.count*l);a!==null&&(p=new It(p.array.slice(),p.itemSize,p.normalized));for(let C=0,D=I.length;C<D;C++){const E=I[C];if(p.setX(E,P[C*l]),l>=2&&p.setY(E,P[C*l+1]),l>=3&&p.setZ(E,P[C*l+2]),l>=4&&p.setW(E,P[C*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return p})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const i=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(r.samplers||{})[o.sampler]||{};return h.magFilter=ad[d.magFilter]||Zt,h.minFilter=ad[d.minFilter]||In,h.wrapS=ld[d.wrapS]||Wn,h.wrapT=ld[d.wrapT]||Wn,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const p=new Vt(_);p.needsUpdate=!0,d(p)}),t.load(ss.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),u.userData.mimeType=o.mimeType||$b(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[dt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[dt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=r.associations.get(o);o=r.extensions[dt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new wf,fn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Hr,fn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Sc}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let o;const a={},l=r.extensions||{},c=[];if(l[dt.KHR_MATERIALS_UNLIT]){const u=i[dt.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,r,t))}else{const u=r.pbrMetallicRoughness||{};if(a.color=new Xe(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Yt),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture,Ot)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=vn);const h=r.alphaMode||El.OPAQUE;if(h===El.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===El.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Xn&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new ye(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==Xn&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Xn){const u=r.emissiveFactor;a.emissive=new Xe().setRGB(u[0],u[1],u[2],Yt)}return r.emissiveTexture!==void 0&&o!==Xn&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Ot)),Promise.all(c).then(function(){const u=new o(a);return r.name&&(u.name=r.name),wi(u,r),t.associations.set(u,{materials:e}),r.extensions&&Yi(i,u,r),u})}createUniqueName(e){const t=Mt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[dt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return cd(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],h=qb(c),u=i[h];if(u)o.push(u.promise);else{let d;c.extensions&&c.extensions[dt.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=cd(new qt,c,t),i[h]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const h=o[l].material===void 0?Wb(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,g=h.length;f<g;f++){const _=h[f],p=o[f];let m;const w=c[f];if(p.mode===_n.TRIANGLES||p.mode===_n.TRIANGLE_STRIP||p.mode===_n.TRIANGLE_FAN||p.mode===void 0)m=r.isSkinnedMesh===!0?new Sf(_,w):new Bt(_,w),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),p.mode===_n.TRIANGLE_STRIP?m.geometry=rd(m.geometry,sf):p.mode===_n.TRIANGLE_FAN&&(m.geometry=rd(m.geometry,Wl));else if(p.mode===_n.LINES)m=new yc(_,w);else if(p.mode===_n.LINE_STRIP)m=new ba(_,w);else if(p.mode===_n.LINE_LOOP)m=new nx(_,w);else if(p.mode===_n.POINTS)m=new ix(_,w);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(m.geometry.morphAttributes).length>0&&Xb(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),wi(m,r),p.extensions&&Yi(i,m,p),t.assignFinalMaterial(m),u.push(m)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&Yi(i,u[0],r),u[0];const d=new pi;r.extensions&&Yi(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new $t(es.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new ya(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),wi(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),o=i,a=[],l=[];for(let c=0,h=o.length;c<h;c++){const u=o[c];if(u){a.push(u);const d=new $e;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new xa(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],g=i.samplers[f.sampler],_=f.target,p=_.node,m=i.parameters!==void 0?i.parameters[g.input]:g.input,w=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",p)),a.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",w)),c.push(g),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],g=u[2],_=u[3],p=u[4],m=[];for(let w=0,v=d.length;w<v;w++){const S=d[w],I=f[w],P=g[w],C=_[w],D=p[w];if(S===void 0)continue;S.updateMatrix&&S.updateMatrix();const E=n._createAnimationTracks(S,I,P,C,D);if(E)for(let y=0;y<E.length;y++)m.push(E[y])}return new Zl(r,void 0,m)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,h=a.length;c<h;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Yb)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(r.isBone===!0?h=new gc:c.length>1?h=new pi:c.length===1?h=c[0]:h=new At,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=o),wi(h,r),r.extensions&&Yi(n,h,r),r.matrix!==void 0){const u=new $e;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new pi;n.name&&(r.name=i.createUniqueName(n.name)),wi(r,n),n.extensions&&Yi(t,r,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++)r.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof fn||d instanceof Vt)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(r),r})}_createAnimationTracks(e,t,n,i,r){const o=[],a=e.name?e.name:e.uuid,l=[];Si[r.path]===Si.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(Si[r.path]){case Si.weights:c=er;break;case Si.rotation:c=Fi;break;case Si.position:case Si.scale:c=ki;break;default:switch(n.itemSize){case 1:c=er;break;case 2:case 3:default:c=ki;break}break}const h=i.interpolation!==void 0?Gb[i.interpolation]:Js,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const g=new c(l[d]+"."+Si[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=tc(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Fi?Vb:Vf;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Jb(s,e,t){const n=e.attributes,i=new Yn;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new k(l[0],l[1],l[2]),new k(c[0],c[1],c[2])),a.normalized){const h=tc(Xs[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new k,l=new k;for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const _=tc(Xs[d.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;const o=new Fn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function cd(s,e,t){const n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){s.setAttribute(a,l)})}for(const o in n){const a=ec[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){const o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return xt.workingColorSpace!==Yt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${xt.workingColorSpace}" not supported.`),wi(s,e),Jb(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?jb(s,e.targets,t):s})}class Zb extends $n{constructor(e){super(e)}load(e,t,n,i){const r=this,o=new Jr(this.manager);o.setPath(this.path),o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(a){try{t(r.parse(a))}catch(l){i?i(l):console.error(l),r.manager.itemError(e)}},n,i)}parse(e){function t(c){const h=new DataView(c),u=32/8*3+32/8*3*3+16/8,d=h.getUint32(80,!0);if(80+32/8+d*u===h.byteLength)return!0;const g=[115,111,108,105,100];for(let _=0;_<5;_++)if(n(g,h,_))return!1;return!0}function n(c,h,u){for(let d=0,f=c.length;d<f;d++)if(c[d]!==h.getUint8(u+d))return!1;return!0}function i(c){const h=new DataView(c),u=h.getUint32(80,!0);let d,f,g,_=!1,p,m,w,v,S;for(let U=0;U<70;U++)h.getUint32(U,!1)==1129270351&&h.getUint8(U+4)==82&&h.getUint8(U+5)==61&&(_=!0,p=new Float32Array(u*3*3),m=h.getUint8(U+6)/255,w=h.getUint8(U+7)/255,v=h.getUint8(U+8)/255,S=h.getUint8(U+9)/255);const I=84,P=50,C=new qt,D=new Float32Array(u*3*3),E=new Float32Array(u*3*3),y=new Xe;for(let U=0;U<u;U++){const z=I+U*P,F=h.getFloat32(z,!0),H=h.getFloat32(z+4,!0),Z=h.getFloat32(z+8,!0);if(_){const B=h.getUint16(z+48,!0);(B&32768)===0?(d=(B&31)/31,f=(B>>5&31)/31,g=(B>>10&31)/31):(d=m,f=w,g=v)}for(let B=1;B<=3;B++){const he=z+B*12,G=U*3*3+(B-1)*3;D[G]=h.getFloat32(he,!0),D[G+1]=h.getFloat32(he+4,!0),D[G+2]=h.getFloat32(he+8,!0),E[G]=F,E[G+1]=H,E[G+2]=Z,_&&(y.set(d,f,g).convertSRGBToLinear(),p[G]=y.r,p[G+1]=y.g,p[G+2]=y.b)}}return C.setAttribute("position",new It(D,3)),C.setAttribute("normal",new It(E,3)),_&&(C.setAttribute("color",new It(p,3)),C.hasColors=!0,C.alpha=S),C}function r(c){const h=new qt,u=/solid([\s\S]*?)endsolid/g,d=/facet([\s\S]*?)endfacet/g,f=/solid\s(.+)/;let g=0;const _=/[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source,p=new RegExp("vertex"+_+_+_,"g"),m=new RegExp("normal"+_+_+_,"g"),w=[],v=[],S=[],I=new k;let P,C=0,D=0,E=0;for(;(P=u.exec(c))!==null;){D=E;const y=P[0],U=(P=f.exec(y))!==null?P[1]:"";for(S.push(U);(P=d.exec(y))!==null;){let H=0,Z=0;const B=P[0];for(;(P=m.exec(B))!==null;)I.x=parseFloat(P[1]),I.y=parseFloat(P[2]),I.z=parseFloat(P[3]),Z++;for(;(P=p.exec(B))!==null;)w.push(parseFloat(P[1]),parseFloat(P[2]),parseFloat(P[3])),v.push(I.x,I.y,I.z),H++,E++;Z!==1&&console.error("THREE.STLLoader: Something isn't right with the normal of face number "+g),H!==3&&console.error("THREE.STLLoader: Something isn't right with the vertices of face number "+g),g++}const z=D,F=E-D;h.userData.groupNames=S,h.addGroup(z,F,C),C++}return h.setAttribute("position",new wt(w,3)),h.setAttribute("normal",new wt(v,3)),h}function o(c){return typeof c!="string"?new TextDecoder().decode(c):c}function a(c){if(typeof c=="string"){const h=new Uint8Array(c.length);for(let u=0;u<c.length;u++)h[u]=c.charCodeAt(u)&255;return h.buffer||h}else return c}const l=a(e);return t(l)?i(l):r(o(e))}}const Gf=new rr(1,1,1);Gf.userData.shared=!0;const Wf=new Mc(1,32,32);Wf.userData.shared=!0;const jf=new bc(1,1,1,32);jf.userData.shared=!0;const hd=new pn,ud=new on;function Ki(s){if(!s)return[0,0,0];const e=s.trim().split(/\s+/).map(Number);return[e[0]??0,e[1]??0,e[2]??0]}function dd(s,e){ud.set(e[0],e[1],e[2],"ZYX"),hd.setFromEuler(ud).premultiply(s.quaternion),s.quaternion.copy(hd)}class Pc{constructor(){this.packages="",this.workingPath="",this.parseVisual=!0,this.parseCollision=!1,this.fetchOptions={},this.loadMesh=Pc.defaultMeshLoader}async load(e,t){const n={...t},i=n.workingPath??ss.extractUrlBase(e),r=n.fetchOptions??this.fetchOptions,o=await fetch(e,r);if(!o.ok)throw new Error(`URDFLoader: failed to fetch "${e}" (${o.status} ${o.statusText})`);const a=await o.text();return this.parse(a,{...n,workingPath:i})}parse(e,t){var P;const n=(t==null?void 0:t.packages)??this.packages,i=(t==null?void 0:t.workingPath)??this.workingPath,r=(t==null?void 0:t.parseVisual)??this.parseVisual,o=(t==null?void 0:t.parseCollision)??this.parseCollision,a=(t==null?void 0:t.loadMesh)??this.loadMesh,l=new Of,c=Qb(n,i),h={},u={},d={};let f;if(e instanceof Document?f=e.querySelector("robot"):e instanceof Element?f=e:f=new DOMParser().parseFromString(e,"text/xml").querySelector("robot"),!f)throw new Error("URDFLoader: no <robot> element found");for(const C of f.querySelectorAll(":scope > material")){const D=C.getAttribute("name")??"";h[D]=I(C)}const g={},_={};for(const C of f.querySelectorAll(":scope > link")){const D=C.getAttribute("name")??"",E=!f.querySelector(`child[link="${D}"]`);u[D]=m(C,E?new nd:new Bf)}for(const C of f.querySelectorAll(":scope > joint")){const D=C.getAttribute("name")??"";d[D]=w(C)}const p=Object.values(u).find(C=>C instanceof nd);p.robotName=f.getAttribute("name")??"",p.urdfRobotNode=f,p.joints=d,p.links=u,p.colliders=_,p.visual=g;for(const C of Object.values(d))C instanceof xl&&((P=d[C.mimicJoint])==null||P.mimicJoints.push(C));return eE(Object.values(d)),p.frames={..._,...g,...u,...d},p;function m(C,D){if(D.name=C.getAttribute("name")??"",D.urdfName=D.name,D.urdfNode=C,r)for(const E of C.querySelectorAll(":scope > visual")){const y=v(E,!1);D.add(y);const U=E.getAttribute("name");U&&(y.name=U,y.urdfName=U,g[U]=y)}if(o)for(const E of C.querySelectorAll(":scope > collision")){const y=v(E,!0);D.add(y);const U=E.getAttribute("name");U&&(y.name=U,y.urdfName=U,_[U]=y)}return D}function w(C){const D=C.querySelector(":scope > mimic"),E=D?new xl:new zf;E instanceof xl&&(E.mimicJoint=D.getAttribute("joint")??"",E.multiplier=parseFloat(D.getAttribute("multiplier")??"1"),E.offset=parseFloat(D.getAttribute("offset")??"0")),E.urdfNode=C,E.name=C.getAttribute("name")??"",E.urdfName=E.name,E.jointType=C.getAttribute("type")??"fixed";let y=null,U=null,z=[0,0,0],F=[0,0,0];for(const H of C.children)switch(H.nodeName.toLowerCase()){case"origin":z=Ki(H.getAttribute("xyz")),F=Ki(H.getAttribute("rpy"));break;case"parent":y=u[H.getAttribute("link")??""]??null;break;case"child":U=u[H.getAttribute("link")??""]??null;break;case"limit":E.limit.lower=parseFloat(H.getAttribute("lower")??String(E.limit.lower)),E.limit.upper=parseFloat(H.getAttribute("upper")??String(E.limit.upper));break;case"axis":{const[Z,B,he]=Ki(H.getAttribute("xyz"));E.axis.set(Z,B,he).normalize();break}}if(!y||!U)throw new Error(`URDFLoader: joint "${E.name}" missing parent or child link`);return y.add(E),E.add(U),E.rotation.set(0,0,0),dd(E,F),E.position.set(z[0],z[1],z[2]),E}function v(C,D){const E=D?new fb:new pb;E.urdfNode=C;let y=null;const U=C.querySelector(":scope > material");if(U){const H=U.getAttribute("name")??"";y=H&&h[H]?h[H]:I(U)}const z=C.querySelector(":scope > geometry");if(z){const H=z.firstElementChild;H&&S(H,E,y??new Ni)}const F=C.querySelector(":scope > origin");if(F){const H=Ki(F.getAttribute("xyz")),Z=Ki(F.getAttribute("rpy"));E.position.set(H[0],H[1],H[2]),E.rotation.set(0,0,0),dd(E,Z)}return E}function S(C,D,E){switch(C.nodeName.toLowerCase()){case"mesh":{const y=C.getAttribute("filename");if(!y)return;const U=c(y);if(!U)return;const z=C.getAttribute("scale");if(z){const[F,H,Z]=Ki(z);D.scale.set(F,H,Z)}l.itemStart(U),a(U,l).then(F=>{F&&(F instanceof Bt&&(F.material=E),F.position.set(0,0,0),F.quaternion.identity(),D.add(F))}).catch(F=>console.error(`URDFLoader: failed to load mesh "${U}"`,F)).finally(()=>l.itemEnd(U));break}case"box":{const y=Ki(C.getAttribute("size")),U=new Bt(Gf,E);U.scale.set(y[0],y[1],y[2]),D.add(U);break}case"sphere":{const y=parseFloat(C.getAttribute("radius")??"0"),U=new Bt(Wf,E);U.scale.setScalar(y),D.add(U);break}case"cylinder":{const y=parseFloat(C.getAttribute("radius")??"0"),U=parseFloat(C.getAttribute("length")??"0"),z=new Bt(jf,E);z.scale.set(y,U,y),z.rotation.set(Math.PI/2,0,0),D.add(z);break}}}function I(C){const D=new Ni;D.name=C.getAttribute("name")??"";const E=C.querySelector(":scope > color");if(E){const U=(E.getAttribute("rgba")??"1 1 1 1").trim().split(/\s+/).map(Number);D.color.setRGB(U[0]??1,U[1]??1,U[2]??1),D.opacity=U[3]??1,D.transparent=D.opacity<1,D.depthWrite=!D.transparent}const y=C.querySelector(":scope > texture");if(y){const U=y.getAttribute("filename");if(U){const z=c(U);if(z){const F=new wc(l);D.map=F.load(z),D.map.colorSpace=Ot}}}return D}}static async defaultMeshLoader(e,t){var i;switch(((i=e.split(".").pop())==null?void 0:i.toLowerCase())??""){case"stl":return new Promise((r,o)=>{new Zb(t).load(e,a=>r(new Bt(a,new Ni)),void 0,o)});case"dae":return new Promise((r,o)=>{new mb(t).load(e,a=>r(a.scene),void 0,o)});case"glb":case"gltf":return new Promise((r,o)=>{new _b(t).load(e,a=>r(a.scene),void 0,o)});default:return console.warn(`URDFLoader: no loader for "${e}"`),null}}}function Qb(s,e){return function(n){if(!n.startsWith("package://"))return!e||n.startsWith("/")||n.startsWith("http")||n.startsWith("blob:")?n:e+n;const[i,r]=n.slice(10).split(/\/(.+)/);return typeof s=="string"?s.endsWith(i)?`${s}/${r}`:`${s}/${i}/${r}`:typeof s=="function"?`${s(i)}/${r}`:i in s?`${s[i]}/${r}`:(console.error(`URDFLoader: package "${i}" not in package map`),null)}}function eE(s){for(const e of s){const t=new Set,n=[e];for(;n.length>0;){const i=n.pop();if(t.has(i))throw new Error("URDFLoader: infinite mimic joint loop detected");t.add(i);for(const r of i.mimicJoints)n.push(r)}}}function fd(s,e){let t=s;for(;t;){const n=t;if(n.isURDFJoint&&(e||n.jointType!=="fixed"))return n;t=t.parent}return null}const Sl=new k,wl=new k,ks=new k,Vn=new k,Wo=new k,Zo=new k,Qo=new k,Pn=new Ln;class tE{constructor(e){this.enabled=!0,this.raycaster=new Lc,this.initialGrabPoint=new k,this.hovered=null,this.hoveredAny=null,this.manipulating=null,this.hitDistance=-1,this.scene=e}update(){if(this.manipulating)return;const t=this.raycaster.intersectObject(this.scene,!0)[0],n=t?fd(t.object,!1):null,i=t?fd(t.object,!0):null;t&&(this.hitDistance=t.distance,this.initialGrabPoint.copy(t.point)),n!==this.hovered&&(this.hovered&&this.onUnhover(this.hovered),this.hovered=n,n&&this.onHover(n)),i!==this.hoveredAny&&(this.hoveredAny&&this.onUnhoverAny(this.hoveredAny),this.hoveredAny=i,i&&this.onHoverAny(i))}moveRay(e){const{raycaster:t,hitDistance:n,manipulating:i}=this;if(i){t.ray.at(n,Sl),e.at(n,wl);let r=0;switch(i.jointType){case"revolute":case"continuous":r=this.getRevoluteDelta(i,Sl,wl);break;case"prismatic":r=this.getPrismaticDelta(i,Sl,wl);break}r&&this.updateJoint(i,i.angle+r)}t.ray.copy(e),this.update()}setGrabbed(e){if(e){if(this.manipulating!==null||this.hovered===null)return;this.manipulating=this.hovered,this.onDragStart(this.hovered)}else{if(this.manipulating===null)return;this.onDragEnd(this.manipulating),this.manipulating=null,this.update()}}getRevoluteDelta(e,t,n){return Vn.copy(e.axis).transformDirection(e.matrixWorld).normalize(),ks.set(0,0,0).applyMatrix4(e.matrixWorld),Pn.setFromNormalAndCoplanarPoint(Vn,ks),Pn.projectPoint(t,Zo).sub(ks),Pn.projectPoint(n,Qo).sub(ks),Vn.crossVectors(Zo,Qo),Math.sign(Vn.dot(Pn.normal))*Qo.angleTo(Zo)}getPrismaticDelta(e,t,n){return Vn.subVectors(n,t),Pn.normal.copy(e.axis).transformDirection(e.parent.matrixWorld).normalize(),Vn.dot(Pn.normal)}updateJoint(e,t){e.setJointValue(t)}onDragStart(e){}onDragEnd(e){}onHover(e){}onUnhover(e){}onHoverAny(e){}onUnhoverAny(e){}}class nE extends tE{constructor(e,t,n){super(e),this._raycaster=new Lc,this._mouse=new ye,this._pendingMove=null,this._moveRaf=0,this._downX=0,this._downY=0,this._dragCommitted=!1,this._readyToGrab=!1,this._readyToGrabAtDown=!1,this._dwellTimer=0,this._lastHoverX=0,this._lastHoverY=0,this.camera=t,this.domElement=n;const i=r=>{const o=n.getBoundingClientRect();this._mouse.x=(r.clientX-o.left)/o.width*2-1,this._mouse.y=-((r.clientY-o.top)/o.height)*2+1};this._onDown=r=>{r.button===0&&(this._downX=r.clientX,this._downY=r.clientY,this._dragCommitted=!1,this._readyToGrabAtDown=this._readyToGrab,clearTimeout(this._dwellTimer),this._dwellTimer=0,this._readyToGrab=!1,this._lastHoverX=r.clientX,this._lastHoverY=r.clientY,i(r),this._raycaster.setFromCamera(this._mouse,t),this.moveRay(this._raycaster.ray))},this._onMove=r=>{if(r.buttons===0){const o=Math.hypot(r.clientX-this._lastHoverX,r.clientY-this._lastHoverY);this._lastHoverX=r.clientX,this._lastHoverY=r.clientY,o>3?(clearTimeout(this._dwellTimer),this._dwellTimer=0,this._readyToGrab=!1):this._dwellTimer||(this._dwellTimer=window.setTimeout(()=>{this._dwellTimer=0,this._readyToGrab=!0},300))}!this._dragCommitted&&this.manipulating===null&&r.buttons&1&&this._readyToGrabAtDown&&Math.hypot(r.clientX-this._downX,r.clientY-this._downY)>4&&(this._dragCommitted=!0,this.setGrabbed(!0)),this._pendingMove=r,this._moveRaf||(this._moveRaf=requestAnimationFrame(()=>{this._moveRaf=0,this._pendingMove&&(i(this._pendingMove),this._pendingMove=null,this._raycaster.setFromCamera(this._mouse,t),this.moveRay(this._raycaster.ray))}))},this._onUp=r=>{r.button===0&&(cancelAnimationFrame(this._moveRaf),this._moveRaf=0,this._pendingMove=null,this._dragCommitted=!1,clearTimeout(this._dwellTimer),this._dwellTimer=0,this._readyToGrab=!1,this._lastHoverX=r.clientX,this._lastHoverY=r.clientY,i(r),this._raycaster.setFromCamera(this._mouse,t),this.moveRay(this._raycaster.ray),this.setGrabbed(!1))},n.addEventListener("pointerdown",this._onDown),n.addEventListener("pointermove",this._onMove),n.addEventListener("pointerup",this._onUp)}getRevoluteDelta(e,t,n){return Vn.copy(e.axis).transformDirection(e.matrixWorld).normalize(),ks.set(0,0,0).applyMatrix4(e.matrixWorld),Pn.setFromNormalAndCoplanarPoint(Vn,ks),Wo.copy(this.camera.position).sub(this.initialGrabPoint).normalize(),Math.abs(Wo.dot(Pn.normal))>.3?super.getRevoluteDelta(e,t,n):(Pn.projectPoint(t,Zo),Pn.projectPoint(n,Qo),Vn.set(0,0,-1).transformDirection(this.camera.matrixWorld).cross(Pn.normal),Wo.subVectors(n,t),Vn.dot(Wo))}dispose(){cancelAnimationFrame(this._moveRaf),clearTimeout(this._dwellTimer),this.domElement.removeEventListener("pointerdown",this._onDown),this.domElement.removeEventListener("pointermove",this._onMove),this.domElement.removeEventListener("pointerup",this._onUp)}}const pd={type:"change"},Tl={type:"start"},md={type:"end"},jo=new sr,gd=new Ln,iE=Math.cos(70*es.DEG2RAD);class sE extends hs{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new k,this.cursor=new k,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:hi.ROTATE,MIDDLE:hi.DOLLY,RIGHT:hi.PAN},this.touches={ONE:gs.ROTATE,TWO:gs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(M){M.addEventListener("keydown",Qe),this._domElementKeyEvents=M},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Qe),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(pd),n.update(),r=i.NONE},this.update=(function(){const M=new k,j=new pn().setFromUnitVectors(e.up,new k(0,1,0)),$=j.clone().invert(),fe=new k,Ee=new pn,it=new k,ct=2*Math.PI;return function(Ut=null){const ft=n.object.position;M.copy(ft).sub(n.target),M.applyQuaternion(j),a.setFromVector3(M),n.autoRotate&&r===i.NONE&&z(y(Ut)),n.enableDamping?(a.theta+=l.theta*n.dampingFactor,a.phi+=l.phi*n.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let pt=n.minAzimuthAngle,St=n.maxAzimuthAngle;isFinite(pt)&&isFinite(St)&&(pt<-Math.PI?pt+=ct:pt>Math.PI&&(pt-=ct),St<-Math.PI?St+=ct:St>Math.PI&&(St-=ct),pt<=St?a.theta=Math.max(pt,Math.min(St,a.theta)):a.theta=a.theta>(pt+St)/2?Math.max(pt,a.theta):Math.min(St,a.theta)),a.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,a.phi)),a.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let kn=!1;if(n.zoomToCursor&&P||n.object.isOrthographicCamera)a.radius=ae(a.radius);else{const an=a.radius;a.radius=ae(a.radius*c),kn=an!=a.radius}if(M.setFromSpherical(a),M.applyQuaternion($),ft.copy(n.target).add(M),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),h.set(0,0,0)),n.zoomToCursor&&P){let an=null;if(n.object.isPerspectiveCamera){const Bn=M.length();an=ae(Bn*c);const Mn=Bn-an;n.object.position.addScaledVector(S,Mn),n.object.updateMatrixWorld(),kn=!!Mn}else if(n.object.isOrthographicCamera){const Bn=new k(I.x,I.y,0);Bn.unproject(n.object);const Mn=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),kn=Mn!==n.object.zoom;const Hi=new k(I.x,I.y,0);Hi.unproject(n.object),n.object.position.sub(Hi).add(Bn),n.object.updateMatrixWorld(),an=M.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;an!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(an).add(n.object.position):(jo.origin.copy(n.object.position),jo.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(jo.direction))<iE?e.lookAt(n.target):(gd.setFromNormalAndCoplanarPoint(n.object.up,n.target),jo.intersectPlane(gd,n.target))))}else if(n.object.isOrthographicCamera){const an=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),an!==n.object.zoom&&(n.object.updateProjectionMatrix(),kn=!0)}return c=1,P=!1,kn||fe.distanceToSquared(n.object.position)>o||8*(1-Ee.dot(n.object.quaternion))>o||it.distanceToSquared(n.target)>o?(n.dispatchEvent(pd),fe.copy(n.object.position),Ee.copy(n.object.quaternion),it.copy(n.target),!0):!1}})(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",rt),n.domElement.removeEventListener("pointerdown",O),n.domElement.removeEventListener("pointercancel",q),n.domElement.removeEventListener("wheel",ue),n.domElement.removeEventListener("pointermove",A),n.domElement.removeEventListener("pointerup",q),n.domElement.getRootNode().removeEventListener("keydown",we,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Qe),n._domElementKeyEvents=null)};const n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=i.NONE;const o=1e-6,a=new ed,l=new ed;let c=1;const h=new k,u=new ye,d=new ye,f=new ye,g=new ye,_=new ye,p=new ye,m=new ye,w=new ye,v=new ye,S=new k,I=new ye;let P=!1;const C=[],D={};let E=!1;function y(M){return M!==null?2*Math.PI/60*n.autoRotateSpeed*M:2*Math.PI/60/60*n.autoRotateSpeed}function U(M){const j=Math.abs(M*.01);return Math.pow(.95,n.zoomSpeed*j)}function z(M){l.theta-=M}function F(M){l.phi-=M}const H=(function(){const M=new k;return function($,fe){M.setFromMatrixColumn(fe,0),M.multiplyScalar(-$),h.add(M)}})(),Z=(function(){const M=new k;return function($,fe){n.screenSpacePanning===!0?M.setFromMatrixColumn(fe,1):(M.setFromMatrixColumn(fe,0),M.crossVectors(n.object.up,M)),M.multiplyScalar($),h.add(M)}})(),B=(function(){const M=new k;return function($,fe){const Ee=n.domElement;if(n.object.isPerspectiveCamera){const it=n.object.position;M.copy(it).sub(n.target);let ct=M.length();ct*=Math.tan(n.object.fov/2*Math.PI/180),H(2*$*ct/Ee.clientHeight,n.object.matrix),Z(2*fe*ct/Ee.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(H($*(n.object.right-n.object.left)/n.object.zoom/Ee.clientWidth,n.object.matrix),Z(fe*(n.object.top-n.object.bottom)/n.object.zoom/Ee.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}})();function he(M){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c/=M:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function G(M){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c*=M:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function se(M,j){if(!n.zoomToCursor)return;P=!0;const $=n.domElement.getBoundingClientRect(),fe=M-$.left,Ee=j-$.top,it=$.width,ct=$.height;I.x=fe/it*2-1,I.y=-(Ee/ct)*2+1,S.set(I.x,I.y,1).unproject(n.object).sub(n.object.position).normalize()}function ae(M){return Math.max(n.minDistance,Math.min(n.maxDistance,M))}function me(M){u.set(M.clientX,M.clientY)}function Le(M){se(M.clientX,M.clientX),m.set(M.clientX,M.clientY)}function Ae(M){g.set(M.clientX,M.clientY)}function W(M){d.set(M.clientX,M.clientY),f.subVectors(d,u).multiplyScalar(n.rotateSpeed);const j=n.domElement;z(2*Math.PI*f.x/j.clientHeight),F(2*Math.PI*f.y/j.clientHeight),u.copy(d),n.update()}function ee(M){w.set(M.clientX,M.clientY),v.subVectors(w,m),v.y>0?he(U(v.y)):v.y<0&&G(U(v.y)),m.copy(w),n.update()}function ne(M){_.set(M.clientX,M.clientY),p.subVectors(_,g).multiplyScalar(n.panSpeed),B(p.x,p.y),g.copy(_),n.update()}function te(M){se(M.clientX,M.clientY),M.deltaY<0?G(U(M.deltaY)):M.deltaY>0&&he(U(M.deltaY)),n.update()}function Ne(M){let j=!1;switch(M.code){case n.keys.UP:M.ctrlKey||M.metaKey||M.shiftKey?F(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):B(0,n.keyPanSpeed),j=!0;break;case n.keys.BOTTOM:M.ctrlKey||M.metaKey||M.shiftKey?F(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):B(0,-n.keyPanSpeed),j=!0;break;case n.keys.LEFT:M.ctrlKey||M.metaKey||M.shiftKey?z(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):B(n.keyPanSpeed,0),j=!0;break;case n.keys.RIGHT:M.ctrlKey||M.metaKey||M.shiftKey?z(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):B(-n.keyPanSpeed,0),j=!0;break}j&&(M.preventDefault(),n.update())}function qe(M){if(C.length===1)u.set(M.pageX,M.pageY);else{const j=vt(M),$=.5*(M.pageX+j.x),fe=.5*(M.pageY+j.y);u.set($,fe)}}function V(M){if(C.length===1)g.set(M.pageX,M.pageY);else{const j=vt(M),$=.5*(M.pageX+j.x),fe=.5*(M.pageY+j.y);g.set($,fe)}}function at(M){const j=vt(M),$=M.pageX-j.x,fe=M.pageY-j.y,Ee=Math.sqrt($*$+fe*fe);m.set(0,Ee)}function re(M){n.enableZoom&&at(M),n.enablePan&&V(M)}function _e(M){n.enableZoom&&at(M),n.enableRotate&&qe(M)}function ce(M){if(C.length==1)d.set(M.pageX,M.pageY);else{const $=vt(M),fe=.5*(M.pageX+$.x),Ee=.5*(M.pageY+$.y);d.set(fe,Ee)}f.subVectors(d,u).multiplyScalar(n.rotateSpeed);const j=n.domElement;z(2*Math.PI*f.x/j.clientHeight),F(2*Math.PI*f.y/j.clientHeight),u.copy(d)}function be(M){if(C.length===1)_.set(M.pageX,M.pageY);else{const j=vt(M),$=.5*(M.pageX+j.x),fe=.5*(M.pageY+j.y);_.set($,fe)}p.subVectors(_,g).multiplyScalar(n.panSpeed),B(p.x,p.y),g.copy(_)}function pe(M){const j=vt(M),$=M.pageX-j.x,fe=M.pageY-j.y,Ee=Math.sqrt($*$+fe*fe);w.set(0,Ee),v.set(0,Math.pow(w.y/m.y,n.zoomSpeed)),he(v.y),m.copy(w);const it=(M.pageX+j.x)*.5,ct=(M.pageY+j.y)*.5;se(it,ct)}function Pe(M){n.enableZoom&&pe(M),n.enablePan&&be(M)}function We(M){n.enableZoom&&pe(M),n.enableRotate&&ce(M)}function O(M){n.enabled!==!1&&(C.length===0&&(n.domElement.setPointerCapture(M.pointerId),n.domElement.addEventListener("pointermove",A),n.domElement.addEventListener("pointerup",q)),!nt(M)&&(Ye(M),M.pointerType==="touch"?xe(M):le(M)))}function A(M){n.enabled!==!1&&(M.pointerType==="touch"?Be(M):de(M))}function q(M){switch(De(M),C.length){case 0:n.domElement.releasePointerCapture(M.pointerId),n.domElement.removeEventListener("pointermove",A),n.domElement.removeEventListener("pointerup",q),n.dispatchEvent(md),r=i.NONE;break;case 1:const j=C[0],$=D[j];xe({pointerId:j,pageX:$.x,pageY:$.y});break}}function le(M){let j;switch(M.button){case 0:j=n.mouseButtons.LEFT;break;case 1:j=n.mouseButtons.MIDDLE;break;case 2:j=n.mouseButtons.RIGHT;break;default:j=-1}switch(j){case hi.DOLLY:if(n.enableZoom===!1)return;Le(M),r=i.DOLLY;break;case hi.ROTATE:if(M.ctrlKey||M.metaKey||M.shiftKey){if(n.enablePan===!1)return;Ae(M),r=i.PAN}else{if(n.enableRotate===!1)return;me(M),r=i.ROTATE}break;case hi.PAN:if(M.ctrlKey||M.metaKey||M.shiftKey){if(n.enableRotate===!1)return;me(M),r=i.ROTATE}else{if(n.enablePan===!1)return;Ae(M),r=i.PAN}break;default:r=i.NONE}r!==i.NONE&&n.dispatchEvent(Tl)}function de(M){switch(r){case i.ROTATE:if(n.enableRotate===!1)return;W(M);break;case i.DOLLY:if(n.enableZoom===!1)return;ee(M);break;case i.PAN:if(n.enablePan===!1)return;ne(M);break}}function ue(M){n.enabled===!1||n.enableZoom===!1||r!==i.NONE||(M.preventDefault(),n.dispatchEvent(Tl),te(He(M)),n.dispatchEvent(md))}function He(M){const j=M.deltaMode,$={clientX:M.clientX,clientY:M.clientY,deltaY:M.deltaY};switch(j){case 1:$.deltaY*=16;break;case 2:$.deltaY*=100;break}return M.ctrlKey&&!E&&($.deltaY*=10),$}function we(M){M.key==="Control"&&(E=!0,n.domElement.getRootNode().addEventListener("keyup",Me,{passive:!0,capture:!0}))}function Me(M){M.key==="Control"&&(E=!1,n.domElement.getRootNode().removeEventListener("keyup",Me,{passive:!0,capture:!0}))}function Qe(M){n.enabled===!1||n.enablePan===!1||Ne(M)}function xe(M){switch(lt(M),C.length){case 1:switch(n.touches.ONE){case gs.ROTATE:if(n.enableRotate===!1)return;qe(M),r=i.TOUCH_ROTATE;break;case gs.PAN:if(n.enablePan===!1)return;V(M),r=i.TOUCH_PAN;break;default:r=i.NONE}break;case 2:switch(n.touches.TWO){case gs.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;re(M),r=i.TOUCH_DOLLY_PAN;break;case gs.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;_e(M),r=i.TOUCH_DOLLY_ROTATE;break;default:r=i.NONE}break;default:r=i.NONE}r!==i.NONE&&n.dispatchEvent(Tl)}function Be(M){switch(lt(M),r){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;ce(M),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;be(M),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Pe(M),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;We(M),n.update();break;default:r=i.NONE}}function rt(M){n.enabled!==!1&&M.preventDefault()}function Ye(M){C.push(M.pointerId)}function De(M){delete D[M.pointerId];for(let j=0;j<C.length;j++)if(C[j]==M.pointerId){C.splice(j,1);return}}function nt(M){for(let j=0;j<C.length;j++)if(C[j]==M.pointerId)return!0;return!1}function lt(M){let j=D[M.pointerId];j===void 0&&(j=new ye,D[M.pointerId]=j),j.set(M.pageX,M.pageY)}function vt(M){const j=M.pointerId===C[0]?C[1]:C[0];return D[j]}n.domElement.addEventListener("contextmenu",rt),n.domElement.addEventListener("pointerdown",O),n.domElement.addEventListener("pointercancel",q),n.domElement.addEventListener("wheel",ue,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",we,{passive:!0,capture:!0}),this.update()}}const rE=`
:host {
    display: block;
    background: linear-gradient(160deg, #0f1117 0%, #1a1f2e 100%);
}
canvas { width: 100%; height: 100%; display: block; }
`,_d=()=>{},oE=new k,aE=new k(-1,.7,1).normalize();function yd(s){var e;for(const t of Object.values(s))t instanceof Vt&&(((e=t.source)==null?void 0:e.data)instanceof ImageBitmap&&t.source.data.close(),t.dispose());s.dispose()}function Al(s){s.traverse(e=>{var n,i;const t=e;(n=t.geometry)!=null&&n.userData.shared||(i=t.geometry)==null||i.dispose(),Array.isArray(t.material)?t.material.forEach(yd):t.material&&yd(t.material)})}var Gd;const gn=(Gd=window.matchMedia)==null?void 0:Gd.call(window,"(prefers-reduced-motion: reduce)"),lE=new k(1,0,1).normalize(),cE=new k(-1,0,-1).normalize();class hE extends HTMLElement{constructor(){super(),this.robot=null,this.loadMesh=null,this._rafId=0,this._dirty=!1,this._loadId=0,this._introAnim=null,this._outgoing=null,this._robotReady=!1,this._exitRotation=new on,this._lastLoadKey="",this._bbox=new Yn,this._center=new k,this._sphere=new Fn,this._lightOffset=new k,this._shadow=this.attachShadow({mode:"open"});const e=document.createElement("style");e.textContent=rE,this._shadow.appendChild(e),this.scene=new Mf,this.ambientLight=new Kx("#8ea0a8","#000",.5),this.ambientLight.groundColor.lerp(this.ambientLight.color,.5*Math.PI),this.ambientLight.position.set(0,1,0),this.scene.add(this.ambientLight),this.directionalLight=new Ac(16777215,Math.PI),this.directionalLight.position.set(4,10,1);const t=navigator.maxTouchPoints>0?1024:2048;this.directionalLight.shadow.mapSize.set(t,t),this.directionalLight.shadow.normalBias=.001,this.directionalLight.castShadow=!0,this.scene.add(this.directionalLight,this.directionalLight.target),this.world=new At,this.scene.add(this.world),this.shadowPlane=new Bt(new Yr(400,400),new Ox({transparent:!0,opacity:.25,side:vn})),this.shadowPlane.rotation.x=-Math.PI/2,this.shadowPlane.receiveShadow=!0,this.shadowPlane.raycast=()=>{},this.scene.add(this.shadowPlane),this.renderer=new Kv({antialias:!0,alpha:!0}),this.renderer.setClearAlpha(0),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Xd,this.renderer.outputColorSpace=Ot,this.camera=new $t(75,1,.1,1e3),this.camera.position.set(-5.5,3.5,5.5),this.controls=new sE(this.camera,this.renderer.domElement),this.controls.rotateSpeed=2,this.controls.zoomSpeed=5,this.controls.panSpeed=2,this.controls.maxDistance=50,this.controls.minDistance=.25,this.controls.addEventListener("change",()=>this.redraw()),this.controls.enableDamping=!(gn!=null&&gn.matches),gn==null||gn.addEventListener("change",n=>{this.controls.enableDamping=!n.matches}),this._collisionMaterial=new Ni({transparent:!0,opacity:.35,color:16760376,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),this._resizeObserver=new ResizeObserver(()=>this._onResize()),this._applyUp(this.up),this._startRenderLoop()}static get observedAttributes(){return["urdf","package","up","ignore-limits","show-collision","display-shadow","ambient-color"]}get urdf(){return this.getAttribute("urdf")??""}set urdf(e){this.setAttribute("urdf",e)}get package(){return this.getAttribute("package")??""}set package(e){this.setAttribute("package",e)}get up(){return this.getAttribute("up")??"+Z"}set up(e){this.setAttribute("up",e)}get ignoreLimits(){return this.hasAttribute("ignore-limits")}set ignoreLimits(e){e?this.setAttribute("ignore-limits",""):this.removeAttribute("ignore-limits")}get showCollision(){return this.hasAttribute("show-collision")}set showCollision(e){e?this.setAttribute("show-collision",""):this.removeAttribute("show-collision")}get displayShadow(){return this.hasAttribute("display-shadow")}set displayShadow(e){e?this.setAttribute("display-shadow",""):this.removeAttribute("display-shadow")}get ambientColor(){return this.getAttribute("ambient-color")??"#8ea0a8"}set ambientColor(e){this.setAttribute("ambient-color",e)}connectedCallback(){this._shadow.appendChild(this.renderer.domElement),this._resizeObserver.observe(this),this._onResize()}disconnectedCallback(){cancelAnimationFrame(this._rafId),this._resizeObserver.disconnect()}attributeChangedCallback(e,t,n){switch(e){case"urdf":case"package":this._scheduleLoad();break;case"up":this._applyUp(this.up),this.redraw();break;case"ambient-color":this.ambientLight.color.set(this.ambientColor),this.ambientLight.groundColor.set("#000").lerp(this.ambientLight.color,.5),this.redraw();break;case"ignore-limits":this._applyIgnoreLimits(this.ignoreLimits);break;case"show-collision":this._updateCollision(),this.redraw();break;case"display-shadow":this.redraw();break}}fitCamera(){if(!this.robot||(this.world.updateMatrixWorld(),this._bbox.makeEmpty(),this.robot.traverse(n=>{n.isURDFVisual&&this._bbox.expandByObject(n)}),this._bbox.isEmpty()))return;this._bbox.getBoundingSphere(this._sphere);const e=this.camera.fov*Math.PI/180,t=this._sphere.radius/Math.sin(e/2)*1.2;this.camera.position.copy(this._sphere.center).addScaledVector(aE,t),this.controls.target.copy(this._sphere.center),this.controls.maxDistance=t*5,this.controls.minDistance=this._sphere.radius*.1,this.controls.update(),this.redraw()}redraw(){this._dirty=!0}setJointValue(e,...t){this.robot&&this.robot.setJointValue(e,...t)&&(this.redraw(),this.dispatchEvent(new CustomEvent("angle-change",{bubbles:!0,detail:e})))}_startRenderLoop(){const e=()=>{this._rafId=requestAnimationFrame(e);const t=this._introAnim;if(t){const i=Math.min((performance.now()-t.t0)/t.dur,1),r=1-Math.pow(1-i,4);this.world.position.lerpVectors(t.start,oE,r),this._dirty=!0,i>=1&&(this._introAnim=null,this.world.position.setScalar(0))}const n=this._outgoing;if(n){const i=Math.min((performance.now()-n.t0)/n.dur,1),r=i*i*i;n.obj.position.lerpVectors(n.from,n.to,r),this._dirty=!0,i>=1&&(this.scene.remove(n.obj),Al(n.obj),this._outgoing=null)}!this.world.visible&&this._robotReady&&!this._outgoing&&(this.fitCamera(),this._exitRotation.copy(this.world.rotation),this._startIntro(),this._dirty=!0),this.controls.update(),this._dirty&&(this._updateScene(),this.renderer.render(this.scene,this.camera),this._dirty=!1)};e()}_onResize(){const e=this.clientWidth||300,t=this.clientHeight||150;this.renderer.setPixelRatio(devicePixelRatio),this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.redraw()}_scheduleLoad(){const e=`${this.package}|${this.urdf}`;if(this._lastLoadKey===e||(this._lastLoadKey=e,this._introAnim=null,this._startExit(),this._disposeRobot(),this.world.position.setScalar(0),this.world.visible=!1,this.dispatchEvent(new CustomEvent("urdf-change",{bubbles:!0})),!this.urdf))return;const t=++this._loadId;this._robotReady=!1;const n=new Pc;n.packages=this._resolvePackages(this.package),n.parseCollision=!0;const i=(this.loadMesh??n.loadMesh).bind(n);let r=!1;n.loadMesh=(o,a)=>(r||(r=!0,a.onLoad=()=>{t===this._loadId&&(this._robotReady=!0,this.redraw())}),i(o,a).then(l=>(this.redraw(),l))),n.load(this.urdf).then(o=>{if(t!==this._loadId){o.traverse(a=>{var l;return(l=a.geometry)==null?void 0:l.dispose()});return}this.robot=o,this.world.add(o),this._prepareMeshes(o),this._applyIgnoreLimits(this.ignoreLimits),this._updateCollision(),r||(this._robotReady=!0),this.redraw(),this.dispatchEvent(new CustomEvent("urdf-processed",{bubbles:!0}))}).catch(o=>{console.error("URDFViewer: load error",o),t===this._loadId&&(this.world.visible=!0,this.dispatchEvent(new CustomEvent("urdf-error",{bubbles:!0,detail:String(o.message??o)})))})}_startIntro(){if(this.world.visible=!0,gn!=null&&gn.matches){this.world.position.setScalar(0);return}const e=lE.clone().multiplyScalar(this._sphere.radius*5);this.world.position.copy(e),this._introAnim={start:e,t0:performance.now(),dur:450}}_startExit(){if(!this.robot||this._sphere.radius===0)return;if(this._outgoing&&(this.scene.remove(this._outgoing.obj),Al(this._outgoing.obj),this._outgoing=null),gn!=null&&gn.matches){this._disposeRobot();return}const e=cE.clone().multiplyScalar(this._sphere.radius*5),t=new At;t.rotation.copy(this._exitRotation),t.position.copy(this.world.position),this.world.remove(this.robot),t.add(this.robot),this.robot=null,this.scene.add(t),this._outgoing={obj:t,from:t.position.clone(),to:e,t0:performance.now(),dur:350}}_disposeRobot(){var e;this.robot&&(Al(this.robot),(e=this.robot.parent)==null||e.remove(this.robot),this.robot=null)}_prepareMeshes(e){e.traverse(t=>{const n=t;if(n.isMesh&&(n.castShadow=!0,n.receiveShadow=!0,n.geometry&&!n.geometry.userData.shared&&(n.geometry=gb(n.geometry),n.geometry.computeVertexNormals()),n.material)){const i=Array.isArray(n.material)?n.material:[n.material];for(const r of i){if(r instanceof Xn){const o=new Ni;o.copy(r),n.material=o,r.dispose()}r.map&&(r.map.colorSpace=Ot)}}})}_updateScene(){const e=this.robot;if(e&&(this.world.updateMatrixWorld(),this._bbox.makeEmpty(),e.traverse(t=>{t.isURDFVisual&&this._bbox.expandByObject(t)}),!this._bbox.isEmpty())){this._bbox.getCenter(this._center),this.controls.target.y=this._center.y,this.shadowPlane.position.y=this._bbox.min.y-.001;const t=this.directionalLight;if(t.castShadow=this.displayShadow,this.displayShadow){this._bbox.getBoundingSphere(this._sphere);const n=this._sphere.radius,i=t.shadow.camera;i.left=i.bottom=-n,i.right=i.top=n,this._lightOffset.copy(t.position).sub(t.target.position),t.target.position.copy(this._center),t.position.copy(this._center).add(this._lightOffset),i.updateProjectionMatrix()}}}_applyUp(e){const t=e.startsWith("-")?-1:1,n=e.slice(-1).toUpperCase()||"Z",i=Math.PI/2;switch(n){case"X":this.world.rotation.set(0,0,t*i);break;case"Z":this.world.rotation.set(-t*i,0,0);break;default:this.world.rotation.set(t>0?0:Math.PI,0,0);break}}_applyIgnoreLimits(e){if(this.robot){for(const t of Object.values(this.robot.joints))t.ignoreLimits=e,t.setJointValue(...t.jointValue);this.dispatchEvent(new CustomEvent("ignore-limits-change",{bubbles:!0})),this.redraw()}}_updateCollision(){const e=this.robot;if(!e)return;const t=this.showCollision,n=this._collisionMaterial;e.traverse(i=>{const r=i;r.isURDFCollider&&(r.visible=t,r.traverse(o=>{const a=o;a.isMesh&&(a.raycast!==_d&&(a.raycast=_d),a.material=n,a.castShadow=!1)}))})}_resolvePackages(e){if(!e.includes(":")||/^\s*https?:/.test(e))return e;const t={};for(const n of e.split(",")){const[i,...r]=n.split(":");i&&r.length&&(t[i.trim()]=r.join(":").trim())}return t}}class uE extends hE{static get observedAttributes(){return["highlight-color","disable-dragging",...super.observedAttributes]}get highlightColor(){return this.getAttribute("highlight-color")??"#ffffff"}set highlightColor(e){this.setAttribute("highlight-color",e)}get disableDragging(){return this.hasAttribute("disable-dragging")}set disableDragging(e){e?this.setAttribute("disable-dragging",""):this.removeAttribute("disable-dragging")}constructor(){super(),this._highlightMaterial=new Ni({shininess:10,color:this.highlightColor,emissive:this.highlightColor,emissiveIntensity:.25}),this._dragControls=new nE(this.scene,this.camera,this.renderer.domElement),this.controls.mouseButtons={LEFT:hi.ROTATE,MIDDLE:hi.DOLLY,RIGHT:hi.ROTATE},this._dragControls.updateJoint=(e,t)=>{this.setJointValue(e.name,t)},this._dragControls.onHover=e=>{this._highlightJoint(e,!1),this.redraw()},this._dragControls.onUnhover=e=>{this._highlightJoint(e,!0),this.redraw()},this._dragControls.onHoverAny=e=>{this.dispatchEvent(new CustomEvent("joint-mouseover",{bubbles:!0,detail:e.name}))},this._dragControls.onUnhoverAny=e=>{this.dispatchEvent(new CustomEvent("joint-mouseout",{bubbles:!0,detail:e.name}))},this._dragControls.onDragStart=e=>{this.controls.enabled=!1,this.dispatchEvent(new CustomEvent("manipulate-start",{bubbles:!0,detail:e.name})),this.redraw()},this._dragControls.onDragEnd=e=>{this.controls.enabled=!0,this.dispatchEvent(new CustomEvent("manipulate-end",{bubbles:!0,detail:e.name})),this.redraw()}}disconnectedCallback(){super.disconnectedCallback(),this._dragControls.dispose()}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e==="highlight-color"&&(this._highlightMaterial.color.set(this.highlightColor),this._highlightMaterial.emissive.set(this.highlightColor))}_highlightJoint(e,t){function n(o){return o.isURDFJoint&&o.jointType!=="fixed"}const i=this._highlightMaterial;function r(o){const a=o;if(a.isMesh&&(t?a.__orig!==void 0&&(a.material=a.__orig,delete a.__orig):(a.__orig=a.material,a.material=i)),!(o!==e&&n(o)))for(const l of o.children)l.isURDFCollider||r(l)}r(e)}}const dE="http://127.0.0.1:7337/claude",fE="claude-sonnet-4-6",pE=600,vd=3e4,mE={name:"update_urdf",description:"Replace the URDF code in the editor with new XML and immediately re-render the 3D model. Always send the COMPLETE URDF, not a diff.",input_schema:{type:"object",properties:{xml:{type:"string",description:"Complete URDF XML"}},required:["xml"]}},gE={name:"update_part",description:'Write or create a URDF part file (e.g. "05-motor-driver.xml"). Send the complete content of that part — link + joint elements only, no <robot> wrapper. Use a new filename like "07-lidar.xml" to add a new component.',input_schema:{type:"object",properties:{filename:{type:"string",description:'Part filename, e.g. "05-motor-driver.xml"'},xml:{type:"string",description:"Complete content of this part file"}},required:["filename","xml"]}},xd={name:"highlight_lines",description:"Highlight 1-based line numbers in the editor. Call after every explanation.",input_schema:{type:"object",properties:{lines:{type:"array",items:{type:"number"},description:"1-based line numbers"}},required:["lines"]}},bd={name:"scroll_to_line",description:"Scroll the editor to bring a specific line into view.",input_schema:{type:"object",properties:{line:{type:"number",description:"1-based line number"}},required:["line"]}},_E={name:"read_part",description:"Read the full XML of any part file. Call this before placing a new component to check occupied xyz positions and avoid spatial overlaps.",input_schema:{type:"object",properties:{filename:{type:"string",description:'Part filename, e.g. "01-chassis.xml"'}},required:["filename"]}},Cl=new Set(["update_urdf","update_part"]),Ed=`URDF reference:
• <link name="..."> rigid body — <visual>, <collision>, <inertial>
• <joint name="..." type="fixed|revolute|continuous|prismatic|floating|planar">
• <origin xyz="x y z" rpy="r p y"/> — position + Euler angles (radians)
• <geometry>: <box size="x y z">, <cylinder radius length>, <sphere radius>, <mesh filename="..."/>
• revolute joints need <limit lower upper effort velocity/>

Coordinate conventions:
• -X = front/bumper, +X = rear, -Y = left, +Y = right, +Z = up
• rpy = roll(X), pitch(Y), yaw(Z) in radians`;function Md(s){return typeof marked<"u"&&typeof DOMPurify<"u"?DOMPurify.sanitize(marked.parse(s),{ADD_ATTR:["style"]}):s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}const da=class da{constructor(e,t){this._sourceUrl=null,this._ownBlobUrl=null,this._renderTimer=0,this._history=[],this._abort=null,this._highlights=new Set,this._partsList=[],this._partCache=new Map,this._originalCache=new Map,this._robotName="",this._urdfFetched=!1,this._componentSpecs=null,this._brief=!0,this._viewer=e,this._panelEl=t,this._textareaEl=t.querySelector("#editor-textarea"),this._lineNumsEl=t.querySelector("#editor-line-nums"),this._chatMsgsEl=document.getElementById("chat-messages"),this._sendBtn=document.getElementById("chat-send"),this._abortBtn=document.getElementById("chat-abort"),this._briefBtn=document.getElementById("chat-brief-toggle"),this._partSelEl=t.querySelector("#part-select"),this._tabsEl=document.getElementById("editor-tabs"),this._resetBtn=t.querySelector("#part-reset"),this._resetBtn.addEventListener("click",()=>this._resetParts()),this._partSelEl.addEventListener("change",()=>void this._onPartChange()),this._actions={clear:{fn:()=>this._clearChat(),desc:"Clear chat history"},format:{fn:()=>this._formatXml(),desc:"Prettify URDF XML"}},this._textareaEl.addEventListener("input",()=>this._onEdit()),this._textareaEl.addEventListener("scroll",()=>{this._lineNumsEl.scrollTop=this._textareaEl.scrollTop})}get isOpen(){return this._panelEl.classList.contains("open")}get partsList(){return this._partsList}async readPart(e){if(!/^[\w-]+\.xml$/.test(e)||!this._sourceUrl)return null;const t=this._partCache.get(this._partUrl(e));if(t!==void 0)return t;try{return await fetch(this._partUrl(e)).then(n=>n.text())}catch{return null}}async writePart(e,t){return!/^[\w-]+\.xml$/.test(e)||!this._sourceUrl?!1:(this._partCache.set(this._partUrl(e),t),this._saveOverrides(),this._partsList.includes(e)||(this._partsList=[...this._partsList,e].sort(),this._rebuildPartOptions(),this._renderTabs()),this._setEditorContent(t),this._partSelEl.value=e,this._updateActiveTab(),this._applyPartsRender(),!0)}loadPartsInBackground(){!this._sourceUrl||this._partsList.length>0||this.isOpen||this._loadPartsManifest()}handleExternalInput(e){if(e.startsWith("/")){const[t,...n]=e.slice(1).trim().split(/\s+/),i=this._actions[t.toLowerCase()];if(i!=null&&i.fn){i.fn(n);return}}this._abort||this._runConversation(e)}set brief(e){this._brief=e,this._briefBtn.classList.toggle("active",!e),this._briefBtn.setAttribute("aria-pressed",String(!e))}async jumpToJoint(e){if(!this._partsList.length||!this._sourceUrl)return;const t=`name="${e}"`;for(const n of this._partsList){const i=this._sourceUrl.replace(/[^/]+\.urdf(\?.*)?$/,`parts/${n}`);if(!(await fetch(i).then(a=>a.text())).includes(t))continue;this._partSelEl.value=n,await this._onPartChange();const o=this._textareaEl.value.indexOf(t);if(o!==-1){this._textareaEl.focus(),this._textareaEl.setSelectionRange(o,o);const a=this._textareaEl.value.slice(0,o).split(`
`).length;this._scrollEditorToLine(a)}return}}open(){this._panelEl.classList.add("open"),document.body.classList.add("editor-open"),this._sourceUrl&&(this._textareaEl.value||this._fetchAndPopulate(this._sourceUrl),this._partsList.length||this._loadPartsManifest())}close(){var e;this._panelEl.classList.remove("open"),document.body.classList.remove("editor-open"),(e=this._abort)==null||e.abort()}setSourceUrl(e){var t;(t=this._abort)==null||t.abort(),this._sourceUrl=e,this._history=[],this._partsList=[],this._partCache.clear(),this._originalCache.clear(),this._robotName="",this._urdfFetched=!1,this._componentSpecs=null,this._textareaEl.value="",this._rebuildPartOptions(),this._partSelEl.hidden=!0,this._loadPersistedHistory(),setTimeout(()=>this._maybeResume(),0),this.isOpen&&(this._fetchAndPopulate(e),this._loadPartsManifest())}async _fetchAndPopulate(e){try{const t=await fetch(e).then(n=>n.text());this._textareaEl.value=t,this._urdfFetched=!0,this._updateLineNums()}catch{}}_onEdit(){this._updateLineNums(),clearTimeout(this._renderTimer);const e=this._partSelEl.value;e&&(this._partCache.set(this._partUrl(e),this._textareaEl.value),this._saveOverrides()),this._renderTimer=window.setTimeout(()=>e?this._applyPartsRender():this._applyRender(),pE)}_applyRender(){const e=this._textareaEl.value;this._ownBlobUrl&&URL.revokeObjectURL(this._ownBlobUrl),this._ownBlobUrl=URL.createObjectURL(new Blob([e],{type:"application/xml"})),this._viewer.urdf=this._ownBlobUrl}_updateLineNums(){const e=this._textareaEl.value.split(`
`);this._lineNumsEl.innerHTML=e.map((t,n)=>`<div class="lnum${this._highlights.has(n+1)?" hl":""}">${n+1}</div>`).join("")}_scrollEditorToLine(e){const t=parseFloat(getComputedStyle(this._textareaEl).lineHeight)||19,n=(e-1)*t-this._textareaEl.clientHeight/2;this._textareaEl.scrollTop=Math.max(0,n),this._lineNumsEl.scrollTop=this._textareaEl.scrollTop}_highlightLines(e){this._highlights=new Set(e),this._updateLineNums(),e.length&&this._scrollEditorToLine(e[0])}_clearChat(){this._history=[],this._chatMsgsEl.innerHTML="";const e=this._historyKey();if(e)try{localStorage.removeItem(e)}catch{}}_formatXml(){const e=this._textareaEl.value.trim();if(e)try{const t=new DOMParser().parseFromString(e,"application/xml");if(t.querySelector("parsererror"))return;const n=yE(new XMLSerializer().serializeToString(t));this._textareaEl.value=n,this._updateLineNums()}catch{}}_rebuildPartOptions(){this._partSelEl.innerHTML='<option value="">Full URDF</option>'+this._partsList.map(e=>`<option value="${e}">${e}</option>`).join("")}_partUrl(e){return this._sourceUrl.replace(/[^/]+\.urdf(\?.*)?$/,`parts/${e}`)}_overridesKey(){return this._sourceUrl&&this._partsList.length>0?`urdf-parts:${this._sourceUrl}`:null}get _isDirty(){return this._partsList.some(e=>{const t=this._partUrl(e);return this._partCache.get(t)!==this._originalCache.get(t)})}_updateResetBtn(){const e=this._partsList.length>0;this._resetBtn.hidden=!e,this._resetBtn.disabled=!this._isDirty}_saveOverrides(){const e=this._overridesKey();if(!e)return;const t={};for(const n of this._partsList){const i=this._partUrl(n),r=this._partCache.get(i),o=this._originalCache.get(i);r!==void 0&&r!==o&&(t[n]=r)}try{Object.keys(t).length===0?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(t))}catch{}this._updateResetBtn()}_resetParts(){if(!this._isDirty||!confirm("Reset all parts to their original version?"))return;const e=this._overridesKey();if(e)try{localStorage.removeItem(e)}catch{}for(const n of this._partsList){const i=this._partUrl(n),r=this._originalCache.get(i);r!==void 0&&this._partCache.set(i,r)}const t=this._partSelEl.value;this._setEditorContent(t?this._partCache.get(this._partUrl(t))??"":this._assembleFromCache()),this._applyPartsRender(),this._updateResetBtn()}_assembleFromCache(){const e=this._partsList.map(i=>[i,this._partCache.get(this._partUrl(i))??""]).sort(([i],[r])=>i.localeCompare(r)),t=e.filter(([i])=>i.startsWith("00")).map(([,i])=>i.trimEnd()).join(`
`),n=e.filter(([i])=>!i.startsWith("00")).map(([,i])=>i.trimEnd()).join(`

`);return`<?xml version="1.0"?>
${t}
<robot name="${this._robotName}">

${n}

</robot>
`}_applyPartsRender(){const e=this._sourceUrl.replace(/\/[^/]+\.urdf(\?.*)?$/,""),t=this._assembleFromCache().replace(/filename="([^/"]+)"/g,`filename="${e}/$1"`);this._ownBlobUrl&&URL.revokeObjectURL(this._ownBlobUrl),this._ownBlobUrl=URL.createObjectURL(new Blob([t],{type:"application/xml"})),this._viewer.urdf=this._ownBlobUrl}async _loadPartsManifest(){if(!this._sourceUrl)return;const e=this._sourceUrl.replace(/\.urdf(\?.*)?$/,".parts.json");try{const t=await fetch(e).then(r=>r.json());this._robotName=t.robot,this._partsList=t.parts,await Promise.all(t.parts.map(async r=>{const o=this._partUrl(r),a=await fetch(o).then(l=>l.text());this._originalCache.set(o,a),this._partCache.set(o,a)}));let n=!1;const i=this._overridesKey();if(i)try{const r=localStorage.getItem(i);if(r){const o=JSON.parse(r);for(const[a,l]of Object.entries(o))this._partsList.includes(a)||(this._partsList=[...this._partsList,a].sort()),this._partCache.set(this._partUrl(a),l),n=!0}}catch{}this._urdfFetched=!0,this._partSelEl.value||(this._textareaEl.value=this._assembleFromCache(),this._updateLineNums()),n&&this._applyPartsRender(),this._rebuildPartOptions(),this._partSelEl.hidden=!1,this._renderTabs(),this._updateResetBtn()}catch{}if(this._sourceUrl){const t=this._sourceUrl.replace(/\.urdf(\?.*)?$/,".components.json");try{const n=await fetch(t).then(r=>r.json()),i=[];if(n.chassis){const[r,o,a]=n.chassis.size_mm;i.push(`chassis: ${r}×${o}×${a} mm${n.chassis.note?" — "+n.chassis.note:""}`)}for(const[r,o]of Object.entries(n.components??{})){const[a,l,c]=o.size_mm;i.push(`${r}: ${a}×${l}×${c} mm${o.note?" — "+o.note:""}`)}this._componentSpecs=i.join(`
`)}catch{}}}async _onPartChange(){const e=this._partSelEl.value;if(e){const t=this._partUrl(e);try{const n=this._partCache.get(t),i=n!==void 0?n:await fetch(t).then(r=>r.text());this._partCache.set(t,i),this._setEditorContent(i)}catch{}}else this._partsList.length>0?this._setEditorContent(this._assembleFromCache()):this._sourceUrl&&(this._highlights.clear(),await this._fetchAndPopulate(this._sourceUrl));this._updateActiveTab()}_renderTabs(){this._tabsEl.innerHTML="",this._appendTab("all","");for(const e of this._partsList)this._appendTab(e.replace(/^\d+-/,"").replace(/\.xml$/,""),e);this._updateActiveTab()}_appendTab(e,t){const n=document.createElement("button");n.className="editor-tab",n.textContent=e,n.dataset.part=t,n.addEventListener("click",()=>this._selectTab(t)),this._tabsEl.appendChild(n)}_selectTab(e){this._partSelEl.value=e,this._onPartChange()}_updateActiveTab(){for(const e of this._tabsEl.querySelectorAll(".editor-tab"))e.classList.toggle("active",(e.dataset.part??"")===this._partSelEl.value)}_historyKey(){return this._sourceUrl?`urdf-chat:${this._sourceUrl}`:null}_saveHistory(){const e=this._historyKey();if(e)try{localStorage.setItem(e,JSON.stringify(this._history))}catch{}}_loadPersistedHistory(){this._chatMsgsEl.innerHTML="";const e=this._historyKey();if(e)try{const t=localStorage.getItem(e);if(!t)return;this._history=JSON.parse(t);for(const n of this._history)if(n.role==="user"&&typeof n.content=="string")this._appendUserBubble(n.content);else if(n.role==="assistant")for(const i of n.content)i.type==="text"&&i.text?this._appendAssistantBubble(i.text):i.type==="tool_use"&&Cl.has(i.name)&&this._appendToolCard(i.name).setResult(!0)}catch{this._history=[]}}_sanitizeHistory(){for(;this._history.length>0;){const e=this._history[this._history.length-1];if(e.role!=="assistant"||!e.content.some(t=>t.type==="tool_use"))return;this._history.pop()}}async _executeTools(e,t){let n=!1;const i=[];for(const r of e){const o=(t==null?void 0:t.get(r.id))??(Cl.has(r.name)?this._appendToolCard(r.name):null),a=await this._executeTool(r.name,r.input),l=!a.error;o==null||o.setResult(l),l&&da._WRITE_TOOLS.has(r.name)&&(n=!0),i.push({type:"tool_result",tool_use_id:r.id,content:JSON.stringify(a)})}return this._history.push({role:"user",content:i}),this._saveHistory(),{noFollowUp:n}}async _runLoop(){for(;;){const e=this._appendSpinner(),t=await this._callAPI(),{content:n,toolCalls:i,toolCards:r}=await this._processStream(t,e);if(this._history.push({role:"assistant",content:n}),this._saveHistory(),!i.length)break;const{noFollowUp:o}=await this._executeTools(i,r);if(o)break}}async _withSession(e){if(!this._abort){this._abort=new AbortController,this._sendBtn.disabled=!0,this._abortBtn.hidden=!1;try{await e()}catch(t){const n=t;n.name!=="AbortError"&&(this._sanitizeHistory(),this._saveHistory(),this._appendAssistantBubble(`⚠ ${n.message||"Request failed"}`))}finally{this._abort=null,this._sendBtn.disabled=!1,this._abortBtn.hidden=!0}}}_maybeResume(){const e=this._history[this._history.length-1];if(!e||e.role!=="assistant")return;const t=e.content.filter(n=>n.type==="tool_use"&&Object.keys(n.input).length>0);t.length&&this._withSession(async()=>{await this._executeTools(t),await this._runLoop()})}async _runConversation(e){this._sanitizeHistory(),this._appendUserBubble(e),this._history.push({role:"user",content:e}),this._saveHistory(),!this._urdfFetched&&this._sourceUrl&&(await this._fetchAndPopulate(this._sourceUrl),await this._loadPartsManifest()),await this._withSession(()=>this._runLoop())}get _displayRobotName(){var t;if(this._robotName)return this._robotName;const e=(t=this._sourceUrl)==null?void 0:t.match(/([^/]+)\.urdf/i);return(e==null?void 0:e[1])??""}_summarizePart(e){try{const t=new DOMParser().parseFromString(`<root>${e}</root>`,"application/xml"),n=[...t.querySelectorAll("link")].map(r=>r.getAttribute("name")??"?"),i=[...t.querySelectorAll("joint")].map(r=>{var c;const o=r.getAttribute("name")??"?",a=r.getAttribute("type")??"fixed",l=((c=r.querySelector("origin"))==null?void 0:c.getAttribute("xyz"))??"";return l?`${o}(${a} xyz=${l})`:`${o}(${a})`});return[n.length?`links=[${n.join(", ")}]`:"",i.length?`joints=[${i.join(", ")}]`:""].filter(Boolean).join(", ")}catch{return""}}_buildSystem(){const e=this._textareaEl.value,t=e.split(`
`).length,n=e.length>vd?e.slice(0,vd)+`
<!-- ... truncated ... -->`:e,i=this._displayRobotName,r=i?`ROBOT: ${i}

`:"",o=this._brief?`
BRIEF MODE: Answer in fewer than 4 lines. No preamble, no postamble, no elaboration. Minimize tokens. Direct answers only. Emoji allowed as semantic shorthand when it replaces a word more efficiently than text.`:"",a=this._partSelEl.value,l=this._componentSpecs?`
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

${Ed}

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

${Ed}

Tool rules:
• update_urdf — COMPLETE XML only; viewer re-renders immediately
• highlight_lines — call after every explanation with the relevant line numbers
• scroll_to_line — navigate editor to a specific line

Be concise. Use tools proactively.${o}`}_buildTools(){const e=this._partsList.length>0,t=e?gE:mE;return e?[t,_E,xd,bd]:[t,xd,bd]}async _callAPI(){const e=await fetch(dE,{method:"POST",headers:{"Content-Type":"application/json"},signal:this._abort.signal,body:JSON.stringify({model:fE,max_tokens:4096,system:this._buildSystem(),messages:this._history,tools:this._buildTools(),stream:!0})});if(!e.ok){const t=await e.text().catch(()=>e.statusText);throw new Error(`API ${e.status}: ${t.slice(0,200)}`)}return e.body}async _processStream(e,t){const n=[],i=[],r=new Map;let o=null,a="",l=null,c="",h=!1,u=!1;function d(){u||(u=!0,t.remove())}for await(const{event:f,data:g}of this._parseSSE(e)){const _=g;if(f==="content_block_start"){d();const p=_.content_block;(p==null?void 0:p.type)==="text"?(o=this._appendAssistantBubble(""),a="",n.push({type:"text",text:""})):(p==null?void 0:p.type)==="tool_use"&&(l={id:p.id,name:p.name,idx:n.length},c="",n.push({type:"tool_use",id:p.id,name:p.name,input:{}}),Cl.has(p.name)&&r.set(p.id,this._appendToolCard(p.name)))}else if(f==="content_block_delta"){const p=_.delta;if((p==null?void 0:p.type)==="text_delta"){a+=p.text??"";const m=n[n.length-1];(m==null?void 0:m.type)==="text"&&(m.text=a),o&&!h&&(h=!0,requestAnimationFrame(()=>{h=!1,o&&(o.innerHTML=Md(a),this._chatMsgsEl.scrollTop=this._chatMsgsEl.scrollHeight)}))}else(p==null?void 0:p.type)==="input_json_delta"&&(c+=p.partial_json??"")}else if(f==="content_block_stop"&&l){let p={};try{p=JSON.parse(c)}catch{}n[l.idx].input=p,i.push({type:"tool_use",id:l.id,name:l.name,input:p}),l=null}}return d(),{content:n,toolCalls:i,toolCards:r}}async*_parseSSE(e){const t=e.getReader(),n=new TextDecoder;let i="",r=null;for(;;){const{done:o,value:a}=await t.read();if(o)break;i+=n.decode(a,{stream:!0});const l=i.split(`
`);i=l.pop();for(const c of l)if(c.startsWith("event: "))r=c.slice(7).trim();else if(c.startsWith("data: ")&&r){const h=c.slice(6);if(h==="[DONE]")return;try{yield{event:r,data:JSON.parse(h)}}catch{}r=null}}}_setEditorContent(e){this._textareaEl.value=e,this._highlights.clear(),this._updateLineNums()}async _executeTool(e,t){switch(e){case"update_part":{const{filename:n,xml:i}=t;return/^[\w-]+\.xml$/.test(n)?(this._partCache.set(this._partUrl(n),i),this._saveOverrides(),this._partsList.includes(n)||(this._partsList=[...this._partsList,n].sort(),this._rebuildPartOptions(),this._renderTabs()),this._setEditorContent(i),this._partSelEl.value=n,this._updateActiveTab(),this._applyPartsRender(),{ok:!0,lines:i.split(`
`).length}):{error:"invalid filename"}}case"update_urdf":{const n=t.xml;return this._setEditorContent(n),this._applyRender(),{ok:!0,lines:n.split(`
`).length}}case"highlight_lines":return this._highlightLines(t.lines),{ok:!0};case"scroll_to_line":return this._scrollEditorToLine(t.line),{ok:!0};case"read_part":{const{filename:n}=t;if(!/^[\w-]+\.xml$/.test(n))return{error:"invalid filename"};const i=this._partCache.get(this._partUrl(n));if(i!==void 0)return{ok:!0,xml:i};try{return{ok:!0,xml:await fetch(this._partUrl(n)).then(o=>o.text())}}catch{return{error:`could not read ${n}`}}}default:return{error:`unknown tool: ${e}`}}}_appendChat(e){this._chatMsgsEl.appendChild(e),this._chatMsgsEl.scrollTop=this._chatMsgsEl.scrollHeight}_appendUserBubble(e){const t=document.createElement("div");t.className="chat-msg-user",t.textContent=e,this._appendChat(t)}_appendAssistantBubble(e){const t=document.createElement("div");return t.className="chat-msg-assistant",t.innerHTML=Md(e),this._appendChat(t),t}_appendSpinner(){const e=document.createElement("div");return e.className="chat-spinner",e.innerHTML="<span></span><span></span><span></span>",this._appendChat(e),e}_appendToolCard(e){const t=document.createElement("div");t.className="chat-tool-card";const n=document.createElement("span");n.className="chat-tool-card-name",n.textContent=e;const i=document.createElement("span");return i.className="chat-tool-card-status",t.append(n,i),this._appendChat(t),{setResult(r){i.textContent=r?"✓":"✕",i.classList.add(r?"ok":"err")}}}};da._WRITE_TOOLS=new Set(["update_urdf","update_part"]);let nc=da;function yE(s){const e=s.trim().replace(/>\s*</g,`>
<`).split(`
`),t=[];let n=0;for(const i of e){const r=i.trim();r&&(r.startsWith("</")&&(n=Math.max(0,n-1)),t.push("  ".repeat(n)+r),r.startsWith("<")&&!r.startsWith("</")&&!r.endsWith("/>")&&!r.startsWith("<!--")&&!r.startsWith("<?")&&n++)}return t.join(`
`)}function vE(s){const e=s.getAttribute("position"),t=s.getIndex(),n=[];for(let l=0;l<e.count;l++)n.push([e.getX(l),e.getY(l),e.getZ(l)]);const i=[];if(t)for(let l=0;l<t.count;l+=3)i.push([t.getX(l),t.getX(l+1),t.getX(l+2)]);else for(let l=0;l<e.count;l+=3)i.push([l,l+1,l+2]);const r=new ArrayBuffer(84+i.length*50),o=new DataView(r);o.setUint32(80,i.length,!0);let a=84;for(const[l,c,h]of i){const u=n[l],d=n[c],f=n[h],g=d[0]-u[0],_=d[1]-u[1],p=d[2]-u[2],m=f[0]-u[0],w=f[1]-u[1],v=f[2]-u[2],S=_*v-p*w,I=p*m-g*v,P=g*w-_*m,C=Math.sqrt(S*S+I*I+P*P)||1;o.setFloat32(a,S/C,!0),a+=4,o.setFloat32(a,I/C,!0),a+=4,o.setFloat32(a,P/C,!0),a+=4;for(const D of[u,d,f])o.setFloat32(a,D[0],!0),a+=4,o.setFloat32(a,D[1],!0),a+=4,o.setFloat32(a,D[2],!0),a+=4;o.setUint16(a,0,!0),a+=2}return r}const ns={thickness:.003,bodyHalfWidth:.062,rearHalfWidth:.095};function Rl(s){const e=Math.max(.001,Math.min(.01,s.thickness)),t=Math.max(.04,Math.min(.09,s.bodyHalfWidth)),n=Math.max(t+.01,Math.min(.13,s.rearHalfWidth)),i=.115,r=.01,o=.08,a=-.145,l=t;function c(w,v,S,I,P=8e-4){const C=new Pr;return C.moveTo(w-S/2+P,v-I/2),C.lineTo(w+S/2-P,v-I/2),C.quadraticCurveTo(w+S/2,v-I/2,w+S/2,v-I/2+P),C.lineTo(w+S/2,v+I/2-P),C.quadraticCurveTo(w+S/2,v+I/2,w+S/2-P,v+I/2),C.lineTo(w-S/2+P,v+I/2),C.quadraticCurveTo(w-S/2,v+I/2,w-S/2,v+I/2-P),C.lineTo(w-S/2,v-I/2+P),C.quadraticCurveTo(w-S/2,v-I/2,w-S/2+P,v-I/2),C}function h(w,v,S){const I=new Pr;return I.absarc(w,v,S,0,Math.PI*2,!1),I}const u=new Lf;u.moveTo(-n+r,i),u.lineTo(n-r,i),u.quadraticCurveTo(n,i,n,i-r),u.lineTo(n,o),u.lineTo(t,o),u.lineTo(t,a+l),u.absarc(0,a+l,t,0,-Math.PI,!0),u.lineTo(-t,o),u.lineTo(-n,o),u.lineTo(-n,i-r),u.quadraticCurveTo(-n,i,-n+r,i);const d=n-.02;u.holes.push(c(-d,.093,.012,.014,.001)),u.holes.push(c(d,.093,.012,.014,.001));const f=new Pr,g=0,_=.05;f.moveTo(g-.025,_-.035),f.lineTo(g-.025,_-.018),f.lineTo(g-.033,_-.018),f.lineTo(g-.033,_+.002),f.lineTo(g-.025,_+.002),f.lineTo(g-.025,_+.018),f.lineTo(g-.015,_+.028),f.lineTo(g+.015,_+.028),f.lineTo(g+.025,_+.018),f.lineTo(g+.025,_+.002),f.lineTo(g+.033,_+.002),f.lineTo(g+.033,_-.018),f.lineTo(g+.025,_-.018),f.lineTo(g+.025,_-.035),f.lineTo(g-.025,_-.035),u.holes.push(f),u.holes.push(c(-.025,.098,.018,.006,.001)),u.holes.push(c(.025,.098,.018,.006,.001)),u.holes.push(c(0,.09,.014,.004,.001)),u.holes.push(c(-.025,-.085,.018,.004,.001)),u.holes.push(c(.025,-.085,.018,.004,.001)),u.holes.push(h(0,-.098,.006));const p=.002;u.holes.push(h(-.08,.105,p)),u.holes.push(h(.08,.105,p)),u.holes.push(h(-.08,.083,p)),u.holes.push(h(.08,.083,p)),u.holes.push(h(-.02,.108,p)),u.holes.push(h(.02,.108,p)),u.holes.push(h(-.048,.01,p)),u.holes.push(h(.048,.01,p)),u.holes.push(h(-.048,-.03,p)),u.holes.push(h(.048,-.03,p)),u.holes.push(h(0,-.02,p)),u.holes.push(h(-.014,-.065,p)),u.holes.push(h(.014,-.065,p)),u.holes.push(h(-.014,-.052,p)),u.holes.push(h(.014,-.052,p)),u.holes.push(h(-.04,-.062,p)),u.holes.push(h(.04,-.062,p));const m=new Ec(u,{depth:e,bevelEnabled:!1,curveSegments:48});return m.rotateZ(-Math.PI/2),vE(m)}const Ti={radius:.0325,width:.026};function Ll(s){const e=Math.max(.02,Math.min(.05,s.radius)),t=e*(31/32.5),n=Math.max(.008,Math.min(.03,s.width)),i=64,r=16,o=4,a=.58,l=.62,c=[],h=(w,v,S)=>c.push(...w,...v,...S),u=(w,v,S,I)=>{h(w,v,S),h(w,S,I)};for(let w=0;w<i;w++){const v=2*Math.PI*w/i,S=2*Math.PI*(w+1)/i,I=Math.cos(v),P=Math.sin(v),C=Math.cos(S),D=Math.sin(S),E=[t*I,t*P,-n/2],y=[t*C,t*D,-n/2],U=[t*I,t*P,n/2],z=[t*C,t*D,n/2];u(E,y,z,U),h([0,0,-n/2],y,E),h([0,0,n/2],U,z)}const d=2*Math.PI/r,f=n/o;for(let w=0;w<r;w++){const v=d*(w+.5),S=v-d*a/2,I=v+d*a/2;for(let P=0;P<o;P++){const C=-n/2+f*(P+.5),D=C-f*l/2,E=C+f*l/2,[y,U,z,F]=[Math.cos(S),Math.sin(S),Math.cos(I),Math.sin(I)],H=[t*y,t*U,D],Z=[t*z,t*F,D],B=[t*y,t*U,E],he=[t*z,t*F,E],G=[e*y,e*U,D],se=[e*z,e*F,D],ae=[e*y,e*U,E],me=[e*z,e*F,E];u(G,se,me,ae),u(H,G,ae,B),u(Z,he,me,se),u(H,Z,se,G),u(ae,me,he,B)}}const g=c.length/9,_=new ArrayBuffer(84+g*50),p=new DataView(_);p.setUint32(80,g,!0);let m=84;for(let w=0;w<g;w++){const v=w*9,S=c[v+3]-c[v],I=c[v+4]-c[v+1],P=c[v+5]-c[v+2],C=c[v+6]-c[v],D=c[v+7]-c[v+1],E=c[v+8]-c[v+2],y=I*E-P*D,U=P*C-S*E,z=S*D-I*C,F=Math.sqrt(y*y+U*U+z*z)||1;p.setFloat32(m,y/F,!0),m+=4,p.setFloat32(m,U/F,!0),m+=4,p.setFloat32(m,z/F,!0),m+=4;for(let H=0;H<9;H++)p.setFloat32(m,c[v+H],!0),m+=4;p.setUint16(m,0,!0),m+=2}return _}const Ri=[{id:"hcsr04",label:"HC-SR04",category:"Sensor",description:"Ultrasonic distance sensor",defaultDims:[.045,.02,.015],cssColor:"#3373e5",urdfRgba:"0.20 0.45 0.90 1.00",defaultZ:.015,factory:()=>Cn(()=>import("./generators-D3RQsyLw.js"),[]).then(s=>({generate:s.generateHcsr04}))},{id:"l298n",label:"L298N",category:"Actuator",description:"Dual H-bridge motor driver",defaultDims:[.043,.043,.02],cssColor:"#c01f1f",urdfRgba:"0.75 0.12 0.12 1.00",defaultZ:.005,factory:()=>Cn(()=>import("./generators-D3RQsyLw.js"),[]).then(s=>({generate:s.generateL298n}))},{id:"esp32cam_lib",label:"ESP32-CAM",category:"MCU",description:"ESP32 camera module",defaultDims:[.0405,.027,.013],cssColor:"#1a7a3c",urdfRgba:"0.00 0.45 0.20 1.00",defaultZ:.005,factory:()=>Cn(()=>import("./generators-D3RQsyLw.js"),[]).then(s=>({generate:s.generateEsp32Cam}))},{id:"tt_motor",label:"TT Motor",category:"Actuator",description:"TT gear motor with DC can",defaultDims:[.036,.018,.022],cssColor:"#c89a14",urdfRgba:"0.83 0.63 0.09 1.00",defaultZ:.011,factory:()=>Cn(()=>import("./generators-D3RQsyLw.js"),[]).then(s=>({generate:s.generateTtMotor}))},{id:"sg90",label:"SG90",category:"Actuator",description:"Micro servo motor",defaultDims:[.022,.0115,.023],cssColor:"#e07810",urdfRgba:"0.90 0.50 0.15 1.00",defaultZ:.012,factory:()=>Cn(()=>import("./generators-D3RQsyLw.js"),[]).then(s=>({generate:s.generateSg90}))},{id:"arduino_nano",label:"Arduino Nano",category:"MCU",description:"Arduino Nano microcontroller",defaultDims:[.043,.018,.01],cssColor:"#006e33",urdfRgba:"0.00 0.50 0.30 1.00",defaultZ:.005,factory:()=>Cn(()=>import("./generators-D3RQsyLw.js"),[]).then(s=>({generate:s.generateArduinoNano}))},{id:"mpu6050",label:"MPU-6050",category:"Sensor",description:"6-axis IMU (accelerometer + gyroscope)",defaultDims:[.02,.02,.0025],cssColor:"#7a52cc",urdfRgba:"0.55 0.35 0.80 1.00",defaultZ:.005,factory:()=>Cn(()=>import("./generators-D3RQsyLw.js"),[]).then(s=>({generate:s.generateMpu6050}))}],xE=Object.fromEntries(Ri.map(s=>[s.id,{label:s.label,color:s.urdfRgba,defaultZ:s.defaultZ,geomType:"mesh",defaultDims:[...s.defaultDims],category:s.category,cssColor:s.cssColor}])),Un={ultrasonic:{label:"Ultrasonic",color:"0.20 0.45 0.90 1.00",defaultZ:.015,geomType:"box",defaultDims:[.045,.02,.015],hidden:!0},camera:{label:"Camera",color:"0.90 0.20 0.25 1.00",defaultZ:.01,geomType:"box",defaultDims:[.025,.024,.009]},lidar:{label:"LIDAR",color:"0.20 0.80 0.45 1.00",defaultZ:.035,geomType:"cylinder",defaultDims:[.035,.04]},imu:{label:"IMU",color:"0.55 0.35 0.80 1.00",defaultZ:.008,geomType:"box",defaultDims:[.02,.02,.008],hidden:!0},servo:{label:"Servo",color:"0.90 0.50 0.15 1.00",defaultZ:.02,geomType:"box",defaultDims:[.022,.012,.03],hidden:!0},arduino:{label:"Arduino",color:"0.00 0.45 0.20 1.00",defaultZ:.008,geomType:"box",defaultDims:[.044,.018,.008],hidden:!0},raspberry_pi:{label:"Raspberry Pi",color:"0.70 0.10 0.20 1.00",defaultZ:.017,geomType:"box",defaultDims:[.086,.056,.017]},gps:{label:"GPS",color:"0.20 0.70 0.35 1.00",defaultZ:.01,geomType:"box",defaultDims:[.025,.025,.01]},buck_converter:{label:"Buck Conv.",color:"0.85 0.60 0.00 1.00",defaultZ:.011,geomType:"box",defaultDims:[.023,.017,.011]},box:{label:"Box",color:"0.65 0.65 0.65 1.00",defaultZ:.02,geomType:"box",defaultDims:[.04,.04,.02]},...xE},bE=new Set(["robot-car"]),Sd=`<link name="wheel_left">
  <visual>
    <geometry><mesh filename="wheel.stl"/></geometry>
    <material name="rubber"><color rgba="0.10 0.10 0.10 1.00"/></material>
  </visual>
  <visual>
    <origin xyz="0 0 0.0075" rpy="0 0 0"/>
    <geometry><cylinder radius="0.022" length="0.012"/></geometry>
    <material name="hub_yellow"><color rgba="1.00 0.85 0.00 1.00"/></material>
  </visual>
</link>
<joint name="wheel_left_joint" type="continuous">
  <parent link="base_link"/>
  <child link="wheel_left"/>
  <origin xyz="-0.010 -0.090 0.0000" rpy="1.5708 0.0000 0.0000"/>
  <axis xyz="0 0 1"/>
  <limit effort="2.0" velocity="15.0"/>
</joint>

<link name="wheel_right">
  <visual>
    <geometry><mesh filename="wheel.stl"/></geometry>
    <material name="rubber"><color rgba="0.10 0.10 0.10 1.00"/></material>
  </visual>
  <visual>
    <origin xyz="0 0 -0.0075" rpy="0 0 0"/>
    <geometry><cylinder radius="0.022" length="0.012"/></geometry>
    <material name="hub_yellow"><color rgba="1.00 0.85 0.00 1.00"/></material>
  </visual>
</link>
<joint name="wheel_right_joint" type="continuous">
  <parent link="base_link"/>
  <child link="wheel_right"/>
  <origin xyz="-0.010 0.090 0.0000" rpy="1.5708 0.0000 0.0000"/>
  <axis xyz="0 0 1"/>
  <limit effort="2.0" velocity="15.0"/>
</joint>`,wd=`<joint name="chassis_joint" type="fixed">
  <parent link="base_link"/>
  <child link="chassis"/>
  <origin xyz="0 0 0" rpy="0 0 0"/>
</joint>

<link name="chassis">
  <visual>
    <geometry>
      <mesh filename="chassis.stl" scale="1.00 1.05 1.00"/>
    </geometry>
    <material name="acrylic">
      <color rgba="0.72 0.91 1.00 0.50"/>
    </material>
  </visual>
</link>`,Td=`<link name="caster_plate">
  <visual>
    <geometry><box size="0.036 0.036 0.004"/></geometry>
    <material name="caster_metal"><color rgba="0.76 0.76 0.78 1.00"/></material>
  </visual>
</link>
<joint name="caster_plate_joint" type="fixed">
  <parent link="base_link"/>
  <child link="caster_plate"/>
  <origin xyz="-0.1200 0.0000 -0.0040" rpy="0 0 0"/>
</joint>

<link name="caster_fork">
  <visual>
    <geometry><box size="0.008 0.016 0.030"/></geometry>
    <material name="caster_metal"><color rgba="0.76 0.76 0.78 1.00"/></material>
  </visual>
</link>
<joint name="caster_fork_joint" type="fixed">
  <parent link="base_link"/>
  <child link="caster_fork"/>
  <origin xyz="-0.1200 0.0000 -0.0149" rpy="0 0 0"/>
</joint>

<link name="caster_wheel">
  <visual>
    <geometry><cylinder radius="0.0146" length="0.0145"/></geometry>
    <material name="caster_rubber"><color rgba="0.08 0.08 0.08 1.00"/></material>
  </visual>
</link>
<joint name="caster_wheel_joint" type="continuous">
  <parent link="base_link"/>
  <child link="caster_wheel"/>
  <origin xyz="-0.1200 0.0000 -0.0289" rpy="1.5708 0.0000 0.0000"/>
  <axis xyz="0 0 1"/>
</joint>`,Pl=`<link name="battery_box">
  <visual>
    <geometry><box size="0.0806 0.0442 0.022"/></geometry>
    <material name="battery"><color rgba="0.12 0.12 0.14 1.00"/></material>
  </visual>
</link>
<joint name="battery_box_joint" type="fixed">
  <parent link="base_link"/>
  <child link="battery_box"/>
  <origin xyz="0.0460 0.0000 -0.0120" rpy="0 0 0"/>
</joint>

<link name="powerbank">
  <visual>
    <geometry><cylinder radius="0.0115" length="0.1199"/></geometry>
    <material name="powerbank_blue"><color rgba="0.15 0.45 0.85 1.00"/></material>
  </visual>
</link>
<joint name="powerbank_joint" type="fixed">
  <parent link="base_link"/>
  <child link="powerbank"/>
  <origin xyz="-0.0350 0.0000 -0.0110" rpy="1.5708 0.0000 0.0000"/>
</joint>`;function Ad(s,e){const t=[...e.entries()].sort(([r],[o])=>r.localeCompare(o)),n=t.filter(([r])=>r.startsWith("00")).map(([,r])=>r.trimEnd()).join(`
`),i=t.filter(([r])=>!r.startsWith("00")).map(([,r])=>r.trimEnd()).join(`

`);return`<?xml version="1.0"?>
${n}
<robot name="${s}">

${i}

</robot>
`}class Sa{constructor(e,t){this._robotName="",this._dir="",this._partMap=new Map,this._stlBlobs=new Map,this._jointZPatches=new Map,this._wheelGroundZ=0,this._blobUrl=null,this._components=new Map,this._compCounters=new Map,this._meshBlobs=new Map,this._partTemplates=new Map,this._isCustom=!1,this._casterRadius=.0146,this._casterWidth=.0145,this._batteryBox={l:.0806,w:.0442,h:.022},this._chassisParams={...ns},this._wheelParams={...Ti},this._powerbank={radius:.0115,length:.1199},this._undoStack=[],this._redoStack=[],this._maxUndo=50,this.onDOMRebuild=null,this.onHistoryChange=null,this._viewer=e,this.noticeEl=t}get isActive(){return document.body.classList.contains("build-open")}get isSupported(){return bE.has(this._robotName)}get isCatalogActive(){return this.isSupported||this._isCustom}init(e,t,n){this._robotName=e,this._dir=t,this._partMap=new Map(n),this._isCustom=!1,document.body.classList.remove("build-custom");for(const r of this._stlBlobs.values())URL.revokeObjectURL(r.split("#")[0]);this._stlBlobs.clear();for(const r of this._meshBlobs.values())URL.revokeObjectURL(r.split("#")[0]);this._meshBlobs.clear(),this._jointZPatches.clear(),this._components.clear(),this._compCounters.clear(),this._casterRadius=.0146,this._casterWidth=.0145,this._batteryBox={l:.0806,w:.0442,h:.022},this._powerbank={radius:.0115,length:.1199},this._chassisParams={...ns},this._wheelParams={...Ti},this._undoStack.length=0,this._redoStack.length=0;const i=this._parseJointZ("wheel_left_joint")??-.0325;this._wheelGroundZ=i-Ti.radius,this.noticeEl.hidden=this.isSupported}initFromScratch(e){this._robotName=e.trim()||"custom-robot",this._dir="",this._isCustom=!0,document.body.classList.add("build-custom");for(const t of this._stlBlobs.values())URL.revokeObjectURL(t.split("#")[0]);this._stlBlobs.clear();for(const t of this._meshBlobs.values())URL.revokeObjectURL(t.split("#")[0]);this._meshBlobs.clear(),this._jointZPatches.clear(),this._components.clear(),this._compCounters.clear(),this._chassisParams={...ns},this._wheelParams={...Ti},this._casterRadius=.0146,this._casterWidth=.0145,this._batteryBox={l:.0806,w:.0442,h:.022},this._powerbank={radius:.0115,length:.1199},this._wheelGroundZ=-.0325,this._undoStack.length=0,this._redoStack.length=0,this._partTemplates.clear(),this._partMap=new Map([["01-base.xml",'  <link name="base_link"/>']]),this.noticeEl.hidden=!0,this._reload()}setPartTemplate(e,t){this._partTemplates.set(e,t)}open(){document.body.classList.add("build-open")}close(){document.body.classList.remove("build-open")}updateChassis(e){this._pushUndo(),this._partMap.has("02-chassis.xml")||this._partMap.set("02-chassis.xml",wd),this._chassisParams={...e},this._setSTL("chassis.stl",Rl(e))}updateWheel(e){if(this._pushUndo(),!this._partMap.has("03-wheels.xml")){this._partMap.set("03-wheels.xml",this._partTemplates.get("03-wheels.xml")??Sd);const n=this._parseJointZ("wheel_left_joint")??-.0325;this._wheelGroundZ=n-Ti.radius}this._wheelParams={...e};const t=e.radius+this._wheelGroundZ;this._jointZPatches.set("wheel_left_joint",t),this._jointZPatches.set("wheel_right_joint",t),this._setSTL("wheel.stl",Ll(e))}updateCaster(e,t){this._pushUndo(),this._partMap.has("04-caster.xml")||this._partMap.set("04-caster.xml",this._partTemplates.get("04-caster.xml")??Td),this._casterRadius=e,this._casterWidth=t,this._reload()}updateBatteryBox(e,t,n){this._pushUndo(),this._partMap.has("06-power.xml")||this._partMap.set("06-power.xml",this._partTemplates.get("06-power.xml")??Pl),this._batteryBox={l:e,w:t,h:n},this._reload()}addComponent(e){this._pushUndo();const t=(this._compCounters.get(e)??0)+1;this._compCounters.set(e,t);const n=`${e}_${t}`,i=Un[e];return this._components.set(n,{type:e,x:0,y:0,z:(i==null?void 0:i.defaultZ)??.02,rx:0,ry:0,rz:0,dims:[...(i==null?void 0:i.defaultDims)??[.04,.04,.02]],jointType:"fixed",axis:[0,0,1],limitLower:-1.5708,limitUpper:1.5708,parent:"base_link"}),this._reload(),n}addMeshComponent(e,t){this._pushUndo();const n=(this._compCounters.get(e)??0)+1;this._compCounters.set(e,n);const i=`${e}_${n}`,r=URL.createObjectURL(new Blob([t],{type:"application/octet-stream"}));this._meshBlobs.set(i,`${r}#${i}.stl`);const o=Un[e];return this._components.set(i,{type:e,x:0,y:0,z:(o==null?void 0:o.defaultZ)??.02,rx:0,ry:0,rz:0,dims:[...(o==null?void 0:o.defaultDims)??[.04,.04,.02]],jointType:"fixed",axis:[0,0,1],limitLower:-1.5708,limitUpper:1.5708,parent:"base_link"}),this._reload(),i}restoreMeshBlob(e,t){if(!this._components.has(e))return;const n=this._meshBlobs.get(e);n&&URL.revokeObjectURL(n.split("#")[0]);const i=URL.createObjectURL(new Blob([t],{type:"application/octet-stream"}));this._meshBlobs.set(e,`${i}#${e}.stl`),this._reload()}removeComponent(e){this._pushUndo();const t=this._meshBlobs.get(e);t&&(URL.revokeObjectURL(t.split("#")[0]),this._meshBlobs.delete(e)),this._components.delete(e),this._reload()}updateComponent(e,t){this._components.has(e)&&(this._pushUndo(),this._updateComponentDirect(e,t))}_updateComponentDirect(e,t){const n=this._components.get(e);n&&(Object.assign(n,t),this._reload())}get chassisParams(){return{...this._chassisParams}}get wheelParams(){return{...this._wheelParams}}get casterRadius(){return this._casterRadius}get casterWidth(){return this._casterWidth}get batteryBox(){return{...this._batteryBox}}get powerbank(){return{...this._powerbank}}get canUndo(){return this._undoStack.length>0}get canRedo(){return this._redoStack.length>0}get componentIds(){return new Set(this._components.keys())}isFixedComponent(e){var t;return((t=this._components.get(e))==null?void 0:t.jointType)==="fixed"}getComponentXYZ(e){const t=this._components.get(e);return t?{x:t.x,y:t.y,z:t.z}:null}startComponentDrag(e){this._pushUndo()}finishComponentDrag(e,t,n,i){this._updateComponentDirect(e,{x:t,y:n,z:i})}updatePowerbank(e,t){this._pushUndo(),this._partMap.has("06-power.xml")||this._partMap.set("06-power.xml",this._partTemplates.get("06-power.xml")??Pl),this._powerbank={radius:e,length:t},this._reload()}getComponentEntries(){return[...this._components.keys()].map(e=>({id:e,type:this._components.get(e).type}))}getComponentData(e){const t=this._components.get(e);return t?{...t,axis:[...t.axis]}:null}duplicateComponent(e){const t=this._components.get(e);if(!t)return null;this._pushUndo();const n=(this._compCounters.get(t.type)??0)+1;this._compCounters.set(t.type,n);const i=`${t.type}_${n}`;return this._components.set(i,{...t,axis:[...t.axis],x:t.x+.02}),this._reload(),i}getURDFXML(){return this._buildXML()}resetToDefaults(){var e;this._pushUndo(),this._chassisParams={...ns},this._wheelParams={...Ti},this._casterRadius=.0146,this._casterWidth=.0145,this._batteryBox={l:.0806,w:.0442,h:.022},this._powerbank={radius:.0115,length:.1199},this._jointZPatches.clear(),this._components.clear(),this._compCounters.clear();for(const t of this._stlBlobs.values())URL.revokeObjectURL(t.split("#")[0]);this._stlBlobs.clear();for(const t of this._meshBlobs.values())URL.revokeObjectURL(t.split("#")[0]);this._meshBlobs.clear();try{localStorage.removeItem(`urdf-build-${this._robotName}`)}catch{}this._reload(),(e=this.onDOMRebuild)==null||e.call(this)}undo(){var e;this.canUndo&&(this._redoStack.push(this._snapshot()),this._applySnapshot(this._undoStack.pop()),(e=this.onHistoryChange)==null||e.call(this))}redo(){var e;this.canRedo&&(this._undoStack.push(this._snapshot()),this._applySnapshot(this._redoStack.pop()),(e=this.onHistoryChange)==null||e.call(this))}restore(){const e=localStorage.getItem(`urdf-build-${this._robotName}`);if(!e)return[];let t;try{t=JSON.parse(e)}catch{return[]}if(t.version!==1)return[];this._casterRadius=t.caster.radius,this._casterWidth=t.caster.width,this._batteryBox={...t.battery},this._powerbank=t.powerbank??{radius:.0115,length:.1199},this._components=new Map(t.components),this._compCounters=new Map(t.counters),this._chassisParams={...t.chassis},this._partMap.set("02-chassis.xml",wd),this._storeSTLBlob("chassis.stl",Rl(t.chassis)),this._wheelParams={...t.wheel},this._partMap.set("03-wheels.xml",Sd);const n=t.wheel.radius+this._wheelGroundZ;return this._jointZPatches.set("wheel_left_joint",n),this._jointZPatches.set("wheel_right_joint",n),this._storeSTLBlob("wheel.stl",Ll(t.wheel)),this._partMap.set("04-caster.xml",Td),this._partMap.set("06-power.xml",Pl),this._reload(),[...this._components.keys()].map(i=>({id:i,type:this._components.get(i).type}))}getAvailableLinks(){const e=new Set,t=[];for(const n of this._partMap.values())for(const i of n.matchAll(/<link\s[^>]*name="([^"]+)"/g))e.has(i[1])||(e.add(i[1]),t.push(i[1]));for(const n of this._components.keys())e.has(n)||t.push(n);return t}async exportZip(e){const t=e.textContent;e.textContent="Exporting…",e.disabled=!0;try{let n=this._buildXML();for(const[,l]of this._meshBlobs){const c=l.split("#")[1];c&&(n=n.replaceAll(l,c))}const i=new Set([...n.matchAll(/filename="([^/"]+\.stl)"/g)].map(l=>l[1]));for(const[,l]of this._meshBlobs){const c=l.split("#")[1];c&&i.add(c)}const r={};for(const l of i){let c;if(this._stlBlobs.has(l))c=this._stlBlobs.get(l).split("#")[0];else{const h=[...this._meshBlobs.values()].find(u=>u.endsWith(`#${l}`));c=h?h.split("#")[0]:`${this._dir}/${l}`}r[l]=new Uint8Array(await fetch(c).then(h=>h.arrayBuffer()))}r[`${this._robotName}.urdf`]=new TextEncoder().encode(n);const{zipSync:o}=await Cn(async()=>{const{zipSync:l}=await import("./browser-CXh1ITwj.js");return{zipSync:l}},[]),a=Object.assign(document.createElement("a"),{href:URL.createObjectURL(new Blob([o(r)],{type:"application/zip"})),download:`${this._robotName}.zip`});a.click(),URL.revokeObjectURL(a.href)}finally{e.textContent=t,e.disabled=!1}}_buildXML(){return this._insertComponents(this._applyGeometryPatches(this._applyJointPatches(Ad(this._robotName,this._partMap))))}_applyJointPatches(e){for(const[t,n]of this._jointZPatches)e=e.replace(new RegExp(`(<joint\\b[^>]*?\\bname="${t}"[\\s\\S]*?<origin\\b[^>]*?\\bxyz=")([^"]+)(")`),(i,r,o,a)=>{const l=o.trim().split(/\s+/);return l[2]=n.toFixed(4),`${r}${l.join(" ")}${a}`});return e}_applyGeometryPatches(e){const t=this._casterRadius,n=this._casterWidth;e=e.replace(/(<link\s[^>]*name="caster_wheel"[\s\S]*?<cylinder\s+)radius="[^"]*"\s+length="[^"]*"/,`$1radius="${t.toFixed(4)}" length="${n.toFixed(4)}"`),e=e.replace(new RegExp('(<joint\\b[^>]*?\\bname="caster_wheel_joint"[\\s\\S]*?<origin\\b[^>]*?\\bxyz=")([^"]+)(")'),(c,h,u,d)=>{const f=u.trim().split(/\s+/);return f[2]=(this._wheelGroundZ+t).toFixed(4),`${h}${f.join(" ")}${d}`});const{l:i,w:r,h:o}=this._batteryBox;e=e.replace(/(<link\s[^>]*name="battery_box"[\s\S]*?<box\s+)size="[^"]*"/,`$1size="${i.toFixed(4)} ${r.toFixed(4)} ${o.toFixed(4)}"`),e=e.replace(new RegExp('(<joint\\b[^>]*?\\bname="battery_box_joint"[\\s\\S]*?<origin\\b[^>]*?\\bxyz=")([^"]+)(")'),(c,h,u,d)=>{const f=u.trim().split(/\s+/);return f[2]=(-.0015-o/2).toFixed(4),`${h}${f.join(" ")}${d}`});const{radius:a,length:l}=this._powerbank;return e=e.replace(/(<link\s[^>]*name="powerbank"[\s\S]*?<cylinder\s+)radius="[^"]*"\s+length="[^"]*"/,`$1radius="${a.toFixed(4)}" length="${l.toFixed(4)}"`),e=e.replace(new RegExp('(<joint\\b[^>]*?\\bname="powerbank_joint"[\\s\\S]*?<origin\\b[^>]*?\\bxyz=")([^"]+)(")'),(c,h,u,d)=>{const f=u.trim().split(/\s+/);return f[2]=(-.0015-a).toFixed(4),`${h}${f.join(" ")}${d}`}),e}_insertComponents(e){if(this._components.size===0)return e;const t=[];for(const[n,i]of this._components){const r=Un[i.type];let o;if((r==null?void 0:r.geomType)==="mesh"){const c=this._meshBlobs.get(n);if(!c)continue;o=`<mesh filename="${c}"/>`}else(r==null?void 0:r.geomType)==="cylinder"?o=`<cylinder radius="${i.dims[0].toFixed(4)}" length="${i.dims[1].toFixed(4)}"/>`:o=`<box size="${i.dims[0].toFixed(4)} ${i.dims[1].toFixed(4)} ${i.dims[2].toFixed(4)}"/>`;const a=i.jointType!=="fixed"?`
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
</robot>`)}getJointXYZ(e){for(const t of this._partMap.values()){const n=t.match(new RegExp(`<joint[^>]*name="${e}"[\\s\\S]*?<origin[^>]*\\bxyz="([^"]+)"`));if(n){const[i,r,o]=n[1].trim().split(/\s+/).map(parseFloat);return{x:i,y:r,z:o}}}return null}_parseJointZ(e){var t;return((t=this.getJointXYZ(e))==null?void 0:t.z)??null}_snapshot(){return{chassisParams:{...this._chassisParams},wheelParams:{...this._wheelParams},casterRadius:this._casterRadius,casterWidth:this._casterWidth,batteryBox:{...this._batteryBox},powerbank:{...this._powerbank},components:[...this._components.entries()].map(([e,t])=>[e,{...t,axis:[...t.axis]}]),counters:[...this._compCounters.entries()]}}_pushUndo(){var e;this._undoStack.push(this._snapshot()),this._undoStack.length>this._maxUndo&&this._undoStack.shift(),this._redoStack.length=0,(e=this.onHistoryChange)==null||e.call(this)}_applySnapshot(e){var n;this._chassisParams={...e.chassisParams},this._wheelParams={...e.wheelParams},this._casterRadius=e.casterRadius,this._casterWidth=e.casterWidth,this._batteryBox={...e.batteryBox},this._powerbank={...e.powerbank},this._components=new Map(e.components.map(([i,r])=>[i,{...r,axis:[...r.axis]}])),this._compCounters=new Map(e.counters);const t=e.wheelParams.radius+this._wheelGroundZ;this._jointZPatches.set("wheel_left_joint",t),this._jointZPatches.set("wheel_right_joint",t);for(const i of this._stlBlobs.values())URL.revokeObjectURL(i.split("#")[0]);this._stlBlobs.clear();for(const i of this._meshBlobs.values())URL.revokeObjectURL(i.split("#")[0]);this._meshBlobs.clear(),this._storeSTLBlob("chassis.stl",Rl(this._chassisParams)),this._storeSTLBlob("wheel.stl",Ll(this._wheelParams)),this._reload(),(n=this.onDOMRebuild)==null||n.call(this)}_storeSTLBlob(e,t){const n=this._stlBlobs.get(e);n&&URL.revokeObjectURL(n.split("#")[0]);const i=URL.createObjectURL(new Blob([t],{type:"application/octet-stream"}));this._stlBlobs.set(e,`${i}#${e}`)}_setSTL(e,t){this._storeSTLBlob(e,t),this._reload()}_saveState(){if(!(!this._robotName||!this.isCatalogActive))try{if(localStorage.setItem(`urdf-build-${this._robotName}`,JSON.stringify({version:1,chassis:{...this._chassisParams},wheel:{...this._wheelParams},caster:{radius:this._casterRadius,width:this._casterWidth},battery:{...this._batteryBox},powerbank:{...this._powerbank},components:[...this._components.entries()],counters:[...this._compCounters.entries()]})),this._isCustom){localStorage.setItem("urdf-build-last-custom",this._robotName);const e=localStorage.getItem("urdf-build-custom-list"),t=e?JSON.parse(e):[];t.includes(this._robotName)||(t.push(this._robotName),localStorage.setItem("urdf-build-custom-list",JSON.stringify(t)))}}catch{}}get robotName(){return this._robotName}clearCustom(){try{const e=localStorage.getItem("urdf-build-last-custom");e?this.deleteCustom(e):localStorage.removeItem("urdf-build-last-custom")}catch{}}deleteCustom(e){try{const t=localStorage.getItem("urdf-build-custom-list"),i=(t?JSON.parse(t):[]).filter(r=>r!==e);i.length>0?localStorage.setItem("urdf-build-custom-list",JSON.stringify(i)):localStorage.removeItem("urdf-build-custom-list"),localStorage.removeItem(`urdf-build-${e}`),localStorage.getItem("urdf-build-last-custom")===e&&localStorage.removeItem("urdf-build-last-custom")}catch{}}static lastCustomName(){try{const e=localStorage.getItem("urdf-build-last-custom");return e&&localStorage.getItem(`urdf-build-${e}`)?e:null}catch{return null}}static savedCustomNames(){try{const e=localStorage.getItem("urdf-build-custom-list"),t=e?JSON.parse(e):[],n=localStorage.getItem("urdf-build-last-custom");return n&&!t.includes(n)&&localStorage.getItem(`urdf-build-${n}`)&&t.unshift(n),t.filter(i=>!!localStorage.getItem(`urdf-build-${i}`))}catch{return[]}}restoreCustom(){const e=Sa.lastCustomName();return e?this.restoreCustomByName(e):[]}restoreCustomByName(e){return this.initFromScratch(e),this.restore()}_reload(){if(!this._robotName)return;let e=this._insertComponents(this._applyGeometryPatches(this._applyJointPatches(Ad(this._robotName,this._partMap))));for(const[t,n]of this._stlBlobs)e=e.replaceAll(`filename="${t}"`,`filename="${n}"`);e=e.replace(/filename="([^/"]+)"/g,`filename="${this._dir}/$1"`),this._blobUrl&&URL.revokeObjectURL(this._blobUrl),this._blobUrl=URL.createObjectURL(new Blob([e],{type:"application/xml"})),this._viewer.urdf=this._blobUrl,this._saveState()}}const EE="http://127.0.0.1:7337/claude",Nl="claude-sonnet-4-6";let Xo=null;async function ME(){return Xo||(Xo=(await Cn(()=>import("https://neevs.io/auth/connect.js"),[])).connectGitHub,Xo)}function Cd(s){return s.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"([^"\\]*(\\.[^"\\]*)*)"(\s*:)/g,'<span class="j-key">"$1"</span>$3').replace(/:\s*"([^"\\]*(\\.[^"\\]*)*)"/g,': <span class="j-str">"$1"</span>').replace(/:\s*(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g,': <span class="j-num">$1</span>').replace(/:\s*(true|false|null)\b/g,': <span class="j-kw">$1</span>')}function qo(s){return typeof marked<"u"&&typeof DOMPurify<"u"?DOMPurify.sanitize(marked.parse(s),{ADD_ATTR:["style"]}):s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}const SE={chassis:"Chassis",wheels:"Wheels",caster:"Caster",battery:"Battery Box",powerbank:"Power Bank"},wE={clear:{desc:"Clear chat history"},format:{desc:"Prettify URDF XML"}},TE={add:{desc:"Add a component from the library",arg:"type"},remove:{desc:"Remove a component by id",arg:"id"},move:{desc:"Move a component (x=… y=… z=…)",arg:"id"},chassis:{desc:"Update chassis params (key=val …)"},wheels:{desc:"Update wheel params (key=val …)"},undo:{desc:"Undo last action"},redo:{desc:"Redo last undone action"},reset:{desc:"Reset robot to defaults"},export:{desc:"Export URDF + STL ZIP"}};class AE{constructor(e,t){this._history=[],this._abortCtrl=null,this._brief=!0,this._guide=!1,this._cmdAcIdx=-1,this._pauseResolve=null,this._provider="anthropic",this._model=Nl,this._githubAuth=null,this._buildCtrl=e,this._cb=t}init(){this._messagesEl=document.getElementById("chat-messages"),this._emptyStateEl=document.getElementById("chat-empty-state"),this._chatPaneEl=this._messagesEl.closest(".chat-pane"),this._inputEl=document.getElementById("chat-input"),this._sendBtn=document.getElementById("chat-send"),this._abortBtn=document.getElementById("chat-abort"),this._briefBtn=document.getElementById("chat-brief-toggle"),this._continueBtn=document.getElementById("chat-continue"),this._toolCountBtn=document.getElementById("chat-tool-count"),this._cmdAcEl=document.getElementById("cmd-ac"),this._modelSelectEl=document.getElementById("chat-model-select"),this._ghBarEl=document.getElementById("chat-github-bar"),this._apikeyBarEl=document.getElementById("chat-apikey-bar");const e=localStorage.getItem("urdf-gh-auth");if(e)try{this._githubAuth=JSON.parse(e)}catch{}const t=localStorage.getItem("urdf-chat-model");t&&(this._modelSelectEl.value=t),this._applyModel(this._modelSelectEl.value),this._modelSelectEl.addEventListener("change",()=>{this._applyModel(this._modelSelectEl.value),this._clearChat()}),this._inputEl.addEventListener("input",()=>{this._inputEl.style.height="auto",this._inputEl.style.height=`${Math.min(this._inputEl.scrollHeight,120)}px`;const i=this._inputEl.value;/^\/[a-z]*$/.test(i)?this._showCmdAc(i.slice(1)):this._hideCmdAc()}),this._inputEl.addEventListener("keydown",i=>{if(!this._cmdAcEl.hidden){const r=this._cmdAcEl.querySelectorAll(".cmd-ac-item");if(i.key==="ArrowDown"){i.preventDefault(),this._cmdAcIdx=(this._cmdAcIdx+1)%r.length,this._updateCmdAcSelection(r);return}if(i.key==="ArrowUp"){i.preventDefault(),this._cmdAcIdx=(this._cmdAcIdx-1+r.length)%r.length,this._updateCmdAcSelection(r);return}if(i.key==="Tab"||i.key==="Enter"&&this._cmdAcIdx>=0){const o=r[this._cmdAcIdx];if(o){i.preventDefault(),this._applyCmd(o.dataset.cmd);return}}if(i.key==="Escape"){this._hideCmdAc();return}}i.key==="Enter"&&!i.shiftKey&&(i.preventDefault(),this._handleSend())}),this._sendBtn.addEventListener("click",()=>this._handleSend()),this._abortBtn.addEventListener("click",()=>{var i,r;(i=this._abortCtrl)==null||i.abort(),(r=this._pauseResolve)==null||r.call(this,!0)}),this._briefBtn.addEventListener("click",()=>{this._brief=!this._brief,this._briefBtn.classList.toggle("active",!this._brief),this._briefBtn.setAttribute("aria-pressed",String(!this._brief)),this._cb.onBriefToggle(this._brief)}),this._continueBtn.addEventListener("click",()=>{var i;return(i=this._pauseResolve)==null?void 0:i.call(this,!1)}),document.getElementById("chat-guide-start").addEventListener("click",()=>{this._guide=!0,this._cb.initRobot("robot-car"),this._runConversation("Please guide me through building this robot step by step.")});let n=0;document.addEventListener("keydown",i=>{const r=this._messagesEl.closest("aside");if(!(r!=null&&r.classList.contains("open"))||document.body.classList.contains("editor-open"))return;const o=document.activeElement;if(i.key==="Escape"){const a=Date.now();if(a-n<400){confirm("Clear chat history?")&&this._clearChat(),n=0;return}n=a;return}o&&/^(INPUT|TEXTAREA|SELECT)$/.test(o.tagName)||o!=null&&o.isContentEditable||i.key.length!==1||i.metaKey||i.ctrlKey||i.altKey||this._inputEl.focus()}),this.syncToolCount(),this._restoreHistory()}syncToolCount(){if(this._toolCountBtn){const e=this._buildCtrl.isCatalogActive;this._toolCountBtn.hidden=!e,e&&(this._toolCountBtn.textContent=`${this._buildTools().length} tools`)}}resumeFromGesture(){var e;(e=this._pauseResolve)==null||e.call(this,!1)}_showContinueButton(){this._inputEl.disabled=!0,this._sendBtn.hidden=!0,this._continueBtn.hidden=!1}_hideContinueButton(){this._continueBtn.hidden=!0,this._sendBtn.hidden=!1,this._inputEl.disabled=!1,this._pauseResolve=null}_updateEmptyState(){const e=this._history.length===0;this._emptyStateEl.style.display=e?"flex":"none",this._emptyStateEl.setAttribute("aria-hidden",String(!e)),this._chatPaneEl.classList.toggle("chat-empty",e)}_activeCmds(){return this._cb.isEditorTabActive()?wE:TE}_showCmdAc(e){const t=this._activeCmds(),n=Object.entries(t).filter(([i])=>i.startsWith(e));if(!n.length){this._hideCmdAc();return}this._cmdAcIdx=0,this._cmdAcEl.innerHTML=n.map(([i,r],o)=>`
            <div class="cmd-ac-item${o===0?" selected":""}" role="option" data-cmd="${i}" aria-selected="${o===0}">
                <span class="cmd-ac-name">/${i}</span>
                ${r.arg?`<span class="cmd-ac-arg">&lt;${r.arg}&gt;</span>`:""}
                <span class="cmd-ac-desc">${r.desc}</span>
            </div>`).join("");for(const i of this._cmdAcEl.querySelectorAll(".cmd-ac-item"))i.addEventListener("mousedown",r=>{r.preventDefault(),this._applyCmd(i.dataset.cmd)});this._cmdAcEl.hidden=!1}_hideCmdAc(){this._cmdAcEl.hidden=!0,this._cmdAcIdx=-1}_updateCmdAcSelection(e){e.forEach((t,n)=>{const i=n===this._cmdAcIdx;t.setAttribute("aria-selected",String(i)),t.classList.toggle("selected",i)})}_applyCmd(e){const n=this._activeCmds()[e];n&&(this._hideCmdAc(),n.arg?(this._inputEl.value=`/${e} `,this._inputEl.focus()):(this._clearInput(),this._handleSendText(`/${e}`)))}_clearInput(){this._inputEl.value="",this._inputEl.style.height=""}_handleSend(){this._hideCmdAc();const e=this._inputEl.value.trim();e&&(this._clearInput(),this._handleSendText(e))}_handleSendText(e){if(this._cb.isEditorTabActive()){this._cb.handleEditorInput(e);return}if(e.startsWith("/")){this._executeSlashCommand(e);return}this._runConversation(e)}async _executeSlashCommand(e){var r;const t=e.trim().split(/\s+/),n=t[0].slice(1).toLowerCase(),i=t.slice(1);switch(n){case"add":{const o=(r=i[0])==null?void 0:r.toLowerCase();if(!o){this._appendSystemMsg("Usage: /add <type>");return}const a=Ri.find(l=>l.id.toLowerCase()===o||l.label.toLowerCase()===o);if(!a){this._appendSystemMsg(`Unknown library type: ${o}`);return}if(!this._buildCtrl.isCatalogActive){this._appendSystemMsg("No robot loaded — use the Build tab first.");return}try{const{generate:l}=await a.factory(),c=l(),h=this._buildCtrl.addMeshComponent(a.id,c);this._cb.onComponentAdded(h,a.id),this._cb.syncSlidersFromController(),this._cb.refreshPaletteCounts(),this._cb.switchToBuildTab(),this._appendSystemMsg(`Added ${a.label} as ${h}`)}catch(l){this._appendSystemMsg(`Failed to add ${o}: ${l.message}`)}return}case"remove":{const o=i[0];if(!o){this._appendSystemMsg("Usage: /remove <id>");return}this._buildCtrl.removeComponent(o),this._cb.onComponentRemoved(o),this._cb.refreshPaletteCounts(),this._appendSystemMsg(`Removed ${o}`);return}case"move":{const o=i[0];if(!o){this._appendSystemMsg("Usage: /move <id> x=… y=… z=…");return}const a=this._parseKV(i.slice(1)),l={};a.x!==void 0&&(l.x=parseFloat(a.x)),a.y!==void 0&&(l.y=parseFloat(a.y)),a.z!==void 0&&(l.z=parseFloat(a.z)),this._buildCtrl.updateComponent(o,l),this._cb.syncSlidersFromController(),this._appendSystemMsg(`Moved ${o}`);return}case"chassis":{const o=this._parseKV(i),a={};o.thickness&&(a.thickness=parseFloat(o.thickness)/1e3),o.bodyHalfWidth&&(a.bodyHalfWidth=parseFloat(o.bodyHalfWidth)/1e3),o.rearHalfWidth&&(a.rearHalfWidth=parseFloat(o.rearHalfWidth)/1e3),this._buildCtrl.updateChassis(a),this._cb.syncSlidersFromController(),this._appendSystemMsg("Chassis updated");return}case"wheels":{const o=this._parseKV(i),a={};o.radius&&(a.radius=parseFloat(o.radius)/1e3),o.width&&(a.width=parseFloat(o.width)/1e3),this._buildCtrl.updateWheel(a),this._cb.syncSlidersFromController(),this._appendSystemMsg("Wheels updated");return}case"undo":this._buildCtrl.undo(),this._cb.syncSlidersFromController(),this._appendSystemMsg("Undone");return;case"redo":this._buildCtrl.redo(),this._cb.syncSlidersFromController(),this._appendSystemMsg("Redone");return;case"reset":this._buildCtrl.resetToDefaults(),this._cb.syncSlidersFromController(),this._appendSystemMsg("Reset to defaults");return;case"export":this._buildCtrl.exportZip(document.getElementById("build-export"));return;default:this._appendSystemMsg(`Unknown command: /${n}`)}}_parseKV(e){const t={};for(const n of e){const[i,r]=n.split("=");i&&r!==void 0&&(t[i]=r)}return t}_buildTools(){if(!this._buildCtrl.isCatalogActive)return[];const e=Object.keys(this._buildCtrl._catalog??{}),t=Ri.map(r=>r.id);[...new Set([...e,...t])];const n=[{name:"get_robot_state",description:"Returns current chassis dimensions, wheel params, and all added components.",input_schema:{type:"object",properties:{}}},{name:"add_component",description:"Add a component to the robot. Use library types for 3D mesh components.",input_schema:{type:"object",properties:{type:{type:"string",description:`Component type. Library types: ${t.join(", ")}`},parent:{type:"string",description:"Parent link name (default: base_link)"}},required:["type"]}},{name:"remove_component",description:"Remove a component by id.",input_schema:{type:"object",properties:{id:{type:"string",description:"Component id, e.g. hcsr04_1"}},required:["id"]}},{name:"duplicate_component",description:"Duplicate an existing component.",input_schema:{type:"object",properties:{id:{type:"string"}},required:["id"]}},{name:"update_component",description:"Update position, rotation, size, or joint of a component. Positions in metres, angles in radians.",input_schema:{type:"object",properties:{id:{type:"string",description:"Component id"},x:{type:"number",description:"URDF X position (m). −X = front"},y:{type:"number",description:"URDF Y position (m). +Y = right"},z:{type:"number",description:"URDF Z position (m). +Z = up"},rx:{type:"number",description:"Roll (rad)"},ry:{type:"number",description:"Pitch (rad)"},rz:{type:"number",description:"Yaw (rad)"},jointType:{type:"string",enum:["fixed","continuous","revolute","prismatic"]},parent:{type:"string"}},required:["id"]}},{name:"undo",description:"Undo the last build action.",input_schema:{type:"object",properties:{}}},{name:"redo",description:"Redo the last undone build action.",input_schema:{type:"object",properties:{}}},{name:"update_chassis",description:"Update chassis dimensions. All values in metres.",input_schema:{type:"object",properties:{thickness:{type:"number",description:"Plate thickness (m)"},bodyHalfWidth:{type:"number",description:"Half-width of the main body (m)"},rearHalfWidth:{type:"number",description:"Half-width of the rear section (m)"}}}},{name:"update_wheels",description:"Update drive-wheel dimensions. All values in metres.",input_schema:{type:"object",properties:{radius:{type:"number",description:"Wheel radius (m)"},width:{type:"number",description:"Wheel width (m)"}}}},{name:"update_caster",description:"Update caster wheel dimensions. All values in metres.",input_schema:{type:"object",properties:{radius:{type:"number",description:"Caster sphere radius (m)"},width:{type:"number",description:"Caster width (m)"}}}},{name:"update_battery_box",description:"Update battery box dimensions (length, width, height in metres).",input_schema:{type:"object",properties:{l:{type:"number",description:"Length (m)"},w:{type:"number",description:"Width (m)"},h:{type:"number",description:"Height (m)"}}}},{name:"update_powerbank",description:"Update powerbank cylinder dimensions (radius and length in metres).",input_schema:{type:"object",properties:{radius:{type:"number",description:"Cylinder radius (m)"},length:{type:"number",description:"Cylinder length (m)"}}}},{name:"open_panel",description:"Open a floating control panel over the 3D viewer so the user can fine-tune a specific section while watching the robot update live. Use this before calling pause to give the user something to interact with.",input_schema:{type:"object",properties:{section:{type:"string",enum:["chassis","wheels","caster","battery","powerbank"],description:"Which parametric section to open."}},required:["section"]}}];this._cb.isGestureActive()&&n.push({name:"show_gesture_hint",description:"Open a floating gesture reference card over the 3D viewer. Use this instead of writing a gesture list in chat. Call it once early in the conversation so the user has a persistent reference.",input_schema:{type:"object",properties:{}}});const i=this._cb.getPartsList();return i.length>0&&n.push({name:"read_part",description:"Read the XML of a URDF part file. Use before editing to see current content.",input_schema:{type:"object",properties:{filename:{type:"string",description:`Part filename. Available: ${i.join(", ")}`}},required:["filename"]}},{name:"update_part",description:'Write a URDF part file (link + joint elements only, no <robot> wrapper). Use to change colors (<material><color rgba="r g b a"/>), geometry, or add new links.',input_schema:{type:"object",properties:{filename:{type:"string",description:"Part filename to write"},xml:{type:"string",description:"Complete content of this part file"}},required:["filename","xml"]}}),this._guide&&n.push({name:"init_robot",description:"Load a robot to work with. Call this before starting the guided tour/build when the workspace is empty.",input_schema:{type:"object",properties:{type:{type:"string",enum:["robot-car","custom"],description:'"robot-car" loads the Robot Car; "custom" starts a blank chassis'},name:{type:"string",description:'Name for a custom robot (only used when type is "custom")'}},required:["type"]}},{name:"highlight_part",description:"Select and highlight a robot part in the 3D viewer.",input_schema:{type:"object",properties:{joint:{type:"string",description:'Joint name (e.g. "wheel_left_joint"), or empty string to clear.'}},required:["joint"]}},{name:"pause",description:"Call at the END of each step (after your text explanation and highlight_part) to wait for the user to click Continue. Never call this before writing your step explanation.",input_schema:{type:"object",properties:{message:{type:"string",description:"Optional context for the user."}}}},{name:"propose_adjustment",description:"Show an actionable suggestion card in the chat with an Open Panel button. Use after observing state_mm when a dimension is noteworthy — physically implausible, mechanically interesting, or very different from the real part. Do not call if the values are fine.",input_schema:{type:"object",properties:{section:{type:"string",enum:["chassis","wheels","caster","battery","powerbank"],description:"Which section to offer to open."},message:{type:"string",description:"Brief educational observation (1–2 sentences). No preamble."}},required:["section","message"]}}),n}async _executeTool(e,t){switch(e){case"get_robot_state":{const n=this._buildCtrl.chassisParams,i=this._buildCtrl.wheelParams,r=this._buildCtrl.getComponentEntries().map(({id:o,type:a})=>({id:o,type:a,...this._buildCtrl.getComponentData(o)}));return{chassis:n,wheels:i,casterRadius:this._buildCtrl.casterRadius,casterWidth:this._buildCtrl.casterWidth,batteryBox:this._buildCtrl.batteryBox,powerbank:this._buildCtrl.powerbank,components:r}}case"add_component":{const n=t.type;if(!this._buildCtrl.isCatalogActive)return{error:"No robot loaded"};const i=Ri.find(a=>a.id===n);if(i){const{generate:a}=await i.factory(),l=this._buildCtrl.addMeshComponent(i.id,a());this._cb.onComponentAdded(l,i.id),this._cb.syncSlidersFromController(),this._cb.refreshPaletteCounts();const c=this._buildCtrl.getComponentEntries().length;return{ok:!0,id:l,total_components:c}}const r=this._buildCtrl.addComponent(n);if(!r)return{error:`Unknown component type: ${n}`};this._cb.onComponentAdded(r,n),this._cb.syncSlidersFromController(),this._cb.refreshPaletteCounts();const o=this._buildCtrl.getComponentEntries().length;return{ok:!0,id:r,total_components:o}}case"remove_component":{const n=t.id;return this._buildCtrl.removeComponent(n),this._cb.onComponentRemoved(n),this._cb.refreshPaletteCounts(),{ok:!0}}case"duplicate_component":{const n=t.id,i=this._buildCtrl.duplicateComponent(n);if(!i)return{error:"Could not duplicate"};const r=this._buildCtrl.getComponentData(i);return this._cb.onComponentAdded(i,(r==null?void 0:r.type)??""),this._cb.refreshPaletteCounts(),{ok:!0,id:i}}case"update_component":{const{id:n,...i}=t;return this._buildCtrl.updateComponent(n,i),this._cb.syncSlidersFromController(),{ok:!0}}case"undo":return this._buildCtrl.undo(),this._cb.syncSlidersFromController(),{ok:!0};case"redo":return this._buildCtrl.redo(),this._cb.syncSlidersFromController(),{ok:!0};case"update_chassis":{const n={...this._buildCtrl.chassisParams,...t};return this._buildCtrl.updateChassis(n),this._cb.syncSlidersFromController(),{ok:!0,chassis_m:this._buildCtrl.chassisParams}}case"update_wheels":{const n={...this._buildCtrl.wheelParams,...t};return this._buildCtrl.updateWheel(n),this._cb.syncSlidersFromController(),{ok:!0,wheels_m:this._buildCtrl.wheelParams}}case"update_caster":{const{radius:n,width:i}=t,r={radius:this._buildCtrl.casterRadius,width:this._buildCtrl.casterWidth};this._buildCtrl.updateCaster(n??r.radius,i??r.width),this._cb.syncSlidersFromController();const o=this._buildCtrl.getJointXYZ("caster_wheel_joint");return{ok:!0,...o?{joint_xyz_m:o,where:o.z<0?"under chassis":"above chassis"}:{}}}case"update_battery_box":{const{l:n,w:i,h:r}=t,o=this._buildCtrl.batteryBox;this._buildCtrl.updateBatteryBox(n??o.l,i??o.w,r??o.h),this._cb.syncSlidersFromController();const a=this._buildCtrl.getJointXYZ("battery_box_joint");return{ok:!0,...a?{joint_xyz_m:a,where:a.z<0?"under chassis":"above chassis"}:{}}}case"update_powerbank":{const{radius:n,length:i}=t,r=this._buildCtrl.powerbank;this._buildCtrl.updatePowerbank(n??r.radius,i??r.length),this._cb.syncSlidersFromController();const o=this._buildCtrl.getJointXYZ("powerbank_joint");return{ok:!0,...o?{joint_xyz_m:o,where:o.z<0?"under chassis":"above chassis"}:{}}}case"open_panel":return this._cb.openPanel(t.section),{ok:!0};case"show_gesture_hint":return this._cb.openGestureHint(),{ok:!0};case"propose_adjustment":return this._appendActionCard(t.section,t.message),{ok:!0};case"read_part":{const n=t.filename,i=await this._cb.readPart(n);return i===null?{error:`could not read ${n}`}:{ok:!0,xml:i}}case"update_part":{const{filename:n,xml:i}=t;return await this._cb.updatePart(n,i)?{ok:!0}:{error:"invalid filename or no source URL"}}case"init_robot":{const n=t.type,i=t.name;return this._cb.initRobot(n,i),{ok:!0,note:n==="robot-car"?"Robot Car is loading — call pause next to let it finish.":"Custom robot initialized."}}case"highlight_part":{const n=t.joint||null,i=this._cb.getJointNames(),r=n&&!i.includes(n)&&i.includes(n+"_joint")?n+"_joint":n;return this._cb.highlightPart(r),{ok:!0}}case"pause":{const n=document.createElement("button");n.type="button",n.className="chat-continue-bubble",n.textContent="Continue →",this._appendChat(n),this._inputEl.disabled=!0,this._sendBtn.hidden=!0,await new Promise((l,c)=>{this._pauseResolve=h=>{n.remove(),h?c(Object.assign(new Error("AbortError"),{name:"AbortError"})):l()},n.addEventListener("click",()=>{var h;return(h=this._pauseResolve)==null?void 0:h.call(this,!1)})}),this._hideContinueButton();const i=this._buildCtrl.chassisParams,r=this._buildCtrl.wheelParams,o=this._buildCtrl.batteryBox,a=this._buildCtrl.powerbank;return{ok:!0,state_mm:{chassis:{thickness:+(i.thickness*1e3).toFixed(2),bodyHalfWidth:+(i.bodyHalfWidth*1e3).toFixed(2),rearHalfWidth:+(i.rearHalfWidth*1e3).toFixed(2)},wheels:{radius:+(r.radius*1e3).toFixed(2),width:+(r.width*1e3).toFixed(2)},caster:{radius:+(this._buildCtrl.casterRadius*1e3).toFixed(2),width:+(this._buildCtrl.casterWidth*1e3).toFixed(2)},battery:{l:+(o.l*1e3).toFixed(2),w:+(o.w*1e3).toFixed(2),h:+(o.h*1e3).toFixed(2)},powerbank:{radius:+(a.radius*1e3).toFixed(2),length:+(a.length*1e3).toFixed(2)}}}}default:return{error:`Unknown tool: ${e}`}}}_buildSystem(){const e=this._buildCtrl.getComponentEntries(),t=e.length?e.map(p=>{const m=this._buildCtrl.getComponentData(p.id);return`  - ${p.id} (${p.type}) @ x=${(m==null?void 0:m.x)??0} y=${(m==null?void 0:m.y)??0} z=${(m==null?void 0:m.z)??0}`}).join(`
`):"  (none)",n=this._buildCtrl.chassisParams,i=this._buildCtrl.wheelParams,r=this._cb.getFocusedComponent(),o=r!=null&&r.data?`
FOCUSED: ${r.id} (${r.type}) @ x=${r.data.x} y=${r.data.y} z=${r.data.z} — joint: ${r.data.jointType}
When the user says "this", "it", or "the selected one", refer to this component.`:"",a=this._cb.getPartsList(),l=a.length>0?`
Part files (use read_part + update_part to change colors, materials, or geometry): ${a.join(", ")}`:"",c=this._brief&&!this._guide?`
BRIEF MODE: Answer in fewer than 4 lines. No preamble. Direct answers only. Emoji allowed as semantic shorthand when it replaces a word more efficiently than text.`:"",h=this._buildCtrl.isCatalogActive,u=this._cb.getJointNames(),f=!h&&a.length===0?`The workspace is empty. Ask the user what they want to build, then call init_robot with their choice:
• "robot-car" — Robot Car (TT motors, L298N controller, ESP32-CAM, 4-wheel chassis).
• "custom" — blank chassis to build anything.`:e.length>0?`Assembly in progress — library components already added: ${e.map(p=>p.type).join(", ")}. Continue from the next unfinished step. Do NOT re-add components that are already listed above.`:"The viewer is blank. Build the Robot Car from scratch, one step at a time. Each tool call adds that part to the 3D scene for the first time. Logical order: (1) update_chassis → chassis appears, (2) update_wheels → drive wheels appear, (3) update_caster → caster wheel appears, (4) update_battery_box → battery box appears, (5) update_powerbank → power bank appears, (6) add_component('tt_motor') ×2, (7) add_component('l298n'), (8) add_component('hcsr04'), (9) add_component('esp32_cam'). Do NOT add arduino_nano, mpu6050, or sg90.",g=this._guide?`GUIDE MODE: You are an interactive assembly guide. Rules:
• NO welcome message, intro, step overview list, or preamble. Start immediately with Step 1 content.
• Do NOT write out the gesture reference — it is already shown in the sidebar.
• Write your explanation text FIRST, then call tools. Never call pause as your opening action.
• One step per message. Call pause at the END of each step, after your text and any other tools.
• Call highlight_part (before pause) to show the relevant part in the 3D viewer.
• Be educational — assume the user is learning.
• After pause resolves, the tool result includes state_mm with the current dimensions. If the user changed something noteworthy (physically implausible, mechanically interesting, or very different from the real part), make a brief educational observation before continuing. Otherwise say nothing about the values.
• SPATIAL GROUND TRUTH: placement tools (update_caster, update_battery_box, update_powerbank) return a \`where\` field ("under chassis" or "above chassis") derived from the actual joint Z coordinate. Always use this field when describing where a part sits — never infer position from prior knowledge. Coordinate convention: z < 0 = under chassis plate, z > 0 = above.
• ${f}
${u.length>0?`Current joints in viewer: ${u.join(", ")}`:""}

`:"",_=this._cb.isGestureActive()?`
GESTURE MODE ACTIVE: The user controls the viewer with hand gestures.
• NEVER write a gesture reference table or list in chat — call show_gesture_hint instead (opens a floating card in the viewer).
• At each pause, end with one line: "Show 👍 to continue."
• Reference other gestures inline only when contextually useful (e.g. "rotate with a fist to see the underside").
`:"";return`${g}${_}You are a robot builder assistant embedded in a live 3D URDF viewer.
The robot-car uses: −X = front, +X = rear, −Y = left, +Y = right, +Z = up.

Current chassis: thickness=${(n.thickness*1e3).toFixed(1)}mm  bodyHW=${(n.bodyHalfWidth*1e3).toFixed(1)}mm  rearHW=${(n.rearHalfWidth*1e3).toFixed(1)}mm
Current wheels: radius=${(i.radius*1e3).toFixed(1)}mm  width=${(i.width*1e3).toFixed(1)}mm
Current components:
${t}

Available library components: ${Ri.map(p=>p.id).join(", ")}${o}${l}

Use tools to modify the robot. Prefer direct tool calls over lengthy explanations.${c}`}_sanitizeHistory(){for(;this._history.length>0;){const e=this._history[this._history.length-1];if(e.role!=="assistant"||!e.content.some(t=>t.type==="tool_use"))return;this._history.pop()}}async _executeTools(e,t){const n=[];for(const i of e){const r=(t==null?void 0:t.get(i.id))??this._appendToolCard(i.name),o=await this._executeTool(i.name,i.input),a=!o.error;r.setResult(a,i.input,o),n.push({type:"tool_result",tool_use_id:i.id,content:JSON.stringify(o)})}this._history.push({role:"user",content:n})}async _runLoop(){for(;;){const e=this._appendSpinner(),t=await this._callAPI(),n=this._provider==="github"?await this._processStreamOpenAI(t,e):await this._processStream(t,e);if(this._history.push({role:"assistant",content:n.content}),!n.toolCalls.length)break;await this._executeTools(n.toolCalls,n.toolCards)}}async _withSession(e){if(!this._abortCtrl){this._abortCtrl=new AbortController,this._sendBtn.disabled=!0,this._abortBtn.hidden=!1;try{await e()}catch(t){const n=t;n.name!=="AbortError"&&(this._sanitizeHistory(),this._appendAssistantBubble(`⚠ ${n.message||"Request failed"}`))}finally{this._abortCtrl=null,this._sendBtn.disabled=!1,this._abortBtn.hidden=!0,this._hideContinueButton()}}}_saveHistory(){try{localStorage.setItem("urdf-chat-history",JSON.stringify(this._history))}catch{}}_restoreHistory(){const e=localStorage.getItem("urdf-chat-history");if(!e){this._updateEmptyState();return}try{this._history=JSON.parse(e)}catch{return}for(let t=0;t<this._history.length;t++){const n=this._history[t];if(n.role==="user")typeof n.content=="string"&&this._appendUserBubble(n.content);else for(const i of n.content)if(i.type==="text"&&i.text)this._appendAssistantBubble(i.text);else if(i.type==="tool_use"){const r=this._history[t+1];let o={ok:!0};if((r==null?void 0:r.role)==="user"&&Array.isArray(r.content)){const l=r.content.find(c=>c.tool_use_id===i.id);if(l)try{o=JSON.parse(l.content)}catch{o=l.content}}this._appendToolCard(i.name).setResult(!(o!=null&&o.error),i.input,o)}}this._updateEmptyState()}async _runConversation(e){this._sanitizeHistory(),this._appendUserBubble(e),this._history.push({role:"user",content:e}),this._saveHistory(),this._updateEmptyState(),await this._withSession(()=>this._runLoop()),this._saveHistory()}_applyModel(e){const t=e.indexOf(":");this._provider=e.slice(0,t),this._model=this._provider==="github"?e.slice(t+1):Nl,this._ghBarEl.hidden=this._provider!=="github",this._apikeyBarEl.hidden=this._provider!=="anthropic",localStorage.setItem("urdf-chat-model",e),this._updateGitHubBar(),this._updateApiKeyBar()}_updateApiKeyBar(){if(this._apikeyBarEl.innerHTML="",localStorage.getItem("urdf-api-key")){const t=document.createElement("span");t.className="chat-apikey-saved",t.textContent="API key saved";const n=document.createElement("button");n.type="button",n.className="chat-apikey-remove",n.textContent="Remove",n.addEventListener("click",()=>{localStorage.removeItem("urdf-api-key"),this._updateApiKeyBar()}),this._apikeyBarEl.append(t,n)}else{const t=document.createElement("input");t.type="password",t.placeholder="sk-ant-… Anthropic API key",t.setAttribute("aria-label","Anthropic API key");const n=document.createElement("button");n.type="button",n.className="chat-apikey-save",n.textContent="Save";const i=()=>{const r=t.value.trim();r&&(localStorage.setItem("urdf-api-key",r),this._updateApiKeyBar())};t.addEventListener("keydown",r=>{r.key==="Enter"&&i()}),n.addEventListener("click",i),this._apikeyBarEl.append(t,n)}}_updateGitHubBar(){if(this._ghBarEl.innerHTML="",this._githubAuth){const t=document.createElement("span");t.className="chat-github-user",t.textContent=`@${this._githubAuth.username}`;const n=document.createElement("button");n.type="button",n.className="chat-github-disconnect",n.textContent="Disconnect",n.addEventListener("click",()=>{this._githubAuth=null,localStorage.removeItem("urdf-gh-auth"),this._clearChat(),this._updateGitHubBar()}),this._ghBarEl.append(t,n)}else{const t=document.createElement("button");t.type="button",t.className="chat-github-connect",t.textContent="Connect GitHub",t.addEventListener("click",async()=>{t.textContent="Connecting…",t.disabled=!0;try{const n=await ME();this._githubAuth=await n("read:user","urdf-viewer"),localStorage.setItem("urdf-gh-auth",JSON.stringify(this._githubAuth)),this._updateGitHubBar()}catch(n){const i=n;i.message!=="OAuth flow cancelled"&&this._appendSystemMsg(`GitHub auth failed: ${i.message}`),t.textContent="Connect GitHub",t.disabled=!1}}),this._ghBarEl.appendChild(t)}const e=document.createElement("span");e.className="chat-github-note",e.textContent="Tool calls may be less reliable than Claude.",this._ghBarEl.appendChild(e)}async _callAPI(){return this._provider==="github"?this._callAPIGitHub():this._callAPIClaude()}async _callAPIClaude(){const e={model:Nl,max_tokens:4096,system:this._buildSystem(),messages:this._history,tools:this._buildTools(),stream:!0};try{const i=await fetch(EE,{method:"POST",signal:this._abortCtrl.signal,headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(i.ok)return i.body}catch{}const t=localStorage.getItem("urdf-api-key");if(!t)throw this._appendSystemMsg("Enter your Anthropic API key in the bar above."),new Error("no-api-key");const n=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",signal:this._abortCtrl.signal,headers:{"Content-Type":"application/json","x-api-key":t,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify(e)});if(!n.ok){const i=await n.text().catch(()=>n.statusText);throw new Error(`API ${n.status}: ${i.slice(0,200)}`)}return n.body}async _callAPIGitHub(){if(!this._githubAuth)throw this._appendSystemMsg("Connect your GitHub account above to use GitHub Models."),new Error("github-no-auth");const e=this._buildTools().map(n=>({type:"function",function:{name:n.name,description:n.description,parameters:n.input_schema}})),t=await fetch("https://models.github.ai/inference/chat/completions",{method:"POST",signal:this._abortCtrl.signal,headers:{"Content-Type":"application/json",authorization:`Bearer ${this._githubAuth.token}`},body:JSON.stringify({model:this._model,messages:[{role:"system",content:this._buildSystem()},...this._historyToOpenAI()],tools:e,tool_choice:"auto",max_completion_tokens:4096,stream:!0})});if(!t.ok){const n=await t.text().catch(()=>t.statusText);throw t.status===429?new Error("GitHub Models rate limit reached. Try again later."):new Error(`GitHub API ${t.status}: ${n.slice(0,200)}`)}return t.body}_historyToOpenAI(){const e=[];for(const t of this._history)if(t.role==="user")if(typeof t.content=="string")e.push({role:"user",content:t.content});else for(const n of t.content)e.push({role:"tool",tool_call_id:n.tool_use_id,content:n.content});else{const n=t.content,i=n.filter(a=>a.type==="text").map(a=>a.text).join(""),r=n.filter(a=>a.type==="tool_use").map(a=>{const l=a;return{id:l.id,type:"function",function:{name:l.name,arguments:JSON.stringify(l.input)}}}),o={role:"assistant",content:i||null};r.length&&(o.tool_calls=r),e.push(o)}return e}async*_parseDataSSE(e){const t=e.getReader(),n=new TextDecoder;let i="";for(;;){const{done:r,value:o}=await t.read();if(r)break;i+=n.decode(o,{stream:!0});const a=i.split(`
`);i=a.pop();for(const l of a){if(!l.startsWith("data: "))continue;const c=l.slice(6).trim();if(c==="[DONE]")return;try{yield JSON.parse(c)}catch{}}}}async _processStreamOpenAI(e,t){var d,f,g,_;const n=new Map,i=new Map;let r=null,o="",a=!1,l=!1;const c=()=>{l||(l=!0,t.remove())};for await(const p of this._parseDataSSE(e)){const m=(f=(d=p.choices)==null?void 0:d[0])==null?void 0:f.delta;if(m&&(m.content&&(c(),r||(r=this._appendAssistantBubble(""),o=""),o+=m.content,a||(a=!0,requestAnimationFrame(()=>{a=!1,r&&(r.innerHTML=qo(o),this._messagesEl.scrollTop=this._messagesEl.scrollHeight)}))),m.tool_calls)){c();for(const w of m.tool_calls){i.has(w.index)||i.set(w.index,{id:"",name:"",args:"",shown:!1});const v=i.get(w.index);w.id&&(v.id=w.id),(g=w.function)!=null&&g.name&&(v.name=w.function.name),(_=w.function)!=null&&_.arguments&&(v.args+=w.function.arguments),!v.shown&&v.id&&v.name&&(v.shown=!0,n.set(v.id,this._appendToolCard(v.name)))}}}r&&o&&(r.innerHTML=qo(o)),c();const h=[];o&&h.push({type:"text",text:o});const u=[];for(const[,p]of i){let m={};try{m=JSON.parse(p.args||"{}")}catch{}const w={type:"tool_use",id:p.id,name:p.name,input:m};h.push(w),u.push(w)}return{content:h,toolCalls:u,toolCards:n}}async*_parseSSE(e){const t=e.getReader(),n=new TextDecoder;let i="",r=null;for(;;){const{done:o,value:a}=await t.read();if(o)break;i+=n.decode(a,{stream:!0});const l=i.split(`
`);i=l.pop();for(const c of l)if(c.startsWith("event: "))r=c.slice(7).trim();else if(c.startsWith("data: ")&&r){const h=c.slice(6);if(h==="[DONE]")return;try{yield{event:r,data:JSON.parse(h)}}catch{}r=null}}}async _processStream(e,t){const n=[],i=[],r=new Map;let o=null,a="",l=null,c="",h=!1,u=!1;const d=()=>{u||(u=!0,t.remove())};for await(const{event:f,data:g}of this._parseSSE(e)){const _=g;if(f==="content_block_start"){d();const p=_.content_block;(p==null?void 0:p.type)==="text"?(o=this._appendAssistantBubble(""),a="",n.push({type:"text",text:""})):(p==null?void 0:p.type)==="tool_use"&&(l={id:p.id,name:p.name,idx:n.length},c="",n.push({type:"tool_use",id:p.id,name:p.name,input:{}}),r.set(p.id,this._appendToolCard(p.name)))}else if(f==="content_block_delta"){const p=_.delta;if((p==null?void 0:p.type)==="text_delta"){a+=p.text??"";const m=n[n.length-1];(m==null?void 0:m.type)==="text"&&(m.text=a),o&&!h&&(h=!0,requestAnimationFrame(()=>{h=!1,o&&(o.innerHTML=qo(a),this._messagesEl.scrollTop=this._messagesEl.scrollHeight)}))}else(p==null?void 0:p.type)==="input_json_delta"&&(c+=p.partial_json??"")}else if(f==="content_block_stop"&&l){let p={};try{p=JSON.parse(c)}catch{}n[l.idx].input=p,i.push({type:"tool_use",id:l.id,name:l.name,input:p}),l=null}}return d(),{content:n,toolCalls:i,toolCards:r}}_clearChat(){this._history=[],this._messagesEl.innerHTML="",localStorage.removeItem("urdf-chat-history"),this._updateEmptyState()}_appendChat(e){this._messagesEl.appendChild(e),this._messagesEl.scrollTop=this._messagesEl.scrollHeight}_appendUserBubble(e){const t=document.createElement("div");t.className="chat-msg-user",t.textContent=e,this._appendChat(t)}_appendAssistantBubble(e){const t=document.createElement("div");return t.className="chat-msg-assistant",t.innerHTML=qo(e),this._appendChat(t),t}_appendSystemMsg(e){const t=document.createElement("div");t.className="chat-msg-system",t.textContent=e,this._appendChat(t)}_appendSpinner(){const e=document.createElement("div");return e.className="chat-spinner",e.innerHTML="<span></span><span></span><span></span>",this._appendChat(e),e}_appendToolCard(e){const t=document.createElement("details");t.className="chat-tool-card";const n=document.createElement("summary"),i=document.createElement("span");i.className="chat-tool-card-status";const r=document.createElement("span");r.className="chat-tool-card-name",r.textContent=e;const o=document.createElement("span");return o.className="chat-tool-card-subtitle",n.append(i,r,o),t.appendChild(n),this._appendChat(t),{setResult(a,l,c){i.textContent=a?"✓":"✕",i.classList.add(a?"ok":"err"),l&&Object.keys(l).length&&(o.textContent=Object.entries(l).slice(0,3).map(([d,f])=>`${d}=${typeof f=="number"?+Number(f).toFixed(3):f}`).join(" "));const h=document.createElement("div");h.className="chat-tool-card-body";const u=[];l&&Object.keys(l).length&&u.push(`<span class="j-dir">in</span>  ${Cd(JSON.stringify(l))}`),u.push(`<span class="j-dir">out</span> ${Cd(JSON.stringify(c))}`),h.innerHTML=u.join(`
`),t.appendChild(h)}}}appendRecapCard(e,t){if(!t.length)return;const n=document.createElement("div");n.className="chat-recap-card";const i=document.createElement("div");i.className="chat-recap-card-title",i.textContent=`${e} adjusted`,n.appendChild(i);for(const r of t){const o=document.createElement("div");o.className="chat-recap-card-row";const a=document.createElement("span");a.textContent=r.label;const l=document.createElement("span");l.textContent=`${+r.from.toFixed(1)} → ${+r.to.toFixed(1)} ${r.unit}`,o.append(a,l),n.appendChild(o)}this._appendChat(n)}_appendActionCard(e,t){const n=document.createElement("div");n.className="chat-action-card";const i=document.createElement("div");i.className="chat-action-card-title",i.textContent=SE[e]??e;const r=document.createElement("div");r.className="chat-action-card-msg",r.textContent=t;const o=document.createElement("div");o.className="chat-action-card-footer";const a=document.createElement("button");a.type="button",a.className="chat-action-btn primary",a.textContent="Open Panel",a.addEventListener("click",()=>{this._cb.openPanel(e),n.remove()});const l=document.createElement("button");l.type="button",l.className="chat-action-btn",l.textContent="Dismiss",l.addEventListener("click",()=>n.remove()),o.append(a,l),n.append(i,r,o),this._appendChat(n)}}let ci=null;async function CE(){if(ci)return ci;const{default:s}=await Cn(async()=>{const{default:e}=await import("https://cdn.jsdelivr.net/npm/mujoco-js@0.0.7/dist/mujoco_wasm.js");return{default:e}},[]);return ci=await s(),ci.FS.mkdir("/working"),ci.FS.mount(ci.MEMFS,{root:"."},"/working"),ci}const RE=(()=>{const s=new ArrayBuffer(134),e=new DataView(s);return e.setUint32(80,1,!0),e.setFloat32(84,0,!0),e.setFloat32(88,0,!0),e.setFloat32(92,1,!0),e.setFloat32(108,1e-6,!0),e.setFloat32(120,1e-6,!0),new Uint8Array(s)})();function LE(s){const e=[...s.matchAll(/<link\s+name="([^"]+)"/g)].map(n=>n[1]),t=new Set([...s.matchAll(/<child\s+link="([^"]+)"/g)].map(n=>n[1]));return e.find(n=>!t.has(n))??"base_link"}class PE{constructor(){this._model=null,this._data=null,this._raf=0,this._floatBase=!1}_resolve(e,t,n){if(!e.startsWith("package://"))return e.startsWith("/")||e.startsWith("http")?e:n+e;const[i,r]=e.slice(10).split(/\/(.+)/);for(const o of t.split(";")){const[a,l]=o.split(":").map(c=>c.trim());if(a===i)return`${l}/${r}`}return null}_prepareUrdf(e,t,n){let i=e.replace(/<visual[\s\S]*?<\/visual>/g,"");for(const[o,a]of t)i=i.replaceAll(`"${o}"`,`"/working/${a}"`);i=i.replace(/<link(\s[^>]*)\/>/g,"<link$1></link>");const r=`
  <inertial>
    <mass value="0.001"/>
    <inertia ixx="1e-6" ixy="0" ixz="0" iyy="1e-6" iyz="0" izz="1e-6"/>
  </inertial>`;if(i=i.replace(/<link(\s[^>]*)>([\s\S]*?)<\/link>/g,(o,a,l)=>/<inertial\b/.test(l)||/<collision\b/.test(l)?o:`<link${a}>${l}${r}
</link>`),n)i=i.replace("</robot>",`
  <mujoco>
    <worldbody>
      <geom name="_floor" type="plane" pos="0 0 -0.5" size="0 0 1"
            condim="3" friction="1.0 0.005 0.0001"/>
    </worldbody>
  </mujoco>
</robot>`);else if(!/<link\s[^>]*name="world"/.test(i)){const o=LE(i);i=i.replace("</robot>",`
  <link name="world"/>
  <joint name="_world_fixed" type="fixed">
    <parent link="world"/>
    <child link="${o}"/>
    <origin xyz="0 0 0" rpy="0 0 0"/>
  </joint>
</robot>`)}return i}async _processAndLoad(e,t,n,i,r){var c,h,u,d;const o=new Map;let a=0;for(const f of t.matchAll(/<collision[\s\S]*?<\/collision>/g)){const g=(c=f[0].match(/filename="([^"]+)"/))==null?void 0:c[1];if(!g)continue;const _=((h=g.split(".").pop())==null?void 0:h.toLowerCase())??"";_!=="stl"&&_!=="obj"||o.has(g)||o.set(g,`col_${a++}.stl`)}for(const[f,g]of o){const _=this._resolve(f,i,n);let p=RE;if(_)try{const m=await fetch(_);m.ok?p=new Uint8Array(await m.arrayBuffer()):console.warn(`[simulator] mesh fetch ${m.status}: ${_}`)}catch(m){console.warn(`[simulator] mesh fetch failed: ${_}`,m)}else console.warn(`[simulator] unresolved mesh path: ${f}`);e.FS.writeFile(`/working/${g}`,p)}const l=this._prepareUrdf(t,o,r);e.FS.writeFile("/working/model.xml",l),(u=this._model)==null||u.delete(),(d=this._data)==null||d.delete();try{this._model=e.MjModel.loadFromXML("/working/model.xml")}catch(f){throw console.error(`[simulator] MuJoCo compile failed. Processed URDF:
`,l),f}this._data=new e.MjData(this._model)}async load(e,t,n=!1){const i=await fetch(e).then(o=>o.text()),r=e.replace(/[^/]+$/,"");return this.loadFromXML(i,r,t,n)}async loadFromXML(e,t,n,i=!1){this.stop(),this._floatBase=i;const r=await CE();await this._processAndLoad(r,e,t,n,i)}start(e,t){if(!this._model||!this._data||!ci)return;const n=ci,{_model:i,_data:r,_floatBase:o}=this,a=()=>{this._raf=requestAnimationFrame(a),n.mj_step(i,r),o&&r.xpos.length>5&&(e.position.set(r.xpos[3],r.xpos[4],r.xpos[5]),e.quaternion.set(r.xquat[5],r.xquat[6],r.xquat[7],r.xquat[4]));for(let l=0;l<i.njnt;l++){const c=i.jnt_type[l];if(c!==2&&c!==3)continue;const h=n.mj_id2name(i,n.mjtObj.mjOBJ_JOINT.value,l);h&&e.joints[h]&&e.setJointValue(h,r.qpos[i.jnt_qposadr[l]])}t()};a()}stop(){var e,t;cancelAnimationFrame(this._raf),this._raf=0,(e=this._model)==null||e.delete(),this._model=null,(t=this._data)==null||t.delete(),this._data=null}}function ve(s){return document.getElementById(s)}customElements.define("urdf-viewer",uE);const Ir=new PE;let Nc=null;const Ie=ve("viewer"),ls=ve("joints"),Bi=ve("robots"),Ic=ve("loading"),jr=ve("part-label"),Il=ve("gesture-toggle"),NE=ve("gesture-overlay"),IE=ve("gesture-video"),Xf=ve("gesture-section"),Xr=ve("gesture-section-header"),DE=ve("editor-panel"),UE=ve("build-notice"),xn=new nc(Ie,DE),ie=new Sa(Ie,UE);let cn;const zi=new ub(.5,25,5592405,3355443);zi.visible=!1;zi.raycast=()=>{};requestAnimationFrame(()=>Ie.scene.add(zi));const qf=ve("chat-input");ve("tab-robot").addEventListener("click",()=>{xn.close(),ie.close(),zi.visible=!1});ve("tab-editor").addEventListener("click",()=>{ie.close(),xn.open(),zi.visible=!1,qf.placeholder="Ask AI to edit this URDF…"});ve("tab-build").addEventListener("click",()=>{xn.close(),ie.open(),zi.visible=!0,zi.position.y=Ie.shadowPlane.position.y,qf.placeholder="Ask AI to add or modify components…",eh()});const Rd=ve("ignore-limits"),Ld=ve("show-collision"),ic=ve("display-shadow"),ca=ve("up-axis"),OE=ve("btn-kinematic"),Dl=ve("btn-dynamic"),Dr=ve("simulate-status"),$f=ve("sim-float-base"),ha=ve("physics-mode-options");function FE(s){return{id:s.id,name:s.name,label:s.label,up:s.up,...s.parts?{parts:`/robots/${s.parts}`}:{},...s.urdf?{urdf:`/robots/${s.urdf}`}:{},...s.package?{package:`${s.package}: /robots/${s.id}`}:{}}}function kE(s,e){const t=[...e.entries()].sort(([r],[o])=>r.localeCompare(o)),n=t.filter(([r])=>r.startsWith("00")).map(([,r])=>r.trimEnd()).join(`
`),i=t.filter(([r])=>!r.startsWith("00")).map(([,r])=>r.trimEnd()).join(`

`);return`<?xml version="1.0"?>
${n}
<robot name="${s}">

${i}

</robot>
`}let $o=null;async function BE(s){const e=s.parts,t=await fetch(`${e}.parts.json`).then(a=>a.json()),n=e.replace(/\/[^/]+$/,""),i=new Map(await Promise.all(t.parts.map(async a=>[a,await fetch(`${n}/parts/${a}`).then(l=>l.text())])));ie.init(t.robot,n,i);const r=kE(t.robot,i).replace(/filename="([^/"]+)"/g,`filename="${n}/$1"`);$o&&URL.revokeObjectURL($o),$o=URL.createObjectURL(new Blob([r],{type:"application/xml"})),Ie.urdf=$o,Nc={kind:"xml",xml:r,base:n+"/"},ve("physics-mode-bar").hidden=!1,to();const o=ie.restore();for(const{id:a,type:l}of o){const c=Un[l];if((c==null?void 0:c.geomType)==="mesh"){const h=Ri.find(u=>u.id===l);h&&h.factory().then(({generate:u})=>ie.restoreMeshBlob(a,u())).catch(u=>console.warn("[restore] mesh regen failed for",a,u))}ds(a,l)}o.length>0&&us(),On(),tr()}let di=[],Yf=0;const Bs=ve("robot-track-slider");function wa(s){const e=Bi.getBoundingClientRect(),t=s.getBoundingClientRect();Bs.style.width=`${t.width}px`,Bs.style.height=`${t.height}px`,Bs.style.left=`${t.left-e.left}px`,Bs.style.top=`${t.top-e.top}px`}function Ur(){const s=Bi.querySelector(".robot-btn.active");s&&wa(s)}function zE(){for(const s of Bi.querySelectorAll(".robot-btn"))s.classList.remove("active")}function qr(s,e){Yf=e,Ie.up=s.up,ca.value=s.up,Ie.package=s.package??"",Ir.stop(),document.body.classList.remove("simulating"),Ie.disableDragging=!1,Dr.textContent="",ha.hidden=!0,Nc=s.urdf?{kind:"url",urdfUrl:s.urdf,pkgStr:s.package??""}:null,$f.checked=!!s.parts,ve("physics-mode-bar").hidden=!s.urdf;const t=s.parts?`${s.parts}.urdf`:s.urdf;s.parts?BE(s).catch(()=>{}):Ie.urdf=s.urdf,zE();const n=s.name?Bi.querySelector(`.robot-btn[data-name="${s.name}"]`):null;n&&(n.classList.add("active"),wa(n)),xn.setSourceUrl(t),xn.loadPartsInBackground()}let yn=null,Er=null;function HE(s){Bi.querySelectorAll(".robot-btn").forEach(e=>e.remove());for(let e=0;e<s.length;e++){const t=s[e],n=document.createElement("button");n.type="button",n.className="robot-btn",n.textContent=t.label,n.title=t.name,n.dataset.name=t.name,n.dataset.index=String(e),n.addEventListener("click",()=>qr(t,e)),n.addEventListener("mouseenter",()=>{wa(n),yn&&clearTimeout(yn),yn=setTimeout(()=>qr(t,e),150)}),Bi.appendChild(n)}}Bi.closest(".robot-shell").addEventListener("mouseleave",()=>{yn&&(clearTimeout(yn),yn=null),Ur()});new ResizeObserver(Ur).observe(Bi);Bs.style.transition="none";fetch("/robots/catalog.json").then(s=>s.ok?s.json():Promise.reject()).then(s=>{di=s.robots.map(FE)}).catch(()=>{di=[{id:"robot-car",name:"Robot Car",label:"Car",parts:"/robots/robot-car/robot-car",up:"+Z"},{id:"T12",name:"T12",label:"T12",urdf:"/robots/T12/urdf/T12.URDF",up:"-Z"},{id:"TriATHLETE",name:"TriATHLETE",label:"Tri",urdf:"/robots/TriATHLETE/urdf/TriATHLETE.URDF",up:"-Z"},{id:"laikago",name:"Laikago",label:"Laikago",urdf:"/robots/laikago/urdf/laikago.urdf",up:"+Z"},{id:"open_manipulator_x",name:"Open Manipulator X",label:"OM-X",urdf:"/robots/open_manipulator_x/open_manipulator_x.urdf",package:"open_manipulator_description: /robots/open_manipulator_x",up:"+Z"},{id:"so_arm100",name:"SO-ARM100",label:"SO-100",urdf:"/robots/so_arm100/so100.urdf",up:"+Z"},{id:"simple_humanoid",name:"Simple Humanoid",label:"Humanoid",urdf:"/robots/simple_humanoid/simple_humanoid.urdf",up:"+Z"},{id:"spryped",name:"Spryped",label:"Spryped",urdf:"/robots/spryped/urdf/spryped.urdf",package:"spryped_urdf_rev06: /robots/spryped",up:"+Z"}]}).finally(()=>{HE(di);const s=new URLSearchParams(location.search).get("robot"),e=s?Math.max(0,di.findIndex(t=>t.id===s)):0;qr(di[e],e),requestAnimationFrame(()=>requestAnimationFrame(()=>{Bs.style.transition=""}))});document.addEventListener("keydown",s=>{if(s.key!=="ArrowLeft"&&s.key!=="ArrowRight")return;const e=document.activeElement;if(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)return;const t=s.key==="ArrowRight"?1:-1,n=(Yf+t+di.length)%di.length;qr(di[n],n)});Rd.addEventListener("change",()=>{Ie.ignoreLimits=Rd.checked});Ld.addEventListener("change",()=>{Ie.showCollision=Ld.checked});ic.addEventListener("change",()=>{Ie.displayShadow=ic.checked});ca.addEventListener("change",()=>{Ie.up=ca.value});function VE(){Ir.stop(),document.body.classList.remove("simulating"),Ie.disableDragging=!1,Dr.textContent="",ha.hidden=!0}OE.addEventListener("click",VE);Dl.addEventListener("click",async()=>{if(!document.body.classList.contains("simulating")){Dl.disabled=!0,ha.hidden=!1,Dr.textContent="Loading physics…";try{const s=Nc,e=$f.checked;s.kind==="xml"?await Ir.loadFromXML(s.xml,s.base,"",e):await Ir.load(s.urdfUrl,s.pkgStr,e),Ir.start(Ie.robot,()=>Ie.redraw()),Ie.disableDragging=!0,document.body.classList.add("simulating"),Dr.textContent=""}catch(s){Dr.textContent="Failed",console.error("[simulator]",s),ha.hidden=!0}finally{Dl.disabled=!1}}});ic.checked=Ie.displayShadow;ca.value=Ie.up;function sc(s){return s.replace(/_joint$/,"").replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}function Kf(s){return s.replace(/_joint$/,"")}const Pd=ve("inspector"),GE=ve("inspector-name"),Dc=ve("inspector-x"),Uc=ve("inspector-y"),Oc=ve("inspector-z"),Ta=ve("inspector-scale-x"),Aa=ve("inspector-scale-y"),Ca=ve("inspector-scale-z"),Jf=ve("inspector-snippet"),Ul=ve("inspector-copy"),WE=ve("inspector-close");let rs=null,Or=null,sn=null;function ui(s){return s.toFixed(4)}function Zf(){if(!rs||!Ie.robot)return;const s=Ie.robot.joints[rs];if(!s)return;const e=s.position,t=s.rotation,n=parseFloat(Ta.value),i=parseFloat(Aa.value),r=parseFloat(Ca.value),o=Math.abs(n-1)>.005||Math.abs(i-1)>.005||Math.abs(r-1)>.005,a=Math.abs(n-i)<.001&&Math.abs(i-r)<.001;let l="";o&&a?l=`
scale: ${n.toFixed(2)}×`:o&&(l=`
scale: ${n.toFixed(2)} ${i.toFixed(2)} ${r.toFixed(2)}`),Jf.textContent=`[${rs}]
<origin xyz="${ui(e.x)} ${ui(e.y)} ${ui(e.z)}"
        rpy="${ui(t.x)} ${ui(t.y)} ${ui(t.z)}"/>${l}`}let Nd=0;function jE(){if(!rs||!Ie.robot)return;const s=Ie.robot.joints[rs];if(!s)return;s.position.set(parseFloat(Dc.value)||0,parseFloat(Uc.value)||0,parseFloat(Oc.value)||0);const e=parseFloat(Ta.value)||1,t=parseFloat(Aa.value)||1,n=parseFloat(Ca.value)||1,i=Ie.robot.links[Kf(rs)];i&&i.scale.set(e,t,n),Ie.redraw(),clearTimeout(Nd),Nd=window.setTimeout(Zf,150)}function Qr(s){var i;rs=s;const e=s?(i=Ie.robot)==null?void 0:i.joints[s]:null;if(!e){Pd.style.display="none",Ii&&(Ii=null,ua(null));return}Pd.style.display="",GE.textContent=sc(s);const t=e.position;Dc.value=ui(t.x),Uc.value=ui(t.y),Oc.value=ui(t.z);const n=Ie.robot.links[Kf(s)];if(Ta.value=String(n?n.scale.x:1),Aa.value=String(n?n.scale.y:1),Ca.value=String(n?n.scale.z:1),Zf(),sn==null||sn.setSelectedJoint(s),document.querySelectorAll(".fp-gesture-active").forEach(r=>r.classList.remove("fp-gesture-active")),document.body.classList.contains("build-open")){const r=s.endsWith("_joint")?s.slice(0,-6):s;if(!ie.componentIds.has(r)){kt=null,Ii=s;for(const o of Qn.querySelectorAll(".build-component"))o.classList.remove("selected");Kc.hidden=!0,ua({label:sc(s),color:"var(--text-3)",onDismiss:()=>Qr(null)})}}}function Qf(s,e){let t=0,n=0,i=!1;const r=parseFloat(e.step)||.001;s.addEventListener("pointerdown",o=>{t=o.clientX,n=parseFloat(e.value)||0,i=!1,s.setPointerCapture(o.pointerId)}),s.addEventListener("pointermove",o=>{if(!s.hasPointerCapture(o.pointerId))return;const a=o.clientX-t;!i&&Math.abs(a)<3||(i=!0,e.value=String(parseFloat((n+a*r).toFixed(6))),e.dispatchEvent(new Event("input",{bubbles:!0})))}),s.addEventListener("pointerup",()=>{i||e.focus(),i=!1})}var Wd;for(const s of[Dc,Uc,Oc,Ta,Aa,Ca]){s.addEventListener("input",jE);const e=(Wd=s.closest(".inspector-row"))==null?void 0:Wd.querySelector("label");e&&Qf(e,s)}WE.addEventListener("click",()=>Qr(null));Ul.addEventListener("click",()=>{navigator.clipboard.writeText(Jf.textContent??""),Ul.textContent="Copied!",setTimeout(()=>{Ul.textContent="Copy"},1500)});Ie.addEventListener("click",()=>{Or&&(Qr(Or),xn.isOpen&&xn.jumpToJoint(Or))});const Fc=ve("urdf-error-banner"),XE=ve("urdf-error-text"),qE=ve("urdf-error-close");Ie.addEventListener("urdf-change",()=>{Ic.classList.add("visible"),ls.innerHTML="",Qr(null),Fc.classList.remove("visible")});Ie.addEventListener("urdf-error",s=>{Ic.classList.remove("visible"),XE.textContent=s.detail||"URDF load error",Fc.classList.add("visible")});qE.addEventListener("click",()=>{Fc.classList.remove("visible")});Ie.addEventListener("urdf-processed",()=>{Ic.classList.remove("visible"),document.querySelectorAll('input[data-preview="true"]').forEach(s=>{s.value="0"}),requestAnimationFrame(()=>{zi.position.y=Ie.shadowPlane.position.y})});const Id=Math.PI/180;let Mr=null;function $E(){Mr==null||Mr.abort(),Mr=new AbortController;const{signal:s}=Mr;if(ls.innerHTML="",!Ie.robot)return;const e=Object.values(Ie.robot.joints).filter(t=>t.jointType!=="fixed"&&t.visible).sort((t,n)=>t.name.localeCompare(n.name));for(const t of e){const n=document.createElement("div");n.className="joint",n.dataset.joint=t.name;const i=document.createElement("div");i.className="joint-name",i.title=t.name,i.textContent=t.name;const r=document.createElement("div");r.className="joint-row";const o=document.createElement("input");o.type="range",o.step="0.001";const a=document.createElement("input");a.type="number",a.step="0.001";const l=document.createElement("div");l.className="joint-ticks";const c=document.createElement("span"),h=document.createElement("span");l.append(c,h);const u=t.jointType==="prismatic",d=u?1:1/Id;n.update=()=>{const f=t.jointType==="continuous",g=Ie.ignoreLimits||f?-6.28:t.limit.lower,_=Ie.ignoreLimits||f?6.28:t.limit.upper;o.min=String(g),o.max=String(_),o.value=String(t.angle),a.min=String(+(g*d).toFixed(3)),a.max=String(+(_*d).toFixed(3)),a.value=String(+(t.angle*d).toPrecision(4));const p=+(g*d).toFixed(1),m=+(_*d).toFixed(1);c.textContent=u?`${p} m`:`${p}°`,h.textContent=u?`${m} m`:`${m}°`},o.addEventListener("input",()=>{Ie.setJointValue(t.name,parseFloat(o.value))},{signal:s}),a.addEventListener("change",()=>{const f=u?1:Id;Ie.setJointValue(t.name,parseFloat(a.value)*f)},{signal:s}),r.append(o,a),n.append(i,r,l),ls.appendChild(n),n.update()}}Ie.addEventListener("urdf-processed",$E);Ie.addEventListener("ignore-limits-change",()=>{var s;for(const e of ls.querySelectorAll(".joint"))(s=e.update)==null||s.call(e)});Ie.addEventListener("angle-change",s=>{var t,n;const e=s.detail;(n=(t=ls.querySelector(`[data-joint="${e}"]`))==null?void 0:t.update)==null||n.call(t)});let Dd=0;Ie.addEventListener("pointermove",s=>{cancelAnimationFrame(Dd),Dd=requestAnimationFrame(()=>{jr.style.left=s.clientX+14+"px",jr.style.top=s.clientY-32+"px"})});Ie.addEventListener("joint-mouseover",s=>{var t;const e=s.detail;Or=e,(t=ls.querySelector(`[data-joint="${e}"]`))==null||t.setAttribute("data-hovered",""),jr.textContent=sc(e),jr.style.display="block"});Ie.addEventListener("joint-mouseout",s=>{var t;const e=s.detail;Or=null,(t=ls.querySelector(`[data-joint="${e}"]`))==null||t.removeAttribute("data-hovered"),jr.style.display="none"});function YE(s,e){var r,o;const t=(r=document.elementFromPoint(s,e))==null?void 0:r.closest(".robot-btn");if(t){t.click();return}const n=(o=document.elementFromPoint(s,e))==null?void 0:o.closest("[data-fp-row-index]");if(n&&sn&&qs){const a=Jc[qs],l=parseInt(n.dataset.fpRowIndex,10),c=a==null?void 0:a.rows[l];if(c){document.querySelectorAll(".fp-gesture-active").forEach(h=>h.classList.remove("fp-gesture-active")),n.classList.add("fp-gesture-active"),sn.setParamCallback(h=>{const u=Math.max(c.min,Math.min(c.max,c.get()+h*15));c.set(u),us()});return}}const i={clientX:s,clientY:e,bubbles:!0,pointerId:1};Ie.dispatchEvent(new PointerEvent("pointerdown",i)),Ie.dispatchEvent(new PointerEvent("pointerup",i))}Il.addEventListener("click",async()=>{if(sn){sn.stop();return}const{GestureController:s}=await Cn(async()=>{const{GestureController:e}=await import("./gesture-Cq0FXqU0.js");return{GestureController:e}},[]);sn=new s({viewer:Ie,overlayCanvas:NE,videoEl:IE,onDwellSelect:YE,onPointerMove(e,t){var i;const n=(i=document.elementFromPoint(e,t))==null?void 0:i.closest(".robot-btn");if(n){if(wa(n),n!==Er){Er=n,yn&&clearTimeout(yn);const r=parseInt(n.dataset.index,10);yn=setTimeout(()=>qr(di[r],r),150)}}else Er&&(Er=null,yn&&(clearTimeout(yn),yn=null)),Ur()},onPointerLeave(){Er=null,Ur()},onThumbsUp(){cn==null||cn.resumeFromGesture()},onStop(){sn=null,Il.classList.remove("active"),Ur()}}),sn.start().then(()=>{Il.classList.add("active"),Xf.classList.add("open"),Xr.setAttribute("aria-expanded","true")}).catch(()=>{sn=null})});Xr.addEventListener("click",()=>{const s=Xf.classList.toggle("open");Xr.setAttribute("aria-expanded",String(s))});Xr.addEventListener("keydown",s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),Xr.click())});function KE(s,e,t){s.addEventListener("input",()=>{e.value=s.value,t()}),e.addEventListener("change",()=>{const n=Math.max(parseFloat(e.min),Math.min(parseFloat(e.max),parseFloat(e.value)));s.value=String(n),e.value=String(n),t()})}const kc=ve("build-chassis-thickness"),Bc=ve("build-chassis-body-hw"),zc=ve("build-chassis-rear-hw"),Hc=ve("build-wheel-radius"),Vc=ve("build-wheel-width"),Gc=ve("build-caster-radius"),Wc=ve("build-caster-width"),jc=ve("build-battery-l"),Xc=ve("build-battery-w"),qc=ve("build-battery-h"),$c=ve("build-powerbank-r"),Yc=ve("build-powerbank-l");function Ol(){ie.isSupported&&ie.updateChassis({thickness:parseFloat(kc.value)/1e3,bodyHalfWidth:parseFloat(Bc.value)/1e3,rearHalfWidth:parseFloat(zc.value)/1e3})}function Ud(){ie.isSupported&&ie.updateWheel({radius:parseFloat(Hc.value)/1e3,width:parseFloat(Vc.value)/1e3})}function Od(){ie.isSupported&&ie.updateCaster(parseFloat(Gc.value)/1e3,parseFloat(Wc.value)/1e3)}function Fl(){ie.isSupported&&ie.updateBatteryBox(parseFloat(jc.value)/1e3,parseFloat(Xc.value)/1e3,parseFloat(qc.value)/1e3)}function Fd(){ie.isSupported&&ie.updatePowerbank(parseFloat($c.value)/1e3,parseFloat(Yc.value)/1e3)}const JE=[[kc,"build-chassis-thickness-num",ns.thickness*1e3,Ol],[Bc,"build-chassis-body-hw-num",ns.bodyHalfWidth*1e3,Ol],[zc,"build-chassis-rear-hw-num",ns.rearHalfWidth*1e3,Ol],[Hc,"build-wheel-radius-num",Ti.radius*1e3,Ud],[Vc,"build-wheel-width-num",Ti.width*1e3,Ud],[Gc,"build-caster-radius-num",0,Od],[Wc,"build-caster-width-num",0,Od],[jc,"build-battery-l-num",0,Fl],[Xc,"build-battery-w-num",0,Fl],[qc,"build-battery-h-num",0,Fl],[$c,"build-powerbank-r-num",0,Fd],[Yc,"build-powerbank-l-num",0,Fd]];for(const[s,e,t,n]of JE){t>0&&(s.value=String(t));const i=ve(e);i.value=s.value,KE(s,i,n)}const kd=ve("build-export"),Yo=ve("build-copy-urdf"),ep=ve("build-undo"),tp=ve("build-redo"),ZE=ve("build-reset"),QE=ve("build-palette"),Qn=ve("build-components-list"),eM=ve("build-new-name"),tM=ve("build-new-create"),np=ve("build-saved-toggle"),is=ve("build-saved-list"),ip=ve("build-active-header"),nM=ve("build-active-name"),sp=ve("build-clear-custom"),iM=ve("build-shortcuts-toggle"),Bd=ve("build-shortcuts"),rp=ve("lib-search"),zd=ve("lib-pills"),Hd=ve("lib-grid"),sM=ve("lib-empty"),rM=ve("build-comp-count"),oM=ve("build-comp-empty"),kl=document.getElementById("chat-context-bar"),Kc=document.getElementById("build-inspector"),aM=document.getElementById("build-inspector-title"),Us=document.getElementById("build-inspector-body"),lM=document.getElementById("build-inspector-close");function us(){const s=ie.chassisParams,e=ie.wheelParams,t=ie.powerbank,n=ie.batteryBox,i=[[kc,"build-chassis-thickness-num",s.thickness*1e3],[Bc,"build-chassis-body-hw-num",s.bodyHalfWidth*1e3],[zc,"build-chassis-rear-hw-num",s.rearHalfWidth*1e3],[Hc,"build-wheel-radius-num",e.radius*1e3],[Vc,"build-wheel-width-num",e.width*1e3],[Gc,"build-caster-radius-num",ie.casterRadius*1e3],[Wc,"build-caster-width-num",ie.casterWidth*1e3],[jc,"build-battery-l-num",n.l*1e3],[Xc,"build-battery-w-num",n.w*1e3],[qc,"build-battery-h-num",n.h*1e3],[$c,"build-powerbank-r-num",t.radius*1e3],[Yc,"build-powerbank-l-num",t.length*1e3]];for(const[r,o,a]of i)r.value=String(a),ve(o).value=String(a);if(kt){const r=ie.getComponentEntries().find(o=>o.id===kt);r&&hp(kt,r.type)}Fr==null||Fr()}const Jc={chassis:{title:"Chassis",rows:[{label:"Thickness",unit:"mm",min:1,max:10,step:.5,get:()=>ie.chassisParams.thickness*1e3,set:s=>ie.updateChassis({...ie.chassisParams,thickness:s/1e3})},{label:"Body width",unit:"mm × 2",min:40,max:90,step:1,get:()=>ie.chassisParams.bodyHalfWidth*1e3,set:s=>ie.updateChassis({...ie.chassisParams,bodyHalfWidth:s/1e3})},{label:"Rear width",unit:"mm × 2",min:85,max:130,step:1,get:()=>ie.chassisParams.rearHalfWidth*1e3,set:s=>ie.updateChassis({...ie.chassisParams,rearHalfWidth:s/1e3})}]},wheels:{title:"Wheels",rows:[{label:"Radius",unit:"mm",min:20,max:50,step:.5,get:()=>ie.wheelParams.radius*1e3,set:s=>ie.updateWheel({...ie.wheelParams,radius:s/1e3})},{label:"Width",unit:"mm",min:8,max:30,step:1,get:()=>ie.wheelParams.width*1e3,set:s=>ie.updateWheel({...ie.wheelParams,width:s/1e3})}]},caster:{title:"Caster",rows:[{label:"Radius",unit:"mm",min:8,max:25,step:.5,get:()=>ie.casterRadius*1e3,set:s=>ie.updateCaster(s/1e3,ie.casterWidth)},{label:"Width",unit:"mm",min:5,max:25,step:.5,get:()=>ie.casterWidth*1e3,set:s=>ie.updateCaster(ie.casterRadius,s/1e3)}]},battery:{title:"Battery Box",rows:[{label:"Length",unit:"mm",min:40,max:120,step:1,get:()=>ie.batteryBox.l*1e3,set:s=>ie.updateBatteryBox(s/1e3,ie.batteryBox.w,ie.batteryBox.h)},{label:"Width",unit:"mm",min:25,max:80,step:1,get:()=>ie.batteryBox.w*1e3,set:s=>ie.updateBatteryBox(ie.batteryBox.l,s/1e3,ie.batteryBox.h)},{label:"Height",unit:"mm",min:15,max:50,step:1,get:()=>ie.batteryBox.h*1e3,set:s=>ie.updateBatteryBox(ie.batteryBox.l,ie.batteryBox.w,s/1e3)}]},powerbank:{title:"Power Bank",rows:[{label:"Radius",unit:"mm",min:8,max:25,step:.5,get:()=>ie.powerbank.radius*1e3,set:s=>ie.updatePowerbank(s/1e3,ie.powerbank.length)},{label:"Length",unit:"mm",min:50,max:200,step:1,get:()=>ie.powerbank.length*1e3,set:s=>ie.updatePowerbank(ie.powerbank.radius,s/1e3)}]}};let Fr=null,ea=null,qs=null;function Bl(){const s=ve("float-panels");if(s.hasChildNodes()){if(ea&&qs){const e=Jc[qs];if(e){const t=e.rows.map((n,i)=>({label:n.label,unit:n.unit,from:ea[i],to:n.get()})).filter(n=>Math.abs(n.from-n.to)>=.01);t.length>0&&(cn==null||cn.appendRecapCard(e.title,t))}}s.innerHTML="",Fr=null,ea=null,qs=null,sn==null||sn.setParamCallback(null)}}function op(s){Bl();const e=ve("float-panels"),t=Jc[s];if(!t)return;const n=document.createElement("div");n.className="float-panel",n.dataset.panel=s,n.setAttribute("role","dialog"),n.setAttribute("aria-label",`${t.title} controls`);const i=document.createElement("div");i.className="float-panel-header";const r=document.createElement("div");r.className="float-panel-grip";for(let u=0;u<6;u++)r.appendChild(document.createElement("span"));const o=document.createElement("span");o.className="float-panel-title",o.textContent=t.title;const a=document.createElement("button");a.type="button",a.className="float-panel-close",a.setAttribute("aria-label","Close panel"),a.textContent="×",a.addEventListener("click",()=>Bl()),i.append(r,o,a);const l=document.createElement("div");l.className="float-panel-body";const c=[];for(let u=0;u<t.rows.length;u++){const d=t.rows[u],f=document.createElement("div");f.className="float-panel-row",f.setAttribute("data-gesture-track",""),f.dataset.fpRowIndex=String(u);const g=document.createElement("div");g.className="float-panel-row-head";const _=document.createElement("span");_.className="float-panel-row-label",_.textContent=d.label;const p=document.createElement("span");p.className="float-panel-row-unit",p.textContent=d.unit,g.append(_,p);const m=document.createElement("div");m.className="float-panel-row-inputs";const w=document.createElement("input");w.type="range",w.min=String(d.min),w.max=String(d.max),w.step=String(d.step),w.value=String(d.get());const v=document.createElement("input");v.type="number",v.min=String(d.min),v.max=String(d.max),v.step=String(d.step),v.value=String(d.get());const S=I=>{d.set(I),us()};w.addEventListener("input",()=>{v.value=w.value,S(parseFloat(w.value))}),v.addEventListener("change",()=>{w.value=v.value,S(parseFloat(v.value))}),c.push(I=>{w.value=String(I),v.value=String(I)}),m.append(w,v),f.append(g,m),l.appendChild(f)}Fr=()=>t.rows.forEach((u,d)=>c[d](u.get())),ea=t.rows.map(u=>u.get()),qs=s;const h=ap();n.append(i,l),e.appendChild(n),n.style.top=`${h}px`,lp(n,i),n.addEventListener("keydown",u=>{u.key==="Escape"&&Bl()})}function ap(){let s=60;return document.querySelectorAll(".float-panel").forEach(e=>{const t=e.getBoundingClientRect();t.width>0&&(s=Math.max(s,t.bottom+8))}),s}function lp(s,e){e.addEventListener("pointerdown",t=>{if(t.target.closest(".float-panel-close"))return;e.setPointerCapture(t.pointerId);const n=s.getBoundingClientRect(),i=t.clientX-n.left,r=t.clientY-n.top,o=a=>{s.style.left=`${a.clientX-i}px`,s.style.top=`${a.clientY-r}px`};e.addEventListener("pointermove",o),e.addEventListener("pointerup",()=>e.removeEventListener("pointermove",o),{once:!0})})}function cM(){const s=ve("gesture-hint-host");if(!s||s.querySelector(".float-panel"))return;const e=[{icon:"✊",html:"<strong>Fist + move</strong> — orbit camera"},{icon:"☝️",html:"<strong>Point + dwell 0.8 s</strong> — select joint"},{icon:"🤚",html:"<strong>Tilt wrist</strong> (joint selected) — rotate joint"},{icon:"🖐️",html:"<strong>Open palm, hold 1 s</strong> — reset all joints"},{icon:"🤲",html:"<strong>Two hands pinch/spread</strong> — zoom"},{icon:"👍",html:"<strong>Thumbs up</strong> — confirm / Continue"}],t=document.createElement("div");t.className="float-panel";const n=document.createElement("div");n.className="float-panel-header";const i=document.createElement("div");i.className="float-panel-grip";for(let c=0;c<6;c++)i.appendChild(document.createElement("span"));const r=document.createElement("span");r.className="float-panel-title",r.textContent="Gestures";const o=document.createElement("button");o.type="button",o.className="float-panel-close",o.setAttribute("aria-label","Close gesture hint"),o.textContent="×",o.addEventListener("click",()=>{s.innerHTML=""}),n.append(i,r,o);const a=document.createElement("div");a.className="float-panel-body",a.style.gap="7px";for(const c of e){const h=document.createElement("div");h.className="gesture-row";const u=document.createElement("span");u.className="gesture-icon",u.textContent=c.icon;const d=document.createElement("span");d.className="gesture-desc",d.innerHTML=c.html,h.append(u,d),a.appendChild(h)}const l=ap();t.append(n,a),s.appendChild(t),t.style.top=`${l}px`,lp(t,n)}ep.addEventListener("click",()=>ie.undo());tp.addEventListener("click",()=>ie.redo());ZE.addEventListener("click",()=>{ie.isCatalogActive&&(ie.resetToDefaults(),us())});ie.onHistoryChange=()=>{ep.disabled=!ie.canUndo,tp.disabled=!ie.canRedo};ie.onDOMRebuild=()=>{var e,t;const s=kt;to();for(const{id:n,type:i}of ie.getComponentEntries())ds(n,i),((e=Un[i])==null?void 0:e.geomType)==="mesh"&&yp(n,i);us(),On(),(t=ie.onHistoryChange)==null||t.call(ie),cn==null||cn.syncToolCount(),s&&ie.getComponentData(s)&&La(s)};lM.addEventListener("click",()=>cs());document.addEventListener("keydown",s=>{if(ie.isActive){if((s.ctrlKey||s.metaKey)&&s.key==="z"&&!s.shiftKey&&(s.preventDefault(),ie.undo()),(s.ctrlKey||s.metaKey)&&(s.key==="y"||s.key==="z"&&s.shiftKey)&&(s.preventDefault(),ie.redo()),kt&&(s.key==="Delete"||s.key==="Backspace")&&!s.ctrlKey&&!s.metaKey){const e=document.activeElement;if(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)return;s.preventDefault();const t=kt,n=Qn.querySelector(`[data-id="${t}"]`);ie.removeComponent(t),cs(),Zc(t),n==null||n.remove(),On();return}if(s.key==="Escape"&&kt){const e=document.activeElement;if(e.tagName==="INPUT"||e.tagName==="TEXTAREA")return;cs();return}if(kt&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(s.key)&&!s.ctrlKey&&!s.metaKey){s.preventDefault();const e=ie.getComponentData(kt);if(!e)return;const t=.001;let{x:n,y:i,z:r}=e;s.shiftKey?(s.key==="ArrowUp"&&(r+=t),s.key==="ArrowDown"&&(r-=t)):(s.key==="ArrowLeft"&&(i+=t),s.key==="ArrowRight"&&(i-=t),s.key==="ArrowUp"&&(n-=t),s.key==="ArrowDown"&&(n+=t)),ie.updateComponent(kt,{x:n,y:i,z:r});const o=nr.get(kt);o&&(o.x.value=n.toFixed(4),o.y.value=i.toFixed(4),o.z.value=r.toFixed(4))}}});kd.addEventListener("click",()=>void ie.exportZip(kd));Yo.addEventListener("click",()=>{const s=ie.getURDFXML();navigator.clipboard.writeText(s).then(()=>{const e=Yo.textContent;Yo.textContent="Copied!",setTimeout(()=>{Yo.textContent=e},1500)}).catch(()=>{})});tM.addEventListener("click",()=>{to(),ie.initFromScratch(eM.value),ie.open(),ve("tab-build").click(),eo(),tr(),On()});function eo(){const s=Sa.savedCustomNames();if(np.hidden=s.length===0,s.length===0){is.hidden=!0;return}is.innerHTML="";for(const e of s){const t=document.createElement("div");t.className="build-saved-row";const n=document.createElement("span");n.className="build-saved-name",n.textContent=e;const i=document.createElement("button");i.type="button",i.className="build-export-btn build-saved-load",i.textContent="Load",i.addEventListener("click",()=>{to();const o=ie.restoreCustomByName(e);for(const{id:a,type:l}of o)ds(a,l);o.length>0&&us(),On(),ie.open(),ve("tab-build").click(),tr(),is.hidden=!0});const r=document.createElement("button");r.type="button",r.className="build-remove-btn",r.textContent="×",r.title="Delete saved robot",r.addEventListener("click",()=>{ie.deleteCustom(e),ie.robotName===e&&tr(),eo()}),t.append(n,i,r),is.appendChild(t)}}function tr(){const s=ie.isCatalogActive;ip.hidden=!s,s&&(nM.textContent=ie.robotName,sp.hidden=ie.isSupported)}np.addEventListener("click",()=>{is.hidden=!is.hidden});sp.addEventListener("click",()=>{ie.deleteCustom(ie.robotName),ip.hidden=!0,is.hidden=!0,eo()});iM.addEventListener("click",s=>{s.stopPropagation(),Bd.hidden=!Bd.hidden});eo();tr();const cp=new Map;function On(){const s=new Map,e=ie.getComponentEntries();for(const{type:n}of e)s.set(n,(s.get(n)??0)+1);for(const[n,i]of cp){const r=s.get(n)??0;i.textContent=r>0?String(r):"",i.style.display=r>0?"inline":"none"}const t=e.length;rM.textContent=t>0?`${t} added`:"",oM.hidden=t>0||!ie.isCatalogActive}for(const[s,e]of Object.entries(Un)){if(e.geomType==="mesh"||e.hidden)continue;const t=document.createElement("button");t.type="button",t.className="robot-btn",t.style.cssText="position: relative;",t.textContent=e.label,t.dataset.comp=s;const n=document.createElement("span");n.style.cssText="position:absolute;top:2px;right:3px;font-size:9px;line-height:1;color:var(--blue);display:none;font-weight:700;",t.appendChild(n),cp.set(s,n),t.addEventListener("click",()=>{var r;if(!ie.isCatalogActive)return;const i=ie.addComponent(s);Ra(i),ds(i,s),On(),(r=Qn.querySelector(`[data-id="${i}"]`))==null||r.scrollIntoView({behavior:"smooth",block:"nearest"})}),QE.appendChild(t)}const nr=new Map,ir=new Map;let kt=null,Ii=null;function to(){Qn.innerHTML="",cs()}function cs(){kt=null,Ii=null;for(const s of Qn.querySelectorAll(".build-component"))s.classList.remove("selected");Kc.hidden=!0,Us.innerHTML="",nr.clear(),ir.clear(),ua(null)}function ua(s){if(kl.innerHTML="",kl.hidden=!s,!s)return;const e=document.createElement("span");e.className="context-pill";const t=document.createElement("span");t.className="context-pill-dot",t.style.background=s.color;const n=document.createElement("span");n.textContent=s.label;const i=document.createElement("button");i.type="button",i.className="context-pill-dismiss",i.textContent="×",i.title="Deselect",i.addEventListener("click",s.onDismiss),e.append(t,n,i),kl.appendChild(e)}function Ra(s){for(const[e,t]of ir)if(e!==s&&!Array.from(t.options).some(n=>n.value===s)){const n=document.createElement("option");n.value=n.textContent=s,t.appendChild(n)}}function Zc(s){for(const e of ir.values()){const t=Array.from(e.options).find(n=>n.value===s);t&&e.removeChild(t)}}function La(s){kt=s,Ii=null;for(const n of Qn.querySelectorAll(".build-component"))n.classList.toggle("selected",n.dataset.id===s);const e=ie.getComponentEntries().find(n=>n.id===s);e&&hp(s,e.type);const t=Un[(e==null?void 0:e.type)??""];ua({label:`${(t==null?void 0:t.label)??(e==null?void 0:e.type)??s} · ${s}`,color:(t==null?void 0:t.cssColor)??"#888",onDismiss:cs})}function ds(s,e){const t=Un[e],n=document.createElement("div");n.className="build-component",n.dataset.id=s;const i=document.createElement("div");i.className="build-component-header";const r=document.createElement("span");r.style.cssText=`width:7px;height:7px;border-radius:50%;flex-shrink:0;background:${(t==null?void 0:t.cssColor)??"#888"}`;const o=document.createElement("span");o.textContent=`${t.label} ${s.split("_").pop()}`;const a=document.createElement("button");a.type="button",a.className="build-remove-btn",a.title="Duplicate",a.textContent="⧉",a.addEventListener("click",c=>{var u;c.stopPropagation();const h=ie.duplicateComponent(s);h&&(Ra(h),ds(h,e),((u=Un[e])==null?void 0:u.geomType)==="mesh"&&yp(h,e),On())});const l=document.createElement("button");l.type="button",l.className="build-remove-btn",l.title="Remove",l.textContent="×",l.addEventListener("click",c=>{c.stopPropagation(),ie.removeComponent(s),kt===s&&cs(),Zc(s),n.remove(),On()}),i.addEventListener("click",()=>La(s)),i.append(r,o,a,l),n.appendChild(i),Qn.appendChild(n)}function hp(s,e){var v,S;const t=ie.getComponentData(s);if(!t)return;const n=Un[e];Us.innerHTML="",nr.delete(s),ir.delete(s);const i={},r={};function o(){var C,D,E,y,U,z,F;const I=n.geomType==="cylinder"?[parseFloat(i.r.value)||.001,parseFloat(i.l.value)||.001]:[parseFloat(i.w.value)||.001,parseFloat(i.d.value)||.001,parseFloat(i.h.value)||.001],P=((C=r.jt)==null?void 0:C.value)??"fixed";ie.updateComponent(s,{x:parseFloat(i.x.value)||0,y:parseFloat(i.y.value)||0,z:parseFloat(i.z.value)||0,rx:parseFloat(i.rx.value)||0,ry:parseFloat(i.ry.value)||0,rz:parseFloat(i.rz.value)||0,dims:I,jointType:P,axis:[parseFloat((D=i.ax)==null?void 0:D.value)||0,parseFloat((E=i.ay)==null?void 0:E.value)||0,parseFloat((y=i.az)==null?void 0:y.value)||1],limitLower:parseFloat((U=i.limitMin)==null?void 0:U.value)||-1.5708,limitUpper:parseFloat((z=i.limitMax)==null?void 0:z.value)||1.5708,parent:((F=r.parent)==null?void 0:F.value)??"base_link"})}function a(I,P,C,D,E,y=Us){const U=document.createElement("div");U.className="inspector-row";const z=document.createElement("label");z.className=P,z.textContent=C;const F=document.createElement("input");F.type="number",F.step=String(D),F.value=String(E),F.addEventListener("input",o),Qf(z,F),i[I]=F,U.append(z,F),y.appendChild(U)}function l(I,P=Us){const C=document.createElement("div");C.className="build-group-label",C.textContent=I,P.appendChild(C)}function c(I,P,C,D=Us){const E=document.createElement("div");E.className="inspector-row";const y=document.createElement("label");y.textContent=P;const U=document.createElement("select");U.className="build-select";for(const z of C){const F=document.createElement("option");F.value=F.textContent=z,U.appendChild(F)}U.addEventListener("change",o),r[I]=U,E.append(y,U),D.appendChild(E)}l("Position"),a("x","axis-x","X",.005,t.x??0),a("y","axis-y","Y",.005,t.y??0),a("z","axis-z","Z",.005,t.z??n.defaultZ),l("Size"),n.geomType==="cylinder"?(a("r","axis-x","R",.005,t.dims[0]??n.defaultDims[0]),a("l","axis-z","L",.005,t.dims[1]??n.defaultDims[1])):(a("w","axis-x","W",.005,t.dims[0]??n.defaultDims[0]),a("d","axis-y","D",.005,t.dims[1]??n.defaultDims[1]),a("h","axis-z","H",.005,t.dims[2]??n.defaultDims[2]));const h=t.jointType??"fixed",u=h==="revolute"||h==="prismatic",d=document.createElement("details");d.className="build-comp-advanced",h!=="fixed"&&(d.open=!0);const f=document.createElement("summary");f.textContent="Rotation · Joint · Limits",d.appendChild(f),Us.appendChild(d),l("Rotation",d),a("rx","axis-x","Rx",.01,t.rx??0,d),a("ry","axis-y","Ry",.01,t.ry??0,d),a("rz","axis-z","Rz",.01,t.rz??0,d),l("Joint",d),c("parent","Parent",ie.getAvailableLinks().filter(I=>I!==s),d),c("jt","Type",["fixed","continuous","revolute","prismatic"],d),t.parent&&r.parent&&(r.parent.value=t.parent),t.jointType&&r.jt&&(r.jt.value=t.jointType);const g=document.createElement("div");l("Axis",g),a("ax","axis-x","X",.1,t.axis[0]??0,g),a("ay","axis-y","Y",.1,t.axis[1]??0,g),a("az","axis-z","Z",.1,t.axis[2]??1,g),g.hidden=h==="fixed",d.appendChild(g);const _=document.createElement("div");l("Limits",_),a("limitMin","axis-x","Min",.01,t.limitLower??-1.5708,_),a("limitMax","axis-z","Max",.01,t.limitUpper??1.5708,_),_.hidden=!u,d.appendChild(_);const p=document.createElement("div"),m=document.createElement("input");m.type="range",m.step="0.01",m.min=String(t.limitLower??-1.5708),m.max=String(t.limitUpper??1.5708),m.value="0",m.dataset.preview="true",m.style.cssText="width: 100%; margin-top: 2px;",m.addEventListener("input",()=>{var I;(I=Ie.robot)==null||I.setJointValue(`${s}_joint`,parseFloat(m.value))}),(v=i.limitMin)==null||v.addEventListener("input",()=>{m.min=i.limitMin.value}),(S=i.limitMax)==null||S.addEventListener("input",()=>{m.max=i.limitMax.value}),l("Preview",p);const w=document.createElement("div");w.className="build-preview-row",w.appendChild(m),p.appendChild(w),p.hidden=!u,d.appendChild(p),r.jt.addEventListener("change",()=>{var C;const I=r.jt.value,P=I==="revolute"||I==="prismatic";g.hidden=I==="fixed",_.hidden=!P,p.hidden=!P,I!=="fixed"&&!d.open&&(d.open=!0),P||(m.value="0",(C=Ie.robot)==null||C.setJointValue(`${s}_joint`,0))}),nr.set(s,i),r.parent&&ir.set(s,r.parent),aM.textContent=`${n.label} · ${s}`,Kc.hidden=!1}function hM(s){const e=Qn.querySelector(`[data-id="${s}"]`);nr.delete(s),ir.delete(s),Zc(s),kt===s&&cs(),e==null||e.remove()}document.querySelectorAll(".build-section-detach").forEach(s=>{s.addEventListener("click",e=>{var n;e.preventDefault(),e.stopPropagation();const t=((n=s.closest("[data-panel]"))==null?void 0:n.dataset.panel)??"";op(t)})});{const s={isEditorTabActive:()=>document.body.classList.contains("editor-open"),handleEditorInput:e=>xn.handleExternalInput(e),onComponentAdded:(e,t)=>{Ra(e),ds(e,t)},onComponentRemoved:e=>hM(e),syncSlidersFromController:us,switchToBuildTab:()=>ve("tab-build").click(),onBriefToggle:e=>{xn.brief=e},refreshPaletteCounts:On,getPartsList:()=>xn.partsList,readPart:e=>xn.readPart(e),updatePart:(e,t)=>xn.writePart(e,t),highlightPart:e=>Qr(e),getJointNames:()=>{var e;return Object.keys(((e=Ie.robot)==null?void 0:e.joints)??{})},initRobot:(e,t)=>{to(),ie.initFromScratch(e==="robot-car"?"Robot Car":t??"My Robot"),e==="robot-car"&&["03-wheels.xml","04-caster.xml","06-power.xml"].forEach(n=>{fetch(`/robots/robot-car/parts/${n}`).then(i=>i.ok?i.text():null).then(i=>{i&&ie.setPartTemplate(n,i)}).catch(()=>{})}),ie.open(),eo(),tr(),On(),ve("tab-build").click(),cn==null||cn.syncToolCount()},getFocusedComponent:()=>{var e;if(kt){const t=ie.getComponentEntries().find(n=>n.id===kt);return t?{id:kt,type:t.type,data:ie.getComponentData(kt)}:null}if(Ii){const t=(e=Ie.robot)==null?void 0:e.joints[Ii];if(!t)return null;const n=t.position,i=t.jointType??"fixed";return{id:Ii,type:i,data:{type:i,x:n.x,y:n.y,z:n.z,rx:0,ry:0,rz:0,dims:[],jointType:i,axis:[0,0,1],limitLower:0,limitUpper:0,parent:"base_link"}}}return null},openPanel:e=>op(e),openGestureHint:()=>cM(),isGestureActive:()=>sn!==null};cn=new AE(ie,s),cn.init()}const mi=new Lc,Pa=new ye,rc=new Ln,oc=new Ln,ac=new k,up=new k,Sr=new k;let Di=null,Rn=null,dp=0,fp=0,pp=0,zs=0,Hs=0,Vs=0,mp=0,gp=0;function Qc(s){const e=Ie.renderer.domElement.getBoundingClientRect();Pa.set((s.clientX-e.left)/e.width*2-1,-((s.clientY-e.top)/e.height)*2+1)}function _p(s){const e=ie.componentIds;let t=s;for(;t;){if(t.isURDFLink&&t.urdfName&&e.has(t.urdfName))return t.urdfName;t=t.parent}return null}Ie.renderer.domElement.addEventListener("pointerdown",s=>{if(!ie.isCatalogActive)return;Qc(s),mi.setFromCamera(Pa,Ie.camera);const e=mi.intersectObject(Ie.scene,!0);if(!e.length)return;const t=_p(e[0].object);if(!t||!ie.isFixedComponent(t))return;const n=ie.getComponentXYZ(t);if(!n)return;rc.set(new k(0,1,0),-n.z),mi.ray.intersectPlane(rc,ac);const i=new k;Ie.camera.getWorldDirection(i),i.y=0,i.normalize(),oc.setFromNormalAndCoplanarPoint(i,new k(n.x,n.z,-n.y)),mi.ray.intersectPlane(oc,up),Di=t,dp=n.x,fp=n.y,pp=n.z,zs=n.z,Hs=n.x,Vs=n.y,ie.startComponentDrag(t),Ie.controls.enabled=!1,mp=s.clientX,gp=s.clientY,Rn=Qn.querySelector(`[data-id="${t}"]`),Rn==null||Rn.classList.add("dragging"),La(t),Ie.renderer.domElement.setPointerCapture(s.pointerId),s.stopPropagation()});Ie.renderer.domElement.addEventListener("pointermove",s=>{var i;if(!Di)return;Qc(s),mi.setFromCamera(Pa,Ie.camera);const e=(i=Ie.robot)==null?void 0:i.joints[`${Di}_joint`],t=nr.get(Di),n=.001;if(Ie.renderer.domElement.style.cursor=s.shiftKey?"ns-resize":"grabbing",s.shiftKey){if(!mi.ray.intersectPlane(oc,Sr))return;zs=Math.round((pp+(Sr.y-up.y))/n)*n,e&&e.position.set(Hs,Vs,zs),t&&(t.z.value=zs.toFixed(4))}else{if(!mi.ray.intersectPlane(rc,Sr))return;Hs=Math.round((dp+(Sr.x-ac.x))/n)*n,Vs=Math.round((fp-(Sr.z-ac.z))/n)*n,e&&e.position.set(Hs,Vs,zs),t&&(t.x.value=Hs.toFixed(4),t.y.value=Vs.toFixed(4))}});Ie.renderer.domElement.addEventListener("pointerup",s=>{if(!Di)return;const e=Math.hypot(s.clientX-mp,s.clientY-gp)>8;if(ie.finishComponentDrag(Di,Hs,Vs,zs),Ie.controls.enabled=!0,Ie.renderer.domElement.style.cursor="",Rn==null||Rn.classList.remove("dragging"),!e&&Rn){const t=Rn.dataset.id;t&&La(t),Rn.scrollIntoView({behavior:"smooth",block:"nearest"})}Rn=null,Di=null});const Zi=ve("build-hover-tip");let Vd=0;Ie.renderer.domElement.addEventListener("pointermove",s=>{if(!ie.isCatalogActive||Di){Zi.style.display="none";return}cancelAnimationFrame(Vd),Vd=requestAnimationFrame(()=>{var n;Qc(s),mi.setFromCamera(Pa,Ie.camera);const e=mi.intersectObject(Ie.scene,!0),t=e.length?_p(e[0].object):null;if(t){const i=Un[((n=ie.getComponentData(t))==null?void 0:n.type)??""];Zi.textContent=i?`${i.label} #${t.split("_").pop()}`:t,Zi.style.display="block",Zi.style.left=s.clientX+12+"px",Zi.style.top=s.clientY-28+"px"}else Zi.style.display="none"})});Ie.renderer.domElement.addEventListener("pointerleave",()=>{Zi.style.display="none"});function yp(s,e){const t=Ri.find(n=>n.id===e);t&&t.factory().then(({generate:n})=>ie.restoreMeshBlob(s,n())).catch(n=>console.warn("[regenMeshBlob] failed for",s,n))}const uM={Sensor:"📡",Actuator:"⚙️",MCU:"💾",Power:"🔋",Structural:"🧱"};let lc="";function eh(){const s=ie.isCatalogActive,e=rp.value.trim().toLowerCase(),t=Ri.filter(n=>!(lc&&n.category!==lc||e&&!n.label.toLowerCase().includes(e)&&!n.description.toLowerCase().includes(e)));Hd.innerHTML="",sM.hidden=t.length>0;for(const n of t)Hd.appendChild(dM(n,s))}function dM(s,e){const t=document.createElement("div");t.className="lib-card";const n=document.createElement("div");n.className="lib-thumb",n.style.background=s.cssColor+"33",n.style.borderBottom=`2px solid ${s.cssColor}`,n.textContent=uM[s.category]??"📦";const i=document.createElement("div");i.className="lib-card-info";const r=document.createElement("div");r.className="lib-card-name",r.textContent=s.label,r.title=s.description;const o=document.createElement("div");o.className="lib-card-meta";const a=Object.assign(document.createElement("span"),{className:"lib-card-cat",textContent:s.category}),l=s.defaultDims.map(u=>Math.round(u*1e3)).join("×")+" mm",c=Object.assign(document.createElement("span"),{className:"lib-card-dims",textContent:l});o.append(a,c);const h=document.createElement("button");return h.type="button",h.className="lib-card-add",h.textContent="Add to Build",h.disabled=!e,h.addEventListener("click",()=>void fM(s,h)),i.append(r,o,h),t.append(n,i),t}async function fM(s,e){var n;if(!ie.isCatalogActive)return;const t=e.textContent??"Add to Build";e.disabled=!0,e.textContent="Generating…";try{const{generate:i}=await s.factory(),r=i(),o=ie.addMeshComponent(s.id,r);Ra(o),ds(o,s.id),On(),ve("tab-build").click(),(n=Qn.querySelector(`[data-id="${o}"]`))==null||n.scrollIntoView({behavior:"smooth",block:"nearest"})}catch(i){console.error("[Library] generate failed:",i),e.textContent="Error",setTimeout(()=>{e.textContent=t,e.disabled=!ie.isCatalogActive},2e3);return}e.textContent=t,e.disabled=!1}rp.addEventListener("input",eh);"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw.js").catch(()=>{});for(const s of zd.querySelectorAll(".lib-pill"))s.addEventListener("click",()=>{for(const e of zd.querySelectorAll(".lib-pill"))e.classList.remove("lib-pill--active");s.classList.add("lib-pill--active"),lc=s.dataset.cat??"",eh()});export{rr as B,bc as C,Lc as R,ed as S,k as V,ye as a,vE as g,pM as m};
