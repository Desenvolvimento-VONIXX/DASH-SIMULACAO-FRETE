import React, { useState, useEffect } from "react";

function FormCalculaFreteKg({handleAttValorFreteKg}) {
    const [valorFrete, setValorFrete] = useState('');
    const [pesoBruto, setPesoBruto] = useState('');
    const [resultadoFrete, setResultadoFrete] = useState(null);

    const handleInputValorFrete = (event) => {
        setValorFrete(event.target.value);
    }

    const handleInputPesoBruto = (event) => {
        setPesoBruto(event.target.value);
    }

    useEffect(() => {

        if (valorFrete && pesoBruto) {
            const frete = parseFloat(valorFrete.replace(',', '.')); 
            const peso = parseFloat(pesoBruto.replace(',', '.'));

            if (peso !== 0) {
                const resultado = (frete / peso); 
                const resultadoArredondado = Math.floor(resultado * 10000) / 10000; // Arredonda para baixo

                setResultadoFrete(resultadoArredondado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 4, maximumFractionDigits: 4 }));
                handleAttValorFreteKg(resultadoArredondado.toFixed(4)); 
            } else {
                setResultadoFrete('Indefinido'); 
            }
        } else {
            setResultadoFrete(null); 
        }
    }, [valorFrete, pesoBruto]);

    return (
        <div className="search flex items-center justify-center w-full max-w-md space-x-2">
            <input
                type="text"
                placeholder="Digite o Valor do Frete"
                className="bg-gray-100 border shadow-md border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-500 block w-full p-2.5 cursor"
                onChange={handleInputValorFrete}
                value={valorFrete}
            />
            <h1>/</h1>
            <input
                type="text"
                placeholder="Digite o Peso Bruto"
                className="bg-gray-100 border shadow-md border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-500 block w-full p-2.5 cursor"
                onChange={handleInputPesoBruto}
                value={pesoBruto}
            />
            <h1>=</h1>
            <span className="font-bold text-green-800 text-[20px]">
                {resultadoFrete !== null ? resultadoFrete : '0,00'} 
            </span>
        </div>
    );
}

export default FormCalculaFreteKg;
