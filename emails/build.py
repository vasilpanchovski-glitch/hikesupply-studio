from base import *
U='?utm_source=email&utm_medium=email&utm_campaign={}'
g='https://hikesupplyco.com/products/beginners-hiking-guide'
e2=page("Most first hikes go wrong for the same three reasons. Here is how to avoid them.", "".join([
 H.format("3 mistakes that end most first hikes"),
 P.format("Most first hikes that go wrong don't fail because of fitness. They fail because of a few small planning gaps. Here are the three we see most, and the easy fix for each."),
 H3.format("1. Starting too late"),
 P.format("Daylight runs out faster than you think, especially in autumn and winter. Check sunset time before you go, set a turnaround time, and head back when you reach it, even if you haven't made the top."),
 H3.format("2. Wearing cotton"),
 P.format("Cotton soaks up sweat and rain and stays wet, which can chill you fast when the wind picks up. Wear synthetic or wool layers and pack a light jacket, even on a sunny morning."),
 H3.format("3. Not telling anyone your plan"),
 P.format("Before you leave, tell someone where you're going, which trail you'll take and when you expect to be back. Cell service on trails is often patchy, so this simple step matters."),
 P.format("Want the full picture before your first trail? Our Beginner's Hiking Guide walks you through the basics step by step."),
 prod("https://cdn.shopify.com/s/files/1/0986/3885/6499/files/product-image-guide.jpg?v=1787088463","Beginner's Hiking Guide","9.99",g+U.format('welcome2')),
 P.format("Your code WELCOME10 still works for 10% off your first order."),
 BTN.format(g+U.format('welcome2'),"See the guide"),
]))
open('welcome2.html','w').write(e2)
items=[("https://cdn.shopify.com/s/files/1/0986/3885/6499/files/Gemini_Generated_Image_y6l6dny6l6dny6l6.jpg?v=1789592001","Lightweight Trail Backpack — Unisex","39.99","https://hikesupplyco.com/products/lightweight-trail-backpack"),
("https://cdn.shopify.com/s/files/1/0986/3885/6499/files/Gemini_Generated_Image_xk5ebxk5ebxk5ebx.jpg?v=1789590744","Folding Trekking Pole — 4-Section Aluminium (Single)","19.99","https://hikesupplyco.com/products/folding-trekking-pole"),
("https://cdn.shopify.com/s/files/1/0986/3885/6499/files/product-image-guide.jpg?v=1787088463","Beginner's Hiking Guide","9.99",g)]
e3=page("WELCOME10 gives you 10% off your first order. A few picks to start with.", "".join([
 H.format("Your 10% code is still waiting"),
 P.format("Just a quick reminder: code WELCOME10 gives you 10% off your first order at hikesupplyco.com. Enter it at checkout."),
 P.format("If you're not sure where to start, these are the things new hikers pick most often:"),
 *[prod(i,n,p,u+U.format('welcome3')) for i,n,p,u in items],
 BTN.format("https://hikesupplyco.com/collections/all"+U.format('welcome3'),"Shop the store"),
 P.format("Questions about gear or a trail? Just reply to this email."),
]))
open('welcome3.html','w').write(e3)
