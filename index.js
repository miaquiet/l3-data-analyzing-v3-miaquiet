export default function solution(content) {
  const info = content
    .split("\n")
    .slice(1)
    .map((el) => el.slice(0, -1).split(" "));
  // .slice(0, -1);

  // 1 шаг:
  console.log(`Count: ${info.length}`);

  // 2 шаг:
  const castlesSet = new Set();
  info.forEach((el) => castlesSet.add(el[1].toLowerCase()));
  const uniqueCastles = Array.from(castlesSet)
    .sort()
    .map((castle) => castle.charAt(0).toUpperCase() + castle.slice(1))
    .join(", ");
  console.log(`Castles: ${uniqueCastles}`);

  // 3 шаг:
  const creatureWithMaxHp = info.reduce((acc, el) =>
    +el[4] > +acc[4] ? el : acc
  );

  console.log(`Largest hp: ${creatureWithMaxHp[2]}`);

  // 4 шаг:
  const averageDamages = {};
  info.forEach((el) => {
    const creature = el[2];

    const damage = el[3].includes("-")
      ? (parseInt(el[3].split("-")[0]) + parseInt(el[3].split("-")[1])) / 2
      : parseInt(el[3]);

    if (!averageDamages.hasOwnProperty(creature)) {
      averageDamages[creature] = [damage];
    } else {
      averageDamages[creature].push(damage);
    }
  });

  for (const creature in averageDamages) {
    const totalDamage = averageDamages[creature].reduce(
      (acc, damage) => acc + damage,
      0
    );
    const averageDamage = totalDamage / averageDamages[creature].length;
    averageDamages[creature] = averageDamage;
  }

  let result = "Average damage: ";
  for (const creature in averageDamages) {
    result += `${creature}: ${averageDamages[creature]}, `;
  }
  result = result.slice(0, -2);
  console.log(result);

  // 5 шаг:
  const level7Creatures = info.filter((el) => +el[0] === 7);

  const attacksRequired = {};
  level7Creatures.forEach((el) => {
    const creature = el[2];
    const damage = el[3].includes("-")
      ? (parseInt(el[3].split("-")[0]) + parseInt(el[3].split("-")[1])) / 2
      : parseInt(el[3]);
    const health = parseInt(el[4]);
    const attacks = Math.ceil(health / damage);
    attacksRequired[creature] = attacks;
  });

  const sortedAttacks = Object.entries(attacksRequired).sort(
    (a, b) => a[1] - b[1]
  );

  const strongestCreature = sortedAttacks[sortedAttacks.length - 1][0];

  console.log(`Strongest creature: ${strongestCreature}`);

  const minHealthPerDamage = Math.min(
    ...info.map((el) => {
      const damage = el[3].includes("-")
        ? (parseInt(el[3].split("-")[0]) + parseInt(el[3].split("-")[1])) / 2
        : parseInt(el[3]);
      const health = parseInt(el[4]);
      return health / damage;
    })
  );
}
