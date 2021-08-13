/**
 * @description Küçük ekranlarda yandan açılan menüyü açabilmek/kapatabilmek için yazılmış parametresiz fonksiyon.
 */
export const toggleSidebar = () => {
  const navbar = document.getElementById("navbar") as HTMLElement;
  const body = document.getElementsByTagName("body")[0] as HTMLBodyElement;
  if (navbar.classList.contains("open")) {
    // close sidebar
    navbar.classList.remove("open");
    body.style.overflowY = "auto";
  } else {
    navbar.classList.add("open");
    body.style.overflowY = "hidden";
  }
};

/**
 * @description Bir kelimenin ilk harfini büyütüp geri döndürür.
 * @param str String
 * @example capitalizeFirstWord("phiber") = "Phiber"
 */
export const capitalizeFirstWord = (str: string) =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

/**
 * @description Bu fonksiyon iki adet tarihi kıyaslar. -1,1,0 değerleri döndürmesinin sebebi ise Javascriptin Array.sort fonksiyonuna uygun tasarlanmasından dolayı.
 * @param a Tarih 1
 * @param b Tarih 2
 * @example compareDates("1/1/1970", "2/10/1981") = -1;
 */
export const compareDates = (a: string, b: string) => {
  const date_a = new Date(a),
    date_b = new Date(b);
  if (date_a < date_b) {
    return -1;
  }
  if (date_a > date_b) {
    return 1;
  }

  return 0;
};

/**
 * @description Eğer async bir işlem gerçekleşiyorsa (Örneğin REST API'ye istek atılması) ve sonuç olumsuzsa, ekranda bekletilen Loading etiketinin içeriğini değiştiriyoruz.
 * @param message Hata Mesajı
 */

export const printError = (message: string) => {
  const elem = document.getElementById("loading") as HTMLDivElement;
  if (elem) {
    elem.textContent = message;
  }
};
