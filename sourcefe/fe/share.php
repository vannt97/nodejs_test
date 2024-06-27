<!DOCTYPE html>
<html lang="en">
<head>
    <?php 
        // $meta = json_decode($_GET['object']);
     

	
         if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')   
         $url = "https://";   
            else  
                 $url = "http://";   
            // Append the host(domain name, ip) to the URL.   
            $url.= $_SERVER['HTTP_HOST'];   
            
            // Append the requested resource location to the URL   
            $url.= $_SERVER['REQUEST_URI'];    
          
	$parts = parse_url(urldecode($url));
	parse_str($parts['query'], $query);
	
	$image= $query['image'];
	$urllink= $query['url'];


    ?>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PediaSure - Tham Gia Ngay Thử Thách Mẫu Giáo Cao Lớn</title>
    <link rel="icon" type="image/x-icon" href="./favicon.ico">
    <meta name="author" content="Pediasure">
    <meta name="rating" content="general">
    <meta name="title" content="PediaSure - Tham Gia Ngay Thử Thách Mẫu Giáo Cao Lớn">
    <meta name="description" content="Tạo video từ ảnh bé và chia sẻ ngay để có cơ hội trúng quà hấp dẫn từ PediaSure mẹ nhé!">
    <meta property="og:title" content="PediaSure - Tham Gia Ngay Thử Thách Mẫu Giáo Cao Lớn">
    <meta property="og:site_name" content="Pediasure">
    <meta property="og:url" content="">
    <meta property="og:image" content="<?php echo $image ?>">
    <meta property="og:image:secure_url" content="<?php echo $image.'?mod='.time()?>">
    <meta property="og:type" content="website">
    <meta property="og:image:type" content="image/jpg/png" />
    <meta property="og:image:alt" content="@Pediasure" />
    <meta property="og:description" content="Tạo video từ ảnh bé và chia sẻ ngay để có cơ hội trúng quà hấp dẫn từ PediaSure mẹ nhé!" />
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="">
    <meta property="twitter:title" content="PediaSure - Tham Gia Ngay Thử Thách Mẫu Giáo Cao Lớn">
    <meta property="twitter:description" content="Tạo video từ ảnh bé và chia sẻ ngay để có cơ hội trúng quà hấp dẫn từ PediaSure mẹ nhé!">
    <meta name="twitter:creator" content="@Pediasure">
        <script>
          var metaUrl = '<?php echo $urllink ?>?s=1';
          if(metaUrl){
              window.location.href = metaUrl;
          }
        </script>
</head>
<body>
    
</body>
</html>