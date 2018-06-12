(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['header'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<header>\r\n      <a href=\"/\"><h1 class=\"site-title\"><i class=\"far fa-bell\"></i> Update.me</h1></a>\r\n\r\n      <nav class=\"navbar\">\r\n        <ul class=\"navlist\">\r\n		  <li class=\"username\">"
    + container.escapeExpression(((helper = (helper = helpers.userID || (depth0 != null ? depth0.userID : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"userID","hash":{},"data":data}) : helper)))
    + "</li>\r\n		  <li id=\"account-settings\" class=\"navitem\"><a href=\"#\"><i class=\"fas fa-ellipsis-v\"></i></a></li>\r\n        </ul>\r\n      </nav>\r\n</header>\r\n";
},"useData":true});
})();