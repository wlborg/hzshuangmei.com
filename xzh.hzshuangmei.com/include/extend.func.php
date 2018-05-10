<?php
function litimgurls($imgid=0)
{
    global $lit_imglist,$dsql;
    //获取附加表
    $row = $dsql->GetOne("SELECT c.addtable FROM #@__archives AS a LEFT JOIN #@__channeltype AS c 
                                                            ON a.channel=c.id where a.id='$imgid'");
    $addtable = trim($row['addtable']);
    
    //获取图片附加表imgurls字段内容进行处理
    $row = $dsql->GetOne("Select imgurls From `$addtable` where aid='$imgid'");
    
    //调用inc_channel_unit.php中ChannelUnit类
    $ChannelUnit = new ChannelUnit(2,$imgid);
    
    //调用ChannelUnit类中GetlitImgLinks方法处理缩略图
    $lit_imglist = $ChannelUnit->GetlitImgLinks($row['imgurls']);
    
    //返回结果
    return $lit_imglist;
}
/**
*  获取博客文章页推荐文章
*  根据当前栏目的ID，获取项目里对应栏目数据
* @param     $typeid    所在栏目ID
*/
function getCaseArticleRelateProjectXZH($typeid)
{
global $dsql;
$relateproject="";
$relatetypeid = 0;
switch ($typeid)
{
case 78 :
$relatetypeid= 14;
break;
case 77 :
$relatetypeid=15 ;
break;
case 79:
$relatetypeid=25;
break;
case 80:
$relatetypeid=  17;
break;
case 81:
$relatetypeid=  18;
break;
case 82 :
$relatetypeid= 19;
break;
case 83 :
$relatetypeid= 20;
break;
case 85 :
$relatetypeid= '22,23,34';
break;
case  86 :
$relatetypeid= '27,28,29,30,31,32,33';
break;
default:
$relatetypeid= 14 ;

}
$dsql->SetQuery( "SELECT  * FROM #@__archives AS a
where  a.typeid='$relatetypeid'  and a.arcrank=0 order by rand() limit 4 ");
$dsql->Execute();
$ns = $dsql->GetTotalRow();
while($row=$dsql->GetArray())
{
$id = $row["id"];
$title = cn_substr($row["title"],80,0);
$urlarray = GetOneArchive($id);
$url = $urlarray['arcurl'];

$litpic =replaceurl($row["litpic"]);
$relateproject.='<li><a href="https://www.hzshuangmei.com'.$url.'" target="_blank"><span class="thumbnail"><img src="'.$litpic.'" alt="'.$title.'"></span>'.$title.'</a></li>';
}
if($ns>0){
$relateproject=$relateproject;
}
return $relateproject;
}

//后台上传图片链接处理
function replaceurl($newurl)
{
$newurl=str_replace('/uploads/','https://uploads.hzshuangmei.com/',$newurl);
return $newurl;
}
/**
*  获取博客文章页最新文章
*  根据当前栏目的ID，获取相关的专家
* @param     $typeid    所在栏目ID
*/
function getCaseArticleDoctorXZH($typeid)
{
global $dsql;
$relateproject="";
$relatetypeid = 0;
switch ($typeid)
{
case 78 :
$relatetypeid= 3;
break;
case 77 :
$relatetypeid=3 ;
break;
case 79:
$relatetypeid=3;
break;
case 80:
$relatetypeid=3;
break;
case 81:
$relatetypeid=3;
break;
case 82 :
$relatetypeid= 3;
break;
case 83 :
$relatetypeid= 5;
break;
case 85 :
$relatetypeid= 4;
break;
case  86 :
$relatetypeid=7;
break;
default:
$relatetypeid=3 ;

}
$dsql->SetQuery( "SELECT  * FROM #@__archives AS a
where  a.typeid='$relatetypeid'  and a.arcrank=0 order by desc limit 2 ");
$dsql->Execute();
$ns = $dsql->GetTotalRow();
while($row=$dsql->GetArray())
{
$id = $row["id"];
$title = cn_substr($row["title"],80,0);
$urlarray = GetOneArchive($id);
$url = $urlarray['arcurl'];

$litpic =replaceurl($row["litpic"]);
$relateproject.='<li><a href="https://www.hzshuangmei.com'.$url.'" target="_blank"><span class="thumbnail"><img src="'.$litpic.'" alt="'.$title.'"></span>'.$title.'</a></li>';
}
if($ns>0){
$relateproject=$relateproject;
}
return $relateproject;
}
