(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{17:function(e,n,t){},18:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);for(var o=t(1),i=t.n(o),r=t(6),c=t.n(r),s=(t(17),t(7)),a=t(8),l=t(12),u=t(11),f=(t(18),t(3)),h=t(9),d=t(10),p=t(0),g=t(30),m=(t(36),259),b=19,j=Math.ceil(13.631578947368421),O=Math.round(b*(j/4)+j/4*18)-Math.round(9.5),x=Math.ceil(9.5)-1,v=[],w=0;w<m;w++)v.push(g.openmojis[3073].hexcode);for(var y=[],S=0;S<m;S++)y.push(g.openmojis[3073].hexcode);var C=[100,137],A=[0,1,2,3,4,5,19,20,21,22,23,24,37,38,39,40,41,42,43,56,57,58,59,60,61,62,74,75,76,77,78,79,80,81,93,94,95,96,97,98,99,100].reverse(),E=[7,8,9,10,11,26,27,28,29,45,46,47,64,65,83].reverse(),k=[13,14,15,16,17,18,31,32,33,34,35,36,49,50,51,52,53,54,55,67,68,69,70,71,72,73,85,86,87,88,89,90,91,92,103,104,105,106,107,108,109,110].reverse(),P=[130,131,132,133,134,135,136,137,148,149,150,151,152,153,154,155,167,168,169,170,171,172,173,185,186,187,188,189,190,191,204,205,206,207,208,209,222,223,224,225,226,227,241,242,243,244,245],F=[157,175,176,193,194,195,211,212,213,214,229,230,231,232,233,247,248,249,250,251,252],N=[140,141,142,143,144,145,146,147,159,160,161,162,163,164,165,166,178,179,180,181,182,183,184,197,198,199,200,201,202,203,216,217,218,219,220,221,235,236,237,238,239,240,254,255,256,257,258],T=[121,122,123,124,125,126,127,128,129],L=[139,158,177,196,215,234,253],M=[138,156,174,192,210,228,246],B=[119,118,117,116,115,114,113,112,111],D=[101,82,63,44,25,6],I=[102,84,66,48,30,12],J=new Array(m),H=function(){var e=Object(o.useState)([]),n=Object(f.a)(e,2),t=n[0],i=n[1],r=w(v),c=Object(o.useState)(r),s=Object(f.a)(c,2),a=s[0],l=s[1],u=w(y,g.openmojis[3073].hexcode);function j(e,n){var t="";return Array.isArray(n)?t:t="/images/"+n+".png"}function w(e,n){for(var o=e,i=0;i<o.length;i++)J[i]=j(0,o[i]);if(t.length>=1)for(var r=0;r<t.length;r++)O-r-1>=O-x&&(o[O-r-1]=t[t.length-2-r]);console.log("tiles len "+o.length);var c=o.map((function(e,n){e&&0!==e.length||(e="2049");var t=function(e){var n="white";return n=T.includes(e)||L.includes(e)||M.includes(e)||B.includes(e)||D.includes(e)||I.includes(e)?"#dbf7fd":"white",e===O&&(n="#a4eefc"),n}(n);return Array.isArray(e)?J[n]="/blends/"+e[0]+e[1]+".png":J[n]="/images/"+e+".png",{img:J[n],key:n,onClick:function(t){return q(n,e,t)},fill:"",styles:{normal:{fill:t},hover:{fill:"#6cc7da"},active:{fill:"#779df1"}}}}));return c}function S(e,n){for(var o=t,r=0;r<n;r++)o.push(e),o.length>x+1&&o.shift();i(o)}function H(e,n,o){return new Promise((function(i,r){var c,s="";Array.isArray(e)?(s="&blendedwith="+e[0],e=e[1]):n.length>0&&(s="&blendedwith="+n),"1F504"!==t[t.length-2]&&(s=s+"&prev="+t[t.length-2]),console.log("/api/variety/"+e+"?limit="+o.toString()+s),fetch("/api/variety/"+e+"?limit="+o.toString()+s).then((function(e){return e.json()})).then((function(e){console.log(e),c=JSON.parse(e)})).then((function(){console.log(c)})).then((function(){i(c)})).catch((function(e){console.error(e.message)}))}))}var q=function(e,n,t){if(console.log(n+" was clicked. ID is "+e),e===O){var o="";o=Array.isArray(n)?"/blends/"+n[0]+n[1]+".png":"/images/"+n+".png",Object(d.saveAs)(o,"blend.png")}else if("1F504"!==n){S(n,1),l(u),console.log("Hex: "+n);Promise.all([H(n,"",m)]).then((function(e){console.log(e[0]);var t,o=y;A.forEach((function(n){o[n]=e[0][0][A.indexOf(n)]})),E.forEach((function(n){o[n]=e[0][1][E.indexOf(n)]})),k.forEach((function(n){o[n]=e[0][2][k.indexOf(n)]})),P.forEach((function(n){o[n]=e[0][3][P.indexOf(n)]})),F.forEach((function(n){o[n]=e[0][4][F.indexOf(n)]})),N.forEach((function(n){o[n]=e[0][5][N.indexOf(n)]})),T.forEach((function(n){o[n]=e[0][6][T.indexOf(n)]})),L.forEach((function(n){o[n]=e[0][7][L.indexOf(n)]})),M.forEach((function(n){o[n]=e[0][8][M.indexOf(n)]})),D.forEach((function(n){o[n]=e[0][9][D.indexOf(n)]})),I.forEach((function(n){o[n]=e[0][10][I.indexOf(n)]})),e[0][11].length>0&&C.forEach((function(n){o[n]=e[0][11][C.indexOf(n)]})),o[O]=n,new Promise((function(e,n){t=w(o),e()})).then((function(){l(t)})).catch((function(e){console.log("Something went wrong with the tilePromise."),console.error(e.message)}))})).catch((function(e){console.error(e.message)}))}};return window.addEventListener("DOMContentLoaded",(function(e){var n,t=document.querySelector(".App");t.scrollLeft=350,t.scrollTop=350,S(g.openmojis[3073].hexcode,x+1),fetch("/api/randomhexcodes?limit="+m.toString()).then((function(e){return e.json()})).then((function(e){return n=JSON.parse(e)})).then((function(){return r=w(n)})).then((function(){return l(r)})).catch((function(e){console.log("Something went wrong with the randomhexcodes fetch request."),console.error(e.message)}))})),Object(p.jsx)(p.Fragment,{children:Object(p.jsx)(h.TiledHexagons,{tileSideLengths:60,tileGap:4,tileBorderRadii:9,maxHorizontal:b,tileTextStyles:{fontFamily:"Source Sans Pro",fontSize:"68px"},tiles:a,onLoad:function(){return q()}})})},q=function(e){Object(l.a)(t,e);var n=Object(u.a)(t);function t(){return Object(s.a)(this,t),n.apply(this,arguments)}return Object(a.a)(t,[{key:"render",value:function(){return Object(p.jsx)("div",{className:"App",children:Object(p.jsx)("div",{className:"content",children:Object(p.jsx)(H,{})})})}}]),t}(o.Component),z=q,G=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,38)).then((function(n){var t=n.getCLS,o=n.getFID,i=n.getFCP,r=n.getLCP,c=n.getTTFB;t(e),o(e),i(e),r(e),c(e)}))};c.a.render(Object(p.jsxs)(i.a.StrictMode,{children:[Object(p.jsx)(z,{}),Object(p.jsxs)("p",{children:["This work includes data from ConceptNet 5, which was compiled by the Commonsense Computing Initiative. ",Object(p.jsx)("br",{}),"ConceptNet 5 is freely available under the Creative Commons Attribution-ShareAlike license (CC BY SA 4.0) from ",Object(p.jsx)("a",{href:"https://conceptnet.io",children:"ConceptNet"}),". ",Object(p.jsx)("br",{}),"The included data was created by contributors to Commonsense Computing projects, contributors to Wikimedia projects, Games with a Purpose, Princeton University's WordNet, ",Object(p.jsx)("br",{}),"DBPedia, OpenCyc, and Umbel."]}),Object(p.jsxs)("p",{children:["This work also uses the ",Object(p.jsx)("a",{href:"https://opus.nlpl.eu/OpenSubtitles-v1.php",children:"OpenSubtitle Corpus"})," which includes data from  ",Object(p.jsx)("a",{href:"http://www.opensubtitles.org/",children:"OpenSubtitles"}),"."]})]}),document.getElementById("root")),G()}},[[37,1,2]]]);
//# sourceMappingURL=main.110d8c51.chunk.js.map