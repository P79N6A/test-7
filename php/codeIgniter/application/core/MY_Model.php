<?php

class MY_Model extends CI_Model {
    public $table;
    public function __construct()
    {
        parent::__construct();
    }

    public function _save($data='', $condition)
    {
        if (empty($data)) {
            return 'nodata..';
        }else {
            if ($condition) {
                $ok = $this->db->update($this->table, $data, $condition);
            } else {
                $ok = $this->db->insert($this->table, $data);
            }
            
            return $ok ? 'done' : 'fail';
        }
    }



    // -----------------------------------------------------------

    public function get()
    {
        $query = $this->db->get($this->table);
        return $query->result();
    }


    public function insert($data='')
    {
        return $this->_save($data);
    }

    public function update($data='', $condition)
    {
        return $this->_save($data, $condition);
    }

    public function hi()
    {
        return 'hello';
    }
}