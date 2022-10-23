import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ModalTheme({ closeModal }) {
  const { theme, setTheme } = useContext(ThemeContext);

  function handleChange(e) {
    setTheme(e.target.value);
    localStorage.setItem("theme", e.target.value);
  }

  return (
    <div className="modal" onClick={closeModal}>
      <div className="modalBody" onClick={(e) => e.stopPropagation()}>
        <div className="close">
          <i class="uil uil-times-circle" onClick={closeModal}></i>
        </div>
        <div className="modalTitle">Выберите тему приложения</div>
        <div className="modalThemes">
          <div>
            <input
              type="radio"
              id="black"
              onChange={(e) => handleChange(e)}
              name="themeRadio"
              value="black"
            />
            <label htmlFor="black">Черная</label>
          </div>
          <div>
            <input
              type="radio"
              id="pink"
              onChange={(e) => handleChange(e)}
              name="themeRadio"
              value="pink"
            />
            <label htmlFor="pink">Розовая</label>
          </div>
          <div>
            <input
              type="radio"
              id="lpurp"
              onChange={(e) => handleChange(e)}
              name="themeRadio"
              value="lpurp"
            />
            <label htmlFor="lpurp">Лиловая</label>
          </div>
          <div>
            <input
              type="radio"
              id="purp"
              onChange={(e) => handleChange(e)}
              name="themeRadio"
              value="purp"
            />
            <label htmlFor="purp">Фиолетовая</label>
          </div>
          <div>
            <input
              type="radio"
              id="blue"
              onChange={(e) => handleChange(e)}
              name="themeRadio"
              value="blue"
            />
            <label htmlFor="blue">Синяя</label>
          </div>
          <div>
            <input
              type="radio"
              id="beer"
              onChange={(e) => handleChange(e)}
              name="themeRadio"
              value="beer"
            />
            <label htmlFor="beer">Бирюзовая</label>
          </div>
          <div>
            <input
              type="radio"
              id="green"
              onChange={(e) => handleChange(e)}
              name="themeRadio"
              value="green"
            />
            <label htmlFor="green">Зеленая</label>
          </div>
          <div>
            <input
              type="radio"
              id="orange"
              onChange={(e) => handleChange(e)}
              name="themeRadio"
              value="orange"
            />
            <label htmlFor="orange">Оранжевая</label>
          </div>
        </div>
      </div>
    </div>
  );
}
