import { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import api from "../../services/api";
import {toast} from 'react-toastify';

import './filme-info.css'

function Filme(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [filme, setFilme]= useState ({});
    const [loading, setLoading] = useState (true);

    useEffect(()=> {
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                api_key:"bada18072595d0f33e8ec5fe08bcc5b4",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("FILME NÃO ENCONTRADO")
                navigate("/", {replace: true});
                return;
            })
        }

        loadFilme();

        return () =>{
            console.log('COMPONENTE FOI DESMONTADO');
        }
    },[])

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasfilme =filmesSalvos.some( (filmesSalvos) => filmesSalvos.id === filme.id) // some verica se tem filme igual

        if (hasfilme) {
          toast.warn("Esse filme já esta na sua lista")
            return;
        }
        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
       toast.success("Filme salvo com sucesso!")
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
              <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average /10}</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
               <button>
                <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                    Trailer
                </a>
               </button>
            </div>
        </div>
        
    )
}
export default Filme;