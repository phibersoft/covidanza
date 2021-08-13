/**
 * @description Bu fonksiyon, günümüzle koronanın başlama tarihi arasındaki gün sayısını verir.
 * @example Örnek olarak şuanda (kodu yazarken) tarih 08/13/2021, korona ise resmi olarak 11/17/2019 tarihinde başladı. İki tarih arasında 635 gün var.
 */
export const getDayCountBetweenCoronaAndToday = () => {
  const corona_starts: any = new Date(`11/17/2019`);
  const today: any = new Date();
  const oneDay = 24 * 60 * 60 * 1000;

  return Math.round(Math.abs((today - corona_starts) / oneDay));
};

/**
 * @description Özellikle testing işlemlerinde kullanmak için yazılmış basit bir uyku fonksiyonu.
 * @param ms Milisaniye
 */
export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * @description Bir timestamp verisini tarih stringine dönüştürür.
 * @param ts Timestamp
 * @example timestampToDate(1628816841) = "13.08.2021 04:07:21"
 */
export const timestampToDate = (ts: number) => {
  const da = new Date();
  da.setTime(ts);

  return da.toLocaleString("tr-TR");
};
