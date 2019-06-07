// eslint-disable max-len

<template>
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <form>

                <label for="fullname">Dein Name:</label>
                <input v-model="fullname" type="text" id="fullname" class="form-control mb-4" placeholder="Vorname Nachname">

                <div>
                    <label for="birthdate">Dein Geburtsdatum:</label>
                    <div class="row mb-4">
                        <div class="col-md-12">
                            <div class="input-group mb-3">
                                <datepicker v-model="calendar.date" input-class="form-control rounded-right-0" :typeable=false :language=de initial-view="year" id="birthdate" format="dd.MM.yyyy" class="flex-fill"></datepicker>
                                <div class="input-group-append">
                                    <span class="input-group-text"><font-awesome-icon icon="calendar"/></span>
                                </div>
                            </div>
                            <div v-if="new Date(calendar.date).getTime() > ageCheckMin" class="mt-2">
                                <span class="help-block text-danger">{{ageCheckText}}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <label for="street">Deine Meldeadresse:</label>
                <input v-model="address" type="text" id="street" class="form-control mb-2" placeholder="Straße, Hausnummer">

                <div class="row">
                    <div class="col-md-4 mb-2">
                        <input v-model="zip" type="text" id="zip" class="form-control" placeholder="Postleizahl">
                    </div>
                    <div class="col-md-4 mb-2">
                        <input v-model="city" type="text" id="city" class="form-control" placeholder="Ort">
                    </div>
                    <div class="form-group col-md-4">
                        <select class="form-control" id="region" v-model="region">
                            <option selected disabled>Bundesland</option>
                            <option></option>
                            <option>1 - Burgenland</option>
                            <option>2 - Kärnten</option>
                            <option>3 - Niederösterreich</option>
                            <option>4 - Oberösterreich</option>
                            <option>5 - Salzburg</option>
                            <option>6 - Steiermark</option>
                            <option>7 - Tirol</option>
                            <option>8 - Vorarlberg</option>
                            <option>9 - Wien</option>
                        </select>
                    </div>
                </div>

                <div class="custom-control custom-checkbox mt-4">
                    <input v-model="statistics" type="checkbox" class="custom-control-input" id="statistics" checked="checked">
                    <label class="custom-control-label " for="statistics">Ich bin mit der Übermittlung anonymisierter Daten zu statistischen Zwecken einverstanden<br><small>(Geburtsjahr, Postleizahl sowie eine Prüfziffer um Mehrfachübermittlungen zu erkennen)</small></label>
                </div>

                <div class="mt-4">
                    <p class="small text-justify">Die Generierung des PDFs findet vollständig im Browser (Clientseitig) statt, daher werden Name, Adresse und genaues Geburtsdatum niemals übertragen. Ist die Checkbox deaktiviert werden auch keine statistischen Daten übermittelt (Die Checkbox ist standardmäßig angekreuzt, weil wir bei anonymisierten Daten grundsätzlich kein Einvertsändnis bräuchten, im Sinne der Datensparsamkeit, aber die Möglichkeit offen lassen möchten keine Daten zu übermitteln. Rückschlüsse auf Name, Adresse oder genaues Geburtsdatum sind aus den anonymisierten Daten keinesfalls möglich).</p>
                </div>

                <button class="btn btn-primary my-4 btn-block" type="submit" v-on:click="submitButtonClicked($event)" :disabled="inProgress">
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="inProgress"></span>
                    <span v-if="!inProgress">{{generateButtonLabel}}</span>
                </button>

                <div id="generatedPdf" class="card text-center" v-if="pdfGenerated">
                    <div class="card-body">
                        <a v-bind:href="pdfUri" v-bind:download="filename" v-on:click="ie11DownloadPdf($event)"><font-awesome-icon icon="file-pdf" class="display-1 text-secondary" /></a>
                        <p class="card-text">{{filename}} <br><small>(Generiert am {{new Date().toString()}})</small></p>
                    </div>
                    <div class="card-footer text-muted">
                        <a v-bind:href="pdfUri" v-bind:download="filename" class="btn btn-success" v-on:click="ie11DownloadPdf($event)">Download</a>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>

