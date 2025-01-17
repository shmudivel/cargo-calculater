import React, { useState, useEffect } from "react";
import "../index.css";
import { useTranslation } from "react-i18next";
import { GiWarpPipe } from "react-icons/gi";

const PipeVolume = () => {
  //Languages
  const { t } = useTranslation();

  // State
  const [diameterPipe, setDiameterPipe] = useState("");
  const [lengthPipe, setLengthPipe] = useState("");
  const [qtyVolumePipe, setQtyVolumePipe] = useState("");

  const [volumePipe, setVolumePipe] = useState("");

  const [ratePricePipe, setRatePricePipe] = useState("");
  const [totalPricePipe, setTotalPricePipe] = useState("");

  // Calculations
  let calcVolumePipe = (event) => {
    event.preventDefault();

    if (
      diameterPipe === 0 ||
      lengthPipe === 0 ||
      qtyVolumePipe === 0 ||
      ratePricePipe === 0
    ) {
      alert(t("Please enter a valid parameters!"));
    } else {
      const volumePipe =
        (((Math.PI * diameterPipe * diameterPipe) / 4) *
          lengthPipe *
          qtyVolumePipe) /
        1000000;
      setVolumePipe(volumePipe.toFixed(4));

      const priceCalculationPipe = volumePipe * ratePricePipe;
      setTotalPricePipe(priceCalculationPipe.toFixed(2));
    }
  };

  let cleanAll = () => {
    window.location.reload();
    localStorage.clear();
  };

  useEffect(() => {
    const diameterPipe = localStorage.getItem("diameterPipe");
    const lengthPipe = localStorage.getItem("lengthPipe");
    const qtyVolumePipe = localStorage.getItem("qtyVolumePipe");
    const ratePricePipe = localStorage.getItem("ratePricePipe");

    if (diameterPipe) {
      setDiameterPipe(diameterPipe);
    }
    if (lengthPipe) {
      setLengthPipe(lengthPipe);
    }
    if (qtyVolumePipe) {
      setQtyVolumePipe(qtyVolumePipe);
    }
    if (ratePricePipe) {
      setRatePricePipe(ratePricePipe);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("diameterPipe", diameterPipe);
    localStorage.setItem("lengthPipe", lengthPipe);
    localStorage.setItem("qtyVolumePipe", qtyVolumePipe);
    localStorage.setItem("ratePricePipe", ratePricePipe);
  }, [diameterPipe, lengthPipe, qtyVolumePipe, ratePricePipe]);

  return (
    <div>
      <div className="container">
        <h2 className="center">
          <GiWarpPipe size={50} />
          {t("Pipe Volume Calculator")}
          <GiWarpPipe size={50} />
        </h2>

        <form onSubmit={calcVolumePipe}>
          <div>
            <label>{t("Diameter (cm)")}</label>
            <input
              value={diameterPipe}
              onChange={(event) => setDiameterPipe(event.target.value)}
              type="number"
            />
          </div>
          <div>
            <label>{t("Length (cm)")}</label>
            <input
              value={lengthPipe}
              onChange={(event) => setLengthPipe(event.target.value)}
              type="number"
            />
          </div>

          <div className="qtyOfBox">
            <label>{t("How many pipes? (Qty)")}</label>
            <input
              value={qtyVolumePipe}
              onChange={(event) => setQtyVolumePipe(event.target.value)}
              type="number"
            />
          </div>

          <div className="qtyOfBox">
            <label>{t("Price per 1mᶟ")}</label>
            <input
              value={ratePricePipe}
              onChange={(event) => setRatePricePipe(event.target.value)}
              type="number"
            />
          </div>

          <button className="btn" type="submit">
            {t("Calculate")}
          </button>
          <button className="btn btn-delete" onClick={cleanAll} type="delete">
            {t("Reset")}
          </button>
        </form>

        <div className="center">
          <h3>
            {t("TOTAL volume is: ")}
            {volumePipe} {t("mᶟ")}
          </h3>
          {/* <p>{message}</p> */}
        </div>

        <div className="center">
          <h3>
            {t("TOTAL sum is: ")}
            {totalPricePipe} {t("")}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default PipeVolume;
