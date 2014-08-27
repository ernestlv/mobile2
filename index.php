<?php 
    session_start(); 
    
    $template = $_GET["t"];
    $_SESSION['viewport'] = ""; // store session data
    ini_set("include_path", "." . PATH_SEPARATOR . "../" . PATH_SEPARATOR . "./inc" . PATH_SEPARATOR . "../inc");
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1" />
        <title>Cooking Channel Mobile</title>

        <link rel="stylesheet" href="css/style.css" />
        <link rel="apple-touch-startup-image" href="http://192.168.1.24/CookingChannel/imgs/CCM-touchIcon.png">

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
        <script src="js/site.js"></script>
        <script src="js/local.js"></script>

    </head>
    <body class="<?php echo $_SESSION['viewport']; ?>">

        <div class="page">

            <?php include ('inc/global-header.php'); ?>

            <div role="main">

                <?php 
                    if (isset($template)) {
                        include "templates/" . $_GET["t"] . ".php";
                    }
                    else {
                        echo "<p>You needs to pass a querystring to see a template other than the home page. Try: <a href=\"?t=home\">Home</a>, <a href=\"?t=shows_all\">Shows</a>, <a href=\"?t=shows_detail\">Shows Detail</a>, <a href=\"?t=episode_page\">Episode Page</a></p>";
                        include "templates/home.php";
                    }
                ?>

            </div>

            <?php include('inc/global-footer.php'); ?>

        </div>

        <div class="warn">
          <?php
            $dir = "templates";
            $handle = opendir($dir);
            echo "<p>+</p>";
            echo "<ul>";
            echo "<li>Template</li>";
            while($name = readdir($handle)) {
                if(is_dir("$dir/$name")) {
                    if($name != '.' && $name != '..') {
                        echo "directory: $name\n";
                    }
                }
                elseif(is_link("$dir/$name")) {
                    echo "link: $name\n";
                }
                else {
                    $display_name = str_replace("_", " ", substr(ucwords($name), 0, -4));

                    if (substr($name, 0, -4) == $template) { 
                        echo "<li class='current'><a href='?t=" . substr($name, 0, -4) . "'>" . $display_name . "</a></li>";
                    }
                    else {
                        echo "<li><a href='?t=" . substr($name, 0, -4) . "'>" . $display_name . "</a></li>";
                    }
                                        
                }
            }
            echo "</ul>";
            closedir($handle);
        ?>

        </div>

    </body>
</html>