<?php

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return file_get_contents(public_path('index.html'));
});

Route::post('/subscribe', function () {
    Log::info('subscription request', request()->all());
});
