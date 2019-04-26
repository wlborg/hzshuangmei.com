 <?php
if(!defined('DEDEINC')) exit('Request Error!');
  
function lib_randomartlist(&$ctag, &$refObj)
{
    global $dsql;
    //属性处理
     //topid 指定顶级树 id ，指定后，前一个属性将无效
    $attlist="typeid|0,showall|,currentstyle|,cacheid|";
    FillAttsDefault($ctag->CAttribute->Items,$attlist);
    extract($ctag->CAttribute->Items, EXTR_SKIP);
    $revalue = '';
    //读取固定的缓存块
    $cacheid = trim($cacheid);
    if($cacheid !='') {
        $revalue = GetCacheBlock($cacheid);
        if($revalue != '') return $revalue;
    }
    //如果属性里没指定栏目id，从引用类里获取栏目信息
    if(empty($typeid))
    {
        if( isset($refObj->TypeLink->TypeInfos['id']) )
        {
            $typeid = $refObj->TypeLink->TypeInfos['id'];
            $reid = $refObj->TypeLink->TypeInfos['reid'];
            $topid = $refObj->TypeLink->TypeInfos['topid'];
        }
        else {
          $typeid = 0;
      }
    }
    else
    {
  
        $row2 = $dsql->GetOne("SELECT reid,topid,channeltype,ispart FROM `#@__arctype` WHERE reid='$topid' ");
        if(!is_array($row2))
        {
            $typeid = $reid = $topid = $channeltype = $ispart = 0;
        } else {
            $reid = $row2['reid'];
            $channeltype = $row2['channeltype'];
            $ispart = $row2['ispart'];
            $typepid = $row2['id'];
        }
    }
    //调用Typeid
    if( !empty($topid) )
    {
        $topQuery = "SELECT id,typename,typedir,isdefault,ispart,defaultname,namerule2,moresite,siteurl,sitepath FROM `#@__arctype` WHERE reid='$topid' And ishidden<>1 order by sortrank asc";
    }
  $dsql->Execute('t', $topQuery);
  while($row = $dsql->GetArray('t'))
  {
      $row['typelink'] = GetOneTypeUrlA($row);
      //处理同级栏目中，当前栏目的样式
                if( $row['id']==$typeid  && $currentstyle!='' )
                {
                    $linkOkstr = $currentstyle;
                    $linkOkstr = str_replace("~rel~",$row['rel'],$linkOkstr);
                    $linkOkstr = str_replace("~id~",$row['id'],$linkOkstr);
                    $linkOkstr = str_replace("~typelink~",$row['typelink'],$linkOkstr);
                    $linkOkstr = str_replace("~typename~",$row['typename'],$linkOkstr);
                    $revalue .= $linkOkstr;
                }
                else
                {
                  $revalue .= "    <li><a href='{$row['typelink']}'>{$row['typename']}</a></li>\n";
                }
    randomartlistSon($row['id'],$typeid,$currentstyle, $revalue);
  }
  if($cacheid !='') {
        WriteCacheBlock($cacheid, $revalue);
  }
    return $revalue;
}
  
function randomartlistSon($id,$typeid,$currentstyle,&$revalue)
{
    global $dsql;
    $query = "SELECT id,typename,typedir,isdefault,ispart,defaultname,namerule2,moresite,siteurl,sitepath FROM `#@__arctype` WHERE reid='{$id}' And ishidden<>1 order by sortrank asc";
    $dsql->Execute($id, $query);
    $thisv = '';
  while($row = $dsql->GetArray($id))
  {
      $row['typelink'] = GetOneTypeUrlA($row);
      //处理同级栏目中，当前栏目的样式
                if( $row['id']==$typeid  && $currentstyle!='' )
                {
                    $linkOkstr = $currentstyle;
                    $linkOkstr = str_replace("~rel~",$row['rel'],$linkOkstr);
                    $linkOkstr = str_replace("~id~",$row['id'],$linkOkstr);
                    $linkOkstr = str_replace("~typelink~",$row['typelink'],$linkOkstr);
                    $linkOkstr = str_replace("~typename~",$row['typename'],$linkOkstr);
                    $thisv .= $linkOkstr;
                }
                else
                {
                  $thisv .= "    <li><a href='{$row['typelink']}'>{$row['typename']}</a></li>\n";
                }
  
    randomartlistSon($row['id'],$typeid,$currentstyle, $thisv);
  }
  if($thisv!='') $revalue .= "    <ul>\n$thisv    </ul>\n";
}