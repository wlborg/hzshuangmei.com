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
function replaceurl($newurl)
{
$newurl=str_replace('/uploads/','//uploads.hzshuangmei.com/',$newurl);
return $newurl;
}
function getdoctorthumb($id)
{
global $thumb,$dsql;
$row = $dsql->GetOne("SELECT a.thumb FROM #@__addondoctors AS a
where a.aid='$id'");
$thumb=replaceurl($row['thumb']);
return $thumb;
}
function getdoctorzhiwei($id)
{
global $zhiwei,$dsql;
$row = $dsql->GetOne("SELECT a.zhiwei FROM #@__addondoctors AS a
where a.aid='$id'");
$zhiwei=replaceurl($row['zhiwei']);
return $zhiwei;
}
function getdoctorshanchang($id)
{
global $shanchang,$dsql;

$row = $dsql->GetOne("SELECT a.shanchang FROM #@__addondoctors AS a
where a.aid='$id'");
$shanchang=replaceurl($row['shanchang']);
return $shanchang;
}
function getcaseimgafter($id)
{
global $imgafter,$dsql;

$row = $dsql->GetOne("SELECT a.imgafter FROM #@__addoncase AS a
where a.aid='$id'");
$imgafter=replaceurl($row['imgafter']);
return $imgafter;
}
function getcaseimgbefore($id)
{
global $imgbefore,$dsql;

$row = $dsql->GetOne("SELECT a.imgbefore FROM #@__addoncase AS a
where a.aid='$id'");
$imgbefore=replaceurl($row['imgbefore']);
return $imgbefore;
}
function getcasenote($id)
{
global $note,$dsql;

$row = $dsql->GetOne("SELECT a.note FROM #@__addoncase AS a
where a.aid='$id'");
$note=$row['note'];
return $note;
}
function getcaseproject($id)
{
global $project,$dsql;

$row = $dsql->GetOne("SELECT a.project FROM #@__addoncase AS a
where a.aid='$id'");
$project=$row['project'];
return $project;
}
function getrelatecase($typeid)
{
global $dsql;
$relatecase="";
$relatetypeid = 0;
$indicators="";
$list="";
$counter=0;
switch ($typeid)
{
case 14:
$relatetypeid= 35;
break;
case 15:
$relatetypeid= 36;
break;
case 24:
$relatetypeid= 46;
break;
case 25:
$relatetypeid= 47;
break;
case 26:
$relatetypeid= 48;
break;
case 17:
$relatetypeid= 38;
break;
case 18:
$relatetypeid= 39;
break;
case 19:
$relatetypeid= 40;
break;
case 20:
$relatetypeid= 41;
break;
case 27:
$relatetypeid= 49;
break;
case 28:
$relatetypeid= 50;
break;
case 29:
$relatetypeid= 51;
break;
case 30:
$relatetypeid= 52;
break;
case 31:
$relatetypeid= 53;
break;
case 32:
$relatetypeid= 54;
break;
case 33:
$relatetypeid= 55;
break;
case 22:
$relatetypeid= 43;
break;
case 23:
$relatetypeid= 44;
break;
case 34:
$relatetypeid= 45;
break;
default:
$relatetypeid= 35;
}
$dsql->SetQuery( "SELECT * FROM #@__archives AS a,#@__addoncase AS b
where a.id =b.aid and a.typeid='$relatetypeid' order by rand() limit 4 ");
$dsql->Execute();
$ns = $dsql->GetTotalRow();
while($row=$dsql->GetArray())

{
$id = $row["id"];
$title = cn_substr($row["title"],80,0);
$urlarray = GetOneArchive($id);
$url = $urlarray['arcurl'];
$imgbefore = replaceurl($row["imgbefore"]);
$imgafter = replaceurl($row["imgafter"]);
$project=$row["project"];
if($counter == 0){
$indicators.='<li data-target="#slidecase" data-slide-to="'.$counter.'" class="active"></li>' ;
$list.= '
<div class="item active" >
  <div class="left">
    <p class="name"><a href=" '.$url.' ">'.$title.'</a></p>
    <p class="pro"><span class="icon">塑美项目</span>'.$project.'</p>
    <div class="before">
      <a href="'.$url.'"><img src="'.$imgbefore.'" alt="术前"></a>
      <p class="info">术前</p>
      <span class="angle"></span>
    </div>
  </div>
  <div class="right">
    <div class="after">
      <a href="'.$url.'"><img src="'.$imgafter.'" alt="'.$title.'"></a>
      <p class="info">术后</p>
      <a href="javascript:void(0)" class="consult j-consult">立即<br>咨询</a>
    </div>
  </div>
</div>';
}else{
$indicators.='<li data-target="#slidecase" data-slide-to="'.$counter.'" ></li>' ;
$list.= '
<div class="item " >
  <div class="left">
    <p class="name"><a href=" '.$url.' ">'.$title.'</a></p>
    <p class="pro"><span class="icon">塑美项目</span>'.$project.'</p>
    <div class="before">
      <a href="'.$url.'"><img src="'.$imgbefore.'" alt="术前"></a>
      <p class="info">术前</p>
      <span class="angle"></span>
    </div>
  </div>
  <div class="right">
    <div class="after">
      <a href="'.$url.'"><img src="'.$imgafter.'" alt="'.$title.'"></a>
      <p class="info">术后</p>
      <a href="javascript:void(0)" class="consult j-consult">立即<br>咨询</a>
    </div>
  </div>
</div>';
}
$counter=$counter+1;

}
$relatecase.= ' <ol class="carousel-indicators">
  '.$indicators.'
</ol>'
.'<div class="carousel-inner" role="listbox"> '
  . $list
.'</div>';

return $relatecase;
}
function getrelateproject($typeid)
{
global $dsql;
$relateproject="";
$relatetypeid = 0;
switch ($typeid)
{
case 35 :
$relatetypeid= 14;
break;
case 36 :
$relatetypeid=15 ;
break;
case 46:
$relatetypeid=  24;
break;
case 47:
$relatetypeid=  25;
break;
case 48:
$relatetypeid=  26;
break;
case 38 :
$relatetypeid= 17;
break;
case 39 :
$relatetypeid= 18;
break;
case  40 :
$relatetypeid= 19;
break;
case 41 :
$relatetypeid=20;
break;
case 49 :
$relatetypeid=27 ;
break;
case 50 :
$relatetypeid= 28;
break;
case 51 :
$relatetypeid= 29;
break;
case 52 :
$relatetypeid= 30;
break;
case 53 :
$relatetypeid=31 ;
break;
case  54 :
$relatetypeid= 32;
break;
case  55 :
$relatetypeid=33 ;
break;
case 43 :
$relatetypeid=22 ;
break;
case 44:
$relatetypeid=  23;
break;
case 45 :
$relatetypeid= 34 ;
break;
default:
$relatetypeid= 14 ;
}
$dsql->SetQuery( "SELECT  * FROM #@__archives AS a
where  a.typeid='$relatetypeid' order by rand() limit 4 ");
$dsql->Execute();
$ns = $dsql->GetTotalRow();
while($row=$dsql->GetArray())
{
$id = $row["id"];
$title = cn_substr($row["title"],80,0);
$urlarray = GetOneArchive($id);
$url = $urlarray['arcurl'];
$litpic = replaceurl($row["litpic"]);
$relateproject.='<a href="'.$url.'"><img src="'.$litpic.'" alt="'.$title.'"></a>';
}
return $relateproject;
}