(function(e){function t(t){for(var a,s,c=t[0],r=t[1],u=t[2],l=0,d=[];l<c.length;l++)s=c[l],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&d.push(o[s][0]),o[s]=0;for(a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a]);f&&f(t);while(d.length)d.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,s=1;s<n.length;s++){var c=n[s];0!==o[c]&&(a=!1)}a&&(i.splice(t--,1),e=r(r.s=n[0]))}return e}var a={},s={app:0},o={app:0},i=[];function c(e){return r.p+"js/"+({}[e]||e)+"."+{"chunk-26e7d5f6":"e1ea4fff","chunk-63e39f72":"4ec785fd","chunk-17d8f546":"84d4fee5","chunk-b6390a44":"1626c027","chunk-bfc869ac":"f14deff8","chunk-0453a456":"77f21bec","chunk-18aeff66":"f31b3c02","chunk-28af06c8":"76f4df06","chunk-01f4fd7b":"1187b268","chunk-0820e7ce":"fca025b3","chunk-2c094efc":"30d0f10b","chunk-2c0b5924":"2f5174b6","chunk-3429ecae":"c434110e","chunk-71043336":"d5d95756","chunk-8d22e5d6":"44adac09","chunk-97464840":"b054b7d7","chunk-a05b1886":"3579876a","chunk-a1ed7034":"4f5fa62d","chunk-e65f275e":"34ad2434","chunk-7abb7539":"963e211c"}[e]+".js"}function r(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.e=function(e){var t=[],n={"chunk-26e7d5f6":1,"chunk-63e39f72":1,"chunk-17d8f546":1,"chunk-b6390a44":1,"chunk-bfc869ac":1,"chunk-0453a456":1,"chunk-18aeff66":1,"chunk-28af06c8":1,"chunk-01f4fd7b":1,"chunk-0820e7ce":1,"chunk-2c094efc":1,"chunk-2c0b5924":1,"chunk-71043336":1,"chunk-8d22e5d6":1,"chunk-97464840":1,"chunk-a05b1886":1,"chunk-a1ed7034":1,"chunk-e65f275e":1,"chunk-7abb7539":1};s[e]?t.push(s[e]):0!==s[e]&&n[e]&&t.push(s[e]=new Promise((function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-26e7d5f6":"68e6a77c","chunk-63e39f72":"2da993df","chunk-17d8f546":"bbfaa3a0","chunk-b6390a44":"49830f27","chunk-bfc869ac":"583cf906","chunk-0453a456":"3139d457","chunk-18aeff66":"3139d457","chunk-28af06c8":"fa7e8798","chunk-01f4fd7b":"3139d457","chunk-0820e7ce":"601d8c98","chunk-2c094efc":"7d887a01","chunk-2c0b5924":"7d887a01","chunk-3429ecae":"31d6cfe0","chunk-71043336":"fe311ada","chunk-8d22e5d6":"3139d457","chunk-97464840":"5834c33c","chunk-a05b1886":"3139d457","chunk-a1ed7034":"3139d457","chunk-e65f275e":"80c11a63","chunk-7abb7539":"07bf8920"}[e]+".css",o=r.p+a,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var u=i[c],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===a||l===o))return t()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){u=d[c],l=u.getAttribute("data-href");if(l===a||l===o)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var a=t&&t.target&&t.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=a,delete s[e],f.parentNode.removeChild(f),n(i)},f.href=o;var m=document.getElementsByTagName("head")[0];m.appendChild(f)})).then((function(){s[e]=0})));var a=o[e];if(0!==a)if(a)t.push(a[2]);else{var i=new Promise((function(t,n){a=o[e]=[t,n]}));t.push(a[2]=i);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,r.nc&&l.setAttribute("nonce",r.nc),l.src=c(e);var d=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(f);var n=o[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),s=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+a+": "+s+")",d.name="ChunkLoadError",d.type=a,d.request=s,n[1](d)}o[e]=void 0}};var f=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},r.m=e,r.c=a,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/employeemaster/",r.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var f=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},4360:function(e,t,n){"use strict";var a=n("2b0e"),s=n("2f62"),o=n("0e44");a["a"].use(s["a"]),t["a"]=new s["a"].Store({state:{userInfo:{},isLoggedIn:!1,darkMode:!1,searchData:"",emplcode:"",isEmpEdit:!1,isConnect:!0},plugins:[Object(o["a"])()],mutations:{CHANGE_USER_INFO:function(e,t){e.userInfo=t},CHANGE_USER_LOGGING:function(e,t){e.isLoggedIn=t},CHANGE_THEME:function(e,t){e.darkMode=t},CHANGE_SEARCHING:function(e,t){e.searchData=t},CHANGE_EMPLCODE:function(e,t){e.emplcode=t},CHANGE_EMP_EDIT:function(e,t){e.isEmpEdit=t},CHANGE_CONNECTION:function(e,t){e.isConnect=t}},actions:{},modules:{}})},4678:function(e,t,n){var a={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function s(e){var t=o(e);return n(t)}function o(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}s.keys=function(){return Object.keys(a)},s.resolve=o,e.exports=s,s.id="4678"},"54cd":function(e,t,n){"use strict";n("d267")},"56d7":function(e,t,n){"use strict";n.r(t),n.d(t,"SocketInstance",(function(){return Le}));n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),s=n("bc3a"),o=n.n(s),i=n("6821"),c=n.n(i),r=n("3d20"),u=n.n(r),l=n("c1df"),d=n.n(l),f=n("8e27"),m=n.n(f),h=n("5132"),b=n.n(h),p=n("b6d0"),v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{attrs:{id:"inspire"}},[void 0==e.userInfo.EmployeeCode&&void 0==e.userInfo.id||!e.isConnect?e._e():n("navdrawer"),n("router-view"),void 0!=e.userInfo.EmployeeCode||void 0!=e.userInfo.id?n("navfooter"):e._e()],1)},k=[],j=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-navigation-drawer",{attrs:{value:e.navDrawerVal,app:""}},[5==e.user.UserLevel?n("v-list-item",[n("v-list-item-content",{staticClass:"ma-2 text-center"},[n("v-list-item-avatar",{attrs:{size:"112"}},[n("img",{attrs:{src:e.photo_jap+"/"+e.user.id+".jpg",alt:"nopic.jpg"}})]),n("v-list-item-title",{staticClass:"headline"},[e._v(e._s(e.user.id))]),n("v-list-item-subtitle",[e._v(e._s(e.user.LastNameEng)+" "+e._s(e.user.FirstNameEng))]),n("v-list-item-subtitle",[e._v("( "+e._s(e.user.LastName)+" "+e._s(e.user.FirstName)+" )")])],1)],1):n("v-list-item",[n("v-list-item-content",{staticClass:"ma-2 text-center"},[n("v-list-item-avatar",{attrs:{size:"112"}},[n("img",{attrs:{src:e.photo+"/"+e.user.EmployeeCode+".jpg",alt:"nopic.jpg"}})]),n("v-list-item-title",{staticClass:"headline"},[e._v(e._s(e.user.EmployeeCode))]),n("v-list-item-subtitle",[e._v(e._s(e.user.EmployeeName))]),n("v-list-item-subtitle",[e._v(e._s(e.user.DesignationName))])],1)],1),n("v-divider"),n("v-list",{attrs:{shaped:"",dense:""}},e._l(e.navDrawerList,(function(t,a){return n("v-list-group",{key:a,attrs:{"prepend-icon":t.icon,"no-action":""},scopedSlots:e._u([{key:"activator",fn:function(){return[n("v-list-item-content",[n("v-list-item-title",[e._v(e._s(t.title))])],1)]},proxy:!0}],null,!0),model:{value:t.active,callback:function(n){e.$set(t,"active",n)},expression:"item.active"}},[e._l(t.items,(function(t){return n("v-list-item",{key:t.text,attrs:{to:t.to,link:""}},[n("v-list-item-content",[n("v-list-item-subtitle",[e._v(e._s(t.text))])],1)],1)})),1==a?n("div",e._l(e.navDrawerSubGroup,(function(t,a){return n("v-list-group",{key:a,attrs:{"no-action":"","sub-group":""},scopedSlots:e._u([{key:"activator",fn:function(){return[n("v-list-item-content",[n("v-list-item-subtitle",{staticClass:"ml-2"},[e._v(e._s(t.text))])],1)]},proxy:!0}],null,!0)},e._l(t.items,(function(t){return n("v-list-item",{key:t.text,attrs:{to:t.to,link:""}},[n("v-list-item-content",[n("v-list-item-subtitle",[e._v(e._s(t.text))])],1),n("v-list-item-icon",[n("v-icon",[e._v(e._s(t.icon))])],1)],1)})),1)})),1):e._e()],2)})),1)],1),n("v-app-bar",{attrs:{app:""}},[n("v-app-bar-nav-icon",{on:{click:function(t){e.navDrawerVal=!e.navDrawerVal}}}),n("div",{staticClass:"hidden-sm-and-down"},[5==e.userInfo.UserLevel?n("div",[n("v-toolbar-title",[e._v(e._s(e.user.LocalDepartments))])],1):n("div",[e.userInfo.UserLevel<9?n("v-toolbar-title",[e._v(e._s(e.user.DepartmentName)+" Department")]):n("v-toolbar-title",[e._v("ASD Team")])],1)]),n("v-spacer"),n("v-text-field",{staticClass:"mt-4 mr-3",attrs:{"append-icon":"mdi-magnify",placeholder:"Search"},on:{keyup:function(t){return e.getSearchData()}},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),0!=e.userInfo.UserLevel?n("notifications"):e._e(),n("v-btn",{attrs:{icon:""},on:{click:function(t){return e.logout()}}},[n("v-icon",{attrs:{small:""}},[e._v("mdi-logout")])],1),n("v-menu",{attrs:{"close-on-content-click":!1,"nudge-width":200,"nudge-left":270},scopedSlots:e._u([{key:"activator",fn:function(t){var a=t.on,s=t.attrs;return[n("v-btn",e._g(e._b({staticClass:"mt-15 mr-n5 rounded-l-lg",staticStyle:{"background-color":"rgb(0, 0, 0, 0.3)"},attrs:{absolute:"",top:"",right:""}},"v-btn",s,!1),a),[n("v-icon",[e._v("mdi-cog-outline")])],1)]}}])},[n("v-card",[n("v-list",{attrs:{dense:""}},[n("v-list-item",[n("v-list-item-content",[n("v-list-item-title",{staticClass:"grey--text"},[e._v("Themes")])],1)],1),n("v-divider"),n("v-list-item",[n("v-list-item-content",[n("v-list-item-subtitle",[e._v("Dark Mode")])],1),n("v-list-item-action",[n("v-switch",{attrs:{inset:""},on:{change:function(t){return e.changeTheme()}},model:{value:e.dark,callback:function(t){e.dark=t},expression:"dark"}})],1)],1)],1)],1)],1)],1)],1)},g=[],y=(n("ac1f"),n("841c"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-menu",{attrs:{"close-on-content-click":!1,"nudge-width":300,"offset-y":"",origin:"center center",transition:"scroll-y-reverse-transition"},scopedSlots:e._u([{key:"activator",fn:function(t){var a=t.on,s=t.attrs;return[n("v-btn",e._g(e._b({attrs:{icon:""}},"v-btn",s,!1),a),[n("v-icon",{attrs:{small:""}},[e._v("mdi-bell")]),e.totalNotifs>0?n("v-badge",{attrs:{color:"error",content:e.totalNotifs}}):e._e()],1)]}}]),model:{value:e.menuDialog,callback:function(t){e.menuDialog=t},expression:"menuDialog"}},[n("v-card",[n("v-toolbar",{attrs:{color:"primary",flat:"",dark:"",dense:""}},[n("v-toolbar-title",[e._v("Notifications")])],1),e.notificationList.length>0?n("v-list",{attrs:{"two-line":"",dense:""}},[n("v-list-item-group",{attrs:{"active-class":"pink--text",multiple:""}},e._l(e.notificationList,(function(t,a){return n("v-list-item",{key:a},[n("v-list-item-avatar",[n("v-img",{attrs:{src:e.photo+"/"+t.EmployeeCode+".jpg"}})],1),n("v-list-item-content",[n("v-list-item-title",{staticClass:"font-weight-bold"},[e._v(e._s(t.EmployeeName))]),n("v-list-item-subtitle",[e._v(" "+e._s(t.Details)+": "),n("span",[e._v(e._s(e.moment(t.CreatedDate).fromNow()))])])],1),n("v-btn",{attrs:{"x-small":"",icon:""},on:{click:function(n){return e.removeNotif(t)}}},[n("v-icon",[e._v("mdi-close")])],1)],1)})),1)],1):n("v-subheader",{staticClass:"font-weight-thin font-italic"},[e._v("No new notifications")])],1)],1)}),_=[],E=(n("99af"),n("c740"),n("4160"),n("a434"),n("d3b7"),n("159b"),n("ddb0"),{data:function(){return{menuDialog:!1,notificationList:[],totalNotifs:0}},created:function(){this.loadNotifications()},sockets:{showNotifications:function(){this.loadNotifications()}},methods:{loadNotifications:function(){var e=this;this.axios.get("".concat(this.api,"/notifications/").concat(this.userInfo.ShortName,"/").concat(this.userInfo.EmployeeCode)).then((function(t){Array.isArray(t.data)&&(e.notificationList=t.data)}))},removeNotif:function(e){var t={procedureName:"ProcPushNotification",values:[e.SeqNo,e.SocketId,e.CompanyCode,e.EmplCode,e.Details,0]};this.axios.post("".concat(this.api,"/execute"),{data:JSON.stringify(t)});var n=this.notificationList.findIndex((function(t){return t.SeqNo==e.SeqNo}));this.notificationList.splice(n,1),this.$socket.emit("newNotifications",t.values),this.totalNotifs--}},watch:{notificationList:function(e){var t=this;this.totalNotifs=0,void 0!=e&&e.forEach((function(e){e.EmployeeCode!=t.userInfo.EmployeeCode&&e.ShortName==t.userInfo.ShortName&&(e.Viewed||t.totalNotifs++)}))}}}),x=E,N=(n("54cd"),n("2877")),C=n("6544"),w=n.n(C),D=n("4ca6"),S=n("8336"),I=n("b0af"),L=n("132d"),A=n("adda"),O=n("8860"),H=n("da13"),V=n("8270"),G=n("5d23"),T=n("1baa"),P=n("e449"),z=n("e0c7"),M=n("71d9"),U=n("2a7f"),q=Object(N["a"])(x,y,_,!1,null,"6649fb0d",null),$=q.exports;w()(q,{VBadge:D["a"],VBtn:S["a"],VCard:I["a"],VIcon:L["a"],VImg:A["a"],VList:O["a"],VListItem:H["a"],VListItemAvatar:V["a"],VListItemContent:G["a"],VListItemGroup:T["a"],VListItemSubtitle:G["b"],VListItemTitle:G["c"],VMenu:P["a"],VSubheader:z["a"],VToolbar:M["a"],VToolbarTitle:U["a"]});var F={data:function(){return{user:"",dark:!1,overlay:!1,navDrawerVal:!0,isConnected:!1,icon:"mdi-weather-night",search:"",socketId:"",navDrawerList:[],navDrawerSubGroup:[]}},created:function(){this.$store.commit("CHANGE_SEARCHING",""),this.dark=this.darkMode,this.user=this.userInfo,this.getUserLevel()},methods:{getSearchData:function(){this.$store.commit("CHANGE_SEARCHING",this.search)},changeTheme:function(){this.$vuetify.theme.dark=this.dark,this.icon=this.dark?"mdi-weather-sunny":"mdi-weather-night",this.$store.commit("CHANGE_THEME",this.dark)},logout:function(){this.$store.commit("CHANGE_USER_INFO",{}),this.$store.commit("CHANGE_USER_LOGGING",!1),this.$store.commit("CHANGE_THEME",!1),this.$router.push("/")},getUserLevel:function(){switch(this.userInfo.UserLevel){case 0:this.navDrawerList=[{title:"Employee",icon:"mdi-account",items:[{text:"Profile",to:"/profile"}],active:!0}];break;case 1:case 2:case 3:this.navDrawerList=[{title:"Dashboard",icon:"mdi-home",items:[{text:"Home",to:"/dashboard"},{text:"Profile",to:"/profile"}],active:!0},{title:"Main Data",icon:"mdi-account",items:[{text:"Employees",to:"/employees"},{text:"Departments",to:"/department"},{text:"Sections",to:"/section"},{text:"Team",to:"/team"},{text:"Department - Section",to:"/divsec"},{text:"User Accounts",to:"/accounts"},{text:"Job Assignments",to:"/jobassignments"},{text:"Query Builder",to:"/querybuilder"}],active:!1}];break;case 4:this.navDrawerList=[{title:"Dashboard",icon:"mdi-home",items:[{text:"Home",to:"/dashboard"},{text:"Profile",to:"/profile"}],active:!0},{title:"Main Data",icon:"mdi-account",items:[{text:"Departments",to:"/department"},{text:"Sections",to:"/section"},{text:"Team",to:"/team"},{text:"Department - Section",to:"/divsec"},{text:"Job Assignments",to:"/jobassignments"},{text:"Query Builder",to:"/querybuilder"}],active:!1}];break;case 5:this.navDrawerList=[{title:"Dashboard",icon:"mdi-home",items:[{text:"Home",to:"/dashboard"}],active:!0},{title:"Main Data",icon:"mdi-account",items:[{text:"Employees",to:"/employees"},{text:"Departments",to:"/department"},{text:"Sections",to:"/section"},{text:"Team",to:"/team"},{text:"Department - Section",to:"/divsec"}],active:!1}];break;default:this.navDrawerList=[{title:"Dashboard",icon:"mdi-home",items:[{text:"Home",to:"/dashboard"}],active:!0},{title:"Main Data",icon:"mdi-account",items:[{text:"Employees",to:"/employees"},{text:"Departments",to:"/department"},{text:"Sections",to:"/section"},{text:"Team",to:"/team"},{text:"Department - Section",to:"/divsec"},{text:"Job Assignments",to:"/jobassignments"},{text:"Query Builder",to:"/querybuilder"}],active:!1,hasGrandChild:!0},{title:"Maintenance",icon:"mdi-cog",items:[{text:"User Accounts",to:"/accounts"},{text:"Profile",to:"/profile"}],active:!1}];break}switch(this.userInfo.UserLevel){case 4:this.navDrawerSubGroup=[];break;case 5:this.navDrawerSubGroup=[{text:"Transfer Employees",items:[{text:"History",icon:"mdi-history",to:"/transferhistory"},{text:"Pending",icon:"mdi-timer-sand",to:"/pendingemployees"}]}];break;default:this.navDrawerSubGroup=[{text:"Transfer Employees",items:[{text:"Transfer",icon:"mdi-transfer",to:"/transferemployees"},{text:"History",icon:"mdi-history",to:"/transferhistory"},{text:"Pending",icon:"mdi-timer-sand",to:"/pendingemployees"}]}];break}}},watch:{dark:function(){this.changeTheme()}},components:{notifications:$}},R=F,B=n("40dc"),J=n("5bc1"),X=n("ce7e"),Q=n("56b0"),K=n("1800"),Y=n("34c3"),W=n("f774"),Z=n("2fa4"),ee=n("b73d"),te=n("8654"),ne=Object(N["a"])(R,j,g,!1,null,null,null),ae=ne.exports;w()(ne,{VAppBar:B["a"],VAppBarNavIcon:J["a"],VBtn:S["a"],VCard:I["a"],VDivider:X["a"],VIcon:L["a"],VList:O["a"],VListGroup:Q["a"],VListItem:H["a"],VListItemAction:K["a"],VListItemAvatar:V["a"],VListItemContent:G["a"],VListItemIcon:Y["a"],VListItemSubtitle:G["b"],VListItemTitle:G["c"],VMenu:P["a"],VNavigationDrawer:W["a"],VSpacer:Z["a"],VSwitch:ee["a"],VTextField:te["a"],VToolbarTitle:U["a"]});var se=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-footer",{staticClass:"font-weight-medium",attrs:{"clipped-left":"",padless:"",app:""}},[n("v-col",{staticClass:"text-center",attrs:{cols:"12"}},[e._v(" "+e._s((new Date).getFullYear())+" — "),n("strong",[e._v("Employee Master")])])],1)},oe=[],ie=n("62ad"),ce=n("553a"),re={},ue=Object(N["a"])(re,se,oe,!1,null,null,null),le=ue.exports;w()(ue,{VCol:ie["a"],VFooter:ce["a"]});var de={data:function(){return{}},components:{navdrawer:ae,navfooter:le}},fe=de,me=n("7496"),he=Object(N["a"])(fe,v,k,!1,null,null,null),be=he.exports;w()(he,{VApp:me["a"]});var pe=n("9483");Object(pe["a"])("".concat("/employeemaster/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var ve=n("8c4f"),ke=n("4360");a["a"].use(ve["a"]);var je=[{path:"/",name:"login",component:function(){return n.e("chunk-7abb7539").then(n.bind(null,"dd7b"))}},{path:"/dashboard",name:"dashboard",component:function(){return Promise.all([n.e("chunk-63e39f72"),n.e("chunk-bfc869ac"),n.e("chunk-28af06c8"),n.e("chunk-3429ecae")]).then(n.bind(null,"4601"))}},{path:"/employees",name:"employees",component:function(){return Promise.all([n.e("chunk-63e39f72"),n.e("chunk-bfc869ac"),n.e("chunk-97464840")]).then(n.bind(null,"7cd6"))}},{path:"/employeedetails",name:"employeedetails",component:function(){return Promise.all([n.e("chunk-63e39f72"),n.e("chunk-bfc869ac"),n.e("chunk-28af06c8"),n.e("chunk-17d8f546"),n.e("chunk-0820e7ce")]).then(n.bind(null,"b1e4"))}},{path:"/department",name:"department",component:function(){return Promise.all([n.e("chunk-63e39f72"),n.e("chunk-bfc869ac"),n.e("chunk-a1ed7034")]).then(n.bind(null,"0cfc"))}},{path:"/section",name:"section",component:function(){return Promise.all([n.e("chunk-63e39f72"),n.e("chunk-bfc869ac"),n.e("chunk-a05b1886")]).then(n.bind(null,"2526"))}},{path:"/team",name:"team",component:function(){return Promise.all([n.e("chunk-63e39f72"),n.e("chunk-bfc869ac"),n.e("chunk-8d22e5d6")]).then(n.bind(null,"6fc2"))}},{path:"/divsec",name:"divsec",component:function(){return Promise.all([n.e("chunk-63e39f72"),n.e("chunk-bfc869ac"),n.e("chunk-e65f275e")]).then(n.bind(null,"50a0"))}},{path:"/transferhistory",name:"transferhistory",component:function(){return Promise.all([n.e("chunk-63e39f72"),n.e("chunk-bfc869ac"),n.e("chunk-28af06c8"),n.e("chunk-2c094efc")]).then(n.bind(null,"f28a"))}},{path:"/transferemployees",name:"transferemployees",component:function(){return Promise.all([n.e("chunk-63e39f72"),n.e("chunk-bfc869ac"),n.e("chunk-28af06c8"),n.e("chunk-01f4fd7b")]).then(n.bind(null,"b94b"))}},{path:"/pendingemployees",name:"pendingemployees",component:function(){return Promise.all([n.e("chunk-63e39f72"),n.e("chunk-bfc869ac"),n.e("chunk-28af06c8"),n.e("chunk-2c0b5924")]).then(n.bind(null,"f021"))}},{path:"/accounts",name:"accounts",component:function(){return Promise.all([n.e("chunk-63e39f72"),n.e("chunk-bfc869ac"),n.e("chunk-0453a456")]).then(n.bind(null,"bd75"))}},{path:"/profile",name:"profile",component:function(){return Promise.all([n.e("chunk-63e39f72"),n.e("chunk-17d8f546"),n.e("chunk-b6390a44")]).then(n.bind(null,"b3b1"))}},{path:"/jobassignments",name:"jobassignments",component:function(){return Promise.all([n.e("chunk-63e39f72"),n.e("chunk-bfc869ac"),n.e("chunk-18aeff66")]).then(n.bind(null,"730b"))}},{path:"/querybuilder",name:"querybuilder",component:function(){return Promise.all([n.e("chunk-63e39f72"),n.e("chunk-bfc869ac"),n.e("chunk-28af06c8"),n.e("chunk-71043336")]).then(n.bind(null,"83cd"))}},{path:"*",name:"error",component:function(){return n.e("chunk-26e7d5f6").then(n.bind(null,"0636"))}}],ge=new ve["a"]({mode:"history",base:"/employeemaster/",routes:je});ge.beforeEach((function(e,t,n){"/"===e.path||ke["a"].state.isLoggedIn?"/"===e.path&&ke["a"].state.isLoggedIn?ke["a"].state.isConnect?n("/dashboard"):n("*"):n():n("/")}));var ye=ge;function _e(e,t){var a=[],s=[],o={},i=n("e499");if(void 0==i.vfs){var c=n("4ebb");i.vfs=c.pdfMake.vfs}e.forEach((function(e){a.push({text:e.value,style:"tableHeader"})})),o={pageSize:"A4",pageOrientation:"landscape",pageMargins:[40,60,40,60],content:[{text:"Results",style:"header"},{headerRows:1,style:"tableExample",widths:["*","auto"],table:{body:[a]}}],styles:{header:{fontSize:18,bold:!0,margin:[0,0,0,10]},subheader:{fontSize:16,bold:!0,margin:[0,10,0,5]},tableExample:{margin:[0,5,0,15]},tableHeader:{bold:!0,fontSize:13,color:"black"}}},t.forEach((function(e){a.forEach((function(t){s.push(e[t.text])})),o.content[1].table.body.push(s),s=[]})),window.open(i.createPdf(o).open(),"_blank")}var Ee=_e,xe=n("f309");n("5363");a["a"].use(xe["a"]);var Ne=new xe["a"]({icons:{iconfont:"mdi"},theme:{dark:!1,themes:{light:{primary:"#1976D2",secondary:"#455A64",accent:"#8c9eff",error:"#b71c1c",info:"#2196F3",success:"#4CAF50",warning:"#FFC107",highlightcolor:"#42A5F5",icon_color:"#212121",table_header_color:"#213c57"}}}}),Ce=n("5530"),we=n("2f62"),De={install:function(e){e.mixin({data:function(){return{api:"http://localhost:8700/api",api_jap:"https://1ze9v428i9.execute-api.us-east-2.amazonaws.com/prod/getUsers",asd_sql:"http://adminsql1/asdserver/api",photo:"http://adminsql1/photos",photo_jap:"http://adminsql1/photos/jap"}},created:function(){void 0==ke["a"].state.EmployeeCode?this.axios.defaults.headers.common["x-api-key"]="JUe7mHXOhR6ziaSDHXUDJ310nTfdsH8s1ph44z2q":this.axios.defaults.headers.common["master-api"]="db588403f0a1d3b897442a28724166b4"},computed:Object(Ce["a"])({},Object(we["c"])(["userInfo","isLoggedIn","darkMode","searchData","emplcode","isEmpEdit","isConnect"])),methods:Object(Ce["a"])(Object(Ce["a"])({},Object(we["b"])(["CHANGE_USER_INFO","CHANGE_USER_LOGGING","CHANGE_THEME","CHANGE_SEARCHING","CHANGE_EMPLCODE","CHANGE_EMP_EDIT","CHANGE_CONNECTION"])),{},{setNotifications:function(e,t){var n={procedureName:"ProcPushNotification",values:[0,this.$socket.id,this.userInfo.CompanyCode,e,t,1]};this.axios.post("".concat(this.api,"/execute"),{data:JSON.stringify(n)}),this.$socket.emit("newNotifications",n.values)},clearHeaders:function(e){1==e?(delete this.axios.defaults.headers.common["x-api-key"],this.axios.defaults.headers.common["master-api"]="db588403f0a1d3b897442a28724166b4"):(delete this.axios.defaults.headers.common["master-api"],this.axios.defaults.headers.common["x-api-key"]="JUe7mHXOhR6ziaSDHXUDJ310nTfdsH8s1ph44z2q")}})})}},Se=De,Ie="http://localhost:8700",Le=m()(Ie);a["a"].config.productionTip=!1,a["a"].prototype.axios=o.a,a["a"].prototype.swal=u.a,a["a"].prototype.md5=c.a,a["a"].prototype.moment=d.a,a["a"].prototype.printreport=Ee,a["a"].use(Se),a["a"].use(p["a"]),a["a"].use(new b.a({debug:!1,connection:Le})),new a["a"]({router:ye,store:ke["a"],vuetify:Ne,sockets:{connect:function(){ke["a"].commit("CHANGE_CONNECTION",!0)},disconnect:function(){ke["a"].commit("CHANGE_CONNECTION",!1),this.$router.push("*")}},render:function(e){return e(be)}}).$mount("#app")},d267:function(e,t,n){}});
//# sourceMappingURL=app.84d519c5.js.map