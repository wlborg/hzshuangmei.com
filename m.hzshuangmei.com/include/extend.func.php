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
      <span class="angle"></span>
    </div>
  </div>
  <div class="right">
    <div class="after">
      <a href="'.$url.'"><img src="'.$imgafter.'" alt="'.$title.'"></a>
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

      <span class="angle"></span>
    </div>
  </div>
  <div class="right">
    <div class="after">
      <a href="'.$url.'"><img src="'.$imgafter.'" alt="'.$title.'"></a>
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
    </div>
    <div class="after">
      <a href="'.$url.'"><img src="'.$imgafter.'" alt="术后"></a>

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

    </div>
    <div class="after">
      <a href="'.$url.'"><img src="'.$imgafter.'" alt="术后"></a>

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
        $shorttitle = $row["shorttitle"];
        $urlarray = GetOneArchive($id);
        $url = $urlarray['arcurl'];
        $thumb = replaceurl($row["thumb"]);
        $zhiwei = $row["zhiwei"];
        $shanchang = $row["shanchang"];
        if($counter == 0){
            $indicators.='<li data-target="#articleslidedoctor" data-slide-to="'.$counter.'" class="active"></li>' ;
            $list.= '
<div class="item zhuanjia-item active">
  <div class="zhuanjia-thum"> <a href="'.$url.'"><img src="'.$thumb.'" alt="'.$title.'" class=""></a></div>
  <div class="zhuanjia-info">
    <h2 class="zhuanjia-title"><a href="'.$url.'" class="pro-link">'.$shorttitle.'</a></h2>
    <p class="zhiwei">'.$zhiwei.'</p>
    <a href="'.$url.'" class="zhuanjia-more">了解更多 &nbsp;》</a>
  </div>
</div>';
        }else{
            $indicators.='<li data-target="#articleslidedoctor" data-slide-to="'.$counter.'" ></li>' ;
            $list.= '
<div class="item zhuanjia-item">
  <div class="zhuanjia-thum"> <a href="'.$url.'"><img src="'.$thumb.'" alt="'.$title.'" class=""></a></div>
  <div class="zhuanjia-info">
    <h2 class="zhuanjia-title"><a href="'.$url.'" class="pro-link">'.$shorttitle.'</a></h2>
    <p class="zhiwei">'.$zhiwei.'</p>
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
      <a href="javascript:void(0)" class="j-consult"><img src="'.$imgbefore.'" alt="术前"></a>

    </div>
    <div class="after">
      <a href="javascript:void(0)" class="j-consult"><img src="'.$imgafter.'" alt="术后"></a>

    </div>
  </div>
  <div class="label f-cb">
    <span class="pro">'.$project.'</span>
    <div class="right">
      <a href="javascript:void(0)" class="j-consult"><span class="show"></span></a>
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
      <a href="javascript:void(0)" class="j-consult"><img src="'.$imgbefore.'" alt="术前"></a>

    </div>
    <div class="after">
      <a href="javascript:void(0)" class="j-consult"><img src="'.$imgafter.'" alt="术后"></a>

    </div>
  </div>
  <div class="label f-cb">
    <span class="pro">'.$project.'</span>
    <div class="right">
      <a href="javascript:void(0)" class="j-consult"><span class="show"></span></a>
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
    </div>
    <div class="after">
      <a href="'.$url.'"><img src="'.$imgafter.'" alt="术后"></a>
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
    </div>
    <div class="after">
      <a href="'.$url.'"><img src="'.$imgafter.'" alt="术后"></a>
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
        $shorttitle = $row["shorttitle"];
        $urlarray = GetOneArchive($id);
        $url = $urlarray['arcurl'];
        $thumb = replaceurl($row["thumb"]);
        $zhiwei = $row["zhiwei"];
        $shanchang = $row["shanchang"];
        if($counter == 0){
            $indicators.='<li data-target="#articleslidedoctor" data-slide-to="'.$counter.'" class="active"></li>' ;
            $list.= '
<div class="item zhuanjia-item active">
  <div class="zhuanjia-thum"> <a href="'.$url.'" class="clickParameter"><img src="'.$thumb.'" alt="'.$title.'" class=""></a></div>
  <div class="zhuanjia-info">
    <h2 class="zhuanjia-title"><a href="'.$url.'" class="pro-link clickParameter">'.$shorttitle.'</a></h2>
    <p class="zhiwei">'.$zhiwei.'</p>
    <a href="'.$url.'" class="zhuanjia-more clickParameter">了解更多 &nbsp;》</a>
  </div>
</div>';
        }else{
            $indicators.='<li data-target="#articleslidedoctor" data-slide-to="'.$counter.'" ></li>' ;
            $list.= '
<div class="item zhuanjia-item">
  <div class="zhuanjia-thum"> <a href="'.$url.'"><img src="'.$thumb.'" alt="'.$title.'" class=""></a></div>
  <div class="zhuanjia-info">
    <h2 class="zhuanjia-title"><a href="'.$url.'" class="pro-link">'.$shorttitle.'</a></h2>
    <p class="zhiwei">'.$zhiwei.'</p>
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
        $relateproject.='<a href="'.$url.'" class="clickParameter"><img src="'.$litpic.'" alt="'.$title.'"></a>';
    }
    if($ns>0){
        $relateproject= ' <div class="imgbox">
  '.$relateproject.'
</div> ';
    }
    return $relateproject;
}
/**
 *  专题增加获取熊掌号文章(最新)
 *  获取相关最新文章6条
 *  $res2补缺少数据
 */
