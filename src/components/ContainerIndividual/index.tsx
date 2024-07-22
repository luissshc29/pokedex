import React, { useEffect, useState } from "react";
import { IPokemon } from "../../interfaces/IPokemon";
import styles from "./ContainerIndividual.module.scss";
import { useRouter } from "next/router";
import axios from "axios";
export default function ContainerIndividual() {
  const router = useRouter();

  // Array com o Pokemon Atual
  const [pokemonArray, setPokemonArray] = useState<IPokemon[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  // Array com o sprite ativo do Pokemon Atual
  const [imagemAtiva, setImagemAtiva] = useState<string>("");

  const buscaPokemon = () => {
    var lista = [];
    axios
      .get(`https://pokeapi.co/api/v2${window.location.pathname}`)
      .then((res) => {
        console.log(res);
        lista.push(res.data);
        setPokemonArray(lista);
        setImagemAtiva(res.data.sprites.front_default);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1800);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    buscaPokemon();
  }, [router.asPath]);

  if (loading) {
    return (
      <div className={styles.container__loading}>
        <img className={styles.loading} src="/images/loading.svg" />
      </div>
    );
  }

  if (pokemonArray.length === 0) {
    router.push("/404");
  }

  return (
    <>
      {pokemonArray.map(
        (pokemon, index) =>
          pokemon && (
            <div className={styles.container} key={index}>
              <p className={styles.container__nome}>
                {pokemon.name.includes("-mega")
                  ? "Mega " +
                    pokemon.name.replaceAll("-", " ").replace("mega", "")
                  : pokemon.name.replaceAll("-", " ")}
              </p>
              <p className={styles.container__numero}>
                Nº{" "}
                {pokemon.id < 100
                  ? `00${pokemon.id}`
                  : pokemon.id < 1000
                  ? `0${pokemon.id}`
                  : pokemon.id}
              </p>
              <img src={imagemAtiva} className={styles.container__imagem} />
              <p className={styles.container__sprites__msg}>Sprites:</p>
              <div className={styles.container__imagensAlt}>
                {pokemon.sprites.front_default === null ? (
                  ""
                ) : (
                  <img
                    className={
                      imagemAtiva === pokemon.sprites.front_default ||
                      imagemAtiva === ""
                        ? styles.img_ativa
                        : ""
                    }
                    src={pokemon.sprites.front_default}
                    onClick={() =>
                      setImagemAtiva(pokemon.sprites.front_default)
                    }
                  />
                )}
                {pokemon.sprites.front_female === null ? (
                  ""
                ) : (
                  <img
                    className={
                      imagemAtiva === pokemon.sprites.front_female
                        ? styles.img_ativa
                        : ""
                    }
                    src={pokemon.sprites.front_female}
                    onClick={() => setImagemAtiva(pokemon.sprites.front_female)}
                  />
                )}
                {pokemon.sprites.front_shiny === null ? (
                  ""
                ) : (
                  <img
                    className={
                      imagemAtiva === pokemon.sprites.front_shiny
                        ? styles.img_ativa
                        : ""
                    }
                    src={pokemon.sprites.front_shiny}
                    onClick={() => setImagemAtiva(pokemon.sprites.front_shiny)}
                  />
                )}
                {pokemon.sprites.front_shiny_female === null ? (
                  ""
                ) : (
                  <img
                    className={
                      imagemAtiva === pokemon.sprites.front_shiny_female
                        ? styles.img_ativa
                        : ""
                    }
                    src={pokemon.sprites.front_shiny_female}
                    onClick={() =>
                      setImagemAtiva(pokemon.sprites.front_shiny_female)
                    }
                  />
                )}
              </div>

              <div className={styles.container__infos}>
                <div className={styles.container__infos__info}>
                  <h3>Altura:</h3>
                  <p>{pokemon.height / 10}m</p>
                </div>
                <div className={styles.container__infos__info}>
                  <h3>Peso:</h3>
                  <p>{pokemon.weight / 10}kg</p>
                </div>
                <div className={styles.container__infos__info}>
                  <h3>Espécie:</h3>
                  <p>{pokemon.species.name}</p>
                </div>
                <div className={styles.container__infos__info}>
                  <h3>Habilidades:</h3>
                  <div className={styles.container__infos__info__habilidade}>
                    {pokemon.abilities.map((habilidade) => (
                      <p key={habilidade.ability.name}>
                        {"> " + habilidade.ability.name.replaceAll("-", " ")}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.container__tipos}>
                {pokemon.types.map((tipo) => (
                  <div
                    key={tipo.type.name}
                    className={`${styles.container__tipos__tipo} ${
                      styles[
                        `container__tipos__tipo__${tipo.type.name.toLowerCase()}`
                      ]
                    }`}
                  >
                    {tipo.type.name}
                  </div>
                ))}
              </div>
            </div>
          )
      )}
    </>
  );
}
