function addTabs(tab){
    $("#tabs").append(`<li class="list" id="list${tab.id}"><a class="links" id="link${tab.id}"href="#"><img class="favicon" src="${tab.favIconUrl}" width="15" height="15"><span id="title${tab.id}">${tab.title}</span></a>
    <button class="buttons" id="rename${tab.id}">&#9998;</button>
    <button class="buttons" id="up${tab.id}">&#8593;</button>
    <button class="buttons" id="down${tab.id}">&#8595;</button>
    <button class="buttons" id="remove${tab.id}">&#10006;</button>
    </li>`);
    $(".list").css({"display":"table-row","height":"30px"});
    $(".favicon").css({"margin":"3px"});
    $(".links").css({"display":"table-cell","width":"60%","text-decoration":"none","color":"black"});
    $(".buttons").css({"display":"table-cell","width":"10%","background-color":"#468284","border-radius":"5px","color":"white","border":"1px solid #468284","margin":"2px"});
    $("#rename"+tab.id).click(function() {
      const newTitle = prompt("Rename tab:");
      if(newTitle){
      chrome.tabs.executeScript(tab.id, {code: "document.title ='"+newTitle+"'"});
      $("#title"+tab.id).text(newTitle);
      }
    });
    $("#link"+tab.id).click(function() {
      chrome.tabs.update(tab.id, {active: true});
    });
    $("#up"+tab.id).click(function() {
      $item=$("#list"+tab.id);
      $before = $item.prev();
      $item.insertBefore($before);
  });
    $("#down"+tab.id).click(function() {
      $item=$("#list"+tab.id);
      $after= $item.next();
      $item.insertAfter($after);
   });
    $("#remove"+tab.id).click(function() {
        $("#list"+tab.id).remove();
        chrome.tabs.remove(tab.id);
    });
}
function main_content(){
  chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, (tabs) => {
  document.write(`<div id="main" style="">`);
  $("#main").append(`<h3>The tabs you're on are:</h3>`);
  $("#main").append('<ul id="tabs">');
  $("#main").css({"overflow-x":"hidden","height":"400px","overflow-y":"auto"});
  $("#tabs").css({"list-style":"none","display":"table","table-layout":"fixed","width":"100%"});
  for (let i = 0; i < tabs.length; i++) {
      addTabs(tabs[i]);
  }
  document.write('</div>');
 });
}

