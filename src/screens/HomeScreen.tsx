import axios from "axios";
import { useEffect, useState } from "react";

type Item = {
    id?:number;
    nome:string;
    descricao:string;
}

export default function HomeScreen(){
    const [itens, setItens] = useState<Item[]>([]);

    const [salvaNome, setSalvaNome] = useState<string>();
    const [salvaDescricao, setSalvaDescricao] = useState<string>();

    const [mostraCriar,setMostraCriar] = useState(false);
    const [mostraEditar,setMostraEditar] = useState(false);
    const [mostraDeletar,setMostraDeletar] = useState(false);
    const [mostraDetalhado,setMostraDetalhado] = useState(false);

    const [idEscolhido,setIdEscolhido] = useState<number>();

    function recarregar(){
        axios.get('http://localhost:4000/api/itens')
        .then(function (response) {
            setItens(response.data);
        })
        .catch(function (error) {
            alert(error);
        });
    }

    useEffect(function (){
        recarregar();
    },[]);

    function botaoSalvarClicado() {
        if((salvaNome !== undefined) && (salvaDescricao !== undefined)){
            const itemToSave: Item = {
                nome:salvaNome,
                descricao:salvaDescricao
            }
            axios.post('http://localhost:4000/api/itens',itemToSave)
            .then(_response=>{
                recarregar();
            })
            .catch();
        }
        
    }

    function botaoEditarClicado(){
            if((salvaNome !== undefined) && (salvaDescricao !== undefined)){
                alert(`http://localhost:4000/api/itens/${idEscolhido} - `+salvaNome+' - '+salvaDescricao)
                axios.put(`http://localhost:4000/api/itens/${idEscolhido}`,{
                    nome:salvaNome,
                    descricao:salvaDescricao
                })
                .then(() => {
                    recarregar();
                }
                )
                .catch();
            }
        }

    function botaoDeletarClicado(){
        axios.delete(`http://localhost:4000/api/itens/${idEscolhido}`)
        .then(() =>{recarregar();})
        .catch()
        
    }
    function mudaMostraCriar() {
        escondeOutros();
        setMostraCriar(!mostraCriar);
    }

    function mudaMostraEditar(){
        cancel();
        escondeOutros();
        setMostraEditar(!mostraEditar);
    }

    function mudaMostraDeletar(){
        cancel();
        escondeOutros();
        setMostraDeletar(!mostraDeletar);
    }

    function mudaMostraDetalhado(){
        setMostraDetalhado(!mostraDetalhado);
    }
    
    function escondeOutros(){
        setMostraCriar(false);
        setMostraEditar(false);
        setMostraDeletar(false);
    }
    function cancel(){
        setIdEscolhido(0);
        setMostraCriar(false);
        setMostraEditar(false);
        setMostraDeletar(false);
    }

    return(
        <div>
            {(mostraDetalhado)?(
                <div>                    
                    <h1>Home</h1>
                    <ul>
                        {itens.map(function(item){
                            return <li>
                                {item.id} - {item.nome} - Detalhes: {item.descricao}
                                {(mostraEditar)&&(<input type="radio" name="itens" onClick={function() {setIdEscolhido(item.id)}} value={item.id}/>)}
                                {(mostraDeletar)&&(<input type="radio" name="itens" onClick={function() {setIdEscolhido(item.id)}} value={item.id}/>)}
                            </li>
                        })}
                    </ul>
                </div>
                ):(
                <div>
                    <h1>Home</h1>
                    <ul>
                        {itens.map(function(item){
                            return <li>
                                {item.id} - {item.nome}
                                {(mostraEditar)&&(<input type="radio" name="itens" onClick={function() {setIdEscolhido(item.id!)}} value={item.id}/>)}
                                {(mostraDeletar)&&(<input type="radio" name="itens" onClick={function() {setIdEscolhido(item.id!)}} value={item.id}/>)}
                            </li>
                        })}
                    </ul>
                </div>
            )}
            
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
                <button onClick={cancel}>Cancelar</button>
            </div>)}
            {(mostraEditar)&&(
                <div className="Editar">
                    {(idEscolhido !== undefined) ? (
                        <span>Item selecionado = {idEscolhido}</span>
                    ):(
                        <span>Use os radiobuttons para escolher qual item quer editar</span>
                    )}
                    <input placeholder="Novo nome" onChange={function(e){
                        setSalvaNome(e.target.value)
                    }}/>
                    <input placeholder="Nova descrição" onChange={function(e){
                        setSalvaDescricao(e.target.value)
                    }}/>
                    <button onClick={botaoEditarClicado}>Editar</button>
                    <button onClick={cancel}>Cancelar</button>
                </div>
            )}
            {(mostraDeletar)&&(
                <div className="Deletar">
                    {(idEscolhido !== undefined) ? (
                        <span>Item selecionado = {idEscolhido}</span>
                    ):(
                        <span>Use os radiobuttons para escolher qual item quer deletar</span>
                    )}
                    <button onClick={botaoDeletarClicado}>Deletar</button>
                    <button onClick={cancel}>Cancelar</button>
                </div>
            )}
        </div>
    );
}