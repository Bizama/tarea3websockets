(function(t){function e(e){for(var i,s,r=e[0],l=e[1],c=e[2],p=0,f=[];p<r.length;p++)s=r[p],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&f.push(a[s][0]),a[s]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);u&&u(e);while(f.length)f.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],i=!0,r=1;r<n.length;r++){var l=n[r];0!==a[l]&&(i=!1)}i&&(o.splice(e--,1),t=s(s.s=n[0]))}return t}var i={},a={app:0},o=[];function s(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=i,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(n,i,function(e){return t[e]}.bind(null,i));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/tarea3websockets/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var u=l;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"31f2":function(t,e,n){"use strict";n("ebce")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("HelloWorld")],1)},o=[],s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h1",[t._v("Websocket Airlines Information")]),n("div",{staticClass:"ambos"},[n("div",[n("ul",{ref:"chatbox",staticClass:"chatbox-container",attrs:{id:"chatbox"}},t._l(t.messages,(function(e){return n("li",{key:e.name,staticClass:"list"},[t._v(" "+t._s(e.name)+"("+t._s(e.date)+"): "+t._s(e.message)+" ")])})),0),""!=this.nickname?n("form",{staticClass:"chatbox-bottom",on:{submit:function(e){return e.preventDefault(),t.sendMessage(e)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.message,expression:"message"}],staticClass:"chatbox-input",attrs:{type:"text",placeholder:"Message..."},domProps:{value:t.message},on:{input:function(e){e.target.composing||(t.message=e.target.value)}}}),n("input",{attrs:{type:"submit",value:"Send"}})]):n("form",{on:{submit:function(e){return e.preventDefault(),t.changeNickname(e)}}},[n("span",[t._v("Introduzca un nickname para chatear")]),n("br"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.nickname_aux,expression:"nickname_aux"}],staticClass:"chatbox-input",attrs:{type:"text",placeholder:"Escriba su nickname..."},domProps:{value:t.nickname_aux},on:{input:function(e){e.target.composing||(t.nickname_aux=e.target.value)}}}),n("input",{attrs:{type:"submit",value:"Ingresar"}})])]),n("div",{staticClass:"mapbox-container"},[n("l-map",{ref:"myMap",attrs:{"min-zoom":4,"v-model":t.zoom,center:[-33.8,-70.803203]},model:{value:t.zoom,callback:function(e){t.zoom=e},expression:"zoom"}},[n("LTileLayer",{attrs:{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}}),t._l(t.airports,(function(t,e){return n("l-circle-marker",{key:"ai-"+e,attrs:{"lat-lng":t,color:"#e80911"}})})),t._l(t.planes,(function(e,i){return n("l-circle-marker",{key:"pls-"+i,attrs:{"lat-lng":e.position,radius:9}},[n("l-tooltip",{attrs:{options:{permanent:!1,interactive:!0}}},[t._v(" "+t._s(e.code)+" ")])],1)})),t._l(t.theoricalPath,(function(t,e){return n("LPolyline",{key:"p-"+e,attrs:{"lat-lngs":t.latlngs,color:t.color}})})),t._l(t.actualPath,(function(t,e){return n("LPolyline",{key:"l-"+e,attrs:{"lat-lngs":t.latlngs,color:t.color}})}))],2)],1)]),n("div",{staticStyle:{"margin-top":"32px"}},[n("button",{on:{click:t.getFlights}},[t._v("Obtener informacion de vuelos")]),n("div",{staticClass:"flights-info"},t._l(t.flights[0],(function(t){return n("li",{key:t.code},[n("flights-info",{attrs:{flight_list:t}})],1)})),0)])])},r=[],l=n("2909"),c=(n("d81d"),n("d3b7"),n("6062"),n("3ca3"),n("ddb0"),n("0481"),n("8e27")),u=n.n(c),p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"information-box"},[n("div",[n("span",[t._v(t._s(t.flight_list["code"]))])]),n("div",[n("span",[t._v(t._s(t.flight_list["airline"]))])]),n("div",[n("span",[t._v(t._s(t.flight_list["plane"]))])]),n("div",[n("span",[t._v("Pasajeros: ")]),t._l(t.flight_list["passengers"],(function(e){return n("li",{key:e},[n("ul",[t._v(t._s(e.name)+" - "+t._s(e.age))])])}))],2),n("div",[n("span",[t._v("Origen: "+t._s(t.flight_list["origin"]))]),n("br"),n("span",[t._v("Destino: "+t._s(t.flight_list["destination"]))])])])},f=[],m={props:{flight_list:Object},data:function(){return{hello_world:"Hello World"}}},d=m,h=(n("d416"),n("2877")),g=Object(h["a"])(d,p,f,!1,null,null,null),v=g.exports,b=(n("6cc5"),n("2699")),_=n("31dc"),k=n("635f"),y=n("ea97"),x=n("a40a"),O={components:{FlightsInfo:v,LMap:b["a"],LTooltip:_["a"],LPolyline:k["a"],LCircleMarker:y["a"],LTileLayer:x["a"]},name:"HelloWorld",data:function(){return{socket:{},message:"",messages:[],nickname:"",flights:[],planes:[],nickname_aux:"",zoom:6}},created:function(){var t=this;this.socket=u()("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl",{path:"/flights"}),this.socket.emit("FLIGHTS"),this.socket.emit("CHAT",{name:"Piloto",message:"Bienvenido"}),this.socket.once("FLIGHTS",(function(e){t.flights.push(e),t.planes=t.flights[0].map((function(t){return{code:t.code,position:Object(l["a"])(t.origin),initial_position:[0,0],destination:Object(l["a"])(t.destination)}}))}))},mounted:function(){var t=this;this.socket.on("POSITION",(function(e){t.planes=t.planes.map((function(t){return e.code===t.code&&(t.position=e.position,0==t.initial_position[0]&&(t.initial_position=t.position)),t}))})),this.socket.on("CHAT",(function(e){var n=new Date(e.date);e.date=n,t.messages.push(e),t.$nextTick((function(){var t=this.$refs["chatbox"];t.scrollTop=t.scrollHeight}))}))},methods:{sendMessage:function(){this.socket.emit("CHAT",{name:this.nickname,message:this.message}),this.message=""},checkNickname:function(){if(""==this.nickname)return!1},changeNickname:function(){this.nickname=this.nickname_aux},getFlights:function(){this.socket.emit("FLIGHTS")}},computed:{airports:function(){return new Set(this.flights[0].map((function(t){var e=Object(l["a"])(t.origin),n=Object(l["a"])(t.destination);return[e,n]})).flat())},theoricalPath:function(){return this.flights[0].map((function(t){return{latlngs:[Object(l["a"])(t.origin),Object(l["a"])(t.destination)],color:"#14B8A6"}}))},actualPath:function(){return this.planes.map((function(t){return{latlngs:[Object(l["a"])(t.initial_position),Object(l["a"])(t.position)],color:"#b314b8"}}))}}},j=O,w=(n("31f2"),Object(h["a"])(j,s,r,!1,null,null,null)),P=w.exports,T={name:"App",components:{HelloWorld:P}},C=T,L=Object(h["a"])(C,a,o,!1,null,null,null),S=L.exports;i["a"].config.productionTip=!1,new i["a"]({render:function(t){return t(S)}}).$mount("#app")},ab6f:function(t,e,n){},d416:function(t,e,n){"use strict";n("ab6f")},ebce:function(t,e,n){}});
//# sourceMappingURL=app.5b5a9e66.js.map