import { styled } from "styled-components"
import EstilosGlobais from "./componentes/EstilosGlobais"
import Cabecalho from "./componentes/Cabecalho"
import BarraLateral from "./componentes/BarraLateral"
import Banner from "./componentes/Banner"
import bannerBackground from './assets/banner.png'
import Galeria from "./componentes/Galeria"
import ModalZoom from "./componentes/ModalZoom"
import fotos from "./fotos.json"
import { useEffect, useState } from "react"
import Rodape from "./componentes/Rodape"

const FundoGradiente = styled.div`
  background: linear-gradient(174.61deg, #041833 4.16%, #04244F 48%, #154580 96.76%);
  width: 100%;
  min-height: 100vh;
`
const AppContainer = styled.div`
  width: 1440px;
  margin: 0 auto;
  max-width: 100%;
`

const MainContainer = styled.main`
  display: flex;
  gap: 24px;
`

const ConteudoGaleria = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

function App() {
  const [fotosDaGaleria, setFotosDaGaleria] = useState(fotos.map(foto => {
    return {
      ...foto,
      ativo: true
    }
  }));
  const [fotoSelecionada, setFotoSelecionada] = useState(null);
  const [filtro, setFiltro] = useState('');

  const aoAlternarFavorito = (foto) => {
    if (foto.id === fotoSelecionada?.id && foto.ativo) {
      setFotoSelecionada({
        ...fotoSelecionada,
        favorita: !fotoSelecionada.favorita
      })
    }

    setFotosDaGaleria(fotosDaGaleria.map(fotoDaGaleria => {
      return {
        ...fotoDaGaleria,
        favorita: fotoDaGaleria.id === foto.id ? !foto.favorita : fotoDaGaleria.favorita
      }
    }))
  }

  const aoAlternarFiltroPorTag = (tag) => {
    setFiltro("");
    const fotosFiltradas = fotosDaGaleria.map(foto => {
      if (foto.tagId === tag.id || tag.id === 0) {
        return {
          ...foto,
          ativo: true
        }
      }

      else {
        return {
          ...foto,
          ativo: false
        }
      }
    })
    setFotosDaGaleria(fotosFiltradas)
  }

  useEffect(() => {
    if (filtro !== "") {
      const fotosGaleria = fotosDaGaleria.map(foto => {
        if (!filtro || foto.titulo.toLowerCase().includes(filtro.toLowerCase())) {
          return {
            ...foto,
            ativo: true
          }
        }

        else {
          return {
            ...foto,
            ativo: false
          }
        }
      })
      setFotosDaGaleria(fotosGaleria);
    }
  }, [filtro])

  return (
    <FundoGradiente>
      <EstilosGlobais />
      <AppContainer>
        <Cabecalho
          filtro={filtro}
          setFiltro={setFiltro}
        />
        <MainContainer>
          <BarraLateral />
          <ConteudoGaleria>
            <Banner
              texto="A galeria mais completa de fotos do espaço!"
              backgroundImage={bannerBackground}
            />
            <Galeria
              aoAlternarFavorito={aoAlternarFavorito}
              aoFotoSelecionada={foto => setFotoSelecionada(foto)}
              aoAlternarFiltroPorTag={aoAlternarFiltroPorTag}
              fotos={fotosDaGaleria.filter(foto => foto.ativo)}
            />
          </ConteudoGaleria>
        </MainContainer>
      </AppContainer>
      <ModalZoom
        foto={fotoSelecionada}
        aoFechar={() => setFotoSelecionada(null)}
        aoAlternarFavorito={aoAlternarFavorito}
      />
      <Rodape />
    </FundoGradiente>
  )
}

export default App
