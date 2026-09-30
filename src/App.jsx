import { useState } from "react";
import "./App.css";

function App() {
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState(null);

    async function buscarCEP() {
        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        const dados = await resposta.json();

        if (dados.erro) {
            setEndereco(null);
            return;
        }

        setEndereco(dados);
    }

    return (
        <main>
            <h1>Consulta de CEP</h1>

            <input
                type="text"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
            />

            <button onClick={buscarCEP}>
                Buscar
            </button>

            {endereco && (
                <div>
                    <p>CEP: {endereco.cep}</p>
                    <p>Rua: {endereco.logradouro}</p>
                    <p>Bairro: {endereco.bairro}</p>
                    <p>Cidade: {endereco.localidade}</p>
                    <p>Estado: {endereco.uf}</p>
                </div>
            )}
        </main>
    );
}

export default App;