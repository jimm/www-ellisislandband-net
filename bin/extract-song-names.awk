BEGIN                     { in_songs = 0 }
/^\* Songs$/              { in_songs = 1 }
/^\* / && !/^\* Songs$/   { in_songs = 0 }
in_songs == 1 && /^\*\* / { print }
