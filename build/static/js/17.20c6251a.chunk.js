(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{1210:function(e,t,a){},1211:function(e,t,a){},1212:function(e,t,a){},1213:function(e,t,a){"use strict";var n=a(168);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=n(a(2)),r=(0,n(a(387)).default)(c.default.createElement("path",{d:"M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"}),"Chat");t.default=r},1214:function(e,t,a){},1370:function(e,t,a){"use strict";a.r(t);var n=a(54),c=a(2),r=a.n(c),l=a(204),s=a(205),u=a(29),i=a(28),o=(a(163),a(202)),m=(a(1210),a(5)),d=a.n(m),f=a(13),h=a(10),E=(a(1211),a(1341)),v=a(1213),p=a.n(v),b=(a(1212),function(e){var t=e.id,a=e.name,n=e.setchatId,c=e.email;return r.a.createElement("div",{onClick:function(){return n(t)},className:"sidebarChat"},r.a.createElement("div",{className:"sidebar_chat_info"},r.a.createElement("h2",null,a),r.a.createElement("p",null,c)))}),j=a(525),O=function(e){var t=e.setchatId,a=Object(u.d)(function(e){return e.auth.user.result.userExist}),l=Object(c.useState)([]),s=Object(n.a)(l,2),o=s[0],m=s[1],v=Object(c.useState)(!1),O=Object(n.a)(v,2),g=O[0],_=O[1],N=Object(c.useState)(""),y=Object(n.a)(N,2);y[0],y[1];Object(c.useEffect)(function(){w()},[]);var S=function(){_(!g)},w=function(){var e=Object(h.a)(d.a.mark(function e(){return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.firestore().collection("users").where("schoolId","==",a._id).onSnapshot(function(e){e.forEach(function(e){m(function(t){return[].concat(Object(f.a)(t),[{id:e.id,data:e.data()}])})})});case 2:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"sidebar"},r.a.createElement("div",{className:"sidebar_header"},r.a.createElement("h5",{style:{padding:10}},"Chats"),r.a.createElement("div",{className:"sidebar_headerRight"},r.a.createElement(E.a,{onClick:S},r.a.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"}},r.a.createElement("p",{style:{marginBottom:0,fontSize:13,fontWeight:"bold"}},"Send To All"),r.a.createElement(p.a,null))))),r.a.createElement("div",{className:"sidebar_chats"},o.map(function(e){return r.a.createElement(b,{key:e.id,id:e.id,name:e.data.name,email:e.data.email,setchatId:t})})),r.a.createElement(j.a,{modal:g,toggle:S}))},g=(a(1214),function(e){var t=e.chatId,a=Object(c.useState)(""),l=Object(n.a)(a,2),s=l[0],o=l[1],m=Object(c.useState)(""),d=Object(n.a)(m,2),f=d[0],h=d[1],E=Object(c.useState)([]),v=Object(n.a)(E,2),p=v[0],b=v[1],j=Object(u.d)(function(e){return e.auth.user.result.userExist}),O=Object(c.useRef)(null);Object(c.useEffect)(function(){O.current.scrollIntoView({behavior:"smooth"})},[p]),Object(c.useEffect)(function(){t&&(i.a.firestore().collection("users").doc(t).onSnapshot(function(e){h(e.data().name)}),i.a.firestore().collection("users").doc(t).collection("messages").orderBy("createdAt","asc").onSnapshot(function(e){return b(e.docs.map(function(e){return e.data()}))}))},[t]);return r.a.createElement("div",{className:"chat"},r.a.createElement("div",{className:"chat_header"},r.a.createElement("div",{className:"chat_headerInfo"},r.a.createElement("h6",null,f))),r.a.createElement("div",{className:"chat_body"},p.map(function(e){return r.a.createElement("p",{className:"chat_message ".concat(e.name===j.name&&"chat_reciever")},e.message,r.a.createElement("p",{style:{padding:3,fontSize:9,fontWeight:"normal",textAlign:e.name===j.name?"right":"left"}},Intl.DateTimeFormat("en-US",{hour:"2-digit",minute:"2-digit"}).format(1e3*e.createdAt.seconds)))}),r.a.createElement("div",{ref:O})),r.a.createElement("div",{className:"chat_footer"},r.a.createElement("form",null,r.a.createElement("input",{value:s,placeholder:"type a message",type:"text",onChange:function(e){return o(e.target.value)}}),r.a.createElement("button",{onClick:function(e){e.preventDefault(),i.a.firestore().collection("users").doc(t).collection("messages").add({message:s,name:j.name,createdAt:i.a.firestore.Timestamp.fromDate(new Date)}),o("")},type:"submit"},"send message"))))});t.default=function(){var e=Object(c.useState)(""),t=Object(n.a)(e,2),a=t[0],i=t[1],m=Object(u.d)(function(e){return e.auth.user.result.userExist});return console.log("userss",m),r.a.createElement("div",null,r.a.createElement(c.Fragment,null,r.a.createElement(o.a,null),r.a.createElement(l.a,null),r.a.createElement("div",{className:"app-main"},r.a.createElement(s.a,null),r.a.createElement("div",{className:"app-main__outer"},r.a.createElement("div",{className:"app-main__inner"},r.a.createElement("div",{className:"app"},r.a.createElement(O,{setchatId:i}),a?r.a.createElement(g,{chatId:a}):null))))))}},344:function(e,t,a){"use strict";a.r(t);var n=a(373);a.d(t,"default",function(){return n.a})},387:function(e,t,a){"use strict";var n=a(168);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var a=r.default.memo(r.default.forwardRef(function(t,a){return r.default.createElement(l.default,(0,c.default)({ref:a},t),e)}));0;return a.muiName=l.default.muiName,a};var c=n(a(386)),r=n(a(2)),l=n(a(344))}}]);
//# sourceMappingURL=17.20c6251a.chunk.js.map