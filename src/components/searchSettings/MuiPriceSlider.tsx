import React, {useState} from 'react';
import { Slider } from "@mui/material";
import Box from "@mui/material/Box";
import {muiPriceSliderType} from "types";

const MuiPriceSlider: React.FC<muiPriceSliderType> = ({price, setPrice}) => {

    function changePrice(event: Event, newValue: number | number[]) {
        setPrice(newValue as number[]);
    };
    function valuetext(value: number) {
        return `${value}`;
    }

    return (
        <section className="searchSettings__PriceSlider">
            <h3>
                Цена от {price[0]} до {price[1]} рублей
            </h3>
            <Box
                sx={{
                    width: 300,
                }}
            >
                <Slider
                    getAriaLabel={() => "Price"}
                    step={100}
                    min={0}
                    max={50000}
                    onChange={changePrice}
                    value={price}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                />
            </Box>
        </section>
    )
}

export {
    MuiPriceSlider
}