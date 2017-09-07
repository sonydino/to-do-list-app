
var localstorage=localStorage;
var doc=document;
var list=fetching_from_localstorage();

function fetching_from_localstorage(){
	var temp_variable=localstorage.getItem('task0');
	temp_variable=JSON.parse(temp_variable);
	return temp_variable;
}

if(list===null) list=[];

fetch_data_into_html();

function AddItems(){


	function addInputs(title,dropdown_value,done_value){

		if(title===null || title===""){
			alert("please fill out the title");
			return 0;
		}



		function Task(title,dropdown_value,done_value){
			this.title=title;
			this.dropdown_value=dropdown_value;
			this.done_value=done_value;
		}


		function localstore(obj){
			list.push(obj);
			localstorage.setItem('task0',JSON.stringify(list));
			window.location="exp.htm";
		}


		var obj=new Task(title,dropdown_value,done_value);
		localstore(obj);

	}

	addInputs(doc.getElementById('text_title').value,doc.getElementById('button_dropdown').value,null);

}

function fetch_data_into_html(){

	list.sort(function(a,b){
		var priority_1=a.dropdown_value.toLowerCase();
		if(priority_1==='low') priority_1="zzzz";
		var priority_2=b.dropdown_value.toLowerCase();
		if(priority_2==='low') priority_2="zzzz";
		if(priority_1<=priority_2)  return -1;
		return 1;
	});

	var l=list.length;

	for(var i=0;i<l;i++){
		insert_data_into_table(i);

	}


	function delete_Item(delete_button,current_element){

		delete_button.onclick = function() {
			var length_of_list=list.length;
			var index;
			
			for(index=0;index<length_of_list;index++){
				if(list[current_element].title===list[index].title){
					break;
				}
			}
			list.splice(index,1);
			localstorage.setItem('task0',JSON.stringify(list));
			window.location="exp.htm";
		};
	}

	function status_of_Task(done_button,current_element,mytr){

		done_button.onclick=function(){
			if(list[current_element].done_value===null){
				mytr.style.color="#c9c9c9";
				list[current_element].done_value="Done";
			}
			else{
				list[current_element].done_value=null;
				mytr.style.color="";
			}
			localstorage.setItem('task0',JSON.stringify(list));
		}
	}


	function insert_data_into_table(current_element) {


		function create_delete_button(){
			
			var delete_button = doc.createElement("input");
			delete_button.type = "button";
			delete_button.value = "Delete";
			delete_button.name = "text";

			return delete_button;
		}

		function create_done_button() {
			var done_button = doc.createElement("input");
			done_button.type = "checkbox";
			done_button.value = "NotDone";
			done_button.name = "text";
			
			if(list[current_element].done_value!=null){
				done_button.checked="checked";
				
			}

			return done_button;
		}


		function create_title_element(){
			var title = doc.createElement("P");                       
			var textNode_1 = doc.createTextNode(list[current_element].title);      
			title.appendChild(textNode_1);

			return title;
		}
		                                         
		function create_priority_element(){

			var priority = doc.createElement("P");                       
			var textNode_2 = doc.createTextNode(list[current_element].dropdown_value);       
			priority.appendChild(textNode_2);

			return priority;   
		}

		 var delete_button=create_delete_button();
		 var done_button=create_done_button() ;
		 var title=create_title_element();
		 var priority=create_priority_element();


		create_table_elements();

		function create_table_elements(){

			var mytr = doc.createElement('tr');
			var mytd1=doc.createElement('td');
			var mytd2=doc.createElement('td');
			var mytd3=doc.createElement('td');
			var mytd4=doc.createElement('td');
			var tbody=doc.getElementById("tbody");

			tbody.appendChild(mytr);
			mytr.appendChild(mytd1);
			mytr.appendChild(mytd2);
			mytr.appendChild(mytd3);
			mytr.appendChild(mytd3);
			mytr.appendChild(mytd4);
			mytd1.appendChild(done_button);
			mytd2.appendChild(title);
			mytd3.appendChild(priority);
			mytd4.appendChild(delete_button);

			if(list[current_element].done_value!=null){
				mytr.style.color="#c9c9c9";
			}

			delete_Item(delete_button,current_element);

			status_of_Task(done_button,current_element,mytr);
		}		
	} 
}