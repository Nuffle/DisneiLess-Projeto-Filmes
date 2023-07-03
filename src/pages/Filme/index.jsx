import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './filme-info.css'
import api from '../../services/api'
import { toast } from 'react-toastify'

function Filme() {
   const { id } = useParams()
   const navigate = useNavigate()

   const [filme, setFilme] = useState({})
   const [loading, setLoading] = useState(true)

   useEffect(()=> {
      async function loadFilme() {
         await api.get(`/movie/${id}`, {
            params: {
               api_key: "5fb1f4d5f8ff21bc465bd4c62dff615e",
               language: "pt-BR",
            }
         })
         .then((response)=> {
            setFilme(response.data)
            setLoading(false)
         })
         .catch(()=> {
            console.log("FILME NAO ENCONTRADO")
            navigate('/', { replace: true })
            return
         })
      }

      loadFilme()

      return () => {
         console.log("O COMPONENTE FOI DESMONTADO")
      }

   }, [navigate, id])


   function salvarFilme() {
      const minhalista = localStorage.getItem("@disneiless")

      // se tiver filmes salvos, salva na variavel, se não, inicializa como array vazia.
      let filmesSalvos = JSON.parse(minhalista) || []

      // comparando se algum filme da local storage é igual ao da página, o mesmo id, se n tiver, pode salvar.
      // o some vai devolver true ou false, se encontrar o filme lá, devolve true, se n, false.
      const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

      if(hasFilme) {
         toast.warn("Esse filme já está na sua lista!")
         return
      }

      filmesSalvos.push(filme)
      localStorage.setItem("@disneiless", JSON.stringify(filmesSalvos)) //para add o filme na local @
      toast.success("Filme adicionado na sua lista!")
   }


   if(loading) {
      return(
         <div className='filme-info'>
            <h1>Carregando detalhes...</h1>
         </div>
      )
   }


   return (
      <div className='filme-info'>
         <h1>{filme.title}</h1>
         <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

         <h3>Sinopse</h3>
         <span>{filme.overview}</span>
         <strong>Avaliação: {filme.vote_average} / 10 ({filme.vote_count})</strong>

         <div className='area-buttons'>
            <button onClick={salvarFilme}>Salvar</button>
            <button>
               <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                  Trailer
               </a>
            </button>
         </div>

      </div>
   )
}

export default Filme