(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{29:function(e,t,a){e.exports=a(62)},57:function(e,t,a){},59:function(e,t,a){},62:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(22),c=a.n(l),i=a(23),s=a(15),o=a.n(s),u=a(24),h=a(7),m=a(8),d=a(12),f=a(9),v=a(13),p=function(e){return r.a.createElement("div",{className:"form-group"},r.a.createElement("input",Object.assign({className:"form-control"},e)))},E=function(e){return r.a.createElement("button",Object.assign({},e,{style:{float:"right",marginBottom:10},className:"btn btn-success"}),e.children)},b=a(6),g=a.n(b),y={getArchive:function(){return g.a.get("/api/archive")},getEntry:function(e){return g.a.get("/api/archive/"+e)},deleteEntry:function(e){return g.a.delete("/api/archive/"+e)},saveEntry:function(e){return g.a.post("/api/entry",e)},searchAPI:function(e){return g.a.get("https://doaj.org/api/v1/search/articles/"+e+"?page=1&pageSize=50")}},j=function(e){var t=e.size,a=e.children;return r.a.createElement("div",{className:t.split(" ").map(function(e){return"col-"+e}).join(" ")},a)},A=function(e){var t=e.fluid,a=e.children;return r.a.createElement("div",{className:"container".concat(t?"-fluid":"")},a)},w=function(e){var t=e.fluid,a=e.children;return r.a.createElement("div",{className:"row".concat(t?"-fluid":"")},a)},N=a(25),k=function(e){function t(){var e,a;Object(h.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(d.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(r)))).state={results:[],treeData:[],node:"",phrase:"",relevant:"",relevantResult:{title:"",link:""}},a.APIsearch=function(){y.searchAPI(a.phrase).then(function(){var e=Object(u.a)(o.a.mark(function e(t){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("RESULT: ",t),e.next=3,a.setState({results:t.data.results});case 3:console.log("hi wait"),a.createTreeData();case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()).catch(function(e){return console.log(e)})},a.createTreeData=function(){for(var e=[],t=0;t<a.state.results.length;t++)if(a.state.results[t].bibjson.abstract&&"."!=a.state.results[t].bibjson.abstract){var n=[a.state.results[t].bibjson.abstract];console.log(n),e.push(n)}console.log("big"+e),console.log(a.state.results),a.state.results.map(function(t){a.setState({treeData:e})}),setTimeout(function(){console.log(a.state)},5e3)},a.relevantAbstracts=function(e){e.preventDefault();var t=a.state.results.filter(function(e){return e.bibjson.abstract&&e.bibjson.abstract.includes(a.state.relevant)});console.log("relevant",t),a.setState({relevantResult:{title:t[0].bibjson.title,link:t[0].bibjson.link[0].url}})},a.handleInputChange=function(e){var t=e.target,n=t.name,r=t.value;a.setState(Object(i.a)({},n,r))},a.handleAPI=function(e){e.preventDefault(),a.state.phrase&&a.APIsearch()},a.handleSaveBtn=function(e){a.state.relevantResult&&y.saveEntry({title:a.state.relevantResult.title,href:a.state.relevantResult.link}).then(function(e){return alert("Article archived")}).catch(function(e){return console.log(e)})},a}return Object(v.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement(n.Fragment,null,r.a.createElement("form",{className:"col-6"},r.a.createElement("p",null,"Use this field to set the tree's node:"),r.a.createElement(p,{value:this.state.node,onChange:this.handleInputChange,name:"node",default:"",placeholder:"NODE"}),r.a.createElement("p",null,"Use this field to locate a specific article:"),r.a.createElement(p,{value:this.state.relevant,onChange:this.handleInputChange,name:"relevant",default:"",placeholder:"Find Article"}),r.a.createElement(E,{disabled:!this.state.relevant,onClick:this.relevantAbstracts},"Find Article"),r.a.createElement("p",null,"Enter your search term here:"),r.a.createElement(p,{value:this.state.phrase,onChange:this.handleInputChange,name:"phrase",placeholder:"Enter your search term (required)"}),r.a.createElement(E,{disabled:!this.state.phrase,onClick:this.handleAPI},"Search")),r.a.createElement("div",{className:"col-6"},r.a.createElement("p",null,"This is your article!"),r.a.createElement("ul",null,r.a.createElement("li",null,this.state.relevantResult.title),r.a.createElement("li",null,this.state.relevantResult.link)),r.a.createElement("button",{onClick:this.handleSaveBtn},"Save")),r.a.createElement("div",{className:"my-pretty-chart-container"},r.a.createElement(N.a,{chartType:"WordTree",data:this.state.treeData,width:"100%",height:"400px",options:{wordtree:{format:"implicit",word:this.state.node}},legendToggle:!0})),r.a.createElement("div",{id:"wordtree_basic",style:{width:"100%",height:"700px"}}))}}]),t}(n.Component),O=(a(57),function(e){return r.a.createElement("span",Object.assign({className:"delete-btn"},e),"\u2717")}),C=function(e){var t=e.children;return r.a.createElement("div",{style:{height:300,clear:"both",paddingTop:120,textAlign:"center"},className:"jumbotron"},t)},I=a(63),S=(a(59),function(e){var t=e.children;return r.a.createElement("div",{className:"list-overflow-container"},r.a.createElement("ul",{className:"list-group"},t))}),D=function(e){return r.a.createElement("li",{className:"list-group-item"},e.children)},R=function(e){function t(){var e,a;Object(h.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(d.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(r)))).state={archive:[]},a.loadArchive=function(){y.getArticles().then(function(e){return a.setState({archive:e.data})}).catch(function(e){return console.log(e)})},a.deleteEntry=function(e){y.deleteEntry(e).then(function(e){return a.loadArchive()}).catch(function(e){return console.log(e)})},a}return Object(v.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){this.loadArchive()}},{key:"render",value:function(){var e=this;return r.a.createElement(A,{fluid:!0},r.a.createElement(w,null,r.a.createElement(j,{size:"md-6"}),r.a.createElement(j,{size:"md-6 sm-12"},r.a.createElement(C,null,r.a.createElement("h1",null,"Archived article references")),this.state.entry.length?r.a.createElement(S,null,this.state.archive.map(function(t){return r.a.createElement(D,{key:t._id},r.a.createElement(I.a,{to:"/archive/"+t._id},r.a.createElement("strong",null,t.title," by ",t.author),r.a.createElement("p",null,t.abstract)),r.a.createElement(O,{onClick:function(){return e.deleteEntry(t._id)}}))})):r.a.createElement("h3",null,"No Results to Display"))))}}]),t}(n.Component),x=function(){return r.a.createElement(A,{fluid:!0},r.a.createElement(w,null,r.a.createElement(j,{size:"md-12"},r.a.createElement(C,null,r.a.createElement("h1",null,"404 Page Not Found"),r.a.createElement("h1",null,r.a.createElement("span",{role:"img","aria-label":"Face With Rolling Eyes Emoji"},"\ud83d\ude44"))))))},T=function(){return r.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-dark bg-primary"},r.a.createElement("a",{className:"navbar-brand",href:"/"},"A truly absract word tree."))},P=a(64),F=a(66),z=a(65),B=function(){return r.a.createElement(P.a,null,r.a.createElement(n.Fragment,null,r.a.createElement(T,null),r.a.createElement(F.a,null,r.a.createElement(z.a,{exact:!0,path:"/",component:k}),r.a.createElement(z.a,{exact:!0,path:"/archive/",component:R}),r.a.createElement(z.a,{component:x}))))};c.a.render(r.a.createElement(B,null),document.getElementById("root"))}},[[29,2,1]]]);
//# sourceMappingURL=main.65d3e7fd.chunk.js.map