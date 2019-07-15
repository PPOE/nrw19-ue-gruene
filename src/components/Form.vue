<template>
<div class="container">

    <div class="alert alert-danger" role="alert" v-if="newsletterfail">
        Die Anmeldung ist leider fehgeschlagen, bitte klick hier: <a href="https://mitglieder.piratenpartei.at/newsletter/register.php" target="_blank">zum Newsletter anmelden</a>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="newsletterfail=0">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>

    <div class="card">

        <div class="form-if" v-if="page === 1">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img id="maria_profile_pic" class="card-image" src="@/assets/maria.jpg" />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Die Piratenpartei tritt gemeinsam mit den Grünen zur Nationalratswahl an.</h5>
                        <p class="card-text">Unsere Kandiatin <a href="https://www.piratenpartei.at/gekapert-piratin-maria-auf-gruenen-listenplatz-10-gewaehlt/" target="_blank">Maria Chlastak</a> kandidiert auf Platz 10 der Grünen Bundesliste für den Nationalrat und benötigt dafür Deine Unterstützung.</p>
                        <p class="card-text">Damit wir antreten können, brauchen wir 2600 Unterstützungserklärungen - österreichweit. Hilf Maria und unterschreibe hier.</p>
                    </div>
                </div>
            </div>
            <div class="card-footer bg-transparent">
                <button v-on:click="page = 2" id="btn-next" type="button" class="btn btn-success">Jetzt für die Grünen unterschreiben</button>
                <button v-on:click="page = 0" id="btn-stop" type="button" class="btn btn-light btn-sm">Ich möchte lieber nicht für die Grünen unterschreiben</button>
            </div>
        </div>

        <div v-if="page === 0">
            <div class="card-body">
                <h5 class="card-title">Ahoi!</h5>
                <p class="card-text text-justify">Wir Piraten haben es geschafft, unsere Kandiatin <a href="https://www.piratenpartei.at/gekapert-piratin-maria-auf-gruenen-listenplatz-10-gewaehlt/" target="_blank">Maria Chlastak</a> auf Platz 10 der Bundesliste der Grünen zu bringen. Jetzt brauchen wir Deine Hilfe, um auch ins Parlament zukommen!</p>

                <p class="text-center card-text">
                <iframe id="poc_video" width="640" height="480" src="https://www.youtube-nocookie.com/embed/mnXQdMRi63E?start=64&amp;autoplay=1&mute=1" frameborder="0" allow="autoplay; encrypted-media;"></iframe>
                </p>
            </div>
            <div class="card-footer bg-transparent">
                <button v-on:click="page = 2" id="btn-next" type="button" class="btn btn-success">Jetzt für die Grünen unterschreiben</button>
            </div>
        </div>

        <div v-if="page === 2">
            <div class="card-body">
                <h5 class="card-title"></h5>
                <form>
                    <label for="fullname">Dein Name:</label>
                    <input v-model="fullname" type="text" id="fullname" class="form-control mb-4" placeholder="Name Vorname">

                    <div>
                        <label for="birthdate">Dein Geburtsdatum:</label>
                        <div class="row mb-4">
                            <div class="col-md-12">
                                <div class="input-group mb-3">
                                    <datepicker v-model="calendar.date" @input="updateBirthdate" input-class="form-control rounded-right-0" :typeable=false :language=de initial-view="year" id="birthdate" format="dd.MM.yyyy" class="flex-fill"></datepicker>
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

                    <label for="street">Hauptwohnsitz:</label>
                    <input v-model="address" type="text" id="street" class="form-control mb-2" placeholder="Straße, Hausnummer">

                    <div class="row">
                        <div class="col-md-4 mb-2">
                            <input v-model="zip" type="text" id="zip" class="form-control" placeholder="Postleitzahl">
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

                    <div class="mt-4">
                        <p class="small text-justify">Die Erzeugung der ausgefüllten Unterstützungserklärung findet vollständig auf Deinem Computer statt, wir bekommen nur deine E-Mail-Adresse, falls Du unseren Newsletter bestellst.</p>
                    </div>

                    <input v-model="email" type="text" id="email" class="form-control" placeholder="E-Mail" />
                    <div class="custom-control custom-checkbox mt-4">
                        <input v-model="newsletter" type="checkbox" class="custom-control-input" id="newsletter" />
                        <label class="custom-control-label" for="newsletter">Ich will regelmäßig Infos von Maria erhalten</label>
                    </div>

                </form>
            </div>
            <div class="card-footer bg-transparent">
                <button v-on:click="page = 3; subscribteNewsletter();" id="btn-next" type="button" class="btn btn-success">Jetzt unterschreiben</button>
                <button v-on:click="page -= 1" type="button" class="btn btn-light btn-sm">Zurück</button>
            </div>
        </div>

        <div v-if="page === 3">
            <div class="row no-gutters">
                <div class="col-md-3">
                    <img id="sorry_pic" class="card-image" src="@/assets/sorry.jpg" />
                </div>
                <div class="col-md-9">
                    <div class="card-body">
                        <h5 class="card-title">Dieser Service ist in deinem Land leider nicht verfügbar</h5>
                        <p class="card-text">Die Demokratie in Österreich ist noch nicht im digitalen Zeitalter angekommen. Du musst nun dieses vorausgefüllte PDF ausdrucken, auf Deinem Gemeindeamt persönlich innerhalb der Öffnungszeiten erscheinen und Dir Deine Unterschrift notariell beglaubigen lassen. Warum?</p>
                        <p class="card-text">Die Handysignatur (oder die Bürgerkarte) wird vom Gesetzgeber bei Wahlantritten nicht akzeptiert. Wir wollen das ändern! Das geht nur mit Deiner Vorzugsstimme für Maria Chlastak am 29. September!</p>
                    </div>
                </div>
            </div>
            <div class="card-footer bg-transparent">
                <button v-on:click="page = 4" id="btn-next" type="button" class="btn btn-secondary">Ausdrucken und am Gemeindeamt/Magistrat unterschreiben</button>
                <button v-on:click="page -= 1" type="button" class="btn btn-light btn-sm">Zurück</button>
            </div>
        </div>

        <div v-if="page === 4">
            <div class="card-body">
                <h5 class="card-title">Unterstützungserklärungsanleitung</h5>
                <ol class="text-left">
                    <li>Lade das PDF herunter und druck es aus (Noch nicht unterschreiben!)</li>
                    <li>Gehe zu deinem Gemeindeamt/Magistrat, wo dein Hauptwohnsitz ist
                        (Lichtbildausweis nicht vergessen!)</li>
                    <li>Unterschreibe die Unterstützungserklärung vor dem/der Beamten
                        (Die Beglaubigung & Bestätigung ist kostenlos, auf keinen Fall etwas bezahlen!)</li>
                    <li>Nimm die Unterstützungserklärung wieder mit und sende sie uns per Post
                        (Die Grünen - Die Grüne Alternative Bundespartei, Würtzlerstraße 3/3, 1030 Wien)</li>
                </ol>
                <h5 class="card-title"> </h5>
                <my-pdfservice
                    :fullname="fullname"
                    :address="address"
                    :zip="zip"
                    :city="city"
                    :region="region"
                    :birthdate="birthdate"
                />
                <h5 class="card-title">Sei dabei</h5>
                <ul class="text-left">
                    <li>Folge Maria Chlastak auf Social Media:
                        <a href="https://www.instagram.com/maria_noc/" target="_blank">Instagram</a>&nbsp;
                        <a href="https://www.facebook.com/mariachlastak" target="_blank">Facebook</a>&nbsp;
                        <a href="https://twitter.com/maria_noc_" target="_blank">Twitter</a>
                    </li>
                    <li>Folge der Piratenpartei auf Social Media:
                        <a href="https://www.facebook.com/PiratenparteiAT" target="_blank">Facebook</a>&nbsp;
                        <a href="https://twitter.com/piratenparteiAT" target="_blank">Twitter</a>
                    </li>
                    <li>Bleib informiert: <a href="https://mitglieder.piratenpartei.at/newsletter/register.php" target="_blank">Newsletter</a></li>
                    <li>Hilf uns im Wahlkmapf: <a href="https://piratenpartei.at/mitmachen/" target="_blank">Mitmachen</a></li>

                    <li>Wähle am 29. Septmber "GRÜN" und gib deine Vorzugsstimme den Piraten "10. Maria Chlastak"</li>
                </ul>

            </div>
            <div class="card-footer bg-transparent">
                <button v-on:click="page -= 1" type="button" class="btn btn-light btn-sm">Zurück</button>
            </div>
        </div>

    </div>
