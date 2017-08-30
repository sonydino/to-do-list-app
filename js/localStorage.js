
var localstorage=localStorage;
var doc=document;
var list=[];






function takeInputs(){

	addInputs(doc.getElementById('text_title').value,doc.getElementById('button_dropdown').value);
}






function addInputs(title,dropdown_value){
	var obj=new Task(title,dropdown_value);
	localstore(obj);

}






function Task(title,dropdown_value){

	this.title=title;
	this.dropdown_value=dropdown_value;
}

function getvalues(){
	var temp_variable=localstorage.getItem('task0');
	temp_variable=JSON.parse(temp_variable);
	return temp_variable;
}





function localstore(obj){

	list=getvalues();
	if(list===null) list=[];

	list.push(obj);
	localstorage.setItem('task0',JSON.stringify(list));
	window.location="file:///C:/Users/sjoseph/Desktop/Assignment1/index.htm";
	data_retrive();
}







function data_retrive(){

	
	function add(type,title1,dropdown_value) {

          var title = doc.createElement("input");
          title.type = "button";
          title.value = title1; 
          title.name = type; 

          var priority = doc.createElement("input");
          priority.type = "button";
          priority.value = dropdown_value; 
          priority.name = type; 

          var delete_button = doc.createElement("input");
          delete_button.type = "button";
          delete_button.value = "Delete";
          delete_button.name = type; 
          
          var done_button = doc.createElement("input");
          done_button.type = "button";
          done_button.value = "done";
          done_button.name = type;





          delete_button.onclick = function() {
          
          var length_of_list=list.length;
          	var index;
          	for(index=0;index<length_of_list;index++){
          		if(title1===list[index].title){
          			break;
          		}
     		}
          	
          	list.splice(index,1);
          	localstorage.setItem('task0',JSON.stringify(list));
			window.location="file:///C:/Users/sjoseph/Desktop/Assignment1/index.htm";
          };





          var mybr = doc.createElement('br');
          var boot_column1 = doc.getElementById("boot_column1");
          var boot_column2 = doc.getElementById("boot_column2");
          var boot_column3 = doc.getElementById("boot_column3"); 
          var row_align = doc.getElementById("row_align");
          boot_column1.appendChild(title);
          boot_column2.appendChild(priority);
          boot_column3.appendChild(delete_button);
        }






        list.sort(function(a,b){
          var priority_1=a.dropdown_value.toLowerCase();
          if(priority_1==='low') priority_1="zzzz";
          var priority_2=b.dropdown_value.toLowerCase();
          if(priority_2==='low') priority_2="zzzz";
          if(priority_1<priority_2)  return -1;
          return 1;
        });





        var list_len=list.length;
        for(var i=0;i<list_len;i++){
            add("text",list[i].title,list[i].dropdown_value);
        }

}














