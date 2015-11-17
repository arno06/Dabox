Dabox
=====

Dependencies
-----
 * Request
 * M4Tween
 
Usage
-----
``html
<!DOCTYPE html>
<html>
	<head>
		<script src="path/to/lib/M4Tween.js"></script>
		<script src="path/to/lib/Request.js"></script>
		<script src="path/to/lib/Dabox.js"></script>
		<link href="path/to/lib/css/Dabox.css">
	</head>
	<body>
		<div id="one_div" style="display:none">
			<h1>bouboup</h1>
		</div>
		<ul>
			<li>
				<a href="some_page.html" rel="Dabox[async:some_page.html]">Some link with async loading</a>
			</li>
			<li>
				<a href="#" rel="Dabox[#one_div]">Some link opening div#one_div content</a>
			</li>
		</ul>
	<body>
</html>
``