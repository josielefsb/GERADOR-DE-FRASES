const phrases = [
  { category: 'trabalho', label: 'TRABALHO', text: 'Você não precisa amar seu trabalho. No começo, basta não responder “e se eu sumisse?” no grupo da equipe.' },
  { category: 'trabalho', label: 'TRABALHO', text: 'Seu potencial é enorme. Seu salário ainda não percebeu, mas siga dando a ele tempo para processar.' },
  { category: 'trabalho', label: 'TRABALHO', text: 'Não é síndrome do impostor se você realmente não sabe o que está fazendo. É só terça-feira.' },
  { category: 'trabalho', label: 'TRABALHO', text: 'Você é peça fundamental da equipe. Uma peça que, aparentemente, poderia ser substituída por uma planilha.' },
  { category: 'amor', label: 'AMOR', text: 'O amor da sua vida pode estar por aí. Tomara que tenha aprendido a responder mensagens.' },
  { category: 'amor', label: 'AMOR', text: 'Você merece alguém que te trate como prioridade. E não como notificação que a pessoa vai ver depois.' },
  { category: 'amor', label: 'AMOR', text: 'Se era para ser, vai ser. Se não era, pelo menos você ganhou uma história para contar sem nomes.' },
  { category: 'amor', label: 'AMOR', text: 'Relacionamento é sobre ceder. De preferência, ceder a senha do streaming e escolher o filme sem discutir.' },
  { category: 'vida', label: 'VIDA ADULTA', text: 'Você não precisa ter tudo sob controle. Ninguém tem. Alguns só fazem planilhas melhores.' },
  { category: 'vida', label: 'VIDA ADULTA', text: 'Um passo de cada vez. A menos que seja rumo à pia: nesse caso, leve a louça junto.' },
  { category: 'vida', label: 'VIDA ADULTA', text: 'A vida não vem com manual. Vem com boletos, que é quase a mesma coisa, só que menos útil.' },
  { category: 'vida', label: 'VIDA ADULTA', text: 'Você está indo no seu tempo. O relógio não sabe disso, mas ele também não paga suas contas.' },
  { category: 'autoestima', label: 'AUTOESTIMA', text: 'Acredite em você. Alguém precisa fazer isso enquanto o resto aguarda resultados.' },
  { category: 'autoestima', label: 'AUTOESTIMA', text: 'Você é uma pessoa incrível. Fonte: uma voz interior que claramente não passou por uma auditoria.' },
  { category: 'autoestima', label: 'AUTOESTIMA', text: 'Não diminua sua luz por ninguém. No máximo, use um dimmer para não incomodar os vizinhos.' },
  { category: 'autoestima', label: 'AUTOESTIMA', text: 'Você já sobreviveu a 100% dos seus dias ruins. Estatística impressionante; amostra meio inconveniente.' },
];

const phraseElement = document.querySelector('#phrase');
const categoryElement = document.querySelector('#category');
const labelElement = document.querySelector('#phrase-category');
const countElement = document.querySelector('#phrase-count');
const copyButton = document.querySelector('#copy-button');
const copyLabel = document.querySelector('#copy-label');
let previousIndex = 10;
let phraseCount = 1;

function generatePhrase() {
  const selectedCategory = categoryElement.value;
  const matchingPhrases = phrases
    .map((phrase, index) => ({ phrase, index }))
    .filter(({ phrase }) => selectedCategory === 'todas' || phrase.category === selectedCategory);
  const availablePhrases = matchingPhrases.filter(({ index }) => index !== previousIndex);
  const choices = availablePhrases.length ? availablePhrases : matchingPhrases;
  const selected = choices[Math.floor(Math.random() * choices.length)];

  previousIndex = selected.index;
  phraseCount += 1;
  phraseElement.textContent = selected.phrase.text;
  labelElement.textContent = selected.phrase.label;
  countElement.textContent = String(phraseCount).padStart(2, '0');
  copyLabel.textContent = 'Copiar';
  copyButton.title = 'Copiar frase';
}

document.querySelector('#generate-button').addEventListener('click', generatePhrase);
categoryElement.addEventListener('change', generatePhrase);

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(phraseElement.textContent);
    copyLabel.textContent = 'Copiada';
    copyButton.title = 'Frase copiada';
  } catch {
    copyLabel.textContent = 'Não copiou';
    copyButton.title = 'Não foi possível copiar a frase';
  }
});
