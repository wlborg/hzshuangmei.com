<?php  if(!defined('DEDEINC')) exit('dedecms');
/**
 * 文档小助手
 *
 * @version        $Id: archive.helper.php 2 23:00 2010年7月5日Z tianya $
 * @package        DedeCMS.Helpers
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           http://www.dedecms.com
 */

/**
 *  获取单篇文档信息
 *
 * @param     int  $aid  文档id
 * @return    array
 */
if ( ! function_exists('GetOneArchive'))
{
    function GetOneArchive($aid)
    {
        global $dsql;
        include_once(DEDEINC."/channelunit.func.php");
        $aid = trim(preg_replace('/[^0-9]/', '', $aid));
        $reArr = array();

        $chRow = $dsql->GetOne("SELECT arc.*,ch.maintable,ch.addtable,ch.issystem FROM `#@__arctiny` arc LEFT JOIN `#@__channeltype` ch ON ch.id=arc.channel WHERE arc.id='$aid' ");

        if(!is_array($chRow)) {
            return $reArr;
        }
        else {
            if(empty($chRow['maintable'])) $chRow['maintable'] = '#@__archives';
        }

        if($chRow['issystem']!=-1)
        {
            $nquery = " SELECT arc.*,tp.typedir,tp.topid,tp.namerule,tp.moresite,tp.siteurl,tp.sitepath
                        FROM `{$chRow['maintable']}` arc LEFT JOIN `#@__arctype` tp ON tp.id=arc.typeid
                        WHERE arc.id='$aid' ";
        }
        else
        {
            $nquery = " SELECT arc.*,1 AS ismake,0 AS money,'' AS filename,tp.typedir,tp.topid,tp.namerule,tp.moresite,tp.siteurl,tp.sitepath
                        FROM `{$chRow['addtable']}` arc LEFT JOIN `#@__arctype` tp ON tp.id=arc.typeid
                        WHERE arc.aid='$aid' ";
        }

        $arcRow = $dsql->GetOne($nquery);

        if(!is_array($arcRow)) {
            return $reArr;
        }

        if(!isset($arcRow['description'])) {
            $arcRow['description'] = '';
        }

        if(empty($arcRow['description']) && isset($arcRow['body'])) {
            $arcRow['description'] = cn_substr(html2text($arcRow['body']), 250);
        }

        if(!isset($arcRow['pubdate'])) {
            $arcRow['pubdate'] = $arcRow['senddate'];
        }

        if(!isset($arcRow['notpost'])) {
            $arcRow['notpost'] = 0;
        }

        $reArr = $arcRow;
        $reArr['aid']    = $aid;
        $reArr['topid']  = $arcRow['topid'];
        $reArr['arctitle'] = $arcRow['title'];
        $reArr['arcurl'] = GetFileUrl($aid, $arcRow['typeid'], $arcRow['senddate'], $reArr['title'],
                          $arcRow['ismake'], $arcRow['arcrank'], $arcRow['namerule'], $arcRow['typedir'],
                          $arcRow['money'], $arcRow['filename'], $arcRow['moresite'], $arcRow['siteurl'],
                          $arcRow['sitepath']);
        return $reArr;

    }
}


/**
 *  获取模型的表信息
 *
 * @param     int   $id  模型ID
 * @param     string   $formtype  表单类型
 * @return    array
 */
if ( ! function_exists('GetChannelTable'))
{
    function GetChannelTable($id,$formtype='channel')
    {
        global $dsql;
        if($formtype == 'archive')
        {
            $query = "SELECT ch.maintable, ch.addtable FROM #@__arctiny tin LEFT JOIN #@__channeltype ch ON ch.id=tin.channel WHERE tin.id='$id'";
        }
        else if($formtype == 'typeid')
        {
            $query = "SELECT ch.maintable, ch.addtable FROM #@__arctype act LEFT JOIN #@__channeltype ch ON ch.id=act.channeltype WHERE act.id='$id'";
        }
        else
        {
            $query = "SELECT maintable, addtable FROM #@__channeltype WHERE id='$id'";
        }
        $row = $dsql->GetOne($query);
        return $row;
    }
}

/**
 *  获得某文档的所有tag
 *
 * @param     int     $aid  文档id
 * @return    string
 */
