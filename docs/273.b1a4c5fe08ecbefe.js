"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([[273],{6273:(A,g,c)=>{c.r(g),c.d(g,{ShopModule:()=>w});var l=c(6895),r=c(9371),m=c(1135),d=c(3900),C=c(5835),n=c(1571),u=c(7626),v=c(8056),P=c(4737),h=c(3646);let f=(()=>{class e{constructor(t){this.appQuery=t,this.balance$=this.appQuery.balance$}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(u._))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-balance"]],standalone:!0,features:[n.jDz],decls:7,vars:3,consts:[[1,"balance"],[1,"title"],[1,"amount"],["src","/assets/icons/shop-guys.svg","alt",""]],template:function(t,o){1&t&&(n.TgZ(0,"div",0)(1,"div",1),n._uU(2," POINTS BALANCE "),n.qZA(),n.TgZ(3,"div",2),n._uU(4),n.ALo(5,"async"),n.qZA(),n._UZ(6,"img",3),n.qZA()),2&t&&(n.xp6(4),n.hij(" ",n.lcZ(5,1,o.balance$)," "))},dependencies:[l.ez,l.Ov],styles:[".balance[_ngcontent-%COMP%]{padding:24px;background:#000000;border-radius:20px;position:relative}.balance[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{margin-bottom:8px;font-size:14px;font-weight:600;line-height:16px;color:#ffffff80}.balance[_ngcontent-%COMP%]   .amount[_ngcontent-%COMP%]{font-size:57px;font-weight:600;line-height:68px;color:#fff}.balance[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{position:absolute;right:0;bottom:0;border-radius:20px}"],changeDetection:0}),e})();var x=c(1101);function b(e,i){if(1&e){const t=n.EpF();n.TgZ(0,"div",12),n.NdJ("click",function(){const s=n.CHM(t).$implicit,p=n.oxw(2).ngLet,T=n.oxw();return n.KtG(T.select(s.id,p))}),n.ALo(1,"async"),n.TgZ(2,"div",5),n._uU(3),n.qZA(),n.TgZ(4,"div",13),n._uU(5),n.qZA(),n.TgZ(6,"div",14),n._uU(7),n.qZA()()}if(2&e){const t=i.$implicit,o=n.oxw(3);n.ekj("selected",n.lcZ(1,5,o.planId$)===t.id),n.xp6(3),n.hij(" ",t.name," "),n.xp6(2),n.hij(" ",o.getDuration(t.duration)," "),n.xp6(2),n.hij("",t.price," points")}}function _(e,i){if(1&e&&(n.ynx(0),n.YNc(1,b,8,7,"div",11),n.BQk()),2&e){const t=i.ngIf;n.xp6(1),n.Q6J("ngForOf",t)}}function M(e,i){if(1&e&&(n.TgZ(0,"div",9),n.YNc(1,_,2,1,"ng-container",10),n.ALo(2,"async"),n.qZA()),2&e){const t=i.ngLet,o=n.oxw();n.ekj("disabled",t),n.xp6(1),n.Q6J("ngIf",n.lcZ(2,3,o.plans$))}}function O(e,i){if(1&e){const t=n.EpF();n.TgZ(0,"div",15),n.NdJ("click",function(){n.CHM(t);const a=n.oxw();return n.KtG(a.buy())}),n._uU(1,"CONENCT"),n.qZA()}}const y=[{path:"",component:(()=>{class e{constructor(t,o,a,s){this.appQuery=t,this.appService=o,this.router=a,this.toasterService=s,this.plans$=this.appQuery.plans$,this.currentPlan$=this.appQuery.currentPlan$,this.planId$=new m.X("")}getDuration(t){const[o,a,s]=new Date(t/60*60*1e3).toISOString().substr(11,8).split(":");let p="";return t/60>=1440&&(p=t/60/24+" days"),Number(s)&&(p=`${Number(s)} seconds`),Number(a)&&(p=`${Number(a)} minutes `+p),Number(o)&&(p=`${Number(o)} hours `+p),p}buy(){const t=this.planId$.getValue(),o=this.appQuery.plans.find(s=>s.id===t)?.price;o>this.appQuery.balance?this.toasterService.showToast({type:C.p.ERROR,text:"Insufficient balance",autoClose:2500}):t&&this.appService.purchasePlan(t).pipe((0,d.w)(()=>this.appService.connectionInit()),(0,d.w)(()=>this.appService.wgUp())).subscribe(()=>{this.appService.setConnection("on"),this.router.navigate(["/home",{forceConnect:!1}])})}select(t,o){if(!o){if(t===this.planId$.getValue())return void this.planId$.next("");this.planId$.next(t)}}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(u._),n.Y36(v.z),n.Y36(r.F0),n.Y36(P.M))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-shop-page"]],decls:19,vars:7,consts:[[3,"title"],[1,"content-area"],[1,"section-title"],["class","plans",3,"disabled",4,"ngLet"],[1,"buy-points"],[1,"title"],[1,"text"],[1,"quick-ads"],["class","connect",3,"click",4,"ngIf"],[1,"plans"],[4,"ngIf"],["class","plan",3,"selected","click",4,"ngFor","ngForOf"],[1,"plan",3,"click"],[1,"duration"],[1,"price"],[1,"connect",3,"click"]],template:function(t,o){1&t&&(n._UZ(0,"app-header",0),n.TgZ(1,"div",1),n._UZ(2,"app-balance"),n.TgZ(3,"div",2),n._uU(4,"Choose plan"),n.qZA(),n.YNc(5,M,3,5,"div",3),n.ALo(6,"async"),n.TgZ(7,"div",4)(8,"div",5),n._uU(9,"Buy points"),n.qZA(),n.TgZ(10,"div",6),n._uU(11,"Download mobile application"),n.qZA()(),n.TgZ(12,"div",7)(13,"div",5),n._uU(14,"Quick ads"),n.qZA(),n.TgZ(15,"div",6),n._uU(16,"Download mobile application"),n.qZA()(),n.YNc(17,O,2,0,"div",8),n.ALo(18,"async"),n.qZA()),2&t&&(n.Q6J("title","Balance"),n.xp6(5),n.Q6J("ngLet",n.lcZ(6,3,o.currentPlan$)),n.xp6(12),n.Q6J("ngIf",n.lcZ(18,5,o.planId$)))},dependencies:[l.sg,l.O5,h.G,f,x.h,l.Ov],styles:[".section-title[_ngcontent-%COMP%]{font-size:14px;font-weight:600;line-height:16px;color:#2c2c2e80;padding:16px 16px 0}.plans[_ngcontent-%COMP%]{overflow-x:scroll;overflow-y:hidden;display:flex;align-items:center;padding:16px;gap:16px;cursor:default}.plans[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}.plans[_ngcontent-%COMP%]   .plan[_ngcontent-%COMP%]{height:150px;padding:16px;position:relative;background:#ffffff;border:1px solid #d0d0d0;box-shadow:0 0 20px #0000001a;border-radius:10px;cursor:pointer;transition:all .1s ease-in-out;-webkit-user-select:none;user-select:none}.plans[_ngcontent-%COMP%]   .plan[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:17px;font-weight:900;line-height:22px;color:#2c2c2e;margin-bottom:2px;text-align:center}.plans[_ngcontent-%COMP%]   .plan[_ngcontent-%COMP%]   .duration[_ngcontent-%COMP%]{font-size:17px;font-weight:400;line-height:22px;color:#2c2c2e80;margin-bottom:42px;text-align:center}.plans[_ngcontent-%COMP%]   .plan[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%]{padding:4px 12px;font-size:17px;font-weight:600;line-height:22px;color:#e1e1e1;background:#2c2c2e;border:2px solid #2c2c2e;border-radius:30px;white-space:nowrap;transition:all .1s ease-in-out}.plans[_ngcontent-%COMP%]   .plan.selected[_ngcontent-%COMP%]{border:2px solid #000000}.plans[_ngcontent-%COMP%]   .plan.selected[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%]{background:#e7fe54;border:1px solid #cae901;color:#000}.plans.disabled[_ngcontent-%COMP%]{opacity:.5;overflow-x:scroll;cursor:default}.connect[_ngcontent-%COMP%]{position:absolute;bottom:16px;cursor:pointer;background:#e7fe54;border:1px solid #cae901;border-radius:12px;font-size:21px;font-weight:600;line-height:22px;color:#2c2c2e;width:calc(100% - 32px);height:80px;display:flex;justify-content:center;align-items:center;left:16px}.buy-points[_ngcontent-%COMP%], .quick-ads[_ngcontent-%COMP%]{padding:0 24px}.buy-points[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%], .quick-ads[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:20px;font-weight:700;line-height:24px;color:#000000bf;margin-bottom:6px}.buy-points[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%], .quick-ads[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{font-size:14px;font-weight:400;line-height:20px;color:#00000080}.buy-points[_ngcontent-%COMP%]{margin-bottom:20px}"],changeDetection:0}),e})()}];let Z=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[l.ez,r.Bz.forChild(y),r.Bz]}),e})();var S=c(8924);let w=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[l.ez,Z,S.Su,h.G,f,x.f]}),e})()}}]);