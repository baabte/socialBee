!function(a){function b(a){function b(a,b,e){var g=null;if(c(b)&&(j(b),d(a),f(a),i(b),q>=2)){var h=k(b),r=0,t=l();r=m(h)?-1*n(p,h-1,Math.floor(q/2)-1)-t:n(p,Math.ceil(q/2),h-2)+t+2*s,g=o(e,b,r),e.points=g}return g}function c(a){return null!=a.bars&&a.bars.show&&null!=a.bars.order}function d(a){var b=u?a.getPlaceholder().innerHeight():a.getPlaceholder().innerWidth(),c=u?e(a.getData(),1):e(a.getData(),0),d=c[1]-c[0];t=d/b}function e(a,b){for(var c=new Array,d=0;d<a.length;d++)c[0]=a[d].data[0][b],c[1]=a[d].data[a[d].data.length-1][b];return c}function f(a){p=g(a.getData()),q=p.length}function g(a){for(var b=new Array,c=0;c<a.length;c++)null!=a[c].bars.order&&a[c].bars.show&&b.push(a[c]);return b.sort(h)}function h(a,b){var c=a.bars.order,d=b.bars.order;return d>c?-1:c>d?1:0}function i(a){r=a.bars.lineWidth?a.bars.lineWidth:2,s=r*t}function j(a){a.bars.horizontal&&(u=!0)}function k(a){for(var b=0,c=0;c<p.length;++c)if(a==p[c]){b=c;break}return b+1}function l(){var a=0;return q%2!=0&&(a=p[Math.ceil(q/2)].bars.barWidth/2),a}function m(a){return a<=Math.ceil(q/2)}function n(a,b,c){for(var d=0,e=b;c>=e;e++)d+=a[e].bars.barWidth+2*s;return d}function o(a,b,c){for(var d=a.pointsize,e=a.points,f=0,g=u?1:0;g<e.length;g+=d)e[g]+=c,b.data[f][3]=e[g],f++;return e}var p,q,r,s,t=1,u=!1;a.hooks.processDatapoints.push(b)}var c={series:{bars:{order:null}}};a.plot.plugins.push({init:b,options:c,name:"orderBars",version:"0.2"})}(jQuery);