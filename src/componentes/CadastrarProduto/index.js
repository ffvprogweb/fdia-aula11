import React, { useState, useEffect } from "react";
import {
  cadastroDeProduto,
  obtemProduto,
  updateProduto,
} from "../ProdutoServico";
import { useNavigate, useParams } from "react-router-dom";

function CadastrarProduto() {
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [quantidadeNoEstoque, setQuantidadeNoEstoque] = useState("");
  const [custo, setCusto] = useState("");
  const { id } = useParams();
  const [mensagem, setMensagem] = useState(""); // Estado para armazenar a mensagem da resposta HTTP
  const navigator = useNavigate();
  useEffect(() => {
    if (id) {
      obtemProduto(id)
        .then((response) => {
          setDescricao(response.data.descricao);
          setCategoria(response.data.categoria);
          setQuantidadeNoEstoque(response.data.quantidadeNoEstoque);
          setCusto(response.data.custo);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function manipulaDescricao(e) {
    setDescricao(e.target.value);
  }

  function manipulaCategoria(e) {
    setCategoria(e.target.value);
  }

  function manipulaQuantidade(e) {
    setQuantidadeNoEstoque(e.target.value);
  }

  function manipulaCusto(e) {
    setCusto(e.target.value);
  }
  function pageTitle() {
    if (id) {
      return <h2 className="text-center"> Atualizar Produto</h2>;
    } else {
      return <h2 className="text-center"> Cadastrar Produto</h2>;
    }
  }

  function saveProduto(e) {
    e.preventDefault();
    const produto = { descricao, categoria, quantidadeNoEstoque, custo };
    console.log(produto);
    if (id) {
      updateProduto(id, produto)
        .then((response) => {
          console.log(response.data);
          navigator("/produtos");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      cadastroDeProduto(produto)
        .then((response) => {
          console.log(response.data);
          setMensagem(response.data); // Atualiza o estado com a mensagem da resposta HTTP

          navigator("/produtos");
        })
        .catch((error) => {
          console.error("Erro ao cadastrar produto:", error);
          setMensagem("Erro ao cadastrar produto. Por favor, tente novamente."); // Define uma mensagem de erro padrão
        });
    }
  }

  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="card">
          {pageTitle()}

          <div className="card-body">
            {/* Exibição da mensagem */}
            {mensagem && <div className="alert alert-danger">{mensagem}</div>}
            <form>
              <div className="form-group mb-2">
                <label className="form-label"> Descrição:</label>
                <input
                  type="text"
                  placeholder="Entre com a descrição do produto"
                  name="descricao"
                  value={descricao}
                  className="form-control"
                  onChange={manipulaDescricao}
                ></input>
              </div>
              <div className="form-group mb-2">
                <label className="form-label"> Categoria:</label>
                <input
                  type="text"
                  id="categoria"
                  placeholder="Entre com a categoria a qual o produto pertence"
                  name="categoria"
                  value={categoria}
                  className="form-control"
                  onChange={manipulaCategoria}
                ></input>
              </div>
              <div className="form-group mb-2">
                <label className="form-label"> Quantidade:</label>
                <input
                  type="text"
                  placeholder="Entre com a quantidade armazenada no estoque do produto"
                  name="quantidadeNoEstoque"
                  value={quantidadeNoEstoque}
                  className="form-control"
                  onChange={manipulaQuantidade}
                ></input>
              </div>
              <div className="form-group mb-2">
                <label className="form-label"> Custo:</label>
                <input
                  type="text"
                  placeholder="Entre com o custo do produto"
                  name="custo"
                  value={custo}
                  className="form-control"
                  onChange={manipulaCusto}
                ></input>
              </div>
              <button className="btn btn-success" onClick={saveProduto}>
                Submit{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastrarProduto;
