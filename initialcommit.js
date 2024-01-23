/*
Early Access Audit
This site utilizes several API's to collect information about steam games.


Features I want:
1) leaderboards (negative)
    a) oldest games currently in early access
    b) most revenue while in early access
    c) longest time in early access altogether
    d) time since last game update
2) leaderboards (positive)
    a) average rating reception after leaving early access
3) game search
    provides:
        name of the game
        whether the game is currently in early access
        whether the game ever was in early access
        how long the game was/has been in early access
4) developer search
    provides:
        list of game names
        whether each game is in early access

4) game review collection
    pulls reviews from Steam/other sources





Database Requirements
    -name of the game
    -game's appid
    -game's funding while in early access
    -game's date of early access release
    -game's date of full release 
    -game's date of last update
    -game's developer


mvp:
website with a game-search option
when a game is entered, assuming the game is found, it provides the following information:
Game name
whether it has been in or is currently in early access
the total time it spent/has spent in early access
time since the last patch
the name of the game's developer and publisher
an image from the game

Example for the search "Blazing Sails":
Blazing Sails
⭐Completed release after early access⭐
Early Access release date: Sep 9, 2020
Full release date: Nov 13, 2023
Total time in early access: 3 years, 2 months, 4 days 😟
Date of last patch: Jan 6, 2024 😌
Developer: Get Up Games
Publisher: Iceberg Interactive

Example for the search "Valheim":
Valheim
😳Long term early access😳
Early Access release date: Feb 2, 2021
Total time in early access: 2 years, 11 months, 21 days 😟
Date of last patch: Dec 14, 2024 😌
Developer: Iron Gate AB
Publisher: Coffee Stain Publishing

Example for the search "Project Zomboid":
Project Zomboid
💀Eternally early access💀
Early Access release date: Nov 8, 2013
Total time in early access: 10 years, 2 months, 15 days 💀
Date of last patch: Dec 8 2022 😌
Developer: The Indie Stone
Publisher: The Indie Stone

Using steam's native API basic search, I have access to the following (based on a given appid):
    -game name
    -developer name
    -publisher name
    -whether it has an early access tag
    -most recent release date (either early access, OR full).
What I need to find a way to get information on:
    -if fully released, whether it was ever early access (likely by looking at whether it ever had the early access tag)
    -if reformed, when it was originally early access


*/