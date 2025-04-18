# LIRN ProQuest Ebook Scraper
Automatically downloads entire ebooks from LIRN ProQuest Ebook Central as a PDF, triggered by user action.

## Disclaimer
This userscript is intended for educational and research purposes only. LIRN ProQuest Ebook Central or any affiliated parties do not endorse it. Using this script may violate the terms of service of LIRN ProQuest Ebook Central, and users are responsible for ensuring compliance with all applicable laws and copyright regulations. Unauthorized downloading, distribution, or reproduction of copyrighted material is usually prohibited. This tool only bundles image files that **have already been downloaded by the visited webpage** into a single file. It was developed **for educational purposes only**.

By using this script, you acknowledge and agree that the developers are not responsible for any legal consequences that may arise from its use. It is recommended to only use this tool with material you have the right to access or download, and to respect the intellectual property rights of authors and publishers.

# Installation
1. get a userscript runner

**Google Chrome**: Install [Violentmonkey](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag) or [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo).  
**Mozilla Firefox**: Install [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/), or [Violentmonkey](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/), or [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/).  
**Opera**: Install [this](https://addons.opera.com/en/extensions/details/install-chrome-extensions/) extension first, then you can install Violentmonkey or Tampermonkey from the Chrome extension store.  
**Microsoft Edge**: Install [Violentmonkey](https://microsoftedge.microsoft.com/addons/detail/violentmonkey/eeagobfjdenkkddmbclomhiblgggliao) or [Tampermonkey](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd) from the Edge Add-On Repository.

2. Click [here](https://raw.githubusercontent.com/gekkedev/LIRN-proquest-ebook-scraper/main/LIRN-proquest-ebook-scraper.user.js)
3. Open the viewing mode of an ebook on *ProQuest Ebook Central*
4. Select "Start ebook scraping"  
![](1.png)
5. Wait until all pages have been requested:  
![](2.gif)
6. The download should start automatically:  
![](3.png)

## Troubleshooting
Missing pages at the end?  
The software aborts for no apparent reason?

Retrying (without reloading the page) might help, especially with large books. Retries are much faster because images don't need to be cached twice.