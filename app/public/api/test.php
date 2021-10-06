<?php

// $foo="test";
// $bar="test1";

// echo $foo . " " . $bar."\n";
// echo $num * $num * $num;
// $num = 2;
$array= [
    "1"=> "hello",
    "2"=> "sup",
];

echo json_encode($array);
echo "<br>";

$arr=[1,2,3,4,5,5,6];
for ($i=0;$i<count($arr);$i++){
    echo $arr[$i];
    echo "<br>";
}