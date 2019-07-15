<template>
<div class="container">

    <div class="py-5 text-center">
        <a href="https://www.piratenpartei.at/" target="_blank"><img class="d-block mx-auto mb-4" src="@/assets/logo.png" alt="" width="283" height="130"></a>

        <div class=" wahlzettel">
            <img src="@/assets/vote.png" alt="Grüne - 10, Maria Chlastak" title="Grüne - 10, Maria Chlastak" />
        </div>

        <h2>Unterstützungserklärung für die Nationalrats&shy;wahl am 29. September</h2>
        <p class="lead"> In Österreich sind alle Parteien für elektronische Unterstützungserklärungen, doch sie sind nicht rechtsgültig. Obwohl man zB. Volksbegehren digital unterschreiben kann, müssen Kleinparteien wie wir mindestens 2600 Unterstützungserklärungen binnen weniger Wochen sammeln - in jedem Bundesland, am Hauptwohnsitz, vor einem Beamten, zu regulären Öffnungszeiten. Das ist pure Schikane und verhindert den Neueinzug von Parteien, die wirklich im Bürgerauftrag und nicht durch Großspender in den Nationalrat wollen.<br>Wir zeigen Dir hier, wie einfach es wäre, Deiner Lieblingskleinpartei elektronisch den Wahlantritt zu ermöglichen.</p>
    </div>

</div>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style>
    .wahlzettel {
        text-align: center;
        margin-bottom: 3em;
    }
    .wahlzettel img {
        width: 100%;
        max-width: 777px;
    }
</style>
