<?php
/**
 *
 * 栏目列表/频道动态页
 *
 * @version        $Id: list.php 1 15:38 2010年7月8日Z tianya $
 * @package        DedeCMS.Site
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           http://www.dedecms.com
 */
require_once(dirname(__FILE__)."/../include/common.inc.php");

//无限加载
if(isset($_GET['ajax'])){
  $typeid = isset($_GET['typeid']) ? intval($_GET['typeid']): 6;//传递过来的分类ID
  $page = isset($_GET['page']) ? intval($_GET['page']): 0;//页码
  $pagesize = isset($_GET['pagesize']) ? intval($_GET['pagesize']): 20;//每页多少条，也就是一次加载多少条数据
  $start = $page>0 ? ($page-1)*$pagesize : 0;//数据获取的起始位置。即limit条件的第一个参数。
  $typesql = $typeid ? " WHERE typeid=$typeid" : '';//这个是用于首页实现瀑布流加载，因为首页加载数据是无需分类的，所以要加以判断，如果无需
  $total_sql = "SELECT COUNT(id) as num FROM `#@__archives`  $typesql ";
  $temp = $dsql->GetOne($total_sql);
  $total = 0;//数据总数
  $load_num =0;
  if(is_array($temp)){
    $load_num= round(($temp['num']-20)/$pagesize);//要加载的次数,因为默认已经加载了
    $total = $temp['num'];
  }
  $sql = "SELECT a.*,t.typedir,t.typename,t.isdefault,t.defaultname,t.namerule,
        t.namerule2,t.ispart, t.moresite,t.siteurl,t.sitepath
FROM `#@__archives` as a JOIN `#@__arctype` AS t ON a.typeid=t.id    $typesql ORDER BY id DESC LIMIT $start,$pagesize";
//echo "$sql";
   $dsql->SetQuery($sql);
   $dsql->Execute('list');
   $statu = 0;//是否有数据，默认没有数据
   $data = array();
   $index = 0;
while($row = $dsql->GetArray("list")){
   $row['info'] = $row['info'] = $row['infos'] = cn_substr($row['description'],160);
   $row['id'] =  $row['id'];
   $row['filename'] = $row['arcurl'] = GetFileUrl($row['id'],
   $row['typeid'],$row['senddate'],$row['title'],$row['ismake'],
   $row['arcrank'],$row['namerule'],$row['typedir'],$row['money'],
   $row['filename'],$row['moresite'],$row['siteurl'],$row['sitepath']);
   $row['typeurl'] = GetTypeUrl($row['typeid'],$row['typedir'],
   $row['isdefault'],$row['defaultname'],$row['ispart'],
   $row['namerule2'],$row['moresite'],$row['siteurl'],$row['sitepath']);
   if($row['litpic'] == '-' || $row['litpic'] == ''){
    $row['litpic'] = $GLOBALS['cfg_cmspath'].'/images/defaultpic.gif';
   }
   if(!preg_match("#^https:\/\/#i", $row['litpic']) &&$GLOBALS['cfg_multi_site'] == 'Y'){
    $row['litpic'] = $GLOBALS['cfg_mainsite'].$row['litpic'];
   }
   $row['picname'] = $row['litpic'];//缩略图
   $row['stime'] = GetDateMK($row['pubdate']);
   $row['typelink'] = "<a href='".$row['typeurl']."'>".$row['typename']."</a>";//分类链
   $row['fulltitle'] = $row['title'];//完整的标题
   $row['shorttitle'] = $row['shorttitle'];//副标题
   $row['title'] = cn_substr($row['title'], 60);//截取后的标题
   $data[$index] = $row;
   $index++;
}
if(!empty($data)){
$statu = 1;//有数据
}
$result =array('statu'=>$statu,'list'=>$data,'total'=>$total,'load_num'=>$load_num);
echo json_encode($result);//返回数据
exit();
}
//无限加载



//$t1 = ExecTime();

$tid = (isset($tid) && is_numeric($tid) ? $tid : 0);

$channelid = (isset($channelid) && is_numeric($channelid) ? $channelid : 0);

if($tid==0 && $channelid==0) die(" Request Error! ");
if(isset($TotalResult)) $TotalResult = intval(preg_replace("/[^\d]/", '', $TotalResult));


//如果指定了内容模型ID但没有指定栏目ID，那么自动获得为这个内容模型的第一个顶级栏目作为频道默认栏目
if(!empty($channelid) && empty($tid))
{
    $tinfos = $dsql->GetOne("SELECT tp.id,ch.issystem FROM `#@__arctype` tp LEFT JOIN `#@__channeltype` ch ON ch.id=tp.channeltype WHERE tp.channeltype='$channelid' And tp.reid=0 order by sortrank asc");
    if(!is_array($tinfos)) die(" No catalogs in the channel! ");
    $tid = $tinfos['id'];
}
else
{
    $tinfos = $dsql->GetOne("SELECT ch.issystem FROM `#@__arctype` tp LEFT JOIN `#@__channeltype` ch ON ch.id=tp.channeltype WHERE tp.id='$tid' ");
}

if($tinfos['issystem']==-1)
{
    $nativeplace = ( (empty($nativeplace) || !is_numeric($nativeplace)) ? 0 : $nativeplace );
    $infotype = ( (empty($infotype) || !is_numeric($infotype)) ? 0 : $infotype );
    if(!empty($keyword)) $keyword = FilterSearch($keyword);
    $cArr = array();
    if(!empty($nativeplace)) $cArr['nativeplace'] = $nativeplace;
    if(!empty($infotype)) $cArr['infotype'] = $infotype;
    if(!empty($keyword)) $cArr['keyword'] = $keyword;
    include(DEDEINC."/arc.sglistview.class.php");
    $lv = new SgListView($tid,$cArr);
} else {
    include(DEDEINC."/arc.listview.class.php");
    $lv = new ListView($tid);
    //对设置了会员级别的栏目进行处理
    if(isset($lv->Fields['corank']) && $lv->Fields['corank'] > 0)
    {
        require_once(DEDEINC.'/memberlogin.class.php');
        $cfg_ml = new MemberLogin();
        if( $cfg_ml->M_Rank < $lv->Fields['corank'] )
        {
            $dsql->Execute('me' , "SELECT * FROM `#@__arcrank` ");
            while($row = $dsql->GetObject('me'))
            {
                $memberTypes[$row->rank] = $row->membername;
            }
            $memberTypes[0] = "游客或没权限会员";
            $msgtitle = "你没有权限浏览栏目：{$lv->Fields['typename']} ！";
            $moremsg = "这个栏目需要 <font color='red'>".$memberTypes[$lv->Fields['corank']]."</font> 才能访问，你目前是：<font color='red'>".$memberTypes[$cfg_ml->M_Rank]."</font> ！";
            include_once(DEDETEMPLATE.'/plus/view_msg_catalog.htm');
            exit();
        }
    }
}

if($lv->IsError) ParamError();

$lv->Display();
