BEGIN                     { in_songs = 0 }
/^\* Old Songs to Display on the Website$/              { in_songs = 1 }
/^\* / && !/^\* Old Songs to Display on the Website$/   { in_songs = 0 }
in_songs == 1 && /^\*\* / { print }