import {
  PDFDocumentFactory, PDFDocumentWriter, StandardFonts, drawText, drawRectangle,
} from 'pdf-lib';

import encoding from 'text-encoding';
import datePicker from 'vuejs-datepicker';
import { de } from 'vuejs-datepicker/dist/locale';
import uePdf from './Unterstuetzungserklaerung_NR.pdf';

// Used to generate a uniqueID (hash) to detect multiple pdfs from the same person
function digestMessage(message) {
  const encoder = new encoding.TextEncoder();
  const data = encoder.encode(message);
  const crypto = window.crypto || window.msCrypto;
  return crypto.subtle.digest('SHA-256', data);
}

function hexString(buffer) {
  const byteArray = new Uint8Array(buffer);

  const hexCodes = [...byteArray].map((value) => {
    const hexCode = value.toString(16);
    const paddedHexCode = hexCode.padStart(2, '0');
    return paddedHexCode;
  });

  return hexCodes.join('');
}

// Convert Date object to string (ddmmyyyy)
function dateToString(calendarDate) {
  let dateString = '';

  if (calendarDate) {
    dateString = (`0${calendarDate.getDate()}`).slice(-2);
    dateString += (`0${calendarDate.getMonth() + 1}`).slice(-2);
    dateString += calendarDate.getFullYear();
  }

  return dateString;
}

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
  const page = pages[0];

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
      inProgress: false,
      pdfGenerated: false,
      pdfBlob: null,
      pdfUri: '#',

      ageCheckMin: 1057767300000,
      ageCheckText: 'Du musst am Stichtag (9.7.) 16 oder Älter sein, um am 25.9 wahlberichtgt zu sein und uns unterstützen zu können. sorry :(',

      filename: 'Unterstuetzungserklaerung_NR.pdf',

      fullname: '',
      address: '',
      zip: '',
      city: '',
      region: 'Bundesland',
      statistics: true,
      stats: {},

      de,
      calendar: {
        date: '',
      },
    };
  },

  methods: {

    submitButtonClicked(event) {
      if (event) event.preventDefault();

      const vm = this;

      if (!this.inProgress) {
        vm.inProgress = true;
        const birthdate = dateToString(vm.calendar.date);

        setTimeout(() => {
          const party = 'Piratenpartei Österreichs';
          const electionDate = '29. Sept. 2019';
          const stichtag = '09. Juli 2019';
          const region = vm.region === 'Bundesland' ? '' : vm.region;

          const pdfBytes = generatePdf(party, electionDate, stichtag, vm.fullname, birthdate, vm.address, vm.zip, vm.city, region);
          vm.pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
          vm.pdfUri = window.URL.createObjectURL(vm.pdfBlob);

          vm.pdfGenerated = true;
          vm.inProgress = false;

          // This is hacky. More elegant would be to install vue-observe-visibility and trigger this event based
          setTimeout(() => {
            scrollToElement('generatedPdf');
          }, 1);
        }, 0);

        if (vm.statistics) {
          setTimeout(() => {
            const rawId = vm.fullname + birthdate + vm.zip;

            const digestValue = digestMessage(rawId);
            vm.stats = {
              uniqueId: hexString(digestValue),
              birtyear: birthdate.substr(birthdate.length - 4),
              zip: vm.zip,
            };

            // ### TODO
            // https://github.com/AmazingDreams/vue-matomo#readme
            // send to piwik
          }, 0);
        }
      }
    },

    ie11DownloadPdf(event) {
      const vm = this;
      if (window.navigator.msSaveOrOpenBlob) {
        event.preventDefault();
        window.navigator.msSaveOrOpenBlob(vm.pdfBlob, vm.filename);
      }
    },
  },

  components: {
    datepicker: datePicker,
  },
};
</script>

<style>
  .rounded-right-0 {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
</style>
