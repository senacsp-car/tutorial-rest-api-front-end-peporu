import axios from "axios";
import { useEffect, useState } from "react";

type Item ={
    id?:number;
    nome:string;
    descricao:string;
}

export default function HomeScreen(){
    const [itens, setItens] = useState<Item[]>([]);

    const [salvaNome, setSalvaNome] = useState<string>();
    const [salvaDescricao, setSalvaDescricao] = useState<string>();

    const [escolheParaEditar,setEscolheParaEditar] = useState<string>();

    const [mostraCriar,setMostraCriar] = useState(false);
    const [mostraEditar,setMostraEditar] = useState(false);
    const [mostraDeletar,setMostraDeletar] = useState(false);
    const [mostraDetalhado,setMostraDetalhado] = useState(false);
    const [escolheParaDeletar,setEscolheParaDeletar] = useState<string>();

    useEffect(function (){
        axios.get('http://localhost:4000/api/itens')
        .then(function (response) {
            setItens(response.data);
        })
        .catch(function (error) {
            alert(error);
        });
    },[]);

    function botaoSalvarClicado() {
        if((salvaNome !== undefined) && (salvaDescricao !== undefined)){
            const itemToSave: Item = {
                nome:salvaNome,
                descricao:salvaDescricao
            }
            axios.post('http://localhost:4000/api/itens',itemToSave)
            .then()
            .catch();
        }
        window.location.reload();
    }

    function botaoEditarClicado(){
        if(!axios.get(`http://localhost:4000/api/itens/${escolheParaEditar}`)){
            if((salvaNome !== undefined) && (salvaDescricao !== undefined)){
                axios.put(`http://localhost:4000/api/itens/${escolheParaEditar}`,{
                    nome:salvaNome,
                    descricao:salvaDescricao
                })
                .then()
                .catch();
            }
        }
        window.location.reload();
    }

    function botaoDeletarClicado(){
        axios.delete(`http://localhost:4000/api/itens/${escolheParaDeletar}`)
        window.location.reload();
    }
    function mudaMostraCriar() {
        setMostraCriar(!mostraCriar);
    }

    function mudaMostraEditar(){
        setMostraEditar(!mostraEditar);
    }

    function mudaMostraDeletar(){
        setMostraDeletar(!mostraDeletar);
    }

    function mudaMostraDetalhado(){
        setMostraDetalhado(!mostraDetalhado);
    }

    return(
        <div>
            <h1>Home</h1>
            <ul>
                {itens.map(function(item){
                    return <li>{item.id} - {item.nome}</li>
                })}
            </ul>
            <div className="buttons">
                <button className="AbreCriar" onClick={mudaMostraCriar}>Criar</button>
                <button className="AbreEditar" onClick={mudaMostraEditar}>Editar</button>
                <button className="AbreDeletar" onClick={mudaMostraDeletar}>Deletar</button>
                <button className="AbreDetalhado" onClick={mudaMostraDetalhado}>Detalhes</button>
            </div>
            {(mostraCriar)&&(
            <div className="Criar">
                <input placeholder="Nome" onChange={function(e){
                    setSalvaNome(e.target.value)
                }}/>
                <input placeholder="Descricao" onChange={function(e){
                    setSalvaDescricao(e.target.value)
                }}/>
                <button onClick={botaoSalvarClicado}>Salvar</button>
            </div>)}
            {(mostraEditar)&&(
                <div className="Editar">
                    <input placeholder="ID do item que deseja editar" onChange={function(e){
                        setEscolheParaEditar(e.target.value)
                    }}/>
                    <input placeholder="Novo nome" onChange={function(e){
                        setSalvaNome(e.target.value)
                    }}/>
                    <input placeholder="Nova descrição" onChange={function(e){
                        setSalvaDescricao(e.target.value)
                    }}/>
                    <button onClick={botaoEditarClicado}>Editar</button>
                </div>
            )}
            {(mostraDeletar)&&(
                <div className="Deletar">
                    <input placeholder="Item que deseja Deletar" onChange={function(e){
                        setEscolheParaDeletar(e.target.value)
                    }

                    }/>
                    <button onClick={botaoDeletarClicado}>Deletar</button>
                </div>
            )}
            
        </div>
    );
}