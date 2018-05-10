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
       $murl_nose=$cfg_cmspath."/sitemap_nose.xml";
       $murl_eye=$cfg_cmspath."/sitemap_eye.xml";
       $murl_axunge=$cfg_cmspath."/sitemap_axunge.xml";
       $murl_breast=$cfg_cmspath."/sitemap_breast.xml";
       $murl_genitalia=$cfg_cmspath."/sitemap_genitalia.xml";
       $murl_liposculpture=$cfg_cmspath."/sitemap_liposculpture.xml";
       $murl_embroidery=$cfg_cmspath."/sitemap_embroidery.xml";
       $murl_laser=$cfg_cmspath."/sitemap_laser.xml";
       $murl_injection=$cfg_cmspath."/sitemap_injection.xml";
       $murl_beauty=$cfg_cmspath."/sitemap_beauty.xml";

       $murl = $cfg_cmspath."/sitemap.xml";

      // 各个栏目的sitemap索引模板

       $tmpfile_nose = SEOTEMPLETS."/admin/sitemap_nose.xml";
       $tmpfile_eye = SEOTEMPLETS."/admin/sitemap_eye.xml";
       $tmpfile_axunge = SEOTEMPLETS."/admin/sitemap_axunge.xml";
       $tmpfile_breast = SEOTEMPLETS."/admin/sitemap_breast.xml";
       $tmpfile_genitalia = SEOTEMPLETS."/admin/sitemap_genitalia.xml";
       $tmpfile_liposculpture = SEOTEMPLETS."/admin/sitemap_liposculpture.xml";
       $tmpfile_embroidery = SEOTEMPLETS."/admin/sitemap_embroidery.xml";
       $tmpfile_laser = SEOTEMPLETS."/admin/sitemap_laser.xml";
       $tmpfile_injection = SEOTEMPLETS."/admin/sitemap_injection.xml";
       $tmpfile_beauty = SEOTEMPLETS."/admin/sitemap_beauty.xml";

       $tmpfile = SEOTEMPLETS."/admin/sitemap.xml";

        $pv = new PartView();

      //加载 模板
       $pv->SetTemplet($tmpfile_nose);
        $pv->SaveToHtml($cfg_basedir.$murl_nose);


       $pv->SetTemplet($tmpfile_eye);
        $pv->SaveToHtml($cfg_basedir.$murl_eye);

       $pv->SetTemplet($tmpfile_axunge);
        $pv->SaveToHtml($cfg_basedir.$murl_axunge);


       $pv->SetTemplet($tmpfile_breast);
        $pv->SaveToHtml($cfg_basedir.$murl_breast);


        $pv->SetTemplet($tmpfile_genitalia);
        $pv->SaveToHtml($cfg_basedir.$murl_genitalia);


        $pv->SetTemplet($tmpfile_liposculpture);
        $pv->SaveToHtml($cfg_basedir.$murl_liposculpture);

        $pv->SetTemplet($tmpfile_embroidery);
        $pv->SaveToHtml($cfg_basedir.$murl_embroidery);

        $pv->SetTemplet($tmpfile_laser);
        $pv->SaveToHtml($cfg_basedir.$murl_laser);

        $pv->SetTemplet($tmpfile_injection);
        $pv->SaveToHtml($cfg_basedir.$murl_injection);

        $pv->SetTemplet($tmpfile_beauty);
        $pv->SaveToHtml($cfg_basedir.$murl_beauty);


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
