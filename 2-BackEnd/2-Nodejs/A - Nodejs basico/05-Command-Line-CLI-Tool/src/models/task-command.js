function buildCommand(name, description) {
  return { name, description };
}

const defaultCommands = [
  buildCommand("add", "Adiciona um item a lista local"),
  buildCommand("list", "Lista os itens atuais"),
  buildCommand("done", "Marca um item como concluido"),
];

module.exports = {
  buildCommand,
  defaultCommands,
};
