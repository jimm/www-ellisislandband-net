---
layout: default
title: Contact
---

{% include pic.html class="schedule-logo" width="300" src="Ellis_Island_Business_Card_01.png"
     alt="Ellis Island Business Card Front" %}

# Contact Ellis Island

Would you like to join our mailing list? Want to book Ellis Island for a
gig? Wondering how many bottles of Kentucky Bourbon the band goes through
during a typical rehearsal? Get in touch!

<ul class="social-media-list">
  <li>
    {% include email_link.html %}
  </li>

  {% if site.facebook_username %}
    <li>
      {% include facebook_link.html %}
    </li>
  {% endif %}

  {% if site.instagram_username %}
    <li>
      {% include instagram_link.html %}
    </li>
  {% endif %}

  {% if site.youtube_username %}
    <li>
      {% include youtube_link.html %}
    </li>
  {% endif %}

  {% if site.twitter_username %}
    <li>
      {% include twitter_link.html %}
    </li>
  {% endif %}
</ul>
