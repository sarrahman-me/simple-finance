const CardPocket = ({ title, amount }: { title: string; amount: number }) => {
  return (
    <div className="bg-white border rounded hover:shadow cursor-pointer p-2 py-3 space-y-2">
      <p className="text-base font-medium">{title}</p>
      <p>{amount}</p>
    </div>
  );
};

export default CardPocket;
