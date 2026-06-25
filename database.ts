namespace Database {
  export interface Pergunta {
    quiz: string;
    alternativas: string[];
    resposta: number;
    time: number;
  }

  export function criarPergunta(p: {
    quiz: string;
    alternativas: string[];
    resposta: number;
    time?: number;
  }): Pergunta {
    return {
      quiz: p.quiz,
      alternativas: p.alternativas,
      resposta: p.resposta,
      time: p.time === undefined ? 15 : p.time
    };
  }

  // Perguntas difíceis (C, POO e programação geral) - 15s padrão
  export const perguntasStalker: Pergunta[] = [
    criarPergunta({
      quiz: "Em C, o que ocorre ao acessar memória já liberada (free)?",
      alternativas: [
        "Comportamento indefinido",
        "Erro de compilação",
        "Memória é automaticamente realocada"
      ],
      resposta: 0,
      time: 15
    }),

    criarPergunta({
      quiz: "Qual estrutura de dados melhor representa uma pilha?",
      alternativas: [
        "FIFO",
        "LIFO",
        "Árvore binária"
      ],
      resposta: 1,
      time: 15
    }),
    criarPergunta({
        quiz: "Qual operador retorna o endereço de uma variável em C?",
        alternativas: [
            "&",
            "*",
            "%"
        ],
        resposta: 0,
        time: 15
    }),
    criarPergunta({
        quiz: "O que significa FIFO?",
        alternativas: [
            "First In, First Out",
            "First In, Final Out",
            "Fast Input, Fast Output"
        ],
        resposta: 0,
        time: 15
    }),
    criarPergunta({
        quiz: "Qual palavra-chave em C define um valor imutável?",
        alternativas: [
            "final",
            "static",
            "const"
        ],
        resposta: 2,
        time: 15
    })
  ];

  // Perguntas sobre linguagem C
  export const perguntasC: Pergunta[] = [
    criarPergunta({
      quiz: "Qual operador acessa valor de um ponteiro em C?",
      alternativas: ["&", "*", "#"],
      resposta: 1
    }),

    criarPergunta({
      quiz: "Qual função aloca memória dinamicamente em C?",
      alternativas: ["malloc()", "printf()", "sizeof()"],
      resposta: 0
    })
  ];

  export const perguntasPOO: Pergunta[] = [
    criarPergunta({
      quiz: "Qual princípio da POO protege dados internos de uma classe?",
      alternativas: [
        "Encapsulamento",
        "Herança",
        "Compilação"
      ],
      resposta: 0
    }),

    criarPergunta({
      quiz: "O que permite o polimorfismo na POO?",
      alternativas: [
        "Uma interface ter múltiplas implementações",
        "Criar variáveis globais",
        "Eliminar objetos"
      ],
      resposta: 0
    }),

    criarPergunta({
      quiz: "Herança em POO significa:",
      alternativas: [
        "Criar funções isoladas",
        "Reutilizar atributos e métodos de outra classe",
        "Compilar código mais rápido"
      ],
      resposta: 1
    })
  ];
}
