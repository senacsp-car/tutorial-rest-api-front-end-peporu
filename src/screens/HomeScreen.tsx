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
                salvaNome,
                salvaDescricao
            }
            axios.post('http>//localhost:4000/api/itens',itemToSave)
            .then()
            .catch();
        }
    }
    return(
        <div>
            <h1>Home</h1>
            <ul>
                {itens.map(function(item){
                    return <li>{item.nome}</li>
                })}
            </ul>
            <div>
                <input placeholder="Nome" onChange={function(e){
                    setSalvaNome(e.target.value)
                }}/>
                <input placeholder="Descricao" onChange={function(e){
                    setSalvaDescricao(e.target.value)
                }}/>
                <button onClick={botaoSalvarClicado}>Salvar</button>
            </div>
        </div>
    );
}