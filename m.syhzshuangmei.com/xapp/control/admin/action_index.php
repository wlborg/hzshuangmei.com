<?php

class seo_index extends Base{
    function ac_make(){
        $templet = SEOTEMPLETS."/admin/makehtml.htm";
        $this->LoadTemplate($templet);
        $this->Display();
    }
    
    function ac_xml()
    {
        global $cfg_basedir,$cfg_cmspath;
        require_once(DEDEINC."/arc.partview.class.php");
       
       //各个栏目的sitemap索引 
       // 首页 荣誉 环境 设备 视频 索引
       $murl_others=$cfg_cmspath."/sitemap_others.xml";
       //  活动新闻 索引
       $murl_news=$cfg_cmspath."/sitemap_news.xml"; 
       //专家医生 索引
       $murl_experts=$cfg_cmspath."/sitemap_experts.xml";
       // 项目 索引
        $murl_projects=$cfg_cmspath."/sitemap_projects.xml";
       // 日记 索引
       $murl_cases=$cfg_cmspath."/sitemap_cases.xml";
         //总 索引
        $murl = $cfg_cmspath."/sitemap.xml";
        
      // 各个栏目的sitemap索引模板 
      // 首页 荣誉 环境 设备 视频 索引模板
       $tmpfile_others = SEOTEMPLETS."/admin/sitemap_others.xml"; 
      //  活动新闻 索引模板
        $tmpfile_news = SEOTEMPLETS."/admin/sitemap_news.xml"; 
      //专家医生 索引模板   
        $tmpfile_experts = SEOTEMPLETS."/admin/sitemap_experts.xml";
     // 项目索引模板    
      $tmpfile_projects = SEOTEMPLETS."/admin/sitemap_projects.xml";  
     // 日记 索引模板
     $tmpfile_cases = SEOTEMPLETS."/admin/sitemap_cases.xml";  
      //总 所以模板
        $tmpfile = SEOTEMPLETS."/admin/sitemap.xml";
       
        $pv = new PartView();
        
      //加载 others 模板
       $pv->SetTemplet($tmpfile_others); 
        $pv->SaveToHtml($cfg_basedir.$murl_others);
        
         //加载 news 模板
       $pv->SetTemplet($tmpfile_news); 
        $pv->SaveToHtml($cfg_basedir.$murl_news);   
        
          //加载 experts 模板
       $pv->SetTemplet($tmpfile_experts); 
        $pv->SaveToHtml($cfg_basedir.$murl_experts);    
        
            //加载 projects 模板
       $pv->SetTemplet($tmpfile_projects); 
        $pv->SaveToHtml($cfg_basedir.$murl_projects);   
        
             //加载 cases 模板
       $pv->SetTemplet($tmpfile_cases); 
        $pv->SaveToHtml($cfg_basedir.$murl_cases); 
        
        
        
        $pv->SetTemplet($tmpfile);
        $pv->SaveToHtml($cfg_basedir.$murl);
        echo "<a href='$murl' target='_blank'>成功更新文件: $murl 浏览...</a>";
        exit();
    }
    
    function ac_txt()
    {
        global $cfg_basehost,$cfg_basedir,$cfg_cmspath,$cfg_multi_site,$dsql;
        $str = $cfg_basehost."\r\n";
        $murl = $cfg_basedir.$cfg_cmspath."/sitemap.txt";
        $dsql->Execute('me',"SELECT * FROM #@__arctype");
        while($arcRow = $dsql->GetArray())
        {
            $typeurl = GetTypeUrl($arcRow['id'],$arcRow['typedir'],$arcRow['isdefault'],$arcRow['defaultname'],
                        $arcRow['ispart'],$arcRow['namerule2'],$arcRow['moresite'],$arcRow['siteurl'],$arcRow['sitepath']);
             
            if($cfg_multi_site == 'N' && $arcRow['ispart'] != 2)
            {
                $str .= $cfg_basehost.$typeurl."\r\n";
            }else{
                $str .= $typeurl."\r\n";
            }
        }
        $query = "Select arc.id,arc.title,arc.shorttitle,arc.typeid,arc.ismake,arc.senddate,arc.arcrank,arc.money,arc.filename,arc.litpic,
                            t.typedir,t.typename,t.namerule,t.namerule2,t.ispart,t.moresite,t.siteurl,t.sitepath
                            from `#@__archives` arc left join #@__arctype t on arc.typeid=t.id  WHERE arc.ismake > 0 ";
        $dsql->Execute('a1',$query);
        while($aRow = $dsql->GetArray('a1'))
        {
            $arcurl = GetFileUrl($aRow['id'],$aRow['typeid'],$aRow['senddate'],$aRow['title'],$aRow['ismake'],
                        $aRow['arcrank'],$aRow['namerule'],$aRow['typedir'],$aRow['money'],$aRow['filename'],$aRow['moresite'],$aRow['siteurl'],$aRow['sitepath']);
            if($cfg_multi_site == 'N')
            {
                $str .= $cfg_basehost.$arcurl."\r\n";
            }else{
                $str .= $arcurl."\r\n";
            }
        }
        file_put_contents($murl,$str);
        echo "<a href='/sitemap.txt' target='_blank'>成功更新文件: /sitemap.txt 浏览...</a>";
        exit();
    }
    
}