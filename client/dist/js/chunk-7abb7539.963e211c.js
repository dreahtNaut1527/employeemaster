(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7abb7539"],{"0fd9":function(t,e,i){"use strict";i("99af"),i("4160"),i("caad"),i("13d5"),i("4ec9"),i("b64b"),i("d3b7"),i("ac1f"),i("2532"),i("3ca3"),i("5319"),i("159b"),i("ddb0");var n=i("ade3"),a=i("5530"),s=(i("4b85"),i("2b0e")),o=i("d9f7"),r=i("80d2"),c=["sm","md","lg","xl"],l=["start","end","center"];function d(t,e){return c.reduce((function(i,n){return i[t+Object(r["F"])(n)]=e(),i}),{})}var u=function(t){return[].concat(l,["baseline","stretch"]).includes(t)},h=d("align",(function(){return{type:String,default:null,validator:u}})),f=function(t){return[].concat(l,["space-between","space-around"]).includes(t)},v=d("justify",(function(){return{type:String,default:null,validator:f}})),m=function(t){return[].concat(l,["space-between","space-around","stretch"]).includes(t)},p=d("alignContent",(function(){return{type:String,default:null,validator:m}})),g={align:Object.keys(h),justify:Object.keys(v),alignContent:Object.keys(p)},b={align:"align",justify:"justify",alignContent:"align-content"};function y(t,e,i){var n=b[t];if(null!=i){if(e){var a=e.replace(t,"");n+="-".concat(a)}return n+="-".concat(i),n.toLowerCase()}}var w=new Map;e["a"]=s["a"].extend({name:"v-row",functional:!0,props:Object(a["a"])(Object(a["a"])(Object(a["a"])({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:u}},h),{},{justify:{type:String,default:null,validator:f}},v),{},{alignContent:{type:String,default:null,validator:m}},p),render:function(t,e){var i=e.props,a=e.data,s=e.children,r="";for(var c in i)r+=String(i[c]);var l=w.get(r);return l||function(){var t,e;for(e in l=[],g)g[e].forEach((function(t){var n=i[t],a=y(e,t,n);a&&l.push(a)}));l.push((t={"no-gutters":i.noGutters,"row--dense":i.dense},Object(n["a"])(t,"align-".concat(i.align),i.align),Object(n["a"])(t,"justify-".concat(i.justify),i.justify),Object(n["a"])(t,"align-content-".concat(i.alignContent),i.alignContent),t)),w.set(r,l)}(),t(i.tag,Object(o["a"])(a,{staticClass:"row",class:l}),s)}})},"169a":function(t,e,i){"use strict";i("7db0"),i("caad"),i("45fc"),i("a9e3"),i("2532"),i("498a");var n=i("5530"),a=i("2909"),s=i("ade3"),o=(i("368e"),i("480e")),r=i("4ad4"),c=i("b848"),l=i("75eb"),d=i("e707"),u=i("e4d3"),h=i("21be"),f=i("f2e7"),v=i("a293"),m=i("58df"),p=i("d9bd"),g=i("80d2"),b=Object(m["a"])(r["a"],c["a"],l["a"],d["a"],u["a"],h["a"],f["a"]);e["a"]=b.extend({name:"v-dialog",directives:{ClickOutside:v["a"]},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:{type:[String,Number],default:"none"},noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:{type:[String,Number],default:"auto"}},data:function(){return{activatedBy:null,animate:!1,animateTimeout:-1,isActive:!!this.value,stackMinZIndex:200,previousActiveElement:null}},computed:{classes:function(){var t;return t={},Object(s["a"])(t,"v-dialog ".concat(this.contentClass).trim(),!0),Object(s["a"])(t,"v-dialog--active",this.isActive),Object(s["a"])(t,"v-dialog--persistent",this.persistent),Object(s["a"])(t,"v-dialog--fullscreen",this.fullscreen),Object(s["a"])(t,"v-dialog--scrollable",this.scrollable),Object(s["a"])(t,"v-dialog--animated",this.animate),t},contentClasses:function(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator:function(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive:function(t){var e;t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind(),null==(e=this.previousActiveElement)||e.focus())},fullscreen:function(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created:function(){this.$attrs.hasOwnProperty("full-width")&&Object(p["e"])("full-width",this)},beforeMount:function(){var t=this;this.$nextTick((function(){t.isBooted=t.isActive,t.isActive&&t.show()}))},beforeDestroy:function(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick:function(){var t=this;this.animate=!1,this.$nextTick((function(){t.animate=!0,window.clearTimeout(t.animateTimeout),t.animateTimeout=window.setTimeout((function(){return t.animate=!1}),150)}))},closeConditional:function(t){var e=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(e)||this.overlay&&e&&!this.overlay.$el.contains(e))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll:function(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):d["a"].options.methods.hideScroll.call(this)},show:function(){var t=this;!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((function(){t.$nextTick((function(){t.previousActiveElement=document.activeElement,t.$refs.content.focus(),t.bind()}))}))},bind:function(){window.addEventListener("focusin",this.onFocusin)},unbind:function(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside:function(t){this.$emit("click:outside",t),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown:function(t){if(t.keyCode===g["x"].esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;var e=this.getActivator();this.$nextTick((function(){return e&&e.focus()}))}this.$emit("keydown",t)},onFocusin:function(t){if(t&&this.retainFocus){var e=t.target;if(e&&![document,this.$refs.content].includes(e)&&!this.$refs.content.contains(e)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((function(t){return t.contains(e)}))){var i=this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),n=Object(a["a"])(i).find((function(t){return!t.hasAttribute("disabled")}));n&&n.focus()}}},genContent:function(){var t=this;return this.showLazyContent((function(){return[t.$createElement(o["a"],{props:{root:!0,light:t.light,dark:t.dark}},[t.$createElement("div",{class:t.contentClasses,attrs:Object(n["a"])({role:"document",tabindex:t.isActive?0:void 0},t.getScopeIdAttrs()),on:{keydown:t.onKeydown},style:{zIndex:t.activeZIndex},ref:"content"},[t.genTransition()])])]}))},genTransition:function(){var t=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[t]):t},genInnerContent:function(){var t={class:this.classes,ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(t.style=Object(n["a"])(Object(n["a"])({},t.style),{},{maxWidth:"none"===this.maxWidth?void 0:Object(g["g"])(this.maxWidth),width:"auto"===this.width?void 0:Object(g["g"])(this.width)})),this.$createElement("div",t,this.getContentSlot())}},render:function(t){return t("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach},attrs:{role:"dialog"}},[this.genActivator(),this.genContent()])}})},"368e":function(t,e,i){},"4bd4":function(t,e,i){"use strict";i("4de4"),i("7db0"),i("4160"),i("caad"),i("07ac"),i("2532"),i("159b");var n=i("5530"),a=i("58df"),s=i("7e2b"),o=i("3206");e["a"]=Object(a["a"])(s["a"],Object(o["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,i=function(t){return t.$watch("hasError",(function(i){e.$set(e.errorBag,t._uid,i)}),{immediate:!0})},n={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=t.$watch("shouldValidate",(function(a){a&&(e.errorBag.hasOwnProperty(t._uid)||(n.valid=i(t)))})):n.valid=i(t),n},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var i=this.watchers.find((function(t){return t._uid===e._uid}));i&&(i.valid(),i.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object(n["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},"99d9":function(t,e,i){"use strict";i.d(e,"a",(function(){return s})),i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return c}));var n=i("b0af"),a=i("80d2"),s=Object(a["i"])("v-card__actions"),o=Object(a["i"])("v-card__subtitle"),r=Object(a["i"])("v-card__text"),c=Object(a["i"])("v-card__title");n["a"]},a523:function(t,e,i){"use strict";i("99af"),i("4de4"),i("b64b"),i("2ca0"),i("20f6"),i("4b85"),i("a15b"),i("498a");var n=i("2b0e");function a(t){return n["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,i){var n=i.props,a=i.data,s=i.children;a.staticClass="".concat(t," ").concat(a.staticClass||"").trim();var o=a.attrs;if(o){a.attrs={};var r=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(a.attrs[t]=e,!1):e||"string"===typeof e}));r.length&&(a.staticClass+=" ".concat(r.join(" ")))}return n.id&&(a.domProps=a.domProps||{},a.domProps.id=n.id),e(n.tag,a,s)}})}var s=i("d9f7");e["a"]=a("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var i,n=e.props,a=e.data,o=e.children,r=a.attrs;return r&&(a.attrs={},i=Object.keys(r).filter((function(t){if("slot"===t)return!1;var e=r[t];return t.startsWith("data-")?(a.attrs[t]=e,!1):e||"string"===typeof e}))),n.id&&(a.domProps=a.domProps||{},a.domProps.id=n.id),t(n.tag,Object(s["a"])(a,{staticClass:"container",class:Array({"container--fluid":n.fluid}).concat(i||[])}),o)}})},bd0c:function(t,e,i){},ca71:function(t,e,i){},dd7b:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-main",[i("v-container",{staticClass:"fill-height"},[i("v-row",{attrs:{align:"center",justify:"center"}},[i("v-col",{attrs:{cols:"12",md:"4"}},[i("v-card",{attrs:{elevation:"7"}},[i("v-card-text",{staticClass:"text-center title"},[i("v-card-text",[i("v-card-text",{staticClass:"text-center title"},[t._v("Sign in to Employee Master")])],1),i("v-avatar",{staticClass:"mb-6",attrs:{color:"primary",size:"95"}},[i("v-icon",{attrs:{"x-large":"",dark:""}},[t._v("mdi-account")])],1),i("v-form",[i("v-text-field",{attrs:{placeholder:"Username",outlined:"",rounded:""},on:{blur:function(e){return t.getUserInfo()}},scopedSlots:t._u([{key:"append",fn:function(){return[t.loading?t._e():i("v-icon",[t._v("mdi-account")]),i("v-fade-transition",{attrs:{"leave-absolute":""}},[t.loading?i("v-progress-circular",{attrs:{size:"24",color:"info",indeterminate:""}}):t._e()],1)]},proxy:!0}]),model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),i("v-text-field",{attrs:{placeholder:"Password","append-icon":"mdi-lock",type:"password",outlined:"",rounded:""},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.userLoggedIn()}},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),i("v-card-actions",[i("v-btn",{attrs:{color:"primary",disabled:1==t.loading,block:""},on:{click:function(e){return t.userLoggedIn()}}},[t._v("Login")])],1),i("v-card-text",{staticClass:"text-center"},[t._v(" Don't have any account? "),i("v-btn",{attrs:{color:"primary","x-small":"",text:""},on:{click:function(e){t.signUpDialog=!t.signUpDialog}}},[t._v(" Sign Up ")])],1)],1)],1)],1)],1)],1)],1),i("v-dialog",{attrs:{width:"400",persistent:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[i("v-card",{staticClass:"rounded-lg",attrs:{light:""}},[i("v-toolbar",{attrs:{color:t.dialogColor,flat:""}},[i("v-icon",{attrs:{"x-large":"",dark:""}},[t._v("mdi-information")])],1),i("v-card-text",{staticClass:"text-center"},[i("v-card-text",[i("v-card-text",{staticClass:"headline"},[t._v(t._s(t.dialogTitle))]),t._v(" "+t._s(t.dialogText)+" ")],1),i("v-card-actions",[i("v-btn",{attrs:{color:t.dialogColor,block:"",dark:""},on:{click:function(e){return t.userLoggedIn()}}},[t._v("close")])],1)],1)],1)],1),i("v-snackbar",{attrs:{color:"error",timeout:2e3,transition:"scroll-x-reverse-transition",right:"",dark:""},scopedSlots:t._u([{key:"action",fn:function(e){var n=e.attrs;return[i("v-btn",t._b({attrs:{icon:""},on:{click:function(e){t.alert=!1}}},"v-btn",n,!1),[i("v-icon",[t._v("mdi-close-circle")])],1)]}}]),model:{value:t.alert,callback:function(e){t.alert=e},expression:"alert"}},[t._v(" "+t._s(t.alertText)+" ")]),i("signUp",{attrs:{signUpDialog:t.signUpDialog}})],1)},a=[],s=(i("99af"),i("4360")),o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-dialog",{attrs:{width:"500",transition:"scale-transition",persistent:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[i("v-card",[i("v-container",{attrs:{"fill-height":""}},[i("v-toolbar",{attrs:{flat:""}},[i("v-toolbar-title",{staticClass:"text-center headline"},[t._v(" Create account ")]),i("v-spacer"),i("v-btn",{attrs:{icon:""},on:{click:function(e){t.dialog=!1}}},[i("v-icon",[t._v("mdi-close")])],1)],1),i("v-row",{attrs:{align:"center",justify:"center"}},[i("v-col",{attrs:{cols:"12"}},[i("v-card-text",{staticClass:"text-center subheading"},[i("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[i("v-card-text",[i("v-row",{attrs:{align:"center",justify:"center",dense:""}},[i("v-col",{attrs:{cols:"12",md:"3"}},[i("v-text-field",{attrs:{label:"Code",rules:[function(t){return!!t||"Code is required"}],outlined:"",dense:""},on:{blur:function(e){return t.getEmployeeFullname()}},model:{value:t.editedAccount.EmployeeCode,callback:function(e){t.$set(t.editedAccount,"EmployeeCode",e)},expression:"editedAccount.EmployeeCode"}})],1),i("v-col",{attrs:{cols:"12",md:"9"}},[i("v-text-field",{attrs:{label:"Name",readonly:"",outlined:"",dense:""},scopedSlots:t._u([{key:"append",fn:function(){return[i("v-fade-transition",{attrs:{"leave-absolute":""}},[t.loadName?i("v-progress-circular",{attrs:{size:"24",color:"primary",indeterminate:""}}):t._e()],1)]},proxy:!0}]),model:{value:t.editedAccount.Fullname,callback:function(e){t.$set(t.editedAccount,"Fullname",e)},expression:"editedAccount.Fullname"}})],1),i("v-col",{attrs:{cols:"12",md:"12"}},[i("v-text-field",{attrs:{"append-icon":"mdi-account",label:"UserName",rules:[function(t){return!!t||"Username is required"}],outlined:"",dense:""},model:{value:t.editedAccount.Username,callback:function(e){t.$set(t.editedAccount,"Username",e)},expression:"editedAccount.Username"}})],1),i("v-col",{attrs:{cols:"12",md:"6"}},[i("v-text-field",{attrs:{"append-icon":"mdi-lock",label:"Password",type:"password",rules:[function(t){return!!t||"Password is required"}],outlined:"",dense:""},model:{value:t.newPassword,callback:function(e){t.newPassword=e},expression:"newPassword"}})],1),i("v-col",{attrs:{cols:"12",md:"6"}},[i("v-text-field",{attrs:{"append-icon":"mdi-lock-check",label:"Confirm Password",type:"password",rules:t.passwordRules,outlined:"",dense:""},model:{value:t.confirmedPassword,callback:function(e){t.confirmedPassword=e},expression:"confirmedPassword"}})],1)],1)],1)],1),i("v-card-actions",[i("v-btn",{attrs:{color:"primary",disabled:t.disableButton,block:""},on:{click:function(e){return t.saveRecord()}}},[t._v(" Create an account ")])],1),i("v-card-actions",[i("v-btn",{attrs:{color:"primary",block:""},on:{click:function(e){return t.clearVariables()}}},[t._v(" Log in to your account ")])],1)],1)],1)],1)],1)],1)],1)},r=[],c={props:["signUpDialog"],data:function(){var t=this;return{valid:!0,dialog:!1,loadName:!1,disableButton:!1,newPassword:"",confirmedPassword:"",passwordRules:[function(t){return!!t||"Password is required"},function(e){return e==t.newPassword||"Password do not match"}],editedAccount:{EmployeeCode:"",Username:"",Fullname:"",IPAddr:"",UserLevel:0},saveOptions:{title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showDenyButton:!0,showCancelButton:!0,confirmButtonText:"Save",denyButtonText:"Don't Save"}}},methods:{saveRecord:function(){var t=this;this.$refs.form.validate()&&this.swal.fire(this.saveOptions).then((function(e){if(e.isConfirmed){var i={procedureName:"ProcUserControl",values:[t.editedAccount.EmployeeCode,t.editedAccount.Username,t.editedAccount.Fullname,t.md5(t.newPassword),"",0,t.moment().format("YYYY-MM-DD"),t.moment().format("YYYY-MM-DD"),"ASD",1]};t.axios.post("".concat(t.api,"/execute"),{data:JSON.stringify(i)}),t.swal.fire("Hooray!","Changes has been saved","success"),t.clearVariables()}else e.isDenied&&t.swal.fire("Oh no!","Changes are not saved","info")}))},getEmployeeFullname:function(){var t=this;""!=this.editedAccount.EmployeeCode&&(this.loadName=!0,this.axios.get("".concat(this.api,"/employeeinfo/").concat(this.editedAccount.EmployeeCode)).then((function(e){t.$refs.form.resetValidation(),e.data.length>0?(t.disableButton=!1,t.editedAccount.Fullname=e.data[0].EmployeeName,t.getUserAccount()):t.disableButton=!0,t.loadName=!1})))},getUserAccount:function(){var t=this,e={procedureName:"ProcGetUserAccount",values:[this.editedAccount.EmployeeCode]};this.axios.post("".concat(this.api,"/executeselect"),{data:JSON.stringify(e)}).then((function(e){void 0!=e.data[0].Username?t.disableButton=!0:t.disableButton=!1}))},clearVariables:function(){this.editedAccount={EmployeeCode:"",Username:"",Fullname:"",IPAddr:"",UserLevel:0},this.dialog&&this.$refs.form.resetValidation(),this.newPassword="",this.confirmedPassword="",this.dialog=!1}},watch:{signUpDialog:function(){this.dialog=!0}}},l=c,d=i("2877"),u=i("6544"),h=i.n(u),f=i("8336"),v=i("b0af"),m=i("99d9"),p=i("62ad"),g=i("a523"),b=i("169a"),y=i("0789"),w=i("4bd4"),C=i("132d"),x=i("490a"),k=i("0fd9"),_=i("2fa4"),O=i("8654"),A=i("71d9"),j=i("2a7f"),E=Object(d["a"])(l,o,r,!1,null,null,null),S=E.exports;h()(E,{VBtn:f["a"],VCard:v["a"],VCardActions:m["a"],VCardText:m["b"],VCol:p["a"],VContainer:g["a"],VDialog:b["a"],VFadeTransition:y["d"],VForm:w["a"],VIcon:C["a"],VProgressCircular:x["a"],VRow:k["a"],VSpacer:_["a"],VTextField:O["a"],VToolbar:A["a"],VToolbarTitle:j["a"]});var T={data:function(){return{dialog:!1,alert:!1,valid:!1,remember:!1,loading:!1,signUpDialog:!1,alertText:"",username:"",password:"",dialogTitle:"",dialogText:"",dialogIcon:"",dialogColor:"",employeeDetails:{},myIpAddress:{}}},created:function(){var t=this;this.clearHeaders(0),s["a"].commit("CHANGE_CONNECTION",!0),s["a"].commit("CHANGE_USER_INFO",{}),s["a"].commit("CHANGE_USER_LOGGING",!1),this.axios.get("".concat(this.asd_sql,"/getclientip.php")).then((function(e){t.myIpAddress=e.data}))},sockets:{connect:function(){s["a"].commit("CHANGE_CONNECTION",!0)},disconnect:function(){this.alert=!this.alert,this.alertText="Could not connect to server. Please try again",this.loading=!0,s["a"].commit("CHANGE_CONNECTION",!1)}},methods:{getUserInfo:function(){var t=this;this.alert=!1,this.loading=!0,this.employeeDetails="";var e={procedureName:"ProcGetUserAccount",values:[this.username]};this.username?(this.clearHeaders(0),this.axios.get("".concat(this.api_jap,"/").concat(this.username)).then((function(i){t.loading=!1,t.employeeDetails=JSON.parse(JSON.stringify(i.data)),""==t.employeeDetails?(t.clearHeaders(1),t.axios.post("".concat(t.api,"/executeselect"),{data:JSON.stringify(e)}).then((function(e){t.loading=!1,t.employeeDetails=e.data[0],t.employeeDetails||(t.alert=!t.alert,t.alertText="User not found.")}))):(delete t.employeeDetails.userLevel,Object.assign(t.employeeDetails,{UserLevel:5}),t.employeeDetails.AssignDepartments.push(t.employeeDetails.LocalDepartments),"SCAD"==t.employeeDetails.Comp_Name?t.employeeDetails.Comp_Name="SCD":"WUKONG"==t.employeeDetails.Comp_Name&&(t.employeeDetails.Comp_Name="WKN"))}))):(this.alert=!this.alert,this.alertText="Please input username",this.loading=!1)},userLoggedIn:function(){5==this.employeeDetails.UserLevel?this.employeeDetails.Password==this.md5(this.password)?(this.clearHeaders(1),s["a"].commit("CHANGE_USER_INFO",this.employeeDetails),s["a"].commit("CHANGE_USER_LOGGING",!0),this.$router.push("/dashboard")):(this.alert=!0,this.alertText="Incorrect password. Please try again"):1==this.employeeDetails.Status||void 0!=this.employeeDetails.Status?this.employeeDetails.Password==this.md5(this.password)?(s["a"].commit("CHANGE_USER_INFO",this.employeeDetails),s["a"].commit("CHANGE_USER_LOGGING",!0),0==this.employeeDetails.UserLevel?this.$router.push("/profile"):this.$router.push("/dashboard")):(this.alert=!0,this.alertText="Incorrect password. Please try again"):0==this.employeeDetails.Status||void 0!=this.employeeDetails.Status?(this.alert=!0,this.alertText="Account has been deactivate."):(this.alert=!0,this.alertText="Account does not exists."),this.clearVariables()},clearVariables:function(){this.username="",this.password=""}},components:{signUp:S}},B=T,D=i("8212"),N=i("f6c4"),V=(i("caad"),i("a9e3"),i("ade3")),$=(i("ca71"),i("8dd9")),P=i("a9ad"),U=i("7560"),I=i("f2e7"),F=i("fe6c"),L=i("58df"),G=i("80d2"),H=i("d9bd"),R=Object(L["a"])($["a"],P["a"],I["a"],Object(F["b"])(["absolute","bottom","left","right","top"])).extend({name:"v-snackbar",props:{app:Boolean,centered:Boolean,contentClass:{type:String,default:""},multiLine:Boolean,text:Boolean,timeout:{type:[Number,String],default:5e3},transition:{type:[Boolean,String],default:"v-snack-transition",validator:function(t){return"string"===typeof t||!1===t}},vertical:Boolean},data:function(){return{activeTimeout:-1}},computed:{classes:function(){return{"v-snack--absolute":this.absolute,"v-snack--active":this.isActive,"v-snack--bottom":this.bottom||!this.top,"v-snack--centered":this.centered,"v-snack--has-background":this.hasBackground,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--text":this.text,"v-snack--top":this.top,"v-snack--vertical":this.vertical}},hasBackground:function(){return!this.text&&!this.outlined},isDark:function(){return this.hasBackground?!this.light:U["a"].options.computed.isDark.call(this)},styles:function(){if(this.absolute)return{};var t=this.$vuetify.application,e=t.bar,i=t.bottom,n=t.footer,a=t.insetFooter,s=t.left,o=t.right,r=t.top;return{paddingBottom:Object(G["g"])(i+n+a),paddingLeft:this.app?Object(G["g"])(s):void 0,paddingRight:this.app?Object(G["g"])(o):void 0,paddingTop:Object(G["g"])(e+r)}}},watch:{isActive:"setTimeout",timeout:"setTimeout"},mounted:function(){this.isActive&&this.setTimeout()},created:function(){this.$attrs.hasOwnProperty("auto-height")&&Object(H["e"])("auto-height",this),0==this.timeout&&Object(H["d"])('timeout="0"',"-1",this)},methods:{genActions:function(){return this.$createElement("div",{staticClass:"v-snack__action "},[Object(G["s"])(this,"action",{attrs:{class:"v-snack__btn"}})])},genContent:function(){return this.$createElement("div",{staticClass:"v-snack__content",class:Object(V["a"])({},this.contentClass,!0),attrs:{role:"status","aria-live":"polite"}},[Object(G["s"])(this)])},genWrapper:function(){var t=this.hasBackground?this.setBackgroundColor:this.setTextColor,e=t(this.color,{staticClass:"v-snack__wrapper",class:$["a"].options.computed.classes.call(this),directives:[{name:"show",value:this.isActive}]});return this.$createElement("div",e,[this.genContent(),this.genActions()])},genTransition:function(){return this.$createElement("transition",{props:{name:this.transition}},[this.genWrapper()])},setTimeout:function(){var t=this;window.clearTimeout(this.activeTimeout);var e=Number(this.timeout);this.isActive&&![0,-1].includes(e)&&(this.activeTimeout=window.setTimeout((function(){t.isActive=!1}),e))}},render:function(t){return t("div",{staticClass:"v-snack",class:this.classes,style:this.styles},[!1!==this.transition?this.genTransition():this.genWrapper()])}}),M=Object(d["a"])(B,n,a,!1,null,null,null);e["default"]=M.exports;h()(M,{VAvatar:D["a"],VBtn:f["a"],VCard:v["a"],VCardActions:m["a"],VCardText:m["b"],VCol:p["a"],VContainer:g["a"],VDialog:b["a"],VFadeTransition:y["d"],VForm:w["a"],VIcon:C["a"],VMain:N["a"],VProgressCircular:x["a"],VRow:k["a"],VSnackbar:R,VTextField:O["a"],VToolbar:A["a"]})},f6c4:function(t,e,i){"use strict";i("bd0c");var n=i("d10f");e["a"]=n["a"].extend({name:"v-main",props:{tag:{type:String,default:"main"}},computed:{styles:function(){var t=this.$vuetify.application,e=t.bar,i=t.top,n=t.right,a=t.footer,s=t.insetFooter,o=t.bottom,r=t.left;return{paddingTop:"".concat(i+e,"px"),paddingRight:"".concat(n,"px"),paddingBottom:"".concat(a+s+o,"px"),paddingLeft:"".concat(r,"px")}}},render:function(t){var e={staticClass:"v-main",style:this.styles,ref:"main"};return t(this.tag,e,[t("div",{staticClass:"v-main__wrap"},this.$slots.default)])}})}}]);
//# sourceMappingURL=chunk-7abb7539.963e211c.js.map