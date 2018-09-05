<?php 
	require_once '../vendor/autoload.php';

	// send mail using send grid
	function send_mail($name, $details, $from, $to, $fileName) {
	    
	    $from = new SendGrid\Email("Support", $from);
	    $subject = 'Dear ' . $name;
	    $to = new SendGrid\Email($name, $to);

	    // Send message as html
	    $content = new SendGrid\Content("text/html", $details);
	    
	    $mail = new SendGrid\Mail($from, $subject, $to, $content);

	    //make attachment
	    /*
	    if(!empty($fileName)):
	        $att1 = new SendGrid\Attachment();
	        $att1->setContent(base64_encode(file_get_contents($fileName)));
	        $att1->setType("pdf");
	        $att1->setFilename($fileName);
	        $att1->setDisposition("attachment");
	        
	        $mail->addAttachment($att1);
	    endif;
	    */

	    //$apiKey = getenv('SENDGRID_API_KEY');
	    $apiKey = SEND_GRID_API_KEY;
	    $sg = new \SendGrid($apiKey);
	    
	    try { 
	        $response = $sg->client->mail()->send()->post($mail);
	        return true;
	    } catch (Exception $e) {
	        //echo 'Caught exception: ',  $e->getMessage(), "\n";
	        return false;
	    }
	    //after send email, record to download table
	    
	    //remove temp file with each record
	    // unlink($fileName);
	    // echo $response->statusCode();
	    // print_r($response->headers());
	    // echo $response->body();
	    
	}
?>