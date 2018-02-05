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
//后台上传图片链接处理
function replaceurl($newurl)
{
$newurl=str_replace('/uploads/','https://uploads.hzshuangmei.com/',$newurl);
return $newurl;
}
//获取医生的缩略图
function getdoctorthumb($id)
{
global $thumb,$dsql;
$row = $dsql->GetOne("SELECT a.thumb FROM #@__addondoctors AS a
where a.aid='$id'");
$thumb=replaceurl($row['thumb']);
return $thumb;
}
//获取医生职位
function getdoctorzhiwei($id)
{
global $zhiwei,$dsql;
$row = $dsql->GetOne("SELECT a.zhiwei FROM #@__addondoctors AS a
where a.aid='$id'");
$zhiwei=replaceurl($row['zhiwei']);
return $zhiwei;
}
//获取医生擅长项目
function getdoctorshanchang($id)
{
global $shanchang,$dsql;
$row = $dsql->GetOne("SELECT a.shanchang FROM #@__addondoctors AS a
where a.aid='$id'");
$shanchang=replaceurl($row['shanchang']);
return $shanchang;
}
//获取案例术后图
function getcaseimgafter($id)
{
global $imgafter,$dsql;
$row = $dsql->GetOne("SELECT a.imgafter FROM #@__addoncase AS a
where a.aid='$id'");
$imgafter=replaceurl($row['imgafter']);
return $imgafter;
}
//获取案例术前图
function getcaseimgbefore($id)
{
global $imgbefore,$dsql;
$row = $dsql->GetOne("SELECT a.imgbefore FROM #@__addoncase AS a
where a.aid='$id'");
$imgbefore=replaceurl($row['imgbefore']);
return $imgbefore;
}
//获取案例评价
function getcasenote($id)
{
global $note,$dsql;
$row = $dsql->GetOne("SELECT a.note FROM #@__addoncase AS a
where a.aid='$id'");
$note=$row['note'];
return $note;
}
//获取案例涉及项目
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
where a.id =b.aid and  a.arcrank=0  and a.typeid in ( $relatetypeid ) order by rand() limit 4 ");
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
    <p class="name"><a href=" '.$url.' " target="_blank">'.$title.'</a></p>
    <p class="pro"><span class="icon">塑美项目</span>'.$project.'</p>
    <div class="before">
      <a href="'.$url.'" target="_blank"><img src="'.$imgbefore.'" alt="术前"></a>
      <p class="info">术前</p>
      <span class="angle"></span>
    </div>
  </div>
  <div class="right">
    <div class="after">
      <a href="'.$url.'" target="_blank"><img src="'.$imgafter.'" alt="'.$title.'"></a>
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
    <p class="name"><a href=" '.$url.' " target="_blank">'.$title.'</a></p>
    <p class="pro"><span class="icon">塑美项目</span>'.$project.'</p>
    <div class="before">
      <a href="'.$url.'" target="_blank"><img src="'.$imgbefore.'" alt="术前"></a>
      <p class="info">术前</p>
      <span class="angle"></span>
    </div>
  </div>
  <div class="right">
    <div class="after">
      <a href="'.$url.'" target="_blank"><img src="'.$imgafter.'" alt="'.$title.'"></a>
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
      <a href="'.$url.'" target="_blank"><img src="'.$imgbefore.'" alt="术前"></a>
      <div class="flag">
        术前
      </div>
    </div>
    <div class="after">
      <a href="'.$url.'" target="_blank"><img src="'.$imgafter.'" alt="术后"></a>
      <div class="flag">
        术后
      </div>
    </div>
  </div>
  <div class="label f-cb">
    <span class="pro">'.$project.'</span>
    <div class="right">
      <a href="'.$url.'" target="_blank"><span class="show"></span></a>
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
      <a href="'.$url.'" target="_blank"><img src="'.$imgbefore.'" alt="术前"></a>
      <div class="flag">
        术前
      </div>
    </div>
    <div class="after">
      <a href="'.$url.'" target="_blank"><img src="'.$imgafter.'" alt="术后"></a>
      <div class="flag">
        术后
      </div>
    </div>
  </div>
  <div class="label f-cb">
    <span class="pro">'.$project.'</span>
    <div class="right">
      <a href="'.$url.'" target="_blank"><span class="show"></span></a>
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
$relatetypeid=4;
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
$relatetypeid=4 ;
break;
case 44:
$relatetypeid=4;
break;
case 45 :
$relatetypeid= 4 ;
break;
default:
$relatetypeid= 3 ;
}
$dsql->SetQuery( "SELECT * FROM #@__archives AS a,#@__addondoctors AS b
where a.id =b.aid and a.typeid='$relatetypeid'  and  a.ismake !=-1  and b.aid not in(36,151,154) order by rand() limit 2 ");
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
  <div class="zhuanjia-thum"> <a href="'.$url.'" target="_blank"><img src="'.$thumb.'" alt="" class=""></a></div>
  <div class="zhuanjia-info">
    <h2 class="zhuanjia-title"><a href="'.$url.'" class="pro-link" target="_blank">'.$title.'</a></h2>
    <p class="zhiwei">'.$zhiwei.'</p>
    <p class="shanchang">擅长项目：'.$shanchang.' </p>
    <a href="'.$url.'" class="zhuanjia-more" target="_blank">了解更多 &nbsp;》</a>
  </div>
</div>';
}else{
$indicators.='<li data-target="#articleslidedoctor" data-slide-to="'.$counter.'" ></li>' ;
$list.= '
<div class="item zhuanjia-item">
  <div class="zhuanjia-thum"> <a href="'.$url.'" target="_blank"><img src="'.$thumb.'" alt="" class=""></a></div>
  <div class="zhuanjia-info">
    <h2 class="zhuanjia-title"><a href="'.$url.'" class="pro-link" target="_blank">'.$title.'</a></h2>
    <p class="zhiwei">'.$zhiwei.'</p>
    <p class="shanchang">擅长项目：'.$shanchang.' </p>
    <a href="'.$url.'" class="zhuanjia-more" target="_blank">了解更多 &nbsp;》</a>
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
where  a.typeid='$relatetypeid'  and a.arcrank=0 order by rand() limit 4 ");
$dsql->Execute();
$ns = $dsql->GetTotalRow();
while($row=$dsql->GetArray())
{
$id = $row["id"];
$title = cn_substr($row["title"],80,0);
$urlarray = GetOneArchive($id);
$url = $urlarray['arcurl'];
$litpic = replaceurl($row["litpic"]);
$relateproject.='<a href="'.$url.'" target="_blank"><img src="'.$litpic.'" alt="'.$title.'"></a>';
}
if($ns>0){
$relateproject= ' <div class="imgbox">
  '.$relateproject.'
</div> ';
}
return $relateproject;
}
/**
*  获取医生相关的案例信息
*  根据当前医生专题所属的栏目ID，获取相关的案例信息
* @param     $typeid     医生所在栏目ID
*/
function getDoctorArticleRelateCase($typeid)
{
global $dsql;
//相关案例
$relatecase="";
//日记栏目ID
$relatetypeid = "";
$indicators="";
$list="";
$counter=0;
//根据当前医生所属了；栏目ID，找到对应的日记栏目ID
switch ($typeid)
{
case 3 :    //整形医生
$relatetypeid=  '35,36,46,47,48,38,39,40,43,44,45';    //鼻部眼部等日记
break;
case 4 :     //皮肤医生
$relatetypeid= '49,50,51,52,53,54,55';    // 激光项目
break;
case 5 :     //纹绣师
$relatetypeid= '41';    // 激光项目
break;
default:
$relatetypeid= '35';
}
// a.id =b.aid  通过文档ID主表和附加表关联
//  根据对应案例所属栏目ID 查询案例信息，随机获取3条案例信息记录
$dsql->SetQuery( "SELECT * FROM #@__archives AS a,#@__addoncase AS b
where a.id =b.aid and   a.arcrank=0 and a.typeid in ( $relatetypeid )  order by rand() limit 3 ");
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
$list.= '<li>
              <a href="'.$url.'" class="tbj_t" target="_blank">
                  <img src="'.$imgafter.'" alt="术后"/>
              </a>
              <div class="tbj_b">
                  <a href="'.$url.'" class="tbj_b_img" target="_blank"><img src="'.$imgbefore.'" alt="术前"/></a>
                  <p class="p1 tbj_b_p1">【 速美项目 】</p>
                  <p class="p2">'.$project.'</p>
                  <a href="'.$url.'" class="tjb_video" target="_blank"><img src="//img.hzshuangmei.com/pc/tjb_video.png" alt="整形案例视频"/></a>
              </div>
              </li>';
}
if($ns>0){
$relatecase.= '  <div class="tjb_title1">
            <img src="https://img.hzshuangmei.com/pc/tjb_title1.png" alt="相关日记"/>
        </div><ul class="tjb_rj clearFix"> '
    . $list
  .'</ul>';
}
return $relatecase;
}
/**
*  获取医生相关的项目信息
*  根据当前医生专题所属的栏目ID，获取相关的项目信息
* @param     $typeid     医生所在栏目ID
*/
function getDoctorArticleRelateProject($typeid)
{
global $dsql;
//相关栏目
$relateproject="";
//项目项目栏目ID
$relatetypeid = "";
//根据当医生的栏目ID，找到对应项目栏目ID
switch ($typeid)
{
case 3 :   //整形医生
$relatetypeid=  '14,15,24,25,26,17,18,19,22,23,34';    //鼻眼胸部等
break;
case 4 :    //皮肤医生
$relatetypeid= '27,28,29,30,31,32,33';
break;
case 5 :    //纹绣师
$relatetypeid= '20';
break;
default:
$relatetypeid= '14';
}
//随机查询  栏目其他项目专题信息4条
$dsql->SetQuery( "SELECT  * FROM #@__archives AS a
where  a.typeid in ( $relatetypeid ) and a.arcrank=0 order by rand() limit 3 ");
$dsql->Execute();
$ns = $dsql->GetTotalRow();
while($row=$dsql->GetArray())
{
$id = $row["id"];
$title = cn_substr($row["title"],80,0);
$urlarray = GetOneArchive($id);
$url = $urlarray['arcurl'];
$litpic = replaceurl($row["litpic"]);
$relateproject.='<a href="'.$url.'" target="_blank"><img src="'.$litpic.'" alt="'.$title.'"></a>';
}
if($ns>0){
$relateproject= '   <div class="tjb_title3">
            <img src="https://img.hzshuangmei.com/pc/tjb_title3.png" alt="相关项目"/>
        </div> <div class="tjb_xm"><div class="tjb_img clearFix">
  '.$relateproject.'
</div>        </div>
 ';
}
return $relateproject;
}
/**
*  获取项目专题页相关案例信息
*  根据当前项目专题所属的栏目ID，获取相关的案例
* @param     $typeid     项目所在栏目ID
*/
function getProjectArticleRelateCase($typeid)
{
global $dsql;
//项目案例
$relatecase="";
//相关栏目
$relatetypeid = "";
$indicators="";
$list="";
$counter=0;
//根据当前项目所在栏目ID，找到对应案例ID
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
case 20:   //纹绣项目
$relatetypeid= '41';  //纹绣日记
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
// a.id =b.aid  通过文档ID主表和附加表关联
//  根据对应案例所属栏目ID 查询案例信息，随机获取3条案例信息记录
$dsql->SetQuery( "SELECT * FROM #@__archives AS a,#@__addoncase AS b
where a.id =b.aid and a.typeid in ( $relatetypeid )  and a.arcrank=0 order by rand() limit 3 ");
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
$list.= '<li>
              <a href="'.$url.'" class="tbj_t" target="_blank">
                  <img src="'.$imgafter.'" alt="术后"/>
              </a>
              <div class="tbj_b">
                  <a href="'.$url.'" class="tbj_b_img" target="_blank"><img src="'.$imgbefore.'" alt="术前"/></a>
                     <p class="p1 tbj_b_p1">【 速美项目 】</p>
                  <p class="p2">'.$project.'</p>
                  <a href="'.$url.'" class="tjb_video" target="_blank"><img src="//img.hzshuangmei.com/pc/tjb_video.png" alt="整形案例视频"/></a>
              </div>
              </li>';
}
if($ns>0){
$relatecase.= '   <div class="tjb_title1">
            <img src="https://img.hzshuangmei.com/pc/tjb_title1.png" alt="相关日记"/>
        </div><ul class="tjb_rj clearFix"> '
    . $list
  .'</ul>';
}
return $relatecase;
}
/**
*  获取项目专题页相关医生信息
*  根据当前项目专题所属的栏目ID，获取相关的医生
* @param     $typeid     项目所在栏目ID
*/
function getProjectArticleRelateDoctor($typeid)
{
global $dsql;
$relatedoctor="";
$relatetypeid = 0;
$indicators="";
$list="";
$counter=0;
//根据当前项目所在栏目ID，找到对应医生栏目ID
switch ($typeid)
{
case 14:  //鼻部项目
$relatetypeid= 3;   //整形医生
break;
case 15:  //眼部项目
$relatetypeid= 3;  //整形医生
break;
case 24:   //下巴项目
$relatetypeid= 3;  //整形医生
break;
case 25:    //脂肪项目
$relatetypeid= 3;   //整形医生
break;
case 26:     //唇部项目
$relatetypeid= 3;   //整形医生
break;
case 17:   //胸部项目
$relatetypeid= 3;  //整形医生
break;
case 18:   //私密项目
$relatetypeid= 3;    //整形医生
break;
case 19:   //体雕项目
$relatetypeid= 3;    //整形医生
break;
case 20:    //纹绣项目
$relatetypeid=5;    //纹绣师
break;
case 27: //祛痣祛胎记
$relatetypeid= 4;  //皮肤医生
break;
case 28:    //修复疤痕
$relatetypeid= 4;    //皮肤医生
break;
case 29:    //嫩肤美白
$relatetypeid= 4;     //皮肤医生
break;
case 30:         //激光脱毛
$relatetypeid= 4;    //皮肤医生
break;
case 31:    //美肤祛斑
$relatetypeid= 4;    //皮肤医生
break;
case 32:   //嫩肤祛痘
$relatetypeid= 4;    //皮肤医生
break;
case 33:    //紧致祛皱
$relatetypeid= 4;    //皮肤医生
break;
case 22:    //玻尿酸
$relatetypeid=3;
break;
case 23:    //BOTOX
$relatetypeid= 3;
break;
case 34:    //衡力
$relatetypeid= 3;
break;
default:
$relatetypeid= 3;
}
// a.id =b.aid  通过文档ID主表和附加表关联
//  根据对应医生所属栏目ID 查询医生信息，随机获取2条医生信息记录
$dsql->SetQuery( "SELECT * FROM #@__archives AS a,#@__addondoctors AS b
where a.id =b.aid and a.typeid='$relatetypeid' and a.arcrank=0 and  b.aid<>'36,151,154' order by rand() limit 2 ");
//执行查询
$dsql->Execute();
//获取记录数量
$ns = $dsql->GetTotalRow();
//循环处理数据集合
while($row=$dsql->GetArray())
{
// 医生所在文档ID
$id = $row["id"];
//医生文档标题
$title = cn_substr($row["title"],80,0);
//该医生的文档信息
$urlarray = GetOneArchive($id);
//医生URL
$url = $urlarray['arcurl'];
//医生缩略图
$thumb = replaceurl($row["thumb"]);
//医生职位
$zhiwei = $row["zhiwei"];
//医生擅长项目
$shanchang = $row["shanchang"];
$list.= '<li class="clearFix">
                <a href="'.$url.'" class="tjb_l" target="_blank"><img src="'.$thumb.'" alt="'.$title.'"/></a>
                <div class="tjb_r">
                    <p class="p3"><a href="'.$url.'" class="tjb_name" target="_blank">'.$title.'</a></p>
                    <p class="p4"><a href="'.$url.'" target="_blank">'.$zhiwei.'</a></p>
                    <div class="tjb_sc clearFix">
                        <p>擅长项目：</p>
                        <p>'.$shanchang.' </p>
                    </div>
                    <div class="tjb_button">
                        <a href="'.$url.'" target="_blank"><img src="//img.hzshuangmei.com/pc/tjb_button.png" alt="点击咨询"/></a>
                    </div>
                </div></li>';
}
if($ns>0){
$relatedoctor.= ' <div class="tjb_title2">
            <img src="https://img.hzshuangmei.com/pc/tjb_title2.png" alt="推荐专家"/>
        </div><ul class="tjb_zj clearFix"> '
    . $list
  .'</ul>';
}
return $relatedoctor;
}
/**
*  获取项目专题页相关项目
*  根据当前项目专题的ID，获取相关的项目
* @param     $id  文档ID
*/
function getProjectArticleRelateProject($id)
{
global $dsql;
//相关项目
$relateproject="";
//相关栏目ID
$relatetypeid = "";
//获取当前项目专题页所在栏目页的全部信息
$row = $dsql->GetOne("SELECT * FROM #@__archives
where id='$id'");
//获取当前项目专题页所在的栏目ID
$typeid=$row['typeid'];
//随机查询同级栏目其他项目专题信息3条，并排除自身
$dsql->SetQuery( "SELECT  * FROM #@__archives AS a
where  a.typeid='$typeid' and a.id <> '$id'  and a.arcrank=0 order by rand() limit 3 ");
//执行查询
$dsql->Execute();
//获取记录数量
$ns = $dsql->GetTotalRow();
//循环处理数据集合
while($row=$dsql->GetArray())
{
   /*   相关专题数据    */
  //文档ID
$id = $row["id"];
//文档标题
$title = cn_substr($row["title"],80,0);
//指定文档ID的这篇文档信息
$urlarray = GetOneArchive($id);
//对应的URL
$url = $urlarray['arcurl'];
//缩略图处理
$litpic = replaceurl($row["litpic"]);
//项目项目处理
$relateproject.='<a href="'.$url.'" target="_blank"><img src="'.$litpic.'" alt="'.$title.'"></a>';
}
if($ns>0){
$relateproject= '   <div class="tjb_title3">
            <img src="https://img.hzshuangmei.com/pc/tjb_title3.png" alt="相关项目"/>
        </div><div class="tjb_xm"><div class="tjb_img clearFix">
  '.$relateproject.'
</div>         </div>
';
}
return $relateproject;
}
/*
案例详情页右侧功能
*/
/*  与案例相关的热门项目
  typeid 为当前案例文档所在栏目ID
*/
function hotProjectAboutCase($typeid)
{
global $dsql;
//相关项目
$relateproject="";
//对应的项目栏目ID
$relateprojecttypeid = 0;
switch ($typeid)
{
case 35 :
$relateprojecttypeid= 14;
break;
case 36 :
$relateprojecttypeid=15 ;
break;
case 46:
$relateprojecttypeid=  24;
break;
case 47:
$relateprojecttypeid=  25;
break;
case 48:
$relateprojecttypeid=  26;
break;
case 38 :
$relateprojecttypeid= 17;
break;
case 39 :
$relateprojecttypeid= 18;
break;
case  40 :
$relateprojecttypeid= 19;
break;
case 41 :
$relateprojecttypeid=20;
break;
case 49 :
$relateprojecttypeid=27 ;
break;
case 50 :
$relateprojecttypeid= 28;
break;
case 51 :
$relateprojecttypeid= 29;
break;
case 52 :
$relateprojecttypeid= 30;
break;
case 53 :
$relateprojecttypeid=31 ;
break;
case  54 :
$relateprojecttypeid= 32;
break;
case  55 :
$relateprojecttypeid=33 ;
break;
case 43 :
$relateprojecttypeid=22 ;
break;
case 44:
$relateprojecttypeid=  23;
break;
case 45 :
$relateprojecttypeid= 34 ;
break;
default:
$relateprojecttypeid= 14 ;
}
$dsql->SetQuery( "SELECT  * FROM #@__archives AS a
where  a.typeid='$relateprojecttypeid'  and a.arcrank=0 order by rand() limit 5 ");
$dsql->Execute();
$ns = $dsql->GetTotalRow();

//如果有调出对应的数据
if ($ns>0){
while($row=$dsql->GetArray())
{
$id = $row["id"];
$title = cn_substr($row["title"],80,0);
$urlarray = GetOneArchive($id);
$url = $urlarray['arcurl'];
$litpic = replaceurl($row["litpic"]);
$relateproject.='<a href="'.$url.'" class="swiper-slide" target="_blank"><img src="'.$litpic.'" alt="'.$title.'"/>
 <div class="timu">'.$title.'</div>
</a>';
     }
}
 //当没有数据的时候从全部项目里面随机调取5条数据
else
 {
$dsql->SetQuery( "SELECT  * FROM #@__archives AS a
where  a.typeid in (14,15,16,24,25,26,17,18,19,20,27,28,29,30,31,32,33,22,23,34,61) and a.arcrank=0 order by rand() limit 5 ");
$dsql->Execute();
while($row=$dsql->GetArray())
{
$id = $row["id"];
$title = cn_substr($row["title"],80,0);
$urlarray = GetOneArchive($id);
$url = $urlarray['arcurl'];
$litpic = replaceurl($row["litpic"]);
$relateproject.='<a href="'.$url.'" class="swiper-slide" target="_blank"><img src="'.$litpic.'" alt="'.$title.'"/>
 <div class="timu">'.$title.'</div>
</a>';
        }
}
return $relateproject;
}
/*
获取案例对应的推荐专家
  $typeid  为当前案例日记所属的日记栏目ID
*/
function commendDoctorsAboutCase ($typeid){
  global $dsql;
$relatedoctortypeid="";
$relatedoctor = "";
// 判断当前日记文档案例属于哪种类型
// 并根据类型设置对应的调取专家类型
switch ($typeid)
{
case 35 :
$relatedoctortypeid= 3;
break;
case 36 :
$relatedoctortypeid=3 ;
break;
case 46:
$relatedoctortypeid= 3;
break;
case 47:
$relatedoctortypeid=  3;
break;
case 48:
$relatedoctortypeid=  3;
break;
case 38 :
$relatedoctortypeid= 3;
break;
case 39 :
$relatedoctortypeid= 3;
break;
case  40 :
$relatedoctortypeid= 3;
break;
case 41 :
$relatedoctortypeid=5;
break;
case 49 :
$relatedoctortypeid=4 ;
break;
case 50 :
$relatedoctortypeid= 4;
break;
case 51 :
$relatedoctortypeid= 4;
break;
case 52 :
$relatedoctortypeid= 4;
break;
case 53 :
$relatedoctortypeid=4 ;
break;
case  54 :
$relatedoctortypeid= 4;
break;
case  55 :
$relatedoctortypeid=4 ;
break;
case 43 :
$relatedoctortypeid=3;
break;
case 44:
$relatedoctortypeid=3;
break;
case 45 :
$relatedoctortypeid= 3 ;
break;
default:
$relatedoctortypeid= 3 ;
}
$dsql->SetQuery( "SELECT * FROM #@__archives AS a,#@__addondoctors AS b
where a.id =b.aid and a.typeid='$relatedoctortypeid'  and  a.arcrank=0 and  b.aid  not in (36,151,154) order by rand() limit 2 ");
$dsql->Execute();
$ns = $dsql->GetTotalRow();
while($row=$dsql->GetArray())
{
$id = $row["id"];
$title = cn_substr($row["title"],80,0);
$urlarray = GetOneArchive($id);
$url = $urlarray['arcurl'];
$litpic =replaceurl($row["litpic"]);
$relatedoctor.= '<a href="'.$url .'" target="_blank"><img src="'.$litpic.'" alt="'.$title.'" width="281" height="193"/></a>';
}
return $relatedoctor;
}
