(function(e){function t(t){for(var a,o,r=t[0],i=t[1],u=t[2],l=0,f=[];l<r.length;l++)o=r[l],Object.prototype.hasOwnProperty.call(c,o)&&c[o]&&f.push(c[o][0]),c[o]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a]);d&&d(t);while(f.length)f.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],a=!0,o=1;o<n.length;o++){var r=n[o];0!==c[r]&&(a=!1)}a&&(s.splice(t--,1),e=i(i.s=n[0]))}return e}var a={},o={app:0},c={app:0},s=[];function r(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-12911f16":"36ff9089","chunk-1bee9b40":"60a7f777","chunk-21e8ff6e":"8d21c3f6","chunk-25c951c6":"d3935b6c","chunk-275ba974":"7ca4d6eb","chunk-3fd1e4cc":"ac7960ed","chunk-96ac1fde":"d95f5099","chunk-4b38fef3":"c542c875","chunk-14128863":"6ac2f6e4","chunk-257efa10":"f1963a85","chunk-59bf1c20":"1aca9a94","chunk-208655c4":"453ad781","chunk-2d20f1b4":"63ad94ff","chunk-2d20f8d6":"7ad708c5","chunk-199939b2":"9b39b741","chunk-ec935e6e":"353c51ec"}[e]+".js"}function i(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-12911f16":1,"chunk-1bee9b40":1,"chunk-21e8ff6e":1,"chunk-25c951c6":1,"chunk-275ba974":1,"chunk-3fd1e4cc":1,"chunk-96ac1fde":1,"chunk-4b38fef3":1,"chunk-14128863":1,"chunk-257efa10":1,"chunk-59bf1c20":1,"chunk-208655c4":1,"chunk-199939b2":1,"chunk-ec935e6e":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-12911f16":"c629e7a4","chunk-1bee9b40":"c629e7a4","chunk-21e8ff6e":"c629e7a4","chunk-25c951c6":"c629e7a4","chunk-275ba974":"c629e7a4","chunk-3fd1e4cc":"68e6a77c","chunk-96ac1fde":"3cab45bf","chunk-4b38fef3":"6134a656","chunk-14128863":"83deaa5e","chunk-257efa10":"5834c33c","chunk-59bf1c20":"7e708fa2","chunk-208655c4":"e5f96162","chunk-2d20f1b4":"31d6cfe0","chunk-2d20f8d6":"31d6cfe0","chunk-199939b2":"0b94f07b","chunk-ec935e6e":"630f1f31"}[e]+".css",c=i.p+a,s=document.getElementsByTagName("link"),r=0;r<s.length;r++){var u=s[r],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===a||l===c))return t()}var f=document.getElementsByTagName("style");for(r=0;r<f.length;r++){u=f[r],l=u.getAttribute("data-href");if(l===a||l===c)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var a=t&&t.target&&t.target.src||c,s=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");s.code="CSS_CHUNK_LOAD_FAILED",s.request=a,delete o[e],d.parentNode.removeChild(d),n(s)},d.href=c;var h=document.getElementsByTagName("head")[0];h.appendChild(d)})).then((function(){o[e]=0})));var a=c[e];if(0!==a)if(a)t.push(a[2]);else{var s=new Promise((function(t,n){a=c[e]=[t,n]}));t.push(a[2]=s);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=r(e);var f=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=c[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+a+": "+o+")",f.name="ChunkLoadError",f.type=a,f.request=o,n[1](f)}c[e]=void 0}};var d=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=a,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var f=0;f<u.length;f++)t(u[f]);var d=l;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},4360:function(e,t,n){"use strict";var a=n("2b0e"),o=n("2f62"),c=n("0e44");a["a"].use(o["a"]),t["a"]=new o["a"].Store({state:{userInfo:{},isLoggedIn:!1,darkMode:!1,searchData:"",navDrawerVal:!1,emplcode:""},plugins:[Object(c["a"])()],mutations:{CHANGE_USER_INFO:function(e,t){e.userInfo=t},CHANGE_USER_LOGGING:function(e,t){e.isLoggedIn=t},CHANGE_THEME:function(e,t){e.darkMode=t},CHANGE_SEARCHING:function(e,t){e.searchData=t},CHANGE_NAVDRAWER:function(e,t){e.navDrawerVal=t},CHANGE_EMPLCODE:function(e,t){e.emplcode=t}},actions:{},modules:{}})},4678:function(e,t,n){var a={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function o(e){var t=c(e);return n(t)}function c(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}o.keys=function(){return Object.keys(a)},o.resolve=c,e.exports=o,o.id="4678"},"56d7":function(e,t,n){"use strict";n.r(t),n.d(t,"SocketInstance",(function(){return Ee}));n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),o=n("bc3a"),c=n.n(o),s=n("6821"),r=n.n(s),i=n("3d20"),u=n.n(i),l=n("c1df"),f=n.n(l),d=n("8e27"),h=n.n(d),m=n("5132"),b=n.n(m),p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{attrs:{id:"inspire"}},[void 0!=e.userInfo.EmployeeCode?n("navdrawer"):e._e(),n("router-view"),void 0!=e.userInfo.EmployeeCode?n("navfooter"):e._e()],1)},v=[],k=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-navigation-drawer",{attrs:{value:e.navDrawerVal,app:""}},[n("v-list-item",[n("v-list-item-content",{staticClass:"ma-2 text-center"},[n("v-list-item-avatar",{attrs:{size:"112"}},[n("img",{attrs:{src:"http://asd_sql:8080/photos/"+e.user.EmployeeCode+".jpg",alt:"nopic.jpg"}})]),n("v-list-item-title",{staticClass:"headline"},[e._v(e._s(e.user.EmployeeCode))]),n("v-list-item-subtitle",[e._v(e._s(e.user.EmployeeName))]),n("v-list-item-subtitle",[e._v(e._s(e.user.DesignationName))])],1)],1),n("v-divider"),n("v-list",{attrs:{shaped:"",dense:""}},e._l(e.navDrawerList,(function(t,a){return n("v-list-group",{key:a,attrs:{"prepend-icon":t.icon,"no-action":""},scopedSlots:e._u([{key:"activator",fn:function(){return[n("v-list-item-content",[n("v-list-item-title",[e._v(e._s(t.title))])],1)]},proxy:!0}],null,!0),model:{value:t.active,callback:function(n){e.$set(t,"active",n)},expression:"item.active"}},e._l(t.items,(function(t){return n("v-list-item",{key:t.text,attrs:{to:t.to,link:""}},[n("v-list-item-content",[n("v-list-item-subtitle",[e._v(e._s(t.text))])],1)],1)})),1)})),1),n("v-bottom-navigation",{attrs:{"background-color":"transparent",absolute:""}},[n("v-spacer"),n("v-switch",{attrs:{"prepend-icon":e.icon},on:{change:function(t){return e.changeTheme()}},model:{value:e.dark,callback:function(t){e.dark=t},expression:"dark"}})],1)],1),n("v-app-bar",{attrs:{app:""}},[n("v-app-bar-nav-icon",{on:{click:function(t){return e.navDrawerHide(null)}}}),e.userInfo.UserLevel<9?n("v-toolbar-title",[e._v(e._s(e.user.DepartmentName)+" Department")]):n("v-toolbar-title",[e._v("ASD Team")]),n("v-spacer"),n("v-text-field",{staticClass:"mt-4 mr-3",attrs:{"append-icon":"mdi-magnify",placeholder:"Search"},on:{keyup:function(t){return e.getSearchData()}},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),n("notifications"),n("v-btn",{attrs:{icon:""},on:{click:function(t){return e.logout()}}},[n("v-icon",{attrs:{small:""}},[e._v("mdi-logout")])],1)],1),n("v-snackbar",{attrs:{transition:"scroll-x-reverse-transition",timeout:2e3,bottom:"",right:""},model:{value:e.snackBar,callback:function(t){e.snackBar=t},expression:"snackBar"}},[e._v(" hello ")])],1)},j=[],g=(n("c740"),n("a434"),n("b0c0"),n("ac1f"),n("841c"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-menu",{attrs:{"close-on-content-click":!1,"nudge-width":200,"offset-y":"",origin:"center center",transition:"scale-transition"},scopedSlots:e._u([{key:"activator",fn:function(t){var a=t.on,o=t.attrs;return[n("v-btn",e._g(e._b({attrs:{icon:""},on:{click:function(e){return this.closeLogging()}}},"v-btn",o,!1),a),[n("v-icon",{attrs:{small:""}},[e._v("mdi-bell")]),e.notifications.length?n("v-badge",{attrs:{color:"error",content:e.notifications.length}}):e._e()],1)]}}]),model:{value:e.menuDialog,callback:function(t){e.menuDialog=t},expression:"menuDialog"}},[n("v-card",[n("v-list",e._l(e.notificationList,(function(t,a){return n("v-list-item",{key:a},[n("v-list-item-content",[e._v(" "+e._s(t)+" ")])],1)})),1)],1)],1)}),y=[],_=(n("4de4"),{data:function(){return{menuDialog:!1,notificationList:[]}},created:function(){},sockets:{loggedIn:function(e){this.onLineUsers=e},notifications:function(e){console.log(e)}},computed:{notifications:function(){return this.notificationList.filter((function(e){return e}))}},methods:{loadLogging:function(){var e=this;this.axios.get("".concat(this.api,"/logging")).then((function(t){e.notificationList=t.data}))},closeLogging:function(){this.menuDialog=!this.menuDialog;var e={procedureName:"ProcUserLogging",values:[this.$socket.id,this.userInfo.EmployeeCode,"User: ".concat(this.userInfo.EmployeeCode," logged in"),this.moment().format("YYYY-MM-DD hh:mm:ss"),this.moment().format("YYYY-MM-DD hh:mm:ss"),this.userInfo.EmployeeCode]};this.axios.post("".concat(this.api,"/execute"),{data:JSON.stringify(e)})}}}),E=_,w=n("2877"),C=n("6544"),D=n.n(C),x=n("4ca6"),N=n("8336"),A=n("b0af"),L=n("132d"),I=n("8860"),V=n("da13"),O=n("5d23"),S=n("e449"),G=Object(w["a"])(E,g,y,!1,null,null,null),H=G.exports;D()(G,{VBadge:x["a"],VBtn:N["a"],VCard:A["a"],VIcon:L["a"],VList:I["a"],VListItem:V["a"],VListItemContent:O["a"],VMenu:S["a"]});var z=n("4360"),T={data:function(){return{user:"",dark:!1,overlay:!1,isConnected:!1,snackBar:!1,icon:"mdi-weather-night",search:"",socketId:"",navDrawerList:[],onLineUsers:[]}},created:function(){this.dark=z["a"].state.darkMode,this.user=z["a"].state.userInfo,this.getUserLevel(),this.socketId=this.$socket.id},sockets:{connect:function(){this.isConnected=!0,console.log("server connected")},disconnect:function(){this.isConnected=!1,console.log("server disconnected")},loggedIn:function(e){this.onLineUsers=e},notifications:function(e){console.log(e),this.snackBar=!this.snackBar}},methods:{getSearchData:function(){z["a"].commit("CHANGE_SEARCHING",this.search)},changeTheme:function(){this.$vuetify.theme.dark=this.dark,this.icon=this.dark?"mdi-weather-sunny":"mdi-weather-night",z["a"].commit("CHANGE_THEME",this.dark)},logout:function(){z["a"].commit("CHANGE_USER_INFO",{}),z["a"].commit("CHANGE_THEME",!1),z["a"].commit("CHANGE_USER_LOGGING",!1),z["a"].commit("CHANGE_NAVDRAWER",!1),this.setOffline(),this.$router.push("/")},getUserLevel:function(){switch(z["a"].state.userInfo.UserLevel){case 0:this.navDrawerList=[{title:"Employee",icon:"mdi-account",items:[{text:"Profile",to:"/profile"}],active:!0}];break;case 1:this.navDrawerList=[{title:"Dashboard",icon:"mdi-home",items:[{text:"Home",to:"/dashboard"},{text:"Profile",to:"/profile"}],active:!0},{title:"Main Data",icon:"mdi-account",items:[{text:"Employees",to:"/employees"},{text:"Departments",to:"/department"},{text:"Sections",to:"/section"},{text:"Team",to:"/team"},{text:"Department - Section",to:"/divsec"},{text:"Transfer Employees",to:"/transfer"}],active:!1}];break;default:this.navDrawerList=[{title:"Dashboard",icon:"mdi-home",items:[{text:"Home",to:"/dashboard"}],active:!0},{title:"Main Data",icon:"mdi-account",items:[{text:"Employees",to:"/employees"},{text:"Departments",to:"/department"},{text:"Sections",to:"/section"},{text:"Team",to:"/team"},{text:"Department - Section",to:"/divsec"},{text:"Transfer Employees",to:"/transfer"}],active:!1},{title:"Maintenance",icon:"mdi-cog",items:[{text:"User Accounts",to:"/accounts"},{text:"Profile",to:"/profile"}],active:!1}];break}},navDrawerHide:function(e){z["a"].state.navDrawerVal?z["a"].commit("CHANGE_NAVDRAWER",!1):z["a"].commit("CHANGE_NAVDRAWER",!0),null!=e&&this.$router.push(e).catch((function(e){"NavigationDuplicated"!=e.name&&console.log(e)}))},setOffline:function(){var e=this,t=this.onLineUsers.findIndex((function(t){if(console.log(t.id),t.id==e.socketId)return!0}));this.onLineUsers.splice(t,1),this.$socket.emit("loggedIn",this.onLineUsers)}},watch:{dark:function(){this.changeTheme()}},components:{notifications:H}},M=T,U=n("40dc"),P=n("5bc1"),R=n("b81c"),B=n("ce7e"),F=n("56b0"),$=n("8270"),Y=n("f774"),q=n("2db4"),W=n("2fa4"),J=n("b73d"),K=n("8654"),Q=n("2a7f"),X=Object(w["a"])(M,k,j,!1,null,null,null),Z=X.exports;D()(X,{VAppBar:U["a"],VAppBarNavIcon:P["a"],VBottomNavigation:R["a"],VBtn:N["a"],VDivider:B["a"],VIcon:L["a"],VList:I["a"],VListGroup:F["a"],VListItem:V["a"],VListItemAvatar:$["a"],VListItemContent:O["a"],VListItemSubtitle:O["b"],VListItemTitle:O["c"],VNavigationDrawer:Y["a"],VSnackbar:q["a"],VSpacer:W["a"],VSwitch:J["a"],VTextField:K["a"],VToolbarTitle:Q["a"]});var ee=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-footer",{staticClass:"font-weight-medium",attrs:{padless:"",app:""}},[n("v-col",{staticClass:"text-center",attrs:{cols:"12"}},[e._v(" "+e._s((new Date).getFullYear())+" — "),n("strong",[e._v("Employee Master")])])],1)},te=[],ne=n("62ad"),ae=n("553a"),oe={},ce=Object(w["a"])(oe,ee,te,!1,null,null,null),se=ce.exports;D()(ce,{VCol:ne["a"],VFooter:ae["a"]});var re={data:function(){return{}},components:{navdrawer:Z,navfooter:se}},ie=re,ue=n("7496"),le=Object(w["a"])(ie,p,v,!1,null,null,null),fe=le.exports;D()(le,{VApp:ue["a"]});var de=n("9483");Object(de["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});n("d3b7");var he=n("8c4f");a["a"].use(he["a"]);var me=[{path:"/",name:"login",component:function(){return n.e("chunk-ec935e6e").then(n.bind(null,"dd7b"))}},{path:"/dashboard",name:"dashboard",component:function(){return Promise.all([n.e("chunk-96ac1fde"),n.e("chunk-59bf1c20"),n.e("chunk-4b38fef3"),n.e("chunk-199939b2")]).then(n.bind(null,"4601"))}},{path:"/employees",name:"employees",component:function(){return Promise.all([n.e("chunk-96ac1fde"),n.e("chunk-4b38fef3"),n.e("chunk-257efa10")]).then(n.bind(null,"7cd6"))}},{path:"/employeedetails",name:"employeedetails",component:function(){return Promise.all([n.e("chunk-96ac1fde"),n.e("chunk-59bf1c20"),n.e("chunk-208655c4"),n.e("chunk-2d20f1b4")]).then(n.bind(null,"b1e4"))}},{path:"/department",name:"department",component:function(){return n.e("chunk-275ba974").then(n.bind(null,"0cfc"))}},{path:"/section",name:"section",component:function(){return n.e("chunk-25c951c6").then(n.bind(null,"2526"))}},{path:"/team",name:"team",component:function(){return n.e("chunk-12911f16").then(n.bind(null,"6fc2"))}},{path:"/divsec",name:"divsec",component:function(){return n.e("chunk-1bee9b40").then(n.bind(null,"50a0"))}},{path:"/transfer",name:"transfer",component:function(){return n.e("chunk-21e8ff6e").then(n.bind(null,"397d"))}},{path:"/accounts",name:"accounts",component:function(){return Promise.all([n.e("chunk-96ac1fde"),n.e("chunk-4b38fef3"),n.e("chunk-14128863")]).then(n.bind(null,"bd75"))}},{path:"/profile",name:"profile",component:function(){return Promise.all([n.e("chunk-96ac1fde"),n.e("chunk-59bf1c20"),n.e("chunk-208655c4"),n.e("chunk-2d20f8d6")]).then(n.bind(null,"b3b1"))}},{path:"*",name:"error",component:function(){return n.e("chunk-3fd1e4cc").then(n.bind(null,"0636"))}}],be=new he["a"]({mode:"history",base:"/",routes:me});be.beforeEach((function(e,t,n){"/"===e.path||z["a"].state.isLoggedIn?"/"===e.path&&z["a"].state.isLoggedIn?n("/dashboard"):n():n("/")}));var pe=be,ve=n("f309");n("5363");a["a"].use(ve["a"]);var ke=new ve["a"]({icons:{iconfont:"mdi"},theme:{dark:!1,themes:{light:{primary:"#1976D2",secondary:"#455A64",accent:"#8c9eff",error:"#b71c1c",info:"#2196F3",success:"#4CAF50",warning:"#FFC107",highlightcolor:"#42A5F5",icon_color:"#212121",table_header_color:"#213c57"}}}}),je=n("5530"),ge=n("2f62"),ye={install:function(e){e.mixin({data:function(){return{api:"http://asd_sql:8700/api"}},computed:Object(je["a"])({},Object(ge["c"])(["userInfo","isLoggedIn","darkMode","searchData","navDrawerVal","emplcode"])),methods:Object(je["a"])({},Object(ge["b"])(["CHANGE_USER_INFO","CHANGE_USER_LOGGING","CHANGE_THEME","CHANGE_SEARCHING","CHANGE_NAVDRAWER","CHANGE_EMPLCODE"]))})}},_e=ye,Ee=h()("http://asd_sql:8700");a["a"].config.productionTip=!1,a["a"].prototype.axios=c.a,a["a"].prototype.swal=u.a,a["a"].prototype.md5=r.a,a["a"].prototype.moment=f.a,a["a"].use(_e),a["a"].use(new b.a({debug:!0,connection:Ee})),new a["a"]({router:pe,store:z["a"],vuetify:ke,render:function(e){return e(fe)}}).$mount("#app")}});
//# sourceMappingURL=app.0fe03136.js.map