import "./specifications.scss";
import { DynamicButtonComponent } from "components/buttons/Buttons";
import React, { useState, useEffect } from "react";

interface specificationsI {
  data: Array<{ [key: string]: string }>;
}

export const Specifications = ({ data }: specificationsI) => {
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
          {data.map((el, index) => (
            <DynamicButtonComponent
              text={el.title}
              key={`${el.title}_${index}`}
              id={`${el.title}_${index}`}
            />
          ))}
        </div>
      </section>
      {info && (
        <article className="specifications__table">
          <div className="table">
          {
            /*
            <h2 className="title">{buttonsData[activeInfoId - 1].text}</h2>
            <section className="information">
              {data.map((el, index) => {
                return (
                  <div className="row">
                    <div className="text">
                      <p>Поддержка сетей 2G</p>
                      <p>GSM 900, GSM 1900, GSM 1800, GSM 850</p>
                    </div>
                    <span></span>
                  </div>
                );
              })}
            </section>
            */
          }
          </div>
        </article>
      )}
    </article>
  );
};
