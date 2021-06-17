import React from "react";

export const Form = (props: any) => (
    <form onSubmit={props.weatherMethod}>
        <input type="text" name="city" placeholder="Город" />
        <button>Получить погоду</button>
    </form>
);
