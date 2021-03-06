//Base de dados de questões do FAQ
var questionarioDB = [{
        categoria: "Cadastro", //Categoria do FAQ, renderizada no menu lateral
        questoes: [ //Base de questões de uma categoria
            {
                titulo: "Como me cadastrar no site?", //Título que aparece no topo expansível da questão
                conteudo: //Conteúdo que aparece no painel expansível da questão
                    "Clique no botão de \"Entrar\" na barra de menu superior direito do site e entre com seu usuário e senha nos campos informados."
            },

            { titulo: "Como recupero minha senha?", conteudo: "Na tela de login, clique no link \"Esqueci minha senha\", após isto, informe o email cadastrado em sua conta que você receberá um email de redefinição de senha." },

            { titulo: "É possível comprar no site sem me cadastrar?", conteudo: "Você pode realizar todo o processo de carrinho de compras e checkout sem a necessidade de realizar um cadastro, porém, no checkout, você terá que informar todos os seus dados necessários para conclusão da compra." }
        ],
        ativa: true, //Controla se esta categoria está ativa atualmente, ou seja, mostrando as perguntas na tela
        visivelFAQ: true //Configura se esta categoria é visível no FAQ
    },
    {
        categoria: "Entregas",
        questoes: [
            { titulo: "Qual o prazo médio da entrega?", conteudo: "De 5 à 10 dias úteis." },

            { titulo: "Como mudo o endereço de entrega?", conteudo: "Entre no seu perfil clicando em \"Minha conta\", depois clique no item \"Endereços de entrega\" no menu lateral esquerdo. Após isto, clique em \"Alterar endereço\" no endereço desejado. " },

            { titulo: "Disponível para todo brasil?", conteudo: "Todos os produtos estão disponíveis para entrega em todo o brasil." }
        ],
        ativa: false,
        visivelFAQ: true
    },
    {
        categoria: "Trocas",
        questoes: [
            { titulo: "Onde solicito a troca?", conteudo: "Entre no link \"Minhas Compras\" no menu superior, após isto, clique em \"Detalhes da compra\" na compra que você deseja realizar a troca, após isto, clique em \"Solicitar Troca de Produto\"." },

            { titulo: "Quanto tempo demora para realizar uma troca?", conteudo: "De 5 à 10 dias úteis." },

        ],
        ativa: false,
        visivelFAQ: true
    },
    {
        categoria: "Pedidos",
        questoes: [
            { titulo: "Realizei um pedido, mas cancelei, terei reemboso?", conteudo: "Se o envio do produto ainda não foi realizado, o reembolso acontecerá de 3 à 7 dias úteis. Pode variar de acordo com o banco, em caso de cartão de crédito. Compras no boleto serão reembolsados como Créditos da Loja." },

        ],
        ativa: false,
        visivelFAQ: true
    },
    {
        categoria: "Produtos",
        questoes: [
            { titulo: "Onde encontro as especificações do produto?", conteudo: "Dentro da página de produto, role até abaixo das fotos do produto e clique em \"Detalhes do Produto\". " },

            { titulo: "É possível encomendar um produto personalizado?", conteudo: "Não, infelizmente não trabalhamos com produtos personalizados." },

            { titulo: "Porque nem todos os produtos estão disponíveis para compra?", conteudo: "Alguns produtos estão disponíveis na loja, porém ainda não foram lançados, mas você pode realizar a pré-compra deles, reservando-os dentro da página de produto, que assim que o produto estiver disponível, ele será enviado para o endereço cadastrado em sua conta." }
        ],
        ativa: false,
        visivelFAQ: true
    },
    {
        categoria: "Atendimento via e-mail:", //Categoria que controla o formulário de E-mail para aparecer o lugar das questões
        ativa: false,
        visivelFAQ: false
    }
]

