//Set the API Server Address
const server = 'http://127.0.0.1:8000';



function ProcessContacts(json) {
    //Function that processes JSON data recieved from server to be rendered
    
    $("#card-container").html('');
    //Get the number of contacts recieved
    let numContacts = Object.keys(json).length;
    
    //Update the display at the bottom of the page to reflect how many contacts are in the database
    $(".end").html(numContacts + " Contacts Found");

    //Loop through every contact to create a card to render
    for (var counter = 0; counter < numContacts; counter++) {
        
        //Get the number of phone numbers and email addresses the current contact has
        var numPhone = Object.keys(json[counter].phone).length;
        var numEmail = Object.keys(json[counter].email).length;
        phoneHtml = '';
        emailHtml = '';
        
        //Loop through every phone number and email address of current contact and add the html to render
        for (var phoneCounter = 0; phoneCounter < numPhone; phoneCounter++) {
            phoneHtml += '<span id="Phone' + phoneCounter + '">' + json[counter].phone[phoneCounter] + '</span><br>';
        };

        for (var emailCounter = 0; emailCounter < numEmail; emailCounter++) {
            emailHtml += '<span id="Email' + emailCounter + '">' + json[counter].email[emailCounter] + '</span><br>';
        };

        //Create the new card html to render and add to the page
        newCard =     
        '<div id=' + json[counter].id + '" class="card contact col-sm d-inline-flex" style="width: 18rem;"> \
                <div class="card-body"> \
                    <h5 class="card-title">' + json[counter].name + ' ' + json[counter].surname + '</h5> \
                    <p class="card-text text-left"> \
                        Phone:<br>' + phoneHtml +
                            '<br>Email:<br>' + emailHtml +
                            '</p> \
                            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#editModal" onclick="GetEditData(' + json[counter].id + ')">\
                            Edit</button>\
                            <button type="button" class="btn btn-danger" onclick="DeleteContact('+ json[counter].id +
                            ') "data-toggle="delete">Delete</button>\
                </div> \
            </div>';

        $("#card-container").append(newCard);
    }
}//End PorocessContacts()



function ViewContacts() {
    //Function that retrieves all contact and lists them alphabetically
    
    //Get the data from the API server in JSON format
    $.ajax({
        url: server + '/viewall/',
        type : "GET",
        dataType : "json",
    })
    .done(function(json) {
        //When the JSON Data has been retrieved successfully, pass it to ProcessContacts()
        ProcessContacts(json);
    })
    .fail(function(status, errorThrown) {
        //When there is an error to get data, alert the user and console log details.
        alert('There was a fatal error with the server.')
        console.log("Error: " + errorThrown)
        console.log("Status: " + status)
    })
}//End ViewContacts()



function GetEditData(contactID) {
    //Function to retrieve data of contact to be edited

    document.getElementById("editForm").reset();

    $.ajax({
        url: server + '/search?id=' + contactID,
        type : "GET",
        dataType : "json",
    })
    .done(function(json) {
        //Fill the form fields in the modal with the information that can be edited
        $('#editID').val(contactID);
        $('#editName').val(json[0]['name']);
        $('#editSurname').val(json[0]['surname']);
        var numPhone = Object.keys(json[0].phone).length;
        var numEmail = Object.keys(json[0].email).length;
        for (var phoneCounter = 0; phoneCounter < numPhone; phoneCounter++) {
            $('#editPhone').val($('#editPhone').val() + json[0].phone[phoneCounter] + ',')
        };
        for (var emailCounter = 0; emailCounter < numEmail; emailCounter++) {
            $('#editEmail').val($('#editEmail').val() + json[0].email[emailCounter] + ',')
        };
    })
    .fail(function() {
        alert('There was an error !');
    })
}//End GetEditData()



function EditContact() {
    //Function to update edited information on the server
    let contactID = $('#editID').val();
    let name = $('#editName').val();
    let surname = $('#editSurname').val();
    let phone = $('#editPhone').val().replace(/\s+/g, '');
    let email = $('#editEmail').val().replace(/\s+/g, '');

    $.ajax({
        url: server + '/update?id=' + contactID + '&name=' + name + '&surname=' + surname + '&phone=' + phone + '&email=' + email,
        type : "GET",
    })
    .done(function() {
        alert('Contact Updated !');
    })
    .fail(function() {
        alert('There was an error !');
    })
    .always(function() {
        //reload the page to update the displayed contacts
        location.reload();
    })
}//End EditContact()


function DeleteContact(contactID) {
    //Function that deletes a contact

    //Confirm the user wants to delete
    doDelete = confirm("Are you sure you want to delete this contact ?")
    // If the user confirms, delete the contact based on contactID passed from card
    if (doDelete == true) {
        $.ajax({
            url: server + '/delete?deleteID=' + contactID,
            type : "GET",
        })
        .done(function() {
            alert('Contact Deleted !');
        })
        .fail(function() {
            alert('There was an error !');
        })
        .always(function() {
            //reload the page to update the displayed contacts
            location.reload();
        })
    }
}//End DeleteContact()



function CreateNew() {
    //Function that creates a new contact in the database

    //Get the values from the new contact form
    let name = $("#newName").val();
    let surname = $("#newSurname").val();
    let phone = $("#newPhone").val();
    let email = $("#newEmail").val();
    $.ajax({
        url: server + '/add?name=' + name + '&surname=' + surname + '&phone=' + phone + '&email=' + email,
        type : "GET",
    })
    .done(function() {
        alert('Contact Added !');
    })
    .fail(function() {
        alert('There was an error !');
    })
    .always(function() {
        //reload the page to update the displayed contacts
        document.getElementById("newForm").reset();
        location.reload();
    })
    
}//End CreateNew()



function SearchContact() {
    //Function to get contacts searched for
    
    //Get Name and Surname from Form
    let name = $("#searchName").val();
    let surname = $("#searchSurname").val();
    
    //Get data from server
    $.ajax({
        url: server + '/search?name=' + name + '&surname=' + surname,
        type : "GET",
        dataType : "json",
        async : false,
    })
    .done(function(json) {
        //Pass the data to be processed and rendered
        ProcessContacts(json);
        $(".end").html('<button class="btn btn-primary" onClick="window.location.reload();">Remove Search Filter</button>')
    })
    .fail(function() {
        alert('There was an error !');
    })
    .always(function() {
        document.getElementById("searchForm").reset();
    })
}//End SearchContact()
