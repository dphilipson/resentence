(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{19:function(e,t,n){"use strict";var a=this&&this.__assign||function(){return(a=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var o=r(n(40)),s=i(n(0)),c=n(49),l=n(43),u=s.memo(function(e){var t=e.className,n=e.children,r=e.align,i=e.speed,o=void 0===i?1:i,u=null==n?"":n+"",m=s.useState({visibleText:void 0,tokenPositions:void 0,tokenState:l.makeTokenState(u)}),v=m[0],g=v.visibleText,y=v.tokenPositions,E=v.tokenState,b=m[1],k=s.useRef(null),w=s.useCallback(function(e,t){switch(r){case"left":return e.left-t.left;case"center":return e.left-(t.left+t.width/2);case"right":return e.right-t.right}},[r]),N=s.useCallback(function(e,t){var n=document.createRange(),a=e.childNodes[0];n.setStart(a,t),n.setEnd(a,t+1);var r=n.getBoundingClientRect(),i=e.getBoundingClientRect();return{x:w(r,i),y:r.top-i.top}},[w]),T=s.useCallback(function(){var e=k.current;if(e){var t=e.innerText.length;if(0===t)return[];for(var n=N(e,0),r=[a({},n,{y:0})],i=1;i<t;i++){var o=N(e,i),s=o.x,c=o.y;r.push({x:s,y:c-n.y})}return r}},[N]),x=s.useCallback(function(){if(!document.hidden){var e=k.current&&k.current.innerText;if(null!=e&&e!==g){var t=T();t&&b(function(n){return{visibleText:e,tokenPositions:t,tokenState:l.transformTo(n.tokenState,e)}})}}},[g,T]);s.useEffect(function(){x()}),s.useEffect(function(){return document.addEventListener("visibilitychange",x),function(){return document.removeEventListener("visibilitychange",x)}},[x]);var O=s.useMemo(function(){return{tension:o*o*170,friction:26*o}},[o]),S=c.useTransition(E.tokens,f,{initial:null,config:O,from:{opacity:0,transform:"scale(0)"},enter:{opacity:1,transform:"scale(1)"},leave:{opacity:0,transform:"scale(0)"}});return s.default.createElement("div",{className:t,style:a({},h,{textAlign:r})},s.default.createElement("div",{ref:k,style:d},u),y&&S.map(function(e){var t=e.item,n=e.props;return s.default.createElement(p,{key:t.key,align:r,springConfig:O,springTarget:j(t.key),token:t.token,transitionProps:n})}));function j(e){if(!y)return{};var t=function(e){for(var t=E.tokens,n=0,a=t.length;n<a;n++)if(t[n].key===e)return n;return}(e);if(null==t)return{};var n=y[t],i=n.x,o=n.y;return a({marginTop:o},"right"===r?{marginRight:-i}:{marginLeft:i})}});function p(e){var t=e.align,n=e.springConfig,r=e.springTarget,i=e.token,o=e.transitionProps,l=c.useSpring({config:n,to:r});return s.default.createElement(c.animated.div,{style:a({},m,function(){switch(t){case"left":return{left:0};case"center":return{left:"50%"};case"right":return{right:0}}}(),o,l),"aria-hidden":!0},i)}function f(e){return e.key}u.propTypes={className:o.default.string,children:o.default.oneOfType([o.default.string,o.default.number]),align:o.default.oneOf(["left","center","right"]).isRequired,speed:o.default.number};var h={position:"relative"},d={color:"transparent"},m={position:"absolute",top:0,pointerEvents:"none",userSelect:"none"};t.default=u},26:function(e,t,n){"use strict";n.d(t,"a",function(){return a}),n.d(t,"b",function(){return r});var a={},r={}},32:function(e,t,n){e.exports=n(48)},38:function(e,t,n){},39:function(e,t,n){},43:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(44);function r(e){return e.tokens.map(function(e){return e.token}).join("")}t.makeTokenState=function(e){return{tokens:e.split("").map(function(e,t){return{key:t,token:e}}),nextKey:e.length}},t.transformTo=function(e,t){return function(e,t){if(0===t.length)return e;var n=e.tokens.slice(),r=e.nextKey;return t.forEach(function(e){switch(e.type){case a.EditType.INSERT:var t=e.position,i=e.token;n.splice(t,0,{token:i,key:r++});break;case a.EditType.REPLACE:t=e.position,i=e.token,n.splice(t,1,{token:i,key:r++});break;case a.EditType.DELETE:t=e.position,n.splice(t,1)}}),{tokens:n,nextKey:r}}(e,a.getEdits(r(e),t))},t.getText=r},44:function(e,t,n){"use strict";var a;Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.INSERT="INSERT",e.REPLACE="REPLACE",e.DELETE="DELETE"}(a=t.EditType||(t.EditType={})),t.getEdits=function(e,t){return function(e,t,n){for(var r=[],i=e.length,o=t.length;i>0||o>0;)if(i>0&&o>0&&e[i-1]===t[o-1])i--,o--;else if(i>0&&o>0&&n[i][o]===n[i-1][o-1]+1)r.push({type:a.REPLACE,position:i-1,token:t[o-1]}),i--,o--;else if(i>0&&n[i][o]===n[i-1][o]+1)r.push({type:a.DELETE,position:i-1}),i--;else{if(!(o>0&&n[i][o]===n[i][o-1]+1))throw new Error("Invalid distances table");r.push({type:a.INSERT,position:i,token:t[o-1]}),o--}return r}(e,t,function(e,t){for(var n=e.length,a=t.length,r=function(e,t,n){for(var a=Array(e),r=0;r<e;r++){a[r]=Array(t);for(var i=0;i<t;i++)a[r][i]=n}return a}(n+1,a+1,0),i=1;i<=n;i++)r[i][0]=i;for(var o=1;o<=a;o++)r[0][o]=o;for(var i=1;i<=n;i++)for(var o=1;o<=a;o++)e[i-1]===t[o-1]?r[i][o]=r[i-1][o-1]:r[i][o]=1+Math.min(r[i-1][o-1],r[i-1][o],r[i][o-1]);return r}(e,t))}},45:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){"use strict";n.r(t);var a=n(54),r=n(0),i=n.n(r),o=n(24),s=n.n(o),c=n(25),l=n.n(c),u=n(4),p=n(9),f=n(6),h=n(5),d=n(7),m=n(21),v=n(3),g=n.n(v),y=(n(38),n(39),n(19)),E=n.n(y),b=function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(f.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={index:0},n.intervalId=void 0,n}return Object(d.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.restartInterval()}},{key:"componentDidUpdate",value:function(e){e.interval!==this.props.interval&&this.restartInterval()}},{key:"componentWillUnmount",value:function(){window.clearInterval(this.intervalId)}},{key:"render",value:function(){var e=this.props,t=e.className,n=e.entries,a=e.align,r=this.state.index;return 0===n.length?null:i.a.createElement(E.a,{className:g()("demo-readout",t),align:a},n[r%n.length])}},{key:"restartInterval",value:function(){var e=this,t=this.props,n=t.entries,a=t.interval;window.clearInterval(this.intervalId),this.intervalId=window.setInterval(function(){return e.setState(function(e){return{index:(e.index+1)%n.length}})},a)}}]),t}(r.PureComponent),k=["$6,440.97","$10,198.60","$14,112.20","$10,237.30","$10,385.00","$7,003.06","$9,251.47","$7,500.70","$6,411.68"],w=1250;function N(e){var t=e.className;return i.a.createElement("div",{className:g()("bitcoin-demo-container",t)},i.a.createElement(b,{className:"bitcoin-demo-readout",entries:k,interval:w,align:"right"}))}var T=n(52),x=n(53),O=n(12),S=(n(45),n(51)),j=function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(f.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).handleChange=function(e){return n.props.onChange(e.currentTarget.value)},n.handleKeyPress=function(e){13===e.charCode&&n.props.onSubmit&&n.props.onSubmit()},n}return Object(d.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.props,t=e.className,n=e.value,a=e.placeholder;return i.a.createElement(S.a,{className:t,value:n,placeholder:a,onChange:this.handleChange,onKeyPress:this.handleKeyPress})}}]),t}(r.PureComponent),C=function(e){function t(e){var n;Object(u.a)(this,t),(n=Object(f.a)(this,Object(h.a)(t).call(this,e))).handleInputChange=function(e){return n.setState({inputText:e})},n.handleUpdate=function(){n.setState(function(e){var t=e.inputText.trim();return{text:t,inputText:t}})};var a=e.initialText;return n.state={text:a,inputText:a},n}return Object(d.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.props.className,t=this.state,n=t.text,a=t.inputText;return i.a.createElement("div",{className:g()("confirm-demo",e)},i.a.createElement(E.a,{className:"demo-readout",align:"center"},n),i.a.createElement(T.a,{className:"controls",fill:!0},i.a.createElement(j,{className:"input",value:a,placeholder:"Enter text and press Update\u2026",onChange:this.handleInputChange,onSubmit:this.handleUpdate}),i.a.createElement(x.a,{className:m.a.FIXED,text:"Update",intent:O.a.PRIMARY,onClick:this.handleUpdate})))}}]),t}(r.PureComponent),R=["One fish","Two fish","Red fish","Blue fish.","Black fish","Blue fish","Old fish","New fish.","This one has a little star.","This one has a little car.","Say! What a lot","Of fish there are.","Yes. Some are red.","And some are blue.","Some are old.","And some are new.","Some are sad.","And some are glad.","And some are very, very bad.","And some are very, very bad."],P=1250;function I(e){var t=e.className;return i.a.createElement(b,{className:t,entries:R,interval:P,align:"center"})}var _=function(e){function t(){return Object(u.a)(this,t),Object(f.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:g()(m.a.DARK,"container","app")},i.a.createElement("h1",{className:"app-title"},"Resentence"),i.a.createElement("p",{className:"app-explanation"},"Easy-to-use React component for morphing one string into another."," ",i.a.createElement("a",{href:"https://github.com/dphilipson/resentence"},"GitHub")),i.a.createElement(I,{className:"app-seuss-demo"}),i.a.createElement("h3",{className:"app-section-header"},"Smoothly transition text in any style"),i.a.createElement("p",{className:"app-section-body"},"Use ordinary CSS to layout and style your text however you want, then wrap it in a Resentence component to animate its changes. Note the right-alignment in the following example, which works well for displaying numbers."),i.a.createElement(N,{className:"app-bitcoin-demo"}),i.a.createElement("p",{className:"app-bitcoin-explanation"},"Monthly Bitcoin prices, Nov 2017 \u2014 Jul 2018"),i.a.createElement("h3",{className:"app-section-header"},"Display updates intuitively"),i.a.createElement("p",{className:"app-section-body"},"Resentence will find the transformation from one string to the next which uses the fewest edits (as defined by"," ",i.a.createElement("a",{href:"https://en.wikipedia.org/wiki/Levenshtein_distance",target:"_blank"},"Levenschtein distance"),"), then animate those edits in a visually intuitive way. You can experiment with different edit types using the interactive demo below."),i.a.createElement(C,{className:"app-confirm-demo",initialText:"Edit me\u2026"}),i.a.createElement("h3",{className:"app-section-header"},"Simple to use"),i.a.createElement("p",{className:"app-section-body"},"Using Resentence is as easy as wrapping your text in a"," ",i.a.createElement("code",null,"<Resentence>"),' component and specifying an alignment ("left", "center", or "right"), with no additional integration required.'," ",i.a.createElement("a",{href:"https://github.com/dphilipson/resentence"},"See the GitHub repo")," ","for details."),i.a.createElement("p",{className:"app-section-body app-copyright"},"Copyright \xa9 2019 David Philipson"))}}]),t}(r.Component);n(47),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function A(){s.a.render(i.a.createElement(_,null),document.getElementById("root"))}a.a.onlyShowFocusOnTabs(),l.a.load({google:{families:["Noto Sans","Open Sans"]},active:A,inactive:A}),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[32,1,2]]]);
//# sourceMappingURL=main.e7131ec8.chunk.js.map