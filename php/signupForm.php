<?php

include("include/settings.php");
include("include/MailChimp.php");

if(isset($_GET['email'])){
    $email = $_GET['email'];

	if($useMailChimp === "YES"){
		$MailChimp = new MailChimp($APIKey);
		$result = $MailChimp->call('lists/subscribe', array(
			'id'                => $listID,
			'email'             => array( 'email' => $email ),
			'merge_vars'        => array(),
			'double_optin'      => false,
			'update_existing'   => true,
			'replace_interests' => false
		));

		if( $result === false ) {
			$status = 0;
			$message = "Ooops, there has been a technical error!";
		}
		else if( isset($result->status) && $result->status == 'error' ) {
			// Error info: $result->status, $result->code, $result->name, $result->error
			$status = 0;
			$message = $result->error;
		}
		else{
			$status = 1;
			$message = "You have been signed up!";
		}

	}
	else{
		$con = mysqli_connect($host, $username, $password, $database);

		// Check connection
		if (mysqli_connect_errno()) {
			$status = 0;
			// Failed to connect to MySQL
			$message = "Internal server error!" ;
		}
		else{
			$existingSignup = mysqli_query($con, "SELECT * FROM signups WHERE signup_email_address='$email'");
			
			if(mysqli_num_rows($existingSignup) < 1){
				$timestamp = date('Y-m-d H:i:s');
				$insertSignup = mysqli_query($con,"INSERT INTO signups (signup_email_address, signup_timestamp) VALUES ('$email','$timestamp')");
				
				if($insertSignup) {
					$status = 1;
					$message = "You have been signed up!";
				}
				else {
					$status = 0;
					$message = "Ooops, there has been a technical error!";
				}
			}
			else {
				$status = 0;
				$message = "This email is already on list!";
			}
		}
		
		mysqli_close($con);
	}
			
	$response = array(
		"status" => $status,
		"message" => $message
	);
	
	echo json_encode($response);
}
?>