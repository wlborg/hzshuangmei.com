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
$newurl=str_replace('/uploads/','https://uploads.hzshuangmei.com/',$newurl);
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
function getProjectListRelateCase($typeid)
{
global $dsql;
$relatecase="";
$relatetypeid = "";
$indicators="";
$list="";
$counter=0;
switch ($typeid)
{
case 14:
$relatetypeid= '35';
break;
case 15:
$relatetypeid= '36';
break;
case 24:
$relatetypeid= '46,47,48';
break;
case 25:
$relatetypeid= '46,47,48,';
break;
case 26:
$relatetypeid= '46,47,48,';
break;
case 17:
$relatetypeid= '38';
break;
case 18:
$relatetypeid= '39';
break;
case 19:
$relatetypeid= '40';
break;
case 20:
$relatetypeid= '41';
break;
case 27:
$relatetypeid= '49,50,51,52,53,54,55';
break;
case 28:
$relatetypeid= '49,50,51,52,53,54,55';
break;
case 29:
$relatetypeid= '49,50,51,52,53,54,55';
break;
case 30:
$relatetypeid= '49,50,51,52,53,54,55';
break;
case 31:
$relatetypeid= '49,50,51,52,53,54,55';
break;
case 32:
$relatetypeid= '49,50,51,52,53,54,55';
break;
case 33:
$relatetypeid= '49,50,51,52,53,54,55';
break;
case 22:
$relatetypeid= '43';
break;
case 23:
$relatetypeid= '44';
break;
case 34:
$relatetypeid= '45';
break;
default:
$relatetypeid= '35';
}
$dsql->SetQuery( "SELECT * FROM #@__archives AS a,#@__addoncase AS b
where a.id =b.aid and a.typeid in ( $relatetypeid ) and a.arcrank=0 order by rand() limit 4 ");
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
      <a href="javascript:void(0)" class="consult j-consult" rel="nofollow">立即<br>咨询</a>
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
      <a href="javascript:void(0)" class="consult j-consult" rel="nofollow">立即<br>咨询</a>
    </div>
  </div>
</div>';
}
$counter=$counter+1;

}
if($ns>0){
$relatecase.= '<div id="slidecase" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    '.$indicators.'
  </ol>'
  .'<div class="carousel-inner" role="listbox"> '
    . $list
  .'</div>
</div>';
}

