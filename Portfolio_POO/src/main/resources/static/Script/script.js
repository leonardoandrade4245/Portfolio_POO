const API_CARROS = "http://localhost:8080/carros";
const API_MARCAS = "http://localhost:8080/marcas";

document.addEventListener("DOMContentLoaded", () => {
    listarCatalogo();
    carregarMarcas();
    carregarSlider();
    showSection("home");

    document.getElementById("formNovoCarro").addEventListener("submit", adicionarCarro);
    document.getElementById("formEditarCarro").addEventListener("submit", editarCarro); // ✔️ importante
    document.getElementById("formExcluirCarro").addEventListener("submit", excluirCarro); // ✔️ importante
});

// Mostrar seções
function showSection(sectionId) {
    const allSections = [
        "catalogo", "resultadoPesquisa", "novoCarro", 
        "editarCarro", "excluirCarro"
    ];
    allSections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add("hidden");
    });

    const section = document.getElementById(sectionId);
    if (section) section.classList.remove("hidden");
}

// ---------------------------
// CRUD - CARROS
// ---------------------------
function adicionarCarro(e) {
    e.preventDefault();
    const carro = {
        nome: document.getElementById("nome").value,
        modelo: document.getElementById("modelo").value,
        ano: parseInt(document.getElementById("ano").value),
        classe: document.getElementById("classe").value.toLowerCase(),
        foto: document.getElementById("foto").value,
        preco: parseFloat(document.getElementById("preco").value),
        marca: {
            id: parseInt(document.getElementById("SelectMarca").value)
        }
    };

    fetch(API_CARROS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carro)
    }).then(response => {
        if (!response.ok) throw new Error("Erro ao adicionar carro");
        return response.json();
    }).then(() => {
        alert("Carro adicionado com sucesso!");
        document.getElementById("formNovoCarro").reset();
        listarCatalogo();
    }).catch(err => {
        alert("Erro ao adicionar carro: " + err.message);
    });
}

