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

/**
 * **************************************************************
 * 定数のボタンという箱の中に、HTMLの要素からgoというIDを取得します。
 */
const button = document.getElementById("go")
//gofunctionという関数を定義します。
function gofunction() {
    // zenPokemonの配列の２番を、表示します。
    // console.log(zenPokemon[2]);
    const randomIndex = Math.floor(Math.random() * zenPokemon.length);
    console.log(zenPokemon[randomIndex]);
    
    // HTMLの中のIDのapp要素を取得します。HTMLの中の画像を
    document.getElementById("app").innerHTML = `<img src="${zenPokemon[randomIndex].sprites.front_default}" />`;
}
// クリックイベント IDのgoというボタンをクリックしたら、関数のgofunctionが呼び出されます。
button.onclick = gofunction;

function gofunction() {
    const randomIndex = Math.floor(Math.random() * zenPokemon.length);
    const pokemon = zenPokemon[randomIndex];
    const spriteUrl = pokemon.sprites.front_default;
    if (spriteUrl) {
        document.getElementById("app").innerHTML = `<img src="${spriteUrl}" style="max-width: 100%; max-height: 100%;">`;
    } else {
        document.getElementById("app").innerHTML = "画像がありません";
    }
}

document.getElementById("go").addEventListener("click", function() {
    $(".pokeball").addClass("image-rotate");
    // window.onload = function() {
        // アニメーションを適用する画像の要素を取得
        var image = document.querySelector('.image-rotate');
      
        // SetIntervalを使用して3秒後にアニメーションを停止
        setTimeout(function() {
            document.getElementById("closed-pokeball").style.display = "none";  // 閉じたボールを非表示
            document.getElementById("pokeball-container").style.display = "block"; // 開いたボールを表示

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
        }, 3000);
        // 3000=3秒
      ;  
});


/**
 * **************************************************************
 */
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

