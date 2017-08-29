function someNaughtyFunction() {}
(function() {
  return {
    events: { "app.activated": "init" },
    foo: require("foo"),
    init() {}
  };
})();
