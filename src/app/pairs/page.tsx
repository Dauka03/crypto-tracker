import { Button } from "antd";
import PairTable from "../components/pair-table";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Курсы криптовалют</h1>
      <PairTable />
      <Button href="/" type="default" className="mb-4">
        Назад
      </Button>

    </main>
  );
}
