"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([[157],{6157:(h,g,o)=>{o.r(g),o.d(g,{AuthModule:()=>p});var s=o(6895),a=o(9371),l=o(5861),t=o(1571),r=o(7556);const d=[{path:"",component:(()=>{class n{constructor(e){this.authService=e}ngOnInit(){}ngAfterViewInit(){google.accounts.id.initialize({client_id:"318603230447-6qjgeco2187epkkbtkid4tc5fv65efdg.apps.googleusercontent.com",ux_mode:"redirect",callback:c=>{console.log(c)}}),google.accounts.id.renderButton(document.getElementById("g_id_onload"),{theme:"outline",size:"large"})}login(e){var c=this;return(0,l.Z)(function*(){"apple"===e&&(yield c.authService.appleLogin()),"google"===e&&(yield c.authService.googleLogin())})()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(r.e))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-login"]],decls:23,vars:0,consts:[["src","/assets/images/welcome.png","alt","",1,"cover"],[1,"list"],[1,"point"],[1,"title"],[1,"text"],[1,"actions"],[1,"sign-in-btn",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","11","height","14","viewBox","0 0 11 14","fill","none"],["d","M5.66328 3.23077C6.27344 3.23077 7.03828 2.80356 7.49375 2.23395C7.90625 1.71774 8.20703 0.996822 8.20703 0.275906C8.20703 0.178004 8.19844 0.0801017 8.18125 0C7.50234 0.0267006 6.68594 0.47171 6.19609 1.06802C5.80938 1.52193 5.45703 2.23395 5.45703 2.96376C5.45703 3.07057 5.47422 3.17737 5.48281 3.21297C5.52578 3.22187 5.59453 3.23077 5.66328 3.23077ZM3.51484 14C4.34844 14 4.71797 13.4215 5.75781 13.4215C6.81484 13.4215 7.04687 13.9822 7.975 13.9822C8.88594 13.9822 9.49609 13.11 10.0719 12.2556C10.7164 11.2765 10.9828 10.3153 11 10.2708C10.9398 10.253 9.19531 9.5143 9.19531 7.44056C9.19531 5.64272 10.5703 4.8328 10.6477 4.7705C9.73672 3.41767 8.35312 3.38207 7.975 3.38207C6.95234 3.38207 6.11875 4.02289 5.59453 4.02289C5.02734 4.02289 4.27969 3.41767 3.39453 3.41767C1.71016 3.41767 0 4.8595 0 7.58296C0 9.274 0.635937 11.0629 1.41797 12.22C2.08828 13.199 2.67266 14 3.51484 14Z","fill","white"],["id","g_id_onload","data-client_id","318603230447-6qjgeco2187epkkbtkid4tc5fv65efdg.apps.googleusercontent.com","data-context","signin","data-itp_support","true"]],template:function(e,c){1&e&&(t._UZ(0,"img",0),t.TgZ(1,"div",1)(2,"div",2)(3,"div",3),t._uU(4,"Free"),t.qZA(),t.TgZ(5,"div",4),t._uU(6,"Internet access is a basic human right."),t.qZA()(),t.TgZ(7,"div",2)(8,"div",3),t._uU(9,"Spend points"),t.qZA(),t.TgZ(10,"div",4),t._uU(11," Plans use points which you earn by watching a quick ad. "),t.qZA()(),t.TgZ(12,"div",2)(13,"div",3),t._uU(14,"Privacy"),t.qZA(),t.TgZ(15,"div",4),t._uU(16," We don't track or store your activity. Stay secure with military grade encryption between your device and our servers. "),t.qZA()()(),t.TgZ(17,"div",5)(18,"button",6),t.NdJ("click",function(){return c.login("apple")}),t.O4$(),t.TgZ(19,"svg",7),t._UZ(20,"path",8),t.qZA(),t._uU(21," Sign in with Apple "),t.qZA(),t.kcU(),t._UZ(22,"div",9),t.qZA())},styles:["[_nghost-%COMP%]{display:block;height:100%;position:relative;background:#fff;padding:24px}.cover[_ngcontent-%COMP%]{margin-bottom:24px;width:402px;min-width:402px;max-width:402px;height:226px;min-height:226px;max-height:226px}.list[_ngcontent-%COMP%]   .point[_ngcontent-%COMP%]:not(:last-child){margin-bottom:20px}.list[_ngcontent-%COMP%]   .point[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{margin-bottom:4px;font-size:20px;font-weight:700;line-height:28px;color:#000}.list[_ngcontent-%COMP%]   .point[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{font-size:12px;font-weight:400;line-height:17px;color:#000}.actions[_ngcontent-%COMP%]{position:absolute;width:calc(100% - 48px);bottom:24px}.actions[_ngcontent-%COMP%]   .sign-in-btn[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:center;align-items:center;background:#000000;border-radius:4px;cursor:pointer;outline:none;border:none;padding:0;font-size:16px;font-weight:400;line-height:40px;color:#fff}.actions[_ngcontent-%COMP%]   .sign-in-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{margin-right:16px}.actions[_ngcontent-%COMP%]   .sign-in-btn[_ngcontent-%COMP%]:first-child{margin-bottom:12px}"],changeDetection:0}),n})()}];let u=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[s.ez,a.Bz.forChild(d),a.Bz]}),n})(),p=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[s.ez,u]}),n})()}}]);