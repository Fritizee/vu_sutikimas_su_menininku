# Idėjos pasimatymui su savo vidiniu menininku

Nedidelė vieno puslapio svetainė, kuri parodo atsitiktinę idėją ir išsaugo atrastas idėjas naršyklės istorijoje.

## Paleidimas

Projekto aplanke paleiskite bet kurį statinį interneto serverį. Pavyzdžiui, jei įdiegtas Python:

```bash
python3 -m http.server 8000
```

Arba naudoti [Github Pages|https://fritizee.github.io/vu_sutikimas_su_menininku]

Tada atidarykite `http://localhost:8000`. Serveris reikalingas, nes naršyklės riboja JSON failų įkėlimą puslapį atidarant tiesiai iš failų sistemos.

## Idėjų sąrašo redagavimas

Atidarykite `data/challenges.json` ir į JSON masyvą įrašykite naujas eilutes. Tarp eilučių palikite kablelius, tačiau po paskutinės eilutės kablelio nedėkite.

## Kas saugoma

Paskutinės 50 atrastų idėjų saugomos tik šios naršyklės `localStorage`. Jas galima išvalyti istorijos skydelyje esančiu mygtuku.
