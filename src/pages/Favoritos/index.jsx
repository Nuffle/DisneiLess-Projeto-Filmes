import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './favoritos.css'
import { toast } from 'react-toastify'

function Favoritos() {
   const [filmes, setFilmes] = useState([])

   useEffect(() => {
      const minhaLista = localStorage.getItem("@disneiless")
      setFilmes(JSON.parse(minhaLista) || [])
   
   }, [])


   function removerFilme(id) {
      let filtroFilmes = filmes.filter((item) => {
         return (item.id !== id)
      })

      setFilmes(filtroFilmes)
      localStorage.setItem("@disneiless", JSON.stringify(filtroFilmes))
      toast.success("Filme removido com sucesso!")
   }


   return (
      <div className='meus-filmes'>
         <h1>Meus filmes</h1>

         {filmes.length === 0 && <span>Você ainda não possui nenhum filme salvo! 😥</span>}

            <ul className='lista__filmes'>
               {filmes.map((item) => {
                  return (
                     <li key={item.id}>
                        <span>{item.title}</span>

                        <div>
                           <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                           <button onClick={() => removerFilme(item.id)}>Remover</button>
                        </div>
                     </li>
                  )
               })}
            </ul>
      </div>
   )
}

export default Favoritos