(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{17:function(n,e,t){},18:function(n,e,t){},37:function(n,e,t){"use strict";t.r(e);for(var i=t(1),r=t.n(i),o=t(6),c=t.n(o),u=(t(17),t(7)),a=t(8),s=t(12),f=t(11),h=(t(18),t(3)),l=t(9),d=t(10),g=t(0),m=t(30),v=(t(36),259),p=19,j=Math.ceil(13.631578947368421),O=Math.round(p*(j/4)+j/4*18)-Math.round(9.5),b=Math.ceil(9.5)-1,x=[],S=0;S<v;S++)x.push(m.openmojis[3073].hexcode);var w=[0,1,2,3,4,5,19,20,21,22,23,24,37,38,39,40,41,42,43,56,57,58,59,60,61,62,74,75,76,77,78,79,80,81,93,94,95,96,97,98,99],y=[7,8,9,10,11,26,27,28,29,45,46,47,64,65,83],A=[13,14,15,16,17,18,31,32,33,34,35,36,49,50,51,52,53,54,55,67,68,69,70,71,72,73,85,86,87,88,89,90,91,92,103,104,105,106,107,108,109,110],P=[121,122,123,124,125,126,127,128,129],k=[139,158,177,196,215,234,253],E=[138,156,174,192,210,228,246],J=[],N=[],C=[],F=new Array(v),L=function(){var n=Object(i.useState)([]),e=Object(h.a)(n,2),t=e[0],r=e[1],o=j([x]),c=Object(i.useState)(o),u=Object(h.a)(c,2),a=u[0],s=u[1];function f(n,e){var t="";return Array.isArray(e)?t:t="/images/"+e+".png"}function j(n,e){for(var i=n[0],r=n[1],o=0;o<i.length;o++)F[o]=f(0,i[o]);if(void 0!==r&&null!==r&&void 0!==e&&w.forEach((function(n){i[n]=r[w.indexOf(n)]})),t.length>=1)for(var c=0;c<t.length;c++)O-c-1>=O-b&&(i[O-c-1]=t[t.length-2-c]);var u=i.map((function(n,e){var t=function(n){var e="white";return e=P.includes(n)||k.includes(n)||E.includes(n)||J.includes(n)||N.includes(n)||C.includes(n)?"white":"#dbf7fd",n===O&&(e="#a4eefc"),e}(e);return Array.isArray(n)?F[e]="/blends/"+n[0]+n[1]+".png":F[e]="/images/"+n+".png",{img:F[e],key:e,onClick:function(t){return D(e,n,t)},fill:"",styles:{normal:{fill:t},hover:{fill:"#6cc7da"},active:{fill:"#779df1"}}}}));return u}function S(n){return new Promise((function(e,t){var i;fetch("/api/randomblendhexcodes/"+n+"?limit="+w.length.toString()).then((function(n){return n.json()})).then((function(n){return i=JSON.parse(n)})).then((function(){e(i)}))}))}function L(n){return new Promise((function(e,t){var i;fetch("/api/markovhexcodes/"+n+"?limit="+P.length.toString()).then((function(n){return n.json()})).then((function(n){return i=JSON.parse(n)})).then((function(){e(i)}))}))}function M(n,e){return new Promise((function(t,i){var r;fetch("/api/markovblendhexcodes/"+n+"?limit="+e.toString()).then((function(n){return n.json()})).then((function(n){return r=JSON.parse(n)})).then((function(){t(r)}))}))}function T(n,e){for(var i=t,o=0;o<e;o++)i.push(n),i.length>b+1&&i.shift();r(i)}function B(n,e){return new Promise((function(t,i){var r;fetch("/api/blendemojis/"+n+"/"+e).then((function(n){return n.json()})).then((function(){r=[n,e]})).then((function(){t(r)}))}))}var D=function(n,e,i){if(console.log(e+" was clicked. ID is "+n),n===O){var r="";r=Array.isArray(e)?"/blends/"+e[0]+e[1]+".png":"/images/"+e+".png",Object(d.saveAs)(r,"blend.png")}else T(e,1),Array.isArray(e)&&(e=e[1]),Promise.all([new Promise((function(n,e){var t;fetch("/api/randomhexcodes?limit="+v.toString()).then((function(n){return n.json()})).then((function(n){return t=JSON.parse(n)})).then((function(){n(t)}))})),S(e),L(e),B(e,t[t.length-2]),B(t[t.length-2],e),M(e,y.length),M(e,A.length)]).then((function(n){if(void 0!==n[1]&&null!==n[1]&&null!==n[2]&&void 0!==e&&(w.forEach((function(e){n[0][e]=n[1][w.indexOf(e)]})),P.forEach((function(e){n[0][e]=n[2][P.indexOf(e)]})),y.forEach((function(e){n[0][e]=n[5][y.indexOf(e)]})),A.forEach((function(e){n[0][e]=n[6][A.indexOf(e)]}))),n[0][100]=n[3],n[0][137]=n[4],t.length>=1){n[0][O]=t[t.length-1];for(var i=0;i<t.length;i++)O-i-1>=O-b&&(n[0][O-i-1]=t[t.length-1-i])}var r;new Promise((function(t,i){r=j(n,e),t()})).then((function(){s(r)})).catch((function(n){console.log("Something went wrong with the tilePromise."),console.error(n.message)}))})).catch((function(n){console.error(n.message)}))};return window.addEventListener("DOMContentLoaded",(function(n){var e;T(m.openmojis[3073].hexcode,b+1),fetch("/api/randomhexcodes?limit="+v.toString()).then((function(n){return n.json()})).then((function(n){return e=JSON.parse(n)})).then((function(){return o=j([e,[]])})).then((function(){return s(o)})).catch((function(n){console.log("Something went wrong with the randomhexcodes fetch request."),console.error(n.message)}))})),Object(g.jsx)(g.Fragment,{children:Object(g.jsx)(l.TiledHexagons,{tileSideLengths:60,tileGap:4,tileBorderRadii:9,maxHorizontal:p,tileTextStyles:{fontFamily:"Source Sans Pro",fontSize:"68px"},tiles:a,onLoad:function(){return D()}})})},M=function(n){Object(s.a)(t,n);var e=Object(f.a)(t);function t(){return Object(u.a)(this,t),e.apply(this,arguments)}return Object(a.a)(t,[{key:"render",value:function(){return Object(g.jsx)("div",{className:"App",children:Object(g.jsx)("div",{className:"content",children:Object(g.jsx)(L,{})})})}}]),t}(i.Component),T=M,B=function(n){n&&n instanceof Function&&t.e(3).then(t.bind(null,38)).then((function(e){var t=e.getCLS,i=e.getFID,r=e.getFCP,o=e.getLCP,c=e.getTTFB;t(n),i(n),r(n),o(n),c(n)}))};c.a.render(Object(g.jsx)(r.a.StrictMode,{children:Object(g.jsx)(T,{})}),document.getElementById("root")),B()}},[[37,1,2]]]);
//# sourceMappingURL=main.79d5931a.chunk.js.map