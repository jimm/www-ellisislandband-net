---
layout: default
title: Song List
---

# Song List

<p>Click "Song" or "Artist" to sort the list.</p>
<table class="songlist" id="songlist">
<tr>
  <th>&nbsp;</th>
  <th class="sorter" onclick="sort_by_title();">Song</th>
  <th class="sorter" onclick="sort_by_artist();">Artist</th>
</tr>
<script>insert_song_list();</script>
</table>
<script>sort_by_title();</script>
