import React, { useEffect } from "react";

function TableItensSimulado({ produtosSelecionados, valorFreteKg, handleLimpar }) {
    useEffect(() => {
        console.log("Valor:", valorFreteKg);
    }, [valorFreteKg]);

    // Verificação do valor do frete
    if (Number(valorFreteKg) === 0 || valorFreteKg === "") {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="font-bold text-red-500 text-[15px]">
                    Por favor, informe o valor do frete e do peso.
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
                                <th scope="col" className="px-6 py-3">Peso Unitário (kg)</th>
                                <th scope="col" className="px-6 py-3">Quantidade</th>
                                <th scope="col" className="px-6 py-3">Peso Bruto (kg)</th>
                                <th scope="col" className="px-6 py-3">Valor Frete (R$)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(produtosSelecionados) && produtosSelecionados.length > 0 ? (
                                produtosSelecionados.map((produto) => {
                                    const pesoBrutoTotal = produto.pesoBruto * produto.quantidade;
                                    const valorFreteItem = valorFreteKg * pesoBrutoTotal.toFixed(2);
                                    
                                    console.log("teste: ", valorFreteKg, pesoBrutoTotal)
                                    return (
                                        <tr key={produto.codProduto} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4">{produto.numnota}</th>
                                            <td className="px-6 py-4">{produto.nomeParceiro}</td>
                                            <td className="px-6 py-4">{produto.nomeProduto}</td>
                                            <td className="px-6 py-4">{produto.codProduto}</td>
                                            
                                            <td className="px-6 py-4">{produto.pesoBruto}</td>
                                            <td className="px-6 py-4">{produto.quantidade}</td>
                                            <td className="px-6 py-4">{pesoBrutoTotal.toFixed(2)}</td>
                                            <td className="px-6 py-4">{valorFreteItem.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 4, maximumFractionDigits: 4 })}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center px-6 py-4">Nenhum produto selecionado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-4 flex justify-left space-x-4">
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

export default TableItensSimulado;