function getProjectArticleFormXZ($typeid)
{
    global $dsql;
    $relateproject="";
    $relatetypeid = 0;
    $res2="";
    switch ($typeid)
    {
        case 14 :
            $relatetypeid= 78;
            break;
        case 15 :
            $relatetypeid=77;
            break;
        case 24:
            $relatetypeid=79;
            break;
        case 25:
            $relatetypeid=79;
            break;
        case 26:
            $relatetypeid=79;
            break;
        case 17 :
            $relatetypeid=80;
            break;
        case 18 :
            $relatetypeid=81;
            break;
        case 19 :
            $relatetypeid=82;
            break;
        case  20 :
            $relatetypeid=83;
            break;
        case  27 :
            $relatetypeid=78;
            break;
        case  28 :
            $relatetypeid=78;
            break;
        case  29 :
            $relatetypeid=78;
            break;
        case  30 :
            $relatetypeid=78;
            break;
        case  31 :
            $relatetypeid=78;
            break;
        case  32 :
            $relatetypeid=78;
            break;
        case  33 :
            $relatetypeid=78;
            break;
        case  22 :
            $relatetypeid=78;
            break;
        case  23 :
            $relatetypeid=78;
            break;
        case  34 :
            $relatetypeid=78;
            break;
        default:
            $relatetypeid=78;
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

        $litpic =$row["litpic"];
        $relateproject.='<a href="https://xzh.hzshuangmei.com'.$url.'" class="clickParameter"><img src="https://xzh.hzshuangmei.com'.$litpic.'" alt="'.$title.'"><span>'.$title.'</span></a>';
    }
    if($ns>0){
        if($ns<4){
            $res2.=getProjectArticleFormXZToSix($ns);
        }
        $relateproject= '<div class="imgbox">
  '.$relateproject.$res2.'</div>';
    }
    return $relateproject;
}
/**
 *
 *  专题增加获取熊掌号文章(最新)
 *  如果不足够六条，补到六条
 *
 */
