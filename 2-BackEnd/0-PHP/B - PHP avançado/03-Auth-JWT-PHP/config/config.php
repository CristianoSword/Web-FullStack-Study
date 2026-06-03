<?php
return [
    'jwt_secret' => 'my_super_secret_key_change_in_prod',
    'jwt_algo'   => 'HS256',
    'jwt_ttl'    => 3600,      // 1 hour in seconds
    'db' => [
        'host'    => 'localhost',
        'dbname'  => 'auth_db',
        'user'    => 'root',
        'pass'    => '',
        'charset' => 'utf8mb4',
    ],
];
