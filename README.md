Dabox
=====

Dependencies
-----
 * Request
 * M4Tween
 
Usage
-----
```html
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
```

Vidéos
```html
<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <script src="https://dependencies.arnaud-nicolas.fr/?need=Dabox"></script>
        <script src="path/to/lib/DaboxVideo.js"></script>
        <style>
            .list{display:flex;flex-wrap: wrap;}
            .video_container{position:relative;margin-right:5px;margin-bottom:5px;}
            .video_container video{cursor:pointer;}
            .video_container video:hover+.duration{opacity:0;}
            .video_container .duration{transition:opacity .3s;opacity:1;font-weight:bold;pointer-events: none;position:absolute;bottom:3px;right:3px;background:#000;color:#fff;font-family:Arial,sans-serif;font-size:10px;display:block;padding:3px;}
        </style>
    </head>
    <body>
        <div class="list">
            <div class="video_container">
                <video data-handler="DaboxVideo" width="400" data-preview-count="30" data-preview-interval="750" data-video-width="1000">
                    <source src="https://splf.fr/ventoline/&flux=4">
                </video>
            </div>
        </div>
</body>
</html>
```