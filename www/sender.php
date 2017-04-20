<?php
$tosend = "video@jdgroup.com.ua"; //To:
$subject = "JDGroup"; //Subject:
$from_name = "Wi-Fi JDGroup"; //From:
$from_email = "video@jdgroup.com.ua"; //From:

////NO EDIT
if(!isset($_POST['act'])) {
	exit();
}
switch($_POST['act']) {
	case 'sender':
		if(empty($_POST['name']) || empty($_POST['phone']) || empty($_POST['subject'])) {
			exit();
		}
		$name = $_POST['name'];
		$phone = $_POST['phone'];
		$email = $_POST['email'];
		$text = nl2br($_POST['text']);
		$address = $_POST['address'];
		$object = $_POST['object'];
		$subject2 = $_POST['subject'];

		$msg  = "<p><strong>{$subject2}</strong></p>\r\n";
		$msg .= "<p><strong>Имя:</strong> {$name}</p>\r\n";
		$msg .= "<p><strong>Телефон:</strong> {$phone}</p>\r\n";
		if(!empty($email)) $msg .= "<p><strong>E-mail:</strong> {$email}</p>\r\n";
		if(!empty($address)) $msg .= "<p><strong>Адрес:</strong> {$address}</p>\r\n";
		if(!empty($object)) $msg .= "<p><strong>Объект:</strong> {$object}</p>\r\n";
		if(!empty($text)) $msg .= "<p><strong>Сообщение:</strong> {$text}</p>\r\n";

		$headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=utf-8\r\n";
		$headers .= "From: =?UTF-8?B?".base64_encode($from_name)."?= <".$from_email.">\r\n";

		if(mail($tosend, "=?UTF-8?B?".base64_encode($subject)."?=", $msg, $headers)) {
			echo json_encode(array('result' => 'ok'));
		} else {
			echo json_encode(array('result' => 'fail'));
		}
	break;
	default: exit();
}
?>