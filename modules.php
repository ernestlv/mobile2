<?php 
    session_start(); 
    
    $template = $_GET["t"];
    $_SESSION['viewport'] = "landscape"; // store session data

    ini_set("include_path", ".:../:./inc:../inc");
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1" />
        <title>Cooking Channel Mobile</title>

        <link rel="stylesheet" href="css/style.css" />

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
        <script src="js/site.js"></script>
        <script src="js/local.js"></script>

        <style type="text/css">
            h4.tit {cursor:pointer;padding: 0 14px;}
            h4.tit:hover {color: #4E8B2D}
            h4.tit.on {background-color: #4E8B2D;color:#FFF;padding: 14px;}
            h4.tit + section, h4.tit + div, h4.tit + h2, h4.tit ~ p {display: none}
        </style>

        <script type="text/javascript">
            $(function() {
                $('h4').on('click',function() {
                    var $this = $(this);
                    $this.toggleClass('on');
                    $this.next().slideToggle('fast', function () {
                        //$('html,body').animate({scrollTop: $this.offset().top-14});
                    });
                });
                $('.expand').on('click',function () {
                    $('h4.tit + section, h4.tit + div, h4.tit + h2, h4.tit ~ p').show();                    
                    $(this).text('Expanded Booya!');
                    $.each('h4', function () {
                        $('h4').addClass('on');
                    });
                });
            });
        </script>           

    </head>
    <body class="<?php echo $_SESSION['viewport']; ?>">

        <div class="page">

            <?php include ('inc/global-header.php'); ?>

            <div role="main">

               <?php
                $dir = "inc";
                $exclude = ".|..|.DS_Store|.svn|global-header.php|global-footer.php|accordion.php|ad_footer.php|lead-section-h2.php|crsl-date-picker-plain.php";
                $exclude_array = explode("|", $exclude);
                $handle = opendir($dir);
                while($name = readdir($handle)) {
                    if(is_dir("$dir/$name")) {
                        if($name != '.' && $name != '..') {
                            //echo "directory: $name\n";
                        }
                    }
                    elseif (!in_array($name,$exclude_array)) {
                        echo "<h4 class='tit'>" . $name . "</h4>";
                        include('inc/' . $name);
                    }
                }
                closedir($handle);
            ?>

            </div>

            <div class="warn">
                <p><a href="#" class="expand">Expand All</a></p>
            </div>

            <?php include('inc/global-footer.php'); ?>

        </div>

    </body>
</html>