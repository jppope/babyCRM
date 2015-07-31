
// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

	// Delete User link click

	$('.cardsmall div a.linkdeleteCusty').on('click', 'a.linkdeleteCusty', deletecusty);

	$('#btnAddUser').on('click', addUser);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var custy = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/datainfo/custy', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){

            if (data.status = 1){
				custy += '<div class="cardsmall">';
				custy += '<div class="company-orange">' + this.fullName + '</div>';
				custy += '<div><strong>Phone Number:</strong> ' + this.phone + '</div>';
				custy += '<div><a href="#" class="linkdeleteCusty" rel="' + this._id + '">delete</a></div>';
				custy += '</div>';
                $('.opps').html(custy);
            }
			else {
				$('.opps').html("<h1>There are no Customers</h1>")
			}

        });

    });
};


/**********************************
* Add a user
***********************************/

function addUser(event) {
	event.preventDefault();

	// Super basic validation - increase errorCount variable if any fields are blank
	var errorCount = 0;
	$('contact-info input').each(function(index, val) {
		if($(this).val() === '') { errorCount++; }
	});

	// Check and make sure errorCount's still at zero
	if(errorCount === 0) {

		// If it is, compile all user info into one object
		var newCusty = {
			'fullName': $('input#inputfullName').val(),
			'company': $('input#inputcompany').val(),
			'url': $('input#inputurl').val(),
			'phone': $('input#inputphone').val(),
			'email': $('input#inputEmail').val(),
			'Address': $('input#inputAddress').val(),
			'Zip': $('input#inputZip').val(),
			"referralSource": $(' #inputSource option:selected').text(),
			"Make": $(' #inputManufacturer option:selected').text(),
			"Model": $('#inputKind option:selected').text(),
			"Carrier": $('#inputCompany option:selected').text(),
			"problem": $('#inputProblem option:selected').text(),
			"notes": $('textarea#inputNotes').val(),
			"price": 0,
			"upsellItem": null,
			"upsellAmount": 0,
			"status": 1
		}

		// Use AJAX to post the object to our adduser service
		$.ajax({
			type: 'POST',
			data: newCusty,
			url: '/datainfo/add',
			dataType: 'JSON'
		}).done(function( response ) {

			// Check for successful (blank) response
			if (response.msg === '') {
				window.location.href = "/";
			}
			else {

				// If something goes wrong, alert the error message that our service returned
				alert('Error: ' + response.msg);

			}
		});
	}
	else {
		// If errorCount is more than 0, error out
		alert('Please fill in all fields');
		return false;
	}
};

/**********************************
 * Delete a Record
 ***********************************/

function deletecusty(event) {

	event.preventDefault();

	// Pop up a confirmation dialog
	var confirmation = confirm('Are you sure you want to delete this user?');

	// Check and make sure the user confirmed
	if (confirmation === true) {

		// If they did, do our delete
		$.ajax({
			type: 'DELETE',
			url: '/datainfo/deletecusty/' + $(this).attr('rel')
		}).done(function( response ) {

			// Check for a successful (blank) response
			if (response.msg === '') {
			}
			else {
				alert('Error: ' + response.msg);
			}

			// Update the table
			populateTable();

		});

	}
	else {

		// If they said no to the confirm, do nothing
		return false;

	}

};


