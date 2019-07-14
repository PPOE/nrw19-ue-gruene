<template>
<div class="container">
    <div class="card">

        <div class="form-if" v-if="page === 1">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img id="maria_profile_pic" class="card-image" src="@/assets/maria.jpg" />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Die Piratenpartei tritt gemeinsam mit den Grünen zur Nationalratswahl an.</h5>
                        <p class="card-text">Unsere Kandiatin, <a href="https://piratenpartei.at/" alt="mehr über Maria" target="_blank">Maria Chlastak</a> kandidiert auf Platz 10 der Bundesliste und benötigt deine Vorzugstimme.</p>
                        <p class="card-text">Für unseren gemeinsamen Antritt musst du eine Unterstützungs&shy;erklärung für "Die Grünen – Die Grüne Alternative (GRÜNE)" unterschreiben.</p>
                    </div>
                </div>
            </div>
            <div class="card-footer bg-transparent">
                <button v-on:click="page = 2" id="btn-next" type="button" class="btn btn-success">Jetzt für die Grünen unterschreiben</button>
                <button v-on:click="page = 0" id="btn-stop" type="button" class="btn btn-light btn-sm">Ich möchte nicht für die Grünen unterschreiben</button>
            </div>
        </div>

        <div v-if="page === 0">
            <div class="card-body">
                <h5 class="card-title">Ahoi!</h5>
                <p class="card-text text-justify">Wir Piraten haben sowohl unsere Kandiatin <a href="https://piratenpartei.at/" alt="mehr über Maria" target="_blank">Maria Chlastak</a> (auf Platz 10 der Bundesliste) als auch den gemeinsamen Antritt mit den Grünen einstimmig beschlossen. Wir brauchen jetzt deine Hilfe, damit wir ins Parlement kommen!</p>
                <p class="text-center card-text"><img id="potc" class="card-image" src="@/assets/potc.gif" /></p>
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
                    <input v-model="fullname" type="text" id="fullname" class="form-control mb-4" placeholder="Vorname Nachname">

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

                    <div class="mt-4">
                        <p class="small text-justify">Die Erzeugung der ausgefüllten Unterstützungs&shy;erklärung findet vollständig auf deinem Computer statt, daher werden deine Daten niemals übers Internet übertragen.</p>
                    </div>
                </form>
            </div>
            <div class="card-footer bg-transparent">
                <button v-on:click="page = 3" id="btn-next" type="button" class="btn btn-success">Sofort online unterschreiben</button>
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
                        <p class="card-text">Die Demokratie in Österreich ist noch nicht im Zeitalter der Digitalisierung angekommen. Deshalb musst du deine Unterstützungs&shy;erklärung leider ausdrucken und auf einem Amt unterschreiben.</p>
                        <p class="card-text">Handysignatur/Bürgerkarte wird vom Gesetzgeber nicht akzeptiert. Wir wollen das ändern, aber das geht nur mit einem Mandat!</p>
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
                <h5 class="card-title">Unterstützungs&shy;erklärungsanleitung</h5>
                <ol class="text-left">
                    <li>Lade das PDF herunter und druck es aus (Noch nicht unterschreiben!)</li>
                    <li>Gehe zu deinem Gemeindeamt/Magistrat wo dein Hauptwohnsitz ist
                    (Lichtbildausweis nicht vergessen!)</li>
                    <li>Unterschreibe die Unterstützungs&shy;erklärung vor dem/der Beamten
                    (Die Beglaubigung & Bestätigung ist kostenlos, auf keinen Fall etwas bezahlen!)</li>
                    <li>Nimm die Unterstützungs&shy;erklärung wieder mit und sende sie uns per Post
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
                    <li>Bleib Informiert: <a href="https://mitglieder.piratenpartei.at/newsletter/register.php" target="_blank">Newsletter</a></li>
                    <li>Hilf uns im Wahlkmapf: <a href="https://piratenpartei.at/mitmachen/" target="_blank">Mitmachen</a></li>
                    <li>Folge uns auf Social Media:
                    <a href="https://www.instagram.com/piratenpartei_oesterreichs/" target="_blank">Instagram</a>&nbsp;
                    <a href="https://www.facebook.com/PiratenparteiAT" target="_blank">Facebook</a>&nbsp;
                    <a href="https://twitter.com/piratenparteiAT" target="_blank">Twitter</a>
                    </li>
                    <li>Wähle am 29. Septmber "GRÜN" und gib deine Vorzugstimme den Piraten "10, Maria Chlastak"</li>
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

      ageCheckMin: 1057767300000,
      ageCheckText: 'Du musst am Stichtag (9.7.) 16 oder Älter sein, um am 25.9 wahlberichtgt zu sein und uns unterstützen zu können. sorry :(',
      fullname: '',
      address: '',
      zip: '',
      city: '',
      region: 'Bundesland',
      birthdate: '',
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

#maria_profile_pic {
    max-height: 100%;
    max-width: 100%;
}

#potc {
    width: 500px;
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
