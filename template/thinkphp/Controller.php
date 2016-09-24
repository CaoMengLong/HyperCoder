<?php
namespace Home\Controller;
use Think\Controller;
use Org\Util;

/**
 * Description of DemoController
 *
 * @author YourName
 */
class @@classname@@Controller extends Controller {

    /**
    * 列表
    * @author YourName <YourEmail>
    */
    public function index(){
        $name = I('name');
        $map['name'] = array('like', '%' . (string) $name . '%');
        $list = $this->lists('[[tablenoprfixname]]', $map);
        int_to_string($list);
        $this->assign('_list', $list);
        $this->meta_title = '列表页标题';
        $this->display();
    }


    /**
    * 添加
    * @author YourName <YourEmail>
    */
    public function add(@@paramsstr@@){
         if(IS_POST){
            $@@tablenoprfixname@@ = array(
                @@addvalue@@
            );
            $id = M('@@tablenoprfixname@@')->add($@@tablenoprfixname@@);
            if (!$id) {
            	$this->error('添加失败！');
            } else {
            	$this->success('添加成功！', U('index'));
            };
         }else{
            $this->display();
         }
     }

     /**
     * 编辑
     * @author YourName <YourEmail>
     */
    public function edit(@@paramsstr@@){
        if(IS_POST){
            $@@tablenoprfixname@@ = array(
                @@editvalue@@
            );
             if (!M('@@tablenoprfixname@@')->where(array('id' => $id))->save($@@tablenoprfixname@@)) {
                $this->error('修改失败！');
            } else {
                $this->success('修改成功！', U('index'));
            };
        }else{
            $this->display();
        }
    }


    /**
    * 删除方法
    * @author YourName <YourEmail>
    */
    public function del($id = ''){
         if(!is_null($id)){
             if (!M('@@tablenoprfixname@@')->where(array('id' => $id))->delete()){
                $this->error('删除失败！');
            } else {
                $this->success('删除成功！', U('index'));
            };
        }
    }


    /**
    * 状态修改
    * @author YourName <YourEmail>
    */
    public function changeStatus($method = null, $id) {
       $id = is_array($id) ? implode(',', $id) : $id;
       if (empty($id)) {
           $this->error('请选择要操作的数据!');
       }
       $map['id'] = array('in', $id);
       switch (strtolower($method)) {
           case 'forbid':
               $this->forbid('@@tablenoprfixname@@', $map);
               break;
           case 'resume':
               $this->resume('@@tablenoprfixname@@', $map);
               break;
           case 'delete':
               $this->delete('@@tablenoprfixname@@', $map);
               break;
           default:
               $this->error('@@tablenoprfixname@@');
       }
    }


}