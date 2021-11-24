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
    const id = (e.target as HTMLButtonElement).id;
    if (id) {
      const number_of_btn = Number(id.split("").pop());
      setActiveInfoId(number_of_btn);
      setInfo(true);
      console.log(data[number_of_btn]);
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
              id={`specif_btn_${index}`}
            />
          ))}
        </div>
      </section>
      {info && (
        <article className="specifications__table">
          <div className="table">
            {info && (
              <>
                <h2 className="title">{data[activeInfoId].title}</h2>
                <section className="information">
                  {Object.keys(data[activeInfoId]).slice(1).map((el: string, index: number) => {
                    return (
                      <div key={`table_key_${index}`} className="row">
                        <div className="text">
                          <p>{el}</p>
                          <p>{data[activeInfoId][el]}</p>
                        </div>
                        <span></span>
                      </div>
                    );
                  })}
                </section>
              </>
            )}
          </div>
        </article>
      )}
    </article>
  );
};