function getProjectArticleFormXZToSix($typeNum)
{
    global $dsql;
    $repairRes="";
    $repair=0;
    $repair=4-$typeNum;
    $dsql->SetQuery("SELECT  * FROM #@__archives AS a where  a.typeid=78 and a.arcrank=0 order by rand() limit
  $repair");
    $dsql->Execute();
    $ns = $dsql->GetTotalRow();
    while($row=$dsql->GetArray())
    {
        $id = $row["id"];
        $title = cn_substr($row["title"],80,0);
        $urlarray = GetOneArchive($id);
        $url = $urlarray['arcurl'];
        $litpic =$row["litpic"];
        $relateproject.='<a href="https://xzh.hzshuangmei.com'.$url.'"><img src="https://xzh.hzshuangmei.com'.$litpic.'" alt="'.$title.'"><span>'.$title.'</span></a>';
    }
    if($ns>0){
        $repairRes=$repairRes;
    }
    return $repairRes;
}
/*
资讯栏目对应的项目栏目
@param   $typeid   当前资讯文档所在的栏目ID最前2条
 */
function MoreHotProjectAboutInfoT($typeid)
{
    global $dsql;
    $relateproject="";
    $relatetypeid = 0;
    switch ($typeid)
    {
        case 222 :
            $relatetypeid= '14,15,24,25,26,17,18,19';
            break;
        case 90 :
            $relatetypeid='14,15,24,25,26,17,18,19';
            break;
        case 91:
            $relatetypeid=14;
            break;
        case 92:
            $relatetypeid=14;
            break;
        case 93:
            $relatetypeid=14;
        case 94:
            $relatetypeid=14;
            break;
        case 95:
            $relatetypeid=14;
            break;
        case 96:
            $relatetypeid=14;
            break;
        case 97:
            $relatetypeid=14;
            break;
        case 98:
            $relatetypeid=9;
            break;
        case 99:
            $relatetypeid=9;
            break;
        case 100:
            $relatetypeid=9;
            break;
        case 101:
            $relatetypeid=9;
            break;
        case 102:
            $relatetypeid=9;
            break;
        case 103:
            $relatetypeid=9;
            break;
        case 104:
            $relatetypeid=9;
            break;
        case 105:
            $relatetypeid=9;
            break;
        case 106:
            $relatetypeid=9;
            break;
        case 107:
            $relatetypeid=9;
            break;
        case 108:
            $relatetypeid='24,25,26';
            break;
        case 109:
            $relatetypeid='24,25,26';
            break;
        case 110:
            $relatetypeid='24,25,26';
            break;
        case 111:
            $relatetypeid=25;
            break;
        case 112:
            $relatetypeid=24;
            break;
        case 113:
            $relatetypeid=25;
            break;
        case 114:
            $relatetypeid=25;
            break;
        case 115:
            $relatetypeid=17;
            break;
        case 116:
            $relatetypeid=17;
            break;
        case 117:
            $relatetypeid=17;
            break;
        case 118:
            $relatetypeid=17;
            break;
        case 119:
            $relatetypeid=17;
            break;
        case 120:
            $relatetypeid=17;
            break;
        case 121:
            $relatetypeid=17;
            break;
        case 122:
            $relatetypeid=18;
            break;
        case 123:
            $relatetypeid=18;
            break;
        case 124:
            $relatetypeid=18;
            break;
        case 125:
            $relatetypeid=18;
            break;
        case 126:
            $relatetypeid=19;
            break;
        case 127:
            $relatetypeid=19;
            break;
        case 128:
            $relatetypeid=19;
            break;
        case 129:
            $relatetypeid=19;
            break;
        case 130:
            $relatetypeid=19;
            break;
        case 131:
            $relatetypeid=19;
            break;
        case 132:
            $relatetypeid=19;
            break;
        case 133:
            $relatetypeid=19;
            break;
        case 134:
            $relatetypeid=19;
            break;
        case 135:
            $relatetypeid=19;
            break;
        case 136:
            $relatetypeid='14,15,24,25,26,17,18,19';
            break;
        case 137:
            $relatetypeid='14,15,24,25,26,17,18,19';
            break;
        case 138:
            $relatetypeid='14,15,24,25,26,17,18,19';
            break;
        case 139:
            $relatetypeid='14,15,24,25,26,17,18,19';
            break;
        case 140:
            $relatetypeid='20,27,28,29,30,31,32,33';
            break;
        case 141:
            $relatetypeid='27';
            break;
        case 142:
            $relatetypeid='27';
            break;
        case 143:
            $relatetypeid='27';
            break;
        case 144:
            $relatetypeid='27';
            break;
        case 145:
            $relatetypeid='27';
            break;
        case 146  :
            $relatetypeid='27';
            break;
        case 147  :
            $relatetypeid='27,28,29,30,31,32,33';
            break;
        case 148  :
            $relatetypeid='30,29';
            break;
        case 149  :
            $relatetypeid='30,29';
            break;
        case 150  :
            $relatetypeid='29';
            break;
        case 150  :
            $relatetypeid='29';
            break;
        case 151  :
            $relatetypeid='30,31';
            break;
        case 152  :
            $relatetypeid='28,29,30,31,32,33';
            break;
        case 153  :
            $relatetypeid='32,31';
            break;
        case 154  :
            $relatetypeid='32,31';
            break;
        case 155  :
            $relatetypeid='32,31';
            break;
        case 156  :
            $relatetypeid='32,31';
            break;
        default:
            $relatetypeid='14,15,24,25,26,17,18,19';
    }
    $dsql->SetQuery( "SELECT  * FROM #@__archives AS a
where  a.typeid='$relatetypeid'  and a.arcrank=0 order by id desc limit 2");
    $dsql->Execute();
    $ns = $dsql->GetTotalRow();
    while($row=$dsql->GetArray())
    {
        $id = $row["id"];
        $title = cn_substr($row["title"],80,0);
        $urlarray = GetOneArchive($id);
        $url = $urlarray['arcurl'];
        $litpic =replaceurl($row["litpic"]);
        $relateproject.='<a href="'.$url.'"><img src="'.$litpic.'" class="pro1" alt="'.$title.'"></a>';
    }
    if($ns>0){
        if($ns<2){
            $relateproject.=getProjectArticleFormProToOne($ns);
            $relateproject.=$relateproject;
        }
        return $relateproject;
    }
}
/*
资讯列表页和详情页底部 更多项目按钮
@param   $typeid   当前文档所在的栏目ID
 */
function MoreHotProjectAboutInfo($typeid)
{
    global $dsql;
//对应的栏目URL
    $relateprojecturl="";
    switch ($typeid)
    {
        case 89 :
            $relateprojecturl="/projects";
            break;
        case 90 :
            $relateprojecturl="/projects/surgery";
            break;
        case 91 :
        case 92 :
        case 93 :
        case 94 :
        case 95 :
        case 96 :
        case 97 :
            $relateprojecturl="/projects/nose";
            break;
        case 98:
        case 99:
        case 100:
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
        case 106:
        case 107:
            $relateprojecturl="/projects/eye";
            break;
        case 108 :
        case 109 :
        case 113 :
        case 114 :
            $relateprojecturl="/projects/face";
            break;
        case 110 :
        case 111 :
            $relateprojecturl="/projects/zhifang";
            break;
        case  112 :
            $relateprojecturl="/projects/xiaba";
            break;
        case 115 :
        case 116 :
        case 117 :
        case 118 :
        case 119 :
        case 120 :
        case 121 :
            $relateprojecturl="/projects/chest";
            break;
        case 122 :
        case 123 :
        case 124 :
        case 125 :
            $relateprojecturl="/projects/private";
            break;
        case 126 :
        case 127 :
        case 128 :
        case 129 :
        case 130 :
        case 131 :
        case 132 :
        case 133 :
        case 134 :
        case 135 :
            $relateprojecturl="/projects/body";
            break;
        case 136:
        case 137:
        case 138:
            $relateprojecturl="/projects/lip";
            break;
        case 140:
            $relateprojecturl="/projects/laser/";
            break;
        case 141:
        case 142:
        case 143:
        case 144:
        case 145:
        case 146:
        case 152:
            $relateprojecturl="/projects/skin";
            break;
        case 147:
            $relateprojecturl="/projects/skin";
            break;
        case 148:
            $relateprojecturl="/projects/skin";
            break;
        case 149:
        case 150:
            $relateprojecturl="/projects/meibai";
            break;
        case 151:
            $relateprojecturl="/projects/tuomao";
            break;
        case 153:
        case 154:
        case 155:
        case 156:
            $relateprojecturl="/projects/racne";
            break;
        case 157:
        case 158:
        case 159:
        case 160:
        case 161:
        case 162:
            $relateprojecturl="/projects/rebev";
            break;
        case 163:
        case 164:
        case 165:
            $relateprojecturl="/projects/rhyt";
            break;
        case 166:
        case 167:
        case 168:
        case 224:
        case 225:
            $relateprojecturl="/projects/scar";
            break;
        case 169:
        case 170:
        case 171:
        case 172:
            $relateprojecturl="/projects/shed";
            break;
        case 173:
            $relateprojecturl="/projects/mini";
            break;
        case 174:
            $relateprojecturl="/projects/ha";
            break;
        case 181:
            $relateprojecturl="/projects/botox";
            break;
        case 186:
            $relateprojecturl="/projects/tattoo";
            break;
        case 187:
        case 188:
        case 189:
            $relateprojecturl="/projects/tatt";
            break;
        case 190:
        case 191:
        case 192:
        case 193:
        case 226:
            $relateprojecturl="/projects/brow";
            break;
        case 194:
        case 195:
        case 196:
        case 227:
            $relateprojecturl="/projects/embr";
            break;
        case 197:
        case 198:
        case 199:
        case 228:
            $relateprojecturl="/projects/tattoo/projects/poli";
            break;
        case 200:
            $relateprojecturl="/projects/liv";
            break;
        case 201:
        case 202:
        case 203:
        case 204:
        case 205:
        case 229:
            $relateprojecturl="/projects/whi";
            break;
        case 206:
        case 207:
        case 208:
        case 209:
            $relateprojecturl="/projects/black";
            break;
        case 206:
        case 207:
        case 208:
        case 209:
            $relateprojecturl="/projects/black";
            break;
        case 210:
        case 211:
        case 212:
        case 213:
            $relateprojecturl="/projects/liv/projects/hydr";
            break;
        case 214:
        case 215:
        case 216:
        case 217:
        case 218:
            $relateprojecturl="/projects/beaut";
            break;
        case 219:
        case 220:
        case 221:
            $relateprojecturl="/projects/nose";
            break;
        default:
            $relateprojecturl="/projects/";
    }
    $relateprojecturl='<a href="'.$relateprojecturl.'" class="more">更多项目</a>';
    return $relateprojecturl;
}
/*
/*
资讯栏目对应的项目栏目,不足2条补到2条
@param   $typeid   当前资讯文档所在的栏目ID
 */
function getProjectArticleFormProToOne($typeNum)
{
    global $dsql;
    $repairRes="";
    $repair=0;
    $repair=2-$typeNum;
    $dsql->SetQuery("SELECT  * FROM #@__archives AS a where  a.typeid=14  and a.arcrank=0 order by id desc limit $repair");
    $dsql->Execute();
    $ns = $dsql->GetTotalRow();
    while($row=$dsql->GetArray())
    {
        $id = $row["id"];
        $title = cn_substr($row["title"],80,0);
        $urlarray = GetOneArchive($id);
        $url = $urlarray['arcurl'];
        $litpic =replaceurl($row["litpic"]);
        $repairRes.='<a href="'.$url.'"><img src="'.$litpic.'" class="pro1" alt="'.$title.'"></a>';
    }
    if($ns>0){
        $repairRes=$repairRes;
    }
    return $repairRes;
}
/**
 *  专题增加获双美资讯文章(最新)
 *  获取相关最新文章4条
 *  $res2补缺少数据
 *
 */
function getProjectArticleFormInfo($typeid)
{
    global $dsql;
    $relateproject="";
    $relatetypeid = 0;
    $res2="-";
    switch ($typeid)
    {
        case 6 :
        case 7 :
            $relatetypeid= '92,93,94,95,96,97,99,100,101,102,103,104,105,106,107,109,110,111,112,113,114,116,117,118,119,120,121,123,124,125,127,128,129,130,131,132,133,134,135,137,138,142,143,144,145,146,148,149,150,151,152,154,155,156,158,159,160,161,162,164,165,167,168,224,225,170,171,172,175,176,177,178,179,180,182,183,184,185,188,189,223,226,191,192,193,195,196,227,198,199,228,202,203,204,205,229,207,208,209,211,212,213,215,216,217,218,220,221';
            break;
        case 14 :
            $relatetypeid='92,93,94,95,96,97';
            break;
        case 15:
            $relatetypeid='99,100,101,102,103,104,105,106,107';
            break;
        case 16:
            $relatetypeid='109,110,111,112,113,114';
            break;
        case 17:
            $relatetypeid='116,117,118,119,120,121';
            break;
        case 18 :
            $relatetypeid='123,124,125';
            break;
        case 19 :
            $relatetypeid='127,128,129,130,131,132,133,134,135';
            break;
        case 230 :
            $relatetypeid='137,138';
            break;
        case  8 :
            $relatetypeid='142,143,144,145,146,147,148,149,150,151,152,154,155,156,158,159,160,161,162,164,165,167,168,224,225,170,171,172';
            break;
        case  21 :
            $relatetypeid=147;
            break;
        case  231 :
            $relatetypeid='142,143,144,145,146';
            break;
        case  232 :
            $relatetypeid='154,155,156';
            break;
        case  233 :
            $relatetypeid='158,159,160,161,162';
            break;
        case  234 :
            $relatetypeid=166;
            break;
        case  235 :
            $relatetypeid='170,171,172';
            break;
        case  262 :
            $relatetypeid='164,165';
            break;
        case  9 :
            $relatetypeid='175,176,177,178,179,180,182,183,184,185';
            break;
        case  22 :
            $relatetypeid='175,176,177,178,179,180';
            break;
        case  23 :
            $relatetypeid='182,183,184,185';
            break;
        case  20 :
            $relatetypeid='188,189,223,226,191,192,193,195,196,227,198,199,228';
            break;
        case  236 :
            $relatetypeid='188,189,223';
            break;
        case  237 :
            $relatetypeid='236,191,192,193';
            break;
        case  238 :
            $relatetypeid='195,196,227';
            break;
        case  239 :
            $relatetypeid='198,199,228';
            break;
        case  61 :
            $relatetypeid='220,221';
            break;
        case  245 :
            $relatetypeid='221';
            break;
        case  246 :
            $relatetypeid='220';
            break;
        case  240 :
            $relatetypeid='202,203,204,205,229,207,208,209,211,212,213,215,216,217,218';
            break;
        case  241 :
            $relatetypeid='202,203,204,205,229';
            break;
        case  242 :
            $relatetypeid='207,208,209';
            break;
        case  243 :
            $relatetypeid='211';
            break;
        case  244 :
            $relatetypeid='215,216,217,218';
            break;
        default:
            $relatetypeid='92,93,94,95,96,97,99,100,101,102,103,104,105,106,107,109,110,111,112,113,114,116,117,118,119,120,121,123,124,125,127,128,129,130,131,132,133,134,135,137,138,142,143,144,145,146,148,149,150,151,152,154,155,156,158,159,160,161,162,164,165,167,168,224,225,170,171,172,175,176,177,178,179,180,182,183,184,185,188,189,223,226,191,192,193,195,196,227,198,199,228,202,203,204,205,229,207,208,209,211,212,213,215,216,217,218,220,221';
    }
    $dsql->SetQuery( "SELECT  * FROM #@__archives AS a
where  a.typeid in($relatetypeid) and a.arcrank=0 order by rand() limit 4 ");
    $dsql->Execute();
    $ns = $dsql->GetTotalRow();
    while($row=$dsql->GetArray())
    {
        $id = $row["id"];
        $title = cn_substr($row["title"],80,0);
        $shorttitle = cn_substr($row["title"],80,0);
        $urlarray = GetOneArchive($id);
        $url = $urlarray['arcurl'];
        $litpic =replaceurl($row["litpic"]);
        $relateproject.='<a href="'.$url.'" class="clickParameter"><img src="'.$litpic.'" alt="'.$title.'"><span>'.$shorttitle.'</span></a>';
    }
    if($ns>0){
        if($ns<4){
            $relateproject.=getProjectArticleFormInfoToSix($ns);
            $relateproject.=$relateproject;
        }
        return $relateproject;
    }
}
/**
 *
 *  专题增加获取资讯文章(最新)
 *  如果不足够4条，补到4条
 *
 */
function getProjectArticleFormInfoToSix($typeNum)
{
    global $dsql;
    $repairRes="";
    $repair=0;
    $repair=4-$typeNum;
    $dsql->SetQuery("SELECT  * FROM #@__archives AS a where  a.typeid in(93,95) and a.arcrank=0 order by rand() limit
  $repair");
    $dsql->Execute();
    $ns = $dsql->GetTotalRow();
    while($row=$dsql->GetArray())
    {
        $id = $row["id"];
        $title = cn_substr($row["title"],80,0);
        $urlarray = GetOneArchive($id);
        $url = $urlarray['arcurl'];
        $litpic =replaceurl($row["litpic"]);
        $shorttitle = cn_substr($row["title"],80,0);
        $repairRes.='<a href="'.$url.'" class="clickParameter"><img src="'.$litpic.'" alt="'.$title.'"><span>'.$shorttitle.'</span></a>';
    }
    if($ns>0){
        $repairRes=$repairRes;
    }
    return $repairRes;
}
/**
 * 帮助中心对应的热门问题
 * @param   $typeid   当前资讯文档所在的栏目ID
 * @$defatypeid 默认所有的栏目ID
 */
function GetHelp_list_typeid($typeid)
{
    global $dsql;
    $relateproject="";
    $relatetypeid = 0;
    $defatypeid = '268,269,270,272,273,274,275,277,278,279,280,281,282,283,284,285,286,288,289,290,291,292,293,295,296,297,298,299,300,301,302,303,304';
    switch ($typeid)
    {
        case 226 :
            $relatetypeid= '268,269,270,272,273,274,275,277,278,279,280,281,282,283,284,285,286,288,289,290,291,292,293,295,296,297,298,299,300,301,302,303,304';
            break;
        case 267 :
            $relatetypeid='268,269,270';
            break;
        case 268:
        case 269:
        case 270:
            $relatetypeid=$typeid;
            break;
        case 271:
            $relatetypeid='272,273,274,275';
            break;
        case 272:
        case 273:
        case 274:
        case 275:
            $relatetypeid=$typeid;
            break;
        case 276:
            $relatetypeid='277,278,279,280,281,282,283,284,285,286';
            break;
        case 277:
        case 278:
        case 279:
        case 280:
        case 281:
        case 282:
        case 283:
        case 284:
        case 285:
        case 286:
            $relatetypeid=$typeid;
            break;
        case 287:
            $relatetypeid='288,289,290,291,292,293';
            break;
        case 288:
        case 289:
        case 290:
        case 291:
        case 292:
        case 293:
            $relatetypeid=$typeid;
            break;
        case 294:
            $relatetypeid='295,296,297,298,299,300,301,302,303,304';
            break;
        case 295:
        case 296:
        case 297:
        case 298:
        case 299:
        case 300:
        case 301:
        case 302:
        case 303:
        case 304:
            $relatetypeid=$typeid;
            break;
        default:
            $relatetypeid='268,269,270,272,273,274,275,277,278,279,280,281,282,283,284,285,286,288,289,290,291,292,293,295,296,297,298,299,300,301,302,303,304';
    }
    $dsql->SetQuery( "SELECT  * FROM #@__archives AS a where  a.typeid in ( $relatetypeid ) and a.arcrank=0  order by click desc limit 6");
    $dsql->Execute();
    $ns = $dsql->GetTotalRow();
    while($row=$dsql->GetArray())
    {
        $id = $row["id"];
        $title = cn_substr($row["title"],36,0);
        $shorttitle =strlen(cn_substr($row["shorttitle"],36,0))>36?cn_substr($row["title"],36,0)."......":cn_substr($row["title"],36,0);
        $urlarray = GetOneArchive($id);
        $url = $urlarray['arcurl'];
        $litpic =replaceurl($row["litpic"]);
        $relateproject.='<li><a href="'.$url.'"  title="'.$title.'"><span>?</span><span>'.$shorttitle.'</span></a></li>';
    }
    if($ns>0){
        if($ns<6){
            $res2.=getHelpArticleToEvl($typeid,$defatypeid,$ns);
        }
        $relateproject=$relateproject.$res2;
    }
    return $relateproject;
}

/**
 *
 *  帮助中心读取6条数据
 *  如果不足够6条，补到6条
 *  $typeid     当前栏目id
 *  $defatypeid 帮助栏目下所有id(及默认id)
 */
function getHelpArticleToEvl($typeid,$defatypeid,$typeNum)
{
    global $dsql;
    $repairRes="";
    $repair=0;
    $repair=6-$typeNum;
    $dsql->SetQuery( "SELECT  *  FROM #@__archives AS a where a.typeid in ( $defatypeid ) and a.typeid <> $typeid and a.arcrank=0 order by click desc limit $repair");
    $dsql->Execute();
    $ns = $dsql->GetTotalRow();
    while($row=$dsql->GetArray())
    {
        $id = $row["id"];
        $title = cn_substr($row["title"],80,0);
        $urlarray = GetOneArchive($id);
        $url = $urlarray['arcurl'];
        $litpic =replaceurl($row["litpic"]);
        $shorttitle =strlen(cn_substr($row["shorttitle"],36,0))>36?cn_substr($row["title"],36,0)."......":cn_substr($row["title"],36,0);
        $repairRes.='<li><a href="'.$url.'"  title="'.$title.'"><span>?</span><span>'.$shorttitle.'</span></a></li>';
    }
    if($ns>0){
        $repairRes=$repairRes;
    }
    return $repairRes;
}
/**
 *
*  帮助中心详情页读取医生的头像,根据文档填写医生的文档id
*  $typeid     当前栏目id
*/
function getDoctorHeadFormId($doctorid)
{
global $dsql;
$relateInfo="";
if($doctorid!=""){
      $dsql->SetQuery( "SELECT * FROM #@__archives AS a,#@__addondoctors AS b where a.id =b.aid  and a.id = '$doctorid' and a.arcrank=0  order by rand() limit 1");
      $dsql->Execute();
      $ns = $dsql->GetTotalRow();
      while($row=$dsql->GetArray())
      {
      $thumb =replaceurl($row["thumb"]);
      $relateInfo.='<img src="'.$thumb.'" alt="'.$thumb.'" />';
      }
      if($ns>0){
      $relateInfo=$relateInfo;
      }
}else{
    $relateInfo.='<img src="https://img.hzshuangmei.com/pc/helpKf.png" alt="帮助问答默认客服头像" />';
}
 return $relateInfo;
}
/**
 *
*  帮助中心详情页读取医生的名字,根据文档填写医生的文档id
*  $typeid     当前栏目id
*
*/
function getDoctorHeadFormName($doctorid)
{
global $dsql;
$relateInfo="";
if($doctorid!=""){
      $dsql->SetQuery( "SELECT * FROM #@__archives AS a,#@__addondoctors AS b where a.id =b.aid  and a.id = '$doctorid' and a.arcrank=0  order by rand() limit 1");
      $dsql->Execute();
      $ns = $dsql->GetTotalRow();
      while($row=$dsql->GetArray())
      {
      $title =$row["title"];
      $relateInfo.=$title;
      }
      if($ns>0){
      $relateInfo=$relateInfo;
      }
}else{
    $relateInfo.='客服';
}
 return $relateInfo;
}
/**
 *
*  帮助中心详情页读取医生的职位,根据文档填写医生的文档id
*  $typeid     当前栏目id
*
*/
function getDoctorHeadFormZhiwei($doctorid)
{
global $dsql;
$relateInfo="";
if($doctorid!=""){
      $dsql->SetQuery( "SELECT * FROM #@__archives AS a,#@__addondoctors AS b where a.id =b.aid  and a.id = '$doctorid' and a.arcrank=0  order by rand() limit 1");
      $dsql->Execute();
      $ns = $dsql->GetTotalRow();
      while($row=$dsql->GetArray())
      {
      $zhiwei =$row["zhiwei"];
      $relateInfo.=$zhiwei;
      }
      if($ns>0){
      $relateInfo=$relateInfo;
      }
}else{
    $relateInfo.='客服服务';
}
 return $relateInfo;
}