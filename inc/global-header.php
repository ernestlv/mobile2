<?php 
    $search = $_GET["s"];
?>

    <header>

        <div class="ad" id="leaderboard">
            <img src="imgs/s.gif" alt="" width="300" height="50">
        </div>

        <div class="bd">

            <h1><a href="/">Cooking Channel</a></h1>

            <div class="search-wrap">
                <button class="search-btn"><span>Search</span></button>
                <form action="form.php" method="post" class="search-bar"> 
                    <label for="search-header"></label>
                    <input type="search" name="search" id="search-header" placeholder="Search Recipes, Shows &amp; Chefs" />
                    <span class="buttons"><button>Search</button></span>
                </form>
            </div>
            <script type="text/javascript">SNI.M.Search();</script>
        </div>

        <nav>
            <ul>
                <li><a href="#" class="active">Shows</a></li>
                <li><a href="#">Chefs</a></li>
                <li><a href="#">Recipes</a></li>
                <li><a href="#">Videos</a></li>
            </ul>
        </nav>

    </header>
