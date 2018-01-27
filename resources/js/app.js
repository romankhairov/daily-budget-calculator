function edit_row(no)
{
 document.getElementById("edit_button"+no).style.display="none";
 document.getElementById("save_button"+no).style.display="block";

 var source=document.getElementById("source_row"+no);
 var info=document.getElementById("info_row"+no);
 var amount=document.getElementById("amount_row"+no);

 var source_data=source.innerHTML;
 var info_data=info.innerHTML;
 var amount_data=amount.innerHTML;

 source.innerHTML="<input type='text' id='source_text"+no+"' value='"+source_data+"'>";
 info.innerHTML="<input type='text' id='info_text"+no+"' value='"+info_data+"'>";
 amount.innerHTML="<input type='number' id='amount_text"+no+"' value='"+amount_data+"'>";
}

function save_row(no)
{
 var source_val=document.getElementById("source_text"+no).value;
 var info_val=document.getElementById("info_text"+no).value;
 var amount_val=document.getElementById("amount_text"+no).value;

 document.getElementById("source_row"+no).innerHTML=source_val;
 document.getElementById("info_row"+no).innerHTML=info_val;
 document.getElementById("amount_row"+no).innerHTML=amount_val;

 document.getElementById("edit_button"+no).style.display="block";
 document.getElementById("save_button"+no).style.display="none";
}

function delete_row(no)
{
 document.getElementById("row"+no+"").outerHTML="";
}

function add_row()
{
 var new_source=document.getElementById("new_source").value;
 var new_info=document.getElementById("new_info").value;
 var new_amount=document.getElementById("new_amount").value;

 var table=document.getElementById("data_table");
 var table_len=(table.rows.length)-1;
 var row = table.insertRow(table_len).outerHTML="<tr id='row"+table_len+"'><td id='source_row"+table_len+"'>"+new_source+"</td><td id='info_row"+table_len+"'>"+new_info+"</td><td id='amount_row"+table_len+"'>"+new_amount+"</td><td><input type='button' id='edit_button"+table_len+"' value='Edit' class='edit' onclick='edit_row("+table_len+")'> <input type='button' id='save_button"+table_len+"' value='Save' class='save' onclick='save_row("+table_len+")'> <input type='button' value='Delete' class='delete' onclick='delete_row("+table_len+")'></td></tr>";

 document.getElementById("new_source").value="";
 document.getElementById("new_info").value="";
 document.getElementById("new_amount").value="";
}
