import { useState, useEffect } from "react";
import "./index.css";
import TableItensNota from "./components/Table/TableItensNota";
import FormCalculaFreteKg from "./components/Form/FormCalculaFreteKg";
import TableItensSimulado from "./components/Table/TableItensSimulado";

function App() {
  const [nroNota, setNroNota] = useState('');
  const [codParc, setCodParc] = useState('');
  const [showTableItensNota, setShowTableItensNota] = useState(false);
  const [showFormCalculo, setShowFormCalculo] = useState(false)
  const [valorFreteKg, setValorFreteKg] = useState('');
  const [produtosSelecionados, setProdutosSelecionados] = useState({});

  const handleInputNota = (event) => {
    setNroNota(event.target.value);
  }

  const handleInputParc = (event) => {
    setCodParc(event.target.value);
  }

  const handleSearch = () => {
    setShowTableItensNota(true);
  }

  const handleLimpar = () => {
    setNroNota("");
    setCodParc("");
    setShowTableItensNota(false);
    setShowFormCalculo(false);
    setValorFreteKg("");
    setProdutosSelecionados("");
  }

  const handleFormulario = () => {
    setShowFormCalculo(true);
  }

  const handleAttValorFreteKg = (valor) => {
    setValorFreteKg(valor);
  };

  const handleProdutosParaSimular = (valor) => {
    setProdutosSelecionados(valor);
  };



  return (
    <div>
      <div className="mt-5 flex flex-col items-center justify-center">
        <h1 className="title mb-5">SIMULAÇÃO DE FRETE</h1>
        <div className="search flex items-center justify-center w-full max-w-md space-x-2">
          <input
            type="text"
            placeholder="Digite o Nro. Nota"
            className="bg-gray-100 border shadow-md border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-500 block w-full p-2.5 cursor"
            onChange={handleInputNota}
            value={nroNota}
          />
          <input
            type="text"
            placeholder="Digite o Cód. Parceiro"
            className="bg-gray-100 border shadow-md border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-500 block w-full p-2.5 cursor"
            onChange={handleInputParc}
            value={codParc}
          />
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={handleSearch}
          >
            Buscar
          </button>

        </div>

        {showFormCalculo && (
          <div className="m-10">
            <FormCalculaFreteKg handleAttValorFreteKg={handleAttValorFreteKg} />
          </div>
        )}

      </div>

      {showTableItensNota && (
        <div className="m-10">
          <TableItensNota nroNota={nroNota} codParc={codParc} handleLimpar={handleLimpar} handleFormulario={handleFormulario} handleProdutosParaSimular={handleProdutosParaSimular} />
        </div>
      )}

      {produtosSelecionados.length > 0 && (
        <div className="m-10">
          <TableItensSimulado handleLimpar={handleLimpar} produtosSelecionados={produtosSelecionados} valorFreteKg={valorFreteKg}/>
        </div>
      )}


    </div>
  );
}

export default App;
