(this.webpackJsonpritleken=this.webpackJsonpritleken||[]).push([[0],{77:function(e,t,a){},80:function(e,t,a){},93:function(e,t,a){"use strict";a.r(t);a(77),a(78);var c=a(45),n=a.n(c),r=a(29),o=a(21),s=a(54),i=a(18),l=(a(80),a(39)),j=a(14),u=a(0),b=function(e){return{type:"ISHOSTCHANGER",payload:e}},d=function(e){return{type:"GAMECODECHANGER",payload:e}},O=a(22),p=a(138),f=a(67),h=a(139),m=a(137),x=a(136),y=a(135),v=a(142),g=a(131),S=a(140),C=a(141),E=a(95),k=(a(94),a(55));k.a.initializeApp({apiKey:"AIzaSyCam1vXotzoIfZT7DyTbF8XSnLe0he-Uto",authDomain:"adealbreaker-c9190.firebaseapp.com",databaseURL:"https://adealbreaker-c9190.firebaseio.com",projectId:"adealbreaker-c9190",storageBucket:"adealbreaker-c9190.appspot.com",messagingSenderId:"621961109952",appId:"1:621961109952:web:ae70fc224efd7b3cb8e825"});var N=k.a,w=a.p+"static/media/temp.1f0dee70.jpg",A=a(5);var R=function(e){var t=Object(O.c)((function(e){return e.name})),a=Object(O.b)();return Object(A.jsxs)(g.a,{maxWidth:"sm",className:"container",children:[Object(A.jsx)(y.a,{component:"img",alt:"Contemplative Reptile",height:"140",image:w,title:"tmep"}),Object(A.jsxs)(x.a,{children:[Object(A.jsx)(E.a,{gutterBottom:!0,variant:"h5",component:"h2",children:"Ritleken"}),Object(A.jsx)(E.a,{variant:"body2",color:"textSecondary",component:"p",children:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe non rem inventore repellendus est exercitationem nihil earum consequatur libero corrupti?"})]}),Object(A.jsxs)(m.a,{style:{display:"flex",justifyContent:"space-around"},children:[Object(A.jsx)(l.b,{to:"/join",children:Object(A.jsx)(p.a,{size:"small",color:"primary",onClick:function(){a(b(!1))},children:"Joina spel  "})}),Object(A.jsxs)(l.b,{to:"/lobby",children:[" ",Object(A.jsx)(p.a,{size:"small",color:"primary",onClick:function(){a(b(!0)),a(d(t.code))},children:"Skapa rum"})]})]})]})},H=function(e){var t=Object(O.c)((function(e){return e.name})),a=Object(O.c)((function(e){return e.game.isHost})),c=Object(O.c)((function(e){return e.game.gameCode})),b=Object(u.useState)([]),d=Object(i.a)(b,2),f=d[0],y=d[1],v=Object(u.useState)(t.userName),g=Object(i.a)(v,2),S=g[0],k=g[1],w=Object(u.useState)(!1),R=Object(i.a)(w,2),H=R[0],_=R[1],D=Object(j.f)(),I=Object(O.b)(),z=Object(u.useState)({}),B=Object(i.a)(z,2),T=B[0],G=B[1],L=c&&N.firestore().collection("rooms").doc("".concat(c));Object(u.useEffect)((function(){function e(){return(e=Object(s.a)(n.a.mark((function e(){var t;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=N.firestore().collection("rooms").doc("".concat(c)).onSnapshot((function(e){e.data()&&(y(Object.values(e.data().players)),G(e.data().players)),_(e.data().gameStarted)})),e.abrupt("return",(function(){return t()}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var i;""===c?D.push("/"):(a&&L.set({}),L.update((i={},Object(r.a)(i,"players.".concat(t.code),Object(o.a)(Object(o.a)({},t),{},{isHost:a})),Object(r.a)(i,"gameStarted",!1),i)).then((function(){return function(){return e.apply(this,arguments)}()})))}),[]),Object(u.useEffect)((function(){(function(){var e=Object(s.a)(n.a.mark((function e(){var c,s;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c=""!==S?S:"player-".concat(t.code),I({type:"NAMECHANGER",payload:c});try{L.update((s={},Object(r.a)(s,"players.".concat(t.code),Object(o.a)(Object(o.a)({},t),{},{userName:c,isHost:a})),Object(r.a)(s,"gameStarted",!1),s))}catch(n){}case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[S]);return Object(u.useEffect)((function(){H&&D.push("/write")}),[H]),Object(A.jsxs)(h.a,{className:"card-class",style:{padding:"1rem"},children:[Object(A.jsxs)(x.a,{children:[Object(A.jsxs)(E.a,{variant:"h5",component:"h2",children:["Lobby ",c]}),Object(A.jsx)("h3",{children:H?"Startad":"V\xe4ntar"}),Object(A.jsx)("ul",{children:f.map((function(e){return Object(A.jsx)("li",{children:e.userName},e.code)}))})]}),Object(A.jsx)(m.a,{}),Object(A.jsx)(C.a,{value:S,id:"outlined-basic",label:"Namn",variant:"outlined",onChange:function(e){k(e.target.value)}}),Object(A.jsxs)(m.a,{style:{display:"flex",justifyContent:"space-around"},children:[Object(A.jsxs)(l.b,{to:"/",children:["   ",Object(A.jsx)(p.a,{size:"small",color:"primary",onClick:function(){},children:"Avbryt "})]}),a&&Object(A.jsx)(p.a,{size:"small",color:"primary",onClick:function(){!function(){var e=f.length-1,t=T;f.forEach((function(a,c){t[a.code].order=f.map((function(t,a){return f[c+a>e?a+c-e-1:c+a].code})),t[a.code].ready=!1})),L.update({round:0,rounds:e+1,players:t})}(),L.update({gameStarted:!0})},children:" Starta  "})]})]})},_=function(e){var t=Object(u.useState)(""),a=Object(i.a)(t,2),c=a[0],n=a[1],r=Object(O.b)();return Object(A.jsxs)(h.a,{className:"card-class",style:{padding:"1rem"},children:[Object(A.jsx)(x.a,{children:Object(A.jsx)(E.a,{variant:"h5",component:"h2",children:"Joina spel"})}),Object(A.jsx)(m.a,{children:Object(A.jsx)(C.a,{value:c,id:"outlined-basic",label:"Anslutningskod",variant:"outlined",onChange:function(e){return n(e.target.value)}})}),Object(A.jsxs)(m.a,{style:{display:"flex",justifyContent:"space-around"},children:[Object(A.jsx)(l.b,{to:"/",children:Object(A.jsx)(p.a,{size:"small",color:"primary",onClick:function(){},children:"Avbryt "})}),Object(A.jsx)(l.b,{to:"/lobby",children:Object(A.jsx)(p.a,{size:"small",color:"primary",onClick:function(){r(d(c))},children:"Hitta spel "})})]})]})},D=function(e){var t=Object(O.c)((function(e){return e.name.code})),a=Object(O.c)((function(e){return e.game.gameCode})),c=a&&N.firestore().collection("rooms").doc("".concat(a)),n=Object(u.useState)(99),o=Object(i.a)(n,2),s=o[0],l=o[1],d=Object(u.useState)([]),p=Object(i.a)(d,2),f=p[0],h=p[1],y=Object(u.useState)(""),k=Object(i.a)(y,2),w=k[0],R=k[1],H=Object(u.useState)(0),_=Object(i.a)(H,2),D=_[0],I=_[1],z=Object(u.useState)(0),B=Object(i.a)(z,2),T=B[0],G=B[1],L=Object(u.useState)(!1),M=Object(i.a)(L,2),X=M[0],P=M[1],U=Object(j.f)();Object(u.useEffect)((function(){var e=c.onSnapshot((function(e){e.data()&&(h(e.data().players),I(e.data().round),G(Object.values(e.data().players).filter((function(e){return e.ready})).length),l(Object.values(e.data().players).length))}));return function(){return e()}}),[]);var J=function(e){if(e.preventDefault(),""!==w){P(!0);var a=f[t];a.ready=!0,a[D]=w;var n={};n["players."+t]=a,c.update(n)}};return Object(u.useEffect)((function(){console.log("nrOfReady",T),console.log("nrOfPlayers",s),T===s&&(b&&c.update({round:D+1}),U.push("/draw"))}),[T]),Object(A.jsxs)(g.a,{maxWidth:"sm",className:"container",children:[Object(A.jsx)(x.a,{children:Object(A.jsx)(E.a,{gutterBottom:!0,variant:"h5",component:"h3",style:{marginBottom:0,textAlign:"center"},children:"Skriv ditt ord:"})}),Object(A.jsxs)(m.a,{style:Object(r.a)({display:"flex",justifyContent:"space-around"},"justifyContent","center"),children:[Object(A.jsxs)("form",{onSubmit:function(e){return J(e)},children:[" ",Object(A.jsx)(C.a,{disabled:X,id:"standard-basic",label:"",value:w,onChange:function(e){R(e.target.value)}})]}),Object(A.jsx)("br",{})]}),Object(A.jsx)(m.a,{style:{display:"flex",justifyContent:"space-around"},children:Object(A.jsx)(S.a,{control:Object(A.jsx)(v.a,{checked:X,onChange:function(e){return J(e)},name:"checkedB",color:"primary",disabled:X}),label:"Redo (".concat(T,")")})})]})},I=function(e){var t=Object(O.c)((function(e){return e.name.code})),a=(Object(O.c)((function(e){return e.game.nrOfPlayers})),Object(O.c)((function(e){return e.game.gameCode}))),c=a&&N.firestore().collection("rooms").doc("".concat(a)),n=Object(u.useState)([]),o=Object(i.a)(n,2),s=o[0],l=o[1],b=Object(u.useState)(""),d=Object(i.a)(b,2),p=d[0],h=d[1],y=Object(u.useState)(""),C=Object(i.a)(y,2),k=C[0],w=(C[1],Object(u.useState)(0)),R=Object(i.a)(w,2),H=R[0],_=R[1],D=Object(u.useState)(0),I=Object(i.a)(D,2),z=I[0],B=I[1],T=Object(u.useState)(!1),G=Object(i.a)(T,2),L=G[0],M=G[1];Object(j.f)();Object(u.useEffect)((function(){var e=c.onSnapshot((function(e){if(e.data()){var a=e.data().players,c=e.data().round;l(a),_(c),B(Object.values(a).filter((function(e){return e.ready})).length);var n=a[t].order[c];console.log(a),console.log(c),console.log(n),console.log(a[n][H-1]),h(a[n][H-1])}}));return function(){return e()}}),[]);return Object(A.jsxs)(g.a,{maxWidth:"sm",className:"container",children:[Object(A.jsx)(x.a,{children:Object(A.jsx)(E.a,{gutterBottom:!0,variant:"h5",component:"h2",style:{textAlign:"center"},children:"Rita ".concat(p)})}),Object(A.jsxs)(m.a,{style:Object(r.a)({display:"flex",justifyContent:"space-around"},"justifyContent","center"),children:[" ",Object(A.jsx)(f.a,{})]}),Object(A.jsx)("br",{}),Object(A.jsx)(m.a,{style:{display:"flex",justifyContent:"space-around"},children:Object(A.jsx)(S.a,{control:Object(A.jsx)(v.a,{checked:L,onClick:function(e){return function(e){e.preventDefault(),M(!0);var a=s[t];a.ready=!0,a[H]=k;var n={};n["players."+t]=a,c.update(n)}(e)},name:"checkedB",color:"primary",disabled:L}),label:"Redo (".concat(z,")")})})]})},z=function(){return Object(A.jsx)("div",{children:Object(A.jsx)(l.a,{children:Object(A.jsx)("div",{className:"wapper",children:Object(A.jsxs)(j.c,{children:[Object(A.jsx)(j.a,{exact:!0,path:"/lobby",children:Object(A.jsx)(H,{})}),Object(A.jsx)(j.a,{exact:!0,path:"/join",children:Object(A.jsx)(_,{})}),Object(A.jsx)(j.a,{exact:!0,path:"/draw",children:Object(A.jsx)(I,{})}),Object(A.jsx)(j.a,{exact:!0,path:"/write",children:Object(A.jsx)(D,{})}),Object(A.jsx)(j.a,{path:"/",children:Object(A.jsx)(R,{})})]})})})})},B=a(11),T=a.n(B),G=a(51),L=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{gameCode:"",isHost:!0,nrOfPlayers:2},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GAMECODECHANGER":return Object(o.a)(Object(o.a)({},e),{},{gameCode:t.payload});case"ISHOSTCHANGER":return Object(o.a)(Object(o.a)({},e),{},{isHost:t.payload});case"SETNUMBEROFPLAYERS":return Object(o.a)(Object(o.a)({},e),{},{nrOfPlayers:t.payload});default:return e}},M=Math.floor(1e3+9e3*Math.random()),X=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{code:M,userName:"spelare-".concat(M)},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"NAMECHANGER":return Object(o.a)(Object(o.a)({},e),{},{userName:t.payload});default:return e}},P=Object(G.a)({name:X,game:L}),U=Object(G.b)(P,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());T.a.render(Object(A.jsx)(O.a,{store:U,children:Object(A.jsx)(z,{})}),document.getElementById("root"))}},[[93,1,2]]]);
//# sourceMappingURL=main.795c0e04.chunk.js.map