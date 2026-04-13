---
title: Setting up my website in 30m
date: 2026-04-12
draft: false
description: A short description of the process of setting up calumbest.net, written as a test subject for my first post.
slug: setting-up-my-website
---
Today I made this website in less than 30 minutes with Claude Code. This was my process:
1. I bought a domain name from [namecheap](https://www.namecheap.com/) for $12/year.
2. I started [Claude Code](https://code.claude.com/docs/en/overview) in a new folder in plan mode, explained what I wanted to do, and asked Claude to interview me about my preferences.
3. After some back-and-forth, we settled on [Hugo](https://gohugo.io/) for building the website and [Cloudflare](https://www.cloudflare.com/) for hosting it. Both of those are free at my expected levels of usage.
4. Claude wrote all the code in one shot, gave me step-by-step instructions for a few things it couldn't do, initialized a new GitHub repo, and published the site.
5. We worked on a few design improvements. Again, Claude one-shotted these.

So, the whole thing costs $12/year,[^2] and I'm deploying custom code instead of using a provider like WordPress. When I want to make improvements in the future, I'll just ask Claude Code for help. With my current publishing and code setup, I'll ~never need to actually visit my website to publish things on it.

Things I'm excited about with the new design:
- *Sidenotes!*[^1]
- *Simple publishing.* I wanted it to be very easy for me to jot out a quick note and publish it right away, without dealing with an annoying user interface and clicking a bunch of buttons. Claude helped me a set up a system where I just write normal Markdown notes in [Obsidian](https://obsidian.md/), then click a checkbox to confirm a draft is ready to publish. Then, a script runs every morning and publishes new posts. The script also picks up edits to previous posts.
- *Copy as Markdown.* Scroll to the bottom of any post and you'll see a "copy as markdown" button. This makes it easier for people to paste posts into AI chats.

I'll likely add email subscriptions after I write several more posts, but there's already an RSS feed (which Claude made without me asking, thanks Claude!). I'll also add commenting at some point.

There are several features that I see on many blogs and that I'll consider adding to mine, but I'm not sure whether their value would exceed the cost of clutter—I like a rather minimalist style. These are things like:
- Search.
- Tagging.
- Post descriptions (like, subheaders or small snippets).

I've thought about making a personal website for some time, but Claude Code made it super easy. I have an old [Substack](https://calphabetsoup.substack.com/), but for some reason Substack feels too heavy for the kinds of rough, not-very-considered posts that I'm currently most interested in writing. I'll probably still keep Substack for longer, more considered essays.

If you're interested in working on a similar project, feel free to [steal my code](https://github.com/calumbest/calumbestdotnet), but I'd really recommend just starting a conversation with Claude Code and describing what you want.

[^1]: I became excited about sidenotes recently when I saw them used on Coefficient Giving's [new website](https://coefficientgiving.org/research/open-philanthropy-is-now-coefficient-giving/) (Ctrl+F "years to come" to find the first one)—they seem much more convenient than footnotes because readers can simultaneously see body and sidenote text. If you're reading this on a computer, the sidenotes should automatically convert to footnotes when you reduce the window width. If you're on mobile, I have no idea what will happen - I'll find out when I publish this!

[^2]: Plus, I suppose, a miniscule portion of the $20/month Claude Code subscription I use.
