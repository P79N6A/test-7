<? php

function aoo() {
    echo 'in aoo';


    function foo() {
        echo 'foo';
    }

    foo();
}

function boo() {
    echo 'in boo';

    if (!function_exists('foo')) {
        function foo() {
            echo 'foolish';
        }
    }

    foo();
}

aoo();
boo();

var_dump(false);
var_dump(FALSE);