function editarCarro(e) {
    e.preventDefault();
    const id = document.getElementById("editId").value;
    const carro = {
        nome: document.getElementById("editNome").value,
        modelo: document.getElementById("editModelo").value,
        ano: parseInt(document.getElementById("editAno").value),
        classe: document.getElementById("editClasse").value.toLowerCase(),
        foto: document.getElementById("editFoto").value,
        preco: parseFloat(document.getElementById("editPreco").value),
        marca: {
            id: parseInt(document.getElementById("editMarca").value)
        }
    };

    fetch(`${API_CARROS}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carro)
    }).then(response => {
        if (!response.ok) throw new Error("Erro ao atualizar carro");
        return response.json();
    }).then(() => {
        alert("Carro atualizado com sucesso!");
        listarCatalogo();
    }).catch(err => {
        alert("Erro ao atualizar carro: " + err.message);
    });
}

function excluirCarro(e) {
    e.preventDefault();
    const id = document.getElementById("excluirId").value;

    fetch(`${API_CARROS}/${id}`, {
        method: "DELETE"
    }).then(response => {
        if (!response.ok) throw new Error("Erro ao excluir carro");
        return response.text();
    }).then(() => {
        alert("Carro excluído com sucesso!");
        listarCatalogo();
    }).catch(err => {
        alert("Erro ao excluir carro: " + err.message);
    });
}

// ---------------------------
// Catálogo e Pesquisa
// ---------------------------
function listarCatalogo() {
    fetch(API_CARROS)
        .then(res => res.json())
        .then(data => {
            const catalogo = document.getElementById("catalogo");
            catalogo.innerHTML = "";
            data.forEach(carro => {
                const card = document.createElement("div");
                card.classList.add("carro-card");
                card.innerHTML = `
                    <img src="${carro.foto}" alt="${carro.nome}" />
                    <h3>${carro.nome}</h3>
                    <p><strong>ID:</strong> ${carro.id}</p>
                    <p><strong>Modelo:</strong> ${carro.modelo}</p>
                    <p><strong>Classe:</strong> ${carro.classe}</p>
                    <p><strong>Preço:</strong> R$ ${carro.preco.toFixed(2)}</p>
                    <p><strong>Marca:</strong> ${carro.marca.nome}</p>
                    <p><strong>Ano:</strong> ${carro.ano}</p> 
                    <p><strong>Cor:</strong> ${carro.cor}</p>                  
                   <button onclick='abrirModalCompra(${JSON.stringify(carro)})'>Comprar</button>
                `;
                catalogo.appendChild(card);
            });
        });
}

function pesquisarCarro() {
    const termo = document.getElementById("inputPesquisa").value.toLowerCase();
    fetch(API_CARROS)
        .then(res => res.json())
        .then(data => {
            const resultados = document.getElementById("areaResultados");
            resultados.innerHTML = "";

            const filtrados = data.filter(carro =>
                carro.nome.toLowerCase().includes(termo) ||
                carro.modelo.toLowerCase().includes(termo) ||
                carro.classe.toLowerCase().includes(termo)
            );

            if (filtrados.length === 0) {
                resultados.innerHTML = "<p>Nenhum carro encontrado.</p>";
                return;
            }

            const container = document.createElement("div");
            container.classList.add("catalogo");

            filtrados.forEach(carro => {
                const card = document.createElement("div");
                card.classList.add("carro-card");
                card.innerHTML = `
                    <img src="${carro.foto}" alt="${carro.nome}" />
                    <h3>${carro.nome}</h3>
                    <p><strong>ID:</strong> ${carro.id}</p>
                    <p><strong>Modelo:</strong> ${carro.modelo}</p>
                    <p><strong>Classe:</strong> ${carro.classe}</p>
                    <p><strong>Preço:</strong> R$ ${carro.preco.toFixed(2)}</p>
                    <p><strong>Marca:</strong> ${carro.marca.nome}</p>
                    <p><strong>Ano:</strong> ${carro.ano}</p>  
                    <p><strong>Cor:</strong> ${carro.cor}</p>
                    <button onclick='abrirModalCompra(${JSON.stringify(carro)})'>Comprar</button>                                   
                `;
                container.appendChild(card);
            });

            resultados.appendChild(container);
        });
}

function carregarMarcas() {
    fetch(API_MARCAS)
        .then(res => res.json())
        .then(marcas => {
            const selects = [
                document.getElementById("SelectMarca"),
                document.getElementById("editMarca")
            ];

            selects.forEach(select => {
                if (select) {
                    select.innerHTML = '<option value="">Selecione uma marca</option>';
                    marcas.forEach(marca => {
                        const option = document.createElement("option");
                        option.value = marca.id;
                        option.textContent = marca.nome;
                        select.appendChild(option);
                    });
                }
            });
        })
        .catch(error => {
            console.error("Erro ao carregar marcas:", error);
        });
}

// ---------------------------
// Slider
// ---------------------------
function carregarSlider() {
    fetch(API_CARROS)
        .then(res => res.json())
        .then(data => {
            const slider = document.getElementById("slider");
            slider.innerHTML = "";

            data.forEach((carro, index) => {
                const slide = document.createElement("div");
                slide.classList.add("slide");
                if (index === 0) slide.classList.add("active");

                slide.innerHTML = `
                    <img src="${carro.foto}" alt="${carro.nome}" />
                    <h2>${carro.nome}</h2>
                `;
                slider.appendChild(slide);
            });

            iniciarAnimacaoSlider();
        });
}

function iniciarAnimacaoSlider() {
    const slides = document.querySelectorAll(".slide");
    if (slides.length === 0) return;

    let currentSlide = 0;

    function showNextSlide() {
        slides[currentSlide].classList.remove("active");
        slides[currentSlide].classList.add("exit-left");

        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.remove("exit-left", "enter-right");

        void slides[currentSlide].offsetWidth;

        slides[currentSlide].classList.add("active");
    }

    setInterval(showNextSlide, 6000);
}


// Função de abrir o Modal 
function abrirModalCompra(carro) {
  const modal = document.getElementById('modalCompra');
  const detalhes = document.getElementById('modalDetalhes');
  const acoes = document.getElementById('modalAcoes');

  // Preenche os detalhes
  detalhes.innerHTML = `
    <p class="par_modal"><strong>Nome:</strong> ${carro.nome}</p>
    <p class="par_modal"><strong>Modelo:</strong> ${carro.modelo}</p>
    <p class="par_modal"><strong>Preço:</strong> R$ ${carro.preco}</p>
    <p class="par_modal"><strong>Disponibilidade:</strong> ${carro.disponibilidade === "A_venda" ? "À venda" : "Vendido"}</p>
  `;

  // Define ações com base na disponibilidade
  if (carro.disponibilidade === "A_venda") {
    acoes.innerHTML = `
      <button class="btn_modal" onclick="comprarCarro(${carro.id})">Comprar</button>
    `;
  } else {
    acoes.innerHTML = `<p class="indisponivel">Item indisponível</p>`;
  }

  modal.classList.remove('hidden');
}

// Função de fechar o Modal
function fecharModal() {
  document.getElementById('modalCompra').classList.add('hidden');
}

function comprarCarro(id) {
    fetch(`http://localhost:8080/carros/${id}/vender`, {
        method: "PUT"
    })
    .then(response => {
        if (!response.ok) throw new Error("Erro ao atualizar carro");
        return response.text();
    })
    .then(msg => {
        alert("✅ Carro comprado com sucesso!");
        console.log(msg);
        listarCatalogo(); // atualiza a lista na tela
    })
    .catch(error => {
        console.error(error);
        alert("❌ Erro ao comprar o carro. Tente novamente.");
    });
}

