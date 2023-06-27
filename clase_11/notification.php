<form method="post" action="notification.php">
Title<input type="text" name="title">
Message<input type="text" name="message">
<!--Icon path<input type="text" name="icon">-->
Token<input type="text" name="token">
<input type="submit" value="Send notification">
</form>

<?php
function sendNotification(){
    $url ="https://fcm.googleapis.com/fcm/send";

    $fields=array(
        "to"=>$_REQUEST['token'],
        "notification"=>array(
            "body"=>$_REQUEST['message'],
            "title"=>$_REQUEST['title'],
            "icon"=>$_REQUEST['icon'],
        )
    );

    $headers=array(
        'Authorization: key=AAAAFMud1Dg:APA91bFZ5RQcETsE8L0X7r1YhwiUr7cr6vmc6J3XeKWTk89HvGQSfUVr5sC9W5J-OenqYSLno5wyMZvXh8eECE6sCzAm0wGowSUDgeFwsr_a7nUIPpabLHLNGlFUEcmZYf5lRDblAcaJ',
        'Content-Type:application/json'
    );

    $ch=curl_init();
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_POST,true);
    curl_setopt($ch,CURLOPT_HTTPHEADER,$headers);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
    curl_setopt($ch,CURLOPT_POSTFIELDS,json_encode($fields));
    $result=curl_exec($ch);
    print_r($result);
    curl_close($ch);
}
sendNotification();
