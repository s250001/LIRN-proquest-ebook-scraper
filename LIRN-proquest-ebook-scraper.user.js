// ==UserScript==
// @name         LIRN ProQuest Ebook Scraper
// @namespace    https://github.com/gekkedev/LIRN-proquest-ebook-scraper
// @updateURL    https://raw.githubusercontent.com/gekkedev/LIRN-proquest-ebook-scraper/main/LIRN-proquest-ebook-scraper.user.js
// @downloadURL  https://raw.githubusercontent.com/gekkedev/LIRN-proquest-ebook-scraper/main/LIRN-proquest-ebook-scraper.user.js
// @version      1.0
// @description  Automatically downloads entire ebooks from LIRN ProQuest Ebook Central as a PDF, triggered by user action.
// @match        https://*ebookcentral-proquest-com.proxy.lirn.net/lib/*/reader.action?docID=*
// @grant        GM_registerMenuCommand
// @grant        GM_notification
// @require      https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js
// ==/UserScript==

(function() {
  'use strict';
  const softwareTitle = "LIRN ProQuest Ebook Scraper";

  async function scrollThroughPages() {
    function getCurrentPageNumber() {
      return document.getElementById("tool-current-page-loc").innerText;
    }

    function goForward() {
      document.getElementById("tool-pager-next").click();
    }

    function goBackward() {
      document.getElementById("tool-pager-prev").click();
    }

    let lastPageNumber = null;
    while (true) {
      const currentPage = getCurrentPageNumber();
      if (currentPage == lastPageNumber) {
        if (confirm("Is " + currentPage + " the first page's number?")) break;
        await new Promise(resolve => setTimeout(resolve, 1000)); // Let's give it a second
      }
      lastPageNumber = currentPage;
      goBackward();
      //await new Promise(resolve => setTimeout(resolve, 100));
    }

    lastPageNumber = null;
    while (true) {
      const currentPage = getCurrentPageNumber();
      if (currentPage == lastPageNumber) {
        //wait, because there could be a hiccup
        await new Promise(resolve => setTimeout(resolve, 1000)); // Let's give it a second
        if (getCurrentPageNumber() == lastPageNumber) break; //still unchanged?
      }
      lastPageNumber = currentPage;
      goForward();
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }

  async function convertImagesToPDF(imageTags) {
    const pdf = new jspdf.jsPDF();

    for (let i = 0; i < imageTags.length; i++) {
      const img = imageTags[i];
      await new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const imgData = canvas.toDataURL("image/jpeg");
        const imgWidth = 210;
        const imgHeight = (canvas.height / canvas.width) * imgWidth;

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
        resolve();
      });
    }
    const title = document.getElementsByClassName("book-title")[0]?.innerText || "downloaded_book";
    pdf.save(`${title}.pdf`);
  }

  // Register the menu command to trigger the process
  GM_registerMenuCommand("Start Ebook Scraping", async function() {
    GM_notification("Starting ebook download process...", softwareTitle);
    await scrollThroughPages();

    //wait for the browser to cache enough iamges to begin
    GM_notification("Waiting for images to load (15 seconds)...", softwareTitle);
    await new Promise(resolve => setTimeout(resolve, 15000));
    const imageTags = document.querySelectorAll("div > img[src*='docImage.action']");
    GM_notification(`Found ${imageTags.length} images to save.`, softwareTitle);
    await convertImagesToPDF(imageTags);
    GM_notification("Download complete!", softwareTitle);
  });
})();
