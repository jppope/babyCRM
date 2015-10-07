
// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {
    populateTable();    
    //populateCustyList();
    //addNavManu();
	$('#btnAddUser').on('click', addUser);	
	//$("a.delete-custy").on("click","a.delete-custy",deleteCusty)
	//$('a.delete-custy').on('click', addUser);
});




// Functions =============================================================

function populateTable() {
	console.log("populate table start");
    var custy = '';
    $.getJSON( '/datainfo/custy', function( data ) {
        $.each(data, function(){
				custy += '<div class="cardsmall">';
				custy += '<div class="company-orange">' + this.fullName + '</div>';
				custy += '<div><strong>Phone Number:</strong> ' + this.phone + '</div>';
				custy += '<div><a class="delete-custy" rel="' + this._id + '">delete</a></div>';
				custy += '</div>';
                $('.opps').html(custy);
        });  
             
        $("a.delete-custy").on("click", function(){
			deleteCusty("a.delete-custy");
		});
		
		//$("a.delete-custy").on("click","a.delete-custy",deleteCusty)

    });
}


/**********************************
* Add a user
***********************************/

function addUser(event) {
	alert( event.isDefaultPrevented() ); // false
	event.preventDefault();
	alert( event.isDefaultPrevented() );
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
		};
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
}

/**********************************
 * Delete a Record
 ***********************************/

function deleteSingle(){	

	}


function deleteCusty(event) {

 //event.preventDefault();
	// Pop up a confirmation dialog
	var confirmation = confirm('Are you sure you want to delete this user?');
	// Check and make sure the user confirmed
	if (confirmation === true) {
		// If they did, do our delete
		$.ajax({
			type: 'DELETE',
			url: '/datainfo/deletecusty/' + $(event).attr('rel')
		}).done(function( response ) {
			// Check for a successful (blank) response
			if (response.msg === '') {
				console.log("complete");
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
}

// Fill table with data

function populateCustyList() {
	console.log("Populate Custy List");
	$.getJSON( '/datainfo/custy', function( data ) {
		$.each(data, function(){
				var tableData = '';
				$.each(data, function(){
					tableData += '<tr>';
					tableData += '<td>' + this.fullName + '</td>';
					tableData += '<td>' + this.phone + '</td>';
					tableData += '<td>' + this.email + '</td>';
					tableData += '<td>' + this.Zip + '</td>';
					tableData += '<td>' + this.referralSource + '</td>';
					tableData += '<td>' + this.Make + this.Model  + '</td>';
					tableData += '<td>' + this.problem + '</td>';
					tableData += '<td>' + this.notes + '</td>';
					tableData += '<td>' + this.price + '</td>';
					tableData += '<td>' + this.upsellItem + '</td>';
					tableData += '<td>' + this.upsellAmount + '</td>';
					tableData += '</tr>';
				});
				$('#custydatatable table tbody').html(tableData);
			}
		);});

}

/**********************************
 * Navigation Menu
 ***********************************/

function addNavManu(){

	$(function() {
		$('.toggle-nav').click(function() {
			toggleNavigation();
		});
	});
	
	// The toggleNav function itself
	function toggleNavigation() {
		if ($('#container').hasClass('display-nav')) {
			// Close Nav
			$('#container').removeClass('display-nav');
		} else {
			// Open Nav
			$('#container').addClass('display-nav');
		}
	}
	
	// SLiding codes
	$("#toggle > li > div").click(function () {
		if (false === $(this).next().is(':visible')) {
			$('#toggle ul').slideUp();
		}
		var $currIcon=$(this).find("span.the-btn");
		$("span.the-btn").not($currIcon).addClass('fa-plus').removeClass('fa-minus');
		$currIcon.toggleClass('fa-minus fa-plus');
		$(this).next().slideToggle();
		$("#toggle > li > div").removeClass("active");
		$(this).addClass('active');
	
	});

}