<template>
<div class="container">

    <div class="py-5 text-center">
        <a href="https://www.piratenpartei.at/" target="_blank"><img class="d-block mx-auto mb-4" src="@/assets/logo.png" alt="" width="283" height="130"></a>

        <div class=" wahlzettel">
            <img src="@/assets/vote.png" alt="Grüne - 10, Maria Chlastak" title="Grüne - 10, Maria Chlastak" />
        </div>

        <h2>Unterstützungs&shy;erklärung für die Nationalrats&shy;wahl am 29. September</h2>
        <p class="lead">Hier kannst du eine vorausgefüllte Unterstützungs&shy;
        erklärung downloaden um den Wahlantritt der Piratenpartei zu ermöglichen</p>
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
