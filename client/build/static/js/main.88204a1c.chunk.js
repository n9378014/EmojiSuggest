(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{17:function(n,e,t){},18:function(n,e,t){},37:function(n,e,t){"use strict";t.r(e);for(var o=t(1),r=t.n(o),i=t(6),c=t.n(i),a=(t(17),t(7)),s=t(8),l=t(12),f=t(11),u=(t(18),t(3)),h=t(9),d=t(10),g=t(0),v=t(30),m=(t(36),259),p=19,j=Math.ceil(13.631578947368421),O=Math.round(p*(j/4)+j/4*18)-Math.round(9.5),x=Math.ceil(9.5)-1,b=[],y=0;y<m;y++)b.push(v.openmojis[3073].hexcode);for(var w=[[]],S=0;S<m;S++)w[0].push(v.openmojis[3073].hexcode);var A=[0,1,2,3,4,5,19,20,21,22,23,24,37,38,39,40,41,42,43,56,57,58,59,60,61,62,74,75,76,77,78,79,80,81,93,94,95,96,97,98,99,100].reverse(),E=[7,8,9,10,11,26,27,28,29,45,46,47,64,65,83].reverse(),F=[13,14,15,16,17,18,31,32,33,34,35,36,49,50,51,52,53,54,55,67,68,69,70,71,72,73,85,86,87,88,89,90,91,92,103,104,105,106,107,108,109,110].reverse(),L=[130,131,132,133,134,135,136,137,148,149,150,151,152,153,154,155,167,168,169,170,171,172,173,185,186,187,188,189,190,191,204,205,206,207,208,209,222,223,224,225,226,227,241,242,243,244,245],P=[157,175,176,193,194,195,211,212,213,124,229,230,231,232,233,247,248,249,250,251,252],k=[140,141,142,143,144,145,146,147,159,160,161,162,163,164,165,166,178,179,180,181,182,183,184,197,198,199,200,201,202,203,216,217,218,219,220,221,235,236,237,238,239,240,254,255,256,257,258],C=[121,122,123,124,125,126,127,128,129],M=[139,158,177,196,215,234,253],N=[138,156,174,192,210,228,246],T=[119,118,117,116,115,114,113,112,111],B=[101,82,63,44,25,6],D=[102,84,66,48,30,12],J=new Array(m),H=function(){var n=Object(o.useState)([]),e=Object(u.a)(n,2),t=e[0],r=e[1],i=y([b]),c=Object(o.useState)(i),a=Object(u.a)(c,2),s=a[0],l=a[1],f=y(w,v.openmojis[3073].hexcode);function j(n,e){var t="";return Array.isArray(e)?t:t="/images/"+e+".png"}function y(n,e){for(var o=n[0],r=n[1],i=0;i<o.length;i++)J[i]=j(0,o[i]);if(void 0!==r&&null!==r&&void 0!==e&&A.forEach((function(n){o[n]=r[A.indexOf(n)]})),t.length>=1)for(var c=0;c<t.length;c++)O-c-1>=O-x&&(o[O-c-1]=t[t.length-2-c]);var a=o.map((function(n,e){var t=function(n){var e="white";return e=C.includes(n)||M.includes(n)||N.includes(n)||T.includes(n)||B.includes(n)||D.includes(n)?"#dbf7fd":"white",n===O&&(e="#a4eefc"),e}(e);return Array.isArray(n)?J[e]="/blends/"+n[0]+n[1]+".png":J[e]="/images/"+n+".png",{img:J[e],key:e,onClick:function(t){return I(e,n,t)},fill:"",styles:{normal:{fill:t},hover:{fill:"#6cc7da"},active:{fill:"#779df1"}}}}));return a}function S(n,e){for(var o=t,i=0;i<e;i++)o.push(n),o.length>x+1&&o.shift();r(o)}function H(n,e){return new Promise((function(t,o){var r;Array.isArray(n)&&(n=n[0]),fetch("/api/variety/"+n+"?limit="+e.toString()).then((function(n){return n.json()})).then((function(n){r=JSON.parse(n)})).then((function(){t(r)})).catch((function(n){console.error(n.message)}))}))}var I=function(n,e,o){if(console.log(e+" was clicked. ID is "+n),n===O){var r="";r=Array.isArray(e)?"/blends/"+e[0]+e[1]+".png":"/images/"+e+".png",Object(d.saveAs)(r,"blend.png")}else"1F504"!==e&&(S(e,1),l(f),console.log("Hex: "+e),Array.isArray(e)&&(e=e[1],console.log("BLEND: "+e)),Promise.all([H(e,m)]).then((function(n){var o,r=[];if(r[0]=n[0][0],r[1]=n[0][1],r[2]=n[0][2],r[3]=n[0][3],void 0!==r[1]&&null!==r[1]&&null!==r[2]&&void 0!==e&&(A.forEach((function(n){r[0][n]=r[1][A.indexOf(n)]})),E.forEach((function(n){r[0][n]=r[3][E.indexOf(n)]})),F.forEach((function(n){r[0][n]=r[3][F.indexOf(n)]})),L.forEach((function(n){r[0][n]=r[1][L.indexOf(n)]})),P.forEach((function(n){r[0][n]=r[3][P.indexOf(n)]})),k.forEach((function(n){r[0][n]=r[3][k.indexOf(n)]})),C.forEach((function(n){r[0][n]=r[2][C.indexOf(n)]}))),"1F504"!==t[t.length-2]&&(r[0][100]=r[3],r[0][137]=r[4],A.forEach((function(n){100!==n&&(r[0][n]=r[0][n+1])}))),t.length>=1){r[0][O]=t[t.length-1];for(var i=0;i<t.length;i++)O-i-1>=O-x&&(r[0][O-i-1]=t[t.length-1-i])}new Promise((function(n,t){o=y(r,e),n()})).then((function(){l(o),console.log(r)})).catch((function(n){console.log("Something went wrong with the tilePromise."),console.error(n.message)}))})).catch((function(n){console.error(n.message)})))};return window.addEventListener("DOMContentLoaded",(function(n){var e,t=document.querySelector(".App");t.scrollLeft=350,t.scrollTop=350,S(v.openmojis[3073].hexcode,x+1),fetch("/api/randomhexcodes?limit="+m.toString()).then((function(n){return n.json()})).then((function(n){return e=JSON.parse(n)})).then((function(){return i=y([e,[]])})).then((function(){return l(i)})).catch((function(n){console.log("Something went wrong with the randomhexcodes fetch request."),console.error(n.message)}))})),Object(g.jsx)(g.Fragment,{children:Object(g.jsx)(h.TiledHexagons,{tileSideLengths:60,tileGap:4,tileBorderRadii:9,maxHorizontal:p,tileTextStyles:{fontFamily:"Source Sans Pro",fontSize:"68px"},tiles:s,onLoad:function(){return I()}})})},I=function(n){Object(l.a)(t,n);var e=Object(f.a)(t);function t(){return Object(a.a)(this,t),e.apply(this,arguments)}return Object(s.a)(t,[{key:"render",value:function(){return Object(g.jsx)("div",{className:"App",children:Object(g.jsx)("div",{className:"content",children:Object(g.jsx)(H,{})})})}}]),t}(o.Component),q=I,z=function(n){n&&n instanceof Function&&t.e(3).then(t.bind(null,38)).then((function(e){var t=e.getCLS,o=e.getFID,r=e.getFCP,i=e.getLCP,c=e.getTTFB;t(n),o(n),r(n),i(n),c(n)}))};c.a.render(Object(g.jsx)(r.a.StrictMode,{children:Object(g.jsx)(q,{})}),document.getElementById("root")),z()}},[[37,1,2]]]);
//# sourceMappingURL=main.88204a1c.chunk.js.map