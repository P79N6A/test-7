<?php

defined('BASEPATH') or exit('No allow directly access');

function echoln($str)
{
    echo "$str \n";
}

class Home extends MY_Controller {

    public function __construct()
    {
        parent::__construct();


        $this->load->model('user', 'userModel');
    }

    public function index($a='', $b='')
    {
        echo "home page";
        echo "see me?";
        
        // can not find in folder 'logs'
        // log_message('debug', 'test log some info...');
        
        // stop response
        // show_404();
        
        // $this->load->model('user', 'userModel');
        // echo $this->userModel->hi();
        
        
        function getUser($ci)
        {
            $result = $ci->userModel->get();
            print_r($result);
        }

        function saveUser($ci, $condition)
        {
            $postData = $ci->input->post();
            
            if ($condition) {
                $result = $ci->userModel->update($postData, $condition);
            } else {
                $result = $ci->userModel->insert($postData);
            }
            
            echoln($result);

        }
        
        function insertUser($ci) {
            saveUser($ci);
        }

        function updateUser($ci, $id)
        {
            if (empty($id)) {
                return echoln('need specify userId, by url segment');
            }
            $condition = array('id' => $id);


            saveUser($ci, $condition);

        }

        getUser($this);
        // insertUser($this);
        // updateUser($this, $a);
                

        
        echoln('after33');
    }

    public function test($a='', $b='')
    {
        echoln('in test fn..');
        echoln("a=$a, b=$b");

        echo $this->userModel->hi();
        echo $this->foo();

    }
}