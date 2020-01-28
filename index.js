var process = (onlySelected = false, minLvl = 0, maxLvl = 12) => {
  const skeleton = rows => `
  [table]
    [tr]
      [td] Послед [/td]
      [td] Описание [/td]
      [td] Количество [/td]
    [/tr]
    ${rows}
  [/table]`;

  const makeRow = ({ id, amount, name }) => `
    [tr]

      [td]
        http://fantasyland.ru/cgi/army_desc.php?id=${id}
      [/td]

      [td]
        ${name}
      [/td]

      [td]
        ${amount}
      [/td]

    [/tr]

  `;

  const mainNodes = document.querySelectorAll(
    "#divDrak > .ArmyShow, #divRyc > .ArmyShow, #divDam > .ArmyShow"
  );

  const infos = Array.from(mainNodes).map(node => {
    const id = node.id.substr(2);
    const amount = node.querySelector("span > span").innerText;
    const [name, lvlString] = node
      .querySelector("div")
      .onmousemove.toString()
      .match(/(?<=<b>).*?(?=<\/b>)/g);
    const lvl = lvlString.substr(-2);
    const selected = node.querySelector("input").checked;

    return {
      id,
      amount,
      name,
      lvl,
      selected
    };
  });

  const rows = infos.reduce((acc, { lvl, selected, ...row }) => {
    if (!selected && onlySelected) {
      return acc;
    }

    if (lvl <= minLvl || lvl >= maxLvl) {
      return acc;
    }

    return acc + makeRow(row);
  }, "");

  const result = skeleton(rows);

  copy(result);
};