if ( ! function_exists('GetTags'))
{
    function GetTags($aid)
    {
        global $dsql;
        $tags = '';
        $query = "SELECT tag FROM `#@__taglist` WHERE aid='$aid' ";
        $dsql->Execute('tag',$query);
        while($row = $dsql->GetArray('tag'))
        {
            $tags .= ($tags=='' ? $row['tag'] : ','.$row['tag']);
        }
        return $tags;
    }
}

/**
 *  获取一个微表的索引键
 *
 * @access    public
 * @param     string  $arcrank  权限值
 * @param     int  $typeid  栏目ID
 * @param     int  $sortrank  排序ID
 * @param     int  $channelid  模型ID
 * @param     int  $senddate  发布日期
 * @param     int  $mid  会员ID
 * @return    int
 */
if ( ! function_exists('GetIndexKey'))
{
    function GetIndexKey($arcrank, $typeid, $sortrank=0, $channelid=1, $senddate=0, $mid=1)
    {
        global $dsql,$senddate,$typeid2;
        if(empty($typeid2)) $typeid2 = 0;
        if(empty($senddate)) $senddate = time();
        if(empty($sortrank)) $sortrank = $senddate;
		$typeid2 = intval($typeid2);
		$senddate = intval($senddate);
        $iquery = "
          INSERT INTO `#@__arctiny` (`arcrank`,`typeid`,`typeid2`,`channel`,`senddate`, `sortrank`, `mid`)
          VALUES ('$arcrank','$typeid','$typeid2' , '$channelid','$senddate', '$sortrank', '$mid') ";
        $dsql->ExecuteNoneQuery($iquery);
        $aid = $dsql->GetLastID();
        return $aid;
    }
}


/**
 *  更新微表key及Tag
 *
 * @access    public
 * @param     int  $id  文档ID
 * @param     string  $arcrank  权限值
 * @param     int  $typeid  栏目ID
 * @param     int  $sortrank  排序ID
 * @param     string  $tags  tag标签
 * @return    string
 */
if ( ! function_exists('UpIndexKey'))
{
    function UpIndexKey($id, $arcrank, $typeid, $sortrank=0, $tags='')
    {
        global $dsql,$typeid2;
        if(empty($typeid2)) $typeid2 = 0;
        $addtime = time();
        $query = " UPDATE `#@__arctiny` SET `arcrank`='$arcrank', `typeid`='$typeid', `typeid2`='$typeid2', `sortrank`='$sortrank' WHERE id = '$id' ";
        $dsql->ExecuteNoneQuery($query);

        /*
        * 处理修改后的Tag
        */
        if($tags!='')
        {
            $oldtag = GetTags($id);
            $oldtags = explode(',',$oldtag);
            $tagss = explode(',',$tags);
            foreach($tagss as $tag)
            {
                $tag = trim($tag);
                if(isset($tag[255]) || $tag!=stripslashes($tag))
                {
                    continue;
                }
                if(!in_array($tag,$oldtags))
                {
                    InsertOneTag($tag,$id);
                }
            }
            foreach($oldtags as $tag)
            {
                if(!in_array($tag,$tagss))
                {
                    $dsql->ExecuteNoneQuery("DELETE FROM `#@__taglist` WHERE aid='$id' AND tag LIKE '$tag' ");
                    $dsql->ExecuteNoneQuery("UPDATE `#@__tagindex` SET total=total-1 WHERE tag LIKE '$tag' ");
                }
                else
                {
                    $dsql->ExecuteNoneQuery("UPDATE `#@__taglist` SET `arcrank` = '$arcrank', `typeid` = '$typeid' WHERE tag LIKE '$tag' ");
                }
            }
        }
    }
}


/**
 *  插入Tags
 *
 * @access    public
 * @param     string  $tag  tag标签
 * @param     int  $aid  文档AID
 * @return    void
 */
if ( ! function_exists('InsertTags'))
{
    function InsertTags($tag, $aid)
    {
        $tags = explode(',',$tag);
        foreach($tags as $tag)
        {
            $tag = trim($tag);
            if(isset($tag[20]) || $tag!=stripslashes($tag))
            {
                continue;
            }
            InsertOneTag($tag,$aid);
        }
    }
}


/**
 *  插入一个tag
 *
 * @access    public
 * @param     string  $tag  标签
 * @param     int  $aid  文档AID
 * @return    void
 */
