<?php

/**
 * @version    $Id tools.class.php 1001 2011-5-6 qjp $
 * @copyright  Copyright (c) 2010-2011,qjp
 * @license    This is NOT a freeware, use is subject to license terms
 * @link       http://www.qjp.name
 */

class tools
{
    public $url='';
    public $host='';
    public $googleip;
    public $googleipfile;
    public $baidupage;
    
    public function __construct()
    {
        //$this->googleipfile = ROOT.DS.'googleip.txt';
    }

	public function curl($url)
	{
		$ch  = curl_init($url);
		curl_setopt($ch,CURLOPT_USERAGENT,'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.2)');
        curl_setopt($ch,CURLOPT_TIMEOUT, 15);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
		curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,2);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		$str = curl_exec($ch);
		curl_close($ch);
		return $str;   
	}
    
    public function googleip()
    {
        // 新算法
        return 'toolbarqueries.google.com';
        
        if(empty($this->googleip))
        {
            $fp = fopen($this->googleipfile,'r');
            while (!feof($fp))
            {
                $line = fgets($fp);
                $line = trim($line);
                if(!empty($line))
                {
                    $this->googleip[] = $line;
                }
            }
            fclose($fp);
        }
        $count = count($this->googleip);
        $rand = mt_rand(0,$count);
        return $this->googleip[$rand];
    }
    
    public function genhash($url){
    	$SEED   = "Mining PageRank is AGAINST GOOGLE'S TERMS OF SERVICE. Yes, I'm talking to you, scammer.";
        $Result = 0x01020345;
        for ($i=0; $i<strlen($url); $i++){
            $Result ^= ord($SEED{$i%87}) ^ ord($url{$i});
            $Result  = (($Result >> 23) & 0x1FF) | $Result << 9;
        }
        return sprintf("8%x", $Result);
    }

    public function seturl($url)
    {
        $url = $this->valid_host($url);
        if($url!==false)
        {
            $this->url = 'http://'.$url;
            $this->host = $url;
            return $url;
        }else
        {
            return false;
        }
    }

    public function valid_host($url)
    {
        $url = str_replace(array('https://','http://'),'',$url);
        $url = trim($url, '/');
        if(preg_match("/^([A-Z0-9][A-Z0-9_-]*(?:\.[A-Z0-9][A-Z0-9_-]*)+):?(\d+)?\/?/i",$url))
        {
            return $url;
        }
        return false;
    }

    //google pr 结果url ,用于站长工具，iframe调用，防止屏蔽
    public function get_google_pr_url()
    {
        $checksum = $this->genhash($this->url);
		$googleurl  = 'http://'.$this->googleip().'/tbr?features=Rank&client=navclient-auto&ie=UTF-8&oe=UTF-8';
		$googleurl .= '&ch='.$checksum.'&q=info:'.urlencode($this->url);
        return $googleurl;
    }

    //google pr
	public function get_google_pr()
	{
        $googleurl = $this->get_google_pr_url();
		$out = $this->curl($googleurl);
		$pagerank = trim(substr($out, 9));
		if (!preg_match('/^[0-9]{1,2}/',$pagerank))
		{
			return -1;
		}
		return $pagerank;
	}
/*
    //google 收录数
	public function get_google_total()
	{
		$url = 'http://'.$this->googleip().'/custom?num=1&q='.urlencode('site:'.$this->host);
		$str = $this->curl($url);
		preg_match_all('#<b>(.*?)</b>#',$str,$matches);
        if(!empty($matches[1][2]))
        {
            $matches[1][2] = preg_replace('/[^0-9]/','',$matches[1][2]);
            if(!empty($matches[1][2]))
            {
                return $matches[1][2];
            }
        }
		return '暂时无法查询';
	}
*/
    //alexa 综合排名查询
    public function get_alexa()
    {
        $alexaurl = "http://data.alexa.com/data/+wQ411en8000lA?cli=10&dat=s&ver=7.0&url=".urlencode($this->host);
        $str = $this->curl($alexaurl);
        $reg = "/POPULARITY URL=\"(.+)\" TEXT=\"(.+)\"\/>/Ui";
        preg_match_all($reg, $str, $array);
        return isset($array[2][0])?intval($array[2][0]):-1;
    }

    public function down_baidu_page()
    {
        if(empty($this->baidupage))
        {
            $this->baidupage = 'http://www.baidu.com/s?rn=30&wd=site%3A'.$this->host;
            $this->baidupage = $this->curl($this->baidupage);
            //$this->baidupage = iconv('gbk','utf-8//ignore',$this->baidupage);
        }
        return $this->baidupage;
    }

    //百度收录数
    public function get_baidu_total()
    {
        $baidu = $this->down_baidu_page();
        $pattern = "/找到相关结果[^0-9]*([0-9,]*)个/";
        if(preg_match($pattern,$baidu,$mt)){
            return preg_replace('/[^0-9]/','',$mt[1]);
        }else{
            return -1;
        }
    }

    //百度快照
    public function get_baidu_update()
    {
        $baidu = $this->down_baidu_page();
        $host = $this->host;
        preg_match('/<span class="g">[\s]*(www\.)?'.$host.'\/&nbsp;([0-9]{4}\-[0-9]{1,2}\-[0-9]{1,2})/i',$baidu,$mt);
        return isset($mt[2])?$mt[2]:-1;
    }
}
?>