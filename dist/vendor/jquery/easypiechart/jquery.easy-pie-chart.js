!function(a){return a.easyPieChart=function(b,c){var d,e,f,g,h,i,j,k,l=this;return this.el=b,this.$el=a(b),this.$el.data("easyPieChart",this),this.init=function(){var b,d;return l.options=a.extend({},a.easyPieChart.defaultOptions,c),b=l.options.percent||parseInt(l.$el.data("percent"),10),l.percentage=0,l.canvas=a("<canvas width='"+l.options.size+"' height='"+l.options.size+"'></canvas>").get(0),l.$el.append(l.canvas),"undefined"!=typeof G_vmlCanvasManager&&null!==G_vmlCanvasManager&&G_vmlCanvasManager.initElement(l.canvas),l.ctx=l.canvas.getContext("2d"),window.devicePixelRatio>1&&(d=window.devicePixelRatio,a(l.canvas).css({width:l.options.size,height:l.options.size}),l.canvas.width*=d,l.canvas.height*=d,l.ctx.scale(d,d)),l.ctx.translate(l.options.size/2,l.options.size/2),l.ctx.rotate(l.options.rotate*Math.PI/180),l.$el.addClass("easyPieChart"),l.$el.css({width:l.options.size,height:l.options.size,lineHeight:""+l.options.size+"px"}),l.update(b),l},this.update=function(a){return a=parseFloat(a)||0,l.options.animate===!1?f(a):l.options.delay?(e(l.percentage,0),setTimeout(function(){return e(l.percentage,a)},l.options.delay)):e(l.percentage,a),l},j=function(){var a,b,c;for(l.ctx.fillStyle=l.options.scaleColor,l.ctx.lineWidth=1,c=[],a=b=0;24>=b;a=++b)c.push(d(a));return c},d=function(a){var b;b=a%6===0?0:.017*l.options.size,l.ctx.save(),l.ctx.rotate(a*Math.PI/12),l.ctx.fillRect(l.options.size/2-b,0,.05*-l.options.size+b,1),l.ctx.restore()},k=function(){var a;a=l.options.size/2-l.options.lineWidth/2,l.options.scaleColor!==!1&&(a-=.08*l.options.size),l.ctx.beginPath(),l.ctx.arc(0,0,a,0,2*Math.PI,!0),l.ctx.closePath(),l.ctx.strokeStyle=l.options.trackColor,l.options.color&&(l.ctx.fillStyle=l.options.color,l.ctx.fill()),l.ctx.lineWidth=l.options.lineWidth,l.ctx.stroke()},i=function(){l.options.scaleColor!==!1&&j(),l.options.trackColor!==!1&&k()},f=function(b){var c;i(),l.ctx.strokeStyle=a.isFunction(l.options.barColor)?l.options.barColor(b):l.options.barColor,l.ctx.lineCap=l.options.lineCap,l.ctx.lineWidth=l.options.lineWidth,c=l.options.size/2-l.options.lineWidth/2,l.options.scaleColor!==!1&&(c-=.08*l.options.size),l.ctx.save(),l.ctx.rotate(-Math.PI/2),l.ctx.beginPath(),l.ctx.arc(0,0,c,0,2*Math.PI*b/100,!1),l.ctx.stroke(),l.ctx.restore()},h=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(a){return window.setTimeout(a,1e3/60)}}(),e=function(a,b){var c,d;l.options.onStart.call(l),l.percentage=b,Date.now||(Date.now=function(){return+new Date}),d=Date.now(),c=function(){var e,j;return j=Math.min(Date.now()-d,l.options.animate),l.ctx.clearRect(-l.options.size/2,-l.options.size/2,l.options.size,l.options.size),i.call(l),e=[g(j,a,b-a,l.options.animate)],l.options.onStep.call(l,e),f.call(l,e),j>=l.options.animate?l.options.onStop.call(l,e,b):h(c)},h(c)},g=function(a,b,c,d){var e,f;return e=function(a){return Math.pow(a,2)},f=function(a){return 1>a?e(a):2-e(a/2*-2+2)},a/=d/2,c/2*f(a)+b},this.init()},a.easyPieChart.defaultOptions={percent:0,barColor:"#ef1e25",trackColor:"#f2f2f2",scaleColor:"#dfe0e0",lineCap:"round",rotate:0,size:110,lineWidth:3,animate:!1,delay:!1,onStart:a.noop,onStop:a.noop,onStep:a.noop},void(a.fn.easyPieChart=function(b){return a.each(this,function(c,d){var e,f;return e=a(d),e.data("easyPieChart")?void e.data("easyPieChart").update(b.percent):(f=a.extend({},b,e.data()),e.data("easyPieChart",new a.easyPieChart(d,f)))})})}(jQuery);