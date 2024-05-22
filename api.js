const subetePokemonURl = "https://pokeapi.co/api/v2/pokemon/?limit=100"; // 100個までとりに行く
let zenPokemon = []
/**
 * **************************************************************
 * ポケモンのdataをPOKEAPIから取得します
 */
fetch(subetePokemonURl)
    .then((response) => response.json())
    //  全てのポケモンのURLと名前をとりにいきます
    .then((pokemonTachiNoSubeteNONamaeToURL) => {
        const results = pokemonTachiNoSubeteNONamaeToURL.results; //  全てのポケモンのURLと名前をとりにいきますの結果
        console.log({ results }); //ここにコンソールを見たら全てのポケモンのURLと名前のデータを見れます。ここでは画像情報がないので
        const pokemonPromises = results.map(
            (pokemon) => fetch(pokemon.url).then((response) => response.json()), //ここで全てのポケモンのURLを使ってそれぞれのポケモンの詳細画像も含めてとりにいきます
        );
        console.log({ pokemonPromises }); //ここではfetchのpromiseが入ってます
        //結構多いのでPromise.allを使うと全てのfetch処理が終わるまでに待ってくれます
        Promise.all(pokemonPromises).then((pokemonDetails) => {
            // Pokemon pokemonDetailsが来ました
            console.log({ pokemonDetails }); // それぞれの全てのポケモンの詳細が入っています
            // 変数のzenPokemonにpokemonDetailsを代入します。
            zenPokemon = pokemonDetails
        });
    })

    // 効果音
let closeSound = new Audio('./sound/close.mp3');
let openSound = new Audio('./sound/open.mp3');
let pikachuSound = new Audio('./sound/pikachu.m4r');

document.addEventListener("DOMContentLoaded", function() {
    // ピカチュウの画像にクリックイベントを追加
    const pikachuImage = document.querySelector('.pikachu');
    pikachuImage.addEventListener('click', function() {
        pikachuSound.play();  // ピカチュウの効果音を再生
    });
});

document.getElementById("go").addEventListener("click", function() {
    $(".pokeball").addClass("image-rotate");
    closeSound.play();
    // window.onload = function() {
        // アニメーションを適用する画像の要素を取得
        var image = document.querySelector('.image-rotate');
      
        // SetIntervalを使用して3秒後にアニメーションを停止
        setTimeout(function() {
            document.getElementById("closed-pokeball").style.display = "none";  // 閉じたボールを非表示
            document.getElementById("pokeball-container").style.display = "block"; // 開いたボールを表示
            openSound.play();

            fetch('https://pokeapi.co/api/v2/pokemon/?limit=100')
            .then(response => response.json())
            .then(data => {
                let zenPokemon = data.results.map(p => p.url);
                let randomPokemonUrl = zenPokemon[Math.floor(Math.random() * zenPokemon.length)];
                return fetch(randomPokemonUrl);
            })
            .then(response => response.json())
            .then(pokemon => {
                document.getElementById("app").innerHTML = `<img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">`;
            })
            .catch(error => {
                console.error('Error fetching Pokemon:', error);
            });
            image.style.animation = 'none';
            $('.pokeball').removeClass("image-rotate");

        }, 3000); // 3000=3秒
       
      document.getElementById("closed-pokeball").style.display = "block";  // 閉じたボールを表示
      document.getElementById("pokeball-container").style.display = "none"; // 開いたボールを非表示
        image.style.animation = 'rotate 1s linear infinite';
});

//  * **************************************************************
const subetePokemonURl2 = "https://pokeapi.co/api/v2/pokemon/?limit=28"; // 28個までとりに行く
fetch(subetePokemonURl2)
    .then((response) => response.json())
    //  全てのポケモンのURLと名前をとりにいきます
    .then((pokemonTachiNoSubeteNONamaeToURL) => {
        const results = pokemonTachiNoSubeteNONamaeToURL.results; //  全てのポケモンのURLと名前をとりにいきますの結果
        console.log({ results }); //ここにコンソールを見たら全てのポケモンのURLと名前のデータを見れます。ここでは画像情報がないので
        const pokemonPromises = results.map(
            (pokemon) => fetch(pokemon.url).then((response) => response.json()), //ここで全てのポケモンのURLを使ってそれぞれのポケモンの詳細画像も含めてとりにいきます
        );
        console.log({ pokemonPromises }); //ここではfetchのpromiseが入ってます
        //結構多いのでPromise.allを使うと全てのfetch処理が終わるまでに待ってくれます
        Promise.all(pokemonPromises).then((pokemonDetails) => {
            // Pokemon pokemonDetailsが来ました
            console.log({ pokemonDetails }); // それぞれの全てのポケモンの詳細が入っています
            // 👇🏾 ここでそのポケモンの詳細を画像に変えます
            const backImages = pokemonDetails
                .map(
                    (pokemon) =>
                        `<img src="${pokemon.sprites.back_default}" alt="${pokemon.name}" />`, //ここでポケモンの画像をURLとして変換します
                ).join("");
            
            // ここでポケモンの画像を表示します
            document.getElementById("footer").innerHTML = backImages;    

        });
    })

