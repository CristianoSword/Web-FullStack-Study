import DirectoryClient from "./ui";

const ITEMS = [
  { id: "1", name: "Padaria Central", city: "Sao Paulo" },
  { id: "2", name: "Cafe do Bairro", city: "Campinas" },
  { id: "3", name: "Mercado Bom Preco", city: "Rio de Janeiro" },
  { id: "4", name: "Livraria Horizonte", city: "Belo Horizonte" }
];

export default function DirectoryPage() {
  return (
    <main className="container">
      <h1>Diretorio</h1>
      <DirectoryClient items={ITEMS} />
    </main>
  );
}

