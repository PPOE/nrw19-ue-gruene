// eslint-disable max-len

<template>
<div class="container">
    <div id="generatedPdf" class="mx-auto text-center" v-if="pdfGenerated">
            <a v-bind:href="pdfUri" v-bind:download="filename" v-on:click="ie11DownloadPdf($event)"><font-awesome-icon icon="file-pdf" class="display-1 text-secondary" /></a>
            <p class="card-text">{{filename}} <br><small>(Generiert am {{new Date().toString()}})</small></p>

    </div>
</div>
</template>

<script>

import {
  PDFDocumentFactory, PDFDocumentWriter, StandardFonts, drawText, drawRectangle,
} from 'pdf-lib';

import uePdf from '../pdf/Unterstuetzungserklaerung_NR_mit_Anleitung.pdf';

// Scroll to element (used to scroll to generated pdf)
function scrollToElement(elementId) {
  const elmnt = document.getElementById(elementId);
  elmnt.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
}

// Modify pdf using pdf-lib
// https://github.com/Hopding/pdf-lib
function generatePdf(party, electionDate, stichtag, name, birthdate, address, zip, city, region) {
  // Get bytes from unit8 loader (statically added and compiled into the script)
  const existingPdfDocBytes = uePdf;

  const pdfDoc = PDFDocumentFactory.load(existingPdfDocBytes);

  const [helveticaRef, helveticaFont] = pdfDoc.embedStandardFont(
    StandardFonts.Helvetica,
  );

  const pages = pdfDoc.getPages();
  const page = pages[1];

  page.addFontDictionary('Helvetica', helveticaRef);

  // Add spaces between chars to fit the pdf spacing for the birthdate
  const dateString = birthdate.replace(/(.{1})/g, '$1    ');

  // Add text into pdf
  const contentStream = pdfDoc.createContentStream(
    drawText(helveticaFont.encodeText(party), {
      x: 75,
      y: 580,
      size: 14,
      font: 'Helvetica',
      colorRgb: [0, 0, 0],
    }),

    // Hide and override placeholder text in original pdf
    drawRectangle({
      x: 73,
      y: 623,
      width: 87,
      height: 13,
      borderWidth: 0,
      colorRgb: [1, 1, 1],
    }),
    drawText(helveticaFont.encodeText(electionDate), {
      x: 74,
      y: 626,
      size: 11,
      font: 'Helvetica',
      colorRgb: [0, 0, 0],
    }),

    // Hide and override placeholder text in original pdf
    drawRectangle({
      x: 55,
      y: 301,
      width: 89,
      height: 13,
      borderWidth: 0,
      colorRgb: [1, 1, 1],
    }),
    drawText(helveticaFont.encodeText(stichtag), {
      x: 56,
      y: 304,
      size: 11,
      font: 'Helvetica',
      colorRgb: [0, 0, 0],
    }),

    drawText(helveticaFont.encodeText(region || ''), {
      x: 370,
      y: 595,
      size: 12,
      font: 'Helvetica',
      colorRgb: [0, 0, 0],
    }),

    drawText(helveticaFont.encodeText(name || ''), {
      x: 120,
      y: 520,
      size: 12,
      font: 'Helvetica',
      colorRgb: [0, 0, 0],
    }),

    drawText(helveticaFont.encodeText(address || ''), {
      x: 120,
      y: 470,
      size: 12,
      font: 'Helvetica',
      colorRgb: [0, 0, 0],
    }),

    drawText(helveticaFont.encodeText(`${zip || ''} ${city || ''}`), {
      x: 120,
      y: 455,
      size: 12,
      font: 'Helvetica',
      colorRgb: [0, 0, 0],
    }),

    drawText(helveticaFont.encodeText(dateString), {
      x: 385,
      y: 455,
      size: 12,
      font: 'Helvetica',
      colorRgb: [0, 0, 0],
    }),
  );

  page.addContentStreams(pdfDoc.register(contentStream));

  const pdfBytes = PDFDocumentWriter.saveToBytes(pdfDoc);

  return pdfBytes;
}

export default {
  name: 'uepdfgen',
  data() {
    return {
      generateButtonLabel: 'Generiere meine vorausgefüllte Unterstützungserklärung',
      pdfGenerated: false,
      pdfBlob: null,
      pdfUri: '#',
      filename: 'Unterstuetzungserklaerung_NR.pdf',
    };
  },

  props: {
    fullname: String,
    address: String,
    zip: String,
    city: String,
    region: String,
    birthdate: String,
  },

  methods: {
    ie11DownloadPdf(event) {
      const vm = this;
      if (window.navigator.msSaveOrOpenBlob) {
        event.preventDefault();
        window.navigator.msSaveOrOpenBlob(vm.pdfBlob, vm.filename);
      }
    },
  },

  mounted() {
    const vm = this;

    setTimeout(() => {
      const party = 'Die Grünen - Die Grüne Alternative';
      const electionDate = '29. Sept. 2019';
      const stichtag = '09. Juli 2019';
      const region = vm.region === 'Bundesland' ? '' : vm.region;

      const pdfBytes = generatePdf(party, electionDate, stichtag, vm.fullname, vm.birthdate, vm.address, vm.zip, vm.city, region);
      vm.pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      vm.pdfUri = window.URL.createObjectURL(vm.pdfBlob);

      vm.pdfGenerated = true;
      vm.inProgress = false;

      // This is hacky. More elegant would be to install vue-observe-visibility and trigger this event based
      setTimeout(() => {
        scrollToElement('generatedPdf');
      }, 1);
    }, 0);
  },
};
</script>

<style>
  #generatedPdf {
    max-width: 500px;
  }

  .rounded-right-0 {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }

  .card-text small {
    font-size: 60%;
  }

</style>