</div>

</template>

<script>
import pdfservice from '@/components/PDFService.vue';
import datePicker from 'vuejs-datepicker';
import { de } from 'vuejs-datepicker/dist/locale';

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

export default {
  name: 'Form',
  components: {
    'my-pdfservice': pdfservice,
    datepicker: datePicker,
  },
  data() {
    return {
      page: 1,
      newsletter: false,
      newsletterfail: false,
      ageCheckMin: 1057767300000,
      ageCheckText: 'Du musst am Stichtag (9.7.) 16 oder Älter sein, um am 25.9 wahlberichtgt zu sein und uns unterstützen zu können. sorry :(',
      fullname: '',
      address: '',
      zip: '',
      city: '',
      region: 'Bundesland',
      birthdate: '',
      email: '',
      de,
      calendar: {
        date: '',
      },
    };
  },

  methods: {
    updateBirthdate() {
      this.birthdate = dateToString(this.calendar.date);
    },

    subscribteNewsletter() {
      if (this.newsletter) {
        const vm = this;
        const http = new XMLHttpRequest();
        const url = 'https://ue.piratenpartei.at/wordpress/?page_id=5&na=s';
        const params = `ne=${encodeURI(this.email)}&nlang=&nr=page`;
        http.open('POST', url, true);

        // Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function callbackhandler() {
          if (http.readyState !== 4 || http.status !== 200) {
            vm.newsletterfail = true;
          }
        };
        http.send(params);
      }
    },
  },
};
</script>

<style>

.form-if {
    height: 100%;
}

.card-title {
    margin-bottom: 1em;
}

#poc_video {
    max-width: 100%;
}

#maria_profile_pic {
    max-height: 100%;
    max-width: 100%;
}

#sorry_pic{
    min-width: 100%;
    max-width: 100%;
}

.card-footer button {
    width: 100%;
}

.card-footer button:not(:last-child) {
    margin-bottom: 1em;
}
</style>