return $relatecase;
}
function getCaseArticleRelateCase($id)
{
global $dsql;
$typeid=0;
$relatecase="";
$relatetypeid = "";
$indicators="";
$list="";
$counter=0;
$row = $dsql->GetOne("SELECT * FROM #@__archives
where id='$id'");
$typeid=$row['typeid'];
$dsql->SetQuery( "SELECT * FROM #@__archives AS a,#@__addoncase AS b
where a.id =b.aid and a.typeid='$typeid' and a.id <> '$id' and a.arcrank=0  order by rand() limit 4 ");
$dsql->Execute();
$ns = $dsql->GetTotalRow();
while($row=$dsql->GetArray())
{
$id = $row["id"];
$urlarray = GetOneArchive($id);
$url = $urlarray['arcurl'];
$imgbefore = replaceurl($row["imgbefore"]);
$imgafter = replaceurl($row["imgafter"]);
$project=$row["project"];
$click=$row["click"];
if($counter == 0){
$indicators.='<li data-target="#articleslidecase" data-slide-to="'.$counter.'" class="active"></li>' ;
$list.= '
<div class="item active" >
  <div class="pic f-cb">
    <div class="before ">
      <a href="'.$url.'"><img src="'.$imgbefore.'" alt="术前"></a>
      <div class="flag">
        术前
      </div>
    </div>
    <div class="after">
      <a href="'.$url.'"><img src="'.$imgafter.'" alt="术后"></a>
      <div class="flag">
        术后
      </div>
    </div>
  </div>
  <div class="label f-cb">
    <span class="pro">'.$project.'</span>
    <div class="right">
      <a href="'.$url.'"><span class="show"></span></a>
      <span class="click">'.$click.'</span>
    </div>
  </div>
</div>';
}else{
$indicators.='<li data-target="#articleslidecase" data-slide-to="'.$counter.'" ></li>' ;
$list.= '
<div class="item " >
  <div class="pic f-cb">
    <div class="before ">
      <a href="'.$url.'"><img src="'.$imgbefore.'" alt="术前"></a>
      <div class="flag">
        术前
      </div>
    </div>
    <div class="after">
      <a href="'.$url.'"><img src="'.$imgafter.'" alt="术后"></a>
      <div class="flag">
        术后
      </div>
    </div>
  </div>
  <div class="label f-cb">
    <span class="pro">'.$project.'</span>
    <div class="right">
      <a href="'.$url.'"><span class="show"></span></a>
      <span class="click">'.$click.'</span>
    </div>
  </div>
</div>';
}
$counter=$counter+1;
}
if($ns>0){
$relatecase.= '  <div id="articleslidecase" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    '.$indicators.'
  </ol>'
  .'<div class="carousel-inner" role="listbox"> '
    . $list
  .'</div>
</div>';
}
return  $relatecase;
}

/**
*  获取案例相关的医生
*  根据当前项目专题的ID，获取相关的项目
* @param     $typeid  案例栏目iD
*/
function getCaseArticleRelateDoctor($typeid)
{
global $dsql;
$relatedoctor="";
$relatetypeid = 0;
$indicators="";
$list="";
$counter=0;
switch ($typeid)
{
case 35 :
$relatetypeid= 3;
break;
case 36 :
$relatetypeid=3 ;
break;
case 46:
$relatetypeid= 3;
break;
case 47:
$relatetypeid=  3;
break;
case 48:
$relatetypeid=  3;
break;
case 38 :
$relatetypeid= 3;
break;
case 39 :
$relatetypeid= 3;
break;
case  40 :
$relatetypeid= 3;
break;
case 41 :
$relatetypeid=5;
break;
case 49 :
$relatetypeid=4 ;
break;
case 50 :
$relatetypeid= 4;
break;
case 51 :
$relatetypeid= 4;
break;
case 52 :
$relatetypeid= 4;
break;
case 53 :
$relatetypeid=4 ;
break;
case  54 :
$relatetypeid= 4;
break;
case  55 :
$relatetypeid=4 ;
break;
case 43 :
$relatetypeid=3 ;
break;
case 44:
$relatetypeid=3;
break;
case 45 :
$relatetypeid= 3 ;
break;
default:
$relatetypeid= 3 ;
}
$dsql->SetQuery( "SELECT * FROM #@__archives AS a,#@__addondoctors AS b
where a.id =b.aid and a.typeid='$relatetypeid' and b.aid<>'36' and a.arcrank=0 order by rand() limit 2 ");
$dsql->Execute();
$ns = $dsql->GetTotalRow();
while($row=$dsql->GetArray())
{
$id = $row["id"];
$title = cn_substr($row["title"],80,0);
$urlarray = GetOneArchive($id);
$url = $urlarray['arcurl'];
$thumb = replaceurl($row["thumb"]);
$zhiwei = $row["zhiwei"];
$shanchang = $row["shanchang"];

if($counter == 0){
$indicators.='<li data-target="#articleslidedoctor" data-slide-to="'.$counter.'" class="active"></li>' ;
$list.= '
<div class="item zhuanjia-item active">
  <div class="zhuanjia-thum"> <a href="'.$url.'"><img src="'.$thumb.'" alt="" class=""></a></div>
  <div class="zhuanjia-info">
    <h2 class="zhuanjia-title"><a href="'.$url.'" class="pro-link">'.$title.'</a></h2>
    <p class="zhiwei">'.$zhiwei.'</p>
    <p class="shanchang">擅长项目：'.$shanchang.' </p>
    <a href="'.$url.'" class="zhuanjia-more">了解更多 &nbsp;》</a>
  </div>
</div>';
}else{
$indicators.='<li data-target="#articleslidedoctor" data-slide-to="'.$counter.'" ></li>' ;
$list.= '
<div class="item zhuanjia-item">
  <div class="zhuanjia-thum"> <a href="'.$url.'"><img src="'.$thumb.'" alt="" class=""></a></div>
  <div class="zhuanjia-info">
    <h2 class="zhuanjia-title"><a href="'.$url.'" class="pro-link">'.$title.'</a></h2>
    <p class="zhiwei">'.$zhiwei.'</p>
    <p class="shanchang">擅长项目：'.$shanchang.' </p>
    <a href="'.$url.'" class="zhuanjia-more">了解更多 &nbsp;》</a>
  </div>
</div>';
}
$counter=$counter+1;
}
if($ns>0){
$relatedoctor.= '<div id="articleslidedoctor" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    '.$indicators.'
  </ol>'
  .'<div class="carousel-inner" role="listbox"> '
    . $list
  .'</div>
</div>';
}
return $relatedoctor;
}
function getCaseArticleRelateProject($typeid)
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
where  a.typeid='$relatetypeid' and a.arcrank=0 order by rand() limit 4 ");
$dsql->Execute();
$ns = $dsql->GetTotalRow();

if($ns==0){
  $dsql->SetQuery( "SELECT  * FROM #@__archives AS a
  where  a.typeid in (14,15,16,24,25,26,17,18,19,20,27,28,29,30,31,32,33,22,23,34,61) and a.arcrank=0 order by rand() limit 4 ");
  $dsql->Execute();
  $ns = $dsql->GetTotalRow();
}
while($row=$dsql->GetArray())
{
$id = $row["id"];
$title = cn_substr($row["title"],80,0);
$urlarray = GetOneArchive($id);
$url = $urlarray['arcurl'];
$litpic = replaceurl($row["litpic"]);
$relateproject.='<a href="'.$url.'"><img src="'.$litpic.'" alt="'.$title.'"></a>';
}
if($ns>0){
$relateproject= ' <div class="imgbox">
  '.$relateproject.'
</div> ';
}

return $relateproject;
}
function getDoctorArticleRelateCase($typeid)
{
global $dsql;
$relatecase="";
$relatetypeid = "";
$indicators="";
$list="";
$counter=0;
switch ($typeid)
{
case 3 :
$relatetypeid=  '35,36,46,47,48,38,39,40,43,44,45';
break;
case 4 :
$relatetypeid= '49,50,51,52,53,54,55';
break;
case 5 :     //纹绣师
$relatetypeid= '41';    // 激光项目
break;
default:
$relatetypeid= '35';
}
$dsql->SetQuery( "SELECT * FROM #@__archives AS a,#@__addoncase AS b
where a.id =b.aid and a.typeid in ( $relatetypeid ) and a.arcrank=0  order by rand() limit 4 ");
$dsql->Execute();
$ns = $dsql->GetTotalRow();
while($row=$dsql->GetArray())
{
$id = $row["id"];
$urlarray = GetOneArchive($id);
$url = $urlarray['arcurl'];
$imgbefore = replaceurl($row["imgbefore"]);
$imgafter = replaceurl($row["imgafter"]);
$project=$row["project"];
$click=$row["click"];
if($counter == 0){
$indicators.='<li data-target="#articleslidecase" data-slide-to="'.$counter.'" class="active"></li>' ;
$list.= '
<div class="item active" >
  <div class="pic f-cb">
    <div class="before ">
      <a href="'.$url.'"><img src="'.$imgbefore.'" alt="术前"></a>
      <div class="flag">
        术前
      </div>
    </div>
    <div class="after">
      <a href="'.$url.'"><img src="'.$imgafter.'" alt="术后"></a>
      <div class="flag">
        术后
      </div>
    </div>
  </div>
  <div class="label f-cb">
    <span class="pro">'.$project.'</span>
    <div class="right">
      <a href="'.$url.'"><span class="show"></span></a>
      <span class="click">'.$click.'</span>
    </div>
  </div>
</div>';
}else{
$indicators.='<li data-target="#articleslidecase" data-slide-to="'.$counter.'" ></li>' ;
$list.= '
<div class="item " >
  <div class="pic f-cb">
    <div class="before ">
      <a href="'.$url.'"><img src="'.$imgbefore.'" alt="术前"></a>
      <div class="flag">
        术前
      </div>
    </div>
    <div class="after">
      <a href="'.$url.'"><img src="'.$imgafter.'" alt="术后"></a>
      <div class="flag">
        术后
      </div>
    </div>
  </div>
  <div class="label f-cb">
    <span class="pro">'.$project.'</span>
    <div class="right">
      <a href="'.$url.'"><span class="show"></span></a>
      <span class="click">'.$click.'</span>
    </div>
  </div>
</div>';
}
$counter=$counter+1;
}
if($ns>0){
$relatecase.= '  <div id="articleslidecase" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    '.$indicators.'
  </ol>'
  .'<div class="carousel-inner" role="listbox"> '
    . $list
  .'</div>
</div>';
}
return $relatecase;
}
function getDoctorArticleRelateProject($typeid)
{
global $dsql;
$relateproject="";
$relatetypeid = "";
switch ($typeid)
{
case 3 :
$relatetypeid=  '14,15,24,25,26,17,18,19,22,23,34';
break;
case 4 :
$relatetypeid= '27,28,29,30,31,32,33';
break;
case 5 :    //纹绣师
$relatetypeid= '20';
break;
default:
$relatetypeid= '14';
}
$dsql->SetQuery( "SELECT  * FROM #@__archives AS a
where  a.typeid in ( $relatetypeid ) and a.arcrank=0 order by rand() limit 4 ");
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
if($ns>0){
$relateproject= ' <div class="imgbox">
  '.$relateproject.'
</div> ';
}
return $relateproject;
}
function getProjectArticleRelateCase($typeid)
{
global $dsql;
$relatecase="";
$relatetypeid = "";
$indicators="";
$list="";
$counter=0;
switch ($typeid)
{
case 14:
$relatetypeid= '35';
break;
case 15:
$relatetypeid= '36';
break;
case 24:
$relatetypeid= '46,47,48';
break;
case 25:
$relatetypeid= '46,47,48,';
break;
case 26:
$relatetypeid= '46,47,48,';
break;
case 17:
$relatetypeid= '38';
break;
case 18:
$relatetypeid= '39';
break;
case 19:
$relatetypeid= '40';
break;
case 20:
$relatetypeid= '41';
break;
case 27:
$relatetypeid= '49,50,51,52,53,54,55';
break;
case 28:
$relatetypeid= '49,50,51,52,53,54,55';
break;
case 29:
$relatetypeid= '49,50,51,52,53,54,55';
break;
case 30:
$relatetypeid= '49,50,51,52,53,54,55';
break;
case 31:
$relatetypeid= '49,50,51,52,53,54,55';
break;
case 32:
$relatetypeid= '49,50,51,52,53,54,55';
break;
case 33:
$relatetypeid= '49,50,51,52,53,54,55';
break;
case 22:
$relatetypeid= '43';
break;
case 23:
$relatetypeid= '44';
break;
case 34:
$relatetypeid= '45';
break;
default:
$relatetypeid= '35';
}
$dsql->SetQuery( "SELECT * FROM #@__archives AS a,#@__addoncase AS b
where a.id =b.aid and a.typeid in ( $relatetypeid ) and a.arcrank=0  order by rand() limit 4 ");
$dsql->Execute();
$ns = $dsql->GetTotalRow();
while($row=$dsql->GetArray())
{
$id = $row["id"];
$urlarray = GetOneArchive($id);
$url = $urlarray['arcurl'];
$imgbefore = replaceurl($row["imgbefore"]);
$imgafter = replaceurl($row["imgafter"]);
$project=$row["project"];
$click=$row["click"];
if($counter == 0){
$indicators.='<li data-target="#articleslidecase" data-slide-to="'.$counter.'" class="active"></li>' ;
$list.= '
<div class="item active" >
  <div class="pic f-cb">
    <div class="before ">
      <a href="'.$url.'"><img src="'.$imgbefore.'" alt="术前"></a>
      <div class="flag">
        术前
      </div>
    </div>
    <div class="after">
      <a href="'.$url.'"><img src="'.$imgafter.'" alt="术后"></a>
      <div class="flag">
        术后
      </div>
    </div>
  </div>
  <div class="label f-cb">
    <span class="pro">'.$project.'</span>
    <div class="right">
      <a href="'.$url.'"><span class="show"></span></a>
      <span class="click">'.$click.'</span>
    </div>
  </div>
</div>';
}else{
$indicators.='<li data-target="#articleslidecase" data-slide-to="'.$counter.'" ></li>' ;
$list.= '
<div class="item " >
  <div class="pic f-cb">
    <div class="before ">
      <a href="'.$url.'"><img src="'.$imgbefore.'" alt="术前"></a>
      <div class="flag">
        术前
      </div>
    </div>
    <div class="after">
      <a href="'.$url.'"><img src="'.$imgafter.'" alt="术后"></a>
      <div class="flag">
        术后
      </div>
    </div>
  </div>
  <div class="label f-cb">
    <span class="pro">'.$project.'</span>
    <div class="right">
      <a href="'.$url.'"><span class="show"></span></a>
      <span class="click">'.$click.'</span>
    </div>
  </div>
</div>';
}
$counter=$counter+1;
}
if($ns>0){
$relatecase.= '  <div id="articleslidecase" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    '.$indicators.'
  </ol>'
  .'<div class="carousel-inner" role="listbox"> '
    . $list
  .'</div>
</div>';
}
return $relatecase;
}
function getProjectArticleRelateDoctor($typeid)
{
global $dsql;
$relatedoctor="";
$relatetypeid = 0;
$indicators="";
$list="";
$counter=0;
switch ($typeid)
{
case 14:
$relatetypeid= 3;
break;
case 15:
$relatetypeid= 3;
break;
case 24:
$relatetypeid= 3;
break;
case 25:
$relatetypeid= 3;
break;
case 26:
$relatetypeid= 3;
break;
case 17:
$relatetypeid= 3;
break;
case 18:
$relatetypeid= 3;
break;
case 19:
$relatetypeid= 3;
break;
case 20:
$relatetypeid=5;
break;
case 27:
$relatetypeid= 4;
break;
case 28:
$relatetypeid= 4;
break;
case 29:
$relatetypeid= 4;
break;
case 30:
$relatetypeid= 4;
break;
case 31:
$relatetypeid= 4;
break;
case 32:
$relatetypeid= 4;
break;
case 33:
$relatetypeid= 4;
break;
case 22:
$relatetypeid=3;
break;
case 23:
$relatetypeid= 3;
break;
case 34:
$relatetypeid= 3;
break;
default:
$relatetypeid= 3;
}
$dsql->SetQuery( "SELECT * FROM #@__archives AS a,#@__addondoctors AS b
where a.id =b.aid and a.typeid='$relatetypeid' and b.aid<>'36' and a.arcrank=0 order by rand() limit 2 ");
$dsql->Execute();
$ns = $dsql->GetTotalRow();
while($row=$dsql->GetArray())
{
$id = $row["id"];
$title = cn_substr($row["title"],80,0);
$urlarray = GetOneArchive($id);
$url = $urlarray['arcurl'];
$thumb = replaceurl($row["thumb"]);
$zhiwei = $row["zhiwei"];
$shanchang = $row["shanchang"];

if($counter == 0){
$indicators.='<li data-target="#articleslidedoctor" data-slide-to="'.$counter.'" class="active"></li>' ;
$list.= '
<div class="item zhuanjia-item active">
  <div class="zhuanjia-thum"> <a href="'.$url.'"><img src="'.$thumb.'" alt="" class=""></a></div>
  <div class="zhuanjia-info">
    <h2 class="zhuanjia-title"><a href="'.$url.'" class="pro-link">'.$title.'</a></h2>
    <p class="zhiwei">'.$zhiwei.'</p>
    <p class="shanchang">擅长项目：'.$shanchang.' </p>
    <a href="'.$url.'" class="zhuanjia-more">了解更多 &nbsp;》</a>
  </div>
</div>';
}else{
$indicators.='<li data-target="#articleslidedoctor" data-slide-to="'.$counter.'" ></li>' ;
$list.= '
<div class="item zhuanjia-item">
  <div class="zhuanjia-thum"> <a href="'.$url.'"><img src="'.$thumb.'" alt="" class=""></a></div>
  <div class="zhuanjia-info">
    <h2 class="zhuanjia-title"><a href="'.$url.'" class="pro-link">'.$title.'</a></h2>
    <p class="zhiwei">'.$zhiwei.'</p>
    <p class="shanchang">擅长项目：'.$shanchang.' </p>
    <a href="'.$url.'" class="zhuanjia-more">了解更多 &nbsp;》</a>
  </div>
</div>';
}
$counter=$counter+1;
}
if($ns>0){
$relatedoctor.= '<div id="articleslidedoctor" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    '.$indicators.'
  </ol>'
  .'<div class="carousel-inner" role="listbox"> '
    . $list
  .'</div>
</div>';
}
return $relatedoctor;
}
function getProjectArticleRelateProject($id)
{
global $dsql;
$relateproject="";
$relatetypeid = "";
$row = $dsql->GetOne("SELECT * FROM #@__archives
where id='$id'");
$typeid=$row['typeid'];
$dsql->SetQuery( "SELECT  * FROM #@__archives AS a
where  a.typeid='$typeid' and a.id <> '$id'  and a.arcrank=0 order by rand() limit 4 ");
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
if($ns>0){
$relateproject= ' <div class="imgbox">
  '.$relateproject.'
</div> ';
}
return $relateproject;
}
