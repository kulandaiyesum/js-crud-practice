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
    formValidation();
    let myFormData = readFormData();
    if (tr === null){
        sbtn.innerHTML = "Create Contact";
        insertNewRecord(myFormData);
    }else {
        sbtn.innerHTML = "Update contacts...";
        updateRecord(myFormData);
        sbtn.innerHTML = "Create Contact";
    } 

    
});


// form validation

let formValidation = () => {
    let fullName = document.getElementById("fullname").value;
    let address = document.getElementById("address").value;
    let phoneNo = document.getElementById("phno").value;
    let email = document.getElementById("email").value;

    if(fullName === ""){
        error1.innerHTML = "name cannot blank!";
    }else {
        error1.innerHTML = "";
    }

    if(address === ""){
        error2.innerHTML = "address cannot blank!";
    }else {
        error2.innerHTML = "";
    }

    if(phoneNo === ""){
        error3.innerHTML ="plz! telphone number";
    }else {
        error3.innerHTML = "";
    }

    if(email === ""){
        error4.innerHTML = "Enter email";
    }else {
        error4.innerHTML = "";
    }
}

//Retrieve the data
function readFormData() {
    let formData = {};
    formData["full name"] = document.getElementById("fullname").value;
    formData.address = document.getElementById("address").value;
    formData.phno = document.getElementById("phno").value;
    formData.email = document.getElementById("email").value;
    formData.web = document.getElementById("web").value;
    return formData;
}

// readFormData();

//Insert the data
function insertNewRecord(data) {
    sbtn.innerHTML = "Create Contact";
    let table = document.getElementById("contactList").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
        cell1.innerHTML = data["full name"];
    cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.address;
    cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.phno;
    cell4 = newRow.insertCell(3);
        cell4.innerHTML = data.email;
    cell5 = newRow.insertCell(4);
        cell5.innerHTML = data.web;
    cell5 = newRow.insertCell(5);
        cell5.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
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
function updateRecord(myFormData) {
    sbtn.innerHTML = "Update contacts...";
    tr.cells[0].innerHTML = myFormData.fullname;
    tr.cells[1].innerHTML = myFormData.address;
    tr.cells[2].innerHTML = myFormData.phno;
    tr.cells[3].innerHTML = myFormData.email;
    tr.cells[4].innerHTML = myFormData.web;

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
    selectedRow = null;
}
