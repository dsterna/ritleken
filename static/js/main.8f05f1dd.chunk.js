(this.webpackJsonpritleken=this.webpackJsonpritleken||[]).push([[0],{106:function(e,t,a){"use strict";a.r(t);a(90),a(91);var c=a(80),n=a(64),r=a.n(n),o=a(75),s=a(30),i=a(22),j=a(13),l=(a(93),a(43)),b=a(16),u=a(0),d=function(e){return{type:"ISHOSTCHANGER",payload:e}},O=function(e){return{type:"GAMECODECHANGER",payload:e}},f=a(24),p=a(172),h=a(165),m=a(68),x=a(166),y=a(164),v=a(163),g=a(162),S=a(173),C=a(158),E=a(168),k=a(175),N=a(169),A=a(171),R=a(170),w=a(108),H=(a(107),a(65));H.a.initializeApp({apiKey:"AIzaSyCam1vXotzoIfZT7DyTbF8XSnLe0he-Uto",authDomain:"adealbreaker-c9190.firebaseapp.com",databaseURL:"https://adealbreaker-c9190.firebaseio.com",projectId:"adealbreaker-c9190",storageBucket:"adealbreaker-c9190.appspot.com",messagingSenderId:"621961109952",appId:"1:621961109952:web:ae70fc224efd7b3cb8e825"});var D=H.a,_=a.p+"static/media/temp.1f0dee70.jpg",I=a(5);var M=function(e){var t=Object(f.c)((function(e){return e.name})),a=Object(f.b)();return Object(I.jsxs)(C.a,{maxWidth:"sm",className:"container",children:[Object(I.jsx)(g.a,{component:"img",alt:"Contemplative Reptile",height:"140",image:_,title:"tmep"}),Object(I.jsxs)(v.a,{children:[Object(I.jsx)(w.a,{gutterBottom:!0,variant:"h5",component:"h2",children:"Ritleken"}),Object(I.jsx)(w.a,{variant:"body2",color:"textSecondary",component:"p",children:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe non rem inventore repellendus est exercitationem nihil earum consequatur libero corrupti?"})]}),Object(I.jsxs)(y.a,{style:{display:"flex",justifyContent:"space-around"},children:[Object(I.jsx)(l.b,{to:"/join",children:Object(I.jsx)(h.a,{size:"small",color:"primary",onClick:function(){a(d(!1))},children:"Joina spel  "})}),Object(I.jsxs)(l.b,{to:"/lobby",children:[" ",Object(I.jsx)(h.a,{size:"small",color:"primary",onClick:function(){a(d(!0)),a(O(t.code))},children:"Skapa rum"})]})]})]})},T=function(e){var t=Object(f.c)((function(e){return e.name})),a=Object(f.c)((function(e){return e.game.isHost})),n=Object(f.c)((function(e){return e.game.gameCode})),d=Object(u.useState)([]),O=Object(j.a)(d,2),p=O[0],m=O[1],g=Object(u.useState)(t.userName),S=Object(j.a)(g,2),C=S[0],E=S[1],k=Object(u.useState)(!1),N=Object(j.a)(k,2),A=N[0],H=N[1],_=Object(b.f)(),M=Object(f.b)(),T=Object(b.g)(),z=Object(u.useState)({}),B=Object(j.a)(z,2),G=B[0],L=B[1],X=n&&D.firestore().collection("rooms").doc("".concat(n));Object(u.useEffect)((function(){var e;a&&X.set({}),X.update((e={},Object(s.a)(e,"players.".concat(t.code),Object(i.a)(Object(i.a)({},t),{},{isHost:a})),Object(s.a)(e,"gameStarted",!1),e))}),[]),Object(u.useEffect)((function(){var e=D.firestore().collection("rooms").doc("".concat(n)).onSnapshot((function(e){"/lobby"===T.pathname&&(null===e||void 0===e?void 0:e.data())&&Object.keys(e.data()).length&&(m(Object.values(e.data().players)),L(e.data().players),H(e.data().gameStarted))}));return function(){return e()}}),[]),Object(u.useEffect)((function(){(function(){var e=Object(o.a)(r.a.mark((function e(){var c,n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c=""!==C?C:"player-".concat(t.code),M({type:"NAMECHANGER",payload:c});try{X.update((n={},Object(s.a)(n,"players.".concat(t.code),Object(i.a)(Object(i.a)({},t),{},{userName:c,isHost:a})),Object(s.a)(n,"gameStarted",!1),n))}catch(r){}case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[C]);return Object(u.useEffect)((function(){A&&_.push("/write")}),[A]),Object(I.jsxs)(x.a,{className:"card-class",style:{padding:"1rem"},children:[Object(I.jsxs)(v.a,{children:[Object(I.jsxs)(w.a,{variant:"h5",component:"h2",children:["Lobby ",n]}),Object(I.jsx)("h3",{children:A?"Startad":"V\xe4ntar"}),Object(I.jsx)("ul",{children:p.map((function(e){return Object(I.jsx)("li",{children:e.userName},e.code)}))})]}),Object(I.jsx)(y.a,{}),Object(I.jsx)(R.a,{value:C,id:"outlined-basic",label:"Namn",variant:"outlined",onChange:function(e){E(e.target.value)}}),Object(I.jsxs)(y.a,{style:{display:"flex",justifyContent:"space-around"},children:[Object(I.jsxs)(l.b,{to:"/",children:["   ",Object(I.jsx)(h.a,{size:"small",color:"primary",onClick:function(){},children:"Avbryt "})]}),a&&Object(I.jsx)(h.a,{size:"small",color:"primary",onClick:function(){!function(){var e=p.length-1,t=G;p.forEach((function(e,a){for(var n=Object(c.a)(p).reverse(),r=0;r<a+1;r++)n.unshift(n.pop());t[e.code].order=n.map((function(e){return e.code})),t[e.code].ready=!1})),X.update({round:0,rounds:e+1,players:t})}(),X.update({gameStarted:!0})},children:" Starta  "})]})]})},z=function(e){var t=Object(u.useState)(""),a=Object(j.a)(t,2),c=a[0],n=a[1],r=D.firestore().collection("rooms"),o=Object(f.b)(),s=Object(b.f)(),i=Object(u.useState)(!1),d=Object(j.a)(i,2),m=d[0],g=d[1];return Object(I.jsxs)(x.a,{className:"card-class",style:{padding:"1rem"},children:[Object(I.jsx)(v.a,{children:Object(I.jsx)(w.a,{variant:"h5",component:"h2",children:"Joina spel"})}),Object(I.jsxs)("form",{onSubmit:function(e){e.preventDefault(),""!==c&&r.doc(c).get().then((function(e){e.exists?(o(O(c)),s.push("/lobby")):g(!0)}))},children:[Object(I.jsx)(y.a,{children:Object(I.jsx)(R.a,{value:c,id:"outlined-basic",label:"Anslutningskod",variant:"outlined",onChange:function(e){return n(e.target.value)}})}),Object(I.jsxs)(y.a,{style:{display:"flex",justifyContent:"space-around"},children:[Object(I.jsx)(l.b,{to:"/",children:Object(I.jsx)(h.a,{size:"small",color:"primary",onClick:function(){},children:"Avbryt "})}),Object(I.jsx)(h.a,{size:"small",color:"primary",type:"submit",children:"Hitta spel "}),Object(I.jsx)(k.a,{open:m,autoHideDuration:6e3,onClose:function(){g(!1)},children:Object(I.jsx)(p.a,{severity:"error",children:"Hittade ingets spel"})})]})]})]})},B=function(e){var t=Object(f.c)((function(e){return e.name.code})),a=Object(f.c)((function(e){return e.game.gameCode})),c=a&&D.firestore().collection("rooms").doc("".concat(a)),n=Object(u.useState)(99),r=Object(j.a)(n,2),o=r[0],i=r[1],l=Object(u.useState)([]),O=Object(j.a)(l,2),p=O[0],h=O[1],m=Object(u.useState)(""),x=Object(j.a)(m,2),g=x[0],k=x[1],N=Object(u.useState)(0),A=Object(j.a)(N,2),H=A[0],_=A[1],M=Object(u.useState)(0),T=Object(j.a)(M,2),z=T[0],B=T[1],G=Object(u.useState)(!1),L=Object(j.a)(G,2),X=L[0],U=L[1],F=Object(b.f)(),J=Object(b.g)();Object(u.useEffect)((function(){var e=c.onSnapshot((function(e){if("/write"===J.pathname&&e.data()){var t=e.data().players,a=e.data().round;h(t),_(a),B(Object.values(t).filter((function(e){return e.ready})).length),i(Object.values(t).length)}}));return function(){return e()}}),[]);var W=function(e){if(e.preventDefault(),""!==g){U(!0);var a=p[t];a.ready=!0,a[H]=g;var n={};n["players."+t]=a,c.update(n)}};return Object(u.useEffect)((function(){if(z===o){if(d){var e=p;Object.keys(p).forEach((function(t){return e[t].ready=!1})),c.update({round:H+1,players:e})}F.push("/draw")}}),[z]),Object(I.jsxs)(C.a,{maxWidth:"sm",className:"container",children:[Object(I.jsx)(v.a,{children:Object(I.jsx)(w.a,{gutterBottom:!0,variant:"h5",component:"h3",style:{marginBottom:0,textAlign:"center"},children:"Skriv ditt ord:"})}),Object(I.jsxs)(y.a,{style:Object(s.a)({display:"flex",justifyContent:"space-around"},"justifyContent","center"),children:[Object(I.jsxs)("form",{onSubmit:function(e){return W(e)},autoComplete:"off",children:[" ",Object(I.jsx)(R.a,{disabled:X,id:"standard-basic",label:"",value:g,onChange:function(e){k(e.target.value)}})]}),Object(I.jsx)("br",{})]}),Object(I.jsx)(y.a,{style:{display:"flex",justifyContent:"space-around"},children:Object(I.jsx)(E.a,{control:Object(I.jsx)(S.a,{checked:X,onChange:function(e){return W(e)},name:"checkedB",color:"primary",disabled:X}),label:"Redo (".concat(z,")")})})]})},G=function(){var e=Object(f.c)((function(e){return e.name.code})),t=Object(f.c)((function(e){return e.game.gameCode})),a=Object(u.useRef)(""),c=t&&D.firestore().collection("rooms").doc("".concat(t)),n=Object(u.useState)([]),r=Object(j.a)(n,2),o=r[0],i=r[1],l=Object(u.useState)(""),O=Object(j.a)(l,2),p=O[0],h=O[1],x=Object(u.useState)(""),g=Object(j.a)(x,2),k=g[0],N=g[1],A=Object(u.useState)(0),H=Object(j.a)(A,2),_=H[0],M=H[1],T=Object(u.useState)(0),z=Object(j.a)(T,2),B=z[0],G=z[1],L=Object(u.useState)(99),X=Object(j.a)(L,2),U=X[0],F=X[1],J=Object(u.useState)(!1),W=Object(j.a)(J,2),P=W[0],V=W[1],q=Object(u.useState)(!1),K=Object(j.a)(q,2),Y=K[0],Z=K[1],Q=Object(u.useState)(),$=Object(j.a)(Q,2),ee=$[0],te=$[1],ae=Object(b.f)(),ce=Object(b.g)();Object(u.useEffect)((function(){!0===Y&&(V(!1),G(0),N(""));var t=c.onSnapshot((function(t){if("/draw"===ce.pathname&&t.data()){var a=t.data().players,c=t.data().round;if(c===Object.values(a).length)ae.push("/done");else{i(a),M(c);var n=!(_%2!==0);G(Object.values(a).filter((function(e){return e.ready})).length),F(Object.values(a).length);var r=a[e].order[1];te(n),h(a[r][c-1])}}}));return Z(!1),function(){return t()}}),[Y]),Object(u.useEffect)((function(){if(p)if(ee)a.current.clear();else{var t=o[e].order[1];a.current.loadSaveData(o[t][_-1],!0)}}),[ee]);var ne=function(t){if(t.preventDefault(),""!==k||ee){V(!0);var n=o[e];n.ready=!0,n[_]=ee?a.current.getSaveData():k;var r={};r["players."+e]=n,c.update(r)}};return Object(u.useEffect)((function(){if(B===U){if(d){c.update({round:_+1});var e=o;Object.keys(o).forEach((function(t){return e[t].ready=!1})),c.update({round:_+1,players:e})}Z(!0)}}),[B]),Object(I.jsxs)(C.a,{maxWidth:"sm",className:"container",children:[Object(I.jsx)(v.a,{children:Object(I.jsx)(w.a,{gutterBottom:!0,variant:"h5",component:"h2",style:{textAlign:"center"},children:ee&&"Rita ".concat(p)})}),Object(I.jsx)(y.a,{style:Object(s.a)({display:"flex",justifyContent:"space-around"},"justifyContent","center"),children:Object(I.jsx)(m.a,{disabled:P||!ee,ref:a})}),!ee&&Object(I.jsx)(y.a,{style:Object(s.a)({display:"flex",justifyContent:"space-around"},"justifyContent","center"),children:Object(I.jsxs)("form",{onSubmit:function(e){return ne(e)},autoComplete:"off",children:[" ",Object(I.jsx)(R.a,{disabled:P,id:"standard-basic",label:"",value:k,onChange:function(e){N(e.target.value)}})]})}),Object(I.jsx)("br",{}),Object(I.jsx)(y.a,{style:{display:"flex",justifyContent:"space-around"},children:Object(I.jsx)(E.a,{control:Object(I.jsx)(S.a,{checked:P,onClick:function(e){return ne(e)},name:"checkedB",color:"primary",disabled:P}),label:"Redo (".concat(B,")")})})]})},L=function(e){var t=Object(u.useState)(3451),a=Object(j.a)(t,2),c=a[0],n=a[1],r=D.firestore().collection("rooms").doc("".concat(3451)),o=Object(u.useState)(),i=Object(j.a)(o,2),d=i[0],O=i[1],p=Object(u.useState)(),x=Object(j.a)(p,2),g=x[0],S=x[1],E=Object(f.b)(),k=Object(b.f)();Object(u.useEffect)((function(){r||k.push("/"),r.get().then((function(e){e.exists&&O(e.data().players)}))}),[]),Object(u.useEffect)((function(){if(d){var e=d,t=Object.entries(e).map((function(e){var t=Object(j.a)(e,2);return{key:t[0],val:t[1].order.indexOf(c)}})).sort((function(e,t){return e.val>t.val?1:t.val>e.val?-1:0}));S(t)}}),[d,c]);return Object(I.jsxs)(C.a,{maxWidth:"sm",className:"container",style:{marginTop:"3rem",marginBottom:"3rem"},children:[Object(I.jsx)(v.a,{children:Object(I.jsxs)("div",{children:[Object(I.jsx)(A.a,{onChange:function(e,t){n(t)},value:c,indicatorColor:"primary",textColor:"primary",centered:!0,children:Object.keys(d).map((function(e){return Object(I.jsx)(N.a,{label:d[e].userName,value:d[e].code})}))}),d&&Object(I.jsx)("h2",{style:{textAlign:"center",fontFamily:"Roboto"},children:d[c].code})]})}),g&&g.map((function(e,t){return Object(I.jsx)("div",{children:t%2===0?Object(I.jsx)("h2",{style:{textAlign:"center",fontFamily:"Roboto"},children:d[e.key][t]}):Object(I.jsx)("div",{style:Object(s.a)({display:"flex",justifyContent:"space-around"},"justifyContent","center"),children:Object(I.jsx)(m.a,{disabled:!0,saveData:d[e.key][t],hideInterface:!0})})})})),Object(I.jsx)(y.a,{style:{display:"flex",justifyContent:"space-around"},children:Object(I.jsxs)(l.b,{to:"/",children:[" ",Object(I.jsx)(h.a,{size:"small",color:"primary",onClick:function(){r&&(r.delete(),E({type:"NAMECODECHANGER"}))},children:"Tillbaka"})]})})]})},X=function(){return Object(I.jsx)("div",{children:Object(I.jsx)(l.a,{children:Object(I.jsx)("div",{className:"wapper",children:Object(I.jsxs)(b.c,{children:[Object(I.jsx)(b.a,{exact:!0,path:"/lobby",children:Object(I.jsx)(T,{})}),Object(I.jsx)(b.a,{exact:!0,path:"/join",children:Object(I.jsx)(z,{})}),Object(I.jsx)(b.a,{exact:!0,path:"/write",children:Object(I.jsx)(B,{})}),Object(I.jsx)(b.a,{exact:!0,path:"/draw",children:Object(I.jsx)(G,{})}),Object(I.jsx)(b.a,{exact:!0,path:"/done",children:Object(I.jsx)(L,{})}),Object(I.jsx)(b.a,{path:"/",children:Object(I.jsx)(M,{})})]})})})})},U=a(12),F=a.n(U),J=a(59),W=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{gameCode:"",isHost:!0,nrOfPlayers:2},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GAMECODECHANGER":return Object(i.a)(Object(i.a)({},e),{},{gameCode:t.payload});case"ISHOSTCHANGER":return Object(i.a)(Object(i.a)({},e),{},{isHost:t.payload});case"SETNUMBEROFPLAYERS":return Object(i.a)(Object(i.a)({},e),{},{nrOfPlayers:t.payload});default:return e}},P=Math.floor(1e3+9e3*Math.random()),V=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{code:P,userName:"spelare-".concat(P)},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"NAMECHANGER":return Object(i.a)(Object(i.a)({},e),{},{userName:t.payload});case"NAMECODECHANGER":var a=Math.floor(1e3+9e3*Math.random());return Object(i.a)(Object(i.a)({},e),{},{code:a});default:return e}},q=Object(J.a)({name:V,game:W}),K=Object(J.b)(q,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());F.a.render(Object(I.jsx)(f.a,{store:K,children:Object(I.jsx)(X,{})}),document.getElementById("root"))},90:function(e,t,a){},93:function(e,t,a){}},[[106,1,2]]]);
//# sourceMappingURL=main.8f05f1dd.chunk.js.map