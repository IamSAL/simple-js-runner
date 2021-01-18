
  (function() {
    var old = console.log;
    var logger = document.getElementById('out');
    console.log = function(message) {
      if(typeof message == 'object') {
        logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br>';
      } else {
        logger.innerHTML += message + '<br>';
      }
    }
    console.error = function(message) {
      if(typeof message == 'object') {
        logger.innerHTML += `<span style="background-color:red;padding:5px;"> ${(JSON && JSON.stringify ? JSON.stringify(message) : message)} </span>` + '<br>';
      } else {
        logger.innerHTML += `<span style="background-color:red;color:white;padding:5px">  ${message}</span>` + '<br>';
      }
    }
  })();
  var editor = ace.edit("editor");
  editor.getSession().setUseWorker(false);
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/javascript");
  let run = document.getElementById("run");
  let out = document.getElementById("out");
  let inputs = document.getElementById("in");


  let executeByEval=(code)=>{
    try {
      eval(code)
    } catch (e) {
      console.error(e.name + ': ' + e.message);
    }
  }

  let executeByFn=(code)=>{
    let func=new Function(undefined,code);
    try {
        func();
    } catch (e) {
      console.error(e.name + ': ' + e.message);
    }
  }

  let clearConsole = () => {
    out.innerHTML = "";
  }

  run.addEventListener("click", () => {
    let code = editor.getValue();
    executeByEval(code)
  })
  editor.setValue(`
//Type your js and press RUN

function foo(bar){
    console.log(bar);
}
foo("All things JS!")`, 1)