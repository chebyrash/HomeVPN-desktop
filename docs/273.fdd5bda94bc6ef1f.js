"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([[273],{6273:(S,d,a)=>{a.r(d),a.d(d,{ShopModule:()=>k});var s=a(6895),u=a(9371),h=a(1135),f=a(3900),t=a(1571),m=a(7626),b=a(5518),x=a(3646);let _=(()=>{class e{constructor(n){this.appQuery=n,this.balance$=this.appQuery.balance$}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(m._))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-balance"]],standalone:!0,features:[t.jDz],decls:7,vars:3,consts:[[1,"balance"],[1,"title"],[1,"amount"],["src","/assets/icons/shop-guys.svg","alt",""]],template:function(n,o){1&n&&(t.TgZ(0,"div",0)(1,"div",1),t._uU(2," POINTS BALANCE "),t.qZA(),t.TgZ(3,"div",2),t._uU(4),t.ALo(5,"async"),t.qZA(),t._UZ(6,"img",3),t.qZA()),2&n&&(t.xp6(4),t.hij(" ",t.lcZ(5,1,o.balance$)," "))},dependencies:[s.ez,s.Ov],styles:[".balance[_ngcontent-%COMP%]{padding:24px;background:#000000;border-radius:20px;position:relative}.balance[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{margin-bottom:8px;font-size:14px;font-weight:600;line-height:16px;color:#ffffff80}.balance[_ngcontent-%COMP%]   .amount[_ngcontent-%COMP%]{font-size:57px;font-weight:600;line-height:68px;color:#fff}.balance[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{position:absolute;right:0;bottom:0;border-radius:20px}"],changeDetection:0}),e})();var C=a(1101);function y(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"div",13),t.NdJ("click",function(){const g=t.CHM(n).$implicit,r=t.oxw(2).ngLet,p=t.oxw();return t.KtG(p.select(g.id,r))}),t.ALo(1,"async"),t.TgZ(2,"div",5),t._uU(3),t.qZA(),t.TgZ(4,"div",14),t._uU(5),t.qZA(),t.TgZ(6,"div",15),t._uU(7),t.qZA()()}if(2&e){const n=i.$implicit,o=t.oxw(3);t.ekj("selected",t.lcZ(1,5,o.planId$)===n.id),t.xp6(3),t.hij(" ",n.name," "),t.xp6(2),t.hij(" ",o.getDuration(n.duration)," "),t.xp6(2),t.hij("",n.price," points")}}function P(e,i){if(1&e&&(t.ynx(0),t.YNc(1,y,8,7,"div",12),t.BQk()),2&e){const n=i.ngIf;t.xp6(1),t.Q6J("ngForOf",n)}}function M(e,i){if(1&e&&(t.TgZ(0,"div",10),t.YNc(1,P,2,1,"ng-container",11),t.ALo(2,"async"),t.qZA()),2&e){const n=i.ngLet,o=t.oxw();t.ekj("disabled",n),t.xp6(1),t.Q6J("ngIf",t.lcZ(2,3,o.plans$))}}function Z(e,i){1&e&&(t.O4$(),t.TgZ(0,"svg",18)(1,"g",19)(2,"rect",20),t._UZ(3,"animate",21),t.qZA()(),t.TgZ(4,"g",22)(5,"rect",20),t._UZ(6,"animate",23),t.qZA()(),t.TgZ(7,"g",24)(8,"rect",20),t._UZ(9,"animate",25),t.qZA()(),t.TgZ(10,"g",26)(11,"rect",20),t._UZ(12,"animate",27),t.qZA()(),t.TgZ(13,"g",28)(14,"rect",20),t._UZ(15,"animate",29),t.qZA()(),t.TgZ(16,"g",30)(17,"rect",20),t._UZ(18,"animate",31),t.qZA()(),t.TgZ(19,"g",32)(20,"rect",20),t._UZ(21,"animate",33),t.qZA()(),t.TgZ(22,"g",34)(23,"rect",20),t._UZ(24,"animate",35),t.qZA()(),t.TgZ(25,"g",36)(26,"rect",20),t._UZ(27,"animate",37),t.qZA()(),t.TgZ(28,"g",38)(29,"rect",20),t._UZ(30,"animate",39),t.qZA()(),t.TgZ(31,"g",40)(32,"rect",20),t._UZ(33,"animate",41),t.qZA()()())}function O(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"div",16),t.NdJ("click",function(){t.CHM(n);const c=t.oxw();return t.KtG(c.buy())}),t._uU(1," \u0421ONNECT "),t.YNc(2,Z,34,0,"svg",17),t.ALo(3,"async"),t.qZA()}if(2&e){const n=t.oxw();t.xp6(2),t.Q6J("ngIf",t.lcZ(3,1,n.loading$))}}const w=[{path:"",component:(()=>{class e{constructor(n,o,c){this.appQuery=n,this.appService=o,this.router=c,this.plans$=this.appQuery.plans$,this.currentPlan$=this.appQuery.currentPlan$,this.planId$=new h.X(""),this.loading$=new h.X(!1)}getDuration(n){let o=Math.floor(n/60),c=n%60,g=Math.floor(o/60),r=o%60,p=Math.floor(g/24),v=g%24,l="";return p&&(l+=1===p?`${p} day `:`${p} days `),v&&(l+=`${v} hours `),r&&(l+=`${r} minutes `),c&&(l+=`${c} seconds`),l.trim()}buy(){const n=this.planId$.getValue(),o=this.appQuery.plans.find(r=>r.id===n)?.price,c=this.appQuery.balance;if(!this.appQuery.country)return this.loading$.next(!0),void this.appService.purchasePlan(n).subscribe(()=>{this.loading$.next(!1),this.router.navigate(["/home"])});o>c?alert("Insufficient balance!"):n&&(this.loading$.next(!0),this.appService.purchasePlan(n).pipe((0,f.w)(()=>this.appService.connectionInit()),(0,f.w)(()=>this.appService.wgUp())).subscribe(()=>{this.loading$.next(!1),this.appService.setConnection("on"),this.router.navigate(["/home"])}))}select(n,o){if(!o){if(n===this.planId$.getValue())return void this.planId$.next("");this.planId$.next(n)}}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(m._),t.Y36(b.z),t.Y36(u.F0))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-shop-page"]],decls:23,vars:7,consts:[[3,"title"],[1,"content-area"],[1,"section-title"],["class","plans",3,"disabled",4,"ngLet"],[1,"buy-points"],[1,"title"],[1,"text"],["href","https://homevpn.org/","target","_blank"],[1,"quick-ads"],["class","connect",3,"click",4,"ngIf"],[1,"plans"],[4,"ngIf"],["class","plan",3,"selected","click",4,"ngFor","ngForOf"],[1,"plan",3,"click"],[1,"duration"],[1,"price"],[1,"connect",3,"click"],["xmlns","http://www.w3.org/2000/svg",0,"xmlns","xlink","http://www.w3.org/1999/xlink","style","background: none; display: block; shape-rendering: auto;","width","50px","height","50px","viewBox","0 0 100 100","preserveAspectRatio","xMidYMid",4,"ngIf"],["xmlns","http://www.w3.org/2000/svg",0,"xmlns","xlink","http://www.w3.org/1999/xlink","width","50px","height","50px","viewBox","0 0 100 100","preserveAspectRatio","xMidYMid",2,"background","none","display","block","shape-rendering","auto"],["transform","rotate(0 50 50)"],["x","48","y","27.5","rx","1.98","ry","1.98","width","4","height","11","fill","#000"],["attributeName","opacity","values","1;0","keyTimes","0;1","dur","0.47393364928909953s","begin","-0.43084877208099964s","repeatCount","indefinite"],["transform","rotate(32.72727272727273 50 50)"],["attributeName","opacity","values","1;0","keyTimes","0;1","dur","0.47393364928909953s","begin","-0.38776389487289964s","repeatCount","indefinite"],["transform","rotate(65.45454545454545 50 50)"],["attributeName","opacity","values","1;0","keyTimes","0;1","dur","0.47393364928909953s","begin","-0.3446790176647997s","repeatCount","indefinite"],["transform","rotate(98.18181818181819 50 50)"],["attributeName","opacity","values","1;0","keyTimes","0;1","dur","0.47393364928909953s","begin","-0.30159414045669974s","repeatCount","indefinite"],["transform","rotate(130.9090909090909 50 50)"],["attributeName","opacity","values","1;0","keyTimes","0;1","dur","0.47393364928909953s","begin","-0.2585092632485998s","repeatCount","indefinite"],["transform","rotate(163.63636363636363 50 50)"],["attributeName","opacity","values","1;0","keyTimes","0;1","dur","0.47393364928909953s","begin","-0.21542438604049982s","repeatCount","indefinite"],["transform","rotate(196.36363636363637 50 50)"],["attributeName","opacity","values","1;0","keyTimes","0;1","dur","0.47393364928909953s","begin","-0.17233950883239985s","repeatCount","indefinite"],["transform","rotate(229.0909090909091 50 50)"],["attributeName","opacity","values","1;0","keyTimes","0;1","dur","0.47393364928909953s","begin","-0.1292546316242999s","repeatCount","indefinite"],["transform","rotate(261.8181818181818 50 50)"],["attributeName","opacity","values","1;0","keyTimes","0;1","dur","0.47393364928909953s","begin","-0.08616975441619992s","repeatCount","indefinite"],["transform","rotate(294.54545454545456 50 50)"],["attributeName","opacity","values","1;0","keyTimes","0;1","dur","0.47393364928909953s","begin","-0.04308487720809996s","repeatCount","indefinite"],["transform","rotate(327.27272727272725 50 50)"],["attributeName","opacity","values","1;0","keyTimes","0;1","dur","0.47393364928909953s","begin","0s","repeatCount","indefinite"]],template:function(n,o){1&n&&(t._UZ(0,"app-header",0),t.TgZ(1,"div",1),t._UZ(2,"app-balance"),t.TgZ(3,"div",2),t._uU(4,"Choose plan"),t.qZA(),t.YNc(5,M,3,5,"div",3),t.ALo(6,"async"),t.TgZ(7,"div",4)(8,"div",5),t._uU(9,"Buy points"),t.qZA(),t.TgZ(10,"div",6)(11,"a",7),t._uU(12,"Download"),t.qZA(),t._uU(13," mobile application"),t.qZA()(),t.TgZ(14,"div",8)(15,"div",5),t._uU(16,"Quick ads"),t.qZA(),t.TgZ(17,"div",6)(18,"a",7),t._uU(19,"Download"),t.qZA(),t._uU(20," mobile application"),t.qZA()(),t.YNc(21,O,4,3,"div",9),t.ALo(22,"async"),t.qZA()),2&n&&(t.Q6J("title","Balance"),t.xp6(5),t.Q6J("ngLet",t.lcZ(6,3,o.currentPlan$)),t.xp6(16),t.Q6J("ngIf",t.lcZ(22,5,o.planId$)))},dependencies:[s.sg,s.O5,x.G,_,C.h,s.Ov],styles:[".section-title[_ngcontent-%COMP%]{font-size:14px;font-weight:600;line-height:16px;color:#2c2c2e80;padding:16px 16px 0}.plans[_ngcontent-%COMP%]{overflow-x:scroll;overflow-y:hidden;scroll-behavior:smooth;display:flex;align-items:center;padding:16px;gap:16px;cursor:default}.plans[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}.plans[_ngcontent-%COMP%]   .plan[_ngcontent-%COMP%]{height:150px;padding:16px;position:relative;background:#ffffff;border:1px solid #d0d0d0;box-shadow:0 0 20px #0000001a;border-radius:10px;cursor:pointer;transition:all .1s ease-in-out;-webkit-user-select:none;user-select:none}.plans[_ngcontent-%COMP%]   .plan[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:17px;font-weight:900;line-height:22px;color:#2c2c2e;margin-bottom:2px;text-align:center}.plans[_ngcontent-%COMP%]   .plan[_ngcontent-%COMP%]   .duration[_ngcontent-%COMP%]{font-size:17px;font-weight:400;line-height:22px;color:#2c2c2e80;margin-bottom:42px;text-align:center}.plans[_ngcontent-%COMP%]   .plan[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%]{padding:4px 12px;font-size:17px;font-weight:600;line-height:22px;color:#e1e1e1;background:#2c2c2e;border:2px solid #2c2c2e;border-radius:30px;white-space:nowrap;transition:all .1s ease-in-out}.plans[_ngcontent-%COMP%]   .plan.selected[_ngcontent-%COMP%]{border:2px solid #000000}.plans[_ngcontent-%COMP%]   .plan.selected[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%]{background:#e7fe54;border:1px solid #cae901;color:#000}.plans.disabled[_ngcontent-%COMP%]{opacity:.5;overflow-x:scroll;cursor:default}.connect[_ngcontent-%COMP%]{position:absolute;bottom:16px;cursor:pointer;background:#e7fe54;border:1px solid #cae901;border-radius:12px;font-size:21px;font-weight:600;line-height:22px;color:#2c2c2e;width:calc(100% - 32px);height:80px;display:flex;justify-content:center;align-items:center;left:16px}.connect[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{height:76px;position:absolute;left:calc(100% - 139px)}.buy-points[_ngcontent-%COMP%], .quick-ads[_ngcontent-%COMP%]{padding:0 24px}.buy-points[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%], .quick-ads[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:20px;font-weight:700;line-height:24px;color:#000000bf;margin-bottom:6px}.buy-points[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%], .quick-ads[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{font-size:14px;font-weight:400;line-height:20px;color:#00000080}.buy-points[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%] > a[_ngcontent-%COMP%], .quick-ads[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]{text-decoration:none;color:#2590f4}.buy-points[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]::visited, .quick-ads[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]::visited{color:#2590f4}.buy-points[_ngcontent-%COMP%]{margin-bottom:20px}"],changeDetection:0}),e})()}];let T=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[s.ez,u.Bz.forChild(w),u.Bz]}),e})();var A=a(4415);let k=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[s.ez,T,A.Su,x.G,_,C.f]}),e})()}}]);