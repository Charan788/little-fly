(function(root){
 'use strict';
 const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
 const wrap=a=>Math.atan2(Math.sin(a),Math.cos(a));
 class CreatureModel{
 constructor(){this.reset()}
 reset(){this.x=230;this.y=350;this.angle=-.45;this.light={x:760,y:220};this.obstacles=[{x:470,y:290,r:48},{x:620,y:475,r:62},{x:310,y:135,r:38}];this.enabled=Array(8).fill(true);this.activity=Array(8).fill(0);this.mode='seek';this.range=280;this.time=0;this.distance=0;this.reached=0;this.trail=[];this.autoLight=true;this.atLight=false;this.contact=false;this.rng=9274;this.left=0;this.right=0;}
 random(){this.rng=(1664525*this.rng+1013904223)>>>0;return this.rng/4294967296}
 valid(x,y,r=25){return x>=r&&x<=1000-r&&y>=r&&y<=680-r&&this.obstacles.every(o=>Math.hypot(x-o.x,y-o.y)>o.r+r)}
 setLight(x,y){if(!Number.isFinite(x)||!Number.isFinite(y)||!this.valid(x,y,20))return false;this.light={x,y};this.atLight=false;return true}
 addObstacle(x,y){if(this.obstacles.length>=24||!this.valid(x,y,38)||Math.hypot(x-this.x,y-this.y)<65||Math.hypot(x-this.light.x,y-this.light.y)<65)return false;this.obstacles.push({x,y,r:32});return true}
 removeObstacle(x,y){const i=this.obstacles.findIndex(o=>Math.hypot(x-o.x,y-o.y)<o.r+12);if(i<0)return false;this.obstacles.splice(i,1);return true}
 toggle(i){if(!Number.isInteger(i)||i<0||i>7)throw Error('Unknown node');this.enabled[i]=!this.enabled[i];if(!this.enabled[i]){this.activity[i]=0;if(i===6)this.left=0;if(i===7)this.right=0;}return this.enabled[i]}
 restore(){this.enabled.fill(true)}
 step(dt){dt=clamp(dt,0,.025);this.time+=dt;const a=this.angle;const dist=Math.hypot(this.light.x-this.x,this.light.y-this.y);const bearing=wrap(Math.atan2(this.light.y-this.y,this.light.x-this.x)-a);const strength=1/(1+(dist/this.range)**2);const lightL=strength*(.15+.85*Math.max(0,Math.cos(bearing+.65)));const lightR=strength*(.15+.85*Math.max(0,Math.cos(bearing-.65)));
 const threat=offset=>{let v=0;for(let d=12;d<115;d+=7){const px=this.x+Math.cos(a+offset)*d,py=this.y+Math.sin(a+offset)*d;if(px<16||px>984||py<16||py>664||this.obstacles.some(o=>Math.hypot(px-o.x,py-o.y)<o.r+17)){v=1-d/125;break}}return v};
 const smooth=(i,target)=>{this.activity[i]=this.enabled[i]?this.activity[i]+(clamp(target)-this.activity[i])*(1-Math.exp(-dt/0.11)):0;return this.activity[i]};
 const ll=smooth(0,lightL),lr=smooth(1,lightR),ol=smooth(2,threat(-.42)),or=smooth(3,threat(.42));
 const s=this.mode==='seek'?1:-1;
 const turnL=smooth(4,clamp(.2+s*.85*(ll-lr)+1.8*(or-ol)));
 const turnR=smooth(5,clamp(.2+s*.85*(lr-ll)+1.8*(ol-or)+.9*Math.min(ol,or)));
 const base=.49-.21*Math.max(ol,or);
 this.left=smooth(6,base+turnR*.85-turnL*.65);this.right=smooth(7,base+turnL*.85-turnR*.65);
 const velocity=(this.left+this.right)*68;this.angle=wrap(a+(this.left-this.right)*4.1*dt);
 const oldX=this.x,oldY=this.y;this.x=clamp(this.x+Math.cos(this.angle)*velocity*dt,13,987);this.y=clamp(this.y+Math.sin(this.angle)*velocity*dt,13,667);this.contact=false;
 for(const o of this.obstacles){let dx=this.x-o.x,dy=this.y-o.y,d=Math.hypot(dx,dy);if(d<o.r+13){if(d<.001){dx=1;dy=0;d=1}this.x=o.x+dx/d*(o.r+13);this.y=o.y+dy/d*(o.r+13);this.contact=true}}
 this.distance+=Math.hypot(this.x-oldX,this.y-oldY);
 if(this.trail.length===0||Math.hypot(this.x-this.trail.at(-1).x,this.y-this.trail.at(-1).y)>3){this.trail.push({x:this.x,y:this.y});if(this.trail.length>1200)this.trail.shift()}
 if(dist<42&&!this.atLight){this.atLight=true;this.reached++;if(this.autoLight){for(let n=0;n<150;n++){const x=80+this.random()*840,y=80+this.random()*520;if(this.valid(x,y,35)&&Math.hypot(x-this.x,y-this.y)>240){this.setLight(x,y);break}}}}
 if(dist>65)this.atLight=false;
 }
 }
 root.CreatureModel=CreatureModel;if(typeof module!=='undefined')module.exports={CreatureModel};
})(typeof window!=='undefined'?window:globalThis);


