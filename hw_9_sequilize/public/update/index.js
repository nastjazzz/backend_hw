(()=>{var o=document.querySelector(".form-update-book");o.addEventListener("submit",(function(t){t.preventDefault();var n=new FormData(o),e=window.location.href.split("/update/")[1];fetch("http://localhost:8080/api/book/".concat(e),{method:"PUT",body:n}).then((function(o){return o.json()})).then((function(o){console.log(o),window.location="/book/"+o.id})).catch((function(o){return console.log("Error:",o)}))}))})();
//# sourceMappingURL=index.js.map