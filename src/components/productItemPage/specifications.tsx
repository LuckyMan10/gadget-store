import "./specifications.scss";
import { DynamicButtonComponent } from "components/buttons/Buttons";
import React, { useState, useEffect } from "react";

interface specificationsI {
  buttonsData: Array<{ id: string; text: string }>;
}

export const Specifications = ({ buttonsData }: specificationsI) => {
  const [info, setInfo] = useState<boolean>(false);

  const [activeInfoId, setActiveInfoId] = useState<number>(0);
  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = Number((e.target as HTMLButtonElement).id);
    if (id) {
      setActiveInfoId(id);
      setInfo(true);
    }
  };

  return (
    <article className="specifications">
      <h2 className="specifications__title">Характеристики</h2>
      <section className="specifications__buttons">
        <div onClick={clickHandler} className="wrapper">
          {buttonsData.map((el) => (
            <DynamicButtonComponent text={el.text} key={el.id} id={el.id} />
          ))}
        </div>
      </section>
      {info && (
        <article className="specifications__table">
          <div className="table">
            <h2 className="title">{buttonsData[activeInfoId - 1].text}</h2>
            <section className="information">
              <div className="row">
                <div className="text">
                  <p>Поддержка сетей 2G</p>
                  <p>GSM 900, GSM 1900, GSM 1800, GSM 850</p>
                </div>
                <span></span>
              </div>
              <div className="row">
                <div className="text">
                  <p>Поддержка сетей 3G</p>
                  <p>UMTS 900, UMTS 2100, UMTS 1900, UMTS 850</p>
                </div>
                <span></span>
              </div>
              <div className="row">
                <div className="text">
                  <p>Поддержка сетей 4G (LTE)</p>
                  <p>
                    Есть: LTE 800 (B19), LTE 850 (B26), LTE 1900 (B25), LTE 1700
                    (B4), LTE 850 (B18), LTE 700 (B13), LTE 1900 (B2), LTE
                  </p>
                </div>
                <span></span>
              </div>
              <div className="row">
                <div className="text">
                  <p>Диапазоны частот LTE</p>
                  <p>
                    1800 (B3), LTE 900 (B8), LTE 2100 (B1), LTE 800 (B20), LTE
                    700 (B28), LTE 850 (B5), LTE 700 (B17), LTE 700 (B12), LTE
                    2600 (B7)
                  </p>
                </div>
                <span></span>
              </div>
              <div className="row">
                <div className="text">
                  <p>Поддержка 4G LTE-Advanced</p>
                  <p>Есть</p>
                </div>
                <span></span>
              </div>
              <div className="row">
                <div className="text">
                  <p>Поддержка сетей 5G</p>
                  <p>Нет</p>
                </div>
                <span></span>
              </div>
              <div className="row">
                <div className="text">
                  <p>Поддержка VoLTE</p>
                  <p>Есть</p>
                </div>
                <span></span>
              </div>
              <div className="row">
                <div className="text">
                  <p>Формат SIM-карт</p>
                  <p>Nano-SIM (12.3x8.8x0.67 мм)</p>
                </div>
                <span></span>
              </div>
              <div className="row">
                <div className="text">
                  <p>Количество SIM-карт</p>
                  <p>1 SIM</p>
                </div>
                <span></span>
              </div>
              <div className="row">
                <div className="text">
                  <p>Поддержка eSIM</p>
                  <p>есть</p>
                </div>
                <span></span>
              </div>
            </section>
          </div>
        </article>
      )}
    </article>
  );
};
