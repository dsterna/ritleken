(this.webpackJsonpritleken=this.webpackJsonpritleken||[]).push([[0],{61:function(e,t,c){},63:function(e,t,c){},74:function(e,t,c){"use strict";c.r(t);c(61),c(62);var a=c(38),n=c(18),r=c(45),o=(c(63),c(33)),i=c(14),s=c(0),l=function(e){return{type:"ISHOSTCHANGER",payload:e}},j=function(e){return{type:"GAMECODECHANGER",payload:e}},b=c(24),d=c(118),u=c(109),O=c(115),p=c(113),h=c(116),m=c(117),f=c(114),x=(c(75),c(49));x.a.initializeApp({apiKey:"AIzaSyCam1vXotzoIfZT7DyTbF8XSnLe0he-Uto",authDomain:"adealbreaker-c9190.firebaseapp.com",databaseURL:"https://adealbreaker-c9190.firebaseio.com",projectId:"adealbreaker-c9190",storageBucket:"adealbreaker-c9190.appspot.com",messagingSenderId:"621961109952",appId:"1:621961109952:web:ae70fc224efd7b3cb8e825"});var y=x.a,v=c.p+"static/media/temp.1f0dee70.jpg",g=c(6);var C=function(e){var t=Object(s.useState)([]),c=Object(r.a)(t,2),l=c[0],j=c[1],h=Object(b.c)((function(e){return e.name})),x=Object(b.c)((function(e){return e.game.isHost})),v=Object(b.c)((function(e){return e.game.gameCode})),C=Object(i.f)(),E=Object(s.useState)(h.userName),N=Object(r.a)(E,2),S=N[0],k=N[1],A=Object(b.b)();Object(s.useEffect)((function(){""===v?C.push("/"):y.firestore().collection("rooms").doc("".concat(v)).set(Object(a.a)({},h.code,Object(n.a)(Object(n.a)({},h),{},{isHost:!0})),{merge:!0}).then((function(){return function(){var e=y.firestore().collection("rooms").doc("".concat(v)).onSnapshot((function(e){e.data()&&j(Object.values(e.data()))}));return function(){return e()}}()}))}),[v,C,h]);return Object(g.jsxs)(u.a,{className:"card-class",style:{padding:"1rem"},children:[Object(g.jsxs)(p.a,{children:[Object(g.jsxs)(f.a,{variant:"h5",component:"h2",children:["Lobby ",v]}),Object(g.jsx)("ul",{children:l.map((function(e){return Object(g.jsx)("li",{children:e.userName},e.code)}))})]}),Object(g.jsx)(O.a,{}),Object(g.jsx)("form",{onSubmit:function(e){return function(e){e.preventDefault(),A({type:"NAMECHANGER",payload:S}),y.firestore().collection("rooms").doc("".concat(v)).update(Object(a.a)({},h.code,Object(n.a)(Object(n.a)({},h),{},{userName:S})))}(e)},children:Object(g.jsx)(m.a,{value:S,id:"outlined-basic",label:"Namn",variant:"outlined",onChange:function(e){return k(e.target.value)}})}),Object(g.jsxs)(O.a,{style:{display:"flex",justifyContent:"space-around"},children:[Object(g.jsx)(d.a,{size:"small",color:"primary",onClick:function(){},children:Object(g.jsx)(o.b,{to:"/",children:"Avbryt"})}),x&&l.length>1&&Object(g.jsx)(d.a,{size:"small",color:"primary",onClick:function(){},children:" Starta  "})]})]})},E=function(e){var t=Object(s.useState)(1234),c=Object(r.a)(t,2),a=c[0],n=c[1],i=Object(b.b)();return Object(g.jsxs)(u.a,{className:"card-class",style:{padding:"1rem"},children:[Object(g.jsx)(p.a,{children:Object(g.jsx)(f.a,{variant:"h5",component:"h2",children:"Joina spel"})}),Object(g.jsx)(O.a,{children:Object(g.jsx)(m.a,{value:a,id:"outlined-basic",label:"Anslutningskod",variant:"outlined",onChange:function(e){return n(e.target.value)}})}),Object(g.jsxs)(O.a,{style:{display:"flex",justifyContent:"space-around"},children:[Object(g.jsx)(d.a,{size:"small",color:"primary",onClick:function(){},children:Object(g.jsx)(o.b,{to:"/",children:"Avbryt"})}),Object(g.jsx)(d.a,{size:"small",color:"primary",onClick:function(){i(j(a))},children:Object(g.jsx)(o.b,{to:"/lobby",children:"Hitta spel"})})]})]})},N=function(e){var t=Object(b.c)((function(e){return e.name})),c=Object(b.b)();return Object(g.jsxs)(u.a,{className:"card-class",children:[Object(g.jsx)(h.a,{component:"img",alt:"Contemplative Reptile",height:"140",image:v,title:"tmep"}),Object(g.jsxs)(p.a,{children:[Object(g.jsx)(f.a,{gutterBottom:!0,variant:"h5",component:"h2",children:"Ritleken"}),Object(g.jsx)(f.a,{variant:"body2",color:"textSecondary",component:"p",children:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe non rem inventore repellendus est exercitationem nihil earum consequatur libero corrupti?"})]}),Object(g.jsxs)(O.a,{style:{display:"flex",justifyContent:"space-around"},children:[Object(g.jsx)(d.a,{size:"small",color:"primary",onClick:function(){c(l(!1))},children:Object(g.jsx)(o.b,{to:"/join",children:"Joina spel"})}),Object(g.jsx)(d.a,{size:"small",color:"primary",onClick:function(){c(l(!0)),c(j(t.code))},children:Object(g.jsx)(o.b,{to:"/lobby",children:"Skapa rum"})})]})]})},S=function(){return Object(g.jsx)("div",{children:Object(g.jsx)(o.a,{children:Object(g.jsx)("div",{className:"wapper",children:Object(g.jsxs)(i.c,{children:[Object(g.jsx)(i.a,{exact:!0,path:"/lobby",children:Object(g.jsx)(C,{})}),Object(g.jsx)(i.a,{exact:!0,path:"/join",children:Object(g.jsx)(E,{})}),Object(g.jsx)(i.a,{path:"/",children:Object(g.jsx)(N,{})})]})})})})},k=c(10),A=c.n(k),H=c(44),_=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{gameCode:"",isHost:!1},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GAMECODECHANGER":return console.log("hejsan dag, det \xe4r real deal ",t.payload),Object(n.a)(Object(n.a)({},e),{},{gameCode:t.payload});case"ISHOSTCHANGER":return Object(n.a)(Object(n.a)({},e),{},{isHost:t.payload});default:return e}},R=Math.floor(1e3+9e3*Math.random()),w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{code:R,userName:"spelare-".concat(R)},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"NAMECHANGER":return Object(n.a)(Object(n.a)({},e),{},{userName:t.payload});default:return e}},I=Object(H.a)({name:w,game:_}),z=Object(H.b)(I,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());A.a.render(Object(g.jsx)(b.a,{store:z,children:Object(g.jsx)(S,{})}),document.getElementById("root"))}},[[74,1,2]]]);
//# sourceMappingURL=main.9a0e08fa.chunk.js.map