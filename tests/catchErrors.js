var page = require('webpage').create();

phantom.onError = function(msg, trace) {
  var msgStack = ['PHANTOM ERROR: ' + msg];
  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
    });
  }
  console.error(msgStack.join('\n'));
  phantom.exit(1);
};
page.open('http://localhost/index.html', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    page.render('example.png');
    phantom.exit(0);
  }
  phantom.exit(1);
});