var chat = [{
        autor: "Felipe", //Autor da fala
        mensagem: "Qual o prazo de entrega?", //Conteúdo da fala do chat
        datahora: "em 26/01/2018 às 11:56:18", //Data-hora pré renderizados de demonstração
        posicao: "eu" //Como a mensagem se comporta. "eu" significa mensagem que o usuário envia, "oposto" significa mensagem do sistema.
    },
    {
        autor: "Sistema",
        mensagem: "Felipe, obrigado por aguardar. Você está sendo transferido para um operador. O Número de seu protocolo é 302265.",
        datahora: "em 26/01/2018 às 11:57:18",
        posicao: "oposto"
    },
    {
        autor: "Leonardo Barbosa",
        mensagem: "Olá Felipe, o prazo de entrega para a região sudeste tem previsão de no máximo 07 dias úteis.",
        datahora: "em 26/01/2018 às 11:57:18",
        posicao: "oposto"
    },
    {
        autor: "Felipe",
        mensagem: "Obrigado",
        datahora: "em 26/01/2018 às 11:57:18",
        posicao: "eu"
    },
];


var app;
document.addEventListener("DOMContentLoaded", function() {
    const PageInicio = {
        template: document.getElementById("Inicio")
    };
    const PageBuscaAtendimento = {
        template: document.getElementById("BuscaAtendimento"),
        data() {
            return {
                //Controla a mensagem de erro no campo de busca do "Busca Inteligente"
                erroBusca: false,

            }
        },
        methods: {
            //Simula a pesquisa de tópicos e mostra a mensagem de erro
            pesquisarTopicos: function(el) {
                console.log(el)
                if (el.target.value == "") {
                    this.erroBusca = false;
                } else {
                    this.erroBusca = true;
                }
            },
            //Controla a navegação entre as categorias do FAQ, onde a categoria
            //com a propriedade "ativa" que tenha o valor true é a categoria mostrada
            //na tela atualmente.
            //A única excessão é o formulário de cadastro, que terá o "visivelFAQ" igual a false
            //para usar a mesma estrutura de navegação das questões, porém, renderizando o formulário de cadastro
            navegarFAQ: function(categoria) {
                router.push({ name: "FAQ", params: { categoria: categoria } });
                setTimeout(function() {
                    if (window.innerWidth < 481) {
                        document.querySelector(".perguntas-wrapper").scrollIntoView({ behavior: 'smooth' });
                    }
                }, 50);

            }
        }
    };
    var PageFAQ = {

        template: document.getElementById("FAQ"),
        created() {
            if (this.$route.params.categoria) {
                this.navegarFAQ(this.$route.params.categoria);
            } else {
                this.navegarFAQ("Cadastro");
            }
        },
        data() {
            return {
                questionario: questionarioDB,

                //Controla a mensagem de erro no campo de busca do "Busca Inteligente"
                erroBuscaFAQ: false,

                //Controla a mensagem de sucesso do formulário de Email
                sucessoForm: false,

                //Controla se o formulário de Email pode mostrar as mensagens de erro
                podeValidar: false,

                //Controla se mostra ou esconde o formulário de contato
                formAtivo: false,


                //Controla os campos do formulário para validação
                form: {
                    assunto: "",
                    nome: "",
                    email: "",
                    emailValido: false,
                    mensagem: ""
                }
            }
        },
        methods: {
            //Valida se o email digitado é um email válido
            validarEmail() {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.form.email)) {
                    this.form.emailValido = true;
                } else {
                    this.form.emailValido = false;
                }
            },

            //Mostra o formulário de contato na área de FAQ
            mostrarForm: function() {
                for (cat in this.questionario) {
                    this.questionario[cat].ativa = false;
                }
                this.formAtivo = true;
            },

            //Simula a pesquisa de tópicos e mostra a mensagem de erro
            pesquisarTopicosFAQ: function(el) {
                if (el.target.value == "") {
                    this.erroBuscaFAQ = false;
                } else {
                    this.erroBuscaFAQ = true;
                }
            },
            //Mostra ou esconde o conteúdo de alguma pergunta presente no FAQ
            toggleQuestao: function(el) {
                console.log(el.target);
                el.target.parentElement.parentElement.classList.toggle("aberto");
            },

            //Mostra mensagem de feedback sobre a resposta do FAQ ser util ou não
            respostaUtil: function(el, resposta) {
                el.target.parentElement.querySelector(`.feedback-${resposta}`).classList.add("aberto");
                el.target.parentElement.querySelector(`a:not(.resposta-util-${resposta})`).setAttribute("disabled", "disabled");
            },

            navegarFAQ: function(categoria) {
                this.formAtivo = false;
                for (cat in this.questionario) {
                    this.questionario[cat].ativa = false;
                }

                for (cat in this.questionario) {
                    if (this.questionario[cat].categoria == categoria) {
                        this.questionario[cat].ativa = true;
                    }
                }
                setTimeout(function() {
                    if (window.innerWidth < 481) {
                        document.querySelector(".perguntas-wrapper").scrollIntoView({ behavior: 'smooth' });
                    }
                }, 50);

            },
            //Função para validar o formulário
            //Faz um loop pelos objetos do formulário e verifica se tem 
            //algum valor falso, se tiver, cancela o envio, senão, "envia"
            validarForm: function(ev) {
                this.podeValidar = true;
                ev.preventDefault();
                for (campo in this.form) {
                    if (!this.form[campo]) {
                        return false;
                    }
                }

                this.sucessoForm = true;
                return false;

            },


        }
    };

    var routes = [
        { path: "/", name: "Inicio", component: PageInicio },
        { path: "/BuscaAtendimento", name: "BuscaAtendimento", component: PageBuscaAtendimento },
        { path: "/FAQ", name: "FAQ", component: PageFAQ },
    ];

    //Cria instância do VueRouter, que controla a navegação com histórico
    const router = new VueRouter({
        routes,
    });

    console.log("carregou");
    app = new Vue({
        el: '#app',
        data: {
            //Controla se mostra/esconde o chat
            chatAtivo: false,

            //Base de dados do sistema de chat
            chat: chat,
        },

        methods: {
            //Insere uma fala no sistema de chat
            falarChat: function(quem, mensagem, posicao) {
                var d = new Date();
                this.chat.push({
                    autor: quem,
                    mensagem: mensagem,
                    datahora: "em " + d.toLocaleDateString() + " às " + d.toLocaleTimeString(),
                    posicao: posicao
                });
                document.querySelector(".msg-chat").value = "";

                app.scrollarChat();

                if (posicao == "eu") {
                    app.respostaBot();
                }
            },

            scrollarChat: function() {
                setTimeout(function() { //delay necessário para poder dar tempo do vue processar a mensagem e fazer o scroll
                    var chatbody = document.querySelector(".chat-body").lastChild.lastChild;
                    chatbody.scrollIntoView({ behavior: 'smooth' });
                }, 10);
            },

            //Simula uma resposta do bot
            respostaBot: function() {
                var questionario = PageFAQ.data().questionario;
                setTimeout(function() {
                    var ultimaMensagem = this.chat[this.chat.length - 1].mensagem.toLowerCase();
                    var resposta = "";
                    for (i = 0; i < questionario.length; i++) {
                        var questoesLength = 0;
                        try {
                            questoesLength = questionario[i].questoes.length;
                        } catch (e) {
                            questoesLength = 0;
                        }
                        for (j = 0; j < questoesLength; j++) {
                            if (questionario[i].questoes[j].titulo.toLowerCase() == ultimaMensagem) {
                                resposta = questionario[i].questoes[j].conteudo;
                            }
                        }
                    }
                    if (resposta !== "") {
                        app.falarChat("Sistema", resposta, "oposto");
                    } else {
                        app.falarChat("Sistema", "Desculpe, não entendi o que você quis dizer. Tente outra mensagem.", "oposto");
                    }
                }, 300);
            },

            //Mostra/esconde o chat de suporte
            ativarChat: function() {
                this.chatAtivo = !this.chatAtivo;
                if (this.chatAtivo) {
                    app.scrollarChat();
                }
            },


        },

        router, //Controla a navegação entre as páginas com VueRouter
    });
});