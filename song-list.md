---
layout: default
title: Song List
---

# Song List

<table class="slinfo">
  <tr>
    <td>
      Click "Song" or "Artist" to sort the list.
    </td>
    <td class="showhide">
      <input type="checkbox" id="acoustic-toggle" onclick="toggle_acoustic();">
      <label for="acoustic-toggle">Include Acoustic-Only Songs</label>
    </td>
  </tr>
</table>
<table class="songlist" id="songlist">
<thead>
  <tr>
    <th>&nbsp;</th>
    <th class="sorter" onclick="sort_by_title();">Song</th>
    <th class="sorter" onclick="sort_by_artist();">Artist</th>
  </tr>
</thead>
<tbody>
<tr><td>&nbsp;</td><td>&nbsp;&nbsp;&nbsp;...loading...</td><td></td></tr>
</tbody>
</table>
<script>insert_song_list();</script>

<br/>
