let tr = null;
let sbtn = document.getElementById("btnSubmit");
let myForm = document.getElementById("myForm");

// search 
function searchFn(){
    var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchBox");
  filter = input.value.toUpperCase();
  table = document.getElementById("contactList");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    readFormData();
});

//Retrieve the data
function readFormData(){
    let formData = {};
    formData["full name"] = document.getElementById("fullname").value;
    formData.address = document.getElementById("address").value;
    formData.phno = document.getElementById("phno").value;
    formData.email = document.getElementById("email").value;
    formData.web = document.getElementById("web").value;

    // validate
    if(formData["full name"] === "") {
        error1.innerHTML = "name cannot blank!";
    }
    else if(formData.address === ""){
        error1.innerHTML = ""
        error2.innerHTML = "address cannot blank!";
    }
    else if(formData.phno === ""){
        error2.innerHTML = "";
        error3.innerHTML ="plz! telphone number";
    }
    else if(formData.email === ""){
        error3.innerHTML ="";
        error4.innerHTML = "Enter email";
    }
    else{
        error4.innerHTML = "";
        // insert value
        if(tr === null){
            sbtn.innerHTML = "Create Contact";
            let table = document.getElementById("contactList").getElementsByTagName('tbody')[0];
            let newRow = table.insertRow(table.length);
            cell1 = newRow.insertCell(0);
                cell1.innerHTML = formData["full name"];
            cell2 = newRow.insertCell(1);
                cell2.innerHTML = formData.address;
            cell3 = newRow.insertCell(2);
                cell3.innerHTML = formData.phno;
            cell4 = newRow.insertCell(3);
                cell4.innerHTML = formData.email;
            cell5 = newRow.insertCell(4);
                cell5.innerHTML = formData.web;
            cell5 = newRow.insertCell(5);
                cell5.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
            
        }else{
            // update value
            sbtn.innerHTML = "Update contacts...";
            tr.cells[0].innerHTML = formData["full name"];
            tr.cells[1].innerHTML = formData.address;
            tr.cells[2].innerHTML = formData.phno;
            tr.cells[3].innerHTML = formData.email;
            tr.cells[4].innerHTML = formData.web;
            sbtn.innerHTML = "Create Contact";
        }
        resetForm(); 
    }
}
//Edit the data
function onEdit(btn) {
    sbtn.innerHTML = "Update contacts...";
    tr = btn.parentElement.parentElement;
    document.getElementById("fullname").value = tr.cells[0].innerHTML;
    document.getElementById("address").value = tr.cells[1].innerHTML;
    document.getElementById("phno").value = tr.cells[2].innerHTML;
    document.getElementById("email").value = tr.cells[3].innerHTML;
    document.getElementById("web").value = tr.cells[4].innerHTML;

}
//Delete the data
function onDelete(deletebutton) {
    if (confirm('Do you want to delete this record?')) {
        row = deletebutton.parentElement.parentElement;
        document.getElementById('contactList').deleteRow(row.rowIndex);
        resetForm();
    }
}
//Reset the data
function resetForm() {
    document.getElementById("fullname").value = "";
    document.getElementById("address").value = "";
    document.getElementById("phno").value = "";
    document.getElementById("email").value = "";
    document.getElementById("web").value = "";
    tr = null;
}
