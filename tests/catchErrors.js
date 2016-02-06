var page = require('webpage').create()

phantom.onError = function(msg, trace) {
  var msgStack = ['PHANTOM ERROR: ' + msg]
  if (trace && trace.length) {
    msgStack.push('TRACE:')
    trace.forEach(function(t) {
      msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''))
    });
  }
  console.error(msgStack.join('\n'))
  phantom.exit(1)
}

page.open('http://localhost/index.html', function(status) {
  console.log('Status: ' + status)
  if(status === 'success') {
    phantom.exit(0)
  }
  test()
})

function test() {
  page.evaluate(function() {
    $('#About').click()
    timeout(function() {
      $('a.cms_sitename').click()
      timeout(function() { phantom.exit(0) })
    })
  })
}

function timeout(f, delay) {
  return setTimeout(f, delay || 500)
}
