import {printError} from "./dom";

export interface ApiSuccess<T = any> {
  success: true;
  data: T;
}

export interface ApiFailure {
  success: false;
  message: string;
}

export type ApiResponse<T = any> = ApiSuccess<T> | ApiFailure;

/**
 * @description Rest API'den verimiz başarılı dönerse bu fonksiyonla veriyi düzenli bir şekilde geri döndürüyoruz.
 * Kullanım amacı ise "kodlama" kısmındaki hata oranını 0 a indirmektir.
 * @param data Herhangi bir veri
 */
export const successResult = <T = any>(data: T): ApiSuccess<T> => {
  return {
    success: true,
    data,
  };
};

/**
 * @description Rest API'den verimiz hatalı dönerse bu fonksiyonla hem bir uyarı bastırıyor, hem de veriyi düzenli geri döndürüyoruz.
 * @param message Hata Mesajı
 */
export const failureResult = (message: string): ApiFailure => {
  printError(message);

  return {
    success: false,
    message,
  };
};
