const CSV_PATH = "./data/cocktail-recipes.csv";
const NEW_COCKTAILS_CSV_PATH = "./data/new-cocktails.csv";
const INVENTORY_CSV_PATH = "./data/inventory-2026-06-01.csv";
const STORAGE_KEY = "cocktail-dashboard-ingredient-prices";
const CHARGE_STORAGE_KEY = "cocktail-dashboard-charge-prices";
const CUSTOM_RECIPE_STORAGE_KEY = "cocktail-dashboard-custom-recipes";
const INACTIVE_RECIPE_STORAGE_KEY = "cocktail-dashboard-inactive-recipes";
const EDITED_RECIPE_STORAGE_KEY = "cocktail-dashboard-edited-recipes";
const INVENTORY_ON_HAND_STORAGE_KEY = "cocktail-dashboard-inventory-on-hand";
const INVENTORY_PAR_STORAGE_KEY = "cocktail-dashboard-inventory-par";
const INVENTORY_HISTORY_STORAGE_KEY = "cocktail-dashboard-inventory-history";
const INVENTORY_CABINET_ORDER = [
  "Bulleit Bourbon",
  "Crown Royal",
  "Svedka Blue Raspberry Vodka",
  "Jose Cuervo Silver",
  "Tito's",
  "Ketel One Cucumber Vodka",
  "Absolut Citron",
  "Crown Apple",
  "Captain Morgan",
  "Bombay Sapphire",
  "Jack Daniel's",
  "Blue Rasp Powder",
  "Bitters",
  "Lemon Juice",
  "Raspberry Schnapps",
  "Pomegranate Schnapps",
  "Strawberry Schnapps",
  "Triple Sec",
  "Peach Schnapps",
  "Blueberry Schnapps",
  "Lime Juice",
  "Watermelon Schnapps",
  "Apple Schnapps",
  "Creme de Cacao",
  "Kahlua",
  "Cold Brew",
  "Sweet and Sour",
];
const DEFAULT_BATCH_LABEL = "12 gallon keg";
const PROOF_MAPPINGS = {
  "apple-pucker": { vendor: "Proof", syncVendor: "Provi", productName: "DeKuyper Sour Apple Schnapps Pucker 30 1L", bottleOz: 33.81, searchAliases: ["Apple Pucker", "Pucker Sour Apple", "DeKuyper Pucker Sour Apple Schnapps"] },
  "apple-schnapps": { vendor: "Proof", syncVendor: "Provi", productName: "Llord's Apple Schnapps 1L", bottleOz: 33.81 },
  bitters: { vendor: "Proof", syncVendor: "Provi", productName: "Angostura Bitters Aromatic 16oz", bottleOz: 16 },
  "blueberry-schnapps": { vendor: "Proof", syncVendor: "Provi", productName: "DeKuyper Blueberry Schnapps 30 1L", bottleOz: 33.81, searchAliases: ["Blueberry Schnapps", "DeKuyper Blueberry Schnapps"] },
  "creme-de-cacao": { vendor: "Proof", syncVendor: "Provi", productName: "Llords Creme De Cacao 30 1L", bottleOz: 33.81, searchAliases: ["Llord's Creme De Cacao White", "Creme De Cacao White"] },
  "lemon-juice": { vendor: "Proof", syncVendor: "Provi", productName: "Finest Call Single Pressed Lemon Juice 1L", bottleOz: 33.81 },
  "lime-juice": { vendor: "Proof", syncVendor: "Provi", productName: "Finest Call Lime Juice 1L", bottleOz: 33.81 },
  mint: { vendor: "Proof", syncVendor: "Provi", productName: "Master of Mixes Cocktail Mixer - Other Mint Syrup Cocktail Essentials 375mL", bottleOz: 12.68, searchAliases: ["Master of Mixes Mint Syrup", "Mint Syrup"] },
  "peach-schnapps": { vendor: "Proof", syncVendor: "Provi", productName: "DeKuyper Peach Schnapps Peachtree 30 1L", bottleOz: 33.81, searchAliases: ["Peachtree", "DeKuyper Peachtree Schnapps"] },
  "pomegranate-schnapps": { vendor: "Proof", syncVendor: "Provi", productName: "DeKuyper Pomegranate Schnapps Pomegranate Pleasure 30 1L", bottleOz: 33.81, searchAliases: ["Pomegranate Schnapps", "DeKuyper Pomegranate Schnapps"] },
  "raspberry-schnapps": { vendor: "Proof", syncVendor: "Provi", productName: "DeKuyper Raspberry Schnapps 33 1L", bottleOz: 33.81, searchAliases: ["DeKuyper Razzmatazz Schnapps", "Razzmatazz"] },
  "strawberry-schnapps": { vendor: "Proof", syncVendor: "Provi", productName: "DeKuyper Sour Strawberry Schnapps Pucker 30 1L", bottleOz: 33.81, searchAliases: ["Strawberry Pucker", "DeKuyper Pucker Strawberry Schnapps"] },
  "triple-sec": { vendor: "Proof", syncVendor: "Provi", productName: "DeKuyper Triple Sec 30 1L", bottleOz: 33.81 },
  "watermelon-schnapps": { vendor: "Proof", syncVendor: "Provi", productName: "DeKuyper Sour Watermelon Schnapps Pucker 30 1L", bottleOz: 33.81, searchAliases: ["Watermelon Pucker", "DeKuyper Pucker Watermelon Schnapps"] },
};
const OHLQ_MAPPINGS = {
  "absolut-citron": { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Absolut Citron Vodka 1.75L", bottleOz: 59.17 },
  "bombay-sapphire": { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Bombay Sapphire Gin 1.75L", bottleOz: 59.17 },
  "bulleit-bourbon": { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Bulleit Bourbon 1.75L", bottleOz: 59.17 },
  "captain-morgan": { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Captain Morgan Original Spiced Rum 1.75L", bottleOz: 59.17 },
  "crown-apple": { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Crown Royal Regal Apple 1.75L", bottleOz: 59.17 },
  "crown-royal": { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Crown Royal Canadian Whisky 1.75L", bottleOz: 59.17 },
  "jack-daniel-s": { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Jack Daniel's Old No. 7 1.75L", bottleOz: 59.17 },
  "jack-daniel-s-fire": { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Jack Daniel's Tennessee Fire 1.75L", bottleOz: 59.17 },
  "jim-beam": { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Jim Beam Bourbon 1.75L", bottleOz: 59.17 },
  "jose-cuervo-silver": { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Jose Cuervo Especial Silver 1.75L", bottleOz: 59.17 },
  kahlua: { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Kahlua Coffee Liqueur 1L", bottleOz: 33.81 },
  "ketel-one-cucumber-vodka": { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Ketel One Botanical Cucumber & Mint 1L", bottleOz: 33.81 },
  "svedka-blue-raspberry-vodka": { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Svedka Blue Raspberry Vodka 750mL", bottleOz: 25.36 },
  "tito-s": { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Tito's Handmade Vodka 1.75L", bottleOz: 59.17 },
};
const INGREDIENT_ABV_PERCENT = {
  "absolut-citron": 40,
  "apple-pucker": 15,
  "apple-schnapps": 15,
  bitters: 44.7,
  "blueberry-schnapps": 15,
  "bombay-sapphire": 47,
  "bulleit-bourbon": 45,
  "captain-morgan": 35,
  "creme-de-cacao": 15,
  "crown-apple": 35,
  "crown-royal": 40,
  "jack-daniel-s": 40,
  "jack-daniel-s-fire": 35,
  "jim-beam": 40,
  "jose-cuervo-silver": 40,
  kahlua: 20,
  "ketel-one-cucumber-vodka": 30,
  "peach-schnapps": 15,
  "pomegranate-schnapps": 15,
  "raspberry-schnapps": 16.5,
  "strawberry-schnapps": 15,
  "svedka-blue-raspberry-vodka": 35,
  "tito-s": 40,
  "triple-sec": 15,
  "watermelon-schnapps": 15,
};
const MENU_ORDER = [
  ["GIN & JUICE (BOMBAY)", "Ginny from the Block (Gin)"],
  ["CAPTAIN QUENCHER (CAPTAIN MORGAN)", "Captain Quencher (Rum)"],
  ["BLUEBERRY MARGARITA (JOSE CUERVO)", "Strawberry/Watermelon/Peach/Blueberry Marg (Tequilla)"],
  ["HOUSE MARGARITA (JOSE CUERVO)", "House Margarita (Tequilla)"],
  ["PEACH MARGARITA (JOSE CUERVO)", "Strawberry/Watermelon/Peach/Blueberry Marg (Tequilla)"],
  ["RASPBERRY MARGARITA (JOSE CUERVO)", "Strawberry/Watermelon/Peach/Blueberry Marg (Tequilla)"],
  ["STRAWBERRY MARGARITA (JOSE CUERVO)", "Strawberry/Watermelon/Peach/Blueberry Marg (Tequilla)"],
  ["WATERMELON MARGARITA (JOSE CUERVO)", "Strawberry/Watermelon/Peach/Blueberry Marg (Tequilla)"],
  ["STRAWBERRY SENORITA (JOSE CUERVO)", "Strawberry Senorita (Tequilla)"],
  ["APPLETINI (TITO'S)", "Apple-tini(Vodka)"],
  ["BLUE DOT (SVEDKA)", "Blue Dot (Vodka)"],
  ["BOOZY CUCUMBER LEMONADE (KETEL ONE)", "Boozy Cucumber Lemonade (Vodka)"],
  ["ESPRESSO MARTINI (TITO'S)", "Espresso Martini"],
  ["LEMON DROP MARTINI (ABSOLUT CITRON)", "Lemon Drop Martini(Vodka)"],
  ["POMEGRANATE MARTINI (TITO'S)", "Pomegranate Martini(Tito's)"],
  ["SPIKED ARNOLD PALMER (TITO'S)", "Spiked Arnold Palmer (Vodka)"],
  ["SPIKED CRANBERRY LEMONADE (TITO'S)", "Spiked Cranberry Lemonade (Vodka)"],
  ["SPIKED PINK LEMONADE (TITO'S)", "Spiked Strawberry Lemonade (Vodka)"],
  ["SPIKED STRAWBERRY LEMONADE (TITO'S)", "Spiked Strawberry Lemonade (Vodka)"],
  ["VODKA CRAN (TITO'S)", "Vodka Cran(Vodka)"],
  ["CROWN APPLE 'RITA", "Crown Apple 'rita(Whiskey)"],
  ["JACKED UP STRAWBERRY LEMONADE (JACK DANIELS)", "Jacked Up Strawberry Lemonade (Whiskey)"],
  ["OLD FASHIONED (BULLEIT)", "Old fashioned (Whiskey)"],
  ["JACK & LEMONADE", "Jack and Lemonade (Whiskey)"],
  ["WASHINGTON APPLE (CROWN ROYAL APPLE)", "Washington Apple (Whiskey)"],
  ["WHISKEY SOUR (JACK DANIELS)", "Whiskey Sour (Whiskey)"],
];
const NEW_RECIPE_ORDER = [
  ["WHISKEY SMASH", "Whiskey Smash"],
  ["APPLE JACK (WHISKEY)", "Apple Jack (Whiskey)"],
  ["ON PAR TEE", "On Par Tee"],
];
const recipeGrid = document.querySelector("#recipe-grid");
const oldRecipeGrid = document.querySelector("#old-recipe-grid");
const statsGrid = document.querySelector("#stats-grid");
const categoryFilter = document.querySelector("#category-filter");
const recipeSearch = document.querySelector("#recipe-search");
const oldSearch = document.querySelector("#old-search");
const pricingSearch = document.querySelector("#pricing-search");
const pricingTable = document.querySelector("#pricing-table");
const pricingSummary = document.querySelector("#pricing-summary");
const ingredientSearch = document.querySelector("#ingredient-search");
const ingredientTable = document.querySelector("#ingredient-table");
const ingredientSummary = document.querySelector("#ingredient-summary");
const inventorySearch = document.querySelector("#inventory-search");
const inventoryTable = document.querySelector("#inventory-table");
const inventoryOrderTable = document.querySelector("#inventory-order-table");
const inventorySummary = document.querySelector("#inventory-summary");
const inventoryHistoryList = document.querySelector("#inventory-history-list");
const clearPricesButton = document.querySelector("#clear-prices");
const clearChargesButton = document.querySelector("#clear-charges");
const recipeForm = document.querySelector("#recipe-form");
const recipeFormTitle = document.querySelector("#recipe-form-title");
const recipeSubmitButton = document.querySelector("#recipe-submit-button");
const cancelEditButton = document.querySelector("#cancel-edit");
const addIngredientRowButton = document.querySelector("#add-ingredient-row");
const newIngredientRows = document.querySelector("#new-ingredient-rows");
const cardTemplate = document.querySelector("#recipe-card-template");

let recipes = [];
let ingredients = [];
let inventoryItems = [];
let priceOverrides = loadOverrides();
let chargeOverrides = loadChargeOverrides();
let customRecipes = loadCustomRecipes();
let inactiveRecipeIds = loadInactiveRecipeIds();
let editedRecipes = loadEditedRecipes();
let inventoryOnHandOverrides = loadInventoryOnHandOverrides();
let inventoryParOverrides = loadInventoryParOverrides();
let inventoryHistory = loadInventoryHistory();
let inventoryParEditState = {};
let editingRecipeId = null;
let vendorSyncScope = "all";
let vendorSyncMessage = "Press sync to check mapped vendors automatically. Vendors without a supported connection will report what is still needed.";
let vendorSyncRunning = false;

init();

async function init() {
  const [csv, newCocktailsCsv, inventoryCsv] = await Promise.all([
    fetchCsv(CSV_PATH),
    fetchCsv(NEW_COCKTAILS_CSV_PATH),
    fetchCsv(INVENTORY_CSV_PATH),
  ]);

  recipes = [
    ...applyMenuOrder(parseRecipes(parseCsv(csv))),
    ...applyRecipeOrder(parseRecipes(parseCsv(newCocktailsCsv)), NEW_RECIPE_ORDER),
    ...customRecipes,
  ].map(applyRecipeEdits);
  ingredients = buildIngredientCatalog(getActiveRecipes());
  inventoryItems = parseInventory(parseCsv(inventoryCsv));
  hydrateCategoryFilter(recipes);
  bindEvents();
  addIngredientRow();
  addIngredientRow();
  addIngredientRow();
  render();
}

function bindEvents() {
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => switchTab(button.dataset.tab));
  });

  recipeSearch.addEventListener("input", renderRecipes);
  categoryFilter.addEventListener("change", renderRecipes);
  oldSearch.addEventListener("input", renderOldRecipes);
  pricingSearch.addEventListener("input", renderPricing);
  ingredientSearch.addEventListener("input", renderIngredients);
  inventorySearch.addEventListener("input", renderInventory);
  recipeForm.addEventListener("submit", addCustomRecipe);
  addIngredientRowButton.addEventListener("click", addIngredientRow);
  cancelEditButton.addEventListener("click", resetRecipeForm);
  clearPricesButton.addEventListener("click", () => {
    priceOverrides = {};
    saveOverrides();
    render();
  });
  clearChargesButton.addEventListener("click", () => {
    chargeOverrides = {};
    saveChargeOverrides();
    render();
  });
}

function switchTab(tabName) {
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === tabName);
  });

  document.querySelectorAll(".panel").forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === `${tabName}-panel`);
  });
}

function render() {
  ingredients = buildIngredientCatalog(getActiveRecipes());
  syncInventoryItemCatalogLinks();
  renderStats();
  renderRecipes();
  renderPricing();
  renderIngredients();
  renderInventory();
  renderOldRecipes();
}

function renderStats() {
  const activeRecipes = getActiveRecipes();
  const totals = activeRecipes.map(getRecipeTotals);
  const recipeCount = activeRecipes.length;
  const totalCost = sum(totals.map((total) => total.cost));
  const totalOz = sum(totals.map((total) => total.oz));
  const avgCostPerOz = totalOz ? totalCost / totalOz : 0;
  const totalRevenue = sum(activeRecipes.map((recipe) => getRecipePricing(recipe).revenue));
  const avgMargin = totalRevenue ? ((totalRevenue - totalCost) / totalRevenue) * 100 : 0;
  const overrideCount = Object.keys(priceOverrides).filter((key) => {
    const override = priceOverrides[key];
    return toNumber(override?.bottleOz) && toNumber(override?.bottlePrice);
  }).length;

  statsGrid.innerHTML = "";
  [
    ["Recipes", recipeCount.toLocaleString()],
    ["Total batch cost", money(totalCost)],
    ["Avg cost per oz", money(avgCostPerOz)],
    ["Avg profit margin", `${formatNumber(avgMargin)}%`],
    ["Live ingredient prices", overrideCount.toLocaleString()],
  ].forEach(([label, value]) => {
    const card = document.createElement("div");
    card.className = "stat-card";
    card.innerHTML = `<strong>${value}</strong><span>${label}</span>`;
    statsGrid.append(card);
  });
}

function renderRecipes() {
  const searchTerm = recipeSearch.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const visibleRecipes = getActiveRecipes().filter((recipe) => {
    const matchesCategory = category === "all" || recipe.category === category;
    const haystack = `${recipe.title} ${recipe.batch} ${recipe.ingredients.map((item) => item.name).join(" ")}`.toLowerCase();
    return matchesCategory && haystack.includes(searchTerm);
  });

  recipeGrid.innerHTML = "";

  visibleRecipes.forEach((recipe) => {
    const card = createRecipeCard(recipe, "active");
    recipeGrid.append(card);
  });
}

function renderOldRecipes() {
  const searchTerm = oldSearch.value.trim().toLowerCase();
  const oldRecipes = getInactiveRecipes().filter((recipe) => {
    const haystack = `${recipe.title} ${recipe.batch} ${recipe.ingredients.map((item) => item.name).join(" ")}`.toLowerCase();
    return haystack.includes(searchTerm);
  });

  oldRecipeGrid.innerHTML = "";
  if (!oldRecipes.length) {
    oldRecipeGrid.innerHTML = `<div class="empty-state">No old recipes yet.</div>`;
    return;
  }

  oldRecipes.forEach((recipe) => {
    oldRecipeGrid.append(createRecipeCard(recipe, "inactive"));
  });
}

function createRecipeCard(recipe, state) {
  const totals = getRecipeTotals(recipe);
  const pricing = getRecipePricing(recipe);
  const card = cardTemplate.content.firstElementChild.cloneNode(true);
  card.querySelector("h2").textContent = recipe.title;
  card.querySelector(".recipe-card__batch").textContent = formatBatchLabel(recipe.batch);
  card.querySelector(".spirit-pill").textContent = recipe.category;
  const actions = card.querySelector(".recipe-card__actions");
  actions.innerHTML = `
    <button class="mini-button" data-action="edit" type="button">Edit</button>
    <button class="mini-button" data-action="toggle" type="button">${state === "active" ? "Deactivate" : "Reactivate"}</button>
    ${state === "inactive" && recipe.isCustom ? '<button class="mini-button mini-button--danger" data-action="delete" type="button">Delete custom</button>' : ""}
  `;
  actions.querySelector('[data-action="edit"]').addEventListener("click", () => startEditingRecipe(recipe.id));
  actions.querySelector('[data-action="toggle"]').addEventListener("click", () => {
    if (state === "active") {
      deactivateRecipe(recipe.id);
    } else {
      reactivateRecipe(recipe.id);
    }
  });
  const deleteButton = actions.querySelector('[data-action="delete"]');
  if (deleteButton) {
    deleteButton.addEventListener("click", () => deleteCustomRecipe(recipe.id));
  }
  const summaryNumbers = card.querySelector(".recipe-card__numbers");
  summaryNumbers.innerHTML = [
    ["Total cost", money(totals.cost)],
    ["Total oz", formatNumber(totals.oz)],
    ["ABV", `${formatNumber(totals.abvPercent)}%`],
    ["Profit margin", `${formatNumber(pricing.margin)}%`],
  ]
    .map(([label, value]) => `<div class="recipe-number"><strong>${value}</strong><span>${label}</span></div>`)
    .join("");

  const tbody = card.querySelector("tbody");
  recipe.ingredients.forEach((ingredient) => {
    const liveCost = getIngredientCost(ingredient);
    const addAmount = getIngredientAddAmount(ingredient.raw);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${escapeHtml(ingredient.name)}</strong>${addAmount ? `<span class="table-note">${escapeHtml(addAmount)}</span>` : ""}</td>
      <td class="${liveCost.source === "override" ? "updated-cost" : ""}">${money(liveCost.cost)}</td>
      <td>${formatRecipeIngredientAmount(ingredient)}</td>
    `;
    tbody.append(row);
  });

  const detailMetrics = getCalculatedMetrics(recipe, totals, pricing);
  const details = document.createElement("details");
  details.className = "recipe-card__details";
  details.innerHTML = `
    <summary class="recipe-card__details-summary">Show more</summary>
    <div class="recipe-card__details-body"></div>
  `;

  const detailsBody = details.querySelector(".recipe-card__details-body");
  detailsBody.append(summaryNumbers);

  const metricsTableWrap = document.createElement("div");
  metricsTableWrap.className = "recipe-table-wrap recipe-table-wrap--details";
  metricsTableWrap.innerHTML = `
    <table class="recipe-table recipe-table--details">
      <tbody>
        ${detailMetrics
          .map(
            (metric) => `
              <tr class="muted">
                <td>${escapeHtml(metric.label)}</td>
                <td>${metric.value}</td>
              </tr>`,
          )
          .join("")}
      </tbody>
    </table>
  `;
  detailsBody.append(metricsTableWrap);
  card.append(details);

  return card;
}

function renderPricing() {
  const searchTerm = pricingSearch.value.trim().toLowerCase();
  const visibleRecipes = getActiveRecipes().filter((recipe) => recipe.title.toLowerCase().includes(searchTerm));

  renderPricingSummary();
  pricingTable.innerHTML = "";
  visibleRecipes.forEach((recipe) => {
    const pricing = getRecipePricing(recipe);
    const override = chargeOverrides[recipe.id];
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${escapeHtml(recipe.title)}</strong></td>
      <td data-pricing-cell="cost">${money(pricing.costPerOz)}</td>
      <td><input type="text" inputmode="decimal" pattern="[0-9]*[.]?[0-9]*" value="${escapeHtml(override ?? "")}" placeholder="${formatNumber(recipe.defaultChargePerOz)}" aria-label="Charge per ounce for ${escapeHtml(recipe.title)}"></td>
      <td data-pricing-cell="profit">${money(pricing.profitPerOz)}</td>
      <td data-pricing-cell="margin">${formatNumber(pricing.margin)}%</td>
      <td data-pricing-cell="pour-oz">${pricing.pourOz ? formatNumber(pricing.pourOz) : "-"}</td>
      <td data-pricing-cell="pour">${pricing.pourOz ? money(pricing.chargePerPour) : "-"}</td>
    `;

    const chargeInput = row.querySelector("input");
    chargeInput.addEventListener("input", () => {
      setChargeOverride(recipe.id, chargeInput.value);
      updatePricingRow(row, recipe);
    });
    pricingTable.append(row);
  });
}

function updatePricingRow(row, recipe) {
  const pricing = getRecipePricing(recipe);
  row.querySelector('[data-pricing-cell="cost"]').textContent = money(pricing.costPerOz);
  row.querySelector('[data-pricing-cell="profit"]').textContent = money(pricing.profitPerOz);
  row.querySelector('[data-pricing-cell="margin"]').textContent = `${formatNumber(pricing.margin)}%`;
  row.querySelector('[data-pricing-cell="pour-oz"]').textContent = pricing.pourOz ? formatNumber(pricing.pourOz) : "-";
  row.querySelector('[data-pricing-cell="pour"]').textContent = pricing.pourOz ? money(pricing.chargePerPour) : "-";
}

function renderPricingSummary() {
  const activeRecipes = getActiveRecipes();
  const pricing = activeRecipes.map(getRecipePricing);
  const revenue = sum(pricing.map((item) => item.revenue));
  const cost = sum(pricing.map((item) => item.cost));
  const profit = revenue - cost;
  const margin = revenue ? (profit / revenue) * 100 : 0;

  pricingSummary.innerHTML = `
    <h2>Charge pricing</h2>
    <div class="summary-line"><span>Recipes priced</span><strong>${activeRecipes.length}</strong></div>
    <div class="summary-line"><span>Charge overrides</span><strong>${countChargeOverrides()}</strong></div>
    <div class="summary-line"><span>Projected batch revenue</span><strong>${money(revenue)}</strong></div>
    <div class="summary-line"><span>Projected batch profit</span><strong>${money(profit)}</strong></div>
    <div class="summary-line"><span>Projected margin</span><strong>${formatNumber(margin)}%</strong></div>
  `;
}

function renderIngredients() {
  const searchTerm = ingredientSearch.value.trim().toLowerCase();
  const visibleIngredients = ingredients.filter((ingredient) => {
    if (ingredient.id === "water") return false;
    const haystack = `${ingredient.name} ${ingredient.recipes.join(" ")}`.toLowerCase();
    return haystack.includes(searchTerm);
  });
  const groupedIngredients = groupIngredientsForDisplay(visibleIngredients);

  renderIngredientSummary();
  ingredientTable.innerHTML = "";

  groupedIngredients.forEach(([groupName, items]) => {
    const groupRow = document.createElement("tr");
    groupRow.className = "ingredient-group-row";
    groupRow.innerHTML = `<td colspan="6">${escapeHtml(groupName)}</td>`;
    ingredientTable.append(groupRow);

    items.forEach((ingredient) => {
      const override = priceOverrides[ingredient.id] || {};
      const currentUnitCost = getCatalogUnitCost(ingredient);
      const mappedBottleOz = ingredient.vendorProduct?.bottleOz ? formatNumber(ingredient.vendorProduct.bottleOz) : "";
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          <strong>${escapeHtml(ingredient.name)}</strong>
          ${ingredient.vendorProduct ? `<span class="table-note table-note--accent">${escapeHtml(ingredient.vendorProduct.vendor)} mapped</span><span class="table-note">${escapeHtml(ingredient.vendorProduct.productName)}</span>` : ""}
        </td>
        <td>${money(currentUnitCost)}</td>
        <td><input type="text" inputmode="decimal" pattern="[0-9]*[.]?[0-9]*" value="${escapeHtml(override.bottleOz ?? "")}" placeholder="${escapeHtml(mappedBottleOz)}" aria-label="Bottle ounces for ${escapeHtml(ingredient.name)}"></td>
        <td><input type="text" inputmode="decimal" pattern="[0-9]*[.]?[0-9]*" value="${escapeHtml(override.bottlePrice ?? "")}" aria-label="Bottle price for ${escapeHtml(ingredient.name)}"></td>
        <td class="muted">${formatUpdatedAt(override.updatedAt)}</td>
        <td><button class="mini-button" type="button">Update</button></td>
      `;

      const [bottleOzInput, bottlePriceInput] = row.querySelectorAll("input");
      const updateButton = row.querySelector("button");
      updateButton.addEventListener("click", () => saveIngredientOverride(ingredient.id, bottleOzInput.value, bottlePriceInput.value));
      ingredientTable.append(row);
    });
  });
}

function renderIngredientSummary() {
  const visibleIngredients = ingredients.filter((ingredient) => ingredient.id !== "water");
  const proofCount = countVendorMappingsByName(visibleIngredients, "Proof");
  const ohlqCount = countVendorMappingsByName(visibleIngredients, "OHLQ");

  ingredientSummary.innerHTML = `
    <h2>Ingredient pricing</h2>
    <div class="summary-line"><span>Unique ingredients</span><strong>${visibleIngredients.length}</strong></div>
    <div class="summary-line"><span>With bottle overrides</span><strong>${countOverrides()}</strong></div>
    <div class="summary-line"><span>Mapped to vendors</span><strong>${countVendorMappings(visibleIngredients)}</strong></div>
    <div class="summary-line"><span>Proof mapped</span><strong>${proofCount}</strong></div>
    <div class="summary-line"><span>OHLQ mapped</span><strong>${ohlqCount}</strong></div>
    <div class="summary-line"><span>Total ounces tracked</span><strong>${formatNumber(sum(visibleIngredients.map((item) => item.totalOz)))}</strong></div>
    <div class="summary-line"><span>Estimated catalog cost</span><strong>${money(sum(visibleIngredients.map((item) => getCatalogCost(item))))}</strong></div>
    <div class="sync-panel">
      <h3>Vendor Sync</h3>
      <p class="sync-copy">This button uses the server-side sync route. It will update mapped ingredients automatically when a vendor connection is available, and report what is blocked when it is not.</p>
      <label class="sync-field">
        <span>Vendor scope</span>
        <select id="vendor-sync-scope">
          <option value="all"${vendorSyncScope === "all" ? " selected" : ""}>All mapped vendors</option>
          <option value="Provi"${vendorSyncScope === "Provi" ? " selected" : ""}>Provi</option>
          <option value="OHLQ"${vendorSyncScope === "OHLQ" ? " selected" : ""}>OHLQ</option>
        </select>
      </label>
      <div class="sync-actions">
        <button class="primary-button" id="run-vendor-sync" type="button"${vendorSyncRunning ? " disabled" : ""}>${vendorSyncRunning ? "Syncing..." : "Sync Prices"}</button>
      </div>
      <p class="sync-status">${escapeHtml(vendorSyncMessage)}</p>
    </div>
  `;

  bindIngredientSummaryEvents();
}

function renderInventory() {
  const visibleItems = getVisibleInventoryItems();
  const groupedItems = groupInventoryForDisplay(visibleItems);
  const reorderItems = getInventoryReorderItems(visibleItems);

  renderInventorySummary(visibleItems, reorderItems);
  renderInventoryStockTable(groupedItems);
  renderInventoryOrderTable(reorderItems);
  renderInventoryHistory();
}

function renderInventorySummary(visibleItems, reorderItems) {
  const totalValue = sum(visibleItems.filter((item) => !item.excludeFromInventoryValue).map((item) => item.totalValue));
  const reorderCost = sum(reorderItems.filter((item) => !item.excludeFromInventoryValue).map((item) => getInventoryRoundedOrderQuantity(item) * item.unitCost));
  const reorderUnits = sum(reorderItems.map((item) => getInventoryRoundedOrderQuantity(item)));
  const latestSnapshot = inventoryHistory[0];

  inventorySummary.innerHTML = `
    <h2>Inventory Snapshot</h2>
    <div class="summary-line"><span>Tracked items</span><strong>${visibleItems.length}</strong></div>
    <div class="summary-line"><span>Current bottle inventory $</span><strong>${money(totalValue)}</strong></div>
    <div class="summary-line"><span>Items to reorder</span><strong>${reorderItems.length}</strong></div>
    <div class="summary-line"><span>Total units to order</span><strong>${formatNumber(reorderUnits)}</strong></div>
    <div class="summary-line"><span>Estimated reorder cost</span><strong>${money(reorderCost)}</strong></div>
    <div class="sync-panel inventory-actions-panel">
      <button class="primary-button" id="save-inventory-snapshot" type="button">Save Weekly Snapshot</button>
      <p class="sync-copy">This saves the current inventory in this browser so you can look back week by week.</p>
      <p class="sync-status">${latestSnapshot ? `Last saved ${escapeHtml(formatUpdatedAt(latestSnapshot.savedAt))}` : "No weekly snapshots saved yet."}</p>
    </div>
  `;

  bindInventorySummaryEvents();
}

function bindInventorySummaryEvents() {
  document.querySelector("#save-inventory-snapshot")?.addEventListener("click", saveInventorySnapshot);
}

function renderInventoryStockTable(groupedItems) {
  inventoryTable.innerHTML = "";
  const allVisibleItems = groupedItems.flatMap(([, items]) => items);
  const totalValue = sum(allVisibleItems.filter((item) => !item.excludeFromInventoryValue).map((item) => item.totalValue));

  groupedItems.forEach(([groupName, items]) => {
    inventoryTable.append(createInventoryGroupRow(groupName));
    items.forEach((item) => inventoryTable.append(createInventoryRow(item, "stock")));
  });

  inventoryTable.append(createInventoryTotalRow("Current bottle inventory total", money(totalValue)));
}

function renderInventoryOrderTable(reorderItems) {
  inventoryOrderTable.innerHTML = "";

  if (!reorderItems.length) {
    inventoryOrderTable.innerHTML = `<tr><td colspan="6" class="muted">Nothing needs to be ordered right now.</td></tr>`;
    return;
  }

  groupInventoryForDisplay(reorderItems).forEach(([groupName, items]) => {
    inventoryOrderTable.append(createInventoryGroupRow(groupName));
    items.forEach((item) => inventoryOrderTable.append(createInventoryRow(item, "order")));
  });

  const reorderCost = sum(reorderItems.filter((item) => !item.excludeFromInventoryValue).map((item) => getInventoryRoundedOrderQuantity(item) * item.unitCost));
  inventoryOrderTable.append(createInventoryTotalRow("Estimated reorder total", money(reorderCost)));
}

function createInventoryGroupRow(groupName) {
  const row = document.createElement("tr");
  row.className = "inventory-group-row";
  row.innerHTML = `<td colspan="6">${escapeHtml(groupName)}</td>`;
  return row;
}

function createInventoryTotalRow(label, value) {
  const row = document.createElement("tr");
  row.className = "inventory-total-row";
  row.innerHTML = `
    <td colspan="5"><strong>${escapeHtml(label)}</strong></td>
    <td><strong>${escapeHtml(value)}</strong></td>
  `;
  return row;
}

function createInventoryRow(item, mode) {
  const row = document.createElement("tr");
  const orderQuantityForMode = mode === "order" ? getInventoryRoundedOrderQuantity(item) : item.orderQuantity;
  const costCell = mode === "order" ? money(orderQuantityForMode * item.unitCost) : money(item.totalValue);
  row.className = mode === "order" && item.orderQuantity > 0 ? "inventory-row--order" : "";
  const inputMode = item.allowsDecimal ? "decimal" : "numeric";
  const isParEditable = Boolean(inventoryParEditState[item.id]);
  const linkedNotes = [];
  if (item.linkedIngredientName) linkedNotes.push(`<span class="table-note table-note--accent">Linked to ${escapeHtml(item.linkedIngredientName)}</span>`);
  if (item.vendorProduct) linkedNotes.push(`<span class="table-note table-note--accent">${escapeHtml(item.vendorProduct.vendor)} mapped</span><span class="table-note">${escapeHtml(item.vendorProduct.productName)}</span>`);
  row.innerHTML = `
    <td><strong>${escapeHtml(item.name)}</strong>${item.note ? `<span class="table-note">${escapeHtml(item.note)}</span>` : ""}${linkedNotes.join("")}</td>
    <td>${mode === "stock" ? `<input class="inventory-input" data-field="onHand" type="text" inputmode="${inputMode}" value="${escapeHtml(item.onHandDisplay)}" aria-label="On hand for ${escapeHtml(item.name)}">` : formatInventoryQuantity(item.onHandDisplay)}</td>
    <td>${mode === "stock" ? `<div class="inventory-par-cell"><input class="inventory-input inventory-input--par ${isParEditable ? "is-editing" : "is-locked"}" data-field="par" type="text" inputmode="${inputMode}" value="${escapeHtml(item.parDisplay)}" aria-label="Par for ${escapeHtml(item.name)}" ${isParEditable ? "" : "readonly"}><button class="mini-button inventory-par-toggle" data-par-toggle="${escapeHtml(item.id)}" type="button">${isParEditable ? "Done" : "Edit"}</button></div>` : formatInventoryQuantity(item.parDisplay)}</td>
    <td data-cell="order" class="${item.orderQuantity > 0 ? "inventory-order-flag" : "muted"}">${formatInventoryQuantity(mode === "order" ? orderQuantityForMode : item.orderDisplay)}</td>
    <td>${money(item.unitCost)}</td>
    <td data-cell="cost">${costCell}</td>
  `;
  if (mode === "stock") {
    row.querySelectorAll("input").forEach((input) => {
      const field = input.dataset.field;
      input.addEventListener("focus", () => input.select());
      input.addEventListener("input", () => previewInventoryValue(item.id, field, input.value, row));
      input.addEventListener("change", () => commitInventoryValue(item.id, field, input.value));
      input.addEventListener("blur", () => {
        commitInventoryValue(item.id, field, input.value);
        input.value = getInventoryDisplayValue(findInventoryItem(item.id), field);
        syncInventoryRowCells(row, findInventoryItem(item.id));
        renderInventoryPanels();
      });
    });
    row.querySelector('[data-par-toggle]')?.addEventListener("click", () => toggleInventoryParEdit(item.id));
  }
  return row;
}

function getInventoryRoundedOrderQuantity(item) {
  if (!item?.orderQuantity || item.orderQuantity <= 0) return 0;
  if (item.group !== "Mixer Cabinet") return item.orderQuantity;
  return Math.ceil(item.orderQuantity / 12) * 12;
}

function previewInventoryValue(id, field, value, row) {
  const item = findInventoryItem(id);
  if (!item) return;

  setInventoryItemDisplayValue(item, field, value);
  syncInventoryRowCells(row, item);
  persistInventoryField(id, field, value);
  renderInventoryPanels();
}

function commitInventoryValue(id, field, value) {
  const item = findInventoryItem(id);
  if (!item) return;

  const normalized = normalizeInventoryInputValue(value, item.allowsDecimal);
  setInventoryItemDisplayValue(item, field, normalized);
  persistInventoryField(id, field, normalized);
}

function syncInventoryRowCells(row, item) {
  const orderCell = row.querySelector('[data-cell="order"]');
  const costCell = row.querySelector('[data-cell="cost"]');
  if (orderCell) {
    orderCell.textContent = formatInventoryQuantity(item.orderDisplay);
    orderCell.className = item.orderQuantity > 0 ? "inventory-order-flag" : "muted";
  }
  if (costCell) {
    costCell.textContent = money(item.totalValue);
  }
}

function renderInventoryPanels() {
  const visibleItems = getVisibleInventoryItems();
  const reorderItems = getInventoryReorderItems(visibleItems);
  renderInventorySummary(visibleItems, reorderItems);
  renderInventoryOrderTable(reorderItems);
}

function getInventoryReorderItems(sourceItems) {
  return sourceItems.filter((item) => item.orderQuantity > 0 && !item.excludeFromOrderList);
}

function syncInventoryItemCatalogLinks() {
  const ingredientById = new Map(ingredients.map((ingredient) => [ingredient.id, ingredient]));

  inventoryItems.forEach((item) => {
    const ingredient = ingredientById.get(item.id) || null;
    item.linkedIngredientName = ingredient?.name || item.name;
    item.vendorProduct = ingredient?.vendorProduct || getVendorMapping(item.id) || null;
    item.unitCost = getInventoryBottleCost(item, ingredient);
    recalculateInventoryItem(item);
  });
}

function getInventoryBottleCost(item, ingredient) {
  const override = priceOverrides[item.id];
  const overrideBottlePrice = toNumber(override?.bottlePrice);
  if (overrideBottlePrice > 0) return overrideBottlePrice;

  if (ingredient) {
    const catalogBottleCost = getIngredientBottleCost(ingredient);
    if (catalogBottleCost > 0) return catalogBottleCost;
  }

  return item.baseUnitCost || item.unitCost || 0;
}

function getVisibleInventoryItems() {
  const searchTerm = inventorySearch.value.trim().toLowerCase();
  return inventoryItems.filter((item) => {
    const haystack = `${item.name} ${item.group} ${item.sourceSection}`.toLowerCase();
    return haystack.includes(searchTerm);
  });
}

function findInventoryItem(id) {
  return inventoryItems.find((item) => item.id === id) || null;
}

function setInventoryItemDisplayValue(item, field, value) {
  if (field === "par") {
    item.parDisplay = clean(value);
  } else {
    item.onHandDisplay = clean(value);
  }
  recalculateInventoryItem(item);
}

function getInventoryDisplayValue(item, field) {
  if (!item) return "";
  return field === "par" ? item.parDisplay : item.onHandDisplay;
}

function persistInventoryField(id, field, value) {
  if (field === "par") {
    persistInventoryOverride(inventoryParOverrides, saveInventoryParOverrides, id, value);
    return;
  }
  persistInventoryOverride(inventoryOnHandOverrides, saveInventoryOnHandOverrides, id, value);
}

function persistInventoryOverride(store, saveFn, id, value) {
  const normalized = clean(value);
  if (!normalized) {
    delete store[id];
  } else {
    store[id] = normalized;
  }
  saveFn();
}

function normalizeInventoryInputValue(value, allowsDecimal) {
  const normalized = clean(value);
  if (!normalized) return "";

  const number = toNumber(normalized);
  if (!Number.isFinite(number)) return "";
  if (allowsDecimal) return String(number);
  return String(Math.round(number));
}

function recalculateInventoryItem(item) {
  item.onHand = toNumber(item.onHandDisplay);
  item.par = toNumber(item.parDisplay);
  item.totalValue = item.onHand * item.unitCost;
  item.orderQuantity = item.par > item.onHand ? item.par - item.onHand : 0;
  item.orderDisplay = item.orderQuantity > 0 ? String(item.orderQuantity) : "0";
}

function toggleInventoryParEdit(id) {
  inventoryParEditState[id] = !inventoryParEditState[id];
  renderInventory();
}

function saveInventorySnapshot() {
  const snapshot = {
    id: `inventory-${Date.now()}`,
    savedAt: new Date().toISOString(),
    items: getInventorySnapshotItems(),
  };

  inventoryHistory = [snapshot, ...inventoryHistory];
  saveInventoryHistory();
  renderInventorySummary(getVisibleInventoryItems(), getInventoryReorderItems(getVisibleInventoryItems()));
  renderInventoryHistory();
}

function getInventorySnapshotItems() {
  return groupInventoryForDisplay([...inventoryItems]).flatMap(([, items]) => items).map((item) => ({
    name: item.name,
    group: item.group,
    onHandDisplay: item.onHandDisplay,
    parDisplay: item.parDisplay,
    orderDisplay: item.orderDisplay,
    unitCost: item.unitCost,
    totalValue: item.totalValue,
    note: item.note,
  }));
}

function renderInventoryHistory() {
  if (!inventoryHistoryList) return;

  if (!inventoryHistory.length) {
    inventoryHistoryList.innerHTML = `<div class="empty-state">Save a weekly snapshot here each Monday and your past inventory counts will stay available on this computer.</div>`;
    return;
  }

  inventoryHistoryList.innerHTML = inventoryHistory.map((snapshot, index) => {
    const reorderItems = snapshot.items.filter((item) => toNumber(item.orderDisplay) > 0);
    const totalValue = sum(snapshot.items.map((item) => item.totalValue));
    const reorderCost = sum(reorderItems.map((item) => toNumber(item.orderDisplay) * item.unitCost));

    return `
      <details class="inventory-history-card"${index === 0 ? " open" : ""}>
        <summary>
          <div class="inventory-history-heading">
            <strong>${escapeHtml(formatInventorySnapshotLabel(snapshot.savedAt))}</strong>
            <span>Saved ${escapeHtml(formatUpdatedAt(snapshot.savedAt))}</span>
            <span>${snapshot.items.length} items saved</span>
          </div>
          <div class="inventory-history-stats">
            <span>${money(totalValue)} on hand</span>
            <span>${money(reorderCost)} to reorder</span>
          </div>
        </summary>
        <div class="inventory-history-card__body">
          <div class="inventory-history-actions">
            <button class="ghost-button inventory-history-restore" data-snapshot-id="${escapeHtml(snapshot.id)}" type="button">Recall Snapshot</button>
            <button class="ghost-button inventory-history-delete" data-snapshot-id="${escapeHtml(snapshot.id)}" type="button">Delete snapshot</button>
          </div>
          <div class="inventory-table-wrap">
            <table class="inventory-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>On hand</th>
                  <th>Par</th>
                  <th>Order</th>
                  <th>Unit cost</th>
                  <th>Total value</th>
                </tr>
              </thead>
              <tbody>
                ${renderInventoryHistoryRows(snapshot.items)}
              </tbody>
            </table>
          </div>
        </div>
      </details>
    `;
  }).join("");

  inventoryHistoryList.querySelectorAll(".inventory-history-restore").forEach((button) => {
    button.addEventListener("click", () => restoreInventorySnapshot(button.dataset.snapshotId));
  });
  inventoryHistoryList.querySelectorAll(".inventory-history-delete").forEach((button) => {
    button.addEventListener("click", () => deleteInventorySnapshot(button.dataset.snapshotId));
  });
}

function renderInventoryHistoryRows(items) {
  const grouped = groupInventorySnapshotItems(items);
  return grouped.map(([groupName, groupItems]) => `
    <tr class="inventory-group-row"><td colspan="6">${escapeHtml(groupName)}</td></tr>
    ${groupItems.map((item) => `
      <tr>
        <td><strong>${escapeHtml(item.name)}</strong>${item.note ? `<span class="table-note">${escapeHtml(item.note)}</span>` : ""}</td>
        <td>${formatInventoryQuantity(item.onHandDisplay)}</td>
        <td>${formatInventoryQuantity(item.parDisplay)}</td>
        <td class="${toNumber(item.orderDisplay) > 0 ? "inventory-order-flag" : "muted"}">${formatInventoryQuantity(item.orderDisplay)}</td>
        <td>${money(item.unitCost)}</td>
        <td>${money(item.totalValue)}</td>
      </tr>
    `).join("")}
  `).join("");
}

function groupInventorySnapshotItems(sourceItems) {
  const grouped = new Map();

  sourceItems.forEach((item) => {
    if (!grouped.has(item.group)) {
      grouped.set(item.group, []);
    }
    grouped.get(item.group).push(item);
  });

  return ["Liquor Cabinet", "Mixer Cabinet"]
    .map((groupName) => [
      groupName,
      (grouped.get(groupName) || []).sort((a, b) => getInventorySortKey(a).localeCompare(getInventorySortKey(b))),
    ])
    .filter(([, items]) => items.length);
}

function deleteInventorySnapshot(snapshotId) {
  inventoryHistory = inventoryHistory.filter((snapshot) => snapshot.id !== snapshotId);
  saveInventoryHistory();
  renderInventoryHistory();
  renderInventorySummary(getVisibleInventoryItems(), getInventoryReorderItems(getVisibleInventoryItems()));
}

function restoreInventorySnapshot(snapshotId) {
  const snapshot = inventoryHistory.find((entry) => entry.id === snapshotId);
  if (!snapshot) return;

  inventoryOnHandOverrides = {};
  inventoryParOverrides = {};

  snapshot.items.forEach((item) => {
    const id = slugify(item.name);
    if (clean(item.onHandDisplay)) {
      inventoryOnHandOverrides[id] = clean(item.onHandDisplay);
    }
    if (clean(item.parDisplay)) {
      inventoryParOverrides[id] = clean(item.parDisplay);
    }
  });

  saveInventoryOnHandOverrides();
  saveInventoryParOverrides();
  inventoryItems.forEach((item) => {
    item.onHandDisplay = inventoryOnHandOverrides[item.id] ?? "";
    item.parDisplay = inventoryParOverrides[item.id] ?? "";
    recalculateInventoryItem(item);
  });
  renderInventory();
}

function saveIngredientOverride(id, bottleOz, bottlePrice) {
  const nextOverride = {
    ...(priceOverrides[id] || {}),
    bottleOz,
    bottlePrice,
    updatedAt: new Date().toISOString(),
  };

  if (!nextOverride.bottleOz && !nextOverride.bottlePrice) {
    delete priceOverrides[id];
  } else {
    priceOverrides[id] = nextOverride;
  }
  saveOverrides();
  render();
}

function setChargeOverride(id, value) {
  if (value) {
    chargeOverrides[id] = value;
  } else {
    delete chargeOverrides[id];
  }
  saveChargeOverrides();
  renderStats();
  renderRecipes();
  renderPricingSummary();
}

function addCustomRecipe(event) {
  event.preventDefault();
  const title = clean(document.querySelector("#new-recipe-title").value);
  if (!title) return;

  const ingredientsForRecipe = [...newIngredientRows.querySelectorAll("tr")].map((row) => {
    const nameInput = row.querySelector('[data-field="ingredient-name"]');
    const quantityInput = row.querySelector('[data-field="ingredient-quantity"]');
    const ozInput = row.querySelector('[data-field="ingredient-oz"]');
    const inputName = clean(nameInput.value);
    const name = normalizeIngredientAlias(inputName);
    const packageConfig = getRecipeBuilderPackageConfig(name);
    const packageCount = clean(quantityInput?.value);
    const oz = toNumber(ozInput.value);
    return {
      id: slugify(name),
      raw: buildRecipeIngredientRaw(name, packageCount, packageConfig),
      name,
      cost: estimateIngredientCost(name, oz),
      oz,
      packageCount,
      packageUnit: packageConfig?.unitLabel || "",
      packageSizeOz: packageConfig?.sizeOz || 0,
    };
  }).filter((ingredient) => ingredient.name);

  const recipe = {
    id: editingRecipeId || `custom-${Date.now()}-${slugify(title)}`,
    title,
    batch: DEFAULT_BATCH_LABEL,
    category: clean(document.querySelector("#new-recipe-category").value) || "Other",
    defaultChargePerOz: toNumber(document.querySelector("#new-recipe-charge").value),
    ingredients: ingredientsForRecipe,
    metrics: [],
    isCustom: editingRecipeId ? recipes.find((item) => item.id === editingRecipeId)?.isCustom === true : true,
  };

  if (editingRecipeId) {
    const existingRecipe = recipes.find((item) => item.id === editingRecipeId);
    recipe.sourceTitle = existingRecipe?.sourceTitle;
    recipes = recipes.map((item) => (item.id === editingRecipeId ? recipe : item));

    if (recipe.isCustom) {
      customRecipes = customRecipes.map((item) => (item.id === editingRecipeId ? recipe : item));
      saveCustomRecipes();
    } else {
      editedRecipes[recipe.id] = {
        title: recipe.title,
        batch: recipe.batch,
        category: recipe.category,
        defaultChargePerOz: recipe.defaultChargePerOz,
        ingredients: recipe.ingredients,
      };
      saveEditedRecipes();
    }
  } else {
    customRecipes.push(recipe);
    recipes.push(recipe);
    saveCustomRecipes();
  }

  resetRecipeForm();
  switchTab("recipes");
  render();
}

function addIngredientRow(ingredient = null) {
  const row = document.createElement("tr");
  const isFirstRow = newIngredientRows.children.length === 0;
  if (isFirstRow) row.classList.add("primary-liquor-row");
  const packageConfig = getRecipeBuilderPackageConfig(ingredient?.name || "");
  const quantityValue = getRecipeBuilderQuantityValue(ingredient, packageConfig);
  const ozValue = packageConfig ? calculateRecipeBuilderOunces(quantityValue, packageConfig) || ingredient?.oz || "" : ingredient?.oz || "";
  row.innerHTML = `
    <td>
      ${isFirstRow ? '<span class="row-badge">Liquor row</span>' : ""}
      <input data-field="ingredient-name" type="text" value="${escapeHtml(ingredient?.name || "")}" placeholder="${isFirstRow ? "Liquor / primary alcohol" : "Ingredient name"}" aria-label="${isFirstRow ? "New recipe primary liquor" : "New recipe ingredient"}">
    </td>
    <td>
      <input data-field="ingredient-quantity" type="text" inputmode="decimal" value="${escapeHtml(quantityValue)}" placeholder="${packageConfig?.unitLabel === "gallons" ? "2.5" : "1"}" aria-label="New recipe ingredient bottle or gallon count">
      <span class="table-note" data-field="package-note">${escapeHtml(getRecipeBuilderPackageNote(packageConfig))}</span>
    </td>
    <td>
      <input data-field="ingredient-oz" type="text" inputmode="decimal" value="${escapeHtml(ozValue)}" placeholder="0" aria-label="New recipe ingredient ounces"${packageConfig ? " readonly" : ""}>
      <span class="table-note" data-field="oz-note">${escapeHtml(getRecipeBuilderOzNote(packageConfig))}</span>
    </td>
    <td><button class="icon-button" type="button" aria-label="Remove ingredient row">x</button></td>
  `;
  const nameInput = row.querySelector('[data-field="ingredient-name"]');
  const quantityInput = row.querySelector('[data-field="ingredient-quantity"]');
  const ozInput = row.querySelector('[data-field="ingredient-oz"]');
  nameInput.addEventListener("input", () => syncRecipeBuilderRow(row));
  quantityInput.addEventListener("input", () => syncRecipeBuilderRow(row));
  ozInput.addEventListener("input", () => syncRecipeBuilderRow(row, { preserveManualOz: true }));
  row.querySelector("button").addEventListener("click", () => row.remove());
  syncRecipeBuilderRow(row, { preserveManualOz: true });
  newIngredientRows.append(row);
}

function syncRecipeBuilderRow(row, options = {}) {
  const nameInput = row.querySelector('[data-field="ingredient-name"]');
  const quantityInput = row.querySelector('[data-field="ingredient-quantity"]');
  const ozInput = row.querySelector('[data-field="ingredient-oz"]');
  const packageNote = row.querySelector('[data-field="package-note"]');
  const ozNote = row.querySelector('[data-field="oz-note"]');
  const packageConfig = getRecipeBuilderPackageConfig(nameInput.value);

  if (packageNote) packageNote.textContent = getRecipeBuilderPackageNote(packageConfig);
  if (ozNote) ozNote.textContent = getRecipeBuilderOzNote(packageConfig);

  if (packageConfig) {
    ozInput.readOnly = true;
    const ounces = calculateRecipeBuilderOunces(quantityInput.value, packageConfig);
    ozInput.value = ounces ? formatNumber(ounces) : "";
  } else {
    ozInput.readOnly = false;
    if (!options.preserveManualOz) {
      ozInput.value = "";
    }
  }
}

function getRecipeBuilderPackageConfig(name) {
  const normalizedName = normalizeIngredientAlias(clean(name));
  if (!normalizedName) return null;

  const id = slugify(normalizedName);
  const override = priceOverrides[id];
  const overrideBottleOz = toNumber(override?.bottleOz);
  const mappedBottleOz = toNumber(getVendorMapping(id)?.bottleOz);
  const isGallon = getIngredientGroup(normalizedName) === "Buckeye Beverage";
  const sizeOz = isGallon ? (overrideBottleOz || 128) : (overrideBottleOz || mappedBottleOz);

  if (!sizeOz) return null;

  return {
    sizeOz,
    unitLabel: isGallon ? "gallons" : "bottles",
    unitSingle: isGallon ? "gallon" : "bottle",
  };
}

function getRecipeBuilderQuantityValue(ingredient, packageConfig) {
  if (!ingredient) return "";
  if (clean(ingredient.packageCount)) return clean(ingredient.packageCount);
  if (!packageConfig || !ingredient.oz) return "";

  const count = ingredient.oz / packageConfig.sizeOz;
  if (!Number.isFinite(count) || count <= 0) return "";
  return formatNumber(count);
}

function calculateRecipeBuilderOunces(quantityValue, packageConfig) {
  if (!packageConfig) return 0;
  const quantity = toNumber(quantityValue);
  if (!quantity) return 0;
  return quantity * packageConfig.sizeOz;
}

function getRecipeBuilderPackageNote(packageConfig) {
  if (!packageConfig) return "Enter ounces manually if this ingredient is not mapped yet.";
  return `${formatNumber(packageConfig.sizeOz)} oz per ${packageConfig.unitSingle}`;
}

function getRecipeBuilderOzNote(packageConfig) {
  if (!packageConfig) return "Manual ounces";
  return `Auto from ${packageConfig.unitLabel}`;
}

function buildRecipeIngredientRaw(name, packageCount, packageConfig) {
  const cleanedName = clean(name);
  const cleanedCount = clean(packageCount);
  if (!cleanedName || !cleanedCount || !packageConfig) return cleanedName;

  const count = toNumber(cleanedCount);
  const unit = count === 1 ? packageConfig.unitSingle : packageConfig.unitLabel;
  return `${cleanedName} ${formatNumber(count)} ${unit}`;
}

function getRecipeBuilderUnitCost(name) {
  const normalizedName = normalizeIngredientAlias(clean(name));
  if (!normalizedName) return 0;

  const id = slugify(normalizedName);
  const override = priceOverrides[id];
  const overrideBottleOz = toNumber(override?.bottleOz);
  const overrideBottlePrice = toNumber(override?.bottlePrice);
  if (overrideBottleOz && overrideBottlePrice) {
    return overrideBottlePrice / overrideBottleOz;
  }

  const catalogIngredient = ingredients.find((item) => item.id === id);
  if (catalogIngredient) {
    return getCatalogUnitCost(catalogIngredient);
  }

  return 0;
}

function estimateIngredientCost(name, ounces) {
  const unitCost = getRecipeBuilderUnitCost(name);
  if (!unitCost || !ounces) return 0;
  return unitCost * ounces;
}

function deactivateRecipe(id) {
  if (!inactiveRecipeIds.includes(id)) {
    inactiveRecipeIds.push(id);
  }
  saveInactiveRecipeIds();
  render();
}

function reactivateRecipe(id) {
  inactiveRecipeIds = inactiveRecipeIds.filter((recipeId) => recipeId !== id);
  saveInactiveRecipeIds();
  render();
}

function deleteCustomRecipe(id) {
  customRecipes = customRecipes.filter((recipe) => recipe.id !== id);
  recipes = recipes.filter((recipe) => recipe.id !== id);
  inactiveRecipeIds = inactiveRecipeIds.filter((recipeId) => recipeId !== id);
  delete chargeOverrides[id];
  saveCustomRecipes();
  saveInactiveRecipeIds();
  saveChargeOverrides();
  render();
}

function startEditingRecipe(id) {
  const recipe = recipes.find((item) => item.id === id);
  if (!recipe) return;

  editingRecipeId = id;
  recipeFormTitle.textContent = `Edit ${recipe.title}`;
  recipeSubmitButton.textContent = "Save changes";
  cancelEditButton.hidden = false;
  recipeForm.reset();
  newIngredientRows.innerHTML = "";
  document.querySelector("#new-recipe-title").value = recipe.title;
  document.querySelector("#new-recipe-category").value = recipe.category || "Other";
  document.querySelector("#new-recipe-charge").value = recipe.defaultChargePerOz || "";

  if (recipe.ingredients.length) {
    recipe.ingredients.forEach((ingredient) => addIngredientRow(ingredient));
  } else {
    addIngredientRow();
  }

  switchTab("add");
}

function resetRecipeForm() {
  editingRecipeId = null;
  recipeFormTitle.textContent = "Add a new cocktail";
  recipeSubmitButton.textContent = "Add recipe";
  cancelEditButton.hidden = true;
  recipeForm.reset();
  newIngredientRows.innerHTML = "";
  addIngredientRow();
  addIngredientRow();
  addIngredientRow();
}

function hydrateCategoryFilter(sourceRecipes) {
  const categories = [...new Set(sourceRecipes.map((recipe) => recipe.category))].sort();
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.append(option);
  });
}

function applyMenuOrder(sourceRecipes) {
  return applyRecipeOrder(sourceRecipes, MENU_ORDER);
}

function applyRecipeOrder(sourceRecipes, order) {
  const byTitle = new Map(sourceRecipes.map((recipe) => [normalizeTitle(recipe.title), recipe]));

  return order.map(([displayTitle, sourceTitle]) => {
    const source = byTitle.get(normalizeTitle(sourceTitle));
    if (!source) return null;

    return {
      ...source,
      id: slugify(displayTitle),
      title: displayTitle,
      sourceTitle: source.title,
      ingredients: source.ingredients.map((ingredient) => {
        const mappedName = getIngredientName(ingredient.raw, displayTitle);
        return {
          ...ingredient,
          id: slugify(mappedName),
          name: mappedName,
        };
      }),
      metrics: source.metrics.map((metric) => ({ ...metric })),
    };
  }).filter(Boolean);
}

function applyRecipeEdits(recipe) {
  const edits = editedRecipes[recipe.id];
  if (!edits) return recipe;

  return {
    ...recipe,
    ...edits,
    ingredients: (edits.ingredients || []).map((ingredient) => ({
      ...ingredient,
      id: slugify(ingredient.name),
      raw: ingredient.raw || buildRecipeIngredientRaw(ingredient.name, ingredient.packageCount, getRecipeBuilderPackageConfig(ingredient.name)),
      name: ingredient.name,
      cost: toNumber(ingredient.cost),
      oz: toNumber(ingredient.oz),
      packageCount: clean(ingredient.packageCount),
      packageUnit: clean(ingredient.packageUnit),
      packageSizeOz: toNumber(ingredient.packageSizeOz),
    })),
  };
}

async function fetchCsv(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Unable to load ${path}`);
  return response.text();
}

function parseRecipes(rows) {
  const header = rows[0] || [];
  const batchRow = rows[1] || [];
  const groups = [];

  for (let index = 0; index < header.length; index += 1) {
    const title = clean(header[index]);
    const costHeader = clean(header[index + 1]).toLowerCase();
    const ozHeader = clean(header[index + 2]).toLowerCase();
    if (title && costHeader === "$" && ozHeader === "oz") {
      groups.push({ title, start: index });
    }
  }

  return groups.map((group) => {
    const ingredientsForRecipe = [];
    const metrics = [];

    rows.slice(2).forEach((row) => {
      const label = clean(row[group.start]);
      const costCell = clean(row[group.start + 1]);
      const ozCell = clean(row[group.start + 2]);
      if (!label) return;

      if (isMetricLabel(label)) {
        metrics.push({ label, value: costCell || ozCell });
        return;
      }

      ingredientsForRecipe.push({
        id: slugify(getIngredientName(label, group.title)),
        raw: label,
        name: getIngredientName(label, group.title),
        cost: toNumber(costCell),
        oz: toNumber(ozCell),
      });
    });

    return {
      id: slugify(group.title),
      title: group.title,
      batch: clean(batchRow[group.start]),
      category: inferCategory(group.title),
      defaultChargePerOz: getMetricNumber(metrics, "Price we're charging"),
      ingredients: ingredientsForRecipe,
      metrics,
    };
  });
}

function buildIngredientCatalog(sourceRecipes) {
  const byId = new Map();

  sourceRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      if (!byId.has(ingredient.id)) {
        byId.set(ingredient.id, {
          id: ingredient.id,
          name: ingredient.name,
          vendorProduct: getVendorMapping(ingredient.id),
          totalCost: 0,
          totalOz: 0,
          recipes: [],
        });
      }

      const record = byId.get(ingredient.id);
      record.totalCost += ingredient.cost || 0;
      record.totalOz += ingredient.oz || 0;
      if (!record.recipes.includes(recipe.title)) {
        record.recipes.push(recipe.title);
      }
    });
  });

  return [...byId.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function getRecipeTotals(recipe) {
  const cost = sum(recipe.ingredients.map((ingredient) => getIngredientCost(ingredient).cost));
  const oz = sum(recipe.ingredients.map((ingredient) => ingredient.oz));
  const alcoholOz = sum(recipe.ingredients.map((ingredient) => ingredient.oz * getIngredientAbvFraction(ingredient)));
  return {
    cost,
    oz,
    costPerOz: oz ? cost / oz : 0,
    alcoholOz,
    abvPercent: oz ? (alcoholOz / oz) * 100 : 0,
  };
}

function getRecipePricing(recipe) {
  const totals = getRecipeTotals(recipe);
  const chargePerOz = toNumber(chargeOverrides[recipe.id]) || recipe.defaultChargePerOz || 0;
  const pourOz = getPourOzForAlcoholTarget(recipe, totals.oz);
  const profitPerOz = chargePerOz - totals.costPerOz;
  const revenue = chargePerOz * totals.oz;
  const profit = revenue - totals.cost;

  return {
    ...totals,
    chargePerOz,
    chargePerPour: chargePerOz * pourOz,
    revenue,
    profit,
    profitPerOz,
    margin: chargePerOz ? (profitPerOz / chargePerOz) * 100 : 0,
    pourOz,
  };
}

function getPourOzForAlcoholTarget(recipe, totalOz) {
  const primaryAlcoholOz = recipe.ingredients.find((ingredient) => ingredient.oz > 0)?.oz || 0;
  if (!primaryAlcoholOz || !totalOz) return 0;
  return 1.5 / (primaryAlcoholOz / totalOz);
}

function getCalculatedMetrics(recipe, totals, pricing) {
  return [
    { label: "Total price", value: money(totals.cost) },
    { label: "Total oz", value: formatNumber(totals.oz) },
    { label: "Pure alcohol oz", value: formatNumber(totals.alcoholOz) },
    { label: "Batch ABV", value: `${formatNumber(totals.abvPercent)}%` },
    { label: "Total price per oz", value: money(totals.costPerOz) },
    { label: "Price we're charging", value: money(pricing.chargePerOz) },
    { label: "Profit per oz", value: money(pricing.profitPerOz) },
    { label: "Profit margin", value: `${formatNumber(pricing.margin)}%` },
    { label: "Oz pour for 1.5 oz alcohol", value: pricing.pourOz ? formatNumber(pricing.pourOz) : "-" },
    { label: "Charge per pour", value: pricing.pourOz ? money(pricing.chargePerPour) : "-" },
  ];
}

function getIngredientCost(ingredient) {
  const resolvedId = getResolvedIngredientId(ingredient);
  const override = priceOverrides[resolvedId];
  const bottleOz = toNumber(override?.bottleOz);
  const bottlePrice = toNumber(override?.bottlePrice);

  if (bottleOz && bottlePrice && ingredient.oz) {
    return {
      cost: ingredient.oz * (bottlePrice / bottleOz),
      source: "override",
    };
  }

  const catalogIngredient = ingredients.find((item) => item.id === resolvedId);
  const catalogUnitCost = catalogIngredient ? getCatalogUnitCost(catalogIngredient) : 0;
  if (catalogUnitCost && ingredient.oz) {
    return {
      cost: ingredient.oz * catalogUnitCost,
      source: "catalog",
    };
  }

  return {
    cost: ingredient.cost || 0,
    source: "sheet",
  };
}

function getIngredientAbvFraction(ingredient) {
  const percent = getIngredientAbvPercent(ingredient);
  return percent ? percent / 100 : 0;
}

function getIngredientAbvPercent(ingredient) {
  const resolvedId = getResolvedIngredientId(ingredient);
  if (!resolvedId) return 0;
  if (Object.hasOwn(INGREDIENT_ABV_PERCENT, resolvedId)) {
    return INGREDIENT_ABV_PERCENT[resolvedId];
  }

  const mappedProduct = getVendorMapping(resolvedId);
  const parsedProofAbv = getAbvPercentFromProductName(mappedProduct?.productName);
  if (parsedProofAbv) return parsedProofAbv;

  return inferFallbackAbvPercent(ingredient.name);
}

function getResolvedIngredientId(ingredient) {
  const resolvedName = normalizeIngredientAlias(clean(ingredient?.name));
  if (!resolvedName) return clean(ingredient?.id);
  return slugify(resolvedName);
}

function getAbvPercentFromProductName(productName) {
  const cleaned = clean(productName);
  if (!cleaned) return 0;

  const proofMatch = cleaned.match(/\b(\d{2,3})(?:\s*proof|\s+(?=1(?:\.\d+)?l\b|750ml\b|375ml\b|16oz\b))/i);
  if (!proofMatch) return 0;

  const proof = Number.parseFloat(proofMatch[1]);
  if (!Number.isFinite(proof)) return 0;
  return proof / 2;
}

function inferFallbackAbvPercent(name) {
  const normalized = clean(name).toLowerCase();
  if (!normalized) return 0;
  if (normalized.includes("vodka") || normalized.includes("tequila")) return 40;
  if (normalized.includes("bourbon")) return 45;
  if (normalized.includes("whiskey") || normalized.includes("whisky")) return 40;
  if (normalized.includes("rum")) return 35;
  if (normalized.includes("gin")) return 40;
  if (normalized.includes("triple sec") || normalized.includes("schnapps") || normalized.includes("creme de cacao")) return 15;
  if (normalized.includes("kahlua")) return 20;
  if (normalized.includes("bitters")) return 44.7;
  return 0;
}

function getCatalogUnitCost(ingredient) {
  const override = priceOverrides[ingredient.id];
  const bottleOz = toNumber(override?.bottleOz);
  const bottlePrice = toNumber(override?.bottlePrice);
  if (bottleOz && bottlePrice) return bottlePrice / bottleOz;
  return ingredient.totalOz ? ingredient.totalCost / ingredient.totalOz : 0;
}

function getCatalogCost(ingredient) {
  return getCatalogUnitCost(ingredient) * ingredient.totalOz;
}

function getIngredientBottleCost(ingredient) {
  const override = priceOverrides[ingredient.id];
  const overrideBottlePrice = toNumber(override?.bottlePrice);
  if (overrideBottlePrice > 0) return overrideBottlePrice;

  const bottleOz = toNumber(override?.bottleOz) || toNumber(ingredient.vendorProduct?.bottleOz);
  const unitCost = getCatalogUnitCost(ingredient);
  if (bottleOz > 0 && unitCost > 0) return bottleOz * unitCost;
  return 0;
}

function countOverrides() {
  return Object.keys(priceOverrides).filter((key) => {
    const override = priceOverrides[key];
    return toNumber(override?.bottleOz) && toNumber(override?.bottlePrice);
  }).length;
}

function countVendorMappings(sourceIngredients = ingredients) {
  return sourceIngredients.filter((ingredient) => ingredient.vendorProduct).length;
}

function countVendorMappingsByName(sourceIngredients, vendorName) {
  return sourceIngredients.filter((ingredient) => ingredient.vendorProduct?.vendor === vendorName).length;
}

function groupIngredientsForDisplay(sourceIngredients) {
  const grouped = new Map();

  sourceIngredients.forEach((ingredient) => {
    const groupName = getIngredientGroup(ingredient.name);
    if (!grouped.has(groupName)) {
      grouped.set(groupName, []);
    }
    grouped.get(groupName).push(ingredient);
  });

  return ["Liquor", "Proof", "Buckeye Beverage", "Food Vendors", "Made In House", "Other"]
    .map((groupName) => [
      groupName,
      (grouped.get(groupName) || []).sort((a, b) => getIngredientSortKey(a).localeCompare(getIngredientSortKey(b))),
    ])
    .filter(([, items]) => items.length);
}

function countChargeOverrides() {
  return Object.keys(chargeOverrides).filter((key) => toNumber(chargeOverrides[key])).length;
}

function getActiveRecipes() {
  return recipes.filter((recipe) => !inactiveRecipeIds.includes(recipe.id));
}

function getInactiveRecipes() {
  return recipes.filter((recipe) => inactiveRecipeIds.includes(recipe.id));
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
}

function parseInventory(rows) {
  const items = [];
  let currentSection = "Liquor";

  rows.forEach((row) => {
    const first = clean(row[0]);
    const last = clean(row[row.length - 1]);

    if (!first) return;
    if (/^total /i.test(first)) return;

    if (isInventorySectionRow(first, last)) {
      currentSection = first;
      return;
    }

    if (isInventoryHeaderRow(first)) return;

    const normalizedName = normalizeInventoryName(first);
    const unitCost = toNumber(row[3]);
    let note = clean(row[10]);
    if (normalizedName === "Bombay Sapphire" && /do not order for now/i.test(note)) {
      note = "";
    }
    const group = getInventoryGroup(normalizedName, currentSection);
    const id = slugify(normalizedName);
    const onHandDisplay = inventoryOnHandOverrides[id] ?? clean(row[1]);
    const parDisplay = inventoryParOverrides[id] ?? clean(row[7]);

    if (group === "Bottle Service" || group === "Bubbly") return;
    if (["Jameson", "Patron", "Pink Whitney", "Screwball"].includes(normalizedName)) return;

    const item = {
      id,
      name: normalizedName,
      group,
      allowsDecimal: normalizedName === "Sweet and Sour",
      sourceSection: currentSection,
      onHandDisplay,
      baseUnitCost: unitCost,
      unitCost,
      parDisplay,
      note,
      excludeFromOrderList: normalizedName === "Sweet and Sour",
      excludeFromInventoryValue: normalizedName === "Non Alcoholic Beer",
    };

    recalculateInventoryItem(item);
    items.push(item);
  });

  ensureInventoryPlaceholder(items, {
    name: "Non Alcoholic Beer",
    group: "Other",
    unitCost: 0,
    note: "Tracked separately",
    excludeFromInventoryValue: true,
  });

  return items;
}

function ensureInventoryPlaceholder(items, config) {
  const id = slugify(config.name);
  if (items.some((item) => item.id === id)) return;

  const item = {
    id,
    name: config.name,
    group: config.group,
    allowsDecimal: false,
    sourceSection: config.group,
    onHandDisplay: inventoryOnHandOverrides[id] ?? "0",
    baseUnitCost: config.unitCost || 0,
    unitCost: config.unitCost || 0,
    parDisplay: inventoryParOverrides[id] ?? "0",
    note: config.note || "",
    excludeFromOrderList: false,
    excludeFromInventoryValue: Boolean(config.excludeFromInventoryValue),
  };

  recalculateInventoryItem(item);
  items.push(item);
}

function isInventorySectionRow(first, last) {
  if (first === last && first) return true;
  return ["Juices and Mixers", "Bottle Service Karaoke Cooler", "Bubbly in patio cooler"].includes(first);
}

function isInventoryHeaderRow(first) {
  return /^bottle inventory/i.test(first) || /^on hand/i.test(first);
}

function normalizeInventoryName(name) {
  const normalized = clean(name)
    .replace(/\b1\.75ml\b/i, "")
    .replace(/\b1\.75\b/i, "")
    .trim();

  return normalizeIngredientAlias(normalized);
}

function groupInventoryForDisplay(sourceItems) {
  const grouped = new Map();

  sourceItems.forEach((item) => {
    if (!grouped.has(item.group)) {
      grouped.set(item.group, []);
    }
    grouped.get(item.group).push(item);
  });

  return ["Liquor Cabinet", "Mixer Cabinet", "Other"]
    .map((groupName) => [
      groupName,
      (grouped.get(groupName) || []).sort((a, b) => getInventorySortKey(a).localeCompare(getInventorySortKey(b))),
    ])
    .filter(([, items]) => items.length);
}

function getInventoryGroup(name, sourceSection) {
  const normalized = clean(name).toLowerCase();
  if (sourceSection === "Bottle Service Karaoke Cooler") return "Bottle Service";
  if (sourceSection === "Bubbly in patio cooler") return "Bubbly";
  if (normalized === "kahlua") return "Mixer Cabinet";
  if (normalized === "sweet and sour" || normalized === "non alcoholic beer") return "Other";

  const ingredientGroup = getIngredientGroup(name);
  if (ingredientGroup === "Liquor") return "Liquor Cabinet";
  return "Mixer Cabinet";
}

function inferCategory(title) {
  const match = title.match(/\(([^)]+)\)/);
  if (match) return clean(match[1]).replace("Tequilla", "Tequila");
  if (/margarita|marg|senorita/i.test(title)) return "Tequila";
  if (/martini|cran|lemonade|palmer|blue dot/i.test(title)) return "Vodka";
  if (/whiskey|jack|old fashioned|apple jack|smash|sour/i.test(title)) return "Whiskey";
  if (/rum|captain/i.test(title)) return "Rum";
  return "Other";
}

function getIngredientName(value, recipeTitle = "") {
  let cleanedName = clean(value)
    .replace(/^\d+(\.\d+)?\s*(gallons?|oz|cups?)\s+/i, "")
    .replace(/\s*=\s*.*$/, "")
    .replace(/\s*\([^)]*\)\s*$/g, "")
    .replace(/\b\d+(\.\d+)?\s*(bottles?|btls?|liter|liters|l|ml|oz|gallons?|cups?|diluted|pitchers|packets|water)\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  if (/^flavored schnapps$/i.test(cleanedName)) {
    const flavor = getRecipeFlavor(recipeTitle);
    if (flavor) cleanedName = `${flavor} Schnapps`;
  }

  return normalizeIngredientAlias(cleanedName);
}

function getRecipeFlavor(recipeTitle) {
  const match = clean(recipeTitle).match(/blueberry|strawberry|raspberry|watermelon|peach/i);
  return match ? capitalize(match[0].toLowerCase()) : "";
}

function getVendorMapping(ingredientId) {
  if (PROOF_MAPPINGS[ingredientId] || OHLQ_MAPPINGS[ingredientId]) {
    return PROOF_MAPPINGS[ingredientId] || OHLQ_MAPPINGS[ingredientId] || null;
  }

  const fallbackId = slugify(normalizeIngredientAlias(clean(String(ingredientId).replace(/-/g, " "))));
  return PROOF_MAPPINGS[fallbackId] || OHLQ_MAPPINGS[fallbackId] || null;
}

function normalizeIngredientAlias(name) {
  const normalized = clean(name).toLowerCase();

  if (/^tito'?s(\s+vodka)?$/.test(normalized)) return "Tito's";
  if (/^ket(t)?le one cucumber vodka$/.test(normalized)) return "Ketel One Cucumber Vodka";
  if (/^ket(t)?le one cucumber$/.test(normalized)) return "Ketel One Cucumber Vodka";
  if (/^jose cuervo(\s+silver)?$/.test(normalized)) return "Jose Cuervo Silver";
  if (/^bull?iet$/.test(normalized) || /^bull?iet bourbon$/.test(normalized)) return "Bulleit Bourbon";
  if (/^pomegrante schnapps$/.test(normalized)) return "Pomegranate Schnapps";
  if (
    /^crown apple royal$/.test(normalized) ||
    /^crown apple$/.test(normalized) ||
    /^crown apple 6-?$/.test(normalized) ||
    /^crown royal apple$/.test(normalized) ||
    /^crown royal regal apple$/.test(normalized) ||
    /^crown apple\b/.test(normalized)
  ) return "Crown Apple";
  if (/^jack daniels fire$/.test(normalized)) return "Jack Daniel's Fire";
  if (/^jack daniels$/.test(normalized)) return "Jack Daniel's";
  if (/^\d+\s+svedka blue raspberry$/.test(normalized) || /^svedka blue raspberry$/.test(normalized)) return "Svedka Blue Raspberry Vodka";
  if (/^gallon lemonade$/.test(normalized) || /^lemonade$/.test(normalized)) return "Lemonade";
  if (/pink lemonade$/.test(normalized)) return "Pink Lemonade";
  if (/strawberry lemonade$/.test(normalized)) return "Strawberry Lemonade";
  if (/^cranberry juice$/.test(normalized) || /^cranberry$/.test(normalized)) return "Cranberry Juice";
  if (/^simple syrup$/.test(normalized)) return "Simple Syrup";
  if (/^sour mix$/.test(normalized) || /^sweet and sour$/.test(normalized)) return "Sweet and Sour";
  if (/^lime juice$/.test(normalized)) return "Lime Juice";
  if (/^lemon juice$/.test(normalized)) return "Lemon Juice";
  if (/^creme de cocao$/.test(normalized)) return "Creme de Cacao";
  if (/^llords /.test(normalized)) return titleCaseIngredientName(name.replace(/^Llords/i, "Llord's"));

  return titleCaseIngredientName(name);
}

function getIngredientGroup(name) {
  const normalized = clean(name).toLowerCase();

  if (["lemonade", "pink lemonade", "cranberry juice", "sweet tea", "strawberry lemonade"].includes(normalized)) return "Buckeye Beverage";
  if (normalized === "cold brew coffee" || normalized === "sour mix" || normalized === "vanilla") return "Food Vendors";
  if (
    normalized === "triple sec" ||
    normalized === "bitters" ||
    normalized === "creme de cacao" ||
    normalized === "mint" ||
    normalized === "lime juice" ||
    normalized === "lemon juice" ||
    normalized.includes("schnapps") ||
    normalized.includes("pucker")
  ) {
    return "Proof";
  }
  if (normalized === "blue Dot Juice".toLowerCase()) return "Made In House";
  if (normalized === "simple syrup" || normalized.includes("syrup")) return "Made In House";
  if (
    normalized.includes("juice") ||
    normalized.includes("mix") ||
    normalized.includes("blue dot")
  ) return "Other";
  if (
    normalized.includes("vodka") ||
    normalized === "tito's" ||
    normalized.includes("gin") ||
    normalized.includes("rum") ||
    normalized.includes("tequila") ||
    normalized.includes("whiskey") ||
    normalized.includes("bourbon") ||
    normalized.includes("crown apple") ||
    normalized.includes("crown royal") ||
    normalized.includes("jose cuervo") ||
    normalized.includes("bombay") ||
    normalized.includes("captain morgan") ||
    normalized.includes("jim beam") ||
    normalized.includes("absolut citron") ||
    normalized.includes("svedka") ||
    normalized.includes("bulleit") ||
    normalized.includes("jack daniel") ||
    normalized === "kahlua"
  ) {
    return "Liquor";
  }

  return "Other";
}

function formatRecipeIngredientAmount(ingredient) {
  if (shouldShowIngredientInGallons(ingredient)) {
    return `${formatNumber(ingredient.oz / 128)} gal`;
  }
  return formatNumber(ingredient.oz);
}

function shouldShowIngredientInGallons(ingredient) {
  const normalizedName = clean(ingredient?.name).toLowerCase();
  return (
    getIngredientGroup(ingredient?.name) === "Buckeye Beverage" ||
    normalizedName === "water" ||
    normalizedName === "simple syrup"
  );
}

function getIngredientSortKey(ingredient) {
  const normalized = clean(ingredient.name).toLowerCase();
  if (normalized === "kahlua") return "zzzz-kahlua";
  if (normalized === "simple syrup") return "zzzz-simple-syrup";
  return normalized;
}

function getInventorySortKey(item) {
  const cabinetIndex = INVENTORY_CABINET_ORDER.indexOf(item.name);
  if (cabinetIndex >= 0) return `${String(cabinetIndex).padStart(3, "0")}-${item.name.toLowerCase()}`;
  return `zzz-${item.name.toLowerCase()}`;
}

function titleCaseIngredientName(name) {
  return clean(name).replace(/\b([a-z])([a-z']*)/gi, (_, first, rest) => `${first.toUpperCase()}${rest.toLowerCase()}`);
}

function bindIngredientSummaryEvents() {
  const scopeSelect = document.querySelector("#vendor-sync-scope");
  const runSyncButton = document.querySelector("#run-vendor-sync");

  if (!scopeSelect || !runSyncButton) return;

  scopeSelect.addEventListener("change", () => {
    vendorSyncScope = scopeSelect.value;
  });

  runSyncButton.addEventListener("click", () => {
    vendorSyncScope = scopeSelect.value;
    runVendorSync();
  });
}

function getVendorMappedIngredients(scope = "all") {
  return ingredients
    .filter((ingredient) => ingredient.id !== "water" && ingredient.vendorProduct)
    .filter((ingredient) => scope === "all" || getVendorSyncName(ingredient.vendorProduct) === scope)
    .sort((a, b) => a.name.localeCompare(b.name));
}

function getVendorSyncName(vendorProduct) {
  return vendorProduct?.syncVendor || vendorProduct?.vendor || "";
}

async function runVendorSync() {
  const candidates = getVendorMappedIngredients(vendorSyncScope);
  if (!candidates.length) {
    vendorSyncMessage = "No mapped ingredients match that vendor scope yet.";
    renderIngredientSummary();
    return;
  }

  vendorSyncRunning = true;
  vendorSyncMessage = `Checking ${vendorSyncScope === "all" ? "all mapped vendors" : vendorSyncScope}...`;
  renderIngredientSummary();

  try {
    const response = await fetch("/api/vendor-sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        scope: vendorSyncScope,
        items: candidates.map((ingredient) => ({
          id: ingredient.id,
          name: ingredient.name,
          vendorProduct: ingredient.vendorProduct,
          syncVendor: getVendorSyncName(ingredient.vendorProduct),
        })),
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result?.error || "Vendor sync failed.");
    }

    let applied = 0;
    (result.updates || []).forEach((update) => {
      if (!update.id || !Number.isFinite(update.bottleOz) || !Number.isFinite(update.bottlePrice)) return;
      priceOverrides[update.id] = {
        ...(priceOverrides[update.id] || {}),
        bottleOz: String(update.bottleOz),
        bottlePrice: String(update.bottlePrice),
        updatedAt: update.updatedAt || new Date().toISOString(),
      };
      applied += 1;
    });

    if (applied) {
      saveOverrides();
    }

    const statusNotes = (result.vendorStatuses || [])
      .map((status) => `${status.vendor}: ${status.message}`)
      .join(" ");

    vendorSyncMessage = `Applied ${applied} price${applied === 1 ? "" : "s"}.${statusNotes ? ` ${statusNotes}` : ""}`;
    render();
  } catch (error) {
    vendorSyncMessage = error.message || "Vendor sync failed.";
    renderIngredientSummary();
  } finally {
    vendorSyncRunning = false;
    renderIngredientSummary();
  }
}

function getIngredientAddAmount(rawValue) {
  const raw = clean(rawValue);
  if (!raw) return "";

  if (raw.includes("=")) {
    const afterEquals = clean(raw.split("=").slice(1).join("="));
    return afterEquals.replace(/\s*=\s*.*$/, "").trim();
  }

  const leadingMatch = raw.match(/^(\d+(?:\.\d+)?)\s*(gallons?|oz|cups?|packets?|pitchers?)\b/i);
  if (leadingMatch) {
    return clean(leadingMatch[0]);
  }

  const shorthandBottleMatch = raw.match(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)\s*(l|ml)\b/i);
  if (shorthandBottleMatch) {
    const [, count, size, unit] = shorthandBottleMatch;
    return `${formatInventoryQuantity(count)} bottles (${formatContainerSizeLabel(size, unit)})`;
  }

  const quantityMatch = raw.match(/(\d+(?:\.\d+)?)\s*(bottles?|btls?|gallons?|oz|cups?|packets?|pitchers?)(.*)$/i);
  if (quantityMatch) {
    return clean(quantityMatch[0]);
  }

  return "";
}

function isMetricLabel(value) {
  return /^(total price|total oz|total price per oz|price we're charging|profit per oz|profit margin|cost for|how many oz per shot)/i.test(value);
}

function getMetricNumber(metrics, label) {
  const metric = metrics.find((item) => item.label.toLowerCase().startsWith(label.toLowerCase()));
  return toNumber(metric?.value);
}

function loadOverrides() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveOverrides() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(priceOverrides));
}

function loadChargeOverrides() {
  try {
    return JSON.parse(localStorage.getItem(CHARGE_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveChargeOverrides() {
  localStorage.setItem(CHARGE_STORAGE_KEY, JSON.stringify(chargeOverrides));
}

function loadCustomRecipes() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_RECIPE_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveCustomRecipes() {
  localStorage.setItem(CUSTOM_RECIPE_STORAGE_KEY, JSON.stringify(customRecipes));
}

function loadInactiveRecipeIds() {
  try {
    return JSON.parse(localStorage.getItem(INACTIVE_RECIPE_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveInactiveRecipeIds() {
  localStorage.setItem(INACTIVE_RECIPE_STORAGE_KEY, JSON.stringify(inactiveRecipeIds));
}

function loadEditedRecipes() {
  try {
    return JSON.parse(localStorage.getItem(EDITED_RECIPE_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveEditedRecipes() {
  localStorage.setItem(EDITED_RECIPE_STORAGE_KEY, JSON.stringify(editedRecipes));
}

function loadInventoryOnHandOverrides() {
  try {
    return JSON.parse(localStorage.getItem(INVENTORY_ON_HAND_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveInventoryOnHandOverrides() {
  localStorage.setItem(INVENTORY_ON_HAND_STORAGE_KEY, JSON.stringify(inventoryOnHandOverrides));
}

function loadInventoryParOverrides() {
  try {
    return JSON.parse(localStorage.getItem(INVENTORY_PAR_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveInventoryParOverrides() {
  localStorage.setItem(INVENTORY_PAR_STORAGE_KEY, JSON.stringify(inventoryParOverrides));
}

function loadInventoryHistory() {
  try {
    return JSON.parse(localStorage.getItem(INVENTORY_HISTORY_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveInventoryHistory() {
  localStorage.setItem(INVENTORY_HISTORY_STORAGE_KEY, JSON.stringify(inventoryHistory));
}

function clean(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function normalizeTitle(value) {
  return clean(value).toLowerCase();
}

function toNumber(value) {
  const cleaned = String(value ?? "").replace(/[$,%\s]/g, "").replace(/,/g, "");
  const number = Number.parseFloat(cleaned);
  return Number.isFinite(number) ? number : 0;
}

function sum(values) {
  return values.reduce((total, value) => total + (Number.isFinite(value) ? value : 0), 0);
}

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function formatInventoryQuantity(value) {
  const number = Number.parseFloat(String(value ?? "").replace(/,/g, ""));
  if (Number.isFinite(number)) return formatNumber(number);
  return value || "-";
}

function formatContainerSizeLabel(size, unit) {
  const cleanedUnit = clean(unit).toLowerCase();
  if (cleanedUnit === "l") return `${formatNumber(size)}L`;
  if (cleanedUnit === "ml") return `${formatNumber(size)}mL`;
  return `${formatNumber(size)} ${unit}`;
}

function formatUpdatedAt(value) {
  if (!value) return "Not updated";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not updated";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function formatInventorySnapshotLabel(value) {
  if (!value) return "Saved snapshot";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Saved snapshot";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatBatchLabel(value) {
  const cleaned = clean(value);
  if (!cleaned) return DEFAULT_BATCH_LABEL;
  if (/^12\s*gallons?$/i.test(cleaned) || /^12\s*gallon\s*keg$/i.test(cleaned)) return DEFAULT_BATCH_LABEL;
  return cleaned;
}

function slugify(value) {
  return clean(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function capitalize(value) {
  return value ? value[0].toUpperCase() + value.slice(1) : "";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