if ( ! function_exists('InsertOneTag'))
{
    function InsertOneTag($tag, $aid)
    {
        global $typeid,$arcrank,$dsql;
        $tag = trim($tag);
        if($tag == '')
        {
            return '';
        }
        if(empty($typeid))
        {
            $typeid = 0;
        }
        if(empty($arcrank))
        {
            $arcrank = 0;
        }
        $rs = false;
        $addtime = time();
        $row = $dsql->GetOne("SELECT * FROM `#@__tagindex` WHERE tag LIKE '$tag' ");
        if(!is_array($row))
        {
            $rs = $dsql->ExecuteNoneQuery(" INSERT INTO `#@__tagindex`(`tag`,`typeid`,`count`,`total`,`weekcc`,`monthcc`,`weekup`,`monthup`,`addtime`) VALUES('$tag','$typeid','0','1','0','0','$addtime','$addtime','$addtime'); ");
            $tid = $dsql->GetLastID();
        }
        else
        {
            $rs = $dsql->ExecuteNoneQuery(" UPDATE `#@__tagindex` SET total=total+1,addtime=$addtime WHERE tag LIKE '$tag' ");
            $tid = $row['id'];
        }
        if($rs)
        {
            $dsql->ExecuteNoneQuery("INSERT INTO `#@__taglist`(`tid`,`aid`,`arcrank`,`typeid` , `tag`) VALUES('$tid','$aid','$arcrank','$typeid' , '$tag'); ");
        }
    }
}
//资讯列表页读取每条资讯的tag
function GetTags_list($aid)

    {

        global $dsql;

        $tags = '';

        $query = "SELECT tag FROM `sm_taglist` WHERE aid='$aid' limit 6";

        $dsql->Execute('tag',$query);

        while($row = $dsql->GetArray('tag'))

        {

            $tags .= ($tags=='' ? "<a href='/tags.php?/".urlencode($row['tag'])."'  target='_blank'>".$row['tag']."</a>" : ' '."<a href='/tags.php?/".urlencode($row['tag'])."' target='_blank'>".$row['tag']."</a>");



        }

        return $tags;

    }
    //资讯列表页读取每条资讯的tag
function GetTags_list_typeid($typeid)

    {
        global $dsql;
        $relatetypeid = 0;
        $tags = '';
        switch ($typeid)
        {
        case 222:
        $relatetypeid= '222';
        break;
        case 90:
        $relatetypeid= '92,93,94,95,96,97,99,100,101,102,103,104,105,106,107,109,110,111,112,113,114,116,117,118,119,120,121,123,124,125,127,128,129,130,131,132,133,134,135,137,138';
        break;
        case 91:
        $relatetypeid= '92,93,94,95,96,97';
        break;
        case 98:
        $relatetypeid= '99,100,101,102,103,104,105,106,107';
        break;
        case 108:
        $relatetypeid= '109,110,111,112,113,114';
        break;
        case 115:
        $relatetypeid= '116,117,118,119,120,121 ';
        break;
        case 122:
        $relatetypeid= '123,124,125';
        break;
        case 126:
        $relatetypeid= '127,128,129,130,131,132,133,134,135';
        break;
        case 136:
        $relatetypeid= '137,138';
        break;
        case 140:
        $relatetypeid= '142,143,144,145,146,148,149,150,151,152,154,155,156,158,159,160,161,162,164,165,167,168,224,225,170,171,172';
        break;
        case 141:
        $relatetypeid= '142,143,144,145,146';
        break;
        case 147:
        $relatetypeid= '148,149,150,151,152';
        break;
        case 153:
        $relatetypeid= '154,155,156';
        break;
        case 157:
        $relatetypeid= '158,159,160,161,162';
        break;
        case 163:
        $relatetypeid= '164,165';
        break;
        case 166:
        $relatetypeid= '167,168,224,225';
        break;
        case 169:
        $relatetypeid= '170,171,172';
        break;
        case 173:
        $relatetypeid= '175,176,177,178,179,180,182,183,184,185';
        break;
        case 174:
        $relatetypeid= '175,176,177,178,179,180';
        break;
        case 181:
        $relatetypeid= '182,183,184,185';
        break;
        case 186:
        $relatetypeid= '188,189,223,226,191,192,193,195,196,227,198,199,228';
        break;
        case 187:
        $relatetypeid= '188,189,223';
        break;
        case 190:
        $relatetypeid= '226,191,192,193';
        break;
        case 194:
        $relatetypeid= '195,196,227';
        break;
        case 197:
        $relatetypeid= '198,199,228';
        break;
        case 200:
        $relatetypeid= '202,203,204,205,229,207,208,209,211,212,213,215,216,217,218';
        break;
        case 201:
        $relatetypeid= '202,203,204,205,229';
        break;
        case 206:
        $relatetypeid= '207,208,209';
        break;
        case 210:
        $relatetypeid= '211,212,213';
        break;
        case 214:
        $relatetypeid= '215,216,217,218';
        break;
        case 219:
        $relatetypeid= '220,221';
        break;
        default:
        $relatetypeid= '92,93,94,95,96,97,99,100,101,102,103,104,105,106,107,109,110,111,112,113,114,116,117,118,119,120,121,123,124,125,127,128,129,130,131,132,133,134,135,137,138';
        }
        $query = "SELECT tag FROM `sm_taglist` WHERE typeid in ($relatetypeid) limit 24";
        $dsql->Execute('tag',$query);
        while($row = $dsql->GetArray('tag'))

        {

            $tags .= ($tags=='' ? "<li><a href='/tags.php?/".urlencode($row['tag'])."'  target='_blank'><span>?</span><span>".$row['tag']."</span></a></li>" : ' '."<li><a href='/tags.php?/".urlencode($row['tag'])."' target='_blank'><span>?</span><span>".$row['tag']."</span></a></li>");
        }

        return $tags;

    }
 //资讯列表导航顶部tag读取整形栏目中2条
