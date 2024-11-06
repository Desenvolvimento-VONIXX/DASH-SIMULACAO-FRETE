import React, { useState, useEffect } from "react";
import { useConsultar } from "../../../hook/useConsultar";

function TableItensNota({ nroNota, codParc, handleLimpar, handleFormulario, handleProdutosParaSimular }) {
    const [result, setResult] = useState([]);
    const [consulta, setConsulta] = useState("");
    const [selectedProducts, setSelectedProducts] = useState({});

    useEffect(() => {
        const novaConsulta = `
      SELECT 
        CAB.NUMNOTA AS NUMNOTA, 
        PAR.NOMEPARC AS NOMEPARC, 
        PRO.CODPROD AS CODPROD, 
        PRO.DESCRPROD AS DESCRPROD, 
        ITE.VLRTOT AS VLRTOT, 
        ITE.QTDNEG AS QTDNEG, 
        ITE.VLRUNIT AS VLRUNIT, 
        ITE.VLRDESC AS VLRDESC, 
        ITE.ALIQIPI AS ALIQIPI, 
        ITE.ALIQICMS AS ALIQICMS, 
        ITE.PERCDESC AS PERCDESC,
        PRO.PESOBRUTO AS PESOBRUTO
      FROM SANKHYA.TGFITE ITE 
      INNER JOIN SANKHYA.TGFCAB CAB ON CAB.NUNOTA = ITE.NUNOTA 
      INNER JOIN SANKHYA.TGFPRO PRO ON ITE.CODPROD = PRO.CODPROD 
      INNER JOIN SANKHYA.TGFPAR PAR ON CAB.CODPARC = PAR.CODPARC 
      WHERE CAB.NUMNOTA = ${nroNota} AND CAB.CODPARC = ${codParc}
      ORDER BY DESCRPROD ASC    
    `;
        setConsulta(novaConsulta);
    }, [nroNota, codParc]);

    const { data, loading, error } = useConsultar(consulta);

    useEffect(() => {
        if (data && data.length > 0) {
            const formattedData = data.map((item) => ({
                numnota: item.NUMNOTA,
                nomeParceiro: item.NOMEPARC,
                nomeProduto: item.DESCRPROD,
                codProduto: item.CODPROD,
                valorTotal: item.VLRTOT,
                quantidade: item.QTDNEG,
                valorUnitario: item.VLRUNIT,
                aliqIPI: item.ALIQIPI,
                aliqICMS: item.ALIQICMS,
                percDesconto: item.PERCDESC,
                pesoBruto: item.PESOBRUTO
            }));
            setResult(formattedData);
            handleFormulario();
        }
    }, [data]);

    const handleCheckboxChange = (codProduto, checked) => {
        setSelectedProducts((prevState) => ({
            ...prevState,
            [codProduto]: {
                ...prevState[codProduto],
                selected: checked,
            },
        }));
    };

    const handleQuantityChange = (numnota, codProduto, quantidade, nomeProduto, nomeParceiro, pesoBruto, quantidadeMaxima) => {
        const quantidadeNumerica = Number(quantidade);
        
        // Se a quantidade for maior que a quantidade máxima, redefine para a quantidade máxima
        if (quantidadeNumerica > quantidadeMaxima) {
            quantidade = quantidadeMaxima; // redefine para a quantidade máxima
        }
        
        setSelectedProducts((prevState) => ({
            ...prevState,
            [codProduto]: {
                ...prevState[codProduto],
                quantidade,
                numnota,
                nomeProduto,
                nomeParceiro,
                pesoBruto
            },
        }));
    };

    const handleSimular = () => {
        const produtosSelecionados = Object.entries(selectedProducts)
            .filter(([_, { selected }]) => selected)
            .map(([codProduto, { quantidade, numnota, nomeProduto, nomeParceiro, pesoBruto}]) => ({
                numnota,
                codProduto,
                quantidade,
                nomeProduto,
                nomeParceiro,
                pesoBruto,
            }));

        console.log("Produtos selecionados:", produtosSelecionados);
        handleProdutosParaSimular(produtosSelecionados);
    };

    if (loading) {
        return (
            <div>
                <p className="font-bold text-white text-[25px]">Carregando...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <p className="font-bold text-red-500 text-[25px]">Error</p>
            </div>
        );
    }

    if (result.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="font-bold text-red-500 text-[15px]">
                    Nota ou Parceiro não encontrado.
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="relative overflow-auto max-h-[60vh] shadow-md rounded-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Número Único</th>
                                <th scope="col" className="px-6 py-3">Parceiro</th>
                                <th scope="col" className="px-6 py-3">Produto</th>
                                <th scope="col" className="px-6 py-3">Cód. Produto</th>
                                <th scope="col" className="px-6 py-3">Qnt</th>
                                <th scope="col" className="px-6 py-3">Simular Frete?</th>
                                <th scope="col" className="px-6 py-3">Quantidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.map((item, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4">{item.numnota}</th>
                                    <td className="px-6 py-4">{item.nomeParceiro}</td>
                                    <td className="px-6 py-4">{item.nomeProduto}</td>
                                    <td className="px-6 py-4">{item.codProduto}</td>
                                    <td className="px-6 py-4">{item.quantidade}</td>
                                    <td className="px-6 py-4 flex justify-center items-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                            checked={selectedProducts[item.codProduto]?.selected || false}
                                            onChange={(e) => handleCheckboxChange(item.codProduto, e.target.checked)}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <input
                                            type="number"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5"
                                            value={selectedProducts[item.codProduto]?.quantidade || ""}
                                            onChange={(e) => handleQuantityChange(item.numnota, item.codProduto, e.target.value, item.nomeProduto, item.nomeParceiro, item.pesoBruto, item.quantidade)} // Passa a quantidade máxima
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-4 flex justify-left space-x-4">
                <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                    onClick={handleSimular}
                >
                    Simular
                </button>
                <button
                    type="button"
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
                    onClick={handleLimpar}
                >
                    Limpar
                </button>
            </div>
        </div>
    );
}

export default TableItensNota;
