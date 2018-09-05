<?php
	require_once 'function.php';
	require_once '../config/config.php';

	if( !empty($_POST['email']) && !empty($_POST['message'])):
		send_mail('User', 'Test', $_POST['email'], TO_ADDR, null);
		$result = [
			'result' => 'success'
		];
	else:
		$result = [
			'result' => 'failed'
		];
	endif;
	echo json_encode($result);
?>
