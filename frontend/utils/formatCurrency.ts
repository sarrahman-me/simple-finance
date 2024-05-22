export const formatCurrency = (value: number) => {
  return value.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, // Tambahkan ini untuk menghilangkan angka desimal
    maximumFractionDigits: 0, // Tambahkan ini juga untuk menghindari pembulatan
  });
};
