import { useState, useEffect } from "react";
import domtoimage from "dom-to-image";
import dayjs from "dayjs";

function UkazGenerator() {
  // Получаем сегодняшнюю дату в формате 'YYYY-MM-DD'
  const today = dayjs().format('YYYY-MM-DD');

  const [prikazNumber, setPrikazNumber] = useState<string>(() => {
    return localStorage.getItem("prikazNumber") || "";
  });
  const [prikazText, setPrikazText] = useState<string>("");
  const [date, setDate] = useState<string>(() => {
    return localStorage.getItem("date") || today;
  });
  const [signer, setSigner] = useState<string>(() => {
    return localStorage.getItem("signer") || "mayor";
  });

  // Сохраняем изменения в localStorage при изменении состояний
  useEffect(() => {
    localStorage.setItem("prikazNumber", prikazNumber);
  }, [prikazNumber]);

  useEffect(() => {
    localStorage.setItem("date", date);
  }, [date]);

  useEffect(() => {
    localStorage.setItem("signer", signer);
  }, [signer]);

  const handleSaveAsImage = () => {
    const node = document.getElementById("printableArea");
    if (!node) return;

    const scale = 1;
    const style = {
      transform: `scale(${scale})`,
      transformOrigin: "top left",
      width: `${node.offsetWidth}px`,
      height: `${node.offsetHeight}px`,
    };

    domtoimage
      .toPng(node, { style })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `ukaz-${prikazNumber || "no-number"}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Ошибка при сохранении изображения:", err);
      });
  };

  // Определяем текст подписанта в зависимости от выбранного значения
  const signerText =
    signer === "mayor" ? "Мэр Котэм Сити" : "Будущий мэр Котэм Сити";

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
      {/* Форма ввода */}
      <div className="space-y-2 w-full max-w-md">
        <label className="block font-semibold">
          Номер приказа:
          <input
            type="number"
            className="border rounded ml-2 p-1 w-1/2"
            value={prikazNumber}
            onChange={(e) => setPrikazNumber(e.target.value)}
          />
        </label>

        <label className="block font-semibold">
          Дата:
          <input
            type="date"
            className="border rounded ml-2 p-1"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label className="block font-semibold">
          Подписант:
          <select
            className="border rounded ml-2 p-1"
            value={signer}
            onChange={(e) => setSigner(e.target.value)}
          >
            <option value="mayor">Мэр Котэм Сити</option>
            <option value="future">Будущий мэр Котэм Сити</option>
          </select>
        </label>

        <label className="block font-semibold">
          Текст указа:
          <textarea
            className="border rounded block mt-1 p-1 w-full"
            rows={4}
            value={prikazText}
            onChange={(e) => setPrikazText(e.target.value)}
          />
        </label>
      </div>

      {/* Кнопка сохранения */}
      <button
        className="bg-[#DF582A] hover:bg-[#c14a21] text-white px-4 py-2 rounded shadow"
        onClick={handleSaveAsImage}
      >
        Сохранить как изображение
      </button>

      <div className="overflow-auto">
        {/* Область указа (A5) */}
        <div
          id="printableArea"
          className="
            relative
            w-[595px] h-[842px]
            p-8
            bg-white bg-cover bg-center
            border-double border-4 border-[#DF582A]
            rounded-xl
            shadow-xl
            text-black
            font-serif
            flex flex-col
            justify-between
          "
        >
          {/* Шапка */}
          <header className="text-center">
            <h1
              className="
                text-3xl font-bold uppercase tracking-wide
                text-[#DF582A]
              "
            >
              Котэм Сити — вольный мяу земли!
            </h1>
            <p className="mt-2 text-lg italic">«Город, где мурлыканье — закон!»</p>
          </header>

          {/* Основное содержимое указа */}
          <main className="flex-1 mt-8 mb-8">
            <div className="text-center mb-6">
              <p className="text-xl">
                Указ № <span className="font-bold">{prikazNumber || "___"}</span>
              </p>
              <p className="text-sm mt-1">
                {`от ${
                  date
                    ? dayjs(date).format("DD MMMM YYYY г.")
                    : "____-__-__"
                }`}
              </p>
            </div>

            <div className="text-justify px-4">
              {prikazText ? (
                <p style={{whiteSpace: 'pre-line'}}>{prikazText}</p>
              ) : (
                <p className="opacity-70">
                  Введите текст указа: распоряжения, анонсы событий, штрафы за
                  несанкционированную рыбалку в фонтанах и т.д.
                </p>
              )}
            </div>

            {/* Блок с «приколюхами» */}
            <section className="mt-8 px-4">
              <h2
                className="
                  text-lg font-bold text-[#DF582A] underline decoration-2
                  mb-2
                "
              >
                Особые положения:
              </h2>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Коты имеют право на дублирование любого приёма пищи — второй завтрак или третий ужин.</li>
                  <li>Мяуканье при встрече официально считается вежливым приветствием.</li>
                  <li>Запрещается мешать коту во время сиесты под страхом громкого «мяу!» в ночное время.</li>
                </ul>
            </section>
          </main>

          {/* Подвал */}
          <footer className="relative flex justify-between items-center">
            {/* Подпись */}
            <div>
              <p className="font-bold underline decoration-2 text-lg">
                {signerText}
              </p>
              <p className="italic">Заверено управлением всеми управлениями</p>
            </div>

            {/* Печать (замените src на свою) */}
            <img
              src="kotPrint.png"
              alt="Печать"
              className="w-24 h-24 object-contain"
            />
          </footer>
        </div>
      </div>
    </div>
  );
}

export default UkazGenerator;