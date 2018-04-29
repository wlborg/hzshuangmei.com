<?php

require_once(dirname(__FILE__).'/config.php');
require_once(DEDEINC.'/tools.class.php');

switch($a){
	
	case "siteinfo":
		$tools = new tools();
		$tools->seturl($url);
		$rs["baidunum"] = $tools->get_baidu_total();
		$rs["baiduup"] = $tools->get_baidu_update();
		$rs["pr"] = $tools->get_google_pr();
		$rs["alexa"] = $tools->get_alexa();
		echo json_encode($rs);
	break;
	
	case "linknumup":
		$tools = new tools();
		$tools->seturl($url);
		$rs["baidunum"] = $tools->get_baidu_total();
		$rs["baidunum"] = $rs["baidunum"]<10?"<font color=red>".$rs["baidunum"]."</font>":$rs["baidunum"];
		$rs["baiduup"] = $tools->get_baidu_update();
		if($rs["baiduup"]<0 || time() - strtotime($rs["baiduup"])>3600*24*5){
			$rs["baiduup"] = "<font color=red>".$rs["baiduup"]."</font>";
		}
		echo json_encode($rs);
	break;

	case "linkpr":
		$tools = new tools();
		$tools->seturl($url);
		$rs["pr"] = $tools->get_google_pr();
		echo json_encode($rs);
	break;
	
	case "linkhl":
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_TIMEOUT, 20);
		$output = curl_exec($ch);

		if(empty($output)){
			$rs['huilian'] = "<font color=red>查询失败，请重试</font>";
		}else{
			preg_match_all("/<a[^>]*?http:\/\/[^>]*?>.*?<\/a>/i", $output, $mt);
			if(preg_match('/charset=utf-8/i', $output)){
				$char = 'utf-8';
			}
			$v = array();
			$n = 0;
			foreach($mt[0] as $r){
				if(strpos($r, $url)===false){
					$n++;
				}
				if(strpos($r, $myurl)!==false){
					$hlname = strip_tags($r);
					if(!empty($char) && $cfg_soft_lang!=$char){
						$hlname = utf82gb($hlname);
					}elseif(empty($char) && $cfg_soft_lang!='gb2312'){
						$hlname = gb2utf8($hlname);
					}
				}
			}
			if(empty($hlname)){
				$rs['huilian'] = "<font color=red>首页无本站链接</font>";
			}else{
				$rs['huilian'] = "链接:".$hlname." 外链数:".$n;
			}		
		}
		if($cfg_soft_lang=='gb2312'){
			$rs['huilian'] = gb2utf8($rs['huilian']);
		}
		echo json_encode($rs);
	break;
	
}

