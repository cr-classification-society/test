<?php

$i = 2;

if ($i == 2){
    echo "terw";
}

echo match ($i) {
    1 => '11111',
    2 => '22222',
    default => 'aaaaa'
};
