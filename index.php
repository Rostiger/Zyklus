<!DOCTYPE html>
<html lang="en">
<head>

	<!-- Basic Page Needs
	–––––––––––––––––––––––––––––––––––––––––––––––––– -->
	<meta charset="utf-8">
	<title>Zyklus</title>
	<meta name="description" content="">
	<meta name="author" content="">
	<meta http-equiv="Cache-control" content="no-cache">

	<!-- Mobile Specific Metas
	–––––––––––––––––––––––––––––––––––––––––––––––––– -->
	<meta name="viewport" content="user-scalable=no, width=device-width" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

	<!-- CSS
	–––––––––––––––––––––––––––––––––––––––––––––––––– -->
	<link rel="stylesheet" href="links/fonts.css">
	<link rel="stylesheet" href="links/main.css">

	<!-- Favicon
	–––––––––––––––––––––––––––––––––––––––––––––––––– -->
	<link rel="apple-touch-icon" sizes="180x180" href="assets/favicon/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="assets/favicon/favicon-16x16.png">
	<link rel="manifest" href="assets/favicon/site.webmanifest">
	<link rel="mask-icon" href="assets/favicon/safari-pinned-tab.svg" color="#5bbad5">
	<link rel="shortcut icon" href="assets/favicon/favicon.ico">
	<meta name="apple-mobile-web-app-title" content="Zyklus">
	<meta name="application-name" content="Zyklus">
	<meta name="msapplication-TileColor" content="#ebd33f">
	<meta name="msapplication-config" content="assets/favicon/browserconfig.xml">
	<meta name="theme-color" content="#ffffff">
	
	<!-- Scripts -->
	<script type='text/javascript' src='scripts/helpers.js'></script>
	<script type='text/javascript' src='scripts/lib/theme.js'></script>
	<script type='text/javascript' src='scripts/datepicker.js'></script>
	<script type='text/javascript' src='scripts/entry.js'></script>
	<script type='text/javascript' src='scripts/menuItem.js'></script>
	<script type='text/javascript' src='scripts/io.js'></script>
	<script type='text/javascript' src='scripts/interface.js'></script>
	<script type='text/javascript' src='scripts/zyklus.js'></script>	
</head>
<body>
	<script>
		'use strict'
		const defaultTheme = {
			background: '#29272b',
			f_high: '#FF68A3',
			f_med: '#EBD33F',
			f_low: '#42C2EE',
			f_inv: '#43423E',
			b_high: '#E8E9E2',
			b_med: '#C2C1BB',
			b_low: '#4B4B49',
			b_inv: '#0C0B05'
		}
		const theme = new Theme(defaultTheme)
		theme.install(document.body)
		theme.start()
	</script>
<div id="zyklus">
<?php 
if($_GET['action'] == 'logout'){ 
    session_start(); 
    session_unset(); 
    session_destroy(); 
} 

if(isset($_POST['login'])){ 
    $filepath = './users/' . $_POST['username'] . '/user.txt'; 
    if(file_exists($filepath)){ 
        $userdata = file($filepath); 
        // $userdata[2] enthaelt den Passwort-Hash 
        if(trim($userdata[1]) != md5($_POST['password'])){ 
            // Hier verweigern Sie den Zutritt. 
            header('location: ' . $_SERVER['PHP_SELF'] . '?error'); 
            exit(); 
        } 
        session_start(); 
        // $userdata[0] enthaelt die User ID. 
        $_SESSION['uname'] = trim($userdata[0]); 
        // $userdata[1] enthaelt den Username. 
        $_SESSION['umail'] = $_POST['username']; 
        header('location: ./'); 
    } else { header('location: ' . $_SERVER['PHP_SELF'] . '?error'); }

}else{ 
session_start(); 
if(!empty($_SESSION['uname'])){
$var = "test" ?>
	<script>
		'use strict'
		const username = "<?php echo $_SESSION['umail'] ?>"
		const zyklus = new Zyklus()
		zyklus.install(document.body)
		zyklus.start()
	</script>
<?php 
} else {
	if (isset($_GET['error'])) $title = '<header class="fail"><h1>Authentication failed.</h1></header>';
	else $title = '<header><h1>Zyklus Login</h1></header>';
?>
<figure>
	<?= $title ?>
	<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post"> 
		<section>
		    <label for="username"><h2>Username</h2></label>
		    <input type="text" name="username" id="username" /> 
		</section>
		<section>
		    <label for="password"><h2>Password</h2></label>
		    <input type="password" name="password" id="password" /> 
		</section>
		<section>
	    <input class="button" type="submit" name="login" value="Login"/> 
		</section>
	</form>
	</section>
</figure>
<?php 
}
}
?>
</div>
</body> 
</html>