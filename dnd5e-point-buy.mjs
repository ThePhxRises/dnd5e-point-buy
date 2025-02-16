const {api, sheets} = foundry.applications;

class PointBuyCalculator extends api.HandlebarsApplicationMixin(sheets.ActorSheetV2) {}

/**
 *
 * @param {HTMLElement} html
 * @returns {object}
 */
function liToActor(html) {
  if (html instanceof jQuery) html = html[0];
  const actorId = html.dataset.entryId;
  return game.actors.get(actorId);
}

Hooks.on("getEntryContextActorDirectory", (app, entries) => {
  console.log(app, entries);
  const index = entries.findIndex(el => el.name === "OWNERSHIP.Configure");

  entries.splice(index, 0, {
    name: "DND5EPointBuy.MenuLabel",
    icon: "<i class=\"fa-solid fa-calculator\"></i>",
    callback: (html) => {
      const actor = liToActor(html);
      new PointBuyCalculator({document: actor}).render({force: true});
    },
    condition: (html) => {
      const actor = liToActor(html);
      return actor.type === "character";
    }
  });
});