function GetTags_nav_typeid_zx2($id)

    {

        global $dsql;

        $tags = '';

        $query = "SELECT tag FROM `sm_taglist` WHERE typeid in (92,93,94,95,96,97,100,101,102,103,104,105,106,107) and typeid not in (76,77,78,79,80,81,82,83,84,85,86,87) limit 2";

        $dsql->Execute('tag',$query);

        while($row = $dsql->GetArray('tag'))

        {

            $tags .= ($tags=='' ? "<span><a href='/tags.php?/".urlencode($row['tag'])."'  target='_blank'>".$row['tag']."</a></span>" : ' '."<span><a href='/tags.php?/".urlencode($row['tag'])."' target='_blank'>".$row['tag']."</a></span>");



        }

        return $tags;

    }

 //资讯列表导航顶部tag读取激光栏目中2条
function GetTags_nav_typeid_jg2($id)

    {

        global $dsql;

        $tags = '';

        $query = "SELECT tag FROM `sm_taglist` WHERE typeid in (144,146,149,150,151,154,155,156,159,160,161,162,165,168,224,225,170,171) and typeid not in (76,77,78,79,80,81,82,83,84,85,86,87) limit 2";

        $dsql->Execute('tag',$query);

        while($row = $dsql->GetArray('tag'))

        {

            $tags .= ($tags=='' ? "<span><a href='/tags.php?/".urlencode($row['tag'])."'  target='_blank'>".$row['tag']."</a></span>" : ' '."<span><a href='/tags.php?/".urlencode($row['tag'])."' target='_blank'>".$row['tag']."</a></span>");



        }

        return $tags;

    }
//资讯列表导航顶部tag读取生活栏目中2条
function GetTags_nav_typeid_sh2($id)

    {

        global $dsql;

        $tags = '';

        $query = "SELECT tag FROM `sm_taglist` WHERE typeid in (208,209,212,216,218) and typeid not in (76,77,78,79,80,81,82,83,84,85,86,87) limit 2";

        $dsql->Execute('tag',$query);

        while($row = $dsql->GetArray('tag'))

        {

            $tags .= ($tags=='' ? "<span><a href='/tags.php?/".urlencode($row['tag'])."'  target='_blank'>".$row['tag']."</a></span>" : ' '."<span><a href='/tags.php?/".urlencode($row['tag'])."' target='_blank'>".$row['tag']."</a></span>");



        }

        return $tags;

    }
//资讯列表导航顶部tag读取纹绣栏目中2条
function GetTags_nav_typeid_wx2($id)

    {

        global $dsql;

        $tags = '';

        $query = "SELECT tag FROM `sm_taglist` WHERE typeid in (188,189,223,226,191,192,193,198,199) and typeid not in (76,77,78,79,80,81,82,83,84,85,86,87) limit 2";

        $dsql->Execute('tag',$query);

        while($row = $dsql->GetArray('tag'))

        {

            $tags .= ($tags=='' ? "<span><a href='/tags.php?/".urlencode($row['tag'])."'  target='_blank'>".$row['tag']."</a></span>" : ' '."<span><a href='/tags.php?/".urlencode($row['tag'])."' target='_blank'>".$row['tag']."</a></span>");



        }

        return $tags;

    }
